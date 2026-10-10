'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import * as A from '@/lib/audio';
import * as C from '@/lib/caso';
import Intro from './Intro';
import NewsFlash from './NewsFlash';
import CallScreen from './CallScreen';
import Operacao from './Operacao';
import { Redacao, Rua, Provas, Ligacoes, Cameras, Veiculos, Telefones, Cadastros, Section } from './Panels';

const KEY = 'meianoite_v1';
const fresh = () => ({ introSeen: false, role: null, startAt: null, penalty: 0, done: {}, ligacoes: {}, interrogatorio: null, hints: [], wrong: 0, notes: '', final: null, endRemaining: null, tab: 'missao', zeroAvisado: false });
const norm = s => (s || '').toString().normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '');
const fmt = s => { const v = Math.max(0, s); return `${String(Math.floor(v / 60)).padStart(2, '0')}:${String(v % 60).padStart(2, '0')}`; };

const TABS = {
  campo: [['missao', 'Missão', '◎'], ['redacao', 'Redação', '▤'], ['rua', 'Rua', '⌖'], ['provas', 'Provas', '⚲'], ['ligacoes', 'Ligações', '☏']],
  central: [['missao', 'Missão', '◎'], ['cameras', 'Câmeras', '◉'], ['veiculos', 'Veículos', '⛟'], ['telefones', 'Telefones', '☏'], ['cadastros', 'Cadastros', '☰']],
};

export default function Game() {
  const [st, setSt] = useState(null);
  const [fila, setFila] = useState([]);
  const [now, setNow] = useState(Date.now());
  const [muted, setMutedS] = useState(false);
  const [menu, setMenu] = useState(false);
  const [modal, setModal] = useState(null);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    let s = fresh();
    try { const raw = localStorage.getItem(KEY); if (raw) s = { ...s, ...JSON.parse(raw) }; } catch {}
    setSt(s);
    const iv = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(iv);
  }, []);
  useEffect(() => { if (st) try { localStorage.setItem(KEY, JSON.stringify(st)); } catch {} }, [st]);

  const set = useCallback(p => setSt(s => ({ ...s, ...(typeof p === 'function' ? p(s) : p) })), []);

  const restante = st && st.startAt ? (st.endRemaining ?? C.TEMPO_TOTAL - Math.floor((now - st.startAt) / 1000) - st.penalty) : C.TEMPO_TOTAL;

  // tensão do relógio
  const ultimoTick = useRef(0);
  useEffect(() => {
    if (!st || !st.startAt || st.final) return;
    if (restante <= 60 && restante > 0 && ultimoTick.current !== restante) { ultimoTick.current = restante; A.tick(); }
    if (restante <= 300 && restante > 0 && restante % 15 === 0) A.heartbeat();
    if (restante <= 0 && !st.zeroAvisado) {
      set({ zeroAvisado: true });
      A.newsSting(); A.vibrar([500, 200, 500]);
      setModal({ k: 'MEIA-NOITE', t: 'O prazo acabou.', b: 'O sequestrador não liga mais. Cada minuto agora conta contra a Bia. Continuem: ainda dá para encontrá-la.' });
    }
  }, [restante, st, set]);

  if (!st) return <div className="boot">carregando…</div>;
  if (!st.introSeen) return <Intro onDone={() => set({ introSeen: true })} />;
  if (!st.role) return <RoleSelect onPick={r => { A.unlockAudio(); A.success(); set({ role: r, tab: 'missao' }); }} />;
  if (!st.startAt) return <Sync role={st.role} onStart={() => { A.unlockAudio(); A.newsSting(); A.vibrar(200); set({ startAt: Date.now() }); }} />;

  let feito = 0;
  while (st.done[feito + 1]) feito++;
  const passo = C.PASSOS[feito] || null;
  const tabs = TABS[st.role];
  const tab = tabs.some(t => t[0] === st.tab) ? st.tab : 'missao';

  const concluir = p => {
    A.success(); A.vibrar(120);
    set(s => ({ done: { ...s.done, [p.id]: true } }));
    const news = { tipo: 'news', clip: 'news-' + p.id, news: p.news, titulo: p.titulo, libera: p.libera?.[st.role] };
    const ev = [];
    if (p.evento === 'invasao') ev.push({ tipo: 'op', chave: 'invasao' });
    ev.push(news);
    if (p.evento?.startsWith('ligacao')) ev.push(st.role === 'campo' ? { tipo: 'call', chave: p.evento } : { tipo: 'aviso', chave: p.evento });
    setFila(f => [...f, ...ev]);
  };
  const errar = () => {
    A.errorBuzz(); A.vibrar([60, 40, 60]);
    set(s => ({ wrong: s.wrong + 1, penalty: s.penalty + C.PENALIDADE_ERRO }));
    setFlash(true); setTimeout(() => setFlash(false), 900);
  };

  const enviarFinal = ans => {
    const local = ans.local === 'b';
    const chave = local ? (restante > 0 ? 'resgate' : 'tarde') : 'errado';
    const not = C.FINAL.noticias[local ? (restante > 0 ? 'viva' : 'tarde') : 'errado'];
    set({ final: { ...ans, chave }, endRemaining: restante });
    setFila(f => [...f, { tipo: 'op', chave }, { tipo: 'news', clip: 'news-' + not.id, news: not.news, titulo: not.titulo }]);
  };

  const evento = fila[0];
  const proximo = () => setFila(f => f.slice(1));
  const toggleMute = () => { const m = !muted; A.setMuted(m); setMutedS(m); };
  const urg = restante <= 600 ? (restante <= 120 ? 'crit' : 'warn') : '';

  return (
    <div className={`app role-${st.role} ${flash ? 'pen' : ''}`}>
      <header className="top">
        <div className="top-role"><span className="dot" />{C.ROLES[st.role].curto}</div>
        <div className={`timer ${urg}`}><small>ATÉ MEIA-NOITE</small>{fmt(restante)}{flash && <em className="pen-t">−1:00</em>}</div>
        <div className="top-prog mono">{feito}/11</div>
        <button className="icon" onClick={toggleMute} aria-label={muted ? 'Ativar som' : 'Silenciar'}>{muted ? '🔇' : '🔊'}</button>
        <button className="icon" onClick={() => setMenu(!menu)} aria-label="Menu">⋮</button>
      </header>
      {menu && (
        <div className="menu">
          <button onClick={() => { setMenu(false); set({ introSeen: false }); }}>Rever a abertura</button>
          <button onClick={() => { setMenu(false); set({ role: st.role === 'campo' ? 'central' : 'campo', tab: 'missao' }); }}>Trocar para {st.role === 'campo' ? 'Central' : 'Campo'} (jogo solo)</button>
          <button className="danger" onClick={() => { setMenu(false); setModal({ k: 'CONFIRMAÇÃO', t: 'Recomeçar o caso?', b: 'Todo o progresso deste celular será apagado.', confirm: () => { setSt({ ...fresh(), introSeen: true }); setModal(null); } }); }}>Recomeçar do zero</button>
        </div>
      )}

      <main className="main" key={tab}>
        {tab === 'missao' && <Missao st={st} set={set} feito={feito} passo={passo} concluir={concluir} errar={errar} enviarFinal={enviarFinal} restante={restante} />}
        {tab === 'redacao' && <Redacao />}
        {tab === 'rua' && <Rua feito={feito} st={st} set={set} />}
        {tab === 'provas' && <Provas feito={feito} />}
        {tab === 'ligacoes' && <Ligacoes st={st} />}
        {tab === 'cameras' && <Cameras feito={feito} />}
        {tab === 'veiculos' && <Veiculos feito={feito} />}
        {tab === 'telefones' && <Telefones feito={feito} />}
        {tab === 'cadastros' && <Cadastros feito={feito} />}
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
            <div className="modal-k">{modal.k}</div><h3>{modal.t}</h3><p>{modal.b}</p>
            <div className="row">
              {modal.confirm && <button className="btn ghost" onClick={() => setModal(null)}>Cancelar</button>}
              <button className={`btn ${modal.confirm ? 'danger' : 'primary'}`} onClick={() => modal.confirm ? modal.confirm() : setModal(null)}>{modal.confirm ? 'Apagar e recomeçar' : 'Entendido'}</button>
            </div>
          </div>
        </div>
      )}

      {evento?.tipo === 'news' && <NewsFlash key={fila.length + evento.clip} item={evento} onClose={proximo} />}
      {evento?.tipo === 'op' && <Operacao key={'op' + fila.length + evento.chave} chave={evento.chave} onDone={proximo} />}
      {evento?.tipo === 'call' && <CallScreen key={evento.chave} chave={evento.chave} onDone={k => { set(s => ({ ligacoes: { ...s.ligacoes, [evento.chave]: k } })); proximo(); }} />}
      {evento?.tipo === 'aviso' && (
        <div className="modal">
          <div className="modal-box ring-box">
            <div className="modal-k">📞 LIGAÇÃO EM ANDAMENTO</div>
            <h3>O sequestrador está ligando</h3>
            <p>O celular da editora está tocando, e quem está com ela é o Campo. Vá até o seu parceiro e ouçam juntos. Prestem atenção nos sons de fundo.</p>
            <div className="row"><button className="btn primary" onClick={() => { set(s => ({ ligacoes: { ...s.ligacoes, [evento.chave]: s.ligacoes[evento.chave] ?? null } })); proximo(); }}>Ouvimos juntos</button></div>
          </div>
        </div>
      )}
    </div>
  );
}

function RoleSelect({ onPick }) {
  return (
    <div className="roles">
      <div className="eyebrow">Sequestro · 23:00</div>
      <h2>Quem é você nesta noite?</h2>
      <p className="lead">Cada um escolhe um papel diferente no próprio celular. Vocês vão precisar perguntar um ao outro o tempo todo.</p>
      {Object.entries(C.ROLES).map(([k, r]) => (
        <button key={k} className={`role-card rc-${k}`} onClick={() => onPick(k)}><span className="rc-tag">{r.curto}</span><b>{r.nome}</b><span>{r.desc}</span></button>))}
      <p className="small center">Jogando sozinho? Escolha um papel e alterne pelo menu ⋮.</p>
    </div>
  );
}

function Sync({ role, onStart }) {
  return (
    <div className="sync">
      <div className="eyebrow">{C.ROLES[role].nome}</div>
      <h2>Sincronizem os relógios</h2>
      <ol className="steps-list">
        <li>Confiram: um celular é <b>Campo</b>, o outro é <b>Central</b>.</li>
        <li>As perguntas aparecem num celular, as respostas estão no outro. <b>Falem em voz alta.</b></li>
        <li>Quem acerta recebe um <b>código de rádio</b> e lê para o parceiro digitar.</li>
        <li>Resposta errada custa <b>1 minuto</b>.</li>
      </ol>
      <p className="lead">Contem juntos: três, dois, um…</p>
      <button className="sync-btn" onClick={onStart}><span>INICIAR</span><small>60:00</small></button>
    </div>
  );
}

function Missao({ st, set, feito, passo, concluir, errar, enviarFinal, restante }) {
  return (
    <div className="panel">
      {passo ? <PassoAtual key={passo.id} st={st} set={set} p={passo} concluir={concluir} errar={errar} /> : <Final st={st} enviarFinal={enviarFinal} restante={restante} />}
      {feito > 0 && (
        <Section title="Linha do caso" tag={`${feito} descobertas`} open={false}>
          <ul className="tl">{C.PASSOS.slice(0, feito).reverse().map(p => (
            <li key={p.id}><time>{p.pergunta === st.role ? p.codigo : '✓'}</time><span><b>{p.titulo}.</b> {p.news.manchete}</span></li>))}</ul>
        </Section>
      )}
      <Section title="O caso" open={feito === 0}>{C.BRIEFING.map((t, i) => <p key={i}>{t}</p>)}</Section>
      <Section title="Envolvidos"><ul className="tl">{C.ENVOLVIDOS.map(([n, d]) => <li key={n}><time>•</time><span><b>{n}</b>, {d}</span></li>)}</ul></Section>
      <Section title="Bloco de notas"><textarea id="notas" className="notes" value={st.notes} placeholder="Horários, placas, nomes, suspeitas…" onChange={e => set({ notes: e.target.value })} /></Section>
    </div>
  );
}

function PassoAtual({ st, set, p, concluir, errar }) {
  const [v, setV] = useState('');
  const [bad, setBad] = useState(false);
  const [revelado, setRevelado] = useState(false);
  const pergunto = p.pergunta === st.role;
  const parceiro = C.ROLES[p.pergunta === 'campo' ? 'central' : 'campo'].curto;
  const hint = st.hints.includes(p.id);

  const enviar = e => {
    e.preventDefault();
    if (!v.trim()) return;
    const ok = pergunto ? p.respostas.map(norm).includes(norm(v)) : norm(v) === norm(p.codigo);
    if (ok) {
      if (pergunto) { setRevelado(true); A.stamp(); }
      else concluir(p);
    } else { errar(); setBad(true); setTimeout(() => setBad(false), 500); }
  };

  if (revelado) {
    return (
      <div className="now-card code-card">
        <div className="now-k">✓ RESPOSTA CERTA · PASSO {p.id}</div>
        <p>Leia este código de rádio em voz alta para o {parceiro}:</p>
        <div className="radio-code mono">{p.codigo}</div>
        <p className="small">Quando ele digitar, os dois recebem o plantão ao mesmo tempo.</p>
        <button className="btn primary wide" onClick={() => concluir(p)}>Já li o código</button>
      </div>
    );
  }

  return (
    <div className={`now-card ${pergunto ? 'ask' : 'answer'} ${bad ? 'shake' : ''}`}>
      <div className="now-k"><span>PASSO {p.id} DE 11 · ATO {['', 'I', 'II', 'III'][p.ato]}</span><b>{p.titulo}</b></div>
      {pergunto ? (
        <>
          <div className="role-say">🎙 VOCÊ PERGUNTA</div>
          <p className="big-q">{p.texto}</p>
          <p className="small">Essa informação não está no seu celular. Só o {parceiro} tem.</p>
          <form className="row" onSubmit={enviar}>
            <input id={`resp-${p.id}`} className="search" value={v} onChange={e => setV(e.target.value)} placeholder="Resposta do parceiro" autoComplete="off" autoCapitalize="none" />
            <button className="btn primary">Enviar</button>
          </form>
        </>
      ) : (
        <>
          <div className="role-say">👂 VOCÊ TEM A RESPOSTA</div>
          <p className="big-q">O {parceiro} vai te perguntar sobre <b>{p.topico}</b>.</p>
          <p>Ouça a pergunta, procure nos seus arquivos e responda em voz alta. Quando ele acertar, vai ler um código de rádio para você.</p>
          {hint ? <p className="hint">Onde procurar: {p.onde}</p> : <button className="link sm" onClick={() => { A.click(); set(s => ({ hints: [...s.hints, p.id] })); }}>Onde procurar? (−2 pontos)</button>}
          <form className="row" onSubmit={enviar}>
            <input id={`cod-${p.id}`} className="search mono" value={v} onChange={e => setV(e.target.value)} placeholder="Código de rádio (ex.: ALFA-00)" autoComplete="off" autoCapitalize="characters" />
            <button className="btn primary">Confirmar</button>
          </form>
        </>
      )}
    </div>
  );
}

function Final({ st, enviarFinal, restante }) {
  const [ans, setAns] = useState({});
  const [err, setErr] = useState('');
  if (st.final) return <Resultado st={st} />;
  const P = C.FINAL.perguntas;
  const enviar = () => {
    if (P.some(q => !ans[q.k])) { setErr('Respondam as quatro perguntas.'); A.errorBuzz(); return; }
    enviarFinal(ans);
  };
  return (
    <div className="now-card final">
      <div className="now-k"><span>ORDEM DE RESGATE · {fmt(restante)}</span><b>Decidam juntos</b></div>
      <p>As lanchas esperam a ordem. Discutam em voz alta e marquem as mesmas respostas nos dois celulares.</p>
      {P.map(q => (
        <fieldset key={q.k} className="q">
          <legend>{q.t}</legend>
          {q.o.map(([val, l]) => (
            <label key={val} className={`opt ${ans[q.k] === val ? 'sel' : ''}`}>
              <input type="radio" name={q.k} value={val} checked={ans[q.k] === val} onChange={() => { A.click(); setAns({ ...ans, [q.k]: val }); }} />{l}
            </label>))}
        </fieldset>))}
      {err && <p className="err">{err}</p>}
      <button className="btn danger wide" onClick={enviar}>Dar a ordem</button>
    </div>
  );
}

function Resultado({ st }) {
  const a = st.final;
  const feitos = Object.keys(st.done).length;
  const linhas = C.FINAL.perguntas.map(q => [q.t, a[q.k] === q.a, a[q.k] === q.a ? q.p : 0]);
  const pLig = Object.entries(st.ligacoes).reduce((s, [k, v]) => s + (C.LIGACOES[k].opcoes?.find(o => o.k === v)?.pts || 0), 0);
  const min = Math.max(0, Math.floor(st.endRemaining / 60));
  let pts = feitos * 4 + linhas.reduce((s, l) => s + l[2], 0) + pLig + min - st.hints.length * 2 - Math.min(st.wrong, 15);
  pts = Math.max(0, pts);
  const rank = a.chave !== 'resgate' ? (a.chave === 'tarde' ? 'Salvaram por um fio' : 'A noite venceu') : pts >= 120 ? 'Lendas da madrugada' : pts >= 100 ? 'Dupla de elite' : 'Missão cumprida';
  const codigo = `${a.local}${a.mandante.slice(0, 2)}${a.isca.slice(0, 2)}${a.vereador[0]}`.toUpperCase();
  return (
    <div className="now-card final">
      <div className="score"><small>Pontuação da dupla</small><b>{pts}</b><span>{rank}</span></div>
      <div className="verdict">Código da ordem: <b className="mono">{codigo}</b><small>Tem que ser igual nos dois celulares.</small></div>
      <ul className="tl">
        {linhas.map((l, i) => <li key={i} className={l[1] ? '' : 'hot'}><time>{l[1] ? '✓' : '✕'}</time><span>{l[0]}</span><b className="val">+{l[2]}</b></li>)}
        <li><time>⏱</time><span>Tempo restante: {fmt(st.endRemaining)}</span><b className="val">+{min}</b></li>
        <li><time>☏</time><span>Escolhas nas ligações</span><b className="val">{pLig >= 0 ? '+' : ''}{pLig}</b></li>
        <li><time>◆</time><span>{feitos} descobertas · {st.hints.length} dicas · {st.wrong} erros</span></li>
      </ul>
      <h3 className="act-h">O que aconteceu</h3>
      {C.FINAL.verdade.map((p, i) => <p key={i}>{p}</p>)}
    </div>
  );
}
