import React from 'react';
import { Github, Linkedin, Mail, Instagram, Download, Keyboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, Variants } from 'framer-motion';

const Hero = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center pt-24 px-4 md:px-8 lg:px-16 overflow-hidden relative">


      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-screen-xl mx-auto w-full relative z-10"
      >
        <div className="max-w-3xl">
          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tighter text-foreground leading-[1.1]">
            Gourav Mishra.
            <div className="text-gradient text-3xl md:text-5xl mt-4 block leading-snug pb-2">Full Stack AI Developer</div>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="text-xl text-muted-foreground font-medium max-w-2xl mt-8 leading-relaxed">
            Full Stack AI Engineer specializing in autonomous agentic systems. Passionate about photography, loves design, and relentlessly driven to build elegant, highly-optimized applications that automate complex workflows.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mt-12">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild variant="outline" size="lg" className="border border-border/50 bg-card hover:bg-secondary transition-colors shadow-soft">
                <a href="https://linkedin.com/in/gouravk2304" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="mr-2 h-5 w-5" /> LinkedIn
                </a>
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild variant="outline" size="lg" className="border border-border/50 bg-card hover:bg-secondary transition-colors shadow-soft">
                <a href="https://github.com/tamatar-23" target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-5 w-5" /> GitHub
                </a>
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild variant="outline" size="lg" className="border border-border/50 bg-card hover:bg-secondary transition-colors shadow-soft">
                <a href="mailto:gouravkrishna23@gmail.com">
                  <Mail className="mr-2 h-5 w-5" /> Mail
                </a>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild variant="outline" size="lg" className="border border-border/50 bg-card hover:bg-secondary transition-colors shadow-soft">
                <a href="https://monkeytype.com/profile/tabahitamatar" target="_blank" rel="noopener noreferrer">
                  <Keyboard className="mr-2 h-5 w-5" /> Monkeytype
                </a>
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild variant="outline" size="lg" className="border border-border/50 bg-card hover:bg-secondary transition-colors shadow-soft">
                <a href="https://instagram.com/gouravk2304" target="_blank" rel="noopener noreferrer">
                  <Instagram className="mr-2 h-5 w-5" /> Instagram
                </a>
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild variant="default" size="lg" className="shadow-soft-lg hover:shadow-xl transition-shadow bg-primary text-primary-foreground">
                <a href="https://drive.google.com/file/d/14alDt-s1wabBMe4HFnGpkNwjPPVaW7hb/view" download>
                  <Download className="mr-2 h-5 w-5" /> Resume
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
