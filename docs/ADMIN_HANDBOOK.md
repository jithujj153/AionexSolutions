# AIONEX admin handbook (WordPress)

## Daily workflow

1. **Post a job** → Jobs → Add New  
   - Title + JD body  
   - Set Status = Open  
   - Assign Location / Department / Seniority / Work Mode  
   - Optional: Featured on home, salary range  
   - Publish

2. **Close a job** → edit job → Status = Closed (or unpublish). It disappears from the public site.

3. **Review applications** → Applications  
   - Open entry → download resume → contact candidate

4. **Hire leads** → Hire Leads (employer requests)

5. **Subscribers** → Subscribers (job alert list)

## Email

Full setup: [MAIL_SETUP.md](MAIL_SETUP.md).

**Summary**

1. Hostinger mailbox for `Business@aionexoutsourcing.com`
2. Install **WP Mail SMTP** → Other SMTP → Hostinger credentials → Send Test
3. **Settings → AIONEX** — HR emails + From = that mailbox; public site URL = Vercel

**What gets emailed (plugin 1.0.3+)**

- Apply / Hire / Contact → HR notification
- Apply / Hire / Contact → auto-reply to the person who submitted
- Job alerts → confirm email + notify on new job publish

## Important rules

- Only staff post jobs.
- Employers use the Hire form — they cannot search candidates.
- Candidate resumes are private to Admin/HR.
