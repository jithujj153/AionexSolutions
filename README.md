# AIONEX Recruiting Site

Headless WordPress (Hostinger) + Next.js public site for the AIONEX recruiting agency.

## Stack

- **Public UI:** `web/` — Next.js App Router, TypeScript, design tokens, SVG mark
- **CMS:** Hostinger WordPress + `wp-plugins/aionex-core`
- **Staging WP:** https://linen-stinkbug-102889.hostingersite.com

## Quick start

See [docs/LOCAL_DEV.md](docs/LOCAL_DEV.md).

```bash
cd web
npm install
npm run dev
```

## Media layout

**Served (Next.js)**

| Path | Purpose |
|---|---|
| `web/public/brand/` | Logo + favicon |
| `web/public/media/hero.mp4` | Hero background |
| `web/public/media/outcomes.mp4` | Outcomes vertical (left) |
| `web/public/media/process.mp4` | How we work vertical (right) |

**Source masters (not served)** — `assets/source/`

| File | Maps to |
|---|---|
| `hero-source.mp4` | `web/public/media/hero.mp4` |
| `outcomes-source.mp4` | `web/public/media/outcomes.mp4` |
| `process-source.mp4` | `web/public/media/process.mp4` |
| `AIONEX_ICON.svg` | `web/public/brand/` |

## Docs

- [API contract](docs/API_CONTRACT.md)
- [Admin handbook](docs/ADMIN_HANDBOOK.md)
- [Mail setup](docs/MAIL_SETUP.md)
- [Launch checklist](docs/LAUNCH_CHECKLIST.md)
- [Database setup](docs/DATABASE_SETUP.md)
- [Plugin install (Hostinger)](docs/PLUGIN_INSTALL_HOSTINGER.md)

## Built by

**Varun M G**  
Email: [varunmg101@gmail.com](mailto:varunmg101@gmail.com)  
genAI and systems
