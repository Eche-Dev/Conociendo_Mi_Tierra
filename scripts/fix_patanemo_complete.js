const https = require('https');
const fs = require('fs');
const path = require('path');

const agent = new https.Agent({ rejectUnauthorized: false });
const USER_AGENT = 'ConociendoMiTierraApp/1.0 (https://github.com/conociendo-mi-tierra; edu-contact@conociendomitierra.org)';
const targetDir = path.join('public', 'images', 'destinations', 'patanemo');

const files = [
  { step: '2', title: 'File:BAHÍA DE PATANEMO ESTADO CARABOBO. 02.JPG' },
  { step: '4', title: 'File:ISLA LARGA - CARABOBO 02.JPG' },
  { step: '7', title: 'File:Diablos danzantes de Patanemo 01.jpg' },
  { step: '9', title: 'File:ISLA LARGA - CARABOBO 01.JPG' }
];

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

async function run() {
  for (const f of files) {
    const infoUrl = `https://commons.wikimedia.org/w/api.php?action=query&format=json&titles=${encodeURIComponent(f.title)}&prop=imageinfo&iiprop=url|size&iiurlwidth=2048`;
    const data = await fetchJson(infoUrl);
    const pages = Object.values(data.query.pages);
    const info = pages[0].imageinfo[0];
    const dlUrl = info.thumburl || info.url;
    await downloadFile(dlUrl, path.join(targetDir, `${f.step}.jpg`));
    console.log(`Downloaded ${f.step}.jpg from ${f.title}`);
  }
  console.log('Patanemo complete!');
}

run();
