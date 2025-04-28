"use client"

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from '@/lib/framer-motion';
import { FiHeart, FiClock, FiExternalLink, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import Image from 'next/image';
import Container from '../ui/Container';
import portfolioData from '@/data/portfolio-data.json';

interface Volunteering {
  id: string;
  organization: string;
  role: string;
  period: string;
  description: string;
  achievements: string[];
  websiteUrl: string;
  badge?: {
    name: string;
    imageUrl: string;
    level: string;
    issueDate: string;
  };
}

export default function VolunteeringSection() {
  const volunteering: Volunteering[] = portfolioData.volunteering || [];
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section 
      id="volunteering" 
      ref={sectionRef}
      className="py-24 bg-gray-50/50 dark:bg-gray-900/50 relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-40 -left-20 w-96 h-96 rounded-full bg-primary/10 blur-3xl opacity-60"></div>
        <div className="absolute bottom-40 -right-20 w-96 h-96 rounded-full bg-secondary/10 blur-3xl opacity-60"></div>
        
        {/* Grid pattern */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="volunteering-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeOpacity="0.05" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#volunteering-grid)" />
        </svg>
      </div>
      
      <Container>
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
              Volunteering
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Giving back to the community and making a positive impact through technology
          </motion.p>
          
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-secondary to-transparent"
          />
        </motion.div>
        
        {/* Volunteering Cards */}
        {volunteering.length > 0 ? (
          <div className="max-w-4xl mx-auto space-y-8">
            {volunteering.map((item, index) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="group"
              >
                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="p-6 md:p-8">
                    {/* Header with Badge */}
                    <div className="flex flex-col md:flex-row gap-6 justify-between mb-4">
                      <div>
                        <div className="inline-block px-3 py-1 mb-3 text-xs font-medium text-primary bg-primary/10 rounded-full">
                          {item.period}
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
                          {item.organization}
                        </h3>
                        <div className="text-primary font-medium">
                          {item.role}
                        </div>
                      </div>
                      
                      {/* Badge Display */}
                      {item.badge && (
                        <div className="flex items-start">
                          <div className="relative w-24 h-24 group/badge">
                            <Image
                              src={item.badge.imageUrl}
                              alt={item.badge.name}
                              width={96}
                              height={96}
                              className="drop-shadow-lg transition-all duration-300 group-hover/badge:scale-105"
                              style={{
                                filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))',
                                mixBlendMode: 'multiply'
                              }}
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/badge:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                              <div className="text-white text-center p-2">
                                <p className="text-xs font-bold">{item.badge.level}</p>
                                <p className="text-xs">{item.badge.issueDate}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Description */}
                    <div className="mb-6 text-gray-700 dark:text-gray-300">
                      <p>{item.description}</p>
                    </div>
                    
                    {/* Achievements */}
                    {item.achievements && item.achievements.length > 0 && (
                      <div>
                        <button
                          onClick={() => toggleExpand(item.id)}
                          className="flex items-center gap-2 text-primary font-medium hover:underline"
                        >
                          {expandedId === item.id ? (
                            <>
                              <FiChevronUp /> Hide achievements
                            </>
                          ) : (
                            <>
                              <FiChevronDown /> Show achievements
                            </>
                          )}
                        </button>
                        
                        <AnimatePresence>
                          {expandedId === item.id && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden mt-4"
                            >
                              <ul className="space-y-2 border-l-2 border-primary/20 pl-4">
                                {item.achievements.map((achievement, i) => (
                                  <motion.li
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="text-gray-700 dark:text-gray-300 flex items-start gap-2"
                                  >
                                    <FiHeart className="text-primary mt-1 flex-shrink-0" />
                                    <span>{achievement}</span>
                                  </motion.li>
                                ))}
                              </ul>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700">
            <div className="inline-flex justify-center items-center w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-700 mb-4">
              <FiHeart size={32} className="text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">No volunteering activities</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Volunteering activities will appear here once added.
            </p>
          </div>
        )}
      </Container>
    </section>
  );
}