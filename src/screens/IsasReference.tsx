interface Isa {
  code: string;
  name: string;
  purpose: string;
}

const INTRO: { title: string; body: string }[] = [
  {
    title: 'What ISAs are',
    body: 'International Standards on Auditing are the rulebook of the audit profession. They are issued by the IAASB (International Auditing and Assurance Standards Board) under IFAC, and they set out how an audit is planned, performed and reported. In most jurisdictions that follow international standards, they are adopted into local law or professional regulation, sometimes with local additions.',
  },
  {
    title: 'What they are not',
    body: 'ISAs do not tell the auditor exactly what to do in every situation, and they are not accounting rules. Accounting standards (IFRS) say how numbers should be measured and presented; ISAs say how the auditor gathers evidence that the numbers are right. An ISA is written as an objective plus requirements, which leaves the professional judgement to the auditor. That judgement is exactly what this game trains.',
  },
  {
    title: 'How ISAs map onto the game',
    body: 'ISA 315 tells the auditor to identify risks at the assertion level, which is Phase 1 and 2 of every scenario. ISA 330 says the procedures must target those assertions, and run in the right direction, which is Phase 3. ISA 240 explains why revenue occurrence is a presumed fraud risk, which the riskiest scenarios lean on. The glossary and assertion guide reference these standards throughout.',
  },
];

const ISAS: { group: string; items: Isa[] }[] = [
  {
    group: 'Foundations',
    items: [
      { code: 'ISA 200', name: 'Overall Objectives of the Independent Auditor', purpose: 'The anchor standard: what an audit is, the auditor\u2019s overall objectives, and the mindset of professional skepticism that runs through everything else.' },
      { code: 'ISA 210', name: 'Agreeing the Terms of Audit Engagements', purpose: 'What the auditor and client agree before work starts: scope, responsibilities, and the form of the report.' },
      { code: 'ISA 230', name: 'Audit Documentation', purpose: 'The requirement to record what was done, what evidence was obtained, and who did it. Work that is not documented is treated as work that was not done.' },
      { code: 'ISA 240', name: 'The Auditor\u2019s Responsibilities Relating to Fraud', purpose: 'Why revenue recognition carries a presumed fraud risk, and how fraudulent financial reporting typically happens: incentive, opportunity and rationalisation.' },
    ],
  },
  {
    group: 'Risk assessment',
    items: [
      { code: 'ISA 250', name: 'Consideration of Laws and Regulations', purpose: 'How the auditor responds when the entity may be breaking the law, from money laundering to environmental breaches, including the duty to report certain matters.' },
      { code: 'ISA 260', name: 'Communication with Those Charged with Governance', purpose: 'What the auditor must tell the board or audit committee, in particular the significant risks and judgements found during the audit.' },
      { code: 'ISA 315 (Revised 2019)', name: 'Identifying and Assessing Risks of Material Misstatement', purpose: 'The standard behind this game\u2019s whole structure: understand the entity, then identify and assess risk of misstatement at the assertion level for each material line item.' },
      { code: 'ISA 320', name: 'Materiality in Planning and Performing an Audit', purpose: 'How big a misstatement must be before it matters to users. Materiality shapes what is tested and how much evidence is enough.' },
      { code: 'ISA 550', name: 'Related Parties', purpose: 'Identifying the people and entities with control or influence, whose transactions are the classic home of conflicts and concealed substance.' },
      { code: 'ISA 570', name: 'Going Concern', purpose: 'Assessing whether the entity will survive the foreseeable future, and what to do when the assumption looks doubtful. Covenants, cash burn and management plans all land here.' },
    ],
  },
  {
    group: 'Evidence and responses',
    items: [
      { code: 'ISA 330', name: 'The Auditor\u2019s Responses to Assessed Risks', purpose: 'Designing procedures that respond to the assessed risks, and running each test in the right direction for the assertion it targets. The anti-trap standard: a procedure that does not address the risk it claims to test is not sufficient evidence.' },
      { code: 'ISA 500', name: 'Audit Evidence', purpose: 'What makes evidence sufficient and appropriate, and the source and reliability hierarchy: external evidence beats internal, direct observation beats representation.' },
      { code: 'ISA 501', name: 'Audit Evidence: Specific Considerations for Selected Items', purpose: 'Evidence for the physical and legal items: attending inventory counts, confirming investments, and examining litigation involving legal counsel.' },
      { code: 'ISA 505', name: 'External Confirmations', purpose: 'The confirmation process for banks, customers, lenders and custodians: why the request must go out under the auditor\u2019s control, positive versus negative confirmation, and what to do when a reply never comes.' },
      { code: 'ISA 510', name: 'Initial Audit Engagements: Opening Balances', purpose: 'Evidence for balances brought forward from before the auditor\u2019s appointment, where last year\u2019s misstatements surface.' },
      { code: 'ISA 520', name: 'Analytical Procedures', purpose: 'Using relationships and trends as evidence: powerful for risk assessment, weaker as a stand-alone substantive test unless the relationship is precise and predictable.' },
      { code: 'ISA 530', name: 'Audit Sampling', purpose: 'How much to test: designing samples, and projecting the errors found onto the whole population.' },
      { code: 'ISA 540 (Revised)', name: 'Auditing Accounting Estimates and Fair Value', purpose: 'Auditing the judgement-heavy numbers: the method, the assumptions and the data behind every estimate, from ECL to impairment. Valuation risk lives here.' },
      { code: 'ISA 560', name: 'Subsequent Events', purpose: 'What happens after the reporting date but before the audit report, and which events adjust the numbers versus only get disclosed.' },
      { code: 'ISA 580', name: 'Written Representations', purpose: 'The mandatory management letter confirming statements made during the audit. Necessary evidence, but never sufficient on its own.' },
    ],
  },
  {
    group: 'Evaluation and reporting',
    items: [
      { code: 'ISA 450', name: 'Evaluation of Misstatements', purpose: 'Deciding whether the errors actually found, individually and together, push the statements past materiality.' },
      { code: 'ISA 700', name: 'Forming an Opinion and Reporting', purpose: 'Pulling everything together into the audit opinion, the report the public actually reads.' },
      { code: 'ISA 701', name: 'Key Audit Matters', purpose: 'Which matters went hardest in the audit, communicated in the report for listed entities so users can see where the judgement fell.' },
      { code: 'ISA 705', name: 'Modifications to the Opinion', purpose: 'The three ways an opinion can go wrong: qualified, adverse or disclaimer, and what triggers each.' },
      { code: 'ISA 710', name: 'Comparative Information', purpose: 'The consistency requirement: this year\u2019s figures against last year\u2019s, and restatements of what was previously reported.' },
      { code: 'ISA 720', name: 'The Auditor\u2019s Responsibilities Relating to Other Information', purpose: 'What the auditor does with the annual report beyond the financial statements, like the directors\u2019 report, where contradictions with the audited numbers can sit.' },
    ],
  },
];

export function IsasReference({ onHome }: { onHome: () => void }) {
  return (
    <div className="screen guide">
      <header className="hero">
        <p className="eyebrow">Reference</p>
        <h1>The ISAs, explained</h1>
        <p className="guide-intro">
          Every judgement in this game is governed by an International Standard on Auditing. This page
          explains what the standards are and what each one is for.
        </p>
      </header>
      <section className="card guide-section">
        <h2 className="guide-group-label">What ISAs are</h2>
        {INTRO.map((i) => (
          <div key={i.title} className="guide-mindset">
            <h3>{i.title}</h3>
            <p>{i.body}</p>
          </div>
        ))}
      </section>
      {ISAS.map((g) => (
        <section key={g.group} className="card guide-section">
          <h2 className="guide-group-label">{g.group}</h2>
          <div className="guide-grid">
            {g.items.map((isa) => (
              <article key={isa.code} className="guide-card">
                <h3>{isa.code}</h3>
                <p className="guide-sub">{isa.name}</p>
                <p>{isa.purpose}</p>
              </article>
            ))}
          </div>
        </section>
      ))}
      <div className="phase-actions">
        <button className="btn btn-ghost" onClick={onHome}>Back to home</button>
      </div>
    </div>
  );
}
