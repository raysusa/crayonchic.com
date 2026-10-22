# Crayon Chic website

Static site (GitHub Pages). Home page = index.html (one page). Book pages = books/<slug>/.

## Add a new book (no redesign needed)
1. Put the cover (and a few page previews) in img/ as .webp, plus a 1200x630 share thumbnail at img/og-<slug>.jpg (shown when the link is pasted in WhatsApp or messaging apps).
2. Open catalog.js and copy one book object in CRAYON_BOOKS. Change slug, title, subtitle,
   status ("live" or "coming-soon"), amazonUrl, price, accent color, arabic (true only for
   Arab-heritage books), pages, ages, cover, tagline, description, highlights, pagesPreview.
3. Run:  node tools/build-pages.js   (creates books/<slug>/index.html and updates sitemap.xml)
The home "Collection" shelf and every book page's "Also from Crayon Chic" update automatically.

## When a coming-soon book goes live
In catalog.js set its status to "live", statusLabel "Available now", amazonUrl (clean /dp/ link) and price, then rebuild.
Both current books (Mezze, Sweets) are live.

All books share one standard: 8.5 x 11 in, premium color, white paper, glossy cover (CRAYON_BRAND.trim).
