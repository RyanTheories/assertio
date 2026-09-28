import raw from './scenarios.json';
import type { AssertionId, GameData, Scenario } from '../types';

export interface ValidationIssue {
  scenarioId?: string;
  check: string;
  message: string;
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

export function isAssertionId(x: unknown): x is AssertionId {
  return typeof x === 'string' && x in ASSERTION_LABELS;
}

export function taxonomyIds(data: { meta: { assertion_taxonomy: { transactions: unknown[]; balances: unknown[] } } }): Set<string> {
  return new Set([...data.meta.assertion_taxonomy.transactions, ...data.meta.assertion_taxonomy.balances] as string[]);
}

function validateScenario(sc: unknown, taxonomy: Set<string>, seenIds: Set<string>, issues: ValidationIssue[], index: number): sc is Scenario {
  const id = `scenario #${index + 1}`;
  if (typeof sc !== 'object' || sc === null) {
    issues.push({ check: 'shape', message: `${id}: not an object` });
    return false;
  }
  const s = sc as Record<string, unknown>;
  const sid = typeof s.id === 'string' ? s.id : id;

  const required: Array<[string, unknown]> = [
    ['id', s.id],
    ['line_item', s.line_item],
    ['statement', s.statement],
    ['industry', s.industry],
    ['client_context', s.client_context],
    ['assertions_relevant', s.assertions_relevant],
    ['assertions_high_risk', s.assertions_high_risk],
    ['procedures', s.procedures],
    ['difficulty', s.difficulty],
  ];
  for (const [field, value] of required) {
    if (value === undefined || value === null || value === '') {
      issues.push({ scenarioId: sid, check: 'missing_field', message: `${sid}: missing required field "${field}"` });
    }
  }
  if (typeof s.id === 'string') {
    if (seenIds.has(s.id)) {
      issues.push({ scenarioId: s.id, check: 'unique_ids', message: `duplicate scenario id "${s.id}"` });
    }
    seenIds.add(s.id);
  }
  if (Array.isArray(s.assertions_relevant)) {
    for (const a of s.assertions_relevant) {
      if (!taxonomy.has(a as string)) {
        issues.push({ scenarioId: sid, check: 'taxonomy', message: `${sid}: assertions_relevant value "${String(a)}" is not in the assertion taxonomy` });
      }
    }
  }
  const relevantSet = new Set((Array.isArray(s.assertions_relevant) ? s.assertions_relevant : []) as string[]);
  if (typeof s.why_relevant === 'object' && s.why_relevant !== null) {
    for (const key of Object.keys(s.why_relevant as Record<string, unknown>)) {
      if (!relevantSet.has(key)) {
        issues.push({ scenarioId: sid, check: 'subset', message: `${sid}: why_relevant key "${key}" is not in assertions_relevant` });
      }
      const text = (s.why_relevant as Record<string, unknown>)[key];
      if (typeof text !== 'string' || text.trim() === '') {
        issues.push({ scenarioId: sid, check: 'missing_field', message: `${sid}: why_relevant["${key}"] must be non-empty text` });
      }
    }
  }
  if (typeof s.assertions_high_risk === 'object' && s.assertions_high_risk !== null) {
    for (const key of Object.keys(s.assertions_high_risk as Record<string, unknown>)) {
      if (!taxonomy.has(key)) {
        issues.push({ scenarioId: sid, check: 'taxonomy', message: `${sid}: assertions_high_risk key "${key}" is not in the assertion taxonomy` });
      }
      if (!relevantSet.has(key)) {
        issues.push({ scenarioId: sid, check: 'subset', message: `${sid}: assertions_high_risk key "${key}" is not in assertions_relevant` });
      }
    }
  }
  if (Array.isArray(s.procedures)) {
    s.procedures.forEach((p, pi) => {
      if (typeof p !== 'object' || p === null) {
        issues.push({ scenarioId: sid, check: 'shape', message: `${sid}: procedure #${pi + 1} is not an object` });
        return;
      }
      const proc = p as Record<string, unknown>;
      if (typeof proc.procedure !== 'string' || proc.procedure === '') {
        issues.push({ scenarioId: sid, check: 'missing_field', message: `${sid}: procedure #${pi + 1} missing "procedure" text` });
      }
      if (!Array.isArray(proc.tests)) {
        issues.push({ scenarioId: sid, check: 'missing_field', message: `${sid}: procedure #${pi + 1} missing "tests" array` });
      } else {
        for (const t of proc.tests) {
          if (!taxonomy.has(t as string)) {
            issues.push({ scenarioId: sid, check: 'taxonomy', message: `${sid}: procedure #${pi + 1} tests value "${String(t)}" is not in the taxonomy` });
          }
        }
      }
      if (proc.trap === true) {
        if (typeof proc.trap_explanation !== 'string' || proc.trap_explanation === '') {
          issues.push({ scenarioId: sid, check: 'trap_explanation', message: `${sid}: trap procedure #${pi + 1} ("${String(proc.procedure).slice(0, 60)}…") lacks trap_explanation` });
        }
      }
    });
  }
  return issues.length === 0;
}

export function validateGameData(input: unknown): { data: GameData | null; issues: ValidationIssue[] } {
  const issues: ValidationIssue[] = [];
  if (typeof input !== 'object' || input === null) {
    return { data: null, issues: [{ check: 'shape', message: 'scenarios.json: root is not an object' }] };
  }
  const d = input as Record<string, unknown>;
  if (typeof d.meta !== 'object' || d.meta === null || typeof (d.meta as Record<string, unknown>).assertion_taxonomy !== 'object') {
    issues.push({ check: 'shape', message: 'scenarios.json: missing meta.assertion_taxonomy' });
    return { data: null, issues };
  }
  const meta = d.meta as GameData['meta'];
  const taxonomy = taxonomyIds({ meta });
  for (const a of [...meta.assertion_taxonomy.transactions, ...meta.assertion_taxonomy.balances]) {
    if (!isAssertionId(a)) {
      issues.push({ check: 'taxonomy', message: `meta: taxonomy value "${String(a)}" is not a known assertion id` });
    }
  }
  if (!Array.isArray(d.scenarios) || d.scenarios.length === 0) {
    issues.push({ check: 'shape', message: 'scenarios.json: "scenarios" is missing or empty' });
    return { data: null, issues };
  }
  const seenIds = new Set<string>();
  d.scenarios.forEach((sc, i) => validateScenario(sc, taxonomy, seenIds, issues, i));
  if (issues.length > 0) return { data: null, issues };
  return { data: { meta, scenarios: d.scenarios as Scenario[] }, issues: [] };
}

let cached: { data: GameData | null; issues: ValidationIssue[] } | null = null;

export function loadGameData(): { data: GameData | null; issues: ValidationIssue[] } {
  if (!cached) cached = validateGameData(raw);
  return cached;
}

export function getGameData(): GameData {
  const { data, issues } = loadGameData();
  if (!data) {
    throw new Error(`scenarios.json failed validation (${issues.length} issue${issues.length === 1 ? '' : 's'})`);
  }
  return data;
}

export function statementLabel(st: string): string {
  switch (st) {
    case 'SoPL':
    case 'income_statement':
      return 'Income statement';
    case 'SoFP':
    case 'balance_sheet':
      return 'Balance sheet';
    case 'disclosures':
      return 'Disclosures';
    default:
      return st;
  }
}

export function statementGroup(st: string): 'income_statement' | 'balance_sheet' | 'disclosures' {
  switch (st) {
    case 'SoPL':
    case 'income_statement':
      return 'income_statement';
    case 'SoFP':
    case 'balance_sheet':
      return 'balance_sheet';
    default:
      return 'disclosures';
  }
}
