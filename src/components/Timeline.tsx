import React from 'react';
import { ArrowUpRight } from '@phosphor-icons/react';
import { credentials, timeline } from '@/lib/data';
import { Reveal } from '@/components/ui/Reveal';

export const Timeline: React.FC = () => {
  return (
    <section id="journey" className="cv-auto bg-bg py-24 md:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-12 md:gap-12">
          {/* Left column: Journey timeline */}
          <div className="md:col-span-7">
            <Reveal>
              <h2 className="mb-10 text-2xl font-medium tracking-tight text-text md:text-3xl">
                Journey
              </h2>
            </Reveal>

            <div className="relative space-y-10">
              {/* Vertical rail anchored cleanly at the center of the first dot */}
              <div
                className="pointer-events-none absolute left-[5px] top-[11px] bottom-2 z-0 w-px bg-border"
                aria-hidden="true"
              />

              {timeline.map((item, idx) => (
                <Reveal key={item.title} delay={idx * 0.04}>
                  <div className="relative pl-7 md:pl-9">
                    <span
                      className="absolute left-0 top-[5px] z-10 h-[11px] w-[11px] rounded-full border-[1.5px] border-text bg-bg"
                      aria-hidden="true"
                    />
                    <span className="block font-mono text-xs text-text-muted">
                      {item.year}
                    </span>

                    {item.url ? (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1.5 inline-flex items-center gap-1.5 text-lg font-medium tracking-tight text-text transition-opacity duration-150 hover:opacity-75"
                      >
                        <span>{item.title}</span>
                        <ArrowUpRight size={15} weight="regular" />
                      </a>
                    ) : (
                      <h3 className="mt-1.5 text-lg font-medium tracking-tight text-text">
                        {item.title}
                      </h3>
                    )}

                    <p className="mt-2 max-w-[54ch] text-sm leading-relaxed text-text-muted">
                      {item.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Right column: Curated credentials */}
          <div className="md:col-span-5">
            <Reveal>
              <h2 className="mb-10 text-2xl font-medium tracking-tight text-text md:text-3xl">
                Credentials
              </h2>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="divide-y divide-border border-y border-border">
                {credentials.map((cert) => (
                  <a
                    key={cert.name}
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start justify-between gap-4 py-4 transition-colors duration-150"
                  >
                    <div>
                      <p className="text-sm font-medium leading-snug text-text transition-opacity duration-150 group-hover:opacity-75">
                        {cert.name}
                      </p>
                      <p className="mt-1 font-mono text-xs text-text-muted">
                        {cert.issuer} · {cert.year}
                      </p>
                    </div>
                    <ArrowUpRight
                      size={15}
                      weight="regular"
                      className="mt-0.5 shrink-0 text-text-muted transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-text"
                    />
                  </a>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};
