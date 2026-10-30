"""Prepare the two latest verified PRESET releases from public Bagpipes pages."""
from pathlib import Path
import io
import json
import subprocess
import urllib.request
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public' / 'media'
for slug in ['lockstep', 'fragmented']:
    req = urllib.request.Request('https://blessed-puffin-791.convex.cloud/api/query', data=json.dumps({'path':'tracks:getTrackBySlug','args':{'slug':slug},'format':'json'}).encode(), headers={'Content-Type':'application/json'})
    with urllib.request.urlopen(req, timeout=40) as response:
        track = json.load(response)['value']
    assert track['isPublished'] and track['artistName'] == 'Preset'
    art = track.get('resolvedCoverUrl') or track['coverImageUrl']
    req = urllib.request.Request(art, headers={'User-Agent':'Mozilla/5.0','Referer':'https://bagpipes.studio/'})
    with urllib.request.urlopen(req, timeout=40) as response:
        image = ImageOps.exif_transpose(Image.open(io.BytesIO(response.read()))).convert('RGB')
    image.thumbnail((800,800))
    image.save(OUT / f'{slug}.webp', quality=89)
    subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-y','-user_agent','Mozilla/5.0','-referer','https://bagpipes.studio/','-i',track['resolvedAudioUrl'],'-map_metadata','-1','-c:a','libmp3lame','-b:a','160k',str(OUT / f'{slug}.mp3')], check=True)
    print(f"Prepared {track['title']} from {track['slug']}: {track['resolvedAudioUrl']}")
