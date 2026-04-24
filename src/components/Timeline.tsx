import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { timeline } from '@/lib/data';
import { SectionLabel } from './ui/SectionLabel';

gsap.registerPlugin(ScrollTrigger);

export const Timeline = () => {
  const containerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray('.timeline-item') as HTMLElement[];

      items.forEach((item, i) => {
        const dot = item.querySelector('.timeline-dot');
        const content = item.querySelector('.timeline-content');
        const isLeft = i % 2 === 0;

        gsap.fromTo(content,
          { x: isLeft ? -40 : 40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
            }
          }
        );

        gsap.to(dot, {
          backgroundColor: 'var(--color-accent-2)',
          scale: 1.5,
          duration: 0.4,
          scrollTrigger: {
            trigger: item,
            start: 'top 50%',
            toggleActions: 'play none none reverse'
          }
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="timeline" ref={containerRef} className="py-24 px-6 text-text relative z-10">
      <div className="container mx-auto max-w-4xl">
        <SectionLabel number="04" text="Journey" />

        <div className="relative mt-16 max-w-3xl mx-auto">
          {/* Central line */}
          <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />

          <div className="flex flex-col gap-12 md:gap-24">
            {timeline.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={i}
                  className={`timeline-item relative flex items-start md:items-center w-full ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Dot — centered on the line */}
                  <div className="timeline-dot absolute left-[20px] md:left-1/2 top-[24px] md:top-1/2 w-3 h-3 rounded-full bg-border border-[3px] border-bg -translate-x-1/2 md:-translate-y-1/2 z-10 box-content will-change-transform" />

                  {/* Content block — one side only */}
                  <div
                    className={`timeline-content w-full pl-16 md:pl-0 md:w-1/2 ${
                      isLeft ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'
                    }`}
                  >
                    <div className="text-accent-2 font-mono text-sm mb-2">{item.year}</div>
                    <h4 className="text-xl font-semibold text-text mb-2">{item.title}</h4>
                    <p className="text-text-muted text-base leading-relaxed">{item.description}</p>
                  </div>

                  {/* Spacer for the other side */}
                  <div className="hidden md:block md:w-1/2" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
