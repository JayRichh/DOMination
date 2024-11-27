"use client";

import { useEffect, useRef, useState } from "react";
import type { ComparisonSliderProps, SliderProps } from "~/types/components";

function HorizontalSlider({ userOutput, targetOutput, xrayMode }: SliderProps) {
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;

      const rect = container.getBoundingClientRect();
      const x = "touches" in e ? e.touches[0].clientX : e.clientX;
      const relativeX = x - rect.left;
      const newPosition = Math.max(0, Math.min(100, (relativeX / rect.width) * 100));
      
      setPosition(newPosition);
    };

    const handleUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMove);
      window.addEventListener("touchmove", handleMove);
      window.addEventListener("mouseup", handleUp);
      window.addEventListener("touchend", handleUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("mouseup", handleUp);
      window.removeEventListener("touchend", handleUp);
    };
  }, [isDragging]);

  const xrayStyles = xrayMode ? {
    filter: 'invert(1)',
    mixBlendMode: 'difference' as const,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  } : {};

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-video select-none touch-none rounded-lg overflow-hidden module-container-inner"
      onMouseDown={() => setIsDragging(true)}
      onTouchStart={() => setIsDragging(true)}
    >
      <div 
        className="absolute inset-0 overflow-hidden transition-all duration-200"
        style={xrayStyles}
      >
        {targetOutput}
      </div>

      <div 
        className="absolute inset-0 overflow-hidden transition-all duration-200"
        style={{ 
          clipPath: `inset(0 ${100 - position}% 0 0)`,
          ...xrayStyles
        }}
      >
        {userOutput}
      </div>

      <div 
        className="absolute top-0 bottom-0 w-0.5 bg-[#6B8AFF] dark:bg-primary cursor-ew-resize transition-transform duration-75"
        style={{ 
          left: `${position}%`,
          transform: 'translateX(-50%)'
        }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#6B8AFF] dark:bg-primary rounded-full shadow-lg" />
        <div className="absolute top-1/2 -translate-y-1/2 -left-6 text-xs text-[#6B8AFF] dark:text-primary">◄</div>
        <div className="absolute top-1/2 -translate-y-1/2 -right-6 text-xs text-[#6B8AFF] dark:text-primary">►</div>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-4 left-4 px-2 py-1 text-xs font-medium rounded-md bg-card/30 backdrop-blur-sm text-readable border border-border/40 transition-opacity duration-200"
          style={{ opacity: position > 50 ? 0 : 1 }}
        >
          Your Output
        </div>
        <div 
          className="absolute top-4 right-4 px-2 py-1 text-xs font-medium rounded-md bg-card/30 backdrop-blur-sm text-readable border border-border/40 transition-opacity duration-200"
          style={{ opacity: position < 50 ? 0 : 1 }}
        >
          Target
        </div>
      </div>
    </div>
  );
}

function VerticalSlider({ userOutput, targetOutput, xrayMode }: SliderProps) {
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;

      const rect = container.getBoundingClientRect();
      const y = "touches" in e ? e.touches[0].clientY : e.clientY;
      const relativeY = y - rect.top;
      const newPosition = Math.max(0, Math.min(100, (relativeY / rect.height) * 100));
      
      setPosition(newPosition);
    };

    const handleUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMove);
      window.addEventListener("touchmove", handleMove);
      window.addEventListener("mouseup", handleUp);
      window.addEventListener("touchend", handleUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("mouseup", handleUp);
      window.removeEventListener("touchend", handleUp);
    };
  }, [isDragging]);

  const xrayStyles = xrayMode ? {
    filter: 'invert(1)',
    mixBlendMode: 'difference' as const,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  } : {};

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-video select-none touch-none rounded-lg overflow-hidden module-container-inner"
      onMouseDown={() => setIsDragging(true)}
      onTouchStart={() => setIsDragging(true)}
    >
      <div 
        className="absolute inset-0 overflow-hidden transition-all duration-200"
        style={xrayStyles}
      >
        {targetOutput}
      </div>

      <div 
        className="absolute inset-0 overflow-hidden transition-all duration-200"
        style={{ 
          clipPath: `inset(0 0 ${100 - position}% 0)`,
          ...xrayStyles
        }}
      >
        {userOutput}
      </div>

      <div 
        className="absolute left-0 right-0 h-0.5 bg-[#6B8AFF] dark:bg-primary cursor-ns-resize transition-transform duration-75"
        style={{ 
          top: `${position}%`,
          transform: 'translateY(-50%)'
        }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#6B8AFF] dark:bg-primary rounded-full shadow-lg" />
        <div className="absolute left-1/2 -translate-x-1/2 -top-6 text-xs text-[#6B8AFF] dark:text-primary">▲</div>
        <div className="absolute left-1/2 -translate-x-1/2 -bottom-6 text-xs text-[#6B8AFF] dark:text-primary">▼</div>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-4 left-4 px-2 py-1 text-xs font-medium rounded-md bg-card/30 backdrop-blur-sm text-readable border border-border/40 transition-opacity duration-200"
          style={{ opacity: position > 50 ? 0 : 1 }}
        >
          Your Output
        </div>
        <div 
          className="absolute bottom-4 left-4 px-2 py-1 text-xs font-medium rounded-md bg-card/30 backdrop-blur-sm text-readable border border-border/40 transition-opacity duration-200"
          style={{ opacity: position < 50 ? 0 : 1 }}
        >
          Target
        </div>
      </div>
    </div>
  );
}

export function ComparisonSlider({ userOutput, targetOutput, orientation = "horizontal" }: ComparisonSliderProps) {
  const [xrayMode, setXrayMode] = useState(false);
  const [currentOrientation, setCurrentOrientation] = useState(orientation);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'x' || e.key === 'X') {
      setXrayMode(prev => !prev);
    } else if (e.key === 'v' || e.key === 'V') {
      setCurrentOrientation(prev => prev === "horizontal" ? "vertical" : "horizontal");
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <button 
          onClick={() => setXrayMode(prev => !prev)}
          className="px-3 py-1.5 text-sm font-medium rounded-md bg-[#6B8AFF]/10 hover:bg-[#6B8AFF]/20 dark:bg-primary/10 dark:hover:bg-primary/20 text-[#6B8AFF] dark:text-primary transition-colors"
          title="Press 'X' to toggle"
        >
          {xrayMode ? "Disable" : "Enable"} X-ray Mode
        </button>

        <button
          onClick={() => setCurrentOrientation(prev => prev === "horizontal" ? "vertical" : "horizontal")}
          className="px-3 py-1.5 text-sm font-medium rounded-md bg-[#6B8AFF]/10 hover:bg-[#6B8AFF]/20 dark:bg-primary/10 dark:hover:bg-primary/20 text-[#6B8AFF] dark:text-primary transition-colors"
          title="Press 'V' to toggle"
        >
          Switch to {currentOrientation === "horizontal" ? "Vertical" : "Horizontal"}
        </button>
      </div>

      {currentOrientation === "horizontal" ? (
        <HorizontalSlider userOutput={userOutput} targetOutput={targetOutput} xrayMode={xrayMode} />
      ) : (
        <VerticalSlider userOutput={userOutput} targetOutput={targetOutput} xrayMode={xrayMode} />
      )}
    </div>
  );
}
