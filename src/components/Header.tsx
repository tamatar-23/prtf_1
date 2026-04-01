import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Switch } from '@/components/ui/switch';
import { Sun, Moon, Keyboard, Mail, Github, Linkedin, Instagram } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from '@/components/ui/button';

const Header = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.body.classList.toggle('light', savedTheme === 'light');
    }
    
    const handleScroll = () => {
      const sections = ['home', 'projects', 'timeline', 'skills', 'certifications'];
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (!element) continue;
        
        const offsetTop = element.offsetTop;
        const offsetHeight = element.offsetHeight;
        
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(section);
          break;
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.body.classList.toggle('light', newTheme === 'light');
    localStorage.setItem('theme', newTheme);
  };
  
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };
  
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Tech Stack' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'timeline', label: 'Timeline' },
  ];

  return (
    <header className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none px-4">
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="pointer-events-auto bg-background/80 backdrop-blur-lg border border-border/50 shadow-soft-lg rounded-md px-6 py-3 flex items-center justify-between gap-6 md:gap-12"
      >
        <div className="text-xl font-bold text-gradient cursor-pointer" onClick={() => scrollToSection('home')}>
          GM
        </div>
        
        <ul className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => scrollToSection(item.id)}
                className={cn(
                  "text-sm font-semibold relative px-2 py-1 transition-colors",
                  activeSection === item.id 
                    ? "text-foreground" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.span 
                    layoutId="activeSection"
                    className="absolute inset-0 bg-secondary/50 rounded -z-10" 
                  />
                )}
              </button>
            </li>
          ))}
        </ul>
        
        <div className="flex items-center space-x-5">
          <div className="flex items-center space-x-2">
            <Sun className="h-4 w-4 text-muted-foreground" />
            <Switch 
              checked={theme === 'dark'} 
              onCheckedChange={toggleTheme} 
              aria-label="Toggle theme" 
            />
            <Moon className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="h-4 w-px bg-border/50 hidden md:block"></div>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm" className="hidden md:flex rounded text-muted-foreground hover:text-foreground">
                <Mail className="h-4 w-4 mr-2" />
                Connect
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-4 bg-background/95 backdrop-blur-md border-border/50 shadow-soft-lg rounded-xl mr-4 md:mr-0 z-50 pointer-events-auto">
              <div className="flex flex-col gap-3">
                <a 
                  href="mailto:gouravkrishna23@gmail.com"
                  className="flex items-center gap-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  <span>Email</span>
                </a>
                <a 
                  href="https://linkedin.com/in/gouravk2304" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Linkedin className="h-4 w-4" />
                  <span>LinkedIn</span>
                </a>
                <a 
                  href="https://github.com/tamatar-23" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Github className="h-4 w-4" />
                  <span>GitHub</span>
                </a>
                <a 
                  href="https://instagram.com/gouravk2304" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Instagram className="h-4 w-4" />
                  <span>Instagram</span>
                </a>
                <a 
                  href="https://monkeytype.com/profile/tabahitamatar" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Keyboard className="h-4 w-4" />
                  <span>Monkeytype</span>
                </a>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </motion.nav>
    </header>
  );
};

export default Header;
