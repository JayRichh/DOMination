import type { Metadata } from "next";
import Link from "next/link";
import { Inter } from 'next/font/google';
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";

import "./globals.css";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "CSS Battle",
  description: "Test and improve your CSS skills by recreating targets with code",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          {/* Navigation */}
          <nav className="sticky top-0 z-50 h-16 border-b border-border bg-background/80 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-6 h-full">
              <div className="flex h-full items-center justify-between">
                {/* Left group - Logo and About */}
                <div className="flex items-center space-x-6">
                  <Link 
                    href="/"
                    className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent hover:opacity-80 transition-opacity"
                  >
                    CSS Battle
                  </Link>
                  <Link
                    href="/about"
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    About
                  </Link>
                </div>

                {/* Center group - Main navigation */}
                <div className="flex items-center space-x-6">
                  <Link
                    href="/challenges"
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Challenges
                  </Link>
                </div>

                {/* Right group - Stats with profile icon and theme toggle */}
                <div className="flex items-center space-x-4">
                  <ThemeToggle />
                  <Link
                    href="/stats"
                    className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-accent/10 transition-colors"
                  >
                    <svg 
                      className="w-4 h-4 text-muted-foreground" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                      />
                    </svg>
                    <span className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                      My Stats
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </nav>

          <main className="min-h-[calc(100vh-4rem)]">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
