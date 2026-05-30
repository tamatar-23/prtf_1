import React, { useState, useMemo } from 'react';
import { skills, skillDefinitions } from '@/lib/data';
import { Terminal, Search } from './ui/Icons';
import {
  PyTorch,
  HuggingFace,
  Python,
  TypeScript,
  JavaScript,
  CPlusPlus,
  NextJs,
  React as ReactIcon,
  TailwindCSS,
  NodeJs,
  Firebase,
  PostgreSQL,
  MongoDB,
  Redis,
  Docker,
  Kubernetes,
  AWS,
  GoogleCloud,
  Git,
  Java,
  Lightroom,
} from 'developer-icons';

/** Map skill names to their developer-icons component */
const iconMap: Record<string, React.ReactNode> = {
  'PyTorch': <PyTorch size={24} />,
  'HuggingFace': <HuggingFace size={24} />,
  'Java': <Java size={24} />,
  'Lightroom': <Lightroom size={24} />,
  'Python': <Python size={24} />,
  'TypeScript': <TypeScript size={24} />,
  'JavaScript': <JavaScript size={24} />,
  'C++': <CPlusPlus size={24} />,
  'Next.js': <NextJs size={24} />,
  'React': <ReactIcon size={24} />,
  'Tailwind CSS': <TailwindCSS size={24} />,
  'Node.js': <NodeJs size={24} />,
  'Firebase': <Firebase size={24} />,
  'PostgreSQL': <PostgreSQL size={24} />,
  'MongoDB': <MongoDB size={24} />,
  'Redis': <Redis size={24} />,
  'Docker': <Docker size={24} />,
  'Kubernetes': <Kubernetes size={24} />,
  'AWS': <AWS size={24} />,
  'GCP': <GoogleCloud size={24} />,
  'Git': <Git size={24} />,
};

const getIcon = (name: string): React.ReactNode => {
  return iconMap[name] || <Terminal size={24} />;
};

const skillDomains: Record<string, string> = {
  PyTorch: 'Intelligence',
  HuggingFace: 'Intelligence',
  Python: 'System',
  'C++': 'System',
  Java: 'System',
  Git: 'System',
  TypeScript: 'Frontend',
  JavaScript: 'Frontend',
  React: 'Frontend',
  'Next.js': 'Frontend',
  'Tailwind CSS': 'Frontend',
  Lightroom: 'Frontend',
  'Node.js': 'Backend',
  Firebase: 'Backend',
  PostgreSQL: 'Backend',
  MongoDB: 'Backend',
  Redis: 'Backend',
  Docker: 'Infrastructure',
  Kubernetes: 'Infrastructure',
  AWS: 'Infrastructure',
  GCP: 'Infrastructure',
};

export const Skills = () => {
  const [search, setSearch] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<string>('All');
  const [selectedSkill, setSelectedSkill] = useState<string>('PyTorch');

  const domains = ['All', 'Intelligence', 'System', 'Frontend', 'Backend', 'Infrastructure'];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  // Filter skills list based on search query and selected filter domain
  const filteredSkills = useMemo(() => {
    return skills.filter(skill => {
      const domain = skillDomains[skill] || '';
      const definition = skillDefinitions[skill] || '';
      const matchesSearch = skill.toLowerCase().includes(search.toLowerCase()) || 
                            definition.toLowerCase().includes(search.toLowerCase()) ||
                            domain.toLowerCase().includes(search.toLowerCase());
      const matchesDomain = selectedDomain === 'All' || domain === selectedDomain;
      return matchesSearch && matchesDomain;
    });
  }, [search, selectedDomain]);

  return (
    <section id="skills" className="py-28 px-6 bg-bg relative z-10 border-b border-border select-none">
      <div className="container mx-auto px-0 max-w-5xl">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-12 gap-4">
          <h2 className="text-3xl md:text-4xl font-serif-editorial font-normal text-text tracking-tight">
            Skills
          </h2>
          <span className="text-[10px] font-mono-tech text-text-muted uppercase tracking-widest">
            Specification Directory
          </span>
        </div>

        {/* Directory Controls (Search & Filter) */}
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between pb-8 border-b border-border/50">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
              <Search size={14} />
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="FILTER SKILLS..."
              className="bg-bg border border-border pl-9 pr-4 py-2 font-mono-tech text-xs w-full rounded-[6px] outline-none text-text focus:border-text transition-colors duration-200"
            />
          </div>

          {/* Quick Domain Filters */}
          <div className="flex flex-wrap gap-1.5 items-center">
            {domains.map((dom) => {
              const isActive = selectedDomain === dom;
              return (
                <button
                  key={dom}
                  onClick={() => setSelectedDomain(dom)}
                  className={`px-3 py-1.5 text-[9px] font-mono-tech uppercase tracking-wider rounded-full border transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'bg-text text-bg border-text'
                      : 'bg-bg-elevated text-text-muted border-border hover:border-text-muted'
                  }`}
                >
                  {dom}
                </button>
              );
            })}
          </div>
        </div>

        {/* Skills Adjacent Grid Tiles (Vercel-Style) */}
        <div className="mt-8">
          {filteredSkills.length > 0 ? (
            <div 
              className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-0 border-t border-l border-border relative overflow-hidden group/skills-grid"
              onMouseMove={handleMouseMove}
            >
              {/* Spotlight glow layer in dark mode */}
              <div 
                className="absolute inset-0 pointer-events-none z-0 dark:block hidden transition-opacity duration-300 opacity-0 group-hover/skills-grid:opacity-100" 
                style={{ 
                  background: 'radial-gradient(300px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(255, 255, 255, 0.03), transparent 80%)' 
                }} 
              />
              {filteredSkills.map((skill) => {
                const domain = skillDomains[skill] || 'System';
                const isCurrent = selectedSkill === skill;
                
                return (
                  <div
                    key={skill}
                    onMouseEnter={() => setSelectedSkill(skill)}
                    onClick={() => setSelectedSkill(skill)}
                    className={`group aspect-square flex flex-col items-center justify-center border-r border-b border-border transition-all duration-150 cursor-pointer rounded-none relative z-10 ${
                      isCurrent
                        ? 'bg-bg-warm dark:bg-[#161615]/30 backdrop-blur-[1px]'
                        : 'bg-bg-elevated dark:bg-[#1C1C1B]/40 backdrop-blur-[1px] hover:bg-bg-warm/50 dark:hover:bg-[#161615]/20'
                    }`}
                  >
                    {/* Centered Icon and Name layout */}
                    <div className="flex flex-col items-center justify-center gap-2.5 p-2">
                      <span className="text-text transition-transform duration-200 group-hover:scale-110">
                        {getIcon(skill)}
                      </span>
                      <span className="text-[10px] font-mono-tech text-text-muted group-hover:text-text uppercase tracking-wider transition-colors duration-150 text-center leading-none">
                        {skill}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 gap-2 border border-border border-dashed">
              <span className="font-mono-tech text-xs text-text-muted select-none">
                ERR: No matching directories found.
              </span>
            </div>
          )}
        </div>

        {/* Technical Definition Console Panel */}
        <div className="mt-8 rounded-[12px] border border-border bg-bg-warm p-6 md:p-8 flex items-stretch gap-6 transition-all duration-300">
          {selectedSkill ? (
            <>
              {/* Monospace prompt cursor symbol */}
              <div className="shrink-0 text-text hidden sm:flex items-center justify-center p-3 border border-border bg-bg-elevated rounded-[6px] h-11 w-11 select-none font-mono-tech text-sm font-bold animate-pulse">
                {`>_`}
              </div>
              
              {/* Text content details */}
              <div className="flex flex-col gap-1 justify-center">
                <span className="text-text font-mono-tech font-bold text-xs uppercase tracking-wider select-none">
                  {selectedSkill}
                </span>
                <p className="text-text-muted text-xs md:text-sm leading-relaxed">
                  {skillDefinitions[selectedSkill]}
                </p>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2 font-mono-tech text-xs text-text-muted select-none">
              <Terminal size={14} />
              <span>Select any capability tile above to inspect technical specs.</span>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
