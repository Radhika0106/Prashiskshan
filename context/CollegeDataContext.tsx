"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

// College User Roles
export type CollegeRole = 'Principal' | 'HOD' | 'Placement_Officer' | 'Academic_Coordinator';

export interface CollegeAdmin {
  id: string;
  name: string;
  email: string;
  role: CollegeRole;
  department?: string;
  collegeName: string;
}

export interface Faculty {
  id: string;
  name: string;
  email: string;
  designation: 'Prof.' | 'Asst. Prof.' | 'Assoc. Prof.';
  department: string;
  specializations: string[];
  menteesCount: number;
  coursesTeaching: number;
  rating: number; // out of 5
  joinDate: string;
}

export interface Course {
  id: string;
  code: string;
  name: string;
  department: string;
  semester: number;
  credits: number;
  enrolled: number;
  avgScore: number; // Percentage
  passRate: number; // Percentage
  facultyId: string;
  isComplianceCore: boolean;
}

export interface CurriculumProposal {
  id: string;
  title: string;
  description: string;
  department: string;
  proposedBy: string; // Faculty Name
  date: string;
  type: 'New Course' | 'Modify Existing' | 'Remove Course' | 'Credit Adjustment';
  priority: 'High' | 'Medium' | 'Low';
  status: 'Proposed' | 'Under Review' | 'Approved';
  commentsCount: number;
}

export interface AIRecommendation {
  id: string;
  category: 'Curriculum' | 'Student' | 'Faculty' | 'Industry';
  title: string;
  reasoning: string;
  impact: 'High Impact' | 'Medium Impact' | 'Emerging Trend';
  actionLabel: string;
  status: 'Active' | 'Implemented' | 'Dismissed';
}

interface CollegeDataState {
  currentAdmin: CollegeAdmin;
  faculty: Faculty[];
  currentFacultyId: string;
  currentFaculty: Faculty;
  courses: Course[];
  curriculumProposals: CurriculumProposal[];
  recommendations: AIRecommendation[];
  updateCurrentAdmin: (data: Partial<CollegeAdmin>) => void;
  updateFaculty: (id: string, data: Partial<Faculty>) => void;
  setCurrentFacultyId: (id: string) => void;

  // Stats
  stats: {
    totalStudents: number;
    interningStudents: number;
    eligibleStudents: number;
    avgReadinessScore: number;
    placementRate: number;
  }
}

const MOCK_ADMIN: CollegeAdmin = {
  id: 'admin1',
  name: 'Dr. Ramesh Kumar',
  email: 'ramesh.k@college.edu',
  role: 'Principal',
  collegeName: 'Global Institute of Technology'
};

const MOCK_FACULTY: Faculty[] = [
  { id: 'f1', name: 'Dr. S. Mehta', email: 's.mehta@college.edu', designation: 'Prof.', department: 'CSE', specializations: ['Machine Learning', 'Databases'], menteesCount: 28, coursesTeaching: 2, rating: 4.8, joinDate: '2015-06-10' },
  { id: 'f2', name: 'Dr. V. Kapoor', email: 'v.kapoor@college.edu', designation: 'Assoc. Prof.', department: 'CSE', specializations: ['Cloud Computing', 'Web Tech'], menteesCount: 12, coursesTeaching: 3, rating: 4.5, joinDate: '2018-08-01' },
  { id: 'f3', name: 'Dr. A. Singh', email: 'a.singh@college.edu', designation: 'Asst. Prof.', department: 'ECE', specializations: ['IoT', 'Embedded Systems'], menteesCount: 15, coursesTeaching: 2, rating: 4.2, joinDate: '2020-01-15' },
];

const MOCK_COURSES: Course[] = [
  { id: 'c1', code: 'CS301', name: 'Data Structures', department: 'CSE', semester: 3, credits: 4, enrolled: 120, avgScore: 76, passRate: 92, facultyId: 'f1', isComplianceCore: true },
  { id: 'c2', code: 'CS402', name: 'Cloud Computing Fundamentals', department: 'CSE', semester: 4, credits: 3, enrolled: 110, avgScore: 82, passRate: 98, facultyId: 'f2', isComplianceCore: false },
  { id: 'c3', code: 'EE201', name: 'Digital Logic', department: 'ECE', semester: 2, credits: 4, enrolled: 85, avgScore: 68, passRate: 85, facultyId: 'f3', isComplianceCore: true }
];

const MOCK_PROPOSALS: CurriculumProposal[] = [
  { id: 'p1', title: 'Add AI Ethics Module', description: 'Introduce a 1-credit module addressing ethical concerns and bias in AI models.', department: 'CSE', proposedBy: 'Dr. S. Mehta', date: '2026-04-10', type: 'New Course', priority: 'Medium', status: 'Under Review', commentsCount: 5 },
  { id: 'p2', title: 'Update Full Stack Web Syllabus', description: 'Transition from MVC architecture to modern React/Next.js frameworks.', department: 'CSE', proposedBy: 'Dr. V. Kapoor', date: '2026-04-18', type: 'Modify Existing', priority: 'High', status: 'Proposed', commentsCount: 2 }
];

const MOCK_RECOMMENDATIONS: AIRecommendation[] = [
  { id: 'r1', category: 'Curriculum', title: 'Add Cloud Computing to Core', reasoning: 'Analysis shows 64% of industry job postings require cloud skills, but only 12% of CSE students have completed relevant training.', impact: 'High Impact', actionLabel: 'Add to Curriculum Plan →', status: 'Active' },
  { id: 'r2', category: 'Student', title: '23 students need intervention', reasoning: 'Identified cohort shows declining attendance and < 40 readiness scores. Early coaching recommended.', impact: 'High Impact', actionLabel: 'Schedule Counseling →', status: 'Active' },
  { id: 'r3', category: 'Faculty', title: 'Balancing load for Prof. Mehta', reasoning: 'Prof Mehta is mentoring 28 students (avg is 12). Distributing 10 students to peers will improve engagement.', impact: 'Medium Impact', actionLabel: 'Auto-balance Load →', status: 'Active' }
];

const CollegeDataContext = createContext<CollegeDataState | undefined>(undefined);

export function CollegeDataProvider({ children }: { children: ReactNode }) {
  const [currentAdmin, setCurrentAdmin] = useState<CollegeAdmin>(MOCK_ADMIN);
  const [faculty, setFaculty] = useState<Faculty[]>(MOCK_FACULTY);
  const [currentFacultyId, setCurrentFacultyId] = useState<string>('f1');

  const currentFaculty = faculty.find(f => f.id === currentFacultyId) || faculty[0];

  const updateCurrentAdmin = (data: Partial<CollegeAdmin>) => {
    setCurrentAdmin(prev => ({ ...prev, ...data }));
  };

  const updateFaculty = (id: string, data: Partial<Faculty>) => {
    setFaculty(prev => prev.map(f => f.id === id ? { ...f, ...data } : f));
  };

  return (
    <CollegeDataContext.Provider value={{
      currentAdmin,
      faculty,
      currentFacultyId,
      currentFaculty,
      courses: MOCK_COURSES,
      curriculumProposals: MOCK_PROPOSALS,
      recommendations: MOCK_RECOMMENDATIONS,
      updateCurrentAdmin,
      updateFaculty,
      setCurrentFacultyId,
      stats: {
        totalStudents: 1250,
        eligibleStudents: 850,
        interningStudents: 312,
        avgReadinessScore: 76,
        placementRate: 82
      }
    }}>
      {children}
    </CollegeDataContext.Provider>
  );
}

export function useCollegeData() {
  const context = useContext(CollegeDataContext);
  if (!context) throw new Error('useCollegeData must be used within CollegeDataProvider');
  return context;
}
