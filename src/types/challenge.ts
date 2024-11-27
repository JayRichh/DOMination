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
