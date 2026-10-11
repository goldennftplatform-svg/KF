"""Subtle, non-generative treatment of owner-supplied personal photographs."""
from pathlib import Path
from PIL import Image, ImageOps, ImageEnhance, ImageDraw, ImageFilter
import numpy as np

ROOT = Path(__file__).resolve().parents[1]
SOURCE = Path.home() / 'Downloads'
OUT = ROOT / 'public' / 'media'

def photo(name):
    return ImageOps.exif_transpose(Image.open(SOURCE / name)).convert('RGB')

# Remove the green backdrop, preserving the person's features and clothing.
im = photo('IMG_20200623_081559_871.jpg').resize((1500, 2000))
pixels = np.asarray(im).astype(float)
r, g, b = pixels[:,:,0], pixels[:,:,1], pixels[:,:,2]
excess = g - np.maximum(r, b)
alpha = np.clip((25 - excess) / 20, 0, 1)
mask = Image.new('L', im.size)
ImageDraw.Draw(mask).polygon([(635,305),(648,235),(661,194),(677,160),(712,133),(757,111),(809,116),(858,146),(892,187),(910,228),(902,264),(892,308),(920,460),(1030,570),(1140,940),(1140,1400),(1070,1999),(350,1999),(350,1500),(220,1120),(210,925),(340,600),(535,510),(610,470)], fill=255)
alpha *= np.asarray(mask.filter(ImageFilter.GaussianBlur(2))) / 255
im = ImageEnhance.Brightness(im).enhance(1.045)
im = ImageEnhance.Color(im).enhance(.92)
im.putalpha(Image.fromarray((alpha*255).astype('uint8')))
im.crop((190,80,1160,1690)).resize((965,1600)).save(OUT/'creator-cutout.webp',quality=92)

# A close portrait: gentle light lift and a neutralized green backdrop.
im = photo('IMG_20200623_081613_005.jpg')
im = ImageOps.fit(im,(1200,1600))
p = np.asarray(im).astype(float)
excess = p[:,:,1] - np.maximum(p[:,:,0],p[:,:,2])
a = np.clip((28-excess)/23,0,1)[:,:,None]
p = p*a + np.array([202,210,195])*(1-a)
im = Image.fromarray(np.clip(p,0,255).astype('uint8'))
im = ImageEnhance.Brightness(im).enhance(1.035)
im.crop((0,0,1110,1400)).save(OUT/'creator-smile.webp',quality=89)

for source, target in [('20161217_140534.jpg','steve-largent'),('IMG_20190621_145506.jpg','creator-workshop'),('IMG_20190908_220546.jpg','creator-headphones')]:
    im = photo(source)
    im.thumbnail((1300,1600))
    im = ImageEnhance.Color(im).enhance(.92)
    im = ImageEnhance.Contrast(im).enhance(1.035)
    im.save(OUT/f'{target}.webp',quality=87)
