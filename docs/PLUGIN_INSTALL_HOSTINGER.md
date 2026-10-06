# Fix: “Plugin file does not exist” on Hostinger

Hostinger’s normal Plugins uploader is failing Activate for this site. Use a **must-use plugin** instead — WordPress loads it automatically. **No Activate button.**

## Clean up first

1. WP Admin → **Plugins** → if **AIONEX Core** is listed → **Delete**
2. File Manager → `public_html/wp-content/plugins/`
3. Delete folder **`aionex-core`** if it still exists

## Install (must-use — recommended)

1. File Manager → go to  
   `public_html/wp-content/`
2. If folder **`mu-plugins`** does not exist → **New folder** → name it `mu-plugins`
3. Open **`mu-plugins`**
4. Upload:  
   `c:\Users\VarunMG\pro\wp-plugins\aionex-mu-plugins.zip`
5. Right-click zip → **Extract** here (inside `mu-plugins`) — overwrite if prompted (keeps you on latest, currently **1.0.3**)
6. Confirm you now have:
   - `mu-plugins/aionex-loader.php`
   - `mu-plugins/aionex-core/aionex-core.php` (Version **1.0.3**)
   - `mu-plugins/aionex-core/includes/...` (must include `defaults.php` + updated `mail.php`)
7. Delete the zip after extract
8. WP Admin → refresh  
   You should see **Must-Use** plugins (or Jobs menu in the sidebar)
9. **Settings → Permalinks → Save**
10. **Settings → AIONEX** → confirm HR email is `career@aionexoutsourcing.com`
11. Complete mail: see **[MAIL_SETUP.md](MAIL_SETUP.md)** (WP Mail SMTP + Hostinger mailbox + tests)
12. Test:  
    `https://linen-stinkbug-102889.hostingersite.com/wp-json/aionex/v1/jobs`

## What success looks like

- Left menu shows **Jobs**, **Applications**, **Hire Leads**, **Subscribers**
- Settings → **AIONEX**
- Jobs API returns JSON (not 404)

## If extract nested wrong

If you see `mu-plugins/aionex-mu-plugins/aionex-loader.php`, move files up:

- `aionex-loader.php` must sit **directly** in `mu-plugins/`
- `aionex-core/` folder must sit **directly** in `mu-plugins/`
