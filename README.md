# rpunia.com

Personal portfolio: a single-page, statically generated site with a terminal-flavoured design.

**Live:** [rpunia.com](https://rpunia.com)

## Stack

- React 19 + TypeScript, built with Vite (`vite-react-ssg` for static generation)
- Tailwind CSS v4 + [shadcn/ui](https://ui.shadcn.com) (accordion, command menu, dialog)
- Dynamic Open Graph image via `workers-og` (Satori + resvg-wasm), rendered in a Worker
- Deployed on Cloudflare Workers (static assets + a Worker for `/api/og`)

## Development

```sh
pnpm install
pnpm dev      # Vite dev server (UI only)
pnpm build    # typecheck + static build → dist/
pnpm lint     # eslint
pnpm cf:dev   # build + run the full Worker locally (wrangler dev)
pnpm deploy   # build + wrangler deploy to Cloudflare
```

## Deployment

- `wrangler.jsonc` binds `dist/` as static assets (`ASSETS`) and routes everything else
  to `worker/index.ts`.
- `/api/og` is generated on the fly and cached at the edge via the Cache API
  (`cache-control: immutable`, `s-maxage` 1 year); all other paths serve static assets,
  falling back to `index.html`.

## Notes

- Content lives in `src/constants/` (projects, experience, tech stack, contacts).
- Theme is restored before first paint by an inline script in `index.html`; toggling uses the View Transitions API.
- Press `Ctrl+K` (or `?`) on the site for the command menu.
