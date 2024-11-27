'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { getChallengeState, getAllChallengeStates } from "~/utils/challengeState";
import type { Challenge, ChallengeScore } from "~/types/challenge";

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
    <Link
      href={`/challenges/${challenge.id}`}
      className="group relative overflow-hidden rounded-xl bg-background/40 backdrop-blur-xl border border-border/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1"
    >
      {/* Hover Effect Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Completion Badge */}
      {completionState && (
        <>
          <div className="absolute top-4 right-4 z-10 flex items-center gap-3 px-3 py-1 rounded-full bg-primary/90 text-primary-foreground text-sm font-medium">
            <div className="flex flex-col items-center">
              <span className="text-xs opacity-80">Chars</span>
              <span>{completionState.characterScore.toFixed(1)}</span>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div className="flex flex-col items-center">
              <span className="text-xs opacity-80">Visual</span>
              <span>{completionState.visualScore.toFixed(1)}</span>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div className="flex flex-col items-center">
              <span className="text-xs opacity-80">Total</span>
              <span>{completionState.combinedScore.toFixed(1)}</span>
            </div>
          </div>
          <div className="absolute inset-0 ring-2 ring-primary/50 rounded-xl pointer-events-none" />
        </>
      )}

      {/* Challenge Preview */}
      <div className="aspect-square p-6 relative">
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
      <div className="p-6 border-t border-border/50 relative">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">
            {challenge.title}
          </h2>
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
            #{challenge.id}
          </span>
        </div>
        <p className="text-muted-foreground">
          {challenge.description}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full border border-border/50"
              style={{ backgroundColor: challenge.backgroundColor }}
              title="Background Color"
            />
            <div 
              className="w-3 h-3 rounded-full border border-border/50"
              style={{ backgroundColor: challenge.foregroundColor }}
              title="Foreground Color"
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="text-xs text-muted-foreground">
              Target: {challenge.optimalCodeLength} chars
            </div>
            {completionState && (
              <div className="text-xs font-medium text-primary">
                Completed
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export function ChallengeList({ challenges }: { challenges: Challenge[] }) {
  const [showCompleted, setShowCompleted] = useState(false);
  const [filteredChallenges, setFilteredChallenges] = useState(challenges);

  useEffect(() => {
    const states = getAllChallengeStates();
    const completedIds = new Set(
      Object.entries(states)
        .filter(([_, state]) => state.bestScore !== undefined)
        .map(([id]) => id)
    );

    if (showCompleted) {
      setFilteredChallenges(challenges.filter(c => completedIds.has(c.id)));
    } else {
      setFilteredChallenges(challenges);
    }
  }, [challenges, showCompleted]);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowCompleted(false)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              !showCompleted 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            All Challenges
          </button>
          <button
            onClick={() => setShowCompleted(true)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              showCompleted 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            Completed ({Object.keys(getAllChallengeStates()).filter(id => getAllChallengeStates()[id].bestScore !== undefined).length})
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredChallenges.map((challenge) => (
          <ChallengeCard key={challenge.id} challenge={challenge} />
        ))}
      </div>
    </div>
  );
}
