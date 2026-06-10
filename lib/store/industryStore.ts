import { create } from 'zustand';
import { INDUSTRY_MOCK_DATA } from '../mock/industry';

export interface Opening {
  id: string;
  title: string;
  department: string;
  postedOn: string;
  applicationsCount: number;
  filled: number;
  totalPositions: number;
  status: string;
  views: number;
}

export interface Candidate {
  id: string;
  name: string;
  roleId: string;
  roleTitle: string;
  college: string;
  year: string;
  matchScore: number;
  readinessScore: number;
  stage: string;
  appliedAgo: string;
  tags: string[];
  cgpa: string;
}

export interface Intern {
  id: string;
  name: string;
  role: string;
  department: string;
  weekOut: number;
  totalWeeks: number;
  lastLogbookTime: string;
  performance: number;
  mentor: string;
  status: string;
}

export interface College {
  id: string;
  name: string;
  location: string;
  status: string;
  studentsInNetwork: number;
  applicationsReceived: number;
  internsHired: number;
  avgQuality: string;
}

interface IndustryStore {
  openings: Opening[];
  candidates: Candidate[];
  interns: Intern[];
  colleges: College[];
  setCandidates: (candidates: Candidate[]) => void;
  updateCandidateStage: (candidateId: string, newStage: string) => void;
  addOpening: (opening: Opening) => void;
  updateOpeningStatus: (openingId: string, status: string) => void;
  // more actions as needed
}

export const useIndustryStore = create<IndustryStore>((set) => ({
  openings: INDUSTRY_MOCK_DATA.openings,
  candidates: INDUSTRY_MOCK_DATA.candidates,
  interns: INDUSTRY_MOCK_DATA.interns,
  colleges: INDUSTRY_MOCK_DATA.colleges,
  setCandidates: (candidates) => set({ candidates }),
  updateCandidateStage: (candidateId, newStage) => set((state) => ({
    candidates: state.candidates.map(c => c.id === candidateId ? { ...c, stage: newStage } : c)
  })),
  addOpening: (opening) => set((state) => ({
    openings: [opening, ...state.openings]
  })),
  updateOpeningStatus: (openingId, status) => set((state) => ({
    openings: state.openings.map(o => o.id === openingId ? { ...o, status } : o)
  }))
}));
