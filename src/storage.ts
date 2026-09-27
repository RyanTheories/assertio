import type { RoundScore } from './scoring';

const STORAGE_KEY = 'assertio.v1';

export interface CareerStats {
  gamesPlayed: number;
  totalScore: number;
  bestScore: number;
  averageScore: number;
  bestStreak: number;
  scenariosMastered: number;
}

export interface SessionRecord {
  scenarioId: string;
  lineItem: string;
  mastered: boolean;
  ratio: number;
  total: number;
}

export interface StoredState {
  career: CareerStats;
  masteredScenarioIds: string[];
  bestSessionScore: number;
}

const EMPTY_STATE: StoredState = {
  career: {
    gamesPlayed: 0,
    totalScore: 0,
    bestScore: 0,
    averageScore: 0,
    bestStreak: 0,
    scenariosMastered: 0,
  },
  masteredScenarioIds: [],
  bestSessionScore: 0,
};

function safeParse(raw: string | null): StoredState | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as StoredState;
    if (typeof parsed !== 'object' || parsed === null || typeof parsed.career !== 'object') return null;
    return { ...EMPTY_STATE, ...parsed, career: { ...EMPTY_STATE.career, ...parsed.career } };
  } catch {
    return null;
  }
}

export function loadState(): StoredState {
  if (typeof localStorage === 'undefined') return { ...EMPTY_STATE, career: { ...EMPTY_STATE.career }, masteredScenarioIds: [] };
  try {
    return safeParse(localStorage.getItem(STORAGE_KEY)) ?? { ...EMPTY_STATE, career: { ...EMPTY_STATE.career }, masteredScenarioIds: [] };
  } catch {
    return { ...EMPTY_STATE, career: { ...EMPTY_STATE.career }, masteredScenarioIds: [] };
  }
}

function saveState(state: StoredState): void {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* storage unavailable or full — progress simply won't persist */
  }
}

/** Record a completed session: round results + the session's best streak of mastered scenarios. */
export function recordSession(rounds: Array<{ scenarioId: string; lineItem: string; score: RoundScore }>, sessionStreak: number): CareerStats {
  const state = loadState();
  const sessionScore = rounds.reduce((sum, r) => sum + r.score.total, 0);
  let streak = 0;
  let sessionBestStreak = 0;
  const newlyMastered: string[] = [];
  for (const r of rounds) {
    streak = r.score.mastered ? streak + 1 : 0;
    sessionBestStreak = Math.max(sessionBestStreak, streak);
    if (r.score.mastered && !state.masteredScenarioIds.includes(r.scenarioId)) {
      newlyMastered.push(r.scenarioId);
      state.masteredScenarioIds.push(r.scenarioId);
    }
  }
  const gamesPlayed = state.career.gamesPlayed + 1;
  const totalScore = state.career.totalScore + sessionScore;
  state.career = {
    gamesPlayed,
    totalScore,
    bestScore: Math.max(state.career.bestScore, sessionScore),
    averageScore: Math.round(totalScore / gamesPlayed),
    bestStreak: Math.max(state.career.bestStreak, sessionBestStreak, sessionStreak),
    scenariosMastered: state.masteredScenarioIds.length,
  };
  state.bestSessionScore = Math.max(state.bestSessionScore, sessionScore);
  saveState(state);
  return state.career;
}

export function resetProgress(): void {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}
