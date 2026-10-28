const https = require('https');
const fs = require('fs');
const path = require('path');

const agent = new https.Agent({ rejectUnauthorized: false });
const USER_AGENT = 'ConociendoMiTierraApp/1.0 (https://github.com/conociendo-mi-tierra; edu-contact@conociendomitierra.org)';

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
  const targetDir = path.join('public', 'images', 'destinations', 'los-roques');

  // 9. Cayo de Agua (el istmo de arena blanca y doble mar)
  console.log('Descargando 9.jpg (Cayo de Agua)...');
  const url9 = 'https://upload.wikimedia.org/wikipedia/commons/7/77/Cayo_de_Agua_in_Los_Roques.jpg';
  await downloadFile(url9, path.join(targetDir, '9.jpg'));
  console.log('9.jpg guardado:', fs.statSync(path.join(targetDir, '9.jpg')).size, 'bytes');

  // 10. Cayo Francisqui (La Piscinita y barrera de coral de Francisquí)
  console.log('Descargando 10.jpg (Cayo Francisqui Apacible)...');
  const url10 = 'https://upload.wikimedia.org/wikipedia/commons/0/04/Cayo_Francisqui_apacible.JPG';
  await downloadFile(url10, path.join(targetDir, '10.jpg'));
  console.log('10.jpg guardado:', fs.statSync(path.join(targetDir, '10.jpg')).size, 'bytes');

  console.log('¡Descarga de 9 y 10 completada!');
}

run();
