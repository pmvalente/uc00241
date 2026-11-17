SESSOES[3] = {
  objetivos: [
    ['Identificar', 'as 4 camadas do modelo TCP/IP e compará-lo com o OSI'],
    ['Associar', 'os protocolos de aplicação às portas e à função de cada um'],
    ['Distinguir', 'TCP de UDP e saber quando se usa cada um'],
    ['Usar', 'comandos de rede do Windows para observar protocolos']
  ],
  plano: [['15′', 'Modelo TCP/IP'], ['20′', 'Protocolos e portas'], ['15′', 'TCP vs UDP'], ['30′', 'Lab: comandos'], ['10′', 'Quiz + resumo']],
  blocos: [
    {
      tipo: 'secao', titulo: 'O modelo TCP/IP: o modelo real da Internet',
      html: `<p>O OSI é ótimo para estudar, mas a Internet funciona com o <b>modelo TCP/IP</b>, criado pelo Departamento de Defesa dos EUA nos anos 70. Tem só <b>4 camadas</b>:</p>
      <ol start="4" reversed>
        <li><b>Aplicação</b>: junta as camadas 5, 6 e 7 do OSI. É onde estão o HTTP, o HTTPS, o FTP, o SMTP, o DNS e o DHCP.</li>
        <li><b>Transporte</b>: igual à camada 4 do OSI (TCP e UDP).</li>
        <li><b>Internet</b>: igual à camada 3 do OSI (IP, ICMP).</li>
        <li><b>Acesso à rede</b>: junta as camadas 1 e 2 do OSI (Ethernet, Wi-Fi, cabos).</li>
      </ol>`
    },
    {
      tipo: 'tabela', titulo: 'OSI vs TCP/IP',
      cab: ['OSI', 'TCP/IP', 'Protocolos'],
      linhas: [
        ['7 Aplicação<br>6 Apresentação<br>5 Sessão', '<b>Aplicação</b>', 'HTTP, HTTPS, FTP, SMTP, POP3, IMAP, DNS, DHCP, SSH'],
        ['4 Transporte', '<b>Transporte</b>', 'TCP, UDP'],
        ['3 Rede', '<b>Internet</b>', 'IPv4, IPv6, ICMP'],
        ['2 Ligação de dados<br>1 Física', '<b>Acesso à rede</b>', 'Ethernet, Wi-Fi, ARP*']
      ],
      depois: '<p class="muted" style="font-size:.9rem">* O ARP descobre o MAC a partir do IP e fica "entre" as camadas 2 e 3. Os livros não estão todos de acordo sobre onde o pôr.</p>'
    },
    {
      tipo: 'tabela', titulo: 'Protocolos de aplicação e portas',
      intro: 'Um servidor pode ter vários serviços ao mesmo tempo. A <b>porta</b> diz a que serviço se destinam os dados: o IP é a morada do prédio e a porta é o número do apartamento. 🏢',
      cab: ['Protocolo', 'Porta', 'Transporte', 'Para que serve'],
      linhas: [
        ['<b>HTTP</b>', '80', 'TCP', 'Páginas web, sem cifragem'],
        ['<b>HTTPS</b>', '443', 'TCP', 'HTTP sobre TLS: páginas web cifradas 🔒'],
        ['<b>FTP</b>', '21 (controlo) · 20 (dados)', 'TCP', 'Transferência de ficheiros'],
        ['<b>SSH</b>', '22', 'TCP', 'Acesso remoto seguro à linha de comandos'],
        ['<b>SMTP</b>', '25 (servidores) · 587 (clientes)', 'TCP', 'Enviar email'],
        ['<b>POP3</b>', '110 · 995 (seguro)', 'TCP', 'Descarregar email para o PC'],
        ['<b>IMAP</b>', '143 · 993 (seguro)', 'TCP', 'Ler email mantendo-o no servidor'],
        ['<b>DNS</b>', '53', 'UDP (e TCP)', 'Traduzir nomes em endereços IP'],
        ['<b>DHCP</b>', '67 (servidor) · 68 (cliente)', 'UDP', 'Dar IP automaticamente'],
        ['<b>RDP</b>', '3389', 'TCP', 'Ambiente de trabalho remoto do Windows']
      ]
    },
    {
      tipo: 'quiz', id: 's03-q1', titulo: 'Portas e protocolos',
      perguntas: [
        { t: 'preencher', p: 'Qual é a porta do <b>HTTPS</b>?', c: ['443'], dica: 'número da porta', exp: 'HTTP = 80, HTTPS = 443.' },
        { t: 'preencher', p: 'Qual é a porta do <b>DNS</b>?', c: ['53'], dica: 'número da porta', exp: 'DNS = 53, normalmente sobre UDP.' },
        { t: 'classificar', p: 'Arruma os protocolos pela camada TCP/IP.', categorias: ['Aplicação', 'Transporte', 'Internet', 'Acesso à rede'], itens: [{ txt: 'HTTP', cat: 'Aplicação' }, { txt: 'DNS', cat: 'Aplicação' }, { txt: 'SMTP', cat: 'Aplicação' }, { txt: 'TCP', cat: 'Transporte' }, { txt: 'UDP', cat: 'Transporte' }, { txt: 'IP', cat: 'Internet' }, { txt: 'ICMP (ping)', cat: 'Internet' }, { txt: 'Ethernet', cat: 'Acesso à rede' }, { txt: 'Wi-Fi 802.11', cat: 'Acesso à rede' }], exp: 'Os protocolos que o utilizador "vê" são de Aplicação; o TCP e o UDP são de Transporte; o IP e o ICMP são de Internet.' },
        { t: 'mc', p: 'Que protocolo usarias para <b>enviar</b> um email?', op: ['SMTP', 'IMAP', 'POP3', 'FTP'], c: 0, exp: 'SMTP envia. IMAP e POP3 servem para ler/receber.' },
        { t: 'mc', p: 'Quantas camadas tem o modelo TCP/IP?', op: ['4', '7', '5', '3'], c: 0, exp: 'Aplicação, Transporte, Internet e Acesso à rede.' }
      ]
    },
    {
      tipo: 'cartoes', titulo: 'TCP vs UDP',
      intro: 'Na camada de transporte há dois "serviços de entrega":',
      itens: [
        { icone: '📬', titulo: 'TCP · correio registado', texto: 'Orientado à ligação: primeiro faz o <b>3-way handshake</b>. Confirma cada entrega, reenvia o que se perde e põe tudo por ordem. É mais lento, mas fiável. Usado na web, no email e em ficheiros.' },
        { icone: '📢', titulo: 'UDP · megafone', texto: 'Sem ligação: envia logo, sem confirmar. Se algo se perde, paciência. É rápido e leve. Usado no DNS, no DHCP, em streaming, em chamadas e em jogos online.' }
      ]
    },
    {
      tipo: 'widget', titulo: 'Vê o TCP e o UDP a funcionar', nome: 'handshake',
      intro: 'Avança mensagem a mensagem. Depois carrega em "Ver UDP" e compara.'
    },
    {
      tipo: 'quiz', id: 's03-q2', titulo: 'TCP ou UDP?',
      perguntas: [
        { t: 'classificar', p: 'Que transporte usa normalmente cada situação?', categorias: ['TCP', 'UDP'], itens: [{ txt: 'Descarregar um ficheiro', cat: 'TCP' }, { txt: 'Abrir uma página web', cat: 'TCP' }, { txt: 'Enviar um email', cat: 'TCP' }, { txt: 'Chamada de voz no Teams', cat: 'UDP' }, { txt: 'Pedido DNS', cat: 'UDP' }, { txt: 'Jogo online (posições)', cat: 'UDP' }], exp: 'Se perder um bocado estraga tudo (ficheiro, página), usa-se TCP. Se o que importa é a rapidez e uma perda pequena não se nota, usa-se UDP.' },
        { t: 'ordenar', p: 'Ordena as mensagens do <b>3-way handshake</b>.', itens: ['SYN', 'SYN-ACK', 'ACK'], exp: 'O cliente pede (SYN), o servidor aceita (SYN-ACK) e o cliente confirma (ACK).' },
        { t: 'vf', p: 'O UDP reenvia automaticamente os datagramas que se perdem.', c: false, exp: 'Quem reenvia é o TCP. O UDP não confirma nem reenvia.' }
      ]
    },
    {
      tipo: 'lab', id: 's03-lab', titulo: 'Detetive de rede: comandos do Windows', ferramenta: 'Linha de Comandos (cmd)', modo: 'individual', tempo: '30 min', xp: 40,
      intro: '<p>Abre o <b>Word</b> (ou o OneNote) e cria o documento <code>S03_NomeApelido</code>. Em cada passo cola o comando, uma captura do resultado e a resposta à pergunta.</p>',
      passos: [
        'Abre a Linha de Comandos (tecla <kbd>Windows</kbd> → <code>cmd</code>) e escreve <pre><code>ipconfig /all</code></pre> Regista: o teu <b>endereço IPv4</b>, a <b>máscara</b>, o <b>gateway predefinido</b>, o <b>servidor DNS</b> e o <b>endereço físico (MAC)</b>. Em que camada OSI está cada um?',
        'Testa a ligação ao gateway e a um servidor da Internet: <pre><code>ping &lt;o teu gateway&gt;\nping 8.8.8.8</code></pre> Que protocolo usa o ping? Em que camada? Quanto tempo (ms) demorou cada resposta?',
        'Vê o caminho até ao Google: <pre><code>tracert google.com</code></pre> Quantos saltos (routers) há? O primeiro salto é qual equipamento?',
        'Pergunta ao DNS: <pre><code>nslookup www.sapo.pt</code></pre> Que IP(s) recebeste? Que servidor DNS te respondeu?',
        'Abre um site no browser e logo a seguir escreve: <pre><code>netstat -an | findstr 443</code></pre> Encontra uma linha <code>ESTABLISHED</code>. Qual é a tua porta de origem? Porque é que a porta de destino é 443?',
        'Escreve <code>netstat -an | findstr LISTENING</code> e identifica 2 portas que o teu PC tem abertas à espera de ligações. Se o XAMPP estiver ligado, procura a 80 e a 3306.',
        'Guarda o documento e entrega-o em Tarefas do Teams.'
      ]
    },
    {
      tipo: 'entrega', titulo: 'Ficha de laboratório S03', criterio: 'Resolução de Problemas', prazo: 'Até à próxima aula', modo: 'individual',
      itens: ['Documento <code>S03_NomeApelido.docx</code> com as capturas e as respostas aos 6 passos']
    },
    {
      tipo: 'desafio', id: 's03-d1', titulo: 'Portas secretas', xp: 25,
      html: '<p>Descobre a que serviços pertencem estas portas: <code>3306</code>, <code>8080</code>, <code>25565</code> e <code>27015</code>. Duas delas são de jogos muito conhecidos 🎮. Porque achas que os jogos online usam sobretudo UDP?</p>',
      solucao: '<p>3306 = MySQL (o do XAMPP!) · 8080 = HTTP alternativo · 25565 = servidor de Minecraft · 27015 = jogos Steam/Source (ex.: Counter-Strike). Os jogos usam UDP porque a posição de há 200 ms já não interessa: mais vale a próxima chegar depressa do que reenviar a antiga.</p>'
    },
    {
      tipo: 'resumo',
      itens: ['O TCP/IP tem 4 camadas: Aplicação, Transporte, Internet e Acesso à rede.', 'A porta identifica o serviço: HTTP 80, HTTPS 443, DNS 53, SMTP 25/587, FTP 21.', 'TCP: com ligação, fiável, ordenado (3-way handshake). UDP: sem ligação, rápido.', '<code>ipconfig</code>, <code>ping</code>, <code>tracert</code>, <code>nslookup</code> e <code>netstat</code> são as tuas ferramentas de detetive.']
    }
  ]
};
