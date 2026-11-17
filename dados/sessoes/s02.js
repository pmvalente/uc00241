SESSOES[2] = {
  objetivos: [
    ['Explicar', 'porque se dividem as redes em camadas'],
    ['Identificar', 'as 7 camadas do modelo OSI, a função e a PDU de cada uma'],
    ['Associar', 'equipamentos e protocolos à camada certa'],
    ['Descrever', 'o encapsulamento e o desencapsulamento dos dados']
  ],
  plano: [['10′', 'Porquê camadas?'], ['30′', 'As 7 camadas'], ['10′', 'Quiz'], ['25′', 'Encapsulamento'], ['15′', 'Classificar + resumo']],
  blocos: [
    {
      tipo: 'cartoes', titulo: 'Porquê dividir a rede em camadas?',
      intro: 'Enviar uma mensagem do teu PC para um servidor do outro lado do mundo é um problema enorme. A solução dos engenheiros foi <b>partir o problema em partes mais pequenas</b>, cada uma resolvida por uma camada.',
      itens: [
        { icone: '🧩', titulo: 'Dividir para simplificar', texto: 'Cada camada resolve um só problema e só fala com as camadas vizinhas.' },
        { icone: '🤝', titulo: 'Interoperabilidade', texto: 'Um PC Dell, um router Cisco e um telemóvel Samsung entendem-se porque seguem as mesmas camadas e normas.' },
        { icone: '🔍', titulo: 'Diagnóstico', texto: 'Quando algo falha, vais camada a camada: o cabo está ligado? Há IP? O serviço responde?' },
        { icone: '🔄', titulo: 'Evolução', texto: 'Podes trocar uma camada (ex.: cabo → Wi-Fi) sem mudar as outras.' }
      ]
    },
    {
      tipo: 'nota', estilo: 'dica',
      html: '<p><b>Analogia do correio:</b> escreves uma carta (aplicação), metes num envelope com morada (rede) e o carteiro leva-a por estradas (física). Tu não precisas de saber o caminho do camião e o carteiro não lê a tua carta. Cada um faz a sua parte.</p>'
    },
    {
      tipo: 'widget', titulo: 'O modelo OSI: 7 camadas', nome: 'osi',
      intro: 'O <b>modelo OSI</b> (<i>Open Systems Interconnection</i>) foi criado pela ISO. É um <b>modelo de referência</b>: serve para estudar e diagnosticar redes. Lê-se de cima (7, perto do utilizador) para baixo (1, o cabo). Clica em cada camada.'
    },
    {
      tipo: 'tabela', titulo: 'Resumo das camadas OSI',
      cab: ['#', 'Camada', 'PDU', 'Endereço / identificação', 'Equipamentos', 'Exemplos'],
      linhas: [
        ['7', 'Aplicação', 'Dados', 'Nomes (www.escola.pt)', '—', 'HTTP, FTP, SMTP, DNS'],
        ['6', 'Apresentação', 'Dados', '—', '—', 'TLS, JPEG, UTF-8'],
        ['5', 'Sessão', 'Dados', '—', '—', 'Abrir/fechar sessões'],
        ['4', 'Transporte', 'Segmento / Datagrama', '<b>Porta</b> (80, 443…)', 'Firewall', 'TCP, UDP'],
        ['3', 'Rede', 'Pacote', '<b>Endereço IP</b>', '<b>Router</b>', 'IP, ICMP'],
        ['2', 'Ligação de dados', 'Trama', '<b>Endereço MAC</b>', '<b>Switch</b>, AP, placa de rede', 'Ethernet, Wi-Fi'],
        ['1', 'Física', 'Bits', '—', 'Cabo, hub, repetidor', 'UTP, fibra, rádio']
      ],
      depois: `<div class="nota dica"><span class="ic">🧠</span><div><b>Para decorar (da 1 para a 7):</b> <b>F</b>ísica, <b>L</b>igação, <b>R</b>ede, <b>T</b>ransporte, <b>S</b>essão, <b>A</b>presentação, <b>A</b>plicação →<br>"<b>F</b>ui <b>L</b>á, <b>R</b>ui, <b>T</b>razer <b>S</b>opa <b>À</b> <b>A</b>vó". Em inglês, da 7 para a 1: "<i>All People Seem To Need Data Processing</i>".</div></div>`
    },
    {
      tipo: 'quiz', id: 's02-q1', titulo: 'As 7 camadas',
      perguntas: [
        { t: 'ordenar', p: 'Põe as camadas OSI por ordem, da <b>1</b> (em cima) para a <b>7</b> (em baixo).', itens: ['Física', 'Ligação de dados', 'Rede', 'Transporte', 'Sessão', 'Apresentação', 'Aplicação'], exp: 'Fui Lá, Rui, Trazer Sopa À Avó!' },
        { t: 'mc', p: 'Em que camada se usam os <b>endereços IP</b>?', op: ['3 · Rede', '2 · Ligação de dados', '4 · Transporte', '7 · Aplicação'], c: 0, exp: 'Camada 3: endereçamento lógico e encaminhamento entre redes.' },
        { t: 'mc', p: 'Qual é a PDU da camada 2?', op: ['Trama', 'Pacote', 'Segmento', 'Bits'], c: 0, exp: 'Camada 2: trama (<i>frame</i>). Camada 3: pacote. Camada 4: segmento. Camada 1: bits.' },
        { t: 'mc', p: 'Que camada usa <b>portas</b> para saber a que aplicação entregar os dados?', op: ['Transporte', 'Rede', 'Sessão', 'Física'], c: 0, exp: 'As portas (80, 443, 53…) são da camada 4, com TCP ou UDP.' },
        { t: 'vf', p: 'A cifragem dos dados (por exemplo, com TLS) é associada à camada de Apresentação.', c: true, exp: 'A camada 6 trata do formato dos dados: codificação, compressão e cifragem.' }
      ]
    },
    {
      tipo: 'widget', titulo: 'Encapsulamento: a viagem dos dados', nome: 'encapsulamento',
      intro: 'Quando envias dados, cada camada <b>junta o seu cabeçalho</b>, como quem mete uma carta num envelope, depois numa caixa, depois num camião. No destino faz-se o contrário (<b>desencapsulamento</b>). Usa ▶ ou o modo automático.'
    },
    {
      tipo: 'secao', titulo: 'O que juntou cada camada?',
      html: `<ul>
        <li><b>Transporte</b> juntou as <b>portas</b> de origem e de destino → <b>segmento</b>.</li>
        <li><b>Rede</b> juntou os <b>endereços IP</b> de origem e de destino → <b>pacote</b>.</li>
        <li><b>Ligação de dados</b> juntou os <b>endereços MAC</b> e o <b>FCS</b> (código de deteção de erros) → <b>trama</b>.</li>
        <li><b>Física</b> transformou tudo em <b>bits</b>.</li>
      </ul>
      <p>Repara: o <b>MAC muda em cada salto</b> (de router em router), mas o <b>IP de origem e destino mantém-se</b> do princípio ao fim.</p>`
    },
    {
      tipo: 'quiz', id: 's02-q2', titulo: 'Em que camada está?',
      intro: 'Exercício da apresentação, agora em versão de arrastar.',
      perguntas: [
        { t: 'classificar', p: 'Arruma cada elemento na camada OSI certa.', categorias: ['1 · Física', '2 · Ligação', '3 · Rede', '4 · Transporte', '6 · Apresentação', '7 · Aplicação'], itens: [{ txt: 'Cabo UTP', cat: '1 · Física' }, { txt: 'Switch', cat: '2 · Ligação' }, { txt: 'Endereço MAC', cat: '2 · Ligação' }, { txt: 'Router', cat: '3 · Rede' }, { txt: 'Endereço IP', cat: '3 · Rede' }, { txt: 'TCP', cat: '4 · Transporte' }, { txt: 'TLS', cat: '6 · Apresentação' }, { txt: 'HTTP', cat: '7 · Aplicação' }], exp: 'Truque: se trabalha com MAC é da camada 2; com IP, da 3; com portas, da 4.' },
        { t: 'ordenar', p: 'Ordena as PDUs pela ordem do <b>encapsulamento</b> (do que o utilizador cria até ao que vai no cabo).', itens: ['Dados', 'Segmento', 'Pacote', 'Trama', 'Bits'], exp: 'Dados → Segmento → Pacote → Trama → Bits.' },
        { t: 'mc', p: 'Um pacote passa por 3 routers até ao destino. O que se <b>mantém igual</b> durante todo o caminho?', op: ['Os endereços IP de origem e destino', 'Os endereços MAC de origem e destino', 'O FCS', 'Tudo muda em cada salto'], c: 0, exp: 'O IP é "a morada final". O MAC só serve para o salto seguinte, por isso é trocado em cada router.' }
      ]
    },
    {
      tipo: 'desafio', id: 's02-d1', titulo: 'Explica à tua avó', xp: 25,
      html: '<p>Escreve (no OneNote ou no caderno) uma analogia tua, diferente da do correio, para explicar o encapsulamento. Pode ser uma encomenda online, uma pizza entregue ao domicílio, um jogo… Cada "camada" tem de juntar alguma coisa. Lê-a ao professor.</p>'
    },
    {
      tipo: 'resumo',
      itens: ['As camadas dividem um problema complexo em partes simples e compatíveis.', 'OSI tem 7 camadas: Física, Ligação, Rede, Transporte, Sessão, Apresentação, Aplicação.', 'PDUs: bits (1), trama (2), pacote (3), segmento (4), dados (5–7).', 'Switch → camada 2 (MAC); router → camada 3 (IP); portas → camada 4.', 'Encapsular = cada camada junta o seu cabeçalho; no destino retira-se pela ordem inversa.']
    }
  ]
};
