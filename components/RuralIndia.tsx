import { FadeIn } from "./FadeIn";
import { MapPin } from "lucide-react";

export function RuralIndia() {
  return (
    <section className="py-24 bg-white" id="accessibility">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          <FadeIn className="flex flex-col gap-6">
            <h2 className="text-[28px] md:text-[36px] font-medium text-gray-900 tracking-tight">
              Built for Bharat,<br/>not just metros.
            </h2>
            <p className="text-[16px] md:text-[18px] leading-[1.7] text-gray-600">
              Offline-capable PWA. District-level industry mapping. Works on low-bandwidth connections. Available in regional languages.
            </p>
          </FadeIn>

          <FadeIn delay={0.2} className="relative flex justify-center h-full min-h-[300px]">
            {/* SVG Outline Map placeholder for illustrative purposes */}
            <div className="relative w-[300px] h-[350px] opacity-20">
              <svg viewBox="0 0 400 450" fill="none" className="w-full h-full text-gray-900 stroke-current text-[#1A1A1A]" strokeWidth="2" strokeLinejoin="round">
                <path d="M120 50 L140 20 L220 10 L250 40 L280 40 L300 80 L350 120 L380 180 L350 250 L280 320 L240 380 L200 440 L160 400 L140 320 L100 280 L50 200 L20 160 L40 100 L80 80 Z" strokeDasharray="4 4" />
              </svg>

              {/* Teal Dots */}
              <div className="absolute top-[80px] left-[140px] animate-pulse">
                <div className="relative w-4 h-4 text-teal drop-shadow-[0_0_8px_rgba(29,158,117,0.5)]"><MapPin size={16} fill="currentColor" /></div>
              </div>
              <div className="absolute top-[160px] left-[260px] animate-pulse" style={{ animationDelay: '0.5s' }}>
                <div className="relative w-4 h-4 text-teal drop-shadow-[0_0_8px_rgba(29,158,117,0.5)]"><MapPin size={16} fill="currentColor" /></div>
              </div>
              <div className="absolute top-[240px] left-[180px] animate-pulse" style={{ animationDelay: '1s' }}>
                <div className="relative w-4 h-4 text-teal drop-shadow-[0_0_8px_rgba(29,158,117,0.5)]"><MapPin size={16} fill="currentColor" /></div>
              </div>
              <div className="absolute top-[320px] left-[200px] animate-pulse" style={{ animationDelay: '1.5s' }}>
                <div className="relative w-4 h-4 text-teal drop-shadow-[0_0_8px_rgba(29,158,117,0.5)]"><MapPin size={16} fill="currentColor" /></div>
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10" />
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
}
