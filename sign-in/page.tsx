"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Eye, EyeOff, GraduationCap, Building2, Briefcase, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const roles = [
  {
    key: "student",
    icon: <GraduationCap size={32} strokeWidth={1.5} className="text-[#111111]" />,
    title: "Student",
    desc: "Sign in to access your internships, skill hub, and peer exchange.",
  },
  {
    key: "college",
    icon: <Building2 size={32} strokeWidth={1.5} className="text-[#111111]" />,
    title: "College / Institution",
    desc: "Sign in to manage student compliance, curriculums, and college insights.",
  },
  {
    key: "industry",
    icon: <Briefcase size={32} strokeWidth={1.5} className="text-[#111111]" />,
    title: "Industry Partner",
    desc: "Sign in to manage your placement pipeline and track active interns.",
  },
];

export default function SignInPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validate = () => {
    const errs: { email?: string; password?: string } = {};
    if (!email) errs.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Enter a valid email address.";
    if (!password) errs.password = "Password is required.";
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200)); // mock API delay
    setLoading(false);
    
    // Redirect based on the specific role they selected
    router.push(`/${selectedRole}/dashboard`);
  };

  return (
    <div className="min-h-screen bg-[#F7F6F3] flex flex-col">
      {/* Top bar */}
      <header className="bg-white border-b border-[#E5E5E5] h-16 flex items-center px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.jpeg" alt="Prashikshan" width={36} height={36} className="object-contain" />
          <span className="font-serif text-[18px] text-[#111111]">Prashikshan</span>
        </Link>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-4 py-16">
        
        {!selectedRole ? (
          <>
            {/* Step 1: Role Selection */}
            <div className="text-center mb-12">
              <div className="font-mono text-[12px] text-[#999999] tracking-[0.05em] mb-4">Welcome back</div>
              <h1 className="font-serif text-[36px] font-[400] text-[#111111] mb-3">Sign in to your account</h1>
              <p className="font-sans text-[15px] text-[#666666]">
                Select your role to access your personalized dashboard.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-[900px]">
              {roles.map((role) => (
                <button
                  key={role.key}
                  onClick={() => setSelectedRole(role.key)}
                  className="group flex flex-col items-start gap-4 bg-white border border-[#E5E5E5] rounded-[12px] p-6 text-left hover:border-[#AAAAAA] transition-colors duration-150 cursor-pointer"
                >
                  <div className="p-2 bg-[#F7F6F3] rounded-[8px] group-hover:bg-[#F0EFEC] transition-colors">
                    {role.icon}
                  </div>
                  <div>
                    <h2 className="font-serif text-[20px] font-[400] text-[#111111] mb-1">{role.title}</h2>
                    <p className="font-sans text-[14px] text-[#666666] leading-[1.6]">{role.desc}</p>
                  </div>
                  <span className="mt-auto font-sans text-[13px] text-[#999999] group-hover:text-[#111111] transition-colors">
                    Sign In →
                  </span>
                </button>
              ))}
            </div>
            
            <p className="mt-10 font-sans text-[13px] text-[#666666]">
              Don&apos;t have an account?{" "}
              <Link href="/get-started" className="text-[#111111] font-[500] hover:underline">
                Get Started
              </Link>
            </p>
          </>
        ) : (
          <>
            {/* Step 2: Login Form */}
            <div className="w-full max-w-[480px] bg-white border border-[#E5E5E5] rounded-[12px] p-8 relative">
              <button 
                onClick={() => setSelectedRole(null)} 
                className="absolute top-6 left-6 text-[#999] hover:text-[#111] transition-colors flex items-center gap-1.5 text-[13px] font-medium"
              >
                <ArrowLeft size={16} /> Back
              </button>
              
              <div className="text-center mt-6 mb-8">
                <div className="mx-auto w-12 h-12 bg-[#F7F6F3] rounded-full flex items-center justify-center mb-4">
                  {roles.find(r => r.key === selectedRole)?.icon}
                </div>
                <h1 className="font-serif text-[32px] font-[400] text-[#111111] mb-1 capitalize">{selectedRole} Login</h1>
                <p className="font-sans text-[14px] text-[#666666]">Enter your credentials to continue.</p>
              </div>

              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="font-sans text-[13px] font-[500] text-[#111111]">Email address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => {
                      const errs = validate();
                      setErrors((prev) => ({ ...prev, email: errs.email }));
                    }}
                    placeholder="you@example.com"
                    className={`h-[44px] w-full px-3 font-sans text-[14px] text-[#111111] bg-white border rounded-[8px] outline-none transition-colors placeholder:text-[#BBBBBB] ${
                      errors.email ? "border-[#EF4444]" : "border-[#E5E5E5] focus:border-[#111111]"
                    }`}
                  />
                  {errors.email && <span className="font-sans text-[13px] text-[#EF4444]">{errors.email}</span>}
                </div>

                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center">
                    <label className="font-sans text-[13px] font-[500] text-[#111111]">Password</label>
                    <Link href="/forgot-password" className="font-sans text-[13px] text-[#666666] hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onBlur={() => {
                        const errs = validate();
                        setErrors((prev) => ({ ...prev, password: errs.password }));
                      }}
                      placeholder="••••••••"
                      className={`h-[44px] w-full px-3 pr-10 font-sans text-[14px] text-[#111111] bg-white border rounded-[8px] outline-none transition-colors placeholder:text-[#BBBBBB] ${
                        errors.password ? "border-[#EF4444]" : "border-[#E5E5E5] focus:border-[#111111]"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#666666] hover:text-[#111111]"
                    >
                      {showPassword ? <EyeOff size={16} strokeWidth={1.5} /> : <Eye size={16} strokeWidth={1.5} />}
                    </button>
                  </div>
                  {errors.password && <span className="font-sans text-[13px] text-[#EF4444]">{errors.password}</span>}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center gap-2 h-[44px] w-full bg-[#111111] text-white font-sans text-[14px] font-[500] rounded-[8px] hover:bg-[#333333] transition-colors disabled:opacity-60 mt-2"
                >
                  {loading ? (
                    <svg className="animate-spin" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="6" stroke="white" strokeWidth="1.5" strokeDasharray="28" strokeDashoffset="10" />
                    </svg>
                  ) : (
                    <>Sign In <ArrowRight size={16} strokeWidth={1.5} /></>
                  )}
                </button>
              </form>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
