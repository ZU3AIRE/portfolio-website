"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, useAnimationControls } from '@/lib/framer-motion';
import Container from '../ui/Container';
import { FadeIn } from '../animations/FadeIn';
import portfolioData from '@/data/portfolio-data.json';

export default function SkillsSpotlight() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const controls = useAnimationControls();

  // Parse skill categories from portfolio data
  const skillCategories = portfolioData.skills.map(category => ({
    name: category.category,
    skills: category.items
  }));

  // Color themes for different categories
  const categoryThemes: Record<string, { color: string, gradient: string, shadow: string }> = {
    'Frontend': {
      color: 'text-blue-500',
      gradient: 'from-blue-600 to-indigo-700',
      shadow: 'shadow-blue-500/25'
    },
    'Backend': {
      color: 'text-emerald-500',
      gradient: 'from-emerald-600 to-green-700',
      shadow: 'shadow-emerald-500/25'
    },
    'Tools & Methods': {
      color: 'text-violet-500',
      gradient: 'from-violet-600 to-purple-700',
      shadow: 'shadow-violet-500/25'
    },
    'default': {
      color: 'text-primary',
      gradient: 'from-primary to-secondary',
      shadow: 'shadow-primary/25'
    }
  };

  // Move spotlight to follow mouse
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!spotlightRef.current || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    spotlightRef.current.style.background = `radial-gradient(
      600px circle at ${x}px ${y}px,
      rgba(255, 255, 255, 0.08),
      transparent 40%
    )`;
  };

  // Initialize the animations
  useEffect(() => {
    controls.start({
      opacity: 1,
      transition: {
        duration: 0.5
      }
    });
  }, [controls]);

  // Get theme for a specific category
  const getTheme = (category: string) => {
    return categoryThemes[category] || categoryThemes.default;
  };

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/10 to-transparent dark:from-white/5"></div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/10 to-transparent dark:from-black/20"></div>
      <div aria-hidden="true" className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-20 dark:opacity-10">
        <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700"></div>
        <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-secondary dark:to-indigo-600"></div>
      </div>
      
      <Container>
        <div className="text-center mb-16">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Expertise</h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Explore my technical skills arsenal that powers every project
            </p>
            <div className="w-20 h-1 bg-primary mx-auto mt-6"></div>
          </FadeIn>
        </div>
        
        {/* Skill Category Navigation */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {skillCategories.map((category, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-full text-sm md:text-base font-medium transition-all relative overflow-hidden
                ${activeCategory === category.name
                  ? `text-white bg-gradient-to-r ${getTheme(category.name).gradient}`
                  : 'bg-white/20 dark:bg-gray-800/40 backdrop-blur-sm hover:bg-white/40 dark:hover:bg-gray-800/60'
                }
              `}
              onClick={() => setActiveCategory(
                activeCategory === category.name ? null : category.name
              )}
            >
              <span className="relative z-10">
                {category.name}
              </span>
            </button>
          ))}
        </div>
        
        {/* Interactive Skills Showcase */}
        <div
          ref={containerRef}
          className="relative min-h-[400px] md:min-h-[500px] rounded-2xl 
            bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm 
            border border-white/20 dark:border-gray-700/30 
            p-8 md:p-12 overflow-hidden"
          onMouseMove={handleMouseMove}
        >
          {/* Interactive spotlight effect */}
          <div 
            ref={spotlightRef}
            className="pointer-events-none absolute inset-0 z-10 transition-all duration-300"
            aria-hidden="true"
          ></div>
          
          {/* Skills visualization */}
          <div className="relative z-20">
            <div className="flex flex-wrap justify-center gap-6 md:gap-8">
              {skillCategories.map((category, catIndex) => {
                // If a category is active, only show its skills
                if (activeCategory !== null && activeCategory !== category.name) {
                  return null;
                }
                
                const theme = getTheme(category.name);
                
                return (
                  <div 
                    key={catIndex}
                    className={`w-full ${activeCategory ? 'md:w-full' : 'md:w-[calc(33%-1rem)]'} 
                      transition-all duration-500`
                    }
                  >
                    {!activeCategory && (
                      <h3 className={`text-xl md:text-2xl font-bold mb-6 ${theme.color}`}>
                        {category.name}
                      </h3>
                    )}
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {category.skills.map((skill, index) => (
                        <motion.div
                          key={`${category.name}-${index}`}
                          className={`relative p-4 rounded-xl 
                            ${hoveredSkill === skill
                              ? `bg-gradient-to-br ${theme.gradient} text-white shadow-lg ${theme.shadow}`
                              : 'bg-white/20 dark:bg-gray-800/40 backdrop-blur-sm'
                            }
                            transition-all hover:scale-105 cursor-pointer
                          `}
                          onMouseEnter={() => setHoveredSkill(skill)}
                          onMouseLeave={() => setHoveredSkill(null)}
                          initial={{ opacity: 0, y: 20 }}
                          animate={controls}
                          transition={{
                            delay: 0.1 + (catIndex * 0.1) + (index * 0.02),
                            type: "spring",
                            stiffness: 100,
                            damping: 10
                          }}
                        >
                          <div className="flex flex-col items-center justify-center text-center space-y-2">
                            {/* Skill-specific icons could be added here */}
                            <span className={`font-medium ${hoveredSkill === skill ? 'text-white' : ''}`}>
                              {skill}
                            </span>
                          </div>
                          
                          {hoveredSkill === skill && (
                            <motion.div
                              className="absolute inset-0 -z-10"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                            >
                              {/* Animated background pattern */}
                              <div className="absolute inset-0 overflow-hidden rounded-xl">
                                {[...Array(5)].map((_, i) => (
                                  <div
                                    key={i}
                                    className="absolute bg-white/10 rounded-full"
                                    style={{
                                      width: `${20 + i * 15}%`,
                                      height: `${20 + i * 15}%`,
                                      top: `${50 - (20 + i * 15) / 2}%`,
                                      left: `${50 - (20 + i * 15) / 2}%`,
                                      transform: `rotate(${i * 15}deg)`,
                                      opacity: 0.5 - i * 0.08
                                    }}
                                  ></div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Call to action or additional note */}
          <div className="mt-12 text-center">
            <p className="text-gray-500 dark:text-gray-400 italic">
              Hover over any skill to see more details
            </p>
          </div>
        </div>
        
        {/* Additional information */}
        <div className="mt-16 max-w-3xl mx-auto text-center">
          <FadeIn delay={0.2}>
            <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Always Learning, Always Growing
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Technology evolves rapidly, and so do I. I'm constantly expanding my skill set and mastering new technologies 
              to deliver cutting-edge solutions that meet modern development standards.
            </p>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
