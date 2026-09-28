import type { AssertionId, Procedure, Scenario } from './types';

/** All tunable point values. Correct-flagging a trap is the highest-value action. */
export const POINTS = {
  /** Phase 1: points per correctly identified relevant assertion. */
  PHASE1_CORRECT: 10,
  /** Phase 1: penalty per extra assertion checked that is not relevant. */
  PHASE1_EXTRA: -5,
  /** Phase 2: points per correctly identified high-risk assertion. */
  PHASE2_CORRECT: 20,
  /** Phase 2: penalty per checked assertion that is not high risk. */
  PHASE2_EXTRA: -10,
  /** Phase 3: points per procedure matched to exactly its tested assertions. */
  PROCEDURE_EXACT: 30,
  /** Phase 3: penalty per wrong assertion in a normal procedure's match. */
  PROCEDURE_WRONG: -10,
  /** Phase 3: bonus for correctly flagging a trap. Highest-value action. */
  TRAP_CAUGHT: 50,
  /** Phase 3: matching a trap to assertions instead of flagging it. */
  TRAP_MISS: 0,
  /** Streak multiplier applied per consecutive scenario mastered in a session. */
  STREAK_BONUS: 15,
  /** Points deducted per hint revealed during a round. */
  HINT_COST: 15,
} as const;

export interface SelectionScore {
  correct: number;
  missing: number;
  extra: number;
  points: number;
  maxPoints: number;
  ratio: number;
}

function scoreSelection(selected: Set<string>, expected: Set<string>, correctPts: number, extraPenalty: number): SelectionScore {
  let correct = 0;
  let extra = 0;
  for (const s of selected) {
    if (expected.has(s)) correct += 1;
    else extra += 1;
  }
  const missing = expected.size - correct;
  const points = correct * correctPts + extra * extraPenalty;
  const maxPoints = expected.size * correctPts;
  const ratio = maxPoints > 0 ? Math.max(0, points) / maxPoints : 0;
  return { correct, missing, extra, points, maxPoints, ratio };
}

export function scoreRelevant(selected: Set<AssertionId>, scenario: Scenario): SelectionScore {
  return scoreSelection(selected, new Set(scenario.assertions_relevant), POINTS.PHASE1_CORRECT, POINTS.PHASE1_EXTRA);
}

export function scoreHighRisk(selected: Set<AssertionId>, scenario: Scenario): SelectionScore {
  return scoreSelection(selected, new Set(Object.keys(scenario.assertions_high_risk)), POINTS.PHASE2_CORRECT, POINTS.PHASE2_EXTRA);
}

export interface ProcedureAnswer {
  /** assertion ids the player matched, empty if flagged as trap */
  matched: AssertionId[];
  flaggedTrap: boolean;
}

export interface ProcedureScore {
  index: number;
  isTrap: boolean;
  caught: boolean;
  /** correct assertions for a normal procedure; ignored for traps */
  expected: AssertionId[];
  matchedCorrect: number;
  matchedWrong: number;
  missed: number;
  points: number;
  maxPoints: number;
}

export function scoreProcedure(proc: Procedure, answer: ProcedureAnswer, index = 0): ProcedureScore {
  const isTrap = proc.trap;
  const expected = new Set<AssertionId>(proc.tests);
  if (isTrap) {
    const caught = answer.flaggedTrap;
    return {
      index,
      isTrap: true,
      caught,
      expected: [],
      matchedCorrect: 0,
      matchedWrong: 0,
      missed: 0,
      points: caught ? POINTS.TRAP_CAUGHT : POINTS.TRAP_MISS,
      maxPoints: POINTS.TRAP_CAUGHT,
    };
  }
  if (answer.flaggedTrap) {
    return {
      index,
      isTrap: false,
      caught: false,
      expected: [...expected],
      matchedCorrect: 0,
      matchedWrong: Math.max(answer.matched.length, 1),
      missed: expected.size,
      points: POINTS.PROCEDURE_WRONG,
      maxPoints: POINTS.PROCEDURE_EXACT,
    };
  }
  let matchedCorrect = 0;
  let matchedWrong = 0;
  for (const m of answer.matched) {
    if (expected.has(m)) matchedCorrect += 1;
    else matchedWrong += 1;
  }
  const missed = expected.size - matchedCorrect;
  const exact = matchedCorrect === expected.size && matchedWrong === 0 && expected.size > 0;
  const partial = matchedCorrect * (POINTS.PROCEDURE_EXACT / Math.max(expected.size, 1));
  const points = exact ? POINTS.PROCEDURE_EXACT : partial + matchedWrong * POINTS.PROCEDURE_WRONG;
  return {
    index,
    isTrap: false,
    caught: false,
    expected: [...expected],
    matchedCorrect,
    matchedWrong,
    missed,
    points,
    maxPoints: POINTS.PROCEDURE_EXACT,
  };
}

export interface Phase3Score {
  procedures: ProcedureScore[];
  points: number;
  maxPoints: number;
  trapsCaught: number;
  trapsTotal: number;
  ratio: number;
}

export function scoreProcedures(scenario: Scenario, answers: ProcedureAnswer[]): Phase3Score {
  const procedures = scenario.procedures.map((p, i) => scoreProcedure(p, answers[i] ?? { matched: [], flaggedTrap: false }, i));
  const points = procedures.reduce((sum, r) => sum + r.points, 0);
  const maxPoints = procedures.reduce((sum, r) => sum + r.maxPoints, 0);
  const traps = procedures.filter((r) => r.isTrap);
  return {
    procedures,
    points,
    maxPoints,
    trapsCaught: traps.filter((r) => r.caught).length,
    trapsTotal: traps.length,
    ratio: maxPoints > 0 ? Math.max(0, points) / maxPoints : 0,
  };
}

export interface RoundScore {
  phase1: SelectionScore;
  phase2: SelectionScore;
  phase3: Phase3Score;
  total: number;
  maxTotal: number;
  ratio: number;
  mastered: boolean;
  streakBonus: number;
}

export function scoreRound(
  scenario: Scenario,
  phase1Selection: Set<AssertionId>,
  phase2Selection: Set<AssertionId>,
  phase3Answers: ProcedureAnswer[],
  streakSoFar = 0,
  hintsUsed = 0
): RoundScore {
  const phase1 = scoreRelevant(phase1Selection, scenario);
  const phase2 = scoreHighRisk(phase2Selection, scenario);
  const phase3 = scoreProcedures(scenario, phase3Answers);
  const hintPenalty = hintsUsed * POINTS.HINT_COST;
  const base = Math.max(0, Math.max(0, phase1.points) + Math.max(0, phase2.points) + phase3.points - hintPenalty);
  const ratios = [phase1.ratio, phase2.ratio, phase3.ratio];
  const mastered = ratios.every((r) => r >= 0.8);
  const streakBonus = mastered ? streakSoFar * POINTS.STREAK_BONUS : 0;
  const maxTotal = phase1.maxPoints + phase2.maxPoints + phase3.maxPoints;
  return {
    phase1,
    phase2,
    phase3,
    total: base + streakBonus,
    maxTotal,
    ratio: maxTotal > 0 ? Math.max(0, base) / maxTotal : 0,
    mastered,
    streakBonus,
  };
}

/** Mastery: every phase ratio ≥ 80%. */
export const MASTERY_THRESHOLD = 0.8;
