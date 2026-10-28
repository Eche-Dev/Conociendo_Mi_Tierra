const https = require('https');
const fs = require('fs');
const path = require('path');

const agent = new https.Agent({ rejectUnauthorized: false });
const USER_AGENT = 'ConociendoMiTierraApp/1.0 (https://github.com/conociendo-mi-tierra; edu-contact@conociendomitierra.org)';
const targetDir = path.join('public', 'images', 'destinations', 'piedra-pintada');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const targets = [
  { step: '1', title: 'File:Petroglifos en Vigirima.jpg', desc: 'Petroglifos indígenas en el Parque Arqueológico Piedra Pintada de Vigirima' },
  { step: '2', title: 'File:PETROGLIFOS. PIEDRA EL INDIO.jpg', desc: 'Grabados rupestres en la Piedra del Indio en el valle de Vigirima' },
  { step: '3', title: 'File:Petroglifos espirales.jpg', desc: 'Espirales sagradas grabadas en la roca, símbolo del agua y la fertilidad' },
  { step: '4', title: 'File:Petroglifos variados.jpg', desc: 'Figuras antropomorfas y chamanes grabados por pueblos originarios' },
  { step: '5', title: 'File:Petroglifos en piedra.jpg', desc: 'Alineación de monolitos ceremoniales y arte rupestre prehispánico' },
  { step: '6', title: 'File:Rio San Estaban - Camino de los españoles.JPG', desc: 'Camino colonial empedrado de los españoles en el Parque Nacional San Esteban' },
  { step: '7', title: 'File:Camino a San Esteban.JPG', desc: 'Bosque húmedo premontano y senderos ancestrales que unen la costa con el valle' },
  { step: '8', title: 'File:Rio San Esteban 1.JPG', desc: 'Corrientes cristalinas y rocas del río San Esteban cruzando la cordillera' },
  { step: '9', title: 'File:Pozo el Pajuí - Rio San Esteban.JPG', desc: 'Pozas naturales de agua fresca como Pozo El Pajuí bajo la canopia selvática' },
  { step: '10', title: 'File:San Esteban Loma Linda.jpg', desc: 'Panorámica de las cumbres verdes del Parque Nacional San Esteban al atardecer' }
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
  console.log('Descargando 10 fotos HD verificadas de Piedra Pintada y San Esteban...');
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
