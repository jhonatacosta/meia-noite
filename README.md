# Meia-Noite

Jogo de investigação **cooperativo para dois celulares**, feito em Next.js. Roda no navegador, sem nada para imprimir e sem servidor.

> Sexta-feira, 23h00. A repórter Bia Torres sumiu horas antes de publicar a reportagem que derruba um esquema de propina. O sequestrador liga: apaguem a matéria até meia-noite. Vocês têm **60 minutos reais**.

## Como se joga

1. Os dois abrem o mesmo link, cada um no seu celular, na mesma sala.
2. Assistam à abertura (com narração e a primeira ligação do sequestrador: aumentem o volume).
3. Um escolhe **Agente de Campo** (está na redação: depoimentos, interrogatórios, provas e o celular da editora). O outro escolhe **Analista da Central** (câmeras da cidade, placas e GPS, telefones, cadastros, marina).
4. Contem “três, dois, um” e apertem **INICIAR** juntos. O cronômetro começa.
5. Cada passo aparece **num celular só**, como pergunta, e a resposta está nos arquivos do outro:
   - quem tem a pergunta faz a pergunta em voz alta;
   - o parceiro procura nos arquivos dele e responde;
   - quem perguntou digita a resposta e recebe um **código de rádio** (ex.: `DELTA-52`);
   - lê o código em voz alta, o parceiro digita, e os dois recebem o plantão ao mesmo tempo.
6. Resposta errada custa **1 minuto**.
7. No caminho: ligações do sequestrador (vocês escolhem o que responder), uma invasão a um armazém, um interrogatório ao vivo e plantões de jornal narrados.
8. No fim, vocês dão a **Ordem de Resgate**. O final depende de onde mandarem as lanchas e de quanto tempo sobrou.

O progresso fica salvo no navegador de cada celular. Para recomeçar, use o menu ⋮.

## Rodar localmente

```bash
npm install
npm run dev
```

Abra http://localhost:3000. Para jogar nos celulares antes de publicar, use o IP do computador na mesma rede Wi-Fi (ex.: `http://192.168.0.10:3000`).

## Publicar

**GitHub Pages (automático):** em *Settings → Pages → Build and deployment → Source*, escolha **GitHub Actions**. Cada push na branch `main` publica em `https://<seu-usuario>.github.io/<nome-do-repositorio>/`.

**Vercel:** importe o repositório em vercel.com, sem configurar nada.

## Estrutura

- `lib/caso.js`: todo o caso (passos, perguntas, códigos, arquivos de cada papel, ligações, operações, final).
- `lib/narracao.js` + `public/audio/`: falas em português do Brasil, gravadas com vozes neurais Piper (Faber e Cadu). O sequestrador e o rádio da polícia recebem efeitos em tempo real.
- `lib/audio.js`: efeitos e ambientes sintetizados (toque de celular, porto, motor, rádio, sirene).
- `components/`: abertura (`Intro`), ligação (`CallScreen`), invasão e resgate (`Operacao`), plantão de jornal (`NewsFlash`), jogo (`Game`, `Panels`).
- `scripts/gerar-audio.mjs`: regrava os MP3 quando um texto falado muda (`npm run audio`; instruções no topo do arquivo).

Obra de ficção. Pessoas, empresas e órgãos são inventados.
