import type { AssertionId } from './types';
import { ASSERTION_LABELS } from './ui';

/**
 * Generic ISA 315 reasoning: why each assertion tends to apply (or not)
 * to a line item, by statement kind. Used to teach the logic behind the
 * answer, scenario by scenario.
 */

type Group = 'transactions' | 'balances';

const TRANSACTIONS: AssertionId[] = ['occurrence', 'completeness', 'accuracy', 'cut_off', 'classification'];
const groupOf = (a: AssertionId): Group => (TRANSACTIONS.includes(a) ? 'transactions' : 'balances');

interface Reasoning {
  /** why this assertion generally applies to items of this kind */
  applies: (item: string) => string;
  /** why this assertion generally does not apply to items of this kind */
  notApplies?: (item: string) => string;
}

const WHY: Record<AssertionId, Reasoning> = {
  occurrence: {
    applies: (item) => `Recorded ${item} transactions must genuinely have happened and pertain to the entity. Any transaction-based line is exposed to fictitious or premature entries, so occurrence is always in scope.`,
    notApplies: () => `Occurrence is a transactions assertion; it speaks to whether recorded entries really happened, which is not what this balance is about.`,
  },
  completeness: {
    applies: (item) => `Everything that should be recorded about ${item} must be recorded. Omissions are the classic audit risk for any item fed by many sources or manual journals.`,
    notApplies: () => `Completeness here would belong to the transaction stream feeding the balance, not to the balance itself.`,
  },
  accuracy: {
    applies: (item) => `Amounts for ${item} must be recorded at the correct value: quantities, prices, calculations and clerical accuracy. Any arithmetically derived item is exposed here.`,
  },
  cut_off: {
    applies: (item) => `Transactions for ${item} must land in the correct period. Period boundaries concentrate risk, especially where documents are dated close to year-end.`,
    notApplies: () => `Cut-off guards the period boundary of transactions; this item is not driven by a period-boundary timing question.`,
  },
  classification: {
    applies: (item) => `Entries for ${item} must be recorded in the proper accounts. Misclassification (e.g. operating items in non-operating accounts) distorts both the item and its neighbors.`,
    notApplies: () => `The classification of this item is prescribed and not open to misposting in a way the audit needs to test.`,
  },
  existence: {
    applies: (item) => `The ${item} balance must represent assets or liabilities that actually exist at the reporting date. Overstated ledgers, ghost assets or unfunded liabilities all strike here.`,
    notApplies: () => `Existence asks whether a balance is real; a flow measured over a period is tested through its transactions instead.`,
  },
  rights_and_obligations: {
    applies: (item) => `The entity must own or control the ${item} balance, and obligations must belong to it. Financing structures, consignment stock and held-for-another arrangements attack this assertion.`,
    notApplies: () => `Rights and obligations attach to balances; they say nothing about transaction flows like this one.`,
  },
  valuation_and_allocation: {
    applies: (item) => `The ${item} balance must be carried at an appropriate amount: impairment, measurement models, estimates and allocations. Any balance using judgment in measurement is exposed.`,
    notApplies: () => `Valuation concerns the carrying amount of balances; this line is not carried at a measured amount open to re-estimation.`,
  },
  presentation_and_disclosure: {
    applies: (item) => `${item} must be properly classified, described and disclosed. Notes, classifications within the statement and accounting policy description all fall under this assertion.`,
  },
};

export function whyRelevant(a: AssertionId, lineItem: string): string {
  return WHY[a]?.applies(lineItem.toLowerCase()) ?? `${ASSERTION_LABELS[a]} applies given the nature of ${lineItem}.`;
}

export function whyNotRelevant(a: AssertionId, lineItem: string): string {
  const w = WHY[a];
  if (w?.notApplies) return w.notApplies(lineItem.toLowerCase());
  const g = groupOf(a);
  return `${ASSERTION_LABELS[a]} is a ${g === 'transactions' ? 'transactions' : 'balances'} assertion and does not fit how ${lineItem} is audited; a different assertion covers the risk it names.`;
}

export function whyNotHighRisk(a: AssertionId): string {
  return `${ASSERTION_LABELS[a]} stays relevant but nothing in this engagement brief raises its risk above normal: the context gives no incentive, opportunity or complexity aimed at it. Ordinary procedures already cover it.`;
}

export function whyProcedureTests(a: AssertionId, lineItem: string): string {
  const g = groupOf(a);
  const base = whyRelevant(a, lineItem);
  return `${base.slice(0, -1)} — and this procedure produces evidence aimed exactly at that question (${g} assertion).`;
}

export { groupOf };
