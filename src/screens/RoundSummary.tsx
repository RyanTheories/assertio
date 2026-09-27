import { useEffect } from 'react';
import { toRoman } from '../sectors';
import type { RoundRecord } from '../App';
import { ASSERTION_LABELS } from '../ui';

interface Props {
  round: RoundRecord;
  index: number;
  total: number;
  isLast: boolean;
  onNext: () => void;
  onEnd: () => void;
}

export function RoundSummary({ round, index, total, isLast, onNext, onEnd }: Props) {
  const { scenario, score } = round;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Enter') onNext();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onNext]);

  const pct = (r: number) => Math.round(r * 100);

  return (
    <div className="screen round-summary">
      <header className="hud">
        <div className="hud-left">
          <span className="hud-title">Round {toRoman(index + 1)} / {toRoman(total)}</span>
          <span className="muted">{scenario.line_item} · {scenario.industry}</span>
        </div>
      </header>

      <div className={`summary-hero ${score.mastered ? 'mastered' : ''}`}>
        <h2>
          {score.mastered ? '★ Scenario mastered' : 'Round complete'}
        </h2>
        <p className="summary-total">
          {score.total} <span className="muted">/ {score.maxTotal} pts</span>
        </p>
        {score.streakBonus > 0 && (
          <p className="streak-bonus">🔥 Streak bonus +{score.streakBonus}</p>
        )}
      </div>

      <section className="card breakdown">
        <h3>Score breakdown</h3>
        <div className="breakdown-row">
          <span>Phase 1 · Relevant assertions</span>
          <div className="bar"><div className={`bar-fill ${score.phase1.ratio >= 0.8 ? 'bar-green' : 'bar-amber'}`} style={{ width: `${pct(Math.min(1, score.phase1.ratio))}%` }} /></div>
          <span className="bar-num">{pct(score.phase1.ratio)}% · {Math.max(0, score.phase1.points)}/{score.phase1.maxPoints} pts</span>
        </div>
        <div className="breakdown-row">
          <span>Phase 2 · High-risk assertions</span>
          <div className="bar"><div className={`bar-fill ${score.phase2.ratio >= 0.8 ? 'bar-green' : 'bar-amber'}`} style={{ width: `${pct(Math.min(1, score.phase2.ratio))}%` }} /></div>
          <span className="bar-num">{pct(score.phase2.ratio)}% · {Math.max(0, score.phase2.points)}/{score.phase2.maxPoints} pts</span>
        </div>
        <div className="breakdown-row">
          <span>Phase 3 · Procedures (traps {score.phase3.trapsCaught}/{score.phase3.trapsTotal})</span>
          <div className="bar"><div className={`bar-fill ${score.phase3.ratio >= 0.8 ? 'bar-green' : 'bar-amber'}`} style={{ width: `${pct(Math.min(1, score.phase3.ratio))}%` }} /></div>
          <span className="bar-num">{pct(score.phase3.ratio)}% · {score.phase3.points}/{score.phase3.maxPoints} pts</span>
        </div>
      </section>

      <section className="card audit-note">
        <h3>Audit note, key risks</h3>
        <ul>
          {(Object.entries(scenario.assertions_high_risk) as [string, string][]).map(([id, reason]) => (
            <li key={id}>
              <strong>{ASSERTION_LABELS[id as keyof typeof ASSERTION_LABELS]}:</strong> {reason}
            </li>
          ))}
        </ul>
      </section>

      <section className="card isa">
        <h3>ISA references</h3>
        <div className="chip-row">
          {(scenario.isa_refs ?? []).map((ref) => (
            <span key={ref} className="badge badge-isa">{ref}</span>
          ))}
        </div>
      </section>

      <div className="phase-actions">
        {!isLast ? (
          <button className="btn btn-primary" autoFocus onClick={onNext}>Next scenario (Enter)</button>
        ) : (
          <button className="btn btn-primary" autoFocus onClick={onEnd}>Session summary (Enter)</button>
        )}
        <button className="btn btn-ghost" onClick={onEnd}>End session</button>
      </div>
    </div>
  );
}
