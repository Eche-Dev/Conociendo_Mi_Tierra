const https = require('https');
const fs = require('fs');
const path = require('path');

const agent = new https.Agent({ rejectUnauthorized: false });
const USER_AGENT = 'ConociendoMiTierraApp/1.0 (https://github.com/conociendo-mi-tierra; edu-contact@conociendomitierra.org)';
const targetDir = path.join('public', 'images', 'destinations', 'andes-secretos');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const targets = [
  { step: '1', title: 'File:Lagunas y montañas del parque nacional general juan pablo peñaloza paramo batallon.jpg', desc: 'Páramo El Batallón y La Negra, lagunas glaciares y crestas afiladas' },
  { step: '2', title: 'File:Frailejones y de fondo La Laguna Grande - Páramo Batallón y La Negra - Parque nacional General Juan Pablo Peñaloza.jpg', desc: 'Bosques de frailejones gigantes frente a La Laguna Grande' },
  { step: '3', title: 'File:Laguna la Ciénaga - Páramo Batallón y La Negra - Parque nacional General Juan Pablo Peñaloza.jpg', desc: 'Espejo de agua glacial de la Laguna La Ciénaga a más de 3.200 msnm' },
  { step: '4', title: 'File:Plano conocido como El Miradero - Páramo Batallón y La Negra - Parque nacional General Juan Pablo Peñaloza.jpg', desc: 'Planicie de alta montaña El Miradero dominando los valles tachirenses y merideños' },
  { step: '5', title: 'File:Laguna.. - panoramio.jpg', desc: 'Laguna glacial a 3.600 msnm en las faldas de la Teta de Niquitao y Guirigay' },
  { step: '6', title: 'File:Laguna de los Cedros I.JPG', desc: 'Laguna de Los Cedros en el Parque Nacional Guaramacal, Boconó' },
  { step: '7', title: 'File:Bocono, Trujillo, Venezuela - panoramio.jpg', desc: 'Boconó, el Jardín de Venezuela, entre colinas verdes y cafetales' },
  { step: '8', title: 'File:Chiguara.jpg', desc: 'Pueblo tradicional andino de Chiguará con sus casas coloniales y techos de teja' },
  { step: '9', title: 'File:Valle de Mifafí, Parque Nacional Sierra de La Culata.jpg', desc: 'Valle glaciar de Mifafí, santuario y corredor del cóndor andino' },
  { step: '10', title: 'File:Neblina en el páramo.JPG', desc: 'El mar de niebla y viento helado al atardecer sobre los páramos andinos' }
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
  console.log('Descargando 10 fotos HD verificadas de Andes Secretos...');
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
