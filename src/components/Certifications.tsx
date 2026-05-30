import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink } from './ui/Icons';
import { certifications } from '@/lib/data';

gsap.registerPlugin(ScrollTrigger);

export const Certifications = () => {
  const containerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const certRows = gsap.utils.toArray('.cert-row');
      
      gsap.fromTo(certRows, 
        { x: -16, opacity: 0 },
        { 
          x: 0, 
          opacity: 1, 
          duration: 0.6, 
          stagger: 0.08, 
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
    <section id="certifications" ref={containerRef} className="py-28 px-6 bg-bg relative z-10 border-b border-border">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-serif-editorial font-normal mb-8 text-text tracking-tight">Certifications</h2>
        
        <div className="flex flex-col border-t border-border mt-8">
          {certifications.map((cert, i) => (
            <a 
              key={i} 
              href={cert.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="cert-row group flex flex-col sm:flex-row sm:items-center justify-between py-6 border-b border-border transition-all duration-300 hover:pl-2 select-none"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-4">
                <h4 className="text-xl font-serif-editorial font-normal text-text-muted transition-colors duration-200 group-hover:text-text leading-tight">
                  {cert.name}
                </h4>
                <span className="text-xs font-mono-tech text-text-muted mt-1.5 sm:mt-0 uppercase tracking-wider">
                  {cert.issuer}
                </span>
              </div>
              <div className="flex items-center gap-4 mt-4 sm:mt-0">
                <span className="text-xs text-text-muted font-mono-tech">
                  {cert.year}
                </span>
                <ExternalLink 
                  size={14} 
                  className="text-text opacity-0 -translate-x-3 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" 
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
