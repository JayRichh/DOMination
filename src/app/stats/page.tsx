'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getAllChallengeStates } from '~/utils/challengeState';
import { PageLayout } from "~/components/PageLayout";
import {
  LineChart, Line, 
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar
} from 'recharts';
import type { ChallengeScore, ChallengeState } from '~/types/challenge';

interface ScoreWithId extends ChallengeScore {
  challengeId: string;
}

interface StatsData {
  totalChallenges: number;
  averageCharacterScore: number;
  averageVisualScore: number;
  averageCombinedScore: number;
  bestScore: ScoreWithId | null;
  recentScores: ScoreWithId[];
  scoreDistribution: {
    range: string;
    count: number;
  }[];
}

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

export default function StatsPage() {
  const [stats, setStats] = useState<StatsData>({
    totalChallenges: 0,
    averageCharacterScore: 0,
    averageVisualScore: 0,
    averageCombinedScore: 0,
    bestScore: null,
    recentScores: [],
    scoreDistribution: [],
  });

  const loadStats = () => {
    const challengeStates = getAllChallengeStates();
    
    const scoresWithIds = Object.entries(challengeStates)
      .filter((entry): entry is [string, ChallengeState] => {
        const state = entry[1];
        return state !== null && typeof state === 'object' && state.bestScore !== undefined;
      })
      .map(([id, state]) => ({
        ...state.bestScore!,
        challengeId: id
      }));

    if (scoresWithIds.length === 0) return;

    const avgCharScore = scoresWithIds.reduce((sum, score) => sum + score.characterScore, 0) / scoresWithIds.length;
    const avgVisualScore = scoresWithIds.reduce((sum, score) => sum + score.visualScore, 0) / scoresWithIds.length;
    const avgCombinedScore = scoresWithIds.reduce((sum, score) => sum + score.combinedScore, 0) / scoresWithIds.length;

    const bestScore = scoresWithIds.reduce((best, current) => 
      !best || current.combinedScore > best.combinedScore ? current : best
    , scoresWithIds[0]);

    const recentScores = [...scoresWithIds].sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    ).slice(0, 10);

    const distribution = Array.from({ length: 10 }, (_, i) => ({
      range: `${i * 10}-${(i + 1) * 10}`,
      count: scoresWithIds.filter(s => s.combinedScore >= i * 10 && s.combinedScore < (i + 1) * 10).length
    }));

    setStats({
      totalChallenges: scoresWithIds.length,
      averageCharacterScore: Number(avgCharScore.toFixed(2)),
      averageVisualScore: Number(avgVisualScore.toFixed(2)),
      averageCombinedScore: Number(avgCombinedScore.toFixed(2)),
      bestScore,
      recentScores,
      scoreDistribution: distribution,
    });
  };

  useEffect(() => {
    loadStats();
  }, []);

  const clearAllData = () => {
    if (window.confirm('Are you sure you want to clear all your progress? This action cannot be undone.')) {
      localStorage.removeItem('cssbattle_progress');
      window.location.reload();
    }
  };

  return (
    <PageLayout>
      <div className="container max-w-7xl mx-auto py-12 px-6">
        <motion.div 
          className="mb-12 p-6 rounded-xl bg-card border border-border"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold mb-4">Your Profile</h1>
              <div className="space-y-2 text-muted-foreground">
                <p>Total Challenges Completed: {stats.totalChallenges}</p>
                <p>Average Score: {stats.averageCombinedScore}</p>
                {stats.bestScore && (
                  <p>Best Score: {stats.bestScore.combinedScore.toFixed(1)} (Challenge #{stats.bestScore.challengeId})</p>
                )}
              </div>
            </div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                onClick={clearAllData}
                className="px-4 py-2 text-sm font-medium text-destructive bg-destructive/10 hover:bg-destructive hover:text-destructive-foreground rounded-md transition-colors"
              >
                Clear All Progress
              </button>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
        >
          <h2 className="text-2xl font-bold mb-6">Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <motion.div variants={item} className="p-6 rounded-xl bg-card">
              <div className="text-sm text-muted-foreground mb-2">Challenges Completed</div>
              <div className="text-3xl font-bold">{stats.totalChallenges}</div>
            </motion.div>
            <motion.div variants={item} className="p-6 rounded-xl bg-card">
              <div className="text-sm text-muted-foreground mb-2">Avg Character Score</div>
              <div className="text-3xl font-bold text-primary">{stats.averageCharacterScore}</div>
            </motion.div>
            <motion.div variants={item} className="p-6 rounded-xl bg-card">
              <div className="text-sm text-muted-foreground mb-2">Avg Visual Score</div>
              <div className="text-3xl font-bold text-accent">{stats.averageVisualScore}</div>
            </motion.div>
            <motion.div variants={item} className="p-6 rounded-xl bg-card">
              <div className="text-sm text-muted-foreground mb-2">Avg Combined Score</div>
              <div className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {stats.averageCombinedScore}
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <motion.div 
              variants={item}
              className="p-6 rounded-xl bg-card"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
              <h2 className="text-xl font-semibold mb-6">Recent Scores</h2>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={stats.recentScores.slice().reverse()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="timestamp" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="characterScore" stroke="#22c55e" name="Character" />
                    <Line type="monotone" dataKey="visualScore" stroke="#3b82f6" name="Visual" />
                    <Line type="monotone" dataKey="combinedScore" stroke="#8b5cf6" name="Combined" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            <motion.div 
              variants={item}
              className="p-6 rounded-xl bg-card"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
              <h2 className="text-xl font-semibold mb-6">Score Distribution</h2>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stats.scoreDistribution}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="range" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8b5cf6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
}
