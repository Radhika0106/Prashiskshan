import { CareerCategory, ReadinessBreakdown } from '@/lib/engines/types';

export type UserRole = 'student' | 'faculty' | 'industry';

export interface Student {
  id: string;
  name: string;
  email: string;
  course: string;
  college: string;
  readinessScore: number;
  profileCompletion: number;
  skills: { name: string; level: number }[];
  avatar?: string;
  internshipStatus: 'searching' | 'active' | 'completed';
  careerType?: string;
  targetCareer?: string;
  targetCareerProgress?: number;
  
  // ML Engine inputs/outputs
  assessmentResponses?: number[];
  selectedCareer?: CareerCategory;
  preferredLocation?: string;
  willingLocations?: string[];
  offerSkills?: string[];
  seekSkills?: string[];
  readinessBreakdown?: ReadinessBreakdown;
}

export interface Company {
  id: string;
  name: string;
  industry: string;
  verified: boolean;
  logoUrl?: string;
  about: string;
}

export interface Internship {
  id: string;
  companyId: string;
  title: string;
  location: string;
  workMode: 'Remote' | 'On-site' | 'Hybrid';
  duration: string;
  stipend: string;
  matchScore?: number;
  skillsRequired: string[];
  status: 'active' | 'draft' | 'closed';

  // Extended ML Engine fields
  careerCategory: CareerCategory;
  relatedCategories: CareerCategory[];
  minReadiness: number; // 0-100
  skillsText: string;   // detailed description for TF-IDF matching
}

export interface Application {
  id: string;
  studentId: string;
  internshipId: string;
  appliedOn: string;
  status: 'Pending' | 'Shortlisted' | 'Rejected' | 'Accepted';
  timeline: { stage: string; date: string; status: 'completed' | 'current' | 'upcoming' }[];
}

export interface PeerSession {
  id: string;
  studentIdA: string;
  studentIdB: string;
  skillIdA: string;
  skillIdB: string;
  date: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  zoomLink?: string;
}

export const MOCK_STUDENTS: Student[] = [
  {
    id: 's1',
    name: 'Arjun Kumar',
    email: 'arjun@example.com',
    course: 'B.Tech IT',
    college: 'DY Patil COE',
    readinessScore: 74,
    profileCompletion: 85,
    skills: [
      { name: 'Python', level: 3 },
      { name: 'SQL', level: 3 },
      { name: 'Web Technologies', level: 2 }
    ],
    internshipStatus: 'searching',
    preferredLocation: 'Pune',
    willingLocations: ['Mumbai', 'Bangalore'],
    offerSkills: ['Python', 'SQL'],
    seekSkills: ['React', 'System Design'],
    readinessBreakdown: {
      skillsScore: 70,
      learningPathScore: 60,
      peerLearningScore: 80,
      projectsScore: 75,
      certificationsScore: 90,
      total: 74
    }
  },
  {
    id: 's2',
    name: 'Priya Sharma',
    email: 'priya@example.com',
    course: 'B.Des',
    college: 'NID',
    readinessScore: 92,
    profileCompletion: 100,
    skills: [
      { name: 'Web Technologies', level: 4 },
      { name: 'React', level: 3 }
    ],
    internshipStatus: 'active',
    careerType: 'The Creative Builder',
    targetCareer: 'Web Development',
    targetCareerProgress: 34,
    preferredLocation: 'Bangalore',
    willingLocations: ['Delhi', 'Remote'],
    offerSkills: ['Web Technologies', 'React'],
    seekSkills: ['Python', 'Data Science'],
    readinessBreakdown: {
      skillsScore: 90,
      learningPathScore: 95,
      peerLearningScore: 90,
      projectsScore: 95,
      certificationsScore: 100,
      total: 92
    }
  }
];

export const MOCK_COMPANIES: Company[] = [
  { id: 'c1', name: 'Razorpay', industry: 'Fintech', verified: true, about: 'Leading payment gateway and business banking platform in India.' },
  { id: 'c2', name: 'Swiggy', industry: 'Foodtech', verified: true, about: 'India\'s leading on-demand convenience platform delivering food and grocery.' },
  { id: 'c3', name: 'Infosys', industry: 'IT Services', verified: true, about: 'Global leader in next-generation digital services and consulting.' },
  { id: 'c4', name: 'Pine Labs', industry: 'Fintech', verified: true, about: 'Merchant platform company providing financing and last-mile retail transaction services.' }
];

export const MOCK_INTERNSHIPS: Internship[] = [
  {
    id: 'i1',
    companyId: 'c1',
    title: 'Frontend Intern',
    location: 'Bangalore',
    workMode: 'Remote',
    duration: '3 months',
    stipend: '₹15k/month',
    skillsRequired: ['React', 'TypeScript', 'Web Technologies'],
    status: 'active',
    careerCategory: 'Web Development',
    relatedCategories: ['Software Development', 'Mobile App Development'],
    minReadiness: 65,
    skillsText: 'React developer with knowledge of modern frontend frameworks, JavaScript, HTML5, CSS3, Tailwind CSS, API integration, and responsive web design.'
  },
  {
    id: 'i2',
    companyId: 'c2',
    title: 'Data Science Intern',
    location: 'Bangalore',
    workMode: 'Hybrid',
    duration: '6 months',
    stipend: '₹20k/month',
    skillsRequired: ['Python', 'SQL', 'Data Analysis'],
    status: 'active',
    careerCategory: 'Data Science',
    relatedCategories: ['AI/ML Engineering', 'Software Development'],
    minReadiness: 70,
    skillsText: 'Python programmer with experience in data manipulation using Pandas and NumPy, SQL querying, statistics, data visualization, and exploratory data analysis.'
  },
  {
    id: 'i3',
    companyId: 'c3',
    title: 'Cybersecurity Associate',
    location: 'Pune',
    workMode: 'On-site',
    duration: '6 months',
    stipend: '₹18k/month',
    skillsRequired: ['Networking & Security', 'Linux/CLI', 'Security protocols'],
    status: 'active',
    careerCategory: 'Cybersecurity',
    relatedCategories: ['Cloud Computing', 'DevOps'],
    minReadiness: 60,
    skillsText: 'Network security audit assistant. Configure firewalls, check security protocols, analyze server access logs, and perform network vulnerability assessments using Linux command line tools.'
  },
  {
    id: 'i4',
    companyId: 'c4',
    title: 'Cloud DevOps Intern',
    location: 'Mumbai',
    workMode: 'Hybrid',
    duration: '6 months',
    stipend: '₹22k/month',
    skillsRequired: ['Linux/CLI', 'Python', 'CI/CD'],
    status: 'active',
    careerCategory: 'DevOps',
    relatedCategories: ['Cloud Computing', 'Software Development'],
    minReadiness: 75,
    skillsText: 'Automate build pipelines using Git and Jenkins. Write Python scripts for server management, create Docker containers, configure Linux servers, and manage AWS resources.'
  }
];

export const MOCK_APPLICATIONS: Application[] = [
  {
    id: 'a1', studentId: 's1', internshipId: 'i1', appliedOn: '2026-04-10', status: 'Shortlisted',
    timeline: [
      { stage: 'Submitted', date: '2026-04-10', status: 'completed' },
      { stage: 'Under Review', date: '2026-04-12', status: 'completed' },
      { stage: 'Interview Scheduled', date: '2026-04-15', status: 'current' },
      { stage: 'Offer Received', date: '', status: 'upcoming' }
    ]
  }
];

export const MOCK_PEER_SESSIONS: PeerSession[] = [
  { id: 'ps1', studentIdA: 's1', studentIdB: 's2', skillIdA: 'React', skillIdB: 'UI/UX', date: '2026-04-25T10:00:00Z', status: 'upcoming', zoomLink: 'https://zoom.us/j/123456789' }
];
