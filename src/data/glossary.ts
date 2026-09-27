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
    body: 'The forward-looking impairment model: a probability-weighted estimate of credit losses. Stage 1 (12-month ECL), Stage 2 (lifetime ECL after significant increase in risk), Stage 3 (credit-impaired). Estimation-heavy; a valuation-risk magnet.',
    ref: 'IFRS 9',
  },
  ecl: {
    label: 'ECL',
    body: 'See Expected credit loss.',
    ref: 'IFRS 9',
  },
  'fair value': {
    label: 'Fair value',
    body: 'The price to sell an asset or transfer a liability in an orderly transaction between market participants. Falls back on observable prices; where none exist, models and assumptions drive it; the deeper into the fair value hierarchy (Levels 1→3), the higher the estimation risk.',
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
    body: 'The amount at which an asset or liability is recognised in the balance sheet; cost or revalued amount, less accumulated depreciation and impairment. The "wrong number here" is a valuation assertion failure.',
    ref: 'IAS 16 / IFRS 13',
  },
  goodwill: {
    label: 'Goodwill',
    body: 'The excess of acquisition cost over identifiable net assets. Not amortised but tested for impairment annually at the CGU level. Highly judgement-dependent: forecasts, discount rates and growth assumptions drive the result.',
    ref: 'IFRS 3 / IAS 36',
  },
  cgu: {
    label: 'CGU (cash-generating unit)',
    body: 'The smallest group of assets generating largely independent cash inflows. Goodwill and intangibles are tested for impairment at this level; how the CGU is defined materially changes the impairment result.',
    ref: 'IAS 36',
  },
  'deferred tax': {
    label: 'Deferred tax',
    body: 'Future tax consequences of temporary differences between accounting and tax treatment of assets/liabilities. Complex, estimate-heavy (future rates, recoverability), and a favourite hiding place for classification and valuation misstatements.',
    ref: 'IAS 12',
  },
  derivative: {
    label: 'Derivative',
    body: 'A contract whose value changes with an underlying (rate, price, index). Usually at fair value through profit or loss, mostly Level 2/3; model-driven and estimation-risk heavy.',
    ref: 'IFRS 9',
  },
  hedge: {
    label: 'Hedge accounting',
    body: 'Adjusting the recognition of hedging instrument and hedged item so gains/losses align in the same period. Requires formal designation, effectiveness testing and documentation; lots of disclosure, lots of traps.',
    ref: 'IFRS 9',
  },
  swap: {
    label: 'Swap',
    body: 'A derivative exchanging cash flow streams; most commonly fixed-for-floating interest rate swap. Treasury departments use them to manage rate exposure; valuation and hedge-designation are the audit issues.',
    ref: 'IFRS 9',
  },
  'forward contract': {
    label: 'Forward contract',
    body: 'An OTC agreement to buy/sell an asset at a set price on a future date. Unlike exchange-traded futures, no daily margining; valuation is model-based and counterparty risk sits in the fair value.',
    ref: 'IFRS 9 / IFRS 13',
  },
  'net asset value': {
    label: 'Net asset value (NAV)',
    body: 'Assets minus liabilities, typically per share/unit for funds. Fund NAVs price daily investor dealing; a wrong NAV means real cash errors to investors, so valuation and allocation risks dominate.',
    ref: 'IFRS as applied to funds',
  },
  nav: {
    label: 'NAV',
    body: 'See Net asset value.',
  },
  actuarial: {
    label: 'Actuarial valuation',
    body: 'Estimating obligations and costs of insurance/pension liabilities using demographic and financial assumptions (mortality, discount rates, lapse). The deepest estimation zone in accounting; small assumption shifts swing the numbers by millions.',
    ref: 'IFRS 17 / IAS 19',
  },
  reinsurance: {
    label: 'Reinsurance',
    body: 'Insurance bought by an insurer to cede part of its risk. Recognition of recoverables is estimate-heavy: is the counterparty good for it, is timing matched to the claim, is it truly risk-transfer rather than disguised financing?',
    ref: 'IFRS 17',
  },
  underwriting: {
    label: 'Underwriting',
    body: 'Assessing and pricing risk before accepting it (insurance/lending). Underwriting quality drives the loss assumptions inside ECL, IBNR and actuarial estimates; a root cause of valuation risk.',
    ref: 'IFRS 17 / IFRS 9',
  },
  custodian: {
    label: 'Custodian',
    body: 'An institution holding clients\u2019 securities for safekeeping. Fund auditors confirm holdings directly with custodians; a core existence/rights test for investment assets.',
    ref: 'ISA 505',
  },
  confirmation: {
    label: 'Confirmation',
    body: 'Direct written response from a third party (bank, customer, lender, custodian, lawyer) verifying a balance or condition. High reliability because it is external; but it tests existence/accuracy, NOT completeness.',
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
    body: 'Transactions recorded in the correct accounting period. Year-end testing centres on the last and first weeks of the period; goods-in-transit, invoices held back, December costs booked in January.',
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
    body: 'Entities/people with control, joint control or significant influence over the entity. Transactions with them may not be at arm\u2019s length; completeness of identification and disclosure is the audit challenge; the parties are often deliberately opaque.',
    ref: 'IAS 24 / ISA 550',
  },
  'deferred income': {
    label: 'Deferred income',
    body: 'Cash received before the related good/service is delivered; a liability until earned. Contract balances and remaining-performance-obligations drive it; cut-off and completeness risks dominate.',
    ref: 'IFRS 15',
  },
  'revenue recognition': {
    label: 'Revenue recognition',
    body: 'Recognising revenue when (or as) performance obligations are satisfied, at the transaction price. Five-step model. Presumed fraud risk under ISA 240; the classic battle-ground assertion is occurrence and cut-off.',
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
    body: 'Interest and similar costs directly attributable to qualifying asset construction. Must be capitalised during construction, not expensed; timing and scope are cut-off/classification issues.',
    ref: 'IAS 23',
  },
  'useful life': {
    label: 'Useful life',
    body: 'The period over which an asset is depreciated or amortised. An estimate; stretching it protects profit, shrinking it accelerates expense. Valuation assertion territory.',
    ref: 'IAS 16 / IAS 38',
  },
  'inventory count': {
    label: 'Inventory count',
    body: 'Physical verification of inventory quantities at the reporting date. Attendance tests existence and completeness of the count itself; slow-moving/obsolete assessment is valuation.',
    ref: 'ISA 501',
  },
  consignment: {
    label: 'Consignment stock',
    body: 'Inventory held by one party but owned by another (the consignor) until sold. Rights-and-obligations risk: the stock is physically present but not the client\u2019s; a classic trap in inventory counts.',
    ref: 'IFRS 15 / IFRS 16 concepts',
  },
  'work in progress': {
    label: 'Work in progress (WIP)',
    body: 'Partially-completed goods or contracts at period end. Valuation relies on percentage-complete estimates; existence relies on the physical state of the work; both fail together when cost-to-complete forecasts are wrong.',
    ref: 'IAS 2 / IFRS 15',
  },
  factoring: {
    label: 'Factoring',
    body: 'Selling receivables to a factor at a discount for immediate cash. Recourse terms determine whether the receivable is truly derecognised or is really a disguised borrowing; substance over form.',
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
    body: 'Receivables/payables between group entities. Eliminated on consolidation, but only if identified; completeness and elimination-cut-off are the risks; balances with related parties need disclosure too.',
    ref: 'IFRS 10 / IAS 24',
  },
  'transfer pricing': {
    label: 'Transfer pricing',
    body: 'Pricing of transactions between related entities in different tax jurisdictions. Arm\u2019s-length benchmarking and documentation requirements; mispricing shifts profit between tax regimes; classification and disclosure risk.',
    ref: 'IAS 24 / OECD guidelines',
  },
  consolidation: {
    label: 'Consolidation',
    body: 'Combining parent and controlled subsidiaries into one economic entity. Control assessment (risk vs reward, SPVs) determines the perimeter; a wrong perimeter is a presentation-level misstatement of everything.',
    ref: 'IFRS 10',
  },
  milestone: {
    label: 'Milestone revenue',
    body: 'Revenue recognised on achieving contract milestones. Transfer-of-control judgement (is the milestone a genuine performance obligation, or just a payment schedule?) drives both timing and amount.',
    ref: 'IFRS 15',
  },
  'prepayment': {
    label: 'Prepayment',
    body: 'Cash paid before the related expense is incurred; an asset until the benefit is consumed. Cut-off risk at both ends of the period; ageing prepayments that should have been expensed are a classic find.',
    ref: 'IAS 1',
  },
  'unearned premium': {
    label: 'Unearned premium',
    body: 'The portion of insurance premium relating to the unexpired period of cover. Earned over the coverage period; a timing (cut-off) estimate, calculated pro-rata or by actuarial method.',
    ref: 'IFRS 17',
  },
  crypto: {
    label: 'Crypto-assets',
    body: 'Digitally-recorded assets (tokens, stablecoins) without a single accounting home; held-for-sale, intangible or inventory depending on the business model. Valuation evidence and custody are the dominant risks.',
    ref: 'IAS 38 / IFRS interpretations',
  },
  token: {
    label: 'Token',
    body: 'A digital unit recorded on a blockchain, representing anything from a currency claim to a utility right. Accounting classification (asset? liability? equity?) is unsettled; judgement and disclosure risk.',
    ref: 'IAS 38',
  },
  'loan-to-value': {
    label: 'Loan-to-value (LTV)',
    body: 'Loan amount divided by collateral value. A monitoring covenant in lending; valuation of collateral (often Level 3 property appraisals) feeds both ECL and disclosure.',
    ref: 'IFRS 9 / IFRS 13',
  },
  'discount rate': {
    label: 'Discount rate',
    body: 'The rate used to convert future cash flows to present value. Small changes have enormous effects on lease liabilities, provisions, impairments and pensions; the single most sensitive estimate input.',
    ref: 'IAS 19 / IAS 36 / IFRS 16',
  },
  'present value': {
    label: 'Present value',
    body: 'The current worth of future cash flows, discounted at an appropriate rate. Ubiquitous in liabilities, impairment tests and lease accounting; and always assumption-dependent.',
    ref: 'Conceptual Framework',
  },
  'functional currency': {
    label: 'Functional currency',
    body: 'The currency of the primary economic environment in which the entity operates. Determines what is "monetary" vs "non-monetary" for translation; wrong classification creates FX gains/losses in the wrong places.',
    ref: 'IAS 21',
  },
  'subsequent events': {
    label: 'Subsequent events',
    body: 'Events after the reporting date but before the financial statements are issued. Adjusting events change the numbers; non-adjusting events need disclosure. Reviewing them is a key completeness procedure.',
    ref: 'IAS 10 / ISA 560',
  },
  'analytical review': {
    label: 'Analytical review',
    body: 'Studying relationships between financial and non-financial data; ratios, trends, expectations; to spot inconsistencies. Powerful for risk assessment, weaker as a stand-alone substantive test.',
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
    body: 'Receivables bucketed by how long outstanding. Feeds the ECL/allowance estimate and exposes collection problems; analytical review gold.',
    ref: 'IFRS 9 / ISA 520',
  },
  nrv: {
    label: 'Net realisable value (NRV)',
    body: 'Estimated selling price minus costs to complete and sell. Inventory is carried at the lower of cost and NRV; where selling prices fall or stock ages, NRV write-downs are the valuation risk.',
    ref: 'IAS 2',
  },
  obsolescence: {
    label: 'Obsolescence',
    body: 'The decline in an asset\'s or inventory\'s usefulness or saleability through age, technology or demand shifts. Drives impairment of fixed assets and NRV write-downs of stock; an estimate that management tends to postpone.',
    ref: 'IAS 2 / IAS 36',
  },
  'slow-moving': {
    label: 'Slow-moving stock',
    body: 'Inventory with little or no movement over extended periods; a leading indicator of obsolescence and NRV write-down needs. Ageing analysis is the standard evidence.',
    ref: 'IAS 2',
  },
  fifo: {
    label: 'FIFO (first-in, first-out)',
    body: 'Cost flow assumption that the oldest goods are sold first. In rising price environments it leaves newer (higher) costs in closing inventory; in falling environments the reverse; the method choice directly moves both cost of sales and inventory values.',
    ref: 'IAS 2',
  },
  'weighted average': {
    label: 'Weighted average cost',
    body: 'Inventory costing method that smooths purchase prices into a single average cost per unit. Less sensitive to purchase timing than FIFO, but the averaging calculation itself must be tested for accuracy.',
    ref: 'IAS 2',
  },
  'standard cost': {
    label: 'Standard costing',
    body: 'Predetermined unit costs used to value inventory and measure variances. The audit question is whether standards reasonably approximate actual cost at period end; unrealistic standards misstate both inventory and cost of sales.',
    ref: 'IAS 2',
  },
  wip: {
    label: 'WIP (work in progress)',
    body: 'See Work in progress. Partially complete production or contracts at period end; the valuation of which depends on completion-percentage estimates.',
    ref: 'IAS 2 / IFRS 15',
  },
  'finished goods': {
    label: 'Finished goods',
    body: 'Completed inventory ready for sale, carried at cost or NRV. Cut-off between WIP and finished goods, and NRV of unsold units, are the recurring audit issues.',
    ref: 'IAS 2',
  },
  lcm: {
    label: 'Lower of cost and NRV',
    body: 'The IAS 2 measurement rule: inventory is carried at whichever is lower, cost or net realisable value. The comparison must happen at least annually; and NRV falls are frequently recognised late.',
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
    body: 'A fixed-balance arrangement (petty cash, dividends accounts): the balance stays constant and is only restored by documented reimbursement. Makes shortages obvious; a strong completeness/existence control.',
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
    body: 'Revenue recognised while goods remain with the seller under customer instruction. Legitimate only under strict criteria (customer controls the goods, segregation, no resale); otherwise it is premature recognition.',
    ref: 'IFRS 15',
  },
  'channel stuffing': {
    label: 'Channel stuffing',
    body: 'Pushing more product into distribution than the market demands near period end to inflate revenue. Detected via distributor inventory levels, returns history and credit terms loosening.',
    ref: 'IFRS 15 / ISA 240',
  },
  'side agreement': {
    label: 'Side agreement',
    body: 'A separate, undisclosed contract modifying the apparent terms of a sale (return rights, price protection). Evidence that the recorded revenue does not reflect the real arrangement; occurrence risk.',
    ref: 'IFRS 15 / ISA 240',
  },
  derecognition: {
    label: 'Derecognition',
    body: 'Removal of an asset or liability from the balance sheet when the rights, or the obligation, have expired or been transferred. The risk is premature derecognition (factoring with recourse, repo-style sales).',
    ref: 'IFRS 9',
  },
  recourse: {
    label: 'Recourse',
    body: 'The transferor\'s obligation to repurchase or compensate for transferred assets (e.g. factored receivables that default). Recourse means risks have not truly transferred; usually blocking derecognition.',
    ref: 'IFRS 9',
  },
  'expected loss': {
    label: 'Expected loss model',
    body: 'Impairment approach (ECL) recognising losses before they occur, based on probability weighting. Contrasts with incurred-loss models; the judgement moved from "has it happened" to "how likely is it".',
    ref: 'IFRS 9',
  },
  'credit-impaired': {
    label: 'Credit-impaired (Stage 3)',
    body: 'A financial asset where a credit event has already occurred (default, bankruptcy). Interest is accrued on net carrying amount and lifetime ECL applies; the deepest level of impairment recognition.',
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
    body: 'Concessions granted to a borrower in difficulty (extended terms, waived covenants, reduced rates). Modifies the loan\'s contractual cash flows; ECL and staging must reflect the new reality, and disclosure is required.',
    ref: 'IFRS 9 / IFRS 7',
  },
  'probability-weighted': {
    label: 'Probability-weighted outcome',
    body: 'An estimate computed across multiple scenarios and their likelihoods; the core mechanism of ECL. The audit question is whether the scenario set is complete and unbiased.',
    ref: 'IFRS 9',
  },
  'forward-looking': {
    label: 'Forward-looking information',
    body: 'Macroeconomic and entity-specific forecasts used in ECL and impairment models. The judgement zone: which indicators, over what horizon, with what sensitivity; small input changes swing provisions.',
    ref: 'IFRS 9',
  },
  pd: {
    label: 'PD (probability of default)',
    body: 'The likelihood a borrower defaults within a given horizon; a core ECL input, derived from internal ratings, external scores or market data. Model governance is the audit focus.',
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
    body: 'Insurance claims that have happened but not yet been reported to the insurer at the reporting date. Estimated actuarially; the classic insurance completeness and valuation risk.',
    ref: 'IFRS 17',
  },
  'claims reserve': {
    label: 'Claims reserve',
    body: 'The liability for outstanding insurance claims: reported case estimates plus IBNR. Actuarial estimates of frequency and severity drive it; small assumption changes move it materially.',
    ref: 'IFRS 17',
  },
  'risk adjustment': {
    label: 'Risk adjustment (IFRS 17)',
    body: 'The compensation the entity requires for bearing uncertainty about future cash flows; a non-financial-risk margin in insurance contract liabilities. Highly judgemental; disclosure of the method is mandatory.',
    ref: 'IFRS 17',
  },
  'discount rate (unlocking)': {
    label: 'Discount unlocking',
    body: 'The effect of changing a discount rate or other estimate between periods, requiring restatement of the liability build-up. Frequent target of manipulation when results need smoothing.',
    ref: 'IFRS 17 / IAS 19',
  },
  'reinsurance recoverable': {
    label: 'Reinsurance recoverable',
    body: 'The insurer\'s asset for amounts recoverable from reinsurers. A valuation estimate dependent on reinsurer credit quality and claim development; and a classic place for optimistic provisioning.',
    ref: 'IFRS 17',
  },
  lapse: {
    label: 'Lapse rate',
    body: 'The proportion of insurance policies that terminate early through non-payment or surrender. A core actuarial assumption in life insurance; directly affecting liability measurement and unearned premium release.',
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
    ref: 'ISA 505 / IFRS 9',
  },
  rehypothecation: {
    label: 'Rehypothecation',
    body: 'A custodian\'s reuse of client collateral for its own purposes. Creates rights-and-obligations and disclosure complexity; the client\'s assets may be encumbered without appearing so.',
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
    body: 'Demand for additional collateral when exposure moves against a counterparty. Unmet margin calls crystallise counterparty risk; a subsequent-events and going-concern input.',
    ref: 'Market practice / IFRS 7',
  },
  'netting and offsetting': {
    label: 'Netting and offsetting',
    body: 'Presentation of assets and liabilities at a single net amount. Requires a legal right of set-off and intention to settle net; otherwise gross presentation is mandatory.',
    ref: 'IAS 32',
  },
  'related-party transaction': {
    label: 'Related-party transaction',
    body: 'Transactions between the entity and its related parties (directors, parent, affiliates). Must be disclosed; the risk is that terms differ from arm\'s length and identification is incomplete.',
    ref: 'IAS 24 / ISA 550',
  },
  'events after the reporting period': {
    label: 'Events after the reporting period',
    body: 'See Subsequent events. Adjusting evidence for the year-end balances arrives after the period end but before the audit report; the review window.',
    ref: 'IAS 10 / ISA 560',
  },
  'management representations': {
    label: 'Management representations',
    body: 'Written statements from management the auditor obtains near report date. Necessary audit evidence, but never a substitute for other evidence; and not sufficient on their own for material items.',
    ref: 'ISA 580',
  },
  'management override': {
    label: 'Management override of controls',
    body: 'The ability of management to bypass controls (journal entries, estimates, unusual transactions). A presumed fraud risk on every audit; the reason journals and estimates get tested on every engagement.',
    ref: 'ISA 240',
  },
  'journal entry testing': {
    label: 'Journal entry testing',
    body: 'Testing of manual journal entries for indicators of management override: late entries, round numbers, unusual accounts, weekends, senior involvement. Mandatory fraud-response procedure.',
    ref: 'ISA 240',
  },
  'test of details': {
    label: 'Tests of details',
    body: 'Substantive procedures on individual items (vouching, confirmation, inspection, recalculation) as opposed to analytical procedures. Required when risk is high; analytic evidence alone is not enough.',
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
    body: 'The risk the sample conclusion differs from the population truth. Reduced by larger samples and better selection methods; never zero; which is why high-risk assertions get bigger samples.',
    ref: 'ISA 530',
  },
  'stratified sampling': {
    label: 'Stratification',
    body: 'Splitting a population into sub-populations (e.g. by value) and sampling each separately. Big-ticket items get 100% testing; the remainder is sampled; more efficient and more precise.',
    ref: 'ISA 530',
  },
  'monetary unit sampling': {
    label: 'Monetary unit sampling',
    body: 'A sampling method where each currency unit is a sampling unit, so larger items are more likely to be selected. Efficient for overstatement testing in positive-balance populations.',
    ref: 'ISA 530',
  },
  'haphazard selection': {
    label: 'Haphazard selection',
    body: 'Non-structured, judgmental sample selection. Acceptable for small populations, but not a random method; statistical inference requires structured selection.',
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
    body: 'A confirmation where no reply is treated as agreement. Weaker evidence than positive confirmation; only acceptable with low risk and strong controls.',
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
    body: 'The auditor\'s opinion on whether the statements are materially misstated. The only part of the audit file most users ever see; the opinion paragraph, KAMs and emphasis-of-matter matter most.',
    ref: 'ISA 700 / ISA 701',
  },
  'key audit matter': {
    label: 'Key audit matters (KAM)',
    body: 'The most significant matters discussed with those charged with governance, disclosed in the audit report. High-judgement areas (impairment, revenue recognition); the issues this game trains you to spot.',
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
    body: 'A specialist (actuary, valuer, engineer) whose work the entity uses in preparing the statements. The auditor must evaluate their competence, objectivity and assumptions; not just accept the output.',
    ref: 'ISA 500 / ISA 540',
  },
  'auditor expert': {
    label: 'Auditor\'s expert',
    body: 'A specialist engaged by the auditor to provide evidence (valuations, models). Extends the auditor\'s capability but responsibility for the opinion is never transferred.',
    ref: 'ISA 620',
  },
  backlog: {
    label: 'Order backlog',
    body: 'Contracted but unfulfilled customer orders. A demand indicator used in impairment forecasts and revenue cut-off; and a place where optimistic backlog inflates forecasts.',
    ref: 'ISA 540 context',
  },
  'breakage': {
    label: 'Breakage',
    body: 'The expected portion of deferred income (gift cards, loyalty points) that will never be redeemed. Recognising breakage as revenue requires a reliable historical pattern; otherwise it stays a liability.',
    ref: 'IFRS 15',
  },
  'variable consideration': {
    label: 'Variable consideration',
    body: 'Parts of the transaction price that vary (rebates, penalties, bonuses, refunds). Constrained to amounts highly probable not to reverse; estimate-heavy and a favourite place for revenue misstatement.',
    ref: 'IFRS 15',
  },
  'performance obligation': {
    label: 'Performance obligation',
    body: 'A promise in a contract to transfer a distinct good or service. Identifying and sequencing them (point in time vs over time) determines when revenue is recognised.',
    ref: 'IFRS 15',
  },
  'transaction price': {
    label: 'Transaction price',
    body: 'The consideration the entity expects to be entitled to, adjusted for variable consideration, financing, consideration payable to the customer; the "how much" of the five-step model.',
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
  arrears: {
    label: 'Arrears',
    body: 'Amounts that fell due and remain unpaid, typically loan or rent instalments past their due date. Arrears trigger default classification, impairment staging and covenant breaches, so the accuracy and completeness of the arrears position drive both ECL and going concern.',
    ref: 'IFRS 9 / ISA 540 (Revised)',
  },
  collateral: {
    label: 'Collateral',
    body: 'Assets pledged by a borrower to secure a loan, which the lender can claim on default. The audit issues are the existence and valuation of the pledged assets, the enforceability of the security, and whether encumbrances are properly disclosed.',
    ref: 'IFRS 7 / IFRS 9',
  },
  'working capital': {
    label: 'Working capital',
    body: 'Current assets minus current liabilities: the cushion funding day-to-day operations. Working capital swings move operating cash flow, and overstated inventory or receivables inflate it; a going concern assessment starts here.',
    ref: 'IAS 1 / ISA 570',
  },
  'credit facility': {
    label: 'Credit facility',
    body: 'An agreed borrowing arrangement with a lender: term loans, revolvers or overdrafts. The audit issues are completeness of drawn and undrawn amounts, covenant compliance, and classification between current and non-current.',
    ref: 'IFRS 9 / IAS 1',
  },
  'revolving credit facility': {
    label: 'Revolving credit facility',
    body: 'A borrowing facility that can be drawn and repaid repeatedly up to a limit. Classification depends on whether the entity has an unconditional right to defer settlement at least twelve months; breaches that suspend redraw are a going concern signal.',
    ref: 'IFRS 9 / IAS 1',
  },
  'letter of credit': {
    label: 'Letter of credit',
    body: 'A bank\u2019s undertaking to pay a seller on presentation of specified documents, guaranteeing the buyer\u2019s obligation. The audit issues are whether it is a guarantee, a commitment or a financial liability, and whether the contingency is disclosed.',
    ref: 'IAS 37 / IFRS 9',
  },
  headroom: {
    label: 'Headroom',
    body: 'The margin by which a covenant test passes, or capacity left under a borrowing limit. Thin or shrinking headroom signals default risk and management pressure to reclassify or adjust the measure the covenant references.',
    ref: 'IFRS 7 / ISA 570',
  },
  waiver: {
    label: 'Covenant waiver',
    body: 'A lender\u2019s agreement not to enforce a breached covenant, usually temporary and often fee-bearing. The audit issues are the period the waiver covers, its conditions, disclosure of the breach, and the going concern assessment while it stands.',
    ref: 'IAS 1 / IFRS 7 / ISA 570',
  },
  'amortization schedule': {
    label: 'Amortization schedule',
    body: 'The contractual table of interest and principal repayments over a loan\u2019s life. Auditors recompute it to test the accuracy of interest expense and the current/non-current split; renegotiations change it prospectively.',
    ref: 'IFRS 9',
  },
  'balloon payment': {
    label: 'Balloon payment',
    body: 'A disproportionately large final repayment at the end of a loan. Refinancing risk concentrates at maturity, so the entity\u2019s ability to refinance becomes a going concern question.',
    ref: 'IFRS 9 / ISA 570',
  },
  overdraft: {
    label: 'Overdraft',
    body: 'A bank borrowing facility repayable on demand. Classically a current liability; the going concern question arises when the bank can withdraw the facility and refinancing is uncertain.',
    ref: 'IAS 1 / ISA 570',
  },
  'loan note': {
    label: 'Loan note',
    body: 'A debt instrument acknowledging a borrowing, usually with fixed interest and maturity terms. The audit issues are completeness of notes issued, accuracy of accreting interest, and classification between debt and equity when convertible.',
    ref: 'IFRS 9 / IAS 32',
  },
  'shareholder loan': {
    label: 'Shareholder loan',
    body: 'Lending from an owner to the entity, often subordinated and informal. The audit issues are whether it is genuinely debt rather than disguised equity, its terms, and whether repayment expectations interact with going concern.',
    ref: 'IAS 32 / ISA 570',
  },
  'intercompany loan': {
    label: 'Intercompany loan',
    body: 'Borrowing between group entities, eliminated on consolidation only if correctly identified and measured. Terms at variance with market rates shift profit between tax jurisdictions; interest accrual and elimination are recurring audit issues.',
    ref: 'IAS 24 / IFRS 10',
  },
  'probability of default': {
    label: 'Probability of default (PD)',
    body: 'The likelihood a borrower defaults within a given horizon. A direct ECL input, derived from internal or external models; the audit issue is whether the model\u2019s data and assumptions reflect current conditions.',
    ref: 'IFRS 9 / ISA 540 (Revised)',
  },
  'credit risk': {
    label: 'Credit risk',
    body: 'The risk a counterparty fails to meet its obligations. It drives ECL provisioning, concentration disclosures and collateral demands; the audit issues are whether exposures, staging and concentration are completely captured.',
    ref: 'IFRS 9 / IFRS 7',
  },
  'counterparty risk': {
    label: 'Counterparty risk',
    body: 'The risk the other side of a transaction defaults before settlement. Most acute in derivatives and repos; the audit issues are netting enforceability, collateral held and the fair value of the exposure.',
    ref: 'IFRS 9 / IFRS 13',
  },
  'effective interest rate': {
    label: 'Effective interest rate (EIR)',
    body: 'The rate exactly discounting contractual cash flows to the instrument\u2019s carrying amount. The engine of amortized cost accounting: fees, discounts and estimates of future losses all accrete through it. Recomputation is the standard accuracy test.',
    ref: 'IFRS 9',
  },
  'yield curve': {
    label: 'Yield curve',
    body: 'The set of interest rates across maturities. Auditors use it to test the discount rates inside valuations and ECL models; a curve that moves after year end can be a subsequent event but rarely adjusts the numbers.',
    ref: 'IFRS 13 / IFRS 9',
  },
  'interest coverage': {
    label: 'Interest coverage',
    body: 'Earnings before interest and tax divided by interest expense; a covenant measuring ability to service debt. The definition in the facility agreement governs, and adjustments to EBITDA are where manipulation shows.',
    ref: 'IFRS 7 / ISA 570',
  },
  ebitda: {
    label: 'EBITDA',
    body: 'Earnings before interest, tax, depreciation and amortization; a rough proxy for operating cash generation. Not an IFRS measure, so its definition varies; covenant EBITDA is defined in the facility agreement and often adjusted, which is where the audit attention falls.',
    ref: 'IAS 1 (non-IFRS measure)',
  },
  'refinancing risk': {
    label: 'Refinancing risk',
    body: 'The risk that borrowings cannot be rolled over at maturity on acceptable terms. It feeds the going concern assessment; auditors look for committed facilities and lender appetite, not management optimism.',
    ref: 'ISA 570',
  },
  'debt restructuring': {
    label: 'Debt restructuring',
    body: 'Renegotiation of borrowing terms: rate cuts, extensions, conversions. The accounting questions are whether old debt is extinguished and new issued, whether the gain or loss is measured correctly, and whether terms changed substance or just schedule.',
    ref: 'IFRS 9',
  },
  'money market fund': {
    label: 'Money market fund',
    body: 'A fund investing in short-term, high-quality debt instruments. The audit issues are fair value (amortized cost versus mark-to-market), redemption gates in stress, and existence of holdings confirmed with the administrator.',
    ref: 'IFRS 9 / IFRS 10',
  },
  deposit: {
    label: 'Deposit',
    body: 'Cash placed with a bank, typically interest-bearing and repayable per contract. The audit issues are existence (direct bank confirmation), completeness (unrecorded deposits) and classification (notice periods affecting current status).',
    ref: 'IAS 1 / ISA 505',
  },
  'certificate of deposit': {
    label: 'Certificate of deposit (CD)',
    body: 'A negotiable bank deposit with fixed maturity and interest. CDs are held at amortized cost or fair value depending on the business model; existence is confirmed with the issuing bank, and negotiability affects liquidity classification.',
    ref: 'IFRS 9',
  },
  'repurchase agreement': {
    label: 'Repurchase agreement (repo)',
    body: 'Selling securities with a commitment to repurchase, economically a secured loan. The accounting question is whether the securities stay on the balance sheet; the transfer fails derecognition when the repurchase obligation remains.',
    ref: 'IFRS 9 / IFRS 10',
  },
  'fund administrator': {
    label: 'Fund administrator',
    body: 'The agent computing NAV and maintaining the register. Administrators are a service organisation: the auditor assesses their controls and often obtains a service organisation report before relying on their valuations.',
    ref: 'ISA 402',
  },
  'investment property': {
    label: 'Investment property',
    body: 'Property held to earn rentals or for capital appreciation rather than use. Fair value or cost model is a policy choice with full disclosure; valuation relies on appraisers whose work the auditor evaluates.',
    ref: 'IAS 40',
  },
  'fair value hierarchy': {
    label: 'Fair value hierarchy',
    body: 'Level 1: quoted prices in active markets. Level 2: observable inputs. Level 3: unobservable, model-driven inputs. The deeper the level, the higher the estimation risk and the more audit attention the valuation needs.',
    ref: 'IFRS 13',
  },
  'valuation technique': {
    label: 'Valuation technique',
    body: 'The model producing a fair value: market, cost or income approach. The auditor evaluates whether the technique suits the asset, whether inputs are observable, and whether management\u2019s model reflects how market participants would price it.',
    ref: 'IFRS 13 / ISA 540 (Revised)',
  },
  'market approach': {
    label: 'Market approach',
    body: 'Valuing using prices from market transactions in comparable assets. Preferred when data exists; the audit issue is whether the comparables genuinely match, especially in thin markets.',
    ref: 'IFRS 13',
  },
  'income approach': {
    label: 'Income approach',
    body: 'Valuing by discounting expected cash flows. The assumptions (growth, discount rate, terminal value) are where management bias lives; auditors test the support for each input rather than the arithmetic.',
    ref: 'IFRS 13 / ISA 540 (Revised)',
  },
  'held-to-maturity': {
    label: 'Held-to-maturity (HTM)',
    body: 'A business model aiming to collect contractual cash flows, measured at amortized cost. Selling HTM assets casts doubt on the whole model; interest accretion via EIR and impairment via ECL are the audit issues.',
    ref: 'IFRS 9',
  },
  'debt security': {
    label: 'Debt security',
    body: 'A tradable borrowing instrument such as a bond or note. The audit issues are the business model classification, fair value versus amortized cost, and existence confirmed with custodians or registers.',
    ref: 'IFRS 9',
  },
  'credit spread': {
    label: 'Credit spread',
    body: 'The extra yield over the risk-free rate compensating for default risk. Spreads widen in stress and are an observable input to fair value and ECL discounting; the audit issue is the source and freshness of spread data.',
    ref: 'IFRS 13 / IFRS 9',
  },
  'interest rate risk': {
    label: 'Interest rate risk',
    body: 'Exposure to rate changes, felt in fair values, cash costs and hedge effectiveness. Disclosures require sensitivity analysis; the audit tests the data and assumptions behind it.',
    ref: 'IFRS 7',
  },
  'currency risk': {
    label: 'Currency risk',
    body: 'Exposure to exchange rate moves on monetary assets and liabilities. Monetary items re-translate at closing rate with gains and losses in profit; hedge relationships must be designated and documented, and disclosure requires sensitivity analysis.',
    ref: 'IAS 21 / IFRS 7',
  },
  'monetary item': {
    label: 'Monetary item',
    body: 'An asset or liability to receive or pay a fixed currency amount. Monetary items re-translate at closing rate with gains and losses in profit; misclassifying monetary versus non-monetary puts FX effects in the wrong place.',
    ref: 'IAS 21',
  },
  'closing rate': {
    label: 'Closing rate',
    body: 'The exchange rate at the reporting date, used to re-translate monetary items and foreign operations. The spot rate at close of business governs; the source and time of the rate are accuracy issues.',
    ref: 'IAS 21',
  },
  'presentation currency': {
    label: 'Presentation currency',
    body: 'The currency the statements are presented in, which can differ from the functional currency. Translation of the functional results into presentation currency is mechanical, but the closing rate applied to equity items draws audit attention.',
    ref: 'IAS 21',
  },
  'operating cycle': {
    label: 'Operating cycle',
    body: 'The time from acquiring inputs to collecting cash from customers. Items expected to be realised within the cycle count as current; cycle assumptions affect inventory and receivable classification.',
    ref: 'IAS 1',
  },
  'liquidity risk': {
    label: 'Liquidity risk',
    body: 'The risk an entity cannot meet obligations as they fall due. Disclosures require maturity analysis; the audit checks completeness of the maturity data and the going concern link when facilities are concentrated.',
    ref: 'IFRS 7 / ISA 570',
  },
  'concentration risk': {
    label: 'Concentration risk',
    body: 'Exposure to a single counterparty, sector or region large enough to change the risk profile. Hidden concentrations distort risk disclosure; the audit tests whether the exposure data feeding the disclosure is complete.',
    ref: 'IFRS 7 / IFRS 9',
  },
  'other comprehensive income': {
    label: 'Other comprehensive income (OCI)',
    body: 'Income and expense recognised outside profit or loss: revaluation surplus, FX translation, cash flow hedges, FVOCI movements. What sits in OCI versus profit shapes the performance story; classification and recycling are the audit issues.',
    ref: 'IAS 1 / IFRS 9',
  },
  'revaluation surplus': {
    label: 'Revaluation surplus',
    body: 'The uplift from carrying a class of assets at fair value, recognised in OCI. It inflates equity without cash backing; the audit issues are the valuation evidence and the consistency of the revaluation model within the class.',
    ref: 'IAS 16 / IAS 38',
  },
  'impairment loss': {
    label: 'Impairment loss',
    body: 'The write-down when carrying amount exceeds recoverable amount. Timing and measurement are judgement-heavy; for goodwill it is allocated to cash-generating units, and the audit focuses on forecasts and discount rates.',
    ref: 'IAS 36 / IFRS 9',
  },
  'recoverable amount': {
    label: 'Recoverable amount',
    body: 'The higher of fair value less costs of disposal and value in use. The impairment benchmark; value in use rests on cash flow forecasts, which is where management bias enters and audit attention concentrates.',
    ref: 'IAS 36',
  },
  'value in use': {
    label: 'Value in use',
    body: 'Present value of the cash flows an asset is expected to generate. Discount rate and growth assumptions dominate the result; the auditor tests support for the forecasts, not just the arithmetic.',
    ref: 'IAS 36 / ISA 540 (Revised)',
  },
  'corporate asset': {
    label: 'Corporate assets',
    body: 'Assets like head-office buildings that serve multiple cash-generating units. They are allocated to CGUs on a reasonable and consistent basis for impairment testing; allocation changes can mask impairment.',
    ref: 'IAS 36',
  },
  'capitalised development cost': {
    label: 'Capitalised development costs',
    body: 'Development expenditure meeting strict criteria and recognised as an intangible. Criteria assessment (technical feasibility, intention, resources) is judgement-heavy and a classic place to park costs that should be expensed.',
    ref: 'IAS 38',
  },
  'internally generated goodwill': {
    label: 'Internally generated goodwill',
    body: 'Value a business builds up organically, which accounting prohibits recognising. Any balance purporting to be it must be expensed; its appearance in statements is a presentation failure.',
    ref: 'IAS 38',
  },
  'residual value': {
    label: 'Residual value',
    body: 'The amount an entity expects to obtain from an asset at the end of its useful life. Depreciation stops at residual value; optimistic residuals understate expense and overstate assets.',
    ref: 'IAS 16',
  },
  'component accounting': {
    label: 'Component accounting',
    body: 'Depreciating significant parts of an asset separately because they have different lives or patterns. Replacing a major component is derecognition plus addition; missing the split misstates both expense and carrying amount.',
    ref: 'IAS 16',
  },
  'decommissioning provision': {
    label: 'Decommissioning provision',
    body: 'The obligation to dismantle an asset or restore a site, recognised at the same time as the asset. Initial measurement discounts expected costs; the audit issues are the estimate, the rate and the unwinding of the discount.',
    ref: 'IAS 37 / IAS 16',
  },
  'onerous contract': {
    label: 'Onerous contract',
    body: 'A contract where unavoidable costs exceed economic benefits, requiring a present provision. Completeness is the hardest part: onerous leases and purchase commitments surface only when someone goes looking.',
    ref: 'IAS 37',
  },
  'restructuring provision': {
    label: 'Restructuring provision',
    body: 'A provision for a formal, detailed restructuring plan. Only costs arising from the obligation qualify; generous versions smooth profit and fail the recognition criteria, and timing drives whether it belongs in this period.',
    ref: 'IAS 37',
  },
  'legal claim': {
    label: 'Legal claim',
    body: 'An asserted right against the entity, typically litigation. Whether it is a provision (probable, estimable) or a contingency (disclosed) is the judgement; evidence comes from lawyers\u2019 letters, not the ledger.',
    ref: 'IAS 37 / ISA 501',
  },
  'legal letter': {
    label: 'Letter of audit inquiry to lawyers',
    body: 'The auditor\u2019s direct written request to the entity\u2019s lawyers for litigation and claims status. Primary evidence for completeness of provisions and contingencies; the preparation date and response completeness draw audit attention.',
    ref: 'ISA 501',
  },
  'insurance contract': {
    label: 'Insurance contract',
    body: 'A contract transferring significant insurance risk. IFRS 17 measures fulfilment cash flows plus a risk adjustment and contractual service margin; the audit issues are the assumptions in the projections and the release of the margin.',
    ref: 'IFRS 17',
  },
  'actuarial valuation': {
    label: 'Actuarial valuation',
    body: 'The computation of insurance and pension obligations from demographic and financial assumptions. Small assumption shifts swing the numbers by millions; the auditor tests the assumptions and the data, not just the model arithmetic.',
    ref: 'IAS 19 / IFRS 17 / ISA 540 (Revised)',
  },
  'plan assets': {
    label: 'Plan assets',
    body: 'Assets held in a funded pension plan, deducted from the defined benefit obligation. Measured at fair value; the audit issues are valuation of unquoted holdings and the asset ceiling limiting recognition.',
    ref: 'IAS 19',
  },
  'defined benefit obligation': {
    label: 'Defined benefit obligation (DBO)',
    body: 'The present value of promised pension benefits, driven by mortality, salary growth and discount rate assumptions. The audit focuses on the actuary\u2019s assumptions and data; the discount rate must follow high-quality corporate bond yields.',
    ref: 'IAS 19',
  },
  'share-based payment': {
    label: 'Share-based payment',
    body: 'Settling employees with equity instruments rather than cash. The grant date fair value vests over the service period; modifications, forfeitures and the choice of valuation model are the audit issues.',
    ref: 'IFRS 2',
  },
  clawback: {
    label: 'Clawback',
    body: 'A contractual right to reclaim paid remuneration, typically on restatement or misconduct. The audit issues are whether a present obligation exists to reverse the accrual and the completeness of contingent disclosure.',
    ref: 'IAS 37 / IFRS 2',
  },
  'bonus provision': {
    label: 'Bonus provision',
    body: 'The accrued liability for performance-related pay. The estimate tracks the scheme\u2019s terms and the results it references; understating the bonus understates expense and overstates profit in the same period the results were inflated.',
    ref: 'IAS 37 / ISA 540 (Revised)',
  },
  'equity instrument': {
    label: 'Equity instrument',
    body: 'A contract evidencing residual interest in assets after deducting liabilities. The debt-versus-equity classification decides whether returns are interest or dividends; compound instruments must be split.',
    ref: 'IAS 32',
  },
  'compound instrument': {
    label: 'Compound instrument',
    body: 'An instrument with both liability and equity features, such as a convertible bond. The split at initial recognition is an accounting construct; conversion triggers reclassification with no gain or loss.',
    ref: 'IAS 32',
  },
  'share premium': {
    label: 'Share premium',
    body: 'The excess of issue proceeds over nominal share value, a non-distributable reserve. The audit verifies proceeds and the split between nominal and premium from share issue documentation.',
    ref: 'IAS 32 / IAS 1',
  },
  'treasury share': {
    label: 'Treasury share',
    body: 'The entity\u2019s own shares held in treasury, deducted from equity. The audit issues are existence (register verification), the transaction price and the disclosure of the holding.',
    ref: 'IAS 32',
  },
  'dividend payable': {
    label: 'Dividend payable',
    body: 'A dividend declared but unpaid at period end, a current liability. Cut-off between declaration and payment dates decides recognition; the audit matches board minutes and payment runs.',
    ref: 'IAS 1 / IAS 32',
  },
  'retained earnings': {
    label: 'Retained earnings',
    body: 'Cumulative profit less distributions and transfers to reserves. The statement of changes in equity must reconcile it; unexplained movements are a classic completeness failure.',
    ref: 'IAS 1',
  },
  'statement of changes in equity': {
    label: 'Statement of changes in equity',
    body: 'The statement reconciling opening and closing equity through profit, other comprehensive income, distributions and share transactions. It is where unexplained equity movements surface.',
    ref: 'IAS 1',
  },
  'remittance advice': {
    label: 'Remittance advice',
    body: 'The document accompanying a payment, listing the invoices it settles. Used in cut-off testing to allocate cash received to the right period and invoices; mismatches reveal disputed or misapplied items.',
    ref: 'ISA 505 / cut-off concept',
  },
  'aged payables': {
    label: 'Aged payables analysis',
    body: 'Payables bucketed by age. Feeds completeness testing of unrecorded liabilities and the search for unrecorded invoices; sudden clearing of old items near year end draws audit attention.',
    ref: 'IAS 1 / ISA 530',
  },
  'fixed asset register': {
    label: 'Fixed asset register',
    body: 'The listing of owned assets with cost, accumulated depreciation and location. Reconciling it to the ledger and physically verifying samples tests existence; disposals missing from it overstate assets.',
    ref: 'IAS 16 / ISA 500',
  },
  'deferred tax asset': {
    label: 'Deferred tax asset',
    body: 'Future tax relief arising from deductible temporary differences and unused losses. Recognition requires probable future profits; that judgement makes it a valuation risk and a tool for smoothing.',
    ref: 'IAS 12',
  },
  'deferred tax liability': {
    label: 'Deferred tax liability',
    body: 'Future tax payable arising from taxable temporary differences, such as accelerated depreciation. The calculation follows the temporary difference; completeness of differences is the audit issue.',
    ref: 'IAS 12',
  },
  'tax provision': {
    label: 'Tax provision',
    body: 'The current and deferred tax charge for the period. The audit recomputes it from the tax computation, tests the effective tax rate against statutory rates, and examines the treatment of uncertain positions.',
    ref: 'IAS 12 / IFRIC 23',
  },
  'cash flow forecast': {
    label: 'Cash flow forecast',
    body: 'Management\u2019s projection of future cash generation and needs. Central to going concern and impairment testing; the auditor challenges the assumptions behind it rather than accepting the spreadsheet.',
    ref: 'ISA 570 / IAS 36',
  },
  'management accounts': {
    label: 'Management accounts',
    body: 'Internal financial reports prepared for running the business, not for external users. Unreconciled gaps between management and statutory accounts are a classic indicator of misstatement.',
    ref: 'ISA 315 (Revised 2019) / ISA 520',
  },

  facility: {
    label: 'Credit facility',
    body: 'An agreed borrowing arrangement with a lender: term loans, revolvers or overdrafts. The audit issues are completeness of drawn and undrawn amounts, covenant compliance, and classification between current and non-current.',
    ref: 'IFRS 9 / IAS 1',
  },
  invoice: {
    label: 'Invoice',
    body: 'The document demanding payment for goods or services supplied. Cut-off testing revolves around invoice dates versus delivery dates; fictitious invoices are the simplest form of revenue fraud.',
    ref: 'IAS 1 / cut-off concept',
  },
  receivable: {
    label: 'Receivable',
    body: 'A contractual right to consideration from a customer. The audit issues are existence (confirmation), valuation (allowance for expected credit losses) and cut-off between sale and settlement.',
    ref: 'IFRS 9 / IFRS 15',
  },
  'trade payable': {
    label: 'Trade payable',
    body: 'An obligation to suppliers for goods or services received. Completeness of unrecorded payables is the classic risk: goods received without an invoice leave the liability invisible.',
    ref: 'IAS 1 / ISA 315 (Revised 2019)',
  },
  ledger: {
    label: 'Ledger',
    body: 'The accounting records where transactions are posted by account. Testing direction matters: vouching from ledger to evidence tests occurrence; tracing from evidence to ledger tests completeness.',
    ref: 'ISA 500 / direction of testing',
  },
  'audit evidence': {
    label: 'Audit evidence',
    body: 'The information the auditor uses to support conclusions: documents, confirmations, observations and re-performance. Sufficiency is about quantity, appropriateness about relevance and reliability; external evidence outranks internal.',
    ref: 'ISA 500',
  },
  interest: {
    label: 'Interest',
    body: 'The cost of borrowing over time, allocated to periods as they pass. Accrual and cut-off dominate: accrued interest, prepaid interest and the effective interest rate all shift expense between periods.',
    ref: 'IFRS 9 / IAS 23',
  },
  dividend: {
    label: 'Dividend',
    body: 'A distribution of profit to shareholders. Recognised when declared, not when paid or proposed; the cut-off between declaration dates drives both the liability and equity movements.',
    ref: 'IAS 1 / IAS 32',
  },
  guarantee: {
    label: 'Guarantee',
    body: 'A promise to satisfy another party\u2019s obligation if they default. A present obligation when probable, otherwise a disclosed contingency; completeness is the risk because guarantees rarely appear in the ledger.',
    ref: 'IAS 37 / IFRS 9',
  },
  litigation: {
    label: 'Litigation',
    body: 'Pending legal action against or by the entity. Provision when a loss is probable and estimable, disclosure otherwise; the auditor\u2019s evidence is the lawyer\u2019s response, not management\u2019s optimism.',
    ref: 'IAS 37 / ISA 501',
  },
  insolvency: {
    label: 'Insolvency',
    body: 'The state of being unable to meet debts as they fall due. For a customer it drives ECL staging and write-offs; for the client itself it is the ultimate going concern question.',
    ref: 'IFRS 9 / ISA 570',
  },
  payroll: {
    label: 'Payroll',
    body: 'The system paying wages and salaries. Ghost employees, leavers left on the run and overtime without approval are the classic frauds; completeness of the accrual and cut-off of the final run are the assertions.',
    ref: 'ISA 315 (Revised 2019) / IAS 19',
  },
  royalty: {
    label: 'Royalty',
    body: 'A payment for the use of intellectual property, production or sales. Accrual depends on reported usage, so understated sales understate the royalty; completeness and accuracy follow the underlying data.',
    ref: 'IFRS 15 / IFRS 16',
  },
  'unbilled revenue': {
    label: 'Unbilled revenue',
    body: 'Performance satisfied before the invoice is raised. A contract asset: the right to consideration exists without the paperwork; completeness of the accrual and cut-off of the billing are the audit issues.',
    ref: 'IFRS 15',
  },
  forecast: {
    label: 'Forecast',
    body: 'Management\u2019s projection of future results. Evidence for going concern, impairment and ECL staging; the auditor challenges the assumptions rather than the arithmetic, and compares forecasts against what later happened.',
    ref: 'ISA 570 / ISA 540 (Revised)',
  },
  treasury: {
    label: 'Treasury function',
    body: 'The department managing cash, borrowings and financial risk. Segregation of duties matters: initiation, approval and reconciliation in one pair of hands is the classic misappropriation setup.',
    ref: 'ISA 315 (Revised 2019)',
  },
  redemption: {
    label: 'Redemption',
    body: 'Repayment or buyback of a financial instrument, or a fund investor cashing out. For investments, redemption terms drive liquidity classification; for borrowings, the cash outflow and derecognition mechanics are the audit issues.',
    ref: 'IFRS 9 / IFRS 10',
  },
  segment: {
    label: 'Segment reporting',
    body: 'Breaking the results into the components management uses to run the business. The audit issues are completeness of segments and the allocation basis of shared items; burying a problem area in \u2018other\u2019 hides it from users.',
    ref: 'IFRS 8',
  },
  subsidiary: {
    label: 'Subsidiary',
    body: 'An entity controlled by the parent, consolidated in group statements. Control assessment decides the perimeter; a wrong perimeter misstates everything, and intra-group balances must be eliminated completely.',
    ref: 'IFRS 10',
  },
  loan: {
    label: 'Loan',
    body: 'A borrowing repayable with interest. The audit issues are existence and completeness of balances, accuracy of interest accrual, classification between current and non-current, and covenant compliance.',
    ref: 'IFRS 9',
  },
  bond: {
    label: 'Bond',
    body: 'A tradable long-term debt instrument. The audit issues are the business model classification (amortized cost or fair value), the valuation of unquoted issues, and the completeness of issued debt.',
    ref: 'IFRS 9 / IFRS 13',
  },
  'suspense account': {
    label: 'Suspense account',
    body: 'A temporary holding account for unallocated items. Aged suspense balances are a classic symptom: entries parked instead of resolved, hiding misstatements that belong in the right line items.',
    ref: 'ISA 315 (Revised 2019) / IAS 1',
  },
  'cash flow': {
    label: 'Cash flow',
    body: 'Cash moving in and out, summarised in the cash flow statement. Profit can be engineered with accruals but cash reconciles to the bank; weak cash against reported profit is the classic red flag.',
    ref: 'IAS 7',
  },
  'purchase order': {
    label: 'Purchase order',
    body: 'The document committing the buyer to purchase. Part of the three-way match with the goods received note and the invoice; the audit tests the completeness of commitments and cut-off of receipt.',
    ref: 'ISA 315 (Revised 2019) / three-way match',
  },
  timesheet: {
    label: 'Timesheet',
    body: 'The record of hours worked, driving payroll and project costs. Recalculation and approval testing are the procedures; unbilled or capitalised time relies on its completeness and accuracy.',
    ref: 'ISA 500 / IFRS 15',
  },
  refund: {
    label: 'Refund',
    body: 'Repayment to a customer for returned goods or cancelled services. A reduction of revenue rather than an expense; completeness of the returns provision is a valuation risk tied to sales volume.',
    ref: 'IFRS 15',
  },
  'point of sale': {
    label: 'Point of sale',
    body: 'The moment and place a sale is made. Cash counts and till data anchor the completeness of takings; skimming before recording is the classic fraud that only physical procedures can catch.',
    ref: 'ISA 315 (Revised 2019) / IFRS 15',
  },
  takings: {
    label: 'Takings',
    body: 'Cash received from sales, common in retail. Completeness is the assertion at risk: unrecorded takings never enter the ledger, so the auditor reconciles till records to deposits and observes counts.',
    ref: 'ISA 500 / completeness concept',
  },

  'collateral-light': {
    label: 'Collateral-light lending',
    body: 'Lending secured against little or no specific collateral, relying instead on covenants and the borrower\u2019s cash flows. Recovery expectations rest on unsecured projections, which makes loss-given-default estimates more judgement-heavy and the covenant terms more important to audit.',
    ref: 'IFRS 9',
  },
  'security interest': {
    label: 'Security interest',
    body: 'A legal claim over assets securing an obligation. The audit issues are the existence and enforceability of the interest, the completeness of encumbrance disclosures, and priority between creditors.',
    ref: 'IFRS 7 / IFRS 9',
  },

};

export const GLOSSARY_KEYS = Object.keys(GLOSSARY).sort((a, b) => b.length - a.length);
