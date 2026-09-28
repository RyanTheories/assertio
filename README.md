# Dubito

An assertion-risk audit training game for professional auditors. For each financial statement line item, judge which
assertions are relevant, which are high risk given the client's context, and spot the **trap procedure**:
a procedure that looks perfectly reasonable but tests the wrong assertion for the risk at hand.

Static, front-end only. No backend, no database, no API keys. Works fully offline once loaded.

**Play it live:** https://ryantheories.github.io/quaestor/

## Run locally

```bash
npm install
npm run dev
```

Open the URL Vite prints (http://localhost:5173).

## Build for production

```bash
npm run build
```

Produces a static site in `dist/` (TypeScript-checked first, the build fails on any type error).

Preview the production build:

```bash
npm run preview
```

## Tests

```bash
npm test          # Vitest, one-shot
npm run test:watch
```

Covers the scoring logic (`src/scoring.ts`) and the data validator (`src/data/validate.ts`).

## Deploy

The build is a plain static site, no server config needed.

### GitHub Pages

1. `npm run build`
2. Push the contents of `dist/` to a `gh-pages` branch (or upload via your preferred action), or use the
   official Vite deploy guide with `base` set to your repo name in `vite.config.ts` if the site is served
   from `https://<user>.github.io/<repo>/`. With the repo named `quaestor`, the site serves at
   `https://ryantheories.github.io/quaestor/`.
   - This project ships with `base: './'`, which works for a *project page served from any subpath*. If you
     deploy at the domain root, you can leave `base` as is.
3. In the repo settings, set Pages to serve from the branch/folder containing `dist/`.

### Netlify

1. `npm run build`
2. Drag-and-drop the `dist/` folder onto https://app.netlify.com/drop, or connect the repo with:
   - Build command: `npm run build`
   - Publish directory: `dist`

No redirects file or special headers are required.

## Swapping in updated scenario data

All game content lives in **`src/data/scenarios.json`**, the only content file. Replace it with an updated
version (same schema) and rebuild:

- `meta.assertion_taxonomy` defines the assertion vocabulary (transactions / balances groups).
- Each scenario needs: `id` (unique), `line_item`, `statement`, `industry`, `client_context`,
  `assertions_relevant`, `assertions_high_risk` (subset of relevant), `procedures` (`procedure`, `tests`,
  `trap`, `trap_explanation` when a trap, `isa_ref`), `isa_refs`, `difficulty`.

The app validates this file at load time and shows a **visible error screen naming every failed check**
(duplicate ids, taxonomy violations, high-risk keys outside the relevant set, traps without explanations,
missing fields) instead of starting with unfair data. If you see that screen, the data, not the app, needs
fixing.

## How to play

- **Phase 1, Relevant assertions.** Check the assertions relevant to the line item. Partial credit; extras
  lose points.
- **Phase 2, High-risk assertions.** From the relevant set, check the ones the engagement brief makes
  risky. Feedback shows the risk reasons.
- **Phase 3, Procedures.** For each (shuffled) procedure, match the assertion(s) it tests, or flag it as a
  trap. Correctly flagging a trap is the highest-value action in the game; matching a trap to an assertion
  scores zero and reveals the trap explanation.

A scenario is **mastered** when every phase scores ≥ 80%. Progress and career stats persist in
`localStorage` (keyed `quaestor.v1`, per browser).

## Progression

- **Career ladder.** Mastering scenarios promotes you from Trainee up to Quaestor (a nod to the Roman treasury officers). Rank thresholds are a
  fraction of the scenario library, so the ladder scales as content grows.
- **Mastery map.** Per-sector mastery bars (mastered / total) so you can pick your next target sector.
- **Daily challenge.** A deterministic, date-seeded draw of five scenarios. Everyone playing on the same
  day faces the same five, so scores are comparable without any backend. Your best result of the day is
  kept.

## Keyboard

- `1`–`9`, `0`, toggle assertions / match assertions
- `↑`/`↓`, move between procedures (Phase 3)
- `T`, flag a trap
- `Enter`, submit / continue
- `Esc`, leave review mode

## Project layout

```
src/
  App.tsx                 # state machine: home → round → roundSummary → sessionSummary
  types.ts                # JSON schema types
  scoring.ts              # all tunable point values + scoring functions
  storage.ts              # versioned localStorage persistence
  career.ts              # career ladder ranks (from mastered scenarios)
  daily.ts                # date-seeded deterministic daily challenge
  ui.ts                   # assertion labels / definitions (UI text)
  utils.ts                # shuffle helpers
  data/
    scenarios.json        # ← all game content (swap here)
    validate.ts           # load-time validation, fails loudly
  screens/
    Home.tsx  Round.tsx  PhaseBrief.tsx  PhaseRelevant.tsx
    PhaseRisk.tsx  PhaseProcedures.tsx  RoundSummary.tsx  SessionSummary.tsx
  styles/global.css
  __tests__/              # Vitest: scoring + validator
```

## Disclaimer

Dubito is a personal hobby project by Ryan Lolachi. It is not affiliated with, endorsed by, or
produced by any employer, professional services firm, accounting body, or standard setter. All views
and content are the author's own.

This game is a training aid, not an authoritative source. Errors might exist, and double verification
against the actual standards and your firm's methodology is important. Always consult the primary
literature and applicable professional requirements before relying on anything here.
