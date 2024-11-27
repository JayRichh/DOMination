'use client';

import { useEffect, useState } from 'react';
import { getAllChallengeStates } from '@/utils/challengeState';
import {
  LineChart, Line, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar
} from 'recharts';

interface StatsData {
  totalChallenges: number;
  completedChallenges: number;
  averageScore: number;
  bestScore: number;
  recentCompletions: Array<{id: string; score: number; completedAt: string}>;
  scoreHistory: Array<{date: string; score: number}>;
  completionsByDay: Array<{date: string; count: number}>;
  scoreDistribution: Array<{range: string; count: number}>;
}

export default function StatsPage() {
  const [stats, setStats] = useState<StatsData>({
    totalChallenges: 0,
    completedChallenges: 0,
    averageScore: 0,
    bestScore: 0,
    recentCompletions: [],
    scoreHistory: [],
    completionsByDay: [],
    scoreDistribution: [],
  });

  useEffect(() => {
    const challengeStates = getAllChallengeStates();
    const completions = Object.entries(challengeStates).map(([id, state]) => ({
      id,
      score: state.score,
      completedAt: state.completedAt,
    }));

    // Process data for charts
    const scoreHistory = processScoreHistory(completions);
    const completionsByDay = processCompletionsByDay(completions);
    const scoreDistribution = processScoreDistribution(completions);

    setStats({
      totalChallenges: 100, // Replace with actual total
      completedChallenges: completions.length,
      averageScore: calculateAverage(completions.map(c => c.score)),
      bestScore: Math.max(...completions.map(c => c.score), 0),
      recentCompletions: completions.sort((a, b) => 
        new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
      ).slice(0, 5),
      scoreHistory,
      completionsByDay,
      scoreDistribution,
    });
  }, []);

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background" />
      
      <div className="relative max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient">
            Your Progress
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Track your CSS Battle journey with detailed statistics and insights.
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatsCard title="Total Challenges" value={stats.totalChallenges.toString()} />
          <StatsCard title="Completed" value={stats.completedChallenges.toString()} />
          <StatsCard title="Average Score" value={`${stats.averageScore.toFixed(1)}%`} />
          <StatsCard title="Best Score" value={`${stats.bestScore.toFixed(1)}%`} />
        </div>

        {/* Charts Section */}
        <div className="space-y-12">
          {/* Score Trend */}
          <div className="p-6 rounded-lg border border-border bg-card">
            <h2 className="text-2xl font-bold mb-6">Score History</h2>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={stats.scoreHistory}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="date" className="text-muted-foreground" />
                  <YAxis className="text-muted-foreground" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                    }}
                    labelStyle={{ color: 'hsl(var(--muted-foreground))' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="score" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Completions by Day */}
          <div className="p-6 rounded-lg border border-border bg-card">
            <h2 className="text-2xl font-bold mb-6">Daily Completions</h2>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stats.completionsByDay}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="date" className="text-muted-foreground" />
                  <YAxis className="text-muted-foreground" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                    }}
                    labelStyle={{ color: 'hsl(var(--muted-foreground))' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="count"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Score Distribution */}
          <div className="p-6 rounded-lg border border-border bg-card">
            <h2 className="text-2xl font-bold mb-6">Score Distribution</h2>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.scoreDistribution}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="range" className="text-muted-foreground" />
                  <YAxis className="text-muted-foreground" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                    }}
                    labelStyle={{ color: 'hsl(var(--muted-foreground))' }}
                  />
                  <Bar 
                    dataKey="count" 
                    fill="hsl(var(--primary))"
                    fillOpacity={0.8}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent Completions */}
        <div className="mt-12 space-y-6">
          <h2 className="text-2xl font-bold">Recent Completions</h2>
          <div className="grid gap-4">
            {stats.recentCompletions.map((completion) => (
              <div
                key={completion.id}
                className="p-4 rounded-lg border border-border bg-card hover:bg-card/80 transition-colors"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Challenge #{completion.id}</h3>
                    <p className="text-sm text-muted-foreground">
                      Completed {new Date(completion.completedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{completion.score.toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground">Score</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatsCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="p-6 rounded-lg border border-border bg-card hover:bg-card/80 transition-colors">
      <h3 className="text-sm font-medium text-muted-foreground mb-2">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

// Data processing helpers
function processScoreHistory(completions: Array<{score: number; completedAt: string}>) {
  return completions
    .sort((a, b) => new Date(a.completedAt).getTime() - new Date(b.completedAt).getTime())
    .map(c => ({
      date: new Date(c.completedAt).toLocaleDateString(),
      score: c.score,
    }));
}

function processCompletionsByDay(completions: Array<{completedAt: string}>) {
  const counts = completions.reduce((acc, curr) => {
    const date = new Date(curr.completedAt).toLocaleDateString();
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(counts).map(([date, count]) => ({ date, count }));
}

function processScoreDistribution(completions: Array<{score: number}>) {
  const ranges = ['0-20', '21-40', '41-60', '61-80', '81-100'];
  const distribution = completions.reduce((acc, curr) => {
    const rangeIndex = Math.floor(curr.score / 20);
    const range = ranges[rangeIndex];
    acc[range] = (acc[range] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return ranges.map(range => ({
    range,
    count: distribution[range] || 0,
  }));
}

function calculateAverage(numbers: number[]) {
  return numbers.length > 0
    ? numbers.reduce((a, b) => a + b, 0) / numbers.length
    : 0;
}
