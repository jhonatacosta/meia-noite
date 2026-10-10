// Gera a narração em português do Brasil (MP3) a partir dos textos do jogo,
// usando Piper (TTS neural offline, código aberto).
//
// Preparação (uma vez):
//   pip install piper-tts lameenc
//   Baixe as vozes pt_BR-faber-medium e pt_BR-cadu-medium (.onnx e .onnx.json) de
//   https://huggingface.co/rhasspy/piper-voices/tree/main/pt/pt_BR para a pasta ./vozes
//   (ou aponte outra pasta com a variável PIPER_VOZES).
//
// Uso: npm run audio            (só grava o que falta)
//      npm run audio -- --todos (regrava tudo)
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { DESCOBERTAS, FINAL } from '../lib/caso.js';
import { INTRO, VOZ_NARRADOR, VOZ_ANCORA, textoNoticia } from '../lib/narracao.js';

const OUT = 'public/audio';
const VOZES = process.env.PIPER_VOZES || 'vozes';
const todos = process.argv.includes('--todos');
const py = process.platform === 'win32' ? 'python' : 'python3';

for (const v of [VOZ_NARRADOR, VOZ_ANCORA]) {
  if (!existsSync(join(VOZES, v + '.onnx'))) {
    console.error(`Voz não encontrada: ${join(VOZES, v + '.onnx')}. Veja as instruções no topo deste arquivo.`);
    process.exit(1);
  }
}
mkdirSync(OUT, { recursive: true });

const noticia = (id, news) => ({ id: 'news-' + id, texto: textoNoticia(news), voz: VOZ_ANCORA, lento: 0.95 });
const jobs = [
  ...INTRO.map(n => ({ id: n.id, texto: n.texto, voz: VOZ_NARRADOR, lento: 1.15 })),
  ...DESCOBERTAS.map(d => noticia(d.id, d.news)),
  ...Object.values(FINAL.noticias).map(n => noticia(n.id, n.news)),
]
  .map(j => ({ ...j, arquivo: `${OUT}/${j.id}.mp3` }))
  .filter(j => todos || !existsSync(j.arquivo));

if (!jobs.length) { console.log('Todos os áudios já existem. Use --todos para regravar.'); process.exit(0); }
const tmp = join(tmpdir(), 'ultimo-lance-jobs.json');
writeFileSync(tmp, JSON.stringify(jobs), 'utf-8');
execFileSync(py, ['scripts/piper_mp3.py', tmp, VOZES], { stdio: 'inherit' });
