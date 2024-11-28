"use client";

import { cn } from "~/utils/cn";
import { LottieLoader } from "./LottieLoader";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  variant?: "default" | "primary";
  className?: string;
}

export function Spinner({ size = "md", variant = "default", className }: SpinnerProps) {
  return (
    <LottieLoader 
      size={size} 
      className={cn(
        variant === "primary" && "text-primary",
        className
      )} 
    />
  );
}

// Example usage
export function SpinnerDemo() {
  return (
    <div className="space-y-8">
      {/* Different sizes */}
      <div className="space-y-4">
        <div className="text-sm font-medium text-slate-600 dark:text-slate-400">
          Different Sizes
        </div>
        <div className="flex items-center gap-4">
          <Spinner size="sm" />
          <Spinner size="md" />
          <Spinner size="lg" />
        </div>
      </div>

      {/* Different variants */}
      <div className="space-y-4">
        <div className="text-sm font-medium text-slate-600 dark:text-slate-400">
          Different Variants
        </div>
        <div className="flex items-center gap-4">
          <Spinner variant="default" />
          <Spinner variant="primary" />
        </div>
      </div>
    </div>
  );
}

// Code preview
export const spinnerCode = `// Spinner Component Usage
// Basic usage with default style
<Spinner />

// Different sizes
<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />

// Different variants
<Spinner variant="default" />
<Spinner variant="primary" />`;
