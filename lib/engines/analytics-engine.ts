import { CollegeAnalyticsMetrics, IndustryAnalyticsMetrics } from './types';

// --- COLLEGE METRICS ---

export interface CollegeInternData {
  studentId: string;
  hasInternship: boolean;
  hasLogbook: boolean;
  logbookEntries: number;
  isEvaluated: boolean;
  hoursLogged: number;
  requiredHours: number;
  readinessScore: number;
  daysSinceLastActivity: number;
}

/**
 * Calculates the NEP Compliance Score across all college interns.
 * 
 * NEP Compliance Score = (
 *   (students_with_internships / total) × 0.30 +
 *   (students_with_logbooks / with_internships) × 0.25 +
 *   (students_evaluated / with_internships) × 0.25 +
 *   (hours_logged / required_hours) × 0.20
 * ) × 100
 */
export function calculateNEPComplianceScore(data: CollegeInternData[]): number {
  if (data.length === 0) return 0;

  const total = data.length;
  const withInternships = data.filter(d => d.hasInternship).length;
  
  if (withInternships === 0) {
    // If no one has internships, they cannot have logbooks or evaluations.
    return 0;
  }

  const withLogbooks = data.filter(d => d.hasInternship && d.hasLogbook).length;
  const evaluated = data.filter(d => d.hasInternship && d.isEvaluated).length;
  
  let totalHoursLogged = 0;
  let totalRequiredHours = 0;
  
  data.forEach(d => {
    if (d.hasInternship) {
      totalHoursLogged += d.hoursLogged;
      totalRequiredHours += d.requiredHours;
    }
  });

  const internshipRatio = withInternships / total;
  const logbookRatio = withLogbooks / withInternships;
  const evaluationRatio = evaluated / withInternships;
  const hoursRatio = totalRequiredHours > 0 ? (totalHoursLogged / totalRequiredHours) : 0;

  const score = (
    (internshipRatio * 0.30) +
    (logbookRatio * 0.25) +
    (evaluationRatio * 0.25) +
    (Math.min(1.0, hoursRatio) * 0.20)
  ) * 100;

  return Math.round(score * 100) / 100;
}

/**
 * Identifies at-risk students:
 * if (readiness < 40) OR (logbook_entries < 5 in 2 weeks) OR (days_since_last_activity > 7)
 */
export function identifyAtRiskStudents(data: CollegeInternData[]): string[] {
  return data
    .filter(student => {
      // Risk condition 1: Readiness Score under 40
      const lowReadiness = student.readinessScore < 40;
      
      // Risk condition 2: Logbook entries under 5 (we assume standard 2-week threshold)
      const lowActivity = student.hasInternship && student.logbookEntries < 5;
      
      // Risk condition 3: No activity logged for more than 7 days
      const staleActivity = student.daysSinceLastActivity > 7;
      
      return lowReadiness || lowActivity || staleActivity;
    })
    .map(student => student.studentId);
}

/**
 * Full college analytics computation
 */
export function computeCollegeAnalytics(data: CollegeInternData[]): CollegeAnalyticsMetrics {
  const nepComplianceScore = calculateNEPComplianceScore(data);
  const atRiskStudents = identifyAtRiskStudents(data);
  
  // Placement rate = fraction of students with internships
  const total = data.length;
  const withInternships = data.filter(d => d.hasInternship).length;
  const placementRate = total > 0 ? Math.round((withInternships / total) * 100) : 0;

  // Average readiness score across all students
  const avgReadinessScore = total > 0
    ? Math.round(data.reduce((sum, d) => sum + d.readinessScore, 0) / total)
    : 0;

  return {
    nepComplianceScore,
    atRiskStudents,
    placementRate,
    avgReadinessScore,
  };
}

// --- INDUSTRY METRICS ---

export interface IndustryHiringData {
  postingDate: string; // ISO format or Date string
  offerDate?: string;
  offerAccepted?: boolean;
  matchScore: number;
  manualScreeningMinutes: number;
  platformScreeningMinutes: number;
}

/**
 * Time-to-Hire = average(days from posting → offer accepted)
 */
export function calculateTimeToHire(data: IndustryHiringData[]): number {
  const acceptedHires = data.filter(d => d.offerDate && d.offerAccepted);
  if (acceptedHires.length === 0) return 0;

  let totalDays = 0;
  acceptedHires.forEach(h => {
    const postTime = new Date(h.postingDate).getTime();
    const offerTime = new Date(h.offerDate!).getTime();
    const diffDays = (offerTime - postTime) / (1000 * 60 * 60 * 24);
    totalDays += Math.max(0, diffDays);
  });

  return Math.round((totalDays / acceptedHires.length) * 10) / 10;
}

/**
 * Screening Effort Reduction = (old - new) / old × 100
 */
export function calculateScreeningReduction(data: IndustryHiringData[]): number {
  let totalOld = 0;
  let totalNew = 0;

  data.forEach(d => {
    totalOld += d.manualScreeningMinutes;
    totalNew += d.platformScreeningMinutes;
  });

  if (totalOld === 0) return 0;
  
  const reduction = ((totalOld - totalNew) / totalOld) * 100;
  return Math.round(reduction * 10) / 10;
}

/**
 * Conversion Rate = offers_accepted / offers_made × 100
 */
export function calculateConversionRate(data: IndustryHiringData[]): number {
  const offersMade = data.filter(d => d.offerDate).length;
  if (offersMade === 0) return 0;

  const offersAccepted = data.filter(d => d.offerDate && d.offerAccepted).length;
  const rate = (offersAccepted / offersMade) * 100;
  
  return Math.round(rate * 10) / 10;
}

/**
 * Candidate Quality Score = average(match_score of hired interns)
 */
export function calculateCandidateQuality(data: IndustryHiringData[]): number {
  const hired = data.filter(d => d.offerAccepted);
  if (hired.length === 0) return 0;

  const totalMatch = hired.reduce((sum, h) => sum + h.matchScore, 0);
  const avgQuality = totalMatch / hired.length;
  
  return Math.round(avgQuality * 1000) / 1000;
}

/**
 * Full industry analytics computation
 */
export function computeIndustryAnalytics(data: IndustryHiringData[]): IndustryAnalyticsMetrics {
  return {
    timeToHire: calculateTimeToHire(data),
    screeningEffortReduction: calculateScreeningReduction(data),
    conversionRate: calculateConversionRate(data),
    candidateQualityScore: calculateCandidateQuality(data),
  };
}
