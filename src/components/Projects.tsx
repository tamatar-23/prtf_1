import React, { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, ExternalLink, X } from 'lucide-react';
import { projects } from '@/lib/data';
import { SectionLabel } from './ui/SectionLabel';
import {
  Python,
  TypeScript,
  JavaScript,
  React as ReactIcon,
  NextJs,
  TailwindCSS,
  Firebase,
  PyTorch,
  ViteJS,
} from 'developer-icons';
import { BrainCircuit, Terminal } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/** Map common project tags to developer-icons */
const tagIconMap: Record<string, React.ReactNode> = {
  'Python': <Python size={16} />,
  'TypeScript': <TypeScript size={16} />,
  'JavaScript': <JavaScript size={16} />,
  'React': <ReactIcon size={16} />,
  'Next.js': <NextJs size={16} />,
  'Tailwind CSS': <TailwindCSS size={16} />,
  'Firebase': <Firebase size={16} />,
  'PyTorch': <PyTorch size={16} />,
  'LangGraph': <BrainCircuit size={16} />,
  'GSAP': <Terminal size={16} />,
  'Vite': <ViteJS size={16} />,
};

const getTagIcon = (tag: string): React.ReactNode | null => {
  return tagIconMap[tag] || null;
};

export const Projects = () => {
  const containerRef = useRef<HTMLElement>(null);
  const expandedRef = useRef<HTMLDivElement>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedProject = projects.find(p => p.id === selectedId) || null;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const projectCards = gsap.utils.toArray('.project-card');

      gsap.fromTo(projectCards,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // Animate expanded card
  useLayoutEffect(() => {
    if (!expandedRef.current) return;
    if (selectedId) {
      gsap.fromTo(expandedRef.current,
        { opacity: 0, y: 30, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power3.out' }
      );
    }
  }, [selectedId]);

  const handleCardClick = (id: string) => {
    setSelectedId(prev => prev === id ? null : id);
  };

  const closeExpanded = () => {
    if (!expandedRef.current) {
      setSelectedId(null);
      return;
    }
    gsap.to(expandedRef.current, {
      opacity: 0, y: 20, scale: 0.96, duration: 0.3, ease: 'power2.in',
      onComplete: () => setSelectedId(null)
    });
  };

  return (
    <section id="projects" ref={containerRef} className="py-24 px-6 text-text relative z-10">
      <div className="container mx-auto max-w-7xl">
        <SectionLabel number="01" text="Selected Works" />

        {/* Equal-size grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <button
              key={project.id}
              onClick={() => handleCardClick(project.id)}
              className={`project-card relative rounded-2xl overflow-hidden group bg-surface backdrop-blur-sm border will-change-transform aspect-[4/3] text-left cursor-pointer transition-all duration-300 ${
                selectedId === project.id
                  ? 'border-accent-2 ring-2 ring-accent-2/20'
                  : 'border-border hover:border-accent-2/40'
              }`}
            >
              {/* Background abstract gradient */}
              <div
                className="absolute inset-0 opacity-20 dark:opacity-30 transition-opacity duration-500 group-hover:opacity-40"
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${project.accent} 0%, transparent 70%)`,
                }}
              />

              {/* Content Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-10 flex flex-col justify-end">
                <h3 className="text-xl md:text-2xl font-semibold text-text tracking-tight">{project.title}</h3>
                <p className="text-text-muted text-sm uppercase tracking-wider mt-1 font-medium">{project.subtitle}</p>
              </div>

              {/* Link buttons — top right, visible on hover */}
              <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 rounded-full bg-bg/70 backdrop-blur-sm text-text hover:bg-text hover:text-bg transition-colors"
                    aria-label="GitHub Repository"
                  >
                    <Github size={16} />
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 rounded-full bg-bg/70 backdrop-blur-sm text-text hover:bg-text hover:text-bg transition-colors"
                    aria-label="Live Demo"
                  >
                    <ExternalLink size={16} />
                  </a>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Expanded project card */}
        {selectedProject && (
          <div
            ref={expandedRef}
            className="mt-8 rounded-2xl border border-accent-2/30 bg-surface backdrop-blur-md overflow-hidden"
          >
            <div className="flex flex-col md:flex-row">
              {/* Left — gradient visual */}
              <div
                className="relative w-full md:w-2/5 min-h-[200px] md:min-h-[300px]"
                style={{
                  background: `radial-gradient(circle at 40% 50%, ${selectedProject.accent} 0%, transparent 70%), var(--color-bg-elevated)`,
                }}
              >
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-2xl md:text-3xl font-bold text-text">{selectedProject.title}</h3>
                  <p className="text-text-muted text-sm uppercase tracking-wider mt-1 font-medium">{selectedProject.subtitle}</p>
                </div>
              </div>

              {/* Right — info panel */}
              <div className="flex-1 p-6 md:p-8 flex flex-col gap-5">
                {/* Close button */}
                <div className="flex justify-end">
                  <button
                    onClick={closeExpanded}
                    className="p-2 rounded-full bg-surface border border-border text-text-muted hover:text-text hover:bg-border transition-colors"
                    aria-label="Close project details"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Description */}
                <p className="text-text-muted text-sm leading-relaxed">{selectedProject.description}</p>

                {/* Tech stack with icons */}
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-bg-elevated border border-border text-text-muted font-medium"
                    >
                      {getTagIcon(tag)}
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-3 mt-auto pt-4">
                  {selectedProject.repoUrl && (
                    <a
                      href={selectedProject.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-text border border-border rounded-full px-4 py-2 hover:bg-text hover:text-bg transition-colors"
                    >
                      <Github size={14} /> GitHub
                    </a>
                  )}
                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-text border border-border rounded-full px-4 py-2 hover:bg-text hover:text-bg transition-colors"
                    >
                      <ExternalLink size={14} /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
