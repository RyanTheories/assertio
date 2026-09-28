import { useEffect, useMemo, useRef, useState } from 'react';
import { getGameData, loadGameData, type ValidationIssue } from './data/validate';
import type { AssertionId, Scenario } from './types';
import type { ProcedureAnswer, RoundScore } from './scoring';
import { scoreRound } from './scoring';
import { sectorFor } from './sectors';
import { pickDailyScenarios, todayKey } from './daily';
import { startAmbience, toggleAmbience } from './audio';
import { armSfx, setSfxMuted } from './sfx';
import { Home } from './screens/Home';
import { AssertionsGuide } from './screens/AssertionsGuide';
import { FinancialStatements } from './screens/FinancialStatements';
import { IsasReference } from './screens/IsasReference';
import { MasteryMap } from './screens/MasteryMap';
import { Round } from './screens/Round';
import { RoundSummary } from './screens/RoundSummary';
import { SessionSummary } from './screens/SessionSummary';
import { recordDailyResult, recordSession, recordMistakes, clearMistakes, loadState, type SessionRecord } from './storage';
import { collectMistakes } from './mistakes';
import { MistakeReview } from './screens/MistakeReview';

type Screen =
  | { kind: 'home' }
  | { kind: 'guide' }
  | { kind: 'financialStatements' }
  | { kind: 'isas' }
  | { kind: 'mastery' }
  | { kind: 'mistakes' }
  | { kind: 'round' }
  | { kind: 'roundSummary' }
  | { kind: 'sessionSummary' };

export interface SessionConfig {
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'mixed';
  industry: string | null;
  statement: 'income_statement' | 'balance_sheet' | 'all';
  /** dateKey of the daily challenge this session is a run of, if any */
  daily?: string;
}

export interface RoundRecord {
  scenario: Scenario;
  score: RoundScore;
  phase1Selected: Set<AssertionId>;
  phase2Selected: Set<AssertionId>;
  phase3Answers: ProcedureAnswer[];
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function pickSessionScenarios(all: Scenario[], cfg: SessionConfig): Scenario[] {
  if (cfg.daily) return pickDailyScenarios(all, cfg.daily);
  let pool = all;
  if (cfg.difficulty !== 'mixed') pool = pool.filter((s) => s.difficulty === cfg.difficulty);
  if (cfg.industry) {
    pool = pool.filter((s) => sectorFor(s.industry) === cfg.industry);
  }
  if (cfg.statement !== 'all') {
    const groupOf = (s: Scenario) =>
      s.statement === 'SoPL' || s.statement === 'income_statement' ? 'income_statement' : s.statement === 'SoFP' || s.statement === 'balance_sheet' ? 'balance_sheet' : 'disclosures';
    pool = pool.filter((s) => groupOf(s) === cfg.statement);
  }
  return shuffle(pool);
}

export default function App() {
  const validation = useMemo(() => loadGameData(), []);
  const [screen, setScreen] = useState<Screen>({ kind: 'home' });
  const [mistakes, setMistakes] = useState(() => loadState().mistakes);
  const [musicOn, setMusicOn] = useState(false);
  const userMuted = useRef(false);

  useEffect(() => {
    const startOnGesture = (e: Event) => {
      armSfx();
      if (userMuted.current) return;
      if (e.target instanceof Element && e.target.closest('.music-toggle')) return;
      setMusicOn(startAmbience());
      window.removeEventListener('pointerdown', startOnGesture);
      window.removeEventListener('keydown', startOnGesture);
    };
    window.addEventListener('pointerdown', startOnGesture, { once: false });
    window.addEventListener('keydown', startOnGesture, { once: false });
    return () => {
      window.removeEventListener('pointerdown', startOnGesture);
      window.removeEventListener('keydown', startOnGesture);
    };
  }, []);
  const [sessionScenarios, setSessionScenarios] = useState<Scenario[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [rounds, setRounds] = useState<RoundRecord[]>([]);
  const [streak, setStreak] = useState(0);
  const [currentRound, setCurrentRound] = useState<RoundRecord | null>(null);
  const [sessionConfig, setSessionConfig] = useState<SessionConfig | null>(null);

  if (!validation.data) {
    return <ErrorScreen issues={validation.issues} />;
  }
  const data = validation.data;

  const startSession = (cfg: SessionConfig) => {
    const picked = pickSessionScenarios(data.scenarios, cfg);
    setSessionConfig(cfg);
    setSessionScenarios(picked);
    setRounds([]);
    setCurrentIndex(0);
    setStreak(0);
    setCurrentRound(null);
    if (picked.length === 0) {
      setScreen({ kind: 'sessionSummary' });
    } else {
      setScreen({ kind: 'round' });
    }
  };

  const finishRound = (scenario: Scenario, p1: Set<AssertionId>, p2: Set<AssertionId>, p3: ProcedureAnswer[], hintsUsed = 0) => {
    const score = scoreRound(scenario, p1, p2, p3, streak, hintsUsed);
    const record: RoundRecord = { scenario, score, phase1Selected: p1, phase2Selected: p2, phase3Answers: p3 };
    recordMistakes(collectMistakes(scenario, p1, p2, p3));
    setCurrentRound(record);
    setRounds((prev) => [...prev, record]);
    setStreak((s) => (score.mastered ? s + 1 : 0));
    setScreen({ kind: 'roundSummary' });
  };

  const nextScenario = () => {
    const next = currentIndex + 1;
    setCurrentIndex(next);
    setCurrentRound(null);
    if (next < sessionScenarios.length) {
      setScreen({ kind: 'round' });
    } else {
      endSession();
    }
  };

  const endSession = () => {
    setScreen({ kind: 'sessionSummary' });
  };

  const backHome = () => {
    if (rounds.length > 0) {
      if (sessionConfig?.daily) {
        recordDailyResult({
          dateKey: sessionConfig.daily,
          score: rounds.reduce((s, r) => s + r.score.total, 0),
          mastered: rounds.filter((r) => r.score.mastered).length,
          total: rounds.length,
        });
      }
      recordSession(
        rounds.map((r) => ({ scenarioId: r.scenario.id, lineItem: r.scenario.line_item, score: r.score })),
        streak
      );
    }
    setMistakes(loadState().mistakes);
    setScreen({ kind: 'home' });
    setRounds([]);
    setSessionScenarios([]);
    setCurrentIndex(0);
    setStreak(0);
    setCurrentRound(null);
  };

  return (
    <>
      <button
        className={`btn btn-small music-toggle ${musicOn ? 'btn-primary' : 'btn-ghost'}`}
        onClick={() => {
          const next = toggleAmbience();
          userMuted.current = !next;
          setSfxMuted(!next);
          setMusicOn(next);
        }}
        aria-pressed={musicOn}
        title={musicOn ? 'Mute Roman ambience' : 'Play Roman ambience'}
      >
        {musicOn ? '♫ Playing · mute' : '♫ Roman Ambience'}
      </button>
      {screen.kind === 'home' && (
        <Home
          scenarios={data.scenarios}
          onStart={startSession}
          onOpenGuide={() => setScreen({ kind: 'guide' })}
          onOpenStatements={() => setScreen({ kind: 'financialStatements' })}
          onOpenIsas={() => setScreen({ kind: 'isas' })}
          onOpenMastery={() => setScreen({ kind: 'mastery' })}
          onOpenMistakes={() => setScreen({ kind: 'mistakes' })}
          onStartDaily={() => startSession({ difficulty: 'mixed', industry: null, statement: 'all', daily: todayKey() })}
        />
      )}
      {screen.kind === 'guide' && (
        <AssertionsGuide onHome={() => setScreen({ kind: 'home' })} />
      )}
      {screen.kind === 'financialStatements' && (
        <FinancialStatements onHome={() => setScreen({ kind: 'home' })} />
      )}
      {screen.kind === 'isas' && (
        <IsasReference onHome={() => setScreen({ kind: 'home' })} />
      )}
      {screen.kind === 'mastery' && (
        <MasteryMap scenarios={data.scenarios} onHome={() => setScreen({ kind: 'home' })} />
      )}
      {screen.kind === 'mistakes' && (
        <MistakeReview mistakes={mistakes} onHome={() => setScreen({ kind: 'home' })} onClear={() => { clearMistakes(); setMistakes([]); }} />
      )}
      {screen.kind === 'round' && sessionScenarios.length > 0 && (
        <Round
          key={sessionScenarios[currentIndex].id + '-' + currentIndex}
          scenario={sessionScenarios[currentIndex]}
          index={currentIndex}
          total={sessionScenarios.length}
          sessionScore={rounds.reduce((s, r) => s + r.score.total, 0)}
          streak={streak}
          onFinish={finishRound}
          onEndSession={endSession}
        />
      )}
      {screen.kind === 'roundSummary' && currentRound && (
        <RoundSummary
          round={currentRound}
          index={currentIndex}
          total={sessionScenarios.length}
          isLast={currentIndex + 1 >= sessionScenarios.length}
          onNext={nextScenario}
          onEnd={endSession}
        />
      )}
      {screen.kind === 'sessionSummary' && (
        <SessionSummary
          rounds={rounds.map((r): SessionRecord => ({
            scenarioId: r.scenario.id,
            lineItem: r.scenario.line_item,
            mastered: r.score.mastered,
            ratio: r.score.ratio,
            total: r.score.total,
          }))}
          roundRecords={rounds}
          onHome={backHome}
        />
      )}
    </>
  );
}

function ErrorScreen({ issues }: { issues: ValidationIssue[] }) {
  return (
    <div className="error-screen">
      <h1>⚠️ Data validation failed</h1>
      <p>
        The game cannot start because <code>src/data/scenarios.json</code> failed validation.
        The game's fairness depends on clean data. Fix the issues below and reload.
      </p>
      <ul>
        {issues.map((iss, i) => (
          <li key={i}>
            <strong>[{iss.check}]</strong> {iss.message}
          </li>
        ))}
      </ul>
    </div>
  );
}

export { getGameData };
