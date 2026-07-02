# ROBINMASK

Landing page for **ROBINMASK** — MetaMask fox behind the mask. Memecoin on Robinhood Chain via NOXA.

Fox orange + black theme. Mask Files gallery, Fox Signal radar, and The Lore.

## Run locally

```bash
npx serve .
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

```
METAHOOD/
├── index.html          # Main page (Next.js static export)
├── hood-radar.js       # Fox Signal interactive radar
├── assets/             # Logo, favicon, hero, gallery images
├── tweets/             # Legacy tweet images (unused in radar build)
└── _next/static/       # JS, CSS, fonts
```

## Deploy

Static site — deploy to Vercel, Netlify, or any static host. No build step required.

## Customize

- Contract address: search `TBA_ON_NOXA` in `index.html` and `page-c2e0d00c7072bd7d.js`
- Links: same files (`RobinMaskRH`, NOXA, Robinhood Chain)
- Images: replace files in `assets/`
