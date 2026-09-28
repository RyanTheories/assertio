import { describe, expect, it } from 'vitest';
import { collectMistakes } from '../mistakes';
import type { Scenario } from '../types';

function scenario(): Scenario {
  return {
    id: 's1',
    line_item: 'Revenue',
    statement: 'SoPL',
    industry: 'retail',
    client_context: 'ctx',
    assertions_relevant: ['occurrence', 'completeness'],
    assertions_high_risk: { occurrence: 'context reason' },
    procedures: [
      { procedure: 'Vouch a sample of sales to shipping documents', tests: ['occurrence'], trap: false },
      { procedure: 'Recalculate depreciation on the asset register', tests: ['valuation_and_allocation'], trap: true },
    ],
    difficulty: 'beginner',
  };
}

describe('collectMistakes', () => {
  it('returns nothing on a perfect round', () => {
    const s = scenario();
    const m = collectMistakes(s, new Set(['occurrence', 'completeness']), new Set(['occurrence']), [
      { matched: ['occurrence'], flaggedTrap: false },
      { matched: [], flaggedTrap: true },
    ]);
    expect(m).toHaveLength(0);
  });

  it('captures missed and extra assertions in phases 1 and 2', () => {
    const s = scenario();
    const m = collectMistakes(s, new Set(['occurrence']), new Set(['accuracy']), [
      { matched: ['occurrence'], flaggedTrap: false },
      { matched: [], flaggedTrap: true },
    ]);
    const kinds = m.map((x) => x.kind);
    expect(kinds).toContain('missed_relevant');
    expect(kinds).toContain('missed_risk');
    expect(kinds).toContain('extra_risk');
    expect(m.find((x) => x.kind === 'missed_risk')?.explanation).toBe('context reason');
  });

  it('captures a missed trap and an over-flagged procedure', () => {
    const s = scenario();
    const m = collectMistakes(s, new Set(['occurrence', 'completeness']), new Set(['occurrence']), [
      { matched: ['occurrence'], flaggedTrap: true },
      { matched: [], flaggedTrap: false },
    ]);
    expect(m.some((x) => x.kind === 'trap_missed')).toBe(true);
    expect(m.some((x) => x.kind === 'trap_overflagged')).toBe(true);
  });

  it('captures wrong assertion matches with the tested assertions named', () => {
    const s = scenario();
    const m = collectMistakes(s, new Set(['occurrence', 'completeness']), new Set(['occurrence']), [
      { matched: ['completeness'], flaggedTrap: false },
      { matched: [], flaggedTrap: true },
    ]);
    const wrong = m.find((x) => x.kind === 'wrong_match');
    expect(wrong).toBeDefined();
    expect(wrong?.assertion).toBe('completeness');
    expect(wrong?.explanation).toContain('Occurrence');
  });
});
