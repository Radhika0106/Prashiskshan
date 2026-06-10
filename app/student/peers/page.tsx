"use client";

import { useState } from "react";
import { useMockData } from "@/context/MockDataContext";
import { Badge } from "@/components/ui/Badge";
import { Users, Loader2, Video, Star, Calendar, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { findPeerMatches, PeerProfile } from "@/lib/engines/peer-engine";

export default function PeerExchange() {
  const { currentUserId, students, peerSessions, updateStudent } = useMockData();
  const [activeTab, setActiveTab] = useState('find');
  const [isMatching, setIsMatching] = useState(false);
  const [matches, setMatches] = useState<any[]>([]);
  const [isEditingSkills, setIsEditingSkills] = useState(false);
  const [newOfferSkill, setNewOfferSkill] = useState("");
  const [newSeekSkill, setNewSeekSkill] = useState("");

  const student = students.find(s => s.id === currentUserId);

  const handleRemoveOfferSkill = (skillToRemove: string) => {
    if (!student) return;
    const currentOffers = student.offerSkills || student.skills.map(s => s.name) || [];
    const updated = currentOffers.filter(s => s !== skillToRemove);
    updateStudent(student.id, { offerSkills: updated });
    toast.success(`Removed offered skill: ${skillToRemove}`);
  };

  const handleRemoveSeekSkill = (skillToRemove: string) => {
    if (!student) return;
    const currentSeeks = student.seekSkills || [];
    const updated = currentSeeks.filter(s => s !== skillToRemove);
    updateStudent(student.id, { seekSkills: updated });
    toast.success(`Removed wanted skill: ${skillToRemove}`);
  };

  const handleAddOfferSkill = (skill: string) => {
    if (!student) return;
    const cleanSkill = skill.trim();
    if (!cleanSkill) return;
    const currentOffers = student.offerSkills || student.skills.map(s => s.name) || [];
    if (currentOffers.includes(cleanSkill)) {
      toast.error("Skill already offered");
      return;
    }
    const updated = [...currentOffers, cleanSkill];
    updateStudent(student.id, { offerSkills: updated });
    setNewOfferSkill("");
    toast.success(`Added offered skill: ${cleanSkill}`);
  };

  const handleAddSeekSkill = (skill: string) => {
    if (!student) return;
    const cleanSkill = skill.trim();
    if (!cleanSkill) return;
    const currentSeeks = student.seekSkills || [];
    if (currentSeeks.includes(cleanSkill)) {
      toast.error("Skill already in demands");
      return;
    }
    const updated = [...currentSeeks, cleanSkill];
    updateStudent(student.id, { seekSkills: updated });
    setNewSeekSkill("");
    toast.success(`Added wanted skill: ${cleanSkill}`);
  };

  const handleMatch = () => {
    setIsMatching(true);
    
    // Simulate slight processing animation
    setTimeout(() => {
      setIsMatching(false);
      
      // Map all students in context to PeerProfiles
      const peerProfiles: PeerProfile[] = students.map(s => ({
        id: s.id,
        offerSkills: s.offerSkills || s.skills.map(sk => sk.name),
        seekSkills: s.seekSkills || [],
        availability: ['monday_morning', 'wednesday_evening'] // mock availability
      }));

      // Find peer matches using ML graph-matching engine
      const results = findPeerMatches(peerProfiles, currentUserId);
      
      // Hydrate matches with student details (name, course, etc.)
      const hydrated = results.map(res => {
        const peerStudent = students.find(s => s.id === res.studentId);
        return {
          ...res,
          name: peerStudent?.name || "Unknown Peer",
          course: peerStudent?.course || "Unknown Course",
          avatar: peerStudent?.name.split(' ').map(n => n[0]).join('') || "P",
          offers: peerStudent?.offerSkills || peerStudent?.skills.map(sk => sk.name) || [],
          wants: peerStudent?.seekSkills || []
        };
      });

      setMatches(hydrated);
      toast.success(`Found ${hydrated.length} potential skill exchange partners!`);
    }, 1500);
  };

  const handleRequest = (name: string) => {
    toast.success(`Session request sent to ${name}`);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-instrument text-[32px] leading-tight">Peer Exchange</h1>
          <p className="text-[#666] text-sm mt-1">Teach what you know. Learn what you don't.</p>
        </div>
        
        <div className="flex bg-[#E5E5E5]/50 p-1 rounded-lg overflow-x-auto shrink-0 hide-scrollbar">
          {['find', 'sessions'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 text-sm font-medium rounded-md whitespace-nowrap capitalize transition-colors ${
                activeTab === tab ? 'bg-white text-[#111111] shadow-sm' : 'text-[#666] hover:text-[#111111]'
              }`}
            >
              {tab === 'find' ? 'Find Peers' : 'Sessions'}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'find' && (
        <div className="space-y-6 animate-in fade-in">
            {/* Self Profile Card */}
            <div className="bg-white border border-[#E5E5E5] rounded-[16px] p-6 shadow-sm flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
               <div className="flex-1 space-y-4 w-full">
                  <div className="flex justify-between items-start">
                     <div>
                        <h3 className="font-medium text-lg">My Exchange Profile</h3>
                        <p className="text-sm text-[#666] mt-0.5">Keep your skills updated for better matching accuracy.</p>
                     </div>
                     <button 
                        onClick={() => setIsEditingSkills(!isEditingSkills)}
                        className="text-xs font-semibold px-3 py-1.5 border border-[#E5E5E5] rounded-lg hover:border-[#111] hover:bg-[#FAFAFA] transition-colors whitespace-nowrap"
                     >
                        {isEditingSkills ? "Done Editing" : "Edit Skills"}
                     </button>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-6 w-full">
                     <div className="flex-1 bg-[#FAFAFA] rounded-xl p-4 border border-[#E5E5E5] shadow-sm flex flex-col justify-between">
                        <div>
                           <div className="text-xs font-medium text-[#666] uppercase tracking-wider mb-3">Skills I Offer</div>
                           <div className="flex flex-wrap gap-2">
                              {(student?.offerSkills || student?.skills.map(s => s.name) || []).map(skill => (
                                 <Badge key={skill} variant="info" className="flex items-center gap-1.5">
                                   {skill}
                                   {isEditingSkills && (
                                     <button 
                                       onClick={() => handleRemoveOfferSkill(skill)} 
                                       className="hover:text-red-600 font-bold ml-0.5 w-3.5 h-3.5 flex items-center justify-center rounded-full hover:bg-black/5"
                                     >
                                       ×
                                     </button>
                                   )}
                                 </Badge>
                              ))}
                              {(student?.offerSkills || student?.skills.map(s => s.name) || []).length === 0 && (
                                 <span className="text-[12px] text-[#999] italic">No skills listed</span>
                              )}
                           </div>
                        </div>

                        {isEditingSkills && (
                          <div className="mt-4 pt-3 border-t border-[#E5E5E5]">
                             <div className="flex gap-2">
                                <input 
                                   type="text" 
                                   placeholder="Add skill..." 
                                   value={newOfferSkill}
                                   onChange={(e) => setNewOfferSkill(e.target.value)}
                                   onKeyDown={(e) => {
                                      if (e.key === 'Enter') {
                                         handleAddOfferSkill(newOfferSkill);
                                      }
                                   }}
                                   className="px-2 py-1 text-xs border border-[#E5E5E5] rounded-md outline-none focus:border-[#111] flex-1 bg-white"
                                />
                                <button 
                                   onClick={() => handleAddOfferSkill(newOfferSkill)}
                                   className="px-3 py-1 text-xs bg-[#111] text-white rounded-md font-medium hover:bg-black/90"
                                >
                                   Add
                                </button>
                             </div>
                             <div className="mt-2 flex flex-wrap gap-1 items-center">
                               <span className="text-[10px] text-[#999]">Suggestions:</span>
                               {["Python", "SQL", "Figma", "React", "UI/UX", "System Design", "AWS", "CI/CD"].map(s => {
                                 const currentOffers = student?.offerSkills || student?.skills.map(sk => sk.name) || [];
                                 if (currentOffers.includes(s)) return null;
                                 return (
                                   <button 
                                     key={s} 
                                     onClick={() => handleAddOfferSkill(s)} 
                                     className="text-[10px] px-1.5 py-0.5 bg-white border border-[#E5E5E5] hover:border-[#111] text-gray-600 rounded transition-all"
                                   >
                                     + {s}
                                   </button>
                                 );
                               })}
                             </div>
                          </div>
                        )}
                     </div>

                     <div className="flex-1 bg-[#FAFAFA] rounded-xl p-4 border border-[#E5E5E5] shadow-sm flex flex-col justify-between">
                        <div>
                           <div className="text-xs font-medium text-[#666] uppercase tracking-wider mb-3">Skills I Want</div>
                           <div className="flex flex-wrap gap-2">
                              {(student?.seekSkills || []).map(skill => (
                                 <Badge key={skill} variant="warning" className="flex items-center gap-1.5">
                                   {skill}
                                   {isEditingSkills && (
                                     <button 
                                       onClick={() => handleRemoveSeekSkill(skill)} 
                                       className="hover:text-red-600 font-bold ml-0.5 w-3.5 h-3.5 flex items-center justify-center rounded-full hover:bg-black/5"
                                     >
                                       ×
                                     </button>
                                   )}
                                 </Badge>
                              ))}
                              {(student?.seekSkills || []).length === 0 && (
                                 <span className="text-[12px] text-[#999] italic">No demands listed</span>
                              )}
                           </div>
                        </div>

                        {isEditingSkills && (
                          <div className="mt-4 pt-3 border-t border-[#E5E5E5]">
                             <div className="flex gap-2">
                                <input 
                                   type="text" 
                                   placeholder="Add learning demand..." 
                                   value={newSeekSkill}
                                   onChange={(e) => setNewSeekSkill(e.target.value)}
                                   onKeyDown={(e) => {
                                      if (e.key === 'Enter') {
                                         handleAddSeekSkill(newSeekSkill);
                                      }
                                   }}
                                   className="px-2 py-1 text-xs border border-[#E5E5E5] rounded-md outline-none focus:border-[#111] flex-1 bg-white"
                                />
                                <button 
                                   onClick={() => handleAddSeekSkill(newSeekSkill)}
                                   className="px-3 py-1 text-xs bg-[#111] text-white rounded-md font-medium hover:bg-black/90"
                                >
                                   Add
                                </button>
                             </div>
                             <div className="mt-2 flex flex-wrap gap-1 items-center">
                               <span className="text-[10px] text-[#999]">Suggestions:</span>
                               {["React", "System Design", "AWS", "CI/CD", "Docker", "Data Science", "TypeScript", "Python"].map(s => {
                                 const currentSeeks = student?.seekSkills || [];
                                 if (currentSeeks.includes(s)) return null;
                                 return (
                                   <button 
                                     key={s} 
                                     onClick={() => handleAddSeekSkill(s)} 
                                     className="text-[10px] px-1.5 py-0.5 bg-white border border-[#E5E5E5] hover:border-[#111] text-gray-600 rounded transition-all"
                                   >
                                     + {s}
                                   </button>
                                 );
                               })}
                             </div>
                          </div>
                        )}
                     </div>
                  </div>
               </div>

               <div className="shrink-0 w-full md:w-auto bg-[#F7F6F3] p-5 rounded-xl border border-[#E5E5E5] text-center shadow-sm">
                  <div className="text-[11px] font-medium text-[#666] uppercase tracking-wider mb-1">Career Readiness</div>
                  <div className="font-jetbrains-mono text-[32px] text-[#111111]">{student?.readinessScore}<span className="text-base text-[#999]">/100</span></div>
               </div>
            </div>

           <div className="flex justify-center py-4">
              <button 
                 onClick={handleMatch}
                 disabled={isMatching}
                 className="bg-[#111111] text-white px-8 py-3 rounded-full font-medium shadow-md hover:bg-black/90 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
              >
                 {isMatching ? (
                    <><Loader2 size={18} className="animate-spin" /> <span className="font-jetbrains-mono text-sm">Running Graph Matching...</span></>
                 ) : (
                    <>Find Exchange Partners ✨</>
                 )}
              </button>
           </div>

           {matches.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in slide-in-from-bottom-4">
                 {matches.map(m => (
                    <div key={m.studentId} className="bg-white border border-[#E5E5E5] rounded-[12px] p-5 flex flex-col justify-between hover:border-[#111111] transition-colors group shadow-sm">
                       <div>
                          <div className="flex justify-between items-start mb-4">
                             <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-[#FAFAFA] border border-[#E5E5E5] flex items-center justify-center font-medium font-inter group-hover:bg-[#111111] group-hover:text-white group-hover:border-[#111111] transition-all border-[#E5E5E5]">{m.avatar}</div>
                                <div>
                                   <div className="font-medium text-lg leading-tight">{m.name}</div>
                                   <div className="text-xs text-[#666] mt-0.5">{m.course}</div>
                                </div>
                             </div>
                             <Badge variant="success">{Math.round(m.complementarityScore * 100)}% Match</Badge>
                          </div>

                          <div className="space-y-3 mb-6">
                             <div className="flex gap-2 items-center">
                                <span className="text-[11px] text-[#666] w-14">Offers:</span>
                                <div className="flex gap-1.5 flex-wrap">
                                   {m.offers.map((s:string) => <Badge key={s} variant="info">{s}</Badge>)}
                                </div>
                             </div>
                             <div className="flex gap-2 items-center">
                                <span className="text-[11px] text-[#666] w-14">Wants:</span>
                                <div className="flex gap-1.5 flex-wrap">
                                   {m.wants.map((s:string) => <Badge key={s} variant="warning">{s}</Badge>)}
                                </div>
                             </div>
                             <div className="pt-2 border-t border-dashed text-[11px] text-[#999] flex justify-between">
                               <span>Availability overlap: {Math.round(m.availabilityOverlap * 100)}%</span>
                               <span className="flex items-center gap-1"><Sparkles size={10}/> ML Scored</span>
                             </div>
                          </div>
                       </div>
                       
                       <button onClick={() => handleRequest(m.name)} className="w-full bg-[#FAFAFA] border border-[#E5E5E5] text-[#111111] py-2 rounded-lg text-sm font-medium hover:bg-[#111111] hover:text-white hover:border-[#111111] transition-colors">
                          Request Session →
                       </button>
                    </div>
                 ))}
              </div>
           )}
        </div>
      )}

      {activeTab === 'sessions' && (
        <div className="space-y-8 animate-in fade-in">
           <div>
              <h3 className="font-medium text-lg mb-4">Upcoming Sessions</h3>
              <div className="bg-white border border-[#E5E5E5] rounded-[12px] p-5 shadow-sm">
                 <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4 w-full md:w-auto">
                       <div className="w-12 h-12 rounded-full bg-[#111] text-white flex items-center justify-center font-medium">PS</div>
                       <div>
                          <div className="font-medium text-base">Priya Sharma</div>
                          <div className="text-sm text-[#666]">Skill Exchange: You teach <strong className="text-[#111]">Python</strong>, Priya teaches <strong className="text-[#111]">React</strong></div>
                       </div>
                    </div>
                    <div className="flex items-center gap-3 w-full md:w-auto mt-2 md:mt-0">
                       <div className="text-sm font-jetbrains-mono bg-[#FAFAFA] px-3 py-1.5 rounded border border-[#E5E5E5] flex items-center gap-2">
                          <Calendar size={14} className="text-[#666]"/> Today, 4 PM
                       </div>
                       <button className="bg-[#111111] text-white px-4 py-2 rounded text-sm font-medium hover:bg-black/90 transition-colors flex items-center gap-2 shadow-sm">
                          Join Call <Video size={14}/>
                       </button>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      )}

    </div>
  );
}
