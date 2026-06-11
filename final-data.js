// FINAL TEST — Підсумок по Модулях 1–5 (засвоїти та закрити перші 5 модулів)
const quizData = {
  title: 'Фінальний тест: Модулі 1–5',
  subtitle: '20 запитань — закрий перші 5 модулів',
  storageKey: 'pycode_final15_result',
  hero: '⭐',
  confettiFrom: 0.7,
  nav: { backLabel: '🏠 На головну', backHref: 'index.html' },
  msgPerfect: '20 з 20 — перші 5 модулів повністю засвоєні. Можеш сміливо рухатись до екзаменаційних задач! 🏆',
  questions: [
    // ── М1: Змінні та типи ──
    {
      module: 1, moduleLabel: 'М1: Змінні',
      question: 'Що виведе цей код?',
      code: 'print("5" + "3")',
      options: ['8', '53', '"53"', '35'],
      correct: 1,
      explanation: '"+" між рядками склеює їх: "5" + "3" = "53". print виводить без лапок. Це не додавання чисел.'
    },
    {
      module: 1, moduleLabel: 'М1: Змінні',
      question: 'Який результат?',
      code: 'print(int("7") + 2)',
      options: ['"72"', '9', '72', 'Помилка'],
      correct: 1,
      explanation: 'int("7") перетворює рядок на число 7. Потім 7 + 2 = 9.'
    },
    {
      module: 1, moduleLabel: 'М1: Змінні',
      question: 'Скільки символів порахує len()?',
      code: 'print(len("Привіт"))',
      options: ['5', '6', '7', 'Помилка'],
      correct: 1,
      explanation: '«Привіт» має 6 літер: П-р-и-в-і-т. len() рахує кожен символ.'
    },
    {
      module: 1, moduleLabel: 'М1: Змінні',
      question: 'Що виведе вираз з урахуванням пріоритету операцій?',
      code: 'print(7 + 3 * 2)',
      options: ['20', '13', '17', '26'],
      correct: 1,
      explanation: 'Множення виконується ПЕРШИМ: 3*2=6, потім 7+6=13. Дужки тут не потрібні.'
    },

    // ── М2: Умови ──
    {
      module: 2, moduleLabel: 'М2: Умови',
      question: 'Яке значення виразу при x=5?',
      code: 'x = 5\nprint(x > 3 and x < 10)',
      options: ['True', 'False', 'Помилка', '5'],
      correct: 0,
      explanation: '5>3 → True, 5<10 → True. and дає True лише коли обидві частини True → True.'
    },
    {
      module: 2, moduleLabel: 'М2: Умови',
      question: 'Що виведе код при score=60?',
      code: 'score = 60\nif score >= 90:\n    print("A")\nelif score >= 60:\n    print("B")\nelse:\n    print("C")',
      options: ['A', 'B', 'C', 'Нічого'],
      correct: 1,
      explanation: '60>=90? Ні. 60>=60? Так → "B". Умови перевіряються зверху вниз до першого збігу.'
    },
    {
      module: 2, moduleLabel: 'М2: Умови',
      question: 'Який результат?',
      code: 'print(not (5 > 3))',
      options: ['True', 'False', 'Помилка', 'None'],
      correct: 1,
      explanation: '5>3 → True. not перевертає: not True = False.'
    },
    {
      module: 2, moduleLabel: 'М2: Умови',
      question: 'Що виведеться при n=7?',
      code: 'n = 7\nif n % 2 == 0:\n    print("парне")\nelse:\n    print("непарне")',
      options: ['парне', 'непарне', 'Помилка', '1'],
      correct: 1,
      explanation: '7 % 2 = 1 (не 0), тому умова хибна → гілка else → "непарне".'
    },

    // ── М3: while ──
    {
      module: 3, moduleLabel: 'М3: while',
      question: 'Що виведе print(n) після циклу?',
      code: 'n = 1\nwhile n < 10:\n    n *= 3\nprint(n)',
      options: ['9', '27', '10', '3'],
      correct: 1,
      explanation: 'n: 1→3→9→27. Коли n=27, умова 27<10 хибна → стоп. Друкується 27.'
    },
    {
      module: 3, moduleLabel: 'М3: while',
      question: 'Яке число виведеться?',
      code: 'i = 0\nwhile i < 5:\n    i += 1\nprint(i)',
      options: ['4', '5', '6', 'нескінченно'],
      correct: 1,
      explanation: 'i зростає 1,2,3,4,5. При i=5 умова 5<5 хибна → стоп. Друкується 5.'
    },
    {
      module: 3, moduleLabel: 'М3: while',
      question: 'Яке число виведеться ОСТАННІМ?',
      code: 'n = 3\nwhile n > 0:\n    print(n)\n    n -= 1',
      options: ['0', '1', '3', 'нічого'],
      correct: 1,
      explanation: 'Виводиться 3, 2, 1. При n=0 умова 0>0 хибна → стоп. Останнє надруковане — 1.'
    },
    {
      module: 3, moduleLabel: 'М3: while',
      question: 'Яким буде total?',
      code: 'total = 0\ni = 1\nwhile i <= 5:\n    total += i\n    i += 1\nprint(total)',
      options: ['10', '15', '21', '6'],
      correct: 1,
      explanation: 'Накопичувач додає 1+2+3+4+5 = 15. Цикл працює поки i ≤ 5.'
    },

    // ── М4: for + Списки ──
    {
      module: 4, moduleLabel: 'М4: for',
      question: 'Що генерує range(0, 10, 3)?',
      code: 'print(list(range(0, 10, 3)))',
      options: ['[0, 3, 6, 9]', '[0, 3, 6, 9, 12]', '[3, 6, 9]', '[0, 1, 2, 3]'],
      correct: 0,
      explanation: 'start=0, крок=3: 0, 3, 6, 9. Наступне 12 ≥ 10 (stop) — не включається.'
    },
    {
      module: 4, moduleLabel: 'М4: for',
      question: 'Що виведе nums[-1]?',
      code: 'nums = [10, 20, 30, 40]\nprint(nums[-1])',
      options: ['10', '30', '40', 'Помилка'],
      correct: 2,
      explanation: 'Індекс -1 — це останній елемент списку. Тут останній — 40.'
    },
    {
      module: 4, moduleLabel: 'М4: for',
      question: 'Яким буде total після циклу?',
      code: 'total = 0\nfor x in [2, 4, 6]:\n    total += x\nprint(total)',
      options: ['6', '12', '8', '246'],
      correct: 1,
      explanation: 'Цикл додає кожен елемент: 2+4+6 = 12.'
    },
    {
      module: 4, moduleLabel: 'М4: for',
      question: 'Що виведе len(words)?',
      code: 'words = ["a", "b", "c"]\nprint(len(words))',
      options: ['2', '3', '4', '"abc"'],
      correct: 1,
      explanation: 'len() рахує кількість елементів списку. Тут їх 3.'
    },

    // ── М5: % та // ──
    {
      module: 5, moduleLabel: 'М5: % та //',
      question: 'Що виведе цей код?',
      code: 'print(20 % 6)',
      options: ['2', '3', '3.3', '14'],
      correct: 0,
      explanation: '% — залишок. 20 = 6·3 + 2, тому залишок = 2.'
    },
    {
      module: 5, moduleLabel: 'М5: % та //',
      question: 'Який результат?',
      code: 'print(20 // 6)',
      options: ['3', '3.3', '2', '4'],
      correct: 0,
      explanation: '// — ціле ділення (відкидає дробову частину). 20 / 6 = 3.33 → // дає 3.'
    },
    {
      module: 5, moduleLabel: 'М5: % та //',
      question: 'Що поверне 1234 % 10?',
      code: 'print(1234 % 10)',
      options: ['1', '123', '4', '34'],
      correct: 2,
      explanation: '% 10 завжди дає ОСТАННЮ цифру числа. У 1234 остання цифра — 4.'
    },
    {
      module: 5, moduleLabel: 'М5: % та //',
      question: 'Що поверне 1234 // 10?',
      code: 'print(1234 // 10)',
      options: ['4', '123', '124', '12'],
      correct: 1,
      explanation: '// 10 відрізає останню цифру: 1234 // 10 = 123.'
    }
  ]
};
