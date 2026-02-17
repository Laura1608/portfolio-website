# Internal: Credentials security – Laura Otto Portfolio

**Product:** lauraotto.nl  
**Last updated:** 2026-02-17

## Credentials in use

| Credential | Purpose | Storage | Access |
|---|---|---|---|
| BREVO_API_KEY | Contact form email delivery | Environment variable (Railway) | Server process only |
| GOOGLE_CREDENTIALS_JSON | Google Sheets API (waitlist) | Environment variable (Railway) | Server process only |
| ADMIN_EMAIL | Recipient for contact form | Environment variable | Server process only |

## Controls

- No credentials in source code or repository
- TLS for all API calls
- Least privilege: keys used only for intended purpose
- Rotate keys if compromise suspected (see INTERNAL-INCIDENT-RESPONSE-PLAN.md)
