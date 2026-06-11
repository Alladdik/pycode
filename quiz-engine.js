// ═══════════════════════════════════════════════════════════════
//  SHARED QUIZ ENGINE — no-pressure multiple-choice quiz
//  Reads global `quizData`:
//  {
//    title, subtitle, storageKey, badge,
//    nav: { backLabel, backHref, nextLabel, nextHref },
//    confettiFrom: 0.6,                  // optional: pct to fire confetti
//    questions: [ { module, moduleLabel, question, code, options[4], correct, explanation } ]
//  }
//  Renders the entire quiz UI into <div id="quiz-root"></div>.
// ═══════════════════════════════════════════════════════════════
(function () {
  const D = (typeof quizData !== 'undefined') ? quizData : window.quizData;
  if (!D) { console.error('quizData not found'); return; }

  // ── Inject styles ──
  const css = `
    body { overflow-y: auto; }
    .app-container { height: auto; min-height: 100vh; }
    .quiz-main { flex: 1; display: flex; align-items: flex-start; justify-content: center; padding: 1.6rem 1rem 3rem; }
    .quiz-wrap { width: 100%; max-width: 700px; }
    .quiz-screen { display: none; } .quiz-screen.active { display: block; }

    .start-card { background: var(--bg-panel); border: 1px solid var(--border); border-radius: var(--r-lg); box-shadow: var(--s-xl); padding: 3rem 2.5rem; text-align: center; animation: qfadeUp 0.4s cubic-bezier(0.16,1,0.3,1); }
    .start-hero { font-size: 4.5rem; margin-bottom: 0.8rem; display: block; animation: qfloat 3.5s ease-in-out infinite; }
    @keyframes qfloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-9px); } }
    .start-card h1 { font-family: var(--f-disp); font-size: 2rem; font-weight: 800; color: var(--text-primary); margin-bottom: 0.45rem; }
    .start-sub { color: var(--text-muted); font-size: 0.92rem; margin-bottom: 1.8rem; }
    .topic-chips { display: flex; flex-wrap: wrap; gap: 0.5rem; justify-content: center; margin-bottom: 1.8rem; }
    .topic-chip { padding: 0.35rem 0.9rem; border-radius: 9999px; font-size: 0.78rem; font-weight: 700; border: 1.5px solid; }
    .start-note { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; margin-bottom: 1.8rem; }
    .note-pill { background: var(--bg-panel-raised); border: 1px solid var(--border); border-radius: var(--r-md); padding: 0.5rem 1rem; font-size: 0.82rem; font-weight: 600; color: var(--text-muted); }
    .best-row { background: var(--accent-soft); border: 1px solid var(--accent-border); border-radius: var(--r-md); padding: 0.6rem 1.2rem; font-size: 0.83rem; font-weight: 600; color: var(--accent-text); margin-bottom: 1.6rem; display: none; }
    .btn-lg { padding: 0.85rem 2.8rem; font-size: 1rem; }
    .kbd-tip { font-size: 0.73rem; color: var(--text-faint); margin-top: 0.9rem; }
    .kbd { display: inline-block; background: var(--bg-panel-raised); border: 1px solid var(--border); border-radius: 4px; padding: 0.08rem 0.38rem; font-family: var(--f-code); font-size: 0.7rem; color: var(--text-muted); }

    .q-card { background: var(--bg-panel); border: 1px solid var(--border); border-radius: var(--r-lg); box-shadow: var(--s-xl); overflow: hidden; }
    .q-prog-track { height: 4px; background: var(--bg-panel-raised); }
    .q-prog-fill { height: 100%; background: linear-gradient(90deg, var(--accent), #818cf8); border-radius: 0 2px 2px 0; transition: width 0.4s cubic-bezier(0.16,1,0.3,1); }
    .q-header { padding: 0.85rem 1.5rem; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--border); background: var(--bg-panel-raised); }
    .q-counter { font-size: 0.8rem; font-weight: 700; color: var(--text-muted); }
    .q-badge { padding: 0.22rem 0.75rem; border-radius: 9999px; font-size: 0.72rem; font-weight: 700; border: 1.5px solid; }
    .q-body { padding: 1.6rem 1.8rem; }
    .q-text { font-family: var(--f-disp); font-size: 1.13rem; font-weight: 700; color: var(--text-primary); line-height: 1.4; margin-bottom: 1.1rem; }
    .q-code { background: #1a2236; border: 1px solid rgba(255,255,255,0.07); border-radius: var(--r-md); padding: 0.9rem 1.1rem; margin-bottom: 1.25rem; font-family: var(--f-code); font-size: 0.87rem; color: #c8d8f0; line-height: 1.6; white-space: pre; overflow-x: auto; box-shadow: 0 4px 14px rgba(10,15,30,0.2); }
    .q-code::-webkit-scrollbar { height: 4px; } .q-code::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 999px; }
    .opts { display: grid; grid-template-columns: 1fr 1fr; gap: 0.6rem; }
    @media (max-width: 480px) { .opts { grid-template-columns: 1fr; } }
    .opt-btn { background: var(--bg-panel-raised); border: 2px solid var(--border); border-radius: var(--r-md); padding: 0.8rem 1rem; text-align: left; font-family: var(--f-code); font-size: 0.87rem; font-weight: 500; color: var(--text-body); cursor: pointer; transition: all 0.15s cubic-bezier(0.4,0,0.2,1); line-height: 1.4; word-break: break-word; }
    .opt-letter { display: inline-block; background: rgba(0,0,0,0.06); color: var(--text-muted); border-radius: 4px; font-size: 0.68rem; font-weight: 800; padding: 0.05rem 0.32rem; margin-right: 0.45rem; font-family: var(--f-ui); letter-spacing: 0.5px; transition: all 0.15s; }
    .opt-btn:hover:not(:disabled) { border-color: var(--accent-border); background: var(--accent-soft); color: var(--accent-text); transform: translateY(-1px); box-shadow: var(--s-sm); }
    .opt-btn:hover:not(:disabled) .opt-letter { background: var(--accent-border); color: var(--accent-text); }
    .opt-btn.picked { border-color: var(--accent); background: var(--accent-soft); color: var(--accent-text); font-weight: 600; }
    .opt-btn.picked .opt-letter { background: var(--accent-border); color: var(--accent-text); }
    .opt-btn:disabled { cursor: default; transform: none !important; box-shadow: none !important; }
    .q-footer { padding: 0.9rem 1.8rem 1.35rem; display: flex; justify-content: flex-end; }

    .result-top { background: var(--bg-panel); border: 1px solid var(--border); border-radius: var(--r-lg); box-shadow: var(--s-xl); padding: 2.2rem 2rem 1.8rem; text-align: center; animation: qfadeUp 0.4s cubic-bezier(0.16,1,0.3,1); margin-bottom: 1rem; }
    .r-emoji { font-size: 3.8rem; margin-bottom: 0.5rem; display: block; }
    .r-rank { display: inline-block; font-size: 0.78rem; font-weight: 800; letter-spacing: 1.4px; text-transform: uppercase; padding: 0.28rem 1rem; border-radius: 9999px; border: 2px solid; margin-bottom: 0.65rem; }
    .result-top h1 { font-family: var(--f-disp); font-size: 1.7rem; font-weight: 800; color: var(--text-primary); margin-bottom: 0.35rem; }
    .r-score { font-family: var(--f-disp); font-size: 3rem; font-weight: 800; margin: 0.3rem 0 0.2rem; }
    .s-good { color: var(--success); } .s-ok { color: var(--warning); } .s-bad { color: var(--error); }
    .r-stars { font-size: 1.5rem; letter-spacing: 0.1rem; margin: 0.2rem 0 0.7rem; }
    .r-msg { color: var(--text-muted); font-size: 0.9rem; line-height: 1.6; max-width: 420px; margin: 0 auto 1rem; }
    .r-mod-row { display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap; margin-bottom: 1.2rem; }
    .r-mod-pill { padding: 0.32rem 0.9rem; border-radius: 9999px; font-size: 0.76rem; font-weight: 700; border: 1.5px solid; }
    .r-buttons { display: flex; gap: 0.7rem; justify-content: center; flex-wrap: wrap; }

    .review-section { background: var(--bg-panel); border: 1px solid var(--border); border-radius: var(--r-lg); box-shadow: var(--s-md); overflow: hidden; animation: qfadeUp 0.5s 0.1s cubic-bezier(0.16,1,0.3,1) both; }
    .review-header { padding: 0.9rem 1.4rem; border-bottom: 1px solid var(--border); background: var(--bg-panel-raised); font-family: var(--f-disp); font-size: 0.95rem; font-weight: 700; color: var(--text-primary); }
    .review-item { padding: 1rem 1.4rem; border-bottom: 1px solid var(--border-lite); display: flex; gap: 1rem; align-items: flex-start; }
    .review-item:last-child { border-bottom: none; }
    .review-item.fail { background: rgba(220,38,38,0.025); }
    .review-num { font-family: var(--f-disp); font-size: 0.82rem; font-weight: 800; min-width: 2.2rem; padding-top: 0.15rem; color: var(--text-muted); flex-shrink: 0; }
    .review-item.ok .review-num { color: var(--success); } .review-item.fail .review-num { color: var(--error); }
    .review-body { flex: 1; min-width: 0; }
    .review-q { font-size: 0.84rem; font-weight: 600; color: var(--text-primary); margin-bottom: 0.35rem; line-height: 1.4; }
    .review-your { font-family: var(--f-code); font-size: 0.82rem; padding: 0.2rem 0.6rem; border-radius: var(--r-sm); display: inline-block; margin-bottom: 0.2rem; }
    .review-item.ok .review-your { background: var(--success-bg); color: var(--success); }
    .review-item.fail .review-your { background: var(--error-bg); color: var(--error); }
    .review-correct { font-family: var(--f-code); font-size: 0.82rem; color: var(--success); background: var(--success-bg); padding: 0.2rem 0.6rem; border-radius: var(--r-sm); display: inline-block; margin-bottom: 0.25rem; }
    .review-exp { font-size: 0.8rem; color: var(--text-muted); line-height: 1.55; margin-top: 0.15rem; }

    @keyframes qfadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes qslideIn { from { opacity: 0; transform: translateX(18px); } to { opacity: 1; transform: translateX(0); } }
    .q-slide { animation: qslideIn 0.28s cubic-bezier(0.16,1,0.3,1); }
  `;
  const styleEl = document.createElement('style'); styleEl.textContent = css; document.head.appendChild(styleEl);

  // ── Module palette (assigned by appearance order) ──
  const PALETTE = [
    ['#0d9488','rgba(13,148,136,.09)','rgba(13,148,136,.28)'],
    ['#0284c7','rgba(2,132,199,.09)','rgba(2,132,199,.28)'],
    ['#d97706','rgba(217,119,6,.09)','rgba(217,119,6,.28)'],
    ['#7c3aed','rgba(124,58,237,.09)','rgba(124,58,237,.28)'],
    ['#e11d48','rgba(225,29,72,.09)','rgba(225,29,72,.28)'],
    ['#059669','rgba(5,150,105,.09)','rgba(5,150,105,.28)'],
    ['#0891b2','rgba(8,145,178,.09)','rgba(8,145,178,.28)']
  ];
  const Q = D.questions, N = Q.length;
  const moduleOrder = [];
  Q.forEach(q => { if (!moduleOrder.includes(q.module)) moduleOrder.push(q.module); });
  const moduleColor = m => PALETTE[moduleOrder.indexOf(m) % PALETTE.length];
  const moduleLabel = m => (Q.find(q => q.module === m) || {}).moduleLabel || ('М' + m);

  const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

  // ── Build DOM ──
  const chips = moduleOrder.map(m => { const c = moduleColor(m);
    return `<span class="topic-chip" style="background:${c[1]};color:${c[0]};border-color:${c[2]}">${esc(moduleLabel(m))}</span>`; }).join('');

  const root = document.getElementById('quiz-root');
  root.innerHTML = `
    <div id="sc-start" class="quiz-screen active">
      <div class="start-card">
        <span class="start-hero">${D.hero || '📝'}</span>
        <h1>${esc(D.title)}</h1>
        <p class="start-sub">${esc(D.subtitle || (N + ' запитань — відповіді в кінці'))}</p>
        <div class="topic-chips">${chips}</div>
        <div class="start-note">
          <div class="note-pill">📋 ${N} питань</div>
          <div class="note-pill">🚫 Без таймера</div>
          <div class="note-pill">📊 Розбір наприкінці</div>
        </div>
        <div id="best-row" class="best-row"></div>
        <button id="btn-start" class="btn btn-primary btn-lg">Почати →</button>
        <p class="kbd-tip"><span class="kbd">1</span><span class="kbd">2</span><span class="kbd">3</span><span class="kbd">4</span> — вибір &nbsp;·&nbsp; <span class="kbd">Enter</span> — далі</p>
      </div>
    </div>

    <div id="sc-question" class="quiz-screen">
      <div class="q-card">
        <div class="q-prog-track"><div id="q-prog" class="q-prog-fill" style="width:0%"></div></div>
        <div class="q-header">
          <span id="q-counter" class="q-counter"></span>
          <span id="q-badge" class="q-badge"></span>
        </div>
        <div class="q-body" id="q-body">
          <div id="q-text" class="q-text"></div>
          <pre id="q-code" class="q-code" style="display:none"></pre>
          <div id="q-opts" class="opts"></div>
        </div>
        <div class="q-footer" id="q-footer" style="display:none">
          <button id="btn-next" class="btn btn-primary">Далі →</button>
        </div>
      </div>
    </div>

    <div id="sc-result" class="quiz-screen">
      <div class="result-top">
        <span id="r-emoji" class="r-emoji"></span>
        <div id="r-rank" class="r-rank"></div>
        <h1 id="r-title"></h1>
        <div id="r-score" class="r-score"></div>
        <div id="r-stars" class="r-stars"></div>
        <p id="r-msg" class="r-msg"></p>
        <div id="r-mods" class="r-mod-row"></div>
        <div class="r-buttons" id="r-buttons"></div>
      </div>
      <div class="review-section">
        <div class="review-header">📋 Розбір відповідей</div>
        <div id="review-list"></div>
      </div>
    </div>`;

  // ── nav-counter in navbar (if present) ──
  const navCounter = document.getElementById('nav-counter');
  const setNavCounter = t => { if (navCounter) navCounter.textContent = t; };
  setNavCounter('0 / ' + N);

  // ── Theme ──
  const THEMES = {
    indigo:['#4f46e5','rgba(79,70,229,0.16)','rgba(79,70,229,0.32)','rgba(79,70,229,0.07)','#4338ca'],
    emerald:['#059669','rgba(5,150,105,0.18)','rgba(5,150,105,0.32)','rgba(5,150,105,0.07)','#047857'],
    rose:['#e11d48','rgba(225,29,72,0.18)','rgba(225,29,72,0.32)','rgba(225,29,72,0.07)','#be123c'],
    amber:['#d97706','rgba(217,119,6,0.18)','rgba(217,119,6,0.32)','rgba(217,119,6,0.07)','#b45309'],
    cyan:['#0891b2','rgba(8,145,178,0.18)','rgba(8,145,178,0.32)','rgba(8,145,178,0.07)','#0e7490']
  };
  function applyTheme(n){ const t=THEMES[n]; if(!t) return; const r=document.documentElement;
    ['--accent','--accent-glow','--accent-border','--accent-soft','--accent-text'].forEach((p,i)=>r.style.setProperty(p,t[i]));
    document.querySelectorAll('.accent-dot').forEach(d=>d.classList.toggle('active',d.dataset.color===n));
    localStorage.setItem('pycode_theme_color',n); }
  document.querySelectorAll('.accent-dot').forEach(d=>d.addEventListener('click',()=>applyTheme(d.dataset.color)));
  applyTheme(localStorage.getItem('pycode_theme_color')||'indigo');

  // ── Confetti ──
  const cvs=document.getElementById('confetti-canvas'), cx=cvs.getContext('2d');
  let cPts=[], cId=null;
  function sizeCvs(){ cvs.width=innerWidth; cvs.height=innerHeight; } addEventListener('resize',sizeCvs); sizeCvs();
  class CP{ constructor(){ this.x=Math.random()*cvs.width; this.y=Math.random()*-cvs.height-20; this.w=Math.random()*9+4; this.h=Math.random()*5+3; this.c=`hsl(${Math.random()*360},78%,62%)`; this.vx=Math.random()*4-2; this.vy=Math.random()*5+3; this.r=Math.random()*360; this.rv=Math.random()*8-4; }
    step(){ this.x+=this.vx;this.y+=this.vy;this.r+=this.rv; }
    draw(){ cx.save();cx.translate(this.x,this.y);cx.rotate(this.r*Math.PI/180);cx.fillStyle=this.c;cx.fillRect(-this.w/2,-this.h/2,this.w,this.h);cx.restore(); } }
  function boom(n=180){ if(cId)cancelAnimationFrame(cId); cPts=Array.from({length:n},()=>new CP());
    (function loop(){ cx.clearRect(0,0,cvs.width,cvs.height); cPts.forEach(p=>{p.step();p.draw();}); cPts=cPts.filter(p=>p.y<cvs.height+20);
      if(cPts.length)cId=requestAnimationFrame(loop); else cx.clearRect(0,0,cvs.width,cvs.height); })(); }

  // ── Rank ladder (percentage-based) ──
  const RANKS = D.ranks || [
    {min:1.00, t:'Майстер', e:'👑', c:'#7c3aed'},
    {min:0.90, t:'Експерт', e:'🌟', c:'#0284c7'},
    {min:0.75, t:'Профі',   e:'⚡', c:'#059669'},
    {min:0.55, t:'Учень',   e:'🐍', c:'#d97706'},
    {min:0.35, t:'Початківець', e:'📚', c:'#4f46e5'},
    {min:0.00, t:'Новачок', e:'🐣', c:'#64748b'}
  ];
  function rankOf(score){ const pct=score/N; const r=RANKS.find(r=>pct>=r.min)||RANKS[RANKS.length-1];
    const hex=r.c; const bg=hexA(hex,.10), brd=hexA(hex,.35); return {t:r.t,e:r.e,c:hex,bg,b:brd}; }
  function hexA(hex,a){ const n=parseInt(hex.slice(1),16); return `rgba(${(n>>16)&255},${(n>>8)&255},${n&255},${a})`; }

  // ── State ──
  let idx=0, userAnswers=[];

  function show(id){ root.querySelectorAll('.quiz-screen').forEach(s=>s.classList.remove('active')); document.getElementById(id).classList.add('active'); }

  function loadBest(){ try{ const b=JSON.parse(localStorage.getItem(D.storageKey)); if(!b)return;
    const rk=rankOf(b.score); const el=document.getElementById('best-row');
    el.innerHTML=`🏅 Твій рекорд: <strong>${b.score}/${b.total}</strong> — ${rk.e} ${rk.t} &nbsp;·&nbsp; <span style="opacity:.65">${b.date}</span>`;
    el.style.display='block'; }catch(e){} }
  loadBest();

  function render(){
    const d=Q[idx];
    document.getElementById('q-prog').style.width=(idx/N*100)+'%';
    document.getElementById('q-counter').textContent=`Питання ${idx+1} / ${N}`;
    setNavCounter(`${idx+1} / ${N}`);
    const badge=document.getElementById('q-badge'); const c=moduleColor(d.module);
    badge.textContent=d.moduleLabel; badge.style.cssText=`background:${c[1]};color:${c[0]};border-color:${c[2]}`;
    document.getElementById('q-text').textContent=d.question;
    const codeEl=document.getElementById('q-code');
    if(d.code){ codeEl.textContent=d.code; codeEl.style.display='block'; } else codeEl.style.display='none';
    const L=['A','B','C','D'], optsEl=document.getElementById('q-opts'); optsEl.innerHTML='';
    d.options.forEach((opt,i)=>{ const b=document.createElement('button'); b.className='opt-btn';
      b.innerHTML=`<span class="opt-letter">${L[i]}</span>${esc(opt)}`;
      if(userAnswers[idx]===i) b.classList.add('picked');
      b.addEventListener('click',()=>pick(i)); optsEl.appendChild(b); });
    document.getElementById('q-footer').style.display = userAnswers[idx]!==undefined ? 'flex' : 'none';
    document.getElementById('btn-next').textContent = idx===N-1 ? 'Завершити →' : 'Далі →';
    const body=document.getElementById('q-body'); body.classList.remove('q-slide'); void body.offsetWidth; body.classList.add('q-slide');
  }
  function pick(sel){ userAnswers[idx]=sel;
    document.querySelectorAll('.opt-btn').forEach((b,i)=>b.classList.toggle('picked',i===sel));
    document.getElementById('q-footer').style.display='flex'; }
  function next(){ if(userAnswers[idx]===undefined) return; idx++; if(idx>=N) showResults(); else { render(); window.scrollTo({top:0,behavior:'smooth'}); } }

  function showResults(){
    document.getElementById('q-prog').style.width='100%';
    setNavCounter(`${N} / ${N}`);
    let score=0; const ms={};
    moduleOrder.forEach(m=>ms[m]={c:0,t:0});
    Q.forEach((q,i)=>{ ms[q.module].t++; if(userAnswers[i]===q.correct){ score++; ms[q.module].c++; } });
    const pct=score/N, rk=rankOf(score), stars=Math.max(0,Math.round(pct*5));

    let title,msg;
    if(score===N){ title='Бездоганно!'; msg=D.msgPerfect||'Усі відповіді правильні — тему засвоєно повністю! 🚀'; }
    else if(pct>=0.85){ title='Чудово!'; msg='Майже ідеально. Глянь розбір на питання, де схибив, і рушай далі.'; }
    else if(pct>=0.65){ title='Дуже добре!'; msg='Сильний результат. Розбір нижче закріпить решту.'; }
    else if(pct>=0.45){ title='Добре!'; msg='Основи є. Перечитай теми, де були помилки, за розбором нижче.'; }
    else { title='Варто повторити'; msg='Не здавайся! Повернись до матеріалу і пройди тест ще раз 💪'; }
    const sCls=pct>=0.65?'s-good':pct>=0.4?'s-ok':'s-bad';

    document.getElementById('r-emoji').textContent=rk.e;
    const rankEl=document.getElementById('r-rank'); rankEl.textContent=rk.t; rankEl.style.cssText=`background:${rk.bg};color:${rk.c};border-color:${rk.b}`;
    document.getElementById('r-title').textContent=title;
    document.getElementById('r-score').innerHTML=`<span class="${sCls}">${score}</span><span style="font-size:1.55rem;color:var(--text-muted);font-weight:400"> / ${N}</span>`;
    document.getElementById('r-stars').textContent='⭐'.repeat(stars)+'☆'.repeat(5-stars);
    document.getElementById('r-msg').textContent=msg;

    const mods=document.getElementById('r-mods'); mods.innerHTML='';
    moduleOrder.forEach(m=>{ const dd=ms[m]; const pill=document.createElement('span'); pill.className='r-mod-pill';
      const ok=dd.c===dd.t, half=dd.c>=dd.t/2;
      const col=ok?'#16a34a':half?'#d97706':'#dc2626';
      pill.style.cssText=`background:${hexA(col,.1)};color:${col};border-color:${hexA(col,.3)}`;
      pill.textContent=`${moduleLabel(m)}: ${dd.c}/${dd.t}`; mods.appendChild(pill); });

    // buttons
    const btns=document.getElementById('r-buttons'); btns.innerHTML='';
    if(D.nav&&D.nav.backHref){ const b=document.createElement('button'); b.className='btn btn-secondary';
      b.textContent=D.nav.backLabel||'← Назад'; b.onclick=()=>location.href=D.nav.backHref; btns.appendChild(b); }
    const retry=document.createElement('button'); retry.className='btn btn-secondary'; retry.textContent='🔄 Ще раз';
    retry.onclick=()=>{ setNavCounter('0 / '+N); show('sc-start'); loadBest(); window.scrollTo({top:0}); }; btns.appendChild(retry);
    if(D.nav&&D.nav.nextHref){ const b=document.createElement('button'); b.className='btn btn-success';
      b.textContent=D.nav.nextLabel||'Далі →'; b.onclick=()=>location.href=D.nav.nextHref; btns.appendChild(b); }

    const list=document.getElementById('review-list'); list.innerHTML='';
    Q.forEach((q,i)=>{ const sel=userAnswers[i], ok=sel===q.correct;
      const item=document.createElement('div'); item.className='review-item '+(ok?'ok':'fail');
      const yourText=sel!==undefined?q.options[sel]:'—', corrText=q.options[q.correct];
      item.innerHTML=`<div class="review-num">${i+1}${ok?' ✅':' ❌'}</div>
        <div class="review-body">
          <div class="review-q">${esc(q.question)}</div>
          <span class="review-your">${ok?'✅':'❌'} ${esc(yourText)}</span>
          ${!ok?`<br><span class="review-correct">✅ ${esc(corrText)}</span>`:''}
          ${!ok?`<div class="review-exp">${esc(q.explanation)}</div>`:''}
        </div>`;
      list.appendChild(item); });

    show('sc-result'); window.scrollTo({top:0,behavior:'smooth'});
    if(pct>=(D.confettiFrom!==undefined?D.confettiFrom:0.7)) boom(190);
    try{ const prev=JSON.parse(localStorage.getItem(D.storageKey)||'null');
      if(!prev||score>prev.score) localStorage.setItem(D.storageKey,JSON.stringify({score,total:N,date:new Date().toLocaleDateString('uk-UA')})); }catch(e){}
  }

  function startQuiz(){ idx=0; userAnswers=[]; show('sc-question'); render(); window.scrollTo({top:0}); }
  document.getElementById('btn-start').addEventListener('click', startQuiz);
  document.getElementById('btn-next').addEventListener('click', next);

  document.addEventListener('keydown', e=>{
    const active=root.querySelector('.quiz-screen.active'); if(!active) return;
    if(active.id==='sc-start' && (e.key==='Enter'||e.key===' ')){ e.preventDefault(); startQuiz(); return; }
    if(active.id!=='sc-question') return;
    if('1234'.includes(e.key)){ const i=parseInt(e.key)-1; const b=document.querySelectorAll('.opt-btn')[i]; if(b) b.click(); }
    if((e.key==='Enter'||e.key===' ') && userAnswers[idx]!==undefined){ e.preventDefault(); next(); }
  });
})();
