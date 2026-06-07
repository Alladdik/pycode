// TEST 5 — Підсумковий тест по модулям 1–5 + практика-міст до Модуля 6
const quizData = {
  title: 'Підсумковий тест: Модулі 1–5',
  storageKey: 'pycode_test5_result',
  questions: [
    // ── МОДУЛЬ 1: Змінні та типи ──
    {
      id: 1, module: 1, moduleLabel: 'М1: Змінні',
      question: 'Що виведе цей код?',
      code: 'print(3 * "ab")',
      options: ['"ababab"', '"ab3"', 'Помилка', '6'],
      correct: 0,
      explanation: 'Число * рядок повторює рядок задану кількість разів: 3 * "ab" = "ababab". Це не множення чисел.'
    },
    {
      id: 2, module: 1, moduleLabel: 'М1: Змінні',
      question: 'Який результат?',
      code: 'x = "5"\nprint(x + x)',
      options: ['10', '"55"', '25', 'Помилка'],
      correct: 1,
      explanation: 'x — це рядок (у лапках). "+" склеює рядки: "5" + "5" = "55". Щоб додати числа, треба було б int(x).'
    },
    {
      id: 3, module: 1, moduleLabel: 'М1: Змінні',
      question: 'Скільки символів порахує len()?',
      code: 'print(len("Привіт"))',
      options: ['5', '6', '7', 'Помилка'],
      correct: 1,
      explanation: 'Слово «Привіт» має 6 літер: П-р-и-в-і-т. len() рахує кожен символ.'
    },
    {
      id: 4, module: 1, moduleLabel: 'М1: Змінні',
      question: 'Якого типу буде змінна age?',
      code: 'age = input("Вік: ")',
      options: ['int', 'str', 'float', 'bool'],
      correct: 1,
      explanation: 'input() ЗАВЖДИ повертає рядок (str), навіть якщо ввести цифри. Тому для обчислень роблять int(input()).'
    },

    // ── МОДУЛЬ 2: if / elif / else ──
    {
      id: 5, module: 2, moduleLabel: 'М2: if/elif',
      question: 'Що виведеться при n = 10?',
      code: 'n = 10\nif n > 5:\n    print("A")\nelif n > 8:\n    print("B")\nelse:\n    print("C")',
      options: ['A', 'B', 'C', 'A та B'],
      correct: 0,
      explanation: 'Умови перевіряються зверху вниз і зупиняються на ПЕРШІЙ істинній. n>5 вже True → "A". До elif n>8 черга не доходить.'
    },
    {
      id: 6, module: 2, moduleLabel: 'М2: if/elif',
      question: 'Яке значення виразу?',
      code: 'print(True and False)',
      options: ['True', 'False', 'None', 'Помилка'],
      correct: 1,
      explanation: 'and дає True лише коли ОБИДВІ частини True. Тут одна False → результат False.'
    },
    {
      id: 7, module: 2, moduleLabel: 'М2: if/elif',
      question: 'Яким буде результат?',
      code: 'print(5 < 3 or 8 > 2)',
      options: ['True', 'False', 'Помилка', 'None'],
      correct: 0,
      explanation: '5<3 → False, 8>2 → True. or дає True якщо хоча б одна частина True → True.'
    },
    {
      id: 8, module: 2, moduleLabel: 'М2: if/elif',
      question: 'Що виведе код при t = 20?',
      code: 't = 20\nif t >= 30:\n    print("жарко")\nelif t >= 15:\n    print("тепло")\nelse:\n    print("холодно")',
      options: ['жарко', 'тепло', 'холодно', 'нічого'],
      correct: 1,
      explanation: '20 >= 30? Ні. 20 >= 15? Так → "тепло". Перша істинна умова виграє.'
    },

    // ── МОДУЛЬ 3: while ──
    {
      id: 9, module: 3, moduleLabel: 'М3: while',
      question: 'Що виведе print(n) після циклу?',
      code: 'n = 3\nwhile n < 20:\n    n *= 2\nprint(n)',
      options: ['12', '24', '20', '48'],
      correct: 1,
      explanation: 'n щоразу подвоюється: 3→6→12→24. Коли n=24, умова 24<20 хибна → стоп. Друкується 24.'
    },
    {
      id: 10, module: 3, moduleLabel: 'М3: while',
      question: 'Яке число виведеться?',
      code: 'i = 0\nwhile True:\n    i += 1\n    if i == 5:\n        break\nprint(i)',
      options: ['4', '5', '6', 'нескінченно'],
      correct: 1,
      explanation: 'i зростає 1,2,3,4,5. При i==5 спрацьовує break — вихід із циклу. Друкується 5.'
    },
    {
      id: 11, module: 3, moduleLabel: 'М3: while',
      question: 'Яким буде total?',
      code: 'total = 0\ni = 1\nwhile i <= 3:\n    total += i\n    i += 1\nprint(total)',
      options: ['3', '6', '7', '10'],
      correct: 1,
      explanation: 'Накопичувач додає 1+2+3 = 6. Цикл працює поки i ≤ 3.'
    },
    {
      id: 12, module: 3, moduleLabel: 'М3: while',
      question: 'Яке число виведеться ОСТАННІМ?',
      code: 'n = 5\nwhile n > 0:\n    print(n)\n    n -= 1',
      options: ['0', '1', '5', 'нічого'],
      correct: 1,
      explanation: 'Виводиться 5,4,3,2,1. При n=0 умова 0>0 хибна → стоп. Останнє надруковане число — 1.'
    },

    // ── МОДУЛЬ 4: for + Списки ──
    {
      id: 13, module: 4, moduleLabel: 'М4: for+списки',
      question: 'Що генерує range(2, 11, 3)?',
      code: 'print(list(range(2, 11, 3)))',
      options: ['[2, 5, 8, 11]', '[2, 5, 8]', '[3, 6, 9]', '[2, 4, 6, 8, 10]'],
      correct: 1,
      explanation: 'start=2, крок=3: 2, 5, 8. Наступне 11 — але stop=11 не включається. Тому [2, 5, 8].'
    },
    {
      id: 14, module: 4, moduleLabel: 'М4: for+списки',
      question: 'Що виведе fruits[2]?',
      code: 'fruits = ["a", "b", "c", "d"]\nprint(fruits[2])',
      options: ['"b"', '"c"', '"d"', '3'],
      correct: 1,
      explanation: 'Індекси з нуля: [0]="a", [1]="b", [2]="c". Тому fruits[2] = "c".'
    },
    {
      id: 15, module: 4, moduleLabel: 'М4: for+списки',
      question: 'Що виведе nums[-1]?',
      code: 'nums = [10, 20, 30]\nprint(nums[-1])',
      options: ['10', '20', '30', 'Помилка'],
      correct: 2,
      explanation: 'Індекс -1 — це останній елемент списку. Тут останній — 30.'
    },
    {
      id: 16, module: 4, moduleLabel: 'М4: for+списки',
      question: 'Яким буде total після циклу?',
      code: 'data = [4, 8, 15, 16]\ntotal = 0\nfor x in data:\n    total += x\nprint(total)',
      options: ['39', '43', '35', '16'],
      correct: 1,
      explanation: 'Цикл додає кожен елемент: 4+8+15+16 = 43.'
    },

    // ── МОДУЛЬ 5: % та // ──
    {
      id: 17, module: 5, moduleLabel: 'М5: % та //',
      question: 'Що виведе цей код?',
      code: 'print(17 % 5)',
      options: ['2', '3', '3.4', '12'],
      correct: 0,
      explanation: '% — залишок від ділення. 17 = 5·3 + 2, тому залишок = 2.'
    },
    {
      id: 18, module: 5, moduleLabel: 'М5: % та //',
      question: 'Який результат?',
      code: 'print(17 // 5)',
      options: ['3', '3.4', '2', '4'],
      correct: 0,
      explanation: '// — ціле ділення (відкидає дробову частину). 17 / 5 = 3.4 → // дає 3.'
    },
    {
      id: 19, module: 5, moduleLabel: 'М5: % та //',
      question: 'Що поверне 7382 % 10?',
      code: 'print(7382 % 10)',
      options: ['7', '738', '2', '82'],
      correct: 2,
      explanation: '% 10 завжди дає ОСТАННЮ цифру числа. У 7382 остання цифра — 2.'
    },
    {
      id: 20, module: 5, moduleLabel: 'М5: % та //',
      question: 'Скільки чисел виведе цей код?',
      code: 'for i in range(1, 11):\n    if i % 3 == 0:\n        print(i)',
      options: ['2', '3', '4', '5'],
      correct: 1,
      explanation: 'Кратні 3 від 1 до 10: це 3, 6, 9 — рівно 3 числа.'
    }
  ],

  // ── ПРАКТИКА: міст до Модуля 6 (маніпуляції з числами) ──
  practice: [
    {
      id: 1,
      title: 'Розминка 1: модуль різниці',
      theory: `<p>У Модулі 6 часто треба <strong>модуль числа</strong> — функція <code>abs()</code> прибирає знак «мінус».</p>
        <div class="pr-card"><code>abs(-7)</code> → 7 &nbsp;·&nbsp; <code>abs(7)</code> → 7</div>`,
      task: 'Зчитай два числа <code>a</code> і <code>b</code>. Виведи <strong>модуль їх різниці</strong> через <code>abs(a - b)</code>.',
      initialCode: `a = int(input("a: "))
b = int(input("b: "))

# Виведи abs(a - b)
`,
      hint: 'Напиши: <code>print(abs(a - b))</code>. abs() завжди дає невід\'ємний результат.',
      validate: (output, code, inputs) => {
        if (!/\babs\b/.test(code)) return false;
        if (inputs.length < 2) return false;
        const a = parseInt(inputs[0]), b = parseInt(inputs[1]);
        if (isNaN(a) || isNaN(b)) return false;
        return output.trim().split(/\s+/).some(v => parseInt(v) === Math.abs(a - b));
      }
    },
    {
      id: 2,
      title: 'Розминка 2: степінь **',
      theory: `<p>Оператор <code>**</code> підносить до степеня — знадобиться у Модулі 6.</p>
        <div class="pr-card"><code>5 ** 2</code> → 25 (квадрат) &nbsp;·&nbsp; <code>2 ** 3</code> → 8 (куб)</div>`,
      task: 'Зчитай число <code>n</code>. Виведи його <strong>квадрат</strong> (<code>n ** 2</code>) та <strong>куб</strong> (<code>n ** 3</code>).',
      initialCode: `n = int(input("n: "))

# Виведи квадрат і куб
`,
      hint: '<code>print(n ** 2)</code> — квадрат, <code>print(n ** 3)</code> — куб.',
      validate: (output, code, inputs) => {
        if (!/\*\*/.test(code)) return false;
        if (!inputs.length) return false;
        const n = parseInt(inputs[0]);
        if (isNaN(n)) return false;
        const out = output.trim();
        return out.includes(String(n ** 2)) && out.includes(String(n ** 3));
      }
    },
    {
      id: 3,
      title: 'Розминка 3: остання цифра',
      theory: `<p>Поєднаємо <code>%</code> з Модуля 5 — він дасть останню цифру, а далі у Модулі 6 будемо працювати з усіма цифрами.</p>
        <div class="pr-card"><code>358 % 10</code> → 8 (остання) &nbsp;·&nbsp; <code>358 // 10</code> → 35 (без останньої)</div>`,
      task: 'Зчитай число <code>n</code>. Виведи його <strong>останню цифру</strong> (<code>n % 10</code>) та число <strong>без останньої цифри</strong> (<code>n // 10</code>).',
      initialCode: `n = int(input("n: "))

# Виведи останню цифру та число без неї
`,
      hint: '<code>print(n % 10)</code> — остання цифра, <code>print(n // 10)</code> — без останньої.',
      validate: (output, code, inputs) => {
        if (!/%/.test(code) || !/\/\//.test(code)) return false;
        if (!inputs.length) return false;
        const n = parseInt(inputs[0]);
        if (isNaN(n) || n < 0) return false;
        const out = output.trim();
        return out.includes(String(n % 10)) && out.includes(String(Math.floor(n / 10)));
      }
    }
  ]
};
