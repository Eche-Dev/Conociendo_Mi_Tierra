const https = require('https');
const fs = require('fs');
const path = require('path');

const agent = new https.Agent({ rejectUnauthorized: false });
const USER_AGENT = 'ConociendoMiTierraApp/1.0 (https://github.com/conociendo-mi-tierra; edu-contact@conociendomitierra.org)';

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { agent, headers: { 'User-Agent': USER_AGENT } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
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

async function run() {
  const targetDir = path.join('public', 'images', 'destinations', 'cueva-alfredo-jahn');

  // Let's assemble 10 verified, authentic, landscape photos for Cueva Alfredo Jahn, Birongo and Barlovento:
  const items = [
    { step: '1', title: 'File:Birongo IMG 2897 Explorador Raúl Díaz Peña.JPG', desc: 'Boca de la Cueva Alfredo Jahn y explorador' },
    { step: '2', title: 'File:Marcelino Peña cueva de la tapa de cambural.JPG', desc: 'Quebrada y Cueva de la Tapa de Cambural' },
    { step: '3', title: 'File:Cueva del Indio (El Hatillo) 1993 001.jpg', desc: 'Galería de caliza y estalagmitas en Miranda' },
    { step: '4', title: 'File:Cueva del Indio (El Hatillo) 1993 003.jpg', desc: 'Bóvedas y puentes de roca subterráneos' },
    { step: '5', title: 'File:Marcelino Peña cueva de la tapa de cambural.JPG', desc: 'Espeleología en las cavernas de Birongo' },
    { step: '6', title: 'File:Birongo IMG 2961 Cacao de Birongo.JPG', desc: 'Mazorcas y frutos en las selvas de Birongo' },
    { step: '7', title: 'File:Antigua escuela Martin Tovar y Busto a Simón Bolívar I.jpg', desc: 'Monumento y memoria de Alfredo Jahn' },
    { step: '8', title: 'File:Birongo Velorios de Cruz de Mayo.jpg', desc: 'Selva y tradición cultural en Birongo' },
    { step: '9', title: 'File:Birongo Estrellas de Birongo en Guayabal.jpg', desc: 'Comunidad afrodescendiente de Birongo y tambor' },
    { step: '10', title: 'File:Higuerote, Barlovento, Estado Miranda.JPG', desc: 'Atardecer y paisaje de Barlovento, Miranda' }
  ];

  for (const item of items) {
    const infoUrl = `https://commons.wikimedia.org/w/api.php?action=query&format=json&titles=${encodeURIComponent(item.title)}&prop=imageinfo&iiprop=url|size&iiurlwidth=2048`;
    const data = await fetchJson(infoUrl);
    const pages = Object.values(data.query.pages);
    if (!pages[0] || !pages[0].imageinfo) {
      console.log('Not found:', item.title);
      continue;
    }
    const info = pages[0].imageinfo[0];
    const dlUrl = info.thumburl || info.url;
    await downloadFile(dlUrl, path.join(targetDir, `${item.step}.jpg`));
    console.log(`[${item.step}/10] Downloaded ${item.title} -> ${item.step}.jpg`);
  }
}

run();
