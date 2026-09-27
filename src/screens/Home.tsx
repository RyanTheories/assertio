import { useMemo, useState } from 'react';
import type { Scenario } from '../types';
import type { SessionConfig } from '../App';
import { loadState } from '../storage';
import { statementGroup } from '../data/validate';
import { sectorFor, SECTOR_ORDER } from '../sectors';

interface Props {
  scenarios: Scenario[];
  onStart: (cfg: SessionConfig) => void;
  onOpenGuide: () => void;
  onOpenStatements: () => void;
  onOpenIsas: () => void;
}

const DIFFICULTIES: SessionConfig['difficulty'][] = ['beginner', 'intermediate', 'advanced', 'mixed'];

export function Home({ scenarios, onStart, onOpenGuide, onOpenStatements, onOpenIsas }: Props) {
  const [difficulty, setDifficulty] = useState<SessionConfig['difficulty']>('mixed');
  const [sector, setSector] = useState<string | null>(null);
  const [statement, setStatement] = useState<SessionConfig['statement']>('all');
  const [showHowTo, setShowHowTo] = useState(false);

  const sectors = useMemo(() => {
    const counts = new Map<string, number>();
    for (const s of scenarios) {
      const sec = sectorFor(s.industry);
      counts.set(sec, (counts.get(sec) ?? 0) + 1);
    }
    return SECTOR_ORDER.filter((sec) => counts.has(sec)).map((sec) => ({ sector: sec, count: counts.get(sec)! }));
  }, [scenarios]);

  const stats = useMemo(() => loadState(), []);
  const availableCount = useMemo(() => {
    let pool = scenarios;
    if (difficulty !== 'mixed') pool = pool.filter((s) => s.difficulty === difficulty);
    if (sector) pool = pool.filter((s) => sectorFor(s.industry) === sector);
    if (statement !== 'all') pool = pool.filter((s) => statementGroup(s.statement) === statement);
    return pool.length;
  }, [scenarios, difficulty, sector, statement]);

  return (
    <div className="screen home">
      <header className="hero">
        <svg className="laurel" viewBox="0 0 100 40" aria-hidden="true">
          <path d="M30 4 Q10 10 6 30 Q18 22 26 26 Q18 16 22 6 Q26 14 32 20 Z" />
          <path d="M70 4 Q90 10 94 30 Q82 22 74 26 Q82 16 78 6 Q74 14 68 20 Z" />
        </svg>
        <p className="eyebrow">Audit training</p>
        <h1>Assertio</h1>
        <p className="tagline">
          Judge which assertions matter for each line item, which are high risk in context, and spot the
          procedure that looks right but tests the wrong thing.
        </p>
      </header>
      <section className="card mission">
        <h2>Why this game exists</h2>
        <p>
          The future of audit is often framed as a contest between humans and automation. In practice, the
          value of the auditor lies in what automation cannot do: professional skepticism. Automated tools
          can reconcile ledgers in seconds, but they cannot judge where the numbers may be misleading, why
          incentives might encourage that, or which question, asked of which evidence, settles the matter.
          Every scenario in this game is that judgment, distilled.
        </p>
      </section>

      <section className="card setup">
        <h2>New session</h2>
        <div className="field">
          <label>Difficulty</label>
          <div className="chip-row">
            {DIFFICULTIES.map((d) => (
              <button
                key={d}
                className={`chip ${difficulty === d ? 'chip-active' : ''}`}
                onClick={() => setDifficulty(d)}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
        <div className="field">
          <label>Industry</label>
          <div className="select-row">
            <select value={sector ?? ''} onChange={(e) => setSector(e.target.value || null)}>
              <option value="">All sectors</option>
              {sectors.map(({ sector: sec, count }) => (
                <option key={sec} value={sec}>
                  {sec} ({count})
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="field">
          <label>Statement</label>
          <div className="chip-row">
            {(['income_statement', 'balance_sheet', 'all'] as const).map((st) => (
              <button
                key={st}
                className={`chip ${statement === st ? 'chip-active' : ''}`}
                onClick={() => setStatement(st)}
              >
                {st === 'income_statement' ? 'Income statement' : st === 'balance_sheet' ? 'Balance sheet' : 'All'}
              </button>
            ))}
          </div>
        </div>
        <button
          className="btn btn-primary btn-start"
          disabled={availableCount === 0}
          onClick={() => onStart({ difficulty, industry: sector, statement })}
        >
          {availableCount === 0 ? 'No scenarios match' : `Start session (${availableCount} scenarios)`}
        </button>
      </section>

      <section className="card howto">
        <button className="howto-toggle" onClick={onOpenGuide}>
          <span>▸ What are assertions? Learn the vocabulary and standards</span>
        </button>
        <button className="howto-toggle" onClick={onOpenStatements}>
          <span>▸ What are financial statements? The documents behind the numbers</span>
        </button>
        <button className="howto-toggle" onClick={onOpenIsas}>
          <span>▸ The ISAs, explained: what each standard is for</span>
        </button>
        <button className="howto-toggle" onClick={() => setShowHowTo((v) => !v)}>
          <span>{showHowTo ? '▾' : '▸'} How to play</span>
        </button>
        {showHowTo && (
          <div className="howto-body">
            <p>
              Each scenario is one line item on a client's financial statements. A round has three phases:
            </p>
            <ol>
              <li>
                <strong>Relevant assertions</strong>, check the assertions that are relevant to the line item.
                Partial credit; extras lose points.
              </li>
              <li>
                <strong>High-risk assertions</strong>, from the relevant set, check the ones the client context
                makes risky. Feedback shows the data's risk reasons.
              </li>
              <li>
                <strong>Procedures</strong>, for each procedure, match the assertion(s) it tests, or flag it as
                a <em>trap</em>: a plausible-looking procedure that tests the wrong assertion for the risk at
                hand. Catching a trap is the highest-value action in the game.
              </li>
            </ol>
            <p>
              <strong>Keyboard:</strong> number keys <kbd>1</kbd>–<kbd>9</kbd>, <kbd>0</kbd> toggle assertions ·{' '}
              <kbd>T</kbd> flags a trap · <kbd>Enter</kbd> submits.
            </p>
            <p>
              A scenario is <strong>mastered</strong> when every phase scores ≥ 80%.
            </p>
          </div>
        )}
      </section>

      <section className="card stats">
        <h2>Career stats</h2>
        {stats.career.gamesPlayed === 0 ? (
          <p className="muted">No sessions played yet, your progress is saved in this browser.</p>
        ) : (
          <dl className="stats-grid">
            <div><dt>Games played</dt><dd>{stats.career.gamesPlayed}</dd></div>
            <div><dt>Average score</dt><dd>{stats.career.averageScore}</dd></div>
            <div><dt>Best score</dt><dd>{stats.career.bestScore}</dd></div>
            <div><dt>Best streak</dt><dd>{stats.career.bestStreak}</dd></div>
            <div><dt>Scenarios mastered</dt><dd>{stats.career.scenariosMastered}</dd></div>
          </dl>
        )}
      </section>
    </div>
  );
}
