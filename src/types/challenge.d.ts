export interface Challenge {
  id: string;
  title: string;
  description: string;
  targetHtml: string;
  targetCss: string;
  backgroundColor: string;
  foregroundColor: string;
  optimalCodeLength: number;
}

export interface ChallengeSubmission {
  challengeId: string;
  userHtml: string;
  userCss: string;
  accuracy: number;
  codeLength: number;
  score: number;
  timestamp: Date;
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
