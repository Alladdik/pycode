// ── Duolingo-стиль тренажер: спільний рушій (test7/8/9) ──
// Очікує глобальний quizData = { title, subtitle, hero, storageKey, confettiFrom?, nav:{backLabel,backHref,nextLabel,nextHref}, exercises:[...] }
// Типи вправ: choice | input | fill | indent | order
(function () {
  const cfg = window.quizData;
  const nav = cfg.nav || {};

  // ── Theme ──
  const THEMES = {
    indigo:  ['#4f46e5','rgba(79,70,229,0.16)','rgba(79,70,229,0.32)','rgba(79,70,229,0.07)','#4338ca'],
    emerald: ['#059669','rgba(5,150,105,0.18)','rgba(5,150,105,0.32)','rgba(5,150,105,0.07)','#047857'],
    rose:    ['#e11d48','rgba(225,29,72,0.18)','rgba(225,29,72,0.32)','rgba(225,29,72,0.07)','#be123c'],
    amber:   ['#d97706','rgba(217,119,6,0.18)','rgba(217,119,6,0.32)','rgba(217,119,6,0.07)','#b45309'],
    cyan:    ['#0891b2','rgba(8,145,178,0.18)','rgba(8,145,178,0.32)','rgba(8,145,178,0.07)','#0e7490']
  };
  function applyTheme(n){ const t=THEMES[n]; if(!t) return; const r=document.documentElement;
    ['--accent','--accent-glow','--accent-border','--accent-soft','--accent-text'].forEach((p,i)=>r.style.setProperty(p,t[i]));
    document.querySelectorAll('.accent-dot').forEach(d=>d.classList.toggle('active',d.dataset.color===n));
    localStorage.setItem('pycode_theme_color',n); }
  document.querySelectorAll('.accent-dot').forEach(d=>d.addEventListener('click',()=>applyTheme(d.dataset.color)));
  applyTheme(localStorage.getItem('pycode_theme_color')||'indigo');

  // ── Populate text/nav from config ──
  const setText = (id,txt)=>{ const el=document.getElementById(id); if(el) el.textContent=txt; };
  setText('start-hero', cfg.hero || '🎮');
  setText('start-title', cfg.title || 'Тренажер');
  setText('start-sub', cfg.subtitle || '12 коротких вправ у стилі Duolingo');
  const wireNav = (id, label, href) => { const b=document.getElementById(id);
    if(b){ if(label) b.textContent=label; if(href) b.onclick=()=>location.href=href; } };
  wireNav('nav-back', nav.backLabel, nav.backHref);
  wireNav('nav-next', nav.nextLabel, nav.nextHref);
  wireNav('result-next', nav.nextLabel, nav.nextHref);

  // ── Confetti ──
  const cvs=document.getElementById('confetti-canvas'), cx=cvs.getContext('2d');
  let cPts=[], cId=null;
  function sizeCvs(){ cvs.width=innerWidth; cvs.height=innerHeight; } addEventListener('resize',sizeCvs); sizeCvs();
  class CP{ constructor(){ this.x=Math.random()*cvs.width; this.y=Math.random()*-cvs.height-20; this.w=Math.random()*9+4; this.h=Math.random()*5+3; this.c=`hsl(${Math.random()*360},78%,62%)`; this.vx=Math.random()*4-2; this.vy=Math.random()*5+3; this.r=Math.random()*360; this.rv=Math.random()*8-4; }
    step(){ this.x+=this.vx;this.y+=this.vy;this.r+=this.rv; }
    draw(){ cx.save();cx.translate(this.x,this.y);cx.rotate(this.r*Math.PI/180);cx.fillStyle=this.c;cx.fillRect(-this.w/2,-this.h/2,this.w,this.h);cx.restore(); } }
  function boom(n=140){ if(cId)cancelAnimationFrame(cId); cPts=Array.from({length:n},()=>new CP());
    (function loop(){ cx.clearRect(0,0,cvs.width,cvs.height); cPts.forEach(p=>{p.step();p.draw();}); cPts=cPts.filter(p=>p.y<cvs.height+20);
      if(cPts.length)cId=requestAnimationFrame(loop); else cx.clearRect(0,0,cvs.width,cvs.height); })(); }

  // ── State ──
  const EX = cfg.exercises, N = EX.length;
  let idx = 0;
  let results = [];          // bool per exercise
  let answered = false;      // current exercise checked?
  let state = {};            // working answer state for current ex

  const TYPE_LABEL = { choice:'🔘 Вибір', input:'⌨️ Введи відповідь', fill:'🧩 Заповни пропуск', indent:'↹ Табуляція', order:'🔀 Збери код' };

  function show(id){ document.querySelectorAll('.quiz-screen').forEach(s=>s.classList.remove('active')); document.getElementById(id).classList.add('active'); }

  // ── Rank ──
  function rank(s){
    if(s===N)        return {t:'Code Ninja',   e:'🥷',bg:'rgba(124,58,237,.1)',c:'#7c3aed',b:'rgba(124,58,237,.35)'};
    if(s>=N-2)       return {t:'Number Wizard', e:'🧙',bg:'rgba(2,132,199,.1)', c:'#0284c7',b:'rgba(2,132,199,.35)'};
    if(s>=Math.ceil(N*0.66)) return {t:'Digit Master', e:'⚡',bg:'rgba(5,150,105,.1)', c:'#059669',b:'rgba(5,150,105,.35)'};
    if(s>=Math.ceil(N*0.4))  return {t:'Учень Python', e:'🐍',bg:'rgba(217,119,6,.1)', c:'#d97706',b:'rgba(217,119,6,.35)'};
    return         {t:'Новачок',          e:'🐣',bg:'rgba(100,116,139,.1)',c:'#64748b',b:'rgba(100,116,139,.3)'};
  }

  function loadBest(){ try{ const b=JSON.parse(localStorage.getItem(cfg.storageKey)); if(!b)return;
    const rk=rank(b.score); const el=document.getElementById('best-row');
    el.innerHTML=`🏅 Твій рекорд: <strong>${b.score}/${b.total}</strong> — ${rk.e} ${rk.t} &nbsp;·&nbsp; <span style="opacity:.65">${b.date}</span>`;
    el.style.display='block'; }catch(e){} }
  loadBest();

  // ── Segmented bar ──
  function renderSeg(){
    const bar=document.getElementById('seg-bar'); bar.innerHTML='';
    for(let i=0;i<N;i++){ const s=document.createElement('div'); s.className='seg';
      if(i<idx){ if(results[i]===true) s.classList.add('done'); else if(results[i]===false) s.classList.add('miss'); }
      else if(i===idx) s.classList.add(answered ? (results[i]?'done':'miss') : 'cur');
      bar.appendChild(s); }
  }

  const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

  // ── Render current exercise ──
  function render(){
    const ex = EX[idx];
    answered = false; state = {};
    document.getElementById('ex-type-badge').textContent = TYPE_LABEL[ex.type];
    document.getElementById('ex-counter').textContent = `${idx+1} / ${N}`;
    document.getElementById('nav-counter').textContent = `${idx+1} / ${N}`;
    renderSeg();

    const chk=document.getElementById('btn-check'), nxt=document.getElementById('btn-next');
    chk.style.display='inline-flex'; chk.disabled=true; chk.textContent='Перевірити';
    nxt.style.display='none'; nxt.textContent = idx===N-1 ? 'Завершити →' : 'Далі →';

    const body=document.getElementById('ex-body');
    body.innerHTML = `<div class="ex-prompt">${esc(ex.prompt)}</div>` + buildBody(ex) +
      `<div id="ex-feedback" class="ex-feedback"></div>`;
    body.classList.remove('slide-in'); void body.offsetWidth; body.classList.add('slide-in');

    wireBody(ex);
  }

  // Build inner HTML per type
  function buildBody(ex){
    const codeBlock = ex.code ? `<pre class="ex-code">${esc(ex.code)}</pre>` : '';
    if(ex.type==='choice'){
      const L=['A','B','C','D'];
      return codeBlock +
        `<div class="opts">${ex.options.map((o,i)=>`<button class="opt-btn" data-i="${i}"><span class="opt-letter">${L[i]}</span>${esc(o)}</button>`).join('')}</div>`;
    }
    if(ex.type==='input'){
      return codeBlock +
        `<input id="ex-input" class="ex-input" type="text" autocomplete="off" spellcheck="false" placeholder="твоя відповідь…">`;
    }
    if(ex.type==='fill'){
      const parts = ex.code.split('▢');
      const codeHtml = esc(parts[0]) + `<span id="blank" class="blank-slot">?</span>` + esc(parts[1]||'');
      return `<div class="fill-code">${codeHtml}</div>
        <div class="token-bank">${ex.bank.map((t,i)=>`<button class="token" data-t="${esc(t)}" data-i="${i}">${esc(t)}</button>`).join('')}</div>`;
    }
    if(ex.type==='indent'){
      return `<div class="indent-list">${ex.lines.map((ln,i)=>`
          <div class="indent-row" data-i="${i}">
              <div class="indent-ctrls">
                  <button class="ind-btn ind-left" title="менше відступ">‹</button>
                  <button class="ind-btn ind-right" title="більше відступ">›</button>
              </div>
              <span class="ind-dot" id="dot-${i}">0</span>
              <div class="indent-code" id="code-${i}">${esc(ln.t)}</div>
          </div>`).join('')}</div>`;
    }
    if(ex.type==='order'){
      // shuffle bank order (indices into ex.lines)
      let order=[...ex.lines.keys()];
      do { for(let i=order.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [order[i],order[j]]=[order[j],order[i]]; } }
      while(order.every((v,i)=>v===i) && ex.lines.length>1);
      state.shuffle = order;
      return `<div id="order-zone" class="order-zone"><div class="order-zone-empty">Натискай рядки знизу, щоб зібрати їх тут ↓</div></div>
        <div id="order-bank" class="order-bank">${order.map(li=>`<div class="bank-line" data-li="${li}">${esc(ex.lines[li])}</div>`).join('')}</div>`;
    }
    return '';
  }

  // Wire events per type
  function wireBody(ex){
    const chk=document.getElementById('btn-check');
    if(ex.type==='choice'){
      document.querySelectorAll('.opt-btn').forEach(b=>b.addEventListener('click',()=>{
        if(answered) return;
        document.querySelectorAll('.opt-btn').forEach(x=>x.classList.remove('picked'));
        b.classList.add('picked'); state.sel=parseInt(b.dataset.i); chk.disabled=false;
      }));
    }
    else if(ex.type==='input'){
      const inp=document.getElementById('ex-input');
      inp.addEventListener('input',()=>{ chk.disabled = inp.value.trim()===''; });
      setTimeout(()=>inp.focus(),20);
    }
    else if(ex.type==='fill'){
      const slot=document.getElementById('blank');
      document.querySelectorAll('.token').forEach(t=>t.addEventListener('click',()=>{
        if(answered) return;
        document.querySelectorAll('.token').forEach(x=>x.classList.remove('used'));
        t.classList.add('used');
        slot.textContent=t.dataset.t; slot.classList.add('filled');
        state.fill=t.dataset.t; chk.disabled=false;
      }));
      slot.addEventListener('click',()=>{ if(answered) return;
        slot.textContent='?'; slot.classList.remove('filled'); state.fill=undefined;
        document.querySelectorAll('.token').forEach(x=>x.classList.remove('used')); chk.disabled=true; });
    }
    else if(ex.type==='indent'){
      state.levels = ex.lines.map(()=>0);
      chk.disabled=false; // zero indent is a valid (checkable) submission
      document.querySelectorAll('.indent-row').forEach(row=>{
        const i=parseInt(row.dataset.i);
        const apply=()=>{ document.getElementById('code-'+i).style.paddingLeft=(0.8+state.levels[i]*1.6)+'rem';
          document.getElementById('dot-'+i).textContent=state.levels[i]; };
        row.querySelector('.ind-right').addEventListener('click',()=>{ if(answered)return; if(state.levels[i]<3){state.levels[i]++; apply();} });
        row.querySelector('.ind-left').addEventListener('click',()=>{ if(answered)return; if(state.levels[i]>0){state.levels[i]--; apply();} });
      });
    }
    else if(ex.type==='order'){
      state.seq=[];
      const zone=document.getElementById('order-zone');
      const refresh=()=>{
        zone.innerHTML = state.seq.length ? '' : '<div class="order-zone-empty">Натискай рядки знизу, щоб зібрати їх тут ↓</div>';
        zone.classList.toggle('has-items', state.seq.length>0);
        state.seq.forEach((li,pos)=>{
          const d=document.createElement('div'); d.className='order-line';
          d.innerHTML=`<span class="ol-idx">${pos+1}</span><span>${esc(ex.lines[li])}</span>`;
          d.addEventListener('click',()=>{ if(answered)return;
            state.seq.splice(pos,1);
            document.querySelector(`.bank-line[data-li="${li}"]`).classList.remove('used');
            refresh(); });
          zone.appendChild(d);
        });
        chk.disabled = state.seq.length !== ex.lines.length;
      };
      document.querySelectorAll('.bank-line').forEach(b=>b.addEventListener('click',()=>{
        if(answered) return;
        const li=parseInt(b.dataset.li);
        if(b.classList.contains('used')) return;
        b.classList.add('used'); state.seq.push(li); refresh();
      }));
    }
  }

  // ── Check current exercise ──
  function checkEx(){
    if(answered) return;
    const ex=EX[idx];
    let ok=false, correctText='';

    if(ex.type==='choice'){
      ok = state.sel===ex.correct;
      correctText = ex.options[ex.correct];
      document.querySelectorAll('.opt-btn').forEach(b=>{ b.classList.add('locked');
        const i=parseInt(b.dataset.i);
        if(i===ex.correct) b.classList.add('correct');
        else if(i===state.sel) b.classList.add('wrong');
        b.classList.remove('picked');
      });
    }
    else if(ex.type==='input'){
      const inp=document.getElementById('ex-input');
      const val=inp.value.trim().toLowerCase();
      const accepts=[String(ex.answer).toLowerCase(), ...(ex.accept||[]).map(a=>String(a).toLowerCase())];
      ok = accepts.includes(val);
      correctText = ex.answer;
      inp.disabled=true; inp.classList.add(ok?'correct':'wrong');
    }
    else if(ex.type==='fill'){
      ok = state.fill===ex.answer;
      correctText = ex.answer;
      const slot=document.getElementById('blank');
      slot.classList.remove('filled'); slot.classList.add(ok?'correct':'wrong');
      if(!ok) slot.textContent=ex.answer;
      document.querySelectorAll('.token').forEach(t=>t.classList.add('locked'));
    }
    else if(ex.type==='indent'){
      const want=ex.lines.map(l=>l.lvl);
      ok = state.levels.every((v,i)=>v===want[i]);
      correctText = ex.lines.map(l=>'▸'.repeat(l.lvl)+(l.lvl?' ':'')+l.t).join('   /   ');
      ex.lines.forEach((l,i)=>{
        const codeEl=document.getElementById('code-'+i);
        codeEl.classList.add(state.levels[i]===l.lvl ? 'correct' : 'wrong');
      });
      document.querySelectorAll('.ind-btn').forEach(b=>b.disabled=true);
    }
    else if(ex.type==='order'){
      ok = state.seq.length===ex.lines.length && state.seq.every((li,pos)=>li===pos);
      correctText = ex.lines.join('  ·  ');
      document.querySelectorAll('#order-zone .order-line').forEach((d,pos)=>{
        d.classList.add('locked'); d.classList.add(state.seq[pos]===pos?'ok':'bad');
      });
      document.querySelectorAll('.bank-line').forEach(b=>b.classList.add('locked'));
    }

    answered=true;
    results[idx]=ok;

    // feedback
    const fb=document.getElementById('ex-feedback');
    fb.className='ex-feedback show '+(ok?'good':'bad');
    if(ok){
      const cheers=['Чудово! 🎉','Точно! ✨','Так тримати! 💪','Бездоганно! 🌟','Вірно! 🔥'];
      fb.innerHTML=`<div class="fb-title">✅ ${cheers[Math.floor(Math.random()*cheers.length)]}</div><div class="fb-exp">${esc(ex.explain)}</div>`;
      boom(90);
    } else {
      fb.innerHTML=`<div class="fb-title">💡 Майже!</div>
          <div>Правильно: <span class="fb-correct">${esc(correctText)}</span></div>
          <div class="fb-exp">${esc(ex.explain)}</div>`;
      const card=document.querySelector('.ex-card'); card.classList.remove('shake'); void card.offsetWidth; card.classList.add('shake');
    }

    renderSeg();
    document.getElementById('btn-check').style.display='none';
    const nxt=document.getElementById('btn-next'); nxt.style.display='inline-flex'; nxt.focus();
  }

  function nextEx(){
    idx++;
    if(idx>=N) showResults();
    else { render(); window.scrollTo({top:0,behavior:'smooth'}); }
  }

  document.getElementById('btn-check').addEventListener('click', checkEx);
  document.getElementById('btn-next').addEventListener('click', nextEx);

  // ── Results ──
  function showResults(){
    document.getElementById('nav-counter').textContent=`${N} / ${N}`;
    const score=results.filter(Boolean).length;
    const pct=score/N, rk=rank(score), stars=Math.round(pct*5);
    const nextWord = (nav.nextLabel || 'далі').replace(/[→⭐\s]+$/,'').trim() || 'далі';
    let title,msg;
    if(score===N){ title='Усе вірно!'; msg=`${N} з ${N} — бездоганно! Можеш упевнено рушати до «${nextWord}». 🚀`; }
    else if(score>=N-2){ title='Майже ідеально!'; msg='Сильний результат. Глянь розбір нижче — і сміливо рушай далі.'; }
    else if(score>=Math.ceil(N*0.66)){ title='Дуже добре!'; msg='Гарна робота. Перечитай, де помилився, і йди далі.'; }
    else if(score>=Math.ceil(N*0.4)){ title='Непогано!'; msg='База є. Подивись розбір вправ — і за бажання пройди тренажер ще раз.'; }
    else { title='Ще трохи практики'; msg='Повтори матеріал модуля і повертайся — з другого разу буде краще 💪'; }
    const sCls=score>=N-2?'s-good':score>=Math.ceil(N*0.5)?'s-ok':'s-bad';

    document.getElementById('r-emoji').textContent=rk.e;
    const rankEl=document.getElementById('r-rank'); rankEl.textContent=rk.t; rankEl.style.cssText=`background:${rk.bg};color:${rk.c};border-color:${rk.b}`;
    document.getElementById('r-title').textContent=title;
    document.getElementById('r-score').innerHTML=`<span class="${sCls}">${score}</span><span style="font-size:1.55rem;color:var(--text-muted);font-weight:400"> / ${N}</span>`;
    document.getElementById('r-stars').textContent='⭐'.repeat(stars)+'☆'.repeat(5-stars);
    document.getElementById('r-msg').textContent=msg;

    const list=document.getElementById('review-list'); list.innerHTML='';
    EX.forEach((ex,i)=>{ const ok=results[i];
      const item=document.createElement('div'); item.className='review-item '+(ok?'ok':'fail');
      item.innerHTML=`<div class="review-num">${i+1}${ok?' ✅':' ❌'}</div>
          <div><div class="review-q">${esc(ex.prompt)} <span style="opacity:.55;font-weight:600">[${TYPE_LABEL[ex.type]}]</span></div>
          ${!ok?`<div class="review-exp">${esc(ex.explain)}</div>`:''}</div>`;
      list.appendChild(item); });

    show('sc-result'); window.scrollTo({top:0,behavior:'smooth'});
    const confettiAt = Math.ceil((cfg.confettiFrom != null ? cfg.confettiFrom : 0.75) * N);
    if(score>=confettiAt) boom(180);
    try{ const prev=JSON.parse(localStorage.getItem(cfg.storageKey)||'null');
      if(!prev||score>prev.score) localStorage.setItem(cfg.storageKey,JSON.stringify({score,total:N,date:new Date().toLocaleDateString('uk-UA')})); }catch(e){}
  }

  // ── Start / Retry ──
  function startQuiz(){ idx=0; results=[]; show('sc-ex'); render(); window.scrollTo({top:0}); }
  document.getElementById('btn-start').addEventListener('click', startQuiz);
  document.getElementById('btn-retry').addEventListener('click', ()=>{ document.getElementById('nav-counter').textContent='0 / '+N; show('sc-start'); loadBest(); window.scrollTo({top:0}); });

  // ── Keyboard ──
  document.addEventListener('keydown', e=>{
    const active=document.querySelector('.quiz-screen.active'); if(!active) return;
    if(active.id==='sc-start' && (e.key==='Enter'||e.key===' ')){ e.preventDefault(); startQuiz(); return; }
    if(active.id!=='sc-ex') return;
    const ex=EX[idx];
    // number keys pick choice option
    if(!answered && ex.type==='choice' && '1234'.includes(e.key)){
      const i=parseInt(e.key)-1; const b=document.querySelector(`.opt-btn[data-i="${i}"]`); if(b) b.click();
    }
    if(e.key==='Enter'){
      e.preventDefault();
      if(answered){ nextEx(); }
      else if(!document.getElementById('btn-check').disabled){ checkEx(); }
    }
  });
})();
