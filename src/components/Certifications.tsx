import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink } from 'lucide-react';
import { certifications } from '@/lib/data';
import { SectionLabel } from './ui/SectionLabel';

gsap.registerPlugin(ScrollTrigger);

export const Certifications = () => {
  const containerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const certRows = gsap.utils.toArray('.cert-row');
      
      gsap.fromTo(certRows, 
        { x: -30, opacity: 0 },
        { 
          x: 0, 
          opacity: 1, 
          duration: 0.6, 
          stagger: 0.1, 
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

  return (
    <section id="certifications" ref={containerRef} className="py-24 px-6 text-text relative z-10">
      <div className="container mx-auto max-w-4xl">
        <SectionLabel number="03" text="Certifications" />
        
        <div className="flex flex-col border-t border-border mt-8">
          {certifications.map((cert, i) => (
            <a 
              key={i} 
              href={cert.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="cert-row group flex flex-col sm:flex-row sm:items-center justify-between py-6 border-b border-border transition-transform duration-300 hover:translate-x-2"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-4">
                <h4 className="text-lg font-medium text-text transition-colors duration-300 group-hover:text-accent-2">
                  {cert.name}
                </h4>
                <span className="text-sm text-text-muted mt-1 sm:mt-0">
                  {cert.issuer}
                </span>
              </div>
              <div className="flex items-center gap-4 mt-4 sm:mt-0">
                <span className="text-sm text-text-muted font-mono">
                  {cert.year}
                </span>
                <ExternalLink size={16} className="text-accent-2 opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
