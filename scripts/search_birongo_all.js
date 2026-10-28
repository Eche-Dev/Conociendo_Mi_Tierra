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
  const url = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=${encodeURIComponent(q)}&gsrnamespace=6&gsrlimit=20&prop=imageinfo&iiprop=url|size&iiurlwidth=2048`;
  const res = await fetchJson(url);
  const pages = (res.query && res.query.pages) ? Object.values(res.query.pages) : [];
  return pages.map(p => ({
    title: p.title,
    width: p.imageinfo[0].width,
    height: p.imageinfo[0].height,
    thumburl: p.imageinfo[0].thumburl || p.imageinfo[0].url
  }));
}

async function run() {
  console.log('Search Birongo:');
  const resB = await search('Birongo');
  resB.forEach(r => console.log(`- ${r.title} (${r.width}x${r.height})`));

  console.log('\nSearch Cueva Alfredo Jahn / Cambural:');
  const resC = await search('Cambural OR Alfredo Jahn cueva');
  resC.forEach(r => console.log(`- ${r.title} (${r.width}x${r.height})`));

  console.log('\nSearch Barlovento:');
  const resBar = await search('Barlovento Venezuela');
  resBar.forEach(r => console.log(`- ${r.title} (${r.width}x${r.height})`));
}

run();
