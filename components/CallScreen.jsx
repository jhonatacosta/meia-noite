'use client';
import { useEffect, useRef, useState } from 'react';
import * as A from '@/lib/audio';
import { LIGACOES } from '@/lib/caso';
import { Telefone } from './Intro';

// Ligação do sequestrador: toca, você atende, ouve e escolhe o que responder.
export default function CallScreen({ chave, onDone }) {
  const lig = LIGACOES[chave];
  const [fase, setFase] = useState('tocando');
  const [seg, setSeg] = useState(0);
  const [escolha, setEscolha] = useState(null);
  const [legenda, setLegenda] = useState('');
  const stops = useRef([]);

  useEffect(() => {
    A.preload([lig.fala.id, ...(lig.opcoes || []).map(o => o.resp.id)]);
    stops.current.push(A.ringtone());
    return () => { stops.current.forEach(f => f()); A.stopSpeech(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (fase === 'tocando' || fase === 'fim') return;
    const iv = setInterval(() => setSeg(s => s + 1), 1000);
    return () => clearInterval(iv);
  }, [fase]);

  const pararTudo = () => { stops.current.forEach(f => f()); stops.current = []; };

  async function atender() {
    pararTudo();
    A.click();
    setFase('falando');
    stops.current.push(chave === 'ligacao4' ? A.engine() : A.harbor());
    setLegenda(lig.fala.texto);
    await A.playClip(lig.fala.id, lig.fala.texto, 'sequestrador');
    if (lig.opcoes) setFase('escolha');
    else encerrar();
  }

  async function responder(o) {
    A.click();
    setEscolha(o);
    setFase('resposta');
    setLegenda(o.resp.texto);
    await A.playClip(o.resp.id, o.resp.texto, 'sequestrador');
    if (o.bia) { setLegenda(''); await new Promise(r => setTimeout(r, 5200)); }
    encerrar();
  }

  function encerrar() {
    pararTudo();
    A.hangup();
    A.vibrar([80, 60, 80]);
    setFase('fim');
  }

  return (
    <div className="call" role="dialog" aria-label="Ligação do sequestrador">
      <div className="call-top mono">{lig.titulo.toUpperCase()} · CELULAR DA EDITORA</div>
      <Telefone estado={fase === 'tocando' ? 'tocando' : 'falando'} segundos={seg} />
      <div className="call-sub">
        {fase === 'tocando' && <p className="call-hint">Chamem o parceiro para ouvir junto.</p>}
        {legenda && fase !== 'fim' && <p className="subtitle evil"><b>Sequestrador: </b>{legenda}</p>}
        {fase === 'resposta' && escolha?.bia && !legenda && <p className="subtitle bia"><b>Bia (voz abafada): </b>{escolha.bia}</p>}
        {fase === 'fim' && (
          <div className="call-end">
            <div className="mono">CHAMADA ENCERRADA · {seg}s</div>
            {escolha?.bia && <p className="subtitle bia"><b>Bia disse: </b>{escolha.bia}</p>}
            <p className="small">A ligação fica gravada na aba Ligações.</p>
          </div>
        )}
      </div>
      <div className="call-actions">
        {fase === 'tocando' && <button className="btn answer" onClick={atender}>Atender</button>}
        {fase === 'escolha' && (
          <div className="opts">
            <div className="mono small">Débora olha para você. O que ela responde?</div>
            {lig.opcoes.map(o => <button key={o.k} className="btn ghost wide" onClick={() => responder(o)}>{o.label}</button>)}
          </div>
        )}
        {fase === 'fim' && <button className="btn primary wide" onClick={() => onDone(escolha?.k || null)}>Voltar à investigação</button>}
      </div>
    </div>
  );
}
