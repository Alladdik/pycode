// MODULE 2 — elif та Логічні Оператори (9 Tasks)
const lessons = [
  {
    id: 1,
    title: 'Урок 1: "Пастка подвійного if"',
    subtitle: 'Чому elif краще, ніж кілька if підряд',
    theory: `
      <h3>Каскадна помилка 🐛</h3>
      <p>Якщо написати кілька <code>if</code> підряд, Python перевіряє <strong>кожен</strong> незалежно. При score=95 можуть спрацювати всі три блоки одразу!</p>
      <div class="theory-card">
        <h4>❌ Погано — кілька if:</h4>
        <pre><code>if score >= 90: print("Відмінно!")  # спрацює
if score >= 70: print("Добре!")     # ТЕЖ спрацює!</code></pre>
      </div>
      <div class="theory-card">
        <h4>✅ Правильно — elif:</h4>
        <pre><code>if score >= 90:   print("Відмінно!")  # спрацює
elif score >= 70: print("Добре!")     # вже НЕ перевіряється</code></pre>
      </div>
      <div class="instruction-box">
        <h4>📝 Твоє завдання:</h4>
        <p>У коді нижче помилка. Замінь другий та третій <code>if</code> на <code>elif</code>, щоб при score=95 виводилося тільки одне повідомлення.</p>
      </div>
    `,
    initialCode: `score = int(input("Введи оцінку (0-100): "))

if score >= 90:
    print("Відмінно! 🌟")
if score >= 70:      # ← Заміни на elif
    print("Добре! 👍")
if score >= 50:      # ← І це теж заміни
    print("Задовільно 📚")
else:
    print("Незадовільно ❌")
`,
    hints: [
      'Заміни слово <code>if</code> на <code>elif</code> у рядках 5 та 7. Рядки 3 і 9 не чіпай.',
      'Перевір: при введенні 95 має вивестися тільки <code>Відмінно! 🌟</code>. При 75 — тільки <code>Добре! 👍</code>.',
      'Достатньо змінити два слова: <code>if score >= 70:</code> → <code>elif score >= 70:</code> та <code>if score >= 50:</code> → <code>elif score >= 50:</code>.'
    ],
    validate: (output, code, terminalLogs) => {
      const elifCount = (code.match(/\belif\b/g) || []).length;
      if (elifCount < 2) return false;
      const inputs = terminalLogs.filter(l => l.type === 'input');
      if (!inputs.length) return false;
      const score = parseInt(inputs[inputs.length - 1].value);
      if (isNaN(score)) return false;
      const out = output.trim().toLowerCase();
      const gradeWords = ['відмінно', 'добре', 'задовільно', 'незадовільно'];
      const gradeCount = gradeWords.filter(w => out.includes(w)).length;
      if (gradeCount !== 1) return false;
      if (score >= 90) return out.includes('відмінно');
      if (score >= 70) return out.includes('добре');
      if (score >= 50) return out.includes('задовільно');
      return out.includes('незадовільно');
    }
  },
  {
    id: 2,
    title: 'Урок 2: "Чотири умови"',
    subtitle: 'elif для кількох гілок — температурний класифікатор',
    theory: `
      <h3>elif — скільки завгодно умов 🌡️</h3>
      <p>Між <code>if</code> та <code>else</code> можна додавати скільки завгодно блоків <code>elif</code>. Python перевіряє їх по черзі й виконує лише перший правдивий.</p>
      <div class="theory-card">
        <h4>Шаблон:</h4>
        <pre><code>if умова1:
    ...
elif умова2:
    ...
elif умова3:
    ...
else:
    ...  # якщо жодна умова не спрацювала</code></pre>
      </div>
      <div class="instruction-box">
        <h4>📝 Твоє завдання:</h4>
        <p>Допиши програму-термометр з чотирма умовами. Вивід залежить від температури:</p>
        <ul>
          <li>Більше 25 → <code>Спекотно, одягай футболку! ☀️</code></li>
          <li>Більше 10 → <code>Тепло, вистачить худі. 🌤️</code></li>
          <li>0 або більше → <code>Прохолодно, одягай куртку. 🍂</code></li>
          <li>Нижче 0 → <code>Мороз! Шапка та куртка! ❄️</code></li>
        </ul>
      </div>
    `,
    initialCode: `temp = int(input("Скільки градусів? "))

if temp > 25:
    print("Спекотно, одягай футболку! ☀️")
# Додай elif для > 10
# Додай elif для >= 0
# Додай else для морозу
`,
    hints: [
      'Після першого блоку if додай: <code>elif temp > 10:</code> → <code>print("Тепло, вистачить худі. 🌤️")</code>.',
      'Потім: <code>elif temp >= 0:</code> → <code>print("Прохолодно, одягай куртку. 🍂")</code>.',
      'І наостанок: <code>else:</code> → <code>print("Мороз! Шапка та куртка! ❄️")</code>.'
    ],
    validate: (output, code, terminalLogs) => {
      // Перевіряємо наявність elif та else
      const elifCount = (code.match(/\belif\b/g) || []).length;
      if (elifCount < 2) return false;
      if (!/\belse\b/.test(code)) return false;
      // Перевіряємо введення
      const inputs = terminalLogs.filter(l => l.type === 'input');
      if (!inputs.length) return false;
      const temp = parseInt(inputs[inputs.length - 1].value);
      if (isNaN(temp)) return false;
      const out = output.trim().toLowerCase();
      if (temp > 25) return out.includes('спекотно') || out.includes('футболку');
      if (temp > 10) return out.includes('тепло') || out.includes('худі');
      if (temp >= 0) return out.includes('прохолодно') || out.includes('куртку');
      return out.includes('мороз') || out.includes('шапка') || out.includes('шапку');
    }
  },
  {
    id: 3,
    title: 'Урок 3: "Оператор and"',
    subtitle: 'Логічне І — обидві умови мають бути правдивими',
    theory: `
      <h3>Оператор <code>and</code> 🔗</h3>
      <p><code>and</code> повертає <code>True</code> лише тоді, коли <strong>обидві</strong> умови правдиві одночасно. Достатньо однієї хибної — весь вираз хибний.</p>
      <div class="theory-card">
        <h4>Приклад — перевірка діапазону:</h4>
        <pre><code>x = int(input("Число: "))
if x >= 1 and x <= 100:
    print("У діапазоні [1, 100] ✅")
else:
    print("За межами ❌")</code></pre>
      </div>
      <p>Замість <code>x >= 1 and x &lt;= 100</code> Python дозволяє скорочено: <code>1 &lt;= x &lt;= 100</code> — це те саме!</p>
      <div class="instruction-box">
        <h4>📝 Твоє завдання:</h4>
        <p>Зчитай число <code>x</code>. Якщо воно між 1 та 100 включно — виведи <code>В нормі ✅</code>. Інакше — <code>Виходить за межі ❌</code>. Використай <code>and</code>.</p>
      </div>
    `,
    initialCode: `x = int(input("Введи число: "))

# Перевір: 1 <= x <= 100
# Використай: if x >= 1 and x <= 100:

`,
    hints: [
      'Умова з and: <code>if x >= 1 and x <= 100:</code>. Або скорочено: <code>if 1 <= x <= 100:</code>.',
      'В гілці if виведи <code>print("В нормі ✅")</code>, в else — <code>print("Виходить за межі ❌")</code>.',
      'Повний розв\'язок:<br><code>if x >= 1 and x <= 100:</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;print("В нормі ✅")</code><br><code>else:</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;print("Виходить за межі ❌")</code>'
    ],
    validate: (output, code, terminalLogs) => {
      if (!/\band\b/.test(code) && !/1\s*<=\s*x\s*<=\s*100/.test(code)) return false;
      const inputs = terminalLogs.filter(l => l.type === 'input');
      if (!inputs.length) return false;
      const x = parseInt(inputs[inputs.length - 1].value);
      if (isNaN(x)) return false;
      const out = output.trim().toLowerCase();
      if (x >= 1 && x <= 100) return out.includes('норм') || out.includes('✅');
      return out.includes('меж') || out.includes('❌');
    }
  },
  {
    id: 4,
    title: 'Урок 4: "Оператор or"',
    subtitle: 'Логічне АБО — достатньо однієї правдивої умови',
    theory: `
      <h3>Оператор <code>or</code> ⚡</h3>
      <p><code>or</code> повертає <code>True</code>, якщо <strong>хоча б одна</strong> умова правдива. Обидві хибні — тільки тоді результат хибний.</p>
      <div class="theory-card">
        <h4>Таблиця істинності:</h4>
        <pre><code>True  or True   → True
True  or False  → True
False or True   → True
False or False  → False  ← тільки тут False</code></pre>
      </div>
      <div class="theory-card">
        <h4>Приклад:</h4>
        <pre><code>score = int(input())
if score < 10 or score > 90:
    print("Крайній результат!")
else:
    print("Звичайний результат")</code></pre>
      </div>
      <div class="instruction-box">
        <h4>📝 Твоє завдання:</h4>
        <p>Зчитай число <code>score</code> (0–100). Якщо воно менше 10 <strong>або</strong> більше 90 — виведи <code>Крайній результат! ⚡</code>. Інакше — <code>Звичайний результат 👍</code>. Використай <code>or</code>.</p>
      </div>
    `,
    initialCode: `score = int(input("Введи результат (0-100): "))

# Перевір: score < 10 або score > 90
# Використай: if score < 10 or score > 90:

`,
    hints: [
      'Умова: <code>if score &lt; 10 or score &gt; 90:</code>',
      'В гілці if: <code>print("Крайній результат! ⚡")</code>, в else: <code>print("Звичайний результат 👍")</code>.',
      'Повний розв\'язок:<br><code>if score &lt; 10 or score &gt; 90:</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;print("Крайній результат! ⚡")</code><br><code>else:</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;print("Звичайний результат 👍")</code>'
    ],
    validate: (output, code, terminalLogs) => {
      if (!/\bor\b/.test(code)) return false;
      const inputs = terminalLogs.filter(l => l.type === 'input');
      if (!inputs.length) return false;
      const score = parseInt(inputs[inputs.length - 1].value);
      if (isNaN(score)) return false;
      const out = output.trim().toLowerCase();
      if (score < 10 || score > 90) return out.includes('крайній') || out.includes('⚡');
      return out.includes('звичайний') || out.includes('👍');
    }
  },
  {
    id: 5,
    title: 'Урок 5: "Шкала оцінок"',
    subtitle: 'elif на практиці — конвертер балів у словесну оцінку',
    theory: `
      <h3>Конвертер балів 🎓</h3>
      <p>Реальний приклад використання <code>elif</code> — перетворення числового балу на текстовий рівень. Система перевіряє умови зверху вниз і зупиняється на першій правдивій.</p>
      <div class="theory-card">
        <h4>Приклад шкали:</h4>
        <pre><code>if score >= 90:
    print("Відмінно 🌟")  # 90–100
elif score >= 75:
    print("Добре 👍")      # 75–89
elif score >= 60:
    print("Задовільно 📚") # 60–74
else:
    print("Незадовільно ❌") # 0–59</code></pre>
      </div>
      <div class="instruction-box">
        <h4>📝 Твоє завдання:</h4>
        <p>Напиши конвертер балів з 5 рівнями:</p>
        <ul>
          <li>90–100 → <code>Відмінно 🌟</code></li>
          <li>75–89 → <code>Добре 👍</code></li>
          <li>60–74 → <code>Задовільно 📚</code></li>
          <li>50–59 → <code>Слабко 😕</code></li>
          <li>0–49 → <code>Незадовільно ❌</code></li>
        </ul>
      </div>
    `,
    initialCode: `score = int(input("Введи бал (0-100): "))

# Напиши if/elif/else з 5 рівнями оцінок

`,
    hints: [
      'Починай з найвищого балу: <code>if score >= 90:</code>. Потім <code>elif score >= 75:</code>. Python зупиниться на першій правдивій умові.',
      'Потрібно 4 гілки elif/else: >= 90, >= 75, >= 60, >= 50, і else для решти.',
      'Структура:<br><code>if score >= 90: print("Відмінно 🌟")</code><br><code>elif score >= 75: print("Добре 👍")</code><br><code>elif score >= 60: print("Задовільно 📚")</code><br><code>elif score >= 50: print("Слабко 😕")</code><br><code>else: print("Незадовільно ❌")</code>'
    ],
    validate: (output, code, terminalLogs) => {
      const elifCount = (code.match(/\belif\b/g) || []).length;
      if (elifCount < 3) return false;
      const inputs = terminalLogs.filter(l => l.type === 'input');
      if (!inputs.length) return false;
      const score = parseInt(inputs[inputs.length - 1].value);
      if (isNaN(score)) return false;
      const out = output.trim().toLowerCase();
      if (score >= 90) return out.includes('відмінно') || out.includes('🌟');
      if (score >= 75) return out.includes('добре') || out.includes('👍');
      if (score >= 60) return out.includes('задовільно') || out.includes('📚');
      if (score >= 50) return out.includes('слабко') || out.includes('😕');
      return out.includes('незадовільно') || out.includes('❌');
    }
  },
  {
    id: 6,
    title: 'Урок 6: "Вікові категорії"',
    subtitle: 'elif + and — перевірка діапазонів',
    theory: `
      <h3>elif разом з and 🎂</h3>
      <p>Коли кожна категорія — це <strong>діапазон</strong> (наприклад, 13–17 років), зручно поєднувати <code>elif</code> і <code>and</code>.</p>
      <div class="theory-card">
        <h4>Приклад:</h4>
        <pre><code>if age >= 0 and age < 13:
    print("Дитина 🧒")
elif age >= 13 and age < 18:
    print("Підліток 🧑")</code></pre>
      </div>
      <p>Або ще коротше: <code>elif 13 &lt;= age &lt; 18:</code> — Python підтримує такий ланцюговий запис.</p>
      <div class="instruction-box">
        <h4>📝 Твоє завдання:</h4>
        <p>Зчитай вік та виведи категорію:</p>
        <ul>
          <li>Менше 0 → <code>Некоректний вік ❓</code></li>
          <li>0–12 → <code>Дитина 🧒</code></li>
          <li>13–17 → <code>Підліток 🧑</code></li>
          <li>18–64 → <code>Дорослий 👨</code></li>
          <li>65+ → <code>Пенсіонер 👴</code></li>
        </ul>
      </div>
    `,
    initialCode: `age = int(input("Введи вік: "))

# Напиши if/elif/else з 5 вікових категорій
# Використай and або ланцюгові порівняння (0 <= age < 13)

`,
    hints: [
      'Першою умовою перевір від\'ємний вік: <code>if age < 0: print("Некоректний вік ❓")</code>.',
      'Для діапазонів використовуй <code>and</code>: <code>elif age >= 0 and age < 13:</code> або скорочено <code>elif 0 <= age < 13:</code>.',
      'Категорії: <code>< 0</code>, <code>0–12</code>, <code>13–17</code>, <code>18–64</code>, <code>>= 65</code>. Всього 5 гілок (if + 3×elif + else).'
    ],
    validate: (output, code, terminalLogs) => {
      const elifCount = (code.match(/\belif\b/g) || []).length;
      if (elifCount < 2) return false;
      const inputs = terminalLogs.filter(l => l.type === 'input');
      if (!inputs.length) return false;
      const age = parseInt(inputs[inputs.length - 1].value);
      if (isNaN(age)) return false;
      const out = output.trim().toLowerCase();
      if (age < 0) return out.includes('некоректн') || out.includes('❓');
      if (age < 13) return out.includes('дитина') || out.includes('🧒');
      if (age < 18) return out.includes('підліток') || out.includes('🧑');
      if (age < 65) return out.includes('дорослий') || out.includes('👨');
      return out.includes('пенсіонер') || out.includes('👴');
    }
  },
  {
    id: 7,
    title: 'Урок 7: "Фінальний виклик #1"',
    subtitle: 'Класифікатор швидкості — elif + and разом',
    theory: `
      <h3>Фінальні виклики 🏆</h3>
      <p>Час поєднати все разом: <code>elif</code> для кількох категорій та <code>and</code>/<code>or</code> для складних умов.</p>
      <div class="instruction-box">
        <h4>📝 Твоє завдання:</h4>
        <p>Напиши класифікатор швидкості автомобіля (км/год):</p>
        <ul>
          <li>Більше 130 → <code>Небезпечно! Штраф 🚨</code></li>
          <li>91–130 → <code>Перевищення ⚠️</code></li>
          <li>61–90 → <code>Дозволено ✅</code></li>
          <li>0–60 → <code>Зона обмеження 🐢</code></li>
          <li>Менше 0 → <code>Некоректне значення ❓</code></li>
        </ul>
        <p>Використай <code>elif</code> та при потребі <code>and</code>.</p>
      </div>
    `,
    initialCode: `speed = int(input("Введи швидкість (км/год): "))

# Напиши 5-рівневий класифікатор швидкості

`,
    hints: [
      'Перевіряй умови від найбільшого до найменшого: спочатку <code>if speed < 0:</code>, потім <code>elif speed > 130:</code> і т.д.',
      'Діапазони для elif: <code>elif speed > 130</code>, <code>elif speed > 90</code>, <code>elif speed > 60</code>, <code>else</code>.',
      'Повний розв\'язок:<br><code>if speed &lt; 0: print("Некоректне ❓")</code><br><code>elif speed &gt; 130: print("Небезпечно! 🚨")</code><br><code>elif speed &gt; 90: print("Перевищення ⚠️")</code><br><code>elif speed &gt; 60: print("Дозволено ✅")</code><br><code>else: print("Зона обмеження 🐢")</code>'
    ],
    validate: (output, code, terminalLogs) => {
      const elifCount = (code.match(/\belif\b/g) || []).length;
      if (elifCount < 2) return false;
      const inputs = terminalLogs.filter(l => l.type === 'input');
      if (!inputs.length) return false;
      const speed = parseInt(inputs[inputs.length - 1].value);
      if (isNaN(speed)) return false;
      const out = output.trim().toLowerCase();
      if (speed < 0) return out.includes('некоректн') || out.includes('❓');
      if (speed > 130) return out.includes('небезпечно') || out.includes('🚨') || out.includes('штраф');
      if (speed > 90) return out.includes('перевищення') || out.includes('⚠️');
      if (speed > 60) return out.includes('дозволено') || out.includes('✅');
      return out.includes('обмеження') || out.includes('🐢');
    }
  },
  {
    id: 8,
    title: 'Урок 8: "Фінальний виклик #2"',
    subtitle: 'Допуск до іспиту — and з двома умовами',
    theory: `
      <h3>Два критерії одночасно 📋</h3>
      <p>Часто рішення залежить від <strong>двох незалежних умов</strong>. Наприклад: студент допущений до іспиту, тільки якщо <em>і</em> бали достатні, <em>і</em> відвідуваність нормальна.</p>
      <div class="theory-card">
        <h4>Шаблон:</h4>
        <pre><code>score = int(input("Бал: "))
attend = int(input("Відвідуваність %: "))

if score >= 60 and attend >= 75:
    print("Допущений ✅")
else:
    print("Не допущений ❌")</code></pre>
      </div>
      <div class="instruction-box">
        <h4>📝 Твоє завдання:</h4>
        <p>Зчитай <strong>два числа</strong>: бал (0–100) та відвідуваність (0–100%). Студент допущений якщо <strong>бал ≥ 60 І відвідуваність ≥ 75</strong>. Виведи відповідний результат.</p>
      </div>
    `,
    initialCode: `score = int(input("Введи бал (0-100): "))
attend = int(input("Введи відвідуваність (0-100)%: "))

# Перевір: score >= 60 AND attend >= 75

`,
    hints: [
      'Одна умова з and: <code>if score >= 60 and attend >= 75:</code>',
      'В гілці if: <code>print("Допущений до іспиту ✅")</code>, в else: <code>print("Не допущений ❌")</code>.',
      'Повний код:<br><code>if score >= 60 and attend >= 75:</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;print("Допущений до іспиту ✅")</code><br><code>else:</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;print("Не допущений ❌")</code>'
    ],
    validate: (output, code, terminalLogs) => {
      if (!/\band\b/.test(code)) return false;
      const inputs = terminalLogs.filter(l => l.type === 'input');
      if (inputs.length < 2) return false;
      const score = parseInt(inputs[0].value);
      const attend = parseInt(inputs[1].value);
      if (isNaN(score) || isNaN(attend)) return false;
      const out = output.trim().toLowerCase();
      if (score >= 60 && attend >= 75) return out.includes('допущений') && !out.includes('не допущений');
      return out.includes('не допущений') || (out.includes('❌') && !out.includes('✅'));
    }
  },
  {
    id: 9,
    title: 'Домашнє завдання: Погодна станція',
    subtitle: 'Повна програма з elif, and та or',
    theory: `
      <h3>Домашнє завдання: Погодна станція 🌦️</h3>
      <p>Об'єднай всі знання цього модуля: <code>elif</code> для кількох умов, <code>and</code> для перевірки діапазонів, <code>or</code> за потреби.</p>
      <div class="instruction-box">
        <h4>📝 Твоє завдання:</h4>
        <p>Зчитай температуру. Виведи пораду залежно від значення:</p>
        <ul>
          <li>≥ 30 → <code>Спека! Пий більше води ☀️</code></li>
          <li>≥ 20 і &lt; 30 → <code>Тепло, чудова погода! 🌤️</code></li>
          <li>≥ 10 і &lt; 20 → <code>Прохолодно, одягай куртку 🍂</code></li>
          <li>≥ 0 і &lt; 10 → <code>Холодно ❄️</code></li>
          <li>&lt; 0 → <code>Мороз! Шапка обов'язкова! 🌨️</code></li>
        </ul>
        <p>Для середніх діапазонів використай <code>and</code> або ланцюгові порівняння.</p>
      </div>
    `,
    initialCode: `temp = int(input("Введи температуру: "))

# 5 умов: >= 30, >= 20, >= 10, >= 0, < 0
# Використай elif та and для діапазонів

`,
    hints: [
      'Починай від найвищої: <code>if temp >= 30:</code>. Потім <code>elif temp >= 20 and temp < 30:</code> або просто <code>elif temp >= 20:</code> (Python вже знає, що temp < 30, бо попередня умова не спрацювала).',
      'Всього 5 гілок: if + 3×elif + else. Остання гілка else покриє температуру нижче 0.',
      'Перевір усі 5 випадків: введи 35, потім 25, 15, 5 та -5. Кожен повинен давати своє повідомлення.',
      'Скорочена структура:<br><code>if temp >= 30: ...</code><br><code>elif temp >= 20: ...</code><br><code>elif temp >= 10: ...</code><br><code>elif temp >= 0: ...</code><br><code>else: ...</code>'
    ],
    validate: (output, code, terminalLogs) => {
      const elifCount = (code.match(/\belif\b/g) || []).length;
      if (elifCount < 3) return false;
      const inputs = terminalLogs.filter(l => l.type === 'input');
      if (!inputs.length) return false;
      const temp = parseInt(inputs[inputs.length - 1].value);
      if (isNaN(temp)) return false;
      const out = output.trim().toLowerCase();
      if (temp >= 30) return out.includes('спека') || out.includes('☀️') || out.includes('воду') || out.includes('води');
      if (temp >= 20) return out.includes('тепло') || out.includes('🌤️') || out.includes('чудов');
      if (temp >= 10) return out.includes('прохолодно') || out.includes('куртку') || out.includes('🍂');
      if (temp >= 0) return out.includes('холодно') || out.includes('❄️');
      return out.includes('мороз') || out.includes('шапка') || out.includes('🌨️');
    }
  }
];

// HANDBOOK DATA — 5 вкладок, повний довідник
const handbookData = {
  variables: `
    <div class="handbook-section">
      <h3>📦 Змінні та Типи Даних</h3>
      <p><strong>Змінна</strong> — іменована комірка пам'яті. Оператор <code>=</code> записує значення.</p>
      <div class="concept-card">
        <h4>🔮 Типи даних:</h4>
        <ul>
          <li><strong>str</strong> — рядок: <code>name = "Олег"</code></li>
          <li><strong>int</strong> — ціле число: <code>age = 18</code></li>
          <li><strong>float</strong> — дробове: <code>price = 9.99</code></li>
          <li><strong>bool</strong> — логічне: <code>ok = True</code></li>
          <li><strong>list</strong> — список: <code>nums = [1, 2, 3]</code></li>
        </ul>
      </div>
      <div class="concept-card">
        <h4>🔄 Перетворення типів:</h4>
        <pre><code class="language-python">int("42")    # → 42
float("3.14") # → 3.14
str(100)     # → "100"
len("hello") # → 5</code></pre>
      </div>
      <div class="concept-card">
        <h4>📥 Введення даних:</h4>
        <pre><code class="language-python">name = input("Ім'я: ")          # рядок
age  = int(input("Вік: "))     # ціле число
x    = float(input("X: "))    # дробове</code></pre>
      </div>
    </div>
  `,
  math: `
    <div class="handbook-section">
      <h3>🧮 Математичні Оператори</h3>
      <div class="concept-card">
        <div class="op-grid">
          <div class="op-row-header">Оператор</div><div class="op-row-header">Приклад</div>
          <div class="op-row"><span class="op-symbol">+</span> Додавання</div><div class="op-row"><code>5 + 3 → 8</code></div>
          <div class="op-row"><span class="op-symbol">-</span> Віднімання</div><div class="op-row"><code>10 - 4 → 6</code></div>
          <div class="op-row"><span class="op-symbol">*</span> Множення</div><div class="op-row"><code>3 * 4 → 12</code></div>
          <div class="op-row"><span class="op-symbol">/</span> Ділення</div><div class="op-row"><code>7 / 2 → 3.5</code></div>
          <div class="op-row"><span class="op-symbol">//</span> Ціле ділення</div><div class="op-row"><code>7 // 2 → 3</code></div>
          <div class="op-row"><span class="op-symbol">%</span> Остача</div><div class="op-row"><code>7 % 2 → 1</code></div>
          <div class="op-row"><span class="op-symbol">**</span> Степінь</div><div class="op-row"><code>2 ** 3 → 8</code></div>
        </div>
      </div>
      <div class="concept-card">
        <h4>🔑 Трюки з цифрами:</h4>
        <pre><code class="language-python">n = 456
n % 10   # → 6  (остання цифра)
n // 10  # → 45 (відрізати останню)
n % 100  # → 56 (останні дві цифри)</code></pre>
      </div>
      <div class="concept-card">
        <h4>🛡️ Корисні функції:</h4>
        <ul>
          <li><code>abs(-5)</code> → <code>5</code> — модуль числа</li>
          <li><code>len("hello")</code> → <code>5</code> — довжина</li>
          <li><code>len(str(n))</code> — кількість цифр числа</li>
        </ul>
      </div>
    </div>
  `,
  logic: `
    <div class="handbook-section">
      <h3>🛡️ Умови: if / elif / else</h3>
      <div class="concept-card">
        <h4>🔍 Оператори порівняння:</h4>
        <div class="op-grid">
          <div class="op-row"><span class="op-symbol">==</span> Рівно</div><div class="op-row"><code>5 == 5 → True</code></div>
          <div class="op-row"><span class="op-symbol">!=</span> Не рівно</div><div class="op-row"><code>5 != 3 → True</code></div>
          <div class="op-row"><span class="op-symbol">&gt;</span> Більше</div><div class="op-row"><code>10 &gt; 5 → True</code></div>
          <div class="op-row"><span class="op-symbol">&lt;</span> Менше</div><div class="op-row"><code>3 &lt; 2 → False</code></div>
          <div class="op-row"><span class="op-symbol">&gt;=</span> Більше або рівно</div><div class="op-row"><code>5 &gt;= 5 → True</code></div>
          <div class="op-row"><span class="op-symbol">&lt;=</span> Менше або рівно</div><div class="op-row"><code>4 &lt;= 2 → False</code></div>
        </div>
      </div>
      <div class="concept-card">
        <h4>⛓️ Логічні оператори:</h4>
        <pre><code class="language-python">and  # обидві умови правдиві
or   # хоча б одна правдива
not  # заперечення

# Приклади:
x >= 1 and x <= 100  # діапазон
x < 0 or x > 100    # за межами
not (x == 0)         # не нуль</code></pre>
      </div>
      <div class="concept-card">
        <h4>🛠️ if / elif / else:</h4>
        <pre><code class="language-python">score = 80
if score >= 90:
    print("Відмінно!")   # 90–100
elif score >= 70:
    print("Добре!")      # 70–89
elif score >= 50:
    print("Задовільно!") # 50–69
else:
    print("Незадовільно!")  # < 50</code></pre>
        <p>⚠️ Двокрапка <code>:</code> після умови та <strong>4 пробіли</strong> відступу обов'язкові!</p>
      </div>
    </div>
  `,
  loops: `
    <div class="handbook-section">
      <h3>🔄 Цикли та Списки</h3>
      <div class="concept-card">
        <h4>⏳ Цикл while — «поки»:</h4>
        <pre><code class="language-python">i = 1
while i <= 5:   # поки умова правдива
    print(i)
    i += 1      # ОБОВ'ЯЗКОВО змінюй змінну!</code></pre>
        <p>⚠️ Без <code>i += 1</code> — нескінченний цикл!</p>
      </div>
      <div class="concept-card">
        <h4>🔁 Цикл for + range():</h4>
        <pre><code class="language-python">range(5)         # 0,1,2,3,4
range(1, 6)      # 1,2,3,4,5
range(5, 0, -1)  # 5,4,3,2,1 (зворотній)

for i in range(3):
    print(i)  # 0 1 2</code></pre>
      </div>
      <div class="concept-card">
        <h4>📋 Списки та for:</h4>
        <pre><code class="language-python">games = ["Minecraft", "Roblox", "GTA"]
for game in games:
    print(game)

# З нумерацією:
for i, game in enumerate(games, 1):
    print(i, game)  # 1 Minecraft ...</code></pre>
      </div>
      <div class="concept-card">
        <h4>🛑 break — вийти з циклу:</h4>
        <pre><code class="language-python">while True:
    x = int(input())
    if x == 0:
        break   # вийти при введенні 0
print("Кінець")</code></pre>
      </div>
    </div>
  `,
  functions: `
    <div class="handbook-section">
      <h3>🔢 Функції та Числові Трюки</h3>
      <div class="concept-card">
        <h4>📐 Математичні функції:</h4>
        <pre><code class="language-python">abs(-7)    # → 7  (модуль)
2 ** 10    # → 1024 (степінь)
2 ** 0.5   # → 1.414... (корінь)</code></pre>
      </div>
      <div class="concept-card">
        <h4>🔑 Роботи з цифрами числа:</h4>
        <pre><code class="language-python">n = 456
# Остання цифра:
last = n % 10        # → 6
# Відрізати останню:
rest = n // 10       # → 45
# Перша цифра (через рядок):
first = int(str(n)[0])  # → 4
# Кількість цифр:
digits = len(str(n))    # → 3</code></pre>
      </div>
      <div class="concept-card">
        <h4>📊 Перевірка подільності:</h4>
        <pre><code class="language-python">n % 2 == 0  # парне
n % 3 == 0  # кратне 3
n % 10 == 5 # закінчується на 5

# Кратне 3 АБО 5:
if n % 3 == 0 or n % 5 == 0:
    print("Кратне!")</code></pre>
      </div>
      <div class="concept-card">
        <h4>🧩 f-рядки для виводу:</h4>
        <pre><code class="language-python">name = "Макс"
age = 18
print(f"Мене звати {name}, мені {age} років")</code></pre>
      </div>
    </div>
  `
};

// STATE MANAGEMENT
let currentLessonIndex = 0;
let completedLessons = [false, false, false, false, false, false, false, false, false];
let codeEditor = null;
let currentRunTerminalLogs = [];
let accumulatedOutput = "";
let currentLineElement = null;
let currentHintIndex = 0;

const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let animationFrameId = null;

function resizeCanvas() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
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
  update() { this.x += this.speedX; this.y += this.speedY; this.rotation += this.rotationSpeed; }
  draw() {
    ctx.save(); ctx.translate(this.x, this.y); ctx.rotate(this.rotation * Math.PI / 180);
    ctx.fillStyle = this.color; ctx.fillRect(-this.size/2, -this.size/2, this.size, this.size);
    ctx.restore();
  }
}
function startConfetti() {
  if (animationFrameId) cancelAnimationFrame(animationFrameId);
  particles = [];
  for (let i = 0; i < 150; i++) particles.push(new ConfettiParticle());
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let active = false;
    particles.forEach(p => { p.update(); p.draw(); if (p.y < canvas.height) active = true; });
    if (active) animationFrameId = requestAnimationFrame(animate);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  animate();
}

const themeColors = {
  indigo:  { accent:'#4f46e5', accentGlow:'rgba(79,70,229,0.16)',  accentBorder:'rgba(79,70,229,0.32)',  accentSoft:'rgba(79,70,229,0.07)',  accentText:'#4338ca' },
  emerald: { accent:'#059669', accentGlow:'rgba(5,150,105,0.18)',  accentBorder:'rgba(5,150,105,0.32)',  accentSoft:'rgba(5,150,105,0.07)',  accentText:'#047857' },
  rose:    { accent:'#e11d48', accentGlow:'rgba(225,29,72,0.18)',  accentBorder:'rgba(225,29,72,0.32)',  accentSoft:'rgba(225,29,72,0.07)',  accentText:'#be123c' },
  amber:   { accent:'#d97706', accentGlow:'rgba(217,119,6,0.18)',  accentBorder:'rgba(217,119,6,0.32)',  accentSoft:'rgba(217,119,6,0.07)',  accentText:'#b45309' },
  cyan:    { accent:'#0891b2', accentGlow:'rgba(8,145,178,0.18)',  accentBorder:'rgba(8,145,178,0.32)', accentSoft:'rgba(8,145,178,0.07)', accentText:'#0e7490' }
};
function setThemeAccent(colorName) {
  const t = themeColors[colorName]; if (!t) return;
  const r = document.documentElement;
  r.style.setProperty('--accent', t.accent); r.style.setProperty('--accent-glow', t.accentGlow);
  r.style.setProperty('--accent-border', t.accentBorder); r.style.setProperty('--accent-soft', t.accentSoft);
  r.style.setProperty('--accent-text', t.accentText);
  document.querySelectorAll('.accent-dot').forEach(d => d.classList.toggle('active', d.getAttribute('data-color') === colorName));
  localStorage.setItem('pycode_theme_color', colorName);
}

function printToTerminal(text, type = 'output') {
  const body = document.getElementById('terminal-body');
  const parts = text.split('\n');
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (part === '' && i === parts.length - 1) { currentLineElement = null; break; }
    if (!currentLineElement) {
      currentLineElement = document.createElement('div');
      currentLineElement.className = `terminal-line ${type}`;
      body.appendChild(currentLineElement);
    }
    currentLineElement.textContent += part;
    if (i < parts.length - 1) currentLineElement = null;
  }
  body.scrollTop = body.scrollHeight;
}

function promptTerminal(promptText) {
  const body = document.getElementById('terminal-body');
  return new Promise(resolve => {
    const container = document.createElement('div');
    container.className = 'terminal-input-container';
    if (promptText) {
      const ps = document.createElement('span');
      ps.className = 'terminal-prompt-text'; ps.textContent = promptText;
      container.appendChild(ps);
    }
    const inp = document.createElement('input');
    inp.type = 'text'; inp.className = 'terminal-input-active';
    inp.setAttribute('autocomplete', 'off'); inp.setAttribute('spellcheck', 'false');
    container.appendChild(inp); body.appendChild(container);
    body.scrollTop = body.scrollHeight;
    setTimeout(() => inp.focus(), 10);
    inp.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const value = inp.value;
        inp.disabled = true; inp.className = 'terminal-input-submitted';
        inp.style.color = '#e2e8f0'; inp.style.fontWeight = 'normal';
        currentRunTerminalLogs.push({ type: 'input', value });
        accumulatedOutput += value + '\n';
        currentLineElement = null;
        resolve(value);
      }
    });
    inp.addEventListener('paste', e => {
      const text = (e.clipboardData || window.clipboardData).getData('text');
      if (text.includes('\n') || text.includes('\r')) {
        e.preventDefault(); inp.value = text.split(/\r?\n/)[0];
        inp.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
      }
    });
  });
}

function builtinRead(x) {
  if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
    throw "File not found: '" + x + "'";
  return Sk.builtinFiles["files"][x];
}

function renderHint(index) {
  const hints = lessons[currentLessonIndex].hints;
  const total = hints.length;
  const counter = document.getElementById('hint-counter');
  if (total > 1) { counter.textContent = `${index+1} / ${total}`; counter.style.display = 'inline-block'; }
  else counter.style.display = 'none';
  document.getElementById('hint-modal-body').innerHTML = `<div class="hint-text-box">${hints[index]}</div>`;
  document.getElementById('prev-hint-btn').style.display = index > 0 ? 'inline-flex' : 'none';
  const isLast = index === total - 1;
  document.getElementById('next-hint-btn').style.display = isLast ? 'none' : 'inline-flex';
  document.getElementById('close-hint-footer-btn').style.display = isLast ? 'inline-flex' : 'none';
}

function initApp() {
  codeEditor = CodeMirror.fromTextArea(document.getElementById('code-textarea'), {
    mode: { name: "python", version: 3 }, theme: "eclipse", lineNumbers: true,
    indentUnit: 4, tabSize: 4, lineWrapping: true,
    extraKeys: { "Tab": cm => cm.replaceSelection(Array(cm.getOption("indentUnit")+1).join(" ")) }
  });
  codeEditor.on('change', () => localStorage.setItem(`pycode2_draft_${currentLessonIndex}`, codeEditor.getValue()));

  document.querySelectorAll('.accent-dot').forEach(d => d.addEventListener('click', e => setThemeAccent(e.target.getAttribute('data-color'))));
  setThemeAccent(localStorage.getItem('pycode_theme_color') || 'indigo');

  loadProgress(); loadLesson(currentLessonIndex); renderProgressPills();

  const hintModal = document.getElementById('hint-modal');
  const openHint = () => { currentHintIndex = 0; renderHint(0); hintModal.classList.add('open'); };
  const closeHint = () => hintModal.classList.remove('open');
  document.getElementById('prev-hint-btn').addEventListener('click', () => { if (currentHintIndex > 0) { currentHintIndex--; renderHint(currentHintIndex); } });
  document.getElementById('next-hint-btn').addEventListener('click', () => { if (currentHintIndex < lessons[currentLessonIndex].hints.length - 1) { currentHintIndex++; renderHint(currentHintIndex); } });
  document.getElementById('show-hint-btn').addEventListener('click', openHint);
  document.getElementById('close-hint-btn').addEventListener('click', closeHint);
  document.getElementById('close-hint-footer-btn').addEventListener('click', closeHint);
  hintModal.addEventListener('click', e => { if (e.target === hintModal) closeHint(); });

  const hbDrawer = document.getElementById('handbook-drawer');
  document.getElementById('handbook-btn').addEventListener('click', () => { hbDrawer.classList.add('open'); loadHandbookTab('variables'); });
  document.getElementById('close-handbook-btn').addEventListener('click', () => hbDrawer.classList.remove('open'));
  hbDrawer.addEventListener('click', e => { if (e.target === hbDrawer) hbDrawer.classList.remove('open'); });
  document.querySelectorAll('.drawer-tabs .tab-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      document.querySelectorAll('.drawer-tabs .tab-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      loadHandbookTab(e.target.getAttribute('data-tab'));
    });
  });

  document.getElementById('run-btn').addEventListener('click', runCurrentCode);
  document.getElementById('reset-btn').addEventListener('click', resetCurrentCode);
  document.getElementById('next-btn').addEventListener('click', loadNextLesson);
  document.getElementById('clear-terminal-btn').addEventListener('click', clearTerminal);

  const tb = document.getElementById('terminal-body');
  if (tb) {
    tb.addEventListener('click', e => {
      const ai = document.querySelector('.terminal-input-active');
      if (!ai || e.target === ai || ai.contains(e.target)) return;
      if (window.getSelection()?.toString().trim()) return;
      ai.focus(); ai.setSelectionRange(ai.value.length, ai.value.length);
    });
  }
  document.addEventListener('keydown', e => {
    const ai = document.querySelector('.terminal-input-active');
    if (!ai) return;
    const t = e.target;
    if (t.tagName==='INPUT'||t.tagName==='TEXTAREA'||t.isContentEditable||t.closest('.CodeMirror')||t.closest('.modal-card')) return;
    const isMeta = e.ctrlKey || e.metaKey;
    if ((isMeta && e.key.toLowerCase()==='v')||(e.shiftKey&&e.key==='Insert')) { ai.focus(); ai.setSelectionRange(ai.value.length,ai.value.length); return; }
    if (isMeta && e.key.toLowerCase()==='a') { e.preventDefault(); ai.focus(); ai.select(); return; }
    if (!isMeta && !e.altKey && e.key.length===1) { ai.focus(); ai.setSelectionRange(ai.value.length,ai.value.length); }
  });
}

function loadHandbookTab(key) {
  const body = document.getElementById('handbook-body');
  if (handbookData[key]) { body.innerHTML = handbookData[key]; body.scrollTop = 0; }
}

function loadProgress() {
  const si = localStorage.getItem('pycode2_current_index');
  if (si !== null) currentLessonIndex = parseInt(si);
  const sc = localStorage.getItem('pycode2_completed');
  if (sc !== null) {
    completedLessons = JSON.parse(sc);
    while (completedLessons.length < lessons.length) completedLessons.push(false);
  }
}
function saveProgress() {
  localStorage.setItem('pycode2_current_index', currentLessonIndex);
  localStorage.setItem('pycode2_completed', JSON.stringify(completedLessons));
}

function loadLesson(index) {
  currentLessonIndex = index; saveProgress();
  const lesson = lessons[index];
  const lb = document.getElementById('level-badge');
  if (index < 2)      { lb.textContent = 'elif 🔀'; lb.className = 'badge badge-indigo'; }
  else if (index < 5) { lb.textContent = 'and / or ⚡'; lb.className = 'badge badge-blue'; }
  else if (index < 8) { lb.textContent = 'Виклики 🏆'; lb.className = 'badge badge-indigo'; }
  else                { lb.textContent = 'Домашнє 🏠'; lb.className = 'badge badge-indigo'; }

  document.getElementById('lesson-indicator').textContent = `Урок ${lesson.id}/${lessons.length}`;
  const tc = document.getElementById('theory-content');
  tc.classList.remove('fade-in-up'); void tc.offsetWidth; tc.classList.add('fade-in-up');
  tc.innerHTML = `<span style="font-size:0.73rem;font-weight:700;text-transform:uppercase;color:var(--accent);letter-spacing:0.8px;opacity:0.85;">${lesson.subtitle}</span>${lesson.theory}`;
  tc.scrollTop = 0;
  const draft = localStorage.getItem(`pycode2_draft_${index}`);
  codeEditor.setValue(draft !== null ? draft : lesson.initialCode);
  codeEditor.refresh(); setTimeout(() => codeEditor.focus(), 50);
  renderProgressPills(); updateNextButtonState();
}

function renderProgressPills() {
  const c = document.getElementById('progress-steps'); c.innerHTML = '';
  lessons.forEach((l, i) => {
    const p = document.createElement('div'); p.className = 'step-pill'; p.textContent = l.id;
    if (i === currentLessonIndex) p.classList.add('active');
    if (completedLessons[i]) p.classList.add('completed');
    let locked = false;
    if (i > 0 && !completedLessons[i-1] && i !== currentLessonIndex) { locked = true; p.classList.add('locked'); }
    if (!locked) p.addEventListener('click', () => loadLesson(i));
    c.appendChild(p);
  });
}
function updateNextButtonState() {
  const nb = document.getElementById('next-btn');
  if (completedLessons[currentLessonIndex] && currentLessonIndex < lessons.length-1) nb.removeAttribute('disabled');
  else nb.setAttribute('disabled', 'true');
}

function runCurrentCode() {
  const code = codeEditor.getValue();
  const runBtn = document.getElementById('run-btn'); runBtn.disabled = true;
  currentRunTerminalLogs = []; accumulatedOutput = ""; currentLineElement = null;
  const body = document.getElementById('terminal-body'); body.innerHTML = '';
  printToTerminal(">>> Запуск програми...\n", "system");
  Sk.configure({
    output: t => { accumulatedOutput += t; printToTerminal(t, 'output'); },
    read: builtinRead, inputfun: promptTerminal, inputfunTakesPrompt: true, __future__: Sk.python3
  });
  Sk.misceval.asyncToPromise(() => Sk.importMainWithBody("<stdin>", false, code, true))
    .then(() => {
      printToTerminal("\n>>> Програма завершилась успішно.\n", "system");
      runBtn.disabled = false;
      const isValid = lessons[currentLessonIndex].validate(accumulatedOutput, code, currentRunTerminalLogs);
      if (isValid) handleLessonSuccess();
      else printToTerminal("Результат невірний. Перевір завдання та спробуй ще раз! ❌\n", "error");
    })
    .catch(err => { printToTerminal("\nПомилка:\n" + err.toString() + "\n", "error"); runBtn.disabled = false; });
}

function handleLessonSuccess() {
  completedLessons[currentLessonIndex] = true; saveProgress();
  if (currentLessonIndex === lessons.length - 1) {
    printToTerminal("Вітання! Завдання виконано правильно! 🎉\n", "success");
    printToTerminal("Модуль 2 завершено! Секретний код: 2eL 🔑\n", "success");
  } else {
    printToTerminal("Вітання! Завдання виконано правильно! 🎉\n", "success");
  }
  startConfetti(); renderProgressPills(); updateNextButtonState();
}

function resetCurrentCode() {
  if (confirm("Скинути код до початкового стану?")) {
    localStorage.removeItem(`pycode2_draft_${currentLessonIndex}`);
    codeEditor.setValue(lessons[currentLessonIndex].initialCode);
    clearTerminal();
  }
}
function loadNextLesson() { if (currentLessonIndex < lessons.length-1) loadLesson(currentLessonIndex+1); }
function clearTerminal() {
  document.getElementById('terminal-body').innerHTML = '<div class="terminal-welcome">Консоль очищено. Результат вашого коду з\'явиться тут...</div>';
  currentLineElement = null;
}

window.addEventListener('DOMContentLoaded', initApp);
