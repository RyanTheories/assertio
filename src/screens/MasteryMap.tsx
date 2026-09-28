import { useMemo } from 'react';
import type { Scenario } from '../types';
import { sectorFor, SECTOR_ORDER, type Sector } from '../sectors';
import { loadState } from '../storage';

interface Props {
  scenarios: Scenario[];
  onHome: () => void;
}

interface SectorRow {
  sector: Sector;
  total: number;
  mastered: number;
}

export function MasteryMap({ scenarios, onHome }: Props) {
  const rows = useMemo<SectorRow[]>(() => {
    const mastered = new Set(loadState().masteredScenarioIds);
    const map = new Map<Sector, SectorRow>();
    for (const s of scenarios) {
      const sec = sectorFor(s.industry);
      const row = map.get(sec) ?? { sector: sec, total: 0, mastered: 0 };
      row.total += 1;
      if (mastered.has(s.id)) row.mastered += 1;
      map.set(sec, row);
    }
    return SECTOR_ORDER.filter((sec) => map.has(sec)).map((sec) => map.get(sec)!);
  }, [scenarios]);

  const totalMastered = rows.reduce((a, r) => a + r.mastered, 0);
  const totalScenarios = rows.reduce((a, r) => a + r.total, 0);

  return (
    <div className="screen mastery-screen">
      <header className="hud">
        <div className="hud-left">
          <span className="hud-title">Mastery map</span>
        </div>
        <div className="hud-right">
          <button className="btn btn-ghost btn-small" onClick={onHome}>
            ← Back to home (Esc)
          </button>
        </div>
      </header>
      <section className="card">
        <h2>Mastery by sector</h2>
        <p className="muted small">
          {totalMastered} of {totalScenarios} scenarios mastered across {rows.length} sectors. A scenario
          is mastered when every phase scores ≥ 80%.
        </p>
        <ul className="mastery-list">
          {rows.map((row) => {
            const pct = row.total === 0 ? 0 : Math.round((row.mastered / row.total) * 100);
            return (
              <li key={row.sector} className="breakdown-row">
                <span className="mastery-name">{row.sector}</span>
                <div className="bar">
                  <div
                    className={`bar-fill ${pct >= 80 ? 'bar-green' : pct > 0 ? 'bar-amber' : ''}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="bar-num">
                  {row.mastered}/{row.total}
                </span>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
