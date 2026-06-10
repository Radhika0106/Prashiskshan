"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCollegeData } from "@/context/CollegeDataContext";
import { 
  Home, PieChart, Sparkles, BookOpen, Users,
  Briefcase, CheckCircle, BarChart, FileText, Settings,
  Search, Mail, Bell, Menu, ChevronDown, UserCheck
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

const COLLEGE_NAV: NavItem[] = [
  { label: "Overview", href: "/college/dashboard", icon: Home },
  { label: "Student Insights", href: "/college/insights", icon: PieChart },
  { label: "AI Recommendations", href: "/college/ai-recommendations", icon: Sparkles },
  { label: "Student Interns", href: "/college/student-interns", icon: UserCheck },
  { label: "Curriculum", href: "/college/curriculum", icon: BookOpen },
  { label: "Faculty", href: "/college/faculty", icon: Users },
  { label: "Industry Partnerships", href: "/college/industry", icon: Briefcase },
  { label: "NEP Compliance", href: "/college/nep", icon: CheckCircle },
  { label: "Analytics", href: "/college/analytics", icon: BarChart },
  { label: "Reports", href: "/college/reports", icon: FileText },
  { label: "Settings", href: "/college/settings", icon: Settings },
];

export default function CollegeLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { currentAdmin } = useCollegeData();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const adminInitials = currentAdmin.name.split(' ').map(n => n[0]).join('');

  return (
    <div className="flex h-screen bg-[#F7F6F3] overflow-hidden">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-[#E5E5E5] flex items-center justify-between px-4 z-20">
        <div className="font-instrument text-2xl tracking-tight">Prashikshan</div>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2">
          <Menu size={24} />
        </button>
      </div>

      {/* Sidebar Nav */}
      <nav className={`
        fixed md:relative top-0 left-0 h-full w-64 bg-white border-r border-[#E5E5E5] flex flex-col z-30 transition-transform duration-300
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
      `}>
        <div className="p-6 pb-4 flex items-center justify-between md:block shrink-0">
          <div>
            <Link href="/" className="font-instrument text-3xl tracking-tight block text-[#111]">Prashikshan</Link>
            <div className="font-inter text-[12px] text-[#666] tracking-wide mt-1">College Portal</div>
          </div>
          <button className="md:hidden p-1" onClick={() => setMobileMenuOpen(false)}>✕</button>
        </div>
        
        <div className="flex-1 overflow-y-auto py-2 flex flex-col gap-1 px-4 hide-scrollbar">
          {COLLEGE_NAV.map((item) => {
            const isActive = pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] font-inter transition-colors
                  ${isActive ? 'bg-[#111111] text-white font-medium' : 'text-[#444] hover:bg-[#F7F6F3] hover:text-[#111] font-normal'}
                `}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Icon size={18} className={isActive ? 'opacity-100' : 'opacity-70'} strokeWidth={isActive ? 2 : 1.5} />
                {item.label}
              </Link>
            )
          })}
        </div>

        {/* Profile Dropdown Area */}
        <div className="p-4 border-t border-[#E5E5E5] shrink-0 relative">
          <div 
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="flex items-center gap-3 w-full p-2 hover:bg-[#F7F6F3] rounded-lg cursor-pointer transition-colors"
          >
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#111] flex items-center justify-center font-inter font-medium text-white text-sm">
              {adminInitials}
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="flex items-center gap-2">
                <div className="text-[14px] font-medium text-[#111] truncate">{currentAdmin.name}</div>
              </div>
              <div className="text-[12px] text-[#666] truncate mt-0.5">{currentAdmin.collegeName}</div>
              <div className="mt-1 font-jetbrains-mono text-[11px] bg-[#E5E5E5] text-[#444] px-1.5 py-0.5 rounded inline-block">
                {currentAdmin.role.replace('_', ' ')}
              </div>
            </div>
            <ChevronDown size={14} className="text-[#999]" />
          </div>

          {/* Profile Popover Menu */}
          {profileDropdownOpen && (
            <div className="absolute bottom-full left-4 right-4 mb-2 bg-white border border-[#E5E5E5] rounded-[10px] shadow-lg py-1 z-40 animate-in slide-in-from-bottom-2 fade-in">
               <Link href="/college/settings" className="block px-4 py-2 text-sm text-[#444] hover:bg-[#F7F6F3] hover:text-[#111]">My Profile</Link>
               <button className="w-full text-left px-4 py-2 text-sm text-[#444] hover:bg-[#F7F6F3] hover:text-[#111]">Switch Role</button>
               <div className="h-px bg-[#E5E5E5] my-1"></div>
               <Link href="/sign-in" className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50">Sign Out</Link>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative w-full h-full md:pt-0 pt-16">
        <header className="h-16 px-8 flex items-center justify-between bg-white border-b border-[#E5E5E5] shrink-0 z-10 hidden md:flex">
          {/* Breadcrumbs placeholder */}
          <div className="font-inter text-[13px] text-[#666]">
            Home &gt; <span className="text-[#111] font-medium capitalize">{pathname.split('/').pop()?.replace('-', ' ')}</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center w-full max-w-[240px] bg-[#F7F6F3] rounded-[8px] px-3 py-1.5 border border-transparent focus-within:border-[#E5E5E5] focus-within:bg-white transition-all">
              <Search size={14} className="text-[#999] mr-2" />
              <input 
                type="text" 
                placeholder="Cmd/Ctrl + K to search" 
                className="bg-transparent border-none outline-none w-full text-[13px] font-inter placeholder:text-[#999]"
              />
            </div>
            <button className="p-2 relative rounded-full hover:bg-[#F7F6F3] transition-colors">
              <Mail size={18} className="text-[#666]" />
            </button>
            <button className="p-2 relative rounded-full hover:bg-[#F7F6F3] transition-colors">
              <Bell size={18} className="text-[#666]" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#F87171] rounded-full"></span>
            </button>
          </div>
        </header>

        {/* Scrollable Page Content */}
        <div className="flex-1 overflow-y-auto bg-[#F7F6F3]">
          {children}
        </div>
      </main>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/20 z-20 md:hidden" onClick={() => setMobileMenuOpen(false)}></div>
      )}
    </div>
  );
}
