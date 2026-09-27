import { ASSERTION_SHORT } from '../ui';

interface GuideEntry {
  name: string;
  short: string;
  explanation: string;
  example: string;
}

const GUIDE: Record<'transactions' | 'balances', GuideEntry[]> = {
  transactions: [
    {
      name: 'Occurrence',
      short: ASSERTION_SHORT.occurrence,
      explanation:
        'Transactions and events that have been recorded actually happened and pertain to the entity. Nothing recorded should be fictitious — no sales to fake customers, no expenses the business never incurred.',
      example:
        'The ledger shows a €50,000 sale to customer Marta Ltd in December. Occurrence asks: did this sale really take place, to a real customer, and was it genuinely this entity that made it?',
    },
    {
      name: 'Completeness',
      short: ASSERTION_SHORT.completeness,
      explanation:
        'All transactions and events that should have been recorded have been recorded. It is the mirror of occurrence: instead of guarding against things that should not be there, it guards against things that are missing.',
      example:
        'The company paid 40 suppliers this year but only 38 appear in the purchase ledger. Two genuine expenses were never recorded — a completeness error that understates costs and overstates profit.',
    },
    {
      name: 'Accuracy',
      short: ASSERTION_SHORT.accuracy,
      explanation:
        'Transactions and events have been recorded at the correct amounts, and any related calculations ( VAT, discounts, accruals ) are processed correctly. The event was real — but is the number attached to it right?',
      example:
        'A sale of 1,200 units at €9.90 each is booked as €12,000 — a slip of one digit. The sale occurred, but the recorded amount is wrong, so accuracy fails.',
    },
    {
      name: 'Cut-off',
      short: ASSERTION_SHORT.cut_off,
      explanation:
        'Transactions and events have been recorded in the correct accounting period. This matters most around year-end, when there is every incentive to push costs into last year or pull revenue into this one.',
      example:
        'An invoice dated 3 January for goods delivered 28 December is recorded in January. The revenue belongs in December — recording it in January is a cut-off error.',
    },
    {
      name: 'Classification',
      short: ASSERTION_SHORT.classification,
      explanation:
        'Transactions and events have been recorded in the proper accounts. The amount is right and the period is right — but it sits in the wrong line item, which can mislead users of the accounts.',
      example:
        'The cost of a delivery van ( an asset ) is recorded in repairs and maintenance ( an expense ). The amount is correct, the period is correct — but the classification overstates expenses and understates assets.',
    },
  ],
  balances: [
    {
      name: 'Existence',
      short: ASSERTION_SHORT.existence,
      explanation:
        'Assets, liabilities and equity interests actually exist at the reporting date. It is the balance-sheet twin of occurrence: are the things on the statement really there, or are they ghosts, duplicates or dead stock?',
      example:
        'The inventory listing shows 5,000 washing machines in the warehouse. Existence asks: are those machines physically there — or are they obsolete units, double-counted, or simply not there at all?',
    },
    {
      name: 'Completeness',
      short: ASSERTION_SHORT.completeness,
      explanation:
        'All assets, liabilities and equity interests that should be recorded have been recorded. For balances the danger is usually hidden liabilities — the lawsuit, the unbilled supplier, the guarantee nobody wrote down.',
      example:
        'A supplier sued the company in October, and lawyers say a loss is probable — but no provision appears anywhere in the liabilities section. That is a missing liability: a completeness failure.',
    },
    {
      name: 'Rights & obligations',
      short: ASSERTION_SHORT.rights_and_obligations,
      explanation:
        'The entity holds or controls the rights to its assets, and its liabilities are genuinely its obligations. Something can be physically present and still not belong to the client.',
      example:
        'A machine on the client\'s factory floor is actually leased, and the lease contract says the lessor keeps title. The machine exists, but the client does not own it — rights and obligations fails.',
    },
    {
      name: 'Valuation & allocation',
      short: ASSERTION_SHORT.valuation_and_allocation,
      explanation:
        'Assets, liabilities and equity are recorded at appropriate carrying amounts, and valuation or allocation adjustments ( depreciation, impairment, provisions ) are recorded correctly.',
      example:
        'Receivables include a €200,000 balance from a customer who went bankrupt in November, still shown at full value with no allowance. The receivable exists and is owed — but it is carried at the wrong amount.',
    },
    {
      name: 'Presentation & disclosure',
      short: ASSERTION_SHORT.presentation_and_disclosure,
      explanation:
        'Components of the financial statements are properly classified, described and disclosed. The numbers may all be right — but are they in the right section, labelled clearly, with the notes a reader needs?',
      example:
        'Current and non-current portions of a large loan are shown as one lump sum with no breakdown and no note explaining repayment terms — a presentation and disclosure problem.',
    },
  ],
};

const STANDARDS: { label: string; href: string; note: string }[] = [
  {
    label: 'ISA 315 (Revised 2019) — Identifying and Assessing Risks of Material Misstatement',
    href: 'https://www.iaasb.org/standards-practice-notes/isa-315-revised-2019-identifying-and-assessing-risks-material-misstatement',
    note: 'The standard that defines these assertions and requires auditors to assess risk at the assertion level.',
  },
  {
    label: 'ISA 330 — The Auditor\'s Responses to Assessed Risks',
    href: 'https://www.iaasb.org/standards-practice-notes/isa-330-auditors-responses-assessed-risks',
    note: 'How the auditor designs procedures that target the assertions where risk is highest.',
  },
  {
    label: 'IFAC — International Standards on Auditing overview',
    href: 'https://www.ifac.org/about-ifac/role-ifac/international-standards-setting',
    note: 'Free downloads of all ISAs from the IAASB, hosted by IFAC.',
  },
  {
    label: 'IAS 1 — Presentation of Financial Statements',
    href: 'https://www.ifrs.org/issued-standards/list-of-standards/ias-1-presentation-of-financial-statements/',
    note: 'The IFRS standard governing how line items are presented, classified and disclosed in the statements themselves.',
  },
];

export function AssertionsGuide({ onHome }: { onHome: () => void }) {
  return (
    <div className="screen guide">
      <header className="hero">
        <p className="eyebrow">Reference</p>
        <h1>What are assertions?</h1>
        <p className="guide-intro">
          Assertions are the implicit claims a set of financial statements makes about each line item —
          that it happened, that nothing is missing, that the amount is right. Auditors use them as a
          checklist of ways a line item can be wrong, and target their procedures at the assertions
          where the risk of error is highest. Assertio trains exactly this skill.
        </p>
      </header>

      {(['transactions', 'balances'] as const).map((group) => (
        <section key={group} className="card guide-section">
          <h2 className="guide-group-label">
            {group === 'transactions' ? 'Transactions & events' : 'Account balances'}
          </h2>
          <div className="guide-grid">
            {GUIDE[group].map((entry) => (
              <article key={entry.name} className="guide-card">
                <h3>{entry.name}</h3>
                <p className="guide-sub">{entry.short}</p>
                <p>{entry.explanation}</p>
                <div className="guide-example">
                  <span className="guide-example-label">Example</span>
                  {entry.example}
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}

      <section className="card guide-section">
        <h2 className="guide-group-label">Relevant standards & further reading</h2>
        <ul className="guide-std-list">
          {STANDARDS.map((s) => (
            <li key={s.href}>
              <a href={s.href} target="_blank" rel="noreferrer">{s.label}</a>
              <span className="muted small"> — {s.note}</span>
            </li>
          ))}
        </ul>
        <p className="guide-std-note">
          Assertio follows the assertion vocabulary of ISA 315 (Revised 2019). Terminology in practice
          materials may vary slightly between jurisdictions and firms.
        </p>
      </section>

      <div className="phase-actions">
        <button className="btn btn-ghost" onClick={onHome}>Back to home</button>
      </div>
    </div>
  );
}

