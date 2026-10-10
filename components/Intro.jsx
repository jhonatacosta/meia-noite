'use client';
import { useEffect, useRef, useState } from 'react';
import * as A from '@/lib/audio';
import { INTRO } from '@/lib/narracao';

const SCENES = INTRO;

function TypeText({ text, speed = 55, sound = true }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (n >= text.length) return;
    const t = setTimeout(() => { setN(n + 1); if (sound && text[n] !== ' ') A.typeTick(); }, speed);
    return () => clearTimeout(t);
  }, [n, text, speed, sound]);
  return <span>{text.slice(0, n)}<span className="caret">▌</span></span>;
}

function Contagem() {
  const [s, setS] = useState(3600);
  useEffect(() => {
    const iv = setInterval(() => setS(v => { if (v <= 3540) { clearInterval(iv); return v; } A.tick(); return v - 1; }), 80);
    return () => clearInterval(iv);
  }, []);
  const mm = String(Math.floor(s / 60)).padStart(2, '0'), ss = String(s % 60).padStart(2, '0');
  return <div className="clock-big">{mm}:{ss}</div>;
}

export function Telefone({ estado, segundos = 0 }) {
  return (
    <div className={`phone ${estado}`}>
      <div className="phone-notch" />
      <div className="phone-who">{estado === 'tocando' ? 'Chamada recebida' : 'Em chamada'}</div>
      <div className="phone-num">Número desconhecido</div>
      <div className="phone-sub">celular de Débora Kfouri</div>
      {estado === 'falando'
        ? <div className="wave">{Array.from({ length: 24 }).map((_, i) => <i key={i} style={{ animationDelay: `${(i % 6) * 0.09}s` }} />)}</div>
        : <div className="phone-ring">📞</div>}
      {estado === 'falando' && <div className="phone-time mono">00:{String(segundos).padStart(2, '0')}</div>}
    </div>
  );
}

export default function Intro({ onDone }) {
  const [started, setStarted] = useState(false);
  const [i, setI] = useState(-1);
  const [ended, setEnded] = useState(false);
  const [seg, setSeg] = useState(0);
  const skip = useRef(false);
  const stops = useRef([]);

  const wait = ms => new Promise(r => {
    const t0 = Date.now();
    const iv = setInterval(() => { if (skip.current || Date.now() - t0 >= ms) { clearInterval(iv); r(); } }, 100);
  });
  const stopAll = () => { stops.current.forEach(f => f()); stops.current = []; };

  useEffect(() => {
    if (SCENES[i]?.k !== 'ligacao') return;
    setSeg(0);
    const iv = setInterval(() => setSeg(s => s + 1), 1000);
    return () => clearInterval(iv);
  }, [i]);

  async function start() {
    A.unlockAudio();
    A.preload(SCENES.map(sc => sc.id));
    setStarted(true);
    stops.current.push(A.drone());
    for (let n = 0; n < SCENES.length; n++) {
      if (skip.current) return;
      const sc = SCENES[n];
      setI(n);
      let local = null;
      if (sc.k === 'toque') local = A.ringtone();
      if (sc.k === 'ligacao') { local = A.harbor(); A.click(); }
      if (sc.k === 'titulo') A.newsSting();
      if (sc.k === 'bia') A.stamp();
      await Promise.all([A.playClip(sc.id, sc.texto, sc.fx), wait(sc.min)]);
      if (local) local();
      if (sc.k === 'ligacao') A.hangup();
    }
    stopAll();
    setEnded(true);
  }

  function finish() {
    skip.current = true;
    A.stopSpeech();
    stopAll();
    A.unlockAudio();
    onDone();
  }

  if (!started) {
    return (
      <div className="intro intro-gate">
        <div className="gate-top">
          <div className="eyebrow">Um jogo para dois celulares</div>
          <div className="gate-case">MEIA-NOITE</div>
          <p className="gate-note">Um sequestro. Sessenta minutos. Um de vocês no campo, o outro na central.</p>
        </div>
        <button className="gate-play" onClick={start} aria-label="Iniciar a apresentação do caso"><span className="ring" /><span className="tri">▶</span></button>
        <p className="gate-note">Aumentem o volume. Joguem juntos, na mesma sala.</p>
        <button className="link" onClick={finish}>Pular abertura</button>
      </div>
    );
  }

  const sc = SCENES[i] || SCENES[SCENES.length - 1];
  return (
    <div className={`intro sc-${sc.k}`}>
      <div className="grain" />
      <div className="scene" key={sc.k}>
        {sc.k === 'data' && (
          <div className="sc-data"><div className="mono big"><TypeText text="SANTOS · SP" /></div>
            <div className="mono"><TypeText text="SEXTA, 16 DE OUTUBRO · 23:00" speed={45} /></div></div>
        )}
        {sc.k === 'redacao' && (
          <div className="monitor">
            <div className="mon-bar"><span /><span /><span /> <b>PORTAL RADAR · editor</b></div>
            <div className="mon-body">
              <div className="mon-kicker">EXCLUSIVO</div>
              <div className="mon-head"><TypeText text="O ESQUEMA ATLAS" speed={70} /></div>
              <div className="mon-lines"><i /><i /><i /><i /></div>
              <div className="mon-pub">PUBLICAÇÃO AGENDADA · 06:00</div>
            </div>
          </div>
        )}
        {sc.k === 'bia' && (
          <div className="bia-card">
            <div className="bia-photo"><svg viewBox="0 0 100 120"><path d="M24 50 C20 16 80 16 76 50 L80 96 L20 96 Z" fill="#3a2a22" /><ellipse cx="50" cy="48" rx="20" ry="24" fill="#4a4f57" /><path d="M8 120 C10 92 28 80 50 80 C72 80 90 92 92 120 Z" fill="#2e7d4f" /><path d="M29 42 C33 20 67 20 71 42 C60 30 40 30 29 42Z" fill="#3a2a22" /></svg></div>
            <div className="bia-t"><b>Beatriz Torres</b><span>31 anos · repórter investigativa</span><span className="mono">vista pela última vez: 19:52</span></div>
            <div className="tape">DESAPARECIDA · DESAPARECIDA · DESAPARECIDA · DESAPARECIDA</div>
          </div>
        )}
        {sc.k === 'toque' && <Telefone estado="tocando" />}
        {sc.k === 'ligacao' && <Telefone estado="falando" segundos={seg} />}
        {sc.k === 'relogio' && <div className="sc-relogio"><div className="mono small-up">TEMPO ATÉ O PRAZO</div><Contagem /></div>}
        {sc.k === 'titulo' && (
          <div className="sc-titulo"><div className="eyebrow">Um caso para dois celulares</div><h1 className="logo">MEIA-<br />NOITE</h1><div className="mono">PERGUNTEM · RESPONDAM · CORRAM</div></div>
        )}
      </div>
      <div className={`subtitle ${sc.fx === 'sequestrador' ? 'evil' : ''}`}>{sc.fx === 'sequestrador' && <b>Sequestrador: </b>}{sc.texto}</div>
      <div className="intro-actions">
        {ended ? <button className="btn primary" onClick={finish}>Escolher papéis</button> : <button className="link" onClick={finish}>Pular</button>}
      </div>
    </div>
  );
}
