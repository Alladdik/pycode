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
        <p>Зчитай S. Знайди три послідовні числа і виведи їх через пробіл.</p>
      </div>
    `,
    initialCode: `s = int(input())

# Середнє число x = s // 3
# Виведи: x-1, x, x+1
`,
    hints: ['Три послідовні числа — це (x-1), x, (x+1). Їх сума = 3x, тож середнє знаходимо цілим діленням суми на 3.'],
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
        <h4>Очікувані відповіді:</h4>
        <pre><code>S=12 → 3 4 5
S=0  → -1 0 1
S=9  → 2 3 4
S=-3 → -2 -1 0</code></pre>
      </div>
      <div class="instruction-box">
        <h4>📝 Твоє завдання:</h4>
        <p>Напиши рішення Задачі #5 і перевір всі 4 значення.</p>
      </div>
    `,
    initialCode: `s = int(input())

# Напиши рішення Задачі #5
`,
    hints: ['Та сама ідея, що в Уроці 1. Перевір: S=12→3 4 5, S=0→-1 0 1.'],
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
        <pre><code>i % 3: 0,1,2,0,1,2,0,1,...
+1:    1,2,3,1,2,3,1,2,...</code></pre>
      </div>
      <div class="instruction-box">
        <h4>📝 Твоє завдання:</h4>
        <p>Зчитай N. Виведи перші N елементів послідовності 1,2,3,1,2,3...</p>
      </div>
    `,
    initialCode: `n = int(input())

# Напиши for цикл з формулою (i % 3) + 1
`,
    hints: ['Залишок i % 3 дає 0,1,2,0,1,2... Додай до нього 1, щоб отримати 1,2,3,1,2,3...'],
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
    subtitle: 'Модифікація: цикл 4 елементи замість 3',
    theory: `
      <h3>Модифікація Задачі #2 🔄</h3>
      <p>Якщо потрібна послідовність 1,2,3,4,1,2,3,4,... — просто змінюємо 3 на 4!</p>
      <div class="theory-card">
        <pre><code>for i in range(n):
    print((i % 4) + 1)

# i=0→1, i=1→2, i=2→3, i=3→4
# i=4→1, i=5→2, ...</code></pre>
      </div>
      <div class="instruction-box">
        <h4>📝 Твоє завдання:</h4>
        <p>Зчитай N. Виведи перші N елементів послідовності <strong>1,2,3,4,1,2,3,4,...</strong></p>
        <p><em>Приклад:</em> N=9 → 1 2 3 4 1 2 3 4 1</p>
      </div>
    `,
    initialCode: `n = int(input())

# Напиши for цикл з формулою (i % 4) + 1
`,
    hints: ['Та сама формула, що в Уроці 3, але період повторення тепер 4 замість 3.'],
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
    subtitle: 'Для кожної цифри 0-9: N*10 + d, перевірити ділення на 3',
    theory: `
      <h3>Задача #3 📋</h3>
      <p><strong>Умова:</strong> Дано тризначне N. Дописати справа одну цифру (0-9) так, щоб 4-значне число ділилось на 3. Вивести всі такі числа.</p>
      <div class="theory-card">
        <h4>Алгоритм:</h4>
        <pre><code>for d in range(10):     # цифра 0..9
    new_num = n * 10 + d  # дописати d справа
    if new_num % 3 == 0:  # ділиться на 3?
        print(new_num)</code></pre>
      </div>
      <div class="theory-card">
        <h4>Приклад N=100:</h4>
        <pre><code>1000 % 3 = 1  → ні
1001 % 3 = 2  → ні
1002 % 3 = 0  → ТАК ✅
1005 % 3 = 0  → ТАК ✅
1008 % 3 = 0  → ТАК ✅</code></pre>
      </div>
      <div class="instruction-box">
        <h4>📝 Твоє завдання:</h4>
        <p>Реалізуй Задачу #3 для N=100.</p>
      </div>
    `,
    initialCode: `n = int(input())

# for d in range(10):
#     new_num = n * 10 + d
#     if new_num % 3 == 0:
#         print(new_num)
`,
    hints: ['Перебери всі цифри 0–9 у циклі. Для кожної сформуй нове число (старе * 10 + цифра) і перевір його ділення на 3.'],
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
    subtitle: 'Перевірка рішення на іншому числі',
    theory: `
      <h3>Тест Задачі #3 🧪</h3>
      <div class="theory-card">
        <h4>N=123 → очікувані числа:</h4>
        <pre><code>1230 % 3 = 0  ✅
1233 % 3 = 0  ✅
1236 % 3 = 0  ✅
1239 % 3 = 0  ✅</code></pre>
      </div>
      <div class="instruction-box">
        <h4>📝 Твоє завдання:</h4>
        <p>Запусти рішення Задачі #3. Введи 123. Перевір що виводить 1230, 1233, 1236, 1239.</p>
      </div>
    `,
    initialCode: `n = int(input())

# Напиши рішення Задачі #3
`,
    hints: ['Та сама логіка, що в Уроці 5. Для N=123 правильна відповідь: 1230, 1233, 1236, 1239.'],
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
    title: 'Урок 7: "Фінальний виклик #1"',
    subtitle: 'Задача #5 з нуля — чистий аркуш',
    theory: `
      <h3>Без підказок 🎯</h3>
      <div class="instruction-box">
        <h4>📝 Умова Задачі #5:</h4>
        <p>Задано S — сума трьох послідовних цілих чисел. Вивести ці три числа через пробіл у порядку зростання.</p>
      </div>
    `,
    initialCode: `# Розв'яжи Задачу #5
`,
    hints: ['Згадай задачу #5: середнє з трьох послідовних — це ціле ділення суми на 3.'],
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
    title: 'Урок 8: "Фінальний виклик #2"',
    subtitle: 'Задача #3 з нуля — чистий аркуш',
    theory: `
      <h3>Без підказок 🎯</h3>
      <div class="instruction-box">
        <h4>📝 Умова Задачі #3:</h4>
        <p>Задано тризначне число N. Дописати одну цифру (0-9) справа, щоб результат ділився на 3. Вивести всі такі 4-значні числа.</p>
      </div>
    `,
    initialCode: `# Розв'яжи Задачу #3
`,
    hints: ['Згадай задачу #3: цикл по цифрах 0–9, нове число = N*10+цифра, і перевірка кратності 3.'],
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
      <p>Напиши всі три задачі в одному файлі, використовуючи різні змінні для вхідних даних.</p>
      <div class="instruction-box">
        <h4>📝 Твоє завдання:</h4>
        <ol>
          <li><strong>Задача #5:</strong> зчитай S, виведи три послідовні числа</li>
          <li><strong>Задача #2:</strong> зчитай N, виведи перші N елементів послідовності 1,2,3</li>
          <li><strong>Задача #3:</strong> зчитай тризначне число, виведи 4-значні кратні 3</li>
        </ol>
        <p><em>Тест задачі #5:</em> S=12 → 3 4 5<br>
        <em>Тест задачі #2:</em> N=6 → 1 2 3 1 2 3<br>
        <em>Тест задачі #3:</em> N=100 → 1002 1005 1008</p>
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
    hints: ['Три незалежні задачі, кожна читає своє число: #5 (сума→три числа), #2 (послідовність 1,2,3), #3 (дописати цифру для кратності 3).'],
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
