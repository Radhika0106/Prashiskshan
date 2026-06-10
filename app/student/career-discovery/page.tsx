"use client";

import { useMockData } from "@/context/MockDataContext";
import { Compass, Users, ThumbsUp, Briefcase, ArrowRight, RotateCcw } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CareerDiscoveryHome() {
  const { currentUserId, students } = useMockData();
  const student = students.find(s => s.id === currentUserId);
  const router = useRouter();

  if (!student) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto py-12 md:py-20 px-4">
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full bg-[#F7F6F3] flex items-center justify-center mb-8 text-[#111111]">
          <Compass size={32} strokeWidth={1.5} />
        </div>
        
        <h1 className="font-instrument text-[36px] md:text-[48px] leading-tight mb-4">
          Discover your perfect career match
        </h1>
        
        <p className="font-inter text-[16px] text-[#666666] max-w-[560px] mb-10">
          Answer a few questions about your interests, strengths, and goals. 
          Our AI analyzes your responses and recommends careers tailored specifically to you.
        </p>
        
        {student.careerType ? (
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
            <Link 
              href="/student/career-discovery/results"
              className="px-8 py-4 bg-[#111111] text-white rounded-lg font-medium hover:bg-black/90 transition-colors inline-flex items-center"
            >
              View Your Results <ArrowRight size={18} className="ml-2" />
            </Link>
            <Link 
              href="/student/career-discovery/assessment"
              className="px-8 py-4 bg-white border border-[#E5E5E5] text-[#111111] rounded-lg font-medium hover:border-[#111111] transition-colors inline-flex items-center"
            >
              Retake Assessment <RotateCcw size={18} className="ml-2" />
            </Link>
          </div>
        ) : (
          <Link 
            href="/student/career-discovery/assessment"
            className="px-8 py-4 bg-[#111111] text-white rounded-lg font-medium hover:bg-black/90 transition-colors inline-flex items-center mb-4"
          >
            Start Discovery <ArrowRight size={18} className="ml-2" />
          </Link>
        )}
        
        <div className="font-jetbrains-mono text-[12px] text-[#999999] mb-20">
          Takes 8-10 minutes • No right or wrong answers
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl">
          <div className="flex flex-col items-center p-6 bg-white border border-[#E5E5E5] rounded-xl">
            <div className="w-10 h-10 rounded-full bg-[#F7F6F3] flex items-center justify-center mb-4 text-[#111111]">
              <Users size={20} />
            </div>
            <div className="font-jetbrains-mono text-xl font-medium mb-1">12,847</div>
            <div className="text-sm text-[#666666] text-center">students discovered their path</div>
          </div>
          
          <div className="flex flex-col items-center p-6 bg-white border border-[#E5E5E5] rounded-xl">
            <div className="w-10 h-10 rounded-full bg-[#F7F6F3] flex items-center justify-center mb-4 text-[#111111]">
              <ThumbsUp size={20} />
            </div>
            <div className="font-jetbrains-mono text-xl font-medium mb-1">89%</div>
            <div className="text-sm text-[#666666] text-center">found it helpful</div>
          </div>
          
          <div className="flex flex-col items-center p-6 bg-white border border-[#E5E5E5] rounded-xl">
            <div className="w-10 h-10 rounded-full bg-[#F7F6F3] flex items-center justify-center mb-4 text-[#111111]">
              <Briefcase size={20} />
            </div>
            <div className="font-jetbrains-mono text-xl font-medium mb-1">47</div>
            <div className="text-sm text-[#666666] text-center">career types identified</div>
          </div>
        </div>
      </div>
    </div>
  );
}
