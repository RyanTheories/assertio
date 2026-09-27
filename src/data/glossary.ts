export interface GlossaryTerm {
  label: string;
  body: string;
  ref?: string;
}

export const GLOSSARY: Record<string, GlossaryTerm> = {
  'amortized cost': {
    label: 'Amortized cost',
    body: 'A measurement basis for financial assets/liabilities: cost minus repayments, adjusted for amortization of the difference between price and face value, and reduced by impairment. Typical for loans, receivables and held-to-maturity debt.',
    ref: 'IFRS 9',
  },
  'sovereign debt': {
    label: 'Sovereign debt',
    body: 'Bonds and loans issued by national governments. Held by banks, insurers and funds; mostly measured at amortized cost or fair value, with ECL applied. Key audit issues: exposure concentration, restructuring (e.g. Greek PSI 2012), credit rating and fair-value evidence.',
    ref: 'IFRS 9 / IFRS 13',
  },
  'expected credit loss': {
    label: 'Expected credit loss (ECL)',
    body: 'The forward-looking impairment model: a probability-weighted estimate of credit losses. Stage 1 (12-month ECL), Stage 2 (lifetime ECL after significant increase in risk), Stage 3 (credit-impaired). Estimation-heavy — a valuation-risk magnet.',
    ref: 'IFRS 9',
  },
  ecl: {
    label: 'ECL',
    body: 'See Expected credit loss.',
    ref: 'IFRS 9',
  },
  'fair value': {
    label: 'Fair value',
    body: 'The price to sell an asset or transfer a liability in an orderly transaction between market participants. Falls back on observable prices; where none exist, models and assumptions drive it — the deeper into the fair value hierarchy (Levels 1→3), the higher the estimation risk.',
    ref: 'IFRS 13',
  },
  impairment: {
    label: 'Impairment',
    body: 'A write-down when carrying amount exceeds recoverable amount. For goodwill/intangibles it is annual and judgement-heavy, based on cash-generating-unit forecasts; for financial assets under IFRS 9 it is ECL. A classic valuation-and-allocation risk.',
    ref: 'IAS 36 / IFRS 9',
  },
  provision: {
    label: 'Provision',
    body: 'A liability of uncertain timing or amount, recognised when an outflow is probable and estimable. Requires judgement on probability, timing and measurement. Completeness risk is high: provisions are easy to omit and hard to find.',
    ref: 'IAS 37',
  },
  covenant: {
    label: 'Covenant',
    body: 'A contractual condition in loan agreements (e.g. debt-to-EBITDA, net worth, interest cover). Breach can trigger repayment or re-pricing. Audit focus: whether breach/going-concern impacts are recognised and disclosed.',
    ref: 'IFRS 7 / ISA 570',
  },
  accrual: {
    label: 'Accrual',
    body: 'An expense (or income) recognised in the period it is incurred, before cash moves or the invoice arrives. Cut-off and completeness risks cluster here, especially around year-end estimates for unbilled services.',
    ref: 'IAS 1 / Conceptual Framework',
  },
  depreciation: {
    label: 'Depreciation',
    body: 'The systematic allocation of an asset\u2019s cost over its useful life. Audit issues: useful life and residual value estimates, method choice, start/stop timing and impairment interaction.',
    ref: 'IAS 16',
  },
  'carrying amount': {
    label: 'Carrying amount',
    body: 'The amount at which an asset or liability is recognised in the balance sheet — cost or revalued amount, less accumulated depreciation and impairment. The "wrong number here" is a valuation assertion failure.',
    ref: 'IAS 16 / IFRS 13',
  },
  goodwill: {
    label: 'Goodwill',
    body: 'The excess of acquisition cost over identifiable net assets. Not amortised but tested for impairment annually at the CGU level. Highly judgement-dependent: forecasts, discount rates and growth assumptions drive the result.',
    ref: 'IFRS 3 / IAS 36',
  },
  cgu: {
    label: 'CGU (cash-generating unit)',
    body: 'The smallest group of assets generating largely independent cash inflows. Goodwill and intangibles are tested for impairment at this level — how the CGU is defined materially changes the impairment result.',
    ref: 'IAS 36',
  },
  'deferred tax': {
    label: 'Deferred tax',
    body: 'Future tax consequences of temporary differences between accounting and tax treatment of assets/liabilities. Complex, estimate-heavy (future rates, recoverability), and a favourite hiding place for classification and valuation misstatements.',
    ref: 'IAS 12',
  },
  derivative: {
    label: 'Derivative',
    body: 'A contract whose value changes with an underlying (rate, price, index). Usually at fair value through profit or loss, mostly Level 2/3 — model-driven and estimation-risk heavy.',
    ref: 'IFRS 9',
  },
  hedge: {
    label: 'Hedge accounting',
    body: 'Adjusting the recognition of hedging instrument and hedged item so gains/losses align in the same period. Requires formal designation, effectiveness testing and documentation — lots of disclosure, lots of traps.',
    ref: 'IFRS 9',
  },
  swap: {
    label: 'Swap',
    body: 'A derivative exchanging cash flow streams — most commonly fixed-for-floating interest rate swap. Treasury departments use them to manage rate exposure; valuation and hedge-designation are the audit issues.',
    ref: 'IFRS 9',
  },
  'forward contract': {
    label: 'Forward contract',
    body: 'An OTC agreement to buy/sell an asset at a set price on a future date. Unlike exchange-traded futures, no daily margining — valuation is model-based and counterparty risk sits in the fair value.',
    ref: 'IFRS 9 / IFRS 13',
  },
  'net asset value': {
    label: 'Net asset value (NAV)',
    body: 'Assets minus liabilities, typically per share/unit for funds. Fund NAVs price daily investor dealing — a wrong NAV means real cash errors to investors, so valuation and allocation risks dominate.',
    ref: 'IFRS as applied to funds',
  },
  nav: {
    label: 'NAV',
    body: 'See Net asset value.',
  },
  actuarial: {
    label: 'Actuarial valuation',
    body: 'Estimating obligations and costs of insurance/pension liabilities using demographic and financial assumptions (mortality, discount rates, lapse). The deepest estimation zone in accounting — small assumption shifts swing the numbers by millions.',
    ref: 'IFRS 17 / IAS 19',
  },
  reinsurance: {
    label: 'Reinsurance',
    body: 'Insurance bought by an insurer to cede part of its risk. Recognition of recoverables is estimate-heavy: is the counterparty good for it, is timing matched to the claim, is it truly risk-transfer rather than disguised financing?',
    ref: 'IFRS 17',
  },
  underwriting: {
    label: 'Underwriting',
    body: 'Assessing and pricing risk before accepting it (insurance/lending). Underwriting quality drives the loss assumptions inside ECL, IBNR and actuarial estimates — a root cause of valuation risk.',
    ref: 'IFRS 17 / IFRS 9',
  },
  custodian: {
    label: 'Custodian',
    body: 'A institution holding clients\u2019 securities for safekeeping. Fund auditors confirm holdings directly with custodians — a core existence/rights test for investment assets.',
    ref: 'ISA 502',
  },
  confirmation: {
    label: 'Confirmation',
    body: 'Direct written response from a third party (bank, customer, lender, custodian, lawyer) verifying a balance or condition. High reliability because it is external — but it tests existence/accuracy, NOT completeness.',
    ref: 'ISA 505',
  },
  vouching: {
    label: 'Vouching',
    body: 'Tracing a recorded transaction back to supporting evidence (ledger → invoice → shipping doc). Tests occurrence/accuracy. Direction matters: run it the wrong way and you\u2019ve tested nothing.',
    ref: 'ISA 500',
  },
  reconciliation: {
    label: 'Reconciliation',
    body: 'Comparing two records that should agree (bank vs ledger, subledger vs control, custodian vs fund records) and investigating differences. Strong when both sides are independently maintained.',
    ref: 'ISA 500',
  },
  'bank reconciliation': {
    label: 'Bank reconciliation',
    body: 'Matching the bank statement to the cash book. The single most reliable cash procedure: bank balances are externally evidenced. Miss a reconciliation and cash completeness/existence fly blind.',
    ref: 'ISA 505',
  },
  sampling: {
    label: 'Sampling',
    body: 'Selecting and testing a subset of a population to draw a conclusion about the whole. Statistically-based selection beats haphazard; the direction of the sample determines which assertion you are testing.',
    ref: 'ISA 530',
  },
  'cut-off': {
    label: 'Cut-off',
    body: 'Transactions recorded in the correct accounting period. Year-end testing centres on the last and first weeks of the period — goods-in-transit, invoices held back, December costs booked in January.',
    ref: 'ISA 315 assertion vocabulary',
  },
  'going concern': {
    label: 'Going concern',
    body: 'The assumption the entity will continue operating for the foreseeable future (≥12 months). Covenants, cash burn and management plans drive the assessment; failure to disclose material uncertainty is a disclosure-level misstatement.',
    ref: 'ISA 570 / IAS 1',
  },
  'contingent liability': {
    label: 'Contingent liability',
    body: 'A possible obligation dependent on uncertain future events. Not recognised on balance sheet (unless probable+estimable → provision) but disclosed if material. Completeness risk: the lawsuit nobody told finance about.',
    ref: 'IAS 37',
  },
  'related party': {
    label: 'Related party',
    body: 'Entities/people with control, joint control or significant influence over the entity. Transactions with them may not be at arm\u2019s length; completeness of identification and disclosure is the audit challenge — the parties are often deliberately opaque.',
    ref: 'IAS 24 / ISA 550',
  },
  'deferred income': {
    label: 'Deferred income',
    body: 'Cash received before the related good/service is delivered — a liability until earned. Contract balances and remaining-performance-obligations drive it; cut-off and completeness risks dominate.',
    ref: 'IFRS 15',
  },
  'revenue recognition': {
    label: 'Revenue recognition',
    body: 'Recognising revenue when (or as) performance obligations are satisfied, at the transaction price. Five-step model. Presumed fraud risk under ISA 240 — the classic battle-ground assertion is occurrence and cut-off.',
    ref: 'IFRS 15 / ISA 240',
  },
  'percentage of completion': {
    label: 'Percentage of completion',
    body: 'Recognising long-term contract revenue as work progresses, using cost-to-cost or output measures. Highly estimate-dependent: costs-to-complete forecasts drive both revenue and the loss provisions.',
    ref: 'IFRS 15',
  },
  'right-of-use': {
    label: 'Right-of-use asset',
    body: 'The lessee\u2019s asset representing its right to use a leased item, paired with a lease liability. Replaced the old operating/off-balance-sheet distinction for most leases.',
    ref: 'IFRS 16',
  },
  'lease liability': {
    label: 'Lease liability',
    body: 'The present value of unpaid lease payments, discounted at the implicit or incremental borrowing rate. Estimate inputs (term, escalation, discount rate) create valuation risk.',
    ref: 'IFRS 16',
  },
  capitalisation: {
    label: 'Capitalisation',
    body: 'Recording a cost as an asset (on the balance sheet) rather than expensing it immediately. The capitalise-vs-expense line is a classic classification risk, and judgement (future benefit?) drives it.',
    ref: 'IAS 16 / IAS 38',
  },
  'borrowing costs': {
    label: 'Borrowing costs',
    body: 'Interest and similar costs directly attributable to qualifying asset construction. Must be capitalised during construction, not expensed — timing and scope are cut-off/classification issues.',
    ref: 'IAS 23',
  },
  'useful life': {
    label: 'Useful life',
    body: 'The period over which an asset is depreciated or amortised. An estimate — stretching it protects profit, shrinking it accelerates expense. Valuation assertion territory.',
    ref: 'IAS 16 / IAS 38',
  },
  'inventory count': {
    label: 'Inventory count',
    body: 'Physical verification of inventory quantities at the reporting date. Attendance tests existence and completeness of the count itself; slow-moving/obsolete assessment is valuation.',
    ref: 'ISA 501',
  },
  consignment: {
    label: 'Consignment stock',
    body: 'Inventory held by one party but owned by another (the consignor) until sold. Rights-and-obligations risk: the stock is physically present but not the client\u2019s — a classic trap in inventory counts.',
    ref: 'IFRS 15 / IFRS 16 concepts',
  },
  'work in progress': {
    label: 'Work in progress (WIP)',
    body: 'Partially-completed goods or contracts at period end. Valuation relies on percentage-complete estimates; existence relies on the physical state of the work — both fail together when cost-to-complete forecasts are wrong.',
    ref: 'IAS 2 / IFRS 15',
  },
  factoring: {
    label: 'Factoring',
    body: 'Selling receivables to a factor at a discount for immediate cash. Recourse terms determine whether the receivable is truly derecognised or is really a disguised borrowing — substance over form.',
    ref: 'IFRS 9 derecognition',
  },
  'allowance': {
    label: 'Allowance for doubtful accounts',
    body: 'A valuation estimate of receivables that will not be collected, deducted from gross receivables. ECL-based; assumption-driven and a direct hit on valuation risk.',
    ref: 'IFRS 9',
  },
  'gift card': {
    label: 'Gift card liability',
    body: 'Deferred income until redeemed; a breakage estimate (cards never redeemed) adds valuation judgement. Cut-off (redemption timing) and completeness (unredeemed float) both matter.',
    ref: 'IFRS 15',
  },
  grant: {
    label: 'Government grant',
    body: 'Assistance from government, conditional on compliance with conditions. Recognition (receipt vs performance) and conditionality drive cut-off/classification risks; conditions attached can be disclosure-heavy.',
    ref: 'IAS 20',
  },
  subsidy: {
    label: 'Subsidy',
    body: 'See Government grant.',
    ref: 'IAS 20',
  },
  intercompany: {
    label: 'Intercompany balances',
    body: 'Receivables/payables between group entities. Eliminated on consolidation, but only if identified — completeness and elimination-cut-off are the risks; balances with related parties need disclosure too.',
    ref: 'IFRS 10 / IAS 24',
  },
  'transfer pricing': {
    label: 'Transfer pricing',
    body: 'Pricing of transactions between related entities in different tax jurisdictions. Arm\u2019s-length benchmarking and documentation requirements; mispricing shifts profit between tax regimes — classification and disclosure risk.',
    ref: 'IAS 24 / OECD guidelines',
  },
  consolidation: {
    label: 'Consolidation',
    body: 'Combining parent and controlled subsidiaries into one economic entity. Control assessment (risk vs reward, SPVs) determines the perimeter — a wrong perimeter is a presentation-level misstatement of everything.',
    ref: 'IFRS 10',
  },
  milestone: {
    label: 'Milestone revenue',
    body: 'Revenue recognised on achieving contract milestones. Transfer-of-control judgement (is the milestone a genuine performance obligation, or just a payment schedule?) drives both timing and amount.',
    ref: 'IFRS 15',
  },
  'prepayment': {
    label: 'Prepayment',
    body: 'Cash paid before the related expense is incurred — an asset until the benefit is consumed. Cut-off risk at both ends of the period; ageing prepayments that should have been expensed are a classic find.',
    ref: 'IAS 1',
  },
  'unearned premium': {
    label: 'Unearned premium',
    body: 'The portion of insurance premium relating to the unexpired period of cover. Earned over the coverage period — a timing (cut-off) estimate, calculated pro-rata or by actuarial method.',
    ref: 'IFRS 17',
  },
  crypto: {
    label: 'Crypto-assets',
    body: 'Digitally-recorded assets (tokens, stablecoins) without a single accounting home — held-for-sale, intangible or inventory depending on the business model. Valuation evidence and custody are the dominant risks.',
    ref: 'IAS 38 / IFRS interpretations',
  },
  token: {
    label: 'Token',
    body: 'A digital unit recorded on a blockchain, representing anything from a currency claim to a utility right. Accounting classification (asset? liability? equity?) is unsettled — judgement and disclosure risk.',
    ref: 'IAS 38',
  },
  'loan-to-value': {
    label: 'Loan-to-value (LTV)',
    body: 'Loan amount divided by collateral value. A monitoring covenant in lending; valuation of collateral (often Level 3 property appraisals) feeds both ECL and disclosure.',
    ref: 'IFRS 9 / IFRS 13',
  },
  'discount rate': {
    label: 'Discount rate',
    body: 'The rate used to convert future cash flows to present value. Small changes have enormous effects on lease liabilities, provisions, impairments and pensions — the single most sensitive estimate input.',
    ref: 'IAS 19 / IAS 36 / IFRS 16',
  },
  'present value': {
    label: 'Present value',
    body: 'The current worth of future cash flows, discounted at an appropriate rate. Ubiquitous in liabilities, impairment tests and lease accounting — and always assumption-dependent.',
    ref: 'Conceptual Framework',
  },
  'functional currency': {
    label: 'Functional currency',
    body: 'The currency of the primary economic environment in which the entity operates. Determines what is "monetary" vs "non-monetary" for translation — wrong classification creates FX gains/losses in the wrong places.',
    ref: 'IAS 21',
  },
  'subsequent events': {
    label: 'Subsequent events',
    body: 'Events after the reporting date but before the financial statements are issued. Adjusting events change the numbers; non-adjusting events need disclosure. Reviewing them is a key completeness procedure.',
    ref: 'IAS 10 / ISA 560',
  },
  'analytical review': {
    label: 'Analytical review',
    body: 'Studying relationships between financial and non-financial data — ratios, trends, expectations — to spot inconsistencies. Powerful for risk assessment, weaker as a stand-alone substantive test.',
    ref: 'ISA 520',
  },
  'materiality': {
    label: 'Materiality',
    body: 'The magnitude of a misstatement that would influence users\u2019 decisions. Drives the audit\u2019s depth everywhere: what is tested, how much, and what is reported.',
    ref: 'ISA 320 / IFRS Practice Statement 2',
  },
  'three-way match': {
    label: 'Three-way match',
    body: 'Purchase control that agrees purchase order, goods-received note and supplier invoice before payment. Strong completeness/occurrence control for the purchases cycle.',
    ref: 'Control concept (ISA 315)',
  },
  'aged receivable': {
    label: 'Aged receivables analysis',
    body: 'Receivables bucketed by how long outstanding. Feeds the ECL/allowance estimate and exposes collection problems — analytical review gold.',
    ref: 'IFRS 9 / ISA 520',
  },
};

export const GLOSSARY_KEYS = Object.keys(GLOSSARY).sort((a, b) => b.length - a.length);
