import { ReactNode } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";

export default function IndustryLayout({ children }: { children: ReactNode }) {
  return <DashboardLayout role="industry">{children}</DashboardLayout>;
}
