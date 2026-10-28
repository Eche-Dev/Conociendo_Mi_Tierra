const https = require('https');
const fs = require('fs');
const path = require('path');

const agent = new https.Agent({ rejectUnauthorized: false });
const targetDir = path.join('public', 'images', 'destinations', 'medanos-de-coro');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const targets = [
  {
    step: '1',
    id: 'dunas-monumentales',
    title: 'Las Dunas Doradas del Istmo',
    query: 'Medanos de Coro dunas',
    fallbackQuery: 'Medanos de Coro Parque Nacional',
    place: 'Istmo de Paraguaná · Dunas de hasta 40 metros'
  },
  {
    step: '2',
    id: 'crestas-al-viento',
    title: 'Crestas Talladas por los Alisios',
    query: 'Medanos de Coro arena viento',
    fallbackQuery: 'Dunas de Coro Falcon',
    place: 'Parque Nacional Médanos de Coro · Paisaje cambiante'
  },
  {
    step: '3',
    id: 'atardecer-dorado',
    title: 'El Atardecer en el Desierto',
    query: 'Medanos de Coro atardecer sunset',
    fallbackQuery: 'Medanos de Coro sol',
    place: 'Médanos de Coro · Luz de cobre y sombras alargadas'
  },
  {
    step: '4',
    id: 'cujies-y-cardones',
    title: 'El Bosque Espinoso y Cujíes',
    query: 'Medanos de Coro cuji OR cardon',
    fallbackQuery: 'Vegetacion Medanos de Coro',
    place: 'Borde del parque · Cujíes y cardones sobrevivientes'
  },
  {
    step: '5',
    id: 'inmensidad-del-medano',
    title: 'El Desierto que Camina',
    query: 'Parque Nacional Los Medanos de Coro',
    fallbackQuery: 'Medanos Falcon Venezuela',
    place: 'Centro del campo dunar · 91 km² de arena móvil'
  },
  {
    step: '6',
    id: 'casco-colonial-coro',
    title: 'Santa Ana de Coro · Calles de Tierra y Piedra',
    query: 'Coro Venezuela colonial casco historico',
    fallbackQuery: 'Santa Ana de Coro calles',
    place: 'Casco histórico de Coro · Patrimonio Mundial UNESCO'
  },
  {
    step: '7',
    id: 'catedral-de-coro',
    title: 'Catedral Basílica de Santa Ana de Coro',
    query: 'Catedral de Coro Venezuela',
    fallbackQuery: 'Catedral Santa Ana de Coro',
    place: 'Plaza Bolívar de Coro · Primer obispado de Sudamérica (1531)'
  },
  {
    step: '8',
    id: 'arquitectura-bahareque',
    title: 'Ventanales y Patios Coloniales',
    query: 'Casco historico de Coro casas',
    fallbackQuery: 'Coro Falcon arquitectura colonial',
    place: 'Coro · Arquitectura tradicional de barro y bahareque'
  },
  {
    step: '9',
    id: 'la-vela-de-coro',
    title: 'Puerto Real de La Vela de Coro',
    query: 'La Vela de Coro Falcon',
    fallbackQuery: 'La Vela de Coro Venezuela',
    place: 'La Vela · Puerto histórico y desembarco de Miranda (1806)'
  },
  {
    step: '10',
    id: 'camino-a-paraguana',
    title: 'La Entrada a la Península',
    query: 'Istmo de Paraguana carretera Medanos',
    fallbackQuery: 'Carretera Coro Punto Fijo Medanos',
    place: 'Carretera Coro-Punto Fijo · La cinta de asfalto entre médanos'
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
  console.log('Buscando y descargando 10 fotos HD verificadas de Médanos de Coro...\n');
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
        webPath: `/images/destinations/medanos-de-coro/${filename}`,
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
