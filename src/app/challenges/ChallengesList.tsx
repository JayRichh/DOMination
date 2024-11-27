"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import type { Challenge } from "~/types/challenge";
import { ChallengeFilters } from "./ChallengeFilters";

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
}

export function ChallengesList({ challenges }: ChallengesListProps) {
  const [filteredChallenges, setFilteredChallenges] = useState(challenges);

  const handleFilterChange = (difficulty: string, searchQuery: string) => {
    const filtered = challenges.filter(challenge => {
      const matchesDifficulty = difficulty === "all" || challenge.difficulty === difficulty;
      const matchesSearch = searchQuery === "" || 
        challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        challenge.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesDifficulty && matchesSearch;
    });
    setFilteredChallenges(filtered);
  };

  return (
    <div>
      <ChallengeFilters onFilterChange={handleFilterChange} />
      
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
              whileHover={{ 
                scale: 1.02,
                transition: { type: "spring", stiffness: 400, damping: 30 }
              }}
            >
              <Link
                href={`/challenges/${challenge.id}`}
                className="group relative overflow-hidden rounded-lg border border-border bg-card hover:border-primary/50 transition-colors block"
              >
                <div className="aspect-video w-full bg-muted p-4 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-lg overflow-hidden shadow-lg">
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
                  </div>
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="font-semibold group-hover:text-primary transition-colors">
                    {challenge.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {challenge.description}
                  </p>
                  {challenge.difficulty && (
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        challenge.difficulty === 'easy' 
                          ? 'bg-green-500/10 text-green-500'
                          : challenge.difficulty === 'medium'
                          ? 'bg-yellow-500/10 text-yellow-500'
                          : 'bg-red-500/10 text-red-500'
                      }`}>
                        {challenge.difficulty}
                      </span>
                      {challenge.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
