'use client';

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from '@/lib/framer-motion';
import { BsCalendarDate, BsBriefcase, BsAward, BsBuilding } from 'react-icons/bs';
import Container from '../ui/Container';
import { FadeIn } from '../animations/FadeIn';
import portfolioData from '@/data/portfolio-data.json';

// Define types based on your actual data structure
interface Job {
  company: string;
  position: string;
  period: string;
  description: string;
  highlights: string[];
}

interface Education {
  institution: string;
  degree: string;
  period: string;
  description: string;
}

export default function ExperienceSection() {
  const { experience, education } = portfolioData;
  const [activeTab, setActiveTab] = useState('experience');
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });

  const toggleExpand = (id: string) => {
    if (expandedItem === id) {
      setExpandedItem(null);
    } else {
      setExpandedItem(id);
    }
  };

  return (
    <section 
      id="experience" 
      ref={sectionRef}
      className="py-24 relative overflow-hidden bg-gray-50 dark:bg-gray-900"
    >
      {/* Abstract decorative elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <svg className="absolute top-0 left-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="timeline-grid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="currentColor" strokeOpacity="0.1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#timeline-grid)" />
        </svg>
        
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 rounded-full bg-secondary/5 blur-3xl"></div>
      </div>

      <Container className="relative z-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center relative mb-16"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="absolute -top-10 left-1/2 -translate-x-1/2 w-40 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"
          />
          
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-primary bg-size-200 animate-gradient-slow">
              Professional Journey
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            A timeline of my professional experience and educational background
          </motion.p>
          
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-secondary to-transparent"
          />
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg p-1.5 rounded-full flex shadow-lg border border-gray-200 dark:border-gray-700">
            <button
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === 'experience'
                  ? 'bg-primary text-white shadow-md'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              onClick={() => setActiveTab('experience')}
            >
              <span className="flex items-center gap-2">
                <BsBriefcase />
                Experience
              </span>
            </button>
            <button
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === 'education'
                  ? 'bg-primary text-white shadow-md'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              onClick={() => setActiveTab('education')}
            >
              <span className="flex items-center gap-2">
                <BsAward />
                Education
              </span>
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* Experience Timeline */}
          {activeTab === 'experience' && (
            <motion.div
              key="experience"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/80 via-primary/20 to-primary/80 rounded-full transform md:translate-x-[-50%]"></div>
                
                {/* Experience items */}
                <div className="space-y-12">
                  {experience.map((job: Job, index: number) => {
                    const isEven = index % 2 === 0;
                    const isExpanded = expandedItem === `job-${index}`;
                    
                    return (
                      <div key={`job-${index}`} className="relative">
                        {/* Timeline dot */}
                        <motion.div 
                          className={`absolute left-0 md:left-1/2 w-5 h-5 rounded-full bg-primary border-4 border-white dark:border-gray-800 transform md:translate-x-[-50%] z-10`}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2 + index * 0.1, type: "spring" }}
                        />
                        
                        {/* Content card - alternating sides on desktop */}
                        <div className={`ml-8 md:ml-0 md:w-[45%] ${isEven ? 'md:ml-auto' : 'md:mr-auto'}`}>
                          <motion.div 
                            className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
                            initial={{ opacity: 0, x: isEven ? 20 : -20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                            whileHover={{ y: -5 }}
                          >
                            {/* Date badge */}
                            <div className="inline-block px-3 py-1 mb-4 text-xs font-medium text-primary bg-primary/10 rounded-full">
                              {job.period}
                            </div>
                            
                            <h4 className="text-xl font-bold mb-2 text-gray-800 dark:text-white flex items-center gap-2">
                              {job.position}
                            </h4>
                            
                            <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400 mb-4">
                              <BsBuilding className="flex-shrink-0" />
                              <span className="font-medium">{job.company}</span>
                            </div>
                            
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                              {job.description}
                            </p>
                            
                            {job.highlights && job.highlights.length > 0 && (
                              <>
                                <motion.button
                                  onClick={() => toggleExpand(`job-${index}`)}
                                  className="flex items-center gap-1 text-primary font-medium mb-4"
                                  whileHover={{ scale: 1.05 }}
                                >
                                  {isExpanded ? 'Hide' : 'Show'} key achievements
                                  <motion.div
                                    animate={{ rotate: isExpanded ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                  >
                                    <BsCalendarDate className="rotate-180" />
                                  </motion.div>
                                </motion.button>
                                
                                <AnimatePresence>
                                  {isExpanded && (
                                    <motion.div
                                      initial={{ opacity: 0, height: 0 }}
                                      animate={{ opacity: 1, height: "auto" }}
                                      exit={{ opacity: 0, height: 0 }}
                                      transition={{ duration: 0.3 }}
                                      className="overflow-hidden"
                                    >
                                      <ul className="space-y-2 mb-2 pl-1">
                                        {job.highlights.map((highlight: string, i: number) => (
                                          <motion.li 
                                            key={i} 
                                            className="flex items-start gap-2"
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.1 * i }}
                                          >
                                            <BsAward className="mt-1 text-primary flex-shrink-0" />
                                            <span className="text-gray-700 dark:text-gray-300">{highlight}</span>
                                          </motion.li>
                                        ))}
                                      </ul>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </>
                            )}
                          </motion.div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* Education Timeline */}
          {activeTab === 'education' && (
            <motion.div
              key="education"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {education.map((edu: Education, index: number) => (
                  <motion.div
                    key={`edu-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="h-full"
                  >
                    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl overflow-hidden h-full flex flex-col border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className="h-32 bg-gradient-to-r from-primary/20 to-secondary/20 relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <BsAward className="text-4xl text-white/50" />
                        </div>
                      </div>
                      
                      <div className="p-6 flex flex-col flex-grow">
                        <div className="mb-4">
                          <div className="inline-block px-3 py-1 mb-2 text-xs font-medium text-primary bg-primary/10 rounded-full">
                            {edu.period}
                          </div>
                          <h4 className="text-xl font-bold mb-1 text-gray-800 dark:text-white">
                            {edu.degree}
                          </h4>
                          <div className="text-gray-600 dark:text-gray-400">
                            {edu.institution}
                          </div>
                        </div>
                        
                        <p className="text-gray-700 dark:text-gray-300 flex-grow">
                          {edu.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </section>
  );
}
