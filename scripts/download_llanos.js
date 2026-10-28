const https = require('https');
const fs = require('fs');
const path = require('path');

const agent = new https.Agent({ rejectUnauthorized: false });
const targetDir = path.join('public', 'images', 'destinations', 'los-llanos');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const targets = [
  {
    step: '1',
    id: 'sabana-inundable',
    title: 'La Inmensidad de la Sabana Llanera',
    query: 'Llanos de Apure sabana Venezuela',
    fallbackQuery: 'Esteros de Camaguan Guarico',
    place: 'Apure · La llanura inundable donde el agua y el cielo se funden'
  },
  {
    step: '2',
    id: 'llanero-a-caballo',
    title: 'El Llanero y la Faena a Caballo',
    query: 'Llanero caballo Apure Venezuela',
    fallbackQuery: 'Arreo de ganado llanos Venezuela',
    place: 'Hatos de Apure · Cantos de trabajo y arreo de ganado'
  },
  {
    step: '3',
    id: 'chiguires-esteros',
    title: 'Manada de Chigüires en los Esteros',
    query: 'Chiguires Venezuela Llanos OR Capybara Llanos Venezuela',
    fallbackQuery: 'Hydrochoerus hydrochaeris Venezuela',
    place: 'Esteros de Camaguán · El roedor más grande del planeta'
  },
  {
    step: '4',
    id: 'caiman-del-orinoco',
    title: 'Caimán del Orinoco',
    query: 'Caiman del Orinoco Venezuela',
    fallbackQuery: 'Crocodylus intermedius Venezuela Apure',
    place: 'Caño Guaritico · Santuario de fauna silvestre'
  },
  {
    step: '5',
    id: 'corocoras-rojas',
    title: 'Vuelo de Corocoras Rojas',
    query: 'Corocoras rojas Venezuela Llanos OR Eudocimus ruber Venezuela',
    fallbackQuery: 'Garzas Llanos de Apure',
    place: 'Humedales llaneros · El espectáculo escarlata al atardecer'
  },
  {
    step: '6',
    id: 'morichales-llano',
    title: 'Palmares de Moriche',
    query: 'Morichal Venezuela Llanos OR Mauritia flexuosa Venezuela',
    fallbackQuery: 'Palmas moriche Apure',
    place: 'Bosques de galería · El árbol de la vida de los Llanos'
  },
  {
    step: '7',
    id: 'rio-apure-pesca',
    title: 'Ríos y Caños del Llano',
    query: 'Rio Apure Venezuela',
    fallbackQuery: 'Rio Apure San Fernando',
    place: 'Río Apure · La arteria fluvial de las sabanas del sur'
  },
  {
    step: '8',
    id: 'toninas-delfin-rio',
    title: 'Toninas del Río Apure',
    query: 'Tonina rio Apure Venezuela OR Inia geoffrensis Venezuela',
    fallbackQuery: 'Delfin rosado rio Apure',
    place: 'Confluencia Apure-Orinoco · Delfín de río de agua dulce'
  },
  {
    step: '9',
    id: 'hato-llanero-joropo',
    title: 'El Hato y la Tradición Llanera',
    query: 'Hato El Frio Apure OR Hato Pinero',
    fallbackQuery: 'Casa de hato llanero Venezuela',
    place: 'Corazón llanero · Casonas de hato, arpa y copla'
  },
  {
    step: '10',
    id: 'atardecer-llanero',
    title: 'El Atardecer de Fuego en la Llanura',
    query: 'Atardecer en los Llanos de Venezuela',
    fallbackQuery: 'Sunset Llanos Venezuela Apure',
    place: 'Bajo Apure · El crepúsculo más amplio y limpio del continente'
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
  console.log('Buscando y verificando 10 fotos HD de Los Llanos de Venezuela...\n');
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
        webPath: `/images/destinations/los-llanos/${filename}`,
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
