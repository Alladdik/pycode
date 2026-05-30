// MODULE 6 — Маніпуляції з числами та вбудовані функції
const STORAGE_PREFIX = 'pycode6_';
const FINAL_CODE = '6nF';

const lessons = [
  {
    id: 1,
    title: 'Урок 1: "abs() — модуль числа"',
    subtitle: 'Абсолютне значення — завжди позитивне',
    theory: `
      <h3>Функція <code>abs()</code> 📐</h3>
      <p><code>abs(x)</code> повертає <strong>модуль</strong> числа — тобто його абсолютне значення без знаку.</p>
      <div class="theory-card">
        <pre><code>abs(5)    → 5
abs(-5)   → 5
abs(-3.7) → 3.7
abs(0)    → 0</code></pre>
      </div>
      <div class="instruction-box">
        <h4>📝 Твоє завдання:</h4>
        <p>Зчитай два числа <code>a</code> і <code>b</code>. Виведи <strong>модуль їх різниці</strong>: <code>|a - b|</code>.</p>
        <p><em>Приклад:</em> a=10, b=15 → 5 (а не -5)</p>
      </div>
    `,
    initialCode: `a = int(input("a: "))
b = int(input("b: "))

# Знайди модуль різниці: abs(a - b)
# Виведи: "Різниця по модулю:", result
`,
    hints: [
      '<code>result = abs(a - b)</code>',
      'abs() завжди дає невід\'ємний результат: <code>abs(10-15) = 5</code>',
      'Повне рішення:<br><code>result = abs(a - b)</code><br><code>print("Різниця по модулю:", result)</code>'
    ],
    validate: (output, code, terminalLogs) => {
      if (!/\babs\b/.test(code)) return false;
      const inputs = terminalLogs.filter(l => l.type === 'input');
      if (inputs.length < 2) return false;
      const a = parseInt(inputs[0].value), b = parseInt(inputs[1].value);
      if (isNaN(a) || isNaN(b)) return false;
      return output.trim().includes(String(Math.abs(a - b)));
    }
  },
  {
    id: 2,
    title: 'Урок 2: "Степінь **"',
    subtitle: 'Піднесення до степеня та коренева функція',
    theory: `
      <h3>Оператор степеня <code>**</code> 💥</h3>
      <p><code>a ** b</code> — <code>a</code> у степені <code>b</code>.</p>
      <div class="theory-card">
        <pre><code>2 ** 3   → 8    (2 у кубі)
5 ** 2   → 25   (квадрат)
n ** 3   → куб n
n ** 0.5 → √n   (квадратний корінь!)</code></pre>
      </div>
      <div class="instruction-box">
        <h4>📝 Твоє завдання:</h4>
        <p>Зчитай число <code>N</code>. Виведи його <strong>квадрат</strong> та <strong>куб</strong>.</p>
        <p><em>Приклад:</em> N=4 → квадрат 16, куб 64.</p>
      </div>
    `,
    initialCode: `n = int(input("N: "))

# Знайди квадрат: square = n ** 2
# Знайди куб: cube = n ** 3
# Виведи обидва
`,
    hints: [
      '<code>square = n ** 2</code> — квадрат',
      '<code>cube = n ** 3</code> — куб',
      'Повне рішення:<br><code>square = n ** 2</code><br><code>cube = n ** 3</code><br><code>print(f"Квадрат: {square}")</code><br><code>print(f"Куб: {cube}")</code>'
    ],
    validate: (output, code, terminalLogs) => {
      if (!/ \*\* /.test(code) && !/\*\*2/.test(code)) return false;
      const inputs = terminalLogs.filter(l => l.type === 'input');
      if (!inputs.length) return false;
      const n = parseInt(inputs[0].value);
      if (isNaN(n)) return false;
      const out = output.trim();
      return out.includes(String(n**2)) && out.includes(String(n**3));
    }
  },
  {
    id: 3,
    title: 'Урок 3: "str() та int() — перетворення типів"',
    subtitle: 'Конвертація між числами та рядками',
    theory: `
      <h3>Перетворення типів 🔄</h3>
      <p>Python може переводити дані між типами. Це важливо коли потрібно: рахувати цифри числа, витягати символи, тощо.</p>
      <div class="theory-card">
        <pre><code>str(123)     → "123"  (число → рядок)
int("456")   → 456   (рядок → число)
len(str(n))  → кількість цифр числа

n = 12345
s = str(n)   # "12345"
print(s[0])  # "1" — перша цифра</code></pre>
      </div>
      <div class="instruction-box">
        <h4>📝 Твоє завдання:</h4>
        <p>Зчитай число. Виведи: кількість цифр у ньому та першу цифру (ліворуч).</p>
        <p><em>Приклад:</em> 12345 → цифр: 5, перша: 1</p>
      </div>
    `,
    initialCode: `n = int(input("Число: "))

# Перетвори в рядок: s = str(n)
# Кількість цифр: digits_count = len(s)
# Перша цифра: first_digit = int(s[0])
# Виведи обидва результати
`,
    hints: [
      '<code>s = str(n)</code> — перетворити в рядок, тоді <code>len(s)</code> — кількість цифр',
      '<code>int(s[0])</code> — перша цифра (через рядок)',
      'Повне рішення:<br><code>s = str(n)</code><br><code>digits_count = len(s)</code><br><code>first_digit = int(s[0])</code><br><code>print(f"Цифр: {digits_count}")</code><br><code>print(f"Перша цифра: {first_digit}")</code>'
    ],
    validate: (output, code, terminalLogs) => {
      if (!/\bstr\b/.test(code) || !/\blen\b/.test(code)) return false;
      const inputs = terminalLogs.filter(l => l.type === 'input');
      if (!inputs.length) return false;
      const n = Math.abs(parseInt(inputs[0].value));
      if (isNaN(n)) return false;
      const out = output.trim();
      return out.includes(String(String(n).length)) && out.includes(String(n)[0]);
    }
  },
  {
    id: 4,
    title: 'Урок 4: "Кількість цифр числа"',
    subtitle: 'len(str(n)) — найпростіший спосіб',
    theory: `
      <h3>Кількість цифр 🔢</h3>
      <p>Два способи знайти кількість цифр:</p>
      <div class="theory-card">
        <h4>Спосіб 1 — через рядок (простіше):</h4>
        <pre><code>len(str(12345))  → 5</code></pre>
      </div>
      <div class="theory-card">
        <h4>Спосіб 2 — через while (класика):</h4>
        <pre><code>n, count = 12345, 0
while n > 0:
    n //= 10
    count += 1
# count → 5</code></pre>
      </div>
      <div class="instruction-box">
        <h4>📝 Твоє завдання:</h4>
        <p>Зчитай число. Підрахуй кількість цифр <strong>обома способами</strong> і виведи результат. Перевір що вони однакові.</p>
      </div>
    `,
    initialCode: `n = int(input("Число: "))

# Спосіб 1: через str
count1 = len(str(n))

# Спосіб 2: через while — напиши сам!
temp = n
count2 = 0
# while temp > 0:
#     temp //= 10
#     count2 += 1

print(f"Через str: {count1}")
print(f"Через while: {count2}")
`,
    hints: [
      'Спосіб 1 вже готовий. Для способу 2: умова <code>while temp &gt; 0:</code>',
      'Всередині: <code>temp //= 10</code> (відрізати) і <code>count2 += 1</code> (лічильник)',
      'Повний цикл:<br><code>while temp &gt; 0:</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;temp //= 10</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;count2 += 1</code>'
    ],
    validate: (output, code, terminalLogs) => {
      const inputs = terminalLogs.filter(l => l.type === 'input');
      if (!inputs.length) return false;
      const n = parseInt(inputs[0].value);
      if (isNaN(n) || n <= 0) return false;
      const expected = String(n).length;
      const out = output.trim();
      const nums = out.split(/\D+/).map(v => parseInt(v)).filter(v => !isNaN(v));
      return nums.filter(v => v === expected).length >= 2;
    }
  },
  {
    id: 5,
    title: 'Урок 5: "Витягти першу та останню цифри"',
    subtitle: '% 10 та str()[0] для роботи з цифрами',
    theory: `
      <h3>Цифри числа 🔍</h3>
      <div class="theory-card">
        <pre><code>n = 4567
# Остання цифра:
last  = n % 10          # → 7
# Перша цифра:
first = int(str(n)[0])  # → 4
# Без першої та останньої:
middle = (n % 1000) // 10  # для 4-значних</code></pre>
      </div>
      <div class="instruction-box">
        <h4>📝 Твоє завдання:</h4>
        <p>Зчитай <strong>4-значне число</strong>. Виведи його першу цифру, останню цифру та суму першої і останньої.</p>
        <p><em>Приклад:</em> 4567 → перша: 4, остання: 7, сума: 11</p>
      </div>
    `,
    initialCode: `n = int(input("4-значне число: "))

# Знайди першу цифру: int(str(n)[0])
# Знайди останню цифру: n % 10
# Порахуй суму і виведи три рядки
`,
    hints: [
      '<code>first = int(str(n)[0])</code> — перша цифра',
      '<code>last = n % 10</code> — остання цифра',
      'Повне рішення:<br><code>first = int(str(n)[0])</code><br><code>last = n % 10</code><br><code>total = first + last</code><br><code>print(f"Перша цифра: {first}")</code><br><code>print(f"Остання цифра: {last}")</code><br><code>print(f"Сума: {total}")</code>'
    ],
    validate: (output, code, terminalLogs) => {
      const inputs = terminalLogs.filter(l => l.type === 'input');
      if (!inputs.length) return false;
      const n = parseInt(inputs[0].value);
      if (isNaN(n) || n < 1000 || n > 9999) return false;
      const first = Math.floor(n / 1000), last = n % 10;
      const out = output.trim();
      return out.includes(String(first)) && out.includes(String(last)) && out.includes(String(first + last));
    }
  },
  {
    id: 6,
    title: 'Урок 6: "Сума цифр числа"',
    subtitle: 'while + % 10 для обробки кожної цифри',
    theory: `
      <h3>Сума всіх цифр 🧮</h3>
      <p>Класичний алгоритм: у циклі відрізати останню цифру і додавати до суми.</p>
      <div class="theory-card">
        <pre><code>n = 1234
total = 0
while n > 0:
    total += n % 10  # додати останню цифру
    n //= 10         # відрізати останню
# total → 1+2+3+4 = 10</code></pre>
      </div>
      <div class="instruction-box">
        <h4>📝 Твоє завдання:</h4>
        <p>Зчитай число. Порахуй суму всіх його цифр.</p>
        <p><em>Приклад:</em> 12345 → 1+2+3+4+5 = 15</p>
      </div>
    `,
    initialCode: `n = int(input("Число: "))
total = 0
temp = n  # зберігаємо оригінал

# Напиши while цикл:
# while temp > 0:
#     total += temp % 10
#     temp //= 10

print(f"Сума цифр {n} = {total}")
`,
    hints: [
      'Умова: <code>while temp &gt; 0:</code>',
      'Всередині: <code>total += temp % 10</code> (остання цифра) і <code>temp //= 10</code> (відрізати)',
      'Повний цикл:<br><code>while temp &gt; 0:</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;total += temp % 10</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;temp //= 10</code>'
    ],
    validate: (output, code, terminalLogs) => {
      if (!/\bwhile\b/.test(code) || !/%/.test(code)) return false;
      const inputs = terminalLogs.filter(l => l.type === 'input');
      if (!inputs.length) return false;
      const n = parseInt(inputs[0].value);
      if (isNaN(n) || n <= 0) return false;
      const expected = String(n).split('').reduce((s, d) => s + parseInt(d), 0);
      return output.trim().includes(String(expected));
    }
  },
  {
    id: 7,
    title: 'Урок 7: "Фінальний виклик #1"',
    subtitle: 'abs(N³ - N²) — екзаменаційна задача #1',
    theory: `
      <h3>Задача #1 з іспиту 🏆</h3>
      <p>Об'єднує: <code>abs()</code>, оператор <code>**</code> та математику.</p>
      <div class="instruction-box">
        <h4>📝 Твоє завдання:</h4>
        <p>Задано ціле число <code>N</code>. Знайди <strong>модуль різниці куба та квадрата</strong> числа N: <code>|N³ - N²|</code></p>
        <p><em>Формула:</em> <code>abs(N**3 - N**2)</code></p>
        <ul>
          <li>N=5 → |125-25| = <strong>100</strong></li>
          <li>N=-5 → |-125-25| = <strong>150</strong></li>
          <li>N=1 → |1-1| = <strong>0</strong></li>
        </ul>
      </div>
    `,
    initialCode: `n = int(input())

# Знайди |N^3 - N^2|
`,
    hints: [
      '<code>result = abs(n**3 - n**2)</code>',
      'Повне рішення:<br><code>result = abs(n**3 - n**2)</code><br><code>print(result)</code>'
    ],
    validate: (output, code, terminalLogs) => {
      if (!/\babs\b/.test(code) || !/\*\*/.test(code)) return false;
      const inputs = terminalLogs.filter(l => l.type === 'input');
      if (!inputs.length) return false;
      const n = parseInt(inputs[inputs.length-1].value);
      if (isNaN(n)) return false;
      const expected = Math.abs(Math.pow(n, 3) - Math.pow(n, 2));
      return output.trim().split(/\s+/).some(v => parseFloat(v) === expected);
    }
  },
  {
    id: 8,
    title: 'Урок 8: "Фінальний виклик #2"',
    subtitle: 'Розгорнути число у зворотньому порядку',
    theory: `
      <h3>Розворот числа 🔄</h3>
      <p>За допомогою <code>% 10</code> та <code>// 10</code> можна розгорнути цифри числа навпаки.</p>
      <div class="theory-card">
        <pre><code>n = 1234
reversed_n = 0
while n > 0:
    digit = n % 10      # остання цифра
    reversed_n = reversed_n * 10 + digit
    n //= 10
# reversed_n → 4321</code></pre>
      </div>
      <div class="instruction-box">
        <h4>📝 Твоє завдання:</h4>
        <p>Зчитай число. Виведи його цифри у <strong>зворотньому порядку</strong>.</p>
        <p><em>Приклад:</em> 12345 → 54321</p>
      </div>
    `,
    initialCode: `n = int(input("Число: "))
original = n
reversed_n = 0

# Напиши while цикл для розвороту числа:
# digit = n % 10
# reversed_n = reversed_n * 10 + digit
# n //= 10

print(f"{original} → {reversed_n}")
`,
    hints: [
      '<code>digit = n % 10</code> — остання цифра',
      '<code>reversed_n = reversed_n * 10 + digit</code> — додати цифру',
      'Повний цикл:<br><code>while n &gt; 0:</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;digit = n % 10</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;reversed_n = reversed_n * 10 + digit</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;n //= 10</code>'
    ],
    validate: (output, code, terminalLogs) => {
      if (!/\bwhile\b/.test(code)) return false;
      const inputs = terminalLogs.filter(l => l.type === 'input');
      if (!inputs.length) return false;
      const n = parseInt(inputs[0].value);
      if (isNaN(n) || n <= 0) return false;
      const reversed = parseInt(String(n).split('').reverse().join(''));
      return output.trim().includes(String(reversed));
    }
  },
  {
    id: 9,
    title: 'Домашнє завдання: Сума цифр двозначного числа',
    subtitle: 'Перша + друга цифра двозначного числа',
    theory: `
      <h3>Домашнє завдання 🏠</h3>
      <div class="instruction-box">
        <h4>📝 Твоє завдання:</h4>
        <p>Зчитай <strong>двозначне число</strong> (від 10 до 99). Виведи суму його першої та другої цифри.</p>
        <p><em>Підказка:</em></p>
        <ul>
          <li>Перша цифра (десятки): <code>n // 10</code></li>
          <li>Друга цифра (одиниці): <code>n % 10</code></li>
          <li>Сума: <code>first + second</code></li>
        </ul>
        <p><em>Приклади:</em> 45 → 4+5 = 9; 83 → 8+3 = 11; 17 → 1+7 = 8</p>
      </div>
    `,
    initialCode: `n = int(input("Двозначне число (10-99): "))

# Знайди першу цифру (десятки): n // 10
# Знайди другу цифру (одиниці): n % 10
# Порахуй суму і виведи результат
`,
    hints: [
      '<code>first = n // 10</code> — перша цифра (десятки)',
      '<code>second = n % 10</code> — друга цифра (одиниці)',
      'Повне рішення:<br><code>first = n // 10</code><br><code>second = n % 10</code><br><code>total = first + second</code><br><code>print(f"Перша: {first}, Друга: {second}")</code><br><code>print(f"Сума цифр: {total}")</code>'
    ],
    validate: (output, code, terminalLogs) => {
      if (!/ \/\//.test(code) && !/ %/.test(code)) return false;
      const inputs = terminalLogs.filter(l => l.type === 'input');
      if (!inputs.length) return false;
      const n = parseInt(inputs[inputs.length-1].value);
      if (isNaN(n) || n < 10 || n > 99) return false;
      const expected = Math.floor(n/10) + (n % 10);
      return output.trim().includes(String(expected));
    }
  }
];

const handbookData = {
  variables: `<div class="handbook-section"><h3>📦 Змінні</h3><div class="concept-card"><pre><code class="language-python">n = 456
s = str(n)    # "456"
d = int(s)    # 456
c = len(s)    # 3</code></pre></div></div>`,
  math: `<div class="handbook-section"><h3>🧮 Математика</h3><div class="concept-card"><h4>Основні операції:</h4><pre><code class="language-python">n ** 2    # квадрат
n ** 3    # куб
n ** 0.5  # корінь
abs(n)    # модуль
n % 10    # остання цифра
n // 10   # без останньої
len(str(n)) # кількість цифр</code></pre></div></div>`,
  logic: `<div class="handbook-section"><h3>🛡️ Умови</h3><div class="concept-card"><pre><code class="language-python">if n % 2 == 0:
    print("парне")
if abs(a - b) < 5:
    print("близько")</code></pre></div></div>`,
  loops: `<div class="handbook-section"><h3>🔄 Цикли</h3><div class="concept-card"><h4>Сума цифр:</h4><pre><code class="language-python">total = 0
while n > 0:
    total += n % 10
    n //= 10</code></pre></div><div class="concept-card"><h4>Розворот числа:</h4><pre><code class="language-python">rev = 0
while n > 0:
    rev = rev * 10 + n % 10
    n //= 10</code></pre></div></div>`,
  functions: `<div class="handbook-section"><h3>🔢 Функції</h3><div class="concept-card"><h4>Математичні:</h4><pre><code class="language-python">abs(-5)     # → 5
2 ** 10     # → 1024
len(str(n)) # кількість цифр
int(str(n)[0]) # перша цифра</code></pre></div></div>`
};
