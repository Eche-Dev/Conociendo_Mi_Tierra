const https = require('https');
const fs = require('fs');
const path = require('path');

const agent = new https.Agent({ rejectUnauthorized: false });
const USER_AGENT = 'ConociendoMiTierraApp/1.0 (https://github.com/conociendo-mi-tierra; edu-contact@conociendomitierra.org)';

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
  const url = 'https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=Castillo%20Santa%20Rosa%20Margarita&gsrnamespace=6&gsrlimit=10&prop=imageinfo&iiprop=url|size&iiurlwidth=2048';
  const data = await new Promise((resolve, reject) => {
    https.get(url, { agent, headers: { 'User-Agent': USER_AGENT } }, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => resolve(JSON.parse(d)));
    }).on('error', reject);
  });

  const pages = Object.values(data.query.pages);
  const candidates = [];
  for (const p of pages) {
    if (!p.imageinfo || !p.imageinfo[0]) continue;
    const info = p.imageinfo[0];
    const ratio = info.width / info.height;
    if (ratio >= 1.2 && ratio <= 1.8 && info.width >= 1200) {
      candidates.push({
        title: p.title,
        width: info.thumbwidth || info.width,
        height: info.thumbheight || info.height,
        downloadUrl: info.thumburl || info.url
      });
    }
  }

  const chosen = candidates[0];
  console.log('Descargando imagen 16:9 de Castillo Santa Rosa:', chosen.title, `${chosen.width}x${chosen.height}`);
  const destPath = path.join('public', 'images', 'destinations', 'margarita', '07-castillo-santa-rosa.jpg');
  await downloadFile(chosen.downloadUrl, destPath);
  console.log('¡Descarga completada con éxito! Tamaño:', Math.round(fs.statSync(destPath).size / 1024), 'KB');
}

run();
