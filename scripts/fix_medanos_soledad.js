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

async function run() {
  const targetDir = path.join('public', 'images', 'destinations', 'medanos-soledad');

  const files = [
    { step: '3', title: 'File:Médanos La Soledad - Edo. Apure1.JPG' },
    { step: '4', title: 'File:Médanos La Soledad - Edo. Apure2.JPG' },
    { step: '5', title: 'File:Médanos La Soledad - Edo. Apure3.JPG' },
    { step: '7', title: 'File:Chalana cruzando el rio Capanaparo.jpg' },
    { step: '9', title: 'File:Médanos La Soledad - Edo. Apure4.JPG' },
    { step: '10', title: 'File:Médanos La Soledad - Edo. Apure5.JPG' }
  ];

  for (const f of files) {
    const infoUrl = `https://commons.wikimedia.org/w/api.php?action=query&format=json&titles=${encodeURIComponent(f.title)}&prop=imageinfo&iiprop=url|size&iiurlwidth=2048`;
    const data = await fetchJson(infoUrl);
    const pages = Object.values(data.query.pages);
    if (!pages[0] || !pages[0].imageinfo) {
      console.log('Not found:', f.title);
      continue;
    }
    const info = pages[0].imageinfo[0];
    const dlUrl = info.thumburl || info.url;
    await downloadFile(dlUrl, path.join(targetDir, `${f.step}.jpg`));
    console.log(`Downloaded ${f.step}.jpg from ${f.title}`);
  }
  console.log('Medanos Soledad fully completed!');
}

run();
