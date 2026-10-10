'use client';
import { useState } from 'react';
import * as A from '@/lib/audio';
import * as C from '@/lib/caso';

/* ---------- peças ---------- */
export function Section({ title, tag, children, open: openInit = false, locked, hot }) {
  const [open, setOpen] = useState(openInit);
  if (locked) return <div className="sec locked"><div className="sec-h"><span>🔒 {title}</span></div><div className="sec-lock">{locked}</div></div>;
  return (
    <div className={`sec ${open ? 'open' : ''} ${hot ? 'hot' : ''}`}>
      <button className="sec-h" onClick={() => { setOpen(!open); A.click(); }} aria-expanded={open}>
        <span>{title}</span>{tag && <em className="tag">{tag}</em>}<b className="chev">{open ? '−' : '+'}</b>
      </button>
      {open && <div className="sec-b">{children}</div>}
    </div>
  );
}
function Timeline({ rows }) {
  return <ul className="tl">{rows.map((r, i) => <li key={i} className={r[2] ? 'hot' : ''}><time>{r[0]}</time><span>{r[1]}</span></li>)}</ul>;
}
function Dep({ d }) {
  return (
    <div className="dep">
      <div className="dep-h"><b>{d.quem}</b><small>{d.sub}</small></div>
      <div className="typed">{d.texto.map((t, j) => <p key={j}>{t}</p>)}</div>
    </div>
  );
}
const trava = n => `Libera depois da pergunta ${n}.`;

/* ===================== CAMPO ===================== */
export function Redacao() {
  return (
    <div className="panel">
      <Section title="Depoimentos na redação" open>{C.REDACAO.depoimentos.map((d, i) => <Dep key={i} d={d} />)}</Section>
      <Section title="Câmera do prédio (catraca)"><Timeline rows={C.REDACAO.cameraPredio} /></Section>
      <Section title="Quem está na redação agora"><ul className="plain">{C.REDACAO.agora.map((t, i) => <li key={i}>{t}</li>)}</ul></Section>
    </div>
  );
}

export function Rua({ feito, st, set }) {
  return (
    <div className="panel">
      {feito >= 1 ? <Section title="Seu Wilson, pipoqueiro da Praça Mauá" tag="testemunha" open={feito < 3}><Dep d={C.RUA.wilson} /></Section> : <Section title="Testemunha da praça" locked={trava(1)} />}
      {feito >= 3 ? <Section title="Interrogatório: Marcos Lemos" tag="ex-namorado" open={feito < 5}><Dep d={C.RUA.marcos} /></Section> : <Section title="Interrogatório 1" locked={trava(3)} />}
      {feito >= 9 ? <Interrogatorio st={st} set={set} /> : <Section title="Interrogatório 2" locked={trava(9)} />}
    </div>
  );
}

function Interrogatorio({ st, set }) {
  const caminho = st.interrogatorio || [C.INTERROGATORIO.inicio];
  const no = C.INTERROGATORIO.nos[caminho[caminho.length - 1]];
  const ir = id => { A.click(); if (C.INTERROGATORIO.nos[id].fim) A.stamp(); set({ interrogatorio: [...caminho, id] }); };
  const pressao = Math.min(100, (caminho.length - 1) * 34);
  return (
    <div className="sec open hot interro">
      <div className="sec-h"><span>Interrogatório: Thiago Reis</span><em className="tag">AO VIVO</em></div>
      <div className="sec-b">
        <div className="pressao"><span>Pressão</span><div><i style={{ width: `${no.fim ? 100 : pressao}%` }} /></div></div>
        {caminho.map((id, i) => <p key={i} className={`typed ${i === caminho.length - 1 ? 'now' : 'old'}`}>{C.INTERROGATORIO.nos[id].texto}</p>)}
        {no.fim
          ? <p className="ok-line">✓ Confissão registrada.</p>
          : <div className="opts">{no.opcoes.map(([label, id]) => <button key={id} className="btn ghost wide" onClick={() => ir(id)}>{label}</button>)}</div>}
      </div>
    </div>
  );
}

export function Provas({ feito }) {
  return (
    <div className="panel">
      {feito >= 5 ? <Section title="Perícia na van FRT-8J21" tag="Armazém 7" open={feito < 7}><ul className="plain">{C.PROVAS.van.map((t, i) => <li key={i}>{t}</li>)}</ul></Section> : <Section title="Perícia da van" locked={trava(5)} />}
      {feito >= 6
        ? <Section title="Reportagem da Bia: rascunho completo" tag="sigiloso" open={feito < 9}><div className="draft">{C.PROVAS.reportagem.map((t, i) => <p key={i} className={i === 0 ? 'draft-h' : ''}>{t}</p>)}</div></Section>
        : <Section title="Reportagem da Bia: trecho público" open><p className="draft">{C.PROVAS.trecho}</p><p className="small">Débora só entrega o rascunho completo quando confiar em vocês (pergunta 6).</p></Section>}
    </div>
  );
}

export function Ligacoes({ st }) {
  const lista = ['ligacao1', ...['ligacao2', 'ligacao3', 'ligacao4'].filter(k => st.ligacoes[k] !== undefined)];
  const ouvir = async (id, texto) => { A.unlockAudio(); await A.playClip(id, texto, 'sequestrador'); };
  return (
    <div className="panel">
      <p className="small">Gravações do celular da editora. Escutem de novo: os sons de fundo também são pistas.</p>
      {lista.map(k => {
        const l = C.LIGACOES[k];
        const op = l.opcoes?.find(o => o.k === st.ligacoes[k]);
        return (
          <div className="sec open" key={k}><div className="sec-h"><span>📞 {l.titulo}</span></div>
            <div className="sec-b">
              <p className="evil-line">“{l.fala.texto}”</p>
              <button className="btn ghost sm" onClick={() => ouvir(l.fala.id, l.fala.texto)}>▶ Ouvir</button>
              {op && <><p className="small">Débora: {op.label}</p><p className="evil-line">“{op.resp.texto}”</p>{op.bia && <p className="bia-line">Bia: “{op.bia}”</p>}</>}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ===================== CENTRAL ===================== */
export function Cameras({ feito }) {
  return (
    <div className="panel">
      {C.CAMERAS.map(c => feito >= c.apos
        ? <Section key={c.id} title={c.nome} tag={c.apos && feito === c.apos ? 'novo' : 'gravação'} open={c.apos === feito && c.apos > 0}><Timeline rows={c.ev} /></Section>
        : <Section key={c.id} title={c.nome} locked={c.bloqueio} />)}
    </div>
  );
}

export function Veiculos({ feito }) {
  const [q, setQ] = useState('');
  const achou = q.replace(/[^a-z0-9]/gi, '').toUpperCase() === 'FRT8J21';
  return (
    <div className="panel">
      <Section title="Consulta de placa" open>
        <input id="placa" className="search" placeholder="Digite a placa (ex.: ABC-1D23)" value={q} onChange={e => setQ(e.target.value)} autoCapitalize="characters" />
        {q.length >= 7 && !achou && <p className="small">Nenhum registro para essa placa.</p>}
        {achou && (
          <div className="reg">
            <div className="pessoa-h"><b className="mono">{C.VAN.placa}</b><em className="tag">locadora</em></div>
            <p>{C.VAN.modelo}</p>
            <p>{C.VAN.locacao}</p>
            <p className="hl">{C.VAN.obs}</p>
            {feito >= 4 ? <><h4 className="sub-h">GPS da locadora</h4><Timeline rows={C.VAN.gps} /></> : <p className="small">🔒 GPS: a locadora só libera depois da pergunta 4.</p>}
          </div>
        )}
      </Section>
      {feito >= 6 ? <Section title="Embarcações · Marina Estrela" tag="16/10" open={feito < 8}><Timeline rows={C.MARINA} /></Section> : <Section title="Embarcações" locked={trava(6)} />}
    </div>
  );
}

export function Telefones({ feito }) {
  return (
    <div className="panel">
      {C.TELEFONES.map(t => feito >= t.apos
        ? <Section key={t.id} title={t.nome} tag={t.apos && feito === t.apos ? 'novo' : null} open={t.apos === feito && t.apos > 0}><Timeline rows={t.ev} /></Section>
        : <Section key={t.id} title={t.nome.split(' · ')[0]} locked={t.bloqueio || trava(t.apos)} />)}
    </div>
  );
}

export function Cadastros({ feito }) {
  const [q, setQ] = useState('');
  const n = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9 ]/g, '');
  const dig = s => s.replace(/\D/g, '');
  const lista = C.CADASTROS.filter(p => feito >= p.apos).filter(p => !q || n(p.nome + ' ' + p.info).includes(n(q)) || (dig(q).length >= 4 && dig(p.info).includes(dig(q))));
  return (
    <div className="panel">
      <input id="busca-cad" className="search" placeholder="Buscar por nome ou telefone" value={q} onChange={e => setQ(e.target.value)} />
      <div className="sec open"><div className="sec-b" style={{ paddingTop: 12 }}>
        {lista.length ? lista.map((p, i) => <div className="pessoa" key={i}><div className="pessoa-h"><b>{p.nome}</b></div><p>{p.info}</p></div>) : <p className="small">Nenhum cadastro encontrado.</p>}
      </div></div>
    </div>
  );
}
