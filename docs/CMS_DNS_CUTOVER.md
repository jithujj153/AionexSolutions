# Cutover: temp WordPress → `cms.aionexoutsourcing.com`

Do **only** the `cms` subdomain now. Leave `@` / `www` on HostingRaja (old site or future Next). **Do not** change nameservers. **Do not** touch Google MX / SPF / DKIM.

| Item | Value |
|---|---|
| Temp WP (current) | `https://linen-stinkbug-102889.hostingersite.com` |
| Live CMS (target) | `https://cms.aionexoutsourcing.com` |
| WP admin (target) | `https://cms.aionexoutsourcing.com/wp-admin` |
| API (target) | `https://cms.aionexoutsourcing.com/wp-json/aionex/v1/jobs` |
| DNS host | HostingRaja (`aionexo1` / `ns1–4.mysecurecloudhost.com`) |
| WP host | Hostinger (same site — not a new install) |

---

## Step 1 — Hostinger: attach the subdomain

1. Log in to [Hostinger hPanel](https://hpanel.hostinger.com).
2. **Websites** → open the AIONEX WordPress site (temp domain `linen-stinkbug-….hostingersite.com`).
3. Click **Connect** (or **Add domain** / **Change domain**) under the temporary domain.
4. Type manually: **`cms.aionexoutsourcing.com`**  
   (It will not appear in the list — the domain is at HostingRaja, not Hostinger.)
5. Finish the wizard. Prefer **Connect via DNS record** / **A record** (keep Raja nameservers).
6. Copy the **Hostinger IP** (or exact record Hostinger shows). You need it for Step 2.

If Hostinger only offers nameserver change, cancel that path and use **Connect via DNS record** instead.

---

## Step 2 — HostingRaja: add `cms` DNS only

1. Log in to HostingRaja cPanel: `s4154.bom1.stableserver.net` (user `aionexo1`).
2. Open **Zone Editor** (or DNS Zone) for `aionexoutsourcing.com`.
3. Add **one** record (use the IP from Step 1):

| Type | Name / Host | Value | TTL |
|---|---|---|---|
| **A** | `cms` | *(Hostinger website IP from hPanel)* | 3600 or default |

4. If Hostinger showed a **CNAME** instead of an IP, use that instead:

| Type | Name / Host | Value |
|---|---|---|
| **CNAME** | `cms` | value Hostinger shows (e.g. `connect.hostinger.com` or the temp hostname) |

5. **Do not** delete or change:
   - `@` / `www` A or CNAME (apex still Raja / old site for now)
   - **MX** records (Google mail)
   - SPF / DKIM **TXT** records

6. Wait for DNS (often 5–60 minutes; up to a few hours). Check:

```bash
nslookup cms.aionexoutsourcing.com
```

It should resolve to the Hostinger IP (or follow the CNAME).

---

## Step 3 — SSL on Hostinger

1. In hPanel → the website → **SSL**.
2. Enable free SSL for `cms.aionexoutsourcing.com`.
3. Confirm `https://cms.aionexoutsourcing.com` loads (may briefly show WP or a redirect until Step 4).

---

## Step 4 — WordPress Site URL

1. Open admin (use whichever still works):
   - `https://cms.aionexoutsourcing.com/wp-admin` **or**
   - temp: `https://linen-stinkbug-102889.hostingersite.com/wp-admin`
2. **Settings → General**:
   - WordPress Address (URL): `https://cms.aionexoutsourcing.com`
   - Site Address (URL): `https://cms.aionexoutsourcing.com`
3. Save. Log in again if prompted.
4. **Settings → AIONEX** (if present):
   - Keep HR / From emails as configured
   - Public Next.js site URL: leave Vercel for now (`https://aionex-web-one.vercel.app`) until apex Next cutover
   - CORS: keep localhost + Vercel; after apex goes live, add `https://aionexoutsourcing.com`

If the admin redirects in a loop after URL change, use Hostinger **WordPress → Tools → Search & Replace** (or phpMyAdmin `siteurl` / `home` in `wp_options`) to set both to `https://cms.aionexoutsourcing.com`.

---

## Step 5 — Point Next.js / Vercel at the new CMS

Update env (Vercel project + local `web/.env.local` when ready):

```
WP_URL=https://cms.aionexoutsourcing.com
WP_API_URL=https://cms.aionexoutsourcing.com/wp-json
NEXT_PUBLIC_WP_API_URL=https://cms.aionexoutsourcing.com/wp-json
```

Redeploy Vercel after changing production env.

Smoke test:

```
https://cms.aionexoutsourcing.com/wp-json/aionex/v1/jobs
```

Then jobs / apply / hire / contact from the Next site.

---

## Step 6 — What stays temporary (for now)

| Still temp / old | Until |
|---|---|
| `aionexoutsourcing.com` apex → Raja `190.92.174.184` | Next.js Hostinger (or Vercel) cutover |
| Vercel demo URL | Optional staging after apex is live |
| Temp `*.hostingersite.com` | Can leave as Hostinger alias; stop using for admin |

---

## Done when

- [ ] `https://cms.aionexoutsourcing.com/wp-admin` works
- [ ] SSL padlock OK
- [ ] `/wp-json/aionex/v1/jobs` returns JSON
- [ ] Next env points at `cms…` and forms still work
- [ ] Mail MX untouched (Google still receives mail)
