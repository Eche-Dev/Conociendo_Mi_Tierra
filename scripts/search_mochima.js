const https = require('https');
const fs = require('fs');
const path = require('path');

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
  const url = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=categorymembers&gcmtitle=${encodeURIComponent('Category:' + cat)}&gcmnamespace=6&gcmlimit=100&prop=imageinfo&iiprop=url|size`;
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
  console.log('--- Category Mochima ---');
  const cat = await listCategory('Parque Nacional Mochima');
  console.log(`Cat items: ${cat.length}`);
  cat.forEach(f => {
    if (f.width >= 1200 && f.width > f.height * 1.2 && !f.title.includes('Hoja') && !f.title.includes('map')) {
      console.log(`- ${f.title} (${f.width}x${f.height})`);
    }
  });

  console.log('\n--- Search Playa Colorada ---');
  console.log(await search('"Playa Colorada" Sucre OR Mochima'));

  console.log('\n--- Search Playa Blanca Mochima ---');
  console.log(await search('"Playa Blanca" Mochima'));

  console.log('\n--- Search Isla Arapo ---');
  console.log(await search('Arapo Mochima'));
}

run();
