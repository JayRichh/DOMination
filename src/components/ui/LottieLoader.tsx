"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "~/utils/cn";

interface LottieLoaderProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeStyles = {
  sm: "w-8 h-8",
  md: "w-16 h-16",
  lg: "w-32 h-32",
} as const;

type LottiePlayerElement = HTMLElement & {
  src?: string;
  background?: string;
  speed?: string;
  loop?: boolean;
  autoplay?: boolean;
  style?: React.CSSProperties;
};

declare global {
  interface HTMLElementTagNameMap {
    'lottie-player': LottiePlayerElement;
  }
}

let scriptLoaded = false;

export function LottieLoader({ size = "md", className }: LottieLoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<LottiePlayerElement | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;

    const createPlayer = () => {
      if (!containerRef.current || playerRef.current) return;
      
      const player = document.createElement('lottie-player') as LottiePlayerElement;
      player.setAttribute('src', "https://lottie.host/3ea925c6-66ed-4459-b83c-414652b9e48a/CnboMeq0M4.json");
      player.setAttribute('background', "transparent");
      player.setAttribute('speed', "1");
      player.style.width = '100%';
      player.style.height = '100%';
      player.setAttribute('loop', 'true');
      player.setAttribute('autoplay', 'true');

      containerRef.current.appendChild(player);
      playerRef.current = player;
    };

    if (!scriptLoaded && !customElements.get('lottie-player')) {
      scriptLoaded = true;
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/@lottiefiles/lottie-player@2.0.8/dist/lottie-player.js';
      script.async = true;
      script.onload = createPlayer;
      document.head.appendChild(script);
    } else {
      createPlayer();
    }

    // Add a delay before starting to fade out
    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, 1000); // Keep visible for 1 second after content loads

    return () => {
      clearTimeout(timeout);
      if (playerRef.current && containerRef.current) {
        containerRef.current.removeChild(playerRef.current);
        playerRef.current = null;
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className={cn(
        sizeStyles[size], 
        "transition-opacity duration-500",
        isVisible ? "opacity-100" : "opacity-0",
        className
      )}
      aria-label="Loading"
    />
  );
}
