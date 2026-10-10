"""Build web-sized derivatives of the owner's selected music and artwork."""
from pathlib import Path
import subprocess
from PIL import Image, ImageOps, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
SOURCE = Path.home() / 'Downloads'
OUT = ROOT / 'public' / 'media'
OUT.mkdir(parents=True, exist_ok=True)

def ff(*args):
    subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', *map(str, args)], check=True)

def prepare():
    songs = {'diesel-n-diamonds': 'bagpipes-Diesel-and-Diamonds.mp3', 'feels-right': 'bagpipes-Feels-Right.mp3', 'party-in-the-pines': 'bagpipes-Party-in-the-Pines.mp3', 'hi-and-dry': 'bagpipes-High-n-Dry.mp3', 'static-in': 'bagpipes-Static-In.mp3', 'choosin-fun': 'bagpipes-Choosin-Fun.mp3'}
    for name, source in songs.items():
        ff('-i', SOURCE / source, '-map_metadata', '-1', '-c:a', 'libmp3lame', '-b:a', '160k', OUT / f'{name}.mp3')
    im = Image.open(SOURCE / 'Diesel N’ Diamonds at Sunset.png').convert('RGB')
    im.save(OUT / 'diesel-cover.webp', quality=88)
    im.crop((190, 220, 1190, 1180)).save(OUT / 'kountry-portrait.webp', quality=88)
    promo = SOURCE / 'bagpipes-need-a-promo-video-for-these.mp4'
    ff('-ss', '7', '-i', promo, '-t', '5', '-an', '-vf', 'scale=1440:-2', '-c:v', 'libx264', '-crf', '25', '-preset', 'fast', '-movflags', '+faststart', OUT / 'kountry-loop.mp4')
    for name, source, second in [('hero', promo, 9), ('pines', promo, 1), ('preset', SOURCE / 'bagpipes-show-a-dj-in-the-studios.mp4', 9), ('truck', SOURCE / 'bagpipes-music-video-for-this-hook-show.mp4', 1)]:
        ff('-ss', second, '-i', source, '-frames:v', '1', '-vf', 'scale=1440:-2', OUT / f'{name}.webp')

def review():
    paths = [SOURCE / name for name in ['2026-10-07-20h41m17s_seed391593721_multiclip.mp4', '2026-10-09-02h39m29s_seed933588221_multiclip.mp4', 'bagpipes-need-a-promo-video-for-these.mp4', 'bagpipes-epic-highenergy-hollywood-sizzle-reel-trailer.mp4', 'bagpipes-show-a-dj-in-the-studios.mp4', 'bagpipes-music-video-for-this-hook-show.mp4']]
    temp = ROOT / '.scratch'
    temp.mkdir(exist_ok=True)
    sheet = Image.new('RGB', (900, len(paths)*190), '#181818')
    draw = ImageDraw.Draw(sheet)
    for row, path in enumerate(paths):
        for col, second in enumerate([1, 5, 9]):
            frame = temp / f'{row}-{col}.jpg'
            ff('-ss', second, '-i', path, '-frames:v', '1', '-vf', 'scale=300:-1', frame)
            if frame.exists():
                image = Image.open(frame)
                sheet.paste(ImageOps.fit(image, (300,160)), (col*300,row*190))
        draw.text((5,row*190+163), f'{row}: {path.name[:95]}', fill='white')
    sheet.save(temp / 'review.jpg')

if __name__ == '__main__':
    import sys
    review() if '--review' in sys.argv else prepare()
