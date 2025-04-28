'use client';

import Container from '../ui/Container';
import { FadeIn } from '../animations/FadeIn';
import portfolioData from '@/data/portfolio-data.json';
import { motion } from '@/lib/framer-motion';

export default function AboutSection() {
  const { skills } = portfolioData;

  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-900">
      <Container>
        <div className="text-center mb-12">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              I specialize in building modern web applications that combine beautiful design with powerful functionality.
              My goal is to create digital products that are not only visually appealing but also provide an excellent user experience.
            </p>
          </FadeIn>
        </div>
        
        <div className="mt-16">
          <FadeIn delay={0.3}>
            <h3 className="text-2xl font-bold text-center mb-10">My Skills</h3>
          </FadeIn>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skillCategory, index) => (
              <FadeIn key={skillCategory.category} delay={0.4 + index * 0.1} direction={index % 2 === 0 ? 'up' : 'down'}>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                  <h4 className="text-xl font-semibold mb-4 text-primary">{skillCategory.category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {skillCategory.items.map((skill) => (
                      <motion.span
                        key={skill}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
