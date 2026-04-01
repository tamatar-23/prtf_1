import React from 'react';
import { motion } from 'framer-motion';

type TimelineItemProps = {
  date: string;
  title: string;
  subtitle: string;
  description: string;
  isLast?: boolean;
  isRight?: boolean;
  delay?: number;
};

const TimelineItem = ({ date, title, subtitle, description, isLast = false, isRight = false, delay = 0 }: TimelineItemProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className={`flex ${isRight ? 'flex-row-reverse' : 'flex-row'}`}
  >
    <div className={`pb-12 ${isRight ? 'text-left' : 'text-right'} w-full max-w-[700px]`}>
      <span className="block text-xs font-bold bg-secondary text-secondary-foreground px-3 py-1 mb-3 inline-block rounded-none">{date}</span>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-muted-foreground font-semibold mb-2">{subtitle}</p>
      <p className="text-sm font-medium">{description}</p>
    </div>

    <div className="flex flex-col items-center mx-6">
      <div className="h-4 w-4 bg-primary rounded-none shadow-[0_0_15px_rgba(255,255,255,0.5)]"></div>
      {!isLast && <div className="h-full w-0.5 bg-border/50 mt-2 mb-2"></div>}
    </div>

    <div className="w-full max-w-[700px]">

    </div>
  </motion.div>
);

const Timeline = () => {
  const timelineItems = [
    {
      date: "2023 - 2027",
      title: "B.Tech Computer Science",
      subtitle: "@Kalinga Institute of Industrial Technology",
      description: "Pursuing B.Tech in Computer Science & Communication Engineering. CGPA: 8.69 / 10.",
      isLast: false,
      isRight: true
    },
    {
      date: "Ongoing",
      title: "McKinsey Forward Program",
      subtitle: "@McKinsey.org",
      description: "Accepted into the global learning journey focusing on Core Professional Skills in leadership, problem-solving, and adaptability.",
      isLast: true,
      isRight: false
    }
  ];

  return (
    <section id="timeline" className="py-24 px-4 md:px-8 lg:px-16 flex justify-center overflow-hidden">
      <div className="max-w-[700px] w-full">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-16 text-center tracking-tight"
        >
          Timeline
        </motion.h2>

        <div className="flex flex-col items-center w-full">
          {timelineItems.map((item, index) => (
            <TimelineItem
              key={index}
              {...item}
              delay={index * 0.2}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
