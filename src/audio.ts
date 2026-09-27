let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let timer: number | null = null;
let playing = false;

const BASE = 146.83;

const SCALE = [0, 2, 3, 5, 7, 8, 10, 12, 14, 15, 17, 19];

let step = 0;

function pluck(freq: number, when: number, dur: number, gain: number) {
  const c = ctx!;
  const osc = c.createOscillator();
  const osc2 = c.createOscillator();
  const g = c.createGain();
  osc.type = 'triangle';
  osc2.type = 'sine';
  osc.frequency.value = freq;
  osc2.frequency.value = freq * 2.002;
  const g2 = c.createGain();
  g2.gain.value = 0.28;
  osc2.connect(g2);
  g2.connect(g);
  osc.connect(g);
  g.connect(master!);
  g.gain.setValueAtTime(0, when);
  g.gain.linearRampToValueAtTime(gain, when + 0.012);
  g.gain.exponentialRampToValueAtTime(0.0001, when + dur);
  osc.start(when);
  osc2.start(when);
  osc.stop(when + dur + 0.1);
  osc2.stop(when + dur + 0.1);
}

function drone(when: number) {
  const c = ctx!;
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = 'sine';
  osc.frequency.value = BASE / 2;
  g.gain.setValueAtTime(0.05, when);
  osc.connect(g);
  g.connect(master!);
  osc.start(when);
}

function schedule() {
  if (!ctx || !master) return;
  const now = ctx.currentTime + 0.05;
  if (step === 0) drone(now);
  const octave = Math.floor(step / 12) % 3;
  const degree = SCALE[step % 12];
  const freq = BASE * Math.pow(2, degree / 12) * (octave === 0 ? 1 : octave === 1 ? 2 : 0.5);
  pluck(freq, now, 2.8, 0.12);
  if (step % 4 === 0) {
    pluck(BASE * Math.pow(2, SCALE[(step + 7) % 12] / 12) * 2, now + 0.4, 2.2, 0.07);
  }
  step = (step + 1) % 36;
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
    filter.frequency.value = 2400;
    master.connect(filter);
    filter.connect(ctx.destination);
  }
  void ctx.resume();
  master!.gain.setTargetAtTime(0.55, ctx.currentTime, 0.4);
  step = 0;
  schedule();
  timer = window.setInterval(schedule, 1400);
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
    master.gain.setTargetAtTime(0, ctx.currentTime, 0.2);
  }
  playing = false;
  return false;
}

export function toggleAmbience(): boolean {
  return playing ? stopAmbience() : startInternal();
}
