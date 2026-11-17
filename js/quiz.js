/* Motor de mini-quizzes.
   Tipos: mc (escolha múltipla), multi (várias certas), vf (verdadeiro/falso),
   preencher (resposta curta), ordenar, classificar (arrastar para categorias). */
(function () {
  'use strict';

  const OK = ['Boa! 🎯', 'Certíssimo! ⚡', 'Ping respondeu! ✅', 'Pacote entregue! 📦', 'Isso mesmo! 🚀'];
  const KO = ['Quase… 🤏', 'Pacote perdido 📉', 'Timeout ⏳', 'Não é bem assim 🔧'];
  const pick = a => a[Math.floor(Math.random() * a.length)];
  function baralhar(a) {
    const r = a.slice();
    for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; }
    return r;
  }
  const norm = s => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\s+/g, '').replace(/,/g, '.');

  function render(box, quiz, onFim, anterior) {
    const h = window.APP.h;
    box.replaceChildren();
    const total = quiz.perguntas.length;
    const res = new Array(total).fill(null);
    const prog = h('span', { class: 'quiz-prog' });
    const fim = h('div');
    const topo = h('div', { class: 'row', style: { marginBottom: '6px' } },
      anterior ? h('span', { class: 'tag' }, `Melhor resultado: ${anterior.melhor}/${anterior.total}`) : h('span', { class: 'tag' }, `${total} perguntas · 10 XP por resposta certa à primeira`),
      prog);
    box.append(topo);
    const atualizar = () => {
      const feitas = res.filter(r => r !== null).length;
      prog.textContent = `${feitas}/${total} respondidas`;
      if (feitas === total) terminar();
    };
    function terminar() {
      const certas = res.filter(Boolean).length;
      const pct = certas / total;
      const msg = pct === 1 ? 'Perfeito! Rede sem perdas. 🏆' : pct >= .8 ? 'Muito bem! 💪' : pct >= .5 ? 'Bom caminho. Revê as explicações das que falhaste.' : 'Volta a ler a matéria e tenta outra vez. Tu consegues! 🔁';
      fim.replaceChildren(h('div', { class: 'quiz-fim' },
        h('span', { class: 'score' }, `${certas}/${total}`),
        h('span', null, msg),
        h('button', { class: 'btn small', style: { marginLeft: 'auto' }, onclick: () => render(box, quiz, onFim, window.APP.st.quizzes[quiz.id]) }, '🔁 Tentar de novo')));
      onFim(certas, total);
    }

    quiz.perguntas.forEach((q, i) => {
      const exp = h('div', { class: 'exp' });
      const marcar = (certo, extra) => {
        res[i] = certo;
        exp.className = 'exp show ' + (certo ? 'ok' : 'ko');
        exp.innerHTML = `<b>${certo ? pick(OK) : pick(KO)}</b> ${extra || ''} ${q.exp || ''}`;
        atualizar();
      };
      const cartao = h('div', { class: 'q' }, h('div', { class: 'enun' }, h('span', { class: 'n' }, `${i + 1}.`), h('span', { html: q.p })));
      const corpo = TIPOS[q.t](q, marcar, h);
      cartao.append(corpo, exp);
      box.append(cartao);
    });
    box.append(fim);
    atualizar();
  }

  const TIPOS = {
    mc(q, marcar, h) {
      const ops = h('div', { class: 'ops' });
      const lista = q.fixa ? q.op.map((t, i) => ({ t, i })) : baralhar(q.op.map((t, i) => ({ t, i })));
      const btns = lista.map(o => {
        const b = h('button', { class: 'op', html: o.t });
        b.addEventListener('click', () => {
          btns.forEach(x => (x.disabled = true));
          const certo = o.i === q.c;
          b.classList.add(certo ? 'certo' : 'errado');
          if (!certo) btns[lista.findIndex(x => x.i === q.c)].classList.add('certo');
          marcar(certo);
        });
        return b;
      });
      ops.append(...btns);
      return ops;
    },

    vf(q, marcar, h) {
      const wrap = h('div', { class: 'vf' });
      const mk = (txt, val) => {
        const b = h('button', { class: 'op' }, txt);
        b.addEventListener('click', () => {
          wrap.querySelectorAll('button').forEach(x => (x.disabled = true));
          const certo = val === q.c;
          b.classList.add(certo ? 'certo' : 'errado');
          if (!certo) wrap.querySelectorAll('button')[q.c ? 0 : 1].classList.add('certo');
          marcar(certo);
        });
        return b;
      };
      wrap.append(mk('✔ Verdadeiro', true), mk('✘ Falso', false));
      return wrap;
    },

    multi(q, marcar, h) {
      const wrap = h('div');
      const ops = h('div', { class: 'ops' });
      const lista = baralhar(q.op.map((t, i) => ({ t, i })));
      const sel = new Set();
      const btns = lista.map(o => {
        const b = h('button', { class: 'op', html: '☐ ' + o.t });
        b.addEventListener('click', () => {
          if (sel.has(o.i)) { sel.delete(o.i); b.classList.remove('sel'); b.innerHTML = '☐ ' + o.t; }
          else { sel.add(o.i); b.classList.add('sel'); b.innerHTML = '☑ ' + o.t; }
        });
        return b;
      });
      ops.append(...btns);
      const ver = h('button', { class: 'btn small primary', style: { marginTop: '8px' } }, 'Verificar');
      ver.addEventListener('click', () => {
        ver.disabled = true;
        btns.forEach((b, k) => {
          b.disabled = true; b.classList.remove('sel');
          const i = lista[k].i, deve = q.c.includes(i);
          if (deve) b.classList.add('certo'); else if (sel.has(i)) b.classList.add('errado');
        });
        const certo = q.c.length === sel.size && q.c.every(i => sel.has(i));
        marcar(certo, certo ? '' : 'As certas estão a verde.');
      });
      wrap.append(h('div', { class: 'muted', style: { fontSize: '.85rem', marginBottom: '6px' } }, 'Seleciona todas as opções certas.'), ops, ver);
      return wrap;
    },

    preencher(q, marcar, h) {
      const inp = h('input', { type: 'text', placeholder: q.dica || 'Escreve aqui', autocomplete: 'off', spellcheck: 'false', style: { minWidth: '220px' } });
      const ver = h('button', { class: 'btn small primary' }, 'Verificar');
      const go = () => {
        if (!inp.value.trim()) { inp.focus(); return; }
        inp.disabled = true; ver.disabled = true;
        const certo = q.c.map(norm).includes(norm(inp.value));
        inp.classList.add(certo ? 'certo' : 'errado');
        marcar(certo, certo ? '' : `Resposta certa: <code>${q.c[0]}</code>.`);
      };
      ver.addEventListener('click', go);
      inp.addEventListener('keydown', e => { if (e.key === 'Enter') go(); });
      return h('div', { class: 'preencher' }, inp, ver);
    },

    ordenar(q, marcar, h) {
      let ordem = baralhar(q.itens.map((t, i) => i));
      if (ordem.every((v, i) => v === i)) ordem.reverse();
      const ul = h('ul', { class: 'ordenar' });
      let arrastado = null, bloqueado = false;
      const desenhar = () => {
        ul.replaceChildren(...ordem.map((idx, pos) => {
          const li = h('li', { draggable: 'true' },
            h('span', { class: 'pos' }, (pos + 1) + '.'), h('span', { class: 'txt', html: q.itens[idx] }),
            h('button', { class: 'iconbtn', style: { width: '30px', height: '30px' }, 'aria-label': 'Subir', onclick: () => mover(pos, -1) }, '↑'),
            h('button', { class: 'iconbtn', style: { width: '30px', height: '30px' }, 'aria-label': 'Descer', onclick: () => mover(pos, 1) }, '↓'));
          li.addEventListener('dragstart', () => { arrastado = pos; li.classList.add('drag'); });
          li.addEventListener('dragend', () => li.classList.remove('drag'));
          li.addEventListener('dragover', e => e.preventDefault());
          li.addEventListener('drop', e => { e.preventDefault(); if (bloqueado || arrastado === null) return; const [x] = ordem.splice(arrastado, 1); ordem.splice(pos, 0, x); arrastado = null; desenhar(); });
          return li;
        }));
      };
      const mover = (pos, d) => {
        if (bloqueado) return;
        const n = pos + d; if (n < 0 || n >= ordem.length) return;
        [ordem[pos], ordem[n]] = [ordem[n], ordem[pos]]; desenhar();
      };
      desenhar();
      const ver = h('button', { class: 'btn small primary', style: { marginTop: '8px' } }, 'Verificar ordem');
      ver.addEventListener('click', () => {
        bloqueado = true; ver.disabled = true;
        ul.querySelectorAll('li').forEach((li, pos) => { li.draggable = false; li.classList.add(ordem[pos] === pos ? 'certo' : 'errado'); li.querySelectorAll('button').forEach(b => (b.disabled = true)); });
        const certo = ordem.every((v, i) => v === i);
        marcar(certo, certo ? '' : 'Ordem certa: ' + q.itens.map((t, i) => `<b>${i + 1}</b> ${t}`).join(' → ') + '.');
      });
      return h('div', null, h('div', { class: 'muted', style: { fontSize: '.85rem', marginBottom: '6px' } }, 'Arrasta ou usa as setas para pôr pela ordem certa.'), ul, ver);
    },

    classificar(q, marcar, h) {
      const wrap = h('div');
      const pool = h('div', { class: 'chips' });
      const baldes = q.categorias.map(c => {
        const zona = h('div', { class: 'chips' });
        const el = h('div', { class: 'balde' }, h('h5', null, c), zona);
        return { c, el, zona };
      });
      let sel = null, bloqueado = false;
      const chips = baralhar(q.itens).map(it => {
        const ch = h('span', { class: 'chip', draggable: 'true', html: it.txt });
        ch._it = it;
        ch.addEventListener('click', e => {
          e.stopPropagation();
          if (bloqueado) return;
          if (sel === ch) { ch.classList.remove('sel'); sel = null; return; }
          if (sel) sel.classList.remove('sel');
          sel = ch; ch.classList.add('sel');
        });
        ch.addEventListener('dragstart', () => { sel = ch; });
        pool.append(ch);
        return ch;
      });
      const colocar = destino => {
        if (bloqueado || !sel) return;
        destino.append(sel); sel.classList.remove('sel'); sel = null;
        ver.disabled = pool.children.length > 0;
      };
      [{ el: pool, zona: pool }, ...baldes].forEach(b => {
        b.el.addEventListener('click', () => colocar(b.zona));
        b.el.addEventListener('dragover', e => { e.preventDefault(); b.el.classList.add('alvo'); });
        b.el.addEventListener('dragleave', () => b.el.classList.remove('alvo'));
        b.el.addEventListener('drop', e => { e.preventDefault(); b.el.classList.remove('alvo'); colocar(b.zona); });
      });
      const ver = h('button', { class: 'btn small primary', style: { marginTop: '10px' }, disabled: true }, 'Verificar');
      ver.addEventListener('click', () => {
        bloqueado = true; ver.disabled = true;
        let erros = 0;
        baldes.forEach(b => [...b.zona.children].forEach(ch => {
          const ok = ch._it.cat === b.c;
          if (!ok) { erros++; ch.innerHTML += ` <small>→ ${ch._it.cat}</small>`; }
          ch.classList.add(ok ? 'certo' : 'errado');
        }));
        marcar(erros === 0, erros ? `${erros} ${erros === 1 ? 'item ficou' : 'itens ficaram'} no sítio errado (a vermelho, com a categoria certa).` : '');
      });
      wrap.append(h('div', { class: 'muted', style: { fontSize: '.85rem', marginBottom: '6px' } }, 'Clica num cartão e depois na categoria (ou arrasta).'), pool, h('div', { class: 'baldes' }, baldes.map(b => b.el)), ver);
      return wrap;
    }
  };

  window.QUIZ = { render };
})();
