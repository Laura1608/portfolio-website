# Internal: Data-flow mapping (data mapping) — why + how

Even when you aim for **local-only** processing (no content data to your servers), a data-flow map is a core accountability artifact:
- It is the practical backbone for documenting **what personal data exists**, where it moves, and who can access it.
- It directly supports a **ROPA** (record of processing activities) where you do process any personal data (eg billing, support, telemetry).
- It is a standard input into a **DPIA** where one is required (or where you want to demonstrate you assessed "high risk").

Regulator practice explicitly ties data-flow mapping to governance:
- GDPR Art. 30 requires records including categories of data, recipients, transfers, retention, and "a general description of the technical and organisational security measures" — all of which are easier/safer to produce from a data map. See Art. 30 GDPR text: `https://gdpr-info.eu/art-30-gdpr/`.
- GDPR Art. 35(7)(a) requires a "systematic description of the envisaged processing operations and the purposes" (DPIA content), which typically includes describing how data flows. See Art. 35 GDPR text: `https://gdpr-info.eu/art-35-gdpr/`.
- EDPB Guidelines 4/2019 (Art. 25) emphasize controllers must be able to **demonstrate** the effectiveness of DPbDD measures and keep **documentation** of the measures and safeguards. (EDPB Guidelines 4/2019 v2.0, adopted 20 Oct 2020) `https://www.edpb.europa.eu/sites/default/files/files/file1/edpb_guidelines_201904_dataprotection_by_design_and_by_default_v2.0_en.pdf`.
- ICO guidance (UK GDPR, but highly aligned in practice) explicitly states: "A data flow mapping exercise is undertaken to document the data that flows in, around, and out of information processing systems or services" and that ROPA should be "informed by data flow mapping exercises." `https://ico.org.uk/for-organisations/advice-and-services/audits/data-protection-audit-framework/toolkits/records-management/data-mapping-and-recording/`.

## Scope for this project (portfolio website)

One data-flow map covering all processing: contact form, waitlist, and website operations. No separate "product" vs "business" split; the website is the product.

## Data-flow map deliverables (keep in repo/private)
For each "processing activity", record:
- **Data categories** (eg email, license key, payment metadata, support tickets, telemetry meta)
- **Data subject categories** (prospects, customers, end-users, admins)
- **Source** (user, payment provider, app client, website)
- **Systems** (website server, email service, waitlist storage, hosting)
- **Transfers** (to vendors; cross-border)
- **Storage locations** (region, cloud provider)
- **Retention** (time and justification)
- **Access** (roles; least privilege)
- **Security controls** (TLS, encryption at rest, secrets mgmt, logging)
- **Legal basis** (contract, legal obligation, legitimate interest, consent)
- **Risks & mitigations** (only high-level here; DPIA holds deeper analysis)

---

# DATA-FLOW MAP: Laura Otto Portfolio (lauraotto.nl)

**Product:** Laura Otto Portfolio
**Last updated:** 2026-02-17
**Architecture:** Website with contact form and AI Masterclass waitlist

## Overview Diagram

```
┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│     Visitor      │────▶│  lauraotto.nl    │────▶│    Railway       │
│  (browser)       │     │  (Express server)│     │    (hosting)     │
└──────────────────┘     └────────┬─────────┘     └──────────────────┘
        │                         │
        │ Contact form            │ Waitlist signup
        │ (name, email, msg)      │ (email, date)
        ▼                         ▼
┌──────────────────┐     ┌──────────────────┐
│     Brevo        │     │  Google Sheets   │
│  (email delivery)│     │  (waitlist DB)   │
│  EEA (France)    │     │  US (SCCs)       │
└────────┬─────────┘     └──────────────────┘
         │
         ▼
┌──────────────────┐
│  Laura's inbox   │  (no persistent server storage of contact content)
└──────────────────┘
```

## Data Flow Table

| Activity | Data | Source | Systems | Recipients/vendors | Retention | Legal Basis |
|---|---|---|---|---|---|---|
| Contact form | Name, email, message, consent_timestamp | User | Express → Brevo → inbox | Brevo (EEA) | Email: 2y after last comm; no server storage | Consent (GDPR Art. 7(1)) |
| Waitlist signup | Email, date | User | Express → Google Sheets API | Google (US) | Until masterclass launch + 1y, or deletion request | Consent |
| Website visit | IP, User-Agent, request path | Visitor browser | Web server | Railway | 90 days (logs) | Legitimate interest |

## Vendor/Subprocessor Summary

| Vendor | Purpose | Data | Location | Safeguards |
|---|---|---|---|---|
| Brevo | Transactional email (contact form) | Name, email, message | France (EEA) | Brevo DPA/GDPR |
| Google Sheets | Waitlist storage | Email, signup date | US | SCCs; explicit consent at signup |
| Railway | Hosting | Server logs, request data | Netherlands (Amsterdam-West, EEA) | Vendor terms |

## Security Controls

| Control | Implementation |
|---|---|
| TLS | HTTPS for all traffic |
| No persistent storage | Contact form content not stored on server; forwarded by email only |
| Consent | Explicit checkbox for contact form and waitlist (Option A); consent_timestamp captured at form submission and included in notification email (GDPR Art. 7(1) evidence) |
| Credentials | Brevo API key, Google creds in env vars only |

---

## Cross-Reference
- **ROPA:** INTERNAL-ROPA-PORTFOLIO.md
- **DPIA Screening:** INTERNAL-DPIA-SCREENING-AND-TEMPLATE.md
- **ToS Due Diligence:** INTERNAL-TOS-DUE-DILIGENCE-LOG.md
- **Configuration:** LEGAL-CONFIG.json
