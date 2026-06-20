# -*- coding: utf-8 -*-
import os, shutil

ROOT = r'C:\Users\alladdiks\Desktop\Картки'
KRUHLI = os.path.join(ROOT, 'PNG_kruhli')
PROZORI = os.path.join(ROOT, 'PNG_prozori')

names = {
    '1_Maty_Zemli_Hayya':        '1 Мати Землі Гайя',
    '2_Korinnya_dushi':          '2 Коріння душі',
    '3_Providnycya_Energii':     '3 Провідниця Життєвої Енергії',
    '4_Maty_Stykhiy_Reya':       '4 Мати Стихій Рея',
    '5_Maty_Zhyttya_Demetra':    '5 Мати Життя Деметра',
    '6_Povernennya_do_sebe':     '6 Повернення до себе',
    '7_Dukhovne_pererodzhennya': '7 Духовне переродження',
}

# 1) готові круглі фото -> прямо в Картки, з українськими назвами
for old, new in names.items():
    src = os.path.join(KRUHLI, old + '.png')
    dst = os.path.join(ROOT, new + '.png')
    shutil.copyfile(src, dst)
    print('фото ->', new + '.png')

# 2) бонусна папка з прозорим фоном: перейменувати файли + папку
NEW_PROZ = os.path.join(ROOT, 'Прозорий фон (бонус)')
if os.path.isdir(PROZORI):
    for old, new in names.items():
        s = os.path.join(PROZORI, old + '.png')
        d = os.path.join(PROZORI, new + '.png')
        if os.path.exists(s):
            os.replace(s, d)
    if os.path.isdir(NEW_PROZ):
        shutil.rmtree(NEW_PROZ)
    os.rename(PROZORI, NEW_PROZ)
    print('бонус -> Прозорий фон (бонус)')

# 3) прибрати стару папку PNG_kruhli (файли вже в корені)
if os.path.isdir(KRUHLI):
    shutil.rmtree(KRUHLI)
    print('прибрано PNG_kruhli')

print('\nГОТОВО')
