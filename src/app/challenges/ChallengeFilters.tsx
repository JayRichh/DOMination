'use client';

import { motion } from "framer-motion";
import { Text } from "~/components/ui/Text";

interface FilterButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

function FilterButton({ active, onClick, children }: FilterButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
        active
          ? "bg-primary text-primary-foreground shadow-sm"
          : "text-foreground hover:bg-accent hover:text-accent-foreground"
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.button>
  );
}

interface ChallengeFiltersProps {
  showCompleted: boolean;
  completedCount: number;
  selectedDifficulty: string;
  onShowCompletedChange: (value: boolean) => void;
  onDifficultyChange: (value: string) => void;
}

export function ChallengeFilters({
  showCompleted,
  completedCount,
  selectedDifficulty,
  onShowCompletedChange,
  onDifficultyChange
}: ChallengeFiltersProps) {
  return (
    <div className="flex flex-col gap-8 mb-12">
      <div className="flex flex-col items-center space-y-2">
        <Text variant="h4" className="text-foreground font-semibold">Filter Challenges</Text>
        <div className="h-1 w-20 bg-primary rounded-full"/>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center gap-6">
        <div className="flex flex-col items-center gap-3">
          <Text variant="body-sm" className="text-foreground font-medium">Status</Text>
          <motion.div 
            className="inline-flex p-1 bg-card border border-border rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <FilterButton
              active={!showCompleted}
              onClick={() => onShowCompletedChange(false)}
            >
              All
            </FilterButton>
            <FilterButton
              active={showCompleted}
              onClick={() => onShowCompletedChange(true)}
            >
              Completed ({completedCount})
            </FilterButton>
          </motion.div>
        </div>

        <div className="flex flex-col items-center gap-3">
          <Text variant="body-sm" className="text-foreground font-medium">Difficulty</Text>
          <motion.div 
            className="inline-flex p-1 bg-card border border-border rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <FilterButton
              active={selectedDifficulty === 'all'}
              onClick={() => onDifficultyChange('all')}
            >
              All
            </FilterButton>
            <FilterButton
              active={selectedDifficulty === 'easy'}
              onClick={() => onDifficultyChange('easy')}
            >
              Easy
            </FilterButton>
            <FilterButton
              active={selectedDifficulty === 'medium'}
              onClick={() => onDifficultyChange('medium')}
            >
              Medium
            </FilterButton>
            <FilterButton
              active={selectedDifficulty === 'hard'}
              onClick={() => onDifficultyChange('hard')}
            >
              Hard
            </FilterButton>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
