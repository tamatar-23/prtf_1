import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Layout, Server, Code2, Wrench, Cpu } from 'lucide-react';

type SkillSectionProps = {
  title: string;
  icon: React.ReactNode;
  skills: string[];
  delay: number;
};

const SkillSection = ({ title, icon, skills, delay }: SkillSectionProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className={`border border-border/50 bg-card shadow-soft hover:-translate-y-1 hover:shadow-soft-lg transition-all duration-300`}
  >
    <div className="p-6">
      <h3 className="text-xl font-bold mb-4 pb-2 flex items-center border-b border-border/50">
        {icon}
        {title}
      </h3>
      <div className="flex flex-wrap gap-2 mt-2">
        {skills.map((skill, index) => (
          <span key={index} className="px-3 py-1 bg-secondary text-secondary-foreground text-sm font-semibold transition-colors hover:bg-primary hover:text-primary-foreground">
            {skill}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
);

const Skills = () => {
  const skillCategories = [
    { title: "Core Competencies", icon: <Cpu className="w-5 h-5 mr-2" />, skills: ["Agentic Workflows", "LLM Orchestration", "Full Stack Architecture"] },
    { title: "Languages", icon: <Code2 className="w-5 h-5 mr-2" />, skills: ["JavaScript", "TypeScript", "Python", "Java", "C++"] },
    { title: "Frontend", icon: <Layout className="w-5 h-5 mr-2" />, skills: ["React.js", "Next.js", "HTML", "CSS", "Tailwind CSS"] },
    { title: "Backend & DBs", icon: <Server className="w-5 h-5 mr-2" />, skills: ["Node.js", "MongoDB", "Firebase", "PostgreSQL", "Supabase", "REST APIs"] },
    { title: "AI / ML", icon: <Brain className="w-5 h-5 mr-2" />, skills: ["HuggingFace", "Pandas", "NumPy", "LangChain", "n8n"] },
    { title: "DevOps & Tools", icon: <Wrench className="w-5 h-5 mr-2" />, skills: ["Docker", "Kubernetes", "Git", "GitHub", "AWS", "GCP", "Vercel"] },
  ];

  return (
    <section id="skills" className="py-24 px-4 md:px-8 lg:px-16 overflow-hidden">
      <div className="max-w-screen-xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-12 uppercase tracking-tight"
        >
          Technical Skills
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skillCategories.map((cat, index) => (
            <SkillSection
              key={index}
              title={cat.title}
              icon={cat.icon}
              skills={cat.skills}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
