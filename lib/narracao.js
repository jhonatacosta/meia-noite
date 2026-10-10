// Textos narrados. Os MP3 em public/audio são gerados a partir daqui
// com `npm run audio` (ver scripts/gerar-audio.mjs).

export const VOZ_NARRADOR = 'pt_BR-faber-medium';
export const VOZ_ANCORA = 'pt_BR-cadu-medium';

export const INTRO = [
  { id: 'intro-1', k: 'data', min: 4200, texto: 'Guarujá. Sábado, doze de setembro. Vinte e duas horas e quarenta e sete minutos.' },
  { id: 'intro-2', k: 'mansao', min: 4600, texto: 'Na Villa Gaivota, quarenta convidados disputam obras de arte num leilão beneficente.' },
  { id: 'intro-3', k: 'vitima', min: 4800, texto: 'O anfitrião, o empresário Augusto Valadares, pede um conhaque e se tranca no escritório.' },
  { id: 'intro-4', k: 'ecg', min: 5400, texto: 'Cinquenta minutos depois, ele está morto. Parece o coração.' },
  { id: 'intro-5', k: 'segredo', min: 5200, texto: 'Mas Augusto guardava um segredo. Na segunda-feira, às nove da manhã, ele seria testemunha numa investigação federal.' },
  { id: 'intro-6', k: 'suspeitos', min: 5600, texto: 'Seis pessoas estavam na casa. Todas tinham um motivo. Todas mentiram.' },
  { id: 'intro-7', k: 'titulo', min: 4200, texto: 'Dois agentes. Dois celulares. Um assassino. Último Lance.' },
];

export const textoNoticia = news => `Plantão do Diário do Litoral. ${news.manchete}. ${news.sub}`;
