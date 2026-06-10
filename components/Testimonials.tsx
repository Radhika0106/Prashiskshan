import { FadeIn } from "./FadeIn";

const testimonials = [
  {
    quote: "I used to worry that my college didn't have big companies visiting. The platform built my python skills step-by-step and automatically matched me with an internship in Bangalore.",
    name: "Sneha Reddy",
    role: "Computer Science Student",
    institution: "JNTU Hyderabad",
    initials: "SR"
  },
  {
    quote: "Tracking 400+ student internships used to be an administrative nightmare. Now everything from AI matching to NEP credit evaluation happens on a single dashboard.",
    name: "Dr. Arvind Mehta",
    role: "Placement Director",
    institution: "BIT Mesra",
    initials: "AM"
  },
  {
    quote: "We spent months training interns before they could write code. Hiring pre-screened candidates who've already traded skills with peers gives us productive resources on day one.",
    name: "Priya Varma",
    role: "Engineering Manager",
    institution: "TechCorp India",
    initials: "PV"
  }
];

export function Testimonials() {
  return (
    <section className="bg-offwhite py-24 hairline-t">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <FadeIn key={idx} delay={idx * 0.1}>
              <div className="bg-white p-8 border border-gray-200 rounded-[12px] h-full flex flex-col justify-between hover:border-gray-400 transition-colors">
                <p className="text-[15px] leading-[1.7] text-gray-700 italic mb-8">
                  "{item.quote}"
                </p>
                
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-medium text-sm">
                    {item.initials}
                  </div>
                  <div>
                    <h4 className="text-[14px] font-medium text-gray-900">{item.name}</h4>
                    <p className="text-[13px] text-gray-500">{item.role}, {item.institution}</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
