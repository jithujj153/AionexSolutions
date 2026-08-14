# AIONEX mail service setup (Hostinger)

Plugin **1.0.3** sends:

| Event | HR notification | Submitter auto-reply |
|---|---|---|
| Apply | Yes (+ resume) | Yes — “We received your application” |
| Hire | Yes | Yes — “We received your hire request” |
| Contact | Yes | Yes — “We received your message” |
| Job alert subscribe | — | Confirm link email |
| New job published | — | Confirmed subscribers |

Upload package: `wp-plugins/aionex-mu-plugins.zip` → `wp-content/mu-plugins/` (overwrite).

---

## 1. Hostinger mailbox

1. Open [hPanel](https://hpanel.hostinger.com) → **Emails**.
2. Create (or confirm) mailbox: **`Business@aionexoutsourcing.com`**.
3. Set a strong password and save it.
4. Open **Manage** → **Connect Apps** / **Configuration** and note:

| Setting | Typical Hostinger value |
|---|---|
| SMTP host | `smtp.hostinger.com` |
| Port | `465` |
| Encryption | SSL |
| Username | full email (`Business@aionexoutsourcing.com`) |
| Password | mailbox password |

If the custom domain is not on Hostinger mail yet, create a mailbox on the Hostinger temporary domain and use that as From until DNS cutover — then switch From + SMTP user to `Business@…`.

---

## 2. Upload plugin 1.0.3

1. File Manager → `public_html/wp-content/mu-plugins/`.
2. Upload `aionex-mu-plugins.zip` → Extract (overwrite).
3. Confirm `aionex-core/includes/mail.php` exists and loader version is 1.0.3.
4. Delete the zip after extract.
5. WP Admin → **Settings → Permalinks → Save**.

---

## 3. WP Mail SMTP

1. WP Admin → **Plugins → Add New** → search **WP Mail SMTP** → Install → Activate.
2. Wizard / **WP Mail SMTP → Settings**:
   - From Email: `Business@aionexoutsourcing.com`
   - From Name: `AIONEX Careers`
   - Force From Email: **On**
   - Mailer: **Other SMTP**
   - SMTP Host: `smtp.hostinger.com`
   - Encryption: **SSL**
   - Port: **465**
   - Authentication: **On**
   - Username / Password: mailbox credentials
3. **Save Settings**.
4. **Tools → WP Mail SMTP → Email Test** → send to your personal inbox.
5. Confirm message arrives (check spam once).

---

## 4. Settings → AIONEX

| Field | Value |
|---|---|
| Admin / HR emails | `Business@aionexoutsourcing.com` (comma-separated for more) |
| From name | `AIONEX Careers` |
| From email | `Business@aionexoutsourcing.com` |
| Public Next.js site URL | `https://aionex-web-one.vercel.app` |
| CORS origins | Keep localhost; `*.vercel.app` is allowed by plugin |

---

## 5. Smoke tests (from Vercel)

Use a real inbox you control for the submitter email.

1. **Apply** on an open job with PDF → WP **Applications** row + HR email + applicant auto-reply.
2. **Hire** → **Hire Leads** + HR email + employer auto-reply.
3. **Contact** → HR email + sender auto-reply.
4. **Alerts** subscribe → confirmation email; click confirm link.

If WP rows appear but no email: re-check WP Mail SMTP test and From/SMTP user match.

---

## Troubleshooting

- **Test email fails:** wrong password, wrong port, or mailbox not created.
- **Goes to spam:** keep From = authenticated mailbox; after domain cutover add SPF/DKIM in DNS.
- **HR gets mail, applicant does not:** confirm applicant email is real; check WP Mail SMTP → Email Log (if enabled).
- **Plugin old:** re-extract `aionex-mu-plugins.zip` and confirm `AIONEX_CORE_VERSION` is `1.0.3` in `aionex-core.php`.
