const https = require('https');
const fs = require('fs');
const path = require('path');

const agent = new https.Agent({ rejectUnauthorized: false });
const USER_AGENT = 'ConociendoMiTierraApp/1.0 (https://github.com/conociendo-mi-tierra; edu-contact@conociendomitierra.org)';
const targetDir = path.join('public', 'images', 'destinations', 'morrocoy');

const items = [
  {
    step: '3',
    fileTitle: 'File:Parque Nacional Morrocoy, Estado Falcón. Cayo Varadero.JPG',
    desc: 'Cayo Varadero y Barrera de Coral'
  },
  {
    step: '6',
    fileTitle: 'File:Cayo Paiclá, Parque Nacional Morrocoy.jpg',
    desc: 'Cayo Paiclá y Aguas Transparentes'
  },
  {
    step: '9',
    fileTitle: 'File:Cayo Muerto.JPG',
    desc: 'Cayo Muerto y Palmeras de Chichiriviche'
  }
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
  for (const item of items) {
    const infoUrl = `https://commons.wikimedia.org/w/api.php?action=query&format=json&titles=${encodeURIComponent(item.fileTitle)}&prop=imageinfo&iiprop=url|size&iiurlwidth=2048`;
    const data = await fetchJson(infoUrl);
    const pages = Object.values(data.query.pages);
    if (!pages[0] || !pages[0].imageinfo) {
      console.error('No info for:', item.fileTitle);
      continue;
    }
    const info = pages[0].imageinfo[0];
    const downloadUrl = info.thumburl || info.url;
    const destPath = path.join(targetDir, `${item.step}.jpg`);

    console.log(`Descargando [${item.step}/10] ${item.desc}...`);
    console.log(`Fuente: ${item.fileTitle} (${info.width}x${info.height})`);
    await downloadFile(downloadUrl, destPath);
    console.log(`Listo: ${destPath} (${Math.round(fs.statSync(destPath).size / 1024)} KB)\n`);
  }
  console.log('Completado correctamente.');
}

run();
