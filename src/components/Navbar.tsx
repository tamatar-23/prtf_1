import React, { useEffect, useState } from 'react';
import { ArrowUpRight, List, Moon, Sun, X } from '@phosphor-icons/react';
import { personal } from '@/lib/data';
import { useTheme } from '@/hooks/use-theme';

const navLinks = [
  { label: 'Works', href: '#works' },
  { label: 'Stack', href: '#stack' },
  { label: 'Activity', href: '#github' },
  { label: 'Journey', href: '#journey' },
];

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const scrollToTop = () => {
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 h-16 border-b border-border nav-glass">
      <div className="relative flex h-full w-full items-center justify-between px-5 sm:px-8">
        {/* Far left: tomato scroll-to-top mark */}
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll to top"
          title={personal.name}
          className="group inline-flex h-9 w-9 items-center justify-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text/30"
        >
          <span
            className="inline-block text-xl leading-none transition-transform duration-200 ease-out group-hover:scale-110 group-hover:rotate-[8deg] group-active:scale-95"
            aria-hidden="true"
          >
            🍅
          </span>
        </button>

        {/* Centered desktop single-line navigation */}
        <nav
          className="hidden md:flex items-center gap-7 absolute left-1/2 -translate-x-1/2"
          aria-label="Primary navigation"
        >
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-text-muted transition-colors duration-150 hover:text-text whitespace-nowrap"
            >
              {item.label}
            </a>
          ))}

          <a
            href={personal.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-text-muted transition-colors duration-150 hover:text-text whitespace-nowrap"
          >
            <span>Resume</span>
            <ArrowUpRight size={14} weight="regular" />
          </a>
        </nav>

        {/* Far right: Theme toggle (+ mobile menu trigger on small screens) */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={(e) => toggleTheme(e)}
            aria-label="Toggle theme"
            title="Toggle theme (T)"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-bg-elevated text-text transition-colors duration-150 hover:bg-bg-warm active:scale-[0.98]"
          >
            {theme === 'dark' ? (
              <Sun size={16} weight="regular" />
            ) : (
              <Moon size={16} weight="regular" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            className="inline-flex md:hidden h-9 w-9 items-center justify-center rounded-md border border-border bg-bg-elevated text-text transition-colors duration-150 hover:bg-bg-warm active:scale-[0.98]"
          >
            {mobileOpen ? <X size={16} weight="regular" /> : <List size={16} weight="regular" />}
          </button>
        </div>
      </div>

      {/* Conditionally mounted mobile sheet (zero idle offscreen blur layers) */}
      {mobileOpen && (
        <div className="md:hidden border-b border-border bg-bg px-6 py-5">
          <nav className="flex flex-col gap-3" aria-label="Mobile navigation">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="py-1 text-base font-medium text-text-muted transition-colors duration-150 hover:text-text"
              >
                {item.label}
              </a>
            ))}
            <a
              href={personal.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="inline-flex items-center gap-1.5 pt-2 mt-1 border-t border-border text-base font-medium text-text"
            >
              <span>Resume</span>
              <ArrowUpRight size={15} weight="regular" />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};
