const https = require('https');
const fs = require('fs');
const path = require('path');

const agent = new https.Agent({ rejectUnauthorized: false });
const USER_AGENT = 'ConociendoMiTierraApp/1.0 (https://github.com/conociendo-mi-tierra; edu-contact@conociendomitierra.org)';
const targetDir = path.join('public', 'images', 'destinations', 'waraira-repano');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const targets = [
  {
    step: '1',
    title: 'La Cordillera del Waraira Repano',
    query: 'Cerro El Avila Caracas vista OR Waraira Repano Caracas panorama',
    fallbackQuery: 'El Avila Caracas',
    desc: 'La majestuosa muralla verde de 2.765 metros que custodia y abraza el valle de Caracas'
  },
  {
    step: '2',
    title: 'Teleférico Waraira Repano',
    query: 'Teleferico de Caracas Waraira Repano OR teleferico Avila Caracas',
    fallbackQuery: 'teleferico caracas',
    desc: 'Las cabinas panorámicas trepando por la montaña desde la ciudad hasta la cresta'
  },
  {
    step: '3',
    title: 'Hotel Humboldt y la Cresta de la Montaña',
    query: 'Hotel Humboldt Avila Caracas OR Hotel Humboldt Waraira Repano',
    fallbackQuery: 'Hotel Humboldt Caracas',
    desc: 'La joya de la arquitectura moderna venezolana inaugurada en 1956 flotando entre la niebla'
  },
  {
    step: '4',
    title: 'Pico Naiguatá (2.765 m)',
    query: 'Pico Naiguata Avila OR Pico Naiguata cumbre',
    fallbackQuery: 'Pico Naiguata',
    desc: 'El techo de la Cordillera de la Costa y su cruz emblemática asomada al Mar Caribe'
  },
  {
    step: '5',
    title: 'Ruta de Sabas Nieves',
    query: 'Sabas Nieves Avila OR Sabas Nieves Caracas',
    fallbackQuery: 'senderismo Avila Caracas',
    desc: 'El sendero histórico donde miles de caraqueños ascienden diariamente a respirar el aire de montaña'
  },
  {
    step: '6',
    title: 'Selva Nublada y Helechos Gigantes',
    query: 'selva nublada Avila Caracas OR flora Parque Nacional El Avila',
    fallbackQuery: 'bosque nublado El Avila',
    desc: 'Santuario botánico de orquídeas, bromelias y helechos arborescentes en la vertiente norte'
  },
  {
    step: '7',
    title: 'La Silla de Caracas y Picos Gemelos',
    query: 'Silla de Caracas Avila OR Pico Oriental Avila',
    fallbackQuery: 'Silla de Caracas',
    desc: 'La impresionante depresión orográfica entre el Pico Oriental y el Pico Occidental'
  },
  {
    step: '8',
    title: 'Fortín de La Cumbre y Camino Real',
    query: 'Fortin de la Cumbre Avila OR Camino de los Espanoles Avila',
    fallbackQuery: 'Camino de los Espanoles Caracas',
    desc: 'Fortificaciones coloniales del siglo XVIII que protegían el paso real entre La Guaira y Caracas'
  },
  {
    step: '9',
    title: 'Balcón de Dos Horizontes: Mar y Ciudad',
    query: 'vista La Guaira desde el Avila OR mar caribe desde el avila',
    fallbackQuery: 'vista desde el avila',
    desc: 'El único mirador donde se contempla a la vez el mar Caribe al norte y la metrópoli al sur'
  },
  {
    step: '10',
    title: 'Atardecer y Luces de Caracas desde la Cima',
    query: 'atardecer Caracas Avila OR noche Caracas desde el Avila',
    fallbackQuery: 'atardecer El Avila',
    desc: 'El crepúsculo dorado sobre el valle de Caracas encendiendo el mar de luces de la capital'
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
  console.log('Buscando y verificando 10 fotos HD de Waraira Repano...\n');
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
        webPath: `/images/destinations/waraira-repano/${filename}`,
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
