import urllib.request
import urllib.parse
import json

queries = ['flamenco los roques', 'flamencos venezuela', 'phoenicopterus ruber venezuela', 'cuare flamencos']
for q in queries:
    api_url = f'https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrnamespace=6&gsrsearch={urllib.parse.quote(q)}&gsrlimit=10&prop=imageinfo&iiprop=url|size&format=json'
    req = urllib.request.Request(api_url, headers={'User-Agent': 'ConociendoMiTierra/1.0'})
    try:
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode())
            pages = data.get('query', {}).get('pages', {})
            print(f"=== Query: {q} ({len(pages)} results) ===")
            for p in pages.values():
                if 'imageinfo' in p:
                    info = p['imageinfo'][0]
                    print(f"{p['title']}: {info.get('width')}x{info.get('height')} -> {info.get('url')}")
    except Exception as e:
        print(f"Error {q}: {e}")
