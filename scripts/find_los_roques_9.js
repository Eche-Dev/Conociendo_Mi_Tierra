const https = require('https');
const agent = new https.Agent({ rejectUnauthorized: false });

const USER_AGENT = 'ConociendoMiTierraApp/1.0 (https://github.com/conociendo-mi-tierra; edu-contact@conociendomitierra.org)';

async function search(q) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=${encodeURIComponent(q)}&gsrnamespace=6&gsrlimit=6&prop=imageinfo&iiprop=url|size&iiurlwidth=2048`;
  return new Promise((resolve) => {
    https.get(url, { agent, headers: { 'User-Agent': USER_AGENT } }, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        try {
          const json = JSON.parse(d);
          const pages = (json.query && json.query.pages) ? Object.values(json.query.pages) : [];
          console.log(`Query "${q}": ${pages.length} resultados`);
          pages.forEach(p => {
            if (p.imageinfo && p.imageinfo[0]) {
              console.log(' -', p.title, `${p.imageinfo[0].width}x${p.imageinfo[0].height}`, p.imageinfo[0].thumburl || p.imageinfo[0].url);
            }
          });
        } catch (e) {
          console.log(`Query "${q}" error:`, e.message);
        }
        resolve();
      });
    }).on('error', err => {
      console.log('Error:', err.message);
      resolve();
    });
  });
}

async function run() {
  await search('Cayo de Agua');
  await search('Cayo Crasqui');
  await search('Cayo Francisqui');
  await search('Archipielago Los Roques');
}

run();
