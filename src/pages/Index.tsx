import React, { useEffect } from 'react';
import StaggeredMenu from '@/components/ui/StaggeredMenu';
import { Hero } from '@/components/Hero';
import { Projects } from '@/components/Projects';
import { Skills } from '@/components/Skills';
import { Certifications } from '@/components/Certifications';
import { Timeline } from '@/components/Timeline';
import { Footer } from '@/components/Footer';
import { personal } from '@/lib/data';
import { useTheme } from '@/hooks/use-theme';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

const Index = () => {
  const { theme, toggleTheme } = useTheme();

  // Custom cursor & Keyboard shortcuts setup
  useEffect(() => {
    // 1. Brutalist square custom cursor
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    let cursor: HTMLDivElement | null = null;
    
    if (!isMobile) {
      cursor = document.createElement('div');
      cursor.className = 'fixed w-2 h-2 bg-text border border-bg pointer-events-none z-[100] hidden md:block [transition:transform_0.08s_ease-out]';
      document.body.appendChild(cursor);
    }

    const updateCursor = (e: MouseEvent) => {
      if (cursor) {
        cursor.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
      }
    };

    // 2. Keyboard shortcuts handler
    const handleKeyDown = (e: KeyboardEvent) => {
      // Avoid triggering when user is typing in an input
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA' ||
        document.activeElement?.isContentEditable
      ) {
        return;
      }

      const key = e.key.toLowerCase();

      if (key === 't') {
        // Toggle theme (simulate MouseEvent for radial shift)
        const mockEvent = {
          clientX: window.innerWidth / 2,
          clientY: window.innerHeight / 2,
        } as unknown as React.MouseEvent;
        toggleTheme(mockEvent);
      } else if (key === 'm') {
        // Toggle navigation menu
        document.querySelector<HTMLButtonElement>('.sm-toggle')?.click();
      } else if (key === 'g') {
        // Go to GitHub
        window.open(personal.github, '_blank');
      } else if (key === 'l') {
        // Go to LinkedIn
        window.open(personal.linkedin, '_blank');
      }
    };

    window.addEventListener('mousemove', updateCursor);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('mousemove', updateCursor);
      window.removeEventListener('keydown', handleKeyDown);
      if (cursor && document.body.contains(cursor)) {
        document.body.removeChild(cursor);
      }
    };
  }, [toggleTheme]);

  const menuItems = [
    { label: 'Home', ariaLabel: 'Go to Home section', link: '#hero' },
    { label: 'Works', ariaLabel: 'Go to Projects section', link: '#projects' },
    { label: 'Skills', ariaLabel: 'Go to Skills section', link: '#skills' },
    { label: 'Certifications', ariaLabel: 'Go to Certifications section', link: '#certifications' },
    { label: 'Journey', ariaLabel: 'Go to Journey section', link: '#timeline' },
  ];

  const socialItems = [
    { label: 'GitHub', link: personal.github },
    { label: 'LinkedIn', link: personal.linkedin },
    { label: 'Spotify', link: 'https://open.spotify.com/user/7da8gcgxxzb4w0d6fbuhu32wk' },
    { label: 'Instagram', link: personal.instagram },
  ];

  return (
    <div className="relative overflow-x-hidden bg-bg text-text selection:bg-text selection:text-bg transition-colors duration-300">
      {/* Subtle warm ambient light spots to add editorial depth */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute -top-[20%] -left-[10%] w-[60%] aspect-square rounded-full bg-[#FBF3DB]/20 dark:bg-[#2C261A]/10 blur-[120px] animate-ambient-drift"
          style={{ willChange: 'transform' }}
        />
        <div 
          className="absolute -bottom-[20%] -right-[10%] w-[50%] aspect-square rounded-full bg-[#E1F3FE]/20 dark:bg-[#1D262F]/10 blur-[100px] animate-ambient-drift"
          style={{ animationDelay: '-10s', willChange: 'transform' }}
        />
      </div>

      <StaggeredMenu
        position="right"
        colors={theme === 'dark' ? ['#1C1C1B', '#2A2A28'] : ['#F7F6F3', '#EAEAEA']}
        items={menuItems}
        socialItems={socialItems}
        displaySocials={true}
        displayItemNumbering={false}
        resumeUrl={personal.resumeUrl}
      />
      
      <main className="relative z-10">
        <ScrollReveal>
          <Hero />
        </ScrollReveal>
        
        <ScrollReveal delay={100}>
          <Projects />
        </ScrollReveal>
        
        <ScrollReveal delay={100}>
          <Skills />
        </ScrollReveal>
        
        <ScrollReveal delay={100}>
          <Certifications />
        </ScrollReveal>
        
        <ScrollReveal delay={100}>
          <Timeline />
        </ScrollReveal>
      </main>
      
      <ScrollReveal>
        <Footer />
      </ScrollReveal>
    </div>
  );
};

export default Index;
