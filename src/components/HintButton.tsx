import { useState } from 'react';
import { POINTS } from '../scoring';

interface Props {
  onReveal: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

export function HintButton({ onReveal, disabled, children }: Props) {
  const [revealed, setRevealed] = useState(false);
  return revealed ? (
    <div className="hint-box">
      <p className="hint-title">Hint (−{POINTS.HINT_COST} pts)</p>
      <p>{children}</p>
    </div>
  ) : (
    <button className="btn btn-ghost btn-small" disabled={disabled} onClick={() => { setRevealed(true); onReveal(); }}>
      💡 Hint (−{POINTS.HINT_COST} pts)
    </button>
  );
}
