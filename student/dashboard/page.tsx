"use client";

import { useMockData } from "@/context/MockDataContext";
import { Card, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";
import { Briefcase, Activity, Calendar, FileText, ChevronRight, Video, Download, Compass, Target } from "lucide-react";

export default function StudentDashboard() {
  const { currentUserId, students, internships, applications } = useMockData();
  const student = students.find(s => s.id === currentUserId);
  
  if (!student) return <div>Loading...</div>;

  const activeApplications = applications.filter(a => a.studentId === currentUserId).length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="font-instrument text-[32px]">Welcome back, {student.name.split(' ')[0]}</h1>
        <Badge variant="info">Ready for Internship</Badge>
      </div>

      {/* Top Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Profile Completion */}
        <Card className="flex flex-col justify-between">
          <div>
            <div className="text-sm text-[#666] mb-1">Profile Completion</div>
            <div className="font-jetbrains-mono text-[28px]">{student.profileCompletion}%</div>
          </div>
          <div className="mt-4">
            <div className="h-1 w-full bg-[#E5E5E5] rounded-full overflow-hidden mb-2">
              <div className="h-full bg-[#111111]" style={{ width: `${student.profileCompletion}%` }}></div>
            </div>
            <Link href="/student/profile" className="text-sm font-medium hover:underline inline-flex items-center text-[#666] hover:text-[#111111] transition-colors">
              Complete profile <ChevronRight size={14} className="ml-1" />
            </Link>
          </div>
        </Card>

        {/* Readiness Score */}
        <Card className="flex flex-col justify-between">
          <div>
            <div className="text-sm text-[#666] mb-1">Career Readiness</div>
            <div className="font-jetbrains-mono text-[28px]">{student.readinessScore} <span className="text-sm text-[#999]">/ 100</span></div>
          </div>
          <div className="mt-4 text-sm text-[#666]">
            Top 15% of your college
          </div>
        </Card>

        {/* Active Applications */}
        <Card className="flex flex-col justify-between">
          <div>
            <div className="text-sm text-[#666] mb-1">Active Applications</div>
            <div className="font-jetbrains-mono text-[28px]">{activeApplications}</div>
          </div>
          <div className="mt-4">
            <Badge variant="warning">2 pending responses</Badge>
          </div>
        </Card>

        {/* Peer Sessions */}
        <Card className="flex flex-col justify-between">
          <div>
            <div className="text-sm text-[#666] mb-1">Peer Sessions This Month</div>
            <div className="font-jetbrains-mono text-[28px]">8</div>
          </div>
          <div className="mt-4 text-sm text-[#666]">
            3 hours learned
          </div>
        </Card>
      </div>

      {/* Career Discovery & Path Entry Points */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {!student.careerType ? (
          <Link href="/student/career-discovery" className="block group">
            <Card className="h-full border-[#E5E5E5] hover:border-[#111111] transition-colors flex items-start gap-4 bg-white">
              <div className="w-12 h-12 rounded-full bg-[#F7F6F3] flex items-center justify-center shrink-0 group-hover:bg-[#111111] group-hover:text-white transition-colors">
                <Compass size={24} />
              </div>
              <div>
                <h3 className="font-instrument text-xl mb-1 group-hover:underline">Not sure what career fits you?</h3>
                <p className="text-sm text-[#666]">Discover your perfect career match with our AI assessment.</p>
                <div className="mt-3 text-sm font-medium flex items-center text-[#111111]">
                  Start Discovery <ChevronRight size={14} className="ml-1" />
                </div>
              </div>
            </Card>
          </Link>
        ) : (
          <Link href="/student/career-discovery" className="block group">
            <Card className="h-full border-[#E5E5E5] hover:border-[#111111] transition-colors flex items-start gap-4 bg-[#F7F6F3]">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0">
                <Compass size={24} className="text-[#666]" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-instrument text-xl">Your Career Type</h3>
                  <Badge variant="success">Match</Badge>
                </div>
                <p className="text-sm font-medium text-[#111111]">{student.careerType}</p>
                <div className="mt-3 text-sm font-medium flex items-center text-[#666] group-hover:text-[#111111] transition-colors">
                  View full results <ChevronRight size={14} className="ml-1" />
                </div>
              </div>
            </Card>
          </Link>
        )}

        {!student.targetCareer ? (
          <Link href="/student/career-path" className="block group">
            <Card className="h-full border-[#E5E5E5] hover:border-[#111111] transition-colors flex items-start gap-4 bg-white">
              <div className="w-12 h-12 rounded-full bg-[#F7F6F3] flex items-center justify-center shrink-0 group-hover:bg-[#111111] group-hover:text-white transition-colors">
                <Target size={24} />
              </div>
              <div>
                <h3 className="font-instrument text-xl mb-1 group-hover:underline">Set a target career</h3>
                <p className="text-sm text-[#666]">We'll guide you there with a personalized roadmap.</p>
                <div className="mt-3 text-sm font-medium flex items-center text-[#111111]">
                  Build Path <ChevronRight size={14} className="ml-1" />
                </div>
              </div>
            </Card>
          </Link>
        ) : (
          <Link href="/student/career-path" className="block group">
            <Card className="h-full border-[#E5E5E5] hover:border-[#111111] transition-colors flex items-center gap-4 bg-white">
              <div className="relative shrink-0 flex items-center justify-center w-16 h-16">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-[#E5E5E5]"
                    strokeWidth="3"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-[#111111] transition-all duration-1000 ease-out"
                    strokeDasharray={`${student.targetCareerProgress || 0}, 100`}
                    strokeWidth="3"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center font-jetbrains-mono text-[11px] font-medium">
                  {student.targetCareerProgress || 0}%
                </div>
              </div>
              <div className="flex-1">
                <div className="text-xs text-[#666] mb-0.5 uppercase tracking-wide font-medium">Target Career</div>
                <h3 className="font-instrument text-xl mb-1 leading-tight">{student.targetCareer}</h3>
                <div className="mt-2 text-sm font-medium flex items-center text-[#111111] group-hover:underline">
                  Continue Learning <ChevronRight size={14} className="ml-1" />
                </div>
              </div>
            </Card>
          </Link>
        )}
      </div>

      {/* Three Column Layout equivalent (2/3 + 1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (2/3) */}
        <div className="lg:col-span-2 space-y-6">
          
          <Card>
            <CardTitle>Matches for you</CardTitle>
            <div className="space-y-4">
              {internships.map(internship => (
                <div key={internship.id} className="flex gap-4 p-4 border border-[#E5E5E5] rounded-lg hover:border-[#111111] transition-colors">
                  <div className="w-12 h-12 rounded bg-[#F3F4F6] flex items-center justify-center font-inter font-medium shrink-0">
                    C
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-base truncate">{internship.title}</h4>
                    <p className="text-[13px] text-[#666] mb-3">Company • {internship.location}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="neutral">{internship.workMode}</Badge>
                      <Badge variant="neutral">{internship.duration}</Badge>
                      <Badge variant="neutral">{internship.stipend}</Badge>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-jetbrains-mono text-[11px] text-[#16A34A] font-medium bg-[#F0FDF4] px-2 py-1 rounded">
                        {internship.matchScore}% match
                      </span>
                      <button className="text-sm font-medium hover:underline text-[#666] transition-colors">View Details</button>
                      <button className="text-sm font-medium hover:underline flex items-center transition-colors">
                        Quick Apply <ChevronRight size={14} className="ml-1" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <CardTitle>Activity</CardTitle>
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-[#E5E5E5] before:to-transparent">
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-white text-[#111111] shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  <Activity size={16} />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-lg bg-white border border-[#E5E5E5] shadow-sm">
                  <div className="flex items-center justify-between mb-1">
                    <div className="font-medium text-sm">Applied to Frontend Intern</div>
                    <time className="font-jetbrains-mono text-[12px] text-[#999]">2h ago</time>
                  </div>
                  <div className="text-[13px] text-[#666]">Razorpay</div>
                </div>
              </div>

              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-[#F3F4F6] text-[#666] shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  <Video size={16} />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-lg bg-white border border-[#E5E5E5] shadow-sm">
                  <div className="flex items-center justify-between mb-1">
                    <div className="font-medium text-sm">Completed peer session</div>
                    <time className="font-jetbrains-mono text-[12px] text-[#999]">1d ago</time>
                  </div>
                  <div className="text-[13px] text-[#666]">React Basics with Priya S.</div>
                </div>
              </div>
            </div>
          </Card>

        </div>

        {/* Right Column (1/3) */}
        <div className="space-y-6">
          
          <Card>
            <CardTitle>Upcoming Sessions</CardTitle>
            <div className="p-4 rounded-lg border border-[#E5E5E5] bg-[#FAFAFA]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#111111] text-white flex items-center justify-center text-sm font-medium">PS</div>
                <div>
                  <div className="font-medium text-sm">Priya Sharma</div>
                  <div className="text-xs text-[#666]">Teaching: Python Basics</div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm font-jetbrains-mono px-3 py-2 bg-white rounded border border-[#E5E5E5] mb-4">
                <Calendar size={14} className="text-[#666]" />
                Today, 4:00 PM
              </div>
              <div className="flex gap-2">
                <button className="flex-1 bg-[#111111] text-white text-sm font-medium py-2 rounded-lg hover:bg-black/90 transition-colors">
                  Join Meeting
                </button>
              </div>
              <div className="mt-3 text-center">
                <button className="text-xs text-[#666] hover:underline">Reschedule</button>
              </div>
            </div>
          </Card>

          <Card>
            <CardTitle>Quick Actions</CardTitle>
            <div className="flex flex-col gap-2">
              <button className="px-4 py-2.5 rounded-lg border border-[#E5E5E5] hover:border-[#111111] text-sm font-medium text-left transition-colors flex justify-between items-center group">
                Update availability
                <ChevronRight size={16} className="text-[#999] group-hover:text-[#111111] transition-colors" />
              </button>
              <button className="px-4 py-2.5 rounded-lg border border-[#E5E5E5] hover:border-[#111111] text-sm font-medium text-left transition-colors flex justify-between items-center group">
                Download resume
                <Download size={16} className="text-[#999] group-hover:text-[#111111] transition-colors" />
              </button>
              <button className="px-4 py-2.5 rounded-lg border border-[#E5E5E5] hover:border-[#111111] text-sm font-medium text-left transition-colors flex justify-between items-center group">
                Request mentor session
                <ChevronRight size={16} className="text-[#999] group-hover:text-[#111111] transition-colors" />
              </button>
              <button className="px-4 py-2.5 rounded-lg border border-[#E5E5E5] hover:border-[#111111] text-sm font-medium text-left transition-colors flex justify-between items-center group">
                View certificates
                <FileText size={16} className="text-[#999] group-hover:text-[#111111] transition-colors" />
              </button>
            </div>
          </Card>

          <Card>
            <CardTitle>Skills to Learn</CardTitle>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="neutral">Advanced CSS</Badge>
              <Badge variant="neutral">Node.js</Badge>
              <Badge variant="neutral">System Design</Badge>
            </div>
            <Link href="/student/peers" className="text-sm font-medium hover:underline inline-flex items-center text-[#111111] transition-colors">
              Find peer <ChevronRight size={14} className="ml-1" />
            </Link>
          </Card>

        </div>

      </div>
    </div>
  );
}
