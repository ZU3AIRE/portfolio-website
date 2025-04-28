"use client"
import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useInView, useMotionValue, useTransform } from '@/lib/framer-motion';
import { FiGithub, FiExternalLink, FiArrowRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Container from '../ui/Container';
import Button from '../ui/Button';
import { FadeIn } from '../animations/FadeIn';
import portfolioData from '@/data/portfolio-data.json';

export default function ProjectsSection() {
  const { featured, projects } = portfolioData;
  const [filter, setFilter] = useState('all');
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });

  // Combine featured and regular projects for filtering
  const allProjects = [...featured, ...projects];
  
  // Get unique technology tags for filter buttons
  const allTechnologies = new Set<string>();
  allProjects.forEach((project) => {
    project.technologies.forEach((tech) => {
      allTechnologies.add(tech);
    });
  });
  
  const filterButtons = ['all', ...Array.from(allTechnologies).slice(0, 10)];
  
  // Filter projects based on selected technology
  const filteredProjects = filter === 'all'
    ? allProjects
    : allProjects.filter((project) =>
        project.technologies.includes(filter)
      );

  // Navigation for featured projects
  const nextProject = useCallback(() => {
    if (filteredProjects.length <= 1) return;
    setActiveIndex((prev) => (prev + 1) % filteredProjects.length);
  }, [filteredProjects.length]);

  const prevProject = useCallback(() => {
    if (filteredProjects.length <= 1) return;
    setActiveIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
  }, [filteredProjects.length]);

  // Handle mouse movement for 3D effect on project cards
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const { currentTarget, clientX, clientY } = event;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;

    // Update card rotation based on mouse position
    currentTarget.style.transform =
      `perspective(1000px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
    // Reset card rotation when mouse leaves
    event.currentTarget.style.transform =
      `perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)`;
  };

  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className="py-24 relative overflow-hidden bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-900/50 dark:to-gray-800"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Abstract shapes */}
        <div className="absolute top-40 -left-20 w-96 h-96 rounded-full bg-primary/10 blur-3xl opacity-60"></div>
        <div className="absolute bottom-40 -right-20 w-96 h-96 rounded-full bg-secondary/10 blur-3xl opacity-60"></div>
        
        {/* Grid pattern */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="project-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeOpacity="0.05" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#project-grid)" />
        </svg>
        
        {/* Animated floating elements */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`decoration-${i}`}
            className="absolute rounded-full bg-primary/10 dark:bg-primary/20"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              left: `${Math.random() * 90 + 5}%`,
              top: `${Math.random() * 90 + 5}%`,
              opacity: Math.random() * 0.5 + 0.2,
            }}
            animate={{
              y: [Math.random() * 20, Math.random() * -20, Math.random() * 20],
              x: [Math.random() * 20, Math.random() * -20, Math.random() * 20],
            }}
            transition={{
              duration: Math.random() * 5 + 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
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
              Featured Projects
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Explore my portfolio of carefully crafted projects showcasing my technical expertise and creative solutions
          </motion.p>
          
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-secondary to-transparent"
          />
        </motion.div>
        
        {/* Filter Navigation */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mb-16"
        >
          <div className="mb-8">
            <div className="relative w-full flex justify-center">
              <div className="max-w-[95vw] bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg p-2 rounded-full shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
                  <div className="inline-flex gap-2">
                    {filterButtons.map((tech) => (
                      <Button
                        key={tech}
                        variant={filter === tech ? 'primary' : 'ghost'}
                        size="sm"
                        onClick={() => {
                          setFilter(tech);
                          setActiveIndex(0);
                        }}
                        className={`
                          capitalize rounded-full px-4 py-2 transition-all duration-300 whitespace-nowrap
                          ${filter === tech ? 'shadow-md shadow-primary/20' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}
                        `}
                      >
                        {tech}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Featured Project Showcase */}
        {filteredProjects.length > 0 && (
          <div className="mb-20">
            <AnimatePresence mode="wait">
              <motion.div 
                key={`featured-${activeIndex}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  {/* Project Image */}
                  <div 
                    className="lg:col-span-7 relative overflow-hidden rounded-2xl shadow-2xl"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    style={{ transition: 'transform 0.3s ease-out' }}
                  >
                    <div className="relative aspect-[16/9] overflow-hidden group rounded-2xl border border-white/10 bg-gradient-to-br from-gray-900 to-gray-800">
                      {filteredProjects[activeIndex].imageUrl ? (
                        <Image
                          src={filteredProjects[activeIndex].imageUrl}
                          alt={filteredProjects[activeIndex].title}
                          fill
                          className="object-cover transition-all duration-700 ease-out group-hover:scale-110"
                          priority
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-3xl font-bold text-white/60">
                            {filteredProjects[activeIndex].title}
                          </span>
                        </div>
                      )}
                      
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-80"></div>
                      
                      {/* Featured badge */}
                      {filteredProjects[activeIndex].featured && (
                        <div className="absolute top-4 left-4 bg-primary/80 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                          Featured
                        </div>
                      )}
                    </div>
                    
                    {/* Navigation buttons */}
                    {filteredProjects.length > 1 && (
                      <div className="absolute bottom-4 right-4 flex gap-2">
                        <button 
                          onClick={prevProject}
                          className="p-2 rounded-full bg-black/30 backdrop-blur-md hover:bg-primary/80 text-white transition-all duration-300"
                          aria-label="Previous project"
                        >
                          <FiChevronLeft size={20} />
                        </button>
                        <button 
                          onClick={nextProject}
                          className="p-2 rounded-full bg-black/30 backdrop-blur-md hover:bg-primary/80 text-white transition-all duration-300"
                          aria-label="Next project"
                        >
                          <FiChevronRight size={20} />
                        </button>
                      </div>
                    )}
                  </div>
                  
                  {/* Project Details */}
                  <div className="lg:col-span-5">
                    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg p-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl">
                      <h3 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        {filteredProjects[activeIndex].title}
                      </h3>
                      
                      <p className="text-gray-700 dark:text-gray-300 mb-6">
                        {filteredProjects[activeIndex].description}
                      </p>
                      
                      <div className="mb-6">
                        <h4 className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">Technologies</h4>
                        <div className="flex flex-wrap gap-2">
                          {filteredProjects[activeIndex].technologies.map((tech) => (
                            <span
                              key={`${filteredProjects[activeIndex].id}-${tech}`}
                              className="text-sm px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex gap-4">
                        {filteredProjects[activeIndex].githubUrl && (
                          <a
                            href={filteredProjects[activeIndex].githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center rounded-md font-medium transition-colors px-4 h-10 border border-gray-300 bg-transparent hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
                          >
                            <FiGithub className="mr-2" /> GitHub
                          </a>
                        )}
                        {filteredProjects[activeIndex].liveUrl && (
                          <a
                            href={filteredProjects[activeIndex].liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center rounded-md font-medium transition-colors px-4 h-10 bg-primary text-white hover:bg-primary/90"
                          >
                            <FiExternalLink className="mr-2" /> Live Demo
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* Project indicator dots */}
            {filteredProjects.length > 1 && (
              <div className="flex justify-center mt-8 gap-2">
                {filteredProjects.map((_, index) => (
                  <button
                    key={`indicator-${index}`}
                    onClick={() => setActiveIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      activeIndex === index ? 'bg-primary scale-125' : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to project ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
        
        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => {
              // Skip the currently featured project
              if (index === activeIndex) return null;
              
              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ 
                    duration: 0.5,
                    delay: index * 0.1,
                    layout: { type: "spring", stiffness: 200, damping: 20 }
                  }}
                  className="group h-full"
                >
                  <div 
                    className="relative h-full overflow-hidden rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    style={{ transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}
                  >
                    {/* Project Image */}
                    <div className="relative aspect-video overflow-hidden">
                      {project.imageUrl ? (
                        <Image
                          src={project.imageUrl}
                          alt={project.title}
                          fill
                          className="object-cover transition-all duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-100 dark:from-gray-800 dark:to-gray-700">
                          <span className="text-xl font-bold text-gray-400">{project.title}</span>
                        </div>
                      )}
                      
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* Quick action buttons that appear on hover */}
                      <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        {project.githubUrl && (
                          <motion.a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-lg backdrop-blur-sm hover:bg-primary hover:text-white transition-all duration-300"
                            aria-label={`GitHub repository for ${project.title}`}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <FiGithub size={18} />
                          </motion.a>
                        )}
                        {project.liveUrl && (
                          <motion.a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-lg backdrop-blur-sm hover:bg-primary hover:text-white transition-all duration-300"
                            aria-label={`Live demo for ${project.title}`}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <FiExternalLink size={18} />
                          </motion.a>
                        )}
                        <motion.button
                          onClick={() => setActiveIndex(index)}
                          className="p-2 rounded-full bg-primary/90 text-white shadow-lg backdrop-blur-sm hover:bg-primary transition-all duration-300"
                          aria-label={`View details for ${project.title}`}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FiArrowRight size={18} />
                        </motion.button>
                      </div>
                    </div>
                    
                    {/* Project Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                        {project.title}
                      </h3>
                      
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                        {project.description}
                      </p>
                      
                      {/* Technologies used */}
                      <div className="flex flex-wrap gap-1 mt-auto">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <span
                            key={`${project.id}-${tech}`}
                            className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
        
        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700"
          >
            <div className="inline-flex justify-center items-center w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-700 mb-4">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
                <line x1="9" y1="9" x2="9.01" y2="9" />
                <line x1="15" y1="9" x2="15.01" y2="9" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">No projects found</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              No projects found with the selected technology.
            </p>
            <Button 
              variant="primary"
              onClick={() => setFilter('all')}
            >
              Show all projects
            </Button>
          </motion.div>
        )}
      </Container>
    </section>
  );
}
