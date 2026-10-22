/* ===================================================================
   CRAYON CHIC — BOOK CATALOG (single source of truth)
   To add a book: copy one object below, change its values, then copy
   books/_template/ to books/<slug>/ (see README.md). Nothing else.
   Image paths are relative to the site root.
   =================================================================== */
window.CRAYON_BRAND = {
  name: "Crayon Chic",
  founder: "Ray Safi",
  // One premium standard shared by every book (KDP: Premium color, white paper, glossy, 8.5 x 11 in, no bleed)
  trim: "8.5 × 11 in",
  print: "Premium color on bright white paper",
  cover: "Glossy cover",
  instagram: "https://www.instagram.com/crayon.chic/",
  email: "hello@crayonchic.com"
};

window.CRAYON_BOOKS = [
  {
    slug: "lebanese-mezze",
    collection: "The Lebanese Collection",
    title: "My First Lebanese Mezze Coloring Book",
    shortTitle: "Lebanese Mezze",
    subtitle: "20 Big & Simple Food Pictures for Toddlers and Kids Ages 2–6: Tabbouleh, Falafel, Man’oushe, Shawarma and More",
    titleAr: "مازة لبنانية",
    status: "live",                 // "live" | "coming-soon"
    statusLabel: "Available now",
    amazonUrl: "https://www.amazon.com/dp/B0HNJ17JMC",
    price: "$13.49",
    accent: "#245F5A",              // teal
    arabic: true,                   // shows English + Arabic labels (Arab-heritage books only)
    audience: "Kids",
    ages: "2–6",
    pages: 50,
    cover: "img/mezze-cover.webp",
    coverSm: "img/mezze-cover-sm.webp",
    coverAlt: "Cover of My First Lebanese Mezze Coloring Book, with tabbouleh, hummus, falafel, fattoush and lentil soup on a teal tile pattern",
    tagline: "Twenty beloved dishes from the Lebanese table, from tabbouleh to kibbeh.",
    description: "Every meal in Lebanon starts with mezze: little plates, shared by everyone. This book sets twenty of them on the table, big and simple for small hands. Each dish has a full-color guide on the left and bold line art on the right, and every name is written in English and Arabic.",
    highlights: [
      "20 Lebanese dishes plus bonus Man’oushe and Shawarma pages",
      "A full-color guide beside every coloring page",
      "Every name in English and Arabic",
      "Thick, bold lines for ages 2–6",
      "A blank plate to draw your own mezze",
      "Made for crayons and colored pencils"
    ],
    standouts: ["Tabbouleh", "Kibbeh"],
    pagesPreview: [
      { img: "img/g-04.webp", en: "Tabbouleh", ar: "تبولة", standout: true },
      { img: "img/g-08.webp", en: "Kibbeh", ar: "كبة", standout: true },
      { img: "img/g-22.webp", en: "Falafel", ar: "فلافل" },
      { img: "img/g-36.webp", en: "Hummus", ar: "حمص" },
      { img: "img/g-24.webp", en: "Fattoush", ar: "فتوش" },
      { img: "img/g-42.webp", en: "Baba Ghanouj", ar: "بابا غنوج" },
      { img: "img/g-46.webp", en: "Man’oushe", ar: "منقوشة", note: "Bonus" },
      { img: "img/g-48.webp", en: "Shawarma", ar: "شاورما", note: "Bonus" }
    ]
  },
  {
    slug: "lebanese-sweets",
    collection: "The Lebanese Collection",
    title: "My First Lebanese Sweets Coloring Book",
    shortTitle: "Lebanese Sweets",
    subtitle: "20 Big & Simple Dessert Pictures for Toddlers and Kids Ages 2–6: Baklawa, Maamoul, Knafeh, Booza and More",
    titleAr: "حلويات لبنانية",
    status: "live",
    statusLabel: "Available now",
    amazonUrl: "https://www.amazon.com/dp/B0HNRZ9T2G",
    price: "$13.49",
    accent: "#5B1D31",              // rose
    arabic: true,
    audience: "Kids",
    ages: "2–6",
    pages: 44,
    cover: "img/sweets-cover.webp",
    coverSm: "img/sweets-cover.webp",
    coverAlt: "Cover of My First Lebanese Sweets Coloring Book, with baklawa, maamoul, bûche de Noël, booza and znoud el sitt on a rose tile pattern",
    tagline: "The sweets tray, from baklawa and maamoul to knafeh and booza.",
    description: "In Lebanon, every celebration ends with something sweet. This book fills a whole tray with twenty treats for Christmas, Ramadan, Eid and Easter, each with a full-color guide and its name in English and Arabic. Same premium format as the Mezze book, so they sit side by side on the shelf.",
    highlights: [
      "20 favorite Lebanese sweets",
      "A full-color guide beside every page",
      "Sweet names in English and Arabic",
      "Treats for Christmas, Ramadan, Eid and Easter",
      "Thick, bold lines for ages 2–6"
    ],
    standouts: [],
    pagesPreview: [
      { img: "img/s-baklawa.webp", en: "Baklawa", ar: "بقلاوة" },
      { img: "img/s-maamoul.webp", en: "Maamoul", ar: "معمول" },
      { img: "img/s-knafeh.webp", en: "Knafeh", ar: "كنافة" },
      { img: "img/s-booza.webp", en: "Booza", ar: "بوظة" },
      { img: "img/s-qatayef.webp", en: "Qatayef", ar: "قطايف" },
      { img: "img/s-meghli.webp", en: "Meghli", ar: "مغلي" },
      { img: "img/s-buche_de_noel.webp", en: "Bûche de Noël", ar: "بوش دو نويل" },
      { img: "img/s-znoud_el_sitt.webp", en: "Znoud el Sitt", ar: "زنود الست" }
    ]
  }
];
