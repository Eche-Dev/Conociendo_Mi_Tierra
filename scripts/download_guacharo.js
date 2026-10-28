const https = require('https');
const fs = require('fs');
const path = require('path');

const agent = new https.Agent({ rejectUnauthorized: false });
const USER_AGENT = 'ConociendoMiTierraApp/1.0 (https://github.com/conociendo-mi-tierra; edu-contact@conociendomitierra.org)';
const targetDir = path.join('public', 'images', 'destinations', 'guacharo');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const targets = [
  {
    step: '1',
    title: 'La Entrada Monumental de la Caverna',
    query: 'Cueva del Guacharo entrada OR Cueva del Guacharo boca',
    fallbackQuery: 'Cueva del Guacharo Monagas',
    desc: 'La gigantesca boca de 23 metros de alto por donde penetra la luz y la selva'
  },
  {
    step: '2',
    title: 'El Salón de Humboldt',
    query: 'Salon Humboldt Cueva del Guacharo OR cueva del guacharo interior',
    fallbackQuery: 'Cueva del Guacharo estalagmitas',
    desc: 'La primera gran galería de 759 metros de longitud explorada por el sabio prusiano en 1799'
  },
  {
    step: '3',
    title: 'Catedral de Calcita y Estalactitas',
    query: 'estalactitas Cueva del Guacharo OR formaciones Cueva del Guacharo',
    fallbackQuery: 'Cueva del Guacharo estalactita',
    desc: 'Columnas, velos y cortinas de calcita esculpidas gota a gota durante millones de años'
  },
  {
    step: '4',
    title: 'El Guácharo (Steatornis caripensis)',
    query: 'Steatornis caripensis guacharo OR guacharo ave',
    fallbackQuery: 'Steatornis caripensis',
    desc: 'El ave cavernícola nocturna que se orienta en la oscuridad absoluta por ecolocalización'
  },
  {
    step: '5',
    title: 'El Vuelo Nocturno de Salida',
    query: 'vuelo guacharos OR salida de los guacharos cueva',
    fallbackQuery: 'guacharos cueva atardecer',
    desc: 'Al caer la tarde, miles de guácharos salen en una nube viva a buscar semillas en el bosque'
  },
  {
    step: '6',
    title: 'Río Subterráneo de la Caverna',
    query: 'rio subterraneo cueva del guacharo OR agua cueva del guacharo',
    fallbackQuery: 'cueva del guacharo camino',
    desc: 'Corrientes de agua cristalina que atraviesan las profundidades del sistema kárstico'
  },
  {
    step: '7',
    title: 'Monumento Natural Alejandro de Humboldt',
    query: 'Humboldt cueva del guacharo OR monumento cueva del guacharo',
    fallbackQuery: 'Monumento Alejandro de Humboldt Guacharo',
    desc: 'El primer Monumento Natural decretado en Venezuela en 1949 en honor al científico universal'
  },
  {
    step: '8',
    title: 'Bosque Nublado de Turimiquire',
    query: 'Parque Nacional Cueva del Guacharo bosque OR Turimiquire bosque',
    fallbackQuery: 'Caripe paisaje bosque',
    desc: 'Vegetación exuberante de selva nublada, orquídeas y helechos arborescentes en la serranía'
  },
  {
    step: '9',
    title: 'Caripe: El Jardín de Oriente',
    query: 'Caripe Monagas OR pueblo de Caripe',
    fallbackQuery: 'Caripe del Guacharo',
    desc: 'Valle de clima fresco, cafetales de sombra y flores de montaña en las faldas del parque'
  },
  {
    step: '10',
    title: 'Crepúsculo en la Serranía de Caripe',
    query: 'atardecer Caripe OR Monagas atardecer cueva',
    fallbackQuery: 'atardecer Turimiquire Monagas',
    desc: 'Las montañas de caliza sumergiéndose en el silencio de la noche oriental'
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
  console.log('Buscando y verificando 10 fotos HD de Cueva del Guácharo...\n');
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
        webPath: `/images/destinations/guacharo/${filename}`,
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
