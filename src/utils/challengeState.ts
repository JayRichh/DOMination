interface ChallengeState {
  score: number;
  completedAt: string;
}

const STORAGE_KEY = 'cssbattle_progress';

export function getChallengeState(challengeId: string): ChallengeState | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const storage = localStorage.getItem(STORAGE_KEY);
    if (!storage) return null;
    
    const progress = JSON.parse(storage);
    return progress[challengeId] || null;
  } catch {
    return null;
  }
}

export function saveChallengeState(challengeId: string, score: number): void {
  if (typeof window === 'undefined') return;
  
  try {
    const storage = localStorage.getItem(STORAGE_KEY);
    const progress = storage ? JSON.parse(storage) : {};
    
    progress[challengeId] = {
      score,
      completedAt: new Date().toISOString(),
    };
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error('Failed to save challenge state:', error);
  }
}

export function getAllChallengeStates(): Record<string, ChallengeState> {
  if (typeof window === 'undefined') return {};
  
  try {
    const storage = localStorage.getItem(STORAGE_KEY);
    return storage ? JSON.parse(storage) : {};
  } catch {
    return {};
  }
}
