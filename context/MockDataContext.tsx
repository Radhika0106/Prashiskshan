import { createContext, useContext, useState, ReactNode } from 'react';
export { 
  type UserRole, type Student, type Company, type Internship, type Application, type PeerSession,
  MOCK_STUDENTS, MOCK_COMPANIES, MOCK_INTERNSHIPS, MOCK_APPLICATIONS, MOCK_PEER_SESSIONS 
} from '@/lib/mock/mockData';
import { 
  UserRole, Student, Company, Internship, Application, PeerSession,
  MOCK_STUDENTS, MOCK_COMPANIES, MOCK_INTERNSHIPS, MOCK_APPLICATIONS, MOCK_PEER_SESSIONS 
} from '@/lib/mock/mockData';

interface MockDataState {
  currentUserRole: UserRole;
  currentUserId: string;
  students: Student[];
  companies: Company[];
  internships: Internship[];
  applications: Application[];
  peerSessions: PeerSession[];
  industryUser: {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  };
  
  // Actions
  addApplication: (app: Application) => void;
  updateApplicationStatus: (id: string, status: Application['status']) => void;
  addInternship: (internship: Internship) => void;
  updateStudent: (id: string, data: Partial<Student>) => void;
  updateIndustryUser: (data: Partial<{ firstName: string; lastName: string; email: string; role: string }>) => void;
  updateCompany: (id: string, data: Partial<Company>) => void;
  setCurrentUserRole: (role: UserRole) => void;
  setCurrentUserId: (id: string) => void;
}

const MockDataContext = createContext<MockDataState | undefined>(undefined);

export function MockDataProvider({ children }: { children: ReactNode }) {
  const [currentUserRole, setCurrentUserRole] = useState<UserRole>('student');
  const [currentUserId, setCurrentUserId] = useState<string>('s1');
  const [students, setStudents] = useState<Student[]>(MOCK_STUDENTS);
  const [applications, setApplications] = useState<Application[]>(MOCK_APPLICATIONS);
  const [internships, setInternships] = useState<Internship[]>(MOCK_INTERNSHIPS);
  const [companies, setCompanies] = useState<Company[]>(MOCK_COMPANIES);
  const [industryUser, setIndustryUser] = useState({
    firstName: 'Kashyap',
    lastName: 'Khajuria',
    email: 'kashyap@techcorp.com',
    role: 'Account Owner'
  });
  
  const addApplication = (app: Application) => {
    setApplications(prev => [app, ...prev]);
  };

  const updateApplicationStatus = (id: string, status: Application['status']) => {
    setApplications(prev => prev.map(app => app.id === id ? { ...app, status } : app));
  };

  const addInternship = (internship: Internship) => {
    setInternships(prev => [internship, ...prev]);
  };

  const updateStudent = (id: string, data: Partial<Student>) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, ...data } : s));
  };

  const updateIndustryUser = (data: Partial<{ firstName: string; lastName: string; email: string; role: string }>) => {
    setIndustryUser(prev => ({ ...prev, ...data }));
  };

  const updateCompany = (id: string, data: Partial<Company>) => {
    setCompanies(prev => prev.map(c => c.id === id ? { ...c, ...data } : c));
  };

  return (
    <MockDataContext.Provider value={{
      currentUserRole,
      currentUserId,
      students,
      companies,
      internships,
      applications,
      peerSessions: MOCK_PEER_SESSIONS,
      industryUser,
      addApplication,
      updateApplicationStatus,
      addInternship,
      updateStudent,
      updateIndustryUser,
      updateCompany,
      setCurrentUserRole,
      setCurrentUserId
    }}>
      {children}
    </MockDataContext.Provider>
  );
}

export function useMockData() {
  const context = useContext(MockDataContext);
  if (!context) {
    throw new Error('useMockData must be used within a MockDataProvider');
  }
  return context;
}
