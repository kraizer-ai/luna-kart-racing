import{$t as e,An as t,B as n,Ct as r,Dt as i,En as a,Fn as o,Ft as s,It as c,Jt as l,Mn as u,Nn as d,Nt as f,Pt as p,Rt as m,St as h,V as g,Xt as _,dt as v,fn as y,in as b,jn as x,kn as S,lt as C,mt as w,nt as T,pn as E,pt as D,st as O,tt as k,vt as A,xt as j,z as M}from"./kart-BarWNr6_.js";var N=8,P=256,F=3,I=12,L=256,R=8192,z=3,B=3,V=684,H=(.5/V).toFixed(8),U=4/5800,W=Math.PI/180,G=(e,t,n)=>Math.max(t,Math.min(n,e)),K=.3,q=.012,J=34,Y=24,X=.016,ee=.004,te=.16,Z={0:null,1:null,2:null,length:3},Q=new Float32Array(32),$=(e,t,n,r,i)=>{Q[e*4]=t,Q[e*4+1]=n,Q[e*4+2]=r,Q[e*4+3]=i},ne=!1,re=`
#ifdef LUNA_LAMP_FIELD
	uniform highp sampler2D lunaLampMaps[ 3 ];
	uniform vec4 lunaLampParams[ 8 ];
#endif
`,ie=`
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
				int lunaRow = lunaCell.y + int( lunaLampParams[ 7 ].z ) * ${P}, lunaFirst = 0;
				if ( lunaWeight <= 0.0 ) { lunaWeight = lunaLampParams[ 7 ].y; lunaRow = lunaCell.y + int( lunaLampParams[ 7 ].w ) * ${P}; lunaFirst = ${I}; }
				vec4 lunaIds = texelFetch( lunaLampMaps[ 0 ], ivec2( lunaCell.x * ${F}, lunaRow ), 0 );
				for ( int lunaSlot = lunaFirst; lunaSlot < 24; lunaSlot ++ ) {
					int lunaN = lunaSlot < ${I} ? lunaSlot : lunaSlot - ${I};
					if ( lunaSlot == ${I} && lunaFirst == 0 ) {
						if ( lunaLampParams[ 7 ].y <= 0.0 ) break;
						lunaWeight = lunaLampParams[ 7 ].y; lunaRow = lunaCell.y + int( lunaLampParams[ 7 ].w ) * ${P};
						lunaIds = texelFetch( lunaLampMaps[ 0 ], ivec2( lunaCell.x * ${F}, lunaRow ), 0 );
					// Four lamp numbers per texel; the next texel is read only when the list goes on.
					} else if ( lunaN > 0 && lunaN % 4 == 0 ) lunaIds = texelFetch( lunaLampMaps[ 0 ], ivec2( lunaCell.x * ${F} + lunaN / 4, lunaRow ), 0 );
					float lunaId = lunaIds[ lunaN % 4 ];
					if ( lunaId < 0.0 ) { if ( lunaSlot < ${I} ) { lunaSlot = 11; continue; } break; }
					int lunaIndex = int( lunaId );
					ivec2 lunaTexel = ivec2( ( lunaIndex % ${L} ) * 3, lunaIndex / ${L} );
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
				lunaG.y = clamp( lunaG.y, ${H}, 1.0 - ${H} );
				vec4 lunaFill = textureLod( lunaLampMaps[ 2 ], vec2( lunaG.x, ( lunaG.y + lunaLampParams[ 7 ].z ) / ${z}.0 ), 0.0 );
				lunaGlow = lunaFill.rgb * ( lunaLampParams[ 7 ].x * ( 1.0 - smoothstep( 7.0, 18.0, abs( lunaWorld.y - lunaFill.a ) ) ) );
				if ( lunaLampParams[ 7 ].y > 0.0 ) {
					lunaFill = textureLod( lunaLampMaps[ 2 ], vec2( lunaG.x, ( lunaG.y + lunaLampParams[ 7 ].w ) / ${z}.0 ), 0.0 );
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
`,ae=`
	#ifdef LUNA_LAMP_FIELD
		irradiance += lunaGlow;
	#endif
`,oe=`
uniform highp sampler2D lunaLampMaps[ 3 ];
uniform vec4 lunaLampParams[ 8 ];
vec3 lunaLampsOn( vec3 world ) {
	vec3 light = vec3( 0.0 );
	if ( lunaLampParams[ 0 ].w < 0.5 ) return light;
	vec2 at = ( world.xz - lunaLampParams[ 0 ].xy ) * lunaLampParams[ 0 ].z;
	if ( at.x < 0.0 || at.y < 0.0 || at.x >= lunaLampParams[ 1 ].x || at.y >= lunaLampParams[ 1 ].y ) return light;
	ivec2 cell = ivec2( at );
	vec2 g = ( world.xz - lunaLampParams[ 2 ].xy ) * lunaLampParams[ 2 ].zw;
	g.y = clamp( g.y, ${H}, 1.0 - ${H} );
	// The lists of the (at most two) times of day being blended, each with its weight.
	for ( int list = 0; list < 2; list ++ ) {
		float weight = list == 0 ? lunaLampParams[ 7 ].x : lunaLampParams[ 7 ].y;
		if ( weight <= 0.0 ) continue;
		float set = list == 0 ? lunaLampParams[ 7 ].z : lunaLampParams[ 7 ].w;
		int row = cell.y + int( set ) * ${P};
		vec3 part = vec3( 0.0 );
		vec4 ids = texelFetch( lunaLampMaps[ 0 ], ivec2( cell.x * ${F}, row ), 0 );
		for ( int slot = 0; slot < ${I}; slot ++ ) {
			if ( slot > 0 && slot % 4 == 0 ) ids = texelFetch( lunaLampMaps[ 0 ], ivec2( cell.x * ${F} + slot / 4, row ), 0 );
			float id = ids[ slot % 4 ];
			if ( id < 0.0 ) break;
			int index = int( id );
			ivec2 texel = ivec2( ( index % ${L} ) * 3, index / ${L} );
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
		vec4 fill = textureLod( lunaLampMaps[ 2 ], vec2( g.x, ( g.y + set ) / ${z}.0 ), 0.0 );
		// Leaves face every way: half of what a surface turned to the lamp would receive.
		light += weight * ( part * 0.5 + fill.rgb * ( 1.0 - smoothstep( 7.0, 18.0, abs( world.y - fill.a ) ) ) );
	}
	return light;
}
`,se={value:new x},ce={value:new x},le={value:0};function ue(){return fe(),{lunaLampMaps:{value:Z},lunaLampParams:{value:Q},lunaRelight:se,lunaRelightB:ce,lunaDayMix:le}}function de(e,t){let n=new O(new Float32Array(e*t*4),e,t,b,A);return n.minFilter=n.magFilter=l,n.generateMipmaps=!1,n.flipY=!1,n.needsUpdate=!0,n}function fe(){if(ne)return;let e=M.lights_pars_begin,t=M.lights_fragment_begin,i=`#if defined( RE_IndirectDiffuse )`,a=`vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );`;if(!t.includes(i)||!t.includes(a)||!n.physical?.fragmentShader.includes(`#include <lights_fragment_begin>`))throw Error(`This Three version has different light chunks; the park lamp field cannot be attached`);M.lights_pars_begin=e+re,M.lights_fragment_begin=t.replace(i,ie+i).replace(a,a+ae),Z[0]=de(P*F,P*z),Z[1]=de(L*3,96),Z[0].image.data.fill(-1),Z[0].name=`Park lamp columns`,Z[1].name=`Park lamp records`;let o=new Uint16Array(V*V*z*4),s=C.toHalfFloat(-1e3);for(let e=3;e<o.length;e+=4)o[e]=s;Z[2]=new O(o,V,V*z,b,r),Z[2].name=`Park lamp glow`,Z[2].minFilter=Z[2].magFilter=f,Z[2].generateMipmaps=!1,Z[2].flipY=!1,Z[2].wrapS=Z[2].wrapT=k,Z[2].needsUpdate=!0,$(0,0,0,1/N,0),$(1,P,P,0,0),$(2,0,0,1/(V*B),1/(V*B)),$(5,0,0,0,1),$(7,1,0,0,0);for(let e of[`physical`,`standard`]){let t=n[e];t.uniforms.lunaLampMaps={value:Z},t.uniforms.lunaLampParams={value:Q},t.fragmentShader=`#define LUNA_LAMP_FIELD
`+t.fragmentShader}ne=!0}function pe(e,t=K){let n=[],r=new x,i=new x;for(let a of e){let e=a.inputs;if(!(e.intensity>0)||!a.position)continue;let o=e.intensity*2**(e.exposure||0)*U*t,s=e.color||[1,1,1],c=new x().fromArray(a.direction||[0,-1,0]).normalize(),l,u=!1,d=4*Math.PI,f=1,p=0;if(a.type===`SphereLight`)l=o*(e.normalize?.25:Math.PI*(e.radius??.1)**2);else if(a.type===`DiskLight`)l=o*(e.normalize?1:Math.PI*(e.radius??.1)**2),u=!0,d=Math.PI;else if(a.type===`RectLight`){let t=e.width??.1,n=e.height??.1,i=a.sourceMatrix;l=o*(e.normalize?1:t*n),u=!0,d=Math.PI;let s=t>=n?0:1;p=Math.max(t,n),i?r.set(i[s][0],i[s][2],-i[s][1]).normalize():r.set(1,0,0);let c=a.path.startsWith(`/World/Park/`);f=G(Math.ceil(p/(c?3:6)),1,c?10:6)}else continue;let m=-2,h=.5,g=e[`shaping:cone:angle`];if(g!==void 0&&g<175&&!(u&&g>=85)){let t=g*W,n=t*(1-G(e[`shaping:cone:softness`]??0,0,1));m=Math.cos(t),h=Math.max(Math.cos(n)-m,.03),u=!1,d=2*Math.PI*(1-Math.cos((t+n)/2))}i.fromArray(a.position);for(let e=0;e<f;e++){let t=f>1?(e-(f-1)/2)*p/f:0;n.push({x:i.x+r.x*t,y:i.y+r.y*t,z:i.z+r.z*t,r:s[0]*l/f,g:s[1]*l/f,b:s[2]*l/f,ax:c.x,ay:c.y,az:c.z,cosOuter:m,spread:h,lambert:u,solid:d,park:a.path.startsWith(`/World/Park/`)})}}return n}var me=(e,t)=>e.lambert?Math.max(t,0):(e=>e*e*(3-2*e))(G((t-e.cosOuter)/e.spread,0,1));function he(){fe();let e={lamps:0,sources:0,listed:0,columns:0,crowded:0,dropped:0,droppedPark:0,droppedAt:null,buildMs:0,sets:[]},t=new Uint8Array(P*P),n=new Float32Array(P*P*I),r=new Int32Array(P*P*I),i=new Float32Array(V*V*4),a=new Float32Array(V*V),o=Array(z).fill(0),s=0,c=0,l=null,u=[.8,1.5,3,5,8,12],d=(t,n)=>{t>e.dropped&&(e.dropped=t,e.droppedAt=[Math.round(n.x),Math.round(n.y),Math.round(n.z),n.park]),n.park&&t>e.droppedPark&&(e.droppedPark=t)},f=()=>Q[28]>0&&o[Q[30]]>0||Q[29]>0&&o[Q[31]]>0,p=()=>{let t={...e};return delete t.sets,t};function m(m,h,{exposure:g=1,gain:_=K,glow:v=q}={}){if(!(m>=0&&m<z))throw Error(`Lamp list set ${m} does not exist`);let y=performance.now(),b=pe(h,_).slice(0,R),x=Z[0].image.data.subarray(m*P*P*I,(m+1)*P*P*I),S=Z[1].image.data,w=m*R,T=Z[2].image.data.subarray(m*V*V*4,(m+1)*V*V*4),E=C.toHalfFloat;if(t.fill(0),x.fill(-1),i.fill(0),a.fill(0),e.sources=h.length,e.lamps=b.length,e.listed=e.columns=e.crowded=0,e.dropped=e.droppedPark=0,e.droppedAt=null,o[m]=b.length,Z[0].needsUpdate=Z[1].needsUpdate=Z[2].needsUpdate=!0,!b.length){let t=E(-1e3);for(let e=0;e<T.length;e+=4)T[e]=T[e+1]=T[e+2]=0,T[e+3]=t;return Q[3]=+!!f(),e.buildMs=performance.now()-y,e.sets[m]=p(),e}if(!l){let e=1/0,t=-1/0,n=1/0,r=-1/0;for(let i of b)i.park&&(e=Math.min(e,i.x),t=Math.max(t,i.x),n=Math.min(n,i.z),r=Math.max(r,i.z));if(e===1/0)for(let i of b)e=Math.min(e,i.x),t=Math.max(t,i.x),n=Math.min(n,i.z),r=Math.max(r,i.z);l={x:Math.floor(((e+t)/2-P*N/2)/N)*N,z:Math.floor(((n+r)/2-P*N/2)/N)*N,glowX:(e+t)/2-V*B/2,glowZ:(n+r)/2-V*B/2}}let D=l.x,O=l.z,k=l.glowX,A=l.glowZ,j=g*te;b.forEach((e,o)=>{let s=Math.max(e.r,e.g,e.b),c=G(Math.sqrt(s*j/X),3,Y),l=1/(c*c),f=(w+o)*12;S[f]=e.x,S[f+1]=e.y,S[f+2]=e.z,S[f+3]=l,S[f+4]=e.r,S[f+5]=e.g,S[f+6]=e.b,S[f+7]=e.cosOuter,S[f+8]=e.ax,S[f+9]=e.ay,S[f+10]=e.az,S[f+11]=e.lambert?-1:e.spread;let p=Math.max(0,Math.floor((e.x-c-D)/N)),m=Math.min(255,Math.floor((e.x+c-D)/N)),h=Math.max(0,Math.floor((e.z-c-O)/N)),g=Math.min(255,Math.floor((e.z+c-O)/N)),_=e.ay>.2?1:-1;for(let i=h;i<=g;i++)for(let a=p;a<=m;a++){let c=D+a*N,f=O+i*N,p=G(e.x,c,c+N)-e.x,m=G(e.z,f,f+N)-e.z,h=p*p+m*m;if(h*l>=1)continue;let g=0;for(let t of u){let n=_*t,r=h+n*n,i=r*l;if(i>=1)break;let a=Math.sqrt(Math.max(r,1e-6)),o=(p*e.ax+n*e.ay+m*e.az)/a,c=1-i*i;g=Math.max(g,s*me(e,r<1e-6?1:o)*c*c/Math.max(r,.16))}if(g*j<ee)continue;let v=i*P+a,y=v*I,x=t[v],S=x;for(;S>0&&n[y+S-1]<g;)S--;if(S>=I)d(g*j,e);else{x===I&&(d(n[y+I-1]*j,b[r[y+I-1]]),x--);for(let e=x;e>S;e--)n[y+e]=n[y+e-1],r[y+e]=r[y+e-1];n[y+S]=g,r[y+S]=o,t[v]=x+1}}let y=v*e.solid,x=e.y-_*3,C=Math.max(0,Math.floor((e.x-J-k)/B)),T=Math.min(683,Math.ceil((e.x+J-k)/B)),E=Math.max(0,Math.floor((e.z-J-A)/B)),M=Math.min(683,Math.ceil((e.z+J-A)/B));for(let t=E;t<=M;t++)for(let n=C;n<=T;n++){let r=k+(n+.5)*B-e.x,o=A+(t+.5)*B-e.z,c=r*r+o*o,l=c/1156;if(l>=1)continue;let u=y*(1-l)*(1-l)/(c+25),d=(t*V+n)*4,f=u*s;i[d]+=e.r*u,i[d+1]+=e.g*u,i[d+2]+=e.b*u,i[d+3]+=f*x,a[t*V+n]+=f}});for(let n=0;n<P*P;n++){let i=t[n];if(i){e.columns++,e.listed+=i,i===I&&e.crowded++;for(let e=0;e<i;e++)x[n*I+e]=w+r[n*I+e]}}for(let e=0,t=0;e<a.length;e++,t+=4){let n=a[e];n?(T[t]=E(Math.min(i[t],6e4)),T[t+1]=E(Math.min(i[t+1],6e4)),T[t+2]=E(Math.min(i[t+2],6e4)),T[t+3]=E(G(i[t+3]/n,-1e3,4e3))):(T[t]=T[t+1]=T[t+2]=0,T[t+3]=E(-1e3))}return s=D,c=O,$(0,D,O,1/N,+!!f()),$(2,k,A,1/(V*B),1/(V*B)),e.buildMs=Math.round(performance.now()-y),e.sets[m]=p(),e}function h(e,t,n,r=0){$(7,Math.max(0,n),Math.max(0,r),e,t),Q[3]=+!!f()}return{stats:e,buildSet:m,blend:h,maps:Z,params:Q,setLamps(t,n={}){let r=n.set??0;return m(r,t,n),h(r,r,1,0),e},setHeadlight(e,t,n,r){$(3,e.x,e.y,e.z,r),$(4,t.x,t.y,t.z,n)},setFlash(e,t,n,r=14){$(5,e.x,e.y,e.z,1/(r*r)),$(6,t.r*n,t.g*n,t.b*n,0)},setAmbient(e,t=[1,1,1],n=null){if(se.value.set(1/Math.max(e*t[0],1e-7),1/Math.max(e*t[1],1e-7),1/Math.max(e*t[2],1e-7)),n){let[e,t]=n;ce.value.set(1/Math.max(e*t[0],1e-7),1/Math.max(e*t[1],1e-7),1/Math.max(e*t[2],1e-7))}else ce.value.copy(se.value)},sample(e,t,n,r){r.set(0,0,0);let i=Math.floor((e-s)/N),a=Math.floor((n-c)/N);if(!Q[3]||i<0||a<0||i>=P||a>=P)return r;let o=Z[0].image.data,l=Z[1].image.data;for(let s=0;s<2;s++){let c=Q[28+s];if(!(c>0))continue;let u=(Q[30+s]*P*P+a*P+i)*I;for(let i=0;i<I;i++){let a=o[u+i];if(a<0)break;let s=a*12,d=l[s]-e,f=l[s+1]-t,p=l[s+2]-n,m=d*d+f*f+p*p,h=m*l[s+3];if(h>=1)continue;let g=-(d*l[s+8]+f*l[s+9]+p*l[s+10])/Math.sqrt(Math.max(m,1e-6)),_=l[s+11],v=c*(_<0?Math.max(g,0):(e=>e*e*(3-2*e))(G((g-l[s+7])/_,0,1)))*(1-h*h)**2/Math.max(m,.5)*.5;r.x+=l[s+4]*v,r.y+=l[s+5]*v,r.z+=l[s+6]*v}}return r},setEnabled(e){Q[3]=e&&f()?1:0},dispose(){Q[3]=0,Q[15]=0,$(6,0,0,0,0)}}}var ge=o({bakeOriginalPlantImpostors:()=>Se}),_e=Object.freeze([`/World/Loop/Meadow/Prototypes/fountain_grass_tall`,`/World/Loop/RepairGroundCover/Prototypes/yew`,`/World/Loop/RepairGroundCover/Prototypes/privet`]),ve=`
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
${oe}
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
}`;function be(e){if(!e)throw TypeError(`The original noon sun direction/color/intensity is required`);let t,n,r;if(e.isDirectionalLight)t=e.getWorldPosition(new x).sub(e.target.getWorldPosition(new x)).normalize(),n=e.color,r=e.intensity;else{let i=e.direction;t=i?.isVector3?i.clone():new x().fromArray(i??[]),n=e.color,r=e.intensity}if(!Number.isFinite(t.lengthSq())||t.lengthSq()===0||!Number.isFinite(r))throw TypeError(`Invalid original noon sun`);let i=new D(n,r);return i.position.copy(t.normalize()).multiplyScalar(20),i.castShadow=r>0,i.shadow.mapSize.set(2048,2048),i.shadow.bias=-2e-5,i.shadow.normalBias=.006,i}function xe(e){let t=e.clone();t.onBeforeCompile=e.onBeforeCompile,t.customProgramCacheKey=function(){return`${e.customProgramCacheKey.call(this)}|original-impostor-bake-no-csm`},t.defines={...e.defines??{}};for(let e of Object.keys(t.defines))(e===`USE_CSM`||e.startsWith(`CSM_`))&&delete t.defines[e];return t.needsUpdate=!0,t}async function Se({renderer:n,originalScene:o,baseScene:C,sun:D,preset:O=`noon`,paths:k=_e,views:A=8,resolution:M=256,maxViewPitchDegrees:N=10,alphaCutoff:P=.35,margin:F=1.08,onProgress:I}={}){if(!n?.isWebGLRenderer||!o?.createPrototypeObject||!C?.isScene)throw TypeError(`Original renderer, scene adapter and lighting scene are required`);if(![`dawn`,`noon`,`night`].includes(O))throw Error(`Unknown source lighting preset`);if(A!==8||!Number.isInteger(M)||M<64||M>1024)throw RangeError(`Use 8 views and a 64–1024px cell`);if(n.capabilities.reversedDepthBuffer)throw Error(`Depth-atlas bake is not yet verified with reversed depth; keep original geometry`);let L=new t(4,2),R=new Map,z=new e(1,1),B=new Set,V=new Set,H={target:n.getRenderTarget(),cubeFace:n.getActiveCubeFace(),mip:n.getActiveMipmapLevel(),viewport:n.getViewport(new u),scissor:n.getScissor(new u),scissorTest:n.getScissorTest(),color:n.getClearColor(new T).clone(),alpha:n.getClearAlpha(),autoClear:n.autoClear,toneMapping:n.toneMapping,shadowEnabled:n.shadowMap.enabled,shadowAuto:n.shadowMap.autoUpdate,shadowNeeds:n.shadowMap.needsUpdate},U=new y;U.environment=C.environment,U.environmentIntensity=C.environmentIntensity,U.environmentRotation.copy(C.environmentRotation);let W=be(D);U.add(W,W.target),C.traverse(e=>{if(e.isHemisphereLight||e.isAmbientLight){let t=e.clone();t.position.copy(e.getWorldPosition(new x)),U.add(t)}});let G=null,K=!1;try{n.autoClear=!1,n.toneMapping=0,n.shadowMap.enabled=!0,n.shadowMap.autoUpdate=!1,n.setClearColor(0,0);for(let e of k){G=o.createPrototypeObject(e);let i=G.bounds,c=i.getCenter(new x),u=i.getSize(new x),m=Math.hypot(u.x,u.y)*.5,y=m*2*F,C=u.z*F,w=Math.max(m*F,.01),T=new d(M*4,M*2,{type:r,format:b,depthBuffer:!0,stencilBuffer:!1,minFilter:p,magFilter:f,generateMipmaps:!0,colorSpace:s});T.texture.name=`Original noon color/alpha ${e}`,T.depthTexture=new v(T.width,T.height,S),T.depthTexture.minFilter=T.depthTexture.magFilter=l;let D={path:e,target:T,bounds:i.clone(),center:c,width:y,height:C,depthSpan:w*2};R.set(e,D),G.group.traverse(e=>{if(!e.isMesh)return;let t=e=>{let t=xe(e);return V.add(t),t};e.material=Array.isArray(e.material)?e.material.map(t):t(e.material),e.castShadow=e.receiveShadow=!0});let O=new h;O.rotation.x=-Math.PI/2,O.add(G.group),U.add(O);let N=new x(c.x,c.z,-c.y),z=W.position.clone().sub(W.target.position).normalize(),H=Math.max(y,C)*.8,K=H*3;W.target.position.copy(N),W.position.copy(N).addScaledVector(z,K),Object.assign(W.shadow.camera,{left:-H,right:H,bottom:-H,top:H,near:.1,far:K*2}),W.shadow.camera.updateProjectionMatrix(),n.shadowMap.needsUpdate=!0;let q=w*3,J=new _(-y/2,y/2,C/2,-C/2,q-w,q+w);n.setRenderTarget(T),n.setScissorTest(!1),n.clear(!0,!0,!0),n.setScissorTest(!0);for(let t=0;t<A;++t){let r=t/A*Math.PI*2;J.position.copy(N).add(new x(Math.sin(r)*q,0,Math.cos(r)*q)),J.lookAt(N),J.updateMatrixWorld(!0);let i=t%4*M,a=Math.floor(t/4)*M;T.viewport.set(i,a,M,M),T.scissor.set(i,a,M,M),T.scissorTest=!0,n.setRenderTarget(T),n.render(U,J),I?.({path:e,view:t+1,views:A,completedPlants:R.size-1,totalPlants:k.length})}n.setScissorTest(!1),G.dispose(),G=null,U.remove(O),V.forEach(e=>e.dispose()),V.clear();let Y=new E({name:`Review-only source impostor ${e}`,glslVersion:j,vertexShader:ve,fragmentShader:ye,toneMapped:!0,fog:!0,side:2,depthWrite:!0,depthTest:!0,uniforms:{...a.clone(g.fog),...ue(),colorAtlas:{value:T.texture},colorAtlasB:{value:T.texture},depthAtlas:{value:T.depthTexture},sourceCenter:{value:c.clone()},captureSize:{value:new t(y,C)},atlasGrid:{value:L.clone()},viewCount:{value:A},depthSpan:{value:w*2},alphaCutoff:{value:P}}});D.material=Y,B.add(Y),await new Promise(e=>setTimeout(e,0))}K=!0}finally{G?.dispose(),V.forEach(e=>e.dispose()),n.setViewport(H.viewport),n.setScissor(H.scissor),n.setScissorTest(H.scissorTest),n.setClearColor(H.color,H.alpha),n.autoClear=H.autoClear,n.toneMapping=H.toneMapping,n.shadowMap.enabled=H.shadowEnabled,n.shadowMap.autoUpdate=H.shadowAuto,n.shadowMap.needsUpdate=H.shadowNeeds,W.shadow.map?.dispose(),n.setRenderTarget(H.target,H.cubeFace,H.mip),K||(R.forEach(e=>e.target.dispose()),B.forEach(e=>e.dispose()),z.dispose())}let q=new m,J=new x,Y=!1,X={ready:!0,enabled:!1,atlases:R,metadata:{schema:`luna-source-impostor-review-v1`,sourceGeometry:`Exact createPrototypeObject recipes`,preset:O,views:A,resolution:M,color:`Linear HDR source noon shading + alpha`,depth:`Orthographic source depth`,minDistance:`per-source-size; recorded per row in saved cache`,maxViewPitchDegrees:N,defaultEnabled:!1,visuallyValidated:!1,limitations:[`Noon RGB is baked: rotated instances can differ from original world-light response.`,`Eight azimuth samples and depth reprojection do not guarantee continuous-view silhouette/coverage.`,`Source-direction self-shadow is baked; neighbouring ground shadows and normal/albedo relighting are not.`,`Alpha mip coverage, view transitions, reflection and shadow appearance require source A/B review.`]},supports(e){return!Y&&R.has(e)},distanceFor(e){let t=R.get(e);return t?Math.max(6,Math.min(28,t.height*2)):240},canUse(e,t,n){let r=R.get(e);if(Y||!r)return!1;q.copy(t).invert();let i=Math.tan(c.degToRad(N));for(let e of n)if(J.copy(e).applyMatrix4(q).sub(r.center),Math.abs(J.z)>Math.hypot(J.x,J.y)*i)return!1;return!0},createBatch(e,t){let n=R.get(e);if(Y||!n)throw Error(`No baked original plant: ${e}`);let r=new i(z,n.material,t);return r.name=`Review source impostor ${e}`,r.instanceMatrix.setUsage(w),r.castShadow=!1,r.receiveShadow=!1,r.userData.sourcePrototype=e,r.userData.reviewOnly=!0,r},dispose(){Y||(Y=!0,X.ready=!1,R.forEach(e=>e.target.dispose()),B.forEach(e=>e.dispose()),z.dispose())}};return X}export{he as a,K as i,ge as n,le as o,ve as r,ue as s,ye as t};