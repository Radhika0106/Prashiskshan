"use client";

import { useState } from "react";
import { useMockData, Internship, Company } from "@/context/MockDataContext";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Search, X, MapPin, Briefcase, Calendar, ChevronRight, CornerDownRight, FileText, Sparkles, CheckCircle2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { computeMatchScore, StudentMatchProfile, InternshipProfile } from "@/lib/engines/matching-engine";

export default function DiscoverInternships() {
  const { internships, companies, addApplication, currentUserId, students } = useMockData();
  const [selectedInternship, setSelectedInternship] = useState<(Internship & { scores?: any; matchPercentage?: number }) | null>(null);
  const [isApplying, setIsApplying] = useState(false);
  const [applyStep, setApplyStep] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [locFilter, setLocFilter] = useState("All");
  const [remoteOnly, setRemoteOnly] = useState(false);
  
  const router = useRouter();

  const student = students.find(s => s.id === currentUserId);

  if (!student) return <div className="p-8 text-center">Loading student profile...</div>;

  // Build the student profile for matching
  const studentMatchProfile: StudentMatchProfile = {
    skills: student.skills.map(s => s.name),
    preferredLocation: student.preferredLocation || "Pune",
    willingLocations: student.willingLocations || [],
    readiness: student.readinessBreakdown || {
      skillsScore: 70,
      learningPathScore: 60,
      peerLearningScore: 80,
      projectsScore: 75,
      certificationsScore: 90,
      total: 74
    },
    selectedCareer: student.selectedCareer || "Software Development"
  };

  const handleApply = () => {
    if(!selectedInternship) return;
    addApplication({
      id: Math.random().toString(36).substring(7),
      studentId: currentUserId,
      internshipId: selectedInternship.id,
      appliedOn: new Date().toISOString().split('T')[0],
      status: 'Pending',
      timeline: [{ stage: 'Submitted', date: new Date().toISOString().split('T')[0], status: 'completed' }]
    });
    toast.success("Application submitted successfully!");
    setIsApplying(false);
    setSelectedInternship(null);
    setApplyStep(1);
    router.push('/student/applications');
  };

  const companyMap = new Map<string, Company>();
  companies.forEach(c => companyMap.set(c.id, c));

  // Compute dynamic match scores on the fly for all internships
  const scoredInternships = internships.map(internship => {
    const intProfile: InternshipProfile = {
      id: internship.id,
      title: internship.title,
      skillsRequired: internship.skillsRequired,
      skillsText: internship.skillsText,
      location: internship.location,
      workMode: internship.workMode,
      minReadiness: internship.minReadiness,
      careerCategory: internship.careerCategory,
      relatedCategories: internship.relatedCategories
    };

    const scores = computeMatchScore(studentMatchProfile, intProfile);
    return {
      ...internship,
      scores,
      matchPercentage: Math.round(scores.finalScore * 100)
    };
  }).sort((a, b) => b.matchPercentage - a.matchPercentage);

  // Apply search and filters
  const filteredInternships = scoredInternships.filter(internship => {
    const company = companyMap.get(internship.companyId);
    
    // Search filter
    const matchesSearch = 
      internship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      internship.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      internship.skillsRequired.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    // Work mode filter
    if (remoteOnly && internship.workMode !== 'Remote') return false;

    // Location filter
    if (locFilter !== 'All' && locFilter !== 'Location') {
      if (locFilter === 'Remote' && internship.workMode !== 'Remote') return false;
      if (locFilter !== 'Remote' && internship.location.toLowerCase() !== locFilter.toLowerCase()) return false;
    }

    return true;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex flex-col gap-4 shrink-0">
        <h1 className="font-instrument text-[32px]">Discover Internships</h1>
        
        {/* Search & Filters */}
        <div className="bg-white p-4 rounded-[12px] border border-[#E5E5E5] shadow-sm flex flex-col gap-4 shrink-0">
          <div className="flex items-center gap-2 px-4 py-2 bg-[#F7F6F3] rounded-lg border border-[#E5E5E5] focus-within:border-[#111111] transition-colors">
            <Search size={18} className="text-[#666]" />
            <input 
              type="text" 
              placeholder="Search roles, companies, skills, locations..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none w-full text-base" 
            />
          </div>
          
          <div className="flex flex-wrap gap-4 items-center text-sm font-medium">
            <select 
              value={locFilter}
              onChange={(e) => setLocFilter(e.target.value)}
              className="px-3 py-1.5 border border-[#E5E5E5] rounded-md bg-white hover:border-[#111111] outline-none transition-colors"
            >
              <option value="All">All Locations</option>
              <option value="Remote">Remote Only</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Pune">Pune</option>
              <option value="Mumbai">Mumbai</option>
            </select>
            
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input 
                type="checkbox" 
                checked={remoteOnly}
                onChange={(e) => setRemoteOnly(e.target.checked)}
                className="accent-[#111111]" 
              />
              Remote Only
            </label>
          </div>
        </div>
      </div>

      <div className="flex gap-6 flex-1 min-h-0">
        {/* Sidebar Info */}
        <div className="w-64 shrink-0 overflow-y-auto hidden md:block space-y-6 pr-2">
          <Card className="p-4 border-[#E5E5E5] bg-[#FAFAFA] space-y-3 shadow-sm">
            <h4 className="font-instrument text-[18px] flex items-center gap-1.5 text-[#111]"><Sparkles size={16}/> Matching Matrix</h4>
            <p className="text-[12px] text-[#666] leading-relaxed">
              We rank positions using the standard NEP aggregate formula:
            </p>
            <div className="text-[11px] text-[#111] font-mono space-y-1 bg-white p-2.5 rounded border border-[#E5E5E5]">
              <div>• 40% Skills Similarity</div>
              <div>• 25% Location overlap</div>
              <div>• 20% NEP Readiness</div>
              <div>• 15% Career Target fit</div>
            </div>
            <div className="pt-2 border-t border-[#E5E5E5] text-[11px] text-[#666]">
              Target: <span className="font-medium text-[#111]">{studentMatchProfile.selectedCareer}</span>
            </div>
          </Card>
        </div>

        {/* Results Grid */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 pb-12">
            {filteredInternships.map(internship => {
              const company = companyMap.get(internship.companyId);
              return (
                <div key={internship.id} className="bg-white p-5 rounded-[12px] border border-[#E5E5E5] flex flex-col justify-between hover:border-[#111111] hover:shadow-sm transition-all group shadow-sm">
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex gap-3">
                        <div className="w-12 h-12 rounded bg-[#F3F4F6] flex items-center justify-center font-inter font-medium shrink-0 border border-[#E5E5E5]">
                          {company?.name.substring(0, 2).toUpperCase() || 'C'}
                        </div>
                        <div>
                          <h3 className="font-medium text-lg leading-tight group-hover:underline">{internship.title}</h3>
                          <p className="text-sm text-[#666]">{company?.name} {company?.verified && '✓'}</p>
                        </div>
                      </div>
                      <Badge variant={internship.matchPercentage >= 75 ? 'success' : 'warning'}>
                        {internship.matchPercentage}% match
                      </Badge>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="neutral">{internship.workMode}</Badge>
                      <Badge variant="neutral">{internship.location}</Badge>
                      <Badge variant="neutral">{internship.stipend}</Badge>
                      <Badge variant="neutral">{internship.duration}</Badge>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-2 pt-4 border-t border-[#E5E5E5]/50">
                    <button 
                      onClick={() => setSelectedInternship(internship)}
                      className="flex-1 text-sm font-medium border border-[#E5E5E5] py-2 rounded-lg hover:border-[#111111] hover:bg-[#F3F4F6] transition-colors bg-white"
                    >
                      View Details
                    </button>
                    <button 
                      onClick={() => { setSelectedInternship(internship); setIsApplying(true); setApplyStep(1); }}
                      className="flex-1 text-sm font-medium bg-[#111111] text-white py-2 rounded-lg hover:bg-black/90 transition-colors flex items-center justify-center gap-1"
                    >
                      Quick Apply <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
            {filteredInternships.length === 0 && (
              <div className="col-span-2 p-12 text-center text-[#666] border border-dashed rounded-xl bg-white">
                <AlertCircle className="mx-auto mb-2 text-[#999]" size={24}/>
                No internships found matching your search.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Detail Modal Overlay */}
      {selectedInternship && !isApplying && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white max-w-[720px] w-full rounded-[16px] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="sticky top-0 bg-white/80 backdrop-blur border-b border-[#E5E5E5] px-6 py-4 flex justify-between items-center z-10">
              <div className="font-instrument text-2xl flex items-center gap-2">Role Details</div>
              <button onClick={() => setSelectedInternship(null)} className="p-2 hover:bg-[#F3F4F6] rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 md:p-8 space-y-8">
              {/* Header */}
              <div className="flex justify-between items-center">
                <div className="flex gap-4 items-center">
                   <div className="w-16 h-16 rounded-lg bg-[#F3F4F6] flex items-center justify-center font-inter font-medium text-xl shrink-0 border">
                      {companyMap.get(selectedInternship.companyId)?.name.substring(0, 2).toUpperCase()}
                   </div>
                   <div>
                     <h2 className="font-instrument text-[32px] leading-tight mb-1">{selectedInternship.title}</h2>
                     <div className="text-lg text-[#666]">{companyMap.get(selectedInternship.companyId)?.name}</div>
                   </div>
                </div>
                {selectedInternship.matchPercentage !== undefined && (
                  <div className="text-right">
                    <div className="text-[28px] font-instrument font-bold text-[#16A34A] leading-none">
                      {selectedInternship.matchPercentage}%
                    </div>
                    <div className="text-[11px] font-jetbrains-mono text-[#666] uppercase tracking-wider">AI Compatibility</div>
                  </div>
                )}
              </div>

              {/* Match Score Breakdown */}
              {selectedInternship.scores && (
                <div className="bg-[#ECFDF5] border border-[#A7F3D0] p-4 rounded-xl space-y-3 shadow-sm">
                  <h3 className="text-[14px] font-semibold text-[#065F46] flex items-center gap-1.5"><Sparkles size={14}/> Match Score Breakdown</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                    <div>
                      <div className="text-[#047857] font-medium">Skills Match</div>
                      <div className="font-jetbrains-mono font-bold text-[#111]">{Math.round(selectedInternship.scores.skillScore * 100)}%</div>
                    </div>
                    <div>
                      <div className="text-[#047857] font-medium">Location Score</div>
                      <div className="font-jetbrains-mono font-bold text-[#111]">{Math.round(selectedInternship.scores.locScore * 100)}%</div>
                    </div>
                    <div>
                      <div className="text-[#047857] font-medium">Readiness Level</div>
                      <div className="font-jetbrains-mono font-bold text-[#111]">{Math.round(selectedInternship.scores.readinessScore * 100)}%</div>
                    </div>
                    <div>
                      <div className="text-[#047857] font-medium">Career Alignment</div>
                      <div className="font-jetbrains-mono font-bold text-[#111]">{Math.round(selectedInternship.scores.careerScore * 100)}%</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Quick Info Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-[#F7F6F3] rounded-xl border border-[#E5E5E5] shadow-sm">
                 <div>
                   <div className="flex items-center gap-1.5 text-xs text-[#666] mb-1 font-medium"><MapPin size={14}/> Location</div>
                   <div className="text-sm font-medium">{selectedInternship.location}</div>
                 </div>
                 <div>
                   <div className="flex items-center gap-1.5 text-xs text-[#666] mb-1 font-medium"><Briefcase size={14}/> Duration</div>
                   <div className="text-sm font-medium">{selectedInternship.duration}</div>
                 </div>
                 <div>
                   <div className="flex items-center gap-1.5 text-xs text-[#666] mb-1 font-medium"><CornerDownRight size={14}/> Stipend</div>
                   <div className="text-sm font-medium">{selectedInternship.stipend}</div>
                 </div>
                 <div>
                   <div className="flex items-center gap-1.5 text-xs text-[#666] mb-1 font-medium"><Calendar size={14}/> Start Date</div>
                   <div className="text-sm font-medium">Immediate</div>
                 </div>
              </div>

              {/* Two Column Layout */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                  <section>
                    <h3 className="font-medium text-lg mb-2">Description</h3>
                    <p className="text-[15px] leading-relaxed text-[#444]">
                      {selectedInternship.skillsText}
                    </p>
                  </section>
                  <section>
                    <h3 className="font-medium text-lg mb-2">Requirements</h3>
                    <ul className="list-disc list-inside text-[15px] space-y-1 text-[#444]">
                      <li>Satisfy minimum readiness requirement of {selectedInternship.minReadiness}%</li>
                      <li>Understanding of: {selectedInternship.skillsRequired.join(', ')}</li>
                      <li>Logical coding foundation and documentation capabilities</li>
                    </ul>
                  </section>
                </div>
                
                <div className="space-y-6">
                  <section>
                    <h3 className="font-medium text-lg mb-2">Skills Required</h3>
                    <div className="flex flex-wrap gap-2">
                       {selectedInternship.skillsRequired.map(skill => (
                          <Badge key={skill} variant="info">{skill}</Badge>
                       ))}
                    </div>
                  </section>
                  <section>
                    <h3 className="font-medium text-lg mb-2">About Company</h3>
                    <p className="text-[14px] leading-relaxed text-[#666]">
                      {companyMap.get(selectedInternship.companyId)?.about}
                    </p>
                  </section>
                </div>
              </div>
            </div>

            {/* Sticky Bottom Actions */}
            <div className="sticky bottom-0 bg-white border-t border-[#E5E5E5] p-4 px-6 flex justify-end gap-3 z-10">
              <button 
                onClick={() => setSelectedInternship(null)}
                className="px-6 py-2.5 rounded-lg border border-[#E5E5E5] font-medium text-sm hover:bg-[#F3F4F6] transition-colors bg-white"
              >
                Cancel
              </button>
              <button 
                onClick={() => { setIsApplying(true); setApplyStep(1); }}
                className="px-6 py-2.5 rounded-lg bg-[#111111] text-white font-medium text-sm hover:bg-black/90 transition-colors"
              >
                Apply Now →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Multi-step Application Modal */}
      {selectedInternship && isApplying && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-[600px] w-full rounded-[16px] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="border-b border-[#E5E5E5] px-6 py-4 flex justify-between items-center bg-[#FAFAFA]">
              <div className="font-medium flex items-center gap-2">
                Apply for {selectedInternship.title}
                <span className="text-[#999] text-sm font-normal">at {companyMap.get(selectedInternship.companyId)?.name}</span>
              </div>
              <button onClick={() => { setIsApplying(false); setSelectedInternship(null); }} className="p-1 hover:bg-[#E5E5E5] rounded">
                <X size={18} />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="flex h-1 bg-[#E5E5E5]">
              <div className="bg-[#111111] transition-all duration-300" style={{ width: `${(applyStep / 4) * 100}%` }}></div>
            </div>

            <div className="p-6 md:p-8 min-h-[300px]">
              {applyStep === 1 && (
                <div className="space-y-4 animate-in slide-in-from-right-4">
                  <h3 className="font-instrument text-2xl">Why this role?</h3>
                  <p className="text-sm text-[#666]">Explain why you are a good fit for this internship.</p>
                  <textarea 
                    className="w-full h-32 p-3 border border-[#E5E5E5] rounded-lg outline-none focus:border-[#111111] font-inter text-sm resize-none"
                    placeholder="I am applying to this role because..."
                  ></textarea>
                </div>
              )}

              {applyStep === 2 && (
                <div className="space-y-4 animate-in slide-in-from-right-4">
                  <h3 className="font-instrument text-2xl">Relevant Skills</h3>
                  <p className="text-sm text-[#666]">Check the ones you are confident in.</p>
                  <div className="space-y-2 mt-4">
                    {selectedInternship.skillsRequired.map(skill => (
                      <label key={skill} className="flex items-center gap-3 p-3 border border-[#E5E5E5] rounded-lg cursor-pointer hover:bg-[#FAFAFA] transition-colors">
                        <input type="checkbox" className="accent-[#111111] w-4 h-4" defaultChecked />
                        <span className="font-medium text-sm">{skill}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {applyStep === 3 && (
                <div className="space-y-4 animate-in slide-in-from-right-4">
                  <h3 className="font-instrument text-2xl">Documents</h3>
                  <p className="text-sm text-[#666]">Upload your latest resume (PDF).</p>
                  
                  <div className="border-2 border-dashed border-[#E5E5E5] rounded-[12px] p-8 text-center hover:bg-[#FAFAFA] hover:border-[#111111] transition-colors cursor-pointer group">
                    <FileText className="mx-auto text-[#999] group-hover:text-[#111111] mb-2" size={32} />
                    <div className="font-medium text-sm">Resume uploaded (arjun_kumar_cv.pdf)</div>
                  </div>
                </div>
              )}

              {applyStep === 4 && (
                <div className="space-y-6 animate-in slide-in-from-right-4">
                  <h3 className="font-instrument text-2xl">Review & Submit</h3>
                  <div className="bg-[#FAFAFA] border border-[#E5E5E5] rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-center border-b border-[#E5E5E5] pb-2">
                      <span className="text-sm text-[#666]">Role</span>
                      <span className="font-medium text-sm">{selectedInternship.title}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-[#E5E5E5] pb-2">
                      <span className="text-sm text-[#666]">Company</span>
                      <span className="font-medium text-sm">{companyMap.get(selectedInternship.companyId)?.name}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-[#666]">Resume attached</span>
                      <span className="font-medium text-sm flex items-center text-[#16A34A]"><CheckCircle2 size={14} className="mr-1"/> Yes</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-[#FAFAFA] border-t border-[#E5E5E5] p-4 px-6 flex justify-between items-center">
              <button 
                onClick={() => setIsApplying(false)}
                className="text-sm font-medium text-[#666] hover:text-[#111111] transition-colors"
              >
                Save Draft
              </button>
              
              <div className="flex gap-3">
                {applyStep > 1 && (
                  <button 
                    onClick={() => setApplyStep(s => s - 1)}
                    className="px-4 py-2 rounded-lg border border-[#E5E5E5] font-medium text-sm hover:bg-[#F3F4F6] transition-colors bg-white"
                  >
                    Back
                  </button>
                )}
                <button 
                  onClick={() => {
                    if (applyStep < 4) setApplyStep(s => s + 1);
                    else handleApply();
                  }}
                  className="px-6 py-2 rounded-lg bg-[#111111] text-white font-medium text-sm hover:bg-black/90 transition-colors"
                >
                  {applyStep < 4 ? 'Next →' : 'Submit Application →'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
