'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getChallengeState, getAllChallengeStates } from "~/utils/challengeState";
import type { Challenge } from "~/types/challenge";
import { ChallengeFilters } from "./ChallengeFilters";

const MotionLink = motion(Link);

function ChallengeCard({ challenge }: { challenge: Challenge }) {
  const [completionState, setCompletionState] = useState<{ characterScore: number; visualScore: number; combinedScore: number } | null>(null);

  useEffect(() => {
    const state = getChallengeState(challenge.id);
    if (state?.bestScore) {
      setCompletionState({
        characterScore: state.bestScore.characterScore,
        visualScore: state.bestScore.visualScore,
        combinedScore: state.bestScore.combinedScore,
      });
    }
  }, [challenge.id]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <Link
        href={`/challenges/${challenge.id}`}
        prefetch={true}
        className="block relative overflow-hidden rounded-xl bg-card border border-border transition-colors"
      >
        {/* Challenge Preview */}
        <div className="aspect-square p-6 relative">
          {/* Completion Banner */}
          {completionState && (
            <div className="absolute -left-16 top-6 z-10">
              <div className="bg-primary/90 text-primary-foreground py-1 px-16 rotate-[-45deg] flex items-center justify-center gap-2 shadow-lg">
                <div className="w-5 h-5 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  {completionState.combinedScore.toFixed(1)}
                </div>
              </div>
            </div>
          )}

          <div 
            className="w-full h-full rounded-lg overflow-hidden shadow-lg"
            style={{ backgroundColor: challenge.backgroundColor }}
          >
            <iframe
              srcDoc={`<!DOCTYPE html>
                <html>
                  <head>
                    <style>
                      * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                      }
                      
                      html, body {
                        width: 100%;
                        height: 100vh;
                        overflow: hidden;
                        background-color: ${challenge.backgroundColor};
                      }

                      body {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        min-height: 100vh;
                      }

                      /* Target CSS */
                      ${challenge.targetCss}
                    </style>
                  </head>
                  <body>
                    ${challenge.targetHtml}
                  </body>
                </html>
              `}
              className="w-full h-full border-0 pointer-events-none"
              sandbox="allow-scripts"
              loading="lazy"
            />
          </div>
        </div>

        {/* Challenge Info */}
        <div className="p-6 border-t border-border">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-medium text-foreground">
              {challenge.title}
            </h2>
            <span className="text-sm text-muted-foreground">
              #{challenge.id}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {challenge.difficulty && (
              <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${
                challenge.difficulty === 'easy' ? 'bg-emerald-500/10 text-emerald-500' :
                challenge.difficulty === 'medium' ? 'bg-amber-500/10 text-amber-500' :
                'bg-rose-500/10 text-rose-500'
              }`}>
                {challenge.difficulty}
              </span>
            )}
            <span className="text-xs text-muted-foreground">
              {challenge.optimalCodeLength} chars
            </span>
            {completionState && (
              <span className="text-xs text-primary font-medium ml-auto">
                Best: {completionState.combinedScore.toFixed(1)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function ChallengeList({ challenges }: { challenges: Challenge[] }) {
  const [showCompleted, setShowCompleted] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [filteredChallenges, setFilteredChallenges] = useState(challenges);
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    const states = getAllChallengeStates();
    const completedIds = new Set(
      Object.entries(states)
        .filter(([_, state]) => state.bestScore !== undefined)
        .map(([id]) => id)
    );

    setCompletedCount(completedIds.size);

    let filtered = challenges;

    // Filter by completion status
    if (showCompleted) {
      filtered = filtered.filter(c => completedIds.has(c.id));
    }

    // Filter by difficulty
    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(c => c.difficulty === selectedDifficulty);
    }

    setFilteredChallenges(filtered);
  }, [challenges, showCompleted, selectedDifficulty]);

  return (
    <div className="space-y-8">
      <ChallengeFilters
        showCompleted={showCompleted}
        completedCount={completedCount}
        selectedDifficulty={selectedDifficulty}
        onShowCompletedChange={setShowCompleted}
        onDifficultyChange={setSelectedDifficulty}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredChallenges.map((challenge) => (
          <ChallengeCard key={challenge.id} challenge={challenge} />
        ))}
        {filteredChallenges.length === 0 && (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            No challenges found matching your filters.
          </div>
        )}
      </div>
    </div>
  );
}
