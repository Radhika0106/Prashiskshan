"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { GraduationCap, Building2, Briefcase } from "lucide-react";

const roles = [
  {
    key: "student",
    icon: <GraduationCap size={32} strokeWidth={1.5} className="text-[#111111]" />,
    title: "Student",
    desc: "Find structured internships, build skills through peer exchange, and earn verified certifications.",
  },
  {
    key: "college",
    icon: <Building2 size={32} strokeWidth={1.5} className="text-[#111111]" />,
    title: "College / Institution",
    desc: "Manage your student internship compliance, track outcomes, and integrate credits seamlessly.",
  },
  {
    key: "industry",
    icon: <Briefcase size={32} strokeWidth={1.5} className="text-[#111111]" />,
    title: "Industry Partner",
    desc: "Post verified internship roles, evaluate structured candidates, and build your talent pipeline.",
  },
];

export default function GetStartedPage() {
  const router = useRouter();

  const handleSelect = (roleKey: string) => {
    localStorage.setItem("prashikshan_role", roleKey);
    router.push(`/signup/${roleKey}`);
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
        {/* Header */}
        <div className="text-center mb-12">
          <div className="font-mono text-[12px] text-[#999999] tracking-[0.05em] mb-4">Get started</div>
          <h1 className="font-serif text-[36px] font-[400] text-[#111111] mb-3">Who are you joining as?</h1>
          <p className="font-sans text-[15px] text-[#666666]">
            Select your role to get a tailored experience.
          </p>
        </div>

        {/* Role cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-[900px]">
          {roles.map((role) => (
            <button
              key={role.key}
              onClick={() => handleSelect(role.key)}
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
                Continue →
              </span>
            </button>
          ))}
        </div>

        <p className="mt-10 font-sans text-[13px] text-[#666666]">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-[#111111] font-[500] hover:underline">
            Sign In
          </Link>
        </p>
      </main>
    </div>
  );
}
