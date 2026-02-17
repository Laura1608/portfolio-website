# Gray Zone Memo – Laura Otto Portfolio (lauraotto.nl)

**Date:** 2026-02-17  
**Decision:** Option A (most conservative) for all gray zones

---

## 1. International transfers (Brevo / Google)

**Issue:** Brevo (France) is EEA-based. Google Sheets API processes data in the US. May require SCCs and/or adequacy.

**Risk:** GDPR Art. 44–50; potential fines if transfers lack proper safeguards.

**Option A (chosen):**  
- **Brevo:** Use as-is (EEA processor). Document in ToS due diligence.  
- **Google Sheets:** Add explicit consent at waitlist signup ("I consent to my email being stored by our provider, which may process data outside the EEA under Standard Contractual Clauses"). Document Google's CDPA/SCCs in internal ToS log. Privacy Policy must list Google as subprocessor and describe transfer mechanism.

---

## 2. Contact form legal basis

**Issue:** Consent vs legitimate interest for processing name, email, message.

**Risk:** AP may challenge legitimate interest for cold contact forms; consent is the least disputable basis.

**Option A (chosen):** Use **consent** (GDPR Art. 6(1)(a)). Add an unchecked checkbox: "I have read the Privacy Policy and consent to my data being processed to respond to this inquiry." Form cannot be submitted without ticking the box.

---

## 3. Waitlist – Google Sheets as database

**Issue:** Emails stored in Google Sheets (US subprocessor), retention, purpose limitation.

**Risk:** Purpose creep, unclear retention, lack of user rights path.

**Option A (chosen):**  
- Explicit consent at signup with link to Privacy Policy.  
- Define retention in LEGAL-CONFIG: "Until masterclass launch + 1 year, or until user requests deletion."  
- Privacy Policy and ROPA document purpose, retention, and user rights (access, erasure, portability).  
- Document Google CDPA/SCCs in ToS due diligence log.

---

## 4. ePrivacy / cookie disclosure

**Issue:** No analytics cookies; server logs only. Need cookie policy?

**Risk:** ePrivacy requires transparency; some EU countries require cookie policy even for strictly necessary cookies.

**Option A (chosen):** Add a short "Cookies and similar technologies" section in Privacy Policy stating:  
- We do not use non-essential cookies (no analytics, no marketing).  
- Server logs (IP, timestamp, etc.) are processed for security and operation under legitimate interest.  
- If we introduce analytics or marketing cookies later, we will obtain prior consent and update this policy.  
No cookie banner required for current setup (no non-essential cookies).

---

## 5. EAA accessibility (28 June 2025)

**Issue:** EU Accessibility Act may require websites to meet accessibility standards.

**Risk:** Micro-enterprises may be exempt; unclear application to small portfolio sites.

**Option A (chosen):** Assume obligation applies. Document in pre-launch checklist: "Assess EAA compliance; implement basic accessibility (semantic HTML, alt text, sufficient contrast) where practicable." Add to future iteration rather than blocking launch.

---

## Summary

| Gray zone | Option A decision |
|-----------|-------------------|
| International transfers | Brevo: EEA OK. Google: explicit consent + document SCCs. |
| Contact form legal basis | Explicit consent via checkbox. |
| Waitlist / Google Sheets | Explicit consent, defined retention, document subprocessor. |
| Cookie disclosure | Add cookie section in Privacy Policy; no banner for current setup. |
| EAA accessibility | Assess and improve; do not block launch. |
