# AIONEX local development

## Frontend (Next.js)

```bash
cd web
cp .env.local.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Env vars point at the Hostinger temp WordPress:

- `WP_API_URL=https://linen-stinkbug-102889.hostingersite.com/wp-json`
- `NEXT_PUBLIC_WP_API_URL` (same, for browser form posts)

## WordPress plugin (`aionex-core`)

1. Zip the folder `wp-plugins/aionex-core` (the folder that contains `aionex-core.php`).
2. In Hostinger WP Admin → Plugins → Add New → Upload Plugin → activate **AIONEX Core**.
3. Install mail per **[MAIL_SETUP.md](MAIL_SETUP.md)** (WP Mail SMTP + Hostinger mailbox). Optionally **ACF Free**.
4. Settings → AIONEX:
   - Admin/HR emails
   - CORS origins: include `http://localhost:3000` and your Vercel URL
   - Public Next.js site URL
5. Create or confirm sample Jobs under **Jobs** (plugin seeds 3 on first activation if none exist).
6. Verify: open  
   `https://linen-stinkbug-102889.hostingersite.com/wp-json/aionex/v1/jobs`

## Smoke checks

- Home brand + CTAs
- `/jobs` list/filters
- Job detail + apply (use a fake PDF resume)
- `/hire`, `/alerts`, `/contact`
- Applications / Hire Leads appear in WP Admin
