import { useEffect, useState } from 'react';
import type { AssertionId, Procedure, Scenario } from '../types';
import { scoreProcedures, type Phase3Score, type ProcedureAnswer } from '../scoring';
import { sfxBlip, sfxTrapToggle, sfxTrapCaught, sfxChime, sfxBuzz } from '../sfx';
import { ASSERTION_LABELS, TAXONOMY_ORDER } from '../ui';
import { ConceptText } from '../components/ConceptText';

interface ShuffledProc {
  proc: Procedure;
  origIndex: number;
}

interface Props {
  scenario: Scenario;
  shuffledProcedures: ShuffledProc[];
  answers: ProcedureAnswer[];
  onAnswersChange: (next: ProcedureAnswer[]) => void;
  onSubmit: () => void;
}

const ALL_IDS: AssertionId[] = [...TAXONOMY_ORDER.transactions, ...TAXONOMY_ORDER.balances] as AssertionId[];

export function PhaseProcedures({ scenario, shuffledProcedures, answers, onAnswersChange, onSubmit }: Props) {
  const [feedback, setFeedback] = useState<Phase3Score | null>(null);
  const [focus, setFocus] = useState(0);

  const getAnswer = (i: number): ProcedureAnswer => answers[i] ?? { matched: [], flaggedTrap: false };

  const setAnswer = (i: number, next: ProcedureAnswer) => {
    const copy = [...answers];
    copy[i] = next;
    onAnswersChange(copy);
  };

  const toggleMatch = (i: number, id: AssertionId) => {
    const cur = getAnswer(i);
    if (cur.flaggedTrap) return;
    const matched = new Set(cur.matched);
    if (matched.has(id)) matched.delete(id);
    else matched.add(id);
    setAnswer(i, { ...cur, matched: [...matched] });
  };

  const toggleTrap = (i: number) => {
    const cur = getAnswer(i);
    if (cur.flaggedTrap) {
      setAnswer(i, { matched: [], flaggedTrap: false });
      sfxTrapToggle(false);
    } else {
      setAnswer(i, { matched: [], flaggedTrap: true });
      sfxTrapToggle(true);
    }
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (feedback) return;
      if (e.key === 'Enter') {
        onSubmit();
        return;
      }
      if (e.key.toLowerCase() === 't') {
        e.preventDefault();
        toggleTrap(focus);
        return;
      }
      if (e.key === 'ArrowDown' || e.key === 'j') {
        setFocus((f) => Math.min(f + 1, shuffledProcedures.length - 1));
      } else if (e.key === 'ArrowUp' || e.key === 'k') {
        setFocus((f) => Math.max(f - 1, 0));
      } else if (/^[0-9]$/.test(e.key)) {
        const n = e.key === '0' ? 10 : parseInt(e.key, 10);
        if (n >= 1 && n <= ALL_IDS.length) {
          const id = ALL_IDS[n - 1];
          const cur = getAnswer(focus);
          if (!cur.flaggedTrap) toggleMatch(focus, id);
        }
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  });

  const submit = () => {
    if (feedback) return;
    const ordered: ProcedureAnswer[] = scenario.procedures.map(() => ({ matched: [], flaggedTrap: false }));
    shuffledProcedures.forEach((sp, shuffledIdx) => {
      ordered[sp.origIndex] = getAnswer(shuffledIdx);
    });
    const fb = scoreProcedures(scenario, ordered);
    setFeedback(fb);
    if (fb.trapsCaught > 0) sfxTrapCaught();
    if (fb.ratio >= 0.8) sfxChime();
    else if (fb.trapsCaught === 0) sfxBuzz();
  };

  const relevantSet = new Set(scenario.assertions_relevant);

  return (
    <div className="phase phase-procedures">
      <div className="phase-head">
        <p className="eyebrow">Phase 3 of 3</p>
        <h2>Match each procedure to the assertion(s) it tests, or flag the trap</h2>
        <p className="muted">
          Some procedures look perfectly reasonable but don't validly test the risk at hand. Flag those as traps.
          Correctly flagging a trap is the highest-value action in the game.
        </p>
      </div>

      <ol className="proc-list">
        {shuffledProcedures.map((sp, i) => {
          const ans = getAnswer(i);
          const fb = feedback ? feedback.procedures[sp.origIndex] : null;
          return (
            <li
              key={i}
              className={`proc ${focus === i && !feedback ? 'proc-focus' : ''} ${fb ? (fb.isTrap ? (fb.caught ? 'proc-trap-caught' : 'proc-trap-missed') : fb.points >= fb.maxPoints ? 'proc-ok' : 'proc-partial') : ''}`}
              onMouseEnter={() => !feedback && setFocus(i)}
            >
              <div className="proc-top">
                <span className="a-key">{i === 9 ? '0' : String(i + 1)}</span>
                <p className="proc-text"><ConceptText>{sp.proc.procedure}</ConceptText></p>
                {sp.proc.isa_ref && <span className="badge badge-isa">{sp.proc.isa_ref}</span>}
              </div>

              {!feedback ? (
                <div className="proc-controls">
                  <div className="match-chips">
                    {ALL_IDS.map((id, ai) => {
                      const on = ans.matched.includes(id);
                      const rel = relevantSet.has(id);
                      return (
                        <button
                          key={id}
                          className={`chip chip-sm ${on ? 'chip-active' : ''} ${rel ? 'chip-rel' : ''}`}
                          disabled={ans.flaggedTrap}
                          title={rel ? 'in the relevant set' : undefined}
                          onClick={() => { toggleMatch(i, id); sfxBlip(); }}
                        >
                          <span className="chip-idx">{ai === 9 ? '0' : String(ai + 1)}</span> {ASSERTION_LABELS[id]}
                        </button>
                      );
                    })}
                  </div>
                  <button
                    className={`btn btn-trap ${ans.flaggedTrap ? 'btn-trap-active' : ''}`}
                    onClick={() => toggleTrap(i)}
                  >
                    ⚠ Flag as trap <span className="kbd-hint-inline">(T)</span>
                  </button>
                </div>
              ) : (
                <div className="proc-feedback">
                  {fb && fb.isTrap ? (
                    fb.caught ? (
                      <div className="trap-callout trap-caught">
                        <p className="trap-title">🎯 Trap caught!</p>
                        <p><ConceptText>{sp.proc.trap_explanation}</ConceptText></p>
                        <p className="trap-pts">+{fb.points} pts, highest-value action</p>
                      </div>
                    ) : (
                      <div className="trap-callout trap-missed">
                        <p className="trap-title">⚠ This one was a trap</p>
                        <p><ConceptText>{sp.proc.trap_explanation}</ConceptText></p>
                        <p className="trap-pts">{fb.points} pts</p>
                    </div>
                    )
                  ) : (
                    <div className={`match-fb ${fb && fb.points >= fb.maxPoints ? 'flash-green' : 'flash-amber'}`}>
                      <p className="fb-head">
                        {fb && fb.points >= fb.maxPoints
                          ? 'Correctly matched.'
                          : `Matched ${fb?.matchedCorrect ?? 0} of ${(fb?.expected ?? []).length} · wrong: ${fb?.matchedWrong ?? 0}`}
                        {' '}· {fb?.points ?? 0} pts
                      </p>
                      <p className="muted small">
                        Tests: {(fb?.expected ?? []).map((a) => ASSERTION_LABELS[a]).join(', ') || '·'}
                        {fb?.missed ? ` · missed: ${fb.expected.filter((a) => !ans.matched.includes(a)).map((a) => ASSERTION_LABELS[a]).join(', ')}` : ''}
                        {ans.flaggedTrap ? ' · you flagged this as a trap, but it is a valid procedure' : ''}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ol>

      {!feedback ? (
        <div className="phase-actions">
          <button className="btn btn-primary" onClick={submit}>Submit all (Enter)</button>
          <span className="kbd-hint"><kbd>↑</kbd>/<kbd>↓</kbd> select · number keys match · <kbd>T</kbd> trap · <kbd>Enter</kbd> submit</span>
        </div>
      ) : (
        <div className="feedback">
          <p className="fb-head">
            Phase 3: {feedback.points}/{feedback.maxPoints} pts · traps caught {feedback.trapsCaught}/{feedback.trapsTotal}
          </p>
          <button className="btn btn-primary" autoFocus onClick={onSubmit}>See round summary (Enter)</button>
        </div>
      )}
    </div>
  );
}
