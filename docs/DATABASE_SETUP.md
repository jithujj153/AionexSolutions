# AIONEX backend database (Hostinger WordPress)

You do **not** create a separate database app. Hostinger WordPress already has **MySQL**. The `aionex-core` plugin creates the tables/content types WordPress uses for jobs, applications, hire leads, and subscribers.

## What gets stored (MySQL via WordPress)

| Thing | Where |
|---|---|
| Jobs | CPT `job` in `wp_posts` + meta + taxonomies |
| Applications | CPT `application` + resume file in `wp-content/uploads` |
| Hire leads | CPT `hire_lead` |
| Job alert subscribers | CPT `job_subscriber` |
| Settings (HR emails, CORS) | `wp_options` |

Next.js never connects to MySQL — only to:

`https://YOUR-WP-SITE/wp-json/aionex/v1/...`

## Install (do this once)

### 1. Upload the plugin

1. Open WP Admin:  
   `https://linen-stinkbug-102889.hostingersite.com/wp-admin`
2. **Plugins → Add New → Upload Plugin**
3. Choose file: `pro/wp-plugins/aionex-core.zip`  
   (Rebuilt with Linux-safe `/` paths — if you see **Plugin file does not exist**, delete any broken install under Plugins and upload this zip again.)
4. **Install Now → Activate** (“AIONEX Core”)

On activate, the plugin:
- Registers Jobs / Applications / Hire Leads / Subscribers
- Registers taxonomies (location, department, seniority, work_mode)
- Seeds **3 sample jobs** if none exist
- Exposes REST under `/wp-json/aionex/v1/`

### 2. Permalinks (important)

**Settings → Permalinks → Post name → Save**  
(If API 404s after activate, this fix usually clears it.)

### 3. Configure AIONEX

**Settings → AIONEX**
- Admin / HR emails (comma-separated) — receives applications
- From name / From email
- Public Next.js site URL: `http://localhost:3000` (later your Vercel URL)
- CORS origins (one per line):
  ```
  http://localhost:3000
  https://localhost:3000
  ```

### 4. Email (required for launch)

See **[MAIL_SETUP.md](MAIL_SETUP.md)** — Hostinger mailbox + WP Mail SMTP + auto-reply verification (plugin 1.0.3+).

### 5. Verify API

Open in browser:

`https://linen-stinkbug-102889.hostingersite.com/wp-json/aionex/v1/jobs`

You should see JSON with `jobs`, `total`, etc. (not 404).

Then refresh local Next.js `/jobs` — listings should appear.

## Day-to-day admin

| Task | Menu |
|---|---|
| Post / close jobs | **Jobs** |
| Download resumes | **Applications** |
| Employer requests | **Hire Leads** |
| Alert list | **Subscribers** |

## Optional: phpMyAdmin

hPanel → **Databases** → phpMyAdmin — only if you need raw SQL. Normal work stays in `wp-admin`.
