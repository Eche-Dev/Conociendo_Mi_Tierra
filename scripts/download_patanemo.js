const https = require('https');
const fs = require('fs');
const path = require('path');

const agent = new https.Agent({ rejectUnauthorized: false });
const USER_AGENT = 'ConociendoMiTierraApp/1.0 (https://github.com/conociendo-mi-tierra; edu-contact@conociendomitierra.org)';
const targetDir = path.join('public', 'images', 'destinations', 'patanemo');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const targets = [
  {
    step: '1',
    title: 'Bahía de Patanemo',
    query: 'Bahia de Patanemo Carabobo OR Bahia de Patanemo Venezuela',
    fallbackQuery: 'Patanemo Carabobo',
    desc: 'Amplia ensenada semicircular de aguas cristalinas y cocoteros custodiada por la cordillera de San Esteban'
  },
  {
    step: '2',
    title: 'Laguna de la Bocaina y Manglares',
    query: 'Laguna de la Bocaina Patanemo OR Bocaina Patanemo',
    fallbackQuery: 'manglares Patanemo Carabobo',
    desc: 'Laguna salobre separada del mar por una barra de arena, santuario de garzas y aves playeras'
  },
  {
    step: '3',
    title: 'Isla Larga y Arrecifes de San Esteban',
    query: 'Isla Larga Carabobo OR Isla Larga San Esteban',
    fallbackQuery: 'Isla Larga Venezuela',
    desc: 'La joya insular de Puerto Cabello, con aguas de tono turquesa claro y arenas de coral'
  },
  {
    step: '4',
    title: 'Pecio del Sesostris en Isla Larga',
    query: 'Sesostris Isla Larga OR barco hundido Isla Larga',
    fallbackQuery: 'barco hundido Puerto Cabello',
    desc: 'El barco carguero alemán hundido en 1940 convertido en un impresionante arrecife artificial'
  },
  {
    step: '5',
    title: 'Isla Santo Domingo e Islotes del Parque',
    query: 'Isla Santo Domingo Carabobo OR Parque Nacional San Esteban islas',
    fallbackQuery: 'Islotes San Esteban Carabobo',
    desc: 'Pequeños cayos desiertos rodeados de fondos marinos cristalinos y peces de arrecife'
  },
  {
    step: '6',
    title: 'Parque Nacional San Esteban',
    query: 'Parque Nacional San Esteban Carabobo OR San Esteban bosque',
    fallbackQuery: 'San Esteban Puerto Cabello',
    desc: 'El pulmón verde de 44.050 hectáreas que une la cordillera de la costa con el Caribe'
  },
  {
    step: '7',
    title: 'Pueblo de Patanemo y Cultura Costera',
    query: 'Pueblo de Patanemo Carabobo OR Patanemo cimarron',
    fallbackQuery: 'Patanemo cultura Carabobo',
    desc: 'Tradición afrocaribeña, pesca artesanal y gastronomía marinera en el fértil valle costero'
  },
  {
    step: '8',
    title: 'Playa Quizandal y el Embarcadero',
    query: 'Playa Quizandal Puerto Cabello OR Quizandal Carabobo',
    fallbackQuery: 'Quizandal embarcadero',
    desc: 'Playa de aguas mansas y muelle de lanchas que conectan tierra firme con Isla Larga'
  },
  {
    step: '9',
    title: 'Jardines Coralinos y Vida Marina',
    query: 'arrecife Isla Larga Carabobo OR snorkel Isla Larga',
    fallbackQuery: 'coral Parque Nacional San Esteban',
    desc: 'Fondos someros de corales blandos, abanicos de mar y cardúmenes multicolores'
  },
  {
    step: '10',
    title: 'Crepúsculo en la Costa de Carabobo',
    query: 'atardecer Patanemo OR atardecer Isla Larga Carabobo',
    fallbackQuery: 'atardecer Puerto Cabello Carabobo',
    desc: 'El ocaso tiñendo de oro y fuego las montañas costeras y el mar de Puerto Cabello'
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
  console.log('Buscando y verificando 10 fotos HD de Bahía de Patanemo e Isla Larga...\n');
  const manifest = [];

  for (const t of targets) {
    try {
      let searchUrl = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=${encodeURIComponent(t.query)}&gsrnamespace=6&gsrlimit=12&prop=imageinfo&iiprop=url|size&iiurlwidth=2048`;
      let data = await fetchJson(searchUrl);

      let pages = (data.query && data.query.pages) ? Object.values(data.query.pages) : [];
      if (pages.length === 0 && t.fallbackQuery) {
        searchUrl = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=${encodeURIComponent(t.fallbackQuery)}&gsrnamespace=6&gsrlimit=12&prop=imageinfo&iiprop=url|size&iiurlwidth=2048`;
        data = await fetchJson(searchUrl);
        pages = (data.query && data.query.pages) ? Object.values(data.query.pages) : [];
      }

      const validImages = pages
        .filter(p => p.imageinfo && p.imageinfo[0])
        .map(p => {
          const info = p.imageinfo[0];
          return {
            title: p.title,
            originalUrl: info.url,
            downloadUrl: info.thumburl || info.url,
            width: info.thumbwidth || info.width,
            height: info.thumbheight || info.height,
            originalWidth: info.width,
            originalHeight: info.height,
            size: info.size
          };
        })
        .filter(img => {
          const lower = img.title.toLowerCase();
          const cleanUrl = img.originalUrl.split('?')[0].toLowerCase();
          return (cleanUrl.endsWith('.jpg') || cleanUrl.endsWith('.jpeg') || cleanUrl.endsWith('.png') || cleanUrl.endsWith('.webp')) &&
                 !lower.includes('hoja') && !lower.includes('map') && !lower.includes('dcn') && !lower.includes('icon') &&
                 !lower.includes('flag') && !lower.includes('logo') && !lower.includes('pdf');
        })
        .sort((a, b) => {
          const aAspect = a.originalWidth / a.originalHeight;
          const bAspect = b.originalWidth / b.originalHeight;
          const aLandscape = aAspect >= 1.1 ? 1 : 0;
          const bLandscape = bAspect >= 1.1 ? 1 : 0;
          if (aLandscape !== bLandscape) return bLandscape - aLandscape;
          return (b.originalWidth * b.originalHeight) - (a.originalWidth * a.originalHeight);
        });

      if (validImages.length === 0) {
        console.warn(`[!] No se encontraron fotos para: ${t.query}`);
        continue;
      }

      const best = validImages[0];
      const filename = `${t.step}.jpg`;
      const destPath = path.join(targetDir, filename);

      console.log(`[${t.step}/10] ${t.title}`);
      console.log(`       Archivo: ${best.title} (${best.originalWidth}x${best.originalHeight})`);
      console.log(`       Lugar: ${t.desc}`);

      await sleep(1000);
      await downloadFile(best.downloadUrl, destPath);

      const downloadedSize = Math.round(fs.statSync(destPath).size / 1024);
      console.log(`       -> Descargado con éxito: ${filename} (${downloadedSize} KB)\n`);

      manifest.push({
        step: t.step,
        title: t.title,
        desc: t.desc,
        filename,
        webPath: `/images/destinations/patanemo/${filename}`,
        sizeKb: downloadedSize,
        wikimediaTitle: best.title
      });
    } catch (err) {
      console.error(`Error en ${t.title}:`, err.message);
    }
  }

  const manifestPath = path.join(targetDir, 'manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`=======================================================`);
  console.log(`Descarga finalizada: ${manifest.length}/10 imágenes HD obtenidas.`);
  console.log(`Guardado en: ${targetDir}`);
}

run();
