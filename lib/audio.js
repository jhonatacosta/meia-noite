// Som do jogo: falas gravadas em pt-BR (public/audio/*.mp3) com efeitos em tempo real
// (voz de sequestrador, rádio da polícia) + ambientes e efeitos sintetizados.

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || '';
let ctx = null;
let master = null;
let muted = false;
let voice = null;
let current = null;
const cache = {};

export function isMuted() { return muted; }
export function setMuted(m) {
  muted = m;
  if (master) master.gain.value = m ? 0 : 0.9;
  if (m) try { window.speechSynthesis.cancel(); } catch {}
}

function pickVoice() {
  try {
    const vs = window.speechSynthesis.getVoices();
    voice = vs.find(v => /^pt[-_]BR$/i.test(v.lang)) || vs.find(v => /^pt/i.test(v.lang)) || null;
  } catch {}
}

// Chamar dentro de um toque do usuário (regra dos navegadores de celular).
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
  try { pickVoice(); window.speechSynthesis.onvoiceschanged = pickVoice; } catch {}
}

export function vibrar(p) { try { navigator.vibrate && navigator.vibrate(p); } catch {} }

/* ---------- falas gravadas ---------- */
function loadClip(id) {
  if (!ctx) return Promise.resolve(null);
  if (!cache[id]) {
    cache[id] = fetch(`${BASE}/audio/${id}.mp3`)
      .then(r => { if (!r.ok) throw new Error(r.status); return r.arrayBuffer(); })
      .then(b => ctx.decodeAudioData(b))
      .catch(() => { delete cache[id]; return null; });
  }
  return cache[id];
}
export function preload(ids) { ids.forEach(loadClip); }

function curve(amount) {
  const n = 2048, c = new Float32Array(n);
  for (let i = 0; i < n; i++) { const x = (i * 2) / n - 1; c[i] = ((3 + amount) * x * 20 * Math.PI / 180) / (Math.PI + amount * Math.abs(x)); }
  return c;
}

// fx: undefined (limpa), 'sequestrador' (grave, distorcida, de telefone), 'radio' (rádio da polícia)
export async function playClip(id, fallbackText, fx) {
  stopSpeech();
  const buf = await loadClip(id);
  if (!buf) return speak(fallbackText);
  return new Promise(resolve => {
    const src = ctx.createBufferSource();
    src.buffer = buf;
    let out = src;
    if (fx === 'sequestrador') {
      src.playbackRate.value = 0.8;
      const ws = ctx.createWaveShaper(); ws.curve = curve(60); ws.oversample = '4x';
      const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 900; bp.Q.value = 0.6;
      const g = ctx.createGain(); g.gain.value = 0.8;
      src.connect(ws); ws.connect(bp); bp.connect(g); out = g;
    }
    if (fx === 'radio') {
      const hp = ctx.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 450;
      const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 3200;
      const ws = ctx.createWaveShaper(); ws.curve = curve(25);
      src.connect(hp); hp.connect(lp); lp.connect(ws); out = ws;
      staticBurst(0.18);
    }
    out.connect(master);
    src.onended = () => { if (current === src) current = null; resolve(); };
    current = src;
    src.start(ctx.currentTime + (fx === 'radio' ? 0.15 : 0));
  });
}

export function speak(text, { rate = 1.03, pitch = 0.92 } = {}) {
  const estimate = Math.max(1800, (text || '').length * 62);
  return new Promise(resolve => {
    let done = false;
    const finish = () => { if (!done) { done = true; resolve(); } };
    setTimeout(finish, estimate + 2500);
    if (muted || !voice || !text) { setTimeout(finish, estimate); return; }
    try {
      const s = window.speechSynthesis;
      s.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'pt-BR'; u.voice = voice; u.rate = rate; u.pitch = pitch;
      u.onend = finish; u.onerror = () => setTimeout(finish, estimate);
      s.speak(u);
    } catch { setTimeout(finish, estimate); }
  });
}

export function stopSpeech() {
  try { window.speechSynthesis.cancel(); } catch {}
  if (current) { try { current.stop(); } catch {} current = null; }
}

/* ---------- efeitos ---------- */
function tone(freq, start, dur, { type = 'sine', vol = 0.15, to = null, dest = null } = {}) {
  if (!ctx) return;
  const t = ctx.currentTime + start;
  const o = ctx.createOscillator(), g = ctx.createGain();
  o.type = type; o.frequency.setValueAtTime(freq, t);
  if (to) o.frequency.exponentialRampToValueAtTime(to, t + dur);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol, t + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g); g.connect(dest || master);
  o.start(t); o.stop(t + dur + 0.05);
}
function noise(start, dur, vol = 0.2, hp = 800, dest = null) {
  if (!ctx) return;
  const t = ctx.currentTime + start;
  const len = Math.floor(ctx.sampleRate * dur);
  const buf = ctx.createBuffer(1, len, ctx.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len);
  const s = ctx.createBufferSource(); s.buffer = buf;
  const f = ctx.createBiquadFilter(); f.type = 'highpass'; f.frequency.value = hp;
  const g = ctx.createGain(); g.gain.value = vol;
  s.connect(f); f.connect(g); g.connect(dest || master); s.start(t);
}
function loopNoise(vol, type, freq) {
  const len = ctx.sampleRate * 2;
  const buf = ctx.createBuffer(1, len, ctx.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
  const s = ctx.createBufferSource(); s.buffer = buf; s.loop = true;
  const f = ctx.createBiquadFilter(); f.type = type; f.frequency.value = freq;
  const g = ctx.createGain(); g.gain.value = vol;
  s.connect(f); f.connect(g); g.connect(master); s.start();
  return { s, g, f };
}

export function newsSting() {
  if (!ctx) return;
  noise(0, 0.5, 0.25, 200);
  tone(110, 0, 0.6, { type: 'sawtooth', vol: 0.12 });
  [523, 659, 784, 1047].forEach((f, i) => tone(f, 0.08 + i * 0.09, 0.35, { type: 'square', vol: 0.06 }));
  tone(1047, 0.5, 0.9, { type: 'triangle', vol: 0.12 });
  tone(784, 0.5, 0.9, { type: 'triangle', vol: 0.08 });
  tone(55, 0.48, 0.8, { vol: 0.35, to: 40 });
  noise(0.48, 0.25, 0.2, 2000);
}
export function typeTick() { tone(1800 + Math.random() * 600, 0, 0.025, { type: 'square', vol: 0.03 }); }
export function stamp() { tone(80, 0, 0.3, { vol: 0.5, to: 35 }); noise(0, 0.12, 0.3, 300); }
export function whoosh() { noise(0, 0.6, 0.18, 400); }
export function success() { [660, 880, 1320].forEach((f, i) => tone(f, i * 0.08, 0.3, { type: 'triangle', vol: 0.1 })); }
export function errorBuzz() { tone(160, 0, 0.25, { type: 'sawtooth', vol: 0.08 }); }
export function click() { tone(900, 0, 0.03, { type: 'square', vol: 0.03 }); }
export function staticBurst(d = 0.25) { noise(0, d, 0.25, 1500); tone(1400, 0, 0.06, { type: 'square', vol: 0.05 }); }
export function tick() { tone(1200, 0, 0.04, { type: 'square', vol: 0.05 }); }
export function breach() { tone(60, 0, 0.6, { vol: 0.7, to: 30 }); noise(0, 0.5, 0.45, 100); }
export function hangup() { [0, 0.35, 0.7].forEach(t => tone(480, t, 0.22, { type: 'square', vol: 0.06 })); }
export function shipHorn(at = 0) { tone(98, at, 2.4, { type: 'sawtooth', vol: 0.06 }); tone(147, at, 2.4, { type: 'sawtooth', vol: 0.04 }); }
export function buoyBell(at = 0) { [880, 1320, 2093].forEach((f, i) => tone(f, at, 2.2, { vol: [0.08, 0.04, 0.02][i] })); }

// Toque de celular. Devolve função para parar.
export function ringtone() {
  if (!ctx) return () => {};
  let on = true;
  const ring = () => {
    if (!on) return;
    for (let i = 0; i < 8; i++) { tone(1046, i * 0.1, 0.09, { type: 'square', vol: 0.05 }); tone(1318, i * 0.1 + 0.05, 0.05, { type: 'square', vol: 0.04 }); }
    vibrar([400, 200, 400]);
    setTimeout(ring, 2200);
  };
  ring();
  return () => { on = false; vibrar(0); };
}

// Porto à noite: ondas, buzina de navio e sino de boia (as pistas sonoras das ligações).
export function harbor() {
  if (!ctx) return () => {};
  const w = loopNoise(0.05, 'lowpass', 500);
  const lfo = ctx.createOscillator(), lg = ctx.createGain();
  lfo.frequency.value = 0.18; lg.gain.value = 0.04; lfo.connect(lg); lg.connect(w.g.gain); lfo.start();
  let on = true;
  const ev = n => { if (!on) return; if (n % 2 === 0) buoyBell(); else shipHorn(); setTimeout(() => ev(n + 1), 3800 + Math.random() * 1500); };
  setTimeout(() => ev(0), 1200);
  return () => { on = false; try { w.g.gain.setTargetAtTime(0, ctx.currentTime, 0.3); setTimeout(() => { w.s.stop(); lfo.stop(); }, 1200); } catch {} };
}

// Motor de lancha (ligação final).
export function engine() {
  if (!ctx) return () => {};
  const o = ctx.createOscillator(), g = ctx.createGain(), f = ctx.createBiquadFilter();
  o.type = 'sawtooth'; o.frequency.value = 42; f.type = 'lowpass'; f.frequency.value = 300;
  g.gain.value = 0.0001; g.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 2);
  o.frequency.linearRampToValueAtTime(70, ctx.currentTime + 4);
  o.connect(f); f.connect(g); g.connect(master); o.start();
  return () => { try { g.gain.setTargetAtTime(0.0001, ctx.currentTime, 0.4); setTimeout(() => o.stop(), 1500); } catch {} };
}

// Drone de suspense. Devolve função para parar.
export function drone() {
  if (!ctx) return () => {};
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, ctx.currentTime);
  g.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 3);
  const f = ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 420;
  const oscs = [55, 55.4, 82.4].map((fr, i) => { const o = ctx.createOscillator(); o.type = i === 2 ? 'triangle' : 'sawtooth'; o.frequency.value = fr; o.connect(f); o.start(); return o; });
  const lfo = ctx.createOscillator(), lg = ctx.createGain();
  lfo.frequency.value = 0.08; lg.gain.value = 180; lfo.connect(lg); lg.connect(f.frequency); lfo.start();
  f.connect(g); g.connect(master);
  return () => { try { g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.5); setTimeout(() => { oscs.forEach(o => o.stop()); lfo.stop(); }, 1700); } catch {} };
}

export function heartbeat() { tone(60, 0, 0.15, { vol: 0.5, to: 40 }); tone(55, 0.18, 0.15, { vol: 0.35, to: 38 }); }
