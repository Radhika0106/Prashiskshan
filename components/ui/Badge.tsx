import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'neutral';

export function Badge({ children, variant = 'neutral', className }: { children: ReactNode, variant?: BadgeVariant, className?: string }) {
  const baseStyles = "inline-flex items-center px-2 py-0.5 rounded font-jetbrains-mono text-[11px] font-medium";
  
  const variants = {
    success: "bg-[#F0FDF4] text-[#16A34A] border border-[#DCFCE7]",
    warning: "bg-[#FFFBEB] text-[#D97706] border border-[#FEF3C7]",
    danger: "bg-[#FEF2F2] text-[#DC2626] border border-[#FEE2E2]",
    info: "bg-[#EFF6FF] text-[#2563EB] border border-[#DBEAFE]",
    neutral: "bg-[#F3F4F6] text-[#6B7280] border border-[#E5E7EB]",
  };

  return (
    <span className={cn(baseStyles, variants[variant], className)}>
      {children}
    </span>
  );
}
