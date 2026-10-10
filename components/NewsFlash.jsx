'use client';
import { useEffect, useState } from 'react';
import * as A from '@/lib/audio';
import { textoNoticia } from '@/lib/narracao';

// Plantão: flash vermelho → jornal girando → página de jornal + tarja de TV ao vivo + narração.
export default function NewsFlash({ item, onClose }) {
  const [phase, setPhase] = useState('flash');
  const { news, libera, titulo, clip } = item;

  const narrar = () => A.playClip(clip, textoNoticia(news));

  useEffect(() => {
    A.newsSting();
    A.preload([clip]);
    const t1 = setTimeout(() => { setPhase('spin'); A.whoosh(); }, 750);
    const t2 = setTimeout(() => { setPhase('read'); narrar(); }, 2300);
    return () => { clearTimeout(t1); clearTimeout(t2); A.stopSpeech(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hoje = 'Segunda-feira, 14 de setembro de 2026';
  return (
    <div className={`news news-${phase}`} role="dialog" aria-label={`Plantão: ${news.manchete}`}>
      <div className="news-flash"><span>PLANTÃO</span></div>
      <div className="paper-wrap">
        <article className="paper">
          <div className="paper-mast">Diário do Litoral</div>
          <div className="paper-line"><span>EDIÇÃO EXTRA</span><span>{hoje}</span><span>R$ 4,00</span></div>
          <div className="paper-kicker">{news.kicker}</div>
          <h2 className="paper-head">{news.manchete}</h2>
          <p className="paper-sub">{news.sub}</p>
          <div className="paper-body">
            <div className="paper-photo"><span>DIF</span></div>
            <div className="paper-cols">{Array.from({ length: 9 }).map((_, k) => <i key={k} style={{ width: `${70 + ((k * 37) % 30)}%` }} />)}</div>
          </div>
        </article>
      </div>
      <div className="lower-third">
        <div className="lt-top"><span className="live">● AO VIVO</span><span className="lt-title">{titulo}</span></div>
        <div className="ticker"><div className="ticker-in">{`${news.manchete} • ${news.sub} • PLANTÃO DIF • `.repeat(3)}</div></div>
      </div>
      {phase === 'read' && (
        <div className="news-actions">
          {libera && <div className="libera"><b>Liberado no seu celular:</b> {libera}</div>}
          <div className="row">
            <button className="btn ghost" onClick={narrar}>Ouvir de novo</button>
            <button className="btn primary" onClick={() => { A.stopSpeech(); A.click(); onClose(); }}>Continuar</button>
          </div>
        </div>
      )}
    </div>
  );
}
