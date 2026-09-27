import { describe, expect, it } from 'vitest';
import { statementGroup, statementLabel, validateGameData } from '../data/validate';

const validScenario = {
  id: 'rev-001',
  line_item: 'Revenue',
  statement: 'SoPL',
  industry: 'retail',
  client_context: 'context',
  assertions_relevant: ['occurrence', 'completeness'],
  assertions_high_risk: { occurrence: 'bonus pressure' },
  procedures: [
    { procedure: 'Vouch invoices', tests: ['occurrence'], trap: false, isa_ref: 'ISA 500' },
    { procedure: 'Confirm balances', tests: ['existence'], trap: true, trap_explanation: 'wrong assertion', isa_ref: 'ISA 505' },
  ],
  isa_refs: ['ISA 315'],
  difficulty: 'beginner',
};

const clone = <T,>(x: T): T => JSON.parse(JSON.stringify(x));

const validData = (): unknown => ({
  meta: {
    name: 'test',
    description: 'test',
    version: '1.0',
    assertion_taxonomy: {
      transactions: ['occurrence', 'completeness', 'accuracy', 'cut_off', 'classification'],
      balances: ['existence', 'completeness', 'rights_and_obligations', 'valuation_and_allocation', 'presentation_and_disclosure'],
    },
  },
  scenarios: [clone(validScenario), { ...clone(validScenario), id: 'rev-002' }],
});

describe('validateGameData (happy path)', () => {
  it('accepts valid data', () => {
    const { data, issues } = validateGameData(validData());
    expect(issues).toEqual([]);
    expect(data).not.toBeNull();
    expect(data?.scenarios).toHaveLength(2);
  });

  it('accepts the bundled scenarios.json', async () => {
    const raw = (await import('../data/scenarios.json')).default;
    const { data, issues } = validateGameData(raw);
    expect(issues).toEqual([]);
    expect(data?.scenarios.length).toBeGreaterThan(0);
  });
});

describe('validateGameData (failures)', () => {
  it('fails loudly on missing required fields', () => {
    const broken = validData() as { scenarios: Array<Record<string, unknown>> };
    delete broken.scenarios[0].client_context;
    const { issues } = validateGameData(broken);
    expect(issues.some((i) => i.check === 'missing_field' && i.message.includes('client_context'))).toBe(true);
  });

  it('rejects taxonomy violations in assertions_relevant and tests', () => {
    const broken = validData() as { scenarios: Array<Record<string, unknown>> };
    broken.scenarios[0].assertions_relevant = ['occurrence', 'not_an_assertion'];
    broken.scenarios[0].procedures = [{ procedure: 'X', tests: ['also_fake'], trap: false }];
    const { issues } = validateGameData(broken);
    expect(issues.some((i) => i.check === 'taxonomy' && i.message.includes('not_an_assertion'))).toBe(true);
    expect(issues.some((i) => i.check === 'taxonomy' && i.message.includes('also_fake'))).toBe(true);
  });

  it('rejects high-risk keys outside assertions_relevant', () => {
    const broken = validData() as { scenarios: Array<Record<string, unknown>> };
    broken.scenarios[0].assertions_relevant = ['completeness'];
    const { issues } = validateGameData(broken);
    expect(issues.some((i) => i.check === 'subset' && i.message.includes('occurrence'))).toBe(true);
  });

  it('accepts a high-risk key that IS in assertions_relevant', () => {
    const ok = validData();
    const { issues } = validateGameData(ok);
    expect(issues.some((i) => i.check === 'subset')).toBe(false);
  });

  it('rejects trap procedures lacking trap_explanation', () => {
    const broken = validData() as { scenarios: Array<Record<string, unknown>> };
    broken.scenarios[0].procedures = [{ procedure: 'Suspicious', tests: [], trap: true }];
    const { issues } = validateGameData(broken);
    expect(issues.some((i) => i.check === 'trap_explanation')).toBe(true);
  });

  it('rejects duplicate scenario ids', () => {
    const broken = validData();
    const { issues } = validateGameData(broken);
    const dup = validData() as { scenarios: Array<Record<string, unknown>> };
    dup.scenarios[1].id = dup.scenarios[0].id;
    const { issues: dupIssues } = validateGameData(dup);
    expect(dupIssues.some((i) => i.check === 'unique_ids')).toBe(true);
    expect(issues.every((i) => i.check !== 'unique_ids')).toBe(true);
  });

  it('rejects a non-object root and empty scenario arrays', () => {
    expect(validateGameData(null).data).toBeNull();
    const noScenarios = validData() as Record<string, unknown>;
    noScenarios.scenarios = [];
    expect(validateGameData(noScenarios).issues[0].check).toBe('shape');
    const noMeta = validData() as Record<string, unknown>;
    delete noMeta.meta;
    expect(validateGameData(noMeta).issues[0].check).toBe('shape');
  });
});

describe('statement helpers', () => {
  it('normalises the mixed statement vocabulary', () => {
    expect(statementLabel('SoPL')).toBe('Income statement');
    expect(statementLabel('income_statement')).toBe('Income statement');
    expect(statementLabel('SoFP')).toBe('Balance sheet');
    expect(statementLabel('balance_sheet')).toBe('Balance sheet');
    expect(statementGroup('SoFP')).toBe('balance_sheet');
    expect(statementGroup('income_statement')).toBe('income_statement');
  });
});
