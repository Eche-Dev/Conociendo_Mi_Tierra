const https = require('https');
const fs = require('fs');
const path = require('path');

const agent = new https.Agent({ rejectUnauthorized: false });
const targetDir = path.join('public', 'images', 'destinations', 'delta-orinoco');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const targets = [
  {
    step: '1',
    id: 'canos-del-delta',
    title: 'El Laberinto Verde de Caños',
    query: 'Delta del Orinoco canos Venezuela',
    fallbackQuery: 'Delta del Orinoco aerial OR vista',
    place: 'Delta Amacuro · Más de 300 caños y 40.000 km² de selva inundable'
  },
  {
    step: '2',
    id: 'curiaras-warao',
    title: 'Los Warao: Gente de la Canoa',
    query: 'Warao curiara Delta del Orinoco',
    fallbackQuery: 'Indigenas Warao Venezuela canoa',
    place: 'Caños del Delta · Navegación ancestral en curiaras de madera'
  },
  {
    step: '3',
    id: 'palafitos-janoko',
    title: 'El Janoko: Hogar sobre el Agua',
    query: 'Palafitos Warao Delta del Orinoco',
    fallbackQuery: 'Vivienda Warao palafito',
    place: 'Riberas fluviales · Viviendas tradicionales de madera y palma temiche'
  },
  {
    step: '4',
    id: 'cano-manamo',
    title: 'Caño Mánamo · La Gran Vía Fluvial',
    query: 'Cano Manamo Delta del Orinoco',
    fallbackQuery: 'Tucupita Cano Manamo Venezuela',
    place: 'Tucupita · El brazo occidental que conecta el Delta con el país'
  },
  {
    step: '5',
    id: 'selva-inundable',
    title: 'Reserva de Biosfera del Delta',
    query: 'Delta del Orinoco selva manglar',
    fallbackQuery: 'Reserva de Biosfera Delta del Orinoco',
    place: 'Ecosistema protegido UNESCO · Selva tropical y manglares gigantes'
  },
  {
    step: '6',
    id: 'artesania-moriche',
    title: 'Artesanía Ancestral de Moriche',
    query: 'Artesania Warao moriche',
    fallbackQuery: 'Warao artesania cesteria',
    place: 'Comunidades Warao · Chinchorros y cestería de fibra natural'
  },
  {
    step: '7',
    id: 'fauna-aves-delta',
    title: 'Aves y Fauna de la Selva Ribereña',
    query: 'Aves Delta del Orinoco OR tucan Venezuela delta',
    fallbackQuery: 'Guacamayas Delta del Orinoco',
    place: 'Dosel selvático · Tucanes, guacamayas y monos aulladores'
  },
  {
    step: '8',
    id: 'vida-fluvial-cano',
    title: 'Ruta Fluvial entre Manglares',
    query: 'Delta del Orinoco botes rio',
    fallbackQuery: 'Navegacion Delta del Orinoco Venezuela',
    place: 'Bajo Delta · Exploración en lancha por túneles de agua'
  },
  {
    step: '9',
    id: 'bosque-de-mangle',
    title: 'Los Manglares Rojos Gigantes',
    query: 'Manglares Delta del Orinoco',
    fallbackQuery: 'Manglar Delta Amacuro',
    place: 'Frente atlántico · Los manglares más altos y extensos de Sudamérica'
  },
  {
    step: '10',
    id: 'atardecer-orinoco',
    title: 'Atardecer Dorado sobre el Delta',
    query: 'Atardecer Delta del Orinoco',
    fallbackQuery: 'Sunset Orinoco Delta Venezuela',
    place: 'Desembocadura atlántica · La luz dorada sobre las aguas de misterio'
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
  console.log('Buscando y verificando 10 fotos HD de Delta del Orinoco...\n');
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
        webPath: `/images/destinations/delta-orinoco/${filename}`,
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
