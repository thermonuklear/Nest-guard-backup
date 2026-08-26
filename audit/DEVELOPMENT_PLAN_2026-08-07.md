# Development Plan — Build Sequence to AEGIS Readiness

**Oxford Guardians Platform** · Prepared 7 August 2026
**Basis:** `AEGIS_Architecture_Review_2026-08-07.md` (59% weighted, "Data Unseeded" scored as complete)
**Constraints applied:** database security and certification are sequenced last; policy content is slotted in once every place that holds it exists.

---

## How this plan is ordered

Not by compliance gain. By **dependency** — what must be true before the next thing can be built or verified.

Four rules govern the sequence:

1. **Instruments before work.** The dashboard and alert engine are how you verify every later stage. While they display hardcoded fiction, you cannot tell whether anything you build actually works. They come first.
2. **Central plumbing before features.** The alert engine and the audit interceptor are single choke points in `db.js`. Every store added afterwards inherits them for free. Added later, each one costs a pass over every store that now exists.
3. **Containers before content.** Policies do not slot into a store alone — they slot into a store *plus* a category, *plus* a required-doc manifest, *plus* an acknowledgement record, *plus* a public surface. Stage 3 builds all of it and ends with a single paste-in milestone.
4. **Facts before enforcement.** A rule can only be enforced on a field that exists. Enforcement follows schema.

Security and certification sit at Stages 9 and 10 per your instruction. One deliberate exception is flagged in Stage 1.

---

## Dependency map

```
Stage 0  Trustworthy instruments ─┬─────────────────────────────────────────┐
                                  │                                         │
Stage 1  Central plumbing ────────┼── alert engine ── audit interceptor ─────┤
                                  │        │                  │             │
Stage 2  Organisation entity ─────┘        │                  │             │
              │                            │                  │             │
Stage 3  POLICY SLOT-IN GATE ◀─────────────┘                  │             │
              │  (categories · manifest · acknowledgement ·   │             │
              │   public view · review alerting)              │             │
              │                                               │             │
              ├──▶ ★ DROP IN YOUR 14 POLICIES + 3 HANDBOOKS   │             │
              │                                               │             │
Stage 4  Complaints + AEGIS notifications ◀─────────────────── ┘             │
                                                                            │
Stage 5  Safer-recruitment schema ──────────────────────────────────────────┤
              │                                                             │
Stage 6  Enforcement (needs Stage 5 fields) ◀───────────────────────────────┤
                                                                            │
Stage 7  Conduct & liaison (needs Stage 3 acknowledgement machinery) ◀───────┘
              │
Stage 8  Data seeding pass
              │
Stage 9  Security ── LAST
              │
Stage 10 Certification prep ── LAST
```

---

## Stage 0 — Make the instruments trustworthy

**~2–3 days · no new schema · pure wiring**

Everything downstream is verified by looking at the dashboard and the notifications page. Today both lie. This stage is not "quick wins" — it is the precondition for being able to tell whether Stages 1–10 worked.

| # | Task | Files | Notes |
|---|---|---|---|
| 0.1 | Replace hardcoded metrics with `generateComplianceAlerts()` output | `admin-dashboard.html` | Page has **no `<script>` tag at all**. Shows "28 students" (DB has 6), "11 homestays" (DB has 2). ~60 lines. |
| 0.2 | Same for the AEGIS Control Room | `compliance.html` | Static DBS tracker names *Margaret Ellis* / *Catherine Brennan* — neither exists in `og_hosts`. |
| 0.3 | Fix always-100% issuance bug | `assets/db.js:3812–3814` | `s.emergencyNumberIssued \|\| s.id` is always truthy. `schoolsCount`/`schoolsIssued` hardcoded 5/5. 3 lines. |
| 0.4 | Wire concern create/triage/close to `saveConcern()` | `low-level-concern-create.html`, `concern-case.html`, `concern-close.html`, `concern-escalation.html` | Save controls are `<a href>` links. `saveConcern()` + `generateConcernId()` already work — called successfully from 3 other pages. ~40 lines. |
| 0.5 | Render enrolled students and logs on the school page | `school-profile.html` | Currently renders only `service-list`. `getStudentsForSchool()` and `getSchoolLogs()` both exist and are exported. ~30 lines. |
| 0.6 | Populate SCR `DOB` and `Self-dec` columns | `scr-hosts.html:217`, `scr-staff.html`, `scr-drivers.html` | Both hardcoded to `—` despite `selfDeclarationDocPath` existing. |
| 0.7 | Fix branding leak | 6 files, 13 occurrences | "Nest Guardians" appears inside AEGIS checklist labels in `homestay-visit-report.html` and `homestay-hs-checklist.html`. |
| 0.8 | Retire dead stubs | `homestay-accident*.html`, `homestay-assessment*.html`, `homestay-visit-create.html`, `homestay-approve/-edit/-delete/-archive.html` | 9 static duplicates of working flows. |
| 0.9 | Promote `old_version/` → repository root | whole tree | `git mv old_version/* .` then fix `index.html:602`. Do it now — every later stage makes the diff larger. |

**Exit criterion:** open `admin-dashboard.html` and every number on it traces to a record in `localStorage`.

---

## Stage 1 — Central plumbing

**~3–4 days · changes concentrated in `db.js`**

| # | Task | Detail |
|---|---|---|
| 1.1 | Extend `generateComplianceAlerts()` with its nine blind spots | Overdue policy reviews (`og_org_documents[].reviewDate`), overdue annual homestay visits (`getHostInPersonVisitStatus()`), failed H&S checklist items (`og_hs_checklists[].items`), host over capacity, PF LA notification inside 42 days, overdue day-student welfare checks, expiring/absent contracts, driver safeguarding expiry. **All computable from data already held.** ~80 lines, one function. |
| 1.2 | Add `og_audit_log` + a write interceptor in `db.js` | Wrap the `save*` functions once. Record `{ store, recordId, action, changedBy, changedAt, before, after }`. Wire `audit-log.html` to it. |
| 1.3 | Collapse the four duplicated representations | DBS (top-level vs `compliance.*` — Eleanor Ashworth currently displays a clear DBS *and* raises a critical "No DBS on file"); staff training (record strings vs completions store — Priya Shah is `Safeguarding Awareness` on her record but "DSL Level 3" in the emergency plan); annual safeguarding update; parent contact (`student.parent1*` vs `og_parents`). Derive display from the compliance/completions source. |
| 1.4 | Resolve leftover June findings | C2 (`finance_docs` keys people by name string), C5 (three parallel logistics stores). |

> **Judgement call on 1.2 — audit log placed early despite "security last".**
> An audit trail is Standard **2.5.1 record keeping**, not access control. It is also a single choke point: added now, every store built in Stages 2–7 is audited automatically; added at Stage 9, it means a pass back over six new stores and ~100 write sites. The *access-control layer over* the audit log stays in Stage 9. **Move it to Stage 9 if you'd rather hold the line strictly — the cost is roughly a day of rework.**

**Exit criterion:** `notifications.html` surfaces an alert for every category in the table above, and every write leaves an audit row.

---

## Stage 2 — The organisation entity

**~2–3 days · smallest store, largest standard coverage**

`db.js` models people, places and events but never the organisation itself. Six sub-standards fail for that single reason.

| Build | Unlocks |
|---|---|
| `og_organisation` singleton + `organisation-profile.html` | — |
| ICO registration number, named data controller | 2.7.2 |
| Insurance policies — PI, public liability, employer's liability — with renewal dates fed into the Stage 1 alert engine | 2.4.1 |
| Statement of aims, principles and practice; publicity/brochure register | 1.1, 1.2 |
| Company organogram | 2.1.1 (Appendix A artefact) |
| AEGIS accreditation level, award date, expiry, re-inspection due | Certification prep (Stage 10) |
| Significant-changes log with a 14-day clock | 2.11.1 |

Depends on Stage 1 for the audit interceptor (the significant-changes log is largely a filtered audit view) and the alert engine (insurance renewals).

---

## Stage 3 — ★ The policy slot-in gate

**~4–5 days · this is the milestone you asked for**

Your policies are written. They cannot simply be pasted into `og_org_documents` today, because AEGIS does not only require a policy to *exist* — 6.1.1 requires a copy be **provided to all staff, homestays and volunteers** and be **publicly available**; 6.7.2 and 2.1.6 say the same for the missing-student policy and codes of conduct. None of that machinery exists. Five things must be built before content lands.

### 3a · Extend the category set
Categories are hardcoded in **six places**. Currently four; you need at least six.

| Location | What's hardcoded |
|---|---|
| `policy-viewer.html:143–158` | Four `nav-folder` anchors (`nav-cat-cg`, `-dp`, `-sg`, `-wce`) |
| `policy-viewer.html:219` | Four `<option>` values in the create form |
| `policy-viewer.html:362` | The `CATEGORIES` array |
| `policy-viewer.html:418–424` | Per-category count vars (`countCG` etc.) and their `count-*` element writes |
| `policy-viewer.html:445` | Category branches in the render switch |
| `assets/db.js:2223` | `generateOrgDocId()`'s four-way category→prefix map (`POL-CG-`, `-DP-`, `-SG-`, `-WCE-`) |

Add **Governance & aims** (`POL-GA-`) and **Handbooks** (`HBK-`). Better: drive all six from one exported `POLICY_CATEGORIES` constant in `db.js` so a seventh category is a one-line change.

### 3b · Required-policy manifest
Seed ~17 placeholder records with `status: 'Missing'`, `standardRef`, `isMandatory`, `appendixRef`:

| Document | Standard |
|---|---|
| Statement of aims, principles and practice | 1.1 |
| Safeguarding & Child Protection Policy | 6.1 / Appendix 4 (24 content items) |
| Safer Recruitment Policy | 2.8.1 |
| Whistleblowing Policy | 6.4 (must carry NSPCC 0800 028 0285 + Protect 020 3117 2520) |
| Low-Level Concerns Policy | 6.5.2 |
| Data Protection Policy & Privacy Notice | 2.7.3 |
| Missing Student Policy | 6.7 |
| Anti-Bullying incl. Cyberbullying | 6.9 |
| Online Safety Policy | 6.10 |
| Anti-Radicalisation / Prevent Duty Policy | 6.6 |
| Complaints Policy | 7.1 |
| Welfare Health & Safety Policy | 5.10.1 |
| Emergency Procedure | 2.6 ✅ *seeded* |
| Mental Health Policy | 3.3 / Appendix 12 ✅ *seeded* |
| Staff & Homestay Code of Conduct | 2.1.6, 5.8.2 / Appendix 6 (21 items) |
| Student Behaviour Code of Conduct | 6.8 (11 required areas) |
| Student / Parent / Homestay Handbooks | 2.3 / Appendices 1 (20 items), 2 (14), 3 (27) |

This converts an empty category from *"nothing uploaded yet"* into *"you are missing a statutory document"*, and makes Stage 1's review alerting meaningful.

### 3c · Issue & acknowledgement tracking
**Zero exists today.** Add `og_policy_acknowledgements` keyed `{ docId, personId, personType, issuedDate, acknowledgedDate, version }`. Surface as a coverage panel per policy and a row on staff/host profiles. Without this, 6.1.1 stays PARTIALLY MET however good the content is.

### 3d · Public policy surface
2.7.3, 6.1.1 and 7.1 all require public availability. Build a read-only view filtered to `isPublic: true` — **not** the admin page with its create/edit/archive controls. (This is the legitimate version of the root `policy-viewer.html` that was deleted as a duplicate.) Fix the `href="#"` privacy link in root `index.html:569`.

### 3e · Handbook content checklists
Appendices 1–3 enumerate 20/14/27 required content items. Model them as per-handbook checklists so completeness is visible rather than asserted.

> ### ★ Milestone: drop in your policies
> With 3a–3e done, paste in the 14 policies and 3 handbooks. That single act moves **1.1, 2.3, 2.7.3, 2.8.1, 5.10.1, 6.1, 6.4, 6.5.2, 6.6, 6.7, 6.8, 6.9, 6.10 and 7.1** — the largest compliance jump available in the whole plan, and the reason this stage sits before Stages 4–7 rather than after.

---

## Stage 4 — Complaints register & AEGIS notifications

**~3–4 days**

| Build | Detail |
|---|---|
| `og_complaints` + `complaints.html` | Standard 7 is the only standard with **no infrastructure whatsoever**. `og_concerns` is not a substitute — different lifecycle, different parties (parents, homestays, schools, agents), different outcomes. Needs: complainant type and identity, date received, stage (informal / formal / AEGIS panel per Appendix 8), description, handler, actions taken, outcome (upheld / partly / not upheld), closed date, timeliness clock. 7.3 requires the record **regardless of whether upheld**. |
| `og_aegis_notifications` | 2.11.1 significant changes (14-day clock) and 6.5.3 safeguarding self-report. Also 2.7.6 AEGIS-disclosure consent. |
| Staff/homestay self-report route | 6.5.4 — needs a process to record and manage. |

Sequenced after Stage 3 because the complaints register references the Complaints Policy, and the self-report route references the Code of Conduct.

---

## Stage 5 — Safer-recruitment schema completeness

**~1 week · densest remaining code gap**

| # | Build | Standard |
|---|---|---|
| 5.1 | **`householdMembers[].compliance`** + `checkPerson()` iterating every member aged ≥16 | **5.1.3 — blocker B6.** Today `householdMembers[]` has no DBS field at all; the only trace is a free-text `secondaryAdultDbs` string. In a three-adult household, two adults are invisible to the compliance engine. |
| 5.2 | `barredListCheckDate`, `dbsWrittenPermissionDate` | 2.8.6 — the SCR currently *derives* "Barred list" from `dbsStatus === 'clear'`, reporting a check that was never performed |
| 5.3 | `rightToWorkCheckedDate` | 2.8.10 — the standard's explicit ask is the check date; only an expiry is stored |
| 5.4 | `onlineSearchDate` + `onlineSearchNotes` | 2.8.11 |
| 5.5 | `dbsDisclosureRiskAssessmentPath` + outcome + decision-maker, gated on `dbsStatus !== 'clear'` | 2.8.7 |
| 5.6 | Structured referee metadata — name, relationship, known-since date, employer flag, not-related attestation, verification call log, discrepancy note | 2.8.4 — today only a file path; none of the qualifying conditions are modelled |
| 5.7 | `og_interviews` keyed to `personId` — date, panel members, notes, outcome | 2.8.3, 2.1.5 |
| 5.8 | Structured Appendix 5 self-declaration (11 questions) + `selfDeclarationDate` + annual re-declaration cycle | 5.1.2 |
| 5.9 | Real induction records; wire `induction-checklist.html` / `induction-create.html`; **fix the mislabelled SCR "Induction" column** (`scr-hosts.html:218` renders safeguarding training) | 2.1.4 |
| 5.10 | `settledStatusEvidencePath` + verification date + verifier | 2.1.8, 5.1.1 — a boolean is not "evidence viewed and recorded" |
| 5.11 | `schoolIndependenceConfirmed`; `jobDescriptionDocPath` | 2.1.2, 2.1.3 |

Runs after Stage 1's deduplication so new fields are added to one canonical representation, not two.

---

## Stage 6 — Enforcement

**~4–5 days · turns recorded facts into rules**

`homestay-create.html` calls `savePlacement()` with **zero validation** — no capacity check, no visit check, nothing.

| # | Rule to enforce | Standard | Data source |
|---|---|---|---|
| 6.1 | Max 3 students per homestay; block the 4th | 5.5.2 | `capacityCurrent` / `capacityMax` |
| 6.2 | Include students placed by other organisations in the cap | 5.5.3 | new `externalStudentsHosted` |
| 6.3 | No under-16 alongside an over-20 | 5.5.5 | `student.dob` across `host.linkedStudents` — derivable today, never derived |
| 6.4 | Block placement where no approved in-person visit is current | 5.10.1.1 | `getHostInPersonVisitStatus()` already returns the blocking warning as advisory text |
| 6.5 | Block placement where `hasSpecialistCondition && !homestayConfirmedCompetent` | 3.4.4 | `medicalPlacementGate` |
| 6.6 | Surface the contract-activation block in the UI | 2.2.3 | `saveContract()` only `console.warn`s today |
| 6.7 | `og_transport_firms` — written DBS confirmation, date, review cycle; `firmId` on transports | 4.3 | Appendix A explicitly requires this evidence |
| 6.8 | `student.heightCm` + child-seat check at booking against `driver.childSeat` | 4.4 | age derivable from `dob`; the two facts never meet today |
| 6.9 | Per-student school service confirmations with academic-year issue tracking | 9.3 | — |
| 6.10 | Named coordinator per school + cover notification | 9.8 | — |
| 6.11 | Guardianship-ended offboarding requiring a school notification before archive | 9.9 | `student-archive.html` is static |

---

## Stage 7 — Conduct, training and liaison

**~3–4 days · consumes Stage 3's acknowledgement machinery**

| Build | Standard |
|---|---|
| Code of conduct issue + acknowledgement for staff and homestays | 2.1.6, 5.8.2, 5.8.3, 5.8.4 |
| Staff sufficiency analytics — mirror `getHomestaySupplyAnalytics()` for coordinator caseload | 2.1.9 |
| School DSL contact fields + `contactRole` on school logs | 6.2.4 |
| `og_external_referrals` — LSP and LADO contacts, referral records, inter-agency log | 6.2.5 |
| `isLiveTraining` flag on DSL courses (AEGIS rejects non-live DSL training) | 6.2.2 |
| Run `checkTrainingRequirements()` for **drivers** (currently staff + hosts only, so driver safeguarding expiry is unenforced) | 6.3.1 |
| Homestay AEGIS-inspection cooperation acknowledgement | 5.11.1 |
| `hostSource` (own / third-party) gating approval | 5.12.1 |
| Home insurance awareness + `hostDrivesStudents` / vehicle insurance declaration | 2.4.2, 2.4.3 |
| Pre-arrival pack, virtual meeting record, `introductory-meeting` welfare log type | 3.1.1, 3.1.2, 3.1.3 |
| Wire `parent-consent-update.html` (static today) | 3.4.2 |
| Standing `hasCCTV` flag + ICO paper-trail field + ad hoc check schedule | 5.8.6 |
| NSPCC home-alone items on the visit report | 5.5.8 |

---

## Stage 8 — Data seeding pass

**~2–3 days · content, not code**

Per §5 of the 7 August review. By this point every store exists and every field has a home.

- `og_contracts` — staff, parent, homestay, agent templates (seeds empty today via `v2-empty`)
- `og_visit_reports` + `og_hs_checklists` — backfill existing hosts so warning alerts clear legitimately
- `og_training_completions` — staff and homestay training history
- `og_school_logs` + `og_parent_logs` — historical liaison
- `og_transports` + `og_travel_todos` — demonstrate the travel workflow
- Compliance fields — `dbsCertificatePath`, `idDocumentPath`, `student.health.*` currently empty strings, which is why `notifications.html` shows a wall of alerts
- The organisation profile from Stage 2

---

## Stage 9 — Security *(last, per instruction)*

**~2–4 weeks**

| Build | Standard |
|---|---|
| Real authentication — `login.html` performs no credential check today and any page is reachable directly | 2.7.4 |
| Role-based access control enforced in code; `og_staff.role` exists and pages describe boundaries in prose, but nothing enforces them | 2.7.4 |
| DSL-and-senior-management-only gating on `og_concerns`, `og_mh_cases`, `og_mh_comms`, `og_mh_removals` | **6.2.6** — cannot be partially satisfied |
| Remove the unguarded `localStorage.clear()` control | 2.5.1 |
| Migrate off plaintext `localStorage` — IndexedDB or a backend — before any binary storage | 2.5.1, 3.4.3 |
| Encryption at rest | 3.4.3 |
| Access-control layer over the Stage 1 audit log | 2.7.4 |

> `host.profilePhoto` already stores base64 SVG data URIs inline in `og_hosts`. Small today, but the pattern is set — the moment real DBS or gas-safety PDFs are stored as data URLs, writes throw `QuotaExceededError`, which the `try/catch` blocks throughout `db.js` swallow silently. Data would vanish with no error shown. Keep binaries out until this stage lands.

---

## Stage 10 — Certification preparation *(last, per instruction)*

**~1 week**

| Build | Purpose |
|---|---|
| Appendix A evidence bundle export — all 30 required documents, assembled from the policy store, org profile, SCR and contracts | The actual submission artefact |
| Redaction / anonymisation mode | Appendix A: *"all documents containing personal detail must be redacted/anonymised"* |
| SCR export (Appendix 7 format) | Safer recruitment evidence |
| Gold Standard contact-list templates for homestays and partner schools, with the 2.7.6 consent flag from Stage 4 | Gold Standard inspection |
| Password-protected export | Appendix A recommendation |
| Annual Declaration report — student statistics + DBS confirmation | Continued membership |

---

## Summary

| Stage | Focus | Est. | Gate |
|---|---|---|---|
| 0 | Trustworthy instruments | 2–3 d | Dashboard shows real data |
| 1 | Central plumbing | 3–4 d | Alerts cover all categories; writes audited |
| 2 | Organisation entity | 2–3 d | Org profile complete |
| **3** | **Policy slot-in gate** | **4–5 d** | **★ Paste in your policies** |
| 4 | Complaints + AEGIS notifications | 3–4 d | Standard 7 has infrastructure |
| 5 | Safer-recruitment schema | 1 w | Every 16+ household member tracked |
| 6 | Enforcement | 4–5 d | Placement rules block, not warn |
| 7 | Conduct, training, liaison | 3–4 d | Acknowledgement coverage visible |
| 8 | Data seeding | 2–3 d | Alert wall clears legitimately |
| 9 | Security | 2–4 w | Auth, RBAC, off localStorage |
| 10 | Certification prep | 1 w | Appendix A bundle exports |

**Stages 0–3 (~2.5 weeks) deliver the largest single jump**, because Stage 3 ends with your existing policy content landing against complete infrastructure. Stages 0–8 bring the platform to functional AEGIS coverage; Stages 9–10 make it defensible in an actual inspection.

### Three judgement calls flagged for your decision

1. **Audit interceptor in Stage 1, not Stage 9** — it is record-keeping (2.5.1) and a single choke point. Deferring costs ~1 day of rework across six later stores.
2. **`old_version/` → root promotion in Stage 0** — it only gets more expensive as the diff grows.
3. **Policies cannot fully land on content alone** — without 3c (acknowledgement) and 3d (public surface), 6.1.1 stays PARTIALLY MET no matter how complete the documents are. That is why Stage 3 is five sub-tasks rather than a paste.
