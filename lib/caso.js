// "MEIA-NOITE" — sequestro de uma repórter. Jogo assimétrico para dois celulares:
// cada pergunta aparece em um celular e a resposta está nos arquivos do outro.

export const TEMPO_TOTAL = 60 * 60; // segundos
export const PENALIDADE_ERRO = 60;   // segundos

export const ROLES = {
  campo: {
    nome: 'Agente de Campo',
    curto: 'CAMPO',
    desc: 'Está na redação, ao lado da editora. Atende o sequestrador, interroga suspeitos e examina as provas.',
  },
  central: {
    nome: 'Analista da Central',
    curto: 'CENTRAL',
    desc: 'Na sala de monitoramento: câmeras da cidade, placas e GPS, telefones, cadastros e a marina.',
  },
};

export const BRIEFING = [
  'Sexta-feira, 16 de outubro de 2026, 23h00. Beatriz “Bia” Torres, 31 anos, repórter investigativa do Portal Radar, saiu da redação às 19h40 e não voltou.',
  'Às 23h00 em ponto, um homem ligou para o celular da editora-chefe: “Apaguem a reportagem sobre a Atlas até meia-noite. Se ela for publicada, a Bia não volta.”',
  'A reportagem, “O Esquema Atlas”, sai às 6h. Ela mostra a Construtora Atlas pagando propina para aprovar o projeto Porto Novo na Câmara de Santos.',
  'Vocês têm 60 minutos. Cada um vê só uma parte do caso. Perguntem, respondam, leiam os códigos de rádio um para o outro. Sozinhos, vocês não chegam a tempo.',
];

export const ENVOLVIDOS = [
  ['Beatriz “Bia” Torres', 'repórter desaparecida, 31'],
  ['Débora Kfouri', 'editora-chefe do Portal Radar, 52'],
  ['Thiago Reis', 'estagiário do Portal Radar, 23'],
  ['Marcos Lemos', 'fotógrafo, ex-namorado de Bia, 33'],
  ['Rodrigo Atlas', 'presidente da Construtora Atlas, 58'],
  ['Paulo Sena', 'vereador de Santos, 61'],
  ['Henrique Sá', 'chefe de gabinete do vereador, 45'],
];

/* ===================== PASSOS (perguntas cruzadas) ===================== */
// pergunta: aparece no celular de quem pergunta. A resposta está no celular do outro.
export const PASSOS = [
  { id: 1, ato: 1, pergunta: 'central', titulo: 'A saída',
    texto: 'Pergunte ao Campo: a que horas a Bia saiu da redação? (HHMM)',
    respostas: ['1940', '19:40', '19h40'], topico: 'o horário em que a Bia saiu da redação',
    onde: 'Aba Redação → depoimento da recepcionista e câmera do prédio.', codigo: 'ECO-19',
    news: { kicker: 'DESAPARECIDA', manchete: 'Repórter saiu da redação às 19h40 e não voltou', sub: 'Câmera mostra Bia Torres sozinha, de mochila verde, falando ao celular: praça em dez minutos.' },
    libera: { central: 'Câmeras da Praça Mauá liberadas.', campo: 'Novo depoimento na aba Rua: o pipoqueiro da praça.' } },
  { id: 2, ato: 1, pergunta: 'campo', titulo: 'A van branca',
    texto: 'Pergunte à Central: qual é a placa da van branca em que a Bia entrou na Praça Mauá?',
    respostas: ['frt8j21', 'frt-8j21'], topico: 'a placa de uma van branca na Praça Mauá',
    onde: 'Aba Câmeras → Praça Mauá.', codigo: 'DELTA-52',
    news: { kicker: 'REVIRAVOLTA', manchete: 'Bia entrou na van por vontade própria', sub: 'Ela sorriu e acenou para o motorista. A repórter estava esperando alguém.' },
    libera: { central: 'Câmera da Perimetral liberada. Consulte a placa na aba Veículos.', campo: null } },
  { id: 3, ato: 1, pergunta: 'campo', titulo: 'Quem alugou',
    texto: 'Pergunte à Central: em nome de quem a van FRT-8J21 foi alugada? (nome)',
    respostas: ['marcos', 'marcoslemos'], topico: 'o cadastro de aluguel da van FRT-8J21',
    onde: 'Aba Veículos → buscar FRT-8J21.', codigo: 'FOXTROT-08',
    news: { kicker: 'SUSPEITO', manchete: 'Van foi alugada em nome do ex-namorado da repórter', sub: 'Marcos Lemos, fotógrafo, terminou com Bia em agosto. Uma equipe foi buscá-lo.' },
    libera: { campo: 'Marcos chegou. Interrogatório na aba Rua.', central: 'Telefone de Marcos liberado.' },
    evento: 'ligacao2' },
  { id: 4, ato: 1, pergunta: 'central', titulo: 'O álibi',
    texto: 'Pergunte ao Campo: em que bar Marcos diz que estava às 19h50? (nome do bar)',
    respostas: ['gonzagao', 'bargonzagao'], topico: 'onde o Marcos diz que estava',
    onde: 'Aba Rua → interrogatório de Marcos.', codigo: 'GOLF-48',
    news: { kicker: 'ÁLIBI CONFIRMADO', manchete: 'Ex-namorado estava num bar no Gonzaga', sub: 'Celular e Pix confirmam. A carteira dele, com a CNH, foi furtada há uma semana dentro da redação do Portal Radar.' },
    libera: { central: 'A locadora liberou o GPS da van (aba Veículos).', campo: null } },

  { id: 5, ato: 2, pergunta: 'campo', titulo: 'O último ponto',
    texto: 'Pergunte à Central: onde a van parou pela última vez, segundo o GPS? (número do armazém)',
    respostas: ['7', 'sete', 'armazem7'], topico: 'o GPS da van',
    onde: 'Aba Veículos → FRT-8J21 → GPS.', codigo: 'HOTEL-31',
    news: { kicker: 'VAZIA', manchete: 'Armazém 7: a van estava vazia', sub: 'A mochila e o celular de Bia ficaram para trás. No chão, cheiro de diesel e um recibo amassado.' },
    libera: { campo: 'Perícia da van na aba Provas.', central: null },
    evento: 'invasao' },
  { id: 6, ato: 2, pergunta: 'central', titulo: 'O recibo',
    texto: 'Pergunte ao Campo: de onde é o recibo achado na van? (nome da marina)',
    respostas: ['estrela', 'marinaestrela'], topico: 'o recibo achado na van',
    onde: 'Aba Provas → perícia da van.', codigo: 'INDIA-58',
    news: { kicker: 'PELO MAR', manchete: 'Sequestrador comprou combustível de barco', sub: 'Sessenta litros de gasolina náutica às 20h58. Bia pode ter sido levada para a água.' },
    libera: { central: 'Registros da Marina Estrela na aba Veículos → Embarcações.', campo: 'Débora entregou o rascunho completo da reportagem (aba Provas).' },
    evento: 'ligacao3' },
  { id: 7, ato: 2, pergunta: 'campo', titulo: 'O barco',
    texto: 'Pergunte à Central: que barco abasteceu na Marina Estrela às 20h58?',
    respostas: ['estreladomar', 'estreladomarii', 'estreladomar2', 'lanchaestreladomar', 'lanchaestreladomarii'], topico: 'os abastecimentos da marina',
    onde: 'Aba Veículos → Embarcações.', codigo: 'JULIETT-20',
    news: { kicker: 'A LANCHA', manchete: 'Lancha Estrela do Mar II saiu da marina às 21h10', sub: 'O dono está internado desde terça. Quem pilotava era um homem careca, de braço tatuado.' },
    libera: { central: 'Cadastro dos irmãos Duarte liberado (aba Cadastros).', campo: null } },
  { id: 8, ato: 2, pergunta: 'central', titulo: 'O piloto',
    texto: 'Pergunte ao Campo: segundo a reportagem da Bia, para quem trabalha Ivan Duarte? (sobrenome do patrão)',
    respostas: ['sena', 'paulosena', 'vereadorsena', 'vereadorpaulosena'], topico: 'quem é Ivan Duarte na reportagem da Bia',
    onde: 'Aba Provas → rascunho completo da reportagem.', codigo: 'KILO-77',
    news: { kicker: 'CONEXÃO', manchete: 'Piloto da lancha é segurança do vereador Paulo Sena', sub: 'Segundo a reportagem de Bia, Ivan Duarte levava os envelopes da Atlas ao gabinete.' },
    libera: { central: 'Telefone de Ivan Duarte liberado.', campo: null } },

  { id: 9, ato: 3, pergunta: 'campo', titulo: 'O informante',
    texto: 'Pergunte à Central: quem mandou para Ivan o SMS “ela saiu agora”, às 19h35? (primeiro nome)',
    respostas: ['thiago', 'thiagoreis'], topico: 'quem mandou um SMS para Ivan às 19h35',
    onde: 'Aba Telefones → Ivan. Depois, aba Cadastros: busque o número.', codigo: 'LIMA-35',
    news: { kicker: 'TRAIÇÃO', manchete: 'Estagiário do Portal Radar entregou a repórter', sub: 'Thiago Reis, 23, avisou o sequestrador quando Bia saiu. Ele está agora mesmo na redação, servindo café.' },
    libera: { campo: 'Interrogue Thiago na aba Rua. Agora.', central: 'Telefone de Thiago liberado.' } },
  { id: 10, ato: 3, pergunta: 'central', titulo: 'O mandante',
    texto: 'Pergunte ao Campo: segundo Thiago, quem deu a ordem do sequestro? (primeiro nome)',
    respostas: ['henrique', 'henriquesa'], topico: 'a confissão de Thiago',
    onde: 'Aba Rua → interrogatório de Thiago (é preciso fazê-lo falar).', codigo: 'MIKE-45',
    news: { kicker: 'MANDANTE', manchete: 'Chefe de gabinete do vereador mandou sequestrar a repórter', sub: 'Henrique Sá recebia a propina da Atlas. Se a reportagem saísse, ele cairia primeiro.' },
    libera: { central: 'A operadora respondeu: localização do chip do sequestrador (aba Telefones).', campo: null },
    evento: 'ligacao4' },
  { id: 11, ato: 3, pergunta: 'campo', titulo: 'O sinal',
    texto: 'Pergunte à Central: de onde vem o sinal do chip do sequestrador? (nome da ilha)',
    respostas: ['barnabe', 'ilhabarnabe'], topico: 'a localização do chip do sequestrador',
    onde: 'Aba Telefones → chip do sequestrador.', codigo: 'OSCAR-00',
    news: { kicker: 'LOCALIZADO', manchete: 'Sinal do sequestrador vem do canal da Ilha Barnabé', sub: 'As lanchas da polícia estão prontas. Falta só a ordem de vocês.' },
    libera: { campo: 'A Ordem de Resgate está liberada na aba Missão.', central: 'A Ordem de Resgate está liberada na aba Missão.' } },
];

/* ===================== LIGAÇÕES DO SEQUESTRADOR ===================== */
export const LIGACOES = {
  ligacao1: { titulo: '23:00', fala: { id: 'k1', texto: 'Aqui é quem está com a Bia. Vocês têm até meia-noite para apagar a reportagem sobre a Atlas. Se ela for publicada, a Bia não volta. Nada de polícia.' } },
  ligacao2: { titulo: 'Segunda ligação',
    fala: { id: 'k2', texto: 'Atrás do ex-namorado? Ótimo. Continuem perdendo tempo. Eu sei tudo o que acontece nessa redação.' },
    opcoes: [
      { k: 'vida', label: 'Exigir prova de vida', pts: 5, resp: { id: 'k2a', texto: 'Fala rápido.' }, bia: 'Débora… tá frio… tudo balança o tempo todo… e tem um sino tocando, igual sino de boia…' },
      { k: 'fingir', label: 'Fingir que vai apagar a matéria', pts: 3, resp: { id: 'k2b', texto: 'Boa. À meia-noite eu desligo o motor e vou embora. Ela fica.' } },
      { k: 'ameacar', label: 'Ameaçar: “a polícia já sabe quem você é”', pts: -5, resp: { id: 'k2c', texto: 'Então tá. Boa sorte.' } },
    ] },
  ligacao3: { titulo: 'Terceira ligação',
    fala: { id: 'k3', texto: 'Acharam a van. Mais rápido do que eu esperava. Não importa. Onde ela está agora, quem decide é a maré.' },
    opcoes: [
      { k: 'apagada', label: 'Dizer que a matéria já foi apagada', pts: 5, resp: { id: 'k3a', texto: 'Mentira. Ainda está no servidor. Eu tenho alguém aí dentro, lembra?' } },
      { k: 'falar', label: 'Pedir para falar com a Bia', pts: 3, resp: { id: 'k3b', texto: 'Ela está dormindo. O balanço ajuda.' } },
      { k: 'dinheiro', label: 'Oferecer dinheiro', pts: 0, resp: { id: 'k3c', texto: 'Não é dinheiro. Nunca foi.' } },
    ] },
  ligacao4: { titulo: 'Última ligação', fala: { id: 'k4', texto: 'Vocês pegaram o garoto, não foi? Então acabou a conversa. Vou ligar o motor.' } },
};

/* ===================== OPERAÇÕES (cenas de rádio) ===================== */
export const OPERACOES = {
  invasao: { titulo: 'Armazém 7 · Valongo', cena: 'armazem', fim: 'VAZIA', falas: [
    { id: 'r1', texto: 'Equipe Alfa em posição no Armazém 7.' },
    { id: 'r2', texto: 'Entrando em três… dois… um.' },
    { id: 'r3', texto: 'Polícia! Ninguém se mexe!' },
    { id: 'r4', texto: 'Van localizada. Repito, van localizada.' },
    { id: 'r5', texto: 'Está vazia. A van está vazia.' },
  ] },
  resgate: { titulo: 'Canal da Ilha Barnabé', cena: 'canal', fim: 'VIVA', falas: [
    { id: 's1', texto: 'Lanchas em posição no canal da Ilha Barnabé.' },
    { id: 's2', texto: 'Lancha suspeita à vista. Sem luzes.' },
    { id: 's3', texto: 'Abordagem! Abordagem!' },
    { id: 's4', texto: 'Suspeito rendido.' },
    { id: 's5', texto: 'Encontramos a Bia. Ela está viva. Repito: está viva!' },
  ] },
  tarde: { titulo: 'Canal da Ilha Barnabé', cena: 'canal', fim: 'POR POUCO', falas: [
    { id: 's1', texto: 'Lanchas em posição no canal da Ilha Barnabé.' },
    { id: 's2', texto: 'Lancha suspeita à vista. Sem luzes.' },
    { id: 's3', texto: 'Abordagem! Abordagem!' },
    { id: 's4', texto: 'Suspeito rendido.' },
    { id: 't5', texto: 'Encontramos a Bia. Está fraca, com hipotermia. Precisamos de resgate aéreo, agora!' },
  ] },
  errado: { titulo: 'Local errado', cena: 'armazem', fim: 'NADA', falas: [
    { id: 'w1', texto: 'Equipe no local. Entrando.' },
    { id: 'w2', texto: 'Negativo. Ela não está aqui. Repito: negativo.' },
  ] },
};

/* ===================== CAMPO ===================== */
export const REDACAO = {
  depoimentos: [
    { quem: 'Débora Kfouri', sub: 'editora-chefe', texto: [
      '“A Bia ia publicar amanhã, às seis, a reportagem da vida dela: a Atlas comprando a aprovação do Porto Novo na Câmara.”',
      '“Ela saiu daqui dizendo que ia encontrar uma fonte nova. Estava empolgada, não quis dizer quem era.”',
      '“Só pode ser o Rodrigo Atlas. Quem mais teria tanto a perder?”'] },
    { quem: 'Lúcia Prado', sub: 'recepcionista do prédio', texto: [
      '“A Dona Bia passou na catraca às 19h40 em ponto. Lembro porque o jornal das sete e meia tinha acabado de terminar.”',
      '“Mochila verde, falando no celular: tô indo, praça em dez minutos.”'] },
  ],
  cameraPredio: [
    ['19:40:12', 'Bia passa pela catraca, de mochila verde, ao celular.', true],
    ['19:41:05', 'Sai pela porta principal, sentido Praça Mauá.'],
  ],
  agora: [
    'Débora Kfouri, a editora, com o celular que o sequestrador usa para ligar.',
    'Nando, o diagramador, preparando a capa das 6h.',
    'Thiago Reis, o estagiário. Chegou às 22h40 “para ajudar”. Está fazendo café para todo mundo e pergunta toda hora se há novidades.',
  ],
};

export const RUA = {
  wilson: { quem: 'Seu Wilson', sub: 'pipoqueiro da Praça Mauá', texto: [
    '“Umas sete e cinquenta, uma moça de mochila verde ficou esperando ali no banco, olhando o celular.”',
    '“Parou uma van branca, dessas de floricultura, com adesivo de flor. Ela sorriu, acenou e entrou na frente, sozinha. Ninguém forçou nada.”',
    '“A placa? Ih, moço, não sei. Começava com F, acho.”'] },
  marcos: { quem: 'Marcos Lemos', sub: 'ex-namorado · interrogatório', texto: [
    '“Eu não aluguei van nenhuma! Às sete e meia eu estava no Bar Gonzagão, no Gonzaga, com três amigos. Pode ligar para eles.”',
    '“Minha carteira sumiu no dia 9, quando fui buscar umas caixas minhas na redação do Portal Radar. Fiz boletim de ocorrência no dia seguinte.”',
    '“A gente terminou em agosto, mas eu ainda… Achem ela. Por favor.”'] },
};

export const PROVAS = {
  van: [
    'Van FRT-8J21 encontrada no Armazém 7, motor frio. O adesivo de floricultura foi colado há pouco: a cola ainda está fresca.',
    'Dentro: a mochila verde da Bia e o celular dela, sem a bateria. Pedaços de fita adesiva no banco de trás.',
    'Cheiro forte de diesel e de peixe.',
    'Recibo amassado no assoalho: “MARINA ESTRELA · Gasolina náutica 60 L · R$ 498,00 · 16/10 20:58 · pago em dinheiro”.',
  ],
  trecho: 'O ESQUEMA ATLAS (trecho público): “Documentos obtidos pelo Portal Radar mostram que a Construtora Atlas pagou R$ 3 milhões para que o projeto Porto Novo fosse aprovado na Câmara de Santos…”',
  reportagem: [
    'O ESQUEMA ATLAS · rascunho completo, por Beatriz Torres',
    '“O dinheiro saía da Construtora Atlas em envelopes. Quem os recebia, no gabinete do vereador Paulo Sena, era o chefe de gabinete, Henrique Sá.”',
    '“As entregas eram feitas por Ivan Duarte, segurança particular do vereador Paulo Sena, um homem careca com uma âncora tatuada no braço.”',
    '“Procurado, o vereador disse desconhecer os pagamentos. Henrique Sá não respondeu.”',
  ],
};

export const INTERROGATORIO = {
  inicio: 'abertura',
  nos: {
    abertura: { texto: 'Thiago Reis está na sala de reunião, suando. Ainda segura a garrafa térmica de café. “O que foi? Acharam a Bia?”', opcoes: [['Mostrar o SMS das 19h35', 'sms'], ['Perguntar onde a Bia está', 'nega'], ['Blefar: “o Ivan já foi preso”', 'blefe']] },
    nega: { texto: '“Eu não sei! Eu juro que não sei! Eu só vim ajudar, eu só fiz café…” Ele não olha nos seus olhos.', opcoes: [['Mostrar o SMS das 19h35', 'sms'], ['Blefar: “o Ivan já foi preso”', 'blefe']] },
    blefe: { texto: 'Ele fica branco. “Preso? Então… então ele vai falar de mim.” As mãos dele tremem.', opcoes: [['Mostrar o SMS das 19h35', 'sms'], ['“Quem mais está envolvido?”', 'eles']] },
    sms: { texto: '“Eu só avisei que ela tinha saído. Só isso! Eu disse pra ela que uma fonte do gabinete ia buscá-la numa van de floricultura. Eles falaram que era só pra assustar.”', opcoes: [['“Quem são eles?”', 'eles'], ['“Por que você fez isso?”', 'porque']] },
    porque: { texto: '“A minha mãe tem uma dívida de hospital. Me ofereceram trinta mil. Eu peguei a carteira do Marcos na redação pra eles alugarem a van… eu sou um lixo.”', opcoes: [['“Quem são eles?”', 'eles']] },
    eles: { texto: '“O Ivan, que leva ela. E quem paga o Ivan: o Henrique Sá, chefe de gabinete do vereador. Era ele que recebia os envelopes da Atlas. O vereador não sabe de nada, eu juro. O Henrique disse que, se a matéria saísse, ele ia preso.”', fim: true },
  },
};

/* ===================== CENTRAL ===================== */
export const CAMERAS = [
  { id: 'xv', nome: 'Rua XV de Novembro · frente ao Portal Radar', apos: 0, ev: [
    ['19:41', 'Bia sai do prédio e caminha sentido Praça Mauá, ao celular.'],
    ['22:38', 'Thiago Reis chega ao prédio com duas sacolas de padaria.'],
  ] },
  { id: 'maua', nome: 'Praça Mauá', apos: 1, bloqueio: 'Informe o horário de saída da Bia para puxar as gravações certas (pergunta 1).', ev: [
    ['19:44', 'Bia senta num banco, olhando o celular.'],
    ['19:52:30', 'Fiat Fiorino branca, com adesivo de flores, placa FRT-8J21, para junto ao banco.', true],
    ['19:52:40', 'Bia acena, sorri e entra pela porta do carona. O motorista só aparece pelo braço: careca, braço tatuado.', true],
    ['19:53', 'A van segue sentido Valongo.'],
  ] },
  { id: 'perimetral', nome: 'Av. Perimetral · Valongo', apos: 2, bloqueio: 'Libera depois da pergunta 2.', ev: [
    ['20:02', 'FRT-8J21 passa sentido armazéns do Valongo.'],
  ] },
  { id: 'gala', nome: 'Câmera de rede social · Hotel Unique, São Paulo', apos: 0, ev: [
    ['19:30–23:00', 'Rodrigo Atlas, da Construtora Atlas, aparece em dezenas de fotos de um jantar de gala em São Paulo, a 80 km de Santos.'],
  ] },
];

export const VAN = {
  placa: 'FRT-8J21',
  modelo: 'Fiat Fiorino branca 2023 · LocaFácil Santos',
  locacao: 'Alugada em 16/10, às 14h02. Locatário: MARCOS LEMOS, CPF 233.118.540-71, CNH apresentada. Pago em dinheiro.',
  obs: 'Anotação do atendente: “Cliente jovem, uns vinte e poucos anos, de boné. Não quis tirar o boné para a foto.”',
  gps: [
    ['19:53', 'Praça Mauá'],
    ['20:02', 'Av. Perimetral, Valongo'],
    ['20:31', 'Rua do Porto, 410 · ARMAZÉM 7 · motor desligado desde então', true],
  ],
};

export const MARINA = [
  ['18:20', 'Lancha “Netuno” · 40 L · cartão · proprietário no barco'],
  ['19:05', 'Veleiro “Maré Alta” · 15 L · cartão'],
  ['20:58', 'Lancha “ESTRELA DO MAR II” · 60 L · dinheiro · piloto: homem careca, braço tatuado. Proprietário: Igor Duarte', true],
  ['21:10', 'Estrela do Mar II deixa a marina sentido canal do porto, com as luzes apagadas.', true],
];

export const TELEFONES = [
  { id: 'bia', nome: 'Bia Torres · (13) 99620-1188', apos: 0, ev: [
    ['19:38', 'Ligação recebida de (13) 98877-3302, 2 min.'],
    ['19:41', 'Antena: Centro.'],
    ['19:58', 'Antena: Valongo.'],
    ['20:35', 'Aparelho desligado.'],
  ] },
  { id: 'marcos', nome: 'Marcos Lemos · (13) 99230-5571', apos: 3, ev: [
    ['19:00–21:30', 'Antena: Gonzaga, sem interrupção.'],
    ['19:48', 'Pix de R$ 86,00 para “Bar Gonzagão”.'],
  ] },
  { id: 'ivan', nome: 'Ivan Duarte · (13) 99140-7720', apos: 8, ev: [
    ['19:35', 'SMS recebido de (13) 98877-3302: “Ela saiu agora. Mochila verde. Praça em 10 min.”', true],
    ['19:52', 'SMS enviado para (13) 98877-3302: “Peguei.”', true],
    ['20:40', 'Aparelho desligado.'],
  ] },
  { id: 'thiago', nome: 'Thiago Reis · (13) 98877-3302', apos: 9, ev: [
    ['19:38', 'Ligação para Bia, 2 min.'],
    ['22:58', 'SMS para (13) 99003-6060: “Polícia aqui na redação. Tão atrás do Marcos.”', true],
    ['23:20', 'SMS para (13) 99003-6060: “Acharam a van.”', true],
  ] },
  { id: 'chip', nome: 'Chip do sequestrador · (13) 99003-6060', apos: 10, bloqueio: 'Pedido de localização enviado à operadora. Aguardando resposta.', ev: [
    ['15/10', 'Chip pré-pago ativado com documento falso.'],
    ['23:00 em diante', 'Todas as ligações para a editora saem da antena ILHA BARNABÉ · setor canal (sobre a água).', true],
    ['agora', 'Sinal ativo: ILHA BARNABÉ.', true],
  ] },
];

export const CADASTROS = [
  { nome: 'Beatriz Torres', apos: 0, info: 'Repórter, 31. Tel. (13) 99620-1188. Ameaçada por e-mail em setembro (registro arquivado).' },
  { nome: 'Débora Kfouri', apos: 0, info: 'Editora-chefe do Portal Radar, 52. Tel. (13) 99811-4400.' },
  { nome: 'Thiago Reis', apos: 0, info: 'Estagiário do Portal Radar, 23. Tel. (13) 98877-3302. Mãe com dívida hospitalar protestada em setembro: R$ 28.400.' },
  { nome: 'Marcos Lemos', apos: 0, info: 'Fotógrafo, 33. Tel. (13) 99230-5571. Boletim de 10/10: furto de carteira com RG e CNH, “na redação do Portal Radar, dia 09/10”.' },
  { nome: 'Rodrigo Atlas', apos: 0, info: 'Presidente da Construtora Atlas, 58. Investigado pela reportagem. Estava em São Paulo na noite de 16/10.' },
  { nome: 'Paulo Sena', apos: 0, info: 'Vereador de Santos, 61. Relator do projeto Porto Novo.' },
  { nome: 'Henrique Sá', apos: 0, info: 'Chefe de gabinete do vereador Paulo Sena, 45. Comprou um apartamento de R$ 2,1 milhões à vista em julho.' },
  { nome: 'Lúcia Prado', apos: 0, info: 'Recepcionista do prédio do Portal Radar.' },
  { nome: 'Ivan Duarte', apos: 7, info: 'Segurança particular, 41. Careca, âncora tatuada no braço direito. Tel. (13) 99140-7720. Vínculo empregatício: não declarado. Irmão de Igor Duarte.' },
  { nome: 'Igor Duarte', apos: 7, info: 'Pescador, 38. Dono da lancha Estrela do Mar II. Internado no Hospital dos Estivadores desde 13/10, com fratura na perna. Irmão de Ivan Duarte.' },
];

/* ===================== FINAL ===================== */
export const FINAL = {
  perguntas: [
    { k: 'local', t: 'Para onde vão as lanchas?', o: [['a', 'Armazém 7, no Valongo'], ['b', 'Lancha Estrela do Mar II, no canal da Ilha Barnabé'], ['c', 'Sítio do vereador, em Bertioga'], ['d', 'Apartamento de Thiago, no Centro']], a: 'b', p: 25 },
    { k: 'mandante', t: 'Quem mandou sequestrar a Bia?', o: [['henrique', 'Henrique Sá, chefe de gabinete'], ['paulo', 'Paulo Sena, o vereador'], ['rodrigo', 'Rodrigo Atlas, da construtora'], ['marcos', 'Marcos Lemos, o ex-namorado']], a: 'henrique', p: 15 },
    { k: 'isca', t: 'Quem atraiu a Bia para a van?', o: [['thiago', 'Thiago, o estagiário'], ['marcos', 'Marcos, o ex-namorado'], ['debora', 'Débora, a editora']], a: 'thiago', p: 10 },
    { k: 'vereador', t: 'O vereador Paulo Sena sabia do sequestro?', o: [['nao', 'Não'], ['sim', 'Sim']], a: 'nao', p: 5 },
  ],
  noticias: {
    viva: { id: 'fim-viva', titulo: 'Resgate', news: { kicker: 'RESGATADA', manchete: 'Bia Torres é resgatada com vida', sub: 'Ivan Duarte foi preso na lancha. Henrique Sá e o estagiário Thiago Reis também estão detidos. A reportagem sai às 6h.' } },
    tarde: { id: 'fim-tarde', titulo: 'Resgate', news: { kicker: 'POR POUCO', manchete: 'Bia é resgatada em estado grave', sub: 'A repórter foi encontrada com hipotermia na lancha. Os médicos dizem que mais alguns minutos teriam sido fatais.' } },
    errado: { id: 'fim-errado', titulo: 'Fuga', news: { kicker: 'FUGA', manchete: 'Sequestrador foge no escuro', sub: 'A polícia invadiu o lugar errado. Bia foi encontrada ao amanhecer por pescadores, viva, mas Ivan Duarte desapareceu.' } },
  },
  verdade: [
    'Henrique Sá, chefe de gabinete do vereador Paulo Sena, recebia a propina da Construtora Atlas. A reportagem de Bia o derrubaria primeiro. O vereador não sabia de nada.',
    'Ele pagou trinta mil reais ao estagiário Thiago Reis, que roubou a carteira de Marcos na redação para alugar a van no nome dele e disse a Bia que uma “fonte do gabinete” iria buscá-la numa van de floricultura.',
    'Às 19h35 Thiago avisou Ivan Duarte: “ela saiu agora”. Às 19h52 Bia entrou sorrindo na van. Ivan a levou ao Armazém 7, trocou para a lancha do irmão, que estava no hospital, e se escondeu no canal da Ilha Barnabé.',
    'Thiago passou a noite na redação, servindo café e contando cada passo da polícia ao sequestrador.',
  ],
};
