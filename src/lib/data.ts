export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  highlights: string[];
  repoUrl: string;
  liveUrl: string | null;
}

export interface Credential {
  name: string;
  issuer: string;
  year: string;
  url: string;
}

export interface TimelineEntry {
  year: string;
  title: string;
  description: string;
  url?: string;
}

export const personal = {
  name: "Gourav Mishra",
  shortName: "Gourav",
  role: "Full Stack AI Developer",
  headline: "Full-stack engineer shipping production apps and LLM workflows.",
  bio: "I build fast web applications, reliable backend systems, and agentic AI orchestration pipelines that hold up in production.",
  email: "gouravkrishna23@gmail.com",
  resumeUrl:
    "https://drive.google.com/file/d/1r2alxdbZGByTPI955AmlvXV3O0JYFOw8/view?usp=sharing",
  github: "https://github.com/tamatar-23",
  linkedin: "https://www.linkedin.com/in/gouravk2304",
  instagram: "https://instagram.com/gouravk2304",
  monkeytype: "https://monkeytype.com/profile/tabahitamatar",
  spotify: "https://open.spotify.com/user/7da8gcgxxzb4w0d6fbuhu32wk",
};

export const projects: Project[] = [
  {
    id: "agentic-rag",
    title: "Agentic RAG System",
    subtitle: "DSA Interview Prep",
    description:
      "8-node LangGraph RAG pipeline with conditional routing and a self-reflection loop that retries low-faithfulness answers, reaching 0.94 average faithfulness on adversarial evals.",
    tags: ["LangGraph", "ChromaDB", "SentenceTransformers", "Groq", "Streamlit"],
    highlights: [
      "Two-tier query router combining keyword heuristics with LLM fallback",
      "ChromaDB retrieval across a 12-topic DSA knowledge base",
      "33 deterministic unit tests running with zero external API calls",
    ],
    repoUrl: "https://github.com/tamatar-23/agent1",
    liveUrl: null,
  },
  {
    id: "time-series-llm",
    title: "Time Series LLM",
    subtitle: "Financial Forecasting",
    description:
      "Transformer system for market forecasting and anomaly detection that reframes OHLCV series as token sequences for zero-shot prediction across trading windows.",
    tags: ["Python", "PyTorch", "GPT-2", "LLaMA", "Fyers API"],
    highlights: [
      "Frozen attention layers cutting training compute by roughly 60%",
      "Distributed training with PyTorch DDP and AMP",
      "Live market feed wired through the Fyers API",
    ],
    repoUrl: "https://github.com/tamatar-23/t1me",
    liveUrl: null,
  },
  {
    id: "gitconsistent",
    title: "GitConsistent",
    subtitle: "Habit Tracking Platform",
    description:
      "Production habit tracker supporting 500+ concurrent users with optimistic UI updates, Firestore real-time sync, and cost-aware LLM routing across model tiers.",
    tags: ["Next.js", "TypeScript", "Firebase", "LLaMA 3.1", "Tailwind CSS"],
    highlights: [
      "500+ concurrent users on Firebase with Firestore real-time listeners",
      "Cost-aware Groq routing across LLaMA 3.1 model sizes",
    ],
    repoUrl: "https://github.com/tamatar-23/gitconsistent",
    liveUrl: "https://gitconsistent.vercel.app/",
  },
  {
    id: "type_tmtr",
    title: "type_tmtr",
    subtitle: "Typing Speed App",
    description:
      "Real-time typing web app built for distraction-free practice, live WPM and accuracy telemetry, and cloud-synced session history.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Firebase"],
    highlights: [
      "Low-latency keystroke tracking with live WPM and accuracy metrics",
      "Cloud sync for persistent session history",
    ],
    repoUrl: "https://github.com/tamatar-23/type_tmtr",
    liveUrl: "https://typetmtr.vercel.app/",
  },
  {
    id: "mre",
    title: "MRE",
    subtitle: "Media Recommendation Engine",
    description:
      "Content-based movie and series recommender pairing TMDB metadata with scikit-learn TF-IDF vectorization and cosine similarity.",
    tags: ["React", "Python", "TMDB API", "scikit-learn"],
    highlights: [
      "TF-IDF vectorization pipeline for fast content similarity lookup",
      "Dynamic metadata enrichment via the TMDB API",
    ],
    repoUrl: "https://github.com/tamatar-23/MRE",
    liveUrl: null,
  },
];

export const skills: string[] = [
  "Python",
  "React",
  "TypeScript",
  "PostgreSQL",
  "Spring Boot",
  "Docker",
  "Git",
  "PyTorch",
  "HuggingFace",
  "Next.js",
  "JavaScript",
  "Tailwind CSS",
  "Node.js",
  "MongoDB",
  "Redis",
  "Firebase",
  "Kubernetes",
  "AWS",
  "GCP",
  "C++",
  "Java",
];

export const credentials: Credential[] = [
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
    name: "AWS APAC Solutions Architecture",
    issuer: "AWS Forage",
    year: "2025",
    url: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/pmnMSL4QiQ9JCgE3W/kkE9HyeNcw6rwCRGw_pmnMSL4QiQ9JCgE3W_RJDBXerf3WcTL6Xbt_1745865695064_completion_certificate.pdf",
  },
  {
    name: "Business for Good: Corporate Responsibility",
    issuer: "London Business School",
    year: "2026",
    url: "https://www.coursera.org/account/accomplishments/verify/M24WFLQXBBHO",
  },
  {
    name: "Problem Solving Certificate",
    issuer: "HackerRank",
    year: "2025",
    url: "https://www.hackerrank.com/certificates/71af2c748d62",
  },
];

export const timeline: TimelineEntry[] = [
  {
    year: "May 2026 - Present",
    title: "Full Stack Intern @ Praava Legal",
    description:
      "Building web interfaces, API routes, and datastore integrations across client-facing legal workflows.",
    url: "https://praavalegal.com",
  },
  {
    year: "Apr 2026",
    title: "Forward Program @ McKinsey",
    description:
      "Completed practical coursework in structured problem solving, project planning, and technical communication.",
  },
  {
    year: "2023 - 2027",
    title: "KIIT University",
    description:
      "B.Tech in Computer Science and Communication Engineering (8.75 CGPA). Core focus on algorithms, networks, databases, and systems design.",
  },
];
