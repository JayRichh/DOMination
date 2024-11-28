"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import type { Challenge } from "~/types/challenge";
import { ChallengeFilters } from "./ChallengeFilters";
import { DifficultyBadge, TagBadge } from "~/components/ui/Badge";
import { ArrowRight } from "lucide-react";
import { GradientBackground } from "~/components/ui/GradientBackground";
import { LottieLoader } from "~/components/ui/LottieLoader";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
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

interface ChallengesListProps {
  challenges: Challenge[];
  completedChallenges?: string[];
}

export function ChallengesList({ challenges, completedChallenges = [] }: ChallengesListProps) {
  const [filteredChallenges, setFilteredChallenges] = useState(challenges);
  const [hoveredArrow, setHoveredArrow] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [showCompleted, setShowCompleted] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  const completedCount = completedChallenges.length;

  useEffect(() => {
    const loadChallenges = async () => {
      try {
        filterChallenges(showCompleted, selectedDifficulty);
      } finally {
        // Add a small delay to prevent flickering
        await new Promise(resolve => setTimeout(resolve, 500));
        setIsLoading(false);
      }
    };

    loadChallenges();
  }, [challenges, showCompleted, selectedDifficulty]);

  const handleShowCompletedChange = (value: boolean) => {
    setShowCompleted(value);
    setIsLoading(true);
    filterChallenges(value, selectedDifficulty);
  };

  const handleDifficultyChange = (value: string) => {
    setSelectedDifficulty(value);
    setIsLoading(true);
    filterChallenges(showCompleted, value);
  };

  const filterChallenges = (completed: boolean, difficulty: string) => {
    const filtered = challenges.filter(challenge => {
      const isCompleted = completedChallenges.includes(challenge.id);
      const matchesCompleted = !completed || isCompleted;
      const matchesDifficulty = difficulty === "all" || challenge.difficulty === difficulty;
      return matchesCompleted && matchesDifficulty;
    });
    setFilteredChallenges(filtered);
  };

  return (
    <div>
      <ChallengeFilters 
        showCompleted={showCompleted}
        completedCount={completedCount}
        selectedDifficulty={selectedDifficulty}
        onShowCompletedChange={handleShowCompletedChange}
        onDifficultyChange={handleDifficultyChange}
      />
      
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <LottieLoader size="lg" />
        </div>
      ) : (
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredChallenges.map((challenge) => (
              <motion.div
                key={challenge.id}
                variants={item}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onHoverStart={() => setHoveredId(challenge.id)}
                onHoverEnd={() => setHoveredId(null)}
                className="relative group"
              >
                <GradientBackground>
                  <Link
                    href={`/challenges/${challenge.id}`}
                    className="block relative overflow-hidden rounded-xl border border-border hover:border-primary/50 transition-all duration-500"
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="aspect-video w-full p-6 flex items-center justify-center relative">
                      <motion.div 
                        className="w-32 h-32 rounded-xl overflow-hidden shadow-lg"
                        animate={{
                          scale: hoveredId === challenge.id ? 1.1 : 1,
                          rotate: hoveredId === challenge.id ? 5 : 0
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 20
                        }}
                      >
                        <div
                          className="w-full h-full"
                          style={{ backgroundColor: challenge.backgroundColor }}
                        >
                          <div
                            dangerouslySetInnerHTML={{ __html: challenge.targetHtml }}
                            style={{ 
                              width: '100%',
                              height: '100%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          />
                          <style>
                            {challenge.targetCss}
                          </style>
                        </div>
                      </motion.div>
                    </div>

                    <div className="p-6 space-y-3 relative">
                      <motion.h3 
                        className="text-lg font-semibold text-foreground/80 group-hover:text-primary transition-colors duration-300"
                        animate={{
                           x: hoveredId === challenge.id ? 10 : 0

                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      >
                        {challenge.title}
                      </motion.h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {challenge.description}
                      </p>
                      {challenge.difficulty && (
                        <div className="flex flex-wrap items-center gap-2 pt-2">
                          <DifficultyBadge difficulty={challenge.difficulty} />
                          {challenge.tags?.map((tag) => (
                            <TagBadge key={tag} tag={tag} />
                          ))}
                        </div>
                      )}
                    </div>

                    <motion.div 
                      className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      onHoverStart={() => setHoveredArrow(challenge.id)}
                      onHoverEnd={() => setHoveredArrow(null)}
                    >
                      <motion.div 
                        className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary cursor-pointer"
                        animate={{
                          rotate: hoveredArrow === challenge.id ? -45 : 0
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 20
                        }}
                      >
                        <ArrowRight size={16} />
                      </motion.div>
                    </motion.div>
                  </Link>
                </GradientBackground>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredChallenges.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center py-12"
            >
              <div className="text-lg font-medium text-muted-foreground">
                No challenges found
              </div>
              <div className="text-sm text-muted-foreground mt-2">
                Try adjusting your search or filters
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
}
