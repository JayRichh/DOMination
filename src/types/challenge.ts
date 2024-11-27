export interface Challenge {
  id: string;
  title: string;
  description: string;
  backgroundColor: string;
  foregroundColor: string;
  targetHtml: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
}
