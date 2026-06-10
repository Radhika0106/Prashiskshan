"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { 
  Mic, Keyboard, Send, Clock, X, Circle,
  CheckCircle2, AlertTriangle, ChevronDown, ChevronUp, PauseCircle, PhoneOff
} from "lucide-react";

type Message = {
  id: string;
  sender: 'ai' | 'student';
  text: string;
  timestamp: string;
  isVoice?: boolean;
};

// Mock Questions Flow
const MOCK_FLOW = [
  "Let me start with a warm welcome! I'm Alex, and we're going to work through some technical questions today. Ready to get started?",
  "Great! Let's start with an easy one to get you warmed up. Can you walk me through what a REST API is and give me a real-world example?",
  "Great foundation! I liked how you explained the architectural style. Let me dig deeper: How would you handle error handling in a REST API when a resource isn't found?",
  "That's a solid approach. Now let's move to a system design scenario. Imagine we're building a URL shortener like bit.ly. What are the key components you'd need?",
  "Interesting architecture. How would you handle the database scaling if this service suddenly goes viral and gets 10,000 requests per second?",
  "Thanks for walking me through that. We're almost out of time. Do you have any questions for me about the role or the engineering team?"
];

function LiveInterviewContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get('type') || 'Technical';
  
  // Chat State
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMode, setInputMode] = useState<'voice' | 'text'>('voice');
  const [inputText, setInputText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock Progression
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);

  // Timer State (Mocking 45 mins)
  const [timeLeft, setTimeLeft] = useState(45 * 60);

  // Metrics State
  const [overallScore, setOverallScore] = useState(78);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [currentFeedback, setCurrentFeedback] = useState<'Excellent' | 'Good' | 'Fair' | 'Needs Improvement'>('Good');
  const [metricsExpanded, setMetricsExpanded] = useState(true);

  // Initial AI Message
  useEffect(() => {
    if (messages.length === 0) {
      setTimeout(() => {
        setMessages([{
          id: 'ai-1',
          sender: 'ai',
          text: MOCK_FLOW[0],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
      }, 1000);
    }
  }, [messages.length]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isAnalyzing]);

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(prev => prev > 0 ? prev - 1 : 0), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const handleSendMessage = () => {
    if (!inputText.trim() && inputMode === 'text') return;
    
    // Add student message
    const newMsg: Message = {
      id: Date.now().toString(),
      sender: 'student',
      text: inputMode === 'text' ? inputText : "REST stands for Representational State Transfer. It's an architectural style for designing networked applications. In REST, resources are identified by URLs...", // Mock transcription
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isVoice: inputMode === 'voice'
    };
    
    setMessages(prev => [...prev, newMsg]);
    setInputText("");
    setIsRecording(false);
    
    // Update metrics
    setQuestionsAnswered(prev => prev + 1);
    
    // Simulate AI thinking and replying
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      const nextIdx = currentQuestionIdx + 1;
      
      // Update score slightly based on progression
      setOverallScore(prev => Math.min(100, prev + Math.floor(Math.random() * 5)));
      setCurrentFeedback(Math.random() > 0.5 ? 'Excellent' : 'Good');
      
      if (nextIdx < MOCK_FLOW.length) {
        setMessages(prev => [...prev, {
          id: Date.now().toString() + '-ai',
          sender: 'ai',
          text: MOCK_FLOW[nextIdx],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
        setCurrentQuestionIdx(nextIdx);
      } else {
        setMessages(prev => [...prev, {
          id: Date.now().toString() + '-ai',
          sender: 'ai',
          text: "Thank you for your time today. That concludes our mock interview. You can end the session now to review your detailed feedback report.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
      }
    }, 2500);
  };

  const handleEndInterview = () => {
    router.push('/student/interviews');
  };

  return (
    <div className="h-[calc(100vh-64px)] flex overflow-hidden">
      {/* Left Panel - Interview View (55%) */}
      <div className="w-[55%] flex flex-col border-r border-[#E5E5E5] bg-white relative">
        
        {/* Header */}
        <div className="h-16 px-6 border-b border-[#E5E5E5] flex items-center justify-between shrink-0 bg-[#F7F6F3]">
          <div>
            <h2 className="font-instrument text-[20px] text-[#111111] capitalize">{type} Interview</h2>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="flex items-center gap-1.5 text-xs font-medium text-[#DC2626]">
                <span className="w-2 h-2 rounded-full bg-[#DC2626] animate-pulse"></span>
                Recording
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className={`font-mono text-lg flex items-center gap-1.5 ${timeLeft < 300 ? 'text-[#DC2626]' : 'text-[#111]'}`}>
              <Clock size={16} />
              {formatTime(timeLeft)}
            </div>
            <button 
              onClick={handleEndInterview}
              className="text-[#DC2626] p-2 hover:bg-[#FEF2F2] rounded-lg transition-colors flex items-center gap-2 text-sm font-medium"
            >
              <PhoneOff size={16} />
              End
            </button>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 scroll-smooth bg-white">
          <div className="max-w-xl mx-auto space-y-6">
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.sender === 'student' ? 'justify-end' : 'justify-start'}`}>
                {msg.sender === 'ai' && (
                  <div className="w-8 h-8 rounded-full bg-[#E5E5E5] overflow-hidden shrink-0 mr-3 mt-1 flex items-center justify-center">
                    <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="AI Avatar" className="w-full h-full object-cover" />
                  </div>
                )}
                
                <div className={`max-w-[85%] ${msg.sender === 'student' ? 'items-end' : 'items-start'} flex flex-col`}>
                  {msg.sender === 'ai' && (
                    <div className="flex items-center gap-2 mb-1 pl-1">
                      <span className="text-sm font-medium text-[#111]">Alex Chen</span>
                      <span className="text-xs text-[#666]">AI Interviewer</span>
                      <span className="text-[10px] text-[#999] font-mono ml-1">{msg.timestamp}</span>
                    </div>
                  )}
                  
                  <div className={`
                    px-4 py-3 rounded-2xl text-[15px] leading-relaxed
                    ${msg.sender === 'student' 
                      ? 'bg-[#111] text-white rounded-tr-sm' 
                      : 'bg-[#F3F4F6] text-[#111] border border-[#E5E5E5] rounded-tl-sm'}
                  `}>
                    {msg.text}
                  </div>
                  
                  {msg.sender === 'student' && (
                    <div className="flex items-center gap-2 mt-1 pr-1">
                      {msg.isVoice && <span className="text-[10px] bg-[#E5E5E5] text-[#666] px-1.5 py-0.5 rounded flex items-center gap-1"><Mic size={10} /> Spoken</span>}
                      <span className="text-[10px] text-[#999] font-mono">{msg.timestamp}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isAnalyzing && (
              <div className="flex justify-start">
                <div className="w-8 h-8 rounded-full bg-[#E5E5E5] overflow-hidden shrink-0 mr-3 flex items-center justify-center">
                  <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="AI Avatar" className="w-full h-full object-cover" />
                </div>
                <div className="bg-[#F3F4F6] border border-[#E5E5E5] px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-2 h-[46px]">
                  <span className="w-1.5 h-1.5 bg-[#999] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-1.5 h-1.5 bg-[#999] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-1.5 h-1.5 bg-[#999] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  <span className="text-xs text-[#666] ml-2">Analyzing response...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-[#E5E5E5] bg-[#F7F6F3]">
          <div className="max-w-xl mx-auto">
            {/* Input Toggle */}
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="bg-white border border-[#E5E5E5] rounded-full p-1 flex">
                <button 
                  onClick={() => setInputMode('voice')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${inputMode === 'voice' ? 'bg-[#111] text-white' : 'text-[#666] hover:text-[#111]'}`}
                >
                  <Mic size={14} /> Voice Mode
                </button>
                <button 
                  onClick={() => setInputMode('text')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${inputMode === 'text' ? 'bg-[#111] text-white' : 'text-[#666] hover:text-[#111]'}`}
                >
                  <Keyboard size={14} /> Text Mode
                </button>
              </div>
            </div>

            {/* Input Controls */}
            {inputMode === 'voice' ? (
              <div className="flex flex-col items-center justify-center py-4 bg-white border border-[#E5E5E5] rounded-xl h-[120px]">
                {isRecording ? (
                  <div className="flex flex-col items-center w-full px-8">
                    <div className="w-full flex justify-between items-center mb-4">
                      <span className="text-xs text-[#DC2626] font-medium animate-pulse">Listening...</span>
                      <span className="text-xs text-[#999] font-mono">00:04 / 02:00</span>
                    </div>
                    <div className="flex items-center justify-between w-full gap-4">
                      <button onClick={() => setIsRecording(false)} className="text-[#666] hover:text-[#111] transition-colors">
                        <X size={20} />
                      </button>
                      
                      {/* Audio visualizer mock */}
                      <div className="flex-1 flex items-center justify-center gap-1 h-8">
                        {Array.from({ length: 24 }).map((_, i) => (
                          <div 
                            key={i} 
                            className="w-1 bg-[#111] rounded-full animate-pulse"
                            style={{ 
                              height: `${Math.random() * 100}%`,
                              animationDuration: `${0.5 + Math.random()}s`,
                            }}
                          ></div>
                        ))}
                      </div>

                      <button onClick={handleSendMessage} className="bg-[#111] text-white p-2 rounded-full hover:bg-[#333] transition-colors">
                        <Send size={16} className="ml-0.5" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <button 
                    onClick={() => setIsRecording(true)}
                    className="group flex flex-col items-center"
                    disabled={isAnalyzing}
                  >
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${isAnalyzing ? 'bg-[#E5E5E5] text-[#999]' : 'bg-[#111] text-white group-hover:scale-105 group-hover:bg-[#333]'}`}>
                      <Mic size={24} />
                    </div>
                    <span className="text-xs text-[#666] mt-3 font-medium">Click to Speak Answer</span>
                  </button>
                )}
              </div>
            ) : (
              <div className="relative">
                <textarea 
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Type your answer here..."
                  className="w-full bg-white border border-[#E5E5E5] rounded-xl px-4 py-3 text-[15px] text-[#111] outline-none focus:border-[#111] transition-colors min-h-[120px] resize-none pb-12"
                  disabled={isAnalyzing}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <div className="absolute bottom-3 left-4 right-3 flex items-center justify-between">
                  <span className="text-xs font-mono text-[#999]">{inputText.length} / 1000</span>
                  <button 
                    onClick={handleSendMessage}
                    disabled={!inputText.trim() || isAnalyzing}
                    className="bg-[#111] text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-[#333] transition-colors disabled:opacity-50 flex items-center gap-2"
                  >
                    Send <Send size={14} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Panel - Real-time Metrics (45%) */}
      <div className="w-[45%] bg-[#F7F6F3] overflow-y-auto flex flex-col">
        <div className="p-6">
          <h3 className="font-instrument text-2xl mb-6">Live Insights</h3>
          
          {/* Top Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* Overall Score */}
            <div className="bg-white p-4 rounded-xl border border-[#E5E5E5] flex flex-col justify-between">
              <span className="text-xs text-[#666] font-medium mb-2">Overall Score</span>
              <div className="flex items-end gap-2">
                <span className="font-mono text-4xl text-[#111]">{overallScore}</span>
                <span className="text-sm text-[#999] mb-1">/ 100</span>
              </div>
              <div className="w-full h-1.5 bg-[#F3F4F6] rounded-full mt-3 overflow-hidden">
                <div 
                  className={`h-full rounded-full ${overallScore > 75 ? 'bg-[#059669]' : overallScore > 60 ? 'bg-[#D97706]' : 'bg-[#DC2626]'}`}
                  style={{ width: `${overallScore}%`, transition: 'width 1s ease-in-out' }}
                ></div>
              </div>
            </div>

            {/* Real-time Feedback */}
            <div className="bg-white p-4 rounded-xl border border-[#E5E5E5] flex flex-col justify-between">
              <span className="text-xs text-[#666] font-medium mb-2">Current Feedback</span>
              <div className="flex items-center gap-2 h-10">
                {currentFeedback === 'Excellent' && <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#ECFDF5] text-[#059669] rounded-full text-sm font-medium border border-[#A7F3D0]"><CheckCircle2 size={16} /> Excellent</span>}
                {currentFeedback === 'Good' && <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#EFF6FF] text-[#2563EB] rounded-full text-sm font-medium border border-[#BFDBFE]"><CheckCircle2 size={16} /> Good</span>}
                {currentFeedback === 'Fair' && <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FFFBEB] text-[#D97706] rounded-full text-sm font-medium border border-[#FDE68A]"><Circle size={16} /> Fair</span>}
                {currentFeedback === 'Needs Improvement' && <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FEF2F2] text-[#DC2626] rounded-full text-sm font-medium border border-[#FECACA]"><AlertTriangle size={16} /> Needs Work</span>}
              </div>
              <span className="text-xs text-[#999] mt-3">Updates after each answer</span>
            </div>

            {/* Progress */}
            <div className="bg-white p-4 rounded-xl border border-[#E5E5E5] flex flex-col justify-between col-span-2">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-[#666] font-medium">Questions Answered</span>
                <span className="font-mono text-sm text-[#111]">{questionsAnswered} <span className="text-[#999]">/ 5</span></span>
              </div>
              <div className="w-full h-2 bg-[#F3F4F6] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#111] rounded-full transition-all duration-500"
                  style={{ width: `${(questionsAnswered / 5) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Detailed Metrics */}
          <div className="bg-white border border-[#E5E5E5] rounded-xl overflow-hidden">
            <button 
              onClick={() => setMetricsExpanded(!metricsExpanded)}
              className="w-full px-5 py-4 flex items-center justify-between bg-[#F7F6F3] border-b border-[#E5E5E5] hover:bg-[#F3F4F6] transition-colors"
            >
              <h4 className="font-medium text-[#111]">Detailed Metrics</h4>
              {metricsExpanded ? <ChevronUp size={18} className="text-[#666]" /> : <ChevronDown size={18} className="text-[#666]" />}
            </button>

            {metricsExpanded && (
              <div className="p-5 space-y-6">
                
                {/* Communication Scoring */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h5 className="text-sm font-medium text-[#111]">Communication</h5>
                    <span className="text-xs font-mono text-[#059669] bg-[#ECFDF5] px-2 py-0.5 rounded border border-[#A7F3D0]">4.0/5</span>
                  </div>
                  <div className="space-y-3">
                    {[
                      { label: 'Clarity', score: 4, note: 'Speaking clearly, good pace' },
                      { label: 'Confidence', score: 3, note: 'Some hesitation in explanations' },
                      { label: 'Structure', score: 5, note: 'Well-organized answer' },
                      { label: 'Conciseness', score: 3, note: 'Could be more brief' },
                    ].map(item => (
                      <div key={item.label} className="grid grid-cols-12 gap-2 items-center">
                        <span className="col-span-4 text-xs text-[#666]">{item.label}</span>
                        <div className="col-span-3 flex gap-0.5">
                          {[1,2,3,4,5].map(dot => (
                            <div key={dot} className={`w-2 h-2 rounded-full ${dot <= item.score ? 'bg-[#111]' : 'bg-[#E5E5E5]'}`}></div>
                          ))}
                        </div>
                        <span className="col-span-5 text-[10px] text-[#999] truncate">{item.note}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="h-px bg-[#E5E5E5] w-full"></div>

                {/* Technical Scoring */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h5 className="text-sm font-medium text-[#111]">Technical Depth</h5>
                    <span className="text-xs font-mono text-[#059669] bg-[#ECFDF5] px-2 py-0.5 rounded border border-[#A7F3D0]">4.0/5</span>
                  </div>
                  <div className="space-y-3">
                    {[
                      { label: 'Accuracy', score: 4, note: 'Good understanding, missed edge case' },
                      { label: 'Problem-solving', score: 5, note: 'Systematic thinking shown' },
                      { label: 'Code Quality', score: 4, note: 'Implementation correct' },
                      { label: 'Knowledge', score: 3, note: 'Advanced concepts unclear' },
                    ].map(item => (
                      <div key={item.label} className="grid grid-cols-12 gap-2 items-center">
                        <span className="col-span-4 text-xs text-[#666]">{item.label}</span>
                        <div className="col-span-3 flex gap-0.5">
                          {[1,2,3,4,5].map(dot => (
                            <div key={dot} className={`w-2 h-2 rounded-full ${dot <= item.score ? 'bg-[#111]' : 'bg-[#E5E5E5]'}`}></div>
                          ))}
                        </div>
                        <span className="col-span-5 text-[10px] text-[#999] truncate">{item.note}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="h-px bg-[#E5E5E5] w-full"></div>

                {/* Overall Competency */}
                <div>
                  <h5 className="text-sm font-medium text-[#111] mb-3">Overall Competency</h5>
                  <div className="space-y-3">
                    {[
                      { label: 'Technical Skills', score: 80 },
                      { label: 'Communication', score: 80 },
                      { label: 'Problem-solving', score: 90 },
                      { label: 'Leadership', score: 60 },
                      { label: 'Adaptability', score: 70 },
                    ].map(item => (
                      <div key={item.label} className="flex flex-col gap-1">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-[#666]">{item.label}</span>
                          <span className="text-[10px] font-mono text-[#999]">{item.score}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-[#F3F4F6] rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-[#111] rounded-full"
                            style={{ width: `${item.score}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}
          </div>

        </div>
      </div>

    </div>
  );
}

export default function LiveInterviewPage() {
  return (
    <Suspense fallback={<div className="h-[calc(100vh-64px)] flex items-center justify-center bg-white"><span className="text-sm text-[#666]">Loading interview...</span></div>}>
      <LiveInterviewContent />
    </Suspense>
  );
}
