import type { AssertionId, Scenario, Procedure } from './types';
import { scoreProcedures, type ProcedureAnswer } from './scoring';
import { ASSERTION_LABELS } from './ui';

export type MistakeKind = 'missed_relevant' | 'extra_relevant' | 'missed_risk' | 'extra_risk' | 'wrong_match' | 'trap_missed' | 'trap_overflagged';

export interface Mistake {
  kind: MistakeKind;
  scenarioId: string;
  lineItem: string;
  statement: string;
  industry: string;
  /** the assertion at the heart of the mistake; empty for whole-procedure mistakes */
  assertion: AssertionId | '';
  /** short text describing the error */
  detail: string;
  /** the teaching explanation: why the right answer is right */
  explanation: string;
  timestamp: number;
}

const KIND_LABELS: Record<MistakeKind, string> = {
  missed_relevant: 'Missed a relevant assertion',
  extra_relevant: 'Irrelevant assertion checked',
  missed_risk: 'Missed a high-risk assertion',
  extra_risk: 'Flagged risk that was not there',
  wrong_match: 'Procedure matched to the wrong assertion',
  trap_missed: 'Trap not caught',
  trap_overflagged: 'Flagged a normal procedure as a trap',
};

export function mistakeKindLabel(kind: MistakeKind): string {
  return KIND_LABELS[kind];
}

export function collectMistakes(
  scenario: Scenario,
  p1: Set<AssertionId>,
  p2: Set<AssertionId>,
  p3: ProcedureAnswer[]
): Mistake[] {
  const mistakes: Mistake[] = [];
  const now = Date.now();
  const push = (kind: MistakeKind, assertion: AssertionId | '', detail: string, explanation: string) => {
    mistakes.push({ kind, scenarioId: scenario.id, lineItem: scenario.line_item, statement: scenario.statement, industry: scenario.industry, assertion, detail, explanation, timestamp: now });
  };

  const relevant = new Set(scenario.assertions_relevant);
  for (const a of relevant) {
    if (!p1.has(a)) {
      push('missed_relevant', a, `You did not check ${ASSERTION_LABELS[a]} as relevant for ${scenario.line_item}.`, scenario.why_relevant?.[a] ?? `${ASSERTION_LABELS[a]} is relevant for ${scenario.line_item}.`);
    }
  }
  for (const a of p1) {
    if (!relevant.has(a)) {
      push('extra_relevant', a, `You checked ${ASSERTION_LABELS[a]}, but it is not relevant for ${scenario.line_item}.`, `${ASSERTION_LABELS[a]} does not fit how ${scenario.line_item} is audited.`);
    }
  }

  const highRisk = new Set(Object.keys(scenario.assertions_high_risk) as AssertionId[]);
  for (const a of highRisk) {
    if (!p2.has(a)) {
      push('missed_risk', a, `You did not mark ${ASSERTION_LABELS[a]} as high risk.`, scenario.assertions_high_risk[a] ?? `${ASSERTION_LABELS[a]} is high risk in this context.`);
    }
  }
  for (const a of p2) {
    if (!highRisk.has(a)) {
      push('extra_risk', a, `You marked ${ASSERTION_LABELS[a]} as high risk, but the context does not raise it.`, `Nothing in this brief raises ${ASSERTION_LABELS[a]} above normal risk; ordinary procedures cover it.`);
    }
  }

  const scored = scoreProcedures(scenario, p3);
  scored.procedures.forEach((ps, i) => {
    const proc: Procedure = scenario.procedures[i];
    if (ps.isTrap && !ps.caught) {
      push('trap_missed', '', `Procedure ${i + 1} was a trap: "${proc.procedure}" looks right but tests the wrong assertion.`, `The procedure actually tests ${proc.tests.map((t) => ASSERTION_LABELS[t]).join(', ')} — not the assertion the risk calls for.`);
    }
    const answer = p3[i] ?? { matched: [], flaggedTrap: false };
    if (!ps.isTrap && answer.flaggedTrap) {
      push('trap_overflagged', '', `You flagged procedure ${i + 1} ("${proc.procedure}") as a trap, but it legitimately tests ${proc.tests.map((t) => ASSERTION_LABELS[t]).join(', ')}.`, `This procedure genuinely produces evidence for ${proc.tests.map((t) => ASSERTION_LABELS[t]).join(', ')}.`);
    }
    if (!ps.isTrap && ps.matchedWrong > 0) {
      const expected = new Set<AssertionId>(proc.tests);
      const wrong = (p3[i]?.matched ?? []).filter((m) => !expected.has(m));
      for (const w of wrong) {
        push('wrong_match', w, `Procedure ${i + 1} tests ${proc.tests.map((t) => ASSERTION_LABELS[t]).join(', ')}; you matched it to ${ASSERTION_LABELS[w]}.`, `"${proc.procedure}" produces evidence aimed at ${proc.tests.map((t) => ASSERTION_LABELS[t]).join(', ')}.`);
      }
    }
  });

  return mistakes;
}
