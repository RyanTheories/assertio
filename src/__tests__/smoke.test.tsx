import { describe, expect, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import App from '../App';
import { Home } from '../screens/Home';
import { FinancialStatements } from '../screens/FinancialStatements';
import { IsasReference } from '../screens/IsasReference';
import { PhaseBrief } from '../screens/PhaseBrief';
import { PhaseRelevant } from '../screens/PhaseRelevant';
import { PhaseRisk } from '../screens/PhaseRisk';
import { PhaseProcedures } from '../screens/PhaseProcedures';
import { RoundSummary } from '../screens/RoundSummary';
import { SessionSummary } from '../screens/SessionSummary';
import { getGameData } from '../data/validate';
import { scoreRound } from '../scoring';
import type { AssertionId } from '../types';
import React from 'react';

function renderIgnoringConsole(el: React.ReactElement): string {
  const errors: unknown[] = [];
  const orig = console.error;
  console.error = (...args: unknown[]) => errors.push(args);
  try {
    return renderToString(el);
  } finally {
    console.error = orig;
  }
}

describe('render smoke', () => {
  it('renders the whole App (validation passes on bundled data)', () => {
    const html = renderIgnoringConsole(<App />);
    expect(html).toContain('Quaestor');
    expect(html).not.toContain('Data validation failed');
  });

  it('renders Home with derived industries and stats', () => {
    const data = getGameData();
    const html = renderIgnoringConsole(<Home scenarios={data.scenarios} onStart={() => undefined} onOpenGuide={() => undefined} onOpenStatements={() => undefined} onOpenIsas={() => undefined} />);
    expect(html).toContain('New session');
    expect(html).toContain('How to play');
  });

  it('renders the financial statements reference', () => {
    const html = renderIgnoringConsole(<FinancialStatements onHome={() => undefined} />);
    expect(html).toContain('What are financial statements?');
    expect(html).toContain('The balance sheet');
    expect(html).toContain('The notes');
  });
  it('renders the ISA reference', () => {
    const html = renderIgnoringConsole(<IsasReference onHome={() => undefined} />);
    expect(html).toContain('The ISAs, explained');
    expect(html).toContain('ISA 315 (Revised 2019)');
    expect(html).toContain('ISA 505');
  });
  it('renders all round phases and summaries for a real scenario', () => {
    const data = getGameData();
    const sc = data.scenarios[0];
    const shuffled = sc.procedures.map((proc, origIndex) => ({ proc, origIndex }));
    expect(renderIgnoringConsole(<PhaseBrief scenario={sc} onContinue={() => undefined} />)).toContain('Engagement brief');
    expect(renderIgnoringConsole(
      <PhaseRelevant scenario={sc} selected={new Set()} onChange={() => undefined} onSubmit={() => undefined} />
    )).toContain('Phase 1 of 3');
    expect(renderIgnoringConsole(
      <PhaseRisk scenario={sc} selected={new Set()} onChange={() => undefined} onSubmit={() => undefined} />
    )).toContain('Phase 2 of 3');
    expect(renderIgnoringConsole(
      <PhaseProcedures scenario={sc} shuffledProcedures={shuffled} answers={[]} onAnswersChange={() => undefined} onSubmit={() => undefined} />
    )).toContain('Phase 3 of 3');
  });

  it('renders summaries for a scored round', () => {
    const data = getGameData();
    const sc = data.scenarios[0];
    const empty = new Set<AssertionId>();
    const score = scoreRound(sc, new Set(sc.assertions_relevant), empty, []);
    const round = { scenario: sc, score, phase1Selected: empty, phase2Selected: new Set<AssertionId>(), phase3Answers: [] };
    expect(renderIgnoringConsole(
      <RoundSummary round={round} index={0} total={3} isLast={false} onNext={() => undefined} onEnd={() => undefined} />
    )).toContain('Score breakdown');
    expect(renderIgnoringConsole(
      <SessionSummary rounds={[]} roundRecords={[round]} onHome={() => undefined} />
    )).toContain('Session summary');
  });
});
