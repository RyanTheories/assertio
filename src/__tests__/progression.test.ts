import { describe, expect, it } from 'vitest';
import { careerRanks, rankFor, nextRank } from '../career';
import { pickDailyScenarios, todayKey, DAILY_COUNT } from '../daily';
import type { Scenario } from '../types';

function fakeScenario(id: string): Scenario {
  return {
    id,
    line_item: id,
    statement: 'SoPL',
    industry: 'retail',
    client_context: 'test',
    assertions_relevant: ['occurrence'],
    assertions_high_risk: { occurrence: 'reason' },
    procedures: [{ procedure: 'p', tests: ['occurrence'], trap: false }],
    difficulty: 'beginner',
  };
}

describe('career ladder', () => {
  const total = 100;
  it('has six ranks with ascending thresholds', () => {
    const ranks = careerRanks(total);
    expect(ranks).toHaveLength(6);
    for (let i = 1; i < ranks.length; i++) {
      expect(ranks[i].threshold).toBeGreaterThan(ranks[i - 1].threshold);
    }
  });

  it('ranks a fresh player as Trainee and a full master as Quaestor', () => {
    expect(rankFor(0, total).title).toBe('Trainee');
    expect(rankFor(total, total).title).toBe('Quaestor');
  });

  it('reports the next rank until the top', () => {
    expect(nextRank(0, total)?.title).toBe('Assistant Auditor');
    expect(nextRank(total, total)).toBeNull();
  });
});

describe('daily challenge', () => {
  const pool = Array.from({ length: 50 }, (_, i) => fakeScenario(`s-${i}`));

  it('is deterministic for the same date', () => {
    const a = pickDailyScenarios(pool, '2026-07-14');
    const b = pickDailyScenarios(pool, '2026-07-14');
    expect(a.map((s) => s.id)).toEqual(b.map((s) => s.id));
  });

  it('draws a different set per date and returns DAILY_COUNT scenarios', () => {
    const a = pickDailyScenarios(pool, '2026-07-14');
    const c = pickDailyScenarios(pool, '2026-07-15');
    expect(a).toHaveLength(DAILY_COUNT);
    expect(a.map((s) => s.id)).not.toEqual(c.map((s) => s.id));
  });

  it('does not repeat scenarios within a draw', () => {
    const a = pickDailyScenarios(pool, '2026-07-14');
    expect(new Set(a.map((s) => s.id)).size).toBe(a.length);
  });

  it('formats the date key as YYYY-MM-DD', () => {
    expect(todayKey(new Date(2026, 6, 4))).toBe('2026-07-04');
  });
});
