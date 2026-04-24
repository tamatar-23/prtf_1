import React, { useEffect } from 'react';
import StaggeredMenu from '@/components/ui/StaggeredMenu';
import { Hero } from '@/components/Hero';
import { Projects } from '@/components/Projects';
import { Skills } from '@/components/Skills';
import { Certifications } from '@/components/Certifications';
import { Timeline } from '@/components/Timeline';
import { Footer } from '@/components/Footer';
import { personal } from '@/lib/data';
import Grainient from '@/components/ui/Grainient';
import { useTheme } from '@/hooks/use-theme';

const Index = () => {
  const { theme } = useTheme();
  // Add a small 8px custom cursor
  useEffect(() => {
    // Basic custom cursor script (if not on mobile)
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) return;

    const cursor = document.createElement('div');
    cursor.className = 'fixed w-2 h-2 bg-accent-2 rounded-full pointer-events-none z-[100] mix-blend-difference hidden md:block';
    cursor.style.transition = 'transform 0.1s ease-out';
    document.body.appendChild(cursor);

    let mouseX = 0;
    let mouseY = 0;

    const updateCursor = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
    };

    window.addEventListener('mousemove', updateCursor);

    return () => {
      window.removeEventListener('mousemove', updateCursor);
      if (document.body.contains(cursor)) {
        document.body.removeChild(cursor);
      }
    };
  }, []);

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
    { label: 'Instagram', link: personal.instagram },
  ];

  return (
    <div className="relative overflow-x-hidden bg-bg text-text selection:bg-accent-2 selection:text-white">
      <div className="fixed inset-0 z-0 pointer-events-none opacity-60 dark:opacity-60 transition-opacity duration-700">
        {theme === 'dark' ? (
          <Grainient
            timeSpeed={0.15}
            warpStrength={0.3}
            grainAmount={0.05}
            color1="#1a103c"
            color2="#0f0820"
            color3="#2d1b4e"
          />
        ) : (
          <Grainient
            timeSpeed={0.15}
            warpStrength={0.3}
            grainAmount={0.05}
            color1="#DCE3F8"
            color2="#A5B8EF"
            color3="#E8DCF8"
          />
        )}
      </div>

      <StaggeredMenu
        position="right"
        colors={['#B497CF', '#330fd1', '#FF9FFC']}
        items={menuItems}
        socialItems={socialItems}
        displaySocials={true}
        displayItemNumbering={true}
        resumeUrl={personal.resumeUrl}
      />
      <main>
        <Hero />
        <Projects />
        <Skills />
        <Certifications />
        <Timeline />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
