// MODULE 7 — Штурм Задач #1 та #4
const STORAGE_PREFIX = 'pycode7_';
const FINAL_CODE = '7tS';

const lessons = [
  {
    id: 1,
    title: 'Урок 1: "Огляд: abs() та **"',
    subtitle: 'Повторення ключових інструментів',
    theory: `
      <h3>Повторення для іспиту 🔁</h3>
      <p>Задачі 1 та 4 з іспиту вимагають <code>abs()</code> і <code>**</code>. Переконаємось що ти їх розумієш ідеально.</p>
      <div class="theory-card">
        <pre><code>abs(x)    # модуль: abs(-7) → 7
x ** 2    # квадрат: 5**2 → 25
x ** 3    # куб: 3**3 → 27
abs(a-b)  # відстань між a і b</code></pre>
      </div>
      <div class="instruction-box">
        <h4>📝 Твоє завдання:</h4>
        <p>Зчитай число N. Виведи: його квадрат, куб та модуль різниці куба і квадрата.</p>
      </div>
    `,
    initialCode: `n = int(input("N: "))

# Виведи квадрат: n ** 2
# Виведи куб: n ** 3
# Виведи abs(n**3 - n**2)
`,
    hints: ['Потрібні три окремі дії: піднесення до квадрата (** 2), до куба (** 3) і модуль різниці abs(...). Перевір на N=5 → 25, 125, 100.'],
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
    title: 'Урок 2: "Задача #1 — розбір"',
    subtitle: 'abs(N³ - N²) — покроковий аналіз',
    theory: `
      <h3>Задача #1 з іспиту 📋</h3>
      <p><strong>Умова:</strong> задано ціле число N. Знайти модуль різниці куба та квадрата числа N.</p>
      <div class="theory-card">
        <h4>Математика задачі:</h4>
        <pre><code>cube   = N ** 3
square = N ** 2
answer = abs(cube - square)

# N=5:  abs(125 - 25)  = 100 ✅
# N=-5: abs(-125 - 25) = 150 ✅
# N=1:  abs(1 - 1)     = 0   ✅
# N=0:  abs(0 - 0)     = 0   ✅</code></pre>
      </div>
      <div class="instruction-box">
        <h4>📝 Твоє завдання:</h4>
        <p>Напиши повне рішення Задачі #1. Зчитай N (тільки <code>int(input())</code> — без підказки!). Виведи відповідь.</p>
      </div>
    `,
    initialCode: `n = int(input())

# Обчисли abs(n**3 - n**2)
`,
    hints: ['Згадай: оператор ** для степеня і функція abs() для модуля. Спочатку обчисли куб і квадрат, потім модуль їх різниці.'],
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
    title: 'Урок 3: "Задача #1 — тестові випадки"',
    subtitle: 'Перевірити рішення на всіх даних з картинки',
    theory: `
      <h3>Тестування задачі #1 🧪</h3>
      <p>Іспит дає конкретні тестові випадки. Перевір свій код на кожному з них.</p>
      <div class="theory-card">
        <h4>Очікувані відповіді:</h4>
        <pre><code>N = 5   → 100
N = -5  → 150
N = 10  → 900
N = 11  → 1210</code></pre>
      </div>
      <div class="instruction-box">
        <h4>📝 Твоє завдання:</h4>
        <p>Напиши рішення задачі #1 і введи N=5. Перевір що відповідь <strong>100</strong>. Потім перезапусти і перевір N=-5 (відповідь 150).</p>
      </div>
    `,
    initialCode: `n = int(input())

# Напиши рішення Задачі #1
`,
    hints: ['Це та сама формула, що в Уроці 2. Проганяй по одному: N=5→100, N=-5→150, N=10→900, N=11→1210.'],
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
      <p><strong>Умова:</strong> задано N. Знайти X за формулою X = (N-1)/3. Перевірити: якщо X — ціле число, вивести X, інакше — <code>False</code>.</p>
      <div class="theory-card">
        <h4>Ключова перевірка:</h4>
        <pre><code># X є цілим якщо (N-1) кратне 3:
if (n - 1) % 3 == 0:
    x = (n - 1) // 3
    print(x)
else:
    print(False)</code></pre>
      </div>
      <div class="theory-card">
        <h4>Тести:</h4>
        <pre><code>N=10: (10-1)%3 = 9%3 = 0 → X=3 ✅
N=11: (11-1)%3 = 10%3 = 1 → False ✅</code></pre>
      </div>
      <div class="instruction-box">
        <h4>📝 Твоє завдання:</h4>
        <p>Реалізуй Задачу #4 повністю.</p>
      </div>
    `,
    initialCode: `n = int(input())

# Перевір: якщо (n - 1) % 3 == 0:
#     x = (n - 1) // 3
#     print(x)
# else:
#     print(False)
`,
    hints: ['X = (N-1)/3 є цілим лише коли (N-1) ділиться на 3 без залишку. Перевір кратність через %, і виведи або частку (//), або False.'],
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
    title: 'Урок 5: "Задача #4 — тести N=10, N=11"',
    subtitle: 'Перевірити правильну роботу на тестових даних',
    theory: `
      <h3>Тестування задачі #4 🧪</h3>
      <div class="theory-card">
        <h4>Очікувані відповіді:</h4>
        <pre><code>N=10  → 3
N=11  → False
N=1   → 0
N=4   → 1</code></pre>
      </div>
      <div class="instruction-box">
        <h4>📝 Твоє завдання:</h4>
        <p>Введи N=10. Переконайся що виводить <strong>3</strong>. Потім N=11 → <strong>False</strong>.</p>
      </div>
    `,
    initialCode: `n = int(input())

# Напиши рішення Задачі #4
`,
    hints: ['Та сама логіка, що в Уроці 4. Перевір на всіх: N=10→3, N=11→False, N=1→0, N=4→1.'],
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
    title: 'Урок 6: "Задачі разом — швидкий розгін"',
    subtitle: 'Вирішити обидві задачі в одному файлі',
    theory: `
      <h3>Обидві задачі разом 💪</h3>
      <div class="instruction-box">
        <h4>📝 Твоє завдання:</h4>
        <p>Зчитай ONE число N. Виведи відповіді обох задач:</p>
        <ol>
          <li><code>abs(N**3 - N**2)</code></li>
          <li><code>(N-1)//3</code> або <code>False</code></li>
        </ol>
      </div>
    `,
    initialCode: `n = int(input())

# Задача 1: abs(n**3 - n**2)

# Задача 4: якщо (n-1) % 3 == 0 → вивести x, інакше False
`,
    hints: ['Дві незалежні відповіді для одного N: спершу модуль різниці куба і квадрата, потім перевірка кратності (N-1) на 3.'],
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
    title: 'Урок 7: "Фінальний виклик #1"',
    subtitle: 'Задача 1 без підказок — чистий аркуш',
    theory: `
      <h3>Без підказок 🎯</h3>
      <p>Напиши Задачу #1 з нуля, не дивлячись на попередні уроки.</p>
      <div class="instruction-box">
        <h4>📝 Умова Задачі #1:</h4>
        <p>Задано ціле число N. Знайти модуль різниці куба та квадрата числа N.</p>
      </div>
    `,
    initialCode: `# Розв'яжи Задачу #1 з нуля
`,
    hints: ['Формула задачі #1 — у Довіднику (🧮 Математика). Спробуй пригадати її самостійно: модуль різниці куба та квадрата.'],
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
    title: 'Урок 8: "Фінальний виклик #2"',
    subtitle: 'Задача 4 без підказок — чистий аркуш',
    theory: `
      <h3>Без підказок 🎯</h3>
      <div class="instruction-box">
        <h4>📝 Умова Задачі #4:</h4>
        <p>Задано N. Знайти X = (N-1)/3. Якщо X ціле — вивести X, інакше — <code>False</code>.</p>
      </div>
    `,
    initialCode: `# Розв'яжи Задачу #4 з нуля
`,
    hints: ['Згадай задачу #4 з Уроку 4. Ключ — перевірка кратності (N-1) на 3, інакше виводимо False.'],
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
    subtitle: 'Перевірити обидві задачі на N = 5, -5, 10, 11',
    theory: `
      <h3>Домашнє завдання 🏠</h3>
      <p>Перевір свої рішення на всіх тестових значеннях з картинок іспиту.</p>
      <div class="instruction-box">
        <h4>📝 Твоє завдання:</h4>
        <p>Напиши <strong>обидві задачі</strong> (Задачу #1 і Задачу #4) в одному файлі. Зчитай N та виведи обидві відповіді.</p>
        <p>Перевір чотири значення: N=5, N=-5, N=10, N=11.</p>
        <p><em>Очікувані результати Задачі #1:</em></p>
        <ul>
          <li>N=5 → 100</li><li>N=-5 → 150</li><li>N=10 → 900</li><li>N=11 → 1210</li>
        </ul>
        <p><em>Очікувані результати Задачі #4:</em></p>
        <ul>
          <li>N=10 → 3</li><li>N=11 → False</li>
        </ul>
      </div>
    `,
    initialCode: `n = int(input())

# Задача 1: |N^3 - N^2|

# Задача 4: X = (N-1)/3
`,
    hints: ['Об\'єднай обидві задачі для одного N: модуль різниці степенів і перевірку кратності (N-1) на 3.'],
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
