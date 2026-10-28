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
  console.log('Search Caripe landscapes:');
  const res8 = await search('Caripe Monagas paisaje OR Caripe serrania');
  console.log('res8:', res8);

  const res10 = await search('Monagas atardecer OR Caripe niebla');
  console.log('res10:', res10);

  const targetDir = path.join('public', 'images', 'destinations', 'guacharo');

  if (res8.length > 0) {
    const pick8 = res8.find(r => r.width > r.height && !r.title.includes('pdf')) || res8[0];
    console.log('Downloading 8.jpg from:', pick8.title);
    await downloadFile(pick8.thumburl, path.join(targetDir, '8.jpg'));
    console.log('8.jpg downloaded.');
  }

  if (res10.length > 0) {
    const pick10 = res10.find(r => r.width > r.height && !r.title.includes('pdf')) || res10[0];
    console.log('Downloading 10.jpg from:', pick10.title);
    await downloadFile(pick10.thumburl, path.join(targetDir, '10.jpg'));
    console.log('10.jpg downloaded.');
  }
}

run();
