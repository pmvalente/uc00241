/* Motor do site: progresso, XP, conquistas, navegação e desenho das sessões. */
(function () {
  'use strict';

  const CURSO = window.CURSO;
  const SESSOES = window.SESSOES || {};
  const LS = 'uc00241.progresso.v1';
  const VAZIO = () => ({ xp: 0, quizzes: {}, labs: {}, badges: {}, vistas: {}, desafios: {} });

  // ---------- Estado (guardado só neste browser) ----------
  let st = VAZIO();
  try { st = Object.assign(VAZIO(), JSON.parse(localStorage.getItem(LS) || '{}')); } catch (e) { /* sem storage */ }
  function save() { try { localStorage.setItem(LS, JSON.stringify(st)); } catch (e) { /* ignora */ } }

  // ---------- Utilitários ----------
  const $ = (s, r = document) => r.querySelector(s);
  function h(tag, attrs, ...kids) {
    const el = document.createElement(tag);
    if (attrs) for (const k in attrs) {
      const v = attrs[k];
      if (v == null || v === false) continue;
      if (k === 'class') el.className = v;
      else if (k === 'html') el.innerHTML = v;
      else if (k === 'style' && typeof v === 'object') Object.assign(el.style, v);
      else if (k.startsWith('on')) el.addEventListener(k.slice(2), v);
      else el.setAttribute(k, v === true ? '' : v);
    }
    for (const k of kids.flat()) if (k != null && k !== false) el.append(k.nodeType ? k : document.createTextNode(k));
    return el;
  }
  const modulo = id => CURSO.modulos.find(m => m.id === id) || {};
  const meta = n => CURSO.sessoes.find(s => s.n === n);

  // ---------- Níveis e XP ----------
  function nivel(xp) {
    const L = CURSO.niveis;
    let i = 0;
    while (i + 1 < L.length && xp >= L[i + 1].xp) i++;
    const atual = L[i], prox = L[i + 1];
    const pct = prox ? (xp - atual.xp) / (prox.xp - atual.xp) : 1;
    return { i, nome: atual.nome, pct, prox };
  }
  function topo() {
    const n = nivel(st.xp);
    $('#lvlNome').textContent = `Nv ${n.i + 1} · ${n.nome}`;
    $('#xpFill').style.width = Math.round(n.pct * 100) + '%';
    $('#xpTxt').textContent = st.xp + ' XP';
  }
  function toast(titulo, sub, cls) {
    const t = h('div', { class: 'toast ' + (cls || '') }, titulo, sub ? h('small', null, sub) : null);
    $('#toasts').append(t);
    setTimeout(() => t.remove(), 3800);
  }
  function addXP(n, motivo) {
    if (!n || n <= 0) return;
    const antes = nivel(st.xp).i;
    st.xp += n;
    save(); topo();
    toast(`+${n} XP`, motivo);
    const depois = nivel(st.xp);
    if (depois.i > antes) toast(`⬆️ Subiste de nível!`, `Agora és: ${depois.nome}`, 'badge-t');
    verificarConquistas();
  }
  function badge(id) {
    if (st.badges[id]) return;
    const b = CURSO.conquistas.find(x => x.id === id);
    if (!b) return;
    st.badges[id] = Date.now();
    save();
    toast(`${b.icone} Conquista: ${b.nome}`, b.desc, 'badge-t');
  }

  // ---------- Itens contabilizáveis de uma sessão ----------
  function itensSessao(n) {
    const s = SESSOES[n];
    if (!s) return { quizzes: [], labs: [] };
    return {
      quizzes: s.blocos.filter(b => b.tipo === 'quiz').map(b => b.id),
      labs: s.blocos.filter(b => b.tipo === 'lab').map(b => b.id)
    };
  }
  function progressoSessao(n) {
    const it = itensSessao(n);
    const total = it.quizzes.length + it.labs.length;
    if (!total) return 0;
    const feitos = it.quizzes.filter(id => st.quizzes[id]).length + it.labs.filter(id => st.labs[id] && st.labs[id].feito).length;
    return feitos / total;
  }
  function verificarConquistas() {
    const q = st.quizzes, ids = Object.keys(q);
    if (Object.keys(st.vistas).length) badge('boas-vindas');
    if (ids.length) badge('primeiro-quiz');
    if (ids.some(id => q[id].melhor === q[id].total)) badge('quiz-perfeito');
    const grupo = (ns, minPct) => {
      const qs = ns.flatMap(n => itensSessao(n).quizzes);
      if (!qs.length || !qs.every(id => q[id])) return false;
      const a = qs.reduce((s, id) => s + q[id].melhor, 0), t = qs.reduce((s, id) => s + q[id].total, 0);
      return a / t >= minPct;
    };
    if (grupo([2, 3, 4], 0.8)) badge('camadas');
    if (grupo([5, 6, 7, 8, 9], 0.7)) badge('modulo-ip');
    if (grupo([17, 18, 19, 20], 0.8)) badge('dns-dhcp');
    if (grupo([21, 22, 23], 0.8)) badge('dominio');
    if (grupo([24, 25, 26], 0.8)) badge('webmaster');
    if (grupo([27, 28, 29], 0.8)) badge('carteiro');
    if (grupo([34], 0.8)) badge('diploma');
    const labs = Object.values(st.labs).filter(l => l.feito).length;
    if (labs >= 1) badge('lab');
    if (labs >= 5) badge('labs5');
    if (Object.keys(st.desafios).length) badge('desafio');
    if (st.xp >= 500) badge('xp500');
    if (st.xp >= 1000) badge('xp1000');
  }

  // API usada por quiz.js e widgets.js
  window.APP = { st, save, addXP, badge, toast, h };

  // ---------- Páginas ----------
  function pagInicio() {
    const app = $('#app');
    const ultima = Object.keys(st.vistas).map(Number).sort((a, b) => st.vistas[b] - st.vistas[a])[0];
    const proxima = ultima || 1;
    const nQuizzes = Object.keys(st.quizzes).length;
    const nBadges = Object.keys(st.badges).length;
    const n = nivel(st.xp);

    app.append(h('section', { class: 'hero' },
      h('div', { class: 'hero-main' },
        h('div', { class: 'term' }, '$ ping uc00241.escola.local'),
        h('h1', null, CURSO.titulo),
        h('p', null, 'Vais aprender como os dados viajam numa rede, como se dá endereço a cada máquina e como se põem a funcionar os serviços que usas todos os dias: DNS, DHCP, domínios, web, FTP e email.'),
        h('div', { class: 'row', style: { marginTop: '18px' } },
          h('span', { class: 'tag' }, CURSO.uc), h('span', { class: 'tag' }, CURSO.horas), h('span', { class: 'tag' }, CURSO.curso))
      ),
      h('div', { class: 'hero-side' },
        h('div', { class: 'stat' }, h('span', null, 'Nível'), h('b', null, `${n.i + 1} · ${n.nome}`)),
        h('div', { class: 'stat' }, h('span', null, 'Experiência'), h('b', null, st.xp + ' XP')),
        h('div', { class: 'stat' }, h('span', null, 'Mini-quizzes feitos'), h('b', null, String(nQuizzes))),
        h('div', { class: 'stat' }, h('span', null, 'Conquistas'), h('b', null, `${nBadges}/${CURSO.conquistas.length}`)),
        h('a', { class: 'btn primary continue', href: `#/s/${proxima}` }, ultima ? `Continuar · Sessão ${proxima} →` : 'Começar pela Sessão 1 →')
      )
    ));

    for (const m of CURSO.modulos) {
      const ss = CURSO.sessoes.filter(s => s.modulo === m.id);
      app.append(h('div', { class: 'modulo', style: { '--mc': m.cor } },
        h('span', { class: 'tag mod', style: { '--mc': m.cor } }, m.icone + ' ' + m.curto),
        h('h2', null, m.titulo), h('span', { class: 'linha' }),
        h('span', { class: 'muted', style: { fontSize: '.85rem' } }, `${ss.length} ${ss.length === 1 ? 'bloco' : 'blocos'}`)));
      const grid = h('div', { class: 'grid-sessoes' });
      for (const s of ss) {
        const pronta = !!SESSOES[s.n];
        const p = progressoSessao(s.n);
        grid.append(h('a', {
          class: 'card-sessao' + (pronta ? '' : ' bloq') + (s.tipo === 'teste' ? ' teste' : ''),
          href: `#/s/${s.n}`, style: { '--mc': m.cor }
        },
          h('span', { class: 'num' }, `SESSÃO ${String(s.n).padStart(2, '0')}${s.extra ? ' · ' + s.extra : ''}`),
          h('span', { class: 'estado' }, !pronta ? '🔒 em breve' : p >= 1 ? '✅' : p > 0 ? `${Math.round(p * 100)}%` : ''),
          h('h3', null, s.titulo),
          h('span', { class: 'resumo' }, s.resumo),
          pronta ? h('span', { class: 'mini' }, h('i', { style: { width: Math.round(p * 100) + '%' } })) : null
        ));
      }
      app.append(grid);
    }
  }

  function pagSessao(n) {
    const app = $('#app');
    const m = meta(n);
    if (!m) { app.append(h('p', null, 'Sessão não encontrada. '), h('a', { href: '#/' }, 'Voltar')); return; }
    const mod = modulo(m.modulo);
    const s = SESSOES[n];
    st.vistas[n] = Date.now(); save(); verificarConquistas();

    const head = h('div', { class: 'sessao-head' },
      h('div', { class: 'row' },
        h('span', { class: 'tag mod', style: { '--mc': mod.cor } }, mod.icone + ' ' + mod.titulo),
        h('span', { class: 'tag' }, `Sessão ${n} de ${CURSO.sessoes.length}`),
        h('span', { class: 'tag' }, m.duracao || '90 min')),
      h('h1', null, m.titulo));

    if (!s) {
      app.append(head, h('div', { class: 'bloco' },
        h('h2', null, '🔒 Ainda não disponível'),
        h('p', null, m.resumo),
        h('p', { class: 'muted' }, 'O professor liberta esta sessão quando lá chegarmos. Até lá, revê as sessões anteriores!')),
        navSessao(n));
      return;
    }

    const prog = h('div', { class: 'prog-sessao' });
    const atualizaProg = () => {
      const p = progressoSessao(n);
      prog.replaceChildren(h('span', null, 'Progresso desta sessão'), h('span', { class: 'xpbar' }, h('i', { style: { width: Math.round(p * 100) + '%' } })), h('b', null, Math.round(p * 100) + '%'));
    };
    atualizaProg();
    head.append(prog);

    const toc = h('nav', { class: 'toc' }, h('h4', null, 'Nesta sessão'));
    const corpo = h('div', null, head);

    // Objetivos e plano
    corpo.append(h('section', { class: 'bloco', id: 'objetivos' },
      h('h2', null, h('span', { class: 'k' }, 'Objetivos'), 'O que vais conseguir fazer no fim'),
      h('div', { class: 'objetivos' }, s.objetivos.map(o => h('div', null, h('b', null, o[0]), o[1]))),
      s.plano ? h('div', { class: 'plano' }, s.plano.map(p => h('span', null, h('b', null, p[0]), p[1]))) : null
    ));
    toc.append(h('a', { href: '#objetivos', onclick: irPara('objetivos') }, h('span', { class: 'ico' }, '🎯'), 'Objetivos'));

    const tocLinks = {};
    s.blocos.forEach((b, i) => {
      b.id = b.id || `s${n}-b${i}`;
      const el = desenharBloco(b, () => { atualizaProg(); atualizaToc(); });
      if (!el) return;
      el.id = b.id;
      corpo.append(el);
      if (b.titulo && b.tipo !== 'nota') {
        const ico = { quiz: '❓', lab: '🧪', entrega: '📤', desafio: '🔥', exercicio: '✏️', widget: '🕹️', resumo: '📌' }[b.tipo] || '•';
        const a = h('a', { href: '#' + b.id, onclick: irPara(b.id) }, h('span', { class: 'ico' }, ico), b.titulo);
        tocLinks[b.id] = { a, b };
        toc.append(a);
      }
    });
    function atualizaToc() {
      for (const id in tocLinks) {
        const { a, b } = tocLinks[id];
        const ok = (b.tipo === 'quiz' && st.quizzes[id]) || (b.tipo === 'lab' && st.labs[id] && st.labs[id].feito) || (b.tipo === 'desafio' && st.desafios[id]);
        a.classList.toggle('ok', !!ok);
        if (ok) a.firstChild.textContent = '✓';
      }
    }
    atualizaToc();
    corpo.append(navSessao(n));
    app.append(h('div', { class: 'sessao-layout' }, toc, corpo));
  }

  function irPara(id) {
    return e => { e.preventDefault(); const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: 'smooth' }); };
  }

  function navSessao(n) {
    const a = meta(n - 1), b = meta(n + 1);
    return h('div', { class: 'navsessao' },
      a ? h('a', { href: `#/s/${a.n}` }, h('small', null, '← Sessão ' + a.n), a.titulo) : h('span'),
      b ? h('a', { class: 'next', href: `#/s/${b.n}` }, h('small', null, 'Sessão ' + b.n + ' →'), b.titulo) : h('span'));
  }

  // ---------- Blocos de conteúdo ----------
  function cab(k, titulo) { return h('h2', null, h('span', { class: 'k' }, k), titulo); }

  function desenharBloco(b, mudou) {
    switch (b.tipo) {
      case 'secao':
        return h('section', { class: 'bloco' }, h('h2', null, b.titulo), h('div', { html: b.html }));

      case 'cartoes':
        return h('section', { class: 'bloco' }, b.titulo ? h('h2', null, b.titulo) : null,
          b.intro ? h('p', { html: b.intro }) : null,
          h('div', { class: 'cartoes' }, b.itens.map(c => h('div', { class: 'cartao' },
            c.icone ? h('div', { class: 'ic' }, c.icone) : null, h('h3', null, c.titulo), h('p', { html: c.texto })))),
          b.depois ? h('div', { html: b.depois }) : null);

      case 'tabela':
        return h('section', { class: 'bloco' }, b.titulo ? h('h2', null, b.titulo) : null,
          b.intro ? h('p', { html: b.intro }) : null,
          h('div', { class: 'tabela-wrap' }, h('table', null,
            h('thead', null, h('tr', null, b.cab.map(c => h('th', null, c)))),
            h('tbody', null, b.linhas.map(l => h('tr', null, l.map(c => h('td', { html: String(c) }))))))),
          b.depois ? h('div', { html: b.depois, style: { marginTop: '12px' } }) : null);

      case 'nota': {
        const ic = { dica: '💡', atencao: '⚠️', info: 'ℹ️' }[b.estilo || 'info'];
        return h('div', { class: 'nota ' + (b.estilo || 'info') }, h('span', { class: 'ic' }, ic), h('div', { html: b.html }));
      }

      case 'widget': {
        const box = h('div', { class: 'widget' });
        const sec = h('section', { class: 'bloco' }, cab('Interativo', b.titulo), b.intro ? h('p', { html: b.intro }) : null, box);
        const fn = window.WIDGETS && window.WIDGETS[b.nome];
        if (fn) fn(box, b.opcoes || {}); else box.textContent = 'Widget em falta: ' + b.nome;
        return sec;
      }

      case 'quiz': {
        const sec = h('section', { class: 'bloco quiz' }, cab('Mini-quiz', b.titulo));
        if (b.intro) sec.append(h('p', { class: 'muted', html: b.intro }));
        const box = h('div');
        sec.append(box);
        window.QUIZ.render(box, b, (certas, total) => {
          const ant = st.quizzes[b.id];
          const melhorAnt = ant ? ant.melhor : 0;
          const melhor = Math.max(melhorAnt, certas);
          st.quizzes[b.id] = { melhor, total, ultimo: certas, quando: Date.now() };
          save();
          addXP((melhor - melhorAnt) * 10, `Mini-quiz: ${certas}/${total} certas`);
          verificarConquistas();
          mudou();
        }, st.quizzes[b.id]);
        return sec;
      }

      case 'lab': {
        const reg = st.labs[b.id] || (st.labs[b.id] = { passos: {}, feito: false });
        const sec = h('section', { class: 'bloco lab' }, cab('Laboratório', b.titulo));
        sec.append(h('div', { class: 'lab-meta' },
          b.ferramenta ? h('span', { class: 'tag' }, '🛠️ ' + b.ferramenta) : null,
          b.modo ? h('span', { class: 'tag' }, b.modo === 'grupo' ? '👥 Em grupo' : b.modo === 'par' ? '👥 Em par' : '👤 Individual') : null,
          b.tempo ? h('span', { class: 'tag' }, '⏱️ ' + b.tempo) : null,
          h('span', { class: 'tag' }, `⭐ ${b.xp || 30} XP`)));
        if (b.intro) sec.append(h('div', { html: b.intro }));
        const ol = h('ol', { class: 'passos' });
        const estado = h('div', { class: 'row', style: { marginTop: '12px' } });
        const refrescar = () => {
          const n = b.passos.length, f = b.passos.filter((_, i) => reg.passos[i]).length;
          estado.replaceChildren(h('span', { class: 'muted' }, `${f}/${n} passos`), reg.feito ? h('b', { style: { color: 'var(--green)' } }, '✅ Laboratório concluído') : null);
          if (f === n && !reg.feito) {
            reg.feito = true; save();
            addXP(b.xp || 30, 'Laboratório concluído: ' + b.titulo);
            mudou(); refrescar();
          }
        };
        b.passos.forEach((p, i) => {
          const cb = h('input', { type: 'checkbox', 'aria-label': 'Passo ' + (i + 1) + ' feito' });
          cb.checked = !!reg.passos[i];
          const li = h('li', { class: cb.checked ? 'feito' : '' }, cb, h('div', { class: 'conteudo', html: `<b>${i + 1}.</b> ` + p }));
          cb.addEventListener('change', () => { reg.passos[i] = cb.checked; li.classList.toggle('feito', cb.checked); save(); refrescar(); });
          ol.append(li);
        });
        sec.append(ol, estado);
        refrescar();
        return sec;
      }

      case 'exercicio': {
        const sol = h('div', { class: 'solucao', html: b.solucao });
        const btn = h('button', {
          class: 'btn small', onclick: () => {
            if (!sol.classList.contains('show') && !confirm('Já tentaste resolver sozinho/a? A solução só ajuda depois de tentares.')) return;
            sol.classList.toggle('show');
            btn.textContent = sol.classList.contains('show') ? 'Esconder solução' : 'Ver solução';
          }
        }, 'Ver solução');
        return h('section', { class: 'bloco exercicio' }, cab('Exercício', b.titulo), h('div', { html: b.html }), b.solucao ? btn : null, sol);
      }

      case 'entrega':
        return h('section', { class: 'bloco entrega' }, cab('Entrega', b.titulo),
          h('div', { class: 'row', style: { marginBottom: '10px' } },
            h('span', { class: 'tag' }, '📊 Conta para: ' + b.criterio),
            h('span', { class: 'tag' }, '📍 ' + (b.onde || 'Tarefas do Teams')),
            b.prazo ? h('span', { class: 'tag' }, '⏰ ' + b.prazo) : null,
            b.modo ? h('span', { class: 'tag' }, b.modo === 'grupo' ? '👥 Em grupo' : b.modo === 'par' ? '👥 Em par' : '👤 Individual') : null),
          b.intro ? h('p', { html: b.intro }) : null,
          h('ul', null, b.itens.map(i => h('li', { html: i }))));

      case 'desafio': {
        const feito = () => !!st.desafios[b.id];
        const btn = h('button', { class: 'btn small' });
        const sol = b.solucao ? h('div', { class: 'solucao', html: b.solucao }) : null;
        const ref = () => { btn.textContent = feito() ? '✅ Desafio concluído' : `Concluí o desafio (+${b.xp || 25} XP)`; btn.disabled = feito(); };
        btn.addEventListener('click', () => { st.desafios[b.id] = Date.now(); save(); addXP(b.xp || 25, 'Desafio extra: ' + b.titulo); ref(); mudou(); });
        ref();
        return h('section', { class: 'bloco desafio' }, cab('Desafio extra', b.titulo),
          h('p', { class: 'muted' }, 'Para quem acabou mais cedo. Mostra ao professor quando terminares.'),
          h('div', { html: b.html }),
          h('div', { class: 'row' }, btn, sol ? h('button', { class: 'btn small', onclick: () => sol.classList.toggle('show') }, 'Pista / solução') : null), sol);
      }

      case 'resumo':
        return h('section', { class: 'bloco resumo' }, cab('Resumo', b.titulo || 'O que levas desta aula'),
          h('ol', null, b.itens.map(i => h('li', { html: i }))));

      default:
        return h('div', null, 'Bloco desconhecido: ' + b.tipo);
    }
  }

  function pagAvaliacao() {
    const app = $('#app');
    app.append(h('h1', null, 'Como és avaliado/a'),
      h('p', { class: 'muted' }, 'Critérios da escola para esta UC. Os mini-quizzes, o XP e as conquistas deste site são para treinares: não contam para a nota.'));
    app.append(h('div', { class: 'criterios' }, CURSO.criterios.map(c =>
      h('div', { class: 'criterio', style: { '--cc': c.cor } }, h('div', { class: 'pct' }, c.peso), h('h3', null, c.nome), h('ul', null, c.itens.map(i => h('li', { html: i })))))));
    app.append(h('section', { class: 'bloco' }, h('h2', null, 'Onde está cada momento de avaliação'),
      h('div', { class: 'tabela-wrap' }, h('table', null,
        h('thead', null, h('tr', null, h('th', null, 'Sessão'), h('th', null, 'Momento'), h('th', null, 'Critério'), h('th', null, 'Como'))),
        h('tbody', null, CURSO.momentos.map(m => h('tr', null, h('td', { class: 'mono' }, m.sessao), h('td', null, m.nome), h('td', null, m.criterio), h('td', null, m.como))))))));
    app.append(h('div', { class: 'nota dica' }, h('span', { class: 'ic' }, '💡'),
      h('div', { html: 'As entregas fazem-se sempre em <b>Tarefas do Teams</b>, no canal do teu turno. Cada sessão diz-te no bloco <b>📤 Entrega</b> o que tens de entregar e em que critério conta.' })));
  }

  function pagConquistas() {
    const app = $('#app');
    const n = nivel(st.xp);
    app.append(h('h1', null, 'As tuas conquistas'),
      h('p', { class: 'muted' }, `Estás no nível ${n.i + 1} (${n.nome}) com ${st.xp} XP.` + (n.prox ? ` Faltam ${n.prox.xp - st.xp} XP para "${n.prox.nome}".` : ' Chegaste ao topo!')));
    app.append(h('div', { class: 'badges' }, CURSO.conquistas.map(b =>
      h('div', { class: 'badge' + (st.badges[b.id] ? ' on' : '') }, h('div', { class: 'ic' }, b.icone), h('h3', null, b.nome), h('p', null, b.desc)))));
    app.append(h('section', { class: 'bloco' }, h('h2', null, 'Níveis'),
      h('div', { class: 'plano' }, CURSO.niveis.map((l, i) => h('span', { style: i === n.i ? { borderColor: 'var(--accent)' } : null }, h('b', null, l.xp + ' XP'), `${i + 1} · ${l.nome}`)))));
    app.append(h('section', { class: 'bloco' }, h('h2', null, 'Os teus dados'),
      h('p', { class: 'muted' }, 'O progresso fica guardado apenas neste browser, neste computador. Se limpares o browser ou mudares de PC, recomeças do zero (não afeta a nota).'),
      h('div', { class: 'row' },
        h('button', { class: 'btn small', onclick: exportar }, '⬇️ Guardar cópia do progresso'),
        h('label', { class: 'btn small' }, '⬆️ Recuperar cópia', h('input', { type: 'file', accept: '.json', style: { display: 'none' }, onchange: importar })),
        h('button', { class: 'btn small', onclick: () => { if (confirm('Apagar todo o progresso deste browser?')) { st = VAZIO(); window.APP.st = st; save(); location.reload(); } } }, '🗑️ Recomeçar'))));
  }
  function exportar() {
    const blob = new Blob([JSON.stringify(st)], { type: 'application/json' });
    const a = h('a', { href: URL.createObjectURL(blob), download: 'progresso-uc00241.json' });
    document.body.append(a); a.click(); a.remove();
  }
  function importar(e) {
    const f = e.target.files[0]; if (!f) return;
    f.text().then(t => { try { const d = JSON.parse(t); if (typeof d.xp !== 'number') throw 0; localStorage.setItem(LS, JSON.stringify(d)); location.reload(); } catch (err) { alert('Ficheiro inválido.'); } });
  }

  function pagRecursos() {
    const app = $('#app');
    app.append(h('h1', null, 'Recursos'));
    for (const g of CURSO.recursos) {
      app.append(h('section', { class: 'bloco' }, h('h2', null, g.grupo),
        g.intro ? h('p', { class: 'muted', html: g.intro }) : null,
        h('div', { class: 'cartoes' }, g.itens.map(r => h('div', { class: 'cartao' },
          h('div', { class: 'ic' }, r.icone), h('h3', null, r.nome), h('p', { html: r.desc }),
          r.url ? h('p', { style: { marginTop: '10px' } }, h('a', { class: 'btn small', href: r.url, target: r.url.startsWith('http') ? '_blank' : null, rel: 'noopener', download: r.download ? '' : null }, r.acao || 'Abrir')) : null)))));
    }
  }

  // ---------- Router ----------
  function rota() {
    const app = $('#app');
    app.replaceChildren();
    const hash = location.hash.replace(/^#/, '') || '/';
    let r = 'inicio';
    const ms = hash.match(/^\/s\/(\d+)/);
    if (ms) { r = 'sessao'; pagSessao(Number(ms[1])); }
    else if (hash === '/avaliacao') { r = 'avaliacao'; pagAvaliacao(); }
    else if (hash === '/conquistas') { r = 'conquistas'; pagConquistas(); }
    else if (hash === '/recursos') { r = 'recursos'; pagRecursos(); }
    else pagInicio();
    document.querySelectorAll('.nav a').forEach(a => a.classList.toggle('on', a.dataset.r === r || (r === 'sessao' && a.dataset.r === 'inicio')));
    $('#nav').classList.remove('open');
    window.scrollTo(0, 0);
    const m = ms && meta(Number(ms[1]));
    document.title = m ? `S${m.n} · ${m.titulo} · UC00241` : 'Redes UC00241';
  }

  // ---------- Arranque ----------
  $('#temaBtn').addEventListener('click', () => {
    const atual = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
    document.documentElement.dataset.theme = atual;
    try { localStorage.setItem('uc00241.tema', atual); } catch (e) { /* ignora */ }
  });
  $('#menuBtn').addEventListener('click', () => $('#nav').classList.toggle('open'));
  window.addEventListener('hashchange', rota);
  topo();
  rota();
})();
