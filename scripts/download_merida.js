const https = require('https');
const fs = require('fs');
const path = require('path');

const agent = new https.Agent({ rejectUnauthorized: false });
const targetDir = path.join('public', 'images', 'destinations', 'sierra-nevada');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const targets = [
  {
    step: '1',
    id: 'pico-bolivar',
    title: 'Pico Bolívar · El Techo de Venezuela',
    query: 'Pico Bolivar Merida Venezuela',
    place: 'Sierra Nevada de Mérida · 4.978 m s. n. m.'
  },
  {
    step: '2',
    id: 'teleferico-mukumbaru',
    title: 'Teleférico Mukumbarí · Estación Pico Espejo',
    query: 'Teleferico de Merida Pico Espejo',
    fallbackQuery: 'Teleferico Mukumbari Merida',
    place: 'Pico Espejo · El teleférico más alto del mundo (4.765 m)'
  },
  {
    step: '3',
    id: 'laguna-mucubaji',
    title: 'Laguna de Mucubají',
    query: 'Laguna de Mucubaji Merida',
    fallbackQuery: 'Mucubaji Sierra Nevada Venezuela',
    place: 'Parque Nacional Sierra Nevada · 3.550 m s. n. m.'
  },
  {
    step: '4',
    id: 'paramo-frailejones',
    title: 'Páramo de Mifafí y Frailejones',
    query: 'Frailejones Merida Venezuela paramo',
    fallbackQuery: 'Paramo de Mifafi Merida',
    place: 'Páramo andino · Santuario del cóndor y frailejones gigantes'
  },
  {
    step: '5',
    id: 'laguna-negra',
    title: 'Laguna Negra',
    query: 'Laguna Negra Merida Venezuela',
    place: 'Valle glaciar · Espejo de agua profunda rodeado de bosque'
  },
  {
    step: '6',
    id: 'pico-humboldt',
    title: 'Pico Humboldt y Glaciar La Corona',
    query: 'Pico Humboldt Merida Venezuela',
    place: 'Segunda cumbre más alta · 4.940 m s. n. m.'
  },
  {
    step: '7',
    id: 'los-nevados',
    title: 'Pueblo de Los Nevados',
    query: 'Los Nevados Merida Venezuela',
    place: 'Valle interandino · Casas de adobe y caminos de herradura'
  },
  {
    step: '8',
    id: 'capilla-de-piedra',
    title: 'Capilla de Piedra de Juan Félix Sánchez',
    query: 'Capilla de Piedra San Rafael de Mucuchies',
    fallbackQuery: 'Juan Felix Sanchez capilla',
    place: 'San Rafael de Mucuchíes · 3.140 m s. n. m.'
  },
  {
    step: '9',
    id: 'collado-del-condor',
    title: 'Collado del Cóndor (Pico El Águila)',
    query: 'Pico El Aguila Merida Venezuela condor',
    fallbackQuery: 'Collado del Condor Merida',
    place: 'Troncal 7 · Paso carretero más alto de Venezuela (4.118 m)'
  },
  {
    step: '10',
    id: 'catedral-merida-sierra',
    title: 'Ciudad de Mérida y la Cordillera',
    query: 'Catedral de Merida Venezuela',
    fallbackQuery: 'Ciudad de Merida Sierra Nevada',
    place: 'Valle del Chama · La ciudad universitaria y sus cumbres nevadas'
  }
];

const USER_AGENT = 'ConociendoMiTierraApp/1.0 (https://github.com/conociendo-mi-tierra; edu-contact@conociendomitierra.org)';

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { agent, headers: { 'User-Agent': USER_AGENT } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return resolve(fetchJson(res.headers.location));
      }
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
  console.log('Buscando y verificando 10 fotos HD de Sierra Nevada de Mérida...\n');
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
                 !lower.includes('map') && !lower.includes('icon') && !lower.includes('flag') && !lower.includes('logo');
        })
        .sort((a, b) => {
          const aAspect = a.originalWidth / a.originalHeight;
          const bAspect = b.originalWidth / b.originalHeight;
          const aLandscape = aAspect >= 1.2 ? 1 : 0;
          const bLandscape = bAspect >= 1.2 ? 1 : 0;
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
      console.log(`       Resolución para web: ${best.width} x ${best.height} px`);
      console.log(`       Lugar verificado: ${t.place}`);

      await sleep(1200);
      await downloadFile(best.downloadUrl, destPath);

      const downloadedSize = Math.round(fs.statSync(destPath).size / 1024);
      console.log(`       -> Descargado con éxito: ${filename} (${downloadedSize} KB)\n`);

      manifest.push({
        step: t.step,
        id: t.id,
        title: t.title,
        place: t.place,
        filename,
        webPath: `/images/destinations/sierra-nevada/${filename}`,
        width: best.width,
        height: best.height,
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
