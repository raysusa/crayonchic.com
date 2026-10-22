/* Crayon Chic: renders the book shelf (home + book pages) and the product page
   from window.CRAYON_BOOKS (catalog.js). No book data lives in this file. */
(function(){
  var d=document, BOOKS=window.CRAYON_BOOKS||[], BRAND=window.CRAYON_BRAND||{};
  var esc=function(t){return String(t==null?'':t).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})};
  var isLive=function(b){return b.status==='live' && b.amazonUrl};
  var notifyHref=function(b){return 'mailto:'+(BRAND.email||'hello@crayonchic.com')+'?subject='+encodeURIComponent('Notify me: '+b.title)+'&body='+encodeURIComponent('Please let me know when '+b.title+' is out!')};
  var arrow='<span aria-hidden="true">→</span>';

  // GoatCounter click tracking: data-goatcounter-* attributes (see catalog.js CRAYON_BRAND.goatcounter)
  var page=(location.pathname||'/');
  var gc=function(name,title){return ' data-goatcounter-click="'+esc(name)+'" data-goatcounter-title="'+esc(title)+'" data-goatcounter-referrer="'+esc(page)+'"'};
  window.CRAYON_GC=gc;
  var reviewUrl=function(b){return b.reviewUrl || (b.asin?'https://www.amazon.com/review/create-review?asin='+encodeURIComponent(b.asin):'')};

  // ctx = where the button sits, e.g. "home-shelf", "bookpage", "bookpage-shelf"
  function cta(b, root, small, ctx){
    if(isLive(b)) return '<a class="btn'+(small?' btn-md':'')+'" href="'+esc(b.amazonUrl)+'" target="_blank" rel="noopener"'+gc('buy-'+b.slug+'-'+ctx,'Buy '+b.shortTitle+' on Amazon ('+ctx+')')+'>Buy on Amazon '+arrow+'</a>';
    return '<a class="btn btn-ghost'+(small?' btn-md':'')+'" href="'+notifyHref(b)+'"'+gc('notify-'+b.slug+'-'+ctx,'Notify me: '+b.shortTitle+' ('+ctx+')')+'>Notify me '+arrow+'</a>';
  }

  function card(b, i, root, ctx){
    var href=root+'books/'+b.slug+'/';
    return '<li class="book-card reveal" style="--d:'+(i%3*0.07).toFixed(2)+'s;--accent:'+esc(b.accent||'#14213D')+'">'+
      '<a class="bc-link" href="'+href+'" aria-label="'+esc(b.title)+'">'+
        '<div class="bc-art"><img src="'+root+esc(b.coverSm||b.cover)+'" width="450" height="583" loading="lazy" decoding="async" alt="'+esc(b.coverAlt)+'"></div>'+
        '<div class="bc-body">'+
          '<p class="bc-status '+(isLive(b)?'is-live':'is-soon')+'">'+esc(b.statusLabel||(isLive(b)?'Available now':'Coming soon'))+'</p>'+
          '<h3>'+esc(b.title)+'</h3>'+
          (b.arabic&&b.titleAr?'<p class="bc-ar" lang="ar" dir="rtl">'+esc(b.titleAr)+'</p>':'')+
          '<p class="bc-tag">'+esc(b.tagline)+'</p>'+
          '<p class="bc-meta">'+[b.pages?b.pages+' pages':'', b.ages?'Ages '+b.ages:'', BRAND.trim].filter(Boolean).map(esc).join(' · ')+'</p>'+
        '</div>'+
      '</a>'+
      '<div class="bc-cta">'+(b.price&&isLive(b)?'<span class="bc-price">'+esc(b.price)+'</span>':'')+cta(b,root,true,ctx)+
        '<a class="link-arrow" href="'+href+'">Details <span aria-hidden="true">›</span></a></div>'+
    '</li>';
  }

  function renderShelf(el, exclude, ctx){
    var root=el.getAttribute('data-root')||'';
    var list=BOOKS.filter(function(b){return b.slug!==exclude});
    el.innerHTML=list.map(function(b,i){return card(b,i,root,ctx)}).join('');
    el.classList.add(list.length<=2?'shelf-duo':'shelf-many');
    if(list.length===1) el.classList.add('shelf-solo');
  }

  // Home shelf
  var shelf=d.getElementById('shelf');
  if(shelf) renderShelf(shelf, null, 'home-shelf');

  // Product page
  var pd=d.getElementById('product');
  if(pd){
    var slug=pd.getAttribute('data-book') || (location.pathname.split('/').filter(Boolean).slice(-1)[0]||'');
    var b=BOOKS.filter(function(x){return x.slug===slug})[0] || BOOKS[0];
    var root=pd.getAttribute('data-root')||'../../';
    d.title=b.title+' | Crayon Chic';
    d.documentElement.style.setProperty('--accent', b.accent||'#14213D');
    var navBuy=d.getElementById('navBuy');
    if(navBuy){ if(isLive(b)){navBuy.href=b.amazonUrl;} else {navBuy.href=notifyHref(b); navBuy.textContent='Notify me'; navBuy.removeAttribute('target');
      navBuy.setAttribute('data-goatcounter-click','notify-'+b.slug+'-bookpage-nav'); navBuy.setAttribute('data-goatcounter-title','Notify me: '+b.shortTitle+' (bookpage-nav)');} }

    var specs=[['Format','Paperback'],['Pages',b.pages],['Size',BRAND.trim+', our standard'],['Ages',b.ages],
      b.arabic?['Languages','English & Arabic labels']:['Language','English'],['Print',BRAND.print]];
    var html=''+
    '<section class="pd-hero">'+
      '<div class="hero-glow" aria-hidden="true"></div>'+
      '<div class="pd-copy">'+
        '<p class="eyebrow reveal"><a href="'+root+'#books">'+esc(b.collection||'Crayon Chic')+'</a> · <span class="pd-status '+(isLive(b)?'is-live':'is-soon')+'">'+esc(b.statusLabel)+'</span></p>'+
        '<h1 class="pd-title reveal" style="--d:.06s">'+esc(b.title)+'</h1>'+
        (b.arabic&&b.titleAr?'<p class="pd-ar reveal" style="--d:.1s" lang="ar" dir="rtl">'+esc(b.titleAr)+'</p>':'')+
        '<p class="lede reveal" style="--d:.14s">'+esc(b.subtitle)+'</p>'+
        '<div class="buy-row reveal" style="--d:.2s">'+(b.price&&isLive(b)?'<p class="price">'+esc(b.price)+'</p>':'')+cta(b,root,false,'bookpage')+
          (!isLive(b)?'<a class="link-arrow" href="'+esc(BRAND.instagram)+'" target="_blank" rel="noopener">Follow @crayon.chic <span aria-hidden="true">›</span></a>':'')+'</div>'+
        '<ul class="specs reveal" style="--d:.26s">'+specs.map(function(s){return '<li><span>'+esc(s[0])+'</span>'+esc(s[1])+'</li>'}).join('')+'</ul>'+
      '</div>'+
      '<div class="hero-book reveal" style="--d:.12s"><div class="book"><img src="'+root+esc(b.cover)+'" width="900" height="1165" alt="'+esc(b.coverAlt)+'" fetchpriority="high"></div><div class="book-shadow" aria-hidden="true"></div></div>'+
    '</section>'+
    '<section class="section pd-about">'+
      '<p class="pd-desc reveal">'+esc(b.description)+'</p>'+
      '<ul class="pd-highlights">'+b.highlights.map(function(h,i){return '<li class="reveal" style="--d:'+(i%3*0.06).toFixed(2)+'s">'+esc(h)+'</li>'}).join('')+'</ul>'+
    '</section>'+
    '<section class="section pd-inside" aria-labelledby="inside-h">'+
      '<div class="section-head"><p class="eyebrow reveal">A look inside</p><h2 class="h2 reveal" id="inside-h">'+(isLive(b)?'Open it up.':'A first look.')+'</h2>'+
        (b.standouts&&b.standouts.length?'<p class="sub reveal">Start with the standouts: '+b.standouts.map(esc).join(' and ').toLowerCase()+'.</p>':'')+'</div>'+
      '<ul class="pd-grid">'+b.pagesPreview.map(function(p,i){
        return '<li class="pd-page reveal" style="--d:'+(i%4*0.05).toFixed(2)+'s"><figure><div class="card-img"><img src="'+root+esc(p.img)+'" width="560" height="725" loading="lazy" decoding="async" alt="'+esc(p.en)+' coloring page"></div>'+
          '<figcaption><span class="en">'+esc(p.en)+(p.standout?' <b class="badge">Standout</b>':'')+(p.note?' <b class="badge badge-soft">'+esc(p.note)+'</b>':'')+'</span>'+
          (b.arabic&&p.ar?'<span class="ar" lang="ar" dir="rtl">'+esc(p.ar)+'</span>':'')+'</figcaption></figure></li>';
      }).join('')+'</ul>'+
    '</section>'+
    '<section class="section pd-standard"><div class="feat feat-dark pd-std reveal">'+
      '<div><p class="feat-k">The Crayon Chic standard</p><p class="big-num">'+esc(BRAND.trim.replace(' in',''))+'<span>in</span></p></div>'+
      '<p>Every Crayon Chic book shares one premium format: '+esc(BRAND.print.toLowerCase())+', a '+esc((BRAND.cover||'').toLowerCase())+' and the same generous page size. Collect one, and the next one fits right beside it.</p>'+
    '</div></section>'+
    (isLive(b)&&reviewUrl(b)?
    '<section class="section pd-review" aria-labelledby="review-h"><div class="review-card reveal">'+
      '<div class="rv-stars" aria-hidden="true"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>'+
      '<div class="rv-copy"><p class="feat-k">Already coloring?</p><h2 class="rv-h" id="review-h">Loved it? Leave a review.</h2>'+
        '<p>A few honest words on Amazon help other parents find '+esc(b.shortTitle)+', and help us make the next book even better.</p></div>'+
      '<a class="btn btn-ghost" href="'+esc(reviewUrl(b))+'" target="_blank" rel="noopener"'+gc('review-'+b.slug+'-bookpage','Leave a review: '+b.shortTitle+' (bookpage)')+'>Write a review on Amazon '+arrow+'</a>'+
    '</div></section>':'')+
    '<section class="section pd-more" aria-labelledby="more-h"><div class="section-head"><p class="eyebrow reveal">The collection</p><h2 class="h2 reveal" id="more-h">Also from Crayon Chic.</h2></div>'+
      '<ul class="shelf" id="moreShelf" data-root="'+root+'"></ul></section>';
    pd.innerHTML=html;
    var more=d.getElementById('moreShelf');
    if(more){ renderShelf(more, b.slug, 'bookpage-shelf'); if(!more.children.length) more.closest('section').remove(); }
  }
  window.CRAYON_REVIEW_URL=reviewUrl;
  window.CRAYON_IS_LIVE=isLive;
})();
