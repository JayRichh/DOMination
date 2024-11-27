'use client';

import { motion } from 'framer-motion';
import { cn } from '~/utils/cn';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'outline';
  className?: string;
}

const difficultyStyles = {
  easy: "bg-green-500/10 text-green-500 border-green-500/20",
  medium: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  hard: "bg-red-500/10 text-red-500 border-red-500/20"
};

export function Badge({ 
  children, 
  variant = 'default',
  className 
}: BadgeProps) {
  return (
    <motion.span
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        'inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-colors border',
        variant === 'default' && 'bg-primary/10 text-primary border-primary/20',
        variant === 'outline' && 'border-primary text-primary',
        className
      )}
    >
      {children}
    </motion.span>
  );
}

export function DifficultyBadge({ difficulty }: { difficulty: string }) {
  return (
    <motion.span
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        'inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase border',
        difficultyStyles[difficulty as keyof typeof difficultyStyles]
      )}
    >
      {difficulty}
    </motion.span>
  );
}

export function TagBadge({ tag }: { tag: string }) {
  return (
    <motion.span
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide bg-primary/10 text-primary border border-primary/20"
    >
      {tag}
    </motion.span>
  );
}
