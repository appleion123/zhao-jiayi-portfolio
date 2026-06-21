(function(){
  function check(){if(typeof gsap==='undefined'){setTimeout(check,200);return}
  
  // Hero entrance animation
  var heroTl=gsap.timeline({delay:0.3});
  heroTl.fromTo('.content-title',{y:80,opacity:0},{y:0,opacity:1,duration:1.2,ease:'power4.out'});
  heroTl.fromTo('.content-subtitle',{y:40,opacity:0},{y:0,opacity:1,duration:0.9,ease:'power3.out'},'-=0.5');
  heroTl.fromTo('.content-desc',{y:30,opacity:0},{y:0,opacity:1,duration:0.7,ease:'power2.out'},'-=0.35');
  heroTl.fromTo('.enter',{y:20,opacity:0},{y:0,opacity:1,duration:0.6,ease:'power2.out'},'-=0.2');
  
  // Scroll-triggered section animations (lighter on mobile)
  var mb=window.innerWidth<768;
  document.querySelectorAll('.content-main').forEach(function(sec){
    var tl=gsap.timeline({paused:true});
    
    var title=sec.querySelector('.section-title');
    if(title) tl.fromTo(title,{y:70,opacity:0},{y:0,opacity:1,duration:mb?0.4:0.85,ease:'power3.out'});
    
    var cards=sec.querySelectorAll('.works-item');
    if(cards.length) tl.fromTo(cards,{y:45,opacity:0},{y:0,opacity:1,duration:mb?0.35:0.65,stagger:mb?0.06:0.12,ease:'power2.out'},'-=0.25');
    
    var sk=sec.querySelectorAll('.skills-list span');
    if(sk.length) tl.fromTo(sk,{y:25,opacity:0},{y:0,opacity:1,duration:mb?0.25:0.4,stagger:mb?0.04:0.07,ease:'power2.out'},'-=0.25');
    
    var ct=sec.querySelectorAll('.contact-list a, .contact-list span');
    if(ct.length) tl.fromTo(ct,{y:25,opacity:0},{y:0,opacity:1,duration:mb?0.25:0.4,stagger:mb?0.04:0.07,ease:'power2.out'},'-=0.25');
    
    var obs=new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){tl.play();obs.unobserve(e.target);}
      });
    },{threshold:0.15});
    obs.observe(sec);
  });
  }
  check();
})();