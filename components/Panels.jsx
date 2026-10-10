'use client';
import { useState } from 'react';
import * as A from '@/lib/audio';
import * as C from '@/lib/caso';
import { avatar, cctvFrame, PLANTA } from '@/lib/svg';

/* ---------- peças pequenas ---------- */
export function Section({ title, tag, children, open: openInit = false, locked }) {
  const [open, setOpen] = useState(openInit);
  if (locked) return (
    <div className="sec locked"><div className="sec-h"><span>🔒 {title}</span></div><div className="sec-lock">{locked}</div></div>
  );
  return (
    <div className={`sec ${open ? 'open' : ''}`}>
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

function Paras({ list }) { return list.map((p, i) => <p key={i}>{p}</p>); }

/* ---------- CASO (os dois) ---------- */
export function Caso({ st, set, ato }) {
  const grupos = [
    [1, '1ª rodada de depoimentos'],
    [2, 'Novas testemunhas'],
    [3, '2ª rodada: as confissões'],
  ];
  return (
    <div className="panel">
      <Section title="Despacho do delegado" open><Paras list={C.DESPACHO} /></Section>
      <Section title="Como jogar">
        <p>Cada celular tem pistas diferentes. Os <b>objetivos</b> são os mesmos nos dois aparelhos: quem tiver a informação conta para o parceiro, e <b>os dois digitam a resposta</b> no próprio celular.</p>
        <p>Cada descoberta dispara um plantão de jornal e libera material novo, às vezes só no celular do outro. Leiam juntos, discutam teorias e só então acusem.</p>
        <p>O selo de cada objetivo mostra com quem está a pista: <span className="pill p-perito">PERITO</span> <span className="pill p-analista">ANALISTA</span> <span className="pill p-ambos">OS DOIS</span>.</p>
      </Section>
      <Section title="Os seis suspeitos" tag="6">
        <div className="susp-list">{C.SUSPEITOS.map(s => (
          <div className="susp" key={s.id}>
            <div className="susp-av" dangerouslySetInnerHTML={{ __html: avatar(s.hair) }} />
            <div className="susp-t"><b>{s.nome}</b><small>{s.papel}</small><p>{s.resumo}</p></div>
          </div>))}</div>
      </Section>
      {grupos.map(([g, nome]) => {
        const deps = C.DEPOIMENTOS.filter(d => d.ato === g);
        if (g > ato) return <Section key={g} title={nome} locked={`Libera no ato ${g === 2 ? 'II' : 'III'}.`} />;
        return (
          <Section key={g} title={nome} tag={String(deps.length)}>
            {deps.map((d, i) => (
              <div className="dep" key={i}>
                <div className="dep-h"><b>{d.quem}</b><small>{d.sub}</small></div>
                <div className="typed">{d.texto.map((t, j) => <p key={j}>{t}</p>)}</div>
                {d.obs && <div className="dep-obs">Obs. do agente: {d.obs}</div>}
              </div>))}
          </Section>);
      })}
      <Section title="Bloco de notas">
        <textarea id="notas" className="notes" value={st.notes} placeholder="Horários, contradições, teorias…" onChange={e => set({ notes: e.target.value })} />
      </Section>
    </div>
  );
}

/* ---------- PERITO: CENA ---------- */
export function Cena({ ato, autopsiaOk }) {
  return (
    <div className="panel">
      <Section title="Relatório do local do crime" open><Paras list={C.LOCAL_CRIME.texto} />
        <div className="evlist">{C.EVIDENCIAS.filter(e => e.ato === 1).map(e => <span key={e.id} className="chip">{e.id} · {e.nome}</span>)}</div>
      </Section>
      <Section title="Planta da casa"><div className="planta" dangerouslySetInnerHTML={{ __html: PLANTA }} /><p className="small">▲ câmera ativa · ✕ câmera quebrada. As gravações do portão e do estacionamento (CAM-06/07) foram para a base de Veículos, com o Analista.</p></Section>
      <Section title="Agenda da vítima (gaveta)">
        <ul className="agenda">{C.AGENDA.map((a, i) => <li key={i} className={a[2] ? 'hot' : ''}><time>{a[0]}</time><span className="hand">{a[1]}</span></li>)}</ul>
      </Section>
      {autopsiaOk
        ? <Section title="Laudo de necropsia (IML)" tag="novo"><Paras list={C.AUTOPSIA} /></Section>
        : <Section title="Laudo de necropsia (IML)" locked="O IML ainda não mandou. Resolvam os objetivos 1 e 2." />}
      {ato >= 2
        ? <Section title="Análise técnica da CAM-03"><Paras list={C.ANALISE_CAM03} /></Section>
        : <Section title="Análise técnica da CAM-03" locked="Libera no ato II." />}
      {ato >= 2
        ? <Section title="Documentos do buffet"><Paras list={C.BUFFET} /></Section>
        : <Section title="Documentos do buffet" locked="Libera no ato II." />}
      {ato >= 3
        ? <Section title="Auto de Apreensão AA-0913" tag="novo"><Paras list={C.AUTO_APREENSAO} /></Section>
        : <Section title="Auto de Apreensão" locked="Libera no ato III." />}
    </div>
  );
}

/* ---------- PERITO: CÂMERAS ---------- */
export function Cameras({ ato }) {
  const [enh, setEnh] = useState(false);
  return (
    <div className="panel">
      {C.CAMERAS.map(c => (
        <Section key={c.id} title={`${c.id} · ${c.local}`} tag={c.off ? 'sem sinal' : 'gravando'} open={c.id === 'CAM-03'}>
          {c.frames && (
            <>
              <div className="frames">{[1, 2, 3].map(n => <div key={n} className="frame" dangerouslySetInnerHTML={{ __html: cctvFrame(n, enh) }} />)}</div>
              {ato >= 2
                ? <button className="btn ghost sm" onClick={() => { setEnh(!enh); A.stamp(); }}>{enh ? 'Remover realce' : 'Aplicar realce de imagem'}</button>
                : <p className="small">Realce de imagem disponível no ato II.</p>}
            </>
          )}
          <Timeline rows={c.ev} />
        </Section>
      ))}
      {ato >= 2
        ? <Section title="Fotos do evento (EXIF)" tag="novo">
            <ul className="tl">{C.FOTOS.map((f, i) => <li key={i} className={f[0] === '22:57' ? 'hot' : ''}><time>{f[0]}</time><span><b>{f[1]}.</b> {f[2]}</span></li>)}</ul>
          </Section>
        : <Section title="Fotos do evento" locked="O fotógrafo entrega os arquivos no ato II." />}
    </div>
  );
}

/* ---------- PERITO: LABORATÓRIO ---------- */
export function Lab({ st, set, ato, autopsiaOk, alerta }) {
  const [conf, setConf] = useState(null);
  const pedir = e => {
    if (st.credits < e.custo) return;
    if (e.custo && conf !== e.id) { setConf(e.id); A.click(); return; }
    setConf(null);
    set({ credits: st.credits - e.custo, lab: { ...st.lab, [e.id]: 1 } });
    A.success();
    if (e.alerta) setTimeout(() => alerta(e.alerta[0], e.alerta[1]), 500);
  };
  const dna = s => {
    if (st.credits < 1 || st.dna[s]) return;
    if (conf !== 'dna-' + s) { setConf('dna-' + s); A.click(); return; }
    setConf(null);
    set({ credits: st.credits - 1, dna: { ...st.dna, [s]: 1 } });
    if (s === 'livia') { A.stamp(); setTimeout(() => alerta('Compatibilidade positiva', 'O fio de cabelo ruivo do paletó escondido pertence a LÍVIA MORETTI: 21 de 21 marcadores genéticos. Contem ao parceiro.'), 400); }
    else A.errorBuzz();
  };
  return (
    <div className="panel">
      <div className="credits"><span>Créditos de perícia</span><b>{st.credits}</b><small>de {C.CREDITOS_INICIAIS}. Cada exame custa 1. Combinem antes de gastar.</small></div>
      {C.EVIDENCIAS.map(e => {
        const done = st.lab[e.id];
        if (e.ato > ato) return <div className="ev locked" key={e.id}><b>{e.id}</b><span>Disponível no ato {e.ato === 2 ? 'II' : 'III'}</span></div>;
        if (e.req === 'autopsia' && !autopsiaOk) return <div className="ev locked" key={e.id}><b>{e.id}</b><span>Aguardando o IML</span></div>;
        return (
          <div className={`ev ${done || !e.custo ? 'done' : ''}`} key={e.id}>
            <div className="ev-h"><b>{e.id}</b><span>{e.nome}</span></div>
            {done || !e.custo
              ? <p className="ev-res">{e.res}</p>
              : <button className={`btn sm ${conf === e.id ? 'danger' : 'primary'}`} disabled={st.credits < 1} onClick={() => pedir(e)}>
                  {conf === e.id ? 'Confirmar: gastar 1 crédito' : 'Pedir exame · 1 crédito'}</button>}
          </div>);
      })}
      {ato >= 3 && st.lab['EV-07'] && (
        <Section title="Confronto de DNA do fio de cabelo (EV-07)" open>
          <p className="small">Material de referência dos seis suspeitos disponível. 1 crédito por confronto.</p>
          <div className="chips">{C.SUSPEITOS.map(s => (
            <button key={s.id} className={`chip btnchip ${st.dna[s.id] ? (s.id === 'livia' ? 'pos' : 'neg') : ''} ${conf === 'dna-' + s.id ? 'confirm' : ''}`} onClick={() => dna(s.id)}>
              {s.nome.replace('Dra. ', '').split(' ')[0]}{st.dna[s.id] ? (s.id === 'livia' ? ' ✓ POSITIVO' : ' ✕ exclusão') : conf === 'dna-' + s.id ? ' · confirmar?' : ''}
            </button>))}</div>
        </Section>
      )}
    </div>
  );
}

/* ---------- ANALISTA: PESSOAS ---------- */
export function Pessoas() {
  const [q, setQ] = useState('');
  const n = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  const list = C.PESSOAS.filter(p => !q || n(p.nome + ' ' + p.info).includes(n(q)));
  return (
    <div className="panel">
      <input id="busca-pessoas" className="search" placeholder="Buscar nome, placa, telefone…" value={q} onChange={e => setQ(e.target.value)} />
      <Section title="Fichas de pessoas" tag={String(list.length)} open>
        {list.map(p => (
          <div className="pessoa" key={p.id}>
            <div className="pessoa-h"><b>{p.nome}</b><span className="alt">{p.alt}</span></div>
            <small>Cabelo: {p.cab}</small><p>{p.info}</p>
          </div>))}
      </Section>
      <Section title="Veículos (CAM-06 · portão)">
        {C.VEICULOS.map(v => <div className="pessoa" key={v.placa}><div className="pessoa-h"><b className="mono">{v.placa}</b></div><small>{v.carro}</small><Timeline rows={v.ev} /></div>)}
      </Section>
      <Section title="Estacionamento dos convidados (CAM-07)"><Timeline rows={C.ESTACIONAMENTO} /></Section>
      <Section title="Registro civil">
        {C.CIVIL.map((r, i) => <div className="pessoa" key={i}><div className="pessoa-h"><b>{r.nome}</b><em className="tag">{r.tipo}</em></div><p>{r.txt}</p></div>)}
      </Section>
    </div>
  );
}

/* ---------- ANALISTA: SIGILO ---------- */
export function Sigilo({ ato }) {
  const [aba, setAba] = useState('tel');
  const [quem, setQuem] = useState('otavio');
  const [fq, setFq] = useState('');
  if (ato < 2) return (
    <div className="panel"><div className="bigLock"><div className="lockIcon">🔒</div><h3>Sigilo judicial</h3><p>Telefones, contas bancárias e compras de remédios controlados só abrem com ordem da juíza. Ela só assina quando houver prova de crime.</p><p className="small">Resolvam o objetivo 3.</p></div></div>
  );
  const abas = [['tel', 'Telefones'], ['fin', 'Contas'], ['farm', 'Farmácias'], ['net', 'Telemática']];
  const fn = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  return (
    <div className="panel">
      <div className="seg">{abas.map(([k, l]) => <button key={k} className={aba === k ? 'on' : ''} onClick={() => { setAba(k); A.click(); }}>{l}</button>)}</div>
      {(aba === 'tel' || aba === 'fin') && (
        <div className="chips">{C.SUSPEITOS.map(s => <button key={s.id} className={`chip btnchip ${quem === s.id ? 'sel' : ''}`} onClick={() => { setQuem(s.id); A.click(); }}>{s.nome.replace('Dra. ', '').split(' ')[0]}</button>)}</div>
      )}
      {aba === 'tel' && <div className="sec-b card"><Timeline rows={C.TELEFONIA[quem].map(r => [r[0], `${r[1]}: ${r[2]}`, r[3]])} /></div>}
      {aba === 'fin' && <div className="sec-b card"><ul className="tl">{C.FINANCEIRO[quem].map((r, i) => <li key={i} className={r[3] ? 'hot' : ''}><time>{r[0]}</time><span>{r[1]}</span><b className="val">{r[2]}</b></li>)}</ul></div>}
      {aba === 'farm' && (
        <div className="sec-b card">
          <input id="busca-farm" className="search" placeholder="Filtrar: nome, lote, farmácia…" value={fq} onChange={e => setFq(e.target.value)} />
          <p className="small">Registro nacional de remédios controlados · Baixada Santista · digoxina, setembro/2026. O sistema não cruza dados de óbito.</p>
          {C.FARMACIAS.filter(f => !fq || fn(Object.values(f).join(' ')).includes(fn(fq))).map((f, i) => (
            <div className="farm" key={i}>
              <div className="pessoa-h"><b>{f.data}</b><span className="mono">lote {f.lote}</span></div>
              <p><b>{f.med}</b><br />{f.farmacia}<br />Paciente: {f.paciente} · Comprador: {f.comprador}</p>
            </div>))}
        </div>
      )}
      {aba === 'net' && (ato >= 3
        ? <div className="sec-b card"><h4>Rastreio da denúncia anônima</h4><Paras list={C.TELEMATICA} /></div>
        : <div className="bigLock small"><p>🔒 Libera no ato III.</p></div>)}
    </div>
  );
}

/* ---------- ANALISTA: ARQUIVO ---------- */
export function Arquivo({ st, set, ato, alerta }) {
  const [pw, setPw] = useState('');
  const [err, setErr] = useState('');
  const abrir = () => {
    if (pw.replace(/\D/g, '') === C.SENHA_INTEL) {
      set({ intel: true }); A.stamp();
      setTimeout(() => alerta('O colaborador “Gaivota”', 'O informante secreto era o próprio Augusto. Sim: o nome da casa e o codinome dele são o mesmo pássaro. Leiam o arquivo juntos.'), 400);
    } else { setErr('Senha recusada. É uma data no formato DDMMAAAA.'); A.errorBuzz(); }
  };
  return (
    <div className="panel">
      <Section title="Jornal de domingo" open>
        <div className="mini-paper"><div className="mp-mast">Diário do Litoral</div><h4>{C.JORNAL.manchete}</h4><p>{C.JORNAL.texto}</p><div className="mp-box">{C.JORNAL.box}</div></div>
      </Section>
      {ato >= 3
        ? <Section title="Denúncia anônima (Ouvidoria, 13/09, 02h14)" tag="novo"><p className="typed">{C.DENUNCIA}</p><p className="small">De onde alguém poderia “ver” a garagem durante o intervalo? Rastreio em Sigilo → Telemática.</p></Section>
        : <Section title="Denúncia anônima" locked="Libera no ato III." />}
      {ato >= 3
        ? <Section title="E-mails da vítima (extração)" tag="novo">{C.EMAILS.map((e, i) => <div className="mail" key={i}><small className="mono">{e[0]}</small><p>{e[1]}</p></div>)}</Section>
        : <Section title="E-mails da vítima" locked="Libera no ato III." />}
      {ato < 3
        ? <Section title="Inteligência: Operação Maré Vermelha" locked="Arquivo reservado. Libera no ato III." />
        : st.intel
          ? <Section title="Inteligência: Operação Maré Vermelha" tag="aberto" open><Paras list={C.INTEL} /></Section>
          : <div className="sec"><div className="sec-h"><span>🔐 Operação Maré Vermelha</span></div>
              <div className="sec-b"><p>Senha: a data do depoimento marcado pelo colaborador (DDMMAAAA). <span className="small">A agenda da vítima está com o Perito.</span></p>
                <div className="row"><input id="senha-intel" className="search" inputMode="numeric" placeholder="DDMMAAAA" value={pw} onChange={e => { setPw(e.target.value); setErr(''); }} /><button className="btn primary sm" onClick={abrir}>Abrir</button></div>
                {err && <p className="err">{err}</p>}</div></div>}
    </div>
  );
}
