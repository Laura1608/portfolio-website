# Internal: Security incident response plan (website)

Goal: respond quickly, contain impact, preserve evidence, and meet GDPR breach notification duties.

**Product:** Laura Otto Portfolio (lauraotto.nl)

## 1) Scope
Applies to incidents involving:
- website (lauraotto.nl),
- contact form / Brevo,
- waitlist / Google Sheets,
- hosting (Railway),
- accidental leakage (logs, env vars, email).

## 2) Roles
- **Incident Commander + Comms**: Laura Otto
- **Security + Engineering Lead**: Laura Otto
- **Legal/Privacy**: [To be designated; external counsel for breach scenarios]
- **Vendor Liaison**: Laura Otto

## 3) Triage checklist (first hour)
- What happened? When detected? By whom?
- Systems affected? Data categories potentially exposed?
- Ongoing compromise? (Yes/No)
- Immediate containment actions (disable affected feature, revoke keys, block endpoints)
- Preserve evidence (logs, hashes, screenshots, store listing versions)
- Start incident timeline.

## 4) Containment & eradication
- Rotate credentials/secrets (API keys, signing keys, tokens)
- Revoke compromised certificates and re-sign releases if needed
- Patch vulnerability; add detection rules
- Validate clean builds; check CI/CD integrity

## 5) Recovery
- Restore services safely
- Monitor for recurrence
- Post-incident review and long-term remediation

## 6) Notification duties (high-level)
If you are a controller/processor for personal data, assess breach notification duties.
- GDPR generally requires notifying the supervisory authority **within 72 hours** after becoming aware of a personal data breach, unless unlikely to result in risk, and notifying affected individuals when high risk. (Legal text for breach notification is in GDPR Art. 33/34 — not reproduced here.)
- If you don't process the leaked data (e.g. it is held only by a third party), you may still have contractual duties to clients or vendors.

Document the decision:
- whether this was a "personal data breach,"
- risk assessment,
- whether notifications were made and why.

## 7) Extension-specific actions (if applicable)
- Immediately unpublish or disable the extension in stores if compromise is suspected
- Roll keys and update signing/release pipeline
- Force-update messaging to users (where store supports it)
- Restrict permissions and domains in next release

## 8) Post-incident deliverables
- Incident report (what/why/impact)
- Root cause analysis
- Remediation plan with owners and dates
- Evidence archive path
