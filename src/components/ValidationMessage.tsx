"use client";

import { useEffect, useState } from "react";
import type { ValidationMessageProps } from "~/types/components";

const typeStyles = {
  error: {
    bg: "bg-red-500/5 dark:bg-red-500/10",
    border: "border-red-500/10 dark:border-red-500/20",
    text: "text-red-600 dark:text-red-400",
    icon: "⚠️"
  },
  warning: {
    bg: "bg-yellow-500/5 dark:bg-yellow-500/10",
    border: "border-yellow-500/10 dark:border-yellow-500/20",
    text: "text-yellow-600 dark:text-yellow-400",
    icon: "⚠️"
  },
  info: {
    bg: "bg-[#6B8AFF]/5 dark:bg-blue-500/10",
    border: "border-[#6B8AFF]/10 dark:border-blue-500/20",
    text: "text-[#6B8AFF] dark:text-blue-400",
    icon: "ℹ️"
  },
  success: {
    bg: "bg-emerald-500/5 dark:bg-emerald-500/10",
    border: "border-emerald-500/10 dark:border-emerald-500/20",
    text: "text-emerald-600 dark:text-emerald-400",
    icon: "✓"
  }
};

export function ValidationMessage({ type, message, onClose }: ValidationMessageProps) {
  const [isVisible, setIsVisible] = useState(true);
  const styles = typeStyles[type];

  useEffect(() => {
    setIsVisible(true);
  }, [message]);

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  if (!isVisible) return null;

  return (
    <div
      className={`flex items-center gap-2 px-4 py-2.5 rounded-lg ${styles.bg} ${styles.border} backdrop-blur-sm shadow-sm transition-all duration-200`}
      role="alert"
    >
      <span className="text-lg" role="img" aria-label={type}>
        {styles.icon}
      </span>
      <span className={`text-sm font-medium tracking-tight ${styles.text}`}>
        {message}
      </span>
      {onClose && (
        <button
          onClick={handleClose}
          className={`ml-auto text-base font-medium ${styles.text} hover:opacity-80 transition-opacity`}
          aria-label="Close message"
        >
          ×
        </button>
      )}
    </div>
  );
}

export function ErrorMessage({ message, details, onRetry }: ErrorMessageProps) {
  return (
    <div className="space-y-3">
      <ValidationMessage type="error" message={message} />
      {details && (
        <div className="px-4 py-3 text-sm font-mono text-[#6B8AFF]/80 dark:text-foreground bg-card/30 backdrop-blur-sm rounded-lg border border-border/40 overflow-auto">
          {details}
        </div>
      )}
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 text-sm font-medium rounded-lg bg-[#6B8AFF]/10 hover:bg-[#6B8AFF]/20 dark:bg-primary/10 dark:hover:bg-primary/20 text-[#6B8AFF] dark:text-primary transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
}

interface ErrorMessageProps {
  message: string;
  details?: string;
  onRetry?: () => void;
}
