import { PeerMatchResult } from './types';

export interface PeerProfile {
  id: string;
  offerSkills: string[];
  seekSkills: string[];
  availability: string[]; // e.g. ['monday_morning', 'wednesday_evening']
}

/**
 * Calculate skill complement: what fraction of B's sought skills does A offer?
 * skill_complement(offer, seek) = |offer ∩ seek| / |seek|
 */
export function skillComplement(offerSkills: string[], seekSkills: string[]): number {
  if (seekSkills.length === 0) return 0;
  
  const matches = offerSkills.filter(s =>
    seekSkills.some(sk => sk.toLowerCase() === s.toLowerCase())
  ).length;
  
  return matches / seekSkills.length;
}

/**
 * Calculate availability overlap between two students
 * Fraction of overlap relative to the maximum availability set size to normalize.
 */
export function availabilityOverlap(availA: string[], availB: string[]): number {
  if (availA.length === 0 || availB.length === 0) return 0;
  
  const overlap = availA.filter(a => availB.some(b => b.toLowerCase() === a.toLowerCase())).length;
  return overlap / Math.max(availA.length, availB.length);
}

/**
 * Calculate complementarity score between two students
 * complementarity(A, B) = 0.5 × skill_complement(A.offer, B.seek) + 0.3 × skill_complement(B.offer, A.seek) + 0.2 × availability_overlap(A, B)
 */
export function complementarity(a: PeerProfile, b: PeerProfile): number {
  const compAB = skillComplement(a.offerSkills, b.seekSkills);
  const compBA = skillComplement(b.offerSkills, a.seekSkills);
  const avail = availabilityOverlap(a.availability, b.availability);
  
  return (0.5 * compAB) + (0.3 * compBA) + (0.2 * avail);
}

/**
 * Greedy Maximum Weight Matching for the entire network
 * Pair students globally to maximize total complementarity.
 */
export function greedyMaxWeightMatching(
  students: PeerProfile[],
  threshold: number = 0.3
): { studentA: string; studentB: string; weight: number }[] {
  interface Edge {
    studentA: string;
    studentB: string;
    weight: number;
  }
  
  const edges: Edge[] = [];
  
  for (let i = 0; i < students.length; i++) {
    for (let j = i + 1; j < students.length; j++) {
      const weight = complementarity(students[i], students[j]);
      if (weight >= threshold) {
        edges.push({
          studentA: students[i].id,
          studentB: students[j].id,
          weight,
        });
      }
    }
  }
  
  // Sort edges by weight descending
  edges.sort((a, b) => b.weight - a.weight);
  
  const matched = new Set<string>();
  const matches: { studentA: string; studentB: string; weight: number }[] = [];
  
  for (const edge of edges) {
    if (!matched.has(edge.studentA) && !matched.has(edge.studentB)) {
      matched.add(edge.studentA);
      matched.add(edge.studentB);
      matches.push(edge);
    }
  }
  
  return matches;
}

/**
 * Cold start fallback (< 100 users): simple ranked listing of all potential matches
 * for a specific target student, sorted by complementarity.
 */
export function coldStartMatching(students: PeerProfile[], targetStudentId: string): PeerMatchResult[] {
  const target = students.find(s => s.id === targetStudentId);
  if (!target) return [];

  return students
    .filter(s => s.id !== targetStudentId)
    .map(other => {
      const compAB = skillComplement(target.offerSkills, other.seekSkills);
      const compBA = skillComplement(other.offerSkills, target.seekSkills);
      const avail = availabilityOverlap(target.availability, other.availability);
      const score = (0.5 * compAB) + (0.3 * compBA) + (0.2 * avail);
      
      return {
        studentId: other.id,
        complementarityScore: Math.round(score * 1000) / 1000,
        skillComplementA: Math.round(compAB * 1000) / 1000,
        skillComplementB: Math.round(compBA * 1000) / 1000,
        availabilityOverlap: Math.round(avail * 1000) / 1000,
      };
    })
    .sort((a, b) => b.complementarityScore - a.complementarityScore);
}

/**
 * Main entry point: find peer matches for a specific student.
 * If network is large, we can filter using global greedy matching;
 * otherwise, we return direct rankings (cold start).
 */
export function findPeerMatches(students: PeerProfile[], targetStudentId: string): PeerMatchResult[] {
  const target = students.find(s => s.id === targetStudentId);
  if (!target) return [];

  // If there are less than 100 students, run direct pairwise recommendation.
  if (students.length < 100) {
    return coldStartMatching(students, targetStudentId);
  }

  // For larger networks, we run the greedy maximum weight matching globally first,
  // and see who is matched to whom. But to give options, we also return the top pairwise fits.
  // Let's combine global matching with pairwise recommendations.
  const globalPairs = greedyMaxWeightMatching(students, 0.2);
  const partnerId = globalPairs.find(p => p.studentA === targetStudentId)?.studentB ||
                    globalPairs.find(p => p.studentB === targetStudentId)?.studentA;
  
  const pairwise = coldStartMatching(students, targetStudentId);
  
  // Prioritize the globally optimal matched partner if found
  if (partnerId) {
    const partnerIdx = pairwise.findIndex(p => p.studentId === partnerId);
    if (partnerIdx > -1) {
      const [partnerMatch] = pairwise.splice(partnerIdx, 1);
      // Put it at the front and flag it as a recommended optimal match
      return [partnerMatch, ...pairwise];
    }
  }

  return pairwise;
}
