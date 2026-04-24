import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Download, Github, Instagram, Keyboard, Linkedin, Mail } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';
import { MagneticButton } from './ui/MagneticButton';
import { personal } from '@/lib/data';

export const Hero = () => {
  const containerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-anim',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out', delay: 0.2 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" ref={containerRef} className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden">
      {/* Grainient is now in Index.tsx */}

      <div className="container relative z-10 mx-auto px-6 max-w-7xl">
        <div className="max-w-4xl">
          <h2 className="hero-anim text-4xl md:text-5xl font-bold text-text mb-6">
            Hey, I'm {personal.name}.
          </h2>

          <div className="hero-anim w-16 h-px bg-border mb-8" />

          <h1 className="hero-anim text-text font-bold tracking-tight leading-[0.9] mb-8" style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}>
            {personal.role}
          </h1>

          <p className="hero-anim text-text-muted text-lg md:text-xl max-w-[540px] leading-relaxed">
            {personal.bio}
          </p>

          <div className="hero-anim mt-12 flex flex-wrap items-center gap-3">
            <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 border border-border rounded-full px-5 py-2.5 text-sm font-medium text-text hover:bg-text hover:text-bg transition-all bg-surface">
              <Linkedin size={16} /> LinkedIn
            </a>
            <a href={personal.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 border border-border rounded-full px-5 py-2.5 text-sm font-medium text-text hover:bg-text hover:text-bg transition-all bg-surface">
              <Github size={16} /> GitHub
            </a>
            <a href={`mailto:${personal.email}`} className="flex items-center gap-2 border border-border rounded-full px-5 py-2.5 text-sm font-medium text-text hover:bg-text hover:text-bg transition-all bg-surface">
              <Mail size={16} /> Mail
            </a>
            <a href={personal.monkeytype} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 border border-border rounded-full px-5 py-2.5 text-sm font-medium text-text hover:bg-text hover:text-bg transition-all bg-surface">
              <Keyboard size={16} /> Monkeytype
            </a>
            <a href={personal.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 border border-border rounded-full px-5 py-2.5 text-sm font-medium text-text hover:bg-text hover:text-bg transition-all bg-surface">
              <Instagram size={16} /> Instagram
            </a>

            <MagneticButton className="ml-0 sm:ml-4 mt-4 sm:mt-0">
              <a href={personal.resumeUrl} download className="flex items-center gap-2 bg-text text-bg rounded-full px-6 py-3 text-sm font-medium hover:bg-text-muted transition-colors">
                <Download size={16} /> Resume
              </a>
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
};
