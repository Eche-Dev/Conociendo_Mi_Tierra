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

async function searchExact(query) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=10&prop=imageinfo&iiprop=url|size&iiurlwidth=2048`;
  return new Promise(resolve => {
    https.get(url, { agent, headers: { 'User-Agent': USER_AGENT } }, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        try {
          const json = JSON.parse(d);
          const pages = (json.query && json.query.pages) ? Object.values(json.query.pages) : [];
          resolve(pages);
        } catch (e) {
          resolve([]);
        }
      });
    }).on('error', () => resolve([]));
  });
}

async function run() {
  const targetDir = path.join('public', 'images', 'destinations', 'catatumbo');

  // Busquemos imágenes específicas verificadas:
  // 1. Rayo del Catatumbo (ya lo tenemos excelente en 1.jpg)
  // 2. Palafitos de Ologá (ya lo tenemos en 2.jpg)
  // 3. Palafitos Congo Mirador (ya lo tenemos en 3.jpg)

  // 4. Atardecer en el Lago de Maracaibo / Catatumbo
  console.log('Buscando 4.jpg (Atardecer Lago Maracaibo)...');
  const p4 = await searchExact('Atardecer Lago de Maracaibo Venezuela');
  if (p4.length > 0 && p4[0].imageinfo) {
    const dl = p4[0].imageinfo[0].thumburl || p4[0].imageinfo[0].url;
    console.log('  -> 4.jpg:', p4[0].title);
    await downloadFile(dl, path.join(targetDir, '4.jpg'));
  }

  // 6. Ciénagas y manglares de Zulia / Catatumbo
  console.log('Buscando 6.jpg (Ciénagas de Juan Manuel / Zulia)...');
  const p6 = await searchExact('Cienagas Zulia Venezuela OR manglar Lago Maracaibo');
  if (p6.length > 0 && p6[0].imageinfo) {
    const dl = p6[0].imageinfo[0].thumburl || p6[0].imageinfo[0].url;
    console.log('  -> 6.jpg:', p6[0].title);
    await downloadFile(dl, path.join(targetDir, '6.jpg'));
  }

  // 7. Relámpago en el horizonte nocturno
  console.log('Buscando 7.jpg (Relámpagos en el Lago)...');
  const p7 = await searchExact('Catatumbo lightning night sky');
  if (p7.length > 0 && p7[0].imageinfo) {
    const dl = p7[0].imageinfo[0].thumburl || p7[0].imageinfo[0].url;
    console.log('  -> 7.jpg:', p7[0].title);
    await downloadFile(dl, path.join(targetDir, '7.jpg'));
  }

  // 9. Nubes y tormenta sobre el Lago de Maracaibo
  console.log('Buscando 9.jpg (Tormenta sobre el Lago de Maracaibo)...');
  const p9 = await searchExact('Tormenta Lago de Maracaibo');
  if (p9.length > 0 && p9[0].imageinfo) {
    const dl = p9[0].imageinfo[0].thumburl || p9[0].imageinfo[0].url;
    console.log('  -> 9.jpg:', p9[0].title);
    await downloadFile(dl, path.join(targetDir, '9.jpg'));
  }

  // 10. Puente General Rafael Urdaneta sobre el Lago de Maracaibo
  console.log('Buscando 10.jpg (Puente sobre el Lago de Maracaibo)...');
  const p10 = await searchExact('Puente General Rafael Urdaneta');
  if (p10.length > 0 && p10[0].imageinfo) {
    const dl = p10[0].imageinfo[0].thumburl || p10[0].imageinfo[0].url;
    console.log('  -> 10.jpg:', p10[0].title);
    await downloadFile(dl, path.join(targetDir, '10.jpg'));
  }

  console.log('¡Refinamiento de Catatumbo completado!');
}

run();
