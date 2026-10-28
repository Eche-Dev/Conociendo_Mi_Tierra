const https = require('https');
const fs = require('fs');
const path = require('path');

const agent = new https.Agent({ rejectUnauthorized: false });
const USER_AGENT = 'ConociendoMiTierraApp/1.0 (https://github.com/conociendo-mi-tierra; edu-contact@conociendomitierra.org)';
const targetDir = path.join('public', 'images', 'destinations', 'angostura');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const targets = [
  { step: '1', title: 'File:Angostura y su puente.JPG', desc: 'El colosal Puente de Angostura cruzando el río Orinoco' },
  { step: '2', title: 'File:Cdad. Bolívar 110514-8.JPG', desc: 'Casco Histórico colonial de Ciudad Bolívar con sus calles empedradas y casonas de colores' },
  { step: '3', title: 'File:House of the Congress of Angostura.jpg', desc: 'Casa del Congreso de Angostura frente a la Plaza Bolívar' },
  { step: '4', title: 'File:Plaza bolivar, ciudad bolivar.jpg', desc: 'Plaza Bolívar, corazón cívico e histórico de la capital guayanesa' },
  { step: '5', title: 'File:Cathedral of Ciudad Bolivar.jpg', desc: 'Catedral Metropolitana Santo Tomás de Ciudad Bolívar' },
  { step: '6', title: 'File:Cdad. Bolívar 110514-3.JPG', desc: 'Casa San Isidro, histórica quinta donde Simón Bolívar redactó el Discurso de Angostura' },
  { step: '7', title: 'File:Zamuro el Fortin.JPG', desc: 'Fortín El Zamuro, baluarte militar del siglo XVIII en la colina más alta' },
  { step: '8', title: 'File:Paseo del Orinoco.jpg', desc: 'Paseo Orinoco y malecón fluvial frente a la parte más estrecha del río' },
  { step: '9', title: 'File:Museo Jesus Soto.JPG', desc: 'Museo de Arte Moderno Jesús Soto, joya cinetista venezolana' },
  { step: '10', title: 'File:Atardecer de Oro.jpg', desc: 'Atardecer de Oro sobre las aguas majestuosas del río Orinoco en Ciudad Bolívar' }
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
  console.log('Descargando 10 fotos HD verificadas de Angostura / Ciudad Bolívar...');
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
