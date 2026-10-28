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
  const url = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=${encodeURIComponent(q)}&gsrnamespace=6&gsrlimit=12&prop=imageinfo&iiprop=url|size`;
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
  console.log('Search Cinaruco:');
  console.log(await search('Cinaruco'));

  console.log('\nSearch Santos Luzardo:');
  console.log(await search('Santos Luzardo'));

  console.log('\nSearch Capanaparo:');
  console.log(await search('Capanaparo'));

  console.log('\nSearch Pavon Apure OR Cinaruco pavon:');
  console.log(await search('Cichla Apure OR pavon Cinaruco OR Cichla temensis Venezuela'));
}

run();
