const https = require('https');
const fs = require('fs');
const path = require('path');

const agent = new https.Agent({ rejectUnauthorized: false });
const USER_AGENT = 'ConociendoMiTierraApp/1.0 (https://github.com/conociendo-mi-tierra; edu-contact@conociendomitierra.org)';
const targetDir = path.join('public', 'images', 'destinations', 'cachamay');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const targets = [
  {
    step: '1',
    title: 'Salto La Llovizna',
    query: 'Salto La Llovizna Caroni OR Parque La Llovizna cascada',
    fallbackQuery: 'Salto La Llovizna',
    desc: 'La catarata monumental del Caroní pulverizándose en una llovizna perpetua'
  },
  {
    step: '2',
    title: 'Mirador y Pasarela de La Llovizna',
    query: 'mirador La Llovizna OR pasarela Parque La Llovizna',
    fallbackQuery: 'Parque La Llovizna Puerto Ordaz',
    desc: 'La pasarela suspendida al borde del abismo frente a la fuerza del torrente'
  },
  {
    step: '3',
    title: 'Lagunas y Puentes de Piedra',
    query: 'laguna Parque La Llovizna OR puente La Llovizna',
    fallbackQuery: 'Parque La Llovizna',
    desc: 'Los senderos arbolados, estanques tranquilos y puentes de piedra natural'
  },
  {
    step: '4',
    title: 'Salto Cachamay',
    query: 'Salto Cachamay Puerto Ordaz OR Parque Cachamay cascada',
    fallbackQuery: 'Parque Cachamay',
    desc: 'La ancha cortina de agua espumosa precipitándose sobre los milenarios bloques de granito'
  },
  {
    step: '5',
    title: 'Río Caroní y Aguas de Té',
    query: 'Rio Caroni Puerto Ordaz OR Rio Caroni raudales',
    fallbackQuery: 'Rio Caroni',
    desc: 'El cauce majestuoso de aguas oscuras ricas en taninos de la selva guayanesa'
  },
  {
    step: '6',
    title: 'Represa de Macagua',
    query: 'represa Macagua Puerto Ordaz OR Central Hidroelectrica Macagua',
    fallbackQuery: 'Macagua Caroni',
    desc: 'La presa hidroeléctrica urbana que regula el caudal del bajo Caroní'
  },
  {
    step: '7',
    title: 'Confluencia del Orinoco y el Caroní',
    query: 'confluencia Orinoco Caroni OR union de los dos rios Caroni Orinoco',
    fallbackQuery: 'Caroni Orinoco',
    desc: 'El asombroso fenómeno donde las aguas negras del Caroní y las leonadas del Orinoco corren paralelas'
  },
  {
    step: '8',
    title: 'Fauna y Flora de la Selva Urbana',
    query: 'monos La Llovizna OR fauna Parque La Llovizna',
    fallbackQuery: 'Parque Cachamay vegetacion',
    desc: 'Monos capuchinos, iguanas y aves tropicales que habitan las copas del parque'
  },
  {
    step: '9',
    title: 'Puentes de Puerto Ordaz sobre el Caroní',
    query: 'puente sobre el Caroni Puerto Ordaz OR Ciudad Guayana Caroni',
    fallbackQuery: 'Puerto Ordaz Caroni',
    desc: 'Los puentes que unen Puerto Ordaz y San Félix cruzando la garganta rocosa del río'
  },
  {
    step: '10',
    title: 'Atardecer sobre el Caroní',
    query: 'atardecer Rio Caroni OR atardecer Puerto Ordaz',
    fallbackQuery: 'atardecer Cachamay Llovizna',
    desc: 'El crepúsculo rojizo sobre las islas de granito y el horizonte fluvial de Guayana'
  }
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

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function searchWikimedia(query) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=15&prop=imageinfo&iiprop=url|size|mime&iiurlwidth=2048`;
  const res = await fetchJson(url);
  if (!res.query || !res.query.pages) return [];
  
  const pages = Object.values(res.query.pages);
  const results = [];
  for (const page of pages) {
    if (!page.imageinfo || !page.imageinfo[0]) continue;
    const info = page.imageinfo[0];
    const mime = info.mime || '';
    if (!mime.startsWith('image/jpeg') && !mime.startsWith('image/png') && !mime.startsWith('image/webp')) continue;
    
    const title = page.title.toLowerCase();
    if (title.includes('map') || title.includes('hoja') || title.includes('dcn') || title.includes('icon') || title.includes('flag') || title.includes('logo') || title.includes('specimen') || title.includes('herbarium')) continue;
    
    const width = info.width || 0;
    const height = info.height || 0;
    if (width < 1000) continue;
    if (width / height < 1.05) continue;
    
    results.push({
      title: page.title,
      width,
      height,
      url: info.thumburl || info.url
    });
  }
  return results;
}

async function run() {
  console.log('Buscando y verificando 10 fotos HD de La Llovizna y Cachamay...');
  const usedTitles = new Set();
  
  for (let i = 0; i < targets.length; i++) {
    const target = targets[i];
    console.log(`\n[${i+1}/10] ${target.title}`);
    
    let candidates = await searchWikimedia(target.query);
    await sleep(600);
    
    if (candidates.length === 0 && target.fallbackQuery) {
      candidates = await searchWikimedia(target.fallbackQuery);
      await sleep(600);
    }
    
    let chosen = candidates.find(c => !usedTitles.has(c.title));
    if (!chosen && candidates.length > 0) {
      chosen = candidates[0];
    }
    
    if (!chosen) {
      const genCandidates = await searchWikimedia('La Llovizna Caroni');
      await sleep(600);
      chosen = genCandidates.find(c => !usedTitles.has(c.title));
    }
    
    if (chosen) {
      usedTitles.add(chosen.title);
      console.log(`       Archivo: ${chosen.title} (${chosen.width}x${chosen.height})`);
      console.log(`       Lugar: ${target.desc}`);
      const destFile = path.join(targetDir, `${target.step}.jpg`);
      try {
        await downloadImage(chosen.url, destFile);
        const stats = fs.statSync(destFile);
        console.log(`       -> Descargado con éxito: ${target.step}.jpg (${Math.round(stats.size/1024)} KB)`);
      } catch (err) {
        console.error(`       Error al descargar: ${err.message}`);
      }
    } else {
      console.warn(`       [AVISO] No se encontró candidato para: ${target.title}`);
    }
  }
  
  console.log('\n=======================================================');
  console.log(`Descarga finalizada. Guardado en: ${targetDir}`);
}

run();
