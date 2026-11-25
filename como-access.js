(() => {
  'use strict';
  const official='https://luna-drive.byeoksa.workers.dev';
  const local=['localhost','127.0.0.1','[::1]'].includes(location.hostname);
  const api=(local?location.origin:official)+'/api/como-drone/';
  const card=document.getElementById('comoDrone'),gate=document.getElementById('droneGate');
  const frame=document.getElementById('droneFrame');
  const race=document.getElementById('comoRace');
  if(frame && new URLSearchParams(location.search).get('mode')==='race') frame.name='como-exploration';
  const status=document.getElementById('accessMessage');
  const login=document.getElementById('droneLogin');
  const sessionKey='luna-drive-session-v1';
  let generation=0, shownToken=null;
  const onFile=location.protocol==='file:';
  const link=new URL(onFile?'http://127.0.0.1:8261/index.html':'./index.html',location.href);
  link.searchParams.set('server','wss://luna-drive.byeoksa.workers.dev/api/ws');
  if(login)login.href=link.href;
  function clear(){
    if(frame){frame.removeAttribute('srcdoc');frame.hidden=true;}
    for(const entry of [card,race]) if(entry){entry.hidden=true;entry.style.display='none';}
    if(gate)gate.hidden=false;
    shownToken=null;
  }
  function account(){
    try{return JSON.parse(localStorage.getItem(sessionKey));}catch{return null;}
  }
  function officialPage(){
    const server=new URLSearchParams(location.search).get('server')||document.querySelector('meta[name=luna-lobby]')?.content;
    try{return !!server&&new URL(server).host===new URL(official).host;}catch{return false;}
  }
  // The game records the issuer with a new session. Existing published clients can
  // establish the issuer on their next official sign-in even before their bundle is rebuilt.
  function remember(){
    const member=account();
    if(member?.token&&!member.issuer&&officialPage()){
      try{localStorage.setItem(sessionKey,JSON.stringify({...member,issuer:official}));}catch{}
    }
  }
  async function refresh(){
    const run=++generation,member=account();
    if(onFile||member?.id?.toLowerCase()!=='luna'||!member.token||
       member.issuer!==official){
      clear();
      if(status)status.textContent=onFile?'관리자 로그인을 위해 게임 서버에서 열어 주세요.':'공식 LUNA 관리자 계정으로 로그인해 주세요.';
      return;
    }
    if(shownToken!==member.token)clear();
    let endpoint=api;
    const fetchPart=part=>fetch(endpoint+part,{headers:{Authorization:'Bearer '+member.token},cache:'no-store',redirect:'error'});
    try{
      let auth=await fetchPart('access');
      if(auth.status===404&&local&&location.port==='8261'){
        endpoint='http://127.0.0.1:8279/api/como-drone/';
        auth=await fetchPart('access');
      }
      if(run!==generation)return;
      if(auth.status!==204){
        clear();if(status)status.textContent=auth.status===403?'LUNA 관리자 전용입니다.':auth.status===401?'로그인이 만료되었습니다.':'관리자 서버에 연결할 수 없습니다.';return;
      }
      for(const entry of [card,race]) if(entry){entry.hidden=false;entry.style.display='';}
      if(!frame || shownToken===member.token)return;
      status.textContent='드론 지도를 불러오는 중…';
      const result=await fetchPart('scene');
      if(!result.ok)throw Error('scene');
      const html=await result.text();
      if(run!==generation||account()?.token!==member.token)return;
      frame.srcdoc=html;frame.hidden=false;gate.hidden=true;shownToken=member.token;
    }catch{if(run===generation){clear();if(status)status.textContent='관리자 드론 서버에 연결할 수 없습니다.';}}
  }
  window.addEventListener('storage',e=>{if(e.key===sessionKey||e.key===null)refresh();});
  window.addEventListener('luna-session',()=>{remember();refresh();});
  window.addEventListener('pageshow',e=>{if(e.persisted)refresh();});
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)refresh();});
  if(frame)setInterval(()=>{if(!document.hidden&&shownToken)refresh();},60000);
  refresh();
})();
