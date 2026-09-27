import { describe, expect, it } from 'vitest';
import {
  POINTS,
  scoreHighRisk,
  scoreProcedure,
  scoreProcedures,
  scoreRelevant,
  scoreRound,
  type ProcedureAnswer,
} from '../scoring';
import type { Scenario } from '../types';

const scenario: Scenario = {
  id: 'test-001',
  line_item: 'Revenue',
  statement: 'SoPL',
  industry: 'retail',
  client_context: 'test context',
  assertions_relevant: ['occurrence', 'completeness', 'accuracy'],
  assertions_high_risk: { occurrence: 'bonus pressure' },
  procedures: [
    {
      procedure: 'Vouch sales invoices to shipping documents',
      tests: ['occurrence'],
      trap: false,
      isa_ref: 'ISA 500',
    },
    {
      procedure: 'Confirm receivable balances with customers',
      tests: ['existence'],
      trap: true,
      trap_explanation: 'Tests receivables, not revenue occurrence.',
      isa_ref: 'ISA 505',
    },
    {
      procedure: 'Trace shipping documents to the sales ledger',
      tests: ['completeness', 'cut_off'],
      trap: false,
      isa_ref: 'ISA 500',
    },
  ],
  isa_refs: ['ISA 315'],
  difficulty: 'beginner',
};

describe('scoreRelevant', () => {
  it('awards full marks for the exact relevant set', () => {
    const r = scoreRelevant(new Set(scenario.assertions_relevant), scenario);
    expect(r.points).toBe(r.maxPoints);
    expect(r.ratio).toBe(1);
  });

  it('gives partial credit and penalises extras', () => {
    const r = scoreRelevant(new Set(['occurrence', 'existence']), scenario);
    expect(r.correct).toBe(1);
    expect(r.extra).toBe(1);
    expect(r.missing).toBe(2);
    expect(r.points).toBe(POINTS.PHASE1_CORRECT + POINTS.PHASE1_EXTRA);
  });
});

describe('scoreHighRisk', () => {
  it('scores against the high-risk keys only', () => {
    const r = scoreHighRisk(new Set(['occurrence']), scenario);
    expect(r.points).toBe(POINTS.PHASE2_CORRECT);
    expect(r.maxPoints).toBe(POINTS.PHASE2_CORRECT);
  });

  it('penalises flagging a non-risky relevant assertion', () => {
    const r = scoreHighRisk(new Set(['completeness']), scenario);
    expect(r.points).toBe(POINTS.PHASE2_EXTRA);
    expect(r.missing).toBe(1);
  });
});

describe('scoreProcedure', () => {
  it('gives the trap bonus for flagging a trap — the highest-value action', () => {
    const trap = scenario.procedures[1];
    const r = scoreProcedure(trap, { matched: [], flaggedTrap: true });
    expect(r.isTrap).toBe(true);
    expect(r.caught).toBe(true);
    expect(r.points).toBe(POINTS.TRAP_CAUGHT);
    expect(POINTS.TRAP_CAUGHT).toBeGreaterThan(POINTS.PROCEDURE_EXACT);
  });

  it('gives zero for matching a trap to an assertion instead of flagging it', () => {
    const trap = scenario.procedures[1];
    const r = scoreProcedure(trap, { matched: ['existence'], flaggedTrap: false });
    expect(r.isTrap).toBe(true);
    expect(r.caught).toBe(false);
    expect(r.points).toBe(0);
  });

  it('rewards an exact match with full procedure points', () => {
    const r = scoreProcedure(scenario.procedures[0], { matched: ['occurrence'], flaggedTrap: false });
    expect(r.points).toBe(POINTS.PROCEDURE_EXACT);
  });

  it('gives partial credit minus penalties for partially-correct matches', () => {
    const r = scoreProcedure(scenario.procedures[2], { matched: ['completeness', 'accuracy'], flaggedTrap: false });
    expect(r.matchedCorrect).toBe(1);
    expect(r.matchedWrong).toBe(1);
    expect(r.points).toBe(POINTS.PROCEDURE_EXACT / 2 + POINTS.PROCEDURE_WRONG);
  });

  it('penalises flagging a normal procedure as a trap', () => {
    const r = scoreProcedure(scenario.procedures[0], { matched: [], flaggedTrap: true });
    expect(r.points).toBe(POINTS.PROCEDURE_WRONG);
    expect(r.points).toBeLessThan(0);
  });
});

describe('scoreProcedures / scoreRound', () => {
  const answers: ProcedureAnswer[] = [
    { matched: ['occurrence'], flaggedTrap: false },
    { matched: [], flaggedTrap: true },
    { matched: ['completeness', 'cut_off'], flaggedTrap: false },
  ];

  it('aggregates procedure scores and counts traps caught', () => {
    const r = scoreProcedures(scenario, answers);
    expect(r.trapsTotal).toBe(1);
    expect(r.trapsCaught).toBe(1);
    expect(r.points).toBe(POINTS.PROCEDURE_EXACT * 2 + POINTS.TRAP_CAUGHT);
  });

  it('marks a round mastered when every phase ratio is at least 80%', () => {
    const rs = scoreRound(
      scenario,
      new Set(scenario.assertions_relevant),
      new Set(['occurrence']),
      answers
    );
    expect(rs.mastered).toBe(true);
    expect(rs.ratio).toBe(1);
  });

  it('is not mastered when a phase falls below the threshold', () => {
    const rs = scoreRound(scenario, new Set(['occurrence']), new Set(), [
      { matched: [], flaggedTrap: false },
      { matched: [], flaggedTrap: false },
      { matched: [], flaggedTrap: false },
    ]);
    expect(rs.mastered).toBe(false);
  });

  it('applies a streak bonus only for mastered rounds', () => {
    const mastered = scoreRound(scenario, new Set(scenario.assertions_relevant), new Set(['occurrence']), answers);
    expect(scoreRound(scenario, new Set(scenario.assertions_relevant), new Set(['occurrence']), answers, 2).streakBonus).toBe(
      2 * POINTS.STREAK_BONUS
    );
    const failed = scoreRound(scenario, new Set(), new Set(), []);
    expect(failed.streakBonus).toBe(0);
    expect(mastered.streakBonus).toBe(0);
  });
});
