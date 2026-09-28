import { ASSERTION_SHORT } from '../ui';

interface GuideEntry {
  name: string;
  short: string;
  explanation: string;
  why: string;
  example: string;
  whatCouldGoWrong: string;
}

const GUIDE: Record<'transactions' | 'balances', GuideEntry[]> = {
  transactions: [
    {
      name: 'Occurrence',
      short: ASSERTION_SHORT.occurrence,
      explanation:
        'Transactions and events that have been recorded actually happened and pertain to the entity. Nothing recorded should be fictitious, no sales to fake customers, no expenses the business never incurred.',
      why: 'Why do auditors care so much about this one? Because the single most common way companies commit fraud is booking revenue that never happened. ISA 240 calls this the "presumed fraud risk": the auditor must treat revenue recognition as a fraud risk until proven otherwise, sales can be faked to hit targets, trigger bonuses, or satisfy loan covenants. There is almost never a counter-incentive strong enough to make management invent expenses, but the incentive to invent revenue is everywhere.',
      example:
        'The ledger shows a €50,000 sale to customer Marta Ltd in December. Occurrence asks: did this sale really take place, to a real customer, and was it genuinely this entity that made it?',
      whatCouldGoWrong: 'Fake customer, side-letter allowing return, sale to a related party dressed up as a normal customer, revenue recognised before goods shipped, or for services never rendered.',
    },
    {
      name: 'Completeness',
      short: ASSERTION_SHORT.completeness,
      explanation:
        'All transactions and events that should have been recorded have been recorded. It is the mirror of occurrence: instead of guarding against things that should not be there, it guards against things that are missing.',
      why: 'Why is completeness the hardest assertion to test? Because the error is invisible. If a sale is fictitious you can at least find it sitting in the ledger and go look for evidence, but a missing transaction leaves no trace to find. The only way in is to start outside the ledger and work toward it: take a sample of shipping documents and check each one made it into the sales day book. Auditors call this the "direction of testing": test for existence/occurrence from ledger → evidence, test for completeness from evidence → ledger. Getting the direction backwards is the classic audit failure, a complete-looking ledger proves nothing if you only ever started from the ledger itself.',
      example:
        'The company paid 40 suppliers this year but only 38 appear in the purchase ledger. Two genuine expenses were never recorded, a completeness error that understates costs and overstates profit.',
      whatCouldGoWrong: 'Unrecorded liabilities, missing purchase invoices, unpaid staff bonuses, revenue kept off the books to hide it from tax, the last one is why small businesses sometimes fail completeness in the opposite direction.',
    },
    {
      name: 'Accuracy',
      short: ASSERTION_SHORT.accuracy,
      explanation:
        'Transactions and events have been recorded at the correct amounts, and any related calculations ( VAT, discounts, accruals ) are processed correctly. The event was real, but is the number attached to it right?',
      why: 'Why does accuracy break so often in practice? Because the transaction was real and somebody honest entered it, they just entered it wrong, or the system calculated it wrong. Manual data entry, spreadsheet dependencies, pricing rules nobody has re-checked since the system was configured, discounts applied twice. It is rarely fraud; it is entropy. That is why re-performance and re-calculation are the natural procedures here: pull the invoice, pull the contract price, do the arithmetic again yourself. Accuracy is also where most "technical" misstatements live, wrong VAT rate, currency converted at the wrong date\'s rate, an accrual computed on last quarter\'s estimate.',
      example:
        'A sale of 1,200 units at €9.90 each is booked as €12,000, a slip of one digit. The sale occurred, but the recorded amount is wrong, so accuracy fails.',
      whatCouldGoWrong: 'Unit price from an outdated price list, quantity keyed in twice, VAT at the wrong rate, FX converted using a stale rate, discount applied but then forgotten in the total.',
    },
    {
      name: 'Cut-off',
      short: ASSERTION_SHORT.cut_off,
      explanation:
        'Transactions and events have been recorded in the correct accounting period. This matters most around year-end, when there is every incentive to push costs into last year or pull revenue into this one.',
      why: 'Why is cut-off the assertion where incentive and opportunity meet? Because a cut-off manipulation is almost impossible to detect later, the sale was real, the customer was real, the amount was right. Only the period is wrong, and by February nobody remembers which week the van was loaded. Management under pressure gets one clean shot at it: the last week of the year. That is why auditors physically attend the year-end count, why "goods dispatched before year-end but invoiced after" is a standard review item, and why the week before and after year-end gets sampled much more heavily than the rest of the year combined.',
      example:
        'An invoice dated 3 January for goods delivered 28 December is recorded in January. The revenue belongs in December, recording it in January is a cut-off error.',
      whatCouldGoWrong: 'December sales booked in January to save tax, January costs booked in December to fatten deductions, goods in transit at year-end recognised on the wrong side, "hold the invoices until Monday" instructions to the accounts team.',
    },
    {
      name: 'Classification',
      short: ASSERTION_SHORT.classification,
      explanation:
        'Transactions and events have been recorded in the proper accounts. The amount is right and the period is right, but it sits in the wrong line item, which can mislead users of the accounts.',
      why: 'Why would a real, correctly-measured transaction be deliberately misclassified? Because line items carry meaning beyond their totals. Move an expense into an asset account and profit jumps. Move "other income" into "revenue" and the top line looks like it is growing. Move revenue into "other income" and margins look worse than they are ( sometimes done to smooth ). Analysts read line items, not just the bottom line, which makes classification a quietly powerful lever. It is also the assertion where simple staff error is most common: a chart of accounts with 400 codes and a tired clerk.',
      example:
        'The cost of a delivery van ( an asset ) is recorded in repairs and maintenance ( an expense ). The amount is correct, the period is correct, but the classification overstates expenses and understates assets.',
      whatCouldGoWrong: 'Capital expenditure expensed ( or the reverse ), other income dressed up as revenue, personal expenses buried in "miscellaneous", intercompany transactions in the wrong entity code.',
    },
  ],
  balances: [
    {
      name: 'Existence',
      short: ASSERTION_SHORT.existence,
      explanation:
        'Assets, liabilities and equity interests actually exist at the reporting date. It is the balance-sheet twin of occurrence: are the things on the statement really there, or are they ghosts, duplicates or dead stock?',
      why: 'Why does existence matter more than ever in an asset-heavy business? Because assets are where value lives on the balance sheet, and also where inflation of it is easiest. Inventory that is obsolete but still on the books at cost, receivables from customers who quietly went bankrupt, a duplicate bank account created by a mapping error. For the auditor the physical world is the friend here: go count it, go confirm it with the bank, go look at the machine. That is also why existence testing is some of the most concrete work an auditor does, when you cannot verify an asset exists, that is a red flag in itself.',
      example:
        'The inventory listing shows 5,000 washing machines in the warehouse. Existence asks: are those machines physically there, or are they obsolete units, double-counted, or simply not there at all?',
      whatCouldGoWrong: 'Obsolete or unsellable stock carried at cost, receivables written off by the customer but not by the client, ghost assets on a register that was never reconciled to anything physical, duplicate records from a system migration.',
    },
    {
      name: 'Completeness',
      short: ASSERTION_SHORT.completeness,
      explanation:
        'All assets, liabilities and equity interests that should be recorded have been recorded. For balances the danger is usually hidden liabilities, the lawsuit, the unbilled supplier, the guarantee nobody wrote down.',
      why: 'Why is completeness the scariest assertion on the balance sheet? Because what you cannot see is exactly what hides there. A misstatement in an recorded asset is visible, you can go count it. A missing liability has no entry, no document, no trace. Fraudulent concealment almost always takes the form of a liability that was never booked: the lawsuit the legal team knows about but nobody told finance, the guarantee given to a supplier, the lease obligation hidden in a "service contract" to dodge recognition. This is why auditors send legal letters, read board minutes, scan after-date events and interview people outside finance, the evidence for completeness never lives inside the ledger.',
      example:
        'A supplier sued the company in October, and lawyers say a loss is probable, but no provision appears anywhere in the liabilities section. That is a missing liability: a completeness failure.',
      whatCouldGoWrong: 'Unrecorded provisions, guarantees and contingencies, undisclosed related-party balances, lease obligations disguised as service contracts, liabilities parked in an unconsolidated entity.',
    },
    {
      name: 'Rights & obligations',
      short: ASSERTION_SHORT.rights_and_obligations,
      explanation:
        'The entity holds or controls the rights to its assets, and its liabilities are genuinely its obligations. Something can be physically present and still not belong to the client.',
      why: 'Why does this assertion deserve its own line? Because ownership and physical presence are different facts. A leased machine sits on your client\'s floor but belongs to the lessor. Goods on consignment sit in the warehouse but belong to the supplier. Finance staff who record what they can see, not what the contract says, get this wrong constantly. It is also the assertion that underlies whole accounting regimes: whether a lease is on-balance-sheet, whether revenue recognition on a "sale" with a buy-back clause is really a sale, whether that "inventory" is actually someone else\'s money in your warehouse.',
      example:
        'A machine on the client\'s factory floor is actually leased, and the lease contract says the lessor keeps title. The machine exists, but the client does not own it. Rights and obligations fails.',
      whatCouldGoWrong: 'Assets held on consignment or for resale counted as own inventory, finance-leased assets recorded as owned, sale with buy-back obligation still shown as an asset, inventory pledged as collateral without disclosure.',
    },
    {
      name: 'Valuation & allocation',
      short: ASSERTION_SHORT.valuation_and_allocation,
      explanation:
        'Assets, liabilities and equity are recorded at appropriate carrying amounts, and valuation or allocation adjustments ( depreciation, impairment, provisions ) are recorded correctly.',
      why: 'Why is valuation the most judgement-heavy assertion? Because for many balances there is no "correct number" to check against, only a range of reasonable ones. How much of this receivable will actually be collected? What is this development project worth now that the client lost its biggest customer? What is the fair value of an equity stake in a private company? These are estimates, and estimates are where management bias lives. ISA 540 (Revised) exists almost entirely for this: the auditor does not re-do the estimate but tests the reasonableness of the assumptions, the method and the data. Valuation is also where small assumption changes have enormous effects, a half-percent shift in a discount rate can swing a pension provision by millions.',
      example:
        'Receivables include a €200,000 balance from a customer who went bankrupt in November, still shown at full value with no allowance. The receivable exists and is owed, but it is carried at the wrong amount.',
      whatCouldGoWrong: 'No impairment of obsolete stock, receivables allowance based on hope rather than loss history, depreciation lives stretched to protect profit, fair value estimates on unobservable inputs, goodwill never tested since acquisition.',
    },
    {
      name: 'Presentation & disclosure',
      short: ASSERTION_SHORT.presentation_and_disclosure,
      explanation:
        'Components of the financial statements are properly classified, described and disclosed. The numbers may all be right, but are they in the right section, labelled clearly, with the notes a reader needs?',
      why: 'Why is this more than just formatting? Because the notes are where the real information lives, and the only place a reader can find it. The balance sheet says "Provisions: €4m" but the note is what tells you €4m is one big lawsuit the company might lose. Presentation is where companies hide things in plain sight: material items lumped into "other", current/non-current classification massaged to make liquidity look better, a note that technically discloses the guarantee but buries it on page 90. The auditor reads the statements the way an investor would: could a reasonable user find and understand what matters?',
      example:
        'Current and non-current portions of a large loan are shown as one lump sum with no breakdown and no note explaining repayment terms, a presentation and disclosure problem.',
      whatCouldGoWrong: 'Material items buried in "other operating expenses", missing related-party disclosures, current/non-current misclassification that flatters liquidity, contingencies disclosed without the required sensitivity or timing detail.',
    },
  ],
};

const MINDSET: { title: string; body: string }[] = [
  {
    title: '1. Start with "what could go wrong?", not with the checklist',
    body: 'Beginners ask "which assertions are relevant?" and then try to remember the answer. Experienced auditors ask "in this business, for this line item, how could this number be wrong?", and the assertions fall out of the answer. A business with year-end bonus pressure has different failure modes than one with complex inventory; a software company\'s revenue fails in different ways than a bakery\'s. If you can describe the specific ways the number could be misstated, mapping them to assertion names is trivial. That is exactly what Phase 1 and 2 of this game train.',
  },
  {
    title: '2. Incentive, opportunity and rationalisation, the fraud triangle lens',
    body: 'When you read the client brief, ask: who benefits if this number is wrong? Bonus targets tied to revenue create an incentive to inflate it; a new sales channel with untested controls creates the opportunity; a belief that "we\'ll make it up next quarter" supplies the rationalisation. Not every misstatement is fraud, but the assertions you judge highest-risk should track where all three overlap. In the game, the brief always contains the risk drivers: look for the pressure, the new or unusual thing, the manual workaround.',
  },
  {
    title: '3. Estimates and judgement beat arithmetic as risk drivers',
    body: 'A number produced by a high-volume automated process with good controls is low risk for accuracy even if huge. A single number produced by one person making a judgement call, a provision, an impairment, a fair value, can be 100% misstated in either direction. When a brief mentions an estimate, an assumption or a model, valuation should be near the top of your risk list, and your procedures should target the assumptions, not the spreadsheet arithmetic.',
  },
  {
    title: '4. The direction of testing, which way do you run the sample?',
    body: 'This is the single most-tested skill in audit practice, and it is the whole point of Phase 3. To test occurrence, start in the ledger and chase each entry to evidence ( invoice → shipping document → payment ). To test completeness, start in the evidence and chase each item into the ledger ( shipping document → ledger ). Run the wrong direction and your procedure tests nothing, which is exactly what a trap procedure in this game does: it looks thorough, but it addresses the wrong assertion, or runs the wrong direction, so the risk you identified stays unaddressed.',
  },
];

const CONFUSABLES: { pair: string; body: string }[] = [
  {
    pair: 'Occurrence vs. completeness',
    body: 'They are mirror images, and the test runs in opposite directions. Occurrence worries about what is in the ledger that should not be; completeness worries about what is outside the ledger that should be in. For revenue, occurrence is the classic fraud risk; for liabilities, completeness is. Ask "which way could this line be wrong in this business?", overstated or understated, and the right assertion is obvious.',
  },
  {
    pair: 'Accuracy vs. valuation',
    body: 'Both are about "is the number right?", but accuracy is about individual transactions ( the invoice amount, the VAT calculation ) while valuation is about the balance at period end ( the allowance, the impairment, the carrying amount ). If the misstatement happens one invoice at a time, it is accuracy; if it is one big judgement at the end, it is valuation.',
  },
  {
    pair: 'Cut-off vs. classification',
    body: 'Both are about "the transaction is in the wrong place", but cut-off means the wrong period, classification means the wrong account. An expense booked in January that belongs in December is cut-off; a repair booked as a machine purchase is classification. When you see "the amount is right but..." in a brief, check which "wrong place" it is.',
  },
  {
    pair: 'Existence vs. rights & obligations',
    body: 'Existence asks "is it there?", rights & obligations asks "is it theirs?" Something can exist and not be theirs ( consignment stock ), and something can be theirs and not be visible ( a guarantee ). When inventory or fixed assets are in play, always ask both questions separately, physical presence and legal ownership are different tests.',
  },
];

const STANDARDS: { label: string; href: string; note: string }[] = [
  {
    label: 'IAASB, International Auditing and Assurance Standards Board',
    href: 'https://www.iaasb.org/',
    note: 'The body that issues the ISAs, including the standards referenced throughout this guide.',
  },
  {
    label: 'IFRS Foundation',
    href: 'https://www.ifrs.org/',
    note: 'The body that issues IFRS Standards, which govern how line items are presented, classified and disclosed.',
  },
];

export function AssertionsGuide({ onHome }: { onHome: () => void }) {
  return (
    <div className="screen guide">
      <header className="hero">
        <p className="eyebrow">Reference</p>
        <h1>What are assertions?</h1>
        <p className="guide-intro">
          Assertions are the implicit claims a set of financial statements makes about each line item:
          that it happened, that nothing is missing, that the amount is right. Auditors use them as a
          checklist of ways a line item can be wrong, and target their procedures at the assertions
          where the risk of error is highest. Dubito trains exactly this skill.
        </p>
      </header>

      <section className="card guide-section">
        <h2 className="guide-group-label">How to think like an experienced auditor</h2>
        {MINDSET.map((m) => (
          <div key={m.title} className="guide-mindset">
            <h3>{m.title}</h3>
            <p>{m.body}</p>
          </div>
        ))}
      </section>

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
                <div className="guide-why">
                  <span className="guide-example-label">Why it matters</span>
                  {entry.why}
                </div>
                <div className="guide-example">
                  <span className="guide-example-label">Example</span>
                  {entry.example}
                </div>
                <div className="guide-wcgw">
                  <span className="guide-example-label">What could go wrong</span>
                  {entry.whatCouldGoWrong}
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}

      <section className="card guide-section">
        <h2 className="guide-group-label">Assertions people always confuse</h2>
        {CONFUSABLES.map((c) => (
          <div key={c.pair} className="guide-mindset">
            <h3>{c.pair}</h3>
            <p>{c.body}</p>
          </div>
        ))}
      </section>

      <section className="card guide-section">
        <h2 className="guide-group-label">Relevant standards & further reading</h2>
        <ul className="guide-std-list">
          {STANDARDS.map((s) => (
            <li key={s.href}>
              <a href={s.href} target="_blank" rel="noreferrer">{s.label}</a>
              <span className="muted small">, {s.note}</span>
            </li>
          ))}
        </ul>
        <p className="guide-std-note">
          Dubito follows the assertion vocabulary of ISA 315 (Revised 2019). Terminology in practice
          materials may vary slightly between jurisdictions and firms.
        </p>
      </section>

      <div className="phase-actions">
        <button className="btn btn-ghost" onClick={onHome}>Back to home</button>
      </div>
    </div>
  );
}
