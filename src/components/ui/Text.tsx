"use client";

import { HTMLAttributes, forwardRef } from "react";
import { cn } from "~/utils/cn";

type TextVariant = "h1" | "h2" | "h3" | "h4" | "body-lg" | "body" | "body-sm" | "caption";
type TextGradient = "none" | "blue" | "purple" | "orange" | "primary";

interface TextProps extends HTMLAttributes<HTMLDivElement> {
  variant?: TextVariant;
  color?: "default" | "primary" | "secondary" | "success" | "error";
  weight?: "normal" | "medium" | "semibold" | "bold";
  align?: "left" | "center" | "right";
  gradient?: TextGradient;
  glass?: boolean;
  balance?: boolean;
  mono?: boolean;
}

const variantClasses: Record<TextVariant, string> = {
  h1: "text-4xl md:text-5xl xl:text-6xl font-bold leading-tight tracking-tight",
  h2: "text-3xl md:text-4xl xl:text-5xl font-bold leading-tight tracking-tight",
  h3: "text-2xl md:text-3xl xl:text-4xl font-semibold leading-snug",
  h4: "text-xl md:text-2xl xl:text-3xl font-semibold leading-snug",
  "body-lg": "text-lg md:text-xl leading-relaxed",
  body: "text-base leading-relaxed",
  "body-sm": "text-sm leading-relaxed",
  caption: "text-xs leading-normal",
};

const colorClasses = {
  default: "text-foreground",
  primary: "text-primary dark:text-primary",
  secondary: "text-muted-foreground dark:text-muted-foreground",
  success: "text-emerald-600 dark:text-emerald-400",
  error: "text-red-600 dark:text-red-400",
};

const weightClasses = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
};

const alignClasses = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

const gradientClasses: Record<TextGradient, string> = {
  none: "",
  blue: "bg-gradient-to-r from-blue-500 to-cyan-500 dark:from-blue-400 dark:to-cyan-400 text-transparent bg-clip-text",
  purple: "bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-400 dark:to-pink-400 text-transparent bg-clip-text",
  orange: "bg-gradient-to-r from-orange-500 to-red-500 dark:from-orange-400 dark:to-red-400 text-transparent bg-clip-text",
  primary: "bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text",
};

export const Text = forwardRef<HTMLDivElement, TextProps>(
  (
    {
      variant = "body",
      color = "default",
      weight,
      align = "left",
      gradient = "none",
      glass = false,
      balance = false,
      mono = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const defaultWeight = variant.startsWith("h") ? "bold" : "normal";
    const finalWeight = weight || defaultWeight;

    return (
      <div
        ref={ref}
        className={cn(
          variantClasses[variant],
          colorClasses[color],
          weightClasses[finalWeight],
          alignClasses[align],
          gradientClasses[gradient],
          glass && "glass",
          balance && "text-balance",
          mono ? "font-mono" : "font-sans",
          "relative",
          className
        )}
        {...props}
      >
        {glass && (
          <span className="absolute inset-0 bg-gradient-to-r from-white/10 dark:from-white/5 to-transparent opacity-25 blur-sm" />
        )}
        <span className="relative">{children}</span>
      </div>
    );
  }
);

Text.displayName = "Text";
