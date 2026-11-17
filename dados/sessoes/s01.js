SESSOES[1] = {
  objetivos: [
    ['Conhecer', 'o que vais aprender nesta UC, como és avaliado/a e como funciona este site'],
    ['Recordar', 'tipos de redes, topologias, equipamentos e mapas físicos e lógicos'],
    ['Identificar', 'as principais normas da instalação de redes'],
    ['Instalar', 'o Cisco Packet Tracer e criar a tua primeira rede']
  ],
  plano: [['15′', 'Apresentação da UC'], ['25′', 'Revisão de redes + quiz'], ['10′', 'Normas'], ['35′', 'Lab: Packet Tracer'], ['5′', 'Resumo']],
  blocos: [
    {
      tipo: 'secao', titulo: 'Bem-vindo/a à UC00241 👋',
      html: `<p>Na UC de <b>Instalar Redes Locais</b> trataste da parte física: cabos, tomadas, switches e access points. Agora vamos fazer a rede <b>falar</b>. Esta UC tem três grandes objetivos:</p>
      <ol>
        <li><b>Configurar os parâmetros dos protocolos de rede</b>: modelos OSI e TCP/IP, endereços IP, máscaras, sub-redes e roteamento.</li>
        <li><b>Configurar os serviços de rede</b>: DNS, DHCP, domínio (Active Directory), utilizadores e grupos.</li>
        <li><b>Configurar os serviços da Internet</b>: web (HTTP/HTTPS), FTP e email.</li>
      </ol>
      <p>São <b>50 horas</b>, em blocos de 90 minutos. Vais trabalhar com três ferramentas: o <b>Cisco Packet Tracer</b> (simulador), o <b>VirtualBox</b> com <b>Windows Server</b> (servidor a sério numa máquina virtual) e o <b>XAMPP</b>, que já tens.</p>`
    },
    {
      tipo: 'cartoes', titulo: 'Como funciona este site',
      itens: [
        { icone: '❓', titulo: 'Mini-quizzes', texto: 'Depois de cada conteúdo importante. A correção é imediata e cada resposta tem explicação. Ganhas 10 XP por cada resposta certa.' },
        { icone: '🧪', titulo: 'Laboratórios', texto: 'Guiões passo-a-passo. Vai marcando cada passo que fizeres. No fim ganhas XP.' },
        { icone: '📤', titulo: 'Entregas', texto: 'Este bloco diz o que entregas em Tarefas do Teams e em que critério conta.' },
        { icone: '🔥', titulo: 'Desafios extra', texto: 'Para quem acaba mais cedo. Dão XP e conquistas.' }
      ],
      depois: `<div class="nota info"><span class="ic">ℹ️</span><div>O XP, os níveis e as conquistas ficam guardados <b>só neste browser</b> e <b>não contam para a nota</b>. O que conta está em <a href="#/avaliacao">Avaliação</a>: Testes 25%, Trabalho de Grupo 25%, Resolução de Problemas 25% e Trabalho em sala de aula 25%.</div></div>`
    },
    {
      tipo: 'tabela', titulo: 'Revisão rápida: tipos de redes',
      intro: 'As redes classificam-se pela <b>área geográfica</b> que cobrem:',
      cab: ['Tipo', 'Nome', 'Alcance', 'Exemplo'],
      linhas: [
        ['<b>PAN</b>', 'Personal Area Network', 'Alguns metros', 'Telemóvel + auriculares Bluetooth'],
        ['<b>LAN</b>', 'Local Area Network', 'Sala, edifício, escola', 'A rede da tua escola'],
        ['<b>WLAN</b>', 'Wireless LAN', 'Igual à LAN, sem fios', 'Wi-Fi da biblioteca'],
        ['<b>MAN</b>', 'Metropolitan Area Network', 'Uma cidade', 'Rede que liga as escolas de um município'],
        ['<b>WAN</b>', 'Wide Area Network', 'Países, continentes', 'A Internet']
      ]
    },
    {
      tipo: 'cartoes', titulo: 'Topologias',
      intro: 'A <b>topologia física</b> é a forma como os cabos estão ligados. A <b>topologia lógica</b> é o caminho que os dados realmente seguem.',
      itens: [
        { icone: '⭐', titulo: 'Estrela', texto: 'Todos ligados a um equipamento central (switch). É a mais usada em LAN: se um cabo falha, só esse PC fica sem rede.' },
        { icone: '🌳', titulo: 'Estrela estendida (árvore)', texto: 'Várias estrelas ligadas entre si: switch principal → switches de piso. É a rede típica de uma escola.' },
        { icone: '➖', titulo: 'Barramento', texto: 'Todos no mesmo cabo. É antiga: um corte no cabo derruba a rede toda.' },
        { icone: '⭕', titulo: 'Anel', texto: 'Cada equipamento liga ao seguinte e fecha um círculo. Hoje vê-se em redes de fibra de operadores.' },
        { icone: '🕸️', titulo: 'Malha', texto: 'Muitas ligações entre equipamentos e vários caminhos possíveis. Muito tolerante a falhas (a Internet, redes Wi-Fi mesh).' }
      ]
    },
    {
      tipo: 'tabela', titulo: 'Equipamentos ativos e passivos',
      intro: '<b>Ativos</b> precisam de energia e processam os dados. <b>Passivos</b> só os transportam ou organizam.',
      cab: ['Equipamento', 'Tipo', 'O que faz'],
      linhas: [
        ['Router', 'Ativo', 'Liga redes diferentes e escolhe o caminho dos pacotes (usa endereços IP).'],
        ['Switch', 'Ativo', 'Liga os dispositivos da mesma rede e envia cada trama só para a porta certa (usa endereços MAC).'],
        ['Access Point (AP)', 'Ativo', 'Liga dispositivos sem fios à rede com fios.'],
        ['Firewall', 'Ativo', 'Filtra o tráfego segundo regras de segurança.'],
        ['Placa de rede (NIC)', 'Ativo', 'Liga o computador à rede. Tem um endereço MAC único.'],
        ['Cabo UTP / fibra', 'Passivo', 'Meio físico por onde passam os sinais.'],
        ['Patch panel, tomada RJ45, bastidor', 'Passivo', 'Organizam e terminam a cablagem estruturada.']
      ],
      depois: `<p><b>Mapa físico</b>: onde estão os equipamentos e por onde passam os cabos (planta do edifício).<br><b>Mapa lógico</b>: como a rede está organizada em endereços e sub-redes (ex.: "Secretaria: 192.168.10.0/24").</p>`
    },
    {
      tipo: 'quiz', id: 's01-q1', titulo: 'Revisão de redes',
      perguntas: [
        { t: 'mc', p: 'A rede de uma escola, dentro de um edifício, é uma…', op: ['LAN', 'WAN', 'PAN', 'MAN'], c: 0, exp: 'LAN = rede local, num espaço limitado como um edifício.' },
        { t: 'mc', p: 'Qual é a topologia física mais usada nas redes locais atuais?', op: ['Estrela (ou estrela estendida)', 'Barramento', 'Anel', 'Malha completa'], c: 0, exp: 'Todos os PCs ligam a um switch central. É fácil de gerir e uma avaria afeta só um ponto.' },
        { t: 'classificar', p: 'Arruma cada equipamento: ativo ou passivo?', categorias: ['Ativo', 'Passivo'], itens: [{ txt: 'Switch', cat: 'Ativo' }, { txt: 'Router', cat: 'Ativo' }, { txt: 'Access Point', cat: 'Ativo' }, { txt: 'Patch panel', cat: 'Passivo' }, { txt: 'Cabo UTP', cat: 'Passivo' }, { txt: 'Tomada RJ45', cat: 'Passivo' }], exp: 'Os ativos precisam de energia e processam dados.' },
        { t: 'vf', p: 'O mapa lógico de uma rede mostra por onde passam os cabos no edifício.', c: false, exp: 'Isso é o mapa <b>físico</b>. O lógico mostra endereços, sub-redes e como os dados circulam.' },
        { t: 'mc', p: 'Que equipamento liga duas redes diferentes, por exemplo a rede da escola à Internet?', op: ['Router', 'Switch', 'Patch panel', 'Hub'], c: 0, exp: 'O router trabalha com endereços IP e encaminha pacotes entre redes.' },
        { t: 'mc', p: 'Na topologia em barramento, o que acontece se o cabo principal for cortado?', op: ['Toda a rede deixa de funcionar', 'Só um PC fica sem rede', 'Nada, os dados mudam de caminho', 'A rede fica mais lenta'], c: 0, exp: 'Todos partilham o mesmo cabo. Foi por isso que se passou para a estrela.' }
      ]
    },
    {
      tipo: 'secao', titulo: 'Normas e regulamentos na instalação de redes',
      html: `<p>Uma rede profissional segue <b>normas</b>. Assim, qualquer técnico percebe a instalação e os equipamentos de marcas diferentes funcionam juntos.</p>
      <ul>
        <li><b>ANSI/TIA-568</b>: cablagem estruturada em edifícios comerciais. Define as sequências de cores <b>T568A</b> e <b>T568B</b> e o limite de <b>100 m</b> por ligação em cobre (90 m fixos + 10 m de cabos de ligação).</li>
        <li><b>ISO/IEC 11801</b> e <b>EN 50173</b>: equivalentes internacional e europeia para a cablagem genérica.</li>
        <li><b>ITED / ITUR</b>: em Portugal, o manual da <b>ANACOM</b> obriga a instalar infraestruturas de telecomunicações em edifícios (ITED) e urbanizações (ITUR) segundo regras próprias.</li>
        <li><b>IEEE 802.3</b> (Ethernet) e <b>IEEE 802.11</b> (Wi-Fi): normas dos protocolos das camadas 1 e 2.</li>
        <li><b>Segurança</b>: desligar a energia antes de mexer em equipamento, não passar cabos de dados junto a cabos elétricos, arrumar e identificar os cabos.</li>
        <li><b>RGPD</b>: as redes transportam dados pessoais. Vamos voltar a este tema no módulo de email.</li>
      </ul>`
    },
    {
      tipo: 'lab', id: 's01-lab', titulo: 'Instalar o Packet Tracer e criar a primeira rede', ferramenta: 'Cisco Packet Tracer', modo: 'individual', tempo: '35 min', xp: 40,
      intro: '<p>O Packet Tracer é um simulador gratuito da Cisco. Com ele constróis redes com routers, switches e servidores sem gastar um cêntimo, e vês os pacotes a viajar.</p>',
      passos: [
        'Abre <a href="https://www.netacad.com/cisco-packet-tracer" target="_blank" rel="noopener">netacad.com/cisco-packet-tracer</a>, cria uma conta gratuita (ou entra com a tua) e descarrega a versão para Windows. Se a conta te der problemas, avisa o professor.',
        'Instala com as opções por omissão, abre o programa e inicia sessão com a conta que criaste.',
        'Explora a interface: em baixo à esquerda estão as categorias de equipamentos (<i>Network Devices</i>, <i>End Devices</i>, <i>Connections</i>…).',
        'Arrasta para a área de trabalho <b>1 switch 2960</b> e <b>2 PCs</b>.',
        'Em <i>Connections</i> escolhe o raio ⚡ (<i>Automatically Choose Connection Type</i>) e liga cada PC ao switch. Espera até as luzes ficarem verdes (pode demorar uns segundos).',
        'Clica no PC0 → <i>Desktop</i> → <i>IP Configuration</i>. Escreve o IP <code>192.168.1.1</code> e a máscara <code>255.255.255.0</code>. No PC1 usa <code>192.168.1.2</code> e a mesma máscara.',
        'No PC0 → <i>Desktop</i> → <i>Command Prompt</i>, escreve <code>ping 192.168.1.2</code>. Se aparecer <code>Reply from…</code>, a tua primeira rede funciona! 🎉',
        'Guarda o ficheiro como <code>S01_NomeApelido.pkt</code> e tira uma captura de ecrã da topologia com o resultado do ping.'
      ]
    },
    {
      tipo: 'entrega', titulo: 'Primeira rede no Packet Tracer', criterio: 'Trabalho em sala de aula', prazo: 'Até ao fim da aula', modo: 'individual',
      itens: ['Ficheiro <code>S01_NomeApelido.pkt</code>', 'Captura de ecrã com a topologia e o <code>ping</code> com resposta']
    },
    {
      tipo: 'desafio', id: 's01-d1', titulo: 'O mapa da tua casa', xp: 25,
      html: '<p>No Packet Tracer ou no papel, desenha o <b>mapa lógico</b> da rede da tua casa: router do operador, equipamentos com fios, equipamentos Wi-Fi (telemóveis, TV, consola…). Em casa, descobre com <code>ipconfig</code> qual é o IP do teu PC e do router (<i>Default Gateway</i>).</p>'
    },
    {
      tipo: 'resumo',
      itens: ['LAN, WLAN, MAN, WAN e PAN distinguem-se pela área que cobrem.', 'A topologia em estrela (ou estrela estendida) é a das redes locais atuais.', 'Equipamentos ativos processam os dados; os passivos só os transportam.', 'O mapa físico mostra onde estão os cabos; o mapa lógico mostra os endereços.', 'As normas (TIA-568, ISO 11801, ITED, IEEE 802.x) tornam as redes compatíveis e seguras.']
    }
  ]
};
