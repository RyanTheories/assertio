import { useEffect } from 'react';
import type { Scenario } from '../types';
import { statementLabel } from '../data/validate';
import { ConceptText } from './ConceptText';

interface Props {
  scenario: Scenario;
  onClose: () => void;
}

/** The engagement brief, re-readable at any point during a round. */
export function BriefDialog({ scenario, onClose }: Props) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);
  return (
    <div className="brief-dialog-backdrop" onClick={onClose}>
      <div
        className="brief-dialog"
        role="dialog"
        aria-label="Engagement brief"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="brief-meta">
          <span className="badge badge-industry">{scenario.industry}</span>
          <span className="badge">{statementLabel(scenario.statement)}</span>
          <span className="badge badge-difficulty">{scenario.difficulty}</span>
        </div>
        <p className="eyebrow">Line item under audit</p>
        <h3 className="brief-line-item">{scenario.line_item}</h3>
        <div className="brief-context">
          <p className="eyebrow">Engagement brief</p>
          <p><ConceptText>{scenario.client_context}</ConceptText></p>
        </div>
        <button className="btn btn-primary" autoFocus onClick={onClose}>
          Close brief (Esc)
        </button>
      </div>
    </div>
  );
}
