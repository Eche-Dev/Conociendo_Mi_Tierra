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

async function searchAndDownload(query, destPath, label) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=8&prop=imageinfo&iiprop=url|size&iiurlwidth=2048`;
  const data = await new Promise(resolve => {
    https.get(url, { agent, headers: { 'User-Agent': USER_AGENT } }, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => resolve(JSON.parse(d)));
    });
  });

  const pages = Object.values(data.query.pages || {});
  const valid = pages.filter(p => {
    if (!p.imageinfo || !p.imageinfo[0]) return false;
    const t = p.title.toLowerCase();
    const u = p.imageinfo[0].url.toLowerCase();
    return (u.includes('.jpg') || u.includes('.png')) && !t.includes('map') && !t.includes('icon');
  });

  if (valid.length > 0) {
    const chosen = valid[0];
    const dlUrl = chosen.imageinfo[0].thumburl || chosen.imageinfo[0].url;
    console.log(`[+] Reemplazando ${label} con: ${chosen.title} (${chosen.imageinfo[0].width}x${chosen.imageinfo[0].height})`);
    await downloadFile(dlUrl, destPath);
    console.log(`    Guardado con éxito: ${destPath} (${Math.round(fs.statSync(destPath).size / 1024)} KB)`);
  } else {
    console.warn(`[!] No se encontraron resultados para: ${query}`);
  }
}

async function run() {
  const targetDir = path.join('public', 'images', 'destinations', 'medanos-de-coro');

  // 4. Cujíes y vegetación xerófila auténtica de Falcón
  await searchAndDownload('Cuji Falcon Venezuela OR cujíes médanos', path.join(targetDir, '4.jpg'), '4.jpg (Cujíes)');

  // 5. Inmensidad del campo de dunas (diferente a 1.jpg)
  await searchAndDownload('Dunas en Médanos de Coro', path.join(targetDir, '5.jpg'), '5.jpg (Dunas)');

  // 7. Fachada de la Catedral de Santa Ana de Coro
  await searchAndDownload('Catedral de Santa Ana de Coro fachada', path.join(targetDir, '7.jpg'), '7.jpg (Fachada Catedral)');

  // 8. Casa de las Ventanas de Hierro o Balcón de los Arcaya (Joya colonial de Coro)
  await searchAndDownload('Casa de las Ventanas de Hierro Coro', path.join(targetDir, '8.jpg'), '8.jpg (Ventanas de Hierro)');
}

run();
