// ═══════════════════════════════════════════════════════════════
//  SITE MENU — auto-injected dropdown in the navbar on every page.
//  Lists all modules + tests, and the ⭐ Final 1–5 test.
// ═══════════════════════════════════════════════════════════════
(function () {
  const MODULES = [
    ['index.html',   'М1 · Змінні та типи'],
    ['lesson2.html', 'М2 · Умови if / elif'],
    ['lesson3.html', 'М3 · Цикл while'],
    ['lesson4.html', 'М4 · for та списки'],
    ['lesson5.html', 'М5 · % та //'],
    ['lesson6.html', 'М6 · Функції чисел'],
    ['lesson7.html', 'М7 · Задачі #1, #4'],
    ['lesson8.html', 'М8 · Задачі #2, #3, #5'],
    ['lesson9.html', 'М9 · Чистий код']
  ];
  const TESTS = [
    ['test4.html', '📝 Тест 1–4'],
    ['test5.html', '🎓 Підсумок 1–5'],
    ['test6.html', '🎮 Тренажер М6'],
    ['test7.html', '📝 Тест 7 · Задачі #1,#4'],
    ['test8.html', '📝 Тест 8 · Задачі #2,#3,#5'],
    ['test9.html', '📝 Тест 9 · Чистий код']
  ];
  const FINAL = ['final.html', '⭐ Фінальний тест 1–5'];

  const here = (location.pathname.split('/').pop() || 'index.html').toLowerCase();

  // ── Styles ──
  const css = `
    .menu-wrap { position: relative; display: inline-flex; }
    .menu-btn { display: inline-flex; align-items: center; gap: 0.35rem; }
    .menu-panel { position: absolute; right: 0; top: calc(100% + 8px); width: 270px;
      background: var(--bg-panel); border: 1px solid var(--border); border-radius: var(--r-md);
      box-shadow: var(--s-xl); padding: 0.5rem; z-index: 2000; display: none; max-height: 78vh; overflow-y: auto; }
    .menu-panel.open { display: block; animation: menuPop 0.16s ease; }
    @keyframes menuPop { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }
    .menu-sec { font-size: 0.66rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.7px;
      color: var(--text-faint); padding: 0.55rem 0.6rem 0.3rem; }
    .menu-link { display: block; padding: 0.45rem 0.6rem; border-radius: var(--r-sm); font-size: 0.82rem;
      font-weight: 600; color: var(--text-body); text-decoration: none; cursor: pointer; transition: all 0.12s; }
    .menu-link:hover { background: var(--accent-soft); color: var(--accent-text); }
    .menu-link.active { background: var(--accent-soft); color: var(--accent-text); }
    .menu-link.active::after { content: ' ●'; color: var(--accent); font-size: 0.7rem; }
    .menu-divider { height: 1px; background: var(--border-lite); margin: 0.45rem 0.3rem; }
    .menu-final { display: block; text-align: center; padding: 0.6rem; border-radius: var(--r-sm);
      background: linear-gradient(135deg, #7c3aed, #4f46e5); color: #fff !important; font-size: 0.85rem;
      font-weight: 800; text-decoration: none; cursor: pointer; box-shadow: var(--s-sm); transition: transform 0.12s; }
    .menu-final:hover { transform: translateY(-1px); }
    .menu-final.active { outline: 2px solid var(--accent); outline-offset: 2px; }
  `;
  const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  // ── Build button + panel ──
  const wrap = document.createElement('div');
  wrap.className = 'menu-wrap';

  const btn = document.createElement('button');
  btn.className = 'btn btn-secondary btn-sm menu-btn';
  btn.innerHTML = '<span>☰ Меню</span>';

  const panel = document.createElement('div');
  panel.className = 'menu-panel';

  const linkHTML = (href, label, cls) =>
    `<a class="menu-link ${cls || ''} ${here === href.toLowerCase() ? 'active' : ''}" href="${href}">${label}</a>`;

  panel.innerHTML =
    `<div class="menu-sec">Модулі</div>` +
    MODULES.map(([h, l]) => linkHTML(h, l)).join('') +
    `<div class="menu-divider"></div>` +
    `<div class="menu-sec">Тести та тренажери</div>` +
    TESTS.map(([h, l]) => linkHTML(h, l)).join('') +
    `<div class="menu-divider"></div>` +
    `<a class="menu-final ${here === FINAL[0].toLowerCase() ? 'active' : ''}" href="${FINAL[0]}">${FINAL[1]}</a>`;

  wrap.appendChild(btn);
  wrap.appendChild(panel);

  // ── Toggle logic ──
  btn.addEventListener('click', (e) => { e.stopPropagation(); panel.classList.toggle('open'); });
  document.addEventListener('click', (e) => { if (!wrap.contains(e.target)) panel.classList.remove('open'); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') panel.classList.remove('open'); });

  // ── Insert into navbar ──
  function inject() {
    const navRight = document.querySelector('.navbar-right');
    if (navRight) { navRight.insertBefore(wrap, navRight.firstChild); }
    else {
      // fallback: fixed top-right floating button
      wrap.style.position = 'fixed'; wrap.style.top = '14px'; wrap.style.right = '16px'; wrap.style.zIndex = '2000';
      document.body.appendChild(wrap);
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', inject);
  else inject();
})();
