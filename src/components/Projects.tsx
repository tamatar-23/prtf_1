import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink } from './ui/Icons';
import { projects } from '@/lib/data';
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

// Helper to assign spot pastels semantically
const getTagStyles = (tag: string): { bg: string; text: string } => {
  const t = tag.toLowerCase();
  
  // Pale Red: AI / Agentic / Python packages
  if (t.includes('langgraph') || t.includes('llama') || t.includes('groq') || t.includes('gpt-2')) {
    return {
      bg: 'bg-[var(--pastel-red-bg)] dark:bg-[var(--pastel-red-bg)]',
      text: 'text-[var(--pastel-red-text)] dark:text-[var(--pastel-red-text)]',
    };
  }
  // Pale Blue: Frontend / Frameworks / JS
  if (t.includes('typescript') || t.includes('javascript') || t.includes('react') || t.includes('next') || t.includes('vite')) {
    return {
      bg: 'bg-[var(--pastel-blue-bg)] dark:bg-[var(--pastel-blue-bg)]',
      text: 'text-[var(--pastel-blue-text)] dark:text-[var(--pastel-blue-text)]',
    };
  }
  // Pale Green: Databases / Cloud / Integrations
  if (t.includes('firebase') || t.includes('postgres') || t.includes('mongo') || t.includes('chromadb')) {
    return {
      bg: 'bg-[var(--pastel-green-bg)] dark:bg-[var(--pastel-green-bg)]',
      text: 'text-[var(--pastel-green-text)] dark:text-[var(--pastel-green-text)]',
    };
  }
  // Pale Yellow: General / Lang / Styling / Utilities
  return {
    bg: 'bg-[var(--pastel-yellow-bg)] dark:bg-[var(--pastel-yellow-bg)]',
    text: 'text-[var(--pastel-yellow-text)] dark:text-[var(--pastel-yellow-text)]',
  };
};

/** Map common project tags to developer-icons */
const tagIconMap: Record<string, React.ReactNode> = {
  'Python': <Python size={14} />,
  'TypeScript': <TypeScript size={14} />,
  'JavaScript': <JavaScript size={14} />,
  'React': <ReactIcon size={14} />,
  'Next.js': <NextJs size={14} />,
  'Tailwind CSS': <TailwindCSS size={14} />,
  'Firebase': <Firebase size={14} />,
  'PyTorch': <PyTorch size={14} />,
  'Vite': <ViteJS size={14} />,
};

const getTagIcon = (tag: string): React.ReactNode | null => {
  return tagIconMap[tag] || null;
};

interface ProjectCardProps {
  project: typeof projects[0];
  idx: number;
  widthClass: string;
  isExpanded: boolean;
  isShrunk: boolean;
  hasRightBorder: boolean;
  onSelect: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  idx,
  widthClass,
  isExpanded,
  isShrunk,
  hasRightBorder,
  onSelect
}) => {
  const handleCardClick = (e: React.MouseEvent) => {
    onSelect();
    const target = e.currentTarget as HTMLElement;
    setTimeout(() => {
      target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 150);
  };

  // Borders set cleanly on the row container and divider between A & B
  const borderClass = hasRightBorder 
    ? 'border-b border-border md:border-b-0 md:border-r border-border' 
    : 'border-b border-border md:border-b-0';

  return (
    <motion.div
      layout
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 30,
        mass: 0.8
      }}
      onClick={handleCardClick}
      className={`relative p-8 flex flex-col justify-start transition-all duration-300 w-full rounded-none outline-none focus:outline-none focus-visible:outline-none z-10 ${widthClass} ${borderClass} ${
        isExpanded
          ? 'bg-bg-warm dark:bg-[#161615]/30 backdrop-blur-[1px] cursor-pointer gap-6 border-text/20 ring-1 ring-text/10 md:min-h-[380px]'
          : isShrunk
          ? 'bg-bg-elevated dark:bg-[#1C1C1B]/40 backdrop-blur-[1px] opacity-85 hover:opacity-100 cursor-pointer min-h-[220px] justify-center items-center select-none'
          : 'bg-bg-elevated dark:bg-[#1C1C1B]/40 backdrop-blur-[1px] hover:bg-bg-warm/50 dark:hover:bg-[#161615]/20 cursor-pointer min-h-[220px]'
      }`}
    >
      {/* 1. Shrunked state (30% width) - minimal representation */}
      {isShrunk ? (
        <div className="flex flex-col items-center justify-center text-center gap-3 select-none">
          <span className="text-[10px] font-mono-tech text-text-muted/60">
            [0{idx + 1}]
          </span>
          <h3 className="text-xs font-mono-tech font-bold uppercase tracking-wider text-text truncate max-w-[80px]">
            {project.title.split(' ')[0]}
          </h3>
        </div>
      ) : (
        /* 2. Standard (50%) or Expanded (70%) state */
        <div className="flex-1 flex flex-col justify-between w-full h-full">
          {/* Header row */}
          <div className="flex justify-between items-start w-full select-none">
            <span className="text-[10px] font-mono-tech text-text-muted/70 uppercase tracking-wider">
              Project — 0{idx + 1}
            </span>

            {/* Tags (Hide stack tags if expanded since we show full tags inside) */}
            {!isExpanded && (
              <div className="flex gap-1.5 flex-wrap max-w-[70%] justify-end">
                {project.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className={`text-[8px] font-mono-tech uppercase tracking-wider px-2 py-0.5 rounded-full select-none ${getTagStyles(tag).bg} ${getTagStyles(tag).text}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Title & Subtitle block */}
          <div className="mt-6">
            <h3 className="text-xl md:text-2xl font-serif-editorial font-normal tracking-tight text-text leading-tight transition-colors duration-200">
              {project.title}
            </h3>
            <p className="text-text-muted text-[10px] uppercase tracking-widest font-mono-tech mt-2 leading-none">
              {project.subtitle}
            </p>
          </div>

          {/* Conditional details block (fades in when expanded) */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="flex flex-col gap-5 pt-5 border-t border-border/50 w-full overflow-hidden mt-6"
              >
                {/* Description */}
                <div>
                  <h4 className="text-[9px] font-mono-tech uppercase tracking-wider text-text-muted mb-1 select-none">
                    Overview
                  </h4>
                  <p className="text-text-muted text-xs leading-relaxed font-sans select-all">
                    {project.description}
                  </p>
                </div>

                {/* Highlights */}
                <div>
                  <h4 className="text-[9px] font-mono-tech uppercase tracking-wider text-text-muted mb-2 select-none">
                    Key Solutions
                  </h4>
                  <ul className="list-none p-0 m-0 flex flex-col gap-2">
                    {project.highlights.slice(0, 2).map((highlight, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2.5 text-xs text-text">
                        <span className="text-text-muted shrink-0 font-mono-tech mt-0.5">[0{hIdx + 1}]</span>
                        <span className="text-xs leading-relaxed font-sans">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Full Stack Tags */}
                <div>
                  <h4 className="text-[9px] font-mono-tech uppercase tracking-wider text-text-muted mb-2 select-none">
                    Stack Architecture
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`inline-flex items-center gap-1 text-[9px] font-mono-tech uppercase tracking-wider px-2 py-0.5 rounded-full select-none ${getTagStyles(tag).bg} ${getTagStyles(tag).text}`}
                      >
                        {getTagIcon(tag)}
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Links (stops propagation to bypass toggle collapse) */}
                <div
                  className="flex items-center gap-3 pt-3 border-t border-border/30"
                  onClick={(e) => e.stopPropagation()}
                >
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[10px] font-mono-tech uppercase tracking-wider text-bg bg-text rounded-[4px] px-3.5 py-2 transition-all duration-200 hover:bg-[#333333] active:scale-98"
                    >
                      <Github size={12} /> Repository
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[10px] font-mono-tech uppercase tracking-wider text-text border border-border bg-bg-elevated rounded-[4px] px-3.5 py-2 transition-all duration-200 hover:bg-bg-warm active:scale-98"
                    >
                      <ExternalLink size={12} /> Live Demo
                    </a>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer state text */}
          <div className={`flex items-center justify-between w-full pt-4 border-t border-border/50 select-none ${isExpanded ? 'mt-2' : 'mt-6'}`}>
            <span className="text-[11px] font-mono-tech text-text-muted font-medium hover:text-text transition-colors duration-200">
              {isExpanded ? 'Collapse Details' : 'Expand Details'}
            </span>
            {isExpanded ? (
              <span className="text-text-muted transition-transform duration-200 text-xs font-sans">
                ←
              </span>
            ) : (
              <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 text-text-muted hover:text-text hover:bg-bg-warm rounded transition-colors duration-200"
                    title="Repository"
                  >
                    <Github size={13} />
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 text-text-muted hover:text-text hover:bg-bg-warm rounded transition-colors duration-200"
                    title="Live Demo"
                  >
                    <ExternalLink size={13} />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export const Projects = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  // Group 6 projects into 3 rows of 2 projects each
  const pairedProjects = [
    [projects[0], projects[1]],
    [projects[2], projects[3]],
    [projects[4], projects[5]],
  ];

  return (
    <section id="projects" className="py-28 px-6 bg-bg relative z-10 border-b border-border select-none">
      <div className="container mx-auto px-0 max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-serif-editorial font-normal mb-8 text-text tracking-tight">
          Selected Works
        </h2>

        {/* Gapless paired row grid */}
        <div className="flex flex-col border-t border-l border-r border-border mt-8">
          {pairedProjects.map((pair, rowIdx) => {
            const pA = pair[0];
            const pB = pair[1];

            // Determine if a card in this row is selected
            const isASelected = selectedId === pA.id;
            const isBSelected = selectedId === pB.id;

            // Compute desktop flex widths: 50/50 initially, 70/30 on selection
            let widthA = 'md:w-1/2';
            let widthB = 'md:w-1/2';

            if (isASelected) {
              widthA = 'md:w-[70%]';
              widthB = 'md:w-[30%]';
            } else if (isBSelected) {
              widthA = 'md:w-[30%]';
              widthB = 'md:w-[70%]';
            }

            return (
              <div 
                key={rowIdx} 
                className="flex flex-col md:flex-row w-full gap-0 border-b border-border last:border-b-0 relative overflow-hidden group/row"
                onMouseMove={handleMouseMove}
              >
                {/* Spotlight glow layer in dark mode */}
                <div 
                  className="absolute inset-0 pointer-events-none z-0 dark:block hidden transition-opacity duration-300 opacity-0 group-hover/row:opacity-100" 
                  style={{ 
                    background: 'radial-gradient(300px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(255, 255, 255, 0.03), transparent 80%)' 
                  }} 
                />
                {/* Card A */}
                <ProjectCard 
                  project={pA} 
                  idx={rowIdx * 2} 
                  widthClass={widthA} 
                  isExpanded={isASelected} 
                  isShrunk={isBSelected}
                  hasRightBorder={true}
                  onSelect={() => setSelectedId(isASelected ? null : pA.id)}
                />
                
                {/* Card B */}
                <ProjectCard 
                  project={pB} 
                  idx={rowIdx * 2 + 1} 
                  widthClass={widthB} 
                  isExpanded={isBSelected} 
                  isShrunk={isASelected}
                  hasRightBorder={false}
                  onSelect={() => setSelectedId(isBSelected ? null : pB.id)}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
