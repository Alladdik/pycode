// MODULE 3 — Цикл while та зациклення
const STORAGE_PREFIX = 'pycode3_';
const FINAL_CODE = '3wH';

const lessons = [
  {
    id: 1,
    title: 'Урок 1: "Виведи числа від 1 до N"',
    subtitle: 'while — тіло циклу: print і лічильник',
    theory: `
      <h3>Цикл while — три обов'язкові частини 🔄</h3>
      <p>Кожен <code>while</code> потребує: початкове значення, умова, зміна змінної всередині.</p>
      <div class="theory-card">
        <h4>Шаблон:</h4>
        <pre><code>i = 1              # 1) початок
while i <= n:      # 2) умова
    print(i)       # ← тут пишеш дію
    i += 1         # 3) зміна лічильника</code></pre>
      </div>
      <div class="instruction-box">
        <h4>📝 Твоє завдання:</h4>
        <p>Змінна <code>i</code> та умова вже є. Всередині циклу — два порожніх рядки. Напиши: вивід поточного значення <code>i</code> та збільшення лічильника.</p>
        <p><em>Приклад:</em> N=4 → 1, 2, 3, 4</p>
      </div>
    `,
    initialCode: `n = int(input("Введи N: "))
i = 1

while i <= n:
    # Напиши тут: вивести i


`,
    hints: [
      'Всередині циклу напиши <code>print(i)</code> та на наступному рядку <code>i += 1</code> (або <code>i = i + 1</code>).',
      'Без <code>i += 1</code> програма зависне — умова <code>i <= n</code> ніколи не стане False.',
      'Два рядки, які потрібні:<br><code>&nbsp;&nbsp;&nbsp;&nbsp;print(i)</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;i += 1</code>'
    ],
    validate: (output, code, terminalLogs) => {
      if (!/\bwhile\b/.test(code)) return false;
      const inputs = terminalLogs.filter(l => l.type === 'input');
      if (!inputs.length) return false;
      const n = parseInt(inputs[inputs.length - 1].value);
      if (isNaN(n) || n <= 0 || n > 20) return false;
      const lines = output.trim().split('\n').map(l => l.trim()).filter(l => l !== '');
      let idx = 0;
      for (const line of lines) {
        if (idx < n && line === String(idx + 1)) idx++;
      }
      return idx === n;
    }
  },
  {
    id: 2,
    title: 'Урок 2: "Зворотній відлік"',
    subtitle: 'Написати while цикл що рахує вниз',
    theory: `
      <h3>Цикл вниз — зменшуємо лічильник ⬇️</h3>
      <p>Щоб рахувати у зворотньому напрямку, лічильник <strong>зменшується</strong>: <code>i -= 1</code>. Умова при цьому перевіряє <code>i >= 1</code>, а не <code>i <= n</code>.</p>
      <div class="theory-card">
        <h4>Порівняння:</h4>
        <pre><code># Вгору:            # Вниз:
i = 1              i = 10
while i <= 10:     while i >= 1:
    print(i)           print(i)
    i += 1             i -= 1</code></pre>
      </div>
      <div class="instruction-box">
        <h4>📝 Твоє завдання:</h4>
        <p>Напиши while цикл, який виводить числа від <strong>N до 1</strong> у зворотньому порядку. Зчитай N з клавіатури.</p>
        <p><em>Приклад:</em> N=5 → 5, 4, 3, 2, 1</p>
      </div>
    `,
    initialCode: `n = int(input("Введи N: "))

# Напиши while цикл від n до 1
# i починається з n, умова i >= 1, всередині i -= 1
`,
    hints: [
      'Почни з <code>i = n</code>. Умова: <code>while i >= 1:</code>. Всередині: <code>print(i)</code> і <code>i -= 1</code>.',
      'Структура:<br><code>i = n</code><br><code>while i >= 1:</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;print(i)</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;i -= 1</code>'
    ],
    validate: (output, code, terminalLogs) => {
      if (!/\bwhile\b/.test(code)) return false;
      const inputs = terminalLogs.filter(l => l.type === 'input');
      if (!inputs.length) return false;
      const n = parseInt(inputs[inputs.length - 1].value);
      if (isNaN(n) || n <= 0 || n > 20) return false;
      const lines = output.trim().split('\n').map(l => l.trim()).filter(l => /^\d+$/.test(l));
      let idx = 0;
      for (const line of lines) {
        if (idx < n && parseInt(line) === n - idx) idx++;
      }
      return idx === n;
    }
  },
  {
    id: 3,
    title: 'Урок 3: "Оператор !="',
    subtitle: 'while != — повторювати поки не введено правильне',
    theory: `
      <h3>Оператор <code>!=</code> у циклі 🔑</h3>
      <p><code>!=</code> означає «не дорівнює». Цикл <code>while x != target</code> крутиться поки значення <strong>не</strong> стало рівним цілі.</p>
      <div class="theory-card">
        <h4>Шаблон «повторюй поки неправильно»:</h4>
        <pre><code>answer = ""          # стартове значення
while answer != "ok": # умова — поки не "ok"
    answer = input("Введи: ")
print("Прийнято!")</code></pre>
      </div>
      <div class="instruction-box">
        <h4>📝 Твоє завдання:</h4>
        <p>Напиши програму-замок: правильний пароль — <code>"python"</code>. Програма повинна повторно запитувати, поки користувач не введе правильне слово. Після успіху виведи будь-яке повідомлення.</p>
      </div>
    `,
    initialCode: `correct_password = "python"
entered = ""  # стартове значення — точно не "python"

# Напиши while цикл: поки entered != correct_password
# Всередині: entered = input("Введи пароль: ")
# Після циклу — виведи будь-яке повідомлення про успіх
`,
    hints: [
      'Умова: <code>while entered != correct_password:</code>. Всередині: <code>entered = input("Введи пароль: ")</code>.',
      'Після циклу напиши будь-який <code>print()</code> з повідомленням — наприклад <code>print("Вхід успішний!")</code>.',
      'Готовий блок:<br><code>while entered != correct_password:</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;entered = input("Введи пароль: ")</code>'
    ],
    validate: (output, code, terminalLogs) => {
      if (!/\bwhile\b/.test(code) || !/!=/.test(code)) return false;
      const inputs = terminalLogs.filter(l => l.type === 'input');
      if (!inputs.length) return false;
      return inputs[inputs.length - 1].value.trim() === 'python';
    }
  },
  {
    id: 4,
    title: 'Урок 4: "Вгадай число — базова версія"',
    subtitle: 'Написати while цикл для гри без підказок',
    theory: `
      <h3>Гра «Вгадай число» 🎮</h3>
      <p>Класичний приклад <code>while !=</code>: гра не завершується, поки гравець не вгадав. Ми не знаємо скільки спроб знадобиться — тому <code>while</code>, а не <code>for</code>.</p>
      <div class="theory-card">
        <h4>Схема гри:</h4>
        <pre><code>secret = 15
guess = 0
while guess != secret:
    guess = int(input("Число: "))
print("Вгадав! 🎉")</code></pre>
      </div>
      <div class="instruction-box">
        <h4>📝 Твоє завдання:</h4>
        <p>Змінні <code>secret = 15</code> і <code>guess = 0</code> вже є. Напиши <code>while</code> цикл, який запитує числа поки не введено 15. Після вгадування виведи будь-яке повідомлення.</p>
      </div>
    `,
    initialCode: `secret = 15
guess = 0

print("Я загадав число від 1 до 20. Вгадай!")

# Напиши while цикл: поки guess != secret, зчитуй нове guess
# Після циклу — виведи будь-яке повідомлення про перемогу
`,
    hints: [
      'Напиши: <code>while guess != secret:</code> і всередині: <code>guess = int(input("Число: "))</code>.',
      'Після циклу напиши будь-який <code>print()</code> з повідомленням про перемогу — будь-який текст зарахується.',
      'Повний цикл:<br><code>while guess != secret:</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;guess = int(input("Число: "))</code>'
    ],
    validate: (output, code, terminalLogs) => {
      if (!/\bwhile\b/.test(code) || !/!=/.test(code)) return false;
      const inputs = terminalLogs.filter(l => l.type === 'input');
      if (!inputs.length) return false;
      return parseInt(inputs[inputs.length - 1].value) === 15;
    }
  },
  {
    id: 5,
    title: 'Урок 5: "Вгадай число 2.0 — з підказками"',
    subtitle: 'if/elif всередині while — підказки після кожної спроби',
    theory: `
      <h3>Підказки у грі 💡</h3>
      <p>Всередині циклу <code>while</code> можна писати будь-який код — в тому числі <code>if/elif</code>. Після кожної неправильної відповіді гравець отримає напрямок.</p>
      <div class="theory-card">
        <h4>Структура:</h4>
        <pre><code>while guess != secret:
    guess = int(input("Спроба: "))
    if guess &lt; secret:
        print("Більше! ↑")
    elif guess &gt; secret:
        print("Менше! ↓")</code></pre>
      </div>
      <div class="instruction-box">
        <h4>📝 Твоє завдання:</h4>
        <p>Секрет = <strong>37</strong>. Цикл і введення вже написані. Додай <code>if/elif</code> підказки: якщо guess менше — <code>Більше! ↑</code>, якщо більше — <code>Менше! ↓</code>.</p>
      </div>
    `,
    initialCode: `secret = 37
guess = 0

print("Число від 1 до 50. Вгадай!")

while guess != secret:
    guess = int(input("Твоя спроба: "))
    # Напиши підказки: if guess < secret і elif guess > secret
# Після циклу — виведи будь-яке повідомлення про перемогу
`,
    hints: [
      'Після рядка <code>guess = int(input(...))</code> додай:<br><code>if guess &lt; secret:</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;print("Більше! ↑")</code>',
      'Потім: <code>elif guess &gt; secret:</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;print("Менше! ↓")</code>',
      'Тест: введи 20 (→ Більше!), потім 45 (→ Менше!), потім 37 (→ Ура!).'
    ],
    validate: (output, code, terminalLogs) => {
      if (!/\bwhile\b/.test(code) || !/\belif\b/.test(code)) return false;
      const inputs = terminalLogs.filter(l => l.type === 'input');
      if (!inputs.length) return false;
      return parseInt(inputs[inputs.length - 1].value) === 37;
    }
  },
  {
    id: 6,
    title: 'Урок 6: "break — достроковий вихід"',
    subtitle: 'while True + break: сума чисел до введення 0',
    theory: `
      <h3>Оператор <code>break</code> 🛑</h3>
      <p><code>break</code> миттєво виходить з циклу. Конструкція <code>while True:</code> (нескінченний цикл) + <code>break</code> — коли умова виходу складна або в середині циклу.</p>
      <div class="theory-card">
        <h4>Шаблон:</h4>
        <pre><code>total = 0
while True:
    x = int(input("Число (0=кінець): "))
    if x == 0:
        break        # вийти
    total += x       # інакше — додати
print("Сума:", total)</code></pre>
      </div>
      <div class="instruction-box">
        <h4>📝 Твоє завдання:</h4>
        <p>Накопичувач <code>total = 0</code> вже є. Напиши цикл <code>while True</code>, який зчитує числа і додає їх до <code>total</code>. Якщо введено <strong>0</strong> — <code>break</code>. Після циклу виведи <code>Сума: X</code>.</p>
        <p><em>Приклад:</em> ввели 3, 7, 5, 0 → Сума: 15</p>
      </div>
    `,
    initialCode: `total = 0

# Напиши while True цикл:
# - зчитай x = int(input(...))
# - if x == 0: break
# - інакше: total += x

print("Сума:", total)
`,
    hints: [
      'Почни з <code>while True:</code>. Всередині: <code>x = int(input("Число (0=кінець): "))</code>',
      'Після введення: <code>if x == 0: break</code>. Інакше: <code>total += x</code>.',
      'Структура:<br><code>while True:</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;x = int(input("Число (0=кінець): "))</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;if x == 0: break</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;total += x</code>'
    ],
    validate: (output, code, terminalLogs) => {
      if (!/\bwhile\b/.test(code) || !/\bbreak\b/.test(code)) return false;
      const inputs = terminalLogs.filter(l => l.type === 'input');
      if (!inputs.length) return false;
      const nums = inputs.map(i => parseInt(i.value)).filter(v => !isNaN(v));
      const lastZero = nums.lastIndexOf(0);
      const toSum = lastZero >= 0 ? nums.slice(0, lastZero) : nums;
      const expected = toSum.reduce((a, b) => a + b, 0);
      const out = output.trim();
      const parsed = out.split(/[\s\n:]+/).map(v => parseInt(v)).filter(v => !isNaN(v));
      return parsed.some(v => v === expected);
    }
  },
  {
    id: 7,
    title: 'Урок 7: "Фінальний виклик #1"',
    subtitle: 'Підрахунок кількості цифр через while',
    theory: `
      <h3>Кількість цифр числа 🔢</h3>
      <p>Класичний алгоритм: відрізати останню цифру через <code>// 10</code>, рахувати скільки разів — це і є кількість цифр.</p>
      <div class="theory-card">
        <h4>Алгоритм:</h4>
        <pre><code>n = 12345
count = 0
while n > 0:
    n = n // 10  # відрізати останню цифру
    count += 1   # рахувати кроки
# count → 5</code></pre>
      </div>
      <div class="instruction-box">
        <h4>📝 Твоє завдання:</h4>
        <p>Змінні <code>n</code> і <code>count = 0</code> вже є. Напиши цикл <code>while n > 0</code>: всередині відрізай останню цифру і збільшуй лічильник. Виведи кількість цифр.</p>
        <p><em>Приклади:</em> 5 → 1, 42 → 2, 100 → 3, 9999 → 4</p>
      </div>
    `,
    initialCode: `n = int(input("Введи число: "))
count = 0

# Напиши: while n > 0 → n //= 10 → count += 1

print("Кількість цифр:", count)
`,
    hints: [
      'Умова циклу: <code>while n > 0:</code>. Всередині: <code>n //= 10</code> і <code>count += 1</code>.',
      'Коли n стане 0 — цикл зупиниться. Кількість ітерацій = кількість цифр.',
      'Повний цикл:<br><code>while n > 0:</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;n //= 10</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;count += 1</code>'
    ],
    validate: (output, code, terminalLogs) => {
      if (!/\bwhile\b/.test(code)) return false;
      const inputs = terminalLogs.filter(l => l.type === 'input');
      if (!inputs.length) return false;
      const n = parseInt(inputs[inputs.length - 1].value);
      if (isNaN(n) || n <= 0) return false;
      const expected = String(n).length;
      const parsed = output.trim().split(/[\s\n:]+/).map(v => parseInt(v)).filter(v => !isNaN(v));
      return parsed.some(v => v === expected);
    }
  },
  {
    id: 8,
    title: 'Урок 8: "Фінальний виклик #2"',
    subtitle: 'Сума цифр числа через while',
    theory: `
      <h3>Сума цифр числа 🧮</h3>
      <p>Схожий алгоритм: <code>n % 10</code> дає останню цифру — додай до суми. Потім <code>n //= 10</code> відрізає її. Повторюй поки n > 0.</p>
      <div class="theory-card">
        <h4>Алгоритм:</h4>
        <pre><code>n = 1234
total = 0
while n > 0:
    total += n % 10  # остання цифра → до суми
    n //= 10         # відрізати її
# total → 1+2+3+4 = 10</code></pre>
      </div>
      <div class="instruction-box">
        <h4>📝 Твоє завдання:</h4>
        <p>Змінні <code>n</code> і <code>total = 0</code> вже є. Напиши цикл <code>while n > 0</code>, який накопичує суму цифр. Виведи суму.</p>
        <p><em>Приклади:</em> 12345 → 15, 999 → 27, 100 → 1</p>
      </div>
    `,
    initialCode: `n = int(input("Число: "))
total = 0
temp = n  # зберігаємо оригінал для виводу

# Напиши: while temp > 0 → total += temp % 10 → temp //= 10

print(f"Сума цифр {n} = {total}")
`,
    hints: [
      'Умова: <code>while temp > 0:</code>. Всередині:<br><code>total += temp % 10</code> (додай останню цифру)<br><code>temp //= 10</code> (відріж її)',
      'Чому <code>temp</code> а не <code>n</code>? Щоб у виводі показати оригінальне число.',
      'Повний цикл:<br><code>while temp > 0:</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;total += temp % 10</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;temp //= 10</code>'
    ],
    validate: (output, code, terminalLogs) => {
      if (!/\bwhile\b/.test(code) || !/%/.test(code)) return false;
      const inputs = terminalLogs.filter(l => l.type === 'input');
      if (!inputs.length) return false;
      const n = parseInt(inputs[inputs.length - 1].value);
      if (isNaN(n) || n <= 0) return false;
      const expected = String(n).split('').reduce((s, d) => s + parseInt(d), 0);
      return output.trim().includes(String(expected));
    }
  },
  {
    id: 9,
    title: 'Домашнє завдання: Вгадайка з break і лічильником',
    subtitle: 'Написати повну гру: підказки + вихід при 0 + кількість спроб',
    theory: `
      <h3>Домашнє завдання 🏠</h3>
      <p>Об'єднай все: <code>while</code>, підказки <code>if/elif</code>, <code>break</code> при здачі та лічильник спроб.</p>
      <div class="instruction-box">
        <h4>📝 Твоє завдання — написати гру з нуля:</h4>
        <ol>
          <li>Секрет = <code>42</code>, лічильник <code>count = 0</code></li>
          <li>Цикл <code>while guess != secret</code></li>
          <li>Після кожного введення: <code>count += 1</code></li>
          <li>Якщо введено <strong>0</strong> → <code>print(f"Здався після {count} спроб 😔")</code> і <code>break</code></li>
          <li>Підказки: «Більше! ↑» або «Менше! ↓»</li>
          <li>Після циклу (якщо не break): <code>print(f"Вгадав за {count} спроб! 🎉")</code></li>
        </ol>
      </div>
    `,
    initialCode: `secret = 42
guess = 0
count = 0

print("Число від 1 до 50. Введи 0 щоб здатися.")

# Напиши while цикл: поки guess != secret
# Всередині: введення, лічильник, перевірка на 0 (break), підказки
# Після циклу — виведи результат (перемога або здача)
`,
    hints: [
      'Почни: <code>while guess != secret:</code>. Перший рядок всередині: <code>guess = int(input("Спроба: "))</code>. Другий: <code>count += 1</code>.',
      'Потім три умови: <code>if guess == 0:</code> (break + здача), <code>elif guess &lt; secret:</code> (більше), <code>elif guess &gt; secret:</code> (менше).',
      'Після всього циклу (поза ним): <code>print(f"Вгадав за {count} спроб! 🎉")</code> — але тільки якщо не був break. Використай <code>while...else</code> або провір <code>if guess == secret</code>.'
    ],
    validate: (output, code, terminalLogs) => {
      if (!/\bwhile\b/.test(code) || !/\bbreak\b/.test(code)) return false;
      const inputs = terminalLogs.filter(l => l.type === 'input');
      if (!inputs.length) return false;
      const last = parseInt(inputs[inputs.length - 1].value);
      if (last === 0) return output.trim().length > 0;
      if (last === 42) return output.trim().length > 0;
      return false;
    }
  }
];

const handbookData = {
  variables: `<div class="handbook-section"><h3>📦 Змінні та Типи</h3><div class="concept-card"><h4>Основні типи:</h4><ul><li><code>str</code>: <code>"hello"</code></li><li><code>int</code>: <code>42</code></li><li><code>float</code>: <code>3.14</code></li><li><code>bool</code>: <code>True/False</code></li></ul></div><div class="concept-card"><h4>Введення:</h4><pre><code class="language-python">name = input("Ім'я: ")
n = int(input("Число: "))</code></pre></div></div>`,
  math: `<div class="handbook-section"><h3>🧮 Математика</h3><div class="concept-card"><div class="op-grid"><div class="op-row-header">Op</div><div class="op-row-header">Приклад</div><div class="op-row"><span class="op-symbol">+</span></div><div class="op-row"><code>5+3→8</code></div><div class="op-row"><span class="op-symbol">-</span></div><div class="op-row"><code>10-4→6</code></div><div class="op-row"><span class="op-symbol">*</span></div><div class="op-row"><code>3*4→12</code></div><div class="op-row"><span class="op-symbol">//</span></div><div class="op-row"><code>7//2→3</code></div><div class="op-row"><span class="op-symbol">%</span></div><div class="op-row"><code>7%2→1</code></div></div></div><div class="concept-card"><h4>Цифри числа:</h4><pre><code class="language-python">n % 10   # остання цифра
n // 10  # без останньої
len(str(n))  # кількість цифр</code></pre></div></div>`,
  logic: `<div class="handbook-section"><h3>🛡️ Умови</h3><div class="concept-card"><h4>if / elif / else:</h4><pre><code class="language-python">if x > 0:
    print("+")
elif x == 0:
    print("0")
else:
    print("-")</code></pre></div><div class="concept-card"><h4>and / or:</h4><pre><code class="language-python">if x >= 1 and x <= 10:
    print("OK")
if x < 0 or x > 100:
    print("За межами")</code></pre></div></div>`,
  loops: `<div class="handbook-section"><h3>🔄 Цикл while</h3><div class="concept-card"><h4>Рахунок вгору:</h4><pre><code class="language-python">i = 1
while i <= n:
    print(i)
    i += 1</code></pre></div><div class="concept-card"><h4>Рахунок вниз:</h4><pre><code class="language-python">i = n
while i >= 1:
    print(i)
    i -= 1</code></pre></div><div class="concept-card"><h4>while != (вгадалка):</h4><pre><code class="language-python">guess = 0
while guess != secret:
    guess = int(input())</code></pre></div><div class="concept-card"><h4>while True + break:</h4><pre><code class="language-python">while True:
    x = int(input())
    if x == 0:
        break
    total += x</code></pre></div><div class="concept-card"><h4>while...else:</h4><pre><code class="language-python">while умова:
    ...
else:
    # виконується якщо НЕ break</code></pre></div><div class="concept-card"><h4>Сума/кількість цифр:</h4><pre><code class="language-python">count = 0
while n > 0:
    count += 1    # кількість цифр
    # або: total += n % 10  # сума цифр
    n //= 10</code></pre></div></div>`,
  functions: `<div class="handbook-section"><h3>🔢 Функції</h3><div class="concept-card"><pre><code class="language-python">abs(-5)      # → 5
len("hello") # → 5
str(42)      # → "42"
int("42")    # → 42</code></pre></div><div class="concept-card"><h4>f-рядки:</h4><pre><code class="language-python">count = 5
print(f"Спроб: {count}")</code></pre></div></div>`
};
