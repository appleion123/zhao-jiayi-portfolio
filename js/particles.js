import{Renderer,Camera,Geometry,Program,Mesh}from'https://cdn.jsdelivr.net/npm/ogl@0.0.29/+esm';
(function(){
var c=document.getElementById('particles-bg');if(!c)return;
var count=80,spread=3,speed=.3,baseSize=8,sizeRand=.5,dist=12;
var pal=['#7DD4D0','#5ABFBA','#96E0DC','#3DAFAA'];
function h2r(h){h=h.replace(/^#/,'');if(h.length==3)h=h.split('').map(function(x){return x+x}).join('');var n=parseInt(h,16);return[((n>>16)&255)/255,((n>>8)&255)/255,(n&255)/255]}
var renderer=new Renderer({alpha:true});var gl=renderer.gl;gl.canvas.style.cssText='width:100%;height:100%;display:block';
c.appendChild(gl.canvas);
var positions=new Float32Array(count*3),colors=new Float32Array(count*3),randoms=new Float32Array(count*4);
for(var i=0;i<count;i++){
var j=i*3;positions[j]=-(spread/2)+Math.random()*spread;positions[j+1]=-(spread/2)+Math.random()*spread;positions[j+2]=-(spread/2)+Math.random()*spread;
var cc=h2r(pal[Math.floor(Math.random()*pal.length)]);colors[j]=cc[0];colors[j+1]=cc[1];colors[j+2]=cc[2];
var k=i*4;randoms[k]=Math.random();randoms[k+1]=Math.random();randoms[k+2]=Math.random();randoms[k+3]=Math.random();
}
var geo=new Geometry(gl,{position:{size:3,data:positions},color:{size:3,data:colors},random:{size:4,data:randoms}});
var vert='attribute vec3 position;attribute vec4 random;attribute vec3 color;uniform mat4 modelMatrix;uniform mat4 viewMatrix;uniform mat4 projectionMatrix;uniform float uTime;uniform float uSpread;uniform float uBaseSize;uniform float uSizeRandomness;varying vec3 vColor;varying float vAlpha;void main(){vec3 pos=position;pos.y+=mod(uTime*0.2*(0.5+random.x),uSpread*2.0)-uSpread;if(pos.y>uSpread)pos.y=-uSpread;vec4 mvPosition=viewMatrix*modelMatrix*vec4(pos,1.0);vec4 projected=projectionMatrix*mvPosition;gl_PointSize=uBaseSize*(1.0+uSizeRandomness*(random.z-0.5))*(dist/length(mvPosition.xyz));gl_Position=projected;vColor=color;vAlpha=0.3+0.7*random.y;}';
var frag='precision highp float;varying vec3 vColor;varying float vAlpha;void main(){vec2 uv=gl_PointCoord-0.5;float d=length(uv);if(d>0.5)discard;float alpha=smoothstep(0.5,0.0,d)*vAlpha;gl_FragColor=vec4(vColor,alpha);}';
var prog=new Program(gl,{vertex:vert,fragment:frag,uniforms:{uTime:{value:0},uSpread:{value:spread},uBaseSize:{value:baseSize},uSizeRandomness:{value:sizeRand},uColor:{value:[1,1,1]}},transparent:true,depthWrite:false});
var mesh=new Mesh(gl,{geometry:geo,program:prog});
var camera=new Camera(gl,{fov:45,aspect:c.offsetWidth/c.offsetHeight,near:0.1,far:100});
camera.position.set(0,0,dist);camera.lookAt([0,0,0]);
function resize(){renderer.setSize(c.offsetWidth,c.offsetHeight);camera.aspect=c.offsetWidth/c.offsetHeight;camera.updateProjectionMatrix();}
window.addEventListener('resize',resize);
(function loop(t){prog.uniforms.uTime.value=t*0.001* speed;
mesh.rotation.x=Math.sin(t*0.0002)*0.1;mesh.rotation.y=Math.cos(t*0.0005)*0.15;mesh.rotation.z+=0.01*speed*0.016;
renderer.render({scene:mesh,camera:camera});requestAnimationFrame(loop);})(0);
})();
