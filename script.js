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
})();
