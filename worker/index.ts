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
      `<div style="display:flex;border:1px solid #2e2e35;border-radius:8px;padding:9px 20px;font-size:25px;color:#c8c8ce;">${tech}</div>`,
  ).join('');

  const dot = (color: string) =>
    `<div style="display:flex;width:18px;height:18px;border-radius:50%;background-color:${color};"></div>`;

  return `
    <div style="width:100%;height:100%;display:flex;padding:44px;background-color:#0d0d10;background-image:radial-gradient(circle, #232329 1.5px, transparent 1.5px);background-size:32px 32px;font-family:'JetBrains Mono';">
      <div style="width:100%;height:100%;display:flex;flex-direction:column;border:1px solid #26262c;border-radius:18px;background-color:#0f0f13;overflow:hidden;">
        <div style="display:flex;align-items:center;gap:14px;padding:22px 32px;border-bottom:1px solid #26262c;background-color:#131318;">
          ${dot('#ff5f57')}${dot('#febc2e')}${dot('#28c840')}
          <div style="display:flex;margin-left:16px;font-size:24px;color:#8a8a93;">rpunia.com — zsh</div>
        </div>
        <div style="flex:1;display:flex;flex-direction:column;justify-content:center;gap:22px;padding:40px 60px;color:#fafafa;">
          <div style="display:flex;font-size:27px;color:#8a8a93;">$ whoami</div>
          <div style="display:flex;align-items:center;height:100px;font-size:66px;font-weight:700;color:#fafafa;">❯ Rahul Punia</div>
          <div style="display:flex;font-size:33px;color:#c8c8ce;">Full-stack developer at IIT Kharagpur</div>
          <div style="display:flex;font-size:26px;color:#8a8a93;max-width:940px;">Building Trano, live tracking for every train in India.</div>
          <div style="display:flex;gap:16px;margin-top:12px;">${chips}</div>
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between;padding:22px 32px;border-top:1px solid #26262c;background-color:#131318;font-size:25px;color:#8a8a93;">
          <div style="display:flex;align-items:center;gap:12px;">
            <span style="color:#28c840;">❯</span>
            <span>~/rpunia.com on main</span>
          </div>
          <div style="display:flex;">git status: clean</div>
        </div>
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
