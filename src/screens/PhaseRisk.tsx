import { useEffect, useState } from 'react';
import type { AssertionId, Scenario } from '../types';
import { scoreHighRisk } from '../scoring';
import { sfxBlip, sfxChime, sfxBuzz } from '../sfx';
import { ASSERTION_LABELS } from '../ui';
import { statementLabel } from '../data/validate';
import { ConceptText } from '../components/ConceptText';
import { HintButton } from '../components/HintButton';
import { whyNotHighRisk } from '../teach';
import { Icon } from '../components/Icon';

interface Props {
  scenario: Scenario;
  selected: Set<AssertionId>;
  onChange: (next: Set<AssertionId>) => void;
  onSubmit: () => void;
  hint: string;
  onHintUsed: () => void;
}

export function PhaseRisk({ scenario, selected, onChange, onSubmit, hint, onHintUsed }: Props) {
  const [feedback, setFeedback] = useState<ReturnType<typeof scoreHighRisk> | null>(null);

  const relevant = scenario.assertions_relevant;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (feedback) return;
      if (e.key === 'Enter') {
        onSubmit();
        return;
      }
      const digit = /^[0-9]$/.test(e.key) ? (e.key === '0' ? 10 : parseInt(e.key, 10)) : 0;
      if (digit >= 1 && digit <= relevant.length) {
        const id = relevant[digit - 1];
        const next = new Set(selected);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        onChange(next);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [selected, relevant, feedback, onChange, onSubmit]);

  const submit = () => {
    if (feedback) return;
    const fb = scoreHighRisk(selected, scenario);
    setFeedback(fb);
    if (fb.ratio >= 0.8) sfxChime();
    else sfxBuzz();
  };

  useEffect(() => {
    if (!feedback) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Enter') onSubmit();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [feedback, onSubmit]);

  const expected = new Set(Object.keys(scenario.assertions_high_risk) as AssertionId[]);

  return (
    <div className="phase phase-risk">
      <div className="phase-head">
        <p className="eyebrow">Phase 2 of 3</p>
        <h2><Icon name="alert" /> Which relevant assertions are high risk for this client?</h2>
        <p className="muted">
          {scenario.line_item} · {statementLabel(scenario.statement)}, judge from the engagement brief. Partial credit.
        </p>
      </div>

      <div className="brief-context recap">
        <p className="eyebrow">Engagement brief</p>
        <p><ConceptText>{scenario.client_context}</ConceptText></p>
      </div>

      <div className="assertion-groups risk-groups">
        <div className="assertion-group">
          {relevant.map((id, i) => {
            const key = i === 9 ? '0' : String(i + 1);
            const isSel = selected.has(id);
            const state = feedback
              ? expected.has(id)
                ? isSel ? 'correct' : 'missed'
                : isSel ? 'extra' : 'none'
              : isSel ? 'sel' : 'none';
            return (
              <button
                key={id}
                className={`assertion a-${state}`}
                disabled={!!feedback}
                onClick={() => {
                  const next = new Set(selected);
                  if (next.has(id)) next.delete(id);
                  else next.add(id);
                  onChange(next);
                  sfxBlip();
                }}
              >
                <span className="a-key">{key}</span>
                <span className="a-name">{ASSERTION_LABELS[id]}</span>
                {feedback && expected.has(id) && (
                  <span className="a-mark a-correct">✓ high risk</span>
                )}
                {feedback && !expected.has(id) && isSel && (
                  <span className="a-mark a-extra">✗ not high risk</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {!feedback ? (
        <div className="phase-actions">
          <HintButton onReveal={onHintUsed} disabled={!!feedback}>{hint}</HintButton>
          <button className="btn btn-primary" onClick={submit}>Submit (Enter)</button>
          <span className="kbd-hint"><kbd>1</kbd>–<kbd>{Math.min(relevant.length, 9)}</kbd> toggle · <kbd>Enter</kbd> submit</span>
        </div>
      ) : (
        <div className={`feedback ${feedback.ratio >= 0.8 ? 'flash-green' : 'flash-amber'}`}>
          <p className="fb-head">
            {feedback.ratio === 1
              ? 'All high-risk assertions identified.'
              : `Correct: ${feedback.correct} · Missed: ${feedback.missing} · Extra: ${feedback.extra}`}
            {' '}· {Math.max(0, feedback.points)}/{feedback.maxPoints} pts
          </p>
          <div className="risk-reasons">
            {(Object.entries(scenario.assertions_high_risk) as [AssertionId, string][]).map(([id, reason]) => (
              <p key={id} className={`risk-reason ${selected.has(id) ? 'rr-caught' : 'rr-missed'}`}>
                <strong>{ASSERTION_LABELS[id]} — why high risk:</strong> <ConceptText>{reason}</ConceptText>
              </p>
            ))}
            {scenario.assertions_relevant
              .filter((a) => !(a in scenario.assertions_high_risk))
              .map((a) => (
                <p key={a} className="risk-reason rr-notrisk">
                  <strong>{ASSERTION_LABELS[a]} — why not high risk:</strong> {whyNotHighRisk(a)}
                </p>
              ))}
          </div>
          <button className="btn btn-primary" autoFocus onClick={onSubmit}>Continue (Enter)</button>
        </div>
      )}
    </div>
  );
}
