import { useMemo, useState } from 'react';
import type { Scenario } from '../types';
import type { SessionConfig } from '../App';
import { loadState, getDailyResult } from '../storage';
import { statementGroup } from '../data/validate';
import { sectorFor, SECTOR_ORDER } from '../sectors';
import { rankFor, nextRank } from '../career';
import { todayKey } from '../daily';

interface Props {
  scenarios: Scenario[];
  onStart: (cfg: SessionConfig) => void;
  onOpenGuide: () => void;
  onOpenStatements: () => void;
  onOpenIsas: () => void;
  onOpenMastery: () => void;
  onStartDaily: () => void;
}

const DIFFICULTIES: SessionConfig['difficulty'][] = ['beginner', 'intermediate', 'advanced', 'mixed'];

export function Home({ scenarios, onStart, onOpenGuide, onOpenStatements, onOpenIsas, onOpenMastery, onStartDaily }: Props) {
  const [difficulty, setDifficulty] = useState<SessionConfig['difficulty']>('mixed');
  const [sector, setSector] = useState<string | null>(null);
  const [statement, setStatement] = useState<SessionConfig['statement']>('all');
  const [showWhy, setShowWhy] = useState(false);
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
  const dailyDone = useMemo(() => getDailyResult(todayKey()), []);
  const mastered = stats.career.scenariosMastered;
  const rank = rankFor(mastered, scenarios.length);
  const upcoming = nextRank(mastered, scenarios.length);
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
        <h1 className="title-tip" tabIndex={0}>
          Quaestor
          <span className="title-tip-card" role="tooltip">
            <span className="title-tip-card-title">The Quaestor</span>
            In ancient Rome, the quaestors were elected officials in charge of the treasury: they kept the
            accounts, guarded the public funds and audited the books of generals and provincial governors.
            Every army and province had one, because no amount of power was trusted without one. This game
            trains the same discipline.
          </span>
        </h1>
        <p className="tagline">
          Judge which assertions matter for each line item, which are high risk in context, and spot the
          procedure that looks right but tests the wrong thing.
        </p>
      </header>
      <section className="card mission">
        <h2>Why this game was created</h2>
        {showWhy ? (
          <div className="howto-body">
            <p>
              An organization's goals are only as reliable as its processes. Ambitious plans built on broken
              controls fail quietly; the audit exists to make sure they don't.
            </p>
            <p>
              This is not a gotcha exercise. It is the discipline of verifying that processes operate as
              designed, that evidence proves what it claims, and that the numbers leaders steer by can actually
              be steered with. Done well, the audit is where insight comes from: findings feed back into better
              controls, better controls into trust, and trust into the freedom to pursue bigger goals.
            </p>
            <p>
              AI will only sharpen this. As automation absorbs the mechanical work, the auditor's core
              contribution such as judgment about process, risk, and evidence becomes the profession's entire
              value. This game exists to train it.
            </p>
          </div>
        ) : null}
        <button className="btn btn-ghost btn-small" onClick={() => setShowWhy((v) => !v)} aria-expanded={showWhy}>
          {showWhy ? 'Show less' : 'Read more'}
        </button>
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
        <div className="box-grid">
          <button className="box-link" onClick={onOpenGuide}>
            <span className="box-title">What are assertions?</span>
            <span className="box-sub">Learn the vocabulary and standards</span>
          </button>
          <button className="box-link" onClick={onOpenStatements}>
            <span className="box-title">What are financial statements?</span>
            <span className="box-sub">The documents behind the numbers</span>
          </button>
          <button className="box-link" onClick={onOpenIsas}>
            <span className="box-title">The ISAs, explained</span>
            <span className="box-sub">What each standard is for</span>
          </button>
          <button className="box-link" onClick={onOpenMastery}>
            <span className="box-title">Mastery map</span>
            <span className="box-sub">Progress per sector</span>
          </button>
          <button className="box-link" onClick={() => setShowHowTo((v) => !v)} aria-expanded={showHowTo}>
            <span className="box-title">How to play</span>
            <span className="box-sub">{showHowTo ? 'Hide the rules' : 'The rules of the game'}</span>
          </button>
        </div>
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

      <section className="card daily">
        <h2>Daily challenge</h2>
        <p className="muted">
          The same five scenarios for everyone, {todayKey()}. Come back tomorrow for a fresh draw.
        </p>
        {dailyDone ? (
          <p className="muted small">
            Played today · best {dailyDone.score} pts, {dailyDone.mastered}/{dailyDone.total} mastered. Play
            again to improve your best.
          </p>
        ) : (
          <p className="muted small">Not attempted yet today.</p>
        )}
        <button className="btn btn-primary" onClick={onStartDaily}>
          Play today’s challenge
        </button>
      </section>
      <section className="card stats">
        <div className="career-head">
          <h2>Career ladder</h2>
          <button className="btn btn-ghost btn-small" onClick={onOpenMastery}>
            Mastery map →
          </button>
        </div>
        <div className="career-rank">
          <span className="career-title">{rank.title} <span className="career-latin">· {rank.latin}</span></span>
          <span className="muted small">{rank.blurb}</span>
          {upcoming ? (
            <span className="muted small">
              Next rank: <strong>{upcoming.title}</strong> at {upcoming.threshold} mastered ({mastered} so far)
            </span>
          ) : (
            <span className="muted small">Top rank achieved. The treasury is yours.</span>
          )}
        </div>
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
      <footer className="disclaimer">
        <p>
          Quaestor is a personal hobby project by Ryan Lolachi. It is not affiliated with, endorsed by, or
          produced by any employer, professional services firm, accounting body, or standard setter. All
          views and content are the author's own.
        </p>
        <p>
          This game is a training aid, not an authoritative source. Errors might exist, and double
          verification against the actual standards and your firm's methodology is important. Always
          consult the primary literature and applicable professional requirements before relying on
          anything here.
        </p>
      </footer>
    </div>
  );
}
