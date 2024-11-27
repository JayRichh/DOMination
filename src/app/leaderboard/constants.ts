export const rankColors = {
  Grandmaster: "text-rose-500 dark:text-rose-400",
  Master: "text-violet-500 dark:text-violet-400",
  Diamond: "text-blue-500 dark:text-blue-400",
  Platinum: "text-emerald-500 dark:text-emerald-400",
  Gold: "text-yellow-500 dark:text-yellow-400",
} as const;

export const timeframes = ["All Time", "This Month", "This Week", "Today"] as const;

export const categories = [
  { key: "score", label: "Total Score" },
  { key: "challenges", label: "Challenges Completed" },
  { key: "perfectScores", label: "Perfect Scores" },
] as const;

export type TimeFrame = typeof timeframes[number];
export type Category = typeof categories[number]["key"];
export type Rank = keyof typeof rankColors;
