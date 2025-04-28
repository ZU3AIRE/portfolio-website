"use client"

import { useState, useRef } from 'react';
import Image from 'next/image';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { RiLinkedinFill } from 'react-icons/ri';
import Container from '../ui/Container';
import { FadeIn } from '../animations/FadeIn';
import { motion, useInView } from '@/lib/framer-motion';
import portfolioData from '@/data/portfolio-data.json';

interface LinkedinRecommendation {
  id: string;
  name: string;
  title: string;
  company: string;
  text: string;
  avatarUrl: string;
  relationship: string;
}

export default function LinkedinRecommendationsSection() {
  // We'll add recommendations data in the portfolio-data.json file later
  const recommendations: LinkedinRecommendation[] = 
    (portfolioData as any).linkedinRecommendations || [];
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });
  
  const nextRecommendation = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === recommendations.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const prevRecommendation = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? recommendations.length - 1 : prevIndex - 1
    );
  };

  return (
    <section 
      id="recommendations" 
      ref={sectionRef}
      className="py-24 relative overflow-hidden bg-gray-50 dark:bg-gray-900"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-40 -left-20 w-96 h-96 rounded-full bg-primary/10 blur-3xl opacity-60"></div>
        <div className="absolute bottom-40 -right-20 w-96 h-96 rounded-full bg-secondary/10 blur-3xl opacity-60"></div>
        
        {/* Grid pattern */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="linkedin-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeOpacity="0.05" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#linkedin-grid)" />
        </svg>
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
              LinkedIn Recommendations
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            What my colleagues and clients have said about working with me
          </motion.p>
          
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-secondary to-transparent"
          />
        </motion.div>
          
        {recommendations.length > 0 ? (
          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-visible px-4">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg p-8 mb-6 border border-gray-200 dark:border-gray-700"
              >
                {/* LinkedIn Logo in Corner */}
                <div className="absolute -top-4 -right-4 transform rotate-12 z-10">
                  <div className="bg-[#0077b5] rounded-lg p-2 shadow-md">
                    <RiLinkedinFill size={24} className="text-white" />
                  </div>
                </div>
                
                {/* Recommendation Content */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  <div className="flex-shrink-0">
                    <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-gray-200 dark:border-gray-700">
                      <Image 
                        src={recommendations[currentIndex].avatarUrl} 
                        alt={recommendations[currentIndex].name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  
                  <div className="flex-grow">
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold">{recommendations[currentIndex].name}</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {recommendations[currentIndex].title} at {recommendations[currentIndex].company}
                      </p>
                      <p className="text-gray-500 dark:text-gray-500 text-sm mt-1">
                        {recommendations[currentIndex].relationship}
                      </p>
                    </div>
                    
                    <blockquote className="italic text-gray-700 dark:text-gray-300">
                      "{recommendations[currentIndex].text}"
                    </blockquote>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Rest of the component remains unchanged */}
            {recommendations.length > 1 && (
              <div className="flex justify-center gap-3 mt-6">
                <button 
                  onClick={prevRecommendation}
                  className="bg-white dark:bg-gray-800 rounded-full p-2 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <FiChevronLeft size={24} />
                </button>
                <button 
                  onClick={nextRecommendation}
                  className="bg-white dark:bg-gray-800 rounded-full p-2 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <FiChevronRight size={24} />
                </button>
              </div>
            )}
            
            {/* Pagination Indicators */}
            {recommendations.length > 1 && (
              <div className="flex justify-center mt-4 gap-2">
                {recommendations.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex 
                        ? 'bg-primary scale-125' 
                        : 'bg-gray-300 dark:bg-gray-700 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to recommendation ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-20 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700">
            <div className="inline-flex justify-center items-center w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-700 mb-4">
              <RiLinkedinFill size={32} className="text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">No recommendations available</h3>
            <p className="text-gray-500 dark:text-gray-400">
              LinkedIn recommendations will appear here once added.
            </p>
          </div>
        )}
      </Container>
    </section>
  );
}
