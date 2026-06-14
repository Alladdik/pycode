// TRAINER 7 — Duolingo-стиль (після Модуля 7): степінь, модуль, кратність
// Типи вправ: choice | input | fill | indent | order
var quizData = {
  title: 'Тренажер: Степінь і кратність',
  subtitle: '12 коротких вправ у стилі Duolingo — після Модуля 7',
  hero: '🏆',
  storageKey: 'pycode_test7_result',
  confettiFrom: 0.75,
  nav: { backLabel: '← Модуль 7', backHref: 'lesson7.html', nextLabel: 'Модуль 8 →', nextHref: 'lesson8.html' },
  exercises: [

    // 1 — choice (степінь)
    {
      type: 'choice',
      prompt: 'Що виведе цей код?',
      code: 'print(5 ** 2)',
      options: ['10', '25', '7', '52'],
      correct: 1,
      explain: '** — піднесення до степеня. 5 ** 2 = 5·5 = 25 (квадрат). Це не множення на 2.'
    },

    // 2 — input (модуль)
    {
      type: 'input',
      prompt: 'Введи, що виведе код:',
      code: 'print(abs(-12))',
      answer: '12',
      explain: 'abs() повертає модуль — число без знака. abs(-12) = 12.'
    },

    // 3 — fill (куб)
    {
      type: 'fill',
      prompt: 'Встав оператор, щоб порахувати КУБ числа:',
      code: 'cube = n ▢ 3',
      bank: ['*', '**', '//', '%'],
      answer: '**',
      explain: 'Куб — це степінь 3: n ** 3. Одна зірочка (*) дала б множення, а не степінь.'
    },

    // 4 — choice (порядок дій)
    {
      type: 'choice',
      prompt: 'Що виведе код? (звернути увагу на порядок дій)',
      code: 'n = 2\nprint(n ** 3 - n ** 2)',
      options: ['4', '2', '6', '16'],
      correct: 0,
      explain: '** виконується ПЕРШИМ: n³=8, n²=4. Лише потім віднімання: 8 − 4 = 4.'
    },

    // 5 — input (модуль різниці, від’ємне N)
    {
      type: 'input',
      prompt: 'Введи результат:',
      code: 'n = -2\nprint(abs(n ** 3 - n ** 2))',
      answer: '12',
      explain: '(-2)³ = -8, (-2)² = 4. Різниця -8 − 4 = -12, а abs() прибирає мінус → 12.'
    },

    // 6 — choice (межовий випадок)
    {
      type: 'choice',
      prompt: 'Що виведе код для N=1?',
      code: 'n = 1\nprint(abs(n ** 3 - n ** 2))',
      options: ['0', '1', '2', '-1'],
      correct: 0,
      explain: '1³=1 і 1²=1, різниця 1 − 1 = 0. Для N=1 і N=0 результат завжди 0.'
    },

    // 7 — fill (перевірка кратності)
    {
      type: 'fill',
      prompt: 'Встав оператор, щоб перевірити, що (n − 1) ділиться на 3 БЕЗ остачі:',
      code: 'if (n - 1) ▢ 3 == 0:',
      bank: ['%', '//', '/', '**'],
      answer: '%',
      explain: '% — остача від ділення. Якщо остача 0 — число ділиться рівно. // дало б саму частку, а не перевірку.'
    },

    // 8 — choice (ціле ділення)
    {
      type: 'choice',
      prompt: 'Що виведе цей код для N=10?',
      code: 'n = 10\nif (n - 1) % 3 == 0:\n    print((n - 1) // 3)\nelse:\n    print(False)',
      options: ['False', '3', '9', '3.0'],
      correct: 1,
      explain: '(10−1)=9, 9 % 3 = 0 → умова істинна. 9 // 3 = 3. Виводиться ціле 3 (не 3.0, бо // дає int).'
    },

    // 9 — input (гілка else)
    {
      type: 'input',
      prompt: 'Введи, що виведе код для N=11:',
      code: 'n = 11\nif (n - 1) % 3 == 0:\n    print((n - 1) // 3)\nelse:\n    print(False)',
      answer: 'False',
      accept: ['false'],
      explain: '(11−1)=10, 10 % 3 = 1 (не ділиться) → умова хибна → гілка else → виводиться False.'
    },

    // 10 — choice (для якого N → False)
    {
      type: 'choice',
      prompt: 'Для якого з цих значень N код виведе False?',
      code: 'if (n - 1) % 3 == 0:\n    print((n - 1) // 3)\nelse:\n    print(False)',
      options: ['N=7', 'N=13', 'N=5', 'N=4'],
      correct: 2,
      explain: 'False, коли (N−1) НЕ кратне 3. N=5: 4 % 3 = 1 → False. А 7→6, 13→12, 4→3 — усі кратні 3.'
    },

    // 11 — indent (if / else)
    {
      type: 'indent',
      prompt: 'Постав правильні відступи, щоб умова працювала:',
      lines: [
        { t: 'if (n - 1) % 3 == 0:', lvl: 0 },
        { t: 'print((n - 1) // 3)',  lvl: 1 },
        { t: 'else:',                lvl: 0 },
        { t: 'print(False)',         lvl: 1 }
      ],
      explain: 'if та else — на нульовому рівні. Те, що виконується всередині кожної гілки — з відступом у один рівень (4 пробіли).'
    },

    // 12 — order (фінал)
    {
      type: 'order',
      prompt: 'Збери програму: вивести (N−1)//3, якщо ділиться на 3, інакше False:',
      lines: [
        'n = int(input())',
        'if (n - 1) % 3 == 0:',
        '    print((n - 1) // 3)',
        'else:',
        '    print(False)'
      ],
      explain: 'Спершу зчитуємо N. Потім перевіряємо кратність 3. Гілка if виводить частку, else — False. Порядок рядків важливий!'
    }

  ]
};
