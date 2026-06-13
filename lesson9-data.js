// MODULE 9 — Чистий код та культура програмування
const STORAGE_PREFIX = 'pycode9_';
const FINAL_CODE = '9cC';

const lessons = [
  {
    id: 1,
    title: 'Урок 1: "Поганий vs Хороший код"',
    subtitle: 'Що таке чистий код і навіщо він потрібен',
    theory: `
      <h3>Чистий код (Clean Code) ✨</h3>
      <p>Чистий код — це код, який легко читати і розуміти. Важливо коли викладач перевіряє роботу або ти повертаєшся до коду через тиждень.</p>
      <div class="theory-card">
        <h4>❌ Поганий код:</h4>
        <pre><code>a = int(input())
b = a**3
c = a**2
print(abs(b-c))</code></pre>
      </div>
      <div class="theory-card">
        <h4>✅ Чистий код:</h4>
        <pre><code># Задача 1: модуль різниці куба та квадрата
n = int(input())
cube   = n ** 3
square = n ** 2
result = abs(cube - square)
print(result)</code></pre>
      </div>
      <div class="instruction-box">
        <h4>📝 Твоє завдання:</h4>
        <p>Напиши чисту версію Задачі #1: використай назви <code>cube</code>, <code>square</code>, <code>result</code>.</p>
        <p><em>Перевір: N=5 → 100, N=-5 → 150</em></p>
      </div>
    `,
    initialCode: `# Задача 1: модуль різниці куба та квадрата
n = int(input())

# Напиши чисту версію з хорошими назвами:
#   cube   = ...   (куб)
#   square = ...   (квадрат)
#   result = ...   (модуль різниці)
# і виведи result
`,
    hints: [
      'Використай назви <code>cube = n ** 3</code>, <code>square = n ** 2</code>, <code>result = abs(cube - square)</code>.',
      'Перевір: N=5 → 100, N=-5 → 150, N=1 → 0.',
      'Повне рішення:<br><code>cube = n ** 3</code><br><code>square = n ** 2</code><br><code>result = abs(cube - square)</code><br><code>print(result)</code>'
    ],
    validate: (output, code, terminalLogs) => {
      if (!/\babs\b/.test(code) || !/\*\*/.test(code)) return false;
      const inputs = terminalLogs.filter(l => l.type === 'input');
      if (!inputs.length) return false;
      const n = parseInt(inputs[inputs.length-1].value);
      if (isNaN(n)) return false;
      return output.trim().includes(String(Math.abs(Math.pow(n,3) - Math.pow(n,2))));
    }
  },
  {
    id: 2,
    title: 'Урок 2: "Коментарі #"',
    subtitle: 'Коли і як писати коментарі',
    theory: `
      <h3>Коментарі у Python 📝</h3>
      <p>Символ <code>#</code> починає коментар — Python ігнорує все після нього в цьому рядку.</p>
      <div class="theory-card">
        <h4>❌ Зайвий коментар (і так зрозуміло):</h4>
        <pre><code>x = 5  # присвоюємо 5 до x</code></pre>
      </div>
      <div class="theory-card">
        <h4>✅ Корисний коментар (пояснює логіку):</h4>
        <pre><code># (N-1) кратне 3 → X є цілим числом
if (n - 1) % 3 == 0:
    print((n - 1) // 3)</code></pre>
      </div>
      <div class="instruction-box">
        <h4>📝 Твоє завдання:</h4>
        <p>Додай коментарі до Задачі #4 — поясни НАВІЩО кожен рядок, а не що він робить.</p>
        <p><em>Перевір: N=10 → 3, N=11 → False</em></p>
      </div>
    `,
    initialCode: `# Задача 4: X = (N-1)/3, перевірити чи X ціле
n = int(input())

# Додай коментар: чому саме (n-1) % 3?
if (n - 1) % 3 == 0:
    print((n - 1) // 3)
else:
    print(False)
`,
    hints: [
      'Коментар пояснює НАВІЩО: наприклад, <code># X ціле лише якщо (N-1) кратне 3</code>.',
      'Запусти N=10 → 3, N=11 → False — код вже правильний, просто додай хоча б 1 коментар.'
    ],
    validate: (output, code, terminalLogs) => {
      if (!/#/.test(code)) return false;
      const inputs = terminalLogs.filter(l => l.type === 'input');
      if (!inputs.length) return false;
      const n = parseInt(inputs[inputs.length-1].value);
      if (isNaN(n)) return false;
      const out = output.trim();
      if ((n-1) % 3 === 0) return out === String(Math.floor((n-1)/3));
      return out === 'False';
    }
  },
  {
    id: 3,
    title: 'Урок 3: "Правила іменування змінних"',
    subtitle: 'secret_number замість a, user_guess замість b',
    theory: `
      <h3>Правила іменування 🏷️</h3>
      <ul>
        <li>Ім'я має відображати <strong>зміст</strong>: <code>secret_number</code>, не <code>a</code></li>
        <li>Латиниця та підкреслення (snake_case): <code>user_guess</code>, <code>attempt_count</code></li>
        <li>Без скорочень: <code>temperature</code>, не <code>tmp</code></li>
      </ul>
      <div class="theory-card">
        <h4>❌ Погано:</h4>
        <pre><code>a = 7; b = 0; c = 0
while b != a:
    b = int(input()); c += 1
print(c)</code></pre>
      </div>
      <div class="theory-card">
        <h4>✅ Чисто:</h4>
        <pre><code>secret_number = 7
user_guess = 0
attempt_count = 0
while user_guess != secret_number:
    user_guess = int(input("Спроба: "))
    attempt_count += 1
print(f"Вгадав за {attempt_count} спроб!")</code></pre>
      </div>
      <div class="instruction-box">
        <h4>📝 Твоє завдання:</h4>
        <p>Запусти чистий код гри. Вгадай число 7 — перевір що правильно рахує спроби.</p>
        <p><em>Введи будь-які числа, останнє — 7. Має вивести кількість спроб.</em></p>
      </div>
    `,
    initialCode: `secret_number = 7
user_guess = 0
attempt_count = 0

# Напиши цикл while: поки user_guess != secret_number
#   - зчитай user_guess: int(input("Спроба: "))
#   - збільш attempt_count на 1
# Після циклу виведи: f"Вгадав за {attempt_count} спроб!"
`,
    hints: [
      '<code>while user_guess != secret_number:</code> — повторюй, поки не вгадав.',
      'Усередині: <code>user_guess = int(input("Спроба: "))</code> і <code>attempt_count += 1</code>.',
      'Повне рішення:<br><code>while user_guess != secret_number:</code><br>&nbsp;&nbsp;&nbsp;&nbsp;<code>user_guess = int(input("Спроба: "))</code><br>&nbsp;&nbsp;&nbsp;&nbsp;<code>attempt_count += 1</code><br><code>print(f"Вгадав за {attempt_count} спроб!")</code>'
    ],
    validate: (output, code, terminalLogs) => {
      const hasGoodNames = /secret_number|user_guess|attempt_count/.test(code);
      if (!hasGoodNames) return false;
      const inputs = terminalLogs.filter(l => l.type === 'input');
      if (!inputs.length) return false;
      const last = parseInt(inputs[inputs.length-1].value);
      if (last !== 7) return false;
      return output.includes(String(inputs.length));
    }
  },
  {
    id: 4,
    title: 'Урок 4: "Рефакторинг Задачі #2"',
    subtitle: 'Та сама задача — з хорошими назвами змінних',
    theory: `
      <h3>Рефакторинг 🔧</h3>
      <p><strong>Рефакторинг</strong> — покращення коду без зміни результату. Ось Задача #2 після рефакторингу:</p>
      <div class="theory-card">
        <pre><code># Задача 2: перші N елементів послідовності 1,2,3,...
element_count = int(input())  # скільки виводити
cycle_length  = 3             # довжина циклу

for index in range(element_count):
    current = (index % cycle_length) + 1
    print(current)</code></pre>
      </div>
      <div class="theory-card">
        <h4>Порівняння назв:</h4>
        <pre><code>❌  n, i, x
✅  element_count, index, current</code></pre>
      </div>
      <div class="instruction-box">
        <h4>📝 Твоє завдання:</h4>
        <p>Запусти цей код. Перевір: N=7 → 1 2 3 1 2 3 1 (кожен з нового рядка).</p>
      </div>
    `,
    initialCode: `# Задача 2: перші N елементів послідовності 1,2,3,1,2,3,...
element_count = int(input())
cycle_length  = 3

# Напиши цикл по range(element_count) з хорошими назвами (index, current).
# Виведи елемент послідовності 1,2,3,1,2,3...
`,
    hints: [
      'Цикл: <code>for index in range(element_count):</code>.',
      'Усередині: <code>current = (index % cycle_length) + 1</code>, потім <code>print(current)</code>.',
      'Повне рішення:<br><code>for index in range(element_count):</code><br>&nbsp;&nbsp;&nbsp;&nbsp;<code>current = (index % cycle_length) + 1</code><br>&nbsp;&nbsp;&nbsp;&nbsp;<code>print(current)</code>'
    ],
    validate: (output, code, terminalLogs) => {
      if (!/\bfor\b/.test(code) || !/%/.test(code)) return false;
      const inputs = terminalLogs.filter(l => l.type === 'input');
      if (!inputs.length) return false;
      const n = parseInt(inputs[inputs.length-1].value);
      if (isNaN(n) || n <= 0) return false;
      const lines = output.trim().split('\n').map(l => l.trim()).filter(l => /^\d+$/.test(l));
      for (let i = 0; i < Math.min(n, lines.length); i++) {
        if (parseInt(lines[i]) !== (i%3)+1) return false;
      }
      return lines.length >= n;
    }
  },
  {
    id: 5,
    title: 'Урок 5: "Рефакторинг Задачі #3"',
    subtitle: 'Задача з вкладеним циклом — з коментарями',
    theory: `
      <h3>Задача #3 — чистий варіант 🔧</h3>
      <div class="theory-card">
        <pre><code># Задача 3: дописати цифру до тризначного числа
# щоб 4-значне число ділилось на 3
base_number = int(input())  # тризначне вхідне число

# Перебираємо всі можливі цифри 0-9
for digit in range(10):
    four_digit = base_number * 10 + digit  # дописати цифру
    if four_digit % 3 == 0:               # перевірити кратність
        print(four_digit)</code></pre>
      </div>
      <div class="instruction-box">
        <h4>📝 Твоє завдання:</h4>
        <p>Запусти і введи 100 → має вивести 1002, 1005, 1008.</p>
        <p>Потім спробуй 200 → 2001, 2004, 2007.</p>
      </div>
    `,
    initialCode: `# Задача 3: дописати цифру до тризначного числа
base_number = int(input())

# Цикл по цифрах 0-9 з хорошими назвами (digit, four_digit):
#   four_digit = base_number * 10 + digit
#   якщо four_digit ділиться на 3 — виведи його
`,
    hints: [
      'Цикл: <code>for digit in range(10):</code>, число: <code>four_digit = base_number * 10 + digit</code>.',
      'Умова: <code>if four_digit % 3 == 0: print(four_digit)</code>.',
      'Зверни увагу на назви <code>base_number</code>, <code>digit</code>, <code>four_digit</code> — одразу зрозуміло, що означає кожна.'
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
    id: 6,
    title: 'Урок 6: "Рефакторинг Задачі #5"',
    subtitle: 'Три послідовні числа — з поясненнями',
    theory: `
      <h3>Задача #5 — чистий варіант 🔧</h3>
      <div class="theory-card">
        <pre><code># Задача 5: знайти три послідовні числа за їх сумою
numbers_sum = int(input())  # сума трьох чисел

# Математична логіка:
# Якщо числа (x-1), x, (x+1), то їх сума = 3*x
# Тому середнє число x = sum / 3
middle = numbers_sum // 3

# Виводимо три числа у порядку зростання
print(middle - 1, middle, middle + 1)</code></pre>
      </div>
      <div class="instruction-box">
        <h4>📝 Твоє завдання:</h4>
        <p>Запусти і введи 12 → має вивести 3 4 5. Потім -3 → -2 -1 0.</p>
      </div>
    `,
    initialCode: `# Задача 5: три послідовні числа з сумою S
numbers_sum = int(input())

# Знайди середнє число цілим діленням суми на 3 (назви його middle)
# Виведи три числа: middle-1, middle, middle+1
`,
    hints: [
      'Середнє: <code>middle = numbers_sum // 3</code>.',
      'Вивід: <code>print(middle - 1, middle, middle + 1)</code>.',
      'Зверни увагу: <code>numbers_sum</code> і <code>middle</code> — набагато зрозуміліше, ніж <code>s</code> і <code>x</code>.'
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
    id: 7,
    title: 'Урок 7: "Самостійно: Задача #1 у чистому стилі"',
    subtitle: 'Напиши з хорошими назвами і коментарями',
    theory: `
      <h3>Clean Code виклик 💪</h3>
      <p>Напиши Задачу #1 <strong>самостійно</strong> — з хорошими назвами змінних і коментарями.</p>
      <div class="theory-card">
        <h4>📋 Умова Задачі #1:</h4>
        <p>Задано ціле число N. Знайти модуль різниці куба та квадрата числа N.</p>
      </div>
      <div class="theory-card">
        <h4>Правила чистого коду:</h4>
        <ul>
          <li>Хороші назви: <code>cube</code>, <code>square</code>, <code>result</code> — не <code>a</code>, <code>b</code>, <code>c</code></li>
          <li>Коментар там де логіка неочевидна</li>
          <li>Один рядок — одна думка</li>
        </ul>
      </div>
      <div class="instruction-box">
        <h4>📝 Твоє завдання:</h4>
        <p>Напиши рішення використовуючи правила вище. Перевір: N=5 → 100, N=-5 → 150.</p>
      </div>
    `,
    initialCode: `# Задача 1: |N^3 - N^2|

n = int(input())

# Твоя чиста версія з хорошими назвами:
`,
    hints: [
      'Використай: <code>cube = n ** 3</code>, <code>square = n ** 2</code>, <code>result = abs(cube - square)</code>.',
      'Перевір: N=5 → 100, N=3 → 18, N=-2 → 12.'
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
    id: 8,
    title: 'Урок 8: "Код-рев\'ю: знайди і виправ"',
    subtitle: 'Перепиши брудний код у чистий варіант',
    theory: `
      <h3>Код-рев'ю 🔍</h3>
      <p>Знайди проблеми у цьому коді і перепиши його чисто:</p>
      <div class="theory-card">
        <h4>❌ Брудний код:</h4>
        <pre><code>a = int(input())
b = 0; c = 0
while b != a:
    b = int(input())
    c = c + 1
    if b < a: print("b")
    elif b > a: print("m")</code></pre>
      </div>
      <div class="theory-card">
        <h4>Що не так:</h4>
        <ul>
          <li><code>a, b, c</code> — незрозумілі назви</li>
          <li><code>"b"</code> і <code>"m"</code> — повні слова краще</li>
        </ul>
      </div>
      <div class="instruction-box">
        <h4>📝 Твоє завдання:</h4>
        <p>Перепиши гру з хорошими назвами і підказками <strong>"Більше! ↑"</strong> / <strong>"Менше! ↓"</strong>.</p>
        <p><em>Введи секретне число → вгадуй → отримай кількість спроб</em></p>
      </div>
    `,
    initialCode: `# Гра "Вгадай число" — чиста версія
secret_number = int(input("Секретне число: "))
user_guess = 0
attempt_count = 0

# Напиши while цикл:
# - зчитуй user_guess
# - збільшуй attempt_count
# - підказуй "Більше! ↑" або "Менше! ↓"
# Після циклу: f"Вгадав за {attempt_count} спроб! 🎉"
`,
    hints: [
      '<code>while user_guess != secret_number:</code> — цикл поки не вгадав.',
      '<code>if user_guess < secret_number: print("Більше! ↑")</code> і <code>elif ... : print("Менше! ↓")</code>.'
    ],
    validate: (output, code, terminalLogs) => {
      const hasGoodNames = /secret_number|user_guess|attempt_count/.test(code);
      if (!hasGoodNames) return false;
      const hasGoodOutput = /більше|менше/i.test(code);
      if (!hasGoodOutput) return false;
      const inputs = terminalLogs.filter(l => l.type === 'input');
      if (inputs.length < 2) return false;
      return output.includes(String(inputs.length - 1));
    }
  },
  {
    id: 9,
    title: 'Домашнє завдання: Всі 5 задач у чистому вигляді',
    subtitle: 'Фінальний конспект — повний бойовий комплект з коментарями',
    theory: `
      <h3>Домашнє завдання 🏠</h3>
      <p>Це твій <strong>фінальний конспект</strong> для іспиту. Всі 5 задач — з коментарями і хорошими назвами.</p>
      <div class="theory-card">
        <h4>Критерії чистого коду:</h4>
        <ul>
          <li>✅ Коментар-заголовок: <code># Задача X: опис</code></li>
          <li>✅ Змінні з іменем: не <code>a, b, c</code></li>
          <li>✅ Коментар до нетривіальних рядків</li>
        </ul>
      </div>
      <div class="instruction-box">
        <h4>📝 Твоє завдання:</h4>
        <p>Напиши хоча б одну задачу (або всі 5) у чистому стилі. Мінімум 3 коментарі <code>#</code> у коді.</p>
        <p>Рекомендуємо написати Задачу #1 з коментарями — вона на іспиті точно буде.</p>
      </div>
    `,
    initialCode: `# ===== Задача 1: |N^3 - N^2| =====
n = int(input())

# Напиши чисте рішення (мінімум 3 коментарі # у коді):
#   - окремо cube і square
#   - result = модуль різниці
#   - виведи result
`,
    hints: [
      'Мінімум 3 коментарі <code>#</code>. Заголовок вже є — додай ще пояснення до коду.',
      'Використай <code>cube</code>, <code>square</code>, <code>result</code> — не <code>a, b, c</code>.',
      'Повне рішення:<br><code># Рахуємо куб і квадрат</code><br><code>cube = n ** 3</code><br><code>square = n ** 2</code><br><code># Модуль різниці завжди додатній</code><br><code>result = abs(cube - square)</code><br><code>print(result)</code>'
    ],
    validate: (output, code, terminalLogs) => {
      const hasComments = (code.match(/#/g) || []).length >= 3;
      if (!hasComments) return false;
      const hasMeaningfulVars = !/^\s*(a|b|c)\s*=/m.test(code);
      const inputs = terminalLogs.filter(l => l.type === 'input');
      if (!inputs.length) return false;
      const n = parseInt(inputs[inputs.length-1].value);
      if (isNaN(n)) return false;
      return output.trim().length > 0;
    }
  }
];

const handbookData = {
  variables: `<div class="handbook-section"><h3>📦 Змінні</h3><div class="concept-card"><h4>Clean Code: іменування</h4><ul><li>❌ <code>a, b, c, tmp</code></li><li>✅ <code>secret_number, user_guess, attempt_count</code></li><li>✅ <code>cube, square, result</code></li></ul></div></div>`,
  math: `<div class="handbook-section"><h3>🧮 Задачі іспиту</h3><div class="concept-card"><h4>Всі 5 формул:</h4><pre><code class="language-python"># Задача 1:
abs(n**3 - n**2)

# Задача 4:
if (n-1) % 3 == 0: print((n-1)//3)
else: print(False)

# Задача 5:
x = s // 3; print(x-1, x, x+1)

# Задача 2:
for i in range(n): print((i%3)+1)

# Задача 3:
for d in range(10):
    num = n*10+d
    if num % 3 == 0: print(num)</code></pre></div></div>`,
  logic: `<div class="handbook-section"><h3>🛡️ Коментарі</h3><div class="concept-card"><pre><code class="language-python"># Хороший коментар пояснює НАВІЩО:
# (N-1) ділиться на 3 → X ціле
if (n-1) % 3 == 0:
    print((n-1)//3)

# Поганий коментар (і так зрозуміло):
x = 5  # присвоюємо 5 до x</code></pre></div></div>`,
  loops: `<div class="handbook-section"><h3>🔄 Цикли з clear names</h3><div class="concept-card"><pre><code class="language-python"># Читабельна версія Задачі 3:
base_number = int(input())
for digit in range(10):
    four_digit = base_number * 10 + digit
    if four_digit % 3 == 0:
        print(four_digit)</code></pre></div></div>`,
  functions: `<div class="handbook-section"><h3>🔢 Функції</h3><div class="concept-card"><pre><code class="language-python">abs(x)   # модуль
x ** 2   # квадрат
x ** 3   # куб
x // 3   # ціле ділення
x % 3    # залишок/кратність
len(str(x)) # кількість цифр</code></pre></div></div>`
};
