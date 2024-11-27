'use client';

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getAllChallengeStates } from "~/utils/challengeState";
import type { Challenge } from "~/types/challenge";
import { Text } from "~/components/ui/Text";

export function StatsOverview({ challenges }: { challenges: Challenge[] }) {
  const [stats, setStats] = useState({
    completed: 0,
    averageScore: 0,
    bestScore: 0,
    totalChallenges: challenges.length,
    completionPercentage: 0
  });

  useEffect(() => {
    const states = getAllChallengeStates();
    const completedChallenges = Object.values(states).filter(state => state.bestScore);
    const scores = completedChallenges.map(c => c.bestScore?.combinedScore || 0);
    
    setStats({
      completed: completedChallenges.length,
      averageScore: scores.length ? Number((scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1)) : 0,
      bestScore: scores.length ? Math.max(...scores) : 0,
      totalChallenges: challenges.length,
      completionPercentage: Number(((completedChallenges.length / challenges.length) * 100).toFixed(1))
    });
  }, [challenges]);

  return (
    <div className="mb-12">
      <div className="flex items-baseline gap-3 mb-6">
        <Text variant="h1" className="text-[5rem] font-bold text-primary">
          {stats.completionPercentage}%
        </Text>
        <Text variant="h3" className="text-muted-foreground">
          completed
        </Text>
      </div>

      <div className="flex flex-wrap gap-8 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="font-medium text-foreground">{stats.completed}</span> of {stats.totalChallenges} challenges
        </div>
        {stats.completed > 0 && (
          <>
            <div className="flex items-center gap-2">
              Average Score: <span className="font-medium text-foreground">{stats.averageScore}</span>
            </div>
            <div className="flex items-center gap-2">
              Best Score: <span className="font-medium text-foreground">{stats.bestScore}</span>
            </div>
          </>
        )}
      </div>

      <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-primary/50"
          initial={{ width: 0 }}
          animate={{ width: `${stats.completionPercentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
