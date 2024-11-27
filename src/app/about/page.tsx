import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="relative min-h-[300vh]">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background" />
      
      <div className="relative max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="mb-16">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient">
            About CSS Battle
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Master CSS by recreating targets with code. A fun and interactive way to improve your CSS skills
            through practical challenges.
          </p>
        </div>

        {/* How It Works Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg border border-border bg-card hover:bg-card/80 transition-colors">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Choose a Challenge</h3>
              <p className="text-muted-foreground">
                Browse through our collection of CSS challenges, each designed to test different aspects of your CSS knowledge.
              </p>
            </div>
            <div className="p-6 rounded-lg border border-border bg-card hover:bg-card/80 transition-colors">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Write Your CSS</h3>
              <p className="text-muted-foreground">
                Use our built-in editor to write CSS code that matches the target image as closely as possible.
              </p>
            </div>
            <div className="p-6 rounded-lg border border-border bg-card hover:bg-card/80 transition-colors">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Get Instant Feedback</h3>
              <p className="text-muted-foreground">
                See your results in real-time and get a score based on how closely your solution matches the target.
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Key Features</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="w-8 h-8 shrink-0 rounded bg-primary/10 flex items-center justify-center">
                <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Real-time Preview</h3>
                <p className="text-muted-foreground">
                  See your changes instantly as you code, making it easier to perfect your solution.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 shrink-0 rounded bg-primary/10 flex items-center justify-center">
                <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Progressive Difficulty</h3>
                <p className="text-muted-foreground">
                  Start with basic challenges and work your way up to more complex CSS layouts and designs.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 shrink-0 rounded bg-primary/10 flex items-center justify-center">
                <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Progress Tracking</h3>
                <p className="text-muted-foreground">
                  Keep track of your completed challenges and scores to monitor your improvement over time.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 shrink-0 rounded bg-primary/10 flex items-center justify-center">
                <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Community Solutions</h3>
                <p className="text-muted-foreground">
                  Learn from others by viewing different approaches to solving the same challenge.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Screenshots Section */}
        <section className="py-24">
          <h2 className="text-2xl font-bold mb-8">See It In Action</h2>
          
          {/* Challenge Selection */}
          <div className="mb-24">
            <h3 className="text-xl font-semibold mb-6 text-primary">Browse Challenges</h3>
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden border border-border">
              <Image
                src="/screenshots/challenges.png"
                alt="Browse CSS Battle challenges"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <p className="text-lg font-medium mb-2">Challenge Gallery</p>
                <p className="text-sm text-muted-foreground max-w-md">
                  Browse through our collection of carefully crafted CSS challenges, 
                  ranging from beginner-friendly to expert-level difficulties.
                </p>
              </div>
            </div>
          </div>

          {/* Code Editor */}
          <div className="mb-24">
            <h3 className="text-xl font-semibold mb-6 text-primary">Interactive Editor</h3>
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden border border-border">
              <Image
                src="/screenshots/editor.png"
                alt="CSS Battle code editor"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <p className="text-lg font-medium mb-2">Real-time Code Editor</p>
                <p className="text-sm text-muted-foreground max-w-md">
                  Write your CSS code in our feature-rich editor with syntax highlighting 
                  and instant preview to see your changes in real-time.
                </p>
              </div>
            </div>
          </div>

          {/* Results View */}
          <div className="mb-24">
            <h3 className="text-xl font-semibold mb-6 text-primary">Instant Results</h3>
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden border border-border">
              <Image
                src="/screenshots/results.png"
                alt="Challenge results and scoring"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <p className="text-lg font-medium mb-2">Visual Comparison</p>
                <p className="text-sm text-muted-foreground max-w-md">
                  Get immediate feedback with side-by-side comparison and detailed 
                  scoring of how closely your solution matches the target.
                </p>
              </div>
            </div>
          </div>

          {/* Progress Tracking */}
          <div className="mb-24">
            <h3 className="text-xl font-semibold mb-6 text-primary">Track Progress</h3>
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden border border-border">
              <Image
                src="/screenshots/progress.png"
                alt="Progress tracking dashboard"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <p className="text-lg font-medium mb-2">Progress Dashboard</p>
                <p className="text-sm text-muted-foreground max-w-md">
                  Monitor your improvement over time with detailed statistics and 
                  completion tracking for all challenges.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center py-24">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Ready to Start?</h2>
            <p className="text-muted-foreground mb-8">
              Jump into our collection of CSS challenges and start improving your skills today.
            </p>
            <Link
              href="/challenges"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              View Challenges
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
