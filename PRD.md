# Product Requirements Document
## Oxford Guardians Platform

**Version:** 1.0 (Draft)
**Date:** March 2026
**Status:** In Progress
**Owner:** Zuko (Operations Director, Oxford Guardians)

---

## 1. Overview

### 1.1 Product Summary
The Oxford Guardians Platform is a Java Spring Boot web application that manages the day-to-day operations of Oxford Guardians, a UK-based educational guardianship organisation for international students. The platform replaces manual spreadsheets, paper forms and email-based workflows with a structured, role-based system.

### 1.2 Business Context
Oxford Guardians (trading name of Oxford Mentors Ltd) is pursuing AEGIS Preliminary Accreditation. The platform supports compliance with the AEGIS Accreditation Handbook & Quality Standards (September 2024) by digitising the operational processes required to manage students, homestays, documents and compliance records.

### 1.3 Technology Stack
- **Backend:** Java Spring Boot
- **Frontend:** TBD (web-based)
- **Document storage:** Internal (database / blob storage)
- **Authentication:** JWT / session-based
- **Deployment:** TBD

---

## 2. Users

### 2.1 Admin User
Oxford Guardians staff (Zuko, Jay and part-time administrators).

**Responsibilities:**
- Managing student, homestay and school records
- Coordinating travel and airport pickups
- Maintaining compliance and DBS records
- Generating and storing documents
- Communicating with parents and schools

**Core need:** Efficient tools and clear processes to manage students safely and stay AEGIS-accredited.

---

### 2.2 Parent User
Overseas parents or legal guardians of students.

**Responsibilities:**
- Reviewing their child's welfare and placement details
- Signing consent forms and contracts digitally
- Accessing handbooks and key documents
- Communicating with Oxford Guardians

**Core need:** Confidence that their child is safe, cared for and that someone is accountable.

---

### 2.3 Student User
International students aged 13–18 studying at UK independent schools.

**Responsibilities:**
- Accessing their guardian and homestay contact details
- Completing welfare check-ins
- Reporting concerns
- Accessing the student handbook

**Core need:** Feel safe, supported and know exactly what to do when something goes wrong.

---

## 3. Epic Roadmap

### Build Sequence

```
Phase 1 (MVP)  →  Epic 1, Epic 2, Epic 3, Epic 5
Phase 2        →  Epic 4, Epic 6, Epic 8
Phase 3        →  Epic 7, Epic 9
```

---

### EPIC 1 — Foundation & Authentication
**Phase:** 1 (MVP)
**Description:** Core platform infrastructure. All other epics depend on this.

**Features:**
- User authentication (JWT or session-based)
- Role-based access control: Admin / Parent / Student
- Admin creates, invites and manages user accounts
- Secure password reset flow
- Basic UI shell and navigation per role
- Audit logging of user actions

**Acceptance Criteria:**
- Admin can log in and access admin dashboard
- Parent can log in and access parent dashboard
- Student can log in and access student dashboard
- Users cannot access areas outside their role
- Passwords are stored securely (bcrypt or equivalent)

---

### EPIC 2 — Student Management
**Phase:** 1 (MVP)
**AEGIS Reference:** Standard 3.4, Appendix 13
**Description:** Core admin workflow for managing student records.

**Features:**
- Create and edit student profiles with all AEGIS Appendix 13 fields:
  - Full name, DOB, preferred name, nationality
  - Home address
  - Parent/guardian details (name, address, phone, email, occupation)
  - UK family contacts
  - Agent details
  - Health and medical information (conditions, allergies, medications, immunisations)
  - Private medical insurance details
  - Dietary requirements
  - Interests and hobbies
  - Specific learning difficulties
  - School details (name, year, tutor, house staff contacts)
  - Permissions and consents
  - Passport / BRP reference
- Enrol, onboard and deactivate students
- Link student → parent account
- Link student → homestay
- Link student → school
- Student list view with status (active / inactive / pending)
- Welfare check-in log per student
- Search and filter students

**Acceptance Criteria:**
- Admin can create a student record with all mandatory fields
- All fields from AEGIS Appendix 13 are present
- Student is linked to a parent account
- Student status is visible at a glance
- Welfare check-in history is accessible per student

---

### EPIC 3 — Homestay Management
**Phase:** 1 (MVP)
**AEGIS Reference:** Standards 2.8, 5.1–5.12
**Description:** Management of approved homestay families.

**Features:**
- Homestay profiles including:
  - Primary carer details
  - All household members (name, DOB, DBS status)
  - Property address
  - Accommodation details (bedrooms, bathroom, study space)
  - Pets, smoking status, dietary patterns
  - Insurance confirmation
- Approve / deactivate homestays
- Assign student(s) to homestay (max 3 per Standard 5.5.2)
- Digital H&S assessment checklist (all AEGIS Standard 5.10.2 items)
  - Smoke alarms, CO alarms, gas certificate, electrical safety, fire evacuation, first aid kit etc.
- Annual visit scheduling and record
- Homestay availability calendar
- DBS status tracking per household member
- Self-declaration form submission and renewal tracking

**Acceptance Criteria:**
- Admin can create and approve a homestay
- H&S checklist covers all AEGIS Standard 5.10.2 requirements
- System prevents more than 3 students being assigned to one homestay
- DBS expiry alerts visible per household member
- Annual visit due dates tracked and alerted

---

### EPIC 4 — Travel & Airport Pickup
**Phase:** 2
**AEGIS Reference:** Standard 4
**Description:** Coordination of student travel arrangements.

**Features:**
- Travel request creation per student
- Airport pickup scheduling:
  - Date, time, flight number, terminal, airline
  - Assign coordinator/driver
  - Notes and special requirements
- Parent notification of pickup details
- Travel permission letter generation (AEGIS Appendix 9 template)
- Travel history log per student
- Exeat (school weekend leave) scheduling
- Travel consent tracking

**Acceptance Criteria:**
- Admin can create a travel request and assign a coordinator
- Parent receives notification of pickup details
- Travel permission letter can be generated from a template
- Travel history is retained per student

---

### EPIC 5 — Document Management
**Phase:** 1 (MVP)
**AEGIS Reference:** Appendix A (full submission pack)
**Description:** Internal storage and management of all organisation documents.

**Features:**
- Document storage organised by category:
  - Policies
  - Handbooks (Student, Parent, Homestay)
  - Contracts (Staff, Parent/Agent, Homestay)
  - Forms and templates
  - Compliance records (DBS, training, SCR)
  - Submission pack
- Template-based document generation:
  - Written confirmation of service (Standard 9.3)
  - Student removal form (Appendix 11)
  - Travel permission letter (Appendix 9)
- Document versioning (version number, date, review date)
- Document status workflow: Draft → Review → Approved
- AEGIS Appendix A submission pack compiler (exports all required docs)
- Admin upload and download
- Document access control per role

**Acceptance Criteria:**
- All AEGIS Appendix A documents can be stored and retrieved
- Documents have version numbers and review dates
- Submission pack export produces a complete, organised folder
- Parents and students can access documents appropriate to their role
- No cross-role document access

---

### EPIC 6 — Parent Portal
**Phase:** 2
**AEGIS Reference:** Standards 2.3.2, 3.2, 9
**Description:** Parent-facing dashboard and communication hub.

**Features:**
- Dashboard showing:
  - Child's current status
  - Homestay details and address
  - School details
  - Named guardian contact
- Welfare update feed (admin posts, parent reads)
- Document access (handbooks, contracts, policies)
- Digital consent form signing:
  - Medical emergency consent
  - Photography consent
  - Travel consent
  - Data sharing consent
- 24/7 emergency contact visibility
- In-app messaging or notification centre
- Expense statements

**Acceptance Criteria:**
- Parent sees only their own child's information
- Welfare updates posted by admin are visible in the feed
- Consent forms can be signed digitally and status is tracked
- Emergency contact number is always visible
- Parent can access all documents relevant to their child

---

### EPIC 7 — Student Portal
**Phase:** 3
**AEGIS Reference:** Standards 3.1, 3.2, 6.1.3
**Description:** Student-facing app for safety, welfare and information.

**Features:**
- Dashboard showing:
  - Homestay name, address and contact
  - School details
  - Named guardian contact
- One-tap emergency contact button (Oxford Guardians 24/7 number)
- Student handbook (in-app, always accessible)
- Welfare check-in (student confirms they are OK — logged for admin)
- Report a concern form (submits to DSL/Jay)
- Travel and exeat information
- Notifications

**Acceptance Criteria:**
- Emergency contact button is prominent and always accessible
- Welfare check-in creates a timestamped log entry visible to admin
- Concern report notifies DSL immediately
- Student handbook content matches approved handbook document
- Students see only their own information

---

### EPIC 8 — Compliance & AEGIS Tools
**Phase:** 2
**AEGIS Reference:** Standards 2.8, 6.2, 6.3, 2.10, Annual Declaration
**Description:** Admin tools to maintain AEGIS compliance.

**Features:**
- DBS tracker per person (staff, homestays, volunteers):
  - Certificate number, level, issue date, expiry
  - Update Service registration status
  - Annual online check log
  - Alerts for expiring certificates
- Training records log:
  - Safeguarding level, provider, date completed, expiry
  - DSL Level 3 certification (Jay + Zuko — renewal May 2028)
  - Prevent training completion
  - Safer recruitment training
  - Homestay annual safeguarding update
- Policy review tracker:
  - All policies listed with last review date and next due date
  - Alert when policy review is overdue
- Single Central Record (SCR):
  - Live view covering all AEGIS Appendix 7 columns
  - Exportable / printable
  - Anonymised export for AEGIS inspection
- Compliance dashboard:
  - RAG status (Red / Amber / Green) across all compliance areas
  - Outstanding actions highlighted
- AEGIS Annual Declaration workflow

**Acceptance Criteria:**
- SCR contains all columns from AEGIS Appendix 7
- DBS expiry alerts fire with sufficient notice (e.g. 3 months ahead)
- Policy review alerts fire 1 month before due date
- Compliance dashboard gives instant overview of outstanding items
- SCR can be exported in anonymised format for AEGIS submission

---

### EPIC 9 — Notifications & Communications
**Phase:** 3
**AEGIS Reference:** Standards 2.6, 3.2, 9
**Description:** Automated notifications and communication tools.

**Features:**
- Email notifications:
  - Welcome emails (new student, new parent)
  - Welfare update alerts to parents
  - DBS/training expiry reminders to admin
  - Annual visit due reminders (homestays)
  - Policy review due reminders
- In-app notification centre
- Welfare check-in reminders to students
- School liaison log (record of all contact with schools — Standard 9.7)

**Acceptance Criteria:**
- DBS expiry triggers email to admin 90, 60 and 30 days before expiry
- Welfare check-in reminder sent to student if no check-in within agreed period
- All school communications are logged and timestamped
- Email notifications are role-appropriate

---

## 4. Non-Functional Requirements

| Requirement | Detail |
|---|---|
| Security | Role-based access control enforced server-side. No client-side security assumptions. |
| Data protection | UK GDPR compliant. Personal data encrypted at rest. Audit log of all data access. |
| Availability | 99.9% uptime target. Emergency contact features must be available 24/7. |
| Performance | Page load < 2 seconds under normal load. |
| Accessibility | WCAG 2.1 AA minimum for student and parent portals. |
| Audit trail | All admin actions logged with timestamp and user. |
| Backup | Daily automated backups. Recovery point objective: 24 hours. |

---

## 5. Out of Scope (v1)

The following are explicitly out of scope for the initial build and may be considered for future versions:

- SharePoint / Microsoft 365 integration
- Mobile native apps (iOS / Android)
- School portal / school login
- Agent portal
- Automated DBS application submission
- Payment processing (fee collection from parents)
- Gold Standard AEGIS accreditation features
- Multi-organisation (SaaS) support

---

## 6. Open Questions

- [ ] Hosting environment — cloud provider? (AWS, Azure, GCP?)
- [ ] Frontend framework — Thymeleaf, React, Vue?
- [ ] Database — PostgreSQL, MySQL?
- [ ] Will students use this on mobile? (affects UI decisions)
- [ ] Email provider — SendGrid, AWS SES, SMTP?
- [ ] What is the MVP launch target date?

---

## 7. Reference Documents

- AEGIS Accreditation Handbook & Quality Standards (September 2024): `/reference/AEGIS-Handbook-September-2024.pdf`
- AEGIS Appendix A (Preliminary submission checklist): Handbook p.39–40
- AEGIS Appendix 7 (SCR template): Handbook p.51
- AEGIS Appendix 13 (Student information): Handbook p.73
- Oxford Guardians Trello Board: https://trello.com/b/qxJSlpJK

---

*This PRD is a living document. Update as requirements are refined.*
