"use client";

import { ThemeProvider } from "~/components/ThemeProvider";
import { ChartProvider } from "~/contexts/ChartContext";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <ChartProvider>
            {/* Background Effects */}
            <div className="fixed inset-0 -z-10">
              <div className="absolute inset-0 bg-[#F8FAFF] dark:bg-background transition-colors duration-300" />
              <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_0%_0%,#6B8AFF/0.08,transparent_50%)] dark:bg-[radial-gradient(circle_at_0%_0%,hsl(var(--primary)/0.12),transparent_50%)]" />
                <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_100%,#6B8AFF/0.08,transparent_50%)] dark:bg-[radial-gradient(circle_at_100%_100%,hsl(var(--accent)/0.12),transparent_50%)]" />
              </div>
              <div className="absolute inset-0 bg-background/50 backdrop-blur-[100px] dark:bg-background/30" />
            </div>

            {/* Main Content */}
            <div className="relative">
              {children}
            </div>

            {/* Portal Container for Editor Widgets */}
            <div id="monaco-editor-widgets" className="fixed left-0 top-0 z-[9999]" />

            {/* Portal Container for Tooltips and Overlays */}
            <div id="portal-root" className="fixed left-0 top-0 z-[9999] pointer-events-none">
              <div id="tooltip-root" className="pointer-events-auto" />
              <div id="overlay-root" className="pointer-events-auto" />
            </div>
          </ChartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
