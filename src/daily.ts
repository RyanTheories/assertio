import type { Scenario } from './types';

/**
 * Daily challenge: a deterministic, date-seeded set of scenarios.
 * Everyone playing on the same day (with the same content version)
 * faces the same five scenarios, so scores are comparable offline
 * without any backend.
 */

export const DAILY_COUNT = 5;

/** Local date as YYYY-MM-DD; the challenge changes at local midnight. */
export function todayKey(date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/** Deterministic 32-bit string hash (FNV-1a style, djb2 mix). */
export function hashString(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Deterministic PRNG so the same day always draws the same scenarios. */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function dailySeed(dateKey: string): number {
  return hashString('quaestor-daily:' + dateKey);
}

export function pickDailyScenarios(
  all: Scenario[],
  dateKey: string,
  count = DAILY_COUNT
): Scenario[] {
  const seed = dailySeed(dateKey);
  const rng = mulberry32(seed);
  const pool = [...all];
  // Deterministic Fisher-Yates driven by the seeded PRNG.
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, Math.min(count, pool.length));
}
