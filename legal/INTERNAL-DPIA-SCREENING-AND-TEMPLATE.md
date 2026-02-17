# Internal: DPIA screening + lightweight DPIA template

This is an internal tool. It helps you decide whether you *should* do a DPIA (GDPR Art. 35) and provides a template when you do.

## 1) DPIA screening (quick decision tool)

### A. Baseline: are *we* a controller for any personal data processing?
Even if the product is "local-only," you almost certainly process some personal data as a business (eg sales/billing/support).
- If **yes**, GDPR accountability applies to those processing activities (ROPA, security, etc.).
- If **no** (rare), document the rationale anyway (scope memo).

### B. Does the new/changed processing look "likely to result in a high risk"?
GDPR Art. 35(1) triggers a DPIA where the processing is likely to result in a **high risk**, especially using new technologies and considering nature/scope/context/purposes.
Art. 35(3) highlights cases that "in particular" require a DPIA, including:
- systematic and extensive evaluation based on automated processing/profiling with significant effects,
- large-scale processing of special categories (Art. 9) or criminal data (Art. 10),
- systematic monitoring of publicly accessible areas on a large scale.
Source (legal text): `https://gdpr-info.eu/art-35-gdpr/`.

### C. Heuristics that often push you toward doing a DPIA (even if not strictly required)
- large-scale or systematic processing of special-category or sensitive data,
- automation that meaningfully changes the user's control (e.g. unattended submissions),
- telemetry/analytics that can reveal sensitive behavior or profiles,
- broad access to user data (e.g. third-party integrations, extensions),
- server-side processing of sensitive content.

### D. When a DPIA is usually *not* necessary (but still document)
- processing limited to common scenarios (contact forms, waitlists, website logs),
- no telemetry, no profiling, no special-category data,
- consent or legitimate interest clearly applied; retention and vendors documented.

Outcome: record one of:
- **DPIA required**
- **DPIA not required, rationale documented**
- **Unsure → do DPIA anyway** (often cheaper than defending "we didn't" later)

---

## DPIA SCREENING DECISION: Laura Otto Portfolio

**Product:** Laura Otto Portfolio (lauraotto.nl)  
**Date:** 2026-02-17  
**Decision:** **DPIA NOT REQUIRED** – rationale documented below

### Screening Analysis

#### A. Are we a controller for any personal data processing?

**Yes** – We process personal data for:
- Contact form responses (name, email, message) – consent
- AI Masterclass waitlist (email, date) – consent
- Website logs (IP, timestamps) – legitimate interest

#### B. Does processing "likely result in high risk"?

**No** – Does not meet Art. 35(1) or 35(3) thresholds:

| Art. 35(3) Criterion | Applicable? |
|---|---|
| Systematic/extensive automated evaluation with significant effects | No |
| Large-scale special category data (Art. 9) or criminal data (Art. 10) | No |
| Systematic monitoring of publicly accessible area on large scale | No |

#### C. Additional heuristics check

| Risk Factor | Present? |
|---|---|
| Special category data | No |
| Profiling / automated decision-making | No |
| Large-scale processing | No |
| New technology with unknown implications | No |

#### D. Why DPIA is not required

1. **Minimal data**: Contact form and waitlist only; no billing, no special categories.
2. **Consent-based**: Contact form and waitlist use explicit consent (Option A).
3. **Common safeguards**: TLS, no analytics cookies, defined retention, vendor documentation.

### Factors that would trigger re-evaluation

A DPIA should be reconsidered if:
- [ ] Server-side processing of special-category or large-scale personal data is introduced
- [ ] Telemetry or crash reporting that captures user content is added
- [ ] Automated submission or unattended operation is implemented
- [ ] Analytics tracking user behavior is enabled
- [ ] New third-party integrations with broad data access are added
- [ ] AI/ML features processing user data are introduced

### Documentation cross-references

- Data flows: See INTERNAL-DATAFLOW-MAPPING.md
- Processing activities: See INTERNAL-ROPA-PORTFOLIO.md
- Incident response: See INTERNAL-INCIDENT-RESPONSE-PLAN.md
- Credentials security: See INTERNAL-CREDENTIALS-SECURITY-PORTFOLIO.md

## 2) DPIA template (GDPR Art. 35(7) aligned)

Art. 35(7) requires at least:
- systematic description of processing + purposes,
- necessity/proportionality,
- risk assessment,
- measures envisaged to address risks. Source: `https://gdpr-info.eu/art-35-gdpr/`.

### DPIA: [Feature / System / Release]
- **Owner**:
- **Date**:
- **Version**:
- **Status**: Draft / Approved / Needs review

#### 1. Systematic description of processing operations and purposes
- **Processing activity name**
- **Purpose(s)**
- **Data subjects**
- **Data categories**
- **Source(s) of data**
- **Data flows** (link to `INTERNAL-DATAFLOW-MAPPING.md` + diagram/table)
- **Recipients** (including vendors)
- **International transfers** (where, what safeguards)
- **Retention** (and deletion/anonymization)
- **Legal basis** (Art. 6; and Art. 9 condition if relevant)

#### 2. Necessity and proportionality
- Why is each data category necessary?
- What less-intrusive alternatives exist? Why rejected?
- Data minimization (default settings)
- User controls (opt-in/opt-out; "human-in-the-loop")
- Transparency (what notices are shown; where)

#### 3. Risk assessment to rights and freedoms
For each risk, record likelihood/severity and affected rights:
- confidentiality breach (sensitive or personal data),
- integrity (incorrect or unintended processing),
- availability (service lockout, failed operations),
- user deception / loss of control,
- unlawful access or ToS violations (e.g. account suspension),
- abuse of third-party integrations or permissions.

#### 4. Measures to address risks (safeguards + security + compliance mechanisms)
Examples:
- data minimization; no unnecessary logging of content
- secrets management; no storage of third-party credentials; user authenticates with provider where applicable
- least-privilege access; minimal permissions for any integrations
- strong update/signing pipeline; code review; SAST/DAST
- rate limiting / backoff to avoid abusive patterns
- vendor DPAs + subprocessor register (if any vendors)
- incident response and breach notification workflow (see `INTERNAL-INCIDENT-RESPONSE-PLAN.md`)

#### 5. Residual risk & sign-off
- Residual risk statement
- DPO/legal review (if applicable)
- Approval
- Next review date (eg at major architecture change)
