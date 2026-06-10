import { create } from 'zustand';

export type StatusType = 'Active' | 'Completed' | 'Upcoming' | 'On Hold' | 'Terminated';
export type ReportType = 'Comprehensive' | 'Summary' | 'NEP Compliance' | 'Custom';

export interface AIInsight {
  id: string;
  type: 'Strength' | 'Opportunity' | 'General';
  text: string;
  source: string;
}

export interface LogbookEntry {
  id: string;
  date: string;
  weekNumber: number;
  hours: number;
  tasksCompleted: string[];
  learnings: string;
  challenges: string;
  mentorFeedback?: {
    text: string;
    rating: number; // 1-5
    timestamp: string;
    name: string;
  };
  approvalStatus: 'Approved' | 'Pending';
  aiInsights: {
    skillsIdentified: string[];
    sentiment: string;
    growthIndicator?: string;
  };
}

export interface Evaluation {
  type: 'Mid-term' | 'Final';
  date: string;
  faculty: {
    name: string;
    criteria: Record<string, number>; // e.g. { "Technical skills": 4, "Communication": 5 }
    overall: number;
    strengths: string[];
    improvements: string[];
    comments: string;
  };
  industry: {
    name: string;
    company: string;
    criteria: Record<string, number>;
    overall: number;
    strengths: string[];
    improvements: string[];
    comments: string;
    wouldHire?: 'Yes' | 'No' | 'Maybe';
  };
  aiComparativeAnalysis?: string;
}

export interface Intern {
  id: string;
  studentName: string;
  rollNumber: string;
  department: string;
  year: string; // "3rd", "4th", etc.
  avatarInitials: string;
  companyName: string;
  roleTitle: string;
  location: string;
  startDate: string;
  endDate: string;
  durationWeeks: number;
  status: StatusType;
  performanceRating: number; // 1-5
  lastActivity: string; // "Logbook: 2 days ago"

  // NEP Compliance Fields
  hoursLogged: number;
  logbookEntriesCount: number;
  midTermEvaluationSubmitted: boolean;
  finalEvaluationSubmitted: boolean;
  certificateIssued: boolean;
  
  // Tab details
  overview: {
    totalLogbookEntries: number;
    expectedEntries: number;
    tasksCompleted: number;
    skillsAcquired: number;
    attendanceRate: number; // Percentage
    aiSummary: string;
    learningOutcomes: {
      technical: string[];
      soft: string[];
      domain: string[];
    };
    companyLogo?: string;
    industrySector: string;
    teamSize: number;
    workMode: 'On-site' | 'Remote' | 'Hybrid';
    mentorName: string;
    mentorDesignation: string;
  };
  logbook: LogbookEntry[];
  evaluations: Evaluation[];
  analytics: {
    skillProgression: {
      skill: string;
      start: number;
      end: number;
    }[];
    weeklyTrend: number[]; // 12 points 0-100
    taskStats: {
      total: number;
      completed: number;
      onTimeRate: number;
      avgTimeDays: number;
    };
    insights: AIInsight[];
    peerComparison: string[];
  };
}

// ---- MOCK DATA ----
const MOCK_INTERNS: Intern[] = [
  {
    id: "intern-1",
    studentName: "Rohan Sharma",
    rollNumber: "21CS045",
    department: "CSE",
    year: "3rd",
    avatarInitials: "RS",
    companyName: "TechCorp India",
    roleTitle: "Software Engineering Intern",
    location: "Bangalore",
    startDate: "2025-06-01",
    endDate: "2025-08-31",
    durationWeeks: 12,
    status: "Active",
    performanceRating: 4.2,
    lastActivity: "Logbook: 2 days ago",
    hoursLogged: 320,
    logbookEntriesCount: 8,
    midTermEvaluationSubmitted: true,
    finalEvaluationSubmitted: false,
    certificateIssued: false,
    overview: {
      totalLogbookEntries: 19,
      expectedEntries: 20,
      tasksCompleted: 15,
      skillsAcquired: 12,
      attendanceRate: 98,
      aiSummary: "Rohan is completing a 12-week software engineering internship at TechCorp India, focusing on full-stack web development. Throughout the internship, he has demonstrated strong technical aptitude, particularly in React and Node.js development. His logbook entries reveal consistent learning progression, starting from foundational concepts to independently building production features by week 8. Rohan actively seeks feedback, showing high initiative and adaptability. He successfully completed 15 assigned tasks and contributed to 3 major product releases. Industry mentor feedback highlights his collaborative approach and problem-solving skills. Areas for growth include time management and public speaking confidence, as noted in his self-reflections. Overall, this internship has significantly advanced Rohan's career readiness, particularly in backend architecture and agile development practices.",
      learningOutcomes: {
        technical: [
          "Mastered React Hooks and Context API",
          "Built RESTful APIs using Node.js and Express",
          "Learned Git version control workflows",
          "Deployed applications on AWS EC2"
        ],
        soft: [
          "Improved team collaboration in agile environment",
          "Enhanced debugging and problem-solving abilities",
          "Developed presentation skills (client demos)"
        ],
        domain: [
          "E-commerce platform architecture",
          "Payment gateway integration",
          "User authentication best practices"
        ]
      },
      industrySector: "Software & Technology",
      teamSize: 6,
      workMode: "Hybrid",
      mentorName: "Priya Singh",
      mentorDesignation: "Senior Engineering Manager"
    },
    logbook: [
      {
        id: "lb-1",
        date: "2025-07-15",
        weekNumber: 6,
        hours: 42,
        tasksCompleted: [
          "Implemented user authentication flow using JWT",
          "Integrated OAuth for Google login",
          "Wrote unit tests for auth endpoints"
        ],
        learnings: "Deepened my understanding of stateless authentication and secure token storage. Realized the importance of HttpOnly cookies for security.",
        challenges: "Struggled with token expiration handling and refresh token logic, took an extra day to resolve.",
        mentorFeedback: {
          text: "Great progress on the auth module. Code is clean. Good job seeking help when stuck on the refresh logic.",
          rating: 4,
          timestamp: "2025-07-16T10:00:00Z",
          name: "Priya Singh"
        },
        approvalStatus: "Approved",
        aiInsights: {
          skillsIdentified: ["JWT", "OAuth", "Unit Testing", "Authentication"],
          sentiment: "Positive learning tone detected with constructive challenge reflection",
          growthIndicator: "First implementation of security-focused features"
        }
      },
      {
        id: "lb-2",
        date: "2025-07-22",
        weekNumber: 7,
        hours: 40,
        tasksCompleted: [
          "Designed database schema for user profiles",
          "Created API endpoints for profile updates",
          "Optimized database queries for faster load times"
        ],
        learnings: "Learned about database indexing and how it drastically improves read operations on large tables.",
        challenges: "Initially wrote inefficient N+1 queries. Had to refactor to use proper joins.",
        approvalStatus: "Pending",
        aiInsights: {
          skillsIdentified: ["Database Design", "API Development", "SQL Optimization"],
          sentiment: "Analytical and reflective",
          growthIndicator: "Transitioning from building to optimizing"
        }
      }
    ],
    evaluations: [
      {
        type: "Mid-term",
        date: "2025-07-10",
        faculty: {
          name: "Dr. S. Mehta",
          criteria: {
            "Technical skills": 4,
            "Communication": 5,
            "Initiative": 3,
            "Time management": 4,
            "Quality of work": 4
          },
          overall: 4.0,
          strengths: ["Clear communication", "Strong foundational knowledge"],
          improvements: ["Needs to take more initiative in proposing solutions"],
          comments: "Rohan is performing well and integrating into the team nicely. Needs to be more proactive."
        },
        industry: {
          name: "Priya Singh",
          company: "TechCorp India",
          criteria: {
            "Technical skills": 4,
            "Communication": 4,
            "Initiative": 4,
            "Time management": 3,
            "Quality of work": 4
          },
          overall: 3.8,
          strengths: ["Quick learner", "Collaborative"],
          improvements: ["Time estimation for tasks"],
          comments: "Rohan is a quick learner. Sometimes struggles with estimating how long tasks will take, but quality is good.",
          wouldHire: "Maybe"
        },
        aiComparativeAnalysis: "Faculty and industry evaluations align on strong communication skills and technical competence. Both noted time management and proactive initiative as areas for development."
      }
    ],
    analytics: {
      skillProgression: [
        { skill: "Frontend Dev", start: 60, end: 85 },
        { skill: "Backend Dev", start: 40, end: 80 },
        { skill: "Database Design", start: 30, end: 65 },
        { skill: "Communication", start: 70, end: 85 },
        { skill: "Teamwork", start: 60, end: 90 },
        { skill: "Problem Solving", start: 50, end: 75 }
      ],
      weeklyTrend: [60, 62, 65, 63, 70, 75, 74, 80, 82, 85, 88, 90], // 12 weeks
      taskStats: {
        total: 18,
        completed: 15,
        onTimeRate: 85,
        avgTimeDays: 3.2
      },
      insights: [
        { id: "i1", type: "Strength", text: "Demonstrated rapid learning in backend development (mentioned in 8/12 entries)", source: "Logbook AI" },
        { id: "i2", type: "Strength", text: "Consistently sought and applied feedback (6 instances documented)", source: "Logbook AI" },
        { id: "i3", type: "Opportunity", text: "Limited reflection on soft skills development", source: "Logbook AI" },
        { id: "i4", type: "Opportunity", text: "Time estimation remains a challenge noted by mentors", source: "Evaluations" }
      ],
      peerComparison: [
        "Performance in top 25% of interns at similar companies",
        "Logbook consistency higher than 78% of peers"
      ]
    }
  },
  {
    id: "intern-2",
    studentName: "Sneha Patel",
    rollNumber: "21EC112",
    department: "ECE",
    year: "4th",
    avatarInitials: "SP",
    companyName: "InnovateX Solutions",
    roleTitle: "IoT Systems Intern",
    location: "Pune",
    startDate: "2024-01-10",
    endDate: "2024-06-30",
    durationWeeks: 24,
    status: "Completed",
    performanceRating: 4.8,
    lastActivity: "Evaluation: 5 months ago",
    hoursLogged: 480,
    logbookEntriesCount: 24,
    midTermEvaluationSubmitted: true,
    finalEvaluationSubmitted: true,
    certificateIssued: true,
    overview: {
      totalLogbookEntries: 24,
      expectedEntries: 24,
      tasksCompleted: 30,
      skillsAcquired: 18,
      attendanceRate: 100,
      aiSummary: "Sneha completed a highly successful 24-week internship at InnovateX Solutions. She led the development of a smart sensor array prototype...",
      learningOutcomes: {
        technical: ["Embedded C", "Raspberry Pi", "Sensor Integration", "MQTT protocol"],
        soft: ["Leadership", "Client Communication"],
        domain: ["Industrial IoT", "Predictive Maintenance"]
      },
      industrySector: "Electronics & IoT",
      teamSize: 4,
      workMode: "On-site",
      mentorName: "Vikram Das",
      mentorDesignation: "Lead Hardware Engineer"
    },
    logbook: [],
    evaluations: [],
    analytics: {
      skillProgression: [],
      weeklyTrend: [],
      taskStats: { total: 30, completed: 30, onTimeRate: 95, avgTimeDays: 2.1 },
      insights: [],
      peerComparison: []
    }
  },
  {
    id: "intern-3",
    studentName: "Amit Verma",
    rollNumber: "22ME034",
    department: "MECH",
    year: "2nd",
    avatarInitials: "AV",
    companyName: "Tata Motors",
    roleTitle: "Design Trainee",
    location: "Pune",
    startDate: "2025-12-01",
    endDate: "2026-02-28",
    durationWeeks: 12,
    status: "Upcoming",
    performanceRating: 0,
    lastActivity: "No activity yet",
    hoursLogged: 0,
    logbookEntriesCount: 0,
    midTermEvaluationSubmitted: false,
    finalEvaluationSubmitted: false,
    certificateIssued: false,
    overview: {
      totalLogbookEntries: 0,
      expectedEntries: 12,
      tasksCompleted: 0,
      skillsAcquired: 0,
      attendanceRate: 0,
      aiSummary: "Amit is scheduled to begin a 12-week design traineeship...",
      learningOutcomes: { technical: [], soft: [], domain: [] },
      industrySector: "Automotive",
      teamSize: 10,
      workMode: "On-site",
      mentorName: "Rajiv Menon",
      mentorDesignation: "Chief Designer"
    },
    logbook: [],
    evaluations: [],
    analytics: {
      skillProgression: [],
      weeklyTrend: [],
      taskStats: { total: 0, completed: 0, onTimeRate: 0, avgTimeDays: 0 },
      insights: [],
      peerComparison: []
    }
  }
];

// ---- STORE ----

export interface ReportConfig {
  reportType: ReportType;
  sections: {
    cover: boolean;
    executiveSummary: boolean;
    overview: boolean;
    outcomes: boolean;
    skillProgression: boolean;
    logbook: boolean;
    analytics: boolean;
    midTerm: boolean;
    finalEval: boolean;
    aiInsights: boolean;
    facultyEndorsement: boolean;
    certificate: boolean;
    appendices: boolean;
  };
  branding: {
    logoPosition: 'Top-left' | 'Top-center' | 'Header watermark';
    footerText: string;
  };
  signatures: {
    faculty: boolean;
    hod: boolean;
    principal: boolean;
  };
  aiEnhancements: {
    autoSummary: boolean;
    skillExtraction: boolean;
    performanceInsights: boolean;
    recommendations: boolean;
    anonymize: boolean;
  };
}

const DEFAULT_CONFIG: ReportConfig = {
  reportType: 'Comprehensive',
  sections: {
    cover: true, executiveSummary: true, overview: true, outcomes: true,
    skillProgression: true, logbook: true, analytics: true, midTerm: true,
    finalEval: true, aiInsights: true, facultyEndorsement: true, certificate: true, appendices: false
  },
  branding: { logoPosition: 'Top-left', footerText: 'Prashikshan Internship Report' },
  signatures: { faculty: true, hod: true, principal: false },
  aiEnhancements: { autoSummary: true, skillExtraction: true, performanceInsights: true, recommendations: true, anonymize: false }
};

interface InternsState {
  interns: Intern[];
  searchQuery: string;
  statusFilter: string;
  deptFilter: string;
  selectedInternId: string | null;
  reportConfig: ReportConfig;
  reportGenerating: boolean;
  reportProgress: number; // 0-100
  reportUrl: string | null;
  
  // Actions
  setSearchQuery: (q: string) => void;
  setStatusFilter: (status: string) => void;
  setDeptFilter: (dept: string) => void;
  setSelectedIntern: (id: string | null) => void;
  updateReportConfig: (updates: Partial<ReportConfig>) => void;
  updateReportSections: (sections: Partial<ReportConfig['sections']>) => void;
  generateReport: () => Promise<void>;
  resetReportStatus: () => void;
}

export const useInternsStore = create<InternsState>((set, get) => ({
  interns: MOCK_INTERNS,
  searchQuery: '',
  statusFilter: 'All',
  deptFilter: 'All',
  selectedInternId: null,
  reportConfig: DEFAULT_CONFIG,
  reportGenerating: false,
  reportProgress: 0,
  reportUrl: null,

  setSearchQuery: (q) => set({ searchQuery: q }),
  setStatusFilter: (status) => set({ statusFilter: status }),
  setDeptFilter: (dept) => set({ deptFilter: dept }),
  setSelectedIntern: (id) => set({ selectedInternId: id, reportUrl: null, reportProgress: 0 }),
  
  updateReportConfig: (updates) => set((state) => ({ reportConfig: { ...state.reportConfig, ...updates } })),
  updateReportSections: (sections) => set((state) => ({ 
    reportConfig: { ...state.reportConfig, sections: { ...state.reportConfig.sections, ...sections } } 
  })),

  generateReport: async () => {
    set({ reportGenerating: true, reportProgress: 0, reportUrl: null });
    
    // Simulate AI pipeline and PDF generation steps
    const steps = [
      { progress: 10, delay: 500 },  // Gathering data
      { progress: 30, delay: 1000 }, // Extracting skills & NLP
      { progress: 50, delay: 800 },  // Generating Executive Summary
      { progress: 75, delay: 1200 }, // Analyzing performance
      { progress: 90, delay: 1000 }, // Compiling PDF
      { progress: 100, delay: 500 }  // Finalizing
    ];

    for (const step of steps) {
      await new Promise(r => setTimeout(r, step.delay));
      set({ reportProgress: step.progress });
    }

    // Mock PDF download URL (using a data URI or just a fake link for demo)
    set({ 
      reportGenerating: false, 
      reportUrl: "#generated" 
    });
  },

  resetReportStatus: () => set({ reportGenerating: false, reportProgress: 0, reportUrl: null })
}));
