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
  const targetDir = path.join('public', 'images', 'destinations', 'canaima');

  // 6. Tepuyes de Canaima / Auyantepuy desde el río
  console.log('Buscando foto HD de Auyantepuy / Río Carrao para 6.jpg...');
  const auyan = await search('Auyantepuy Carrao OR Auyantepui Canaima');
  const validAuyan = auyan.filter(p => p.imageinfo && p.imageinfo[0].width >= 1500);
  if (validAuyan.length > 0) {
    const chosen = validAuyan[0];
    const dl = chosen.imageinfo[0].thumburl || chosen.imageinfo[0].url;
    console.log('  -> 6.jpg:', chosen.title);
    await downloadFile(dl, path.join(targetDir, '6.jpg'));
  }

  // 8. Río Carrao / Curiara (usar Our-canoe-onto-Carrao-River o descargar una de alta resolución)
  console.log('Copiando o descargando para 8.jpg...');
  const vnzCanoe = path.join('public', 'images', 'vnz', 'Our-canoe-onto-Carrao-River.webp');
  if (fs.existsSync(vnzCanoe)) {
    fs.copyFileSync(vnzCanoe, path.join(targetDir, '8.jpg'));
    console.log('  -> 8.jpg copiada desde vnz: Our-canoe-onto-Carrao-River');
  }

  // 9. Salto Ucaima o rápidos de Canaima
  console.log('Buscando 9.jpg (Salto Ucaima / Río Carrao)...');
  const ucaima = await search('Salto Ucaima Canaima OR Ucaima rapids');
  const validUcaima = ucaima.filter(p => p.imageinfo && p.imageinfo[0].width >= 1200);
  if (validUcaima.length > 0) {
    const chosen = validUcaima[0];
    const dl = chosen.imageinfo[0].thumburl || chosen.imageinfo[0].url;
    console.log('  -> 9.jpg:', chosen.title);
    await downloadFile(dl, path.join(targetDir, '9.jpg'));
  } else {
    // Si no, buscar Canaima waterfall
    const falls = await search('Canaima waterfall river');
    if (falls.length > 0 && falls[0].imageinfo) {
      const dl = falls[0].imageinfo[0].thumburl || falls[0].imageinfo[0].url;
      console.log('  -> 9.jpg fallback:', falls[0].title);
      await downloadFile(dl, path.join(targetDir, '9.jpg'));
    }
  }

  console.log('¡Completado ajuste de Canaima!');
}

run();
