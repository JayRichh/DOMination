"use client";

import { useEffect, useRef, useState } from "react";
import type { ComparisonSliderProps } from "~/types/components";

export function ComparisonSlider({ userOutput, targetOutput }: ComparisonSliderProps) {
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [xrayMode, setXrayMode] = useState(false);
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

  // Apply X-ray styles to the outputs
  const xrayStyles = xrayMode ? {
    filter: 'invert(1)',
    mixBlendMode: 'difference' as const,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  } : {};

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">Your Output</div>
        
        {/* X-ray Toggle */}
        <button
          onClick={() => setXrayMode(!xrayMode)}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            xrayMode 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-muted text-muted-foreground hover:bg-muted/80'
          }`}
        >
          <div className="flex items-center gap-2">
            <svg 
              className="w-4 h-4" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
              />
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" 
              />
            </svg>
            X-ray Mode
          </div>
        </button>

        <div className="text-sm text-muted-foreground">Target</div>
      </div>
      
      <div 
        ref={containerRef}
        className="relative h-[200px] select-none touch-none rounded-lg overflow-hidden"
        onMouseDown={() => setIsDragging(true)}
        onTouchStart={() => setIsDragging(true)}
      >
        {/* Target Output (Background) */}
        <div 
          className="absolute inset-0 overflow-hidden transition-all duration-200"
          style={xrayStyles}
        >
          {targetOutput}
        </div>

        {/* User Output (Foreground) */}
        <div 
          className="absolute inset-0 overflow-hidden transition-all duration-200"
          style={{ 
            clipPath: `inset(0 ${100 - position}% 0 0)`,
            ...xrayStyles
          }}
        >
          {userOutput}
        </div>

        {/* Slider Handle */}
        <div 
          className="absolute top-0 bottom-0 w-0.5 bg-primary cursor-ew-resize transition-transform duration-75"
          style={{ 
            left: `${position}%`,
            transform: 'translateX(-50%)'
          }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full shadow-lg" />
          
          {/* Drag Indicators */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-6 text-xs text-primary">
            ◄
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 -right-6 text-xs text-primary">
            ►
          </div>
        </div>

        {/* Labels */}
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute top-4 left-4 px-2 py-1 text-xs font-medium rounded-md bg-background/80 backdrop-blur-sm text-foreground transition-opacity duration-200"
            style={{ opacity: position > 50 ? 0 : 1 }}
          >
            Your Output
          </div>
          <div 
            className="absolute top-4 right-4 px-2 py-1 text-xs font-medium rounded-md bg-background/80 backdrop-blur-sm text-foreground transition-opacity duration-200"
            style={{ opacity: position < 50 ? 0 : 1 }}
          >
            Target
          </div>
        </div>
      </div>

      {/* Slider Input */}
      <input
        type="range"
        min="0"
        max="100"
        value={position}
        onChange={(e) => setPosition(Number(e.target.value))}
        className="w-full input-range"
      />

      {/* Keyboard Instructions */}
      <div className="text-xs text-center text-muted-foreground">
        Use arrow keys or drag the slider to compare
      </div>
    </div>
  );
}
