'use client';

import Image from 'next/image';
import { motion } from '@/lib/framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import Button from '../ui/Button';
import Container from '../ui/Container';
import { FadeIn } from '../animations/FadeIn';
import portfolioData from '@/data/portfolio-data.json';

export default function HeroSection() {
  const { personal } = portfolioData;

  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <FadeIn delay={0.2}>
              <h2 className="text-lg font-semibold text-primary mb-2">Hello, I am</h2>
            </FadeIn>
            <FadeIn delay={0.3}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                {personal.name}
              </h1>
            </FadeIn>
            <FadeIn delay={0.4}>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-600 dark:text-gray-400 mb-6">
                {personal.title}
              </h2>
            </FadeIn>
            <FadeIn delay={0.5}>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
                {personal.bio}
              </p>
            </FadeIn>
            <FadeIn delay={0.6}>
              <div className="flex flex-wrap gap-4">
                <Button 
                  as="a" 
                  href="#contact"
                  className="flex items-center gap-2"
                >
                  Get in touch <FiArrowRight />
                </Button>
                <Button 
                  as="a" 
                  href="#projects"
                  variant="outline"
                >
                  View my work
                </Button>
              </div>
            </FadeIn>
          </div>
          <FadeIn delay={0.7} direction="left">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl" />
              <motion.div
                className="relative bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden border-4 border-primary/30 shadow-xl aspect-square max-w-md mx-auto"
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(59, 130, 246, 0.3)",
                    "0 0 60px rgba(59, 130, 246, 0.4)",
                    "0 0 20px rgba(59, 130, 246, 0.3)",
                  ],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                {personal.avatarUrl ? (
                  <Image
                    src={personal.avatarUrl}
                    alt={personal.name}
                    width={500}
                    height={500}
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-8xl font-bold text-primary">
                    {personal.name.charAt(0)}
                  </div>
                )}
              </motion.div>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
