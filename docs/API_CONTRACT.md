# AIONEX REST API (`/wp-json/aionex/v1`)

## Read

### `GET /jobs`

Query: `q`, `location`, `department`, `seniority`, `work_mode`, `page`, `per_page`, `featured`.

Returns only published jobs with `job_status=open`.

### `GET /jobs/{slug}`

Single open job. 404 if missing/closed.

### `GET /job-filters`

Taxonomy terms for filter UI.

## Write (honeypot field `company_url` + rate limits)

### `POST /apply` (multipart)

Fields: `job_id`, `name`, `email`, `phone`, `linkedin`, `cover_note`, `resume` (PDF/DOC/DOCX ≤ 5MB).

Creates `application` CPT, stores resume in Media, emails Admin/HR, and sends applicant auto-reply.

### `POST /hire` (JSON)

Creates `hire_lead`, emails Admin/HR, and sends employer auto-reply.

### `POST /subscribe` (JSON)

Creates `job_subscriber`, sends confirm email.

### `POST /unsubscribe` (JSON)

Body: `{ "token": "..." }` — deactivates subscriber.

### `POST /contact` (JSON)

Emails Admin/HR and sends sender auto-reply. No public CPT.

## Privacy

Public responses never include resumes, applicant emails, subscriber lists, or hire-lead PII.
