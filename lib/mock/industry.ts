export const generateMockData = () => {
  const departments = ['Engineering', 'Design', 'Marketing', 'Data', 'Product', 'HR'];
  const locations = ['Bangalore', 'Mumbai', 'Remote', 'Delhi', 'Hyderabad', 'Pune'];

  // Openings
  const openings = Array.from({ length: 15 }).map((_, i) => ({
    id: `role-${i}`,
    title: `${['Frontend', 'Backend', 'Full Stack', 'UX', 'Product', 'Data'][i % 6]} Intern`,
    department: departments[i % departments.length],
    postedOn: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
    applicationsCount: Math.floor(Math.random() * 50) + 10,
    filled: Math.floor(Math.random() * 3),
    totalPositions: Math.floor(Math.random() * 4) + 2,
    status: i < 10 ? 'Active' : (i < 13 ? 'Paused' : 'Closed'),
    views: Math.floor(Math.random() * 1000) + 100,
  }));

  // Colleges
  const colleges = Array.from({ length: 18 }).map((_, i) => ({
    id: `col-${i}`,
    name: ['IIT Delhi', 'NIT Trichy', 'VIT Vellore', 'BITS Pilani', 'SRM University', 'Manipal Institute', 'PES University', 'RVCE'][i % 8],
    location: locations[i % locations.length],
    status: i < 10 ? 'Active MoU' : (i < 15 ? 'MoU Expiring Soon' : 'Informal Partnership'),
    studentsInNetwork: Math.floor(Math.random() * 500) + 50,
    applicationsReceived: Math.floor(Math.random() * 200) + 20,
    internsHired: Math.floor(Math.random() * 20) + 1,
    avgQuality: (Math.random() * 2 + 3).toFixed(1),
  }));

  // Candidates Pipeline
  const stages = ['New Applications', 'Under Review', 'Shortlisted', 'Interview Scheduled', 'Interviewed', 'Offer Sent', 'Accepted', 'Rejected'];
  const candidates = Array.from({ length: 220 }).map((_, i) => ({
    id: `cand-${i}`,
    name: `Candidate ${i + 1}`,
    roleId: openings[i % openings.length].id,
    roleTitle: openings[i % openings.length].title,
    college: colleges[i % colleges.length].name,
    year: `${Math.floor(Math.random() * 4) + 1}rd Year`,
    matchScore: Math.floor(Math.random() * 30) + 70,
    readinessScore: Math.floor(Math.random() * 40) + 60,
    stage: stages[Math.floor(Math.random() * stages.length)],
    appliedAgo: `${Math.floor(Math.random() * 14) + 1}d ago`,
    tags: ['React', 'Python', 'Figma', 'Node.js', 'SQL'].sort(() => 0.5 - Math.random()).slice(0, 2),
    cgpa: (Math.random() * 3 + 7).toFixed(1)
  }));

  // Active Interns
  const interns = Array.from({ length: 35 }).map((_, i) => ({
    id: `int-${i}`,
    name: `Intern ${i + 1}`,
    role: openings[i % openings.length].title,
    department: departments[i % departments.length],
    weekOut: Math.floor(Math.random() * 12) + 1,
    totalWeeks: 12,
    lastLogbookTime: `${Math.floor(Math.random() * 5) + 1} days ago`,
    performance: Math.floor(Math.random() * 3) + 1, // 1 to 3
    mentor: `Mentor ${Math.floor(i / 5) + 1}`,
    status: Math.random() > 0.8 ? (Math.random() > 0.5 ? 'Needs Attention' : 'At Risk') : 'On Track',
  }));

  return { openings, candidates, interns, colleges };
};

export const INDUSTRY_MOCK_DATA = generateMockData();
