// MODULE 8 — Штурм Задач #2, #3, #5
const STORAGE_PREFIX = 'pycode8_';
const FINAL_CODE = '8tA';

const lessons = [
  {
    id: 1,
    title: 'Урок 1: "Задача #5 — три послідовні числа"',
    subtitle: 'Якщо сума трьох послідовних = S, середнє = S//3',
    theory: `
      <h3>Задача #5 📋</h3>
      <p><strong>Умова:</strong> Сума трьох послідовних цілих чисел дорівнює S. Знайти ці три числа.</p>
      <div class="theory-card">
        <h4>Математика:</h4>
        <pre><code># Три послідовні: (x-1), x, (x+1)
# Їх сума: (x-1)+x+(x+1) = 3x = S
# Тому: x = S // 3

# S=12: x=4 → числа 3, 4, 5
# S=0:  x=0 → числа -1, 0, 1</code></pre>
      </div>
      <div class="instruction-box">
        <h4>📝 Твоє завдання:</h4>
        <p>Допиши код: знайди <code>x = s // 3</code> і виведи три числа через пробіл.</p>
        <p><em>Приклад: S=12 → 3 4 5</em></p>
      </div>
    `,
    initialCode: `s = int(input())

# Крок 1: знайди середнє число (ціле ділення суми на 3)
# Крок 2: виведи три послідовні через пробіл: попереднє, середнє, наступне
`,
    hints: [
      'Середнє число: <code>x = s // 3</code>. Виводимо трьох: <code>print(x-1, x, x+1)</code>.',
      'Перевір: S=12 → 3 4 5, S=0 → -1 0 1, S=-3 → -2 -1 0.',
      'Повне рішення:<br><code>x = s // 3</code><br><code>print(x-1, x, x+1)</code>'
    ],
    validate: (output, code, terminalLogs) => {
      const inputs = terminalLogs.filter(l => l.type === 'input');
      if (!inputs.length) return false;
      const s = parseInt(inputs[inputs.length-1].value);
      if (isNaN(s)) return false;
      const x = Math.floor(s / 3);
      const out = output.trim();
      const nums = out.split(/\s+/).map(v => parseInt(v));
      return nums.length >= 3 && nums[0] === x-1 && nums[1] === x && nums[2] === x+1;
    }
  },
  {
    id: 2,
    title: 'Урок 2: "Задача #5 — тести"',
    subtitle: 'Перевірка на всіх тестових значеннях',
    theory: `
      <h3>Тести Задачі #5 🧪</h3>
      <div class="theory-card">
        <h4>Таблиця відповідей:</h4>
        <pre><code>S=12  → x=4  → 3 4 5
S=0   → x=0  → -1 0 1
S=9   → x=3  → 2 3 4
S=-3  → x=-1 → -2 -1 0</code></pre>
      </div>
      <div class="instruction-box">
        <h4>📝 Твоє завдання:</h4>
        <p>Напиши рішення Задачі #5 і перевір усі 4 значення з таблиці.</p>
        <p><em>Починай з S=12 → має вивести 3 4 5</em></p>
      </div>
    `,
    initialCode: `s = int(input())

# Знайди середнє через ціле ділення, виведи три послідовні числа
`,
    hints: [
      '<code>x = s // 3</code> — ціле ділення, дає середнє число.',
      '<code>print(x-1, x, x+1)</code> — три числа через пробіл. Перевір S=-3 → -2 -1 0.'
    ],
    validate: (output, code, terminalLogs) => {
      const inputs = terminalLogs.filter(l => l.type === 'input');
      if (!inputs.length) return false;
      const s = parseInt(inputs[inputs.length-1].value);
      if (isNaN(s)) return false;
      const x = Math.floor(s / 3);
      const out = output.trim();
      const nums = out.split(/\s+/).map(v => parseInt(v));
      return nums.length >= 3 && nums[0] === x-1 && nums[1] === x && nums[2] === x+1;
    }
  },
  {
    id: 3,
    title: 'Урок 3: "Задача #2 — послідовність 1,2,3"',
    subtitle: 'Формула (i % 3) + 1 для циклічних послідовностей',
    theory: `
      <h3>Задача #2 📋</h3>
      <p><strong>Умова:</strong> Послідовність 1,2,3,1,2,3,... — вивести перші N елементів.</p>
      <div class="theory-card">
        <h4>Ключова формула:</h4>
        <pre><code>for i in range(n):
    print((i % 3) + 1)

# i=0 → 1, i=1 → 2, i=2 → 3
# i=3 → 1, i=4 → 2, ...</code></pre>
      </div>
      <div class="theory-card">
        <h4>Чому це працює:</h4>
        <pre><code>i % 3: 0, 1, 2, 0, 1, 2, 0, ...
  +1:  1, 2, 3, 1, 2, 3, 1, ...</code></pre>
      </div>
      <div class="instruction-box">
        <h4>📝 Твоє завдання:</h4>
        <p>Зчитай N. Допиши тіло циклу — виведи перші N елементів послідовності 1,2,3,1,2,3...</p>
        <p><em>Приклад: N=7 → 1 2 3 1 2 3 1 (кожен з нового рядка)</em></p>
      </div>
    `,
    initialCode: `n = int(input())

# Напиши цикл по range(n).
# Усередині виведи (остача i на 3) + 1 → послідовність 1,2,3,1,2,3...
`,
    hints: [
      '<code>i % 3</code> дає 0,1,2,0,1,2... Додаємо 1 → 1,2,3,1,2,3...',
      'Перевір: N=6 → 1 2 3 1 2 3. N=7 → 1 2 3 1 2 3 1.',
      'Повне рішення:<br><code>for i in range(n):</code><br>&nbsp;&nbsp;&nbsp;&nbsp;<code>print((i % 3) + 1)</code>'
    ],
    validate: (output, code, terminalLogs) => {
      if (!/\bfor\b/.test(code) || !/%/.test(code)) return false;
      const inputs = terminalLogs.filter(l => l.type === 'input');
      if (!inputs.length) return false;
      const n = parseInt(inputs[inputs.length-1].value);
      if (isNaN(n) || n <= 0) return false;
      const lines = output.trim().split('\n').map(l => l.trim()).filter(l => /^\d+$/.test(l));
      for (let i = 0; i < Math.min(n, lines.length); i++) {
        if (parseInt(lines[i]) !== (i % 3) + 1) return false;
      }
      return lines.length >= n;
    }
  },
  {
    id: 4,
    title: 'Урок 4: "Задача #2 — послідовність 1,2,3,4"',
    subtitle: 'Модифікація: змінюємо 3 на 4',
    theory: `
      <h3>Модифікація Задачі #2 🔄</h3>
      <p>Якщо потрібна послідовність 1,2,3,4,1,2,3,4,... — просто змінюємо <code>3</code> на <code>4</code>!</p>
      <div class="theory-card">
        <pre><code># Послідовність 1,2,3,1,2,3... (цикл 3):
(i % 3) + 1

# Послідовність 1,2,3,4,1,2,3,4... (цикл 4):
(i % 4) + 1</code></pre>
      </div>
      <div class="theory-card">
        <h4>Перевірка для N=9:</h4>
        <pre><code>i: 0 1 2 3 4 5 6 7 8
   1 2 3 4 1 2 3 4 1</code></pre>
      </div>
      <div class="instruction-box">
        <h4>📝 Твоє завдання:</h4>
        <p>Зчитай N. Виведи перші N елементів послідовності <strong>1,2,3,4,1,2,3,4,...</strong></p>
        <p><em>Приклад: N=9 → 1 2 3 4 1 2 3 4 1</em></p>
      </div>
    `,
    initialCode: `n = int(input())

# Напиши цикл по range(n).
# Усередині виведи (остача i на 4) + 1 → послідовність 1,2,3,4,1,2,3,4...
`,
    hints: [
      'Змінюємо <code>% 3</code> на <code>% 4</code> — і тепер цикл 4 елементи замість 3.',
      'Перевір: N=4 → 1 2 3 4. N=5 → 1 2 3 4 1.',
      'Повне рішення:<br><code>for i in range(n):</code><br>&nbsp;&nbsp;&nbsp;&nbsp;<code>print((i % 4) + 1)</code>'
    ],
    validate: (output, code, terminalLogs) => {
      if (!/\bfor\b/.test(code) || !/%/.test(code)) return false;
      const inputs = terminalLogs.filter(l => l.type === 'input');
      if (!inputs.length) return false;
      const n = parseInt(inputs[inputs.length-1].value);
      if (isNaN(n) || n <= 0) return false;
      const lines = output.trim().split('\n').map(l => l.trim()).filter(l => /^\d+$/.test(l));
      for (let i = 0; i < Math.min(n, lines.length); i++) {
        if (parseInt(lines[i]) !== (i % 4) + 1) return false;
      }
      return lines.length >= n;
    }
  },
  {
    id: 5,
    title: 'Урок 5: "Задача #3 — дописати цифру"',
    subtitle: 'Для кожної цифри 0–9: N*10 + d, перевірити ділення на 3',
    theory: `
      <h3>Задача #3 📋</h3>
      <p><strong>Умова:</strong> Дано тризначне N. Дописати справа одну цифру (0–9) так, щоб 4-значне число ділилось на 3. Вивести всі такі числа.</p>
      <div class="theory-card">
        <h4>Алгоритм:</h4>
        <pre><code>for d in range(10):      # цифра 0..9
    new_num = n * 10 + d  # дописати d справа
    if new_num % 3 == 0:  # ділиться на 3?
        print(new_num)</code></pre>
      </div>
      <div class="theory-card">
        <h4>Приклад N=100:</h4>
        <pre><code>d=2: 1002 % 3 = 0  → ТАК ✅
d=5: 1005 % 3 = 0  → ТАК ✅
d=8: 1008 % 3 = 0  → ТАК ✅</code></pre>
      </div>
      <div class="instruction-box">
        <h4>📝 Твоє завдання:</h4>
        <p>Зчитай тризначне N. Виведи всі 4-значні числа, що кратні 3.</p>
        <p><em>Введи 100 → має вивести 1002, 1005, 1008</em></p>
      </div>
    `,
    initialCode: `n = int(input())

# Перебери всі цифри від 0 до 9 (range(10)).
# Для кожної: 4-значне число = n помножити на 10 і додати цифру.
# Якщо воно ділиться на 3 без остачі — виведи його.
`,
    hints: [
      '<code>n * 10 + d</code> — множимо на 10 (зсув ліворуч) і додаємо нову цифру.',
      'Перевір: N=100 → 1002, 1005, 1008. N=123 → 1230, 1233, 1236, 1239.',
      'Повне рішення:<br><code>for d in range(10):</code><br>&nbsp;&nbsp;&nbsp;&nbsp;<code>new_num = n * 10 + d</code><br>&nbsp;&nbsp;&nbsp;&nbsp;<code>if new_num % 3 == 0:</code><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<code>print(new_num)</code>'
    ],
    validate: (output, code, terminalLogs) => {
      if (!/\bfor\b/.test(code) || !/%/.test(code)) return false;
      const inputs = terminalLogs.filter(l => l.type === 'input');
      if (!inputs.length) return false;
      const n = parseInt(inputs[inputs.length-1].value);
      if (isNaN(n) || n < 100 || n > 999) return false;
      const expected = [];
      for (let d = 0; d <= 9; d++) {
        const num = n * 10 + d;
        if (num % 3 === 0) expected.push(num);
      }
      const out = output.trim();
      return expected.every(v => out.includes(String(v)));
    }
  },
  {
    id: 6,
    title: 'Урок 6: "Задача #3 — тест N=123"',
    subtitle: 'Перевірка рішення на другому числі',
    theory: `
      <h3>Тест Задачі #3 🧪</h3>
      <p>Сума цифр 123 = 1+2+3 = 6 (кратна 3). Тому вже 1230 ділиться на 3, і далі кожні +3: d=0,3,6,9.</p>
      <div class="theory-card">
        <h4>N=123 → очікувані числа:</h4>
        <pre><code>d=0: 1230 % 3 = 0  ✅
d=3: 1233 % 3 = 0  ✅
d=6: 1236 % 3 = 0  ✅
d=9: 1239 % 3 = 0  ✅</code></pre>
      </div>
      <div class="instruction-box">
        <h4>📝 Твоє завдання:</h4>
        <p>Напиши рішення Задачі #3 і введи 123. Перевір що виводить <strong>1230, 1233, 1236, 1239</strong>.</p>
      </div>
    `,
    initialCode: `n = int(input())

# Та сама логіка, що в Уроці 5 — напиши заново:
# цикл по цифрах 0-9, формуй 4-значне число, виводь кратні 3.
`,
    hints: [
      'Та сама логіка, що в Уроці 5 — розкоментуй або напиши заново.',
      'Для N=123: правильна відповідь 1230, 1233, 1236, 1239 (4 числа).'
    ],
    validate: (output, code, terminalLogs) => {
      if (!/\bfor\b/.test(code) || !/%/.test(code)) return false;
      const inputs = terminalLogs.filter(l => l.type === 'input');
      if (!inputs.length) return false;
      const n = parseInt(inputs[inputs.length-1].value);
      if (isNaN(n) || n < 100 || n > 999) return false;
      const expected = [];
      for (let d = 0; d <= 9; d++) {
        const num = n * 10 + d;
        if (num % 3 === 0) expected.push(num);
      }
      return expected.every(v => output.includes(String(v)));
    }
  },
  {
    id: 7,
    title: 'Урок 7: "Самостійно: Задача #5"',
    subtitle: 'Напиши з нуля — лише умова і тести',
    theory: `
      <h3>Самостійний виклик 🎯</h3>
      <p>Напиши Задачу #5 <strong>самостійно</strong>. Якщо забув формулу — відкрий Довідник 📖 → "Математика".</p>
      <div class="theory-card">
        <h4>📋 Умова Задачі #5:</h4>
        <p>Задано S — сума трьох послідовних цілих чисел. Вивести ці три числа через пробіл у порядку зростання.</p>
      </div>
      <div class="theory-card">
        <h4>Перевір себе:</h4>
        <pre><code>S=12  → 3 4 5
S=9   → 2 3 4
S=-3  → -2 -1 0
S=0   → -1 0 1</code></pre>
      </div>
      <div class="instruction-box">
        <h4>📝 Твоє завдання:</h4>
        <p>Зчитай S, знайди середнє через <code>//</code>, виведи три числа. Перевір хоча б два значення з таблиці.</p>
      </div>
    `,
    initialCode: `# Задача #5: три послідовні числа з сумою S

s = int(input())

# Твоє рішення:
`,
    hints: [
      'Середнє число: <code>x = s // 3</code>.',
      '<code>print(x-1, x, x+1)</code> — виводить трьох через пробіл.'
    ],
    validate: (output, code, terminalLogs) => {
      const inputs = terminalLogs.filter(l => l.type === 'input');
      if (!inputs.length) return false;
      const s = parseInt(inputs[inputs.length-1].value);
      if (isNaN(s)) return false;
      const x = Math.floor(s / 3);
      const nums = output.trim().split(/\s+/).map(v => parseInt(v));
      return nums.length >= 3 && nums[0] === x-1 && nums[1] === x && nums[2] === x+1;
    }
  },
  {
    id: 8,
    title: 'Урок 8: "Самостійно: Задача #3"',
    subtitle: 'Напиши з нуля — лише умова і тести',
    theory: `
      <h3>Самостійний виклик 🎯</h3>
      <p>Напиши Задачу #3 <strong>самостійно</strong>. Якщо забув — відкрий Довідник 📖 → "Цикли".</p>
      <div class="theory-card">
        <h4>📋 Умова Задачі #3:</h4>
        <p>Задано тризначне число N. Дописати одну цифру (0–9) справа, щоб результат ділився на 3. Вивести всі такі 4-значні числа.</p>
      </div>
      <div class="theory-card">
        <h4>Перевір себе:</h4>
        <pre><code>N=100 → 1002, 1005, 1008
N=123 → 1230, 1233, 1236, 1239
N=200 → 2001, 2004, 2007</code></pre>
      </div>
      <div class="instruction-box">
        <h4>📝 Твоє завдання:</h4>
        <p>Цикл по цифрах 0–9, формуй нове число і перевіряй кратність 3. Введи 100 → маєш отримати 3 числа.</p>
      </div>
    `,
    initialCode: `# Задача #3: дописати цифру для кратності 3

n = int(input())

# Твоє рішення:
`,
    hints: [
      'Перебирай цифри: <code>for d in range(10):</code>. Нове число: <code>n * 10 + d</code>.',
      '<code>if new_num % 3 == 0: print(new_num)</code> — виводимо лише кратні 3.'
    ],
    validate: (output, code, terminalLogs) => {
      if (!/\bfor\b/.test(code) || !/%/.test(code)) return false;
      const inputs = terminalLogs.filter(l => l.type === 'input');
      if (!inputs.length) return false;
      const n = parseInt(inputs[inputs.length-1].value);
      if (isNaN(n) || n < 100 || n > 999) return false;
      const expected = [];
      for (let d = 0; d <= 9; d++) { const num = n*10+d; if (num%3===0) expected.push(num); }
      return expected.every(v => output.includes(String(v)));
    }
  },
  {
    id: 9,
    title: 'Домашнє завдання: Всі 3 задачі разом',
    subtitle: 'Задачі #2, #3, #5 — повний бойовий комплект',
    theory: `
      <h3>Домашнє завдання 🏠</h3>
      <p>Напиши всі три задачі в одному файлі — три <code>input()</code>, три блоки коду.</p>
      <div class="theory-card">
        <h4>Тестові значення:</h4>
        <pre><code>Задача #5: S=12    → 3 4 5
Задача #2: N=6     → 1 2 3 1 2 3
Задача #3: N=100   → 1002 1005 1008</code></pre>
      </div>
      <div class="instruction-box">
        <h4>📝 Твоє завдання:</h4>
        <ol>
          <li><strong>Задача #5:</strong> зчитай S, виведи три послідовні числа</li>
          <li><strong>Задача #2:</strong> зчитай N, виведи перші N елементів послідовності 1,2,3</li>
          <li><strong>Задача #3:</strong> зчитай тризначне число, виведи 4-значні кратні 3</li>
        </ol>
        <p>Коли всі три працюють правильно — ти готовий до іспиту! ✅</p>
      </div>
    `,
    initialCode: `# Задача #5
s = int(input())
# x = s // 3, print(x-1, x, x+1)

# Задача #2
n = int(input())
# for i in range(n): print((i % 3) + 1)

# Задача #3
num = int(input())
# for d in range(10):
#     candidate = num * 10 + d
#     if candidate % 3 == 0: print(candidate)
`,
    hints: [
      'Три незалежних блоки: #5 (сума→три числа), #2 (послідовність 1,2,3), #3 (дописати цифру).',
      'Розкоментуй рядки або напиши заново — головне щоб кожен блок читав своє число і виводив правильне.'
    ],
    validate: (output, code, terminalLogs) => {
      if (!/\bfor\b/.test(code) || !/%/.test(code) || !/\*\s*10/.test(code)) return false;
      const inputs = terminalLogs.filter(l => l.type === 'input');
      if (inputs.length < 3) return false;
      return output.trim().length > 0;
    }
  }
];

const handbookData = {
  variables: `<div class="handbook-section"><h3>📦 Змінні</h3><div class="concept-card"><pre><code class="language-python">s = int(input())   # сума
n = int(input())   # кількість
num = int(input()) # тризначне</code></pre></div></div>`,
  math: `<div class="handbook-section"><h3>🧮 Три задачі іспиту</h3><div class="concept-card"><h4>Задача #5:</h4><pre><code class="language-python">x = s // 3
print(x-1, x, x+1)</code></pre></div><div class="concept-card"><h4>Задача #2:</h4><pre><code class="language-python">for i in range(n):
    print((i%3)+1)</code></pre></div><div class="concept-card"><h4>Задача #3:</h4><pre><code class="language-python">for d in range(10):
    new_num = n*10 + d
    if new_num % 3 == 0:
        print(new_num)</code></pre></div></div>`,
  logic: `<div class="handbook-section"><h3>🛡️ Умови</h3><div class="concept-card"><pre><code class="language-python">if new_num % 3 == 0:
    print(new_num)
# Ділення на 3 без залишку</code></pre></div></div>`,
  loops: `<div class="handbook-section"><h3>🔄 Цикли</h3><div class="concept-card"><pre><code class="language-python"># Перебір цифр 0-9:
for d in range(10):
    ...

# Послідовність 1,2,3,1,2,3:
for i in range(n):
    print((i % 3) + 1)</code></pre></div></div>`,
  functions: `<div class="handbook-section"><h3>🔢 Функції</h3><div class="concept-card"><pre><code class="language-python">abs(x)   # модуль
x ** 3   # куб
x // 3   # ціле ділення
x % 3    # кратність</code></pre></div></div>`
};
