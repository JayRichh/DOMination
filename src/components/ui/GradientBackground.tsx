"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface GradientBackgroundProps {
  variant?: "default" | "radial" | "mesh";
  interactive?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function GradientBackground({
  variant = "default",
  interactive = false,
  className,
  children,
}: GradientBackgroundProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!interactive) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      setMousePosition({
        x: (clientX / window.innerWidth) * 100,
        y: (clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [interactive]);

  const renderGradient = () => {
    switch (variant) {
      case "radial":
        return (
          <>
            <div className="absolute inset-0 bg-background" />
            <motion.div
              className="absolute inset-0"
              animate={{
                opacity: [0.5, 0.6, 0.5],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
              style={
                interactive
                  ? {
                      background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, hsl(var(--primary) / 0.15), transparent 50%)`,
                    }
                  : {
                      background: `radial-gradient(circle at 50% 50%, hsl(var(--primary) / 0.15), transparent 50%)`,
                    }
              }
            />
            <motion.div
              className="absolute inset-0"
              animate={{
                opacity: [0.3, 0.4, 0.3],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear",
                delay: 0.5,
              }}
              style={{
                background: `radial-gradient(circle at ${interactive ? `${100 - mousePosition.x}% ${100 - mousePosition.y}%` : "75% 25%"}, hsl(var(--accent) / 0.15), transparent 50%)`,
              }}
            />
          </>
        );

      case "mesh":
        return (
          <>
            <div className="absolute inset-0 bg-background" />
            <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,hsl(var(--border)/0.2)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.2)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
            <motion.div
              className="absolute inset-0"
              animate={{
                opacity: [0.1, 0.15, 0.1],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                background: "radial-gradient(circle at center, hsl(var(--primary) / 0.2), transparent 70%)",
              }}
            />
          </>
        );

      default:
        return (
          <>
            <div className="absolute inset-0 bg-background" />
            <motion.div
              className="absolute inset-0"
              animate={{
                opacity: [0.3, 0.4, 0.3],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                background: "linear-gradient(to right, hsl(var(--primary) / 0.1), hsl(var(--accent) / 0.1))",
              }}
            />
          </>
        );
    }
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {renderGradient()}
      {children && <div className="relative z-10">{children}</div>}
    </div>
  );
}
