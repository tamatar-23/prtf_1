import React from 'react';
import { personal } from '@/lib/data';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="py-20 border-t border-border bg-bg relative z-10 select-none">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold text-text tracking-tight flex items-center gap-2">
              Gourav Mishra <span className="text-text-muted/60 font-mono-tech text-xs select-all hover:text-text">// is-a.dev</span>
            </span>
            <p className="text-xs text-text-muted">
              Plain code, no fluff.
            </p>
          </div>
          
          <div className="flex flex-col md:items-end gap-1.5">
            <div className="flex flex-wrap items-center gap-3.5 text-[10px] font-mono-tech text-text-muted uppercase tracking-wider">
              <span>[T] Theme</span>
              <span>[M] Menu</span>
              <span>[G] GitHub</span>
              <span>[L] LinkedIn</span>
              <button 
                onClick={scrollToTop} 
                className="text-text hover:text-text-muted transition-colors duration-200 cursor-pointer font-bold lowercase tracking-wider border-l border-border/50 pl-3 ml-0.5 select-none"
                aria-label="Scroll to top"
              >
                ↑ back-to-top
              </button>
            </div>
            <p className="text-[10px] text-text-muted/50 font-mono-tech uppercase tracking-widest mt-1">
              © {new Date().getFullYear()} Gourav Mishra. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
