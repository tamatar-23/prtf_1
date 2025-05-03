
import React from 'react';
import { Github, Linkedin, Mail, Instagram, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex flex-col justify-center pt-24 px-4 md:px-8 lg:px-16 animate-fade-in">
      <div className="max-w-screen-xl mx-auto">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-foreground">
            Hey, I'm Gourav Mishra
            <div className="text-gradient text-3xl md:text-5xl mt-2">GenAI Engineer & MERN Stack Engineer</div>
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-2xl mt-6">
            Creating intelligent web applications with modern JavaScript frameworks and generative AI technologies.
          </p>
          
          <div className="flex flex-wrap gap-3 mt-8">
            <Button 
              asChild
              variant="outline" 
              size="lg" 
              className="rounded-full border-border bg-secondary/30 hover:bg-secondary/60"
            >
              <a href="https://linkedin.com/in/gouravk2304" target="_blank" rel="noopener noreferrer">
                <Linkedin className="mr-2 h-5 w-5" />
                LinkedIn
              </a>
            </Button>
            
            <Button 
              asChild
              variant="outline" 
              size="lg" 
              className="rounded-full border-border bg-secondary/30 hover:bg-secondary/60"
            >
              <a href="https://github.com/tamatar-23" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-5 w-5" />
                GitHub
              </a>
            </Button>
            
            <Button 
              asChild
              variant="outline" 
              size="lg" 
              className="rounded-full border-border bg-secondary/30 hover:bg-secondary/60"
            >
              <a href="mailto:gouravkrishna23@gmail.com">
                <Mail className="mr-2 h-5 w-5" />
                Mail
              </a>
            </Button>
            
            <Button 
              asChild
              variant="outline" 
              size="lg" 
              className="rounded-full border-border bg-secondary/30 hover:bg-secondary/60"
            >
              <a href="https://instagram.com/gouravk2304" target="_blank" rel="noopener noreferrer">
                <Instagram className="mr-2 h-5 w-5" />
                Instagram
              </a>
            </Button>
            
            <Button 
              asChild
              variant="outline" 
              size="lg" 
              className="rounded-full bg-gradient-to-r from-purple-400 to-pink-500 text-white hover:opacity-90"
            >
              <a href="/resume.pdf" download>
                <Download className="mr-2 h-5 w-5" />
                Resume
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
