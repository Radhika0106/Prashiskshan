"use client";

import { useState } from "react";
import { FadeIn } from "./FadeIn";
import { Search, Compass, Users, BookOpen, ShieldCheck, GraduationCap, Building2, LineChart, Briefcase, Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const tabs = ["Students", "Colleges", "Industry"] as const;
type Tab = typeof tabs[number];

const featureData: Record<Tab, { title: string; desc: string; icon: React.ReactNode }[]> = {
  Students: [
    { title: "AI Internship Discovery", desc: "Personalized matches based on skills and goals", icon: <Search size={20} strokeWidth={1.5} className="text-text-primary" /> },
    { title: "Skill Readiness Hub", desc: "Pre-internship modules to close gaps before day one", icon: <Compass size={20} strokeWidth={1.5} className="text-text-primary" /> },
    { title: "Peer Skill Exchange", desc: "Teach and learn with matched peers across the network", icon: <Users size={20} strokeWidth={1.5} className="text-text-primary" /> },
    { title: "Auto Logbook", desc: "NEP-compliant daily logs generated automatically", icon: <BookOpen size={20} strokeWidth={1.5} className="text-text-primary" /> },
  ],
  Colleges: [
    { title: "Faculty Mentorship Panel", desc: "Real-time oversight and evaluation tools", icon: <Building2 size={20} strokeWidth={1.5} className="text-text-primary" /> },
    { title: "Credit Integration", desc: "Academic credit linked directly to internship outcomes", icon: <GraduationCap size={20} strokeWidth={1.5} className="text-text-primary" /> },
    { title: "NEP Compliance Engine", desc: "Automated reporting and audit-ready documentation", icon: <ShieldCheck size={20} strokeWidth={1.5} className="text-text-primary" /> },
    { title: "Analytics Dashboard", desc: "Skill gap and placement data for your institution", icon: <LineChart size={20} strokeWidth={1.5} className="text-text-primary" /> },
  ],
  Industry: [
    { title: "Verified Candidate Profiles", desc: "Pre-screened, skill-assessed applicants", icon: <Briefcase size={20} strokeWidth={1.5} className="text-text-primary" /> },
    { title: "Structured Evaluations", desc: "Standardized rubrics and mentor feedback tools", icon: <ShieldCheck size={20} strokeWidth={1.5} className="text-text-primary" /> },
    { title: "Direct Postings", desc: "Reach verified students from partner institutions", icon: <Users size={20} strokeWidth={1.5} className="text-text-primary" /> },
    { title: "Talent Pipeline Data", desc: "Insights into upcoming cohorts and skill availability", icon: <Award size={20} strokeWidth={1.5} className="text-text-primary" /> },
  ]
};

export function Features() {
  const [activeTab, setActiveTab] = useState<Tab>("Students");

  return (
    <section className="py-[96px] bg-page-bg items-center flex flex-col" id="features">
      <div className="max-w-[1160px] w-full px-6">
        <FadeIn>
          <div className="flex flex-col items-center text-center gap-4 mb-16">
            <div className="font-mono text-[12px] text-[#999999] uppercase tracking-wide">
              What's inside
            </div>
            <h2 className="font-serif text-[36px] font-[400] text-text-primary">
              Built for every stakeholder.
            </h2>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          {/* Tabs */}
          <div className="flex w-full overflow-x-auto gap-8 md:justify-center border-b border-border-main mb-12">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative pb-3 whitespace-nowrap font-sans text-[14px] font-[500] transition-colors duration-150 ${
                  activeTab === tab ? "text-text-primary" : "text-[#999999] hover:text-text-secondary"
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTabFeatures"
                    className="absolute bottom-[-1px] left-0 w-full h-[1px] bg-text-primary"
                    transition={{ duration: 0.2 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Cards Area */}
          <div className="min-h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-[32px]"
              >
                {featureData[activeTab].map((feature, idx) => (
                  <div
                    key={idx}
                    className="group bg-page-bg border border-border-main rounded-card p-[24px] hover:border-border-hover transition-colors duration-150"
                  >
                    <div className="mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="font-serif text-[18px] font-[400] text-text-primary mb-2">
                      {feature.title}
                    </h3>
                    <p className="font-sans text-[14px] font-[400] leading-[1.75] text-text-secondary">
                      {feature.desc}
                    </p>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
