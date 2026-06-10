import { FadeIn } from "./FadeIn";

const stats = [
  { value: "2,400+", label: "Verified Internships" },
  { value: "180+", label: "Partner Colleges" },
  { value: "94%", label: "Placement Rate" },
  { value: "12,000+", label: "Peer Sessions Logged" },
];

export function StatsBar() {
  return (
    <section className="bg-white hairline-t hairline-b">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 md:divide-x divide-gray-200">
          {stats.map((stat, idx) => (
            <FadeIn key={idx} delay={idx * 0.1} className="flex flex-col gap-2 items-center text-center px-4">
              <span className="text-[32px] md:text-[40px] font-mono font-medium text-primary tracking-tight">
                {stat.value}
              </span>
              <span className="text-[14px] md:text-[15px] font-medium text-gray-600">
                {stat.label}
              </span>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
