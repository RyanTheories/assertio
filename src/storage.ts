import type { RoundScore } from './scoring';
import type { Mistake } from './mistakes';

const STORAGE_KEY = 'quaestor.v1';

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

export interface DailyResult {
  dateKey: string;
  score: number;
  mastered: number;
  total: number;
}

export interface StoredState {
  mistakes: Mistake[];
  career: CareerStats;
  masteredScenarioIds: string[];
  bestSessionScore: number;
  daily: Partial<Record<string, DailyResult>>;
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
  daily: {},
  mistakes: [],
};

function safeParse(raw: string | null): StoredState | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as StoredState;
    if (typeof parsed !== 'object' || parsed === null || typeof parsed.career !== 'object') return null;
    return { ...EMPTY_STATE, ...parsed, career: { ...EMPTY_STATE.career, ...parsed.career }, daily: parsed.daily ?? {}, mistakes: parsed.mistakes ?? [] };
  } catch {
    return null;
  }
}

export function loadState(): StoredState {
  if (typeof localStorage === 'undefined') return { ...EMPTY_STATE, career: { ...EMPTY_STATE.career }, masteredScenarioIds: [], mistakes: [] };
  try {
    return safeParse(localStorage.getItem(STORAGE_KEY)) ?? { ...EMPTY_STATE, career: { ...EMPTY_STATE.career }, masteredScenarioIds: [], mistakes: [] };
  } catch {
    return { ...EMPTY_STATE, career: { ...EMPTY_STATE.career }, masteredScenarioIds: [], mistakes: [] };
  }
}

function saveState(state: StoredState): void {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* storage unavailable or full, progress simply won't persist */
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

/** Append round mistakes, capped so storage stays bounded; duplicates by scenario+assertion+kind refresh their timestamp. */
export function recordMistakes(mistakes: Mistake[]): void {
  if (mistakes.length === 0) return;
  const state = loadState();
  const key = (m: Mistake) => `${m.scenarioId}|${m.assertion}|${m.kind}`;
  const existing = new Map(state.mistakes.map((m) => [key(m), m]));
  for (const m of mistakes) existing.set(key(m), { ...(existing.get(key(m)) ?? m), timestamp: m.timestamp });
  const merged = [...existing.values()].sort((a, b) => b.timestamp - a.timestamp);
  state.mistakes = merged.slice(0, 200);
  saveState(state);
}

export function clearMistakes(): void {
  const state = loadState();
  state.mistakes = [];
  saveState(state);
}

/** Store today's daily challenge result (best of the day is kept). */
export function recordDailyResult(result: DailyResult): void {
  const state = loadState();
  const prev = state.daily[result.dateKey];
  if (prev && prev.score >= result.score) return;
  state.daily[result.dateKey] = result;
  saveState(state);
}

export function getDailyResult(dateKey: string): DailyResult | null {
  return loadState().daily[dateKey] ?? null;
}

export function resetProgress(): void {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}
