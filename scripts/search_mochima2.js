const https = require('https');
const agent = new https.Agent({ rejectUnauthorized: false });
const USER_AGENT = 'ConociendoMiTierraApp/1.0 (https://github.com/conociendo-mi-tierra; edu-contact@conociendomitierra.org)';

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { agent, headers: { 'User-Agent': USER_AGENT } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    });
    req.on('error', reject);
  });
}

async function search(q) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=${encodeURIComponent(q)}&gsrnamespace=6&gsrlimit=10&prop=imageinfo&iiprop=url|size`;
  const res = await fetchJson(url);
  const pages = (res.query && res.query.pages) ? Object.values(res.query.pages) : [];
  return pages.map(p => ({
    title: p.title,
    width: p.imageinfo[0].width,
    height: p.imageinfo[0].height,
    url: p.imageinfo[0].url
  }));
}

async function run() {
  console.log('Search Mochima landscape:');
  console.log(await search('Mochima Venezuela landscape OR bahia Mochima'));

  console.log('Search Isla de Plata:');
  console.log(await search('"Isla de Plata" Mochima OR Guanta'));

  console.log('Search Santa Fe Mochima:');
  console.log(await search('Santa Fe Mochima OR Golfo de Santa Fe'));

  console.log('Search Mochima delfines:');
  console.log(await search('delfines Mochima OR delfin Mochima'));
}

run();
