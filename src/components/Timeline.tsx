import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { timeline } from '@/lib/data';

gsap.registerPlugin(ScrollTrigger);

export const Timeline = () => {
  const containerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray('.timeline-item') as HTMLElement[];

      items.forEach((item) => {
        const dot = item.querySelector('.timeline-dot');
        const content = item.querySelector('.timeline-content');

        gsap.fromTo(content,
          { y: 16, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 90%',
            }
          }
        );

        gsap.fromTo(dot,
          { scale: 0.8, opacity: 0.4 },
          {
            scale: 1,
            opacity: 1,
            borderColor: 'var(--color-text)',
            backgroundColor: 'var(--color-bg)',
            duration: 0.4,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 90%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="timeline" ref={containerRef} className="py-28 px-6 bg-bg text-text relative z-10 border-b border-border">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-serif-editorial font-normal mb-12 text-text tracking-tight">
          Journey
        </h2>

        {/* Left-aligned vertical flow (Vercel & Claude inspired) */}
        <div className="relative pl-8 md:pl-12 ml-2 md:ml-4 flex flex-col gap-12 pb-8">
          {/* Vertical track line */}
          <div className="absolute left-0 top-2 bottom-0 w-px bg-border select-none" />

          {timeline.map((item, i) => (
            <div
              key={i}
              className="timeline-item relative flex flex-col items-start w-full group"
            >
              {/* Dot - pinned on the left line */}
              <div className="timeline-dot absolute -left-[39px] md:-left-[55px] top-1.5 w-3.5 h-3.5 rounded-full bg-bg border-2 border-border z-10 transition-all duration-300 group-hover:border-text" />

              {/* Text content block */}
              <div className="timeline-content w-full flex flex-col items-start">
                {/* Year Label - Monospace */}
                <span className="text-xs font-mono-tech text-text-muted mb-2 select-none tracking-wide">
                  [{item.year}]
                </span>
                
                {/* Title */}
                {item.url ? (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline text-text group-hover:text-text-muted transition-colors duration-200"
                  >
                    <h4 className="text-xl font-serif-editorial font-normal mb-2 leading-tight">
                      {item.title}
                    </h4>
                  </a>
                ) : (
                  <h4 className="text-xl font-serif-editorial font-normal text-text mb-2 transition-colors duration-200 group-hover:text-text-muted leading-tight">
                    {item.title}
                  </h4>
                )}
                
                {/* Description */}
                <p className="text-text-muted text-sm md:text-base leading-relaxed font-sans max-w-2xl">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
