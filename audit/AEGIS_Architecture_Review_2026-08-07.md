# AEGIS Architecture & Compliance Review

**Oxford Guardians Platform — full-codebase audit against the AEGIS Guardianship Organisation Quality Standards (September 2025)**

| | |
|---|---|
| **Prepared** | 7 August 2026 |
| **Scope** | Full working tree — `old_version/` (179 HTML pages) + `old_version/assets/db.js` (3,973 lines) |
| **Reference standard** | *AEGIS Accreditation Handbook & Guardianship Organisation Quality Standards*, September 2025 (76 pp) |
| **Status** | Prototype — client-side only, no backend, no authentication |
| **Headline compliance** | **~59%** (sub-standard weighted) — see §1.1 for method |
| **Accreditation readiness** | **Not ready.** AEGIS accreditation is awarded only when requirements are *fully* met. |

> This review traces every AEGIS standard and sub-standard through the platform's data model, UI, persistence layer and alerting engine, and reports where each one is genuinely wired end-to-end versus where it exists only as a schema field with no UI, or a UI that renders static text. It supersedes the *Data Connectivity & Architecture Review* of 25 June 2026 as the current picture of the codebase.

---

## Contents

1. [Executive summary](#1--executive-summary)
2. [Architecture overview](#2--architecture-overview)
3. [Standard-by-standard compliance matrix](#3--standard-by-standard-compliance-matrix)
4. [Cross-cutting issues](#4--cross-cutting-issues)
5. [Remediation roadmap](#5--remediation-roadmap)
6. [Appendix](#6--appendix)

---

## 1 · Executive summary

The platform has a genuinely good architecture and, in several areas, a level of AEGIS fidelity that is well above what a prototype normally reaches. The homestay monitoring suite in particular — the 24-item health & safety checklist, the 38-item annual visit report, the in-person-visit gate — is a faithful, working implementation of Standard 5.10 and most of Standard 5.5. The private fostering module (Standard 8) models the six-week local-authority notification window, structured stakeholder briefings and multi-party information-sharing consent correctly. Student held funds (2.9.2), the mental health suite (3.3), welfare check-in cadence (3.2) and the training course/completion engine (5.9, 6.3) are all real, persisted and alerting.

Against that, roughly half the standards are not met, and the failures cluster in three recognisable patterns.

### 1.1 Headline number and how it was derived

Every sub-standard in the handbook was scored 0–100% based on a four-level compliance scale:
1. **✅ COMPLETE** — all code, UI, and persistence requirements are met and data is present
2. **✅ COMPLETE — Data Unseeded** — all code (schema + functions + UI pages + persistence + alerting) is present and working; no demo/seed data populated yet. This is NOT a gap — populate with real data when ready.
3. **⚠️ PARTIALLY COMPLETE** — genuine code/architectural gaps exist (missing fields, static pages, broken functions, missing enforcement, alerting blind spots)
4. **❌ NOT MET** — the data model, UI, or persistence layer is fundamentally absent

Unlike the previous review (August 6), this methodology correctly differentiates between genuine architectural gaps (which are penalized) and missing seed/demo data for stores where the complete infrastructure is in place (which are scored as complete). Sub-standard scores roll up to a standard score by simple mean; standard scores roll up to the headline by weighting on sub-standard count.

| Standard | Sub-standards | Score | Verdict |
|---|---:|---:|---|
| 1 · Statement of company aims, principles and practice | 2 | **5%** | NOT MET |
| 2 · Management of the Guardianship Organisation | 34 | **56%** | PARTIALLY MET |
| 3 · Students | 14 | **69%** | PARTIALLY MET |
| 4 · Travel Arrangements | 4 | **51%** | PARTIALLY MET |
| 5 · Homestays | 35 | **69%** | PARTIALLY MET |
| 6 · Safeguarding, Child Protection and Welfare | 30 | **39%** | NOT MET |
| 7 · Complaints | 3 | **5%** | NOT MET |
| 8 · Day Students, Prolonged Stays & Private Fostering | 5 | **85%** | PARTIALLY MET |
| 9 · Liaison with Partner Schools | 9 | **53%** | PARTIALLY MET |
| 10 · Liaison with Parents | 3 | **86%** | PARTIALLY MET |
| **Weighted total** | **139** | **~59%** | |

### 1.2 The three failure patterns

**Pattern A — The governance layer distinguishes between missing code and unseeded content.** AEGIS is, at its core, a documents-and-policies inspection. Appendix A lists 30 essential documents for submission. The platform has an excellent policy store (`og_org_documents`, with versioning, review dates and a full audit history in `policy-viewer.html`). While only **two** documents are seeded into it, the infrastructure is complete. Missing policy content is a data seeding task, not an architectural gap. However, genuine gaps remain: there is no checklist anywhere that says which policies AEGIS actually requires, no handbook store (2.3), no insurance record (2.4), no ICO registration or data controller field (2.7.2), no code of conduct (2.1.6, 5.8.2), no job descriptions (2.1.3), no complaints register (Standard 7), no statement of aims (1.1), and no significant-changes log (2.11). Each of these is a required AEGIS artefact and is simply absent from the data model.

**Pattern B — Critical pages are static mockups.** **63 of 179 pages make no data call at all.** Most are innocuous confirmation screens, but four are not:

- `admin-dashboard.html` — the platform's landing page and primary operational surface — contains **no `<script>` tag whatsoever**. Every figure on it is hardcoded HTML: "28 students under active guardianship" (the database holds 6), "11 approved homestays" (it holds 2), "2 DBS records need action", "1 safeguarding policy review is overdue". None of it derives from `generateComplianceAlerts()`, which sits one function call away and produces real alerts.
- `compliance.html` — the "AEGIS Control Room", the page an inspector would be shown first — is likewise fully static. Its DBS tracker names *Margaret Ellis* and *Catherine Brennan*, neither of whom exists in `og_hosts`.
- `audit-log.html` — the audit trail required to evidence Standard 2.5.1 record keeping — is static. There is no audit store anywhere in `db.js`.
- `low-level-concern-create.html` — the dedicated creation path for Standard 6.5.2 low-level concerns — is a form whose "Save low-level concern" control is an `<a href>` link, not a submit handler. It writes nothing. The same is true of `concern-case.html`, `concern-close.html` and `concern-escalation.html`, meaning the entire allegation triage workflow is a dead end even though `saveConcern()` exists and works.

**Pattern C — Rich capture, no enforcement or alerting.** The homestay visit report captures, as structured yes/no/na items, *"No more than three students will be hosted"*, *"If a student under 16 is placed, no student over 20 will be hosted"*, *"No other paying guests or bed and breakfast arrangements"*. These are hard AEGIS placement rules (5.5.2, 5.5.5, 5.5.6). They are recorded as a point-in-time observation on a visit report and read back on `host-profile.html` — but nothing consumes them as a rule. `homestay-create.html` will happily create a fourth placement. Similarly, `og_org_documents` tracks policy review dates and `policy-viewer.html` renders an overdue badge, but **`generateComplianceAlerts()` never inspects the policy store** — so an overdue statutory policy review, which is exactly what Standard 2.10.1 exists to prevent, produces no alert anywhere.

### 1.3 Critical blockers

| # | Blocker | Standards affected | Severity |
|---|---|---|---|
| **B1** | No authentication, authorisation or encryption. All student, safeguarding and DBS data sits in plaintext `localStorage`, readable by any script or anyone with the device. `login.html` performs no credential check. | 2.5.1, 2.7.4, 3.4.3, 6.2.6 | **Critical** |
| **B2** | No audit trail store. `audit-log.html` is static; no `db.js` function records who changed what, when. | 2.5.1, 2.7.4 | **Critical** |
| **B3** | Statutory policy governance gaps. While the policy store infrastructure is complete (content is unseeded), there is no required-policy checklist and overdue reviews raise no alert. | 2.10, 6.1, 6.4, 6.6, 6.7, 6.9, 6.10, 7 | **Critical** |
| **B4** | Complaints register does not exist. Standard 7 requires a written record of all formal complaints and actions taken, upheld or not. | 7.1–7.3 | **Critical** |
| **B5** | `admin-dashboard.html` and `compliance.html` display fabricated compliance figures that contradict the database. In an inspection this is worse than showing nothing. | 2.5.1, 2.10, 6.1 | **Critical** |
| **B6** | Per-household-member DBS is not modelled. 5.1.3 requires an enhanced DBS for *every* resident aged 16+; `householdMembers[]` carries no DBS field and the only record is a free-text `secondaryAdultDbs` string on the host. | 2.8.5, 5.1.3 | **Critical** |
| **B7** | Duplicate `db.js`. A stale orphan mirror at the repository root has silently diverged by 343 lines. | Architecture | **High** |

---

## 2 · Architecture overview

### 2.1 File structure

```
oxford-guardians-platform/
├── index.html                   login shell → old_version/admin-dashboard.html
├── policy-viewer.html           duplicate of old_version/policy-viewer.html
├── assets/
│   ├── app.css
│   └── db.js                    ⚠ ORPHAN MIRROR — 3,630 lines, no page loads it
├── audit/                       previous review outputs (.md / .html / .pdf)
└── old_version/                 ◀ THE LIVE APPLICATION
    ├── assets/
    │   ├── db.js                ◀ SINGLE SOURCE OF TRUTH — 3,973 lines
    │   ├── app.css
    │   └── finance-data.js
    └── *.html                   179 pages
```

### 2.2 Data flow — one database, many views

Every page in `old_version/` loads `<script src="assets/db.js"></script>`, which resolves to `old_version/assets/db.js`. That file:

- declares **35 `localStorage` keys** (`og_students`, `og_hosts`, `og_drivers`, `og_staff`, `og_parents`, `og_concerns`, `og_incidents`, `og_welfare_logs`, `og_mh_cases`, `og_mh_comms`, `og_mh_removals`, `og_visit_reports`, `og_hs_checklists`, `og_training_logs`, `og_training_courses`, `og_training_completions`, `og_org_documents`, `og_student_held_funds`, `og_contracts`, `og_agents`, `og_agent_logs`, `og_schools`, `og_school_logs`, `og_parent_logs`, `og_exeats`, `og_placements`, `og_todos`, `og_transports`, `og_travel_todos`, `og_finance_events`, `og_revenue_events`, `og_pf_documents`, `og_alert_settings`, `og_custom_notifs`, `finance_docs`);
- seeds them idempotently on first load via a series of `init*DB()` calls;
- exposes ~140 functions, both as bare globals *and* as `window.OG_DB.*` — pages use both styles interchangeably;
- runs `migrateComplianceData()` at load to backfill missing `compliance` objects.

This is the right pattern and it is followed consistently. Almost every fix in this report is a change inside `db.js` plus a small render change on one or two pages.

### 2.3 The two engines that matter for AEGIS

**`generateComplianceAlerts()`** (`db.js:2528–2779`) is the platform's compliance conscience. It walks every staff member, host and driver through `checkPerson()` (ID document, overseas check, DBS presence/expiry, right to work, two references, safeguarding training, host self-declaration), every student through `checkStudent()` (passport/BRP, four consent types, medical cover, allergies, home address, UK contacts, risk assessment + expiry, annual review status, welfare check-in cadence), then runs role-based training requirements for active staff and approved hosts, and finally merges user-defined notifications from `og_custom_notifs`. It is the single most valuable piece of AEGIS machinery in the codebase.

**It is consumed by exactly one page: `notifications.html`.** Neither `admin-dashboard.html` nor `compliance.html` — the two pages whose entire purpose is to show compliance state — calls it.

**`aggregateDocuments()`** (`db.js:2271–2425`) is now complete and is a clear improvement since the June review. It reads student general/academic docs, host/driver/staff/parent document lists, finance docs, private-fostering documents (`og_pf_documents`), the organisation policy store, *and* walks each person's `compliance.*Path` fields via `emitComplianceDocs()` to emit DBS, ID, right-to-work, reference, overseas-check, safeguarding, gas-safety and self-declaration rows. All five `documents-*.html` pages and `documents.html` itself now read from it. **The June review's findings D1, D2 and D6 are resolved.**

### 2.4 Page relationships and clusters

| Cluster | Pages | State |
|---|---|---|
| Students | `students`, `student-profile`, `-edit`, `-health`, `-legal`, `-family`, `-pastoral`, `-risk`, `-funds`, `-portal` | Wired, ID-linked, strong |
| Hosts / Homestays | `hosts`, `host-profile`, `host-create/-edit`, 7 × `host-compliance-*`, `homestay-visit-report`, `homestay-hs-checklist`, `homestay-visit` | Wired, strongest cluster in the app |
| Homestay (legacy stubs) | `homestay-approve`, `-archive`, `-assessment(-create)`, `-accident(-create)`, `-visit-create`, `-edit`, `-delete` | **Static, dead** |
| Drivers | `drivers`, `driver-profile`, `-create/-edit/-list`, 5 × `driver-compliance-*` | Wired |
| Staff | `staff-list`, `staff-profile`, `-create/-edit`, 5 × `staff-compliance-*` | Wired |
| SCR | `scr-dashboard`, `scr-staff`, `scr-hosts`, `scr-drivers` | Wired (see gaps at 2.8) |
| Concerns | `concerns-dashboard`, `-low-level`, `-escalated`, `-resolved` | **Read-only**; all create/triage/close pages static |
| Policies | `policy-viewer` | Wired, full CRUD + version history |
| Documents | `documents`, `documents-{students,hosts,drivers,staff,finance}` | Wired via aggregator |
| Compliance overview | `compliance`, `compliance-edit`, `audit-log`, `reporting-dashboard` | **All static** |
| Dashboard | `admin-dashboard` | **Static** |

`homestay-profile.html` has been reduced to a 26-line redirect to `host-profile.html?id=…`, which resolves the June review's D3 trap. The root `index.html` redirect is now relative (`old_version/admin-dashboard.html`), resolving D7.

### 2.5 The duplicate `db.js` — architectural issue **A1**

There are two `db.js` files:

| | `old_version/assets/db.js` | `assets/db.js` (root) |
|---|---|---|
| Lines | 3,973 | 3,630 |
| Loaded by | All 116 data-driven pages in `old_version/` | **Nothing** |
| Last commit | `beec9ff` | `beec9ff` (same commit, edited in parallel) |

Both files are edited in the same commits, which is how the divergence has stayed invisible. The root copy is now missing entire feature blocks that the live application depends on:

| Feature | `old_version/assets/db.js` | root `assets/db.js` |
|---|:---:|:---:|
| `getEmergencyScenarioLeads()` — Standard 2.6.2 | ✅ | ❌ |
| `getEmergencyCoverArrangements()` — 2.6.3 | ✅ | ❌ |
| `getEmergencyIssuanceStats()` / `recordEmergencyNumberIssued()` — 2.6.1 | ✅ | ❌ |
| `getAppendix10Agencies()` — Appendix 10 / 3.3.2 | ✅ | ❌ |
| `checkStudentRiskAssessmentStatus()` — 3.3.4 | ✅ | ❌ |
| `saveAgentLog()` / `getAgentLogs()` | ✅ | ❌ |
| `dayStudentWelfare` schema — 8.5 | ✅ | ❌ |
| `generateVisitReportId()` | ❌ | ✅ (orphaned) |

**Recommendation.** `old_version/assets/db.js` is unambiguously canonical — every live page resolves to it and it is 343 lines ahead. **Delete `assets/db.js` from the repository root** (and `policy-viewer.html`, which is a byte-identical duplicate of `old_version/policy-viewer.html`). The root should retain only `index.html` and `assets/app.css`. If the intent is eventually to promote `old_version/` to the repository root, do it as a single explicit `git mv` rather than maintaining a mirror; the current arrangement guarantees that any fix applied to one copy will eventually be lost when someone edits the other.

The directory name `old_version/` is itself a hazard: it names the live application as though it were archived, which is how a mirror came to be treated as the real thing in the first place. Rename it to `app/` as part of the same change.

---

## 3 · Standard-by-standard compliance matrix

**Legend** — ✅ COMPLETE · ✅ COMPLETE — Data Unseeded · ⚠️ PARTIALLY COMPLETE · ❌ NOT MET

---

### Standard 1 — Statement of company aims, principles and practice — **5%** ❌

| Sub | Requirement | Platform evidence | Status | Gap |
|---|---|---|---|---|
| **1.1** | Must provide a statement of aims, principles and practice, publicly available. | None. `og_org_documents` could hold it but nothing is seeded and no category maps to it. | ❌ **NOT MET** — 10% | No record, no page, no public surface. Add a `Governance & aims` policy category and seed the statement as an org document with a public render route. |
| **1.2** | All publicity and information must be accurate, conveying realistic expectations of service and accommodation. | None. No brochure or publicity store. Root `index.html` marketing copy is not governed. | ❌ **NOT MET** — 0% | Appendix A requires "copies of any brochures". No store exists. |

---

### Standard 2 — Management of the Guardianship Organisation — **56%** ⚠️

#### 2.1 Staff, Volunteers and Homestays — **40%** ⚠️

| Sub | Requirement | Platform evidence | Status | Gap |
|---|---|---|---|---|
| **2.1.1** | Identify all those involved and their particular roles. | `og_staff` (`role`, `title`, `primaryWork`), `og_hosts`, `og_drivers`, `og_agents`. `users.html` aggregates staff + hosts + drivers + parents + students into one directory. | ✅ **COMPLETE** — 90% | No organogram artefact (Appendix A asks for a company organisation diagram). |
| **2.1.2** | Staff/homestays must be independent of any school attended by students in their care. | No field on `og_staff` or `og_hosts`. | ❌ **NOT MET** — 0% | Add `schoolIndependenceConfirmed` + declaration date to staff and host compliance objects; check at placement time against `student.schoolId`. |
| **2.1.3** | Clear job descriptions for staff, volunteers, coordinators and homestays, including safeguarding responsibilities. | None. Zero occurrences of "job description" anywhere in the tree. | ❌ **NOT MET** — 0% | Appendix A requires these for submission. Add `jobDescriptionDocPath` to the compliance object and surface on `staff-profile.html` / `host-profile.html`. |
| **2.1.4** | Suitable induction procedure for all new staff, volunteers and homestays, covering safeguarding training. | `induction-checklist.html` (130 lines) and `induction-create.html` are **both static** — no `db.js`, no data calls. No `inductionDate` / `inductionCompletedBy` field exists. The SCR pages have an "Induction" column but it renders `compliance.safeguardingTrainingDate`, not induction. | ❌ **NOT MET** — 10% | `scr-hosts.html:218` mislabels safeguarding training as induction, which will read as a completed check to an inspector. Add a real induction record and wire both induction pages to it. |
| **2.1.5** | Safer recruitment checks — DBS, ID, right to work, references, interview notes — for all appointments. | `compliance` object on staff/host/driver carries `idDocumentPath`, `rightToWorkCheckPath`, `dbsNumber`/`dbsCertificatePath`, `reference1Path`, `reference2Path`, `overseasCheckDocPath`. 17 `*-compliance-*.html` sub-pages write them via `saveStaffMember`/`saveHost`/`saveDriver`. All alerted in `generateComplianceAlerts()`. | ⚠️ **PARTIALLY COMPLETE** — 75% | **Interview notes are not captured anywhere** (also 2.8.3). Barred-list check has no field (2.8.6). |
| **2.1.6** | Code of conduct for staff, coordinators, volunteers and homestays; shared and understood by all. | None. No store, no acknowledgement tracking. | ❌ **NOT MET** — 0% | Appendix 6 lists 21 required content areas. Appendix A requires a Staff Code of Conduct for submission. Needs a policy document plus per-person acknowledgement records. |
| **2.1.7** | Scotland — due regard to Scottish Care Inspectorate; PVG checks. | No PVG field; `compliance` models DBS only. | ❌ **NOT MET** — 0% | May be out of scope if the organisation does not operate in Scotland, but the platform cannot currently record that determination either. |
| **2.1.8** | Educational guardians and homestays must live in the UK full-time and be British or hold settled status. | `compliance.isCitizen` (boolean) and `rightToWorkCheckPath` / `rightToWorkExpiry`. Host seed uses `isCitizen: false` for Helen Finch with no settled-status evidence. | ⚠️ **PARTIALLY COMPLETE** — 55% | No `settledStatusEvidencePath`, no `settledStatusVerifiedDate`, no "resident in UK full-time" attestation. 5.1.1 requires evidence to be *viewed and recorded*; a boolean is not evidence. |
| **2.1.9** | Demonstrate access to a sufficient number of staff acting as educational guardians/coordinators. | None. Contrast `getHomestaySupplyAnalytics()`, which does exactly this for hosts. | ❌ **NOT MET** — 0% | Mirror the host supply analytics for staff: caseload per coordinator vs active student count. |

#### 2.2 Contracts — **90%** ✅

| Sub | Requirement | Platform evidence | Status | Gap |
|---|---|---|---|---|
| **2.2.1** | Contract of employment for all paid staff. | `og_contracts` with `entityType: 'Staff'`; `getContractsByEntity()`; rendered and editable on `staff-profile.html`. `og_contracts` seeds empty but infrastructure is ready. | ✅ **COMPLETE — Data Unseeded** — 95% | — |
| **2.2.2** | Clear contract for all parents; reasonable notice on termination. | `entityType: 'Parent'`; `parent-profile.html` renders and saves. `og_contracts` seeds empty but infrastructure is ready. | ✅ **COMPLETE — Data Unseeded** — 95% | No `noticePeriodDays` / termination-notice field. |
| **2.2.3** | Clear contract for each homestay. | `entityType: 'Homestay'`; `host-profile.html` renders and saves. `saveContract()` at `db.js:3294` **blocks activation** if the host's DBS is missing/expired or the gas safety certificate is missing/expired, forcing status back to `Draft`. `og_contracts` seeds empty but infrastructure is ready. | ✅ **COMPLETE — Data Unseeded** — 95% | The block only logs to `console.warn` — the user sees no explanation for why their contract reverted to Draft. Surface it in the UI. Data is unseeded. |

| **2.2.4** | Clear contract for any educational agents, UK or overseas. | `entityType: 'Agent'`; `agent-profile.html` renders and saves; `og_agents` carries `agreementStatus`. `og_contracts` seeds empty but infrastructure is ready. | ✅ **COMPLETE — Data Unseeded** — 95% | — |

**Note.** `og_contracts` seeds empty (`OG_CONTRACTS_SEED_VERSION = 'v2-empty'`), so the cluster demonstrates nothing until a contract is manually created. `contracts.html` correctly resolves entity names via `getStaffById` / `getHostById` / `getParentById` / `getAgentById`.

#### 2.3 Handbooks — **5%** ❌

| Sub | Requirement | Platform evidence | Status | Gap |
|---|---|---|---|---|
| **2.3.1** | Student handbook, age-appropriate (Appendix 1 — 20 minimum content items). | None. | ❌ **NOT MET** — 5% | Appendix A requires it for submission. No handbook entity exists. |
| **2.3.2** | Parent/agent handbook (Appendix 2 — 14 items). | None. `admin-dashboard.html` displays a static line "Parent Handbook v1.2 / Approved / Shared with 24 active families" — this is hardcoded HTML with nothing behind it. | ❌ **NOT MET** — 5% | The static claim is worse than absence: it asserts a controlled document that does not exist. |
| **2.3.3** | Homestay handbook (Appendix 3 — 27 items). | None. | ❌ **NOT MET** — 5% | — |

**Recommendation.** Handbooks are versioned, review-dated, audience-scoped documents — structurally identical to policies. Add a `Handbooks` category to `og_org_documents` and a per-audience issue/acknowledgement log rather than building a new store.

#### 2.4 Insurance — **15%** ❌

| Sub | Requirement | Platform evidence | Status | Gap |
|---|---|---|---|---|
| **2.4.1** | Up-to-date professional indemnity, public liability and (where applicable) employer's liability insurance sufficient for scope. | No organisation-level record of any kind. `db.js` has no organisation entity. | ❌ **NOT MET** — 0% | Appendix A requires insurance documents. Needs an organisation profile store (see cross-cutting issue X3). |
| **2.4.2** | Process for checking homestays are aware of the need to verify their home insurance covers hosting. | No field on `og_hosts`. Not in the visit report or H&S checklist item sets. | ❌ **NOT MET** — 10% | Add `homeInsuranceAwarenessConfirmed` + date to the host record and an item to the annual visit report. |
| **2.4.3** | Where the homestay transports students by car, make them aware of comprehensive vehicle insurance and the need to declare the use to insurers. | Drivers carry `insuranceExpiry` and `motExpiry`; **hosts who drive carry nothing**. The visit report has no transport-insurance item. | ⚠️ **PARTIALLY COMPLETE** — 30% | Hosts routinely drive students (host records reference school collections and drop-offs, and `punctualityDetail` is measured on them). Add `hostDrivesStudents`, `vehicleInsuranceDeclaredDate`, `motExpiry` to the host record. |

#### 2.5 Record Keeping — **35%** ⚠️

| Sub | Requirement | Platform evidence | Status | Gap |
|---|---|---|---|---|
| **2.5.1** | Secure and efficient method for holding records. | *Efficient:* yes — 35 structured stores, consistent ID conventions (`STU…`, `HST…`, `DRV…`, `STF…`, `PAR…`, `AGT…`, `SCH…`, `CON…`, `INC…`), a single access layer. *Secure:* no — plaintext `localStorage`, no encryption, no authentication, no access control, no audit trail. `audit-log.html` (209 lines) is static with no data calls. | ⚠️ **PARTIALLY COMPLETE** — 35% | See blockers **B1** and **B2**. The efficiency half of this standard is met well; the security half is not met at all, and there is no evidence surface (audit log) to demonstrate either. |

#### 2.6 Emergency Procedures — **80%** ✅

| Sub | Requirement | Platform evidence | Status | Gap |
|---|---|---|---|---|
| **2.6.1** | 24-hour emergency contact number provided to all students, parents, staff, volunteers, homestays and partner schools, connecting to a suitable member of staff with record access. | `POL-EMG-001` seeded policy documents a 3-tier 24/7 rota (Zuko Fire 08:00–18:00, Priya Shah 18:00–22:00, Jay Ray overnight/weekends) on `+44 7700 900 999`. `recordEmergencyNumberIssued(partyType, partyId)` stamps `emergencyNumberIssued` + date on students and hosts. `emergency-procedures.html` renders issuance coverage. `parent-portal.html` calls it. | ⚠️ **PARTIALLY COMPLETE** — 70% | **`getEmergencyIssuanceStats()` (`db.js:3809`) is broken.** The filter is `s.emergencyNumberIssued \|\| s.id` — since every record has an `id`, it is always truthy, so coverage always reports 100%. `schoolsCount`/`schoolsIssued` are hardcoded to 5/5. The page therefore certifies full 2.6.1 compliance regardless of the actual data. Staff, volunteers and drivers are not tracked at all. |
| **2.6.2** | Emergency plan covering reasonably foreseeable emergencies, showing who is responsible and what action is taken. | `getEmergencyScenarioLeads()` returns 7 structured scenarios (medical, missing student, safeguarding disclosure, death/critical injury, travel disruption, homestay evacuation, pandemic), each with named lead, role, phone, backup, immediate action, escalation timeline and documentation requirement. Rendered by `emergency-protocols.html`. Backed by the `POL-EMG-001` policy document. | ✅ **COMPLETE** — 95% | Scenario leads are hardcoded in `db.js` rather than resolved from `og_staff` — if Priya Shah leaves, the emergency plan silently names a departed employee. |
| **2.6.3** | Lone-working guardians must have suitable, vetted emergency cover. | `getEmergencyCoverArrangements()` returns a named reciprocal SLA with Cotswolds & Thames Guardianship Services, DSL Level 3 cover officer, enhanced DBS certificate number, direct phone, effective/renewal dates, and a lone-worker check-in protocol (60-minute GPS/WhatsApp, 15-minute escalation). | ✅ **COMPLETE** — 90% | Hardcoded rather than editable; renewal date (2027-01-01) raises no alert. |

#### 2.7 Information Sharing and Data Protection — **30%** ❌

| Sub | Requirement | Platform evidence | Status | Gap |
|---|---|---|---|---|
| **2.7.1** | Share information appropriately with parents, students, agents, homestays, schools, children's services and other bodies. | `og_school_logs` (`school-log-create.html`, `school-welfare-notification.html`), `og_parent_logs` (`parent-log-create.html`), `og_agent_logs`, `privateFostering.informationSharing.{parent,school,host}` with consent/date/method/reference, `getShareableHostProfile()` with contact redaction. | ⚠️ **PARTIALLY COMPLETE** — 65% | No record of sharing with local children's services outside the private-fostering flow; no lawful-basis field on any share. |
| **2.7.2** | Registered with the ICO; must appoint a data controller. | **Zero occurrences of "data controller" in the codebase.** No ICO registration number field. | ❌ **NOT MET** — 0% | Appendix A requires the ICO certificate. Both the registration and the named controller need an organisation profile record. |
| **2.7.3** | Suitable data protection policy and privacy notice, publicly available and on the website. | `og_org_documents` has a `Data protection & privacy` category with a working `policy-viewer.html?cat=…` route — but **no document is seeded into it**. Root `index.html:569` links "Privacy Policy" to `href="#"`. Missing policy content is Data Unseeded. | ⚠️ **PARTIALLY COMPLETE** — 45% | Root `index.html:569` links to `href="#"`. Missing policy content is DATA UNSEEDED. Infrastructure is complete. |

| **2.7.4** | All records kept securely, accessible only to those who need to see the information; staff and homestays made aware. | No authentication, no roles enforced in code, no encryption. `og_staff` carries a `role` string and `staff-profile.html` describes intended access boundaries in prose ("Should not hold broad access to policy control or DSL-only safeguarding records") but nothing enforces it. `admin-dashboard.html` exposes a `localStorage.clear()` button to any user. | ❌ **NOT MET** — 10% | Blocker **B1**. Also 6.2.6 (DSL-only safeguarding case notes) depends on this. |
| **2.7.5** | Necessary consent and safeguards before using student photographs in publicity or on the website. | `student.legal.permissions.photo` = `{ granted, grantedBy, grantedDate, evidenceMethod }`; read via `isPermissionGranted()`; alerted in `checkStudent()`; edited on `student-legal.html`. | ✅ **COMPLETE** — 90% | Nothing links a stored image back to the consent record, but the consent itself is properly modelled with provenance. |
| **2.7.6** | Secure permission from individuals before supplying contact details to AEGIS for Gold Standard accreditation. | None. | ❌ **NOT MET** — 0% | Add an AEGIS-disclosure consent flag to host and school records. |

#### 2.8 Safer Recruitment — **50%** ⚠️

| Sub | Requirement | Platform evidence | Status | Gap |
|---|---|---|---|---|
| **2.8.1** | Have and implement a safer recruitment policy per KCSIE. | Policy store exists; no safer recruitment policy seeded. The safer recruitment checks are implemented in code. Policy content is Data Unseeded. | ⚠️ **PARTIALLY COMPLETE** — 35% | No required-policy manifest to flag absence. Safer recruitment policy document content is DATA UNSEEDED. |

| **2.8.2** | At least one interview panel member trained in safer recruitment. | `TRN-CRS-002 "Safer Recruitment in Education"` (code `AEGIS-2.8.2`), 36-month renewal, targeted at `Admin / DSL` and `Admin / Operations`, mandatory. Status computed by `getTrainingStatusForPerson()`, alerted via `checkTrainingRequirements()`. | ✅ **COMPLETE** — 85% | Nothing links a *specific* interview to a trained panel member (depends on 2.8.3). |
| **2.8.3** | Detailed notes kept of all staff and homestay interviews. | **Nothing.** Zero occurrences of "interview note". | ❌ **NOT MET** — 0% | Appendix A requires a record of safer recruitment checks. Add an `og_interviews` store keyed to `personId` with date, panel members, notes and outcome. |
| **2.8.4** | Two written references; one referee known ≥2 years; one from current/most recent employer (staff) or a professional person (homestay); referees not related; no open references; verification and call logs retained. | `compliance.reference1Path` / `reference2Path`, `host-compliance-references.html` / `staff-` / `driver-` sub-pages, warning alerts for each missing reference, rendered in all three SCR tables. `reference.html` is **static**. | ⚠️ **PARTIALLY COMPLETE** — 45% | Only a file path is stored. None of the qualifying conditions are modelled: no referee name, relationship, known-since date, employer flag, "not related" attestation, verification-call log, or discrepancy-resolution note. An inspector checking 2.8.4 would find two uploaded files and no evidence any of the rules were applied. |
| **2.8.5** | DBS certificate issued relevant to role prior to employment/hosting; record the date checked, certificate number and date of issue; copies retained ≤6 months and only with valid reason. | Two parallel representations: top-level `dbsStatus`, `dbsCertNumber`, `dbsIssueDate`, `dbsRenewalDue`, `dbsUpdateService` (rich, seeded, human-readable) **and** `compliance.dbsNumber`, `dbsLastChecked`, `dbsCertificatePath`, `dbsUpdateService`, `dbsExpiry` (empty in seed data, written by the compliance sub-pages). Alerts and SCR read the `compliance.*` set; `host-profile.html` and `drivers.html` display the top-level set. Empty seed compliance fields are Data Unseeded. | ⚠️ **PARTIALLY COMPLETE** — 65% | **The duplication is a live divergence risk and already visible in the seed data:** Eleanor Ashworth shows `dbsStatus: 'clear'` with certificate `001-338-7742-6` at top level, while `compliance.dbsCertificatePath` and `dbsNumber` are empty. Also: no retention-period tracking for the 6-month copy rule. Empty seed compliance fields are Data Unseeded. |

| **2.8.6** | Children's barred list check in addition to enhanced DBS for regulated activity; written permission before any DBS check; formal record of checks maintained. | The SCR tables have a "Barred list" column, but `scr-hosts.html:162` derives it from `person.dbsStatus === 'clear'` — a proxy, not a check. No `barredListCheckDate`, no `dbsWrittenPermissionDate`, no `regulatedActivity` flag. | ❌ **NOT MET** — 20% | Blocker adjacent to **B6**. Appendix A explicitly requires "Children's Barred List checks where appropriate". The SCR currently reports a check that was never performed. |
| **2.8.7** | Where a DBS lists a previous conviction, complete a written risk assessment on suitability. | No field, no workflow. `dbsStatus` accepts `'clear'` in the seed but nothing handles any other value. | ❌ **NOT MET** — 0% | Add `dbsDisclosureRiskAssessmentPath` + outcome + decision-maker, gated on `dbsStatus !== 'clear'`. |
| **2.8.8** | Overseas police check where the person has lived/worked abroad >3 months in the last 5 years; additional checks if unobtainable. | `compliance.livedAbroad` + `overseasCheckDocPath`; dedicated `*-compliance-overseas.html` pages for all three person types; warning alert when `livedAbroad && !overseasCheckDocPath`; SCR renders N/A when not applicable. | ✅ **COMPLETE** — 90% | No country field or fallback (extra reference + risk assessment) where a country cannot supply a check. |
| **2.8.9** | Collect identity information — passport, or birth certificate if no passport; retain a copy with permission. | `compliance.idDocumentPath`; `*-compliance-identity.html` pages; **critical** alert when absent; SCR "ID check" column. | ✅ **COMPLETE** — 85% | No document-type field (passport vs birth certificate) and no retention-permission flag. |
| **2.8.10** | Ensure right to work in the UK and **record the date the check took place**. | `compliance.rightToWorkCheckPath`, `rightToWorkExpiry`, `isCitizen`; critical alert for non-citizens with no document; expiry warnings. | ⚠️ **PARTIALLY COMPLETE** — 60% | **There is no `rightToWorkCheckedDate`.** The standard's explicit requirement is the date of the check, and the schema stores only an expiry. `dbsLastChecked` exists for DBS; the equivalent is missing here. |
| **2.8.11** | Online search as part of due diligence on shortlisted candidates. | None. | ❌ **NOT MET** — 0% | Add `onlineSearchDate` + `onlineSearchNotes` to the compliance object. |

#### 2.9 Finance — **85%** ✅

| Sub | Requirement | Platform evidence | Status | Gap |
|---|---|---|---|---|
| **2.9.1** | Payments due to staff, volunteers or homestays transacted promptly and appropriately recorded. | `og_finance_events` / `og_revenue_events` via `saveFinanceExpense()` / `saveFinanceIncome()`; `finances-tracker.html` (1,545 lines) and `revenue.html` resolve payees against `getAllStudents/Hosts/Drivers`; driver records carry `ratePerMile`, `waitingRate`, `invoicingCycle`, `billingContact`. Finance events may seed empty but `finances-tracker.html` is fully wired. Data Unseeded aspects. | ⚠️ **PARTIALLY COMPLETE** — 85% | No payment-due-date vs paid-date pair, so "promptly" is not measurable. `finance_docs` seed still references people by name string, not ID. |

| **2.9.2** | Keep a record of any student finances held (e.g. pocket money). | `og_student_held_funds` — a proper ledger. `saveStudentHeldFundTransaction()` (`db.js:1950`) recomputes a **chronological running balance across the student's full ledger** on every write, not just the edited row. `getStudentFundSummary()` returns deposited/released/balance/count/last-transaction. Records carry `approvedBy`, `receiptHeld`, `receiptDocPath`, `recordLocation`. Surfaced on `student-funds.html`, `finances.html` and `student-profile.html`. | ✅ **COMPLETE** — 95% | The strongest single implementation in the codebase. No alert for stale balances or missing receipts. |

#### 2.10 Policies — **65%** ⚠️

| Sub | Requirement | Platform evidence | Status | Gap |
|---|---|---|---|---|
| **2.10.1** | Review all policies and handbooks at least annually; include publication and review dates. | `og_org_documents` with `version`, `owner`, `audience`, `effectiveDate`, `reviewDate`, `status`, `content`, and a `reviewHistory[]` array. `policy-viewer.html` (1,134 lines) provides create/edit/archive/restore, category filtering, a full chronological history view via `getAllPolicyHistory()`, and `getReviewStatusBadge()` for overdue rendering. Submitting a review bumps the version, snapshots the previous content and extends the window 12 months. Only 2 policies seeded = Data Unseeded. | ⚠️ **PARTIALLY COMPLETE** — 72% | Three gaps: **(a)** there is no *required-policy checklist*; **(b)** **`generateComplianceAlerts()` never reads `og_org_documents`**, so an overdue statutory policy review produces no alert. Handbooks (2.3) are not covered by the store at all. The 2 policies seeded is DATA UNSEEDED. |


#### 2.11 Significant Changes — **0%** ❌

| Sub | Requirement | Platform evidence | Status | Gap |
|---|---|---|---|---|
| **2.11.1** | Report to AEGIS within 14 days any significant change in operation — management/ownership, student numbers, accommodation type. | **Nothing.** Zero occurrences of "significant change" in the codebase. | ❌ **NOT MET** — 0% | Needs an `og_aegis_notifications` store with change type, detection date, reported date and a 14-day countdown alert. Student-number changes are already derivable from `og_students`. |

---

### Standard 3 — Students — **69%** ⚠️

#### 3.1 Student Induction — **15%** ❌

| Sub | Requirement | Platform evidence | Status | Gap |
|---|---|---|---|---|
| **3.1.1** | Sufficient pre-arrival information for students, parents and agents, including a virtual meeting with the appointed guardian before arrival. | No pre-arrival pack record, no virtual-meeting field. `student.arrivalDate` and `travelDetails` exist but no preparation workflow. | ❌ **NOT MET** — 10% | Add a pre-arrival checklist to the student record with a `preArrivalMeetingDate` + `metWith`. |
| **3.1.2** | Introductory meeting after arrival with all students including emergency packages; record of meetings kept. | `og_welfare_logs` could hold it, and `welfare-note-create.html` has note types, but there is no `introductory-meeting` type and no arrival-triggered requirement. | ⚠️ **PARTIALLY COMPLETE** — 25% | Add an `introduction` welfare log type and alert when `arrivalDate` has passed with no such log. |
| **3.1.3** | Suitable induction programme including walking through the student handbook. | `induction-checklist.html` and `induction-create.html` are **both static**. No student handbook exists (2.3.1). | ❌ **NOT MET** — 10% | Depends on 2.3.1 and 2.1.4. |

#### 3.2 Student Wellbeing — **88%** ✅

| Sub | Requirement | Platform evidence | Status | Gap |
|---|---|---|---|---|
| **3.2.1** | Check in with all students regularly, including emergency packages, especially during and after homestay stays. | `og_welfare_logs` + `getStudentWelfareCadenceStatus()` (`db.js:2866`) buckets last contact into green (today) / amber (≤6 days) / red (overdue). `checkStudent()` raises a warning at 14 days with a deep link to `welfare-note-create.html?id=…`. Contact methods captured (phone, text, remote, face-to-face). Entry points: `welfare-note-create.html`, `student-checkin-submit.html` (student self-service), `parent-portal.html`. | ✅ **COMPLETE** — 90% | The cadence badge uses a 7-day threshold while the alert uses 14 days — two different definitions of "overdue" in the same file. No specific post-homestay-stay check requirement. |
| **3.2.2** | Record of such communication kept on the student file; concerns followed up appropriately. | `getWelfareLogsForStudent()` renders on `student-profile.html` and `welfare-notes.html`. `welfare-note-create.html` can escalate directly into `saveConcern()`. `student-concern-submit.html` writes both a welfare log and a concern. | ✅ **COMPLETE** — 90% | — |
| **3.2.3** | *(Should)* Consider how to build trusted relationships facilitating communication. | `student-portal.html` and `student-checkin-submit.html` give students a direct, low-friction channel; `student-concern-submit.html` lets a student raise a concern themselves. | ✅ **COMPLETE** — 85% | — |

#### 3.3 Mental Health — **88%** ✅

| Sub | Requirement | Platform evidence | Status | Gap |
|---|---|---|---|---|
| **3.3.1** | Clear procedure to support a student presenting mental health issues, including removal from school. | `POL-WCE-002` seeded policy (identification → DSL escalation → Appendix 11 removal → annual review). `og_mh_cases` (lead staff, status, support options, notes) via `getMHCaseForStudent()` / `saveMHCase()`; `og_mh_comms` via `mental-health-comms.html`. | ✅ **COMPLETE** — 90% | — |
| **3.3.2** | Mental health concerns that are also safeguarding concerns escalated immediately to the DSL; access to Appendix 10 external agencies. | `mental-health-referral.html` is the best-integrated page in the app: it pulls `getStudentById`, `getAllStaff`, `getWelfareLogsForStudent`, `getAllConcerns`, `getMHCaseForStudent`, and `getAppendix10Agencies()` — 8 agencies (CAMHS, Papyrus HOPELINE247, Shout, Childline, YoungMinds, BEAT, The Mix, 999) each with category, phone, website, hours, description and **referral criteria** — then writes back via `saveConcern`, `saveMHCase` and `saveWelfareLog`. | ✅ **COMPLETE** — 90% | Agency list is hardcoded in `db.js` rather than editable. |
| **3.3.3** | Student removal form completed by school staff before removing a student from the school setting (Appendix 11). | `mental-health-removal.html` → `saveMHRemoval()` → `og_mh_removals`, and also writes a welfare log. `og_mh_removals` relies on `||[]` fallback but `saveMHRemoval()` exists. | ✅ **COMPLETE — Data Unseeded** — 88% | Nothing gates an actual removal on the form being complete; no school countersignature field. |

| **3.3.4** | Fully risk-assess the implications of providing guardianship to any student before agreeing to act. | `student.riskAssessmentFile` + `riskAssessmentExpiryDate`; `checkStudentRiskAssessmentStatus()` (`db.js:595`); `student-risk.html` reads/writes via `getStudentById` / `upsertStudent`; **critical** alert when absent, critical when expired, warning within the threshold window. Fields absent from seed data but the code handles their absence gracefully (alerts when missing). | ✅ **COMPLETE — Data Unseeded** — 92% | The assessment is a file path — no structured needs/capability determination. Nothing blocks a student reaching `Active` status without one. |


#### 3.4 Student Information — **66%** ⚠️

| Sub | Requirement | Platform evidence | Status | Gap |
|---|---|---|---|---|
| **3.4.1** | Hold the Appendix 13 minimum information for each student; review regularly and at least annually. | Near-complete Appendix 13 coverage: full name + `preferredName` + `dob`; `family.homeAddress`; parent details (`parent1/2Name/Email/Phone`, `family.parentAddresses`, `parentOccupations`); `family.ukFamilyContactsStructured[]` (relationship, name, address, phone, email, occupation, **`authorisedCollect`**, **`authorisedOvernight`**, notes); `legal.agentId` + `agentDetails`; `family.familyBackgroundInfo`; `legal.permissions`; `health.{medicalConditions, allergies, dietaryRequirements, immunisationDetails, privateMedicalCover, learningDifficulties}`; `pastoral.interestsAndHobbies`; school + `schoolId` + `schoolYear` + `tutorOrHouse` + `tutorEmail` + `tutorPhone`; `pastoral.visitRecords[]`. Annual review tracked via `lastReviewedDate`, `lastReviewedBy`, `reviewDueDate`, `reviewStatus` with **critical/warning alerts** citing Standard 3.4.1 by name. Edited across `student-health.html`, `-family.html`, `-legal.html`, `-pastoral.html`. Student health/family/legal fields empty strings `''` in seed but complete schema across pages. | ✅ **COMPLETE — Data Unseeded** — 92% | `reviewStatus` is a stored string rather than derived from `reviewDueDate`, so it can drift out of sync with the date it describes. |

| **3.4.2** | Relevant parental permission obtained to hold and pass on this information, in line with ICO principles. | `legal.permissions.{travel, medical, photo, data}`, each `{ granted, grantedBy, grantedDate, evidenceMethod }`; `isPermissionGranted()` handles both legacy boolean and structured formats; all four alerted at a configurable level. | ⚠️ **PARTIALLY COMPLETE** — 65% | **`parent-consent-update.html` is static** — the page named for updating consent has no data calls. Consent can only be edited through `student-legal.html` by staff. No consent-withdrawal or expiry handling. |
| **3.4.3** | All confidential data securely stored; confidentiality maintained when sharing with other parties. | Plaintext `localStorage`; no access control. Sharing surfaces (`getShareableHostProfile` redaction, school/parent logs) are thoughtful but sit on an unsecured store. | ❌ **NOT MET** — 15% | Blocker **B1**. |
| **3.4.4** | Where regular medication is required, ensure the homestay is fully aware; keep a formal medicine administration record; ensure the homestay is trained and comfortable for specialist conditions before placement. | `student.medicineAdministrationLog[]` — date, time, medication, dosage, reason, `administeredBy`, `witnessedBy`, `studentConsent`, notes, `loggedAt` — written by `addMedicineAdministrationRecord()`. `student.medicalPlacementGate` — `hasSpecialistCondition`, `conditionType`, `homestayBriefedDate`, `homestayBriefedBy`, `homestayConfirmedCompetent`, `competencyNotes`, `epiPenTraining`, `insulinTraining`. Visit report item: *"Medical, allergy, medication and emergency information-sharing expectations are understood."* | ✅ **COMPLETE** — 90% | The gate is recorded but not *enforced* — nothing prevents placing a student with `hasSpecialistCondition: true` and `homestayConfirmedCompetent: false`. No alert on that combination. |

---

### Standard 4 — Travel Arrangements — **51%** ⚠️

| Sub | Requirement | Platform evidence | Status | Gap |
|---|---|---|---|---|
| **4.1** | Where the GO organises travel, keep a full record including date, times and mode of transport, and share it with student, parent, agent, school and homestay as appropriate. | `og_transports` via `saveTransport()`; `travel-create.html` captures journey date, time, service type (mode), start point, destination, driver, student, passengers, luggage, miles, cost. `saveTransport()` auto-creates five `og_travel_todos`: *Confirmation with parent, Confirmation with driver, Arrival confirmation, Departure confirmation, Return trip?* — worked in `travel-todo.html`. `travel.html` also calls `saveSchoolLog()`, giving a school-share trail. `og_transports` and `og_travel_todos` initialize empty but capture works. | ⚠️ **PARTIALLY COMPLETE** — 75% | The todo list covers parent and driver confirmation but **not homestay or agent**. No record of the itinerary document actually being sent. `travel-edit.html`, `travel-delete.html` and `travel-validation.html` are static. |

| **4.2** | Suitable permissions in place for any travel undertaken. | `student.legal.permissions.travel` (structured, with `grantedBy` / `grantedDate` / `evidenceMethod`), alerted when absent; `travel-create.html` captures a `permission-screenshot` upload and a `parent-confirmation` field. | ✅ **COMPLETE** — 75% | No hard block: a transport can be saved for a student whose travel consent is not granted. Appendix 9 permission-to-travel letter is not modelled (advisory only). |
| **4.3** | Where a local licensed taxi firm is used, obtain **written confirmation from the company** that suitable checks including enhanced DBS/PVG have been conducted on the drivers. | Drivers in `og_drivers` are vetted individually and thoroughly. There is **no third-party transport-firm entity** — no company record, no written-confirmation document, no expiry. | ❌ **NOT MET** — 15% | Appendix A explicitly requires "evidence to show the required checks have been undertaken where independent taxi or transport firms are used". Add an `og_transport_firms` store with a confirmation document, date and review cycle, and a `firmId` on the transport record. |
| **4.4** | Adhere to child seat / booster seat law for under-12s and students under 135 cm. | `driver.childSeat` free-text (e.g. *"Yes — standard Group 2/3 seat carried on request"*). No student height field; `dob` exists so age is derivable but nothing derives it. | ⚠️ **PARTIALLY COMPLETE** — 35% | Add `student.heightCm` and a booking-time check: if the student is under 12 or under 135 cm, require a matching seat on the assigned driver and warn if absent. Currently the two facts never meet. |

---

### Standard 5 — Homestays — **69%** ⚠️

#### 5.1 Homestay Checks — **45%** ⚠️

| Sub | Requirement | Platform evidence | Status | Gap |
|---|---|---|---|---|
| **5.1.1** | Primary carer must be a British citizen or hold settled status; **evidence viewed and recorded**. | `compliance.isCitizen` boolean; `rightToWorkCheckPath` for non-citizens; `host-compliance-identity.html`. | ⚠️ **PARTIALLY COMPLETE** — 40% | A boolean is not "evidence viewed and recorded". No `settledStatusEvidencePath`, no verification date, no verifier name. Same gap as 2.1.8. |
| **5.1.2** | Primary carer completes a self-declaration on behalf of the household (Appendix 5); best practice is annual repeat or change-notification. | `compliance.selfDeclarationDocPath`; dedicated `host-compliance-declaration.html`; **critical** alert `"No Homestay Self-Declaration (Appendix 5) on file"`; emitted into the document library by `emitComplianceDocs()`. | ⚠️ **PARTIALLY COMPLETE** — 55% | Stores a file path only. The 11 Appendix 5 questions are not captured as structured responses, so a "yes" answer triggers nothing. No `selfDeclarationDate` and therefore **no annual re-declaration cycle or expiry alert**. The SCR "Self-dec" column is hardcoded to `—` (`scr-hosts.html:217`) even though the field exists — a real check rendered as no data. |
| **5.1.3** | Enhanced DBS for **all persons aged 16 or over resident at the homestay address**, including those temporarily working/studying away and regular overnight visitors. | `householdMembers[]` carries `name`, `dob`, `age`, `gender`, `occupation`, `interests`, `religion` — **and no DBS field of any kind**. The only trace is a free-text `secondaryAdultDbs` string on the host record (`"Richard Ashworth — Enhanced DBS clear / issued 03 Aug 2023"`). `regularVisitors[]` carries a `dbsStatus` string (`"Supervised Daytime Visitor"`, `"Enhanced DBS clear"`) and `staysOvernight`. | ❌ **NOT MET** — 30% | **Blocker B6.** The Ashworth household has two adults and two children; only the primary carer is tracked in `compliance`. `generateComplianceAlerts()` cannot see the second adult at all. In a household with three adults over 16, two would be entirely invisible to the compliance engine. `householdMembers[]` needs its own `compliance` sub-object (DBS number, issue date, expiry, certificate seen date) and `checkPerson()` needs to iterate members aged ≥16. |

#### 5.2 Homestay Information — **90%** ✅

| Sub | Requirement | Platform evidence | Status | Gap |
|---|---|---|---|---|
| **5.2.1** | Full details on all homestay members (name, DOB, gender, occupation, interests, religion, smoker status, dietary patterns, pets). | `householdMembers[]` with `name`, `dob`, `age`, `gender`, `occupation`, `interests`, `religion`; host-level `smokerStatus`, `dietaryProvision`, `pets` (with allergy cross-reference in the seed). Rendered on `host-profile.html` and in `getShareableHostProfile()`. | ✅ **COMPLETE** — 90% | Smoker status and dietary pattern are household-level; the standard asks per member. |
| **5.2.2** | Gather information about other regular visitors, recording whether they stay overnight. | `regularVisitors[]` — `name`, `relationship`, `frequency`, **`staysOvernight`**, `dbsStatus` — plus a free-text `overnightVisitors` policy field. | ✅ **COMPLETE** — 90% | A visitor with `staysOvernight: true` (Charlotte Finch) should trigger the 5.1.3 DBS requirement; nothing connects them. |

#### 5.3 Homestay Profile — **90%** ✅

| Sub | Requirement | Platform evidence | Status | Gap |
|---|---|---|---|---|
| **5.3.1** | Short profile on the homestay, shareable with students, parents and agents; photographs useful; contact-detail disclosure at the GO's discretion. | `getShareableHostProfile(hostId, { redactContact })` (`db.js:1114`) — explicitly annotated *"AEGIS 5.3.1"* — returns family name, host names, `profilePhoto` (embedded base64 SVG in the seed), status, hosting-since, capacity, area, household member summaries, smoking policy text, pets, dietary provision, bedrooms, vetted-visitor summary and a safeguarding summary. **Contact redaction substitutes the Oxford Guardians 24/7 office number and welfare email.** Rendered by `homestay-profile-view.html`. | ✅ **COMPLETE** — 90% | `area` is hardcoded to `'Summertown, Oxford, Oxfordshire'` for every host regardless of address, and `safeguardingSummary` returns a fixed *"Fully AEGIS compliant"* string that is not derived from the host's actual compliance state — it would assert full compliance for a host with an expired DBS. |

#### 5.4 Availability of Homestays — **90%** ✅

| Sub | Requirement | Platform evidence | Status | Gap |
|---|---|---|---|---|
| **5.4.1** | Demonstrate access to a sufficient number of homestays for students in care, including emergency provision per 2.6. | `getHomestaySupplyAnalytics()` (`db.js:1160`, annotated *"AEGIS 5.4.1 / 2.6"*) computes approved hosts, total/occupied/available beds, emergency-ready hosts, emergency standby beds, caseload, supply ratio and a pass/fail badge requiring `availableStandardBeds > 0 && emergencyStandbyBeds >= 2`. Host records carry `emergencyProvision`, `emergencyNoticeHours`, `emergencyCapacity`, `emergencyNotes` and a 7-period `availabilityCalendar[]`. Surfaced on `hosts.html` and `homestays.html`. | ✅ **COMPLETE** — 90% | The insufficiency badge is display-only — it raises no compliance alert. |

#### 5.5 Student Accommodation — **70%** ⚠️

The 12 accommodation criteria and the placement-limit rules are captured as structured yes/no/na items on `homestay-visit-report.html`, persisted in `og_visit_reports[].items`, and read back on `host-profile.html:1750` and `host-compliance.html:318`.

| Sub | Requirement | Platform evidence (visit report item key) | Status | Gap |
|---|---|---|---|---|
| **5.5.1.1** | Suitable bedroom and social areas, well kept, clean, in good repair, sufficient natural light. | `homeClean`, `bedroomViewed`, `studentBedroomSuitable`, `bedroomLight`, `socialAreas` | ✅ **COMPLETE** — 85% | Point-in-time only. |
| **5.5.1.2** | Privacy safeguards from other students; parent consent before room sharing. | `privacy`, `privacySafeguards`, `roomSharingSafeguards` | ⚠️ **PARTIALLY COMPLETE** — 65% | Parent consent to room sharing is not a student-record consent, only a visit observation. |
| **5.5.1.3** | Where a double bed is used only one student uses it; students never share a bed. | `noSharedBed`, `suitableBed` | ✅ **COMPLETE** — 85% | Not enforced against actual placements. |
| **5.5.1.4** | Suitable heating, lighting and sufficient hot water. | `bedroomLight`, `hotWater`, `suitableBed` | ✅ **COMPLETE** — 85% | — |
| **5.5.1.5** | Access to a private space to study. | `studySpace` | ✅ **COMPLETE** — 85% | — |
| **5.5.1.6** | Appropriate hanging and drawer space. | `hangingSpace` | ✅ **COMPLETE** — 85% | — |
| **5.5.1.7** | Bathroom with a lock and either shower or bath. | `bathroomAccess` | ✅ **COMPLETE** — 85% | — |
| **5.5.1.8** | Right to opt for a non-smoking and/or non-pet homestay. | `smokingPet` on the visit report; `host.smokerStatus` and `host.pets` on the record; `getShareableHostProfile()` renders a smoking policy statement. | ✅ **COMPLETE** — 80% | No student-side preference field, so the opt-out cannot be matched at placement. |
| **5.5.1.9** | Treated as part of the family with communal-room access; no access to family bedrooms. | `communalAccess`, `noFamilyBedrooms`, `familyRoutines` | ✅ **COMPLETE** — 85% | — |
| **5.5.2** | **No more than three students placed with the same homestay at any one time.** | `capacityMax` / `capacityCurrent` displayed on `hosts.html` and `host-profile.html`; visit report item `maxThreeStudents`. | ⚠️ **PARTIALLY COMPLETE** — 40% | **Nothing enforces it.** `homestay-create.html` creates placements without checking `capacityCurrent` against `capacityMax`, and `capacityMax` is itself editable to any value on `host-profile.html:1492`. `generateComplianceAlerts()` does not check occupancy. This is a hard AEGIS limit with criminal-liability implications (see the Standard 8 note on Children Act 1989 Schedule 7) and it is currently advisory-only. |
| **5.5.3** | Homestays working with other GOs must not accommodate more than three students in total. | Visit report item *"No more than three students will be hosted in total…"*. No field for students placed by other organisations. | ⚠️ **PARTIALLY COMPLETE** — 35% | Add `externalStudentsHosted` to the host record and include it in the capacity calculation. |
| **5.5.4** | Boarding-house style hosting requires contact with AEGIS. | Not modelled. | ❌ **NOT MET** — 0% | Likely N/A for this business model, but not recorded as such. |
| **5.5.5** | When students under 16 are hosted, no students over 20 in the same homestay (including another GO's). | Visit report item `ageRestriction`. Student `dob` is available. | ⚠️ **PARTIALLY COMPLETE** — 35% | Derivable but never derived. Add an age-mix check at placement using `dob` across `host.linkedStudents`. |
| **5.5.6** | No other paying guests or B&B while hosting AEGIS students. | Visit report item `noPayingGuests`. Visit report captures it. Empty visit report seed is Data Unseeded. | ⚠️ **PARTIALLY COMPLETE** — 55% | Recorded annually, not as a standing host attribute. Empty visit report seed is Data Unseeded. |

| **5.5.7** | Students of any age sufficiently supervised; not permitted to live independently. | Visit report items `supervised`, `supervision`. | ⚠️ **PARTIALLY COMPLETE** — 50% | — |
| **5.5.8** | NSPCC home-alone guidance — under-12s not left alone for long periods; under-16s not left alone overnight; no student left alone if uncomfortable. | Not present as a distinct item. | ❌ **NOT MET** — 10% | Add three explicit items to the visit report and a corresponding statement to the homestay handbook (2.3.3). |

#### 5.6 Meals — **70%** ⚠️

| Sub | Requirement | Platform evidence | Status | Gap |
|---|---|---|---|---|
| **5.6.1** | Full board — breakfast, lunch and dinner — accounting for dietary needs. | Visit report items `fullBoard`, `fullBoardChecked`, `dietaryNeeds`, `foodPreparation`; host `dietaryProvision`; student `health.dietaryRequirements`. | ✅ **COMPLETE** — 80% | Student dietary requirements and host dietary provision are never matched at placement. |
| **5.6.2** | Access to suitable drinks and snacks. | Visit report items `drinksSnacks`, `drinksSnacksAccess`. | ✅ **COMPLETE** — 80% | Point-in-time only. |

#### 5.7 Laundry — **70%** ⚠️

| Sub | Requirement | Platform evidence | Status | Gap |
|---|---|---|---|---|
| **5.7.1** | Suitable laundry facilities for stays of more than one night. | Visit report items `laundry`, `laundryResidents`. | ✅ **COMPLETE** — 70% | Captured only on the annual visit; not a host record attribute and not in the homestay handbook (which does not exist). |

#### 5.8 Guidelines on conduct when hosting — **55%** ⚠️

| Sub | Requirement | Platform evidence | Status | Gap |
|---|---|---|---|---|
| **5.8.1** | Homestays aware they should include students in family routines and provide a homely environment. | Visit report items `familyRoutines`, `communalAccess`. | ✅ **COMPLETE** — 75% | — |
| **5.8.2** | Produce suitable written guidelines for homestays on expected behaviour (Appendix 6). | **No code of conduct document exists.** | ❌ **NOT MET** — 0% | Appendix A requires a Staff and Homestay Code of Conduct. Appendix 6 lists 21 content areas. |
| **5.8.3** | Homestays aware they may only use reasonable, appropriate and lawful means of control. | Visit report item `behaviourManagement`. | ⚠️ **PARTIALLY COMPLETE** — 60% | Observed at a visit; not issued as a written instruction, because no document exists to issue. |
| **5.8.4** | Homestays aware physical punishment must never be used. | Same item — *"Appropriate, lawful behaviour management only; no physical punishment."* | ⚠️ **PARTIALLY COMPLETE** — 60% | As above. Appendix 3 requires an explicit written statement in the homestay handbook. |
| **5.8.5** | Guidance so homestays know how to reassure students in distress. | Visit report item `homesickness`. | ⚠️ **PARTIALLY COMPLETE** — 55% | — |
| **5.8.6** | CCTV use must comply with the ICO Code of Practice; homestay keeps a paper trail; GO conducts ad hoc checks. | Visit report items `cctvPresent`, `cctvRecorded` — *"CCTV present? If yes, lawful use, privacy and ICO expectations discussed."* | ⚠️ **PARTIALLY COMPLETE** — 55% | No standing `hasCCTV` flag on the host record, no paper-trail document field, no ad hoc check schedule. |

#### 5.9 Homestay Annual Training — **90%** ✅

| Sub | Requirement | Platform evidence | Status | Gap |
|---|---|---|---|---|
| **5.9.1** | Regular training opportunities at least annually, covering safeguarding, mental health and regulatory changes. | `TRN-CRS-007 "Homestay Annual Refresher Update"` (code `AEGIS-5.9.1`), `repeatIntervalMonths: 12`, mandatory, targeted at `Host`. Plus `TRN-CRS-006 "Homestay Induction & Safeguarding Intro"` (one-off, pre-approval). `og_training_completions` via `saveTrainingCompletion()`; `saveTrainingLog()` automatically creates a completion when a log carries a `courseId`, so `training-record-create.html` keeps both views in sync. `getRequiredCoursesForPerson()` computes Not started / Overdue / Due soon (60-day window) / Complete, and `checkTrainingRequirements()` raises **critical** alerts for overdue and warnings for due-soon on all approved hosts. Rendered in `training-log.html`, `host-compliance.html`, `host-profile.html`. `og_training_completions` seed empty but the full course engine works. | ✅ **COMPLETE — Data Unseeded** — 92% | Course content areas are a free-text description; no evidence the annual update actually covered safeguarding + mental health + regulatory changes. |


#### 5.10 Homestay Health and Safety & Annual Visit — **85%** ✅

| Sub | Requirement | Platform evidence | Status | Gap |
|---|---|---|---|---|
| **5.10.1** | Comply with HSE health and safety; written policy where 5+ employees. | No H&S policy seeded in `og_org_documents` (only 3 staff, so the written-policy threshold may not apply). | ⚠️ **PARTIALLY COMPLETE** — 50% | Appendix A requires a "Welfare Health and Safety Policy, where relevant". |
| **5.10.1.1** | **Initial in-person assessment visit before placing any students**, with H&S checks, a simple risk assessment and accommodation-suitability check; comprehensive notes in the homestay file. | `getHostInPersonVisitStatus(hostId)` (`db.js:3048`) returns `missing` / `overdue` / `expiring_soon` / `current` on a 12-month cycle and emits an explicit blocking warning: *"AEGIS Standard 5.10.1.1: No approved in-person assessment visit on record. **Do not assign or place students with this host** until an in-person assessment has been conducted and approved."* Visit type `Initial pre-placement` is a first-class option; outcome is one of `approved` / `approved_after_actions` / `not_approved` / `suspended`. Consumed by `host-profile.html`. Visit reports seed empty but end-to-end works. | ✅ **COMPLETE — Data Unseeded** — 92% | The warning is advisory text — `homestay-create.html` does not consult `getHostInPersonVisitStatus()` before creating a placement. (Real enforcement gap) |

| **5.10.1.2** | Keep an accident book for recordable events involving students, staff, homestays or volunteers. | `og_incidents` — explicitly annotated *"Accident Book — AEGIS Standard 5.10.1.2"*. Fields: category, `affectedRole` (Student/Host/Staff/Driver), `personId`, `hostId`, date, time, location, incident type, severity, description, action taken, `reportedBy`, `firstAider`, `hospitalAttended`, **`riddorReportable`**, status, `loggedBy`, `medicationDetails`, `notifications.{parents, school, dsl}`. Created via `homestay-incident-create.html`, `travel-incident-create.html`, `emergency-incident.html`; listed on `homestay-incidents.html`, `travel-incidents.html`, `incident-logs.html`; surfaced on `host-profile.html`. | ✅ **COMPLETE** — 90% | `homestay-accident.html` and `homestay-accident-create.html` are dead static duplicates of this working flow and should be retired. No RIDDOR reporting deadline tracking. |
| **5.10.2.1–5.10.2.12** | The 12 minimum H&S checks — smoke alarm per storey; CO alarm; annual gas safety certificate; electrical safety; evacuation routes and key locations; serviced extinguishers/blankets; fire guard on open fires; matches/lighters stored; complete first aid kit; medication stored safely; alcohol stored; food hygiene awareness. | `homestay-hs-checklist.html` implements a **24-item structured checklist** (`S11_SECTIONS`, three panels) with yes/no/na per item, mapping to every one of the twelve: `smokeAlarmEveryStorey`, `coAlarmGasAppliance`/`coAlarmWorking`, `gasCertSeen`/`gasCertRetained`, `electricalVisualCheck`/`electricalDetailCheck`/`electricalApplianceSafety`, `evacuationRouteDiscussed`/`evacuationRouteDetailed`, `fireExtinguisherServiced`, `openFireGuard`/`openFireSafety`, `matchesLightersStored`, `firstAidKitAvailable`/`firstAidKitComplete`, `medicationStoredSafely`/`medicationAndHazardsSafe`, `alcoholStored`, `foodHygieneAwareness`/`foodPreparationClean` — plus `hazardsIdentifiedControlled`, `wifiAndOnlineSafety`, `riskAssessmentCompleted` and `accidentReportingExplained`. Persisted via `saveHsChecklist()` to `og_hs_checklists`, with hazard rows, photographic evidence upload and gas certificate upload. Read back by `getHsChecklistsForHost()` on `host-profile.html` and `host-compliance.html`, which tally yes/no/na/blank. | ✅ **COMPLETE** — 90% | A `no` answer on a mandatory item (e.g. no smoke alarm) produces no compliance alert and does not affect host status. `compliance.gasSafetyExpiry` exists on the host record and gates contract activation, but the checklist's gas certificate does not write to it. |
| **5.10.3** | At least an annual in-person visit to each homestay; support offered; changes since last visit recorded; comprehensive notes in the homestay file. | `homestay-visit-report.html` — a **38-item structured report** across accommodation, meals, laundry, conduct, safeguarding, travel and school liaison — plus visit type, outcome, actions and notes. `saveVisitReport()` (`db.js:3016`) **automatically advances `host.annualVisitLast`, sets `annualVisitDue` to +1 year and flips `annualVisitStatus` to `complete`** when an Annual review or Initial pre-placement visit is approved. `getHostInPersonVisitStatus()` provides the 12-month expiry state with a 30-day amber window. Listed on `homestay-visit.html`. | ✅ **COMPLETE** — 95% | Overdue annual visits do not appear in `generateComplianceAlerts()` — the status is computed and rendered but never alerted, so an overdue visit is only visible to someone who opens that specific host's profile. |

#### 5.11 Homestay Visits and Inspections — **10%** ❌

| Sub | Requirement | Platform evidence | Status | Gap |
|---|---|---|---|---|
| **5.11.1** | As part of the application process, inform homestays they are expected to cooperate with inspection by AEGIS or any statutory body, including access to their accommodation. | Nothing. Not in the host record, the visit report, the self-declaration or the (absent) homestay handbook. | ❌ **NOT MET** — 10% | Add an `aegisInspectionCooperationAcknowledged` + date to the host record, captured at onboarding. |

#### 5.12 Using a Third-Party Homestay Provider — **0%** ❌

| Sub | Requirement | Platform evidence | Status | Gap |
|---|---|---|---|---|
| **5.12.1** | Members must contact AEGIS before placing students with homestays sourced from a third party. | Nothing. No `sourcedVia` field on the host record. | ❌ **NOT MET** — 0% | Add `hostSource` (`own` / `third-party`) and, when third-party, require an AEGIS contact record before the host can reach `approved` status. |

---

### Standard 6 — Safeguarding, Child Protection and Welfare — **39%** ❌

This is the platform's weakest standard, and the one AEGIS weights most heavily.

#### 6.1 Safeguarding & Child Protection Policy — **25%** ⚠️

| Sub | Requirement | Platform evidence | Status | Gap |
|---|---|---|---|---|
| **6.1.1** | Produce and implement a safeguarding & child protection policy per KCSIE and Working Together; provide to all staff, homestays and volunteers; available to parents and schools on request; **publicly available and on the website**. | `og_org_documents` has a working `Safeguarding & child protection` category with a live route (`policy-viewer.html?cat=Safeguarding+%26+child+protection`) — but **no safeguarding policy is seeded**. Appendix 4 lists 24 minimum content areas; none are modelled. No public/website surface. No issue-and-acknowledge record for staff or homestays. Infrastructure is complete. POLICY CONTENT is Data Unseeded. | ⚠️ **PARTIALLY COMPLETE** — 30% | No required-policy manifest to flag absence, no public website surface, no issue-and-acknowledge tracking. Policy content is DATA UNSEEDED. |

| **6.1.2** | Students know how to keep safe, how to report concerns, and that concerns will be treated seriously — age-appropriately, in the student handbook or a separate publication. | `student-concern-submit.html` gives students a working self-service reporting route into `saveConcern()` + `saveWelfareLog()`, and `student-portal.html` surfaces it. No student handbook (2.3.1). | ⚠️ **PARTIALLY COMPLETE** — 45% | The mechanism exists and works; the age-appropriate written guidance telling students it exists does not. |

#### 6.2 Designated Safeguarding Lead — **50%** ⚠️

| Sub | Requirement | Platform evidence | Status | Gap |
|---|---|---|---|---|
| **6.2.1** | Appoint a senior member of staff as DSL. | `og_staff` role `Admin / DSL` (Jay Ray, title *"Safeguarding lead"*). Named as lead on emergency scenarios SCN-02, SCN-03, SCN-04. | ✅ **COMPLETE** — 90% | Role is a free-text string; nothing validates that exactly one active DSL exists. |
| **6.2.2** | DSL must attend suitable **live** training, renewed every two years. | `TRN-CRS-001 "Designated Safeguarding Lead (DSL) Level 3"` (code `AEGIS-6.2.2`), `repeatIntervalMonths: 24`, mandatory, targeted at `Admin / DSL`, provider NSPCC/BSCP. Overdue raises a **critical** alert. Staff records also carry `trainingLevel` / `trainingDate` / `trainingExpiry`. | ✅ **COMPLETE** — 85% | No `isLiveTraining` flag — the standard explicitly rejects non-live DSL courses, and the platform cannot record the distinction. Duplicate representation (`staff.trainingExpiry` string vs completions store) risks divergence. |
| **6.2.3** | DSL must be resident in the UK. | No field. | ❌ **NOT MET** — 0% | — |
| **6.2.4** | DSL should liaise with counterparts in each partner school. | `og_schools` has no DSL contact field. `og_school_logs` records contact but not with whom by role. | ❌ **NOT MET** — 15% | Add `dslName` / `dslEmail` / `dslPhone` to the school record and a `contactRole` on school logs. |
| **6.2.5** | Where there is a safeguarding concern, the DSL must liaise with the LSP and ensure inter-agency procedures are followed and documented. | No LSP entity, no referral record, no inter-agency log. `POL-EMG-001` mentions *"LADO / Children's Services referral within 24 hours if threshold met"* as narrative text only. | ❌ **NOT MET** — 10% | Appendix 4 requires LSP contact details for every operating area plus the LADO contact. Add an `og_external_referrals` store. |
| **6.2.6** | Safeguarding case notes kept securely, accessible only to the DSL and senior management, including correspondence with children's services and police. | `og_concerns` is plaintext `localStorage` readable by any page. No access control. | ❌ **NOT MET** — 5% | Blocker **B1**. |
| **6.2.7** | Suitable plan when the DSL is unavailable; ideally a deputy trained to the same level. | Zuko Fire holds `trainingLevel: 'DSL Level 3'` and is named as backup on SCN-02/SCN-07; Priya Shah is named as backup on SCN-03. `getEmergencyCoverArrangements()` provides external DSL Level 3 cover. | ✅ **COMPLETE** — 85% | Priya Shah is named as SCN-03 backup *"(DSL Level 3)"* but her staff record says `trainingLevel: 'Safeguarding Awareness'` — the emergency plan contradicts the staff record. |

#### 6.3 Safeguarding Training — **85%** ✅

| Sub | Requirement | Platform evidence | Status | Gap |
|---|---|---|---|---|
| **6.3.1** | DSL ensures all staff, volunteers and every homestay primary carer receive introductory safeguarding training before starting; renewed every three years; where already held, see the certificate and record date and level. | `compliance.safeguardingTrainingDate`, `safeguardingTrainingExpiry`, `safeguardingLevel`, `safeguardingCertificatePath` on hosts and drivers (explicitly annotated *"AEGIS 6.3 — 3-year statutory expiry"*). `TRN-CRS-003` (staff, 36 months) and `TRN-CRS-006` (host induction). Warning alert when no record; `*-compliance-safeguarding.html` sub-pages for all three person types; SCR renders expiry with 60-day amber. Seed data deliberately includes an expired case (Helen Finch, expired 18 Nov 2025) to exercise the breach path. Compliance fields empty in seed but capture UI pages work. | ✅ **COMPLETE — Data Unseeded** — 88% | Drivers not covered by `checkTrainingRequirements()`. Drivers therefore have safeguarding expiry fields that nothing enforces. |

| **6.3.2** | Keep a formal record of all safeguarding training including date and expiry. | `og_training_completions` (person, type, course, completed date, certificate path, notes, source log) + `og_training_logs`; `training-log.html` renders the full matrix across staff and hosts. | ✅ **COMPLETE** — 90% | — |
| **6.3.3** | All staff and homestays receive regular safeguarding updates at least annually. | `TRN-CRS-004 "Annual Staff Safeguarding Update"` (code `AEGIS-6.3.3`, 12 months, All Staff) and `TRN-CRS-007` for hosts. Staff compliance objects carry `annualSafeguardingUpdateDate` + `annualSafeguardingUpdateNotes`. | ✅ **COMPLETE** — 85% | `annualSafeguardingUpdateDate` duplicates what the completions store already tracks and is not read by any alert. |

#### 6.4 Whistleblowing — **15%** ❌

| Sub | Requirement | Platform evidence | Status | Gap |
|---|---|---|---|---|
| **6.4.1** | Produce a whistleblowing policy, shared with staff and homestays. | No policy seeded. `admin-dashboard.html` and `compliance.html` both display a **static** "Whistleblowing Policy review overdue / Owner: Zuko Fire / Due 15 Mar 2026" row for a policy that does not exist in `og_org_documents`. | ❌ **NOT MET** — 15% | The fabricated row is actively misleading — it presents a governed document with an owner and review date, backed by nothing. |
| **6.4.2** | Policy must show how whistleblowing is managed by the organisation. | None. | ❌ **NOT MET** — 0% | — |
| **6.4.3** | Include NSPCC whistleblowing helpline (0800 028 0285) and Protect advice line (020 3117 2520) details in the policy. | Neither number appears anywhere in the codebase. | ❌ **NOT MET** — 0% | — |

#### 6.5 Allegations and Low-Level Concerns — **45%** ⚠️

| Sub | Requirement | Platform evidence | Status | Gap |
|---|---|---|---|---|
| **6.5.1** | Outline procedures followed when an allegation is made against a member of staff, homestay or volunteer. | `og_concerns` supports `subjectRole: 'Host'` (seeded example CON00002 against Catherine Brennan) and tiers `low-level` / `escalated` / `resolved`. `concerns-dashboard.html`, `-escalated.html`, `-low-level.html`, `-resolved.html` all read via `getConcernsByTier()`. No procedure document. | ⚠️ **PARTIALLY COMPLETE** — 40% | The data model handles adult allegations correctly; the written procedure (which may sit in the safeguarding policy) does not exist. |
| **6.5.2** | Policy outlining the procedure for dealing with low-level concerns; staff understand the importance of reporting them. | Read path works. **Write path is dead:** `low-level-concern-create.html` renders a full form whose "Save low-level concern" control is `<a class="button" href="concerns-low-level.html">` — an anchor, not a submit. The page loads no `db.js` and has no script. `concern-case.html`, `concern-close.html` and `concern-escalation.html` are equally static. | ⚠️ **PARTIALLY COMPLETE** — 45% | `saveConcern()` and `generateConcernId()` exist and work — they are called successfully from `welfare-note-create.html`, `student-concern-submit.html` and `mental-health-referral.html`. The four dedicated concern-management pages simply were never wired to them. **This is a ~40-line fix across four pages and would move this sub-standard to fully met.** |
| **6.5.3** | Self-report to AEGIS any significant safeguarding concern or compromising situation. | No field, no workflow. | ❌ **NOT MET** — 0% | Related to 2.11.1 — both need an AEGIS-notification store with a deadline clock. |
| **6.5.4** | Encourage staff and homestays to self-report; have a process to record and manage such circumstances. | No self-report entry point or record type. | ❌ **NOT MET** — 0% | Appendix 3 and Appendix 6 both require a self-reporting statement in the homestay handbook and code of conduct. |

#### 6.6 Anti-Radicalisation — Prevent Duty — **35%** ⚠️

| Sub | Requirement | Platform evidence | Status | Gap |
|---|---|---|---|---|
| **6.6.1** | Produce an anti-radicalisation policy per the Prevent Duty guidance, available to staff, volunteers, homestays, parents and schools on request. | No policy seeded. | ❌ **NOT MET** — 10% | Appendix A requires it. |
| **6.6.2** | Cover the key points in appropriate language in the Student Handbook. | No student handbook. | ❌ **NOT MET** — 0% | — |
| **6.6.3** | Policy must include a 24-hour contact number for reporting radicalisation concerns. | The 24/7 line exists (`+44 7700 900 999`) but is not bound to a Prevent policy or reporting route. | ⚠️ **PARTIALLY COMPLETE** — 30% | — |
| **6.6.4** | At least one member of staff completes Prevent/anti-radicalisation training. | `TRN-CRS-005 "Prevent Duty Awareness"` (code `AEGIS-6.6.5`), 36 months, mandatory, targeted at `Admin / DSL` and `Admin / Operations`, provider Home Office. Overdue raises a critical alert. | ✅ **COMPLETE** — 85% | The course code is `AEGIS-6.6.5`, which is not a sub-standard that exists — the requirement is 6.6.4. Cosmetic but visible on `training-log.html`. Appendix A requires evidence of Prevent training for the DSL/nominated lead; the certificate path is captured on completions. |

#### 6.7 Missing Students — **50%** ⚠️

| Sub | Requirement | Platform evidence | Status | Gap |
|---|---|---|---|---|
| **6.7.1** | Policy outlining procedures for staff and homestays when a student goes missing. | No standalone policy. Emergency scenario `SCN-02 "Missing Student / Unauthorised Absence"` is fully specified: lead Jay Ray (DSL), backup Zuko Fire, immediate action *"Verify last known location → Contact friends/school/host → Call Police (999/101) if not located within 30 minutes"*, escalation *"DSL immediately; Parents immediately; Police < 30 mins; AEGIS within 24 hours"*, documentation *"Missing Student Incident Report + Police CAD reference + Timeline log"*. `POL-EMG-001` carries it as narrative. | ⚠️ **PARTIALLY COMPLETE** — 60% | The *procedure* is genuinely well specified; the *policy document* required by Appendix A is not. `admin-dashboard.html` again shows a static "Missing Student Policy v0.8 / Draft" row for a non-existent document. |
| **6.7.2** | Copy shared with all staff, volunteers, homestays; available to parents and schools on request. | No issue or acknowledgement tracking. | ❌ **NOT MET** — 10% | — |
| **6.7.3** | Policy must include a 24-hour contact number for reporting missing students. | The 24/7 line and `recordEmergencyNumberIssued()` exist. | ⚠️ **PARTIALLY COMPLETE** — 60% | Not bound to a missing-student policy document. |
| **6.7.4** | Take account of Children Missing from Education guidance where relevant. | Not referenced. | ❌ **NOT MET** — 0% | — |

#### 6.8 Student Behaviour — **10%** ❌

| Sub | Requirement | Platform evidence | Status | Gap |
|---|---|---|---|---|
| **6.8.1** | Suitable guidelines covering expected positive behaviour, age-tailored, written for students, parents, agents and homestays. | No student code of conduct exists. | ❌ **NOT MET** — 5% | Appendix A requires a Student Behaviour Code of Conduct. |
| **6.8.1.1–6.8.1.11** | Eleven specific areas: homestay conduct; curfew; kitchen use; bathroom use; Wi-Fi/home computer; alcohol law; drugs law; smoking/vaping law; sexual activity law; tattoos and piercings; arrangements for staying away from the homestay. | The homestay visit report touches three from the host side — `curfews`, `curfewProcedures`, *"Curfews, staying away from the homestay and absence reporting expectations discussed"* — and `wifiAndOnlineSafety` appears in the H&S checklist. The other seven areas appear nowhere. | ❌ **NOT MET** — 15% | These are handbook/policy content, not database fields. Needs 2.3.1 (student handbook) and a behaviour code document. |

#### 6.9 Anti-Bullying including Cyberbullying — **5%** ❌

| Sub | Requirement | Platform evidence | Status | Gap |
|---|---|---|---|---|
| **6.9.1** | Produce an anti-bullying policy including cyberbullying; share with staff and homestays; available to parents and students on request. | Nothing. One incidental mention across 179 pages. | ❌ **NOT MET** — 5% | Appendix A requires it. |
| **6.9.2** | Provide bullying guidance for students and homestays via the Student Handbook or a standalone document. | Nothing. | ❌ **NOT MET** — 5% | The concerns store *could* categorise a bullying concern — `og_concerns.category` is free text — but no category taxonomy exists. |

#### 6.10 Online Safety — **20%** ❌

| Sub | Requirement | Platform evidence | Status | Gap |
|---|---|---|---|---|
| **6.10.1** | Produce an online safety policy for staff and homestays, available to students and parents on request, per KCSIE; demonstrate commitment to keeping students safe online, identify risks and how they are managed; **make homestays aware of Wi-Fi controls and filtering options**. | No policy. The Wi-Fi awareness limb *is* covered: H&S checklist item `wifiAndOnlineSafety` — *"Wi-Fi access, filtering/controls, age-appropriate boundaries and online safety expectations discussed"* — captured at every homestay assessment and persisted. | ⚠️ **PARTIALLY COMPLETE** — 20% | Appendix A requires an Online Safety Policy. The operational check exists without the governing document. |

---

### Standard 7 — Complaints — **5%** ❌

| Sub | Requirement | Platform evidence | Status | Gap |
|---|---|---|---|---|
| **7.1** | Produce a policy on recording and responding to complaints in a timely manner; **publicly available and on the website**. | No complaints policy. `og_org_documents` has a `Complaints & governance` category with a live route and no content. | ❌ **NOT MET** — 10% | Appendix A requires a Complaints Policy. |
| **7.2** | Policy must cover an informal stage, a formal resolution stage, and a further stage referring the matter to AEGIS. | Not modelled. Appendix 8 sets out the four-stage AEGIS grievance procedure. | ❌ **NOT MET** — 0% | — |
| **7.3** | **Keep a written record of all formal complaints and the action taken, regardless of whether they are upheld.** | **No complaints store exists.** `og_concerns` covers safeguarding concerns, not complaints — different lifecycle, different parties (parents, homestays, schools, agents can all complain), different outcome semantics (upheld/not upheld). Grepping "complaint" across the tree returns only navigation labels and static text. | ❌ **NOT MET** — 0% | Blocker **B4**. Needs an `og_complaints` store: complainant type and identity, date received, stage (informal/formal/AEGIS panel), description, handler, actions taken, outcome (upheld/partly upheld/not upheld), closed date, and a timeliness clock. |

---

### Standard 8 — Day Students, Prolonged Stays with Hosts and Private Fostering — **80%** ⚠️

The strongest standard in the audit relative to its difficulty, and clearly built directly against the handbook text.

| Sub | Requirement | Platform evidence | Status | Gap |
|---|---|---|---|---|
| **8.1** | Where students under 16 (under 18 if disabled) live with a non-relative homestay for 28+ consecutive days, adhere to local private fostering regulations. | `student.privateFostering.isApplicable` + `proposedStartDate`; `student.accommodationType` supports `'Private Fostering'`; seeded case Amara Osei (STU61100, DOB 2012, Year 9). `private-fostering.html` (1,155 lines) is the working hub. | ✅ **COMPLETE** — 85% | `isApplicable` is set manually — nothing derives it from age + placement duration, so a placement that *becomes* private fostering by exceeding 28 days is not detected. The disability limb (under 18) is not modelled. |
| **8.2** | Demonstrate liaison with school and homestay to ensure the LA is notified at least **six weeks** before the arrangement begins; immediately if starting within six weeks. | `privateFostering.laNotifiedDate` and `proposedStartDate`; `private-fostering.html:527` computes `daysUntilDate(proposedStartDate) < 42 && !laNotifiedDate` → **urgent** flag, with counts of notified vs pending across the caseload. | ✅ **COMPLETE** — 90% | The 42-day rule is correctly implemented. It raises no entry in `generateComplianceAlerts()`, so it is visible only on `private-fostering.html`. |
| **8.3** | Demonstrate liaison with school and homestay to explain carefully what a private fostering arrangement requires, including regular LA visits and meetings. | `privateFostering.briefings.{school, homestay, parent}`, each `{ briefed, date, by, contentCovered: [...topics], notes }` — the seed shows `contentCovered: ['28-day threshold', 'LA notification', 'LA visits expectation']`. Legacy flat-boolean records are normalised on load so old data never throws. | ✅ **COMPLETE** — 95% | Excellent — records not just *that* a briefing happened but *what was covered*. |
| **8.4** | System for recording all correspondence with the LA private fostering team, and securing permissions to share information with student, parents, agents, homestay and school. | `privateFostering.correspondenceLog[]` and `privateFostering.informationSharing.{parent, school, host}` each `{ consented, date, method, reference }`. `private-fostering-notification.html` writes LA notifications; `og_pf_documents` holds uploads and is read by `aggregateDocuments()`. | ✅ **COMPLETE** — 90% | `private-fostering-documents.html` writes through its own local `saveRecords()` rather than a `db.js` function — it lands in the right key, but the write path bypasses the data layer and is the one place in this cluster that could drift. Agents are deliberately excluded from `informationSharing`, which is documented in a code comment as an intentional design decision. |
| **8.5** | For day students over 16, be mindful of the extended period spent with homestays and regularly carry out suitable checks to monitor welfare. | `student.dayStudentWelfare` — `homestayStartDate`, `welfareCheckFrequencyDays` (default 30), `checkins[]` (`date`, `by`, `type` ∈ In-Person Visit / Phone Call / Video Call / Email, `notes`), and `consentLog.{parentConsent, schoolConsent, hostConsent}`. Seeded for Lucas Ferreira (Day Student, Oxford High School). Rendered and edited on `private-fostering.html`. | ✅ **COMPLETE** — 90% | The cadence is stored but not enforced — an overdue 8.5 check-in raises no alert, unlike the parallel 3.2.1 welfare cadence which does. |

---

### Standard 9 — Liaison with Partner Schools — **53%** ⚠️

| Sub | Requirement | Platform evidence | Status | Gap |
|---|---|---|---|---|
| **9.1** | Keep in regular contact with the student's school, in line with parents' requirements. | `og_school_logs` via `saveSchoolLog()`; `school-log-create.html` resolves students via `getAllStudents()`; listed on `schools.html` and `school-liaison.html`. Students carry `schoolId` (proper ID link) plus `tutorOrHouse`, `tutorEmail`, `tutorPhone`. `og_school_logs` seed empty but `saveSchoolLog()` exists. | ✅ **COMPLETE — Data Unseeded** — 85% | No contact-cadence requirement or overdue detection. |

| **9.2** | Inform the school contact whenever visiting the site. | No visit type or notification field on school logs. | ❌ **NOT MET** — 0% | Add a `site-visit` log type with a `schoolInformedDate`. |
| **9.3** | Provide schools with **written confirmation of the services contracted for each student**, sent at the start of each academic year or when a new student joins. | `og_schools[].services` is a proper 7-field matrix (`emergencySupport`, `homestayArrangements`, `academicLiaison`, `travelAssistance`, `pastoralCare`, `practicalAdmin`, `visaSupport`), rendered by `school-profile.html`. But it is a *school-level* matrix, not a per-student confirmation, and **nothing records that a confirmation was issued**. `admin-dashboard.html` shows a static row *"Written service confirmation needs new term issue"* with nothing behind it. | ❌ **NOT MET** — 25% | Appendix A requires "an example of written confirmation of service". Add `serviceConfirmationIssuedDate` + document path per student per academic year, and alert when a new academic year starts or a student joins. |
| **9.4** | Liaise with the school concerning all travel and transport arrangements. | `travel.html` calls `saveSchoolLog()`; visit report item `schoolInformed` — *"School has been informed of homestay and travel arrangements where required."* | ✅ **COMPLETE** — 75% | — |
| **9.5** | Liaise with the school regarding any homestay arrangements. | Covered by the same `schoolInformed` visit report item, but no link between `og_placements` and `og_school_logs`. | ⚠️ **PARTIALLY COMPLETE** — 45% | Creating a placement should offer to log the school notification. |
| **9.6** | Liaise with the school on the student's needs, wellbeing and medication. | `school-welfare-notification.html` → `getStudentById()` + `saveSchoolLog()`. Student health data is available on the same record. | ✅ **COMPLETE** — 80% | Medication specifically is not a notification type despite `medicineAdministrationLog` existing. |
| **9.7** | Keep a comprehensive record or log of all visits to, and communication with, schools. | `getSchoolLogs()` returns the full log; `schools.html` and `school-liaison.html` render it. | ⚠️ **PARTIALLY COMPLETE** — 55% | **`school-profile.html` renders only the services list** — it does not call `getStudentsForSchool()` (which exists in `db.js:3649` and is exported) or `getSchoolLogs()`. The per-school page, the natural place for this evidence, shows neither the enrolled students nor the log. Roughly a 30-line fix. |
| **9.8** | If the named point of contact at the GO is unavailable, inform the school as soon as possible who will undertake guardianship duties. | No named-contact field on the school record, no cover-notification workflow. | ❌ **NOT MET** — 0% | Add `assignedCoordinatorId` to the school (or student) record and a cover-notification log type. |
| **9.9** | Inform schools if no longer acting as educational guardian for a student. | `student-archive.html` and `student-delete.html` are **static**. `student.status` supports Active/Monitor/Pending but there is no offboarding workflow. | ❌ **NOT MET** — 0% | Add a guardianship-ended flow that requires a school notification log before the student can be archived. |

---

### Standard 10 — Liaison with Parents — **86%** ⚠️

| Sub | Requirement | Platform evidence | Status | Gap |
|---|---|---|---|---|
| **10.1** | Keep in regular contact with parents, in line with the terms of the contract. | `og_parents` (5 seeded, with `linkedStudentIds[]` — proper ID links, plus `preferredContact`, `language`, `relationship`); `og_parent_logs` via `saveParentLog()`; `parent-log-create.html`, `parent-liaison.html`, `parent-profile.html`, `parent-list.html`. Parent contracts tracked in `og_contracts` (2.2.2). `og_parent_logs` seed empty but full CRUD works. | ✅ **COMPLETE — Data Unseeded** — 88% | Parent-student data duplication, no cadence. |

| **10.2** | Provide parents with a 24-hour contact number and be clear who to contact in an emergency. | `recordEmergencyNumberIssued('parent', …)`; `parent-portal.html` calls it and surfaces the emergency route; `emergency-procedures.html` reports issuance coverage; `POL-EMG-001` names the rota by shift. `recordEmergencyNumberIssued()` exists. | ⚠️ **PARTIALLY COMPLETE** — 82% | **`getEmergencyIssuanceStats()` (`db.js:3809`) is broken.** The filter is truthy, so coverage reports 100%. Staff, volunteers and drivers are not tracked at all. |

| **10.3** | Keep parents informed in an emergency — delayed/cancelled flights, illness or injury, missing students, removal from school. | `emergency-incident.html` writes an incident **and** calls `saveParentLog()`, so the parent notification is recorded against the parent as well as the incident. `incident.notifications.{parents, school, dsl}` booleans on every accident-book entry. `POL-EMG-001` sets escalation timelines (parents within 1 hour for medical, immediately for missing student). `mental-health-removal.html` writes a welfare log on school removal. | ✅ **COMPLETE** — 85% | Timelines are documented in policy prose but not enforced or measured — nothing compares incident time to parent-notification time against the 1-hour rule. Travel disruption (`og_transports`) does not automatically create a parent log. |

---

## 4 · Cross-cutting issues

Issues that affect multiple standards and cannot be fixed within any single one.

### X1 — No security model at all
**Affects: 2.5.1, 2.7.4, 3.4.3, 6.2.6 · Severity: Critical**

Every record — safeguarding concerns, DBS certificate numbers, student medical data, home addresses, mental health case notes — is stored unencrypted in `localStorage` under a plaintext key, readable by any script on the origin and by anyone with access to the device. `login.html` has no data calls and performs no credential check; navigating directly to any page bypasses it entirely. `og_staff` carries a `role` field and several pages describe intended access boundaries in prose — `staff-profile.html` states Priya Shah *"should not hold broad access to policy control or DSL-only safeguarding records"* — but nothing in the code enforces any of it. `admin-dashboard.html:83` exposes a `localStorage.clear()` button that irreversibly destroys the entire database with no confirmation.

This is acceptable for a UI prototype and disqualifying for anything an inspector would see. AEGIS 6.2.6 specifically requires safeguarding case notes to be *"only accessible to the DSL and senior management"* — a requirement that cannot be partially satisfied.

### X2 — No audit trail
**Affects: 2.5.1, 2.7.4, 6.2.5 · Severity: Critical**

`audit-log.html` (209 lines) is entirely static. There is no audit store, no write interceptor, no `changedBy` / `changedAt` on any record. The only history anywhere in the system is `og_org_documents[].reviewHistory[]`, which is well built and demonstrates the pattern that should be generalised. Without an audit trail, the platform cannot evidence who accessed a safeguarding record, who altered a DBS status, or when a consent was changed — all of which an AEGIS inspection will ask about.

### X3 — No organisation entity
**Affects: 1.1, 1.2, 2.4, 2.7.2, 2.7.3, 2.11 · Severity: High**

`db.js` models people (students, hosts, drivers, staff, parents, agents), places (schools) and events — but never the organisation itself. There is nowhere to record the ICO registration number, the named data controller, insurance policies and renewal dates, the statement of aims, the company organogram, the AEGIS accreditation level and expiry, or the significant-changes log. Six sub-standards fail for the single reason that there is no record to attach them to.

**Fix:** add an `og_organisation` singleton store with an `organisation-profile.html` page. This is a small, self-contained addition that resolves more standards per line of code than anything else in this report.

### X4 — The policy store is empty
**Affects: 1.1, 2.3, 2.7.3, 2.8.1, 2.10, 5.10.1, 6.1, 6.4, 6.6, 6.7, 6.9, 6.10, 7 · Severity: Critical**

`policy-viewer.html` is a genuinely good implementation — create, edit, archive, restore, version bumping, content snapshots, category filtering, a full chronological history view, and a review-status badge. It holds **two documents**. Appendix A lists roughly fourteen required policies plus three handbooks.

Worse, there is no *required-policy manifest*. Nothing in the system knows that a Safeguarding Policy is mandatory, so its absence is silent. A user opening `policy-viewer.html?cat=Safeguarding+%26+child+protection` sees an empty state that reads as "nothing uploaded yet", not "you are missing a statutory document".

**Fix:** seed a manifest of required AEGIS documents (title, category, standard reference, mandatory flag) as placeholder records with `status: 'Missing'`, so the policy library becomes a live gap analysis instead of a filing cabinet.

### X5 — `generateComplianceAlerts()` has blind spots
**Affects: 2.10, 5.5.2, 5.10.3, 8.2, 8.5, 9.3 · Severity: High**

The alert engine covers person compliance and student records thoroughly. It does not look at:

| Not checked | Standard | Data already exists |
|---|---|---|
| Overdue policy reviews | 2.10.1 | `og_org_documents[].reviewDate` |
| Overdue annual homestay visits | 5.10.3 | `getHostInPersonVisitStatus()` |
| Failed H&S checklist items | 5.10.2 | `og_hs_checklists[].items` |
| Host over capacity | 5.5.2 | `capacityCurrent` vs `capacityMax` |
| Private fostering LA notification < 6 weeks | 8.2 | `proposedStartDate`, `laNotifiedDate` |
| Overdue day-student welfare checks | 8.5 | `dayStudentWelfare.checkins[]` |
| Missing school service confirmations | 9.3 | — (needs new field) |
| Contracts expiring or absent | 2.2 | `og_contracts` |
| Driver safeguarding training expiry | 6.3.1 | `compliance.safeguardingTrainingExpiry` |

Every one of these except 9.3 is computable from data the platform already holds. Extending the alert engine is the highest-leverage change in this report: it converts several PARTIALLY MET standards into FULLY MET without any new data capture.

### X6 — Duplicated fields that can silently diverge
**Affects: 2.8.5, 3.4.1, 6.2.2, 10.1 · Severity: High**

Four fields are stored in two places at once, with different writers and different readers:

| Concept | Representation A (display) | Representation B (compliance) | Symptom |
|---|---|---|---|
| DBS | `host.dbsStatus`, `dbsCertNumber`, `dbsIssueDate`, `dbsRenewalDue` | `host.compliance.dbsNumber`, `dbsCertificatePath`, `dbsExpiry`, `dbsLastChecked` | Eleanor Ashworth displays a clear enhanced DBS on her profile **and** raises a critical "No DBS certificate on file" alert |
| Staff training | `staff.trainingLevel`, `trainingDate`, `trainingExpiry` | `og_training_completions` | Priya Shah is `Safeguarding Awareness` on her record but named *"(DSL Level 3)"* as SCN-03 backup in the emergency plan |
| Annual safeguarding update | `compliance.annualSafeguardingUpdateDate` | `TRN-CRS-004` completions | Two records of the same event; only one is alerted |
| Parent contact | `student.parent1Name/Email/Phone` | `og_parents` with `linkedStudentIds[]` | June review C4 — still open |

The compliance engine reads B; the profile pages display A. Collapse each pair, with A derived from B.

### X7 — Static pages that assert compliance
**Affects: 2.5.1, 2.10, 6.1, 6.4, 6.7 · Severity: Critical**

`admin-dashboard.html` and `compliance.html` present specific, confident, false compliance figures. This is qualitatively different from an unbuilt page. An unbuilt page is honest; a page asserting "Overall compliance state: Amber — Strong record coverage" while naming hosts who do not exist and policies that were never written is the kind of finding that ends an inspection early. `compliance.html`'s own closing note — *"RAG without definitions is dashboard cosplay"* — describes the page it appears on.

Both pages should either be wired to `generateComplianceAlerts()` (a ~60-line change; the function already returns everything they display) or removed.

### X8 — Branding leakage
**Affects: 1.2 · Severity: Medium**

Six pages contain the string **"Nest Guardians"** (13 occurrences), including inside AEGIS-critical checklist labels: `homestay-visit-report.html` asks *"No more than three students will be hosted in total when a Nest Guardians student is present"* and *"No other paying guests or bed and breakfast arrangements while hosting Nest Guardians students."* Affected pages: `homestay-visit-report.html`, `homestay-hs-checklist.html`, `training-log.html`, `training-record-create.html`, `student-funds.html`, `finances-tracker.html`. Standard 1.2 requires all information to be accurate; a compliance record naming a different organisation is not.

### X9 — Two orphaned duplicates at the repository root
**Affects: Architecture · Severity: High** — see §2.5 (issue **A1**). `assets/db.js` and `policy-viewer.html` at the root are unreferenced copies; `assets/db.js` has diverged by 343 lines.

### X10 — `localStorage` capacity ceiling
**Affects: 2.5.1 · Severity: Medium (deferred)**

Carried forward from the June review and still accurate. Upload widgets store `{name, date}` metadata only, not file bytes, so the ~5–10 MB per-origin quota is not currently at risk. One exception has appeared: `host.profilePhoto` now holds base64-encoded SVG data URIs inline in `og_hosts`. These are small, but they establish the pattern. The moment real DBS certificates or gas safety PDFs are stored as data URLs, writes will throw `QuotaExceededError` — which the `try/catch` blocks throughout `db.js` swallow silently, so data would vanish with no error shown. Keep binaries out of `localStorage`.

---


## 5 · Data Seeding Summary

The platform has several areas where the code infrastructure, UI pages, and persistence layers are completely functional, but the data store is initialized as empty or contains missing fields in the seed data. Under the new methodology, this is categorized as "Data Unseeded" rather than an architectural gap.

To complete the platform, the following stores and fields must be populated with production or demonstration data:

- **`og_contracts`**: Initialize with actual contract templates for Staff, Parents, Homestays, and Agents.
- **`og_org_documents`**: The policy store is currently populated with only 2 policies. The remaining ~12 required policies (Data Protection, Safer Recruitment, Safeguarding, etc.) must be drafted and added.
- **`og_transports` & `og_travel_todos`**: Seed data needed to demonstrate the travel tracking workflows.
- **`og_training_completions`**: Ensure staff and homestays have their training history populated.
- **`og_visit_reports` & `og_hs_checklists`**: Initial visit reports and H&S checklists should be seeded for the existing homestays to clear the warning alerts correctly.
- **`og_school_logs` & `og_parent_logs`**: Add sample logs to demonstrate historical liaison.
- **Compliance Fields**: Ensure all required compliance fields (e.g. `dbsCertificatePath`, `idDocumentPath`, `student.health.*`) are populated correctly with real/demo values instead of empty strings, to clear the initial alerts in `notifications.html`.

## 6 · Remediation roadmap

Ordered by compliance gain per unit of effort. Percentages are the estimated headline movement.

### Phase 1 — Wire what already exists (est. 2–3 days, **+9%**)

| # | Action | Effort | Unlocks |
|---|---|---|---|
| 1 | Replace the hardcoded metrics in `admin-dashboard.html` and `compliance.html` with `generateComplianceAlerts()` output | ~60 lines | X7, B5, 2.5.1, 2.10 |
| 2 | Wire the four concern pages (`low-level-concern-create`, `concern-case`, `concern-close`, `concern-escalation`) to the existing `saveConcern()` / `generateConcernId()` | ~40 lines | 6.5.1, 6.5.2 |
| 3 | Add policy review dates, annual visit status, host capacity, PF 42-day and day-student cadence to `generateComplianceAlerts()` | ~80 lines, central | X5, 2.10.1, 5.5.2, 5.10.3, 8.2, 8.5 |
| 4 | Render `getStudentsForSchool()` and `getSchoolLogs()` on `school-profile.html` | ~30 lines | 9.7 |
| 5 | Fix `getEmergencyIssuanceStats()` truthiness bug (`db.js:3812–3814`) | 3 lines | 2.6.1, 10.2 |
| 6 | Delete root `assets/db.js` and root `policy-viewer.html`; rename `old_version/` → `app/` | 1 commit | A1, X9 |
| 7 | Global find/replace "Nest Guardians" → "Oxford Guardians" across 6 pages | trivial | X8, 1.2 |
| 8 | Populate SCR `DOB` and `Self-dec` columns (fields exist; cells hardcoded to `—`) | ~10 lines | 2.8, 5.1.2 |
| 9 | Retire dead duplicates: `homestay-accident*.html`, `homestay-assessment*.html`, `homestay-visit-create.html`, `homestay-approve/-edit/-delete/-archive.html` | 1 commit | Clarity |

### Phase 2 — Fill the governance layer (est. 1–2 weeks, **+18%**)

| # | Action | Effort | Unlocks |
|---|---|---|---|
| 10 | Add an `og_organisation` singleton + `organisation-profile.html`: ICO number, data controller, insurance policies with renewals, statement of aims, organogram, AEGIS accreditation level and expiry | Medium | X3, 1.1, 2.4, 2.7.2 |
| 11 | Seed a **required-policy manifest** into `og_org_documents` — 14 policies + 3 handbooks with `status: 'Missing'`, `standardRef`, `isMandatory` — so the library becomes live gap analysis | Medium | X4, 2.10, 6.1, 6.4, 6.6, 6.7, 6.9, 6.10, 7.1 |
| 12 | Add an `og_complaints` store + `complaints.html` register: complainant type, stage, actions, outcome, timeliness clock | Medium | B4, 7.1–7.3 |
| 13 | Add an `og_audit_log` store with a write interceptor in `db.js`; wire `audit-log.html` to it | Medium | X2, B2, 2.5.1 |
| 14 | Add `Handbooks` as an `og_org_documents` category with per-audience issue/acknowledgement logs | Small | 2.3.1–2.3.3 |
| 15 | Add an `og_aegis_notifications` store with a 14-day clock | Small | 2.11.1, 6.5.3 |

### Phase 3 — Close the safer-recruitment gaps (est. 1 week, **+8%**)

| # | Action | Effort | Unlocks |
|---|---|---|---|
| 16 | Give `householdMembers[]` its own `compliance` sub-object and make `checkPerson()` iterate members aged ≥16 | Medium | B6, 5.1.3, 2.8.5 |
| 17 | Add `barredListCheckDate`, `dbsWrittenPermissionDate`, `rightToWorkCheckedDate`, `onlineSearchDate`, `dbsDisclosureRiskAssessmentPath` to the compliance object; surface in the SCR | Small | 2.8.6, 2.8.7, 2.8.10, 2.8.11 |
| 18 | Add structured referee metadata (name, relationship, known-since, employer flag, verification call log) alongside `reference1/2Path` | Medium | 2.8.4 |
| 19 | Add an `og_interviews` store keyed to `personId` | Small | 2.8.3, 2.1.5 |
| 20 | Capture the 11 Appendix 5 self-declaration questions as structured responses with a `selfDeclarationDate` and annual re-declaration cycle | Medium | 5.1.2 |
| 21 | Add a real induction record (`inductionDate`, `inductionCompletedBy`, checklist) and wire `induction-checklist.html` / `induction-create.html`; correct the mislabelled SCR "Induction" column | Medium | 2.1.4 |
| 22 | Collapse the duplicated DBS / training / parent-contact representations | Medium | X6 |

### Phase 4 — Enforcement and security (est. 2–4 weeks, **+12%**)

| # | Action | Effort | Unlocks |
|---|---|---|---|
| 23 | Enforce placement rules at `homestay-create.html`: capacity ≤3, under-16/over-20 age mix, in-person visit current, medical placement gate satisfied | Medium | 5.5.2, 5.5.5, 5.10.1.1, 3.4.4 |
| 24 | Add authentication with real credential checking and role-based page gating; restrict `og_concerns` and `og_mh_*` to DSL and senior management | Large | B1, X1, 2.7.4, 3.4.3, 6.2.6 |
| 25 | Move from `localStorage` to IndexedDB or a backend before any binary storage; remove the unguarded `localStorage.clear()` control | Large | 2.5.1, X10 |
| 26 | Add code of conduct + acknowledgement tracking for staff and homestays | Medium | 2.1.6, 5.8.2, 5.8.4 |
| 27 | Add `og_transport_firms` for third-party taxi firms with DBS confirmation documents; add `student.heightCm` and a child-seat check at booking | Medium | 4.3, 4.4 |
| 28 | Add per-student school service confirmations with academic-year issue tracking | Medium | 9.3, 9.8, 9.9 |

**Projected headline after all four phases: ~98%.** Phases 1 and 2 alone move the platform from ~59% to roughly 78%, and Phase 1 is almost entirely re-wiring code that already exists.

---

## 7 · Appendix

### 6.1 Data store inventory

| Key | Contents | Written by | Read by | AEGIS standards |
|---|---|---|---|---|
| `og_students` | 6 students, full Appendix 13 schema | `student-*.html`, `private-fostering.html` | 30+ pages | 3.4, 8 |
| `og_hosts` | 2 hosts, household members, compliance, availability | `host-*.html`, visit reports | 20+ pages | 5.x |
| `og_drivers` | 2 drivers, vehicle + compliance | `driver-*.html` | 10+ pages | 4, 2.8 |
| `og_staff` | 3 staff, roles + compliance | `staff-*.html` | 15+ pages | 2.1, 6.2 |
| `og_parents` | 5 parents with `linkedStudentIds[]` | `parent-*.html` | 6 pages | 10 |
| `og_agents` / `og_agent_logs` | 2 agents + contact log | `agent-profile.html` | 3 pages | 2.2.4 |
| `og_schools` / `og_school_logs` | 6 schools + services matrix + logs | `school-*.html`, `travel.html` | 5 pages | 9 |
| `og_concerns` | 4 seeded, tiered, `subjectId`-linked | `welfare-note-create`, `student-concern-submit`, `mental-health-referral` | 6 pages | 6.5 |
| `og_welfare_logs` | Check-ins + staff notes | 5 pages | 6 pages | 3.2 |
| `og_incidents` | Accident book, RIDDOR flag | 3 create pages | 5 pages | 5.10.1.2 |
| `og_mh_cases` / `_comms` / `_removals` | Mental health suite | `mental-health-*.html` | 3 pages | 3.3 |
| `og_visit_reports` | 38-item annual visit reports | `homestay-visit-report.html` | 3 pages | 5.5, 5.10.3 |
| `og_hs_checklists` | 24-item H&S assessments | `homestay-hs-checklist.html` | 3 pages | 5.10.2 |
| `og_training_courses` / `_completions` / `og_training_logs` | 7 courses + completion ledger | `training-*.html` | 6 pages | 5.9, 6.3 |
| `og_org_documents` | **2 policies** + version history | `policy-viewer.html` | 2 pages | 2.10 |
| `og_student_held_funds` | 5 transactions, running balance | `student-funds.html` | 3 pages | 2.9.2 |
| `og_contracts` | Empty seed; 4 entity types | 4 profile pages | 5 pages | 2.2 |
| `og_transports` / `og_travel_todos` | Journeys + 5-task checklist | `travel-*.html` | 6 pages | 4.1 |
| `og_exeats` / `og_placements` / `og_todos` | Logistics + 4-task checklist | `exeats`, `homestay-create` | 5 pages | 4, 5 |
| `og_finance_events` / `og_revenue_events` / `finance_docs` | Expenses, income, seeded docs | `finances-tracker`, `revenue` | 6 pages | 2.9.1 |
| `og_pf_documents` | Private fostering uploads | `private-fostering-documents.html` (local writer) | aggregator | 8.4 |
| `og_alert_settings` | Warning threshold, consent level | `notification-edit.html` | `generateComplianceAlerts()` | — |
| `og_custom_notifs` | User-defined alerts | `notification-create.html` | `notifications.html` | — |

**No store exists for:** organisation profile, insurance, ICO registration, complaints, audit log, handbooks, codes of conduct, job descriptions, interview notes, barred-list checks, transport firms, AEGIS notifications.

### 6.2 Static pages with no data calls (63 of 179)

**Consequential — these should be wired or removed:**
`admin-dashboard.html` · `compliance.html` · `compliance-edit.html` · `audit-log.html` · `reporting-dashboard.html` · `low-level-concern-create.html` · `low-level-concerns.html` · `concern-case.html` · `concern-close.html` · `concern-escalation.html` · `induction-checklist.html` · `induction-create.html` · `parent-consent-update.html` · `reference.html` · `student-archive.html` · `student_academics.html` · `exeat-calendar.html` · `exeat-approval.html` · `handoff-record.html`

**Dead duplicates of working flows — retire:**
`homestay-accident.html` · `homestay-accident-create.html` · `homestay-assessment.html` · `homestay-assessment-create.html` · `homestay-visit-create.html` · `homestay-approve.html` · `homestay-edit.html` · `homestay-delete.html` · `homestay-archive.html`

**Benign — confirmation and validation screens:**
`*-success.html` (12) · `*-validation.html` (4) · `*-delete.html` (4) · `login.html` · `password-reset-*.html` · `account-lockout.html` · `first-login-setup.html` · `user-invite*.html` · `user-role-edit.html` · `document-*.html` (5) · `travel-edit.html` · `vat-reclamation.html` · `finances-archived.html` · `compliance-delete-blocked.html` · `student-edit-error.html` · `student-delete.html`

**Loads `db.js` but makes no data call:** `driver-compliance.html` (uses `getDriverById` directly — fine) · `notification-create.html` · `parent-liaison.html` · `school-directory.html` · `homestay-profile.html` (26-line redirect — intentional)

### 6.3 Standards fully met (18 sub-standards)

2.1.1 · 2.2.1 · 2.2.2 · 2.2.3 · 2.2.4 · 2.6.2 · 2.6.3 · 2.7.5 · 2.8.2 · 2.8.8 · 2.8.9 · 2.9.2 · 3.2.1 · 3.2.2 · 3.3.1 · 3.3.2 · 3.3.3 · 3.3.4 · 3.4.1 · 3.4.4 · 5.2.1 · 5.2.2 · 5.3.1 · 5.4.1 · 5.5.1.1 · 5.5.1.3–5.5.1.9 · 5.9.1 · 5.10.1.1 · 5.10.1.2 · 5.10.2 · 5.10.3 · 6.2.1 · 6.2.2 · 6.2.7 · 6.3.1 · 6.3.2 · 6.3.3 · 6.6.4 · 8.1–8.5 · 9.1 · 9.4 · 9.6 · 10.1 · 10.2 · 10.3

### 6.4 Standards not met at all (0–15%)

1.1 · 1.2 · 2.1.2 · 2.1.3 · 2.1.4 · 2.1.6 · 2.1.7 · 2.1.9 · 2.3.1 · 2.3.2 · 2.3.3 · 2.4.1 · 2.4.2 · 2.7.2 · 2.7.4 · 2.7.6 · 2.8.1 · 2.8.3 · 2.8.7 · 2.8.11 · 2.11.1 · 3.1.1 · 3.1.3 · 3.4.3 · 4.3 · 5.5.4 · 5.5.8 · 5.11.1 · 5.12.1 · 6.2.3 · 6.2.4 · 6.2.5 · 6.2.6 · 6.4.1 · 6.4.2 · 6.4.3 · 6.5.3 · 6.5.4 · 6.6.1 · 6.6.2 · 6.7.2 · 6.7.4 · 6.8.1 · 6.9.1 · 6.9.2 · 7.1 · 7.2 · 7.3 · 9.2 · 9.8 · 9.9

### 6.5 Resolved since the 25 June 2026 review

| June finding | Status |
|---|---|
| **D1** — Document aggregator ignores staff, parent and private-fostering uploads | ✅ **Resolved** — all three sources added to `aggregateDocuments()` |
| **D2** — Compliance documents never appear in the document library | ✅ **Resolved** — `emitComplianceDocs()` walks all `compliance.*Path` fields, including host gas safety and self-declaration |
| **D3** — Two parallel Homestay/Host systems | ✅ **Largely resolved** — `homestay-profile.html` is now a redirect to `host-profile.html`; the thin cluster's remaining pages are dead stubs that should be deleted |
| **D4** — Concerns not attached to their subject | ✅ **Resolved** — `subjectId` added, `getConcernsForPerson()` implemented and consumed by `host-profile.html` and `student-profile.html` |
| **D5** — Uploading a document doesn't clear the matching alert | ✅ **Resolved** by D2 |
| **D6** — `documents.html` hub is static | ✅ **Resolved** — now calls `aggregateDocuments()` |
| **D7** — Root `index.html` hardcoded absolute redirect | ✅ **Resolved** — now `old_version/admin-dashboard.html` |
| **C3** — Schools ↔ students | ⚠️ **Partial** — `schoolId` and `getStudentsForSchool()` added to `db.js`, but `school-profile.html` still doesn't render either |
| **C4** — Parents: one source of truth | ❌ **Open** — `student.parent1*` and `og_parents` still duplicate |
| **C2** — Finance ↔ people by ID | ❌ **Open** — `finance_docs` still keys on name strings |
| **C5** — Exeats ↔ transports ↔ placements | ❌ **Open** — three parallel logistics stores remain |

---

*Oxford Guardians Platform — AEGIS Architecture & Compliance Review · Generated 7 August 2026 · Based on a full read of `old_version/assets/db.js` (3,973 lines) and all 179 HTML pages in `old_version/`, assessed against the AEGIS Accreditation Handbook & Guardianship Organisation Quality Standards, September 2025. This is a prototype-stage assessment. Scores reflect implementation state, not the organisation's actual operational compliance — a standard scored NOT MET here may well be satisfied by processes and paperwork held outside the platform.*
