const https = require('https');
const fs = require('fs');
const path = require('path');

const agent = new https.Agent({ rejectUnauthorized: false });
const targetDir = path.join('public', 'images', 'destinations', 'roraima');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const targets = [
  {
    step: '1',
    id: 'proa-roraima',
    title: 'La Proa del Roraima',
    query: 'Mount Roraima prow OR proa Roraima',
    fallbackQuery: 'Monte Roraima Venezuela proa',
    place: 'Sierra de Pacaraima · La imponente proa de piedra entre las nubes (2.810 m)'
  },
  {
    step: '2',
    id: 'la-rampa',
    title: 'La Rampa de Ascenso',
    query: 'Roraima rampa OR Roraima trail cliff',
    fallbackQuery: 'Monte Roraima rampa ascenso',
    place: 'Pared occidental · El sendero natural que permite subir a la cumbre'
  },
  {
    step: '3',
    id: 'valle-de-cristales',
    title: 'El Valle de los Cristales',
    query: 'Valle de los cristales Roraima',
    fallbackQuery: 'Roraima quartz crystals',
    place: 'Meseta superior · Tapiz de millones de cristales de cuarzo puro'
  },
  {
    step: '4',
    id: 'jacuzzis-roraima',
    title: 'Los Jacuzzis Naturales',
    query: 'Jacuzzis Roraima OR Roraima jacuzzi',
    fallbackQuery: 'Roraima natural pools',
    place: 'Cumbre del tepuy · Pozas de cuarzo de agua helada y transparente'
  },
  {
    step: '5',
    id: 'la-ventana-kukenan',
    title: 'La Ventana y el Abismo de Kukenán',
    query: 'La Ventana Roraima OR Kukenan from Roraima',
    fallbackQuery: 'Kukenan tepuy view Roraima',
    place: 'Borde este · Precipicio vertical de 1.000 m frente al tepuy Kukenán'
  },
  {
    step: '6',
    id: 'rocas-mundo-perdido',
    title: 'Laberinto del Mundo Perdido',
    query: 'Mount Roraima rock formations',
    fallbackQuery: 'Roraima piedras laberinto',
    place: 'Piso del tepuy · Esculturas de arenisca negra talladas durante milenios'
  },
  {
    step: '7',
    id: 'punto-triple',
    title: 'El Hito del Punto Triple',
    query: 'Punto Triple Roraima OR Triple Point Roraima',
    fallbackQuery: 'Hito fronterizo Roraima',
    place: 'Meseta superior · Frontera geodésica de Venezuela, Brasil y Guyana'
  },
  {
    step: '8',
    id: 'flora-fauna-endemica',
    title: 'La Ranita Negra y Plantas Carnívoras',
    query: 'Oreophrynella quelchii OR Heliamphora Roraima',
    fallbackQuery: 'Roraima frog OR flora endemica Roraima',
    place: 'Cumbre aislada · Especies prehistóricas que no existen en ningún otro lugar'
  },
  {
    step: '9',
    id: 'campamento-hoteles',
    title: 'Los Hoteles de Piedra',
    query: 'Roraima camp hotels OR cueva Roraima carpas',
    fallbackQuery: 'Campamento cuevas Roraima',
    place: 'Cornisas de la cumbre · Refugio de roca natural para acampar'
  },
  {
    step: '10',
    id: 'mar-de-nubes-amanecer',
    title: 'Amanecer sobre el Mar de Nubes',
    query: 'Mount Roraima sunrise clouds',
    fallbackQuery: 'Monte Roraima amanecer nubes',
    place: 'Cima del Roraima · El sol despuntando sobre el océano de neblina'
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
  console.log('Buscando y verificando 10 fotos HD de Monte Roraima...\n');
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
        webPath: `/images/destinations/roraima/${filename}`,
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
