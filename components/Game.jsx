'use client';
import { useCallback, useEffect, useState } from 'react';
import * as A from '@/lib/audio';
import * as C from '@/lib/caso';
import Intro from './Intro';
import NewsFlash from './NewsFlash';
import { Caso, Cena, Cameras, Lab, Pessoas, Sigilo, Arquivo } from './Panels';

const KEY = 'ultimolance_mobile_v1';
const fresh = () => ({ introSeen: false, role: null, found: [], credits: C.CREDITOS_INICIAIS, lab: {}, dna: {}, hints: [], wrong: 0, intel: false, notes: '', final: null, tab: 'obj' });
const norm = s => (s || '').toString().normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/\s+/g, '').replace(/\.$/, '');
const ROMAN = ['', 'I', 'II', 'III'];

const TABS = {
  perito: [['obj', 'Objetivos', '◎'], ['caso', 'Caso', '☰'], ['cena', 'Cena', '⌖'], ['cam', 'Câmeras', '◉'], ['lab', 'Lab', '⚗']],
  analista: [['obj', 'Objetivos', '◎'], ['caso', 'Caso', '☰'], ['pessoas', 'Pessoas', '◍'], ['sigilo', 'Sigilo', '⚿'], ['arq', 'Arquivo', '▤']],
};

export default function Game() {
  const [st, setSt] = useState(null);
  const [newsQ, setNewsQ] = useState([]);
  const [modal, setModal] = useState(null);
  const [muted, setMutedS] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    let s = fresh();
    try { const raw = localStorage.getItem(KEY); if (raw) s = { ...s, ...JSON.parse(raw) }; } catch {}
    setSt(s);
  }, []);
  useEffect(() => { if (st) try { localStorage.setItem(KEY, JSON.stringify(st)); } catch {} }, [st]);

  const set = useCallback(patch => setSt(s => ({ ...s, ...(typeof patch === 'function' ? patch(s) : patch) })), []);
  const alerta = useCallback((t, b) => { A.stamp(); setModal({ t, b }); }, []);

  if (!st) return <div className="boot">DIF · carregando inquérito…</div>;
  if (!st.introSeen) return <Intro onDone={() => set({ introSeen: true })} />;
  if (!st.role) return <RoleSelect onPick={r => { A.unlockAudio(); A.success(); set({ role: r, tab: 'obj' }); }} />;

  const has = id => st.found.includes(id);
  const all = ids => ids.every(has);
  const ato = all(['D1', 'D2', 'D3']) ? (all(['D4', 'D5', 'D6', 'D7', 'D8']) ? 3 : 2) : 1;
  const autopsiaOk = all(['D1', 'D2']);
  const finalOk = all(['D9', 'D10', 'D11']);
  const tabs = TABS[st.role];
  const tab = tabs.some(t => t[0] === st.tab) ? st.tab : 'obj';

  const responder = (d, txt) => {
    if (d.respostas.map(norm).includes(norm(txt))) {
      A.success();
      set(s => ({ found: s.found.includes(d.id) ? s.found : [...s.found, d.id] }));
      setNewsQ(q => [...q, { clip: 'news-' + d.id, news: d.news, titulo: d.titulo, libera: d.libera ? d.libera[st.role] : null }]);
      return true;
    }
    A.errorBuzz();
    set(s => ({ wrong: s.wrong + 1 }));
    return false;
  };

  const toggleMute = () => { const m = !muted; A.setMuted(m); setMutedS(m); };

  return (
    <div className={`app role-${st.role}`}>
      <header className="top">
        <div className="top-role"><span className="dot" />{C.ROLES[st.role].curto}</div>
        <div className="top-act">ATO {ROMAN[ato]} <small>{st.found.length}/11</small></div>
        {st.role === 'perito' && <div className="top-cred">⚗ {st.credits}</div>}
        <button className="icon" onClick={toggleMute} aria-label={muted ? 'Ativar som' : 'Silenciar'}>{muted ? '🔇' : '🔊'}</button>
        <button className="icon" onClick={() => setMenu(!menu)} aria-label="Menu">⋮</button>
      </header>
      {menu && (
        <div className="menu">
          <button onClick={() => { setMenu(false); set({ introSeen: false }); }}>Rever a abertura</button>
          <button onClick={() => { setMenu(false); set({ role: st.role === 'perito' ? 'analista' : 'perito', tab: 'obj' }); }}>Trocar para {st.role === 'perito' ? 'Analista' : 'Perito'}</button>
          <button className="danger" onClick={() => { setMenu(false); setModal({ t: 'Recomeçar o caso?', b: 'Todo o progresso deste celular será apagado.', confirm: () => { setSt({ ...fresh(), introSeen: true }); setModal(null); } }); }}>Recomeçar do zero</button>
        </div>
      )}

      <main className="main" key={tab}>
        {tab === 'obj' && <Objetivos st={st} set={set} ato={ato} has={has} autopsiaOk={autopsiaOk} finalOk={finalOk} responder={responder} setNewsQ={setNewsQ} />}
        {tab === 'caso' && <Caso st={st} set={set} ato={ato} />}
        {tab === 'cena' && <Cena ato={ato} autopsiaOk={autopsiaOk} />}
        {tab === 'cam' && <Cameras ato={ato} />}
        {tab === 'lab' && <Lab st={st} set={set} ato={ato} autopsiaOk={autopsiaOk} alerta={alerta} />}
        {tab === 'pessoas' && <Pessoas />}
        {tab === 'sigilo' && <Sigilo ato={ato} />}
        {tab === 'arq' && <Arquivo st={st} set={set} ato={ato} alerta={alerta} />}
      </main>

      <nav className="tabbar">
        {tabs.map(([k, l, ic]) => (
          <button key={k} className={tab === k ? 'on' : ''} onClick={() => { A.click(); set({ tab: k }); window.scrollTo(0, 0); }}>
            <span className="ic">{ic}</span><span>{l}</span>
          </button>))}
      </nav>

      {modal && (
        <div className="modal" onClick={() => !modal.confirm && setModal(null)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-k">{modal.confirm ? 'CONFIRMAÇÃO' : '⚠ ALERTA DO LABORATÓRIO'}</div>
            <h3>{modal.t}</h3><p>{modal.b}</p>
            <div className="row">
              {modal.confirm && <button className="btn ghost" onClick={() => setModal(null)}>Cancelar</button>}
              <button className={`btn ${modal.confirm ? 'danger' : 'primary'}`} onClick={() => modal.confirm ? modal.confirm() : setModal(null)}>{modal.confirm ? 'Apagar e recomeçar' : 'Entendido'}</button>
            </div>
          </div>
        </div>
      )}
      {newsQ.length > 0 && <NewsFlash key={newsQ.length + newsQ[0].news.manchete} item={newsQ[0]} onClose={() => setNewsQ(q => q.slice(1))} />}
    </div>
  );
}

function RoleSelect({ onPick }) {
  return (
    <div className="roles">
      <div className="eyebrow">Inquérito 0917/2026</div>
      <h2>Quem é você neste celular?</h2>
      <p className="lead">Cada um escolhe um papel diferente no próprio celular. As pistas não se repetem: vocês vão precisar conversar.</p>
      {Object.entries(C.ROLES).map(([k, r]) => (
        <button key={k} className={`role-card rc-${k}`} onClick={() => onPick(k)}>
          <span className="rc-tag">{r.curto}</span><b>{r.nome}</b><span>{r.desc}</span>
        </button>))}
      <p className="small center">Jogando sozinho? Escolha um papel e use “Trocar de papel” no menu ⋮.</p>
    </div>
  );
}

function Objetivo({ d, done, travado, responder, hint, onHint }) {
  const [v, setV] = useState('');
  const [bad, setBad] = useState(false);
  const pistaLabel = { perito: 'PERITO', analista: 'ANALISTA', ambos: 'OS DOIS' }[d.pista];
  const enviar = e => {
    e.preventDefault();
    if (!v.trim()) return;
    if (!responder(d, v)) { setBad(true); setTimeout(() => setBad(false), 500); }
  };
  return (
    <div className={`obj ${done ? 'done' : ''} ${travado ? 'trav' : ''} ${bad ? 'shake' : ''}`}>
      <div className="obj-h"><span className="obj-id">{d.id.replace('D', '')}</span><b>{d.titulo}</b><span className={`pill p-${d.pista}`}>{pistaLabel}</span></div>
      {done ? <p className="obj-ok">✓ {d.news.manchete}</p>
        : travado ? <p className="small">🔒 {travado}</p>
        : <>
            <p>{d.pergunta}</p>
            <form className="row" onSubmit={enviar}>
              <input id={`resp-${d.id}`} className="search" value={v} onChange={e => setV(e.target.value)} placeholder="Resposta" autoComplete="off" autoCapitalize="none" />
              <button className="btn primary sm">Confirmar</button>
            </form>
            {hint ? <p className="hint">Onde procurar: {d.dica}</p> : <button className="link sm" onClick={onHint}>Onde procurar? (−2 pontos)</button>}
          </>}
    </div>
  );
}

function Objetivos({ st, set, ato, has, autopsiaOk, finalOk, responder, setNewsQ }) {
  const atos = [[1, 'Ato I · A noite do leilão'], [2, 'Ato II · O garçom fantasma'], [3, 'Ato III · Reviravoltas']];
  return (
    <div className="panel">
      <div className="brief">
        <p>Os objetivos são <b>os mesmos nos dois celulares</b>. Quem achar a resposta conta para o parceiro, e <b>cada um digita no seu</b>: assim os dois recebem o plantão e o material novo.</p>
      </div>
      {atos.map(([n, nome]) => (
        <div key={n} className={`act ${n > ato ? 'act-lock' : ''}`}>
          <h3 className="act-h">{nome}</h3>
          {n > ato ? <p className="small">🔒 Completem o ato anterior.</p>
            : C.DESCOBERTAS.filter(d => d.ato === n).map(d => (
              <Objetivo key={d.id} d={d} done={has(d.id)} responder={responder}
                travado={d.id === 'D3' && !autopsiaOk ? 'Aguardando o laudo do IML: resolvam os objetivos 1 e 2.' : null}
                hint={st.hints.includes(d.id)} onHint={() => { A.click(); set(s => ({ hints: [...s.hints, d.id] })); }} />))}
        </div>
      ))}
      {finalOk && <Final st={st} set={set} setNewsQ={setNewsQ} />}
    </div>
  );
}

function Final({ st, set, setNewsQ }) {
  const [ans, setAns] = useState({});
  const [err, setErr] = useState('');
  const P = C.FINAL.perguntas;
  if (st.final) return <Resultado st={st} />;
  const enviar = () => {
    if (P.some(q => !ans[q.k])) { setErr('Respondam as quatro perguntas.'); A.errorBuzz(); return; }
    const certo = ans.autor === 'livia';
    set({ final: ans });
    const n = certo ? C.FINAL.noticias.certo : C.FINAL.noticias.errado;
    setNewsQ(q => [...q, { ...n, clip: 'news-' + n.id }]);
  };
  return (
    <div className="act final">
      <h3 className="act-h">Relatório final</h3>
      <p>Discutam até concordar. Depois, <b>cada um envia o relatório no próprio celular</b>. Se o código do veredito for igual nos dois, vocês acusaram juntos.</p>
      {P.map(q => (
        <fieldset key={q.k} className="q">
          <legend>{q.t}</legend>
          {q.o.map(([v, l]) => (
            <label key={v} className={`opt ${ans[q.k] === v ? 'sel' : ''}`}>
              <input type="radio" name={q.k} value={v} checked={ans[q.k] === v} onChange={() => { A.click(); setAns({ ...ans, [q.k]: v }); }} />{l}
            </label>))}
        </fieldset>
      ))}
      {err && <p className="err">{err}</p>}
      <button className="btn danger wide" onClick={enviar}>Entregar relatório ao delegado</button>
    </div>
  );
}

function Resultado({ st }) {
  const a = st.final;
  let pts = st.found.length * 5;
  const linhas = C.FINAL.perguntas.map(q => { const ok = a[q.k] === q.a; if (ok) pts += q.p; return [q.t, ok, ok ? q.p : 0]; });
  pts += st.credits * 3 - st.hints.length * 2 - Math.min(st.wrong, 10);
  pts = Math.max(0, pts);
  const rank = pts >= 120 ? 'Lenda do DIF' : pts >= 100 ? 'Dupla de elite' : pts >= 75 ? 'Agentes promissores' : pts >= 50 ? 'De volta à academia' : 'Caso arquivado';
  const codigo = `${a.autor.slice(0, 2).toUpperCase()}-${a.meio}${a.motivo}-${a.coautor === 'nao' ? 'N' : 'S'}`.toUpperCase();
  const certo = a.autor === 'livia';
  return (
    <div className="act final">
      <div className="score"><small>Pontuação da dupla</small><b>{pts}</b><span>{rank}</span></div>
      <div className="verdict">Código do veredito: <b className="mono">{codigo}</b><small>Confiram: tem que ser igual nos dois celulares.</small></div>
      <ul className="tl">{linhas.map((l, i) => <li key={i} className={l[1] ? '' : 'hot'}><time>{l[1] ? '✓' : '✕'}</time><span>{l[0]}</span><b className="val">+{l[2]}</b></li>)}
        <li><time>◆</time><span>Descobertas ({st.found.length}) · créditos ({st.credits}) · dicas (−{st.hints.length * 2}) · erros (−{Math.min(st.wrong, 10)})</span></li></ul>
      <h3 className="act-h">{certo ? 'Vocês acertaram. A verdade:' : 'A verdade:'}</h3>
      {C.FINAL.verdade.map((p, i) => <p key={i}>{p}</p>)}
      <blockquote className="quote">{C.FINAL.confissao}<cite>Lívia Moretti, interrogatório de 14/09</cite></blockquote>
      <p className="small">Otávio foi preso no portão de embarque por contrabando e lavagem, não por homicídio. Helena e Bento deixaram o Guarujá juntos. Rafael entrou num tratamento para o vício em apostas. Joana foi readmitida pela nova diretoria.</p>
    </div>
  );
}
