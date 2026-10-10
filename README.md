# Último Lance — O Caso Valadares

Jogo de investigação criminal **cooperativo para dois celulares**, feito em Next.js. Roda 100% no navegador, sem nada para imprimir e sem servidor.

Um empresário morre envenenado durante o leilão beneficente da própria mansão, dois dias antes de depor numa investigação federal. Seis suspeitos, todos mentem. Um deles tem voo para Lisboa.

## Como jogar

1. Os dois jogadores abrem o mesmo link, cada um no seu celular.
2. Assistam à abertura animada (com narração: aumentem o volume).
3. Cada um escolhe um papel diferente:
   - **Perito(a) Criminal**: cena do crime, câmeras, fotos e laboratório (créditos limitados).
   - **Analista de Inteligência**: pessoas, veículos, telefones, contas, farmácias e arquivo secreto.
4. Os **objetivos são os mesmos nos dois celulares**, mas as pistas estão espalhadas. Quem achar a resposta conta para o parceiro, e os dois digitam no próprio celular.
5. Cada descoberta dispara um **plantão de jornal** animado e narrado, e libera material novo.
6. São 3 atos e 11 descobertas. No fim, cada um entrega o relatório final. Se o **código do veredito** for igual nos dois celulares, vocês acusaram juntos.

O progresso fica salvo no navegador de cada celular. Para recomeçar, use o menu ⋮.

## Rodar localmente

```bash
npm install
npm run dev
```

Abra http://localhost:3000. Para testar no celular na mesma rede Wi-Fi, use o IP do computador (ex.: `http://192.168.0.10:3000`).

## Publicar

**GitHub Pages (automático):** no repositório, vá em *Settings → Pages → Build and deployment → Source* e escolha **GitHub Actions**. Cada push na branch `main` publica o jogo em `https://<seu-usuario>.github.io/<nome-do-repositorio>/`.

**Vercel:** importe o repositório em vercel.com. Não precisa configurar nada.

## Estrutura

- `lib/caso.js` — todo o conteúdo do caso: suspeitos, depoimentos, provas, objetivos e manchetes. Para criar outro caso, edite este arquivo.
- `lib/audio.js` — trilha e efeitos sintetizados (WebAudio) e reprodução da narração gravada.
- `lib/narracao.js` + `public/audio/` — textos e MP3 da narração em português do Brasil (vozes neurais Piper: Faber na abertura, Cadu nos plantões). Funciona em qualquer celular, mesmo sem voz em português instalada.
- `scripts/gerar-audio.mjs` — regrava os MP3 quando você muda algum texto (`npm run audio`; instruções no topo do arquivo).
- `components/Intro.jsx` — abertura em motion design.
- `components/NewsFlash.jsx` — plantão de jornal: flash, jornal girando, tarja de TV ao vivo e narração.
- `components/Game.jsx` e `components/Panels.jsx` — o jogo.

Obra de ficção. Pessoas, empresas e o órgão “DIF” são inventados.
