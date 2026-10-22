// Generates books/<slug>/index.html for every entry in catalog.js, plus sitemap.xml.
// Usage (from the site folder):  node tools/build-pages.js
const fs = require('fs'), path = require('path'), vm = require('vm');
const root = path.join(__dirname, '..');
const ctx = { window: {} }; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(root, 'catalog.js'), 'utf8'), ctx);
const books = ctx.window.CRAYON_BOOKS;
const tpl = fs.readFileSync(path.join(root, 'books/_template/index.html'), 'utf8');
const esc = s => String(s || '').replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;');
const today = new Date().toLocaleDateString('en-CA');
let urls = [`https://crayonchic.com/`];
for (const b of books) {
  const html = tpl.split('{{SLUG}}').join(b.slug).split('{{TITLE}}').join(esc(b.title))
    .split('{{DESC}}').join(esc(b.tagline + ' ' + (b.status === 'live' ? 'Available now on Amazon.' : 'Coming soon.')))
    .split('{{COVER}}').join(b.cover)
    .split('{{AMAZON}}').join(b.amazonUrl || 'https://crayonchic.com/');
  fs.mkdirSync(path.join(root, 'books', b.slug), { recursive: true });
  fs.writeFileSync(path.join(root, 'books', b.slug, 'index.html'), html);
  urls.push(`https://crayonchic.com/books/${b.slug}/`);
  console.log('built books/' + b.slug + '/');
}
fs.writeFileSync(path.join(root, 'sitemap.xml'),
  '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
  urls.map(u => `<url><loc>${u}</loc><lastmod>${today}</lastmod></url>`).join('') + '</urlset>\n');
console.log('sitemap.xml updated');
