# Pre-Launch Checklist – Laura Otto Portfolio

**Product:** lauraotto.nl  
**Last updated:** 2026-02-17

## Completed

- [x] Privacy Policy published at /legal/privacy.html
- [x] Terms of Use published at /legal/terms.html
- [x] Vulnerability disclosure policy at /legal/vulnerability-disclosure.html
- [x] Footer links to Privacy, Terms, Responsible disclosure on all pages
- [x] Handelsregisterwet: company name, address, KvK, VAT in footer
- [x] Contact form: consent checkbox (Privacy Policy + data processing)
- [x] Waitlist: consent checkbox (storage, EEA transfer)
- [x] LEGAL-CONFIG.json updated for portfolio
- [x] INTERNAL-DATAFLOW-MAPPING, ROPA, DPIA screening, ToS log, Incident plan updated

## Before / at launch

- [ ] Verify BREVO_API_KEY, GOOGLE_CREDENTIALS_JSON, ADMIN_EMAIL set in production (Railway)
- [ ] Test contact form end-to-end
- [ ] Test waitlist signup end-to-end
- [ ] Confirm legal pages load correctly at lauraotto.nl/legal/*

## Future (non-blocking)

- [ ] EAA accessibility: assess micro-enterprise exemption; implement basic accessibility (alt text, contrast) where practicable
- [ ] If adding Google Analytics: implement cookie consent banner first
- [ ] Periodic review of vendor ToS (Brevo, Google, Railway)

---

## Actions still pending (summary)

All remaining to-dos from the legal documentation:

| Priority | Action | Source |
|----------|--------|--------|
| Before launch | Confirm legal pages load at lauraotto.nl/legal/* | This checklist |
| Optional | Designate Legal/Privacy role for incidents (e.g. external counsel) | INTERNAL-INCIDENT-RESPONSE-PLAN.md |
| Optional | EAA accessibility: assess exemption; add alt text, contrast where practicable | GRAY-ZONE-MEMO, this checklist |
| Ongoing | If you add analytics cookies: implement consent banner and update Privacy Policy | Privacy Policy, this checklist |
| Ongoing | Periodic re-check of Brevo, Google, Railway ToS | INTERNAL-TOS-DUE-DILIGENCE-LOG.md |
