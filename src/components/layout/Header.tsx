"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from '@/lib/framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import { cn, scrollToElement } from '@/lib/utils';
import Container from '../ui/Container';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Certifications', href: '/#certifications' },
  { label: 'Volunteering', href: '/#volunteering' },
  { label: 'Contact', href: '/#contact' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      // Update header styling based on scroll position
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      
      // Determine active section based on scroll position
      const sections = navItems.map(item => ({
        id: item.href === '/' ? 'home' : item.href.replace('/#', ''),
        href: item.href
      }));
      
      // Get all section elements and their positions
      const sectionPositions = sections.map(section => {
        const element = section.id === 'home' 
          ? document.getElementById('hero') || document.documentElement 
          : document.getElementById(section.id);
        
        if (!element) return { id: section.id, top: 0, bottom: 0 };
        
        const rect = element.getBoundingClientRect();
        return {
          id: section.id,
          top: rect.top + window.scrollY,
          bottom: rect.bottom + window.scrollY
        };
      });
      
      // Get current scroll position with a small offset for better detection
      const scrollPosition = window.scrollY + 100;
      
      // Find the current active section
      let current = 'home';
      
      // Special case for top of page (home)
      if (scrollPosition < 200) {
        current = 'home';
      } else {
        // Find the section that the user has scrolled to
        for (let i = 0; i < sectionPositions.length; i++) {
          const section = sectionPositions[i];
          const nextSection = sectionPositions[i + 1];
          
          // Check if we're in this section
          if (
            // We're below the top of this section
            scrollPosition >= section.top &&
            // And either this is the last section or we're above the next section
            (!nextSection || scrollPosition < nextSection.top)
          ) {
            current = section.id;
            break;
          }
        }
      }
      
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check for active section
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle smooth scrolling with offset
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // If it's a hash link, use our custom smooth scroll
    if (href.startsWith('/#')) {
      e.preventDefault();
      const targetId = href.replace('/#', '');
      scrollToElement(targetId, isScrolled ? 80 : 100);
    }
  };

  return (
    <header
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-500',
        isScrolled
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md py-3'
          : 'bg-transparent py-6'
      )}
    >
      <Container>
        <div className="flex items-center justify-between">
          <Link 
            href="/" 
            className="group relative flex items-center"
            onClick={(e) => handleNavClick(e, '/')}
          >
            <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <motion.span
              className="relative text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Zubair J.
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => {
              const isActive = activeSection === (item.href === '/' ? 'home' : item.href.replace('/#', ''));
              
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  <Link
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={cn(
                      "relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:text-primary",
                      isActive ? "text-primary" : "text-gray-700 dark:text-gray-300"
                    )}
                  >
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeSection"
                        className="absolute inset-0 bg-primary/10 dark:bg-primary/20 rounded-full -z-10"
                        initial={false}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden text-gray-700 dark:text-gray-300 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            whileTap={{ scale: 0.9 }}
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="md:hidden mt-4 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-xl border border-gray-200 dark:border-gray-700 shadow-xl overflow-hidden"
            >
              <nav className="flex flex-col py-2">
                {navItems.map((item, index) => {
                  const isActive = activeSection === (item.href === '/' ? 'home' : item.href.replace('/#', ''));
                  
                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="relative"
                    >
                      <Link
                        href={item.href}
                        onClick={(e) => {
                          handleNavClick(e, item.href);
                          setMobileMenuOpen(false);
                        }}
                        className={cn(
                          "flex items-center px-6 py-3 transition-colors",
                          isActive 
                            ? "bg-primary/10 text-primary font-medium" 
                            : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                        )}
                      >
                        {item.label}
                        {isActive && (
                          <div className="ml-2 w-1.5 h-1.5 rounded-full bg-primary" />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </header>
  );
}
