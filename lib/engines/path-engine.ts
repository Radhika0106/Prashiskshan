import { CareerCategory, LearningPath, GapAnalysis, AssessmentResponse, PathPhase } from './types';
import { CAREER_RESOURCES } from './career-resources';

// Maps assessment slider questions (Q8 - Q14, 0-indexed: 7 - 13) to their canonical skill names
export const SKILL_MAPPING: Record<number, string> = {
  7: 'Python',
  8: 'Web Technologies',
  9: 'Databases',
  10: 'System Design',
  11: 'Networking & Security',
  12: 'Mobile App Development',
  13: 'Linux/CLI',
};

/**
 * Extracts skills and proficiency levels from assessment responses.
 */
export function extractStudentSkills(responses: AssessmentResponse): { name: string; level: number }[] {
  const skills: { name: string; level: number }[] = [];
  for (const [qIndex, name] of Object.entries(SKILL_MAPPING)) {
    const idx = parseInt(qIndex, 10);
    if (responses[idx] !== undefined) {
      skills.push({ name, level: responses[idx] });
    }
  }
  return skills;
}

/**
 * Computes gap analysis between student's current skills and career requirements.
 */
export function computeGapAnalysis(
  studentSkills: string[],
  requiredSkills: string[]
): GapAnalysis {
  const matchedSkills = requiredSkills.filter(s =>
    studentSkills.some(ss => ss.toLowerCase() === s.toLowerCase())
  );
  
  const gapSkills = requiredSkills.filter(s =>
    !studentSkills.some(ss => ss.toLowerCase() === s.toLowerCase())
  );

  const gapPercentage = requiredSkills.length > 0 
    ? Math.round((gapSkills.length / requiredSkills.length) * 100)
    : 0;

  return {
    currentSkills: studentSkills,
    requiredSkills,
    matchedSkills,
    gapSkills,
    gapPercentage,
  };
}

/**
 * Estimate time reduction based on existing skill levels
 * If a student rates a skill 4+ in the assessment, reduce phase duration by 40%
 * If 3, reduce by 20%
 */
export function adjustDuration(baseDuration: number, skillLevel: number): number {
  if (skillLevel >= 4) {
    return Math.max(1, Math.round(baseDuration * 0.6));
  } else if (skillLevel === 3) {
    return Math.max(1, Math.round(baseDuration * 0.8));
  }
  return baseDuration;
}

/**
 * Generate a personalized learning path for a student's selected career.
 */
export function generatePath(
  selectedCareer: CareerCategory,
  assessmentResponses: AssessmentResponse,
  additionalSkills: string[] = []
): LearningPath {
  const resourceSet = CAREER_RESOURCES[selectedCareer];
  if (!resourceSet) {
    throw new Error(`Career category '${selectedCareer}' not found in resources database.`);
  }

  // 1. Extract student's current skills from assessment responses (level >= 3 is considered "possessed")
  const extracted = extractStudentSkills(assessmentResponses);
  const studentSkillNames = new Set<string>([
    ...extracted.filter(s => s.level >= 3).map(s => s.name),
    ...additionalSkills,
  ]);

  // Create a map of skill levels for quick lookup during duration adjustment
  const skillLevels = new Map<string, number>();
  extracted.forEach(s => skillLevels.set(s.name.toLowerCase(), s.level));
  additionalSkills.forEach(s => {
    if (!skillLevels.has(s.toLowerCase())) {
      skillLevels.set(s.toLowerCase(), 4); // assume level 4 for added skills
    }
  });

  // 2. Compare against required skills for the career (gap analysis)
  const gapAnalysis = computeGapAnalysis(Array.from(studentSkillNames), resourceSet.requiredSkills);

  // 3. Filter/reorder phases based on existing skills
  const phases: PathPhase[] = [];
  let phaseCounter = 1;

  for (const rawPhase of resourceSet.phases) {
    // Check if the student has already mastered ALL skills in this phase (level >= 4)
    const allSkillsMastered = rawPhase.skills.every(skill => {
      const level = skillLevels.get(skill.toLowerCase()) ?? 1;
      return level >= 4;
    });

    // If all skills are mastered, the student skips this phase entirely
    if (allSkillsMastered) {
      continue;
    }

    // Adjust duration based on individual skill levels in this phase
    let totalReductionFactor = 0;
    rawPhase.skills.forEach(skill => {
      const level = skillLevels.get(skill.toLowerCase()) ?? 1;
      if (level >= 4) {
        totalReductionFactor += 0.40;
      } else if (level === 3) {
        totalReductionFactor += 0.20;
      }
    });

    const averageReductionFactor = rawPhase.skills.length > 0
      ? totalReductionFactor / rawPhase.skills.length
      : 0;

    const adjustedDuration = Math.max(
      1, 
      Math.round(rawPhase.durationWeeks * (1 - averageReductionFactor))
    );

    phases.push({
      phase: phaseCounter++,
      name: rawPhase.name,
      durationWeeks: adjustedDuration,
      skills: rawPhase.skills,
      resources: rawPhase.resources,
      milestone: rawPhase.milestone,
    });
  }

  // 4. Calculate total estimated weeks
  const estimatedWeeks = phases.reduce((total, p) => total + p.durationWeeks, 0);

  return {
    career: selectedCareer,
    phases,
    gapAnalysis,
    estimatedWeeks,
  };
}
