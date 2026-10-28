const https = require('https');
const fs = require('fs');
const path = require('path');

const agent = new https.Agent({ rejectUnauthorized: false });
const USER_AGENT = 'ConociendoMiTierraApp/1.0 (https://github.com/conociendo-mi-tierra; edu-contact@conociendomitierra.org)';
const targetDir = path.join('public', 'images', 'destinations', 'cinaruco');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const items = [
  {
    step: '1',
    fileTitle: 'File:Laguna de Cinaruco en el edo apure via amazonas.JPG',
    title: 'Laguna y Aguas Claras del Cinaruco',
    desc: 'Espejo de agua transparente y arenas blancas en el bajo Apure'
  },
  {
    step: '2',
    fileTitle: 'File:Cinaruco Post.JPG',
    title: 'Playas Fluviales de Arena Blanca',
    desc: 'Extensos bancos de arena blanca de cuarzo que emergen en la temporada seca'
  },
  {
    step: '3',
    fileTitle: 'File:Cichla Temensis from Cinaruco1.jpg',
    title: 'El Pavón Real del Cinaruco',
    desc: 'El pez deportivo más codiciado de agua dulce (Cichla temensis) en su hábitat natural'
  },
  {
    step: '4',
    fileTitle: 'File:CinarucoRiverF4S1.jpg',
    title: 'Bosques de Galería y Riberas Vírgenes',
    desc: 'Corredores selváticos que acompañan las curvas del río a través de la llanura'
  },
  {
    step: '5',
    fileTitle: 'File:Cinaruco Post 2.JPG',
    title: 'Remanso de Aguas Cristalinas',
    desc: 'Aguas filtradas por la arena con visibilidad de varios metros de profundidad'
  },
  {
    step: '6',
    fileTitle: 'File:Parque Nacional Santos Luzardo.JPG',
    title: 'Parque Nacional Santos Luzardo',
    desc: 'Monumento natural de sabanas infinitas entre los ríos Cinaruco y Capanaparo'
  },
  {
    step: '7',
    fileTitle: 'File:Cinaruco Post 3.JPG',
    title: 'Campamento Llanero a Orillas del Río',
    desc: 'Travesía de aventura y campamentos bajo la inmensidad del cielo llanero'
  },
  {
    step: '8',
    fileTitle: 'File:Capanaparo river.jpg',
    title: 'El Río Capanaparo Hermano',
    desc: 'El río paralelo que delimita el parque nacional y alimenta los morichales'
  },
  {
    step: '9',
    fileTitle: 'File:Río Capanaparo.jpg',
    title: 'Barranco y Playón del Cinaruco-Capanaparo',
    desc: 'Relieve de médanos y playones fluviales en la confluencia con el Orinoco'
  },
  {
    step: '10',
    fileTitle: 'File:Capanaparo Sunset.JPG',
    title: 'Atardecer de Fuego en la Sabana de Cinaruco',
    desc: 'El crepúsculo llanero tiñendo las aguas del río de cobre y carmesí'
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
  console.log('Descargando 10 fotos HD verificadas de Río Cinaruco...\n');
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
        webPath: `/images/destinations/cinaruco/${filename}`,
        sizeKb: downloadedSize,
        wikimediaTitle: item.fileTitle
      });
    } catch (err) {
      console.error(`Error en ${item.title}:`, err.message);
    }
  }

  fs.writeFileSync(path.join(targetDir, 'manifest.json'), JSON.stringify(manifest, null, 2));
  console.log(`Completado: ${manifest.length}/10 imágenes de Cinaruco listas en ${targetDir}`);
}

run();
