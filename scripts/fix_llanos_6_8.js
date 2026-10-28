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
  const targetDir = path.join('public', 'images', 'destinations', 'los-llanos');

  // Buscar foto real de fauna silvestre llanera (Oso Palmero / Oso Hormiguero gigante o Venado en los Llanos)
  console.log('Buscando fauna llanera HD para 8.jpg...');
  const fauna = await search('Oso palmero Venezuela OR Giant anteater Venezuela OR Myrmecophaga tridactyla');
  const validFauna = fauna.filter(p => p.imageinfo && p.imageinfo[0].width >= 1500 && (p.title.includes('anteater') || p.title.includes('palmero') || p.title.includes('Myrmecophaga')));
  if (validFauna.length > 0) {
    const chosen = validFauna[0];
    const dl = chosen.imageinfo[0].thumburl || chosen.imageinfo[0].url;
    console.log('  -> 8.jpg (Oso Palmero):', chosen.title, `${chosen.imageinfo[0].width}x${chosen.imageinfo[0].height}`);
    await downloadFile(dl, path.join(targetDir, '8.jpg'));
  }

  // Buscar morichal / palmares en los Llanos venezolanos para 6.jpg
  console.log('Buscando Morichal / Palmar llanero HD para 6.jpg...');
  const morichal = await search('Morichales Venezuela OR Palmeras Llanos Venezuela');
  const validMori = morichal.filter(p => p.imageinfo && p.imageinfo[0].width >= 1500 && !p.title.includes('Colombia'));
  if (validMori.length > 0) {
    const chosen = validMori[0];
    const dl = chosen.imageinfo[0].thumburl || chosen.imageinfo[0].url;
    console.log('  -> 6.jpg (Morichal Llanero):', chosen.title, `${chosen.imageinfo[0].width}x${chosen.imageinfo[0].height}`);
    await downloadFile(dl, path.join(targetDir, '6.jpg'));
  }
}

run();
