// Generates books/<slug>/index.html for every entry in catalog.js, plus sitemap.xml.
// Usage (from the site folder):  node tools/build-pages.js
const fs = require('fs'), path = require('path'), vm = require('vm');
const root = path.join(__dirname, '..');
const ctx = { window: {} }; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(root, 'catalog.js'), 'utf8'), ctx);
const books = ctx.window.CRAYON_BOOKS;
const gc = ((ctx.window.CRAYON_BRAND || {}).goatcounter || 'crayonchic').trim();
const tpl = fs.readFileSync(path.join(root, 'books/_template/index.html'), 'utf8');
const esc = s => String(s || '').replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;');
const today = new Date().toLocaleDateString('en-CA');
let urls = [`https://crayonchic.com/`];
for (const b of books) {
  const html = tpl.split('{{SLUG}}').join(b.slug).split('{{TITLE}}').join(esc(b.title))
    .split('{{DESC}}').join(esc(b.tagline + ' ' + (b.status === 'live' ? 'Available now on Amazon.' : 'Coming soon.')))
    .split('{{COVER}}').join(b.cover)
    .split('{{AMAZON}}').join(b.amazonUrl || 'https://crayonchic.com/')
    .split('{{GOATCOUNTER}}').join(gc);
  fs.mkdirSync(path.join(root, 'books', b.slug), { recursive: true });
  fs.writeFileSync(path.join(root, 'books', b.slug, 'index.html'), html);
  urls.push(`https://crayonchic.com/books/${b.slug}/`);
  console.log('built books/' + b.slug + '/');
}
fs.writeFileSync(path.join(root, 'sitemap.xml'),
  '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
  urls.map(u => `<url><loc>${u}</loc><lastmod>${today}</lastmod></url>`).join('') + '</urlset>\n');
console.log('sitemap.xml updated');
// Keep the GoatCounter code on the home page in sync with catalog.js
const idx = path.join(root, 'index.html');
const home = fs.readFileSync(idx, 'utf8');
const home2 = home.replace(/https:\/\/[A-Za-z0-9_-]+\.goatcounter\.com\/count/g, `https://${gc}.goatcounter.com/count`);
if (home2 !== home) { fs.writeFileSync(idx, home2); console.log('index.html GoatCounter code set to ' + gc); }
