
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Timeline from '@/components/Timeline';
import Certifications from '@/components/Certifications';
import Footer from '@/components/Footer';

const Index = () => {
  useEffect(() => {
    // Check for theme preference and apply it
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
    if (savedTheme === 'light') {
      document.body.classList.add('light');
    }
    
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      
      sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.75) {
          section.classList.add('animate-fade-in');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger on initial load
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="mx-auto px-6 md:px-12 lg:px-24 max-w-7xl">
        <Hero />
        <div className="section-spacing" id="projects">
          <Projects />
        </div>
        <div className="section-spacing" id="timeline">
          <Timeline />
        </div>
        <div className="section-spacing" id="skills">
          <Skills />
        </div>
        <div className="section-spacing" id="certifications">
          <Certifications />
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default Index;
