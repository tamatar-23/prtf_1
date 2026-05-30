import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Download, Github, Instagram, Keyboard, Linkedin, Mail, Spotify } from './ui/Icons';
import { personal } from '@/lib/data';

export const Hero = () => {
  const containerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-anim',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: 'power3.out', delay: 0.1 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" ref={containerRef} className="relative min-h-[100dvh] flex items-center pt-24 pb-20 overflow-hidden bg-bg">
      <div className="container relative z-10 mx-auto px-6 max-w-5xl">
        <div className="max-w-4xl">
          <h2 className="hero-anim text-2xl md:text-3xl font-normal text-text-muted mb-4 font-serif-editorial italic select-none">
            Gourav Mishra
          </h2>

          <h1 className="hero-anim text-text font-serif-editorial tracking-tight leading-[1.05] mb-8 font-normal" style={{ fontSize: 'clamp(3.5rem, 8.5vw, 6.5rem)' }}>
            Full Stack AI Developer
          </h1>

          <p className="hero-anim text-text-muted text-lg md:text-xl max-w-2xl leading-relaxed font-sans mb-10">
            I write clean code that connects AI models to web applications. I build reliable backends and fast user interfaces.
          </p>

          {/* Social Links & CTA Buttons */}
          <div className="hero-anim flex flex-wrap items-center gap-3 mb-12">
            {/* Primary Action Button */}
            <a 
              href={personal.resumeUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 bg-text text-bg border border-text rounded-[6px] px-6 py-3 text-sm font-medium transition-all duration-200 hover:bg-[#333333] active:scale-98"
            >
              <Download size={16} strokeWidth={2.4} /> Download Resume
            </a>

            {/* Secondary Social Buttons */}
            <a 
              href={personal.linkedin} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 border border-border rounded-[6px] px-5 py-3 text-sm font-medium text-text bg-bg-elevated hover:bg-bg-warm transition-all duration-200 active:scale-98"
            >
              <Linkedin size={16} /> LinkedIn
            </a>
            
            <a 
              href={personal.github} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 border border-border rounded-[6px] px-5 py-3 text-sm font-medium text-text bg-bg-elevated hover:bg-bg-warm transition-all duration-200 active:scale-98"
            >
              <Github size={16} /> GitHub
            </a>

            <a 
              href="https://open.spotify.com/user/7da8gcgxxzb4w0d6fbuhu32wk" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 border border-border rounded-[6px] px-5 py-3 text-sm font-medium text-text bg-bg-elevated hover:bg-bg-warm transition-all duration-200 active:scale-98"
            >
              <Spotify size={16} /> Spotify
            </a>

            <a 
              href={`mailto:${personal.email}`} 
              className="flex items-center gap-2 border border-border rounded-[6px] px-5 py-3 text-sm font-medium text-text bg-bg-elevated hover:bg-bg-warm transition-all duration-200 active:scale-98"
            >
              <Mail size={16} /> Mail
            </a>

            <a 
              href={personal.monkeytype} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 border border-border rounded-[6px] px-5 py-3 text-sm font-medium text-text bg-bg-elevated hover:bg-bg-warm transition-all duration-200 active:scale-98 hidden sm:inline-flex"
            >
              <Keyboard size={16} /> Monkeytype
            </a>

            <a 
              href={personal.instagram} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 border border-border rounded-[6px] px-5 py-3 text-sm font-medium text-text bg-bg-elevated hover:bg-bg-warm transition-all duration-200 active:scale-98 hidden sm:inline-flex"
            >
              <Instagram size={16} /> Instagram
            </a>
          </div>

          {/* Keystroke Micro-UI Shortcut Bar */}
          <div className="hero-anim inline-flex flex-wrap items-center gap-x-4 gap-y-2 border border-border bg-bg-warm rounded-[8px] px-4 py-2.5 text-xs text-text-muted font-mono-tech select-none">
            <span className="font-semibold text-text uppercase tracking-wider text-[10px]">Shortcuts</span>
            <div className="h-3 w-px bg-border hidden sm:block" />
            <div className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 border border-border rounded bg-bg text-[10px] shadow-sm font-bold">T</kbd>
              <span>Toggle Theme</span>
            </div>
            <div className="h-1 w-1 rounded-full bg-border" />
            <div className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 border border-border rounded bg-bg text-[10px] shadow-sm font-bold">M</kbd>
              <span>Open Menu</span>
            </div>
            <div className="h-1 w-1 rounded-full bg-border" />
            <div className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 border border-border rounded bg-bg text-[10px] shadow-sm font-bold">G</kbd>
              <span>GitHub</span>
            </div>
            <div className="h-1 w-1 rounded-full bg-border" />
            <div className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 border border-border rounded bg-bg text-[10px] shadow-sm font-bold">L</kbd>
              <span>LinkedIn</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
