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

async function listCategory(cat) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=categorymembers&gcmtitle=${encodeURIComponent('Category:' + cat)}&gcmnamespace=6&gcmlimit=50&prop=imageinfo&iiprop=url|size`;
  const res = await fetchJson(url);
  const pages = (res.query && res.query.pages) ? Object.values(res.query.pages) : [];
  return pages.map(p => ({
    title: p.title,
    width: p.imageinfo[0].width,
    height: p.imageinfo[0].height,
    url: p.imageinfo[0].url
  }));
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
  console.log('Category Caves of Venezuela:');
  const cat = await listCategory('Caves of Venezuela');
  cat.forEach(c => console.log(`- ${c.title} (${c.width}x${c.height})`));

  console.log('\nSearch "Alfredo Jahn":');
  const aj = await search('Alfredo Jahn');
  aj.forEach(c => console.log(`- ${c.title} (${c.width}x${c.height})`));

  console.log('\nSearch Capaya Miranda:');
  const cap = await search('Capaya Miranda OR Curiepe Miranda');
  cap.forEach(c => console.log(`- ${c.title} (${c.width}x${c.height})`));
}

run();
