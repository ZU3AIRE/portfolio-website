import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, forwardRef, AnchorHTMLAttributes } from 'react';
import Link from 'next/link';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  as?: 'button' | 'a';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', href, as, ...props }, ref) => {
    const buttonClasses = cn(
      'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
      // Variants
      variant === 'primary' && 'bg-primary text-white hover:bg-primary/90',
      variant === 'secondary' && 'bg-secondary text-white hover:bg-secondary/90',
      variant === 'outline' && 'border border-gray-300 bg-transparent hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800',
      variant === 'ghost' && 'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800',
      // Sizes
      size === 'sm' && 'h-9 px-3 text-sm',
      size === 'md' && 'h-10 px-4',
      size === 'lg' && 'h-12 px-6 text-lg',
      className
    );
    
    // If href is provided or as is set to 'a', render as link
    if (href || as === 'a') {
      return (
        <Link 
          href={href || '#'} 
          className={buttonClasses}
          {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
        />
      );
    }
    
    // Otherwise render as button
    return (
      <button
        ref={ref}
        className={buttonClasses}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export default Button;
