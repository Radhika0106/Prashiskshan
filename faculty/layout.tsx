import { ReactNode } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";

export default function FacultyLayout({ children }: { children: ReactNode }) {
  return <DashboardLayout role="faculty">{children}</DashboardLayout>;
}
