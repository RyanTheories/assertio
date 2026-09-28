/**
 * Short UI sound effects, synthesized with WebAudio (no audio files).
 * Must be armed by a user gesture first (browser autoplay policy);
 * App arms it on the same pointer/key gesture as the ambience.
 */
let ctx: AudioContext | null = null;
let armed = false;
let muted = false;

export function setSfxMuted(m: boolean): void {
  muted = m;
}

export function armSfx(): void {
  armed = true;
  if (!ctx) {
    try {
      ctx = new AudioContext();
    } catch {
      ctx = null;
    }
  }
  void ctx?.resume();
}

function tone(
  freq: number,
  start: number,
  dur: number,
  gain: number,
  type: OscillatorType = 'triangle'
): void {
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, start);
  g.gain.setValueAtTime(0, start);
  g.gain.linearRampToValueAtTime(gain, start + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, start + dur);
  osc.connect(g);
  g.connect(ctx.destination);
  osc.start(start);
  osc.stop(start + dur + 0.05);
}

function ready(): boolean {
  return armed && !muted && ctx !== null;
}

/** Chip / toggle click. */
export function sfxBlip(): void {
  if (!ready()) return;
  const t = ctx!.currentTime;
  tone(660, t, 0.09, 0.12);
}

/** Phase submitted with a good ratio. */
export function sfxChime(): void {
  if (!ready()) return;
  const t = ctx!.currentTime;
  tone(523.25, t, 0.22, 0.12);
  tone(783.99, t + 0.09, 0.3, 0.12);
}

/** Phase submitted with a poor ratio. */
export function sfxBuzz(): void {
  if (!ready()) return;
  const t = ctx!.currentTime;
  tone(138, t, 0.18, 0.14, 'square');
  tone(110, t + 0.12, 0.2, 0.12, 'square');
}

/** Trap flag toggled. */
export function sfxTrapToggle(on: boolean): void {
  if (!ready()) return;
  const t = ctx!.currentTime;
  tone(on ? 392 : 261.63, t, 0.14, 0.12);
}

/** Trap caught fanfare: highest-value action. */
export function sfxTrapCaught(): void {
  if (!ready()) return;
  const t = ctx!.currentTime;
  tone(587.33, t, 0.16, 0.13);
  tone(739.99, t + 0.1, 0.16, 0.13);
  tone(987.77, t + 0.2, 0.34, 0.14);
}

/** Scenario mastered flourish. */
export function sfxMastered(): void {
  if (!ready()) return;
  const t = ctx!.currentTime;
  const notes = [523.25, 659.25, 783.99, 1046.5];
  notes.forEach((f, i) => tone(f, t + i * 0.11, 0.3, 0.12));
}
