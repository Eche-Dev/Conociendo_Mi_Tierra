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

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destPath);
    const req = https.get(url, { agent, headers: { 'User-Agent': USER_AGENT, 'Accept': 'image/webp,image/jpeg,image/*,*/*' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        file.close();
        if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
        return resolve(downloadFile(res.headers.location, destPath));
      }
      if (res.statusCode !== 200) {
        file.close();
        if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
        return reject(new Error('HTTP status ' + res.statusCode));
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve(destPath));
      });
    });
    req.on('error', (err) => {
      file.close();
      if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
      reject(err);
    });
  });
}

async function search(q) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=${encodeURIComponent(q)}&gsrnamespace=6&gsrlimit=6&prop=imageinfo&iiprop=url|size&iiurlwidth=2048`;
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
  console.log('Search Chuao:');
  const res5 = await search('Chuao Aragua iglesia OR Chuao pueblo');
  console.log('res5:', res5);

  console.log('Search Diablos de Chuao:');
  const res9 = await search('Diablos Danzantes Chuao OR Diablos de Chuao');
  console.log('res9:', res9);

  const targetDir = path.join('public', 'images', 'destinations', 'choroni');

  if (res5.length > 0) {
    const pick5 = res5.find(r => r.width > r.height && r.width >= 1200) || res5[0];
    console.log('Downloading 5.jpg from:', pick5.title);
    await downloadFile(pick5.thumburl, path.join(targetDir, '5.jpg'));
    console.log('5.jpg downloaded.');
  }

  if (res9.length > 0) {
    const pick9 = res9.find(r => r.width > r.height && r.width >= 1200) || res9[0];
    console.log('Downloading 9.jpg from:', pick9.title);
    await downloadFile(pick9.thumburl, path.join(targetDir, '9.jpg'));
    console.log('9.jpg downloaded.');
  }
}

run();
