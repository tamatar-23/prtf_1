
import React from 'react';

type TimelineItemProps = {
  date: string;
  title: string;
  subtitle: string;
  description: string;
  isLast?: boolean;
  isRight?: boolean;
};

const TimelineItem = ({ date, title, subtitle, description, isLast = false, isRight = false }: TimelineItemProps) => (
  <div className={`flex ${isRight ? 'flex-row-reverse' : 'flex-row'} animate-fade-in`}>
    <div className={`pb-12 ${isLast ? '' : 'border-l border-transparent'} ${isRight ? 'text-right' : 'text-left'} w-full max-w-[700px]`}>
      <span className="block text-sm text-muted-foreground mb-1">{date}</span>
      <h3 className="text-lg font-medium">{title}</h3>
      <p className="text-muted-foreground">{subtitle}</p>
      <p className="text-sm mt-2">{description}</p>
    </div>
    
    <div className="flex flex-col items-center mx-6">
      <div className="h-3 w-3 bg-accent rounded-full animate-pulse-subtle"></div>
      {!isLast && <div className="h-full w-px bg-border mt-1 bg-gradient-to-b from-accent to-border"></div>}
    </div>
    
    <div className="w-full max-w-[700px]">
      {/* Empty container for alignment on the other side */}
    </div>
  </div>
);

const Timeline = () => {
  const timelineItems = [
    {
      date: "April 2025",
      title: "Cybersecurity Intern",
      subtitle: "@PinnacleLabs",
      description: "Developed a comprehensive password analyzer tool to evaluate password strength against common vulnerabilities. Created encryption solutions for sensitive text and image data using advanced cryptographic algorithms. Built a keylogger for security testing that monitored system activity while maintaining user privacy.",
      isRight: false
    },
    {
      date: "May 2025",
      title: "Machine Learning Intern",
      subtitle: "@CodeAlpha",
      description: "Created a music recommendation system that analyzed user listening patterns to suggest personalized playlists. Implemented an image recognition project that accurately identified and categorized objects in photographs with high precision.",
      isLast: true,
      isRight: true
    }
  ];

  return (
    <section id="timeline" className="py-24 px-4 md:px-8 lg:px-16 flex justify-center">
      <div className="max-w-[700px]">
        <h2 className="text-3xl font-bold mb-12 text-center">My Timeline</h2>
        
        <div className="flex flex-col items-center">
          {timelineItems.map((item, index) => (
            <TimelineItem 
              key={index}
              date={item.date}
              title={item.title}
              subtitle={item.subtitle}
              description={item.description}
              isLast={item.isLast}
              isRight={item.isRight}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
