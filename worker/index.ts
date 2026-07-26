import { ImageResponse, loadGoogleFont } from 'workers-og';

interface Env {
  ASSETS: { fetch: (request: Request) => Promise<Response> };
}

interface Ctx {
  waitUntil: (promise: Promise<unknown>) => void;
}

const STACK = ['TypeScript', 'Go', 'Rust', 'Python', 'React'];

/** Vendor-agnostic OG image markup: plain HTML string parsed by Satori (no JSX runtime). */
function ogMarkup(): string {
  const chips = STACK.map(
    (tech) =>
      `<div style="display:flex;border:1px solid #2e2e35;padding:8px 18px;font-size:24px;color:#b3b3ba;">${tech}</div>`,
  ).join('');

  return `
    <div style="width:100%;height:100%;display:flex;flex-direction:column;justify-content:space-between;padding:72px 80px;background-color:#0d0d10;background-image:radial-gradient(circle, #232329 1.5px, transparent 1.5px);background-size:32px 32px;color:#fafafa;font-family:'JetBrains Mono';">
      <div style="display:flex;font-size:28px;color:#8a8a93;">$ whoami</div>
      <div style="display:flex;flex-direction:column;gap:28px;">
        <div style="display:flex;align-items:center;font-size:76px;font-weight:700;">
          <span style="color:#8a8a93;margin-right:24px;">&gt;</span>
          Rahul Punia
          <span style="width:30px;height:68px;margin-left:20px;background-color:#fafafa;"></span>
        </div>
        <div style="display:flex;font-size:34px;color:#b3b3ba;">Full-stack developer at IIT Kharagpur</div>
        <div style="display:flex;font-size:26px;color:#8a8a93;max-width:900px;">Building Trano, live tracking for every train in India.</div>
        <div style="display:flex;gap:14px;margin-top:10px;">${chips}</div>
      </div>
      <div style="display:flex;justify-content:space-between;font-size:26px;color:#8a8a93;">
        <span>rpunia.com</span>
        <span>git status: clean</span>
      </div>
    </div>`;
}

async function renderOg(request: Request, ctx: Ctx): Promise<Response> {
  const cache = caches.default;
  const cacheKey = new Request(new URL('/api/og', request.url).toString(), { method: 'GET' });

  const cached = await cache.match(cacheKey);
  if (cached) return cached;

  const [regular, bold] = await Promise.all([
    loadGoogleFont({ family: 'JetBrains Mono', weight: 400 }),
    loadGoogleFont({ family: 'JetBrains Mono', weight: 700 }),
  ]);

  const image = new ImageResponse(ogMarkup(), {
    width: 1200,
    height: 630,
    fonts: [
      { name: 'JetBrains Mono', data: regular, weight: 400, style: 'normal' },
      { name: 'JetBrains Mono', data: bold, weight: 700, style: 'normal' },
    ],
  });

  const response = new Response(image.body, image);
  response.headers.set('Content-Type', 'image/png');
  response.headers.set('Cache-Control', 'public, max-age=86400, s-maxage=31536000, immutable');

  ctx.waitUntil(cache.put(cacheKey, response.clone()));
  return response;
}

export default {
  async fetch(request: Request, env: Env, ctx: Ctx): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/api/og') {
      return renderOg(request, ctx);
    }

    // Everything else is a static asset (index.html served for unknown routes).
    return env.ASSETS.fetch(request);
  },
};
