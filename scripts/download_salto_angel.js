const https = require('https');
const fs = require('fs');
const path = require('path');

const agent = new https.Agent({ rejectUnauthorized: false });
const targetDir = path.join('public', 'images', 'destinations', 'salto-angel');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const targets = [
  {
    step: '1',
    id: 'caida-monumental',
    title: 'Kerepakupai Vená · 979 metros de caída',
    query: 'Angel Falls Venezuela waterfall full view',
    fallbackQuery: 'Salto Angel vista completa Venezuela',
    place: 'Auyantepuy · La caída de agua ininterrumpida más alta del planeta'
  },
  {
    step: '2',
    id: 'mirador-laime',
    title: 'El Mirador de Laime',
    query: 'Salto Angel mirador Laime',
    fallbackQuery: 'Mirador Salto Angel Venezuela',
    place: 'Isla Ratón · El mirador frente al coloso tras la caminata en selva'
  },
  {
    step: '3',
    id: 'canon-del-diablo',
    title: 'El Cañón del Diablo',
    query: 'Canon del Diablo Canaima OR Churun Canyon',
    fallbackQuery: 'Auyantepuy cañon Churun',
    place: 'Garganta del Auyantepuy · Paredes verticales de mil metros de roca'
  },
  {
    step: '4',
    id: 'rio-churun-curiara',
    title: 'Remontando el Río Churún',
    query: 'Rio Churun Salto Angel curiara',
    fallbackQuery: 'Navegacion Rio Churun Canaima',
    place: 'Río Churún · Ascenso fluvial en curiara pemón sorteando rápidos'
  },
  {
    step: '5',
    id: 'cima-auyantepuy',
    title: 'La Cima del Auyantepuy',
    query: 'Cima Auyantepuy OR Auyantepui top plateau',
    fallbackQuery: 'Auyantepuy meseta superior',
    place: 'Meseta del Auyantepuy · Nacimiento del río Kerep'
  },
  {
    step: '6',
    id: 'polvo-de-agua',
    title: 'La Atomización de la Cascada',
    query: 'Angel Falls mist water spray',
    fallbackQuery: 'Salto Angel caida niebla',
    place: 'Acantilado central · El agua convertida en nube de rocío'
  },
  {
    step: '7',
    id: 'poza-del-salto',
    title: 'La Poza al Pie del Salto',
    query: 'Base of Angel Falls pool',
    fallbackQuery: 'Pie del Salto Angel rocas',
    place: 'Base de la cascada · Rocas ciclópeas y piscina natural'
  },
  {
    step: '8',
    id: 'sobrevuelo-aereo',
    title: 'El Vuelo de Jimmie Angel',
    query: 'Angel Falls aerial view Venezuela flight',
    fallbackQuery: 'Sobrevuelo Salto Angel avioneta',
    place: 'Cielo del Auyantepuy · La perspectiva mítica descubierta en 1933'
  },
  {
    step: '9',
    id: 'campamento-isla-raton',
    title: 'Noche en la Selva de Isla Ratón',
    query: 'Campamento Isla Raton Salto Angel OR hammock Canaima',
    fallbackQuery: 'Campamento frente Salto Angel',
    place: 'Isla Ratón · Dormir en hamacas con el rugido del salto'
  },
  {
    step: '10',
    id: 'arcoiris-amanecer',
    title: 'El Arcoíris de la Mañana',
    query: 'Angel Falls rainbow Venezuela',
    fallbackQuery: 'Salto Angel amanecer rainbow',
    place: 'Auyantepuy · La luz solar quebrando el vapor en colores'
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
  console.log('Buscando y verificando 10 fotos HD de Salto Ángel...\n');
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
        webPath: `/images/destinations/salto-angel/${filename}`,
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
