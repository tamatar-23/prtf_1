
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Github, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const ProjectCard = ({
  title,
  description,
  techIcons,
  demoUrl,
  githubUrl
}) => (
  <Card
    className="bg-card border border-border/50 p-6 flex flex-col h-full min-h-[400px] shadow-soft hover:-translate-y-1 hover:shadow-soft-lg transition-all duration-300 relative overflow-hidden group"
  >
    <div className="z-10 h-full flex flex-col">
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-muted-foreground mb-6 flex-grow">{description}</p>

      <div className="flex gap-3 mb-4">
        {techIcons.map((icon, index) => (
          <img key={index} src={icon} alt="" className="h-6 w-6" />
        ))}
      </div>

      <div className="flex gap-3 mt-auto justify-center">
        {demoUrl && (
          <Button
            asChild
            variant="outline"
            size="sm"
            className="border border-border/50 bg-background hover:bg-secondary hover:-translate-y-0.5 transition-all duration-200 flex-1 shadow-sm"
          >
            <a href={demoUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              Live Demo
            </a>
          </Button>
        )}

        <Button
          asChild
          variant="outline"
          size="sm"
          className="border border-border/50 bg-background hover:bg-secondary hover:-translate-y-0.5 transition-all duration-200 flex-1 shadow-sm"
        >
          <a href={githubUrl} target="_blank" rel="noopener noreferrer">
            <Github className="mr-2 h-4 w-4" />
            Source Code
          </a>
        </Button>
      </div>
    </div>
  </Card>
);

const Projects = () => {
  const projects = [
    {
      title: "Time Series LLM for Financial Data",
      description: "A specialized time-series LLM architecture repurposing GPT-2/LLaMA for high-frequency volatility forecasting. Achieved 0.9991 R² score using FFT filtering and RevIN. Optimized with PyTorch DDP and AMP.",
      githubUrl: "https://github.com/tamatar-23/t1me_50",
      techIcons: [
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",
      ]
    },
    {
      title: "GitConsistent",
      description: "A hyperminimal, modern web app for habit tracking, featuring GitHub-style progress visualization and AI-driven Coach, Insights, and Journal tools.",
      demoUrl: "https://gitconsistent.vercel.app/",
      githubUrl: "https://github.com/tamatar-23/gitconsistent",
      techIcons: [
        "https://www.vectorlogo.zone/logos/nextjs/nextjs-icon.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
        "https://upload.wikimedia.org/wikipedia/commons/8/8f/Google-gemini-icon.svg",
        "https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg",
      ]
    },
    {
      title: "Type.TMTR",
      description: "A MonkeyType replica built with React and Firebase, providing an intuitive typing test experience with real-time stats, user accounts, and customizable themes.",
      demoUrl: "https://typetmtr.vercel.app",
      githubUrl: "https://github.com/tamatar-23/type_tmtr",
      techIcons: [
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
        "https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg",
      ]
    },
    {
      title: "Financial Wise",
      description: "A modern financial advice website built with React and Tailwind CSS, using the Gemini API to provide smart, real-time insights.",
      demoUrl: "https://fiwi1.vercel.app/",
      githubUrl: "https://github.com/tamatar-23/FiWi-1",
      techIcons: [
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
        "https://upload.wikimedia.org/wikipedia/commons/8/8f/Google-gemini-icon.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      ]
    },
    {
      title: "Portfolio Website",
      description: "A sleek and responsive portfolio website built with React and Tailwind CSS, featuring smooth animations for an engaging user experience.",
      demoUrl: "https://gouravk2304.vecel.app",
      githubUrl: "https://github.com/tamatar-23/prtf_1",
      techIcons: [
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      ]
    }
  ];

  return (
    <section id="projects" className="py-24 px-4 md:px-8 lg:px-16 overflow-hidden">
      <div className="max-w-screen-xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-12 uppercase tracking-tight"
        >
          Projects
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex"
            >
              <div className="w-full">
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  techIcons={project.techIcons}
                  demoUrl={project.demoUrl}
                  githubUrl={project.githubUrl}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
