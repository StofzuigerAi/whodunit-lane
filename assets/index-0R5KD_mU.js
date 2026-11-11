var Iu=Object.defineProperty;var Du=(i,e,t)=>e in i?Iu(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var rt=(i,e,t)=>Du(i,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();async function Nu(i,e){try{const t=await e(`${i}assets.json`);if(!t.ok)return{};const n=await t.json(),s=n&&typeof n=="object"&&n.assets&&typeof n.assets=="object"?n.assets:n,r={};for(const[a,o]of Object.entries(s??{}))o&&typeof o.src=="string"&&(r[a]=o);return r}catch{return{}}}const zo=i=>`vloer.${i.toLowerCase()}`,Cr=i=>`voorwerp.${i}`,Uu={n:0,e:90,s:180,w:270,ne:45,se:135,sw:225,nw:315},Fu=new Set(["not-in-room","not-on-object","row-not","col-not","not-beside-person","kind-empty","subgroup-not-on"]);function Ou(i){const e=i.type,t=Fu.has(e),n=i.params,s=r=>({iconKey:`icoon.pijl.${r}`,glyph:"arrow",angle:Uu[r],negated:t});switch(e){case"west-of":return s("w");case"east-of":return s("e");case"north-of":return s("n");case"south-of":return s("s");case"quad-of":return s(String(n.quad));case"row-is":case"row-not":case"same-row-as":return{iconKey:"icoon.rij",glyph:"row",negated:t};case"col-is":case"col-not":case"same-col-as":case"col-band":return{iconKey:"icoon.kolom",glyph:"col",negated:t};case"corner":return{iconKey:"icoon.hoek",glyph:"corner",negated:t};case"in-room":case"not-in-room":case"in-rooms":case"in-room-class":case"room-count":case"empty-rooms":case"extreme-in-room":case"room-people-count-unique":case"subgroup-in-rooms":case"attr-count-in-room":return{iconKey:"icoon.kamer",glyph:"tile",negated:t};case"on-object":case"not-on-object":case"only-on-kind":case"on-kind-count":case"kind-empty":case"subgroup-not-on":return{iconKey:"icoon.voorwerp",glyph:"tile",negated:t};case"beside-object":case"beside-object-dir":case"beside-kind-count":case"object-in-line":return{iconKey:"icoon.naast.voorwerp",glyph:"tile",negated:t};case"beside-person":case"not-beside-person":return{iconKey:"icoon.naast.persoon",glyph:"tile",negated:t};case"with-persons":case"pair-alone-in-room":return{iconKey:"icoon.samen",glyph:"tile",negated:t};case"alone-in-room":case"victim-alone-with-culprit":case"only-attr-in-room":return{iconKey:"icoon.alleen",glyph:"tile",negated:t};case"line-distance":case"count-beyond":return{iconKey:"icoon.afstand",glyph:"tile",negated:t};default:return{iconKey:"icoon.vraag",glyph:"tile",negated:t}}}const Ho=i=>i.text.replace(/\.\s*$/,""),Bu=".",li=(i,e)=>`${i},${e}`;function ku(i){const e=new Map,t=new Set;for(const n of i.furniture)e.set(li(n.r,n.c),n.kind),n.blocking&&t.add(li(n.r,n.c));return{rows:i.rows,cols:i.cols,map:i.map,roomKeys:Object.keys(i.rooms),furniture:e,blocking:t,loot:{r:i.loot.r,c:i.loot.c},lootRoom:i.loot.room,roomOf:(n,s)=>i.map[n]?.[s]??"",isCell:(n,s)=>n>=0&&n<i.rows&&s>=0&&s<i.cols&&i.map[n]?.[s]!==Bu&&i.map[n]?.[s]!==void 0,roomLabel:n=>i.rooms[n]??n,roomClassOf:n=>i.roomClasses?.[n]??null,hasRoomClasses:!!i.roomClasses,_cache:new Map}}const zu={n:[-1,0],s:[1,0],w:[0,-1],e:[0,1]},Rl=[[-1,0],[1,0],[0,-1],[0,1]];function Hu(i,e,t){const n=`nk:${e},${t}`,s=i._cache.get(n);if(s)return s;const r=new Set,a=i.roomOf(e,t);for(const[o,c]of Rl){const u=e+o,l=t+c;if(u<0||u>=i.rows||l<0||l>=i.cols||i.roomOf(u,l)!==a)continue;const h=i.furniture.get(li(u,l));h&&r.add(h)}return i._cache.set(n,r),r}function Vu(i,e,t){const n=i.roomOf(e,t),s=(u,l)=>u<0||u>=i.rows||l<0||l>=i.cols||i.roomOf(u,l)!==n,r=s(e-1,t),a=s(e+1,t),o=s(e,t-1),c=s(e,t+1);return(r||a)&&(o||c)&&(r&&o||r&&c||a&&o||a&&c)}function Gu(i,e,t){const n=e.r<t.r,s=e.r>t.r,r=e.c>t.c,a=e.c<t.c;return i==="ne"?n&&r:i==="nw"?n&&a:i==="se"?s&&r:s&&a}function Wu({axis:i,k:e,side:t},n,s){return i==="row"?t==="s"?n.r===s.r+e:n.r===s.r-e:t==="e"?n.c===s.c+e:n.c===s.c-e}function Vo(i,e,t){return Math.abs(e.r-t.r)+Math.abs(e.c-t.c)===1&&i.roomOf(e.r,e.c)===i.roomOf(t.r,t.c)}function Xu(i,e,t,n){const[s,r]=zu[n],a=e+s,o=t+r;return a<0||a>=i.rows||o<0||o>=i.cols||i.roomOf(a,o)!==i.roomOf(e,t)?null:i.furniture.get(li(a,o))??null}function $u(i,e,t,n){let s=0;const r=i.roomOf(e,t);for(const[a,o]of Rl){const c=e+a,u=t+o;c<0||c>=i.rows||u<0||u>=i.cols||i.roomOf(c,u)===r&&i.furniture.get(li(c,u))===n&&s++}return s}function qu(i,e,t,n,s,r){const a=r?i.roomOf(e,t):"",o=s==="row"?i.cols:i.rows;for(let c=0;c<o;c++){const u=s==="row"?e:c,l=s==="row"?c:t;if(i.furniture.get(li(u,l))===n&&!(r&&i.roomOf(u,l)!==a))return!0}return!1}const tn=(i,e)=>i.furniture.get(li(e.r,e.c)),$e=(i,e)=>i.roomOf(e.r,e.c),Yu=i=>Array.from({length:i},(e,t)=>t),ii=i=>i.flatMap((e,t)=>e?[{cell:e,i:t}]:[]),wt=(i,e)=>({deps:t=>[t.params.s],holds:(t,n,s)=>i(t,n[t.params.s],s),needs:e}),mn=i=>({deps:e=>[e.params.s,e.params.t],holds:(e,t,n)=>i(e,t[e.params.s],t[e.params.t],n)}),Wt=(i,e,t)=>({deps:(n,s)=>Yu(s),holds:i,refute:e,needs:t}),Cs=(i,e)=>ii(i).filter(t=>t.i!==e),Cl={"in-room":wt((i,e,{model:t})=>$e(t,e)===i.params.room),"not-in-room":wt((i,e,{model:t})=>$e(t,e)!==i.params.room),"on-object":wt((i,e,{model:t})=>tn(t,e)===i.params.kind),"not-on-object":wt((i,e,{model:t})=>tn(t,e)!==i.params.kind),"beside-object":wt((i,e,{model:t})=>Hu(t,e.r,e.c).has(i.params.kind)),"beside-object-dir":wt((i,e,{model:t})=>Xu(t,e.r,e.c,i.params.dir)===i.params.kind),"beside-kind-count":wt((i,e,{model:t})=>$u(t,e.r,e.c,i.params.kind)===i.params.k),"object-in-line":wt((i,e,{model:t})=>qu(t,e.r,e.c,i.params.kind,i.params.axis,i.params.sameRoom)),corner:wt((i,e,{model:t})=>Vu(t,e.r,e.c)),"row-is":wt((i,e)=>e.r===i.params.k),"row-not":wt((i,e)=>e.r!==i.params.k),"col-is":wt((i,e)=>e.c===i.params.k),"col-not":wt((i,e)=>e.c!==i.params.k),"col-band":wt((i,e)=>e.c>=i.params.cMin&&e.c<=i.params.cMax),"in-rooms":wt((i,e,{model:t})=>i.params.rooms.includes($e(t,e))),"in-room-class":wt((i,e,{model:t})=>t.roomClassOf($e(t,e))===i.params.roomClass,({model:i})=>i.hasRoomClasses),"west-of":mn((i,e,t)=>e.c<t.c),"east-of":mn((i,e,t)=>e.c>t.c),"north-of":mn((i,e,t)=>e.r<t.r),"south-of":mn((i,e,t)=>e.r>t.r),"same-row-as":mn((i,e,t)=>e.r===t.r),"same-col-as":mn((i,e,t)=>e.c===t.c),"beside-person":mn((i,e,t,{model:n})=>Vo(n,e,t)),"not-beside-person":mn((i,e,t,{model:n})=>!Vo(n,e,t)),"quad-of":mn((i,e,t)=>Gu(i.params.quad,e,t)),"line-distance":mn((i,e,t)=>Wu(i.params,e,t)),"with-persons":{deps:i=>[i.params.s,...i.params.targets],holds:(i,e,{model:t})=>{const n=$e(t,e[i.params.s]);return i.params.targets.every(s=>$e(t,e[s])===n)}},"subgroup-not-on":{deps:i=>i.params.targets,holds:(i,e,{model:t})=>i.params.targets.every(n=>tn(t,e[n])!==i.params.kind)},"subgroup-in-rooms":{deps:i=>i.params.targets,holds:(i,e,{model:t})=>i.params.targets.every(n=>i.params.rooms.includes($e(t,e[n])))},"alone-in-room":Wt((i,e,{model:t})=>{const n=$e(t,e[i.params.s]);return e.every((s,r)=>r===i.params.s||$e(t,s)!==n)},(i,e,{model:t})=>{const n=e[i.params.s];return!!n&&Cs(e,i.params.s).some(s=>$e(t,s.cell)===$e(t,n))}),"pair-alone-in-room":Wt((i,e,{model:t})=>{const{s:n,t:s}=i.params,r=$e(t,e[n]);return $e(t,e[s])!==r?!1:e.every((a,o)=>o===n||o===s||$e(t,a)!==r)},(i,e,{model:t})=>{const{s:n,t:s}=i.params,r=e[n],a=e[s];if(r&&a&&$e(t,r)!==$e(t,a))return!0;const o=r??a;return o?ii(e).some(c=>c.i!==n&&c.i!==s&&$e(t,c.cell)===$e(t,o)):!1}),"empty-rooms":Wt((i,e,{model:t})=>t.roomKeys.length-new Set(e.map(n=>$e(t,n))).size===i.params.k,(i,e,{model:t})=>new Set(ii(e).map(n=>$e(t,n.cell))).size>t.roomKeys.length-i.params.k),"on-kind-count":Wt((i,e,{model:t})=>e.filter(n=>tn(t,n)===i.params.kind).length===i.params.k,(i,e,{model:t})=>ii(e).filter(n=>tn(t,n.cell)===i.params.kind).length>i.params.k),"only-on-kind":Wt((i,e,{model:t})=>{const{s:n,kind:s}=i.params;return tn(t,e[n])!==s?!1:e.every((r,a)=>a===n||tn(t,r)!==s)},(i,e,{model:t})=>{const{s:n,kind:s}=i.params,r=e[n];return r&&tn(t,r)!==s?!0:Cs(e,n).some(a=>tn(t,a.cell)===s)}),"kind-empty":Wt((i,e,{model:t})=>e.every(n=>tn(t,n)!==i.params.kind),(i,e,{model:t})=>ii(e).some(n=>tn(t,n.cell)===i.params.kind)),"room-count":Wt((i,e,{model:t})=>e.filter(n=>$e(t,n)===i.params.room).length===i.params.k,(i,e,{model:t})=>ii(e).filter(n=>$e(t,n.cell)===i.params.room).length>i.params.k),"extreme-in-room":Wt((i,e,{model:t})=>{const{s:n,room:s,dir:r}=i.params,a=e[n];return $e(t,a)!==s?!1:e.every((o,c)=>c===n||$e(t,o)!==s?!0:r==="n"?o.r>=a.r:r==="s"?o.r<=a.r:r==="e"?o.c<=a.c:o.c>=a.c)},(i,e,{model:t})=>{const n=e[i.params.s];return!!n&&$e(t,n)!==i.params.room}),"count-beyond":Wt((i,e)=>{const{s:t,dir:n,k:s}=i.params,r=e[t];return e.filter((o,c)=>c===t?!1:n==="n"?o.r<r.r:n==="s"?o.r>r.r:n==="e"?o.c>r.c:o.c<r.c).length===s},(i,e)=>{const{s:t,dir:n,k:s}=i.params,r=e[t];return r?Cs(e,t).filter(({cell:o})=>n==="n"?o.r<r.r:n==="s"?o.r>r.r:n==="e"?o.c>r.c:o.c<r.c).length>s:!1}),"room-people-count-unique":Wt((i,e,{model:t})=>{const n=new Map(t.roomKeys.map(s=>[s,0]));for(const s of e)n.set($e(t,s),(n.get($e(t,s))??0)+1);return new Set(n.values()).size===t.roomKeys.length}),"attr-count-in-room":Wt((i,e,{model:t,cast:n})=>{if(!n)return!1;const{room:s,attr:r,k:a}=i.params;return e.filter((o,c)=>n[c]?.[r.key]===r.value&&$e(t,o)===s).length===a},(i,e,{model:t,cast:n})=>{if(!n)return!1;const{room:s,attr:r,k:a}=i.params;return ii(e).filter(o=>n[o.i]?.[r.key]===r.value&&$e(t,o.cell)===s).length>a},({cast:i})=>!!i),"only-attr-in-room":Wt((i,e,{model:t,cast:n})=>{if(!n)return!1;const{s,room:r,attr:a}=i.params;return n[s]?.[a.key]!==a.value||$e(t,e[s])!==r?!1:e.every((o,c)=>c===s||n[c]?.[a.key]!==a.value||$e(t,o)!==r)},(i,e,{model:t,cast:n})=>{if(!n)return!1;const{s,room:r,attr:a}=i.params;if(n[s]?.[a.key]!==a.value)return!0;const o=e[s];return o&&$e(t,o)!==r?!0:Cs(e,s).some(c=>n[c.i]?.[a.key]===a.value&&$e(t,c.cell)===r)},({cast:i})=>!!i),"victim-alone-with-culprit":Wt((i,e,{model:t})=>{const n=i.params.s,s=$e(t,e[n]);return e.filter((r,a)=>a!==n&&$e(t,r)===s).length===1})};function Pl(i,e,t){const n=Cl[i.type];return!n||n.needs&&!n.needs(t)?"unknown":n.deps(i,e.length).every(r=>e[r])?n.holds(i,e,t)?"true":"false":n.refute&&n.refute(i,e,t)?"false":"unknown"}function Ku(i,e,t){return i.map(n=>Pl(n,e,t))}function es(i){const e=i.params,t=[];return Number.isInteger(e.s)&&t.push(e.s),Number.isInteger(e.t)&&t.push(e.t),Array.isArray(e.targets)&&t.push(...e.targets),[...new Set(t)]}function ar(i,e,t,n){if(!i.isCell(n.r,n.c))return{ok:!1,reason:"void"};if(i.blocking.has(`${n.r},${n.c}`))return{ok:!1,reason:"blocked"};for(let s=0;s<e.length;s++){const r=e[s];if(!(s===t||!r)){if(r.r===n.r)return{ok:!1,reason:"row",with:s};if(r.c===n.c)return{ok:!1,reason:"col",with:s}}}return{ok:!0}}function Go(i,e,t){const n=i.slice();return n[e]=t?{r:t.r,c:t.c}:null,n}const Wo=(i,e,t)=>i.findIndex(n=>n&&n.r===e&&n.c===t),Xo=i=>i.every(e=>e!==null);function ju(i,e,t){const n=e.length===i.cells.length&&i.cells.every((r,a)=>e[a]&&e[a].r===r.r&&e[a].c===r.c),s=t===i.falseClueNo;return{cellsRight:n,liarRight:s,solved:n&&s}}const Pr=i=>i.map(e=>e?`${e.r}.${e.c}`:"-").join("|");function Zu(i,e){return i.filter(t=>{const n=Cl[t.type];if(!n)return!1;const s=n.deps(t,99);return s.length===1&&s[0]===e})}function Ju(i,e,t,n,s,r){const o=Zu(e,i).filter(l=>l.no!==r.lieNo).filter(l=>!l.statement||!(r.pair??[]).includes(l.no)),c=[],u=new Set;for(let l=0;l<n.rows;l++)for(let h=0;h<n.cols;h++){if(!ar(n,t,i,{r:l,c:h}).ok)continue;const d=t.map(()=>null);d[i]={r:l,c:h};const f=o.filter(m=>Pl(m,d,s)==="false"),g=f.some(m=>!m.statement);(r.hard?!g&&f.length<=1:f.length===0)&&c.push({r:l,c:h})}return o.forEach(l=>u.add(l.no)),{cells:c,cards:[...u].sort((l,h)=>l-h)}}function Qu(i,e){if(i.lieHelp)return i.lieHelp;const t=i.difficulty??e.puzzle.difficulty;return t==="easy"?"told":t==="medium"?"pair":"none"}function $o(i){const e=i.solution.falseClueNo,t=i.coach?.refutations??[],s=t.find(r=>r.scope==="statement"&&r.clue!==e&&r.outcome==="contradiction"&&(r.cited??[]).includes(e))?.clue??t.find(r=>r.outcome==="contradiction"&&r.clue&&r.clue!==e)?.clue;return Number.isInteger(s)?[Math.min(e,s),Math.max(e,s)]:null}const Ll="data/cases/liar/";async function Il(i,e){try{const t=await i(e);return t.ok?await t.json():null}catch{return null}}function eh(i){return!!i?.puzzle&&Array.isArray(i.puzzle.clues)&&Array.isArray(i.puzzle.suspects)&&Array.isArray(i.solution?.cells)&&Number.isInteger(i.solution?.falseClueNo)}function th(i,e){const t=i.filter(n=>n.date&&!n.practice).sort((n,s)=>n.date.localeCompare(s.date));return t.length?t.find(n=>n.date===e)??[...t].reverse().find(n=>n.date<=e)??t[0]:null}async function nh(i,e){const t=await Il(e,`${i}${Ll}index.json`);return(Array.isArray(t)?t:Array.isArray(t?.cases)?t.cases:[]).filter(s=>s&&typeof s.file=="string")}async function Lr(i,e,t){const n=await Il(e,`${i}${Ll}${t.file}`);return!n||!eh(n)?null:{key:t.file,kind:t.practice?"practice":"daily",date:t.date??null,data:n,lieHelp:Qu(t,n)}}async function ih(i,e,t){const n=await nh(i,e),s=th(n,t),r=s?await Lr(i,e,s):null,a=n.filter(c=>c.practice),o=[];for(const c of a){const u=await Lr(i,e,c);u&&o.push(u)}if(!o.length){const c=await Lr(i,e,{file:"sample.json",practice:!0});c&&o.push(c)}return{daily:r,practice:o}}const sh=["text","line","say","hint","tip","message","step"],rh=["steps","lines","tips","hints","items"];function Ps(i){if(typeof i=="string")return i.trim()?{levels:[i.trim()]}:null;if(!i||typeof i!="object")return null;const e=i,t=sh.find(a=>typeof e[a]=="string"&&e[a].trim());if(!t)return null;const n={levels:[String(e[t]).trim()]},s=e.suspect??e.who??e.suspectId,r=e.cell??e.at??e.to;return Number.isInteger(s)&&r&&Number.isInteger(r.r)&&Number.isInteger(r.c)&&(n.suspect=s,n.cell={r:r.r,c:r.c}),n}const qo=i=>i.length===1?`card ${i[0]}`:`cards ${i.join(", ")}`,ah=(i,e)=>i.map(t=>e[t]??`suspect ${t+1}`).join(" and ");function oh(i){return!!i&&typeof i=="object"&&Array.isArray(i.steps)&&i.steps.some(e=>e&&typeof e.technique=="string")}function ch(i,e){const t=[];let n=[];for(const s of i.steps){if(s.technique!=="place"||!s.cell||!Number.isInteger(s.person)){n.push(s);continue}const r=e[s.person]??`suspect ${s.person+1}`,a=[...new Set([...n.flatMap(c=>c.uses??[]),...s.uses??[]])].sort((c,u)=>c-u),o=[];for(const c of n)c.technique==="pair"&&Array.isArray(c.people)?o.push(`${qo(c.uses??[])} together rule squares out for ${ah(c.people.map(u=>u.person),e)}.`):c.technique==="crossing"&&Number.isInteger(c.person)?o.push(`${e[c.person]??"One suspect"} can only stand on a few squares in a line, so no one else can use that line.`):c.technique==="line-person"&&o.push(`In ${c.axis==="r"?"row":"column"} ${(c.index??0)+1} only one suspect still fits.`);o.push(`Cross out the rows and columns already taken: ${r} is left with one square.`),t.push({levels:[a.length?`Where does ${r} go? Read ${qo(a)}.`:`Where does ${r} go? Look at the cards that name ${r}.`,o.join(" "),`Put ${r} on row ${s.cell.r+1}, column ${s.cell.c+1}.`],suspect:s.person,cell:{r:s.cell.r,c:s.cell.c},uses:a}),n=[]}return t}function Dl(i,e=[]){if(i==null)return[];if(oh(i))return ch(i,e);if(Array.isArray(i))return i.map(Ps).filter(t=>!!t);if(typeof i=="string")return Ps(i)?[Ps(i)]:[];if(typeof i=="object"){const t=i;for(const s of rh)if(Array.isArray(t[s]))return Dl(t[s],e);const n=Ps(t);return n?[n]:[]}return[]}function lh(i,e,t){for(let n=0;n<i.length;n++){const s=i[n],r=s.suspect!==void 0&&s.cell!==void 0;if(!(r?!!e[s.suspect]&&e[s.suspect].r===s.cell.r&&e[s.suspect].c===s.cell.c:n<t))return{step:s,index:n,total:i.length,manual:!r}}return null}function uh(i){const e=i.placement.filter(Boolean).length,t=i.placement.length,n=i.verdicts.flatMap((s,r)=>s==="false"?[r]:[]);if(e===0){const s=i.clues.find(r=>(r.type==="col-is"||r.type==="row-is")&&Number.isInteger(r.params.s));return s?`Try card ${s.no}: put ${i.suspectNames[s.params.s]} in ${s.type==="col-is"?"column":"row"} ${s.params.k+1}. One card lies, so this is only a first guess.`:"Start with any card that names a spot, drag that suspect onto the board, and watch the cards react."}if(n.length>1&&i.liar===null)return`${n.length} cards are crossed out. Only one card can be a lie, so at least one suspect is on the wrong square. Move the suspect named on the most crossed-out cards.`;if(n.length===1&&i.liar===null){const s=i.clues[n[0]];return e===t?`Only card ${s.no} is crossed out. If everything else fits, that card is the lie: stamp it.`:`Card ${s.no} is crossed out. It is either the lie or a sign that someone stands on the wrong square. Keep placing and see if it stays alone.`}if(n.length>0&&i.liar!==null)return"A crossed-out card besides your stamped lie means a suspect is on the wrong square. Move someone named on that card.";if(e<t){const s=i.placement.findIndex(r=>!r);return`${i.suspectNames[s]} is still off the board. Look for a card that mentions ${i.suspectNames[s]} and use the row and column rule to narrow the spots.`}return i.liar===null?"Everyone is placed and nothing is crossed out. One witness still lied: stamp the card you think is the lie.":"Looks complete. Press Solve to file the case."}const Yo=[[-1,0],[1,0],[0,-1],[0,1]],hh=[[-1,-1],[-1,1],[1,-1],[1,1]],dh={bram:{dirs:Yo,throughWalls:!1},mina:{dirs:Yo,throughWalls:!0},rue:{dirs:hh,throughWalls:!1}},fh=["bram","mina","rue"],Ko={bram:"Sir Bram",mina:"Mina",rue:"Rue"},ph={bram:"Sees in straight lines",mina:"Sees through walls",rue:"Sees only diagonally"};function mh(i,e,t){const n=dh[t],s=i.roomOf(e.r,e.c),r=[];for(const[a,o]of n.dirs){let c=e.r+a,u=e.c+o;for(;i.isCell(c,u)&&!(!n.throughWalls&&i.roomOf(c,u)!==s||(r.push({r:c,c:u}),i.blocking.has(`${c},${u}`)));)c+=a,u+=o}return r}const Ls=(i,e)=>e??fh[i]??null,Nl="whodunit-lane:v1",Is=3,ts=()=>({v:1,settings:{theme:"auto",help:"guided"},streak:{count:0,best:0,lastDate:null},cases:{},coachStep:{}});function gh(i){if(!i)return ts();try{const e=i.getItem(Nl);if(!e)return ts();const t=JSON.parse(e);if(!t||t.v!==1)return ts();const n=ts();return{v:1,settings:{...n.settings,...t.settings??{}},streak:{...n.streak,...t.streak??{}},cases:t.cases??{},coachStep:t.coachStep??{}}}catch{return ts()}}function _h(i,e){if(!i)return!1;try{return i.setItem(Nl,JSON.stringify(e)),!0}catch{return!1}}const vh=i=>({placement:Array.from({length:i},()=>null),liar:null,checksUsed:0,attempts:0,activeMs:0,solved:!1});function xh(i,e,t){const n=i.cases[e];return!n||n.placement.length!==t?vh(t):n}function Ul(i){const[e,t,n]=i.split("-").map(Number),s=new Date(Date.UTC(e,t-1,n));return s.setUTCDate(s.getUTCDate()-1),s.toISOString().slice(0,10)}function Mh(i=new Date){const e=t=>String(t).padStart(2,"0");return`${i.getFullYear()}-${e(i.getMonth()+1)}-${e(i.getDate())}`}function yh(i,e){if(i.lastDate===e)return i;const t=i.lastDate===Ul(e)?i.count+1:1;return{count:t,best:Math.max(i.best,t),lastDate:e}}function Sh(i,e){return i.lastDate&&(i.lastDate===e||i.lastDate===Ul(e))?i.count:0}function Fl(i){const e=Math.max(0,Math.round(i/1e3)),t=Math.floor(e/60),n=e%60;return`${t}:${String(n).padStart(2,"0")}`}function Eh(i){const e=[`Whodunit Lane ${i.practice?"practice case":i.date}`,`Case solved in ${Fl(i.ms)} (${i.difficulty}), ${i.attempts<=1?"first try":`${i.attempts} tries`}.`];return!i.practice&&i.streak>0&&e.push(`Streak: ${i.streak} day${i.streak===1?"":"s"}`),e.push(i.url),e.join(`
`)}const Ol=i=>i.replace(/[&<>"]/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[e]);function Th(i){const e='stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"';let t="";switch(i.glyph){case"arrow":t=`<g transform="rotate(${i.angle??0} 20 20)"><path d="M20 33V8M10 17l10-10 10 10" ${e}/></g>`;break;case"row":t=[0,1,2,3,4].map(s=>`<rect x="${3+s*7.4}" y="15" width="6" height="10" rx="1.5" ${s===2?'fill="currentColor"':'fill="none" stroke="currentColor" stroke-width="2"'}/>`).join("");break;case"col":t=[0,1,2,3,4].map(s=>`<rect x="15" y="${3+s*7.4}" width="10" height="6" rx="1.5" ${s===2?'fill="currentColor"':'fill="none" stroke="currentColor" stroke-width="2"'}/>`).join("");break;case"corner":t=`<path d="M8 32V8h24" ${e}/><circle cx="15" cy="15" r="3.5" fill="currentColor"/>`;break;default:{const s='stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"',r=(c,u,l=4.5)=>`<circle cx="${c}" cy="${u}" r="${l}" fill="currentColor"/>`,a=(c,u,l,h)=>`<rect x="${c}" y="${u}" width="${l}" height="${h}" rx="4" fill="none" ${s}/>`;t={"icoon.kamer":`<path d="M6 34V9h28v25M6 34h9M25 34h9" ${s} fill="none"/>${r(20,21)}`,"icoon.voorwerp":`${a(7,12,26,20)}${r(20,22)}`,"icoon.naast.voorwerp":`${a(4,12,15,16)}${r(29,20)}`,"icoon.naast.persoon":`${r(12,20,5.5)}${r(28,20,5.5)}`,"icoon.samen":`${r(15,20,6.5)}${r(25,20,6.5)}`,"icoon.alleen":`${a(5,5,30,30)}${r(20,20,6)}`,"icoon.afstand":`${r(7,20,4)}${r(33,20,4)}<path d="M13 20h14M16 16l-4 4 4 4M24 16l4 4-4 4" ${s} fill="none"/>`}[i.iconKey]??`<circle cx="20" cy="20" r="14" fill="none" ${s}/><path d="M15 16a5 5 0 1 1 7 4.5c-1.5.8-2 1.8-2 3.5" ${s} fill="none"/>${r(20,29,1.8)}`}}const n=i.negated?'<path d="M6 34L34 6" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" opacity=".9"/><path d="M8.5 36.5L36.5 8.5" stroke="var(--card-bg)" stroke-width="1.5" stroke-linecap="round"/>':"";return`<svg viewBox="0 0 40 40" width="38" height="38" aria-hidden="true" focusable="false" data-key="${Ol(i.iconKey)}">${t}${n}</svg>`}function bh(i,e){const t=e[i.iconKey];if(t){const n=i.negated?'<span class="neg" aria-hidden="true"></span>':"";return`<span class="img"><img src="${Ol(t.src)}" alt="" width="38" height="38" draggable="false">${n}</span>`}return Th(i)}/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const fo="178",wh=0,jo=1,Ah=2,Bl=1,kl=2,Rn=3,Nn=0,Ct=1,_n=2,Xn=0,Ii=1,Zo=2,Jo=3,Qo=4,Rh=5,ai=100,Ch=101,Ph=102,Lh=103,Ih=104,Dh=200,Nh=201,Uh=202,Fh=203,va=204,xa=205,Oh=206,Bh=207,kh=208,zh=209,Hh=210,Vh=211,Gh=212,Wh=213,Xh=214,Ma=0,ya=1,Sa=2,Fi=3,Ea=4,Ta=5,ba=6,wa=7,zl=0,$h=1,qh=2,$n=0,Yh=1,Kh=2,jh=3,Aa=4,Zh=5,Jh=6,Qh=7,ec="attached",ed="detached",Hl=300,Oi=301,Bi=302,Ra=303,Ca=304,Sr=306,ki=1e3,Wn=1001,gr=1002,Ot=1003,Vl=1004,ds=1005,qt=1006,or=1007,Pn=1008,xn=1009,Gl=1010,Wl=1011,_s=1012,po=1013,ui=1014,ln=1015,bs=1016,mo=1017,go=1018,vs=1020,Xl=35902,$l=1021,ql=1022,Qt=1023,xs=1026,Ms=1027,_o=1028,vo=1029,Yl=1030,xo=1031,Mo=1033,cr=33776,lr=33777,ur=33778,hr=33779,Pa=35840,La=35841,Ia=35842,Da=35843,Na=36196,Ua=37492,Fa=37496,Oa=37808,Ba=37809,ka=37810,za=37811,Ha=37812,Va=37813,Ga=37814,Wa=37815,Xa=37816,$a=37817,qa=37818,Ya=37819,Ka=37820,ja=37821,dr=36492,Za=36494,Ja=36495,Kl=36283,Qa=36284,eo=36285,to=36286,ys=2300,Ss=2301,Ir=2302,tc=2400,nc=2401,ic=2402,td=2500,nd=0,jl=1,no=2,id=3200,sd=3201,Zl=0,rd=1,Gn="",yt="srgb",kt="srgb-linear",_r="linear",at="srgb",fi=7680,sc=519,ad=512,od=513,cd=514,Jl=515,ld=516,ud=517,hd=518,dd=519,io=35044,rc="300 es",Ln=2e3,vr=2001;class qi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const s=n[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const At=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let ac=1234567;const ps=Math.PI/180,zi=180/Math.PI;function un(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(At[i&255]+At[i>>8&255]+At[i>>16&255]+At[i>>24&255]+"-"+At[e&255]+At[e>>8&255]+"-"+At[e>>16&15|64]+At[e>>24&255]+"-"+At[t&63|128]+At[t>>8&255]+"-"+At[t>>16&255]+At[t>>24&255]+At[n&255]+At[n>>8&255]+At[n>>16&255]+At[n>>24&255]).toLowerCase()}function He(i,e,t){return Math.max(e,Math.min(t,i))}function yo(i,e){return(i%e+e)%e}function fd(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function pd(i,e,t){return i!==e?(t-i)/(e-i):0}function ms(i,e,t){return(1-t)*i+t*e}function md(i,e,t,n){return ms(i,e,1-Math.exp(-t*n))}function gd(i,e=1){return e-Math.abs(yo(i,e*2)-e)}function _d(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function vd(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function xd(i,e){return i+Math.floor(Math.random()*(e-i+1))}function Md(i,e){return i+Math.random()*(e-i)}function yd(i){return i*(.5-Math.random())}function Sd(i){i!==void 0&&(ac=i);let e=ac+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Ed(i){return i*ps}function Td(i){return i*zi}function bd(i){return(i&i-1)===0&&i!==0}function wd(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Ad(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Rd(i,e,t,n,s){const r=Math.cos,a=Math.sin,o=r(t/2),c=a(t/2),u=r((e+n)/2),l=a((e+n)/2),h=r((e-n)/2),d=a((e-n)/2),f=r((n-e)/2),g=a((n-e)/2);switch(s){case"XYX":i.set(o*l,c*h,c*d,o*u);break;case"YZY":i.set(c*d,o*l,c*h,o*u);break;case"ZXZ":i.set(c*h,c*d,o*l,o*u);break;case"XZX":i.set(o*l,c*g,c*f,o*u);break;case"YXY":i.set(c*f,o*l,c*g,o*u);break;case"ZYZ":i.set(c*g,c*f,o*l,o*u);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function on(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function nt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Cd={DEG2RAD:ps,RAD2DEG:zi,generateUUID:un,clamp:He,euclideanModulo:yo,mapLinear:fd,inverseLerp:pd,lerp:ms,damp:md,pingpong:gd,smoothstep:_d,smootherstep:vd,randInt:xd,randFloat:Md,randFloatSpread:yd,seededRandom:Sd,degToRad:Ed,radToDeg:Td,isPowerOfTwo:bd,ceilPowerOfTwo:wd,floorPowerOfTwo:Ad,setQuaternionFromProperEuler:Rd,normalize:nt,denormalize:on};class Ne{constructor(e=0,t=0){Ne.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=He(this.x,e.x,t.x),this.y=He(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=He(this.x,e,t),this.y=He(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(He(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(He(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Yn{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let c=n[s+0],u=n[s+1],l=n[s+2],h=n[s+3];const d=r[a+0],f=r[a+1],g=r[a+2],_=r[a+3];if(o===0){e[t+0]=c,e[t+1]=u,e[t+2]=l,e[t+3]=h;return}if(o===1){e[t+0]=d,e[t+1]=f,e[t+2]=g,e[t+3]=_;return}if(h!==_||c!==d||u!==f||l!==g){let m=1-o;const p=c*d+u*f+l*g+h*_,E=p>=0?1:-1,b=1-p*p;if(b>Number.EPSILON){const P=Math.sqrt(b),R=Math.atan2(P,p*E);m=Math.sin(m*R)/P,o=Math.sin(o*R)/P}const x=o*E;if(c=c*m+d*x,u=u*m+f*x,l=l*m+g*x,h=h*m+_*x,m===1-o){const P=1/Math.sqrt(c*c+u*u+l*l+h*h);c*=P,u*=P,l*=P,h*=P}}e[t]=c,e[t+1]=u,e[t+2]=l,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,s,r,a){const o=n[s],c=n[s+1],u=n[s+2],l=n[s+3],h=r[a],d=r[a+1],f=r[a+2],g=r[a+3];return e[t]=o*g+l*h+c*f-u*d,e[t+1]=c*g+l*d+u*h-o*f,e[t+2]=u*g+l*f+o*d-c*h,e[t+3]=l*g-o*h-c*d-u*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,c=Math.sin,u=o(n/2),l=o(s/2),h=o(r/2),d=c(n/2),f=c(s/2),g=c(r/2);switch(a){case"XYZ":this._x=d*l*h+u*f*g,this._y=u*f*h-d*l*g,this._z=u*l*g+d*f*h,this._w=u*l*h-d*f*g;break;case"YXZ":this._x=d*l*h+u*f*g,this._y=u*f*h-d*l*g,this._z=u*l*g-d*f*h,this._w=u*l*h+d*f*g;break;case"ZXY":this._x=d*l*h-u*f*g,this._y=u*f*h+d*l*g,this._z=u*l*g+d*f*h,this._w=u*l*h-d*f*g;break;case"ZYX":this._x=d*l*h-u*f*g,this._y=u*f*h+d*l*g,this._z=u*l*g-d*f*h,this._w=u*l*h+d*f*g;break;case"YZX":this._x=d*l*h+u*f*g,this._y=u*f*h+d*l*g,this._z=u*l*g-d*f*h,this._w=u*l*h-d*f*g;break;case"XZY":this._x=d*l*h-u*f*g,this._y=u*f*h-d*l*g,this._z=u*l*g+d*f*h,this._w=u*l*h+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],c=t[9],u=t[2],l=t[6],h=t[10],d=n+o+h;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(l-c)*f,this._y=(r-u)*f,this._z=(a-s)*f}else if(n>o&&n>h){const f=2*Math.sqrt(1+n-o-h);this._w=(l-c)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+u)/f}else if(o>h){const f=2*Math.sqrt(1+o-n-h);this._w=(r-u)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(c+l)/f}else{const f=2*Math.sqrt(1+h-n-o);this._w=(a-s)/f,this._x=(r+u)/f,this._y=(c+l)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(He(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,c=t._y,u=t._z,l=t._w;return this._x=n*l+a*o+s*u-r*c,this._y=s*l+a*c+r*o-n*u,this._z=r*l+a*u+n*c-s*o,this._w=a*l-n*o-s*c-r*u,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,s=this._y,r=this._z,a=this._w;let o=a*e._w+n*e._x+s*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;const c=1-o*o;if(c<=Number.EPSILON){const f=1-t;return this._w=f*a+t*this._w,this._x=f*n+t*this._x,this._y=f*s+t*this._y,this._z=f*r+t*this._z,this.normalize(),this}const u=Math.sqrt(c),l=Math.atan2(u,o),h=Math.sin((1-t)*l)/u,d=Math.sin(t*l)/u;return this._w=a*h+this._w*d,this._x=n*h+this._x*d,this._y=s*h+this._y*d,this._z=r*h+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class N{constructor(e=0,t=0,n=0){N.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(oc.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(oc.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,c=e.w,u=2*(a*s-o*n),l=2*(o*t-r*s),h=2*(r*n-a*t);return this.x=t+c*u+a*h-o*l,this.y=n+c*l+o*u-r*h,this.z=s+c*h+r*l-a*u,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=He(this.x,e.x,t.x),this.y=He(this.y,e.y,t.y),this.z=He(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=He(this.x,e,t),this.y=He(this.y,e,t),this.z=He(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(He(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,c=t.z;return this.x=s*c-r*o,this.y=r*a-n*c,this.z=n*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Dr.copy(this).projectOnVector(e),this.sub(Dr)}reflect(e){return this.sub(Dr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(He(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Dr=new N,oc=new Yn;class Fe{constructor(e,t,n,s,r,a,o,c,u){Fe.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,c,u)}set(e,t,n,s,r,a,o,c,u){const l=this.elements;return l[0]=e,l[1]=s,l[2]=o,l[3]=t,l[4]=r,l[5]=c,l[6]=n,l[7]=a,l[8]=u,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],c=n[6],u=n[1],l=n[4],h=n[7],d=n[2],f=n[5],g=n[8],_=s[0],m=s[3],p=s[6],E=s[1],b=s[4],x=s[7],P=s[2],R=s[5],w=s[8];return r[0]=a*_+o*E+c*P,r[3]=a*m+o*b+c*R,r[6]=a*p+o*x+c*w,r[1]=u*_+l*E+h*P,r[4]=u*m+l*b+h*R,r[7]=u*p+l*x+h*w,r[2]=d*_+f*E+g*P,r[5]=d*m+f*b+g*R,r[8]=d*p+f*x+g*w,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],u=e[7],l=e[8];return t*a*l-t*o*u-n*r*l+n*o*c+s*r*u-s*a*c}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],u=e[7],l=e[8],h=l*a-o*u,d=o*c-l*r,f=u*r-a*c,g=t*h+n*d+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=h*_,e[1]=(s*u-l*n)*_,e[2]=(o*n-s*a)*_,e[3]=d*_,e[4]=(l*t-s*c)*_,e[5]=(s*r-o*t)*_,e[6]=f*_,e[7]=(n*c-u*t)*_,e[8]=(a*t-n*r)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){const c=Math.cos(r),u=Math.sin(r);return this.set(n*c,n*u,-n*(c*a+u*o)+a+e,-s*u,s*c,-s*(-u*a+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Nr.makeScale(e,t)),this}rotate(e){return this.premultiply(Nr.makeRotation(-e)),this}translate(e,t){return this.premultiply(Nr.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Nr=new Fe;function Ql(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Es(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Pd(){const i=Es("canvas");return i.style.display="block",i}const cc={};function Di(i){i in cc||(cc[i]=!0,console.warn(i))}function Ld(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}function Id(i){const e=i.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function Dd(i){const e=i.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const lc=new Fe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),uc=new Fe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Nd(){const i={enabled:!0,workingColorSpace:kt,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===at&&(s.r=Dn(s.r),s.g=Dn(s.g),s.b=Dn(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===at&&(s.r=Ni(s.r),s.g=Ni(s.g),s.b=Ni(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Gn?_r:this.spaces[s].transfer},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Di("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Di("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[kt]:{primaries:e,whitePoint:n,transfer:_r,toXYZ:lc,fromXYZ:uc,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:yt},outputColorSpaceConfig:{drawingBufferColorSpace:yt}},[yt]:{primaries:e,whitePoint:n,transfer:at,toXYZ:lc,fromXYZ:uc,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:yt}}}),i}const Ye=Nd();function Dn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Ni(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let pi;class Ud{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{pi===void 0&&(pi=Es("canvas")),pi.width=e.width,pi.height=e.height;const s=pi.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=pi}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Es("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Dn(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Dn(t[n]/255)*255):t[n]=Dn(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Fd=0;class So{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Fd++}),this.uuid=un(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Ur(s[a].image)):r.push(Ur(s[a]))}else r=Ur(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function Ur(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Ud.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Od=0;const Fr=new N;class St extends qi{constructor(e=St.DEFAULT_IMAGE,t=St.DEFAULT_MAPPING,n=Wn,s=Wn,r=qt,a=Pn,o=Qt,c=xn,u=St.DEFAULT_ANISOTROPY,l=Gn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Od++}),this.uuid=un(),this.name="",this.source=new So(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=u,this.format=o,this.internalFormat=null,this.type=c,this.offset=new Ne(0,0),this.repeat=new Ne(1,1),this.center=new Ne(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Fe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=l,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Fr).x}get height(){return this.source.getSize(Fr).y}get depth(){return this.source.getSize(Fr).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Hl)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ki:e.x=e.x-Math.floor(e.x);break;case Wn:e.x=e.x<0?0:1;break;case gr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ki:e.y=e.y-Math.floor(e.y);break;case Wn:e.y=e.y<0?0:1;break;case gr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}St.DEFAULT_IMAGE=null;St.DEFAULT_MAPPING=Hl;St.DEFAULT_ANISOTROPY=1;class Qe{constructor(e=0,t=0,n=0,s=1){Qe.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const c=e.elements,u=c[0],l=c[4],h=c[8],d=c[1],f=c[5],g=c[9],_=c[2],m=c[6],p=c[10];if(Math.abs(l-d)<.01&&Math.abs(h-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(l+d)<.1&&Math.abs(h+_)<.1&&Math.abs(g+m)<.1&&Math.abs(u+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const b=(u+1)/2,x=(f+1)/2,P=(p+1)/2,R=(l+d)/4,w=(h+_)/4,A=(g+m)/4;return b>x&&b>P?b<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(b),s=R/n,r=w/n):x>P?x<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(x),n=R/s,r=A/s):P<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(P),n=w/r,s=A/r),this.set(n,s,r,t),this}let E=Math.sqrt((m-g)*(m-g)+(h-_)*(h-_)+(d-l)*(d-l));return Math.abs(E)<.001&&(E=1),this.x=(m-g)/E,this.y=(h-_)/E,this.z=(d-l)/E,this.w=Math.acos((u+f+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=He(this.x,e.x,t.x),this.y=He(this.y,e.y,t.y),this.z=He(this.z,e.z,t.z),this.w=He(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=He(this.x,e,t),this.y=He(this.y,e,t),this.z=He(this.z,e,t),this.w=He(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(He(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Bd extends qi{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:qt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Qe(0,0,e,t),this.scissorTest=!1,this.viewport=new Qe(0,0,e,t);const s={width:e,height:t,depth:n.depth},r=new St(s);this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:qt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new So(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class hi extends Bd{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class eu extends St{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Ot,this.minFilter=Ot,this.wrapR=Wn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class kd extends St{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Ot,this.minFilter=Ot,this.wrapR=Wn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class hn{constructor(e=new N(1/0,1/0,1/0),t=new N(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(nn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(nn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=nn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,nn):nn.fromBufferAttribute(r,a),nn.applyMatrix4(e.matrixWorld),this.expandByPoint(nn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ds.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ds.copy(n.boundingBox)),Ds.applyMatrix4(e.matrixWorld),this.union(Ds)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,nn),nn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ns),Ns.subVectors(this.max,ns),mi.subVectors(e.a,ns),gi.subVectors(e.b,ns),_i.subVectors(e.c,ns),Fn.subVectors(gi,mi),On.subVectors(_i,gi),jn.subVectors(mi,_i);let t=[0,-Fn.z,Fn.y,0,-On.z,On.y,0,-jn.z,jn.y,Fn.z,0,-Fn.x,On.z,0,-On.x,jn.z,0,-jn.x,-Fn.y,Fn.x,0,-On.y,On.x,0,-jn.y,jn.x,0];return!Or(t,mi,gi,_i,Ns)||(t=[1,0,0,0,1,0,0,0,1],!Or(t,mi,gi,_i,Ns))?!1:(Us.crossVectors(Fn,On),t=[Us.x,Us.y,Us.z],Or(t,mi,gi,_i,Ns))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,nn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(nn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Sn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Sn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Sn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Sn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Sn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Sn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Sn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Sn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Sn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Sn=[new N,new N,new N,new N,new N,new N,new N,new N],nn=new N,Ds=new hn,mi=new N,gi=new N,_i=new N,Fn=new N,On=new N,jn=new N,ns=new N,Ns=new N,Us=new N,Zn=new N;function Or(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){Zn.fromArray(i,r);const o=s.x*Math.abs(Zn.x)+s.y*Math.abs(Zn.y)+s.z*Math.abs(Zn.z),c=e.dot(Zn),u=t.dot(Zn),l=n.dot(Zn);if(Math.max(-Math.max(c,u,l),Math.min(c,u,l))>o)return!1}return!0}const zd=new hn,is=new N,Br=new N;class yn{constructor(e=new N,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):zd.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;is.subVectors(e,this.center);const t=is.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(is,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Br.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(is.copy(e.center).add(Br)),this.expandByPoint(is.copy(e.center).sub(Br))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const En=new N,kr=new N,Fs=new N,Bn=new N,zr=new N,Os=new N,Hr=new N;class Er{constructor(e=new N,t=new N(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,En)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=En.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(En.copy(this.origin).addScaledVector(this.direction,t),En.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){kr.copy(e).add(t).multiplyScalar(.5),Fs.copy(t).sub(e).normalize(),Bn.copy(this.origin).sub(kr);const r=e.distanceTo(t)*.5,a=-this.direction.dot(Fs),o=Bn.dot(this.direction),c=-Bn.dot(Fs),u=Bn.lengthSq(),l=Math.abs(1-a*a);let h,d,f,g;if(l>0)if(h=a*c-o,d=a*o-c,g=r*l,h>=0)if(d>=-g)if(d<=g){const _=1/l;h*=_,d*=_,f=h*(h+a*d+2*o)+d*(a*h+d+2*c)+u}else d=r,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*c)+u;else d=-r,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*c)+u;else d<=-g?(h=Math.max(0,-(-a*r+o)),d=h>0?-r:Math.min(Math.max(-r,-c),r),f=-h*h+d*(d+2*c)+u):d<=g?(h=0,d=Math.min(Math.max(-r,-c),r),f=d*(d+2*c)+u):(h=Math.max(0,-(a*r+o)),d=h>0?r:Math.min(Math.max(-r,-c),r),f=-h*h+d*(d+2*c)+u);else d=a>0?-r:r,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*c)+u;return n&&n.copy(this.origin).addScaledVector(this.direction,h),s&&s.copy(kr).addScaledVector(Fs,d),f}intersectSphere(e,t){En.subVectors(e.center,this.origin);const n=En.dot(this.direction),s=En.dot(En)-n*n,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,c;const u=1/this.direction.x,l=1/this.direction.y,h=1/this.direction.z,d=this.origin;return u>=0?(n=(e.min.x-d.x)*u,s=(e.max.x-d.x)*u):(n=(e.max.x-d.x)*u,s=(e.min.x-d.x)*u),l>=0?(r=(e.min.y-d.y)*l,a=(e.max.y-d.y)*l):(r=(e.max.y-d.y)*l,a=(e.min.y-d.y)*l),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),h>=0?(o=(e.min.z-d.z)*h,c=(e.max.z-d.z)*h):(o=(e.max.z-d.z)*h,c=(e.min.z-d.z)*h),n>c||o>s)||((o>n||n!==n)&&(n=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,En)!==null}intersectTriangle(e,t,n,s,r){zr.subVectors(t,e),Os.subVectors(n,e),Hr.crossVectors(zr,Os);let a=this.direction.dot(Hr),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Bn.subVectors(this.origin,e);const c=o*this.direction.dot(Os.crossVectors(Bn,Os));if(c<0)return null;const u=o*this.direction.dot(zr.cross(Bn));if(u<0||c+u>a)return null;const l=-o*Bn.dot(Hr);return l<0?null:this.at(l/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Oe{constructor(e,t,n,s,r,a,o,c,u,l,h,d,f,g,_,m){Oe.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,c,u,l,h,d,f,g,_,m)}set(e,t,n,s,r,a,o,c,u,l,h,d,f,g,_,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=c,p[2]=u,p[6]=l,p[10]=h,p[14]=d,p[3]=f,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Oe().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,s=1/vi.setFromMatrixColumn(e,0).length(),r=1/vi.setFromMatrixColumn(e,1).length(),a=1/vi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(s),u=Math.sin(s),l=Math.cos(r),h=Math.sin(r);if(e.order==="XYZ"){const d=a*l,f=a*h,g=o*l,_=o*h;t[0]=c*l,t[4]=-c*h,t[8]=u,t[1]=f+g*u,t[5]=d-_*u,t[9]=-o*c,t[2]=_-d*u,t[6]=g+f*u,t[10]=a*c}else if(e.order==="YXZ"){const d=c*l,f=c*h,g=u*l,_=u*h;t[0]=d+_*o,t[4]=g*o-f,t[8]=a*u,t[1]=a*h,t[5]=a*l,t[9]=-o,t[2]=f*o-g,t[6]=_+d*o,t[10]=a*c}else if(e.order==="ZXY"){const d=c*l,f=c*h,g=u*l,_=u*h;t[0]=d-_*o,t[4]=-a*h,t[8]=g+f*o,t[1]=f+g*o,t[5]=a*l,t[9]=_-d*o,t[2]=-a*u,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){const d=a*l,f=a*h,g=o*l,_=o*h;t[0]=c*l,t[4]=g*u-f,t[8]=d*u+_,t[1]=c*h,t[5]=_*u+d,t[9]=f*u-g,t[2]=-u,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){const d=a*c,f=a*u,g=o*c,_=o*u;t[0]=c*l,t[4]=_-d*h,t[8]=g*h+f,t[1]=h,t[5]=a*l,t[9]=-o*l,t[2]=-u*l,t[6]=f*h+g,t[10]=d-_*h}else if(e.order==="XZY"){const d=a*c,f=a*u,g=o*c,_=o*u;t[0]=c*l,t[4]=-h,t[8]=u*l,t[1]=d*h+_,t[5]=a*l,t[9]=f*h-g,t[2]=g*h-f,t[6]=o*l,t[10]=_*h+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Hd,e,Vd)}lookAt(e,t,n){const s=this.elements;return Xt.subVectors(e,t),Xt.lengthSq()===0&&(Xt.z=1),Xt.normalize(),kn.crossVectors(n,Xt),kn.lengthSq()===0&&(Math.abs(n.z)===1?Xt.x+=1e-4:Xt.z+=1e-4,Xt.normalize(),kn.crossVectors(n,Xt)),kn.normalize(),Bs.crossVectors(Xt,kn),s[0]=kn.x,s[4]=Bs.x,s[8]=Xt.x,s[1]=kn.y,s[5]=Bs.y,s[9]=Xt.y,s[2]=kn.z,s[6]=Bs.z,s[10]=Xt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],c=n[8],u=n[12],l=n[1],h=n[5],d=n[9],f=n[13],g=n[2],_=n[6],m=n[10],p=n[14],E=n[3],b=n[7],x=n[11],P=n[15],R=s[0],w=s[4],A=s[8],S=s[12],v=s[1],I=s[5],H=s[9],z=s[13],X=s[2],Y=s[6],$=s[10],te=s[14],W=s[3],he=s[7],pe=s[11],we=s[15];return r[0]=a*R+o*v+c*X+u*W,r[4]=a*w+o*I+c*Y+u*he,r[8]=a*A+o*H+c*$+u*pe,r[12]=a*S+o*z+c*te+u*we,r[1]=l*R+h*v+d*X+f*W,r[5]=l*w+h*I+d*Y+f*he,r[9]=l*A+h*H+d*$+f*pe,r[13]=l*S+h*z+d*te+f*we,r[2]=g*R+_*v+m*X+p*W,r[6]=g*w+_*I+m*Y+p*he,r[10]=g*A+_*H+m*$+p*pe,r[14]=g*S+_*z+m*te+p*we,r[3]=E*R+b*v+x*X+P*W,r[7]=E*w+b*I+x*Y+P*he,r[11]=E*A+b*H+x*$+P*pe,r[15]=E*S+b*z+x*te+P*we,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],c=e[9],u=e[13],l=e[2],h=e[6],d=e[10],f=e[14],g=e[3],_=e[7],m=e[11],p=e[15];return g*(+r*c*h-s*u*h-r*o*d+n*u*d+s*o*f-n*c*f)+_*(+t*c*f-t*u*d+r*a*d-s*a*f+s*u*l-r*c*l)+m*(+t*u*h-t*o*f-r*a*h+n*a*f+r*o*l-n*u*l)+p*(-s*o*l-t*c*h+t*o*d+s*a*h-n*a*d+n*c*l)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],u=e[7],l=e[8],h=e[9],d=e[10],f=e[11],g=e[12],_=e[13],m=e[14],p=e[15],E=h*m*u-_*d*u+_*c*f-o*m*f-h*c*p+o*d*p,b=g*d*u-l*m*u-g*c*f+a*m*f+l*c*p-a*d*p,x=l*_*u-g*h*u+g*o*f-a*_*f-l*o*p+a*h*p,P=g*h*c-l*_*c-g*o*d+a*_*d+l*o*m-a*h*m,R=t*E+n*b+s*x+r*P;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const w=1/R;return e[0]=E*w,e[1]=(_*d*r-h*m*r-_*s*f+n*m*f+h*s*p-n*d*p)*w,e[2]=(o*m*r-_*c*r+_*s*u-n*m*u-o*s*p+n*c*p)*w,e[3]=(h*c*r-o*d*r-h*s*u+n*d*u+o*s*f-n*c*f)*w,e[4]=b*w,e[5]=(l*m*r-g*d*r+g*s*f-t*m*f-l*s*p+t*d*p)*w,e[6]=(g*c*r-a*m*r-g*s*u+t*m*u+a*s*p-t*c*p)*w,e[7]=(a*d*r-l*c*r+l*s*u-t*d*u-a*s*f+t*c*f)*w,e[8]=x*w,e[9]=(g*h*r-l*_*r-g*n*f+t*_*f+l*n*p-t*h*p)*w,e[10]=(a*_*r-g*o*r+g*n*u-t*_*u-a*n*p+t*o*p)*w,e[11]=(l*o*r-a*h*r-l*n*u+t*h*u+a*n*f-t*o*f)*w,e[12]=P*w,e[13]=(l*_*s-g*h*s+g*n*d-t*_*d-l*n*m+t*h*m)*w,e[14]=(g*o*s-a*_*s-g*n*c+t*_*c+a*n*m-t*o*m)*w,e[15]=(a*h*s-l*o*s+l*n*c-t*h*c-a*n*d+t*o*d)*w,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,c=e.z,u=r*a,l=r*o;return this.set(u*a+n,u*o-s*c,u*c+s*o,0,u*o+s*c,l*o+n,l*c-s*a,0,u*c-s*o,l*c+s*a,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,a=t._y,o=t._z,c=t._w,u=r+r,l=a+a,h=o+o,d=r*u,f=r*l,g=r*h,_=a*l,m=a*h,p=o*h,E=c*u,b=c*l,x=c*h,P=n.x,R=n.y,w=n.z;return s[0]=(1-(_+p))*P,s[1]=(f+x)*P,s[2]=(g-b)*P,s[3]=0,s[4]=(f-x)*R,s[5]=(1-(d+p))*R,s[6]=(m+E)*R,s[7]=0,s[8]=(g+b)*w,s[9]=(m-E)*w,s[10]=(1-(d+_))*w,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;let r=vi.set(s[0],s[1],s[2]).length();const a=vi.set(s[4],s[5],s[6]).length(),o=vi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],sn.copy(this);const u=1/r,l=1/a,h=1/o;return sn.elements[0]*=u,sn.elements[1]*=u,sn.elements[2]*=u,sn.elements[4]*=l,sn.elements[5]*=l,sn.elements[6]*=l,sn.elements[8]*=h,sn.elements[9]*=h,sn.elements[10]*=h,t.setFromRotationMatrix(sn),n.x=r,n.y=a,n.z=o,this}makePerspective(e,t,n,s,r,a,o=Ln){const c=this.elements,u=2*r/(t-e),l=2*r/(n-s),h=(t+e)/(t-e),d=(n+s)/(n-s);let f,g;if(o===Ln)f=-(a+r)/(a-r),g=-2*a*r/(a-r);else if(o===vr)f=-a/(a-r),g=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=l,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=f,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=Ln){const c=this.elements,u=1/(t-e),l=1/(n-s),h=1/(a-r),d=(t+e)*u,f=(n+s)*l;let g,_;if(o===Ln)g=(a+r)*h,_=-2*h;else if(o===vr)g=r*h,_=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=2*u,c[4]=0,c[8]=0,c[12]=-d,c[1]=0,c[5]=2*l,c[9]=0,c[13]=-f,c[2]=0,c[6]=0,c[10]=_,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const vi=new N,sn=new Oe,Hd=new N(0,0,0),Vd=new N(1,1,1),kn=new N,Bs=new N,Xt=new N,hc=new Oe,dc=new Yn;class Mn{constructor(e=0,t=0,n=0,s=Mn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],c=s[1],u=s[5],l=s[9],h=s[2],d=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(He(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-l,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,u),this._z=0);break;case"YXZ":this._x=Math.asin(-He(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(c,u)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(He(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,f),this._z=Math.atan2(-a,u)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-He(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,u));break;case"YZX":this._z=Math.asin(He(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-l,u),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-He(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,u),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-l,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return hc.makeRotationFromQuaternion(e),this.setFromRotationMatrix(hc,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return dc.setFromEuler(this),this.setFromQuaternion(dc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Mn.DEFAULT_ORDER="XYZ";class tu{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Gd=0;const fc=new N,xi=new Yn,Tn=new Oe,ks=new N,ss=new N,Wd=new N,Xd=new Yn,pc=new N(1,0,0),mc=new N(0,1,0),gc=new N(0,0,1),_c={type:"added"},$d={type:"removed"},Mi={type:"childadded",child:null},Vr={type:"childremoved",child:null};class ft extends qi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Gd++}),this.uuid=un(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ft.DEFAULT_UP.clone();const e=new N,t=new Mn,n=new Yn,s=new N(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Oe},normalMatrix:{value:new Fe}}),this.matrix=new Oe,this.matrixWorld=new Oe,this.matrixAutoUpdate=ft.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ft.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new tu,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return xi.setFromAxisAngle(e,t),this.quaternion.multiply(xi),this}rotateOnWorldAxis(e,t){return xi.setFromAxisAngle(e,t),this.quaternion.premultiply(xi),this}rotateX(e){return this.rotateOnAxis(pc,e)}rotateY(e){return this.rotateOnAxis(mc,e)}rotateZ(e){return this.rotateOnAxis(gc,e)}translateOnAxis(e,t){return fc.copy(e).applyQuaternion(this.quaternion),this.position.add(fc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(pc,e)}translateY(e){return this.translateOnAxis(mc,e)}translateZ(e){return this.translateOnAxis(gc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Tn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?ks.copy(e):ks.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),ss.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Tn.lookAt(ss,ks,this.up):Tn.lookAt(ks,ss,this.up),this.quaternion.setFromRotationMatrix(Tn),s&&(Tn.extractRotation(s.matrixWorld),xi.setFromRotationMatrix(Tn),this.quaternion.premultiply(xi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(_c),Mi.child=e,this.dispatchEvent(Mi),Mi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent($d),Vr.child=e,this.dispatchEvent(Vr),Vr.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Tn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Tn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Tn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(_c),Mi.child=e,this.dispatchEvent(Mi),Mi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ss,e,Wd),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ss,Xd,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let u=0,l=c.length;u<l;u++){const h=c[u];r(e.shapes,h)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,u=this.material.length;c<u;c++)o.push(r(e.materials,this.material[c]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];s.animations.push(r(e.animations,c))}}if(t){const o=a(e.geometries),c=a(e.materials),u=a(e.textures),l=a(e.images),h=a(e.shapes),d=a(e.skeletons),f=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),u.length>0&&(n.textures=u),l.length>0&&(n.images=l),h.length>0&&(n.shapes=h),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(o){const c=[];for(const u in o){const l=o[u];delete l.metadata,c.push(l)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}ft.DEFAULT_UP=new N(0,1,0);ft.DEFAULT_MATRIX_AUTO_UPDATE=!0;ft.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const rn=new N,bn=new N,Gr=new N,wn=new N,yi=new N,Si=new N,vc=new N,Wr=new N,Xr=new N,$r=new N,qr=new Qe,Yr=new Qe,Kr=new Qe;class cn{constructor(e=new N,t=new N,n=new N){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),rn.subVectors(e,t),s.cross(rn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){rn.subVectors(s,t),bn.subVectors(n,t),Gr.subVectors(e,t);const a=rn.dot(rn),o=rn.dot(bn),c=rn.dot(Gr),u=bn.dot(bn),l=bn.dot(Gr),h=a*u-o*o;if(h===0)return r.set(0,0,0),null;const d=1/h,f=(u*c-o*l)*d,g=(a*l-o*c)*d;return r.set(1-f-g,g,f)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,wn)===null?!1:wn.x>=0&&wn.y>=0&&wn.x+wn.y<=1}static getInterpolation(e,t,n,s,r,a,o,c){return this.getBarycoord(e,t,n,s,wn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,wn.x),c.addScaledVector(a,wn.y),c.addScaledVector(o,wn.z),c)}static getInterpolatedAttribute(e,t,n,s,r,a){return qr.setScalar(0),Yr.setScalar(0),Kr.setScalar(0),qr.fromBufferAttribute(e,t),Yr.fromBufferAttribute(e,n),Kr.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(qr,r.x),a.addScaledVector(Yr,r.y),a.addScaledVector(Kr,r.z),a}static isFrontFacing(e,t,n,s){return rn.subVectors(n,t),bn.subVectors(e,t),rn.cross(bn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return rn.subVectors(this.c,this.b),bn.subVectors(this.a,this.b),rn.cross(bn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return cn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return cn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return cn.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return cn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return cn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let a,o;yi.subVectors(s,n),Si.subVectors(r,n),Wr.subVectors(e,n);const c=yi.dot(Wr),u=Si.dot(Wr);if(c<=0&&u<=0)return t.copy(n);Xr.subVectors(e,s);const l=yi.dot(Xr),h=Si.dot(Xr);if(l>=0&&h<=l)return t.copy(s);const d=c*h-l*u;if(d<=0&&c>=0&&l<=0)return a=c/(c-l),t.copy(n).addScaledVector(yi,a);$r.subVectors(e,r);const f=yi.dot($r),g=Si.dot($r);if(g>=0&&f<=g)return t.copy(r);const _=f*u-c*g;if(_<=0&&u>=0&&g<=0)return o=u/(u-g),t.copy(n).addScaledVector(Si,o);const m=l*g-f*h;if(m<=0&&h-l>=0&&f-g>=0)return vc.subVectors(r,s),o=(h-l)/(h-l+(f-g)),t.copy(s).addScaledVector(vc,o);const p=1/(m+_+d);return a=_*p,o=d*p,t.copy(n).addScaledVector(yi,a).addScaledVector(Si,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const nu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},zn={h:0,s:0,l:0},zs={h:0,s:0,l:0};function jr(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class Pe{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=yt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ye.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=Ye.workingColorSpace){return this.r=e,this.g=t,this.b=n,Ye.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=Ye.workingColorSpace){if(e=yo(e,1),t=He(t,0,1),n=He(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=jr(a,r,e+1/3),this.g=jr(a,r,e),this.b=jr(a,r,e-1/3)}return Ye.colorSpaceToWorking(this,s),this}setStyle(e,t=yt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=yt){const n=nu[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Dn(e.r),this.g=Dn(e.g),this.b=Dn(e.b),this}copyLinearToSRGB(e){return this.r=Ni(e.r),this.g=Ni(e.g),this.b=Ni(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=yt){return Ye.workingToColorSpace(Rt.copy(this),e),Math.round(He(Rt.r*255,0,255))*65536+Math.round(He(Rt.g*255,0,255))*256+Math.round(He(Rt.b*255,0,255))}getHexString(e=yt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ye.workingColorSpace){Ye.workingToColorSpace(Rt.copy(this),t);const n=Rt.r,s=Rt.g,r=Rt.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let c,u;const l=(o+a)/2;if(o===a)c=0,u=0;else{const h=a-o;switch(u=l<=.5?h/(a+o):h/(2-a-o),a){case n:c=(s-r)/h+(s<r?6:0);break;case s:c=(r-n)/h+2;break;case r:c=(n-s)/h+4;break}c/=6}return e.h=c,e.s=u,e.l=l,e}getRGB(e,t=Ye.workingColorSpace){return Ye.workingToColorSpace(Rt.copy(this),t),e.r=Rt.r,e.g=Rt.g,e.b=Rt.b,e}getStyle(e=yt){Ye.workingToColorSpace(Rt.copy(this),e);const t=Rt.r,n=Rt.g,s=Rt.b;return e!==yt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(zn),this.setHSL(zn.h+e,zn.s+t,zn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(zn),e.getHSL(zs);const n=ms(zn.h,zs.h,t),s=ms(zn.s,zs.s,t),r=ms(zn.l,zs.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Rt=new Pe;Pe.NAMES=nu;let qd=0;class vn extends qi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:qd++}),this.uuid=un(),this.name="",this.type="Material",this.blending=Ii,this.side=Nn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=va,this.blendDst=xa,this.blendEquation=ai,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Pe(0,0,0),this.blendAlpha=0,this.depthFunc=Fi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=sc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=fi,this.stencilZFail=fi,this.stencilZPass=fi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ii&&(n.blending=this.blending),this.side!==Nn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==va&&(n.blendSrc=this.blendSrc),this.blendDst!==xa&&(n.blendDst=this.blendDst),this.blendEquation!==ai&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Fi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==sc&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==fi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==fi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==fi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const c=r[o];delete c.metadata,a.push(c)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Ft extends vn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Pe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Mn,this.combine=zl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const _t=new N,Hs=new Ne;let Yd=0;class Bt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Yd++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=io,this.updateRanges=[],this.gpuType=ln,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Hs.fromBufferAttribute(this,t),Hs.applyMatrix3(e),this.setXY(t,Hs.x,Hs.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)_t.fromBufferAttribute(this,t),_t.applyMatrix3(e),this.setXYZ(t,_t.x,_t.y,_t.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)_t.fromBufferAttribute(this,t),_t.applyMatrix4(e),this.setXYZ(t,_t.x,_t.y,_t.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)_t.fromBufferAttribute(this,t),_t.applyNormalMatrix(e),this.setXYZ(t,_t.x,_t.y,_t.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)_t.fromBufferAttribute(this,t),_t.transformDirection(e),this.setXYZ(t,_t.x,_t.y,_t.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=on(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=nt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=on(t,this.array)),t}setX(e,t){return this.normalized&&(t=nt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=on(t,this.array)),t}setY(e,t){return this.normalized&&(t=nt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=on(t,this.array)),t}setZ(e,t){return this.normalized&&(t=nt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=on(t,this.array)),t}setW(e,t){return this.normalized&&(t=nt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=nt(t,this.array),n=nt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=nt(t,this.array),n=nt(n,this.array),s=nt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=nt(t,this.array),n=nt(n,this.array),s=nt(s,this.array),r=nt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==io&&(e.usage=this.usage),e}}class iu extends Bt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class su extends Bt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class ut extends Bt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let Kd=0;const jt=new Oe,Zr=new ft,Ei=new N,$t=new hn,rs=new hn,bt=new N;class Pt extends qi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Kd++}),this.uuid=un(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Ql(e)?su:iu)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Fe().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return jt.makeRotationFromQuaternion(e),this.applyMatrix4(jt),this}rotateX(e){return jt.makeRotationX(e),this.applyMatrix4(jt),this}rotateY(e){return jt.makeRotationY(e),this.applyMatrix4(jt),this}rotateZ(e){return jt.makeRotationZ(e),this.applyMatrix4(jt),this}translate(e,t,n){return jt.makeTranslation(e,t,n),this.applyMatrix4(jt),this}scale(e,t,n){return jt.makeScale(e,t,n),this.applyMatrix4(jt),this}lookAt(e){return Zr.lookAt(e),Zr.updateMatrix(),this.applyMatrix4(Zr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ei).negate(),this.translate(Ei.x,Ei.y,Ei.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new ut(n,3))}else{const n=Math.min(e.length,t.count);for(let s=0;s<n;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new hn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new N(-1/0,-1/0,-1/0),new N(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];$t.setFromBufferAttribute(r),this.morphTargetsRelative?(bt.addVectors(this.boundingBox.min,$t.min),this.boundingBox.expandByPoint(bt),bt.addVectors(this.boundingBox.max,$t.max),this.boundingBox.expandByPoint(bt)):(this.boundingBox.expandByPoint($t.min),this.boundingBox.expandByPoint($t.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new yn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new N,1/0);return}if(e){const n=this.boundingSphere.center;if($t.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];rs.setFromBufferAttribute(o),this.morphTargetsRelative?(bt.addVectors($t.min,rs.min),$t.expandByPoint(bt),bt.addVectors($t.max,rs.max),$t.expandByPoint(bt)):($t.expandByPoint(rs.min),$t.expandByPoint(rs.max))}$t.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)bt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(bt));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],c=this.morphTargetsRelative;for(let u=0,l=o.count;u<l;u++)bt.fromBufferAttribute(o,u),c&&(Ei.fromBufferAttribute(e,u),bt.add(Ei)),s=Math.max(s,n.distanceToSquared(bt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Bt(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],c=[];for(let A=0;A<n.count;A++)o[A]=new N,c[A]=new N;const u=new N,l=new N,h=new N,d=new Ne,f=new Ne,g=new Ne,_=new N,m=new N;function p(A,S,v){u.fromBufferAttribute(n,A),l.fromBufferAttribute(n,S),h.fromBufferAttribute(n,v),d.fromBufferAttribute(r,A),f.fromBufferAttribute(r,S),g.fromBufferAttribute(r,v),l.sub(u),h.sub(u),f.sub(d),g.sub(d);const I=1/(f.x*g.y-g.x*f.y);isFinite(I)&&(_.copy(l).multiplyScalar(g.y).addScaledVector(h,-f.y).multiplyScalar(I),m.copy(h).multiplyScalar(f.x).addScaledVector(l,-g.x).multiplyScalar(I),o[A].add(_),o[S].add(_),o[v].add(_),c[A].add(m),c[S].add(m),c[v].add(m))}let E=this.groups;E.length===0&&(E=[{start:0,count:e.count}]);for(let A=0,S=E.length;A<S;++A){const v=E[A],I=v.start,H=v.count;for(let z=I,X=I+H;z<X;z+=3)p(e.getX(z+0),e.getX(z+1),e.getX(z+2))}const b=new N,x=new N,P=new N,R=new N;function w(A){P.fromBufferAttribute(s,A),R.copy(P);const S=o[A];b.copy(S),b.sub(P.multiplyScalar(P.dot(S))).normalize(),x.crossVectors(R,S);const I=x.dot(c[A])<0?-1:1;a.setXYZW(A,b.x,b.y,b.z,I)}for(let A=0,S=E.length;A<S;++A){const v=E[A],I=v.start,H=v.count;for(let z=I,X=I+H;z<X;z+=3)w(e.getX(z+0)),w(e.getX(z+1)),w(e.getX(z+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Bt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const s=new N,r=new N,a=new N,o=new N,c=new N,u=new N,l=new N,h=new N;if(e)for(let d=0,f=e.count;d<f;d+=3){const g=e.getX(d+0),_=e.getX(d+1),m=e.getX(d+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,_),a.fromBufferAttribute(t,m),l.subVectors(a,r),h.subVectors(s,r),l.cross(h),o.fromBufferAttribute(n,g),c.fromBufferAttribute(n,_),u.fromBufferAttribute(n,m),o.add(l),c.add(l),u.add(l),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(m,u.x,u.y,u.z)}else for(let d=0,f=t.count;d<f;d+=3)s.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),l.subVectors(a,r),h.subVectors(s,r),l.cross(h),n.setXYZ(d+0,l.x,l.y,l.z),n.setXYZ(d+1,l.x,l.y,l.z),n.setXYZ(d+2,l.x,l.y,l.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)bt.fromBufferAttribute(e,t),bt.normalize(),e.setXYZ(t,bt.x,bt.y,bt.z)}toNonIndexed(){function e(o,c){const u=o.array,l=o.itemSize,h=o.normalized,d=new u.constructor(c.length*l);let f=0,g=0;for(let _=0,m=c.length;_<m;_++){o.isInterleavedBufferAttribute?f=c[_]*o.data.stride+o.offset:f=c[_]*l;for(let p=0;p<l;p++)d[g++]=u[f++]}return new Bt(d,l,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Pt,n=this.index.array,s=this.attributes;for(const o in s){const c=s[o],u=e(c,n);t.setAttribute(o,u)}const r=this.morphAttributes;for(const o in r){const c=[],u=r[o];for(let l=0,h=u.length;l<h;l++){const d=u[l],f=e(d,n);c.push(f)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const u=a[o];t.addGroup(u.start,u.count,u.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const u in c)c[u]!==void 0&&(e[u]=c[u]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const u=n[c];e.data.attributes[c]=u.toJSON(e.data)}const s={};let r=!1;for(const c in this.morphAttributes){const u=this.morphAttributes[c],l=[];for(let h=0,d=u.length;h<d;h++){const f=u[h];l.push(f.toJSON(e.data))}l.length>0&&(s[c]=l,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const s=e.attributes;for(const u in s){const l=s[u];this.setAttribute(u,l.clone(t))}const r=e.morphAttributes;for(const u in r){const l=[],h=r[u];for(let d=0,f=h.length;d<f;d++)l.push(h[d].clone(t));this.morphAttributes[u]=l}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let u=0,l=a.length;u<l;u++){const h=a[u];this.addGroup(h.start,h.count,h.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const xc=new Oe,Jn=new Er,Vs=new yn,Mc=new N,Gs=new N,Ws=new N,Xs=new N,Jr=new N,$s=new N,yc=new N,qs=new N;class Ke extends ft{constructor(e=new Pt,t=new Ft){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){$s.set(0,0,0);for(let c=0,u=r.length;c<u;c++){const l=o[c],h=r[c];l!==0&&(Jr.fromBufferAttribute(h,e),a?$s.addScaledVector(Jr,l):$s.addScaledVector(Jr.sub(t),l))}t.add($s)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Vs.copy(n.boundingSphere),Vs.applyMatrix4(r),Jn.copy(e.ray).recast(e.near),!(Vs.containsPoint(Jn.origin)===!1&&(Jn.intersectSphere(Vs,Mc)===null||Jn.origin.distanceToSquared(Mc)>(e.far-e.near)**2))&&(xc.copy(r).invert(),Jn.copy(e.ray).applyMatrix4(xc),!(n.boundingBox!==null&&Jn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Jn)))}_computeIntersections(e,t,n){let s;const r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,u=r.attributes.uv,l=r.attributes.uv1,h=r.attributes.normal,d=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,_=d.length;g<_;g++){const m=d[g],p=a[m.materialIndex],E=Math.max(m.start,f.start),b=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let x=E,P=b;x<P;x+=3){const R=o.getX(x),w=o.getX(x+1),A=o.getX(x+2);s=Ys(this,p,e,n,u,l,h,R,w,A),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,f.start),_=Math.min(o.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){const E=o.getX(m),b=o.getX(m+1),x=o.getX(m+2);s=Ys(this,a,e,n,u,l,h,E,b,x),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let g=0,_=d.length;g<_;g++){const m=d[g],p=a[m.materialIndex],E=Math.max(m.start,f.start),b=Math.min(c.count,Math.min(m.start+m.count,f.start+f.count));for(let x=E,P=b;x<P;x+=3){const R=x,w=x+1,A=x+2;s=Ys(this,p,e,n,u,l,h,R,w,A),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,f.start),_=Math.min(c.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){const E=m,b=m+1,x=m+2;s=Ys(this,a,e,n,u,l,h,E,b,x),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function jd(i,e,t,n,s,r,a,o){let c;if(e.side===Ct?c=n.intersectTriangle(a,r,s,!0,o):c=n.intersectTriangle(s,r,a,e.side===Nn,o),c===null)return null;qs.copy(o),qs.applyMatrix4(i.matrixWorld);const u=t.ray.origin.distanceTo(qs);return u<t.near||u>t.far?null:{distance:u,point:qs.clone(),object:i}}function Ys(i,e,t,n,s,r,a,o,c,u){i.getVertexPosition(o,Gs),i.getVertexPosition(c,Ws),i.getVertexPosition(u,Xs);const l=jd(i,e,t,n,Gs,Ws,Xs,yc);if(l){const h=new N;cn.getBarycoord(yc,Gs,Ws,Xs,h),s&&(l.uv=cn.getInterpolatedAttribute(s,o,c,u,h,new Ne)),r&&(l.uv1=cn.getInterpolatedAttribute(r,o,c,u,h,new Ne)),a&&(l.normal=cn.getInterpolatedAttribute(a,o,c,u,h,new N),l.normal.dot(n.direction)>0&&l.normal.multiplyScalar(-1));const d={a:o,b:c,c:u,normal:new N,materialIndex:0};cn.getNormal(Gs,Ws,Xs,d.normal),l.face=d,l.barycoord=h}return l}class Jt extends Pt{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const c=[],u=[],l=[],h=[];let d=0,f=0;g("z","y","x",-1,-1,n,t,e,a,r,0),g("z","y","x",1,-1,n,t,-e,a,r,1),g("x","z","y",1,1,e,n,t,s,a,2),g("x","z","y",1,-1,e,n,-t,s,a,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new ut(u,3)),this.setAttribute("normal",new ut(l,3)),this.setAttribute("uv",new ut(h,2));function g(_,m,p,E,b,x,P,R,w,A,S){const v=x/w,I=P/A,H=x/2,z=P/2,X=R/2,Y=w+1,$=A+1;let te=0,W=0;const he=new N;for(let pe=0;pe<$;pe++){const we=pe*I-z;for(let Ce=0;Ce<Y;Ce++){const je=Ce*v-H;he[_]=je*E,he[m]=we*b,he[p]=X,u.push(he.x,he.y,he.z),he[_]=0,he[m]=0,he[p]=R>0?1:-1,l.push(he.x,he.y,he.z),h.push(Ce/w),h.push(1-pe/A),te+=1}}for(let pe=0;pe<A;pe++)for(let we=0;we<w;we++){const Ce=d+we+Y*pe,je=d+we+Y*(pe+1),K=d+(we+1)+Y*(pe+1),ce=d+(we+1)+Y*pe;c.push(Ce,je,ce),c.push(je,K,ce),W+=6}o.addGroup(f,W,S),f+=W,d+=te}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Jt(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Hi(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function Nt(i){const e={};for(let t=0;t<i.length;t++){const n=Hi(i[t]);for(const s in n)e[s]=n[s]}return e}function Zd(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function ru(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ye.workingColorSpace}const Jd={clone:Hi,merge:Nt};var Qd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ef=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class qn extends vn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Qd,this.fragmentShader=ef,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Hi(e.uniforms),this.uniformsGroups=Zd(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class au extends ft{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Oe,this.projectionMatrix=new Oe,this.projectionMatrixInverse=new Oe,this.coordinateSystem=Ln}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Hn=new N,Sc=new Ne,Ec=new Ne;class Ut extends au{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=zi*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(ps*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return zi*2*Math.atan(Math.tan(ps*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Hn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Hn.x,Hn.y).multiplyScalar(-e/Hn.z),Hn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Hn.x,Hn.y).multiplyScalar(-e/Hn.z)}getViewSize(e,t){return this.getViewBounds(e,Sc,Ec),t.subVectors(Ec,Sc)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(ps*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,u=a.fullHeight;r+=a.offsetX*s/c,t-=a.offsetY*n/u,s*=a.width/c,n*=a.height/u}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Ti=-90,bi=1;class tf extends ft{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Ut(Ti,bi,e,t);s.layers=this.layers,this.add(s);const r=new Ut(Ti,bi,e,t);r.layers=this.layers,this.add(r);const a=new Ut(Ti,bi,e,t);a.layers=this.layers,this.add(a);const o=new Ut(Ti,bi,e,t);o.layers=this.layers,this.add(o);const c=new Ut(Ti,bi,e,t);c.layers=this.layers,this.add(c);const u=new Ut(Ti,bi,e,t);u.layers=this.layers,this.add(u)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,c]=t;for(const u of t)this.remove(u);if(e===Ln)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===vr)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const u of t)this.add(u),u.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,c,u,l]=this.children,h=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,a),e.setRenderTarget(n,2,s),e.render(t,o),e.setRenderTarget(n,3,s),e.render(t,c),e.setRenderTarget(n,4,s),e.render(t,u),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,s),e.render(t,l),e.setRenderTarget(h,d,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class ou extends St{constructor(e=[],t=Oi,n,s,r,a,o,c,u,l){super(e,t,n,s,r,a,o,c,u,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class nf extends hi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new ou(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Jt(5,5,5),r=new qn({name:"CubemapFromEquirect",uniforms:Hi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ct,blending:Xn});r.uniforms.tEquirect.value=t;const a=new Ke(s,r),o=t.minFilter;return t.minFilter===Pn&&(t.minFilter=qt),new tf(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}}class Ht extends ft{constructor(){super(),this.isGroup=!0,this.type="Group"}}const sf={type:"move"};class Qr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ht,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ht,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new N,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new N),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ht,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new N,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new N),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null;const o=this._targetRay,c=this._grip,u=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(u&&e.hand){a=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,n),p=this._getHandJoint(u,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const l=u.joints["index-finger-tip"],h=u.joints["thumb-tip"],d=l.position.distanceTo(h.position),f=.02,g=.005;u.inputState.pinching&&d>f+g?(u.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!u.inputState.pinching&&d<=f-g&&(u.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(sf)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),u!==null&&(u.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Ht;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class so extends ft{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Mn,this.environmentIntensity=1,this.environmentRotation=new Mn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class rf{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=io,this.updateRanges=[],this.version=0,this.uuid=un()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=un()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=un()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Dt=new N;class Eo{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Dt.fromBufferAttribute(this,t),Dt.applyMatrix4(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Dt.fromBufferAttribute(this,t),Dt.applyNormalMatrix(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Dt.fromBufferAttribute(this,t),Dt.transformDirection(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=on(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=nt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=nt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=nt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=nt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=nt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=on(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=on(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=on(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=on(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=nt(t,this.array),n=nt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=nt(t,this.array),n=nt(n,this.array),s=nt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=nt(t,this.array),n=nt(n,this.array),s=nt(s,this.array),r=nt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Bt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Eo(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const Tc=new N,bc=new Qe,wc=new Qe,af=new N,Ac=new Oe,Ks=new N,ea=new yn,Rc=new Oe,ta=new Er;class of extends Ke{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=ec,this.bindMatrix=new Oe,this.bindMatrixInverse=new Oe,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new hn),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Ks),this.boundingBox.expandByPoint(Ks)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new yn),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Ks),this.boundingSphere.expandByPoint(Ks)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ea.copy(this.boundingSphere),ea.applyMatrix4(s),e.ray.intersectsSphere(ea)!==!1&&(Rc.copy(s).invert(),ta.copy(e.ray).applyMatrix4(Rc),!(this.boundingBox!==null&&ta.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,ta)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new Qe,t=this.geometry.attributes.skinWeight;for(let n=0,s=t.count;n<s;n++){e.fromBufferAttribute(t,n);const r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===ec?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===ed?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,s=this.geometry;bc.fromBufferAttribute(s.attributes.skinIndex,e),wc.fromBufferAttribute(s.attributes.skinWeight,e),Tc.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){const a=wc.getComponent(r);if(a!==0){const o=bc.getComponent(r);Ac.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(af.copy(Tc).applyMatrix4(Ac),a)}}return t.applyMatrix4(this.bindMatrixInverse)}}class cu extends ft{constructor(){super(),this.isBone=!0,this.type="Bone"}}class lu extends St{constructor(e=null,t=1,n=1,s,r,a,o,c,u=Ot,l=Ot,h,d){super(null,a,o,c,u,l,s,r,h,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Cc=new Oe,cf=new Oe;class To{constructor(e=[],t=[]){this.uuid=un(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new Oe)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new Oe;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,a=e.length;r<a;r++){const o=e[r]?e[r].matrixWorld:cf;Cc.multiplyMatrices(o,t[r]),Cc.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new To(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new lu(t,e,e,Qt,ln);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const s=this.bones[t];if(s.name===e)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,s=e.bones.length;n<s;n++){const r=e.bones[n];let a=t[r];a===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),a=new cu),this.bones.push(a),this.boneInverses.push(new Oe().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let s=0,r=t.length;s<r;s++){const a=t[s];e.bones.push(a.uuid);const o=n[s];e.boneInverses.push(o.toArray())}return e}}class ro extends Bt{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const wi=new Oe,Pc=new Oe,js=[],Lc=new hn,lf=new Oe,as=new Ke,os=new yn;class uu extends Ke{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new ro(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,lf)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new hn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,wi),Lc.copy(e.boundingBox).applyMatrix4(wi),this.boundingBox.union(Lc)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new yn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,wi),os.copy(e.boundingSphere).applyMatrix4(wi),this.boundingSphere.union(os)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(e,t){const n=this.matrixWorld,s=this.count;if(as.geometry=this.geometry,as.material=this.material,as.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),os.copy(this.boundingSphere),os.applyMatrix4(n),e.ray.intersectsSphere(os)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,wi),Pc.multiplyMatrices(n,wi),as.matrixWorld=Pc,as.raycast(e,js);for(let a=0,o=js.length;a<o;a++){const c=js[a];c.instanceId=r,c.object=this,t.push(c)}js.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new ro(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new lu(new Float32Array(s*this.count),s,this.count,_o,ln));const r=this.morphTexture.source.data.data;let a=0;for(let u=0;u<n.length;u++)a+=n[u];const o=this.geometry.morphTargetsRelative?1:1-a,c=s*e;r[c]=o,r.set(n,c+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const na=new N,uf=new N,hf=new Fe;class si{constructor(e=new N(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=na.subVectors(n,t).cross(uf.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(na),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||hf.getNormalMatrix(e),s=this.coplanarPoint(na).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Qn=new yn,df=new Ne(.5,.5),Zs=new N;class bo{constructor(e=new si,t=new si,n=new si,s=new si,r=new si,a=new si){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Ln){const n=this.planes,s=e.elements,r=s[0],a=s[1],o=s[2],c=s[3],u=s[4],l=s[5],h=s[6],d=s[7],f=s[8],g=s[9],_=s[10],m=s[11],p=s[12],E=s[13],b=s[14],x=s[15];if(n[0].setComponents(c-r,d-u,m-f,x-p).normalize(),n[1].setComponents(c+r,d+u,m+f,x+p).normalize(),n[2].setComponents(c+a,d+l,m+g,x+E).normalize(),n[3].setComponents(c-a,d-l,m-g,x-E).normalize(),n[4].setComponents(c-o,d-h,m-_,x-b).normalize(),t===Ln)n[5].setComponents(c+o,d+h,m+_,x+b).normalize();else if(t===vr)n[5].setComponents(o,h,_,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Qn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Qn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Qn)}intersectsSprite(e){Qn.center.set(0,0,0);const t=df.distanceTo(e.center);return Qn.radius=.7071067811865476+t,Qn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Qn)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(Zs.x=s.normal.x>0?e.max.x:e.min.x,Zs.y=s.normal.y>0?e.max.y:e.min.y,Zs.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Zs)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class hu extends vn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Pe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const xr=new N,Mr=new N,Ic=new Oe,cs=new Er,Js=new yn,ia=new N,Dc=new N;class wo extends ft{constructor(e=new Pt,t=new hu){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)xr.fromBufferAttribute(t,s-1),Mr.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=xr.distanceTo(Mr);e.setAttribute("lineDistance",new ut(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Js.copy(n.boundingSphere),Js.applyMatrix4(s),Js.radius+=r,e.ray.intersectsSphere(Js)===!1)return;Ic.copy(s).invert(),cs.copy(e.ray).applyMatrix4(Ic);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,u=this.isLineSegments?2:1,l=n.index,d=n.attributes.position;if(l!==null){const f=Math.max(0,a.start),g=Math.min(l.count,a.start+a.count);for(let _=f,m=g-1;_<m;_+=u){const p=l.getX(_),E=l.getX(_+1),b=Qs(this,e,cs,c,p,E,_);b&&t.push(b)}if(this.isLineLoop){const _=l.getX(g-1),m=l.getX(f),p=Qs(this,e,cs,c,_,m,g-1);p&&t.push(p)}}else{const f=Math.max(0,a.start),g=Math.min(d.count,a.start+a.count);for(let _=f,m=g-1;_<m;_+=u){const p=Qs(this,e,cs,c,_,_+1,_);p&&t.push(p)}if(this.isLineLoop){const _=Qs(this,e,cs,c,g-1,f,g-1);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Qs(i,e,t,n,s,r,a){const o=i.geometry.attributes.position;if(xr.fromBufferAttribute(o,s),Mr.fromBufferAttribute(o,r),t.distanceSqToSegment(xr,Mr,ia,Dc)>n)return;ia.applyMatrix4(i.matrixWorld);const u=e.ray.origin.distanceTo(ia);if(!(u<e.near||u>e.far))return{distance:u,point:Dc.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}const Nc=new N,Uc=new N;class ff extends wo{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)Nc.fromBufferAttribute(t,s),Uc.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Nc.distanceTo(Uc);e.setAttribute("lineDistance",new ut(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class pf extends wo{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class du extends vn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Pe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Fc=new Oe,ao=new Er,er=new yn,tr=new N;class mf extends ft{constructor(e=new Pt,t=new du){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),er.copy(n.boundingSphere),er.applyMatrix4(s),er.radius+=r,e.ray.intersectsSphere(er)===!1)return;Fc.copy(s).invert(),ao.copy(e.ray).applyMatrix4(Fc);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,u=n.index,h=n.attributes.position;if(u!==null){const d=Math.max(0,a.start),f=Math.min(u.count,a.start+a.count);for(let g=d,_=f;g<_;g++){const m=u.getX(g);tr.fromBufferAttribute(h,m),Oc(tr,m,c,s,e,t,this)}}else{const d=Math.max(0,a.start),f=Math.min(h.count,a.start+a.count);for(let g=d,_=f;g<_;g++)tr.fromBufferAttribute(h,g),Oc(tr,g,c,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Oc(i,e,t,n,s,r,a){const o=ao.distanceSqToPoint(i);if(o<t){const c=new N;ao.closestPointToPoint(i,c),c.applyMatrix4(n);const u=s.ray.origin.distanceTo(c);if(u<s.near||u>s.far)return;r.push({distance:u,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class gf extends St{constructor(e,t,n,s,r,a,o,c,u){super(e,t,n,s,r,a,o,c,u),this.isCanvasTexture=!0,this.needsUpdate=!0}}class fu extends St{constructor(e,t,n=ui,s,r,a,o=Ot,c=Ot,u,l=xs,h=1){if(l!==xs&&l!==Ms)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:e,height:t,depth:h};super(d,s,r,a,o,c,l,n,u),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new So(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Ao extends Pt{constructor(e=1,t=1,n=4,s=8,r=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:n,radialSegments:s,heightSegments:r},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),s=Math.max(3,Math.floor(s)),r=Math.max(1,Math.floor(r));const a=[],o=[],c=[],u=[],l=t/2,h=Math.PI/2*e,d=t,f=2*h+d,g=n*2+r,_=s+1,m=new N,p=new N;for(let E=0;E<=g;E++){let b=0,x=0,P=0,R=0;if(E<=n){const S=E/n,v=S*Math.PI/2;x=-l-e*Math.cos(v),P=e*Math.sin(v),R=-e*Math.cos(v),b=S*h}else if(E<=n+r){const S=(E-n)/r;x=-l+S*t,P=e,R=0,b=h+S*d}else{const S=(E-n-r)/n,v=S*Math.PI/2;x=l+e*Math.sin(v),P=e*Math.cos(v),R=e*Math.sin(v),b=h+d+S*h}const w=Math.max(0,Math.min(1,b/f));let A=0;E===0?A=.5/s:E===g&&(A=-.5/s);for(let S=0;S<=s;S++){const v=S/s,I=v*Math.PI*2,H=Math.sin(I),z=Math.cos(I);p.x=-P*z,p.y=x,p.z=P*H,o.push(p.x,p.y,p.z),m.set(-P*z,R,P*H),m.normalize(),c.push(m.x,m.y,m.z),u.push(v+A,w)}if(E>0){const S=(E-1)*_;for(let v=0;v<s;v++){const I=S+v,H=S+v+1,z=E*_+v,X=E*_+v+1;a.push(I,H,z),a.push(H,X,z)}}}this.setIndex(a),this.setAttribute("position",new ut(o,3)),this.setAttribute("normal",new ut(c,3)),this.setAttribute("uv",new ut(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ao(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}}class ci extends Pt{constructor(e=1,t=1,n=1,s=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};const u=this;s=Math.floor(s),r=Math.floor(r);const l=[],h=[],d=[],f=[];let g=0;const _=[],m=n/2;let p=0;E(),a===!1&&(e>0&&b(!0),t>0&&b(!1)),this.setIndex(l),this.setAttribute("position",new ut(h,3)),this.setAttribute("normal",new ut(d,3)),this.setAttribute("uv",new ut(f,2));function E(){const x=new N,P=new N;let R=0;const w=(t-e)/n;for(let A=0;A<=r;A++){const S=[],v=A/r,I=v*(t-e)+e;for(let H=0;H<=s;H++){const z=H/s,X=z*c+o,Y=Math.sin(X),$=Math.cos(X);P.x=I*Y,P.y=-v*n+m,P.z=I*$,h.push(P.x,P.y,P.z),x.set(Y,w,$).normalize(),d.push(x.x,x.y,x.z),f.push(z,1-v),S.push(g++)}_.push(S)}for(let A=0;A<s;A++)for(let S=0;S<r;S++){const v=_[S][A],I=_[S+1][A],H=_[S+1][A+1],z=_[S][A+1];(e>0||S!==0)&&(l.push(v,I,z),R+=3),(t>0||S!==r-1)&&(l.push(I,H,z),R+=3)}u.addGroup(p,R,0),p+=R}function b(x){const P=g,R=new Ne,w=new N;let A=0;const S=x===!0?e:t,v=x===!0?1:-1;for(let H=1;H<=s;H++)h.push(0,m*v,0),d.push(0,v,0),f.push(.5,.5),g++;const I=g;for(let H=0;H<=s;H++){const X=H/s*c+o,Y=Math.cos(X),$=Math.sin(X);w.x=S*$,w.y=m*v,w.z=S*Y,h.push(w.x,w.y,w.z),d.push(0,v,0),R.x=Y*.5+.5,R.y=$*.5*v+.5,f.push(R.x,R.y),g++}for(let H=0;H<s;H++){const z=P+H,X=I+H;x===!0?l.push(X,X+1,z):l.push(X+1,X,z),A+=3}u.addGroup(p,A,x===!0?1:2),p+=A}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ci(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class yr extends ci{constructor(e=1,t=1,n=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,e,t,n,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(e){return new yr(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Ro extends Pt{constructor(e=[],t=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:s};const r=[],a=[];o(s),u(n),l(),this.setAttribute("position",new ut(r,3)),this.setAttribute("normal",new ut(r.slice(),3)),this.setAttribute("uv",new ut(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(E){const b=new N,x=new N,P=new N;for(let R=0;R<t.length;R+=3)f(t[R+0],b),f(t[R+1],x),f(t[R+2],P),c(b,x,P,E)}function c(E,b,x,P){const R=P+1,w=[];for(let A=0;A<=R;A++){w[A]=[];const S=E.clone().lerp(x,A/R),v=b.clone().lerp(x,A/R),I=R-A;for(let H=0;H<=I;H++)H===0&&A===R?w[A][H]=S:w[A][H]=S.clone().lerp(v,H/I)}for(let A=0;A<R;A++)for(let S=0;S<2*(R-A)-1;S++){const v=Math.floor(S/2);S%2===0?(d(w[A][v+1]),d(w[A+1][v]),d(w[A][v])):(d(w[A][v+1]),d(w[A+1][v+1]),d(w[A+1][v]))}}function u(E){const b=new N;for(let x=0;x<r.length;x+=3)b.x=r[x+0],b.y=r[x+1],b.z=r[x+2],b.normalize().multiplyScalar(E),r[x+0]=b.x,r[x+1]=b.y,r[x+2]=b.z}function l(){const E=new N;for(let b=0;b<r.length;b+=3){E.x=r[b+0],E.y=r[b+1],E.z=r[b+2];const x=m(E)/2/Math.PI+.5,P=p(E)/Math.PI+.5;a.push(x,1-P)}g(),h()}function h(){for(let E=0;E<a.length;E+=6){const b=a[E+0],x=a[E+2],P=a[E+4],R=Math.max(b,x,P),w=Math.min(b,x,P);R>.9&&w<.1&&(b<.2&&(a[E+0]+=1),x<.2&&(a[E+2]+=1),P<.2&&(a[E+4]+=1))}}function d(E){r.push(E.x,E.y,E.z)}function f(E,b){const x=E*3;b.x=e[x+0],b.y=e[x+1],b.z=e[x+2]}function g(){const E=new N,b=new N,x=new N,P=new N,R=new Ne,w=new Ne,A=new Ne;for(let S=0,v=0;S<r.length;S+=9,v+=6){E.set(r[S+0],r[S+1],r[S+2]),b.set(r[S+3],r[S+4],r[S+5]),x.set(r[S+6],r[S+7],r[S+8]),R.set(a[v+0],a[v+1]),w.set(a[v+2],a[v+3]),A.set(a[v+4],a[v+5]),P.copy(E).add(b).add(x).divideScalar(3);const I=m(P);_(R,v+0,E,I),_(w,v+2,b,I),_(A,v+4,x,I)}}function _(E,b,x,P){P<0&&E.x===1&&(a[b]=E.x-1),x.x===0&&x.z===0&&(a[b]=P/2/Math.PI+.5)}function m(E){return Math.atan2(E.z,-E.x)}function p(E){return Math.atan2(-E.y,Math.sqrt(E.x*E.x+E.z*E.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ro(e.vertices,e.indices,e.radius,e.details)}}class Co extends Pt{constructor(e=[new Ne(0,-.5),new Ne(.5,0),new Ne(0,.5)],t=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:s},t=Math.floor(t),s=He(s,0,Math.PI*2);const r=[],a=[],o=[],c=[],u=[],l=1/t,h=new N,d=new Ne,f=new N,g=new N,_=new N;let m=0,p=0;for(let E=0;E<=e.length-1;E++)switch(E){case 0:m=e[E+1].x-e[E].x,p=e[E+1].y-e[E].y,f.x=p*1,f.y=-m,f.z=p*0,_.copy(f),f.normalize(),c.push(f.x,f.y,f.z);break;case e.length-1:c.push(_.x,_.y,_.z);break;default:m=e[E+1].x-e[E].x,p=e[E+1].y-e[E].y,f.x=p*1,f.y=-m,f.z=p*0,g.copy(f),f.x+=_.x,f.y+=_.y,f.z+=_.z,f.normalize(),c.push(f.x,f.y,f.z),_.copy(g)}for(let E=0;E<=t;E++){const b=n+E*l*s,x=Math.sin(b),P=Math.cos(b);for(let R=0;R<=e.length-1;R++){h.x=e[R].x*x,h.y=e[R].y,h.z=e[R].x*P,a.push(h.x,h.y,h.z),d.x=E/t,d.y=R/(e.length-1),o.push(d.x,d.y);const w=c[3*R+0]*x,A=c[3*R+1],S=c[3*R+0]*P;u.push(w,A,S)}}for(let E=0;E<t;E++)for(let b=0;b<e.length-1;b++){const x=b+E*e.length,P=x,R=x+e.length,w=x+e.length+1,A=x+1;r.push(P,R,A),r.push(w,A,R)}this.setIndex(r),this.setAttribute("position",new ut(a,3)),this.setAttribute("uv",new ut(o,2)),this.setAttribute("normal",new ut(u,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Co(e.points,e.segments,e.phiStart,e.phiLength)}}class Po extends Ro{constructor(e=1,t=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,s,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Po(e.radius,e.detail)}}class Vi extends Pt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(n),c=Math.floor(s),u=o+1,l=c+1,h=e/o,d=t/c,f=[],g=[],_=[],m=[];for(let p=0;p<l;p++){const E=p*d-a;for(let b=0;b<u;b++){const x=b*h-r;g.push(x,-E,0),_.push(0,0,1),m.push(b/o),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let E=0;E<o;E++){const b=E+u*p,x=E+u*(p+1),P=E+1+u*(p+1),R=E+1+u*p;f.push(b,x,R),f.push(x,P,R)}this.setIndex(f),this.setAttribute("position",new ut(g,3)),this.setAttribute("normal",new ut(_,3)),this.setAttribute("uv",new ut(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Vi(e.width,e.height,e.widthSegments,e.heightSegments)}}class an extends Pt{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const c=Math.min(a+o,Math.PI);let u=0;const l=[],h=new N,d=new N,f=[],g=[],_=[],m=[];for(let p=0;p<=n;p++){const E=[],b=p/n;let x=0;p===0&&a===0?x=.5/t:p===n&&c===Math.PI&&(x=-.5/t);for(let P=0;P<=t;P++){const R=P/t;h.x=-e*Math.cos(s+R*r)*Math.sin(a+b*o),h.y=e*Math.cos(a+b*o),h.z=e*Math.sin(s+R*r)*Math.sin(a+b*o),g.push(h.x,h.y,h.z),d.copy(h).normalize(),_.push(d.x,d.y,d.z),m.push(R+x,1-b),E.push(u++)}l.push(E)}for(let p=0;p<n;p++)for(let E=0;E<t;E++){const b=l[p][E+1],x=l[p][E],P=l[p+1][E],R=l[p+1][E+1];(p!==0||a>0)&&f.push(b,x,R),(p!==n-1||c<Math.PI)&&f.push(x,P,R)}this.setIndex(f),this.setAttribute("position",new ut(g,3)),this.setAttribute("normal",new ut(_,3)),this.setAttribute("uv",new ut(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new an(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Ts extends Pt{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);const a=[],o=[],c=[],u=[],l=new N,h=new N,d=new N;for(let f=0;f<=n;f++)for(let g=0;g<=s;g++){const _=g/s*r,m=f/n*Math.PI*2;h.x=(e+t*Math.cos(m))*Math.cos(_),h.y=(e+t*Math.cos(m))*Math.sin(_),h.z=t*Math.sin(m),o.push(h.x,h.y,h.z),l.x=e*Math.cos(_),l.y=e*Math.sin(_),d.subVectors(h,l).normalize(),c.push(d.x,d.y,d.z),u.push(g/s),u.push(f/n)}for(let f=1;f<=n;f++)for(let g=1;g<=s;g++){const _=(s+1)*f+g-1,m=(s+1)*(f-1)+g-1,p=(s+1)*(f-1)+g,E=(s+1)*f+g;a.push(_,m,E),a.push(m,p,E)}this.setIndex(a),this.setAttribute("position",new ut(o,3)),this.setAttribute("normal",new ut(c,3)),this.setAttribute("uv",new ut(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ts(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class Gi extends vn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Pe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Pe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Zl,this.normalScale=new Ne(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Mn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class dn extends Gi{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Ne(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return He(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Pe(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Pe(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Pe(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class _f extends vn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=id,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class vf extends vn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}function nr(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function xf(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function Mf(i){function e(s,r){return i[s]-i[r]}const t=i.length,n=new Array(t);for(let s=0;s!==t;++s)n[s]=s;return n.sort(e),n}function Bc(i,e,t){const n=i.length,s=new i.constructor(n);for(let r=0,a=0;a!==n;++r){const o=t[r]*e;for(let c=0;c!==e;++c)s[a++]=i[o+c]}return s}function pu(i,e,t,n){let s=1,r=i[0];for(;r!==void 0&&r[n]===void 0;)r=i[s++];if(r===void 0)return;let a=r[n];if(a!==void 0)if(Array.isArray(a))do a=r[n],a!==void 0&&(e.push(r.time),t.push(...a)),r=i[s++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[n],a!==void 0&&(e.push(r.time),a.toArray(t,t.length)),r=i[s++];while(r!==void 0);else do a=r[n],a!==void 0&&(e.push(r.time),t.push(a)),r=i[s++];while(r!==void 0)}class ws{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,s=t[n],r=t[n-1];n:{e:{let a;t:{i:if(!(e<s)){for(let o=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=t[++n],e<s)break e}a=t.length;break t}if(!(e>=r)){const o=t[1];e<o&&(n=2,r=o);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=t[--n-1],e>=r)break e}a=n,n=0;break t}break n}for(;n<a;){const o=n+a>>>1;e<t[o]?a=o:n=o+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let a=0;a!==s;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class yf extends ws{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:tc,endingEnd:tc}}intervalChanged_(e,t,n){const s=this.parameterPositions;let r=e-2,a=e+1,o=s[r],c=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case nc:r=e,o=2*t-n;break;case ic:r=s.length-2,o=t+s[r]-s[r+1];break;default:r=e,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case nc:a=e,c=2*n-t;break;case ic:a=1,c=n+s[1]-s[0];break;default:a=e-1,c=t}const u=(n-t)*.5,l=this.valueSize;this._weightPrev=u/(t-o),this._weightNext=u/(c-n),this._offsetPrev=r*l,this._offsetNext=a*l}interpolate_(e,t,n,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,u=c-o,l=this._offsetPrev,h=this._offsetNext,d=this._weightPrev,f=this._weightNext,g=(n-t)/(s-t),_=g*g,m=_*g,p=-d*m+2*d*_-d*g,E=(1+d)*m+(-1.5-2*d)*_+(-.5+d)*g+1,b=(-1-f)*m+(1.5+f)*_+.5*g,x=f*m-f*_;for(let P=0;P!==o;++P)r[P]=p*a[l+P]+E*a[u+P]+b*a[c+P]+x*a[h+P];return r}}class Sf extends ws{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,u=c-o,l=(n-t)/(s-t),h=1-l;for(let d=0;d!==o;++d)r[d]=a[u+d]*h+a[c+d]*l;return r}}class Ef extends ws{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}}class fn{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=nr(t,this.TimeBufferType),this.values=nr(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:nr(e.times,Array),values:nr(e.values,Array)};const s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Ef(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Sf(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new yf(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case ys:t=this.InterpolantFactoryMethodDiscrete;break;case Ss:t=this.InterpolantFactoryMethodLinear;break;case Ir:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ys;case this.InterpolantFactoryMethodLinear:return Ss;case this.InterpolantFactoryMethodSmooth:return Ir}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e}return this}trim(e,t){const n=this.times,s=n.length;let r=0,a=s-1;for(;r!==s&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);const o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){const c=n[o];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,c),e=!1;break}if(a!==null&&a>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,c,a),e=!1;break}a=c}if(s!==void 0&&xf(s))for(let o=0,c=s.length;o!==c;++o){const u=s[o];if(isNaN(u)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,u),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Ir,r=e.length-1;let a=1;for(let o=1;o<r;++o){let c=!1;const u=e[o],l=e[o+1];if(u!==l&&(o!==1||u!==e[0]))if(s)c=!0;else{const h=o*n,d=h-n,f=h+n;for(let g=0;g!==n;++g){const _=t[h+g];if(_!==t[d+g]||_!==t[f+g]){c=!0;break}}}if(c){if(o!==a){e[a]=e[o];const h=o*n,d=a*n;for(let f=0;f!==n;++f)t[d+f]=t[h+f]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,c=a*n,u=0;u!==n;++u)t[c+u]=t[o+u];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}}fn.prototype.ValueTypeName="";fn.prototype.TimeBufferType=Float32Array;fn.prototype.ValueBufferType=Float32Array;fn.prototype.DefaultInterpolation=Ss;class Yi extends fn{constructor(e,t,n){super(e,t,n)}}Yi.prototype.ValueTypeName="bool";Yi.prototype.ValueBufferType=Array;Yi.prototype.DefaultInterpolation=ys;Yi.prototype.InterpolantFactoryMethodLinear=void 0;Yi.prototype.InterpolantFactoryMethodSmooth=void 0;class mu extends fn{constructor(e,t,n,s){super(e,t,n,s)}}mu.prototype.ValueTypeName="color";class Wi extends fn{constructor(e,t,n,s){super(e,t,n,s)}}Wi.prototype.ValueTypeName="number";class Tf extends ws{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-t)/(s-t);let u=e*o;for(let l=u+o;u!==l;u+=4)Yn.slerpFlat(r,0,a,u-o,a,u,c);return r}}class Xi extends fn{constructor(e,t,n,s){super(e,t,n,s)}InterpolantFactoryMethodLinear(e){return new Tf(this.times,this.values,this.getValueSize(),e)}}Xi.prototype.ValueTypeName="quaternion";Xi.prototype.InterpolantFactoryMethodSmooth=void 0;class Ki extends fn{constructor(e,t,n){super(e,t,n)}}Ki.prototype.ValueTypeName="string";Ki.prototype.ValueBufferType=Array;Ki.prototype.DefaultInterpolation=ys;Ki.prototype.InterpolantFactoryMethodLinear=void 0;Ki.prototype.InterpolantFactoryMethodSmooth=void 0;class $i extends fn{constructor(e,t,n,s){super(e,t,n,s)}}$i.prototype.ValueTypeName="vector";class bf{constructor(e="",t=-1,n=[],s=td){this.name=e,this.tracks=n,this.duration=t,this.blendMode=s,this.uuid=un(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,s=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(Af(n[a]).scale(s));const r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r}static toJSON(e){const t=[],n=e.tracks,s={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let r=0,a=n.length;r!==a;++r)t.push(fn.toJSON(n[r]));return s}static CreateFromMorphTargetSequence(e,t,n,s){const r=t.length,a=[];for(let o=0;o<r;o++){let c=[],u=[];c.push((o+r-1)%r,o,(o+1)%r),u.push(0,1,0);const l=Mf(c);c=Bc(c,1,l),u=Bc(u,1,l),!s&&c[0]===0&&(c.push(r),u.push(u[0])),a.push(new Wi(".morphTargetInfluences["+t[o].name+"]",c,u).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const s=e;n=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<n.length;s++)if(n[s].name===t)return n[s];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const s={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,c=e.length;o<c;o++){const u=e[o],l=u.name.match(r);if(l&&l.length>1){const h=l[1];let d=s[h];d||(s[h]=d=[]),d.push(u)}}const a=[];for(const o in s)a.push(this.CreateFromMorphTargetSequence(o,s[o],t,n));return a}static parseAnimation(e,t){if(console.warn("THREE.AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(h,d,f,g,_){if(f.length!==0){const m=[],p=[];pu(f,m,p,g),m.length!==0&&_.push(new h(d,m,p))}},s=[],r=e.name||"default",a=e.fps||30,o=e.blendMode;let c=e.length||-1;const u=e.hierarchy||[];for(let h=0;h<u.length;h++){const d=u[h].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const f={};let g;for(g=0;g<d.length;g++)if(d[g].morphTargets)for(let _=0;_<d[g].morphTargets.length;_++)f[d[g].morphTargets[_]]=-1;for(const _ in f){const m=[],p=[];for(let E=0;E!==d[g].morphTargets.length;++E){const b=d[g];m.push(b.time),p.push(b.morphTarget===_?1:0)}s.push(new Wi(".morphTargetInfluence["+_+"]",m,p))}c=f.length*a}else{const f=".bones["+t[h].name+"]";n($i,f+".position",d,"pos",s),n(Xi,f+".quaternion",d,"rot",s),n($i,f+".scale",d,"scl",s)}}return s.length===0?null:new this(r,c,s,o)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,s=e.length;n!==s;++n){const r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function wf(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Wi;case"vector":case"vector2":case"vector3":case"vector4":return $i;case"color":return mu;case"quaternion":return Xi;case"bool":case"boolean":return Yi;case"string":return Ki}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function Af(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=wf(i.type);if(i.times===void 0){const t=[],n=[];pu(i.keys,t,n,"value"),i.times=t,i.values=n}return e.parse!==void 0?e.parse(i):new e(i.name,i.times,i.values,i.interpolation)}const In={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class Rf{constructor(e,t,n){const s=this;let r=!1,a=0,o=0,c;const u=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(l){o++,r===!1&&s.onStart!==void 0&&s.onStart(l,a,o),r=!0},this.itemEnd=function(l){a++,s.onProgress!==void 0&&s.onProgress(l,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(l){s.onError!==void 0&&s.onError(l)},this.resolveURL=function(l){return c?c(l):l},this.setURLModifier=function(l){return c=l,this},this.addHandler=function(l,h){return u.push(l,h),this},this.removeHandler=function(l){const h=u.indexOf(l);return h!==-1&&u.splice(h,2),this},this.getHandler=function(l){for(let h=0,d=u.length;h<d;h+=2){const f=u[h],g=u[h+1];if(f.global&&(f.lastIndex=0),f.test(l))return g}return null}}}const Cf=new Rf;class ji{constructor(e){this.manager=e!==void 0?e:Cf,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}ji.DEFAULT_MATERIAL_NAME="__DEFAULT";const An={};class Pf extends Error{constructor(e,t){super(e),this.response=t}}class gu extends ji{constructor(e){super(e),this.mimeType="",this.responseType=""}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=In.get(`file:${e}`);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(An[e]!==void 0){An[e].push({onLoad:t,onProgress:n,onError:s});return}An[e]=[],An[e].push({onLoad:t,onProgress:n,onError:s});const a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),o=this.mimeType,c=this.responseType;fetch(a).then(u=>{if(u.status===200||u.status===0){if(u.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||u.body===void 0||u.body.getReader===void 0)return u;const l=An[e],h=u.body.getReader(),d=u.headers.get("X-File-Size")||u.headers.get("Content-Length"),f=d?parseInt(d):0,g=f!==0;let _=0;const m=new ReadableStream({start(p){E();function E(){h.read().then(({done:b,value:x})=>{if(b)p.close();else{_+=x.byteLength;const P=new ProgressEvent("progress",{lengthComputable:g,loaded:_,total:f});for(let R=0,w=l.length;R<w;R++){const A=l[R];A.onProgress&&A.onProgress(P)}p.enqueue(x),E()}},b=>{p.error(b)})}}});return new Response(m)}else throw new Pf(`fetch for "${u.url}" responded with ${u.status}: ${u.statusText}`,u)}).then(u=>{switch(c){case"arraybuffer":return u.arrayBuffer();case"blob":return u.blob();case"document":return u.text().then(l=>new DOMParser().parseFromString(l,o));case"json":return u.json();default:if(o==="")return u.text();{const h=/charset="?([^;"\s]*)"?/i.exec(o),d=h&&h[1]?h[1].toLowerCase():void 0,f=new TextDecoder(d);return u.arrayBuffer().then(g=>f.decode(g))}}}).then(u=>{In.add(`file:${e}`,u);const l=An[e];delete An[e];for(let h=0,d=l.length;h<d;h++){const f=l[h];f.onLoad&&f.onLoad(u)}}).catch(u=>{const l=An[e];if(l===void 0)throw this.manager.itemError(e),u;delete An[e];for(let h=0,d=l.length;h<d;h++){const f=l[h];f.onError&&f.onError(u)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}const Ai=new WeakMap;class Lf extends ji{constructor(e){super(e)}load(e,t,n,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=In.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);else{let h=Ai.get(a);h===void 0&&(h=[],Ai.set(a,h)),h.push({onLoad:t,onError:s})}return a}const o=Es("img");function c(){l(),t&&t(this);const h=Ai.get(this)||[];for(let d=0;d<h.length;d++){const f=h[d];f.onLoad&&f.onLoad(this)}Ai.delete(this),r.manager.itemEnd(e)}function u(h){l(),s&&s(h),In.remove(`image:${e}`);const d=Ai.get(this)||[];for(let f=0;f<d.length;f++){const g=d[f];g.onError&&g.onError(h)}Ai.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function l(){o.removeEventListener("load",c,!1),o.removeEventListener("error",u,!1)}return o.addEventListener("load",c,!1),o.addEventListener("error",u,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),In.add(`image:${e}`,o),r.manager.itemStart(e),o.src=e,o}}class If extends ji{constructor(e){super(e)}load(e,t,n,s){const r=new St,a=new Lf(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},n,s),r}}class Tr extends ft{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Pe(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class kc extends Tr{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(ft.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Pe(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const sa=new Oe,zc=new N,Hc=new N;class Lo{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ne(512,512),this.mapType=xn,this.map=null,this.mapPass=null,this.matrix=new Oe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new bo,this._frameExtents=new Ne(1,1),this._viewportCount=1,this._viewports=[new Qe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;zc.setFromMatrixPosition(e.matrixWorld),t.position.copy(zc),Hc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Hc),t.updateMatrixWorld(),sa.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(sa),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(sa)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class Df extends Lo{constructor(){super(new Ut(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,n=zi*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(n!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class Nf extends Tr{constructor(e,t,n=0,s=Math.PI/3,r=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(ft.DEFAULT_UP),this.updateMatrix(),this.target=new ft,this.distance=n,this.angle=s,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new Df}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const Vc=new Oe,ls=new N,ra=new N;class Uf extends Lo{constructor(){super(new Ut(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Ne(4,2),this._viewportCount=6,this._viewports=[new Qe(2,1,1,1),new Qe(0,1,1,1),new Qe(3,1,1,1),new Qe(1,1,1,1),new Qe(3,0,1,1),new Qe(1,0,1,1)],this._cubeDirections=[new N(1,0,0),new N(-1,0,0),new N(0,0,1),new N(0,0,-1),new N(0,1,0),new N(0,-1,0)],this._cubeUps=[new N(0,1,0),new N(0,1,0),new N(0,1,0),new N(0,1,0),new N(0,0,1),new N(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,s=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),ls.setFromMatrixPosition(e.matrixWorld),n.position.copy(ls),ra.copy(n.position),ra.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(ra),n.updateMatrixWorld(),s.makeTranslation(-ls.x,-ls.y,-ls.z),Vc.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Vc)}}class _u extends Tr{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Uf}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class br extends au{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,a=n+e,o=s+t,c=s-t;if(this.view!==null&&this.view.enabled){const u=(this.right-this.left)/this.view.fullWidth/this.zoom,l=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=u*this.view.offsetX,a=r+u*this.view.width,o-=l*this.view.offsetY,c=o-l*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Ff extends Lo{constructor(){super(new br(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class fr extends Tr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ft.DEFAULT_UP),this.updateMatrix(),this.target=new ft,this.shadow=new Ff}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class gs{static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}const aa=new WeakMap;class Of extends ji{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=In.get(`image-bitmap:${e}`);if(a!==void 0){if(r.manager.itemStart(e),a.then){a.then(u=>{if(aa.has(a)===!0)s&&s(aa.get(a)),r.manager.itemError(e),r.manager.itemEnd(e);else return t&&t(u),r.manager.itemEnd(e),u});return}return setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0),a}const o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader;const c=fetch(e,o).then(function(u){return u.blob()}).then(function(u){return createImageBitmap(u,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(u){return In.add(`image-bitmap:${e}`,u),t&&t(u),r.manager.itemEnd(e),u}).catch(function(u){s&&s(u),aa.set(c,u),In.remove(`image-bitmap:${e}`),r.manager.itemError(e),r.manager.itemEnd(e)});In.add(`image-bitmap:${e}`,c),r.manager.itemStart(e)}}class Bf extends Ut{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const Io="\\[\\]\\.:\\/",kf=new RegExp("["+Io+"]","g"),Do="[^"+Io+"]",zf="[^"+Io.replace("\\.","")+"]",Hf=/((?:WC+[\/:])*)/.source.replace("WC",Do),Vf=/(WCOD+)?/.source.replace("WCOD",zf),Gf=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Do),Wf=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Do),Xf=new RegExp("^"+Hf+Vf+Gf+Wf+"$"),$f=["material","materials","bones","map"];class qf{constructor(e,t,n){const s=n||it.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class it{constructor(e,t,n){this.path=t,this.parsedPath=n||it.parseTrackName(t),this.node=it.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new it.Composite(e,t,n):new it(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(kf,"")}static parseTrackName(e){const t=Xf.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){const r=n.nodeName.substring(s+1);$f.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(r){for(let a=0;a<r.length;a++){const o=r[a];if(o.name===t||o.uuid===t)return o;const c=n(o.children);if(c)return c}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,s=t.propertyName;let r=t.propertyIndex;if(e||(e=it.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let u=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let l=0;l<e.length;l++)if(e[l].name===u){u=l;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(u!==void 0){if(e[u]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[u]}}const a=e[s];if(a===void 0){const u=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+u+"."+s+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}it.Composite=qf;it.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};it.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};it.prototype.GetterByBindingType=[it.prototype._getValue_direct,it.prototype._getValue_array,it.prototype._getValue_arrayElement,it.prototype._getValue_toArray];it.prototype.SetterByBindingTypeAndVersioning=[[it.prototype._setValue_direct,it.prototype._setValue_direct_setNeedsUpdate,it.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[it.prototype._setValue_array,it.prototype._setValue_array_setNeedsUpdate,it.prototype._setValue_array_setMatrixWorldNeedsUpdate],[it.prototype._setValue_arrayElement,it.prototype._setValue_arrayElement_setNeedsUpdate,it.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[it.prototype._setValue_fromArray,it.prototype._setValue_fromArray_setNeedsUpdate,it.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];function Gc(i,e,t,n){const s=Yf(n);switch(t){case $l:return i*e;case _o:return i*e/s.components*s.byteLength;case vo:return i*e/s.components*s.byteLength;case Yl:return i*e*2/s.components*s.byteLength;case xo:return i*e*2/s.components*s.byteLength;case ql:return i*e*3/s.components*s.byteLength;case Qt:return i*e*4/s.components*s.byteLength;case Mo:return i*e*4/s.components*s.byteLength;case cr:case lr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case ur:case hr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case La:case Da:return Math.max(i,16)*Math.max(e,8)/4;case Pa:case Ia:return Math.max(i,8)*Math.max(e,8)/2;case Na:case Ua:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Fa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Oa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ba:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case ka:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case za:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Ha:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Va:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Ga:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Wa:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Xa:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case $a:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case qa:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Ya:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Ka:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case ja:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case dr:case Za:case Ja:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Kl:case Qa:return Math.ceil(i/4)*Math.ceil(e/4)*8;case eo:case to:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Yf(i){switch(i){case xn:case Gl:return{byteLength:1,components:1};case _s:case Wl:case bs:return{byteLength:2,components:1};case mo:case go:return{byteLength:2,components:4};case ui:case po:case ln:return{byteLength:4,components:1};case Xl:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:fo}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=fo);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function vu(){let i=null,e=!1,t=null,n=null;function s(r,a){t(r,a),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function Kf(i){const e=new WeakMap;function t(o,c){const u=o.array,l=o.usage,h=u.byteLength,d=i.createBuffer();i.bindBuffer(c,d),i.bufferData(c,u,l),o.onUploadCallback();let f;if(u instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&u instanceof Float16Array)f=i.HALF_FLOAT;else if(u instanceof Uint16Array)o.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(u instanceof Int16Array)f=i.SHORT;else if(u instanceof Uint32Array)f=i.UNSIGNED_INT;else if(u instanceof Int32Array)f=i.INT;else if(u instanceof Int8Array)f=i.BYTE;else if(u instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:d,type:f,bytesPerElement:u.BYTES_PER_ELEMENT,version:o.version,size:h}}function n(o,c,u){const l=c.array,h=c.updateRanges;if(i.bindBuffer(u,o),h.length===0)i.bufferSubData(u,0,l);else{h.sort((f,g)=>f.start-g.start);let d=0;for(let f=1;f<h.length;f++){const g=h[d],_=h[f];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++d,h[d]=_)}h.length=d+1;for(let f=0,g=h.length;f<g;f++){const _=h[f];i.bufferSubData(u,_.start*l.BYTES_PER_ELEMENT,l,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=e.get(o);c&&(i.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const l=e.get(o);(!l||l.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const u=e.get(o);if(u===void 0)e.set(o,t(o,c));else if(u.version<o.version){if(u.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(u.buffer,o,c),u.version=o.version}}return{get:s,remove:r,update:a}}var jf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Zf=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Jf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Qf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ep=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,tp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,np=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,ip=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,sp=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,rp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,ap=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,op=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,cp=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,lp=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,up=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,hp=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,dp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,fp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,pp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,mp=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,gp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,_p=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,vp=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,xp=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Mp=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,yp=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Sp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Ep=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Tp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,bp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,wp="gl_FragColor = linearToOutputTexel( gl_FragColor );",Ap=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Rp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Cp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Pp=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Lp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Ip=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Dp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Np=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Up=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Fp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Op=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Bp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,kp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,zp=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Hp=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Vp=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Gp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Wp=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Xp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,$p=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,qp=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Yp=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Kp=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,jp=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Zp=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Jp=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Qp=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,em=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,tm=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,nm=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,im=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,sm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,rm=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,am=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,om=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,cm=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,lm=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,um=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,hm=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,dm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,fm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,pm=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,mm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,gm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,_m=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,vm=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,xm=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Mm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,ym=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Sm=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Em=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Tm=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,bm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,wm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Am=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Rm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Cm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Pm=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Lm=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Im=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Dm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Nm=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Um=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Fm=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Om=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Bm=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,km=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,zm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Hm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Vm=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Gm=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Wm=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Xm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,$m=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,qm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Ym=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Km=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,jm=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Zm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Jm=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Qm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,eg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,tg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,ng=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,ig=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,sg=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,rg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,ag=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,og=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,cg=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,lg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,ug=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,hg=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,dg=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,fg=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,pg=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,mg=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,gg=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,_g=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,vg=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,xg=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Mg=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,yg=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Sg=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Eg=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Tg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,bg=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,wg=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ag=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Rg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ke={alphahash_fragment:jf,alphahash_pars_fragment:Zf,alphamap_fragment:Jf,alphamap_pars_fragment:Qf,alphatest_fragment:ep,alphatest_pars_fragment:tp,aomap_fragment:np,aomap_pars_fragment:ip,batching_pars_vertex:sp,batching_vertex:rp,begin_vertex:ap,beginnormal_vertex:op,bsdfs:cp,iridescence_fragment:lp,bumpmap_pars_fragment:up,clipping_planes_fragment:hp,clipping_planes_pars_fragment:dp,clipping_planes_pars_vertex:fp,clipping_planes_vertex:pp,color_fragment:mp,color_pars_fragment:gp,color_pars_vertex:_p,color_vertex:vp,common:xp,cube_uv_reflection_fragment:Mp,defaultnormal_vertex:yp,displacementmap_pars_vertex:Sp,displacementmap_vertex:Ep,emissivemap_fragment:Tp,emissivemap_pars_fragment:bp,colorspace_fragment:wp,colorspace_pars_fragment:Ap,envmap_fragment:Rp,envmap_common_pars_fragment:Cp,envmap_pars_fragment:Pp,envmap_pars_vertex:Lp,envmap_physical_pars_fragment:Vp,envmap_vertex:Ip,fog_vertex:Dp,fog_pars_vertex:Np,fog_fragment:Up,fog_pars_fragment:Fp,gradientmap_pars_fragment:Op,lightmap_pars_fragment:Bp,lights_lambert_fragment:kp,lights_lambert_pars_fragment:zp,lights_pars_begin:Hp,lights_toon_fragment:Gp,lights_toon_pars_fragment:Wp,lights_phong_fragment:Xp,lights_phong_pars_fragment:$p,lights_physical_fragment:qp,lights_physical_pars_fragment:Yp,lights_fragment_begin:Kp,lights_fragment_maps:jp,lights_fragment_end:Zp,logdepthbuf_fragment:Jp,logdepthbuf_pars_fragment:Qp,logdepthbuf_pars_vertex:em,logdepthbuf_vertex:tm,map_fragment:nm,map_pars_fragment:im,map_particle_fragment:sm,map_particle_pars_fragment:rm,metalnessmap_fragment:am,metalnessmap_pars_fragment:om,morphinstance_vertex:cm,morphcolor_vertex:lm,morphnormal_vertex:um,morphtarget_pars_vertex:hm,morphtarget_vertex:dm,normal_fragment_begin:fm,normal_fragment_maps:pm,normal_pars_fragment:mm,normal_pars_vertex:gm,normal_vertex:_m,normalmap_pars_fragment:vm,clearcoat_normal_fragment_begin:xm,clearcoat_normal_fragment_maps:Mm,clearcoat_pars_fragment:ym,iridescence_pars_fragment:Sm,opaque_fragment:Em,packing:Tm,premultiplied_alpha_fragment:bm,project_vertex:wm,dithering_fragment:Am,dithering_pars_fragment:Rm,roughnessmap_fragment:Cm,roughnessmap_pars_fragment:Pm,shadowmap_pars_fragment:Lm,shadowmap_pars_vertex:Im,shadowmap_vertex:Dm,shadowmask_pars_fragment:Nm,skinbase_vertex:Um,skinning_pars_vertex:Fm,skinning_vertex:Om,skinnormal_vertex:Bm,specularmap_fragment:km,specularmap_pars_fragment:zm,tonemapping_fragment:Hm,tonemapping_pars_fragment:Vm,transmission_fragment:Gm,transmission_pars_fragment:Wm,uv_pars_fragment:Xm,uv_pars_vertex:$m,uv_vertex:qm,worldpos_vertex:Ym,background_vert:Km,background_frag:jm,backgroundCube_vert:Zm,backgroundCube_frag:Jm,cube_vert:Qm,cube_frag:eg,depth_vert:tg,depth_frag:ng,distanceRGBA_vert:ig,distanceRGBA_frag:sg,equirect_vert:rg,equirect_frag:ag,linedashed_vert:og,linedashed_frag:cg,meshbasic_vert:lg,meshbasic_frag:ug,meshlambert_vert:hg,meshlambert_frag:dg,meshmatcap_vert:fg,meshmatcap_frag:pg,meshnormal_vert:mg,meshnormal_frag:gg,meshphong_vert:_g,meshphong_frag:vg,meshphysical_vert:xg,meshphysical_frag:Mg,meshtoon_vert:yg,meshtoon_frag:Sg,points_vert:Eg,points_frag:Tg,shadow_vert:bg,shadow_frag:wg,sprite_vert:Ag,sprite_frag:Rg},ue={common:{diffuse:{value:new Pe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Fe},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Fe}},envmap:{envMap:{value:null},envMapRotation:{value:new Fe},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Fe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Fe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Fe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Fe},normalScale:{value:new Ne(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Fe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Fe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Fe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Fe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Pe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Pe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0},uvTransform:{value:new Fe}},sprite:{diffuse:{value:new Pe(16777215)},opacity:{value:1},center:{value:new Ne(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Fe},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0}}},gn={basic:{uniforms:Nt([ue.common,ue.specularmap,ue.envmap,ue.aomap,ue.lightmap,ue.fog]),vertexShader:ke.meshbasic_vert,fragmentShader:ke.meshbasic_frag},lambert:{uniforms:Nt([ue.common,ue.specularmap,ue.envmap,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.fog,ue.lights,{emissive:{value:new Pe(0)}}]),vertexShader:ke.meshlambert_vert,fragmentShader:ke.meshlambert_frag},phong:{uniforms:Nt([ue.common,ue.specularmap,ue.envmap,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.fog,ue.lights,{emissive:{value:new Pe(0)},specular:{value:new Pe(1118481)},shininess:{value:30}}]),vertexShader:ke.meshphong_vert,fragmentShader:ke.meshphong_frag},standard:{uniforms:Nt([ue.common,ue.envmap,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.roughnessmap,ue.metalnessmap,ue.fog,ue.lights,{emissive:{value:new Pe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ke.meshphysical_vert,fragmentShader:ke.meshphysical_frag},toon:{uniforms:Nt([ue.common,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.gradientmap,ue.fog,ue.lights,{emissive:{value:new Pe(0)}}]),vertexShader:ke.meshtoon_vert,fragmentShader:ke.meshtoon_frag},matcap:{uniforms:Nt([ue.common,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.fog,{matcap:{value:null}}]),vertexShader:ke.meshmatcap_vert,fragmentShader:ke.meshmatcap_frag},points:{uniforms:Nt([ue.points,ue.fog]),vertexShader:ke.points_vert,fragmentShader:ke.points_frag},dashed:{uniforms:Nt([ue.common,ue.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ke.linedashed_vert,fragmentShader:ke.linedashed_frag},depth:{uniforms:Nt([ue.common,ue.displacementmap]),vertexShader:ke.depth_vert,fragmentShader:ke.depth_frag},normal:{uniforms:Nt([ue.common,ue.bumpmap,ue.normalmap,ue.displacementmap,{opacity:{value:1}}]),vertexShader:ke.meshnormal_vert,fragmentShader:ke.meshnormal_frag},sprite:{uniforms:Nt([ue.sprite,ue.fog]),vertexShader:ke.sprite_vert,fragmentShader:ke.sprite_frag},background:{uniforms:{uvTransform:{value:new Fe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ke.background_vert,fragmentShader:ke.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Fe}},vertexShader:ke.backgroundCube_vert,fragmentShader:ke.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ke.cube_vert,fragmentShader:ke.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ke.equirect_vert,fragmentShader:ke.equirect_frag},distanceRGBA:{uniforms:Nt([ue.common,ue.displacementmap,{referencePosition:{value:new N},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ke.distanceRGBA_vert,fragmentShader:ke.distanceRGBA_frag},shadow:{uniforms:Nt([ue.lights,ue.fog,{color:{value:new Pe(0)},opacity:{value:1}}]),vertexShader:ke.shadow_vert,fragmentShader:ke.shadow_frag}};gn.physical={uniforms:Nt([gn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Fe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Fe},clearcoatNormalScale:{value:new Ne(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Fe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Fe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Fe},sheen:{value:0},sheenColor:{value:new Pe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Fe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Fe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Fe},transmissionSamplerSize:{value:new Ne},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Fe},attenuationDistance:{value:0},attenuationColor:{value:new Pe(0)},specularColor:{value:new Pe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Fe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Fe},anisotropyVector:{value:new Ne},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Fe}}]),vertexShader:ke.meshphysical_vert,fragmentShader:ke.meshphysical_frag};const ir={r:0,b:0,g:0},ei=new Mn,Cg=new Oe;function Pg(i,e,t,n,s,r,a){const o=new Pe(0);let c=r===!0?0:1,u,l,h=null,d=0,f=null;function g(b){let x=b.isScene===!0?b.background:null;return x&&x.isTexture&&(x=(b.backgroundBlurriness>0?t:e).get(x)),x}function _(b){let x=!1;const P=g(b);P===null?p(o,c):P&&P.isColor&&(p(P,1),x=!0);const R=i.xr.getEnvironmentBlendMode();R==="additive"?n.buffers.color.setClear(0,0,0,1,a):R==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||x)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(b,x){const P=g(x);P&&(P.isCubeTexture||P.mapping===Sr)?(l===void 0&&(l=new Ke(new Jt(1,1,1),new qn({name:"BackgroundCubeMaterial",uniforms:Hi(gn.backgroundCube.uniforms),vertexShader:gn.backgroundCube.vertexShader,fragmentShader:gn.backgroundCube.fragmentShader,side:Ct,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(R,w,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(l)),ei.copy(x.backgroundRotation),ei.x*=-1,ei.y*=-1,ei.z*=-1,P.isCubeTexture&&P.isRenderTargetTexture===!1&&(ei.y*=-1,ei.z*=-1),l.material.uniforms.envMap.value=P,l.material.uniforms.flipEnvMap.value=P.isCubeTexture&&P.isRenderTargetTexture===!1?-1:1,l.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Cg.makeRotationFromEuler(ei)),l.material.toneMapped=Ye.getTransfer(P.colorSpace)!==at,(h!==P||d!==P.version||f!==i.toneMapping)&&(l.material.needsUpdate=!0,h=P,d=P.version,f=i.toneMapping),l.layers.enableAll(),b.unshift(l,l.geometry,l.material,0,0,null)):P&&P.isTexture&&(u===void 0&&(u=new Ke(new Vi(2,2),new qn({name:"BackgroundMaterial",uniforms:Hi(gn.background.uniforms),vertexShader:gn.background.vertexShader,fragmentShader:gn.background.fragmentShader,side:Nn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),Object.defineProperty(u.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(u)),u.material.uniforms.t2D.value=P,u.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,u.material.toneMapped=Ye.getTransfer(P.colorSpace)!==at,P.matrixAutoUpdate===!0&&P.updateMatrix(),u.material.uniforms.uvTransform.value.copy(P.matrix),(h!==P||d!==P.version||f!==i.toneMapping)&&(u.material.needsUpdate=!0,h=P,d=P.version,f=i.toneMapping),u.layers.enableAll(),b.unshift(u,u.geometry,u.material,0,0,null))}function p(b,x){b.getRGB(ir,ru(i)),n.buffers.color.setClear(ir.r,ir.g,ir.b,x,a)}function E(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0)}return{getClearColor:function(){return o},setClearColor:function(b,x=1){o.set(b),c=x,p(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(b){c=b,p(o,c)},render:_,addToRenderList:m,dispose:E}}function Lg(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null);let r=s,a=!1;function o(v,I,H,z,X){let Y=!1;const $=h(z,H,I);r!==$&&(r=$,u(r.object)),Y=f(v,z,H,X),Y&&g(v,z,H,X),X!==null&&e.update(X,i.ELEMENT_ARRAY_BUFFER),(Y||a)&&(a=!1,x(v,I,H,z),X!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(X).buffer))}function c(){return i.createVertexArray()}function u(v){return i.bindVertexArray(v)}function l(v){return i.deleteVertexArray(v)}function h(v,I,H){const z=H.wireframe===!0;let X=n[v.id];X===void 0&&(X={},n[v.id]=X);let Y=X[I.id];Y===void 0&&(Y={},X[I.id]=Y);let $=Y[z];return $===void 0&&($=d(c()),Y[z]=$),$}function d(v){const I=[],H=[],z=[];for(let X=0;X<t;X++)I[X]=0,H[X]=0,z[X]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:H,attributeDivisors:z,object:v,attributes:{},index:null}}function f(v,I,H,z){const X=r.attributes,Y=I.attributes;let $=0;const te=H.getAttributes();for(const W in te)if(te[W].location>=0){const pe=X[W];let we=Y[W];if(we===void 0&&(W==="instanceMatrix"&&v.instanceMatrix&&(we=v.instanceMatrix),W==="instanceColor"&&v.instanceColor&&(we=v.instanceColor)),pe===void 0||pe.attribute!==we||we&&pe.data!==we.data)return!0;$++}return r.attributesNum!==$||r.index!==z}function g(v,I,H,z){const X={},Y=I.attributes;let $=0;const te=H.getAttributes();for(const W in te)if(te[W].location>=0){let pe=Y[W];pe===void 0&&(W==="instanceMatrix"&&v.instanceMatrix&&(pe=v.instanceMatrix),W==="instanceColor"&&v.instanceColor&&(pe=v.instanceColor));const we={};we.attribute=pe,pe&&pe.data&&(we.data=pe.data),X[W]=we,$++}r.attributes=X,r.attributesNum=$,r.index=z}function _(){const v=r.newAttributes;for(let I=0,H=v.length;I<H;I++)v[I]=0}function m(v){p(v,0)}function p(v,I){const H=r.newAttributes,z=r.enabledAttributes,X=r.attributeDivisors;H[v]=1,z[v]===0&&(i.enableVertexAttribArray(v),z[v]=1),X[v]!==I&&(i.vertexAttribDivisor(v,I),X[v]=I)}function E(){const v=r.newAttributes,I=r.enabledAttributes;for(let H=0,z=I.length;H<z;H++)I[H]!==v[H]&&(i.disableVertexAttribArray(H),I[H]=0)}function b(v,I,H,z,X,Y,$){$===!0?i.vertexAttribIPointer(v,I,H,X,Y):i.vertexAttribPointer(v,I,H,z,X,Y)}function x(v,I,H,z){_();const X=z.attributes,Y=H.getAttributes(),$=I.defaultAttributeValues;for(const te in Y){const W=Y[te];if(W.location>=0){let he=X[te];if(he===void 0&&(te==="instanceMatrix"&&v.instanceMatrix&&(he=v.instanceMatrix),te==="instanceColor"&&v.instanceColor&&(he=v.instanceColor)),he!==void 0){const pe=he.normalized,we=he.itemSize,Ce=e.get(he);if(Ce===void 0)continue;const je=Ce.buffer,K=Ce.type,ce=Ce.bytesPerElement,Ee=K===i.INT||K===i.UNSIGNED_INT||he.gpuType===po;if(he.isInterleavedBufferAttribute){const fe=he.data,me=fe.stride,Ge=he.offset;if(fe.isInstancedInterleavedBuffer){for(let xe=0;xe<W.locationSize;xe++)p(W.location+xe,fe.meshPerAttribute);v.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=fe.meshPerAttribute*fe.count)}else for(let xe=0;xe<W.locationSize;xe++)m(W.location+xe);i.bindBuffer(i.ARRAY_BUFFER,je);for(let xe=0;xe<W.locationSize;xe++)b(W.location+xe,we/W.locationSize,K,pe,me*ce,(Ge+we/W.locationSize*xe)*ce,Ee)}else{if(he.isInstancedBufferAttribute){for(let fe=0;fe<W.locationSize;fe++)p(W.location+fe,he.meshPerAttribute);v.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=he.meshPerAttribute*he.count)}else for(let fe=0;fe<W.locationSize;fe++)m(W.location+fe);i.bindBuffer(i.ARRAY_BUFFER,je);for(let fe=0;fe<W.locationSize;fe++)b(W.location+fe,we/W.locationSize,K,pe,we*ce,we/W.locationSize*fe*ce,Ee)}}else if($!==void 0){const pe=$[te];if(pe!==void 0)switch(pe.length){case 2:i.vertexAttrib2fv(W.location,pe);break;case 3:i.vertexAttrib3fv(W.location,pe);break;case 4:i.vertexAttrib4fv(W.location,pe);break;default:i.vertexAttrib1fv(W.location,pe)}}}}E()}function P(){A();for(const v in n){const I=n[v];for(const H in I){const z=I[H];for(const X in z)l(z[X].object),delete z[X];delete I[H]}delete n[v]}}function R(v){if(n[v.id]===void 0)return;const I=n[v.id];for(const H in I){const z=I[H];for(const X in z)l(z[X].object),delete z[X];delete I[H]}delete n[v.id]}function w(v){for(const I in n){const H=n[I];if(H[v.id]===void 0)continue;const z=H[v.id];for(const X in z)l(z[X].object),delete z[X];delete H[v.id]}}function A(){S(),a=!0,r!==s&&(r=s,u(r.object))}function S(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:A,resetDefaultState:S,dispose:P,releaseStatesOfGeometry:R,releaseStatesOfProgram:w,initAttributes:_,enableAttribute:m,disableUnusedAttributes:E}}function Ig(i,e,t){let n;function s(u){n=u}function r(u,l){i.drawArrays(n,u,l),t.update(l,n,1)}function a(u,l,h){h!==0&&(i.drawArraysInstanced(n,u,l,h),t.update(l,n,h))}function o(u,l,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,u,0,l,0,h);let f=0;for(let g=0;g<h;g++)f+=l[g];t.update(f,n,1)}function c(u,l,h,d){if(h===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<u.length;g++)a(u[g],l[g],d[g]);else{f.multiDrawArraysInstancedWEBGL(n,u,0,l,0,d,0,h);let g=0;for(let _=0;_<h;_++)g+=l[_]*d[_];t.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function Dg(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const w=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(w){return!(w!==Qt&&n.convert(w)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(w){const A=w===bs&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(w!==xn&&n.convert(w)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&w!==ln&&!A)}function c(w){if(w==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let u=t.precision!==void 0?t.precision:"highp";const l=c(u);l!==u&&(console.warn("THREE.WebGLRenderer:",u,"not supported, using",l,"instead."),u=l);const h=t.logarithmicDepthBuffer===!0,d=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),E=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),b=i.getParameter(i.MAX_VARYING_VECTORS),x=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),P=g>0,R=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:u,logarithmicDepthBuffer:h,reverseDepthBuffer:d,maxTextures:f,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:E,maxVaryings:b,maxFragmentUniforms:x,vertexTextures:P,maxSamples:R}}function Ng(i){const e=this;let t=null,n=0,s=!1,r=!1;const a=new si,o=new Fe,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){const f=h.length!==0||d||n!==0||s;return s=d,n=h.length,f},this.beginShadows=function(){r=!0,l(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,d){t=l(h,d,0)},this.setState=function(h,d,f){const g=h.clippingPlanes,_=h.clipIntersection,m=h.clipShadows,p=i.get(h);if(!s||g===null||g.length===0||r&&!m)r?l(null):u();else{const E=r?0:n,b=E*4;let x=p.clippingState||null;c.value=x,x=l(g,d,b,f);for(let P=0;P!==b;++P)x[P]=t[P];p.clippingState=x,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=E}};function u(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function l(h,d,f,g){const _=h!==null?h.length:0;let m=null;if(_!==0){if(m=c.value,g!==!0||m===null){const p=f+_*4,E=d.matrixWorldInverse;o.getNormalMatrix(E),(m===null||m.length<p)&&(m=new Float32Array(p));for(let b=0,x=f;b!==_;++b,x+=4)a.copy(h[b]).applyMatrix4(E,o),a.normal.toArray(m,x),m[x+3]=a.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function Ug(i){let e=new WeakMap;function t(a,o){return o===Ra?a.mapping=Oi:o===Ca&&(a.mapping=Bi),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===Ra||o===Ca)if(e.has(a)){const c=e.get(a).texture;return t(c,a.mapping)}else{const c=a.image;if(c&&c.height>0){const u=new nf(c.height);return u.fromEquirectangularTexture(i,a),e.set(a,u),a.addEventListener("dispose",s),t(u.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const c=e.get(o);c!==void 0&&(e.delete(o),c.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}const Li=4,Wc=[.125,.215,.35,.446,.526,.582],oi=20,oa=new br,Xc=new Pe;let ca=null,la=0,ua=0,ha=!1;const ri=(1+Math.sqrt(5))/2,Ri=1/ri,$c=[new N(-ri,Ri,0),new N(ri,Ri,0),new N(-Ri,0,ri),new N(Ri,0,ri),new N(0,ri,-Ri),new N(0,ri,Ri),new N(-1,1,-1),new N(1,1,-1),new N(-1,1,1),new N(1,1,1)],Fg=new N;class oo{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100,r={}){const{size:a=256,position:o=Fg}=r;ca=this._renderer.getRenderTarget(),la=this._renderer.getActiveCubeFace(),ua=this._renderer.getActiveMipmapLevel(),ha=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,s,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Kc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Yc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(ca,la,ua),this._renderer.xr.enabled=ha,e.scissorTest=!1,sr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Oi||e.mapping===Bi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ca=this._renderer.getRenderTarget(),la=this._renderer.getActiveCubeFace(),ua=this._renderer.getActiveMipmapLevel(),ha=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:qt,minFilter:qt,generateMipmaps:!1,type:bs,format:Qt,colorSpace:kt,depthBuffer:!1},s=qc(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=qc(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Og(r)),this._blurMaterial=Bg(r,e,t)}return s}_compileMaterial(e){const t=new Ke(this._lodPlanes[0],e);this._renderer.compile(t,oa)}_sceneToCubeUV(e,t,n,s,r){const c=new Ut(90,1,t,n),u=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,f=h.toneMapping;h.getClearColor(Xc),h.toneMapping=$n,h.autoClear=!1;const g=new Ft({name:"PMREM.Background",side:Ct,depthWrite:!1,depthTest:!1}),_=new Ke(new Jt,g);let m=!1;const p=e.background;p?p.isColor&&(g.color.copy(p),e.background=null,m=!0):(g.color.copy(Xc),m=!0);for(let E=0;E<6;E++){const b=E%3;b===0?(c.up.set(0,u[E],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+l[E],r.y,r.z)):b===1?(c.up.set(0,0,u[E]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+l[E],r.z)):(c.up.set(0,u[E],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+l[E]));const x=this._cubeSize;sr(s,b*x,E>2?x:0,x,x),h.setRenderTarget(s),m&&h.render(_,c),h.render(e,c)}_.geometry.dispose(),_.material.dispose(),h.toneMapping=f,h.autoClear=d,e.background=p}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===Oi||e.mapping===Bi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Kc()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Yc());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new Ke(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;const c=this._cubeSize;sr(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(a,oa)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=$c[(s-r-1)%$c.length];this._blur(e,r-1,r,a,o)}t.autoClear=n}_blur(e,t,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,s,"latitudinal",r),this._halfBlur(a,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,a,o){const c=this._renderer,u=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const l=3,h=new Ke(this._lodPlanes[s],u),d=u.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*oi-1),_=r/g,m=isFinite(r)?1+Math.floor(l*_):oi;m>oi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${oi}`);const p=[];let E=0;for(let w=0;w<oi;++w){const A=w/_,S=Math.exp(-A*A/2);p.push(S),w===0?E+=S:w<m&&(E+=2*S)}for(let w=0;w<p.length;w++)p[w]=p[w]/E;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:b}=this;d.dTheta.value=g,d.mipInt.value=b-n;const x=this._sizeLods[s],P=3*x*(s>b-Li?s-b+Li:0),R=4*(this._cubeSize-x);sr(t,P,R,3*x,2*x),c.setRenderTarget(t),c.render(h,oa)}}function Og(i){const e=[],t=[],n=[];let s=i;const r=i-Li+1+Wc.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);t.push(o);let c=1/o;a>i-Li?c=Wc[a-i+Li-1]:a===0&&(c=0),n.push(c);const u=1/(o-2),l=-u,h=1+u,d=[l,l,h,l,h,h,l,l,h,h,l,h],f=6,g=6,_=3,m=2,p=1,E=new Float32Array(_*g*f),b=new Float32Array(m*g*f),x=new Float32Array(p*g*f);for(let R=0;R<f;R++){const w=R%3*2/3-1,A=R>2?0:-1,S=[w,A,0,w+2/3,A,0,w+2/3,A+1,0,w,A,0,w+2/3,A+1,0,w,A+1,0];E.set(S,_*g*R),b.set(d,m*g*R);const v=[R,R,R,R,R,R];x.set(v,p*g*R)}const P=new Pt;P.setAttribute("position",new Bt(E,_)),P.setAttribute("uv",new Bt(b,m)),P.setAttribute("faceIndex",new Bt(x,p)),e.push(P),s>Li&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function qc(i,e,t){const n=new hi(i,e,t);return n.texture.mapping=Sr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function sr(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function Bg(i,e,t){const n=new Float32Array(oi),s=new N(0,1,0);return new qn({name:"SphericalGaussianBlur",defines:{n:oi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:No(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Xn,depthTest:!1,depthWrite:!1})}function Yc(){return new qn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:No(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Xn,depthTest:!1,depthWrite:!1})}function Kc(){return new qn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:No(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Xn,depthTest:!1,depthWrite:!1})}function No(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function kg(i){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const c=o.mapping,u=c===Ra||c===Ca,l=c===Oi||c===Bi;if(u||l){let h=e.get(o);const d=h!==void 0?h.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==d)return t===null&&(t=new oo(i)),h=u?t.fromEquirectangular(o,h):t.fromCubemap(o,h),h.texture.pmremVersion=o.pmremVersion,e.set(o,h),h.texture;if(h!==void 0)return h.texture;{const f=o.image;return u&&f&&f.height>0||l&&f&&s(f)?(t===null&&(t=new oo(i)),h=u?t.fromEquirectangular(o):t.fromCubemap(o),h.texture.pmremVersion=o.pmremVersion,e.set(o,h),o.addEventListener("dispose",r),h.texture):null}}}return o}function s(o){let c=0;const u=6;for(let l=0;l<u;l++)o[l]!==void 0&&c++;return c===u}function r(o){const c=o.target;c.removeEventListener("dispose",r);const u=e.get(c);u!==void 0&&(e.delete(c),u.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function zg(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&Di("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function Hg(i,e,t,n){const s={},r=new WeakMap;function a(h){const d=h.target;d.index!==null&&e.remove(d.index);for(const g in d.attributes)e.remove(d.attributes[g]);d.removeEventListener("dispose",a),delete s[d.id];const f=r.get(d);f&&(e.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(h,d){return s[d.id]===!0||(d.addEventListener("dispose",a),s[d.id]=!0,t.memory.geometries++),d}function c(h){const d=h.attributes;for(const f in d)e.update(d[f],i.ARRAY_BUFFER)}function u(h){const d=[],f=h.index,g=h.attributes.position;let _=0;if(f!==null){const E=f.array;_=f.version;for(let b=0,x=E.length;b<x;b+=3){const P=E[b+0],R=E[b+1],w=E[b+2];d.push(P,R,R,w,w,P)}}else if(g!==void 0){const E=g.array;_=g.version;for(let b=0,x=E.length/3-1;b<x;b+=3){const P=b+0,R=b+1,w=b+2;d.push(P,R,R,w,w,P)}}else return;const m=new(Ql(d)?su:iu)(d,1);m.version=_;const p=r.get(h);p&&e.remove(p),r.set(h,m)}function l(h){const d=r.get(h);if(d){const f=h.index;f!==null&&d.version<f.version&&u(h)}else u(h);return r.get(h)}return{get:o,update:c,getWireframeAttribute:l}}function Vg(i,e,t){let n;function s(d){n=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function c(d,f){i.drawElements(n,f,r,d*a),t.update(f,n,1)}function u(d,f,g){g!==0&&(i.drawElementsInstanced(n,f,r,d*a,g),t.update(f,n,g))}function l(d,f,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,d,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];t.update(m,n,1)}function h(d,f,g,_){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<d.length;p++)u(d[p]/a,f[p],_[p]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,r,d,0,_,0,g);let p=0;for(let E=0;E<g;E++)p+=f[E]*_[E];t.update(p,n,1)}}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=u,this.renderMultiDraw=l,this.renderMultiDrawInstances=h}function Gg(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function Wg(i,e,t){const n=new WeakMap,s=new Qe;function r(a,o,c){const u=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=l!==void 0?l.length:0;let d=n.get(o);if(d===void 0||d.count!==h){let v=function(){A.dispose(),n.delete(o),o.removeEventListener("dispose",v)};var f=v;d!==void 0&&d.texture.dispose();const g=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],E=o.morphAttributes.normal||[],b=o.morphAttributes.color||[];let x=0;g===!0&&(x=1),_===!0&&(x=2),m===!0&&(x=3);let P=o.attributes.position.count*x,R=1;P>e.maxTextureSize&&(R=Math.ceil(P/e.maxTextureSize),P=e.maxTextureSize);const w=new Float32Array(P*R*4*h),A=new eu(w,P,R,h);A.type=ln,A.needsUpdate=!0;const S=x*4;for(let I=0;I<h;I++){const H=p[I],z=E[I],X=b[I],Y=P*R*4*I;for(let $=0;$<H.count;$++){const te=$*S;g===!0&&(s.fromBufferAttribute(H,$),w[Y+te+0]=s.x,w[Y+te+1]=s.y,w[Y+te+2]=s.z,w[Y+te+3]=0),_===!0&&(s.fromBufferAttribute(z,$),w[Y+te+4]=s.x,w[Y+te+5]=s.y,w[Y+te+6]=s.z,w[Y+te+7]=0),m===!0&&(s.fromBufferAttribute(X,$),w[Y+te+8]=s.x,w[Y+te+9]=s.y,w[Y+te+10]=s.z,w[Y+te+11]=X.itemSize===4?s.w:1)}}d={count:h,texture:A,size:new Ne(P,R)},n.set(o,d),o.addEventListener("dispose",v)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let g=0;for(let m=0;m<u.length;m++)g+=u[m];const _=o.morphTargetsRelative?1:1-g;c.getUniforms().setValue(i,"morphTargetBaseInfluence",_),c.getUniforms().setValue(i,"morphTargetInfluences",u)}c.getUniforms().setValue(i,"morphTargetsTexture",d.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function Xg(i,e,t,n){let s=new WeakMap;function r(c){const u=n.render.frame,l=c.geometry,h=e.get(c,l);if(s.get(h)!==u&&(e.update(h),s.set(h,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),s.get(c)!==u&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,u))),c.isSkinnedMesh){const d=c.skeleton;s.get(d)!==u&&(d.update(),s.set(d,u))}return h}function a(){s=new WeakMap}function o(c){const u=c.target;u.removeEventListener("dispose",o),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:r,dispose:a}}const xu=new St,jc=new fu(1,1),Mu=new eu,yu=new kd,Su=new ou,Zc=[],Jc=[],Qc=new Float32Array(16),el=new Float32Array(9),tl=new Float32Array(4);function Zi(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=Zc[s];if(r===void 0&&(r=new Float32Array(s),Zc[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function Et(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Tt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function wr(i,e){let t=Jc[e];t===void 0&&(t=new Int32Array(e),Jc[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function $g(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function qg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Et(t,e))return;i.uniform2fv(this.addr,e),Tt(t,e)}}function Yg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Et(t,e))return;i.uniform3fv(this.addr,e),Tt(t,e)}}function Kg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Et(t,e))return;i.uniform4fv(this.addr,e),Tt(t,e)}}function jg(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Et(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Tt(t,e)}else{if(Et(t,n))return;tl.set(n),i.uniformMatrix2fv(this.addr,!1,tl),Tt(t,n)}}function Zg(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Et(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Tt(t,e)}else{if(Et(t,n))return;el.set(n),i.uniformMatrix3fv(this.addr,!1,el),Tt(t,n)}}function Jg(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Et(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Tt(t,e)}else{if(Et(t,n))return;Qc.set(n),i.uniformMatrix4fv(this.addr,!1,Qc),Tt(t,n)}}function Qg(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function e_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Et(t,e))return;i.uniform2iv(this.addr,e),Tt(t,e)}}function t_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Et(t,e))return;i.uniform3iv(this.addr,e),Tt(t,e)}}function n_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Et(t,e))return;i.uniform4iv(this.addr,e),Tt(t,e)}}function i_(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function s_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Et(t,e))return;i.uniform2uiv(this.addr,e),Tt(t,e)}}function r_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Et(t,e))return;i.uniform3uiv(this.addr,e),Tt(t,e)}}function a_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Et(t,e))return;i.uniform4uiv(this.addr,e),Tt(t,e)}}function o_(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(jc.compareFunction=Jl,r=jc):r=xu,t.setTexture2D(e||r,s)}function c_(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||yu,s)}function l_(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||Su,s)}function u_(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Mu,s)}function h_(i){switch(i){case 5126:return $g;case 35664:return qg;case 35665:return Yg;case 35666:return Kg;case 35674:return jg;case 35675:return Zg;case 35676:return Jg;case 5124:case 35670:return Qg;case 35667:case 35671:return e_;case 35668:case 35672:return t_;case 35669:case 35673:return n_;case 5125:return i_;case 36294:return s_;case 36295:return r_;case 36296:return a_;case 35678:case 36198:case 36298:case 36306:case 35682:return o_;case 35679:case 36299:case 36307:return c_;case 35680:case 36300:case 36308:case 36293:return l_;case 36289:case 36303:case 36311:case 36292:return u_}}function d_(i,e){i.uniform1fv(this.addr,e)}function f_(i,e){const t=Zi(e,this.size,2);i.uniform2fv(this.addr,t)}function p_(i,e){const t=Zi(e,this.size,3);i.uniform3fv(this.addr,t)}function m_(i,e){const t=Zi(e,this.size,4);i.uniform4fv(this.addr,t)}function g_(i,e){const t=Zi(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function __(i,e){const t=Zi(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function v_(i,e){const t=Zi(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function x_(i,e){i.uniform1iv(this.addr,e)}function M_(i,e){i.uniform2iv(this.addr,e)}function y_(i,e){i.uniform3iv(this.addr,e)}function S_(i,e){i.uniform4iv(this.addr,e)}function E_(i,e){i.uniform1uiv(this.addr,e)}function T_(i,e){i.uniform2uiv(this.addr,e)}function b_(i,e){i.uniform3uiv(this.addr,e)}function w_(i,e){i.uniform4uiv(this.addr,e)}function A_(i,e,t){const n=this.cache,s=e.length,r=wr(t,s);Et(n,r)||(i.uniform1iv(this.addr,r),Tt(n,r));for(let a=0;a!==s;++a)t.setTexture2D(e[a]||xu,r[a])}function R_(i,e,t){const n=this.cache,s=e.length,r=wr(t,s);Et(n,r)||(i.uniform1iv(this.addr,r),Tt(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||yu,r[a])}function C_(i,e,t){const n=this.cache,s=e.length,r=wr(t,s);Et(n,r)||(i.uniform1iv(this.addr,r),Tt(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||Su,r[a])}function P_(i,e,t){const n=this.cache,s=e.length,r=wr(t,s);Et(n,r)||(i.uniform1iv(this.addr,r),Tt(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||Mu,r[a])}function L_(i){switch(i){case 5126:return d_;case 35664:return f_;case 35665:return p_;case 35666:return m_;case 35674:return g_;case 35675:return __;case 35676:return v_;case 5124:case 35670:return x_;case 35667:case 35671:return M_;case 35668:case 35672:return y_;case 35669:case 35673:return S_;case 5125:return E_;case 36294:return T_;case 36295:return b_;case 36296:return w_;case 35678:case 36198:case 36298:case 36306:case 35682:return A_;case 35679:case 36299:case 36307:return R_;case 35680:case 36300:case 36308:case 36293:return C_;case 36289:case 36303:case 36311:case 36292:return P_}}class I_{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=h_(t.type)}}class D_{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=L_(t.type)}}class N_{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],n)}}}const da=/(\w+)(\])?(\[|\.)?/g;function nl(i,e){i.seq.push(e),i.map[e.id]=e}function U_(i,e,t){const n=i.name,s=n.length;for(da.lastIndex=0;;){const r=da.exec(n),a=da.lastIndex;let o=r[1];const c=r[2]==="]",u=r[3];if(c&&(o=o|0),u===void 0||u==="["&&a+2===s){nl(t,u===void 0?new I_(o,i,e):new D_(o,i,e));break}else{let h=t.map[o];h===void 0&&(h=new N_(o),nl(t,h)),t=h}}}class pr{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=e.getActiveUniform(t,s),a=e.getUniformLocation(t,r.name);U_(r,a,this)}}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&n.push(a)}return n}}function il(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const F_=37297;let O_=0;function B_(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const sl=new Fe;function k_(i){Ye._getMatrix(sl,Ye.workingColorSpace,i);const e=`mat3( ${sl.elements.map(t=>t.toFixed(4))} )`;switch(Ye.getTransfer(i)){case _r:return[e,"LinearTransferOETF"];case at:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function rl(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),s=i.getShaderInfoLog(e).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const a=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+B_(i.getShaderSource(e),a)}else return s}function z_(i,e){const t=k_(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function H_(i,e){let t;switch(e){case Yh:t="Linear";break;case Kh:t="Reinhard";break;case jh:t="Cineon";break;case Aa:t="ACESFilmic";break;case Jh:t="AgX";break;case Qh:t="Neutral";break;case Zh:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const rr=new N;function V_(){Ye.getLuminanceCoefficients(rr);const i=rr.x.toFixed(4),e=rr.y.toFixed(4),t=rr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function G_(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(fs).join(`
`)}function W_(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function X_(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function fs(i){return i!==""}function al(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function ol(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const $_=/^[ \t]*#include +<([\w\d./]+)>/gm;function co(i){return i.replace($_,Y_)}const q_=new Map;function Y_(i,e){let t=ke[e];if(t===void 0){const n=q_.get(e);if(n!==void 0)t=ke[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return co(t)}const K_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function cl(i){return i.replace(K_,j_)}function j_(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function ll(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Z_(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Bl?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===kl?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Rn&&(e="SHADOWMAP_TYPE_VSM"),e}function J_(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Oi:case Bi:e="ENVMAP_TYPE_CUBE";break;case Sr:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Q_(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Bi:e="ENVMAP_MODE_REFRACTION";break}return e}function e0(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case zl:e="ENVMAP_BLENDING_MULTIPLY";break;case $h:e="ENVMAP_BLENDING_MIX";break;case qh:e="ENVMAP_BLENDING_ADD";break}return e}function t0(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function n0(i,e,t,n){const s=i.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const c=Z_(t),u=J_(t),l=Q_(t),h=e0(t),d=t0(t),f=G_(t),g=W_(r),_=s.createProgram();let m,p,E=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(fs).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(fs).join(`
`),p.length>0&&(p+=`
`)):(m=[ll(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(fs).join(`
`),p=[ll(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==$n?"#define TONE_MAPPING":"",t.toneMapping!==$n?ke.tonemapping_pars_fragment:"",t.toneMapping!==$n?H_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ke.colorspace_pars_fragment,z_("linearToOutputTexel",t.outputColorSpace),V_(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(fs).join(`
`)),a=co(a),a=al(a,t),a=ol(a,t),o=co(o),o=al(o,t),o=ol(o,t),a=cl(a),o=cl(o),t.isRawShaderMaterial!==!0&&(E=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===rc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===rc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const b=E+m+a,x=E+p+o,P=il(s,s.VERTEX_SHADER,b),R=il(s,s.FRAGMENT_SHADER,x);s.attachShader(_,P),s.attachShader(_,R),t.index0AttributeName!==void 0?s.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function w(I){if(i.debug.checkShaderErrors){const H=s.getProgramInfoLog(_).trim(),z=s.getShaderInfoLog(P).trim(),X=s.getShaderInfoLog(R).trim();let Y=!0,$=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(Y=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,P,R);else{const te=rl(s,P,"vertex"),W=rl(s,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+H+`
`+te+`
`+W)}else H!==""?console.warn("THREE.WebGLProgram: Program Info Log:",H):(z===""||X==="")&&($=!1);$&&(I.diagnostics={runnable:Y,programLog:H,vertexShader:{log:z,prefix:m},fragmentShader:{log:X,prefix:p}})}s.deleteShader(P),s.deleteShader(R),A=new pr(s,_),S=X_(s,_)}let A;this.getUniforms=function(){return A===void 0&&w(this),A};let S;this.getAttributes=function(){return S===void 0&&w(this),S};let v=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return v===!1&&(v=s.getProgramParameter(_,F_)),v},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=O_++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=P,this.fragmentShader=R,this}let i0=0;class s0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new r0(e),t.set(e,n)),n}}class r0{constructor(e){this.id=i0++,this.code=e,this.usedTimes=0}}function a0(i,e,t,n,s,r,a){const o=new tu,c=new s0,u=new Set,l=[],h=s.logarithmicDepthBuffer,d=s.vertexTextures;let f=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(S){return u.add(S),S===0?"uv":`uv${S}`}function m(S,v,I,H,z){const X=H.fog,Y=z.geometry,$=S.isMeshStandardMaterial?H.environment:null,te=(S.isMeshStandardMaterial?t:e).get(S.envMap||$),W=te&&te.mapping===Sr?te.image.height:null,he=g[S.type];S.precision!==null&&(f=s.getMaxPrecision(S.precision),f!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",f,"instead."));const pe=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,we=pe!==void 0?pe.length:0;let Ce=0;Y.morphAttributes.position!==void 0&&(Ce=1),Y.morphAttributes.normal!==void 0&&(Ce=2),Y.morphAttributes.color!==void 0&&(Ce=3);let je,K,ce,Ee;if(he){const Je=gn[he];je=Je.vertexShader,K=Je.fragmentShader}else je=S.vertexShader,K=S.fragmentShader,c.update(S),ce=c.getVertexShaderID(S),Ee=c.getFragmentShaderID(S);const fe=i.getRenderTarget(),me=i.state.buffers.depth.getReversed(),Ge=z.isInstancedMesh===!0,xe=z.isBatchedMesh===!0,ot=!!S.map,ht=!!S.matcap,ze=!!te,D=!!S.aoMap,xt=!!S.lightMap,qe=!!S.bumpMap,et=!!S.normalMap,Se=!!S.displacementMap,Xe=!!S.emissiveMap,Te=!!S.metalnessMap,Ue=!!S.roughnessMap,Be=S.anisotropy>0,C=S.clearcoat>0,y=S.dispersion>0,M=S.iridescence>0,L=S.sheen>0,F=S.transmission>0,O=Be&&!!S.anisotropyMap,J=C&&!!S.clearcoatMap,q=C&&!!S.clearcoatNormalMap,ne=C&&!!S.clearcoatRoughnessMap,Q=M&&!!S.iridescenceMap,Z=M&&!!S.iridescenceThicknessMap,oe=L&&!!S.sheenColorMap,Me=L&&!!S.sheenRoughnessMap,re=!!S.specularMap,ie=!!S.specularColorMap,be=!!S.specularIntensityMap,U=F&&!!S.transmissionMap,le=F&&!!S.thicknessMap,ee=!!S.gradientMap,ge=!!S.alphaMap,se=S.alphaTest>0,j=!!S.alphaHash,ve=!!S.extensions;let Ie=$n;S.toneMapped&&(fe===null||fe.isXRRenderTarget===!0)&&(Ie=i.toneMapping);const ct={shaderID:he,shaderType:S.type,shaderName:S.name,vertexShader:je,fragmentShader:K,defines:S.defines,customVertexShaderID:ce,customFragmentShaderID:Ee,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:f,batching:xe,batchingColor:xe&&z._colorsTexture!==null,instancing:Ge,instancingColor:Ge&&z.instanceColor!==null,instancingMorph:Ge&&z.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:fe===null?i.outputColorSpace:fe.isXRRenderTarget===!0?fe.texture.colorSpace:kt,alphaToCoverage:!!S.alphaToCoverage,map:ot,matcap:ht,envMap:ze,envMapMode:ze&&te.mapping,envMapCubeUVHeight:W,aoMap:D,lightMap:xt,bumpMap:qe,normalMap:et,displacementMap:d&&Se,emissiveMap:Xe,normalMapObjectSpace:et&&S.normalMapType===rd,normalMapTangentSpace:et&&S.normalMapType===Zl,metalnessMap:Te,roughnessMap:Ue,anisotropy:Be,anisotropyMap:O,clearcoat:C,clearcoatMap:J,clearcoatNormalMap:q,clearcoatRoughnessMap:ne,dispersion:y,iridescence:M,iridescenceMap:Q,iridescenceThicknessMap:Z,sheen:L,sheenColorMap:oe,sheenRoughnessMap:Me,specularMap:re,specularColorMap:ie,specularIntensityMap:be,transmission:F,transmissionMap:U,thicknessMap:le,gradientMap:ee,opaque:S.transparent===!1&&S.blending===Ii&&S.alphaToCoverage===!1,alphaMap:ge,alphaTest:se,alphaHash:j,combine:S.combine,mapUv:ot&&_(S.map.channel),aoMapUv:D&&_(S.aoMap.channel),lightMapUv:xt&&_(S.lightMap.channel),bumpMapUv:qe&&_(S.bumpMap.channel),normalMapUv:et&&_(S.normalMap.channel),displacementMapUv:Se&&_(S.displacementMap.channel),emissiveMapUv:Xe&&_(S.emissiveMap.channel),metalnessMapUv:Te&&_(S.metalnessMap.channel),roughnessMapUv:Ue&&_(S.roughnessMap.channel),anisotropyMapUv:O&&_(S.anisotropyMap.channel),clearcoatMapUv:J&&_(S.clearcoatMap.channel),clearcoatNormalMapUv:q&&_(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ne&&_(S.clearcoatRoughnessMap.channel),iridescenceMapUv:Q&&_(S.iridescenceMap.channel),iridescenceThicknessMapUv:Z&&_(S.iridescenceThicknessMap.channel),sheenColorMapUv:oe&&_(S.sheenColorMap.channel),sheenRoughnessMapUv:Me&&_(S.sheenRoughnessMap.channel),specularMapUv:re&&_(S.specularMap.channel),specularColorMapUv:ie&&_(S.specularColorMap.channel),specularIntensityMapUv:be&&_(S.specularIntensityMap.channel),transmissionMapUv:U&&_(S.transmissionMap.channel),thicknessMapUv:le&&_(S.thicknessMap.channel),alphaMapUv:ge&&_(S.alphaMap.channel),vertexTangents:!!Y.attributes.tangent&&(et||Be),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,pointsUvs:z.isPoints===!0&&!!Y.attributes.uv&&(ot||ge),fog:!!X,useFog:S.fog===!0,fogExp2:!!X&&X.isFogExp2,flatShading:S.flatShading===!0&&S.wireframe===!1,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:h,reverseDepthBuffer:me,skinning:z.isSkinnedMesh===!0,morphTargets:Y.morphAttributes.position!==void 0,morphNormals:Y.morphAttributes.normal!==void 0,morphColors:Y.morphAttributes.color!==void 0,morphTargetsCount:we,morphTextureStride:Ce,numDirLights:v.directional.length,numPointLights:v.point.length,numSpotLights:v.spot.length,numSpotLightMaps:v.spotLightMap.length,numRectAreaLights:v.rectArea.length,numHemiLights:v.hemi.length,numDirLightShadows:v.directionalShadowMap.length,numPointLightShadows:v.pointShadowMap.length,numSpotLightShadows:v.spotShadowMap.length,numSpotLightShadowsWithMaps:v.numSpotLightShadowsWithMaps,numLightProbes:v.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:S.dithering,shadowMapEnabled:i.shadowMap.enabled&&I.length>0,shadowMapType:i.shadowMap.type,toneMapping:Ie,decodeVideoTexture:ot&&S.map.isVideoTexture===!0&&Ye.getTransfer(S.map.colorSpace)===at,decodeVideoTextureEmissive:Xe&&S.emissiveMap.isVideoTexture===!0&&Ye.getTransfer(S.emissiveMap.colorSpace)===at,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===_n,flipSided:S.side===Ct,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:ve&&S.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ve&&S.extensions.multiDraw===!0||xe)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return ct.vertexUv1s=u.has(1),ct.vertexUv2s=u.has(2),ct.vertexUv3s=u.has(3),u.clear(),ct}function p(S){const v=[];if(S.shaderID?v.push(S.shaderID):(v.push(S.customVertexShaderID),v.push(S.customFragmentShaderID)),S.defines!==void 0)for(const I in S.defines)v.push(I),v.push(S.defines[I]);return S.isRawShaderMaterial===!1&&(E(v,S),b(v,S),v.push(i.outputColorSpace)),v.push(S.customProgramCacheKey),v.join()}function E(S,v){S.push(v.precision),S.push(v.outputColorSpace),S.push(v.envMapMode),S.push(v.envMapCubeUVHeight),S.push(v.mapUv),S.push(v.alphaMapUv),S.push(v.lightMapUv),S.push(v.aoMapUv),S.push(v.bumpMapUv),S.push(v.normalMapUv),S.push(v.displacementMapUv),S.push(v.emissiveMapUv),S.push(v.metalnessMapUv),S.push(v.roughnessMapUv),S.push(v.anisotropyMapUv),S.push(v.clearcoatMapUv),S.push(v.clearcoatNormalMapUv),S.push(v.clearcoatRoughnessMapUv),S.push(v.iridescenceMapUv),S.push(v.iridescenceThicknessMapUv),S.push(v.sheenColorMapUv),S.push(v.sheenRoughnessMapUv),S.push(v.specularMapUv),S.push(v.specularColorMapUv),S.push(v.specularIntensityMapUv),S.push(v.transmissionMapUv),S.push(v.thicknessMapUv),S.push(v.combine),S.push(v.fogExp2),S.push(v.sizeAttenuation),S.push(v.morphTargetsCount),S.push(v.morphAttributeCount),S.push(v.numDirLights),S.push(v.numPointLights),S.push(v.numSpotLights),S.push(v.numSpotLightMaps),S.push(v.numHemiLights),S.push(v.numRectAreaLights),S.push(v.numDirLightShadows),S.push(v.numPointLightShadows),S.push(v.numSpotLightShadows),S.push(v.numSpotLightShadowsWithMaps),S.push(v.numLightProbes),S.push(v.shadowMapType),S.push(v.toneMapping),S.push(v.numClippingPlanes),S.push(v.numClipIntersection),S.push(v.depthPacking)}function b(S,v){o.disableAll(),v.supportsVertexTextures&&o.enable(0),v.instancing&&o.enable(1),v.instancingColor&&o.enable(2),v.instancingMorph&&o.enable(3),v.matcap&&o.enable(4),v.envMap&&o.enable(5),v.normalMapObjectSpace&&o.enable(6),v.normalMapTangentSpace&&o.enable(7),v.clearcoat&&o.enable(8),v.iridescence&&o.enable(9),v.alphaTest&&o.enable(10),v.vertexColors&&o.enable(11),v.vertexAlphas&&o.enable(12),v.vertexUv1s&&o.enable(13),v.vertexUv2s&&o.enable(14),v.vertexUv3s&&o.enable(15),v.vertexTangents&&o.enable(16),v.anisotropy&&o.enable(17),v.alphaHash&&o.enable(18),v.batching&&o.enable(19),v.dispersion&&o.enable(20),v.batchingColor&&o.enable(21),v.gradientMap&&o.enable(22),S.push(o.mask),o.disableAll(),v.fog&&o.enable(0),v.useFog&&o.enable(1),v.flatShading&&o.enable(2),v.logarithmicDepthBuffer&&o.enable(3),v.reverseDepthBuffer&&o.enable(4),v.skinning&&o.enable(5),v.morphTargets&&o.enable(6),v.morphNormals&&o.enable(7),v.morphColors&&o.enable(8),v.premultipliedAlpha&&o.enable(9),v.shadowMapEnabled&&o.enable(10),v.doubleSided&&o.enable(11),v.flipSided&&o.enable(12),v.useDepthPacking&&o.enable(13),v.dithering&&o.enable(14),v.transmission&&o.enable(15),v.sheen&&o.enable(16),v.opaque&&o.enable(17),v.pointsUvs&&o.enable(18),v.decodeVideoTexture&&o.enable(19),v.decodeVideoTextureEmissive&&o.enable(20),v.alphaToCoverage&&o.enable(21),S.push(o.mask)}function x(S){const v=g[S.type];let I;if(v){const H=gn[v];I=Jd.clone(H.uniforms)}else I=S.uniforms;return I}function P(S,v){let I;for(let H=0,z=l.length;H<z;H++){const X=l[H];if(X.cacheKey===v){I=X,++I.usedTimes;break}}return I===void 0&&(I=new n0(i,v,S,r),l.push(I)),I}function R(S){if(--S.usedTimes===0){const v=l.indexOf(S);l[v]=l[l.length-1],l.pop(),S.destroy()}}function w(S){c.remove(S)}function A(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:x,acquireProgram:P,releaseProgram:R,releaseShaderCache:w,programs:l,dispose:A}}function o0(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,c){i.get(a)[o]=c}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function c0(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function ul(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function hl(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(h,d,f,g,_,m){let p=i[e];return p===void 0?(p={id:h.id,object:h,geometry:d,material:f,groupOrder:g,renderOrder:h.renderOrder,z:_,group:m},i[e]=p):(p.id=h.id,p.object=h,p.geometry=d,p.material=f,p.groupOrder=g,p.renderOrder=h.renderOrder,p.z=_,p.group=m),e++,p}function o(h,d,f,g,_,m){const p=a(h,d,f,g,_,m);f.transmission>0?n.push(p):f.transparent===!0?s.push(p):t.push(p)}function c(h,d,f,g,_,m){const p=a(h,d,f,g,_,m);f.transmission>0?n.unshift(p):f.transparent===!0?s.unshift(p):t.unshift(p)}function u(h,d){t.length>1&&t.sort(h||c0),n.length>1&&n.sort(d||ul),s.length>1&&s.sort(d||ul)}function l(){for(let h=e,d=i.length;h<d;h++){const f=i[h];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:o,unshift:c,finish:l,sort:u}}function l0(){let i=new WeakMap;function e(n,s){const r=i.get(n);let a;return r===void 0?(a=new hl,i.set(n,[a])):s>=r.length?(a=new hl,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function u0(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new N,color:new Pe};break;case"SpotLight":t={position:new N,direction:new N,color:new Pe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new N,color:new Pe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new N,skyColor:new Pe,groundColor:new Pe};break;case"RectAreaLight":t={color:new Pe,position:new N,halfWidth:new N,halfHeight:new N};break}return i[e.id]=t,t}}}function h0(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ne};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ne};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ne,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let d0=0;function f0(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function p0(i){const e=new u0,t=h0(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let u=0;u<9;u++)n.probe.push(new N);const s=new N,r=new Oe,a=new Oe;function o(u){let l=0,h=0,d=0;for(let S=0;S<9;S++)n.probe[S].set(0,0,0);let f=0,g=0,_=0,m=0,p=0,E=0,b=0,x=0,P=0,R=0,w=0;u.sort(f0);for(let S=0,v=u.length;S<v;S++){const I=u[S],H=I.color,z=I.intensity,X=I.distance,Y=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)l+=H.r*z,h+=H.g*z,d+=H.b*z;else if(I.isLightProbe){for(let $=0;$<9;$++)n.probe[$].addScaledVector(I.sh.coefficients[$],z);w++}else if(I.isDirectionalLight){const $=e.get(I);if($.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const te=I.shadow,W=t.get(I);W.shadowIntensity=te.intensity,W.shadowBias=te.bias,W.shadowNormalBias=te.normalBias,W.shadowRadius=te.radius,W.shadowMapSize=te.mapSize,n.directionalShadow[f]=W,n.directionalShadowMap[f]=Y,n.directionalShadowMatrix[f]=I.shadow.matrix,E++}n.directional[f]=$,f++}else if(I.isSpotLight){const $=e.get(I);$.position.setFromMatrixPosition(I.matrixWorld),$.color.copy(H).multiplyScalar(z),$.distance=X,$.coneCos=Math.cos(I.angle),$.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),$.decay=I.decay,n.spot[_]=$;const te=I.shadow;if(I.map&&(n.spotLightMap[P]=I.map,P++,te.updateMatrices(I),I.castShadow&&R++),n.spotLightMatrix[_]=te.matrix,I.castShadow){const W=t.get(I);W.shadowIntensity=te.intensity,W.shadowBias=te.bias,W.shadowNormalBias=te.normalBias,W.shadowRadius=te.radius,W.shadowMapSize=te.mapSize,n.spotShadow[_]=W,n.spotShadowMap[_]=Y,x++}_++}else if(I.isRectAreaLight){const $=e.get(I);$.color.copy(H).multiplyScalar(z),$.halfWidth.set(I.width*.5,0,0),$.halfHeight.set(0,I.height*.5,0),n.rectArea[m]=$,m++}else if(I.isPointLight){const $=e.get(I);if($.color.copy(I.color).multiplyScalar(I.intensity),$.distance=I.distance,$.decay=I.decay,I.castShadow){const te=I.shadow,W=t.get(I);W.shadowIntensity=te.intensity,W.shadowBias=te.bias,W.shadowNormalBias=te.normalBias,W.shadowRadius=te.radius,W.shadowMapSize=te.mapSize,W.shadowCameraNear=te.camera.near,W.shadowCameraFar=te.camera.far,n.pointShadow[g]=W,n.pointShadowMap[g]=Y,n.pointShadowMatrix[g]=I.shadow.matrix,b++}n.point[g]=$,g++}else if(I.isHemisphereLight){const $=e.get(I);$.skyColor.copy(I.color).multiplyScalar(z),$.groundColor.copy(I.groundColor).multiplyScalar(z),n.hemi[p]=$,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ue.LTC_FLOAT_1,n.rectAreaLTC2=ue.LTC_FLOAT_2):(n.rectAreaLTC1=ue.LTC_HALF_1,n.rectAreaLTC2=ue.LTC_HALF_2)),n.ambient[0]=l,n.ambient[1]=h,n.ambient[2]=d;const A=n.hash;(A.directionalLength!==f||A.pointLength!==g||A.spotLength!==_||A.rectAreaLength!==m||A.hemiLength!==p||A.numDirectionalShadows!==E||A.numPointShadows!==b||A.numSpotShadows!==x||A.numSpotMaps!==P||A.numLightProbes!==w)&&(n.directional.length=f,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=E,n.directionalShadowMap.length=E,n.pointShadow.length=b,n.pointShadowMap.length=b,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=E,n.pointShadowMatrix.length=b,n.spotLightMatrix.length=x+P-R,n.spotLightMap.length=P,n.numSpotLightShadowsWithMaps=R,n.numLightProbes=w,A.directionalLength=f,A.pointLength=g,A.spotLength=_,A.rectAreaLength=m,A.hemiLength=p,A.numDirectionalShadows=E,A.numPointShadows=b,A.numSpotShadows=x,A.numSpotMaps=P,A.numLightProbes=w,n.version=d0++)}function c(u,l){let h=0,d=0,f=0,g=0,_=0;const m=l.matrixWorldInverse;for(let p=0,E=u.length;p<E;p++){const b=u[p];if(b.isDirectionalLight){const x=n.directional[h];x.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(m),h++}else if(b.isSpotLight){const x=n.spot[f];x.position.setFromMatrixPosition(b.matrixWorld),x.position.applyMatrix4(m),x.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(m),f++}else if(b.isRectAreaLight){const x=n.rectArea[g];x.position.setFromMatrixPosition(b.matrixWorld),x.position.applyMatrix4(m),a.identity(),r.copy(b.matrixWorld),r.premultiply(m),a.extractRotation(r),x.halfWidth.set(b.width*.5,0,0),x.halfHeight.set(0,b.height*.5,0),x.halfWidth.applyMatrix4(a),x.halfHeight.applyMatrix4(a),g++}else if(b.isPointLight){const x=n.point[d];x.position.setFromMatrixPosition(b.matrixWorld),x.position.applyMatrix4(m),d++}else if(b.isHemisphereLight){const x=n.hemi[_];x.direction.setFromMatrixPosition(b.matrixWorld),x.direction.transformDirection(m),_++}}}return{setup:o,setupView:c,state:n}}function dl(i){const e=new p0(i),t=[],n=[];function s(l){u.camera=l,t.length=0,n.length=0}function r(l){t.push(l)}function a(l){n.push(l)}function o(){e.setup(t)}function c(l){e.setupView(t,l)}const u={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:u,setupLights:o,setupLightsView:c,pushLight:r,pushShadow:a}}function m0(i){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let o;return a===void 0?(o=new dl(i),e.set(s,[o])):r>=a.length?(o=new dl(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const g0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,_0=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function v0(i,e,t){let n=new bo;const s=new Ne,r=new Ne,a=new Qe,o=new _f({depthPacking:sd}),c=new vf,u={},l=t.maxTextureSize,h={[Nn]:Ct,[Ct]:Nn,[_n]:_n},d=new qn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ne},radius:{value:4}},vertexShader:g0,fragmentShader:_0}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const g=new Pt;g.setAttribute("position",new Bt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Ke(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Bl;let p=this.type;this.render=function(R,w,A){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||R.length===0)return;const S=i.getRenderTarget(),v=i.getActiveCubeFace(),I=i.getActiveMipmapLevel(),H=i.state;H.setBlending(Xn),H.buffers.color.setClear(1,1,1,1),H.buffers.depth.setTest(!0),H.setScissorTest(!1);const z=p!==Rn&&this.type===Rn,X=p===Rn&&this.type!==Rn;for(let Y=0,$=R.length;Y<$;Y++){const te=R[Y],W=te.shadow;if(W===void 0){console.warn("THREE.WebGLShadowMap:",te,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;s.copy(W.mapSize);const he=W.getFrameExtents();if(s.multiply(he),r.copy(W.mapSize),(s.x>l||s.y>l)&&(s.x>l&&(r.x=Math.floor(l/he.x),s.x=r.x*he.x,W.mapSize.x=r.x),s.y>l&&(r.y=Math.floor(l/he.y),s.y=r.y*he.y,W.mapSize.y=r.y)),W.map===null||z===!0||X===!0){const we=this.type!==Rn?{minFilter:Ot,magFilter:Ot}:{};W.map!==null&&W.map.dispose(),W.map=new hi(s.x,s.y,we),W.map.texture.name=te.name+".shadowMap",W.camera.updateProjectionMatrix()}i.setRenderTarget(W.map),i.clear();const pe=W.getViewportCount();for(let we=0;we<pe;we++){const Ce=W.getViewport(we);a.set(r.x*Ce.x,r.y*Ce.y,r.x*Ce.z,r.y*Ce.w),H.viewport(a),W.updateMatrices(te,we),n=W.getFrustum(),x(w,A,W.camera,te,this.type)}W.isPointLightShadow!==!0&&this.type===Rn&&E(W,A),W.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(S,v,I)};function E(R,w){const A=e.update(_);d.defines.VSM_SAMPLES!==R.blurSamples&&(d.defines.VSM_SAMPLES=R.blurSamples,f.defines.VSM_SAMPLES=R.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new hi(s.x,s.y)),d.uniforms.shadow_pass.value=R.map.texture,d.uniforms.resolution.value=R.mapSize,d.uniforms.radius.value=R.radius,i.setRenderTarget(R.mapPass),i.clear(),i.renderBufferDirect(w,null,A,d,_,null),f.uniforms.shadow_pass.value=R.mapPass.texture,f.uniforms.resolution.value=R.mapSize,f.uniforms.radius.value=R.radius,i.setRenderTarget(R.map),i.clear(),i.renderBufferDirect(w,null,A,f,_,null)}function b(R,w,A,S){let v=null;const I=A.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(I!==void 0)v=I;else if(v=A.isPointLight===!0?c:o,i.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0||w.alphaToCoverage===!0){const H=v.uuid,z=w.uuid;let X=u[H];X===void 0&&(X={},u[H]=X);let Y=X[z];Y===void 0&&(Y=v.clone(),X[z]=Y,w.addEventListener("dispose",P)),v=Y}if(v.visible=w.visible,v.wireframe=w.wireframe,S===Rn?v.side=w.shadowSide!==null?w.shadowSide:w.side:v.side=w.shadowSide!==null?w.shadowSide:h[w.side],v.alphaMap=w.alphaMap,v.alphaTest=w.alphaToCoverage===!0?.5:w.alphaTest,v.map=w.map,v.clipShadows=w.clipShadows,v.clippingPlanes=w.clippingPlanes,v.clipIntersection=w.clipIntersection,v.displacementMap=w.displacementMap,v.displacementScale=w.displacementScale,v.displacementBias=w.displacementBias,v.wireframeLinewidth=w.wireframeLinewidth,v.linewidth=w.linewidth,A.isPointLight===!0&&v.isMeshDistanceMaterial===!0){const H=i.properties.get(v);H.light=A}return v}function x(R,w,A,S,v){if(R.visible===!1)return;if(R.layers.test(w.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&v===Rn)&&(!R.frustumCulled||n.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(A.matrixWorldInverse,R.matrixWorld);const z=e.update(R),X=R.material;if(Array.isArray(X)){const Y=z.groups;for(let $=0,te=Y.length;$<te;$++){const W=Y[$],he=X[W.materialIndex];if(he&&he.visible){const pe=b(R,he,S,v);R.onBeforeShadow(i,R,w,A,z,pe,W),i.renderBufferDirect(A,null,z,pe,R,W),R.onAfterShadow(i,R,w,A,z,pe,W)}}}else if(X.visible){const Y=b(R,X,S,v);R.onBeforeShadow(i,R,w,A,z,Y,null),i.renderBufferDirect(A,null,z,Y,R,null),R.onAfterShadow(i,R,w,A,z,Y,null)}}const H=R.children;for(let z=0,X=H.length;z<X;z++)x(H[z],w,A,S,v)}function P(R){R.target.removeEventListener("dispose",P);for(const A in u){const S=u[A],v=R.target.uuid;v in S&&(S[v].dispose(),delete S[v])}}}const x0={[Ma]:ya,[Sa]:ba,[Ea]:wa,[Fi]:Ta,[ya]:Ma,[ba]:Sa,[wa]:Ea,[Ta]:Fi};function M0(i,e){function t(){let U=!1;const le=new Qe;let ee=null;const ge=new Qe(0,0,0,0);return{setMask:function(se){ee!==se&&!U&&(i.colorMask(se,se,se,se),ee=se)},setLocked:function(se){U=se},setClear:function(se,j,ve,Ie,ct){ct===!0&&(se*=Ie,j*=Ie,ve*=Ie),le.set(se,j,ve,Ie),ge.equals(le)===!1&&(i.clearColor(se,j,ve,Ie),ge.copy(le))},reset:function(){U=!1,ee=null,ge.set(-1,0,0,0)}}}function n(){let U=!1,le=!1,ee=null,ge=null,se=null;return{setReversed:function(j){if(le!==j){const ve=e.get("EXT_clip_control");j?ve.clipControlEXT(ve.LOWER_LEFT_EXT,ve.ZERO_TO_ONE_EXT):ve.clipControlEXT(ve.LOWER_LEFT_EXT,ve.NEGATIVE_ONE_TO_ONE_EXT),le=j;const Ie=se;se=null,this.setClear(Ie)}},getReversed:function(){return le},setTest:function(j){j?fe(i.DEPTH_TEST):me(i.DEPTH_TEST)},setMask:function(j){ee!==j&&!U&&(i.depthMask(j),ee=j)},setFunc:function(j){if(le&&(j=x0[j]),ge!==j){switch(j){case Ma:i.depthFunc(i.NEVER);break;case ya:i.depthFunc(i.ALWAYS);break;case Sa:i.depthFunc(i.LESS);break;case Fi:i.depthFunc(i.LEQUAL);break;case Ea:i.depthFunc(i.EQUAL);break;case Ta:i.depthFunc(i.GEQUAL);break;case ba:i.depthFunc(i.GREATER);break;case wa:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ge=j}},setLocked:function(j){U=j},setClear:function(j){se!==j&&(le&&(j=1-j),i.clearDepth(j),se=j)},reset:function(){U=!1,ee=null,ge=null,se=null,le=!1}}}function s(){let U=!1,le=null,ee=null,ge=null,se=null,j=null,ve=null,Ie=null,ct=null;return{setTest:function(Je){U||(Je?fe(i.STENCIL_TEST):me(i.STENCIL_TEST))},setMask:function(Je){le!==Je&&!U&&(i.stencilMask(Je),le=Je)},setFunc:function(Je,Lt,en){(ee!==Je||ge!==Lt||se!==en)&&(i.stencilFunc(Je,Lt,en),ee=Je,ge=Lt,se=en)},setOp:function(Je,Lt,en){(j!==Je||ve!==Lt||Ie!==en)&&(i.stencilOp(Je,Lt,en),j=Je,ve=Lt,Ie=en)},setLocked:function(Je){U=Je},setClear:function(Je){ct!==Je&&(i.clearStencil(Je),ct=Je)},reset:function(){U=!1,le=null,ee=null,ge=null,se=null,j=null,ve=null,Ie=null,ct=null}}}const r=new t,a=new n,o=new s,c=new WeakMap,u=new WeakMap;let l={},h={},d=new WeakMap,f=[],g=null,_=!1,m=null,p=null,E=null,b=null,x=null,P=null,R=null,w=new Pe(0,0,0),A=0,S=!1,v=null,I=null,H=null,z=null,X=null;const Y=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let $=!1,te=0;const W=i.getParameter(i.VERSION);W.indexOf("WebGL")!==-1?(te=parseFloat(/^WebGL (\d)/.exec(W)[1]),$=te>=1):W.indexOf("OpenGL ES")!==-1&&(te=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),$=te>=2);let he=null,pe={};const we=i.getParameter(i.SCISSOR_BOX),Ce=i.getParameter(i.VIEWPORT),je=new Qe().fromArray(we),K=new Qe().fromArray(Ce);function ce(U,le,ee,ge){const se=new Uint8Array(4),j=i.createTexture();i.bindTexture(U,j),i.texParameteri(U,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(U,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let ve=0;ve<ee;ve++)U===i.TEXTURE_3D||U===i.TEXTURE_2D_ARRAY?i.texImage3D(le,0,i.RGBA,1,1,ge,0,i.RGBA,i.UNSIGNED_BYTE,se):i.texImage2D(le+ve,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,se);return j}const Ee={};Ee[i.TEXTURE_2D]=ce(i.TEXTURE_2D,i.TEXTURE_2D,1),Ee[i.TEXTURE_CUBE_MAP]=ce(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Ee[i.TEXTURE_2D_ARRAY]=ce(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Ee[i.TEXTURE_3D]=ce(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),fe(i.DEPTH_TEST),a.setFunc(Fi),qe(!1),et(jo),fe(i.CULL_FACE),D(Xn);function fe(U){l[U]!==!0&&(i.enable(U),l[U]=!0)}function me(U){l[U]!==!1&&(i.disable(U),l[U]=!1)}function Ge(U,le){return h[U]!==le?(i.bindFramebuffer(U,le),h[U]=le,U===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=le),U===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=le),!0):!1}function xe(U,le){let ee=f,ge=!1;if(U){ee=d.get(le),ee===void 0&&(ee=[],d.set(le,ee));const se=U.textures;if(ee.length!==se.length||ee[0]!==i.COLOR_ATTACHMENT0){for(let j=0,ve=se.length;j<ve;j++)ee[j]=i.COLOR_ATTACHMENT0+j;ee.length=se.length,ge=!0}}else ee[0]!==i.BACK&&(ee[0]=i.BACK,ge=!0);ge&&i.drawBuffers(ee)}function ot(U){return g!==U?(i.useProgram(U),g=U,!0):!1}const ht={[ai]:i.FUNC_ADD,[Ch]:i.FUNC_SUBTRACT,[Ph]:i.FUNC_REVERSE_SUBTRACT};ht[Lh]=i.MIN,ht[Ih]=i.MAX;const ze={[Dh]:i.ZERO,[Nh]:i.ONE,[Uh]:i.SRC_COLOR,[va]:i.SRC_ALPHA,[Hh]:i.SRC_ALPHA_SATURATE,[kh]:i.DST_COLOR,[Oh]:i.DST_ALPHA,[Fh]:i.ONE_MINUS_SRC_COLOR,[xa]:i.ONE_MINUS_SRC_ALPHA,[zh]:i.ONE_MINUS_DST_COLOR,[Bh]:i.ONE_MINUS_DST_ALPHA,[Vh]:i.CONSTANT_COLOR,[Gh]:i.ONE_MINUS_CONSTANT_COLOR,[Wh]:i.CONSTANT_ALPHA,[Xh]:i.ONE_MINUS_CONSTANT_ALPHA};function D(U,le,ee,ge,se,j,ve,Ie,ct,Je){if(U===Xn){_===!0&&(me(i.BLEND),_=!1);return}if(_===!1&&(fe(i.BLEND),_=!0),U!==Rh){if(U!==m||Je!==S){if((p!==ai||x!==ai)&&(i.blendEquation(i.FUNC_ADD),p=ai,x=ai),Je)switch(U){case Ii:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Zo:i.blendFunc(i.ONE,i.ONE);break;case Jo:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Qo:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case Ii:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Zo:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Jo:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Qo:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}E=null,b=null,P=null,R=null,w.set(0,0,0),A=0,m=U,S=Je}return}se=se||le,j=j||ee,ve=ve||ge,(le!==p||se!==x)&&(i.blendEquationSeparate(ht[le],ht[se]),p=le,x=se),(ee!==E||ge!==b||j!==P||ve!==R)&&(i.blendFuncSeparate(ze[ee],ze[ge],ze[j],ze[ve]),E=ee,b=ge,P=j,R=ve),(Ie.equals(w)===!1||ct!==A)&&(i.blendColor(Ie.r,Ie.g,Ie.b,ct),w.copy(Ie),A=ct),m=U,S=!1}function xt(U,le){U.side===_n?me(i.CULL_FACE):fe(i.CULL_FACE);let ee=U.side===Ct;le&&(ee=!ee),qe(ee),U.blending===Ii&&U.transparent===!1?D(Xn):D(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),a.setFunc(U.depthFunc),a.setTest(U.depthTest),a.setMask(U.depthWrite),r.setMask(U.colorWrite);const ge=U.stencilWrite;o.setTest(ge),ge&&(o.setMask(U.stencilWriteMask),o.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),o.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),Xe(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?fe(i.SAMPLE_ALPHA_TO_COVERAGE):me(i.SAMPLE_ALPHA_TO_COVERAGE)}function qe(U){v!==U&&(U?i.frontFace(i.CW):i.frontFace(i.CCW),v=U)}function et(U){U!==wh?(fe(i.CULL_FACE),U!==I&&(U===jo?i.cullFace(i.BACK):U===Ah?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):me(i.CULL_FACE),I=U}function Se(U){U!==H&&($&&i.lineWidth(U),H=U)}function Xe(U,le,ee){U?(fe(i.POLYGON_OFFSET_FILL),(z!==le||X!==ee)&&(i.polygonOffset(le,ee),z=le,X=ee)):me(i.POLYGON_OFFSET_FILL)}function Te(U){U?fe(i.SCISSOR_TEST):me(i.SCISSOR_TEST)}function Ue(U){U===void 0&&(U=i.TEXTURE0+Y-1),he!==U&&(i.activeTexture(U),he=U)}function Be(U,le,ee){ee===void 0&&(he===null?ee=i.TEXTURE0+Y-1:ee=he);let ge=pe[ee];ge===void 0&&(ge={type:void 0,texture:void 0},pe[ee]=ge),(ge.type!==U||ge.texture!==le)&&(he!==ee&&(i.activeTexture(ee),he=ee),i.bindTexture(U,le||Ee[U]),ge.type=U,ge.texture=le)}function C(){const U=pe[he];U!==void 0&&U.type!==void 0&&(i.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function y(){try{i.compressedTexImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function M(){try{i.compressedTexImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function L(){try{i.texSubImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function F(){try{i.texSubImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function O(){try{i.compressedTexSubImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function J(){try{i.compressedTexSubImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function q(){try{i.texStorage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ne(){try{i.texStorage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Q(){try{i.texImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Z(){try{i.texImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function oe(U){je.equals(U)===!1&&(i.scissor(U.x,U.y,U.z,U.w),je.copy(U))}function Me(U){K.equals(U)===!1&&(i.viewport(U.x,U.y,U.z,U.w),K.copy(U))}function re(U,le){let ee=u.get(le);ee===void 0&&(ee=new WeakMap,u.set(le,ee));let ge=ee.get(U);ge===void 0&&(ge=i.getUniformBlockIndex(le,U.name),ee.set(U,ge))}function ie(U,le){const ge=u.get(le).get(U);c.get(le)!==ge&&(i.uniformBlockBinding(le,ge,U.__bindingPointIndex),c.set(le,ge))}function be(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),l={},he=null,pe={},h={},d=new WeakMap,f=[],g=null,_=!1,m=null,p=null,E=null,b=null,x=null,P=null,R=null,w=new Pe(0,0,0),A=0,S=!1,v=null,I=null,H=null,z=null,X=null,je.set(0,0,i.canvas.width,i.canvas.height),K.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:fe,disable:me,bindFramebuffer:Ge,drawBuffers:xe,useProgram:ot,setBlending:D,setMaterial:xt,setFlipSided:qe,setCullFace:et,setLineWidth:Se,setPolygonOffset:Xe,setScissorTest:Te,activeTexture:Ue,bindTexture:Be,unbindTexture:C,compressedTexImage2D:y,compressedTexImage3D:M,texImage2D:Q,texImage3D:Z,updateUBOMapping:re,uniformBlockBinding:ie,texStorage2D:q,texStorage3D:ne,texSubImage2D:L,texSubImage3D:F,compressedTexSubImage2D:O,compressedTexSubImage3D:J,scissor:oe,viewport:Me,reset:be}}function y0(i,e,t,n,s,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),u=new Ne,l=new WeakMap;let h;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(C,y){return f?new OffscreenCanvas(C,y):Es("canvas")}function _(C,y,M){let L=1;const F=Be(C);if((F.width>M||F.height>M)&&(L=M/Math.max(F.width,F.height)),L<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){const O=Math.floor(L*F.width),J=Math.floor(L*F.height);h===void 0&&(h=g(O,J));const q=y?g(O,J):h;return q.width=O,q.height=J,q.getContext("2d").drawImage(C,0,0,O,J),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+F.width+"x"+F.height+") to ("+O+"x"+J+")."),q}else return"data"in C&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+F.width+"x"+F.height+")."),C;return C}function m(C){return C.generateMipmaps}function p(C){i.generateMipmap(C)}function E(C){return C.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?i.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function b(C,y,M,L,F=!1){if(C!==null){if(i[C]!==void 0)return i[C];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let O=y;if(y===i.RED&&(M===i.FLOAT&&(O=i.R32F),M===i.HALF_FLOAT&&(O=i.R16F),M===i.UNSIGNED_BYTE&&(O=i.R8)),y===i.RED_INTEGER&&(M===i.UNSIGNED_BYTE&&(O=i.R8UI),M===i.UNSIGNED_SHORT&&(O=i.R16UI),M===i.UNSIGNED_INT&&(O=i.R32UI),M===i.BYTE&&(O=i.R8I),M===i.SHORT&&(O=i.R16I),M===i.INT&&(O=i.R32I)),y===i.RG&&(M===i.FLOAT&&(O=i.RG32F),M===i.HALF_FLOAT&&(O=i.RG16F),M===i.UNSIGNED_BYTE&&(O=i.RG8)),y===i.RG_INTEGER&&(M===i.UNSIGNED_BYTE&&(O=i.RG8UI),M===i.UNSIGNED_SHORT&&(O=i.RG16UI),M===i.UNSIGNED_INT&&(O=i.RG32UI),M===i.BYTE&&(O=i.RG8I),M===i.SHORT&&(O=i.RG16I),M===i.INT&&(O=i.RG32I)),y===i.RGB_INTEGER&&(M===i.UNSIGNED_BYTE&&(O=i.RGB8UI),M===i.UNSIGNED_SHORT&&(O=i.RGB16UI),M===i.UNSIGNED_INT&&(O=i.RGB32UI),M===i.BYTE&&(O=i.RGB8I),M===i.SHORT&&(O=i.RGB16I),M===i.INT&&(O=i.RGB32I)),y===i.RGBA_INTEGER&&(M===i.UNSIGNED_BYTE&&(O=i.RGBA8UI),M===i.UNSIGNED_SHORT&&(O=i.RGBA16UI),M===i.UNSIGNED_INT&&(O=i.RGBA32UI),M===i.BYTE&&(O=i.RGBA8I),M===i.SHORT&&(O=i.RGBA16I),M===i.INT&&(O=i.RGBA32I)),y===i.RGB&&M===i.UNSIGNED_INT_5_9_9_9_REV&&(O=i.RGB9_E5),y===i.RGBA){const J=F?_r:Ye.getTransfer(L);M===i.FLOAT&&(O=i.RGBA32F),M===i.HALF_FLOAT&&(O=i.RGBA16F),M===i.UNSIGNED_BYTE&&(O=J===at?i.SRGB8_ALPHA8:i.RGBA8),M===i.UNSIGNED_SHORT_4_4_4_4&&(O=i.RGBA4),M===i.UNSIGNED_SHORT_5_5_5_1&&(O=i.RGB5_A1)}return(O===i.R16F||O===i.R32F||O===i.RG16F||O===i.RG32F||O===i.RGBA16F||O===i.RGBA32F)&&e.get("EXT_color_buffer_float"),O}function x(C,y){let M;return C?y===null||y===ui||y===vs?M=i.DEPTH24_STENCIL8:y===ln?M=i.DEPTH32F_STENCIL8:y===_s&&(M=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===ui||y===vs?M=i.DEPTH_COMPONENT24:y===ln?M=i.DEPTH_COMPONENT32F:y===_s&&(M=i.DEPTH_COMPONENT16),M}function P(C,y){return m(C)===!0||C.isFramebufferTexture&&C.minFilter!==Ot&&C.minFilter!==qt?Math.log2(Math.max(y.width,y.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?y.mipmaps.length:1}function R(C){const y=C.target;y.removeEventListener("dispose",R),A(y),y.isVideoTexture&&l.delete(y)}function w(C){const y=C.target;y.removeEventListener("dispose",w),v(y)}function A(C){const y=n.get(C);if(y.__webglInit===void 0)return;const M=C.source,L=d.get(M);if(L){const F=L[y.__cacheKey];F.usedTimes--,F.usedTimes===0&&S(C),Object.keys(L).length===0&&d.delete(M)}n.remove(C)}function S(C){const y=n.get(C);i.deleteTexture(y.__webglTexture);const M=C.source,L=d.get(M);delete L[y.__cacheKey],a.memory.textures--}function v(C){const y=n.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),n.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let L=0;L<6;L++){if(Array.isArray(y.__webglFramebuffer[L]))for(let F=0;F<y.__webglFramebuffer[L].length;F++)i.deleteFramebuffer(y.__webglFramebuffer[L][F]);else i.deleteFramebuffer(y.__webglFramebuffer[L]);y.__webglDepthbuffer&&i.deleteRenderbuffer(y.__webglDepthbuffer[L])}else{if(Array.isArray(y.__webglFramebuffer))for(let L=0;L<y.__webglFramebuffer.length;L++)i.deleteFramebuffer(y.__webglFramebuffer[L]);else i.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&i.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&i.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let L=0;L<y.__webglColorRenderbuffer.length;L++)y.__webglColorRenderbuffer[L]&&i.deleteRenderbuffer(y.__webglColorRenderbuffer[L]);y.__webglDepthRenderbuffer&&i.deleteRenderbuffer(y.__webglDepthRenderbuffer)}const M=C.textures;for(let L=0,F=M.length;L<F;L++){const O=n.get(M[L]);O.__webglTexture&&(i.deleteTexture(O.__webglTexture),a.memory.textures--),n.remove(M[L])}n.remove(C)}let I=0;function H(){I=0}function z(){const C=I;return C>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+s.maxTextures),I+=1,C}function X(C){const y=[];return y.push(C.wrapS),y.push(C.wrapT),y.push(C.wrapR||0),y.push(C.magFilter),y.push(C.minFilter),y.push(C.anisotropy),y.push(C.internalFormat),y.push(C.format),y.push(C.type),y.push(C.generateMipmaps),y.push(C.premultiplyAlpha),y.push(C.flipY),y.push(C.unpackAlignment),y.push(C.colorSpace),y.join()}function Y(C,y){const M=n.get(C);if(C.isVideoTexture&&Te(C),C.isRenderTargetTexture===!1&&C.version>0&&M.__version!==C.version){const L=C.image;if(L===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(L.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Ee(M,C,y);return}}t.bindTexture(i.TEXTURE_2D,M.__webglTexture,i.TEXTURE0+y)}function $(C,y){const M=n.get(C);if(C.version>0&&M.__version!==C.version){Ee(M,C,y);return}t.bindTexture(i.TEXTURE_2D_ARRAY,M.__webglTexture,i.TEXTURE0+y)}function te(C,y){const M=n.get(C);if(C.version>0&&M.__version!==C.version){Ee(M,C,y);return}t.bindTexture(i.TEXTURE_3D,M.__webglTexture,i.TEXTURE0+y)}function W(C,y){const M=n.get(C);if(C.version>0&&M.__version!==C.version){fe(M,C,y);return}t.bindTexture(i.TEXTURE_CUBE_MAP,M.__webglTexture,i.TEXTURE0+y)}const he={[ki]:i.REPEAT,[Wn]:i.CLAMP_TO_EDGE,[gr]:i.MIRRORED_REPEAT},pe={[Ot]:i.NEAREST,[Vl]:i.NEAREST_MIPMAP_NEAREST,[ds]:i.NEAREST_MIPMAP_LINEAR,[qt]:i.LINEAR,[or]:i.LINEAR_MIPMAP_NEAREST,[Pn]:i.LINEAR_MIPMAP_LINEAR},we={[ad]:i.NEVER,[dd]:i.ALWAYS,[od]:i.LESS,[Jl]:i.LEQUAL,[cd]:i.EQUAL,[hd]:i.GEQUAL,[ld]:i.GREATER,[ud]:i.NOTEQUAL};function Ce(C,y){if(y.type===ln&&e.has("OES_texture_float_linear")===!1&&(y.magFilter===qt||y.magFilter===or||y.magFilter===ds||y.magFilter===Pn||y.minFilter===qt||y.minFilter===or||y.minFilter===ds||y.minFilter===Pn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(C,i.TEXTURE_WRAP_S,he[y.wrapS]),i.texParameteri(C,i.TEXTURE_WRAP_T,he[y.wrapT]),(C===i.TEXTURE_3D||C===i.TEXTURE_2D_ARRAY)&&i.texParameteri(C,i.TEXTURE_WRAP_R,he[y.wrapR]),i.texParameteri(C,i.TEXTURE_MAG_FILTER,pe[y.magFilter]),i.texParameteri(C,i.TEXTURE_MIN_FILTER,pe[y.minFilter]),y.compareFunction&&(i.texParameteri(C,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(C,i.TEXTURE_COMPARE_FUNC,we[y.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===Ot||y.minFilter!==ds&&y.minFilter!==Pn||y.type===ln&&e.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||n.get(y).__currentAnisotropy){const M=e.get("EXT_texture_filter_anisotropic");i.texParameterf(C,M.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,s.getMaxAnisotropy())),n.get(y).__currentAnisotropy=y.anisotropy}}}function je(C,y){let M=!1;C.__webglInit===void 0&&(C.__webglInit=!0,y.addEventListener("dispose",R));const L=y.source;let F=d.get(L);F===void 0&&(F={},d.set(L,F));const O=X(y);if(O!==C.__cacheKey){F[O]===void 0&&(F[O]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,M=!0),F[O].usedTimes++;const J=F[C.__cacheKey];J!==void 0&&(F[C.__cacheKey].usedTimes--,J.usedTimes===0&&S(y)),C.__cacheKey=O,C.__webglTexture=F[O].texture}return M}function K(C,y,M){return Math.floor(Math.floor(C/M)/y)}function ce(C,y,M,L){const O=C.updateRanges;if(O.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,y.width,y.height,M,L,y.data);else{O.sort((Z,oe)=>Z.start-oe.start);let J=0;for(let Z=1;Z<O.length;Z++){const oe=O[J],Me=O[Z],re=oe.start+oe.count,ie=K(Me.start,y.width,4),be=K(oe.start,y.width,4);Me.start<=re+1&&ie===be&&K(Me.start+Me.count-1,y.width,4)===ie?oe.count=Math.max(oe.count,Me.start+Me.count-oe.start):(++J,O[J]=Me)}O.length=J+1;const q=i.getParameter(i.UNPACK_ROW_LENGTH),ne=i.getParameter(i.UNPACK_SKIP_PIXELS),Q=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,y.width);for(let Z=0,oe=O.length;Z<oe;Z++){const Me=O[Z],re=Math.floor(Me.start/4),ie=Math.ceil(Me.count/4),be=re%y.width,U=Math.floor(re/y.width),le=ie,ee=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,be),i.pixelStorei(i.UNPACK_SKIP_ROWS,U),t.texSubImage2D(i.TEXTURE_2D,0,be,U,le,ee,M,L,y.data)}C.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,q),i.pixelStorei(i.UNPACK_SKIP_PIXELS,ne),i.pixelStorei(i.UNPACK_SKIP_ROWS,Q)}}function Ee(C,y,M){let L=i.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(L=i.TEXTURE_2D_ARRAY),y.isData3DTexture&&(L=i.TEXTURE_3D);const F=je(C,y),O=y.source;t.bindTexture(L,C.__webglTexture,i.TEXTURE0+M);const J=n.get(O);if(O.version!==J.__version||F===!0){t.activeTexture(i.TEXTURE0+M);const q=Ye.getPrimaries(Ye.workingColorSpace),ne=y.colorSpace===Gn?null:Ye.getPrimaries(y.colorSpace),Q=y.colorSpace===Gn||q===ne?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Q);let Z=_(y.image,!1,s.maxTextureSize);Z=Ue(y,Z);const oe=r.convert(y.format,y.colorSpace),Me=r.convert(y.type);let re=b(y.internalFormat,oe,Me,y.colorSpace,y.isVideoTexture);Ce(L,y);let ie;const be=y.mipmaps,U=y.isVideoTexture!==!0,le=J.__version===void 0||F===!0,ee=O.dataReady,ge=P(y,Z);if(y.isDepthTexture)re=x(y.format===Ms,y.type),le&&(U?t.texStorage2D(i.TEXTURE_2D,1,re,Z.width,Z.height):t.texImage2D(i.TEXTURE_2D,0,re,Z.width,Z.height,0,oe,Me,null));else if(y.isDataTexture)if(be.length>0){U&&le&&t.texStorage2D(i.TEXTURE_2D,ge,re,be[0].width,be[0].height);for(let se=0,j=be.length;se<j;se++)ie=be[se],U?ee&&t.texSubImage2D(i.TEXTURE_2D,se,0,0,ie.width,ie.height,oe,Me,ie.data):t.texImage2D(i.TEXTURE_2D,se,re,ie.width,ie.height,0,oe,Me,ie.data);y.generateMipmaps=!1}else U?(le&&t.texStorage2D(i.TEXTURE_2D,ge,re,Z.width,Z.height),ee&&ce(y,Z,oe,Me)):t.texImage2D(i.TEXTURE_2D,0,re,Z.width,Z.height,0,oe,Me,Z.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){U&&le&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ge,re,be[0].width,be[0].height,Z.depth);for(let se=0,j=be.length;se<j;se++)if(ie=be[se],y.format!==Qt)if(oe!==null)if(U){if(ee)if(y.layerUpdates.size>0){const ve=Gc(ie.width,ie.height,y.format,y.type);for(const Ie of y.layerUpdates){const ct=ie.data.subarray(Ie*ve/ie.data.BYTES_PER_ELEMENT,(Ie+1)*ve/ie.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,se,0,0,Ie,ie.width,ie.height,1,oe,ct)}y.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,se,0,0,0,ie.width,ie.height,Z.depth,oe,ie.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,se,re,ie.width,ie.height,Z.depth,0,ie.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else U?ee&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,se,0,0,0,ie.width,ie.height,Z.depth,oe,Me,ie.data):t.texImage3D(i.TEXTURE_2D_ARRAY,se,re,ie.width,ie.height,Z.depth,0,oe,Me,ie.data)}else{U&&le&&t.texStorage2D(i.TEXTURE_2D,ge,re,be[0].width,be[0].height);for(let se=0,j=be.length;se<j;se++)ie=be[se],y.format!==Qt?oe!==null?U?ee&&t.compressedTexSubImage2D(i.TEXTURE_2D,se,0,0,ie.width,ie.height,oe,ie.data):t.compressedTexImage2D(i.TEXTURE_2D,se,re,ie.width,ie.height,0,ie.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):U?ee&&t.texSubImage2D(i.TEXTURE_2D,se,0,0,ie.width,ie.height,oe,Me,ie.data):t.texImage2D(i.TEXTURE_2D,se,re,ie.width,ie.height,0,oe,Me,ie.data)}else if(y.isDataArrayTexture)if(U){if(le&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ge,re,Z.width,Z.height,Z.depth),ee)if(y.layerUpdates.size>0){const se=Gc(Z.width,Z.height,y.format,y.type);for(const j of y.layerUpdates){const ve=Z.data.subarray(j*se/Z.data.BYTES_PER_ELEMENT,(j+1)*se/Z.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,j,Z.width,Z.height,1,oe,Me,ve)}y.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,Z.width,Z.height,Z.depth,oe,Me,Z.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,re,Z.width,Z.height,Z.depth,0,oe,Me,Z.data);else if(y.isData3DTexture)U?(le&&t.texStorage3D(i.TEXTURE_3D,ge,re,Z.width,Z.height,Z.depth),ee&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,Z.width,Z.height,Z.depth,oe,Me,Z.data)):t.texImage3D(i.TEXTURE_3D,0,re,Z.width,Z.height,Z.depth,0,oe,Me,Z.data);else if(y.isFramebufferTexture){if(le)if(U)t.texStorage2D(i.TEXTURE_2D,ge,re,Z.width,Z.height);else{let se=Z.width,j=Z.height;for(let ve=0;ve<ge;ve++)t.texImage2D(i.TEXTURE_2D,ve,re,se,j,0,oe,Me,null),se>>=1,j>>=1}}else if(be.length>0){if(U&&le){const se=Be(be[0]);t.texStorage2D(i.TEXTURE_2D,ge,re,se.width,se.height)}for(let se=0,j=be.length;se<j;se++)ie=be[se],U?ee&&t.texSubImage2D(i.TEXTURE_2D,se,0,0,oe,Me,ie):t.texImage2D(i.TEXTURE_2D,se,re,oe,Me,ie);y.generateMipmaps=!1}else if(U){if(le){const se=Be(Z);t.texStorage2D(i.TEXTURE_2D,ge,re,se.width,se.height)}ee&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,oe,Me,Z)}else t.texImage2D(i.TEXTURE_2D,0,re,oe,Me,Z);m(y)&&p(L),J.__version=O.version,y.onUpdate&&y.onUpdate(y)}C.__version=y.version}function fe(C,y,M){if(y.image.length!==6)return;const L=je(C,y),F=y.source;t.bindTexture(i.TEXTURE_CUBE_MAP,C.__webglTexture,i.TEXTURE0+M);const O=n.get(F);if(F.version!==O.__version||L===!0){t.activeTexture(i.TEXTURE0+M);const J=Ye.getPrimaries(Ye.workingColorSpace),q=y.colorSpace===Gn?null:Ye.getPrimaries(y.colorSpace),ne=y.colorSpace===Gn||J===q?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ne);const Q=y.isCompressedTexture||y.image[0].isCompressedTexture,Z=y.image[0]&&y.image[0].isDataTexture,oe=[];for(let j=0;j<6;j++)!Q&&!Z?oe[j]=_(y.image[j],!0,s.maxCubemapSize):oe[j]=Z?y.image[j].image:y.image[j],oe[j]=Ue(y,oe[j]);const Me=oe[0],re=r.convert(y.format,y.colorSpace),ie=r.convert(y.type),be=b(y.internalFormat,re,ie,y.colorSpace),U=y.isVideoTexture!==!0,le=O.__version===void 0||L===!0,ee=F.dataReady;let ge=P(y,Me);Ce(i.TEXTURE_CUBE_MAP,y);let se;if(Q){U&&le&&t.texStorage2D(i.TEXTURE_CUBE_MAP,ge,be,Me.width,Me.height);for(let j=0;j<6;j++){se=oe[j].mipmaps;for(let ve=0;ve<se.length;ve++){const Ie=se[ve];y.format!==Qt?re!==null?U?ee&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,ve,0,0,Ie.width,Ie.height,re,Ie.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,ve,be,Ie.width,Ie.height,0,Ie.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):U?ee&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,ve,0,0,Ie.width,Ie.height,re,ie,Ie.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,ve,be,Ie.width,Ie.height,0,re,ie,Ie.data)}}}else{if(se=y.mipmaps,U&&le){se.length>0&&ge++;const j=Be(oe[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,ge,be,j.width,j.height)}for(let j=0;j<6;j++)if(Z){U?ee&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,oe[j].width,oe[j].height,re,ie,oe[j].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,be,oe[j].width,oe[j].height,0,re,ie,oe[j].data);for(let ve=0;ve<se.length;ve++){const ct=se[ve].image[j].image;U?ee&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,ve+1,0,0,ct.width,ct.height,re,ie,ct.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,ve+1,be,ct.width,ct.height,0,re,ie,ct.data)}}else{U?ee&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,re,ie,oe[j]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,be,re,ie,oe[j]);for(let ve=0;ve<se.length;ve++){const Ie=se[ve];U?ee&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,ve+1,0,0,re,ie,Ie.image[j]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,ve+1,be,re,ie,Ie.image[j])}}}m(y)&&p(i.TEXTURE_CUBE_MAP),O.__version=F.version,y.onUpdate&&y.onUpdate(y)}C.__version=y.version}function me(C,y,M,L,F,O){const J=r.convert(M.format,M.colorSpace),q=r.convert(M.type),ne=b(M.internalFormat,J,q,M.colorSpace),Q=n.get(y),Z=n.get(M);if(Z.__renderTarget=y,!Q.__hasExternalTextures){const oe=Math.max(1,y.width>>O),Me=Math.max(1,y.height>>O);F===i.TEXTURE_3D||F===i.TEXTURE_2D_ARRAY?t.texImage3D(F,O,ne,oe,Me,y.depth,0,J,q,null):t.texImage2D(F,O,ne,oe,Me,0,J,q,null)}t.bindFramebuffer(i.FRAMEBUFFER,C),Xe(y)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,L,F,Z.__webglTexture,0,Se(y)):(F===i.TEXTURE_2D||F>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&F<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,L,F,Z.__webglTexture,O),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ge(C,y,M){if(i.bindRenderbuffer(i.RENDERBUFFER,C),y.depthBuffer){const L=y.depthTexture,F=L&&L.isDepthTexture?L.type:null,O=x(y.stencilBuffer,F),J=y.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,q=Se(y);Xe(y)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,q,O,y.width,y.height):M?i.renderbufferStorageMultisample(i.RENDERBUFFER,q,O,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,O,y.width,y.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,J,i.RENDERBUFFER,C)}else{const L=y.textures;for(let F=0;F<L.length;F++){const O=L[F],J=r.convert(O.format,O.colorSpace),q=r.convert(O.type),ne=b(O.internalFormat,J,q,O.colorSpace),Q=Se(y);M&&Xe(y)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Q,ne,y.width,y.height):Xe(y)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Q,ne,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,ne,y.width,y.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function xe(C,y){if(y&&y.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,C),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const L=n.get(y.depthTexture);L.__renderTarget=y,(!L.__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),Y(y.depthTexture,0);const F=L.__webglTexture,O=Se(y);if(y.depthTexture.format===xs)Xe(y)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,F,0,O):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,F,0);else if(y.depthTexture.format===Ms)Xe(y)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,F,0,O):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,F,0);else throw new Error("Unknown depthTexture format")}function ot(C){const y=n.get(C),M=C.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==C.depthTexture){const L=C.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),L){const F=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,L.removeEventListener("dispose",F)};L.addEventListener("dispose",F),y.__depthDisposeCallback=F}y.__boundDepthTexture=L}if(C.depthTexture&&!y.__autoAllocateDepthBuffer){if(M)throw new Error("target.depthTexture not supported in Cube render targets");const L=C.texture.mipmaps;L&&L.length>0?xe(y.__webglFramebuffer[0],C):xe(y.__webglFramebuffer,C)}else if(M){y.__webglDepthbuffer=[];for(let L=0;L<6;L++)if(t.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer[L]),y.__webglDepthbuffer[L]===void 0)y.__webglDepthbuffer[L]=i.createRenderbuffer(),Ge(y.__webglDepthbuffer[L],C,!1);else{const F=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,O=y.__webglDepthbuffer[L];i.bindRenderbuffer(i.RENDERBUFFER,O),i.framebufferRenderbuffer(i.FRAMEBUFFER,F,i.RENDERBUFFER,O)}}else{const L=C.texture.mipmaps;if(L&&L.length>0?t.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=i.createRenderbuffer(),Ge(y.__webglDepthbuffer,C,!1);else{const F=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,O=y.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,O),i.framebufferRenderbuffer(i.FRAMEBUFFER,F,i.RENDERBUFFER,O)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function ht(C,y,M){const L=n.get(C);y!==void 0&&me(L.__webglFramebuffer,C,C.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),M!==void 0&&ot(C)}function ze(C){const y=C.texture,M=n.get(C),L=n.get(y);C.addEventListener("dispose",w);const F=C.textures,O=C.isWebGLCubeRenderTarget===!0,J=F.length>1;if(J||(L.__webglTexture===void 0&&(L.__webglTexture=i.createTexture()),L.__version=y.version,a.memory.textures++),O){M.__webglFramebuffer=[];for(let q=0;q<6;q++)if(y.mipmaps&&y.mipmaps.length>0){M.__webglFramebuffer[q]=[];for(let ne=0;ne<y.mipmaps.length;ne++)M.__webglFramebuffer[q][ne]=i.createFramebuffer()}else M.__webglFramebuffer[q]=i.createFramebuffer()}else{if(y.mipmaps&&y.mipmaps.length>0){M.__webglFramebuffer=[];for(let q=0;q<y.mipmaps.length;q++)M.__webglFramebuffer[q]=i.createFramebuffer()}else M.__webglFramebuffer=i.createFramebuffer();if(J)for(let q=0,ne=F.length;q<ne;q++){const Q=n.get(F[q]);Q.__webglTexture===void 0&&(Q.__webglTexture=i.createTexture(),a.memory.textures++)}if(C.samples>0&&Xe(C)===!1){M.__webglMultisampledFramebuffer=i.createFramebuffer(),M.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,M.__webglMultisampledFramebuffer);for(let q=0;q<F.length;q++){const ne=F[q];M.__webglColorRenderbuffer[q]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,M.__webglColorRenderbuffer[q]);const Q=r.convert(ne.format,ne.colorSpace),Z=r.convert(ne.type),oe=b(ne.internalFormat,Q,Z,ne.colorSpace,C.isXRRenderTarget===!0),Me=Se(C);i.renderbufferStorageMultisample(i.RENDERBUFFER,Me,oe,C.width,C.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+q,i.RENDERBUFFER,M.__webglColorRenderbuffer[q])}i.bindRenderbuffer(i.RENDERBUFFER,null),C.depthBuffer&&(M.__webglDepthRenderbuffer=i.createRenderbuffer(),Ge(M.__webglDepthRenderbuffer,C,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(O){t.bindTexture(i.TEXTURE_CUBE_MAP,L.__webglTexture),Ce(i.TEXTURE_CUBE_MAP,y);for(let q=0;q<6;q++)if(y.mipmaps&&y.mipmaps.length>0)for(let ne=0;ne<y.mipmaps.length;ne++)me(M.__webglFramebuffer[q][ne],C,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+q,ne);else me(M.__webglFramebuffer[q],C,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+q,0);m(y)&&p(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(J){for(let q=0,ne=F.length;q<ne;q++){const Q=F[q],Z=n.get(Q);t.bindTexture(i.TEXTURE_2D,Z.__webglTexture),Ce(i.TEXTURE_2D,Q),me(M.__webglFramebuffer,C,Q,i.COLOR_ATTACHMENT0+q,i.TEXTURE_2D,0),m(Q)&&p(i.TEXTURE_2D)}t.unbindTexture()}else{let q=i.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(q=C.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(q,L.__webglTexture),Ce(q,y),y.mipmaps&&y.mipmaps.length>0)for(let ne=0;ne<y.mipmaps.length;ne++)me(M.__webglFramebuffer[ne],C,y,i.COLOR_ATTACHMENT0,q,ne);else me(M.__webglFramebuffer,C,y,i.COLOR_ATTACHMENT0,q,0);m(y)&&p(q),t.unbindTexture()}C.depthBuffer&&ot(C)}function D(C){const y=C.textures;for(let M=0,L=y.length;M<L;M++){const F=y[M];if(m(F)){const O=E(C),J=n.get(F).__webglTexture;t.bindTexture(O,J),p(O),t.unbindTexture()}}}const xt=[],qe=[];function et(C){if(C.samples>0){if(Xe(C)===!1){const y=C.textures,M=C.width,L=C.height;let F=i.COLOR_BUFFER_BIT;const O=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,J=n.get(C),q=y.length>1;if(q)for(let Q=0;Q<y.length;Q++)t.bindFramebuffer(i.FRAMEBUFFER,J.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Q,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,J.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Q,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,J.__webglMultisampledFramebuffer);const ne=C.texture.mipmaps;ne&&ne.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,J.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,J.__webglFramebuffer);for(let Q=0;Q<y.length;Q++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(F|=i.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(F|=i.STENCIL_BUFFER_BIT)),q){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,J.__webglColorRenderbuffer[Q]);const Z=n.get(y[Q]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Z,0)}i.blitFramebuffer(0,0,M,L,0,0,M,L,F,i.NEAREST),c===!0&&(xt.length=0,qe.length=0,xt.push(i.COLOR_ATTACHMENT0+Q),C.depthBuffer&&C.resolveDepthBuffer===!1&&(xt.push(O),qe.push(O),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,qe)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,xt))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),q)for(let Q=0;Q<y.length;Q++){t.bindFramebuffer(i.FRAMEBUFFER,J.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Q,i.RENDERBUFFER,J.__webglColorRenderbuffer[Q]);const Z=n.get(y[Q]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,J.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Q,i.TEXTURE_2D,Z,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,J.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&c){const y=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[y])}}}function Se(C){return Math.min(s.maxSamples,C.samples)}function Xe(C){const y=n.get(C);return C.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function Te(C){const y=a.render.frame;l.get(C)!==y&&(l.set(C,y),C.update())}function Ue(C,y){const M=C.colorSpace,L=C.format,F=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||M!==kt&&M!==Gn&&(Ye.getTransfer(M)===at?(L!==Qt||F!==xn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",M)),y}function Be(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(u.width=C.naturalWidth||C.width,u.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(u.width=C.displayWidth,u.height=C.displayHeight):(u.width=C.width,u.height=C.height),u}this.allocateTextureUnit=z,this.resetTextureUnits=H,this.setTexture2D=Y,this.setTexture2DArray=$,this.setTexture3D=te,this.setTextureCube=W,this.rebindTextures=ht,this.setupRenderTarget=ze,this.updateRenderTargetMipmap=D,this.updateMultisampleRenderTarget=et,this.setupDepthRenderbuffer=ot,this.setupFrameBufferTexture=me,this.useMultisampledRTT=Xe}function S0(i,e){function t(n,s=Gn){let r;const a=Ye.getTransfer(s);if(n===xn)return i.UNSIGNED_BYTE;if(n===mo)return i.UNSIGNED_SHORT_4_4_4_4;if(n===go)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Xl)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Gl)return i.BYTE;if(n===Wl)return i.SHORT;if(n===_s)return i.UNSIGNED_SHORT;if(n===po)return i.INT;if(n===ui)return i.UNSIGNED_INT;if(n===ln)return i.FLOAT;if(n===bs)return i.HALF_FLOAT;if(n===$l)return i.ALPHA;if(n===ql)return i.RGB;if(n===Qt)return i.RGBA;if(n===xs)return i.DEPTH_COMPONENT;if(n===Ms)return i.DEPTH_STENCIL;if(n===_o)return i.RED;if(n===vo)return i.RED_INTEGER;if(n===Yl)return i.RG;if(n===xo)return i.RG_INTEGER;if(n===Mo)return i.RGBA_INTEGER;if(n===cr||n===lr||n===ur||n===hr)if(a===at)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===cr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===lr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===ur)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===hr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===cr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===lr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===ur)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===hr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Pa||n===La||n===Ia||n===Da)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Pa)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===La)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Ia)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Da)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Na||n===Ua||n===Fa)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Na||n===Ua)return a===at?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Fa)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Oa||n===Ba||n===ka||n===za||n===Ha||n===Va||n===Ga||n===Wa||n===Xa||n===$a||n===qa||n===Ya||n===Ka||n===ja)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Oa)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ba)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===ka)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===za)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Ha)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Va)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Ga)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Wa)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Xa)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===$a)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===qa)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ya)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Ka)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===ja)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===dr||n===Za||n===Ja)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===dr)return a===at?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Za)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ja)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Kl||n===Qa||n===eo||n===to)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===dr)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Qa)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===eo)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===to)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===vs?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const E0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,T0=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class b0{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const s=new St,r=e.properties.get(s);r.__webglTexture=t.texture,(t.depthNear!==n.depthNear||t.depthFar!==n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=s}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new qn({vertexShader:E0,fragmentShader:T0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Ke(new Vi(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class w0 extends qi{constructor(e,t){super();const n=this;let s=null,r=1,a=null,o="local-floor",c=1,u=null,l=null,h=null,d=null,f=null,g=null;const _=new b0,m=t.getContextAttributes();let p=null,E=null;const b=[],x=[],P=new Ne;let R=null;const w=new Ut;w.viewport=new Qe;const A=new Ut;A.viewport=new Qe;const S=[w,A],v=new Bf;let I=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let ce=b[K];return ce===void 0&&(ce=new Qr,b[K]=ce),ce.getTargetRaySpace()},this.getControllerGrip=function(K){let ce=b[K];return ce===void 0&&(ce=new Qr,b[K]=ce),ce.getGripSpace()},this.getHand=function(K){let ce=b[K];return ce===void 0&&(ce=new Qr,b[K]=ce),ce.getHandSpace()};function z(K){const ce=x.indexOf(K.inputSource);if(ce===-1)return;const Ee=b[ce];Ee!==void 0&&(Ee.update(K.inputSource,K.frame,u||a),Ee.dispatchEvent({type:K.type,data:K.inputSource}))}function X(){s.removeEventListener("select",z),s.removeEventListener("selectstart",z),s.removeEventListener("selectend",z),s.removeEventListener("squeeze",z),s.removeEventListener("squeezestart",z),s.removeEventListener("squeezeend",z),s.removeEventListener("end",X),s.removeEventListener("inputsourceschange",Y);for(let K=0;K<b.length;K++){const ce=x[K];ce!==null&&(x[K]=null,b[K].disconnect(ce))}I=null,H=null,_.reset(),e.setRenderTarget(p),f=null,d=null,h=null,s=null,E=null,je.stop(),n.isPresenting=!1,e.setPixelRatio(R),e.setSize(P.width,P.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){r=K,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){o=K,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return u||a},this.setReferenceSpace=function(K){u=K},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return h},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(K){if(s=K,s!==null){if(p=e.getRenderTarget(),s.addEventListener("select",z),s.addEventListener("selectstart",z),s.addEventListener("selectend",z),s.addEventListener("squeeze",z),s.addEventListener("squeezestart",z),s.addEventListener("squeezeend",z),s.addEventListener("end",X),s.addEventListener("inputsourceschange",Y),m.xrCompatible!==!0&&await t.makeXRCompatible(),R=e.getPixelRatio(),e.getSize(P),typeof XRWebGLBinding<"u"&&"createProjectionLayer"in XRWebGLBinding.prototype){let Ee=null,fe=null,me=null;m.depth&&(me=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Ee=m.stencil?Ms:xs,fe=m.stencil?vs:ui);const Ge={colorFormat:t.RGBA8,depthFormat:me,scaleFactor:r};h=new XRWebGLBinding(s,t),d=h.createProjectionLayer(Ge),s.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),E=new hi(d.textureWidth,d.textureHeight,{format:Qt,type:xn,depthTexture:new fu(d.textureWidth,d.textureHeight,fe,void 0,void 0,void 0,void 0,void 0,void 0,Ee),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const Ee={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,Ee),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),E=new hi(f.framebufferWidth,f.framebufferHeight,{format:Qt,type:xn,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}E.isXRRenderTarget=!0,this.setFoveation(c),u=null,a=await s.requestReferenceSpace(o),je.setContext(s),je.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function Y(K){for(let ce=0;ce<K.removed.length;ce++){const Ee=K.removed[ce],fe=x.indexOf(Ee);fe>=0&&(x[fe]=null,b[fe].disconnect(Ee))}for(let ce=0;ce<K.added.length;ce++){const Ee=K.added[ce];let fe=x.indexOf(Ee);if(fe===-1){for(let Ge=0;Ge<b.length;Ge++)if(Ge>=x.length){x.push(Ee),fe=Ge;break}else if(x[Ge]===null){x[Ge]=Ee,fe=Ge;break}if(fe===-1)break}const me=b[fe];me&&me.connect(Ee)}}const $=new N,te=new N;function W(K,ce,Ee){$.setFromMatrixPosition(ce.matrixWorld),te.setFromMatrixPosition(Ee.matrixWorld);const fe=$.distanceTo(te),me=ce.projectionMatrix.elements,Ge=Ee.projectionMatrix.elements,xe=me[14]/(me[10]-1),ot=me[14]/(me[10]+1),ht=(me[9]+1)/me[5],ze=(me[9]-1)/me[5],D=(me[8]-1)/me[0],xt=(Ge[8]+1)/Ge[0],qe=xe*D,et=xe*xt,Se=fe/(-D+xt),Xe=Se*-D;if(ce.matrixWorld.decompose(K.position,K.quaternion,K.scale),K.translateX(Xe),K.translateZ(Se),K.matrixWorld.compose(K.position,K.quaternion,K.scale),K.matrixWorldInverse.copy(K.matrixWorld).invert(),me[10]===-1)K.projectionMatrix.copy(ce.projectionMatrix),K.projectionMatrixInverse.copy(ce.projectionMatrixInverse);else{const Te=xe+Se,Ue=ot+Se,Be=qe-Xe,C=et+(fe-Xe),y=ht*ot/Ue*Te,M=ze*ot/Ue*Te;K.projectionMatrix.makePerspective(Be,C,y,M,Te,Ue),K.projectionMatrixInverse.copy(K.projectionMatrix).invert()}}function he(K,ce){ce===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(ce.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(s===null)return;let ce=K.near,Ee=K.far;_.texture!==null&&(_.depthNear>0&&(ce=_.depthNear),_.depthFar>0&&(Ee=_.depthFar)),v.near=A.near=w.near=ce,v.far=A.far=w.far=Ee,(I!==v.near||H!==v.far)&&(s.updateRenderState({depthNear:v.near,depthFar:v.far}),I=v.near,H=v.far),w.layers.mask=K.layers.mask|2,A.layers.mask=K.layers.mask|4,v.layers.mask=w.layers.mask|A.layers.mask;const fe=K.parent,me=v.cameras;he(v,fe);for(let Ge=0;Ge<me.length;Ge++)he(me[Ge],fe);me.length===2?W(v,w,A):v.projectionMatrix.copy(w.projectionMatrix),pe(K,v,fe)};function pe(K,ce,Ee){Ee===null?K.matrix.copy(ce.matrixWorld):(K.matrix.copy(Ee.matrixWorld),K.matrix.invert(),K.matrix.multiply(ce.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy(ce.projectionMatrix),K.projectionMatrixInverse.copy(ce.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=zi*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return v},this.getFoveation=function(){if(!(d===null&&f===null))return c},this.setFoveation=function(K){c=K,d!==null&&(d.fixedFoveation=K),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=K)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(v)};let we=null;function Ce(K,ce){if(l=ce.getViewerPose(u||a),g=ce,l!==null){const Ee=l.views;f!==null&&(e.setRenderTargetFramebuffer(E,f.framebuffer),e.setRenderTarget(E));let fe=!1;Ee.length!==v.cameras.length&&(v.cameras.length=0,fe=!0);for(let xe=0;xe<Ee.length;xe++){const ot=Ee[xe];let ht=null;if(f!==null)ht=f.getViewport(ot);else{const D=h.getViewSubImage(d,ot);ht=D.viewport,xe===0&&(e.setRenderTargetTextures(E,D.colorTexture,D.depthStencilTexture),e.setRenderTarget(E))}let ze=S[xe];ze===void 0&&(ze=new Ut,ze.layers.enable(xe),ze.viewport=new Qe,S[xe]=ze),ze.matrix.fromArray(ot.transform.matrix),ze.matrix.decompose(ze.position,ze.quaternion,ze.scale),ze.projectionMatrix.fromArray(ot.projectionMatrix),ze.projectionMatrixInverse.copy(ze.projectionMatrix).invert(),ze.viewport.set(ht.x,ht.y,ht.width,ht.height),xe===0&&(v.matrix.copy(ze.matrix),v.matrix.decompose(v.position,v.quaternion,v.scale)),fe===!0&&v.cameras.push(ze)}const me=s.enabledFeatures;if(me&&me.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&h){const xe=h.getDepthInformation(Ee[0]);xe&&xe.isValid&&xe.texture&&_.init(e,xe,s.renderState)}}for(let Ee=0;Ee<b.length;Ee++){const fe=x[Ee],me=b[Ee];fe!==null&&me!==void 0&&me.update(fe,ce,u||a)}we&&we(K,ce),ce.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ce}),g=null}const je=new vu;je.setAnimationLoop(Ce),this.setAnimationLoop=function(K){we=K},this.dispose=function(){}}}const ti=new Mn,A0=new Oe;function R0(i,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,ru(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,E,b,x){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),h(m,p)):p.isMeshPhongMaterial?(r(m,p),l(m,p)):p.isMeshStandardMaterial?(r(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,x)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),_(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?c(m,p,E,b):p.isSpriteMaterial?u(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Ct&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Ct&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const E=e.get(p),b=E.envMap,x=E.envMapRotation;b&&(m.envMap.value=b,ti.copy(x),ti.x*=-1,ti.y*=-1,ti.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(ti.y*=-1,ti.z*=-1),m.envMapRotation.value.setFromMatrix4(A0.makeRotationFromEuler(ti)),m.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,E,b){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*E,m.scale.value=b*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function h(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,E){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Ct&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=E.texture,m.transmissionSamplerSize.value.set(E.width,E.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){const E=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(E.matrixWorld),m.nearDistance.value=E.shadow.camera.near,m.farDistance.value=E.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function C0(i,e,t,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(E,b){const x=b.program;n.uniformBlockBinding(E,x)}function u(E,b){let x=s[E.id];x===void 0&&(g(E),x=l(E),s[E.id]=x,E.addEventListener("dispose",m));const P=b.program;n.updateUBOMapping(E,P);const R=e.render.frame;r[E.id]!==R&&(d(E),r[E.id]=R)}function l(E){const b=h();E.__bindingPointIndex=b;const x=i.createBuffer(),P=E.__size,R=E.usage;return i.bindBuffer(i.UNIFORM_BUFFER,x),i.bufferData(i.UNIFORM_BUFFER,P,R),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,b,x),x}function h(){for(let E=0;E<o;E++)if(a.indexOf(E)===-1)return a.push(E),E;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(E){const b=s[E.id],x=E.uniforms,P=E.__cache;i.bindBuffer(i.UNIFORM_BUFFER,b);for(let R=0,w=x.length;R<w;R++){const A=Array.isArray(x[R])?x[R]:[x[R]];for(let S=0,v=A.length;S<v;S++){const I=A[S];if(f(I,R,S,P)===!0){const H=I.__offset,z=Array.isArray(I.value)?I.value:[I.value];let X=0;for(let Y=0;Y<z.length;Y++){const $=z[Y],te=_($);typeof $=="number"||typeof $=="boolean"?(I.__data[0]=$,i.bufferSubData(i.UNIFORM_BUFFER,H+X,I.__data)):$.isMatrix3?(I.__data[0]=$.elements[0],I.__data[1]=$.elements[1],I.__data[2]=$.elements[2],I.__data[3]=0,I.__data[4]=$.elements[3],I.__data[5]=$.elements[4],I.__data[6]=$.elements[5],I.__data[7]=0,I.__data[8]=$.elements[6],I.__data[9]=$.elements[7],I.__data[10]=$.elements[8],I.__data[11]=0):($.toArray(I.__data,X),X+=te.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,H,I.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(E,b,x,P){const R=E.value,w=b+"_"+x;if(P[w]===void 0)return typeof R=="number"||typeof R=="boolean"?P[w]=R:P[w]=R.clone(),!0;{const A=P[w];if(typeof R=="number"||typeof R=="boolean"){if(A!==R)return P[w]=R,!0}else if(A.equals(R)===!1)return A.copy(R),!0}return!1}function g(E){const b=E.uniforms;let x=0;const P=16;for(let w=0,A=b.length;w<A;w++){const S=Array.isArray(b[w])?b[w]:[b[w]];for(let v=0,I=S.length;v<I;v++){const H=S[v],z=Array.isArray(H.value)?H.value:[H.value];for(let X=0,Y=z.length;X<Y;X++){const $=z[X],te=_($),W=x%P,he=W%te.boundary,pe=W+he;x+=he,pe!==0&&P-pe<te.storage&&(x+=P-pe),H.__data=new Float32Array(te.storage/Float32Array.BYTES_PER_ELEMENT),H.__offset=x,x+=te.storage}}}const R=x%P;return R>0&&(x+=P-R),E.__size=x,E.__cache={},this}function _(E){const b={boundary:0,storage:0};return typeof E=="number"||typeof E=="boolean"?(b.boundary=4,b.storage=4):E.isVector2?(b.boundary=8,b.storage=8):E.isVector3||E.isColor?(b.boundary=16,b.storage=12):E.isVector4?(b.boundary=16,b.storage=16):E.isMatrix3?(b.boundary=48,b.storage=48):E.isMatrix4?(b.boundary=64,b.storage=64):E.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",E),b}function m(E){const b=E.target;b.removeEventListener("dispose",m);const x=a.indexOf(b.__bindingPointIndex);a.splice(x,1),i.deleteBuffer(s[b.id]),delete s[b.id],delete r[b.id]}function p(){for(const E in s)i.deleteBuffer(s[E]);a=[],s={},r={}}return{bind:c,update:u,dispose:p}}class fl{constructor(e={}){const{canvas:t=Pd(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:u=!1,powerPreference:l="default",failIfMajorPerformanceCaveat:h=!1,reverseDepthBuffer:d=!1}=e;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=a;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,p=null;const E=[],b=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=$n,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const x=this;let P=!1;this._outputColorSpace=yt;let R=0,w=0,A=null,S=-1,v=null;const I=new Qe,H=new Qe;let z=null;const X=new Pe(0);let Y=0,$=t.width,te=t.height,W=1,he=null,pe=null;const we=new Qe(0,0,$,te),Ce=new Qe(0,0,$,te);let je=!1;const K=new bo;let ce=!1,Ee=!1;const fe=new Oe,me=new Oe,Ge=new N,xe=new Qe,ot={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ht=!1;function ze(){return A===null?W:1}let D=n;function xt(T,B){return t.getContext(T,B)}try{const T={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:u,powerPreference:l,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${fo}`),t.addEventListener("webglcontextlost",ge,!1),t.addEventListener("webglcontextrestored",se,!1),t.addEventListener("webglcontextcreationerror",j,!1),D===null){const B="webgl2";if(D=xt(B,T),D===null)throw xt(B)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let qe,et,Se,Xe,Te,Ue,Be,C,y,M,L,F,O,J,q,ne,Q,Z,oe,Me,re,ie,be,U;function le(){qe=new zg(D),qe.init(),ie=new S0(D,qe),et=new Dg(D,qe,e,ie),Se=new M0(D,qe),et.reverseDepthBuffer&&d&&Se.buffers.depth.setReversed(!0),Xe=new Gg(D),Te=new o0,Ue=new y0(D,qe,Se,Te,et,ie,Xe),Be=new Ug(x),C=new kg(x),y=new Kf(D),be=new Lg(D,y),M=new Hg(D,y,Xe,be),L=new Xg(D,M,y,Xe),oe=new Wg(D,et,Ue),ne=new Ng(Te),F=new a0(x,Be,C,qe,et,be,ne),O=new R0(x,Te),J=new l0,q=new m0(qe),Z=new Pg(x,Be,C,Se,L,f,c),Q=new v0(x,L,et),U=new C0(D,Xe,et,Se),Me=new Ig(D,qe,Xe),re=new Vg(D,qe,Xe),Xe.programs=F.programs,x.capabilities=et,x.extensions=qe,x.properties=Te,x.renderLists=J,x.shadowMap=Q,x.state=Se,x.info=Xe}le();const ee=new w0(x,D);this.xr=ee,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const T=qe.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=qe.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return W},this.setPixelRatio=function(T){T!==void 0&&(W=T,this.setSize($,te,!1))},this.getSize=function(T){return T.set($,te)},this.setSize=function(T,B,V=!0){if(ee.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}$=T,te=B,t.width=Math.floor(T*W),t.height=Math.floor(B*W),V===!0&&(t.style.width=T+"px",t.style.height=B+"px"),this.setViewport(0,0,T,B)},this.getDrawingBufferSize=function(T){return T.set($*W,te*W).floor()},this.setDrawingBufferSize=function(T,B,V){$=T,te=B,W=V,t.width=Math.floor(T*V),t.height=Math.floor(B*V),this.setViewport(0,0,T,B)},this.getCurrentViewport=function(T){return T.copy(I)},this.getViewport=function(T){return T.copy(we)},this.setViewport=function(T,B,V,G){T.isVector4?we.set(T.x,T.y,T.z,T.w):we.set(T,B,V,G),Se.viewport(I.copy(we).multiplyScalar(W).round())},this.getScissor=function(T){return T.copy(Ce)},this.setScissor=function(T,B,V,G){T.isVector4?Ce.set(T.x,T.y,T.z,T.w):Ce.set(T,B,V,G),Se.scissor(H.copy(Ce).multiplyScalar(W).round())},this.getScissorTest=function(){return je},this.setScissorTest=function(T){Se.setScissorTest(je=T)},this.setOpaqueSort=function(T){he=T},this.setTransparentSort=function(T){pe=T},this.getClearColor=function(T){return T.copy(Z.getClearColor())},this.setClearColor=function(){Z.setClearColor(...arguments)},this.getClearAlpha=function(){return Z.getClearAlpha()},this.setClearAlpha=function(){Z.setClearAlpha(...arguments)},this.clear=function(T=!0,B=!0,V=!0){let G=0;if(T){let k=!1;if(A!==null){const ae=A.texture.format;k=ae===Mo||ae===xo||ae===vo}if(k){const ae=A.texture.type,de=ae===xn||ae===ui||ae===_s||ae===vs||ae===mo||ae===go,ye=Z.getClearColor(),_e=Z.getClearAlpha(),Le=ye.r,De=ye.g,Ae=ye.b;de?(g[0]=Le,g[1]=De,g[2]=Ae,g[3]=_e,D.clearBufferuiv(D.COLOR,0,g)):(_[0]=Le,_[1]=De,_[2]=Ae,_[3]=_e,D.clearBufferiv(D.COLOR,0,_))}else G|=D.COLOR_BUFFER_BIT}B&&(G|=D.DEPTH_BUFFER_BIT),V&&(G|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),D.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ge,!1),t.removeEventListener("webglcontextrestored",se,!1),t.removeEventListener("webglcontextcreationerror",j,!1),Z.dispose(),J.dispose(),q.dispose(),Te.dispose(),Be.dispose(),C.dispose(),L.dispose(),be.dispose(),U.dispose(),F.dispose(),ee.dispose(),ee.removeEventListener("sessionstart",Un),ee.removeEventListener("sessionend",Ji),pn.stop()};function ge(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),P=!0}function se(){console.log("THREE.WebGLRenderer: Context Restored."),P=!1;const T=Xe.autoReset,B=Q.enabled,V=Q.autoUpdate,G=Q.needsUpdate,k=Q.type;le(),Xe.autoReset=T,Q.enabled=B,Q.autoUpdate=V,Q.needsUpdate=G,Q.type=k}function j(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function ve(T){const B=T.target;B.removeEventListener("dispose",ve),Ie(B)}function Ie(T){ct(T),Te.remove(T)}function ct(T){const B=Te.get(T).programs;B!==void 0&&(B.forEach(function(V){F.releaseProgram(V)}),T.isShaderMaterial&&F.releaseShaderCache(T))}this.renderBufferDirect=function(T,B,V,G,k,ae){B===null&&(B=ot);const de=k.isMesh&&k.matrixWorld.determinant()<0,ye=wu(T,B,V,G,k);Se.setMaterial(G,de);let _e=V.index,Le=1;if(G.wireframe===!0){if(_e=M.getWireframeAttribute(V),_e===void 0)return;Le=2}const De=V.drawRange,Ae=V.attributes.position;let We=De.start*Le,st=(De.start+De.count)*Le;ae!==null&&(We=Math.max(We,ae.start*Le),st=Math.min(st,(ae.start+ae.count)*Le)),_e!==null?(We=Math.max(We,0),st=Math.min(st,_e.count)):Ae!=null&&(We=Math.max(We,0),st=Math.min(st,Ae.count));const gt=st-We;if(gt<0||gt===1/0)return;be.setup(k,G,ye,V,_e);let dt,lt=Me;if(_e!==null&&(dt=y.get(_e),lt=re,lt.setIndex(dt)),k.isMesh)G.wireframe===!0?(Se.setLineWidth(G.wireframeLinewidth*ze()),lt.setMode(D.LINES)):lt.setMode(D.TRIANGLES);else if(k.isLine){let Re=G.linewidth;Re===void 0&&(Re=1),Se.setLineWidth(Re*ze()),k.isLineSegments?lt.setMode(D.LINES):k.isLineLoop?lt.setMode(D.LINE_LOOP):lt.setMode(D.LINE_STRIP)}else k.isPoints?lt.setMode(D.POINTS):k.isSprite&&lt.setMode(D.TRIANGLES);if(k.isBatchedMesh)if(k._multiDrawInstances!==null)Di("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),lt.renderMultiDrawInstances(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount,k._multiDrawInstances);else if(qe.get("WEBGL_multi_draw"))lt.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else{const Re=k._multiDrawStarts,mt=k._multiDrawCounts,Ze=k._multiDrawCount,Vt=_e?y.get(_e).bytesPerElement:1,di=Te.get(G).currentProgram.getUniforms();for(let Gt=0;Gt<Ze;Gt++)di.setValue(D,"_gl_DrawID",Gt),lt.render(Re[Gt]/Vt,mt[Gt])}else if(k.isInstancedMesh)lt.renderInstances(We,gt,k.count);else if(V.isInstancedBufferGeometry){const Re=V._maxInstanceCount!==void 0?V._maxInstanceCount:1/0,mt=Math.min(V.instanceCount,Re);lt.renderInstances(We,gt,mt)}else lt.render(We,gt)};function Je(T,B,V){T.transparent===!0&&T.side===_n&&T.forceSinglePass===!1?(T.side=Ct,T.needsUpdate=!0,Rs(T,B,V),T.side=Nn,T.needsUpdate=!0,Rs(T,B,V),T.side=_n):Rs(T,B,V)}this.compile=function(T,B,V=null){V===null&&(V=T),p=q.get(V),p.init(B),b.push(p),V.traverseVisible(function(k){k.isLight&&k.layers.test(B.layers)&&(p.pushLight(k),k.castShadow&&p.pushShadow(k))}),T!==V&&T.traverseVisible(function(k){k.isLight&&k.layers.test(B.layers)&&(p.pushLight(k),k.castShadow&&p.pushShadow(k))}),p.setupLights();const G=new Set;return T.traverse(function(k){if(!(k.isMesh||k.isPoints||k.isLine||k.isSprite))return;const ae=k.material;if(ae)if(Array.isArray(ae))for(let de=0;de<ae.length;de++){const ye=ae[de];Je(ye,V,k),G.add(ye)}else Je(ae,V,k),G.add(ae)}),p=b.pop(),G},this.compileAsync=function(T,B,V=null){const G=this.compile(T,B,V);return new Promise(k=>{function ae(){if(G.forEach(function(de){Te.get(de).currentProgram.isReady()&&G.delete(de)}),G.size===0){k(T);return}setTimeout(ae,10)}qe.get("KHR_parallel_shader_compile")!==null?ae():setTimeout(ae,10)})};let Lt=null;function en(T){Lt&&Lt(T)}function Un(){pn.stop()}function Ji(){pn.start()}const pn=new vu;pn.setAnimationLoop(en),typeof self<"u"&&pn.setContext(self),this.setAnimationLoop=function(T){Lt=T,ee.setAnimationLoop(T),T===null?pn.stop():pn.start()},ee.addEventListener("sessionstart",Un),ee.addEventListener("sessionend",Ji),this.render=function(T,B){if(B!==void 0&&B.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),ee.enabled===!0&&ee.isPresenting===!0&&(ee.cameraAutoUpdate===!0&&ee.updateCamera(B),B=ee.getCamera()),T.isScene===!0&&T.onBeforeRender(x,T,B,A),p=q.get(T,b.length),p.init(B),b.push(p),me.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),K.setFromProjectionMatrix(me),Ee=this.localClippingEnabled,ce=ne.init(this.clippingPlanes,Ee),m=J.get(T,E.length),m.init(),E.push(m),ee.enabled===!0&&ee.isPresenting===!0){const ae=x.xr.getDepthSensingMesh();ae!==null&&Ar(ae,B,-1/0,x.sortObjects)}Ar(T,B,0,x.sortObjects),m.finish(),x.sortObjects===!0&&m.sort(he,pe),ht=ee.enabled===!1||ee.isPresenting===!1||ee.hasDepthSensing()===!1,ht&&Z.addToRenderList(m,T),this.info.render.frame++,ce===!0&&ne.beginShadows();const V=p.state.shadowsArray;Q.render(V,T,B),ce===!0&&ne.endShadows(),this.info.autoReset===!0&&this.info.reset();const G=m.opaque,k=m.transmissive;if(p.setupLights(),B.isArrayCamera){const ae=B.cameras;if(k.length>0)for(let de=0,ye=ae.length;de<ye;de++){const _e=ae[de];Fo(G,k,T,_e)}ht&&Z.render(T);for(let de=0,ye=ae.length;de<ye;de++){const _e=ae[de];Uo(m,T,_e,_e.viewport)}}else k.length>0&&Fo(G,k,T,B),ht&&Z.render(T),Uo(m,T,B);A!==null&&w===0&&(Ue.updateMultisampleRenderTarget(A),Ue.updateRenderTargetMipmap(A)),T.isScene===!0&&T.onAfterRender(x,T,B),be.resetDefaultState(),S=-1,v=null,b.pop(),b.length>0?(p=b[b.length-1],ce===!0&&ne.setGlobalState(x.clippingPlanes,p.state.camera)):p=null,E.pop(),E.length>0?m=E[E.length-1]:m=null};function Ar(T,B,V,G){if(T.visible===!1)return;if(T.layers.test(B.layers)){if(T.isGroup)V=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(B);else if(T.isLight)p.pushLight(T),T.castShadow&&p.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||K.intersectsSprite(T)){G&&xe.setFromMatrixPosition(T.matrixWorld).applyMatrix4(me);const de=L.update(T),ye=T.material;ye.visible&&m.push(T,de,ye,V,xe.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||K.intersectsObject(T))){const de=L.update(T),ye=T.material;if(G&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),xe.copy(T.boundingSphere.center)):(de.boundingSphere===null&&de.computeBoundingSphere(),xe.copy(de.boundingSphere.center)),xe.applyMatrix4(T.matrixWorld).applyMatrix4(me)),Array.isArray(ye)){const _e=de.groups;for(let Le=0,De=_e.length;Le<De;Le++){const Ae=_e[Le],We=ye[Ae.materialIndex];We&&We.visible&&m.push(T,de,We,V,xe.z,Ae)}}else ye.visible&&m.push(T,de,ye,V,xe.z,null)}}const ae=T.children;for(let de=0,ye=ae.length;de<ye;de++)Ar(ae[de],B,V,G)}function Uo(T,B,V,G){const k=T.opaque,ae=T.transmissive,de=T.transparent;p.setupLightsView(V),ce===!0&&ne.setGlobalState(x.clippingPlanes,V),G&&Se.viewport(I.copy(G)),k.length>0&&As(k,B,V),ae.length>0&&As(ae,B,V),de.length>0&&As(de,B,V),Se.buffers.depth.setTest(!0),Se.buffers.depth.setMask(!0),Se.buffers.color.setMask(!0),Se.setPolygonOffset(!1)}function Fo(T,B,V,G){if((V.isScene===!0?V.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[G.id]===void 0&&(p.state.transmissionRenderTarget[G.id]=new hi(1,1,{generateMipmaps:!0,type:qe.has("EXT_color_buffer_half_float")||qe.has("EXT_color_buffer_float")?bs:xn,minFilter:Pn,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ye.workingColorSpace}));const ae=p.state.transmissionRenderTarget[G.id],de=G.viewport||I;ae.setSize(de.z*x.transmissionResolutionScale,de.w*x.transmissionResolutionScale);const ye=x.getRenderTarget(),_e=x.getActiveCubeFace(),Le=x.getActiveMipmapLevel();x.setRenderTarget(ae),x.getClearColor(X),Y=x.getClearAlpha(),Y<1&&x.setClearColor(16777215,.5),x.clear(),ht&&Z.render(V);const De=x.toneMapping;x.toneMapping=$n;const Ae=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),p.setupLightsView(G),ce===!0&&ne.setGlobalState(x.clippingPlanes,G),As(T,V,G),Ue.updateMultisampleRenderTarget(ae),Ue.updateRenderTargetMipmap(ae),qe.has("WEBGL_multisampled_render_to_texture")===!1){let We=!1;for(let st=0,gt=B.length;st<gt;st++){const dt=B[st],lt=dt.object,Re=dt.geometry,mt=dt.material,Ze=dt.group;if(mt.side===_n&&lt.layers.test(G.layers)){const Vt=mt.side;mt.side=Ct,mt.needsUpdate=!0,Oo(lt,V,G,Re,mt,Ze),mt.side=Vt,mt.needsUpdate=!0,We=!0}}We===!0&&(Ue.updateMultisampleRenderTarget(ae),Ue.updateRenderTargetMipmap(ae))}x.setRenderTarget(ye,_e,Le),x.setClearColor(X,Y),Ae!==void 0&&(G.viewport=Ae),x.toneMapping=De}function As(T,B,V){const G=B.isScene===!0?B.overrideMaterial:null;for(let k=0,ae=T.length;k<ae;k++){const de=T[k],ye=de.object,_e=de.geometry,Le=de.group;let De=de.material;De.allowOverride===!0&&G!==null&&(De=G),ye.layers.test(V.layers)&&Oo(ye,B,V,_e,De,Le)}}function Oo(T,B,V,G,k,ae){T.onBeforeRender(x,B,V,G,k,ae),T.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),k.onBeforeRender(x,B,V,G,T,ae),k.transparent===!0&&k.side===_n&&k.forceSinglePass===!1?(k.side=Ct,k.needsUpdate=!0,x.renderBufferDirect(V,B,G,k,T,ae),k.side=Nn,k.needsUpdate=!0,x.renderBufferDirect(V,B,G,k,T,ae),k.side=_n):x.renderBufferDirect(V,B,G,k,T,ae),T.onAfterRender(x,B,V,G,k,ae)}function Rs(T,B,V){B.isScene!==!0&&(B=ot);const G=Te.get(T),k=p.state.lights,ae=p.state.shadowsArray,de=k.state.version,ye=F.getParameters(T,k.state,ae,B,V),_e=F.getProgramCacheKey(ye);let Le=G.programs;G.environment=T.isMeshStandardMaterial?B.environment:null,G.fog=B.fog,G.envMap=(T.isMeshStandardMaterial?C:Be).get(T.envMap||G.environment),G.envMapRotation=G.environment!==null&&T.envMap===null?B.environmentRotation:T.envMapRotation,Le===void 0&&(T.addEventListener("dispose",ve),Le=new Map,G.programs=Le);let De=Le.get(_e);if(De!==void 0){if(G.currentProgram===De&&G.lightsStateVersion===de)return ko(T,ye),De}else ye.uniforms=F.getUniforms(T),T.onBeforeCompile(ye,x),De=F.acquireProgram(ye,_e),Le.set(_e,De),G.uniforms=ye.uniforms;const Ae=G.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Ae.clippingPlanes=ne.uniform),ko(T,ye),G.needsLights=Ru(T),G.lightsStateVersion=de,G.needsLights&&(Ae.ambientLightColor.value=k.state.ambient,Ae.lightProbe.value=k.state.probe,Ae.directionalLights.value=k.state.directional,Ae.directionalLightShadows.value=k.state.directionalShadow,Ae.spotLights.value=k.state.spot,Ae.spotLightShadows.value=k.state.spotShadow,Ae.rectAreaLights.value=k.state.rectArea,Ae.ltc_1.value=k.state.rectAreaLTC1,Ae.ltc_2.value=k.state.rectAreaLTC2,Ae.pointLights.value=k.state.point,Ae.pointLightShadows.value=k.state.pointShadow,Ae.hemisphereLights.value=k.state.hemi,Ae.directionalShadowMap.value=k.state.directionalShadowMap,Ae.directionalShadowMatrix.value=k.state.directionalShadowMatrix,Ae.spotShadowMap.value=k.state.spotShadowMap,Ae.spotLightMatrix.value=k.state.spotLightMatrix,Ae.spotLightMap.value=k.state.spotLightMap,Ae.pointShadowMap.value=k.state.pointShadowMap,Ae.pointShadowMatrix.value=k.state.pointShadowMatrix),G.currentProgram=De,G.uniformsList=null,De}function Bo(T){if(T.uniformsList===null){const B=T.currentProgram.getUniforms();T.uniformsList=pr.seqWithValue(B.seq,T.uniforms)}return T.uniformsList}function ko(T,B){const V=Te.get(T);V.outputColorSpace=B.outputColorSpace,V.batching=B.batching,V.batchingColor=B.batchingColor,V.instancing=B.instancing,V.instancingColor=B.instancingColor,V.instancingMorph=B.instancingMorph,V.skinning=B.skinning,V.morphTargets=B.morphTargets,V.morphNormals=B.morphNormals,V.morphColors=B.morphColors,V.morphTargetsCount=B.morphTargetsCount,V.numClippingPlanes=B.numClippingPlanes,V.numIntersection=B.numClipIntersection,V.vertexAlphas=B.vertexAlphas,V.vertexTangents=B.vertexTangents,V.toneMapping=B.toneMapping}function wu(T,B,V,G,k){B.isScene!==!0&&(B=ot),Ue.resetTextureUnits();const ae=B.fog,de=G.isMeshStandardMaterial?B.environment:null,ye=A===null?x.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:kt,_e=(G.isMeshStandardMaterial?C:Be).get(G.envMap||de),Le=G.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,De=!!V.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),Ae=!!V.morphAttributes.position,We=!!V.morphAttributes.normal,st=!!V.morphAttributes.color;let gt=$n;G.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(gt=x.toneMapping);const dt=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,lt=dt!==void 0?dt.length:0,Re=Te.get(G),mt=p.state.lights;if(ce===!0&&(Ee===!0||T!==v)){const It=T===v&&G.id===S;ne.setState(G,T,It)}let Ze=!1;G.version===Re.__version?(Re.needsLights&&Re.lightsStateVersion!==mt.state.version||Re.outputColorSpace!==ye||k.isBatchedMesh&&Re.batching===!1||!k.isBatchedMesh&&Re.batching===!0||k.isBatchedMesh&&Re.batchingColor===!0&&k.colorTexture===null||k.isBatchedMesh&&Re.batchingColor===!1&&k.colorTexture!==null||k.isInstancedMesh&&Re.instancing===!1||!k.isInstancedMesh&&Re.instancing===!0||k.isSkinnedMesh&&Re.skinning===!1||!k.isSkinnedMesh&&Re.skinning===!0||k.isInstancedMesh&&Re.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&Re.instancingColor===!1&&k.instanceColor!==null||k.isInstancedMesh&&Re.instancingMorph===!0&&k.morphTexture===null||k.isInstancedMesh&&Re.instancingMorph===!1&&k.morphTexture!==null||Re.envMap!==_e||G.fog===!0&&Re.fog!==ae||Re.numClippingPlanes!==void 0&&(Re.numClippingPlanes!==ne.numPlanes||Re.numIntersection!==ne.numIntersection)||Re.vertexAlphas!==Le||Re.vertexTangents!==De||Re.morphTargets!==Ae||Re.morphNormals!==We||Re.morphColors!==st||Re.toneMapping!==gt||Re.morphTargetsCount!==lt)&&(Ze=!0):(Ze=!0,Re.__version=G.version);let Vt=Re.currentProgram;Ze===!0&&(Vt=Rs(G,B,k));let di=!1,Gt=!1,Qi=!1;const pt=Vt.getUniforms(),Yt=Re.uniforms;if(Se.useProgram(Vt.program)&&(di=!0,Gt=!0,Qi=!0),G.id!==S&&(S=G.id,Gt=!0),di||v!==T){Se.buffers.depth.getReversed()?(fe.copy(T.projectionMatrix),Id(fe),Dd(fe),pt.setValue(D,"projectionMatrix",fe)):pt.setValue(D,"projectionMatrix",T.projectionMatrix),pt.setValue(D,"viewMatrix",T.matrixWorldInverse);const zt=pt.map.cameraPosition;zt!==void 0&&zt.setValue(D,Ge.setFromMatrixPosition(T.matrixWorld)),et.logarithmicDepthBuffer&&pt.setValue(D,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&pt.setValue(D,"isOrthographic",T.isOrthographicCamera===!0),v!==T&&(v=T,Gt=!0,Qi=!0)}if(k.isSkinnedMesh){pt.setOptional(D,k,"bindMatrix"),pt.setOptional(D,k,"bindMatrixInverse");const It=k.skeleton;It&&(It.boneTexture===null&&It.computeBoneTexture(),pt.setValue(D,"boneTexture",It.boneTexture,Ue))}k.isBatchedMesh&&(pt.setOptional(D,k,"batchingTexture"),pt.setValue(D,"batchingTexture",k._matricesTexture,Ue),pt.setOptional(D,k,"batchingIdTexture"),pt.setValue(D,"batchingIdTexture",k._indirectTexture,Ue),pt.setOptional(D,k,"batchingColorTexture"),k._colorsTexture!==null&&pt.setValue(D,"batchingColorTexture",k._colorsTexture,Ue));const Kt=V.morphAttributes;if((Kt.position!==void 0||Kt.normal!==void 0||Kt.color!==void 0)&&oe.update(k,V,Vt),(Gt||Re.receiveShadow!==k.receiveShadow)&&(Re.receiveShadow=k.receiveShadow,pt.setValue(D,"receiveShadow",k.receiveShadow)),G.isMeshGouraudMaterial&&G.envMap!==null&&(Yt.envMap.value=_e,Yt.flipEnvMap.value=_e.isCubeTexture&&_e.isRenderTargetTexture===!1?-1:1),G.isMeshStandardMaterial&&G.envMap===null&&B.environment!==null&&(Yt.envMapIntensity.value=B.environmentIntensity),Gt&&(pt.setValue(D,"toneMappingExposure",x.toneMappingExposure),Re.needsLights&&Au(Yt,Qi),ae&&G.fog===!0&&O.refreshFogUniforms(Yt,ae),O.refreshMaterialUniforms(Yt,G,W,te,p.state.transmissionRenderTarget[T.id]),pr.upload(D,Bo(Re),Yt,Ue)),G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(pr.upload(D,Bo(Re),Yt,Ue),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&pt.setValue(D,"center",k.center),pt.setValue(D,"modelViewMatrix",k.modelViewMatrix),pt.setValue(D,"normalMatrix",k.normalMatrix),pt.setValue(D,"modelMatrix",k.matrixWorld),G.isShaderMaterial||G.isRawShaderMaterial){const It=G.uniformsGroups;for(let zt=0,Rr=It.length;zt<Rr;zt++){const Kn=It[zt];U.update(Kn,Vt),U.bind(Kn,Vt)}}return Vt}function Au(T,B){T.ambientLightColor.needsUpdate=B,T.lightProbe.needsUpdate=B,T.directionalLights.needsUpdate=B,T.directionalLightShadows.needsUpdate=B,T.pointLights.needsUpdate=B,T.pointLightShadows.needsUpdate=B,T.spotLights.needsUpdate=B,T.spotLightShadows.needsUpdate=B,T.rectAreaLights.needsUpdate=B,T.hemisphereLights.needsUpdate=B}function Ru(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(T,B,V){const G=Te.get(T);G.__autoAllocateDepthBuffer=T.resolveDepthBuffer===!1,G.__autoAllocateDepthBuffer===!1&&(G.__useRenderToTexture=!1),Te.get(T.texture).__webglTexture=B,Te.get(T.depthTexture).__webglTexture=G.__autoAllocateDepthBuffer?void 0:V,G.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(T,B){const V=Te.get(T);V.__webglFramebuffer=B,V.__useDefaultFramebuffer=B===void 0};const Cu=D.createFramebuffer();this.setRenderTarget=function(T,B=0,V=0){A=T,R=B,w=V;let G=!0,k=null,ae=!1,de=!1;if(T){const _e=Te.get(T);if(_e.__useDefaultFramebuffer!==void 0)Se.bindFramebuffer(D.FRAMEBUFFER,null),G=!1;else if(_e.__webglFramebuffer===void 0)Ue.setupRenderTarget(T);else if(_e.__hasExternalTextures)Ue.rebindTextures(T,Te.get(T.texture).__webglTexture,Te.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const Ae=T.depthTexture;if(_e.__boundDepthTexture!==Ae){if(Ae!==null&&Te.has(Ae)&&(T.width!==Ae.image.width||T.height!==Ae.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Ue.setupDepthRenderbuffer(T)}}const Le=T.texture;(Le.isData3DTexture||Le.isDataArrayTexture||Le.isCompressedArrayTexture)&&(de=!0);const De=Te.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(De[B])?k=De[B][V]:k=De[B],ae=!0):T.samples>0&&Ue.useMultisampledRTT(T)===!1?k=Te.get(T).__webglMultisampledFramebuffer:Array.isArray(De)?k=De[V]:k=De,I.copy(T.viewport),H.copy(T.scissor),z=T.scissorTest}else I.copy(we).multiplyScalar(W).floor(),H.copy(Ce).multiplyScalar(W).floor(),z=je;if(V!==0&&(k=Cu),Se.bindFramebuffer(D.FRAMEBUFFER,k)&&G&&Se.drawBuffers(T,k),Se.viewport(I),Se.scissor(H),Se.setScissorTest(z),ae){const _e=Te.get(T.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+B,_e.__webglTexture,V)}else if(de){const _e=Te.get(T.texture),Le=B;D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,_e.__webglTexture,V,Le)}else if(T!==null&&V!==0){const _e=Te.get(T.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,_e.__webglTexture,V)}S=-1},this.readRenderTargetPixels=function(T,B,V,G,k,ae,de,ye=0){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let _e=Te.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&de!==void 0&&(_e=_e[de]),_e){Se.bindFramebuffer(D.FRAMEBUFFER,_e);try{const Le=T.textures[ye],De=Le.format,Ae=Le.type;if(!et.textureFormatReadable(De)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!et.textureTypeReadable(Ae)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=T.width-G&&V>=0&&V<=T.height-k&&(T.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+ye),D.readPixels(B,V,G,k,ie.convert(De),ie.convert(Ae),ae))}finally{const Le=A!==null?Te.get(A).__webglFramebuffer:null;Se.bindFramebuffer(D.FRAMEBUFFER,Le)}}},this.readRenderTargetPixelsAsync=async function(T,B,V,G,k,ae,de,ye=0){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let _e=Te.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&de!==void 0&&(_e=_e[de]),_e)if(B>=0&&B<=T.width-G&&V>=0&&V<=T.height-k){Se.bindFramebuffer(D.FRAMEBUFFER,_e);const Le=T.textures[ye],De=Le.format,Ae=Le.type;if(!et.textureFormatReadable(De))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!et.textureTypeReadable(Ae))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const We=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,We),D.bufferData(D.PIXEL_PACK_BUFFER,ae.byteLength,D.STREAM_READ),T.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+ye),D.readPixels(B,V,G,k,ie.convert(De),ie.convert(Ae),0);const st=A!==null?Te.get(A).__webglFramebuffer:null;Se.bindFramebuffer(D.FRAMEBUFFER,st);const gt=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await Ld(D,gt,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,We),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,ae),D.deleteBuffer(We),D.deleteSync(gt),ae}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(T,B=null,V=0){const G=Math.pow(2,-V),k=Math.floor(T.image.width*G),ae=Math.floor(T.image.height*G),de=B!==null?B.x:0,ye=B!==null?B.y:0;Ue.setTexture2D(T,0),D.copyTexSubImage2D(D.TEXTURE_2D,V,0,0,de,ye,k,ae),Se.unbindTexture()};const Pu=D.createFramebuffer(),Lu=D.createFramebuffer();this.copyTextureToTexture=function(T,B,V=null,G=null,k=0,ae=null){ae===null&&(k!==0?(Di("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ae=k,k=0):ae=0);let de,ye,_e,Le,De,Ae,We,st,gt;const dt=T.isCompressedTexture?T.mipmaps[ae]:T.image;if(V!==null)de=V.max.x-V.min.x,ye=V.max.y-V.min.y,_e=V.isBox3?V.max.z-V.min.z:1,Le=V.min.x,De=V.min.y,Ae=V.isBox3?V.min.z:0;else{const Kt=Math.pow(2,-k);de=Math.floor(dt.width*Kt),ye=Math.floor(dt.height*Kt),T.isDataArrayTexture?_e=dt.depth:T.isData3DTexture?_e=Math.floor(dt.depth*Kt):_e=1,Le=0,De=0,Ae=0}G!==null?(We=G.x,st=G.y,gt=G.z):(We=0,st=0,gt=0);const lt=ie.convert(B.format),Re=ie.convert(B.type);let mt;B.isData3DTexture?(Ue.setTexture3D(B,0),mt=D.TEXTURE_3D):B.isDataArrayTexture||B.isCompressedArrayTexture?(Ue.setTexture2DArray(B,0),mt=D.TEXTURE_2D_ARRAY):(Ue.setTexture2D(B,0),mt=D.TEXTURE_2D),D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,B.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,B.unpackAlignment);const Ze=D.getParameter(D.UNPACK_ROW_LENGTH),Vt=D.getParameter(D.UNPACK_IMAGE_HEIGHT),di=D.getParameter(D.UNPACK_SKIP_PIXELS),Gt=D.getParameter(D.UNPACK_SKIP_ROWS),Qi=D.getParameter(D.UNPACK_SKIP_IMAGES);D.pixelStorei(D.UNPACK_ROW_LENGTH,dt.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,dt.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,Le),D.pixelStorei(D.UNPACK_SKIP_ROWS,De),D.pixelStorei(D.UNPACK_SKIP_IMAGES,Ae);const pt=T.isDataArrayTexture||T.isData3DTexture,Yt=B.isDataArrayTexture||B.isData3DTexture;if(T.isDepthTexture){const Kt=Te.get(T),It=Te.get(B),zt=Te.get(Kt.__renderTarget),Rr=Te.get(It.__renderTarget);Se.bindFramebuffer(D.READ_FRAMEBUFFER,zt.__webglFramebuffer),Se.bindFramebuffer(D.DRAW_FRAMEBUFFER,Rr.__webglFramebuffer);for(let Kn=0;Kn<_e;Kn++)pt&&(D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Te.get(T).__webglTexture,k,Ae+Kn),D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Te.get(B).__webglTexture,ae,gt+Kn)),D.blitFramebuffer(Le,De,de,ye,We,st,de,ye,D.DEPTH_BUFFER_BIT,D.NEAREST);Se.bindFramebuffer(D.READ_FRAMEBUFFER,null),Se.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else if(k!==0||T.isRenderTargetTexture||Te.has(T)){const Kt=Te.get(T),It=Te.get(B);Se.bindFramebuffer(D.READ_FRAMEBUFFER,Pu),Se.bindFramebuffer(D.DRAW_FRAMEBUFFER,Lu);for(let zt=0;zt<_e;zt++)pt?D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Kt.__webglTexture,k,Ae+zt):D.framebufferTexture2D(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Kt.__webglTexture,k),Yt?D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,It.__webglTexture,ae,gt+zt):D.framebufferTexture2D(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,It.__webglTexture,ae),k!==0?D.blitFramebuffer(Le,De,de,ye,We,st,de,ye,D.COLOR_BUFFER_BIT,D.NEAREST):Yt?D.copyTexSubImage3D(mt,ae,We,st,gt+zt,Le,De,de,ye):D.copyTexSubImage2D(mt,ae,We,st,Le,De,de,ye);Se.bindFramebuffer(D.READ_FRAMEBUFFER,null),Se.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else Yt?T.isDataTexture||T.isData3DTexture?D.texSubImage3D(mt,ae,We,st,gt,de,ye,_e,lt,Re,dt.data):B.isCompressedArrayTexture?D.compressedTexSubImage3D(mt,ae,We,st,gt,de,ye,_e,lt,dt.data):D.texSubImage3D(mt,ae,We,st,gt,de,ye,_e,lt,Re,dt):T.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,ae,We,st,de,ye,lt,Re,dt.data):T.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,ae,We,st,dt.width,dt.height,lt,dt.data):D.texSubImage2D(D.TEXTURE_2D,ae,We,st,de,ye,lt,Re,dt);D.pixelStorei(D.UNPACK_ROW_LENGTH,Ze),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,Vt),D.pixelStorei(D.UNPACK_SKIP_PIXELS,di),D.pixelStorei(D.UNPACK_SKIP_ROWS,Gt),D.pixelStorei(D.UNPACK_SKIP_IMAGES,Qi),ae===0&&B.generateMipmaps&&D.generateMipmap(mt),Se.unbindTexture()},this.copyTextureToTexture3D=function(T,B,V=null,G=null,k=0){return Di('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(T,B,V,G,k)},this.initRenderTarget=function(T){Te.get(T).__webglFramebuffer===void 0&&Ue.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?Ue.setTextureCube(T,0):T.isData3DTexture?Ue.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?Ue.setTexture2DArray(T,0):Ue.setTexture2D(T,0),Se.unbindTexture()},this.resetState=function(){R=0,w=0,A=null,Se.reset(),be.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ln}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Ye._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ye._getUnpackColorSpace()}}function pl(i,e){if(e===nd)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(e===no||e===jl){let t=i.getIndex();if(t===null){const a=[],o=i.getAttribute("position");if(o!==void 0){for(let c=0;c<o.count;c++)a.push(c);i.setIndex(a),t=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}const n=t.count-2,s=[];if(e===no)for(let a=1;a<=n;a++)s.push(t.getX(0)),s.push(t.getX(a)),s.push(t.getX(a+1));else for(let a=0;a<n;a++)a%2===0?(s.push(t.getX(a)),s.push(t.getX(a+1)),s.push(t.getX(a+2))):(s.push(t.getX(a+2)),s.push(t.getX(a+1)),s.push(t.getX(a)));s.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const r=i.clone();return r.setIndex(s),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),i}class P0 extends ji{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new U0(t)}),this.register(function(t){return new F0(t)}),this.register(function(t){return new X0(t)}),this.register(function(t){return new $0(t)}),this.register(function(t){return new q0(t)}),this.register(function(t){return new B0(t)}),this.register(function(t){return new k0(t)}),this.register(function(t){return new z0(t)}),this.register(function(t){return new H0(t)}),this.register(function(t){return new N0(t)}),this.register(function(t){return new V0(t)}),this.register(function(t){return new O0(t)}),this.register(function(t){return new W0(t)}),this.register(function(t){return new G0(t)}),this.register(function(t){return new I0(t)}),this.register(function(t){return new Y0(t)}),this.register(function(t){return new K0(t)})}load(e,t,n,s){const r=this;let a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){const u=gs.extractUrlBase(e);a=gs.resolveURL(u,this.path)}else a=gs.extractUrlBase(e);this.manager.itemStart(e);const o=function(u){s?s(u):console.error(u),r.manager.itemError(e),r.manager.itemEnd(e)},c=new gu(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(u){try{r.parse(u,a,function(l){t(l),r.manager.itemEnd(e)},o)}catch(l){o(l)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,s){let r;const a={},o={},c=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===Eu){try{a[Ve.KHR_BINARY_GLTF]=new j0(e)}catch(h){s&&s(h);return}r=JSON.parse(a[Ve.KHR_BINARY_GLTF].content)}else r=JSON.parse(c.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const u=new lv(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});u.fileLoader.setRequestHeader(this.requestHeader);for(let l=0;l<this.pluginCallbacks.length;l++){const h=this.pluginCallbacks[l](u);h.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[h.name]=h,a[h.name]=!0}if(r.extensionsUsed)for(let l=0;l<r.extensionsUsed.length;++l){const h=r.extensionsUsed[l],d=r.extensionsRequired||[];switch(h){case Ve.KHR_MATERIALS_UNLIT:a[h]=new D0;break;case Ve.KHR_DRACO_MESH_COMPRESSION:a[h]=new Z0(r,this.dracoLoader);break;case Ve.KHR_TEXTURE_TRANSFORM:a[h]=new J0;break;case Ve.KHR_MESH_QUANTIZATION:a[h]=new Q0;break;default:d.indexOf(h)>=0&&o[h]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+h+'".')}}u.setExtensions(a),u.setPlugins(o),u.parse(n,s)}parseAsync(e,t){const n=this;return new Promise(function(s,r){n.parse(e,t,s,r)})}}function L0(){let i={};return{get:function(e){return i[e]},add:function(e,t){i[e]=t},remove:function(e){delete i[e]},removeAll:function(){i={}}}}const Ve={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class I0{constructor(e){this.parser=e,this.name=Ve.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,s=t.length;n<s;n++){const r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let s=t.cache.get(n);if(s)return s;const r=t.json,c=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e];let u;const l=new Pe(16777215);c.color!==void 0&&l.setRGB(c.color[0],c.color[1],c.color[2],kt);const h=c.range!==void 0?c.range:0;switch(c.type){case"directional":u=new fr(l),u.target.position.set(0,0,-1),u.add(u.target);break;case"point":u=new _u(l),u.distance=h;break;case"spot":u=new Nf(l),u.distance=h,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,u.angle=c.spot.outerConeAngle,u.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,u.target.position.set(0,0,-1),u.add(u.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return u.position.set(0,0,0),Cn(u,c),c.intensity!==void 0&&(u.intensity=c.intensity),u.name=t.createUniqueName(c.name||"light_"+e),s=Promise.resolve(u),t.cache.add(n,s),s}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,r=n.json.nodes[e],o=(r.extensions&&r.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(c){return n._getNodeRef(t.cache,o,c)})}}class D0{constructor(){this.name=Ve.KHR_MATERIALS_UNLIT}getMaterialType(){return Ft}extendParams(e,t,n){const s=[];e.color=new Pe(1,1,1),e.opacity=1;const r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){const a=r.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],kt),e.opacity=a[3]}r.baseColorTexture!==void 0&&s.push(n.assignTexture(e,"map",r.baseColorTexture,yt))}return Promise.all(s)}}class N0{constructor(e){this.parser=e,this.name=Ve.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}}class U0{constructor(e){this.parser=e,this.name=Ve.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:dn}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];if(a.clearcoatFactor!==void 0&&(t.clearcoat=a.clearcoatFactor),a.clearcoatTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatMap",a.clearcoatTexture)),a.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=a.clearcoatRoughnessFactor),a.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatRoughnessMap",a.clearcoatRoughnessTexture)),a.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(t,"clearcoatNormalMap",a.clearcoatNormalTexture)),a.clearcoatNormalTexture.scale!==void 0)){const o=a.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new Ne(o,o)}return Promise.all(r)}}class F0{constructor(e){this.parser=e,this.name=Ve.KHR_MATERIALS_DISPERSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:dn}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name];return t.dispersion=r.dispersion!==void 0?r.dispersion:0,Promise.resolve()}}class O0{constructor(e){this.parser=e,this.name=Ve.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:dn}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];return a.iridescenceFactor!==void 0&&(t.iridescence=a.iridescenceFactor),a.iridescenceTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceMap",a.iridescenceTexture)),a.iridescenceIor!==void 0&&(t.iridescenceIOR=a.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),a.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=a.iridescenceThicknessMinimum),a.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=a.iridescenceThicknessMaximum),a.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceThicknessMap",a.iridescenceThicknessTexture)),Promise.all(r)}}class B0{constructor(e){this.parser=e,this.name=Ve.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:dn}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[];t.sheenColor=new Pe(0,0,0),t.sheenRoughness=0,t.sheen=1;const a=s.extensions[this.name];if(a.sheenColorFactor!==void 0){const o=a.sheenColorFactor;t.sheenColor.setRGB(o[0],o[1],o[2],kt)}return a.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=a.sheenRoughnessFactor),a.sheenColorTexture!==void 0&&r.push(n.assignTexture(t,"sheenColorMap",a.sheenColorTexture,yt)),a.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"sheenRoughnessMap",a.sheenRoughnessTexture)),Promise.all(r)}}class k0{constructor(e){this.parser=e,this.name=Ve.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:dn}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];return a.transmissionFactor!==void 0&&(t.transmission=a.transmissionFactor),a.transmissionTexture!==void 0&&r.push(n.assignTexture(t,"transmissionMap",a.transmissionTexture)),Promise.all(r)}}class z0{constructor(e){this.parser=e,this.name=Ve.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:dn}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];t.thickness=a.thicknessFactor!==void 0?a.thicknessFactor:0,a.thicknessTexture!==void 0&&r.push(n.assignTexture(t,"thicknessMap",a.thicknessTexture)),t.attenuationDistance=a.attenuationDistance||1/0;const o=a.attenuationColor||[1,1,1];return t.attenuationColor=new Pe().setRGB(o[0],o[1],o[2],kt),Promise.all(r)}}class H0{constructor(e){this.parser=e,this.name=Ve.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:dn}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}}class V0{constructor(e){this.parser=e,this.name=Ve.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:dn}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];t.specularIntensity=a.specularFactor!==void 0?a.specularFactor:1,a.specularTexture!==void 0&&r.push(n.assignTexture(t,"specularIntensityMap",a.specularTexture));const o=a.specularColorFactor||[1,1,1];return t.specularColor=new Pe().setRGB(o[0],o[1],o[2],kt),a.specularColorTexture!==void 0&&r.push(n.assignTexture(t,"specularColorMap",a.specularColorTexture,yt)),Promise.all(r)}}class G0{constructor(e){this.parser=e,this.name=Ve.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:dn}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];return t.bumpScale=a.bumpFactor!==void 0?a.bumpFactor:1,a.bumpTexture!==void 0&&r.push(n.assignTexture(t,"bumpMap",a.bumpTexture)),Promise.all(r)}}class W0{constructor(e){this.parser=e,this.name=Ve.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:dn}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];return a.anisotropyStrength!==void 0&&(t.anisotropy=a.anisotropyStrength),a.anisotropyRotation!==void 0&&(t.anisotropyRotation=a.anisotropyRotation),a.anisotropyTexture!==void 0&&r.push(n.assignTexture(t,"anisotropyMap",a.anisotropyTexture)),Promise.all(r)}}class X0{constructor(e){this.parser=e,this.name=Ve.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,s=n.textures[e];if(!s.extensions||!s.extensions[this.name])return null;const r=s.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,a)}}class $0{constructor(e){this.parser=e,this.name=Ve.EXT_TEXTURE_WEBP}loadTexture(e){const t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;const a=r.extensions[t],o=s.images[a.source];let c=n.textureLoader;if(o.uri){const u=n.options.manager.getHandler(o.uri);u!==null&&(c=u)}return n.loadTextureImage(e,a.source,c)}}class q0{constructor(e){this.parser=e,this.name=Ve.EXT_TEXTURE_AVIF}loadTexture(e){const t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;const a=r.extensions[t],o=s.images[a.source];let c=n.textureLoader;if(o.uri){const u=n.options.manager.getHandler(o.uri);u!==null&&(c=u)}return n.loadTextureImage(e,a.source,c)}}class Y0{constructor(e){this.name=Ve.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const s=n.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(o){const c=s.byteOffset||0,u=s.byteLength||0,l=s.count,h=s.byteStride,d=new Uint8Array(o,c,u);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(l,h,d,s.mode,s.filter).then(function(f){return f.buffer}):a.ready.then(function(){const f=new ArrayBuffer(l*h);return a.decodeGltfBuffer(new Uint8Array(f),l,h,d,s.mode,s.filter),f})})}else return null}}class K0{constructor(e){this.name=Ve.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const s=t.meshes[n.mesh];for(const u of s.primitives)if(u.mode!==Zt.TRIANGLES&&u.mode!==Zt.TRIANGLE_STRIP&&u.mode!==Zt.TRIANGLE_FAN&&u.mode!==void 0)return null;const a=n.extensions[this.name].attributes,o=[],c={};for(const u in a)o.push(this.parser.getDependency("accessor",a[u]).then(l=>(c[u]=l,c[u])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(u=>{const l=u.pop(),h=l.isGroup?l.children:[l],d=u[0].count,f=[];for(const g of h){const _=new Oe,m=new N,p=new Yn,E=new N(1,1,1),b=new uu(g.geometry,g.material,d);for(let x=0;x<d;x++)c.TRANSLATION&&m.fromBufferAttribute(c.TRANSLATION,x),c.ROTATION&&p.fromBufferAttribute(c.ROTATION,x),c.SCALE&&E.fromBufferAttribute(c.SCALE,x),b.setMatrixAt(x,_.compose(m,p,E));for(const x in c)if(x==="_COLOR_0"){const P=c[x];b.instanceColor=new ro(P.array,P.itemSize,P.normalized)}else x!=="TRANSLATION"&&x!=="ROTATION"&&x!=="SCALE"&&g.geometry.setAttribute(x,c[x]);ft.prototype.copy.call(b,g),this.parser.assignFinalMaterial(b),f.push(b)}return l.isGroup?(l.clear(),l.add(...f),l):f[0]}))}}const Eu="glTF",us=12,ml={JSON:1313821514,BIN:5130562};class j0{constructor(e){this.name=Ve.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,us),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Eu)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const s=this.header.length-us,r=new DataView(e,us);let a=0;for(;a<s;){const o=r.getUint32(a,!0);a+=4;const c=r.getUint32(a,!0);if(a+=4,c===ml.JSON){const u=new Uint8Array(e,us+a,o);this.content=n.decode(u)}else if(c===ml.BIN){const u=us+a;this.body=e.slice(u,u+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class Z0{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=Ve.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,s=this.dracoLoader,r=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},c={},u={};for(const l in a){const h=lo[l]||l.toLowerCase();o[h]=a[l]}for(const l in e.attributes){const h=lo[l]||l.toLowerCase();if(a[l]!==void 0){const d=n.accessors[e.attributes[l]],f=Ui[d.componentType];u[h]=f.name,c[h]=d.normalized===!0}}return t.getDependency("bufferView",r).then(function(l){return new Promise(function(h,d){s.decodeDracoFile(l,function(f){for(const g in f.attributes){const _=f.attributes[g],m=c[g];m!==void 0&&(_.normalized=m)}h(f)},o,u,kt,d)})})}}class J0{constructor(){this.name=Ve.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class Q0{constructor(){this.name=Ve.KHR_MESH_QUANTIZATION}}class Tu extends ws{constructor(e,t,n,s){super(e,t,n,s)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s*3+s;for(let a=0;a!==s;a++)t[a]=n[r+a];return t}interpolate_(e,t,n,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=o*2,u=o*3,l=s-t,h=(n-t)/l,d=h*h,f=d*h,g=e*u,_=g-u,m=-2*f+3*d,p=f-d,E=1-m,b=p-d+h;for(let x=0;x!==o;x++){const P=a[_+x+o],R=a[_+x+c]*l,w=a[g+x+o],A=a[g+x]*l;r[x]=E*P+b*R+m*w+p*A}return r}}const ev=new Yn;class tv extends Tu{interpolate_(e,t,n,s){const r=super.interpolate_(e,t,n,s);return ev.fromArray(r).normalize().toArray(r),r}}const Zt={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},Ui={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},gl={9728:Ot,9729:qt,9984:Vl,9985:or,9986:ds,9987:Pn},_l={33071:Wn,33648:gr,10497:ki},fa={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},lo={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Vn={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},nv={CUBICSPLINE:void 0,LINEAR:Ss,STEP:ys},pa={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function iv(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new Gi({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Nn})),i.DefaultMaterial}function ni(i,e,t){for(const n in t.extensions)i[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Cn(i,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(i.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function sv(i,e,t){let n=!1,s=!1,r=!1;for(let u=0,l=e.length;u<l;u++){const h=e[u];if(h.POSITION!==void 0&&(n=!0),h.NORMAL!==void 0&&(s=!0),h.COLOR_0!==void 0&&(r=!0),n&&s&&r)break}if(!n&&!s&&!r)return Promise.resolve(i);const a=[],o=[],c=[];for(let u=0,l=e.length;u<l;u++){const h=e[u];if(n){const d=h.POSITION!==void 0?t.getDependency("accessor",h.POSITION):i.attributes.position;a.push(d)}if(s){const d=h.NORMAL!==void 0?t.getDependency("accessor",h.NORMAL):i.attributes.normal;o.push(d)}if(r){const d=h.COLOR_0!==void 0?t.getDependency("accessor",h.COLOR_0):i.attributes.color;c.push(d)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c)]).then(function(u){const l=u[0],h=u[1],d=u[2];return n&&(i.morphAttributes.position=l),s&&(i.morphAttributes.normal=h),r&&(i.morphAttributes.color=d),i.morphTargetsRelative=!0,i})}function rv(i,e){if(i.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)i.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(i.morphTargetInfluences.length===t.length){i.morphTargetDictionary={};for(let n=0,s=t.length;n<s;n++)i.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function av(i){let e;const t=i.extensions&&i.extensions[Ve.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+ma(t.attributes):e=i.indices+":"+ma(i.attributes)+":"+i.mode,i.targets!==void 0)for(let n=0,s=i.targets.length;n<s;n++)e+=":"+ma(i.targets[n]);return e}function ma(i){let e="";const t=Object.keys(i).sort();for(let n=0,s=t.length;n<s;n++)e+=t[n]+":"+i[t[n]]+";";return e}function uo(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function ov(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":i.search(/\.ktx2($|\?)/i)>0||i.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const cv=new Oe;class lv{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new L0,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,s=-1,r=!1,a=-1;if(typeof navigator<"u"){const o=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(o)===!0;const c=o.match(/Version\/(\d+)/);s=n&&c?parseInt(c[1],10):-1,r=o.indexOf("Firefox")>-1,a=r?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&s<17||r&&a<98?this.textureLoader=new If(this.options.manager):this.textureLoader=new Of(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new gu(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,s=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){const o={scene:a[0][s.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:s.asset,parser:n,userData:{}};return ni(r,o,s),Cn(o,s),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(o)})).then(function(){for(const c of o.scenes)c.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let s=0,r=t.length;s<r;s++){const a=t[s].joints;for(let o=0,c=a.length;o<c;o++)e[a[o]].isBone=!0}for(let s=0,r=e.length;s<r;s++){const a=e[s];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const s=n.clone(),r=(a,o)=>{const c=this.associations.get(a);c!=null&&this.associations.set(o,c);for(const[u,l]of a.children.entries())r(l,o.children[u])};return r(n,s),s.name+="_instance_"+e.uses[t]++,s}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const s=e(t[n]);if(s)return s}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let s=0;s<t.length;s++){const r=e(t[s]);r&&n.push(r)}return n}getDependency(e,t){const n=e+":"+t;let s=this.cache.get(n);if(!s){switch(e){case"scene":s=this.loadScene(t);break;case"node":s=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":s=this.loadAccessor(t);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":s=this.loadBuffer(t);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":s=this.loadSkin(t);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":s=this.loadCamera(t);break;default:if(s=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!s)throw new Error("Unknown type: "+e);break}this.cache.add(n,s)}return s}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,s=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(s.map(function(r,a){return n.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[Ve.KHR_BINARY_GLTF].body);const s=this.options;return new Promise(function(r,a){n.load(gs.resolveURL(t.uri,s.path),r,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const s=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+s)})}loadAccessor(e){const t=this,n=this.json,s=this.json.accessors[e];if(s.bufferView===void 0&&s.sparse===void 0){const a=fa[s.type],o=Ui[s.componentType],c=s.normalized===!0,u=new o(s.count*a);return Promise.resolve(new Bt(u,a,c))}const r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(a){const o=a[0],c=fa[s.type],u=Ui[s.componentType],l=u.BYTES_PER_ELEMENT,h=l*c,d=s.byteOffset||0,f=s.bufferView!==void 0?n.bufferViews[s.bufferView].byteStride:void 0,g=s.normalized===!0;let _,m;if(f&&f!==h){const p=Math.floor(d/f),E="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+p+":"+s.count;let b=t.cache.get(E);b||(_=new u(o,p*f,s.count*f/l),b=new rf(_,f/l),t.cache.add(E,b)),m=new Eo(b,c,d%f/l,g)}else o===null?_=new u(s.count*c):_=new u(o,d,s.count*c),m=new Bt(_,c,g);if(s.sparse!==void 0){const p=fa.SCALAR,E=Ui[s.sparse.indices.componentType],b=s.sparse.indices.byteOffset||0,x=s.sparse.values.byteOffset||0,P=new E(a[1],b,s.sparse.count*p),R=new u(a[2],x,s.sparse.count*c);o!==null&&(m=new Bt(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let w=0,A=P.length;w<A;w++){const S=P[w];if(m.setX(S,R[w*c]),c>=2&&m.setY(S,R[w*c+1]),c>=3&&m.setZ(S,R[w*c+2]),c>=4&&m.setW(S,R[w*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=g}return m})}loadTexture(e){const t=this.json,n=this.options,r=t.textures[e].source,a=t.images[r];let o=this.textureLoader;if(a.uri){const c=n.manager.getHandler(a.uri);c!==null&&(o=c)}return this.loadTextureImage(e,r,o)}loadTextureImage(e,t,n){const s=this,r=this.json,a=r.textures[e],o=r.images[t],c=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[c])return this.textureCache[c];const u=this.loadImageSource(t,n).then(function(l){l.flipY=!1,l.name=a.name||o.name||"",l.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(l.name=o.uri);const d=(r.samplers||{})[a.sampler]||{};return l.magFilter=gl[d.magFilter]||qt,l.minFilter=gl[d.minFilter]||Pn,l.wrapS=_l[d.wrapS]||ki,l.wrapT=_l[d.wrapT]||ki,l.generateMipmaps=!l.isCompressedTexture&&l.minFilter!==Ot&&l.minFilter!==qt,s.associations.set(l,{textures:e}),l}).catch(function(){return null});return this.textureCache[c]=u,u}loadImageSource(e,t){const n=this,s=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(h=>h.clone());const a=s.images[e],o=self.URL||self.webkitURL;let c=a.uri||"",u=!1;if(a.bufferView!==void 0)c=n.getDependency("bufferView",a.bufferView).then(function(h){u=!0;const d=new Blob([h],{type:a.mimeType});return c=o.createObjectURL(d),c});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const l=Promise.resolve(c).then(function(h){return new Promise(function(d,f){let g=d;t.isImageBitmapLoader===!0&&(g=function(_){const m=new St(_);m.needsUpdate=!0,d(m)}),t.load(gs.resolveURL(h,r.path),g,void 0,f)})}).then(function(h){return u===!0&&o.revokeObjectURL(c),Cn(h,a),h.userData.mimeType=a.mimeType||ov(a.uri),h}).catch(function(h){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),h});return this.sourceCache[e]=l,l}assignTexture(e,t,n,s){const r=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),r.extensions[Ve.KHR_TEXTURE_TRANSFORM]){const o=n.extensions!==void 0?n.extensions[Ve.KHR_TEXTURE_TRANSFORM]:void 0;if(o){const c=r.associations.get(a);a=r.extensions[Ve.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),r.associations.set(a,c)}}return s!==void 0&&(a.colorSpace=s),e[t]=a,a})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const s=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){const o="PointsMaterial:"+n.uuid;let c=this.cache.get(o);c||(c=new du,vn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(o,c)),n=c}else if(e.isLine){const o="LineBasicMaterial:"+n.uuid;let c=this.cache.get(o);c||(c=new hu,vn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(o,c)),n=c}if(s||r||a){let o="ClonedMaterial:"+n.uuid+":";s&&(o+="derivative-tangents:"),r&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let c=this.cache.get(o);c||(c=n.clone(),r&&(c.vertexColors=!0),a&&(c.flatShading=!0),s&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(o,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return Gi}loadMaterial(e){const t=this,n=this.json,s=this.extensions,r=n.materials[e];let a;const o={},c=r.extensions||{},u=[];if(c[Ve.KHR_MATERIALS_UNLIT]){const h=s[Ve.KHR_MATERIALS_UNLIT];a=h.getMaterialType(),u.push(h.extendParams(o,r,t))}else{const h=r.pbrMetallicRoughness||{};if(o.color=new Pe(1,1,1),o.opacity=1,Array.isArray(h.baseColorFactor)){const d=h.baseColorFactor;o.color.setRGB(d[0],d[1],d[2],kt),o.opacity=d[3]}h.baseColorTexture!==void 0&&u.push(t.assignTexture(o,"map",h.baseColorTexture,yt)),o.metalness=h.metallicFactor!==void 0?h.metallicFactor:1,o.roughness=h.roughnessFactor!==void 0?h.roughnessFactor:1,h.metallicRoughnessTexture!==void 0&&(u.push(t.assignTexture(o,"metalnessMap",h.metallicRoughnessTexture)),u.push(t.assignTexture(o,"roughnessMap",h.metallicRoughnessTexture))),a=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),u.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,o)})))}r.doubleSided===!0&&(o.side=_n);const l=r.alphaMode||pa.OPAQUE;if(l===pa.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,l===pa.MASK&&(o.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&a!==Ft&&(u.push(t.assignTexture(o,"normalMap",r.normalTexture)),o.normalScale=new Ne(1,1),r.normalTexture.scale!==void 0)){const h=r.normalTexture.scale;o.normalScale.set(h,h)}if(r.occlusionTexture!==void 0&&a!==Ft&&(u.push(t.assignTexture(o,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&a!==Ft){const h=r.emissiveFactor;o.emissive=new Pe().setRGB(h[0],h[1],h[2],kt)}return r.emissiveTexture!==void 0&&a!==Ft&&u.push(t.assignTexture(o,"emissiveMap",r.emissiveTexture,yt)),Promise.all(u).then(function(){const h=new a(o);return r.name&&(h.name=r.name),Cn(h,r),t.associations.set(h,{materials:e}),r.extensions&&ni(s,h,r),h})}createUniqueName(e){const t=it.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,s=this.primitiveCache;function r(o){return n[Ve.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(c){return vl(c,o,t)})}const a=[];for(let o=0,c=e.length;o<c;o++){const u=e[o],l=av(u),h=s[l];if(h)a.push(h.promise);else{let d;u.extensions&&u.extensions[Ve.KHR_DRACO_MESH_COMPRESSION]?d=r(u):d=vl(new Pt,u,t),s[l]={primitive:u,promise:d},a.push(d)}}return Promise.all(a)}loadMesh(e){const t=this,n=this.json,s=this.extensions,r=n.meshes[e],a=r.primitives,o=[];for(let c=0,u=a.length;c<u;c++){const l=a[c].material===void 0?iv(this.cache):this.getDependency("material",a[c].material);o.push(l)}return o.push(t.loadGeometries(a)),Promise.all(o).then(function(c){const u=c.slice(0,c.length-1),l=c[c.length-1],h=[];for(let f=0,g=l.length;f<g;f++){const _=l[f],m=a[f];let p;const E=u[f];if(m.mode===Zt.TRIANGLES||m.mode===Zt.TRIANGLE_STRIP||m.mode===Zt.TRIANGLE_FAN||m.mode===void 0)p=r.isSkinnedMesh===!0?new of(_,E):new Ke(_,E),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),m.mode===Zt.TRIANGLE_STRIP?p.geometry=pl(p.geometry,jl):m.mode===Zt.TRIANGLE_FAN&&(p.geometry=pl(p.geometry,no));else if(m.mode===Zt.LINES)p=new ff(_,E);else if(m.mode===Zt.LINE_STRIP)p=new wo(_,E);else if(m.mode===Zt.LINE_LOOP)p=new pf(_,E);else if(m.mode===Zt.POINTS)p=new mf(_,E);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(p.geometry.morphAttributes).length>0&&rv(p,r),p.name=t.createUniqueName(r.name||"mesh_"+e),Cn(p,r),m.extensions&&ni(s,p,m),t.assignFinalMaterial(p),h.push(p)}for(let f=0,g=h.length;f<g;f++)t.associations.set(h[f],{meshes:e,primitives:f});if(h.length===1)return r.extensions&&ni(s,h[0],r),h[0];const d=new Ht;r.extensions&&ni(s,d,r),t.associations.set(d,{meshes:e});for(let f=0,g=h.length;f<g;f++)d.add(h[f]);return d})}loadCamera(e){let t;const n=this.json.cameras[e],s=n[n.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Ut(Cd.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):n.type==="orthographic"&&(t=new br(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Cn(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let s=0,r=t.joints.length;s<r;s++)n.push(this._loadNodeShallow(t.joints[s]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(s){const r=s.pop(),a=s,o=[],c=[];for(let u=0,l=a.length;u<l;u++){const h=a[u];if(h){o.push(h);const d=new Oe;r!==null&&d.fromArray(r.array,u*16),c.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[u])}return new To(o,c)})}loadAnimation(e){const t=this.json,n=this,s=t.animations[e],r=s.name?s.name:"animation_"+e,a=[],o=[],c=[],u=[],l=[];for(let h=0,d=s.channels.length;h<d;h++){const f=s.channels[h],g=s.samplers[f.sampler],_=f.target,m=_.node,p=s.parameters!==void 0?s.parameters[g.input]:g.input,E=s.parameters!==void 0?s.parameters[g.output]:g.output;_.node!==void 0&&(a.push(this.getDependency("node",m)),o.push(this.getDependency("accessor",p)),c.push(this.getDependency("accessor",E)),u.push(g),l.push(_))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c),Promise.all(u),Promise.all(l)]).then(function(h){const d=h[0],f=h[1],g=h[2],_=h[3],m=h[4],p=[];for(let E=0,b=d.length;E<b;E++){const x=d[E],P=f[E],R=g[E],w=_[E],A=m[E];if(x===void 0)continue;x.updateMatrix&&x.updateMatrix();const S=n._createAnimationTracks(x,P,R,w,A);if(S)for(let v=0;v<S.length;v++)p.push(S[v])}return new bf(r,void 0,p)})}createNodeMesh(e){const t=this.json,n=this,s=t.nodes[e];return s.mesh===void 0?null:n.getDependency("mesh",s.mesh).then(function(r){const a=n._getNodeRef(n.meshCache,s.mesh,r);return s.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let c=0,u=s.weights.length;c<u;c++)o.morphTargetInfluences[c]=s.weights[c]}),a})}loadNode(e){const t=this.json,n=this,s=t.nodes[e],r=n._loadNodeShallow(e),a=[],o=s.children||[];for(let u=0,l=o.length;u<l;u++)a.push(n.getDependency("node",o[u]));const c=s.skin===void 0?Promise.resolve(null):n.getDependency("skin",s.skin);return Promise.all([r,Promise.all(a),c]).then(function(u){const l=u[0],h=u[1],d=u[2];d!==null&&l.traverse(function(f){f.isSkinnedMesh&&f.bind(d,cv)});for(let f=0,g=h.length;f<g;f++)l.add(h[f]);return l})}_loadNodeShallow(e){const t=this.json,n=this.extensions,s=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const r=t.nodes[e],a=r.name?s.createUniqueName(r.name):"",o=[],c=s._invokeOne(function(u){return u.createNodeMesh&&u.createNodeMesh(e)});return c&&o.push(c),r.camera!==void 0&&o.push(s.getDependency("camera",r.camera).then(function(u){return s._getNodeRef(s.cameraCache,r.camera,u)})),s._invokeAll(function(u){return u.createNodeAttachment&&u.createNodeAttachment(e)}).forEach(function(u){o.push(u)}),this.nodeCache[e]=Promise.all(o).then(function(u){let l;if(r.isBone===!0?l=new cu:u.length>1?l=new Ht:u.length===1?l=u[0]:l=new ft,l!==u[0])for(let h=0,d=u.length;h<d;h++)l.add(u[h]);if(r.name&&(l.userData.name=r.name,l.name=a),Cn(l,r),r.extensions&&ni(n,l,r),r.matrix!==void 0){const h=new Oe;h.fromArray(r.matrix),l.applyMatrix4(h)}else r.translation!==void 0&&l.position.fromArray(r.translation),r.rotation!==void 0&&l.quaternion.fromArray(r.rotation),r.scale!==void 0&&l.scale.fromArray(r.scale);if(!s.associations.has(l))s.associations.set(l,{});else if(r.mesh!==void 0&&s.meshCache.refs[r.mesh]>1){const h=s.associations.get(l);s.associations.set(l,{...h})}return s.associations.get(l).nodes=e,l}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],s=this,r=new Ht;n.name&&(r.name=s.createUniqueName(n.name)),Cn(r,n),n.extensions&&ni(t,r,n);const a=n.nodes||[],o=[];for(let c=0,u=a.length;c<u;c++)o.push(s.getDependency("node",a[c]));return Promise.all(o).then(function(c){for(let l=0,h=c.length;l<h;l++)r.add(c[l]);const u=l=>{const h=new Map;for(const[d,f]of s.associations)(d instanceof vn||d instanceof St)&&h.set(d,f);return l.traverse(d=>{const f=s.associations.get(d);f!=null&&h.set(d,f)}),h};return s.associations=u(r),r})}_createAnimationTracks(e,t,n,s,r){const a=[],o=e.name?e.name:e.uuid,c=[];Vn[r.path]===Vn.weights?e.traverse(function(d){d.morphTargetInfluences&&c.push(d.name?d.name:d.uuid)}):c.push(o);let u;switch(Vn[r.path]){case Vn.weights:u=Wi;break;case Vn.rotation:u=Xi;break;case Vn.translation:case Vn.scale:u=$i;break;default:switch(n.itemSize){case 1:u=Wi;break;case 2:case 3:default:u=$i;break}break}const l=s.interpolation!==void 0?nv[s.interpolation]:Ss,h=this._getArrayFromAccessor(n);for(let d=0,f=c.length;d<f;d++){const g=new u(c[d]+"."+Vn[r.path],t.array,h,l);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),a.push(g)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=uo(t.constructor),s=new Float32Array(t.length);for(let r=0,a=t.length;r<a;r++)s[r]=t[r]*n;t=s}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const s=this instanceof Xi?tv:Tu;return new s(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function uv(i,e,t){const n=e.attributes,s=new hn;if(n.POSITION!==void 0){const o=t.json.accessors[n.POSITION],c=o.min,u=o.max;if(c!==void 0&&u!==void 0){if(s.set(new N(c[0],c[1],c[2]),new N(u[0],u[1],u[2])),o.normalized){const l=uo(Ui[o.componentType]);s.min.multiplyScalar(l),s.max.multiplyScalar(l)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const r=e.targets;if(r!==void 0){const o=new N,c=new N;for(let u=0,l=r.length;u<l;u++){const h=r[u];if(h.POSITION!==void 0){const d=t.json.accessors[h.POSITION],f=d.min,g=d.max;if(f!==void 0&&g!==void 0){if(c.setX(Math.max(Math.abs(f[0]),Math.abs(g[0]))),c.setY(Math.max(Math.abs(f[1]),Math.abs(g[1]))),c.setZ(Math.max(Math.abs(f[2]),Math.abs(g[2]))),d.normalized){const _=uo(Ui[d.componentType]);c.multiplyScalar(_)}o.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(o)}i.boundingBox=s;const a=new yn;s.getCenter(a.center),a.radius=s.min.distanceTo(s.max)/2,i.boundingSphere=a}function vl(i,e,t){const n=e.attributes,s=[];function r(a,o){return t.getDependency("accessor",a).then(function(c){i.setAttribute(o,c)})}for(const a in n){const o=lo[a]||a.toLowerCase();o in i.attributes||s.push(r(n[a],o))}if(e.indices!==void 0&&!i.index){const a=t.getDependency("accessor",e.indices).then(function(o){i.setIndex(o)});s.push(a)}return Ye.workingColorSpace!==kt&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Ye.workingColorSpace}" not supported.`),Cn(i,e),uv(i,e,t),Promise.all(s).then(function(){return e.targets!==void 0?sv(i,e.targets,t):i})}class hv extends so{constructor(){super();const e=new Jt;e.deleteAttribute("uv");const t=new Gi({side:Ct}),n=new Gi,s=new _u(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);const r=new Ke(e,t);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);const a=new uu(e,n,6),o=new ft;o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),o.updateMatrix(),a.setMatrixAt(0,o.matrix),o.position.set(-5.607,-.754,-.758),o.rotation.set(0,.994,0),o.scale.set(1.97,1.534,3.955),o.updateMatrix(),a.setMatrixAt(1,o.matrix),o.position.set(6.167,.857,7.803),o.rotation.set(0,.561,0),o.scale.set(3.927,6.285,3.687),o.updateMatrix(),a.setMatrixAt(2,o.matrix),o.position.set(-2.017,.018,6.124),o.rotation.set(0,.333,0),o.scale.set(2.002,4.566,2.064),o.updateMatrix(),a.setMatrixAt(3,o.matrix),o.position.set(2.291,-.756,-2.621),o.rotation.set(0,-.286,0),o.scale.set(1.546,1.552,1.496),o.updateMatrix(),a.setMatrixAt(4,o.matrix),o.position.set(-2.193,-.369,-5.547),o.rotation.set(0,.516,0),o.scale.set(3.875,3.487,2.986),o.updateMatrix(),a.setMatrixAt(5,o.matrix),this.add(a);const c=new Ke(e,Ci(50));c.position.set(-16.116,14.37,8.208),c.scale.set(.1,2.428,2.739),this.add(c);const u=new Ke(e,Ci(50));u.position.set(-16.109,18.021,-8.207),u.scale.set(.1,2.425,2.751),this.add(u);const l=new Ke(e,Ci(17));l.position.set(14.904,12.198,-1.832),l.scale.set(.15,4.265,6.331),this.add(l);const h=new Ke(e,Ci(43));h.position.set(-.462,8.89,14.52),h.scale.set(4.38,5.441,.088),this.add(h);const d=new Ke(e,Ci(20));d.position.set(3.235,11.486,-12.541),d.scale.set(2.5,2,.1),this.add(d);const f=new Ke(e,Ci(100));f.position.set(0,20,0),f.scale.set(1,.1,1),this.add(f)}dispose(){const e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(const t of e)t.dispose()}}function Ci(i){const e=new Ft;return e.color.setScalar(i),e}const mr=2758464,hs=.5,xl={counter:{kitchen:{file:"rest/kitchencounter_straight_A_decorated.gltf",fit:.96},"*":{file:"furn/cabinet_medium_decorated.gltf",fit:.9}},case:{kitchen:{file:"rest/fridge_A_decorated.gltf",fit:.8,maxH:1.25},"*":{file:"furn/cabinet_small_decorated.gltf",fit:.8}},chair:{kitchen:{file:"rest/chair_A.gltf",fit:.62,seatY:.28},"*":{file:"furn/chair_A_wood.gltf",fit:.62,seatY:.28}},table:{kitchen:{file:"rest/table_round_A_decorated.gltf",fit:.9},"*":{file:"furn/table_medium.gltf",fit:.9}},plant:{"*":{file:"furn/cactus_medium_A.gltf",fit:.6,maxH:.9}},carpet:{kitchen:{file:"furn/rug_rectangle_stripes_A.gltf",fit:.96,flat:!0,seatY:.03},"*":{file:"furn/rug_oval_A.gltf",fit:.96,flat:!0,seatY:.03}},shelf:{"*":{file:"furn/shelf_B_large_decorated.gltf",fit:.92,maxH:1.3}},crate:{kitchen:{file:"rest/crate_carrots.gltf",fit:.7},"*":{file:"rest/crate_potatoes.gltf",fit:.7}},sofa:{"*":{file:"furn/couch_pillows.gltf",fit:.98,seatY:.24}},bench:{"*":{file:"city/bench.gltf",fit:.92,seatY:.22}},bed:{"*":{file:"furn/bed_single_A.gltf",fit:.98,seatY:.3}},statue:{"*":{file:"kenney/statue_head.glb",fit:.62,maxH:1.1,tint:15327698}},desk:{"*":{file:"kenney/desk.glb",fit:.92}},piano:{"*":{file:"kenney/piano.glb",fit:.96,maxH:1.15}}},dv=(i,e)=>xl[i]?.[e]??xl[i]?.["*"]??null,ho=[14269842,12175528,14068374,11451595,12957386,14470552,11191484,14268608],fv=new Pe(15853784),Ml=ho.map(i=>fv.clone().lerp(new Pe(i),.28).getHex()),yl=["#ffe2c2","#f5c9a0","#c99067","#ecd0b6","#8d5a3b","#ffd9b8","#b97a52","#f1c7a5"],Sl=["flatcap","cap","bun","beret","hair"];function pv(i,e,t){const n=t==="bram"?"helmet":t==="mina"?"wizard":t==="rue"?"hair":Sl[i%Sl.length];return{hue:e,hat:n,skin:yl[i*3%yl.length]}}const ga=(i,e,t)=>new Pe().setHSL(i/360,e/100,t/100),vt=(i,e={})=>new dn({color:i,roughness:.42,clearcoat:.35,clearcoatRoughness:.3,...e}),mv=new Ft({color:mr,side:Ct});function Mt(i,e,t,n=[0,0,0],s=[1,1,1],r=[0,0,0],a=.035){const o=new Ke(e,t);if(o.position.set(n[0],n[1],n[2]),o.scale.set(s[0],s[1],s[2]),o.rotation.set(r[0],r[1],r[2]),o.castShadow=!0,o.receiveShadow=!0,i.add(o),a){const c=new Ke(e,mv);c.scale.setScalar(1+a),o.add(c)}return o}const El=i=>new Co(i.map(([e,t])=>new Ne(e,t)),40);function _a(i){const e=new Ht,t=ga(i.hue,52,58),n=ga(i.hue,46,42),s=ga((i.hue+25)%360,46,40),r=1,a=1;Mt(e,El([[0,0],[.6,0],[.66,.03],[.68,.09],[.64,.15],[.5,.17],[0,.17]]),vt(n),[0,0,0],[1,1,1],[0,0,0],.02),Mt(e,El([[0,0],[.36,0],[.44,.12],[.47,.3],[.44,.52],[.36,.7],[.22,.8],[0,.82]]),vt(t),[0,.16,0],[r,a,r*.92]);for(const h of[-1,1])Mt(e,new Ao(.085,.26,6,12),vt(t),[h*.44*r,.55,.04],[1,1,1],[.15,0,h*.35],.06);for(const h of[-1,1])Mt(e,new an(.075,16,12),new Ft({color:mr}),[h*.53*r,.36,.08],[1,1,1],[0,0,0],0);const o=new Ht;o.position.set(0,.16+.82*a+.3,0),e.add(o),e.userData.head=o;const c=vt(i.skin,{clearcoat:.15,roughness:.55});Mt(o,new an(.42,40,30),c,[0,0,0],[1,.94,.92]);for(const h of[-1,1]){const d=new Ht;d.position.set(h*.14,.02,.36),d.rotation.y=h*.33,o.add(d),Mt(d,new an(.06,16,12),new Ft({color:mr}),[0,0,0],[.85,1.15,.5],[0,0,0],0)}Mt(o,new Ts(.05,.012,8,20,Math.PI*.8),new Ft({color:mr}),[0,-.15,.37],[1,.6,1],[.2,0,Math.PI*1.1],0);const u=vt(s),l=(h,d,f=0)=>Mt(o,new an(.45,36,18,0,Math.PI*2,0,Math.PI/2),u,[0,h,0],[1.02,d,1.02],[f,0,0]);return i.hat==="flatcap"?(l(.06,.78),Mt(o,new ci(.3,.3,.03,24,1,!1,-Math.PI/2,Math.PI),u,[0,.13,.22],[1,1,.8],[.18,0,0])):i.hat==="wizard"?(Mt(o,new yr(.34,.75,32),u,[0,.55,-.04],[1,1,1],[-.2,0,.12]),Mt(o,new ci(.56,.56,.04,36),u,[0,.22,0],[1,1,1],[-.08,0,0])):i.hat==="hair"?(l(.05,.95,-.25),Mt(o,new an(.16,16,12),u,[.3,.32,-.1]),Mt(o,new an(.16,16,12),u,[-.3,.32,-.1])):i.hat==="helmet"?(Mt(o,new an(.46,36,18,0,Math.PI*2,0,Math.PI/2),vt("#b9c0cc",{metalness:.6,roughness:.3}),[0,.02,0],[1,.9,1]),Mt(o,new yr(.08,.3,12),vt("#d9444f"),[0,.5,-.05])):i.hat==="cap"?(l(.1,.8),Mt(o,new ci(.26,.26,.03,24,1,!1,-Math.PI/2,Math.PI),u,[0,.12,.3],[1,1,1.1],[.05,0,0])):i.hat==="bun"?(l(.04,.9,-.2),Mt(o,new an(.19,18,14),u,[0,.46,-.12])):(Mt(o,new ci(.44,.48,.12,30),u,[.04,.3,-.02],[1,1,1],[-.12,0,-.18]),Mt(o,new an(.06,12,10),u,[.02,.4,0])),e}class Tl{constructor(e){rt(this,"canvas");rt(this,"renderer");rt(this,"scene",new so);rt(this,"cam",new br(-1,1,1,-1,.1,400));rt(this,"loader",new P0);rt(this,"cache",new Map);rt(this,"world",new Ht);rt(this,"pawnLayer",new Ht);rt(this,"caseKey","");rt(this,"model",null);rt(this,"seatAt",new Map);rt(this,"pawns",[]);rt(this,"ring");rt(this,"focusRings",[]);rt(this,"ghost",null);rt(this,"loot");rt(this,"dirty",!0);rt(this,"raf",0);rt(this,"selAt",0);rt(this,"fresh",!0);rt(this,"markLayer",new Ht);rt(this,"markMats",{});rt(this,"selected",null);rt(this,"looks",[]);rt(this,"portraits",new Map);rt(this,"portraitRenderer",null);rt(this,"muted",new Map);this.base=e,this.renderer=new fl({antialias:!0,alpha:!0}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),this.renderer.outputColorSpace=yt,this.renderer.toneMapping=Aa,this.renderer.toneMappingExposure=.98,this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=kl,this.canvas=this.renderer.domElement,this.canvas.className="board3d",this.canvas.setAttribute("aria-hidden","true");const t=new oo(this.renderer);this.scene.environment=t.fromScene(new hv,.04).texture,this.scene.environmentIntensity=.5;const n=new fr(16773336,2.4);n.position.set(-5,12,9),n.castShadow=!0,n.shadow.mapSize.set(2048,2048),n.shadow.radius=5,n.shadow.normalBias=.03,n.shadow.bias=-4e-4,Object.assign(n.shadow.camera,{left:-9,right:9,top:9,bottom:-9,near:1,far:40}),n.shadow.camera.updateProjectionMatrix(),this.scene.add(n,n.target),this.key=n;const s=new fr(14207231,.9);s.position.set(6,5,-6),this.scene.add(s,new kc(16773598,4864040,.5)),this.scene.add(this.world,this.pawnLayer,this.markLayer);const r=(f,g)=>new Ft({color:f,transparent:!0,opacity:g,depthWrite:!1});this.markMats={ruled:r(2760984,.1),cand:r(14924104,.42),sight:r(6979496,.34),"sight-origin":r(13205562,.5),"drop-ok":r(7314012,.5),"drop-bad":r(11884874,.4),x:r(16777215,.22)},this.ring=new Ke(new Ts(.42,.05,10,40),new Ft({color:14924104})),this.ring.rotation.x=-Math.PI/2,this.ring.visible=!1,this.scene.add(this.ring),this.loot=new Ht;const a=new Ke(new Po(.16,0),vt(16762941,{emissive:new Pe(16751872),emissiveIntensity:.45,metalness:.3}));a.castShadow=!0,a.scale.y=1.35,this.loot.add(a),this.loot.visible=!1,this.scene.add(this.loot);const o=window.matchMedia?.("(prefers-reduced-motion: reduce)").matches??!1,c=260,u=150/260,l=180,h=2,d=()=>{this.raf=requestAnimationFrame(d);const f=performance.now();let g=!1;for(const[_,m]of this.pawns.entries()){if(!m.cell)continue;const p=o?1:Math.min(1,(f-m.drop)/c);p<1&&(g=!0);const E=p<u?1-(p/u)**2:0,b=p<u?0:(p-u)/(1-u),x=p<u||p>=1?0:Math.sin(b*Math.PI)*.16*(1-b*.6);let P=m.seat+E*1.4;if(_===this.selected&&p>=1){const R=o?1:(f-this.selAt)/l;P+=.05+(R<h?Math.abs(Math.sin(R*Math.PI))*.14:0),R<h&&(g=!0)}m.obj.position.y=P,m.obj.scale.set(hs*(1+x),hs*(1-x),hs*(1+x))}(g||this.dirty)&&(this.renderer.render(this.scene,this.cam),this.dirty=!1)};this.raf=requestAnimationFrame(d)}static supported(){try{const e=document.createElement("canvas");return!!(e.getContext("webgl2")||e.getContext("webgl"))}catch{return!1}}destroy(){cancelAnimationFrame(this.raf),this.renderer.dispose()}mute(e){const t=e.map;if(t&&t.image){let n=this.muted.get(t);if(!n){const s=t.image,r=document.createElement("canvas");r.width=s.width,r.height=s.height;const a=r.getContext("2d",{willReadFrequently:!0});a.drawImage(s,0,0);const o=a.getImageData(0,0,r.width,r.height),c=o.data;for(let u=0;u<c.length;u+=4){const l=.3*c[u]+.59*c[u+1]+.11*c[u+2];c[u]=Math.min(255,l+(c[u]-l)*.58+3),c[u+1]=l+(c[u+1]-l)*.58,c[u+2]=Math.max(0,l+(c[u+2]-l)*.58-3)}a.putImageData(o,0,0),n=new gf(r),n.flipY=t.flipY,n.colorSpace=t.colorSpace,n.wrapS=t.wrapS,n.wrapT=t.wrapT,n.anisotropy=4,this.muted.set(t,n)}e.map=n,e.needsUpdate=!0}else if(e.color){const n={h:0,s:0,l:0};e.color.getHSL(n),e.color.setHSL(n.h,n.s*.62,n.l)}}load(e){let t=this.cache.get(e);return t||(t=this.loader.loadAsync(`${this.base}models/${e}`).then(n=>(n.scene.traverse(s=>{const r=s;r.isMesh&&(r.castShadow=!0,r.receiveShadow=!0,this.mute(r.material))}),n.scene)).catch(()=>null),this.cache.set(e,t)),t}setCase(e,t,n,s,r){if(e===this.caseKey)return;this.caseKey=e,this.model=t,this.looks=s,this.fresh=!0,this.world.clear(),this.pawnLayer.clear(),this.markLayer.clear(),this.pawns=[],this.seatAt.clear();const{rows:a,cols:o}=t,c=this.key;c.target.position.set(o/2,0,a/2),c.position.set(o/2-5,12,a/2+9);const u=.42,l=new Ke(new Jt(o+u*2,.5,a+u*2),[vt(8019784,{clearcoat:0}),vt(8019784,{clearcoat:0}),vt(9678210,{clearcoat:0,roughness:.85}),vt(6639677,{clearcoat:0}),vt(8019784,{clearcoat:0}),vt(8019784,{clearcoat:0})]);l.position.set(o/2,-.3,a/2),l.receiveShadow=!0,this.world.add(l);const h=new Ke(new Jt(o+u*2+.04,.08,a+u*2+.04),vt(8823414,{clearcoat:0,roughness:.9}));h.position.set(o/2,-.07,a/2),h.receiveShadow=!0,this.world.add(h);const d=w=>Math.max(0,t.roomKeys.indexOf(w)),f=new Map,g=(w,A)=>{const S=`${w}-${A}`;let v=f.get(S);if(!v){const I=new Pe(ho[w%ho.length]);A&&I.offsetHSL(0,-.03,-.035),v=vt(I,{clearcoat:.25,clearcoatRoughness:.5,roughness:.6}),f.set(S,v)}return v},_=vt(9271910,{clearcoat:0,roughness:.9}),m=new Jt(.94,.1,.94);for(let w=0;w<a;w++)for(let A=0;A<o;A++){if(!t.isCell(w,A))continue;const S=new Ke(new Jt(1,.08,1),_);S.position.set(A+.5,-.07,w+.5),S.receiveShadow=!0,this.world.add(S);const v=new Ke(m,g(d(t.roomOf(w,A)),(w+A)%2===1));v.position.set(A+.5,-.05,w+.5),v.receiveShadow=!0,this.world.add(v)}const p=vt(16511454,{clearcoat:.1,roughness:.7}),E=vt(10122840,{clearcoat:.15}),b=.12,x=(w,A,S,v,I,H)=>{const z=S==="x"?v+b:b,X=S==="z"?v+b:b,Y=new Ke(new Jt(z,I,X),H!==void 0?vt(H,{clearcoat:.05,roughness:.8}):p);Y.position.set(w,I/2,A),Y.castShadow=!0,Y.receiveShadow=!0,this.world.add(Y);const $=new Ke(new Jt(z+.03,.05,X+.03),E);$.position.set(w,I+.02,A),$.castShadow=!0,this.world.add($)},P=(w,A,S,v)=>t.isCell(S,v)&&t.roomOf(S,v)===t.roomOf(w,A),R=[];for(let w=0;w<a;w++)for(let A=0;A<o;A++){if(!t.isCell(w,A))continue;const S=d(t.roomOf(w,A));t.isCell(w-1,A)?P(w,A,w-1,A)||x(A+.5,w,"x",1,.32):(x(A+.5,w,"x",1,1.25,Ml[S%Ml.length]),(w*7+A*3)%4===1&&R.push([w,A])),t.isCell(w,A-1)?P(w,A,w,A-1)||x(A,w+.5,"z",1,.32):x(A,w+.5,"z",1,.62),t.isCell(w,A+1)||x(A+1,w+.5,"z",1,.62),t.isCell(w+1,A)||x(A+.5,w+1,"x",1,.2)}for(const[w,A]of R)this.load("furn/pictureframe_medium.gltf").then(S=>{if(!S||this.caseKey!==e)return;const v=S.clone(!0);bl(v,.42,.42),v.position.set(A+.5,.62,w+.08),this.world.add(v),this.dirty=!0});for(const[w,A]of t.furniture){const[S,v]=w.split(",").map(Number),I=dv(A,n);I&&(I.seatY!==void 0&&this.seatAt.set(w,I.seatY),this.load(I.file).then(H=>{if(!H||this.caseKey!==e)return;const z=H.clone(!0);I.tint!==void 0&&z.traverse(X=>{const Y=X;Y.isMesh&&(Y.material=new Gi({color:I.tint,roughness:.55}))}),z.rotation.y=gv(A,S,v,t),bl(z,I.fit??.86,I.maxH??1.2,I.flat),z.position.x+=v+.5,z.position.z+=S+.5,this.world.add(z),this.dirty=!0}))}this.loot.visible=!0,this.loot.position.set(t.loot.c+.5,(this.seatAt.get(`${t.loot.r},${t.loot.c}`)??0)+1.05,t.loot.r+.5),s.forEach(w=>{const A=_a(w);A.scale.setScalar(hs),A.visible=!1,this.pawnLayer.add(A),this.pawns.push({obj:A,cell:null,drop:0,seat:0})}),this.dirty=!0}sync(e,t,n,s){t!==this.selected&&(this.selAt=performance.now()),this.selected=t,e.forEach((a,o)=>{const c=this.pawns[o];if(!c)return;const u=!!a&&(!c.cell||c.cell.r!==a.r||c.cell.c!==a.c);c.cell=a,c.obj.visible=!!a,a&&(c.seat=this.seatAt.get(`${a.r},${a.c}`)??0,c.obj.position.set(a.c+.5,c.seat,a.r+.5),c.obj.rotation.y=0,u&&(c.drop=this.fresh?0:performance.now()))}),this.fresh=!1;const r=t!==null?this.pawns[t]:null;this.ring.visible=!!r?.cell,r?.cell&&this.ring.position.set(r.cell.c+.5,r.seat+.03,r.cell.r+.5);for(const a of this.focusRings)this.scene.remove(a);if(this.focusRings=n.filter(a=>this.pawns[a]?.cell).map(a=>{const o=this.pawns[a],c=new Ke(new Ts(.38,.04,10,40),new Ft({color:6979496}));return c.rotation.x=-Math.PI/2,c.position.set(o.cell.c+.5,o.seat+.03,o.cell.r+.5),this.scene.add(c),c}),this.ghost&&(this.scene.remove(this.ghost),this.ghost=null),s&&this.looks[s.i]){const a=_a(this.looks[s.i]);a.traverse(o=>{const c=o;if(c.isMesh){const u=c.material.clone();u.transparent=!0,u.opacity=.45,u.depthWrite=!1,c.material=u,c.castShadow=!1}}),a.scale.setScalar(hs),a.position.set(s.cell.c+.5,this.seatAt.get(`${s.cell.r},${s.cell.c}`)??0,s.cell.r+.5),this.ghost=a,this.scene.add(a)}this.dirty=!0}marks(e){this.markLayer.clear();const t=new Vi(.94,.94),n=new Vi(.34,.05);for(const[s,r]of e){const[a,o]=s.split(",").map(Number);r.forEach((c,u)=>{const l=this.markMats[c];if(!l)return;const h=new Ke(t,l);if(h.rotation.x=-Math.PI/2,h.position.set(o+.5,.004+u*.002,a+.5),h.renderOrder=2,this.markLayer.add(h),c==="ruled"&&!this.model?.furniture.has(s))for(const d of[Math.PI/4,-Math.PI/4]){const f=new Ke(n,this.markMats.x);f.rotation.set(-Math.PI/2,0,d),f.position.set(o+.5,.012,a+.5),f.renderOrder=3,this.markLayer.add(f)}})}this.dirty=!0}layout(e,t){this.canvas.parentElement!==e&&e.prepend(this.canvas);const n=this.model;if(!n)return;const s=t.querySelector('.cell[data-r="0"][data-c="0"], .cell'),r=t.querySelectorAll(".cell"),a=r[r.length-1];if(!s||!a)return;const o=e.getBoundingClientRect(),c=t.getBoundingClientRect(),u=r[0].getBoundingClientRect(),l=a.getBoundingClientRect(),h=(l.right-u.left)/n.cols,d=(l.bottom-u.top)/n.rows;if(!(h>0)||!(d>0))return;const f=Math.min(.999,d/h),g=Math.sqrt(1-f*f),_=c.left-o.left-12,m=c.top-o.top-h*.15,p=Math.round(c.width+24),E=Math.round(l.bottom-o.top-m+h*.72);Object.assign(this.canvas.style,{left:`${_}px`,top:`${m}px`,width:`${p}px`,height:`${E}px`}),this.renderer.setSize(p,E,!1);const b=u.left-(o.left+_),x=u.top-(o.top+m),P=60;this.cam.position.set(0,P*f,P*g),this.cam.up.set(0,g,-f),this.cam.lookAt(0,0,0),this.cam.left=-b/h,this.cam.right=this.cam.left+p/h,this.cam.top=x/h,this.cam.bottom=this.cam.top-E/h,this.cam.near=1,this.cam.far=P+60,this.cam.updateProjectionMatrix(),this.dirty=!0}portrait(e){const t=this.looks[e];if(!t)return"";const n=`${t.hue}-${t.hat}-${t.skin}`,s=this.portraits.get(n);if(s)return s;try{const r=this.portraitRenderer??(this.portraitRenderer=new fl({antialias:!0,alpha:!0,preserveDrawingBuffer:!0}));r.setPixelRatio(1),r.setSize(160,160),r.setClearColor(0,0),r.outputColorSpace=yt,r.toneMapping=Aa;const a=new so;a.environment=this.scene.environment,a.environmentIntensity=.55;const o=new fr(16773596,2.4);o.position.set(2,4,5),a.add(o,new kc(16774374,3811904,.6));const c=_a(t);a.add(c);const u=new Ut(24,1,.1,50);u.position.set(0,1.9,5.2),u.lookAt(0,1.05,0),r.render(a,u);const l=r.domElement.toDataURL("image/png");return this.portraits.set(n,l),l}catch{return""}}}function bl(i,e,t,n=!1){i.updateMatrixWorld(!0);const r=new hn().setFromObject(i).getSize(new N),a=Math.max(r.x,r.z)||1;let o=e/a;!n&&r.y*o>t&&(o=t/r.y),i.scale.multiplyScalar(o),i.updateMatrixWorld(!0);const c=new hn().setFromObject(i),u=c.getCenter(new N);i.position.x-=u.x,i.position.z-=u.z,i.position.y-=c.min.y}function gv(i,e,t,n){const s=(r,a)=>n.furniture.get(`${r},${a}`);if(i==="chair"||i==="bench"||i==="sofa"){const r=[[1,0,0],[-1,0,Math.PI],[0,1,Math.PI/2],[0,-1,-Math.PI/2]];for(const[a,o,c]of r){const u=s(e+a,t+o);if(u==="table"||u==="desk"||u==="counter")return c}}if(i==="shelf"||i==="case"||i==="counter"||i==="piano"||i==="bed"){if(!n.isCell(e+1,t)||n.isCell(e+1,t)&&n.roomOf(e+1,t)!==n.roomOf(e,t)&&n.isCell(e-1,t)&&n.roomOf(e-1,t)===n.roomOf(e,t))return Math.PI;if(!n.isCell(e,t-1)||n.roomOf(e,t-1)!==n.roomOf(e,t))return Math.PI/2;if(!n.isCell(e,t+1)||n.roomOf(e,t+1)!==n.roomOf(e,t))return-Math.PI/2}return 0}const Pi=[18,205,285,140,48,340,170,250],tt=i=>String(i).replace(/[&<>"]/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[e]),_v={true:{sym:"✓",label:"fits"},false:{sym:"✕",label:"does not fit"},unknown:{sym:"○",label:"not decided yet"}};async function vv(i,e){const t="./",n=Mh(),s=M=>fetch(M),[r,a]=await Promise.all([ih(t,s,n),Nu(t,s)]),o=gh(e),u=Object.keys(o.cases).length===0&&r.practice.length?r.practice[0]:r.daily??r.practice[0];if(!u){i.innerHTML='<p class="fatal">No case file found. Add data/cases/liar/sample.json and rebuild.</p>';return}const l={};Object.assign(l,{save:o,lists:r,assets:a,today:n,selected:null,holding:null,hover:null,focusClue:null,revealSig:null,endOpen:!1,modal:null,confirmReset:!1,practiceIdx:0,lastTouch:Date.now(),liarMode:!1,intro:xv(e)?null:0}),Xe(l,u),l.practiceIdx=Math.max(0,r.practice.findIndex(M=>M.key===u.key)),i.innerHTML=`
    <div class="app">
      <header id="hdr" class="hdr"></header>
      <div class="layout">
        <section id="stage" class="stage" aria-label="Case board"></section>
        <section id="cards" class="cardpane" aria-label="Clue cards"></section>
      </div>
      <div id="modal"></div>
      <div id="toast" class="toast" role="status" aria-live="polite"></div>
    </div>`;const h=M=>i.querySelector(`#${M}`),d=h("hdr"),f=h("stage"),g=h("cards"),_=h("modal"),m=h("toast"),p=Tl.supported()?new Tl(t):null;p&&new ResizeObserver(()=>te()).observe(f),wl(l.save.settings.theme),window.matchMedia?.("(prefers-color-scheme: dark)").addEventListener?.("change",()=>bu(l.save.settings.theme));const E=()=>l.current.data.puzzle.suspects.map(M=>M.name),b=()=>l.current.kind==="practice"?"guided":l.save.settings.help,x=()=>b()==="guided"||l.revealSig!==null&&l.revealSig===Pr(l.progress.placement),P=()=>l.progress.solved,R=()=>Ku(l.current.data.puzzle.clues,l.progress.placement,l.ctx);function w(){_h(e,l.save)}function A(){const M=Date.now();l.progress.solved||(l.progress.activeMs+=Math.min(M-l.lastTouch,6e4)),l.lastTouch=M}function S(M){m.textContent=M,m.classList.add("show"),window.clearTimeout(S.t),S.t=window.setTimeout(()=>m.classList.remove("show"),2400)}function v(){const M=Sh(l.save.streak,l.today),L=l.current.kind==="daily",F=l.lists.practice;d.innerHTML=`
      <div class="brand"><span class="logo" aria-hidden="true"></span><h1>Whodunit Lane</h1></div>
      <div class="hdr-right">
        <span class="streak" title="Daily streak">Streak <b>${M}</b></span>
        <button class="btn ghost" data-action="intro" aria-label="How to play">How to play</button>
        <button class="btn ghost" data-action="settings" aria-label="Settings">Settings</button>
      </div>
      <nav class="tabs" aria-label="Case">
        ${l.lists.daily?`<button class="tab ${L?"on":""}" data-action="daily">Today${l.lists.daily.date?` <small>${tt(l.lists.daily.date)}</small>`:""}</button>`:""}
        ${F.length?`<button class="tab ${L?"":"on"}" data-action="practice">Practice${F.length>1?` <small>${l.practiceIdx+1}/${F.length}</small>`:""}</button>`:""}
      </nav>`}function I(){if(!l.coach.length)return null;const M=lh(l.coach,l.progress.placement,l.save.coachStep[l.current.key]??0);return M&&M.index!==l.coachFor&&(l.coachFor=M.index,l.coachLevel=0),M}function H(){if(b()!=="guided")return'<div class="coach off" aria-hidden="true"></div>';const M=l.progress;if(M.solved)return'<div class="coach"><b>Case closed.</b> Open the results to share it.</div>';const L=I();let F,O="";if(l.coach.length&&L){const J=Math.min(l.coachLevel,L.step.levels.length-1);F=L.step.levels[J],L.manual?O='<button class="btn small" data-action="coach-next">Next tip</button>':J<L.step.levels.length-1&&(O='<button class="btn small" data-action="coach-more">More help</button>')}else l.coach.length?F="Everything on the board is done. Press “Point out the lie”, tap the card you think is the lie, then press Solve.":F=uh({clues:l.current.data.puzzle.clues,suspectNames:E(),placement:M.placement,verdicts:R(),liar:M.liar});return`<div class="coach" role="note"><span class="coach-tag">Coach</span><span class="coach-text">${tt(F)}</span>${O}</div>`}function z(M){const L=l.current.lieHelp;return Ju(M,l.current.data.puzzle.clues,l.progress.placement,l.model,l.ctx,{lieNo:L==="told"?l.current.data.solution.falseClueNo:null,pair:L==="pair"?$o(l.current.data):null,hard:L==="none"})}function X(){const{puzzle:M}=l.current.data,L=l.model,F=L.roomKeys,O=new Map;for(let re=0;re<M.rows;re++)for(let ie=0;ie<M.cols;ie++){const be=L.roomOf(re,ie);L.isCell(re,ie)&&!O.has(be)&&O.set(be,`${re},${ie}`)}const J=l.progress.placement,q=new Set(J.filter(Boolean).map(re=>re.r)),ne=new Set(J.filter(Boolean).map(re=>re.c)),Q=l.selected,Z=Q!==null?z(Q):null,oe=Z?new Set(Z.cells.map(re=>`${re.r},${re.c}`)):null;let Me=`<div class="board ${p?"three":""} ${Q!==null?"picking":""}" style="--cols:${M.cols};--rows:${M.rows}" role="group" aria-label="Floor plan, ${M.rows} rows by ${M.cols} columns">`;Me+='<span class="axis corner-sp"></span>';for(let re=0;re<M.cols;re++)Me+=`<span class="axis ax-c">${re+1}</span>`;for(let re=0;re<M.rows;re++){Me+=`<span class="axis ax-r">${re+1}</span>`;for(let ie=0;ie<M.cols;ie++){if(!L.isCell(re,ie)){Me+='<span class="cell void"></span>';continue}const be=L.roomOf(re,ie),U=["n","s","w","e"].map(Un=>{const Ji=re+(Un==="n"?-1:Un==="s"?1:0),pn=ie+(Un==="w"?-1:Un==="e"?1:0);return!L.isCell(Ji,pn)||L.roomOf(Ji,pn)!==be?`w${Un}`:""}).join(" "),le=L.furniture.get(`${re},${ie}`),ee=L.blocking.has(`${re},${ie}`),ge=L.loot.r===re&&L.loot.c===ie,se=Wo(l.progress.placement,re,ie);let j="";se<0&&!ee&&(Q!==null?j=oe.has(`${re},${ie}`)?"cand":"ruled":(q.has(re)||ne.has(ie))&&(j="ruled"));const ve=O.get(be)===`${re},${ie}`?`<span class="rlabel">${tt(L.roomLabel(be))}</span>`:"",Ie=le?`<span class="furn ${ee?"blocking":"seat"}" data-key="${Cr(le)}">${l.assets[Cr(le)]?`<img src="${tt(l.assets[Cr(le)].src)}" alt="">`:""}<em>${tt(le)}</em></span>`:"",ct=ge?`<span class="loot" data-key="voorwerp.buit" title="${tt(M.loot.item)}"></span>`:"",Je=`Row ${re+1}, column ${ie+1}, ${L.roomLabel(be)}${le?`, ${le}${ee?" (blocked)":""}`:""}${se>=0?`, ${E()[se]}`:""}`,Lt=l.assets[zo(be)]??l.assets[["vloer.hout","vloer.tegel"][F.indexOf(be)%2]],en=Lt?` style="--tile:url('${tt(Lt.src)}');--tx:${ie%2*100}%;--ty:${re%2*100}%"`:"";Me+=`<div class="cell rm${F.indexOf(be)%8} ${U} ${j} ${ee?"is-blocked":""} ${Lt?"has-floor":""}"${en} data-r="${re}" data-c="${ie}" data-floor="${zo(be)}" tabindex="0" role="button" aria-label="${tt(Je)}">${ve}${Ie}${ct}${se>=0?he(se,"on-board"):""}${j==="ruled"?'<span class="xmark" aria-hidden="true">✕</span>':""}</div>`}}return`${Me}</div>`}function Y(){return l.current.data.puzzle.suspects.map((M,L)=>pv(L,Pi[L%Pi.length],Ls(L,M.cast)))}function $(){if(!p)return;const M=l.current.data.puzzle;p.setCase(l.current.key,l.model,M.theme,Y(),l.assets);const L=l.focusClue!==null?M.clues.find(q=>q.no===l.focusClue):void 0,F=l.holding??l.selected,O=F!==null&&l.hover&&ar(l.model,l.progress.placement,F,l.hover).ok?{i:F,cell:l.hover}:null;p.sync(l.progress.placement,l.selected,L?es(L):[],O);const J=new Map;f.querySelectorAll(".cell[data-r]").forEach(q=>{const ne=["ruled","cand","sight","sight-origin","drop-ok","drop-bad"].filter(Q=>q.classList.contains(Q));ne.length&&J.set(`${q.dataset.r},${q.dataset.c}`,ne)}),p.marks(J)}function te(){if(!p)return;const M=f.querySelector(".stage-pin"),L=f.querySelector(".board");M&&L&&p.layout(M,L)}function W(M){if(p){$();const O=p.portrait(M);if(O)return`<img class="face pawnface" src="${O}" alt="">`}const L=Ls(M,l.current.data.puzzle.suspects[M].cast),F=L?l.assets[`cast.${L}.staand`]??l.assets[`cast.${L}`]:void 0;return F?`<img class="face" src="${tt(F.src)}" alt="">`:""}function he(M,L=""){const F=E()[M],O=l.progress.placement[M],J=l.focusClue!==null&&es(l.current.data.puzzle.clues.find(ne=>ne.no===l.focusClue)).includes(M)?"focus":"",q=l.selected===M?"sel":"";return`<span class="token ${L} ${J} ${q}" data-s="${M}" data-key="${tt("cast."+(Ls(M,l.current.data.puzzle.suspects[M].cast)??"extra"))}" style="--tc:hsl(${Pi[M%Pi.length]} 55% 40%)" tabindex="0" role="button" aria-pressed="${l.selected===M}" aria-label="${tt(F)}, number ${M+1}${O?`, at row ${O.r+1} column ${O.c+1}`:", not placed"}">${W(M)}<b>${tt(F.charAt(0).toUpperCase())}</b><i>${M+1}</i></span>`}function pe(){const M=l.progress.placement,L=l.current.kind==="practice"&&!M.some(Boolean);return`<div class="roster" id="roster" aria-label="Suspects">${E().map((O,J)=>{const q=L&&!M[J]&&z(J).cells.length===1;return`<span class="chip ${M[J]?"placed":""} ${q?"lead":""}">${he(J,"in-roster")}<span class="chip-name">${tt(O)}</span></span>`}).join("")}</div>`}function we(){return`<div class="legend"><span><i class="lg lg-block"></i>blocked</span><span><i class="lg lg-seat"></i>seat</span><span><i class="lg lg-loot"></i>${tt(l.current.data.puzzle.loot.item)}</span></div>`}function Ce(){const M=l.current.data.puzzle;f.innerHTML=`
      <div class="stage-top">
        <div class="caseline"><span>${tt(M.planLabel)}</span><span class="pill">${tt(M.difficulty)}</span><span class="pill">${M.suspects.length} suspects</span></div>
        ${H()}
      </div>
      <div class="stage-pin">
        ${X()}
        <div class="sightbar" id="sightbar" aria-live="polite"></div>
        ${pe()}
      </div>
      ${we()}`,ze(),te()}function je(M,L,F){const O=l.progress.liar===M.no,J=x(),q=J&&!O?L:"unknown",ne=O?"v-marked":J?`v-${q}`:"v-off",Q=O?{sym:"LIE?",label:"marked as the lie"}:J?_v[q]:{sym:"",label:""},Z=es(M).map(re=>`<span class="mini" style="--tc:hsl(${Pi[re%Pi.length]} 55% 40%)" title="${tt(E()[re])}">${tt(E()[re])}</span>`).join(""),oe=l.current.lieHelp==="told"&&M.no===l.current.data.solution.falseClueNo,Me=oe?'<span class="toldtag">This card is the lie: the opposite is true</span>':M.statement?O?`<button class="stamp on" data-action="mark" data-no="${M.no}" aria-pressed="true" ${P()?"disabled":""}>Not the lie</button>`:l.liarMode&&!P()?'<span class="stamp-hint">Tap to call this the lie</span>':"":'<span class="factag" title="A plain fact: always true">fact</span>';return`<article class="card ${ne} ${l.focusClue===M.no?"focus":""} ${F.has(M.no)?"hint":""} ${l.liarMode&&!M.statement?"nolie":""} ${l.liarMode&&M.statement?"lieable":""} ${oe?"told":""} ${K().includes(M.no)?"clash":""}" data-no="${M.no}" data-type="${tt(M.type)}" tabindex="0" aria-label="Card ${M.no}: ${tt(M.text)}${J&&!O?", "+Q.label:""}">
      <div class="card-top"><span class="no">${M.no}</span><span class="icon">${bh(Ou(M),l.assets)}</span><span class="who">${Z}</span><span class="badge" aria-hidden="true">${Q.sym}</span></div>
      <p class="cap">${tt(Ho(M))}</p>
      ${Me}
    </article>`}function K(){return l.current.lieHelp!=="pair"||l.progress.solved?[]:$o(l.current.data)??[]}function ce(){const M=l.current.lieHelp;if(l.progress.solved)return"";if(M==="told")return`<div class="liebanner told"><b>Easy:</b> card ${l.current.data.solution.falseClueNo} is the lie, so its opposite is true. Every other card is true.</div>`;const L=K();return M==="pair"&&L.length?`<div class="liebanner pair"><b>Medium:</b> cards ${L[0]} and ${L[1]} clash. One of them is the lie; every other card is true.</div>`:'<div class="liebanner hard"><b>Hard:</b> one card lies. Find two cards that can’t both be true.</div>'}function Ee(){const M=l.progress,L=Xo(M.placement),F=b()==="detective",O=Is-M.checksUsed,J=L&&M.liar!==null&&!M.solved,q=M.placement.length,ne=M.placement.filter(Boolean).length,Q=x()?R().filter(re=>re==="true").length:null,Z=l.current.data.puzzle.clues.length,oe=`<div class="progress" aria-label="Progress">
      <div class="pg"><span>Suspects placed</span><b>${ne} / ${q}</b><i class="bar"><u style="width:${ne/q*100}%"></u></i></div>
      ${Q!==null?`<div class="pg"><span>Hints that fit</span><b>${Q} / ${Z}</b><i class="bar"><u style="width:${Q/Z*100}%"></u></i></div>`:""}
    </div>`,Me=M.solved||l.current.lieHelp==="told"?"":`<button class="btn ${l.liarMode?"primary":""}" data-action="lie-mode" aria-pressed="${l.liarMode}">${l.liarMode?"Cancel":M.liar!==null?"Change the lie":"Point out the lie"}</button>`;return`${oe}<div class="actions">
      ${Me}
      ${F?`<button class="btn" data-action="check" ${O<=0||P()||!M.placement.some(Boolean)?"disabled":""}>Check <span class="pill">${O} left</span></button>`:""}
      <button class="btn" data-action="reset" ${P()||!M.placement.some(Boolean)&&M.liar===null?"disabled":""}>Clear</button>
      ${M.solved?'<button class="btn primary" data-action="results">Results</button>':`<button class="btn primary" data-action="solve" ${J?"":"disabled"}>Solve</button>`}
    </div>
    <p class="needs">${M.solved?"":J?"Ready to file the case.":L?"Press “Point out the lie”, then tap the card.":"Place every suspect."}</p>`}function fe(M,L){const{puzzle:F}=l.current.data,O=l.selected,J=F.clues.map((Q,Z)=>({c:Q,v:M[Z]}));if(l.liarMode)return`<p class="modehint">Tap the card that you think lies. Plain facts can't lie.</p><div class="cards">${J.map(Q=>je(Q.c,Q.v,L)).join("")}</div>`;if(O===null)return`<div class="cards">${J.map(Q=>je(Q.c,Q.v,L)).join("")}</div>`;const q=J.filter(Q=>es(Q.c).includes(O)),ne=J.filter(Q=>!es(Q.c).includes(O));return`<h3 class="grp">${tt(E()[O])}: ${q.length} hint${q.length===1?"":"s"}</h3>
      <div class="cards">${q.map(Q=>je(Q.c,Q.v,L)).join("")||'<p class="muted">No hint names this suspect directly.</p>'}</div>
      <h3 class="grp rest">Other hints</h3>
      <div class="cards dimmed">${ne.map(Q=>je(Q.c,Q.v,L)).join("")}</div>`}function me(){const M=R(),{puzzle:L}=l.current.data,F=b()==="guided"&&!l.progress.solved?I():null,O=new Set(F&&l.coachLevel>=1?F.step.uses??[]:[]);g.innerHTML=`
      <details class="rules"><summary>Rules</summary>
        <ul>
          <li>Put every suspect on one square: one per row, no two in a column.</li>
          <li>One witness lies. Statements (cards with a stamp) can lie; facts never do.</li>
          <li>The culprit is the only suspect in the room with the ${tt(L.loot.item)}.</li>
        </ul>
        <p class="small">${tt(L.instruction)}</p>
      </details>
      ${ce()}
      ${Ee()}
      ${fe(M,O)}
      <p class="keyline"><span class="k k-true">✓ fits</span><span class="k k-false">✕ breaks</span><span class="k k-unknown">○ undecided</span></p>`}const Ge=[{title:"Your job: place every suspect",body:"Each suspect stands on one square of the floor plan. <b>One per row, and never two in the same column.</b> Drag a suspect from the bottom onto a square.",pic:Al([[1,0,0,0],[0,0,1,0],[0,0,0,0],[0,0,0,0]],"rows")},{title:"The cards tell you where",body:"Every card is a hint, like “Pip was south of Sir Bram”. <b>Tap a suspect</b> and their hints jump to the top. Gold squares show where they can still go. Grey ✕ squares are already ruled out.",pic:Al([[0,0,0,0],[0,2,2,0],[0,2,1,2],[0,0,2,0]],"cand")},{title:"One witness lies",body:"Every card with a round circle in the corner is a statement, and <b>exactly one statement is a lie</b>. Cards marked FACT are always true. On <b>easy</b> days we tell you which card lies. On <b>medium</b> days we show the two cards that clash. On <b>hard</b> days you find it yourself.",pic:'<div class="ip-cards"><span class="ip-c ok">✓ Fact</span><span class="ip-c ok">✓ Statement</span><span class="ip-c bad">✕ The lie?</span></div>'},{title:"Where to start",body:"The yellow bar says <b>who to start with</b>. Two cards about one person usually leave a single square, like “Otto was beside a case” and “Otto was in column 2”. Press <b>Show me</b> and the square lights up. Every placement greys out a row and a column, and the bar picks the next person.",pic:'<div class="ip-cards"><span class="ip-c ok">Otto: beside a case</span><span class="ip-c ok">Otto: column 2</span><span class="ip-c">= 1 square</span></div>'},{title:"Finish the case",body:"When everyone is placed, press <b>Point out the lie</b> and tap the card you think is false. Then <b>Solve</b>. The culprit is the only suspect alone in the room with the ◆ (the loot).",pic:'<div class="ip-cards"><span class="ip-c">◆ loot</span><span class="ip-c ok">Solve</span></div>'}];function xe(){if(l.intro!==null){const M=l.intro,L=Ge[M],F=M===Ge.length-1;_.innerHTML=`<div class="scrim" data-action="intro-skip"></div>
        <div class="sheet intro" role="dialog" aria-modal="true" aria-label="How to play">
          <p class="muted">Step ${M+1} of ${Ge.length}</p>
          <h2>${L.title}</h2>
          <div class="ip-pic">${L.pic}</div>
          <p>${L.body}</p>
          <div class="sheet-actions">
            ${M>0?'<button class="btn" data-action="intro-back">Back</button>':""}
            <button class="btn primary" data-action="${F?"intro-skip":"intro-next"}">${F?"Start playing":"Next"}</button>
            ${F?"":'<button class="btn ghost" data-action="intro-skip">Skip</button>'}
          </div>
        </div>`,_.querySelector(".sheet .btn.primary")?.focus();return}if(l.modal==="settings"){const M=l.save.settings,L=(F,O,J)=>`<div class="seg" role="radiogroup">${O.map(([q,ne])=>`<button role="radio" aria-checked="${J===q}" class="${J===q?"on":""}" data-action="set" data-name="${F}" data-value="${q}">${ne}</button>`).join("")}</div>`;_.innerHTML=`<div class="scrim" data-action="close"></div>
        <div class="sheet" role="dialog" aria-modal="true" aria-label="Settings">
          <h2>Settings</h2>
          <div class="setting"><label>Theme</label>${L("theme",[["auto","Auto"],["light","Day"],["dark","Night"]],M.theme)}</div>
          <div class="setting"><label>Help</label>${L("help",[["guided","Guided"],["detective","Detective"]],M.help)}
            <p class="small">Guided: cards react live and the coach talks. Detective: no live feedback, you get ${Is} checks per case. Practice cases are always guided.</p></div>
          <div class="setting"><button class="btn ${l.confirmReset?"danger":""}" data-action="reset-all">${l.confirmReset?"Tap again to erase everything":"Erase progress and streak"}</button></div>
          <div class="sheet-actions"><button class="btn primary" data-action="close">Done</button></div>
        </div>`,_.querySelector(".sheet .btn.primary")?.focus();return}if(l.endOpen&&l.progress.solved){const M=l.current.data,L=M.puzzle.clues.find(ne=>ne.no===M.solution.falseClueNo),F=Number.isInteger(L.params.s)?E()[L.params.s]:null,O=l.save.streak.count,J=l.current.kind==="practice",q=J&&l.lists.practice[l.practiceIdx+1];_.innerHTML=`<div class="scrim" data-action="close-end"></div>
        <div class="sheet end" role="dialog" aria-modal="true" aria-label="Case closed">
          <h2>Case closed</h2>
          <dl class="facts">
            <dt>Culprit</dt><dd><b>${tt(M.solution.thief.name)}</b>, alone in the ${tt(l.model.roomLabel(M.solution.lootRoom))}</dd>
            <dt>The lie</dt><dd>Card ${L.no}: “${tt(Ho(L))}”${F?` (said by ${tt(F)})`:""}</dd>
            <dt>Time</dt><dd>${Fl(l.progress.activeMs)}, ${l.progress.attempts<=1?"first try":l.progress.attempts+" tries"}, ${l.progress.checksUsed} check${l.progress.checksUsed===1?"":"s"}</dd>
            ${J?"":`<dt>Streak</dt><dd><b>${O}</b> day${O===1?"":"s"} (best ${l.save.streak.best})</dd>`}
          </dl>
          <div class="sheet-actions">
            <button class="btn primary" data-action="share">Share</button>
            ${q?'<button class="btn" data-action="practice-next">Next practice case</button>':""}
            ${J&&l.lists.daily?'<button class="btn" data-action="daily">Today’s case</button>':""}
            <button class="btn ghost" data-action="close-end">Back to board</button>
          </div>
        </div>`,_.querySelector(".sheet .btn.primary")?.focus();return}_.innerHTML=""}function ot(){v(),Ce(),me(),xe()}function ht(){Ce(),me()}function ze(){const M=l.holding??l.selected,L=f.querySelector("#sightbar"),F=f.querySelectorAll(".cell[data-r]");if(F.forEach(oe=>oe.classList.remove("sight","sight-origin")),queueMicrotask($),!L)return;if(M===null){L.innerHTML='<span class="muted">Hold a suspect to see who they can see.</span>';return}const O=l.current.data.puzzle.suspects[M],J=Ls(M,O.cast),q=l.hover??l.progress.placement[M],ne=l.holding===null&&l.selected===M&&l.progress.placement[M]&&!P()?'<button class="btn small" data-action="pickup">Pick up</button>':"";if(!J){L.innerHTML=`<span class="sb-name">${tt(O.name)}</span><span class="sb-rule muted">Sees nothing special</span>${ne}`;return}const Q=Ko[J]===O.name?"":` <small>as ${Ko[J]}</small>`;if(L.innerHTML=`<span class="sb-name">${tt(O.name)}${Q}</span><span class="sb-rule">${ph[J]}</span>${ne}`,!q)return;const Z=new Set(mh(l.model,q,J).map(oe=>`${oe.r},${oe.c}`));F.forEach(oe=>{const Me=`${oe.dataset.r},${oe.dataset.c}`;Z.has(Me)&&oe.classList.add("sight"),q.r===Number(oe.dataset.r)&&q.c===Number(oe.dataset.c)&&oe.classList.add("sight-origin")})}function D(){l.revealSig=l.revealSig===Pr(l.progress.placement)?l.revealSig:null,w(),ht()}function xt(M,L){if(P())return;const F=ar(l.model,l.progress.placement,M,L);if(!F.ok){const O=F.reason==="void"?"There is no floor there.":F.reason==="blocked"?"That square is blocked.":F.reason==="row"?`${E()[F.with]} is already in that row.`:`${E()[F.with]} is already in that column.`;S(O),l.selected=M,l.hover=null,Ce(),me();return}A(),l.progress.placement=Go(l.progress.placement,M,L),l.selected=null,l.hover=null,D()}function qe(M){P()||!l.progress.placement[M]||(A(),l.progress.placement=Go(l.progress.placement,M,null),l.selected=null,D())}function et(M){l.selected=l.selected===M?null:M,l.hover=null,Ce(),me()}function Se(){const M=l.progress;if(!Xo(M.placement)||M.liar===null||M.solved)return;A(),M.attempts+=1;const L=ju(l.current.data.solution,M.placement,M.liar);L.solved?(M.solved=!0,M.solvedOn=l.today,l.current.kind==="daily"&&(l.save.streak=yh(l.save.streak,l.today)),l.endOpen=!0,w(),ot()):(w(),S(L.cellsRight?"The board holds, but another card is the lie.":"Not quite: someone is on the wrong square."),me())}function Xe(M,L){M.current=L,M.model=ku(L.data.puzzle),M.ctx={model:M.model,cast:L.data.puzzle.suspects};const F=L.data.puzzle.suspects.length;M.progress=xh(M.save,L.key,F),M.save.cases[L.key]=M.progress,L.lieHelp==="told"&&M.progress.liar===null&&(M.progress.liar=L.data.solution.falseClueNo),M.coach=Dl(L.data.coach,L.data.puzzle.suspects.map(O=>O.name)),M.coachLevel=0,M.coachFor=-1,M.selected=M.holding=null,M.hover=null,M.focusClue=null,M.revealSig=null,M.endOpen=!1,M.liarMode=!1,M.lastTouch=Date.now()}function Te(M){if(!M)return;Xe(l,M);const L=l.lists.practice.findIndex(F=>F.key===M.key);M.kind==="practice"&&L>=0&&(l.practiceIdx=L),w(),ot()}async function Ue(){const M=Eh({date:l.current.date??l.today,difficulty:l.current.data.puzzle.difficulty,ms:l.progress.activeMs,attempts:l.progress.attempts,streak:l.save.streak.count,url:location.href.split("#")[0],practice:l.current.kind==="practice"});try{if(navigator.share){await navigator.share({text:M});return}}catch(L){if(L?.name==="AbortError")return}try{await navigator.clipboard.writeText(M),S("Result copied. Paste it anywhere.")}catch{window.prompt("Copy your result:",M)}}i.addEventListener("click",M=>{const L=M.target,F=L.closest("[data-action]");if(F){const q=F.dataset.action;if(F.hasAttribute("disabled"))return;switch(q){case"daily":l.lists.daily&&Te(l.lists.daily);return;case"practice":{const ne=l.lists.practice;l.current.kind==="practice"&&ne.length>1?Te(ne[(l.practiceIdx+1)%ne.length]):Te(ne[Math.min(l.practiceIdx,ne.length-1)]);return}case"practice-next":Te(l.lists.practice[l.practiceIdx+1]);return;case"settings":l.modal="settings",l.confirmReset=!1,xe();return;case"close":l.modal=null,l.confirmReset=!1,xe();return;case"close-end":l.endOpen=!1,xe();return;case"results":l.endOpen=!0,xe();return;case"share":Ue();return;case"set":{const ne=F.dataset.name,Q=F.dataset.value;ne==="theme"&&(l.save.settings.theme=Q,wl(Q)),ne==="help"&&(l.save.settings.help=Q,l.revealSig=null),w(),xe(),ht();return}case"reset-all":if(!l.confirmReset){l.confirmReset=!0,xe();return}try{e?.removeItem("whodunit-lane:v1")}catch{}location.reload();return;case"intro":l.intro=0,xe();return;case"intro-next":l.intro=Math.min((l.intro??0)+1,Ge.length-1),xe();return;case"intro-back":l.intro=Math.max((l.intro??0)-1,0),xe();return;case"intro-skip":l.intro=null,Mv(e),xe();return;case"lie-mode":l.liarMode=!l.liarMode,l.selected=null,Ce(),me();return;case"mark":{if(P())return;const ne=Number(F.dataset.no);if(l.current.lieHelp==="told")return;A(),l.progress.liar=l.progress.liar===ne?null:ne,w(),me(),Ce();return}case"check":{if(l.progress.checksUsed>=Is)return;l.progress.checksUsed+=1,l.revealSig=Pr(l.progress.placement),w(),me(),Ce(),S(`Check used. ${Is-l.progress.checksUsed} left. Moving a suspect hides the result.`);return}case"reset":if(P())return;A(),l.progress.placement=l.progress.placement.map(()=>null),l.progress.liar=l.current.lieHelp==="told"?l.current.data.solution.falseClueNo:null,l.selected=null,l.revealSig=null,D();return;case"pickup":l.selected!==null&&qe(l.selected);return;case"coach-more":l.coachLevel+=1,Ce(),me();return;case"coach-next":{const ne=l.current.key,Q=I();Q&&(l.save.coachStep[ne]=Q.index+1),w(),Ce();return}case"solve":Se();return}return}const O=L.closest(".cell[data-r]");if(O&&!L.closest(".token")){const q=Number(O.dataset.r),ne=Number(O.dataset.c);if(l.selected!==null)xt(l.selected,{r:q,c:ne});else{const Q=Wo(l.progress.placement,q,ne);Q>=0&&et(Q)}return}const J=L.closest(".card");if(J){const q=Number(J.dataset.no);if(l.liarMode&&!P()){l.current.data.puzzle.clues.find(Q=>Q.no===q)?.statement&&(A(),l.progress.liar=q,l.liarMode=!1,w(),me(),Ce());return}l.focusClue=l.focusClue===q?null:q,me(),Ce()}}),i.addEventListener("keydown",M=>{if(M.key==="Escape"){l.modal?(l.modal=null,xe()):l.endOpen&&(l.endOpen=!1,xe());return}if(M.key!=="Enter"&&M.key!==" ")return;const L=M.target,F=L.closest(".token[data-s]");if(F){M.preventDefault(),et(Number(F.dataset.s));return}L.matches(".cell[data-r], .card")&&(M.preventDefault(),L.click())});let Be=null;const C=(M,L)=>document.elementFromPoint(M,L)?.closest(".cell[data-r]")??null;i.addEventListener("pointerdown",M=>{const L=M.target.closest(".token[data-s]");!L||P()||M.button>0||(M.preventDefault(),Be={s:Number(L.dataset.s),x:M.clientX,y:M.clientY,active:!1,ghost:null,origin:L,over:null},l.holding=Be.s,l.hover=null,ze())}),document.addEventListener("pointermove",M=>{if(!Be){if(M.pointerType==="mouse"&&l.selected!==null){const F=C(M.clientX,M.clientY),O=F?{r:Number(F.dataset.r),c:Number(F.dataset.c)}:null;((O?.r??-1)!==(l.hover?.r??-1)||(O?.c??-1)!==(l.hover?.c??-1))&&(l.hover=O,ze())}return}if(!Be.active&&Math.hypot(M.clientX-Be.x,M.clientY-Be.y)>6){Be.active=!0;const F=Be.origin.cloneNode(!0);F.classList.add("ghost"),F.removeAttribute("tabindex"),document.body.appendChild(F),Be.ghost=F,Be.origin.classList.add("lifted")}if(!Be.active||!Be.ghost)return;Be.ghost.style.transform=`translate(${M.clientX}px, ${M.clientY}px) translate(-50%, -120%)`;const L=C(M.clientX,M.clientY);if(L!==Be.over){if(Be.over?.classList.remove("drop-ok","drop-bad"),Be.over=L,L){const F={r:Number(L.dataset.r),c:Number(L.dataset.c)};L.classList.add(ar(l.model,l.progress.placement,Be.s,F).ok?"drop-ok":"drop-bad"),l.hover=F}else l.hover=null;ze()}});const y=(M,L)=>{if(!Be)return;const F=Be;if(Be=null,F.ghost?.remove(),F.origin.classList.remove("lifted"),F.over?.classList.remove("drop-ok","drop-bad"),l.holding=null,l.hover=null,L){ze();return}if(F.active){const O=C(M.clientX,M.clientY);if(O){xt(F.s,{r:Number(O.dataset.r),c:Number(O.dataset.c)});return}if(document.elementFromPoint(M.clientX,M.clientY)?.closest("#roster, .caseline, .coach")){qe(F.s);return}ze();return}et(F.s)};document.addEventListener("pointerup",M=>y(M,!1)),document.addEventListener("pointercancel",M=>y(M,!0)),ot(),"serviceWorker"in navigator&&navigator.serviceWorker.register(`${t}sw.js`).catch(()=>{}),window.__bd={state:l,tryPlace:xt,solve:Se}}function bu(i){const e=i==="dark"||i==="auto"&&window.matchMedia?.("(prefers-color-scheme: dark)").matches;document.querySelector('meta[name="theme-color"]')?.setAttribute("content",e?"#17101f":"#efe6d7")}function wl(i){i==="auto"?document.documentElement.removeAttribute("data-theme"):document.documentElement.setAttribute("data-theme",i),bu(i)}function xv(i){try{return i?.getItem("whodunit-lane:intro")==="1"}catch{return!1}}function Mv(i){try{i?.setItem("whodunit-lane:intro","1")}catch{}}function Al(i,e){return`<div class="ip-grid">${i.flat().map(t=>t===1?'<i class="ip-s">●</i>':t===2?e==="cand"?'<i class="ip-g"></i>':'<i class="ip-x">✕</i>':"<i></i>").join("")}</div>`}function yv(){try{const i="__bd_probe__";return localStorage.setItem(i,"1"),localStorage.removeItem(i),localStorage}catch{return null}}vv(document.getElementById("root"),yv());
