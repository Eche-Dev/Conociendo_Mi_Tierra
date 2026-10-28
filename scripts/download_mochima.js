const https = require('https');
const fs = require('fs');
const path = require('path');

const agent = new https.Agent({ rejectUnauthorized: false });
const USER_AGENT = 'ConociendoMiTierraApp/1.0 (https://github.com/conociendo-mi-tierra; edu-contact@conociendomitierra.org)';
const targetDir = path.join('public', 'images', 'destinations', 'mochima');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const items = [
  {
    step: '1',
    fileTitle: 'File:Venezuela - Mochima - Playa Colorada.jpg',
    title: 'Playa Colorada',
    desc: 'Arenas rojizas y aguas cristalinas bajo la sombra de los cocotales'
  },
  {
    step: '2',
    fileTitle: 'File:Playa Blanca Mochima 2026.jpg',
    title: 'Playa Blanca y Ensenada de Mochima',
    desc: 'Caleta protegida de arena blanca y aguas transparentes como una piscina'
  },
  {
    step: '3',
    fileTitle: 'File:Paseo de los delfines, Parque Nacional Mochima.JPG',
    title: 'Avistamiento de Delfines en el Golfo',
    desc: 'Manadas de delfines nariz de botella surcando las aguas calmas del parque'
  },
  {
    step: '4',
    fileTitle: 'File:Mochima park from the hills of Los Altos de Santa Fe.jpg',
    title: 'Mirador Altos de Santa Fe',
    desc: 'Las montañas de la Cordillera de la Costa sumergiéndose directamente en el Mar Caribe'
  },
  {
    step: '5',
    fileTitle: 'File:Isla de Plata.JPG',
    title: 'Isla de Plata y sus Arrecifes',
    desc: 'Famoso cayo de aguas esmeralda donde según la leyenda piratas enterraban sus tesoros'
  },
  {
    step: '6',
    fileTitle: 'File:Playa el Faro Puerto La Cruz Mochima - panoramio.jpg',
    title: 'Playa El Faro e Islas Chimanas',
    desc: 'Ensenada de aguas turquesas entre acantilados áridos y cactus costeros'
  },
  {
    step: '7',
    fileTitle: 'File:Punta Aguirre, Blanca Beach, Mochima National Park, Sucre State, Venezuela 2026 (1) (cropped).jpg',
    title: 'Punta Aguirre y Farallones Marinos',
    desc: 'Escarpes rocosos donde anidan pelícanos y alcatraces sobre el mar'
  },
  {
    step: '8',
    fileTitle: 'File:Bahía de Mochima, Estado Sucre, Venezuela 2026.jpg',
    title: 'La Bahía de Mochima y el Pueblo Pesquero',
    desc: 'Pintoresca ensenada abrigada del viento donde atracan los peñeros de pescadores'
  },
  {
    step: '9',
    fileTitle: 'File:Atardecer en Isla de Plata, Parque Nacional Mochima.JPG',
    title: 'Ocaso en Isla de Plata',
    desc: 'El sol descendiendo entre palmeras y destellos dorados sobre el mar sereno'
  },
  {
    step: '10',
    fileTitle: 'File:Atardecer en Mochima.JPG',
    title: 'Crepúsculo en el Mar Caribe Oriental',
    desc: 'La cordillera y las islas recortadas en tonos púrpura sobre el horizonte'
  }
];

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { agent, headers: { 'User-Agent': USER_AGENT } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    });
    req.on('error', reject);
  });
}

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
      file.on('finish', () => {
        file.close(() => resolve(destPath));
      });
    });
    req.on('error', (err) => {
      file.close();
      if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
      reject(err);
    });
  });
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function run() {
  console.log('Descargando 10 fotos HD verificadas de Parque Nacional Mochima...\n');
  const manifest = [];

  for (const item of items) {
    try {
      const infoUrl = `https://commons.wikimedia.org/w/api.php?action=query&format=json&titles=${encodeURIComponent(item.fileTitle)}&prop=imageinfo&iiprop=url|size&iiurlwidth=2048`;
      const data = await fetchJson(infoUrl);
      const pages = Object.values(data.query.pages);
      if (!pages[0] || !pages[0].imageinfo) {
        console.error('No info for:', item.fileTitle);
        continue;
      }
      const info = pages[0].imageinfo[0];
      const downloadUrl = info.thumburl || info.url;
      const filename = `${item.step}.jpg`;
      const destPath = path.join(targetDir, filename);

      console.log(`[${item.step}/10] ${item.title}`);
      console.log(`       Archivo: ${item.fileTitle} (${info.width}x${info.height})`);
      console.log(`       Lugar: ${item.desc}`);

      await sleep(1000);
      await downloadFile(downloadUrl, destPath);

      const downloadedSize = Math.round(fs.statSync(destPath).size / 1024);
      console.log(`       -> Descargado con éxito: ${filename} (${downloadedSize} KB)\n`);

      manifest.push({
        step: item.step,
        title: item.title,
        desc: item.desc,
        filename,
        webPath: `/images/destinations/mochima/${filename}`,
        sizeKb: downloadedSize,
        wikimediaTitle: item.fileTitle
      });
    } catch (err) {
      console.error(`Error en ${item.title}:`, err.message);
    }
  }

  fs.writeFileSync(path.join(targetDir, 'manifest.json'), JSON.stringify(manifest, null, 2));
  console.log(`Completado: ${manifest.length}/10 imágenes de Mochima listas en ${targetDir}`);
}

run();
