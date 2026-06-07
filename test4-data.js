// TEST 4 — Тест по модулям 1–4
const quizData = {
  title: 'Тест: Модулі 1–4',
  storageKey: 'pycode_test4_result',
  questions: [
    {
      id: 1, module: 1, moduleLabel: 'М1: Змінні',
      question: 'Що виведе цей код?',
      code: 'print("py" + "thon")',
      options: ['"py"+"thon"', 'Помилка', 'python', '12'],
      correct: 2,
      explanation: '"+" між рядками — зчеплення (конкатенація): "py" + "thon" = "python". Це не арифметика!'
    },
    {
      id: 2, module: 1, moduleLabel: 'М1: Змінні',
      question: 'Яким буде результат виконання?',
      code: 'result = int("100") + 5\nprint(result)',
      options: ['"1005"', '1005', '105', 'Помилка'],
      correct: 2,
      explanation: 'int("100") перетворює рядок "100" на ціле число 100. Потім 100 + 5 = 105.'
    },
    {
      id: 3, module: 1, moduleLabel: 'М1: Змінні',
      question: 'Що поверне функція len()?',
      code: 'print(len("Python"))',
      options: ['5', '7', '6', 'Помилка'],
      correct: 2,
      explanation: '"Python" має рівно 6 символів: P-y-t-h-o-n. len() рахує кожен символ включно з великими.'
    },
    {
      id: 4, module: 2, moduleLabel: 'М2: if/elif',
      question: 'Що виведе код при score = 75?',
      code: 'score = 75\nif score >= 90:\n    print("A")\nelif score >= 70:\n    print("B")\nelse:\n    print("C")',
      options: ['A', 'B', 'C', 'Нічого'],
      correct: 1,
      explanation: '75 >= 90? Ні. 75 >= 70? Так → виводиться "B". Умови перевіряються зверху вниз і зупиняються на першому збігу.'
    },
    {
      id: 5, module: 2, moduleLabel: 'М2: if/elif',
      question: 'x = 15. Яке значення матиме вираз?',
      code: 'x > 20 or x == 15',
      options: ['False', 'True', 'Помилка', 'None'],
      correct: 1,
      explanation: 'x > 20 → False. x == 15 → True. False OR True = True (or повертає True якщо хоча б одна частина True).'
    },
    {
      id: 6, module: 2, moduleLabel: 'М2: if/elif',
      question: 'a = 3, b = 0. Що виведеться?',
      code: 'if a > 0 and b > 0:\n    print("обидва")\nelif a > 0:\n    print("тільки a")\nelse:\n    print("жодне")',
      options: ['обидва', 'тільки a', 'жодне', 'Помилка'],
      correct: 1,
      explanation: 'a>0 True, b>0 False → and = False. Перша гілка не спрацьовує. elif a>0 → True → "тільки a".'
    },
    {
      id: 7, module: 3, moduleLabel: 'М3: while',
      question: 'Що виведе цей код?',
      code: 'n = 1\nwhile n < 32:\n    n *= 2\nprint(n)',
      options: ['16', '64', '32', 'Нескінченний цикл'],
      correct: 2,
      explanation: 'n подвоюється: 1→2→4→8→16→32. Коли n=32: умова 32 < 32 хибна → цикл зупиняється → print(32).'
    },
    {
      id: 8, module: 3, moduleLabel: 'М3: while',
      question: 'Що виведе цей код?',
      code: 'i = 0\nwhile True:\n    i += 1\n    if i == 3:\n        break\nprint(i)',
      options: ['0', '2', '3', 'Нескінченний цикл'],
      correct: 2,
      explanation: 'i збільшується: 1, 2, 3. При i==3 спрацьовує break — виходимо з циклу. print(i) → 3.'
    },
    {
      id: 9, module: 3, moduleLabel: 'М3: while',
      question: 'Яким буде значення total після циклу?',
      code: 'total = 0\ni = 1\nwhile i <= 4:\n    total += i\n    i += 1\nprint(total)',
      options: ['4', '8', '10', '16'],
      correct: 2,
      explanation: 'Накопичувач підсумовує: 0+1+2+3+4 = 10. Цикл йде від 1 до 4 включно.'
    },
    {
      id: 10, module: 4, moduleLabel: 'М4: for + списки',
      question: 'Що генерує range(1, 6, 2)?',
      code: 'print(list(range(1, 6, 2)))',
      options: ['[1, 2, 3, 4, 5]', '[1, 3, 5]', '[2, 4, 6]', '[1, 2, 4]'],
      correct: 1,
      explanation: 'start=1, stop=6 (не включно), step=2 → 1, 3, 5. Кожен наступний на 2 більше, до 6 не доходимо.'
    },
    {
      id: 11, module: 4, moduleLabel: 'М4: for + списки',
      question: 'Що виведе colors[1]?',
      code: 'colors = ["red", "green", "blue"]\nprint(colors[1])',
      options: ['"red"', '"green"', '"blue"', '3'],
      correct: 1,
      explanation: 'Індекси: colors[0]="red", colors[1]="green", colors[2]="blue". Відлік завжди починається з 0!'
    },
    {
      id: 12, module: 4, moduleLabel: 'М4: for + списки',
      question: 'Що виведе nums[-2]?',
      code: 'nums = [10, 20, 30, 40, 50]\nprint(nums[-2])',
      options: ['20', '30', '40', '50'],
      correct: 2,
      explanation: 'Від\'ємні індекси рахують з кінця: -1=50 (останній), -2=40 (передостанній).'
    },
    {
      id: 13, module: 4, moduleLabel: 'М4: for + списки',
      question: 'Який рядок виведеться ПЕРШИМ?',
      code: 'words = ["a", "b", "c"]\nfor i, w in enumerate(words, 1):\n    print(f"{i}:{w}")',
      options: ['0:a', '1:a', '1:b', 'a:1'],
      correct: 1,
      explanation: 'enumerate(words, 1) починає нумерацію з 1. Перша ітерація: i=1, w="a" → виводить "1:a".'
    },
    {
      id: 14, module: 4, moduleLabel: 'М4: for + списки',
      question: 'Що виведе код після циклу?',
      code: 'total = 0\nfor n in [3, 7, 1, 9]:\n    total += n\nprint(total)',
      options: ['9', '19', '20', '21'],
      correct: 2,
      explanation: 'Накопичувач: 0+3=3, +7=10, +1=11, +9=20. Цикл for додає кожен елемент списку.'
    },
    {
      id: 15, module: 4, moduleLabel: 'М4: for + списки',
      question: 'Яке значення виведе цей код?',
      code: 'vals = [5, 2, 8, 1, 6]\nbest = vals[0]\nfor v in vals:\n    if v > best:\n        best = v\nprint(best)',
      options: ['5', '6', '8', '1'],
      correct: 2,
      explanation: 'Алгоритм пошуку максимуму. best починає з 5, оновлюється до 8 (найбільший елемент у списку).'
    }
  ]
};
