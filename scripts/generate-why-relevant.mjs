/**
 * One-off generator: composes scenario-specific why_relevant explanations
 * for every scenario in src/data/scenarios.json, anchored to each
 * scenario's line item, statement kind and client context.
 *
 * Run: node scripts/generate-why-relevant.mjs
 * Idempotent: only fills scenarios missing why_relevant entries.
 */
import { readFileSync, writeFileSync } from 'node:fs';

const path = new URL('../src/data/scenarios.json', import.meta.url).pathname;
const data = JSON.parse(readFileSync(path, 'utf8'));

const isFlow = (s) => s.statement === 'SoPL' || s.statement === 'income_statement';

/** Pull salient fragments from the client context for anchoring. */
function contextSignals(sc) {
  const ctx = sc.client_context;
  const signals = [];
  if (/bonus|incentive|target|commission/i.test(ctx)) signals.push('management incentives in the brief');
  if (/new (system|channel|platform|product|market|site| ERP|crm)/i.test(ctx)) signals.push('the new rollout in the brief');
  if (/manual|spreadsheet|journal/i.test(ctx)) signals.push('manual handling');
  if (/growth|expand|acqui|restructur|disposal/i.test(ctx)) signals.push('the structural change in the brief');
  if (/estimate|provision|impair|fair value|valuation model/i.test(ctx)) signals.push('the estimation judgments involved');
  if (/related part|director|shareholder|family/i.test(ctx)) signals.push('the related-party exposure');
  if (/currency|FX|overseas|multi-countr/i.test(ctx)) signals.push('the cross-border activity');
  return signals;
}

const writers = {
  occurrence: (sc, sig) =>
    isFlow(sc)
      ? `Every ${sc.line_item.toLowerCase()} entry must represent a real transaction with this ${sc.industry} client${sig.length ? ` — and ${sig[0]} raises the stakes for fictitious or premature booking` : ''}.`
      : `${sc.line_item} must arise from genuine activity${sig.length ? `, and ${sig[0]} means the audit cannot take the ledger at face value` : ''}; occurrence discipline underpins the balance's integrity.`,
  completeness: (sc, sig) =>
    isFlow(sc)
      ? `Omitted ${sc.line_item.toLowerCase()} entries would understate this line${sig.length ? `, and ${sig.join(' and ')} makes missing items plausible rather than theoretical` : ''}.`
      : `Anything left off the ${sc.line_item} balance is invisible to users${sig.length ? ` — ${sig[0]} makes that a live risk here` : ''}.`,
  accuracy: (sc, sig) =>
    `Amounts in ${sc.line_item.toLowerCase()} must be arithmetically and factually right${sig.length ? `, and ${sig[0]} introduces calculation complexity that invites errors` : ''}.`,
  cut_off: (sc, sig) =>
    `${sc.line_item} entries must land in the period they belong to${sig.length ? `; ${sig[0]} concentrates activity near the boundary` : ', especially for transactions dated around the reporting date'}.`,
  classification: (sc, sig) =>
    `${sc.line_item} entries must sit in the proper accounts${sig.length ? `, and ${sig[0]} increases the chance of misposting between categories` : ''}.`,
  existence: (sc, sig) =>
    `The ${sc.line_item} balance must exist at the reporting date${sig.length ? ` — ${sig[0]} means recorded amounts need outside corroboration` : ''}.`,
  rights_and_obligations: (sc, sig) =>
    `This ${sc.industry} client must own or control what sits in ${sc.line_item.toLowerCase()}${sig.length ? `, and ${sig[0]} complicates who holds what` : ''}.`,
  valuation_and_allocation: (sc, sig) =>
    `${sc.line_item} must be carried at an appropriate amount${sig.length ? ` — ${sig[0]} directly attacks the measurement basis` : ' — measurement assumptions drive the balance'}.`,
  presentation_and_disclosure: (sc, sig) =>
    `${sc.line_item} must be properly described and disclosed${sig.length ? `, and ${sig[0]} has disclosure consequences the notes must capture` : ''}.`,
};

let filled = 0;
for (const sc of data.scenarios) {
  sc.why_relevant = sc.why_relevant ?? {};
  const sig = contextSignals(sc);
  for (const a of sc.assertions_relevant) {
    if (!sc.why_relevant[a]) {
      sc.why_relevant[a] = (writers[a] ?? ((s) => `${a} applies to ${s.line_item}.`))(sc, sig);
      filled++;
    }
  }
  // preserve key order matching assertions_relevant
  const ordered = {};
  for (const a of sc.assertions_relevant) ordered[a] = sc.why_relevant[a];
  sc.why_relevant = ordered;
}

writeFileSync(path, JSON.stringify(data, null, 2) + '\n');
console.log(`Filled ${filled} explanations across ${data.scenarios.length} scenarios.`);
