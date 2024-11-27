'use client';

import { motion } from 'framer-motion';

interface GradientBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export function GradientBackground({ children, className = '' }: GradientBackgroundProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'linear',
        }}
        style={{
          background: `radial-gradient(circle at 0% 0%, hsl(var(--primary)/0.15), transparent 50%),
                      radial-gradient(circle at 100% 100%, hsl(var(--accent)/0.15), transparent 50%)`,
          backgroundSize: '100% 100%',
          filter: 'blur(100px)',
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
