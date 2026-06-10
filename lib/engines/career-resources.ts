import { CareerCategory, PathPhase } from './types';

export interface CareerResourceSet {
  prerequisites: string[];
  requiredSkills: string[];
  phases: Omit<PathPhase, 'phase'>[];
}

export const CAREER_RESOURCES: Record<CareerCategory, CareerResourceSet> = {
  'Software Development': {
    prerequisites: ['Basic Logic', 'Computers Familiarity'],
    requiredSkills: ['Python', 'Data Structures', 'System Design', 'SQL', 'Git', 'Testing', 'CI/CD'],
    phases: [
      {
        name: 'CS Foundations & Algorithmic Thinking',
        durationWeeks: 4,
        skills: ['Python', 'Data Structures', 'Git'],
        resources: [
          { title: 'Python for Everybody Specialization', provider: 'Coursera', url: 'https://coursera.org/specializations/python', type: 'course' },
          { title: 'Introduction to Git and GitHub', provider: 'Google', url: 'https://coursera.org/learn/introduction-git-github', type: 'course' },
        ],
        milestone: 'Implement and push a library of 10 classic data structures in Python to GitHub.',
      },
      {
        name: 'Backend Web Development & Databases',
        durationWeeks: 6,
        skills: ['SQL', 'Web Technologies', 'APIs'],
        resources: [
          { title: 'Meta Backend Developer Professional Certificate', provider: 'Coursera', url: 'https://coursera.org/professional-certificates/meta-backend-developer', type: 'certification' },
          { title: 'Learn Databases (SQL/NoSQL)', provider: 'freeCodeCamp', url: 'https://freecodecamp.org/learn', type: 'tutorial' },
        ],
        milestone: 'Create a RESTful API with database integration supporting authentication and filters.',
      },
      {
        name: 'System Design & High-Quality Code',
        durationWeeks: 4,
        skills: ['System Design', 'Testing'],
        resources: [
          { title: 'Software Design and Architecture Specialization', provider: 'Coursera', url: 'https://coursera.org/specializations/software-design-architecture', type: 'course' },
          { title: 'System Design Interview Prep Guide', provider: 'ByteByteGo', url: 'https://bytebytego.com', type: 'tutorial' },
        ],
        milestone: 'Design and write the architecture specification for a scalable messaging system.',
      },
      {
        name: 'Advanced Software Engineering Capstone',
        durationWeeks: 6,
        skills: ['CI/CD', 'Testing', 'System Design'],
        resources: [
          { title: 'Software Engineering Capstone Project', provider: 'Prashikshan', url: 'https://github.com/kashyapkhajuria07/Prashiskshan', type: 'project' },
        ],
        milestone: 'Deploy a full-stack project with unit tests and a automated CI/CD pipeline.',
      },
    ],
  },
  'Data Science': {
    prerequisites: ['Linear Algebra', 'Basic Statistics'],
    requiredSkills: ['Python', 'Databases', 'Data Analysis', 'Machine Learning', 'Data Visualization', 'SQL'],
    phases: [
      {
        name: 'Python for Data Science & Visualization',
        durationWeeks: 4,
        skills: ['Python', 'Data Analysis'],
        resources: [
          { title: 'Applied Data Science with Python Specialization', provider: 'University of Michigan', url: 'https://coursera.org/specializations/data-science-python', type: 'course' },
          { title: 'Data Analysis with Python', provider: 'freeCodeCamp', url: 'https://freecodecamp.org/learn', type: 'tutorial' },
        ],
        milestone: 'Conduct exploratory data analysis (EDA) on a dataset of 100k+ rows and visualize results.',
      },
      {
        name: 'Relational Databases & Data Extraction',
        durationWeeks: 4,
        skills: ['SQL', 'Databases'],
        resources: [
          { title: 'SQL for Data Science', provider: 'UC Davis', url: 'https://coursera.org/learn/sql-for-data-science', type: 'course' },
        ],
        milestone: 'Write complex SQL queries utilizing Joins, CTEs, and Window Functions to generate sales metrics.',
      },
      {
        name: 'Machine Learning Algorithms & Models',
        durationWeeks: 6,
        skills: ['Machine Learning', 'Python'],
        resources: [
          { title: 'Machine Learning Specialization', provider: 'Stanford & DeepLearning.AI', url: 'https://coursera.org/specializations/machine-learning-introduction', type: 'course' },
        ],
        milestone: 'Build, tune, and evaluate 5 different classification and regression models in Scikit-Learn.',
      },
      {
        name: 'Data Science Capstone & Communication',
        durationWeeks: 6,
        skills: ['Data Visualization', 'Machine Learning'],
        resources: [
          { title: 'Data Science Capstone Project', provider: 'IBM', url: 'https://coursera.org/learn/applied-data-science-capstone', type: 'project' },
        ],
        milestone: 'Write and publish an executive summary report and slide deck analyzing predictive model results.',
      },
    ],
  },
  'Web Development': {
    prerequisites: ['Web Basics'],
    requiredSkills: ['Web Technologies', 'React', 'SQL', 'Git', 'SEO', 'Performance Optimization'],
    phases: [
      {
        name: 'HTML/CSS & JavaScript Basics',
        durationWeeks: 3,
        skills: ['Web Technologies', 'Git'],
        resources: [
          { title: 'Responsive Web Design Certification', provider: 'freeCodeCamp', url: 'https://freecodecamp.org/learn', type: 'certification' },
          { title: 'JavaScript Algorithms and Data Structures', provider: 'freeCodeCamp', url: 'https://freecodecamp.org/learn', type: 'certification' },
        ],
        milestone: 'Create 3 responsive landing pages utilizing modern CSS Flexbox and Grid.',
      },
      {
        name: 'Modern Frontend Frameworks (React & Next.js)',
        durationWeeks: 5,
        skills: ['Web Technologies', 'React'],
        resources: [
          { title: 'Front-End Web Development with React', provider: 'HKUST', url: 'https://coursera.org/learn/react', type: 'course' },
          { title: 'Next.js Academy Guide', provider: 'Vercel', url: 'https://nextjs.org/learn', type: 'tutorial' },
        ],
        milestone: 'Build a multi-page dashboard featuring client-side routing and state management.',
      },
      {
        name: 'Backend Web Technologies & Databases',
        durationWeeks: 4,
        skills: ['SQL', 'APIs'],
        resources: [
          { title: 'Node.js, Express and MongoDB', provider: 'HKUST', url: 'https://coursera.org/learn/server-side-development', type: 'course' },
        ],
        milestone: 'Integrate the dashboard with a server application that handles file uploads and relational data.',
      },
      {
        name: 'Performance Optimization & SEO Capstone',
        durationWeeks: 4,
        skills: ['SEO', 'Performance Optimization'],
        resources: [
          { title: 'Web Performance & Accessibility Audit', provider: 'Google Developers', url: 'https://web.dev/learn', type: 'tutorial' },
        ],
        milestone: 'Deploy the full-stack web application achieving 95+ scores on Lighthouse audits.',
      },
    ],
  },
  'Cybersecurity': {
    prerequisites: ['Basic Computing', 'Operating Systems'],
    requiredSkills: ['Networking & Security', 'Linux/CLI', 'Python', 'Ethical Hacking', 'Penetration Testing'],
    phases: [
      {
        name: 'Security Principles & Network Defense',
        durationWeeks: 4,
        skills: ['Networking & Security', 'Linux/CLI'],
        resources: [
          { title: 'Google Cybersecurity Professional Certificate', provider: 'Google', url: 'https://coursera.org/professional-certificates/google-cybersecurity', type: 'certification' },
          { title: 'CompTIA Security+ Exam Prep', provider: 'Udemy', url: 'https://udemy.com', type: 'course' },
        ],
        milestone: 'Secure a Linux server by modifying firewalls, port configurations, and system permissions.',
      },
      {
        name: 'Ethical Hacking & Vulnerability Analysis',
        durationWeeks: 6,
        skills: ['Ethical Hacking', 'Linux/CLI'],
        resources: [
          { title: 'Ethical Hacking Course', provider: 'SANS Institute', url: 'https://sans.org', type: 'course' },
          { title: 'Learn Penetration Testing', provider: 'TryHackMe', url: 'https://tryhackme.com', type: 'tutorial' },
        ],
        milestone: 'Perform a full vulnerability audit on a sandbox web application and document exploits.',
      },
      {
        name: 'Incident Response & Threat Intelligence',
        durationWeeks: 4,
        skills: ['Networking & Security'],
        resources: [
          { title: 'Certified Information Systems Security Professional (CISSP) Prep', provider: 'ISC2', url: 'https://isc2.org', type: 'certification' },
        ],
        milestone: 'Analyze system logs to identify a simulated DDoS attack and draft an incident mitigation plan.',
      },
      {
        name: 'Penetration Testing & Reporting Capstone',
        durationWeeks: 6,
        skills: ['Penetration Testing', 'Networking & Security'],
        resources: [
          { title: 'Offensive Security Certified Professional (OSCP) Prep', provider: 'OffSec', url: 'https://offsec.com', type: 'certification' },
        ],
        milestone: 'Perform a comprehensive network penetration test and deliver a secure compliance report.',
      },
    ],
  },
  'Cloud Computing': {
    prerequisites: ['Networking Basics', 'Command Line Basics'],
    requiredSkills: ['Cloud Architecture', 'Networking & Security', 'System Design', 'Linux/CLI', 'Infrastructure as Code'],
    phases: [
      {
        name: 'Cloud Core Services & Architecture',
        durationWeeks: 3,
        skills: ['Cloud Architecture', 'Networking & Security'],
        resources: [
          { title: 'AWS Cloud Practitioner Essentials', provider: 'Amazon Web Services', url: 'https://aws.amazon.com/training', type: 'course' },
          { title: 'Google Cloud Associate Cloud Engineer Prep', provider: 'Coursera', url: 'https://coursera.org/learn/google-cloud-infrastructure', type: 'course' },
        ],
        milestone: 'Provision a highly available network topology on AWS/Azure using multiple subnets and load balancers.',
      },
      {
        name: 'Infrastructure as Code (IaC)',
        durationWeeks: 5,
        skills: ['Infrastructure as Code', 'Linux/CLI'],
        resources: [
          { title: 'Terraform Beginner to Advanced', provider: 'Udemy', url: 'https://udemy.com', type: 'course' },
        ],
        milestone: 'Write Terraform scripts to automatically deploy and tear down a full VPC setup.',
      },
      {
        name: 'Containers & Cloud Orchestration',
        durationWeeks: 4,
        skills: ['System Design', 'Linux/CLI'],
        resources: [
          { title: 'Docker and Kubernetes: The Complete Guide', provider: 'Udemy', url: 'https://udemy.com', type: 'course' },
        ],
        milestone: 'Package a microservices app in Docker and deploy it to a managed Kubernetes (EKS/GKE) cluster.',
      },
      {
        name: 'Cloud Security & Professional Solutions',
        durationWeeks: 6,
        skills: ['Cloud Architecture', 'Networking & Security'],
        resources: [
          { title: 'AWS Certified Solutions Architect – Professional Prep', provider: 'Coursera', url: 'https://coursera.org/learn/aws-solutions-architect', type: 'certification' },
        ],
        milestone: 'Design and present an enterprise cloud migration strategy for a monolithic bank app.',
      },
    ],
  },
  'Mobile App Development': {
    prerequisites: ['JavaScript Foundations', 'OOP Concepts'],
    requiredSkills: ['Mobile SDKs', 'React', 'System Design', 'APIs', 'App Store Publishing'],
    phases: [
      {
        name: 'Cross-Platform Frameworks (React Native / Flutter)',
        durationWeeks: 5,
        skills: ['React', 'Mobile SDKs'],
        resources: [
          { title: 'Multiplatform Mobile App Development with React Native', provider: 'Coursera', url: 'https://coursera.org/learn/react-native', type: 'course' },
          { title: 'Flutter & Dart - The Complete Guide', provider: 'Udemy', url: 'https://udemy.com', type: 'course' },
        ],
        milestone: 'Develop a cross-platform mobile weather application utilizing geolocation and public APIs.',
      },
      {
        name: 'Native Platform SDK Integration',
        durationWeeks: 5,
        skills: ['Mobile SDKs', 'System Design'],
        resources: [
          { title: 'iOS App Development with Swift', provider: 'Apple/Stanford', url: 'https://cs193p.sites.stanford.edu', type: 'course' },
          { title: 'Android App Development', provider: 'Google', url: 'https://developer.android.com/courses', type: 'tutorial' },
        ],
        milestone: 'Integrate native device sensors (Camera, Biometrics, Accelerometer) into a sandbox application.',
      },
      {
        name: 'Mobile App Architecture & State Management',
        durationWeeks: 4,
        skills: ['System Design', 'APIs'],
        resources: [
          { title: 'Advanced React Native / Flutter Architectures', provider: 'Udemy', url: 'https://udemy.com', type: 'course' },
        ],
        milestone: 'Implement offline-first capabilities using local SQLite databases and synchronization protocols.',
      },
      {
        name: 'Publishing & Distribution Capstone',
        durationWeeks: 3,
        skills: ['App Store Publishing'],
        resources: [
          { title: 'App Store Optimization and Release Guide', provider: 'Apple/Google', url: 'https://developer.apple.com/distribute', type: 'tutorial' },
        ],
        milestone: 'Prepare, build, sign, and test release bundles for both iOS App Store and Google Play Store.',
      },
    ],
  },
  'DevOps': {
    prerequisites: ['Linux Commands', 'Software Development Basics'],
    requiredSkills: ['Linux/CLI', 'Python', 'CI/CD', 'Docker', 'Kubernetes', 'Infrastructure as Code', 'Monitoring'],
    phases: [
      {
        name: 'Linux Administration & Scripting',
        durationWeeks: 4,
        skills: ['Linux/CLI', 'Python'],
        resources: [
          { title: 'Linux System Administration Specialization', provider: 'Coursera', url: 'https://coursera.org/specializations/linux-system-administration', type: 'course' },
          { title: 'Python for Bash Automation Scripting', provider: 'Udemy', url: 'https://udemy.com', type: 'course' },
        ],
        milestone: 'Write a suite of Python/Bash scripts to automate server backups and log rotations.',
      },
      {
        name: 'CI/CD Pipelines & Automation',
        durationWeeks: 3,
        skills: ['CI/CD'],
        resources: [
          { title: 'Continuous Integration and Continuous Delivery', provider: 'IBM', url: 'https://coursera.org/learn/devops-cod-cicd', type: 'course' },
          { title: 'GitHub Actions Tutorial', provider: 'freeCodeCamp', url: 'https://freecodecamp.org/learn', type: 'tutorial' },
        ],
        milestone: 'Construct a multi-stage GitHub Actions pipeline that lints, tests, and builds docker containers.',
      },
      {
        name: 'Container Orchestration & Scaling',
        durationWeeks: 4,
        skills: ['Docker', 'Kubernetes'],
        resources: [
          { title: 'Docker & Kubernetes Specialization', provider: 'Udemy', url: 'https://udemy.com', type: 'course' },
        ],
        milestone: 'Deploy a cluster of container services that automatically scale based on network load.',
      },
      {
        name: 'Infrastructure Monitoring & Cloud Operations',
        durationWeeks: 5,
        skills: ['Infrastructure as Code', 'Monitoring'],
        resources: [
          { title: 'Monitoring and Observability (Prometheus & Grafana)', provider: 'Udemy', url: 'https://udemy.com', type: 'course' },
        ],
        milestone: 'Set up Prometheus scraping and Grafana dashboards tracking memory/CPU thresholds with Slack alerts.',
      },
    ],
  },
  'AI/ML Engineering': {
    prerequisites: ['Advanced Math', 'Python Programming'],
    requiredSkills: ['Python', 'Machine Learning', 'Deep Learning', 'Neural Networks', 'MLOps', 'Deployment'],
    phases: [
      {
        name: 'Applied Machine Learning Foundations',
        durationWeeks: 4,
        skills: ['Python', 'Machine Learning'],
        resources: [
          { title: 'Machine Learning Specialization', provider: 'Stanford & DeepLearning.AI', url: 'https://coursera.org/specializations/machine-learning-introduction', type: 'course' },
        ],
        milestone: 'Implement gradient descent from scratch in Python and train it on housing cost data.',
      },
      {
        name: 'Deep Learning & Advanced Neural Networks',
        durationWeeks: 5,
        skills: ['Deep Learning', 'Neural Networks'],
        resources: [
          { title: 'Deep Learning Specialization', provider: 'DeepLearning.AI', url: 'https://coursera.org/specializations/deep-learning', type: 'certification' },
        ],
        milestone: 'Construct a Convolutional Neural Network (CNN) in PyTorch to classify objects from images.',
      },
      {
        name: 'Natural Language Processing & Transformers',
        durationWeeks: 6,
        skills: ['Neural Networks'],
        resources: [
          { title: 'Natural Language Processing Specialization', provider: 'DeepLearning.AI', url: 'https://coursera.org/specializations/natural-language-processing', type: 'course' },
          { title: 'Hugging Face NLP Course', provider: 'Hugging Face', url: 'https://huggingface.co/learn', type: 'tutorial' },
        ],
        milestone: 'Fine-tune a BERT-based transformer model for sentiment classification on customer reviews.',
      },
      {
        name: 'MLOps & Model Deployment',
        durationWeeks: 4,
        skills: ['MLOps', 'Deployment'],
        resources: [
          { title: 'Machine Learning Engineering for Production (MLOps)', provider: 'DeepLearning.AI', url: 'https://coursera.org/specializations/machine-learning-engineering-for-production-mlops', type: 'course' },
        ],
        milestone: 'Package a trained deep learning model as an API endpoint, containerize with Docker, and deploy.',
      },
    ],
  },
};
