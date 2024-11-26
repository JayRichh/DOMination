import type { Metadata } from "next";
import Link from "next/link";
import { Inter } from 'next/font/google';

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
      <body className={`${inter.className} bg-background text-foreground antialiased flex flex-col`}>
        {/* Navigation */}
        <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex h-16 items-center justify-between">
              <Link 
                href="/"
                className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent hover:opacity-80 transition-opacity"
              >
                CSS Battle
              </Link>
              
              <div className="flex items-center gap-6">
                <Link 
                  href="/challenges"
                  className="nav-link"
                >
                  Challenges
                </Link>
                <a
                  href="https://github.com/your-username/css-battle"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-link"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </nav>

        {/* Main content */}
        <main className="flex-1 flex flex-col">
          {children}
        </main>

        {/* Background gradient */}
        <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background pointer-events-none" />
      </body>
    </html>
  );
}
