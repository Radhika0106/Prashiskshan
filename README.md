Prashikshan - EdTech Platform MVP
Next.js React TypeScript TailwindCSS Zustand

Prashikshan is a comprehensive, multi-role internship and career development platform connecting students, colleges, and industry partners. It provides a full suite of AI-powered features for career discovery, interview preparation, and internship reporting, adhering to a modern, minimalist, typography-focused design system.

🌟 Key Features
The platform is divided into three distinct, interconnected portals:

🎓 Student Portal
AI Career Discovery & Roadmaps: Interactive career path builder and discovery tool utilizing React Flow visualizations to help students navigate their professional journey.
AI Interview Simulator: A state-of-the-art mock interview environment featuring:
Role-based interview selection.
Pre-interview system checks.
Live split-screen interface with real-time text/voice capabilities.
Multi-dimensional performance scoring and adaptive AI feedback.
Internship Discovery & Tracking: Explore and apply for internships seamlessly, with a clear application pipeline.
Skill Hub & Peer Exchange: Interactive environments for collaborative learning and skill advancement.
🏛️ College Administration Dashboard
Multi-Role Authentication & Onboarding: Robust auth flow (Student, College, Industry) with OTP verification and document uploads.
Student-Intern Monitoring: Comprehensive tracking of active interns and their performance.
AI Internship Reporting: Mock AI engine for generating professional, NEP-compliant PDF internship reports.
Analytics & Insights: Deep analytics into student placement metrics and college performance.
🏢 Industry Partner Dashboard
12-Module Comprehensive Dashboard: Managing the full lifecycle of an intern.
Internship Posting & Pipeline Management: Streamlined tools to post openings and track applicants through multiple stages.
Active Interns & Evaluations: Monitor current interns and submit structured performance evaluations.
College Network: Manage relationships with partner institutions.
Analytics: Detailed reporting on recruitment metrics.
🛠️ Technology Stack
Prashikshan is built with cutting-edge web technologies:

Framework: Next.js 16 (App Router)
Library: React 19
Language: TypeScript
Styling: Tailwind CSS 4 & Vanilla CSS for core UI tokens
State Management: Zustand
Animations: Framer Motion
Forms & Validation: React Hook Form + Zod
Visualizations & Charts: React Flow, Recharts, Chart.js
Drag & Drop: @dnd-kit
Calendars: FullCalendar
Icons: Lucide React
🚀 Getting Started
Prerequisites
Ensure you have Node.js (v20+) and npm/yarn/pnpm installed.

Installation
Clone the repository:

git clone https://github.com/kashyapkhajuria07/Prashiskshan.git
cd Prashiskshan
Install dependencies:

npm install
# or
yarn install
# or
pnpm install
Run the development server:

npm run dev
# or
yarn dev
# or
pnpm dev
Open http://localhost:3000 with your browser to see the result.

🎨 Design System
The application strictly adheres to a minimalist, typography-focused design system. Key principles include:

Rich Aesthetics: Utilizing curated, harmonious color palettes, modern typography (Inter/Roboto/Outfit), and smooth gradients.
Dynamic Interactions: Incorporating subtle micro-animations (via Framer Motion) and responsive hover states for a premium feel.
Clean Layouts: Emphasizing whitespace, structural hierarchy, and avoiding generic design patterns to deliver a state-of-the-art user experience.
📁 Project Structure
/app - Next.js App Router pages and layouts for Student, College, and Industry portals.
/components - Reusable UI components and layout structures.
/lib/store - Zustand state management stores (e.g., internsStore.ts).
/public - Static assets.
📦 Deployment
The project is configured for seamless deployment to Vercel or Google Cloud Run.

To build for production locally:

npm run build
npm run start
🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

📄 License
This project is proprietary and confidential. Unauthorized copying of this file, via any medium is strictly prohibited.
