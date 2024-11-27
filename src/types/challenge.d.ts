export interface Challenge {
  id: string;
  title: string;
  description: string;
  targetHtml: string;
  targetCss: string;
  starterHtml?: string;
  starterCss?: string;
  backgroundColor: string;
  foregroundColor: string;
  optimalCodeLength: number;
  difficulty?: 'easy' | 'medium' | 'hard';
  tags?: string[];
  validation?: {
    requiredSelectors?: string[];
    requiredElements?: string[];
    forbiddenSelectors?: string[];
    forbiddenElements?: string[];
    maxElements?: number;
  };
}

export interface ChallengeScore {
  characterScore: number;
  visualScore: number;
  combinedScore: number;
  characterCount: number;
  pixelAccuracy: number;
  timestamp: string;
  html?: string;
  css?: string;
}

export interface ChallengeState {
  scores: ChallengeScore[];
  bestScore?: ChallengeScore;
  lastAttempt?: ChallengeScore;
  currentHtml?: string;
  currentCss?: string;
}

export interface ComparisonResult {
  accuracy: number;
  differences: {
    x: number;
    y: number;
    expectedColor: string;
    actualColor: string;
  }[];
}
