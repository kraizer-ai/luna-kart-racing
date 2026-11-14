import{$ as e,Bn as t,D as n,E as r,Hn as i,I as a,K as o,L as s,N as c,Pn as l,R as u,Rn as d,S as f,T as p,Tt as m,V as h,Y as g,Z as _,ct as v,f as y,ft as b,gn as x,gt as S,hn as C,kn as w,p as T,q as E,x as D,zn as O}from"./three.core-CvkWdOa1.js";import{i as k,n as A,r as j}from"./three.module-CndJ0uXq.js";var M=Object.defineProperty,N=(e,t)=>{let n={};for(var r in e)M(n,r,{get:e[r],enumerable:!0});return t||M(n,Symbol.toStringTag,{value:`Module`}),n},P=8,F=256,I=3,L=12,R=256,z=8192,B=3,V=3,H=684,U=(.5/H).toFixed(8),W=4/5800,G=Math.PI/180,K=(e,t,n)=>Math.max(t,Math.min(n,e)),q=.3,J=.012,Y=34,X=24,ee=.016,te=.004,ne=.16,Z={0:null,1:null,2:null,length:3},Q=new Float32Array(32),$=(e,t,n,r,i)=>{Q[e*4]=t,Q[e*4+1]=n,Q[e*4+2]=r,Q[e*4+3]=i},re=!1,ie=`
#ifdef LUNA_LAMP_FIELD
	uniform highp sampler2D lunaLampMaps[ 3 ];
	uniform vec4 lunaLampParams[ 8 ];
#endif
`,ae=`
#ifdef LUNA_LAMP_FIELD
	vec3 lunaGlow = vec3( 0.0 );
	{
		vec3 lunaWorld = cameraPosition + ( vec4( geometryPosition, 0.0 ) * viewMatrix ).xyz;
		IncidentLight lunaLamp;
		lunaLamp.visible = true;
		if ( lunaLampParams[ 0 ].w > 0.5 ) {
			vec2 lunaAt = ( lunaWorld.xz - lunaLampParams[ 0 ].xy ) * lunaLampParams[ 0 ].z;
			if ( lunaAt.x >= 0.0 && lunaAt.y >= 0.0 && lunaAt.x < lunaLampParams[ 1 ].x && lunaAt.y < lunaLampParams[ 1 ].y ) {
				ivec2 lunaCell = ivec2( lunaAt );
				#if defined( RE_Direct )
				// Up to two lists, one after the other in a single loop: slots 0-11 are list A,
				// 12-23 list B (the other time of day while the two are blended).
				float lunaWeight = lunaLampParams[ 7 ].x;
				int lunaRow = lunaCell.y + int( lunaLampParams[ 7 ].z ) * ${F}, lunaFirst = 0;
				if ( lunaWeight <= 0.0 ) { lunaWeight = lunaLampParams[ 7 ].y; lunaRow = lunaCell.y + int( lunaLampParams[ 7 ].w ) * ${F}; lunaFirst = ${L}; }
				vec4 lunaIds = texelFetch( lunaLampMaps[ 0 ], ivec2( lunaCell.x * ${I}, lunaRow ), 0 );
				for ( int lunaSlot = lunaFirst; lunaSlot < 24; lunaSlot ++ ) {
					int lunaN = lunaSlot < ${L} ? lunaSlot : lunaSlot - ${L};
					if ( lunaSlot == ${L} && lunaFirst == 0 ) {
						if ( lunaLampParams[ 7 ].y <= 0.0 ) break;
						lunaWeight = lunaLampParams[ 7 ].y; lunaRow = lunaCell.y + int( lunaLampParams[ 7 ].w ) * ${F};
						lunaIds = texelFetch( lunaLampMaps[ 0 ], ivec2( lunaCell.x * ${I}, lunaRow ), 0 );
					// Four lamp numbers per texel; the next texel is read only when the list goes on.
					} else if ( lunaN > 0 && lunaN % 4 == 0 ) lunaIds = texelFetch( lunaLampMaps[ 0 ], ivec2( lunaCell.x * ${I} + lunaN / 4, lunaRow ), 0 );
					float lunaId = lunaIds[ lunaN % 4 ];
					if ( lunaId < 0.0 ) { if ( lunaSlot < ${L} ) { lunaSlot = 11; continue; } break; }
					int lunaIndex = int( lunaId );
					ivec2 lunaTexel = ivec2( ( lunaIndex % ${R} ) * 3, lunaIndex / ${R} );
					vec4 lunaPlace = texelFetch( lunaLampMaps[ 1 ], lunaTexel, 0 );
					vec3 lunaTo = lunaPlace.xyz - lunaWorld;
					float lunaD2 = dot( lunaTo, lunaTo ), lunaQ = lunaD2 * lunaPlace.w;
					if ( lunaQ < 1.0 ) {
						vec4 lunaColor = texelFetch( lunaLampMaps[ 1 ], lunaTexel + ivec2( 1, 0 ), 0 );
						vec4 lunaAxis = texelFetch( lunaLampMaps[ 1 ], lunaTexel + ivec2( 2, 0 ), 0 );
						vec3 lunaL = lunaTo * inversesqrt( max( lunaD2, 1e-6 ) );
						float lunaCos = - dot( lunaL, lunaAxis.xyz );
						float lunaShape = lunaAxis.w < 0.0 ? max( lunaCos, 0.0 ) : smoothstep( lunaColor.w, lunaColor.w + lunaAxis.w, lunaCos );
						float lunaWindow = 1.0 - lunaQ * lunaQ;
						lunaLamp.color = lunaColor.rgb * ( lunaWeight * lunaShape * lunaWindow * lunaWindow / max( lunaD2, 0.16 ) );
						if ( lunaLamp.color.r + lunaLamp.color.g + lunaLamp.color.b > 0.0 ) {
							lunaLamp.direction = ( viewMatrix * vec4( lunaL, 0.0 ) ).xyz;
							RE_Direct( lunaLamp, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
						}
					}
				}
				#endif
				// The glow maps of the sets are stacked; each is read clamped inside its own band.
				vec2 lunaG = ( lunaWorld.xz - lunaLampParams[ 2 ].xy ) * lunaLampParams[ 2 ].zw;
				lunaG.y = clamp( lunaG.y, ${U}, 1.0 - ${U} );
				vec4 lunaFill = textureLod( lunaLampMaps[ 2 ], vec2( lunaG.x, ( lunaG.y + lunaLampParams[ 7 ].z ) / ${B}.0 ), 0.0 );
				lunaGlow = lunaFill.rgb * ( lunaLampParams[ 7 ].x * ( 1.0 - smoothstep( 7.0, 18.0, abs( lunaWorld.y - lunaFill.a ) ) ) );
				if ( lunaLampParams[ 7 ].y > 0.0 ) {
					lunaFill = textureLod( lunaLampMaps[ 2 ], vec2( lunaG.x, ( lunaG.y + lunaLampParams[ 7 ].w ) / ${B}.0 ), 0.0 );
					lunaGlow += lunaFill.rgb * ( lunaLampParams[ 7 ].y * ( 1.0 - smoothstep( 7.0, 18.0, abs( lunaWorld.y - lunaFill.a ) ) ) );
				}
			}
		}
		#if defined( RE_Direct )
		// The kart's headlights: one beam from between the two lamps. Upright things are lit
		// by a low wide cone; the road gets the pool such a beam lays down ahead of the kart.
		if ( lunaLampParams[ 3 ].w > 0.0 ) {
			vec3 lunaRel = lunaWorld - lunaLampParams[ 3 ].xyz;
			vec3 lunaForward = lunaLampParams[ 4 ].xyz;
			float lunaAhead = dot( lunaRel, lunaForward );
			if ( lunaAhead > 0.3 && lunaAhead < 64.0 ) {
				float lunaSide = dot( lunaRel, vec3( - lunaForward.z, 0.0, lunaForward.x ) ), lunaD2 = dot( lunaRel, lunaRel );
				vec3 lunaL = - lunaRel * inversesqrt( lunaD2 );
				float lunaU = lunaSide / lunaAhead, lunaV = lunaRel.y / lunaAhead + 0.05;
				float lunaCone = exp( - lunaU * lunaU * 2.6 - lunaV * lunaV * 22.0 ) * 21.0 / max( lunaD2, 1.0 );
				float lunaWidth = 1.5 + 0.3 * lunaAhead;
				float lunaPool = smoothstep( 0.3, 2.4, lunaAhead ) * exp( - lunaAhead / 15.0 - lunaSide * lunaSide / ( lunaWidth * lunaWidth ) )
					* ( 1.0 - smoothstep( 1.2, 3.5, abs( lunaWorld.y - lunaLampParams[ 4 ].w ) ) ) * 0.085;
				// On the road the pool arrives as from above: a beam that low would otherwise only graze it.
				float lunaGround = smoothstep( 0.55, 0.92, normalize( ( vec4( geometryNormal, 0.0 ) * viewMatrix ).xyz ).y );
				lunaLamp.color = vec3( 0.87, 0.92, 1.0 ) * ( mix( lunaCone, lunaPool, lunaGround ) * lunaLampParams[ 3 ].w * ( 1.0 - smoothstep( 44.0, 64.0, lunaAhead ) ) );
				lunaLamp.direction = ( viewMatrix * vec4( normalize( mix( lunaL, vec3( 0.0, 1.0, 0.0 ), lunaGround ) ), 0.0 ) ).xyz;
				RE_Direct( lunaLamp, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
			}
		}
		// The flash of the boost flame behind the kart.
		if ( lunaLampParams[ 6 ].x + lunaLampParams[ 6 ].y + lunaLampParams[ 6 ].z > 0.0 ) {
			vec3 lunaTo = lunaLampParams[ 5 ].xyz - lunaWorld;
			float lunaD2 = dot( lunaTo, lunaTo ), lunaQ = lunaD2 * lunaLampParams[ 5 ].w;
			if ( lunaQ < 1.0 ) {
				float lunaWindow = 1.0 - lunaQ * lunaQ;
				lunaLamp.color = lunaLampParams[ 6 ].xyz * ( lunaWindow * lunaWindow / max( lunaD2, 0.5 ) );
				lunaLamp.direction = ( viewMatrix * vec4( lunaTo * inversesqrt( max( lunaD2, 1e-6 ) ), 0.0 ) ).xyz;
				RE_Direct( lunaLamp, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
			}
		}
		#endif
	}
#endif
`,oe=`
	#ifdef LUNA_LAMP_FIELD
		irradiance += lunaGlow;
	#endif
`,se=`
uniform highp sampler2D lunaLampMaps[ 3 ];
uniform vec4 lunaLampParams[ 8 ];
vec3 lunaLampsOn( vec3 world ) {
	vec3 light = vec3( 0.0 );
	if ( lunaLampParams[ 0 ].w < 0.5 ) return light;
	vec2 at = ( world.xz - lunaLampParams[ 0 ].xy ) * lunaLampParams[ 0 ].z;
	if ( at.x < 0.0 || at.y < 0.0 || at.x >= lunaLampParams[ 1 ].x || at.y >= lunaLampParams[ 1 ].y ) return light;
	ivec2 cell = ivec2( at );
	vec2 g = ( world.xz - lunaLampParams[ 2 ].xy ) * lunaLampParams[ 2 ].zw;
	g.y = clamp( g.y, ${U}, 1.0 - ${U} );
	// The lists of the (at most two) times of day being blended, each with its weight.
	for ( int list = 0; list < 2; list ++ ) {
		float weight = list == 0 ? lunaLampParams[ 7 ].x : lunaLampParams[ 7 ].y;
		if ( weight <= 0.0 ) continue;
		float set = list == 0 ? lunaLampParams[ 7 ].z : lunaLampParams[ 7 ].w;
		int row = cell.y + int( set ) * ${F};
		vec3 part = vec3( 0.0 );
		vec4 ids = texelFetch( lunaLampMaps[ 0 ], ivec2( cell.x * ${I}, row ), 0 );
		for ( int slot = 0; slot < ${L}; slot ++ ) {
			if ( slot > 0 && slot % 4 == 0 ) ids = texelFetch( lunaLampMaps[ 0 ], ivec2( cell.x * ${I} + slot / 4, row ), 0 );
			float id = ids[ slot % 4 ];
			if ( id < 0.0 ) break;
			int index = int( id );
			ivec2 texel = ivec2( ( index % ${R} ) * 3, index / ${R} );
			vec4 place = texelFetch( lunaLampMaps[ 1 ], texel, 0 );
			vec3 toLamp = place.xyz - world;
			float d2 = dot( toLamp, toLamp ), q = d2 * place.w;
			if ( q >= 1.0 ) continue;
			vec4 colour = texelFetch( lunaLampMaps[ 1 ], texel + ivec2( 1, 0 ), 0 ), axis = texelFetch( lunaLampMaps[ 1 ], texel + ivec2( 2, 0 ), 0 );
			float cosine = - dot( toLamp * inversesqrt( max( d2, 1e-6 ) ), axis.xyz );
			float shape = axis.w < 0.0 ? max( cosine, 0.0 ) : smoothstep( colour.w, colour.w + axis.w, cosine );
			float window = 1.0 - q * q;
			part += colour.rgb * ( shape * window * window / max( d2, 0.5 ) );
		}
		vec4 fill = textureLod( lunaLampMaps[ 2 ], vec2( g.x, ( g.y + set ) / ${B}.0 ), 0.0 );
		// Leaves face every way: half of what a surface turned to the lamp would receive.
		light += weight * ( part * 0.5 + fill.rgb * ( 1.0 - smoothstep( 7.0, 18.0, abs( world.y - fill.a ) ) ) );
	}
	return light;
}
`,ce={value:new O},le={value:new O},ue={value:0};function de(){return pe(),{lunaLampMaps:{value:Z},lunaLampParams:{value:Q},lunaRelight:ce,lunaRelightB:le,lunaDayMix:ue}}function fe(e,t){let n=new D(new Float32Array(e*t*4),e,t,m,c);return n.minFilter=n.magFilter=v,n.generateMipmaps=!1,n.flipY=!1,n.needsUpdate=!0,n}function pe(){if(re)return;let e=A.lights_pars_begin,t=A.lights_fragment_begin,n=`#if defined( RE_IndirectDiffuse )`,r=`vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );`;if(!t.includes(n)||!t.includes(r)||!j.physical?.fragmentShader.includes(`#include <lights_fragment_begin>`))throw Error(`This Three version has different light chunks; the park lamp field cannot be attached`);A.lights_pars_begin=e+ie,A.lights_fragment_begin=t.replace(n,ae+n).replace(r,r+oe),Z[0]=fe(F*I,F*B),Z[1]=fe(R*3,96),Z[0].image.data.fill(-1),Z[0].name=`Park lamp columns`,Z[1].name=`Park lamp records`;let i=new Uint16Array(H*H*B*4),a=f.toHalfFloat(-1e3);for(let e=3;e<i.length;e+=4)i[e]=a;Z[2]=new D(i,H,H*B,m,u),Z[2].name=`Park lamp glow`,Z[2].minFilter=Z[2].magFilter=o,Z[2].generateMipmaps=!1,Z[2].flipY=!1,Z[2].wrapS=Z[2].wrapT=y,Z[2].needsUpdate=!0,$(0,0,0,1/P,0),$(1,F,F,0,0),$(2,0,0,1/(H*V),1/(H*V)),$(5,0,0,0,1),$(7,1,0,0,0);for(let e of[`physical`,`standard`]){let t=j[e];t.uniforms.lunaLampMaps={value:Z},t.uniforms.lunaLampParams={value:Q},t.fragmentShader=`#define LUNA_LAMP_FIELD
`+t.fragmentShader}re=!0}function me(e,t=q){let n=[],r=new O,i=new O;for(let a of e){let e=a.inputs;if(!(e.intensity>0)||!a.position)continue;let o=e.intensity*2**(e.exposure||0)*W*t,s=e.color||[1,1,1],c=new O().fromArray(a.direction||[0,-1,0]).normalize(),l,u=!1,d=4*Math.PI,f=1,p=0;if(a.type===`SphereLight`)l=o*(e.normalize?.25:Math.PI*(e.radius??.1)**2);else if(a.type===`DiskLight`)l=o*(e.normalize?1:Math.PI*(e.radius??.1)**2),u=!0,d=Math.PI;else if(a.type===`RectLight`){let t=e.width??.1,n=e.height??.1,i=a.sourceMatrix;l=o*(e.normalize?1:t*n),u=!0,d=Math.PI;let s=t>=n?0:1;p=Math.max(t,n),i?r.set(i[s][0],i[s][2],-i[s][1]).normalize():r.set(1,0,0);let c=a.path.startsWith(`/World/Park/`);f=K(Math.ceil(p/(c?3:6)),1,c?10:6)}else continue;let m=-2,h=.5,g=e[`shaping:cone:angle`];if(g!==void 0&&g<175&&!(u&&g>=85)){let t=g*G,n=t*(1-K(e[`shaping:cone:softness`]??0,0,1));m=Math.cos(t),h=Math.max(Math.cos(n)-m,.03),u=!1,d=2*Math.PI*(1-Math.cos((t+n)/2))}i.fromArray(a.position);for(let e=0;e<f;e++){let t=f>1?(e-(f-1)/2)*p/f:0;n.push({x:i.x+r.x*t,y:i.y+r.y*t,z:i.z+r.z*t,r:s[0]*l/f,g:s[1]*l/f,b:s[2]*l/f,ax:c.x,ay:c.y,az:c.z,cosOuter:m,spread:h,lambert:u,solid:d,park:a.path.startsWith(`/World/Park/`)})}}return n}var he=(e,t)=>e.lambert?Math.max(t,0):(e=>e*e*(3-2*e))(K((t-e.cosOuter)/e.spread,0,1));function ge(){pe();let e={lamps:0,sources:0,listed:0,columns:0,crowded:0,dropped:0,droppedPark:0,droppedAt:null,buildMs:0,sets:[]},t=new Uint8Array(F*F),n=new Float32Array(F*F*L),r=new Int32Array(F*F*L),i=new Float32Array(H*H*4),a=new Float32Array(H*H),o=Array(B).fill(0),s=0,c=0,l=null,u=[.8,1.5,3,5,8,12],d=(t,n)=>{t>e.dropped&&(e.dropped=t,e.droppedAt=[Math.round(n.x),Math.round(n.y),Math.round(n.z),n.park]),n.park&&t>e.droppedPark&&(e.droppedPark=t)},p=()=>Q[28]>0&&o[Q[30]]>0||Q[29]>0&&o[Q[31]]>0,m=()=>{let t={...e};return delete t.sets,t};function h(h,g,{exposure:_=1,gain:v=q,glow:y=J}={}){if(!(h>=0&&h<B))throw Error(`Lamp list set ${h} does not exist`);let b=performance.now(),x=me(g,v).slice(0,z),S=Z[0].image.data.subarray(h*F*F*L,(h+1)*F*F*L),C=Z[1].image.data,w=h*z,T=Z[2].image.data.subarray(h*H*H*4,(h+1)*H*H*4),E=f.toHalfFloat;if(t.fill(0),S.fill(-1),i.fill(0),a.fill(0),e.sources=g.length,e.lamps=x.length,e.listed=e.columns=e.crowded=0,e.dropped=e.droppedPark=0,e.droppedAt=null,o[h]=x.length,Z[0].needsUpdate=Z[1].needsUpdate=Z[2].needsUpdate=!0,!x.length){let t=E(-1e3);for(let e=0;e<T.length;e+=4)T[e]=T[e+1]=T[e+2]=0,T[e+3]=t;return Q[3]=+!!p(),e.buildMs=performance.now()-b,e.sets[h]=m(),e}if(!l){let e=1/0,t=-1/0,n=1/0,r=-1/0;for(let i of x)i.park&&(e=Math.min(e,i.x),t=Math.max(t,i.x),n=Math.min(n,i.z),r=Math.max(r,i.z));if(e===1/0)for(let i of x)e=Math.min(e,i.x),t=Math.max(t,i.x),n=Math.min(n,i.z),r=Math.max(r,i.z);l={x:Math.floor(((e+t)/2-F*P/2)/P)*P,z:Math.floor(((n+r)/2-F*P/2)/P)*P,glowX:(e+t)/2-H*V/2,glowZ:(n+r)/2-H*V/2}}let D=l.x,O=l.z,k=l.glowX,A=l.glowZ,j=_*ne;x.forEach((e,o)=>{let s=Math.max(e.r,e.g,e.b),c=K(Math.sqrt(s*j/ee),3,X),l=1/(c*c),f=(w+o)*12;C[f]=e.x,C[f+1]=e.y,C[f+2]=e.z,C[f+3]=l,C[f+4]=e.r,C[f+5]=e.g,C[f+6]=e.b,C[f+7]=e.cosOuter,C[f+8]=e.ax,C[f+9]=e.ay,C[f+10]=e.az,C[f+11]=e.lambert?-1:e.spread;let p=Math.max(0,Math.floor((e.x-c-D)/P)),m=Math.min(255,Math.floor((e.x+c-D)/P)),h=Math.max(0,Math.floor((e.z-c-O)/P)),g=Math.min(255,Math.floor((e.z+c-O)/P)),_=e.ay>.2?1:-1;for(let i=h;i<=g;i++)for(let a=p;a<=m;a++){let c=D+a*P,f=O+i*P,p=K(e.x,c,c+P)-e.x,m=K(e.z,f,f+P)-e.z,h=p*p+m*m;if(h*l>=1)continue;let g=0;for(let t of u){let n=_*t,r=h+n*n,i=r*l;if(i>=1)break;let a=Math.sqrt(Math.max(r,1e-6)),o=(p*e.ax+n*e.ay+m*e.az)/a,c=1-i*i;g=Math.max(g,s*he(e,r<1e-6?1:o)*c*c/Math.max(r,.16))}if(g*j<te)continue;let v=i*F+a,y=v*L,b=t[v],S=b;for(;S>0&&n[y+S-1]<g;)S--;if(S>=L)d(g*j,e);else{b===L&&(d(n[y+L-1]*j,x[r[y+L-1]]),b--);for(let e=b;e>S;e--)n[y+e]=n[y+e-1],r[y+e]=r[y+e-1];n[y+S]=g,r[y+S]=o,t[v]=b+1}}let v=y*e.solid,b=e.y-_*3,S=Math.max(0,Math.floor((e.x-Y-k)/V)),T=Math.min(683,Math.ceil((e.x+Y-k)/V)),E=Math.max(0,Math.floor((e.z-Y-A)/V)),M=Math.min(683,Math.ceil((e.z+Y-A)/V));for(let t=E;t<=M;t++)for(let n=S;n<=T;n++){let r=k+(n+.5)*V-e.x,o=A+(t+.5)*V-e.z,c=r*r+o*o,l=c/1156;if(l>=1)continue;let u=v*(1-l)*(1-l)/(c+25),d=(t*H+n)*4,f=u*s;i[d]+=e.r*u,i[d+1]+=e.g*u,i[d+2]+=e.b*u,i[d+3]+=f*b,a[t*H+n]+=f}});for(let n=0;n<F*F;n++){let i=t[n];if(i){e.columns++,e.listed+=i,i===L&&e.crowded++;for(let e=0;e<i;e++)S[n*L+e]=w+r[n*L+e]}}for(let e=0,t=0;e<a.length;e++,t+=4){let n=a[e];n?(T[t]=E(Math.min(i[t],6e4)),T[t+1]=E(Math.min(i[t+1],6e4)),T[t+2]=E(Math.min(i[t+2],6e4)),T[t+3]=E(K(i[t+3]/n,-1e3,4e3))):(T[t]=T[t+1]=T[t+2]=0,T[t+3]=E(-1e3))}return s=D,c=O,$(0,D,O,1/P,+!!p()),$(2,k,A,1/(H*V),1/(H*V)),e.buildMs=Math.round(performance.now()-b),e.sets[h]=m(),e}function g(e,t,n,r=0){$(7,Math.max(0,n),Math.max(0,r),e,t),Q[3]=+!!p()}return{stats:e,buildSet:h,blend:g,maps:Z,params:Q,setLamps(t,n={}){let r=n.set??0;return h(r,t,n),g(r,r,1,0),e},setHeadlight(e,t,n,r){$(3,e.x,e.y,e.z,r),$(4,t.x,t.y,t.z,n)},setFlash(e,t,n,r=14){$(5,e.x,e.y,e.z,1/(r*r)),$(6,t.r*n,t.g*n,t.b*n,0)},setAmbient(e,t=[1,1,1],n=null){if(ce.value.set(1/Math.max(e*t[0],1e-7),1/Math.max(e*t[1],1e-7),1/Math.max(e*t[2],1e-7)),n){let[e,t]=n;le.value.set(1/Math.max(e*t[0],1e-7),1/Math.max(e*t[1],1e-7),1/Math.max(e*t[2],1e-7))}else le.value.copy(ce.value)},sample(e,t,n,r){r.set(0,0,0);let i=Math.floor((e-s)/P),a=Math.floor((n-c)/P);if(!Q[3]||i<0||a<0||i>=F||a>=F)return r;let o=Z[0].image.data,l=Z[1].image.data;for(let s=0;s<2;s++){let c=Q[28+s];if(!(c>0))continue;let u=(Q[30+s]*F*F+a*F+i)*L;for(let i=0;i<L;i++){let a=o[u+i];if(a<0)break;let s=a*12,d=l[s]-e,f=l[s+1]-t,p=l[s+2]-n,m=d*d+f*f+p*p,h=m*l[s+3];if(h>=1)continue;let g=-(d*l[s+8]+f*l[s+9]+p*l[s+10])/Math.sqrt(Math.max(m,1e-6)),_=l[s+11],v=c*(_<0?Math.max(g,0):(e=>e*e*(3-2*e))(K((g-l[s+7])/_,0,1)))*(1-h*h)**2/Math.max(m,.5)*.5;r.x+=l[s+4]*v,r.y+=l[s+5]*v,r.z+=l[s+6]*v}}return r},setEnabled(e){Q[3]=e&&p()?1:0},dispose(){Q[3]=0,Q[15]=0,$(6,0,0,0,0)}}}var _e=N({bakeOriginalPlantImpostors:()=>Ce}),ve=Object.freeze([`/World/Loop/Meadow/Prototypes/fountain_grass_tall`,`/World/Loop/RepairGroundCover/Prototypes/yew`,`/World/Loop/RepairGroundCover/Prototypes/privet`]),ye=`
uniform vec3 sourceCenter;
uniform vec2 captureSize;
uniform float viewCount;
out vec3 planePoint;
flat out vec3 localEye;
flat out vec3 captureFront;
flat out vec3 captureRight;
flat out float captureIndex;
flat out mat4 localToClip;
out vec3 impostorLamp;
${se}
#include <fog_pars_vertex>
void main() {
  mat4 sourceToWorld = modelMatrix * instanceMatrix;
  localEye = (inverse(sourceToWorld) * vec4(cameraPosition, 1.0)).xyz;
  vec3 direction = localEye - sourceCenter;
  float angle = atan(direction.x, -direction.y);
  float stepAngle = 6.28318530718 / viewCount;
  captureIndex = mod(floor(angle / stepAngle + 0.5) + viewCount, viewCount);
  float selectedAngle = captureIndex * stepAngle;
  captureFront = vec3(sin(selectedAngle), -cos(selectedAngle), 0.0);
  captureRight = vec3(cos(selectedAngle), sin(selectedAngle), 0.0);
  vec3 facingRight = vec3(cos(angle), sin(angle), 0.0);
  planePoint = sourceCenter + facingRight * position.x * captureSize.x
    + vec3(0.0, 0.0, position.y * captureSize.y);
  localToClip = projectionMatrix * modelViewMatrix * instanceMatrix;
  // Park lamp light on the plant, taken inside the card so it varies across a tree.
  vec3 lampPoint = sourceCenter + facingRight * position.x * captureSize.x * 0.6 + vec3(0.0, 0.0, position.y * captureSize.y * 0.6);
  impostorLamp = lunaLampsOn((sourceToWorld * vec4(lampPoint, 1.0)).xyz);
  gl_Position = localToClip * vec4(planePoint, 1.0);
  vec4 mvPosition = modelViewMatrix * instanceMatrix * vec4(planePoint, 1.0);
  #include <fog_vertex>
}`,be=`
uniform sampler2D colorAtlas;
uniform sampler2D depthAtlas;
uniform vec3 sourceCenter;
uniform vec2 captureSize;
uniform vec2 atlasGrid;
uniform float depthSpan;
uniform float alphaCutoff;
in vec3 planePoint;
flat in vec3 localEye;
flat in vec3 captureFront;
flat in vec3 captureRight;
flat in float captureIndex;
flat in mat4 localToClip;
in vec3 impostorLamp;
uniform vec3 lunaRelight;
// While the time of day changes the card blends towards its capture in the next light.
uniform sampler2D colorAtlasB;
uniform vec3 lunaRelightB;
uniform float lunaDayMix;
out vec4 impostorColor;
#define gl_FragColor impostorColor
#if defined(USE_LOGARITHMIC_DEPTH_BUFFER)
uniform float logDepthBufFC;
#endif
#include <fog_pars_fragment>
vec2 sourceUV(vec3 p) {
  vec3 d = p - sourceCenter;
  return vec2(dot(d, captureRight) / captureSize.x, d.z / captureSize.y) + 0.5;
}
vec2 atlasUV(vec2 uv) {
  return (vec2(mod(captureIndex, atlasGrid.x), floor(captureIndex / atlasGrid.x)) + uv) / atlasGrid;
}
void main() {
  vec3 ray = normalize(planePoint - localEye);
  float denominator = dot(ray, captureFront);
  if (abs(denominator) < 0.05) discard;
  vec3 point = planePoint;
  vec2 uv = sourceUV(point);
  // Reproject the baked depth field along this pass's actual camera ray.
  // This is a review prototype, not a claim of exact continuous-view geometry.
  for (int step = 0; step < 3; ++step) {
    if (any(lessThan(uv, vec2(0.0))) || any(greaterThan(uv, vec2(1.0)))) discard;
    float depth = texture(depthAtlas, atlasUV(uv)).r;
    float frontDistance = (0.5 - depth) * depthSpan;
    float t = (frontDistance - dot(localEye - sourceCenter, captureFront)) / denominator;
    point = localEye + ray * t;
    uv = sourceUV(point);
  }
  if (any(lessThan(uv, vec2(0.0))) || any(greaterThan(uv, vec2(1.0)))) discard;
  vec4 sampleColor = texture(colorAtlas, atlasUV(uv));
  // Coverage of the cut-out edge for a multisampled target (alpha to coverage).
  float impostorCoverage = clamp((sampleColor.a - alphaCutoff) / max(fwidth(sampleColor.a), 0.0001) + 0.5, 0.0, 1.0);
  if (impostorCoverage <= 0.0) discard;
  vec4 clip = localToClip * vec4(point, 1.0);
  #if defined(USE_LOGARITHMIC_DEPTH_BUFFER)
    gl_FragDepth = log2(max(1.0e-6, 1.0 + clip.w)) * logDepthBufFC * 0.5;
  #elif defined(USE_REVERSED_DEPTH_BUFFER)
    gl_FragDepth = clip.z / clip.w;
  #else
    gl_FragDepth = clip.z / clip.w * 0.5 + 0.5;
  #endif
  // Offscreen cutout color is premultiplied at coverage edges/mip levels.
  // The capture holds the plant in its preset's sky and sun; the park lamps are added in proportion.
  vec3 impostorLit = sampleColor.rgb / max(sampleColor.a, 0.001) * (1.0 + impostorLamp * lunaRelight);
  if (lunaDayMix > 0.0) {
    vec4 sampleB = texture(colorAtlasB, atlasUV(uv));
    impostorLit = mix(impostorLit, sampleB.rgb / max(sampleB.a, 0.001) * (1.0 + impostorLamp * lunaRelightB), lunaDayMix);
  }
  gl_FragColor = vec4(impostorLit, impostorCoverage);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
  #include <fog_fragment>
}`;function xe(e){if(!e)throw TypeError(`The original noon sun direction/color/intensity is required`);let t,n,i;if(e.isDirectionalLight)t=e.getWorldPosition(new O).sub(e.target.getWorldPosition(new O)).normalize(),n=e.color,i=e.intensity;else{let r=e.direction;t=r?.isVector3?r.clone():new O().fromArray(r??[]),n=e.color,i=e.intensity}if(!Number.isFinite(t.lengthSq())||t.lengthSq()===0||!Number.isFinite(i))throw TypeError(`Invalid original noon sun`);let a=new r(n,i);return a.position.copy(t.normalize()).multiplyScalar(20),a.castShadow=i>0,a.shadow.mapSize.set(2048,2048),a.shadow.bias=-2e-5,a.shadow.normalBias=.006,a}function Se(e){let t=e.clone();t.onBeforeCompile=e.onBeforeCompile,t.customProgramCacheKey=function(){return`${e.customProgramCacheKey.call(this)}|original-impostor-bake-no-csm`},t.defines={...e.defines??{}};for(let e of Object.keys(t.defines))(e===`USE_CSM`||e.startsWith(`CSM_`))&&delete t.defines[e];return t.needsUpdate=!0,t}async function Ce({renderer:r,originalScene:c,baseScene:f,sun:y,preset:D=`noon`,paths:A=ve,views:j=8,resolution:M=256,maxViewPitchDegrees:N=10,alphaCutoff:P=.35,margin:F=1.08,onProgress:I}={}){if(!r?.isWebGLRenderer||!c?.createPrototypeObject||!f?.isScene)throw TypeError(`Original renderer, scene adapter and lighting scene are required`);if(![`dawn`,`noon`,`night`].includes(D))throw Error(`Unknown source lighting preset`);if(j!==8||!Number.isInteger(M)||M<64||M>1024)throw RangeError(`Use 8 views and a 64–1024px cell`);if(r.capabilities.reversedDepthBuffer)throw Error(`Depth-atlas bake is not yet verified with reversed depth; keep original geometry`);let L=new d(4,2),R=new Map,z=new S(1,1),B=new Set,V=new Set,H={target:r.getRenderTarget(),cubeFace:r.getActiveCubeFace(),mip:r.getActiveMipmapLevel(),viewport:r.getViewport(new t),scissor:r.getScissor(new t),scissorTest:r.getScissorTest(),color:r.getClearColor(new T).clone(),alpha:r.getClearAlpha(),autoClear:r.autoClear,toneMapping:r.toneMapping,shadowEnabled:r.shadowMap.enabled,shadowAuto:r.shadowMap.autoUpdate,shadowNeeds:r.shadowMap.needsUpdate},U=new C;U.environment=f.environment,U.environmentIntensity=f.environmentIntensity,U.environmentRotation.copy(f.environmentRotation);let W=xe(y);U.add(W,W.target),f.traverse(e=>{if(e.isHemisphereLight||e.isAmbientLight){let t=e.clone();t.position.copy(e.getWorldPosition(new O)),U.add(t)}});let G=null,K=!1;try{r.autoClear=!1,r.toneMapping=0,r.shadowMap.enabled=!0,r.shadowMap.autoUpdate=!1,r.setClearColor(0,0);for(let e of A){G=c.createPrototypeObject(e);let t=G.bounds,n=t.getCenter(new O),f=t.getSize(new O),h=Math.hypot(f.x,f.y)*.5,_=h*2*F,y=f.z*F,S=Math.max(h*F,.01),C=new i(M*4,M*2,{type:u,format:m,depthBuffer:!0,stencilBuffer:!1,minFilter:E,magFilter:o,generateMipmaps:!0,colorSpace:g});C.texture.name=`Original noon color/alpha ${e}`,C.depthTexture=new p(C.width,C.height,l),C.depthTexture.minFilter=C.depthTexture.magFilter=v;let T={path:e,target:C,bounds:t.clone(),center:n,width:_,height:y,depthSpan:S*2};R.set(e,T),G.group.traverse(e=>{if(!e.isMesh)return;let t=e=>{let t=Se(e);return V.add(t),t};e.material=Array.isArray(e.material)?e.material.map(t):t(e.material),e.castShadow=e.receiveShadow=!0});let D=new s;D.rotation.x=-Math.PI/2,D.add(G.group),U.add(D);let N=new O(n.x,n.z,-n.y),z=W.position.clone().sub(W.target.position).normalize(),H=Math.max(_,y)*.8,K=H*3;W.target.position.copy(N),W.position.copy(N).addScaledVector(z,K),Object.assign(W.shadow.camera,{left:-H,right:H,bottom:-H,top:H,near:.1,far:K*2}),W.shadow.camera.updateProjectionMatrix(),r.shadowMap.needsUpdate=!0;let q=S*3,J=new b(-_/2,_/2,y/2,-y/2,q-S,q+S);r.setRenderTarget(C),r.setScissorTest(!1),r.clear(!0,!0,!0),r.setScissorTest(!0);for(let t=0;t<j;++t){let n=t/j*Math.PI*2;J.position.copy(N).add(new O(Math.sin(n)*q,0,Math.cos(n)*q)),J.lookAt(N),J.updateMatrixWorld(!0);let i=t%4*M,a=Math.floor(t/4)*M;C.viewport.set(i,a,M,M),C.scissor.set(i,a,M,M),C.scissorTest=!0,r.setRenderTarget(C),r.render(U,J),I?.({path:e,view:t+1,views:j,completedPlants:R.size-1,totalPlants:A.length})}r.setScissorTest(!1),G.dispose(),G=null,U.remove(D),V.forEach(e=>e.dispose()),V.clear();let Y=new x({name:`Review-only source impostor ${e}`,glslVersion:a,vertexShader:ye,fragmentShader:be,toneMapped:!0,fog:!0,side:2,depthWrite:!0,depthTest:!0,uniforms:{...w.clone(k.fog),...de(),colorAtlas:{value:C.texture},colorAtlasB:{value:C.texture},depthAtlas:{value:C.depthTexture},sourceCenter:{value:n.clone()},captureSize:{value:new d(_,y)},atlasGrid:{value:L.clone()},viewCount:{value:j},depthSpan:{value:S*2},alphaCutoff:{value:P}}});T.material=Y,B.add(Y),await new Promise(e=>setTimeout(e,0))}K=!0}finally{G?.dispose(),V.forEach(e=>e.dispose()),r.setViewport(H.viewport),r.setScissor(H.scissor),r.setScissorTest(H.scissorTest),r.setClearColor(H.color,H.alpha),r.autoClear=H.autoClear,r.toneMapping=H.toneMapping,r.shadowMap.enabled=H.shadowEnabled,r.shadowMap.autoUpdate=H.shadowAuto,r.shadowMap.needsUpdate=H.shadowNeeds,W.shadow.map?.dispose(),r.setRenderTarget(H.target,H.cubeFace,H.mip),K||(R.forEach(e=>e.target.dispose()),B.forEach(e=>e.dispose()),z.dispose())}let q=new e,J=new O,Y=!1,X={ready:!0,enabled:!1,atlases:R,metadata:{schema:`luna-source-impostor-review-v1`,sourceGeometry:`Exact createPrototypeObject recipes`,preset:D,views:j,resolution:M,color:`Linear HDR source noon shading + alpha`,depth:`Orthographic source depth`,minDistance:`per-source-size; recorded per row in saved cache`,maxViewPitchDegrees:N,defaultEnabled:!1,visuallyValidated:!1,limitations:[`Noon RGB is baked: rotated instances can differ from original world-light response.`,`Eight azimuth samples and depth reprojection do not guarantee continuous-view silhouette/coverage.`,`Source-direction self-shadow is baked; neighbouring ground shadows and normal/albedo relighting are not.`,`Alpha mip coverage, view transitions, reflection and shadow appearance require source A/B review.`]},supports(e){return!Y&&R.has(e)},distanceFor(e){let t=R.get(e);return t?Math.max(6,Math.min(28,t.height*2)):240},canUse(e,t,n){let r=R.get(e);if(Y||!r)return!1;q.copy(t).invert();let i=Math.tan(_.degToRad(N));for(let e of n)if(J.copy(e).applyMatrix4(q).sub(r.center),Math.abs(J.z)>Math.hypot(J.x,J.y)*i)return!1;return!0},createBatch(e,t){let r=R.get(e);if(Y||!r)throw Error(`No baked original plant: ${e}`);let i=new h(z,r.material,t);return i.name=`Review source impostor ${e}`,i.instanceMatrix.setUsage(n),i.castShadow=!1,i.receiveShadow=!1,i.userData.sourcePrototype=e,i.userData.reviewOnly=!0,i},dispose(){Y||(Y=!0,X.ready=!1,R.forEach(e=>e.target.dispose()),B.forEach(e=>e.dispose()),z.dispose())}};return X}export{ge as a,q as i,_e as n,ue as o,ye as r,de as s,be as t};