import type { Scenario } from '../types';
import { statementLabel } from '../data/validate';

export function PhaseBrief({ scenario, onContinue }: { scenario: Scenario; onContinue: () => void }) {
  return (
    <div className="phase phase-brief">
      <div className="brief-card">
        <div className="brief-meta">
          <span className="badge badge-industry">{scenario.industry}</span>
          <span className="badge">{statementLabel(scenario.statement)}</span>
          <span className="badge badge-difficulty">{scenario.difficulty}</span>
        </div>
        <p className="eyebrow">Line item under audit</p>
        <h2 className="brief-line-item">{scenario.line_item}</h2>
        <div className="brief-context">
          <p className="eyebrow">Engagement brief</p>
          <p>{scenario.client_context}</p>
        </div>
        <p className="muted small">
          Three phases: relevant assertions → high-risk assertions → procedures. Watch for procedures that look
          right but test the wrong assertion.
        </p>
        <button className="btn btn-primary" autoFocus onClick={onContinue}>
          Begin round (Enter)
        </button>
      </div>
      <p className="kbd-hint">
        <kbd>Enter</kbd> to continue
      </p>
    </div>
  );
}
