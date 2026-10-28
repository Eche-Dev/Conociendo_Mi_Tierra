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
  const targetDir = path.join('public', 'images', 'destinations', 'los-llanos');

  // 6. Morichal específicamente en Venezuela
  console.log('Buscando 6.jpg (Morichal en Venezuela)...');
  const p6 = await searchExact('Morichal Venezuela');
  const valid6 = p6.filter(p => p.imageinfo && !p.title.includes('Colombia') && !p.title.includes('Vichada'));
  if (valid6.length > 0) {
    const chosen = valid6[0];
    const dl = chosen.imageinfo[0].thumburl || chosen.imageinfo[0].url;
    console.log('  -> 6.jpg:', chosen.title, `${chosen.imageinfo[0].width}x${chosen.imageinfo[0].height}`);
    await downloadFile(dl, path.join(targetDir, '6.jpg'));
  }

  // 8. Garzón Soldado (Jabirú) o Venado en los Llanos de Venezuela
  console.log('Buscando 8.jpg (Jabirú / Garzón soldado en los Llanos de Venezuela)...');
  const p8 = await searchExact('Jabiru mycteria Venezuela OR Garzon soldado Venezuela');
  if (p8.length > 0 && p8[0].imageinfo) {
    const chosen = p8[0];
    const dl = chosen.imageinfo[0].thumburl || chosen.imageinfo[0].url;
    console.log('  -> 8.jpg:', chosen.title, `${chosen.imageinfo[0].width}x${chosen.imageinfo[0].height}`);
    await downloadFile(dl, path.join(targetDir, '8.jpg'));
  }

  console.log('¡Refinamiento de Los Llanos completado!');
}

run();
