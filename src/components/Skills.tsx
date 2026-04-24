import React, { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skills, skillDefinitions } from '@/lib/data';
import { SectionLabel } from './ui/SectionLabel';
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
  Docker,
  Kubernetes,
  AWS,
  GoogleCloud,
  Git,
  Java,
  Lightroom,
} from 'developer-icons';
import { Terminal } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/** Map skill names to their developer-icons component */
const iconMap: Record<string, React.ReactNode> = {
  'PyTorch': <PyTorch size={28} />,
  'HuggingFace': <HuggingFace size={28} />,
  'Java': <Java size={28} />,
  'Lightroom': <Lightroom size={28} />,
  'Python': <Python size={28} />,
  'TypeScript': <TypeScript size={28} />,
  'JavaScript': <JavaScript size={28} />,
  'C++': <CPlusPlus size={28} />,
  'Next.js': <NextJs size={28} />,
  'React': <ReactIcon size={28} />,
  'Tailwind CSS': <TailwindCSS size={28} />,
  'Node.js': <NodeJs size={28} />,
  'Firebase': <Firebase size={28} />,
  'PostgreSQL': <PostgreSQL size={28} />,
  'MongoDB': <MongoDB size={28} />,
  'Docker': <Docker size={28} />,
  'Kubernetes': <Kubernetes size={28} />,
  'AWS': <AWS size={28} />,
  'GCP': <GoogleCloud size={28} />,
  'Git': <Git size={28} />,
};

const getIcon = (name: string): React.ReactNode => {
  return iconMap[name] || <Terminal size={28} />;
};

export const Skills = () => {
  const containerRef = useRef<HTMLElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const skillCards = gsap.utils.toArray('.skill-card');

      gsap.fromTo(skillCards,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.05,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // Animate tooltip in/out
  useLayoutEffect(() => {
    if (!tooltipRef.current) return;
    if (selectedSkill) {
      gsap.fromTo(tooltipRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: 'power3.out' }
      );
    } else {
      gsap.to(tooltipRef.current, { y: 20, opacity: 0, duration: 0.25, ease: 'power2.in' });
    }
  }, [selectedSkill]);

  const handleSkillClick = (skill: string) => {
    setSelectedSkill(prev => prev === skill ? null : skill);
  };

  return (
    <section id="skills" ref={containerRef} className="py-24 px-6 text-text relative z-10">
      <div className="container mx-auto max-w-5xl">
        <SectionLabel number="02" text="Tech Stack" />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {skills.map((skill) => (
            <button
              key={skill}
              onClick={() => handleSkillClick(skill)}
              className={`skill-card rounded-xl border p-6 bg-surface backdrop-blur-sm hover:border-accent-2 hover:text-accent-2 transition-all flex flex-col items-center justify-center text-center gap-4 group cursor-pointer ${
                selectedSkill === skill
                  ? 'border-accent-2 text-accent-2 ring-1 ring-accent-2/30'
                  : 'border-border'
              }`}
            >
              <div className={`transition-colors duration-300 ${
                selectedSkill === skill ? 'text-accent-2' : 'text-text-muted group-hover:text-accent-2'
              }`}>
                {getIcon(skill)}
              </div>
              <span className={`font-medium text-sm transition-colors duration-300 ${
                selectedSkill === skill ? 'text-accent-2' : 'text-text group-hover:text-accent-2'
              }`}>
                {skill}
              </span>
            </button>
          ))}
        </div>

        {/* Skill Definition Tooltip */}
        <div
          ref={tooltipRef}
          className={`mt-8 rounded-xl border border-accent-2/30 bg-surface backdrop-blur-md p-6 flex items-center gap-5 ${
            selectedSkill ? 'pointer-events-auto' : 'pointer-events-none opacity-0'
          }`}
        >
          {selectedSkill && (
            <>
              <div className="shrink-0 text-accent-2">
                {getIcon(selectedSkill)}
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-text font-semibold text-base">{selectedSkill}</span>
                <span className="text-text-muted text-sm leading-relaxed">
                  {skillDefinitions[selectedSkill] || 'A modern developer tool.'}
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};
