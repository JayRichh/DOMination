export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-16 h-16">
          {/* Animated squares representing CSS Battle */}
          <div className="absolute inset-0 grid grid-cols-2 gap-1">
            <div className="animate-pulse bg-primary/20 rounded-sm" />
            <div className="animate-pulse bg-primary/40 rounded-sm delay-75" />
            <div className="animate-pulse bg-primary/60 rounded-sm delay-150" />
            <div className="animate-pulse bg-primary/80 rounded-sm delay-300" />
          </div>
        </div>
        <div className="text-lg font-medium text-muted-foreground">
          Loading...
        </div>
      </div>
    </div>
  );
}
