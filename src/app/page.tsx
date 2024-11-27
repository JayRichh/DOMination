"use client";

import Link from "next/link";
import Image from 'next/image';

// Define features data
const featuresData = [
  {
    title: "Real-time Preview",
    description: "Watch your CSS come to life instantly as you code, making it effortless to perfect your design.",
    icon: (
      <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
  },
  {
    title: "Code Efficiency",
    description: "Learn to write clean, efficient CSS code while solving interesting challenges.",
    icon: (
      <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    title: "Pixel Perfect",
    description: "Compare your solution with the target design using our precision comparison tools.",
    icon: (
      <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
  },
  {
    title: "Learn & Improve",
    description: "Each challenge teaches you new CSS techniques and best practices.",
    icon: (
      <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
];

// Define screenshots data
const screenshotsData = [
  {
    title: "Challenge Gallery",
    src: "/screenshots/challenges.png",
    alt: "Browse CSS Battle challenges",
    subtitle: "Browse Challenges",
    description: "Explore our diverse collection of CSS challenges, ranging from beginner-friendly to expert-level difficulties.",
  },
  {
    title: "Interactive Editor",
    src: "/screenshots/editor.png",
    alt: "CSS Battle code editor",
    subtitle: "Real-time Code Editor",
    description: "Write your CSS code in our feature-rich editor with syntax highlighting and instant preview to see your changes in real-time.",
  },
  {
    title: "Visual Comparison",
    src: "/screenshots/compare.png",
    alt: "Challenge results and scoring",
    subtitle: "Instant Results",
    description: "Get immediate feedback with side-by-side comparison and detailed scoring of how closely your solution matches the target.",
  },
  {
    title: "Progress Dashboard",
    src: "/screenshots/stats.png",
    alt: "Progress tracking dashboard",
    subtitle: "Track Progress",
    description: "Monitor your improvement over time with detailed statistics and completion tracking for all challenges.",
  },
];

export default function HomePage() {
  return (
    <div className="relative bg-background min-h-screen">
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-8 py-24">
        {/* Hero Section */}
        <section className="text-center space-y-12">
          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight">
            <span className="inline-block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient">
              CSS Battle
            </span>
          </h1>
          
          <p className="text-2xl md:text-3xl text-muted-foreground max-w-3xl mx-auto font-light">
            Master the art of pixel-perfect design through creative challenges.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-12">
            <Link 
              href="/challenges"
              className="relative inline-flex items-center justify-center px-10 py-4 text-lg font-semibold text-white bg-primary rounded-md overflow-hidden group hover:bg-primary/90 transition-colors"
            >
              <span className="relative z-10">Start Battling</span>
              <span className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </Link>
            
            <Link 
              href="/challenges/1"
              className="inline-flex items-center justify-center px-10 py-4 text-lg font-semibold text-primary bg-transparent border border-primary rounded-md hover:bg-primary/10 transition-colors"
            >
              Try Demo Challenge
            </Link>
          </div>
        </section>

        {/* Features Grid */}
        <section className="mt-32">
          <h2 className="text-4xl font-bold mb-16 text-center">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {featuresData.map((feature, index) => (
              <div key={index} className="flex flex-col items-center text-center p-8 rounded-lg bg-card border border-border hover:bg-card/90 transition-colors shadow-md">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Screenshots Section */}
        <section className="mt-32">
          <h2 className="text-4xl font-bold mb-16 text-center">See It In Action</h2>
          
          <div className="space-y-24">
            {screenshotsData.map((screenshot, index) => (
              <div key={index} className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12`}>
                <div className="relative flex-1 aspect-video rounded-xl overflow-hidden border border-border shadow-lg">
                  <Image
                    src={screenshot.src}
                    alt={screenshot.alt}
                    layout="fill"
                    objectFit="cover"
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-6">
                    <p className="text-2xl font-medium mb-2">{screenshot.subtitle}</p>
                    <p className="text-lg text-muted-foreground max-w-md">
                      {screenshot.description}
                    </p>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-3xl font-semibold mb-4 text-primary text-center md:text-left">{screenshot.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="mt-32 text-center py-24 bg-gradient-to-r from-primary via-accent to-primary rounded-lg shadow-inner">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-5xl font-extrabold mb-6 text-white">Ready to Start?</h2>
            <p className="text-xl text-muted-foreground mb-12">
              Dive into our collection of CSS challenges and begin your journey to mastering CSS today.
            </p>
            <Link
              href="/challenges"
              className="inline-flex items-center justify-center rounded-md text-lg font-medium ring-offset-background transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-white text-primary hover:bg-gray-100 h-14 px-8 py-3 shadow-lg"
            >
              View Challenges
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
