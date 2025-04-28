"use client";

import { useState, useEffect, useRef } from 'react';
import { motion } from '@/lib/framer-motion';
import Container from '../ui/Container';
import { FadeIn } from '../animations/FadeIn';
import portfolioData from '@/data/portfolio-data.json';

export default function InteractiveSkillsShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  
  // Extract skills from portfolio data and flatten them
  const allSkills = portfolioData.skills.flatMap(category => 
    category.items.map(skill => ({
      name: skill,
      category: category.category
    }))
  );
  
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height
      });
    }
  };

  // Colors for the skill orbs based on category
  const categoryColors: Record<string, { bg: string, text: string }> = {
    "Frontend": { bg: "bg-blue-500/80", text: "text-white" },
    "Backend": { bg: "bg-green-500/80", text: "text-white" },
    "Tools & Methods": { bg: "bg-purple-500/80", text: "text-white" },
    "Other": { bg: "bg-amber-500/80", text: "text-white" }
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-950">
        <div className="absolute inset-0 opacity-30 dark:opacity-20 bg-[radial-gradient(circle_at_center,_var(--primary)_0,_transparent_65%)]"></div>
      </div>

      <Container>
        <div className="text-center relative z-10 mb-16">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">My Digital Universe</h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Explore my technical skills in this interactive cosmos. Hover and click the orbs to see what I can do.
            </p>
            <div className="w-20 h-1 bg-primary mx-auto mt-6"></div>
          </FadeIn>
        </div>
        
        <div 
          ref={containerRef}
          className="relative h-[500px] md:h-[600px] w-full rounded-2xl backdrop-blur-sm bg-white/30 dark:bg-gray-900/30 shadow-xl border border-white/20 dark:border-gray-800/50 overflow-hidden"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-center p-8 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg border border-white/20 dark:border-gray-800/50 w-40 h-40 md:w-52 md:h-52 flex items-center justify-center relative"
            >
              <div>
                <h3 className="font-bold text-xl md:text-2xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                  {portfolioData.personal.name.split(' ')[0]}
                </h3>
                <p className="text-sm md:text-base font-medium">
                  {portfolioData.personal.title}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Skill orbs */}
          {allSkills.map((skill, index) => {
            // Calculate positions based on golden ratio for better distribution
            const angleOffset = index * (Math.PI * 0.618033988749895);
            const distance = 0.4 + (index % 3) * 0.15; // Vary the distance from center
            
            // Base position using trigonometry for circular arrangement
            let x = Math.cos(angleOffset) * distance;
            let y = Math.sin(angleOffset) * distance;
            
            // Add responsive sizing
            const size = windowSize.width < 768 ? 
              50 + Math.random() * 20 : 
              70 + Math.random() * 30;
              
            // Add mouse interaction effect when hovering
            if (isHovering) {
              // Calculate vector from mouse to skill
              const dx = x - (mousePosition.x - 0.5) * 2;
              const dy = y - (mousePosition.y - 0.5) * 2;
              const dist = Math.sqrt(dx * dx + dy * dy);
              
              // Apply subtle repulsion effect
              const repulsionStrength = 0.05 / (dist + 0.1);
              x += dx * repulsionStrength;
              y += dy * repulsionStrength;
            }
            
            // Convert to pixel coordinates
            const xPos = 50 + x * 50 + '%';
            const yPos = 50 + y * 50 + '%';

            // Get colors based on category
            const color = categoryColors[skill.category] || 
              { bg: "bg-gray-500/80", text: "text-white" };

            return (
              <motion.div
                key={`${skill.name}-${index}`}
                className={`absolute rounded-full ${color.bg} ${color.text} shadow-lg backdrop-blur-sm flex items-center justify-center cursor-pointer select-none border border-white/30 dark:border-gray-700/50 hover:scale-110`}
                style={{
                  left: xPos,
                  top: yPos,
                  width: size,
                  height: size,
                  transform: "translate(-50%, -50%)",
                  zIndex: Math.floor(10 - distance * 10) // Items closer to center are on top
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  x: isHovering ? Math.sin(Date.now() * 0.001 + index) * 8 : 0,
                  y: isHovering ? Math.cos(Date.now() * 0.001 + index * 0.7) * 8 : 0,
                }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.1 + index * 0.05,
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
                  zIndex: 30,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)"
                }}
              >
                <span className="text-xs md:text-sm font-medium text-center p-1">{skill.name}</span>
              </motion.div>
            );
          })}
          
          {/* Animated connection lines */}
          <svg className="absolute inset-0 w-full h-full z-0 opacity-20 pointer-events-none">
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--primary)" />
                <stop offset="100%" stopColor="var(--secondary)" />
              </linearGradient>
            </defs>
            {/* These would be dynamically generated in a more advanced implementation */}
            <circle cx="50%" cy="50%" r="30%" stroke="url(#lineGradient)" strokeWidth="1" fill="none" strokeDasharray="5 3" />
            <circle cx="50%" cy="50%" r="20%" stroke="url(#lineGradient)" strokeWidth="1" fill="none" strokeDasharray="3 5" />
            <circle cx="50%" cy="50%" r="10%" stroke="url(#lineGradient)" strokeWidth="1" fill="none" strokeDasharray="1 3" />
          </svg>

          {/* Hint text */}
          <div className="absolute bottom-4 left-0 right-0 text-center text-gray-500 dark:text-gray-400 text-sm md:text-base">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              Move your cursor to interact with my skills
            </motion.p>
          </div>
        </div>
      </Container>
    </section>
  );
}
