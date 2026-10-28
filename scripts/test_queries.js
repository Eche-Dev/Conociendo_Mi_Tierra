const https = require('https');
const agent = new https.Agent({ rejectUnauthorized: false });

const queries = [
  'Margarita Island Venezuela',
  'Castillo San Carlos Borromeo',
  'Playa El Agua',
  'Playa Parguito',
  'Laguna de La Restinga',
  'Juan Griego Venezuela',
  'Castillo de Santa Rosa Venezuela',
  'Virgen del Valle Margarita',
  'Peninsula de Macanao',
  'Playa El Yaque'
];

async function check() {
  for (const q of queries) {
    const url = 'https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=' + encodeURIComponent(q) + '&gsrnamespace=6&gsrlimit=5&prop=imageinfo&iiprop=url|size';
    await new Promise(res => {
      https.get(url, { agent, headers: { 'User-Agent': 'ConociendoMiTierra/1.0 (test)' } }, r => {
        let d = '';
        r.on('data', c => d += c);
        r.on('end', () => {
          try {
            const json = JSON.parse(d);
            const pages = json.query && json.query.pages ? Object.values(json.query.pages) : [];
            console.log(q, '->', pages.length, 'imágenes');
            if (pages.length > 0 && pages[0].imageinfo) {
              const info = pages[0].imageinfo[0];
              console.log('   Top:', pages[0].title, `${info.width}x${info.height}`);
            }
          } catch (e) {
            console.log(q, 'error:', e.message);
          }
          res();
        });
      }).on('error', err => {
        console.log(q, 'req error:', err.message);
        res();
      });
    });
  }
}
check();
