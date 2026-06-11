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
      <p>Чистий код — це код, який легко читати і розуміти. Це важливо коли викладач перевіряє твою роботу або коли ти повертаєшся до коду через тиждень.</p>
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
n = int(input())          # зчитуємо число
cube = n ** 3             # обчислюємо куб
square = n ** 2           # обчислюємо квадрат
result = abs(cube - square)  # різниця по модулю
print(result)</code></pre>
      </div>
      <div class="instruction-box">
        <h4>📝 Твоє завдання:</h4>
        <p>Запусти чистий код вище і перевір: N=5 → 100.</p>
      </div>
    `,
    initialCode: `# Задача 1: модуль різниці куба та квадрата
n = int(input())

# Напиши з хорошими змінними:
# cube = n ** 3
# square = n ** 2
# result = abs(cube - square)
`,
    hints: ['Дай змінним зрозумілі імена (cube, square, result) і збери відповідь із куба, квадрата та модуля їх різниці.'],
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
      <p>Символ <code>#</code> починає коментар — Python ігнорує все після нього. Коментарі пояснюють <em>навіщо</em>, а не що робить код.</p>
      <div class="theory-card">
        <h4>❌ Зайвий коментар (очевидно):</h4>
        <pre><code>x = 5  # присвоюємо 5 змінній x</code></pre>
      </div>
      <div class="theory-card">
        <h4>✅ Корисний коментар (пояснює логіку):</h4>
        <pre><code># (N-1) кратне 3 → X є цілим числом
if (n - 1) % 3 == 0:
    print((n - 1) // 3)</code></pre>
      </div>
      <div class="instruction-box">
        <h4>📝 Твоє завдання:</h4>
        <p>Додай коментарі до Задачі #4. Поясни логіку кожного кроку.</p>
      </div>
    `,
    initialCode: `# Задача 4: X = (N-1)/3, перевірити чи X ціле
n = int(input())

# Додай коментар до кожного рядка:
if (n - 1) % 3 == 0:
    print((n - 1) // 3)
else:
    print(False)
`,
    hints: ['Коментар має пояснювати НАВІЩО рядок, а не що він робить. Наприклад: чому саме кратність (N-1) на 3 робить X цілим.'],
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
        <li>Латиниця та підкреслення: <code>user_guess</code>, <code>attempt_count</code></li>
        <li>Маленькими літерами зі snake_case: <code>digit_count</code></li>
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
        <p>Запусти чистий код гри і перевір що він правильно рахує спроби.</p>
      </div>
    `,
    initialCode: `secret_number = 7
user_guess = 0
attempt_count = 0

# Напиши while цикл з хорошими назвами змінних:
# while user_guess != secret_number:
#     user_guess = int(input("Спроба: "))
#     attempt_count += 1

# Виведи результат
`,
    hints: ['Змінні з хорошими іменами вже задані. Цикл повторюється, поки спроба не дорівнює секрету; усередині — нове введення і +1 до лічильника спроб.'],
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
    subtitle: 'Переписати задачу з коментарями і хорошими змінними',
    theory: `
      <h3>Рефакторинг 🔧</h3>
      <p><strong>Рефакторинг</strong> — покращення коду без зміни результату. Задача #2 після рефакторингу:</p>
      <div class="theory-card">
        <pre><code># Задача 2: вивести перші N елементів
# послідовності 1, 2, 3, 1, 2, 3, ...
element_count = int(input())    # кількість елементів
cycle_length = 3                # довжина циклу

for index in range(element_count):
    # Формула: залишок від ділення + 1
    current_element = (index % cycle_length) + 1
    print(current_element)</code></pre>
      </div>
      <div class="instruction-box">
        <h4>📝 Твоє завдання:</h4>
        <p>Запусти цей код і перевір: N=7 → 1 2 3 1 2 3 1.</p>
      </div>
    `,
    initialCode: `# Задача 2: перші N елементів послідовності 1,2,3,1,2,3,...
element_count = int(input())
cycle_length = 3

# Напиши for цикл з хорошими назвами змінних:
# for index in range(element_count):
#     current_element = (index % cycle_length) + 1
`,
    hints: ['Імена element_count, cycle_length, index уже задані — використай їх замість коротких n, i. Формула послідовності — та сама (index % cycle_length) + 1.'],
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
    # Формуємо нове 4-значне число
    four_digit = base_number * 10 + digit

    # Перевіряємо ділення на 3
    if four_digit % 3 == 0:
        print(four_digit)</code></pre>
      </div>
      <div class="instruction-box">
        <h4>📝 Твоє завдання:</h4>
        <p>Запусти і введи 100 → має вивести 1002, 1005, 1008.</p>
      </div>
    `,
    initialCode: `# Задача 3: дописати цифру до тризначного числа
base_number = int(input())

# Напиши for цикл з хорошими назвами (digit, four_digit):
# for digit in range(10):
#     four_digit = base_number * 10 + digit
#     if four_digit % 3 == 0: print(four_digit)
`,
    hints: ['Використай зрозумілі імена digit і four_digit. Логіка — як у задачі #3: цикл по цифрах 0–9, нове число, перевірка кратності 3.'],
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
        <p>Запусти і введи 12 → має вивести 3 4 5.</p>
      </div>
    `,
    initialCode: `# Задача 5: три послідовні числа з сумою S
numbers_sum = int(input())

# Знайди middle = numbers_sum // 3
# Виведи: middle-1, middle, middle+1
`,
    hints: ['Змінна numbers_sum уже задана. Середнє число — ціле ділення суми на 3, далі виведи сусідів зліва і справа від нього.'],
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
    title: 'Урок 7: "Фінальний виклик #1"',
    subtitle: 'Напиши Задачу #1 максимально чисто',
    theory: `
      <h3>Clean Code челендж 💪</h3>
      <p>Напиши Задачу #1 з нуля, але дотримуйся правил:</p>
      <ul>
        <li>Хороші назви змінних</li>
        <li>Коментар до кожного кроку</li>
        <li>Без зайвого коду</li>
      </ul>
      <div class="instruction-box">
        <h4>📝 Задача #1:</h4>
        <p>Знайти <code>|N³ - N²|</code></p>
      </div>
    `,
    initialCode: `# Задача 1: |N^3 - N^2|
# Твоя чиста версія:


`,
    hints: [
      'Назви змінні чітко: <code>input_number</code>, <code>cube_value</code>, <code>square_value</code>, <code>result</code>.',
      'Додай коментар до кожного рядка: що він робить і навіщо.'
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
    title: 'Урок 8: "Фінальний виклик #2"',
    subtitle: 'Перевір власний код — що можна покращити?',
    theory: `
      <h3>Код-рев'ю 🔍</h3>
      <p>Прочитай наступний код і знайди проблеми:</p>
      <div class="theory-card">
        <pre><code>a = int(input())
b = 0; c = 0
while b != a:
    b = int(input())
    c = c + 1
    if b < a: print("b")
    elif b > a: print("m")</code></pre>
      </div>
      <div class="instruction-box">
        <h4>📝 Твоє завдання:</h4>
        <p>Перепиши цей код правильно: з хорошими змінними, коментарями, і повними словами у виводі ("Більше", "Менше", а не "b" і "m").</p>
      </div>
    `,
    initialCode: `# Гра "Вгадай число" — чиста версія
secret_number = int(input("Секретне число: "))
user_guess = 0
attempt_count = 0

# Напиши while цикл з підказками "Більше! ↑" і "Менше! ↓"
# Після виходу виведи: f"Вгадав за {attempt_count} спроб! 🎉"
`,
    hints: ['Імена secret_number, user_guess, attempt_count уже задані. У циклі підказуй словами «Більше! ↑» / «Менше! ↓» і рахуй кожну спробу.'],
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
    subtitle: 'Фінальне домашнє — повний бойовий комплект з коментарями',
    theory: `
      <h3>Домашнє завдання 🏠</h3>
      <p>Це твій <strong>фінальний документ</strong> для іспиту. Всі 5 задач у чистому вигляді — з коментарями, хорошими змінними, зрозумілим кодом.</p>
      <div class="instruction-box">
        <h4>📝 Твоє завдання:</h4>
        <p>Напиши всі 5 задач (або вибери одну для перевірки). Кожна задача повинна мати:</p>
        <ul>
          <li>Коментар-заголовок: <code># Задача X: опис</code></li>
          <li>Хороші назви змінних (не a, b, c)</li>
          <li>Коментар до нетривіальних рядків</li>
        </ul>
      </div>
    `,
    initialCode: `# ===== Задача 1: |N^3 - N^2| =====
n = int(input())

# Напиши рішення з коментарями та хорошими змінними
`,
    hints: ['Це твій фінальний конспект. Для кожної задачі: коментар-заголовок, зрозумілі імена змінних і пояснення нетривіальних рядків. Для заліку достатньо задачі #1 з коментарями.'],
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
  variables: `<div class="handbook-section"><h3>📦 Змінні</h3><div class="concept-card"><h4>Clean Code: іменування</h4><ul><li>❌ <code>a, b, c, tmp</code></li><li>✅ <code>secret_number, user_guess, attempt_count</code></li><li>✅ <code>cube_value, square_value, result</code></li></ul></div></div>`,
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
