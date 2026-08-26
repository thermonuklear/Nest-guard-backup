# AEGIS Missing-Items Worklist — Sections Scoring Over 30%

**Source:** `audit/AEGIS_Percentile_Audit_2026-07-27.pdf` (AEGIS Percentile Compliance Audit, 27 July 2026)
**Generated:** 30 July 2026
**Platform baseline:** commit `9f51336` ("fixed file architecture"); live application is `old_version/` + `old_version/assets/db.js`

---

## Scope & Selection Rule

The audit scores **43 sections** across 10 standards (headline: 33.7%, the unweighted mean of all 43). This worklist isolates every section scoring **strictly over 30%** — **20 of 43 sections** — and lists exhaustively everything the audit marks as missing, incomplete, unstructured, unwired or unpersisted within them.

| # | Section | Score |
|---|---------|-------|
| 1 | 5.9 Homestay annual training | 90% |
| 2 | 5.11 Visits and inspections | 85% |
| 3 | 2.9 Finance | 82.5% |
| 4 | 3.2 Student wellbeing | 75% |
| 5 | 5.10 Homestay H&S and annual visit | 72% |
| 6 | 8 Day students & private fostering | 69% |
| 7 | 6.3 Safeguarding training | 68.3% |
| 8 | 10 Liaison with parents | 66.7% |
| 9 | 3.3 Mental health | 65.3% |
| 10 | 2.6 Emergency procedures | 58% |
| 11 | 5.2 Homestay information | 58% |
| 12 | 5.3 Homestay profile | 55% |
| 13 | 3.4 Student information | 52.5% |
| 14 | 5.4 Availability of homestays | 50% |
| 15 | 4 Travel arrangements | 47.5% |
| 16 | 6.2 Designated Safeguarding Lead | 46.4% |
| 17 | 9 Liaison with partner schools | 46.1% |
| 18 | 2.1 Staff, volunteers & homestays | 42.5% |
| 19 | 5.1 Homestay checks | 40% |
| 20 | 2.8 Safer recruitment | 33.6% |

Three appendix score-tables sit above 30% and are folded into their parent sections: **Appendix 13** (88%, under 3.4), **Appendix 11** (81%, under 3.3), **Appendix 7** (42%, under 2.8).

**Boundary cases deliberately excluded** (scored *at* 30%, not strictly over): **2.7 Information sharing & data protection** (30%), **6.10 Online safety** (30%), **Appendix 5 Homestay Self-Declaration** (30%). The 23 sections scoring 30% or below are listed in [Appendix B](#appendix-b--sections-excluded-by-the-30-filter) so nothing is silently dropped.

---

## Part 1 — Missing Fields / Data Models

### 2.1 Staff, Volunteers & Homestays (42.5%)

- [ ] **2.1.2** — Independence / conflict-of-interest declaration field on staff records (absent entirely)
- [ ] **2.1.2** — Independence / conflict-of-interest declaration field on host records (absent entirely)
- [ ] **2.1.3** — Job-description document store (no store of any kind)
- [ ] **2.1.3** — Reporting-line field per staff record
- [ ] **2.1.3** — Stated safeguarding responsibility per role (`primaryWork` free-text only)
- [ ] **2.1.5** — Interview-notes record for appointments
- [ ] **2.1.5** — British citizenship / settled-status *evidence* field (only an `isCitizen` boolean; no evidence viewed, no date)
- [ ] **2.1.6** — Code-of-conduct document store (staff, coordinators, volunteers, homestays)
- [ ] **2.1.6** — Representation of the 21 Appendix 6 code-of-conduct topics (none present)
- [ ] **2.1.8** — Full-time UK residency field (`isCitizen` / `worksOutsideUK` booleans only)
- [ ] **2.1.8** — Settled-status evidence upload
- [ ] **2.1.8** — "Date viewed" field for settled-status evidence
- [ ] **2.1.9** — Guardian-to-student ratio / caseload count / capacity metric to evidence sufficiency

### 2.6 Emergency Procedures (58%)

- [ ] **2.6.1** — Field evidencing the 24-hour number was *issued* to students, parents, homestays and schools
- [ ] **2.6.2** — Emergency plan document (the plan itself, as a stored record)
- [ ] **2.6.2** — Named responsible person per emergency scenario
- [ ] **2.6.3** — Explicit lone-working / emergency-cover-arrangement record

### 2.8 Safer Recruitment (33.6%) — incl. Appendix 7 (42%)

- [ ] **2.8.1** — Safer-recruitment policy store and policy record (Appendix A essential submission document)
- [ ] **2.8.2** — Safer-recruitment training *type* on staff records (only safeguarding is typed)
- [ ] **2.8.2** — Training provider field
- [ ] **2.8.2** — Training certificate field for safer-recruitment training
- [ ] **2.8.3** — Interview-note record for staff and homestay interviews (hosts hold only a one-line `safeRecruitment` summary)
- [ ] **2.8.3** — Interview date, panel composition and questions asked
- [ ] **2.8.4** — Referee name and relationship to applicant
- [ ] **2.8.4** — "Known for 2+ years" confirmation flag
- [ ] **2.8.4** — Employer / professional referee flag
- [ ] **2.8.4** — Reference verification date
- [ ] **2.8.4** — Log of any clarifying call where discrepancies were followed up
- [ ] **2.8.4** — Reference retention period
- [ ] **2.8.5** — Per-member DBS fields on household members 16+: number, level, issue date, certificate (only a free-text `secondaryAdultDbs` string exists)
- [ ] **2.8.6** — Barred-list check as a *separate* field, with its own date and checker (currently derived from `person.dbsStatus === 'clear'`)
- [ ] **2.8.6** — Written-permission-before-DBS record
- [ ] **2.8.6** — DBS Update Service online-check log
- [ ] **2.8.7** — Conviction-disclosure field
- [ ] **2.8.7** — Written risk-assessment record where a DBS discloses a conviction
- [ ] **2.8.7** — Representation of the UKVI criminal-conviction refusal criteria
- [ ] **2.8.8** — Country lived/worked in abroad
- [ ] **2.8.8** — Dates abroad
- [ ] **2.8.8** — Fallback record where no overseas check is obtainable (extra reference + risk assessment)
- [ ] **2.8.9** — Identity document *type* seen (passport vs. birth certificate) — path only today
- [ ] **2.8.9** — Permission-to-retain-a-copy field
- [ ] **2.8.10** — Date the right-to-work check took place (the specific thing 2.8.10 asks to record)
- [ ] **2.8.11** — Online-search due-diligence record: date and outcome fields
- [ ] **Appendix 7** — Date of birth on the staff / host / driver schema (SCR column renders a hardcoded `—`)
- [ ] **Appendix 7** — Address surfaced as an SCR column (held on host/driver records, absent from the SCR)
- [ ] **Appendix 7** — ID check: which document type was seen (path only)
- [ ] **Appendix 7** — ID documents seen: date and initials of receiver (not captured)
- [ ] **Appendix 7** — DBS disclosure *level* stored rather than hardcoded "Enhanced"
- [ ] **Appendix 7** — "Original certificate viewed by" field (column currently shows the certificate path)
- [ ] **Appendix 7** — Date barred-list check undertaken
- [ ] **Appendix 7** — Name of checker for the barred-list check
- [ ] **Appendix 7** — What right-to-work evidence was provided (evidence type, not just path)
- [ ] **Appendix 7** — Name of checker and date for right to work
- [ ] **Appendix 7** — Evidence of British citizenship / settled status + date (`isCitizen` boolean only)
- [ ] **Appendix 7** — Overseas check: date received/verified and initials (path only)
- [ ] **Appendix 7** — References: dates received/verified and initials (two paths, no dates or initials)
- [ ] **Appendix 7** — SCR "Notes" column (does not exist)

### 3.3 Mental Health (65.3%) — incl. Appendix 11 (81%)

- [ ] **3.3.2** — Appendix 10 external support / agency directory, accessible to staff
- [ ] **3.3.4** — Structured risk-assessment fields for pre-guardianship risk (currently a document upload only: `riskAssessmentFile` + `riskAssessmentExpiryDate`)
- [ ] **Appendix 11** — "Copy of relevant policies attached" field on the student removal form
- [ ] **Appendix 11** — "Position" field for the person completing the removal form
- [ ] **Appendix 11** — "Date completed" field on the removal form

### 3.4 Student Information (52.5%) — incl. Appendix 13 (88%)

- [ ] **3.4.1** — Last-reviewed date on the student record (annual-review element)
- [ ] **3.4.1** — Review-due flag on the student record
- [ ] **3.4.2** — Who granted each parental permission
- [ ] **3.4.2** — When each permission was granted
- [ ] **3.4.2** — Evidence by which each permission was granted
- [ ] **3.4.4** — Medicine administration record: per-dose date, time, dose and administered-by (an incident log is not a medicine administration record)
- [ ] **3.4.4** — Field recording that a homestay is trained and comfortable for asthma / diabetes / severe-allergy cases before placement
- [ ] **Appendix 13** — UK family contacts as six structured fields — relationship, names, addresses, telephone, email, occupations (a single free-text `ukFamilyContacts` textarea stands in)
- [ ] **Appendix 13** — Agent address
- [ ] **Appendix 13** — "Ongoing services provided to the student" as structured data (currently unstructured)
- [ ] **Appendix 13** — School tutor email
- [ ] **Appendix 13** — School tutor telephone
- [ ] **Appendix 13** — `tutorOrHouse` made editable in `student-create` / `student-edit` (written as `''` on creation; only present on seeded records)
- [ ] **Appendix 13** — Passport ID page / eVisa copy stored as the actual file, not a path (`legal.passportOrBRPPath`)

### 4 Travel Arrangements (47.5%)

- [ ] **4.3** — External transport-provider entity (no way to record a licensed taxi firm at all)
- [ ] **4.3** — Firm's written confirmation that enhanced DBS checks were done on its drivers (Appendix A essential submission item)
- [ ] **4.3** — Date that confirmation was obtained
- [ ] **4.4** — Structured child-seat / booster data (`driver.childSeat` is a free-text note)
- [ ] **4.4** — Student height field (needed for the under-135cm rule)
- [ ] **4.4** — Age-based child-seat requirement flag on the trip record

### 5.1 Homestay Checks (40%)

- [ ] **5.1.1** — Evidence upload for primary carer's British / settled status
- [ ] **5.1.1** — "Date viewed" for that evidence
- [ ] **5.1.1** — Checker identity for that evidence
- [ ] **5.1.2** — The eleven Appendix 5 declaration questions as structured answers (currently a file upload only)
- [ ] **5.1.2** — Per-household-member variant of the self-declaration
- [ ] **5.1.3** — Per-resident DBS fields on `householdMembers`: number, level, issue date, certificate (only free-text `secondaryAdultDbs` covers secondary adults)
- [ ] **5.1.3** — Flag distinguishing residents temporarily working or studying away
- [ ] **5.1.3** — `overnightVisitors` structured per visitor so 16+ DBS can be cross-checked

### 5.2 Homestay Information (58%)

- [ ] **5.2.1** — Gender per homestay member (named field, absent)
- [ ] **5.2.1** — Interests and hobbies per homestay member (named field, absent)
- [ ] **5.2.1** — Religion per homestay member (named field, absent)
- [ ] **5.2.1** — Smoker status — and if so, inside or outside the property (named field, absent; 5.5.1.8 also depends on it)
- [ ] **5.2.2** — Regular-visitor information structured per visitor, with an explicit overnight flag (currently `overnightVisitors` prose)

### 5.3 Homestay Profile (55%)

- [ ] **5.3.1** — Photograph on the host record itself (photos currently only reachable via the visit report)

### 5.4 Availability of Homestays (50%)

- [ ] **5.4.1** — Emergency-provision flag on the host record

### 5.10 Homestay H&S and Annual Visit (72%)

- [ ] **5.10.1** — Written health & safety policy record/store (Appendix A: Welfare Health and Safety Policy)
- [ ] **5.10.1.2** — Accident-book subject widened beyond students, so accidents to staff, homestay members and volunteers can be recorded
- [ ] **5.10.3** — "Changes since the last visit" field on the annual visit report

### 6.2 Designated Safeguarding Lead (46.4%)

- [ ] **6.2.2** — Flag that DSL training course was *live* (the standard is explicit only live courses are acceptable)
- [ ] **6.2.2** — DSL training provider
- [ ] **6.2.2** — DSL training certificate
- [ ] **6.2.3** — UK residency field for the DSL (only `isCitizen`; a second staff member is `worksOutsideUK: true`, so residency is a live distinction the schema cannot express)
- [ ] **6.2.4** — Contacts on the school record (holds only `id`, `name` and a `services` object)
- [ ] **6.2.4** — Named safeguarding counterpart per partner school
- [ ] **6.2.5** — Local Safeguarding Partnership referral record
- [ ] **6.2.5** — Inter-agency correspondence log
- [ ] **6.2.5** — Referral outcome tracking
- [ ] **6.2.5** — LADO contacts held as data rather than static copy on `emergency-procedures.html`
- [ ] **6.2.6** — Correspondence attachment on safeguarding cases (children's services, police)
- [ ] **6.2.7** — Deputy-DSL designation field (cover exists in substance but is inferred, not evidenced)

### 6.3 Safeguarding Training (68.3%)

- [ ] **6.3.2** — Safeguarding training *expiry* field on host records (they hold `safeguardingTrainingDate` only, so the record cannot show when training lapses)
- [ ] **6.3.2** — Safeguarding training *expiry* field on driver records

### 8 Day Students, Prolonged Stays & Private Fostering (69%)

- [ ] **8.1** — Under-18-with-disability variant of the private-fostering trigger (not modelled)
- [ ] **8.3** — Record of *what was explained* at each stakeholder briefing (only that the briefing happened: `schoolBriefed`, `homestayBriefed`, `parentConsent`)
- [ ] **8.3** — Itemised LA visits-and-meetings expectation
- [ ] **8.4** — Information-sharing permission fields for student, agent, homestay and school (captured for parents only)
- [ ] **8.5** — Cumulative-days tracking for over-16 day students

### 9 Liaison with Partner Schools (46.1%)

- [ ] **9.1** — Per-family contact expectation ("in line with the requirements of the parents" is not captured)
- [ ] **9.2** — Site-visit notification contact type (contact type is free text)
- [ ] **9.2** — Scheduled-visit record
- [ ] **9.3** — Service confirmation held **per student** rather than per school
- [ ] **9.3** — Academic-year stamp on the service confirmation
- [ ] **9.7** — Visit type on the school log
- [ ] **9.7** — Attendee field on school visits
- [ ] **9.7** — Visit note distinct from a communication summary
- [ ] **9.8** — Named point of contact per school
- [ ] **9.8** — Cover designation when the named contact is unavailable

### 10 Liaison with Parents (66.7%)

- [ ] **10.2** — Field recording that each parent was given the 24-hour number
- [ ] **10.2** — Per-parent published emergency contact (the displayed line is static design copy)

---

## Part 2 — Missing Functionalities / Features

### 2.1 Staff, Volunteers & Homestays (42.5%)

- [ ] **2.1.1** — Organogram (named in Appendix A; the only gap in an otherwise 90% requirement)
- [ ] **2.1.2** — Cross-check of staff/host independence against `student.schoolId`
- [ ] **2.1.4** — Staff and volunteer induction that persists: `induction-checklist.html` and `induction-create.html` have no `db.js` and write nothing (homestay induction is complete)

### 2.6 Emergency Procedures (58%)

- [ ] **2.6.1** — Wire the parent-facing 24-hour number (it lives only in static copy on `parent-portal.html`)
- [ ] **2.6.2** — Replace static `emergency-protocols.html` with a persisted emergency plan

### 2.9 Finance (82.5%)

- [ ] **2.9.1** — Route `finances.html`, `finances-archived.html` and `vat-reclamation.html` through `db.js` instead of writing straight to `localStorage` (they sit outside the shared schema)
- [ ] **2.9.2** — Per-student running balance / ledger with receipts (finance events are linked to students but there is no ledger)

### 3.2 Student Wellbeing (75%)

- [ ] **3.2.1** — Check-in cadence rule and overdue-check-in alert
- [ ] **3.2.2** — Make the "Escalate to DSL concern" / "Escalate to low-level concern" outcomes on `welfare-note-create.html` actually create a concern record (currently recorded as text only) — this is the audit's finding #2 and a regression against the 22 June audit
- [ ] **3.2.3** — Wire `student-portal.html` (static, no `db.js`)
- [ ] **3.2.3** — Wire `student-concern-submit.html` (static, no `db.js`)

### 3.3 Mental Health (65.3%)

- [ ] **3.3.1** — Written mental-health support procedure and the Appendix 12 policy (the workflow is real; the documents are not)
- [ ] **3.3.2** — DSL-escalation step wired from the mental-health case
- [ ] **3.3.4** — Gate placement on a completed risk assessment, so "before agreeing to become their guardian" is enforced

### 3.4 Student Information (52.5%)

- [ ] **3.4.1** — Annual-review alert for student information (no review-due alerting today)
- [ ] **3.4.3** — Sharing controls / redaction on the host-facing profile
- [ ] **3.4.3** — Encrypted storage and access control for confidential student data *(cross-cutting — see Part 3)*

### 4 Travel Arrangements (47.5%)

- [ ] **4.1** — Share the travel record with the **student** (no route exists)
- [ ] **4.1** — Share the travel record with the **agent** (no route exists)
- [ ] **4.1** — Share the travel record with the **homestay** (no route exists)
- [ ] **4.2** — Block trip creation when neither student-level nor per-trip travel permission is present
- [ ] **4.4** — Validate that the assigned vehicle carries the right child seat for the assigned student
- [ ] **4.3** — *(advisory, excluded from the section average)* Permission-to-travel letter generation per Appendix 9 — the platform already proves it can do this via `private-fostering-notification.html` + jsPDF

### 5.1 Homestay Checks (40%)

- [ ] **5.1.2** — Annual repeat schedule for the household self-declaration
- [ ] **5.1.2** — Notify-on-change undertaking for the self-declaration
- [ ] **5.1.2** — Un-hardcode the SCR self-declaration column, which renders blank even though `selfDeclarationDocPath` / `selfDeclarationDate` are captured on `host-compliance-declaration.html` (audit finding #3; `scr-hosts`, `scr-staff`, `scr-drivers` lines 192 and 202)

### 5.3 Homestay Profile (55%)

- [ ] **5.3.1** — Shareable / exportable parent- and student-facing homestay profile (today it is an admin-only profile)
- [ ] **5.3.1** — Control over whether contact details are included when a profile is shared

### 5.4 Availability of Homestays (50%)

- [ ] **5.4.1** — Homestay availability calendar
- [ ] **5.4.1** — Measure of homestay supply against student numbers

### 5.9 Homestay Annual Training (90%)

- [ ] **5.9.1** — Due-date computation and overdue alert to drive the annual training cycle (the record is excellent; the reminder is manual)

### 5.10 Homestay H&S and Annual Visit (72%)

- [ ] **5.10.1.1** — Block placement creation until an initial in-person assessment visit exists
- [ ] **5.10.1.2** — Retire the static duplicates `homestay-accident.html` and `homestay-accident-create.html`
- [ ] **5.10.3** — Explicitly prompt for "changes since the last visit" in the annual review flow

### 5.11 Visits and Inspections (85%)

- [ ] **5.11.1** — Capture the AEGIS / statutory inspection co-operation undertaking **at application stage** specifically (currently captured at induction)

### 6.2 Designated Safeguarding Lead (46.4%)

- [ ] **6.2.6** — Role gate restricting `og_concerns` to the DSL and senior management — case narratives naming students, hosts and disclosures are readable by anyone with the browser open. *The audit calls this "the single most serious compliance failure".*

### 6.3 Safeguarding Training (68.3%)

- [ ] **6.3.1** — Three-year renewal computation for host and driver safeguarding training
- [ ] **6.3.1** — Pre-start gate so training is evidenced before a person begins
- [ ] **6.3.3** — Annual safeguarding-update tracking for staff (they have a three-year DSL cycle but no yearly refresh; homestays are fully covered via 5.9.1)

### 8 Day Students, Prolonged Stays & Private Fostering (69%)

- [ ] **8.1** — Automatic detection of a 28-day run by scanning `og_placements` / `og_exeats` (`isApplicable` is set by hand — precisely the "unexpected duration" risk the handbook warns about)
- [ ] **8.5** — Distinct monitoring cadence for over-16 day students
- [ ] **8.5** — Flag when a day student's homestay time grows

### 9 Liaison with Partner Schools (46.1%)

- [ ] **9.1** — Overdue-school-contact alert
- [ ] **9.2** — Confirmation that the school was told in advance of a site visit
- [ ] **9.3** — Generate and send written confirmation of contracted services (Appendix A asks for an example of one)
- [ ] **9.4** — Write the "Travel Notification" school log automatically on trip creation, not only on the share action
- [ ] **9.5** — Homestay-notification route to the school log, equivalent to the travel one — today a placement can be made and changed without the school being told
- [ ] **9.9** — Trigger a school notification when a student leaves guardianship (`student-archive.html` is static)

### 10 Liaison with Parents (66.7%)

- [ ] **10.1** — Parent-contact cadence rule and overdue-contact alert
- [ ] **10.1** — *Blocked:* "in line with the terms of the contract" cannot be met while no contract can be created (see 2.2.2, out of scope at 25%)
- [ ] **10.2** — Wire `parent-portal.html` (no `db.js`)
- [ ] **10.3** — One of the five named elements remains unmet (scored 4/5; the audit does not itemise which)

---

## Part 3 — Cross-Cutting Blockers

These two structural defects are named by the audit as capping the achievable score. Both sit behind in-scope items above and cannot be closed by feature work alone.

- [ ] **Storage and access control** — every record lives in browser `localStorage`: unencrypted, single-browser, no authentication, no roles, no backup, lost on cache clear. `audit-log.html` — the page that would evidence an audit trail — has no `db.js` and is itself a mockup. This caps **3.4.3** and **6.2.6** in scope (plus 2.5.1 and 2.7.4, out of scope).
- [ ] **No company-level entity** — `db.js` models students, staff, hosts, drivers, parents, agents, schools and their events, but nothing models Oxford Guardians itself. A single `og_org_documents` store (title, category, publication date, review date, version, file) would lift a dozen sections at once and produce most of the Appendix A submission set. In scope this blocks **2.1.3**, **2.1.6**, **2.8.1**, **3.3.1** and **5.10.1**.

---

## Appendix A — Audit's Highest Score-Per-Effort Ordering

Retained from the audit for prioritisation. Rows marked ▲ act on sections in this worklist.

| Change | Sections it moves | Est. gain |
|---|---|---|
| Policy & document store (org-level entity with publication/review dates) | 2.3, 2.4, 2.7.2/3, ▲2.8.1, 2.10, ▲5.10.1, 6.1, 6.4, 6.6, 6.7, 6.9, 6.10, 7.1 | +9–11 pts |
| Complaints module — reuse the concerns case pattern | 7 (3.3% → ~80%) | +1.8 pts |
| Wire concern creation — call the functions that already exist | 6.5, and ▲3.2.2 follow-up | +1.5 pts |
| Contract creation form — the module is otherwise complete | 2.2 (25% → ~85%) | +1.4 pts |
| Homestay conditions fields — smoking, gender, religion, interests, heating/hot water, laundry, meals, communal access, CCTV, home-alone | ▲5.2, 5.5, 5.6, 5.7, 5.8 | +5–6 pts |
| Student behaviour code — the 11 items at 6.8.1 | 6.8 (0% → ~80%) | +1.9 pts |
| Authentication and roles on a server-side store | 2.5.1, 2.7.4, ▲3.4.3, ▲6.2.6 | +2–3 pts |
| Per-member DBS on household residents; SCR DOB and self-declaration cells | ▲5.1.3, ▲2.8.5, ▲Appendix 7 | +1 pt |

---

## Appendix B — Sections Excluded by the >30% Filter

Listed for completeness; **not** covered by this worklist.

**At exactly 30% (excluded — not *strictly* over):** 2.7 Information sharing & data protection (30%), 6.10 Online safety (30%), Appendix 5 Homestay Self-Declaration (30%).

**Below 30%:** 2.2 Contracts (25%), 2.5 Record keeping (25%), 6.1 Safeguarding & CP policy (20%), 6.5 Allegations & low-level concerns (18.8%), 5.6 Meals (17.5%), 5.5 Student accommodation (15.8%), 2.4 Insurance (15%), 6.7 Missing students (12.5%), 2.10 Policies (10%), 6.6 Prevent duty (7.5%), 6.4 Whistleblowing (5%), 5.8 Conduct when hosting (4.2%), 3.1 Student induction (3.3%), 7 Complaints (3.3%), 2.3 Handbooks (3%), 1 Statement of aims (0%), 2.11 Significant changes (0%), 5.7 Laundry (0%), 5.12 Third-party providers (0%), 6.8 Student behaviour (0%), 6.9 Anti-bullying (0%).

> **Note on the filter:** the >30% cut is a scoring threshold, not a risk ranking. Several excluded sections are the audit's own top priorities — Standard 7 Complaints (3.3%) is called "the cheapest fix in this audit", and wiring concern creation (6.5, 18.8%) reverses a safeguarding regression. Neither appears above.

---

*Compiled from the AEGIS Percentile Compliance Audit of 27 July 2026, which supersedes the audits of 22 and 25 June 2026. 145 requirements across 43 sections; Standards 2.1.7 (Scotland) and 5.5.4 (boarding-house model) excluded by the audit as not applicable.*
