import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, GithubLogo } from '@phosphor-icons/react';
import { Project, projects } from '@/lib/data';
import { Reveal } from '@/components/ui/Reveal';

const ROW_SPRING = {
  type: 'spring' as const,
  stiffness: 360,
  damping: 28,
  mass: 0.75,
};

interface ProjectCellProps {
  project: Project;
  featured?: boolean;
  flexClass: string;
  isHovered: boolean;
  isDimmed: boolean;
  reduceMotion: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  className?: string;
}

const ProjectCell: React.FC<ProjectCellProps> = ({
  project,
  featured = false,
  flexClass,
  isHovered,
  isDimmed,
  reduceMotion,
  onHoverStart,
  onHoverEnd,
  className = '',
}) => {
  const visibleHighlights = featured
    ? project.highlights
    : project.highlights.slice(0, 2);

  const openRepo = () => {
    window.open(project.repoUrl, '_blank', 'noopener,noreferrer');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openRepo();
    }
  };

  return (
    <motion.article
      layout={!reduceMotion}
      transition={ROW_SPRING}
      whileTap={reduceMotion ? undefined : { scale: 0.992 }}
      role="link"
      tabIndex={0}
      aria-label={`Open ${project.title} GitHub repository`}
      onClick={openRepo}
      onKeyDown={handleKeyDown}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      onFocus={onHoverStart}
      onBlur={onHoverEnd}
      className={`group relative flex min-w-0 cursor-pointer flex-col justify-between p-7 md:p-8 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-text/30 ${flexClass} ${
        isHovered
          ? 'bg-bg-warm'
          : isDimmed
            ? 'bg-bg-elevated opacity-85'
            : 'bg-bg-elevated'
      } ${className}`}
    >
      <motion.div layout={reduceMotion ? false : 'position'}>
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="text-lg font-medium tracking-tight text-text md:text-xl">
              {project.title}
            </h3>
            <p className="mt-1 font-mono text-xs text-text-muted">
              {project.subtitle}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-1.5">
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              aria-label={`${project.title} repository`}
              title="Open GitHub repository"
              className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-bg text-text-muted transition-colors duration-150 group-hover:border-text/30 group-hover:text-text active:scale-[0.98]"
            >
              <GithubLogo size={15} weight="regular" />
            </a>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                aria-label={`${project.title} live site`}
                title="Open live site"
                className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-bg text-text-muted transition-colors duration-150 hover:border-text/40 hover:text-text active:scale-[0.98]"
              >
                <ArrowUpRight size={15} weight="regular" />
              </a>
            )}
          </div>
        </div>

        <p className="mt-4 max-w-[58ch] text-sm leading-relaxed text-text-muted">
          {project.description}
        </p>

        <ul className="mt-5 space-y-2 border-t border-border pt-4">
          {visibleHighlights.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2.5 text-xs leading-relaxed text-text-muted"
            >
              <span
                className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-text-muted/60"
                aria-hidden="true"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      <motion.div
        layout={reduceMotion ? false : 'position'}
        className="mt-6 flex flex-wrap items-center gap-1.5 pt-2"
      >
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md border border-border bg-bg-warm px-2 py-0.5 font-mono text-[11px] text-text-muted"
          >
            {tag}
          </span>
        ))}
      </motion.div>
    </motion.article>
  );
};

export const Projects: React.FC = () => {
  const reduceMotion = Boolean(useReducedMotion());
  const [hoveredRow1, setHoveredRow1] = useState<string | null>(null);
  const [hoveredRow2, setHoveredRow2] = useState<string | null>(null);

  const [first, second, third, fourth, fifth] = projects;

  const getRow1Flex = (id: string, defaultClass: string) => {
    if (reduceMotion || !hoveredRow1) return defaultClass;
    return hoveredRow1 === id ? 'md:flex-[1.45]' : 'md:flex-[0.75]';
  };

  const getRow2Flex = (id: string) => {
    if (reduceMotion || !hoveredRow2) return 'md:flex-1';
    return hoveredRow2 === id ? 'md:flex-[1.35]' : 'md:flex-[0.85]';
  };

  return (
    <section id="works" className="border-b border-border bg-bg py-24 md:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <div className="mb-10 flex flex-col gap-2">
            <h2 className="text-2xl font-medium tracking-tight text-text md:text-3xl">
              Selected Works
            </h2>
            <p className="max-w-[54ch] text-sm leading-relaxed text-text-muted">
              Production web products, agentic pipelines, and ML systems. Click any card to open its repository.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="overflow-hidden rounded-md border border-border bg-bg-elevated">
            {/* Row 1: Hover-flex spring flagship AI split */}
            <div
              className="flex flex-col border-b border-border md:flex-row"
              onMouseLeave={() => setHoveredRow1(null)}
            >
              <ProjectCell
                project={first}
                featured
                flexClass={getRow1Flex(first.id, 'md:flex-[1.15]')}
                isHovered={hoveredRow1 === first.id}
                isDimmed={hoveredRow1 !== null && hoveredRow1 !== first.id}
                reduceMotion={reduceMotion}
                onHoverStart={() => setHoveredRow1(first.id)}
                onHoverEnd={() => setHoveredRow1((cur) => (cur === first.id ? null : cur))}
                className="border-b border-border md:border-b-0 md:border-r"
              />
              <ProjectCell
                project={second}
                featured
                flexClass={getRow1Flex(second.id, 'md:flex-[0.85]')}
                isHovered={hoveredRow1 === second.id}
                isDimmed={hoveredRow1 !== null && hoveredRow1 !== second.id}
                reduceMotion={reduceMotion}
                onHoverStart={() => setHoveredRow1(second.id)}
                onHoverEnd={() => setHoveredRow1((cur) => (cur === second.id ? null : cur))}
              />
            </div>

            {/* Row 2: Hover-flex spring 3-card product row */}
            <div
              className="flex flex-col md:flex-row"
              onMouseLeave={() => setHoveredRow2(null)}
            >
              {[third, fourth, fifth].map((project, idx) => (
                <ProjectCell
                  key={project.id}
                  project={project}
                  flexClass={getRow2Flex(project.id)}
                  isHovered={hoveredRow2 === project.id}
                  isDimmed={hoveredRow2 !== null && hoveredRow2 !== project.id}
                  reduceMotion={reduceMotion}
                  onHoverStart={() => setHoveredRow2(project.id)}
                  onHoverEnd={() =>
                    setHoveredRow2((cur) => (cur === project.id ? null : cur))
                  }
                  className={
                    idx < 2 ? 'border-b border-border md:border-b-0 md:border-r' : ''
                  }
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
