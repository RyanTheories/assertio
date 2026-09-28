import { useEffect, useState } from 'react';
import type { AssertionId, Scenario } from '../types';
import { scoreRelevant } from '../scoring';
import { sfxBlip, sfxChime, sfxBuzz } from '../sfx';
import { ASSERTION_LABELS, ASSERTION_SHORT, TAXONOMY_ORDER } from '../ui';
import { statementLabel } from '../data/validate';
import { useMemoOnce } from '../utils';
import { HintButton } from '../components/HintButton';
import { Icon } from '../components/Icon';
import { whyRelevant, whyNotRelevant } from '../teach';

interface Props {
  scenario: Scenario;
  selected: Set<AssertionId>;
  onChange: (next: Set<AssertionId>) => void;
  onSubmit: () => void;
  hint: string;
  onHintUsed: () => void;
}

export function PhaseRelevant({ scenario, selected, onChange, onSubmit, hint, onHintUsed }: Props) {
  const [feedback, setFeedback] = useState<ReturnType<typeof scoreRelevant> | null>(null);

  const allIds = useMemoOnce<{ id: AssertionId; group: 'transactions' | 'balances' }[]>(() => [
    ...TAXONOMY_ORDER.transactions.map((id) => ({ id, group: 'transactions' as const })),
    ...TAXONOMY_ORDER.balances.map((id) => ({ id, group: 'balances' as const })),
  ]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (feedback) return;
      if (e.key === 'Enter') {
        onSubmit();
        return;
      }
      const digit = /^[0-9]$/.test(e.key) ? (e.key === '0' ? 10 : parseInt(e.key, 10)) : 0;
      if (digit >= 1 && digit <= allIds.length) {
        const id = allIds[digit - 1].id;
        const next = new Set(selected);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        onChange(next);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [selected, allIds, feedback, onChange, onSubmit]);

  const submit = () => {
    if (feedback) return;
    const fb = scoreRelevant(selected, scenario);
    setFeedback(fb);
    if (fb.ratio >= 0.8) sfxChime();
    else sfxBuzz();
  };

  const expected = new Set(scenario.assertions_relevant);
  const proceed = () => {
    onSubmit();
  };

  useEffect(() => {
    if (!feedback) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Enter') proceed();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [feedback, onSubmit]);

  return (
    <div className="phase phase-relevant">
      <div className="phase-head">
        <p className="eyebrow">Phase 1 of 3</p>
        <h2><Icon name="filter" /> Which assertions are relevant to this line item?</h2>
        <p className="muted">
          {scenario.line_item} · {statementLabel(scenario.statement)}. Check every relevant assertion. Extras lose points.
        </p>
      </div>

      <div className="assertion-groups">
        {(['transactions', 'balances'] as const).map((group) => (
          <div key={group} className="assertion-group">
            <h3 className={`group-label group-${group}`}>
              {group === 'transactions' ? 'Transactions & events' : 'Account balances'}
            </h3>
            {allIds
              .map((a, i) => ({ ...a, n: i + 1 }))
              .filter((a) => a.group === group)
              .map(({ id, group: g, n }) => {
                const key = n === 10 ? '0' : String(n);
                const isSel = selected.has(id);
                const state = feedback
                  ? expected.has(id)
                    ? isSel ? 'correct' : 'missed'
                    : isSel ? 'extra' : 'none'
                  : isSel ? 'sel' : 'none';
                return (
                  <button
                    key={id + '-' + g}
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
                    <span className="a-desc">{ASSERTION_SHORT[id]}</span>
                    {feedback && expected.has(id) && (
                      <span className="a-mark a-correct">✓ relevant</span>
                    )}
                    {feedback && !expected.has(id) && isSel && (
                      <span className="a-mark a-extra">✗ not relevant</span>
                    )}
                    {feedback && (
                      <span className="a-why">
                        {expected.has(id)
                          ? scenario.why_relevant?.[id] ?? whyRelevant(id, scenario.line_item)
                          : whyNotRelevant(id, scenario.line_item)}
                      </span>
                    )}
                  </button>
                );
              })}
          </div>
        ))}
      </div>

      {!feedback ? (
        <div className="phase-actions">
          <HintButton onReveal={onHintUsed} disabled={!!feedback}>{hint}</HintButton>
          <button className="btn btn-primary" onClick={submit}>Submit (Enter)</button>
          <span className="kbd-hint"><kbd>1</kbd>–<kbd>9</kbd>, <kbd>0</kbd> toggle · <kbd>Enter</kbd> submit</span>
        </div>
      ) : (
        <div className={`feedback ${feedback.ratio >= 0.8 ? 'flash-green' : 'flash-amber'}`}>
          <p className="fb-head">
            {feedback.ratio === 1
              ? 'All relevant assertions identified.'
              : `Correct: ${feedback.correct} · Missed: ${feedback.missing} · Extra: ${feedback.extra}`}
            {' '}· {Math.max(0, feedback.points)}/{feedback.maxPoints} pts
          </p>
          {feedback.missing > 0 && (
            <p className="muted small">
              A one-line reminder: relevant assertions are those the line item's nature makes auditable; the
              data's set is now shown on the cards above.
            </p>
          )}
          <button className="btn btn-primary" autoFocus onClick={proceed}>Continue (Enter)</button>
        </div>
      )}
    </div>
  );
}
