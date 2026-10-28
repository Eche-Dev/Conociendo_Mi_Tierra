const https = require('https');
const fs = require('fs');
const path = require('path');

const agent = new https.Agent({ rejectUnauthorized: false });
const USER_AGENT = 'ConociendoMiTierraApp/1.0 (https://github.com/conociendo-mi-tierra; edu-contact@conociendomitierra.org)';
const targetDir = path.join('public', 'images', 'destinations', 'cueva-alfredo-jahn');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const targets = [
  {
    step: '1',
    title: 'Entrada Natural de la Cueva Alfredo Jahn',
    query: 'Cueva Alfredo Jahn entrada OR Cueva Alfredo Jahn boca',
    fallbackQuery: 'Cueva Alfredo Jahn Birongo',
    desc: 'La entrada natural abierta entre raíces de higuerotes y la selva tropical de Barlovento'
  },
  {
    step: '2',
    title: 'Quebrada Cambural y Río Subterráneo',
    query: 'Cueva Alfredo Jahn quebrada Cambural OR rio subterraneo Cueva Alfredo Jahn',
    fallbackQuery: 'Cueva Alfredo Jahn agua',
    desc: 'El torrente de agua cristalina que atraviesa las entrañas de la roca caliza'
  },
  {
    step: '3',
    title: 'El Salón del Hongo y Columnas de Calcita',
    query: 'Cueva Alfredo Jahn formaciones OR Cueva Alfredo Jahn estalactitas',
    fallbackQuery: 'Cueva Alfredo Jahn salon',
    desc: 'Espectaculares columnas y estalagmitas monumentales esculpidas por el goteo mineral'
  },
  {
    step: '4',
    title: 'Puentes de Roca y Cañones Subterráneos',
    query: 'Cueva Alfredo Jahn galeria OR Cueva Alfredo Jahn interior',
    fallbackQuery: 'Cueva Alfredo Jahn cueva',
    desc: 'Arcos de piedra y cañones naturales modelados por la disolución kárstica'
  },
  {
    step: '5',
    title: 'Travesía Espeleológica en las Galerías Fósiles',
    query: 'espeleologia Cueva Alfredo Jahn OR Cueva Alfredo Jahn espeleologos',
    fallbackQuery: 'Cueva Alfredo Jahn aventura',
    desc: 'Exploración de la segunda cueva más grande de Venezuela con más de 4,2 km de túneles'
  },
  {
    step: '6',
    title: 'Fauna Cavernícola y Murciélagos',
    query: 'murcielagos Cueva Alfredo Jahn OR fauna Cueva Alfredo Jahn',
    fallbackQuery: 'Birongo cueva fauna',
    desc: 'Santuario de murciélagos y microfauna adaptada a la oscuridad perpetua'
  },
  {
    step: '7',
    title: 'Monumento Natural Alfredo Jahn',
    query: 'Monumento Natural Cueva Alfredo Jahn OR Alfredo Jahn cueva Miranda',
    fallbackQuery: 'Cueva Alfredo Jahn Miranda',
    desc: 'Decretado en 1978 en honor al pionero de la espeleología y geografía venezolana'
  },
  {
    step: '8',
    title: 'Bosque Húmedo Tropical de Birongo',
    query: 'Birongo bosque OR Birongo selva Miranda',
    fallbackQuery: 'Barlovento bosque Miranda',
    desc: 'La exuberante selva tropical que recubre las formaciones calizas de la cuenca del río Capaya'
  },
  {
    step: '9',
    title: 'Pueblo de Birongo y Memoria Cimarrona',
    query: 'Birongo Miranda OR pueblo de Birongo',
    fallbackQuery: 'Barlovento Birongo tambor',
    desc: 'Comunidad afrodescendiente con profundas tradiciones de cimarronaje, tambor y leyendas de la cueva'
  },
  {
    step: '10',
    title: 'Amanecer en las Montañas de Barlovento',
    query: 'Barlovento Miranda paisaje OR atardecer Barlovento Miranda',
    fallbackQuery: 'Miranda cordillera de la costa paisaje',
    desc: 'El sol iluminando la selva y las serranías que custodian la gran caverna'
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
  console.log('Buscando y verificando 10 fotos HD de Cueva Alfredo Jahn...\n');
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
        webPath: `/images/destinations/cueva-alfredo-jahn/${filename}`,
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
