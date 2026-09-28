import { useMemo, useState } from 'react';
import type { Mistake } from '../mistakes';
import { mistakeKindLabel } from '../mistakes';
import type { AssertionId } from '../types';
import { ASSERTION_LABELS, ASSERTION_SHORT } from '../ui';
import { Icon } from '../components/Icon';

interface Props {
  mistakes: Mistake[];
  onHome: () => void;
  onClear: () => void;
}

const RELEVANT_KINDS = ['missed_relevant', 'extra_relevant'] as const;
const RISK_KINDS = ['missed_risk', 'extra_risk'] as const;


function primerFor(a: AssertionId): string {
  return PRIMER[a] ?? '';
}

const PRIMER: Partial<Record<AssertionId, string>> = {
  occurrence: 'A transactions assertion. Revenue is the classic target: ISA 240 presumes fictitious or premature revenue recognition as a fraud risk. Tested from the ledger toward evidence (invoice → shipping doc → customer).',
  completeness: 'The mirror of occurrence, and the hardest to test: the error is invisible in the ledger. Direction of testing matters — you must start outside the ledger (shipping docs, payroll records) and work toward it. Missing liabilities understate costs and inflate profit.',
  accuracy: 'The transaction was real but the number is wrong: pricing rules, discounts, VAT, currency conversion, estimates. Re-performance and re-calculation are the natural procedures.',
  cut_off: 'Period boundaries. December invoices dated January, January shipping dated December. Revenue and costs must land in the period they belong to; year-end windows concentrate this risk.',
  classification: 'Operating vs non-operating, revenue vs other income, capex vs repairs. Misclassification distorts ratios and neighboring lines even when totals are right.',
  existence: 'A balances assertion. Does the asset exist at the reporting date? Ghost inventory, stale receivables, empty bank accounts. Tested from the ledger toward evidence (count, confirm).',
  rights_and_obligations: 'Does the entity actually own it? Consignment stock, held-for-another goods, finance-leased assets, unfunded obligations. Ownership matters when control drives the accounting.',
  valuation_and_allocation: 'Is the carrying amount right? Impairment, NRV, depreciation, allowance for doubtful debts, estimates. Every judgment-based measurement lives here.',
  presentation_and_disclosure: 'Properly classified, described and disclosed in the notes. Accounting policies, related-party terms, contingencies — the statement plus its notes are one unit.',
};

const INTERACTIONS: { title: string; body: string }[] = [
  {
    title: 'Transactions flow into balances',
    body: 'A revenue transaction (occurrence, cut-off, accuracy) becomes a receivable balance (existence, valuation). A mistake at the transaction level does not stay there: a December sale recorded early overstates both revenue and receivables. When you judge a balance, ask which transaction stream feeds it and what its assertions were.',
  },
  {
    title: 'Two directions of testing',
    body: 'Occurrence and existence are tested from the ledger outward: pick a recorded item, find the evidence behind it. Completeness runs the opposite way: start from the evidence (shipping documents, unsigned invoices, unrecorded receipts) and check it made it into the ledger. Reversing the direction is the classic audit failure — the phase-3 traps in this game exploit exactly this.',
  },
  {
    title: 'Expenses and liabilities share an underside',
    body: 'Completeness of expenses and completeness of liabilities are the same risk wearing two hats: understatement. Overstating profit rarely requires inventing revenue — quietly dropping a liability does the same job. That is why unrecorded liabilities (unpaid invoices, accrued bonuses, unresolved disputes) are the highest-frequency real-world finding.',
  },
  {
    title: 'Valuation is where judgment accumulates',
    body: 'Estimates concentrate in valuation: allowances for doubtful debts, inventory NRV, impairment, accruals. Each estimate is a judgment, and each judgment is an opportunity for bias. When the context mentions estimates, management estimates, or provision changes, valuation is nearly always high risk.',
  },
  {
    title: 'Presentation spans everything',
    body: 'Presentation and disclosure is not a footnote assertion: a perfectly measured balance that sits in the wrong statement line, or a related-party sale presented as ordinary revenue, still misleads. It is relevant whenever the risk is about how something is described rather than how much it is.',
  },
];

export function MistakeReview({ mistakes, onHome, onClear }: Props) {
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [cleared, setCleared] = useState(false);
  const [showPrimer, setShowPrimer] = useState(false);

  const grouped = useMemo(() => {
    const byAssertion = new Map<string, Mistake[]>();
    for (const m of mistakes) {
      const key = m.assertion || m.kind;
      const list = byAssertion.get(key) ?? [];
      list.push(m);
      byAssertion.set(key, list);
    }
    return [...byAssertion.entries()].sort((a, b) => b[1].length - a[1].length);
  }, [mistakes]);

  const hotspots = useMemo(() => {
    const counts = new Map<AssertionId, number>();
    for (const m of mistakes) if (m.assertion) counts.set(m.assertion, (counts.get(m.assertion) ?? 0) + 1);
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 4);
  }, [mistakes]);

  const deck = mistakes;
  const current = deck.length > 0 ? deck[Math.min(index, deck.length - 1)] : null;

  const advance = (delta: number) => {
    setRevealed(false);
    setIndex((i) => Math.max(0, Math.min(deck.length - 1, i + delta)));
  };

  const phaseOf = (kind: Mistake['kind']) =>
    (RELEVANT_KINDS as readonly string[]).includes(kind) ? 'Phase 1' : (RISK_KINDS as readonly string[]).includes(kind) ? 'Phase 2' : 'Phase 3';

  if (mistakes.length === 0) {
    return (
      <div className="screen">
        <div className="card">
          <h2><Icon name="check" /> Mistake review</h2>
          <p className="muted">
            Nothing to review yet. Every assertion you misjudge — in any phase, in any session — is collected here as a drill card, so you can re-learn the logic before your next round.
          </p>
          <button className="btn btn-primary" onClick={onHome}>Back home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="screen mistake-review">
      <div className="career-head">
        <h2><Icon name="flag" /> Mistake review</h2>
        <button className="btn btn-ghost btn-small" onClick={onHome}>Home</button>
      </div>

      {hotspots.length > 0 && (
        <section className="card">
          <h3 className="group-label">Your hotspots</h3>
          <div className="chip-row">
            {hotspots.map(([a, n]) => (
              <span key={a} className="badge">{ASSERTION_SHORT[a]} × {n}</span>
            ))}
          </div>
        </section>
      )}

      <section className="card drill-card">
        <p className="eyebrow">Drill deck · card {Math.min(index + 1, deck.length)} of {deck.length}</p>
        {current && (
          <>
            <div className="brief-meta">
              <span className="badge badge-industry">{current.industry}</span>
              <span className="badge">{phaseOf(current.kind)}</span>
              <span className="badge badge-difficulty">{mistakeKindLabel(current.kind)}</span>
            </div>
            <h3 className="brief-line-item">{current.lineItem}</h3>
            <p className="muted">{current.detail}</p>
            {current.assertion && (
              <p className="muted small">Assertion: <strong>{ASSERTION_LABELS[current.assertion]}</strong></p>
            )}
            {!revealed ? (
              <button className="btn btn-primary" onClick={() => setRevealed(true)}>
                <Icon name="bulb" size={15} /> Why?
              </button>
            ) : (
              <div className="hint-box">
                <p className="hint-title"><Icon name="bulb" size={14} /> The logic</p>
                <p>{current.explanation}</p>
                {current.assertion && primerFor(current.assertion) && (
                  <p className="muted small">{primerFor(current.assertion)}</p>
                )}
              </div>
            )}
            <div className="drill-nav">
              <button className="btn btn-ghost btn-small" disabled={index === 0} onClick={() => advance(-1)}>← Previous</button>
              <button className="btn btn-ghost btn-small" disabled={index >= deck.length - 1} onClick={() => advance(1)}>Next →</button>
            </div>
          </>
        )}
      </section>

      <section className="card">
        <div className="career-head">
          <h3 className="group-label">Grouped by assertion</h3>
          <button className="btn btn-ghost btn-small" onClick={() => setShowPrimer((v) => !v)} aria-expanded={showPrimer}>
            {showPrimer ? 'Hide primer' : 'How assertions interact'}
          </button>
        </div>
        <ul className="mistake-list">
          {grouped.map(([key, list]) => (
            <li key={key}>
              <strong>{key && ASSERTION_LABELS[key as AssertionId] ? ASSERTION_LABELS[key as AssertionId] : mistakeKindLabel(list[0].kind)}</strong>
              <span className="muted small"> {list.length} mistake{list.length > 1 ? 's' : ''} · {mistakeKindLabel(list[0].kind)}</span>
            </li>
          ))}
        </ul>
        {showPrimer && (
          <div className="howto-body">
            {INTERACTIONS.map((it) => (
              <p key={it.title}>
                <strong>{it.title}.</strong> {it.body}
              </p>
            ))}
          </div>
        )}
      </section>

      <section className="card">
        {!cleared ? (
          <button className="btn btn-ghost btn-small" onClick={() => { onClear(); setCleared(true); }}>
            Clear mistake history
          </button>
        ) : (
          <p className="muted small">Mistake history cleared.</p>
        )}
      </section>
    </div>
  );
}
