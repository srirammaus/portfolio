import { surface } from "./surface";
import * as THREE from "three";


export function createWorld(container) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "low-power" });
  const mobile = matchMedia("(max-width: 720px)").matches;

  renderer.setPixelRatio(Math.min(devicePixelRatio, mobile ? 1.15 : 1.5));
  container.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x010205);
  const camera = new THREE.PerspectiveCamera(43, 1, .1, 90);
  const system = new THREE.Group();
  scene.add(system);
  system.rotation.z = .19;
  const v = (x,y,z) => new THREE.Vector3(x,y,z);
  function line(points, color, opacity, parent = scene) {
    const obj = new THREE.Line(new THREE.BufferGeometry().setFromPoints(points),
      new THREE.LineBasicMaterial({color, transparent:true, opacity, depthWrite:false}));
    parent.add(obj);
    return obj;
  }
  let seed = 841;
  function random() { seed = (seed * 16807) % 2147483647; return seed / 2147483647; }
  const starCount = mobile ? 96 : 620;
  const starPositions = new Float32Array(starCount * 3);
  const starLevels = new Float32Array(starCount).fill(.14);
  const starSizes = new Float32Array(starCount);
  for (let i = 0; i < starCount; i += 1) {
    starPositions[i * 3] = (random() - .5) * 54;
    starPositions[i * 3 + 1] = (random() - .5) * 30;
    starPositions[i * 3 + 2] = -4 - random() * 24;
    starSizes[i] = (mobile ? .8 : .85) + random() * (mobile ? .7 : 1.1);
  }
  const starGeometry = new THREE.BufferGeometry();
  starGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
  const starLevelAttribute = new THREE.BufferAttribute(starLevels, 1);
  starGeometry.setAttribute("aTwinkle", starLevelAttribute);
  starGeometry.setAttribute("aSize", new THREE.BufferAttribute(starSizes, 1));
  const flashStarts = new Float32Array(starCount).fill(-1);
  const flashDurations = new Float32Array(starCount);
  let nextFlashAt = 3 + random() * 2;
  function updateStarTwinkles(time) {
    if (time >= nextFlashAt) {
      const count = 5 + Math.floor(random() * 2);
      const picked = new Set();
      while (picked.size < count) picked.add(Math.floor(random() * starCount));
      picked.forEach((index) => {
        flashStarts[index] = time + random() * .9;
        flashDurations[index] = .28 + random() * .34;
      });
      nextFlashAt = time + 5 + random() * 5;
    }
    for (let i = 0; i < starCount; i += 1) {
      const start = flashStarts[i];
      if (start < 0 || time < start) {
        starLevels[i] = .14;
        continue;
      }
      const progress = (time - start) / flashDurations[i];
      if (progress >= 1) {
        flashStarts[i] = -1;
        starLevels[i] = .14;
      } else {
        starLevels[i] = .14 + .86 * Math.sin(progress * Math.PI);
      }
    }
    starLevelAttribute.needsUpdate = true;
  }
  const starMaterial = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    vertexShader: `
      attribute float aTwinkle;
      attribute float aSize;
      varying float vTwinkle;
      void main() {
        vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * viewPosition;
        gl_PointSize = aSize * (30.0 / max(8.0, -viewPosition.z));
        vTwinkle = aTwinkle;
      }
    `,
    fragmentShader: `
      varying float vTwinkle;
      void main() {
        float edge = 1.0 - smoothstep(0.18, 0.5, length(gl_PointCoord - 0.5));
        vec3 color = mix(vec3(0.48, 0.65, 0.96), vec3(0.91, 0.96, 1.0), vTwinkle);
        gl_FragColor = vec4(color, edge * vTwinkle * 0.78);
      }
    `,
  });
  const stars = new THREE.Points(starGeometry, starMaterial);
  stars.frustumCulled = false;
  scene.add(stars);

  // A translucent curtain whose luminous lower edge undulates independently of the camera.
  const aurora = new THREE.ShaderMaterial({
    uniforms:{time:{value:0}}, transparent:true, depthWrite:false, blending:THREE.AdditiveBlending,
    vertexShader:'varying vec2 uv0; void main(){uv0=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
    fragmentShader:`varying vec2 uv0; uniform float time;
    void main(){float x=uv0.x;float edge=.42+.12*sin(x*10.+time*.08)+.06*sin(x*21.-time*.1);
    float dy=uv0.y-edge;float beam=exp(-abs(dy)*mix(65.,9.,step(0.,dy)));
    float folds=.48+.52*pow(.5+.5*sin(66.*x+4.*sin(21.*x)+time*.18),2.);
    vec3 hue=mix(vec3(.08,.90,.60),vec3(.51,.18,.94),.5+.5*sin(x*9.));
    gl_FragColor=vec4(hue,beam*folds*.075*smoothstep(0.,.12,x)*smoothstep(0.,.12,1.-x));}`
  });
  const curtain = new THREE.Mesh(new THREE.PlaneGeometry(39,14),aurora);
  curtain.position.set(1,1,-9);scene.add(curtain);

  const nodes=Array.from({length:mobile?28:56},()=>v((random()-.5)*33,(random()-.5)*13,-3-random()*3));
  const paths=[];
  nodes.forEach((a,i)=>{
    const neighbors=nodes.slice(i+1).filter(b=>a.distanceTo(b)<4.5).slice(0,mobile?2:3);
    for(const b of neighbors){
      const path=new THREE.QuadraticBezierCurve3(a,a.clone().lerp(b,.5).add(v(0,.19,.1)),b);
      line(path.getPoints(12),0x698cff,mobile?.055:.085);paths.push(path);
    }
  });
  const pulses=Array.from({length:mobile?5:10},(_,i)=>{
    const dot=new THREE.Mesh(new THREE.SphereGeometry(mobile?.026:.032,8,6),new THREE.MeshBasicMaterial({color:0xa4ccff}));
    scene.add(dot);return {dot,path:paths[i*3%paths.length]};
  });
  scene.add(new THREE.HemisphereLight(0xdceaff,0x212334,.46));
  const sunLight=new THREE.PointLight(0xffe0b2,130);
  system.add(sunLight);
  function sphere(radius,kind){
    const mesh=new THREE.Mesh(new THREE.SphereGeometry(radius,mobile?36:64,mobile?24:44),surface(kind));
    system.add(mesh);return mesh;
  }
  const sun=sphere(.83,5);
  const haloCanvas=document.createElement("canvas");haloCanvas.width=haloCanvas.height=128;
  const ctx=haloCanvas.getContext("2d"),gradient=ctx.createRadialGradient(64,64,0,64,64,64);
  gradient.addColorStop(0,"#fff4c9");gradient.addColorStop(.27,"#ffac48bb");gradient.addColorStop(1,"#ff842000");
  ctx.fillStyle=gradient;ctx.fillRect(0,0,128,128);
  const halo=new THREE.Sprite(new THREE.SpriteMaterial({map:new THREE.CanvasTexture(haloCanvas),blending:THREE.AdditiveBlending,depthWrite:false}));
  halo.scale.setScalar(3.5);system.add(halo);
  const orbit=(r,a,out)=>out.set(r*Math.cos(a),r*.20*Math.sin(a),r*.84*Math.sin(a));
  const planets=[[1.68,.17,2.7],[6.9,.96,1.78],[3.65,.45,2.56],[5.1,.87,3.27],[7.55,.60,3.91]].map(([r,baseRadius,phase],i)=>{
    const size=baseRadius*.85;
    const path=line(Array.from({length:193},(_,j)=>orbit(r,j*Math.PI/96,new THREE.Vector3())),0xbf965f,.34,system);
    path.material.opacity=.52;
    const planet=sphere(size,i);
    if(i===4){
      for(const [inner,outer,alpha] of [[1.27,1.54,.45],[1.58,1.89,.72],[1.92,2.14,.33]]){
        const ring=new THREE.Mesh(new THREE.RingGeometry(size*inner,size*outer,96),new THREE.MeshStandardMaterial({color:0xd3bc97,side:THREE.DoubleSide,transparent:true,opacity:alpha}));
        ring.rotation.x=1.15;ring.rotation.z=.20;planet.add(ring);
      }
    }
    return {r,phase,planet,path,offset:0,target:0};
  });
  const aim=new THREE.Vector3();
  let elapsed=0,progress=0;
  const cursor={x:0,y:0};
  const destinations=["Mercury","Earth","Mars","Jupiter","Saturn"];
  const logs=["Your probe skims the sunlit craters.","The blue oceans reflect your signal.","Dust rises as your probe passes the red planet.","Your probe rides the gas giant’s gravity.","The last transmission crosses the rings."];
  const visited=new Set();
  const projected=new THREE.Vector3();
  const burstCount=mobile?42:85;
  const particles=new THREE.BufferGeometry();
  const positions=new THREE.Float32BufferAttribute(new Float32Array(burstCount*3),3);
  particles.setAttribute("position",positions);
  const velocities=Array.from({length:burstCount},()=>v(random()-.5,random()-.5,random()-.5).normalize().multiplyScalar(.45+random()*1.2));
  const burst=new THREE.Points(particles,new THREE.PointsMaterial({size:.06,color:0xffdfa6,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false}));
  burst.frustumCulled=false;burst.visible=false;scene.add(burst);
  const blastAudio = new Audio("/media/planet-blast.mp3");
  blastAudio.preload = "auto";
  blastAudio.volume = 0.38;
  let blastTime=-4,active=-1;
  function launch(x,y,still=false,force=false){
    let index=-1;
    if(x===undefined){
      index=planets.findIndex((_,i)=>!visited.has(i));
      if(index<0){visited.clear();index=0;}
    }else{
      let nearest=Infinity;
      for(const [i,item] of planets.entries()){
        item.planet.getWorldPosition(projected);
        const depth=projected.distanceTo(camera.position);
        projected.project(camera);
        const distance=Math.hypot((projected.x+1)*container.clientWidth/2-x,(1-projected.y)*container.clientHeight/2-y);
        const radius=item.planet.geometry.parameters.radius*system.scale.x*container.clientHeight/(2*depth*Math.tan(THREE.MathUtils.degToRad(camera.fov/2)));
        if(distance<Math.max(22,radius+6)&&distance<nearest){nearest=distance;index=i;}
      }
      if(index<0 && force){
        index=planets.findIndex((_,i)=>!visited.has(i));
        if(index<0){visited.clear();index=0;}
      }
      if(index<0)return null;
    }
    active=index;visited.add(index);
    const item=planets[index];item.planet.getWorldPosition(burst.position);
    blastTime=elapsed;item.target+=1.05;
    try { blastAudio.currentTime = 0; } catch {}
    blastAudio.play().catch(() => {});
    if(still){item.offset=item.target;update(elapsed+.35,0,progress,cursor);}
    return destinations[index]+" · "+logs[index]+" "+visited.size+"/5 visited.";
  }
  function update(t,dt,p,pointer){
    elapsed=t;progress=p;cursor.x=pointer.x;cursor.y=pointer.y;
    const width=camera.aspect*4.65;
    const portrait=camera.aspect<1;
    const yaw=pointer.x*.9+p*.15, distance=(portrait?17:14.7)-p*.8;
    aim.set(width*.23,p*.30,0);
    camera.position.set(aim.x+Math.sin(yaw)*distance,1.05-pointer.y*1.55+p*.55,Math.cos(yaw)*distance);
    camera.lookAt(aim);
    system.scale.setScalar(portrait?Math.min(.90,camera.aspect*1.55):Math.min(1,camera.aspect*.68));
    sunLight.intensity=130*system.scale.x**2;
    system.position.set(portrait?width*.42:width*.93,portrait?.35-p*.35:.9-p*.95,-1.2);
    system.rotation.set(-.40+p*.08-pointer.y*.25,-.36+pointer.x*.35,.16);
    aurora.uniforms.time.value=t;updateStarTwinkles(t);sun.rotation.y=t*.12;
    halo.scale.setScalar(5.6+.18*Math.sin(t*1.6));
    planets.forEach((item,i)=>{
      const {r,phase,planet,path}=item;
      item.offset=THREE.MathUtils.damp(item.offset,item.target,2.1,dt);
      path.material.opacity=i === active ? .87 : .48;
      orbit(r,phase+t*.125/Math.sqrt(r)+p*.82+item.offset,planet.position);

      planet.rotation.y=t*(.14+i*.02)+p;
    });
    pulses.forEach(({dot,path},i)=>path.getPoint((t*.12+p*.5+i*.19)%1,dot.position));
    const age=t-blastTime;
    burst.visible=age>=0 && age<1.35;
    if(burst.visible){
      const travel=1.65*(1-Math.exp(-age*2.4));
      velocities.forEach((velocity,i)=>positions.setXYZ(i,velocity.x*travel,velocity.y*travel-age*age*.12,velocity.z*travel));
      positions.needsUpdate=true;burst.material.opacity=1-age/1.35;
    }

    renderer.render(scene,camera);
  }
  function resize(){
    const w=container.clientWidth||1,h=container.clientHeight||1;
    renderer.setSize(w,h);camera.aspect=w/h;camera.updateProjectionMatrix();update(elapsed,0,progress,cursor);
  }
  resize();
  function updateStars(time) {
    updateStarTwinkles(time);
    renderer.render(scene,camera);
  }
  return {launch,update,updateStars,resize,dispose(){

    scene.traverse(o=>{o.geometry?.dispose();o.material?.map?.dispose();o.material?.dispose();});
    renderer.dispose();renderer.domElement.remove();
  }};
}

