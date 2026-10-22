(function(){
  var d=document, root=d.documentElement;
  var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  root.classList.add('js'); if(reduce) root.classList.add('reduce');

  // Sticky nav state
  var nav=d.getElementById('nav');
  var onScroll=function(){if(nav)nav.classList.toggle('scrolled',window.scrollY>8)};
  onScroll(); window.addEventListener('scroll',onScroll,{passive:true});

  // Scroll reveal
  var els=[].slice.call(d.querySelectorAll('.reveal, .reveal-card'));
  [].forEach.call(d.querySelectorAll('.reveal-card'),function(c,i){c.style.setProperty('--d',(i%4*0.05).toFixed(2)+'s')});
  if(!reduce && 'IntersectionObserver' in window){
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} });
    },{rootMargin:'0px 0px -8% 0px',threshold:.08});
    els.forEach(function(el){io.observe(el)});
  } else { els.forEach(function(el){el.classList.add('in')}); }

  // Statement: words light up with scroll
  var st=d.getElementById('statement');
  if(st){
    var words=st.textContent.trim().split(/\s+/);
    st.innerHTML=words.map(function(w){return '<span class="w">'+w+'</span>'}).join(' ');
    var spans=st.querySelectorAll('.w');
    if(reduce){ [].forEach.call(spans,function(s){s.classList.add('on')}); }
    else {
      var tick=false, maxN=0;
      var upd=function(){
        tick=false;
        var r=st.getBoundingClientRect(), vh=window.innerHeight;
        var p=(vh*0.85-r.top)/(r.height+vh*0.35);
        p=Math.max(0,Math.min(1,p));
        var n=Math.round(p*spans.length); if(n<maxN)n=maxN; maxN=n;
        for(var i=0;i<spans.length;i++) spans[i].classList.toggle('on',i<n);
      };
      window.addEventListener('scroll',function(){ if(!tick){tick=true;requestAnimationFrame(upd);} },{passive:true});
      upd();
    }
  }

  // Before/after slider
  var ba=d.getElementById('ba');
  if(ba){
    var range=ba.querySelector('.ba-range');
    var set=function(v){ba.style.setProperty('--pos',v+'%')};
    range.addEventListener('input',function(){set(range.value)});
    // Gentle intro sweep when first seen
    if(!reduce && 'IntersectionObserver' in window){
      var once=new IntersectionObserver(function(es){
        if(es[0].isIntersecting){
          once.disconnect();
          var t0=null;
          var anim=function(t){ if(!t0)t0=t; var k=(t-t0)/1600; if(k>1)k=1;
            var v=50+28*Math.sin(k*Math.PI*2)*(1-k); set(v); range.value=v; if(k<1)requestAnimationFrame(anim); };
          setTimeout(function(){requestAnimationFrame(anim)},500);
        }
      },{threshold:.5});
      once.observe(ba);
    }
    var cImg=ba.querySelector('.ba-color'), lImg=ba.querySelector('.ba-line');
    var names={tabbouleh:'Tabbouleh',hummus:'Hummus',falafel:'Falafel'};
    [].forEach.call(d.querySelectorAll('.chip'),function(ch){
      ch.addEventListener('click',function(){
        [].forEach.call(d.querySelectorAll('.chip'),function(c){c.classList.remove('is-active');c.setAttribute('aria-selected','false')});
        ch.classList.add('is-active'); ch.setAttribute('aria-selected','true');
        var k=ch.getAttribute('data-dish');
        cImg.src='img/slide-'+k+'-color.webp'; cImg.alt=names[k]+' color guide page';
        lImg.src='img/slide-'+k+'-line.webp'; lImg.alt=names[k]+' black-and-white coloring page';
      });
    });
  }

  // Gallery controls
  var track=d.getElementById('track'), prev=d.getElementById('gPrev'), next=d.getElementById('gNext');
  if(track){
    var step=function(){var c=track.querySelector('.card');return c?(c.getBoundingClientRect().width+20)*2:300};
    prev.addEventListener('click',function(){track.scrollBy({left:-step(),behavior:reduce?'auto':'smooth'})});
    next.addEventListener('click',function(){track.scrollBy({left:step(),behavior:reduce?'auto':'smooth'})});
    var upd2=function(){prev.disabled=track.scrollLeft<4; next.disabled=track.scrollLeft+track.clientWidth>=track.scrollWidth-4};
    track.addEventListener('scroll',upd2,{passive:true}); window.addEventListener('resize',upd2); upd2();
  }

  // Hero book tilt (pointer devices only)
  var book=d.getElementById('heroBook');
  if(book && !reduce && window.matchMedia('(hover: hover) and (pointer: fine)').matches){
    var hero=d.querySelector('.hero');
    hero.addEventListener('mousemove',function(e){
      var r=hero.getBoundingClientRect();
      var x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
      book.style.transform='rotateY('+(-14+x*10)+'deg) rotateX('+(4-y*6)+'deg) rotateZ(1deg)';
    });
    hero.addEventListener('mouseleave',function(){book.style.transform=''});
  }

  // Seasonal gift banner (config: CRAYON_PROMO.christmas in catalog.js)
  (function(){
    var P=(window.CRAYON_PROMO||{}).christmas, BOOKS=window.CRAYON_BOOKS||[];
    if(!P) return;
    var q=location.search, force=/[?&]xmas=1\b/.test(q);
    if(/[?&]xmas=0\b/.test(q)) return;
    var key='cc-promo-'+(P.id||'xmas');
    if(!force){
      if(!P.enabled) return;
      if(P.hideFrom){ var a=String(P.hideFrom).split('-'); if(new Date()>=new Date(+a[0],+a[1]-1,+a[2])) return; }
      try{ if(localStorage.getItem(key)) return; }catch(e){}
    }
    var esc=function(t){return String(t==null?'':t).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})};
    var live=(P.books||[]).map(function(sl){return BOOKS.filter(function(b){return b.slug===sl})[0]}).filter(function(b){return b&&b.status==='live'&&b.amazonUrl});
    if(!live.length) return;
    var rootEl=d.querySelector('[data-root]'), base=rootEl?rootEl.getAttribute('data-root'):'';
    var ctx=d.getElementById('product')?'bookpage':'home', page=location.pathname||'/';
    var gc=function(name,title){return ' data-goatcounter-click="'+esc(name)+'" data-goatcounter-title="'+esc(title)+'" data-goatcounter-referrer="'+esc(page)+'"'};
    var el=d.createElement('aside');
    el.className='xmas'; el.setAttribute('aria-label',P.eyebrow||'Christmas gifting');
    el.innerHTML=
      '<button class="xmas-x" type="button" aria-label="Dismiss"'+gc('xmas-banner-dismiss-'+ctx,'Christmas banner dismissed ('+ctx+')')+'>×</button>'+
      '<div class="xmas-covers" aria-hidden="true">'+live.slice(0,2).map(function(b,i){return '<img class="c'+i+'" src="'+base+esc(b.coverSm||b.cover)+'" width="90" height="117" alt="" loading="lazy" decoding="async">'}).join('')+'</div>'+
      '<div class="xmas-body">'+
        '<p class="xmas-k"><span class="xmas-star" aria-hidden="true">✦</span> '+esc(P.eyebrow)+'</p>'+
        '<p class="xmas-t">'+esc(P.text)+'</p>'+
        '<div class="xmas-links">'+live.map(function(b){
          return '<a href="'+esc(b.amazonUrl)+'" target="_blank" rel="noopener"'+gc('xmas-banner-buy-'+b.slug+'-'+ctx,'Christmas banner: buy '+b.shortTitle+' on Amazon ('+ctx+')')+'>'+(function(t){var w=String(t||'').split(' ');return w.length>1?'<em>'+esc(w.slice(0,-1).join(' '))+' </em>'+esc(w[w.length-1]):esc(t)})(b.shortTitle)+(b.price?' <span>'+esc(b.price)+'</span>':'')+' <i aria-hidden="true">→</i></a>';
        }).join('')+'</div>'+
        (P.note?'<p class="xmas-note">'+esc(P.note)+'</p>':'')+
      '</div>';
    d.body.appendChild(el);
    var show=function(){el.classList.add('on')};
    if(reduce) show(); else setTimeout(function(){requestAnimationFrame(show)},force?200:1100);
    el.querySelector('.xmas-x').addEventListener('click',function(){
      try{localStorage.setItem(key,'1')}catch(e){}
      el.classList.remove('on'); el.classList.add('off');
      setTimeout(function(){el.remove()},reduce?0:450);
    });
  })();

  // GoatCounter: bind click tracking to buttons rendered by JS (count.js skips already-bound ones)
  var gcBind=function(){ if(window.goatcounter&&window.goatcounter.bind_events) window.goatcounter.bind_events(); };
  gcBind(); window.addEventListener('load',gcBind);
})();
