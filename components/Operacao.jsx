'use client';
import { useEffect, useRef, useState } from 'react';
import * as A from '@/lib/audio';
import { OPERACOES } from '@/lib/caso';

// Invasão / resgate: contagem, lanternas no escuro, rádio da polícia e o resultado carimbado.
export default function Operacao({ chave, onDone }) {
  const op = OPERACOES[chave];
  const [cont, setCont] = useState(3);
  const [log, setLog] = useState([]);
  const [fim, setFim] = useState(false);
  const vivo = useRef(true);

  useEffect(() => {
    vivo.current = true;
    A.preload(op.falas.map(f => f.id));
    let stopAmb = op.cena === 'canal' ? A.harbor() : () => {};
    (async () => {
      for (let n = 3; n >= 1; n--) { if (!vivo.current) return; setCont(n); A.tick(); A.heartbeat(); await new Promise(r => setTimeout(r, 900)); }
      setCont(0);
      for (const f of op.falas) {
        if (!vivo.current) return;
        if (/Polícia!|Abordagem/.test(f.texto)) { A.breach(); A.vibrar(300); }
        setLog(l => [...l, f.texto]);
        await A.playClip(f.id, f.texto, 'radio');
        await new Promise(r => setTimeout(r, 350));
      }
      stopAmb(); stopAmb = () => {};
      if (!vivo.current) return;
      A.stamp(); A.vibrar([200, 100, 200]);
      setFim(true);
    })();
    return () => { vivo.current = false; stopAmb(); A.stopSpeech(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`op op-${op.cena} ${cont === 0 ? 'go' : ''}`} role="dialog" aria-label={`Operação: ${op.titulo}`}>
      <div className="op-beams"><i /><i /></div>
      {op.cena === 'canal' && <div className="op-water" />}
      <div className="op-top"><span className="live">● RÁDIO</span><span className="mono">{op.titulo.toUpperCase()}</span></div>
      {cont > 0 && <div className="op-count" key={cont}>{cont}</div>}
      <div className="op-log">
        {log.map((t, i) => <p key={i} className={i === log.length - 1 ? 'last' : ''}><span className="mono">ALFA ›</span> {t}</p>)}
      </div>
      {fim && <div className={`op-stamp ${chave === 'resgate' ? 'good' : chave === 'tarde' ? 'warn' : ''}`}>{op.fim}</div>}
      {fim && <div className="op-actions"><button className="btn primary wide" onClick={onDone}>Continuar</button></div>}
    </div>
  );
}
