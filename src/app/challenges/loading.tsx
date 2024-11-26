export default function ChallengesLoading() {
  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background" />

      <div className="relative max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12 space-y-4">
          {/* Title Skeleton */}
          <div className="h-12 w-64 bg-muted animate-pulse rounded-lg" />
          {/* Description Skeleton */}
          <div className="h-6 w-96 bg-muted/50 animate-pulse rounded-lg" />
        </div>

        {/* Challenge Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="challenge-card animate-pulse"
            >
              {/* Preview Skeleton */}
              <div className="aspect-square p-6">
                <div className="w-full h-full rounded-lg bg-muted" />
              </div>

              {/* Info Skeleton */}
              <div className="p-6 border-t border-border/50">
                <div className="flex items-center justify-between mb-3">
                  <div className="h-6 w-32 bg-muted rounded-lg" />
                  <div className="h-6 w-12 bg-muted/50 rounded-full" />
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-full bg-muted/50 rounded-lg" />
                  <div className="h-4 w-2/3 bg-muted/50 rounded-lg" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
