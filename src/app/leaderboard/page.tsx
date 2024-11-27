"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PageLayout } from "~/components/PageLayout";
import { Text } from "~/components/ui/Text";
import { LeaderboardTable } from "./components/LeaderboardTable";
import { StatsCard } from "./components/StatsCard";
import { FilterButtons } from "./components/FilterButtons";
import { leaderboardData } from "./data";
import { TimeFrame, Category } from "./types";

export default function LeaderboardPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState<TimeFrame>("All Time");
  const [selectedCategory, setSelectedCategory] = useState<Category>("score");

  const currentData = leaderboardData[selectedTimeframe];
  const sortedUsers = [...currentData].sort((a, b) => b[selectedCategory] - a[selectedCategory]);
  const currentUser = leaderboardData["All Time"].find(u => u.username === "YOU");
  const currentUserMonthly = leaderboardData["This Month"].find(u => u.username === "YOU");

  const personalStats = [
    { 
      label: "Global Rank", 
      value: "#5", 
      color: "text-primary",
      trend: { direction: "up" as const, change: 3 }
    },
    { 
      label: "Total Score", 
      value: currentUser?.score.toLocaleString() || "9,480",
      trend: { direction: "up" as const, prefix: "+" }
    },
    { 
      label: "Perfect Scores", 
      value: currentUser?.perfectScores || 72,
      trend: { direction: "up" as const, prefix: "+" }
    }
  ];

  const weeklyStats = [
    { 
      label: "Challenges Completed", 
      value: "15",
      trend: { direction: "up" as const, prefix: "+" }
    },
    { 
      label: "Score Gained", 
      value: "+850", 
      color: "text-emerald-500",
      trend: { direction: "up" as const, change: 2 }
    },
    { 
      label: "Monthly Rank", 
      value: currentUserMonthly ? `#${currentData.findIndex(u => u.username === "YOU") + 1}` : "N/A",
      trend: { direction: "up" as const, change: 4 }
    }
  ];

  const milestoneStats = [
    { 
      label: "Grandmaster Rank", 
      value: "+370 pts",
      trend: { direction: "same" as const }
    },
    { 
      label: "Top 3 Global", 
      value: "+200 pts",
      trend: { direction: "same" as const }
    }
  ];

  return (
    <PageLayout>
      <div className="min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative inline-block">
              <Text variant="h1" className="mb-4 text-[#6B8AFF]/80 dark:text-foreground font-bold">
                Global Leaderboard
              </Text>
              <div className="absolute -bottom-2 left-0 right-0 h-[2px] bg-[#6B8AFF]/20 dark:bg-primary/20">
                <div className="absolute top-0 left-0 right-0 h-full bg-[#6B8AFF]/40 dark:bg-primary/40" style={{ width: '50%', animation: 'moveUnderline 2s ease-in-out infinite' }}/>
              </div>
            </div>
            <Text variant="body-lg" className="text-[#6B8AFF]/60 dark:text-muted-foreground mt-6 w-full text-center right-[3.8rem]">
              Compete with the best CSS artists worldwide
            </Text>
          </motion.div>

          <FilterButtons
            timeframe={selectedTimeframe}
            category={selectedCategory}
            onTimeframeChange={setSelectedTimeframe}
            onCategoryChange={setSelectedCategory}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <LeaderboardTable
              users={sortedUsers}
              selectedCategory={selectedCategory}
            />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <StatsCard
              title="Your Stats"
              stats={personalStats}
            />
            <StatsCard
              title="Weekly Progress"
              stats={weeklyStats}
            />
            <StatsCard
              title="Next Milestone"
              stats={milestoneStats}
              progressValue={85}
            />
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
