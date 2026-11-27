import React, { useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Projects } from '@/components/Projects';
import { Skills } from '@/components/Skills';
import { GitHubActivity } from '@/components/GitHubActivity';
import { Timeline } from '@/components/Timeline';
import { Footer } from '@/components/Footer';
import { personal } from '@/lib/data';
import { useTheme } from '@/hooks/use-theme';

const Index: React.FC = () => {
  const { toggleTheme } = useTheme();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.metaKey ||
        e.ctrlKey ||
        e.altKey ||
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA' ||
        (document.activeElement as HTMLElement | null)?.isContentEditable
      ) {
        return;
      }

      const key = e.key.toLowerCase();

      if (key === 't') {
        toggleTheme();
      } else if (key === 'g') {
        window.open(personal.github, '_blank', 'noopener,noreferrer');
      } else if (key === 'l') {
        window.open(personal.linkedin, '_blank', 'noopener,noreferrer');
      } else if (key === 'i') {
        window.open(personal.instagram, '_blank', 'noopener,noreferrer');
      } else if (key === 'r') {
        window.open(personal.resumeUrl, '_blank', 'noopener,noreferrer');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleTheme]);

  return (
    <div className="min-h-screen bg-bg text-text selection:bg-text selection:text-bg">
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <Skills />
        <GitHubActivity />
        <Timeline />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
