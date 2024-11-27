"use client";

import { useEffect, useState } from "react";
import type { ValidationMessageProps } from "~/types/components";

const typeStyles = {
  error: {
    bg: "bg-red-500/10",
    border: "border-red-500/20",
    text: "text-red-500",
    icon: "⚠️"
  },
  warning: {
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20",
    text: "text-yellow-500",
    icon: "⚠️"
  },
  info: {
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    text: "text-blue-500",
    icon: "ℹ️"
  },
  success: {
    bg: "bg-green-500/10",
    border: "border-green-500/20",
    text: "text-green-500",
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
      className={`flex items-center gap-2 px-4 py-2 rounded-md ${styles.bg} ${styles.border} transition-all duration-200`}
      role="alert"
    >
      <span className="text-lg" role="img" aria-label={type}>
        {styles.icon}
      </span>
      <span className={`text-sm font-medium ${styles.text}`}>
        {message}
      </span>
      {onClose && (
        <button
          onClick={handleClose}
          className={`ml-auto text-sm ${styles.text} hover:opacity-80 transition-opacity`}
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
    <div className="space-y-2">
      <ValidationMessage type="error" message={message} />
      {details && (
        <div className="px-4 py-2 text-sm font-mono bg-background/50 rounded-md border border-border overflow-auto">
          {details}
        </div>
      )}
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-3 py-1.5 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
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
