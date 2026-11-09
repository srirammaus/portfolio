export const sections=[["home",0],["about",.15],["skills",.30],["projects",.50],["integrations",.70],["security",.80],["journal",.85],["contact",.98]];
export function scrollMap(){
  const max=Math.max(1,document.documentElement.scrollHeight-innerHeight);
  const stops=[];
  for(const [id,time] of sections){
    const el=document.getElementById(id);if(!el)continue;
    const y=Math.max(0,el.getBoundingClientRect().top+scrollY-innerHeight*.18);
    if(y<max && (!stops.length||y>stops.at(-1)[0]))stops.push([y,time]);
  }
  if(!stops.length)stops.push([0,0]);
  stops.push([max,1]);
  return y=>{
    const i=stops.findIndex(([end])=>end>=y);
    if(i===0)return 0;if(i<0)return 1;
    const [a,v]=stops[i-1],[b,w]=stops[i];return v+(w-v)*(y-a)/(b-a);
  };
}
