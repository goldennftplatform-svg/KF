"""Read the owner's public Bagpipes album and create an exact, ordered release snapshot.

Audio streams from the release's public URLs; artwork is optimized locally.
No authentication, mutations, or generation credits are involved.
"""
from pathlib import Path
import io
import json
import urllib.request
from PIL import Image, ImageOps, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public' / 'media'
ENDPOINT = 'https://blessed-puffin-791.convex.cloud/api/query'

def query(path, args):
    req = urllib.request.Request(ENDPOINT, data=json.dumps({'path':path,'args':args,'format':'json'}).encode(), headers={'Content-Type':'application/json'})
    with urllib.request.urlopen(req, timeout=40) as response:
        data = json.load(response)
    if data.get('status') != 'success':
        raise ValueError(data)
    return data['value']

def artwork(url, name, size):
    req = urllib.request.Request(url, headers={'User-Agent':'Mozilla/5.0','Referer':'https://bagpipes.studio/'})
    with urllib.request.urlopen(req, timeout=40) as response:
        im = ImageOps.exif_transpose(Image.open(io.BytesIO(response.read()))).convert('RGB')
    im.thumbnail(size)
    im.save(OUT / name, quality=88)

album = query('collections:getCollectionBySlug', {'slug':'gone-kristmas'})
assert album['isPublished'] and album['name'] == 'Gone Kristmas'
artwork(album['coverImageUrl'], 'gone-kristmas.webp', (1600,1600))
social = Image.new('RGB', (1200,630), '#173c34')
cover = Image.open(OUT / 'gone-kristmas.webp')
social.paste(ImageOps.fit(cover,(600,600)), (585,15))
draw = ImageDraw.Draw(social)
display = ImageFont.truetype('C:/Windows/Fonts/impact.ttf', 105)
small = ImageFont.truetype('C:/Windows/Fonts/arial.ttf', 18)
draw.text((42,60), 'PRESET RECORDS PRESENTS', font=small, fill='#d9c69b')
draw.text((40,155), 'GONE', font=display, fill='#f4f0e6')
draw.text((40,265), 'KRISTMAS.', font=display, fill='#f4f0e6')
draw.text((43,430), 'KOUNTRY FOLK / THE HOLIDAY ALBUM', font=small, fill='#d9c69b')
draw.text((43,490), '12 SONGS. PRESS PLAY. STAY A WHILE.', font=small, fill='#f4f0e6')
draw.text((43,560), 'kp.aisp.live', font=small, fill='#d9c69b')
social.save(OUT/'gone-kristmas-social.jpg',quality=91)
tracks = []
for i, track in enumerate(album['tracks']):
    edition = query('nftDb:getEditionForTrack', {'trackId':track['_id']})
    art_name = f'kristmas-{i+1:02}.webp'
    artwork(track.get('resolvedCoverUrl') or track['coverImageUrl'], art_name, (600,600))
    tracks.append({
        'title':track['title'].removesuffix(' -.-').strip(),
        'sourceTitle':track['title'],
        'artist':track.get('artistName',album['artistName']).upper(),
        'group':'holiday', 'audioUrl':track['resolvedAudioUrl'],
        'art':art_name, 'duration':track['duration'],
        'bagpipesSlug':track['slug'],
        'nftEdition':bool(edition and edition.get('status') == 'created'),
        'tokenId':edition.get('tokenId') if edition else None,
    })
data = {'name':album['name'],'artist':album['artistName'],'url':'https://bagpipes.studio/album/gone-kristmas','cover':'gone-kristmas.webp','tracks':tracks}
(ROOT / 'src' / 'holiday-data.json').write_text(json.dumps(data, indent=2)+'\n', encoding='utf-8')
print(json.dumps({'album':album['name'],'count':len(tracks),'duration':sum(t['duration'] for t in tracks),'editions':[(t['title'],t['nftEdition']) for t in tracks]},indent=2))
