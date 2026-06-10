// ─────────────────────────────────────────────────────────────────────────────
// Prashikshan ML Engines — Shared Type Definitions
// ─────────────────────────────────────────────────────────────────────────────

// ── Career Categories ────────────────────────────────────────────────────────

/** The 8 career tracks supported by the recommendation engine. */
export type CareerCategory =
  | 'Software Development'
  | 'Data Science'
  | 'Web Development'
  | 'Cybersecurity'
  | 'Cloud Computing'
  | 'Mobile App Development'
  | 'DevOps'
  | 'AI/ML Engineering';

/** Canonical ordered list of every career category. */
export const CAREER_CATEGORIES: CareerCategory[] = [
  'Software Development',
  'Data Science',
  'Web Development',
  'Cybersecurity',
  'Cloud Computing',
  'Mobile App Development',
  'DevOps',
  'AI/ML Engineering',
];

// ── Assessment ───────────────────────────────────────────────────────────────

/** The four dimensions measured by the career-assessment questionnaire. */
export type AssessmentDimension = 'interests' | 'skills' | 'work_style' | 'values';

/** A single option within a single-choice or multi-select question. */
export interface AssessmentOption {
  id: string;
  label: string;
  /** Numeric value assigned when this option is selected (typically 1-5). */
  value: number;
  /** Optional human-readable description shown as helper text. */
  desc?: string;
}

/** One question in the 25-question career assessment. */
export interface AssessmentQuestion {
  /** Unique sequential question id (1-25). */
  id: number;
  /** Which assessment dimension this question measures. */
  dimension: AssessmentDimension;
  /** The question text shown to the student. */
  text: string;
  /** Input control type. */
  type: 'single_choice' | 'slider' | 'multi_select';

  // ── single_choice / multi_select fields ──
  options?: AssessmentOption[];

  // ── slider fields ──
  min?: number;
  max?: number;
  minLabel?: string;
  maxLabel?: string;

  /**
   * How much weight each answer contributes to each career category.
   * Keys are career categories; values are multiplicative weights (0-1).
   */
  careerMapping: Partial<Record<CareerCategory, number>>;
}

/**
 * A student's raw responses to the 25-question assessment.
 * Each element is an integer in [1, 5].
 */
export type AssessmentResponse = number[];

// ── Career Recommendation ────────────────────────────────────────────────────

/** Per-dimension scores that explain *why* a career was recommended. */
export interface DimensionScores {
  interests: number;
  skills: number;
  workStyle: number;
  values: number;
}

/** A single career recommendation produced by the recommendation engine. */
export interface CareerRecommendation {
  /** The recommended career track. */
  career: CareerCategory;
  /** Overall confidence score, normalised to [0, 1]. */
  confidence: number;
  /** Breakdown by assessment dimension. */
  dimensionScores: DimensionScores;
}

// ── Learning Path ────────────────────────────────────────────────────────────

/** A single learning resource (course, cert, tutorial, or project). */
export interface LearningResource {
  title: string;
  provider: string;
  url: string;
  type: 'course' | 'certification' | 'tutorial' | 'project';
}

/** One phase within a multi-phase learning path. */
export interface PathPhase {
  /** 1-indexed phase number. */
  phase: number;
  /** Human-readable phase name (e.g. "Foundation", "Intermediate"). */
  name: string;
  /** Expected duration in weeks. */
  durationWeeks: number;
  /** Skills the student will acquire during this phase. */
  skills: string[];
  /** Curated resources for this phase. */
  resources: LearningResource[];
  /** A concrete milestone that marks phase completion. */
  milestone: string;
}

/** Result of comparing a student's current skills against a career's requirements. */
export interface GapAnalysis {
  /** Skills the student already possesses. */
  currentSkills: string[];
  /** Skills required by the target career. */
  requiredSkills: string[];
  /** Intersection — skills the student already has that are required. */
  matchedSkills: string[];
  /** Difference — required skills the student is missing. */
  gapSkills: string[];
  /** Percentage of required skills that are missing (0-100). */
  gapPercentage: number;
}

/** A complete, personalised learning path for one career track. */
export interface LearningPath {
  /** The target career this path prepares the student for. */
  career: CareerCategory;
  /** Ordered list of learning phases. */
  phases: PathPhase[];
  /** Skill-gap analysis that informed the path. */
  gapAnalysis: GapAnalysis;
  /** Total estimated duration in weeks (sum of phase durations). */
  estimatedWeeks: number;
}

// ── Internship Matching ──────────────────────────────────────────────────────

/** Granular sub-scores used to compute the final internship-match score. */
export interface InternshipMatchScores {
  /** How well the student's skills match the internship requirements (0-1). */
  skillScore: number;
  /** Location compatibility score (0-1). */
  locScore: number;
  /** Student readiness score (0-1). */
  readinessScore: number;
  /** Career-alignment score (0-1). */
  careerScore: number;
  /** Weighted aggregate of the above (0-1). */
  finalScore: number;
}

/** A ranked internship match for a given student. */
export interface InternshipMatch {
  /** Unique identifier of the matched internship listing. */
  internshipId: string;
  /** Detailed scoring breakdown. */
  scores: InternshipMatchScores;
}

// ── Student Readiness ────────────────────────────────────────────────────────

/** Breakdown of a student's industry-readiness score (each component 0-100). */
export interface ReadinessBreakdown {
  /** Technical skills proficiency. */
  skillsScore: number;
  /** Progress through assigned learning path. */
  learningPathScore: number;
  /** Participation in peer-learning activities. */
  peerLearningScore: number;
  /** Quality and quantity of completed projects. */
  projectsScore: number;
  /** Relevant certifications obtained. */
  certificationsScore: number;
  /** Weighted total readiness score (0-100). */
  total: number;
}

// ── Peer Matching ────────────────────────────────────────────────────────────

/** Result of the peer-matching algorithm for a single candidate pair. */
export interface PeerMatchResult {
  /** The other student's unique identifier. */
  studentId: string;
  /** Overall complementarity score (0-1). */
  complementarityScore: number;
  /** How much student A's skills complement student B's gaps (0-1). */
  skillComplementA: number;
  /** How much student B's skills complement student A's gaps (0-1). */
  skillComplementB: number;
  /** Fraction of weekly availability hours that overlap (0-1). */
  availabilityOverlap: number;
}

// ── Compliance ───────────────────────────────────────────────────────────────

/** Possible overall compliance statuses. */
export type ComplianceStatusType = 'COMPLIANT' | 'PARTIAL' | 'NON_COMPLIANT';

/** A single boolean requirement check used inside the checklist. */
export interface ComplianceRequirement<T extends boolean | number = number> {
  required: T;
  actual: T;
  met: boolean;
}

/** A boolean-only compliance item (e.g. evaluation submitted). */
export interface ComplianceBooleanItem {
  submitted: boolean;
  met: boolean;
}

/** Full NEP/UGC compliance checklist for one student's internship. */
export interface ComplianceChecklist {
  /** Minimum vs. actual hours logged. */
  hoursLogged: { required: number; actual: number; met: boolean };
  /** Required vs. actual logbook entries. */
  logbookEntries: { required: number; actual: number; met: boolean };
  /** Mid-term evaluation status. */
  midTermEvaluation: { submitted: boolean; met: boolean };
  /** Final evaluation status. */
  finalEvaluation: { submitted: boolean; met: boolean };
  /** Certificate eligibility and issuance. */
  certificateIssued: { eligible: boolean; issued: boolean };
  /** Academic credits earned from the internship. */
  creditsEarned: number;
  /** Aggregated compliance verdict. */
  overallStatus: ComplianceStatusType;
}

// ── Analytics ────────────────────────────────────────────────────────────────

/** High-level metrics surfaced on the college admin analytics dashboard. */
export interface CollegeAnalyticsMetrics {
  /** NEP compliance score across the institution (0-100). */
  nepComplianceScore: number;
  /** Student IDs flagged as at-risk of not completing requirements. */
  atRiskStudents: string[];
  /** Percentage of graduating students who secured placements (0-100). */
  placementRate: number;
  /** Mean readiness score across all tracked students (0-100). */
  avgReadinessScore: number;
}

/** Metrics shown to industry partners on their analytics dashboard. */
export interface IndustryAnalyticsMetrics {
  /** Average number of days from posting to hire. */
  timeToHire: number;
  /** Percentage reduction in manual screening effort (0-100). */
  screeningEffortReduction: number;
  /** Percentage of matched interns converted to full-time offers (0-100). */
  conversionRate: number;
  /** Aggregate quality score of matched candidates (0-1). */
  candidateQualityScore: number;
}
