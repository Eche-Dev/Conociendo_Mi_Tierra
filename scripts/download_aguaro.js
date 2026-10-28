const https = require('https');
const fs = require('fs');
const path = require('path');

const agent = new https.Agent({ rejectUnauthorized: false });
const USER_AGENT = 'ConociendoMiTierraApp/1.0 (https://github.com/conociendo-mi-tierra; edu-contact@conociendomitierra.org)';
const targetDir = path.join('public', 'images', 'destinations', 'aguaro-guariquito');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const targets = [
  { step: '1', title: 'File:Parque Nacional Aguaro-Guariquito. Guárico Venezuela.JPG', desc: 'Paisaje virgen del Parque Nacional Aguaro-Guariquito, Guárico' },
  { step: '2', title: 'File:Estero de Camaguán.jpg', desc: 'La gran llanura inundable y espejos de agua de los esteros de Guárico' },
  { step: '3', title: 'File:Morichal (4295485024).jpg', desc: 'Morichales y fuentes de agua dulce perenne en la sabana llanera' },
  { step: '4', title: 'File:El chiguire de los Llanos Venezolanos.JPG', desc: 'Chigüires en su hábitat natural en las orillas de los ríos llaneros' },
  { step: '5', title: 'File:Crocodylus intermedius.jpg', desc: 'Santuario del Caimán del Orinoco en los ríos Aguaro y Guariquito' },
  { step: '6', title: 'File:CorocorasLlanos.jpg', desc: 'Vuelo de corocoras rojas y garzas sobre los humedales del llano' },
  { step: '7', title: 'File:Esteros 1e.JPG', desc: 'Vegetación acuática y palmas llaneras en la estación húmeda' },
  { step: '8', title: 'File:Esteros de Camaguán.jpg', desc: 'Cursos fluviales y esteros comunicando la sabana con el río Orinoco' },
  { step: '9', title: 'File:Los llanos venezolanos.JPG', desc: 'La sabana abierta infinita y cultura ganadera tradicional' },
  { step: '10', title: 'File:Atardecer en Esteros de Camaguán.jpg', desc: 'Atardecer dorado y cielo encendido sobre el horizonte llanero' }
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
  console.log('Descargando 10 fotos HD verificadas de Aguaro-Guariquito...');
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
