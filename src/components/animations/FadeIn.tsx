'use client';

import { motion } from '@/lib/framer-motion';
import { ReactNode } from 'react';

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
  duration?: number;
}

export const FadeIn = ({
  children,
  delay = 0,
  direction = 'up',
  className = '',
  duration = 0.5
}: FadeInProps) => {
  const getDirectionVariants = () => {
    switch (direction) {
      case 'up':
        return { y: 40 };
      case 'down':
        return { y: -40 };
      case 'left':
        return { x: 40 };      case 'right':
        return { x: -40 };
      case 'none':
      default:
        return { x: 0, y: 0 };
    }
  };
  
  return (
    <motion.div
      initial={{ 
        opacity: 0,
        ...getDirectionVariants()
      }}
      animate={{ 
        opacity: 1,
        x: 0,
        y: 0
      }}
      transition={{ 
        duration: duration,
        delay: delay,
        ease: 'easeInOut' 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
