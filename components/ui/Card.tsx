import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Card({ children, className }: { children: ReactNode, className?: string }) {
  return (
    <div className={cn("bg-white border border-[#E5E5E5] rounded-[12px] p-6 shadow-sm", className)}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className }: { children: ReactNode, className?: string }) {
  return (
    <h3 className={cn("font-instrument text-2xl mb-4", className)}>
      {children}
    </h3>
  );
}
