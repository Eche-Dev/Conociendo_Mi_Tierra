const fs = require('fs');
const content = fs.readFileSync('lib/data/destinations.ts', 'utf8');
const regex = /id:\s*'([^']+)',\s*name:\s*'([^']+)'/g;
let match;
let i = 1;
const list = [];
while ((match = regex.exec(content)) !== null) {
  list.push({ index: i++, id: match[1], name: match[2] });
}
console.log(`Total destinos: ${list.length}`);
list.forEach(d => console.log(`${d.index}. [${d.id}] ${d.name}`));
