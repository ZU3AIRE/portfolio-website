"use client";

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from '@/lib/framer-motion';
import Container from '../ui/Container';
import { FadeIn } from '../animations/FadeIn';
import portfolioData from '@/data/portfolio-data.json';

// Define types for our data
interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  description: string;
}

interface ExperienceItem {
  company: string;
  position: string;
  period: string;
  description: string;
  highlights: string[];
}

type MilestoneItem = 
  | { type: 'education'; icon: string; item: EducationItem }
  | { type: 'experience'; icon: string; item: ExperienceItem };

export default function CreativeJourneyTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Combined skills from all categories
  const allSkills = portfolioData.skills.flatMap(category => category.items);
  
  // Career milestones combining education and experience
  const milestones: MilestoneItem[] = [
    ...portfolioData.education.map(item => ({
      type: 'education' as const,
      icon: '🎓',
      item
    })),
    ...portfolioData.experience.map(item => ({
      type: 'experience' as const,
      icon: '💼',
      item
    }))
  ].sort((a, b) => {
    // Sort by year (descending)
    const yearA = parseInt(a.item.period.split(' - ')[0]);
    const yearB = parseInt(b.item.period.split(' - ')[0]);
    return yearB - yearA;
  });

  return (
    <section ref={containerRef} className="py-20 relative overflow-hidden bg-gray-50 dark:bg-gray-900">
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent dark:from-gray-900 dark:to-transparent z-10"></div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent dark:from-gray-900 dark:to-transparent z-10"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => {
          const size = Math.random() * 100 + 50;
          const xPos = Math.random() * 100;
          const delay = Math.random() * 10;
          const duration = Math.random() * 15 + 15;
          const initialY = Math.random() * 100 + 100;
          
          return (
            <motion.div
              key={i}
              className="absolute rounded-full bg-gradient-to-br from-primary/5 to-secondary/5 dark:from-primary/5 dark:to-secondary/5"
              style={{
                width: size,
                height: size,
                left: `${xPos}%`,
                top: `${initialY}%`,
              }}
              animate={{
                y: [0, -500],
                rotate: [0, 180],
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                delay: delay,
                ease: "linear"
              }}
            />
          );
        })}
      </div>
      
      <Container className="relative z-20">
        <div className="text-center mb-16">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">My Creative Journey</h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Explore the path that shaped my skills and experience
            </p>
            <div className="w-20 h-1 bg-primary mx-auto mt-6"></div>
          </FadeIn>
        </div>

        {/* Timeline section */}
        <div className="relative mx-auto max-w-6xl">
          {/* Center line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary via-secondary to-accent rounded"></div>
          
          {milestones.map((milestone, index) => {
            // Using useInView for each milestone item for better scroll control
            const itemRef = useRef<HTMLDivElement>(null);
            const isInView = useInView(itemRef, { 
              once: false,
              margin: "-100px 0px -100px 0px"
            });
            
            return (
              <div
                key={`${milestone.type}-${index}`}
                ref={itemRef}
                className={`relative mb-16 flex ${isMobile ? 'flex-col' : 
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
              >
                {/* Timeline node */}
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1 z-20">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 border-4 border-primary flex items-center justify-center text-xl"
                  >
                    {milestone.icon}
                  </motion.div>
                </div>
                
                {/* Content card */}
                <motion.div
                  className={`${isMobile ? 'ml-0 mt-8' : 'w-5/12'} relative`}
                  initial={{ 
                    opacity: 0, 
                    x: isMobile ? 0 : (index % 2 === 0 ? 50 : -50)
                  }}
                  animate={isInView ? { 
                    opacity: 1, 
                    x: 0 
                  } : { 
                    opacity: 0, 
                    x: isMobile ? 0 : (index % 2 === 0 ? 50 : -50) 
                  }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                >
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow">
                    <span className="inline-block px-3 py-1 mb-2 text-sm rounded-full bg-primary/10 text-primary dark:bg-primary/20">
                      {milestone.item.period}
                    </span>
                    <h3 className="text-xl font-bold mb-1">
                      {milestone.type === 'education' 
                        ? milestone.item.degree 
                        : milestone.item.position}
                    </h3>
                    <h4 className="text-gray-600 dark:text-gray-400 mb-3">
                      {milestone.type === 'education' 
                        ? milestone.item.institution 
                        : milestone.item.company}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      {milestone.item.description}
                    </p>
                    
                    {/* Show highlights for experience */}
                    {milestone.type === 'experience' && milestone.item.highlights && (
                      <ul className="mt-3 space-y-1">
                        {milestone.item.highlights.map((highlight, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-primary mr-2">•</span>
                            <span className="text-sm text-gray-600 dark:text-gray-400">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  
                  {/* Connecting line to timeline (desktop only) */}
                  {!isMobile && (
                    <motion.div 
                      className={`absolute top-1/2 ${index % 2 === 0 ? 'right-0 translate-x-1/2' : 'left-0 -translate-x-1/2'} w-12 h-0.5 bg-primary/50`}
                      initial={{ width: 0 }}
                      animate={isInView ? { width: 48 } : { width: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    ></motion.div>
                  )}
                </motion.div>
              </div>
            );
          })}
          
          {/* Bottom element - floating skills cloud */}
          <motion.div 
            className="mt-20 mb-10 relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 border border-gray-100 dark:border-gray-700 overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h3 className="text-2xl font-bold mb-6 text-center">Skills Collected Along The Way</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {allSkills.map((skill, index) => (
                <motion.span
                  key={index}
                  className="px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-primary hover:text-white dark:hover:bg-primary cursor-default transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
            
            {/* Background decorative elements */}
            <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 blur-xl"></div>
            <div className="absolute -top-16 -left-16 w-48 h-48 rounded-full bg-gradient-to-br from-secondary/10 to-accent/10 blur-xl"></div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
