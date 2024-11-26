"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-8">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 mx-auto mb-8 relative">
          {/* Error Icon */}
          <div className="absolute inset-0 grid grid-cols-2 gap-1 animate-pulse">
            <div className="bg-error/20 rounded-sm" />
            <div className="bg-error/40 rounded-sm" />
            <div className="bg-error/60 rounded-sm" />
            <div className="bg-error/80 rounded-sm" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-error">Something went wrong!</h1>
        
        <p className="text-muted-foreground max-w-md mx-auto">
          {error.message || "An unexpected error occurred. Please try again later."}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <button
            onClick={reset}
            className="btn btn-primary"
          >
            Try Again
          </button>
          
          <Link 
            href="/"
            className="btn btn-ghost"
          >
            Return Home
          </Link>
        </div>
      </div>

      {/* Error Background Pattern */}
      <div className="fixed inset-0 -z-10 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_1px,transparent_1px),linear-gradient(-45deg,var(--border)_1px,transparent_1px)] bg-[size:2rem_2rem]" />
      </div>
    </div>
  );
}
