// CURRICULUM DATA CONFIGURATION (8 Lessons)
const lessons = [
  {
    id: 1,
    title: 'Урок 1: "Перший сигнал"',
    subtitle: 'Команда print() та виведення тексту',
    theory: `
      <h3>Привіт, майбутній програмісте! 🚀</h3>
      <p>Сьогодні ти зробиш свій перший крок у світ програмування на Python. Коли ми пишемо програми, нам потрібно вміти показувати користувачеві результати обчислень або просто спілкуватися. Для цього існує спеціальна вбудована функція — <code>print()</code>.</p>
      
      <div class="theory-card">
        <h4>Як працює print()?</h4>
        <p>Щоб вивести якийсь текст на екран (в консоль), ми передаємо його всередину круглих дужок у лапках (одинарних або подвійних):</p>
        <pre><code class="language-python">print("Привіт, Бро")</code></pre>
      </div>

      <p><strong>Зверни увагу на важливі правила:</strong></p>
      <ul>
        <li>Текст обов'язково має бути в лапках: <code>"текст"</code> або <code>'текст'</code>.</li>
        <li>Команда пишеться виключно маленькими літерами: <code>print</code>, а не <code>Print</code> (Python чутливий до регістру!).</li>
      </ul>
      
      <div class="instruction-box">
        <h4>📝 Твоє завдання:</h4>
        <p>Напиши програму, яка виводить у термінал фразу <code>Hello World</code> або <code>Привіт, Бро</code>.</p>
      </div>
    `,
    initialCode: `# Напиши свій код нижче\n# Виведи "Hello World" або "Привіт, Бро"\n`,
    hint: 'Використай команду: <code>print("Hello World")</code> або <code>print("Привіт, Бро")</code>. Зверни увагу на великі літери та лапки!',
    validate: (output, code, terminalLogs) => {
      const cleanOutput = output.trim().toLowerCase();
      return cleanOutput.includes("hello world") || cleanOutput.includes("привіт, бро") || cleanOutput.includes("привит, бро");
    }
  },
  {
    id: 2,
    title: 'Урок 2: "Коробки для даних"',
    subtitle: 'Змінні та типи даних (str, int)',
    theory: `
      <h3>Що таке змінні? 📦</h3>
      <p>У комп'ютері є мільйони комірок пам'яті, куди можна сховати будь-яку інформацію. Змінні — це "коробки" з назвами, у які мы кладемо дані. Для створення змінної використовується оператор присвоєння (<code>=</code>):</p>
      
      <div class="theory-card">
        <pre><code class="language-python">name = "Олег"   # Текстовий тип (String)
age = 18        # Ціле число (Integer)</code></pre>
      </div>

      <p>Ми можемо вивести кілька значень одночасно, розділяючи їх комами всередині <code>print()</code>. Python автоматично поставить між ними пробіли:</p>
      <pre><code class="language-python">print("Мене звати", name, "мені", age, "років")</code></pre>

      <div class="instruction-box">
        <h4>📝 Твоє завдання:</h4>
        <ol>
          <li>Створи змінну з назвою <code>name</code> та надай їй текстове значення зі своїм ім'ям.</li>
          <li>Створи змінну з назвою <code>age</code> та надай їй числове значення (наприклад, <code>18</code>).</li>
          <li>Виведи в термінал речення у форматі: <code>Мене звати [ім'я], мені [вік] років.</code></li>
        </ol>
      </div>
    `,
    initialCode: `# 1. Створи змінні name та age\n\n# 2. Виведи повне речення, розділяючи змінні комами\n`,
    hint: 'Твій код має бути схожим на:\n<code>name = "Олег"\nage = 18\nprint("Мене звати", name, "мені", age, "років.")</code>',
    validate: (output, code, terminalLogs) => {
      const cleanOutput = output.trim().toLowerCase();
      const hasNameVar = /name\s*=\s*(['"][^'"]+['"])/.test(code);
      const hasAgeVar = /age\s*=\s*(\d+)/.test(code);
      const hasPrint = /print\s*\(/.test(code);
      
      const containsKeywords = cleanOutput.includes("мене звати") && (cleanOutput.includes("років") || cleanOutput.includes("роки") || cleanOutput.includes("рік"));
      return hasNameVar && hasAgeVar && hasPrint && containsKeywords;
    }
  },
  {
    id: 3,
    title: 'Урок 3: "Комп\'ютер запитує"',
    subtitle: 'Зчитування даних через input()',
    theory: `
      <h3>Інтерактивність: input() 💬</h3>
      <p>Щоб програма не була статичною, ми можемо попросити користувача ввести значення з клавіатури за допомогою функції <code>input()</code>. Програма призупинить роботу, виведе підказку та чекатиме натискання Enter:</p>
      
      <div class="theory-card">
        <pre><code class="language-python">hobby = input("Введи своє хобі: ")
print("О, ти любиш", hobby, "— це чудово!")</code></pre>
      </div>

      <div class="instruction-box">
        <h4>📝 Твоє завдання:</h4>
        <ol>
          <li>Використай функцію <code>input()</code>, щоб запитати у користувача його улюблене хобі (наприклад, "хобі: ") та збережи його в змінну.</li>
          <li>Виведи повідомлення у форматі: <code>Ого, [хобі] — це круто!</code></li>
        </ol>
      </div>
    `,
    initialCode: `# 1. Запитай хобі та збережи в змінну\n\n# 2. Виведи фразу "Ого, ... — це круто!"\n`,
    hint: 'Створи змінну: <code>hobby = input("Твоє хобі: ")</code>, а потім виведи її: <code>print("Ого,", hobby, "— це круто!")</code>',
    validate: (output, code, terminalLogs) => {
      const cleanOutput = output.toLowerCase();
      const hasInputCall = code.includes("input");
      
      const inputs = terminalLogs.filter(log => log.type === 'input');
      if (inputs.length === 0) return false;
      
      const lastInput = inputs[inputs.length - 1].value.toLowerCase().trim();
      const containsPhrase = cleanOutput.includes("це круто") || cleanOutput.includes("це круто!");
      return hasInputCall && containsPhrase && cleanOutput.includes(lastInput);
    }
  },
  {
    id: 4,
    title: 'Урок 4: "Магія математики"',
    subtitle: 'Арифметика та абсолютні значення',
    theory: `
      <h3>Математичні операції в Python 🧮</h3>
      <p>Python чудово вміє рахувати. Основні арифметичні оператори:</p>
      <ul>
        <li><code>+</code>, <code>-</code>, <code>*</code>, <code>/</code> — додавання, віднімання, множення та ділення.</li>
        <li><code>**</code> — піднесення до степеня (наприклад, <code>x**2</code> це квадрат x, а <code>x**3</code> — куб).</li>
        <li><code>abs(x)</code> — математична функція, яка повертає модуль (абсолютне значення) числа x.</li>
      </ul>

      <p><strong>Важливо:</strong> Дані з <code>input()</code> завжди зчитуються як текст. Щоб перетворити текст на ціле число для математичних розрахунків, загорни його в функцію <code>int()</code>:</p>
      <pre><code class="language-python">num = int(input())</code></pre>

      <div class="instruction-box">
        <h4>📝 Твоє завдання (Зображення 3):</h4>
        <p>Задано ціле число <code>N</code>. Напишіть програму, яка буде знаходити <strong>модуль різниці куба та квадрата</strong> числа <code>N</code>.</p>
        <p><em>Формат вхідних даних:</em> на вхід подається одне ціле число N.</p>
        <p><em>Приклади:</em> при введенні <code>5</code> відповідь має бути <code>100</code> (бо |5³ - 5²| = |125 - 25| = 100). При введенні <code>-5</code> відповідь <code>150</code>.</p>
      </div>
    `,
    initialCode: `# 1. Зчитай ціле число N (використай int та input)\n\n# 2. Обчисли модуль різниці його куба та квадрата (використай abs та **)\n\n# 3. Виведи отриманий результат\n`,
    hint: 'Алгоритм:\n1. <code>n = int(input())</code>\n2. <code>result = abs(n**3 - n**2)</code>\n3. <code>print(result)</code>',
    validate: (output, code, terminalLogs) => {
      const hasInt = /int\s*\(/.test(code);
      const hasInput = /input\s*\(/.test(code);
      const hasAbs = /abs\s*\(/.test(code);
      
      const inputs = terminalLogs.filter(log => log.type === 'input');
      if (inputs.length === 0) return false;
      
      const n = parseInt(inputs[inputs.length - 1].value);
      if (isNaN(n)) return false;
      
      const expected = Math.abs(Math.pow(n, 3) - Math.pow(n, 2));
      const cleanOutput = output.trim();
      const outputLines = cleanOutput.split('\n').map(l => l.trim());
      
      const containsResult = outputLines.some(line => line == expected.toString() || line.includes(expected.toString()));
      return hasInt && hasInput && hasAbs && containsResult;
    }
  },
  {
    id: 5,
    title: 'Урок 5: "Вибір шляху"',
    subtitle: 'Умови if/else та логічні порівняння',
    theory: `
      <h3>Керування логікою програми 🛡️</h3>
      <p>Конструкція <code>if / else</code> дозволяє програмі приймати рішення в залежності від виконання умов:</p>
      <pre><code class="language-python">if умова:
    # код, який виконується якщо умова істинна
else:
    # код, якщо умова хибна</code></pre>
      
      <p>Для перевірки рівності використовується оператор <code>==</code>, а для обчислення остачі від ділення — <code>%</code> (наприклад, <code>x % 3 == 0</code> означає, що число x ділиться на 3 без остачі).</p>
      
      <div class="instruction-box">
        <h4>📝 Твоє завдання (Зображення 1):</h4>
        <p>Ми стверджуємо, що якщо невідоме ціле число <code>X</code> збільшити втричі, а до результату додати одиницю, то вийде ціле число <code>N</code> (тобто <code>3*X + 1 = N</code>).</p>
        <p>Напишіть програму, яка отримує на вхід число <code>N</code>. Якщо таке твердження хибне (число X не є цілим), виведіть <code>False statement</code>. Якщо твердження правдиве (X є цілим числом), знайдіть та виведіть число <code>X</code>.</p>
        <p><em>Приклади:</em> при введенні <code>10</code> відповідь <code>3</code> (бо 3*3+1=10). При введенні <code>11</code> відповідь <code>False statement</code>.</p>
      </div>
    `,
    initialCode: `# 1. Зчитай число N\n\n# 2. Напиши логіку перевірки: якщо (N - 1) ділиться на 3 без остачі, виведи X. Інакше виведи "False statement"\n`,
    hint: 'Формула для перевірки: <code>(n - 1) % 3 == 0</code>.\nЯкщо умова виконується, то <code>x = (n - 1) // 3</code> і виводимо його. Інакше виводимо <code>"False statement"</code>.',
    validate: (output, code, terminalLogs) => {
      const hasIf = /\bif\b/.test(code);
      const inputs = terminalLogs.filter(log => log.type === 'input');
      if (inputs.length === 0) return false;
      
      const n = parseInt(inputs[inputs.length - 1].value);
      if (isNaN(n)) return false;
      
      const cleanOutput = output.trim().toLowerCase();
      const isIntegerX = (n - 1) % 3 === 0;
      
      if (isIntegerX) {
        const expectedX = Math.floor((n - 1) / 3);
        const lines = cleanOutput.split('\n').map(l => l.trim());
        return hasIf && lines.some(l => l == expectedX.toString() || l.includes(expectedX.toString()));
      } else {
        return hasIf && cleanOutput.includes("false statement");
      }
    }
  },
  {
    id: 6,
    title: 'Урок 6: "Повторення коду"',
    subtitle: 'Цикли та range()',
    theory: `
      <h3>Цикли в Python 🔄</h3>
      <p>Цикли потрібні для багаторазового виконання коду. Найпопулярніший цикл — <code>for</code>. Він використовується разом з функцією <code>range(N)</code>, яка генерує послідовність індексів від <code>0</code> до <code>N - 1</code>:</p>
      <pre><code class="language-python">for i in range(5):
    print(i) # Виведе числа від 0 до 4, кожне з нового рядка</code></pre>

      <p>Якщо нам потрібно циклічно повторювати якісь елементи (наприклад, 1, 2, 3, 1, 2, 3...), ми можемо використати остачу від ділення індексу на довжину циклу: <code>(i % 3) + 1</code>.</p>

      <div class="instruction-box">
        <h4>📝 Твоє завдання (Зображення 5):</h4>
        <p>Розглянемо послідовність, яка утворюється повторенням чисел 1, 2 та 3: <code>1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, ...</code></p>
        <p>Задано ціле додатне число <code>N</code>. Напишіть програму, яка виведе перші <code>N</code> елементів цієї послідовності (кожен елемент з нового рядка).</p>
        <p><em>Приклад:</em> при введенні <code>5</code> відповідь має бути:</p>
        <pre>1\n2\n3\n1\n2</pre>
      </div>
    `,
    initialCode: `# 1. Зчитай число N\n\n# 2. Використай цикл for та виведи перші N елементів послідовності\n`,
    hint: 'Запусти цикл: <code>for i in range(n):</code>\nВсередині циклу виведи: <code>print((i % 3) + 1)</code>. Це дасть циклічне чергування 1, 2, 3.',
    validate: (output, code, terminalLogs) => {
      const hasLoop = /\b(for|while)\b/.test(code);
      const inputs = terminalLogs.filter(log => log.type === 'input');
      if (inputs.length === 0) return false;
      
      const n = parseInt(inputs[inputs.length - 1].value);
      if (isNaN(n) || n <= 0) return false;
      
      const cleanOutput = output.trim();
      const lines = cleanOutput.split('\n')
                               .map(l => l.trim())
                               .filter(l => l !== "" && !l.includes(">>>") && !l.includes("введіть"));
      
      if (lines.length < n) return false;
      
      for (let i = 0; i < n; i++) {
        const expected = (i % 3) + 1;
        if (parseInt(lines[i]) !== expected) return false;
      }
      return hasLoop;
    }
  },
  {
    id: 7,
    title: 'Урок 7: "Фінальний виклик #1"',
    subtitle: 'Математичний аналіз послідовностей',
    theory: `
      <h3>Фінальні виклики 🏆</h3>
      <p>Вітаємо! Ти вивчив усі основи Python: змінні, математику, умови та цикли. Тепер настав час вирішити реальні алгоритмічні завдання!</p>

      <div class="instruction-box">
        <h4>📝 Твоє завдання (Зображення 2):</h4>
        <p>Задано ціле число <code>S</code>. Відомо, що сума трьох послідовних цілих чисел дорівнює <code>S</code>. Напишіть програму, яка знаходитиме ці три послідовні цілі числа.</p>
        <p><em>Формат вихідних даних:</em> Програма повинна вивести у порядку зростання ці три числа <strong>через пробіл</strong> (в один рядок).</p>
        <p><em>Приклади:</em> при введенні <code>12</code> відповідь має бути <code>3 4 5</code> (бо 3+4+5=12). При введенні <code>0</code> відповідь <code>-1 0 1</code>.</p>
      </div>
    `,
    initialCode: `# 1. Зчитай ціле число S\n\n# 2. Знайди три послідовні числа (нехай середнє буде x = S // 3)\n\n# 3. Виведи три числа через пробіл\n`,
    hint: 'Якщо позначити середнє число як <code>x</code>, то сума трьох послідовних чисел це <code>(x-1) + x + (x+1) = 3*x = S</code>.\nЗвідси <code>x = S // 3</code>. Числа, які треба вивести: <code>x-1</code>, <code>x</code>, <code>x+1</code>.\nВивести їх можна так: <code>print(x-1, x, x+1)</code>',
    validate: (output, code, terminalLogs) => {
      const inputs = terminalLogs.filter(log => log.type === 'input');
      if (inputs.length === 0) return false;
      
      const s = parseInt(inputs[inputs.length - 1].value);
      if (isNaN(s)) return false;
      
      const cleanOutput = output.trim();
      const numbers = cleanOutput.split(/[\s\n]+/)
                                 .map(v => parseInt(v))
                                 .filter(v => !isNaN(v));
                                 
      for (let i = 0; i <= numbers.length - 3; i++) {
        const a = numbers[i];
        const b = numbers[i+1];
        const c = numbers[i+2];
        if (b === a + 1 && c === b + 1 && (a + b + c) === s) {
          return true;
        }
      }
      return false;
    }
  },
  {
    id: 8,
    title: 'Урок 8: "Фінальний виклик #2"',
    subtitle: 'Цикли з умовою та кратність чисел',
    theory: `
      <h3>Супер Фінал: Кратність на три 🌟</h3>
      <p>Останній виклик поєднує цикли, математику та рядкові перетворення. Тобі потрібно буде перебрати всі можливі варіанти дописування цифр від 0 до 9.</p>

      <div class="instruction-box">
        <h4>📝 Твоє завдання (Зображення 4):</h4>
        <p>Нехай <code>N</code> — тризначне додатне число. Треба дописати до цього числа справа одну цифру так, щоб отримане чотиризначне число ділилося без остачі на три.</p>
        <p>Напишіть програму, яка за заданим тризначним числом N знаходить <strong>всі кратні трьом чотиризначні числа</strong>, які можна отримати дописуванням однієї цифри.</p>
        <p><em>Формат вихідних даних:</em> Виведіть у порядку зростання всі знайдені чотиризначні числа, кожне з нового рядка.</p>
        <p><em>Приклади:</em> при введенні <code>100</code> відповідь:</p>
        <pre>1002\n1005\n1008</pre>
      </div>
    `,
    initialCode: `# 1. Зчитай тризначне число N\n\n# 2. Перебери цифри від 0 до 9 (range(10))\n\n# 3. Для кожної цифри сформуй число (N * 10 + digit) та перевір, чи ділиться воно на 3 (% 3 == 0)\n`,
    hint: 'Запусти цикл: <code>for d in range(10):</code>\nВсередині сформуй число: <code>val = N * 10 + d</code>\nЯкщо <code>val % 3 == 0:</code>, то виводь його на екран!',
    validate: (output, code, terminalLogs) => {
      const hasLoop = /\b(for|while)\b/.test(code);
      const inputs = terminalLogs.filter(log => log.type === 'input');
      if (inputs.length === 0) return false;
      
      const n = parseInt(inputs[inputs.length - 1].value);
      if (isNaN(n) || n < 100 || n > 999) return false;
      
      const expected = [];
      for (let d = 0; d <= 9; d++) {
        const num = n * 10 + d;
        if (num % 3 === 0) expected.push(num);
      }
      
      const cleanOutput = output.trim();
      const numbersInOutput = cleanOutput.split(/[\s\n]+/)
                                         .map(v => parseInt(v))
                                         .filter(v => !isNaN(v));
                                         
      let expectedIdx = 0;
      for (let i = 0; i < numbersInOutput.length; i++) {
        if (numbersInOutput[i] === expected[expectedIdx]) {
          expectedIdx++;
          if (expectedIdx === expected.length) {
            return hasLoop;
          }
        }
      }
      return false;
    }
  }
];

// HANDBOOK DATA CONFIGURATION (Structured Tabs in Ukrainian)
const handbookData = {
    variables: `
        <div class="handbook-section">
            <h3>📦 Змінні та Типи Даних</h3>
            <p><strong>Змінна</strong> — це як коробка, у яку комп'ютер може покласти інформацію, щоб скористатися нею пізніше. Для цього використовується знак дорівнює <code>=</code>.</p>
            
            <div class="concept-card">
                <h4>🏷️ Правила назв змінних:</h4>
                <p>Назва має починатися з літери або підкреслення <code>_</code> і містити лише латинські літери, цифри або підкреслення (без пробілів!). Наприклад: <code>my_age</code>, <code>x1</code>, <code>user_name</code>.</p>
            </div>
            
            <div class="concept-card">
                <h4>🔮 Основні типи даних:</h4>
                <ul>
                    <li><strong>Рядок (str)</strong>: Текст у лапках (одинарних чи подвійних).
                        <pre><code class="language-python">text = "Привіт, світе!"</code></pre>
                    </li>
                    <li><strong>Ціле число (int)</strong>: Число без дробової частини.
                        <pre><code class="language-python">count = 42</code></pre>
                    </li>
                    <li><strong>Дробове число (float)</strong>: Дробове число з крапкою.
                        <pre><code class="language-python">price = 19.99</code></pre>
                    </li>
                    <li><strong>Логічний тип (bool)</strong>: Має всього два значення — правда чи брехня.
                        <pre><code class="language-python">is_active = True   # або False</code></pre>
                    </li>
                </ul>
            </div>
        </div>
    `,
    math: `
        <div class="handbook-section">
            <h3>🧮 Математичні Оператори</h3>
            <p>Python вміє швидко обчислювати складні математичні приклади. Ось список арифметичних операторів:</p>
            
            <div class="concept-card">
                <div class="op-grid">
                    <div class="op-row-header">Оператор</div>
                    <div class="op-row-header">Що робить & Приклад</div>
                    
                    <div class="op-row"><span class="op-symbol">+</span> Додавання</div>
                    <div class="op-row"><code>5 + 3</code> ➔ <code>8</code></div>
                    
                    <div class="op-row"><span class="op-symbol">-</span> Віднімання</div>
                    <div class="op-row"><code>10 - 4</code> ➔ <code>6</code></div>
                    
                    <div class="op-row"><span class="op-symbol">*</span> Множення</div>
                    <div class="op-row"><code>3 * 4</code> ➔ <code>12</code></div>
                    
                    <div class="op-row"><span class="op-symbol">/</span> Ділення</div>
                    <div class="op-row"><code>7 / 2</code> ➔ <code>3.5</code> (завжди дає float!)</div>
                    
                    <div class="op-row"><span class="op-symbol">//</span> Ціле ділення</div>
                    <div class="op-row"><code>7 // 2</code> ➔ <code>3</code> (ділить і відкидає залишок)</div>
                    
                    <div class="op-row"><span class="op-symbol">%</span> Остача (%)</div>
                    <div class="op-row"><code>7 % 2</code> ➔ <code>1</code> (остача від ділення націло)</div>
                    
                    <div class="op-row"><span class="op-symbol">**</span> Степінь</div>
                    <div class="op-row"><code>2 ** 3</code> ➔ <code>8</code> (2 у третьому степені)</div>
                </div>
            </div>
            
            <div class="concept-card">
                <h4>🛡️ Корисні функції:</h4>
                <ul>
                    <li><code>abs(x)</code> — модуль числа (абсолютна величина): <code>abs(-5)</code> дасть <code>5</code>.</li>
                    <li><code>int(x)</code> — перетворення на ціле число: <code>int("5")</code> перетворить текст на число <code>5</code>.</li>
                    <li><code>float(x)</code> — перетворення на дробове: <code>float("3.14")</code> дасть <code>3.14</code>.</li>
                    <li><code>str(x)</code> — перетворення на рядок: <code>str(100)</code> перетворить число на текст <code>"100"</code>.</li>
                </ul>
            </div>
        </div>
    `,
    logic: `
        <div class="handbook-section">
            <h3>🛡️ Логіка та Умови (if/else)</h3>
            <p>Умови дозволяють програмі вибирати шлях виконання в залежності від логіки.</p>
            
            <div class="concept-card">
                <h4>🔍 Оператори порівняння:</h4>
                <div class="op-grid">
                    <div class="op-row"><span class="op-symbol">==</span> Рівність</div>
                    <div class="op-row"><code>5 == 5</code> ➔ <code>True</code></div>
                    
                    <div class="op-row"><span class="op-symbol">!=</span> Недорівнює</div>
                    <div class="op-row"><code>5 != 3</code> ➔ <code>True</code></div>
                    
                    <div class="op-row"><span class="op-symbol">&gt;</span> Більше</div>
                    <div class="op-row"><code>10 > 5</code> ➔ <code>True</code></div>
                    
                    <div class="op-row"><span class="op-symbol">&lt;</span> Менше</div>
                    <div class="op-row"><code>3 < 2</code> ➔ <code>False</code></div>
                    
                    <div class="op-row"><span class="op-symbol">&gt;=</span> Більше або =</div>
                    <div class="op-row"><code>5 >= 5</code> ➔ <code>True</code></div>
                    
                    <div class="op-row"><span class="op-symbol">&lt;=</span> Менше або =</div>
                    <div class="op-row"><code>4 <= 2</code> ➔ <code>False</code></div>
                </div>
            </div>

            <div class="concept-card">
                <h4>⛓️ Логічні зв'язки:</h4>
                <ul>
                    <li><code>and</code> (Логічне І) — повертає True тільки якщо обидві умови правдиві.
                        <pre><code class="language-python">5 > 3 and 10 > 7  # ➔ True</code></pre>
                    </li>
                    <li><code>or</code> (Логічне АБО) — повертає True якщо хоча б одна умова правдива.
                        <pre><code class="language-python">5 > 3 or 2 > 10   # ➔ True</code></pre>
                    </li>
                    <li><code>not</code> (Заперечення НЕ) — міняє True на False і навпаки.
                        <pre><code class="language-python">not (5 > 3)       # ➔ False</code></pre>
                    </li>
                </ul>
            </div>
            
            <div class="concept-card">
                <h4>🛠️ Синтаксис конструкції if-else:</h4>
                <pre><code class="language-python">score = 80
if score >= 90:
    print("Ти супер!")
elif score >= 60:
    print("Непогано!")
else:
    print("Треба вчитися...")</code></pre>
                <p>⚠️ Звертай увагу на <strong>двокрапки (:)</strong> в кінці умов та <strong>відступи в 4 пробіли</strong> на початку команд всередині блоків.</p>
            </div>
        </div>
    `,
    loops: `
        <div class="handbook-section">
            <h3>🔄 Цикли (for та while)</h3>
            <p>Цикли дозволяють повторювати певний шматок коду багато разів, автоматизуючи рутинну роботу.</p>
            
            <div class="concept-card">
                <h4>🔁 Цикл for з range():</h4>
                <p>Використовується, коли ми знаємо точну кількість повторень заздалегідь. За замовчуванням рахує від <code>0</code> до <code>N - 1</code>:</p>
                <pre><code class="language-python"># Повторити 3 рази
for i in range(3):
    print("Крок №", i)</code></pre>
                <p>Результат у консолі:</p>
                <pre>Крок № 0\nКрок № 1\nКрок № 2</pre>
            </div>
            
            <div class="concept-card">
                <h4>⏳ Цикл while:</h4>
                <p>Працює доти, поки виконується задана умова (поки умова істинна):</p>
                <pre><code class="language-python">count = 1
while count <= 3:
    print("Рахуємо:", count)
    count = count + 1  # Крок зміни</code></pre>
                <p>Результат у консолі:</p>
                <pre>Рахуємо: 1\nРахуємо: 2\nРахуємо: 3</pre>
            </div>
            
            <div class="concept-card">
                <h4>🧩 Важливий лайфхак:</h4>
                <p>Якщо потрібно перервати цикл достроково, використовуй команду <code>break</code>.</p>
            </div>
        </div>
    `
};

// STATE MANAGEMENT
let currentLessonIndex = 0;
let completedLessons = [false, false, false, false, false, false, false, false];
let codeEditor = null;
let currentRunTerminalLogs = [];
let accumulatedOutput = "";
let currentLineElement = null;

// Confetti Particle System
const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let animationFrameId = null;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class ConfettiParticle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * -canvas.height - 20;
        this.size = Math.random() * 8 + 6;
        this.color = `hsl(${Math.random() * 360}, 80%, 60%)`;
        this.speedX = Math.random() * 4 - 2;
        this.speedY = Math.random() * 5 + 4;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 10 - 5;
    }
    
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;
    }
    
    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        ctx.restore();
    }
}

function startConfetti() {
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
    particles = [];
    for (let i = 0; i < 150; i++) {
        particles.push(new ConfettiParticle());
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let active = false;
        particles.forEach(p => {
            p.update();
            p.draw();
            if (p.y < canvas.height) active = true;
        });
        if (active) {
            animationFrameId = requestAnimationFrame(animate);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }
    animate();
}

// THEME SWITCHER ACCENT SETUP
const themeColors = {
    indigo: {
        primary: '#6366f1',
        primaryGlow: 'rgba(99, 102, 241, 0.18)',
        primaryBorder: 'rgba(99, 102, 241, 0.4)'
    },
    emerald: {
        primary: '#10b981',
        primaryGlow: 'rgba(16, 185, 129, 0.18)',
        primaryBorder: 'rgba(16, 185, 129, 0.4)'
    },
    rose: {
        primary: '#f43f5e',
        primaryGlow: 'rgba(244, 63, 94, 0.18)',
        primaryBorder: 'rgba(244, 63, 94, 0.4)'
    },
    amber: {
        primary: '#f59e0b',
        primaryGlow: 'rgba(245, 158, 11, 0.18)',
        primaryBorder: 'rgba(245, 158, 11, 0.4)'
    },
    cyan: {
        primary: '#06b6d4',
        primaryGlow: 'rgba(6, 182, 212, 0.18)',
        primaryBorder: 'rgba(6, 182, 212, 0.4)'
    }
};

function setThemeAccent(colorName) {
    const theme = themeColors[colorName];
    if (!theme) return;
    
    // Set CSS properties
    document.documentElement.style.setProperty('--color-primary', theme.primary);
    document.documentElement.style.setProperty('--color-primary-glow', theme.primaryGlow);
    document.documentElement.style.setProperty('--color-primary-border', theme.primaryBorder);
    
    // Update active visual button
    document.querySelectorAll('.accent-dot').forEach(dot => {
        if (dot.getAttribute('data-color') === colorName) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
    
    // Save selection
    localStorage.setItem('pycode_theme_color', colorName);
}

// TERMINAL EMULATION
function printToTerminal(text, type = 'output') {
    const body = document.getElementById('terminal-body');
    const parts = text.split('\n');
    
    for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        if (part === '' && i === parts.length - 1) {
            currentLineElement = null;
            break;
        }
        
        if (!currentLineElement) {
            currentLineElement = document.createElement('div');
            currentLineElement.className = `terminal-line ${type}`;
            body.appendChild(currentLineElement);
        }
        
        currentLineElement.textContent += part;
        
        if (i < parts.length - 1) {
            currentLineElement = null;
        }
    }
    body.scrollTop = body.scrollHeight;
}

function promptTerminal(promptText) {
    const body = document.getElementById('terminal-body');
    return new Promise((resolve) => {
        const container = document.createElement('div');
        container.className = 'terminal-input-container';
        
        if (promptText) {
            const promptSpan = document.createElement('span');
            promptSpan.className = 'terminal-prompt-text';
            promptSpan.textContent = promptText;
            container.appendChild(promptSpan);
        }
        
        const inputSpan = document.createElement('span');
        inputSpan.className = 'terminal-input-active';
        inputSpan.contentEditable = true;
        
        const cursorSpan = document.createElement('span');
        cursorSpan.className = 'terminal-cursor';
        
        container.appendChild(inputSpan);
        container.appendChild(cursorSpan);
        body.appendChild(container);
        body.scrollTop = body.scrollHeight;
        
        setTimeout(() => {
            inputSpan.focus();
        }, 10);
        
        inputSpan.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const value = inputSpan.textContent;
                
                cursorSpan.remove();
                inputSpan.contentEditable = false;
                inputSpan.className = 'terminal-input-submitted';
                inputSpan.style.color = '#e2e8f0';
                inputSpan.style.fontWeight = 'normal';
                
                currentRunTerminalLogs.push({ type: 'input', value: value });
                accumulatedOutput += value + '\n';
                
                currentLineElement = null;
                resolve(value);
            }
        });
    });
}

function builtinRead(x) {
    if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
        throw "File not found: '" + x + "'";
    return Sk.builtinFiles["files"][x];
}

// APP ACTIONS
function initApp() {
    // 1. Initialize CodeMirror
    const textarea = document.getElementById('code-textarea');
    codeEditor = CodeMirror.fromTextArea(textarea, {
        mode: { name: "python", version: 3 },
        theme: "material-ocean",
        lineNumbers: true,
        indentUnit: 4,
        tabSize: 4,
        lineWrapping: true,
        extraKeys: {
            "Tab": function(cm) {
                var spaces = Array(cm.getOption("indentUnit") + 1).join(" ");
                cm.replaceSelection(spaces);
            }
        }
    });
    
    codeEditor.on('change', () => {
        const code = codeEditor.getValue();
        localStorage.setItem(`pycode_draft_${currentLessonIndex}`, code);
    });

    // 2. Initialize Theme Switches
    document.querySelectorAll('.accent-dot').forEach(dot => {
        dot.addEventListener('click', (e) => {
            const color = e.target.getAttribute('data-color');
            setThemeAccent(color);
        });
    });
    
    const savedTheme = localStorage.getItem('pycode_theme_color');
    if (savedTheme) {
        setThemeAccent(savedTheme);
    } else {
        setThemeAccent('indigo');
    }

    // 3. Load stored progress
    loadProgress();

    // 4. Render UI states
    loadLesson(currentLessonIndex);
    renderProgressPills();

    // 5. Connect Hint Modal events
    const hintModal = document.getElementById('hint-modal');
    const showHintBtn = document.getElementById('show-hint-btn');
    const closeHintBtn = document.getElementById('close-hint-btn');
    const closeHintFooterBtn = document.getElementById('close-hint-footer-btn');

    const openHintModal = () => {
        const lesson = lessons[currentLessonIndex];
        document.getElementById('hint-modal-body').innerHTML = `
            <div class="hint-text-box">
                ${lesson.hint}
            </div>
        `;
        hintModal.classList.add('open');
    };

    const closeHintModal = () => {
        hintModal.classList.remove('open');
    };

    showHintBtn.addEventListener('click', openHintModal);
    closeHintBtn.addEventListener('click', closeHintModal);
    closeHintFooterBtn.addEventListener('click', closeHintModal);
    hintModal.addEventListener('click', (e) => {
        if (e.target === hintModal) closeHintModal();
    });

    // 6. Connect Handbook Drawer events
    const handbookDrawer = document.getElementById('handbook-drawer');
    const handbookBtn = document.getElementById('handbook-btn');
    const closeHandbookBtn = document.getElementById('close-handbook-btn');

    const openHandbook = () => {
        handbookDrawer.classList.add('open');
        // Default tab variables
        loadHandbookTab('variables');
    };

    const closeHandbook = () => {
        handbookDrawer.classList.remove('open');
    };

    handbookBtn.addEventListener('click', openHandbook);
    closeHandbookBtn.addEventListener('click', closeHandbook);
    handbookDrawer.addEventListener('click', (e) => {
        if (e.target === handbookDrawer) closeHandbook();
    });

    // Tab buttons event binding
    document.querySelectorAll('.drawer-tabs .tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.drawer-tabs .tab-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            const tab = e.target.getAttribute('data-tab');
            loadHandbookTab(tab);
        });
    });

    // 7. Connect Button actions
    document.getElementById('run-btn').addEventListener('click', runCurrentCode);
    document.getElementById('reset-btn').addEventListener('click', resetCurrentCode);
    document.getElementById('next-btn').addEventListener('click', loadNextLesson);
    document.getElementById('clear-terminal-btn').addEventListener('click', clearTerminal);
}

function loadHandbookTab(tabKey) {
    const handbookBody = document.getElementById('handbook-body');
    const data = handbookData[tabKey];
    if (data) {
        handbookBody.innerHTML = data;
        handbookBody.scrollTop = 0;
    }
}

function loadProgress() {
    const savedIndex = localStorage.getItem('pycode_current_index');
    if (savedIndex !== null) {
        currentLessonIndex = parseInt(savedIndex);
    }
    
    const savedCompleted = localStorage.getItem('pycode_completed');
    if (savedCompleted !== null) {
        completedLessons = JSON.parse(savedCompleted);
        while(completedLessons.length < lessons.length) {
            completedLessons.push(false);
        }
    }
}

function saveProgress() {
    localStorage.setItem('pycode_current_index', currentLessonIndex);
    localStorage.setItem('pycode_completed', JSON.stringify(completedLessons));
}

function loadLesson(index) {
    currentLessonIndex = index;
    saveProgress();

    const lesson = lessons[index];
    
    const levelBadge = document.getElementById('level-badge');
    if (index < 3) {
        levelBadge.textContent = 'Рівень: Вступ 🔰';
        levelBadge.className = 'badge badge-indigo';
    } else if (index < 6) {
        levelBadge.textContent = 'Рівень: Основи ⚙️';
        levelBadge.className = 'badge badge-blue';
    } else {
        levelBadge.textContent = 'Рівень: Виклики 🏆';
        levelBadge.className = 'badge badge-indigo';
    }
    
    document.getElementById('lesson-indicator').textContent = `Урок ${lesson.id}/${lessons.length}`;
    
    const theoryContent = document.getElementById('theory-content');
    theoryContent.classList.remove('fade-in-up');
    void theoryContent.offsetWidth; // trigger layout reflow
    theoryContent.classList.add('fade-in-up');
    
    theoryContent.innerHTML = `
        <span style="font-size:0.85rem; font-weight:600; text-transform:uppercase; color:var(--color-primary); letter-spacing:0.5px; transition: var(--transition-smooth);">${lesson.subtitle}</span>
        ${lesson.theory}
    `;
    theoryContent.scrollTop = 0;

    const draftCode = localStorage.getItem(`pycode_draft_${index}`);
    if (draftCode !== null) {
        codeEditor.setValue(draftCode);
    } else {
        codeEditor.setValue(lesson.initialCode);
    }
    
    codeEditor.refresh();
    setTimeout(() => codeEditor.focus(), 50);

    renderProgressPills();
    updateNextButtonState();
}

function renderProgressPills() {
    const container = document.getElementById('progress-steps');
    container.innerHTML = '';
    
    lessons.forEach((lesson, index) => {
        const pill = document.createElement('div');
        pill.className = 'step-pill';
        pill.textContent = lesson.id;
        
        if (index === currentLessonIndex) {
            pill.classList.add('active');
        }
        
        if (completedLessons[index]) {
            pill.classList.add('completed');
        }
        
        let isLocked = false;
        if (index > 0 && !completedLessons[index - 1] && index !== currentLessonIndex) {
            isLocked = true;
            pill.classList.add('locked');
        }
        
        if (!isLocked) {
            pill.addEventListener('click', () => {
                loadLesson(index);
            });
        }
        
        container.appendChild(pill);
    });
}

function updateNextButtonState() {
    const nextBtn = document.getElementById('next-btn');
    if (completedLessons[currentLessonIndex] && currentLessonIndex < lessons.length - 1) {
        nextBtn.removeAttribute('disabled');
    } else {
        nextBtn.setAttribute('disabled', 'true');
    }
}

function runCurrentCode() {
    const code = codeEditor.getValue();
    const runBtn = document.getElementById('run-btn');
    runBtn.disabled = true;
    
    currentRunTerminalLogs = [];
    accumulatedOutput = "";
    currentLineElement = null;
    
    const body = document.getElementById('terminal-body');
    body.innerHTML = '';
    printToTerminal(">>> Запуск програми...\n", "system");
    
    Sk.configure({
        output: (text) => {
            accumulatedOutput += text;
            printToTerminal(text, 'output');
        },
        read: builtinRead,
        inputfun: (promptText) => {
            return promptTerminal(promptText);
        },
        inputfunTakesPrompt: true,
        __future__: Sk.python3
    });
    
    Sk.misceval.asyncToPromise(() => {
        return Sk.importMainWithBody("<stdin>", false, code, true);
    })
    .then(() => {
        printToTerminal("\n>>> Програма завершилась успішно.\n", "system");
        runBtn.disabled = false;
        
        const lesson = lessons[currentLessonIndex];
        const isValid = lesson.validate(accumulatedOutput, code, currentRunTerminalLogs);
        
        if (isValid) {
            handleLessonSuccess();
        } else {
            printToTerminal("Результат невірний. Перевір завдання та спробуй ще раз! ❌\n", "error");
        }
    })
    .catch((err) => {
        printToTerminal("\nПомилка виконання:\n" + err.toString() + "\n", "error");
        runBtn.disabled = false;
    });
}

function handleLessonSuccess() {
    completedLessons[currentLessonIndex] = true;
    saveProgress();
    
    printToTerminal("Вітання! Завдання виконано правильно! 🎉\n", "success");
    startConfetti();
    
    renderProgressPills();
    updateNextButtonState();
}

function resetCurrentCode() {
    const lesson = lessons[currentLessonIndex];
    if (confirm("Ви впевнені, що хочете скинути код до початкового стану? Всі ваші зміни для цього уроку будуть видалені.")) {
        localStorage.removeItem(`pycode_draft_${currentLessonIndex}`);
        codeEditor.setValue(lesson.initialCode);
        clearTerminal();
    }
}

function loadNextLesson() {
    if (currentLessonIndex < lessons.length - 1) {
        loadLesson(currentLessonIndex + 1);
    }
}

function clearTerminal() {
    const body = document.getElementById('terminal-body');
    body.innerHTML = '<div class="terminal-welcome">Консоль очищено. Результат вашого коду з\'явиться тут...</div>';
    currentLineElement = null;
}

// Start Application on Load
window.addEventListener('DOMContentLoaded', initApp);
