(function(){'use strict';
var els=document.querySelectorAll('.works-item,.enter');
if(!els.length)return;
var EP=50,CS=25,CR="175 60 65",CL="#7DD4D0",C2="#5ABFBA",C3="#96E0DC";
var CMap=[0,1,2,0,1,2,1],Pos=["80% 55%","69% 34%","8% 6%","41% 38%","86% 85%","82% 18%","51% 4%"];
function hsl(s){var m=s.match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/);return m?{h:+m[1],s:+m[2],l:+m[3]}:{h:40,s:80,l:80}}
function gv(c,i){var h=hsl(c);var bs=h.h+"deg "+h.s+"% "+h.l+"%";var os=[100,60,50,40,30,20,10],ks=["",-60,-50,-40,-30,-20,-10],vs={};for(var n=0;n<os.length;n++)vs["--glow-color"+ks[n]]="hsl("+bs+" / "+Math.min(os[n]*i,100)+"%)";return vs}
function grd(cs){var vs={};for(var i=0;i<7;i++){var ci=cs[Math.min(CMap[i],cs.length-1)];vs["--gradient-"+["one","two","three","four","five","six","seven"][i]]="radial-gradient(at "+Pos[i]+", "+ci+" 0px, transparent 50%)"}vs["--gradient-base"]="linear-gradient("+cs[0]+" 0 100%)";return vs}
function ce(el){var r=el.getBoundingClientRect();return[r.width/2,r.height/2]}
function ep(el,x,y){var cr=ce(el),dx=x-cr[0],dy=y-cr[1];var kx=dx?cr[0]/Math.abs(dx):Infinity;var ky=dy?cr[1]/Math.abs(dy):Infinity;return Math.min(Math.max(1/Math.min(kx,ky),0),1)}
function ca(el,x,y){var cr=ce(el),dx=x-cr[0],dy=y-cr[1];if(dx===0&&dy===0)return 0;var rad=Math.atan2(dy,dx);var deg=rad*(180/Math.PI)+90;return deg<0?deg+360:deg}
els.forEach(function(el){
  var w=document.createElement('div');w.className='border-glow-card';
  var ws=w.style;ws.setProperty('--card-bg','#0d0d0f');
  var rad=el.classList.contains('enter')?100:6;ws.setProperty('--border-radius',rad+'px');
  ws.setProperty('--glow-padding','15px');ws.setProperty('--edge-sensitivity',EP);ws.setProperty('--cone-spread',CS);
  var igv=gv(CR,1);var gr=grd([CL,C2,C3]);Object.keys(igv).forEach(function(k){ws.setProperty(k,igv[k])});Object.keys(gr).forEach(function(k){ws.setProperty(k,gr[k])});
  var edge=document.createElement('span');edge.className='edge-light';
  var inner=document.createElement('div');inner.className='border-glow-inner';
  // FIX: wrap the element instead of removing it
  el.parentNode.insertBefore(w,el);
  w.appendChild(edge);
  w.appendChild(inner);
  inner.appendChild(el);
  w.addEventListener('pointermove',function(e){
    var r=w.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;
    var ed=ep(w,x,y),an=ca(w,x,y);
    w.style.setProperty('--edge-proximity',(ed*100).toFixed(3));w.style.setProperty('--cursor-angle',an.toFixed(3)+'deg');
  });
});
})();
