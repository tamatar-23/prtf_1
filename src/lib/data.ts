export const personal = {
  name: "Gourav Mishra",
  shortName: "Gourav",
  role: "Full Stack AI Developer",
  tagline: "Automating Workflows with AI Agents",
  bio: "Crafting scalable AI systems and seamless digital experiences. Specialized in bridging the gap between complex machine learning models and intuitive user interfaces.",
  email: "gouravkrishna23@gmail.com",
  phone: "+91 7606992021",
  location: "India",
  resumeUrl:
    "https://drive.google.com/file/d/1r2alxdbZGByTPI955AmlvXV3O0JYFOw8/view?usp=sharing",
  github: "https://github.com/tamatar-23",
  linkedin: "https://www.linkedin.com/in/gouravk2304",
  instagram: "https://instagram.com/gouravk2304",
  monkeytype: "https://monkeytype.com/profile/tabahitamatar",
};

export const education = {
  school: "Kalinga Institute of Industrial Technology",
  degree: "B.Tech Computer Science & Communication Engineering",
  cgpa: "8.69/10",
  period: "2023 — 2027",
  relevant: ["DSA", "Operating Systems", "DBMS", "OOPs", "Computer Networks"],
};

export const projects = [
  {
    id: "agentic-rag",
    title: "Agentic RAG System",
    subtitle: "DSA Interview Prep",
    description:
      "An 8-node LangGraph agentic RAG system with conditional routing and a self-reflection loop that auto-retries low-faithful answers — achieving 0.94 avg faithfulness across adversarial evaluation.",
    tags: [
      "LangGraph",
      "ChromaDB",
      "SentenceTransformers",
      "Groq",
      "Streamlit",
    ],
    highlights: [
      "Two-tier query router using keyword heuristics with LLM fallback",
      "ChromaDB retrieval over 12-topic DSA knowledge base",
      "33 deterministic unit tests with zero API calls",
    ],
    repoUrl: "https://github.com/tamatar-23/agent1",
    liveUrl: null,
    accent: "#330fd1",
  },
  {
    id: "time-series-llm",
    title: "Time Series LLM",
    subtitle: "Financial Forecasting",
    description:
      "Transformer-based system for financial time-series forecasting and anomaly detection. Reframed market data as token sequences for zero-shot prediction across full trading windows.",
    tags: ["Python", "PyTorch", "GPT-2", "LLaMA", "Fyers API"],
    highlights: [
      "Frozen attention layers reducing compute cost by ~60%",
      "Distributed training with DDP + AMP",
      "Live market data integration via Fyers API",
    ],
    repoUrl: "https://github.com/tamatar-23/t1me",
    liveUrl: null,
    accent: "#FF9FFC",
  },
  {
    id: "gitconsistent",
    title: "GitConsistent",
    subtitle: "Personal Growth Platform",
    description:
      "Production habit-tracking web application supporting 500+ concurrent users with 99.9% uptime. Features real-time sync and cost-aware LLM pipeline routing.",
    tags: ["Next.js", "TypeScript", "Firebase", "LLaMA 3.1", "Tailwind CSS"],
    highlights: [
      "500+ concurrent users on Firebase with optimistic UI updates",
      "Cost-aware LLM pipeline routing between model sizes via Groq",
      "99.9% uptime with Firestore real-time listeners",
    ],
    repoUrl: "https://github.com/tamatar-23/gitconsistent",
    liveUrl: "https://gitconsistent.vercel.app/",
    accent: "#00E676",
  },
  {
    id: "type_tmtr",
    title: "type_tmtr",
    subtitle: "Typing Web App",
    description:
      "A minimalist, real-time typing speed test application with detailed statistics, history tracking, and an elegant UI. Inspired by modern minimalist design principles.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Firebase"],
    highlights: [
      "Real-time WPM and accuracy calculation",
      "Cloud synchronization for typing history",
      "Premium minimalist UI with fluid animations",
    ],
    repoUrl: "https://github.com/tamatar-23/type_tmtr",
    liveUrl: "https://typetmtr.vercel.app/",
    accent: "#eb92a6c0",
  },
  {
    id: "mre",
    title: "MRE",
    subtitle: "Media Recommendation Engine",
    description:
      "Machine learning based media recommendation engine utilizing content-based filtering. Integrates TMDB API for rich metadata and scikit-learn for vectorization.",
    tags: ["React", "Python", "TMDB API", "scikit-learn"],
    highlights: [
      "TF-IDF Vectorization for content similarity",
      "Dynamic metadata fetching via TMDB API",
      "Responsive React frontend interface",
    ],
    repoUrl: "https://github.com/tamatar-23/MRE",
    liveUrl: null,
    accent: "#B497CF",
  },
  {
    id: "prtf_1",
    title: "Portfolio",
    subtitle: "Personal Portfolio Website",
    description:
      "This very portfolio — a premium, dark-mode-first developer portfolio built with React, TypeScript, GSAP animations, and a custom design system. Features a radial theme transition, staggered menu, grainient background, and animated section reveals.",
    tags: ["React", "TypeScript", "GSAP", "Tailwind CSS", "Vite"],
    highlights: [
      "Custom GSAP scroll-triggered animations",
      "Radial view-transition theme toggle",
      "Developer-icons integration for premium skill cards",
    ],
    repoUrl: "https://github.com/tamatar-23/prtf_1",
    liveUrl: "https://gouravk2304.vercel.app",
    accent: "#5533e8",
  },
];

export const skills = [
  "Python",
  "PyTorch",
  "HuggingFace",
  "TypeScript",
  "JavaScript",
  "Next.js",
  "React",
  "Node.js",
  "Tailwind CSS",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "Firebase",
  "Docker",
  "Kubernetes",
  "AWS",
  "GCP",
  "Git",
  "C++",
  "Java",
  "Lightroom",
];

/** One-line definitions for each skill — shown on click in the Skills section */
export const skillDefinitions: Record<string, string> = {
  Python:
    "High-level programming language used for machine learning models, automation scripts, API layers, and data analysis.",
  PyTorch:
    "Deep learning framework used for building neural networks, time-series forecasting, and model training pipelines.",
  HuggingFace:
    "Platform and toolkit for training, evaluating, and deploying open-weight transformer models and model context protocols.",
  TypeScript:
    "Strongly typed programming language built on JavaScript that ensures type safety and prevents runtime errors.",
  JavaScript:
    "Core scripting language for creating dynamic user interactions, DOM manipulations, and asynchronous network queries.",
  "Next.js":
    "React framework enabling server-side rendering, static site generation, and optimized full-stack routing.",
  React:
    "Component-based library for building responsive user interfaces with optimized state updates and virtual DOM rendering.",
  "Node.js":
    "V8-powered asynchronous JavaScript runtime for building high-concurrency API servers and background worker services.",
  "Tailwind CSS":
    "Utility-first styling framework enabling rapid design composition through semantic CSS design tokens.",
  PostgreSQL:
    "Advanced open-source relational database supporting high-performance SQL queries, indexing, and complex schemas.",
  MongoDB:
    "Document-based NoSQL database optimized for high-scalability JSON storage and flexible document schemas.",
  Redis:
    "In-memory data structure store used as a high-speed database cache, message broker, and queue runner.",
  Firebase:
    "Backend-as-a-Service platform providing real-time databases, authentication, and secure cloud serverless execution.",
  Docker:
    "Containerization platform to package applications with all dependencies into reproducible, portable images.",
  Kubernetes:
    "Orchestration system for automating deployment, scaling, and management of containerized applications.",
  AWS: "Cloud computing platform hosting compute instances, scalable storage buckets, and secure private virtual networks.",
  GCP: "Cloud platform offering scalable serverless hosting, AI/ML compute, and analytical databases.",
  Git: "Distributed version control system for tracking source code history and collaborating across development branches.",
  "C++":
    "High-performance programming language designed for resource-heavy computations, algorithms, and system-level applications.",
  Java: "Object-oriented language for designing robust, enterprise-grade backend services and scalable web architectures.",
  Lightroom:
    "Professional image organization and editing suite for managing visual catalogs and processing photography assets.",
};

export const certifications = [
  {
    name: "AI Fluency Framework & Foundations",
    issuer: "Anthropic",
    year: "2026",
    url: "https://verify.skilljar.com/c/88ivjpiszasq",
  },
  {
    name: "Introduction to Model Context Protocol",
    issuer: "Anthropic",
    year: "2026",
    url: "https://verify.skilljar.com/c/cmgpg76y63rs",
  },
  {
    name: "Business for Good: Fundamentals of Corporate Responsibility",
    issuer: "London Business School",
    year: "2026",
    url: "https://www.coursera.org/account/accomplishments/verify/M24WFLQXBBHO",
  },
  {
    name: "Corporate Governance",
    issuer: "Coursera",
    year: "2026",
    url: "https://www.coursera.org/account/accomplishments/verify/T9NBC0607B24",
  },
  {
    name: "HackerRank Problem Solving",
    issuer: "HackerRank",
    year: "2025",
    url: "https://www.hackerrank.com/certificates/71af2c748d62",
  },
  {
    name: "React — The Complete Guide",
    issuer: "Udemy",
    year: "2025",
    url: "https://udemy-certificate.s3.amazonaws.com/pdf/UC-b7ae8e33-c0c2-4630-b67d-cc8488998475.pdf",
  },
  {
    name: "AWS APAC - Solutions Architecture",
    issuer: "AWS - Forage",
    year: "2025",
    url: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/pmnMSL4QiQ9JCgE3W/kkE9HyeNcw6rwCRGw_pmnMSL4QiQ9JCgE3W_RJDBXerf3WcTL6Xbt_1745865695064_completion_certificate.pdf",
  },
];

export const timeline = [
  {
    year: "May 2026 — Aug 2026",
    title: "Full Stack Intern @ Praava Legal",
    description:
      "Developing web interfaces, writing API routes, and designing datastore integrations.",
    url: "https://praavalegal.com",
  },
  {
    year: "April 2026",
    title: "Forward Program @ McKinsey",
    description:
      "Completed coursework on project planning, communication, and systematic problem solving.",
  },
  {
    year: "2023 — 2027",
    title: "KIIT University",
    description:
      "Studying B.Tech in Computer Science and Communication Engineering. Focused on algorithms, networks, database indexes, and system design.",
  },
];

export const achievements = [
  "Deployed 3+ production applications with real users and high availability",
  "Systems designed to scale to 1,000+ concurrent users",
  "85+ Lighthouse performance scores across all projects",
  "500+ concurrent users handled on Firebase infrastructure",
];
