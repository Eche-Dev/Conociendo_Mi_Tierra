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

async function run() {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=Catedral%20Santa%20Ana%20Coro%20Falcon%20Venezuela&gsrnamespace=6&gsrlimit=10&prop=imageinfo&iiprop=url|size&iiurlwidth=2048`;
  const data = await new Promise(res => {
    https.get(url, { agent, headers: { 'User-Agent': USER_AGENT } }, r => {
      let d = '';
      r.on('data', c => d += c);
      r.on('end', () => res(JSON.parse(d)));
    });
  });

  const pages = Object.values(data.query.pages || {});
  const valid = pages.filter(p => {
    if (!p.imageinfo || !p.imageinfo[0]) return false;
    const t = p.title.toLowerCase();
    return (t.includes('coro') || t.includes('catedral')) && !t.includes('canarias');
  });

  console.log('Resultados para Catedral de Coro:');
  valid.forEach(v => console.log('-', v.title, v.imageinfo[0].width + 'x' + v.imageinfo[0].height));

  if (valid.length > 0) {
    const chosen = valid[0];
    const dl = chosen.imageinfo[0].thumburl || chosen.imageinfo[0].url;
    const dest = path.join('public', 'images', 'destinations', 'medanos-de-coro', '7.jpg');
    console.log('Descargando para 7.jpg:', chosen.title);
    await downloadFile(dl, dest);
    console.log('7.jpg actualizado con éxito:', fs.statSync(dest).size, 'bytes');
  }
}

run();
