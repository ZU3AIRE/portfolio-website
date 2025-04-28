import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export default function Container({
  className,
  children,
  size = 'lg',
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto px-4 sm:px-6 w-full',
        size === 'sm' && 'max-w-3xl',
        size === 'md' && 'max-w-5xl',
        size === 'lg' && 'max-w-7xl',
        size === 'xl' && 'max-w-[90rem]',
        size === 'full' && 'max-w-full',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
