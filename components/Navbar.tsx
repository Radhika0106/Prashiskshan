"use client";

import { useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

return (
    <nav className="sticky top-0 z-50 bg-white border-b border-[#E5E5E5]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Left: Logo & Wordmark */}
        <Link href="/" className="flex items-center gap-2 group">
          <Image
            src="/logo.jpeg"
            alt="Prashikshan Logo"
            width={48}
            height={48}
            className="rounded-sm object-contain"
            priority
          />
          <span className="text-xl font-instrumentSerif text-[#111111] tracking-tight group-hover:text-[#111111] transition-colors">
            Prashikshan
          </span>
        </Link>

        {/* Center: Nav links (desktop) */}
        <div className="hidden md:flex gap-8 font-inter text-[#111111] text-[14px]">
          <Link href="#students" className="hover:text-[#111111]">Students</Link>
          <Link href="#colleges" className="hover:text-[#111111]">Colleges</Link>
          <Link href="#industry" className="hover:text-[#111111]">Industry</Link>
          <Link href="#about" className="hover:text-[#111111]">About</Link>
        </div>

        {/* Right: CTA buttons (desktop) */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/sign-in" className="text-[14px] font-inter text-[#111111] hover:underline">
            Sign In
          </Link>
          <Link
            href="/get-started"
            className="bg-[#111111] text-white text-[14px] font-inter font-medium py-2 px-5 rounded-[8px] hover:bg-[#333333] transition-colors"
          >
            Get Started →
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button className="md:hidden text-[#111111]" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
        </button>
      </div>

      {/* Mobile navigation */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white border-t border-[#E5E5E5] flex flex-col items-start p-6 gap-4 font-inter text-[14px] text-[#111111]">
          <Link href="#students" onClick={() => setIsOpen(false)}>
            Students
          </Link>
          <Link href="#colleges" onClick={() => setIsOpen(false)}>
            Colleges
          </Link>
          <Link href="#industry" onClick={() => setIsOpen(false)}>
            Industry
          </Link>
          <Link href="#about" onClick={() => setIsOpen(false)}>
            About
          </Link>
          <div className="flex flex-col w-full gap-3 mt-4 pt-4 border-t border-[#E5E5E5]">
            <Link href="/sign-in" className="w-full py-3 text-center border border-[#E5E5E5] rounded-[8px]" onClick={() => setIsOpen(false)}>
              Sign In
            </Link>
            <Link href="/get-started" className="w-full py-3 text-center bg-[#111111] text-white rounded-[8px]" onClick={() => setIsOpen(false)}>
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
