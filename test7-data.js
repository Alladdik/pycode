// TEST 7 — Модуль 7: Задача #1 |N³−N²| та Задача #4 (N−1)/3
const quizData = {
  title: 'Тест 7: Задачі #1 та #4',
  subtitle: '12 запитань — abs, степінь та перевірка кратності',
  storageKey: 'pycode_test7_result',
  hero: '🏆',
  nav: { backLabel: '← Модуль 7', backHref: 'lesson7.html', nextLabel: 'Модуль 8 →', nextHref: 'lesson8.html' },
  questions: [
    {
      module: 1, moduleLabel: '#1 Куб−Квадрат',
      question: 'Що поверне цей вираз?',
      code: 'print(5 ** 2)',
      options: ['10', '25', '7', '52'],
      correct: 1,
      explanation: '** — піднесення до степеня. 5 ** 2 = 5·5 = 25 (квадрат). Це не множення на 2.'
    },
    {
      module: 1, moduleLabel: '#1 Куб−Квадрат',
      question: 'Який результат?',
      code: 'print(abs(-12))',
      options: ['-12', '12', '0', '24'],
      correct: 1,
      explanation: 'abs() повертає модуль — число без знака. abs(-12) = 12.'
    },
    {
      module: 1, moduleLabel: '#1 Куб−Квадрат',
      question: 'Який порядок дій у виразі n**3 - n**2?',
      code: 'n = 2\nprint(n**3 - n**2)',
      options: ['(n³) − (n²)', 'n^(3−n)^2', '((n³)−n)²', 'n^(3−2)'],
      correct: 0,
      explanation: '** виконується ПЕРШИМ (раніше за віднімання). Тому спершу n³ і n², потім різниця: 8 − 4 = 4.'
    },
    {
      module: 1, moduleLabel: '#1 Куб−Квадрат',
      question: 'Що виведе Задача #1 для N=4?',
      code: 'n = 4\nprint(abs(n**3 - n**2))',
      options: ['16', '48', '64', '80'],
      correct: 1,
      explanation: 'N³=64, N²=16, різниця 64−16=48. Модуль не змінює додатне число → 48.'
    },
    {
      module: 1, moduleLabel: '#1 Куб−Квадрат',
      question: 'Чому в Задачі #1 потрібен саме abs()? Що виведе код для N=−2?',
      code: 'n = -2\nprint(abs(n**3 - n**2))',
      options: ['−12', '12', '−4', '4'],
      correct: 1,
      explanation: 'N³=−8, N²=4, різниця −8−4=−12. abs() прибирає мінус → 12. Без abs() було б −12.'
    },
    {
      module: 1, moduleLabel: '#1 Куб−Квадрат',
      question: 'Що виведе Задача #1 для N=1?',
      code: 'n = 1\nprint(abs(n**3 - n**2))',
      options: ['0', '1', '2', '−1'],
      correct: 0,
      explanation: '1³=1 і 1²=1, різниця 1−1=0. Для N=1 та N=0 відповідь завжди 0.'
    },
    {
      module: 4, moduleLabel: '#4 (N−1)/3',
      question: 'Яка умова перевіряє, що X=(N−1)/3 буде ЦІЛИМ числом?',
      options: ['(n - 1) % 3 == 0', '(n - 1) // 3 == 0', 'n % 3 == 1', '(n - 1) / 3 == 0'],
      correct: 0,
      explanation: 'X ціле, коли (N−1) ділиться на 3 без залишку, тобто (n-1) % 3 == 0. // дало б саму частку, а не перевірку.'
    },
    {
      module: 4, moduleLabel: '#4 (N−1)/3',
      question: 'Що виведе Задача #4 для N=10?',
      code: 'n = 10\nif (n-1) % 3 == 0:\n    print((n-1)//3)\nelse:\n    print(False)',
      options: ['False', '3', '9', '3.0'],
      correct: 1,
      explanation: '(10−1)=9, 9%3=0 → X цілий. X=9//3=3. Виводиться ціле 3 (не 3.0, бо // дає int).'
    },
    {
      module: 4, moduleLabel: '#4 (N−1)/3',
      question: 'Що виведе Задача #4 для N=11?',
      code: 'n = 11\nif (n-1) % 3 == 0:\n    print((n-1)//3)\nelse:\n    print(False)',
      options: ['False', '3', '10', '3.33'],
      correct: 0,
      explanation: '(11−1)=10, 10%3=1 (не ділиться) → умова хибна → гілка else → виводиться False.'
    },
    {
      module: 4, moduleLabel: '#4 (N−1)/3',
      question: 'Що виведе Задача #4 для N=22?',
      code: 'n = 22',
      options: ['7', 'False', '21', '8'],
      correct: 0,
      explanation: '(22−1)=21, 21%3=0 → ділиться. X=21//3=7. Виводиться 7.'
    },
    {
      module: 4, moduleLabel: '#4 (N−1)/3',
      question: 'Для якого з цих N Задача #4 виведе False?',
      options: ['N=7', 'N=13', 'N=5', 'N=4'],
      correct: 2,
      explanation: 'False коли (N−1) НЕ кратне 3. N=5: 4%3=1 → False. А 7→6, 13→12, 4→3 — усі кратні 3.'
    },
    {
      module: 1, moduleLabel: '#1 Куб−Квадрат',
      question: 'Фінальна перевірка: що виведе Задача #1 для N=3?',
      code: 'n = 3\nprint(abs(n**3 - n**2))',
      options: ['18', '9', '27', '12'],
      correct: 0,
      explanation: '3³=27, 3²=9, різниця 27−9=18. Відповідь 18.'
    }
  ]
};
