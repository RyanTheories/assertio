import { useMemo, useState } from 'react';
import type { Scenario } from '../types';
import type { SessionConfig } from '../App';
import { loadState } from '../storage';
import { statementGroup } from '../data/validate';

interface Props {
  scenarios: Scenario[];
  onStart: (cfg: SessionConfig) => void;
  onOpenGuide: () => void;
}

const DIFFICULTIES: SessionConfig['difficulty'][] = ['beginner', 'intermediate', 'advanced', 'mixed'];

export function Home({ scenarios, onStart, onOpenGuide }: Props) {
  const [difficulty, setDifficulty] = useState<SessionConfig['difficulty']>('mixed');
  const [industry, setIndustry] = useState<string | null>(null);
  const [statement, setStatement] = useState<SessionConfig['statement']>('all');
  const [showHowTo, setShowHowTo] = useState(false);

  const industries = useMemo(() => {
    const seen = new Map<string, string>();
    for (const s of scenarios) {
      const key = s.industry.toLowerCase();
      if (!seen.has(key)) seen.set(key, s.industry);
    }
    return [...seen.values()].sort((a, b) => a.localeCompare(b));
  }, [scenarios]);

  const stats = useMemo(() => loadState(), []);
  const availableCount = useMemo(() => {
    let pool = scenarios;
    if (difficulty !== 'mixed') pool = pool.filter((s) => s.difficulty === difficulty);
    if (industry) pool = pool.filter((s) => s.industry.toLowerCase() === industry.toLowerCase());
    if (statement !== 'all') pool = pool.filter((s) => statementGroup(s.statement) === statement);
    return pool.length;
  }, [scenarios, difficulty, industry, statement]);

  return (
    <div className="screen home">
      <header className="hero">
        <p className="eyebrow">Audit training</p>
        <h1>Assertio</h1>
        <p className="tagline">
          Judge which assertions matter for each line item, which are high risk in context — and spot the
          procedure that looks right but tests the wrong thing.
        </p>
      </header>

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
            <select value={industry ?? ''} onChange={(e) => setIndustry(e.target.value || null)}>
              <option value="">All industries</option>
              {industries.map((ind) => (
                <option key={ind} value={ind}>
                  {ind}
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
          onClick={() => onStart({ difficulty, industry, statement })}
        >
          {availableCount === 0 ? 'No scenarios match' : `Start session (${availableCount} scenarios)`}
        </button>
      </section>

      <section className="card howto">
        <button className="howto-toggle" onClick={onOpenGuide}>
          <span>▸ What are assertions? Learn the vocabulary and standards</span>
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
                <strong>Relevant assertions</strong> — check the assertions that are relevant to the line item.
                Partial credit; extras lose points.
              </li>
              <li>
                <strong>High-risk assertions</strong> — from the relevant set, check the ones the client context
                makes risky. Feedback shows the data's risk reasons.
              </li>
              <li>
                <strong>Procedures</strong> — for each procedure, match the assertion(s) it tests — or flag it as
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
          <p className="muted">No sessions played yet — your progress is saved in this browser.</p>
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
