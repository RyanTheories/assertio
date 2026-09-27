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
    body: 'An institution holding clients\u2019 securities for safekeeping. Fund auditors confirm holdings directly with custodians — a core existence/rights test for investment assets.',
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
  nrv: {
    label: 'Net realisable value (NRV)',
    body: 'Estimated selling price minus costs to complete and sell. Inventory is carried at the lower of cost and NRV — where selling prices fall or stock ages, NRV write-downs are the valuation risk.',
    ref: 'IAS 2',
  },
  obsolescence: {
    label: 'Obsolescence',
    body: 'The decline in an asset\'s or inventory\'s usefulness or saleability through age, technology or demand shifts. Drives impairment of fixed assets and NRV write-downs of stock — an estimate that management tends to postpone.',
    ref: 'IAS 2 / IAS 36',
  },
  'slow-moving': {
    label: 'Slow-moving stock',
    body: 'Inventory with little or no movement over extended periods — a leading indicator of obsolescence and NRV write-down needs. Ageing analysis is the standard evidence.',
    ref: 'IAS 2',
  },
  fifo: {
    label: 'FIFO (first-in, first-out)',
    body: 'Cost flow assumption that the oldest goods are sold first. In rising price environments it leaves newer (higher) costs in closing inventory; in falling environments the reverse — the method choice directly moves both cost of sales and inventory values.',
    ref: 'IAS 2',
  },
  'weighted average': {
    label: 'Weighted average cost',
    body: 'Inventory costing method that smooths purchase prices into a single average cost per unit. Less sensitive to purchase timing than FIFO, but the averaging calculation itself must be tested for accuracy.',
    ref: 'IAS 2',
  },
  'standard cost': {
    label: 'Standard costing',
    body: 'Predetermined unit costs used to value inventory and measure variances. The audit question is whether standards reasonably approximate actual cost at period end — unrealistic standards misstate both inventory and cost of sales.',
    ref: 'IAS 2',
  },
  wip: {
    label: 'WIP (work in progress)',
    body: 'See Work in progress. Partially complete production or contracts at period end — the valuation of which depends on completion-percentage estimates.',
    ref: 'IAS 2 / IFRS 15',
  },
  'finished goods': {
    label: 'Finished goods',
    body: 'Completed inventory ready for sale, carried at cost or NRV. Cut-off between WIP and finished goods, and NRV of unsold units, are the recurring audit issues.',
    ref: 'IAS 2',
  },
  lcm: {
    label: 'Lower of cost and NRV',
    body: 'The IAS 2 measurement rule: inventory is carried at whichever is lower, cost or net realisable value. The comparison must happen at least annually — and NRV falls are frequently recognised late.',
    ref: 'IAS 2',
  },
  'cash count': {
    label: 'Cash count',
    body: 'Physical counting of cash on hand at a moment in time, performed simultaneously by client and auditor. Tests existence; surprise counts also deter misappropriation.',
    ref: 'ISA 501',
  },
  'float': {
    label: 'Cash float',
    body: 'A small amount of cash kept available for day-to-day payments (tills, petty cash). Small in value but high in mishandling risk; counts and imprest reconciliation are the controls.',
    ref: 'ISA 501',
  },
  'petty cash': {
    label: 'Petty cash',
    body: 'Small cash reserve for minor expenses, usually run on an imprest system (fixed balance restored by reimbursement). The audit interest is control, not materiality.',
    ref: 'Internal control concept',
  },
  imprest: {
    label: 'Imprest system',
    body: 'A fixed-balance arrangement (petty cash, dividends accounts): the balance stays constant and is only restored by documented reimbursement. Makes shortages obvious — a strong completeness/existence control.',
    ref: 'Internal control concept',
  },
  'cut-off testing': {
    label: 'Cut-off testing',
    body: 'Procedures specifically targeting period-allocation: sampling transactions in the last and first weeks of the period and tracing them across the boundary. The evidence lives in dispatch/receipt documentation, not in the ledger.',
    ref: 'ISA 315 assertion vocabulary',
  },
  'goods received note': {
    label: 'Goods received note (GRN)',
    body: 'Document recording receipt of goods, matched to purchase order and invoice before payment (the three-way match). GRNs near year-end are the raw material of cut-off and completeness testing.',
    ref: 'ISA 315 / ISA 500',
  },
  'dispatch document': {
    label: 'Dispatch documentation',
    body: 'Evidence that goods left the premises (delivery notes, shipping documents, bills of lading). Key to revenue occurrence and cut-off: no dispatch, no sale.',
    ref: 'ISA 500',
  },
  'bill and hold': {
    label: 'Bill-and-hold',
    body: 'Revenue recognised while goods remain with the seller under customer instruction. Legitimate only under strict criteria (customer controls the goods, segregation, no resale) — otherwise it is premature recognition.',
    ref: 'IFRS 15',
  },
  'channel stuffing': {
    label: 'Channel stuffing',
    body: 'Pushing more product into distribution than the market demands near period end to inflate revenue. Detected via distributor inventory levels, returns history and credit terms loosening.',
    ref: 'IFRS 15 / ISA 240',
  },
  'side agreement': {
    label: 'Side agreement',
    body: 'A separate, undisclosed contract modifying the apparent terms of a sale (return rights, price protection). Evidence that the recorded revenue does not reflect the real arrangement — occurrence risk.',
    ref: 'IFRS 15 / ISA 240',
  },
  derecognition: {
    label: 'Derecognition',
    body: 'Removal of an asset or liability from the balance sheet when the rights, or the obligation, have expired or been transferred. The risk is premature derecognition (factoring with recourse, repo-style sales).',
    ref: 'IFRS 9',
  },
  recourse: {
    label: 'Recourse',
    body: 'The transferor\'s obligation to repurchase or compensate for transferred assets (e.g. factored receivables that default). Recourse means risks have not truly transferred — usually blocking derecognition.',
    ref: 'IFRS 9',
  },
  'expected loss': {
    label: 'Expected loss model',
    body: 'Impairment approach (ECL) recognising losses before they occur, based on probability weighting. Contrasts with incurred-loss models — the judgement moved from "has it happened" to "how likely is it".',
    ref: 'IFRS 9',
  },
  'credit-impaired': {
    label: 'Credit-impaired (Stage 3)',
    body: 'A financial asset where a credit event has already occurred (default, bankruptcy). Interest is accrued on net carrying amount and lifetime ECL applies — the deepest level of impairment recognition.',
    ref: 'IFRS 9',
  },
  'significant increase in credit risk': {
    label: 'Significant increase in credit risk (Stage 2)',
    body: 'The trigger for lifetime ECL under IFRS 9: quantitative (30 days past due presumption) or qualitative deterioration. Staging decisions are estimates with direct P&L effect.',
    ref: 'IFRS 9',
  },
  'days past due': {
    label: 'Days past due',
    body: 'Days elapsed since contractual payment date. Over 30 days past due triggers a presumption of Stage 2 under IFRS 9; ageing data is the primary ECL input.',
    ref: 'IFRS 9',
  },
  'forbearance': {
    label: 'Forbearance',
    body: 'Concessions granted to a borrower in difficulty (extended terms, waived covenants, reduced rates). Modifies the loan\'s contractual cash flows — ECL and staging must reflect the new reality, and disclosure is required.',
    ref: 'IFRS 9 / IFRS 7',
  },
  'probability-weighted': {
    label: 'Probability-weighted outcome',
    body: 'An estimate computed across multiple scenarios and their likelihoods — the core mechanism of ECL. The audit question is whether the scenario set is complete and unbiased.',
    ref: 'IFRS 9',
  },
  'forward-looking': {
    label: 'Forward-looking information',
    body: 'Macroeconomic and entity-specific forecasts used in ECL and impairment models. The judgement zone: which indicators, over what horizon, with what sensitivity — small input changes swing provisions.',
    ref: 'IFRS 9',
  },
  pd: {
    label: 'PD (probability of default)',
    body: 'The likelihood a borrower defaults within a given horizon — a core ECL input, derived from internal ratings, external scores or market data. Model governance is the audit focus.',
    ref: 'IFRS 9',
  },
  lgd: {
    label: 'LGD (loss given default)',
    body: 'The expected loss severity if default occurs, net of recoveries and collateral. Collateral valuation (often Level 3) makes this the most assumption-heavy ECL input.',
    ref: 'IFRS 9',
  },
  ead: {
    label: 'EAD (exposure at default)',
    body: 'The expected outstanding amount at the time of default, including committed but undrawn facilities. For revolving facilities this is a forecast, not a balance.',
    ref: 'IFRS 9',
  },
  ibnr: {
    label: 'IBNR (incurred but not reported)',
    body: 'Insurance claims that have happened but not yet been reported to the insurer at the reporting date. Estimated actuarially — the classic insurance completeness and valuation risk.',
    ref: 'IFRS 17',
  },
  'claims reserve': {
    label: 'Claims reserve',
    body: 'The liability for outstanding insurance claims: reported case estimates plus IBNR. Actuarial estimates of frequency and severity drive it; small assumption changes move it materially.',
    ref: 'IFRS 17',
  },
  'risk adjustment': {
    label: 'Risk adjustment (IFRS 17)',
    body: 'The compensation the entity requires for bearing uncertainty about future cash flows — a non-financial-risk margin in insurance contract liabilities. Highly judgemental; disclosure of the method is mandatory.',
    ref: 'IFRS 17',
  },
  'discount rate (unlocking)': {
    label: 'Discount unlocking',
    body: 'The effect of changing a discount rate or other estimate between periods, requiring restatement of the liability build-up. Frequent target of manipulation when results need smoothing.',
    ref: 'IFRS 17 / IAS 19',
  },
  'reinsurance recoverable': {
    label: 'Reinsurance recoverable',
    body: 'The insurer\'s asset for amounts recoverable from reinsurers. A valuation estimate dependent on reinsurer credit quality and claim development — and a classic place for optimistic provisioning.',
    ref: 'IFRS 17',
  },
  lapse: {
    label: 'Lapse rate',
    body: 'The proportion of insurance policies that terminate early through non-payment or surrender. A core actuarial assumption in life insurance — directly affecting liability measurement and unearned premium release.',
    ref: 'IFRS 17',
  },
  'unit trust': {
    label: 'Unit-linked funds',
    body: 'Investment products whose value tracks underlying investment units held for policyholders. Audit focus: existence and valuation of the underlying holdings and correct unit pricing.',
    ref: 'IFRS 17 / IFRS 9',
  },
  'segregated client money': {
    label: 'Segregated client money',
    body: 'Client funds held separately from the firm\'s own assets (brokerage client money rules). Rights-and-obligations evidence: confirmation of the segregation and reconciliation to client records.',
    ref: 'ISA 505 / regulatory frameworks',
  },
  'prime broker': {
    label: 'Prime broker',
    body: 'A bank providing bundled services (custody, financing, clearing) to institutional clients. The audit issue: confirming balances and collateral with the prime broker and understanding rehypothecation rights.',
    ref: 'ISA 502 / IFRS 9',
  },
  rehypothecation: {
    label: 'Rehypothecation',
    body: 'A custodian\'s reuse of client collateral for its own purposes. Creates rights-and-obligations and disclosure complexity — the client\'s assets may be encumbered without appearing so.',
    ref: 'IFRS 7 / IFRS 9',
  },
  'netting agreement': {
    label: 'Netting agreement',
    body: 'A contractual right to offset assets and liabilities on default or close-out (ISDA master agreements). Determines whether offsetting in the balance sheet is valid presentation.',
    ref: 'IAS 32 / IFRS 7',
  },
  'ISDA master': {
    label: 'ISDA Master Agreement',
    body: 'Standard framework for OTC derivatives between two parties: netting, collateral and default terms. Documentation underpins hedge accounting and offsetting claims.',
    ref: 'ISA 500 / IAS 32',
  },
  'margin call': {
    label: 'Margin call',
    body: 'Demand for additional collateral when exposure moves against a counterparty. Unmet margin calls crystallise counterparty risk — a subsequent-events and going-concern input.',
    ref: 'Market practice / IFRS 7',
  },
  'netting and offsetting': {
    label: 'Netting and offsetting',
    body: 'Presentation of assets and liabilities at a single net amount. Requires a legal right of set-off and intention to settle net — otherwise gross presentation is mandatory.',
    ref: 'IAS 32',
  },
  'related-party transaction': {
    label: 'Related-party transaction',
    body: 'Transactions between the entity and its related parties (directors, parent, affiliates). Must be disclosed; the risk is that terms differ from arm\'s length and identification is incomplete.',
    ref: 'IAS 24 / ISA 550',
  },
  'events after the reporting period': {
    label: 'Events after the reporting period',
    body: 'See Subsequent events. Adjusting evidence for the year-end balances arrives after the period end but before the audit report — the review window.',
    ref: 'IAS 10 / ISA 560',
  },
  'management representations': {
    label: 'Management representations',
    body: 'Written statements from management the auditor obtains near report date. Necessary audit evidence, but never a substitute for other evidence — and not sufficient on their own for material items.',
    ref: 'ISA 580',
  },
  'management override': {
    label: 'Management override of controls',
    body: 'The ability of management to bypass controls (journal entries, estimates, unusual transactions). A presumed fraud risk on every audit — the reason journals and estimates get tested on every engagement.',
    ref: 'ISA 240',
  },
  'journal entry testing': {
    label: 'Journal entry testing',
    body: 'Testing of manual journal entries for indicators of management override: late entries, round numbers, unusual accounts, weekends, senior involvement. Mandatory fraud-response procedure.',
    ref: 'ISA 240',
  },
  'test of details': {
    label: 'Tests of details',
    body: 'Substantive procedures on individual items (vouching, confirmation, inspection, recalculation) as opposed to analytical procedures. Required when risk is high — analytic evidence alone is not enough.',
    ref: 'ISA 330',
  },
  'test of controls': {
    label: 'Tests of controls',
    body: 'Procedures verifying a control operated effectively (who, when, evidence of operation). Justifies reduced substantive testing; a failing control forces substantive-only approaches.',
    ref: 'ISA 330',
  },
  walkthrough: {
    label: 'Walkthrough',
    body: 'Tracing one transaction end-to-end through the process, interviewing staff and observing controls. Used to confirm understanding of the flow and spot control gaps.',
    ref: 'ISA 315',
  },
  'substantive analytics': {
    label: 'Substantive analytical procedures',
    body: 'Using relationships and expectations (ratios, trends, modelling) as substantive evidence. Effective for predictable balances; must be precise enough to detect material misstatement.',
    ref: 'ISA 520',
  },
  'sampling risk': {
    label: 'Sampling risk',
    body: 'The risk the sample conclusion differs from the population truth. Reduced by larger samples and better selection methods; never zero — which is why high-risk assertions get bigger samples.',
    ref: 'ISA 530',
  },
  'stratified sampling': {
    label: 'Stratification',
    body: 'Splitting a population into sub-populations (e.g. by value) and sampling each separately. Big-ticket items get 100% testing; the remainder is sampled — more efficient and more precise.',
    ref: 'ISA 530',
  },
  'monetary unit sampling': {
    label: 'Monetary unit sampling',
    body: 'A sampling method where each currency unit is a sampling unit, so larger items are more likely to be selected. Efficient for overstatement testing in positive-balance populations.',
    ref: 'ISA 530',
  },
  'haphazard selection': {
    label: 'Haphazard selection',
    body: 'Non-structured, judgmental sample selection. Acceptable for small populations, but not a random method — statistical inference requires structured selection.',
    ref: 'ISA 530',
  },
  'dual-purpose test': {
    label: 'Dual-purpose testing',
    body: 'One procedure serving both control testing and substantive testing. Economical, but the sample size must satisfy both purposes to be valid.',
    ref: 'ISA 330 / ISA 530',
  },
  'external confirmation': {
    label: 'External confirmation',
    body: 'See Confirmation. Direct evidence from third parties; reliability depends on the responder\'s independence and the control the auditor has over the process.',
    ref: 'ISA 505',
  },
  'negative confirmation': {
    label: 'Negative confirmation',
    body: 'A confirmation where no reply is treated as agreement. Weaker evidence than positive confirmation — only acceptable with low risk and strong controls.',
    ref: 'ISA 505',
  },
  'exception': {
    label: 'Exception (deviation)',
    body: 'An instance where a control did not operate or a sampled item is misstated. Individually small exceptions matter: they recalibrate the error rate and can change the whole testing approach.',
    ref: 'ISA 530',
  },
  'projected misstatement': {
    label: 'Projected misstatement',
    body: 'The auditor\'s best estimate of the population error, extrapolated from sample exceptions. Added to factual misstatements and evaluated against materiality.',
    ref: 'ISA 530 / ISA 450',
  },
  'unadjusted differences': {
    label: 'Unadjusted differences',
    body: 'Misstatements the auditor accumulates but management declines to correct. Evaluated individually and in aggregate against materiality; the driver of the audit opinion if material.',
    ref: 'ISA 450',
  },
  'written audit report': {
    label: 'Audit report',
    body: 'The auditor\'s opinion on whether the statements are materially misstated. The only part of the audit file most users ever see — the opinion paragraph, KAMs and emphasis-of-matter matter most.',
    ref: 'ISA 700 / ISA 701',
  },
  'key audit matter': {
    label: 'Key audit matters (KAM)',
    body: 'The most significant matters discussed with those charged with governance, disclosed in the audit report. High-judgement areas (impairment, revenue recognition) — the issues this game trains you to spot.',
    ref: 'ISA 701',
  },
  'emphasis of matter': {
    label: 'Emphasis of matter',
    body: 'A paragraph highlighting a matter already appropriately disclosed (e.g. going-concern support). Draws the reader\'s attention without qualifying the opinion.',
    ref: 'ISA 706',
  },
  'going concern support': {
    label: 'Going concern support letter',
    body: 'A written commitment (from parent or lender) to provide financial support if needed. Strong evidence of going concern, but only reliable if the provider can and will fulfil it.',
    ref: 'ISA 570',
  },
  'sensitivity analysis': {
    label: 'Sensitivity analysis',
    body: 'Testing how outcomes change when key assumptions move. The primary way to audit estimates: if a small change flips the conclusion, the estimate\'s reliability is fragile.',
    ref: 'ISA 540',
  },
  'management expert': {
    label: 'Management\'s expert',
    body: 'A specialist (actuary, valuer, engineer) whose work the entity uses in preparing the statements. The auditor must evaluate their competence, objectivity and assumptions — not just accept the output.',
    ref: 'ISA 500 / ISA 540',
  },
  'auditor expert': {
    label: 'Auditor\'s expert',
    body: 'A specialist engaged by the auditor to provide evidence (valuations, models). Extends the auditor\'s capability but responsibility for the opinion is never transferred.',
    ref: 'ISA 620',
  },
  backlog: {
    label: 'Order backlog',
    body: 'Contracted but unfulfilled customer orders. A demand indicator used in impairment forecasts and revenue cut-off — and a place where optimistic backlog inflates forecasts.',
    ref: 'ISA 540 context',
  },
  'breakage': {
    label: 'Breakage',
    body: 'The expected portion of deferred income (gift cards, loyalty points) that will never be redeemed. Recognising breakage as revenue requires a reliable historical pattern — otherwise it stays a liability.',
    ref: 'IFRS 15',
  },
  'variable consideration': {
    label: 'Variable consideration',
    body: 'Parts of the transaction price that vary (rebates, penalties, bonuses, refunds). Constrained to amounts highly probable not to reverse — estimate-heavy and a favourite place for revenue misstatement.',
    ref: 'IFRS 15',
  },
  'performance obligation': {
    label: 'Performance obligation',
    body: 'A promise in a contract to transfer a distinct good or service. Identifying and sequencing them (point in time vs over time) determines when revenue is recognised.',
    ref: 'IFRS 15',
  },
  'transaction price': {
    label: 'Transaction price',
    body: 'The consideration the entity expects to be entitled to, adjusted for variable consideration, financing, consideration payable to the customer — the "how much" of the five-step model.',
    ref: 'IFRS 15',
  },
  'contract asset': {
    label: 'Contract asset',
    body: 'Revenue recognised before the right to payment is unconditional. Distinguished from receivables; the audit risk is the transfer-of-control judgement behind the recognition.',
    ref: 'IFRS 15',
  },
  'contract liability': {
    label: 'Contract liability',
    body: 'Obligation to transfer goods for consideration already received (deferred income). Completeness of the unfulfilled-obligation balance and cut-off of its release are the audit issues.',
    ref: 'IFRS 15',
  },
  'modified opinion': {
    label: 'Modified opinion',
    body: 'An audit opinion other than unmodified: qualified, adverse or disclaimer. Triggered by material misstatements or inability to obtain evidence.',
    ref: 'ISA 705',
  },
};

export const GLOSSARY_KEYS = Object.keys(GLOSSARY).sort((a, b) => b.length - a.length);
