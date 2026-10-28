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
      file.on('finish', () => file.close(() => resolve(destPath)));
    });
    req.on('error', err => {
      file.close();
      if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
      reject(err);
    });
  });
}

async function search(q) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=${encodeURIComponent(q)}&gsrnamespace=6&gsrlimit=10&prop=imageinfo&iiprop=url|size&iiurlwidth=2048`;
  return new Promise(res => {
    https.get(url, { agent, headers: { 'User-Agent': USER_AGENT } }, r => {
      let d = '';
      r.on('data', c => d += c);
      r.on('end', () => {
        try {
          const json = JSON.parse(d);
          res(Object.values(json.query.pages || {}));
        } catch (e) {
          res([]);
        }
      });
    }).on('error', () => res([]));
  });
}

async function run() {
  const targetDir = path.join('public', 'images', 'destinations', 'catatumbo');

  // Buscar foto de alta calidad del Puente sobre el Lago de Maracaibo para 10.jpg
  console.log('Buscando foto HD del Puente sobre el Lago...');
  const bridge = await search('Puente Rafael Urdaneta Maracaibo');
  const validBridge = bridge.filter(p => p.imageinfo && p.imageinfo[0].width >= 2000);
  if (validBridge.length > 0) {
    const chosen = validBridge[0];
    const dl = chosen.imageinfo[0].thumburl || chosen.imageinfo[0].url;
    console.log('  -> Descargando 10.jpg:', chosen.title, `${chosen.imageinfo[0].width}x${chosen.imageinfo[0].height}`);
    await downloadFile(dl, path.join(targetDir, '10.jpg'));
  }

  // Buscar foto nocturna o de rayo para 7.jpg
  console.log('Buscando foto nocturna de relámpagos para 7.jpg...');
  const lightning = await search('Catatumbo lightning');
  const validLightning = lightning.filter(p => p.imageinfo && p.imageinfo[0].width >= 1500 && !p.title.includes('MODIS'));
  if (validLightning.length > 0) {
    // Tomar una diferente a 1.jpg
    const chosen = validLightning.find(p => !p.title.includes('Catatumbo Lightning - Rayo del Catatumbo')) || validLightning[0];
    const dl = chosen.imageinfo[0].thumburl || chosen.imageinfo[0].url;
    console.log('  -> Descargando 7.jpg:', chosen.title, `${chosen.imageinfo[0].width}x${chosen.imageinfo[0].height}`);
    await downloadFile(dl, path.join(targetDir, '7.jpg'));
  }
}

run();
