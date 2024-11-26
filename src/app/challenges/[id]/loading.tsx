export default function ChallengeLoading() {
  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      {/* Header Skeleton */}
      <header className="border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-8 w-48 bg-muted animate-pulse rounded-lg" />
            <div className="h-4 w-64 bg-muted/50 animate-pulse rounded-lg" />
          </div>

          <div className="flex items-center gap-6">
            <div className="h-10 w-32 bg-muted animate-pulse rounded-lg" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 grid grid-cols-2 overflow-hidden">
        {/* Left Side - Editor Skeleton */}
        <div className="border-r border-border bg-muted">
          {/* HTML Preview Skeleton */}
          <div className="p-4 border-b border-border">
            <div className="h-4 w-32 bg-muted/50 animate-pulse rounded-lg mb-2" />
            <div className="p-3 rounded-lg bg-background/50 border border-border">
              <div className="h-16 bg-muted animate-pulse rounded-lg" />
            </div>
          </div>

          {/* Editor Skeleton */}
          <div className="h-[calc(100%-105px)] p-4">
            <div className="h-full bg-muted animate-pulse rounded-lg" />
          </div>
        </div>

        {/* Right Side - Preview Skeleton */}
        <div className="flex flex-col bg-muted">
          <div className="flex-1 grid grid-rows-2 gap-6 p-6">
            {/* User Preview Skeleton */}
            <div className="space-y-2">
              <div className="h-4 w-24 bg-muted/50 animate-pulse rounded-lg" />
              <div className="h-[calc(100%-2rem)] bg-muted animate-pulse rounded-lg" />
            </div>

            {/* Target Preview Skeleton */}
            <div className="space-y-2">
              <div className="h-4 w-24 bg-muted/50 animate-pulse rounded-lg" />
              <div className="h-[calc(100%-2rem)] bg-muted animate-pulse rounded-lg" />
            </div>
          </div>

          {/* Comparison Tools Skeleton */}
          <div className="border-t border-border p-6 bg-background/60 backdrop-blur-xl">
            <div className="space-y-4">
              <div className="flex justify-between">
                <div className="h-4 w-24 bg-muted/50 animate-pulse rounded-lg" />
                <div className="h-4 w-24 bg-muted/50 animate-pulse rounded-lg" />
              </div>
              <div className="h-[200px] bg-muted animate-pulse rounded-lg" />
              <div className="h-2 w-full bg-muted/50 animate-pulse rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
