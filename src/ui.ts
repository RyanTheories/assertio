import type { AssertionId } from './types';

/** One-line ISA 315 vocabulary shown next to each assertion. */
export const ASSERTION_SHORT: Record<AssertionId, string> = {
  occurrence: 'Transactions occurred and pertain to the entity',
  completeness: 'Everything that should be recorded is recorded',
  accuracy: 'Amounts and data are recorded correctly',
  cut_off: 'Recorded in the correct period',
  classification: 'Recorded in the proper accounts',
  existence: 'Assets / liabilities exist',
  rights_and_obligations: 'Entity owns or controls its assets',
  valuation_and_allocation: 'Carried at appropriate amounts',
  presentation_and_disclosure: 'Properly classified, described and disclosed',
};

/** Display order: transactions group first, then balances. */
export const TAXONOMY_ORDER: Record<'transactions' | 'balances', AssertionId[]> = {
  transactions: ['occurrence', 'completeness', 'accuracy', 'cut_off', 'classification'],
  balances: ['existence', 'completeness', 'rights_and_obligations', 'valuation_and_allocation', 'presentation_and_disclosure'],
};

export function allAssertionIds(): AssertionId[] {
  return [...TAXONOMY_ORDER.transactions, ...TAXONOMY_ORDER.balances];
}

export const ASSERTION_LABELS: Record<AssertionId, string> = {
  occurrence: 'Occurrence',
  completeness: 'Completeness',
  accuracy: 'Accuracy',
  cut_off: 'Cut-off',
  classification: 'Classification',
  existence: 'Existence',
  rights_and_obligations: 'Rights & obligations',
  valuation_and_allocation: 'Valuation & allocation',
  presentation_and_disclosure: 'Presentation & disclosure',
};

export function numberKeyFor(i: number): string {
  return i === 9 ? '0' : String(i + 1);
}
