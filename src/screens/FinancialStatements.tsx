const STATEMENTS: { name: string; question: string; body: string; audit: string }[] = [
  {
    name: 'The income statement',
    question: 'Did the company make a profit, and how?',
    body: 'Summarises revenue, expenses and the resulting profit or loss for a period. It is a moving picture: it starts at zero each year and accumulates everything the business did between two dates. Under accrual accounting, revenue and expenses appear when earned and incurred, not when cash moves.',
    audit: 'Where the pressure to perform lives. Revenue recognition is the presumed fraud risk under ISA 240, and most earnings management lands here: aggressive cut-off, misclassification between revenue and other income, costs deferred into assets. Assertions on transactions dominate: occurrence, completeness, accuracy, cut-off and classification.',
  },
  {
    name: 'The balance sheet (statement of financial position)',
    question: 'What does the company own and owe right now?',
    body: 'A snapshot at a single date: assets, liabilities and equity. The balances are the cumulative result of every transaction since the company began. Because assets must equal liabilities plus equity, a misstatement anywhere has to be offset somewhere else, which is why auditors trace both sides of any adjustment.',
    audit: 'Where hidden problems live. Missing liabilities, overstated assets, wrong valuations and undisclosed obligations all sit here. Assertions on balances dominate: existence, completeness, rights and obligations, valuation and allocation.',
  },
  {
    name: 'The cash flow statement',
    question: 'Where did the cash actually go?',
    body: 'Traces cash in and out across three activities: operating, investing and financing. Unlike the income statement, it is largely free of estimates and accruals, which is precisely why analysts trust it. A company can report profit for years while bleeding cash, and this statement is where that shows first.',
    audit: 'The auditor reconciles it to bank movements, not to profit. Weak cash generation against reported profit is a classic indicator of aggressive accruals or fictitious revenue. The operating section is also the natural home for classification questions, such as interest paid or proceeds dressed as operating flows.',
  },
  {
    name: 'The statement of changes in equity',
    question: 'What moved in the owners\u2019 stake?',
    body: 'Reconciles opening and closing equity: profit for the period, dividends, share issues and repurchases, and revaluations or other movements in reserves. It connects the income statement to the balance sheet and explains why retained earnings changed by more (or less) than profit.',
    audit: 'Completeness of movements is the key risk: bonuses paid as equity, dividends declared but not recorded, or reserves shuffled without justification. Rights and obligations also matter for share capital itself, and the statement is a favourite hiding place for owner withdrawals in owner-managed businesses.',
  },
  {
    name: 'The notes',
    question: 'What do the numbers actually mean?',
    body: 'The narrative part of the statements, required by IAS 1 and the individual standards. They break down the one-line totals, state the accounting policies and judgements used, and disclose commitments, contingencies and related parties. Many users of accounts read the notes before anything else.',
    audit: 'The auditor reads them as an investor would: could a reasonable user find and understand what matters? Presentation and disclosure is the assertion here, and it is where information gets buried. A guarantee technically disclosed on page 90, or a material item inside \u2018other operating expenses\u2019, is a presentation failure even when every number is right.',
  },
];

const HOW: { title: string; body: string }[] = [
  {
    title: 'Accrual accounting is the reason statements need auditing',
    body: 'Cash accounting is verifiable: the bank statement is the record. Accrual accounting records economic events when they happen, not when money moves. Revenue is booked when control passes, expenses when incurred, and estimates fill every gap that timing creates. Every judgement made in preparing the statements is a place where they can be wrong, and each of those places maps to an assertion.',
  },
  {
    title: 'The statements are a connected system',
    body: 'A single transaction touches several statements at once. A sale recorded in December adds revenue in the income statement, a receivable on the balance sheet, and cash only later in the cash flow statement. This is why auditors trace transactions through the whole system, and why cut-off errors are never contained in one place.',
  },
  {
    title: 'Why the game asks which statement a line item belongs to',
    body: 'Each scenario in Assertio names one line item from a real statement, and its statement shapes the risk. Income statement items raise transaction-level questions, like whether a sale really happened. Balance sheet items raise balance-level questions, like whether an asset still exists or is fairly valued. Knowing which lens applies is the first step in identifying relevant assertions.',
  },
];

export function FinancialStatements({ onHome }: { onHome: () => void }) {
  return (
    <div className="screen guide">
      <header className="hero">
        <p className="eyebrow">Reference</p>
        <h1>What are financial statements?</h1>
        <p className="guide-intro">
          Financial statements are the formal record of a company's performance and position, prepared by
          management for the people who rely on them: shareholders, lenders, regulators and the public. The
          auditor's job is to decide whether they give a true and fair view. To do that, you first need to
          know what each statement is saying, and what it is silently claiming.
        </p>
      </header>
      <section className="card guide-section">
        <h2 className="guide-group-label">The statements, one by one</h2>
        {STATEMENTS.map((s) => (
          <div key={s.name} className="guide-mindset">
            <h3>{s.name}</h3>
            <p className="guide-sub">{s.question}</p>
            <p>{s.body}</p>
            <div className="guide-why">
              <span className="guide-example-label">What the auditor watches for</span>
              {s.audit}
            </div>
          </div>
        ))}
      </section>
      <section className="card guide-section">
        <h2 className="guide-group-label">How they fit together</h2>
        {HOW.map((h) => (
          <div key={h.title} className="guide-mindset">
            <h3>{h.title}</h3>
            <p>{h.body}</p>
          </div>
        ))}
      </section>
      <div className="phase-actions">
        <button className="btn btn-ghost" onClick={onHome}>Back to home</button>
      </div>
    </div>
  );
}
