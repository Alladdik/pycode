// MODULE 4 — for, range() та Списки
const STORAGE_PREFIX = 'pycode4_';
const FINAL_CODE = '4fR';

const lessons = [
  {
    id: 1,
    title: 'Урок 1: "for та range(N)"',
    subtitle: 'Написати for цикл від 0 до N-1',
    theory: `
      <h3>Цикл <code>for</code> та <code>range(N)</code> 🔁</h3>
      <p><code>range(N)</code> генерує числа від <strong>0</strong> до <strong>N-1</strong>. Цикл <code>for</code> по черзі бере кожне значення.</p>
      <div class="theory-card">
        <h4>Шаблон:</h4>
        <pre><code>for i in range(5):
    print(i)
# → 0 1 2 3 4</code></pre>
      </div>
      <p>Відміна від <code>while</code>: не треба писати <code>i = 0</code> та <code>i += 1</code> — <code>for</code> сам все робить.</p>
      <div class="instruction-box">
        <h4>📝 Твоє завдання:</h4>
        <p>Змінна <code>n</code> вже є. Напиши <code>for</code> цикл який виводить числа від <strong>0 до N-1</strong>. Потім виведи <code>Готово!</code>.</p>
        <p><em>Приклад:</em> N=5 → 0, 1, 2, 3, 4, Готово!</p>
      </div>
    `,
    initialCode: `n = int(input("Введи N: "))

# Напиши for цикл з range(n)

print("Готово!")
`,
    hints: [
      'Напиши: <code>for i in range(n):</code>, і на наступному рядку з відступом: <code>print(i)</code>.',
      'Рядок <code>print("Готово!")</code> вже є — він після циклу.',
      'Два рядки які потрібні:<br><code>for i in range(n):</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;print(i)</code>'
    ],
    validate: (output, code, terminalLogs) => {
      if (!/\bfor\b/.test(code) || !/range/.test(code)) return false;
      const inputs = terminalLogs.filter(l => l.type === 'input');
      if (!inputs.length) return false;
      const n = parseInt(inputs[0].value);
      if (isNaN(n) || n <= 0) return false;
      // Sequential search: accumulatedOutput contains input value too, so skip it
      const lines = output.trim().split('\n').map(l => l.trim()).filter(l => /^\d+$/.test(l));
      let expected = 0;
      for (const line of lines) {
        if (parseInt(line) === expected) expected++;
        if (expected === n) break;
      }
      return expected === n && output.includes('Готово');
    }
  },
  {
    id: 2,
    title: 'Урок 2: "range(start, stop) — від 1 до N"',
    subtitle: 'Два аргументи: початок і кінець',
    theory: `
      <h3>range(start, stop) 📏</h3>
      <p><code>range(start, stop)</code> генерує числа від <code>start</code> до <code>stop-1</code>. Щоб отримати числа 1..N: <code>range(1, N+1)</code>.</p>
      <div class="theory-card">
        <h4>Порівняння:</h4>
        <pre><code>range(5)     # 0,1,2,3,4  (від 0)
range(1, 6)  # 1,2,3,4,5  (від 1 до 5)</code></pre>
      </div>
      <div class="instruction-box">
        <h4>📝 Твоє завдання:</h4>
        <p>Зчитай <code>N</code>. Напиши <code>for</code> цикл, який виводить числа від <strong>1 до N включно</strong>. Використай <code>range(1, n+1)</code>.</p>
        <p><em>Приклад:</em> N=5 → 1, 2, 3, 4, 5</p>
      </div>
    `,
    initialCode: `n = int(input("Введи N: "))

# Напиши for цикл: виведи числа від 1 до n включно
# Підказка: range(1, n+1) дає 1,2,...,n
`,
    hints: [
      '<code>for i in range(1, n+1):</code> — починається з 1, закінчується n+1-1=n.',
      'Всередині циклу: <code>print(i)</code>.',
      'Дві строки:<br><code>for i in range(1, n+1):</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;print(i)</code>'
    ],
    validate: (output, code, terminalLogs) => {
      if (!/\bfor\b/.test(code)) return false;
      const inputs = terminalLogs.filter(l => l.type === 'input');
      if (!inputs.length) return false;
      const n = parseInt(inputs[0].value);
      if (isNaN(n) || n <= 0) return false;
      const lines = output.trim().split('\n').map(l => l.trim()).filter(l => /^\d+$/.test(l));
      let expected = 1;
      for (const line of lines) {
        if (parseInt(line) === expected) expected++;
        if (expected > n) break;
      }
      return expected > n;
    }
  },
  {
    id: 3,
    title: 'Урок 3: "range з кроком — зворотній відлік"',
    subtitle: 'Підібрати правильні аргументи range(start, stop, step)',
    theory: `
      <h3>range(start, stop, step) 🚀</h3>
      <p>Третій аргумент — крок. Від'ємний крок → рухаємось назад. При цьому: start > stop!</p>
      <div class="theory-card">
        <h4>Приклади:</h4>
        <pre><code>range(10, 0, -1) # 10,9,8,7,6,5,4,3,2,1
range(0, 10, 2)  # 0,2,4,6,8
range(1, 10, 3)  # 1,4,7</code></pre>
      </div>
      <div class="instruction-box">
        <h4>📝 Твоє завдання:</h4>
        <p>Цикл уже є, але аргументи <code>range</code> написані зі знаками питання. Заміни <code>?</code> на правильні числа, щоб вивести відлік від 10 до 1, а потім <code>Поїхали! 🚀</code>.</p>
      </div>
    `,
    initialCode: `print("Зворотній відлік!")

for i in range(?, ?, ?):  # Заміни ? на правильні значення
    print(i)

print("Поїхали! 🚀")
`,
    hints: [
      'range(start, stop, step). Start = 10 (починаємо), stop = 0 (до нуля, не включаючи), step = -1 (кrok вниз).',
      'Заміни на: <code>range(10, 0, -1)</code>. Це дасть 10,9,8,...,1.',
      'Готово: <code>for i in range(10, 0, -1):</code>'
    ],
    validate: (output, code, terminalLogs) => {
      if (!/\bfor\b/.test(code) || !/range/.test(code)) return false;
      if (/\?/.test(code)) return false;
      const lines = output.trim().split('\n').map(l => l.trim());
      const seq = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
      let idx = 0;
      for (const l of lines) { if (idx < seq.length && parseInt(l) === seq[idx]) idx++; }
      return idx === 10 && (output.includes('Поїхали') || output.includes('🚀'));
    }
  },
  {
    id: 4,
    title: 'Урок 4: "Доступ до елементів списку"',
    subtitle: 'Список [], індекси та len()',
    theory: `
      <h3>Списки в Python 📋</h3>
      <p>Список — впорядкована колекція у квадратних дужках <code>[]</code>. Кожен елемент має індекс починаючи з <strong>0</strong>.</p>
      <div class="theory-card">
        <h4>Звернення до елементів:</h4>
        <pre><code>games = ["Minecraft", "Roblox", "GTA"]
games[0]   # → "Minecraft"  (перший)
games[1]   # → "Roblox"     (другий)
games[-1]  # → "GTA"        (останній)
len(games) # → 3            (кількість)</code></pre>
      </div>
      <div class="instruction-box">
        <h4>📝 Твоє завдання:</h4>
        <p>Список <code>fruits</code> вже є. Напиши три рядки:</p>
        <ol>
          <li>Вивести <strong>перший</strong> елемент</li>
          <li>Вивести <strong>останній</strong> елемент</li>
          <li>Вивести <strong>кількість</strong> елементів</li>
        </ol>
      </div>
    `,
    initialCode: `fruits = ["яблуко", "банан", "апельсин", "виноград"]

# Напиши три print():
# 1. Перший елемент (fruits[?])
# 2. Останній елемент (fruits[?])
# 3. Кількість елементів (len(?))
`,
    hints: [
      'Перший елемент: <code>print(fruits[0])</code>. Останній: <code>print(fruits[-1])</code>.',
      'Кількість: <code>print(len(fruits))</code>. Три рядки — три print.',
      'Всі три:<br><code>print(fruits[0])</code><br><code>print(fruits[-1])</code><br><code>print(len(fruits))</code>'
    ],
    validate: (output, code, terminalLogs) => {
      const out = output.trim().toLowerCase();
      return out.includes('яблуко') && out.includes('виноград') && out.includes('4');
    }
  },
  {
    id: 5,
    title: 'Урок 5: "for зі списком — перебір елементів"',
    subtitle: 'for item in list — по черзі кожен елемент',
    theory: `
      <h3>Цикл for зі списком 🔄</h3>
      <p><code>for item in list:</code> — змінна <code>item</code> по черзі отримує кожне значення зі списку.</p>
      <div class="theory-card">
        <h4>Приклад:</h4>
        <pre><code>games = ["Minecraft", "Roblox", "GTA"]
for game in games:
    print("🎮 Я граю в", game)
# → 🎮 Я граю в Minecraft
# → 🎮 Я граю в Roblox
# → 🎮 Я граю в GTA</code></pre>
      </div>
      <div class="instruction-box">
        <h4>📝 Твоє завдання:</h4>
        <p>Список <code>scores</code> вже є. Напиши <code>for</code> цикл, який виводить кожен елемент у форматі: <code>Оцінка: 85</code>, <code>Оцінка: 92</code> і т.д.</p>
      </div>
    `,
    initialCode: `scores = [85, 92, 67, 78, 95]

# Напиши for цикл: for score in scores: ...
# Виводь кожен елемент у форматі "Оцінка: X"
`,
    hints: [
      '<code>for score in scores:</code> — на наступному рядку з відступом: <code>print("Оцінка:", score)</code>.',
      'Або: <code>print(f"Оцінка: {score}")</code> — результат той самий.'
    ],
    validate: (output, code, terminalLogs) => {
      if (!/\bfor\b/.test(code)) return false;
      const out = output.trim().toLowerCase();
      return [85, 92, 67, 78, 95].every(n => out.includes(String(n))) && out.includes('оцінка');
    }
  },
  {
    id: 6,
    title: 'Урок 6: "enumerate — нумерований список"',
    subtitle: 'for i, item in enumerate(list, 1) — порядковий номер',
    theory: `
      <h3>Функція <code>enumerate()</code> 🔢</h3>
      <p><code>enumerate(list, start)</code> повертає пари (номер, елемент). Другий аргумент — з якого числа починати нумерацію.</p>
      <div class="theory-card">
        <h4>Приклад:</h4>
        <pre><code>games = ["Minecraft", "Roblox", "GTA"]
for i, game in enumerate(games, 1):
    print(f"{i}. {game}")
# → 1. Minecraft
# → 2. Roblox
# → 3. GTA</code></pre>
      </div>
      <div class="instruction-box">
        <h4>📝 Твоє завдання:</h4>
        <p>Список <code>cities</code> вже є. Напиши цикл з <code>enumerate</code>, який виводить кожне місто з порядковим номером: <code>1. Київ</code>, <code>2. Харків</code> і т.д.</p>
      </div>
    `,
    initialCode: `cities = ["Київ", "Харків", "Одеса", "Дніпро"]

# Напиши: for i, city in enumerate(cities, 1):
# Виведи: f"{i}. {city}"
`,
    hints: [
      '<code>for i, city in enumerate(cities, 1):</code> дає пари (1,"Київ"), (2,"Харків")...',
      'Всередині: <code>print(f"{i}. {city}")</code>',
      'Два рядки:<br><code>for i, city in enumerate(cities, 1):</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;print(f"{i}. {city}")</code>'
    ],
    validate: (output, code, terminalLogs) => {
      if (!/\bfor\b/.test(code)) return false;
      const out = output.trim();
      return out.includes('1.') && out.includes('Київ') && out.includes('4.') && out.includes('Дніпро');
    }
  },
  {
    id: 7,
    title: 'Урок 7: "Фінальний виклик #1"',
    subtitle: 'Сума елементів списку через накопичувач',
    theory: `
      <h3>Накопичувач суми 🏆</h3>
      <p>Патерн: змінна <code>total = 0</code> до циклу. Всередині циклу: <code>total += num</code> після кожного елементу.</p>
      <div class="instruction-box">
        <h4>📝 Твоє завдання:</h4>
        <p>Список <code>nums</code> і змінна <code>total = 0</code> вже є. Напиши <code>for</code> цикл, який проходить по <code>nums</code> і додає кожен елемент до <code>total</code>.</p>
        <p><em>Правильна відповідь для цього списку:</em> <strong>75</strong></p>
      </div>
    `,
    initialCode: `nums = [12, 7, 3, 25, 8, 14, 6]
total = 0

# Напиши for цикл: для кожного num у nums — total += num

print("Сума:", total)
`,
    hints: [
      '<code>for num in nums:</code> — всередині: <code>total += num</code>.',
      'Два рядки:<br><code>for num in nums:</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;total += num</code>'
    ],
    validate: (output, code, terminalLogs) => {
      if (!/\bfor\b/.test(code)) return false;
      return output.trim().includes('75');
    }
  },
  {
    id: 8,
    title: 'Урок 8: "Фінальний виклик #2"',
    subtitle: 'Максимальний елемент списку без max()',
    theory: `
      <h3>Алгоритм пошуку максимуму 🌟</h3>
      <p>Беремо перший елемент як «поточний найбільший». Перебираємо решту: якщо знайдений більший — оновлюємо.</p>
      <div class="theory-card">
        <h4>Схема:</h4>
        <pre><code>best = nums[0]    # припускаємо перший найбільший
for n in nums:
    if n > best:
        best = n  # знайшли більший — оновити
print(best)</code></pre>
      </div>
      <div class="instruction-box">
        <h4>📝 Твоє завдання:</h4>
        <p>Змінна <code>best = nums[0]</code> вже є. Напиши <code>for</code> цикл із перевіркою: якщо елемент більший за <code>best</code> — оновити <code>best</code>.</p>
        <p><em>Правильна відповідь:</em> <strong>31</strong></p>
      </div>
    `,
    initialCode: `nums = [4, 17, 2, 9, 31, 6, 12]
best = nums[0]

# Напиши for цикл:
# for n in nums:
#     if n > best: ...

print("Максимум:", best)
`,
    hints: [
      '<code>for n in nums:</code> і всередині: <code>if n > best:</code> → <code>best = n</code>.',
      'Три рядки:<br><code>for n in nums:</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;if n > best:</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;best = n</code>'
    ],
    validate: (output, code, terminalLogs) => {
      if (!/\bfor\b/.test(code)) return false;
      return output.trim().includes('31');
    }
  },
  {
    id: 9,
    title: 'Домашнє завдання: Список авто з нумерацією і статистикою',
    subtitle: 'Написати список + enumerate + кількість елементів',
    theory: `
      <h3>Домашнє завдання 🏠</h3>
      <div class="instruction-box">
        <h4>📝 Твоє завдання — написати з нуля:</h4>
        <ol>
          <li>Створи список <code>cars</code> з <strong>мінімум 5</strong> марками авто (або інших улюблених речей)</li>
          <li>Виведи кожен елемент з нумерацією через <code>enumerate</code>:<br>
              <code>1. BMW</code><br><code>2. Tesla</code><br>...</li>
          <li>Після списку виведи: <code>Всього в списку: X</code> де X — кількість</li>
        </ol>
      </div>
    `,
    initialCode: `# 1. Створи список з 5+ елементів (заміни порожні лапки)
cars = []

# 2. Напиши for цикл з enumerate для виводу з нумерацією

# 3. Виведи кількість елементів
`,
    hints: [
      'Заповни список: <code>cars = ["BMW", "Tesla", "Toyota", "Audi", "Mercedes"]</code>',
      'Нумерація: <code>for i, car in enumerate(cars, 1):</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;print(f"{i}. {car}")</code>',
      'Кількість: <code>print(f"Всього в списку: {len(cars)}")</code>'
    ],
    validate: (output, code, terminalLogs) => {
      if (!/\bfor\b/.test(code) || !/\[/.test(code)) return false;
      const lines = output.trim().split('\n').filter(l => l.trim());
      const numbered = lines.filter(l => /^\d+\./.test(l.trim()));
      return numbered.length >= 5 && output.toLowerCase().includes('всього');
    }
  }
];

const handbookData = {
  variables: `<div class="handbook-section"><h3>📦 Змінні та Типи</h3><div class="concept-card"><h4>Основні типи:</h4><ul><li><code>str</code>: <code>"hello"</code></li><li><code>int</code>: <code>42</code></li><li><code>list</code>: <code>[1,2,3]</code></li></ul></div><div class="concept-card"><h4>Введення:</h4><pre><code class="language-python">n = int(input("N: "))
name = input("Ім'я: ")</code></pre></div></div>`,
  math: `<div class="handbook-section"><h3>🧮 Математика</h3><div class="concept-card"><div class="op-grid"><div class="op-row-header">Op</div><div class="op-row-header">Приклад</div><div class="op-row"><span class="op-symbol">+</span></div><div class="op-row"><code>5+3→8</code></div><div class="op-row"><span class="op-symbol">-</span></div><div class="op-row"><code>10-4→6</code></div><div class="op-row"><span class="op-symbol">*</span></div><div class="op-row"><code>3*4→12</code></div><div class="op-row"><span class="op-symbol">//</span></div><div class="op-row"><code>7//2→3</code></div><div class="op-row"><span class="op-symbol">%</span></div><div class="op-row"><code>7%2→1</code></div></div></div></div>`,
  logic: `<div class="handbook-section"><h3>🛡️ Умови</h3><div class="concept-card"><h4>if / elif / else:</h4><pre><code class="language-python">if x > 0:
    print("+")
elif x == 0:
    print("0")
else:
    print("-")</code></pre></div><div class="concept-card"><h4>and / or:</h4><pre><code class="language-python">if x >= 1 and x <= 10:
    print("OK")
if x < 0 or x > 100:
    print("За межами")</code></pre></div></div>`,
  loops: `<div class="handbook-section"><h3>🔄 for, range() та Списки</h3><div class="concept-card"><h4>range() варіанти:</h4><pre><code class="language-python">range(n)         # 0,1,...,n-1
range(1, n+1)    # 1,2,...,n
range(n, 0, -1)  # n,n-1,...,1
range(0, 10, 2)  # 0,2,4,6,8</code></pre></div><div class="concept-card"><h4>for зі списком:</h4><pre><code class="language-python">fruits = ["яблуко", "банан"]
for fruit in fruits:
    print(fruit)</code></pre></div><div class="concept-card"><h4>enumerate — нумерація:</h4><pre><code class="language-python">for i, item in enumerate(fruits, 1):
    print(f"{i}. {item}")</code></pre></div><div class="concept-card"><h4>Накопичувач суми:</h4><pre><code class="language-python">total = 0
for n in nums:
    total += n</code></pre></div><div class="concept-card"><h4>Пошук максимуму:</h4><pre><code class="language-python">best = nums[0]
for n in nums:
    if n > best:
        best = n</code></pre></div></div>`,
  functions: `<div class="handbook-section"><h3>🔢 Функції</h3><div class="concept-card"><h4>Для списків:</h4><pre><code class="language-python">len([1,2,3])   # → 3
sum([1,2,3])   # → 6
max([3,1,2])   # → 3
min([3,1,2])   # → 1
list[0]        # перший елемент
list[-1]       # останній елемент</code></pre></div></div>`
};
