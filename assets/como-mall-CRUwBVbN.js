import{$ as e,$n as t,$r as n,Ai as r,Ar as i,Gn as a,Hn as o,Jn as s,Ki as c,Kn as l,Mi as u,Pi as d,Sr as f,Un as p,Vi as m,Vr as h,Wr as g,Zr as _,_r as v,at as y,ei as b,et as x,ia as S,ki as C,li as w,na as T,ni as E,nr as D,or as O,pr as k,ra as A,ri as j,rt as M,ti as ee,vr as N,wi as P,wr as F,yi as te}from"./lite-materials-Buhpho6M.js";import{_ as I,d as L,f as ne,g as R,h as z,m as re,p as ie,v as ae}from"./main-D8pAc6ls.js";import{t as oe}from"./GLTFLoader-DzXF2dWN.js";function B(e,t,n){let r=new o;for(let t of e)for(let[e,n]of t.exterior)r.expandByPoint(new T(e,n));r.expandByScalar(8);let i=r.getSize(new T),a=document.createElement(`canvas`);a.width=Math.ceil(i.x*4),a.height=Math.ceil(i.y*4);let c=a.getContext(`2d`);c.scale(a.width/i.x,a.height/i.y),c.translate(-r.min.x,-r.min.y),c.fillStyle=c.strokeStyle=`white`,c.lineWidth=8,c.lineJoin=`round`;for(let t of e){c.beginPath();for(let e of[t.exterior,...t.holes])e.forEach(([e,t],n)=>n?c.lineTo(e,t):c.moveTo(e,t)),c.closePath();c.fill(`evenodd`),t.exact||c.stroke()}c.globalCompositeOperation=`destination-out`;for(let e of t)c.beginPath(),e.forEach(([e,t],n)=>n?c.lineTo(e,t):c.moveTo(e,t)),c.closePath(),c.fill();c.globalCompositeOperation=`source-over`;for(let e of n)c.beginPath(),e.forEach(([e,t],n)=>n?c.lineTo(e,t):c.moveTo(e,t)),c.closePath(),c.fill();let l=new s(a);return l.flipY=!1,l.generateMipmaps=!1,l.minFilter=l.magFilter=w,{comoMask:{value:l},comoBounds:{value:new S(r.min.x,r.min.y,i.x,i.y)}}}var V=`uniform float comoEnabled;
uniform sampler2D comoMask;
uniform vec4 comoBounds;
bool insideComo(vec2 world) {
  vec2 uv=(world-comoBounds.xy)/comoBounds.zw;
  return comoEnabled>.5 && all(greaterThanEqual(uv,vec2(0))) && all(lessThanEqual(uv,vec2(1))) && texture2D(comoMask,uv).a>.5;
}`;function se(e,{comoMask:t,comoBounds:n}){let r=new Set;if(!e?.setReplacedMeshes)return r;let i=t.value.image,a=i.width,o=i.height,s=a+1,c=i.getContext(`2d`).getImageData(0,0,a,o).data,l=new Uint32Array(s*(o+1));for(let e=0;e<o;e++){let t=0;for(let n=0;n<a;n++)c[(e*a+n)*4+3]<250&&t++,l[(e+1)*s+n+1]=l[e*s+n+1]+t}let{x:u,z:d,y:f,w:m}=n.value,h=new p;return e.group.traverse(e=>{if(!e.userData.solid||!e.geometry?.boundingBox)return;h.copy(e.geometry.boundingBox).applyMatrix4(e.matrixWorld);let t=Math.floor((h.min.x-u)*a/d)-1,n=Math.floor((h.min.z-f)*o/m)-1,i=Math.ceil((h.max.x-u)*a/d)+1,c=Math.ceil((h.max.z-f)*o/m)+1;t<0||n<0||i>a||c>o||l[c*s+i]-l[n*s+i]-l[c*s+t]+l[n*s+t]===0&&r.add(e)}),r}function H(e,t){let n=e=>`vec3(`+e.map(e=>Number(e).toFixed(3)).join(`,`)+`)`;return e.map(([e,r])=>`(all(greaterThanEqual(`+t+`,`+n(e)+`)) && all(lessThanEqual(`+t+`,`+n(r)+`)))`).join(` || `)}function ce(e,t){let{replacement:n,baseReplacement:r=n,parkRestoration:i=[],parkDetails:a=[],facadeVolumes:o=[],plantGrade:s,nativeRepairVolumes:c=[],matteStreetVolumes:l=[]}=t,u={value:1},d=B(n,i,a),f=se(e.statics,d),p=B(r,i,[]);d.comoEnabled=p.comoEnabled=u;let m=new Set;e.plants.group.traverse(e=>{if(e.material)for(let t of[e.material].flat())m.add(t)});let h=new Set;e.casters.traverse(e=>{if(e.material)for(let t of[e.material].flat())h.add(t)});let _=H([...o,...c],`liteWorld()`),v=H(l,`liteWorld()`),y=[...h].find(e=>e.uniforms?.uStaticGroundA&&!e.defines?.STATIC_GLASS),b=y?.fragmentShader,x={},w=``;if(s){let{columns:e,rows:t,origin:n,offsets:r}=s,i=Uint8Array.from(r,e=>Math.round(128+Math.max(-127,Math.min(127,e*16)))),a=new O(i,e,t,C);a.minFilter=a.magFilter=g,a.unpackAlignment=1,a.needsUpdate=!0,x={rootOffsets:{value:a},rootBounds:{value:new S(...n,e,t)}},w=`uniform float comoEnabled; uniform sampler2D rootOffsets; uniform vec4 rootBounds; float rootOffset(vec2 xz){vec2 q=(xz*vec2(1.,-1.)-rootBounds.xy+.5)/rootBounds.zw; if(any(lessThan(q,vec2(0.)))||any(greaterThan(q,vec2(1.))))return 0.; return (texture2D(rootOffsets,q).r*255.-128.)/16.;}
`}let T=new WeakSet;function E(e){if(T.has(e)||!e.fragmentShader?.includes(`vec3 liteWorld()`))return;T.add(e);let t=m.has(e);Object.assign(e.uniforms,t?p:d);let n=`liteWorld().xz`;t&&(e.vertexShader.includes(`mat4 m = modelMatrix * instanceMatrix;`)||e.vertexShader.includes(`attribute vec4 aPos;`))&&(Object.assign(e.uniforms,x),e.vertexShader=w+`varying vec2 comoPlantRoot;
`+e.vertexShader.replace(`mat4 m = modelMatrix * instanceMatrix;`,`$& comoPlantRoot=m[3].xz;`+(s?` m[3].y+=comoEnabled*rootOffset(comoPlantRoot);`:``)).replace(/root = (?:vec3\( xz\.x[^;]*|\( modelMatrix \* vec4\( aPos\.xyz[^;]*);/g,`$& comoPlantRoot=root.xz;`+(s?` root.y+=comoEnabled*rootOffset(comoPlantRoot);`:``)),e.fragmentShader=`varying vec2 comoPlantRoot;
`+e.fragmentShader,n=`comoPlantRoot`),e.fragmentShader=e.fragmentShader.replace(/void main\s*\(\s*\)\s*\{/,V+`
void main() { if(insideComo(`+n+`)`+(!t&&_?` || (comoEnabled>.5 && (`+_+`))`:``)+`) discard;`),!t&&v&&(e.fragmentShader=e.fragmentShader.replace(`if ( rough < 0.5 )`,`if (comoEnabled>.5 && (`+v+`)) rough=max(rough,.64);
if ( rough < 0.5 )`)),e.needsUpdate=!0}for(let e of h)E(e);e.statics?.decorateMaterials?.(E);let D=new Map,k=!1;function A(e,t){e.fragmentShader=k?z(t):t,e.needsUpdate=!0}return{world:e,roofClip:{uniforms:d,glsl:V},setEnabled(t){u.value=+!!t,e.statics?.setReplacedMeshes?.(t?f:null)},setSnow(e){if(k!==e){k=e;for(let[e,t]of D)A(e,t)}},groundMaterial(e){if(!b)throw Error(`공원 잔디 재질을 찾을 수 없습니다.`);let t=y.clone();return t.uniforms={...y.uniforms,...d,...I},t.side=2,t.defines={...t.defines,LITE_ROAD_CUT:1},t.vertexShader=y.vertexShader.slice(0,y.vertexShader.lastIndexOf(`void main()`))+`void main(){
        vec4 world=modelMatrix*vec4(position,1.);
        vAlbedo=vec3(1.);vEmission=vec3(0.);vNormal=normalize(mat3(modelMatrix)*normal);
        vInfo=vec4(-1.,${e===`A`?`1.`:`2.`},.95,0.);vWindow=vec4(0.);vUv=vec2(0.);vSmooth=1.;vMat=0.;
        liteVertex(world.xyz);gl_Position=projectionMatrix*viewMatrix*world;
      }`,t.fragmentShader=b.replace(/void main\s*\(\s*\)\s*\{/,V+`
void main(){if(!insideComo(liteWorld().xz))discard;`),D.set(t,t.fragmentShader),k&&A(t,t.fragmentShader),t},clipToReplacement(e){U(e,d,!0)}}}function le(e){let t=e.onBeforeCompile,n=e.customProgramCacheKey();e.customProgramCacheKey=()=>n+`-park-road`,e.onBeforeCompile=function(e,n){t.call(this,e,n);let{uLiteRoadCutMap:r,uLiteRoadRect:i,uLiteRoadCut:a}=M;Object.assign(e.uniforms,{uLiteRoadCutMap:r,uLiteRoadRect:i,uLiteRoadCut:a}),e.fragmentShader=x+e.fragmentShader.replace(`#include <clipping_planes_fragment>`,`#include <clipping_planes_fragment>
if (liteRoadCuts(mallWorld,false)) discard;`)}}function U(e,t,n,{repairs:r=[],matte:i=[],shadowOnly:a=!1}={}){let o=e.onBeforeCompile,s=e.customProgramCacheKey(),c=H(r,`siteWorld`),l=H(i,`siteWorld`),u=[a?``:(n?`!`:``)+`insideComo(siteWorld.xz)`,c&&`(comoEnabled>.5 && (`+c+`))`].filter(Boolean).join(` || `);e.customProgramCacheKey=()=>s+(n?`-como-in`:`-como-out`)+u+l,e.onBeforeCompile=function(e,n){o.call(this,e,n),Object.assign(e.uniforms,t),e.vertexShader=`varying vec3 siteWorld;
`+e.vertexShader.replace(`#include <project_vertex>`,`
      vec4 sitePos=vec4(transformed,1.);
      #ifdef USE_INSTANCING
        sitePos=instanceMatrix*sitePos;
      #endif
      siteWorld=(modelMatrix*sitePos).xyz;
      #include <project_vertex>`),e.fragmentShader=`varying vec3 siteWorld;
`+V+`
`+e.fragmentShader.replace(`#include <clipping_planes_fragment>`,`#include <clipping_planes_fragment>
if(`+u+`) discard;`),l&&(e.fragmentShader=e.fragmentShader.replace(`#include <roughnessmap_fragment>`,`#include <roughnessmap_fragment>
if (comoEnabled>.5 && (`+l+`)) roughnessFactor=max(roughnessFactor,.64);`))},e.needsUpdate=!0}function ue(e,t){let n=B(t.replacement,t.parkRestoration,t.parkDetails);n.comoEnabled={value:0};let r=new WeakSet,i=t.nativeRepairVolumes??[],a=t.matteStreetVolumes??[],o=new E({depthPacking:P}),s=new j;function c(){e.traverse(e=>{if(e.isMesh){for(let t of[e.material].flat())r.has(t)||(r.add(t),U(t,n,!1,{repairs:i,matte:a}));if(e.castShadow&&i.length){e.customDepthMaterial??=o,e.customDistanceMaterial??=s;for(let t of[e.customDepthMaterial,e.customDistanceMaterial])r.has(t)||(r.add(t),U(t,n,!1,{repairs:i,shadowOnly:!0}))}}})}return c(),{refresh:c,setEnabled(e){n.comoEnabled.value=+!!e},clipToReplacement(e){U(e,n,!0)}}}var W={light:[4,15,31,33,47],grey:[4,15,31,33,47],dark:[4,20,31,33,44],brown:[8,6,16,18,28],balcony:[4,4,31,33,60],ac:[4,11,27,29,44],off_col:[4,14,31,33,50],off_brown:[4,14,31,33,50],stripe:[1,84,96,98,109]},de=`
vec3 mallUnit(vec3 v) {
  return v * inversesqrt(max(dot(v, v), 1e-12));
}
`;async function fe(e){if(!e)return null;let t=await new c().loadAsync(e);return t.flipY=!1,t.generateMipmaps=!1,t.minFilter=t.magFilter=g,t}function pe(n,r,i,a,o,s){let c=!r.retailGlazing&&n.endsWith(`/sf_glass_tint`),l=!!r.exteriorGlazing||r.retailGlazing||c||/(?:Glass|glass|_Windows)$/.test(n)&&r.alpha<.99,u=l&&(r.retailGlazing||c)?.115:r.alpha,d=r.retailShelves||!r.retailGlazing&&n.includes(`/Display_`),f=/\/(?:sf_signs|lks_sign\w*|EntryLettering)$/.test(n),p=n.includes(`/Diffuser`),m=n.endsWith(`/DiffuserRetail`),h=/\/(?:floor_lake|openshop_floor|sf_int_floor|cgv_floor|sp_cd_floor|plaza_granite)$/.test(n),g=!!s.mallGarage?.value,_=!!s.mallRetail?.value,v=/\/tower_/.test(n)||n.startsWith(`overlay/CentumFacade/`)||n.startsWith(`overlay/SurveyShell`),y=n.split(`/tower_fac_`)[1],b=i&&W[y],x=n===`overlay/CentumFacade/ClearGlass`,C=!!s.mallSkyUp,w=C&&!l&&!r.courseOverlay&&!r.bridgeFascia&&!n.startsWith(`interior/`)&&!n.includes(`/floor_parking`),T=r.exteriorSky||r.streetFacade||v,E=i&&/^street\/\/World\/Looks\/Facade_apt_(booyoung|palace)$/.exec(n)?.[1],D=r.nightEmission??(r.streetFacade?r.emissive:null),O=!!D?.some(e=>e>0),k=r.treeUplight,j=r.signal,N=j?{value:0}:null,P=!!s.mallRetailTint?.value,F=d||/\/(?:sf_(?:int_|signs|glass|photo|window|interior|display)|shop_front|openshop_|Display_|lks_sign)/i.test(n),te=/\/(?:hatchback|prius|a4|cclass|lanos|ioniq5|avante)_/i.test(n)&&!/wheel|tire|tyre|interior/i.test(n),L=new ee({color:c?8492437:new t(...r.color),map:i,vertexColors:!!r.vertex,side:2,transparent:u<.99,opacity:u,depthWrite:u>=.99,alphaTest:r.alphaTest??(i&&!r.opaqueTexture?.012:0),polygonOffset:!!r.frontBias,polygonOffsetFactor:-1,polygonOffsetUnits:-1,forceSinglePass:!0,toneMapped:!0});return L.onBeforeRender=e=>{s.mallInvExposure.value=1/Math.max(.001,e.toneMappingExposure)},L.customProgramCacheKey=()=>`como-interior-v12-`+[E,!!a,g,_,P,F,l,!!r.retailGlazing,!!r.exteriorGlazing,p,m,!!T,O,!!r.nightEmission,!!j,v,!!b,x,C,w,!!r.bridgeFascia,d,f,h,te,n.endsWith(`/GarageEpoxy`),!!k].join(`-`),L.onBeforeCompile=i=>{if(i.uniforms.mallField=a?.isTexture?{value:a}:a||{value:null},i.uniforms.mallDay=o,i.uniforms.mallRoughness={value:r.roughness??.55},b){let[e,t,n,r,a]=b,o=256/e;i.uniforms.mallPaneEdges={value:new S(t/o,n/o,r/o,a/o)},i.uniforms.mallPaneGrid={value:new A(e,y===`balcony`?12/32:11/32,y===`balcony`?31/32:25/32)}}if(O&&(i.uniforms.streetGlow={value:new t(...D)}),k&&(i.uniforms.mallTreeUplight={value:new S(...k)}),j&&Object.assign(i.uniforms,{mallSignal:N,mallSignalTint:{value:new t(...j[2])}}),Object.assign(i.uniforms,s),C){let{uLiteLampRect:e,uLiteLamp:t,uLiteLampMap:n}=M;Object.assign(i.uniforms,I,{uLiteLampRect:e,uLiteLamp:t,uLiteLampMap:n})}let c=x?`varying float mallPaneID;
`:``;i.vertexShader=de+c+`varying vec3 mallWorld; varying vec3 mallNormal;
`+i.vertexShader.replace(`#include <project_vertex>`,`
      vec4 litWorld = vec4(transformed,1.);
      ${x?`mallPaneID=float(gl_VertexID / 4);`:``}
      #ifdef USE_INSTANCING
        litWorld = instanceMatrix * litWorld;
        mallNormal = mallUnit(mat3(modelMatrix)*mat3(instanceMatrix)*normal);
      #else
        mallNormal = mallUnit(mat3(modelMatrix)*normal);
      #endif
      mallWorld=(modelMatrix*litWorld).xyz;
      #include <project_vertex>`);let u=a?`vec2 grid=(vec2(mallWorld.x,-mallWorld.z)-vec2(187.,120.))/256.;
      float height=mallWorld.y+.08*N.y;
      float level=step(7.36,height)+step(11.86,height);
      vec2 address=vec2(grid.x,(grid.y+level)/3.);
      vec4 localLight=texture2D(mallField,address);
      float inside=localLight.a*step(2.92,height)*(1.-smoothstep(15.48,16.15,height))
        *step(0.,min(grid.x,grid.y))*step(max(grid.x,grid.y),1.);
      vec3 lit=localLight.rgb*1.45*(.78+.22*max(0.,N.y));
      vec2 roadDir=mallDriverDir;
      vec3 fromKart=mallWorld-mallDriver;
      float along=dot(fromKart.xz,roadDir), lateral=abs(dot(fromKart.xz,vec2(-roadDir.y,roadDir.x)));
      float head=(1.-smoothstep(.24,1.58,abs(fromKart.y+.05)))*smoothstep(.4,1.65,along)*(1.-smoothstep(4.,12.5,along))
         *(1.-smoothstep(.45+along*.11,.90+along*.24,lateral));
      lit+=vec3(.52,.49,.40)*head;
      float highlights=0.; vec3 fixtureLight=vec3(0.);
      if(height<16.16)for(int i=0;i<2;i++) {
        vec3 v=mallFittings[i]-mallWorld;
        float atten=1./(1.+.085*dot(v,v));
        vec3 L=mallUnit(v), H=mallUnit(V+L);
        float side=max(0.,dot(N,L));
        fixtureLight+=vec3(.68,.78,.94)*side*atten;
        lit+=vec3(.18,.18,.17)*side*atten;
        highlights+=pow(max(0.,dot(N,H)),26.)*atten;
      }
      ${g?`float garage=0.; float nearby=1.;
        if(height>=2.92 && height<15.92){
        vec3 spots=texture2D(mallGarage,address).rgb;
        garage=spots.r*step(2.92,height)*(1.-smoothstep(15.28,15.92,height))
          *step(0.,min(grid.x,grid.y))*step(max(grid.x,grid.y),1.);
        float lane=spots.g, pool=spots.b;
        nearby=1.-smoothstep(6.,42.,length(fromKart.xz));
        float indirect=.032+.032*nearby;
        float litSide=.29+.71*max(0.,N.y);
        float track=lane*(.17+.96*pool)*(.24+.76*nearby);
        vec3 garageLight=vec3(.76,.87,1.)*(indirect+track*litSide);
        garageLight+=fixtureLight*(.13+.48*(1.-abs(N.y)))*nearby;
        float drivingBeam=smoothstep(.5,2.,along)*(1.-smoothstep(5.,22.,along))
          *(1.-smoothstep(.55+along*.075,1.25+along*.18,lateral))
          *(1.-smoothstep(.25,1.45,abs(fromKart.y+.08)));
        garageLight+=vec3(.67,.59,.44)*drivingBeam*(.22+.78*lane);
        lit=mix(lit,garageLight,garage);
        inside=max(inside,garage);}`:`float garage=0.; float nearby=1.;`}`:`float inside=0.; float garage=0.; float nearby=1.; vec3 lit=vec3(1.);`;i.fragmentShader=(E?ae:``)+de+c+(b?`float mallSpan(float x,float left,float right,float width){return clamp((x-left)/width+.5,0.,1.)-clamp((x-right)/width+.5,0.,1.);}
uniform vec3 mallPaneGrid; uniform vec4 mallPaneEdges;
`:``)+(C?`uniform vec3 mallSunDir,mallSunLight,mallSkyUp,mallSkySide,mallSkyDown;
uniform sampler2D uLiteLampMap;
`+e+R:``)+(j?`uniform float mallSignal; uniform vec3 mallSignalTint;
`:``)+(k?`uniform vec4 mallTreeUplight;
`:``)+`varying vec3 mallWorld; varying vec3 mallNormal; uniform sampler2D mallField,mallGarage,mallRetail,mallRetailTint; uniform float mallDay,mallRoughness,mallInvExposure,mallDepth; uniform vec3 mallDriver, streetGlow; uniform vec2 mallDriverDir; uniform vec3 mallFittings[2];
`+i.fragmentShader.replace(`#include <color_fragment>`,`#include <color_fragment>
        vec3 faceN=mallUnit(mallNormal);
        vec3 N=faceforward(faceN,mallWorld-cameraPosition,faceN);
        vec3 V=mallUnit(cameraPosition-mallWorld);
        float grazing=1.-min(1.,abs(dot(N,V)));
        ${u}
        ${C?`float roof=uWeatherRoofK.z>0. ? weatherRoof(mallWorld) : 0.;
           vec3 skyFill=mix(mallSkySide,N.y>0.?mallSkyUp:mallSkyDown,abs(N.y));
           skyFill*=1.-roof*uWeatherRoofK.z*(.55+.45*max(N.y,0.));
           vec3 parkLamps=liteLamps(mallWorld,clamp(N.y*1.25,0.,1.));
           vec3 sky=(mallSunLight*max(0.,dot(N,mallSunDir))+skyFill+parkLamps)/mallInvExposure;`:`float key=max(0.,dot(N,mallUnit(vec3(-.43,.86,-.28))));
           vec3 twilight=mix(vec3(.010,.009,.011),vec3(.101,.053,.050),smoothstep(0.,.25,mallDay));
           vec3 sky=mix(twilight,vec3(.75,.81,.88)+vec3(.62,.55,.43)*key,smoothstep(.25,1.,mallDay));`}
        vec3 illumination=mix(sky,lit,inside);
        ${f?`vec3 lettering=diffuseColor.rgb;`:``}
        ${T?`illumination=sky;`:``}
        ${_&&a&&!r.exteriorSky?`
          if(height>=2.9 && height<25.7 && garage<.999){
          float storey=level+step(16.22,height)+step(21.20,height);
          vec2 shopAddress=vec2(grid.x,(grid.y+storey)/5.);
          vec4 shop=texture2D(mallRetail,shopAddress);
          shop.a=clamp((shop.a-.16)/.84,0.,1.);
          float shade=smoothstep(.025,.49,shop.r)*(1.-garage)*step(2.9,height)*(1.-smoothstep(25.,25.7,height))
            *step(0.,min(grid.x,grid.y))*step(max(grid.x,grid.y),1.);
          float occlusion=clamp((shop.r-.49)/.5,0.,1.);
          float floorY=storey<.5?3.2:storey<1.5?7.6:storey<2.5?12.1:storey<3.5?16.5:21.5;
          float mount=3.15-(mallWorld.y-floorY);
          vec2 horizontal=shop.gb*2.-1.;
          vec3 towardLamp=mallUnit(vec3(horizontal.x*1.9,mount,-horizontal.y*1.9)+vec3(.0001,.0002,0.));
          float diffuse=max(0.,dot(N,towardLamp));
          vec3 room=vec3(.094,.114,.142)*(.89+.16*mallDay)*(1.-.39*occlusion)*(.64+.36*max(N.y,0.));
          room+=.055*localLight.rgb*(.47+.53*max(N.y,0.));
          vec3 tone=${P?`max(vec3(.34,.32,.28),1.25*texture2D(mallRetailTint,shopAddress).rgb)`:`vec3(1.09,.78,.52)`};
          room+=tone*shop.a*(.16+.68*diffuse);
          room+=vec3(.36,.34,.28)*head*(.22+.32*(1.-mallDay));
          // Light reflected up into the reveals and soffit directly above a shop window.
          room+=tone*.14*shop.a*max(0.,-N.y)*smoothstep(1.55,2.85,mallWorld.y-floorY);
          ${F?`room+=tone*(.12+.25*shop.a)*(.65+.35*smoothstep(.1,1.25,mallWorld.y-floorY));`:``}
          ${d?`room=max(room,vec3(.28,.235,.20)+tone*.15*shop.a);`:``}
          illumination=mix(illumination,room,${d?`max(shade,.82)`:`shade`});
          ${h||l?`vec3 halfAngle=mallUnit(V+towardLamp);
          float gloss=pow(max(0.,dot(N,halfAngle)),mix(72.,19.,mallRoughness));
          float reflection=shop.a*gloss*shade;
          diffuseColor.rgb+=vec3(.33,.20,.11)*reflection*${l?`1.3`:`.62`};`:``}
          }
        `:``}
        ${k?`vec3 beam=mallTreeUplight.xyz-mallWorld;
          float falloff=1./(1.+.010*dot(beam,beam));
          float warm=falloff*(.28+.72*max(0.,dot(N,mallUnit(beam))));
          illumination+=vec3(2.12,1.40,.59)*warm*mallTreeUplight.w*(1.-smoothstep(.46,.90,mallDay));`:``}
        diffuseColor.rgb *= illumination;
        ${E?`float roomNight=1.-smoothstep(.18,.86,mallDay);
          diffuseColor.rgb*=1.-.72*roomNight;
          diffuseColor.rgb+=apartmentWindows(vMapUv,mallWorld,${E===`booyoung`?`true`:`false`})*1.22*roomNight;`:``}
        ${r.bridgeFascia?`float lamps=1.-mallDay;
          float blueEmission=mix(.3952*lamps/.75,mix(.3952,1.,(lamps-.75)*4.),step(.75,lamps));
          diffuseColor.rgb+=vec3(.0016,.009,.055)*blueEmission/mallInvExposure;`:``}
        ${b||x?`
          ${b?`vec2 rooms=vMapUv*vec2(mallPaneGrid.x,8.), cell=floor(rooms), uv=fract(rooms);
             vec2 pixel=max(fwidth(rooms),vec2(.001)); vec4 e=mallPaneEdges;
             float farView=smoothstep(.30,1.1,max(pixel.x,pixel.y));
             float panel=(mallSpan(uv.x,e.x,e.y,pixel.x)+mallSpan(uv.x,e.z,e.w,pixel.x))
                        *mallSpan(uv.y,mallPaneGrid.y,mallPaneGrid.z,pixel.y);
             panel=mix(panel,(e.y-e.x+e.w-e.z)*(mallPaneGrid.z-mallPaneGrid.y),farView);
             float seed=dot(cell,vec2(127.1,311.7));`:`float seed=floor(mallPaneID+.5)*127.1; float panel=1.; float farView=0.;`}
          float occupied=mix(step(.72,fract(sin(seed)*43758.5453)),.28,farView);
          vec3 lamp=mix(vec3(.86,.53,.28),vec3(.62,.75,.94),step(.77,fract(sin(seed*1.43)*33217.)));
          vec3 room=mix(lamp*(.48+.25*fract(sin(seed*2.71)*98211.)),vec3(.49,.36,.26),farView);
          float dusk=pow(1.-mallDay,4.);
          diffuseColor.rgb+=room*occupied*panel*dusk*(1.-smoothstep(.4,.75,abs(faceN.y)));
        `:``}
        ${f?`float ink=max(max(lettering.r,lettering.g),lettering.b);
          float signsOn=1.-smoothstep(.36,.94,mallDay);
          diffuseColor.rgb+=lettering*smoothstep(.055,.8,ink)*(.79+.28*signsOn);
          // Dark backing acrylic still receives some spill from the lit sign face.
          diffuseColor.rgb+=vec3(.057,.049,.037)*signsOn*(.42+.58*smoothstep(.015,.12,ink));`:``}
        ${O?`diffuseColor.rgb += streetGlow * (1.-smoothstep(${r.nightEmission?`.46,.98`:`.12,.75`},mallDay));`:``}
        ${j?`diffuseColor.rgb+=mallSignalTint*mallSignal;`:``}
        ${n.endsWith(`/GarageEpoxy`)&&a?`float grain=dot(diffuseColor.rgb,vec3(.2126,.7152,.0722)); diffuseColor.rgb+=vec3(.23,.26,.28)*highlights*inside*(.36+grain)*mix(1.,.2+.8*nearby,garage);`:``}
        ${te&&a?`float rim=pow(grazing,3.);
          float ceiling=smoothstep(.05,.92,reflect(-V,N).y);
          float sheen=(.045+.16*rim)*ceiling + highlights*(.60-.37*mallRoughness);
          diffuseColor.rgb+=vec3(.72,.81,.93)*sheen*(.14+.86*nearby)*garage;`:``}
        ${d?`diffuseColor.rgb *= 1.10;`:``}
        ${m?`diffuseColor.rgb+=vec3(.98,.64,.34);`:p?`diffuseColor.rgb += vec3(.69,.65,.58)*mix(1.,.22+.78*nearby,garage);`:``}
        ${r.retailGlazing?`float fresnel=pow(grazing,6.);
          diffuseColor.rgb=mix(vec3(.18,.23,.25),vec3(.43,.52,.55) + diffuseColor.rgb*.27,fresnel);
          diffuseColor.a=clamp(diffuseColor.a+.22*fresnel,.085,.35);`:r.exteriorGlazing?`float edge=pow(grazing,4.);
            diffuseColor.rgb+=vec3(.045,.072,.095)*( .2+.8*edge)*(.32+.68*mallDay);`:l?`float edge=pow(grazing,3.);
            diffuseColor.rgb+=mix(vec3(.025,.032,.040),vec3(.15,.18,.20),edge)${v?`*min(vec3(1.),sky)`:``};
            diffuseColor.a=min(1.,diffuseColor.a+.10*edge);`:``}
        ${w?`vec2 snowUV=mallWorld.xz*.0435;
          vec2 snowDx=dFdx(snowUV),snowDy=dFdy(snowUV);
          if(uWeatherRoofK.z>0. && N.y>.3 && garage<.99){
            float noise=textureGrad(uWeatherNoise,snowUV,snowDx,snowDy).r;
            float snow=weatherCover(N,mallWorld,noise)*(1.-weatherClear(mallWorld))*(1.-roof)*(1.-garage);
            snow=smoothstep(.15,.85,snow);
            diffuseColor.rgb=mix(diffuseColor.rgb,uWeatherSnow.rgb*(.93+.07*noise)*(sky+uWeatherSky.rgb),snow);
          }`:``}`).replace(`#include <tonemapping_fragment>`,`float distanceShade=mallDepth*smoothstep(18.,37.,distance(cameraPosition,mallWorld));
        gl_FragColor.rgb=mix(gl_FragColor.rgb,vec3(.006,.008,.011),distanceShade)*mallInvExposure;
        #include <tonemapping_fragment>`)},j&&(L.userData.signal={axis:j[0],aspect:j[1],light:N}),L}function me(e){if(!e?.length)return null;let t=[],n=[],r=[],i=[],a=[],o=[];for(let[,s,[c,l],[u,d],f]of e){let e=t.length/3;for(let[e,o]of[[-1,-1],[-1,1],[1,1],[1,-1]]){let p=e*(u+.32),m=o*(d+.28);t.push(s[0]+p*l+m*c,s[2]-.006,-s[1]+p*c-m*l),n.push(p,m),r.push(u,d),i.push(...f[1],...f[3]),a.push(...f[0],...f[2])}o.push(e,e+1,e+2,e,e+2,e+3)}let s=new l;for(let[e,o,c]of[[`position`,t,3],[`uv`,n,2],[`footprint`,r,2],[`frontAxle`,i,4],[`rearAxle`,a,4]])s.setAttribute(e,new N(o,c));s.setIndex(o);let c=new d({transparent:!0,depthWrite:!1,side:2,forceSinglePass:!0,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1,vertexShader:`attribute vec2 footprint;attribute vec4 frontAxle,rearAxle;
      varying vec2 p,halfSize;varying vec4 front,rear;
      void main(){p=uv;halfSize=footprint;front=frontAxle;rear=rearAxle;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,fragmentShader:`varying vec2 p,halfSize;varying vec4 front,rear;
      float tyre(vec2 wheel){vec2 d=(p-wheel)/vec2(.21,.29);return exp(-dot(d,d)*1.5);}
      void main(){vec2 d=abs(p)/halfSize;float body=(1.-smoothstep(.56,1.13,d.x))*(1.-smoothstep(.60,1.06,d.y));
        float contact=max(max(tyre(front.xy),tyre(front.zw)),max(tyre(rear.xy),tyre(rear.zw)));
        gl_FragColor=vec4(.006,.008,.012,min(.87,.49*body+.71*contact));}`}),u=new b(s,c);return u.name=`주차면 타이어 접지 그림자`,u.renderOrder=2,u}function he(e,t=null,n=null,r=null,i=[]){let a=e.map(([e,t,n,r,i,a,o])=>({at:new A(e,n,-t),kind:o})),o=new A(0,-1e4,0),s=new A(1/0,1/0,1/0),c={mallDriver:{value:new A},mallDriverDir:{value:new T(1,0)},mallFittings:{value:[o.clone(),o.clone()]},mallGarage:{value:t},mallRetail:{value:n},mallRetailTint:{value:r},mallInvExposure:{value:1},mallDepth:{value:0}},l=[null,null],u=i.map(([e,t,n])=>new A(e,n,-t)),d=_.smoothstep;function f(e,t){let n=c.mallDriver.value;if(n.set(e.x,e.y,e.z),c.mallDriverDir.value.set(Math.cos(t),-Math.sin(t)),s.distanceToSquared(n)<.45)return;s.copy(n),l.fill(null);let r=[1/0,1/0];for(let t of a){let n=t.at.y-e.y;if(n<.55||n>4.3)continue;let i=(t.at.x-e.x)**2+(t.at.z-e.z)**2;i>169||(i<r[0]?(r[1]=r[0],l[1]=l[0],r[0]=i,l[0]=t):i<r[1]&&(r[1]=i,l[1]=t))}l.forEach((e,t)=>c.mallFittings.value[t].copy(e?.at??o))}function p(e,t,{night:n=0,exposure:r=1}={}){let i=1/Math.max(1,r);for(let n of a){let r=n.at.y-e.y,a=(n.at.x-e.x)**2+(n.at.z-e.z)**2,o=1.22*i*d(r,.35,1.25)*(1-d(r,3.5,5.2))*(1-d(a,18,132))/(1+.22*a);t.x+=o*(n.kind===0?.83:1),t.y+=o*(n.kind===1?.79:.94),t.z+=o*(n.kind===1?.57:n.kind===2?.82:1)}let o=0;for(let t of u){let n=t.y-e.y,r=(t.x-e.x)**2+(t.z-e.z)**2;r<82&&(o+=d(n,.5,1.8)*(1-d(n,3.55,4.55))*(1-d(r,9,82))/(1+.18*r))}let s=Math.min(1.85,o)*.53*(.32+.68*n)*i;t.x+=s,t.y+=.82*s,t.z+=.61*s;let c=(1-d(Math.hypot(e.x-308.6,e.z+168.9),6.5,16))*n*1.16*i*d(e.y,6.7,8)*(1-d(e.y,12,13.8));t.x+=c,t.y+=c*.89,t.z+=c*.72}return{uniforms:c,update:f,kartLight:p}}function ge(e){if(!e?.image)return()=>0;let t=document.createElement(`canvas`);t.width=128,t.height=640;let n=t.getContext(`2d`,{willReadFrequently:!0});n.drawImage(e.image,0,0,128,640);let r=n.getImageData(0,0,128,640).data;return(e,t,n)=>{let i=Math.floor((e-187)*.5),a=Math.floor((t-120)*.5);if(i<0||a<0||i>=128||a>=128||n<2.9||n>24.9)return 0;let o=n<7.35?0:n<11.85?1:n<16.22?2:n<21.2?3:4;return _.smoothstep(r[4*((o*128+a)*128+i)]/255,.28,.61)}}function _e(e,t,n,r){if(!t?.image||!n?.points?.length)return{update:()=>0,clear:()=>{}};let i=document.createElement(`canvas`);i.width=256,i.height=768;let a=i.getContext(`2d`,{willReadFrequently:!0});a.drawImage(t.image,0,0,256,768);let o=a.getImageData(0,0,256,768).data;function s(e,t,n){let r=Math.floor(e-187),i=Math.floor(t-120);return n<2.88||n>15.85||r<0||i<0||r>=256||i>=256?0:o[4*(((n<7.35?0:n<11.85?1:2)*256+i)*256+r)]/255}let c=[],l=n.points;for(let e=0;e<l.length;e++){let t=l[e],n=l[(e+1)%l.length];s(...t)>.58!=s(...n)>.58&&c.push([(t[0]+n[0])*.5,(t[1]+n[1])*.5,(t[2]+n[2])*.5])}let u=new d({side:1,transparent:!0,depthWrite:!0,depthTest:!0,uniforms:{strength:{value:0},invExposure:r.mallInvExposure},vertexShader:`void main(){gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,fragmentShader:`uniform float strength,invExposure;
      void main(){gl_FragColor=vec4(vec3(.006,.008,.011)*invExposure,strength);
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
      }`});u.onBeforeRender=e=>{r.mallInvExposure.value=1/Math.max(.001,e.toneMappingExposure)};let f=new b(new m(1,32,18),u);f.name=`지하주차장 가시거리`,f.frustumCulled=!1,f.renderOrder=-2,f.visible=!1,e.add(f);let p=_.smoothstep;function h(){f.visible=!1,r.mallDepth.value=0}function g(e,t){let n=e.position,i=t?.x??n.x,a=t?.y??-n.z,o=t?.z??n.y-.6;if(Math.abs(n.y-o)>4.8||Math.hypot(n.x-i,n.z+a)>9.5)return h(),0;let l=s(i,a,o+.16);if(l<.12)return h(),0;let d=100;for(let[e,t,n]of c)Math.abs(n-o)<2.6&&(d=Math.min(d,Math.hypot(e-i,t-a)));let m=p(l,.12,.9)*p(d,.8,8.8);return r.mallDepth.value=m,f.visible=m>.004,f.position.copy(n),f.scale.setScalar(36+(1-m)*46),u.uniforms.strength.value=m,u.depthWrite=m>.995,m}return{update:g,clear:h}}function G(e,n){let r=[],i=[],a=new t(16774109),o=new t(16770236),s=1,c=([e,t,n],i)=>r.push(e,n+i,-t);for(let t of e.paint)for(let e of[0,1,2,1,3,2])c(t[e],.012);let u=new l;u.setAttribute(`position`,new N(r.splice(0),3));let d=new ee({color:12170660,side:2,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1}),f=new b(u,d);f.name=`동탄대로 차선`,n.add(f),d.onBeforeRender=e=>{d.color.copy(a).multiplyScalar((.18+.64*s)/Math.max(1e-4,e.toneMappingExposure))};for(let t of e.lights)for(let e=0;e<2;e++)for(let n=0;n<2;n++){let r=e*3+n;for(let e of[r,r+1,r+3,r+1,r+4,r+3])c(t.grid[Math.floor(e/3)][e%3],.032),i.push(1,.59,.29,+(e===4))}let p=new l;p.setAttribute(`position`,new N(r,3)),p.setAttribute(`color`,new N(i,4));let m=new ee({color:16770236,vertexColors:!0,transparent:!0,forceSinglePass:!0,opacity:0,depthWrite:!1,side:2,blending:2}),h=new b(p,m);return h.name=`동탄대로 야간 노면 조명`,n.add(h),m.onBeforeRender=e=>{m.color.copy(o).multiplyScalar(.62/Math.max(1e-4,e.toneMappingExposure))},e=>{s=e;let t=_.smoothstep(1-s,.4,.9);h.visible=t>.015,m.opacity=.45*t}}function ve(e){let t=new D;for(let n=1;n<e.length;n++){let r=e[n-1],i=e[n];t.add(new h(new A(r[0],r[2],-r[1]),new A(i[0],i[2],-i[1])))}let n=t.getLength();return(e,r,i,a=0)=>{let o=n+a,s=(e%o+o)%o;if(s>=n)return!1;let c=s/n,l=t.getPoint(c),u=t.getPoint(Math.min(1,c+.004));return u.distanceToSquared(l)<=1e-6?u.sub(t.getPoint(Math.max(0,c-.004))):u.sub(l),r.copy(l),i.copy(u).normalize(),!0}}function ye({data:e,root:t,templates:n,phone:r,day:i}){if(!e?.paths?.length)return()=>{};let a=new F;a.name=`동탄대로 차량`,t.add(a);let o=G(e,a),s=e.paths.map(ve),c=[],l=r?[[`hatchback`,0,9.8,112,155]]:[[`hatchback`,0,10.6,120,125],[`prius`,1,11.1,117,142]];for(let[e,t,r,i,o]of l){let s=n.get(e);if(!s?.length)continue;let l=new F;l.name=`동탄대로 `+e;for(let{geometry:e,material:t}of s)l.add(new b(e,t));l.visible=!1,a.add(l),c.push({vehicle:l,lane:t,speed:r,phase:i,gap:o})}let u=null,d=[];e.bus&&new oe().parseAsync(Uint8Array.from(atob(e.bus),e=>e.charCodeAt(0)).buffer,``).then(e=>{u=e.scene,u.name=`시내버스`,d=[`wheel-fl`,`wheel-fr`,`wheel-rl`,`wheel-rr`].map(e=>u.getObjectByName(e)).filter(Boolean);let t=new p().setFromObject(u);u.position.y-=t.min.y,u.updateMatrixWorld(!0);let n=new F;n.add(u),a.add(n),u=n,u.visible=!1}).catch(e=>console.warn(`시내버스를 불러오지 못했습니다`,e?.message));let f=new A,m=new A,h=0;return(e,t,n)=>{if(a.visible=n&&e.position.x>320&&e.position.z<-105&&e.position.y<110,!a.visible)return;o(i.value),h+=Math.min(t,.07);let l=e=>{e.position.copy(f),e.rotation.set(-Math.atan2(m.y,Math.hypot(m.x,m.z)),Math.atan2(m.x,m.z),0,`YXZ`)};for(let{vehicle:e,lane:t,speed:n,phase:r,gap:i}of c)e.visible=s[t](h*n+r,f,m,i),e.visible&&l(e);if(u&&(u.visible=s[2](8.6*h+48,f,m,r?340:235),u.visible)){l(u);for(let e of d)e.rotation.x=h*8.6/.5%(2*Math.PI)}}}function be(e,t){let n=new Float32Array(e.length*3),r=new Float32Array(n.length),i=new Float32Array(e.length);for(let[t,[a,o,s,c,l,u,d]]of e.entries())n.set([a,s,-o],t*3),r.set([l,u,d],t*3),i[t]=c;let o=new l;o.setAttribute(`position`,new a(n,3)),o.setAttribute(`tint`,new a(r,3)),o.setAttribute(`diameter`,new a(i,1)),o.computeBoundingSphere();let s={value:1},c=new T,u=new d({uniforms:{pixels:s,day:t},vertexShader:`
      uniform float pixels;
      attribute float diameter;
      attribute vec3 tint;
      varying vec3 lampTint;
      void main() {
        vec4 view = modelViewMatrix * vec4(position, 1.);
        gl_Position = projectionMatrix * view;
        gl_PointSize = clamp(diameter * pixels / max(1., -view.z), 2.1, 33.);
        lampTint = tint;
      }`,fragmentShader:`
      uniform float day;
      varying vec3 lampTint;
      void main() {
        float radius=length(gl_PointCoord - .5)*2.;
        float core=1.-smoothstep(.18,.43,radius);
        float halo=pow(max(0.,1.-radius),3.2);
        float powered=1.-smoothstep(.47,.93,day);
        gl_FragColor=vec4(mix(lampTint,vec3(1.,.92,.68),.38*core),
          (.89*core+.38*halo)*powered);
        #include <colorspace_fragment>
      }`,blending:2,transparent:!0,depthWrite:!1,toneMapped:!1}),f=new te(o,u);return f.name=`Heritage tree lights`,f.onBeforeRender=(e,t,n)=>{e.getDrawingBufferSize(c),s.value=c.y*n.projectionMatrix.elements[5]*.5},f}var K=`./courses/como-mall/`,xe=/^(?:interior)?\/World\/(?:LakeComo|ComoReview)\/Looks\/.*(?:structure|roof|floor|ceiling|soffit|slab|plaza|walkway|canopy|awning|sidewalk|terrace_paving|park_paving|residential_ground|ramp_surface)/i,Se=`/World/LakeComo/Looks/skylight_glass`;async function q({scene:e,renderer:t,world:o,original:s,phone:d=!1,limitedGpu:m=!1,quality:h=`low`}){let g=d&&h===`low`?`scene-phone.json.gz`:`scene.json.gz`,[x,C,w]=await Promise.all([y(K+g),y(K+`geometry.bin.gz`,`buffer`),y(K+`enclosure.json`)]),T=Uint8Array.from(atob(w.visibility),e=>e.charCodeAt(0)),E=new A,D=o?.casters??s.group,O=!1,j=new c,N=new Map,P={value:1},te=Math.min(d?2:4,t.capabilities.getMaxAnisotropy());async function I(e,t=x.textures[e]){return N.has(e)||N.set(e,j.loadAsync(t).then(e=>(e.colorSpace=u,e.wrapS=e.wrapT=r,e.anisotropy=te,e))),N.get(e)}let[R,z,ae,oe]=await Promise.all([x.indoorLighting,x.garageFocus,x.retailField,x.retailTint].map(fe)),B=R?{value:R}:null,V=he(x.fixtures??[],z,ae,oe,x.retailFixtures);o&&Object.assign(V.uniforms,{mallSunDir:M.uLiteSunDir,mallSunLight:M.uLiteSunLight,mallSkyUp:M.uLiteSkyLight,mallSkySide:M.uLiteSideLight,mallSkyDown:M.uLiteBounceLight});let se=Object.keys(x.textures).values();async function H(){for(let e of se)await I(e)}await Promise.all(Array.from({length:d?6:24},H));let U=o?ce(o,x):ue(s.group,x);U.setEnabled(!1);let W=new F;W.name=`레이크꼬모`,W.visible=!1;let de=ge(ae),G=new F;G.name=`꼬모 상가 코스 시설`,G.visible=!1,W.add(G);let ve=ae&&z?V.uniforms:null,q=null,Ce=null;function we(e){G.visible=!!e,e&&!q&&(q=e,Ce=_e(G,z,e,V.uniforms),e.layeredGround&&e.kerbNormals&&e.kerbHeights&&G.add(ne({course:e,road:{overlay:!0,finish:`grey`},lite:!!o,mallLight:ve}).group)),e||Ce?.clear(),O&&=(D.visible=!0,!1),J.key=``}let Te=new f,Ee=new n,De=new p,Oe=new ee({colorWrite:!1,depthWrite:!0,side:2,polygonOffset:!0,polygonOffsetFactor:1,polygonOffsetUnits:4}),ke=Oe.clone();U.clipToReplacement(ke);let Ae=[],je=[],J={key:``,lastSync:0},Me=new Map,Ne=[],Y=0,Pe=[],Fe=null,Ie=o?{clip:U.roofClip,get group(){if(!Fe){Fe=new F;for(let{position:e,index:t}of Pe){let n=new l;n.setAttribute(`position`,e),n.setIndex(t),Fe.add(new b(n,Oe))}}return Fe}}:null;async function Le(e,t,r){let s=(e,n)=>new a(new Float32Array(t,e[0],e[1]),n),c=new Map,u=Object.entries(e.materials);for(let[t,n]of u){if(t===`course/World/LakeComo/Looks/road_asphalt`||n.seasonal&&0||!o&&(n.streetFacade||n.bridgeFascia))continue;let r;if(n.parkGround&&o)r=U.groundMaterial(n.parkGround);else if(n.parkWater&&o)r=o.water.material;else{if(r=pe(t,n,n.texture?await I(n.texture,e.textures[n.texture]):null,B,P,V.uniforms),r.userData.signal&&Ne.push(r.userData.signal),n.parkGround){let e=await y(`./lite/tex/ground_`+n.parkGround.toLowerCase()+`.webp`,`buffer`),t=URL.createObjectURL(new Blob([e],{type:`image/webp`}));try{r.map=await I(`soil-`+n.parkGround,t)}finally{URL.revokeObjectURL(t)}}n.insideSite||n.overlay||n.parkWater||U.clipToReplacement(r),n.roadCut&&(o?le(r):re(r,!!n.parkGround))}c.set(t,r)}for(let u of e.groups){if(!c.has(u.material))continue;let f=e.materials[u.material],g=new l;if(u.decode){let[e,n]=u.decode,r=new Uint16Array(t,u.positions[0],u.positions[1]),i=new Float32Array(r.length);for(let t=0;t<i.length;t+=3)i[t]=e[0]+n[0]*r[t],i[t+1]=e[1]+n[1]*r[t+1],i[t+2]=e[2]+n[2]*r[t+2];g.setAttribute(`position`,new a(i,3))}else g.setAttribute(`position`,s(u.positions,3));if(u.uv)g.setAttribute(`uv`,new v(new Uint16Array(t,u.uv[0],u.uv[1]),2));else if(f.parkGround&&!o){let e=g.attributes.position,t=new Float32Array(e.count*2);for(let n=0;n<e.count;n++)t[n*2]=e.getX(n)/8,t[n*2+1]=-e.getZ(n)/8;g.setAttribute(`uv`,new a(t,2))}u.colours&&g.setAttribute(`color`,new a(new Uint8Array(t,u.colours[0],u.colours[1]),3,!0));let _=new Uint32Array(t,u.faces[0],u.faces[1]);g.setIndex(new a(_,1)),g.computeVertexNormals(),g.computeBoundingSphere();let y=u.material===Se||f.alpha>=.99&&xe.test(u.material);Ie&&r===W&&!u.transforms&&!f.courseOverlay&&y&&Pe.push({position:g.attributes.position,index:g.index});let x=c.get(u.material),S=u.transforms?new i(g,x,u.transforms[1]/16):new b(g,x);if(S.name=u.material,!f.overlay&&f.alpha>=.99&&/\/Looks\/(?:structure|floor_lake|floor_street|wall_interior|ceiling_parking|sp_concrete)$/.test(u.material)&&(S.renderOrder=-3,!u.transforms&&(!f.texture||f.opaqueTexture)&&(m||d||h===`low`))){let e=new b(g,f.insideSite?Oe:ke);e.name=`꼬모 실내 깊이`,e.renderOrder=-12,G.add(e)}if(u.transforms){let e=new Float32Array(t,u.transforms[0],u.transforms[1]);S.instanceMatrix.array.set(e),S.computeBoundingSphere(),S.frustumCulled=!1,g.computeBoundingBox();let r=new p,i=new n,a=[];for(let t=0;t<e.length;t+=16)r.copy(g.boundingBox).applyMatrix4(i.fromArray(e,t)),a.push([r.min.x,r.min.y,r.min.z,r.max.x,r.max.y,r.max.z]);je.push({mesh:S,source:e,bounds:a,selected:null});let o=/\/(prius|hatchback)_/.exec(u.material)?.[1];if(o){Me.has(o)||Me.set(o,[]);let e=pe(u.material,f,x.map,null,P,V.uniforms);Me.get(o).push({geometry:g,material:e})}}if(f.parkWater&&o&&(S.renderOrder=o.water.mesh.renderOrder),u.cells){let e=new a(new Uint32Array(_.length),1).setUsage(k),t=f.courseOverlay||f.retailGlazing||/\/(?:Display_|Diffuser|ceiling_parking|floor_parking|sf_int_)/.test(u.material);g.setIndex(e),g.setDrawRange(0,0),Ae.push({mesh:S,indices:_,cells:u.cells,work:e,near:t,fitout:!!f.courseOverlay,selected:null})}(f.courseOverlay?G:r).add(S)}let f=me(e.parkingFootprints);f&&r.add(f)}await Le(x,C,W);let X=x.heritageLights?.length?be(x.heritageLights,P):null;X&&W.add(X);let Re=ye({data:x.streetscape,root:W,templates:Me,phone:d,day:P});e.add(W);let Z=null,Q=o?.water?.material;if(Q&&x.waterBounds){let[e,t,n,r]=x.waterBounds;Z=Q.clone(),Z.uniforms={...Q.uniforms,comoWaterBounds:{value:new S(e,t,n,r)}},Z.fragmentShader=`uniform vec4 comoWaterBounds;
`+Q.fragmentShader.replace(`void main() {`,`void main() {vec2 en=vLake*vec2(1.,-1.);if(all(greaterThanEqual(en,comoWaterBounds.xy))&&all(lessThanEqual(en,comoWaterBounds.zw)))discard;`)}let $=new Map,ze=h,Be=0;function Ve(e){return e===`low`?[]:e===`high`&&!d?[`city`,`detail`]:[`city`]}function He(){if(!B)return;let e=[`detail`,`city`].map(e=>$.get(e)).find(e=>e?.group.visible&&e.field);B.value=e?.field??R}async function Ue(e){ze=e;let t=++Be,n=Ve(e);for(let[e,t]of $)t.group.visible=W.visible&&n.includes(e)&&t.ready;if(He(),W.visible)for(let e of n){if(t!==Be)return;let n=$.get(e);if(!n){let t=new F;t.name=`주차 차량 `+e,t.visible=!1,W.add(t),n={group:t,ready:!1},$.set(e,n),n.promise=Promise.all([y(K+e+`-scene.json.gz`),y(K+e+`-geometry.bin.gz`,`buffer`)]).then(async([e,r])=>{n.field=await fe(e.indoorLighting),await Le(e,r,t)}).then(()=>{n.ready=!0}).catch(n=>{throw W.remove(t),$.delete(e),n})}try{await n.promise}catch(t){console.warn(`주차 차량을 불러오지 못했습니다`,e,t);continue}t===Be&&(n.group.visible=!0,He(),J.key=``)}}W.visible=!0,U.setEnabled(!0),Z&&(o.water.mesh.material=Z),Ue(ze);function We(e,n,r){if(!W.visible)return;V.update(n?{x:n.x,y:n.z+.32,z:-n.y}:e.position,n?.yaw??0),P.value=1-(o?M.uLiteNight.value:ie(t.toneMappingExposure)),Y=(Y+r)%45;let i=Y<21?2:+(Y<23),a=Y<24?0:Y<42?2:+(Y<44);for(let{axis:e,aspect:t,light:n}of Ne)n.value=t===(e?a:i)?.52+.39*P.value:0;let s=e.position.x,c=e.position.y,l=e.position.z;X&&(X.visible=P.value<.93&&Math.hypot(s-134,l+323)<156),e.getWorldDirection(E);let u=(Math.round(Math.atan2(E.z,E.x)*4/Math.PI)+8)%8,f=G.visible?Ce?.update(e,n)??0:0,p=f>.985&&n&&n.z<12.32&&s>238&&s<391&&l<-173&&l>-347;Re(e,r,f<.62&&e.position.y>13);let h=de(s,-l,c-.55);o?.statics?.setBackgroundDistance?.(d||m||ze===`low`?125*Math.max(h,f):0);let g=Math.atan(Math.tan(_.degToRad(e.fov*.5))*e.aspect),v=Math.abs(_.euclideanModulo(Math.atan2(E.z,E.x)-u*Math.PI/4+Math.PI,2*Math.PI)-Math.PI),y=G.visible&&(f>.985||!!n&&e.position.distanceToSquared(V.uniforms.mallDriver.value)<10&&Math.abs(E.y)<.42&&v+g<Math.acos(.38)&&!!(T[Math.round(n.s)%T.length]&1<<u));y!==O&&(D.visible=!y,O=y);let b=Math.atan2(E.z,E.x),x=Math.asin(_.clamp(E.y,-1,1)),S=[Math.floor(s/6),Math.floor(l/6),Math.floor(c/1.6),Math.round(b/.16),Math.round(x/.13),Math.round(e.fov),Math.round(e.aspect*20),p].join(`/`);if(S===J.key)return;J.key=S,U.refresh&&performance.now()-J.lastSync>1200&&(U.refresh(),J.lastSync=performance.now());let C=p?44:d?115:155;Te.setFromProjectionMatrix(Ee.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse));function w(e,t,n,r,i,a,o=C){if(p&&(t>c+5.5||i<c-4.5))return!1;let u=Math.max(e-s,0,s-r),d=Math.max(n-l,0,l-a),f=Math.hypot(u,d);if(f>o)return!1;if(f<8)return!0;let m=8+f*.19;return De.min.set(e-m,t-m,n-m),De.max.set(r+m,i+m,a+m),Te.intersectsBox(De)}for(let e of je){let t=0,n=[];e.bounds.forEach((e,t)=>{w(...e)&&n.push(t)});let r=n.join(`,`);if(e.selected!==r){e.selected=r,e.mesh.visible=n.length>0;for(let r of n)e.mesh.instanceMatrix.array.set(e.source.subarray(r*16,r*16+16),t++*16);e.mesh.count=t,e.mesh.instanceMatrix.needsUpdate=!0}}for(let e of Ae){if(e.fitout&&!G.visible)continue;let t=p||e.near?C:d?570:820,n=[];for(let r=0;r<e.cells.length;r++){let[,,i,a,o,s,c,l]=e.cells[r];w(i,a,o,s,c,l,t)&&n.push(r)}let r=n.join(`,`);if(e.selected===r)continue;e.selected=r,e.mesh.visible=n.length>0;let i=0;for(let t of n){let[n,r]=e.cells[t];e.work.array.set(e.indices.subarray(n,n+r),i),i+=r}e.mesh.geometry.setDrawRange(0,i),e.work.clearUpdateRanges(),i&&e.work.addUpdateRange(0,i),e.work.needsUpdate=!0}}function Ge(e,t,n){if(!G.visible||!q||!n)return!0;let r=q.s[e.hint],i=Math.abs((r??n.s)-n.s),a=Math.min(i,q.length-i);return a<56&&(a<13||Math.abs(e.pose.z-n.z)<2.4)&&(V.uniforms.mallDepth.value<.6||t<32)}let Ke=x.wallSegments;return{group:W,setCourse:we,setTier:Ue,update:We,pavementLight:ve,labelVisible:Ge,kartLight:V.kartLight,setSnow:U.setSnow,roofOverlay:Ie,parkFloor:w.parkFloor,buildingWalls:Ke?.[1]?L(new Float32Array(C,Ke[0],Ke[1])):null}}export{q as loadComoMall};