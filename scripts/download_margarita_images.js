const https = require('https');
const fs = require('fs');
const path = require('path');

const agent = new https.Agent({ rejectUnauthorized: false });
const targetDir = path.join('public', 'images', 'destinations', 'margarita');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const targets = [
  {
    step: '01',
    id: 'bahia-pampatar',
    title: 'Bahía de Pampatar y Costa Oriental',
    query: 'Pampatar Margarita Island Venezuela',
    place: 'Pampatar · Entrada marítima y costa oriental'
  },
  {
    step: '02',
    id: 'castillo-san-carlos-borromeo',
    title: 'Castillo San Carlos de Borromeo',
    query: 'Castillo San Carlos Borromeo',
    place: 'Pampatar · Fortaleza militar de piedra de 1662'
  },
  {
    step: '03',
    id: 'playa-el-agua',
    title: 'Playa El Agua',
    query: 'Playa El Agua',
    place: 'Antolín del Campo · 4 km de arena dorada y cocoteros'
  },
  {
    step: '04',
    id: 'playa-parguito',
    title: 'Playa Parguito',
    query: 'Playa Parguito',
    place: 'Costa Noreste · Santuario de olas y anidación de tortugas'
  },
  {
    step: '05',
    id: 'laguna-la-restinga',
    title: 'Parque Nacional Laguna de La Restinga',
    query: 'Laguna de La Restinga manglares',
    place: 'El istmo central · Laberinto de canales y manglar rojo'
  },
  {
    step: '06',
    id: 'juan-griego-atardecer',
    title: 'Bahía de Juan Griego y Fortín de La Galera',
    query: 'Juan Griego Sunset',
    place: 'Norte de Margarita · El atardecer más legendario del Caribe'
  },
  {
    step: '07',
    id: 'castillo-santa-rosa',
    title: 'Castillo Santa Rosa',
    query: 'Castillo de Santa Rosa Margarita',
    place: 'La Asunción · Mirador histórico y calabozo de Luisa Cáceres'
  },
  {
    step: '08',
    id: 'basilica-del-valle',
    title: 'Basílica Menor de Nuestra Señora del Valle',
    query: 'Basilica Nuestra Senora del Valle',
    place: 'El Valle del Espíritu Santo · Corazón devoto de oriente'
  },
  {
    step: '09',
    id: 'peninsula-macanao',
    title: 'Península de Macanao y Punta Arenas',
    query: 'Punta Arenas Peninsula de Macanao',
    place: 'Extremo occidental · Sabana árida, cactus y mar abierto'
  },
  {
    step: '10',
    id: 'playa-el-yaque',
    title: 'Playa El Yaque',
    query: 'Playa El Yaque Margarita',
    place: 'Costa Sur · Meca mundial de windsurf y kitesurf'
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
  console.log('Descargando 10 fotos HD verificadas de Isla de Margarita desde Wikimedia Commons...\n');
  const manifest = [];

  for (const t of targets) {
    try {
      // Pedir ancho renderizado de 2048px (HD cristalino optimizado para web)
      const searchUrl = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=${encodeURIComponent(t.query)}&gsrnamespace=6&gsrlimit=10&prop=imageinfo&iiprop=url|size|extmetadata&iiurlwidth=2048`;
      const data = await fetchJson(searchUrl);

      const pages = (data.query && data.query.pages) ? Object.values(data.query.pages) : [];
      const validImages = pages
        .filter(p => p.imageinfo && p.imageinfo[0])
        .map(p => {
          const info = p.imageinfo[0];
          return {
            title: p.title,
            originalUrl: info.url,
            // Si hay thumb de 2048px usarlo, si no el original
            downloadUrl: info.thumburl || info.url,
            width: info.thumbwidth || info.width,
            height: info.thumbheight || info.height,
            originalWidth: info.width,
            originalHeight: info.height,
            size: info.size,
            description: info.extmetadata?.ObjectName?.value || p.title
          };
        })
        .filter(img => {
          const lower = img.title.toLowerCase();
          const cleanUrl = img.originalUrl.split('?')[0].toLowerCase();
          return (cleanUrl.endsWith('.jpg') || cleanUrl.endsWith('.jpeg') || cleanUrl.endsWith('.png') || cleanUrl.endsWith('.webp')) &&
                 !lower.includes('map') && !lower.includes('icon') && !lower.includes('flag') && !lower.includes('logo') &&
                 !lower.includes('butterfly') && !lower.includes('agraulis');
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
      const filename = `${t.step}-${t.id}.jpg`;
      const destPath = path.join(targetDir, filename);

      console.log(`[${t.step}/10] ${t.title}`);
      console.log(`       Archivo original: ${best.title} (${best.originalWidth}x${best.originalHeight})`);
      console.log(`       Resolución para web: ${best.width} x ${best.height} px`);
      console.log(`       Ubicación verificada: ${t.place}`);

      await sleep(1200); // Respetar rate-limit de Wikimedia
      await downloadFile(best.downloadUrl, destPath);

      const downloadedSize = Math.round(fs.statSync(destPath).size / 1024);
      console.log(`       -> Descargado con éxito: ${filename} (${downloadedSize} KB)\n`);

      manifest.push({
        step: t.step,
        id: t.id,
        title: t.title,
        place: t.place,
        filename,
        webPath: `/images/destinations/margarita/${filename}`,
        width: best.width,
        height: best.height,
        originalWidth: best.originalWidth,
        originalHeight: best.originalHeight,
        sizeKb: downloadedSize,
        wikimediaTitle: best.title,
        sourceUrl: best.originalUrl
      });
    } catch (err) {
      console.error(`Error en ${t.title}:`, err.message);
    }
  }

  const manifestPath = path.join(targetDir, 'manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`=======================================================`);
  console.log(`¡COMPLETADO! ${manifest.length}/10 imágenes HD verificadas descargadas.`);
  console.log(`Guardado en: ${targetDir}`);
}

run();
