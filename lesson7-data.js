// MODULE 7 — Штурм Задач #1 та #4
const STORAGE_PREFIX = 'pycode7_';
const FINAL_CODE = '7tS';

const lessons = [
  {
    id: 1,
    title: 'Урок 1: "abs() та ** — повторення"',
    subtitle: 'Два інструменти для Задач #1 і #4',
    theory: `
      <h3>Два оператори для іспиту 🔁</h3>
      <p><code>**</code> — піднесення до степеня. <code>abs()</code> — модуль (число без знака).</p>
      <div class="theory-card">
        <pre><code>5 ** 2    # → 25  (квадрат)
3 ** 3    # → 27  (куб)
abs(-7)   # → 7   (модуль)
abs(5-8)  # → 3   (відстань)</code></pre>
      </div>
      <div class="instruction-box">
        <h4>📝 Твоє завдання:</h4>
        <p>Зчитай число <code>N</code>. Виведи три рядки: квадрат, куб і модуль різниці куба та квадрата.</p>
        <p><em>Приклад: N=5 → 25, 125, 100</em></p>
      </div>
    `,
    initialCode: `n = int(input("N: "))

# 1) Виведи квадрат N
# 2) Виведи куб N
# 3) Виведи модуль різниці куба та квадрата
`,
    hints: [
      'Квадрат: <code>n ** 2</code>, куб: <code>n ** 3</code>. Модуль (число без знака) — функція <code>abs()</code>.',
      'Перевір на N=5: має вивести 25, 125, 100. На N=2: 4, 8, 4.',
      'Повне рішення:<br><code>print(n ** 2)</code><br><code>print(n ** 3)</code><br><code>print(abs(n**3 - n**2))</code>'
    ],
    validate: (output, code, terminalLogs) => {
      if (!/\*\*/.test(code) || !/\babs\b/.test(code)) return false;
      const inputs = terminalLogs.filter(l => l.type === 'input');
      if (!inputs.length) return false;
      const n = parseInt(inputs[0].value);
      if (isNaN(n)) return false;
      const out = output.trim();
      return out.includes(String(n**2)) && out.includes(String(n**3)) && out.includes(String(Math.abs(n**3 - n**2)));
    }
  },
  {
    id: 2,
    title: 'Урок 2: "Задача #1 — пишемо рішення"',
    subtitle: 'abs(N³ − N²) — від формули до коду',
    theory: `
      <h3>Задача #1 з іспиту 📋</h3>
      <p><strong>Умова:</strong> задано ціле число N. Знайти модуль різниці куба та квадрата числа N.</p>
      <div class="theory-card">
        <h4>Кроки:</h4>
        <pre><code>cube   = n ** 3      # куб
square = n ** 2      # квадрат
result = abs(cube - square)
print(result)</code></pre>
      </div>
      <div class="theory-card">
        <h4>Очікувані відповіді:</h4>
        <pre><code>N=5  → 100
N=-5 → 150
N=1  → 0
N=0  → 0</code></pre>
      </div>
      <div class="instruction-box">
        <h4>📝 Твоє завдання:</h4>
        <p>Допиши код. Зчитай <code>N</code> через <code>int(input())</code> — без тексту підказки. Виведи один рядок — відповідь.</p>
        <p><em>Перевір: N=5 → 100</em></p>
      </div>
    `,
    initialCode: `n = int(input())

cube   = n ** 3
square = n ** 2
# Допиши: result = abs(...)
# Виведи result
`,
    hints: [
      '<code>result = abs(cube - square)</code> — береш модуль різниці.',
      'Потім <code>print(result)</code>. Перевір: N=5 → 100, N=-5 → 150.'
    ],
    validate: (output, code, terminalLogs) => {
      if (!/\babs\b/.test(code) || !/\*\*/.test(code)) return false;
      const inputs = terminalLogs.filter(l => l.type === 'input');
      if (!inputs.length) return false;
      const n = parseInt(inputs[inputs.length-1].value);
      if (isNaN(n)) return false;
      const expected = Math.abs(Math.pow(n,3) - Math.pow(n,2));
      return output.trim().split(/\s+/).some(v => parseFloat(v) === expected);
    }
  },
  {
    id: 3,
    title: 'Урок 3: "Задача #1 — тест на всіх даних"',
    subtitle: 'Перевір N=5, N=-5, N=10, N=11',
    theory: `
      <h3>Тестування Задачі #1 🧪</h3>
      <p>Іспит перевіряє саме ці значення. Запускай по одному і порівнюй:</p>
      <div class="theory-card">
        <h4>Таблиця відповідей:</h4>
        <pre><code>N=5   → abs(125-25)   = 100 ✅
N=-5  → abs(-125-25)  = 150 ✅
N=10  → abs(1000-100) = 900 ✅
N=11  → abs(1331-121) = 1210 ✅</code></pre>
      </div>
      <div class="instruction-box">
        <h4>📝 Твоє завдання:</h4>
        <p>Напиши повне рішення Задачі #1 і запусти 4 рази: N=5, -5, 10, 11.</p>
        <p>Порядок запуску: спершу введи N=5, перевір 100. Потім скинь і введи -5, маєш отримати 150.</p>
      </div>
    `,
    initialCode: `n = int(input())

# Напиши Задачу #1 одним рядком: модуль різниці куба та квадрата N
`,
    hints: [
      '<code>print(abs(n**3 - n**2))</code> — одного рядка достатньо.',
      'Запускай 4 рази: N=5→100, N=-5→150, N=10→900, N=11→1210.'
    ],
    validate: (output, code, terminalLogs) => {
      if (!/\babs\b/.test(code)) return false;
      const inputs = terminalLogs.filter(l => l.type === 'input');
      if (!inputs.length) return false;
      const n = parseInt(inputs[inputs.length-1].value);
      if (isNaN(n)) return false;
      const expected = Math.abs(Math.pow(n,3) - Math.pow(n,2));
      return output.trim().split(/\s+/).some(v => parseFloat(v) === expected);
    }
  },
  {
    id: 4,
    title: 'Урок 4: "Задача #4 — розбір"',
    subtitle: 'X = (N-1)/3 — чи є X цілим числом?',
    theory: `
      <h3>Задача #4 з іспиту 📋</h3>
      <p><strong>Умова:</strong> задано N. Знайти X = (N−1)/3. Якщо X — ціле число — вивести X, інакше — <code>False</code>.</p>
      <div class="theory-card">
        <h4>Ключова перевірка:</h4>
        <pre><code># X є цілим якщо (N-1) ділиться на 3:
if (n - 1) % 3 == 0:
    x = (n - 1) // 3
    print(x)
else:
    print(False)</code></pre>
      </div>
      <div class="theory-card">
        <h4>Чому // а не /:</h4>
        <pre><code>9 / 3   → 3.0  (float — не підходить)
9 // 3  → 3    (int — саме це потрібно)</code></pre>
      </div>
      <div class="instruction-box">
        <h4>📝 Що треба зробити (крок за кроком):</h4>
        <ol>
          <li>Зчитай ціле число <code>N</code> через <code>int(input())</code>.</li>
          <li>Перевір, чи <code>(N − 1)</code> ділиться на 3 <strong>без остачі</strong>. Це робить оператор <code>%</code> (остача від ділення): умова <code>(n - 1) % 3 == 0</code> означає «ділиться рівно».</li>
          <li>Якщо <strong>так</strong> → X буде цілим. Обчисли його <strong>цілим діленням</strong> <code>//</code>: <code>x = (n - 1) // 3</code>, і виведи <code>print(x)</code>.</li>
          <li>Якщо <strong>ні</strong> → X дробове, такого результату задача не приймає. Виведи <code>print(False)</code> — саме слово <code>False</code>, без лапок.</li>
        </ol>
        <p><em>Перевір: N=10 → 3, N=11 → False, N=1 → 0, N=4 → 1.</em></p>
      </div>
    `,
    initialCode: `n = int(input())

# Крок 1: перевір, чи (n - 1) ділиться на 3 без остачі
# if ...:
#     Крок 2: обчисли x цілим діленням і виведи його
# else:
#     Крок 3: виведи False (без лапок)
`,
    hints: [
      'X = (N−1)/3 ціле, коли (N−1) кратне 3. Перевіряємо: <code>(n-1) % 3 == 0</code>.',
      'Якщо кратне — виводимо <code>(n-1) // 3</code>, інакше — <code>False</code>. Спробуй N=10 → 3, N=11 → False.',
      'Повне рішення:<br><code>if (n - 1) % 3 == 0:</code><br>&nbsp;&nbsp;&nbsp;&nbsp;<code>print((n - 1) // 3)</code><br><code>else:</code><br>&nbsp;&nbsp;&nbsp;&nbsp;<code>print(False)</code>'
    ],
    validate: (output, code, terminalLogs) => {
      if (!/%/.test(code) || !/\/\//.test(code)) return false;
      const inputs = terminalLogs.filter(l => l.type === 'input');
      if (!inputs.length) return false;
      const n = parseInt(inputs[inputs.length-1].value);
      if (isNaN(n)) return false;
      const out = output.trim();
      if ((n - 1) % 3 === 0) return out === String(Math.floor((n-1)/3));
      return out === 'False';
    }
  },
  {
    id: 5,
    title: 'Урок 5: "Задача #4 — тест N=10, N=11"',
    subtitle: 'Перевірити всі 4 тестових значення',
    theory: `
      <h3>Тестування Задачі #4 🧪</h3>
      <div class="theory-card">
        <h4>Таблиця відповідей:</h4>
        <pre><code>N=10  → (10-1)%3=0  → X = 9//3 = 3    ✅
N=11  → (11-1)%3=1  → False              ✅
N=1   → (1-1)%3=0   → X = 0//3 = 0    ✅
N=4   → (4-1)%3=0   → X = 3//3 = 1    ✅
N=5   → (5-1)%3=1   → False              ✅</code></pre>
      </div>
      <div class="instruction-box">
        <h4>📝 Твоє завдання:</h4>
        <p>Напиши Задачу #4 і перевір усі значення з таблиці.</p>
        <p>Починай з N=10 → має бути <strong>3</strong>. Потім N=11 → <strong>False</strong>.</p>
      </div>
    `,
    initialCode: `n = int(input())

# Напиши Задачу #4: якщо (n-1) кратне 3 → виведи частку, інакше False
`,
    hints: [
      '<code>if (n-1) % 3 == 0: print((n-1) // 3)</code>',
      '<code>else: print(False)</code> — виводимо саме слово False, не рядок "False".'
    ],
    validate: (output, code, terminalLogs) => {
      const inputs = terminalLogs.filter(l => l.type === 'input');
      if (!inputs.length) return false;
      const n = parseInt(inputs[inputs.length-1].value);
      if (isNaN(n)) return false;
      const out = output.trim();
      if ((n - 1) % 3 === 0) return out === String(Math.floor((n-1)/3));
      return out === 'False';
    }
  },
  {
    id: 6,
    title: 'Урок 6: "Обидві задачі разом"',
    subtitle: 'Одне N → дві відповіді',
    theory: `
      <h3>Задачі #1 і #4 разом 💪</h3>
      <p>Зчитай одне число <code>N</code>. Виведи відповіді обох задач — кожну на новому рядку.</p>
      <div class="theory-card">
        <h4>Очікувані виводи:</h4>
        <pre><code>N=10:
  abs(1000-100) = 900   ← Задача #1
  9 // 3 = 3            ← Задача #4

N=11:
  abs(1331-121) = 1210  ← Задача #1
  False                 ← Задача #4</code></pre>
      </div>
      <div class="instruction-box">
        <h4>📝 Твоє завдання:</h4>
        <p>Допиши обидві задачі. Зчитай <code>N</code> один раз. Виведи спочатку відповідь #1, потім відповідь #4.</p>
      </div>
    `,
    initialCode: `n = int(input())

# Задача #1 — виведи модуль різниці куба та квадрата N


# Задача #4 — якщо (n-1) ділиться на 3, виведи частку, інакше False

`,
    hints: [
      'Задача #1 і #4 незалежні — перша рахує abs куба і квадрата, друга перевіряє кратність (N-1) на 3.',
      'Введи N=10 → виведе 900 і 3. Введи N=5 → виведе 100 і False.',
      'Повне рішення:<br><code>print(abs(n**3 - n**2))</code><br><code>if (n - 1) % 3 == 0:</code><br>&nbsp;&nbsp;&nbsp;&nbsp;<code>print((n - 1) // 3)</code><br><code>else:</code><br>&nbsp;&nbsp;&nbsp;&nbsp;<code>print(False)</code>'
    ],
    validate: (output, code, terminalLogs) => {
      if (!/\babs\b/.test(code) || !/%/.test(code)) return false;
      const inputs = terminalLogs.filter(l => l.type === 'input');
      if (!inputs.length) return false;
      const n = parseInt(inputs[inputs.length-1].value);
      if (isNaN(n)) return false;
      const ans1 = Math.abs(Math.pow(n,3) - Math.pow(n,2));
      const out = output.trim();
      const lines = out.split('\n').map(l => l.trim());
      return lines.some(l => l === String(ans1));
    }
  },
  {
    id: 7,
    title: 'Урок 7: "Самостійно: Задача #1"',
    subtitle: 'Напиши з нуля — лише умова і тести',
    theory: `
      <h3>Самостійний виклик 🎯</h3>
      <p>Напиши Задачу #1 <strong>самостійно</strong>, не заглядаючи в попередні уроки. Довідник 📖 доступний — можна відкрити вкладку "Математика".</p>
      <div class="theory-card">
        <h4>📋 Умова Задачі #1:</h4>
        <p>Задано ціле число N. Знайти модуль різниці куба та квадрата числа N.</p>
      </div>
      <div class="theory-card">
        <h4>Перевір себе:</h4>
        <pre><code>N=3   → 18
N=5   → 100
N=-2  → 12
N=1   → 0</code></pre>
      </div>
      <div class="instruction-box">
        <h4>📝 Твоє завдання:</h4>
        <p>Напиши рішення з нуля: <code>int(input())</code>, формула, <code>print()</code>. Перевір хоча б два значення з таблиці.</p>
      </div>
    `,
    initialCode: `# Задача #1: |N³ - N²|

n = int(input())

# Твоє рішення:
`,
    hints: [
      'Формула: <code>abs(n**3 - n**2)</code>. Куб і квадрат через <code>**</code>, модуль через <code>abs()</code>.',
      'Можна в один рядок: <code>print(abs(n**3 - n**2))</code>.'
    ],
    validate: (output, code, terminalLogs) => {
      if (!/\babs\b/.test(code)) return false;
      const inputs = terminalLogs.filter(l => l.type === 'input');
      if (!inputs.length) return false;
      const n = parseInt(inputs[inputs.length-1].value);
      if (isNaN(n)) return false;
      const expected = Math.abs(Math.pow(n,3) - Math.pow(n,2));
      return output.trim().split(/\s+/).some(v => parseFloat(v) === expected);
    }
  },
  {
    id: 8,
    title: 'Урок 8: "Самостійно: Задача #4"',
    subtitle: 'Напиши з нуля — лише умова і тести',
    theory: `
      <h3>Самостійний виклик 🎯</h3>
      <p>Напиши Задачу #4 <strong>самостійно</strong>. Якщо забув — відкрий Довідник 📖 → "Умови".</p>
      <div class="theory-card">
        <h4>📋 Умова Задачі #4:</h4>
        <p>Задано N. Знайти X = (N−1)/3. Якщо X ціле — вивести X, інакше — <code>False</code>.</p>
      </div>
      <div class="theory-card">
        <h4>Перевір себе:</h4>
        <pre><code>N=10  → 3
N=11  → False
N=1   → 0
N=4   → 1
N=5   → False</code></pre>
      </div>
      <div class="instruction-box">
        <h4>📝 Твоє завдання:</h4>
        <p>Напиши рішення: перевір кратність (N−1) на 3, виведи частку або False. Перевір N=10 і N=11.</p>
      </div>
    `,
    initialCode: `# Задача #4: X = (N-1)/3, чи є X цілим?

n = int(input())

# Твоє рішення:
`,
    hints: [
      'Умова цілості: <code>(n-1) % 3 == 0</code>. Якщо так — виводь <code>(n-1) // 3</code>.',
      '<code>else: print(False)</code> — без лапок, щоб вивелось <code>False</code> а не рядок.'
    ],
    validate: (output, code, terminalLogs) => {
      if (!/%/.test(code)) return false;
      const inputs = terminalLogs.filter(l => l.type === 'input');
      if (!inputs.length) return false;
      const n = parseInt(inputs[inputs.length-1].value);
      if (isNaN(n)) return false;
      const out = output.trim();
      if ((n - 1) % 3 === 0) return out === String(Math.floor((n-1)/3));
      return out === 'False';
    }
  },
  {
    id: 9,
    title: 'Домашнє завдання: Всі 4 тести',
    subtitle: 'Обидві задачі на N = 5, -5, 10, 11',
    theory: `
      <h3>Домашнє завдання 🏠</h3>
      <p>Напиши обидві задачі в одному файлі і пройди всі тестові значення.</p>
      <div class="theory-card">
        <h4>Задача #1 — очікувані відповіді:</h4>
        <pre><code>N=5   → 100
N=-5  → 150
N=10  → 900
N=11  → 1210</code></pre>
      </div>
      <div class="theory-card">
        <h4>Задача #4 — очікувані відповіді:</h4>
        <pre><code>N=10  → 3
N=11  → False
N=1   → 0
N=4   → 1</code></pre>
      </div>
      <div class="instruction-box">
        <h4>📝 Твоє завдання:</h4>
        <p>Зчитай одне N, виведи обидві відповіді. Перевір усі 4 тестових значення. Коли всі правильні — ти готовий до іспиту! ✅</p>
      </div>
    `,
    initialCode: `n = int(input())

# Задача #1: |N³ - N²|

# Задача #4: X = (N-1)/3
`,
    hints: [
      'Задача #1: <code>print(abs(n**3 - n**2))</code>',
      'Задача #4: <code>if (n-1)%3==0: print((n-1)//3)</code> і <code>else: print(False)</code>.'
    ],
    validate: (output, code, terminalLogs) => {
      if (!/\babs\b/.test(code) || !/%/.test(code) || !/\/\//.test(code)) return false;
      const inputs = terminalLogs.filter(l => l.type === 'input');
      if (!inputs.length) return false;
      const n = parseInt(inputs[inputs.length-1].value);
      if (isNaN(n)) return false;
      const ans1 = Math.abs(Math.pow(n,3) - Math.pow(n,2));
      return output.trim().includes(String(ans1));
    }
  }
];

const handbookData = {
  variables: `<div class="handbook-section"><h3>📦 Змінні</h3><div class="concept-card"><pre><code class="language-python">n = int(input())  # зчитати без підказки
x = (n - 1) // 3  # ціле ділення</code></pre></div></div>`,
  math: `<div class="handbook-section"><h3>🧮 Математика іспиту</h3><div class="concept-card"><h4>Задача #1:</h4><pre><code class="language-python">abs(n**3 - n**2)
# n=5  → abs(125-25) = 100
# n=-5 → abs(-125-25)= 150</code></pre></div><div class="concept-card"><h4>Задача #4:</h4><pre><code class="language-python">if (n - 1) % 3 == 0:
    print((n - 1) // 3)
else:
    print(False)</code></pre></div></div>`,
  logic: `<div class="handbook-section"><h3>🛡️ Перевірки</h3><div class="concept-card"><pre><code class="language-python"># Кратність:
(n-1) % 3 == 0  → X ціле

# Тести:
# N=10: (10-1)%3=0 → X=3
# N=11: (11-1)%3=1 → False</code></pre></div></div>`,
  loops: `<div class="handbook-section"><h3>🔄 Цикли</h3><div class="concept-card"><pre><code class="language-python">for i in range(n):
    print((i % 3) + 1)</code></pre></div></div>`,
  functions: `<div class="handbook-section"><h3>🔢 Функції</h3><div class="concept-card"><pre><code class="language-python">abs(x)     # модуль
x ** 2     # квадрат
x ** 3     # куб
x // 3     # ціле ділення
x % 3      # залишок</code></pre></div></div>`
};
