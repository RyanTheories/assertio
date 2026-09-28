import { useMemo, useState } from 'react';
import type { Scenario } from '../types';
import type { SessionConfig } from '../App';
import { loadState, getDailyResult } from '../storage';
import { statementGroup } from '../data/validate';
import { sectorFor, SECTOR_ORDER } from '../sectors';
import { rankFor, nextRank } from '../career';
import { todayKey } from '../daily';
import { Icon } from '../components/Icon';
import { JanusCoin } from '../components/JanusCoin';

interface Props {
  scenarios: Scenario[];
  onStart: (cfg: SessionConfig) => void;
  onOpenGuide: () => void;
  onOpenStatements: () => void;
  onOpenIsas: () => void;
  onOpenMastery: () => void;
  onOpenMistakes: () => void;
  onStartDaily: () => void;
}

const DIFFICULTIES: SessionConfig['difficulty'][] = ['beginner', 'intermediate', 'advanced', 'mixed'];

const HOW_STEPS = [
  'Judge which assertions apply to each line item.',
  'Flag which ones are high-risk given the client\u2019s context.',
  'Match procedures to assertions, and spot the trap: the procedure that looks right but tests the wrong thing.',
];

export function Home({ scenarios, onStart, onOpenGuide, onOpenStatements, onOpenIsas, onOpenMastery, onOpenMistakes, onStartDaily }: Props) {
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
  const mistakeCount = stats.mistakes.length;
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
  const flip = () => onStart({ difficulty, industry: sector, statement });
  return (
    <div className="screen home">
      <header className="hero">
        <svg className="logo-mark" viewBox="0 0 48 48" aria-hidden="true">
          <path d="M6 6 L22 24 L6 42 Z" fill="var(--ink)" />
          <path d="M42 6 L26 24 L42 42 Z" fill="none" stroke="var(--ink)" strokeWidth="3" />
        </svg>
        <h1 className="hero-title">DUBITO</h1>
        <p className="hero-subtitle">Skepticism, practiced.</p>
        <div className="hero-coin">
          <JanusCoin size={140} />
        </div>
        <p className="tagline">
          Judge which assertions matter for each line item, which are high risk in context, and spot the
          procedure that looks right but tests the wrong thing.
        </p>
        <div className="hero-cta">
          <button className="btn btn-flip" onClick={flip}>
            <span className="btn-flip-label">Flip a scenario.</span>
            <JanusCoin className="btn-flip-coin" size={28} />
          </button>
        </div>
      </header>
      <section className="card mission">
        <h2>Why this game exists</h2>
        <p>
          Every goal has two faces. The organization sets a target and on the flip side of that same coin sits
          the risk that defeats it: the revenue recognized too early, the control that quietly stops operating,
          the process that only works when nobody&rsquo;s watching. Goals and risks are not two lists. They are one
          coin.
        </p>
        <p>
          Internal controls are how an organization manages its own coin; designing processes so the
          goal-facing side and the risk-facing side stay in view at once. The audit is how anyone learns the
          coin is real: an independent, expert check that the controls operate, that the evidence supports the
          claims, and that the goals leaders pursue are built on processes that actually work. This is why
          auditing matters not as a compliance ritual, but as the assurance that ambition rests on something
          solid.
        </p>
        <p>
          That is why this game is named for Janus, the two-faced god. Every scenario asks you to do what he
          does: look at both faces at once, the assertion claimed, and the risk hidden behind it, and decide
          whether the evidence truly holds.
        </p>
        <p>
          AI will only sharpen this work. As automation absorbs the mechanics, what remains is the judgment;
          which face of the coin matters here, and whether a procedure examines the right one. This game trains
          that judgment, one flip at a time.
        </p>
      </section>
      <section className="card how-steps">
        <h2>How it works</h2>
        <ol className="steps-list">
          {HOW_STEPS.map((step, i) => (
            <li key={i}>
              <span className="step-num">{String(i + 1).padStart(2, '0')}</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </section>
      <section className="card setup">
        <h2><Icon name="play" /> New session</h2>
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
          onClick={flip}
        >
          {availableCount === 0 ? 'No scenarios match' : `Start session (${availableCount} scenarios)`}
        </button>
      </section>
      <section className="card howto">
        <div className="box-grid">
          <button className="box-link" onClick={onOpenGuide}>
            <Icon name="book" size={22} />
            <span className="box-title">What are assertions?</span>
            <span className="box-sub">Learn the vocabulary and standards</span>
          </button>
          <button className="box-link" onClick={onOpenStatements}>
            <Icon name="doc" size={22} />
            <span className="box-title">What are financial statements?</span>
            <span className="box-sub">The documents behind the numbers</span>
          </button>
          <button className="box-link" onClick={onOpenIsas}>
            <Icon name="scale" size={22} />
            <span className="box-title">The ISAs, explained</span>
            <span className="box-sub">What each standard is for</span>
          </button>
          <button className="box-link" onClick={onOpenMastery}>
            <Icon name="map" size={22} />
            <span className="box-title">Mastery map</span>
            <span className="box-sub">Progress per sector</span>
          </button>
          <button className="box-link" onClick={onOpenMistakes}>
            <Icon name="flag" size={22} />
            <span className="box-title">Mistake review{mistakeCount > 0 ? ` (${mistakeCount})` : ''}</span>
            <span className="box-sub">Drill the assertions you misjudged</span>
          </button>
          <button className="box-link" onClick={() => setShowHowTo((v) => !v)} aria-expanded={showHowTo}>
            <Icon name="dice" size={22} />
            <span className="box-title">How to play</span>
            <span className="box-sub">{showHowTo ? 'Hide the rules' : 'The rules of the game'}</span>
          </button>
        </div>
        {showHowTo && (
          <div className="howto-body">
            <p>
              Each scenario is one line item on a client&rsquo;s financial statements. A round has three phases:
            </p>
            <ol>
              <li>
                <strong>Relevant assertions</strong>, check the assertions that are relevant to the line item.
                Partial credit; extras lose points.
              </li>
              <li>
                <strong>High-risk assertions</strong>, from the relevant set, check the ones the client context
                makes risky. Feedback shows the data&rsquo;s risk reasons.
              </li>
              <li>
                <strong>Procedures</strong>, for each procedure, match the assertion(s) it tests, or flag it as
                a <em>trap</em>: a plausible-looking procedure that tests the wrong assertion for the risk at
                hand. Catching a trap is the highest-value action in the game.
              </li>
            </ol>
            <p>
              <strong>Keyboard:</strong> number keys <kbd>1</kbd>&ndash;<kbd>9</kbd>, <kbd>0</kbd> toggle assertions &middot;{' '}
              <kbd>T</kbd> flags a trap &middot; <kbd>Enter</kbd> submits.
            </p>
            <p>
              A scenario is <strong>mastered</strong> when every phase scores &ge; 80%.
            </p>
          </div>
        )}
      </section>
      <section className="card daily">
        <h2><Icon name="calendar" /> Daily challenge</h2>
        <p className="muted">
          The same five scenarios for everyone, {todayKey()}. Come back tomorrow for a fresh draw.
        </p>
        {dailyDone ? (
          <p className="muted small">
            Played today &middot; best {dailyDone.score} pts, {dailyDone.mastered}/{dailyDone.total} mastered. Play
            again to improve your best.
          </p>
        ) : (
          <p className="muted small">Not attempted yet today.</p>
        )}
        <button className="btn btn-primary" onClick={onStartDaily}>
          <Icon name="play" size={15} /> Play today&rsquo;s challenge
        </button>
      </section>
      <section className="card stats">
        <div className="career-head">
          <h2><Icon name="trophy" /> Career ladder</h2>
          <button className="btn btn-ghost btn-small" onClick={onOpenMastery}>
            <Icon name="map" size={15} /> Mastery map &rarr;
          </button>
        </div>
        <div className="career-rank">
          <span className="career-title">{rank.title} <span className="career-latin">&middot; {rank.latin}</span></span>
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
      <section className="final-cta">
        <JanusCoin face="skeptical" size={140} />
        <button className="btn btn-flip" onClick={flip}>
          <span className="btn-flip-label">Flip a scenario.</span>
        </button>
        <p className="final-cta-caption">Dubito has doubted every number it has ever seen.</p>
      </section>
      <footer className="disclaimer">
        <p>
          Dubito is a personal hobby project by Ryan Lolachi. It is not affiliated with, endorsed by, or
          produced by any employer, professional services firm, accounting body, or standard setter. All
          views and content are the author&rsquo;s own.
        </p>
        <p>
          This game is a training aid, not an authoritative source. Errors might exist, and double
          verification against the actual standards and your firm&rsquo;s methodology is important. Always
          consult the primary literature and applicable professional requirements before relying on
          anything here.
        </p>
      </footer>
    </div>
  );
}
