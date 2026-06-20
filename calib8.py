# -*- coding: utf-8 -*-
from PIL import Image, ImageDraw
SRC = r'C:\Users\alladdiks\Pictures\Screenshots\Знімок екрана 2026-06-18 013139.png'
OUT = r'D:\study\python\tools\_ov8.png'
im = Image.open(SRC).convert('RGB')
S = 2
big = im.resize((im.width*S, im.height*S), Image.LANCZOS)
d = ImageDraw.Draw(big)
# ellipse (cx, cy, rx, ry)
cx, cy, rx, ry = 238, 262, 222, 205
d.ellipse(((cx-rx)*S,(cy-ry)*S,(cx+rx)*S,(cy+ry)*S), outline=(255,0,0), width=2)
d.line((cx*S-5,cy*S,cx*S+5,cy*S), fill=(0,255,0), width=2)
d.line((cx*S,cy*S-5,cx*S,cy*S+5), fill=(0,255,0), width=2)
big.save(OUT)
print('ok', big.size)
