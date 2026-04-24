import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { personal } from '@/lib/data';

export const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <footer className="py-12 border-t border-border relative z-10">
        <div className="container mx-auto px-6 text-center">
          <p className="text-text-muted text-sm">
            © {new Date().getFullYear()} {personal.name}. Built with React, TypeScript & Tailwind.
          </p>
        </div>
      </footer>

      {/* Back to top button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 p-3 rounded-full bg-text text-bg shadow-lg transition-all duration-300 z-40 ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
          }`}
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} />
      </button>
    </>
  );
};
