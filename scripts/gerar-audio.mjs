// Gera as falas do jogo em português do Brasil (MP3) usando Piper,
// um TTS neural offline e de código aberto.
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
import { todasAsFalas, VOZ_NARRADOR, VOZ_ANCORA } from '../lib/narracao.js';

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

const jobs = todasAsFalas()
  .map(j => ({ ...j, arquivo: `${OUT}/${j.id}.mp3` }))
  .filter(j => todos || !existsSync(j.arquivo));

if (!jobs.length) { console.log('Todos os áudios já existem. Use --todos para regravar.'); process.exit(0); }
const tmp = join(tmpdir(), 'meia-noite-falas.json');
writeFileSync(tmp, JSON.stringify(jobs), 'utf-8');
execFileSync(py, ['scripts/piper_mp3.py', tmp, VOZES], { stdio: 'inherit' });
