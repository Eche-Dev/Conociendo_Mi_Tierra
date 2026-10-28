const https = require('https');
const fs = require('fs');
const path = require('path');

const agent = new https.Agent({ rejectUnauthorized: false });
const USER_AGENT = 'ConociendoMiTierraApp/1.0 (https://github.com/conociendo-mi-tierra; edu-contact@conociendomitierra.org)';
const targetDir = path.join('public', 'images', 'destinations', 'galipan');

const replacements = [
  { step: '6', title: 'File:Huertos galipan.JPG' },
  { step: '7', title: 'File:La Guaira desde Galipan.jpg' },
  { step: '8', title: 'File:Río San José de Galipán-Waraira Repano.jpg' },
  { step: '9', title: 'File:Pueblo de Galipan.JPG' }
];

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { agent, headers: { 'User-Agent': USER_AGENT } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    });
    req.on('error', reject);
  });
}

function downloadImage(url, destPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destPath);
    https.get(url, { agent, headers: { 'User-Agent': USER_AGENT } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadImage(res.headers.location, destPath).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        file.close();
        fs.unlink(destPath, () => {});
        return reject(new Error(`Status ${res.statusCode}`));
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve());
      });
    }).on('error', (err) => {
      file.close();
      fs.unlink(destPath, () => {});
      reject(err);
    });
  });
}

async function run() {
  for (const item of replacements) {
    const url = `https://commons.wikimedia.org/w/api.php?action=query&format=json&titles=${encodeURIComponent(item.title)}&prop=imageinfo&iiprop=url|size|mime&iiurlwidth=2048`;
    const res = await fetchJson(url);
    const pages = Object.values(res.query.pages);
    if (!pages[0] || !pages[0].imageinfo) {
      console.log(`Failed to find ${item.title}`);
      continue;
    }
    const info = pages[0].imageinfo[0];
    const imgUrl = info.thumburl || info.url;
    const dest = path.join(targetDir, `${item.step}.jpg`);
    console.log(`Downloading ${item.title} (${info.width}x${info.height}) to ${item.step}.jpg...`);
    await downloadImage(imgUrl, dest);
    const sz = Math.round(fs.statSync(dest).size / 1024);
    console.log(`Saved ${dest} (${sz} KB)`);
  }
  console.log('Finished updating Galipan images!');
}

run();
