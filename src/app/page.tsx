import Link from "next/link";

export default function HomePage() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)]">
      <div className="max-w-4xl mx-auto px-6 py-16 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight">
            <span className="inline-block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient">
              CSS Battle
            </span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto font-light">
            Master the art of pixel-perfect design through creative challenges
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
            <Link 
              href="/challenges"
              className="btn btn-primary text-lg px-8 py-3 relative group overflow-hidden"
            >
              <span className="relative z-10">Start Battling</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
            
            <Link 
              href="/challenges/1"
              className="btn btn-ghost text-lg px-8 py-3"
            >
              Try Demo Challenge
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-24 w-full">
          <div className="feature-card glass">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">Real-time Preview</h3>
            </div>
            <p className="text-muted-foreground">
              Watch your CSS come to life instantly as you code, making it effortless to perfect your design.
            </p>
          </div>
          
          <div className="feature-card glass">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">Code Efficiency</h3>
            </div>
            <p className="text-muted-foreground">
              Learn to write clean, efficient CSS code while solving interesting challenges.
            </p>
          </div>
          
          <div className="feature-card glass">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">Pixel Perfect</h3>
            </div>
            <p className="text-muted-foreground">
              Compare your solution with the target design using our precision comparison tools.
            </p>
          </div>
          
          <div className="feature-card glass">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">Learn & Improve</h3>
            </div>
            <p className="text-muted-foreground">
              Each challenge teaches you new CSS techniques and best practices.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
