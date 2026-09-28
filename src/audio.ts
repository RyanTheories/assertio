let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let timer: number | null = null;
let playing = false;

/**
 * Soothing ambience in the spirit of C418's Minecraft Volume One:
 * sparse, slow, soft sine tones in a gentle C-major pentatonic,
 * long decays, occasional warm fifths, a low drone underneath,
 * and breathing space between phrases.
 */
const BASE = 130.81; // C3
const SCALE = [0, 2, 4, 7, 9]; // C major pentatonic
const PHRASE_LEN = 5;
let step = 0;

function tone(freq: number, when: number, dur: number, gain: number, type: OscillatorType = 'sine') {
  const c = ctx!;
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  g.gain.setValueAtTime(0, when);
  g.gain.linearRampToValueAtTime(gain, when + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, when + dur);
  osc.connect(g);
  g.connect(master!);
  osc.start(when);
  osc.stop(when + dur + 0.1);
}

/** Warm fifth dyad for slower harmonic movement. */
function dyad(freq: number, when: number, dur: number, gain: number) {
  tone(freq, when, dur, gain, 'sine');
  tone(freq * 1.5, when, dur, gain * 0.45, 'sine');
}

function drone(when: number) {
  const c = ctx!;
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = 'sine';
  osc.frequency.value = BASE / 2;
  g.gain.setValueAtTime(0, when);
  g.gain.linearRampToValueAtTime(0.04, when + 2);
  osc.connect(g);
  g.connect(master!);
  osc.start(when);
}

function schedule() {
  if (!ctx || !master) return;
  const now = ctx.currentTime + 0.05;
  if (step === 0) drone(now);

  // sparse melody: one soft note every other step, long decay
  const degree = SCALE[Math.floor(Math.random() * SCALE.length)];
  const octave = Math.random() < 0.35 ? 2 : 1;
  const freq = BASE * Math.pow(2, degree / 12) * octave;
  if (step % 2 === 0) {
    tone(freq, now, 4.5, 0.09);
    // warm harmony on phrase boundaries
    if (step % PHRASE_LEN === 0 && Math.random() < 0.6) {
      dyad(freq / 2, now + 0.4, 5, 0.05);
    }
  }
  step = (step + 1) % 24;
}

export function isAmbiencePlaying() {
  return playing;
}

function startInternal(): boolean {
  if (playing) return true;
  if (!ctx) {
    ctx = new AudioContext();
    master = ctx.createGain();
    master.gain.value = 0;
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 1800;
    master.connect(filter);
    filter.connect(ctx.destination);
  }
  void ctx.resume();
  master!.gain.setTargetAtTime(0.5, ctx.currentTime, 0.6);
  step = 0;
  schedule();
  timer = window.setInterval(schedule, 2600);
  playing = true;
  return true;
}

export function startAmbience(): boolean {
  return startInternal();
}

export function stopAmbience(): boolean {
  if (!playing) return false;
  if (timer !== null) window.clearInterval(timer);
  timer = null;
  if (master && ctx) {
    master.gain.setTargetAtTime(0, ctx.currentTime, 0.3);
  }
  playing = false;
  return false;
}

export function toggleAmbience(): boolean {
  return playing ? stopAmbience() : startInternal();
}
