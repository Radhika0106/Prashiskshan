import Link from "next/link";

const TwitterIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const LinkedinIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export function Footer() {
  return (
    <footer className="bg-white hairline-t">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-16">
          
          <div className="flex flex-col gap-4">
            <h4 className="text-[13px] uppercase tracking-wider font-medium text-gray-900 mb-2">Product</h4>
            <Link href="#" className="text-[14px] text-gray-500 hover:text-primary transition-colors">Student Internships</Link>
            <Link href="#" className="text-[14px] text-gray-500 hover:text-primary transition-colors">Peer Skill Exchange</Link>
            <Link href="#" className="text-[14px] text-gray-500 hover:text-primary transition-colors">Career Readiness Score</Link>
            <Link href="#" className="text-[14px] text-gray-500 hover:text-primary transition-colors">Digital Logbook</Link>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-[13px] uppercase tracking-wider font-medium text-gray-900 mb-2">For Institutions</h4>
            <Link href="#" className="text-[14px] text-gray-500 hover:text-primary transition-colors">College Partnerships</Link>
            <Link href="#" className="text-[14px] text-gray-500 hover:text-primary transition-colors">Industry Dashboard</Link>
            <Link href="#" className="text-[14px] text-gray-500 hover:text-primary transition-colors">NEP Integration</Link>
            <Link href="#" className="text-[14px] text-gray-500 hover:text-primary transition-colors">Faculty Portal</Link>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-[13px] uppercase tracking-wider font-medium text-gray-900 mb-2">Resources</h4>
            <Link href="#" className="text-[14px] text-gray-500 hover:text-primary transition-colors">Help Center</Link>
            <Link href="#" className="text-[14px] text-gray-500 hover:text-primary transition-colors">Case Studies</Link>
            <Link href="#" className="text-[14px] text-gray-500 hover:text-primary transition-colors">Blog</Link>
            <Link href="#" className="text-[14px] text-gray-500 hover:text-primary transition-colors">Documentation</Link>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-[13px] uppercase tracking-wider font-medium text-gray-900 mb-2">Legal</h4>
            <Link href="#" className="text-[14px] text-gray-500 hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-[14px] text-gray-500 hover:text-primary transition-colors">Terms of Service</Link>
            <Link href="#" className="text-[14px] text-gray-500 hover:text-primary transition-colors">Cookie Policy</Link>
          </div>

        </div>

        <div className="pt-8 hairline-t flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[13px] text-gray-500">
            © 2025 Prashikshan · Made in India.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-gray-400 hover:text-gray-900 transition-colors">
              <LinkedinIcon size={18} />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-gray-900 transition-colors">
              <TwitterIcon size={18} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
