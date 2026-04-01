
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

type CertificationCardProps = {
  title: string;
  issuer: string;
  date: string;
  description: string;
  certUrl: string;
  tags: string[];
};

const CertificationCard = ({ 
  title, 
  issuer, 
  date, 
  description, 
  certUrl, 
  tags 
}: CertificationCardProps) => (
  <Card 
    className="bg-card border border-border/50 p-6 flex flex-col h-full min-h-[320px] shadow-soft hover:-translate-y-1 hover:shadow-soft-lg transition-all duration-300 cursor-pointer"
    onClick={() => window.open(certUrl, '_blank')}
  >
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <div className="flex items-center justify-between mb-4">
      <span className="text-sm text-muted-foreground">{issuer}</span>
      <span className="text-xs text-muted-foreground">{date}</span>
    </div>
    
    <p className="text-muted-foreground mb-6 flex-grow">{description}</p>
    
    <div className="flex flex-wrap gap-2 mt-auto">
      {tags.map((tag, index) => (
        <Badge key={index} variant="secondary" className="text-xs rounded-full border border-border/50 bg-secondary text-secondary-foreground">{tag}</Badge>
      ))}
    </div>
  </Card>
);

const Certifications = () => {
  const certifications = [
    {
      title: "Problem Solving (Intermediate + Basic)",
      issuer: "HackerRank",
      date: "Apr 2025",
      description: "Completed coding assessments focused on algorithms and logic-based problem solving.",
      certUrl: "https://www.hackerrank.com/certificates/71af2c748d62",
      tags: ["Data Structures", "Algorithms"]
    },
    {
      title: "React - The Complete Guide",
      issuer: "Udemy",
      date: "May 2025",
      description: "Comprehensive course on building modern reactive web applications with React and state management with Redux.",
      certUrl: "https://udemy-certificate.s3.amazonaws.com/pdf/UC-b7ae8e33-c0c2-4630-b67d-cc8488998475.pdf",
      tags: ["React", "Tailwind"]
    },
    {
      title: "Building LLM Applications",
      issuer: "Nvidia Deep Learning Institute",
      date: "2026",
      description: "Explored techniques for building and scaling Large Language Model applications, prompt engineering, and RAG architectures.",
      certUrl: "#",
      tags: ["LLM", "AI", "RAG"]
    }
  ];

  return (
    <section id="certifications" className="py-24 px-4 md:px-8 lg:px-16 overflow-hidden">
      <div className="max-w-screen-xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-12 uppercase tracking-tight"
        >
          Certifications
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex"
            >
              <div className="w-full">
                <CertificationCard 
                  title={cert.title}
                  issuer={cert.issuer}
                  date={cert.date}
                  description={cert.description}
                  certUrl={cert.certUrl}
                  tags={cert.tags}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
