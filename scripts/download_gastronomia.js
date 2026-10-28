const https = require('https');
const fs = require('fs');
const path = require('path');

const agent = new https.Agent({ rejectUnauthorized: false });
const USER_AGENT = 'ConociendoMiTierraApp/1.0 (https://github.com/conociendo-mi-tierra; edu-contact@conociendomitierra.org)';
const targetDir = path.join('public', 'images', 'gastronomia');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const targets = [
  { id: 'pabellon-criollo', title: 'File:Pabellón Criollo Venezolano.jpg' },
  { id: 'arepas-venezolanas', title: 'File:Arepas venezolanas.jpg' },
  { id: 'hallaca-navidena', title: 'File:Hallaca, Venezuelan Christmas food.jpg' },
  { id: 'cachapa-queso-de-mano', title: 'File:Cachapas con queso de mano.JPG' },
  { id: 'tequenos', title: 'File:Tequeños Venezolanos.jpg' },
  { id: 'empanadas-criollas', title: 'File:Empanadas de Venezuela.jpg' },
  { id: 'asado-negro', title: 'File:Arepa Asado Negro (1), boeuf rôti, avocat, tomates.jpg' },
  { id: 'mandocas-zulianas', title: 'File:Mandocaszulianas.JPG' },
  { id: 'casabe-ancestral', title: 'File:Casabe-3.jpg' },
  { id: 'quesillo-venezolano', title: 'File:Quesillo de Venezuela.jpg' },
  { id: 'golfeados', title: 'File:Golfeado.jpg' },
  { id: 'dulce-de-lechosa', title: 'File:Dulce de lechosa.jpg' },
  { id: 'papelon-con-limon', title: 'File:Vendedor de Papelón con limón.jpg' },
  { id: 'chicha-criolla', title: 'File:Chicha venezolana.jpg' },
  { id: 'cacao-chuao', title: 'File:Cacao Chuao 1.jpg' },
  { id: 'queso-de-mano', title: 'File:Cachapa Con Queso e Mano.JPG' }
];

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { agent, headers: { 'User-Agent': USER_AGENT } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    });
    req.on('error', reject);
  });
}

function downloadImage(url, destPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destPath);
    https.get(url, { agent, headers: { 'User-Agent': USER_AGENT } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadImage(res.headers.location, destPath).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        file.close();
        fs.unlink(destPath, () => {});
        return reject(new Error(`Status ${res.statusCode}`));
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve());
      });
    }).on('error', (err) => {
      file.close();
      fs.unlink(destPath, () => {});
      reject(err);
    });
  });
}

async function run() {
  console.log('Descargando fotografías HD verificadas para Gastronomía Venezolana...');
  for (const item of targets) {
    const url = `https://commons.wikimedia.org/w/api.php?action=query&format=json&titles=${encodeURIComponent(item.title)}&prop=imageinfo&iiprop=url|size|mime&iiurlwidth=2048`;
    const res = await fetchJson(url);
    const pages = Object.values(res.query.pages);
    if (!pages[0] || !pages[0].imageinfo) {
      console.warn(`[AVISO] No se encontró ${item.title}`);
      continue;
    }
    const info = pages[0].imageinfo[0];
    const imgUrl = info.thumburl || info.url;
    const dest = path.join(targetDir, `${item.id}.jpg`);
    console.log(`Descargando ${item.id} desde ${item.title} (${info.width}x${info.height})...`);
    try {
      await downloadImage(imgUrl, dest);
      const sz = Math.round(fs.statSync(dest).size / 1024);
      console.log(`-> Guardado: ${dest} (${sz} KB)`);
    } catch (err) {
      console.error(`Error en ${item.id}: ${err.message}`);
    }
  }
  console.log('Descarga completada en:', targetDir);
}

run();
