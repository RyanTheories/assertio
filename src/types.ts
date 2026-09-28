export type AssertionId =
  | 'occurrence'
  | 'completeness'
  | 'accuracy'
  | 'cut_off'
  | 'classification'
  | 'existence'
  | 'rights_and_obligations'
  | 'valuation_and_allocation'
  | 'presentation_and_disclosure';

export interface AssertionTaxonomy {
  transactions: AssertionId[];
  balances: AssertionId[];
}

export interface GameMeta {
  name: string;
  description: string;
  version: string;
  assertion_taxonomy: AssertionTaxonomy;
  gameplay?: string;
  fields?: Record<string, string>;
}

export interface Procedure {
  procedure: string;
  /** Assertions this procedure nominally tests. Ignored when trap is true. */
  tests: AssertionId[];
  trap: boolean;
  trap_explanation?: string;
  isa_ref?: string;
}

export type StatementId = 'SoPL' | 'SoFP' | 'balance_sheet' | 'income_statement' | 'disclosures';

export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export interface Scenario {
  id: string;
  line_item: string;
  statement: StatementId;
  industry: string;
  client_context: string;
  assertions_relevant: AssertionId[];
  /** assertion -> why it is relevant to this line item (scenario-specific). Optional; UI falls back to generic reasoning. */
  why_relevant?: Partial<Record<AssertionId, string>>;
  /** assertion -> reason the client context makes it risky */
  assertions_high_risk: Partial<Record<AssertionId, string>>;
  procedures: Procedure[];
  isa_refs?: string[];
  difficulty: Difficulty;
}

export interface GameData {
  meta: GameMeta;
  scenarios: Scenario[];
}
