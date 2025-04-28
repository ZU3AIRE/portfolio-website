"use client";

import { useEffect, useState, useRef } from 'react';
import { motion } from '@/lib/framer-motion';
import Container from '../ui/Container';
import { FadeIn } from '../animations/FadeIn';
import portfolioData from '@/data/portfolio-data.json';

export default function TechSkillsCube() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [currentFace, setCurrentFace] = useState(0);
  
  // Extract all skills from the portfolio data
  const frontendSkills = portfolioData.skills.find(category => category.category === 'Frontend')?.items || [];
  const backendSkills = portfolioData.skills.find(category => category.category === 'Backend')?.items || [];
  const toolsSkills = portfolioData.skills.find(category => category.category === 'Tools & Methods')?.items || [];
  
  // Map skills to cube faces (we'll pick top skills for each face)
  const cubeFaces = [
    { title: "Frontend", skills: frontendSkills, color: "from-blue-500 to-indigo-600", icon: "💻" },
    { title: "Backend", skills: backendSkills, color: "from-green-500 to-teal-600", icon: "⚙️" },
    { title: "Tools & Methods", skills: toolsSkills, color: "from-purple-500 to-violet-600", icon: "🔧" },
    { title: "My Stack", skills: [...frontendSkills, ...backendSkills, ...toolsSkills].slice(0, 6), color: "from-pink-500 to-rose-600", icon: "🚀" },
    { title: "Key Skills", skills: [...frontendSkills, ...backendSkills, ...toolsSkills].slice(0, 8), color: "from-amber-500 to-orange-600", icon: "🔑" },
    { title: "Technologies", skills: [...frontendSkills, ...backendSkills, ...toolsSkills].slice(0, 7), color: "from-cyan-500 to-blue-600", icon: "🔮" }
  ];
  
  // Auto-rotate the cube
  useEffect(() => {
    if (!isAutoRotating) return;
    
    const autoRotationInterval = setInterval(() => {
      // Move to the next face
      const nextFace = (currentFace + 1) % 6;
      rotateToCubeFace(nextFace);
      setCurrentFace(nextFace);
    }, 5000); // Rotate every 5 seconds
    
    return () => clearInterval(autoRotationInterval);
  }, [isAutoRotating, currentFace]);
  
  // Rotate to specific cube face (0-5)
  const rotateToCubeFace = (faceIndex: number) => {
    switch (faceIndex) {
      case 0: // Front
        setRotateX(0);
        setRotateY(0);
        break;
      case 1: // Right
        setRotateX(0);
        setRotateY(-90);
        break;
      case 2: // Back
        setRotateX(0);
        setRotateY(-180);
        break;
      case 3: // Left
        setRotateX(0);
        setRotateY(90);
        break;
      case 4: // Top
        setRotateX(-90);
        setRotateY(0);
        break;
      case 5: // Bottom
        setRotateX(90);
        setRotateY(0);
        break;
      default:
        setRotateX(0);
        setRotateY(0);
    }
  };
  
  // Handle user interaction
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isAutoRotating) {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate rotation based on mouse position relative to center
      const newRotateY = ((e.clientX - centerX) / (rect.width / 2)) * 40;
      const newRotateX = ((e.clientY - centerY) / (rect.height / 2)) * -40;
      
      setRotateX(newRotateX);
      setRotateY(newRotateY);
    }
  };
  
  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => {
          const size = Math.random() * 6 + 2;
          const xPos = Math.random() * 100;
          const yPos = Math.random() * 100;
          const delay = Math.random() * 5;
          const duration = Math.random() * 10 + 10;
          
          return (
            <motion.div
              key={i}
              className="absolute rounded-full bg-primary/20 dark:bg-primary/30"
              style={{
                width: size,
                height: size,
                left: `${xPos}%`,
                top: `${yPos}%`,
              }}
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 1, 0],
                y: [0, -150],
                x: [0, Math.random() * 50 - 25],
              }}
              transition={{
                repeat: Infinity,
                duration: duration,
                delay: delay,
                ease: "linear",
              }}
            />
          );
        })}
      </div>
      
      <Container>
        <div className="text-center mb-16">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">My Tech Universe</h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Explore the technologies that power my projects
            </p>
            <div className="w-20 h-1 bg-primary mx-auto mt-6"></div>
          </FadeIn>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-16">
          {/* 3D Cube */}
          <div
            ref={containerRef}
            className="relative w-64 h-64 md:w-80 md:h-80 perspective-1000 mx-auto"
            onMouseEnter={() => setIsAutoRotating(false)}
            onMouseLeave={() => setIsAutoRotating(true)}
            onMouseMove={handleMouseMove}
          >            <div
              className="w-full h-full relative transform-style-preserve-3d transition-transform duration-700"
              style={{
                transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
              }}
            >
              {cubeFaces.map((face, index) => {
                // Calculate position for each face
                let transform = '';
                switch (index) {
                  case 0: // Front
                    transform = 'translateZ(8rem)';
                    break;
                  case 1: // Right
                    transform = 'rotateY(90deg) translateZ(8rem)';
                    break;
                  case 2: // Back
                    transform = 'rotateY(180deg) translateZ(8rem)';
                    break;
                  case 3: // Left
                    transform = 'rotateY(-90deg) translateZ(8rem)';
                    break;
                  case 4: // Top
                    transform = 'rotateX(90deg) translateZ(8rem)';
                    break;
                  case 5: // Bottom
                    transform = 'rotateX(-90deg) translateZ(8rem)';
                    break;
                }
                
                return (
                  <div
                    key={index}
                    className={`absolute w-full h-full bg-gradient-to-br ${face.color} rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-800/50 backface-visible flex flex-col justify-start items-center text-white`}
                    style={{ transform }}
                  >
                    <div className="text-4xl mb-3">{face.icon}</div>
                    <h3 className="text-2xl font-bold mb-4">{face.title}</h3>
                    <div className="flex flex-wrap justify-center gap-2">
                      {face.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium backdrop-blur-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Description */}
          <div className="max-w-md text-center md:text-left">
            <FadeIn delay={0.2}>
              <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                Hover & Interact
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                This interactive 3D cube represents my technical skills and expertise. 
                Hover and move your cursor to explore different areas of my tech stack, 
                or click the buttons below to focus on specific categories.
              </p>
              
              {/* Face selector buttons */}
              <div className="flex flex-wrap justify-center md:justify-start gap-2">
                {cubeFaces.map((face, index) => (
                  <button
                    key={index}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      currentFace === index
                        ? 'bg-primary text-white'
                        : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                    onClick={() => {
                      setIsAutoRotating(false);
                      rotateToCubeFace(index);
                      setCurrentFace(index);
                      // Resume auto-rotation after a delay
                      setTimeout(() => setIsAutoRotating(true), 10000);
                    }}
                  >
                    {face.icon} {face.title}
                  </button>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
        
        {/* Hint text */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Move your mouse over the cube to interact, or click a category button to focus
          </p>
        </div>
      </Container>
    </section>
  );
}
