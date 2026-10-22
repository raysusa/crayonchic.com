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

## Analytics (GoatCounter)
Every page loads GoatCounter (free, no cookies, no banner needed). The site code lives in ONE place:
CRAYON_BRAND.goatcounter in catalog.js ("crayonchic", dashboard: https://crayonchic.goatcounter.com).
If it changes, edit it there and run `node tools/build-pages.js`; that writes it into index.html and every book page.
Click tracking: every Amazon button carries data-goatcounter-click, named buy-<slug>-<where>
(e.g. buy-lebanese-mezze-home-hero, buy-lebanese-sweets-bookpage, buy-lebanese-mezze-bookpage-nav).
Buttons rendered from catalog.js get these automatically, so new books need nothing extra.
Other events: review-<slug>-bookpage, xmas-banner-buy-<slug>-<home|bookpage>, xmas-banner-dismiss-<page>.

## Seasonal banner
CRAYON_PROMO.christmas in catalog.js. Set enabled: false to switch it off; it also hides itself
automatically from hideFrom (2026-12-26). Visitors who close it don't see it again (localStorage).
Preview anytime with ?xmas=1, hide with ?xmas=0.

## Reviews
Each live book with an `asin` in catalog.js gets a "Loved it? Leave a review" block on its page,
linking to https://www.amazon.com/review/create-review?asin=<ASIN>.
