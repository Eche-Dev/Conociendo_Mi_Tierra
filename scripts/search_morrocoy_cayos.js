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
  console.log('Search Cayo Sal:', await search('"Cayo Sal" -hoja -map'));
  console.log('Search Cayo Muerto:', await search('"Cayo Muerto" -hoja -map'));
  console.log('Search Cayo Paicla:', await search('"Cayo Paicla" OR "Cayo Paiclá"'));
  console.log('Search Cayo Varadero:', await search('"Cayo Varadero" Morrocoy'));
}

run();
