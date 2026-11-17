SESSOES[4] = {
  objetivos: [
    ['Explicar', 'como o TLS protege uma ligação HTTPS'],
    ['Verificar', 'o certificado digital de um site'],
    ['Observar', 'o encapsulamento em modo simulação no Packet Tracer'],
    ['Diagnosticar', 'problemas de rede camada a camada']
  ],
  plano: [['20′', 'TLS e HTTPS'], ['35′', 'Lab: modo simulação'], ['20′', 'Diagnóstico por camadas'], ['15′', 'Quiz do módulo']],
  blocos: [
    {
      tipo: 'secao', titulo: 'SSL/TLS e HTTPS',
      html: `<p>No HTTP, tudo viaja <b>em texto simples</b>: quem estiver na mesma rede Wi-Fi pode ler as tuas palavras-passe. O <b>TLS</b> (<i>Transport Layer Security</i>, sucessor do antigo <b>SSL</b>) resolve isto. <b>HTTPS = HTTP + TLS</b>, na porta 443.</p>
      <p>O TLS garante três coisas:</p>
      <ul>
        <li>🔒 <b>Confidencialidade</b>: os dados são cifrados e só o destino os lê.</li>
        <li>🪪 <b>Autenticidade</b>: o <b>certificado digital</b> prova que o servidor é mesmo quem diz ser.</li>
        <li>✅ <b>Integridade</b>: se alguém alterar os dados pelo caminho, nota-se.</li>
      </ul>`
    },
    {
      tipo: 'quiz', id: 's04-q1', titulo: 'Como começa uma ligação TLS',
      perguntas: [
        { t: 'ordenar', p: 'Ordena os passos simplificados de uma ligação HTTPS.', itens: ['O cliente liga ao servidor (porta 443) e pede ligação segura', 'O servidor envia o seu certificado digital', 'O cliente verifica se o certificado é válido e de confiança', 'Combinam uma chave de sessão secreta', 'Os dados HTTP passam a viajar cifrados'], exp: 'Primeiro identifica-se o servidor, depois combina-se a chave e só então os dados passam.' },
        { t: 'mc', p: 'Quem garante que o certificado de <code>www.cgd.pt</code> é verdadeiro?', op: ['Uma Autoridade de Certificação (CA) em que o browser confia', 'O próprio servidor da CGD', 'O teu router', 'O servidor DNS'], c: 0, exp: 'As CAs (ex.: DigiCert, Let’s Encrypt) assinam os certificados. O browser traz uma lista de CAs de confiança.' },
        { t: 'vf', p: 'Um site com HTTPS e cadeado é sempre um site honesto e seguro.', c: false, exp: 'O cadeado só garante que a <b>ligação</b> é cifrada e que o domínio é aquele. Um site de phishing também pode ter certificado! Confirma sempre o endereço.' }
      ]
    },
    {
      tipo: 'lab', id: 's04-lab1', titulo: 'Inspeciona um certificado', ferramenta: 'Browser', modo: 'individual', tempo: '10 min', xp: 20,
      passos: [
        'Abre <code>https://www.portaldasfinancas.gov.pt</code> (ou outro site oficial). Clica no ícone à esquerda do endereço → <i>A ligação é segura</i> → <i>O certificado é válido</i>.',
        'Regista: <b>para quem foi emitido</b> (domínio), <b>quem o emitiu</b> (CA) e o <b>prazo de validade</b>.',
        'Abre <code>http://neverssl.com</code>. O que diz o browser à esquerda do endereço? Porque é que não deves pôr palavras-passe num site assim?'
      ]
    },
    {
      tipo: 'lab', id: 's04-lab2', titulo: 'Ver os pacotes em câmara lenta', ferramenta: 'Cisco Packet Tracer', modo: 'individual', tempo: '35 min', xp: 50,
      intro: '<p>O Packet Tracer tem um <b>modo de simulação</b> que mostra cada pacote a andar e o que tem lá dentro, camada a camada. É o encapsulamento em direto!</p>',
      passos: [
        'Cria uma rede com <b>1 switch 2960</b>, <b>1 PC</b> e <b>1 Server</b> (<i>End Devices</i>). Liga-os com o raio ⚡.',
        'Configura os IPs em <i>Desktop → IP Configuration</i>: PC <code>192.168.1.10 /24</code> e Server <code>192.168.1.100 /24</code>.',
        'No Server → separador <i>Services</i> → <i>HTTP</i>: confirma que o HTTP está <b>On</b>. Se quiseres, muda o texto do <code>index.html</code> para o teu nome.',
        'No canto inferior direito clica em <b>Simulation</b>. Em <i>Edit Filters</i> deixa só <b>HTTP</b> e <b>TCP</b>.',
        'No PC → <i>Desktop</i> → <i>Web Browser</i>, escreve <code>http://192.168.1.100</code> e carrega <i>Go</i>. Depois, no painel de simulação, carrega em <b>Capture/Forward</b> (▶|) várias vezes.',
        'Vês um envelope a viajar? Clica nele. No separador <b>OSI Model</b> aparecem as camadas <i>In</i> e <i>Out</i>. Tira uma captura e identifica as camadas 7, 4, 3 e 2.',
        'No separador <b>Outbound PDU Details</b> encontra: a <b>porta de destino</b> (TCP), o <b>IP de destino</b> e o <b>MAC de destino</b>. Regista os três valores.',
        'Repara que antes do HTTP aparecem pacotes TCP: o <b>3-way handshake</b>! Regista a ordem das flags (SYN, SYN+ACK, ACK).',
        'Guarda como <code>S04_NomeApelido.pkt</code>.'
      ]
    },
    {
      tipo: 'exercicio', titulo: 'Diagnóstico por camadas',
      html: `<p>Para cada problema, diz em que <b>camada OSI</b> está a causa mais provável e o que farias primeiro.</p>
      <ol type="A">
        <li>O PC não tem nenhuma luz acesa na placa de rede.</li>
        <li>Há luz na placa, mas o IP é <code>169.254.12.7</code>.</li>
        <li>O <code>ping 8.8.8.8</code> funciona, mas o <code>ping google.com</code> diz "não foi possível encontrar o anfitrião".</li>
        <li>Consegues abrir sites, mas o cliente de email dá erro na porta 587.</li>
        <li>Dois PCs ligados ao mesmo switch não se veem. Um tem <code>192.168.1.5/24</code> e o outro <code>192.168.2.5/24</code>.</li>
      </ol>`,
      solucao: `<ol type="A">
        <li><b>Camada 1</b>: cabo desligado ou estragado, porta do switch avariada. Troca o cabo ou a porta.</li>
        <li><b>Camada 3</b>: o PC não recebeu IP do DHCP e usou APIPA (169.254.x.x). Verifica o servidor DHCP e faz <code>ipconfig /renew</code>.</li>
        <li><b>Camada 7 (DNS)</b>: há ligação IP, mas a tradução de nomes falha. Verifica o servidor DNS configurado (<code>nslookup</code>).</li>
        <li><b>Camada 4/7</b>: a porta 587 está bloqueada (firewall) ou o serviço SMTP não está a funcionar.</li>
        <li><b>Camada 3</b>: estão em redes diferentes. Sem router não comunicam, por isso põe os dois na mesma rede.</li>
      </ol>`
    },
    {
      tipo: 'quiz', id: 's04-q2', titulo: 'Revisão do módulo 1',
      intro: 'Este quiz conta para a conquista 🧅 <b>Mestre das camadas</b> (80% em todos os quizzes das sessões 2–4).',
      perguntas: [
        { t: 'mc', p: 'Que equipamento trabalha na camada 3?', op: ['Router', 'Switch', 'Hub', 'Patch panel'], c: 0, exp: 'O router usa endereços IP (camada 3).' },
        { t: 'mc', p: 'O PC tem IP <code>169.254.33.2</code>. O que aconteceu provavelmente?', op: ['Não conseguiu IP do servidor DHCP', 'Está ligado à Internet', 'Tem IP público', 'O DNS falhou'], c: 0, exp: '169.254.x.x é APIPA: o Windows atribui-o a si próprio quando o DHCP não responde.' },
        { t: 'mc', p: 'Que porta usa o HTTPS?', op: ['443', '80', '53', '21'], c: 0, exp: 'HTTPS = 443.' },
        { t: 'multi', p: 'Quais destes protocolos usam <b>TCP</b>? (seleciona todos)', op: ['HTTP', 'SMTP', 'FTP', 'DHCP'], c: [0, 1, 2], exp: 'O DHCP usa UDP (portas 67/68).' },
        { t: 'mc', p: 'A camada <b>Internet</b> do TCP/IP corresponde a que camada do OSI?', op: ['Rede (3)', 'Transporte (4)', 'Ligação de dados (2)', 'Aplicação (7)'], c: 0, exp: 'Internet (TCP/IP) = Rede (OSI). É onde está o IP.' },
        { t: 'vf', p: 'O TLS garante que os dados não podem ser lidos por quem está no caminho.', c: true, exp: 'É a confidencialidade: os dados vão cifrados.' },
        { t: 'preencher', p: 'Como se chama a PDU da camada 3?', c: ['pacote', 'packet'], exp: 'Camada 3: pacote.' },
        { t: 'mc', p: '<code>ping 8.8.8.8</code> funciona, mas <code>ping google.com</code> falha. O problema é…', op: ['DNS', 'Cabo', 'Placa de rede', 'Switch'], c: 0, exp: 'Se o IP funciona mas o nome não, o problema é a tradução de nomes, ou seja, o DNS.' }
      ]
    },
    {
      tipo: 'entrega', titulo: 'Laboratório S04 · modo simulação', criterio: 'Resolução de Problemas', prazo: 'Até à próxima aula', modo: 'individual',
      itens: ['<code>S04_NomeApelido.pkt</code>', 'Documento com: captura do separador OSI Model, os valores de porta/IP/MAC de destino, a ordem do handshake e as respostas ao exercício de diagnóstico']
    },
    {
      tipo: 'resumo',
      itens: ['HTTPS = HTTP + TLS na porta 443: confidencialidade, autenticidade e integridade.', 'O certificado digital é assinado por uma Autoridade de Certificação.', 'O modo de simulação do Packet Tracer mostra o encapsulamento camada a camada.', 'Diagnostica de baixo para cima: luz → IP → ping → nome (DNS) → serviço/porta.']
    }
  ]
};
