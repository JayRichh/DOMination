'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getAllChallengeStates } from '~/utils/challengeState';
import { PageLayout } from "~/components/PageLayout";
import { ResponsiveLine } from '@nivo/line';
import { ResponsiveBar } from '@nivo/bar';
import { ResponsiveRadar } from '@nivo/radar';
import { chartTheme } from '~/components/ui/ChartContainer';
import { ChartContainer } from '~/components/ui/ChartContainer';
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
  performanceMetrics: {
    category: string;
    value: number;
  }[];
  timeBasedProgress: {
    id: string;
    data: Array<{
      x: string;
      y: number;
    }>;
  }[];
  optimizationMetrics: {
    metric: string;
    value: number;
    description: string;
  }[];
}

const generateDummyData = (): StatsData => {
  const now = new Date();
  const dummyScores: ScoreWithId[] = Array.from({ length: 10 }, (_, i) => ({
    challengeId: `${i + 1}`,
    characterScore: 75 + Math.random() * 25,
    visualScore: 80 + Math.random() * 20,
    combinedScore: 85 + Math.random() * 15,
    characterCount: 200 + Math.floor(Math.random() * 300),
    pixelAccuracy: 0.9 + Math.random() * 0.1,
    timestamp: new Date(now.getTime() - (i * 24 * 60 * 60 * 1000)).toISOString(),
    html: '',
    css: ''
  }));

  const avgCharScore = dummyScores.reduce((sum, score) => sum + score.characterScore, 0) / dummyScores.length;
  const avgVisualScore = dummyScores.reduce((sum, score) => sum + score.visualScore, 0) / dummyScores.length;
  const avgCombinedScore = dummyScores.reduce((sum, score) => sum + score.combinedScore, 0) / dummyScores.length;

  return {
    totalChallenges: dummyScores.length,
    averageCharacterScore: Number(avgCharScore.toFixed(2)),
    averageVisualScore: Number(avgVisualScore.toFixed(2)),
    averageCombinedScore: Number(avgCombinedScore.toFixed(2)),
    bestScore: dummyScores[0],
    recentScores: dummyScores,
    scoreDistribution: Array.from({ length: 5 }, (_, i) => ({
      range: `${i * 20}-${(i + 1) * 20}`,
      count: Math.floor(Math.random() * 10)
    })),
    performanceMetrics: [
      { category: 'Character Optimization', value: avgCharScore },
      { category: 'Visual Accuracy', value: avgVisualScore },
      { category: 'Code Efficiency', value: 85 },
      { category: 'Consistency', value: 90 },
      { category: 'Progress Rate', value: 75 }
    ],
    timeBasedProgress: [
      {
        id: 'Combined Score',
        data: dummyScores.map(score => ({
          x: new Date(score.timestamp).toLocaleDateString(),
          y: score.combinedScore
        })).reverse()
      },
      {
        id: 'Character Score',
        data: dummyScores.map(score => ({
          x: new Date(score.timestamp).toLocaleDateString(),
          y: score.characterScore
        })).reverse()
      },
      {
        id: 'Visual Score',
        data: dummyScores.map(score => ({
          x: new Date(score.timestamp).toLocaleDateString(),
          y: score.visualScore
        })).reverse()
      }
    ],
    optimizationMetrics: [
      {
        metric: 'Code Efficiency',
        value: 250,
        description: 'Average characters per solution'
      },
      {
        metric: 'Visual Precision',
        value: 85,
        description: 'Solutions with >95% accuracy'
      },
      {
        metric: 'Optimization Rate',
        value: 75,
        description: 'Solutions with excellent optimization'
      }
    ]
  };
};

const calculateStandardDeviation = (values: number[]): number => {
  const n = values.length;
  if (n < 2) return 0;
  
  const mean = values.reduce((a, b) => a + b) / n;
  const variance = values.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / (n - 1);
  return Math.sqrt(variance);
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
    performanceMetrics: [],
    timeBasedProgress: [],
    optimizationMetrics: []
  });
  const [useDummyData, setUseDummyData] = useState(false);

  const loadStats = () => {
    if (useDummyData) {
      setStats(generateDummyData());
      return;
    }

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

    if (scoresWithIds.length === 0) {
      setUseDummyData(true);
      setStats(generateDummyData());
      return;
    }

    const avgCharScore = scoresWithIds.reduce((sum, score) => sum + score.characterScore, 0) / scoresWithIds.length;
    const avgVisualScore = scoresWithIds.reduce((sum, score) => sum + score.visualScore, 0) / scoresWithIds.length;
    const avgCombinedScore = scoresWithIds.reduce((sum, score) => sum + score.combinedScore, 0) / scoresWithIds.length;

    const bestScore = scoresWithIds.reduce((best, current) => 
      !best || current.combinedScore > best.combinedScore ? current : best
    , scoresWithIds[0]);

    const recentScores = [...scoresWithIds].sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    ).slice(0, 10);

    const distribution = Array.from({ length: 20 }, (_, i) => ({
      range: `${i * 5}-${(i + 1) * 5}`,
      count: scoresWithIds.filter(s => s.combinedScore >= i * 5 && s.combinedScore < (i + 1) * 5).length
    })).filter(d => d.count > 0);

    const scoreStdDev = calculateStandardDeviation(scoresWithIds.map(s => s.combinedScore));
    const consistencyScore = Math.max(0, 100 - (scoreStdDev * 2));

    const performanceMetrics = [
      { category: 'Character Optimization', value: avgCharScore },
      { category: 'Visual Accuracy', value: avgVisualScore },
      { category: 'Code Efficiency', value: Math.min(100, (1 - scoresWithIds.reduce((acc, score) => acc + score.characterCount, 0) / (scoresWithIds.length * 500)) * 100) },
      { category: 'Consistency', value: consistencyScore },
      { category: 'Progress Rate', value: (scoresWithIds.length / 100) * 100 }
    ];

    const timeBasedProgress = [
      {
        id: 'Combined Score',
        data: recentScores.map(score => ({
          x: new Date(score.timestamp).toLocaleDateString(),
          y: score.combinedScore
        })).reverse()
      },
      {
        id: 'Character Score',
        data: recentScores.map(score => ({
          x: new Date(score.timestamp).toLocaleDateString(),
          y: score.characterScore
        })).reverse()
      },
      {
        id: 'Visual Score',
        data: recentScores.map(score => ({
          x: new Date(score.timestamp).toLocaleDateString(),
          y: score.visualScore
        })).reverse()
      }
    ];

    const optimizationMetrics = [
      {
        metric: 'Code Efficiency',
        value: scoresWithIds.reduce((acc, score) => acc + score.characterCount, 0) / scoresWithIds.length,
        description: 'Average characters per solution'
      },
      {
        metric: 'Visual Precision',
        value: (scoresWithIds.filter(s => s.visualScore > 95).length / scoresWithIds.length) * 100,
        description: 'Solutions with >95% accuracy'
      },
      {
        metric: 'Optimization Rate',
        value: (scoresWithIds.filter(s => s.characterScore > 90).length / scoresWithIds.length) * 100,
        description: 'Solutions with excellent optimization'
      }
    ];

    setStats({
      totalChallenges: scoresWithIds.length,
      averageCharacterScore: Number(avgCharScore.toFixed(2)),
      averageVisualScore: Number(avgVisualScore.toFixed(2)),
      averageCombinedScore: Number(avgCombinedScore.toFixed(2)),
      bestScore,
      recentScores,
      scoreDistribution: distribution,
      performanceMetrics,
      timeBasedProgress,
      optimizationMetrics
    });
  };

  useEffect(() => {
    loadStats();
  }, [useDummyData]);

  const clearAllData = () => {
    if (window.confirm('Are you sure you want to clear all your progress? This action cannot be undone.')) {
      localStorage.removeItem('cssbattle_progress');
      window.location.reload();
    }
  };

  const toggleDummyData = () => {
    setUseDummyData(!useDummyData);
  };

  return (
    <PageLayout>
      <div className="min-h-screen">
        <div className="container max-w-[2000px] mx-auto">
          <motion.div 
            className="border-b border-border"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col lg:flex-row justify-between items-start gap-8 p-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
                  Performance Analytics
                </h1>
                <div className="space-y-2 text-lg md:text-xl">
                  <p className="text-foreground">Total Challenges Completed: <span className="font-semibold">{stats.totalChallenges}</span></p>
                  <p className="text-foreground">Average Score: <span className="font-semibold">{stats.averageCombinedScore}</span></p>
                  {stats.bestScore && (
                    <p className="text-foreground">Best Score: <span className="font-semibold">{stats.bestScore.combinedScore.toFixed(1)}</span> (Challenge #{stats.bestScore.challengeId})</p>
                  )}
                </div>
              </div>
              <div className="flex gap-4">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button
                    onClick={toggleDummyData}
                    className="px-6 py-3 text-base font-medium text-primary-foreground bg-primary hover:bg-primary/90 rounded-lg transition-colors shadow-lg"
                  >
                    {useDummyData ? 'Use Real Data' : 'Use Dummy Data'}
                  </button>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button
                    onClick={clearAllData}
                    className="px-6 py-3 text-base font-medium text-destructive-foreground bg-destructive hover:bg-destructive/90 rounded-lg transition-colors shadow-lg"
                  >
                    Clear All Progress
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-b border-border">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-8 border-r border-b md:border-b-0 border-border"
            >
              <div className="text-lg text-foreground mb-3">Challenges Completed</div>
              <div className="text-4xl font-bold text-foreground">{stats.totalChallenges}</div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-8 lg:border-r border-b md:border-b-0 border-border"
            >
              <div className="text-lg text-foreground mb-3">Avg Character Score</div>
              <div className="text-4xl font-bold text-primary">{stats.averageCharacterScore}</div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-8 border-r border-b lg:border-b-0 border-border"
            >
              <div className="text-lg text-foreground mb-3">Avg Visual Score</div>
              <div className="text-4xl font-bold text-accent">{stats.averageVisualScore}</div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="p-8"
            >
              <div className="text-lg text-foreground mb-3">Avg Combined Score</div>
              <div className="text-4xl font-bold text-foreground">{stats.averageCombinedScore}</div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 border-b border-border">
            {stats.timeBasedProgress.length > 0 && (
              <div className="border-r border-border">
                <ChartContainer title="Score Progression" chartId="progression">
                  <ResponsiveLine
                    data={stats.timeBasedProgress}
                    theme={chartTheme}
                    margin={{ top: 40, right: 40, bottom: 60, left: 60 }}
                    xScale={{ type: 'point' }}
                    yScale={{ type: 'linear', min: 0, max: 100 }}
                    curve="monotoneX"
                    enablePoints={true}
                    pointSize={8}
                    pointColor="hsl(var(--background))"
                    pointBorderWidth={2}
                    pointBorderColor={{ from: 'serieColor' }}
                    enableGridX={false}
                    enableArea={true}
                    areaOpacity={0.1}
                    useMesh={true}
                    axisBottom={{
                      tickRotation: -45,
                      legend: 'Date',
                      legendOffset: 40
                    }}
                    axisLeft={{
                      legend: 'Score',
                      legendOffset: -40
                    }}
                    legends={[
                      {
                        anchor: 'top',
                        direction: 'row',
                        justify: false,
                        translateX: 0,
                        translateY: -30,
                        itemsSpacing: 0,
                        itemDirection: 'left-to-right',
                        itemWidth: 100,
                        itemHeight: 20,
                        symbolSize: 12,
                        symbolShape: 'circle',
                        itemTextColor: 'hsl(var(--foreground))'
                      }
                    ]}
                  />
                </ChartContainer>
              </div>
            )}

            {stats.performanceMetrics.length > 0 && (
              <div>
                <ChartContainer title="Performance Metrics" chartId="performance">
                  <ResponsiveRadar
                    data={stats.performanceMetrics}
                    theme={chartTheme}
                    keys={['value']}
                    indexBy="category"
                    maxValue={100}
                    margin={{ top: 40, right: 80, bottom: 40, left: 80 }}
                    curve="linearClosed"
                    borderWidth={2}
                    borderColor={{ from: 'color' }}
                    gridLevels={5}
                    gridShape="circular"
                    gridLabelOffset={20}
                    enableDots={true}
                    dotSize={8}
                    dotColor="hsl(var(--background))"
                    dotBorderWidth={2}
                    dotBorderColor={{ from: 'color' }}
                    enableDotLabel={true}
                    dotLabel="value"
                    dotLabelYOffset={-12}
                    fillOpacity={0.25}
                    blendMode="multiply"
                    animate={true}
                  />
                </ChartContainer>
              </div>
            )}
          </div>

          {stats.scoreDistribution.length > 0 && (
            <div className="border-b border-border">
              <ChartContainer title="Score Distribution" chartId="distribution">
                <ResponsiveBar
                  data={stats.scoreDistribution}
                  theme={chartTheme}
                  keys={['count']}
                  indexBy="range"
                  margin={{ top: 40, right: 40, bottom: 60, left: 60 }}
                  padding={0.3}
                  valueScale={{ type: 'linear' }}
                  indexScale={{ type: 'band', round: true }}
                  colors={{ scheme: 'category10' }}
                  borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                  axisTop={null}
                  axisRight={null}
                  axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: -45,
                    legend: 'Score Range',
                    legendPosition: 'middle',
                    legendOffset: 45
                  }}
                  axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Count',
                    legendPosition: 'middle',
                    legendOffset: -45
                  }}
                  labelSkipWidth={12}
                  labelSkipHeight={12}
                  labelTextColor="hsl(var(--background))"
                  animate={true}
                />
              </ChartContainer>
            </div>
          )}

          {stats.optimizationMetrics.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3">
              {stats.optimizationMetrics.map((metric, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-8 ${index < stats.optimizationMetrics.length - 1 ? 'border-r border-border' : ''}`}
                >
                  <div className="text-lg text-foreground mb-2">{metric.metric}</div>
                  <div className="text-4xl font-bold text-foreground mb-4">{Math.round(metric.value)}</div>
                  <div className="text-sm text-muted-foreground">{metric.description}</div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
