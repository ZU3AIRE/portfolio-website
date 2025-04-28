"use client";

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from '@/lib/framer-motion';
import Container from '../ui/Container';
import { FadeIn } from '../animations/FadeIn';
import portfolioData from '@/data/portfolio-data.json';

export default function AnimatedSkillsShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: "-100px 0px" });
  const [isHovering, setIsHovering] = useState(false);
  
  // Extract all skills from the portfolio data
  const skills = portfolioData.skills.flatMap(category => 
    category.items.map(skill => ({
      name: skill,
      category: category.category
    }))
  );

  // Color mappings for different skill categories
  const categoryColors: Record<string, string> = {
    'Frontend': 'bg-gradient-to-br from-blue-500 to-indigo-600 shadow-blue-500/25',
    'Backend': 'bg-gradient-to-br from-green-500 to-teal-600 shadow-green-500/25',
    'Tools & Methods': 'bg-gradient-to-br from-purple-500 to-violet-600 shadow-purple-500/25',
    'default': 'bg-gradient-to-br from-gray-500 to-gray-600 shadow-gray-500/25'
  };

  // Get a color class for a skill based on its category
  const getColorClass = (category: string) => {
    return categoryColors[category] || categoryColors.default;
  };

  // Calculate position and delay for each skill item
  const getSkillStyles = (index: number, total: number) => {
    // Create a visually pleasing layout based on index
    const rows = Math.ceil(Math.sqrt(total));
    const cols = Math.ceil(total / rows);
    
    // Calculate a base position in a grid
    const row = Math.floor(index / cols);
    const col = index % cols;
    
    // Add some randomization to make it more organic
    const randomX = Math.random() * 0.3 - 0.15; // -15% to +15%
    const randomY = Math.random() * 0.3 - 0.15;
    
    // Calculate final position percentages
    const xPos = (col / (cols - 1 || 1)) * 80 + 10 + randomX * 100;
    const yPos = (row / (rows - 1 || 1)) * 80 + 10 + randomY * 100;
    
    // Different sizes for visual interest
    const size = 70 + Math.random() * 40;
    
    // Delay each item slightly for staggered animation
    const delay = index * 0.05;
    
    return { xPos, yPos, size, delay };
  };

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-primary/5 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-secondary/5 to-transparent"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] rounded-full bg-gradient-to-br from-primary/5 to-secondary/5 blur-3xl"></div>
      </div>
      
      <Container className="relative z-10">
        <div className="text-center mb-16">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">My Tech Arsenal</h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              The technologies and tools I use to bring ideas to life
            </p>
            <div className="w-20 h-1 bg-primary mx-auto mt-6"></div>
          </FadeIn>
        </div>
        
        {/* Skills visualization */}
        <div 
          ref={containerRef}
          className="relative h-[500px] md:h-[600px] rounded-3xl border border-white/20 dark:border-gray-800/30 backdrop-blur-sm bg-white/30 dark:bg-gray-900/30 shadow-xl overflow-hidden"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Legend */}
          <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 rounded-xl shadow-lg">
            <h3 className="font-bold text-sm mb-1">Skill Categories</h3>
            {Object.entries(portfolioData.skills).map(([_, category], i) => (
              <div key={i} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${getColorClass(category.category).split(' ')[0]}`}></div>
                <span className="text-xs font-medium">{category.category}</span>
              </div>
            ))}
          </div>
          
          {/* Skills */}
          {skills.map((skill, index) => {
            const { xPos, yPos, size, delay } = getSkillStyles(index, skills.length);
            
            return (
              <motion.div
                key={`${skill.name}-${index}`}
                className={`absolute rounded-xl flex items-center justify-center text-white shadow-lg ${getColorClass(skill.category)}`}
                style={{
                  left: `${xPos}%`,
                  top: `${yPos}%`,
                  width: size,
                  height: size,
                  transform: 'translate(-50%, -50%)',
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { 
                  opacity: 1, 
                  scale: 1,
                  x: isHovering ? Math.sin(Date.now() * 0.001 + index) * 15 : 0,
                  y: isHovering ? Math.cos(Date.now() * 0.001 + index * 0.7) * 15 : 0,
                } : { 
                  opacity: 0, 
                  scale: 0 
                }}
                transition={{ 
                  duration: 0.6, 
                  delay: delay,
                  type: "spring",
                  stiffness: 100,
                  x: {
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  },
                  y: {
                    duration: 2.5,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }
                }}
                whileHover={{ 
                  scale: 1.2,
                  zIndex: 20,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
              >
                <span className="text-xs md:text-sm font-medium text-center p-2">{skill.name}</span>
              </motion.div>
            );
          })}
          
          {/* Hint text */}
          <div className="absolute left-0 right-0 bottom-4 text-center z-10 pointer-events-none">
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 1.5 }}
              className="text-gray-600 dark:text-gray-400 text-sm inline-block bg-white/70 dark:bg-gray-800/70 px-4 py-2 rounded-full backdrop-blur-sm"
            >
              Hover over the items to see them in motion
            </motion.p>
          </div>
        </div>
        
        {/* Skills summary */}
        <div className="mt-16 max-w-3xl mx-auto text-center">
          <FadeIn delay={0.3}>
            <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Full-Stack Expertise
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              With expertise spanning frontend and backend technologies, I create seamless, 
              responsive, and scalable applications. My skills encompass modern JavaScript 
              frameworks, server-side development, database management, and the latest development tools.
            </p>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
