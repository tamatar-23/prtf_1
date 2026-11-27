import React from 'react';
import { ArrowUp, ArrowUpRight } from '@phosphor-icons/react';
import { personal } from '@/lib/data';
import { TamatarAscii } from '@/components/ui/TamatarAscii';

const socialLinks = [
  { label: 'GitHub', href: personal.github },
  { label: 'LinkedIn', href: personal.linkedin },
  { label: 'Spotify', href: personal.spotify },
  { label: 'Monkeytype', href: personal.monkeytype },
  { label: 'Instagram', href: personal.instagram },
];

const shortcuts = [
  { key: 'T', label: 'Theme' },
  { key: 'G', label: 'GitHub' },
  { key: 'L', label: 'LinkedIn' },
  { key: 'I', label: 'Instagram' },
  { key: 'R', label: 'Resume' },
];

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="overflow-hidden border-t border-border bg-bg pt-24 pb-0 md:pt-32">
      <div className="mx-auto max-w-5xl px-6">
        {/* Tier 1: Brand, contact CTA & primary social links */}
        <div className="flex flex-col justify-between gap-10 border-b border-border pb-12 md:flex-row md:items-end">
          <div className="flex flex-col gap-2">
            <span className="text-base font-medium tracking-tight text-text">
              {personal.name}
            </span>
            <p className="text-sm text-text-muted">
              Full-stack engineering &amp; LLM orchestration.
            </p>
            <a
              href={`mailto:${personal.email}`}
              className="mt-2 inline-flex w-fit items-center gap-1 text-sm font-medium text-text transition-opacity duration-150 hover:opacity-75"
            >
              <span>Get in touch</span>
              <ArrowUpRight size={14} weight="regular" />
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-text-muted">
            {socialLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-150 hover:text-text"
              >
                {item.label}
              </a>
            ))}
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              className="inline-flex items-center gap-1 border-l border-border pl-5 font-mono text-xs text-text transition-opacity duration-150 hover:opacity-75"
            >
              <ArrowUp size={13} weight="regular" />
              <span>Top</span>
            </button>
          </div>
        </div>

        {/* Tier 2: Keyboard shortcuts & copyright */}
        <div className="flex flex-col items-start justify-between gap-4 pt-8 sm:flex-row sm:items-center">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] text-text-muted">
            {shortcuts.map((item) => (
              <span key={item.key} className="inline-flex items-center gap-1.5">
                <kbd className="rounded border border-border bg-bg-elevated px-1.5 py-0.5 text-[10px] font-medium text-text">
                  {item.key}
                </kbd>
                <span>{item.label}</span>
              </span>
            ))}
          </div>

          <p className="font-mono text-[11px] text-text-muted">
            © {new Date().getFullYear()} {personal.name}
          </p>
        </div>
      </div>

      {/* High-density animated italic pure-ASCII #tamatar cropped at bottom edge */}
      <TamatarAscii />
    </footer>
  );
};
