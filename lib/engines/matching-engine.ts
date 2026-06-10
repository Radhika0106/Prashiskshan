import { InternshipMatch, InternshipMatchScores, ReadinessBreakdown, CareerCategory } from './types';
import { tfidfVectorize, cosineSimilarity, clamp } from './math-utils';

export interface StudentMatchProfile {
  skills: string[];
  preferredLocation: string;
  willingLocations: string[];
  readiness: ReadinessBreakdown;
  selectedCareer: CareerCategory;
}

export interface InternshipProfile {
  id: string;
  title: string;
  skillsRequired: string[];
  skillsText: string; // JD text for TF-IDF
  location: string;
  workMode: 'Remote' | 'On-site' | 'Hybrid';
  minReadiness: number; // 0-100
  careerCategory: CareerCategory;
  relatedCategories: CareerCategory[];
}

/**
 * STEP 1: Skill Match (Weight: 0.40)
 * Uses TF-IDF vectorization + Cosine Similarity
 */
export function calculateSkillScore(studentSkills: string[], internshipSkillsText: string): number {
  if (studentSkills.length === 0 || !internshipSkillsText) return 0;
  
  const studentText = studentSkills.join(', ');
  const { matrix } = tfidfVectorize([studentText, internshipSkillsText]);
  
  if (matrix.length < 2) return 0;
  return cosineSimilarity(matrix[0], matrix[1]);
}

/**
 * STEP 2: Location Match (Weight: 0.25)
 */
export function calculateLocationScore(
  studentPref: string,
  studentWilling: string[],
  internshipLocation: string,
  internshipWorkMode: string
): number {
  if (internshipWorkMode.toLowerCase() === 'remote') return 1.0;
  if (internshipLocation.toLowerCase() === studentPref.toLowerCase()) return 1.0;
  
  const isWilling = studentWilling.some(
    loc => loc.toLowerCase() === internshipLocation.toLowerCase()
  );
  if (isWilling) return 0.5;
  
  return 0.0;
}

/**
 * STEP 3: Readiness Match (Weight: 0.20)
 * Career Readiness Score = 0.25×Skills + 0.25×LearningPath + 0.20×PeerLearning + 0.20×Projects + 0.10×Certifications
 */
export function calculateReadinessScore(readiness: ReadinessBreakdown, minReadiness: number): number {
  const totalReadiness = (
    0.25 * readiness.skillsScore +
    0.25 * readiness.learningPathScore +
    0.20 * readiness.peerLearningScore +
    0.20 * readiness.projectsScore +
    0.10 * readiness.certificationsScore
  );
  
  if (minReadiness <= 0) return 1.0;
  return clamp(totalReadiness / minReadiness, 0, 1.0);
}

/**
 * STEP 4: Career Alignment (Weight: 0.15)
 */
export function calculateCareerScore(
  studentCareer: CareerCategory,
  internshipCareer: CareerCategory,
  relatedCategories: CareerCategory[]
): number {
  if (studentCareer === internshipCareer) return 1.0;
  
  const isRelated = relatedCategories.some(
    cat => cat === studentCareer
  );
  if (isRelated) return 0.5;
  
  return 0.0;
}

/**
 * FINAL: Compute complete match score
 */
export function computeMatchScore(
  student: StudentMatchProfile,
  internship: InternshipProfile
): InternshipMatchScores {
  const skillScore = calculateSkillScore(student.skills, internship.skillsText);
  const locScore = calculateLocationScore(
    student.preferredLocation,
    student.willingLocations,
    internship.location,
    internship.workMode
  );
  const readinessScore = calculateReadinessScore(student.readiness, internship.minReadiness);
  const careerScore = calculateCareerScore(
    student.selectedCareer,
    internship.careerCategory,
    internship.relatedCategories
  );

  const rawScore = (
    0.40 * skillScore +
    0.25 * locScore +
    0.20 * readinessScore +
    0.15 * careerScore
  );
  
  const finalScore = Math.round(clamp(rawScore, 0, 1.0) * 1000) / 1000;

  return {
    skillScore: Math.round(skillScore * 1000) / 1000,
    locScore,
    readinessScore: Math.round(readinessScore * 1000) / 1000,
    careerScore,
    finalScore,
  };
}

/**
 * Rank all internships for a student
 */
export function rankInternships(
  student: StudentMatchProfile,
  internships: InternshipProfile[]
): InternshipMatch[] {
  return internships
    .map(internship => ({
      internshipId: internship.id,
      scores: computeMatchScore(student, internship)
    }))
    .sort((a, b) => b.scores.finalScore - a.scores.finalScore);
}
