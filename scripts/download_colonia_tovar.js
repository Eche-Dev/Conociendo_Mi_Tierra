const https = require('https');
const fs = require('fs');
const path = require('path');

const agent = new https.Agent({ rejectUnauthorized: false });
const USER_AGENT = 'ConociendoMiTierraApp/1.0 (https://github.com/conociendo-mi-tierra; edu-contact@conociendomitierra.org)';
const targetDir = path.join('public', 'images', 'destinations', 'colonia-tovar');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const targets = [
  { step: '1', title: 'File:Entrada Colonia Tovar.jpg', desc: 'Arco de bienvenida y arquitectura tradicional en la entrada a la Colonia Tovar' },
  { step: '2', title: 'File:Casa en la Colonia Tovar.jpg', desc: 'Arquitectura tradicional de entramado de madera (Fachwerk) de la Selva Negra' },
  { step: '3', title: 'File:Iglesia de San Martín de Tours (Venezuela).JPG', desc: 'Histórica Iglesia San Martín de Tours en el corazón del pueblo' },
  { step: '4', title: 'File:COLONIA TOVAR 02.JPG', desc: 'Panorámica de los chalets alpinos y laderas cultivadas de la Colonia Tovar' },
  { step: '5', title: 'File:Subiendo a la Colonia Tovar - Climbing to La Colonia Tovar.JPG', desc: 'Ruta de ascenso por la vertiente de la Cordillera de la Costa entre neblinas' },
  { step: '6', title: 'File:Colonia Tovar Paisaje.JPG', desc: 'Terrazas agrícolas de fresas, duraznos y hortalizas de altura' },
  { step: '7', title: 'File:Colonia-Tovar.jpg', desc: 'Calles del centro del poblado, cervecerías artesanales y restaurantes típicos' },
  { step: '8', title: 'File:Silueta del Parque Nacional Waraira Repano (al fondo) visto desde Pico Codazzi.jpg', desc: 'Monumento Natural Pico Codazzi y vista de la cordillera' },
  { step: '9', title: 'File:Colonia Tovar - Aragua.jpg', desc: 'Pueblo de montaña entre jardines de hortensias y clima templado' },
  { step: '10', title: 'File:Virgen del Carmen (Colonia Tovar).jpg', desc: 'Miradores de altura y crepúsculo sobre las montañas de Aragua' }
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
  console.log('Descargando 10 fotos HD verificadas de La Colonia Tovar...');
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
    const dest = path.join(targetDir, `${item.step}.jpg`);
    console.log(`[${item.step}/10] ${item.title} (${info.width}x${info.height})`);
    console.log(`       ${item.desc}`);
    try {
      await downloadImage(imgUrl, dest);
      const sz = Math.round(fs.statSync(dest).size / 1024);
      console.log(`       -> Guardado: ${item.step}.jpg (${sz} KB)`);
    } catch (err) {
      console.error(`       Error: ${err.message}`);
    }
  }
  console.log('\n=======================================================');
  console.log(`Descarga finalizada. Guardado en: ${targetDir}`);
}

run();
