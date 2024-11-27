"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";

export function Navigation() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname?.startsWith(path);
  };

  const navLinks = [
    { href: '/challenges', label: 'Challenges' },
    { href: '/leaderboard', label: 'Leaderboard' },
    { href: '/about', label: 'About' },
  ];

  return (
    <nav className="sticky top-0 z-50 h-16 border-b border-border backdrop-blur-lg">
      <div className="h-full">
        <div className="flex h-full items-center justify-between px-8">
          <div className="flex items-center space-x-8">
            <Link 
              href="/"
              prefetch={true}
              className="text-2xl font-extrabold text-[#6B8AFF]/80 dark:text-foreground hover:opacity-80 transition-opacity"
            >
              DOMination
            </Link>
            <div className="hidden md:flex items-center space-x-6">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  prefetch={true}
                  className={`text-sm font-medium transition-colors ${
                    isActive(href)
                      ? 'text-[#6B8AFF] dark:text-foreground'
                      : 'text-[#6B8AFF]/60 hover:text-[#6B8AFF] dark:text-muted-foreground dark:hover:text-foreground'
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link
              href="/stats"
              prefetch={true}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                isActive('/stats')
                  ? 'bg-[#6B8AFF]/10 text-[#6B8AFF] dark:bg-primary/10 dark:text-foreground'
                  : 'hover:bg-[#6B8AFF]/5 text-[#6B8AFF]/60 hover:text-[#6B8AFF] dark:hover:bg-accent/10 dark:text-muted-foreground dark:hover:text-foreground'
              }`}
            >
              <svg 
                className="w-5 h-5" 
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
              <span className="text-sm font-medium">
                My Stats
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
