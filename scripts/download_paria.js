const https = require('https');
const fs = require('fs');
const path = require('path');

const agent = new https.Agent({ rejectUnauthorized: false });
const USER_AGENT = 'ConociendoMiTierraApp/1.0 (https://github.com/conociendo-mi-tierra; edu-contact@conociendomitierra.org)';
const targetDir = path.join('public', 'images', 'destinations', 'paria');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const targets = [
  {
    step: '1',
    title: 'Playa Medina',
    query: 'Playa Medina Paria OR Playa Medina Sucre',
    fallbackQuery: 'Playa Medina Venezuela',
    desc: 'La bahía de cocoteros más perfecta de Venezuela, con arena tostada y mar verde esmeralda'
  },
  {
    step: '2',
    title: 'Playa Pui Pui',
    query: 'Playa Pui Pui Paria OR Playa Pui Pui Sucre',
    fallbackQuery: 'Playa Pui Pui Venezuela',
    desc: 'Extensa playa virgen oceánica y santuario de anidación de tortugas marinas'
  },
  {
    step: '3',
    title: 'Haciendas Cacaoteras de Paria',
    query: 'cacao Paria OR cacaotero Sucre Venezuela',
    fallbackQuery: 'hacienda cacao Venezuela',
    desc: 'Plantaciones del cacao criollo fino de aroma de fama mundial bajo sombra selvática'
  },
  {
    step: '4',
    title: 'Selva Húmeda y Montañas del Parque Nacional',
    query: 'Parque Nacional Peninsula de Paria OR Peninsula de Paria paisaje',
    fallbackQuery: 'Paria Sucre paisaje',
    desc: 'Bosques nublados costeros donde la selva tropical abraza las ensenadas del mar'
  },
  {
    step: '5',
    title: 'San Juan de las Galdonas',
    query: 'San Juan de las Galdonas Paria OR San Juan de las Galdonas Sucre',
    fallbackQuery: 'San Juan de las Galdonas',
    desc: 'Pueblo de pescadores encaramado entre colinas selváticas y ensenadas oceánicas'
  },
  {
    step: '6',
    title: 'Peñeros y Costas de Río Caribe',
    query: 'Rio Caribe Sucre playa OR Rio Caribe peneros',
    fallbackQuery: 'Rio Caribe Sucre',
    desc: 'Coloridas embarcaciones de pescadores artesanales en la bahía de Río Caribe'
  },
  {
    step: '7',
    title: 'Casonas Coloniales y Memoria Cacaotera',
    query: 'Rio Caribe arquitectura OR casas Rio Caribe Sucre',
    fallbackQuery: 'Rio Caribe iglesia Sucre',
    desc: 'Arquitectura señorial colonial y antillana heredada de los grandes hacendados corsos y criollos'
  },
  {
    step: '8',
    title: 'Aguas Termales de Paria',
    query: 'Aguas de Moises Sucre OR termales Paria',
    fallbackQuery: 'Aguas termales Sucre Venezuela',
    desc: 'Pozas naturales de aguas tibias sulfuradas rodeadas de cascadas y jardines tropicales'
  },
  {
    step: '9',
    title: 'Cabo Tres Puntas y Acantilados del Atlántico',
    query: 'Cabo Tres Puntas Paria OR costa norte Peninsula de Paria',
    fallbackQuery: 'acantilados Paria Sucre',
    desc: 'El saliente agreste donde termina la Cordillera de la Costa frente a las corrientes atlánticas'
  },
  {
    step: '10',
    title: 'Crepúsculo sobre la Costa de Paria',
    query: 'atardecer Peninsula de Paria OR atardecer Playa Medina',
    fallbackQuery: 'atardecer Sucre costa Paria',
    desc: 'El sol despidiéndose tras los cocotales y el oleaje verde de la Tierra de Gracia'
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
  console.log('Buscando y verificando 10 fotos HD de Península de Paria...\n');
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
        webPath: `/images/destinations/paria/${filename}`,
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
