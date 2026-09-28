import { useMemo, useState } from 'react';
import { toRoman } from '../sectors';
import type { AssertionId, Scenario } from '../types';
import type { ProcedureAnswer } from '../scoring';
import { PhaseBrief } from './PhaseBrief';
import { PhaseRelevant } from './PhaseRelevant';
import { PhaseRisk } from './PhaseRisk';
import { PhaseProcedures } from './PhaseProcedures';

export type Phase = 'brief' | 'relevant' | 'risk' | 'procedures';
const PHASE_ORDER: Phase[] = ['brief', 'relevant', 'risk', 'procedures'];

interface Props {
  scenario: Scenario;
  index: number;
  total: number;
  sessionScore: number;
  streak: number;
  onFinish: (scenario: Scenario, p1: Set<AssertionId>, p2: Set<AssertionId>, p3: ProcedureAnswer[]) => void;
  onEndSession: () => void;
}

export function Round({ scenario, index, total, sessionScore, streak, onFinish, onEndSession }: Props) {
  const [phase, setPhase] = useState<Phase>('brief');
  const [p1, setP1] = useState<Set<AssertionId>>(new Set());
  const [p2, setP2] = useState<Set<AssertionId>>(new Set());
  const [p3, setP3] = useState<ProcedureAnswer[]>([]);

  const shuffledProcedures = useMemo(() => {
    const arr = scenario.procedures.map((p, i) => ({ proc: p, origIndex: i }));
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [scenario]);

  return (
    <div className="screen round">
      <header className="hud">
        <div className="hud-left">
          <span className="hud-title">Quaestor</span>
          <span className="muted">Scenario {toRoman(index + 1)} / {toRoman(total)}</span>
        </div>
        <div className="hud-right">
          {streak > 0 && (
            <span className="streak streak-pulse" key={streak} title="Consecutive mastered scenarios">
              🔥 {streak}
            </span>
          )}
          <span className="score-meter">Score {sessionScore}</span>
          <button className="btn btn-ghost btn-small" onClick={onEndSession}>End session</button>
        </div>
        <div className="progress-track" role="progressbar" aria-valuenow={index} aria-valuemin={0} aria-valuemax={total}>
          <div className="progress-fill" style={{ width: `${(index / Math.max(total, 1)) * 100}%` }} />
          <div className="progress-tick current" style={{ left: `${(index / Math.max(total, 1)) * 100}%` }} />
        </div>
        <ol className="phase-steps" aria-label="Phase progress">
          {(['brief', 'relevant', 'risk', 'procedures'] as const).map((ph, i) => (
            <li
              key={ph}
              className={`phase-step ${phase === ph ? 'step-current' : ''} ${i < PHASE_ORDER.indexOf(phase) ? 'step-done' : ''}`}
            >
              {ph === 'brief' ? 'Brief' : ph === 'relevant' ? 'Assertions' : ph === 'risk' ? 'Risk' : 'Procedures'}
            </li>
          ))}
        </ol>
      </header>

      {phase === 'brief' && <PhaseBrief scenario={scenario} onContinue={() => setPhase('relevant')} />}
      {phase === 'relevant' && (
        <PhaseRelevant
          scenario={scenario}
          selected={p1}
          onChange={setP1}
          onSubmit={() => setPhase('risk')}
        />
      )}
      {phase === 'risk' && (
        <PhaseRisk
          scenario={scenario}
          selected={p2}
          onChange={setP2}
          onSubmit={() => setPhase('procedures')}
        />
      )}
      {phase === 'procedures' && (
        <PhaseProcedures
          scenario={scenario}
          shuffledProcedures={shuffledProcedures}
          answers={p3}
          onAnswersChange={setP3}
          onSubmit={() => onFinish(scenario, p1, p2, p3)}
        />
      )}
    </div>
  );
}
