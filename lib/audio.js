// Som 100% sintetizado (WebAudio) + narração com a voz do próprio celular (speechSynthesis).
// Nada de arquivos de áudio: funciona offline e em qualquer hospedagem estática.

let ctx = null;
let master = null;
let muted = false;
let voice = null;

export function isMuted() { return muted; }
export function setMuted(m) {
  muted = m;
  if (master) master.gain.value = m ? 0 : 0.9;
  if (m) try { window.speechSynthesis.cancel(); } catch {}
}

function pickVoice() {
  try {
    const vs = window.speechSynthesis.getVoices();
    voice = vs.find(v => v.lang === 'pt-BR') || vs.find(v => v.lang && v.lang.startsWith('pt')) || null;
  } catch {}
}

// Precisa ser chamado dentro de um toque do usuário (regra dos navegadores móveis).
export function unlockAudio() {
  try {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      ctx = new AC();
      master = ctx.createGain();
      master.gain.value = muted ? 0 : 0.9;
      master.connect(ctx.destination);
    }
    if (ctx.state === 'suspended') ctx.resume();
  } catch {}
  try {
    pickVoice();
    window.speechSynthesis.onvoiceschanged = pickVoice;
    // "aquece" o motor de voz no iOS
    const u = new SpeechSynthesisUtterance(' ');
    u.volume = 0;
    window.speechSynthesis.speak(u);
  } catch {}
}

function tone(freq, start, dur, { type = 'sine', vol = 0.15, to = null } = {}) {
  if (!ctx) return;
  const t = ctx.currentTime + start;
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, t);
  if (to) o.frequency.exponentialRampToValueAtTime(to, t + dur);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol, t + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g); g.connect(master);
  o.start(t); o.stop(t + dur + 0.05);
}

function noise(start, dur, vol = 0.2, hp = 800) {
  if (!ctx) return;
  const t = ctx.currentTime + start;
  const len = Math.floor(ctx.sampleRate * dur);
  const buf = ctx.createBuffer(1, len, ctx.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len);
  const s = ctx.createBufferSource();
  s.buffer = buf;
  const f = ctx.createBiquadFilter();
  f.type = 'highpass'; f.frequency.value = hp;
  const g = ctx.createGain(); g.gain.value = vol;
  s.connect(f); f.connect(g); g.connect(master);
  s.start(t);
}

// Vinheta de plantão jornalístico
export function newsSting() {
  if (!ctx) return;
  noise(0, 0.5, 0.25, 200);
  tone(110, 0, 0.6, { type: 'sawtooth', vol: 0.12 });
  [523, 659, 784, 1047].forEach((f, i) => tone(f, 0.08 + i * 0.09, 0.35, { type: 'square', vol: 0.06 }));
  tone(1047, 0.5, 0.9, { type: 'triangle', vol: 0.12 });
  tone(784, 0.5, 0.9, { type: 'triangle', vol: 0.08 });
  tone(55, 0.48, 0.8, { type: 'sine', vol: 0.35, to: 40 });
  noise(0.48, 0.25, 0.2, 2000);
}

export function typeTick() { tone(1800 + Math.random() * 600, 0, 0.025, { type: 'square', vol: 0.03 }); }
export function heartbeat() { tone(60, 0, 0.15, { vol: 0.5, to: 40 }); tone(55, 0.18, 0.15, { vol: 0.35, to: 38 }); }
export function flatline() { tone(1000, 0, 2.6, { type: 'sine', vol: 0.06 }); }
export function stamp() { tone(80, 0, 0.3, { vol: 0.5, to: 35 }); noise(0, 0.12, 0.3, 300); }
export function whoosh() { noise(0, 0.6, 0.18, 400); }
export function success() { [660, 880, 1320].forEach((f, i) => tone(f, i * 0.08, 0.3, { type: 'triangle', vol: 0.1 })); }
export function errorBuzz() { tone(160, 0, 0.25, { type: 'sawtooth', vol: 0.08 }); }
export function click() { tone(900, 0, 0.03, { type: 'square', vol: 0.03 }); }

// Drone de suspense para a abertura. Devolve uma função para parar.
export function drone() {
  if (!ctx) return () => {};
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, ctx.currentTime);
  g.gain.exponentialRampToValueAtTime(0.09, ctx.currentTime + 3);
  const f = ctx.createBiquadFilter();
  f.type = 'lowpass'; f.frequency.value = 420;
  const oscs = [55, 55.4, 82.4].map((fr, i) => {
    const o = ctx.createOscillator();
    o.type = i === 2 ? 'triangle' : 'sawtooth';
    o.frequency.value = fr;
    o.connect(f); o.start();
    return o;
  });
  const lfo = ctx.createOscillator();
  const lg = ctx.createGain();
  lfo.frequency.value = 0.08; lg.gain.value = 180;
  lfo.connect(lg); lg.connect(f.frequency); lfo.start();
  f.connect(g); g.connect(master);
  return () => {
    try {
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.5);
      setTimeout(() => { oscs.forEach(o => o.stop()); lfo.stop(); }, 1700);
    } catch {}
  };
}

// Narração. Resolve quando termina (ou por tempo estimado, se o aparelho não tiver voz).
export function speak(text, { rate = 1.03, pitch = 0.92 } = {}) {
  const estimate = Math.max(1800, text.length * 62);
  return new Promise(resolve => {
    let done = false;
    const finish = () => { if (!done) { done = true; resolve(); } };
    setTimeout(finish, estimate + 2500);
    if (muted) { setTimeout(finish, estimate); return; }
    try {
      const s = window.speechSynthesis;
      s.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'pt-BR';
      if (voice) u.voice = voice;
      u.rate = rate; u.pitch = pitch;
      u.onend = finish;
      u.onerror = () => setTimeout(finish, estimate);
      s.speak(u);
    } catch { setTimeout(finish, estimate); }
  });
}

export function stopSpeech() { try { window.speechSynthesis.cancel(); } catch {} }
