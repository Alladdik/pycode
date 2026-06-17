// HOMEWORK — Домашнє завдання: 5 екзаменаційних задач (Модулі 1–9)
// Працює на спільному engine.js (Skulpt + CodeMirror).
const STORAGE_PREFIX = 'pychw_';
const FINAL_CODE = 'HW-5-DONE';

// Бейджі складності для кожного завдання
function MODULE_LEVEL(index) {
  const map = [
    ['★☆☆ Розминка', 'badge-blue'],
    ['★☆☆ Легка', 'badge-blue'],
    ['★★☆ Середня', 'badge-indigo'],
    ['★★☆ Середня', 'badge-indigo'],
    ['★★★ Виклик', 'badge-indigo']
  ];
  return map[index] || ['Домашнє 🏠', 'badge-indigo'];
}

// Невеликий помічник для таблиці прикладів
function exTable(rows) {
  const body = rows.map(r =>
    `<tr><td style="padding:6px 12px;border:1px solid rgba(0,0,0,0.12);font-family:var(--f-code);white-space:pre-line;vertical-align:top">${r[0]}</td>` +
    `<td style="padding:6px 12px;border:1px solid rgba(0,0,0,0.12);font-family:var(--f-code);white-space:pre-line;vertical-align:top">${r[1]}</td></tr>`
  ).join('');
  return `<table style="border-collapse:collapse;width:100%;margin:0.6rem 0;font-size:0.82rem">
    <tr><th style="padding:6px 12px;border:1px solid rgba(0,0,0,0.12);background:var(--bg-panel-raised);text-align:left;font-size:0.72rem;text-transform:uppercase;letter-spacing:0.4px;color:var(--text-muted)">Тест (вхід)</th>
    <th style="padding:6px 12px;border:1px solid rgba(0,0,0,0.12);background:var(--bg-panel-raised);text-align:left;font-size:0.72rem;text-transform:uppercase;letter-spacing:0.4px;color:var(--text-muted)">Відповідь (вихід)</th></tr>
    ${body}</table>`;
}

const lessons = [

  // ───────────── ЗАДАЧА 1 ─────────────
  {
    id: 1,
    title: 'Задача 1: Послідовність 1, 2, 3, …',
    subtitle: 'Домашнє завдання · цикл та залишок',
    theory: `
      <h3>🔢 Послідовність, що повторюється</h3>
      <p>Розглянемо послідовність, яка утворюється повторенням чисел <strong>1, 2, 3</strong>:</p>
      <div class="theory-card"><p style="font-family:var(--f-code);font-size:0.9rem!important;margin:0">1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, …</p></div>
      <p>Задано ціле додатне число <strong>N</strong>. Виведи <strong>перші N елементів</strong> цієї послідовності — кожен з нового рядка.</p>
      <div class="theory-card">
        <h4>📥 Вхід / 📤 Вихід</h4>
        <p>Вхід: одне ціле число <code>N</code> (1 ≤ N ≤ 100).<br>
        Вихід: перші N елементів, по одному в рядку.</p>
      </div>
      ${exTable([['5', '1\n2\n3\n1\n2'], ['3', '1\n2\n3']])}
      <div class="instruction-box">
        <h4>📝 Що має бути в коді:</h4>
        <ul>
          <li>зчитати <code>N = int(input())</code>;</li>
          <li>цикл <code>for i in range(N)</code>;</li>
          <li>вивести елемент <code>(i % 3) + 1</code> на кожній ітерації.</li>
        </ul>
      </div>
    `,
    initialCode: `# Задача 1: перші N елементів послідовності 1, 2, 3, 1, 2, 3, ...
n = int(input())

# Напиши цикл for, який виведе перші n елементів.
# Підказка: елемент під номером i дорівнює (i % 3) + 1
`,
    hints: [
      'Цикл по індексах: <code>for i in range(n):</code>.',
      'Елемент послідовності: <code>(i % 3) + 1</code> — <code>% 3</code> зациклює 0,1,2, а <code>+1</code> робить 1,2,3.',
      'Повне рішення:<br><code>for i in range(n):</code><br>&nbsp;&nbsp;&nbsp;&nbsp;<code>print((i % 3) + 1)</code>'
    ],
    validate: (output, code) => {
      // потрібен цикл
      if (!/\bfor\b|\bwhile\b/.test(code)) return false;
      const lines = output.trim().split('\n').map(s => s.trim()).filter(s => /^\d+$/.test(s));
      // визначаємо n за кількістю надрукованих рядків, але перевіряємо правильність шаблону
      if (lines.length < 1) return false;
      for (let i = 0; i < lines.length; i++) {
        if (parseInt(lines[i]) !== (i % 3) + 1) return false;
      }
      return true;
    }
  },

  // ───────────── ЗАДАЧА 2 ─────────────
  {
    id: 2,
    title: 'Задача 2: Модуль різниці куба та квадрата',
    subtitle: 'Домашнє завдання · степінь та abs',
    theory: `
      <h3>📐 |N³ − N²|</h3>
      <p>Задано ціле число <strong>N</strong>. Знайди <strong>модуль різниці</strong> куба та квадрата числа N, тобто <code>|N³ − N²|</code>.</p>
      <div class="theory-card">
        <h4>📥 Вхід / 📤 Вихід</h4>
        <p>Вхід: одне ціле число <code>N</code> (−10000 ≤ N ≤ 10000).<br>
        Вихід: одне ціле число — результат.</p>
      </div>
      ${exTable([['5', '100'], ['-5', '150']])}
      <div class="theory-card">
        <p style="margin:0">📊 <strong>Чому 150?</strong> Для N=−5: куб = −125, квадрат = 25, різниця −125 − 25 = −150, а <code>abs</code> прибирає мінус → 150.</p>
      </div>
      <div class="instruction-box">
        <h4>📝 Що має бути в коді:</h4>
        <ul>
          <li>окремі змінні <code>cube = n ** 3</code> та <code>square = n ** 2</code>;</li>
          <li>результат через <code>abs(...)</code>;</li>
          <li>обов'язково використай <code>**</code> та <code>abs()</code>.</li>
        </ul>
      </div>
    `,
    initialCode: `# Задача 2: модуль різниці куба та квадрата числа N
n = int(input())

# Порахуй куб і квадрат в окремих змінних, потім модуль різниці через abs()
`,
    hints: [
      'Степінь — це <code>**</code>: <code>cube = n ** 3</code>, <code>square = n ** 2</code>.',
      'Модуль (без знака мінус): <code>result = abs(cube - square)</code>.',
      'Повне рішення:<br><code>cube = n ** 3</code><br><code>square = n ** 2</code><br><code>result = abs(cube - square)</code><br><code>print(result)</code>'
    ],
    validate: (output, code, logs) => {
      if (!/abs/.test(code) || !/\*\*/.test(code)) return false;
      const inputs = logs.filter(l => l.type === 'input');
      if (!inputs.length) return false;
      const n = parseInt(inputs[inputs.length - 1].value);
      if (isNaN(n)) return false;
      const expected = Math.abs(Math.pow(n, 3) - Math.pow(n, 2));
      return output.trim().split(/\s+/).some(v => parseInt(v) === expected);
    }
  },

  // ───────────── ЗАДАЧА 3 ─────────────
  {
    id: 3,
    title: 'Задача 3: Три послідовних числа за сумою',
    subtitle: 'Домашнє завдання · ціле ділення //',
    theory: `
      <h3>➕ Три числа, сума яких = S</h3>
      <p>Задано ціле число <strong>S</strong>. Відомо, що сума трьох послідовних цілих чисел дорівнює S. Знайди ці числа та виведи їх <strong>у порядку зростання</strong> через пробіл.</p>
      <div class="theory-card">
        <h4>📥 Вхід / 📤 Вихід</h4>
        <p>Вхід: одне ціле число <code>S</code> (−10000 ≤ S ≤ 10000).<br>
        Вихід: три числа в одному рядку через пробіл.</p>
      </div>
      ${exTable([['12', '3 4 5'], ['0', '-1 0 1']])}
      <div class="theory-card">
        <p style="margin:0">🧮 <strong>Ідея:</strong> якщо числа це <code>x−1, x, x+1</code>, їх сума = <code>3·x</code>. Отже середнє <code>x = S // 3</code>.</p>
      </div>
      <div class="instruction-box">
        <h4>📝 Що має бути в коді:</h4>
        <ul>
          <li>знайти середнє <code>middle = s // 3</code>;</li>
          <li>вивести три числа: <code>middle-1</code>, <code>middle</code>, <code>middle+1</code> в одному рядку.</li>
        </ul>
      </div>
    `,
    initialCode: `# Задача 3: три послідовних числа, сума яких = S
s = int(input())

# Знайди середнє число цілим діленням, потім виведи три числа через пробіл
`,
    hints: [
      'Середнє число: <code>middle = s // 3</code> (ціле ділення).',
      'Три числа в одному рядку: <code>print(middle - 1, middle, middle + 1)</code>.',
      'Повне рішення:<br><code>middle = s // 3</code><br><code>print(middle - 1, middle, middle + 1)</code>'
    ],
    validate: (output, code, logs) => {
      const inputs = logs.filter(l => l.type === 'input');
      if (!inputs.length) return false;
      const s = parseInt(inputs[inputs.length - 1].value);
      if (isNaN(s)) return false;
      const x = Math.floor(s / 3);
      const nums = output.trim().split(/\s+/).map(v => parseInt(v));
      return nums.length >= 3 && nums[0] === x - 1 && nums[1] === x && nums[2] === x + 1;
    }
  },

  // ───────────── ЗАДАЧА 4 ─────────────
  {
    id: 4,
    title: 'Задача 4: Перевірка твердження 3·X + 1 = N',
    subtitle: 'Домашнє завдання · умова та кратність',
    theory: `
      <h3>🔍 Чи існує ціле X?</h3>
      <p>Стверджується: якщо невідоме ціле число <strong>X</strong> збільшити втричі та додати одиницю, вийде число <strong>N</strong> (тобто <code>3·X + 1 = N</code>).</p>
      <p>Програма отримує N. Якщо твердження <strong>хибне</strong> (такого цілого X немає) — виведи <code>False statement</code>. Якщо <strong>правдиве</strong> — знайди та виведи X.</p>
      <div class="theory-card">
        <h4>📥 Вхід / 📤 Вихід</h4>
        <p>Вхід: одне ціле число <code>N</code> (−1000 ≤ N ≤ 1000).<br>
        Вихід: число <code>X</code> або текст <code>False statement</code>.</p>
      </div>
      ${exTable([['10', '3'], ['11', 'False statement']])}
      <div class="theory-card">
        <p style="margin:0">🧩 <strong>Коли X ціле?</strong> Лише якщо <code>(N − 1)</code> ділиться на 3 без остачі. Тоді <code>X = (N − 1) // 3</code>.</p>
      </div>
      <div class="instruction-box">
        <h4>📝 Що має бути в коді:</h4>
        <ul>
          <li>перевірка <code>if (n - 1) % 3 == 0:</code> → вивести <code>(n - 1) // 3</code>;</li>
          <li>інакше <code>else:</code> → вивести текст <code>False statement</code>.</li>
        </ul>
      </div>
    `,
    initialCode: `# Задача 4: якщо 3*X + 1 = N, знайти X; інакше "False statement"
n = int(input())

# Перевір, чи (n - 1) ділиться на 3 без остачі (% 3 == 0).
# Якщо так -> виведи (n - 1) // 3, інакше -> виведи: False statement
`,
    hints: [
      'X ціле лише якщо <code>(n - 1) % 3 == 0</code>.',
      'У гілці True: <code>print((n - 1) // 3)</code>. У гілці else: <code>print("False statement")</code>.',
      'Повне рішення:<br><code>if (n - 1) % 3 == 0:</code><br>&nbsp;&nbsp;&nbsp;&nbsp;<code>print((n - 1) // 3)</code><br><code>else:</code><br>&nbsp;&nbsp;&nbsp;&nbsp;<code>print("False statement")</code>'
    ],
    validate: (output, code, logs) => {
      const inputs = logs.filter(l => l.type === 'input');
      if (!inputs.length) return false;
      const n = parseInt(inputs[inputs.length - 1].value);
      if (isNaN(n)) return false;
      const out = output.trim();
      if ((n - 1) % 3 === 0) return out === String((n - 1) / 3);
      return /^false statement$/i.test(out);
    }
  },

  // ───────────── ЗАДАЧА 5 ─────────────
  {
    id: 5,
    title: 'Задача 5: Дописати цифру → кратність трьом',
    subtitle: 'Домашнє завдання · цикл + умова',
    theory: `
      <h3>🧩 Чотиризначне число, кратне 3</h3>
      <p>Нехай <strong>N</strong> — тризначне додатне число. Допиши до нього <strong>справа одну цифру</strong> так, щоб отримане чотиризначне число ділилося на 3 без остачі.</p>
      <p>Виведи <strong>всі</strong> такі чотиризначні числа в порядку зростання — кожне з нового рядка.</p>
      <div class="theory-card">
        <h4>📥 Вхід / 📤 Вихід</h4>
        <p>Вхід: одне тризначне число <code>N</code> (100 ≤ N ≤ 999).<br>
        Вихід: усі підходящі числа, по одному в рядку.</p>
      </div>
      ${exTable([['100', '1002\n1005\n1008'], ['999', '9990\n9993\n9996\n9999']])}
      <div class="theory-card">
        <p style="margin:0">⚙️ <strong>Як дописати цифру?</strong> Нове число = <code>N * 10 + d</code>, де <code>d</code> — нова цифра від 0 до 9.</p>
      </div>
      <div class="instruction-box">
        <h4>📝 Що має бути в коді:</h4>
        <ul>
          <li>цикл <code>for d in range(10)</code> по всіх цифрах;</li>
          <li>нове число <code>new = n * 10 + d</code>;</li>
          <li>якщо <code>new % 3 == 0</code> — вивести <code>new</code>.</li>
        </ul>
      </div>
    `,
    initialCode: `# Задача 5: дописати справа цифру так, щоб число ділилось на 3
n = int(input())

# Перебери цифри 0..9, склади нове число n*10+d
# і виведи всі такі, що діляться на 3 без остачі.
`,
    hints: [
      'Перебір цифр: <code>for d in range(10):</code>.',
      'Нове число та умова: <code>new = n * 10 + d</code>, потім <code>if new % 3 == 0: print(new)</code>.',
      'Повне рішення:<br><code>for d in range(10):</code><br>&nbsp;&nbsp;&nbsp;&nbsp;<code>new = n * 10 + d</code><br>&nbsp;&nbsp;&nbsp;&nbsp;<code>if new % 3 == 0:</code><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<code>print(new)</code>'
    ],
    validate: (output, code, logs) => {
      if (!/\bfor\b/.test(code) || !/%/.test(code)) return false;
      const inputs = logs.filter(l => l.type === 'input');
      if (!inputs.length) return false;
      const n = parseInt(inputs[inputs.length - 1].value);
      if (isNaN(n) || n < 100 || n > 999) return false;
      const expected = [];
      for (let d = 0; d <= 9; d++) { const num = n * 10 + d; if (num % 3 === 0) expected.push(num); }
      const printed = output.trim().split('\n').map(s => s.trim()).filter(s => /^\d+$/.test(s)).map(Number);
      if (printed.length !== expected.length) return false;
      return expected.every((v, i) => printed[i] === v);
    }
  }
];

const handbookData = {
  variables: `<div class="handbook-section"><h3>📦 Введення / Вивід</h3><div class="concept-card"><pre><code class="language-python">n = int(input())   # прочитати ціле число
print(result)      # вивести результат
print(a, b, c)     # три числа через пробіл</code></pre></div></div>`,
  math: `<div class="handbook-section"><h3>🧮 Формули задач</h3><div class="concept-card"><pre><code class="language-python"># Задача 2: |N^3 - N^2|
abs(n**3 - n**2)

# Задача 3: три послідовних
middle = s // 3
print(middle-1, middle, middle+1)

# Задача 4: 3X + 1 = N
if (n-1) % 3 == 0: print((n-1)//3)
else: print("False statement")</code></pre></div></div>`,
  logic: `<div class="handbook-section"><h3>🛡️ Умови та кратність</h3><div class="concept-card"><pre><code class="language-python"># Ділиться без остачі?
if x % 3 == 0:
    print("кратне 3")
else:
    print("ні")</code></pre></div></div>`,
  loops: `<div class="handbook-section"><h3>🔄 Цикли</h3><div class="concept-card"><pre><code class="language-python"># Задача 1: послідовність 1,2,3
for i in range(n):
    print((i % 3) + 1)

# Задача 5: дописати цифру
for d in range(10):
    new = n * 10 + d
    if new % 3 == 0:
        print(new)</code></pre></div></div>`,
  functions: `<div class="handbook-section"><h3>🔢 Функції</h3><div class="concept-card"><pre><code class="language-python">abs(x)   # модуль (прибирає мінус)
x ** 2   # квадрат
x ** 3   # куб
x // 3   # ціле ділення
x % 3    # залишок / кратність</code></pre></div></div>`
};
