import { CareerCategory, CAREER_CATEGORIES } from './types';

// How much each career values alignment in each dimension
export const DIMENSION_WEIGHTS: Record<'interests' | 'skills' | 'work_style' | 'values', Record<CareerCategory, number>> = {
  interests: {
    'Software Development': 0.35,
    'Data Science': 0.30,
    'Web Development': 0.35,
    'Cybersecurity': 0.30,
    'Cloud Computing': 0.25,
    'Mobile App Development': 0.35,
    'DevOps': 0.25,
    'AI/ML Engineering': 0.35,
  },
  skills: {
    'Software Development': 0.35,
    'Data Science': 0.45,
    'Web Development': 0.40,
    'Cybersecurity': 0.45,
    'Cloud Computing': 0.45,
    'Mobile App Development': 0.40,
    'DevOps': 0.45,
    'AI/ML Engineering': 0.45,
  },
  work_style: {
    'Software Development': 0.15,
    'Data Science': 0.15,
    'Web Development': 0.15,
    'Cybersecurity': 0.15,
    'Cloud Computing': 0.15,
    'Mobile App Development': 0.15,
    'DevOps': 0.15,
    'AI/ML Engineering': 0.10,
  },
  values: {
    'Software Development': 0.15,
    'Data Science': 0.10,
    'Web Development': 0.10,
    'Cybersecurity': 0.10,
    'Cloud Computing': 0.15,
    'Mobile App Development': 0.10,
    'DevOps': 0.15,
    'AI/ML Engineering': 0.10,
  },
};

// Simulated Feature Importance: 25 question weights per career category
// These sum to 1.0 (or are normalized weights representing decision tree splits)
export const CAREER_QUESTION_WEIGHTS: Record<CareerCategory, number[]> = {
  'Software Development': [
    0.08, 0.06, 0.06, 0.06, 0.05, 0.05, 0.04, // Interests (Q1-Q7)
    0.04, 0.02, 0.06, 0.12, 0.04, 0.02, 0.04, // Skills (Q8-Q14)
    0.03, 0.03, 0.03, 0.02, 0.03, 0.05,       // Work Style (Q15-Q20)
    0.03, 0.02, 0.02, 0.02, 0.04              // Values (Q21-Q25)
  ],
  'Data Science': [
    0.08, 0.07, 0.06, 0.06, 0.05, 0.05, 0.04,
    0.14, 0.01, 0.08, 0.04, 0.02, 0.01, 0.03,
    0.03, 0.02, 0.03, 0.02, 0.04, 0.03,
    0.03, 0.02, 0.02, 0.01, 0.05
  ],
  'Web Development': [
    0.08, 0.06, 0.07, 0.07, 0.05, 0.05, 0.04,
    0.02, 0.15, 0.05, 0.04, 0.02, 0.03, 0.02,
    0.03, 0.03, 0.03, 0.04, 0.03, 0.04,
    0.03, 0.02, 0.02, 0.02, 0.04
  ],
  'Cybersecurity': [
    0.08, 0.06, 0.06, 0.06, 0.05, 0.05, 0.04,
    0.03, 0.01, 0.03, 0.04, 0.16, 0.01, 0.07,
    0.02, 0.03, 0.03, 0.02, 0.03, 0.03,
    0.02, 0.02, 0.02, 0.01, 0.05
  ],
  'Cloud Computing': [
    0.07, 0.06, 0.06, 0.06, 0.05, 0.05, 0.04,
    0.03, 0.01, 0.04, 0.12, 0.09, 0.01, 0.07,
    0.02, 0.02, 0.03, 0.02, 0.03, 0.03,
    0.03, 0.02, 0.02, 0.01, 0.05
  ],
  'Mobile App Development': [
    0.08, 0.06, 0.07, 0.07, 0.05, 0.05, 0.04,
    0.02, 0.05, 0.02, 0.06, 0.01, 0.15, 0.02,
    0.03, 0.03, 0.03, 0.04, 0.03, 0.04,
    0.03, 0.02, 0.02, 0.02, 0.04
  ],
  'DevOps': [
    0.07, 0.06, 0.06, 0.06, 0.05, 0.05, 0.04,
    0.05, 0.01, 0.05, 0.09, 0.06, 0.01, 0.14,
    0.02, 0.04, 0.03, 0.02, 0.03, 0.03,
    0.02, 0.02, 0.02, 0.02, 0.05
  ],
  'AI/ML Engineering': [
    0.08, 0.07, 0.06, 0.06, 0.05, 0.05, 0.04,
    0.15, 0.01, 0.04, 0.06, 0.02, 0.01, 0.03,
    0.02, 0.02, 0.03, 0.02, 0.04, 0.05,
    0.03, 0.02, 0.02, 0.01, 0.06
  ],
};

// Target Ideal Profiles: The perfect response vector (25 dimensions) for each career track
export const CAREER_IDEAL_PROFILES: Record<CareerCategory, number[]> = {
  'Software Development': [
    1, 1, 1, 1, 1, 1, 1, // Interests (Excited by Software domain, logical problem, clean code, api, backend, robust system)
    3, 2, 4, 5, 3, 2, 3, // Skills (Moderately Python, Low Web, High SQL, Expert System Design, Mod Security, Low Mobile, Mod Linux)
    3, 3, 3, 4, 3, 4,    // Work Style (Team match, standard deadline, documentation)
    3, 3, 4, 3, 4        // Values
  ],
  'Data Science': [
    2, 2, 2, 2, 2, 2, 2, // Interests (Data domain, analytical problem, pandas, Jupyter, Big Data, data decisions)
    5, 1, 5, 3, 2, 1, 3, // Skills (Expert Python, Low Web, Expert SQL, Mod System Design, Low Security, Low Mobile, Mod Linux)
    3, 2, 1, 1, 4, 3,    // Work Style (Alone/Analytical, low pressure, self learning, Async)
    4, 3, 4, 2, 4        // Values
  ],
  'Web Development': [
    3, 3, 3, 3, 3, 3, 3, // Interests (Web domain, creative problem, frontend frameworks, dashboard, Web3, stunning UX)
    2, 5, 3, 3, 2, 3, 2, // Skills (Low Python, Expert Web, Mod SQL, Mod System Design, Low Security, Mod Mobile, Low Linux)
    4, 4, 3, 3, 2, 4,    // Work Style (More collaborative, faster paced, Visual comm)
    4, 4, 3, 4, 4        // Values
  ],
  'Cybersecurity': [
    4, 4, 4, 4, 4, 4, 4, // Interests (Cyber domain, systemic problem, hacking weekend, firewall project, Zero-trust, protect infrastructure)
    3, 1, 3, 3, 5, 1, 4, // Skills (Mod Python, Low Web, Mod SQL, Mod System Design, Expert Security, Low Mobile, High Linux)
    2, 3, 2, 4, 1, 2,    // Work Style (Deep-dive, Async, stable standards)
    2, 3, 4, 2, 5        // Values
  ],
  'Cloud Computing': [
    5, 4, 5, 5, 5, 5, 5, // Interests (Cloud domain, systemic problem, AWS weekend, high-availability, edge computing, scale companies)
    3, 1, 4, 5, 4, 1, 4, // Skills (Mod Python, Low Web, High SQL, Expert System Design, High Security, Low Mobile, High Linux)
    2, 2, 1, 1, 3, 3,    // Work Style
    3, 3, 4, 2, 5        // Values
  ],
  'Mobile App Development': [
    6, 3, 6, 6, 6, 6, 6, // Interests (Mobile domain, creative, swift/kotlin, mobile project, wearable tech, pocket impact)
    2, 3, 2, 3, 1, 5, 2, // Skills (Low Python, Mod Web, Low SQL, Mod System Design, Low Security, Expert Mobile, Low Linux)
    4, 4, 3, 3, 3, 4,    // Work Style
    3, 4, 3, 4, 4        // Values
  ],
  'DevOps': [
    7, 4, 7, 7, 7, 7, 7, // Interests (DevOps, systemic, CI/CD weekend, docker pipeline, gitops trend, rapid delivery)
    4, 1, 3, 4, 3, 1, 5, // Skills (High Python, Low Web, Mod SQL, High System Design, Mod Security, Low Mobile, Expert Linux)
    3, 5, 3, 1, 3, 3,    // Work Style (Paced / release cycle)
    2, 3, 4, 3, 5        // Values
  ],
  'AI/ML Engineering': [
    8, 2, 8, 8, 8, 8, 8, // Interests (AI/ML, analytical, pytorch weekend, fine-tune LLM, generative AI, AI impact)
    5, 1, 3, 4, 2, 1, 3, // Skills (Expert Python, Low Web, Mod SQL, High System Design, Low Security, Low Mobile, Mod Linux)
    2, 2, 3, 4, 4, 5,    // Work Style (Research-focused, highly innovative)
    3, 4, 4, 3, 5        // Values
  ],
};
