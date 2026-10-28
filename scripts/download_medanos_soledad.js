const https = require('https');
const fs = require('fs');
const path = require('path');

const agent = new https.Agent({ rejectUnauthorized: false });
const USER_AGENT = 'ConociendoMiTierraApp/1.0 (https://github.com/conociendo-mi-tierra; edu-contact@conociendomitierra.org)';
const targetDir = path.join('public', 'images', 'destinations', 'medanos-soledad');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const targets = [
  {
    step: '1',
    title: 'Los Médanos de la Soledad',
    query: 'Medanos de la Soledad Apure OR Medanos de la Soledad Capanaparo',
    fallbackQuery: 'Medanos Apure Venezuela',
    desc: 'Dunas de arena eólica que se alzan insólitamente en medio de la sabana plana de Apure'
  },
  {
    step: '2',
    title: 'Crestas Onduladas por los Alisios',
    query: 'dunas Capanaparo OR Medanos de la Soledad arena',
    fallbackQuery: 'medanos Santos Luzardo',
    desc: 'Ondulaciones y curvas de arena fina esculpidas por el viento alisio que recorre el llano'
  },
  {
    step: '3',
    title: 'El Contraste de Duna y Sabana',
    query: 'sabana y medanos Apure OR dunas y sabana Santos Luzardo',
    fallbackQuery: 'Capanaparo sabana arena',
    desc: 'El límite asombroso donde el desierto de arena se funde con los pastizales y chaparros'
  },
  {
    step: '4',
    title: 'Morichales del Capanaparo',
    query: 'Morichal Capanaparo OR morichales Santos Luzardo',
    fallbackQuery: 'Morichal Apure llanos',
    desc: 'Oasis fluviales de palma moriche (*Mauritia flexuosa*) que nacen entre las arenas'
  },
  {
    step: '5',
    title: 'Río Capanaparo y los Arenales',
    query: 'Rio Capanaparo arena OR Rio Capanaparo playas',
    fallbackQuery: 'Rio Capanaparo Apure',
    desc: 'El río de aguas mansas bordeando las faldas de los médanos en la estación seca'
  },
  {
    step: '6',
    title: 'Fauna Silvestre de la Llanura Apureña',
    query: 'fauna Capanaparo OR chiguire Capanaparo OR venado Apure',
    fallbackQuery: 'fauna Santos Luzardo Apure',
    desc: 'Chigüires, venados y aves acuáticas congregados alrededor de las fuentes de agua'
  },
  {
    step: '7',
    title: 'La Chalana del Capanaparo',
    query: 'Chalana cruzando el rio Capanaparo OR chalana Capanaparo',
    fallbackQuery: 'chalana Apure rio',
    desc: 'La balsa fluvial tradicional que transporta viajeros y vehículos hacia la soledad del sur'
  },
  {
    step: '8',
    title: 'Horizontes del Parque Santos Luzardo',
    query: 'Parque Nacional Santos Luzardo sabana OR Santos Luzardo llanos',
    fallbackQuery: 'horizonte Apure sabana',
    desc: 'La llanura abierta y desolada que inspiró a Rómulo Gallegos en su novela Doña Bárbara'
  },
  {
    step: '9',
    title: 'Expedición y Travesía en los Médanos',
    query: 'Capanaparo expedicion OR Medanos de la Soledad campamento',
    fallbackQuery: 'campamento Apure sabana',
    desc: 'Travesía todoterreno y vivac en uno de los parajes más aislados y limpios de Venezuela'
  },
  {
    step: '10',
    title: 'Atardecer de Cobre sobre las Dunas',
    query: 'atardecer Capanaparo OR atardecer medanos Apure',
    fallbackQuery: 'Capanaparo Sunset OR atardecer Apure sabana',
    desc: 'El crepúsculo proyectando sombras infinitas sobre el mar de arena y la sabana dorada'
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
  console.log('Buscando y verificando 10 fotos HD de Médanos de la Soledad...\n');
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
        webPath: `/images/destinations/medanos-soledad/${filename}`,
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
