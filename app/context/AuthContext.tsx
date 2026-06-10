import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface User {
  email: string;
  role: 'student' | 'college' | 'industry';
  isVerified: boolean;
  verificationStep?: number; // 1‑4 depending on role
}

interface AuthContextProps {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (data: Record<string, any>) => Promise<void>;
  setVerificationStep: (step: number) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Load persisted user from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('prashikshan_user');
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const persist = (u: User | null) => {
    if (u) {
      localStorage.setItem('prashikshan_user', JSON.stringify(u));
    } else {
      localStorage.removeItem('prashikshan_user');
    }
  };

  const login = async (email: string, password: string) => {
    // Mock API – accept any credentials
    const mockResponse = {
      email,
      role: 'student' as const,
      isVerified: true,
      verificationStep: 0,
    };
    setUser(mockResponse);
    persist(mockResponse);
  };

  const logout = () => {
    setUser(null);
    persist(null);
  };

  const register = async (data: Record<string, any>) => {
    const newUser: User = {
      email: data.email,
      role: data.role,
      isVerified: false,
      verificationStep: 1,
    };
    setUser(newUser);
    persist(newUser);
  };

  const setVerificationStep = (step: number) => {
    if (!user) return;
    const updated = { ...user, verificationStep: step };
    setUser(updated);
    persist(updated);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, setVerificationStep }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
