"use client";

export default function LoadingPage() {
  return (
    <div className="h-screen flex flex-col">
      {/* Top Navigation Bar */}
      <nav className="h-16 border-b border-border bg-background/90 backdrop-blur-lg shadow-sm flex items-center justify-between px-6">
        <div className="flex items-center gap-6">
          <div className="h-4 w-32 bg-muted rounded-lg animate-pulse" />
          <div className="h-6 w-48 bg-muted rounded-lg animate-pulse" />
        </div>

        <div className="flex items-center gap-4">
          <div className="h-10 w-32 bg-muted rounded-md animate-pulse" />
          <div className="h-8 w-8 bg-muted rounded-md animate-pulse" />
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 grid grid-cols-2 min-h-0">
        {/* Left Panel - Editors */}
        <section className="grid grid-rows-2 min-h-0 border-r border-border bg-muted">
          <div className="min-h-0 border-b border-border">
            <div className="h-8 px-4 flex items-center justify-between border-b border-border bg-background/50">
              <div className="h-4 w-24 bg-muted rounded-lg animate-pulse" />
            </div>
            <div className="h-[calc(100%-2rem)] bg-background animate-pulse" />
          </div>
          <div className="min-h-0">
            <div className="h-8 px-4 flex items-center justify-between border-b border-border bg-background/50">
              <div className="h-4 w-24 bg-muted rounded-lg animate-pulse" />
            </div>
            <div className="h-[calc(100%-2rem)] bg-background animate-pulse" />
          </div>
        </section>

        {/* Right Panel - Preview */}
        <section className="grid grid-rows-[1fr_auto] min-h-0 bg-muted">
          <div className="grid grid-rows-2 gap-6 p-6 min-h-0 overflow-auto">
            <div className="space-y-2 min-h-0">
              <div className="h-4 w-24 bg-muted rounded-lg animate-pulse" />
              <div className="h-[calc(100%-2rem)] rounded-lg bg-background animate-pulse" />
            </div>

            <div className="space-y-2 min-h-0">
              <div className="h-4 w-24 bg-muted rounded-lg animate-pulse" />
              <div className="h-[calc(100%-2rem)] rounded-lg bg-background animate-pulse" />
            </div>
          </div>

          <div className="border-t border-border p-6 bg-background/60 backdrop-blur-xl">
            <div className="aspect-video w-full rounded-lg bg-background animate-pulse" />
          </div>
        </section>
      </div>
    </div>
  );
}
