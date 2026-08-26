var OG_STORAGE_KEY = 'og_students';
var OG_TRAVEL_TODOS_KEY = 'og_travel_todos';
var OG_INCIDENTS_KEY = 'og_incidents';
var OG_STAFF_KEY = 'og_staff';
var OG_CONCERNS_KEY = 'og_concerns';
var OG_WELFARE_LOGS_KEY = 'og_welfare_logs';
var OG_MH_CASES_KEY = 'og_mh_cases';
var OG_MH_COMMS_KEY = 'og_mh_comms';
var OG_MH_REMOVALS_KEY = 'og_mh_removals';
var OG_SCHOOL_LOGS_KEY = 'og_school_logs';
var OG_PARENT_LOGS_KEY = 'og_parent_logs';
var OG_SCHOOLS_KEY     = 'og_schools';
var OG_CONTRACTS_KEY   = 'og_contracts';
var OG_AGENTS_KEY      = 'og_agents';
var OG_AGENT_LOGS_KEY  = 'og_agent_logs';

var initialSchoolLogs = [];
var initialParentLogs = [];
var initialAgentLogs = [];

var initialSchools = [
  {
    id: 'SCH00001',
    name: "Cheltenham Ladies' College",
    services: {
      emergencySupport:      true,
      homestayArrangements:  true,
      academicLiaison:       true,
      travelAssistance:      true,
      pastoralCare:          true,
      practicalAdmin:        false,
      visaSupport:           true
    }
  },
  {
    id: 'SCH00002',
    name: 'Oundle School',
    services: {
      emergencySupport:      true,
      homestayArrangements:  true,
      academicLiaison:       true,
      travelAssistance:      false,
      pastoralCare:          true,
      practicalAdmin:        true,
      visaSupport:           false
    }
  },
  {
    id: 'SCH00003',
    name: "St Edward's Oxford",
    services: {
      emergencySupport:      true,
      homestayArrangements:  false,
      academicLiaison:       true,
      travelAssistance:      true,
      pastoralCare:          true,
      practicalAdmin:        true,
      visaSupport:           true
    }
  },
  {
    id: 'SCH00004',
    name: 'Rugby School',
    services: {
      emergencySupport:      true,
      homestayArrangements:  true,
      academicLiaison:       false,
      travelAssistance:      true,
      pastoralCare:          true,
      practicalAdmin:        false,
      visaSupport:           true
    }
  },
  {
    id: 'SCH00005',
    name: 'Magdalen College School',
    services: {
      emergencySupport:      false,
      homestayArrangements:  true,
      academicLiaison:       true,
      travelAssistance:      false,
      pastoralCare:          true,
      practicalAdmin:        true,
      visaSupport:           false
    }
  },
  {
    id: 'SCH00006',
    name: 'Oxford High School',
    services: {
      emergencySupport:      false,
      homestayArrangements:  false,
      academicLiaison:       true,
      travelAssistance:      false,
      pastoralCare:          true,
      practicalAdmin:        true,
      visaSupport:           false
    }
  }
];

var initialStudents = [
  {
    id: 'STU10492',
    firstName: 'Yuki',
    lastName: 'Tanaka',
    preferredName: 'Yuki',
    dob: '2010-02-11',
    nationality: 'Japanese',
    school: "Cheltenham Ladies' College",
    schoolId: 'SCH00001',
    schoolYear: 'Year 11',
    accommodationType: 'Boarding Student',
    tutorOrHouse: 'Tutor: Mrs Caroline Reeves',
    arrivalDate: '2026-04-18',
    travelDetails: 'Heathrow T5 / flight JL043',
    homestayFamily: 'Ashworth Family',
    homestayDetails: 'Oxford / 2 of 3 places filled',
    welfareStatus: 'Last check-in 03 Apr',
    welfareNotes: 'Homesickness note acknowledged 28 Mar',
    status: 'Active',
    parent1Name: 'Haruka Tanaka',
    parent1Email: 'haruka.tanaka@example.jp',
    parent1Phone: '+81 90 4472 1842',
    parent2Name: 'Kenji Tanaka',
    parent2Email: 'kenji.tanaka@example.jp',
    parent2Phone: '',
    lastReviewedDate: '2026-01-15',
    lastReviewedBy: 'Sarah Mitchell (DSL)',
    reviewDueDate: '2027-01-15',
    reviewStatus: 'current',
    tutorEmail: 'c.reeves@cheltenhamladies.org',
    tutorPhone: '+44 1242 520 691',
    health: { medicalConditions: '', allergies: '', dietaryRequirements: '', immunisationDetails: '', privateMedicalCover: '', learningDifficulties: '' },
    family: { homeAddress: '', parentAddresses: '', parentOccupations: '', familyBackgroundInfo: '', ukFamilyContacts: '', ukFamilyContactsStructured: [
      {
        id: 'UKFC-001',
        relationship: 'Aunt (Maternal)',
        fullName: 'Yoko Mori',
        address: '14 Belsize Park Gardens, London NW3 4HJ',
        telephone: '+44 7700 900 123',
        email: 'yoko.mori@example.co.uk',
        occupation: 'University Lecturer (UCL)',
        authorisedCollect: true,
        authorisedOvernight: false,
        notes: 'First UK emergency contact. Authorised to collect from school. Not authorised for overnight stays without parent approval.'
      }
    ] },
    legal: { passportOrBRPPath: '', permissions: {
      travel:  { granted: true,  grantedBy: 'Haruka Tanaka (Mother)', grantedDate: '2025-09-01', evidenceMethod: 'Signed Guardianship Agreement / Ref OG-2025-042' },
      medical: { granted: true,  grantedBy: 'Haruka Tanaka (Mother)', grantedDate: '2025-09-01', evidenceMethod: 'Signed Guardianship Agreement / Ref OG-2025-042' },
      photo:   { granted: true,  grantedBy: 'Haruka Tanaka (Mother)', grantedDate: '2025-09-01', evidenceMethod: 'Email confirmation to admissions@oxfordguardians.co.uk' },
      data:    { granted: true,  grantedBy: 'Haruka Tanaka (Mother)', grantedDate: '2025-09-01', evidenceMethod: 'Signed Guardianship Agreement / Ref OG-2025-042' }
    }, agentId: 'AGT00002', agentDetails: 'Keiko Mori (Sakura)' },
    pastoral: { interestsAndHobbies: '', visitRecords: [] },
    medicineAdministrationLog: [
      {
        id: 'MAR-001',
        date: '2026-03-15',
        time: '08:15',
        medication: 'Ventolin Inhaler (Salbutamol)',
        dosage: '2 puffs (200mcg)',
        reason: 'Mild wheeze after morning walk',
        administeredBy: 'Eleanor Ashworth (Homestay Host)',
        witnessedBy: 'Richard Ashworth',
        studentConsent: true,
        notes: 'Student self-administered under supervision. Breathing normalised within 10 minutes. No further action required.',
        loggedAt: '2026-03-15T08:45:00Z'
      }
    ],
    medicalPlacementGate: {
      hasSpecialistCondition: true,
      conditionType: 'Asthma (mild, inhaler-managed)',
      homestayBriefedDate: '2025-09-14',
      homestayBriefedBy: 'Sarah Mitchell (DSL)',
      homestayConfirmedCompetent: true,
      competencyNotes: 'Eleanor Ashworth confirmed comfortable with inhaler supervision. Written guidance provided. Emergency asthma plan shared with host and school nurse.',
      epiPenTraining: false,
      insulinTraining: false
    },
    privateFostering: { isApplicable: false }
  },
  {
    id: 'STU83921',
    firstName: 'Chen',
    lastName: 'Wei',
    preferredName: 'Ethan',
    dob: '2009-10-09',
    nationality: 'Chinese',
    school: 'Oundle School',
    schoolId: 'SCH00002',
    schoolYear: 'Year 12',
    accommodationType: 'Boarding Student',
    tutorOrHouse: 'House: Sidney',
    arrivalDate: '',
    travelDetails: 'No inbound trip pending',
    homestayFamily: 'Brennan Family',
    homestayDetails: 'Cambridgeshire / 1 of 3 places filled',
    welfareStatus: 'Last check-in 01 Apr',
    welfareNotes: 'Pastoral follow-up booked',
    status: 'Monitor',
    parent1Name: 'Wei Jianming',
    parent1Email: 'jianming.wei@example.cn',
    parent1Phone: '+86 138 0000 1234',
    parent2Name: '',
    parent2Email: '',
    parent2Phone: '',
    lastReviewedDate: '2025-06-20',
    lastReviewedBy: 'Sarah Mitchell (DSL)',
    reviewDueDate: '2026-06-20',
    reviewStatus: 'overdue',
    tutorEmail: '',
    tutorPhone: '',
    health: { medicalConditions: '', allergies: '', dietaryRequirements: '', immunisationDetails: '', privateMedicalCover: '', learningDifficulties: '' },
    family: { homeAddress: '', parentAddresses: '', parentOccupations: '', familyBackgroundInfo: '', ukFamilyContacts: '', ukFamilyContactsStructured: [] },
    legal: { passportOrBRPPath: '', permissions: {
      travel:  { granted: false, grantedBy: '', grantedDate: '', evidenceMethod: '' },
      medical: { granted: false, grantedBy: '', grantedDate: '', evidenceMethod: '' },
      photo:   { granted: false, grantedBy: '', grantedDate: '', evidenceMethod: '' },
      data:    { granted: false, grantedBy: '', grantedDate: '', evidenceMethod: '' }
    }, agentId: 'AGT00001', agentDetails: 'Mei Zhang (Bright Future)' },
    pastoral: { interestsAndHobbies: '', visitRecords: [] },
    medicineAdministrationLog: [],
    medicalPlacementGate: { hasSpecialistCondition: false, conditionType: '', homestayBriefedDate: '', homestayBriefedBy: '', homestayConfirmedCompetent: false, competencyNotes: '', epiPenTraining: false, insulinTraining: false },
    privateFostering: { isApplicable: false }
  },
  {
    id: 'STU47291',
    firstName: 'Sofia',
    lastName: 'Petrova',
    preferredName: 'Sofia',
    dob: '2011-06-24',
    nationality: 'Bulgarian',
    school: "St Edward's Oxford",
    schoolId: 'SCH00003',
    schoolYear: 'Year 10',
    accommodationType: 'Boarding Student',
    tutorOrHouse: 'Tutor: Alex Martin',
    arrivalDate: '2026-04-20',
    travelDetails: 'Gatwick South / flight BA879',
    homestayFamily: 'Ellis Family',
    homestayDetails: 'Approval pending final DBS upload',
    welfareStatus: 'No check-in yet',
    welfareNotes: 'New arrival workflow not started',
    status: 'Pending',
    parent1Name: 'Ivanka Petrova',
    parent1Email: 'ivanka.petrova@example.bg',
    parent1Phone: '+359 88 000 0001',
    parent2Name: '',
    parent2Email: '',
    parent2Phone: '',
    lastReviewedDate: '2026-03-10',
    lastReviewedBy: 'Sarah Mitchell (DSL)',
    reviewDueDate: '2027-03-10',
    reviewStatus: 'current',
    tutorEmail: '',
    tutorPhone: '',
    health: { medicalConditions: '', allergies: '', dietaryRequirements: '', immunisationDetails: '', privateMedicalCover: '', learningDifficulties: '' },
    family: { homeAddress: '', parentAddresses: '', parentOccupations: '', familyBackgroundInfo: '', ukFamilyContacts: '', ukFamilyContactsStructured: [] },
    legal: { passportOrBRPPath: '', permissions: {
      travel:  { granted: false, grantedBy: '', grantedDate: '', evidenceMethod: '' },
      medical: { granted: false, grantedBy: '', grantedDate: '', evidenceMethod: '' },
      photo:   { granted: false, grantedBy: '', grantedDate: '', evidenceMethod: '' },
      data:    { granted: false, grantedBy: '', grantedDate: '', evidenceMethod: '' }
    }, agentDetails: '' },
    pastoral: { interestsAndHobbies: '', visitRecords: [] },
    medicineAdministrationLog: [],
    medicalPlacementGate: { hasSpecialistCondition: false, conditionType: '', homestayBriefedDate: '', homestayBriefedBy: '', homestayConfirmedCompetent: false, competencyNotes: '', epiPenTraining: false, insulinTraining: false },
    privateFostering: { isApplicable: false }
  },
  {
    id: 'STU93018',
    firstName: 'Daniel',
    lastName: 'Kim',
    preferredName: 'Daniel',
    dob: '2008-12-05',
    nationality: 'South Korean',
    school: 'Rugby School',
    schoolId: 'SCH00004',
    schoolYear: 'Year 12',
    accommodationType: 'Boarding Student',
    tutorOrHouse: 'House: Tudor',
    arrivalDate: '2026-04-22',
    travelDetails: 'Oxford Parkway handoff',
    homestayFamily: 'Brennan Family',
    homestayDetails: 'Weekend and exeat only',
    welfareStatus: 'Last check-in 04 Apr',
    welfareNotes: 'No concerns logged',
    status: 'Active',
    parent1Name: 'Kim Jisoo',
    parent1Email: 'jisoo.kim@example.kr',
    parent1Phone: '+82 10 0000 5678',
    parent2Name: '',
    parent2Email: '',
    parent2Phone: '',
    lastReviewedDate: '2025-08-20',
    lastReviewedBy: 'Sarah Mitchell (DSL)',
    reviewDueDate: '2026-08-20',
    reviewStatus: 'due-soon',
    tutorEmail: '',
    tutorPhone: '',
    health: { medicalConditions: '', allergies: '', dietaryRequirements: '', immunisationDetails: '', privateMedicalCover: '', learningDifficulties: '' },
    family: { homeAddress: '', parentAddresses: '', parentOccupations: '', familyBackgroundInfo: '', ukFamilyContacts: '', ukFamilyContactsStructured: [] },
    legal: { passportOrBRPPath: '', permissions: {
      travel:  { granted: false, grantedBy: '', grantedDate: '', evidenceMethod: '' },
      medical: { granted: false, grantedBy: '', grantedDate: '', evidenceMethod: '' },
      photo:   { granted: false, grantedBy: '', grantedDate: '', evidenceMethod: '' },
      data:    { granted: false, grantedBy: '', grantedDate: '', evidenceMethod: '' }
    }, agentDetails: '' },
    pastoral: { interestsAndHobbies: '', visitRecords: [] },
    medicineAdministrationLog: [],
    medicalPlacementGate: { hasSpecialistCondition: false, conditionType: '', homestayBriefedDate: '', homestayBriefedBy: '', homestayConfirmedCompetent: false, competencyNotes: '', epiPenTraining: false, insulinTraining: false },
    privateFostering: { isApplicable: false }
  },
  {
    id: 'STU61100',
    firstName: 'Amara',
    lastName: 'Osei',
    preferredName: 'Amara',
    dob: '2012-03-15',
    nationality: 'Ghanaian',
    school: 'Magdalen College School',
    schoolId: 'SCH00005',
    schoolYear: 'Year 9',
    accommodationType: 'Private Fostering',
    tutorOrHouse: 'Tutor: Mr David Holt',
    arrivalDate: '2026-07-25',
    travelDetails: 'Heathrow T3 / flight GH001',
    homestayFamily: 'Patel Family',
    homestayDetails: 'Oxford / 1 of 2 places filled',
    welfareStatus: 'Pre-arrival',
    welfareNotes: 'Private fostering arrangement — LA notification pending',
    status: 'Pending',
    parent1Name: 'Kofi Osei',
    parent1Email: 'kofi.osei@example.gh',
    parent1Phone: '+233 20 000 1234',
    parent2Name: 'Abena Osei',
    parent2Email: 'abena.osei@example.gh',
    parent2Phone: '+233 20 000 5678',
    lastReviewedDate: '2026-04-10',
    lastReviewedBy: 'Sarah Mitchell (DSL)',
    reviewDueDate: '2027-04-10',
    reviewStatus: 'current',
    tutorEmail: '',
    tutorPhone: '',
    health: { medicalConditions: '', allergies: '', dietaryRequirements: '', immunisationDetails: '', privateMedicalCover: '', learningDifficulties: '' },
    family: { homeAddress: '', parentAddresses: '', parentOccupations: '', familyBackgroundInfo: '', ukFamilyContacts: '', ukFamilyContactsStructured: [] },
    legal: { passportOrBRPPath: '', permissions: {
      travel:  { granted: false, grantedBy: '', grantedDate: '', evidenceMethod: '' },
      medical: { granted: false, grantedBy: '', grantedDate: '', evidenceMethod: '' },
      photo:   { granted: false, grantedBy: '', grantedDate: '', evidenceMethod: '' },
      data:    { granted: false, grantedBy: '', grantedDate: '', evidenceMethod: '' }
    }, agentDetails: '' },
    pastoral: { interestsAndHobbies: '', visitRecords: [] },
    medicineAdministrationLog: [],
    medicalPlacementGate: { hasSpecialistCondition: false, conditionType: '', homestayBriefedDate: '', homestayBriefedBy: '', homestayConfirmedCompetent: false, competencyNotes: '', epiPenTraining: false, insulinTraining: false },
    // privateFostering — AEGIS Standard 8 private fostering tracking.
    //   briefings.<school|homestay|parent>: { briefed, date, by, contentCovered: [...topics], notes }
    //     — AEGIS 8.3 structured stakeholder briefing record (what was explained, when, by whom).
    //     Legacy records may instead carry flat booleans (schoolBriefed/homestayBriefed/parentConsent);
    //     private-fostering.html normalises those on load so old data never throws.
    //   informationSharing.<parent|school|host>: { consented, date, method, reference }
    //     — AEGIS 8.4 multi-party information-sharing consent. Agents are intentionally excluded:
    //     they only refer students and are not party to consent or information sharing.
    privateFostering: {
      isApplicable: true,
      proposedStartDate: '2026-07-29',
      laNotifiedDate: '',
      briefings: {
        school: {
          briefed: true,
          date: '2026-04-01',
          by: 'Jay Ray',
          contentCovered: ['28-day threshold', 'LA notification', 'LA visits expectation'],
          notes: 'Spoke with Deputy Head pastoral care team'
        },
        homestay: {
          briefed: false,
          date: '',
          by: '',
          contentCovered: [],
          notes: ''
        },
        parent: {
          briefed: true,
          date: '2026-03-28',
          by: 'Jay Ray',
          contentCovered: ['28-day threshold', 'LA notification', 'Emergency contacts'],
          notes: 'Consent form signed and returned via email'
        }
      },
      informationSharing: {
        parent: { consented: true, date: '2026-03-28', method: 'Written', reference: 'Signed consent form returned via email' },
        school: { consented: true, date: '2026-04-01', method: 'Email', reference: 'Email confirmation from Deputy Head' },
        host: { consented: false, date: '', method: '', reference: '' }
      },
      correspondenceLog: []
    }
  },
  {
    id: 'STU72204',
    firstName: 'Lucas',
    lastName: 'Ferreira',
    preferredName: 'Lucas',
    dob: '2008-09-20',
    nationality: 'Brazilian',
    school: 'Oxford High School',
    schoolId: 'SCH00006',
    schoolYear: 'Year 13',
    accommodationType: 'Day Student',
    tutorOrHouse: 'Tutor: Ms Rachel Ford',
    arrivalDate: '',
    travelDetails: '',
    homestayFamily: 'Whitfield Family',
    homestayDetails: 'Oxford / day student living with host family, term-time only',
    welfareStatus: 'Last check-in 20 Jun',
    welfareNotes: 'Over-16 day student living with host family — welfare check-ins monitored under AEGIS 8.5',
    status: 'Active',
    parent1Name: 'Carlos Ferreira',
    parent1Email: 'carlos.ferreira@example.br',
    parent1Phone: '+55 11 9000 1234',
    parent2Name: 'Ana Ferreira',
    parent2Email: 'ana.ferreira@example.br',
    parent2Phone: '+55 11 9000 5678',
    lastReviewedDate: '2025-06-15',
    lastReviewedBy: 'Sarah Mitchell (DSL)',
    reviewDueDate: '2026-06-15',
    reviewStatus: 'overdue',
    tutorEmail: '',
    tutorPhone: '',
    health: { medicalConditions: '', allergies: '', dietaryRequirements: '', immunisationDetails: '', privateMedicalCover: '', learningDifficulties: '' },
    family: { homeAddress: '', parentAddresses: '', parentOccupations: '', familyBackgroundInfo: '', ukFamilyContacts: '', ukFamilyContactsStructured: [] },
    legal: { passportOrBRPPath: '', permissions: {
      travel:  { granted: false, grantedBy: '', grantedDate: '', evidenceMethod: '' },
      medical: { granted: false, grantedBy: '', grantedDate: '', evidenceMethod: '' },
      photo:   { granted: false, grantedBy: '', grantedDate: '', evidenceMethod: '' },
      data:    { granted: false, grantedBy: '', grantedDate: '', evidenceMethod: '' }
    }, agentDetails: '' },
    pastoral: { interestsAndHobbies: '', visitRecords: [] },
    medicineAdministrationLog: [],
    medicalPlacementGate: { hasSpecialistCondition: false, conditionType: '', homestayBriefedDate: '', homestayBriefedBy: '', homestayConfirmedCompetent: false, competencyNotes: '', epiPenTraining: false, insulinTraining: false },
    privateFostering: { isApplicable: false },
    // dayStudentWelfare — AEGIS 8.5 welfare monitoring for over-16 day students living with a host family.
    //   homestayStartDate:         ISO date the student moved into the homestay
    //   welfareCheckFrequencyDays: required check-in cadence in days (defaults to 30 if omitted)
    //   checkins:                  [{ date, by, type: 'In-Person Visit'|'Phone Call'|'Video Call'|'Email', notes }, ...]
    //   consentLog:                { parentConsent, schoolConsent, hostConsent } — agents are excluded, they only refer students
    dayStudentWelfare: {
      homestayStartDate: '2025-09-10',
      welfareCheckFrequencyDays: 30,
      checkins: [
        { date: '2026-06-20', by: 'Jay Ray', type: 'Phone Call', notes: 'Student settled, no concerns. Meals and commute working well.' },
        { date: '2026-05-15', by: 'Jay Ray', type: 'In-Person Visit', notes: 'Visited homestay. Room clean, student happy.' }
      ],
      consentLog: {
        parentConsent: true,
        schoolConsent: true,
        hostConsent: true
      }
    }
  }
];

var initialConcerns = [
  {
    id: 'CON00001',
    subjectName: 'Chen Wei',
    subjectRole: 'Student',
    subjectId: 'STU83921',
    tier: 'low-level',
    category: 'Welfare pattern',
    title: 'Repeated low mood at host handoffs',
    description: 'Chen Wei has presented with low mood during three consecutive host handoffs (01 Mar, 15 Mar, 01 Apr 2026). Host Helen Finch notes he eats less than usual and has been quieter than in previous terms. No specific incident disclosed. Pastoral follow-up booked with school house.',
    source: 'Host observation — Helen Finch / Staff note — Priya Shah',
    loggedDate: '03 Apr 2026',
    status: 'Monitoring',
    reviewDate: '17 Apr 2026'
  },
  {
    id: 'CON00002',
    subjectName: 'Catherine Brennan',
    subjectRole: 'Host',
    subjectId: null,
    tier: 'low-level',
    category: 'Boundary observation',
    title: 'Host present during student welfare call',
    description: 'Catherine Brennan was present in the room during a scheduled welfare phone call between Daniel Kim and his case coordinator (12 Mar 2026). Student did not disclose any concerns during the call. Host was asked afterwards to allow students privacy during welfare contacts. Mrs Brennan was cooperative and acknowledged the boundary.',
    source: 'Staff observation — Zuko Fire',
    loggedDate: '12 Mar 2026',
    status: 'No escalation',
    reviewDate: '26 Mar 2026'
  },
  {
    id: 'CON00003',
    subjectName: 'Lucia Herrera',
    subjectRole: 'Student',
    subjectId: null,
    tier: 'escalated',
    category: 'Reported feeling unsafe',
    title: 'Student disclosed discomfort at placement address',
    description: 'Lucia Herrera disclosed to her school pastoral lead on 14 Apr 2026 that she felt "not comfortable" in her current placement. No specific incident named but she referenced a person at the house she did not know. School notified Oxford Guardians at 16:30 the same day. DSL Jay Ray contacted. Student temporarily staying with school boarding staff pending triage. Host placement suspended pending investigation.',
    source: 'School referral — Pastoral Lead / DSL notification',
    loggedDate: '14 Apr 2026',
    status: 'Pending triage'
  },
  {
    id: 'CON00004',
    subjectName: 'Sofia Petrova',
    subjectRole: 'Student',
    subjectId: 'STU47291',
    tier: 'resolved',
    category: 'Historical: Airport anxiety',
    title: 'Acute distress on arrival — Gatwick South, Jan 2026',
    description: 'Sofia Petrova experienced acute anxiety at Gatwick South arrivals on 10 Jan 2026. Driver Matthew Clarke reported she was visibly distressed upon collection and disclosed she had never travelled alone before. Driver contacted Oxford Guardians immediately. Priya Shah made direct contact by phone and arranged for her mother to call. Sofia arrived at host placement safely. Follow-up welfare check completed 12 Jan 2026 — no ongoing concerns. Parents notified. Concern formally closed.',
    source: 'Driver report — Matthew Clarke',
    loggedDate: '10 Jan 2026',
    status: 'Closed',
    closedDate: '20 Feb 2026'
  }
];

// ── Welfare Logs seed (AEGIS Standard 3.2 — Student Wellbeing) ────────────────

var initialWelfareLogs = [
  {
    id: 'WL1001',
    studentId: 'STU83921',
    type: 'staff-note',
    date: '2026-04-02',
    summary: 'Homesickness pattern follow-up',
    details: 'Note type: routine\nContact method: Phone\nOwner: Jay Ray (DSL)\nDuration: 15 minutes\nSummary: Spoke with Chen Wei regarding settling back into Oundle after Easter exeat.\nOutcome: Follow-up scheduled\nNext action due: 16 Apr 2026'
  },
  {
    id: 'WL1002',
    studentId: 'STU10492',
    type: 'check-in',
    date: '2026-04-03',
    summary: 'Student check-in completed',
    details: 'Status: I am okay today\nLocation: At school boarding house\nFollow-up needed: No'
  },
  {
    id: 'WL1003',
    studentId: 'STU47291',
    type: 'staff-note',
    date: '2026-04-01',
    summary: 'Pre-travel welfare confirmation',
    details: 'Note type: post-travel\nContact method: Phone\nOwner: Priya Shah\nDuration: 10 minutes\nSummary: Confirmed Sofia has emergency contact card and driver pickup details.\nOutcome: No further action'
  },
  {
    id: 'WL1004',
    studentId: 'STU91823',
    type: 'check-in',
    date: '2026-03-25',
    summary: 'Term start introduction check-in',
    details: 'Status: I am okay today\nLocation: At school (day pupil)\nFollow-up needed: No'
  }
];

function initDB() {
  if (!localStorage.getItem(OG_STORAGE_KEY)) {
    localStorage.setItem(OG_STORAGE_KEY, JSON.stringify(initialStudents));
  }
  if (!localStorage.getItem(OG_CONCERNS_KEY)) {
    localStorage.setItem(OG_CONCERNS_KEY, JSON.stringify(initialConcerns));
  }
  if (!localStorage.getItem(OG_SCHOOL_LOGS_KEY)) {
    localStorage.setItem(OG_SCHOOL_LOGS_KEY, JSON.stringify(initialSchoolLogs));
  }
  if (!localStorage.getItem(OG_PARENT_LOGS_KEY)) {
    localStorage.setItem(OG_PARENT_LOGS_KEY, JSON.stringify(initialParentLogs));
  }
  if (!localStorage.getItem(OG_SCHOOLS_KEY)) {
    localStorage.setItem(OG_SCHOOLS_KEY, JSON.stringify(initialSchools));
  }
  if (!localStorage.getItem(OG_WELFARE_LOGS_KEY)) {
    localStorage.setItem(OG_WELFARE_LOGS_KEY, JSON.stringify(initialWelfareLogs));
  }
}

function getAllStudents() {
  try {
    return JSON.parse(localStorage.getItem(OG_STORAGE_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function getStudentById(id) {
  return getAllStudents().find(function (s) { return s.id === id; }) || null;
}

// checkStudentRiskAssessmentStatus — AEGIS Standard 3.3.4 pre-guardianship risk
// assessment gating. Returns whether a student has a valid, non-expired risk
// assessment on file before a placement can proceed.
function checkStudentRiskAssessmentStatus(studentId) {
  var student = getStudentById(studentId);
  if (!student) {
    return { hasAssessment: false, isExpired: false, expiryDate: null, riskLevel: 'Unknown', canPlace: false, message: 'Student record not found.' };
  }
  var hasDoc = Boolean(student.riskAssessmentFile);
  var hasStructured = Boolean(student.riskAssessment && (student.riskAssessment.overallRiskLevel || student.riskAssessment.assessedBy));
  var expiryDate = student.riskAssessmentExpiryDate || (student.riskAssessment ? student.riskAssessment.expiryDate : null);
  if (!hasDoc && !hasStructured) {
    return { hasAssessment: false, isExpired: false, expiryDate: null, riskLevel: 'None', canPlace: false, message: 'No pre-guardianship risk assessment on file (AEGIS Standard 3.3.4).' };
  }
  var isExpired = false;
  if (expiryDate) {
    var exp = new Date(expiryDate);
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    if (!isNaN(exp.getTime()) && exp < today) {
      isExpired = true;
    }
  }
  var riskLevel = (student.riskAssessment && student.riskAssessment.overallRiskLevel) ? student.riskAssessment.overallRiskLevel : (hasDoc ? 'Document on file' : 'Unrated');
  var canPlace = !isExpired && (hasDoc || hasStructured);
  var message = canPlace
    ? 'Valid risk assessment on file (Level: ' + riskLevel + ', Valid until: ' + (expiryDate || 'N/A') + ').'
    : (isExpired ? 'Risk assessment expired on ' + expiryDate + ' — renewal required before placement.' : 'Incomplete assessment.');
  return {
    hasAssessment: hasDoc || hasStructured,
    isExpired: isExpired,
    expiryDate: expiryDate,
    riskLevel: riskLevel,
    canPlace: canPlace,
    message: message
  };
}

function saveAllStudents(students) {
  commitWithAudit(OG_STORAGE_KEY, students, 'saveAllStudents');
}

function upsertStudent(student) {
  var students = getAllStudents();
  var index = students.findIndex(function (s) { return s.id === student.id; });
  if (index > -1) {
    students[index] = student;
  } else {
    students.push(student);
  }
  saveAllStudents(students);
}

function deleteStudentById(id) {
  var students = getAllStudents().filter(function (s) { return s.id !== id; });
  saveAllStudents(students);
}

// addMedicineAdministrationRecord — AEGIS Standard 3.4.4 Medicine Administration Record (MAR).
function addMedicineAdministrationRecord(studentId, record) {
  var students = getAllStudents();
  var idx = -1;
  for (var i = 0; i < students.length; i++) {
    if (students[i].id === studentId) { idx = i; break; }
  }
  if (idx === -1) return null;
  if (!students[idx].medicineAdministrationLog) students[idx].medicineAdministrationLog = [];
  record.id = 'MAR-' + String(students[idx].medicineAdministrationLog.length + 1).padStart(3, '0');
  record.loggedAt = new Date().toISOString();
  students[idx].medicineAdministrationLog.push(record);
  saveAllStudents(students);
  return record;
}

function getAllConcerns() {
  try {
    return JSON.parse(localStorage.getItem(OG_CONCERNS_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function getConcernsByTier(tier) {
  return getAllConcerns().filter(function (c) { return c.tier === tier; });
}

initDB();

// ── Drivers ───────────────────────────────────────────────────────────────────

var OG_DRIVERS_KEY = 'og_drivers';

var initialDrivers = [
  {
    id: 'DRV84920',
    firstName: 'Matthew',
    lastName: 'Clarke',
    address: '14 Meadow Lane, Cowley, Oxford, OX4 2RN',
    mobile: '07700 900 441',
    email: 'm.clarke@oxfordguardians.co.uk',
    regNumber: 'OX21 MCL',
    carMake: 'Toyota',
    carModel: 'Prius (2021)',
    carColour: 'Silver',
    childSeat: 'Yes — standard Group 2/3 seat carried on request',
    motExpiry: '14 Mar 2027',
    insuranceExpiry: '01 Sep 2026 / Hire & reward policy',
    dbsStatus: 'clear',
    dbsCertNumber: '002-452-8831-4',
    dbsIssueDate: '12 Jan 2024',
    dbsRenewalDue: '12 Jan 2027',
    dbsUpdateService: 'Subscribed — last verified 02 Apr 2026',
    ratePerMile: '£0.55',
    waitingRate: '£18.00 / hour after 30 min free',
    billingContact: 'billing@oxfordguardians.co.uk',
    invoicingCycle: 'Monthly — NET 14',
    punctualityPct: 97,
    punctualityDetail: '97% on-time across 42 assignments (Sep 2024 – Apr 2026)',
    lateIncidents: '1 — delayed by M40 closure, 14 Nov 2024. Flagged and resolved same day.',
    parentFeedback: 'Positive. Tanaka family specified Matthew by name as preferred collector for all Yuki runs.',
    preferredAirports: 'Heathrow T2, T3, T5 / Gatwick South / Birmingham BHX',
    availability: '7 days — no Sunday runs after 22:00. 48-hour notice preferred for airport jobs.',
    languages: 'English (native) / basic Japanese phrases for student reassurance',
    notes: 'Reliable first-choice driver for airport and long-distance exeat runs. Knows CLC and Rugby School drop points. Do not double-book with same-day school collections without confirming run times.',
    linkedStudents: ['STU10492', 'STU83921', 'STU93018'],
    preferredStudentId: 'STU10492',
    compliance: {
      idDocumentPath: '',
      rightToWorkCheckPath: '',
      isCitizen: true,
      worksOutsideUK: false,
      rightToWorkExpiry: '',
      dbsNumber: '',
      dbsLastChecked: '',
      dbsCertificatePath: '',
      dbsUpdateService: false,
      dbsExpiry: '',
      reference1Path: '',
      reference2Path: '',
      livedAbroad: false,
      overseasCheckDocPath: '',
      // AEGIS 6.3 — safeguarding training is a 3-year statutory expiry for hosts/drivers.
      safeguardingTrainingDate: '2025-09-10',
      safeguardingTrainingExpiry: '2028-09-10',
      safeguardingLevel: 'Level 1 Safeguarding Awareness',
      safeguardingCertificatePath: ''
    }
  },
  {
    id: 'DRV19482',
    firstName: 'Sarah',
    lastName: 'Bennett',
    address: '3 Riverside Close, Abingdon, OX14 1GS',
    mobile: '07700 900 558',
    email: 's.bennett@oxfordguardians.co.uk',
    regNumber: 'OX19 SBN',
    carMake: 'Volkswagen',
    carModel: 'Passat Estate (2019)',
    carColour: 'Midnight Blue',
    childSeat: 'Yes — Group 1/2/3 combination seat available',
    motExpiry: '22 Jun 2026',
    insuranceExpiry: '01 Nov 2026 / Hire & reward policy',
    dbsStatus: 'clear',
    dbsCertNumber: '003-817-2245-1',
    dbsIssueDate: '04 Mar 2023',
    dbsRenewalDue: '04 Mar 2026',
    dbsUpdateService: 'Subscribed — renewal application submitted 01 Mar 2026',
    ratePerMile: '£0.52',
    waitingRate: '£16.00 / hour after 30 min free',
    billingContact: 'billing@oxfordguardians.co.uk',
    invoicingCycle: 'Monthly — NET 14',
    punctualityPct: 100,
    punctualityDetail: '100% on-time across 28 assignments (Jan 2023 – Apr 2026)',
    lateIncidents: '0 — no late or missed collections on record.',
    parentFeedback: 'Very positive. Wei family noted Sarah communicates proactively if travel plans change. Rated 5 / 5 in January 2026 survey.',
    preferredAirports: 'Heathrow T2, T4 / Birmingham BHX / Luton LTN',
    availability: 'Mon–Sat. No Sunday availability. Preferred notice: 48 hours for airport runs, 24 hours for school collections.',
    languages: 'English (native) / conversational French',
    notes: 'Primary driver for Oundle and Cambridge-corridor runs. Familiar with Peterborough station and Oundle School gate layout. Estate car ideal for oversized luggage on long-holiday collections.',
    linkedStudents: ['STU83921'],
    preferredStudentId: null,
    compliance: {
      idDocumentPath: '',
      rightToWorkCheckPath: '',
      isCitizen: false,
      worksOutsideUK: false,
      rightToWorkExpiry: '',
      dbsNumber: '',
      dbsLastChecked: '',
      dbsCertificatePath: '',
      dbsUpdateService: false,
      dbsExpiry: '',
      reference1Path: '',
      reference2Path: '',
      livedAbroad: false,
      overseasCheckDocPath: '',
      // AEGIS 6.3 — expired: renewal is overdue and should surface as a compliance breach.
      safeguardingTrainingDate: '2023-01-15',
      safeguardingTrainingExpiry: '2026-01-15',
      safeguardingLevel: 'Level 1 Safeguarding Awareness',
      safeguardingCertificatePath: ''
    }
  }
];

function initDriverDB() {
  if (!localStorage.getItem(OG_DRIVERS_KEY)) {
    localStorage.setItem(OG_DRIVERS_KEY, JSON.stringify(initialDrivers));
  }
}

function getAllDrivers() {
  try {
    return JSON.parse(localStorage.getItem(OG_DRIVERS_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function getDriverById(id) {
  return getAllDrivers().find(function (d) { return d.id === id; }) || null;
}

function saveAllDrivers(drivers) {
  commitWithAudit(OG_DRIVERS_KEY, drivers, 'saveAllDrivers');
}

function saveDriver(driver) {
  var drivers = getAllDrivers();
  var index = drivers.findIndex(function (d) { return d.id === driver.id; });
  if (index > -1) {
    drivers[index] = driver;
  } else {
    drivers.push(driver);
  }
  saveAllDrivers(drivers);
}

function deleteDriverById(id) {
  saveAllDrivers(getAllDrivers().filter(function (d) { return d.id !== id; }));
}

initDriverDB();

// ── Hosts ─────────────────────────────────────────────────────────────────────

var OG_HOSTS_KEY = 'og_hosts';

var initialHosts = [
  {
    id: 'HST29104',
    firstName: 'Eleanor',
    lastName: 'Ashworth',
    address: '47 Lonsdale Road, Summertown, Oxford, OX2 7ET',
    mobile: '07700 900 305',
    email: 'e.ashworth@gmail.com',
    preferredContact: 'WhatsApp / mobile — responds same day',
    hostSince: 'September 2022',
    capacityMax: 3,
    capacityCurrent: 2,
    currentStudents: 'Yuki Tanaka / Mei Lin',
    householdResidents: '4 — 2 adults, 2 children (ages 10 and 13)',
    smokerStatus: 'non-smoking',
    profilePhoto: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNDAgMjQwIiB3aWR0aD0iMjQwIiBoZWlnaHQ9IjI0MCI+CjxyZWN0IHdpZHRoPSIyNDAiIGhlaWdodD0iMjQwIiByeD0iMjQiIGZpbGw9IiNlMGY3ZmEiLz4KPGNpcmNsZSBjeD0iODAiIGN5PSI5MCIgcj0iMzQiIGZpbGw9IiNmM2M5YTEiLz4KPHBhdGggZD0iTTQ2IDIwMGMwLTM0IDIwLTU4IDM0LTU4czM0IDI0IDM0IDU4IiBmaWxsPSIjMGU3NDkwIi8+CjxjaXJjbGUgY3g9IjE2MCIgY3k9Ijk0IiByPSIzMiIgZmlsbD0iI2YzYzlhMSIvPgo8cGF0aCBkPSJNMTI4IDIwMGMwLTMyIDE4LTU0IDMyLTU0czMyIDIyIDMyIDU0IiBmaWxsPSIjMTY0ZTYzIi8+CjxjaXJjbGUgY3g9IjEyMCIgY3k9IjE1MCIgcj0iMjIiIGZpbGw9IiNmNmQzYWMiLz4KPHBhdGggZD0iTTk4IDIxMGMwLTIwIDEwLTM4IDIyLTM4czIyIDE4IDIyIDM4IiBmaWxsPSIjMDg5MWIyIi8+CjxjaXJjbGUgY3g9IjE4MCIgY3k9IjE1NiIgcj0iMjAiIGZpbGw9IiNmNmQzYWMiLz4KPHBhdGggZD0iTTE2MCAyMTBjMC0xOCA5LTM0IDIwLTM0czIwIDE2IDIwIDM0IiBmaWxsPSIjMDZiNmQ0Ii8+Cjx0ZXh0IHg9IjEyMCIgeT0iMjMwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiMwZjE3MmEiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkFzaHdvcnRoIEZhbWlseTwvdGV4dD4KPC9zdmc+Cg==',
    householdMembers: [
      {
        name: 'Eleanor Ashworth',
        dob: '1980-04-12',
        age: 46,
        gender: 'Female',
        occupation: 'Primary School Teacher (St Philip and James CE)',
        interests: 'Gardening, classical piano, baking, hill walking',
        religion: 'Christian (Anglican)'
      },
      {
        name: 'Richard Ashworth',
        dob: '1978-09-20',
        age: 47,
        gender: 'Male',
        occupation: 'Software Engineer (Remote)',
        interests: 'Cycling, amateur astronomy, board games, woodworking',
        religion: 'Non-religious'
      },
      {
        name: 'Thomas Ashworth',
        dob: '2012-06-15',
        age: 13,
        gender: 'Male',
        occupation: 'Secondary Student (Year 9)',
        interests: 'Football, coding, robotics',
        religion: 'Christian'
      },
      {
        name: 'Sophia Ashworth',
        dob: '2015-11-03',
        age: 10,
        gender: 'Female',
        occupation: 'Primary Student (Year 6)',
        interests: 'Swimming, drawing, reading',
        religion: 'Christian'
      }
    ],
    regularVisitors: [
      {
        id: 'VIS-01',
        name: 'Margaret Vance (Grandmother)',
        relationship: 'Maternal Grandmother',
        frequency: 'Weekly Sunday dinner visitor',
        staysOvernight: false,
        dbsStatus: 'Supervised Daytime Visitor'
      },
      {
        id: 'VIS-02',
        name: 'Arthur Vance (Grandfather)',
        relationship: 'Maternal Grandfather',
        frequency: 'Weekly Sunday dinner visitor',
        staysOvernight: false,
        dbsStatus: 'Supervised Daytime Visitor'
      }
    ],
    pets: '1 cat (Mochi) — noted in student allergy records. No students placed with cat-dander allergies.',
    overnightVisitors: 'None regular. Family must notify Oxford Guardians of any overnight guest during student placement.',
    studentBedrooms: '2 single rooms — first floor. Shared bathroom with one other resident.',
    dietaryProvision: 'Pescatarian-friendly. No nuts in household. Halal meat available on request with 48 hrs notice.',
    emergencyProvision: true,
    emergencyNoticeHours: 2,
    emergencyCapacity: 1,
    emergencyNotes: 'Primary ground-floor guest room can be prepared within 2 hours for immediate emergency or safeguarding placement.',
    availabilityCalendar: [
      { periodId: 'AUT-EXE-1', name: 'Autumn Exeat 1', dates: '25–27 Sep 2026', status: 'available', maxStudents: 2 },
      { periodId: 'AUT-HALF',  name: 'Autumn Half-Term', dates: '23 Oct – 01 Nov 2026', status: 'available', maxStudents: 2 },
      { periodId: 'AUT-EXE-2', name: 'Autumn Exeat 2', dates: '20–22 Nov 2026', status: 'available', maxStudents: 2 },
      { periodId: 'XMAS-HOL',  name: 'Christmas Holiday', dates: '11 Dec 2026 – 05 Jan 2027', status: 'unavailable', maxStudents: 0 },
      { periodId: 'SPR-EXE-1', name: 'Spring Exeat 1', dates: '22–24 Jan 2027', status: 'available', maxStudents: 2 },
      { periodId: 'SPR-HALF',  name: 'Spring Half-Term', dates: '12–21 Feb 2027', status: 'available', maxStudents: 2 },
      { periodId: 'EASTER-HOL', name: 'Easter Holiday', dates: '26 Mar – 18 Apr 2027', status: 'available', maxStudents: 2 }
    ],
    dbsStatus: 'clear',
    dbsCertNumber: '001-338-7742-6',
    dbsIssueDate: '03 Aug 2023',
    dbsRenewalDue: '03 Aug 2026',
    dbsUpdateService: 'Subscribed — last verified 10 Apr 2026',
    secondaryAdultDbs: 'Richard Ashworth — Enhanced DBS clear / issued 03 Aug 2023',
    annualVisitStatus: 'due',
    annualVisitDue: 'Due 14 May 2026',
    annualVisitLast: 'Last completed 14 May 2025',
    hsChecklist: 'complete',
    hsChecklistDetail: 'All items passed. Smoke alarms tested 14 May 2025.',
    safeRecruitment: 'Completed Sep 2022 — records held in secure documents',
    references: '2 of 2 received and verified — on file',
    punctualityPct: 100,
    punctualityDetail: '100% on-time for all school collections and drop-offs (Sep 2022 – Apr 2026)',
    welfareIncidents: '0 — no safeguarding or welfare incidents recorded in 3 years of hosting',
    parentFeedback: "Consistently positive. Tanaka family specifically praised Eleanor's warmth and communication style. Rated 5 / 5 in last parent survey (Jan 2026).",
    studentFeedback: 'Yuki Tanaka described the household as "feels like a second home." Mei Lin rated stay 9 / 10 in December 2025 feedback form.',
    completedStays: '14 student-stays across 3 academic years. Includes 3 full-term placements and 11 exeat / holiday stays.',
    notes: 'Preferred host for long-term placements. Eleanor is a primary school teacher — additional pastoral awareness noted. Richard Ashworth works remotely from home. No unaccompanied adult access concerns. Do not exceed 3-student maximum under any circumstances.',
    status: 'approved',
    linkedStudents: ['STU10492', 'STU55829'],
    preferredStudentId: 'STU10492',
    compliance: {
      idDocumentPath: '',
      rightToWorkCheckPath: '',
      isCitizen: true,
      worksOutsideUK: false,
      rightToWorkExpiry: '',
      dbsNumber: '',
      dbsLastChecked: '',
      dbsCertificatePath: '',
      dbsUpdateService: false,
      dbsExpiry: '',
      reference1Path: '',
      reference2Path: '',
      livedAbroad: false,
      overseasCheckDocPath: '',
      // AEGIS 6.3 — safeguarding training is a 3-year statutory expiry for hosts/drivers.
      safeguardingTrainingDate: '2024-05-14',
      safeguardingTrainingExpiry: '2027-05-14',
      safeguardingLevel: 'Level 1 Safeguarding Awareness',
      safeguardingCertificatePath: '',
      gasSafetyCertPath: '',
      gasSafetyExpiry: ''
    }
  },
  {
    id: 'HST74829',
    firstName: 'Helen',
    lastName: 'Finch',
    address: '12 Church Street, Wheatley, Oxford, OX33 1XP',
    mobile: '07700 900 237',
    email: 'h.finch@btinternet.com',
    preferredContact: 'Email — responds within 4 hours during school hours',
    hostSince: 'January 2023',
    capacityMax: 3,
    capacityCurrent: 1,
    currentStudents: 'Chen Wei',
    householdResidents: '2 — 2 adults, no children at home',
    smokerStatus: 'non-smoking',
    profilePhoto: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNDAgMjQwIiB3aWR0aD0iMjQwIiBoZWlnaHQ9IjI0MCI+CjxyZWN0IHdpZHRoPSIyNDAiIGhlaWdodD0iMjQwIiByeD0iMjQiIGZpbGw9IiNmZWYzZTIiLz4KPGNpcmNsZSBjeD0iOTUiIGN5PSI5NSIgcj0iMzYiIGZpbGw9IiNmM2M5YTEiLz4KPHBhdGggZD0iTTU4IDIxMGMwLTM2IDIwLTYyIDM3LTYyczM3IDI2IDM3IDYyIiBmaWxsPSIjYjQ1MzA5Ii8+CjxjaXJjbGUgY3g9IjE2NSIgY3k9Ijk4IiByPSIzNCIgZmlsbD0iI2U4YjQ4YSIvPgo8cGF0aCBkPSJNMTMwIDIxMGMwLTM0IDE4LTU4IDM1LTU4czM1IDI0IDM1IDU4IiBmaWxsPSIjNzgzNTBmIi8+Cjx0ZXh0IHg9IjEyMCIgeT0iMjMyIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiMwZjE3MmEiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkZpbmNoIEZhbWlseTwvdGV4dD4KPC9zdmc+Cg==',
    householdMembers: [
      {
        name: 'Helen Finch',
        dob: '1975-02-18',
        age: 51,
        gender: 'Female',
        occupation: 'Practice Nurse (Wheatley Surgery)',
        interests: 'Reading, local history, allotment gardening',
        religion: 'Christian (Methodist)'
      },
      {
        name: 'Robert Finch',
        dob: '1972-07-09',
        age: 54,
        gender: 'Male',
        occupation: 'Former Chef, now Freelance Food Consultant',
        interests: 'Cooking, wine tasting, walking the Ridgeway',
        religion: 'Non-religious'
      }
    ],
    regularVisitors: [
      {
        id: 'VIS-01',
        name: 'Charlotte Finch (Daughter)',
        relationship: 'Adult Daughter',
        frequency: 'Monthly weekend visitor',
        staysOvernight: true,
        dbsStatus: 'Enhanced DBS clear'
      }
    ],
    pets: 'None',
    overnightVisitors: 'Occasional weekend guests. Finch family notify Oxford Guardians in advance when students are in placement.',
    studentBedrooms: '2 single rooms — ground floor. En-suite available for the primary student room.',
    dietaryProvision: 'Flexible. Robert Finch is a former chef — dietary preferences accommodated with advance notice. No nut products kept in the house.',
    emergencyProvision: true,
    emergencyNoticeHours: 4,
    emergencyCapacity: 1,
    emergencyNotes: 'Robert Finch available during daytime. Can accommodate short-notice emergency exeat or suspension placement.',
    availabilityCalendar: [
      { periodId: 'AUT-EXE-1', name: 'Autumn Exeat 1', dates: '25–27 Sep 2026', status: 'available', maxStudents: 2 },
      { periodId: 'AUT-HALF',  name: 'Autumn Half-Term', dates: '23 Oct – 01 Nov 2026', status: 'available', maxStudents: 2 },
      { periodId: 'AUT-EXE-2', name: 'Autumn Exeat 2', dates: '20–22 Nov 2026', status: 'unavailable', maxStudents: 0 },
      { periodId: 'XMAS-HOL',  name: 'Christmas Holiday', dates: '11 Dec 2026 – 05 Jan 2027', status: 'available', maxStudents: 2 },
      { periodId: 'SPR-EXE-1', name: 'Spring Exeat 1', dates: '22–24 Jan 2027', status: 'available', maxStudents: 2 },
      { periodId: 'SPR-HALF',  name: 'Spring Half-Term', dates: '12–21 Feb 2027', status: 'available', maxStudents: 2 },
      { periodId: 'EASTER-HOL', name: 'Easter Holiday', dates: '26 Mar – 18 Apr 2027', status: 'available', maxStudents: 2 }
    ],
    dbsStatus: 'clear',
    dbsCertNumber: '004-901-5563-8',
    dbsIssueDate: '18 Nov 2022',
    dbsRenewalDue: '18 Nov 2025',
    dbsUpdateService: 'Subscribed — last verified 15 Apr 2026. Renewal certificate pending.',
    secondaryAdultDbs: 'Robert Finch — Enhanced DBS clear / issued 18 Nov 2022 / renewal also pending',
    annualVisitStatus: 'complete',
    annualVisitDue: 'Due 10 Jan 2027',
    annualVisitLast: 'Last completed 10 Jan 2026',
    hsChecklist: 'complete',
    hsChecklistDetail: 'All items passed. Fire escape route confirmed. First aid kit restocked Jan 2026.',
    safeRecruitment: 'Completed Jan 2023 — records held in secure documents',
    references: '2 of 2 received and verified — on file',
    punctualityPct: 95,
    punctualityDetail: '95% on-time for school collections and drop-offs (Jan 2023 – Apr 2026)',
    welfareIncidents: '0 — no safeguarding or welfare incidents on record',
    parentFeedback: 'Very positive. Wei family noted the home environment felt warm and well-structured. Rated 4.5 / 5 in January 2026 survey.',
    studentFeedback: 'Chen Wei reported feeling comfortable and well-fed. Flagged mild homesickness in first week of Easter 2026 — host handled it well.',
    completedStays: '6 student-stays across 2 academic years. Includes 1 full Easter placement and 5 exeat / holiday stays.',
    notes: 'Solid placement family for Oundle students given proximity to Oxford and Peterborough rail corridor. Robert Finch availability during the day is an asset for student supervision. DBS renewals to be chased — both expire Nov 2025 but update service subscriptions are confirmed.',
    status: 'approved',
    linkedStudents: ['STU83921'],
    preferredStudentId: null,
    compliance: {
      idDocumentPath: '',
      rightToWorkCheckPath: '',
      isCitizen: false,
      worksOutsideUK: false,
      rightToWorkExpiry: '',
      dbsNumber: '',
      dbsLastChecked: '',
      dbsCertificatePath: '',
      dbsUpdateService: false,
      dbsExpiry: '',
      reference1Path: '',
      reference2Path: '',
      livedAbroad: false,
      overseasCheckDocPath: '',
      // AEGIS 6.3 — expired: renewal is overdue and should surface as a compliance breach.
      safeguardingTrainingDate: '2022-11-18',
      safeguardingTrainingExpiry: '2025-11-18',
      safeguardingLevel: 'Level 1 Safeguarding Awareness',
      safeguardingCertificatePath: '',
      gasSafetyCertPath: '',
      gasSafetyExpiry: ''
    }
  }
];

function initHostDB() {
  if (!localStorage.getItem(OG_HOSTS_KEY)) {
    localStorage.setItem(OG_HOSTS_KEY, JSON.stringify(initialHosts));
  }
}

function getAllHosts() {
  try {
    return JSON.parse(localStorage.getItem(OG_HOSTS_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function getHostById(id) {
  return getAllHosts().find(function (h) { return h.id === id; }) || null;
}

function getHomestaysForStudent(studentId) {
  if (!studentId) return [];
  return getAllHosts().filter(function (h) {
    return Array.isArray(h.linkedStudents) && h.linkedStudents.indexOf(studentId) > -1;
  });
}

// AEGIS 5.3.1 — shareable, presentation-ready host profile for students, parents and agents.
// Supports optional contact redaction so sensitive contact details can be withheld pre-placement.
function getShareableHostProfile(hostId, options) {
  var host = getHostById(hostId);
  if (!host) return null;
  var opts = options || {};
  var redact = opts.redactContact === true;
  return {
    id: host.id,
    familyName: host.lastName + ' Family',
    hostNames: host.firstName + (host.householdMembers && host.householdMembers.length > 1 ? ' & ' + host.householdMembers[1].name.split(' ')[0] : ''),
    profilePhoto: host.profilePhoto || null,
    status: host.status || 'approved',
    hostSince: host.hostSince || '—',
    capacityMax: host.capacityMax || 2,
    capacityCurrent: host.capacityCurrent || 0,
    address: redact ? 'Summertown, Oxford (Full address provided upon placement confirmation)' : host.address,
    area: 'Summertown, Oxford, Oxfordshire',
    phone: redact ? '+44 7700 900 999 (Oxford Guardians 24/7 Office)' : (host.mobile || host.phone),
    email: redact ? 'welfare@oxfordguardians.co.uk' : host.email,
    isRedacted: redact,
    smokerStatus: host.smokerStatus || 'non-smoking',
    smokerPolicyText: host.smokerStatus === 'non-smoking'
      ? 'Strictly non-smoking household (no smokers resident or visiting).'
      : (host.smokerStatus === 'smoker-outside' ? 'Smoking permitted outside property in garden only.' : 'Smoking permitted on premises.'),
    pets: host.pets || 'None',
    dietaryProvision: host.dietaryProvision || 'Standard family meals accommodated.',
    studentBedrooms: host.studentBedrooms || 'Single furnished student bedroom.',
    rooms: host.rooms || [],
    householdMembers: (host.householdMembers || []).map(function(m) {
      return {
        name: m.name,
        age: m.age,
        gender: m.gender || '—',
        occupation: m.occupation || '—',
        interests: m.interests || '—',
        religion: m.religion || '—'
      };
    }),
    regularVisitorsSummary: (host.regularVisitors || []).length > 0
      ? (host.regularVisitors.length + ' regular daytime visitor(s) registered and vetted under AEGIS policy.')
      : 'No regular external visitors.',
    safeguardingSummary: 'Fully AEGIS compliant. Enhanced DBS clear, annual home inspection verified, and Level 1 Safeguarding completed.',
    notes: host.notes || ''
  };
}

// AEGIS 5.4.1 / 2.6 — live supply-vs-demand analytics: standard bed headroom plus emergency standby buffer.
function getHomestaySupplyAnalytics() {
  var hosts = getAllHosts();
  var students = getAllStudents();
  var approvedHosts = hosts.filter(function(h) { return h.status === 'approved'; });
  var totalApprovedBeds = 0;
  var totalOccupiedBeds = 0;
  var emergencyReadyHosts = 0;
  var emergencyStandbyBeds = 0;
  approvedHosts.forEach(function(h) {
    totalApprovedBeds += (parseInt(h.capacityMax, 10) || 0);
    totalOccupiedBeds += (parseInt(h.capacityCurrent, 10) || 0);
    if (h.emergencyProvision) {
      emergencyReadyHosts++;
      emergencyStandbyBeds += (parseInt(h.emergencyCapacity, 10) || 1);
    }
  });
  var availableStandardBeds = Math.max(0, totalApprovedBeds - totalOccupiedBeds);
  var totalCaseload = students.length || 1;
  var supplyRatioPct = Math.round((totalApprovedBeds / Math.max(1, totalOccupiedBeds || totalCaseload)) * 100);
  var isSufficient = availableStandardBeds > 0 && emergencyStandbyBeds >= 2;
  return {
    totalApprovedHosts: approvedHosts.length,
    totalApprovedBeds: totalApprovedBeds,
    totalOccupiedBeds: totalOccupiedBeds,
    availableStandardBeds: availableStandardBeds,
    emergencyReadyHosts: emergencyReadyHosts,
    emergencyStandbyBeds: emergencyStandbyBeds,
    totalCaseload: totalCaseload,
    supplyRatioPct: supplyRatioPct,
    isSufficient: isSufficient,
    statusBadge: isSufficient ? 'Sufficient Headroom & Emergency Buffer Met' : 'Capacity Warning — Low Emergency Standby Headroom'
  };
}

function saveAllHosts(hosts) {
  commitWithAudit(OG_HOSTS_KEY, hosts, 'saveAllHosts');
}

function saveHost(host) {
  var hosts = getAllHosts();
  var index = hosts.findIndex(function (h) { return h.id === host.id; });
  if (index > -1) {
    hosts[index] = host;
  } else {
    hosts.push(host);
  }
  saveAllHosts(hosts);
}

function deleteHostById(id) {
  saveAllHosts(getAllHosts().filter(function (h) { return h.id !== id; }));
}

// AEGIS Standard 5.1.3 — multi-member homestay household vetting (Single Central
// Record). Extends the existing host.householdMembers array (already used by
// getShareableHostProfile() for the narrative family-profile widget) with the
// DBS / barred-list / self-declaration fields required to vet every household
// member aged 16+. `name`/`fullName` are kept in sync so both surfaces read correctly.
function generateHouseholdMemberId() {
  var maxNum = 0;
  getAllHosts().forEach(function (h) {
    (h.householdMembers || []).forEach(function (m) {
      var num = parseInt(String(m.id || '').replace('MEM-', ''), 10);
      if (!isNaN(num) && num > maxNum) maxNum = num;
    });
  });
  return 'MEM-' + String(maxNum + 1).padStart(5, '0');
}

function saveHostHouseholdMember(hostId, member) {
  var hosts = getAllHosts();
  var host = hosts.find(function (h) { return h.id === hostId; });
  if (!host) return null;
  if (!Array.isArray(host.householdMembers)) host.householdMembers = [];

  if (!member.id) {
    member.id = generateHouseholdMemberId();
  }
  if (!member.fullName && member.name) member.fullName = member.name;
  if (!member.name && member.fullName) member.name = member.fullName;
  if (typeof member.isOver16 !== 'boolean' && member.dob) {
    var dobDate = new Date(member.dob);
    if (!isNaN(dobDate.getTime())) {
      var ageYears = (Date.now() - dobDate.getTime()) / (365.25 * 24 * 60 * 60 * 1000);
      member.isOver16 = ageYears >= 16;
    }
  }
  if (!member.residentStatus) member.residentStatus = 'Permanent';
  if (!member.dbsStatus) member.dbsStatus = 'pending';
  member.updatedAt = new Date().toISOString();

  var idx = host.householdMembers.findIndex(function (m) { return m.id === member.id; });
  if (idx > -1) {
    host.householdMembers[idx] = Object.assign({}, host.householdMembers[idx], member);
  } else {
    host.householdMembers.push(member);
  }
  saveAllHosts(hosts);
  return member.id;
}

function deleteHostHouseholdMember(hostId, memberId) {
  var hosts = getAllHosts();
  var host = hosts.find(function (h) { return h.id === hostId; });
  if (!host) return false;
  host.householdMembers = (host.householdMembers || []).filter(function (m) { return m.id !== memberId; });
  saveAllHosts(hosts);
  return true;
}

initHostDB();

// ── Incidents (Accident Book — AEGIS Standard 5.10.1.2) ─────────────────────────

var initialIncidents = [
  {
    id: 'INC00001',
    category: 'Homestay',
    affectedRole: 'Student',
    personId: 'STU001',
    personName: 'Yuki Tanaka',
    hostId: 'HST29104',
    hostName: 'Ashworth Family',
    date: '2026-03-28',
    time: '18:45',
    location: 'Homestay — Kitchen',
    incidentType: 'Minor injury / Accident',
    severity: 'Minor — first aid only',
    description: 'Student touched hot baking tray while assisting host in kitchen. Small burn on index finger with minor blister.',
    actionTaken: 'Cold running water applied for 10 minutes. Burn gel and sterile dressing applied. Parent informed via WhatsApp.',
    reportedBy: 'Eleanor Ashworth (Host)',
    firstAider: 'Eleanor Ashworth (Certified First Aider)',
    hospitalAttended: 'no',
    riddorReportable: 'no',
    status: 'Resolved',
    loggedBy: 'Jay Ray (DSL)',
    medicationDetails: '',
    notifications: { parents: true, school: false, dsl: true }
  },
  {
    id: 'INC00002',
    category: 'Homestay',
    affectedRole: 'Host',
    personId: 'HST29104',
    personName: 'Richard Ashworth (Host Carer)',
    hostId: 'HST29104',
    hostName: 'Ashworth Family',
    date: '2026-02-14',
    time: '08:15',
    location: 'Homestay — Rear Garden Pathway',
    incidentType: 'Slip / Trip / Fall',
    severity: 'Minor — first aid only',
    description: 'Host carer slipped on icy flagstone whilst securing side gate before school drop-off. Mild bruise on left elbow; no student involved.',
    actionTaken: 'Ice compress applied. Path cleared and salted immediately to prevent further slip risk.',
    reportedBy: 'Richard Ashworth (Host)',
    firstAider: 'Eleanor Ashworth',
    hospitalAttended: 'no',
    riddorReportable: 'no',
    status: 'Resolved',
    loggedBy: 'Jay Ray (DSL)',
    medicationDetails: '',
    notifications: { parents: false, school: false, dsl: false }
  },
  {
    id: 'INC00003',
    category: 'Head Office',
    affectedRole: 'Staff',
    personId: 'STF001',
    personName: 'Jay Ray (DSL / Operations Lead)',
    hostId: '',
    hostName: '',
    date: '2026-01-22',
    time: '11:30',
    location: 'Oxford Guardians Main Office — Meeting Room 2',
    incidentType: 'Slip / Trip / Fall',
    severity: 'Minor — first aid only',
    description: 'Staff member tripped over temporary laptop extension cable during term briefing. Minor strain to right ankle.',
    actionTaken: 'Ice pack applied and rested for 20 mins. Cable tidy channel installed across floor to eliminate trip hazard.',
    reportedBy: 'Sarah Jenkins (Staff)',
    firstAider: 'Sarah Jenkins (First Aid at Work)',
    hospitalAttended: 'no',
    riddorReportable: 'no',
    status: 'Resolved',
    loggedBy: 'Sarah Jenkins (Operations Officer)',
    medicationDetails: '',
    notifications: { parents: false, school: false, dsl: false }
  },
  {
    id: 'INC00004',
    category: 'Transport',
    affectedRole: 'Driver',
    personId: 'DRV001',
    personName: 'David Palmer (Approved Driver)',
    hostId: '',
    hostName: '',
    date: '2026-03-15',
    time: '16:10',
    location: 'Oxford Railway Station Drop-Off Bay',
    incidentType: 'Road Traffic / Travel Incident',
    severity: 'Minor — first aid only',
    description: 'Minor low-speed scrape to passenger side wing mirror against parking bollard while manoeuvring in tight station drop-off bay. Student Chen Wei was safely seated with belt on; uninjured and calm.',
    actionTaken: 'Vehicle inspected, student reassured and escorted safely to platform. Replacement mirror installed and vehicle safety re-checked.',
    reportedBy: 'David Palmer (Driver)',
    firstAider: 'N/A',
    hospitalAttended: 'no',
    riddorReportable: 'no',
    status: 'Resolved',
    loggedBy: 'Jay Ray (DSL)',
    medicationDetails: '',
    notifications: { parents: true, school: false, dsl: true }
  },
  {
    id: 'INC00005',
    category: 'Homestay',
    affectedRole: 'Student',
    personId: 'STU003',
    personName: 'Daniel Kim',
    hostId: 'HST39402',
    hostName: 'Brennan Family',
    date: '2025-11-02',
    time: '20:15',
    location: 'Homestay — Main Staircase',
    incidentType: 'Slip / Trip / Fall',
    severity: 'Minor — first aid only',
    description: 'Student slipped on bottom two steps wearing woollen socks. Sustained bruised knee. No structural injury.',
    actionTaken: 'Cold compress and arnica cream applied. Host provided anti-slip indoor slippers.',
    reportedBy: 'Patricia Brennan (Host)',
    firstAider: 'Patricia Brennan',
    hospitalAttended: 'no',
    riddorReportable: 'no',
    status: 'Resolved',
    loggedBy: 'Jay Ray (DSL)',
    medicationDetails: '',
    notifications: { parents: true, school: false, dsl: false }
  }
];

function initIncidentDB() {
  var stored = localStorage.getItem(OG_INCIDENTS_KEY);
  if (!stored || stored === '[]') {
    localStorage.setItem(OG_INCIDENTS_KEY, JSON.stringify(initialIncidents));
  }
}

function getAllIncidents() {
  try {
    return JSON.parse(localStorage.getItem(OG_INCIDENTS_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function getIncidentById(id) {
  return getAllIncidents().find(function (inc) { return inc.id === id; }) || null;
}

function saveAllIncidents(incidents) {
  commitWithAudit(OG_INCIDENTS_KEY, incidents, 'saveAllIncidents');
}

function saveIncident(incident) {
  var incidents = getAllIncidents();
  var index = incidents.findIndex(function (inc) { return inc.id === incident.id; });
  if (index > -1) {
    incidents[index] = incident;
  } else {
    incidents.push(incident);
  }
  saveAllIncidents(incidents);
}

function deleteIncidentById(id) {
  saveAllIncidents(getAllIncidents().filter(function (inc) { return inc.id !== id; }));
}

function generateIncidentId() {
  var incidents = getAllIncidents();
  var maxNum = 0;
  incidents.forEach(function (inc) {
    var num = parseInt(inc.id.replace('INC', ''), 10);
    if (num > maxNum) maxNum = num;
  });
  var next = maxNum + 1;
  return 'INC' + String(next).padStart(5, '0');
}

initIncidentDB();

// ── Staff ──────────────────────────────────────────────────────────────────────

var initialStaff = [
  {
    id: 'STF00001',
    firstName: 'Jay',
    lastName: 'Ray',
    email: 'jay.ray@oxfordguardians.co.uk',
    phone: '+44 7700 900 999',
    role: 'Admin / DSL',
    title: 'Safeguarding lead',
    status: 'Active',
    primaryWork: 'Safeguarding governance, casework triage, policy approval, external referrals, DSL escalation contact',
    dbsStatus: 'clear',
    dbsCertNumber: '005-112-9934-7',
    dbsIssueDate: '08 Jan 2026',
    dbsRenewalDue: '08 Jan 2029',
    dbsUpdateService: 'Subscribed — last verified 10 Apr 2026',
    trainingLevel: 'DSL Level 3',
    trainingDate: '12 May 2026',
    trainingExpiry: 'May 2028',
    startDate: 'September 2021',
    emergencyRota: 'Overnight (22:00–08:00) primary, Weekends DSL escalation',
    notes: 'Designated Safeguarding Lead. Always reachable for DSL escalation including weekends and bank holidays. Holds ultimate sign-off on concern case triage and external referrals.',
    compliance: {
      idDocumentPath: '',
      rightToWorkCheckPath: '',
      isCitizen: true,
      worksOutsideUK: false,
      rightToWorkExpiry: '',
      dbsNumber: '',
      dbsLastChecked: '',
      dbsCertificatePath: '',
      dbsUpdateService: false,
      dbsExpiry: '',
      reference1Path: '',
      reference2Path: '',
      livedAbroad: false,
      overseasCheckDocPath: '',
      safeguardingTrainingDate: '',
      safeguardingCertificatePath: '',
      // AEGIS 6.3.3 — annual safeguarding update, separate from initial training above.
      annualSafeguardingUpdateDate: '2025-09-01',
      annualSafeguardingUpdateNotes: 'Annual Staff Safeguarding & KCSIE Refresher'
    }
  },
  {
    id: 'STF00002',
    firstName: 'Zuko',
    lastName: 'Fire',
    email: 'zuko.fire@oxfordguardians.co.uk',
    phone: '+44 7700 900 888',
    role: 'Admin / Operations',
    title: 'Operations director',
    status: 'Active',
    primaryWork: 'Database integrity, user account management, logistics override, compliance auditing, system configuration',
    dbsStatus: 'clear',
    dbsCertNumber: '005-223-8812-3',
    dbsIssueDate: '08 Jan 2026',
    dbsRenewalDue: '08 Jan 2029',
    dbsUpdateService: 'Subscribed — last verified 10 Apr 2026',
    trainingLevel: 'DSL Level 3',
    trainingDate: '12 May 2026',
    trainingExpiry: 'May 2028',
    startDate: 'September 2021',
    emergencyRota: 'Mon–Fri daytime (08:00–18:00) primary',
    notes: 'Operations director with secondary DSL Level 3 authority. Manages driver billing, host onboarding pipeline, and operational override decisions.',
    compliance: {
      idDocumentPath: '',
      rightToWorkCheckPath: '',
      isCitizen: false,
      worksOutsideUK: true,
      rightToWorkExpiry: '',
      dbsNumber: '',
      dbsLastChecked: '',
      dbsCertificatePath: '',
      dbsUpdateService: false,
      dbsExpiry: '',
      reference1Path: '',
      reference2Path: '',
      livedAbroad: false,
      overseasCheckDocPath: '',
      safeguardingTrainingDate: '',
      safeguardingCertificatePath: '',
      // AEGIS 6.3.3 — annual safeguarding update, separate from initial training above.
      annualSafeguardingUpdateDate: '2025-09-01',
      annualSafeguardingUpdateNotes: 'Annual Staff Safeguarding & KCSIE Refresher'
    }
  },
  {
    id: 'STF00003',
    firstName: 'Priya',
    lastName: 'Shah',
    email: 'priya.shah@oxfordguardians.co.uk',
    phone: '+44 7700 900 777',
    role: 'Admin / Local coordinator',
    title: 'Travel and host liaison',
    status: 'Active',
    primaryWork: 'Airport pickup coordination, host family handoffs, exeat logistics, school collection scheduling, parent travel communication',
    dbsStatus: 'clear',
    dbsCertNumber: '005-334-7745-9',
    dbsIssueDate: '15 Mar 2025',
    dbsRenewalDue: '15 Mar 2028',
    dbsUpdateService: 'Subscribed — last verified 01 Apr 2026',
    trainingLevel: 'Safeguarding Awareness',
    trainingDate: '20 Sep 2025',
    trainingExpiry: 'Sep 2027',
    startDate: 'March 2023',
    emergencyRota: 'Mon–Fri evening (18:00–22:00) primary',
    notes: 'Local coordinator handling ground logistics. Requires operational visibility for pickups, exeats, emergency contacts, and host handoffs. Should not hold broad access to policy control or DSL-only safeguarding records.',
    compliance: {
      idDocumentPath: '',
      rightToWorkCheckPath: '',
      isCitizen: false,
      worksOutsideUK: false,
      rightToWorkExpiry: '',
      dbsNumber: '',
      dbsLastChecked: '',
      dbsCertificatePath: '',
      dbsUpdateService: false,
      dbsExpiry: '',
      reference1Path: '',
      reference2Path: '',
      livedAbroad: false,
      overseasCheckDocPath: '',
      safeguardingTrainingDate: '',
      safeguardingCertificatePath: '',
      // AEGIS 6.3.3 — annual safeguarding update, separate from initial training above.
      annualSafeguardingUpdateDate: '2025-09-01',
      annualSafeguardingUpdateNotes: 'Annual Staff Safeguarding & KCSIE Refresher'
    }
  }
];

function initStaffDB() {
  if (!localStorage.getItem(OG_STAFF_KEY)) {
    localStorage.setItem(OG_STAFF_KEY, JSON.stringify(initialStaff));
  }
}

function getAllStaff() {
  try {
    return JSON.parse(localStorage.getItem(OG_STAFF_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function getStaffById(id) {
  return getAllStaff().find(function (s) { return s.id === id; }) || null;
}

function saveAllStaff(staff) {
  commitWithAudit(OG_STAFF_KEY, staff, 'saveAllStaff');
}

function saveStaffMember(member) {
  var staff = getAllStaff();
  var index = staff.findIndex(function (s) { return s.id === member.id; });
  if (index > -1) {
    staff[index] = member;
  } else {
    staff.push(member);
  }
  saveAllStaff(staff);
}

function deleteStaffById(id) {
  saveAllStaff(getAllStaff().filter(function (s) { return s.id !== id; }));
}

function generateStaffId() {
  var staff = getAllStaff();
  var maxNum = 0;
  staff.forEach(function (s) {
    var num = parseInt(s.id.replace('STF', ''), 10);
    if (!isNaN(num) && num > maxNum) maxNum = num;
  });
  var next = maxNum + 1;
  return 'STF' + String(next).padStart(5, '0');
}

initStaffDB();

// ── Parents ────────────────────────────────────────────────────────────────────

var OG_PARENTS_KEY = 'og_parents';

var initialParents = [
  {
    id: 'PAR00001',
    firstName: 'Haruka',
    lastName: 'Tanaka',
    email: 'haruka.tanaka@example.jp',
    phone: '+81 90 4472 1842',
    relationship: 'Mother / legal guardian',
    linkedStudentIds: ['STU10492'],
    status: 'Active',
    address: 'Tokyo, Japan',
    preferredContact: 'Email — responds within 24 hours (time zone)',
    language: 'Japanese / English',
    notes: 'Primary contact for Yuki. Specified Matthew Clarke by name as preferred driver for all airport runs.'
  },
  {
    id: 'PAR00002',
    firstName: 'Kenji',
    lastName: 'Tanaka',
    email: 'kenji.tanaka@example.jp',
    phone: '',
    relationship: 'Father',
    linkedStudentIds: ['STU10492'],
    status: 'Active',
    address: 'Tokyo, Japan',
    preferredContact: 'Via Haruka Tanaka (primary contact)',
    language: 'Japanese',
    notes: 'Secondary contact. Prefers communication through Haruka.'
  },
  {
    id: 'PAR00003',
    firstName: 'Wei',
    lastName: 'Jianming',
    email: 'jianming.wei@example.cn',
    phone: '+86 138 0000 1234',
    relationship: 'Father / legal guardian',
    linkedStudentIds: ['STU83921'],
    status: 'Active',
    address: 'Shanghai, China',
    preferredContact: 'WeChat / email',
    language: 'Mandarin / English',
    notes: 'Single registered parent contact for Chen Wei.'
  },
  {
    id: 'PAR00004',
    firstName: 'Ivanka',
    lastName: 'Petrova',
    email: 'ivanka.petrova@example.bg',
    phone: '+359 88 000 0001',
    relationship: 'Mother / legal guardian',
    linkedStudentIds: ['STU47291'],
    status: 'Active',
    address: 'Sofia, Bulgaria',
    preferredContact: 'Email',
    language: 'Bulgarian / English',
    notes: 'Primary contact for Sofia Petrova. New family — arrival workflow pending.'
  },
  {
    id: 'PAR00005',
    firstName: 'Kim',
    lastName: 'Jisoo',
    email: 'jisoo.kim@example.kr',
    phone: '+82 10 0000 5678',
    relationship: 'Mother / legal guardian',
    linkedStudentIds: ['STU93018'],
    status: 'Active',
    address: 'Seoul, South Korea',
    preferredContact: 'KakaoTalk / email',
    language: 'Korean / English',
    notes: 'Primary contact for Daniel Kim. Weekend and exeat placement family.'
  }
];

function initParentDB() {
  if (!localStorage.getItem(OG_PARENTS_KEY)) {
    localStorage.setItem(OG_PARENTS_KEY, JSON.stringify(initialParents));
  }
}

function getAllParents() {
  try {
    return JSON.parse(localStorage.getItem(OG_PARENTS_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function getParentById(id) {
  return getAllParents().find(function (p) { return p.id === id; }) || null;
}

function saveAllParents(parents) {
  commitWithAudit(OG_PARENTS_KEY, parents, 'saveAllParents');
}

function saveParent(parent) {
  var parents = getAllParents();
  var index = parents.findIndex(function (p) { return p.id === parent.id; });
  if (index > -1) {
    parents[index] = parent;
  } else {
    parents.push(parent);
  }
  saveAllParents(parents);
}

function deleteParentById(id) {
  saveAllParents(getAllParents().filter(function (p) { return p.id !== id; }));
}

function generateParentId() {
  var parents = getAllParents();
  var maxNum = 0;
  parents.forEach(function (p) {
    var num = parseInt(p.id.replace('PAR', ''), 10);
    if (!isNaN(num) && num > maxNum) maxNum = num;
  });
  var next = maxNum + 1;
  return 'PAR' + String(next).padStart(5, '0');
}

initParentDB();

// ── Transports ────────────────────────────────────────────────────────────────

var OG_TRANSPORTS_KEY = 'og_transports';

var initialTransports = [];

function initTransportDB() {
  if (!localStorage.getItem(OG_TRANSPORTS_KEY)) {
    localStorage.setItem(OG_TRANSPORTS_KEY, JSON.stringify(initialTransports));
  }
}

function getAllTransports() {
  try {
    return JSON.parse(localStorage.getItem(OG_TRANSPORTS_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function getTransportById(id) {
  return getAllTransports().find(function (t) { return t.id === id; }) || null;
}

function saveAllTransports(transports) {
  commitWithAudit(OG_TRANSPORTS_KEY, transports, 'saveAllTransports');
}

var TRAVEL_TASK_NAMES = [
  'Confirmation with parent',
  'Confirmation with driver',
  'Arrival confirmation',
  'Departure confirmation',
  'Return trip?'
];

function saveTransport(transport) {
  var transports = getAllTransports();
  var index = transports.findIndex(function (t) { return t.id === transport.id; });
  var isNew = index === -1;
  if (isNew) {
    transports.push(transport);
  } else {
    transports[index] = transport;
  }
  saveAllTransports(transports);

  if (isNew) {
    var travelTodos = getAllTravelTodos();
    TRAVEL_TASK_NAMES.forEach(function (taskName, i) {
      var todo = {
        id:          'TRAVEL-TODO-' + transport.id + '-' + (i + 1),
        transportId: transport.id,
        taskName:    taskName,
        status:      'Pending'
      };
      if (taskName === 'Return trip?') {
        todo.isReturnTripTask = true;
      }
      travelTodos.push(todo);
    });
    saveAllTravelTodos(travelTodos);
  }
}

function getAllTravelTodos() {
  try { return JSON.parse(localStorage.getItem(OG_TRAVEL_TODOS_KEY)) || []; } catch (e) { return []; }
}

function saveTravelTodo(todo) {
  var todos = getAllTravelTodos();
  var index = todos.findIndex(function (t) { return t.id === todo.id; });
  if (index > -1) {
    todos[index] = todo;
  } else {
    todos.push(todo);
  }
  saveAllTravelTodos(todos);
}

function saveAllTravelTodos(todos) {
  commitWithAudit(OG_TRAVEL_TODOS_KEY, todos, 'saveAllTravelTodos');
}

function deleteTransportById(id) {
  saveAllTransports(getAllTransports().filter(function (t) { return t.id !== id; }));
}

initTransportDB();

// ── Finance Documents (seed) ──────────────────────────────────────────────────

var OG_FINANCE_DOCS_KEY = 'finance_docs';

var initialFinanceDocs = [
  { name: 'Guardian Services Agreement — Tanaka Family',   person: 'Tanaka Family',   personId: 'PAR00001', subType: 'Contract',  date: '01 Sep 2025' },
  { name: 'Guardian Services Agreement — Wei Family',      person: 'Wei Family',      personId: 'PAR00003', subType: 'Contract',  date: '01 Sep 2025' },
  { name: 'Guardian Services Agreement — Petrova Family',  person: 'Petrova Family',  personId: 'PAR00004', subType: 'Contract',  date: '15 Apr 2026' },
  { name: 'Invoice — Spring Term 2026 (Tanaka)',           person: 'Tanaka Family',   personId: 'PAR00001', subType: 'Invoice',   date: '01 Jan 2026' },
  { name: 'Invoice — Spring Term 2026 (Wei)',              person: 'Wei Family',      personId: 'PAR00003', subType: 'Invoice',   date: '01 Jan 2026' },
  { name: 'Driver Billing Statement — Matthew Clarke (Q1 2026)', person: 'Matthew Clarke', personId: 'DRV84920', subType: 'Billing', date: '01 Apr 2026' },
  { name: 'Driver Billing Statement — Sarah Bennett (Q1 2026)',  person: 'Sarah Bennett',  personId: 'DRV19482', subType: 'Billing', date: '01 Apr 2026' }
];

function initFinanceDocsDB() {
  if (!localStorage.getItem(OG_FINANCE_DOCS_KEY)) {
    localStorage.setItem(OG_FINANCE_DOCS_KEY, JSON.stringify(initialFinanceDocs));
  }
}

function getAllFinanceDocs() {
  try { return JSON.parse(localStorage.getItem(OG_FINANCE_DOCS_KEY)) || []; } catch (e) { return []; }
}

initFinanceDocsDB();

// ── Finance: Expenses & Income (AEGIS Standard 2.9) ───────────────────────────

var OG_FINANCE_EXPENSES_KEY = 'og_finance_events';  // backward-compatible with tracker
var OG_FINANCE_INCOME_KEY   = 'og_revenue_events';

function getAllFinanceExpenses() {
  try { return JSON.parse(localStorage.getItem(OG_FINANCE_EXPENSES_KEY)) || []; } catch (e) { return []; }
}

function getFinanceExpenseById(id) {
  return getAllFinanceExpenses().find(function (e) { return e.id === id; }) || null;
}

function generateFinanceExpenseId() {
  var expenses = getAllFinanceExpenses();
  var maxNum = 0;
  expenses.forEach(function (e) {
    var num = parseInt(String(e.id || '').replace('EXP-', ''), 10);
    if (!isNaN(num) && num > maxNum) maxNum = num;
  });
  return 'EXP-' + String(maxNum + 1).padStart(4, '0');
}

function saveFinanceExpense(expense) {
  var expenses = getAllFinanceExpenses();
  if (!expense.id) expense.id = generateFinanceExpenseId();
  var index = expenses.findIndex(function (e) { return e.id === expense.id; });
  if (index > -1) { expenses[index] = expense; } else { expenses.push(expense); }
  commitWithAudit(OG_FINANCE_EXPENSES_KEY, expenses, 'saveFinanceExpense');
  return expense.id;
}

function deleteFinanceExpense(id) {
  var expenses = getAllFinanceExpenses().filter(function (e) { return e.id !== id; });
  localStorage.setItem(OG_FINANCE_EXPENSES_KEY, JSON.stringify(expenses));
}

function getAllFinanceIncome() {
  try { return JSON.parse(localStorage.getItem(OG_FINANCE_INCOME_KEY)) || []; } catch (e) { return []; }
}

function getFinanceIncomeById(id) {
  return getAllFinanceIncome().find(function (i) { return i.id === id; }) || null;
}

function generateFinanceIncomeId() {
  var income = getAllFinanceIncome();
  var maxNum = 0;
  income.forEach(function (i) {
    var num = parseInt(String(i.id || '').replace('INC-', ''), 10);
    if (!isNaN(num) && num > maxNum) maxNum = num;
  });
  return 'INC-' + String(maxNum + 1).padStart(4, '0');
}

function saveFinanceIncome(income) {
  var records = getAllFinanceIncome();
  if (!income.id) income.id = generateFinanceIncomeId();
  var index = records.findIndex(function (i) { return i.id === income.id; });
  if (index > -1) { records[index] = income; } else { records.push(income); }
  commitWithAudit(OG_FINANCE_INCOME_KEY, records, 'saveFinanceIncome');
  return income.id;
}

function deleteFinanceIncome(id) {
  var records = getAllFinanceIncome().filter(function (i) { return i.id !== id; });
  localStorage.setItem(OG_FINANCE_INCOME_KEY, JSON.stringify(records));
}

// ── Student Held Funds (AEGIS Standard 2.9.2) ─────────────────────────────────

var OG_STUDENT_HELD_FUNDS_KEY = 'og_student_held_funds';

var initialStudentHeldFunds = [
  { id: 'DEP-0001', studentId: 'STU10492', studentName: 'Yuki Tanaka', dateReceived: '2025-09-01', type: 'deposit', amount: 500, currency: 'GBP', purpose: 'Emergency reserve deposit', releasedDate: null, amountReleased: 0, balanceHeld: 500, approvedBy: 'Operations Manager', receiptHeld: true, receiptDocPath: 'docs/finance/DEP-0001-receipt.pdf', recordLocation: 'Finance Archive 2025-26', notes: 'Initial term reserve' },
  { id: 'DEP-0002', studentId: 'STU10492', studentName: 'Yuki Tanaka', dateReceived: '2025-09-01', type: 'deposit', amount: 200, currency: 'GBP', purpose: 'Term pocket money', releasedDate: null, amountReleased: 0, balanceHeld: 200, approvedBy: 'DSL Lead', receiptHeld: true, receiptDocPath: 'docs/finance/DEP-0002-receipt.pdf', recordLocation: 'Finance Archive 2025-26', notes: 'Parent transfer for Autumn term pocket money' },
  { id: 'DEP-0003', studentId: 'STU10492', studentName: 'Yuki Tanaka', dateReceived: '2025-10-15', type: 'release', amount: 0, currency: 'GBP', purpose: 'Pocket money disbursement', releasedDate: '2025-10-15', amountReleased: 50, balanceHeld: 150, approvedBy: 'Operations Manager', receiptHeld: true, receiptDocPath: 'docs/finance/DEP-0003-disbursed.pdf', recordLocation: 'Finance Archive 2025-26', notes: 'Cash handed to host for student exeat spending' },
  { id: 'DEP-0004', studentId: 'STU93018', studentName: 'Daniel Kim', dateReceived: '2025-09-02', type: 'deposit', amount: 600, currency: 'GBP', purpose: 'Emergency reserve & pocket money', releasedDate: null, amountReleased: 0, balanceHeld: 600, approvedBy: 'Operations Manager', receiptHeld: true, receiptDocPath: 'docs/finance/DEP-0004-receipt.pdf', recordLocation: 'Finance Archive 2025-26', notes: 'Combined term deposit' },
  { id: 'DEP-0005', studentId: 'STU47291', studentName: 'Sofia Petrova', dateReceived: '2025-09-03', type: 'deposit', amount: 500, currency: 'GBP', purpose: 'Emergency reserve deposit', releasedDate: null, amountReleased: 0, balanceHeld: 500, approvedBy: 'Operations Manager', receiptHeld: true, receiptDocPath: 'docs/finance/DEP-0005-receipt.pdf', recordLocation: 'Finance Archive 2025-26', notes: 'Annual emergency fund' }
];

function initStudentHeldFundsDB() {
  if (!localStorage.getItem(OG_STUDENT_HELD_FUNDS_KEY)) {
    localStorage.setItem(OG_STUDENT_HELD_FUNDS_KEY, JSON.stringify(initialStudentHeldFunds));
  }
}
initStudentHeldFundsDB();

function getAllStudentHeldFunds() {
  try { return JSON.parse(localStorage.getItem(OG_STUDENT_HELD_FUNDS_KEY)) || []; } catch (e) { return []; }
}

function getStudentHeldFunds(studentId) {
  return getAllStudentHeldFunds()
    .filter(function (tx) { return tx.studentId === studentId; })
    .sort(function (a, b) { return new Date(a.dateReceived) - new Date(b.dateReceived); });
}

function getStudentFundSummary(studentId) {
  var txs = getStudentHeldFunds(studentId);
  var totalDeposited = 0;
  var totalReleased  = 0;
  var lastTransactionDate = null;

  txs.forEach(function (tx) {
    totalDeposited += Number(tx.amount) || 0;
    totalReleased  += Number(tx.amountReleased) || 0;
    if (!lastTransactionDate || new Date(tx.dateReceived) > new Date(lastTransactionDate)) {
      lastTransactionDate = tx.dateReceived;
    }
  });

  return {
    totalDeposited:      totalDeposited,
    totalReleased:       totalReleased,
    balanceHeld:         totalDeposited - totalReleased,
    currency:            'GBP',
    transactionCount:    txs.length,
    lastTransactionDate: lastTransactionDate
  };
}

function generateStudentHeldFundId() {
  var funds = getAllStudentHeldFunds();
  var maxNum = 0;
  funds.forEach(function (f) {
    var num = parseInt(String(f.id || '').replace('DEP-', ''), 10);
    if (!isNaN(num) && num > maxNum) maxNum = num;
  });
  return 'DEP-' + String(maxNum + 1).padStart(4, '0');
}

function saveStudentHeldFundTransaction(tx) {
  var funds = getAllStudentHeldFunds();
  if (!tx.id) tx.id = generateStudentHeldFundId();

  var index = funds.findIndex(function (f) { return f.id === tx.id; });
  if (index > -1) { funds[index] = tx; } else { funds.push(tx); }

  // Recompute a chronological running balance across this student's full
  // ledger so every record's balanceHeld reflects deposits/releases in
  // date order, not just the edited transaction.
  var studentTxs = funds
    .filter(function (f) { return f.studentId === tx.studentId; })
    .sort(function (a, b) { return new Date(a.dateReceived) - new Date(b.dateReceived); });
  var running = 0;
  studentTxs.forEach(function (t) {
    running += (Number(t.amount) || 0) - (Number(t.amountReleased) || 0);
    t.balanceHeld = running;
  });

  commitWithAudit(OG_STUDENT_HELD_FUNDS_KEY, funds, 'saveStudentHeldFundTransaction');
  return tx.id;
}

function deleteStudentHeldFundTransaction(id) {
  var funds = getAllStudentHeldFunds().filter(function (f) { return f.id !== id; });
  localStorage.setItem(OG_STUDENT_HELD_FUNDS_KEY, JSON.stringify(funds));
}

// getAppendix10Agencies — AEGIS Appendix 10 directory of UK youth mental health,
// crisis, and counselling services for external referral.
function getAppendix10Agencies() {
  return [
    {
      id: 'APP10-01',
      name: 'NHS CAMHS & Urgent Mental Health Helpline',
      category: 'Crisis & NHS Services',
      phone: '111 (Option 2 for Mental Health) / 999 for immediate emergency',
      website: 'https://www.nhs.uk/mental-health/children-and-young-adults/',
      hours: '24 hours / 7 days',
      description: 'NHS Child and Adolescent Mental Health Services (CAMHS). For acute crisis assessments, clinical psychiatric interventions, and urgent local crisis line dispatch.',
      referralCriteria: 'Imminent self-harm risk, severe depressive crisis, psychosis, or requiring urgent psychiatric assessment.'
    },
    {
      id: 'APP10-02',
      name: 'Papyrus HOPELINE247',
      category: 'Suicide Prevention',
      phone: '0800 068 4141 / Text: 07860 039967',
      website: 'https://www.papyrus-uk.org',
      hours: '24 hours / 7 days (including weekends and bank holidays)',
      description: 'Confidential suicide prevention service for children and young people under the age of 35 experiencing thoughts of suicide.',
      referralCriteria: 'Students expressing suicidal ideation, despair, or self-harm impulses.'
    },
    {
      id: 'APP10-03',
      name: 'Shout 85258 Crisis Text Line',
      category: 'Crisis Text Service',
      phone: 'Text "SHOUT" to 85258',
      website: 'https://giveusashout.org',
      hours: '24/7 Free & Confidential Text Service',
      description: 'UK-wide text-based crisis support for young people experiencing panic, depression, self-harm, or overwhelming anxiety.',
      referralCriteria: 'Students who prefer discreet digital communication during severe distress or panic.'
    },
    {
      id: 'APP10-04',
      name: 'Childline (NSPCC)',
      category: 'Youth Counselling & Safeguarding',
      phone: '0800 1111',
      website: 'https://www.childline.org.uk',
      hours: '24 hours / 7 days',
      description: 'Confidential support, online 1-to-1 counsellor chat, and telephone counselling for children and young people up to age 19.',
      referralCriteria: 'General emotional distress, bullying, abuse disclosure, homesickness, and anxiety.'
    },
    {
      id: 'APP10-05',
      name: 'YoungMinds Crisis & Parent Helpline',
      category: 'Youth Mental Health Charity',
      phone: 'Parents: 0808 802 5544 / Youth Text: "YM" to 85258',
      website: 'https://www.youngminds.org.uk',
      hours: 'Mon–Fri 09:30–16:00 (Parents) / 24/7 (Crisis Text)',
      description: 'Specialist advice for parents, guardians, and young people regarding school anxiety, depression, and mental health resources.',
      referralCriteria: 'Pastoral anxiety, guidance for guardians navigating CAMHS or school SEN/pastoral support.'
    },
    {
      id: 'APP10-06',
      name: 'BEAT Eating Disorders Youthline',
      category: 'Eating Disorders',
      phone: 'Youthline: 0808 801 0711 / One-to-one webchat',
      website: 'https://www.beateatingdisorders.org.uk',
      hours: 'Mon–Fri 09:00–20:00, Weekends 16:00–20:00',
      description: 'Specialist support, helplines, and digital chat for young people struggling with anorexia, bulimia, binge-eating, and disordered eating.',
      referralCriteria: 'Unexplained weight loss, food restriction, mealtime distress in homestay or boarding.'
    },
    {
      id: 'APP10-07',
      name: 'The Mix (Essential Support for Under-25s)',
      category: 'Wellbeing & Youth Advocacy',
      phone: '0808 808 4994',
      website: 'https://www.themix.org.uk',
      hours: 'Mon–Fri 16:00–23:00 / Webchat available',
      description: 'Support for young people on mental health, relationships, loneliness, accommodation, and substance misuse.',
      referralCriteria: 'Mild-to-moderate pastoral concerns, loneliness, and adaptation difficulties.'
    },
    {
      id: 'APP10-08',
      name: 'Emergency Services (Police / Ambulance)',
      category: 'Immediate Risk to Life',
      phone: '999 (UK Emergency) / 112',
      website: 'https://www.police.uk',
      hours: '24 hours / 7 days',
      description: 'Immediate dispatch for active life-threatening emergencies, missing students at risk of harm, or acute physical injury.',
      referralCriteria: 'Imminent danger to life or active self-harm in progress.'
    }
  ];
}

// ── Organisation Policy Store (AEGIS Standard 5.10.1 & Appendix A) ────────────

var OG_ORG_DOCS_KEY = 'og_org_documents';

var initialOrgDocs = [];

function initOrgDocsDB() {
  if (!localStorage.getItem(OG_ORG_DOCS_KEY)) {
    localStorage.setItem(OG_ORG_DOCS_KEY, JSON.stringify([]));
  }

  var orgDocs = [];
  try {
    orgDocs = JSON.parse(localStorage.getItem(OG_ORG_DOCS_KEY)) || [];
  } catch (e) {
    orgDocs = [];
  }

  // Appendix 12 — Mental Health & Wellbeing Policy is a statutory seed document.
  var mhPolicyExists = orgDocs.some(function (d) { return d.id === 'POL-WCE-002'; });
  if (!mhPolicyExists) {
    orgDocs.push({
      id: 'POL-WCE-002',
      title: 'Mental Health & Wellbeing Policy & Procedure (AEGIS Appendix 12)',
      category: 'Welfare, conduct & emergencies',
      version: '1.0',
      owner: 'Jay Ray (DSL / Director of Safeguarding)',
      audience: 'All Staff / Homestays / School Pastoral Teams / Parents',
      effectiveDate: '2026-01-01',
      reviewDate: '2027-01-01',
      summary: 'Statutory framework and operating procedure for supporting international students presenting mental health concerns, CAMHS triage, DSL escalation, and Appendix 11 school removal protocols.',
      status: 'Active',
      content: '# Mental Health and Wellbeing Policy\n\n## 1. Policy Statement\nOxford Guardians is committed to supporting the mental health and emotional wellbeing of all students under our care. This policy establishes clear protocols for identification, intervention, escalation, and school removal in compliance with AEGIS Standards (Section 3.3, Appendix 10, 11, and 12).\n\n## 2. Procedure for Identifying Mental Health Concerns\nStaff, homestay hosts, and school coordinators must record all observed changes in mood, behaviour, eating habits, academic engagement, or social withdrawal in the student welfare log.\n\n## 3. Escalation to Designated Safeguarding Lead (DSL)\nWhere a mental health concern involves risk of self-harm, suicidal ideation, severe crisis, or abuse disclosure, it must be escalated immediately to the DSL (Jay Ray) via the formal concern logging mechanism (AEGIS 3.3.2). Appendix 10 agencies should be engaged where clinical or crisis support is required.\n\n## 4. Temporary Removal from School (Appendix 11)\nWhere a student is unable to remain safely at school due to acute mental health distress, an AEGIS Appendix 11 Removal Form must be completed by authorising school staff prior to Oxford Guardians arranging respite homestay care or medical repatriation.\n\n## 5. Annual Review\nThis policy is reviewed annually by the Director of Safeguarding.',
      reviewHistory: [
        {
          version: '1.0',
          reviewDate: '2026-01-01',
          reviewedBy: 'Jay Ray (DSL / Director of Safeguarding)',
          notes: 'Initial policy creation and AEGIS Appendix 12 compliance alignment.',
          status: 'Active',
          timestamp: new Date().toISOString()
        }
      ]
    });
    localStorage.setItem(OG_ORG_DOCS_KEY, JSON.stringify(orgDocs));
  }

  // Statutory Emergency Plan Policy Document is a statutory seed document.
  var emgPlanExists = orgDocs.some(function (d) { return d.id === 'POL-EMG-001'; });
  if (!emgPlanExists) {
    orgDocs.push({
      id: 'POL-EMG-001',
      title: 'Major Emergency & Critical Incident Plan (AEGIS Standard 2.6)',
      category: 'Welfare, conduct & emergencies',
      version: '1.0',
      owner: 'Jay Ray (DSL / Director of Safeguarding)',
      audience: 'All Staff / Homestays / Drivers / Partner Schools / Parents',
      effectiveDate: '2026-01-01',
      reviewDate: '2027-01-01',
      summary: 'Statutory emergency response plan establishing step-by-step action protocols, 24/7 staffed rota, named scenario leads, communication triggers, and vetted lone-working emergency cover arrangements.',
      status: 'Active',
      content: '# Major Emergency & Critical Incident Response Plan\n\n## 1. Purpose & Scope\nThis plan sets out the operational procedures, escalation hierarchies, and emergency response workflows for Oxford Guardians in compliance with AEGIS Standard 2.6. It applies to all students under guardianship, homestays, drivers, and staff.\n\n## 2. 24-Hour Emergency Line Operation (Standard 2.6.1)\nOxford Guardians maintains a dedicated 24/7 emergency telephone line (+44 7700 900 999). The line is manned on a strict 3-tier rotation by DBS-checked staff with full access to student records, medical profiles, and homestay contact data.\n- Daytime (08:00–18:00): Operations Lead (Zuko Fire)\n- Evening (18:00–22:00): Welfare Coordinator (Priya Shah)\n- Overnight (22:00–08:00) & Weekends: DSL & Safeguarding Director (Jay Ray)\n\n## 3. Foreseeable Emergency Scenarios & Named Leads (Standard 2.6.2)\nEach emergency type has an assigned primary lead responder:\n1. Medical Crisis / Serious Illness — Lead: Zuko Fire (Backup: Jay Ray)\n2. Missing Student — Lead: Jay Ray (DSL) (Backup: Zuko Fire)\n3. Safeguarding Escalation / Abuse Disclosure — Lead: Jay Ray (DSL)\n4. Death or Life-Threatening Harm — Lead: Jay Ray (DSL / Exec)\n5. Travel Disruption / Stranded Student — Lead: Priya Shah (Logistics)\n6. Homestay Crisis / Emergency Relocation — Lead: Priya Shah\n7. Pandemic / Infectious Outbreak — Lead: Zuko Fire (Operations)\n\n## 4. Mandatory Escalation Timelines\n- Parents informed within 1 hour for medical emergencies and immediately for missing student disclosures.\n- School notified same working day.\n- AEGIS notified within 24 hours for all serious or critical incidents.\n\n## 5. Lone Working & Emergency Cover Arrangements (Standard 2.6.3)\nOxford Guardians maintains a formal reciprocal emergency cover agreement with Cotswolds & Thames Guardianship Services, providing vetted DSL Level 3 cover if primary staff are indisposed.',
      reviewHistory: [
        {
          version: '1.0',
          reviewDate: '2026-01-01',
          reviewedBy: 'Jay Ray (DSL / Director of Safeguarding)',
          notes: 'Initial publication aligned with AEGIS Standard 2.6.',
          status: 'Active',
          timestamp: new Date().toISOString()
        }
      ]
    });
    localStorage.setItem(OG_ORG_DOCS_KEY, JSON.stringify(orgDocs));
  }

  // Data Protection & Privacy Policy is a statutory seed document (AEGIS Standard 2.7.3).
  var privacyPolicyExists = orgDocs.some(function (d) { return d.id === 'DOC-0004'; });
  if (!privacyPolicyExists) {
    orgDocs.push({
      id: 'DOC-0004',
      title: 'Data Protection & Privacy Policy',
      category: 'Operations',
      uploadDate: '2025-08-01',
      reviewDate: '2026-08-01',
      author: 'Zuko Fire',
      version: '1.2',
      summary: 'Statutory policy covering GDPR compliance, ICO registration details, data retention schedules, subject access requests, and the public privacy notice (AEGIS Standard 2.7.3).',
      status: 'Active',
      content: '# Data Protection & Privacy Policy\n\n## 1. Introduction\nOxford Guardians is committed to protecting the privacy and security of personal data in compliance with the UK GDPR and the Data Protection Act 2018. We are registered with the Information Commissioner\'s Office (ICO).\n\n## 2. Data Controller\nThe designated Data Controller is Zuko Fire (Operations Director). All Subject Access Requests (SARs) must be directed to the Data Controller and will be responded to within 30 days.\n\n## 3. Data Retention\n- Student welfare records: Kept until the student reaches age 25.\n- Host vetting records: Kept for 7 years after the host becomes inactive.\n- Financial records: Kept for 7 years.',
      reviewHistory: []
    });
    localStorage.setItem(OG_ORG_DOCS_KEY, JSON.stringify(orgDocs));
  }
}
initOrgDocsDB();

function getAllOrgDocs() {
  try {
    return JSON.parse(localStorage.getItem(OG_ORG_DOCS_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function getOrgDocById(id) {
  return getAllOrgDocs().find(function (d) { return d.id === id; }) || null;
}

function saveOrgDoc(doc) {
  var docs = getAllOrgDocs();
  if (!doc.id) {
    doc.id = generateOrgDocId(doc.category);
  }
  if (!doc.status) doc.status = 'Active';
  if (!doc.createdAt) doc.createdAt = new Date().toISOString();
  doc.updatedAt = new Date().toISOString();

  var idx = docs.findIndex(function (d) { return d.id === doc.id; });
  if (idx > -1) {
    docs[idx] = doc;
  } else {
    docs.push(doc);
  }
  commitWithAudit(OG_ORG_DOCS_KEY, docs, 'saveOrgDoc');
  return doc.id;
}

function archiveOrgDoc(id, reason) {
  var docs = getAllOrgDocs();
  var doc = docs.find(function(d) { return d.id === id; });
  if (doc) {
    doc.status = 'Archived';
    doc.archivedAt = new Date().toISOString();
    doc.archiveReason = reason || 'Archived by user';
    if (!doc.reviewHistory) doc.reviewHistory = [];
    doc.reviewHistory.push({
      version: doc.version || '1.0',
      reviewDate: new Date().toISOString().split('T')[0],
      reviewedBy: 'Compliance Lead',
      notes: 'Policy archived: ' + (reason || 'No longer active'),
      status: 'Archived',
      timestamp: new Date().toISOString()
    });
    localStorage.setItem(OG_ORG_DOCS_KEY, JSON.stringify(docs));
  }
}

function restoreOrgDoc(id) {
  var docs = getAllOrgDocs();
  var doc = docs.find(function(d) { return d.id === id; });
  if (doc) {
    doc.status = 'Active';
    delete doc.archivedAt;
    delete doc.archiveReason;
    if (!doc.reviewHistory) doc.reviewHistory = [];
    doc.reviewHistory.push({
      version: doc.version || '1.0',
      reviewDate: new Date().toISOString().split('T')[0],
      reviewedBy: 'Compliance Lead',
      notes: 'Policy restored to Active status',
      status: 'Active',
      timestamp: new Date().toISOString()
    });
    localStorage.setItem(OG_ORG_DOCS_KEY, JSON.stringify(docs));
  }
}

function deleteOrgDoc(id) {
  var docs = getAllOrgDocs().filter(function (d) { return d.id !== id; });
  localStorage.setItem(OG_ORG_DOCS_KEY, JSON.stringify(docs));
}

function clearAllOrgDocs() {
  localStorage.setItem(OG_ORG_DOCS_KEY, JSON.stringify([]));
}

function generateOrgDocId(category) {
  var prefix = 'POL-';
  var cat = (category || '').toLowerCase();
  if (cat.indexOf('complaint') > -1 || cat.indexOf('govern') > -1) prefix = 'POL-CG-';
  else if (cat.indexOf('data') > -1 || cat.indexOf('privac') > -1) prefix = 'POL-DP-';
  else if (cat.indexOf('safe') > -1 || cat.indexOf('child') > -1) prefix = 'POL-SG-';
  else if (cat.indexOf('welfare') > -1 || cat.indexOf('conduct') > -1 || cat.indexOf('emerg') > -1) prefix = 'POL-WCE-';

  var docs = getAllOrgDocs();
  var max = 0;
  docs.forEach(function(d) {
    if (d.id && d.id.indexOf(prefix) === 0) {
      var num = parseInt(d.id.replace(prefix, ''), 10);
      if (!isNaN(num) && num > max) max = num;
    }
  });
  return prefix + String(max + 1).padStart(3, '0');
}

function getAllPolicyHistory() {
  var docs = getAllOrgDocs();
  var history = [];
  docs.forEach(function(doc) {
    if (Array.isArray(doc.reviewHistory)) {
      doc.reviewHistory.forEach(function(rev) {
        history.push({
          policyId: doc.id,
          policyTitle: doc.title,
          policyCategory: doc.category,
          version: rev.version,
          date: rev.reviewDate || rev.timestamp || doc.updatedAt,
          author: rev.reviewedBy || rev.author || doc.owner || 'Compliance Lead',
          notes: rev.notes || rev.summary || 'Policy review recorded',
          status: rev.status || doc.status,
          snapshotContent: rev.snapshotContent || '',
          timestamp: rev.timestamp || (rev.reviewDate ? new Date(rev.reviewDate).toISOString() : new Date().toISOString())
        });
      });
    }
  });
  history.sort(function(a, b) {
    return new Date(b.timestamp || b.date) - new Date(a.timestamp || a.date);
  });
  return history;
}

// ── Organisation Entity (AEGIS Standards 1.1, 2.1.1, 2.4.1, 2.7.2, 2.11.1) ────

var OG_ORGANISATION_KEY = 'og_organisation';

function initOrganisationDB() {
  if (!localStorage.getItem(OG_ORGANISATION_KEY)) {
    localStorage.setItem(OG_ORGANISATION_KEY, JSON.stringify({
      name: "Oxford Guardians Ltd",
      icoRegistrationNumber: "",
      icoExpiryDate: "",
      icoDocPath: "",
      dataController: "Zuko Fire",
      dataControllerId: "STF00002",
      accreditationTier: "AEGIS Gold Standard Candidate",
      reInspectionDueDate: "2027-09-01",
      annualDeclarationLastSubmitted: "",
      aimsStatement: "",
      aimsDocPath: "",
      organogramDocPath: "",
      insurances: {
        professionalIndemnity: { insurer: "", policyNo: "", expiryDate: "", docPath: "" },
        publicLiability:       { insurer: "", policyNo: "", expiryDate: "", docPath: "" },
        employersLiability:    { insurer: "", policyNo: "", expiryDate: "", docPath: "" }
      },
      significantChangesLog: []
    }));
  }
}
initOrganisationDB();

function getOrganisation() {
  initOrganisationDB();
  try {
    return JSON.parse(localStorage.getItem(OG_ORGANISATION_KEY));
  } catch (e) {
    return null;
  }
}

function saveOrganisation(org) {
  org.updatedAt = new Date().toISOString();
  commitWithAudit(OG_ORGANISATION_KEY, org, 'saveOrganisation');
  return org;
}

function generateSignificantChangeId() {
  var org = getOrganisation();
  var log = (org && org.significantChangesLog) || [];
  var maxNum = 0;
  log.forEach(function (c) {
    var num = parseInt(String(c.id || '').replace('SIG-', ''), 10);
    if (!isNaN(num) && num > maxNum) maxNum = num;
  });
  return 'SIG-' + String(maxNum + 1).padStart(5, '0');
}

// AEGIS Standard 2.11.1 — significant changes must be reported to AEGIS within 14 days
// of occurring. Logging a change stamps today's date and computes that deadline.
function logSignificantChange(change) {
  var org = getOrganisation();
  if (!org) return null;
  if (!Array.isArray(org.significantChangesLog)) org.significantChangesLog = [];

  var today = new Date().toISOString().slice(0, 10);
  var deadline = new Date();
  deadline.setDate(deadline.getDate() + 14);

  var entry = Object.assign({
    id: generateSignificantChangeId(),
    date: today,
    changeDescription: '',
    reportedToAegisDate: '',
    deadline14Days: deadline.toISOString().slice(0, 10),
    status: 'Open'
  }, change);

  var idx = org.significantChangesLog.findIndex(function (c) { return c.id === entry.id; });
  if (idx > -1) {
    org.significantChangesLog[idx] = entry;
  } else {
    org.significantChangesLog.push(entry);
  }
  saveOrganisation(org);
  return entry.id;
}

// ── Policy Acknowledgement Store (AEGIS Standards 2.1.6, 6.1.1) ───────────────

var OG_POLICY_ACK_KEY = 'og_policy_acknowledgements';

function initPolicyAcknowledgementsDB() {
  if (!localStorage.getItem(OG_POLICY_ACK_KEY)) {
    localStorage.setItem(OG_POLICY_ACK_KEY, JSON.stringify([]));
  }
}
initPolicyAcknowledgementsDB();

function getAllPolicyAcknowledgements() {
  try {
    return JSON.parse(localStorage.getItem(OG_POLICY_ACK_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function saveAllPolicyAcknowledgements(acks) {
  commitWithAudit(OG_POLICY_ACK_KEY, acks, 'saveAllPolicyAcknowledgements');
}

function generatePolicyAckId() {
  var acks = getAllPolicyAcknowledgements();
  var maxNum = 0;
  acks.forEach(function (a) {
    var num = parseInt(String(a.id || '').replace('ACK-', ''), 10);
    if (!isNaN(num) && num > maxNum) maxNum = num;
  });
  return 'ACK-' + String(maxNum + 1).padStart(5, '0');
}

// Stamps today as acknowledgedDate and marks the record Acknowledged. A person who
// already has a record for this docId + docVersion is updated in place rather than
// duplicated, so re-acknowledging (e.g. after a re-issue) is idempotent.
function recordPolicyAcknowledgement(docId, docVersion, personId, personType, signMethod) {
  var acks = getAllPolicyAcknowledgements();
  var today = new Date().toISOString().slice(0, 10);
  var existing = acks.find(function (a) {
    return a.docId === docId && a.docVersion === docVersion && a.personId === personId;
  });

  if (existing) {
    existing.acknowledgedDate = today;
    existing.status = 'Acknowledged';
    existing.signMethod = signMethod || existing.signMethod || 'Electronic';
    existing.personType = existing.personType || personType;
  } else {
    existing = {
      id: generatePolicyAckId(),
      docId: docId,
      docVersion: docVersion,
      personId: personId,
      personType: personType,
      issuedDate: today,
      acknowledgedDate: today,
      status: 'Acknowledged',
      signMethod: signMethod || 'Electronic'
    };
    acks.push(existing);
  }
  saveAllPolicyAcknowledgements(acks);
  return existing.id;
}

// Who is expected to sign this policy — derived from the document's `audience` field
// against the live staff/host rosters — cross-referenced with who already has.
function getPolicyAcknowledgementStats(docId) {
  var doc = getOrgDocById(docId);
  var audience = ((doc && doc.audience) || '').toLowerCase();
  var docVersion = doc ? doc.version : null;

  var eligible = [];
  if (!doc || audience.indexOf('staff') > -1) {
    getAllStaff().filter(function (p) { return p.status === 'Active'; })
      .forEach(function (p) { eligible.push({ id: p.id, name: p.firstName + ' ' + p.lastName, personType: 'staff' }); });
  }
  if (!doc || audience.indexOf('homestay') > -1 || audience.indexOf('host') > -1) {
    getAllHosts().filter(function (h) { return h.status === 'approved'; })
      .forEach(function (h) { eligible.push({ id: h.id, name: h.firstName + ' ' + h.lastName, personType: 'host' }); });
  }

  var acks = getAllPolicyAcknowledgements().filter(function (a) {
    return a.docId === docId && (docVersion ? a.docVersion === docVersion : true) && a.status === 'Acknowledged';
  });
  var acknowledgedIds = {};
  acks.forEach(function (a) { acknowledgedIds[a.personId] = true; });

  var acknowledgedList = eligible.filter(function (p) { return acknowledgedIds[p.id]; });
  var pendingList = eligible.filter(function (p) { return !acknowledgedIds[p.id]; });
  var totalEligible = eligible.length;
  var acknowledgedCount = acknowledgedList.length;

  return {
    docId: docId,
    docVersion: docVersion,
    totalEligible: totalEligible,
    acknowledgedCount: acknowledgedCount,
    percentage: totalEligible > 0 ? Math.round((acknowledgedCount / totalEligible) * 100) : 0,
    pendingList: pendingList,
    acknowledgedList: acknowledgedList
  };
}

// Active (statutory) policies whose audience covers this person's role, which they
// have not yet acknowledged at the document's current version.
function getUnacknowledgedPoliciesForPerson(personId, personType) {
  var roleTerm = personType === 'host' ? 'homestay' : (personType === 'volunteer' ? 'volunteer' : 'staff');
  var acks = getAllPolicyAcknowledgements().filter(function (a) {
    return a.personId === personId && a.status === 'Acknowledged';
  });

  return getAllOrgDocs().filter(function (doc) {
    if (doc.status !== 'Active') return false;
    var audience = (doc.audience || '').toLowerCase();
    var appliesToRole = audience.indexOf(roleTerm) > -1 ||
      (personType === 'host' && audience.indexOf('host') > -1) ||
      audience.indexOf('all ') > -1 || audience === 'all';
    if (!appliesToRole) return false;
    var acknowledged = acks.some(function (a) { return a.docId === doc.id && a.docVersion === doc.version; });
    return !acknowledged;
  });
}

// ── Complaints & Grievances Register (AEGIS Standard 7 & Appendix 8) ──────────

var OG_COMPLAINTS_KEY = 'og_complaints';

function initComplaintsDB() {
  if (!localStorage.getItem(OG_COMPLAINTS_KEY)) {
    localStorage.setItem(OG_COMPLAINTS_KEY, JSON.stringify([]));
  }
}
initComplaintsDB();

function getAllComplaints() {
  try {
    return JSON.parse(localStorage.getItem(OG_COMPLAINTS_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function saveAllComplaints(complaints) {
  commitWithAudit(OG_COMPLAINTS_KEY, complaints, 'saveAllComplaints');
}

function getComplaintById(id) {
  return getAllComplaints().find(function (c) { return c.id === id; }) || null;
}

function generateComplaintId() {
  var complaints = getAllComplaints();
  var maxNum = 0;
  complaints.forEach(function (c) {
    var num = parseInt(String(c.id || '').replace('CMP-', ''), 10);
    if (!isNaN(num) && num > maxNum) maxNum = num;
  });
  return 'CMP-' + String(maxNum + 1).padStart(5, '0');
}

// refNumber format COM-YYYY-NNN, sequential per calendar year.
function generateComplaintRefNumber(year) {
  var yr = year || new Date().getFullYear();
  var complaints = getAllComplaints();
  var maxNum = 0;
  complaints.forEach(function (c) {
    var match = /^COM-(\d{4})-(\d+)$/.exec(c.refNumber || '');
    if (match && parseInt(match[1], 10) === yr) {
      var num = parseInt(match[2], 10);
      if (num > maxNum) maxNum = num;
    }
  });
  return 'COM-' + yr + '-' + String(maxNum + 1).padStart(3, '0');
}

function saveComplaint(complaint) {
  var complaints = getAllComplaints();
  if (!complaint.id) {
    complaint.id = generateComplaintId();
  }
  if (!complaint.refNumber) {
    complaint.refNumber = generateComplaintRefNumber();
  }
  if (!complaint.dateReceived) complaint.dateReceived = new Date().toISOString().slice(0, 10);
  if (!complaint.currentStage) complaint.currentStage = 'Stage 1: Informal';
  if (!complaint.outcome) complaint.outcome = 'In Progress';
  if (!Array.isArray(complaint.chronology)) complaint.chronology = [];
  if (!complaint.createdAt) complaint.createdAt = new Date().toISOString();
  complaint.updatedAt = new Date().toISOString();

  var idx = complaints.findIndex(function (c) { return c.id === complaint.id; });
  if (idx > -1) {
    complaints[idx] = complaint;
  } else {
    complaints.push(complaint);
  }
  saveAllComplaints(complaints);
  return complaint.id;
}

function getComplaintsStats() {
  var complaints = getAllComplaints();
  var byStage = {
    'Stage 1: Informal': 0,
    'Stage 2: Formal': 0,
    'Stage 3: AEGIS Panel': 0,
    'Stage 4: Legal': 0
  };
  var byOutcome = {
    'In Progress': 0,
    'Upheld': 0,
    'Partially Upheld': 0,
    'Not Upheld': 0
  };
  var byCategory = {};
  var open = 0;

  complaints.forEach(function (c) {
    if (byStage.hasOwnProperty(c.currentStage)) byStage[c.currentStage]++;
    if (byOutcome.hasOwnProperty(c.outcome)) byOutcome[c.outcome]++;
    if (c.category) byCategory[c.category] = (byCategory[c.category] || 0) + 1;
    if (c.outcome === 'In Progress') open++;
  });

  return {
    total: complaints.length,
    open: open,
    resolved: complaints.length - open,
    byStage: byStage,
    byOutcome: byOutcome,
    byCategory: byCategory,
    stage3PanelOpen: complaints.filter(function (c) {
      return c.currentStage === 'Stage 3: AEGIS Panel' && c.outcome === 'In Progress';
    }).length
  };
}

// ── Document aggregator ───────────────────────────────────────────────────────

function aggregateDocuments() {
  var results = [];

  function readKey(key) {
    try { return JSON.parse(localStorage.getItem(key)) || []; } catch (e) { return []; }
  }

  getAllStudents().forEach(function (s) {
    var fullName = s.firstName + ' ' + s.lastName;
    var href = 'student-profile.html?id=' + s.id;
    [
      { key: 'docs_' + s.id,  subType: 'General',  audience: 'Admin / Parent' },
      { key: 'acad_' + s.id,  subType: 'Academic', audience: 'Admin / Parent / School' }
    ].forEach(function (kv) {
      readKey(kv.key).forEach(function (item) {
        results.push({
          docName:     item.name,
          personName:  fullName,
          personId:    s.id,
          personType:  'Student',
          subType:     kv.subType,
          uploadDate:  item.date,
          audience:    kv.audience,
          profileHref: href
        });
      });
    });
  });

  getAllHosts().forEach(function (h) {
    var fullName = h.firstName + ' ' + h.lastName;
    readKey('host_docs_' + h.id).forEach(function (item) {
      results.push({
        docName:     item.name,
        personName:  fullName,
        personId:    h.id,
        personType:  'Host',
        subType:     'Compliance',
        uploadDate:  item.date,
        audience:    'Admin only',
        profileHref: 'host-profile.html?id=' + h.id
      });
    });
  });

  getAllDrivers().forEach(function (d) {
    var fullName = d.firstName + ' ' + d.lastName;
    readKey('driver_docs_' + d.id).forEach(function (item) {
      results.push({
        docName:     item.name,
        personName:  fullName,
        personId:    d.id,
        personType:  'Driver',
        subType:     'Compliance',
        uploadDate:  item.date,
        audience:    'Admin only',
        profileHref: 'drivers.html?id=' + d.id
      });
    });
  });

  getAllFinanceDocs().forEach(function (item) {
    var financePersonId = item.personId || null;
    var financeProfileHref = null;
    if (financePersonId) {
      if (financePersonId.indexOf('PAR') === 0) {
        financeProfileHref = 'parent-profile.html?id=' + financePersonId;
      } else if (financePersonId.indexOf('DRV') === 0) {
        financeProfileHref = 'driver-profile.html?id=' + financePersonId;
      }
    }
    results.push({
      docName:     item.name,
      personName:  item.person || 'Oxford Guardians',
      personId:    financePersonId,
      personType:  'Finance',
      subType:     item.subType || 'Finance',
      uploadDate:  item.date,
      audience:    'Admin only',
      profileHref: financeProfileHref
    });
  });

  getAllStaff().forEach(function (s) {
    var fullName = s.firstName + ' ' + s.lastName;
    readKey('staff_docs_' + s.id).forEach(function (item) {
      results.push({
        docName: item.name, personName: fullName, personId: s.id,
        personType: 'Staff', subType: 'Staff', uploadDate: item.date,
        audience: 'Admin only', profileHref: 'staff-profile.html?id=' + s.id
      });
    });
  });

  getAllParents().forEach(function (p) {
    var fullName = p.firstName + ' ' + p.lastName;
    readKey('parent_docs_' + p.id).forEach(function (item) {
      results.push({
        docName: item.name, personName: fullName, personId: p.id,
        personType: 'Parent', subType: 'Parent', uploadDate: item.date,
        audience: 'Admin only', profileHref: 'parent-profile.html?id=' + p.id
      });
    });
  });

  readKey('og_pf_documents').forEach(function (item) {
    results.push({
      docName: item.name, personName: item.studentName || 'Private Fostering',
      personId: item.studentId || null, personType: 'Student',
      subType: 'Private Fostering', uploadDate: item.date,
      audience: 'Admin / DSL', profileHref: item.studentId ? 'student-profile.html?id=' + item.studentId : null
    });
  });

  function emitComplianceDocs(person, type, profileHref) {
    var c = person.compliance;
    if (!c) return;
    var fullName = person.firstName + ' ' + person.lastName;
    var fields = [
      { key: 'idDocumentPath', label: 'ID Document' },
      { key: 'rightToWorkCheckPath', label: 'Right to Work' },
      { key: 'dbsCertificatePath', label: 'DBS Certificate' },
      { key: 'reference1Path', label: 'Reference 1' },
      { key: 'reference2Path', label: 'Reference 2' },
      { key: 'overseasCheckDocPath', label: 'Overseas Police Check' },
      { key: 'safeguardingCertificatePath', label: 'Safeguarding Certificate' }
    ];
    if (type === 'Host') {
      fields.push({ key: 'gasSafetyCertPath', label: 'Gas Safety Certificate' });
      fields.push({ key: 'selfDeclarationDocPath', label: 'Self-Declaration (Appendix 5)' });
    }
    fields.forEach(function (f) {
      if (c[f.key]) {
        results.push({
          docName: f.label + ' — ' + fullName, personName: fullName,
          personId: person.id, personType: type, subType: 'Compliance',
          uploadDate: '', audience: 'Admin only', profileHref: profileHref
        });
      }
    });
  }

  getAllStaff().forEach(function (s) { emitComplianceDocs(s, 'Staff', 'staff-profile.html?id=' + s.id); });
  getAllHosts().forEach(function (h) { emitComplianceDocs(h, 'Host', 'host-profile.html?id=' + h.id); });
  getAllDrivers().forEach(function (d) { emitComplianceDocs(d, 'Driver', 'driver-profile.html?id=' + d.id); });

  getAllOrgDocs().forEach(function (doc) {
    results.push({
      docName: doc.title,
      personName: 'Oxford Guardians (Policy)',
      personId: doc.id,
      personType: 'Policy',
      subType: doc.subType || 'Policy',
      uploadDate: doc.publicationDate,
      reviewDate: doc.reviewDate,
      version: doc.version,
      status: doc.status,
      audience: doc.audience || 'All',
      profileHref: 'policy-viewer.html?id=' + doc.id
    });
  });

  return results;
}

// ── Exeats ────────────────────────────────────────────────────────────────────
var OG_EXEATS_KEY = 'og_exeats';

var initialExeats = [];

function initExeatDB() {
  if (!localStorage.getItem(OG_EXEATS_KEY)) {
    localStorage.setItem(OG_EXEATS_KEY, JSON.stringify(initialExeats));
  }
}
function getAllExeats() {
  try { return JSON.parse(localStorage.getItem(OG_EXEATS_KEY)) || []; } catch(e) { return []; }
}
function saveAllExeats(exeats) {
  commitWithAudit(OG_EXEATS_KEY, exeats, 'saveAllExeats');
}
function saveExeat(exeat) {
  var exeats = getAllExeats();
  var index = exeats.findIndex(function(e) { return e.id === exeat.id; });
  if (index > -1) { exeats[index] = exeat; } else { exeats.push(exeat); }
  saveAllExeats(exeats);
}
initExeatDB();

// ── Placements ────────────────────────────────────────────────────────────────

var OG_PLACEMENTS_KEY = 'og_placements';
var OG_TODOS_KEY      = 'og_todos';

var PLACEMENT_TASK_NAMES = [
  'Confirmation with parent',
  'Confirmation with host',
  'Arrival confirmation',
  'Departure confirmation'
];

function getAllPlacements() {
  try { return JSON.parse(localStorage.getItem(OG_PLACEMENTS_KEY)) || []; } catch (e) { return []; }
}

function savePlacement(placement) {
  var placements = getAllPlacements();
  var index = placements.findIndex(function (p) { return p.id === placement.id; });
  var isNew = index === -1;
  if (isNew) {
    placements.push(placement);
  } else {
    placements[index] = placement;
  }
  commitWithAudit(OG_PLACEMENTS_KEY, placements, 'savePlacement');

  if (isNew) {
    var todos = getAllTodos();
    PLACEMENT_TASK_NAMES.forEach(function (taskName, i) {
      todos.push({
        id:           'TODO-' + placement.id + '-' + (i + 1),
        placementId:  placement.id,
        studentName:  placement.studentName || '',
        hostName:     placement.hostName    || '',
        taskName:     taskName,
        deadlineDate: '',
        deadlineTime: '',
        status:       'Pending'
      });
    });
    commitWithAudit(OG_TODOS_KEY, todos, 'savePlacement');
  }
}

// ── Todos ─────────────────────────────────────────────────────────────────────

function getAllTodos() {
  try { return JSON.parse(localStorage.getItem(OG_TODOS_KEY)) || []; } catch (e) { return []; }
}

function saveTodo(todo) {
  var todos = getAllTodos();
  var index = todos.findIndex(function (t) { return t.id === todo.id; });
  if (index > -1) {
    todos[index] = todo;
  } else {
    todos.push(todo);
  }
  commitWithAudit(OG_TODOS_KEY, todos, 'saveTodo');
}

function saveAllTodos(todos) {
  commitWithAudit(OG_TODOS_KEY, todos, 'saveAllTodos');
}

// ── Compliance alert generator ────────────────────────────────────────────────

// isPermissionGranted — AEGIS Standard 3.4.2 backward-compatible permission reader.
// Accepts either the legacy boolean format (student.legal.permissions.travel === true)
// or the structured consent-object format ({ granted, grantedBy, grantedDate, evidenceMethod }).
function isPermissionGranted(perm) {
  if (typeof perm === 'boolean') return perm;
  if (perm && typeof perm === 'object') return !!perm.granted;
  return false;
}

function generateComplianceAlerts() {
  var alerts = [];
  var today  = new Date();
  today.setHours(0, 0, 0, 0);

  var _settings = {};
  try { _settings = JSON.parse(localStorage.getItem('og_alert_settings')) || {}; } catch (e) {}
  var warningThreshold = (typeof _settings.warningThreshold === 'number' && _settings.warningThreshold > 0)
    ? _settings.warningThreshold : 30;
  var consentLevel = _settings.consentLevel || 'info';

  function daysUntil(dateStr) {
    if (!dateStr) return null;
    var d = new Date(dateStr);
    if (isNaN(d.getTime())) return null;
    d.setHours(0, 0, 0, 0);
    return Math.floor((d - today) / 86400000);
  }

  function push(level, person, type, field, message, profileHref, editHref) {
    alerts.push({ level: level, person: person.firstName + ' ' + person.lastName,
                  personId: person.id, type: type,
                  field: field, message: message, profileHref: profileHref, editHref: editHref });
  }

  // Overdue annual policy reviews (AEGIS 2.1.6 — > 365 days since effective/upload date).
  // Runs first so policy-overdue alerts always surface regardless of what else fails below.
  try {
    getAllOrgDocs().filter(function (d) { return d.status === 'Active'; }).forEach(function (doc) {
      var reviewHref = 'policy-viewer.html?id=' + doc.id;
      var reviewDays = daysUntil(doc.reviewDate);
      if (reviewDays !== null && reviewDays < 0) {
        alerts.push({ level: 'critical', person: 'Organisation', personId: 'ORG', type: 'policy',
          field: 'Policy Review', message: '"' + doc.title + '" is overdue for its annual review.', profileHref: reviewHref, editHref: reviewHref });
      } else if (reviewDays !== null && reviewDays < warningThreshold) {
        alerts.push({ level: 'warning', person: 'Organisation', personId: 'ORG', type: 'policy',
          field: 'Policy Review', message: '"' + doc.title + '" review is due in ' + reviewDays + ' day' + (reviewDays === 1 ? '' : 's') + '.', profileHref: reviewHref, editHref: reviewHref });
      }
    });
  } catch (e) {}

  function checkPerson(p, type) {
    var c = p.compliance;
    if (!c) return;

    var profileHref;
    if (type === 'staff') {
      profileHref = 'staff-profile.html?id=' + p.id;
    } else if (type === 'host') {
      profileHref = 'host-profile.html?id=' + p.id;
    } else {
      profileHref = 'driver-profile.html?id=' + p.id;
    }

    function subHref(subPage) {
      return type + '-compliance-' + subPage + '.html?id=' + p.id;
    }

    if (!c.idDocumentPath) {
      push('critical', p, type, 'ID Document',
        'No ID document on file — required for safe recruitment records.',
        profileHref, subHref('identity'));
    }

    if (c.livedAbroad && !c.overseasCheckDocPath) {
      push('warning', p, type, 'Overseas Check',
        'Person has lived abroad but no overseas check document has been uploaded.',
        profileHref, subHref('overseas'));
    }

    if (!c.worksOutsideUK) {
      if (!c.dbsNumber && !c.dbsCertificatePath) {
        push('critical', p, type, 'DBS',
          'No DBS certificate on file — must be uploaded before the next inspection.',
          profileHref, subHref('dbs'));
      }
      var dbsDays = daysUntil(c.dbsExpiry);
      if (dbsDays !== null && dbsDays < 0) {
        push('critical', p, type, 'DBS',
          'DBS has expired — renew immediately.',
          profileHref, subHref('dbs'));
      }
      if (dbsDays !== null && dbsDays >= 0 && dbsDays < warningThreshold) {
        push('warning', p, type, 'DBS expiry',
          'DBS expires in ' + dbsDays + ' day' + (dbsDays === 1 ? '' : 's') + ' — renew immediately.',
          profileHref, subHref('dbs'));
      }
      if (c.dbsCertificatePath && !c.dbsExpiry) {
        push('info', p, type, 'DBS expiry missing',
          'DBS certificate is uploaded but no expiry date is set.',
          profileHref, subHref('dbs'));
      }
    }

    if (!c.isCitizen && !c.worksOutsideUK) {
      if (!c.rightToWorkCheckPath) {
        push('critical', p, type, 'Right to Work',
          'No right-to-work document on file — required for non-citizens.',
          profileHref, subHref('identity'));
      }
      var rtwDays = daysUntil(c.rightToWorkExpiry);
      if (rtwDays !== null && rtwDays < 0) {
        push('critical', p, type, 'Right to Work',
          'Right-to-work has expired — update immediately.',
          profileHref, subHref('identity'));
      }
      if (rtwDays !== null && rtwDays >= 0 && rtwDays < warningThreshold) {
        push('warning', p, type, 'RTW expiry',
          'Right-to-work expires in ' + rtwDays + ' day' + (rtwDays === 1 ? '' : 's') + ' — update before deadline.',
          profileHref, subHref('identity'));
      }
      if (c.rightToWorkCheckPath && !c.rightToWorkExpiry) {
        push('info', p, type, 'RTW expiry missing',
          'Right-to-work document is uploaded but no expiry date is set.',
          profileHref, subHref('identity'));
      }
    }

    if (!c.reference1Path) {
      push('warning', p, type, 'Reference 1',
        'Reference 1 has not been uploaded — required for the SCR.',
        profileHref, subHref('references'));
    }
    if (!c.reference2Path) {
      push('warning', p, type, 'Reference 2',
        'Reference 2 has not been uploaded — required for the SCR.',
        profileHref, subHref('references'));
    }

    if (!c.safeguardingTrainingDate && !c.safeguardingCertificatePath) {
      push('warning', p, type, 'Safeguarding',
        'No safeguarding training record on file.',
        profileHref, subHref('safeguarding'));
    }

    if (type === 'host' && !c.selfDeclarationDocPath) {
      push('critical', p, type, 'Self-Declaration',
        'No Homestay Self-Declaration (Appendix 5) on file.',
        profileHref, subHref('declaration'));
    }

    // Contract / agreement expiry. Checks a flat expiry field on the person record
    // first (forward-compatible with p.contractExpiry / p.agreementExpiry), then
    // falls back to the dedicated contracts store (entityType 'Staff' / 'Homestay',
    // see contracts.html) where actual contract records and their `validFrom` /
    // `validTo` dates live in this app today — picking the most recently started
    // (highest validFrom) non-Terminated contract as the current governing one.
    if (type === 'staff' || type === 'host') {
      var contractEntityType = (type === 'staff') ? 'Staff' : 'Homestay';
      var contractEditHref = 'contracts.html?tab=' + contractEntityType;
      var contractExpiryRaw = p.contractExpiry || p.agreementExpiry || null;

      if (!contractExpiryRaw && typeof getContractsByEntity === 'function') {
        try {
          var entityContracts = getContractsByEntity(contractEntityType, p.id)
            .filter(function (ct) { return ct.status !== 'Terminated'; })
            .sort(function (a, b) { return new Date(b.validFrom) - new Date(a.validFrom); });
          if (entityContracts.length > 0) {
            contractExpiryRaw = entityContracts[0].validTo;
          }
        } catch (e) {}
      }

      if (contractExpiryRaw) {
        var contractDays = daysUntil(contractExpiryRaw);
        if (contractDays !== null && contractDays < 0) {
          push('critical', p, type, 'Contract Expired',
            'Contract/agreement expired ' + Math.abs(contractDays) + ' day' + (Math.abs(contractDays) === 1 ? '' : 's') + ' ago — renew or terminate immediately.',
            profileHref, contractEditHref);
        } else if (contractDays !== null && contractDays >= 0 && contractDays < warningThreshold) {
          push('warning', p, type, 'Contract Expiring Soon',
            'Contract/agreement expires in ' + contractDays + ' day' + (contractDays === 1 ? '' : 's') + ' — renew before deadline.',
            profileHref, contractEditHref);
        }
      }
    }

    // AEGIS Standard 5.10.1.1 — annual in-person homestay visit must not lapse.
    // Legacy seed data stores annualVisitDue as a display string like "Due 14 May 2026",
    // so strip the "Due " prefix before parsing; well-formed ISO/ "Due "-less strings pass through unchanged.
    if (type === 'host') {
      var visitDueRaw = p.annualVisitDue ? String(p.annualVisitDue).replace('Due ', '') : null;
      var visitDays = daysUntil(visitDueRaw);
      if ((visitDays !== null && visitDays < 0) || p.annualVisitStatus === 'overdue') {
        push('critical', p, type, 'Overdue Annual Visit',
          'Annual in-person homestay visit is overdue' +
            (visitDays !== null && visitDays < 0
              ? ' by ' + Math.abs(visitDays) + ' day' + (Math.abs(visitDays) === 1 ? '' : 's')
              : '') + ' — do not allocate new student placements until completed.',
          profileHref, 'homestay-visit.html');
      }
    }

    // AEGIS Standard 5.10 — a failed H&S checklist item (or a checklist marked
    // 'Failed' at the host level) must block new placements until resolved.
    if (type === 'host') {
      var hsFailed = p.hsChecklist === 'Failed';
      if (!hsFailed) {
        try {
          var hsChecklists = getHsChecklistsForHost(p.id);
          var latestHs = hsChecklists.length > 0 ? hsChecklists[0] : null;
          if (latestHs && latestHs.items && Object.values(latestHs.items).indexOf('no') > -1) {
            hsFailed = true;
          }
        } catch (e) {}
      }
      if (hsFailed) {
        push('critical', p, type, 'H&S Checklist Failure',
          'Homestay health & safety checklist has one or more failed items — resolve before allocating new student placements.',
          profileHref, 'homestay-visit.html');
      }
    }

    // AEGIS Standard 5.10.1 — a host must never carry more active placements
    // than its approved bed capacity.
    if (type === 'host') {
      try {
        var hostCapacity = null;
        if (typeof p.capacityMax === 'number') {
          hostCapacity = p.capacityMax;
        } else if (typeof p.capacity === 'number') {
          hostCapacity = p.capacity;
        } else {
          var capRaw = p.capacity || p.capacityMax || p.homestayDetails;
          if (typeof capRaw === 'string') {
            var capMatch = capRaw.match(/of\s+(\d+)/i) || capRaw.match(/(\d+)/);
            if (capMatch) hostCapacity = parseInt(capMatch[1], 10);
          }
        }

        if (hostCapacity !== null && !isNaN(hostCapacity)) {
          var hostFullName = p.firstName + ' ' + p.lastName;
          var activeCount = getAllStudents().filter(function (s) {
            if (s.status !== 'Active') return false;
            if (Array.isArray(p.linkedStudents) && p.linkedStudents.indexOf(s.id) > -1) return true;
            if (s.hostId && s.hostId === p.id) return true;
            if (s.homestayFamily && s.homestayFamily === hostFullName) return true;
            return false;
          }).length;

          if (activeCount > hostCapacity) {
            push('critical', p, type, 'Host Over Capacity',
              'Host has ' + activeCount + ' active student' + (activeCount === 1 ? '' : 's') +
                ' placed against an approved capacity of ' + hostCapacity + ' — do not allocate further placements.',
              profileHref, 'host-edit.html?id=' + p.id);
          }
        }
      } catch (e) {}
    }
  }

  function checkStudent(s) {
    var profileHref = 'student-profile.html?id=' + s.id;
    var name = s.firstName + ' ' + s.lastName;

    function pushS(level, field, message, editHref) {
      alerts.push({ level: level, person: name, personId: s.id, type: 'student',
                    field: field, message: message, profileHref: profileHref, editHref: editHref });
    }

    if (!(s.legal && s.legal.passportOrBRPPath)) {
      pushS('critical', 'Passport / BRP', 'No passport or BRP document on file.');
    }
    if (!(s.legal && s.legal.permissions && isPermissionGranted(s.legal.permissions.medical))) {
      pushS(consentLevel,'Medical Consent', 'Medical consent form has not been signed.');
    }
    if (!(s.legal && s.legal.permissions && isPermissionGranted(s.legal.permissions.travel))) {
      pushS(consentLevel,'Travel Consent', 'Travel consent form has not been signed.');
    }
    if (!(s.legal && s.legal.permissions && isPermissionGranted(s.legal.permissions.photo))) {
      pushS(consentLevel,'Photo Consent', 'Photo consent form has not been signed.');
    }
    if (!(s.legal && s.legal.permissions && isPermissionGranted(s.legal.permissions.data))) {
      pushS(consentLevel,'Data Consent', 'Data consent form has not been signed.');
    }
    if (!(s.health && s.health.privateMedicalCover)) {
      pushS('warning', 'Medical Cover', 'No medical cover information on file.');
    }
    if (!(s.health && s.health.allergies)) {
      pushS('warning', 'Allergies', 'No allergy information on file.');
    }
    if (!(s.family && s.family.homeAddress)) {
      pushS('warning', 'Home Address', 'No home address on file.');
    }
    if (!(s.family && s.family.ukFamilyContacts)) {
      pushS('warning', 'UK Contacts', 'No UK emergency contacts on file.');
    }

    var riskHref = 'student-risk.html?id=' + s.id;
    if (!s.riskAssessmentFile) {
      pushS('critical', 'Risk Assessment', 'No risk assessment document on file.', riskHref);
    } else if (s.riskAssessmentExpiryDate) {
      var riskDays = daysUntil(s.riskAssessmentExpiryDate);
      if (riskDays !== null && riskDays < 0) {
        pushS('critical', 'Risk Assessment', 'Risk assessment has expired — upload new assessment immediately.', riskHref);
      } else if (riskDays !== null && riskDays >= 0 && riskDays < warningThreshold) {
        pushS('warning', 'Risk Assessment expiry', 'Risk assessment expires in ' + riskDays + ' day' + (riskDays === 1 ? '' : 's') + ' — update before deadline.', riskHref);
      }
    }

    // Annual review tracking (AEGIS Standard 3.4.1)
    if (s.reviewStatus === 'overdue' || s.reviewStatus === 'due-soon') {
      var reviewHref = 'student-profile.html?id=' + s.id;
      var dueLabel = s.reviewDueDate ? new Date(s.reviewDueDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : 'an unknown date';
      if (s.reviewStatus === 'overdue') {
        pushS('critical', 'Annual Review', name + ' — Annual student information review overdue since ' + dueLabel + '. AEGIS Standard 3.4.1 requires at least annual review.', reviewHref);
      } else {
        pushS('warning', 'Annual Review', name + ' — Annual student information review due ' + dueLabel + '. AEGIS Standard 3.4.1 requires at least annual review.', reviewHref);
      }
    }

    // Welfare check-in cadence check (AEGIS Standard 3.2.1)
    // Day students follow a termly cadence (AEGIS Standard 3.2.2) rather than the
    // fortnightly boarding/homestay cadence, so they get their own longer threshold
    // and are routed away from the standard 14-day boarding rule entirely.
    if (typeof getStudentWelfareCadenceStatus === 'function') {
      var cadence = getStudentWelfareCadenceStatus(s.id);
      var welfareHref = 'welfare-note-create.html?id=' + s.id;
      var isDayStudent = !!(s.accommodationType && s.accommodationType.toLowerCase().indexOf('day') > -1);

      if (isDayStudent) {
        var DAY_STUDENT_CADENCE_DAYS = 45;
        if (!cadence.lastCheckDate) {
          pushS('warning', 'Day-Student Welfare Check Overdue', 'No welfare check-in or contact on file for this day student (AEGIS Standard 3.2.2 termly cadence).', welfareHref);
        } else if (cadence.daysSince > DAY_STUDENT_CADENCE_DAYS) {
          pushS('warning', 'Day-Student Welfare Check Overdue', 'Overdue welfare check-in: ' + cadence.daysSince + ' days since last contact on ' + cadence.lastCheckDate + ' (AEGIS 3.2.2 day-student termly cadence — threshold ' + DAY_STUDENT_CADENCE_DAYS + ' days).', welfareHref);
        }
      } else if (cadence.status === 'overdue' || cadence.cls === 'red') {
        if (!cadence.lastCheckDate) {
          pushS('warning', 'Welfare Check-in', 'No welfare check-in or contact on file for this student (AEGIS Standard 3.2.1).', welfareHref);
        } else if (cadence.daysSince > 14) {
          pushS('warning', 'Welfare Check-in Cadence', 'Overdue welfare check-in: ' + cadence.daysSince + ' days since last contact on ' + cadence.lastCheckDate + ' (AEGIS 3.2.1 rule: every 14 days).', welfareHref);
        }
      }
    }

    // AEGIS Standard 8.1 — Private Fostering statutory threshold (Children Act 1989).
    // A child under 16 (or under 18 with a documented disability extension) in a
    // continuous homestay placement for 28+ days is a private fostering arrangement
    // and must be notified to the Local Authority. Mirrors the 21/28-day amber/red
    // guardrail already enforced in private-fostering.html so both pages agree.
    try {
      if (s.accommodationType !== 'Day Student') {
        var pfAge = null;
        if (s.dob) {
          var pfDob = new Date(s.dob);
          if (!isNaN(pfDob.getTime())) {
            pfAge = today.getFullYear() - pfDob.getFullYear();
            if (today.getMonth() < pfDob.getMonth() ||
                (today.getMonth() === pfDob.getMonth() && today.getDate() < pfDob.getDate())) {
              pfAge--;
            }
          }
        }
        var pfDisabilityExtension = s.disabilityUnder18 === true && pfAge !== null && pfAge < 18;

        if (pfAge !== null && (pfAge < 16 || pfDisabilityExtension)) {
          var pfPlacementStart = s.placementStartDate || s.arrivalDate;
          if (pfPlacementStart) {
            var pfStartDate = new Date(pfPlacementStart);
            if (!isNaN(pfStartDate.getTime())) {
              pfStartDate.setHours(0, 0, 0, 0);
              var pfDaysInPlacement = Math.floor((today - pfStartDate) / 86400000);

              if (pfDaysInPlacement >= 28) {
                var pfDocumented = !!(s.privateFostering && s.privateFostering.isApplicable === true);
                if (!pfDocumented) {
                  pushS('critical', 'PF 28-Day Rule Breach',
                    'Under-16 homestay placement has reached ' + pfDaysInPlacement + ' consecutive days without a documented private fostering arrangement — statutory Local Authority notification required under the Children Act 1989.',
                    'private-fostering.html');
                }
              } else if (pfDaysInPlacement >= 21) {
                pushS('warning', 'PF 28-Day Rule Warning',
                  'Under-16 homestay placement has reached ' + pfDaysInPlacement + ' consecutive days — approaching the 28-day private fostering statutory threshold.',
                  'private-fostering.html');
              }
            }
          }
        }
      }
    } catch (e) {}

    // Low held-funds balance (AEGIS Standard 2.9.2)
    try {
      if (typeof getStudentFundSummary === 'function') {
        var funds = getStudentFundSummary(s.id);
        if (funds && typeof funds.balanceHeld === 'number' && funds.balanceHeld > 0 && funds.balanceHeld < 50) {
          pushS('warning', 'Student Funds', 'Held funds balance is £' + funds.balanceHeld.toFixed(2) + ' — below the £50 minimum reserve.', 'student-funds.html?id=' + s.id);
        }
      }
    } catch (e) {}
  }

  getAllStaff().forEach(function (p)   { checkPerson(p, 'staff');  });
  getAllHosts().forEach(function (p)    { checkPerson(p, 'host');   });
  getAllDrivers().forEach(function (p)  { checkPerson(p, 'driver'); });
  getAllStudents().forEach(checkStudent);

  // ── Role-based training requirements ─────────────────────────────────────
  function checkTrainingRequirements(person, type) {
    if (typeof getRequiredCoursesForPerson !== 'function') return;
    var profileHref = type === 'staff' ? ('staff-compliance.html?id=' + person.id)
      : type === 'driver' ? ('driver-compliance.html?id=' + person.id)
      : ('host-compliance.html?id=' + person.id);

    getRequiredCoursesForPerson(person, type).forEach(function (r) {
      if (r.status === 'Overdue' || r.status === 'Not started') {
        push('critical', person, type, 'Training',
          (r.status === 'Not started' ? 'Training not started — ' : 'Training overdue — ') +
            r.course.title + ' (' + r.requirementRule + ').',
          profileHref, profileHref);
      } else if (r.status === 'Due soon') {
        push('warning', person, type, 'Training',
          r.course.title + ' renewal due ' + (r.expiryDate || 'soon') + '.',
          profileHref, profileHref);
      }
    });
  }

  getAllStaff().filter(function (p) { return p.status === 'Active'; })
    .forEach(function (p) { checkTrainingRequirements(p, 'staff'); });
  getAllHosts().filter(function (p) { return p.status === 'approved'; })
    .forEach(function (p) { checkTrainingRequirements(p, 'host'); });
  // Drivers carry no status field in this app's data model (unlike staff/host),
  // so every driver on the roster is checked rather than filtering by status.
  getAllDrivers()
    .forEach(function (p) { checkTrainingRequirements(p, 'driver'); });

  try {
    var raw = localStorage.getItem('og_custom_notifs');
    if (raw) {
      var customNotifs = JSON.parse(raw);
      customNotifs.forEach(function (notif, index) {
        if (!Array.isArray(notif.categories)) return;
        notif.categories.forEach(function (category) {
          alerts.push({
            type:        category,
            level:       notif.level,
            person:      notif.person,
            field:       notif.field,
            message:     notif.message,
            isCustom:    true,
            customIndex: index
          });
        });
      });
    }
  } catch (e) {}

  // ── Organisation-level checks: insurances + 14-day significant changes clock ──
  // (AEGIS Standards 1.1, 2.1.1, 2.4.1, 2.7.2, 2.11.1)
  try {
    var org = getOrganisation();
    if (org) {
      var orgHref = 'organisation-profile.html';

      var insuranceLabels = {
        professionalIndemnity: 'Professional Indemnity Insurance',
        publicLiability:       'Public Liability Insurance',
        employersLiability:    "Employers' Liability Insurance"
      };
      Object.keys(insuranceLabels).forEach(function (key) {
        var policy = org.insurances && org.insurances[key];
        if (!policy) return;
        var label = insuranceLabels[key];
        if (!policy.expiryDate) {
          if (policy.insurer || policy.policyNo) {
            alerts.push({ level: 'warning', person: 'Organisation', personId: 'ORG', type: 'organisation',
              field: label, message: label + ' has no expiry date on file.', profileHref: orgHref, editHref: orgHref });
          }
          return;
        }
        var insDays = daysUntil(policy.expiryDate);
        if (insDays !== null && insDays < 0) {
          alerts.push({ level: 'critical', person: 'Organisation', personId: 'ORG', type: 'organisation',
            field: label, message: label + ' has expired — renew immediately.', profileHref: orgHref, editHref: orgHref });
        } else if (insDays !== null && insDays < warningThreshold) {
          alerts.push({ level: 'warning', person: 'Organisation', personId: 'ORG', type: 'organisation',
            field: label, message: label + ' expires in ' + insDays + ' day' + (insDays === 1 ? '' : 's') + ' — renew before deadline.', profileHref: orgHref, editHref: orgHref });
        }
      });

      (org.significantChangesLog || []).forEach(function (change) {
        if (change.reportedToAegisDate) return;
        var changeDays = daysUntil(change.deadline14Days);
        if (changeDays !== null && changeDays < 0) {
          alerts.push({ level: 'critical', person: 'Organisation', personId: 'ORG', type: 'organisation',
            field: 'Significant Change', message: 'Significant change "' + (change.changeDescription || change.id) + '" is overdue for AEGIS notification (14-day deadline passed).', profileHref: orgHref, editHref: orgHref });
        } else if (changeDays !== null && changeDays < warningThreshold) {
          alerts.push({ level: 'warning', person: 'Organisation', personId: 'ORG', type: 'organisation',
            field: 'Significant Change', message: 'Significant change "' + (change.changeDescription || change.id) + '" must be reported to AEGIS within ' + changeDays + ' day' + (changeDays === 1 ? '' : 's') + '.', profileHref: orgHref, editHref: orgHref });
        }
      });

      if (!org.aimsStatement && !org.aimsDocPath) {
        alerts.push({ level: 'warning', person: 'Organisation', personId: 'ORG', type: 'organisation',
          field: 'Statement of Aims', message: 'No statement of aims or principles on file — required for AEGIS accreditation (Standard 1.1).', profileHref: orgHref, editHref: orgHref });
      }

      if (!org.organogramDocPath) {
        alerts.push({ level: 'warning', person: 'Organisation', personId: 'ORG', type: 'organisation',
          field: 'Organisation Chart', message: 'No organogram document uploaded — required by AEGIS Standard 2.1.1.', profileHref: orgHref, editHref: orgHref });
      }

      if (!org.icoRegistrationNumber) {
        alerts.push({ level: 'critical', person: 'Organisation', personId: 'ORG', type: 'organisation',
          field: 'ICO Registration', message: 'No ICO data protection registration number on file — required by AEGIS Standard 2.7.2.', profileHref: orgHref, editHref: orgHref });
      } else if (org.icoExpiryDate) {
        var icoDays = daysUntil(org.icoExpiryDate);
        if (icoDays !== null && icoDays < 0) {
          alerts.push({ level: 'critical', person: 'Organisation', personId: 'ORG', type: 'organisation',
            field: 'ICO Registration', message: 'ICO registration has expired — renew immediately.', profileHref: orgHref, editHref: orgHref });
        } else if (icoDays !== null && icoDays < warningThreshold) {
          alerts.push({ level: 'warning', person: 'Organisation', personId: 'ORG', type: 'organisation',
            field: 'ICO Registration', message: 'ICO registration expires in ' + icoDays + ' day' + (icoDays === 1 ? '' : 's') + '.', profileHref: orgHref, editHref: orgHref });
        }
      }

      if (org.annualDeclarationLastSubmitted) {
        var declDays = daysUntil(org.annualDeclarationLastSubmitted);
        if (declDays !== null && declDays < -365) {
          alerts.push({ level: 'critical', person: 'Organisation', personId: 'ORG', type: 'organisation',
            field: 'Annual Declaration', message: 'AEGIS Annual Declaration is overdue — last submitted more than 12 months ago.', profileHref: orgHref, editHref: orgHref });
        } else if (declDays !== null && declDays < -330) {
          alerts.push({ level: 'warning', person: 'Organisation', personId: 'ORG', type: 'organisation',
            field: 'Annual Declaration', message: 'AEGIS Annual Declaration is due for renewal within the next 35 days.', profileHref: orgHref, editHref: orgHref });
        }
      } else {
        alerts.push({ level: 'warning', person: 'Organisation', personId: 'ORG', type: 'organisation',
          field: 'Annual Declaration', message: 'No AEGIS Annual Declaration submission date on file.', profileHref: orgHref, editHref: orgHref });
      }

      if (org.reInspectionDueDate) {
        var reinspDays = daysUntil(org.reInspectionDueDate);
        if (reinspDays !== null && reinspDays < 0) {
          alerts.push({ level: 'critical', person: 'Organisation', personId: 'ORG', type: 'organisation',
            field: 'AEGIS Re-inspection', message: 'AEGIS re-inspection date has passed — contact AEGIS to schedule.', profileHref: orgHref, editHref: orgHref });
        } else if (reinspDays !== null && reinspDays < 90) {
          alerts.push({ level: 'warning', person: 'Organisation', personId: 'ORG', type: 'organisation',
            field: 'AEGIS Re-inspection', message: 'AEGIS re-inspection is due in ' + reinspDays + ' day' + (reinspDays === 1 ? '' : 's') + ' — begin preparation.', profileHref: orgHref, editHref: orgHref });
        }
      }
    }
  } catch (e) {}

  // Unacknowledged safeguarding policy by active staff or approved hosts (AEGIS 2.1.6, 6.1.1).
  try {
    var checkAckPerson = function (p, type) {
      var unacked = getUnacknowledgedPoliciesForPerson(p.id, type).filter(function (doc) {
        return (doc.category || '').toLowerCase().indexOf('safe') > -1;
      });
      if (unacked.length === 0) return;
      var profileHref = type === 'staff' ? ('staff-profile.html?id=' + p.id) : ('host-profile.html?id=' + p.id);
      unacked.forEach(function (doc) {
        alerts.push({ level: 'warning', person: p.firstName + ' ' + p.lastName, personId: p.id, type: type,
          field: 'Policy Acknowledgement', message: 'Has not acknowledged "' + doc.title + '".', profileHref: profileHref, editHref: profileHref });
      });
    };
    getAllStaff().filter(function (p) { return p.status === 'Active'; }).forEach(function (p) { checkAckPerson(p, 'staff'); });
    getAllHosts().filter(function (h) { return h.status === 'approved'; }).forEach(function (h) { checkAckPerson(h, 'host'); });
  } catch (e) {}

  // Open Stage 3 AEGIS Panel complaints (AEGIS Standard 7).
  try {
    getAllComplaints().filter(function (c) {
      return c.currentStage === 'Stage 3: AEGIS Panel' && c.outcome === 'In Progress';
    }).forEach(function (c) {
      var href = 'complaint-create.html?id=' + c.id;
      alerts.push({ level: 'critical', person: c.complainantName || 'Complainant', personId: c.id, type: 'complaint',
        field: 'AEGIS Panel', message: 'Complaint ' + (c.refNumber || c.id) + ' is open at Stage 3: AEGIS Panel and requires resolution.', profileHref: href, editHref: href });
    });
  } catch (e) {}

  // Overdue DBS / self-declarations for homestay household members aged 16+ (AEGIS 5.1.3).
  try {
    getAllHosts().forEach(function (h) {
      (h.householdMembers || []).forEach(function (m) {
        if (!m.isOver16) return;
        var memberName = m.fullName || m.name || 'Household member';
        var href = 'host-compliance.html?id=' + h.id;
        if (!m.dbsNumber) {
          alerts.push({ level: 'critical', person: memberName, personId: m.id || h.id, type: 'host',
            field: 'Household DBS', message: memberName + ' (household member of ' + h.firstName + ' ' + h.lastName + ') has no DBS on file.', profileHref: href, editHref: href });
        }
        var memberDbsDays = daysUntil(m.dbsExpiry);
        if (memberDbsDays !== null && memberDbsDays < 0) {
          alerts.push({ level: 'critical', person: memberName, personId: m.id || h.id, type: 'host',
            field: 'Household DBS expiry', message: memberName + "'s DBS has expired.", profileHref: href, editHref: href });
        } else if (memberDbsDays !== null && memberDbsDays < warningThreshold) {
          alerts.push({ level: 'warning', person: memberName, personId: m.id || h.id, type: 'host',
            field: 'Household DBS expiry', message: memberName + "'s DBS expires in " + memberDbsDays + ' day' + (memberDbsDays === 1 ? '' : 's') + '.', profileHref: href, editHref: href });
        }
        if (!m.selfDeclarationDate) {
          alerts.push({ level: 'warning', person: memberName, personId: m.id || h.id, type: 'host',
            field: 'Household Self-Declaration', message: memberName + ' has not completed a self-declaration.', profileHref: href, editHref: href });
        }
      });
    });
  } catch (e) {}

  // Unresolved complaints open more than 14 days, any stage (AEGIS Standard 7).
  try {
    getAllComplaints().forEach(function (c) {
      if (c.outcome !== 'In Progress') return;
      if (c.currentStage === 'Stage 3: AEGIS Panel') return; // already handled above
      var daysSince = daysUntil(c.dateReceived);
      if (daysSince !== null && daysSince < -14) {
        alerts.push({ level: 'warning', person: c.complainantName || 'Complainant', personId: c.id, type: 'complaint',
          field: 'Unresolved Complaint', message: 'Complaint ' + (c.refNumber || c.id) + ' has been open for ' + Math.abs(daysSince) + ' days without resolution.',
          profileHref: 'complaint-create.html?id=' + c.id, editHref: 'complaint-create.html?id=' + c.id });
      }
    });
  } catch (e) {}

  // Unapproved exeats starting within 7 days.
  try {
    getAllExeats().forEach(function (ex) {
      if (ex.parentConfirmation === 'Yes') return;
      var daysToStart = daysUntil(ex.startDate);
      if (daysToStart !== null && daysToStart >= 0 && daysToStart <= 7) {
        var studentName = ex.studentName || 'Unknown student';
        alerts.push({ level: daysToStart <= 2 ? 'critical' : 'warning', person: studentName, personId: ex.studentId || '', type: 'operations',
          field: 'Unapproved Exeat', message: 'Exeat ' + ex.id + ' starts in ' + daysToStart + ' day' + (daysToStart === 1 ? '' : 's') + ' but parent confirmation is not received.',
          profileHref: 'exeats.html', editHref: 'exeats.html' });
      }
    });
  } catch (e) {}

  // Unresolved severe/major incidents.
  try {
    getAllIncidents().forEach(function (inc) {
      if (inc.status === 'Resolved') return;
      var sev = (inc.severity || '').toLowerCase();
      if (sev.indexOf('severe') === -1 && sev.indexOf('major') === -1) return;
      var daysSince = daysUntil(inc.date);
      alerts.push({ level: 'critical', person: inc.personName || 'Unknown', personId: inc.personId || '', type: 'operations',
        field: 'Open Severe Incident', message: 'Incident ' + inc.id + ' (severity: ' + inc.severity + ') is still open' + (daysSince !== null ? ' after ' + Math.abs(daysSince) + ' days' : '') + '.',
        profileHref: 'homestay-incident-create.html?id=' + inc.id, editHref: 'homestay-incident-create.html?id=' + inc.id });
    });
  } catch (e) {}

  return alerts;
}

// ── Compliance data migration ─────────────────────────────────────────────────

var DEFAULT_COMPLIANCE = {
  idDocumentPath:              '',
  rightToWorkCheckPath:        '',
  isCitizen:                   false,
  worksOutsideUK:              false,
  rightToWorkExpiry:           '',
  dbsNumber:                   '',
  dbsLastChecked:              '',
  dbsCertificatePath:          '',
  dbsUpdateService:            false,
  dbsExpiry:                   '',
  reference1Path:              '',
  reference2Path:              '',
  livedAbroad:                 false,
  overseasCheckDocPath:        '',
  safeguardingTrainingDate:    '',
  safeguardingCertificatePath: ''
};

// AEGIS 6.3 — hosts/drivers track a 3-year statutory safeguarding training expiry + level;
// staff instead track an annual safeguarding update on top of their initial training.
var DEFAULT_HOST_DRIVER_SAFEGUARDING = {
  safeguardingTrainingExpiry: '',
  safeguardingLevel:          ''
};
var DEFAULT_STAFF_SAFEGUARDING = {
  annualSafeguardingUpdateDate:  '',
  annualSafeguardingUpdateNotes: ''
};

function migrateComplianceData() {
  var staff = getAllStaff();
  var staffChanged = false;
  staff.forEach(function (member) {
    if (!member.compliance) {
      member.compliance = Object.assign({}, DEFAULT_COMPLIANCE, DEFAULT_STAFF_SAFEGUARDING);
      staffChanged = true;
    }
  });
  if (staffChanged) saveAllStaff(staff);

  var drivers = getAllDrivers();
  var driversChanged = false;
  drivers.forEach(function (driver) {
    if (!driver.compliance) {
      driver.compliance = Object.assign({}, DEFAULT_COMPLIANCE, DEFAULT_HOST_DRIVER_SAFEGUARDING);
      driversChanged = true;
    }
  });
  if (driversChanged) saveAllDrivers(drivers);

  var hosts = getAllHosts();
  var hostsChanged = false;
  hosts.forEach(function (host) {
    if (!host.compliance) {
      host.compliance = Object.assign({}, DEFAULT_COMPLIANCE, DEFAULT_HOST_DRIVER_SAFEGUARDING);
      hostsChanged = true;
    }
  });
  if (hostsChanged) saveAllHosts(hosts);
}

migrateComplianceData();

// Backfills host.compliance.dbsNumber (and related fields) from the legacy
// root-level DBS fields. The alert engine only reads the compliance.* copy,
// so hosts whose DBS was recorded pre-compliance-object were showing false
// "No DBS on file" alerts. Per-host, per-field guard makes this idempotent —
// once compliance.dbsNumber is populated it's left alone on later runs.
function migrateHostDbsToCompliance() {
  var hosts = getAllHosts();
  var hostsChanged = false;
  hosts.forEach(function (host) {
    if (!host.compliance) return;
    if (!host.compliance.dbsNumber && host.dbsCertNumber) {
      host.compliance.dbsNumber = host.dbsCertNumber;
      host.compliance.dbsLastChecked = host.dbsIssueDate || '';
      host.compliance.dbsExpiry = host.dbsRenewalDue || '';
      host.compliance.dbsUpdateService = (host.dbsUpdateService && host.dbsUpdateService.indexOf('Subscribed') > -1);
      hostsChanged = true;
    }
  });
  if (hostsChanged) saveAllHosts(hosts);
}
migrateHostDbsToCompliance();

// Same backfill as migrateHostDbsToCompliance(), for drivers.
function migrateDriverDbsToCompliance() {
  var drivers = getAllDrivers();
  var driversChanged = false;
  drivers.forEach(function (driver) {
    if (!driver.compliance) return;
    if (!driver.compliance.dbsNumber && driver.dbsCertNumber) {
      driver.compliance.dbsNumber = driver.dbsCertNumber;
      driver.compliance.dbsLastChecked = driver.dbsIssueDate || '';
      driver.compliance.dbsExpiry = driver.dbsRenewalDue || '';
      driver.compliance.dbsUpdateService = (driver.dbsUpdateService && driver.dbsUpdateService.indexOf('Subscribed') > -1);
      driversChanged = true;
    }
  });
  if (driversChanged) saveAllDrivers(drivers);
}
migrateDriverDbsToCompliance();

// Backfills staff.compliance.safeguardingTrainingDate (and level) from the
// legacy root-level training fields, same rationale as the DBS migrations above.
function migrateStaffTrainingToCompliance() {
  var staff = getAllStaff();
  var staffChanged = false;
  staff.forEach(function (member) {
    if (!member.compliance) return;
    if (!member.compliance.safeguardingTrainingDate && member.trainingDate) {
      member.compliance.safeguardingTrainingDate = member.trainingDate;
      if (member.trainingLevel) {
        member.compliance.safeguardingLevel = member.trainingLevel;
      }
      staffChanged = true;
    }
  });
  if (staffChanged) saveAllStaff(staff);
}
migrateStaffTrainingToCompliance();

// ── Welfare Logs ──────────────────────────────────────────────────────────────

function getAllWelfareLogs() {
  try {
    return JSON.parse(localStorage.getItem(OG_WELFARE_LOGS_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function getWelfareLogsForStudent(studentId) {
  return getAllWelfareLogs()
    .filter(function (log) { return log.studentId === studentId; })
    .sort(function (a, b) { return new Date(b.date) - new Date(a.date); });
}

// AEGIS Standard 3.2 — weekly welfare check-in cadence. Looks at the most
// recent welfare log (check-in or staff-note) and buckets it into a status
// badge: same-day, within the week, or overdue.
function getStudentWelfareCadenceStatus(studentId) {
  var logs = getWelfareLogsForStudent(studentId);
  if (!logs.length) {
    return { label: 'Check-in due', cls: 'red', lastCheckDate: null, daysSince: null };
  }

  var lastDate = new Date(logs[0].date);
  var today = new Date();
  today.setHours(0, 0, 0, 0);
  lastDate.setHours(0, 0, 0, 0);
  var daysSince = Math.round((today - lastDate) / 86400000);

  var label, cls;
  if (daysSince <= 0) {
    label = 'Checked in today';
    cls = 'green';
  } else if (daysSince <= 6) {
    label = 'Checked in ' + daysSince + 'd ago';
    cls = 'amber';
  } else {
    label = 'Check-in due';
    cls = 'red';
  }

  return { label: label, cls: cls, lastCheckDate: logs[0].date, daysSince: daysSince };
}

function saveWelfareLog(log) {
  var logs = getAllWelfareLogs();
  logs.push(log);
  commitWithAudit(OG_WELFARE_LOGS_KEY, logs, 'saveWelfareLog');
}

// ── Mental Health Suite ───────────────────────────────────────────────────────

function getMHCaseForStudent(studentId) {
  var cases = {};
  try { cases = JSON.parse(localStorage.getItem(OG_MH_CASES_KEY)) || {}; } catch (e) {}
  var caseObj = cases[studentId] || { studentId: studentId, leadStaff: '', status: '', supportOptions: [] };
  caseObj.supportNotes = caseObj.supportNotes || {};
  return caseObj;
}

function saveMHCase(caseObj) {
  var cases = {};
  try { cases = JSON.parse(localStorage.getItem(OG_MH_CASES_KEY)) || {}; } catch (e) {}
  cases[caseObj.studentId] = caseObj;
  commitWithAudit(OG_MH_CASES_KEY, cases, 'saveMHCase');
}

function getMHCommsForStudent(studentId) {
  var comms = [];
  try { comms = JSON.parse(localStorage.getItem(OG_MH_COMMS_KEY)) || []; } catch (e) {}
  return comms
    .filter(function (c) { return c.studentId === studentId; })
    .sort(function (a, b) { return new Date(b.date) - new Date(a.date); });
}

function saveMHComm(comm) {
  var comms = [];
  try { comms = JSON.parse(localStorage.getItem(OG_MH_COMMS_KEY)) || []; } catch (e) {}
  comms.push(comm);
  commitWithAudit(OG_MH_COMMS_KEY, comms, 'saveMHComm');
}

function saveMHRemoval(form) {
  var removals = [];
  try { removals = JSON.parse(localStorage.getItem(OG_MH_REMOVALS_KEY)) || []; } catch (e) {}
  removals.push(form);
  commitWithAudit(OG_MH_REMOVALS_KEY, removals, 'saveMHRemoval');
}

// ── H&S Checklists ────────────────────────────────────────────────────────────

var OG_HS_CHECKLISTS_KEY = 'og_hs_checklists';

function getAllHsChecklists() {
  try { return JSON.parse(localStorage.getItem(OG_HS_CHECKLISTS_KEY)) || []; } catch (e) { return []; }
}

function saveHsChecklist(checklist) {
  var checklists = getAllHsChecklists();
  if (!checklist.id) checklist.id = 'HSC' + Math.floor(Math.random() * 100000);
  var existing = checklists.findIndex(function(c) { return c.id === checklist.id; });
  if (existing > -1) {
    checklists[existing] = checklist;
  } else {
    checklists.push(checklist);
  }
  commitWithAudit(OG_HS_CHECKLISTS_KEY, checklists, 'saveHsChecklist');
  return checklist.id;
}

function getHsChecklistsForHost(hostId) {
  return getAllHsChecklists()
    .filter(function(c) { return c.hostId === hostId; })
    .sort(function(a, b) { return new Date(b.createdAt) - new Date(a.createdAt); });
}

// ── Training Logs ─────────────────────────────────────────────────────────────

var OG_TRAINING_LOGS_KEY = 'og_training_logs';

function getAllTrainingLogs() {
  try { return JSON.parse(localStorage.getItem(OG_TRAINING_LOGS_KEY)) || []; } catch (e) { return []; }
}

function saveTrainingLog(log) {
  var logs = getAllTrainingLogs();
  if (!log.id) log.id = 'TRN' + Math.floor(Math.random() * 100000);
  var existing = logs.findIndex(function(l) { return l.id === log.id; });
  if (existing > -1) {
    logs[existing] = log;
  } else {
    logs.push(log);
  }
  commitWithAudit(OG_TRAINING_LOGS_KEY, logs, 'saveTrainingLog');

  // A log entered against a catalog course also counts as a completion, so
  // role-based training status (staff-compliance.html, staff-profile.html)
  // reflects it without a separate save step.
  if (log.courseId && log.personId && log.date) {
    saveTrainingCompletion({
      personId:        log.personId,
      personType:      log.personType || 'host',
      courseId:        log.courseId,
      completedDate:   log.date,
      certificatePath: log.trainingCertPath || '',
      notes:           log.notes || '',
      sourceLogId:     log.id
    });
  }

  return log.id;
}

function getTrainingLogsForHost(hostId) {
  return getAllTrainingLogs()
    .filter(function(l) { return l.hostId === hostId; })
    .sort(function(a, b) { return new Date(b.createdAt) - new Date(a.createdAt); });
}

// ── Visit Reports ─────────────────────────────────────────────────────────────

var OG_VISIT_REPORTS_KEY = 'og_visit_reports';

function getAllVisitReports() {
  try { return JSON.parse(localStorage.getItem(OG_VISIT_REPORTS_KEY)) || []; } catch (e) { return []; }
}

function saveVisitReport(report) {
  var reports = getAllVisitReports();
  if (!report.id) report.id = 'VST' + Math.floor(Math.random() * 100000);
  var existing = reports.findIndex(function(r) { return r.id === report.id; });
  if (existing > -1) { reports[existing] = report; } else { reports.push(report); }
  commitWithAudit(OG_VISIT_REPORTS_KEY, reports, 'saveVisitReport');

  var isAnnualOrInitial = (report.visitType === 'Annual review' || report.visitType === 'Initial pre-placement');
  var isApproved = (report.outcome === 'approved' || report.outcome === 'approved_after_actions');

  if (isAnnualOrInitial && isApproved && report.dateOfVisit) {
    var h = getHostById(report.hostId);
    if (h) {
      h.annualVisitLast = report.dateOfVisit;
      var d = new Date(report.dateOfVisit);
      if (!isNaN(d.getTime())) {
        d.setFullYear(d.getFullYear() + 1);
        h.annualVisitDue = d.toISOString().split('T')[0];
        h.annualVisitStatus = 'complete';
        saveHost(h);
      }
    }
  }
  return report.id;
}

function getVisitReportsForHost(hostId) {
  return getAllVisitReports()
    .filter(function(r) { return r.hostId === hostId; })
    .sort(function(a, b) { return new Date(b.dateOfVisit) - new Date(a.dateOfVisit); });
}

function getHostInPersonVisitStatus(hostId) {
  var reports = getVisitReportsForHost(hostId) || [];
  var host = getHostById(hostId);

  var approvedReports = reports.filter(function(r) {
    var isApproved = (r.outcome === 'approved' || r.outcome === 'approved_after_actions');
    return isApproved && r.dateOfVisit;
  });

  var latestReport = approvedReports.length ? approvedReports[0] : null;
  var latestDateStr = latestReport ? latestReport.dateOfVisit : (host ? host.annualVisitLast : null);
  var latestDate = null;

  if (latestDateStr) {
    var parsed = new Date(latestDateStr);
    if (!isNaN(parsed.getTime())) {
      latestDate = parsed;
    }
  }

  var today = new Date();
  today.setHours(0, 0, 0, 0);

  if (!latestDate) {
    return {
      status: 'missing',
      cls: 'red',
      label: 'No in-person visit on record',
      warning: 'AEGIS Standard 5.10.1.1: No approved in-person assessment visit on record. Do not assign or place students with this host until an in-person assessment has been conducted and approved.',
      isCurrent: false,
      lastVisitDate: null,
      daysSince: null,
      expiryDate: null
    };
  }

  latestDate.setHours(0, 0, 0, 0);
  var daysSince = Math.round((today - latestDate) / 86400000);
  var expiryDate = new Date(latestDate);
  expiryDate.setFullYear(expiryDate.getFullYear() + 1); // 12-month annual cycle
  var daysUntilExpiry = Math.round((expiryDate - today) / 86400000);

  if (daysUntilExpiry < 0) {
    return {
      status: 'overdue',
      cls: 'red',
      label: 'In-person visit overdue (' + Math.abs(daysUntilExpiry) + 'd overdue)',
      warning: 'AEGIS Standard 5.10.1.1: In-person assessment visit expired ' + Math.abs(daysUntilExpiry) + ' days ago (Last: ' + latestDateStr + '). Do not allocate new student placements until an annual assessment is completed.',
      isCurrent: false,
      lastVisitDate: latestDateStr,
      daysSince: daysSince,
      expiryDate: expiryDate.toISOString().slice(0, 10)
    };
  } else if (daysUntilExpiry <= 30) {
    return {
      status: 'expiring_soon',
      cls: 'amber',
      label: 'In-person visit expiring in ' + daysUntilExpiry + 'd',
      warning: 'AEGIS Standard 5.10.3: Annual in-person visit expires in ' + daysUntilExpiry + ' days. Schedule annual review before deadline.',
      isCurrent: true,
      lastVisitDate: latestDateStr,
      daysSince: daysSince,
      expiryDate: expiryDate.toISOString().slice(0, 10)
    };
  } else {
    return {
      status: 'current',
      cls: 'green',
      label: 'In-person visit current (Valid until ' + expiryDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) + ')',
      warning: null,
      isCurrent: true,
      lastVisitDate: latestDateStr,
      daysSince: daysSince,
      expiryDate: expiryDate.toISOString().slice(0, 10)
    };
  }
}

// ── Schools ───────────────────────────────────────────────────────────────────

function getSchools() {
  try {
    return JSON.parse(localStorage.getItem(OG_SCHOOLS_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function getSchoolById(id) {
  return getSchools().find(function (s) { return s.id === id; }) || null;
}

function upsertSchool(school) {
  var schools = getSchools();
  var index = schools.findIndex(function (s) { return s.id === school.id; });
  if (index > -1) {
    schools[index] = school;
  } else {
    schools.push(school);
  }
  localStorage.setItem(OG_SCHOOLS_KEY, JSON.stringify(schools));
}

function generateSchoolId() {
  var schools = getSchools();
  var maxNum = 0;
  schools.forEach(function (s) {
    var num = parseInt(String(s.id).replace('SCH', ''), 10);
    if (!isNaN(num) && num > maxNum) maxNum = num;
  });
  var next = maxNum + 1;
  return 'SCH' + String(next).padStart(5, '0');
}

function deleteSchoolById(id) {
  var school = getSchoolById(id);
  if (!school) {
    throw new Error('School not found.');
  }
  // Oxford Guardians provides guardianship services to the student, not the school —
  // but a school record can't be removed while it's still linked to students on the roster.
  var enrolled = getAllStudents().filter(function (s) {
    return s.schoolId === id || s.school === school.name;
  });
  if (enrolled.length > 0) {
    throw new Error('Cannot delete ' + school.name + ': ' + enrolled.length + ' student(s) are still enrolled at this school. Reassign or remove them first.');
  }
  var schools = getSchools().filter(function (s) { return s.id !== id; });
  localStorage.setItem(OG_SCHOOLS_KEY, JSON.stringify(schools));
}

// ── School Logs ───────────────────────────────────────────────────────────────

function getSchoolLogs() {
  try {
    return JSON.parse(localStorage.getItem(OG_SCHOOL_LOGS_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function saveSchoolLog(log) {
  if (!log.status) { log.status = 'Pending'; }
  var logs = getSchoolLogs();
  logs.unshift(log);
  commitWithAudit(OG_SCHOOL_LOGS_KEY, logs, 'saveSchoolLog');
}

// ── Parent Logs ───────────────────────────────────────────────────────────────

function getParentLogs() {
  try {
    return JSON.parse(localStorage.getItem(OG_PARENT_LOGS_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function saveParentLog(log) {
  var logs = getParentLogs();
  logs.unshift(log);
  commitWithAudit(OG_PARENT_LOGS_KEY, logs, 'saveParentLog');
}

// ── Agents ────────────────────────────────────────────────────────────────────

var initialAgents = [
  {
    id: 'AGT00001',
    firstName: 'Mei',
    lastName: 'Zhang',
    company: 'Bright Future Education (Shanghai)',
    email: 'mei.zhang@brightfuture.cn',
    phone: '+86 21 5555 0101',
    country: 'China',
    commissionRate: '15%',
    agreementStatus: 'Active',
    status: 'Active',
    notes: 'Primary referral partner for Chinese students. Responsible for 4 current enrolments including Chen Wei (STU83921).'
  },
  {
    id: 'AGT00002',
    firstName: 'Keiko',
    lastName: 'Mori',
    company: 'Sakura Study Abroad (Tokyo)',
    email: 'keiko.mori@sakurastudy.jp',
    phone: '+81 3 5555 0202',
    country: 'Japan',
    commissionRate: '12.5%',
    agreementStatus: 'Pending Renewal',
    status: 'Active',
    notes: 'Long-standing Japanese referral partner. Responsible for Yuki Tanaka (STU10492) and two prior enrolments.'
  }
];

function initAgentDB() {
  if (!localStorage.getItem(OG_AGENTS_KEY)) {
    localStorage.setItem(OG_AGENTS_KEY, JSON.stringify(initialAgents));
  }
}

function getAllAgents() {
  try { return JSON.parse(localStorage.getItem(OG_AGENTS_KEY)) || []; } catch (e) { return []; }
}

function getAgentById(id) {
  return getAllAgents().find(function (a) { return a.id === id; }) || null;
}

function saveAllAgents(agents) {
  commitWithAudit(OG_AGENTS_KEY, agents, 'saveAllAgents');
}

function saveAgent(agent) {
  var agents = getAllAgents();
  var index = agents.findIndex(function (a) { return a.id === agent.id; });
  if (index > -1) {
    agents[index] = agent;
  } else {
    agents.push(agent);
  }
  saveAllAgents(agents);
}

initAgentDB();


// ── Agent Logs ─────────────────────────────────────────────────────────────────

function initAgentLogDB() {
  if (!localStorage.getItem(OG_AGENT_LOGS_KEY)) {
    localStorage.setItem(OG_AGENT_LOGS_KEY, JSON.stringify(initialAgentLogs));
  }
}
initAgentLogDB();

function getAgentLogs(agentId) {
  try {
    var logs = JSON.parse(localStorage.getItem(OG_AGENT_LOGS_KEY)) || [];
    return logs.filter(function (l) { return l.agentId === agentId; });
  } catch (e) { return []; }
}

function saveAgentLog(log) {
  var logs = [];
  try { logs = JSON.parse(localStorage.getItem(OG_AGENT_LOGS_KEY)) || []; } catch (e) {}
  logs.push(log);
  commitWithAudit(OG_AGENT_LOGS_KEY, logs, 'saveAgentLog');
}

// ── Contracts ─────────────────────────────────────────────────────────────────

var initialContracts = [];

var OG_CONTRACTS_SEED_VERSION = 'v2-empty';

function initContractDB() {
  var seedVersion = localStorage.getItem('og_contracts_seed_version');
  if (!localStorage.getItem(OG_CONTRACTS_KEY) || seedVersion !== OG_CONTRACTS_SEED_VERSION) {
    localStorage.setItem(OG_CONTRACTS_KEY, JSON.stringify(initialContracts));
    localStorage.setItem('og_contracts_seed_version', OG_CONTRACTS_SEED_VERSION);
  }
}

function getContracts() {
  try { return JSON.parse(localStorage.getItem(OG_CONTRACTS_KEY)) || []; } catch (e) { return []; }
}

function getContractsByEntity(entityType, entityId) {
  return getContracts().filter(function (c) {
    return c.entityType === entityType && c.entityId === entityId;
  });
}

function saveContract(contract) {
  // ── Safeguarding block ────────────────────────────────────────────────────
  // A contract for a Staff member or Homestay cannot go Active unless their
  // key compliance records (DBS for both; Gas Safety for Homestay) are on
  // file and not expired. If the check fails, the status is forced back to
  // 'Draft' and a console warning is emitted so the issue is surfaced.
  if (contract.status === 'Active') {
    var today = new Date();
    today.setHours(0, 0, 0, 0);

    function isExpired(dateStr) {
      if (!dateStr) return false;
      var d = new Date(dateStr);
      return !isNaN(d.getTime()) && d < today;
    }

    if (contract.entityType === 'Staff') {
      var staffMember = getStaffById(contract.entityId);
      if (staffMember) {
        var sc = staffMember.compliance || {};
        if (!sc.dbsCertificatePath || isExpired(sc.dbsExpiry)) {
          console.warn(
            '[SAFEGUARDING] Contract ' + contract.id + ' blocked — ' +
            'Staff member ' + contract.entityId + ' has a missing or expired DBS certificate. ' +
            'Status forced back to Draft.'
          );
          contract.status = 'Draft';
        }
      }
    } else if (contract.entityType === 'Homestay') {
      var host = getHostById(contract.entityId);
      if (host) {
        var hc = host.compliance || {};
        if (!hc.dbsCertificatePath || isExpired(hc.dbsExpiry)) {
          console.warn(
            '[SAFEGUARDING] Contract ' + contract.id + ' blocked — ' +
            'Homestay ' + contract.entityId + ' has a missing or expired DBS certificate. ' +
            'Status forced back to Draft.'
          );
          contract.status = 'Draft';
        } else if (!hc.gasSafetyCertPath || isExpired(hc.gasSafetyExpiry)) {
          console.warn(
            '[SAFEGUARDING] Contract ' + contract.id + ' blocked — ' +
            'Homestay ' + contract.entityId + ' has a missing or expired Gas Safety Certificate. ' +
            'Status forced back to Draft.'
          );
          contract.status = 'Draft';
        }
      }
    }
  }

  var contracts = getContracts();
  var index = contracts.findIndex(function (c) { return c.id === contract.id; });
  if (index > -1) {
    contracts[index] = contract;
  } else {
    contracts.push(contract);
  }
  commitWithAudit(OG_CONTRACTS_KEY, contracts, 'saveContract');
}

initContractDB();

// ── Training Courses & Completions ────────────────────────────────────────────

var OG_TRAINING_COURSES_KEY = 'og_training_courses';
var OG_TRAINING_COMPLETIONS_KEY = 'og_training_completions';

var initialTrainingCourses = [
  {
    id: "TRN-CRS-001",
    title: "Designated Safeguarding Lead (DSL) Level 3",
    code: "AEGIS-6.2.2",
    targetType: "staff",
    targetRoles: ["Admin / DSL"],
    repeatIntervalMonths: 24,
    hours: 12.0,
    cost: 250.00,
    provider: "NSPCC / BSCP",
    description: "Mandatory qualification for primary and deputy DSLs per AEGIS Standard 6.2.",
    isMandatory: true,
    createdAt: "2026-01-01T00:00:00.000Z"
  },
  {
    id: "TRN-CRS-002",
    title: "Safer Recruitment in Education",
    code: "AEGIS-2.8.2",
    targetType: "staff",
    targetRoles: ["Admin / DSL", "Admin / Operations"],
    repeatIntervalMonths: 36,
    hours: 6.0,
    cost: 120.00,
    provider: "NSPCC / In-House",
    description: "Required for staff conducting recruitment and interview panels per KCSIE.",
    isMandatory: true,
    createdAt: "2026-01-01T00:00:00.000Z"
  },
  {
    id: "TRN-CRS-003",
    title: "Staff Safeguarding & Child Protection Intro",
    code: "AEGIS-6.3.1",
    targetType: "staff",
    targetRoles: ["All Staff"],
    repeatIntervalMonths: 36,
    hours: 3.0,
    cost: 0.00,
    provider: "In-House / Online",
    description: "Mandatory safeguarding introduction before starting role for all staff members.",
    isMandatory: true,
    createdAt: "2026-01-01T00:00:00.000Z"
  },
  {
    id: "TRN-CRS-004",
    title: "Annual Staff Safeguarding Update",
    code: "AEGIS-6.3.3",
    targetType: "staff",
    targetRoles: ["All Staff"],
    repeatIntervalMonths: 12,
    hours: 2.0,
    cost: 0.00,
    provider: "In-House DSL Session",
    description: "Yearly safeguarding refresh for all staff per AEGIS 6.3.3.",
    isMandatory: true,
    createdAt: "2026-01-01T00:00:00.000Z"
  },
  {
    id: "TRN-CRS-005",
    title: "Prevent Duty Awareness",
    code: "AEGIS-6.6.5",
    targetType: "staff",
    targetRoles: ["Admin / DSL", "Admin / Operations"],
    repeatIntervalMonths: 36,
    hours: 2.0,
    cost: 0.00,
    provider: "Home Office / Online",
    description: "Channel awareness and radicalisation prevention.",
    isMandatory: true,
    createdAt: "2026-01-01T00:00:00.000Z"
  },
  {
    id: "TRN-CRS-006",
    title: "Homestay Induction & Safeguarding Intro",
    code: "AEGIS-6.3.1",
    targetType: "host",
    targetRoles: ["Host"],
    repeatIntervalMonths: 0,
    hours: 4.0,
    cost: 0.00,
    provider: "Oxford Guardians Staff",
    description: "Comprehensive initial pre-approval induction covering Section 8 & Section 13.",
    isMandatory: true,
    createdAt: "2026-01-01T00:00:00.000Z"
  },
  {
    id: "TRN-CRS-007",
    title: "Homestay Annual Refresher Update",
    code: "AEGIS-5.9.1",
    targetType: "host",
    targetRoles: ["Host"],
    repeatIntervalMonths: 12,
    hours: 2.0,
    cost: 0.00,
    provider: "Oxford Guardians Staff",
    description: "Annual update covering safeguarding, mental health, and regulation changes.",
    isMandatory: true,
    createdAt: "2026-01-01T00:00:00.000Z"
  }
];

function initTrainingCoursesDB() {
  if (!localStorage.getItem(OG_TRAINING_COURSES_KEY)) {
    localStorage.setItem(OG_TRAINING_COURSES_KEY, JSON.stringify(initialTrainingCourses));
  }
}

function getAllTrainingCourses() {
  try { return JSON.parse(localStorage.getItem(OG_TRAINING_COURSES_KEY)) || []; } catch (e) { return []; }
}

function getTrainingCourseById(id) {
  return getAllTrainingCourses().find(function (c) { return c.id === id; }) || null;
}

function saveAllTrainingCourses(courses) {
  commitWithAudit(OG_TRAINING_COURSES_KEY, courses, 'saveAllTrainingCourses');
}

function saveTrainingCourse(course) {
  var courses = getAllTrainingCourses();
  var index = courses.findIndex(function (c) { return c.id === course.id; });
  if (index > -1) {
    courses[index] = course;
  } else {
    courses.push(course);
  }
  saveAllTrainingCourses(courses);
}

function deleteTrainingCourseById(id) {
  saveAllTrainingCourses(getAllTrainingCourses().filter(function (c) { return c.id !== id; }));
}

function generateTrainingCourseId() {
  var courses = getAllTrainingCourses();
  var maxNum = 0;
  courses.forEach(function (c) {
    var num = parseInt(String(c.id).replace('TRN-CRS-', ''), 10);
    if (!isNaN(num) && num > maxNum) maxNum = num;
  });
  return 'TRN-CRS-' + String(maxNum + 1).padStart(3, '0');
}

function getTrainingCoursesForRole(targetType, role) {
  return getAllTrainingCourses().filter(function (c) {
    if (c.targetType !== targetType) return false;
    if (!Array.isArray(c.targetRoles)) return false;
    return c.targetRoles.indexOf(role) > -1 || c.targetRoles.indexOf('All Staff') > -1;
  });
}

function initTrainingCompletionsDB() {
  if (!localStorage.getItem(OG_TRAINING_COMPLETIONS_KEY)) {
    localStorage.setItem(OG_TRAINING_COMPLETIONS_KEY, JSON.stringify([]));
  }
}

function getAllTrainingCompletions() {
  try { return JSON.parse(localStorage.getItem(OG_TRAINING_COMPLETIONS_KEY)) || []; } catch (e) { return []; }
}

function saveAllTrainingCompletions(completions) {
  commitWithAudit(OG_TRAINING_COMPLETIONS_KEY, completions, 'saveAllTrainingCompletions');
}

function getCompletionsForPerson(personId) {
  return getAllTrainingCompletions()
    .filter(function (c) { return c.personId === personId; })
    .sort(function (a, b) { return new Date(b.completedDate) - new Date(a.completedDate); });
}

function getCompletionsForCourse(courseId) {
  return getAllTrainingCompletions().filter(function (c) { return c.courseId === courseId; });
}

function getLatestCompletionForCourse(personId, courseId) {
  var matches = getAllTrainingCompletions().filter(function (c) {
    return c.personId === personId && c.courseId === courseId;
  });
  if (!matches.length) return null;
  matches.sort(function (a, b) { return new Date(b.completedDate) - new Date(a.completedDate); });
  return matches[0];
}

function generateTrainingCompletionId() {
  var completions = getAllTrainingCompletions();
  var maxNum = 0;
  completions.forEach(function (c) {
    var num = parseInt(String(c.id).replace('TRN-COMP-', ''), 10);
    if (!isNaN(num) && num > maxNum) maxNum = num;
  });
  return 'TRN-COMP-' + String(maxNum + 1).padStart(5, '0');
}

function saveTrainingCompletion(completion) {
  var completions = getAllTrainingCompletions();
  if (!completion.id) completion.id = generateTrainingCompletionId();
  var index = completions.findIndex(function (c) { return c.id === completion.id; });
  if (index > -1) {
    completions[index] = completion;
  } else {
    completions.push(completion);
  }
  saveAllTrainingCompletions(completions);
  return completion.id;
}

function deleteTrainingCompletionById(id) {
  saveAllTrainingCompletions(getAllTrainingCompletions().filter(function (c) { return c.id !== id; }));
}

function getTrainingStatusForPerson(personId, targetType, role) {
  var today = new Date();
  today.setHours(0, 0, 0, 0);
  var courses = getTrainingCoursesForRole(targetType, role);

  return courses.map(function (course) {
    var completion = getLatestCompletionForCourse(personId, course.id);
    var status = 'Not started';
    var dueDate = null;

    if (completion) {
      if (course.repeatIntervalMonths > 0) {
        var d = new Date(completion.completedDate);
        if (!isNaN(d.getTime())) {
          d.setMonth(d.getMonth() + course.repeatIntervalMonths);
          dueDate = d.toISOString().split('T')[0];
          status = d < today ? 'Overdue' : 'Complete';
        } else {
          status = 'Complete';
        }
      } else {
        status = 'Complete';
      }
    } else if (course.isMandatory) {
      status = 'Overdue';
    }

    return { course: course, completion: completion, status: status, dueDate: dueDate };
  });
}

// Same status computation as getTrainingStatusForPerson, but takes the person
// record directly (deriving role from person.role / 'Host' / 'Driver') and
// returns the richer shape staff-compliance.html / staff-profile.html render directly.
function getRequiredCoursesForPerson(person, personType) {
  if (!person) return [];
  var role = personType === 'host' ? 'Host'
    : personType === 'driver' ? 'Driver'
    : (person.role || '');
  var statusList = getTrainingStatusForPerson(person.id, personType, role);

  var today = new Date();
  today.setHours(0, 0, 0, 0);
  var dueSoonWindowDays = 60;

  return statusList.map(function (entry) {
    var course = entry.course;
    var requirementRule = course.repeatIntervalMonths > 0
      ? 'Renew every ' + course.repeatIntervalMonths + ' months'
      : 'One-off — no renewal required';

    var status = entry.status;
    if (status === 'Complete' && entry.dueDate) {
      var due = new Date(entry.dueDate);
      if (!isNaN(due.getTime())) {
        var daysLeft = Math.floor((due - today) / 86400000);
        if (daysLeft >= 0 && daysLeft < dueSoonWindowDays) {
          status = 'Due soon';
        }
      }
    }

    return {
      course:          course,
      requirementRule: requirementRule,
      status:          status,
      completionDate:  entry.completion ? entry.completion.completedDate : null,
      expiryDate:      entry.dueDate,
      completion:      entry.completion
    };
  });
}

initTrainingCoursesDB();
initTrainingCompletionsDB();

function getStudentsForSchool(schoolIdOrName) {
  return getAllStudents().filter(function (s) {
    return s.schoolId === schoolIdOrName || s.school === schoolIdOrName;
  });
}

function getConcernsForPerson(personId) {
  return getAllConcerns().filter(function (c) { return c.subjectId === personId; });
}

function saveConcern(concern) {
  var concerns = getAllConcerns();
  var index = concerns.findIndex(function (c) { return c.id === concern.id; });
  if (index > -1) { concerns[index] = concern; } else { concerns.push(concern); }
  commitWithAudit(OG_CONCERNS_KEY, concerns, 'saveConcern');
}

function generateConcernId() {
  var concerns = getAllConcerns();
  var maxNum = 0;
  concerns.forEach(function (c) {
    var num = parseInt(c.id.replace('CON', ''), 10);
    if (!isNaN(num) && num > maxNum) maxNum = num;
  });
  return 'CON' + String(maxNum + 1).padStart(5, '0');
}

// ── Emergency Plan: scenario leads, cover arrangements & issuance tracking ────

function getEmergencyScenarioLeads() {
  return [
    {
      id: 'SCN-01',
      type: 'Medical Emergency & Acute Illness',
      category: 'Health & Medical',
      leadName: 'Zuko Fire',
      leadRole: 'Operations Director',
      leadPhone: '+44 7700 900 888',
      backupName: 'Jay Ray (DSL)',
      immediateAction: 'Assess triage level → Dispatch ambulance (999) if life-threatening → Notify school nurse & homestay.',
      escalationTimeline: 'Parents within 1 hour; School same day; Insurers within 24 hours if hospitalised.',
      documentation: 'Incident Log + Medical profile update + Parent comms record.'
    },
    {
      id: 'SCN-02',
      type: 'Missing Student / Unauthorised Absence',
      category: 'Critical Safeguarding',
      leadName: 'Jay Ray',
      leadRole: 'DSL / Safeguarding Director',
      leadPhone: '+44 7700 900 999',
      backupName: 'Zuko Fire',
      immediateAction: 'Verify last known location → Contact friends/school/host → Call Police (999/101) if not located within 30 minutes.',
      escalationTimeline: 'DSL immediately; Parents immediately; Police < 30 mins; AEGIS within 24 hours.',
      documentation: 'Missing Student Incident Report + Police CAD reference + Timeline log.'
    },
    {
      id: 'SCN-03',
      type: 'Safeguarding Concern & Disclosure',
      category: 'Child Protection',
      leadName: 'Jay Ray',
      leadRole: 'DSL / Safeguarding Director',
      leadPhone: '+44 7700 900 999',
      backupName: 'Priya Shah (DSL Level 3)',
      immediateAction: 'Ensure immediate physical safety of child → Record disclosure verbatim → Do not promise confidentiality.',
      escalationTimeline: 'DSL immediate triage; LADO / Children’s Services referral within 24 hours if threshold met.',
      documentation: 'Secure Safeguarding Concern File (Tier-1 Restricted).'
    },
    {
      id: 'SCN-04',
      type: 'Death or Critical Injury',
      category: 'Critical Incident',
      leadName: 'Jay Ray',
      leadRole: 'Executive Lead & DSL',
      leadPhone: '+44 7700 900 999',
      backupName: 'Board of Directors',
      immediateAction: 'Call 999 immediately → Preserve scene → Ensure non-leaving adult supervision for accompanying minors.',
      escalationTimeline: 'Parents immediately (pastoral lead in person/phone); AEGIS < 24 hours; Insurers < 24 hours; Legal counsel.',
      documentation: 'Critical Incident Master Dossier + External investigation file.'
    },
    {
      id: 'SCN-05',
      type: 'Travel Disruption & Stranded Student',
      category: 'Logistics & Travel',
      leadName: 'Priya Shah',
      leadRole: 'Travel & Welfare Coordinator',
      leadPhone: '+44 7700 900 777',
      backupName: 'Zuko Fire',
      immediateAction: 'Verify student GPS/airport location → Direct to airport info desk / vetted driver → Arrange emergency accommodation if delayed overnight.',
      escalationTimeline: 'Parents informed via SMS/call; School informed if return collection impacted.',
      documentation: 'Travel incident log + Driver flight-tracking record.'
    },
    {
      id: 'SCN-06',
      type: 'Homestay Emergency & Sudden Evacuation',
      category: 'Accommodation',
      leadName: 'Priya Shah',
      leadRole: 'Homestay Coordinator',
      leadPhone: '+44 7700 900 777',
      backupName: 'Zuko Fire',
      immediateAction: 'Assess host home safety (fire/flood/illness) → Dispatch transport → Relocate student to approved emergency respite homestay.',
      escalationTimeline: 'Parents notified same day; School notified next morning.',
      documentation: 'Homestay incident log + Placement transfer record.'
    },
    {
      id: 'SCN-07',
      type: 'Pandemic & Infectious Disease Outbreak',
      category: 'Public Health',
      leadName: 'Zuko Fire',
      leadRole: 'Operations Director',
      leadPhone: '+44 7700 900 888',
      backupName: 'Jay Ray',
      immediateAction: 'Follow UKHSA / School isolation guidance → Supply testing & medical supplies → Arrange solitary room in homestay.',
      escalationTimeline: 'Mass communication to affected parents & partner schools within 4 hours.',
      documentation: 'Outbreak containment log + Welfare check-in schedule.'
    }
  ];
}

function getEmergencyCoverArrangements() {
  return {
    partnershipName: 'Central UK Guardianship Network Mutual Emergency SLA',
    partnerOrg: 'Cotswolds & Thames Guardianship Services (AEGIS Accredited)',
    leadCoverOfficer: 'Sarah Jenkins (DSL Level 3)',
    dbsCertNumber: '004-991-8821-4 (Enhanced DBS Clear)',
    directPhone: '+44 7700 900 111',
    agreementStatus: 'Active & Verified',
    effectiveDate: '2026-01-01',
    renewalDate: '2027-01-01',
    scope: 'Provides guaranteed 24/7 reciprocal out-of-hours coverage during concurrent critical incidents, staff incapacity, or remote emergency dispatches.',
    loneWorkingSafety: {
      protocolRef: 'POL-OPS-004 (Lone Worker Safeguards)',
      status: 'Active',
      checkInRequirement: 'Mandatory GPS & WhatsApp check-in every 60 minutes during solitary out-of-hours crisis visits',
      emergencyEscalation: 'Automatic alert to secondary on-call staff if check-in missed by 15 minutes.'
    }
  };
}

// AEGIS Standards 2.6.1 & 10.2 — students, overseas parents, and homestays receive
// the 24/7 emergency rota details as a physical welcome pack handed over in person
// on arrival. staffName records who conducted that handover for the SCR/audit trail.
function recordEmergencyNumberIssued(partyType, partyId, staffName) {
  var today = new Date().toISOString().slice(0, 10);
  var staff = staffName || 'Jay Ray (DSL / Operations)';

  if (partyType === 'student' || partyType === 'parent') {
    var students = getAllStudents();
    var s = students.find(function (item) { return item.id === partyId; });
    if (s) {
      s.emergencyNumberIssued = true;
      s.emergencyNumberIssuedDate = today;
      s.emergencyPackIssuedBy = staff;
      saveAllStudents(students);
      return true;
    }
  } else if (partyType === 'host') {
    var hosts = getAllHosts();
    var h = hosts.find(function (item) { return item.id === partyId; });
    if (h) {
      h.emergencyNumberIssued = true;
      h.emergencyNumberIssuedDate = today;
      h.emergencyPackIssuedBy = staff;
      saveAllHosts(hosts);
      return true;
    }
  }
  return false;
}

function getEmergencyIssuanceStats() {
  var students = getAllStudents();
  var hosts = getAllHosts();
  var studentsIssued = students.filter(function (s) { return Boolean(s.emergencyNumberIssued); }).length;
  var hostsIssued = hosts.filter(function (h) { return Boolean(h.emergencyNumberIssued); }).length;
  var parentsIssued = students.filter(function (s) { return Boolean(s.emergencyNumberIssued); }).length;
  var schoolsCount = 5;
  var schoolsIssued = 5;
  var totalEntities = students.length + hosts.length + students.length + schoolsCount;
  var totalIssued = studentsIssued + hostsIssued + parentsIssued + schoolsIssued;
  var pct = Math.round((totalIssued / (totalEntities || 1)) * 100);
  return {
    percentage: pct,
    students: { issued: studentsIssued, total: students.length },
    parents: { issued: parentsIssued, total: students.length },
    hosts: { issued: hostsIssued, total: hosts.length },
    schools: { issued: schoolsIssued, total: schoolsCount }
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// IT & Security Control Room — AEGIS Standard 2.7 / UK GDPR & DPA 2018
// ═══════════════════════════════════════════════════════════════════════════

// ── 1. System Audit Log ─────────────────────────────────────────────────────

var OG_AUDIT_LOG_KEY = 'og_audit_log';
var OG_AUDIT_LOG_MAX = 200;

var initialAuditLogs = [
  { id: 'LOG-001', timestamp: '2026-08-07T09:15:00Z', userId: 'STF00001', userName: 'Jay Ray (DSL)', action: 'SCR Export', entityType: 'Compliance', entityId: '', details: 'Exported Redacted Single Central Record for AEGIS inspection preparation.', severity: 'info' },
  { id: 'LOG-002', timestamp: '2026-08-07T10:30:00Z', userId: 'STF00002', userName: 'Zuko Fire', action: 'Host Vetting', entityType: 'Host', entityId: '', details: 'Approved Gas Safety Certificate renewal for Host HST-001.', severity: 'info' },
  { id: 'LOG-003', timestamp: '2026-08-07T11:45:00Z', userId: 'STF00001', userName: 'Jay Ray (DSL)', action: 'Policy Ingestion', entityType: 'Policy', entityId: '', details: 'Uploaded Safeguarding Policy v2.1 with auto-review date 2027-08-07.', severity: 'info' },
  { id: 'LOG-004', timestamp: '2026-08-06T16:20:00Z', userId: 'SYSTEM', userName: 'System Guard', action: 'Failed Login', entityType: 'Auth', entityId: '', details: 'Failed password attempt for user admin@oxfordguardians.co.uk.', severity: 'warning' }
];

function initAuditLogDB() {
  if (!localStorage.getItem(OG_AUDIT_LOG_KEY)) {
    localStorage.setItem(OG_AUDIT_LOG_KEY, JSON.stringify(initialAuditLogs));
  }
}
initAuditLogDB();

// Returns stored logs sorted chronologically descending (most recent first).
function getAllAuditLogs() {
  var logs;
  try {
    logs = JSON.parse(localStorage.getItem(OG_AUDIT_LOG_KEY)) || [];
  } catch (e) {
    logs = [];
  }
  return logs.slice().sort(function (a, b) { return new Date(b.timestamp) - new Date(a.timestamp); });
}

// Prepends a new event, caps the log at OG_AUDIT_LOG_MAX items, and persists it.
function logAuditEvent(action, entityType, entityId, details, userName, severity) {
  var logs;
  try {
    logs = JSON.parse(localStorage.getItem(OG_AUDIT_LOG_KEY)) || [];
  } catch (e) {
    logs = [];
  }
  var entry = {
    id: 'LOG-' + Date.now(),
    timestamp: new Date().toISOString(),
    userId: '',
    userName: userName || 'System',
    action: action || 'Unspecified action',
    entityType: entityType || '',
    entityId: entityId || '',
    details: details || '',
    severity: severity || 'info'
  };
  logs.unshift(entry);
  if (logs.length > OG_AUDIT_LOG_MAX) logs = logs.slice(0, OG_AUDIT_LOG_MAX);
  localStorage.setItem(OG_AUDIT_LOG_KEY, JSON.stringify(logs));
  return entry;
}

// commitWithAudit() — write interceptor for every save*/saveAll* function.
// Inserted programmatically; see old_version/audit/DEVELOPMENT_PLAN_2026-08-07.html
// item 1.2. Reads the store's *previous* value from localStorage, diffs it
// against the incoming value to work out what changed, logs that via the
// existing logAuditEvent(), and only then performs the actual write. This is
// deliberately generic over both store shapes used in this file:
//   - arrays of records keyed by .id (the overwhelming majority of stores)
//   - a keyed dictionary of records (only og_mh_cases, keyed by studentId)
//   - a single-entity object with no wrapping array/dictionary (og_organisation)
// It never references a caller-local variable like record.id — bulk saves
// (saveAllX(arrayOfEverything)) have no single record in scope, so the
// changed record has to be found here, from the data itself.
function commitWithAudit(storeKey, newData, sourceFunction) {
  var oldData = null;
  try {
    var raw = localStorage.getItem(storeKey);
    oldData = raw ? JSON.parse(raw) : null;
  } catch (e) {
    oldData = null;
  }

  var action = 'Update';
  var recordId = '';

  if (Array.isArray(newData)) {
    var oldArr = Array.isArray(oldData) ? oldData : [];
    var oldIds = oldArr.map(function (r) { return r && r.id; });
    var newIds = newData.map(function (r) { return r && r.id; });

    if (newData.length > oldArr.length) {
      action = 'Create';
      var addedId = newIds.filter(function (id) { return oldIds.indexOf(id) === -1; })[0];
      recordId = addedId || (newData.length ? newData[newData.length - 1].id : '') || '';
    } else if (newData.length < oldArr.length) {
      action = 'Delete';
      var removedId = oldIds.filter(function (id) { return newIds.indexOf(id) === -1; })[0];
      recordId = removedId || '';
    } else {
      action = 'Update';
      var changedRecord = null;
      for (var i = 0; i < newData.length; i++) {
        var rec = newData[i];
        var before = oldArr.filter(function (r) { return r && rec && r.id === rec.id; })[0];
        if (JSON.stringify(before) !== JSON.stringify(rec)) { changedRecord = rec; break; }
      }
      recordId = (changedRecord && changedRecord.id) || '';
    }
  } else if (newData && typeof newData === 'object') {
    // Object store. Distinguish "dictionary of records keyed by id" (every
    // value is itself a plain object) from "single entity record" (mixed
    // scalar/object fields, e.g. og_organisation) and diff accordingly.
    var oldObj = (oldData && typeof oldData === 'object' && !Array.isArray(oldData)) ? oldData : {};
    var newKeys = Object.keys(newData);
    var isDictionaryOfRecords = newKeys.length > 0 && newKeys.every(function (k) {
      var v = newData[k];
      return v && typeof v === 'object' && !Array.isArray(v);
    });

    if (isDictionaryOfRecords) {
      var oldKeys = Object.keys(oldObj);
      var addedKey = newKeys.filter(function (k) { return oldKeys.indexOf(k) === -1; })[0];
      var removedKey = oldKeys.filter(function (k) { return newKeys.indexOf(k) === -1; })[0];

      if (addedKey) {
        action = 'Create';
        recordId = addedKey;
      } else if (removedKey) {
        action = 'Delete';
        recordId = removedKey;
      } else {
        action = 'Update';
        var changedKey = newKeys.filter(function (k) {
          return JSON.stringify(oldObj[k]) !== JSON.stringify(newData[k]);
        })[0];
        recordId = changedKey || '';
      }
    } else {
      action = 'Update';
      recordId = newData.id || '';
    }
  }

  logAuditEvent(action, sourceFunction.replace('saveAll', '').replace('save', ''), recordId, 'Modified via ' + sourceFunction, 'System', 'info');
  localStorage.setItem(storeKey, JSON.stringify(newData));
}

// ── 2. Access Requests Queue ────────────────────────────────────────────────

var OG_ACCESS_REQUESTS_KEY = 'og_access_requests';

var initialAccessRequests = [
  { id: 'REQ-1001', requestedDate: '2026-08-01', fullName: 'Marcus Vance', email: 'marcus.vance@oxfordguardians.co.uk', requestedRole: 'Homestay Coordinator', status: 'Pending', reviewedBy: '', reviewedDate: '' }
];

function initAccessRequestsDB() {
  if (!localStorage.getItem(OG_ACCESS_REQUESTS_KEY)) {
    localStorage.setItem(OG_ACCESS_REQUESTS_KEY, JSON.stringify(initialAccessRequests));
  }
}
initAccessRequestsDB();

function getAccessRequests() {
  try {
    return JSON.parse(localStorage.getItem(OG_ACCESS_REQUESTS_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function saveAllAccessRequests(requests) {
  commitWithAudit(OG_ACCESS_REQUESTS_KEY, requests, 'saveAllAccessRequests');
}

function saveAccessRequest(req) {
  var requests = getAccessRequests();
  if (!req.id) {
    req.id = 'REQ-' + Date.now();
  }
  if (!req.requestedDate) req.requestedDate = new Date().toISOString().slice(0, 10);
  if (!req.status) req.status = 'Pending';
  var index = requests.findIndex(function (r) { return r.id === req.id; });
  if (index > -1) {
    requests[index] = req;
  } else {
    requests.push(req);
  }
  saveAllAccessRequests(requests);
  return req.id;
}

// Approves the request, provisions a new active staff record, and logs the
// decision. The new staff member is unlocked-but-unvetted: real DBS/compliance
// fields start empty, exactly like every other staff-creation path in this app —
// approving system access is not the same as clearing safeguarding checks.
function approveAccessRequest(id, reviewerName) {
  var requests = getAccessRequests();
  var req = requests.find(function (r) { return r.id === id; });
  if (!req) return false;

  var reviewer = reviewerName || 'Jay Ray (DSL)';
  req.status = 'Approved';
  req.reviewedBy = reviewer;
  req.reviewedDate = new Date().toISOString().slice(0, 10);
  saveAllAccessRequests(requests);

  var nameParts = (req.fullName || '').trim().split(/\s+/);
  var newStaff = {
    id: generateStaffId(),
    firstName: nameParts[0] || req.fullName || 'New',
    lastName: nameParts.slice(1).join(' ') || 'Staff',
    email: req.email || '',
    phone: '',
    role: req.requestedRole || 'Staff',
    title: req.requestedRole || 'Staff',
    status: 'Active',
    primaryWork: '',
    startDate: req.reviewedDate,
    notes: 'Account provisioned via Access Request ' + req.id + ', approved by ' + reviewer + '.',
    mfaEnabled: false,
    lastLogin: '',
    authRole: 'Coordinator',
    sessionTimeoutMinutes: 15,
    compliance: Object.assign({}, DEFAULT_COMPLIANCE, DEFAULT_STAFF_SAFEGUARDING)
  };
  saveStaffMember(newStaff);

  logAuditEvent('Access Approved', 'Staff', id, 'Approved staff account for ' + req.fullName, reviewer);
  return true;
}

function rejectAccessRequest(id, reviewerName) {
  var requests = getAccessRequests();
  var req = requests.find(function (r) { return r.id === id; });
  if (!req) return false;

  var reviewer = reviewerName || 'Jay Ray (DSL)';
  req.status = 'Rejected';
  req.reviewedBy = reviewer;
  req.reviewedDate = new Date().toISOString().slice(0, 10);
  saveAllAccessRequests(requests);

  logAuditEvent('Access Rejected', 'Staff', id, 'Rejected access request for ' + req.fullName, reviewer, 'warning');
  return true;
}

// ── 3. MFA & Security Metadata on Staff ─────────────────────────────────────

// Backfills security metadata onto any staff record created before this field
// set existed (the three seeded staff, and any created via earlier prompts).
// Priya Shah is deliberately left with mfaEnabled: false so the MFA-gap alert
// this data is meant to drive has something real to flag.
var DEFAULT_STAFF_SECURITY_BY_ID = {
  'STF00001': { mfaEnabled: true,  lastLogin: '2026-08-07 09:15', authRole: 'DSL Lead',    sessionTimeoutMinutes: 15 },
  'STF00002': { mfaEnabled: true,  lastLogin: '2026-08-06 17:40', authRole: 'Super Admin',  sessionTimeoutMinutes: 15 },
  'STF00003': { mfaEnabled: false, lastLogin: '2026-08-05 08:50', authRole: 'Coordinator',  sessionTimeoutMinutes: 15 }
};

function migrateStaffSecurityMetadata() {
  var staff = getAllStaff();
  var changed = false;
  staff.forEach(function (s) {
    if (typeof s.mfaEnabled === 'boolean') return; // already migrated
    var defaults = DEFAULT_STAFF_SECURITY_BY_ID[s.id] || {
      mfaEnabled: false, lastLogin: '', authRole: 'Coordinator', sessionTimeoutMinutes: 15
    };
    s.mfaEnabled = defaults.mfaEnabled;
    s.lastLogin = defaults.lastLogin;
    s.authRole = defaults.authRole;
    s.sessionTimeoutMinutes = defaults.sessionTimeoutMinutes;
    changed = true;
  });
  if (changed) saveAllStaff(staff);
}
migrateStaffSecurityMetadata();

// settings may include any of { mfaEnabled, authRole, sessionTimeoutMinutes, lastLogin }.
function updateStaffSecuritySettings(staffId, settings) {
  var staff = getAllStaff();
  var s = staff.find(function (item) { return item.id === staffId; });
  if (!s) return false;

  if (settings) {
    if (typeof settings.mfaEnabled === 'boolean') s.mfaEnabled = settings.mfaEnabled;
    if (settings.authRole) s.authRole = settings.authRole;
    if (typeof settings.sessionTimeoutMinutes === 'number') s.sessionTimeoutMinutes = settings.sessionTimeoutMinutes;
    if (settings.lastLogin) s.lastLogin = settings.lastLogin;
  }
  saveAllStaff(staff);
  logAuditEvent('Security Settings Updated', 'Staff', staffId, 'Updated security settings for ' + s.firstName + ' ' + s.lastName, 'Jay Ray (DSL)');
  return true;
}

// ── 4. Subject Access Request (SAR) Register & Retention Scanner ───────────

var OG_SAR_REQUESTS_KEY = 'og_sar_requests';

var initialSarRequests = [
  { id: 'SAR-001', refNumber: 'SAR-2026-01', subjectName: 'Chen Wei (Parent: Mr. Wei)', subjectType: 'Student Parent', requestDate: '2026-08-01', deadline30Days: '2026-08-31', status: 'Open', assignedTo: 'Jay Ray (Data Controller)', notes: 'Request for attendance and welfare logs for Term 1.' }
];

function initSarRequestsDB() {
  if (!localStorage.getItem(OG_SAR_REQUESTS_KEY)) {
    localStorage.setItem(OG_SAR_REQUESTS_KEY, JSON.stringify(initialSarRequests));
  }
}
initSarRequestsDB();

function getAllSarRequests() {
  try {
    return JSON.parse(localStorage.getItem(OG_SAR_REQUESTS_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function saveSarRequest(sar) {
  var requests = getAllSarRequests();
  if (!sar.id) {
    var maxNum = 0;
    requests.forEach(function (r) {
      var num = parseInt(String(r.id || '').replace('SAR-', ''), 10);
      if (!isNaN(num) && num > maxNum) maxNum = num;
    });
    sar.id = 'SAR-' + String(maxNum + 1).padStart(3, '0');
  }
  if (!sar.requestDate) sar.requestDate = new Date().toISOString().slice(0, 10);
  if (!sar.deadline30Days) {
    var d = new Date(sar.requestDate);
    d.setDate(d.getDate() + 30);
    sar.deadline30Days = d.toISOString().slice(0, 10);
  }
  if (!sar.status) sar.status = 'Open';

  var index = requests.findIndex(function (r) { return r.id === sar.id; });
  if (index > -1) {
    requests[index] = sar;
  } else {
    requests.push(sar);
  }
  commitWithAudit(OG_SAR_REQUESTS_KEY, requests, 'saveSarRequest');
  return sar.id;
}

// AEGIS 2.7 / DPA 2018 retention scan. Looks for a real end-of-enrolment date on
// students (departureDate) or hosts (endDate) and flags any more than 7 years
// old. Neither field exists anywhere in the current dataset yet — no page
// collects it — so this correctly returns an empty scan today rather than
// inventing ages for real seed people. It will start surfacing real results
// the moment a departure/end date is recorded somewhere upstream.
function getGdprRetentionScan() {
  var results = [];
  var sevenYearsMs = 7 * 365.25 * 24 * 60 * 60 * 1000;
  var now = Date.now();

  getAllStudents().forEach(function (s) {
    var endDate = s.departureDate || s.leftDate;
    if (!endDate) return;
    var d = new Date(endDate);
    if (isNaN(d.getTime())) return;
    if (now - d.getTime() > sevenYearsMs) {
      results.push({
        recordType: 'Student',
        id: s.id,
        name: s.firstName + ' ' + s.lastName,
        endDate: endDate,
        flag: 'Eligible for Statutory Deletion Review (DPA 2018)'
      });
    }
  });

  getAllHosts().forEach(function (h) {
    var endDate = h.endDate || h.departureDate;
    if (!endDate) return;
    var d = new Date(endDate);
    if (isNaN(d.getTime())) return;
    if (now - d.getTime() > sevenYearsMs) {
      results.push({
        recordType: 'Host',
        id: h.id,
        name: h.firstName + ' ' + h.lastName,
        endDate: endDate,
        flag: 'Eligible for Statutory Deletion Review (DPA 2018)'
      });
    }
  });

  return results;
}

// ── 5. Backup, Restore & Disaster Recovery ──────────────────────────────────

// Collects every localStorage key prefixed og_ into one JSON object and
// triggers a browser download. Only works in a real browser (needs document/Blob).
function exportSystemSnapshot() {
  var snapshot = { exportedAt: new Date().toISOString(), version: 1, data: {} };
  for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    if (key && key.indexOf('og_') === 0) {
      try {
        snapshot.data[key] = JSON.parse(localStorage.getItem(key));
      } catch (e) {
        snapshot.data[key] = localStorage.getItem(key);
      }
    }
  }

  var filename = 'oxford-guardians-backup-' + new Date().toISOString().slice(0, 10) + '.json';

  if (typeof document !== 'undefined' && typeof Blob !== 'undefined') {
    var blob = new Blob([JSON.stringify(snapshot, null, 2)], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  }

  logAuditEvent('System Backup Exported', 'System', '', 'Exported full system snapshot (' + Object.keys(snapshot.data).length + ' stores) as ' + filename, 'Jay Ray (DSL)');
  return snapshot;
}

// Validates the snapshot shape, restores every og_ key it contains, and logs
// the restore. Never touches keys the snapshot doesn't include.
function importSystemSnapshot(jsonString) {
  var snapshot;
  try {
    snapshot = typeof jsonString === 'string' ? JSON.parse(jsonString) : jsonString;
  } catch (e) {
    return { success: false, error: 'Could not parse snapshot JSON: ' + e.message };
  }

  if (!snapshot || typeof snapshot !== 'object' || !snapshot.data || typeof snapshot.data !== 'object') {
    return { success: false, error: 'Snapshot is missing a valid "data" object.' };
  }

  var restoredKeys = [];
  Object.keys(snapshot.data).forEach(function (key) {
    if (key.indexOf('og_') !== 0) return; // only ever restore our own namespace
    var value = snapshot.data[key];
    localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
    restoredKeys.push(key);
  });

  logAuditEvent('System Restore', 'System', '', 'Restored ' + restoredKeys.length + ' store(s) from a system snapshot' + (snapshot.exportedAt ? ' exported ' + snapshot.exportedAt : '') + '.', 'Jay Ray (DSL)', 'warning');
  return { success: true, restoredKeys: restoredKeys };
}

// Exact byte size of everything this app has written to localStorage (key + value).
function getStorageUsageStats() {
  var totalBytes = 0;
  var totalKeys = 0;
  for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    if (key && key.indexOf('og_') === 0) {
      totalKeys++;
      var value = localStorage.getItem(key) || '';
      totalBytes += key.length + value.length;
    }
  }
  var usedKb = Math.round((totalBytes / 1024) * 100) / 100;
  // localStorage's practical browser ceiling is ~5MB per origin; flag unhealthy past 80% of that.
  var isHealthy = usedKb < (5 * 1024 * 0.8);
  return { usedKb: usedKb, totalKeys: totalKeys, isHealthy: isHealthy };
}

// ═══ Entity Name Resolvers (Read-Only Lookups) ═══
//
// Pure lookups — no data is written. Each takes an id (or, for schools,
// falls back sensibly if there's no live getter) and returns a display
// string, or the supplied fallback (default '') when the entity isn't found.

function resolveStudentName(studentId, fallback) {
  var s = getStudentById(studentId);
  return s ? (s.firstName + ' ' + s.lastName) : (fallback || '');
}

function resolveHostName(hostId, fallback) {
  var h = getHostById(hostId);
  return h ? (h.firstName + ' ' + h.lastName) : (fallback || '');
}

function resolveHostFamilyName(hostId, fallback) {
  var h = getHostById(hostId);
  return h ? (h.lastName + ' Family') : (fallback || '');
}

function resolveStaffName(staffId, fallback) {
  var s = getStaffById(staffId);
  return s ? (s.firstName + ' ' + s.lastName) : (fallback || '');
}

function resolveDriverName(driverId, fallback) {
  var d = getDriverById(driverId);
  return d ? (d.firstName + ' ' + d.lastName) : (fallback || '');
}

function resolveLinkedStudentNames(linkedStudentIds) {
  if (!linkedStudentIds || !Array.isArray(linkedStudentIds)) return '';
  return linkedStudentIds
    .map(function (id) { return resolveStudentName(id); })
    .filter(function (name) { return name; })
    .join(' / ');
}

// Schools have no getAllSchools() — the live, localStorage-backed getter is
// getSchoolById() (built on getSchools()). Fall back to searching the
// initialSchools seed array directly only if neither getter is defined.
function resolveSchoolName(schoolId, fallback) {
  var school = null;
  if (typeof getAllSchools === 'function') {
    school = getAllSchools().find(function (s) { return s.id === schoolId; }) || null;
  } else if (typeof getSchoolById === 'function') {
    school = getSchoolById(schoolId);
  } else {
    school = initialSchools.find(function (s) { return s.id === schoolId; }) || null;
  }
  return school ? school.name : (fallback || '');
}

// Refreshes stale hardcoded display strings from their live ID-linked source
// data (e.g. a host's free-text currentStudents field vs. its linkedStudents
// array). Runs on every page load, silently — writes only the denormalized
// text fields below, never the ID fields those texts are derived from.
function syncDenormalizedFields() {
  var hosts = getAllHosts();
  var hostsChanged = false;
  hosts.forEach(function (host) {
    if (Array.isArray(host.linkedStudents) && host.linkedStudents.length > 0) {
      var fresh = resolveLinkedStudentNames(host.linkedStudents);
      if (fresh && fresh !== host.currentStudents) {
        host.currentStudents = fresh;
        hostsChanged = true;
      }
    }
  });
  if (hostsChanged) saveAllHosts(hosts);

  var students = getAllStudents();
  var studentsChanged = false;
  students.forEach(function (student) {
    if (student.schoolId) {
      var freshSchool = resolveSchoolName(student.schoolId, '');
      if (freshSchool && freshSchool !== student.school) {
        student.school = freshSchool;
        studentsChanged = true;
      }
    }
    var homestays = getHomestaysForStudent(student.id);
    if (homestays.length > 0) {
      var host = homestays[0];
      var freshHost = resolveHostFamilyName(host.id, '');
      if (freshHost && freshHost !== student.homestayFamily) {
        student.homestayFamily = freshHost;
        studentsChanged = true;
      }
    }
  });
  if (studentsChanged) saveAllStudents(students);
}

// ═══ Cross-Store Logistics Linking (Read-Only Lookups) ═══
//
// Exeats (og_exeats), transports (og_transports) and placements (og_placements)
// are independent stores with no foreign keys between them. These helpers find
// records in the other two stores that plausibly belong to the same trip, by
// matching studentId and overlapping dates. Pure lookups — nothing is ever
// written to any store.

var LOGISTICS_MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

// Parses either an ISO date ('YYYY-MM-DD', used by exeats/placements) or the
// human-readable 'D Mon YYYY' format (e.g. '25 Oct 2026', used by transports)
// into a Date. Returns null if the value is empty or unparseable.
function parseLogisticsDate(dateStr) {
  if (!dateStr) return null;
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return new Date(dateStr + 'T00:00:00');
  }
  var parts = String(dateStr).trim().split(' ');
  if (parts.length === 3) {
    var day   = parseInt(parts[0], 10);
    var month = LOGISTICS_MONTHS.indexOf(parts[1]);
    var year  = parseInt(parts[2], 10);
    if (!isNaN(day) && month > -1 && !isNaN(year)) {
      return new Date(year, month, day);
    }
  }
  var fallback = new Date(dateStr);
  return isNaN(fallback.getTime()) ? null : fallback;
}

// Normalises a record's date field(s) into raw { start, end } string values.
// Transports only carry a single day (record.date), so start === end for them.
function getLogisticsDateFields(entityType, record) {
  if (!record) return { start: '', end: '' };
  if (entityType === 'exeat') {
    return { start: record.startDate || '', end: record.returnDate || record.startDate || '' };
  }
  if (entityType === 'transport') {
    return { start: record.date || '', end: record.date || '' };
  }
  if (entityType === 'placement') {
    return { start: record.startDate || '', end: record.endDate || record.startDate || '' };
  }
  return { start: '', end: '' };
}

// True if two date ranges share at least one day. A range with no resolvable
// start date never overlaps (it can't be placed on the calendar).
function logisticsRangesOverlap(aStart, aEnd, bStart, bEnd) {
  if (!aStart || !bStart) return false;
  var aE = aEnd || aStart;
  var bE = bEnd || bStart;
  return aStart.getTime() <= bE.getTime() && bStart.getTime() <= aE.getTime();
}

// Finds exeats, transports and placements for a given student whose dates
// overlap the supplied { start, end } range ('YYYY-MM-DD' strings). Read-only.
function linkLogisticsRecords(studentId, dateRange) {
  var range      = dateRange || {};
  var rangeStart = parseLogisticsDate(range.start);
  var rangeEnd   = parseLogisticsDate(range.end || range.start);

  var exeatIds = getAllExeats()
    .filter(function (e) {
      if (e.studentId !== studentId) return false;
      var f = getLogisticsDateFields('exeat', e);
      return logisticsRangesOverlap(rangeStart, rangeEnd, parseLogisticsDate(f.start), parseLogisticsDate(f.end));
    })
    .map(function (e) { return e.id; });

  var transportIds = getAllTransports()
    .filter(function (t) {
      if (t.studentId !== studentId) return false;
      var f = getLogisticsDateFields('transport', t);
      return logisticsRangesOverlap(rangeStart, rangeEnd, parseLogisticsDate(f.start), parseLogisticsDate(f.end));
    })
    .map(function (t) { return t.id; });

  var placementIds = getAllPlacements()
    .filter(function (p) {
      if (p.studentId !== studentId) return false;
      var f = getLogisticsDateFields('placement', p);
      return logisticsRangesOverlap(rangeStart, rangeEnd, parseLogisticsDate(f.start), parseLogisticsDate(f.end));
    })
    .map(function (p) { return p.id; });

  return { exeatIds: exeatIds, transportIds: transportIds, placementIds: placementIds };
}

// Given one logistics record (exeat, transport or placement), finds the
// related records in the other two stores for the same student/trip. Returns
// the linked IDs only — the source record's own ID is excluded from its store's list.
function getLinkedLogistics(entityType, entityId) {
  var record = null;
  if (entityType === 'exeat') {
    record = getAllExeats().find(function (e) { return e.id === entityId; });
  } else if (entityType === 'transport') {
    record = getAllTransports().find(function (t) { return t.id === entityId; });
  } else if (entityType === 'placement') {
    record = getAllPlacements().find(function (p) { return p.id === entityId; });
  }

  var empty = { exeatIds: [], transportIds: [], placementIds: [] };
  if (!record || !record.studentId) return empty;

  var dateRange = getLogisticsDateFields(entityType, record);
  if (!dateRange.start) return empty;

  var linked = linkLogisticsRecords(record.studentId, dateRange);

  if (entityType === 'exeat') {
    linked.exeatIds = linked.exeatIds.filter(function (id) { return id !== entityId; });
  } else if (entityType === 'transport') {
    linked.transportIds = linked.transportIds.filter(function (id) { return id !== entityId; });
  } else if (entityType === 'placement') {
    linked.placementIds = linked.placementIds.filter(function (id) { return id !== entityId; });
  }

  return linked;
}

// ── Global export ─────────────────────────────────────────────────────────────

window.OG_DB = {
  getAllStudents: getAllStudents,
  getStudentById: getStudentById,
  checkStudentRiskAssessmentStatus: checkStudentRiskAssessmentStatus,
  getStudentsForSchool: getStudentsForSchool,
  saveAllStudents: saveAllStudents,
  upsertStudent: upsertStudent,
  deleteStudentById: deleteStudentById,
  addMedicineAdministrationRecord: addMedicineAdministrationRecord,
  isPermissionGranted: isPermissionGranted,
  getAllDrivers: getAllDrivers,
  getDriverById: getDriverById,
  saveAllDrivers: saveAllDrivers,
  saveDriver: saveDriver,
  deleteDriverById: deleteDriverById,
  getAllHosts: getAllHosts,
  getHomestaysForStudent: getHomestaysForStudent,
  getHostById: getHostById,
  getShareableHostProfile: getShareableHostProfile,
  getHomestaySupplyAnalytics: getHomestaySupplyAnalytics,
  saveAllHosts: saveAllHosts,
  saveHost: saveHost,
  deleteHostById: deleteHostById,
  getAllTransports: getAllTransports,
  getTransportById: getTransportById,
  saveAllTransports: saveAllTransports,
  saveTransport: saveTransport,
  deleteTransportById: deleteTransportById,
  getAllFinanceDocs: getAllFinanceDocs,
  aggregateDocuments: aggregateDocuments,
  getAllExeats: getAllExeats,
  saveAllExeats: saveAllExeats,
  saveExeat: saveExeat,
  getAllPlacements: getAllPlacements,
  savePlacement: savePlacement,
  getAllTodos: getAllTodos,
  saveTodo: saveTodo,
  saveAllTodos: saveAllTodos,
  getAllTravelTodos: getAllTravelTodos,
  saveTravelTodo: saveTravelTodo,
  saveAllTravelTodos: saveAllTravelTodos,
  getAllIncidents: getAllIncidents,
  getIncidentById: getIncidentById,
  saveAllIncidents: saveAllIncidents,
  saveIncident: saveIncident,
  deleteIncidentById: deleteIncidentById,
  generateIncidentId: generateIncidentId,
  getAllStaff: getAllStaff,
  getStaffById: getStaffById,
  saveAllStaff: saveAllStaff,
  saveStaffMember: saveStaffMember,
  deleteStaffById: deleteStaffById,
  generateStaffId: generateStaffId,
  getAllParents: getAllParents,
  getParentById: getParentById,
  saveAllParents: saveAllParents,
  saveParent: saveParent,
  deleteParentById: deleteParentById,
  generateParentId: generateParentId,
  generateComplianceAlerts: generateComplianceAlerts,
  getAllConcerns: getAllConcerns,
  getConcernsByTier: getConcernsByTier,
  getConcernsForPerson: getConcernsForPerson,
  saveConcern: saveConcern,
  generateConcernId: generateConcernId,
  getAllWelfareLogs: getAllWelfareLogs,
  getWelfareLogsForStudent: getWelfareLogsForStudent,
  getStudentWelfareCadenceStatus: getStudentWelfareCadenceStatus,
  saveWelfareLog: saveWelfareLog,
  getMHCaseForStudent: getMHCaseForStudent,
  saveMHCase: saveMHCase,
  getMHCommsForStudent: getMHCommsForStudent,
  saveMHComm: saveMHComm,
  saveMHRemoval: saveMHRemoval,
  getAllTrainingLogs: getAllTrainingLogs,
  saveTrainingLog: saveTrainingLog,
  getTrainingLogsForHost: getTrainingLogsForHost,
  getAllHsChecklists: getAllHsChecklists,
  saveHsChecklist: saveHsChecklist,
  getHsChecklistsForHost: getHsChecklistsForHost,
  getAllVisitReports: getAllVisitReports,
  saveVisitReport: saveVisitReport,
  getVisitReportsForHost: getVisitReportsForHost,
  getSchoolLogs: getSchoolLogs,
  saveSchoolLog: saveSchoolLog,
  getParentLogs: getParentLogs,
  saveParentLog: saveParentLog,
  getSchools: getSchools,
  getSchoolById: getSchoolById,
  upsertSchool: upsertSchool,
  generateSchoolId: generateSchoolId,
  deleteSchoolById: deleteSchoolById,
  getAllAgents: getAllAgents,
  getAgentById: getAgentById,
  saveAllAgents: saveAllAgents,
  saveAgent: saveAgent,
  getAgentLogs: getAgentLogs,
  saveAgentLog: saveAgentLog,
  getContracts: getContracts,
  getContractsByEntity: getContractsByEntity,
  saveContract: saveContract,
  getAllTrainingCourses: getAllTrainingCourses,
  getTrainingCourseById: getTrainingCourseById,
  saveAllTrainingCourses: saveAllTrainingCourses,
  saveTrainingCourse: saveTrainingCourse,
  deleteTrainingCourseById: deleteTrainingCourseById,
  generateTrainingCourseId: generateTrainingCourseId,
  getTrainingCoursesForRole: getTrainingCoursesForRole,
  getAllTrainingCompletions: getAllTrainingCompletions,
  saveAllTrainingCompletions: saveAllTrainingCompletions,
  getCompletionsForPerson: getCompletionsForPerson,
  getCompletionsForCourse: getCompletionsForCourse,
  getLatestCompletionForCourse: getLatestCompletionForCourse,
  generateTrainingCompletionId: generateTrainingCompletionId,
  saveTrainingCompletion: saveTrainingCompletion,
  deleteTrainingCompletionById: deleteTrainingCompletionById,
  getTrainingStatusForPerson: getTrainingStatusForPerson,
  getRequiredCoursesForPerson: getRequiredCoursesForPerson,
  getAllFinanceExpenses: getAllFinanceExpenses,
  getFinanceExpenseById: getFinanceExpenseById,
  generateFinanceExpenseId: generateFinanceExpenseId,
  saveFinanceExpense: saveFinanceExpense,
  deleteFinanceExpense: deleteFinanceExpense,
  getAllFinanceIncome: getAllFinanceIncome,
  getFinanceIncomeById: getFinanceIncomeById,
  generateFinanceIncomeId: generateFinanceIncomeId,
  saveFinanceIncome: saveFinanceIncome,
  deleteFinanceIncome: deleteFinanceIncome,
  getAllStudentHeldFunds: getAllStudentHeldFunds,
  getStudentHeldFunds: getStudentHeldFunds,
  getStudentFundSummary: getStudentFundSummary,
  generateStudentHeldFundId: generateStudentHeldFundId,
  saveStudentHeldFundTransaction: saveStudentHeldFundTransaction,
  deleteStudentHeldFundTransaction: deleteStudentHeldFundTransaction,
  getAllOrgDocs: getAllOrgDocs,
  getOrgDocById: getOrgDocById,
  saveOrgDoc: saveOrgDoc,
  deleteOrgDoc: deleteOrgDoc,
  archiveOrgDoc: archiveOrgDoc,
  restoreOrgDoc: restoreOrgDoc,
  getAllPolicyHistory: getAllPolicyHistory,
  getOrganisation: getOrganisation,
  saveOrganisation: saveOrganisation,
  logSignificantChange: logSignificantChange,
  getAllPolicyAcknowledgements: getAllPolicyAcknowledgements,
  recordPolicyAcknowledgement: recordPolicyAcknowledgement,
  getPolicyAcknowledgementStats: getPolicyAcknowledgementStats,
  getUnacknowledgedPoliciesForPerson: getUnacknowledgedPoliciesForPerson,
  getAllComplaints: getAllComplaints,
  getComplaintById: getComplaintById,
  saveComplaint: saveComplaint,
  getComplaintsStats: getComplaintsStats,
  saveHostHouseholdMember: saveHostHouseholdMember,
  deleteHostHouseholdMember: deleteHostHouseholdMember,
  getHostInPersonVisitStatus: getHostInPersonVisitStatus,
  getAppendix10Agencies: getAppendix10Agencies,
  getEmergencyScenarioLeads: getEmergencyScenarioLeads,
  getEmergencyCoverArrangements: getEmergencyCoverArrangements,
  recordEmergencyNumberIssued: recordEmergencyNumberIssued,
  getEmergencyIssuanceStats: getEmergencyIssuanceStats,
  getAllAuditLogs: getAllAuditLogs,
  logAuditEvent: logAuditEvent,
  commitWithAudit: commitWithAudit,
  getAccessRequests: getAccessRequests,
  saveAccessRequest: saveAccessRequest,
  approveAccessRequest: approveAccessRequest,
  rejectAccessRequest: rejectAccessRequest,
  updateStaffSecuritySettings: updateStaffSecuritySettings,
  getAllSarRequests: getAllSarRequests,
  saveSarRequest: saveSarRequest,
  getGdprRetentionScan: getGdprRetentionScan,
  exportSystemSnapshot: exportSystemSnapshot,
  importSystemSnapshot: importSystemSnapshot,
  getStorageUsageStats: getStorageUsageStats,
  resolveStudentName: resolveStudentName,
  resolveHostName: resolveHostName,
  resolveHostFamilyName: resolveHostFamilyName,
  resolveStaffName: resolveStaffName,
  resolveDriverName: resolveDriverName,
  resolveLinkedStudentNames: resolveLinkedStudentNames,
  resolveSchoolName: resolveSchoolName,
  linkLogisticsRecords: linkLogisticsRecords,
  getLinkedLogistics: getLinkedLogistics
};

syncDenormalizedFields();
