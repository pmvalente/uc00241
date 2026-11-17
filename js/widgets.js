/* Widgets interativos: torre OSI, encapsulamento, handshake TCP, jogo do binário,
   calculadora IP e treinador de sub-redes. */
(function () {
  'use strict';
  const h = (...a) => window.APP.h(...a);
  const W = {};

  // ---------- Endereços IPv4 ----------
  const IP = {
    parse(s) {
      const p = String(s).trim().split('.');
      if (p.length !== 4) return null;
      let n = 0;
      for (const x of p) { if (!/^\d{1,3}$/.test(x) || +x > 255) return null; n = n * 256 + +x; }
      return n >>> 0;
    },
    str(n) { return [n >>> 24, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join('.'); },
    mask(p) { return p === 0 ? 0 : (0xFFFFFFFF << (32 - p)) >>> 0; },
    bin(n) { return [24, 16, 8, 0].map(s => ((n >>> s) & 255).toString(2).padStart(8, '0')).join('.'); },
    classe(n) { const o = n >>> 24; return o < 128 ? 'A' : o < 192 ? 'B' : o < 224 ? 'C' : o < 240 ? 'D (multicast)' : 'E (experimental)'; },
    tipo(n) {
      const o1 = n >>> 24, o2 = (n >>> 16) & 255;
      if (o1 === 10 || (o1 === 172 && o2 >= 16 && o2 <= 31) || (o1 === 192 && o2 === 168)) return 'Privado';
      if (o1 === 127) return 'Loopback';
      if (o1 === 169 && o2 === 254) return 'APIPA (link-local)';
      if (o1 === 0) return 'Especial (0.0.0.0/8)';
      if (o1 >= 224) return 'Multicast/reservado';
      return 'Público';
    }
  };
  W._IP = IP;

  // ---------- Torre OSI ----------
  const OSI = [
    { n: 7, nome: 'Aplicação', cor: '#f472b6', pdu: 'Dados', f: 'Dá serviços de rede às aplicações do utilizador: navegar, enviar email, transferir ficheiros, resolver nomes.', prot: 'HTTP, HTTPS, FTP, SMTP, IMAP, POP3, DNS, DHCP', eq: 'Software (browser, cliente de email, servidor web)', ex: 'Quando escreves www.escola.pt no browser, é o HTTP/HTTPS que pede a página.' },
    { n: 6, nome: 'Apresentação', cor: '#a78bfa', pdu: 'Dados', f: 'Trata do formato dos dados: codificação de caracteres, compressão e cifragem.', prot: 'TLS/SSL, JPEG, PNG, UTF-8, ASCII', eq: 'Software', ex: 'O cadeado do HTTPS: os dados são cifrados antes de sair.' },
    { n: 5, nome: 'Sessão', cor: '#818cf8', pdu: 'Dados', f: 'Abre, mantém e fecha o "diálogo" entre duas aplicações. Controla quem fala e quando.', prot: 'NetBIOS, RPC, sessões de login', eq: 'Software', ex: 'Ficares com sessão iniciada numa plataforma enquanto navegas entre páginas.' },
    { n: 4, nome: 'Transporte', cor: '#22d3ee', pdu: 'Segmento (TCP) / Datagrama (UDP)', f: 'Leva os dados de aplicação a aplicação. Usa portas. Pode garantir entrega (TCP) ou dar prioridade à rapidez (UDP).', prot: 'TCP, UDP', eq: 'Firewalls (filtram portas)', ex: 'A porta 443 diz que os dados são para o servidor HTTPS.' },
    { n: 3, nome: 'Rede', cor: '#34d399', pdu: 'Pacote', f: 'Endereçamento lógico (IP) e escolha do caminho entre redes diferentes (encaminhamento/roteamento).', prot: 'IPv4, IPv6, ICMP (ping), ARP*', eq: 'Router, switch de camada 3', ex: 'O router da escola decide para onde enviar um pacote para 8.8.8.8.' },
    { n: 2, nome: 'Ligação de dados', cor: '#fbbf24', pdu: 'Trama (frame)', f: 'Entrega de trama na mesma rede local usando endereços MAC. Deteta erros (FCS).', prot: 'Ethernet (802.3), Wi-Fi (802.11), PPP', eq: 'Switch, placa de rede, access point', ex: 'O switch vê o MAC de destino e envia a trama só para a porta certa.' },
    { n: 1, nome: 'Física', cor: '#f87171', pdu: 'Bits', f: 'Transmite os bits pelo meio físico: sinais elétricos, luz ou ondas de rádio. Define cabos, fichas e tensões.', prot: 'RJ45, UTP Cat6, fibra ótica, 802.11 rádio', eq: 'Cabos, hub, repetidor, conectores, patch panel', ex: 'Sem luz na placa de rede? O problema está na camada 1.' }
  ];
  W.osi = function (el) {
    const det = h('div', { class: 'osi-det' }, h('span', { class: 'muted' }, '👆 Clica numa camada para ver o que faz.'));
    const torre = h('div', { class: 'osi-torre' });
    OSI.forEach(c => {
      const row = h('div', { class: 'osi-camada', style: { '--lc': c.cor }, tabindex: 0, role: 'button' },
        h('span', { class: 'n' }, c.n), h('b', null, c.nome), h('span', { class: 'pdu' }, c.pdu));
      const abrir = () => {
        torre.querySelectorAll('.osi-camada').forEach(x => x.classList.remove('on'));
        row.classList.add('on');
        det.innerHTML = `<b style="color:${c.cor}">Camada ${c.n} · ${c.nome}</b><p style="margin:6px 0">${c.f}</p>
          <div class="muted" style="font-size:.9rem">📦 <b>PDU:</b> ${c.pdu} &nbsp;·&nbsp; 📡 <b>Protocolos:</b> ${c.prot}<br>🖥️ <b>Equipamentos:</b> ${c.eq}<br>💬 <i>${c.ex}</i></div>`;
      };
      row.addEventListener('click', abrir);
      row.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); abrir(); } });
      torre.append(row);
    });
    el.append(torre, det);
  };

  // ---------- Encapsulamento ----------
  W.encapsulamento = function (el) {
    const C = { dados: '#f9a8d4', tcp: '#67e8f9', ip: '#6ee7b7', mac: '#fcd34d', fcs: '#fcd34d' };
    const P = [
      { cam: '7-5 · Aplicação', pdu: 'Dados', txt: 'O browser cria o pedido HTTP: "dá-me a página index.html".', partes: [['dados', 'DADOS', 'GET /index.html']] },
      { cam: '4 · Transporte', pdu: 'Segmento', txt: 'O TCP junta um cabeçalho com as <b>portas</b>: origem 51034 (o browser) e destino 80 (o servidor web).', partes: [['tcp', 'TCP', '51034 → 80'], ['dados', 'DADOS', 'GET /index.html']] },
      { cam: '3 · Rede', pdu: 'Pacote', txt: 'O IP junta os <b>endereços IP</b> de origem e destino. Agora o pacote sabe para que máquina vai, mesmo noutra rede.', partes: [['ip', 'IP', '192.168.1.10 → 93.184.216.34'], ['tcp', 'TCP', '51034 → 80'], ['dados', 'DADOS', 'GET /index.html']] },
      { cam: '2 · Ligação de dados', pdu: 'Trama', txt: 'A Ethernet junta os <b>endereços MAC</b> (do PC e do próximo salto, o router) e no fim o <b>FCS</b>, para detetar erros.', partes: [['mac', 'MAC', 'AA:..:01 → BB:..:FE'], ['ip', 'IP', '192.168.1.10 → 93.184.216.34'], ['tcp', 'TCP', '51034 → 80'], ['dados', 'DADOS', 'GET /index.html'], ['fcs', 'FCS', 'verificação']] },
      { cam: '1 · Física', pdu: 'Bits', txt: 'A placa de rede transforma tudo em <b>bits</b>: impulsos elétricos no cabo, luz na fibra ou ondas no Wi-Fi.', bits: true }
    ];
    let i = 0, envio = true, timer = null;
    const palco = h('div', { class: 'encap-palco' });
    const info = h('div');
    const dots = h('div', { class: 'passos-dots' }, P.map(() => h('i')));
    const modo = h('button', { class: 'btn small' });
    const ant = h('button', { class: 'btn small' }, '◀');
    const seg = h('button', { class: 'btn small primary' }, '▶');
    const auto = h('button', { class: 'btn small' }, '⏯ Automático');
    const desenhar = () => {
      const k = envio ? i : P.length - 1 - i;
      const p = P[k];
      palco.replaceChildren(p.bits
        ? h('div', { class: 'encap-bits' }, Array.from({ length: 96 }, () => (Math.random() < .5 ? '0' : '1')).join('').replace(/(.{8})/g, '$1 '))
        : h('div', { class: 'encap-pdu' }, p.partes.map(([c, a, b]) => h('span', { style: { background: C[c] } }, a, h('small', null, b)))));
      info.innerHTML = `<div class="encap-info"><span><span class="camada">Camada ${p.cam}</span> · PDU: <b>${p.pdu}</b></span></div><p style="margin:8px 0 0">${envio ? p.txt : desTxt(k)}</p>`;
      [...dots.children].forEach((d, j) => d.classList.toggle('on', j === i));
      modo.textContent = envio ? '📤 A enviar (encapsular)' : '📥 A receber (desencapsular)';
      ant.disabled = i === 0; seg.disabled = i === P.length - 1;
    };
    const desTxt = k => ['O servidor web recebe finalmente os dados e responde com a página. 🎉', 'O TCP do servidor lê a porta 80, confirma a receção e entrega os dados ao servidor web.', 'O servidor confirma que o IP de destino é o seu e retira o cabeçalho IP.', 'A placa de rede do servidor verifica o FCS e o MAC de destino e retira o cabeçalho Ethernet.', 'Os bits chegam ao destino pelo cabo/ar.'][k];
    ant.onclick = () => { if (i > 0) { i--; desenhar(); } };
    seg.onclick = () => { if (i < P.length - 1) { i++; desenhar(); } };
    modo.onclick = () => { envio = !envio; i = 0; desenhar(); };
    auto.onclick = () => {
      if (timer) { clearInterval(timer); timer = null; auto.textContent = '⏯ Automático'; return; }
      i = 0; desenhar(); auto.textContent = '⏸ Parar';
      timer = setInterval(() => { if (!el.isConnected) { clearInterval(timer); return; } if (i < P.length - 1) { i++; desenhar(); } else { clearInterval(timer); timer = null; auto.textContent = '⏯ Automático'; } }, 2200);
    };
    el.append(palco, info, h('div', { class: 'row', style: { marginTop: '12px' } }, ant, seg, dots, h('span', { class: 'spacer' }), auto, modo));
    desenhar();
  };

  // ---------- Handshake TCP vs UDP ----------
  W.handshake = function (el) {
    const TCP = [
      ['dir', 'SYN · seq=100', 'O cliente pede para abrir ligação.'],
      ['esq', 'SYN-ACK · seq=300, ack=101', 'O servidor aceita e confirma.'],
      ['dir', 'ACK · ack=301', 'O cliente confirma. Ligação aberta! (3-way handshake)'],
      ['dir', 'DADOS · "GET /" (seq=101)', 'Agora sim, os dados.'],
      ['esq', 'ACK · ack=…', 'O servidor confirma que recebeu. Se não confirmar, o cliente reenvia.'],
      ['dir', 'FIN', 'Terminar a ligação de forma ordenada.']
    ];
    const UDP = [
      ['dir', 'DATAGRAMA 1 · voz', 'O UDP envia logo. Sem ligação, sem confirmações.'],
      ['dir', 'DATAGRAMA 2 · voz', 'Mais um…'],
      ['perdido', 'DATAGRAMA 3 · voz (perdido!)', 'Este perdeu-se. O UDP não reenvia: numa chamada ouves um pequeno "corte".'],
      ['dir', 'DATAGRAMA 4 · voz', 'E continua. Rapidez acima de tudo.']
    ];
    let modo = 'TCP', i = 0;
    const msgs = h('div', { class: 'hs-msgs' });
    const legenda = h('p', { class: 'muted', style: { minHeight: '1.6em' } });
    const cli = h('div', { class: 'host' }, '💻 Cliente', h('small', null, '192.168.1.10'));
    const srv = h('div', { class: 'host' }, '🖥️ Servidor', h('small', null, '192.168.1.20'));
    const btnSeg = h('button', { class: 'btn small primary' }, 'Próxima mensagem ▶');
    const btnModo = h('button', { class: 'btn small' });
    const reset = () => { i = 0; msgs.replaceChildren(); legenda.textContent = modo === 'TCP' ? 'TCP: orientado à ligação, fiável. Carrega em "Próxima mensagem".' : 'UDP: sem ligação, rápido. Carrega em "Próxima mensagem".'; btnModo.textContent = modo === 'TCP' ? 'Ver UDP' : 'Ver TCP'; btnSeg.disabled = false; };
    btnSeg.onclick = () => {
      const L = modo === 'TCP' ? TCP : UDP;
      const [d, t, exp] = L[i++];
      msgs.append(h('div', { class: 'hs-msg ' + (d === 'perdido' ? 'dir perdido' : d) }, d === 'esq' ? '◀ ' + t : t + ' ▶'));
      legenda.textContent = exp;
      if (i >= L.length) btnSeg.disabled = true;
    };
    btnModo.onclick = () => { modo = modo === 'TCP' ? 'UDP' : 'TCP'; reset(); };
    el.append(h('div', { class: 'hs' }, cli, msgs, srv), legenda, h('div', { class: 'row' }, btnSeg, btnModo, h('button', { class: 'btn small', onclick: reset }, '↺ Recomeçar')));
    reset();
  };

  // ---------- Jogo do binário ----------
  W.binario = function (el) {
    const pesos = [128, 64, 32, 16, 8, 4, 2, 1];
    const bits = new Array(8).fill(0);
    let alvo = null, streak = 0, melhor = 0;
    const visor = h('div', { class: 'bin-alvo' });
    const soma = h('div', { class: 'bin-soma' });
    const est = h('div', { class: 'row' });
    const grid = h('div', { class: 'bits' });
    const btns = pesos.map((p, k) => {
      const b = h('button', { 'aria-label': 'bit ' + p }, '0');
      b.onclick = () => { bits[k] ^= 1; desenhar(); verificar(); };
      grid.append(h('div', { class: 'bit' }, h('small', null, p), b));
      return b;
    });
    const valor = () => bits.reduce((s, b, k) => s + b * pesos[k], 0);
    const desenhar = () => {
      btns.forEach((b, k) => { b.textContent = bits[k]; b.classList.toggle('on', !!bits[k]); });
      const v = valor();
      const partes = pesos.filter((p, k) => bits[k]);
      soma.textContent = `${bits.join('')} = ${partes.length ? partes.join(' + ') : '0'} = ${v}`;
      visor.textContent = alvo === null ? v : `Objetivo: ${alvo}`;
      est.replaceChildren(
        alvo === null ? h('button', { class: 'btn small primary', onclick: novo }, '🎮 Modo desafio') : h('button', { class: 'btn small', onclick: () => { alvo = null; streak = 0; desenhar(); } }, '✋ Modo livre'),
        alvo !== null ? h('button', { class: 'btn small', onclick: () => { streak = 0; novo(); } }, '⏭ Saltar (perdes a sequência)') : null,
        alvo !== null ? h('span', null, 'Sequência: ', h('span', { class: 'streak' }, '🔥 ' + streak), h('span', { class: 'muted' }, `  · melhor: ${melhor}`)) : h('span', { class: 'muted' }, 'Clica nos bits para ligar/desligar.'),
        h('button', { class: 'btn small', onclick: () => { bits.fill(0); desenhar(); } }, 'Limpar'));
    };
    const novo = () => { alvo = Math.floor(Math.random() * 256); bits.fill(0); desenhar(); };
    const verificar = () => {
      if (alvo === null || valor() !== alvo) return;
      streak++; melhor = Math.max(melhor, streak);
      grid.classList.remove('flash-ok'); void grid.offsetWidth; grid.classList.add('flash-ok');
      window.APP.addXP(2, `Binário: ${alvo} acertado`);
      if (streak >= 10) window.APP.badge('binario');
      setTimeout(novo, 500);
    };
    el.append(visor, h('div', { style: { margin: '12px 0' } }, grid), soma, h('div', { style: { marginTop: '12px' } }, est));
    desenhar();
  };

  // ---------- Calculadora IP (AND binário) ----------
  W.calculadoraip = function (el, op) {
    const ipIn = h('input', { type: 'text', value: op.ip || '192.168.1.10', size: 16, 'aria-label': 'Endereço IP' });
    const pIn = h('input', { type: 'number', min: 0, max: 32, value: op.prefixo || 24, style: { width: '80px' }, 'aria-label': 'Prefixo' });
    const linhas = h('div', { class: 'ipcalc-linhas' });
    const res = h('div', { class: 'ipcalc-res' + (op.oculto ? ' oculto' : '') });
    const calc = () => {
      const ip = IP.parse(ipIn.value), p = +pIn.value;
      if (ip === null || !(p >= 0 && p <= 32)) { linhas.innerHTML = '<span style="color:var(--red)">Endereço ou prefixo inválido.</span>'; res.replaceChildren(); return; }
      const m = IP.mask(p), rede = (ip & m) >>> 0, bc = (rede | (~m >>> 0)) >>> 0;
      const cor = n => { const b = IP.bin(n); let k = 0; return b.split('').map(c => c === '.' ? '.' : `<span class="${k++ < p ? 'b-rede' : 'b-host'}">${c}</span>`).join(''); };
      linhas.innerHTML = `
        <div><span class="lbl">Endereço</span><span>${IP.str(ip)}</span><span>${cor(ip)}</span></div>
        <div><span class="lbl">Máscara</span><span>${IP.str(m)}</span><span>${cor(m)}</span></div>
        <div><span class="lbl">AND = Rede</span><span>${IP.str(rede)}</span><span>${cor(rede)}</span></div>
        <div><span class="lbl"></span><span></span><span class="muted" style="font-family:var(--font);font-size:.8rem"><span class="b-rede">■ bits de rede (${p})</span> · <span class="b-host">■ bits de host (${32 - p})</span></span></div>`;
      const hosts = p >= 31 ? (p === 31 ? 2 : 1) : Math.pow(2, 32 - p) - 2;
      const c = [
        ['Endereço de rede', IP.str(rede) + '/' + p],
        ['Broadcast', IP.str(bc)],
        ['Primeiro host', p >= 31 ? '—' : IP.str(rede + 1)],
        ['Último host', p >= 31 ? '—' : IP.str(bc - 1)],
        ['Hosts utilizáveis', hosts.toLocaleString('pt-PT')],
        ['Máscara', IP.str(m)],
        ['Classe (histórica)', IP.classe(ip)],
        ['Tipo', IP.tipo(ip)]
      ];
      res.replaceChildren(...c.map(([a, b]) => {
        const d = h('div', null, h('small', null, a), h('b', null, b));
        d.addEventListener('click', () => d.querySelector('b').style.filter = 'none');
        return d;
      }));
    };
    ipIn.addEventListener('input', calc); pIn.addEventListener('input', calc);
    el.append(h('div', { class: 'row', style: { marginBottom: '14px' } }, h('label', null, 'IP ', ipIn), h('label', null, 'Prefixo / ', pIn),
      op.oculto ? h('span', { class: 'muted', style: { fontSize: '.85rem' } }, 'Os resultados estão desfocados: calcula primeiro no caderno e clica para confirmar.') : null),
      linhas, res);
    calc();
  };

  // ---------- Treinador de sub-redes ----------
  W.treinosubredes = function (el, op) {
    const rnd = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
    let nivel = op.nivel || 1, ex = null, streak = 0;
    const enun = h('div', { class: 'treino-enun' });
    const campos = h('div', { class: 'treino-grid' });
    const feedback = h('div', { style: { minHeight: '1.6em', marginTop: '8px' } });
    const sel = h('select', null, [['1', 'Nível 1 · nº de sub-redes (/24)'], ['2', 'Nível 2 · nº de hosts (/24)'], ['3', 'Nível 3 · rede /16']].map(([v, t]) => h('option', { value: v }, t)));
    sel.value = String(nivel);
    sel.onchange = () => { nivel = +sel.value; streak = 0; gerar(); };
    const gerar = () => {
      let base, p0, novoP, pedido;
      if (nivel === 1) { base = IP.parse(`192.168.${rnd(0, 254)}.0`); p0 = 24; const n = [2, 4, 8, 16][rnd(0, 3)]; novoP = 24 + Math.log2(n); pedido = `ser dividida em <b>${n}</b> sub-redes iguais`; }
      else if (nivel === 2) { base = IP.parse(`192.168.${rnd(0, 254)}.0`); p0 = 24; const hb = rnd(3, 7); const hosts = rnd(Math.pow(2, hb - 1) - 1, Math.pow(2, hb) - 2); novoP = 32 - Math.ceil(Math.log2(hosts + 2)); pedido = `ser dividida em sub-redes iguais (o maior número possível) com pelo menos <b>${hosts}</b> hosts cada`; }
      else { base = IP.parse(`172.${rnd(16, 31)}.0.0`); p0 = 16; const n = [4, 8, 16, 32, 64][rnd(0, 4)]; novoP = 16 + Math.log2(n); pedido = `ser dividida em <b>${n}</b> sub-redes iguais`; }
      const nSub = Math.pow(2, novoP - p0);
      const k = rnd(2, Math.min(nSub, 6));
      const tam = Math.pow(2, 32 - novoP);
      const rede = (base + (k - 1) * tam) >>> 0;
      ex = { k, sol: { prefixo: '/' + novoP, mascara: IP.str(IP.mask(novoP)), hosts: String(tam - 2), rede: IP.str(rede), primeiro: IP.str(rede + 1), ultimo: IP.str(rede + tam - 2), broadcast: IP.str(rede + tam - 1) } };
      enun.innerHTML = `A rede <b>${IP.str(base)}/${p0}</b> vai ${pedido}. Calcula os valores pedidos para a <b>${k}.ª sub-rede</b> (a 1.ª começa em ${IP.str(base)}).`;
      const L = [['prefixo', 'Novo prefixo (ex.: /26)'], ['mascara', 'Nova máscara'], ['hosts', 'Hosts utilizáveis por sub-rede'], ['rede', `Endereço de rede da ${k}.ª`], ['primeiro', 'Primeiro host'], ['ultimo', 'Último host'], ['broadcast', 'Broadcast']];
      campos.replaceChildren(...L.map(([id, t]) => h('label', null, t, h('input', { type: 'text', 'data-id': id, autocomplete: 'off', spellcheck: 'false' }))));
      feedback.textContent = '';
    };
    const verificar = () => {
      let erros = 0;
      campos.querySelectorAll('input').forEach(inp => {
        let v = inp.value.trim().replace(/\s/g, '');
        const id = inp.dataset.id;
        if (id === 'prefixo' && v && !v.startsWith('/')) v = '/' + v;
        const ok = v === ex.sol[id];
        inp.classList.toggle('certo', ok); inp.classList.toggle('errado', !ok);
        if (!ok) erros++;
      });
      if (!erros) {
        streak++;
        feedback.innerHTML = `<b style="color:var(--green)">Tudo certo! 🎉</b> Sequência: <span class="streak">🔥 ${streak}</span>`;
        window.APP.addXP(5 * nivel, 'Sub-redes: exercício certo');
        if (streak >= 5) window.APP.badge('subredes');
      } else {
        streak = 0;
        feedback.innerHTML = `<b style="color:var(--red)">${erros} ${erros === 1 ? 'campo errado' : 'campos errados'}.</b> Corrige os vermelhos e verifica outra vez.`;
      }
    };
    const mostrar = () => {
      streak = 0;
      campos.querySelectorAll('input').forEach(inp => { inp.value = ex.sol[inp.dataset.id]; inp.classList.remove('errado'); inp.classList.add('certo'); });
      feedback.innerHTML = '<span class="muted">Solução mostrada (a sequência voltou a 0). Estuda-a e tenta um novo.</span>';
    };
    el.append(h('div', { class: 'row', style: { marginBottom: '10px' } }, sel), enun, campos,
      h('div', { class: 'row' }, h('button', { class: 'btn small primary', onclick: verificar }, 'Verificar'), h('button', { class: 'btn small', onclick: gerar }, '🎲 Novo exercício'), h('button', { class: 'btn small', onclick: mostrar }, 'Ver solução')),
      feedback);
    gerar();
  };

  // ---------- Tabela de encaminhamento: "és o router" ----------
  W.tabelarotas = function (el) {
    const R = [
      ['C', '192.168.10.0', 24, 'GigabitEthernet0/0', 'ligada diretamente'],
      ['C', '192.168.20.0', 24, 'GigabitEthernet0/1', 'ligada diretamente'],
      ['C', '10.0.0.0', 30, 'GigabitEthernet0/2', 'ligada diretamente'],
      ['C', '10.0.0.4', 30, 'Serial0/0/0', 'ligada diretamente'],
      ['S', '192.168.30.0', 24, 'GigabitEthernet0/2', 'via 10.0.0.2 (R2)'],
      ['S', '172.16.0.0', 16, 'GigabitEthernet0/2', 'via 10.0.0.2 (R2)'],
      ['S', '172.16.5.0', 24, 'Serial0/0/0', 'via 10.0.0.6 (R3)'],
      ['S*', '0.0.0.0', 0, 'Serial0/0/0', 'via 10.0.0.6 (R3) · rota por omissão']
    ].map(([t, rede, p, ifc, via]) => ({ t, rede, p, n: IP.parse(rede), ifc, via }));
    const rnd = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
    const gerar = () => {
      const op = [
        () => `192.168.10.${rnd(2, 254)}`, () => `192.168.20.${rnd(2, 254)}`, () => `192.168.30.${rnd(1, 254)}`,
        () => `172.16.${rnd(0, 255)}.${rnd(1, 254)}`, () => `172.16.5.${rnd(1, 254)}`, () => `172.16.5.${rnd(1, 254)}`,
        () => `${rnd(11, 223)}.${rnd(0, 255)}.${rnd(0, 255)}.${rnd(1, 254)}`, () => `10.0.0.${rnd(5, 6)}`, () => `8.8.8.8`
      ];
      return op[rnd(0, op.length - 1)]();
    };
    const melhor = ip => {
      let m = null;
      for (const r of R) if (((ip & IP.mask(r.p)) >>> 0) === r.n && (!m || r.p > m.p)) m = r;
      return m;
    };
    let dest, streak = 0, bloqueado = false;
    const enun = h('div', { class: 'treino-enun' });
    const fb = h('div', { style: { minHeight: '1.6em', marginTop: '10px' } });
    const tbody = h('tbody');
    const linhas = R.map(r => {
      const tr = h('tr', { style: { cursor: 'pointer' } },
        h('td', { class: 'mono' }, r.t), h('td', { class: 'mono' }, `${r.rede}/${r.p}`), h('td', { class: 'mono' }, r.ifc), h('td', null, r.via));
      tr.addEventListener('click', () => escolher(r, tr));
      tbody.append(tr);
      return tr;
    });
    const novo = () => {
      dest = gerar(); bloqueado = false;
      linhas.forEach(tr => (tr.style.background = ''));
      enun.innerHTML = `Chega um pacote para <b>${dest}</b>. Que linha da tabela usa o router? <span class="muted">(clica na linha)</span>`;
      fb.textContent = '';
    };
    const escolher = (r, tr) => {
      if (bloqueado) return;
      bloqueado = true;
      const m = melhor(IP.parse(dest));
      const ok = r === m;
      tr.style.background = `color-mix(in srgb, var(--${ok ? 'green' : 'red'}) 22%, transparent)`;
      if (!ok) linhas[R.indexOf(m)].style.background = 'color-mix(in srgb, var(--green) 22%, transparent)';
      const cands = R.filter(x => ((IP.parse(dest) & IP.mask(x.p)) >>> 0) === x.n);
      if (ok) { streak++; window.APP.addXP(3, 'Router: pacote bem encaminhado'); if (streak >= 8) window.APP.badge('router'); }
      else streak = 0;
      fb.innerHTML = `<b style="color:var(--${ok ? 'green' : 'red'})">${ok ? 'Encaminhado! 📦' : 'Pacote no sítio errado 📉'}</b> ` +
        `Rotas que servem: ${cands.map(x => `<code>/${x.p}</code>`).join(', ')}. Ganha a <b>mais específica</b> (maior prefixo): <code>${m.rede}/${m.p}</code> → sai por <b>${m.ifc}</b>. ` +
        `Sequência: <span class="streak">🔥 ${streak}</span> <button class="btn small" style="margin-left:8px">Próximo pacote ▶</button>`;
      fb.querySelector('button').onclick = novo;
    };
    el.append(h('div', { class: 'muted', style: { fontSize: '.85rem', marginBottom: '6px' } }, 'Tabela de encaminhamento do router R1 (C = ligada diretamente, S = estática, * = por omissão)'),
      h('div', { class: 'tabela-wrap' }, h('table', null, h('thead', null, h('tr', null, h('th', null, 'Tipo'), h('th', null, 'Rede de destino'), h('th', null, 'Interface de saída'), h('th', null, 'Próximo salto'))), tbody)),
      h('div', { style: { marginTop: '12px' } }, enun), fb);
    novo();
  };

  // ---------- Verificador do plano do mini-projeto 1 ----------
  // op.redes: [[nome, hosts], ...] já ordenadas da maior para a menor (VLSM).
  W.verificaplano = function (el, op) {
    const redes = op.redes;
    const gIn = h('input', { type: 'number', min: 1, max: 14, value: '', placeholder: 'G', style: { width: '80px' }, 'aria-label': 'Número do grupo' });
    const corpo = h('div');
    const fb = h('div', { style: { minHeight: '1.6em', marginTop: '10px' } });
    let esperado = null;
    const calcular = G => {
      let base = IP.parse(`192.168.${100 + G}.0`), cur = base;
      return redes.map(([nome, hosts]) => {
        const bits = Math.ceil(Math.log2(hosts + 2)), tam = Math.pow(2, bits), p = 32 - bits;
        const r = { nome, rede: IP.str(cur), prefixo: '/' + p, gateway: IP.str(cur + 1), broadcast: IP.str(cur + tam - 1) };
        cur += tam;
        return r;
      });
    };
    const montar = () => {
      const G = +gIn.value;
      if (!(G >= 1 && G <= 14)) { corpo.replaceChildren(h('p', { class: 'muted' }, 'Escreve o número do teu grupo (1–14) para começar.')); esperado = null; return; }
      esperado = calcular(G);
      corpo.replaceChildren(h('p', null, 'A rede do teu grupo é ', h('b', { class: 'mono' }, `192.168.${100 + G}.0/24`), '. Preenche com o teu plano e verifica.'),
        h('div', { class: 'tabela-wrap' }, h('table', null,
          h('thead', null, h('tr', null, ['Sub-rede', 'Endereço de rede', 'Prefixo', '1.º host (gateway)', 'Broadcast'].map(t => h('th', null, t)))),
          h('tbody', null, esperado.map((r, i) => h('tr', null, h('td', null, r.nome),
            ...['rede', 'prefixo', 'gateway', 'broadcast'].map(c => h('td', null, h('input', { type: 'text', 'data-i': i, 'data-c': c, size: c === 'prefixo' ? 4 : 14, autocomplete: 'off', spellcheck: 'false' })))))))));
      fb.textContent = '';
    };
    const verificar = () => {
      if (!esperado) return;
      let erros = 0, vazios = 0;
      corpo.querySelectorAll('input').forEach(inp => {
        let v = inp.value.trim().replace(/\s/g, '');
        if (!v) { vazios++; inp.classList.remove('certo', 'errado'); return; }
        if (inp.dataset.c === 'prefixo' && !v.startsWith('/')) v = '/' + v;
        const ok = v === esperado[inp.dataset.i][inp.dataset.c];
        inp.classList.toggle('certo', ok); inp.classList.toggle('errado', !ok);
        if (!ok) erros++;
      });
      fb.innerHTML = erros || vazios
        ? `<b style="color:var(--amber)">${erros} errado(s), ${vazios} por preencher.</b> Revê os vermelhos: ordenaste da maior para a menor? Os blocos estão seguidos?`
        : '<b style="color:var(--green)">Plano certo! ✅</b> Copia-o para o Excel do grupo e mostra ao professor.';
    };
    gIn.addEventListener('input', montar);
    el.append(h('div', { class: 'row', style: { marginBottom: '10px' } }, h('label', null, 'Grupo n.º ', gIn), h('button', { class: 'btn small primary', onclick: verificar }, 'Verificar plano')), corpo, fb);
    montar();
  };

  window.WIDGETS = W;
})();
