// SHARED ENGINE — used by modules 3+
// Each lessonN-data.js must define: lessons, handbookData, STORAGE_PREFIX, FINAL_CODE

let currentLessonIndex = 0;
let completedLessons = [];
let codeEditor = null;
let currentRunTerminalLogs = [];
let accumulatedOutput = "";
let currentLineElement = null;
let currentHintIndex = 0;

const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let animationFrameId = null;

function resizeCanvas() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class ConfettiParticle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * -canvas.height - 20;
    this.size = Math.random() * 8 + 6;
    this.color = `hsl(${Math.random() * 360}, 80%, 60%)`;
    this.speedX = Math.random() * 4 - 2;
    this.speedY = Math.random() * 5 + 4;
    this.rotation = Math.random() * 360;
    this.rotationSpeed = Math.random() * 10 - 5;
  }
  update() { this.x += this.speedX; this.y += this.speedY; this.rotation += this.rotationSpeed; }
  draw() {
    ctx.save(); ctx.translate(this.x, this.y); ctx.rotate(this.rotation * Math.PI / 180);
    ctx.fillStyle = this.color; ctx.fillRect(-this.size/2, -this.size/2, this.size, this.size);
    ctx.restore();
  }
}
function startConfetti() {
  if (animationFrameId) cancelAnimationFrame(animationFrameId);
  particles = [];
  for (let i = 0; i < 150; i++) particles.push(new ConfettiParticle());
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let active = false;
    particles.forEach(p => { p.update(); p.draw(); if (p.y < canvas.height) active = true; });
    if (active) animationFrameId = requestAnimationFrame(animate);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  animate();
}

const themeColors = {
  indigo:  { accent:'#4f46e5', accentGlow:'rgba(79,70,229,0.16)',  accentBorder:'rgba(79,70,229,0.32)',  accentSoft:'rgba(79,70,229,0.07)',  accentText:'#4338ca' },
  emerald: { accent:'#059669', accentGlow:'rgba(5,150,105,0.18)',  accentBorder:'rgba(5,150,105,0.32)',  accentSoft:'rgba(5,150,105,0.07)',  accentText:'#047857' },
  rose:    { accent:'#e11d48', accentGlow:'rgba(225,29,72,0.18)',  accentBorder:'rgba(225,29,72,0.32)',  accentSoft:'rgba(225,29,72,0.07)',  accentText:'#be123c' },
  amber:   { accent:'#d97706', accentGlow:'rgba(217,119,6,0.18)',  accentBorder:'rgba(217,119,6,0.32)',  accentSoft:'rgba(217,119,6,0.07)',  accentText:'#b45309' },
  cyan:    { accent:'#0891b2', accentGlow:'rgba(8,145,178,0.18)',  accentBorder:'rgba(8,145,178,0.32)', accentSoft:'rgba(8,145,178,0.07)', accentText:'#0e7490' }
};
function setThemeAccent(colorName) {
  const t = themeColors[colorName]; if (!t) return;
  const r = document.documentElement;
  r.style.setProperty('--accent', t.accent); r.style.setProperty('--accent-glow', t.accentGlow);
  r.style.setProperty('--accent-border', t.accentBorder); r.style.setProperty('--accent-soft', t.accentSoft);
  r.style.setProperty('--accent-text', t.accentText);
  document.querySelectorAll('.accent-dot').forEach(d => d.classList.toggle('active', d.getAttribute('data-color') === colorName));
  localStorage.setItem('pycode_theme_color', colorName);
}

function printToTerminal(text, type = 'output') {
  const body = document.getElementById('terminal-body');
  const parts = text.split('\n');
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (part === '' && i === parts.length - 1) { currentLineElement = null; break; }
    if (!currentLineElement) {
      currentLineElement = document.createElement('div');
      currentLineElement.className = `terminal-line ${type}`;
      body.appendChild(currentLineElement);
    }
    currentLineElement.textContent += part;
    if (i < parts.length - 1) currentLineElement = null;
  }
  body.scrollTop = body.scrollHeight;
}

function promptTerminal(promptText) {
  const body = document.getElementById('terminal-body');
  return new Promise(resolve => {
    const container = document.createElement('div');
    container.className = 'terminal-input-container';
    if (promptText) {
      const ps = document.createElement('span');
      ps.className = 'terminal-prompt-text'; ps.textContent = promptText;
      container.appendChild(ps);
    }
    const inp = document.createElement('input');
    inp.type = 'text'; inp.className = 'terminal-input-active';
    inp.setAttribute('autocomplete', 'off'); inp.setAttribute('spellcheck', 'false');
    container.appendChild(inp); body.appendChild(container);
    body.scrollTop = body.scrollHeight;
    setTimeout(() => inp.focus(), 10);
    inp.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const value = inp.value;
        inp.disabled = true; inp.className = 'terminal-input-submitted';
        inp.style.color = '#e2e8f0'; inp.style.fontWeight = 'normal';
        currentRunTerminalLogs.push({ type: 'input', value });
        currentLineElement = null;
        resolve(value);
      }
    });
    inp.addEventListener('paste', e => {
      const text = (e.clipboardData || window.clipboardData).getData('text');
      if (text.includes('\n') || text.includes('\r')) {
        e.preventDefault(); inp.value = text.split(/\r?\n/)[0];
        inp.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
      }
    });
  });
}

function builtinRead(x) {
  if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
    throw "File not found: '" + x + "'";
  return Sk.builtinFiles["files"][x];
}

function renderHint(index) {
  const hints = lessons[currentLessonIndex].hints;
  const total = hints.length;
  const counter = document.getElementById('hint-counter');
  if (total > 1) { counter.textContent = `${index+1} / ${total}`; counter.style.display = 'inline-block'; }
  else counter.style.display = 'none';
  document.getElementById('hint-modal-body').innerHTML = `<div class="hint-text-box">${hints[index]}</div>`;
  document.getElementById('prev-hint-btn').style.display = index > 0 ? 'inline-flex' : 'none';
  const isLast = index === total - 1;
  document.getElementById('next-hint-btn').style.display = isLast ? 'none' : 'inline-flex';
  document.getElementById('close-hint-footer-btn').style.display = isLast ? 'inline-flex' : 'none';
}

function initApp() {
  while (completedLessons.length < lessons.length) completedLessons.push(false);

  codeEditor = CodeMirror.fromTextArea(document.getElementById('code-textarea'), {
    mode: { name: "python", version: 3 }, theme: "eclipse", lineNumbers: true,
    indentUnit: 4, tabSize: 4, lineWrapping: true,
    extraKeys: { "Tab": cm => cm.replaceSelection(Array(cm.getOption("indentUnit")+1).join(" ")) }
  });
  codeEditor.on('change', () => localStorage.setItem(`${STORAGE_PREFIX}draft_${currentLessonIndex}`, codeEditor.getValue()));

  document.querySelectorAll('.accent-dot').forEach(d => d.addEventListener('click', e => setThemeAccent(e.target.getAttribute('data-color'))));
  setThemeAccent(localStorage.getItem('pycode_theme_color') || 'indigo');

  loadProgress(); loadLesson(currentLessonIndex); renderProgressPills();

  const hintModal = document.getElementById('hint-modal');
  const openHint = () => { currentHintIndex = 0; renderHint(0); hintModal.classList.add('open'); };
  const closeHint = () => hintModal.classList.remove('open');
  document.getElementById('prev-hint-btn').addEventListener('click', () => { if (currentHintIndex > 0) { currentHintIndex--; renderHint(currentHintIndex); } });
  document.getElementById('next-hint-btn').addEventListener('click', () => { if (currentHintIndex < lessons[currentLessonIndex].hints.length - 1) { currentHintIndex++; renderHint(currentHintIndex); } });
  document.getElementById('show-hint-btn').addEventListener('click', openHint);
  document.getElementById('close-hint-btn').addEventListener('click', closeHint);
  document.getElementById('close-hint-footer-btn').addEventListener('click', closeHint);
  hintModal.addEventListener('click', e => { if (e.target === hintModal) closeHint(); });

  const hbDrawer = document.getElementById('handbook-drawer');
  document.getElementById('handbook-btn').addEventListener('click', () => { hbDrawer.classList.add('open'); loadHandbookTab('variables'); });
  document.getElementById('close-handbook-btn').addEventListener('click', () => hbDrawer.classList.remove('open'));
  hbDrawer.addEventListener('click', e => { if (e.target === hbDrawer) hbDrawer.classList.remove('open'); });
  document.querySelectorAll('.drawer-tabs .tab-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      document.querySelectorAll('.drawer-tabs .tab-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      loadHandbookTab(e.target.getAttribute('data-tab'));
    });
  });

  document.getElementById('run-btn').addEventListener('click', runCurrentCode);
  document.getElementById('reset-btn').addEventListener('click', resetCurrentCode);
  document.getElementById('next-btn').addEventListener('click', loadNextLesson);
  document.getElementById('clear-terminal-btn').addEventListener('click', clearTerminal);

  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      const runBtn = document.getElementById('run-btn');
      if (!runBtn.disabled) runCurrentCode();
    }
    if (e.key === 'Escape') {
      document.getElementById('hint-modal').classList.remove('open');
      document.getElementById('handbook-drawer').classList.remove('open');
    }
  });

  const tb = document.getElementById('terminal-body');
  if (tb) {
    tb.addEventListener('click', e => {
      const ai = document.querySelector('.terminal-input-active');
      if (!ai || e.target === ai || ai.contains(e.target)) return;
      if (window.getSelection()?.toString().trim()) return;
      ai.focus(); ai.setSelectionRange(ai.value.length, ai.value.length);
    });
  }
  document.addEventListener('keydown', e => {
    const ai = document.querySelector('.terminal-input-active'); if (!ai) return;
    const t = e.target;
    if (t.tagName==='INPUT'||t.tagName==='TEXTAREA'||t.isContentEditable||t.closest('.CodeMirror')||t.closest('.modal-card')) return;
    const isMeta = e.ctrlKey || e.metaKey;
    if ((isMeta && e.key.toLowerCase()==='v')||(e.shiftKey&&e.key==='Insert')) { ai.focus(); ai.setSelectionRange(ai.value.length,ai.value.length); return; }
    if (isMeta && e.key.toLowerCase()==='a') { e.preventDefault(); ai.focus(); ai.select(); return; }
    if (!isMeta && !e.altKey && e.key.length===1) { ai.focus(); ai.setSelectionRange(ai.value.length,ai.value.length); }
  });
}

function loadHandbookTab(key) {
  const body = document.getElementById('handbook-body');
  if (handbookData[key]) { body.innerHTML = handbookData[key]; body.scrollTop = 0; }
}

function loadProgress() {
  const si = localStorage.getItem(`${STORAGE_PREFIX}current_index`);
  if (si !== null) currentLessonIndex = parseInt(si);
  const sc = localStorage.getItem(`${STORAGE_PREFIX}completed`);
  if (sc !== null) {
    completedLessons = JSON.parse(sc);
    while (completedLessons.length < lessons.length) completedLessons.push(false);
  }
}
function saveProgress() {
  localStorage.setItem(`${STORAGE_PREFIX}current_index`, currentLessonIndex);
  localStorage.setItem(`${STORAGE_PREFIX}completed`, JSON.stringify(completedLessons));
}

function loadLesson(index) {
  currentLessonIndex = index; saveProgress();
  const lesson = lessons[index];
  const lb = document.getElementById('level-badge');
  const levelFn = typeof MODULE_LEVEL === 'function' ? MODULE_LEVEL : defaultLevel;
  const [text, cls] = levelFn(index);
  lb.textContent = text; lb.className = `badge ${cls}`;
  document.getElementById('lesson-indicator').textContent = `Урок ${lesson.id}/${lessons.length}`;
  const tc = document.getElementById('theory-content');
  tc.classList.remove('fade-in-up'); void tc.offsetWidth; tc.classList.add('fade-in-up');
  tc.innerHTML = `<span style="font-size:0.73rem;font-weight:700;text-transform:uppercase;color:var(--accent);letter-spacing:0.8px;opacity:0.85;">${lesson.subtitle}</span>${lesson.theory}`;
  tc.scrollTop = 0;
  const draft = localStorage.getItem(`${STORAGE_PREFIX}draft_${index}`);
  codeEditor.setValue(draft !== null ? draft : lesson.initialCode);
  codeEditor.refresh(); setTimeout(() => codeEditor.focus(), 50);
  renderProgressPills(); updateNextButtonState();
}

function defaultLevel(index) {
  if (index < 3) return ['Основи 🔰', 'badge-indigo'];
  if (index < 6) return ['Практика ⚙️', 'badge-blue'];
  if (index < 8) return ['Виклики 🏆', 'badge-indigo'];
  return ['Домашнє 🏠', 'badge-indigo'];
}

function renderProgressPills() {
  const c = document.getElementById('progress-steps'); c.innerHTML = '';
  lessons.forEach((l, i) => {
    const p = document.createElement('div'); p.className = 'step-pill'; p.textContent = l.id;
    if (i === currentLessonIndex) p.classList.add('active');
    if (completedLessons[i]) p.classList.add('completed');
    p.addEventListener('click', () => loadLesson(i));
    c.appendChild(p);
  });
}
function updateNextButtonState() {
  const nb = document.getElementById('next-btn');
  if (currentLessonIndex < lessons.length - 1) nb.removeAttribute('disabled');
  else nb.setAttribute('disabled', 'true');
}

function runCurrentCode() {
  const code = codeEditor.getValue();
  const runBtn = document.getElementById('run-btn');
  runBtn.disabled = true;
  runBtn.innerHTML = '<span class="run-spinner"></span><span>Виконання...</span>';
  currentRunTerminalLogs = []; accumulatedOutput = ""; currentLineElement = null;
  const body = document.getElementById('terminal-body'); body.innerHTML = '';
  printToTerminal(">>> Запуск програми...\n", "system");
  Sk.configure({
    output: t => { accumulatedOutput += t; printToTerminal(t, 'output'); },
    read: builtinRead, inputfun: promptTerminal, inputfunTakesPrompt: true, __future__: Sk.python3
  });
  const resetRunBtn = () => {
    runBtn.disabled = false;
    runBtn.innerHTML = '<svg class="icon-play" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg><span>Запустити код</span>';
  };
  Sk.misceval.asyncToPromise(() => Sk.importMainWithBody("<stdin>", false, code, true))
    .then(() => {
      printToTerminal("\n>>> Програма завершилась успішно.\n", "system");
      resetRunBtn();
      const isValid = lessons[currentLessonIndex].validate(accumulatedOutput, code, currentRunTerminalLogs);
      if (isValid) handleLessonSuccess();
      else printToTerminal("Результат невірний. Перевір завдання та спробуй ще раз! ❌\n", "error");
    })
    .catch(err => { printToTerminal("\nПомилка:\n" + err.toString() + "\n", "error"); resetRunBtn(); });
}

function handleLessonSuccess() {
  completedLessons[currentLessonIndex] = true; saveProgress();
  if (currentLessonIndex === lessons.length - 1) {
    printToTerminal("Вітання! Завдання виконано правильно! 🎉\n", "success");
    printToTerminal(`Модуль завершено! Секретний код: ${FINAL_CODE} 🔑\n`, "success");
  } else {
    printToTerminal("Вітання! Завдання виконано правильно! 🎉\n", "success");
  }
  startConfetti(); renderProgressPills(); updateNextButtonState();
}

function resetCurrentCode() {
  if (confirm("Скинути код до початкового стану?")) {
    localStorage.removeItem(`${STORAGE_PREFIX}draft_${currentLessonIndex}`);
    codeEditor.setValue(lessons[currentLessonIndex].initialCode);
    clearTerminal();
  }
}
function loadNextLesson() { if (currentLessonIndex < lessons.length-1) loadLesson(currentLessonIndex+1); }
function clearTerminal() {
  document.getElementById('terminal-body').innerHTML = '<div class="terminal-welcome">Консоль очищено. Результат вашого коду з\'явиться тут...</div>';
  currentLineElement = null;
}

window.addEventListener('DOMContentLoaded', initApp);
