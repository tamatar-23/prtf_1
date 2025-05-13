
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
    className="bg-secondary/30 rounded-md p-6 flex flex-col h-[320px] card-hover animate-fade-in cursor-pointer"
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
        <Badge key={index} variant="secondary" className="text-xs">{tag}</Badge>
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
      title:"React - The Complete Guide",
      issuer: "Udemy",
      date: "May 2025",
      description: "Comprehensive course on building modern reactive web applications with React and state management with Redux.",
      certUrl: "https://udemy-certificate.s3.amazonaws.com/pdf/UC-b7ae8e33-c0c2-4630-b67d-cc8488998475.pdf",
      tags: ["React", "Tailwind"]
    },
    {
      title: "AWS Solutions Architecture",
      issuer: "Amazon Web Services (Forage)",
      date: "Apr 2025",
      description: "Professional certification validating expertise in designing distributed systems on AWS.",
      certUrl: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/pmnMSL4QiQ9JCgE3W/kkE9HyeNcw6rwCRGw_pmnMSL4QiQ9JCgE3W_RJDBXerf3WcTL6Xbt_1745865695064_completion_certificate.pdf",
      tags: ["AWS", "Cloud", "Architecture"]
    },
    {
      title: "Deloitte Data Analysis",
      issuer: "Deloitte (Forage)",
      date: "Apr 2025",
      description: "Completed a Deloitte job simulation focused on data analysis and forensic technology using Excel and Tableau to build dashboards and draw insights.",
      certUrl: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/9PBTqmSxAf6zZTseP/io9DzWKe3PTsiS6GG_9PBTqmSxAf6zZTseP_RJDBXerf3WcTL6Xbt_1746039911080_completion_certificate.pdf",
      tags: ["Data Analysis", "Excel"]
    },
  ];

  return (
    <section id="certifications" className="py-24 px-4 md:px-8 lg:px-16 animate-fade-in">
      <div className="max-w-screen-xl mx-auto">
        <h2 className="text-3xl font-bold mb-12">Certifications</h2>
        
        <Carousel className="w-full max-w-screen-xl">
          <CarouselContent>
            {certifications.map((cert, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <CertificationCard 
                    key={index}
                    title={cert.title}
                    issuer={cert.issuer}
                    date={cert.date}
                    description={cert.description}
                    certUrl={cert.certUrl}
                    tags={cert.tags}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default Certifications;
