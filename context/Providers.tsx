"use client";

import { ReactNode } from "react";
import { MockDataProvider } from "./MockDataContext";
import { CollegeDataProvider } from "./CollegeDataContext";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <MockDataProvider>
      <CollegeDataProvider>
        {children}
      </CollegeDataProvider>
    </MockDataProvider>
  );
}
