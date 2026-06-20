# -*- coding: utf-8 -*-
from PIL import Image, ImageDraw, ImageFilter
from PIL import JpegImagePlugin
import os
Image.init()

SRC = r'D:\study\python\tools\src8_clean.png'
SCALE = 4
# ellipse in ORIGINAL screenshot units
cx, cy, rx, ry = 236, 261, 212, 204
PAD = 10  # original units of white padding around ellipse

ROOT = r'C:\Users\alladdiks\Desktop\Картки'
BONUS = os.path.join(ROOT, 'Прозорий фон (бонус)')
NAME = '8 Єднання'

im = Image.open(SRC).convert('RGB')

cx, cy, rx, ry = cx*SCALE, cy*SCALE, rx*SCALE, ry*SCALE
pad = PAD*SCALE
box = (cx-rx-pad, cy-ry-pad, cx+rx+pad, cy+ry+pad)
crop = im.crop(box)
cw, ch = crop.size

OUT_W = 2200
sc = OUT_W / cw
OUT_H = round(ch * sc)
crop = crop.resize((OUT_W, OUT_H), Image.LANCZOS)
crop = crop.filter(ImageFilter.UnsharpMask(radius=2, percent=45, threshold=2))

SS = 4
exrx, exry = rx*sc, ry*sc
m = Image.new('L', (OUT_W*SS, OUT_H*SS), 0)
mcx, mcy = OUT_W*SS/2, OUT_H*SS/2
ImageDraw.Draw(m).ellipse((mcx-exrx*SS, mcy-exry*SS, mcx+exrx*SS, mcy+exry*SS), fill=255)
m = m.resize((OUT_W, OUT_H), Image.LANCZOS)
m = m.filter(ImageFilter.GaussianBlur(20))  # м'який край

on_white = Image.new('RGB', (OUT_W, OUT_H), (255, 255, 255))
on_white.paste(crop, (0, 0), m)
on_white.save(os.path.join(ROOT, NAME + '.png'))

tr = crop.convert('RGBA'); tr.putalpha(m)
os.makedirs(BONUS, exist_ok=True)
tr.save(os.path.join(BONUS, NAME + '.png'))

print('saved', NAME, on_white.size)
