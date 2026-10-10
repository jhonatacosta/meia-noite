// Biblia do caso "Último Lance". Todos os dados do jogo vivem aqui.
// O jogo é assimétrico: cada papel vê fontes diferentes e precisa da outra pessoa.

export const ROLES = {
  perito: {
    nome: 'Perito(a) Criminal',
    curto: 'PERITO',
    desc: 'Cena do crime, câmeras internas, fotos do evento e o laboratório.',
  },
  analista: {
    nome: 'Analista de Inteligência',
    curto: 'ANALISTA',
    desc: 'Pessoas, veículos, telefones, contas, farmácias e arquivos secretos.',
  },
};

export const CREDITOS_INICIAIS = 6;

/* ============ SUSPEITOS (os dois veem) ============ */
export const SUSPEITOS = [
  { id: 'helena', nome: 'Helena Valadares', papel: 'Esposa · 52', hair: 'long_blond', resumo: 'Anfitriã do leilão. Casada com separação total de bens: herda na morte, mas sai sem nada num divórcio. Ninguém a viu no salão durante o intervalo.' },
  { id: 'rafael', nome: 'Rafael Valadares', papel: 'Filho · 29', hair: 'brown', resumo: 'Brigou aos gritos com o pai às 22h30: “você vai se arrepender”. Herdeiro de 50% das ações. Comentam que deve dinheiro a gente perigosa.' },
  { id: 'otavio', nome: 'Otávio Sampaio', papel: 'Sócio e diretor financeiro · 58', hair: 'grey', resumo: 'Saiu às pressas às 23h15, antes de o corpo ser encontrado. Tem voo marcado para Lisboa.' },
  { id: 'livia', nome: 'Dra. Lívia Moretti', papel: 'Curadora e leiloeira · 44', hair: 'long_red', resumo: 'Conduziu o leilão e assinou o certificado do lote 12. Anunciou um intervalo às 22h50 por “falha no projetor”.' },
  { id: 'joana', nome: 'Joana Pires', papel: 'Assistente pessoal · 34', hair: 'black', resumo: 'Encontrou o corpo às 23h38. Montava a caixinha semanal de remédios da vítima.' },
  { id: 'bento', nome: 'Bento Ferraz', papel: 'Chefe de segurança · 47', hair: 'bald', resumo: 'Ex-policial militar. Diz que passou a noite olhando as câmeras.' },
];

export const DESPACHO = [
  'Agentes, na noite de sábado, 12/09/2026, durante o leilão beneficente “Noite das Marés”, o empresário AUGUSTO VALADARES, 63, foi encontrado morto no escritório da própria casa, a Villa Gaivota, no Guarujá. Ele era cardiopata e tomava digoxina todas as manhãs. A polícia local registrou “provável morte natural”.',
  'O que o boletim local não diz: Augusto tinha depoimento marcado aqui no DIF na segunda-feira, às 9h, como colaborador sigiloso de uma investigação federal sobre contrabando de obras de arte pelo Porto de Santos.',
  'Seis pessoas próximas estavam na casa. Quero saber se houve crime e, se houve, quem, como e por quê. Também preciso saber se alguém ajudou.',
  'Vocês são dois. Um fica com a perícia, o outro com a inteligência. Nenhum dos dois consegue fechar este caso sozinho. Conversem.',
  'Um dos envolvidos tem voo para Lisboa. O relógio está correndo. — Dr. Renato Paiva, Delegado-Chefe do DIF',
];

/* ============ DEPOIMENTOS (os dois veem; liberados por ato) ============ */
export const DEPOIMENTOS = [
  { ato: 1, quem: 'Helena Valadares', sub: 'esposa · 13/09, 01h40', texto: [
    '“Por volta das 22h45 senti uma enxaqueca terrível e subi para o quarto. Tomei um remédio e deitei com a luz apagada. Só desci quando ouvi a gritaria, umas 23h40.”',
    '“Alguém pode confirmar? Não. Eu estava sozinha.”',
    '“Na sexta ele me disse uma frase estranha: descobri que fui feito de idiota por anos. Achei que fosse sobre negócios.”'],
    obs: 'Destra. Ficou tensa quando o nome do chefe de segurança foi citado.' },
  { ato: 1, quem: 'Rafael Valadares', sub: 'filho · 13/09, 02h05', texto: [
    '“Pedi ajuda ao meu pai e ele negou, como sempre. Eu disse que ele ia se arrepender. Foi raiva, não ameaça.”',
    '“Fui para o terraço fumar e fiquei lá até ouvir os gritos. Sozinho, olhando o mar e mexendo no celular.”',
    '“Que tipo de ajuda? Financeira. Quanto? Isso não é da sua conta.”'],
    obs: 'CANHOTO (assinou com a mão esquerda). Muito alto. Hálito alcoólico.' },
  { ato: 1, quem: 'Otávio Sampaio', sub: 'sócio · 13/09, 09h30 · com advogado', texto: [
    '“Estava na biblioteca, numa ligação longa com um cliente de Hong Kong. Fuso horário, sabe como é.”',
    '“Saí às 23h15 porque tinha reunião cedo em São Paulo. Festas não são o meu ambiente.”',
    '“Investigação federal sobre contêineres? (O advogado orienta a não responder.)”'],
    obs: 'Destro. Checou o celular 11 vezes em 20 minutos.' },
  { ato: 1, quem: 'Dra. Lívia Moretti', sub: 'leiloeira · 13/09, 10h45', texto: [
    '“Às 22h50 o projetor falhou. Aproveitei a pausa para ir até o meu carro, no estacionamento, buscar o laudo original do lote 12. Voltei por volta das 23h05.”',
    '“Divergência com o Augusto? Uma questão técnica sobre a datação de uma tela. Coisa de colecionador.”',
    '“Retirar o lote 12? O contrato é com a minha galeria, não com ele. E a obra é autêntica.”'],
    obs: 'CANHOTA (assinou com a mão esquerda). Calma, quase ensaiada. O “laudo original” estava impecável, sem uma dobra.' },
  { ato: 1, quem: 'Joana Pires', sub: 'assistente · 13/09, 00h50', texto: [
    '“Fiquei o tempo todo na mesa de pagamentos dos arrematantes, inclusive no intervalo, que foi quando mais gente veio pagar.”',
    '“Fui ao escritório às 23h38 avisar que o lote 12 tinha sido vendido. Ele estava caído sobre a mesa.”',
    '“Os remédios? Era eu que montava a caixinha da semana.” Algum problema com a vítima? “Nada que importe agora.”'],
    obs: 'Destra. Baixa estatura. Chorou quase o tempo todo.' },
  { ato: 1, quem: 'Bento Ferraz', sub: 'segurança · 13/09, 01h15', texto: [
    '“Fiquei na sala de monitoramento das 22h40 até a confusão, olhando as câmeras. Não vi nada de anormal.”',
    '“Todas funcionavam, menos a da copa, a CAM-04. Pifou no começo do mês.”',
    '“Se vi a Dona Helena subir? (Pausa longa.) Não reparei.”'],
    obs: 'Destro. Ex-PM. Entregou pessoalmente o HD das câmeras às 03h00.' },
  { ato: 1, quem: 'Cecília Arruda', sub: 'convidada, 71 · testemunha', texto: [
    '“Às 22h44 ouvi o Augusto dizer à leiloeira, a ruiva: …ou segunda-feira eu conto tudo. E ela: você não teria coragem.”',
    '“Ele foi até o bar, pediu alguma coisa ao maître e sumiu pelo corredor dos fundos.”',
    '“A Helena não estava no salão no intervalo. E o segurança careca também tinha sumido.”'],
    obs: 'Lúcida, embora fale muito. Hospedada no Hotel Casa Grande.' },

  { ato: 2, quem: 'Sérgio Antunes', sub: 'maître do buffet', texto: [
    '“Às 22h46 o Dr. Augusto me pediu um conhaque no escritório, e rápido. Às 22h52 deixei a bandeja no passa-pratos da copa e gritei: Diogo, conhaque pro escritório do Dr. Augusto!”',
    '“Quando o Diogo foi buscar, às 22h55, a bandeja tinha sumido. Nenhum dos meus garçons levou.”',
    '“Regra da casa: bandeja SEMPRE na mão esquerda. A direita fica livre para servir e abrir portas.”'],
    obs: 'Quem estivesse perto da porta de serviço ouviu o pedido.' },
  { ato: 2, quem: 'Diogo Ramos', sub: 'garçom, 22', texto: [
    '“Umas 22h53 encontrei a moça do leilão, a ruiva, no corredor, perto do vestiário da equipe. Ela perguntou onde era o banheiro. Mostrei o lavabo de serviço.”',
    '“Achei esquisito: o banheiro dos convidados fica do outro lado da casa, e ela tinha usado mais cedo.”'],
    obs: 'Aparece na foto das 22h57 servindo no salão.' },
  { ato: 2, quem: 'Wesley Prado', sub: 'técnico de som e projeção', texto: [
    '“Não teve falha nenhuma. O cabo HDMI estava simplesmente solto do notebook dela.”',
    '“Quando fui reconectar, ela segurou meu braço: Deixa, Wesley. O pessoal precisa de uma pausa. E saiu pela porta de serviço.”'],
    obs: 'Ficou no palco durante todo o intervalo.' },
  { ato: 2, quem: 'Patrícia Souza', sub: 'garçonete, 26', texto: [
    '“Sou a única mulher da equipe e uso coque, mas fiquei no salão o intervalo inteiro. Sou destra e seguro bandeja na esquerda.”',
    '“O paletó reserva, o P-03, ficava pendurado no vestiário. É pequeno: ninguém da equipe cabia nele.”'],
    obs: 'Paletó M-12. Mede 1,64 m.' },

  { ato: 3, quem: 'Helena Valadares — 2ª oitiva', sub: '13/09, 19h30', texto: [
    '“Está bem, eu menti. Às 22h49 fui para a garagem encontrar o Bento. Ficamos lá até umas 23h10. Estamos juntos há oito meses.”',
    '“Sim, eu tinha motivo. Mas eu estava com ele. Era a primeira vez na vida que eu torcia para ser filmada.”'],
    obs: '' },
  { ato: 3, quem: 'Bento Ferraz — 2ª oitiva', sub: '13/09, 20h00', texto: [
    '“Ninguém estava olhando as câmeras ao vivo. Eu estava na garagem com a Helena.”',
    '“Lembrei de uma coisa: no dia 05/09, na visita técnica, a Dra. Lívia me perguntou duas vezes quais câmeras gravavam. Contei que a da copa estava quebrada.”'],
    obs: '' },
  { ato: 3, quem: 'Rafael Valadares — 2ª oitiva', sub: '13/09, 20h40', texto: [
    '“Devo 380 mil a um agiota, o Turco. Fiquei no terraço apostando no celular, tentando recuperar.”',
    '“Lá pelas 23h03, da ponta leste do terraço, vi a janelinha do lavabo de serviço abrir e alguém jogar uma coisa pequena no canteiro. Brilhou. Só vi um braço de MANGA BRANCA.”'],
    obs: 'Esse relato levou à busca no jardim e no lavabo (Auto AA-0913).' },
  { ato: 3, quem: 'Dra. Lívia Moretti — 2ª oitiva', sub: '14/09, 08h15 · com advogado', texto: [
    '“Admito que não fui ao carro. Tive uma crise de ansiedade e fiquei uns dez minutos no lavabo de serviço.”',
    '“Resolvido significava que o leilão seguiria. Só isso.”',
    '“Um paletó no forro do lavabo? (Silêncio de 40 segundos.) Não tenho mais nada a declarar.”'],
    obs: 'Antes de sair, perguntou a que horas era o voo do Sr. Otávio.' },
  { ato: 3, quem: 'Otávio Sampaio — 2ª oitiva', sub: '14/09, 09h00', texto: [
    '“Recebi aquela mensagem da Lívia e não entendi nada. Respondi perguntando.”',
    '“Fugi porque tive medo. Eu sabia que o Augusto ia falar com vocês. Mas eu cuidava de papel, de contêiner. Não disso.”'],
    obs: '' },
  { ato: 3, quem: 'Joana Pires — 2ª oitiva', sub: '14/09, 09h40', texto: [
    '“Ele me demitiu por e-mail no sábado: achava que eu vazava informações. Não era eu.”',
    '“Mesmo assim, na sexta ele me pediu: se acontecer qualquer coisa comigo, entregue o pen-drive do cofre ao Dr. Paiva. Entreguei no domingo, às 10h30.”'],
    obs: '' },
];

/* ============ PERITO ============ */
export const LOCAL_CRIME = {
  texto: [
    'Escritório na ala leste, térreo. Porta única para o corredor de serviço: fechada, mas destrancada. Janela para o mar travada por dentro.',
    'A escrivaninha fica de frente para a janela: quem está sentado fica DE COSTAS para a porta.',
    'Vítima sentada, tombada sobre a mesa, celular ao alcance da mão e nenhuma ligação feita. Vômito no tapete. Sem lesões, sem luta.',
    'Na mesa: taça de conhaque do buffet com ~5 mL de resíduo, catálogo aberto no lote 12 com “FALSO?” a lápis, notebook bloqueado. Na lixeira: bilhete amassado, legível só “Lote 12 — RETIRAR!”. Não havia bandeja no cômodo.',
  ],
};

export const AGENDA = [
  ['Seg 07/09', 'Spectra (laboratório) — enviar amostra da Marinha. Discreto!'],
  ['Qua 09/09', 'Manifestos MSKU… conferir com Otávio? NÃO. Sozinho.'],
  ['Sex 11/09', 'Ligar Paiva, confirmar segunda. Joana: pen-drive no cofre. Se algo acontecer…'],
  ['Sáb 12/09', 'Resultado Spectra (e-mail). LEILÃO 21h30. Falar com L. antes do lote 12!!!'],
  ['Seg 14/09', '09h — DIF — Dr. Paiva — DEPOIMENTO. Levar pen-drive.', true],
  ['Ter 15/09', '14h Dr. Brandão (família) — testamento / divórcio? Otávio → Lisboa??'],
  ['Dom 20/09', '“Quem cala, consente.” Não vou mais calar.'],
];

export const AUTOPSIA = [
  'Coração aumentado, compatível com a cardiopatia, mas SEM infarto agudo. Nenhuma marca de injeção.',
  'Digoxina no sangue: 11,4 ng/mL (o normal vai de 0,5 a 2,0; acima de 2,5 já é tóxico).',
  'No estômago: conhaque com açúcar e aroma cítrico, que não existem em conhaque puro.',
  'Causa da morte: arritmia por intoxicação aguda de DIGOXINA, entre 23h15 e 23h35. A dose foi ingerida misturada à bebida. Recomenda-se examinar a taça (EV-04).',
];

export const ANALISE_CAM03 = [
  'A pessoa de paletó branco equilibra a bandeja na mão DIREITA e gira a maçaneta com a ESQUERDA. É o contrário do treinamento do buffet.',
  'Estatura estimada: 1,63 m a 1,69 m (referência: porta de 2,10 m).',
  'Cabelo preso em coque baixo. A cor não aparece na imagem infravermelha.',
  'O rosto nunca aparece: a pessoa sabia onde estava a câmera. Ficou 2min48s no escritório. A vítima, de costas para a porta, não se virou.',
];

export const FOTOS = [
  ['22:44', 'Palco', 'Augusto fala no ouvido de Lívia. Ela segura o martelo com a mão ESQUERDA.'],
  ['22:46', 'Bar', 'Augusto fala com o maître e aponta para o corredor leste.'],
  ['22:51', 'Salão', 'Telão apagado. Wesley no palco, de mãos na cintura. Lívia não aparece.'],
  ['22:57', 'Salão', 'OS QUATRO GARÇONS do buffet servindo espumante, todos de paletó branco. Joana na mesa de pagamentos.'],
  ['22:58', 'Biblioteca', 'Pela porta de vidro: Otávio ao telefone, gesticulando.'],
  ['22:59', 'Terraço', 'Rafael fumando sozinho, olhando o celular.'],
  ['23:06', 'Palco', 'Lívia reconecta o cabo com a mão esquerda. Cabelo SOLTO, mas desarrumado “como quem acabou de desfazer um penteado”, diz o fotógrafo.'],
  ['23:31', 'Palco', 'Martelo batido no lote 12: “ARREMATADO — LICITANTE 88”.'],
];

export const BUFFET = [
  'Equipe de salão: o maître Sérgio e quatro garçons (Diogo, Patrícia, Marcelo e Kauã).',
  'Recibo da Trajes Real: 5 paletós brancos alugados (M-11, M-12, G-04, G-07 e o reserva P-03, tamanho P). Devolvidos: 4. O P-03 sumiu do vestiário durante a noite.',
];

export const AUTO_APREENSAO = [
  'Auto AA-0913, 13/09, 21h20, feito após o novo depoimento de Rafael.',
  'EV-07: paletó branco P-03, escondido dentro do forro removível do teto do lavabo de serviço. Mancha âmbar no punho direito.',
  'EV-08: frasco âmbar de 60 mL, vazio, com conta-gotas, no canteiro logo abaixo da janela do lavabo de serviço.',
  'Da janela desse lavabo se vê o jardim lateral e a janela iluminada da GARAGEM.',
];

export const CAMERAS = [
  { id: 'CAM-01', local: 'Hall de entrada, escada e porta lateral', ev: [
    ['19:40', 'Lívia chega cedo para montar o leilão, com uma bolsa grande de couro.'],
    ['22:49:30', 'Helena atravessa o hall e sai pela PORTA LATERAL, rumo à garagem. Não sobe a escada.', true],
    ['22:45–23:12', 'Ninguém sobe ou desce a escada. Ninguém sai pela porta principal (o único caminho até o estacionamento).', true],
    ['23:12:20', 'Helena volta pela porta lateral e sobe a escada às pressas.'],
    ['23:14:05', 'Otávio atravessa o hall apressado e sai pela porta principal.'],
  ]},
  { id: 'CAM-02', local: 'Salão do leilão', ev: [
    ['22:30', 'Discussão entre Augusto e Rafael perto do bar.'],
    ['22:36', 'Rafael sai para o terraço.'],
    ['22:41', 'Otávio vai para a biblioteca, ao telefone.'],
    ['22:46', 'Augusto fala com o maître e sai pelo corredor leste.'],
    ['22:50:05', 'Telão apaga. Lívia anuncia o intervalo na hora.', true],
    ['22:52:02', 'Lívia sai pela PORTA DE SERVIÇO, do lado da copa.', true],
    ['22:52–23:06', 'Joana fica na mesa de pagamentos. Wesley fica no palco.'],
    ['23:06:10', 'Lívia volta pela porta de serviço e reconecta o cabo.', true],
    ['23:13', 'Lívia digita no celular ao lado do palco.'],
    ['23:38', 'Joana vai em direção ao corredor leste. 23:39: gritos.'],
  ]},
  { id: 'CAM-03', local: 'Corredor de serviço (copa → escritório)', frames: true, ev: [
    ['22:47:10', 'Augusto entra no escritório e fecha a porta.'],
    ['22:58:14', 'Uma pessoa de paletó branco de garçom, vinda da copa, entra com bandeja e uma taça.', true],
    ['23:01:02', 'A mesma pessoa sai com o rosto coberto e volta para a copa / lavabo de serviço.', true],
    ['23:38:40', 'Joana entra. 23:39: sai correndo, gritando.'],
  ]},
  { id: 'CAM-04', local: 'Copa / cozinha', off: true, ev: [
    ['03/09', 'SEM SINAL desde 03/09 (falha na fonte). Chamado aberto por Bento. Conserto marcado para 15/09.', true],
  ]},
  { id: 'CAM-05', local: 'Garagem', ev: [
    ['22:50:40', 'Helena entra pelo caminho lateral.', true],
    ['22:52:10', 'Bento entra pela porta da sala de monitoramento.', true],
    ['22:52–23:11', 'Os dois ficam juntos ao lado da Hilux. Conversa e contato físico.'],
    ['23:11:30', 'Helena sai. 23:13: Bento volta para a sala de monitoramento.'],
  ]},
];

export const EVIDENCIAS = [
  { id: 'EV-01', ato: 1, nome: 'Sangue e vísceras', custo: 0, req: 'autopsia', res: 'Ver o laudo de necropsia na aba Cena. Digoxina 11,4 ng/mL: dose letal.' },
  { id: 'EV-02', ato: 1, nome: 'Porta-comprimidos semanal', custo: 1, res: 'Só o compartimento de sábado está vazio (dose da manhã tomada). Comprimidos íntegros, sem troca nem adulteração. NÃO é a fonte do veneno.' },
  { id: 'EV-03', ato: 1, nome: 'Decanter de conhaque do bar', custo: 1, res: 'Negativo para digoxina. Vários convidados beberam dele. O veneno foi posto DEPOIS que a dose foi servida.' },
  { id: 'EV-04', ato: 1, nome: 'Taça de conhaque', custo: 1, res: 'Conhaque + digoxina altíssima + açúcar, ácido cítrico e aroma de limão: os ingredientes do DIGOXINA ELIXIR PEDIÁTRICO 0,05 mg/mL, um xarope. Comprimidos deixariam amido e talco, que não foram encontrados.', alerta: ['Veneno em xarope', 'A digoxina não veio da caixinha de remédios. Era ELIXIR, a versão líquida. Alguém trouxe o frasco de fora.'] },
  { id: 'EV-05', ato: 1, nome: 'Bilhete amassado', custo: 1, res: 'Letra da própria vítima. Com luz infravermelha: “Lote 12 — RETIRAR! Spectra: ftalocianina (1935+). L.M. sabia desde o início? → Paiva, seg., levar tudo.”' },
  { id: 'EV-10', ato: 1, nome: 'Cabo HDMI do projetor', custo: 1, res: 'Cabo perfeito, sem defeito. Digitais no conector: Lívia (polegar e indicador ESQUERDOS) e Wesley. Desconexão manual: não houve falha técnica.' },
  { id: 'EV-06', ato: 2, nome: 'Notebook da vítima', custo: 1, res: 'Rascunho NÃO enviado, 22h40, para o Dr. Paiva: “Já sei quem é a Perita. Você não vai acreditar: está aqui, dentro da minha casa, hoje à noite.” Também: laudo Spectra (pigmento azul de ftalocianina na camada original da pintura).', alerta: ['“Está aqui, dentro da minha casa”', 'Sete minutos antes de entrar no escritório, Augusto escreveu que a “Perita” do esquema estava na festa.'] },
  { id: 'EV-09', ato: 2, nome: 'Celular da vítima', custo: 1, res: 'Última mensagem, 22h49, para Lívia: “O lote 12 está FORA. Não discuta. Estou no escritório e não quero ser incomodado.” Resposta às 22h50: “Entendido.”' },
  { id: 'EV-07', ato: 3, nome: 'Paletó P-03 (forro do lavabo)', custo: 1, res: 'Punho direito com conhaque e digoxina. Bolso interno ESQUERDO com resíduo de elixir. Na gola: um fio de cabelo RUIVO natural, de 31 cm e com bulbo (dá para extrair DNA), e um grampo dourado de prender coque.', alerta: ['O garçom era ruivo', 'Nenhum dos garçons do buffet é ruivo. O DNA do fio pode ser confrontado no laboratório.'] },
  { id: 'EV-08', ato: 3, nome: 'Frasco do jardim', custo: 1, res: 'Rótulo rasgado: “DIGOX… ELIXIR PEDIÁT… 0,05 mg/mL — LOTE 2B4471”. Pedaço da etiqueta da farmácia: “…ida Nova — Guaru…”. A digital no fundo tem só 7 pontos, insuficiente para identificar alguém.' },
];

/* ============ ANALISTA ============ */
export const PESSOAS = [
  { id: 'helena', nome: 'Helena Valadares', alt: '1,72 m', cab: 'loiro', info: 'Casada desde 2018, separação total de bens. Mercedes HVK-7A01. Tel. (13) 99714-2280.' },
  { id: 'rafael', nome: 'Rafael Valadares', alt: '1,86 m', cab: 'castanho', info: 'BMW alienada com 4 parcelas atrasadas. TCO por jogo de azar (2024). 6 protestos (R$ 112 mil). Tel. (11) 98820-4417.' },
  { id: 'otavio', nome: 'Otávio Sampaio', alt: '1,78 m', cab: 'grisalho', info: 'Porsche FGR-2B19. Reserva TAP para Lisboa. Registro vinculado à Operação Maré Vermelha (acesso restrito). Tel. (13) 99102-5566.' },
  { id: 'livia', nome: 'Lívia Moretti', alt: '1,66 m', cab: 'ruivo natural', info: 'Perita judicial em arte desde 2011. Audi RLM-4E22. Filha de Maria Moretti. Hospedada no Hotel Casa Grande, quarto 214. Tel. (11) 97441-0931.' },
  { id: 'joana', nome: 'Joana Pires', alt: '1,60 m', cab: 'preto', info: 'Compra e organiza os remédios da vítima. Onix JPS-0E14. Tel. (13) 98133-7702.' },
  { id: 'bento', nome: 'Bento Ferraz', alt: '1,81 m', cab: 'careca', info: 'Ex-PM, desligado em 2021. Administra as câmeras da casa. Tel. (13) 99655-0148.' },
  { id: 'augusto', nome: 'Augusto Valadares (vítima)', alt: '1,75 m', cab: 'grisalho', info: 'Cardiopata, paciente do Dr. Fábio Lacerda. Registro vinculado a investigação sigilosa.' },
  { id: 'maria', nome: 'Maria Moretti', alt: '1,60 m', cab: '—', info: 'Mãe de Lívia. Cardiopata, paciente do Dr. Lacerda. Situação: ver Registro Civil.' },
  { id: 'lacerda', nome: 'Dr. Fábio Lacerda', alt: '1,77 m', cab: 'grisalho', info: 'Cardiologista, CRM-SP 88.214. Declarou NÃO ter emitido nenhuma receita para Maria Moretti depois que ela morreu. Disse que talões antigos, já assinados, “ficaram com a família”.' },
  { id: 'patricia', nome: 'Patrícia Souza', alt: '1,64 m', cab: 'castanho, coque', info: 'Garçonete. Aparece na foto das 22h57. Destra.' },
  { id: 'diogo', nome: 'Diogo Ramos', alt: '1,79 m', cab: 'preto', info: 'Garçom. Aparece na foto das 22h57.' },
  { id: 'cecilia', nome: 'Cecília Arruda', alt: '1,58 m', cab: 'branco', info: 'Convidada. Hotel Casa Grande, quarto 108. Não tem smartphone: usa celular de teclas.' },
  { id: 'turco', nome: 'Edson Haddad, o “Turco”', alt: '1,74 m', cab: 'preto', info: 'Condenado por usura e extorsão (2015). Não esteve na casa.' },
  { id: 'ocean', nome: 'Ocean Arts Ltd (offshore)', alt: '—', cab: '—', info: 'Empresa das Ilhas Virgens Britânicas. Foi o LICITANTE 88 que arrematou o lote 12, e o cadastro foi feito pela própria Galeria Moretti.' },
];

export const VEICULOS = [
  { placa: 'RLM-4E22', carro: 'Audi A4 vermelho · Lívia Moretti', ev: [['19:38', 'Estaciona na vaga 9.'], ['19:40–01:30', 'NINGUÉM se aproxima do carro.', true]] },
  { placa: 'FGR-2B19', carro: 'Porsche Cayenne · Otávio Sampaio', ev: [['21:12', 'Estaciona na vaga 2.'], ['23:15:40', 'Sai pelo portão em alta velocidade.', true]] },
  { placa: 'RFV-1J97', carro: 'BMW 320i · Rafael Valadares', ev: [['20:20', 'Vaga 14. Sem movimento até 02:00.']] },
  { placa: 'JPS-0E14', carro: 'Onix · Joana Pires', ev: [['17:30', 'Portão de serviço. Sem movimento até 03:10.']] },
];

export const ESTACIONAMENTO = [
  ['19:38', 'Audi de Lívia estaciona (vaga 9).'],
  ['21:12', 'Porsche de Otávio estaciona (vaga 2).'],
  ['22:40–23:14', 'NENHUMA PESSOA registrada no estacionamento. Zero.', true],
  ['23:14:30', 'Otávio caminha até o Porsche.'],
];

export const CIVIL = [
  { nome: 'Maria Moretti', tipo: 'ÓBITO', txt: 'Falecida em 17/03/2025, em São Paulo. Insuficiência cardíaca. Declarante: Lívia Moretti (filha).', chave: 'maria' },
  { nome: 'Augusto Valadares', tipo: 'ÓBITO', txt: 'Falecido em 13/09/2026, 00h05, Guarujá. Causa em apuração.' },
  { nome: 'Augusto Valadares × Helena Krüger', tipo: 'CASAMENTO', txt: '14/04/2018. Separação total de bens: no divórcio, nada é dividido.' },
  { nome: 'Giuseppe Moretti', tipo: 'ÓBITO', txt: 'Pai de Lívia. Restaurador de obras de arte. Falecido em 2001.' },
];

export const TELEFONIA = {
  helena: [['22:47', 'SMS para Bento', '“Garagem. 5 min.”'], ['22:48', 'SMS de Bento', '“Indo.”']],
  rafael: [['22:38', 'SMS de E. Haddad', '“Sexta é o prazo. Depois disso não respondo pelos meus rapazes.”'], ['22:37–23:24', 'Dados móveis', 'App BetMar sem interrupção, antena do lado do terraço.']],
  otavio: [['22:41–23:12', 'Ligação', '+852 Hong Kong (Golden Tide Trading), 31 min contínuos.'], ['23:13', 'SMS de Lívia', '“Resolvido. O 12 segue. Saia agora, sem despedidas.”', true], ['23:14', 'SMS para Lívia', '“Resolvido COMO??”', true], ['23:58', 'SMS para Lívia', '“O que você fez?” (sem resposta)', true]],
  livia: [['05/09 14:10', 'Ligação para Bento', '6 min (a “visita técnica”).'], ['22:49', 'SMS de Augusto', '“O lote 12 está FORA. Estou no escritório e não quero ser incomodado.”'], ['22:50', 'SMS para Augusto', '“Entendido.”'], ['23:13', 'SMS para Otávio', '“Resolvido. O 12 segue. Saia agora, sem despedidas.”', true]],
  joana: [['16:14', 'Ligação para a irmã', '18 min.'], ['23:40', 'Ligação para o 192', 'SAMU, 2 min.']],
  bento: [['05/09 14:10', 'Ligação de Lívia', '6 min.'], ['22:48', 'SMS para Helena', '“Indo.”']],
};

export const FINANCEIRO = {
  helena: [['22/08', 'Pousada em Ilhabela, 2 hóspedes', '− R$ 2.340']],
  rafael: [['01/09', 'Pix de E. Haddad (“empréstimo”)', '+ R$ 200.000'], ['12/09 23:04', 'Pix para BetMar', '− R$ 8.000'], ['13/09', 'Saldo', '− R$ 41.230']],
  otavio: [['20/08', 'Golden Tide Trading (Hong Kong)', '+ R$ 2.100.000'], ['25/08', 'Ocean Arts Ltd (BVI)', '− R$ 1.400.000'], ['10/09', 'TAP: São Paulo → Lisboa, 15/09', '− R$ 9.870']],
  livia: [['28/08', 'Ocean Arts Ltd (BVI): “consultoria”', '+ R$ 850.000', true], ['03/09', 'Drogaria São Lucas, Santos', '− R$ 41,90'], ['08/09', 'Drogaria Vida Nova, Guarujá', '− R$ 41,90'], ['11/09', 'Hotel Casa Grande, quarto 214', '− R$ 2.980']],
  joana: [['01/09', 'Drogaria Atlântica (remédios do patrão)', '− R$ 96,40']],
  bento: [['02/09 e 09/09', 'Saques', '− R$ 3.000']],
};

export const FARMACIAS = [
  { data: '01/09', farmacia: 'Drogaria Atlântica, Guarujá', med: 'Digoxina 0,25 mg — comprimidos', paciente: 'Augusto Valadares', comprador: 'Joana Pires', lote: '7K2210' },
  { data: '03/09', farmacia: 'Drogaria São Lucas, Santos', med: 'Digoxina ELIXIR pediátrico 60 mL', paciente: 'Maria Moretti', comprador: 'Lívia Moretti', lote: '2B4398', foco: true },
  { data: '05/09', farmacia: 'Farmácia Central, Santos', med: 'Digoxina 0,25 mg — comprimidos', paciente: 'João Carlos Mendes', comprador: 'o próprio', lote: '7K2210' },
  { data: '08/09', farmacia: 'Drogaria Vida Nova, Guarujá', med: 'Digoxina ELIXIR pediátrico 60 mL', paciente: 'Maria Moretti', comprador: 'Lívia Moretti', lote: '2B4471', foco: true },
  { data: '10/09', farmacia: 'Drogaria São Lucas, Santos', med: 'Digoxina ELIXIR pediátrico 60 mL', paciente: 'Irene Takahashi (2 anos)', comprador: 'o pai, Hugo', lote: '2B4502' },
];

export const TELEMATICA = [
  'Denúncia anônima recebida em 13/09, às 02h14, de um e-mail descartável.',
  'Origem: Wi-Fi de hóspedes do HOTEL CASA GRANDE, no Guarujá. Aparelho: iPhone.',
  'Conectados naquele horário: quarto 214 (iPhone de Lívia Moretti), quarto 305 (hóspede sem relação com o caso, notebook) e a recepção.',
  'Cecília Arruda (quarto 108) não tinha aparelho conectado: ela nem tem smartphone.',
];

export const JORNAL = {
  manchete: 'Empresário Augusto Valadares morre durante leilão beneficente na própria mansão',
  texto: 'O presidente da Valadares Logística Portuária foi encontrado sem vida no escritório. A tela “Marinha ao Entardecer” foi arrematada por R$ 4,6 milhões por um comprador anônimo, pelo telefone. Pela manhã, agentes federais recolheram material na casa.',
  box: 'OPERAÇÃO MARÉ VERMELHA: desde março, uma investigação federal sigilosa apura a saída de obras de arte roubadas em contêineres pelo Porto de Santos e a entrada de falsificações com certificado. O esquema dependeria de alguém na logística do porto, um financiador no exterior e um especialista capaz de emitir certificados convincentes.',
};

export const DENUNCIA = '“Vocês estão perdendo tempo. Investiguem a esposa e o segurança. No intervalo eles estavam juntos na garagem: eu vi. Ela queria o dinheiro, ele queria ela. — Alguém que viu”';

export const EMAILS = [
  ['19:02 · Augusto → Lívia', '“Chegou o laudo da Spectra. AZUL DE FTALOCIANINA numa tela de 1931? Esse pigmento só existe a partir de 1935. Você assinou o certificado. Retire o lote 12 hoje, ou retiro eu, na frente de todos. E segunda-feira vou contar tudo. Inclusive sobre os contêineres.”'],
  ['19:31 · Lívia → Augusto', '“Laboratórios erram. Não tome nenhuma decisão antes de conversarmos hoje à noite. Você não sabe com quem está lidando.”'],
  ['16:12 · Augusto → Joana', '“Alguém está passando informações da empresa para fora. Até eu saber quem, prefiro que você não volte na segunda.”'],
];

export const SENHA_INTEL = '14092026';
export const INTEL = [
  'Colaborador: codinome GAIVOTA = Augusto Valadares, desde junho. Recusou proteção em 09/09.',
  'Engrenagem 1, logística: Otávio Sampaio adultera manifestos de contêineres.',
  'Engrenagem 2, dinheiro: Golden Tide (Hong Kong) e Ocean Arts (Ilhas Virgens).',
  'Engrenagem 3, “A PERITA”: emite certificados falsos. O nome seria revelado por GAIVOTA na segunda.',
  'Pen-drive entregue por Joana: 14 contêineres de obras desviadas e 9 certificados falsos ASSINADOS POR LÍVIA MORETTI, incluindo o da “Marinha ao Entardecer”.',
  'Áudio de Otávio, 08/09: “Eu só cuido dos papéis. Quem decide o que é verdadeiro é ela.”',
  'Nota de Augusto: “A Marinha nunca existiu. Foi inventada para ser comprada pela própria quadrilha no leilão de caridade.”',
];

/* ============ DESCOBERTAS (objetivos em comum) ============ */
export const DESCOBERTAS = [
  { id: 'D1', ato: 1, titulo: 'A esposa mentiu?', pista: 'perito',
    pergunta: 'Helena diz que subiu ao quarto às 22h45. A que horas ela atravessou o hall rumo à garagem? (HHMM)',
    respostas: ['2249', '22:49', '22h49'], dica: 'Perito → Câmeras → CAM-01.',
    news: { kicker: 'ÁLIBI DERRUBADO', manchete: 'Viúva mentiu à polícia', sub: 'Câmera mostra Helena Valadares saindo rumo à garagem quando dizia estar no quarto.' } },
  { id: 'D2', ato: 1, titulo: 'Foi mesmo ao carro?', pista: 'analista',
    pergunta: 'Lívia diz que foi ao carro no intervalo. Quantas pessoas o estacionamento registrou entre 22h40 e 23h14?',
    respostas: ['0', 'zero', 'nenhuma', 'ninguem'], dica: 'Analista → Pessoas → Veículos e estacionamento.',
    news: { kicker: 'VERSÃO DESMENTIDA', manchete: 'Leiloeira não foi ao carro', sub: 'Estacionamento ficou vazio durante todo o intervalo. Onde estava Lívia Moretti?' } },
  { id: 'D3', ato: 1, titulo: 'Do que ele morreu?', pista: 'perito', requer: ['D1', 'D2'],
    pergunta: 'O laudo do IML chegou. Qual substância matou Augusto?',
    respostas: ['digoxina'], dica: 'Perito → Cena → Laudo de necropsia.',
    news: { kicker: 'URGENTE', manchete: 'Não foi o coração: empresário foi envenenado', sub: 'Laudo aponta dose letal de digoxina. Justiça autoriza a quebra de sigilos dos seis suspeitos.' },
    libera: { perito: 'Chegaram fotos do evento, documentos do buffet, novas testemunhas e a análise da CAM-03.', analista: 'O mandado chegou: Telefones, Contas e Farmácias liberados na aba Sigilo.' } },

  { id: 'D4', ato: 2, titulo: 'O garçom fantasma', pista: 'perito',
    pergunta: 'Às 22h58 um “garçom” levou o conhaque. Quantos garçons do buffet aparecem no salão na foto das 22h57?',
    respostas: ['4', 'quatro'], dica: 'Perito → Câmeras → Fotos do evento.',
    news: { kicker: 'MISTÉRIO NA MANSÃO', manchete: 'O garçom que não trabalhava no buffet', sub: 'Os quatro garçons estavam no salão quando uma quinta pessoa de paletó branco levou o conhaque.' } },
  { id: 'D5', ato: 2, titulo: 'Alto demais', pista: 'ambos',
    pergunta: 'Dois suspeitos são canhotos. Qual a altura do canhoto que NÃO cabe no perfil do garçom? (ex.: 1,75)',
    respostas: ['186', '1,86', '1.86', '1,86m', '186cm'], dica: 'Canhotos: depoimentos (aba Caso). Perfil do garçom: Perito → Cena. Alturas: Analista → Pessoas.',
    news: { kicker: 'PERFIL TRAÇADO', manchete: 'Filho é alto demais para ser o garçom', sub: 'Rafael mede 1,86 metro. Quem entrou no escritório tinha cerca de 1,66 metro e era canhoto.' } },
  { id: 'D6', ato: 2, titulo: 'Que veneno era?', pista: 'perito',
    pergunta: 'Em que forma estava a digoxina da taça? (uma palavra)',
    respostas: ['elixir', 'xarope'], dica: 'Perito → Laboratório → EV-04 (taça).',
    news: { kicker: 'LABORATÓRIO', manchete: 'Veneno estava num xarope infantil', sub: 'Era digoxina em elixir pediátrico, e não os comprimidos que a vítima tomava.' } },
  { id: 'D7', ato: 2, titulo: 'Quem comprou o elixir?', pista: 'analista',
    pergunta: 'O elixir foi comprado em nome de qual paciente? Digite o ANO em que essa paciente morreu.',
    respostas: ['2025'], dica: 'Analista → Sigilo → Farmácias. Depois → Pessoas → Registro civil.',
    news: { kicker: 'REVIRAVOLTA', manchete: 'Morta há 18 meses “comprou” o veneno', sub: 'Receitas em nome de Maria Moretti, falecida em 2025. A compradora: a própria filha.' } },
  { id: 'D8', ato: 2, titulo: 'A mensagem das 23h13', pista: 'analista',
    pergunta: 'Que palavra Lívia mandou para Otávio às 23h13, enquanto Augusto morria?',
    respostas: ['resolvido', 'resolvido.'], dica: 'Analista → Sigilo → Telefones → Otávio ou Lívia.',
    news: { kicker: 'PLANTÃO', manchete: '“Resolvido.” Sócio foge e antecipa voo para Lisboa', sub: 'Otávio Sampaio remarca o embarque para hoje, 22h. Cúmplice ou apenas assustado?' },
    libera: { perito: 'Auto de Apreensão AA-0913: um paletó e um frasco chegaram ao laboratório.', analista: 'Novidades no Arquivo: denúncia anônima e e-mails da vítima. Telemática liberada.' } },

  { id: 'D9', ato: 3, titulo: 'O frasco do jardim', pista: 'ambos',
    pergunta: 'O frasco achado no jardim foi comprado em que dia de setembro? (DD)',
    respostas: ['8', '08', '08/09', '8/9'], dica: 'Lote do frasco: Perito → Laboratório → EV-08. Data do lote: Analista → Sigilo → Farmácias.',
    news: { kicker: 'PROVA MATERIAL', manchete: 'Frasco do jardim foi comprado em 8 de setembro', sub: 'O lote 2B4471 bate com uma compra na Drogaria Vida Nova, quatro dias antes do leilão.' } },
  { id: 'D10', ato: 3, titulo: 'Quem mandou a denúncia?', pista: 'analista',
    pergunta: 'De qual quarto de hotel saiu a denúncia anônima contra Helena e Bento?',
    respostas: ['214'], dica: 'Analista → Sigilo → Telemática.',
    news: { kicker: 'CONTRAGOLPE', manchete: 'Denúncia anônima saiu do quarto 214', sub: 'A mensagem que acusava a viúva e o segurança veio do hotel onde a leiloeira estava hospedada.' } },
  { id: 'D11', ato: 3, titulo: 'O informante', pista: 'ambos',
    pergunta: 'Abram o arquivo secreto da Operação Maré Vermelha. Qual era o codinome do informante?',
    respostas: ['gaivota'], dica: 'A senha é a data do depoimento (DDMMAAAA), anotada na agenda: Perito → Cena. O arquivo fica com o Analista → Arquivo.',
    news: { kicker: 'EXCLUSIVO', manchete: 'Vítima era o informante secreto “Gaivota”', sub: 'Augusto revelaria na segunda-feira o nome da “Perita” do esquema de contrabando de arte.' } },
];

export const FINAL = {
  noticias: {
    certo: { id: 'fim-certo', titulo: 'Caso encerrado', news: { kicker: 'CASO ENCERRADO', manchete: 'Leiloeira é presa a quatro horas do voo para Lisboa', sub: 'Lívia Moretti, a “Perita” do esquema de contrabando, é indiciada pelo envenenamento de Augusto Valadares.' } },
    errado: { id: 'fim-errado', titulo: 'Caso encerrado', news: { kicker: 'ERRO HISTÓRICO', manchete: 'Polícia prende a pessoa errada', sub: 'Enquanto isso, a verdadeira culpada pega um táxi para o aeroporto.' } },
  },
  perguntas: [
    { k: 'autor', t: 'Quem matou Augusto Valadares?', o: SUSPEITOS.map(s => [s.id, s.nome]), a: 'livia', p: 30 },
    { k: 'meio', t: 'Como?', o: [
      ['a', 'Trocou os comprimidos da caixinha semanal'],
      ['b', 'Pôs digoxina em xarope no conhaque e o entregou disfarçada de garçom'],
      ['c', 'Envenenou o decanter do bar'],
      ['d', 'Aplicou uma injeção durante a discussão']], a: 'b', p: 15 },
    { k: 'motivo', t: 'Por quê?', o: [
      ['a', 'Herança e fim do casamento'],
      ['b', 'Dívidas de jogo'],
      ['c', 'Impedir que a falsificação do lote 12 e o esquema de contrabando fossem denunciados'],
      ['d', 'Vingança pela demissão']], a: 'c', p: 15 },
    { k: 'coautor', t: 'Otávio foi coautor do HOMICÍDIO?', o: [
      ['sim', 'Sim, planejou junto'],
      ['nao', 'Não: participava do contrabando, mas não sabia do assassinato']], a: 'nao', p: 10 },
  ],
  verdade: [
    'Lívia Moretti era “a Perita” da Operação Maré Vermelha: assinava certificados falsos para obras desviadas pelo porto. A “Marinha ao Entardecer” nunca existiu. Foi pintada por encomenda para ser comprada pela própria quadrilha (Ocean Arts, o licitante 88) e lavar R$ 4,6 milhões num leilão de caridade.',
    'Desconfiada de Augusto, ela comprou digoxina em xarope nos dias 03 e 08/09, com talões antigos de receita da mãe, morta em 2025. Na “visita técnica” de 05/09, descobriu que a câmera da copa estava quebrada.',
    'Às 19h02 do sábado, o e-mail sobre o pigmento selou tudo. Às 22h50 ela soltou o cabo do projetor, inventou a falha e saiu pela porta de serviço. Ouviu o maître gritar “conhaque pro escritório”, vestiu o paletó reserva P-03, prendeu o cabelo num coque e despejou o frasco na taça.',
    'Às 22h58 entrou de costas para a câmera, canhota: maçaneta com a esquerda, bandeja na direita. Augusto, de costas para a porta, nem se virou. No lavabo, escondeu o paletó no forro e jogou o frasco pela janela, que é a mesma janela de onde viu Helena e Bento na garagem.',
    'Às 23h13 avisou Otávio: “Resolvido”. Ele não sabia de nada e fugiu de medo. Às 02h14, do quarto 214, ela tentou incriminar o casal com uma denúncia anônima e entregou a única janela de onde poderia ter visto a garagem.',
  ],
  confissao: '“Vinte anos dizendo a ricos o que era verdadeiro, e eles pagando para acreditar. Eu só levei um conhaque. Ele nem se virou para agradecer.”',
};
