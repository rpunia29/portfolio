// Generates public/og.png — the social card — from code, using the same engine
// as workers-og (Satori HTML/element-tree -> SVG, resvg SVG -> PNG), but at
// author time in Node so the output is committed as a static asset: no
// per-request edge cost, no WASM in the deployed artifact, and it can be
// eyeballed here. Regenerate after a copy/design tweak:  pnpm gen:og
//
// satori + @resvg/resvg-js are devDependencies, used only by this generator.
// They are never imported by the app, so they add nothing to the client bundle;
// the deployed artifact is just public/og.png.
//
// Element objects (via the `h` helper) are used instead of an HTML string so
// Satori's flexbox layout is deterministic (HTML-string parsing mis-handles
// mixed text/element flex children).
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, '../public/og.png');

// Satori's font parser can't read variable fonts (fvar) or woff2, so we pull
// STATIC per-weight TTFs. Google Fonts serves plain .ttf (not woff2) when asked
// with an old User-Agent — the standard Satori font-sourcing trick.
const GF_CSS = 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700';
const OLD_UA = 'Mozilla/4.0';

/** Fetch the Google Fonts CSS and return one {name, weight, url} per @font-face. */
async function resolveGoogleFonts() {
  const res = await fetch(GF_CSS, { headers: { 'User-Agent': OLD_UA } });
  if (!res.ok) throw new Error(`google fonts css -> ${res.status}`);
  const css = await res.text();
  const faces = [];
  for (const block of css.split('@font-face').slice(1)) {
    const name = block.match(/font-family:\s*'([^']+)'/)?.[1];
    const weight = Number(block.match(/font-weight:\s*(\d+)/)?.[1]);
    const url = block.match(/url\((https:[^)]+\.ttf)\)/)?.[1];
    if (name && weight && url) faces.push({ name, weight, url });
  }
  if (faces.length < 2) throw new Error(`expected 2 font faces, got ${faces.length}`);
  return Promise.all(
    faces.map(async (f) => ({
      name: f.name,
      weight: f.weight,
      style: 'normal',
      data: new Uint8Array(await (await fetch(f.url)).arrayBuffer()),
    })),
  );
}

const C = {
  ground: '#0d0d10',
  window: '#0f0f13',
  bar: '#131318',
  border: '#26262c',
  text: '#fafafa',
  subtle: '#c8c8ce',
  muted: '#8a8a93',
  green: '#28c840',
  chipBorder: '#2e2e35',
};

const STACK = ['TypeScript', 'Go', 'Rust', 'Python', 'React'];

/** Terse hyperscript for Satori's element-object input. */
const h = (type, style, children) => ({ type, props: { style, children } });

const dot = (color) =>
  h('div', {
    display: 'flex',
    width: 18,
    height: 18,
    borderRadius: 9999,
    backgroundColor: color,
  });

const chip = (tech, last) =>
  h(
    'div',
    {
      display: 'flex',
      border: `1px solid ${C.chipBorder}`,
      borderRadius: 8,
      padding: '9px 20px',
      marginRight: last ? 0 : 16,
      fontSize: 25,
      color: C.subtle,
    },
    tech,
  );

async function main() {
  const fonts = await resolveGoogleFonts();

  const tree = h(
    'div',
    {
      width: 1200,
      height: 630,
      display: 'flex',
      padding: 40,
      backgroundColor: C.ground,
      backgroundImage: 'radial-gradient(circle at center, #232329 1.5px, transparent 1.5px)',
      backgroundSize: '32px 32px',
      fontFamily: 'JetBrains Mono',
    },
    [
      // Terminal window
      h(
        'div',
        {
          width: 1120,
          height: 550,
          display: 'flex',
          flexDirection: 'column',
          border: `1px solid ${C.border}`,
          borderRadius: 18,
          backgroundColor: C.window,
          overflow: 'hidden',
        },
        [
          // Title bar
          h(
            'div',
            {
              display: 'flex',
              alignItems: 'center',
              padding: '22px 32px',
              borderBottom: `1px solid ${C.border}`,
              backgroundColor: C.bar,
            },
            [
              dot('#ff5f57'),
              h('div', { display: 'flex', width: 14 }),
              dot('#febc2e'),
              h('div', { display: 'flex', width: 14 }),
              dot('#28c840'),
              h('div', { display: 'flex', marginLeft: 20, fontSize: 24, color: C.muted }, 'rpunia.com — zsh'),
            ],
          ),
          // Body
          h(
            'div',
            {
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          justifyContent: 'center',
          padding: '28px 60px',
          color: C.text,
        },
        [
          h('div', { display: 'flex', fontSize: 27, color: C.muted, marginBottom: 20 }, '$ whoami'),
          // Prompt + name + cursor
          h(
            'div',
            { display: 'flex', alignItems: 'center', fontSize: 66, fontWeight: 700, marginBottom: 18 },
            [
              h('div', { display: 'flex', color: C.green, marginRight: 24 }, '❯'),
              h('div', { display: 'flex', color: C.text }, 'Rahul Punia'),
              h('div', { display: 'flex', width: 26, height: 66, marginLeft: 22, backgroundColor: C.green }),
            ],
          ),
          h('div', { display: 'flex', fontSize: 33, color: C.subtle, marginBottom: 18 }, 'Full-stack developer at IIT Kharagpur'),
          h('div', { display: 'flex', fontSize: 26, color: C.muted, marginBottom: 28 }, 'Building Trano, live tracking for every train in India.'),
              h('div', { display: 'flex' }, STACK.map((t, i) => chip(t, i === STACK.length - 1))),
            ],
          ),
          // Footer status bar
          h(
            'div',
            {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '22px 32px',
              borderTop: `1px solid ${C.border}`,
              backgroundColor: C.bar,
              fontSize: 25,
              color: C.muted,
            },
            [
              h('div', { display: 'flex', alignItems: 'center' }, [
                h('div', { display: 'flex', color: C.green, marginRight: 12 }, '❯'),
                h('div', { display: 'flex' }, '~/rpunia.com on main'),
              ]),
              h('div', { display: 'flex' }, 'git status: clean'),
            ],
          ),
        ],
      ),
    ],
  );

  const svg = await satori(tree, { width: 1200, height: 630, fonts });
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
  writeFileSync(OUT, png);
  console.log(`wrote ${OUT} (${(png.length / 1024).toFixed(1)} KiB)`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
