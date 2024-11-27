'use client';

import { useEffect, useState } from 'react';
import { getAllChallengeStates } from '@/utils/challengeState';
import {
  LineChart, Line, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar
} from 'recharts';
import type { ChallengeScore, ChallengeState } from '~/types/challenge';

export default function StatsPage() {
  const [stats, setStats] = useState<{
    totalChallenges: number;
    averageCharacterScore: number;
    averageVisualScore: number;
    averageCombinedScore: number;
    bestScore: ChallengeScore | null;
    recentScores: ChallengeScore[];
    scoreDistribution: {
      range: string;
      count: number;
    }[];
  }>({
    totalChallenges: 0,
    averageCharacterScore: 0,
    averageVisualScore: 0,
    averageCombinedScore: 0,
    bestScore: null,
    recentScores: [],
    scoreDistribution: [],
  });

  useEffect(() => {
    const challengeStates = getAllChallengeStates();
    const scores = Object.values(challengeStates)
      .filter((state): state is ChallengeState => 
        state !== null && state.bestScore !== undefined
      )
      .map(state => state.bestScore!);

    if (scores.length === 0) return;

    // Calculate averages
    const avgCharScore = scores.reduce((sum, score) => sum + score.characterScore, 0) / scores.length;
    const avgVisualScore = scores.reduce((sum, score) => sum + score.visualScore, 0) / scores.length;
    const avgCombinedScore = scores.reduce((sum, score) => sum + score.combinedScore, 0) / scores.length;

    // Find best score
    const bestScore = scores.reduce((best, current) => 
      !best || current.combinedScore > best.combinedScore ? current : best
    , scores[0]);

    // Get recent scores
    const recentScores = [...scores].sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    ).slice(0, 10);

    // Calculate score distribution
    const distribution = Array.from({ length: 10 }, (_, i) => ({
      range: `${i * 10}-${(i + 1) * 10}`,
      count: scores.filter(s => s.combinedScore >= i * 10 && s.combinedScore < (i + 1) * 10).length
    }));

    setStats({
      totalChallenges: scores.length,
      averageCharacterScore: Number(avgCharScore.toFixed(2)),
      averageVisualScore: Number(avgVisualScore.toFixed(2)),
      averageCombinedScore: Number(avgCombinedScore.toFixed(2)),
      bestScore,
      recentScores,
      scoreDistribution: distribution,
    });
  }, []);

  return (
    <div className="container max-w-7xl mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold mb-8">Your Stats</h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="p-6 rounded-xl bg-card">
          <div className="text-sm text-muted-foreground mb-2">Challenges Completed</div>
          <div className="text-3xl font-bold">{stats.totalChallenges}</div>
        </div>
        <div className="p-6 rounded-xl bg-card">
          <div className="text-sm text-muted-foreground mb-2">Avg Character Score</div>
          <div className="text-3xl font-bold text-primary">{stats.averageCharacterScore}</div>
        </div>
        <div className="p-6 rounded-xl bg-card">
          <div className="text-sm text-muted-foreground mb-2">Avg Visual Score</div>
          <div className="text-3xl font-bold text-accent">{stats.averageVisualScore}</div>
        </div>
        <div className="p-6 rounded-xl bg-card">
          <div className="text-sm text-muted-foreground mb-2">Avg Combined Score</div>
          <div className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {stats.averageCombinedScore}
          </div>
        </div>
      </div>

      {/* Score History Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="p-6 rounded-xl bg-card">
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
        </div>

        <div className="p-6 rounded-xl bg-card">
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
        </div>
      </div>

      {/* Best Score */}
      {stats.bestScore && (
        <div className="p-6 rounded-xl bg-card">
          <h2 className="text-xl font-semibold mb-6">Best Performance</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-sm text-muted-foreground mb-2">Character Score</div>
              <div className="text-3xl font-bold text-primary">
                {stats.bestScore.characterScore.toFixed(1)}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                {stats.bestScore.characterCount} characters
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-2">Visual Score</div>
              <div className="text-3xl font-bold text-accent">
                {stats.bestScore.visualScore.toFixed(1)}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                {stats.bestScore.pixelAccuracy.toFixed(2)}% match
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-2">Combined Score</div>
              <div className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {stats.bestScore.combinedScore.toFixed(1)}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                {new Date(stats.bestScore.timestamp).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
