import Link from 'next/link';
import { FiGithub, FiLinkedin, FiTwitter, FiInstagram, FiYoutube, FiCodepen, FiHeart, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import Container from '../ui/Container';
import portfolioData from '@/data/portfolio-data.json';
import { BiGlobe } from 'react-icons/bi';
import { BsStackOverflow } from 'react-icons/bs';

export default function Footer() {
  const { personal, contact } = portfolioData;
  const currentYear = new Date().getFullYear();
  
  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'github':
        return <FiGithub className="w-5 h-5" />;
      case 'linkedin':
        return <FiLinkedin className="w-5 h-5" />;
      case 'twitter':
        return <FiTwitter className="w-5 h-5" />;
      case 'instagram':
        return <FiInstagram className="w-5 h-5" />;
      case 'youtube':
        return <FiYoutube className="w-5 h-5" />;
      case 'codepen':
        return <FiCodepen className="w-5 h-5" />;
      case 'stackoverflow': 
        return <BsStackOverflow className="w-5 h-5" />;
      default:
        return null;
    }
  };

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 pt-16 pb-8 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 -right-32 w-96 h-96 rounded-full bg-primary/5 blur-3xl opacity-60"></div>
        <div className="absolute -bottom-20 -left-32 w-96 h-96 rounded-full bg-secondary/5 blur-3xl opacity-60"></div>
      </div>
      
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                {personal.name}
              </h3>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
              {personal.shortBio || personal.bio}
            </p>
            
            {/* Social Links */}
            <div className="flex flex-wrap gap-3">
              {personal.socialLinks.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary hover:border-primary dark:hover:border-primary transition-colors"
                  aria-label={`${social.platform} profile`}
                >
                  {getSocialIcon(social.platform)}
                </a>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-5 relative inline-block">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                Navigation
              </span>
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-primary"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/" 
                  className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors flex items-center"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2 opacity-70"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/#experience" 
                  className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors flex items-center"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2 opacity-70"></span>
                  Experience
                </Link>
              </li>
              <li>
                <Link 
                  href="/#projects" 
                  className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors flex items-center"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2 opacity-70"></span>
                  Projects
                </Link>
              </li>
              <li>
                <Link 
                  href="/#certifications" 
                  className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors flex items-center"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2 opacity-70"></span>
                  Certifications
                </Link>
              </li>
              <li>
                <Link 
                  href="/#volunteering" 
                  className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors flex items-center"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2 opacity-70"></span>
                  Volunteering
                </Link>
              </li>
              <li>
                <Link 
                  href="/#contact" 
                  className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors flex items-center"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2 opacity-70"></span>
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-5 relative inline-block">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                Contact Info
              </span>
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-primary"></span>
            </h3>
            <ul className="space-y-3">
              <li className="text-gray-600 dark:text-gray-400 flex items-start">
                <span className="text-primary mt-1 mr-2">
                  <FiMail className="w-4 h-4" />
                </span>
                <a href={`mailto:${contact.email}`} className="hover:text-primary dark:hover:text-primary transition-colors">
                  {contact.email}
                </a>
              </li>
              <li className="text-gray-600 dark:text-gray-400 flex items-start">
                <span className="text-primary mt-1 mr-2">
                  <FiPhone className="w-4 h-4" />
                </span>
                <a href={`tel:${contact.phone}`} className="hover:text-primary dark:hover:text-primary transition-colors">
                  {contact.phone}
                </a>
              </li>
              <li className="text-gray-600 dark:text-gray-400 flex items-start">
                <span className="text-primary mt-1 mr-2">
                  <FiMapPin className="w-4 h-4" />
                </span>
                {contact.location}
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 dark:text-gray-400 text-sm order-2 md:order-1">
            &copy; {currentYear} {personal.name}. All rights reserved.
          </p>
          
          <div className="text-sm text-gray-500 dark:text-gray-500 flex items-center order-1 md:order-2">
            <span>Designed & built with</span>
            <FiHeart className="text-red-500 mx-1 w-4 h-4" />
            <span>using Next.js & Tailwind CSS</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
