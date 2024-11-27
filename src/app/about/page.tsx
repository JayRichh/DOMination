"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PageLayout } from "~/components/PageLayout";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 30
    }
  }
};

export default function AboutPage() {
  return (
    <PageLayout>
      <div className="relative bg-background min-h-screen">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <motion.section 
            className="mb-24 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient">
              About CSS Battle
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Master CSS by recreating targets with code. Engage in fun and interactive challenges to elevate your CSS skills through practical, hands-on experience.
            </p>
          </motion.section>

          <motion.section 
            className="mb-24"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-12">
              {["Choose a Challenge", "Write Your CSS", "Get Instant Feedback"].map((title, index) => (
                <motion.div 
                  key={index} 
                  variants={item}
                  whileHover={{ 
                    scale: 1.05,
                    transition: { type: "spring", stiffness: 400, damping: 30 }
                  }}
                  className="p-8 rounded-lg border border-border bg-card hover:bg-card/90 transition-colors shadow-md"
                >
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 mx-auto">
                    <span className="text-2xl font-bold text-primary">{index + 1}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-center">{title}</h3>
                  <p className="text-center text-muted-foreground">
                    {getHowItWorksDescription(index)}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <motion.section 
            className="mb-24"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <h2 className="text-3xl font-bold mb-12 text-center">Key Features</h2>
            <div className="grid md:grid-cols-2 gap-12">
              {featuresData.map((feature, index) => (
                <motion.div 
                  key={index} 
                  variants={item}
                  className="flex items-start gap-6"
                >
                  <div className="w-10 h-10 flex-shrink-0 rounded bg-primary/10 flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <motion.section 
            className="mb-24"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <h2 className="text-3xl font-bold mb-12 text-center">See It In Action</h2>
            
            {screenshotsData.map((screenshot, index) => (
              <motion.div 
                key={index} 
                variants={item}
                className="mb-24"
              >
                <h3 className="text-2xl font-semibold mb-6 text-primary text-center">{screenshot.title}</h3>
                <div className="relative aspect-video rounded-xl overflow-hidden border border-border shadow-lg">
                  <Image
                    src={screenshot.src}
                    alt={screenshot.alt}
                    layout="fill"
                    objectFit="cover"
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6">
                    <p className="text-lg font-medium mb-2">{screenshot.subtitle}</p>
                    <p className="text-sm text-muted-foreground max-w-md">
                      {screenshot.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.section>

          <motion.section 
            className="text-center py-24 bg-gradient-to-r from-primary via-accent to-primary rounded-lg shadow-inner"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="max-w-2xl mx-auto">
              <h2 className="text-4xl font-bold mb-6 text-white">Ready to Start?</h2>
              <p className="text-lg text-muted-foreground mb-10">
                Dive into our collection of CSS challenges and begin your journey to mastering CSS today.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/challenges"
                  className="inline-flex items-center justify-center rounded-md text-lg font-medium ring-offset-background transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-white text-primary hover:bg-gray-100 h-12 px-6 py-3 shadow-lg"
                >
                  View Challenges
                </Link>
              </motion.div>
            </div>
          </motion.section>
        </div>
      </div>
    </PageLayout>
  );
}

// Helper Functions and Data

function getHowItWorksDescription(index: number): string {
  const descriptions = [
    "Browse through our collection of CSS challenges, each designed to test different aspects of your CSS knowledge.",
    "Use our built-in editor to write CSS code that matches the target image as closely as possible.",
    "See your results in real-time and get a score based on how closely your solution matches the target.",
  ];
  return descriptions[index] || "";
}

const featuresData = [
  {
    title: "Real-time Preview",
    description: "See your changes instantly as you code, making it easier to perfect your solution.",
    icon: (
      <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
  },
  {
    title: "Progressive Difficulty",
    description: "Start with basic challenges and work your way up to more complex CSS layouts and designs.",
    icon: (
      <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: "Progress Tracking",
    description: "Keep track of your completed challenges and scores to monitor your improvement over time.",
    icon: (
      <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    title: "Community Solutions",
    description: "Learn from others by viewing different approaches to solving the same challenge.",
    icon: (
      <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
];

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
