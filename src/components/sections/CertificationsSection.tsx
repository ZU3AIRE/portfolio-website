"use client"

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView, AnimatePresence } from '@/lib/framer-motion';
import { FiAward, FiExternalLink } from 'react-icons/fi';
import Container from '../ui/Container';
import portfolioData from '@/data/portfolio-data.json';

interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  description: string;
  credentialUrl: string;
  imageUrl: string;
}

export default function CertificationsSection() {
  const certifications: Certification[] = portfolioData.certifications || [];
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });

  return (
    <section 
      id="certifications" 
      ref={sectionRef}
      className="py-24 relative overflow-hidden bg-white dark:bg-gray-800"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-40 -right-20 w-96 h-96 rounded-full bg-primary/5 blur-3xl opacity-60"></div>
        <div className="absolute bottom-40 -left-20 w-96 h-96 rounded-full bg-secondary/5 blur-3xl opacity-60"></div>
        
        {/* Grid pattern */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="certifications-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeOpacity="0.05" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#certifications-grid)" />
        </svg>
        
        {/* Animated floating elements */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`cert-decoration-${i}`}
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
              Professional Certifications
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Credentials and qualifications that validate my expertise and commitment to continuous learning
          </motion.p>
          
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-secondary to-transparent"
          />
        </motion.div>
        
        {/* Certifications Grid */}
        {certifications.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                className="group h-full"
              >
                <div className="relative h-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300">
                  {/* Certificate Top Section with Icon/Image */}
                  <div className="relative h-48 bg-gradient-to-r from-primary/20 to-secondary/20 overflow-hidden">
                    {/* Decorative patterns */}
                    <div className="absolute inset-0 opacity-20">
                      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <pattern id={`cert-pattern-${cert.id}`} width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
                          <path d="M0 20 L40 20 M20 0 L20 40" stroke="currentColor" strokeWidth="0.5" fill="none" />
                        </pattern>
                        <rect width="100%" height="100%" fill={`url(#cert-pattern-${cert.id})`} />
                      </svg>
                    </div>
                    
                    {/* Certificate badge/image */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      {cert.imageUrl ? (
                        <div className="relative w-32 h-32">
                          <Image 
                            src={cert.imageUrl} 
                            alt={cert.issuer}
                            fill
                            className="object-contain"
                          />
                        </div>
                      ) : (
                        <FiAward className="w-16 h-16 text-primary/70" />
                      )}
                    </div>
                    
                    {/* Date badge */}
                    <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 dark:bg-gray-800/90 shadow-md text-sm font-medium rounded-full">
                      {cert.date}
                    </div>
                  </div>

                  {/* Certificate Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">
                      {cert.name}
                    </h3>
                    
                    <div className="text-primary font-medium mb-4">
                      {cert.issuer}
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-6">
                      {cert.description}
                    </p>
                    
                    {/* View Credential Button */}
                    {cert.credentialUrl && (
                      <a 
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                      >
                        View Credential <FiExternalLink className="ml-1" />
                      </a>
                    )}
                  </div>
                  
                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700">
            <div className="inline-flex justify-center items-center w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-700 mb-4">
              <FiAward size={32} className="text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">No certifications available</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Professional certifications will appear here once added.
            </p>
          </div>
        )}
      </Container>
    </section>
  );
}