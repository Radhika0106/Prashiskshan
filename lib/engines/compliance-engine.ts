import { ComplianceChecklist, ComplianceStatusType } from './types';

export interface InternComplianceData {
  hoursLogged: number;
  logbookEntries: number;
  midTermEvaluationSubmitted: boolean;
  finalEvaluationSubmitted: boolean;
  certificateIssued: boolean;
  internshipWeeks: number;
}

// Canonical NEP 2020/UGC Guidelines constants for credit frameworks
const REQUIRED_HOURS = 480;      // 12 weeks * 40 hours/week
const REQUIRED_ENTRIES = 12;     // 1 entry per week minimum
const HOURS_PER_CREDIT = 120;
const MAX_CREDITS = 4;

/**
 * Calculates academic credits based on logged hours:
 * credits = min(4, floor(internship_hours / 120))
 */
export function calculateCredits(hours: number): number {
  if (hours <= 0) return 0;
  return Math.min(MAX_CREDITS, Math.floor(hours / HOURS_PER_CREDIT));
}

/**
 * Validates if the internship satisfies all criteria to generate a certificate.
 */
export function generateCertificateEligibility(data: InternComplianceData): boolean {
  return (
    data.hoursLogged >= REQUIRED_HOURS &&
    data.logbookEntries >= REQUIRED_ENTRIES &&
    data.midTermEvaluationSubmitted &&
    data.finalEvaluationSubmitted
  );
}

/**
 * Computes a detailed compliance checklist and overall status.
 */
export function getComplianceChecklist(data: InternComplianceData): ComplianceChecklist {
  const hoursCheck = {
    required: REQUIRED_HOURS,
    actual: data.hoursLogged,
    met: data.hoursLogged >= REQUIRED_HOURS,
  };

  const entriesCheck = {
    required: REQUIRED_ENTRIES,
    actual: data.logbookEntries,
    met: data.logbookEntries >= REQUIRED_ENTRIES,
  };

  const midTerm = {
    submitted: data.midTermEvaluationSubmitted,
    met: data.midTermEvaluationSubmitted,
  };

  const finalEval = {
    submitted: data.finalEvaluationSubmitted,
    met: data.finalEvaluationSubmitted,
  };

  const eligible = hoursCheck.met && entriesCheck.met && midTerm.met && finalEval.met;
  
  let overallStatus: ComplianceStatusType = 'NON_COMPLIANT';
  
  if (eligible && data.certificateIssued) {
    overallStatus = 'COMPLIANT';
  } else if (eligible || (hoursCheck.met && entriesCheck.met)) {
    overallStatus = 'PARTIAL';
  } else {
    overallStatus = 'NON_COMPLIANT';
  }

  return {
    hoursLogged: hoursCheck,
    logbookEntries: entriesCheck,
    midTermEvaluation: midTerm,
    finalEvaluation: finalEval,
    certificateIssued: {
      eligible,
      issued: data.certificateIssued,
    },
    creditsEarned: calculateCredits(data.hoursLogged),
    overallStatus,
  };
}
