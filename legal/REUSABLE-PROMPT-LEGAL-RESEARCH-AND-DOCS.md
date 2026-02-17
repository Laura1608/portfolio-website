# Reusable AI Prompt: Extensive Web Research & Legal Documentation for Software/SaaS Projects

**Purpose:** Use this prompt in new projects to instruct an AI assistant to perform comprehensive web research and generate compliant legal documentation. Copy this prompt and the `legal/` folder structure from this project as a template into each new project. Adapt the prompt and documents per project.

---

## HOW TO USE

1. **Copy this prompt** to the new project (e.g., in `legal/PROMPT-LEGAL-RESEARCH.md` or in the project root).
2. **Copy the `legal/` folder** from this project to the new project as the reference template. The AI will use it as the structural and content template.
3. **Fill in the project variables** (Section A below) before running the prompt.
4. **Run the full prompt** with an AI that has web search capability. Iterate as needed.

---

## PROMPT START

You are helping bring a software/SaaS product to market in a compliant way. Your task is to:

1. **Perform extensive web research** on applicable laws, regulations, and compliance requirements.
2. **Analyze the specific product** (software type, data flows, third-party integrations, target market).
3. **Create or adapt legal documentation** by using the **legal folder structure** (see path: `legal/` in this workspace).
4. **Ensure all standardized guidelines** from the reference project are carried over into the new project (company info, retention periods, support response times, vendor details, etc.).
5. **Identify gray zones** and, for each: clearly define the issue, assess risk, and propose **legal alternatives** so the tool can still be published safely.

---

## A) PROJECT VARIABLES

| Variable | Example Values | Description |
|----------|----------------|-------------|
| **Software type** | Portfolio page with contact form | Determines which regulations apply |
| **URL** | lauraotto.nl
| **Primary function** | Show potential clients my public work | What the product does |
| **Data processed** | Contact details for support through smtp email server / Minimal | Drives GDPR/DPIA analysis |
| **Third-party integrations** | None | May require ToS due diligence |
| **Deployment** | Website | Affects EULA, store policies |
| **Target market(s)** | Netherlands / EU | Determines governing law |
| **Revenue model** | None | Affects Terms of Sale |
| **Does it extract/store PDF or document content?** | No | Different regulations for document extraction |
| **Does it automate user actions on third-party sites?** | No | ToS compliance, automation rules |
| **Company info** | Use `LEGAL-CONFIG.json` (Laura Otto Solutions) | Copy and adapt as needed |

---

## B) REFERENCE LEGAL FOLDER STRUCTURE

Use the following as the **canonical structure**. All documents must be adapted (not blindly copied) to the new product. Only apply when specific documents are needed based on project variables in section A (base on thorough research and thinking).

### Public-facing documents (ship with product / website)

- `privacy.html` – Privacy policy (incl. cookies)
- `terms.html` – Terms of Use / EULA
- `vulnerability-disclosure.html` – Vulnerability disclosure

### Internal governance (keep private)

- `LEGAL-CONFIG.json` – **Central source of truth** (company, product, retention, support times, vendors)
- `INTERNAL-DATAFLOW-MAPPING.md` – Data flows (product + business)
- `INTERNAL-DPIA-SCREENING-AND-TEMPLATE.md` – DPIA screening + template
- `INTERNAL-ROPA-PORTFOLIO.md` (or template) – Record of Processing Activities (GDPR Art. 30)
- `INTERNAL-TOS-DUE-DILIGENCE-LOG.md` – Third-party ToS / store policy due diligence
- `INTERNAL-INCIDENT-RESPONSE-PLAN.md` – Breach notification, roles, timeline
- `INTERNAL-CREDENTIALS-SECURITY-PORTFOLIO.md` – How credentials are (or are not) handled
- `INTERNAL-LEGAL-INDEX.md` – Index/checklist of all documents

---

## C) STANDARDIZED GUIDELINES TO CARRY OVER

These values must be **copied into the new project** and adjusted only where the new product differs. Use `LEGAL-CONFIG.json` as the single source of truth.

### Company (default – Laura Otto Solutions)

- **Legal name:** Laura Otto Solutions  
- **Address:** Gijsbrecht van Aemstelstraat 26, 2026 VH Haarlem, The Netherlands  
- **Registration (KvK):** 94716501  
- **VAT:** NL005104012B61  
- **Support email:** lauraottosolutions@gmail.com  

### Retention periods

- Billing records: 7 years (Dutch statutory)
- Support tickets: 2 years after resolution  
- Support attachments: 90 days after closure  
- License logs: Duration of subscription + 1 year  
- Website logs: 90 days  
- Analytics: 26 months (if applicable)

### Support response times (best effort)

- S1 critical: 4 business hours  
- S2 high: 1 business day  
- S3 normal: 3 business days  
- Business hours: Monday–Friday, 09:00–17:00 CET  

### Payment

- Processor: Stripe  
- Use: one-time and/or subscription  
- Terms: Net 14 days  
- Currency: EUR  
- VAT: exclusive (reverse charge where applicable)

### Vendors

- Payment: Stripe  
- Hosting: Railway
- Analytics: Google Analytics (if used)

### International transfers

- Document current transfers (e.g., EEA-only)  
- If subprocessors outside EEA: Standard Contractual Clauses (SCCs)

Update `LEGAL-CONFIG.json` in the new project with product-specific fields (product name, description, URLs) while preserving the above structure.

---

## D) RESEARCH & COMPLIANCE CHECKLIST BY SOFTWARE TYPE

Adapt the following based on the **software type** variable. Not all items apply to every product.

### 1. Automation / scraping / portal integration

- [ ] Third-party ToS (portal, API, service) – document in `INTERNAL-TOS-DUE-DILIGENCE-LOG.md`  
- [ ] Prohibitions on automation, bots, scraping  
- [ ] User-in-the-loop design to reduce ToS risk  
- [ ] Credential handling: never store/capture; user logs in on official page  
- [ ] Rate limiting, human-speed interaction  

### 2. PDF extraction / document processing

- [ ] Copyright and licensing of extracted content  
- [ ] Data protection for document content (personal/special categories)  
- [ ] Jurisdiction-specific rules (e.g., tax documents, medical records)  
- [ ] Local vs. cloud processing; DPIA if server-side  

### 3. Browser extension

- [ ] Store policies (Chrome Web Store, Mozilla AMO, Edge)  
- [ ] Single purpose, minimal permissions  
- [ ] Privacy disclosures; no deceptive behavior  

### 4. SaaS / web app (server-side processing)

- [ ] Controller vs. processor status  
- [ ] DPA with subprocessors  
- [ ] DPIA if high-risk processing  
- [ ] Cross-border transfers (SCCs, adequacy)  

### 5. AI/ML products

- [ ] AI Act (EU) – risk classification  
- [ ] Transparency and explainability  
- [ ] Training data provenance and rights  
- [ ] Automated decision-making (GDPR Art. 22)  

### 6. AI chatbot with personalized user profile

- [ ] AI Act (EU) – risk classification (e.g., limited-risk, high-risk if profiling)  
- [ ] Personalization data (preferences, history, behavior) – legal basis, consent vs. legitimate interest  
- [ ] Retention of conversation history and profile data – purpose limitation, data minimization  
- [ ] User rights: access, rectification, deletion of profile and chat history  
- [ ] Transparency: explain that responses are AI-generated; human oversight where required  
- [ ] Subprocessor DPAs (e.g., OpenAI, Anthropic) – data processing, retention, opt-outs  
- [ ] Cross-border transfers – AI provider location; SCCs, adequacy  

### 7. SaaS built around an API (public and internal)

- [ ] API Terms of Use / Developer Agreement – separate from EULA if third parties integrate  
- [ ] Rate limits, quotas, acceptable use – document and enforce  
- [ ] Authentication and key management – security, revocation, no key sharing  
- [ ] Public API vs. internal API – different disclosure, SLAs, support obligations  
- [ ] Data processed via API – request/response logging, PII in payloads  
- [ ] B2B vs. B2C – DPA, SLA, liability caps for API customers  
- [ ] Versioning and deprecation – notice periods, backward compatibility  

### 8. Consumer software (NL/EU)

- [ ] Burgerlijk Wetboek (BW) – warranties, updates, withdrawal rights  
- [ ] Withdrawal (14 days) – checkbox for immediate download  
- [ ] Handelsregisterwet – mandatory company info on website  
- [ ] EAA accessibility (from 28 June 2025) – micro-enterprise exemption  

### 9. GDPR / data protection (all products)

- [ ] ROPA (Art. 30) for any personal data processing  
- [ ] DPIA screening (Art. 35) – document if required or not  
- [ ] Data-flow mapping  
- [ ] Breach notification (72 hours) – incident response plan  

---

## E) GRAY ZONE HANDLING

For any **gray zone** (ambiguous law, conflicting guidance, unclear ToS):

1. **Define the issue**  
   - Exact legal or contractual uncertainty  
   - Relevant law, regulation, or policy  
   - Why it is unclear  

2. **Assess risk**  
   - Likelihood of challenge  
   - Possible consequences (account ban, fines, litigation)  
   - Worst-case scenario  

3. **Propose legal alternatives**  
   - Option A: Conservative (e.g., remove feature, add disclaimers)  
   - Option B: Middle ground (e.g., design change, explicit consent)  
   - Option C: Proceed with mitigations (disclaimers, documentation, legal review)  

4. **Document**  
   - Before proceeding with creating the documents, provide a md overview with the gray zone options and ask me how to proceed. 
   - Note: "Gray zone – [summary]. Alternative option: [list]. Decision: [chosen approach]."  

**Goal:** Enable launch while reducing legal risk. If a feature cannot be made compliant, recommend removing it or offering it in a way that it is legally allowed. 

Process: Produce gray zone memo; pause before creating documents and ask which option to choose for each item.
In case of gray zone, recommend the best, safe alternative so that I can continue bringing the product on the market, preferred with minimal changes.

---

## F) DELIVERABLES

Produce:

1. **Updated/created legal documents** – All public and internal docs adapted to the new product.  
2. **Updated `LEGAL-CONFIG.json`** – Product, company, URLs, retention, vendors, support.  
3. **Research summary** – Bullet list of laws/regulations researched, key findings, sources.  
4. **Gray zone memo** – All gray zones with: issue, risk, alternatives, recommended approach.  
5. **Pre-launch checklist** – Action items (e.g., cookie consent, checkout text, EULA acceptance flow).  
6. **Adjustments in production** - Added legal links, disclaimers, consent, etc.

---

## G) EXAMPLE USAGE (paste into AI chat)

```
I'm bringing a new software product to market. Please:

1. Use the legal/ folder in this project as the reference template.

2. Project variables:
   - Product name: [YOUR PRODUCT NAME]
   - Software type: [e.g., SaaS web app]
   - Primary function: [e.g., Project management with AI summaries]
   - Data processed: [e.g., Personal data, project content]
   - Third-party integrations: [e.g., OpenAI API, Stripe]
   - Deployment: [e.g., Web app]
   - Target market: 
   - Revenue model: 
   - PDF extraction: 
   - Automates third-party sites: 

3. Perform extensive web research on:
   - Relevant Dutch/EU law for this software type
   - GDPR, AI Act (if applicable), consumer rights, mandatory website info
   - Any third-party ToS (APIs, cloud providers)

4. Create/adapt all legal documents in the legal/ folder. Copy standardized guidelines from LEGAL-CONFIG.json (company, retention, support times) and update only product-specific fields.

5. For any gray zones, define the issue, assess risk, and propose legal alternatives so we can still publish.

6. Output: updated docs, research summary, gray zone memo, pre-launch checklist.

Note: Adapt all documents in the legal/ folder to this specific project.
```

---

## H) SOURCES TO CONSULT (web research)

- GDPR: gdpr-info.eu, edpb.europa.eu  
- ICO (UK): ico.org.uk  
- Dutch law: wetten.overheid.nl, Autoriteit Consument & Markt (ACM), Autoriteit Persoonsgegevens  
- EU AI Act: eur-lex.europa.eu  
- Store policies: Chrome Web Store, Mozilla AMO, Microsoft Edge Add-ons  
- Payment: Stripe legal, PCI DSS (if handling card data)  
- Relevant third-party ToS (portals, APIs, cloud providers)

---
