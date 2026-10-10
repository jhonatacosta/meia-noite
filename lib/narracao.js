// Tudo o que é falado no jogo. Os MP3 em public/audio são gerados a partir daqui
// com `npm run audio` (ver scripts/gerar-audio.mjs).
import { PASSOS, LIGACOES, OPERACOES, FINAL } from './caso.js';

export const VOZ_NARRADOR = 'pt_BR-faber-medium';
export const VOZ_ANCORA = 'pt_BR-cadu-medium';

export const INTRO = [
  { id: 'intro-1', k: 'data', min: 4200, texto: 'Santos. Sexta-feira, dezesseis de outubro. Vinte e três horas.' },
  { id: 'intro-2', k: 'redacao', min: 5200, texto: 'Na redação do Portal Radar, a reportagem mais perigosa do ano está pronta para sair às seis da manhã.' },
  { id: 'intro-3', k: 'bia', min: 5200, texto: 'A autora, Beatriz Torres, saiu às sete e quarenta para encontrar uma fonte. Não voltou.' },
  { id: 'intro-4', k: 'toque', min: 3600, texto: 'Às onze em ponto, o celular da editora toca.' },
  { id: 'k1', k: 'ligacao', min: 7000, fx: 'sequestrador', texto: LIGACOES.ligacao1.fala.texto },
  { id: 'intro-5', k: 'relogio', min: 5600, texto: 'Sessenta minutos. Ninguém sabe onde ela está. E alguém, muito perto, está mentindo.' },
  { id: 'intro-6', k: 'titulo', min: 5200, texto: 'Um no campo. Outro na central. Só juntos vocês chegam a tempo.' },
];

export const textoNoticia = news => `Plantão. ${news.manchete}. ${news.sub}`;

// Lista completa de falas para o gerador de áudio.
export function todasAsFalas() {
  const f = [];
  INTRO.filter(n => !n.fx).forEach(n => f.push({ id: n.id, texto: n.texto, voz: VOZ_NARRADOR, lento: 1.12 }));
  Object.values(LIGACOES).forEach(l => {
    f.push({ id: l.fala.id, texto: l.fala.texto, voz: VOZ_NARRADOR, lento: 1.18 });
    (l.opcoes || []).forEach(o => f.push({ id: o.resp.id, texto: o.resp.texto, voz: VOZ_NARRADOR, lento: 1.18 }));
  });
  const vistos = new Set();
  Object.values(OPERACOES).forEach(op => op.falas.forEach(x => {
    if (vistos.has(x.id)) return;
    vistos.add(x.id);
    f.push({ id: x.id, texto: x.texto, voz: VOZ_ANCORA, lento: 0.9 });
  }));
  PASSOS.forEach(p => f.push({ id: 'news-' + p.id, texto: textoNoticia(p.news), voz: VOZ_ANCORA, lento: 0.95 }));
  Object.values(FINAL.noticias).forEach(n => f.push({ id: 'news-' + n.id, texto: textoNoticia(n.news), voz: VOZ_ANCORA, lento: 0.95 }));
  return f;
}
