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
  const targetDir = path.join('public', 'images', 'destinations', 'salto-angel');

  // 1. Usar foto frontal del usuario de vnz o descargar una de alta calidad
  console.log('Asignando 1.jpg...');
  const vnzAngel = path.join('public', 'images', 'vnz', 'Angel-Falls-Canaima-Venezuela-tours-Osprey-Expeditions-64.jpg');
  if (fs.existsSync(vnzAngel)) {
    fs.copyFileSync(vnzAngel, path.join(targetDir, '1.jpg'));
    console.log('  -> 1.jpg copiada desde vnz');
  }

  // Buscar fotos en Wikimedia Commons para 4, 6, 7, 8
  console.log('Buscando fotos en Category:Angel Falls...');
  const results = await search('Salto Angel Venezuela');
  const valid = results.filter(p => p.imageinfo && p.imageinfo[0].width >= 1200 && !p.title.includes('map'));

  const stepsToFill = [
    { num: '4', desc: 'Río Churún / navegación hacia el salto' },
    { num: '6', desc: 'Caída de agua y bruma' },
    { num: '7', desc: 'Base del salto / rocas' },
    { num: '8', desc: 'Vista aérea de la cascada' }
  ];

  let idx = 0;
  for (const step of stepsToFill) {
    if (valid[idx]) {
      const chosen = valid[idx];
      const dl = chosen.imageinfo[0].thumburl || chosen.imageinfo[0].url;
      console.log(`  -> Descargando ${step.num}.jpg (${step.desc}):`, chosen.title);
      await downloadFile(dl, path.join(targetDir, `${step.num}.jpg`));
      idx++;
    }
  }

  console.log('¡Completado Salto Ángel!');
}

run();
