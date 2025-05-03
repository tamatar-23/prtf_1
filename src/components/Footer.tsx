
import React from 'react';
import { Github, Linkedin, Mail, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-border py-12 px-4 md:px-8 lg:px-16">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <div className="font-bold text-xl">Gourav Mishra</div>
            <div className="text-sm text-muted-foreground mt-1">GenAI Engineer & MERN Stack Engineer</div>
          </div>
          
          <div className="flex gap-4">
            <a 
              href="https://github.com/tamatar-23" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-secondary transition-colors"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a 
              href="https://linkedin.com/in/gouravk2304" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-secondary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a 
              href="https://instagram.com/gouravk2304" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-secondary transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
            <a 
              href="mailto:gouravkrishna23@gmail.com" 
              className="p-2 rounded-full hover:bg-secondary transition-colors"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </div>
          
          <div className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Gourav Mishra. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
