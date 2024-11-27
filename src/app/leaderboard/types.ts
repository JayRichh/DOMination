import { Category, Rank, TimeFrame } from "./constants";

export interface LeaderboardEntry {
  id: number;
  username: string;
  score: number;
  challenges: number;
  perfectScores: number;
  rank: Rank;
  avatar: string;
  trend?: {
    direction: "up" | "down" | "same";
    change: number;
  };
}

export type LeaderboardData = Record<TimeFrame, LeaderboardEntry[]>;

export interface LeaderboardState {
  timeframe: TimeFrame;
  category: Category;
}

export type { TimeFrame, Category, Rank };
