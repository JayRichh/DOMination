"use client";

import { usePathname } from "next/navigation";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
}

export function PageLayout({ children, className = "" }: PageLayoutProps) {
  const pathname = usePathname();
  const isChallengePage = /^\/challenges\/\d+/.test(pathname || '');

  if (isChallengePage) {
    return <div className="h-screen">{children}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className={`flex-1 ${className}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
}

export function ChallengesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
