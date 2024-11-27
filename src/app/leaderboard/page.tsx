"use client";

import { useState } from 'react';

// Mock data categorized by timeframe
const leaderboardData = {
  "All Time": [
    { id: 1, username: "CSSNinja", score: 9850, challenges: 142, perfectScores: 89, rank: "Grandmaster", avatar: "🥇" },
    { id: 2, username: "PixelPerfect", score: 9720, challenges: 138, perfectScores: 82, rank: "Grandmaster", avatar: "🥈" },
    { id: 3, username: "StyleMaster", score: 9680, challenges: 135, perfectScores: 78, rank: "Grandmaster", avatar: "🥉" },
    { id: 4, username: "CSSWizard", score: 9540, challenges: 130, perfectScores: 75, rank: "Master", avatar: "⭐" },
    { id: 5, username: "YOU", score: 9480, challenges: 128, perfectScores: 72, rank: "Master", avatar: "👑" },
    { id: 6, username: "GridGuru", score: 9350, challenges: 125, perfectScores: 68, rank: "Master", avatar: "🎯" },
    { id: 7, username: "FlexboxHero", score: 9200, challenges: 122, perfectScores: 65, rank: "Diamond", avatar: "💎" },
    { id: 8, username: "WebArtist", score: 9100, challenges: 120, perfectScores: 62, rank: "Diamond", avatar: "🎨" },
    { id: 9, username: "CSSPro", score: 8950, challenges: 118, perfectScores: 58, rank: "Diamond", avatar: "🌟" },
    { id: 10, username: "StyleGenius", score: 8800, challenges: 115, perfectScores: 55, rank: "Diamond", avatar: "✨" },
  ],
  "This Month": [
    { id: 1, username: "CSSNinja", score: 850, challenges: 14, perfectScores: 9, rank: "Master", avatar: "🥇" },
    { id: 2, username: "PixelPerfect", score: 820, challenges: 13, perfectScores: 8, rank: "Master", avatar: "🥈" },
    { id: 3, username: "StyleMaster", score: 780, challenges: 12, perfectScores: 7, rank: "Master", avatar: "🥉" },
    { id: 4, username: "CSSWizard", score: 750, challenges: 11, perfectScores: 6, rank: "Diamond", avatar: "⭐" },
    { id: 5, username: "YOU", score: 720, challenges: 10, perfectScores: 5, rank: "Diamond", avatar: "👑" },
    { id: 6, username: "GridGuru", score: 680, challenges: 9, perfectScores: 4, rank: "Diamond", avatar: "🎯" },
    { id: 7, username: "FlexboxHero", score: 650, challenges: 8, perfectScores: 3, rank: "Diamond", avatar: "💎" },
    { id: 8, username: "WebArtist", score: 620, challenges: 7, perfectScores: 3, rank: "Diamond", avatar: "🎨" },
    { id: 9, username: "CSSPro", score: 580, challenges: 6, perfectScores: 2, rank: "Platinum", avatar: "🌟" },
    { id: 10, username: "StyleGenius", score: 550, challenges: 5, perfectScores: 2, rank: "Platinum", avatar: "✨" },
  ],
  "This Week": [
    { id: 1, username: "CSSNinja", score: 250, challenges: 4, perfectScores: 2, rank: "Diamond", avatar: "🥇" },
    { id: 2, username: "PixelPerfect", score: 220, challenges: 3, perfectScores: 2, rank: "Diamond", avatar: "🥈" },
    { id: 3, username: "StyleMaster", score: 180, challenges: 3, perfectScores: 1, rank: "Diamond", avatar: "🥉" },
    { id: 4, username: "CSSWizard", score: 150, challenges: 2, perfectScores: 1, rank: "Platinum", avatar: "⭐" },
    { id: 5, username: "YOU", score: 120, challenges: 2, perfectScores: 1, rank: "Platinum", avatar: "👑" },
    { id: 6, username: "GridGuru", score: 80, challenges: 1, perfectScores: 0, rank: "Platinum", avatar: "🎯" },
    { id: 7, username: "FlexboxHero", score: 65, challenges: 1, perfectScores: 0, rank: "Gold", avatar: "💎" },
    { id: 8, username: "WebArtist", score: 62, challenges: 1, perfectScores: 0, rank: "Gold", avatar: "🎨" },
    { id: 9, username: "CSSPro", score: 58, challenges: 1, perfectScores: 0, rank: "Gold", avatar: "🌟" },
    { id: 10, username: "StyleGenius", score: 55, challenges: 1, perfectScores: 0, rank: "Gold", avatar: "✨" },
  ],
  "Today": [
    { id: 1, username: "CSSNinja", score: 50, challenges: 1, perfectScores: 1, rank: "Gold", avatar: "🥇" },
    { id: 2, username: "PixelPerfect", score: 45, challenges: 1, perfectScores: 1, rank: "Gold", avatar: "🥈" },
    { id: 3, username: "StyleMaster", score: 40, challenges: 1, perfectScores: 0, rank: "Gold", avatar: "🥉" },
    { id: 4, username: "CSSWizard", score: 35, challenges: 1, perfectScores: 0, rank: "Platinum", avatar: "⭐" },
    { id: 5, username: "YOU", score: 30, challenges: 1, perfectScores: 0, rank: "Platinum", avatar: "👑" },
    { id: 6, username: "GridGuru", score: 25, challenges: 1, perfectScores: 0, rank: "Platinum", avatar: "🎯" },
    { id: 7, username: "FlexboxHero", score: 20, challenges: 0, perfectScores: 0, rank: "Platinum", avatar: "💎" },
    { id: 8, username: "WebArtist", score: 18, challenges: 0, perfectScores: 0, rank: "Platinum", avatar: "🎨" },
    { id: 9, username: "CSSPro", score: 15, challenges: 0, perfectScores: 0, rank: "Gold", avatar: "🌟" },
    { id: 10, username: "StyleGenius", score: 12, challenges: 0, perfectScores: 0, rank: "Gold", avatar: "✨" },
  ],
};

// Define rank colors
const rankColors = {
  Grandmaster: "text-rose-500 dark:text-rose-400",
  Master: "text-violet-500 dark:text-violet-400",
  Diamond: "text-blue-500 dark:text-blue-400",
  Platinum: "text-emerald-500 dark:text-emerald-400",
  Gold: "text-yellow-500 dark:text-yellow-400",
};

// Define timeframes and categories
const timeframes = ["All Time", "This Month", "This Week", "Today"] as const;
const categories = [
  { key: "score", label: "Total Score" },
  { key: "challenges", label: "Challenges Completed" },
  { key: "perfectScores", label: "Perfect Scores" },
] as const;

export default function LeaderboardPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState<typeof timeframes[number]>("All Time");
  const [selectedCategory, setSelectedCategory] = useState<"score" | "challenges" | "perfectScores">("score");

  // Get data based on selected timeframe
  const currentData = leaderboardData[selectedTimeframe] || [];

  // Sort users based on selected category
  const sortedUsers = [...currentData].sort((a, b) => b[selectedCategory] - a[selectedCategory]);

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Global Leaderboard</h1>
          <p className="text-muted-foreground">Compete with the best CSS artists worldwide</p>
        </div>

        {/* Interactive Filters */}
        <div className="flex flex-col gap-8 mb-12">
          {/* Filter Header */}
          <div className="flex flex-col items-center space-y-2">
            <h2 className="text-lg font-medium text-muted-foreground">Filter Rankings</h2>
            <div className="h-1 w-20 bg-primary rounded-full"></div>
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center gap-6">
            {/* Timeframe Selection */}
            <div className="flex flex-col items-center gap-3">
              <span className="text-sm font-medium text-muted-foreground">Time Period</span>
              <div className="inline-flex p-1 bg-muted rounded-lg">
                {timeframes.map((timeframe) => (
                  <button
                    key={timeframe}
                    onClick={() => setSelectedTimeframe(timeframe)}
                    className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                      selectedTimeframe === timeframe
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {timeframe}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Selection */}
            <div className="flex flex-col items-center gap-3">
              <span className="text-sm font-medium text-muted-foreground">Sort By</span>
              <div className="inline-flex p-1 bg-muted rounded-lg">
                {categories.map((category) => (
                  <button
                    key={category.key}
                    onClick={() => setSelectedCategory(category.key)}
                    className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                      selectedCategory === category.key
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="bg-card rounded-xl shadow-lg overflow-hidden border border-border">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-6 py-4 text-left text-sm font-semibold">Rank</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Player</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold">{categories.find(c => c.key === selectedCategory)?.label}</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold">Challenges</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold">Perfect Scores</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold">Rank</th>
                </tr>
              </thead>
              <tbody>
                {sortedUsers.map((user, index) => (
                  <tr
                    key={user.id}
                    className={`border-b border-border transition-colors ${
                      user.username === "YOU"
                        ? "bg-primary/5 hover:bg-primary/10"
                        : "hover:bg-muted/50"
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap flex items-center">
                      <span className="text-2xl">{user.avatar}</span>
                      <span className="ml-2 font-medium">#{index + 1}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className={`font-semibold ${
                          user.username === "YOU" ? "text-primary" : ""
                        }`}>
                          {user.username}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <div className="font-mono font-medium">
                        {selectedCategory === "score" ? user.score.toLocaleString() : user[selectedCategory]}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <div className="font-mono font-medium">{user.challenges}</div>
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <div className="font-mono font-medium">{user.perfectScores}</div>
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <span className={`font-medium ${rankColors[user.rank as keyof typeof rankColors]}`}>
                        {user.rank}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {/* Personal Stats Overview */}
          <div className="bg-card p-6 rounded-lg border border-border shadow-md">
            <h3 className="text-lg font-medium mb-4">Your Stats</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Global Rank</span>
                <span className="font-mono font-medium text-primary">#5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Score</span>
                <span className="font-mono font-medium">{leaderboardData["All Time"].find(u => u.username === "YOU")?.score.toLocaleString() || "9,480"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Perfect Scores</span>
                <span className="font-mono font-medium">{leaderboardData["All Time"].find(u => u.username === "YOU")?.perfectScores || 72}</span>
              </div>
            </div>
          </div>

          {/* Weekly Progress */}
          <div className="bg-card p-6 rounded-lg border border-border shadow-md">
            <h3 className="text-lg font-medium mb-4">Weekly Progress</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Challenges Completed</span>
                <span className="font-mono font-medium">15</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Score Gained</span>
                <span className="font-mono text-emerald-500 font-medium">+850</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Rank Change</span>
                <span className="font-mono text-emerald-500 font-medium">+2</span>
              </div>
            </div>
          </div>

          {/* Next Milestone Tracking */}
          <div className="bg-card p-6 rounded-lg border border-border shadow-md">
            <h3 className="text-lg font-medium mb-4">Next Milestone</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Grandmaster Rank</span>
                <span className="font-mono font-medium">+370 pts</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Top 3 Global</span>
                <span className="font-mono font-medium">+200 pts</span>
              </div>
              <div className="relative pt-2">
                <div className="bg-muted h-2 rounded-full">
                  <div className="bg-primary h-full rounded-full" style={{ width: "85%" }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
