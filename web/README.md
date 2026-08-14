# AIONEX public site (Next.js)

## Local

```bash
cp .env.local.example .env.local
npm install
npm run dev
```

## Vercel

Root Directory: this folder (`web`).

Env vars:

```
WP_URL=https://linen-stinkbug-102889.hostingersite.com
WP_API_URL=https://linen-stinkbug-102889.hostingersite.com/wp-json
NEXT_PUBLIC_WP_API_URL=https://linen-stinkbug-102889.hostingersite.com/wp-json
NEXT_PUBLIC_SITE_URL=https://aionex-web-one.vercel.app
```

**Live:** https://aionex-web-one.vercel.app  

After deploy, set WordPress **Settings → AIONEX → Public Next.js site URL** to that URL (CORS for `*.vercel.app` is already allowed by the plugin).

See `../docs/LAUNCH_CHECKLIST.md`.
