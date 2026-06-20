# -*- coding: utf-8 -*-
from PIL import Image, ImageDraw, ImageFilter
from PIL import JpegImagePlugin  # ensure JPEG encoder is registered for PDF
import os
Image.init()

# AI-enhanced (Real-ESRGAN x4) source
SRC = r'D:\study\python\tools\src_x4_clean.png'
SCALE = 4   # SR factor; circle coords below are in ORIGINAL screenshot units

OUT = r'C:\Users\alladdiks\Desktop\Картки'
PNG_DIR = os.path.join(OUT, 'PNG_kruhli')
PNG_TR  = os.path.join(OUT, 'PNG_prozori')
for d in (OUT, PNG_DIR, PNG_TR):
    os.makedirs(d, exist_ok=True)

im = Image.open(SRC).convert('RGB')

# (filename, cx, cy, r) in ORIGINAL 480x747 coordinates
circles = [
    ('1_Maty_Zemli_Hayya',         124, 134, 109),
    ('2_Korinnya_dushi',           366, 131, 110),
    ('3_Providnycya_Energii',      122, 401, 109),
    ('4_Maty_Stykhiy_Reya',        365, 401, 110),
    ('5_Maty_Zhyttya_Demetra',      71, 610,  58),
    ('6_Povernennya_do_sebe',      240, 610,  57),
    ('7_Dukhovne_pererodzhennya',  410, 610,  58),
]

OUT_D = 2000          # diameter of each circle in px on the page (~16.9 cm @300dpi)
SHRINK = 4            # shrink source radius (original units) to avoid screenshot edge
SS = 4                # supersampling for smooth circle edge

A4 = (2480, 3508)     # A4 @ 300 DPI
DPI = 300.0

def make_circle(cx, cy, r):
    cx, cy, r = cx*SCALE, cy*SCALE, (r-SHRINK)*SCALE
    crop = im.crop((cx-r, cy-r, cx+r, cy+r)).resize((OUT_D, OUT_D), Image.LANCZOS)
    crop = crop.filter(ImageFilter.UnsharpMask(radius=2, percent=45, threshold=2))
    mask = Image.new('L', (OUT_D*SS, OUT_D*SS), 0)
    ImageDraw.Draw(mask).ellipse((0, 0, OUT_D*SS-1, OUT_D*SS-1), fill=255)
    mask = mask.resize((OUT_D, OUT_D), Image.LANCZOS)
    on_white = Image.new('RGB', (OUT_D, OUT_D), (255, 255, 255))
    on_white.paste(crop, (0, 0), mask)
    transparent = crop.convert('RGBA'); transparent.putalpha(mask)
    return on_white, transparent

pages = []
for name, cx, cy, r in circles:
    on_white, transparent = make_circle(cx, cy, r)
    on_white.save(os.path.join(PNG_DIR, name + '.png'))
    transparent.save(os.path.join(PNG_TR, name + '.png'))
    page = Image.new('RGB', A4, (255, 255, 255))
    page.paste(on_white, ((A4[0]-OUT_D)//2, (A4[1]-OUT_D)//2))
    pages.append(page)
    print('done', name)

pdf_path = os.path.join(OUT, 'Kartky_A4_7storinok.pdf')
pages[0].save(pdf_path, save_all=True, append_images=pages[1:], resolution=DPI)
print('PDF saved ->', pdf_path)
