import { useEffect, useState } from 'react';
import type { SessionRecord } from '../storage';
import type { RoundRecord } from '../App';
import { RoundSummary } from './RoundSummary';

interface Props {
  rounds: SessionRecord[];
  onHome: () => void;
  onReview?: (index: number) => void;
  roundRecords?: RoundRecord[];
}

export function SessionSummary({ rounds, onHome, roundRecords }: Props) {
  const [reviewIndex, setReviewIndex] = useState<number | null>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (reviewIndex !== null) {
        if (e.key === 'Escape') setReviewIndex(null);
      } else if (e.key === 'Enter') {
        onHome();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [reviewIndex, onHome]);

  if (reviewIndex !== null && roundRecords && roundRecords[reviewIndex]) {
    return (
      <div className="review-mode">
        <button className="btn btn-ghost btn-small" onClick={() => setReviewIndex(null)}>← Back to session summary (Esc)</button>
        <RoundSummary
          round={roundRecords[reviewIndex]}
          index={reviewIndex}
          total={roundRecords.length}
          isLast={false}
          onNext={() => setReviewIndex((i) => (i === null ? null : Math.min(i + 1, roundRecords.length - 1)))}
          onEnd={() => setReviewIndex(null)}
        />
      </div>
    );
  }

  const totalScore = rounds.reduce((s, r) => s + r.total, 0);
  const masteredCount = rounds.filter((r) => r.mastered).length;

  const phaseAccuracy = (roundRecords ?? []).length
    ? ([1, 2, 3] as const).map((p) => {
        const ratios = (roundRecords ?? []).map((r) =>
          p === 1 ? r.score.phase1.ratio : p === 2 ? r.score.phase2.ratio : r.score.phase3.ratio
        );
        return ratios.reduce((a, b) => a + b, 0) / ratios.length;
      })
    : [];

  return (
    <div className="screen session-summary">
      <header className="hud">
        <div className="hud-left">
          <span className="hud-title">Session summary</span>
        </div>
      </header>

      <div className="summary-hero">
        <h2>Session complete</h2>
        <p className="summary-total">{totalScore} <span className="muted">pts total</span></p>
        <p className="muted">
          {rounds.length} scenarios · {masteredCount} mastered
        </p>
      </div>

      {phaseAccuracy.length > 0 && (
        <section className="card">
          <h3>Per-phase accuracy</h3>
          <div className="breakdown-row">
            <span>Phase 1 · Relevant assertions</span>
            <div className="bar"><div className={`bar-fill ${phaseAccuracy[0] >= 0.8 ? 'bar-green' : 'bar-amber'}`} style={{ width: `${Math.round(phaseAccuracy[0] * 100)}%` }} /></div>
            <span className="bar-num">{Math.round(phaseAccuracy[0] * 100)}%</span>
          </div>
          <div className="breakdown-row">
            <span>Phase 2 · High-risk assertions</span>
            <div className="bar"><div className={`bar-fill ${phaseAccuracy[1] >= 0.8 ? 'bar-green' : 'bar-amber'}`} style={{ width: `${Math.round(phaseAccuracy[1] * 100)}%` }} /></div>
            <span className="bar-num">{Math.round(phaseAccuracy[1] * 100)}%</span>
          </div>
          <div className="breakdown-row">
            <span>Phase 3 · Procedures</span>
            <div className="bar"><div className={`bar-fill ${phaseAccuracy[2] >= 0.8 ? 'bar-green' : 'bar-amber'}`} style={{ width: `${Math.round(phaseAccuracy[2] * 100)}%` }} /></div>
            <span className="bar-num">{Math.round(phaseAccuracy[2] * 100)}%</span>
          </div>
        </section>
      )}

      <section className="card">
        <h3>Scenarios</h3>
        <ul className="scenario-list">
          {rounds.map((r, i) => (
            <li key={r.scenarioId} className={`scenario-row ${r.mastered ? 'row-mastered' : ''}`}>
              <span className={`pf ${r.mastered ? 'pf-pass' : 'pf-fail'}`}>{r.mastered ? '★' : '·'}</span>
              <span className="row-name">{r.lineItem}</span>
              <span className="row-pct">{Math.round(r.ratio * 100)}%</span>
              <span className="row-pts">{r.total} pts</span>
              {roundRecords && (
                <button className="btn btn-ghost btn-small" onClick={() => setReviewIndex(i)}>Review</button>
              )}
            </li>
          ))}
        </ul>
      </section>

      <div className="phase-actions">
        <button className="btn btn-primary" autoFocus onClick={onHome}>Back to home (Enter)</button>
      </div>
      <p className="muted small">
        Career stats (games played, average score, best streak, scenarios mastered) are saved in this browser.
      </p>
    </div>
  );
}
