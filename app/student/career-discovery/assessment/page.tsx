"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Brain, Lightbulb, Users, Briefcase, Sparkles, Database, Shield, Cloud, Smartphone, Settings, Cpu } from "lucide-react";
import { ASSESSMENT_QUESTIONS } from "@/lib/engines/assessment-questions";
import { useMockData } from "@/context/MockDataContext";

// Mapping option values to icons for Q1-Q7
const CHOICE_ICONS: Record<number, any> = {
  1: Brain,
  2: Database,
  3: Lightbulb,
  4: Shield,
  5: Cloud,
  6: Smartphone,
  7: Settings,
  8: Cpu,
};

export default function AssessmentFlow() {
  const router = useRouter();
  const { currentUserId, updateStudent } = useMockData();
  const [currentStep, setCurrentStep] = useState(0);
  
  // Initialize answers with 25 empty values or defaults (e.g. 3 for sliders, null for choice)
  const [answers, setAnswers] = useState<Record<number, number>>(() => {
    const initial: Record<number, number> = {};
    ASSESSMENT_QUESTIONS.forEach(q => {
      initial[q.id] = q.type === 'slider' ? 3 : 0;
    });
    return initial;
  });

  const question = ASSESSMENT_QUESTIONS[currentStep];
  const progress = ((currentStep + 1) / ASSESSMENT_QUESTIONS.length) * 100;

  const handleChoiceSelect = (value: number) => {
    setAnswers(prev => ({ ...prev, [question.id]: value }));
  };

  const handleSliderChange = (value: number) => {
    setAnswers(prev => ({ ...prev, [question.id]: value }));
  };

  const handleNext = () => {
    if (currentStep < ASSESSMENT_QUESTIONS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Complete! Convert answers map to a 25-element array (1-indexed id -> 0-indexed array)
      const responseVector: number[] = [];
      for (let i = 1; i <= 25; i++) {
        responseVector.push(answers[i] || 3); // Fallback to 3 if somehow undefined
      }

      // Save to context student profile
      updateStudent(currentUserId, {
        assessmentResponses: responseVector,
      });

      // Redirect to processing animation page
      router.push('/student/career-discovery/processing');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    } else {
      router.push('/student/career-discovery');
    }
  };

  const isCurrentAnswered = () => {
    const ans = answers[question.id];
    if (question.type === 'single_choice') {
      return ans !== 0;
    }
    return true; // Sliders are pre-filled with 3
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#F7F6F3] flex flex-col items-center">
      {/* Top Header */}
      <div className="w-full bg-white border-b border-[#E5E5E5] px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="font-jetbrains-mono text-[13px] text-[#666]">
          Question {currentStep + 1} of {ASSESSMENT_QUESTIONS.length}
        </div>
        <div className="text-[13px] font-medium text-[#111111] bg-[#F7F6F3] px-3 py-1 rounded-full uppercase tracking-wider">
          {question.dimension.replace('_', ' ')}
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="w-full h-[3px] bg-[#E5E5E5]">
        <div 
          className="h-full bg-[#111111] transition-all duration-300 ease-out" 
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 w-full max-w-3xl px-4 py-12 flex flex-col justify-between">
        <div className="flex-1 flex flex-col justify-center">
          
          {/* Question Header */}
          <div className="flex flex-col items-center text-center mb-10">
            <div className="w-8 h-8 rounded-full bg-white border border-[#E5E5E5] flex items-center justify-center font-jetbrains-mono text-[12px] font-medium text-[#111] mb-6 shadow-sm">
              {question.id}
            </div>
            <h2 className="font-instrument text-[32px] md:text-[38px] leading-tight max-w-[680px]">
              {question.text}
            </h2>
          </div>

          {/* Options Container */}
          <div className="w-full max-w-2xl mx-auto">
            
            {/* TYPE 1: SINGLE CHOICE */}
            {question.type === 'single_choice' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {question.options?.map((opt) => {
                  const isSelected = answers[question.id] === opt.value;
                  const IconComponent = CHOICE_ICONS[opt.value] || Brain;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleChoiceSelect(opt.value)}
                      className={`
                        text-left p-5 rounded-xl border-2 transition-all duration-200 flex flex-col justify-between h-full
                        ${isSelected 
                          ? 'border-[#111111] bg-[#FAFAFA] shadow-sm' 
                          : 'border-[#E5E5E5] bg-white hover:border-[#CCCCCC]'
                        }
                      `}
                    >
                      <div className="flex justify-between items-start mb-3 w-full">
                        <div className={`p-2 rounded-lg ${isSelected ? 'bg-[#111111] text-white' : 'bg-[#F7F6F3] text-[#666]'}`}>
                          <IconComponent size={20} />
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                          ${isSelected ? 'border-[#111111]' : 'border-[#CCCCCC]'}
                        `}>
                          {isSelected && <div className="w-2.5 h-2.5 bg-[#111111] rounded-full" />}
                        </div>
                      </div>
                      <div>
                        <div className="font-inter font-medium text-[15px] text-[#111111] mb-1">{opt.label}</div>
                        {opt.desc && <div className="font-inter text-[12px] text-[#666666] leading-normal">{opt.desc}</div>}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* TYPE 2: SLIDER */}
            {question.type === 'slider' && (
              <div className="bg-white p-8 rounded-xl border border-[#E5E5E5] shadow-sm">
                <div className="flex justify-center mb-8">
                  <div className="font-jetbrains-mono text-[24px] font-medium w-16 h-16 rounded-full bg-[#F7F6F3] flex items-center justify-center border border-[#E5E5E5]">
                    {answers[question.id]}
                  </div>
                </div>
                
                <input 
                  type="range" 
                  min={question.min || 1} 
                  max={question.max || 5} 
                  value={answers[question.id]}
                  onChange={(e) => handleSliderChange(parseInt(e.target.value, 10))}
                  className="w-full accent-[#111111] h-2 bg-[#E5E5E5] rounded-lg appearance-none cursor-pointer"
                />
                
                <div className="flex justify-between mt-4">
                  <span className="text-[13px] text-[#666] font-medium">{question.minLabel}</span>
                  <span className="text-[13px] text-[#666] font-medium">{question.maxLabel}</span>
                </div>
              </div>
            )}
            
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="mt-16 pt-8 border-t border-[#E5E5E5] flex items-center justify-between">
          <button 
            onClick={handleBack}
            className="px-6 py-3 rounded-lg text-[#111] font-medium hover:bg-[#E5E5E5] transition-colors flex items-center"
          >
            <ArrowLeft size={18} className="mr-2" /> Back
          </button>
          
          <button 
            onClick={handleNext}
            disabled={!isCurrentAnswered()}
            className="px-8 py-3 rounded-lg bg-[#111111] text-white font-medium hover:bg-black/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center shadow-sm"
          >
            {currentStep === ASSESSMENT_QUESTIONS.length - 1 ? 'Finish' : 'Next'} <ArrowRight size={18} className="ml-2" />
          </button>
        </div>

      </div>
    </div>
  );
}
