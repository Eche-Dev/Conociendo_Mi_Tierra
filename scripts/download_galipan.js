const https = require('https');
const fs = require('fs');
const path = require('path');

const agent = new https.Agent({ rejectUnauthorized: false });
const USER_AGENT = 'ConociendoMiTierraApp/1.0 (https://github.com/conociendo-mi-tierra; edu-contact@conociendomitierra.org)';
const targetDir = path.join('public', 'images', 'destinations', 'galipan');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const targets = [
  {
    step: '1',
    title: 'El Valle de Galipán',
    query: 'Galipan Avila Caracas OR Galipan Venezuela panorama',
    fallbackQuery: 'Galipan Avila',
    desc: 'El apacible pueblo de montaña escondido en la vertiente norte del Waraira Repano'
  },
  {
    step: '2',
    title: 'Campos de Flores y Hortensias',
    query: 'flores Galipan Avila OR hortensias Galipan',
    fallbackQuery: 'flores Galipan',
    desc: 'Los históricos sembradíos de claveles, rosas y hortensias cultivados por familias de origen canario'
  },
  {
    step: '3',
    title: 'Caminos de Piedra y Laderas Agrícolas',
    query: 'casas Galipan Avila OR camino Galipan',
    fallbackQuery: 'Galipan pueblo',
    desc: 'Senderos empinados de piedra y casas campesinas que desafían las laderas de la montaña'
  },
  {
    step: '4',
    title: 'Capilla San Isidro Labrador',
    query: 'iglesia Galipan OR capilla San Isidro Galipan',
    fallbackQuery: 'iglesia San Isidro Galipan',
    desc: 'El templo rústico del pueblo dedicado al protector de las cosechas y la fertilidad de la tierra'
  },
  {
    step: '5',
    title: 'Gastronomía y Tradición de Montaña',
    query: 'restaurante Galipan OR gastronomia Galipan',
    fallbackQuery: 'Galipan Avila comida',
    desc: 'Los famosos mesones rústicos de pernil, dulces caseros y vinos artesanales de mora'
  },
  {
    step: '6',
    title: 'Fresas con Crema y Frutos de Altura',
    query: 'fresas con crema Galipan OR melocotones Galipan',
    fallbackQuery: 'fresas Galipan',
    desc: 'El clásico manjar de la montaña entre cosechas frescas de fresas y melocotones'
  },
  {
    step: '7',
    title: 'Mirador al Mar Caribe',
    query: 'vista La Guaira desde Galipan OR vista mar desde Galipan',
    fallbackQuery: 'vista La Guaira Galipan',
    desc: 'El balcón natural con vistas directas al azul zafiro del Mar Caribe y el aeropuerto de Maiquetía'
  },
  {
    step: '8',
    title: 'Bosque de Pinos y Neblina Andina',
    query: 'bosque Galipan Avila OR niebla Galipan',
    fallbackQuery: 'senderos Galipan',
    desc: 'El bosque templado de eucaliptos, pinos y helechos envuelto en la bruma de la tarde'
  },
  {
    step: '9',
    title: 'Arte Ecológico y Miradores Esculpidos',
    query: 'Museo de las Piedras Galipan OR arte Galipan',
    fallbackQuery: 'Museo de Arte Ecologico Galipan',
    desc: 'Obras de arte y miradores integrados con la geología marina y las rocas del Ávila'
  },
  {
    step: '10',
    title: 'Atardecer sobre el Mar de Nubes',
    query: 'atardecer Galipan OR mar de nubes Galipan',
    fallbackQuery: 'atardecer Avila La Guaira',
    desc: 'El océano de nubes doradas al caer el sol sobre el litoral central venezolano'
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

function downloadImage(url, destPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destPath);
    https.get(url, { agent, headers: { 'User-Agent': USER_AGENT } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadImage(res.headers.location, destPath).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        file.close();
        fs.unlink(destPath, () => {});
        return reject(new Error(`Status ${res.statusCode}`));
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve());
      });
    }).on('error', (err) => {
      file.close();
      fs.unlink(destPath, () => {});
      reject(err);
    });
  });
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function searchWikimedia(query) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=15&prop=imageinfo&iiprop=url|size|mime&iiurlwidth=2048`;
  const res = await fetchJson(url);
  if (!res.query || !res.query.pages) return [];
  
  const pages = Object.values(res.query.pages);
  const results = [];
  for (const page of pages) {
    if (!page.imageinfo || !page.imageinfo[0]) continue;
    const info = page.imageinfo[0];
    const mime = info.mime || '';
    if (!mime.startsWith('image/jpeg') && !mime.startsWith('image/png') && !mime.startsWith('image/webp')) continue;
    
    const title = page.title.toLowerCase();
    if (title.includes('map') || title.includes('hoja') || title.includes('dcn') || title.includes('icon') || title.includes('flag') || title.includes('logo') || title.includes('specimen') || title.includes('herbarium')) continue;
    
    const width = info.width || 0;
    const height = info.height || 0;
    if (width < 1000) continue;
    if (width / height < 1.05) continue; // landscape prefer
    
    results.push({
      title: page.title,
      width,
      height,
      url: info.thumburl || info.url
    });
  }
  return results;
}

async function run() {
  console.log('Buscando y verificando 10 fotos HD de Galipán...');
  const usedTitles = new Set();
  
  for (let i = 0; i < targets.length; i++) {
    const target = targets[i];
    console.log(`\n[${i+1}/10] ${target.title}`);
    
    let candidates = await searchWikimedia(target.query);
    await sleep(600);
    
    if (candidates.length === 0 && target.fallbackQuery) {
      candidates = await searchWikimedia(target.fallbackQuery);
      await sleep(600);
    }
    
    let chosen = candidates.find(c => !usedTitles.has(c.title));
    if (!chosen && candidates.length > 0) {
      chosen = candidates[0];
    }
    
    if (!chosen) {
      // General Galipan fallback search
      const genCandidates = await searchWikimedia('Galipan Avila');
      await sleep(600);
      chosen = genCandidates.find(c => !usedTitles.has(c.title));
    }
    
    if (chosen) {
      usedTitles.add(chosen.title);
      console.log(`       Archivo: ${chosen.title} (${chosen.width}x${chosen.height})`);
      console.log(`       Lugar: ${target.desc}`);
      const destFile = path.join(targetDir, `${target.step}.jpg`);
      try {
        await downloadImage(chosen.url, destFile);
        const stats = fs.statSync(destFile);
        console.log(`       -> Descargado con éxito: ${target.step}.jpg (${Math.round(stats.size/1024)} KB)`);
      } catch (err) {
        console.error(`       Error al descargar: ${err.message}`);
      }
    } else {
      console.warn(`       [AVISO] No se encontró candidato para: ${target.title}`);
    }
  }
  
  console.log('\n=======================================================');
  console.log(`Descarga finalizada. Guardado en: ${targetDir}`);
}

run();
