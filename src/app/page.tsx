"use client";

import { motion } from "framer-motion";
import { Text } from "~/components/ui/Text";
import { PageLayout } from "~/components/PageLayout";
import Link from "next/link";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
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
      damping: 30,
      mass: 1
    }
  }
};

const features = [
  {
    title: "Interactive Challenges",
    description: "Test your CSS skills with our collection of visual puzzles",
    icon: "🎯"
  },
  {
    title: "Real-time Feedback",
    description: "Get instant feedback on your solutions and track your progress",
    icon: "⚡"
  },
  {
    title: "Global Rankings",
    description: "Compete with developers worldwide and climb the leaderboard",
    icon: "🏆"
  },
  {
    title: "Learn & Improve",
    description: "Master CSS concepts through practical challenges",
    icon: "📚"
  }
];

export default function HomePage() {
  return (
    <PageLayout>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <motion.div 
          className="py-20 px-4 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 400,
              damping: 30
            }}
          >
            <Text variant="h1" className="mb-6 text-foreground">
              Master CSS Through Creative Challenges
            </Text>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Text variant="body-lg" className="max-w-2xl mx-auto text-foreground">
              Join thousands of developers improving their CSS skills through interactive challenges and real-time feedback.
            </Text>
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {features.map((feature, _index) => (
            <motion.div
              key={feature.title}
              variants={item}
              className="bg-card p-6 rounded-xl border border-border shadow-lg hover:shadow-xl transition-shadow"
              whileHover={{ 
                scale: 1.02,
                transition: { type: "spring", stiffness: 400, damping: 30 }
              }}
            >
              <div className="flex items-start space-x-4">
                <div className="text-4xl">{feature.icon}</div>
                <div>
                  <Text variant="h4" className="mb-2 text-foreground">{feature.title}</Text>
                  <Text variant="body" className="text-muted-foreground">{feature.description}</Text>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="text-center py-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          >
            <Link 
              href="/challenges" 
              className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium shadow-lg hover:bg-primary/90 hover:shadow-xl transition-all"
            >
              Start Challenges
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </PageLayout>
  );
}
