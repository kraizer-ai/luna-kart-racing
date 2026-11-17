import{En as e,In as t,Rt as n,Yt as r,ar as i,lt as a,tn as o,ur as s}from"./kart-C2-06Czg.js";function c({stageSha256:c,radianceScale:l=4/5800}={}){let u={lunaSurfaceLight:{value:null},lunaSurfaceNormal:{value:null},lunaSurfaceBounds:{value:new s},lunaSurfaceEnabled:{value:0},lunaSurfaceScale:{value:l},lunaSurfaceHeightTolerance:{value:.04},lunaSurfaceNormalThreshold:{value:.95},lunaSurfacePreviewViewWeight:{value:0},lunaSurfaceRGBDecode:{value:1},lunaSurfaceHeightOrigin:{value:0},lunaSurfacePackedNormal:{value:0}},d=new Map,f=[],p=!1,m=`noon`,h=null,g=!1,_={ready:!1,enabled:!1,appearanceVerified:!1,coverage:`one top-down source surface per texel; guarded by source height and geometric normal`,nativeStaticDiffuse:!0,fullSceneBake:!1,staticShadowsDisabled:!1,sourceGeometryChanged:!1,sampling:`four individually height/normal-checked texels; blend fallback at incomplete coverage`};function v(){_.enabled=!!(p&&h&&h.preset===m),u.lunaSurfaceEnabled.value=+!!_.enabled}function y(e){if(!e?.isMeshStandardMaterial||!e.userData?.ownedByOriginalMaterials||e.sourceTransmissionSource||d.has(e)||/^tea_/.test(e.userData.sourceModel||``))return;let t={hook:e.onBeforeCompile,key:e.customProgramCacheKey},n=e.userData.sourceModel===`preview`;d.set(e,t),e.onBeforeCompile=function(e){t.hook.call(this,e),Object.assign(e.uniforms,u),e.fragmentShader.includes(`uniform sampler2D lunaSurfaceLight`)||(e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
varying vec3 vLunaSurfacePosition;`),e.vertexShader=e.vertexShader.replace(`#include <project_vertex>`,`vec4 lunaSurfaceWorld=vec4(transformed,1.);
#ifdef USE_BATCHING
lunaSurfaceWorld=batchingMatrix*lunaSurfaceWorld;
#endif
#ifdef USE_INSTANCING
lunaSurfaceWorld=instanceMatrix*lunaSurfaceWorld;
#endif
lunaSurfaceWorld=modelMatrix*lunaSurfaceWorld;
vLunaSurfacePosition=vec3(lunaSurfaceWorld.x,-lunaSurfaceWorld.z,lunaSurfaceWorld.y);
#include <project_vertex>`),e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>
varying vec3 vLunaSurfacePosition;
uniform sampler2D lunaSurfaceLight,lunaSurfaceNormal;
uniform vec4 lunaSurfaceBounds;
uniform float lunaSurfaceEnabled,lunaSurfaceScale,lunaSurfaceHeightTolerance,lunaSurfaceNormalThreshold,lunaSurfacePreviewViewWeight;
uniform float lunaSurfaceRGBDecode,lunaSurfaceHeightOrigin,lunaSurfacePackedNormal;
vec4 lunaReadSurfaceLight(vec2 uv,vec3 point,vec3 receiverNormal){
  if(abs(receiverNormal.z)<.0001)return vec4(0.);
  ivec2 size=textureSize(lunaSurfaceLight,0);
  vec2 texel=uv*vec2(size)-.5,f=fract(texel);
  ivec2 base=ivec2(floor(texel));
  vec3 sum=vec3(0.);float coverage=0.;
  for(int y=0;y<2;y++)for(int x=0;x<2;x++){
    ivec2 p=base+ivec2(x,y);
    if(any(lessThan(p,ivec2(0)))||any(greaterThanEqual(p,size)))continue;
    vec4 sampleLight=texelFetch(lunaSurfaceLight,p,0),guard=texelFetch(lunaSurfaceNormal,p,0);
    if(guard.a<.999)continue;
    vec3 sampleNormal=normalize(mix(guard.xyz,guard.xyz*2.-1.,lunaSurfacePackedNormal));
    vec2 sampleUV=(vec2(p)+.5)/vec2(size);
    vec2 sampleXY=vec2(mix(lunaSurfaceBounds.x,lunaSurfaceBounds.z,sampleUV.x),mix(lunaSurfaceBounds.w,lunaSurfaceBounds.y,sampleUV.y));
    // Compare the captured height with the receiver's plane at that texel.
    // Mixing rail/ground heights before this check invents a false surface.
    float expectedHeight=point.z-dot(receiverNormal.xy,sampleXY-point.xy)/receiverNormal.z;
    if(abs(sampleLight.a+lunaSurfaceHeightOrigin-expectedHeight)>=lunaSurfaceHeightTolerance||dot(sampleNormal,receiverNormal)<=lunaSurfaceNormalThreshold)continue;
    float weight=(x==0?1.-f.x:f.x)*(y==0?1.-f.y:f.y);
    sum+=sampleLight.rgb*lunaSurfaceRGBDecode*weight;coverage+=weight;
  }
  return coverage>.000001?vec4(sum/coverage,clamp(coverage,0.,1.)):vec4(0.);
}`),e.fragmentShader=e.fragmentShader.replace(`#include <normal_fragment_begin>`,`#include <normal_fragment_begin>
vec3 lunaSurfaceWorldNormal=normalize(normal*mat3(viewMatrix));
vec3 lunaSurfaceSourceNormal=vec3(lunaSurfaceWorldNormal.x,-lunaSurfaceWorldNormal.z,lunaSurfaceWorldNormal.y);`),e.fragmentShader=e.fragmentShader.replace(`#include <lights_fragment_end>`,`#include <lights_fragment_end>
if(lunaSurfaceEnabled>.5){
  vec2 lunaSurfaceUV=vec2((vLunaSurfacePosition.x-lunaSurfaceBounds.x)/(lunaSurfaceBounds.z-lunaSurfaceBounds.x),
    (lunaSurfaceBounds.w-vLunaSurfacePosition.y)/(lunaSurfaceBounds.w-lunaSurfaceBounds.y));
  if(all(greaterThanEqual(lunaSurfaceUV,vec2(0.)))&&all(lessThanEqual(lunaSurfaceUV,vec2(1.)))){
    vec4 lunaSurfaceSample=lunaReadSurfaceLight(lunaSurfaceUV,vLunaSurfacePosition,lunaSurfaceSourceNormal);
    if(lunaSurfaceSample.a>0.){
      // Replace static diffuse once; do not add it on top of the same live sun,
      // sky and lamp diffuse. Specular remains view dependent in this pilot.
      vec3 lunaDiffuseWeight=vec3(1.);
      ${n?`if(lunaSurfacePreviewViewWeight>.5){
        // Native PreviewSurface's curve layer weights its diffuse base with
        // 1-max(F(N.V),F(N.L)). This angularly integrated cache lacks the
        // incoming-direction distribution: the view factor is an explicit
        // approximation, strongest for a grazing ground view. It is not a
        // per-material color correction or proof of exact MDL integration.
        float lunaNV=clamp(dot(normal,geometryViewDir),0.,1.);
        lunaDiffuseWeight=vec3(1.)-mix(material.specularColor,vec3(material.specularF90),pow(1.-lunaNV,5.));
      }`:``}
      vec3 lunaBakedDiffuse=material.diffuseContribution*lunaDiffuseWeight*max(lunaSurfaceSample.rgb,vec3(0.))*(lunaSurfaceScale*RECIPROCAL_PI);
      reflectedLight.directDiffuse=mix(reflectedLight.directDiffuse,lunaBakedDiffuse,lunaSurfaceSample.a);
      reflectedLight.indirectDiffuse*=1.-lunaSurfaceSample.a;
    }
  }
}`))},e.customProgramCacheKey=function(){return t.key.call(this)+`|native-surface-light-v3|`+Number(n)},e.needsUpdate=!0}async function b(s){if(g)throw Error(`Surface-light reviewer has been disposed`);let l=new URL(s,document.baseURI),d=await a(l.href);if(![`luna-native-surface-light-v1`,`luna-native-surface-light-v2`].includes(d.schema)||d.preset!==`noon`||d.rowOrder!==`north-to-south`)throw Error(`Unsupported native surface-light capture`);if(c&&d.sourceSha256!==c)throw Error(`Surface light and final source stage hashes differ`);if(!Number.isInteger(d.width)||!Number.isInteger(d.height)||d.width<1||d.height<1||d.width>8192||d.height>8192)throw Error(`Invalid native lightmap size`);if(!Array.isArray(d.bounds)||d.bounds.length!==4||!d.bounds.every(Number.isFinite)||d.bounds[2]<=d.bounds[0]||d.bounds[3]<=d.bounds[1])throw Error(`Invalid source lightmap bounds`);let p=[],m=d.schema===`luna-native-surface-light-v2`,y=m?d.irradianceHeight.rgbScale:1,b=m?d.irradianceHeight.heightOrigin:0;if(!Number.isFinite(y)||y<=0||!Number.isFinite(b))throw Error(`Invalid native lightmap decode`);try{for(let s of[`irradianceHeight`,`normalValidity`]){let c=d[s],u=m?s===`irradianceHeight`?`float16`:`uint8`:`float32`;if(c?.type!==u||c.channels!==4||typeof c.url!=`string`||u===`uint8`&&c.encoding!==`signed-normal-xyz`)throw Error(`Invalid ${s} descriptor`);let f=await a(new URL(c.url,l).href,`binary`),[h,g]=u===`float32`?[Float32Array,r]:u===`float16`?[Uint16Array,o]:[Uint8Array,i];if(f.byteLength!==d.width*d.height*4*h.BYTES_PER_ELEMENT)throw Error(`Invalid ${s} byte count`);if(m&&[...new Uint8Array(await crypto.subtle.digest(`SHA-256`,f))].map(e=>e.toString(16).padStart(2,`0`)).join(``)!==c.sha256)throw Error(`Invalid ${s} integrity hash`);let _=new h(f);if(u===`float32`&&!_.every(Number.isFinite)||u===`float16`&&_.some(e=>(e&31744)==31744))throw Error(`Non-finite ${s} values`);let v=new n(_,d.width,d.height,t,g);v.name=`Native surface ${s}`,v.colorSpace=``,v.flipY=!1,v.minFilter=v.magFilter=e,v.generateMipmaps=!1,v.needsUpdate=!0,p.push(v)}}catch(e){throw p.forEach(e=>e.dispose()),e}return f.forEach(e=>e.dispose()),f=p,h=d,u.lunaSurfaceLight.value=f[0],u.lunaSurfaceNormal.value=f[1],u.lunaSurfaceBounds.value.fromArray(d.bounds),u.lunaSurfaceRGBDecode.value=y,u.lunaSurfaceHeightOrigin.value=b,u.lunaSurfacePackedNormal.value=+!!m,_.ready=!0,_.preset=d.preset,_.sourceSha256=d.sourceSha256,_.textureBytes=d.width*d.height*(m?12:32),_.bounds=d.bounds,_.packed=m,_.packing=d.packing?.report??null,v(),_}return{stats:_,attach:y,load:b,setEnabled(e){p=!!e,v()},setPreset(e){m=e,v()},setNativePreviewViewWeight(e){u.lunaSurfacePreviewViewWeight.value=+!!e,_.previewDiffuseViewWeightApproximation=!!e},setRadianceScale(e){if(!Number.isFinite(e)||e<=0)throw Error(`Invalid surface radiance scale`);u.lunaSurfaceScale.value=e,_.radianceScale=e},dispose(){if(!g){g=!0,p=!1,u.lunaSurfaceEnabled.value=0;for(let[e,t]of d)e.onBeforeCompile=t.hook,e.customProgramCacheKey=t.key,e.needsUpdate=!0;d.clear(),f.forEach(e=>e.dispose()),f=[],_.ready=_.enabled=!1}}}}export{c as createBakedSurfaceLight};