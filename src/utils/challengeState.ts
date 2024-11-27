import type { ChallengeScore, ChallengeState } from "~/types/challenge";

const STORAGE_KEY = 'cssbattle_progress';

export function saveChallengeState(challengeId: string, state: ChallengeState): void {
  if (typeof window === 'undefined') return;
  
  try {
    const storage = localStorage.getItem(STORAGE_KEY);
    const progress = storage ? JSON.parse(storage) : {};
    
    progress[challengeId] = state;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error('Failed to save challenge state:', error);
  }
}

export function updateChallengeWithScore(challengeId: string, newScore: ChallengeScore): void {
  if (typeof window === 'undefined') return;
  
  try {
    const currentState = getChallengeState(challengeId) || createInitialState();
    const newState: ChallengeState = {
      scores: Array.isArray(currentState.scores) ? [...currentState.scores, newScore] : [newScore],
      lastAttempt: newScore,
      bestScore: !currentState.bestScore || newScore.combinedScore > currentState.bestScore.combinedScore
        ? newScore
        : currentState.bestScore
    };
    
    saveChallengeState(challengeId, newState);
  } catch (error) {
    console.error('Failed to update challenge with score:', error);
  }
}

export function createInitialState(): ChallengeState {
  return {
    scores: [],
    lastAttempt: undefined,
    bestScore: undefined
  };
}

export function getChallengeState(challengeId: string): ChallengeState | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const storage = localStorage.getItem(STORAGE_KEY);
    if (!storage) return null;
    
    const progress = JSON.parse(storage);
    const state = progress[challengeId] || createInitialState();
    return state;
  } catch {
    return null;
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
