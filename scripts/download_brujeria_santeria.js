const https = require('https');
const fs = require('fs');
const path = require('path');

const agent = new https.Agent({ rejectUnauthorized: false });
const USER_AGENT = 'ConociendoMiTierraApp/1.0 (https://github.com/conociendo-mi-tierra; edu-contact@conociendomitierra.org)';
const targetDir = path.join('public', 'images', 'destinations', 'brujeria-santeria');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Map files: some from verified Wikimedia Commons, some from local verified espiritualidad assets
const downloads = [
  { step: '3', title: 'File:San Juan en Curiepe.JPG' },
  { step: '4', title: 'File:Dancing Devils of Yare Mask from Venezuela.jpg' },
  { step: '5', title: 'File:Nazareno de San Pablo 2.jpg' },
  { step: '6', title: 'File:Dr. José Gregorio Hernández II.jpg' },
  { step: '7', title: 'File:Virgen del Valle, Isla de Margarita, Venezuela.jpg' }
];

const localCopies = [
  { step: '1', src: path.join('public', 'images', 'espiritualidad', 'tres-potencias-sorte.jpg') },
  { step: '2', src: path.join('public', 'images', 'espiritualidad', 'corte-cale-ismaelito.jpg') },
  { step: '8', src: path.join('public', 'images', 'espiritualidad', 'baile-candela-noche.jpg') },
  { step: '9', src: path.join('public', 'images', 'espiritualidad', 'altar-mayor-sorte.jpg') },
  { step: '10', src: path.join('public', 'images', 'destinations', 'sorte-quibayo', '1.jpg') }
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
  console.log('Copiando archivos locales verificados...');
  for (const item of localCopies) {
    const dest = path.join(targetDir, `${item.step}.jpg`);
    if (fs.existsSync(item.src)) {
      fs.copyFileSync(item.src, dest);
      const sz = Math.round(fs.statSync(dest).size / 1024);
      console.log(`Copiado [${item.step}/10] desde ${item.src} (${sz} KB)`);
    } else {
      console.warn(`No existe origen ${item.src}`);
    }
  }

  console.log('\nDescargando desde Wikimedia Commons...');
  for (const item of downloads) {
    const url = `https://commons.wikimedia.org/w/api.php?action=query&format=json&titles=${encodeURIComponent(item.title)}&prop=imageinfo&iiprop=url|size|mime&iiurlwidth=2048`;
    const res = await fetchJson(url);
    const pages = Object.values(res.query.pages);
    if (!pages[0] || !pages[0].imageinfo) {
      console.warn(`No se encontró ${item.title}`);
      continue;
    }
    const info = pages[0].imageinfo[0];
    const imgUrl = info.thumburl || info.url;
    const dest = path.join(targetDir, `${item.step}.jpg`);
    console.log(`Descargando [${item.step}/10] ${item.title} (${info.width}x${info.height})...`);
    await downloadImage(imgUrl, dest);
    const sz = Math.round(fs.statSync(dest).size / 1024);
    console.log(`Guardado ${dest} (${sz} KB)`);
  }

  console.log('\n=======================================================');
  console.log(`Completado: 10/10 imágenes listas en ${targetDir}`);
}

run();
