'use client';
import { useEffect, useRef, useState } from 'react';
import * as A from '@/lib/audio';
import { MANSAO, TACA, avatar } from '@/lib/svg';
import { SUSPEITOS } from '@/lib/caso';
import { INTRO } from '@/lib/narracao';

const SCENES = INTRO;

function TypeText({ text, speed = 55 }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (n >= text.length) return;
    const t = setTimeout(() => { setN(n + 1); if (text[n] !== ' ') A.typeTick(); }, speed);
    return () => clearTimeout(t);
  }, [n, text, speed]);
  return <span>{text.slice(0, n)}<span className="caret">▌</span></span>;
}

export default function Intro({ onDone }) {
  const [started, setStarted] = useState(false);
  const [i, setI] = useState(-1);
  const [ended, setEnded] = useState(false);
  const skip = useRef(false);
  const stopDrone = useRef(() => {});

  const wait = ms => new Promise(r => {
    const t0 = Date.now();
    const iv = setInterval(() => { if (skip.current || Date.now() - t0 >= ms) { clearInterval(iv); r(); } }, 100);
  });

  function sfx(k) {
    if (k === 'ecg') {
      [0, 900, 1800].forEach(d => setTimeout(() => !skip.current && A.heartbeat(), d));
      setTimeout(() => !skip.current && A.flatline(), 2700);
    }
    if (k === 'segredo') setTimeout(() => !skip.current && A.stamp(), 900);
    if (k === 'suspeitos') SUSPEITOS.forEach((_, j) => setTimeout(() => !skip.current && A.whoosh(), 300 + j * 420));
    if (k === 'titulo') setTimeout(() => !skip.current && A.newsSting(), 200);
    if (k === 'mansao' || k === 'vitima') A.whoosh();
  }

  async function start() {
    A.unlockAudio();
    A.preload(SCENES.map(sc => sc.id));
    setStarted(true);
    stopDrone.current = A.drone();
    for (let n = 0; n < SCENES.length; n++) {
      if (skip.current) return;
      setI(n);
      sfx(SCENES[n].k);
      await Promise.all([A.playClip(SCENES[n].id, SCENES[n].texto), wait(SCENES[n].min)]);
    }
    stopDrone.current();
    setEnded(true);
  }

  function finish() {
    skip.current = true;
    A.stopSpeech();
    stopDrone.current();
    A.unlockAudio();
    onDone();
  }

  if (!started) {
    return (
      <div className="intro intro-gate">
        <div className="gate-top">
          <div className="eyebrow">DIF · Departamento de Investigações Federais</div>
          <div className="gate-case">INQUÉRITO 0917/2026</div>
        </div>
        <button className="gate-play" onClick={start} aria-label="Iniciar a apresentação do caso">
          <span className="ring" /><span className="tri">▶</span>
        </button>
        <p className="gate-note">Aumente o volume. A abertura tem narração e trilha.</p>
        <button className="link" onClick={finish}>Pular abertura</button>
      </div>
    );
  }

  const sc = SCENES[i] || SCENES[SCENES.length - 1];
  return (
    <div className="intro">
      <div className="grain" />
      <div className="scene" key={sc.k}>
        {sc.k === 'data' && (
          <div className="sc-data"><div className="mono big"><TypeText text="GUARUJÁ · SP" /></div>
            <div className="mono"><TypeText text="SÁBADO, 12 DE SETEMBRO · 22:47" speed={45} /></div></div>
        )}
        {sc.k === 'mansao' && (
          <div className="sc-mansao"><div className="mansao" dangerouslySetInnerHTML={{ __html: MANSAO }} />
            <div className="cap">VILLA GAIVOTA <span>· Leilão “Noite das Marés”</span></div></div>
        )}
        {sc.k === 'vitima' && (
          <div className="sc-vitima"><div className="taca" dangerouslySetInnerHTML={{ __html: TACA }} />
            <div className="vit-card"><div className="eyebrow">A vítima</div><div className="vit-name">Augusto Valadares</div><div className="mono">63 anos · empresário do porto · cardiopata</div></div></div>
        )}
        {sc.k === 'ecg' && (
          <div className="sc-ecg">
            <svg viewBox="0 0 400 120" className="ecg"><path d="M0 60 L60 60 L75 60 L85 20 L95 100 L105 60 L160 60 L175 60 L185 25 L195 95 L205 60 L260 60 L272 50 L280 60 L400 60" /></svg>
            <div className="time mono">23:38 · ÓBITO</div>
          </div>
        )}
        {sc.k === 'segredo' && (
          <div className="sc-segredo"><div className="doc"><div className="mono">AGENDA · SEG 14/09</div><div className="hand">09h · DIF · Dr. Paiva<br />DEPOIMENTO</div></div><div className="stamp">CONFIDENCIAL</div></div>
        )}
        {sc.k === 'suspeitos' && (
          <div className="sc-susp">{SUSPEITOS.map((s, j) => (
            <div className="sp" key={s.id} style={{ animationDelay: `${0.3 + j * 0.42}s` }}>
              <div className="sp-av" dangerouslySetInnerHTML={{ __html: avatar(s.hair) }} />
              <div className="sp-n">{s.nome.replace('Dra. ', '').split(' ')[0]}</div>
            </div>))}</div>
        )}
        {sc.k === 'titulo' && (
          <div className="sc-titulo"><div className="eyebrow">Um caso para dois celulares</div><h1 className="logo">ÚLTIMO<br />LANCE</h1><div className="mono">O CASO VALADARES</div></div>
        )}
      </div>
      <div className="subtitle">{sc.texto}</div>
      <div className="intro-actions">
        {ended
          ? <button className="btn primary" onClick={finish}>Começar a investigação</button>
          : <button className="link" onClick={finish}>Pular</button>}
      </div>
    </div>
  );
}
