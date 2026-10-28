const https = require('https');
const fs = require('fs');
const path = require('path');

const agent = new https.Agent({ rejectUnauthorized: false });
const USER_AGENT = 'ConociendoMiTierraApp/1.0 (https://github.com/conociendo-mi-tierra; edu-contact@conociendomitierra.org)';
const targetDir = path.join('public', 'images', 'destinations', 'sorte-quibayo');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const targets = [
  { step: '1', title: 'File:Cerro Maria lionza.jpg', desc: 'Monumento Natural Cerro María Lionza en Sorte, Yaracuy' },
  { step: '2', title: 'File:Rio Yaracuy, Sorte, Venezuela..jpg', desc: 'El Río Sorte y quebradas de purificación en la selva' },
  { step: '3', title: 'File:Altar Mayor Quibayo.jpg', desc: 'El Altar Mayor del sector Quibayo' },
  { step: '4', title: 'File:Altar Mayor en Sorte.jpg', desc: 'El Altar Mayor en el corazón boscoso de Sorte' },
  { step: '5', title: 'File:Las tres potencias de Sorte.jpg', desc: 'Las Tres Potencias de Sorte: María Lionza, Guaicaipuro y Negro Felipe' },
  { step: '6', title: 'File:Maria Lionza en medio de las rocas.jpg', desc: 'Ofrendas de fe y nicho de María Lionza entre las rocas del río' },
  { step: '7', title: 'File:Personificación de las tres potencias.jpg', desc: 'Devoción popular y médiums tradicionales en la montaña' },
  { step: '8', title: 'File:Baile en candela sorte.jpg', desc: 'El legendario Baile en Candela sobre brasas al rojo vivo' },
  { step: '9', title: 'File:Estatua de María Lionza en Chivacoa, Yaracuy, Venezuela..JPG', desc: 'Estatua monumental de María Lionza sobre la danta en Chivacoa' },
  { step: '10', title: 'File:Plaza Bolívar de Chivacoa.jpg', desc: 'Plaza Bolívar de Chivacoa, pueblo hospitalario de Yaracuy' }
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
  console.log('Descargando 10 fotos HD verificadas de Sorte y Quibayo...');
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
      console.log(`       -> Descargado con éxito: ${item.step}.jpg (${sz} KB)`);
    } catch (err) {
      console.error(`       Error: ${err.message}`);
    }
  }
  console.log('\n=======================================================');
  console.log(`Descarga finalizada. Guardado en: ${targetDir}`);
}

run();
