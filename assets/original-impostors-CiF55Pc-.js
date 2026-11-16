import{$ as e,Bn as t,Bt as n,Dn as r,Dt as i,En as a,Et as o,Ft as s,Gn as c,It as l,Jt as u,Kn as d,Kt as f,Pt as p,Q as m,St as h,Un as g,Wn as _,Yn as v,Yt as y,Zt as b,_n as x,bt as S,et as C,fn as w,ht as T,jt as E,ln as D,mt as O,qn as k,qt as A,sn as j,wt as ee}from"./kart-zibVCBsN.js";var M=8,N=256,P=3,F=12,I=256,L=8192,R=3,z=3,B=684,V=(.5/B).toFixed(8),H=4/5800,U=Math.PI/180,W=(e,t,n)=>Math.max(t,Math.min(n,e)),G=.3,K=.012,q=34,J=24,Y=.016,te=.004,ne=.16,X={0:null,1:null,2:null,length:3},Z=new Float32Array(32),Q=(e,t,n,r,i)=>{Z[e*4]=t,Z[e*4+1]=n,Z[e*4+2]=r,Z[e*4+3]=i},re=!1,ie=`
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
				int lunaRow = lunaCell.y + int( lunaLampParams[ 7 ].z ) * ${N}, lunaFirst = 0;
				if ( lunaWeight <= 0.0 ) { lunaWeight = lunaLampParams[ 7 ].y; lunaRow = lunaCell.y + int( lunaLampParams[ 7 ].w ) * ${N}; lunaFirst = ${F}; }
				vec4 lunaIds = texelFetch( lunaLampMaps[ 0 ], ivec2( lunaCell.x * ${P}, lunaRow ), 0 );
				for ( int lunaSlot = lunaFirst; lunaSlot < 24; lunaSlot ++ ) {
					int lunaN = lunaSlot < ${F} ? lunaSlot : lunaSlot - ${F};
					if ( lunaSlot == ${F} && lunaFirst == 0 ) {
						if ( lunaLampParams[ 7 ].y <= 0.0 ) break;
						lunaWeight = lunaLampParams[ 7 ].y; lunaRow = lunaCell.y + int( lunaLampParams[ 7 ].w ) * ${N};
						lunaIds = texelFetch( lunaLampMaps[ 0 ], ivec2( lunaCell.x * ${P}, lunaRow ), 0 );
					// Four lamp numbers per texel; the next texel is read only when the list goes on.
					} else if ( lunaN > 0 && lunaN % 4 == 0 ) lunaIds = texelFetch( lunaLampMaps[ 0 ], ivec2( lunaCell.x * ${P} + lunaN / 4, lunaRow ), 0 );
					float lunaId = lunaIds[ lunaN % 4 ];
					if ( lunaId < 0.0 ) { if ( lunaSlot < ${F} ) { lunaSlot = 11; continue; } break; }
					int lunaIndex = int( lunaId );
					ivec2 lunaTexel = ivec2( ( lunaIndex % ${I} ) * 3, lunaIndex / ${I} );
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
				lunaG.y = clamp( lunaG.y, ${V}, 1.0 - ${V} );
				vec4 lunaFill = textureLod( lunaLampMaps[ 2 ], vec2( lunaG.x, ( lunaG.y + lunaLampParams[ 7 ].z ) / ${R}.0 ), 0.0 );
				lunaGlow = lunaFill.rgb * ( lunaLampParams[ 7 ].x * ( 1.0 - smoothstep( 7.0, 18.0, abs( lunaWorld.y - lunaFill.a ) ) ) );
				if ( lunaLampParams[ 7 ].y > 0.0 ) {
					lunaFill = textureLod( lunaLampMaps[ 2 ], vec2( lunaG.x, ( lunaG.y + lunaLampParams[ 7 ].w ) / ${R}.0 ), 0.0 );
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
	g.y = clamp( g.y, ${V}, 1.0 - ${V} );
	// The lists of the (at most two) times of day being blended, each with its weight.
	for ( int list = 0; list < 2; list ++ ) {
		float weight = list == 0 ? lunaLampParams[ 7 ].x : lunaLampParams[ 7 ].y;
		if ( weight <= 0.0 ) continue;
		float set = list == 0 ? lunaLampParams[ 7 ].z : lunaLampParams[ 7 ].w;
		int row = cell.y + int( set ) * ${N};
		vec3 part = vec3( 0.0 );
		vec4 ids = texelFetch( lunaLampMaps[ 0 ], ivec2( cell.x * ${P}, row ), 0 );
		for ( int slot = 0; slot < ${F}; slot ++ ) {
			if ( slot > 0 && slot % 4 == 0 ) ids = texelFetch( lunaLampMaps[ 0 ], ivec2( cell.x * ${P} + slot / 4, row ), 0 );
			float id = ids[ slot % 4 ];
			if ( id < 0.0 ) break;
			int index = int( id );
			ivec2 texel = ivec2( ( index % ${I} ) * 3, index / ${I} );
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
		vec4 fill = textureLod( lunaLampMaps[ 2 ], vec2( g.x, ( g.y + set ) / ${R}.0 ), 0.0 );
		// Leaves face every way: half of what a surface turned to the lamp would receive.
		light += weight * ( part * 0.5 + fill.rgb * ( 1.0 - smoothstep( 7.0, 18.0, abs( world.y - fill.a ) ) ) );
	}
	return light;
}
`,$={value:new c},ce={value:new c},le={value:0};function ue(){return fe(),{lunaLampMaps:{value:X},lunaLampParams:{value:Z},lunaRelight:$,lunaRelightB:ce,lunaDayMix:le}}function de(e,t){let n=new S(new Float32Array(e*t*4),e,t,x,E);return n.minFilter=n.magFilter=j,n.generateMipmaps=!1,n.flipY=!1,n.needsUpdate=!0,n}function fe(){if(re)return;let t=m.lights_pars_begin,n=m.lights_fragment_begin,r=`#if defined( RE_IndirectDiffuse )`,i=`vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );`;if(!n.includes(r)||!n.includes(i)||!e.physical?.fragmentShader.includes(`#include <lights_fragment_begin>`))throw Error(`This Three version has different light chunks; the park lamp field cannot be attached`);m.lights_pars_begin=t+ie,m.lights_fragment_begin=n.replace(r,ae+r).replace(i,i+oe),X[0]=de(N*P,N*R),X[1]=de(I*3,96),X[0].image.data.fill(-1),X[0].name=`Park lamp columns`,X[1].name=`Park lamp records`;let a=new Uint16Array(B*B*R*4),o=h.toHalfFloat(-1e3);for(let e=3;e<a.length;e+=4)a[e]=o;X[2]=new S(a,B,B*R,x,l),X[2].name=`Park lamp glow`,X[2].minFilter=X[2].magFilter=f,X[2].generateMipmaps=!1,X[2].flipY=!1,X[2].wrapS=X[2].wrapT=O,X[2].needsUpdate=!0,Q(0,0,0,1/M,0),Q(1,N,N,0,0),Q(2,0,0,1/(B*z),1/(B*z)),Q(5,0,0,0,1),Q(7,1,0,0,0);for(let t of[`physical`,`standard`]){let n=e[t];n.uniforms.lunaLampMaps={value:X},n.uniforms.lunaLampParams={value:Z},n.fragmentShader=`#define LUNA_LAMP_FIELD
`+n.fragmentShader}re=!0}function pe(e,t=G){let n=[],r=new c,i=new c;for(let a of e){let e=a.inputs;if(!(e.intensity>0)||!a.position)continue;let o=e.intensity*2**(e.exposure||0)*H*t,s=e.color||[1,1,1],l=new c().fromArray(a.direction||[0,-1,0]).normalize(),u,d=!1,f=4*Math.PI,p=1,m=0;if(a.type===`SphereLight`)u=o*(e.normalize?.25:Math.PI*(e.radius??.1)**2);else if(a.type===`DiskLight`)u=o*(e.normalize?1:Math.PI*(e.radius??.1)**2),d=!0,f=Math.PI;else if(a.type===`RectLight`){let t=e.width??.1,n=e.height??.1,i=a.sourceMatrix;u=o*(e.normalize?1:t*n),d=!0,f=Math.PI;let s=t>=n?0:1;m=Math.max(t,n),i?r.set(i[s][0],i[s][2],-i[s][1]).normalize():r.set(1,0,0);let c=a.path.startsWith(`/World/Park/`);p=W(Math.ceil(m/(c?3:6)),1,c?10:6)}else continue;let h=-2,g=.5,_=e[`shaping:cone:angle`];if(_!==void 0&&_<175&&!(d&&_>=85)){let t=_*U,n=t*(1-W(e[`shaping:cone:softness`]??0,0,1));h=Math.cos(t),g=Math.max(Math.cos(n)-h,.03),d=!1,f=2*Math.PI*(1-Math.cos((t+n)/2))}i.fromArray(a.position);for(let e=0;e<p;e++){let t=p>1?(e-(p-1)/2)*m/p:0;n.push({x:i.x+r.x*t,y:i.y+r.y*t,z:i.z+r.z*t,r:s[0]*u/p,g:s[1]*u/p,b:s[2]*u/p,ax:l.x,ay:l.y,az:l.z,cosOuter:h,spread:g,lambert:d,solid:f,park:a.path.startsWith(`/World/Park/`)})}}return n}var me=(e,t)=>e.lambert?Math.max(t,0):(e=>e*e*(3-2*e))(W((t-e.cosOuter)/e.spread,0,1));function he(){fe();let e={lamps:0,sources:0,listed:0,columns:0,crowded:0,dropped:0,droppedPark:0,droppedAt:null,buildMs:0,sets:[]},t=new Uint8Array(N*N),n=new Float32Array(N*N*F),r=new Int32Array(N*N*F),i=new Float32Array(B*B*4),a=new Float32Array(B*B),o=Array(R).fill(0),s=0,c=0,l=null,u=[.8,1.5,3,5,8,12],d=(t,n)=>{t>e.dropped&&(e.dropped=t,e.droppedAt=[Math.round(n.x),Math.round(n.y),Math.round(n.z),n.park]),n.park&&t>e.droppedPark&&(e.droppedPark=t)},f=()=>Z[28]>0&&o[Z[30]]>0||Z[29]>0&&o[Z[31]]>0,p=()=>{let t={...e};return delete t.sets,t};function m(m,g,{exposure:_=1,gain:v=G,glow:y=K}={}){if(!(m>=0&&m<R))throw Error(`Lamp list set ${m} does not exist`);let b=performance.now(),x=pe(g,v).slice(0,L),S=X[0].image.data.subarray(m*N*N*F,(m+1)*N*N*F),C=X[1].image.data,w=m*L,T=X[2].image.data.subarray(m*B*B*4,(m+1)*B*B*4),E=h.toHalfFloat;if(t.fill(0),S.fill(-1),i.fill(0),a.fill(0),e.sources=g.length,e.lamps=x.length,e.listed=e.columns=e.crowded=0,e.dropped=e.droppedPark=0,e.droppedAt=null,o[m]=x.length,X[0].needsUpdate=X[1].needsUpdate=X[2].needsUpdate=!0,!x.length){let t=E(-1e3);for(let e=0;e<T.length;e+=4)T[e]=T[e+1]=T[e+2]=0,T[e+3]=t;return Z[3]=+!!f(),e.buildMs=performance.now()-b,e.sets[m]=p(),e}if(!l){let e=1/0,t=-1/0,n=1/0,r=-1/0;for(let i of x)i.park&&(e=Math.min(e,i.x),t=Math.max(t,i.x),n=Math.min(n,i.z),r=Math.max(r,i.z));if(e===1/0)for(let i of x)e=Math.min(e,i.x),t=Math.max(t,i.x),n=Math.min(n,i.z),r=Math.max(r,i.z);l={x:Math.floor(((e+t)/2-N*M/2)/M)*M,z:Math.floor(((n+r)/2-N*M/2)/M)*M,glowX:(e+t)/2-B*z/2,glowZ:(n+r)/2-B*z/2}}let D=l.x,O=l.z,k=l.glowX,A=l.glowZ,j=_*ne;x.forEach((e,o)=>{let s=Math.max(e.r,e.g,e.b),c=W(Math.sqrt(s*j/Y),3,J),l=1/(c*c),f=(w+o)*12;C[f]=e.x,C[f+1]=e.y,C[f+2]=e.z,C[f+3]=l,C[f+4]=e.r,C[f+5]=e.g,C[f+6]=e.b,C[f+7]=e.cosOuter,C[f+8]=e.ax,C[f+9]=e.ay,C[f+10]=e.az,C[f+11]=e.lambert?-1:e.spread;let p=Math.max(0,Math.floor((e.x-c-D)/M)),m=Math.min(255,Math.floor((e.x+c-D)/M)),h=Math.max(0,Math.floor((e.z-c-O)/M)),g=Math.min(255,Math.floor((e.z+c-O)/M)),_=e.ay>.2?1:-1;for(let i=h;i<=g;i++)for(let a=p;a<=m;a++){let c=D+a*M,f=O+i*M,p=W(e.x,c,c+M)-e.x,m=W(e.z,f,f+M)-e.z,h=p*p+m*m;if(h*l>=1)continue;let g=0;for(let t of u){let n=_*t,r=h+n*n,i=r*l;if(i>=1)break;let a=Math.sqrt(Math.max(r,1e-6)),o=(p*e.ax+n*e.ay+m*e.az)/a,c=1-i*i;g=Math.max(g,s*me(e,r<1e-6?1:o)*c*c/Math.max(r,.16))}if(g*j<te)continue;let v=i*N+a,y=v*F,b=t[v],S=b;for(;S>0&&n[y+S-1]<g;)S--;if(S>=F)d(g*j,e);else{b===F&&(d(n[y+F-1]*j,x[r[y+F-1]]),b--);for(let e=b;e>S;e--)n[y+e]=n[y+e-1],r[y+e]=r[y+e-1];n[y+S]=g,r[y+S]=o,t[v]=b+1}}let v=y*e.solid,b=e.y-_*3,S=Math.max(0,Math.floor((e.x-q-k)/z)),T=Math.min(683,Math.ceil((e.x+q-k)/z)),E=Math.max(0,Math.floor((e.z-q-A)/z)),ee=Math.min(683,Math.ceil((e.z+q-A)/z));for(let t=E;t<=ee;t++)for(let n=S;n<=T;n++){let r=k+(n+.5)*z-e.x,o=A+(t+.5)*z-e.z,c=r*r+o*o,l=c/1156;if(l>=1)continue;let u=v*(1-l)*(1-l)/(c+25),d=(t*B+n)*4,f=u*s;i[d]+=e.r*u,i[d+1]+=e.g*u,i[d+2]+=e.b*u,i[d+3]+=f*b,a[t*B+n]+=f}});for(let n=0;n<N*N;n++){let i=t[n];if(i){e.columns++,e.listed+=i,i===F&&e.crowded++;for(let e=0;e<i;e++)S[n*F+e]=w+r[n*F+e]}}for(let e=0,t=0;e<a.length;e++,t+=4){let n=a[e];n?(T[t]=E(Math.min(i[t],6e4)),T[t+1]=E(Math.min(i[t+1],6e4)),T[t+2]=E(Math.min(i[t+2],6e4)),T[t+3]=E(W(i[t+3]/n,-1e3,4e3))):(T[t]=T[t+1]=T[t+2]=0,T[t+3]=E(-1e3))}return s=D,c=O,Q(0,D,O,1/M,+!!f()),Q(2,k,A,1/(B*z),1/(B*z)),e.buildMs=Math.round(performance.now()-b),e.sets[m]=p(),e}function g(e,t,n,r=0){Q(7,Math.max(0,n),Math.max(0,r),e,t),Z[3]=+!!f()}return{stats:e,buildSet:m,blend:g,maps:X,params:Z,setLamps(t,n={}){let r=n.set??0;return m(r,t,n),g(r,r,1,0),e},setHeadlight(e,t,n,r){Q(3,e.x,e.y,e.z,r),Q(4,t.x,t.y,t.z,n)},setFlash(e,t,n,r=14){Q(5,e.x,e.y,e.z,1/(r*r)),Q(6,t.r*n,t.g*n,t.b*n,0)},setAmbient(e,t=[1,1,1],n=null){if($.value.set(1/Math.max(e*t[0],1e-7),1/Math.max(e*t[1],1e-7),1/Math.max(e*t[2],1e-7)),n){let[e,t]=n;ce.value.set(1/Math.max(e*t[0],1e-7),1/Math.max(e*t[1],1e-7),1/Math.max(e*t[2],1e-7))}else ce.value.copy($.value)},sample(e,t,n,r){r.set(0,0,0);let i=Math.floor((e-s)/M),a=Math.floor((n-c)/M);if(!Z[3]||i<0||a<0||i>=N||a>=N)return r;let o=X[0].image.data,l=X[1].image.data;for(let s=0;s<2;s++){let c=Z[28+s];if(!(c>0))continue;let u=(Z[30+s]*N*N+a*N+i)*F;for(let i=0;i<F;i++){let a=o[u+i];if(a<0)break;let s=a*12,d=l[s]-e,f=l[s+1]-t,p=l[s+2]-n,m=d*d+f*f+p*p,h=m*l[s+3];if(h>=1)continue;let g=-(d*l[s+8]+f*l[s+9]+p*l[s+10])/Math.sqrt(Math.max(m,1e-6)),_=l[s+11],v=c*(_<0?Math.max(g,0):(e=>e*e*(3-2*e))(W((g-l[s+7])/_,0,1)))*(1-h*h)**2/Math.max(m,.5)*.5;r.x+=l[s+4]*v,r.y+=l[s+5]*v,r.z+=l[s+6]*v}}return r},setEnabled(e){Z[3]=e&&f()?1:0},dispose(){Z[3]=0,Z[15]=0,Q(6,0,0,0,0)}}}var ge=v({bakeOriginalPlantImpostors:()=>Se}),_e=Object.freeze([`/World/Loop/Meadow/Prototypes/fountain_grass_tall`,`/World/Loop/RepairGroundCover/Prototypes/yew`,`/World/Loop/RepairGroundCover/Prototypes/privet`]),ve=`
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
}`,ye=`
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
}`;function be(e){if(!e)throw TypeError(`The original noon sun direction/color/intensity is required`);let t,n,r;if(e.isDirectionalLight)t=e.getWorldPosition(new c).sub(e.target.getWorldPosition(new c)).normalize(),n=e.color,r=e.intensity;else{let i=e.direction;t=i?.isVector3?i.clone():new c().fromArray(i??[]),n=e.color,r=e.intensity}if(!Number.isFinite(t.lengthSq())||t.lengthSq()===0||!Number.isFinite(r))throw TypeError(`Invalid original noon sun`);let i=new o(n,r);return i.position.copy(t.normalize()).multiplyScalar(20),i.castShadow=r>0,i.shadow.mapSize.set(2048,2048),i.shadow.bias=-2e-5,i.shadow.normalBias=.006,i}function xe(e){let t=e.clone();t.onBeforeCompile=e.onBeforeCompile,t.customProgramCacheKey=function(){return`${e.customProgramCacheKey.call(this)}|original-impostor-bake-no-csm`},t.defines={...e.defines??{}};for(let e of Object.keys(t.defines))(e===`USE_CSM`||e.startsWith(`CSM_`))&&delete t.defines[e];return t.needsUpdate=!0,t}async function Se({renderer:e,originalScene:o,baseScene:m,sun:h,preset:v=`noon`,paths:S=_e,views:E=8,resolution:O=256,maxViewPitchDegrees:M=10,alphaCutoff:N=.35,margin:P=1.08,onProgress:F}={}){if(!e?.isWebGLRenderer||!o?.createPrototypeObject||!m?.isScene)throw TypeError(`Original renderer, scene adapter and lighting scene are required`);if(![`dawn`,`noon`,`night`].includes(v))throw Error(`Unknown source lighting preset`);if(E!==8||!Number.isInteger(O)||O<64||O>1024)throw RangeError(`Use 8 views and a 64–1024px cell`);if(e.capabilities.reversedDepthBuffer)throw Error(`Depth-atlas bake is not yet verified with reversed depth; keep original geometry`);let I=new _(4,2),L=new Map,R=new w(1,1),z=new Set,B=new Set,V={target:e.getRenderTarget(),cubeFace:e.getActiveCubeFace(),mip:e.getActiveMipmapLevel(),viewport:e.getViewport(new d),scissor:e.getScissor(new d),scissorTest:e.getScissorTest(),color:e.getClearColor(new T).clone(),alpha:e.getClearAlpha(),autoClear:e.autoClear,toneMapping:e.toneMapping,shadowEnabled:e.shadowMap.enabled,shadowAuto:e.shadowMap.autoUpdate,shadowNeeds:e.shadowMap.needsUpdate},H=new a;H.environment=m.environment,H.environmentIntensity=m.environmentIntensity,H.environmentRotation.copy(m.environmentRotation);let U=be(h);H.add(U,U.target),m.traverse(e=>{if(e.isHemisphereLight||e.isAmbientLight){let t=e.clone();t.position.copy(e.getWorldPosition(new c)),H.add(t)}});let W=null,G=!1;try{e.autoClear=!1,e.toneMapping=0,e.shadowMap.enabled=!0,e.shadowMap.autoUpdate=!1,e.setClearColor(0,0);for(let n of S){W=o.createPrototypeObject(n);let i=W.bounds,a=i.getCenter(new c),d=i.getSize(new c),m=Math.hypot(d.x,d.y)*.5,h=m*2*P,v=d.z*P,y=Math.max(m*P,.01),b=new k(O*4,O*2,{type:l,format:x,depthBuffer:!0,stencilBuffer:!1,minFilter:A,magFilter:f,generateMipmaps:!0,colorSpace:u});b.texture.name=`Original noon color/alpha ${n}`,b.depthTexture=new ee(b.width,b.height,g),b.depthTexture.minFilter=b.depthTexture.magFilter=j;let w={path:n,target:b,bounds:i.clone(),center:a,width:h,height:v,depthSpan:y*2};L.set(n,w),W.group.traverse(e=>{if(!e.isMesh)return;let t=e=>{let t=xe(e);return B.add(t),t};e.material=Array.isArray(e.material)?e.material.map(t):t(e.material),e.castShadow=e.receiveShadow=!0});let T=new s;T.rotation.x=-Math.PI/2,T.add(W.group),H.add(T);let M=new c(a.x,a.z,-a.y),R=U.position.clone().sub(U.target.position).normalize(),V=Math.max(h,v)*.8,G=V*3;U.target.position.copy(M),U.position.copy(M).addScaledVector(R,G),Object.assign(U.shadow.camera,{left:-V,right:V,bottom:-V,top:V,near:.1,far:G*2}),U.shadow.camera.updateProjectionMatrix(),e.shadowMap.needsUpdate=!0;let K=y*3,q=new D(-h/2,h/2,v/2,-v/2,K-y,K+y);e.setRenderTarget(b),e.setScissorTest(!1),e.clear(!0,!0,!0),e.setScissorTest(!0);for(let t=0;t<E;++t){let r=t/E*Math.PI*2;q.position.copy(M).add(new c(Math.sin(r)*K,0,Math.cos(r)*K)),q.lookAt(M),q.updateMatrixWorld(!0);let i=t%4*O,a=Math.floor(t/4)*O;b.viewport.set(i,a,O,O),b.scissor.set(i,a,O,O),b.scissorTest=!0,e.setRenderTarget(b),e.render(H,q),F?.({path:n,view:t+1,views:E,completedPlants:L.size-1,totalPlants:S.length})}e.setScissorTest(!1),W.dispose(),W=null,H.remove(T),B.forEach(e=>e.dispose()),B.clear();let J=new r({name:`Review-only source impostor ${n}`,glslVersion:p,vertexShader:ve,fragmentShader:ye,toneMapped:!0,fog:!0,side:2,depthWrite:!0,depthTest:!0,uniforms:{...t.clone(C.fog),...ue(),colorAtlas:{value:b.texture},colorAtlasB:{value:b.texture},depthAtlas:{value:b.depthTexture},sourceCenter:{value:a.clone()},captureSize:{value:new _(h,v)},atlasGrid:{value:I.clone()},viewCount:{value:E},depthSpan:{value:y*2},alphaCutoff:{value:N}}});w.material=J,z.add(J),await new Promise(e=>setTimeout(e,0))}G=!0}finally{W?.dispose(),B.forEach(e=>e.dispose()),e.setViewport(V.viewport),e.setScissor(V.scissor),e.setScissorTest(V.scissorTest),e.setClearColor(V.color,V.alpha),e.autoClear=V.autoClear,e.toneMapping=V.toneMapping,e.shadowMap.enabled=V.shadowEnabled,e.shadowMap.autoUpdate=V.shadowAuto,e.shadowMap.needsUpdate=V.shadowNeeds,U.shadow.map?.dispose(),e.setRenderTarget(V.target,V.cubeFace,V.mip),G||(L.forEach(e=>e.target.dispose()),z.forEach(e=>e.dispose()),R.dispose())}let K=new b,q=new c,J=!1,Y={ready:!0,enabled:!1,atlases:L,metadata:{schema:`luna-source-impostor-review-v1`,sourceGeometry:`Exact createPrototypeObject recipes`,preset:v,views:E,resolution:O,color:`Linear HDR source noon shading + alpha`,depth:`Orthographic source depth`,minDistance:`per-source-size; recorded per row in saved cache`,maxViewPitchDegrees:M,defaultEnabled:!1,visuallyValidated:!1,limitations:[`Noon RGB is baked: rotated instances can differ from original world-light response.`,`Eight azimuth samples and depth reprojection do not guarantee continuous-view silhouette/coverage.`,`Source-direction self-shadow is baked; neighbouring ground shadows and normal/albedo relighting are not.`,`Alpha mip coverage, view transitions, reflection and shadow appearance require source A/B review.`]},supports(e){return!J&&L.has(e)},distanceFor(e){let t=L.get(e);return t?Math.max(6,Math.min(28,t.height*2)):240},canUse(e,t,n){let r=L.get(e);if(J||!r)return!1;K.copy(t).invert();let i=Math.tan(y.degToRad(M));for(let e of n)if(q.copy(e).applyMatrix4(K).sub(r.center),Math.abs(q.z)>Math.hypot(q.x,q.y)*i)return!1;return!0},createBatch(e,t){let r=L.get(e);if(J||!r)throw Error(`No baked original plant: ${e}`);let a=new n(R,r.material,t);return a.name=`Review source impostor ${e}`,a.instanceMatrix.setUsage(i),a.castShadow=!1,a.receiveShadow=!1,a.userData.sourcePrototype=e,a.userData.reviewOnly=!0,a},dispose(){J||(J=!0,Y.ready=!1,L.forEach(e=>e.target.dispose()),z.forEach(e=>e.dispose()),R.dispose())}};return Y}export{he as a,G as i,ge as n,le as o,ve as r,ue as s,ye as t};