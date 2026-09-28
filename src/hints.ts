import type { AssertionId, Scenario } from './types';
import { ASSERTION_LABELS } from './ui';

/**
 * Nudges that point the player in the right direction without giving
 * the answer away. One hint per phase; each costs POINTS.HINT_COST.
 */
export function relevantHint(scenario: Scenario): string {
  const n = scenario.assertions_relevant.length;
  const groups = new Set(
    scenario.assertions_relevant.map((a) =>
      (['occurrence', 'completeness', 'accuracy', 'cut_off', 'classification'] as AssertionId[]).includes(a)
        ? 'transactions & events'
        : 'account balances'
    )
  );
  const groupText = [...groups].join(' and ');
  const statementKind =
    scenario.statement === 'SoPL' || scenario.statement === 'income_statement'
      ? 'an income statement line'
      : scenario.statement === 'SoFP' || scenario.statement === 'balance_sheet'
        ? 'a balance sheet item'
        : 'a disclosure';
  return `${n} assertion${n === 1 ? ' is' : 's are'} relevant, drawn from ${groupText}. As ${statementKind}, start from what could go wrong with this kind of item.`;
}

export function riskHint(scenario: Scenario): string {
  const n = Object.keys(scenario.assertions_high_risk).length;
  const risks = Object.values(scenario.assertions_high_risk);
  const keyword = risks[0]?.split(' ').slice(0, 3).join(' ');
  return `${n} assertion${n === 1 ? ' is' : 's are'} high risk given the engagement brief. The brief's strongest signal starts along the lines of "${keyword}…" — reread the client context with that in mind.`;
}

export function proceduresHint(scenario: Scenario): string {
  const traps = scenario.procedures.filter((p) => p.trap).length;
  return `${traps === 1 ? 'Exactly one procedure' : `${traps} procedures`} here ${traps === 1 ? 'is a trap' : 'are traps'}: it looks reasonable but tests the wrong assertion for this risk. Check each procedure against the risk it is supposed to address, not against how plausible it sounds.`;
}

export function hintFor(phase: 'relevant' | 'risk' | 'procedures', scenario: Scenario): string {
  if (phase === 'relevant') return relevantHint(scenario);
  if (phase === 'risk') return riskHint(scenario);
  return proceduresHint(scenario);
}

export { ASSERTION_LABELS };
