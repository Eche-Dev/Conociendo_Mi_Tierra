const https = require('https');
const fs = require('fs');
const path = require('path');

const agent = new https.Agent({ rejectUnauthorized: false });
const USER_AGENT = 'ConociendoMiTierraApp/1.0 (https://github.com/conociendo-mi-tierra; edu-contact@conociendomitierra.org)';
const targetDir = path.join('public', 'images', 'destinations', 'choroni');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const targets = [
  {
    step: '1',
    title: 'Playa Grande de Choroní',
    query: 'Playa Grande Choroni Aragua OR Playa Grande Choroni Venezuela',
    fallbackQuery: 'Choroni Playa Grande',
    desc: 'La bahía más famosa de Aragua, con arenas doradas, olas vivas y su extenso palmar de cocoteros'
  },
  {
    step: '2',
    title: 'Puerto Colombia y el Muelle de Peñeros',
    query: 'Puerto Colombia Choroni OR Malecon Puerto Colombia Choroni',
    fallbackQuery: 'Puerto Colombia Aragua',
    desc: 'El muelle pesquero de donde zarpan las lanchas hacia Chuao, Cepe y Tuja'
  },
  {
    step: '3',
    title: 'Pueblo Colonial de Choroní',
    query: 'Pueblo de Choroni colonial OR Iglesia Choroni Aragua',
    fallbackQuery: 'Choroni pueblo Aragua',
    desc: 'Calles coloniales empedradas y casonas de colores fundadas en 1616 al pie de la montaña'
  },
  {
    step: '4',
    title: 'Bahía de Cata',
    query: 'Bahia de Cata Aragua OR Bahia de Cata Venezuela',
    fallbackQuery: 'Bahia de Cata',
    desc: 'Una ensenada casi circular perfecta de aguas tranquilas y arenas blancas resguardada por dos cabos'
  },
  {
    step: '5',
    title: 'Secado de Cacao en Chuao',
    query: 'Chuao cacao secado OR plaza Chuao iglesia cacao',
    fallbackQuery: 'Chuao Aragua cacao',
    desc: 'El patio de la iglesia de Chuao donde se extienden al sol los granos del mejor cacao del mundo'
  },
  {
    step: '6',
    title: 'Playa Cuyagua',
    query: 'Playa Cuyagua Aragua OR Cuyagua surf Venezuela',
    fallbackQuery: 'Cuyagua Aragua',
    desc: 'Bahía oceánica abierta, capital venezolana del surf, donde el río Cuyagua desemboca en el Caribe'
  },
  {
    step: '7',
    title: 'Ensenada de Cepe y Tuja',
    query: 'Playa Cepe Choroni OR Ensenada de Tuja Aragua',
    fallbackQuery: 'Cepe Aragua Venezuela',
    desc: 'Caletas solitarias de aguas esmeralda y arrecifes coralinos resguardadas entre farallones verdes'
  },
  {
    step: '8',
    title: 'Parque Nacional Henri Pittier',
    query: 'Parque Nacional Henri Pittier selva nublada OR Henri Pittier Aragua',
    fallbackQuery: 'Henri Pittier selva',
    desc: 'El primer parque nacional de Venezuela (1937), donde la selva nublada corona la cordillera'
  },
  {
    step: '9',
    title: 'Tradición y Tambor de Costa',
    query: 'Tambores de Choroni San Juan OR tambor Aragua costa',
    fallbackQuery: 'San Juan Bautista Choroni',
    desc: 'La vibrante herencia afrodescendiente manifestada en el repique de tambores cumaco y clarín'
  },
  {
    step: '10',
    title: 'Atardecer desde el Mirador del Cristo',
    query: 'atardecer Choroni OR atardecer Puerto Colombia Aragua',
    fallbackQuery: 'atardecer Bahia de Cata',
    desc: 'Puesta de sol dorada sobre el mar abierto desde el morro rocoso de Puerto Colombia'
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
  console.log('Buscando y verificando 10 fotos HD de Choroní y Bahía de Cata...\n');
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
        webPath: `/images/destinations/choroni/${filename}`,
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
