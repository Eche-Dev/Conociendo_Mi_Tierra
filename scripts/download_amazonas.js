const https = require('https');
const fs = require('fs');
const path = require('path');

const agent = new https.Agent({ rejectUnauthorized: false });
const USER_AGENT = 'ConociendoMiTierraApp/1.0 (https://github.com/conociendo-mi-tierra; edu-contact@conociendomitierra.org)';
const targetDir = path.join('public', 'images', 'destinations', 'amazonas-profunda');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const targets = [
  { step: '1', title: 'File:Cerro Autana.jpg', desc: 'Monumento Natural Cerro Autana (Wahari Kuawai), el sagrado Árbol de la Vida piaroa' },
  { step: '2', title: 'File:Bongo autana.jpg', desc: 'Navegación en bongo por los ríos Sipapo y Autana a través de la selva virgen' },
  { step: '3', title: 'File:Churuatayekuana.jpg', desc: 'La Churuata tradicional yekuana, arquitectura cósmica comunitaria' },
  { step: '4', title: 'File:Monumento natural piedra de la tortuga amazonas.JPG', desc: 'Monumento Natural Piedra La Tortuga, colosal domo granítico cerca de Puerto Ayacucho' },
  { step: '5', title: 'File:Caverna en la piedra de la tortuga cementerio indigena amazonas.JPG', desc: 'Cuevas sagradas y cementerio ancestral indígena en la Piedra La Tortuga' },
  { step: '6', title: 'File:Piscinas Naturales Tobogán de La Selva.JPG', desc: 'Tobogán de la Selva, lajas de granito pulidas por el río formando toboganes y pozas naturales' },
  { step: '7', title: 'File:Rio Atabapo, Inirida, Guania - panoramio.jpg', desc: 'Río Atabapo, aguas oscuras color té y arenas blancas en el confín sur' },
  { step: '8', title: 'File:Pedra de Cucuí, Amazonas.jpg', desc: 'Piedra del Cocuy, monolito de granito que marca la triple frontera de Venezuela, Brasil y Colombia' },
  { step: '9', title: 'File:Rio orinoco puerto ayacucho venezuela.JPG', desc: 'El padre río Orinoco bramando a su paso por los raudales de Puerto Ayacucho' },
  { step: '10', title: 'File:Orinoco-Landschaft.JPG', desc: 'Atardecer de fuego sobre la inmensidad de la selva y el horizonte fluvial de Amazonas' }
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
  console.log('Descargando 10 fotos HD verificadas de Amazonas Profunda...');
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
