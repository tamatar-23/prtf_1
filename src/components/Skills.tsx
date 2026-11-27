import React from 'react';
import { Terminal } from '@phosphor-icons/react';
import {
  AWS,
  CPlusPlus,
  Docker,
  Firebase,
  Git,
  GoogleCloud,
  HuggingFace,
  Java,
  JavaScript,
  Kubernetes,
  MongoDB,
  NextJs,
  NodeJs,
  PostgreSQL,
  PyTorch,
  Python,
  React as ReactIcon,
  Redis,
  Spring,
  TailwindCSS,
  TypeScript,
} from 'developer-icons';
import { skills } from '@/lib/data';
import { Reveal } from '@/components/ui/Reveal';

const iconMap: Record<string, React.ReactNode> = {
  Python: <Python size={20} />,
  React: <ReactIcon size={20} />,
  TypeScript: <TypeScript size={20} />,
  PostgreSQL: <PostgreSQL size={20} />,
  'Spring Boot': <Spring size={20} />,
  Docker: <Docker size={20} />,
  Git: <Git size={20} />,
  PyTorch: <PyTorch size={20} />,
  HuggingFace: <HuggingFace size={20} />,
  'Next.js': <NextJs size={20} />,
  JavaScript: <JavaScript size={20} />,
  'Tailwind CSS': <TailwindCSS size={20} />,
  'Node.js': <NodeJs size={20} />,
  MongoDB: <MongoDB size={20} />,
  Redis: <Redis size={20} />,
  Firebase: <Firebase size={20} />,
  Kubernetes: <Kubernetes size={20} />,
  AWS: <AWS size={20} />,
  GCP: <GoogleCloud size={20} />,
  'C++': <CPlusPlus size={20} />,
  Java: <Java size={20} />,
};

export const Skills: React.FC = () => {
  return (
    <section id="stack" className="cv-auto border-b border-border bg-bg py-24 md:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <div className="mb-10 flex flex-col gap-2">
            <h2 className="text-2xl font-medium tracking-tight text-text md:text-3xl">
              Capabilities
            </h2>
            <p className="max-w-[54ch] text-sm leading-relaxed text-text-muted">
              Core tools across full-stack web engineering, AI orchestration, and cloud infrastructure.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="overflow-hidden rounded-md border-t border-l border-border">
            <div className="grid grid-cols-3 sm:grid-cols-7">
              {skills.map((skill) => (
                <div
                  key={skill}
                  className="group flex aspect-square flex-col items-center justify-center gap-2.5 border-r border-b border-border bg-bg-elevated px-2 py-3 transition-colors duration-150 hover:bg-bg-warm"
                >
                  <span
                    className="inline-flex items-center justify-center text-text transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110"
                    style={{ transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}
                  >
                    {iconMap[skill] ?? <Terminal size={20} weight="regular" />}
                  </span>
                  <span className="font-mono text-[10px] sm:text-[11px] text-text-muted transition-colors duration-150 group-hover:text-text text-center leading-tight">
                    {skill}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
