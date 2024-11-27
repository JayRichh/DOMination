export interface Challenge {
  id: string;
  title: string;
  description: string;
  targetHtml: string;
  targetCss: string;
  backgroundColor: string;
  foregroundColor: string;
  optimalCodeLength: number;
  difficulty?: 'easy' | 'medium' | 'hard';
  tags?: string[];
}

export interface ChallengeScore {
  characterScore: number;  // Score based on character count (0-100)
  visualScore: number;     // Score based on pixel accuracy (0-100)
  combinedScore: number;   // Weighted average of both scores
  characterCount: number;  // Actual character count
  pixelAccuracy: number;   // Actual pixel match percentage
  timestamp: string;       // When the score was achieved
  css?: string;            // Optional CSS used for this score
}

export interface ChallengeState {
  scores: ChallengeScore[];
  bestScore?: ChallengeScore;
  lastAttempt?: ChallengeScore;
}
