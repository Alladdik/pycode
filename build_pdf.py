# -*- coding: utf-8 -*-
from PIL import Image, ImageFilter
from PIL import JpegImagePlugin
import os, glob, re
Image.init()

ROOT = r'C:\Users\alladdiks\Desktop\Картки'
A4 = (2480, 3508)   # 300 DPI
DPI = 300.0
TARGET_W = 2000     # ширина кожної картинки на сторінці (для однакового розміру)

files = glob.glob(os.path.join(ROOT, '*.png'))
def num(f):
    m = re.match(r'(\d+)', os.path.basename(f))
    return int(m.group(1)) if m else 999
files = sorted(files, key=num)

pages = []
for f in files:
    img = Image.open(f).convert('RGB')
    sc = TARGET_W / img.width
    img = img.resize((TARGET_W, round(img.height*sc)), Image.LANCZOS)
    page = Image.new('RGB', A4, (255, 255, 255))
    page.paste(img, ((A4[0]-img.width)//2, (A4[1]-img.height)//2))
    pages.append(page)
    print('page', num(f), os.path.basename(f))

pdf = os.path.join(ROOT, 'Kartky_A4_7storinok.pdf')
# перейменуємо коректно під 8
new_pdf = os.path.join(ROOT, 'Kartky_A4_8storinok.pdf')
pages[0].save(new_pdf, save_all=True, append_images=pages[1:], resolution=DPI)
if os.path.exists(pdf):
    os.remove(pdf)
print('PDF ->', new_pdf, '|', len(pages), 'стор.')
