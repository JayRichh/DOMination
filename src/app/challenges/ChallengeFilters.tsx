"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface ChallengeFiltersProps {
  onFilterChange: (difficulty: string, searchQuery: string) => void;
}

export function ChallengeFilters({ onFilterChange }: ChallengeFiltersProps) {
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const difficulties = ["all", "easy", "medium", "hard"];

  const handleDifficultyChange = (difficulty: string) => {
    setSelectedDifficulty(difficulty);
    onFilterChange(difficulty, searchQuery);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    onFilterChange(selectedDifficulty, query);
  };

  return (
    <motion.div 
      className="mb-8 space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search challenges..."
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-card border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      <div className="flex justify-center gap-2">
        {difficulties.map((difficulty) => (
          <motion.button
            key={difficulty}
            onClick={() => handleDifficultyChange(difficulty)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedDifficulty === difficulty
                ? "bg-primary text-primary-foreground"
                : "bg-card hover:bg-muted"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
