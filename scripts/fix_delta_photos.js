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
  const url = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=${encodeURIComponent(q)}&gsrnamespace=6&gsrlimit=12&prop=imageinfo&iiprop=url|size&iiurlwidth=2048`;
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
  const targetDir = path.join('public', 'images', 'destinations', 'delta-orinoco');

  // 2. Curiara y Warao
  console.log('Buscando 2.jpg (Curiara Warao)...');
  const warao = await search('Warao OR Waraos');
  const validWarao = warao.filter(p => p.imageinfo && p.imageinfo[0].width >= 1200);
  if (validWarao.length > 0) {
    const chosen = validWarao.find(p => p.title.toLowerCase().includes('curiara') || p.title.toLowerCase().includes('canoa') || p.title.toLowerCase().includes('delta')) || validWarao[0];
    const dl = chosen.imageinfo[0].thumburl || chosen.imageinfo[0].url;
    console.log('  -> 2.jpg:', chosen.title);
    await downloadFile(dl, path.join(targetDir, '2.jpg'));
  }

  // 4. Caño Mánamo o río del delta
  console.log('Buscando 4.jpg (Caño del Delta / Tucupita)...');
  const deltaCanos = await search('Orinoco Delta river');
  const validCanos = deltaCanos.filter(p => p.imageinfo && p.imageinfo[0].width >= 1500 && !p.title.includes('110514-22'));
  if (validCanos.length > 0) {
    const chosen = validCanos[0];
    const dl = chosen.imageinfo[0].thumburl || chosen.imageinfo[0].url;
    console.log('  -> 4.jpg:', chosen.title);
    await downloadFile(dl, path.join(targetDir, '4.jpg'));
  }

  // 8. Vida en el caño / navegación
  console.log('Buscando 8.jpg (Navegación / Caños del Orinoco)...');
  const delta8 = await search('Delta del Orinoco');
  const existingFiles = ['110514-22', '110514-10', '110514-6', '110514-26'];
  const valid8 = delta8.filter(p => p.imageinfo && p.imageinfo[0].width >= 1500 && !existingFiles.some(ex => p.title.includes(ex)));
  if (valid8.length > 0) {
    const chosen = valid8[0];
    const dl = chosen.imageinfo[0].thumburl || chosen.imageinfo[0].url;
    console.log('  -> 8.jpg:', chosen.title);
    await downloadFile(dl, path.join(targetDir, '8.jpg'));
  }

  // 9. Paisaje de selva del Delta
  console.log('Buscando 9.jpg (Paisaje selvático del Delta)...');
  if (valid8.length > 1) {
    const chosen = valid8[1];
    const dl = chosen.imageinfo[0].thumburl || chosen.imageinfo[0].url;
    console.log('  -> 9.jpg:', chosen.title);
    await downloadFile(dl, path.join(targetDir, '9.jpg'));
  }

  console.log('¡Descarga complementaria finalizada!');
}

run();
