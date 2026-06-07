// MODULE 5 — Ділення націло (//) та залишок (%)
const STORAGE_PREFIX = 'pycode5_';
const FINAL_CODE = '5mP';

const lessons = [
  {
    id: 1,
    title: 'Урок 1: "Оператор % — залишок"',
    subtitle: '% повертає залишок від ділення',
    theory: `
      <h3>Оператор залишку <code>%</code> 🔢</h3>
      <p><code>a % b</code> — залишок після ділення <code>a</code> на <code>b</code>. Якщо ділиться рівно — залишок 0.</p>
      <div class="theory-card">
        <pre><code>10 % 3  → 1   (10 = 3*3 + 1)
15 % 5  → 0   (15 = 5*3 + 0, ділиться!)
7 % 2   → 1   (непарне)
8 % 2   → 0   (парне)</code></pre>
      </div>
      <div class="instruction-box">
        <h4>📝 Твоє завдання:</h4>
        <p>Зчитай два числа <code>a</code> і <code>b</code>. Виведи залишок від ділення <code>a % b</code>. Потім перевір: якщо залишок 0 — виведи <code>Ділиться рівно!</code>, інакше — <code>Залишок: X</code>.</p>
      </div>
    `,
    initialCode: `a = int(input("a: "))
b = int(input("b: "))

# Знайди залишок: remainder = a % b
# Якщо 0 → print("Ділиться рівно!")
# Інакше → print("Залишок:", remainder)
`,
    hints: [
      'Знайди залишок: <code>remainder = a % b</code>',
      'Перевір умову: <code>if remainder == 0: print("Ділиться рівно!")</code>',
      'Повне рішення:<br><code>remainder = a % b</code><br><code>if remainder == 0:</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;print("Ділиться рівно!")</code><br><code>else:</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;print("Залишок:", remainder)</code>'
    ],
    validate: (output, code, terminalLogs) => {
      if (!/%/.test(code)) return false;
      const inputs = terminalLogs.filter(l => l.type === 'input');
      if (inputs.length < 2) return false;
      const a = parseInt(inputs[0].value), b = parseInt(inputs[1].value);
      if (isNaN(a) || isNaN(b) || b === 0) return false;
      const out = output.trim().toLowerCase();
      if (a % b === 0) return out.includes('ділиться') || out.includes('рівно');
      return out.includes(String(a % b)) && (out.includes('залишок') || out.includes(':'));
    }
  },
  {
    id: 2,
    title: 'Урок 2: "Парне чи непарне"',
    subtitle: '% 2 == 0 — перевірка парності',
    theory: `
      <h3>Парність через <code>% 2</code> ⚖️</h3>
      <p>Число парне якщо ділиться на 2 без залишку: <code>n % 2 == 0</code>. Непарне якщо <code>n % 2 == 1</code> (або <code>!= 0</code>).</p>
      <div class="theory-card">
        <pre><code>4 % 2 → 0  → парне
7 % 2 → 1  → непарне</code></pre>
      </div>
      <div class="instruction-box">
        <h4>📝 Твоє завдання:</h4>
        <p>Зчитай число. Виведи <code>Парне ✅</code> або <code>Непарне ❌</code>.</p>
      </div>
    `,
    initialCode: `n = int(input("Число: "))

# Перевір: n % 2 == 0
`,
    hints: ['<code>if n % 2 == 0: print("Парне ✅")</code><br><code>else: print("Непарне ❌")</code>'],
    validate: (output, code, terminalLogs) => {
      if (!/%/.test(code)) return false;
      const inputs = terminalLogs.filter(l => l.type === 'input');
      if (!inputs.length) return false;
      const n = parseInt(inputs[inputs.length-1].value);
      if (isNaN(n)) return false;
      const out = output.trim().toLowerCase();
      if (n % 2 === 0) return out.includes('парне') && !out.includes('непарне');
      return out.includes('непарне');
    }
  },
  {
    id: 3,
    title: 'Урок 3: "Кратність числа"',
    subtitle: 'Перевірка кратності через % == 0',
    theory: `
      <h3>Кратність та подільність 🔍</h3>
      <p>Число <code>n</code> кратне <code>k</code> якщо <code>n % k == 0</code>.</p>
      <div class="theory-card">
        <pre><code>12 % 3 == 0  # True  (кратне 3)
10 % 3 == 0  # False (не кратне)
15 % 5 == 0  # True  (кратне 5)</code></pre>
      </div>
      <div class="instruction-box">
        <h4>📝 Твоє завдання:</h4>
        <p>Зчитай число. Перевір чи кратне воно 3 АБО 5. Виведи відповідний результат.</p>
        <ul>
          <li>Кратне 3 і 5 → <code>Кратне 3 та 5!</code></li>
          <li>Кратне тільки 3 → <code>Кратне 3</code></li>
          <li>Кратне тільки 5 → <code>Кратне 5</code></li>
          <li>Не кратне жодному → <code>Не кратне ні 3 ні 5</code></li>
        </ul>
      </div>
    `,
    initialCode: `n = int(input("Число: "))

# Перевір кратність через elif та and/or
`,
    hints: [
      'Використай: <code>if n % 3 == 0 and n % 5 == 0:</code> першою умовою.',
      'Далі: <code>elif n % 3 == 0:</code>, <code>elif n % 5 == 0:</code>, <code>else:</code>'
    ],
    validate: (output, code, terminalLogs) => {
      if (!/%/.test(code)) return false;
      const inputs = terminalLogs.filter(l => l.type === 'input');
      if (!inputs.length) return false;
      const n = parseInt(inputs[inputs.length-1].value);
      if (isNaN(n)) return false;
      const out = output.trim().toLowerCase();
      const div3 = n % 3 === 0, div5 = n % 5 === 0;
      if (div3 && div5) return out.includes('3') && out.includes('5');
      if (div3) return out.includes('3') || out.includes('три');
      if (div5) return out.includes('5') || out.includes('п\'ять');
      return out.includes('не кратне') || out.includes('жодному');
    }
  },
  {
    id: 4,
    title: 'Урок 4: "Ціле ділення //"',
    subtitle: '// відрізає дробову частину',
    theory: `
      <h3>Оператор <code>//</code> — ціле ділення ✂️</h3>
      <p><code>a // b</code> ділить і <strong>відкидає залишок</strong>. Результат — ціле число.</p>
      <div class="theory-card">
        <pre><code>7 // 2   → 3    (а не 3.5!)
10 // 3  → 3
15 // 5  → 3
1 // 2   → 0</code></pre>
      </div>
      <p>Різниця: <code>7 / 2 = 3.5</code> (float), <code>7 // 2 = 3</code> (int).</p>
      <div class="instruction-box">
        <h4>📝 Твоє завдання:</h4>
        <p>Зчитай кількість секунд. Виведи скільки <strong>повних хвилин</strong> і скільки <strong>секунд залишилось</strong>.</p>
        <p><em>Приклад:</em> 150 секунд → <code>2 хв 30 сек</code></p>
      </div>
    `,
    initialCode: `seconds = int(input("Введи секунди: "))

# Знайди: minutes = seconds // 60
# Знайди: remaining = seconds % 60
# Виведи: f"{minutes} хв {remaining} сек"
`,
    hints: [
      '<code>minutes = seconds // 60</code> — повні хвилини',
      '<code>remaining = seconds % 60</code> — залишок секунд',
      'Повне рішення:<br><code>minutes = seconds // 60</code><br><code>remaining = seconds % 60</code><br><code>print(f"{minutes} хв {remaining} сек")</code>'
    ],
    validate: (output, code, terminalLogs) => {
      if (!/\/\//.test(code) && !/%/.test(code)) return false;
      const inputs = terminalLogs.filter(l => l.type === 'input');
      if (!inputs.length) return false;
      const sec = parseInt(inputs[0].value);
      if (isNaN(sec) || sec < 0) return false;
      const min = Math.floor(sec / 60), rem = sec % 60;
      const out = output.trim();
      return out.includes(String(min)) && out.includes(String(rem));
    }
  },
  {
    id: 5,
    title: 'Урок 5: "Остання цифра числа"',
    subtitle: '% 10 — витягти останню цифру',
    theory: `
      <h3>Витягти останню цифру 🔑</h3>
      <p><code>n % 10</code> завжди дає останню цифру числа. Це найважливіший трюк для роботи з цифрами!</p>
      <div class="theory-card">
        <pre><code>456 % 10  → 6  (остання цифра)
123 % 10  → 3
100 % 10  → 0
7   % 10  → 7</code></pre>
      </div>
      <p>Щоб <strong>відрізати</strong> останню цифру: <code>n // 10</code>.<br>
      Наприклад: <code>456 // 10 = 45</code>.</p>
      <div class="instruction-box">
        <h4>📝 Твоє завдання:</h4>
        <p>Зчитай число. Виведи його <strong>останню цифру</strong> та число <strong>без останньої цифри</strong>.</p>
      </div>
    `,
    initialCode: `n = int(input("Число: "))

# Знайди останню цифру: last_digit = n % 10
# Знайди без останньої: without_last = n // 10
# Виведи обидва результати
`,
    hints: [
      '<code>last_digit = n % 10</code> — остання цифра',
      '<code>without_last = n // 10</code> — число без останньої цифри',
      'Повне рішення:<br><code>last_digit = n % 10</code><br><code>without_last = n // 10</code><br><code>print("Остання цифра:", last_digit)</code><br><code>print("Без останньої:", without_last)</code>'
    ],
    validate: (output, code, terminalLogs) => {
      if (!/%\s*10/.test(code) && !/ % /.test(code)) return false;
      const inputs = terminalLogs.filter(l => l.type === 'input');
      if (!inputs.length) return false;
      const n = parseInt(inputs[0].value);
      if (isNaN(n) || n < 0) return false;
      const out = output.trim();
      return out.includes(String(n % 10)) && out.includes(String(Math.floor(n / 10)));
    }
  },
  {
    id: 6,
    title: 'Урок 6: "Послідовність через %"',
    subtitle: '% для циклічних шаблонів',
    theory: `
      <h3>Циклічні послідовності через <code>%</code> 🌀</h3>
      <p>Формула <code>(i % k) + 1</code> дає послідовність, що повторюється кожні k кроків.</p>
      <div class="theory-card">
        <pre><code># Послідовність 1,2,3,1,2,3,...
for i in range(N):
    print((i % 3) + 1)

# i=0 → 1, i=1 → 2, i=2 → 3
# i=3 → 1, i=4 → 2, ...</code></pre>
      </div>
      <div class="instruction-box">
        <h4>📝 Твоє завдання:</h4>
        <p>Зчитай <code>N</code>. Виведи перші N елементів послідовності <strong>1, 2, 3, 1, 2, 3, ...</strong></p>
        <p><em>Приклад:</em> N=7 → 1 2 3 1 2 3 1</p>
      </div>
    `,
    initialCode: `n = int(input("N: "))

# Напиши for цикл, який N разів виводить послідовність 1, 2, 3, 1, 2, 3...
# Підказка: використай залишок від ділення i на 3
`,
    hints: [
      '<code>for i in range(n):</code> — цикл N разів',
      'Формула <code>(i % 3) + 1</code> дає послідовність 1,2,3,1,2,3...',
      'Повне рішення:<br><code>for i in range(n):</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;print((i % 3) + 1)</code>'
    ],
    validate: (output, code, terminalLogs) => {
      if (!/\bfor\b/.test(code) || !/%/.test(code)) return false;
      const inputs = terminalLogs.filter(l => l.type === 'input');
      if (!inputs.length) return false;
      const n = parseInt(inputs[0].value);
      if (isNaN(n) || n <= 0) return false;
      const lines = output.trim().split('\n').map(l => l.trim()).filter(l => /^\d+$/.test(l));
      for (let i = 0; i < Math.min(n, lines.length); i++) {
        if (parseInt(lines[i]) !== (i % 3) + 1) return false;
      }
      return lines.length >= n;
    }
  },
  {
    id: 7,
    title: 'Урок 7: "Фінальний виклик #1"',
    subtitle: 'Перевірити чи число закінчується на 5',
    theory: `
      <h3>Фінальний виклик 🏆</h3>
      <div class="instruction-box">
        <h4>📝 Твоє завдання:</h4>
        <p>Зчитай ціле число. Перевір чи <strong>закінчується воно на цифру 5</strong>. Виведи <code>Так! ✅</code> або <code>Ні ❌</code>.</p>
        <p><em>Підказка:</em> останню цифру визначає <code>n % 10</code>.</p>
        <p><em>Приклади:</em> 25 → Так, 35 → Так, 13 → Ні, 100 → Ні.</p>
      </div>
    `,
    initialCode: `n = int(input("Число: "))

# Перевір: n % 10 == 5
`,
    hints: [
      '<code>if n % 10 == 5: print("Так! ✅")</code><br><code>else: print("Ні ❌")</code>',
      'Від\'ємні числа: -25 % 10 в Python = 5 (Python завжди дає невід\'ємний залишок).'
    ],
    validate: (output, code, terminalLogs) => {
      if (!/%/.test(code)) return false;
      const inputs = terminalLogs.filter(l => l.type === 'input');
      if (!inputs.length) return false;
      const n = parseInt(inputs[inputs.length-1].value);
      if (isNaN(n)) return false;
      const out = output.trim().toLowerCase();
      if (Math.abs(n) % 10 === 5) return out.includes('так') || out.includes('✅');
      return out.includes('ні') || out.includes('❌');
    }
  },
  {
    id: 8,
    title: 'Урок 8: "Фінальний виклик #2"',
    subtitle: 'Всі числа від 1 до N кратні 3',
    theory: `
      <h3>Фінальний виклик 🌟</h3>
      <div class="instruction-box">
        <h4>📝 Твоє завдання:</h4>
        <p>Зчитай <code>N</code>. Виведи всі числа від 1 до N, які <strong>кратні 3</strong>.</p>
        <p>Якщо таких чисел немає (N &lt; 3) — виведи <code>Немає кратних 3</code>.</p>
        <p><em>Приклад:</em> N=10 → 3, 6, 9</p>
      </div>
    `,
    initialCode: `n = int(input("N: "))
found = False

# Напиши for цикл від 1 до n:
# якщо i % 3 == 0 → print(i) та found = True

if not found:
    print("Немає кратних 3")
`,
    hints: [
      '<code>for i in range(1, n + 1):</code> — перебір від 1 до n',
      'Всередині: <code>if i % 3 == 0: print(i); found = True</code>',
      'Повний цикл:<br><code>for i in range(1, n + 1):</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;if i % 3 == 0:</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;print(i)</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;found = True</code>'
    ],
    validate: (output, code, terminalLogs) => {
      if (!/\bfor\b/.test(code) || !/%/.test(code)) return false;
      const inputs = terminalLogs.filter(l => l.type === 'input');
      if (!inputs.length) return false;
      const n = parseInt(inputs[0].value);
      if (isNaN(n) || n <= 0) return false;
      const expected = [];
      for (let i = 1; i <= n; i++) { if (i % 3 === 0) expected.push(i); }
      if (expected.length === 0) return output.trim().length > 0;
      const out = output.trim();
      return expected.every(v => out.includes(String(v)));
    }
  },
  {
    id: 9,
    title: 'Домашнє завдання: Кратні 3 та 5',
    subtitle: 'FizzBuzz — класична задача програмування',
    theory: `
      <h3>Домашнє завдання 🏠</h3>
      <div class="instruction-box">
        <h4>📝 Твоє завдання (FizzBuzz):</h4>
        <p>Зчитай <code>N</code>. Виведи числа від 1 до N, але:</p>
        <ul>
          <li>Кратне 3 і 5 → <code>FizzBuzz</code></li>
          <li>Тільки кратне 3 → <code>Fizz</code></li>
          <li>Тільки кратне 5 → <code>Buzz</code></li>
          <li>Інше → саме число</li>
        </ul>
        <p><em>Приклад:</em> N=15 → 1 2 Fizz 4 Buzz Fizz 7 8 Fizz Buzz 11 Fizz 13 14 FizzBuzz</p>
      </div>
    `,
    initialCode: `n = int(input("N: "))

# Напиши for цикл від 1 до n включно:
# Якщо кратне 3 і 5 → print("FizzBuzz")
# Якщо тільки 3 → print("Fizz")
# Якщо тільки 5 → print("Buzz")
# Інакше → print(i)
`,
    hints: [
      'Перша умова (найважливіше!): <code>if i % 3 == 0 and i % 5 == 0: print("FizzBuzz")</code>',
      'Далі: <code>elif i % 3 == 0: print("Fizz")</code> та <code>elif i % 5 == 0: print("Buzz")</code>',
      'Повний цикл:<br><code>for i in range(1, n + 1):</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;if i % 3 == 0 and i % 5 == 0: print("FizzBuzz")</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;elif i % 3 == 0: print("Fizz")</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;elif i % 5 == 0: print("Buzz")</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;else: print(i)</code>'
    ],
    validate: (output, code, terminalLogs) => {
      if (!/\bfor\b/.test(code) || !/%/.test(code)) return false;
      const inputs = terminalLogs.filter(l => l.type === 'input');
      if (!inputs.length) return false;
      const n = parseInt(inputs[0].value);
      if (isNaN(n) || n < 15) return false;
      const out = output.trim();
      return out.includes('FizzBuzz') && out.includes('Fizz') && out.includes('Buzz');
    }
  }
];

const handbookData = {
  variables: `<div class="handbook-section"><h3>📦 Змінні</h3><div class="concept-card"><h4>Типи:</h4><pre><code class="language-python">n = 42       # int
x = 3.14     # float
s = "hello"  # str
ok = True    # bool</code></pre></div></div>`,
  math: `<div class="handbook-section"><h3>🧮 Математика</h3><div class="concept-card"><h4>// та %:</h4><pre><code class="language-python">7 // 2   → 3   (ціле ділення)
7 % 2    → 1   (залишок)
456 % 10 → 6   (остання цифра)
456 // 10→ 45  (без останньої)
n % 2 == 0     → парне
n % 3 == 0     → кратне 3</code></pre></div><div class="concept-card"><h4>Хвилини/секунди:</h4><pre><code class="language-python">min = sec // 60
rem = sec % 60</code></pre></div></div>`,
  logic: `<div class="handbook-section"><h3>🛡️ Умови</h3><div class="concept-card"><h4>Парність і кратність:</h4><pre><code class="language-python">if n % 2 == 0:
    print("Парне")
if n % 3 == 0 and n % 5 == 0:
    print("Кратне 3 і 5")
if n % 10 == 5:
    print("Закінчується на 5")</code></pre></div></div>`,
  loops: `<div class="handbook-section"><h3>🔄 Цикли</h3><div class="concept-card"><h4>for + %:</h4><pre><code class="language-python"># Кратні 3 від 1 до N:
for i in range(1, n+1):
    if i % 3 == 0:
        print(i)

# Послідовність 1,2,3,1,2,3...:
for i in range(n):
    print((i % 3) + 1)</code></pre></div></div>`,
  functions: `<div class="handbook-section"><h3>🔢 Функції</h3><div class="concept-card"><h4>Корисні:</h4><pre><code class="language-python">abs(-5)      # → 5
len(str(n))  # кількість цифр
str(42)      # → "42"
int("42")    # → 42</code></pre></div></div>`
};
