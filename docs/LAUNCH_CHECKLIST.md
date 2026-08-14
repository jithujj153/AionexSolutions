# Production launch checklist

## Staging blockers (do these before calling QA “final”)

| Item | Status / action |
|---|---|
| Next.js production build | Done (`npm run build`) |
| Hostinger WP API live | Done (`/wp-json/aionex/v1/jobs`) |
| Vercel public site | https://aionex-web-one.vercel.app |
| AIONEX Core **1.0.3** (CORS + auto-replies) | Re-upload `wp-plugins/aionex-mu-plugins.zip` → `mu-plugins/` |
| Mail service | Follow [MAIL_SETUP.md](MAIL_SETUP.md) end-to-end |
| WP Mail SMTP + Hostinger mailbox | Required for HR + auto-replies |
| Settings → AIONEX | HR/From = Business@; public URL = Vercel |
| Form smoke test | Apply / Hire / Contact / Alerts → WP rows + emails both ways |

## Deploy Next.js to Vercel

1. Root Directory = `web`.
2. Environment variables:

```
WP_URL=https://linen-stinkbug-102889.hostingersite.com
WP_API_URL=https://linen-stinkbug-102889.hostingersite.com/wp-json
NEXT_PUBLIC_WP_API_URL=https://linen-stinkbug-102889.hostingersite.com/wp-json
NEXT_PUBLIC_SITE_URL=https://aionex-web-one.vercel.app
```

3. Smoke test jobs, apply, hire, alerts, email (see MAIL_SETUP).

## Before DNS cutover

- [ ] Local + Vercel QA pass (jobs, apply, hire, alerts, auto-replies)
- [ ] WP Mail SMTP configured with real From address
- [ ] Settings → AIONEX: HR emails, CORS, public site URL
- [ ] SSL active on Hostinger WordPress
- [ ] Sample/test data cleaned if needed

## DNS cutover (two phases)

| Host | Target | Phase |
|---|---|---|
| `cms` | Hostinger WordPress | **1 — do now** → [CMS_DNS_CUTOVER.md](CMS_DNS_CUTOVER.md) |
| `www` + apex | Hostinger Next (or Vercel) | 2 — after CMS is stable |

### Phase 1 — CMS (now)

Follow **[CMS_DNS_CUTOVER.md](CMS_DNS_CUTOVER.md)** end-to-end:

1. Hostinger → Connect `cms.aionexoutsourcing.com` to the existing WP site.
2. HostingRaja Zone Editor → A (or CNAME) for `cms` only — **do not** touch MX / `@` / `www`.
3. SSL + WP Site URL → `https://cms.aionexoutsourcing.com`.
4. Point Next/Vercel `WP_*` env at `cms…`; smoke-test API + forms.

### Phase 2 — Public site (later)

1. Deploy Next on Hostinger Web App (or keep Vercel).
2. Point `@` / `www` at Next; keep Google MX/SPF/DKIM.
3. Update `NEXT_PUBLIC_SITE_URL` + AIONEX CORS/public URL.
4. Smoke test; then retire old Raja site + optional temp Hostinger URL.
