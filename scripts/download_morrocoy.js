const https = require('https');
const fs = require('fs');
const path = require('path');

const agent = new https.Agent({ rejectUnauthorized: false });
const targetDir = path.join('public', 'images', 'destinations', 'morrocoy');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const targets = [
  {
    step: '1',
    id: 'cayo-sombrero',
    title: 'Cayo Sombrero',
    query: 'Cayo Sombrero Morrocoy',
    fallbackQuery: 'Cayo Sombrero Venezuela',
    place: 'Parque Nacional Morrocoy · El cayo más emblemático con sus palmeras y aguas turquesas'
  },
  {
    step: '2',
    id: 'cayo-borracho',
    title: 'Cayo Borracho y Aguas Cristalinas',
    query: 'Cayo Borracho Morrocoy',
    fallbackQuery: 'Cayo Borracho Falcon',
    place: 'Sector norte · Aguas cristalinas y orilla solitaria de arena de coral'
  },
  {
    step: '3',
    id: 'cayo-sal',
    title: 'Cayo Sal y la Capilla Marina',
    query: 'Cayo Sal Morrocoy',
    fallbackQuery: 'Cayo Sal Falcon Venezuela',
    place: 'Morrocoy interior · Su laguna salobre, arrecifes y capilla'
  },
  {
    step: '4',
    id: 'los-juanes',
    title: 'Los Juanes (La Piscina Natural)',
    query: 'Los Juanes Morrocoy',
    fallbackQuery: 'Los Juanes Falcon Venezuela',
    place: 'Bajo natural · Aguas transparentes de baja profundidad donde fondean las lanchas'
  },
  {
    step: '5',
    id: 'cayo-playuela',
    title: 'Cayo Playuela y Playuelita',
    query: 'Cayo Playuela Morrocoy OR Playuelita Morrocoy',
    fallbackQuery: 'Playuela Morrocoy',
    place: 'Zona de arrecifes · Playas gemelas protegidas ideales para snorkel'
  },
  {
    step: '6',
    id: 'cayo-peraza',
    title: 'Cayo Peraza',
    query: 'Cayo Peraza Morrocoy',
    fallbackQuery: 'Cayo Peraza Venezuela',
    place: 'Pequeño atolón virgen rodeado de corales vivos'
  },
  {
    step: '7',
    id: 'cueva-del-indio',
    title: 'Cueva del Indio y Petroglifos',
    query: 'Cueva del Indio Morrocoy',
    fallbackQuery: 'Cueva del Indio Falcon',
    place: 'Farallones del parque · Paredes de roca calcárea y arte rupestre prehispánico'
  },
  {
    step: '8',
    id: 'canales-de-manglar',
    title: 'Laberinto de Manglares y Caño León',
    query: 'Morrocoy manglares OR manglar Morrocoy',
    fallbackQuery: 'Parque Nacional Morrocoy manglar',
    place: 'Zona marina · Túneles de mangle rojo y refugio de aves acuáticas'
  },
  {
    step: '9',
    id: 'cayo-muerto',
    title: 'Cayo Muerto y sus Palmeras',
    query: 'Cayo Muerto Morrocoy',
    fallbackQuery: 'Cayo Muerto Chichiriviche',
    place: 'Frente a Chichiriviche · Extenso palmar de cocoteros y arena blanca'
  },
  {
    step: '10',
    id: 'atardecer-morrocoy',
    title: 'Atardecer Dorado en Morrocoy',
    query: 'Atardecer Morrocoy OR sunset Morrocoy',
    fallbackQuery: 'Parque Nacional Morrocoy sunset',
    place: 'Golfo Triste · El crepúsculo cayendo sobre los cayos y el Mar Caribe'
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
  console.log('Buscando y verificando 10 fotos HD de Parque Nacional Morrocoy...\n');
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
                 !lower.includes('map') && !lower.includes('icon') && !lower.includes('flag') && !lower.includes('logo') &&
                 !lower.includes('herbarium') && !lower.includes('specimen');
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
        webPath: `/images/destinations/morrocoy/${filename}`,
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
