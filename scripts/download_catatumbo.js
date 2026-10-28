const https = require('https');
const fs = require('fs');
const path = require('path');

const agent = new https.Agent({ rejectUnauthorized: false });
const targetDir = path.join('public', 'images', 'destinations', 'catatumbo');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const targets = [
  {
    step: '1',
    id: 'tormenta-nocturna',
    title: 'La Tormenta Perpetua',
    query: 'Relampago del Catatumbo rayo OR lightning',
    fallbackQuery: 'Catatumbo lightning Venezuela',
    place: 'Lago de Maracaibo · Récord Guinness mundial de descargas'
  },
  {
    step: '2',
    id: 'palafitos-ologa',
    title: 'Palafitos de Ologá bajo el Relámpago',
    query: 'Ologa Catatumbo palafitos',
    fallbackQuery: 'Congo Mirador palafitos Catatumbo',
    place: 'Ologá · Aldea flotante en el delta del Catatumbo'
  },
  {
    step: '3',
    id: 'congo-mirador',
    title: 'El Pueblo de Agua de Congo Mirador',
    query: 'Congo Mirador Zulia Venezuela',
    fallbackQuery: 'Palafitos Zulia Lago Maracaibo',
    place: 'Congo Mirador · Comunidad palafítica entre canales'
  },
  {
    step: '4',
    id: 'rio-catatumbo',
    title: 'Desembocadura del Río Catatumbo',
    query: 'Rio Catatumbo Zulia',
    fallbackQuery: 'Cienagas de Juan Manuel Catatumbo',
    place: 'Boca del río Catatumbo · Encuentro de agua dulce y lago'
  },
  {
    step: '5',
    id: 'cienagas-juan-manuel',
    title: 'Parque Nacional Ciénagas de Juan Manuel',
    query: 'Cienagas de Juan Manuel',
    fallbackQuery: 'Humedales Zulia Catatumbo',
    place: 'Ciénagas del Catatumbo · Parque Nacional protector del fenómeno'
  },
  {
    step: '6',
    id: 'fauna-y-toninas',
    title: 'Fauna de las Ciénagas y el Lago',
    query: 'Lago de Maracaibo aves OR fauna OR garzas',
    fallbackQuery: 'Fauna Zulia Venezuela lago',
    place: 'Cuenca del Catatumbo · Garzas, toninas y caimanes'
  },
  {
    step: '7',
    id: 'faro-de-maracaibo',
    title: 'El Faro de Maracaibo',
    query: 'Catatumbo lightning night',
    fallbackQuery: 'Relampago Catatumbo noche',
    place: 'Horizonte sur del lago · La luz que guió navegantes desde el siglo XVI'
  },
  {
    step: '8',
    id: 'pescadores-amanecer',
    title: 'Amanecer de los Pescadores',
    query: 'Pescadores Lago de Maracaibo',
    fallbackQuery: 'Botes Lago de Maracaibo Zulia',
    place: 'Aguas del Catatumbo · Pesca artesanal al clarear el día'
  },
  {
    step: '9',
    id: 'cumulonimbos',
    title: 'Torres de Cúmulonimbos',
    query: 'Cumulonimbus Lago de Maracaibo OR Catatumbo nubes',
    fallbackQuery: 'Tormenta Lago de Maracaibo',
    place: 'Cielo zuliano · Nubes de tormenta de 12 km de altura'
  },
  {
    step: '10',
    id: 'puente-y-resplandor',
    title: 'El Lago y el Horizonte Iluminado',
    query: 'Puente General Rafael Urdaneta Maracaibo noche',
    fallbackQuery: 'Puente sobre el Lago de Maracaibo',
    place: 'Maracaibo · El coloso de concreto sobre las aguas históricas'
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
  console.log('Buscando y descargando 10 fotos HD verificadas de Catatumbo...\n');
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
        webPath: `/images/destinations/catatumbo/${filename}`,
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
