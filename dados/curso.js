/* Mapa da UC00241: módulos, 33 sessões de 90 min + 1 tempo de 45 min (67 tempos = 50 h),
   critérios de avaliação, conquistas, níveis e recursos.
   Para acrescentar uma sessão: criar dados/sessoes/sNN.js e incluí-lo no index.html. */
window.SESSOES = window.SESSOES || {};
window.CURSO = {
  uc: 'UC00241',
  titulo: 'Configurar protocolos e serviços de rede',
  curso: 'CP Técnico/a de Desenvolvimento de Software',
  horas: '50 h · 4,5 créditos',
  professor: 'Pedro Valente',

  modulos: [
    { id: 'arranque', curto: 'Início', titulo: 'Arranque e revisão', cor: '#94a3b8', icone: '🚀' },
    { id: 'osi', curto: 'Módulo 1', titulo: 'Modelos OSI e TCP/IP', cor: '#f472b6', icone: '🧅' },
    { id: 'ip', curto: 'Módulo 2', titulo: 'Endereçamento IPv4 e sub-redes', cor: '#22d3ee', icone: '🔢' },
    { id: 'rot', curto: 'Módulo 3', titulo: 'Roteamento e mini-projeto', cor: '#34d399', icone: '🧭' },
    { id: 't1', curto: 'Avaliação', titulo: 'Teste 1', cor: '#fbbf24', icone: '📝' },
    { id: 'srv', curto: 'Módulo 4', titulo: 'Windows Server', cor: '#60a5fa', icone: '🖥️' },
    { id: 'dns', curto: 'Módulo 5', titulo: 'DNS e DHCP', cor: '#a78bfa', icone: '📇' },
    { id: 'ad', curto: 'Módulo 6', titulo: 'Domínio e utilizadores', cor: '#818cf8', icone: '👥' },
    { id: 'web', curto: 'Módulo 7', titulo: 'Serviços da Internet: Web e FTP', cor: '#fb923c', icone: '🌐' },
    { id: 'mail', curto: 'Módulo 8', titulo: 'Email e RGPD', cor: '#f87171', icone: '✉️' },
    { id: 't2', curto: 'Avaliação', titulo: 'Teste 2', cor: '#fbbf24', icone: '📝' },
    { id: 'proj', curto: 'Projeto', titulo: 'Projeto final', cor: '#e879f9', icone: '🏗️' }
  ],

  sessoes: [
    { n: 1, modulo: 'arranque', titulo: 'Bem-vindo/a à rede', resumo: 'Como funciona a UC, revisão de redes e normas, instalar o Packet Tracer.' },
    { n: 2, modulo: 'osi', titulo: 'Camadas e o modelo OSI', resumo: 'Porquê camadas, as 7 camadas OSI e o encapsulamento.' },
    { n: 3, modulo: 'osi', titulo: 'Modelo TCP/IP, protocolos e portas', resumo: 'As 4 camadas TCP/IP, portas conhecidas, TCP vs UDP.' },
    { n: 4, modulo: 'osi', titulo: 'HTTPS, TLS e diagnóstico por camadas', resumo: 'Ligações seguras e Packet Tracer em modo simulação.' },
    { n: 5, modulo: 'ip', titulo: 'IPv4 por dentro: o binário', resumo: '32 bits, 4 octetos e conversões binário ↔ decimal.' },
    { n: 6, modulo: 'ip', titulo: 'Classes, endereços privados e máscara', resumo: 'Classes, endereços especiais e a operação AND.' },
    { n: 7, modulo: 'ip', titulo: 'CIDR, gateway e configuração IP', resumo: 'Prefixos, hosts por rede e a primeira rede no Packet Tracer.' },
    { n: 8, modulo: 'ip', titulo: 'Sub-redes de tamanho fixo', resumo: 'Dividir uma rede em sub-redes iguais (FLSM).' },
    { n: 9, modulo: 'ip', titulo: 'VLSM e ficha de sub-redes', resumo: 'Sub-redes à medida de cada departamento.' },
    { n: 10, modulo: 'rot', titulo: 'Como pensa um router', resumo: 'Tabela de encaminhamento, rotas diretas, estáticas e por omissão.' },
    { n: 11, modulo: 'rot', titulo: 'Roteamento estático no Packet Tracer', resumo: 'Ligar 3 redes com 2 routers e configurar rotas.' },
    { n: 12, modulo: 'rot', titulo: 'Mini-projeto 1 · planear', resumo: 'Em grupo: endereçar a rede da escola.', extra: 'Grupo' },
    { n: 13, modulo: 'rot', titulo: 'Mini-projeto 1 · montar e testar', resumo: 'Em grupo: montar no Packet Tracer e entregar.', extra: 'Grupo' },
    { n: 14, modulo: 't1', titulo: 'Teste 1', resumo: 'Módulos 1 a 3. Microsoft Forms, 90 min.', tipo: 'teste' },
    { n: 15, modulo: 'srv', titulo: 'Windows Server numa máquina virtual', resumo: 'VirtualBox e instalação do Windows Server 2025.' },
    { n: 16, modulo: 'srv', titulo: 'Grupos de trabalho vs domínio', resumo: 'Configuração inicial do servidor e grupos de trabalho.' },
    { n: 17, modulo: 'dns', titulo: 'DNS: nomes e registos', resumo: 'Hierarquia, resolução, registos e zonas.' },
    { n: 18, modulo: 'dns', titulo: 'DNS: laboratório', resumo: 'Criar uma zona, registos e testar com nslookup.' },
    { n: 19, modulo: 'dns', titulo: 'DHCP: IP automático', resumo: 'Processo DORA, âmbitos, concessões e reservas.' },
    { n: 20, modulo: 'dns', titulo: 'DHCP: laboratório + DNS e DHCP juntos', resumo: 'Configurar o DHCP e diagnosticar problemas.' },
    { n: 21, modulo: 'ad', titulo: 'Instalar o serviço de domínio', resumo: 'Active Directory: promover a controlador de domínio.' },
    { n: 22, modulo: 'ad', titulo: 'Utilizadores, grupos e UO', resumo: 'Criar e gerir contas, perfis e grupos.' },
    { n: 23, modulo: 'ad', titulo: 'Políticas de grupo e partilhas', resumo: 'GPO básicas, pastas partilhadas e permissões.' },
    { n: 24, modulo: 'web', titulo: 'HTTP e o servidor Apache', resumo: 'XAMPP, pedidos HTTP, códigos de estado e virtual hosts.' },
    { n: 25, modulo: 'web', titulo: 'HTTPS: certificados no Apache', resumo: 'Criar um certificado e ativar TLS.' },
    { n: 26, modulo: 'web', titulo: 'FTP: transferir ficheiros', resumo: 'Servidor FTP, utilizadores e modos ativo/passivo.' },
    { n: 27, modulo: 'mail', titulo: 'Como viaja um email', resumo: 'SMTP, POP3, IMAP e o registo MX.' },
    { n: 28, modulo: 'mail', titulo: 'Servidor de email: laboratório', resumo: 'Instalar e configurar o hMailServer.' },
    { n: 29, modulo: 'mail', titulo: 'Email seguro e RGPD', resumo: 'TLS, SPF/DKIM e proteção de dados pessoais.' },
    { n: 30, modulo: 't2', titulo: 'Teste 2', resumo: 'Módulos 4 a 8. Microsoft Forms, 90 min.', tipo: 'teste' },
    { n: 31, modulo: 'proj', titulo: 'Projeto final · planear e montar', resumo: 'Em grupo: a rede e os serviços de uma pequena empresa.', extra: 'Grupo' },
    { n: 32, modulo: 'proj', titulo: 'Projeto final · configurar e testar', resumo: 'Em grupo: serviços a funcionar e relatório.', extra: 'Grupo' },
    { n: 33, modulo: 'proj', titulo: 'Projeto final · apresentações', resumo: '10 minutos por grupo.', extra: 'Grupo' },
    { n: 34, modulo: 'proj', titulo: 'Fecho da UC', resumo: 'Correção do Teste 2 e autoavaliação.', duracao: '45 min', extra: '45 min' }
  ],

  criterios: [
    { nome: 'Testes', peso: '25%', cor: '#fbbf24', itens: ['Teste 1 (sessão 14): módulos 1–3', 'Teste 2 (sessão 30): módulos 4–8', 'Cada teste vale metade (12,5%)', 'Em Microsoft Forms, 90 min'] },
    { nome: 'Trabalho de Grupo', peso: '25%', cor: '#e879f9', itens: ['Mini-projeto 1 (sessões 12–13): endereçar e rotear a rede da escola', 'Projeto final (sessões 31–33): rede e serviços de uma empresa', 'Relatório + apresentação'] },
    { nome: 'Resolução de Problemas', peso: '25%', cor: '#22d3ee', itens: ['Laboratórios e fichas de exercícios', 'Entregues em Tarefas do Teams, com evidências (capturas, ficheiros .pkt, respostas)', 'Contam a correção e o raciocínio'] },
    { nome: 'Trabalho em sala de aula', peso: '25%', cor: '#34d399', itens: ['Empenho e persistência', 'Autonomia e iniciativa', 'Organização e cumprimento de prazos', 'Respeito pelas normas de segurança', 'Observado pelo professor em todas as aulas'] }
  ],

  momentos: [
    { sessao: 'S1–S13', nome: 'Laboratórios e fichas do módulo 1–3', criterio: 'Resolução de Problemas', como: 'Tarefas do Teams' },
    { sessao: 'S12–S13', nome: 'Mini-projeto 1 · rede da escola', criterio: 'Trabalho de Grupo', como: 'Packet Tracer + relatório (Teams)' },
    { sessao: 'S14', nome: 'Teste 1', criterio: 'Testes', como: 'Microsoft Forms' },
    { sessao: 'S15–S29', nome: 'Laboratórios Windows Server, DNS, DHCP, AD, Web, FTP, Email', criterio: 'Resolução de Problemas', como: 'Tarefas do Teams' },
    { sessao: 'S30', nome: 'Teste 2', criterio: 'Testes', como: 'Microsoft Forms' },
    { sessao: 'S31–S33', nome: 'Projeto final', criterio: 'Trabalho de Grupo', como: 'Relatório + apresentação' },
    { sessao: 'Todas', nome: 'Trabalho em aula', criterio: 'Trabalho em sala de aula', como: 'Observação do professor' }
  ],

  niveis: [
    { xp: 0, nome: 'Cabo UTP' },
    { xp: 100, nome: 'Placa de rede' },
    { xp: 250, nome: 'Switch' },
    { xp: 450, nome: 'Access Point' },
    { xp: 700, nome: 'Router' },
    { xp: 1000, nome: 'Firewall' },
    { xp: 1400, nome: 'Servidor' },
    { xp: 1900, nome: 'Sysadmin' },
    { xp: 2500, nome: 'Arquiteto/a de Redes' }
  ],

  conquistas: [
    { id: 'boas-vindas', icone: '🔌', nome: 'Ligado à rede', desc: 'Abriste a primeira sessão.' },
    { id: 'primeiro-quiz', icone: '📦', nome: 'Primeiro pacote', desc: 'Completaste o teu primeiro mini-quiz.' },
    { id: 'quiz-perfeito', icone: '🎯', nome: 'Zero perdas', desc: '100% num mini-quiz.' },
    { id: 'lab', icone: '🧪', nome: 'Mãos na massa', desc: 'Concluíste o teu primeiro laboratório.' },
    { id: 'labs5', icone: '🛠️', nome: 'Técnico/a de bancada', desc: 'Concluíste 5 laboratórios.' },
    { id: 'desafio', icone: '🔥', nome: 'Modo difícil', desc: 'Concluíste um desafio extra.' },
    { id: 'camadas', icone: '🧅', nome: 'Mestre das camadas', desc: '80% ou mais em todos os quizzes das sessões 2–4.' },
    { id: 'binario', icone: '🥷', nome: 'Ninja do binário', desc: '10 seguidas no jogo do binário.' },
    { id: 'subredes', icone: '✂️', nome: 'Sub-netter', desc: '5 exercícios de sub-redes certos seguidos.' },
    { id: 'router', icone: '🧭', nome: 'Router humano', desc: '8 pacotes bem encaminhados seguidos na tabela de encaminhamento.' },
    { id: 'modulo-ip',icone: '🔢', nome: 'IP certificado', desc: '70% ou mais em todos os quizzes das sessões 5–9.' },
    { id: 'dns-dhcp', icone: '📇', nome: 'Senhor/a dos nomes', desc: '80% ou mais em todos os quizzes das sessões 17–20.' },
    { id: 'dominio', icone: '🏰', nome: 'Dono/a do domínio', desc: '80% ou mais em todos os quizzes das sessões 21–23.' },
    { id: 'webmaster', icone: '🕸️', nome: 'Mestre/a da Web', desc: '80% ou mais em todos os quizzes das sessões 24–26.' },
    { id: 'carteiro', icone: '📮', nome: 'Carteiro/a digital', desc: '80% ou mais em todos os quizzes das sessões 27–29.' },
    { id: 'xp500',icone: '⚡', nome: 'Em rede', desc: 'Chegaste aos 500 XP.' },
    { id: 'xp1000', icone: '🛰️', nome: 'Backbone', desc: 'Chegaste aos 1000 XP.' }
  ],

  recursos: [
    {
      grupo: '🛠️ Ferramentas a instalar',
      intro: 'Instala só o que o professor pedir em cada sessão. Descarrega sempre do site oficial.',
      itens: [
        { icone: '🧭', nome: 'Cisco Packet Tracer', desc: 'Simulador de redes. Precisas de conta gratuita da Cisco Networking Academy. Sessão 1.', url: 'https://www.netacad.com/cisco-packet-tracer', acao: 'Site oficial' },
        { icone: '📦', nome: 'Oracle VirtualBox', desc: 'Para correres o Windows Server numa máquina virtual. Sessão 15.', url: 'https://www.virtualbox.org/wiki/Downloads', acao: 'Site oficial' },
        { icone: '🖥️', nome: 'Windows Server 2025 (avaliação)', desc: 'Versão de avaliação gratuita (180 dias). O professor indica qual ISO usar. Sessão 15.', url: 'https://www.microsoft.com/evalcenter/evaluate-windows-server-2025', acao: 'Evaluation Center' },
        { icone: '🔥', nome: 'XAMPP', desc: 'Já o tens instalado. Inclui o Apache (web) e o OpenSSL que vais usar nas sessões 24 e 25.', url: 'https://www.apachefriends.org/', acao: 'Site oficial' },
        { icone: '🦈', nome: 'Wireshark', desc: 'Para "ver" os pacotes que passam na tua placa de rede. Opcional.', url: 'https://www.wireshark.org/download.html', acao: 'Site oficial' }
      ]
    },
    {
      grupo: '📑 Apresentações das aulas',
      itens: [
        { icone: '🧅', nome: 'Modelos OSI e TCP/IP', desc: 'Sessões 2 a 9.', url: 'recursos/modelos-osi-tcpip.pptx', acao: 'Descarregar .pptx', download: true },
        { icone: '📇', nome: 'DNS e DHCP', desc: 'Sessões 17 a 20.', url: 'recursos/dns-dhcp.pptx', acao: 'Descarregar .pptx', download: true },
        { icone: '✉️', nome: 'Servidor de Email', desc: 'Sessões 27 a 29.', url: 'recursos/servidor-email.pptx', acao: 'Descarregar .pptx', download: true }
      ]
    },
    {
      grupo: '⌨️ Comandos de rede (Windows)',
      intro: 'Abre a <b>Linha de Comandos</b> (tecla Windows → escreve <code>cmd</code>) ou o PowerShell.',
      itens: [
        { icone: '🪪', nome: 'ipconfig /all', desc: 'Mostra IP, máscara, gateway, DNS, MAC e se o IP veio por DHCP.' },
        { icone: '📡', nome: 'ping 8.8.8.8', desc: 'Testa se uma máquina responde (ICMP). Bom para a camada 3.' },
        { icone: '🗺️', nome: 'tracert google.com', desc: 'Mostra os routers (saltos) até ao destino.' },
        { icone: '📇', nome: 'nslookup escola.pt', desc: 'Pergunta ao DNS qual é o IP de um nome.' },
        { icone: '🔌', nome: 'netstat -an', desc: 'Lista ligações e portas abertas (TCP/UDP).' },
        { icone: '🔄', nome: 'ipconfig /release · /renew', desc: 'Larga e volta a pedir IP ao servidor DHCP.' },
        { icone: '🧹', nome: 'ipconfig /flushdns', desc: 'Limpa a cache DNS do PC.' },
        { icone: '🧾', nome: 'arp -a', desc: 'Mostra a tabela IP ↔ MAC que o PC conhece.' }
      ]
    }
  ]
};
