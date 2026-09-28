/**
 * Career ladder: ranks derived from the number of scenarios mastered.
 * Promotion thresholds are a fraction of the scenario library, so the
 * ladder stays meaningful as the content file grows or shrinks.
 */
export interface CareerRank {
  level: number;
  title: string;
  latin: string;
  /** mastered scenarios required for this rank */
  threshold: number;
  blurb: string;
}

const LADDER: Array<Omit<CareerRank, 'level' | 'threshold'>> = [
  {
    title: 'Trainee',
    latin: 'Tiro',
    blurb: 'Learning the assertion vocabulary and the shape of an audit.',
  },
  {
    title: 'Assistant Auditor',
    latin: 'Auditor Secundus',
    blurb: 'You can judge which assertions are relevant and which are risky.',
  },
  {
    title: 'Senior Auditor',
    latin: 'Auditor Primus',
    blurb: 'You spot trap procedures reliably and score under pressure.',
  },
  {
    title: 'Audit Manager',
    latin: 'Curator Rerum',
    blurb: 'Your judgment holds across sectors, statements and difficulties.',
  },
  {
    title: 'Partner',
    latin: 'Socius',
    blurb: 'The engagement brief is read before the numbers are.',
  },
  {
    title: 'Quaestor',
    latin: 'Quaestor',
    blurb: 'Guardian of the treasury. Every trap is a trap you have seen before.',
  },
];

const THRESHOLD_FRACTIONS = [0, 0.05, 0.15, 0.3, 0.55, 0.8];

export function careerRanks(totalScenarios: number): CareerRank[] {
  return LADDER.map((rank, i) => ({
    ...rank,
    level: i + 1,
    threshold: Math.round(THRESHOLD_FRACTIONS[i] * totalScenarios),
  }));
}

export function rankFor(mastered: number, totalScenarios: number): CareerRank {
  const ranks = careerRanks(totalScenarios);
  let current = ranks[0];
  for (const r of ranks) {
    if (mastered >= r.threshold) current = r;
  }
  return current;
}

export function nextRank(mastered: number, totalScenarios: number): CareerRank | null {
  const ranks = careerRanks(totalScenarios);
  return ranks.find((r) => mastered < r.threshold) ?? null;
}
