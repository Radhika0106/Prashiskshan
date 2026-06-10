import { FadeIn } from "./FadeIn";

export function CTAFooterStrip() {
  return (
    <section className="bg-[#1A1A1A] py-24 px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <FadeIn className="flex flex-col items-center gap-8">
          <h2 className="text-[36px] md:text-[48px] font-medium text-white tracking-tight">
            Ready to bridge the gap?
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
            <button className="px-8 py-3.5 bg-primary text-white text-sm font-medium rounded-[8px] hover:bg-primary-hover transition-colors">
              I'm a Student
            </button>
            <button className="px-8 py-3.5 bg-transparent border border-gray-600 text-white text-sm font-medium rounded-[8px] hover:bg-white/10 transition-colors">
              I represent an Institution
            </button>
          </div>

          <p className="text-[14px] text-gray-400 mt-2">
            No credit card. No setup fees. Start free.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
