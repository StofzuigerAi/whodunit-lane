var Iu=Object.defineProperty;var Du=(i,e,t)=>e in i?Iu(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var lt=(i,e,t)=>Du(i,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();async function Nu(i,e){try{const t=await e(`${i}assets.json`);if(!t.ok)return{};const n=await t.json(),s=n&&typeof n=="object"&&n.assets&&typeof n.assets=="object"?n.assets:n,r={};for(const[a,o]of Object.entries(s??{}))o&&typeof o.src=="string"&&(r[a]=o);return r}catch{return{}}}const ko=i=>`vloer.${i.toLowerCase()}`,Pr=i=>`voorwerp.${i}`,Uu={n:0,e:90,s:180,w:270,ne:45,se:135,sw:225,nw:315},Fu=new Set(["not-in-room","not-on-object","row-not","col-not","not-beside-person","kind-empty","subgroup-not-on"]);function Ou(i){const e=i.type,t=Fu.has(e),n=i.params,s=r=>({iconKey:`icoon.pijl.${r}`,glyph:"arrow",angle:Uu[r],negated:t});switch(e){case"west-of":return s("w");case"east-of":return s("e");case"north-of":return s("n");case"south-of":return s("s");case"quad-of":return s(String(n.quad));case"row-is":case"row-not":case"same-row-as":return{iconKey:"icoon.rij",glyph:"row",negated:t};case"col-is":case"col-not":case"same-col-as":case"col-band":return{iconKey:"icoon.kolom",glyph:"col",negated:t};case"corner":return{iconKey:"icoon.hoek",glyph:"corner",negated:t};case"in-room":case"not-in-room":case"in-rooms":case"in-room-class":case"room-count":case"empty-rooms":case"extreme-in-room":case"room-people-count-unique":case"subgroup-in-rooms":case"attr-count-in-room":return{iconKey:"icoon.kamer",glyph:"tile",negated:t};case"on-object":case"not-on-object":case"only-on-kind":case"on-kind-count":case"kind-empty":case"subgroup-not-on":return{iconKey:"icoon.voorwerp",glyph:"tile",negated:t};case"beside-object":case"beside-object-dir":case"beside-kind-count":case"object-in-line":return{iconKey:"icoon.naast.voorwerp",glyph:"tile",negated:t};case"beside-person":case"not-beside-person":return{iconKey:"icoon.naast.persoon",glyph:"tile",negated:t};case"with-persons":case"pair-alone-in-room":return{iconKey:"icoon.samen",glyph:"tile",negated:t};case"alone-in-room":case"victim-alone-with-culprit":case"only-attr-in-room":return{iconKey:"icoon.alleen",glyph:"tile",negated:t};case"line-distance":case"count-beyond":return{iconKey:"icoon.afstand",glyph:"tile",negated:t};default:return{iconKey:"icoon.vraag",glyph:"tile",negated:t}}}const zo=i=>i.text.replace(/\.\s*$/,""),Bu=".",ci=(i,e)=>`${i},${e}`;function ku(i){const e=new Map,t=new Set;for(const n of i.furniture)e.set(ci(n.r,n.c),n.kind),n.blocking&&t.add(ci(n.r,n.c));return{rows:i.rows,cols:i.cols,map:i.map,roomKeys:Object.keys(i.rooms),furniture:e,blocking:t,loot:{r:i.loot.r,c:i.loot.c},lootRoom:i.loot.room,roomOf:(n,s)=>i.map[n]?.[s]??"",isCell:(n,s)=>n>=0&&n<i.rows&&s>=0&&s<i.cols&&i.map[n]?.[s]!==Bu&&i.map[n]?.[s]!==void 0,roomLabel:n=>i.rooms[n]??n,roomClassOf:n=>i.roomClasses?.[n]??null,hasRoomClasses:!!i.roomClasses,_cache:new Map}}const zu={n:[-1,0],s:[1,0],w:[0,-1],e:[0,1]},Rl=[[-1,0],[1,0],[0,-1],[0,1]];function Hu(i,e,t){const n=`nk:${e},${t}`,s=i._cache.get(n);if(s)return s;const r=new Set,a=i.roomOf(e,t);for(const[o,l]of Rl){const u=e+o,c=t+l;if(u<0||u>=i.rows||c<0||c>=i.cols||i.roomOf(u,c)!==a)continue;const h=i.furniture.get(ci(u,c));h&&r.add(h)}return i._cache.set(n,r),r}function Vu(i,e,t){const n=i.roomOf(e,t),s=(u,c)=>u<0||u>=i.rows||c<0||c>=i.cols||i.roomOf(u,c)!==n,r=s(e-1,t),a=s(e+1,t),o=s(e,t-1),l=s(e,t+1);return(r||a)&&(o||l)&&(r&&o||r&&l||a&&o||a&&l)}function Gu(i,e,t){const n=e.r<t.r,s=e.r>t.r,r=e.c>t.c,a=e.c<t.c;return i==="ne"?n&&r:i==="nw"?n&&a:i==="se"?s&&r:s&&a}function Wu({axis:i,k:e,side:t},n,s){return i==="row"?t==="s"?n.r===s.r+e:n.r===s.r-e:t==="e"?n.c===s.c+e:n.c===s.c-e}function Ho(i,e,t){return Math.abs(e.r-t.r)+Math.abs(e.c-t.c)===1&&i.roomOf(e.r,e.c)===i.roomOf(t.r,t.c)}function Xu(i,e,t,n){const[s,r]=zu[n],a=e+s,o=t+r;return a<0||a>=i.rows||o<0||o>=i.cols||i.roomOf(a,o)!==i.roomOf(e,t)?null:i.furniture.get(ci(a,o))??null}function $u(i,e,t,n){let s=0;const r=i.roomOf(e,t);for(const[a,o]of Rl){const l=e+a,u=t+o;l<0||l>=i.rows||u<0||u>=i.cols||i.roomOf(l,u)===r&&i.furniture.get(ci(l,u))===n&&s++}return s}function qu(i,e,t,n,s,r){const a=r?i.roomOf(e,t):"",o=s==="row"?i.cols:i.rows;for(let l=0;l<o;l++){const u=s==="row"?e:l,c=s==="row"?l:t;if(i.furniture.get(ci(u,c))===n&&!(r&&i.roomOf(u,c)!==a))return!0}return!1}const nn=(i,e)=>i.furniture.get(ci(e.r,e.c)),$e=(i,e)=>i.roomOf(e.r,e.c),Yu=i=>Array.from({length:i},(e,t)=>t),ni=i=>i.flatMap((e,t)=>e?[{cell:e,i:t}]:[]),wt=(i,e)=>({deps:t=>[t.params.s],holds:(t,n,s)=>i(t,n[t.params.s],s),needs:e}),mn=i=>({deps:e=>[e.params.s,e.params.t],holds:(e,t,n)=>i(e,t[e.params.s],t[e.params.t],n)}),Xt=(i,e,t)=>({deps:(n,s)=>Yu(s),holds:i,refute:e,needs:t}),Ls=(i,e)=>ni(i).filter(t=>t.i!==e),Cl={"in-room":wt((i,e,{model:t})=>$e(t,e)===i.params.room),"not-in-room":wt((i,e,{model:t})=>$e(t,e)!==i.params.room),"on-object":wt((i,e,{model:t})=>nn(t,e)===i.params.kind),"not-on-object":wt((i,e,{model:t})=>nn(t,e)!==i.params.kind),"beside-object":wt((i,e,{model:t})=>Hu(t,e.r,e.c).has(i.params.kind)),"beside-object-dir":wt((i,e,{model:t})=>Xu(t,e.r,e.c,i.params.dir)===i.params.kind),"beside-kind-count":wt((i,e,{model:t})=>$u(t,e.r,e.c,i.params.kind)===i.params.k),"object-in-line":wt((i,e,{model:t})=>qu(t,e.r,e.c,i.params.kind,i.params.axis,i.params.sameRoom)),corner:wt((i,e,{model:t})=>Vu(t,e.r,e.c)),"row-is":wt((i,e)=>e.r===i.params.k),"row-not":wt((i,e)=>e.r!==i.params.k),"col-is":wt((i,e)=>e.c===i.params.k),"col-not":wt((i,e)=>e.c!==i.params.k),"col-band":wt((i,e)=>e.c>=i.params.cMin&&e.c<=i.params.cMax),"in-rooms":wt((i,e,{model:t})=>i.params.rooms.includes($e(t,e))),"in-room-class":wt((i,e,{model:t})=>t.roomClassOf($e(t,e))===i.params.roomClass,({model:i})=>i.hasRoomClasses),"west-of":mn((i,e,t)=>e.c<t.c),"east-of":mn((i,e,t)=>e.c>t.c),"north-of":mn((i,e,t)=>e.r<t.r),"south-of":mn((i,e,t)=>e.r>t.r),"same-row-as":mn((i,e,t)=>e.r===t.r),"same-col-as":mn((i,e,t)=>e.c===t.c),"beside-person":mn((i,e,t,{model:n})=>Ho(n,e,t)),"not-beside-person":mn((i,e,t,{model:n})=>!Ho(n,e,t)),"quad-of":mn((i,e,t)=>Gu(i.params.quad,e,t)),"line-distance":mn((i,e,t)=>Wu(i.params,e,t)),"with-persons":{deps:i=>[i.params.s,...i.params.targets],holds:(i,e,{model:t})=>{const n=$e(t,e[i.params.s]);return i.params.targets.every(s=>$e(t,e[s])===n)}},"subgroup-not-on":{deps:i=>i.params.targets,holds:(i,e,{model:t})=>i.params.targets.every(n=>nn(t,e[n])!==i.params.kind)},"subgroup-in-rooms":{deps:i=>i.params.targets,holds:(i,e,{model:t})=>i.params.targets.every(n=>i.params.rooms.includes($e(t,e[n])))},"alone-in-room":Xt((i,e,{model:t})=>{const n=$e(t,e[i.params.s]);return e.every((s,r)=>r===i.params.s||$e(t,s)!==n)},(i,e,{model:t})=>{const n=e[i.params.s];return!!n&&Ls(e,i.params.s).some(s=>$e(t,s.cell)===$e(t,n))}),"pair-alone-in-room":Xt((i,e,{model:t})=>{const{s:n,t:s}=i.params,r=$e(t,e[n]);return $e(t,e[s])!==r?!1:e.every((a,o)=>o===n||o===s||$e(t,a)!==r)},(i,e,{model:t})=>{const{s:n,t:s}=i.params,r=e[n],a=e[s];if(r&&a&&$e(t,r)!==$e(t,a))return!0;const o=r??a;return o?ni(e).some(l=>l.i!==n&&l.i!==s&&$e(t,l.cell)===$e(t,o)):!1}),"empty-rooms":Xt((i,e,{model:t})=>t.roomKeys.length-new Set(e.map(n=>$e(t,n))).size===i.params.k,(i,e,{model:t})=>new Set(ni(e).map(n=>$e(t,n.cell))).size>t.roomKeys.length-i.params.k),"on-kind-count":Xt((i,e,{model:t})=>e.filter(n=>nn(t,n)===i.params.kind).length===i.params.k,(i,e,{model:t})=>ni(e).filter(n=>nn(t,n.cell)===i.params.kind).length>i.params.k),"only-on-kind":Xt((i,e,{model:t})=>{const{s:n,kind:s}=i.params;return nn(t,e[n])!==s?!1:e.every((r,a)=>a===n||nn(t,r)!==s)},(i,e,{model:t})=>{const{s:n,kind:s}=i.params,r=e[n];return r&&nn(t,r)!==s?!0:Ls(e,n).some(a=>nn(t,a.cell)===s)}),"kind-empty":Xt((i,e,{model:t})=>e.every(n=>nn(t,n)!==i.params.kind),(i,e,{model:t})=>ni(e).some(n=>nn(t,n.cell)===i.params.kind)),"room-count":Xt((i,e,{model:t})=>e.filter(n=>$e(t,n)===i.params.room).length===i.params.k,(i,e,{model:t})=>ni(e).filter(n=>$e(t,n.cell)===i.params.room).length>i.params.k),"extreme-in-room":Xt((i,e,{model:t})=>{const{s:n,room:s,dir:r}=i.params,a=e[n];return $e(t,a)!==s?!1:e.every((o,l)=>l===n||$e(t,o)!==s?!0:r==="n"?o.r>=a.r:r==="s"?o.r<=a.r:r==="e"?o.c<=a.c:o.c>=a.c)},(i,e,{model:t})=>{const n=e[i.params.s];return!!n&&$e(t,n)!==i.params.room}),"count-beyond":Xt((i,e)=>{const{s:t,dir:n,k:s}=i.params,r=e[t];return e.filter((o,l)=>l===t?!1:n==="n"?o.r<r.r:n==="s"?o.r>r.r:n==="e"?o.c>r.c:o.c<r.c).length===s},(i,e)=>{const{s:t,dir:n,k:s}=i.params,r=e[t];return r?Ls(e,t).filter(({cell:o})=>n==="n"?o.r<r.r:n==="s"?o.r>r.r:n==="e"?o.c>r.c:o.c<r.c).length>s:!1}),"room-people-count-unique":Xt((i,e,{model:t})=>{const n=new Map(t.roomKeys.map(s=>[s,0]));for(const s of e)n.set($e(t,s),(n.get($e(t,s))??0)+1);return new Set(n.values()).size===t.roomKeys.length}),"attr-count-in-room":Xt((i,e,{model:t,cast:n})=>{if(!n)return!1;const{room:s,attr:r,k:a}=i.params;return e.filter((o,l)=>n[l]?.[r.key]===r.value&&$e(t,o)===s).length===a},(i,e,{model:t,cast:n})=>{if(!n)return!1;const{room:s,attr:r,k:a}=i.params;return ni(e).filter(o=>n[o.i]?.[r.key]===r.value&&$e(t,o.cell)===s).length>a},({cast:i})=>!!i),"only-attr-in-room":Xt((i,e,{model:t,cast:n})=>{if(!n)return!1;const{s,room:r,attr:a}=i.params;return n[s]?.[a.key]!==a.value||$e(t,e[s])!==r?!1:e.every((o,l)=>l===s||n[l]?.[a.key]!==a.value||$e(t,o)!==r)},(i,e,{model:t,cast:n})=>{if(!n)return!1;const{s,room:r,attr:a}=i.params;if(n[s]?.[a.key]!==a.value)return!0;const o=e[s];return o&&$e(t,o)!==r?!0:Ls(e,s).some(l=>n[l.i]?.[a.key]===a.value&&$e(t,l.cell)===r)},({cast:i})=>!!i),"victim-alone-with-culprit":Xt((i,e,{model:t})=>{const n=i.params.s,s=$e(t,e[n]);return e.filter((r,a)=>a!==n&&$e(t,r)===s).length===1})};function Pl(i,e,t){const n=Cl[i.type];return!n||n.needs&&!n.needs(t)?"unknown":n.deps(i,e.length).every(r=>e[r])?n.holds(i,e,t)?"true":"false":n.refute&&n.refute(i,e,t)?"false":"unknown"}function Ku(i,e,t){return i.map(n=>Pl(n,e,t))}function ts(i){const e=i.params,t=[];return Number.isInteger(e.s)&&t.push(e.s),Number.isInteger(e.t)&&t.push(e.t),Array.isArray(e.targets)&&t.push(...e.targets),[...new Set(t)]}function cr(i,e,t,n){if(!i.isCell(n.r,n.c))return{ok:!1,reason:"void"};if(i.blocking.has(`${n.r},${n.c}`))return{ok:!1,reason:"blocked"};for(let s=0;s<e.length;s++){const r=e[s];if(!(s===t||!r)){if(r.r===n.r)return{ok:!1,reason:"row",with:s};if(r.c===n.c)return{ok:!1,reason:"col",with:s}}}return{ok:!0}}function Vo(i,e,t){const n=i.slice();return n[e]=t?{r:t.r,c:t.c}:null,n}const Go=(i,e,t)=>i.findIndex(n=>n&&n.r===e&&n.c===t),Wo=i=>i.every(e=>e!==null);function ju(i,e,t){const n=e.length===i.cells.length&&i.cells.every((r,a)=>e[a]&&e[a].r===r.r&&e[a].c===r.c),s=t===i.falseClueNo;return{cellsRight:n,liarRight:s,solved:n&&s}}const Lr=i=>i.map(e=>e?`${e.r}.${e.c}`:"-").join("|");function Zu(i,e){return i.filter(t=>{const n=Cl[t.type];if(!n)return!1;const s=n.deps(t,99);return s.length===1&&s[0]===e})}function Ju(i,e,t,n,s,r){const o=Zu(e,i).filter(c=>c.no!==r.lieNo).filter(c=>!c.statement||!(r.pair??[]).includes(c.no)),l=[],u=new Set;for(let c=0;c<n.rows;c++)for(let h=0;h<n.cols;h++){if(!cr(n,t,i,{r:c,c:h}).ok)continue;const d=t.map(()=>null);d[i]={r:c,c:h};const f=o.filter(m=>Pl(m,d,s)==="false"),g=f.some(m=>!m.statement);(r.hard?!g&&f.length<=1:f.length===0)&&l.push({r:c,c:h})}return o.forEach(c=>u.add(c.no)),{cells:l,cards:[...u].sort((c,h)=>c-h)}}function Qu(i,e){if(i.lieHelp)return i.lieHelp;const t=i.difficulty??e.puzzle.difficulty;return t==="easy"?"told":t==="medium"?"pair":"none"}function Xo(i){const e=i.solution.falseClueNo,t=i.coach?.refutations??[],s=t.find(r=>r.scope==="statement"&&r.clue!==e&&r.outcome==="contradiction"&&(r.cited??[]).includes(e))?.clue??t.find(r=>r.outcome==="contradiction"&&r.clue&&r.clue!==e)?.clue;return Number.isInteger(s)?[Math.min(e,s),Math.max(e,s)]:null}const Ll="data/cases/liar/";async function Il(i,e){try{const t=await i(e);return t.ok?await t.json():null}catch{return null}}function eh(i){return!!i?.puzzle&&Array.isArray(i.puzzle.clues)&&Array.isArray(i.puzzle.suspects)&&Array.isArray(i.solution?.cells)&&Number.isInteger(i.solution?.falseClueNo)}function th(i,e){const t=i.filter(n=>n.date&&!n.practice).sort((n,s)=>n.date.localeCompare(s.date));return t.length?t.find(n=>n.date===e)??[...t].reverse().find(n=>n.date<=e)??t[0]:null}async function nh(i,e){const t=await Il(e,`${i}${Ll}index.json`);return(Array.isArray(t)?t:Array.isArray(t?.cases)?t.cases:[]).filter(s=>s&&typeof s.file=="string")}async function Ir(i,e,t){const n=await Il(e,`${i}${Ll}${t.file}`);return!n||!eh(n)?null:{key:t.file,kind:t.practice?"practice":"daily",date:t.date??null,data:n,lieHelp:Qu(t,n)}}async function ih(i,e,t){const n=await nh(i,e),s=th(n,t),r=s?await Ir(i,e,s):null,a=n.filter(l=>l.practice),o=[];for(const l of a){const u=await Ir(i,e,l);u&&o.push(u)}if(!o.length){const l=await Ir(i,e,{file:"sample.json",practice:!0});l&&o.push(l)}return{daily:r,practice:o}}const sh=["text","line","say","hint","tip","message","step"],rh=["steps","lines","tips","hints","items"];function Is(i){if(typeof i=="string")return i.trim()?{levels:[i.trim()]}:null;if(!i||typeof i!="object")return null;const e=i,t=sh.find(a=>typeof e[a]=="string"&&e[a].trim());if(!t)return null;const n={levels:[String(e[t]).trim()]},s=e.suspect??e.who??e.suspectId,r=e.cell??e.at??e.to;return Number.isInteger(s)&&r&&Number.isInteger(r.r)&&Number.isInteger(r.c)&&(n.suspect=s,n.cell={r:r.r,c:r.c}),n}const $o=i=>i.length===1?`card ${i[0]}`:`cards ${i.join(", ")}`,ah=(i,e)=>i.map(t=>e[t]??`suspect ${t+1}`).join(" and ");function oh(i){return!!i&&typeof i=="object"&&Array.isArray(i.steps)&&i.steps.some(e=>e&&typeof e.technique=="string")}function ch(i,e){const t=[];let n=[];for(const s of i.steps){if(s.technique!=="place"||!s.cell||!Number.isInteger(s.person)){n.push(s);continue}const r=e[s.person]??`suspect ${s.person+1}`,a=[...new Set([...n.flatMap(l=>l.uses??[]),...s.uses??[]])].sort((l,u)=>l-u),o=[];for(const l of n)l.technique==="pair"&&Array.isArray(l.people)?o.push(`${$o(l.uses??[])} together rule squares out for ${ah(l.people.map(u=>u.person),e)}.`):l.technique==="crossing"&&Number.isInteger(l.person)?o.push(`${e[l.person]??"One suspect"} can only stand on a few squares in a line, so no one else can use that line.`):l.technique==="line-person"&&o.push(`In ${l.axis==="r"?"row":"column"} ${(l.index??0)+1} only one suspect still fits.`);o.push(`Cross out the rows and columns already taken: ${r} is left with one square.`),t.push({levels:[a.length?`Where does ${r} go? Read ${$o(a)}.`:`Where does ${r} go? Look at the cards that name ${r}.`,o.join(" "),`Put ${r} on row ${s.cell.r+1}, column ${s.cell.c+1}.`],suspect:s.person,cell:{r:s.cell.r,c:s.cell.c},uses:a}),n=[]}return t}function Dl(i,e=[]){if(i==null)return[];if(oh(i))return ch(i,e);if(Array.isArray(i))return i.map(Is).filter(t=>!!t);if(typeof i=="string")return Is(i)?[Is(i)]:[];if(typeof i=="object"){const t=i;for(const s of rh)if(Array.isArray(t[s]))return Dl(t[s],e);const n=Is(t);return n?[n]:[]}return[]}function lh(i,e,t){for(let n=0;n<i.length;n++){const s=i[n],r=s.suspect!==void 0&&s.cell!==void 0;if(!(r?!!e[s.suspect]&&e[s.suspect].r===s.cell.r&&e[s.suspect].c===s.cell.c:n<t))return{step:s,index:n,total:i.length,manual:!r}}return null}function uh(i){const e=i.placement.filter(Boolean).length,t=i.placement.length,n=i.verdicts.flatMap((s,r)=>s==="false"?[r]:[]);if(e===0){const s=i.clues.find(r=>(r.type==="col-is"||r.type==="row-is")&&Number.isInteger(r.params.s));return s?`Try card ${s.no}: put ${i.suspectNames[s.params.s]} in ${s.type==="col-is"?"column":"row"} ${s.params.k+1}. One card lies, so this is only a first guess.`:"Start with any card that names a spot, drag that suspect onto the board, and watch the cards react."}if(n.length>1&&i.liar===null)return`${n.length} cards are crossed out. Only one card can be a lie, so at least one suspect is on the wrong square. Move the suspect named on the most crossed-out cards.`;if(n.length===1&&i.liar===null){const s=i.clues[n[0]];return e===t?`Only card ${s.no} is crossed out. If everything else fits, that card is the lie: stamp it.`:`Card ${s.no} is crossed out. It is either the lie or a sign that someone stands on the wrong square. Keep placing and see if it stays alone.`}if(n.length>0&&i.liar!==null)return"A crossed-out card besides your stamped lie means a suspect is on the wrong square. Move someone named on that card.";if(e<t){const s=i.placement.findIndex(r=>!r);return`${i.suspectNames[s]} is still off the board. Look for a card that mentions ${i.suspectNames[s]} and use the row and column rule to narrow the spots.`}return i.liar===null?"Everyone is placed and nothing is crossed out. One witness still lied: stamp the card you think is the lie.":"Looks complete. Press Solve to file the case."}const qo=[[-1,0],[1,0],[0,-1],[0,1]],hh=[[-1,-1],[-1,1],[1,-1],[1,1]],dh={bram:{dirs:qo,throughWalls:!1},mina:{dirs:qo,throughWalls:!0},rue:{dirs:hh,throughWalls:!1}},fh=["bram","mina","rue"],Yo={bram:"Sir Bram",mina:"Mina",rue:"Rue"},ph={bram:"Sees in straight lines",mina:"Sees through walls",rue:"Sees only diagonally"};function mh(i,e,t){const n=dh[t],s=i.roomOf(e.r,e.c),r=[];for(const[a,o]of n.dirs){let l=e.r+a,u=e.c+o;for(;i.isCell(l,u)&&!(!n.throughWalls&&i.roomOf(l,u)!==s||(r.push({r:l,c:u}),i.blocking.has(`${l},${u}`)));)l+=a,u+=o}return r}const Ds=(i,e)=>e??fh[i]??null,Nl="whodunit-lane:v1",Ns=3,ns=()=>({v:1,settings:{theme:"auto",help:"guided"},streak:{count:0,best:0,lastDate:null},cases:{},coachStep:{}});function gh(i){if(!i)return ns();try{const e=i.getItem(Nl);if(!e)return ns();const t=JSON.parse(e);if(!t||t.v!==1)return ns();const n=ns();return{v:1,settings:{...n.settings,...t.settings??{}},streak:{...n.streak,...t.streak??{}},cases:t.cases??{},coachStep:t.coachStep??{}}}catch{return ns()}}function _h(i,e){if(!i)return!1;try{return i.setItem(Nl,JSON.stringify(e)),!0}catch{return!1}}const vh=i=>({placement:Array.from({length:i},()=>null),liar:null,checksUsed:0,attempts:0,activeMs:0,solved:!1});function xh(i,e,t){const n=i.cases[e];return!n||n.placement.length!==t?vh(t):n}function Ul(i){const[e,t,n]=i.split("-").map(Number),s=new Date(Date.UTC(e,t-1,n));return s.setUTCDate(s.getUTCDate()-1),s.toISOString().slice(0,10)}function Mh(i=new Date){const e=t=>String(t).padStart(2,"0");return`${i.getFullYear()}-${e(i.getMonth()+1)}-${e(i.getDate())}`}function yh(i,e){if(i.lastDate===e)return i;const t=i.lastDate===Ul(e)?i.count+1:1;return{count:t,best:Math.max(i.best,t),lastDate:e}}function Sh(i,e){return i.lastDate&&(i.lastDate===e||i.lastDate===Ul(e))?i.count:0}function Fl(i){const e=Math.max(0,Math.round(i/1e3)),t=Math.floor(e/60),n=e%60;return`${t}:${String(n).padStart(2,"0")}`}function Eh(i){const e=[`Whodunit Lane ${i.practice?"practice case":i.date}`,`Case solved in ${Fl(i.ms)} (${i.difficulty}), ${i.attempts<=1?"first try":`${i.attempts} tries`}.`];return!i.practice&&i.streak>0&&e.push(`Streak: ${i.streak} day${i.streak===1?"":"s"}`),e.push(i.url),e.join(`
`)}const Ol=i=>i.replace(/[&<>"]/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[e]);function Th(i){const e='stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"';let t="";switch(i.glyph){case"arrow":t=`<g transform="rotate(${i.angle??0} 20 20)"><path d="M20 33V8M10 17l10-10 10 10" ${e}/></g>`;break;case"row":t=[0,1,2,3,4].map(s=>`<rect x="${3+s*7.4}" y="15" width="6" height="10" rx="1.5" ${s===2?'fill="currentColor"':'fill="none" stroke="currentColor" stroke-width="2"'}/>`).join("");break;case"col":t=[0,1,2,3,4].map(s=>`<rect x="15" y="${3+s*7.4}" width="10" height="6" rx="1.5" ${s===2?'fill="currentColor"':'fill="none" stroke="currentColor" stroke-width="2"'}/>`).join("");break;case"corner":t=`<path d="M8 32V8h24" ${e}/><circle cx="15" cy="15" r="3.5" fill="currentColor"/>`;break;default:{const s='stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"',r=(l,u,c=4.5)=>`<circle cx="${l}" cy="${u}" r="${c}" fill="currentColor"/>`,a=(l,u,c,h)=>`<rect x="${l}" y="${u}" width="${c}" height="${h}" rx="4" fill="none" ${s}/>`;t={"icoon.kamer":`<path d="M6 34V9h28v25M6 34h9M25 34h9" ${s} fill="none"/>${r(20,21)}`,"icoon.voorwerp":`${a(7,12,26,20)}${r(20,22)}`,"icoon.naast.voorwerp":`${a(4,12,15,16)}${r(29,20)}`,"icoon.naast.persoon":`${r(12,20,5.5)}${r(28,20,5.5)}`,"icoon.samen":`${r(15,20,6.5)}${r(25,20,6.5)}`,"icoon.alleen":`${a(5,5,30,30)}${r(20,20,6)}`,"icoon.afstand":`${r(7,20,4)}${r(33,20,4)}<path d="M13 20h14M16 16l-4 4 4 4M24 16l4 4-4 4" ${s} fill="none"/>`}[i.iconKey]??`<circle cx="20" cy="20" r="14" fill="none" ${s}/><path d="M15 16a5 5 0 1 1 7 4.5c-1.5.8-2 1.8-2 3.5" ${s} fill="none"/>${r(20,29,1.8)}`}}const n=i.negated?'<path d="M6 34L34 6" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" opacity=".9"/><path d="M8.5 36.5L36.5 8.5" stroke="var(--card-bg)" stroke-width="1.5" stroke-linecap="round"/>':"";return`<svg viewBox="0 0 40 40" width="38" height="38" aria-hidden="true" focusable="false" data-key="${Ol(i.iconKey)}">${t}${n}</svg>`}function bh(i,e){const t=e[i.iconKey];if(t){const n=i.negated?'<span class="neg" aria-hidden="true"></span>':"";return`<span class="img"><img src="${Ol(t.src)}" alt="" width="38" height="38" draggable="false">${n}</span>`}return Th(i)}/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const fo="178",wh=0,Ko=1,Ah=2,Bl=1,kl=2,Rn=3,Nn=0,Ct=1,_n=2,Wn=0,Di=1,jo=2,Zo=3,Jo=4,Rh=5,ri=100,Ch=101,Ph=102,Lh=103,Ih=104,Dh=200,Nh=201,Uh=202,Fh=203,xa=204,Ma=205,Oh=206,Bh=207,kh=208,zh=209,Hh=210,Vh=211,Gh=212,Wh=213,Xh=214,ya=0,Sa=1,Ea=2,Oi=3,Ta=4,ba=5,wa=6,Aa=7,zl=0,$h=1,qh=2,Xn=0,Yh=1,Kh=2,jh=3,Ra=4,Zh=5,Jh=6,Qh=7,Qo="attached",ed="detached",Hl=300,Bi=301,ki=302,Ca=303,Pa=304,Tr=306,zi=1e3,Gn=1001,vr=1002,Ft=1003,Vl=1004,fs=1005,Yt=1006,lr=1007,Pn=1008,xn=1009,Gl=1010,Wl=1011,vs=1012,po=1013,li=1014,un=1015,ws=1016,mo=1017,go=1018,xs=1020,Xl=35902,$l=1021,ql=1022,en=1023,Ms=1026,ys=1027,_o=1028,vo=1029,Yl=1030,xo=1031,Mo=1033,ur=33776,hr=33777,dr=33778,fr=33779,La=35840,Ia=35841,Da=35842,Na=35843,Ua=36196,Fa=37492,Oa=37496,Ba=37808,ka=37809,za=37810,Ha=37811,Va=37812,Ga=37813,Wa=37814,Xa=37815,$a=37816,qa=37817,Ya=37818,Ka=37819,ja=37820,Za=37821,pr=36492,Ja=36494,Qa=36495,Kl=36283,eo=36284,to=36285,no=36286,Ss=2300,Es=2301,Dr=2302,ec=2400,tc=2401,nc=2402,td=2500,nd=0,jl=1,io=2,id=3200,sd=3201,Zl=0,rd=1,Vn="",yt="srgb",Bt="srgb-linear",xr="linear",at="srgb",pi=7680,ic=519,ad=512,od=513,cd=514,Jl=515,ld=516,ud=517,hd=518,dd=519,so=35044,sc="300 es",Ln=2e3,Mr=2001;class Yi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const s=n[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const At=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let rc=1234567;const ms=Math.PI/180,Hi=180/Math.PI;function hn(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(At[i&255]+At[i>>8&255]+At[i>>16&255]+At[i>>24&255]+"-"+At[e&255]+At[e>>8&255]+"-"+At[e>>16&15|64]+At[e>>24&255]+"-"+At[t&63|128]+At[t>>8&255]+"-"+At[t>>16&255]+At[t>>24&255]+At[n&255]+At[n>>8&255]+At[n>>16&255]+At[n>>24&255]).toLowerCase()}function ke(i,e,t){return Math.max(e,Math.min(t,i))}function yo(i,e){return(i%e+e)%e}function fd(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function pd(i,e,t){return i!==e?(t-i)/(e-i):0}function gs(i,e,t){return(1-t)*i+t*e}function md(i,e,t,n){return gs(i,e,1-Math.exp(-t*n))}function gd(i,e=1){return e-Math.abs(yo(i,e*2)-e)}function _d(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function vd(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function xd(i,e){return i+Math.floor(Math.random()*(e-i+1))}function Md(i,e){return i+Math.random()*(e-i)}function yd(i){return i*(.5-Math.random())}function Sd(i){i!==void 0&&(rc=i);let e=rc+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Ed(i){return i*ms}function Td(i){return i*Hi}function bd(i){return(i&i-1)===0&&i!==0}function wd(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Ad(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Rd(i,e,t,n,s){const r=Math.cos,a=Math.sin,o=r(t/2),l=a(t/2),u=r((e+n)/2),c=a((e+n)/2),h=r((e-n)/2),d=a((e-n)/2),f=r((n-e)/2),g=a((n-e)/2);switch(s){case"XYX":i.set(o*c,l*h,l*d,o*u);break;case"YZY":i.set(l*d,o*c,l*h,o*u);break;case"ZXZ":i.set(l*h,l*d,o*c,o*u);break;case"XZX":i.set(o*c,l*g,l*f,o*u);break;case"YXY":i.set(l*f,o*c,l*g,o*u);break;case"ZYZ":i.set(l*g,l*f,o*c,o*u);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function cn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function nt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Cd={DEG2RAD:ms,RAD2DEG:Hi,generateUUID:hn,clamp:ke,euclideanModulo:yo,mapLinear:fd,inverseLerp:pd,lerp:gs,damp:md,pingpong:gd,smoothstep:_d,smootherstep:vd,randInt:xd,randFloat:Md,randFloatSpread:yd,seededRandom:Sd,degToRad:Ed,radToDeg:Td,isPowerOfTwo:bd,ceilPowerOfTwo:wd,floorPowerOfTwo:Ad,setQuaternionFromProperEuler:Rd,normalize:nt,denormalize:cn};class De{constructor(e=0,t=0){De.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=ke(this.x,e.x,t.x),this.y=ke(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=ke(this.x,e,t),this.y=ke(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ke(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(ke(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class qn{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let l=n[s+0],u=n[s+1],c=n[s+2],h=n[s+3];const d=r[a+0],f=r[a+1],g=r[a+2],_=r[a+3];if(o===0){e[t+0]=l,e[t+1]=u,e[t+2]=c,e[t+3]=h;return}if(o===1){e[t+0]=d,e[t+1]=f,e[t+2]=g,e[t+3]=_;return}if(h!==_||l!==d||u!==f||c!==g){let m=1-o;const p=l*d+u*f+c*g+h*_,S=p>=0?1:-1,b=1-p*p;if(b>Number.EPSILON){const L=Math.sqrt(b),R=Math.atan2(L,p*S);m=Math.sin(m*R)/L,o=Math.sin(o*R)/L}const M=o*S;if(l=l*m+d*M,u=u*m+f*M,c=c*m+g*M,h=h*m+_*M,m===1-o){const L=1/Math.sqrt(l*l+u*u+c*c+h*h);l*=L,u*=L,c*=L,h*=L}}e[t]=l,e[t+1]=u,e[t+2]=c,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,s,r,a){const o=n[s],l=n[s+1],u=n[s+2],c=n[s+3],h=r[a],d=r[a+1],f=r[a+2],g=r[a+3];return e[t]=o*g+c*h+l*f-u*d,e[t+1]=l*g+c*d+u*h-o*f,e[t+2]=u*g+c*f+o*d-l*h,e[t+3]=c*g-o*h-l*d-u*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,u=o(n/2),c=o(s/2),h=o(r/2),d=l(n/2),f=l(s/2),g=l(r/2);switch(a){case"XYZ":this._x=d*c*h+u*f*g,this._y=u*f*h-d*c*g,this._z=u*c*g+d*f*h,this._w=u*c*h-d*f*g;break;case"YXZ":this._x=d*c*h+u*f*g,this._y=u*f*h-d*c*g,this._z=u*c*g-d*f*h,this._w=u*c*h+d*f*g;break;case"ZXY":this._x=d*c*h-u*f*g,this._y=u*f*h+d*c*g,this._z=u*c*g+d*f*h,this._w=u*c*h-d*f*g;break;case"ZYX":this._x=d*c*h-u*f*g,this._y=u*f*h+d*c*g,this._z=u*c*g-d*f*h,this._w=u*c*h+d*f*g;break;case"YZX":this._x=d*c*h+u*f*g,this._y=u*f*h+d*c*g,this._z=u*c*g-d*f*h,this._w=u*c*h-d*f*g;break;case"XZY":this._x=d*c*h-u*f*g,this._y=u*f*h-d*c*g,this._z=u*c*g+d*f*h,this._w=u*c*h+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],u=t[2],c=t[6],h=t[10],d=n+o+h;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(c-l)*f,this._y=(r-u)*f,this._z=(a-s)*f}else if(n>o&&n>h){const f=2*Math.sqrt(1+n-o-h);this._w=(c-l)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+u)/f}else if(o>h){const f=2*Math.sqrt(1+o-n-h);this._w=(r-u)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(l+c)/f}else{const f=2*Math.sqrt(1+h-n-o);this._w=(a-s)/f,this._x=(r+u)/f,this._y=(l+c)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ke(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,u=t._z,c=t._w;return this._x=n*c+a*o+s*u-r*l,this._y=s*c+a*l+r*o-n*u,this._z=r*c+a*u+n*l-s*o,this._w=a*c-n*o-s*l-r*u,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,s=this._y,r=this._z,a=this._w;let o=a*e._w+n*e._x+s*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const f=1-t;return this._w=f*a+t*this._w,this._x=f*n+t*this._x,this._y=f*s+t*this._y,this._z=f*r+t*this._z,this.normalize(),this}const u=Math.sqrt(l),c=Math.atan2(u,o),h=Math.sin((1-t)*c)/u,d=Math.sin(t*c)/u;return this._w=a*h+this._w*d,this._x=n*h+this._x*d,this._y=s*h+this._y*d,this._z=r*h+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class U{constructor(e=0,t=0,n=0){U.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(ac.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(ac.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,u=2*(a*s-o*n),c=2*(o*t-r*s),h=2*(r*n-a*t);return this.x=t+l*u+a*h-o*c,this.y=n+l*c+o*u-r*h,this.z=s+l*h+r*c-a*u,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=ke(this.x,e.x,t.x),this.y=ke(this.y,e.y,t.y),this.z=ke(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=ke(this.x,e,t),this.y=ke(this.y,e,t),this.z=ke(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ke(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Nr.copy(this).projectOnVector(e),this.sub(Nr)}reflect(e){return this.sub(Nr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(ke(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Nr=new U,ac=new qn;class Ue{constructor(e,t,n,s,r,a,o,l,u){Ue.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,u)}set(e,t,n,s,r,a,o,l,u){const c=this.elements;return c[0]=e,c[1]=s,c[2]=o,c[3]=t,c[4]=r,c[5]=l,c[6]=n,c[7]=a,c[8]=u,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],l=n[6],u=n[1],c=n[4],h=n[7],d=n[2],f=n[5],g=n[8],_=s[0],m=s[3],p=s[6],S=s[1],b=s[4],M=s[7],L=s[2],R=s[5],w=s[8];return r[0]=a*_+o*S+l*L,r[3]=a*m+o*b+l*R,r[6]=a*p+o*M+l*w,r[1]=u*_+c*S+h*L,r[4]=u*m+c*b+h*R,r[7]=u*p+c*M+h*w,r[2]=d*_+f*S+g*L,r[5]=d*m+f*b+g*R,r[8]=d*p+f*M+g*w,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],u=e[7],c=e[8];return t*a*c-t*o*u-n*r*c+n*o*l+s*r*u-s*a*l}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],u=e[7],c=e[8],h=c*a-o*u,d=o*l-c*r,f=u*r-a*l,g=t*h+n*d+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=h*_,e[1]=(s*u-c*n)*_,e[2]=(o*n-s*a)*_,e[3]=d*_,e[4]=(c*t-s*l)*_,e[5]=(s*r-o*t)*_,e[6]=f*_,e[7]=(n*l-u*t)*_,e[8]=(a*t-n*r)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){const l=Math.cos(r),u=Math.sin(r);return this.set(n*l,n*u,-n*(l*a+u*o)+a+e,-s*u,s*l,-s*(-u*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Ur.makeScale(e,t)),this}rotate(e){return this.premultiply(Ur.makeRotation(-e)),this}translate(e,t){return this.premultiply(Ur.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Ur=new Ue;function Ql(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Ts(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Pd(){const i=Ts("canvas");return i.style.display="block",i}const oc={};function Ni(i){i in oc||(oc[i]=!0,console.warn(i))}function Ld(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}function Id(i){const e=i.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function Dd(i){const e=i.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const cc=new Ue().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),lc=new Ue().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Nd(){const i={enabled:!0,workingColorSpace:Bt,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===at&&(s.r=Dn(s.r),s.g=Dn(s.g),s.b=Dn(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===at&&(s.r=Ui(s.r),s.g=Ui(s.g),s.b=Ui(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Vn?xr:this.spaces[s].transfer},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Ni("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Ni("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Bt]:{primaries:e,whitePoint:n,transfer:xr,toXYZ:cc,fromXYZ:lc,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:yt},outputColorSpaceConfig:{drawingBufferColorSpace:yt}},[yt]:{primaries:e,whitePoint:n,transfer:at,toXYZ:cc,fromXYZ:lc,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:yt}}}),i}const qe=Nd();function Dn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Ui(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let mi;class Ud{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{mi===void 0&&(mi=Ts("canvas")),mi.width=e.width,mi.height=e.height;const s=mi.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=mi}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Ts("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Dn(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Dn(t[n]/255)*255):t[n]=Dn(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Fd=0;class So{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Fd++}),this.uuid=hn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Fr(s[a].image)):r.push(Fr(s[a]))}else r=Fr(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function Fr(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Ud.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Od=0;const Or=new U;class bt extends Yi{constructor(e=bt.DEFAULT_IMAGE,t=bt.DEFAULT_MAPPING,n=Gn,s=Gn,r=Yt,a=Pn,o=en,l=xn,u=bt.DEFAULT_ANISOTROPY,c=Vn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Od++}),this.uuid=hn(),this.name="",this.source=new So(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=u,this.format=o,this.internalFormat=null,this.type=l,this.offset=new De(0,0),this.repeat=new De(1,1),this.center=new De(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ue,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=c,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Or).x}get height(){return this.source.getSize(Or).y}get depth(){return this.source.getSize(Or).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Hl)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case zi:e.x=e.x-Math.floor(e.x);break;case Gn:e.x=e.x<0?0:1;break;case vr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case zi:e.y=e.y-Math.floor(e.y);break;case Gn:e.y=e.y<0?0:1;break;case vr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}bt.DEFAULT_IMAGE=null;bt.DEFAULT_MAPPING=Hl;bt.DEFAULT_ANISOTROPY=1;class Qe{constructor(e=0,t=0,n=0,s=1){Qe.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const l=e.elements,u=l[0],c=l[4],h=l[8],d=l[1],f=l[5],g=l[9],_=l[2],m=l[6],p=l[10];if(Math.abs(c-d)<.01&&Math.abs(h-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(c+d)<.1&&Math.abs(h+_)<.1&&Math.abs(g+m)<.1&&Math.abs(u+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const b=(u+1)/2,M=(f+1)/2,L=(p+1)/2,R=(c+d)/4,w=(h+_)/4,A=(g+m)/4;return b>M&&b>L?b<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(b),s=R/n,r=w/n):M>L?M<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(M),n=R/s,r=A/s):L<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(L),n=w/r,s=A/r),this.set(n,s,r,t),this}let S=Math.sqrt((m-g)*(m-g)+(h-_)*(h-_)+(d-c)*(d-c));return Math.abs(S)<.001&&(S=1),this.x=(m-g)/S,this.y=(h-_)/S,this.z=(d-c)/S,this.w=Math.acos((u+f+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=ke(this.x,e.x,t.x),this.y=ke(this.y,e.y,t.y),this.z=ke(this.z,e.z,t.z),this.w=ke(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=ke(this.x,e,t),this.y=ke(this.y,e,t),this.z=ke(this.z,e,t),this.w=ke(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ke(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Bd extends Yi{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Yt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Qe(0,0,e,t),this.scissorTest=!1,this.viewport=new Qe(0,0,e,t);const s={width:e,height:t,depth:n.depth},r=new bt(s);this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:Yt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new So(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ui extends Bd{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class eu extends bt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Ft,this.minFilter=Ft,this.wrapR=Gn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class kd extends bt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Ft,this.minFilter=Ft,this.wrapR=Gn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class dn{constructor(e=new U(1/0,1/0,1/0),t=new U(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(sn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(sn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=sn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,sn):sn.fromBufferAttribute(r,a),sn.applyMatrix4(e.matrixWorld),this.expandByPoint(sn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Us.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Us.copy(n.boundingBox)),Us.applyMatrix4(e.matrixWorld),this.union(Us)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,sn),sn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(is),Fs.subVectors(this.max,is),gi.subVectors(e.a,is),_i.subVectors(e.b,is),vi.subVectors(e.c,is),Un.subVectors(_i,gi),Fn.subVectors(vi,_i),Kn.subVectors(gi,vi);let t=[0,-Un.z,Un.y,0,-Fn.z,Fn.y,0,-Kn.z,Kn.y,Un.z,0,-Un.x,Fn.z,0,-Fn.x,Kn.z,0,-Kn.x,-Un.y,Un.x,0,-Fn.y,Fn.x,0,-Kn.y,Kn.x,0];return!Br(t,gi,_i,vi,Fs)||(t=[1,0,0,0,1,0,0,0,1],!Br(t,gi,_i,vi,Fs))?!1:(Os.crossVectors(Un,Fn),t=[Os.x,Os.y,Os.z],Br(t,gi,_i,vi,Fs))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,sn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(sn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Sn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Sn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Sn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Sn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Sn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Sn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Sn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Sn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Sn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Sn=[new U,new U,new U,new U,new U,new U,new U,new U],sn=new U,Us=new dn,gi=new U,_i=new U,vi=new U,Un=new U,Fn=new U,Kn=new U,is=new U,Fs=new U,Os=new U,jn=new U;function Br(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){jn.fromArray(i,r);const o=s.x*Math.abs(jn.x)+s.y*Math.abs(jn.y)+s.z*Math.abs(jn.z),l=e.dot(jn),u=t.dot(jn),c=n.dot(jn);if(Math.max(-Math.max(l,u,c),Math.min(l,u,c))>o)return!1}return!0}const zd=new dn,ss=new U,kr=new U;class yn{constructor(e=new U,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):zd.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ss.subVectors(e,this.center);const t=ss.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(ss,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(kr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ss.copy(e.center).add(kr)),this.expandByPoint(ss.copy(e.center).sub(kr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const En=new U,zr=new U,Bs=new U,On=new U,Hr=new U,ks=new U,Vr=new U;class br{constructor(e=new U,t=new U(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,En)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=En.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(En.copy(this.origin).addScaledVector(this.direction,t),En.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){zr.copy(e).add(t).multiplyScalar(.5),Bs.copy(t).sub(e).normalize(),On.copy(this.origin).sub(zr);const r=e.distanceTo(t)*.5,a=-this.direction.dot(Bs),o=On.dot(this.direction),l=-On.dot(Bs),u=On.lengthSq(),c=Math.abs(1-a*a);let h,d,f,g;if(c>0)if(h=a*l-o,d=a*o-l,g=r*c,h>=0)if(d>=-g)if(d<=g){const _=1/c;h*=_,d*=_,f=h*(h+a*d+2*o)+d*(a*h+d+2*l)+u}else d=r,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*l)+u;else d=-r,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*l)+u;else d<=-g?(h=Math.max(0,-(-a*r+o)),d=h>0?-r:Math.min(Math.max(-r,-l),r),f=-h*h+d*(d+2*l)+u):d<=g?(h=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+u):(h=Math.max(0,-(a*r+o)),d=h>0?r:Math.min(Math.max(-r,-l),r),f=-h*h+d*(d+2*l)+u);else d=a>0?-r:r,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*l)+u;return n&&n.copy(this.origin).addScaledVector(this.direction,h),s&&s.copy(zr).addScaledVector(Bs,d),f}intersectSphere(e,t){En.subVectors(e.center,this.origin);const n=En.dot(this.direction),s=En.dot(En)-n*n,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,l;const u=1/this.direction.x,c=1/this.direction.y,h=1/this.direction.z,d=this.origin;return u>=0?(n=(e.min.x-d.x)*u,s=(e.max.x-d.x)*u):(n=(e.max.x-d.x)*u,s=(e.min.x-d.x)*u),c>=0?(r=(e.min.y-d.y)*c,a=(e.max.y-d.y)*c):(r=(e.max.y-d.y)*c,a=(e.min.y-d.y)*c),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),h>=0?(o=(e.min.z-d.z)*h,l=(e.max.z-d.z)*h):(o=(e.max.z-d.z)*h,l=(e.min.z-d.z)*h),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,En)!==null}intersectTriangle(e,t,n,s,r){Hr.subVectors(t,e),ks.subVectors(n,e),Vr.crossVectors(Hr,ks);let a=this.direction.dot(Vr),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;On.subVectors(this.origin,e);const l=o*this.direction.dot(ks.crossVectors(On,ks));if(l<0)return null;const u=o*this.direction.dot(Hr.cross(On));if(u<0||l+u>a)return null;const c=-o*On.dot(Vr);return c<0?null:this.at(c/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Fe{constructor(e,t,n,s,r,a,o,l,u,c,h,d,f,g,_,m){Fe.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,u,c,h,d,f,g,_,m)}set(e,t,n,s,r,a,o,l,u,c,h,d,f,g,_,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=l,p[2]=u,p[6]=c,p[10]=h,p[14]=d,p[3]=f,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Fe().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,s=1/xi.setFromMatrixColumn(e,0).length(),r=1/xi.setFromMatrixColumn(e,1).length(),a=1/xi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),u=Math.sin(s),c=Math.cos(r),h=Math.sin(r);if(e.order==="XYZ"){const d=a*c,f=a*h,g=o*c,_=o*h;t[0]=l*c,t[4]=-l*h,t[8]=u,t[1]=f+g*u,t[5]=d-_*u,t[9]=-o*l,t[2]=_-d*u,t[6]=g+f*u,t[10]=a*l}else if(e.order==="YXZ"){const d=l*c,f=l*h,g=u*c,_=u*h;t[0]=d+_*o,t[4]=g*o-f,t[8]=a*u,t[1]=a*h,t[5]=a*c,t[9]=-o,t[2]=f*o-g,t[6]=_+d*o,t[10]=a*l}else if(e.order==="ZXY"){const d=l*c,f=l*h,g=u*c,_=u*h;t[0]=d-_*o,t[4]=-a*h,t[8]=g+f*o,t[1]=f+g*o,t[5]=a*c,t[9]=_-d*o,t[2]=-a*u,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const d=a*c,f=a*h,g=o*c,_=o*h;t[0]=l*c,t[4]=g*u-f,t[8]=d*u+_,t[1]=l*h,t[5]=_*u+d,t[9]=f*u-g,t[2]=-u,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const d=a*l,f=a*u,g=o*l,_=o*u;t[0]=l*c,t[4]=_-d*h,t[8]=g*h+f,t[1]=h,t[5]=a*c,t[9]=-o*c,t[2]=-u*c,t[6]=f*h+g,t[10]=d-_*h}else if(e.order==="XZY"){const d=a*l,f=a*u,g=o*l,_=o*u;t[0]=l*c,t[4]=-h,t[8]=u*c,t[1]=d*h+_,t[5]=a*c,t[9]=f*h-g,t[2]=g*h-f,t[6]=o*c,t[10]=_*h+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Hd,e,Vd)}lookAt(e,t,n){const s=this.elements;return $t.subVectors(e,t),$t.lengthSq()===0&&($t.z=1),$t.normalize(),Bn.crossVectors(n,$t),Bn.lengthSq()===0&&(Math.abs(n.z)===1?$t.x+=1e-4:$t.z+=1e-4,$t.normalize(),Bn.crossVectors(n,$t)),Bn.normalize(),zs.crossVectors($t,Bn),s[0]=Bn.x,s[4]=zs.x,s[8]=$t.x,s[1]=Bn.y,s[5]=zs.y,s[9]=$t.y,s[2]=Bn.z,s[6]=zs.z,s[10]=$t.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],l=n[8],u=n[12],c=n[1],h=n[5],d=n[9],f=n[13],g=n[2],_=n[6],m=n[10],p=n[14],S=n[3],b=n[7],M=n[11],L=n[15],R=s[0],w=s[4],A=s[8],y=s[12],x=s[1],I=s[5],z=s[9],B=s[13],Y=s[2],Z=s[6],K=s[10],te=s[14],$=s[3],he=s[7],_e=s[11],Te=s[15];return r[0]=a*R+o*x+l*Y+u*$,r[4]=a*w+o*I+l*Z+u*he,r[8]=a*A+o*z+l*K+u*_e,r[12]=a*y+o*B+l*te+u*Te,r[1]=c*R+h*x+d*Y+f*$,r[5]=c*w+h*I+d*Z+f*he,r[9]=c*A+h*z+d*K+f*_e,r[13]=c*y+h*B+d*te+f*Te,r[2]=g*R+_*x+m*Y+p*$,r[6]=g*w+_*I+m*Z+p*he,r[10]=g*A+_*z+m*K+p*_e,r[14]=g*y+_*B+m*te+p*Te,r[3]=S*R+b*x+M*Y+L*$,r[7]=S*w+b*I+M*Z+L*he,r[11]=S*A+b*z+M*K+L*_e,r[15]=S*y+b*B+M*te+L*Te,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],u=e[13],c=e[2],h=e[6],d=e[10],f=e[14],g=e[3],_=e[7],m=e[11],p=e[15];return g*(+r*l*h-s*u*h-r*o*d+n*u*d+s*o*f-n*l*f)+_*(+t*l*f-t*u*d+r*a*d-s*a*f+s*u*c-r*l*c)+m*(+t*u*h-t*o*f-r*a*h+n*a*f+r*o*c-n*u*c)+p*(-s*o*c-t*l*h+t*o*d+s*a*h-n*a*d+n*l*c)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],u=e[7],c=e[8],h=e[9],d=e[10],f=e[11],g=e[12],_=e[13],m=e[14],p=e[15],S=h*m*u-_*d*u+_*l*f-o*m*f-h*l*p+o*d*p,b=g*d*u-c*m*u-g*l*f+a*m*f+c*l*p-a*d*p,M=c*_*u-g*h*u+g*o*f-a*_*f-c*o*p+a*h*p,L=g*h*l-c*_*l-g*o*d+a*_*d+c*o*m-a*h*m,R=t*S+n*b+s*M+r*L;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const w=1/R;return e[0]=S*w,e[1]=(_*d*r-h*m*r-_*s*f+n*m*f+h*s*p-n*d*p)*w,e[2]=(o*m*r-_*l*r+_*s*u-n*m*u-o*s*p+n*l*p)*w,e[3]=(h*l*r-o*d*r-h*s*u+n*d*u+o*s*f-n*l*f)*w,e[4]=b*w,e[5]=(c*m*r-g*d*r+g*s*f-t*m*f-c*s*p+t*d*p)*w,e[6]=(g*l*r-a*m*r-g*s*u+t*m*u+a*s*p-t*l*p)*w,e[7]=(a*d*r-c*l*r+c*s*u-t*d*u-a*s*f+t*l*f)*w,e[8]=M*w,e[9]=(g*h*r-c*_*r-g*n*f+t*_*f+c*n*p-t*h*p)*w,e[10]=(a*_*r-g*o*r+g*n*u-t*_*u-a*n*p+t*o*p)*w,e[11]=(c*o*r-a*h*r-c*n*u+t*h*u+a*n*f-t*o*f)*w,e[12]=L*w,e[13]=(c*_*s-g*h*s+g*n*d-t*_*d-c*n*m+t*h*m)*w,e[14]=(g*o*s-a*_*s-g*n*l+t*_*l+a*n*m-t*o*m)*w,e[15]=(a*h*s-c*o*s+c*n*l-t*h*l-a*n*d+t*o*d)*w,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,l=e.z,u=r*a,c=r*o;return this.set(u*a+n,u*o-s*l,u*l+s*o,0,u*o+s*l,c*o+n,c*l-s*a,0,u*l-s*o,c*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,u=r+r,c=a+a,h=o+o,d=r*u,f=r*c,g=r*h,_=a*c,m=a*h,p=o*h,S=l*u,b=l*c,M=l*h,L=n.x,R=n.y,w=n.z;return s[0]=(1-(_+p))*L,s[1]=(f+M)*L,s[2]=(g-b)*L,s[3]=0,s[4]=(f-M)*R,s[5]=(1-(d+p))*R,s[6]=(m+S)*R,s[7]=0,s[8]=(g+b)*w,s[9]=(m-S)*w,s[10]=(1-(d+_))*w,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;let r=xi.set(s[0],s[1],s[2]).length();const a=xi.set(s[4],s[5],s[6]).length(),o=xi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],rn.copy(this);const u=1/r,c=1/a,h=1/o;return rn.elements[0]*=u,rn.elements[1]*=u,rn.elements[2]*=u,rn.elements[4]*=c,rn.elements[5]*=c,rn.elements[6]*=c,rn.elements[8]*=h,rn.elements[9]*=h,rn.elements[10]*=h,t.setFromRotationMatrix(rn),n.x=r,n.y=a,n.z=o,this}makePerspective(e,t,n,s,r,a,o=Ln){const l=this.elements,u=2*r/(t-e),c=2*r/(n-s),h=(t+e)/(t-e),d=(n+s)/(n-s);let f,g;if(o===Ln)f=-(a+r)/(a-r),g=-2*a*r/(a-r);else if(o===Mr)f=-a/(a-r),g=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=c,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=Ln){const l=this.elements,u=1/(t-e),c=1/(n-s),h=1/(a-r),d=(t+e)*u,f=(n+s)*c;let g,_;if(o===Ln)g=(a+r)*h,_=-2*h;else if(o===Mr)g=r*h,_=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*u,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*c,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const xi=new U,rn=new Fe,Hd=new U(0,0,0),Vd=new U(1,1,1),Bn=new U,zs=new U,$t=new U,uc=new Fe,hc=new qn;class Mn{constructor(e=0,t=0,n=0,s=Mn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],u=s[5],c=s[9],h=s[2],d=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(ke(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-c,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,u),this._z=0);break;case"YXZ":this._x=Math.asin(-ke(c,-1,1)),Math.abs(c)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,u)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(ke(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,f),this._z=Math.atan2(-a,u)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-ke(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,u));break;case"YZX":this._z=Math.asin(ke(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-c,u),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-ke(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,u),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-c,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return uc.makeRotationFromQuaternion(e),this.setFromRotationMatrix(uc,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return hc.setFromEuler(this),this.setFromQuaternion(hc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Mn.DEFAULT_ORDER="XYZ";class tu{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Gd=0;const dc=new U,Mi=new qn,Tn=new Fe,Hs=new U,rs=new U,Wd=new U,Xd=new qn,fc=new U(1,0,0),pc=new U(0,1,0),mc=new U(0,0,1),gc={type:"added"},$d={type:"removed"},yi={type:"childadded",child:null},Gr={type:"childremoved",child:null};class dt extends Yi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Gd++}),this.uuid=hn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=dt.DEFAULT_UP.clone();const e=new U,t=new Mn,n=new qn,s=new U(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Fe},normalMatrix:{value:new Ue}}),this.matrix=new Fe,this.matrixWorld=new Fe,this.matrixAutoUpdate=dt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=dt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new tu,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Mi.setFromAxisAngle(e,t),this.quaternion.multiply(Mi),this}rotateOnWorldAxis(e,t){return Mi.setFromAxisAngle(e,t),this.quaternion.premultiply(Mi),this}rotateX(e){return this.rotateOnAxis(fc,e)}rotateY(e){return this.rotateOnAxis(pc,e)}rotateZ(e){return this.rotateOnAxis(mc,e)}translateOnAxis(e,t){return dc.copy(e).applyQuaternion(this.quaternion),this.position.add(dc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(fc,e)}translateY(e){return this.translateOnAxis(pc,e)}translateZ(e){return this.translateOnAxis(mc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Tn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Hs.copy(e):Hs.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),rs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Tn.lookAt(rs,Hs,this.up):Tn.lookAt(Hs,rs,this.up),this.quaternion.setFromRotationMatrix(Tn),s&&(Tn.extractRotation(s.matrixWorld),Mi.setFromRotationMatrix(Tn),this.quaternion.premultiply(Mi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(gc),yi.child=e,this.dispatchEvent(yi),yi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent($d),Gr.child=e,this.dispatchEvent(Gr),Gr.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Tn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Tn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Tn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(gc),yi.child=e,this.dispatchEvent(yi),yi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(rs,e,Wd),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(rs,Xd,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let u=0,c=l.length;u<c;u++){const h=l[u];r(e.shapes,h)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,u=this.material.length;l<u;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),u=a(e.textures),c=a(e.images),h=a(e.shapes),d=a(e.skeletons),f=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),u.length>0&&(n.textures=u),c.length>0&&(n.images=c),h.length>0&&(n.shapes=h),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(o){const l=[];for(const u in o){const c=o[u];delete c.metadata,l.push(c)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}dt.DEFAULT_UP=new U(0,1,0);dt.DEFAULT_MATRIX_AUTO_UPDATE=!0;dt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const an=new U,bn=new U,Wr=new U,wn=new U,Si=new U,Ei=new U,_c=new U,Xr=new U,$r=new U,qr=new U,Yr=new Qe,Kr=new Qe,jr=new Qe;class ln{constructor(e=new U,t=new U,n=new U){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),an.subVectors(e,t),s.cross(an);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){an.subVectors(s,t),bn.subVectors(n,t),Wr.subVectors(e,t);const a=an.dot(an),o=an.dot(bn),l=an.dot(Wr),u=bn.dot(bn),c=bn.dot(Wr),h=a*u-o*o;if(h===0)return r.set(0,0,0),null;const d=1/h,f=(u*l-o*c)*d,g=(a*c-o*l)*d;return r.set(1-f-g,g,f)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,wn)===null?!1:wn.x>=0&&wn.y>=0&&wn.x+wn.y<=1}static getInterpolation(e,t,n,s,r,a,o,l){return this.getBarycoord(e,t,n,s,wn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,wn.x),l.addScaledVector(a,wn.y),l.addScaledVector(o,wn.z),l)}static getInterpolatedAttribute(e,t,n,s,r,a){return Yr.setScalar(0),Kr.setScalar(0),jr.setScalar(0),Yr.fromBufferAttribute(e,t),Kr.fromBufferAttribute(e,n),jr.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(Yr,r.x),a.addScaledVector(Kr,r.y),a.addScaledVector(jr,r.z),a}static isFrontFacing(e,t,n,s){return an.subVectors(n,t),bn.subVectors(e,t),an.cross(bn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return an.subVectors(this.c,this.b),bn.subVectors(this.a,this.b),an.cross(bn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return ln.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return ln.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return ln.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return ln.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return ln.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let a,o;Si.subVectors(s,n),Ei.subVectors(r,n),Xr.subVectors(e,n);const l=Si.dot(Xr),u=Ei.dot(Xr);if(l<=0&&u<=0)return t.copy(n);$r.subVectors(e,s);const c=Si.dot($r),h=Ei.dot($r);if(c>=0&&h<=c)return t.copy(s);const d=l*h-c*u;if(d<=0&&l>=0&&c<=0)return a=l/(l-c),t.copy(n).addScaledVector(Si,a);qr.subVectors(e,r);const f=Si.dot(qr),g=Ei.dot(qr);if(g>=0&&f<=g)return t.copy(r);const _=f*u-l*g;if(_<=0&&u>=0&&g<=0)return o=u/(u-g),t.copy(n).addScaledVector(Ei,o);const m=c*g-f*h;if(m<=0&&h-c>=0&&f-g>=0)return _c.subVectors(r,s),o=(h-c)/(h-c+(f-g)),t.copy(s).addScaledVector(_c,o);const p=1/(m+_+d);return a=_*p,o=d*p,t.copy(n).addScaledVector(Si,a).addScaledVector(Ei,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const nu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},kn={h:0,s:0,l:0},Vs={h:0,s:0,l:0};function Zr(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class Pe{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=yt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,qe.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=qe.workingColorSpace){return this.r=e,this.g=t,this.b=n,qe.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=qe.workingColorSpace){if(e=yo(e,1),t=ke(t,0,1),n=ke(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=Zr(a,r,e+1/3),this.g=Zr(a,r,e),this.b=Zr(a,r,e-1/3)}return qe.colorSpaceToWorking(this,s),this}setStyle(e,t=yt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=yt){const n=nu[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Dn(e.r),this.g=Dn(e.g),this.b=Dn(e.b),this}copyLinearToSRGB(e){return this.r=Ui(e.r),this.g=Ui(e.g),this.b=Ui(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=yt){return qe.workingToColorSpace(Rt.copy(this),e),Math.round(ke(Rt.r*255,0,255))*65536+Math.round(ke(Rt.g*255,0,255))*256+Math.round(ke(Rt.b*255,0,255))}getHexString(e=yt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=qe.workingColorSpace){qe.workingToColorSpace(Rt.copy(this),t);const n=Rt.r,s=Rt.g,r=Rt.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let l,u;const c=(o+a)/2;if(o===a)l=0,u=0;else{const h=a-o;switch(u=c<=.5?h/(a+o):h/(2-a-o),a){case n:l=(s-r)/h+(s<r?6:0);break;case s:l=(r-n)/h+2;break;case r:l=(n-s)/h+4;break}l/=6}return e.h=l,e.s=u,e.l=c,e}getRGB(e,t=qe.workingColorSpace){return qe.workingToColorSpace(Rt.copy(this),t),e.r=Rt.r,e.g=Rt.g,e.b=Rt.b,e}getStyle(e=yt){qe.workingToColorSpace(Rt.copy(this),e);const t=Rt.r,n=Rt.g,s=Rt.b;return e!==yt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(kn),this.setHSL(kn.h+e,kn.s+t,kn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(kn),e.getHSL(Vs);const n=gs(kn.h,Vs.h,t),s=gs(kn.s,Vs.s,t),r=gs(kn.l,Vs.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Rt=new Pe;Pe.NAMES=nu;let qd=0;class vn extends Yi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:qd++}),this.uuid=hn(),this.name="",this.type="Material",this.blending=Di,this.side=Nn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=xa,this.blendDst=Ma,this.blendEquation=ri,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Pe(0,0,0),this.blendAlpha=0,this.depthFunc=Oi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ic,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=pi,this.stencilZFail=pi,this.stencilZPass=pi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Di&&(n.blending=this.blending),this.side!==Nn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==xa&&(n.blendSrc=this.blendSrc),this.blendDst!==Ma&&(n.blendDst=this.blendDst),this.blendEquation!==ri&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Oi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==ic&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==pi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==pi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==pi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Ut extends vn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Pe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Mn,this.combine=zl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const vt=new U,Gs=new De;let Yd=0;class Ot{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Yd++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=so,this.updateRanges=[],this.gpuType=un,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Gs.fromBufferAttribute(this,t),Gs.applyMatrix3(e),this.setXY(t,Gs.x,Gs.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)vt.fromBufferAttribute(this,t),vt.applyMatrix3(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)vt.fromBufferAttribute(this,t),vt.applyMatrix4(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)vt.fromBufferAttribute(this,t),vt.applyNormalMatrix(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)vt.fromBufferAttribute(this,t),vt.transformDirection(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=cn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=nt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=cn(t,this.array)),t}setX(e,t){return this.normalized&&(t=nt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=cn(t,this.array)),t}setY(e,t){return this.normalized&&(t=nt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=cn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=nt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=cn(t,this.array)),t}setW(e,t){return this.normalized&&(t=nt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=nt(t,this.array),n=nt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=nt(t,this.array),n=nt(n,this.array),s=nt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=nt(t,this.array),n=nt(n,this.array),s=nt(s,this.array),r=nt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==so&&(e.usage=this.usage),e}}class iu extends Ot{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class su extends Ot{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class ut extends Ot{constructor(e,t,n){super(new Float32Array(e),t,n)}}let Kd=0;const Zt=new Fe,Jr=new dt,Ti=new U,qt=new dn,as=new dn,Tt=new U;class Pt extends Yi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Kd++}),this.uuid=hn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Ql(e)?su:iu)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Ue().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Zt.makeRotationFromQuaternion(e),this.applyMatrix4(Zt),this}rotateX(e){return Zt.makeRotationX(e),this.applyMatrix4(Zt),this}rotateY(e){return Zt.makeRotationY(e),this.applyMatrix4(Zt),this}rotateZ(e){return Zt.makeRotationZ(e),this.applyMatrix4(Zt),this}translate(e,t,n){return Zt.makeTranslation(e,t,n),this.applyMatrix4(Zt),this}scale(e,t,n){return Zt.makeScale(e,t,n),this.applyMatrix4(Zt),this}lookAt(e){return Jr.lookAt(e),Jr.updateMatrix(),this.applyMatrix4(Jr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ti).negate(),this.translate(Ti.x,Ti.y,Ti.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new ut(n,3))}else{const n=Math.min(e.length,t.count);for(let s=0;s<n;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new dn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new U(-1/0,-1/0,-1/0),new U(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];qt.setFromBufferAttribute(r),this.morphTargetsRelative?(Tt.addVectors(this.boundingBox.min,qt.min),this.boundingBox.expandByPoint(Tt),Tt.addVectors(this.boundingBox.max,qt.max),this.boundingBox.expandByPoint(Tt)):(this.boundingBox.expandByPoint(qt.min),this.boundingBox.expandByPoint(qt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new yn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new U,1/0);return}if(e){const n=this.boundingSphere.center;if(qt.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];as.setFromBufferAttribute(o),this.morphTargetsRelative?(Tt.addVectors(qt.min,as.min),qt.expandByPoint(Tt),Tt.addVectors(qt.max,as.max),qt.expandByPoint(Tt)):(qt.expandByPoint(as.min),qt.expandByPoint(as.max))}qt.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)Tt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Tt));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],l=this.morphTargetsRelative;for(let u=0,c=o.count;u<c;u++)Tt.fromBufferAttribute(o,u),l&&(Ti.fromBufferAttribute(e,u),Tt.add(Ti)),s=Math.max(s,n.distanceToSquared(Tt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ot(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let A=0;A<n.count;A++)o[A]=new U,l[A]=new U;const u=new U,c=new U,h=new U,d=new De,f=new De,g=new De,_=new U,m=new U;function p(A,y,x){u.fromBufferAttribute(n,A),c.fromBufferAttribute(n,y),h.fromBufferAttribute(n,x),d.fromBufferAttribute(r,A),f.fromBufferAttribute(r,y),g.fromBufferAttribute(r,x),c.sub(u),h.sub(u),f.sub(d),g.sub(d);const I=1/(f.x*g.y-g.x*f.y);isFinite(I)&&(_.copy(c).multiplyScalar(g.y).addScaledVector(h,-f.y).multiplyScalar(I),m.copy(h).multiplyScalar(f.x).addScaledVector(c,-g.x).multiplyScalar(I),o[A].add(_),o[y].add(_),o[x].add(_),l[A].add(m),l[y].add(m),l[x].add(m))}let S=this.groups;S.length===0&&(S=[{start:0,count:e.count}]);for(let A=0,y=S.length;A<y;++A){const x=S[A],I=x.start,z=x.count;for(let B=I,Y=I+z;B<Y;B+=3)p(e.getX(B+0),e.getX(B+1),e.getX(B+2))}const b=new U,M=new U,L=new U,R=new U;function w(A){L.fromBufferAttribute(s,A),R.copy(L);const y=o[A];b.copy(y),b.sub(L.multiplyScalar(L.dot(y))).normalize(),M.crossVectors(R,y);const I=M.dot(l[A])<0?-1:1;a.setXYZW(A,b.x,b.y,b.z,I)}for(let A=0,y=S.length;A<y;++A){const x=S[A],I=x.start,z=x.count;for(let B=I,Y=I+z;B<Y;B+=3)w(e.getX(B+0)),w(e.getX(B+1)),w(e.getX(B+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ot(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const s=new U,r=new U,a=new U,o=new U,l=new U,u=new U,c=new U,h=new U;if(e)for(let d=0,f=e.count;d<f;d+=3){const g=e.getX(d+0),_=e.getX(d+1),m=e.getX(d+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,_),a.fromBufferAttribute(t,m),c.subVectors(a,r),h.subVectors(s,r),c.cross(h),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),u.fromBufferAttribute(n,m),o.add(c),l.add(c),u.add(c),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(m,u.x,u.y,u.z)}else for(let d=0,f=t.count;d<f;d+=3)s.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),c.subVectors(a,r),h.subVectors(s,r),c.cross(h),n.setXYZ(d+0,c.x,c.y,c.z),n.setXYZ(d+1,c.x,c.y,c.z),n.setXYZ(d+2,c.x,c.y,c.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Tt.fromBufferAttribute(e,t),Tt.normalize(),e.setXYZ(t,Tt.x,Tt.y,Tt.z)}toNonIndexed(){function e(o,l){const u=o.array,c=o.itemSize,h=o.normalized,d=new u.constructor(l.length*c);let f=0,g=0;for(let _=0,m=l.length;_<m;_++){o.isInterleavedBufferAttribute?f=l[_]*o.data.stride+o.offset:f=l[_]*c;for(let p=0;p<c;p++)d[g++]=u[f++]}return new Ot(d,c,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Pt,n=this.index.array,s=this.attributes;for(const o in s){const l=s[o],u=e(l,n);t.setAttribute(o,u)}const r=this.morphAttributes;for(const o in r){const l=[],u=r[o];for(let c=0,h=u.length;c<h;c++){const d=u[c],f=e(d,n);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const u=a[o];t.addGroup(u.start,u.count,u.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const u in l)l[u]!==void 0&&(e[u]=l[u]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const u=n[l];e.data.attributes[l]=u.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const u=this.morphAttributes[l],c=[];for(let h=0,d=u.length;h<d;h++){const f=u[h];c.push(f.toJSON(e.data))}c.length>0&&(s[l]=c,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const s=e.attributes;for(const u in s){const c=s[u];this.setAttribute(u,c.clone(t))}const r=e.morphAttributes;for(const u in r){const c=[],h=r[u];for(let d=0,f=h.length;d<f;d++)c.push(h[d].clone(t));this.morphAttributes[u]=c}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let u=0,c=a.length;u<c;u++){const h=a[u];this.addGroup(h.start,h.count,h.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const vc=new Fe,Zn=new br,Ws=new yn,xc=new U,Xs=new U,$s=new U,qs=new U,Qr=new U,Ys=new U,Mc=new U,Ks=new U;class Ke extends dt{constructor(e=new Pt,t=new Ut){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){Ys.set(0,0,0);for(let l=0,u=r.length;l<u;l++){const c=o[l],h=r[l];c!==0&&(Qr.fromBufferAttribute(h,e),a?Ys.addScaledVector(Qr,c):Ys.addScaledVector(Qr.sub(t),c))}t.add(Ys)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ws.copy(n.boundingSphere),Ws.applyMatrix4(r),Zn.copy(e.ray).recast(e.near),!(Ws.containsPoint(Zn.origin)===!1&&(Zn.intersectSphere(Ws,xc)===null||Zn.origin.distanceToSquared(xc)>(e.far-e.near)**2))&&(vc.copy(r).invert(),Zn.copy(e.ray).applyMatrix4(vc),!(n.boundingBox!==null&&Zn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Zn)))}_computeIntersections(e,t,n){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,u=r.attributes.uv,c=r.attributes.uv1,h=r.attributes.normal,d=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,_=d.length;g<_;g++){const m=d[g],p=a[m.materialIndex],S=Math.max(m.start,f.start),b=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let M=S,L=b;M<L;M+=3){const R=o.getX(M),w=o.getX(M+1),A=o.getX(M+2);s=js(this,p,e,n,u,c,h,R,w,A),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,f.start),_=Math.min(o.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){const S=o.getX(m),b=o.getX(m+1),M=o.getX(m+2);s=js(this,a,e,n,u,c,h,S,b,M),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,_=d.length;g<_;g++){const m=d[g],p=a[m.materialIndex],S=Math.max(m.start,f.start),b=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let M=S,L=b;M<L;M+=3){const R=M,w=M+1,A=M+2;s=js(this,p,e,n,u,c,h,R,w,A),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,f.start),_=Math.min(l.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){const S=m,b=m+1,M=m+2;s=js(this,a,e,n,u,c,h,S,b,M),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function jd(i,e,t,n,s,r,a,o){let l;if(e.side===Ct?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,e.side===Nn,o),l===null)return null;Ks.copy(o),Ks.applyMatrix4(i.matrixWorld);const u=t.ray.origin.distanceTo(Ks);return u<t.near||u>t.far?null:{distance:u,point:Ks.clone(),object:i}}function js(i,e,t,n,s,r,a,o,l,u){i.getVertexPosition(o,Xs),i.getVertexPosition(l,$s),i.getVertexPosition(u,qs);const c=jd(i,e,t,n,Xs,$s,qs,Mc);if(c){const h=new U;ln.getBarycoord(Mc,Xs,$s,qs,h),s&&(c.uv=ln.getInterpolatedAttribute(s,o,l,u,h,new De)),r&&(c.uv1=ln.getInterpolatedAttribute(r,o,l,u,h,new De)),a&&(c.normal=ln.getInterpolatedAttribute(a,o,l,u,h,new U),c.normal.dot(n.direction)>0&&c.normal.multiplyScalar(-1));const d={a:o,b:l,c:u,normal:new U,materialIndex:0};ln.getNormal(Xs,$s,qs,d.normal),c.face=d,c.barycoord=h}return c}class Qt extends Pt{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],u=[],c=[],h=[];let d=0,f=0;g("z","y","x",-1,-1,n,t,e,a,r,0),g("z","y","x",1,-1,n,t,-e,a,r,1),g("x","z","y",1,1,e,n,t,s,a,2),g("x","z","y",1,-1,e,n,-t,s,a,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new ut(u,3)),this.setAttribute("normal",new ut(c,3)),this.setAttribute("uv",new ut(h,2));function g(_,m,p,S,b,M,L,R,w,A,y){const x=M/w,I=L/A,z=M/2,B=L/2,Y=R/2,Z=w+1,K=A+1;let te=0,$=0;const he=new U;for(let _e=0;_e<K;_e++){const Te=_e*I-B;for(let Be=0;Be<Z;Be++){const tt=Be*x-z;he[_]=tt*S,he[m]=Te*b,he[p]=Y,u.push(he.x,he.y,he.z),he[_]=0,he[m]=0,he[p]=R>0?1:-1,c.push(he.x,he.y,he.z),h.push(Be/w),h.push(1-_e/A),te+=1}}for(let _e=0;_e<A;_e++)for(let Te=0;Te<w;Te++){const Be=d+Te+Z*_e,tt=d+Te+Z*(_e+1),q=d+(Te+1)+Z*(_e+1),oe=d+(Te+1)+Z*_e;l.push(Be,tt,oe),l.push(tt,q,oe),$+=6}o.addGroup(f,$,y),f+=$,d+=te}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Qt(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Vi(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function Dt(i){const e={};for(let t=0;t<i.length;t++){const n=Vi(i[t]);for(const s in n)e[s]=n[s]}return e}function Zd(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function ru(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:qe.workingColorSpace}const Jd={clone:Vi,merge:Dt};var Qd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ef=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class $n extends vn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Qd,this.fragmentShader=ef,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Vi(e.uniforms),this.uniformsGroups=Zd(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class au extends dt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Fe,this.projectionMatrix=new Fe,this.projectionMatrixInverse=new Fe,this.coordinateSystem=Ln}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const zn=new U,yc=new De,Sc=new De;class Nt extends au{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Hi*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(ms*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Hi*2*Math.atan(Math.tan(ms*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){zn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(zn.x,zn.y).multiplyScalar(-e/zn.z),zn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(zn.x,zn.y).multiplyScalar(-e/zn.z)}getViewSize(e,t){return this.getViewBounds(e,yc,Sc),t.subVectors(Sc,yc)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(ms*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,u=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*n/u,s*=a.width/l,n*=a.height/u}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const bi=-90,wi=1;class tf extends dt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Nt(bi,wi,e,t);s.layers=this.layers,this.add(s);const r=new Nt(bi,wi,e,t);r.layers=this.layers,this.add(r);const a=new Nt(bi,wi,e,t);a.layers=this.layers,this.add(a);const o=new Nt(bi,wi,e,t);o.layers=this.layers,this.add(o);const l=new Nt(bi,wi,e,t);l.layers=this.layers,this.add(l);const u=new Nt(bi,wi,e,t);u.layers=this.layers,this.add(u)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,l]=t;for(const u of t)this.remove(u);if(e===Ln)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Mr)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const u of t)this.add(u),u.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,u,c]=this.children,h=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,a),e.setRenderTarget(n,2,s),e.render(t,o),e.setRenderTarget(n,3,s),e.render(t,l),e.setRenderTarget(n,4,s),e.render(t,u),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,s),e.render(t,c),e.setRenderTarget(h,d,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class ou extends bt{constructor(e=[],t=Bi,n,s,r,a,o,l,u,c){super(e,t,n,s,r,a,o,l,u,c),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class nf extends ui{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new ou(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Qt(5,5,5),r=new $n({name:"CubemapFromEquirect",uniforms:Vi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ct,blending:Wn});r.uniforms.tEquirect.value=t;const a=new Ke(s,r),o=t.minFilter;return t.minFilter===Pn&&(t.minFilter=Yt),new tf(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}}class zt extends dt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const sf={type:"move"};class ea{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new zt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new zt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new U,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new U),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new zt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new U,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new U),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,u=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(u&&e.hand){a=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,n),p=this._getHandJoint(u,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const c=u.joints["index-finger-tip"],h=u.joints["thumb-tip"],d=c.position.distanceTo(h.position),f=.02,g=.005;u.inputState.pinching&&d>f+g?(u.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!u.inputState.pinching&&d<=f-g&&(u.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(sf)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),u!==null&&(u.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new zt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class ro extends dt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Mn,this.environmentIntensity=1,this.environmentRotation=new Mn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class rf{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=so,this.updateRanges=[],this.version=0,this.uuid=hn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=hn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=hn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const It=new U;class Eo{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)It.fromBufferAttribute(this,t),It.applyMatrix4(e),this.setXYZ(t,It.x,It.y,It.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)It.fromBufferAttribute(this,t),It.applyNormalMatrix(e),this.setXYZ(t,It.x,It.y,It.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)It.fromBufferAttribute(this,t),It.transformDirection(e),this.setXYZ(t,It.x,It.y,It.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=cn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=nt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=nt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=nt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=nt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=nt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=cn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=cn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=cn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=cn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=nt(t,this.array),n=nt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=nt(t,this.array),n=nt(n,this.array),s=nt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=nt(t,this.array),n=nt(n,this.array),s=nt(s,this.array),r=nt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Ot(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Eo(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const Ec=new U,Tc=new Qe,bc=new Qe,af=new U,wc=new Fe,Zs=new U,ta=new yn,Ac=new Fe,na=new br;class of extends Ke{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Qo,this.bindMatrix=new Fe,this.bindMatrixInverse=new Fe,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new dn),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Zs),this.boundingBox.expandByPoint(Zs)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new yn),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Zs),this.boundingSphere.expandByPoint(Zs)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ta.copy(this.boundingSphere),ta.applyMatrix4(s),e.ray.intersectsSphere(ta)!==!1&&(Ac.copy(s).invert(),na.copy(e.ray).applyMatrix4(Ac),!(this.boundingBox!==null&&na.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,na)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new Qe,t=this.geometry.attributes.skinWeight;for(let n=0,s=t.count;n<s;n++){e.fromBufferAttribute(t,n);const r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Qo?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===ed?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,s=this.geometry;Tc.fromBufferAttribute(s.attributes.skinIndex,e),bc.fromBufferAttribute(s.attributes.skinWeight,e),Ec.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){const a=bc.getComponent(r);if(a!==0){const o=Tc.getComponent(r);wc.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(af.copy(Ec).applyMatrix4(wc),a)}}return t.applyMatrix4(this.bindMatrixInverse)}}class cu extends dt{constructor(){super(),this.isBone=!0,this.type="Bone"}}class lu extends bt{constructor(e=null,t=1,n=1,s,r,a,o,l,u=Ft,c=Ft,h,d){super(null,a,o,l,u,c,s,r,h,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Rc=new Fe,cf=new Fe;class To{constructor(e=[],t=[]){this.uuid=hn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new Fe)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new Fe;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,a=e.length;r<a;r++){const o=e[r]?e[r].matrixWorld:cf;Rc.multiplyMatrices(o,t[r]),Rc.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new To(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new lu(t,e,e,en,un);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const s=this.bones[t];if(s.name===e)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,s=e.bones.length;n<s;n++){const r=e.bones[n];let a=t[r];a===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),a=new cu),this.bones.push(a),this.boneInverses.push(new Fe().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let s=0,r=t.length;s<r;s++){const a=t[s];e.bones.push(a.uuid);const o=n[s];e.boneInverses.push(o.toArray())}return e}}class ao extends Ot{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Ai=new Fe,Cc=new Fe,Js=[],Pc=new dn,lf=new Fe,os=new Ke,cs=new yn;class uu extends Ke{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new ao(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,lf)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new dn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ai),Pc.copy(e.boundingBox).applyMatrix4(Ai),this.boundingBox.union(Pc)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new yn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ai),cs.copy(e.boundingSphere).applyMatrix4(Ai),this.boundingSphere.union(cs)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(e,t){const n=this.matrixWorld,s=this.count;if(os.geometry=this.geometry,os.material=this.material,os.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),cs.copy(this.boundingSphere),cs.applyMatrix4(n),e.ray.intersectsSphere(cs)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Ai),Cc.multiplyMatrices(n,Ai),os.matrixWorld=Cc,os.raycast(e,Js);for(let a=0,o=Js.length;a<o;a++){const l=Js[a];l.instanceId=r,l.object=this,t.push(l)}Js.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new ao(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new lu(new Float32Array(s*this.count),s,this.count,_o,un));const r=this.morphTexture.source.data.data;let a=0;for(let u=0;u<n.length;u++)a+=n[u];const o=this.geometry.morphTargetsRelative?1:1-a,l=s*e;r[l]=o,r.set(n,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const ia=new U,uf=new U,hf=new Ue;class ii{constructor(e=new U(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=ia.subVectors(n,t).cross(uf.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(ia),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||hf.getNormalMatrix(e),s=this.coplanarPoint(ia).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Jn=new yn,df=new De(.5,.5),Qs=new U;class bo{constructor(e=new ii,t=new ii,n=new ii,s=new ii,r=new ii,a=new ii){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Ln){const n=this.planes,s=e.elements,r=s[0],a=s[1],o=s[2],l=s[3],u=s[4],c=s[5],h=s[6],d=s[7],f=s[8],g=s[9],_=s[10],m=s[11],p=s[12],S=s[13],b=s[14],M=s[15];if(n[0].setComponents(l-r,d-u,m-f,M-p).normalize(),n[1].setComponents(l+r,d+u,m+f,M+p).normalize(),n[2].setComponents(l+a,d+c,m+g,M+S).normalize(),n[3].setComponents(l-a,d-c,m-g,M-S).normalize(),n[4].setComponents(l-o,d-h,m-_,M-b).normalize(),t===Ln)n[5].setComponents(l+o,d+h,m+_,M+b).normalize();else if(t===Mr)n[5].setComponents(o,h,_,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Jn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Jn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Jn)}intersectsSprite(e){Jn.center.set(0,0,0);const t=df.distanceTo(e.center);return Jn.radius=.7071067811865476+t,Jn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Jn)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(Qs.x=s.normal.x>0?e.max.x:e.min.x,Qs.y=s.normal.y>0?e.max.y:e.min.y,Qs.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Qs)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class hu extends vn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Pe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const yr=new U,Sr=new U,Lc=new Fe,ls=new br,er=new yn,sa=new U,Ic=new U;class wo extends dt{constructor(e=new Pt,t=new hu){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)yr.fromBufferAttribute(t,s-1),Sr.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=yr.distanceTo(Sr);e.setAttribute("lineDistance",new ut(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),er.copy(n.boundingSphere),er.applyMatrix4(s),er.radius+=r,e.ray.intersectsSphere(er)===!1)return;Lc.copy(s).invert(),ls.copy(e.ray).applyMatrix4(Lc);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,u=this.isLineSegments?2:1,c=n.index,d=n.attributes.position;if(c!==null){const f=Math.max(0,a.start),g=Math.min(c.count,a.start+a.count);for(let _=f,m=g-1;_<m;_+=u){const p=c.getX(_),S=c.getX(_+1),b=tr(this,e,ls,l,p,S,_);b&&t.push(b)}if(this.isLineLoop){const _=c.getX(g-1),m=c.getX(f),p=tr(this,e,ls,l,_,m,g-1);p&&t.push(p)}}else{const f=Math.max(0,a.start),g=Math.min(d.count,a.start+a.count);for(let _=f,m=g-1;_<m;_+=u){const p=tr(this,e,ls,l,_,_+1,_);p&&t.push(p)}if(this.isLineLoop){const _=tr(this,e,ls,l,g-1,f,g-1);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function tr(i,e,t,n,s,r,a){const o=i.geometry.attributes.position;if(yr.fromBufferAttribute(o,s),Sr.fromBufferAttribute(o,r),t.distanceSqToSegment(yr,Sr,sa,Ic)>n)return;sa.applyMatrix4(i.matrixWorld);const u=e.ray.origin.distanceTo(sa);if(!(u<e.near||u>e.far))return{distance:u,point:Ic.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}const Dc=new U,Nc=new U;class ff extends wo{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)Dc.fromBufferAttribute(t,s),Nc.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Dc.distanceTo(Nc);e.setAttribute("lineDistance",new ut(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class pf extends wo{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class du extends vn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Pe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Uc=new Fe,oo=new br,nr=new yn,ir=new U;class mf extends dt{constructor(e=new Pt,t=new du){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),nr.copy(n.boundingSphere),nr.applyMatrix4(s),nr.radius+=r,e.ray.intersectsSphere(nr)===!1)return;Uc.copy(s).invert(),oo.copy(e.ray).applyMatrix4(Uc);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,u=n.index,h=n.attributes.position;if(u!==null){const d=Math.max(0,a.start),f=Math.min(u.count,a.start+a.count);for(let g=d,_=f;g<_;g++){const m=u.getX(g);ir.fromBufferAttribute(h,m),Fc(ir,m,l,s,e,t,this)}}else{const d=Math.max(0,a.start),f=Math.min(h.count,a.start+a.count);for(let g=d,_=f;g<_;g++)ir.fromBufferAttribute(h,g),Fc(ir,g,l,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Fc(i,e,t,n,s,r,a){const o=oo.distanceSqToPoint(i);if(o<t){const l=new U;oo.closestPointToPoint(i,l),l.applyMatrix4(n);const u=s.ray.origin.distanceTo(l);if(u<s.near||u>s.far)return;r.push({distance:u,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class fu extends bt{constructor(e,t,n=li,s,r,a,o=Ft,l=Ft,u,c=Ms,h=1){if(c!==Ms&&c!==ys)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:e,height:t,depth:h};super(d,s,r,a,o,l,c,n,u),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new So(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Ao extends Pt{constructor(e=1,t=1,n=4,s=8,r=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:n,radialSegments:s,heightSegments:r},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),s=Math.max(3,Math.floor(s)),r=Math.max(1,Math.floor(r));const a=[],o=[],l=[],u=[],c=t/2,h=Math.PI/2*e,d=t,f=2*h+d,g=n*2+r,_=s+1,m=new U,p=new U;for(let S=0;S<=g;S++){let b=0,M=0,L=0,R=0;if(S<=n){const y=S/n,x=y*Math.PI/2;M=-c-e*Math.cos(x),L=e*Math.sin(x),R=-e*Math.cos(x),b=y*h}else if(S<=n+r){const y=(S-n)/r;M=-c+y*t,L=e,R=0,b=h+y*d}else{const y=(S-n-r)/n,x=y*Math.PI/2;M=c+e*Math.sin(x),L=e*Math.cos(x),R=e*Math.sin(x),b=h+d+y*h}const w=Math.max(0,Math.min(1,b/f));let A=0;S===0?A=.5/s:S===g&&(A=-.5/s);for(let y=0;y<=s;y++){const x=y/s,I=x*Math.PI*2,z=Math.sin(I),B=Math.cos(I);p.x=-L*B,p.y=M,p.z=L*z,o.push(p.x,p.y,p.z),m.set(-L*B,R,L*z),m.normalize(),l.push(m.x,m.y,m.z),u.push(x+A,w)}if(S>0){const y=(S-1)*_;for(let x=0;x<s;x++){const I=y+x,z=y+x+1,B=S*_+x,Y=S*_+x+1;a.push(I,z,B),a.push(z,Y,B)}}}this.setIndex(a),this.setAttribute("position",new ut(o,3)),this.setAttribute("normal",new ut(l,3)),this.setAttribute("uv",new ut(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ao(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}}class oi extends Pt{constructor(e=1,t=1,n=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const u=this;s=Math.floor(s),r=Math.floor(r);const c=[],h=[],d=[],f=[];let g=0;const _=[],m=n/2;let p=0;S(),a===!1&&(e>0&&b(!0),t>0&&b(!1)),this.setIndex(c),this.setAttribute("position",new ut(h,3)),this.setAttribute("normal",new ut(d,3)),this.setAttribute("uv",new ut(f,2));function S(){const M=new U,L=new U;let R=0;const w=(t-e)/n;for(let A=0;A<=r;A++){const y=[],x=A/r,I=x*(t-e)+e;for(let z=0;z<=s;z++){const B=z/s,Y=B*l+o,Z=Math.sin(Y),K=Math.cos(Y);L.x=I*Z,L.y=-x*n+m,L.z=I*K,h.push(L.x,L.y,L.z),M.set(Z,w,K).normalize(),d.push(M.x,M.y,M.z),f.push(B,1-x),y.push(g++)}_.push(y)}for(let A=0;A<s;A++)for(let y=0;y<r;y++){const x=_[y][A],I=_[y+1][A],z=_[y+1][A+1],B=_[y][A+1];(e>0||y!==0)&&(c.push(x,I,B),R+=3),(t>0||y!==r-1)&&(c.push(I,z,B),R+=3)}u.addGroup(p,R,0),p+=R}function b(M){const L=g,R=new De,w=new U;let A=0;const y=M===!0?e:t,x=M===!0?1:-1;for(let z=1;z<=s;z++)h.push(0,m*x,0),d.push(0,x,0),f.push(.5,.5),g++;const I=g;for(let z=0;z<=s;z++){const Y=z/s*l+o,Z=Math.cos(Y),K=Math.sin(Y);w.x=y*K,w.y=m*x,w.z=y*Z,h.push(w.x,w.y,w.z),d.push(0,x,0),R.x=Z*.5+.5,R.y=K*.5*x+.5,f.push(R.x,R.y),g++}for(let z=0;z<s;z++){const B=L+z,Y=I+z;M===!0?c.push(Y,Y+1,B):c.push(Y+1,Y,B),A+=3}u.addGroup(p,A,M===!0?1:2),p+=A}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new oi(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Er extends oi{constructor(e=1,t=1,n=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,e,t,n,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(e){return new Er(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Ro extends Pt{constructor(e=[],t=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:s};const r=[],a=[];o(s),u(n),c(),this.setAttribute("position",new ut(r,3)),this.setAttribute("normal",new ut(r.slice(),3)),this.setAttribute("uv",new ut(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(S){const b=new U,M=new U,L=new U;for(let R=0;R<t.length;R+=3)f(t[R+0],b),f(t[R+1],M),f(t[R+2],L),l(b,M,L,S)}function l(S,b,M,L){const R=L+1,w=[];for(let A=0;A<=R;A++){w[A]=[];const y=S.clone().lerp(M,A/R),x=b.clone().lerp(M,A/R),I=R-A;for(let z=0;z<=I;z++)z===0&&A===R?w[A][z]=y:w[A][z]=y.clone().lerp(x,z/I)}for(let A=0;A<R;A++)for(let y=0;y<2*(R-A)-1;y++){const x=Math.floor(y/2);y%2===0?(d(w[A][x+1]),d(w[A+1][x]),d(w[A][x])):(d(w[A][x+1]),d(w[A+1][x+1]),d(w[A+1][x]))}}function u(S){const b=new U;for(let M=0;M<r.length;M+=3)b.x=r[M+0],b.y=r[M+1],b.z=r[M+2],b.normalize().multiplyScalar(S),r[M+0]=b.x,r[M+1]=b.y,r[M+2]=b.z}function c(){const S=new U;for(let b=0;b<r.length;b+=3){S.x=r[b+0],S.y=r[b+1],S.z=r[b+2];const M=m(S)/2/Math.PI+.5,L=p(S)/Math.PI+.5;a.push(M,1-L)}g(),h()}function h(){for(let S=0;S<a.length;S+=6){const b=a[S+0],M=a[S+2],L=a[S+4],R=Math.max(b,M,L),w=Math.min(b,M,L);R>.9&&w<.1&&(b<.2&&(a[S+0]+=1),M<.2&&(a[S+2]+=1),L<.2&&(a[S+4]+=1))}}function d(S){r.push(S.x,S.y,S.z)}function f(S,b){const M=S*3;b.x=e[M+0],b.y=e[M+1],b.z=e[M+2]}function g(){const S=new U,b=new U,M=new U,L=new U,R=new De,w=new De,A=new De;for(let y=0,x=0;y<r.length;y+=9,x+=6){S.set(r[y+0],r[y+1],r[y+2]),b.set(r[y+3],r[y+4],r[y+5]),M.set(r[y+6],r[y+7],r[y+8]),R.set(a[x+0],a[x+1]),w.set(a[x+2],a[x+3]),A.set(a[x+4],a[x+5]),L.copy(S).add(b).add(M).divideScalar(3);const I=m(L);_(R,x+0,S,I),_(w,x+2,b,I),_(A,x+4,M,I)}}function _(S,b,M,L){L<0&&S.x===1&&(a[b]=S.x-1),M.x===0&&M.z===0&&(a[b]=L/2/Math.PI+.5)}function m(S){return Math.atan2(S.z,-S.x)}function p(S){return Math.atan2(-S.y,Math.sqrt(S.x*S.x+S.z*S.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ro(e.vertices,e.indices,e.radius,e.details)}}class Co extends Pt{constructor(e=[new De(0,-.5),new De(.5,0),new De(0,.5)],t=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:s},t=Math.floor(t),s=ke(s,0,Math.PI*2);const r=[],a=[],o=[],l=[],u=[],c=1/t,h=new U,d=new De,f=new U,g=new U,_=new U;let m=0,p=0;for(let S=0;S<=e.length-1;S++)switch(S){case 0:m=e[S+1].x-e[S].x,p=e[S+1].y-e[S].y,f.x=p*1,f.y=-m,f.z=p*0,_.copy(f),f.normalize(),l.push(f.x,f.y,f.z);break;case e.length-1:l.push(_.x,_.y,_.z);break;default:m=e[S+1].x-e[S].x,p=e[S+1].y-e[S].y,f.x=p*1,f.y=-m,f.z=p*0,g.copy(f),f.x+=_.x,f.y+=_.y,f.z+=_.z,f.normalize(),l.push(f.x,f.y,f.z),_.copy(g)}for(let S=0;S<=t;S++){const b=n+S*c*s,M=Math.sin(b),L=Math.cos(b);for(let R=0;R<=e.length-1;R++){h.x=e[R].x*M,h.y=e[R].y,h.z=e[R].x*L,a.push(h.x,h.y,h.z),d.x=S/t,d.y=R/(e.length-1),o.push(d.x,d.y);const w=l[3*R+0]*M,A=l[3*R+1],y=l[3*R+0]*L;u.push(w,A,y)}}for(let S=0;S<t;S++)for(let b=0;b<e.length-1;b++){const M=b+S*e.length,L=M,R=M+e.length,w=M+e.length+1,A=M+1;r.push(L,R,A),r.push(w,A,R)}this.setIndex(r),this.setAttribute("position",new ut(a,3)),this.setAttribute("uv",new ut(o,2)),this.setAttribute("normal",new ut(u,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Co(e.points,e.segments,e.phiStart,e.phiLength)}}class Po extends Ro{constructor(e=1,t=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,s,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Po(e.radius,e.detail)}}class Gi extends Pt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(n),l=Math.floor(s),u=o+1,c=l+1,h=e/o,d=t/l,f=[],g=[],_=[],m=[];for(let p=0;p<c;p++){const S=p*d-a;for(let b=0;b<u;b++){const M=b*h-r;g.push(M,-S,0),_.push(0,0,1),m.push(b/o),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let S=0;S<o;S++){const b=S+u*p,M=S+u*(p+1),L=S+1+u*(p+1),R=S+1+u*p;f.push(b,M,R),f.push(M,L,R)}this.setIndex(f),this.setAttribute("position",new ut(g,3)),this.setAttribute("normal",new ut(_,3)),this.setAttribute("uv",new ut(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Gi(e.width,e.height,e.widthSegments,e.heightSegments)}}class on extends Pt{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let u=0;const c=[],h=new U,d=new U,f=[],g=[],_=[],m=[];for(let p=0;p<=n;p++){const S=[],b=p/n;let M=0;p===0&&a===0?M=.5/t:p===n&&l===Math.PI&&(M=-.5/t);for(let L=0;L<=t;L++){const R=L/t;h.x=-e*Math.cos(s+R*r)*Math.sin(a+b*o),h.y=e*Math.cos(a+b*o),h.z=e*Math.sin(s+R*r)*Math.sin(a+b*o),g.push(h.x,h.y,h.z),d.copy(h).normalize(),_.push(d.x,d.y,d.z),m.push(R+M,1-b),S.push(u++)}c.push(S)}for(let p=0;p<n;p++)for(let S=0;S<t;S++){const b=c[p][S+1],M=c[p][S],L=c[p+1][S],R=c[p+1][S+1];(p!==0||a>0)&&f.push(b,M,R),(p!==n-1||l<Math.PI)&&f.push(M,L,R)}this.setIndex(f),this.setAttribute("position",new ut(g,3)),this.setAttribute("normal",new ut(_,3)),this.setAttribute("uv",new ut(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new on(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class bs extends Pt{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);const a=[],o=[],l=[],u=[],c=new U,h=new U,d=new U;for(let f=0;f<=n;f++)for(let g=0;g<=s;g++){const _=g/s*r,m=f/n*Math.PI*2;h.x=(e+t*Math.cos(m))*Math.cos(_),h.y=(e+t*Math.cos(m))*Math.sin(_),h.z=t*Math.sin(m),o.push(h.x,h.y,h.z),c.x=e*Math.cos(_),c.y=e*Math.sin(_),d.subVectors(h,c).normalize(),l.push(d.x,d.y,d.z),u.push(g/s),u.push(f/n)}for(let f=1;f<=n;f++)for(let g=1;g<=s;g++){const _=(s+1)*f+g-1,m=(s+1)*(f-1)+g-1,p=(s+1)*(f-1)+g,S=(s+1)*f+g;a.push(_,m,S),a.push(m,p,S)}this.setIndex(a),this.setAttribute("position",new ut(o,3)),this.setAttribute("normal",new ut(l,3)),this.setAttribute("uv",new ut(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new bs(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class Wi extends vn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Pe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Pe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Zl,this.normalScale=new De(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Mn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class fn extends Wi{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new De(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return ke(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Pe(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Pe(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Pe(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class gf extends vn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=id,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class _f extends vn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}function sr(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function vf(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function xf(i){function e(s,r){return i[s]-i[r]}const t=i.length,n=new Array(t);for(let s=0;s!==t;++s)n[s]=s;return n.sort(e),n}function Oc(i,e,t){const n=i.length,s=new i.constructor(n);for(let r=0,a=0;a!==n;++r){const o=t[r]*e;for(let l=0;l!==e;++l)s[a++]=i[o+l]}return s}function pu(i,e,t,n){let s=1,r=i[0];for(;r!==void 0&&r[n]===void 0;)r=i[s++];if(r===void 0)return;let a=r[n];if(a!==void 0)if(Array.isArray(a))do a=r[n],a!==void 0&&(e.push(r.time),t.push(...a)),r=i[s++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[n],a!==void 0&&(e.push(r.time),a.toArray(t,t.length)),r=i[s++];while(r!==void 0);else do a=r[n],a!==void 0&&(e.push(r.time),t.push(a)),r=i[s++];while(r!==void 0)}class As{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,s=t[n],r=t[n-1];n:{e:{let a;t:{i:if(!(e<s)){for(let o=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=t[++n],e<s)break e}a=t.length;break t}if(!(e>=r)){const o=t[1];e<o&&(n=2,r=o);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=t[--n-1],e>=r)break e}a=n,n=0;break t}break n}for(;n<a;){const o=n+a>>>1;e<t[o]?a=o:n=o+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let a=0;a!==s;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class Mf extends As{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:ec,endingEnd:ec}}intervalChanged_(e,t,n){const s=this.parameterPositions;let r=e-2,a=e+1,o=s[r],l=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case tc:r=e,o=2*t-n;break;case nc:r=s.length-2,o=t+s[r]-s[r+1];break;default:r=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case tc:a=e,l=2*n-t;break;case nc:a=1,l=n+s[1]-s[0];break;default:a=e-1,l=t}const u=(n-t)*.5,c=this.valueSize;this._weightPrev=u/(t-o),this._weightNext=u/(l-n),this._offsetPrev=r*c,this._offsetNext=a*c}interpolate_(e,t,n,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,u=l-o,c=this._offsetPrev,h=this._offsetNext,d=this._weightPrev,f=this._weightNext,g=(n-t)/(s-t),_=g*g,m=_*g,p=-d*m+2*d*_-d*g,S=(1+d)*m+(-1.5-2*d)*_+(-.5+d)*g+1,b=(-1-f)*m+(1.5+f)*_+.5*g,M=f*m-f*_;for(let L=0;L!==o;++L)r[L]=p*a[c+L]+S*a[u+L]+b*a[l+L]+M*a[h+L];return r}}class yf extends As{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,u=l-o,c=(n-t)/(s-t),h=1-c;for(let d=0;d!==o;++d)r[d]=a[u+d]*h+a[l+d]*c;return r}}class Sf extends As{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}}class pn{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=sr(t,this.TimeBufferType),this.values=sr(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:sr(e.times,Array),values:sr(e.values,Array)};const s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Sf(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new yf(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Mf(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Ss:t=this.InterpolantFactoryMethodDiscrete;break;case Es:t=this.InterpolantFactoryMethodLinear;break;case Dr:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ss;case this.InterpolantFactoryMethodLinear:return Es;case this.InterpolantFactoryMethodSmooth:return Dr}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e}return this}trim(e,t){const n=this.times,s=n.length;let r=0,a=s-1;for(;r!==s&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);const o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){const l=n[o];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(s!==void 0&&vf(s))for(let o=0,l=s.length;o!==l;++o){const u=s[o];if(isNaN(u)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,u),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Dr,r=e.length-1;let a=1;for(let o=1;o<r;++o){let l=!1;const u=e[o],c=e[o+1];if(u!==c&&(o!==1||u!==e[0]))if(s)l=!0;else{const h=o*n,d=h-n,f=h+n;for(let g=0;g!==n;++g){const _=t[h+g];if(_!==t[d+g]||_!==t[f+g]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];const h=o*n,d=a*n;for(let f=0;f!==n;++f)t[d+f]=t[h+f]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,l=a*n,u=0;u!==n;++u)t[l+u]=t[o+u];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}}pn.prototype.ValueTypeName="";pn.prototype.TimeBufferType=Float32Array;pn.prototype.ValueBufferType=Float32Array;pn.prototype.DefaultInterpolation=Es;class Ki extends pn{constructor(e,t,n){super(e,t,n)}}Ki.prototype.ValueTypeName="bool";Ki.prototype.ValueBufferType=Array;Ki.prototype.DefaultInterpolation=Ss;Ki.prototype.InterpolantFactoryMethodLinear=void 0;Ki.prototype.InterpolantFactoryMethodSmooth=void 0;class mu extends pn{constructor(e,t,n,s){super(e,t,n,s)}}mu.prototype.ValueTypeName="color";class Xi extends pn{constructor(e,t,n,s){super(e,t,n,s)}}Xi.prototype.ValueTypeName="number";class Ef extends As{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-t)/(s-t);let u=e*o;for(let c=u+o;u!==c;u+=4)qn.slerpFlat(r,0,a,u-o,a,u,l);return r}}class $i extends pn{constructor(e,t,n,s){super(e,t,n,s)}InterpolantFactoryMethodLinear(e){return new Ef(this.times,this.values,this.getValueSize(),e)}}$i.prototype.ValueTypeName="quaternion";$i.prototype.InterpolantFactoryMethodSmooth=void 0;class ji extends pn{constructor(e,t,n){super(e,t,n)}}ji.prototype.ValueTypeName="string";ji.prototype.ValueBufferType=Array;ji.prototype.DefaultInterpolation=Ss;ji.prototype.InterpolantFactoryMethodLinear=void 0;ji.prototype.InterpolantFactoryMethodSmooth=void 0;class qi extends pn{constructor(e,t,n,s){super(e,t,n,s)}}qi.prototype.ValueTypeName="vector";class Tf{constructor(e="",t=-1,n=[],s=td){this.name=e,this.tracks=n,this.duration=t,this.blendMode=s,this.uuid=hn(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,s=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(wf(n[a]).scale(s));const r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r}static toJSON(e){const t=[],n=e.tracks,s={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let r=0,a=n.length;r!==a;++r)t.push(pn.toJSON(n[r]));return s}static CreateFromMorphTargetSequence(e,t,n,s){const r=t.length,a=[];for(let o=0;o<r;o++){let l=[],u=[];l.push((o+r-1)%r,o,(o+1)%r),u.push(0,1,0);const c=xf(l);l=Oc(l,1,c),u=Oc(u,1,c),!s&&l[0]===0&&(l.push(r),u.push(u[0])),a.push(new Xi(".morphTargetInfluences["+t[o].name+"]",l,u).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const s=e;n=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<n.length;s++)if(n[s].name===t)return n[s];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const s={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,l=e.length;o<l;o++){const u=e[o],c=u.name.match(r);if(c&&c.length>1){const h=c[1];let d=s[h];d||(s[h]=d=[]),d.push(u)}}const a=[];for(const o in s)a.push(this.CreateFromMorphTargetSequence(o,s[o],t,n));return a}static parseAnimation(e,t){if(console.warn("THREE.AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(h,d,f,g,_){if(f.length!==0){const m=[],p=[];pu(f,m,p,g),m.length!==0&&_.push(new h(d,m,p))}},s=[],r=e.name||"default",a=e.fps||30,o=e.blendMode;let l=e.length||-1;const u=e.hierarchy||[];for(let h=0;h<u.length;h++){const d=u[h].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const f={};let g;for(g=0;g<d.length;g++)if(d[g].morphTargets)for(let _=0;_<d[g].morphTargets.length;_++)f[d[g].morphTargets[_]]=-1;for(const _ in f){const m=[],p=[];for(let S=0;S!==d[g].morphTargets.length;++S){const b=d[g];m.push(b.time),p.push(b.morphTarget===_?1:0)}s.push(new Xi(".morphTargetInfluence["+_+"]",m,p))}l=f.length*a}else{const f=".bones["+t[h].name+"]";n(qi,f+".position",d,"pos",s),n($i,f+".quaternion",d,"rot",s),n(qi,f+".scale",d,"scl",s)}}return s.length===0?null:new this(r,l,s,o)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,s=e.length;n!==s;++n){const r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function bf(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Xi;case"vector":case"vector2":case"vector3":case"vector4":return qi;case"color":return mu;case"quaternion":return $i;case"bool":case"boolean":return Ki;case"string":return ji}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function wf(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=bf(i.type);if(i.times===void 0){const t=[],n=[];pu(i.keys,t,n,"value"),i.times=t,i.values=n}return e.parse!==void 0?e.parse(i):new e(i.name,i.times,i.values,i.interpolation)}const In={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class Af{constructor(e,t,n){const s=this;let r=!1,a=0,o=0,l;const u=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(c){o++,r===!1&&s.onStart!==void 0&&s.onStart(c,a,o),r=!0},this.itemEnd=function(c){a++,s.onProgress!==void 0&&s.onProgress(c,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(c){s.onError!==void 0&&s.onError(c)},this.resolveURL=function(c){return l?l(c):c},this.setURLModifier=function(c){return l=c,this},this.addHandler=function(c,h){return u.push(c,h),this},this.removeHandler=function(c){const h=u.indexOf(c);return h!==-1&&u.splice(h,2),this},this.getHandler=function(c){for(let h=0,d=u.length;h<d;h+=2){const f=u[h],g=u[h+1];if(f.global&&(f.lastIndex=0),f.test(c))return g}return null}}}const Rf=new Af;class Zi{constructor(e){this.manager=e!==void 0?e:Rf,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}Zi.DEFAULT_MATERIAL_NAME="__DEFAULT";const An={};class Cf extends Error{constructor(e,t){super(e),this.response=t}}class gu extends Zi{constructor(e){super(e),this.mimeType="",this.responseType=""}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=In.get(`file:${e}`);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(An[e]!==void 0){An[e].push({onLoad:t,onProgress:n,onError:s});return}An[e]=[],An[e].push({onLoad:t,onProgress:n,onError:s});const a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),o=this.mimeType,l=this.responseType;fetch(a).then(u=>{if(u.status===200||u.status===0){if(u.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||u.body===void 0||u.body.getReader===void 0)return u;const c=An[e],h=u.body.getReader(),d=u.headers.get("X-File-Size")||u.headers.get("Content-Length"),f=d?parseInt(d):0,g=f!==0;let _=0;const m=new ReadableStream({start(p){S();function S(){h.read().then(({done:b,value:M})=>{if(b)p.close();else{_+=M.byteLength;const L=new ProgressEvent("progress",{lengthComputable:g,loaded:_,total:f});for(let R=0,w=c.length;R<w;R++){const A=c[R];A.onProgress&&A.onProgress(L)}p.enqueue(M),S()}},b=>{p.error(b)})}}});return new Response(m)}else throw new Cf(`fetch for "${u.url}" responded with ${u.status}: ${u.statusText}`,u)}).then(u=>{switch(l){case"arraybuffer":return u.arrayBuffer();case"blob":return u.blob();case"document":return u.text().then(c=>new DOMParser().parseFromString(c,o));case"json":return u.json();default:if(o==="")return u.text();{const h=/charset="?([^;"\s]*)"?/i.exec(o),d=h&&h[1]?h[1].toLowerCase():void 0,f=new TextDecoder(d);return u.arrayBuffer().then(g=>f.decode(g))}}}).then(u=>{In.add(`file:${e}`,u);const c=An[e];delete An[e];for(let h=0,d=c.length;h<d;h++){const f=c[h];f.onLoad&&f.onLoad(u)}}).catch(u=>{const c=An[e];if(c===void 0)throw this.manager.itemError(e),u;delete An[e];for(let h=0,d=c.length;h<d;h++){const f=c[h];f.onError&&f.onError(u)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}const Ri=new WeakMap;class Pf extends Zi{constructor(e){super(e)}load(e,t,n,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=In.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);else{let h=Ri.get(a);h===void 0&&(h=[],Ri.set(a,h)),h.push({onLoad:t,onError:s})}return a}const o=Ts("img");function l(){c(),t&&t(this);const h=Ri.get(this)||[];for(let d=0;d<h.length;d++){const f=h[d];f.onLoad&&f.onLoad(this)}Ri.delete(this),r.manager.itemEnd(e)}function u(h){c(),s&&s(h),In.remove(`image:${e}`);const d=Ri.get(this)||[];for(let f=0;f<d.length;f++){const g=d[f];g.onError&&g.onError(h)}Ri.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function c(){o.removeEventListener("load",l,!1),o.removeEventListener("error",u,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",u,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),In.add(`image:${e}`,o),r.manager.itemStart(e),o.src=e,o}}class Lf extends Zi{constructor(e){super(e)}load(e,t,n,s){const r=new bt,a=new Pf(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},n,s),r}}class wr extends dt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Pe(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class Bc extends wr{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(dt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Pe(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const ra=new Fe,kc=new U,zc=new U;class Lo{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new De(512,512),this.mapType=xn,this.map=null,this.mapPass=null,this.matrix=new Fe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new bo,this._frameExtents=new De(1,1),this._viewportCount=1,this._viewports=[new Qe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;kc.setFromMatrixPosition(e.matrixWorld),t.position.copy(kc),zc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(zc),t.updateMatrixWorld(),ra.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ra),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(ra)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class If extends Lo{constructor(){super(new Nt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,n=Hi*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(n!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class Df extends wr{constructor(e,t,n=0,s=Math.PI/3,r=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(dt.DEFAULT_UP),this.updateMatrix(),this.target=new dt,this.distance=n,this.angle=s,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new If}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const Hc=new Fe,us=new U,aa=new U;class Nf extends Lo{constructor(){super(new Nt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new De(4,2),this._viewportCount=6,this._viewports=[new Qe(2,1,1,1),new Qe(0,1,1,1),new Qe(3,1,1,1),new Qe(1,1,1,1),new Qe(3,0,1,1),new Qe(1,0,1,1)],this._cubeDirections=[new U(1,0,0),new U(-1,0,0),new U(0,0,1),new U(0,0,-1),new U(0,1,0),new U(0,-1,0)],this._cubeUps=[new U(0,1,0),new U(0,1,0),new U(0,1,0),new U(0,1,0),new U(0,0,1),new U(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,s=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),us.setFromMatrixPosition(e.matrixWorld),n.position.copy(us),aa.copy(n.position),aa.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(aa),n.updateMatrixWorld(),s.makeTranslation(-us.x,-us.y,-us.z),Hc.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Hc)}}class _u extends wr{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Nf}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class Ar extends au{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,a=n+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const u=(this.right-this.left)/this.view.fullWidth/this.zoom,c=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=u*this.view.offsetX,a=r+u*this.view.width,o-=c*this.view.offsetY,l=o-c*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Uf extends Lo{constructor(){super(new Ar(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class mr extends wr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(dt.DEFAULT_UP),this.updateMatrix(),this.target=new dt,this.shadow=new Uf}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class _s{static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}const oa=new WeakMap;class Ff extends Zi{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=In.get(`image-bitmap:${e}`);if(a!==void 0){if(r.manager.itemStart(e),a.then){a.then(u=>{if(oa.has(a)===!0)s&&s(oa.get(a)),r.manager.itemError(e),r.manager.itemEnd(e);else return t&&t(u),r.manager.itemEnd(e),u});return}return setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0),a}const o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader;const l=fetch(e,o).then(function(u){return u.blob()}).then(function(u){return createImageBitmap(u,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(u){return In.add(`image-bitmap:${e}`,u),t&&t(u),r.manager.itemEnd(e),u}).catch(function(u){s&&s(u),oa.set(l,u),In.remove(`image-bitmap:${e}`),r.manager.itemError(e),r.manager.itemEnd(e)});In.add(`image-bitmap:${e}`,l),r.manager.itemStart(e)}}class Of extends Nt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const Io="\\[\\]\\.:\\/",Bf=new RegExp("["+Io+"]","g"),Do="[^"+Io+"]",kf="[^"+Io.replace("\\.","")+"]",zf=/((?:WC+[\/:])*)/.source.replace("WC",Do),Hf=/(WCOD+)?/.source.replace("WCOD",kf),Vf=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Do),Gf=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Do),Wf=new RegExp("^"+zf+Hf+Vf+Gf+"$"),Xf=["material","materials","bones","map"];class $f{constructor(e,t,n){const s=n||it.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class it{constructor(e,t,n){this.path=t,this.parsedPath=n||it.parseTrackName(t),this.node=it.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new it.Composite(e,t,n):new it(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Bf,"")}static parseTrackName(e){const t=Wf.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){const r=n.nodeName.substring(s+1);Xf.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(r){for(let a=0;a<r.length;a++){const o=r[a];if(o.name===t||o.uuid===t)return o;const l=n(o.children);if(l)return l}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,s=t.propertyName;let r=t.propertyIndex;if(e||(e=it.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let u=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let c=0;c<e.length;c++)if(e[c].name===u){u=c;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(u!==void 0){if(e[u]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[u]}}const a=e[s];if(a===void 0){const u=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+u+"."+s+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}it.Composite=$f;it.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};it.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};it.prototype.GetterByBindingType=[it.prototype._getValue_direct,it.prototype._getValue_array,it.prototype._getValue_arrayElement,it.prototype._getValue_toArray];it.prototype.SetterByBindingTypeAndVersioning=[[it.prototype._setValue_direct,it.prototype._setValue_direct_setNeedsUpdate,it.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[it.prototype._setValue_array,it.prototype._setValue_array_setNeedsUpdate,it.prototype._setValue_array_setMatrixWorldNeedsUpdate],[it.prototype._setValue_arrayElement,it.prototype._setValue_arrayElement_setNeedsUpdate,it.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[it.prototype._setValue_fromArray,it.prototype._setValue_fromArray_setNeedsUpdate,it.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];function Vc(i,e,t,n){const s=qf(n);switch(t){case $l:return i*e;case _o:return i*e/s.components*s.byteLength;case vo:return i*e/s.components*s.byteLength;case Yl:return i*e*2/s.components*s.byteLength;case xo:return i*e*2/s.components*s.byteLength;case ql:return i*e*3/s.components*s.byteLength;case en:return i*e*4/s.components*s.byteLength;case Mo:return i*e*4/s.components*s.byteLength;case ur:case hr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case dr:case fr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ia:case Na:return Math.max(i,16)*Math.max(e,8)/4;case La:case Da:return Math.max(i,8)*Math.max(e,8)/2;case Ua:case Fa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Oa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ba:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ka:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case za:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Ha:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Va:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Ga:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Wa:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Xa:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case $a:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case qa:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Ya:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Ka:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case ja:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Za:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case pr:case Ja:case Qa:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Kl:case eo:return Math.ceil(i/4)*Math.ceil(e/4)*8;case to:case no:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function qf(i){switch(i){case xn:case Gl:return{byteLength:1,components:1};case vs:case Wl:case ws:return{byteLength:2,components:1};case mo:case go:return{byteLength:2,components:4};case li:case po:case un:return{byteLength:4,components:1};case Xl:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:fo}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=fo);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function vu(){let i=null,e=!1,t=null,n=null;function s(r,a){t(r,a),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function Yf(i){const e=new WeakMap;function t(o,l){const u=o.array,c=o.usage,h=u.byteLength,d=i.createBuffer();i.bindBuffer(l,d),i.bufferData(l,u,c),o.onUploadCallback();let f;if(u instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&u instanceof Float16Array)f=i.HALF_FLOAT;else if(u instanceof Uint16Array)o.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(u instanceof Int16Array)f=i.SHORT;else if(u instanceof Uint32Array)f=i.UNSIGNED_INT;else if(u instanceof Int32Array)f=i.INT;else if(u instanceof Int8Array)f=i.BYTE;else if(u instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:d,type:f,bytesPerElement:u.BYTES_PER_ELEMENT,version:o.version,size:h}}function n(o,l,u){const c=l.array,h=l.updateRanges;if(i.bindBuffer(u,o),h.length===0)i.bufferSubData(u,0,c);else{h.sort((f,g)=>f.start-g.start);let d=0;for(let f=1;f<h.length;f++){const g=h[d],_=h[f];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++d,h[d]=_)}h.length=d+1;for(let f=0,g=h.length;f<g;f++){const _=h[f];i.bufferSubData(u,_.start*c.BYTES_PER_ELEMENT,c,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(i.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const c=e.get(o);(!c||c.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const u=e.get(o);if(u===void 0)e.set(o,t(o,l));else if(u.version<o.version){if(u.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(u.buffer,o,l),u.version=o.version}}return{get:s,remove:r,update:a}}var Kf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,jf=`#ifdef USE_ALPHAHASH
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
#endif`,Zf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Jf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Qf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,ep=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,tp=`#ifdef USE_AOMAP
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
#endif`,np=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,ip=`#ifdef USE_BATCHING
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
#endif`,sp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,rp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,ap=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,op=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,cp=`#ifdef USE_IRIDESCENCE
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
#endif`,lp=`#ifdef USE_BUMPMAP
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
#endif`,up=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,hp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,dp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,fp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,pp=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,mp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,gp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,_p=`#if defined( USE_COLOR_ALPHA )
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
#endif`,vp=`#define PI 3.141592653589793
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
} // validated`,xp=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Mp=`vec3 transformedNormal = objectNormal;
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
#endif`,yp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Sp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Ep=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Tp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,bp="gl_FragColor = linearToOutputTexel( gl_FragColor );",wp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Ap=`#ifdef USE_ENVMAP
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
#endif`,Rp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Cp=`#ifdef USE_ENVMAP
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
#endif`,Pp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Lp=`#ifdef USE_ENVMAP
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
#endif`,Ip=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Dp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Np=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Up=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Fp=`#ifdef USE_GRADIENTMAP
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
}`,Op=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Bp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,kp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,zp=`uniform bool receiveShadow;
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
#endif`,Hp=`#ifdef USE_ENVMAP
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
#endif`,Vp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Gp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Wp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Xp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,$p=`PhysicalMaterial material;
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
#endif`,qp=`struct PhysicalMaterial {
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
}`,Yp=`
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
#endif`,Kp=`#if defined( RE_IndirectDiffuse )
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
#endif`,jp=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Zp=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Jp=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Qp=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,em=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,tm=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,nm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,im=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,sm=`#if defined( USE_POINTS_UV )
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
#endif`,rm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,am=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,om=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,cm=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,lm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,um=`#ifdef USE_MORPHTARGETS
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
#endif`,hm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,dm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,fm=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,pm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,mm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,gm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,_m=`#ifdef USE_NORMALMAP
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
#endif`,vm=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,xm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Mm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,ym=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Sm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Em=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Tm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,bm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,wm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Am=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Rm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Cm=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Pm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Lm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Im=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Dm=`float getShadowMask() {
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
}`,Nm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Um=`#ifdef USE_SKINNING
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
#endif`,Fm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Om=`#ifdef USE_SKINNING
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
#endif`,Bm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,km=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,zm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Hm=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Vm=`#ifdef USE_TRANSMISSION
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
#endif`,Gm=`#ifdef USE_TRANSMISSION
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
#endif`,Wm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Xm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,$m=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,qm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Ym=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Km=`uniform sampler2D t2D;
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
}`,jm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Zm=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Jm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Qm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,eg=`#include <common>
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
}`,tg=`#if DEPTH_PACKING == 3200
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
}`,ng=`#define DISTANCE
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
}`,ig=`#define DISTANCE
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
}`,sg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,rg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ag=`uniform float scale;
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
}`,og=`uniform vec3 diffuse;
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
}`,cg=`#include <common>
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
}`,lg=`uniform vec3 diffuse;
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
}`,ug=`#define LAMBERT
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
}`,hg=`#define LAMBERT
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
}`,dg=`#define MATCAP
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
}`,fg=`#define MATCAP
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
}`,pg=`#define NORMAL
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
}`,mg=`#define NORMAL
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
}`,gg=`#define PHONG
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
}`,_g=`#define PHONG
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
}`,vg=`#define STANDARD
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
}`,xg=`#define STANDARD
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
}`,Mg=`#define TOON
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
}`,yg=`#define TOON
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
}`,Sg=`uniform float size;
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
}`,Eg=`uniform vec3 diffuse;
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
}`,Tg=`#include <common>
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
}`,bg=`uniform vec3 color;
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
}`,wg=`uniform float rotation;
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
}`,Ag=`uniform vec3 diffuse;
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
}`,Oe={alphahash_fragment:Kf,alphahash_pars_fragment:jf,alphamap_fragment:Zf,alphamap_pars_fragment:Jf,alphatest_fragment:Qf,alphatest_pars_fragment:ep,aomap_fragment:tp,aomap_pars_fragment:np,batching_pars_vertex:ip,batching_vertex:sp,begin_vertex:rp,beginnormal_vertex:ap,bsdfs:op,iridescence_fragment:cp,bumpmap_pars_fragment:lp,clipping_planes_fragment:up,clipping_planes_pars_fragment:hp,clipping_planes_pars_vertex:dp,clipping_planes_vertex:fp,color_fragment:pp,color_pars_fragment:mp,color_pars_vertex:gp,color_vertex:_p,common:vp,cube_uv_reflection_fragment:xp,defaultnormal_vertex:Mp,displacementmap_pars_vertex:yp,displacementmap_vertex:Sp,emissivemap_fragment:Ep,emissivemap_pars_fragment:Tp,colorspace_fragment:bp,colorspace_pars_fragment:wp,envmap_fragment:Ap,envmap_common_pars_fragment:Rp,envmap_pars_fragment:Cp,envmap_pars_vertex:Pp,envmap_physical_pars_fragment:Hp,envmap_vertex:Lp,fog_vertex:Ip,fog_pars_vertex:Dp,fog_fragment:Np,fog_pars_fragment:Up,gradientmap_pars_fragment:Fp,lightmap_pars_fragment:Op,lights_lambert_fragment:Bp,lights_lambert_pars_fragment:kp,lights_pars_begin:zp,lights_toon_fragment:Vp,lights_toon_pars_fragment:Gp,lights_phong_fragment:Wp,lights_phong_pars_fragment:Xp,lights_physical_fragment:$p,lights_physical_pars_fragment:qp,lights_fragment_begin:Yp,lights_fragment_maps:Kp,lights_fragment_end:jp,logdepthbuf_fragment:Zp,logdepthbuf_pars_fragment:Jp,logdepthbuf_pars_vertex:Qp,logdepthbuf_vertex:em,map_fragment:tm,map_pars_fragment:nm,map_particle_fragment:im,map_particle_pars_fragment:sm,metalnessmap_fragment:rm,metalnessmap_pars_fragment:am,morphinstance_vertex:om,morphcolor_vertex:cm,morphnormal_vertex:lm,morphtarget_pars_vertex:um,morphtarget_vertex:hm,normal_fragment_begin:dm,normal_fragment_maps:fm,normal_pars_fragment:pm,normal_pars_vertex:mm,normal_vertex:gm,normalmap_pars_fragment:_m,clearcoat_normal_fragment_begin:vm,clearcoat_normal_fragment_maps:xm,clearcoat_pars_fragment:Mm,iridescence_pars_fragment:ym,opaque_fragment:Sm,packing:Em,premultiplied_alpha_fragment:Tm,project_vertex:bm,dithering_fragment:wm,dithering_pars_fragment:Am,roughnessmap_fragment:Rm,roughnessmap_pars_fragment:Cm,shadowmap_pars_fragment:Pm,shadowmap_pars_vertex:Lm,shadowmap_vertex:Im,shadowmask_pars_fragment:Dm,skinbase_vertex:Nm,skinning_pars_vertex:Um,skinning_vertex:Fm,skinnormal_vertex:Om,specularmap_fragment:Bm,specularmap_pars_fragment:km,tonemapping_fragment:zm,tonemapping_pars_fragment:Hm,transmission_fragment:Vm,transmission_pars_fragment:Gm,uv_pars_fragment:Wm,uv_pars_vertex:Xm,uv_vertex:$m,worldpos_vertex:qm,background_vert:Ym,background_frag:Km,backgroundCube_vert:jm,backgroundCube_frag:Zm,cube_vert:Jm,cube_frag:Qm,depth_vert:eg,depth_frag:tg,distanceRGBA_vert:ng,distanceRGBA_frag:ig,equirect_vert:sg,equirect_frag:rg,linedashed_vert:ag,linedashed_frag:og,meshbasic_vert:cg,meshbasic_frag:lg,meshlambert_vert:ug,meshlambert_frag:hg,meshmatcap_vert:dg,meshmatcap_frag:fg,meshnormal_vert:pg,meshnormal_frag:mg,meshphong_vert:gg,meshphong_frag:_g,meshphysical_vert:vg,meshphysical_frag:xg,meshtoon_vert:Mg,meshtoon_frag:yg,points_vert:Sg,points_frag:Eg,shadow_vert:Tg,shadow_frag:bg,sprite_vert:wg,sprite_frag:Ag},ue={common:{diffuse:{value:new Pe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ue},alphaMap:{value:null},alphaMapTransform:{value:new Ue},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ue}},envmap:{envMap:{value:null},envMapRotation:{value:new Ue},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ue}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ue}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ue},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ue},normalScale:{value:new De(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ue},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ue}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ue}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ue}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Pe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Pe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ue},alphaTest:{value:0},uvTransform:{value:new Ue}},sprite:{diffuse:{value:new Pe(16777215)},opacity:{value:1},center:{value:new De(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ue},alphaMap:{value:null},alphaMapTransform:{value:new Ue},alphaTest:{value:0}}},gn={basic:{uniforms:Dt([ue.common,ue.specularmap,ue.envmap,ue.aomap,ue.lightmap,ue.fog]),vertexShader:Oe.meshbasic_vert,fragmentShader:Oe.meshbasic_frag},lambert:{uniforms:Dt([ue.common,ue.specularmap,ue.envmap,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.fog,ue.lights,{emissive:{value:new Pe(0)}}]),vertexShader:Oe.meshlambert_vert,fragmentShader:Oe.meshlambert_frag},phong:{uniforms:Dt([ue.common,ue.specularmap,ue.envmap,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.fog,ue.lights,{emissive:{value:new Pe(0)},specular:{value:new Pe(1118481)},shininess:{value:30}}]),vertexShader:Oe.meshphong_vert,fragmentShader:Oe.meshphong_frag},standard:{uniforms:Dt([ue.common,ue.envmap,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.roughnessmap,ue.metalnessmap,ue.fog,ue.lights,{emissive:{value:new Pe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Oe.meshphysical_vert,fragmentShader:Oe.meshphysical_frag},toon:{uniforms:Dt([ue.common,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.gradientmap,ue.fog,ue.lights,{emissive:{value:new Pe(0)}}]),vertexShader:Oe.meshtoon_vert,fragmentShader:Oe.meshtoon_frag},matcap:{uniforms:Dt([ue.common,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.fog,{matcap:{value:null}}]),vertexShader:Oe.meshmatcap_vert,fragmentShader:Oe.meshmatcap_frag},points:{uniforms:Dt([ue.points,ue.fog]),vertexShader:Oe.points_vert,fragmentShader:Oe.points_frag},dashed:{uniforms:Dt([ue.common,ue.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Oe.linedashed_vert,fragmentShader:Oe.linedashed_frag},depth:{uniforms:Dt([ue.common,ue.displacementmap]),vertexShader:Oe.depth_vert,fragmentShader:Oe.depth_frag},normal:{uniforms:Dt([ue.common,ue.bumpmap,ue.normalmap,ue.displacementmap,{opacity:{value:1}}]),vertexShader:Oe.meshnormal_vert,fragmentShader:Oe.meshnormal_frag},sprite:{uniforms:Dt([ue.sprite,ue.fog]),vertexShader:Oe.sprite_vert,fragmentShader:Oe.sprite_frag},background:{uniforms:{uvTransform:{value:new Ue},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Oe.background_vert,fragmentShader:Oe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ue}},vertexShader:Oe.backgroundCube_vert,fragmentShader:Oe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Oe.cube_vert,fragmentShader:Oe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Oe.equirect_vert,fragmentShader:Oe.equirect_frag},distanceRGBA:{uniforms:Dt([ue.common,ue.displacementmap,{referencePosition:{value:new U},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Oe.distanceRGBA_vert,fragmentShader:Oe.distanceRGBA_frag},shadow:{uniforms:Dt([ue.lights,ue.fog,{color:{value:new Pe(0)},opacity:{value:1}}]),vertexShader:Oe.shadow_vert,fragmentShader:Oe.shadow_frag}};gn.physical={uniforms:Dt([gn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ue},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ue},clearcoatNormalScale:{value:new De(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ue},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ue},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ue},sheen:{value:0},sheenColor:{value:new Pe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ue},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ue},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ue},transmissionSamplerSize:{value:new De},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ue},attenuationDistance:{value:0},attenuationColor:{value:new Pe(0)},specularColor:{value:new Pe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ue},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ue},anisotropyVector:{value:new De},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ue}}]),vertexShader:Oe.meshphysical_vert,fragmentShader:Oe.meshphysical_frag};const rr={r:0,b:0,g:0},Qn=new Mn,Rg=new Fe;function Cg(i,e,t,n,s,r,a){const o=new Pe(0);let l=r===!0?0:1,u,c,h=null,d=0,f=null;function g(b){let M=b.isScene===!0?b.background:null;return M&&M.isTexture&&(M=(b.backgroundBlurriness>0?t:e).get(M)),M}function _(b){let M=!1;const L=g(b);L===null?p(o,l):L&&L.isColor&&(p(L,1),M=!0);const R=i.xr.getEnvironmentBlendMode();R==="additive"?n.buffers.color.setClear(0,0,0,1,a):R==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||M)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(b,M){const L=g(M);L&&(L.isCubeTexture||L.mapping===Tr)?(c===void 0&&(c=new Ke(new Qt(1,1,1),new $n({name:"BackgroundCubeMaterial",uniforms:Vi(gn.backgroundCube.uniforms),vertexShader:gn.backgroundCube.vertexShader,fragmentShader:gn.backgroundCube.fragmentShader,side:Ct,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(R,w,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(c)),Qn.copy(M.backgroundRotation),Qn.x*=-1,Qn.y*=-1,Qn.z*=-1,L.isCubeTexture&&L.isRenderTargetTexture===!1&&(Qn.y*=-1,Qn.z*=-1),c.material.uniforms.envMap.value=L,c.material.uniforms.flipEnvMap.value=L.isCubeTexture&&L.isRenderTargetTexture===!1?-1:1,c.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Rg.makeRotationFromEuler(Qn)),c.material.toneMapped=qe.getTransfer(L.colorSpace)!==at,(h!==L||d!==L.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,h=L,d=L.version,f=i.toneMapping),c.layers.enableAll(),b.unshift(c,c.geometry,c.material,0,0,null)):L&&L.isTexture&&(u===void 0&&(u=new Ke(new Gi(2,2),new $n({name:"BackgroundMaterial",uniforms:Vi(gn.background.uniforms),vertexShader:gn.background.vertexShader,fragmentShader:gn.background.fragmentShader,side:Nn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),Object.defineProperty(u.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(u)),u.material.uniforms.t2D.value=L,u.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,u.material.toneMapped=qe.getTransfer(L.colorSpace)!==at,L.matrixAutoUpdate===!0&&L.updateMatrix(),u.material.uniforms.uvTransform.value.copy(L.matrix),(h!==L||d!==L.version||f!==i.toneMapping)&&(u.material.needsUpdate=!0,h=L,d=L.version,f=i.toneMapping),u.layers.enableAll(),b.unshift(u,u.geometry,u.material,0,0,null))}function p(b,M){b.getRGB(rr,ru(i)),n.buffers.color.setClear(rr.r,rr.g,rr.b,M,a)}function S(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0)}return{getClearColor:function(){return o},setClearColor:function(b,M=1){o.set(b),l=M,p(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(b){l=b,p(o,l)},render:_,addToRenderList:m,dispose:S}}function Pg(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null);let r=s,a=!1;function o(x,I,z,B,Y){let Z=!1;const K=h(B,z,I);r!==K&&(r=K,u(r.object)),Z=f(x,B,z,Y),Z&&g(x,B,z,Y),Y!==null&&e.update(Y,i.ELEMENT_ARRAY_BUFFER),(Z||a)&&(a=!1,M(x,I,z,B),Y!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(Y).buffer))}function l(){return i.createVertexArray()}function u(x){return i.bindVertexArray(x)}function c(x){return i.deleteVertexArray(x)}function h(x,I,z){const B=z.wireframe===!0;let Y=n[x.id];Y===void 0&&(Y={},n[x.id]=Y);let Z=Y[I.id];Z===void 0&&(Z={},Y[I.id]=Z);let K=Z[B];return K===void 0&&(K=d(l()),Z[B]=K),K}function d(x){const I=[],z=[],B=[];for(let Y=0;Y<t;Y++)I[Y]=0,z[Y]=0,B[Y]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:z,attributeDivisors:B,object:x,attributes:{},index:null}}function f(x,I,z,B){const Y=r.attributes,Z=I.attributes;let K=0;const te=z.getAttributes();for(const $ in te)if(te[$].location>=0){const _e=Y[$];let Te=Z[$];if(Te===void 0&&($==="instanceMatrix"&&x.instanceMatrix&&(Te=x.instanceMatrix),$==="instanceColor"&&x.instanceColor&&(Te=x.instanceColor)),_e===void 0||_e.attribute!==Te||Te&&_e.data!==Te.data)return!0;K++}return r.attributesNum!==K||r.index!==B}function g(x,I,z,B){const Y={},Z=I.attributes;let K=0;const te=z.getAttributes();for(const $ in te)if(te[$].location>=0){let _e=Z[$];_e===void 0&&($==="instanceMatrix"&&x.instanceMatrix&&(_e=x.instanceMatrix),$==="instanceColor"&&x.instanceColor&&(_e=x.instanceColor));const Te={};Te.attribute=_e,_e&&_e.data&&(Te.data=_e.data),Y[$]=Te,K++}r.attributes=Y,r.attributesNum=K,r.index=B}function _(){const x=r.newAttributes;for(let I=0,z=x.length;I<z;I++)x[I]=0}function m(x){p(x,0)}function p(x,I){const z=r.newAttributes,B=r.enabledAttributes,Y=r.attributeDivisors;z[x]=1,B[x]===0&&(i.enableVertexAttribArray(x),B[x]=1),Y[x]!==I&&(i.vertexAttribDivisor(x,I),Y[x]=I)}function S(){const x=r.newAttributes,I=r.enabledAttributes;for(let z=0,B=I.length;z<B;z++)I[z]!==x[z]&&(i.disableVertexAttribArray(z),I[z]=0)}function b(x,I,z,B,Y,Z,K){K===!0?i.vertexAttribIPointer(x,I,z,Y,Z):i.vertexAttribPointer(x,I,z,B,Y,Z)}function M(x,I,z,B){_();const Y=B.attributes,Z=z.getAttributes(),K=I.defaultAttributeValues;for(const te in Z){const $=Z[te];if($.location>=0){let he=Y[te];if(he===void 0&&(te==="instanceMatrix"&&x.instanceMatrix&&(he=x.instanceMatrix),te==="instanceColor"&&x.instanceColor&&(he=x.instanceColor)),he!==void 0){const _e=he.normalized,Te=he.itemSize,Be=e.get(he);if(Be===void 0)continue;const tt=Be.buffer,q=Be.type,oe=Be.bytesPerElement,Ee=q===i.INT||q===i.UNSIGNED_INT||he.gpuType===po;if(he.isInterleavedBufferAttribute){const fe=he.data,be=fe.stride,Ye=he.offset;if(fe.isInstancedInterleavedBuffer){for(let Me=0;Me<$.locationSize;Me++)p($.location+Me,fe.meshPerAttribute);x.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=fe.meshPerAttribute*fe.count)}else for(let Me=0;Me<$.locationSize;Me++)m($.location+Me);i.bindBuffer(i.ARRAY_BUFFER,tt);for(let Me=0;Me<$.locationSize;Me++)b($.location+Me,Te/$.locationSize,q,_e,be*oe,(Ye+Te/$.locationSize*Me)*oe,Ee)}else{if(he.isInstancedBufferAttribute){for(let fe=0;fe<$.locationSize;fe++)p($.location+fe,he.meshPerAttribute);x.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=he.meshPerAttribute*he.count)}else for(let fe=0;fe<$.locationSize;fe++)m($.location+fe);i.bindBuffer(i.ARRAY_BUFFER,tt);for(let fe=0;fe<$.locationSize;fe++)b($.location+fe,Te/$.locationSize,q,_e,Te*oe,Te/$.locationSize*fe*oe,Ee)}}else if(K!==void 0){const _e=K[te];if(_e!==void 0)switch(_e.length){case 2:i.vertexAttrib2fv($.location,_e);break;case 3:i.vertexAttrib3fv($.location,_e);break;case 4:i.vertexAttrib4fv($.location,_e);break;default:i.vertexAttrib1fv($.location,_e)}}}}S()}function L(){A();for(const x in n){const I=n[x];for(const z in I){const B=I[z];for(const Y in B)c(B[Y].object),delete B[Y];delete I[z]}delete n[x]}}function R(x){if(n[x.id]===void 0)return;const I=n[x.id];for(const z in I){const B=I[z];for(const Y in B)c(B[Y].object),delete B[Y];delete I[z]}delete n[x.id]}function w(x){for(const I in n){const z=n[I];if(z[x.id]===void 0)continue;const B=z[x.id];for(const Y in B)c(B[Y].object),delete B[Y];delete z[x.id]}}function A(){y(),a=!0,r!==s&&(r=s,u(r.object))}function y(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:A,resetDefaultState:y,dispose:L,releaseStatesOfGeometry:R,releaseStatesOfProgram:w,initAttributes:_,enableAttribute:m,disableUnusedAttributes:S}}function Lg(i,e,t){let n;function s(u){n=u}function r(u,c){i.drawArrays(n,u,c),t.update(c,n,1)}function a(u,c,h){h!==0&&(i.drawArraysInstanced(n,u,c,h),t.update(c,n,h))}function o(u,c,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,u,0,c,0,h);let f=0;for(let g=0;g<h;g++)f+=c[g];t.update(f,n,1)}function l(u,c,h,d){if(h===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<u.length;g++)a(u[g],c[g],d[g]);else{f.multiDrawArraysInstancedWEBGL(n,u,0,c,0,d,0,h);let g=0;for(let _=0;_<h;_++)g+=c[_]*d[_];t.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function Ig(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const w=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(w){return!(w!==en&&n.convert(w)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(w){const A=w===ws&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(w!==xn&&n.convert(w)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&w!==un&&!A)}function l(w){if(w==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let u=t.precision!==void 0?t.precision:"highp";const c=l(u);c!==u&&(console.warn("THREE.WebGLRenderer:",u,"not supported, using",c,"instead."),u=c);const h=t.logarithmicDepthBuffer===!0,d=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),S=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),b=i.getParameter(i.MAX_VARYING_VECTORS),M=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),L=g>0,R=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:u,logarithmicDepthBuffer:h,reverseDepthBuffer:d,maxTextures:f,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:S,maxVaryings:b,maxFragmentUniforms:M,vertexTextures:L,maxSamples:R}}function Dg(i){const e=this;let t=null,n=0,s=!1,r=!1;const a=new ii,o=new Ue,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){const f=h.length!==0||d||n!==0||s;return s=d,n=h.length,f},this.beginShadows=function(){r=!0,c(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,d){t=c(h,d,0)},this.setState=function(h,d,f){const g=h.clippingPlanes,_=h.clipIntersection,m=h.clipShadows,p=i.get(h);if(!s||g===null||g.length===0||r&&!m)r?c(null):u();else{const S=r?0:n,b=S*4;let M=p.clippingState||null;l.value=M,M=c(g,d,b,f);for(let L=0;L!==b;++L)M[L]=t[L];p.clippingState=M,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=S}};function u(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function c(h,d,f,g){const _=h!==null?h.length:0;let m=null;if(_!==0){if(m=l.value,g!==!0||m===null){const p=f+_*4,S=d.matrixWorldInverse;o.getNormalMatrix(S),(m===null||m.length<p)&&(m=new Float32Array(p));for(let b=0,M=f;b!==_;++b,M+=4)a.copy(h[b]).applyMatrix4(S,o),a.normal.toArray(m,M),m[M+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function Ng(i){let e=new WeakMap;function t(a,o){return o===Ca?a.mapping=Bi:o===Pa&&(a.mapping=ki),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===Ca||o===Pa)if(e.has(a)){const l=e.get(a).texture;return t(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const u=new nf(l.height);return u.fromEquirectangularTexture(i,a),e.set(a,u),a.addEventListener("dispose",s),t(u.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}const Ii=4,Gc=[.125,.215,.35,.446,.526,.582],ai=20,ca=new Ar,Wc=new Pe;let la=null,ua=0,ha=0,da=!1;const si=(1+Math.sqrt(5))/2,Ci=1/si,Xc=[new U(-si,Ci,0),new U(si,Ci,0),new U(-Ci,0,si),new U(Ci,0,si),new U(0,si,-Ci),new U(0,si,Ci),new U(-1,1,-1),new U(1,1,-1),new U(-1,1,1),new U(1,1,1)],Ug=new U;class co{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100,r={}){const{size:a=256,position:o=Ug}=r;la=this._renderer.getRenderTarget(),ua=this._renderer.getActiveCubeFace(),ha=this._renderer.getActiveMipmapLevel(),da=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,s,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Yc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=qc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(la,ua,ha),this._renderer.xr.enabled=da,e.scissorTest=!1,ar(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Bi||e.mapping===ki?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),la=this._renderer.getRenderTarget(),ua=this._renderer.getActiveCubeFace(),ha=this._renderer.getActiveMipmapLevel(),da=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Yt,minFilter:Yt,generateMipmaps:!1,type:ws,format:en,colorSpace:Bt,depthBuffer:!1},s=$c(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=$c(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Fg(r)),this._blurMaterial=Og(r,e,t)}return s}_compileMaterial(e){const t=new Ke(this._lodPlanes[0],e);this._renderer.compile(t,ca)}_sceneToCubeUV(e,t,n,s,r){const l=new Nt(90,1,t,n),u=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,f=h.toneMapping;h.getClearColor(Wc),h.toneMapping=Xn,h.autoClear=!1;const g=new Ut({name:"PMREM.Background",side:Ct,depthWrite:!1,depthTest:!1}),_=new Ke(new Qt,g);let m=!1;const p=e.background;p?p.isColor&&(g.color.copy(p),e.background=null,m=!0):(g.color.copy(Wc),m=!0);for(let S=0;S<6;S++){const b=S%3;b===0?(l.up.set(0,u[S],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+c[S],r.y,r.z)):b===1?(l.up.set(0,0,u[S]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+c[S],r.z)):(l.up.set(0,u[S],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+c[S]));const M=this._cubeSize;ar(s,b*M,S>2?M:0,M,M),h.setRenderTarget(s),m&&h.render(_,l),h.render(e,l)}_.geometry.dispose(),_.material.dispose(),h.toneMapping=f,h.autoClear=d,e.background=p}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===Bi||e.mapping===ki;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Yc()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=qc());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new Ke(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;const l=this._cubeSize;ar(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,ca)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=Xc[(s-r-1)%Xc.length];this._blur(e,r-1,r,a,o)}t.autoClear=n}_blur(e,t,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,s,"latitudinal",r),this._halfBlur(a,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,a,o){const l=this._renderer,u=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const c=3,h=new Ke(this._lodPlanes[s],u),d=u.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*ai-1),_=r/g,m=isFinite(r)?1+Math.floor(c*_):ai;m>ai&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ai}`);const p=[];let S=0;for(let w=0;w<ai;++w){const A=w/_,y=Math.exp(-A*A/2);p.push(y),w===0?S+=y:w<m&&(S+=2*y)}for(let w=0;w<p.length;w++)p[w]=p[w]/S;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:b}=this;d.dTheta.value=g,d.mipInt.value=b-n;const M=this._sizeLods[s],L=3*M*(s>b-Ii?s-b+Ii:0),R=4*(this._cubeSize-M);ar(t,L,R,3*M,2*M),l.setRenderTarget(t),l.render(h,ca)}}function Fg(i){const e=[],t=[],n=[];let s=i;const r=i-Ii+1+Gc.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);t.push(o);let l=1/o;a>i-Ii?l=Gc[a-i+Ii-1]:a===0&&(l=0),n.push(l);const u=1/(o-2),c=-u,h=1+u,d=[c,c,h,c,h,h,c,c,h,h,c,h],f=6,g=6,_=3,m=2,p=1,S=new Float32Array(_*g*f),b=new Float32Array(m*g*f),M=new Float32Array(p*g*f);for(let R=0;R<f;R++){const w=R%3*2/3-1,A=R>2?0:-1,y=[w,A,0,w+2/3,A,0,w+2/3,A+1,0,w,A,0,w+2/3,A+1,0,w,A+1,0];S.set(y,_*g*R),b.set(d,m*g*R);const x=[R,R,R,R,R,R];M.set(x,p*g*R)}const L=new Pt;L.setAttribute("position",new Ot(S,_)),L.setAttribute("uv",new Ot(b,m)),L.setAttribute("faceIndex",new Ot(M,p)),e.push(L),s>Ii&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function $c(i,e,t){const n=new ui(i,e,t);return n.texture.mapping=Tr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ar(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function Og(i,e,t){const n=new Float32Array(ai),s=new U(0,1,0);return new $n({name:"SphericalGaussianBlur",defines:{n:ai,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:No(),fragmentShader:`

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
		`,blending:Wn,depthTest:!1,depthWrite:!1})}function qc(){return new $n({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:No(),fragmentShader:`

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
		`,blending:Wn,depthTest:!1,depthWrite:!1})}function Yc(){return new $n({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:No(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Wn,depthTest:!1,depthWrite:!1})}function No(){return`

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
	`}function Bg(i){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const l=o.mapping,u=l===Ca||l===Pa,c=l===Bi||l===ki;if(u||c){let h=e.get(o);const d=h!==void 0?h.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==d)return t===null&&(t=new co(i)),h=u?t.fromEquirectangular(o,h):t.fromCubemap(o,h),h.texture.pmremVersion=o.pmremVersion,e.set(o,h),h.texture;if(h!==void 0)return h.texture;{const f=o.image;return u&&f&&f.height>0||c&&f&&s(f)?(t===null&&(t=new co(i)),h=u?t.fromEquirectangular(o):t.fromCubemap(o),h.texture.pmremVersion=o.pmremVersion,e.set(o,h),o.addEventListener("dispose",r),h.texture):null}}}return o}function s(o){let l=0;const u=6;for(let c=0;c<u;c++)o[c]!==void 0&&l++;return l===u}function r(o){const l=o.target;l.removeEventListener("dispose",r);const u=e.get(l);u!==void 0&&(e.delete(l),u.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function kg(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&Ni("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function zg(i,e,t,n){const s={},r=new WeakMap;function a(h){const d=h.target;d.index!==null&&e.remove(d.index);for(const g in d.attributes)e.remove(d.attributes[g]);d.removeEventListener("dispose",a),delete s[d.id];const f=r.get(d);f&&(e.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(h,d){return s[d.id]===!0||(d.addEventListener("dispose",a),s[d.id]=!0,t.memory.geometries++),d}function l(h){const d=h.attributes;for(const f in d)e.update(d[f],i.ARRAY_BUFFER)}function u(h){const d=[],f=h.index,g=h.attributes.position;let _=0;if(f!==null){const S=f.array;_=f.version;for(let b=0,M=S.length;b<M;b+=3){const L=S[b+0],R=S[b+1],w=S[b+2];d.push(L,R,R,w,w,L)}}else if(g!==void 0){const S=g.array;_=g.version;for(let b=0,M=S.length/3-1;b<M;b+=3){const L=b+0,R=b+1,w=b+2;d.push(L,R,R,w,w,L)}}else return;const m=new(Ql(d)?su:iu)(d,1);m.version=_;const p=r.get(h);p&&e.remove(p),r.set(h,m)}function c(h){const d=r.get(h);if(d){const f=h.index;f!==null&&d.version<f.version&&u(h)}else u(h);return r.get(h)}return{get:o,update:l,getWireframeAttribute:c}}function Hg(i,e,t){let n;function s(d){n=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function l(d,f){i.drawElements(n,f,r,d*a),t.update(f,n,1)}function u(d,f,g){g!==0&&(i.drawElementsInstanced(n,f,r,d*a,g),t.update(f,n,g))}function c(d,f,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,d,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];t.update(m,n,1)}function h(d,f,g,_){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<d.length;p++)u(d[p]/a,f[p],_[p]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,r,d,0,_,0,g);let p=0;for(let S=0;S<g;S++)p+=f[S]*_[S];t.update(p,n,1)}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=u,this.renderMultiDraw=c,this.renderMultiDrawInstances=h}function Vg(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function Gg(i,e,t){const n=new WeakMap,s=new Qe;function r(a,o,l){const u=a.morphTargetInfluences,c=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=c!==void 0?c.length:0;let d=n.get(o);if(d===void 0||d.count!==h){let x=function(){A.dispose(),n.delete(o),o.removeEventListener("dispose",x)};var f=x;d!==void 0&&d.texture.dispose();const g=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],S=o.morphAttributes.normal||[],b=o.morphAttributes.color||[];let M=0;g===!0&&(M=1),_===!0&&(M=2),m===!0&&(M=3);let L=o.attributes.position.count*M,R=1;L>e.maxTextureSize&&(R=Math.ceil(L/e.maxTextureSize),L=e.maxTextureSize);const w=new Float32Array(L*R*4*h),A=new eu(w,L,R,h);A.type=un,A.needsUpdate=!0;const y=M*4;for(let I=0;I<h;I++){const z=p[I],B=S[I],Y=b[I],Z=L*R*4*I;for(let K=0;K<z.count;K++){const te=K*y;g===!0&&(s.fromBufferAttribute(z,K),w[Z+te+0]=s.x,w[Z+te+1]=s.y,w[Z+te+2]=s.z,w[Z+te+3]=0),_===!0&&(s.fromBufferAttribute(B,K),w[Z+te+4]=s.x,w[Z+te+5]=s.y,w[Z+te+6]=s.z,w[Z+te+7]=0),m===!0&&(s.fromBufferAttribute(Y,K),w[Z+te+8]=s.x,w[Z+te+9]=s.y,w[Z+te+10]=s.z,w[Z+te+11]=Y.itemSize===4?s.w:1)}}d={count:h,texture:A,size:new De(L,R)},n.set(o,d),o.addEventListener("dispose",x)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let g=0;for(let m=0;m<u.length;m++)g+=u[m];const _=o.morphTargetsRelative?1:1-g;l.getUniforms().setValue(i,"morphTargetBaseInfluence",_),l.getUniforms().setValue(i,"morphTargetInfluences",u)}l.getUniforms().setValue(i,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function Wg(i,e,t,n){let s=new WeakMap;function r(l){const u=n.render.frame,c=l.geometry,h=e.get(l,c);if(s.get(h)!==u&&(e.update(h),s.set(h,u)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==u&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,u))),l.isSkinnedMesh){const d=l.skeleton;s.get(d)!==u&&(d.update(),s.set(d,u))}return h}function a(){s=new WeakMap}function o(l){const u=l.target;u.removeEventListener("dispose",o),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:r,dispose:a}}const xu=new bt,Kc=new fu(1,1),Mu=new eu,yu=new kd,Su=new ou,jc=[],Zc=[],Jc=new Float32Array(16),Qc=new Float32Array(9),el=new Float32Array(4);function Ji(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=jc[s];if(r===void 0&&(r=new Float32Array(s),jc[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function St(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Et(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Rr(i,e){let t=Zc[e];t===void 0&&(t=new Int32Array(e),Zc[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Xg(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function $g(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(St(t,e))return;i.uniform2fv(this.addr,e),Et(t,e)}}function qg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(St(t,e))return;i.uniform3fv(this.addr,e),Et(t,e)}}function Yg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(St(t,e))return;i.uniform4fv(this.addr,e),Et(t,e)}}function Kg(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(St(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Et(t,e)}else{if(St(t,n))return;el.set(n),i.uniformMatrix2fv(this.addr,!1,el),Et(t,n)}}function jg(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(St(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Et(t,e)}else{if(St(t,n))return;Qc.set(n),i.uniformMatrix3fv(this.addr,!1,Qc),Et(t,n)}}function Zg(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(St(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Et(t,e)}else{if(St(t,n))return;Jc.set(n),i.uniformMatrix4fv(this.addr,!1,Jc),Et(t,n)}}function Jg(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Qg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(St(t,e))return;i.uniform2iv(this.addr,e),Et(t,e)}}function e_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(St(t,e))return;i.uniform3iv(this.addr,e),Et(t,e)}}function t_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(St(t,e))return;i.uniform4iv(this.addr,e),Et(t,e)}}function n_(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function i_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(St(t,e))return;i.uniform2uiv(this.addr,e),Et(t,e)}}function s_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(St(t,e))return;i.uniform3uiv(this.addr,e),Et(t,e)}}function r_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(St(t,e))return;i.uniform4uiv(this.addr,e),Et(t,e)}}function a_(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Kc.compareFunction=Jl,r=Kc):r=xu,t.setTexture2D(e||r,s)}function o_(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||yu,s)}function c_(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||Su,s)}function l_(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Mu,s)}function u_(i){switch(i){case 5126:return Xg;case 35664:return $g;case 35665:return qg;case 35666:return Yg;case 35674:return Kg;case 35675:return jg;case 35676:return Zg;case 5124:case 35670:return Jg;case 35667:case 35671:return Qg;case 35668:case 35672:return e_;case 35669:case 35673:return t_;case 5125:return n_;case 36294:return i_;case 36295:return s_;case 36296:return r_;case 35678:case 36198:case 36298:case 36306:case 35682:return a_;case 35679:case 36299:case 36307:return o_;case 35680:case 36300:case 36308:case 36293:return c_;case 36289:case 36303:case 36311:case 36292:return l_}}function h_(i,e){i.uniform1fv(this.addr,e)}function d_(i,e){const t=Ji(e,this.size,2);i.uniform2fv(this.addr,t)}function f_(i,e){const t=Ji(e,this.size,3);i.uniform3fv(this.addr,t)}function p_(i,e){const t=Ji(e,this.size,4);i.uniform4fv(this.addr,t)}function m_(i,e){const t=Ji(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function g_(i,e){const t=Ji(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function __(i,e){const t=Ji(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function v_(i,e){i.uniform1iv(this.addr,e)}function x_(i,e){i.uniform2iv(this.addr,e)}function M_(i,e){i.uniform3iv(this.addr,e)}function y_(i,e){i.uniform4iv(this.addr,e)}function S_(i,e){i.uniform1uiv(this.addr,e)}function E_(i,e){i.uniform2uiv(this.addr,e)}function T_(i,e){i.uniform3uiv(this.addr,e)}function b_(i,e){i.uniform4uiv(this.addr,e)}function w_(i,e,t){const n=this.cache,s=e.length,r=Rr(t,s);St(n,r)||(i.uniform1iv(this.addr,r),Et(n,r));for(let a=0;a!==s;++a)t.setTexture2D(e[a]||xu,r[a])}function A_(i,e,t){const n=this.cache,s=e.length,r=Rr(t,s);St(n,r)||(i.uniform1iv(this.addr,r),Et(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||yu,r[a])}function R_(i,e,t){const n=this.cache,s=e.length,r=Rr(t,s);St(n,r)||(i.uniform1iv(this.addr,r),Et(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||Su,r[a])}function C_(i,e,t){const n=this.cache,s=e.length,r=Rr(t,s);St(n,r)||(i.uniform1iv(this.addr,r),Et(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||Mu,r[a])}function P_(i){switch(i){case 5126:return h_;case 35664:return d_;case 35665:return f_;case 35666:return p_;case 35674:return m_;case 35675:return g_;case 35676:return __;case 5124:case 35670:return v_;case 35667:case 35671:return x_;case 35668:case 35672:return M_;case 35669:case 35673:return y_;case 5125:return S_;case 36294:return E_;case 36295:return T_;case 36296:return b_;case 35678:case 36198:case 36298:case 36306:case 35682:return w_;case 35679:case 36299:case 36307:return A_;case 35680:case 36300:case 36308:case 36293:return R_;case 36289:case 36303:case 36311:case 36292:return C_}}class L_{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=u_(t.type)}}class I_{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=P_(t.type)}}class D_{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],n)}}}const fa=/(\w+)(\])?(\[|\.)?/g;function tl(i,e){i.seq.push(e),i.map[e.id]=e}function N_(i,e,t){const n=i.name,s=n.length;for(fa.lastIndex=0;;){const r=fa.exec(n),a=fa.lastIndex;let o=r[1];const l=r[2]==="]",u=r[3];if(l&&(o=o|0),u===void 0||u==="["&&a+2===s){tl(t,u===void 0?new L_(o,i,e):new I_(o,i,e));break}else{let h=t.map[o];h===void 0&&(h=new D_(o),tl(t,h)),t=h}}}class gr{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=e.getActiveUniform(t,s),a=e.getUniformLocation(t,r.name);N_(r,a,this)}}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&n.push(a)}return n}}function nl(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const U_=37297;let F_=0;function O_(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const il=new Ue;function B_(i){qe._getMatrix(il,qe.workingColorSpace,i);const e=`mat3( ${il.elements.map(t=>t.toFixed(4))} )`;switch(qe.getTransfer(i)){case xr:return[e,"LinearTransferOETF"];case at:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function sl(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),s=i.getShaderInfoLog(e).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const a=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+O_(i.getShaderSource(e),a)}else return s}function k_(i,e){const t=B_(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function z_(i,e){let t;switch(e){case Yh:t="Linear";break;case Kh:t="Reinhard";break;case jh:t="Cineon";break;case Ra:t="ACESFilmic";break;case Jh:t="AgX";break;case Qh:t="Neutral";break;case Zh:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const or=new U;function H_(){qe.getLuminanceCoefficients(or);const i=or.x.toFixed(4),e=or.y.toFixed(4),t=or.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function V_(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ps).join(`
`)}function G_(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function W_(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function ps(i){return i!==""}function rl(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function al(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const X_=/^[ \t]*#include +<([\w\d./]+)>/gm;function lo(i){return i.replace(X_,q_)}const $_=new Map;function q_(i,e){let t=Oe[e];if(t===void 0){const n=$_.get(e);if(n!==void 0)t=Oe[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return lo(t)}const Y_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ol(i){return i.replace(Y_,K_)}function K_(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function cl(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}function j_(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Bl?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===kl?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Rn&&(e="SHADOWMAP_TYPE_VSM"),e}function Z_(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Bi:case ki:e="ENVMAP_TYPE_CUBE";break;case Tr:e="ENVMAP_TYPE_CUBE_UV";break}return e}function J_(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case ki:e="ENVMAP_MODE_REFRACTION";break}return e}function Q_(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case zl:e="ENVMAP_BLENDING_MULTIPLY";break;case $h:e="ENVMAP_BLENDING_MIX";break;case qh:e="ENVMAP_BLENDING_ADD";break}return e}function e0(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function t0(i,e,t,n){const s=i.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=j_(t),u=Z_(t),c=J_(t),h=Q_(t),d=e0(t),f=V_(t),g=G_(r),_=s.createProgram();let m,p,S=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(ps).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(ps).join(`
`),p.length>0&&(p+=`
`)):(m=[cl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ps).join(`
`),p=[cl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Xn?"#define TONE_MAPPING":"",t.toneMapping!==Xn?Oe.tonemapping_pars_fragment:"",t.toneMapping!==Xn?z_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Oe.colorspace_pars_fragment,k_("linearToOutputTexel",t.outputColorSpace),H_(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ps).join(`
`)),a=lo(a),a=rl(a,t),a=al(a,t),o=lo(o),o=rl(o,t),o=al(o,t),a=ol(a),o=ol(o),t.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===sc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===sc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const b=S+m+a,M=S+p+o,L=nl(s,s.VERTEX_SHADER,b),R=nl(s,s.FRAGMENT_SHADER,M);s.attachShader(_,L),s.attachShader(_,R),t.index0AttributeName!==void 0?s.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function w(I){if(i.debug.checkShaderErrors){const z=s.getProgramInfoLog(_).trim(),B=s.getShaderInfoLog(L).trim(),Y=s.getShaderInfoLog(R).trim();let Z=!0,K=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(Z=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,L,R);else{const te=sl(s,L,"vertex"),$=sl(s,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+z+`
`+te+`
`+$)}else z!==""?console.warn("THREE.WebGLProgram: Program Info Log:",z):(B===""||Y==="")&&(K=!1);K&&(I.diagnostics={runnable:Z,programLog:z,vertexShader:{log:B,prefix:m},fragmentShader:{log:Y,prefix:p}})}s.deleteShader(L),s.deleteShader(R),A=new gr(s,_),y=W_(s,_)}let A;this.getUniforms=function(){return A===void 0&&w(this),A};let y;this.getAttributes=function(){return y===void 0&&w(this),y};let x=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return x===!1&&(x=s.getProgramParameter(_,U_)),x},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=F_++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=L,this.fragmentShader=R,this}let n0=0;class i0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new s0(e),t.set(e,n)),n}}class s0{constructor(e){this.id=n0++,this.code=e,this.usedTimes=0}}function r0(i,e,t,n,s,r,a){const o=new tu,l=new i0,u=new Set,c=[],h=s.logarithmicDepthBuffer,d=s.vertexTextures;let f=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(y){return u.add(y),y===0?"uv":`uv${y}`}function m(y,x,I,z,B){const Y=z.fog,Z=B.geometry,K=y.isMeshStandardMaterial?z.environment:null,te=(y.isMeshStandardMaterial?t:e).get(y.envMap||K),$=te&&te.mapping===Tr?te.image.height:null,he=g[y.type];y.precision!==null&&(f=s.getMaxPrecision(y.precision),f!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",f,"instead."));const _e=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,Te=_e!==void 0?_e.length:0;let Be=0;Z.morphAttributes.position!==void 0&&(Be=1),Z.morphAttributes.normal!==void 0&&(Be=2),Z.morphAttributes.color!==void 0&&(Be=3);let tt,q,oe,Ee;if(he){const Je=gn[he];tt=Je.vertexShader,q=Je.fragmentShader}else tt=y.vertexShader,q=y.fragmentShader,l.update(y),oe=l.getVertexShaderID(y),Ee=l.getFragmentShaderID(y);const fe=i.getRenderTarget(),be=i.state.buffers.depth.getReversed(),Ye=B.isInstancedMesh===!0,Me=B.isBatchedMesh===!0,st=!!y.map,ze=!!y.matcap,We=!!te,N=!!y.aoMap,gt=!!y.lightMap,Xe=!!y.bumpMap,et=!!y.normalMap,ye=!!y.displacementMap,Ve=!!y.emissiveMap,we=!!y.metalnessMap,Ne=!!y.roughnessMap,ft=y.anisotropy>0,P=y.clearcoat>0,v=y.dispersion>0,k=y.iridescence>0,j=y.sheen>0,E=y.transmission>0,C=ft&&!!y.anisotropyMap,H=P&&!!y.clearcoatMap,V=P&&!!y.clearcoatNormalMap,ee=P&&!!y.clearcoatRoughnessMap,ne=k&&!!y.iridescenceMap,X=k&&!!y.iridescenceThicknessMap,J=j&&!!y.sheenColorMap,Se=j&&!!y.sheenRoughnessMap,me=!!y.specularMap,ae=!!y.specularColorMap,ce=!!y.specularIntensityMap,D=E&&!!y.transmissionMap,le=E&&!!y.thicknessMap,ie=!!y.gradientMap,pe=!!y.alphaMap,se=y.alphaTest>0,Q=!!y.alphaHash,ge=!!y.extensions;let Ce=Xn;y.toneMapped&&(fe===null||fe.isXRRenderTarget===!0)&&(Ce=i.toneMapping);const ot={shaderID:he,shaderType:y.type,shaderName:y.name,vertexShader:tt,fragmentShader:q,defines:y.defines,customVertexShaderID:oe,customFragmentShaderID:Ee,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:f,batching:Me,batchingColor:Me&&B._colorsTexture!==null,instancing:Ye,instancingColor:Ye&&B.instanceColor!==null,instancingMorph:Ye&&B.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:fe===null?i.outputColorSpace:fe.isXRRenderTarget===!0?fe.texture.colorSpace:Bt,alphaToCoverage:!!y.alphaToCoverage,map:st,matcap:ze,envMap:We,envMapMode:We&&te.mapping,envMapCubeUVHeight:$,aoMap:N,lightMap:gt,bumpMap:Xe,normalMap:et,displacementMap:d&&ye,emissiveMap:Ve,normalMapObjectSpace:et&&y.normalMapType===rd,normalMapTangentSpace:et&&y.normalMapType===Zl,metalnessMap:we,roughnessMap:Ne,anisotropy:ft,anisotropyMap:C,clearcoat:P,clearcoatMap:H,clearcoatNormalMap:V,clearcoatRoughnessMap:ee,dispersion:v,iridescence:k,iridescenceMap:ne,iridescenceThicknessMap:X,sheen:j,sheenColorMap:J,sheenRoughnessMap:Se,specularMap:me,specularColorMap:ae,specularIntensityMap:ce,transmission:E,transmissionMap:D,thicknessMap:le,gradientMap:ie,opaque:y.transparent===!1&&y.blending===Di&&y.alphaToCoverage===!1,alphaMap:pe,alphaTest:se,alphaHash:Q,combine:y.combine,mapUv:st&&_(y.map.channel),aoMapUv:N&&_(y.aoMap.channel),lightMapUv:gt&&_(y.lightMap.channel),bumpMapUv:Xe&&_(y.bumpMap.channel),normalMapUv:et&&_(y.normalMap.channel),displacementMapUv:ye&&_(y.displacementMap.channel),emissiveMapUv:Ve&&_(y.emissiveMap.channel),metalnessMapUv:we&&_(y.metalnessMap.channel),roughnessMapUv:Ne&&_(y.roughnessMap.channel),anisotropyMapUv:C&&_(y.anisotropyMap.channel),clearcoatMapUv:H&&_(y.clearcoatMap.channel),clearcoatNormalMapUv:V&&_(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ee&&_(y.clearcoatRoughnessMap.channel),iridescenceMapUv:ne&&_(y.iridescenceMap.channel),iridescenceThicknessMapUv:X&&_(y.iridescenceThicknessMap.channel),sheenColorMapUv:J&&_(y.sheenColorMap.channel),sheenRoughnessMapUv:Se&&_(y.sheenRoughnessMap.channel),specularMapUv:me&&_(y.specularMap.channel),specularColorMapUv:ae&&_(y.specularColorMap.channel),specularIntensityMapUv:ce&&_(y.specularIntensityMap.channel),transmissionMapUv:D&&_(y.transmissionMap.channel),thicknessMapUv:le&&_(y.thicknessMap.channel),alphaMapUv:pe&&_(y.alphaMap.channel),vertexTangents:!!Z.attributes.tangent&&(et||ft),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!Z.attributes.uv&&(st||pe),fog:!!Y,useFog:y.fog===!0,fogExp2:!!Y&&Y.isFogExp2,flatShading:y.flatShading===!0&&y.wireframe===!1,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:h,reverseDepthBuffer:be,skinning:B.isSkinnedMesh===!0,morphTargets:Z.morphAttributes.position!==void 0,morphNormals:Z.morphAttributes.normal!==void 0,morphColors:Z.morphAttributes.color!==void 0,morphTargetsCount:Te,morphTextureStride:Be,numDirLights:x.directional.length,numPointLights:x.point.length,numSpotLights:x.spot.length,numSpotLightMaps:x.spotLightMap.length,numRectAreaLights:x.rectArea.length,numHemiLights:x.hemi.length,numDirLightShadows:x.directionalShadowMap.length,numPointLightShadows:x.pointShadowMap.length,numSpotLightShadows:x.spotShadowMap.length,numSpotLightShadowsWithMaps:x.numSpotLightShadowsWithMaps,numLightProbes:x.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:y.dithering,shadowMapEnabled:i.shadowMap.enabled&&I.length>0,shadowMapType:i.shadowMap.type,toneMapping:Ce,decodeVideoTexture:st&&y.map.isVideoTexture===!0&&qe.getTransfer(y.map.colorSpace)===at,decodeVideoTextureEmissive:Ve&&y.emissiveMap.isVideoTexture===!0&&qe.getTransfer(y.emissiveMap.colorSpace)===at,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===_n,flipSided:y.side===Ct,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:ge&&y.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ge&&y.extensions.multiDraw===!0||Me)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return ot.vertexUv1s=u.has(1),ot.vertexUv2s=u.has(2),ot.vertexUv3s=u.has(3),u.clear(),ot}function p(y){const x=[];if(y.shaderID?x.push(y.shaderID):(x.push(y.customVertexShaderID),x.push(y.customFragmentShaderID)),y.defines!==void 0)for(const I in y.defines)x.push(I),x.push(y.defines[I]);return y.isRawShaderMaterial===!1&&(S(x,y),b(x,y),x.push(i.outputColorSpace)),x.push(y.customProgramCacheKey),x.join()}function S(y,x){y.push(x.precision),y.push(x.outputColorSpace),y.push(x.envMapMode),y.push(x.envMapCubeUVHeight),y.push(x.mapUv),y.push(x.alphaMapUv),y.push(x.lightMapUv),y.push(x.aoMapUv),y.push(x.bumpMapUv),y.push(x.normalMapUv),y.push(x.displacementMapUv),y.push(x.emissiveMapUv),y.push(x.metalnessMapUv),y.push(x.roughnessMapUv),y.push(x.anisotropyMapUv),y.push(x.clearcoatMapUv),y.push(x.clearcoatNormalMapUv),y.push(x.clearcoatRoughnessMapUv),y.push(x.iridescenceMapUv),y.push(x.iridescenceThicknessMapUv),y.push(x.sheenColorMapUv),y.push(x.sheenRoughnessMapUv),y.push(x.specularMapUv),y.push(x.specularColorMapUv),y.push(x.specularIntensityMapUv),y.push(x.transmissionMapUv),y.push(x.thicknessMapUv),y.push(x.combine),y.push(x.fogExp2),y.push(x.sizeAttenuation),y.push(x.morphTargetsCount),y.push(x.morphAttributeCount),y.push(x.numDirLights),y.push(x.numPointLights),y.push(x.numSpotLights),y.push(x.numSpotLightMaps),y.push(x.numHemiLights),y.push(x.numRectAreaLights),y.push(x.numDirLightShadows),y.push(x.numPointLightShadows),y.push(x.numSpotLightShadows),y.push(x.numSpotLightShadowsWithMaps),y.push(x.numLightProbes),y.push(x.shadowMapType),y.push(x.toneMapping),y.push(x.numClippingPlanes),y.push(x.numClipIntersection),y.push(x.depthPacking)}function b(y,x){o.disableAll(),x.supportsVertexTextures&&o.enable(0),x.instancing&&o.enable(1),x.instancingColor&&o.enable(2),x.instancingMorph&&o.enable(3),x.matcap&&o.enable(4),x.envMap&&o.enable(5),x.normalMapObjectSpace&&o.enable(6),x.normalMapTangentSpace&&o.enable(7),x.clearcoat&&o.enable(8),x.iridescence&&o.enable(9),x.alphaTest&&o.enable(10),x.vertexColors&&o.enable(11),x.vertexAlphas&&o.enable(12),x.vertexUv1s&&o.enable(13),x.vertexUv2s&&o.enable(14),x.vertexUv3s&&o.enable(15),x.vertexTangents&&o.enable(16),x.anisotropy&&o.enable(17),x.alphaHash&&o.enable(18),x.batching&&o.enable(19),x.dispersion&&o.enable(20),x.batchingColor&&o.enable(21),x.gradientMap&&o.enable(22),y.push(o.mask),o.disableAll(),x.fog&&o.enable(0),x.useFog&&o.enable(1),x.flatShading&&o.enable(2),x.logarithmicDepthBuffer&&o.enable(3),x.reverseDepthBuffer&&o.enable(4),x.skinning&&o.enable(5),x.morphTargets&&o.enable(6),x.morphNormals&&o.enable(7),x.morphColors&&o.enable(8),x.premultipliedAlpha&&o.enable(9),x.shadowMapEnabled&&o.enable(10),x.doubleSided&&o.enable(11),x.flipSided&&o.enable(12),x.useDepthPacking&&o.enable(13),x.dithering&&o.enable(14),x.transmission&&o.enable(15),x.sheen&&o.enable(16),x.opaque&&o.enable(17),x.pointsUvs&&o.enable(18),x.decodeVideoTexture&&o.enable(19),x.decodeVideoTextureEmissive&&o.enable(20),x.alphaToCoverage&&o.enable(21),y.push(o.mask)}function M(y){const x=g[y.type];let I;if(x){const z=gn[x];I=Jd.clone(z.uniforms)}else I=y.uniforms;return I}function L(y,x){let I;for(let z=0,B=c.length;z<B;z++){const Y=c[z];if(Y.cacheKey===x){I=Y,++I.usedTimes;break}}return I===void 0&&(I=new t0(i,x,y,r),c.push(I)),I}function R(y){if(--y.usedTimes===0){const x=c.indexOf(y);c[x]=c[c.length-1],c.pop(),y.destroy()}}function w(y){l.remove(y)}function A(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:M,acquireProgram:L,releaseProgram:R,releaseShaderCache:w,programs:c,dispose:A}}function a0(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function o0(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function ll(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function ul(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(h,d,f,g,_,m){let p=i[e];return p===void 0?(p={id:h.id,object:h,geometry:d,material:f,groupOrder:g,renderOrder:h.renderOrder,z:_,group:m},i[e]=p):(p.id=h.id,p.object=h,p.geometry=d,p.material=f,p.groupOrder=g,p.renderOrder=h.renderOrder,p.z=_,p.group=m),e++,p}function o(h,d,f,g,_,m){const p=a(h,d,f,g,_,m);f.transmission>0?n.push(p):f.transparent===!0?s.push(p):t.push(p)}function l(h,d,f,g,_,m){const p=a(h,d,f,g,_,m);f.transmission>0?n.unshift(p):f.transparent===!0?s.unshift(p):t.unshift(p)}function u(h,d){t.length>1&&t.sort(h||o0),n.length>1&&n.sort(d||ll),s.length>1&&s.sort(d||ll)}function c(){for(let h=e,d=i.length;h<d;h++){const f=i[h];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:o,unshift:l,finish:c,sort:u}}function c0(){let i=new WeakMap;function e(n,s){const r=i.get(n);let a;return r===void 0?(a=new ul,i.set(n,[a])):s>=r.length?(a=new ul,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function l0(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new U,color:new Pe};break;case"SpotLight":t={position:new U,direction:new U,color:new Pe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new U,color:new Pe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new U,skyColor:new Pe,groundColor:new Pe};break;case"RectAreaLight":t={color:new Pe,position:new U,halfWidth:new U,halfHeight:new U};break}return i[e.id]=t,t}}}function u0(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new De};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new De};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new De,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let h0=0;function d0(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function f0(i){const e=new l0,t=u0(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let u=0;u<9;u++)n.probe.push(new U);const s=new U,r=new Fe,a=new Fe;function o(u){let c=0,h=0,d=0;for(let y=0;y<9;y++)n.probe[y].set(0,0,0);let f=0,g=0,_=0,m=0,p=0,S=0,b=0,M=0,L=0,R=0,w=0;u.sort(d0);for(let y=0,x=u.length;y<x;y++){const I=u[y],z=I.color,B=I.intensity,Y=I.distance,Z=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)c+=z.r*B,h+=z.g*B,d+=z.b*B;else if(I.isLightProbe){for(let K=0;K<9;K++)n.probe[K].addScaledVector(I.sh.coefficients[K],B);w++}else if(I.isDirectionalLight){const K=e.get(I);if(K.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const te=I.shadow,$=t.get(I);$.shadowIntensity=te.intensity,$.shadowBias=te.bias,$.shadowNormalBias=te.normalBias,$.shadowRadius=te.radius,$.shadowMapSize=te.mapSize,n.directionalShadow[f]=$,n.directionalShadowMap[f]=Z,n.directionalShadowMatrix[f]=I.shadow.matrix,S++}n.directional[f]=K,f++}else if(I.isSpotLight){const K=e.get(I);K.position.setFromMatrixPosition(I.matrixWorld),K.color.copy(z).multiplyScalar(B),K.distance=Y,K.coneCos=Math.cos(I.angle),K.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),K.decay=I.decay,n.spot[_]=K;const te=I.shadow;if(I.map&&(n.spotLightMap[L]=I.map,L++,te.updateMatrices(I),I.castShadow&&R++),n.spotLightMatrix[_]=te.matrix,I.castShadow){const $=t.get(I);$.shadowIntensity=te.intensity,$.shadowBias=te.bias,$.shadowNormalBias=te.normalBias,$.shadowRadius=te.radius,$.shadowMapSize=te.mapSize,n.spotShadow[_]=$,n.spotShadowMap[_]=Z,M++}_++}else if(I.isRectAreaLight){const K=e.get(I);K.color.copy(z).multiplyScalar(B),K.halfWidth.set(I.width*.5,0,0),K.halfHeight.set(0,I.height*.5,0),n.rectArea[m]=K,m++}else if(I.isPointLight){const K=e.get(I);if(K.color.copy(I.color).multiplyScalar(I.intensity),K.distance=I.distance,K.decay=I.decay,I.castShadow){const te=I.shadow,$=t.get(I);$.shadowIntensity=te.intensity,$.shadowBias=te.bias,$.shadowNormalBias=te.normalBias,$.shadowRadius=te.radius,$.shadowMapSize=te.mapSize,$.shadowCameraNear=te.camera.near,$.shadowCameraFar=te.camera.far,n.pointShadow[g]=$,n.pointShadowMap[g]=Z,n.pointShadowMatrix[g]=I.shadow.matrix,b++}n.point[g]=K,g++}else if(I.isHemisphereLight){const K=e.get(I);K.skyColor.copy(I.color).multiplyScalar(B),K.groundColor.copy(I.groundColor).multiplyScalar(B),n.hemi[p]=K,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ue.LTC_FLOAT_1,n.rectAreaLTC2=ue.LTC_FLOAT_2):(n.rectAreaLTC1=ue.LTC_HALF_1,n.rectAreaLTC2=ue.LTC_HALF_2)),n.ambient[0]=c,n.ambient[1]=h,n.ambient[2]=d;const A=n.hash;(A.directionalLength!==f||A.pointLength!==g||A.spotLength!==_||A.rectAreaLength!==m||A.hemiLength!==p||A.numDirectionalShadows!==S||A.numPointShadows!==b||A.numSpotShadows!==M||A.numSpotMaps!==L||A.numLightProbes!==w)&&(n.directional.length=f,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=S,n.directionalShadowMap.length=S,n.pointShadow.length=b,n.pointShadowMap.length=b,n.spotShadow.length=M,n.spotShadowMap.length=M,n.directionalShadowMatrix.length=S,n.pointShadowMatrix.length=b,n.spotLightMatrix.length=M+L-R,n.spotLightMap.length=L,n.numSpotLightShadowsWithMaps=R,n.numLightProbes=w,A.directionalLength=f,A.pointLength=g,A.spotLength=_,A.rectAreaLength=m,A.hemiLength=p,A.numDirectionalShadows=S,A.numPointShadows=b,A.numSpotShadows=M,A.numSpotMaps=L,A.numLightProbes=w,n.version=h0++)}function l(u,c){let h=0,d=0,f=0,g=0,_=0;const m=c.matrixWorldInverse;for(let p=0,S=u.length;p<S;p++){const b=u[p];if(b.isDirectionalLight){const M=n.directional[h];M.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(m),h++}else if(b.isSpotLight){const M=n.spot[f];M.position.setFromMatrixPosition(b.matrixWorld),M.position.applyMatrix4(m),M.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(m),f++}else if(b.isRectAreaLight){const M=n.rectArea[g];M.position.setFromMatrixPosition(b.matrixWorld),M.position.applyMatrix4(m),a.identity(),r.copy(b.matrixWorld),r.premultiply(m),a.extractRotation(r),M.halfWidth.set(b.width*.5,0,0),M.halfHeight.set(0,b.height*.5,0),M.halfWidth.applyMatrix4(a),M.halfHeight.applyMatrix4(a),g++}else if(b.isPointLight){const M=n.point[d];M.position.setFromMatrixPosition(b.matrixWorld),M.position.applyMatrix4(m),d++}else if(b.isHemisphereLight){const M=n.hemi[_];M.direction.setFromMatrixPosition(b.matrixWorld),M.direction.transformDirection(m),_++}}}return{setup:o,setupView:l,state:n}}function hl(i){const e=new f0(i),t=[],n=[];function s(c){u.camera=c,t.length=0,n.length=0}function r(c){t.push(c)}function a(c){n.push(c)}function o(){e.setup(t)}function l(c){e.setupView(t,c)}const u={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:u,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function p0(i){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let o;return a===void 0?(o=new hl(i),e.set(s,[o])):r>=a.length?(o=new hl(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const m0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,g0=`uniform sampler2D shadow_pass;
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
}`;function _0(i,e,t){let n=new bo;const s=new De,r=new De,a=new Qe,o=new gf({depthPacking:sd}),l=new _f,u={},c=t.maxTextureSize,h={[Nn]:Ct,[Ct]:Nn,[_n]:_n},d=new $n({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new De},radius:{value:4}},vertexShader:m0,fragmentShader:g0}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const g=new Pt;g.setAttribute("position",new Ot(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Ke(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Bl;let p=this.type;this.render=function(R,w,A){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||R.length===0)return;const y=i.getRenderTarget(),x=i.getActiveCubeFace(),I=i.getActiveMipmapLevel(),z=i.state;z.setBlending(Wn),z.buffers.color.setClear(1,1,1,1),z.buffers.depth.setTest(!0),z.setScissorTest(!1);const B=p!==Rn&&this.type===Rn,Y=p===Rn&&this.type!==Rn;for(let Z=0,K=R.length;Z<K;Z++){const te=R[Z],$=te.shadow;if($===void 0){console.warn("THREE.WebGLShadowMap:",te,"has no shadow.");continue}if($.autoUpdate===!1&&$.needsUpdate===!1)continue;s.copy($.mapSize);const he=$.getFrameExtents();if(s.multiply(he),r.copy($.mapSize),(s.x>c||s.y>c)&&(s.x>c&&(r.x=Math.floor(c/he.x),s.x=r.x*he.x,$.mapSize.x=r.x),s.y>c&&(r.y=Math.floor(c/he.y),s.y=r.y*he.y,$.mapSize.y=r.y)),$.map===null||B===!0||Y===!0){const Te=this.type!==Rn?{minFilter:Ft,magFilter:Ft}:{};$.map!==null&&$.map.dispose(),$.map=new ui(s.x,s.y,Te),$.map.texture.name=te.name+".shadowMap",$.camera.updateProjectionMatrix()}i.setRenderTarget($.map),i.clear();const _e=$.getViewportCount();for(let Te=0;Te<_e;Te++){const Be=$.getViewport(Te);a.set(r.x*Be.x,r.y*Be.y,r.x*Be.z,r.y*Be.w),z.viewport(a),$.updateMatrices(te,Te),n=$.getFrustum(),M(w,A,$.camera,te,this.type)}$.isPointLightShadow!==!0&&this.type===Rn&&S($,A),$.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(y,x,I)};function S(R,w){const A=e.update(_);d.defines.VSM_SAMPLES!==R.blurSamples&&(d.defines.VSM_SAMPLES=R.blurSamples,f.defines.VSM_SAMPLES=R.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new ui(s.x,s.y)),d.uniforms.shadow_pass.value=R.map.texture,d.uniforms.resolution.value=R.mapSize,d.uniforms.radius.value=R.radius,i.setRenderTarget(R.mapPass),i.clear(),i.renderBufferDirect(w,null,A,d,_,null),f.uniforms.shadow_pass.value=R.mapPass.texture,f.uniforms.resolution.value=R.mapSize,f.uniforms.radius.value=R.radius,i.setRenderTarget(R.map),i.clear(),i.renderBufferDirect(w,null,A,f,_,null)}function b(R,w,A,y){let x=null;const I=A.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(I!==void 0)x=I;else if(x=A.isPointLight===!0?l:o,i.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0||w.alphaToCoverage===!0){const z=x.uuid,B=w.uuid;let Y=u[z];Y===void 0&&(Y={},u[z]=Y);let Z=Y[B];Z===void 0&&(Z=x.clone(),Y[B]=Z,w.addEventListener("dispose",L)),x=Z}if(x.visible=w.visible,x.wireframe=w.wireframe,y===Rn?x.side=w.shadowSide!==null?w.shadowSide:w.side:x.side=w.shadowSide!==null?w.shadowSide:h[w.side],x.alphaMap=w.alphaMap,x.alphaTest=w.alphaToCoverage===!0?.5:w.alphaTest,x.map=w.map,x.clipShadows=w.clipShadows,x.clippingPlanes=w.clippingPlanes,x.clipIntersection=w.clipIntersection,x.displacementMap=w.displacementMap,x.displacementScale=w.displacementScale,x.displacementBias=w.displacementBias,x.wireframeLinewidth=w.wireframeLinewidth,x.linewidth=w.linewidth,A.isPointLight===!0&&x.isMeshDistanceMaterial===!0){const z=i.properties.get(x);z.light=A}return x}function M(R,w,A,y,x){if(R.visible===!1)return;if(R.layers.test(w.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&x===Rn)&&(!R.frustumCulled||n.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(A.matrixWorldInverse,R.matrixWorld);const B=e.update(R),Y=R.material;if(Array.isArray(Y)){const Z=B.groups;for(let K=0,te=Z.length;K<te;K++){const $=Z[K],he=Y[$.materialIndex];if(he&&he.visible){const _e=b(R,he,y,x);R.onBeforeShadow(i,R,w,A,B,_e,$),i.renderBufferDirect(A,null,B,_e,R,$),R.onAfterShadow(i,R,w,A,B,_e,$)}}}else if(Y.visible){const Z=b(R,Y,y,x);R.onBeforeShadow(i,R,w,A,B,Z,null),i.renderBufferDirect(A,null,B,Z,R,null),R.onAfterShadow(i,R,w,A,B,Z,null)}}const z=R.children;for(let B=0,Y=z.length;B<Y;B++)M(z[B],w,A,y,x)}function L(R){R.target.removeEventListener("dispose",L);for(const A in u){const y=u[A],x=R.target.uuid;x in y&&(y[x].dispose(),delete y[x])}}}const v0={[ya]:Sa,[Ea]:wa,[Ta]:Aa,[Oi]:ba,[Sa]:ya,[wa]:Ea,[Aa]:Ta,[ba]:Oi};function x0(i,e){function t(){let D=!1;const le=new Qe;let ie=null;const pe=new Qe(0,0,0,0);return{setMask:function(se){ie!==se&&!D&&(i.colorMask(se,se,se,se),ie=se)},setLocked:function(se){D=se},setClear:function(se,Q,ge,Ce,ot){ot===!0&&(se*=Ce,Q*=Ce,ge*=Ce),le.set(se,Q,ge,Ce),pe.equals(le)===!1&&(i.clearColor(se,Q,ge,Ce),pe.copy(le))},reset:function(){D=!1,ie=null,pe.set(-1,0,0,0)}}}function n(){let D=!1,le=!1,ie=null,pe=null,se=null;return{setReversed:function(Q){if(le!==Q){const ge=e.get("EXT_clip_control");Q?ge.clipControlEXT(ge.LOWER_LEFT_EXT,ge.ZERO_TO_ONE_EXT):ge.clipControlEXT(ge.LOWER_LEFT_EXT,ge.NEGATIVE_ONE_TO_ONE_EXT),le=Q;const Ce=se;se=null,this.setClear(Ce)}},getReversed:function(){return le},setTest:function(Q){Q?fe(i.DEPTH_TEST):be(i.DEPTH_TEST)},setMask:function(Q){ie!==Q&&!D&&(i.depthMask(Q),ie=Q)},setFunc:function(Q){if(le&&(Q=v0[Q]),pe!==Q){switch(Q){case ya:i.depthFunc(i.NEVER);break;case Sa:i.depthFunc(i.ALWAYS);break;case Ea:i.depthFunc(i.LESS);break;case Oi:i.depthFunc(i.LEQUAL);break;case Ta:i.depthFunc(i.EQUAL);break;case ba:i.depthFunc(i.GEQUAL);break;case wa:i.depthFunc(i.GREATER);break;case Aa:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}pe=Q}},setLocked:function(Q){D=Q},setClear:function(Q){se!==Q&&(le&&(Q=1-Q),i.clearDepth(Q),se=Q)},reset:function(){D=!1,ie=null,pe=null,se=null,le=!1}}}function s(){let D=!1,le=null,ie=null,pe=null,se=null,Q=null,ge=null,Ce=null,ot=null;return{setTest:function(Je){D||(Je?fe(i.STENCIL_TEST):be(i.STENCIL_TEST))},setMask:function(Je){le!==Je&&!D&&(i.stencilMask(Je),le=Je)},setFunc:function(Je,Ht,tn){(ie!==Je||pe!==Ht||se!==tn)&&(i.stencilFunc(Je,Ht,tn),ie=Je,pe=Ht,se=tn)},setOp:function(Je,Ht,tn){(Q!==Je||ge!==Ht||Ce!==tn)&&(i.stencilOp(Je,Ht,tn),Q=Je,ge=Ht,Ce=tn)},setLocked:function(Je){D=Je},setClear:function(Je){ot!==Je&&(i.clearStencil(Je),ot=Je)},reset:function(){D=!1,le=null,ie=null,pe=null,se=null,Q=null,ge=null,Ce=null,ot=null}}}const r=new t,a=new n,o=new s,l=new WeakMap,u=new WeakMap;let c={},h={},d=new WeakMap,f=[],g=null,_=!1,m=null,p=null,S=null,b=null,M=null,L=null,R=null,w=new Pe(0,0,0),A=0,y=!1,x=null,I=null,z=null,B=null,Y=null;const Z=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let K=!1,te=0;const $=i.getParameter(i.VERSION);$.indexOf("WebGL")!==-1?(te=parseFloat(/^WebGL (\d)/.exec($)[1]),K=te>=1):$.indexOf("OpenGL ES")!==-1&&(te=parseFloat(/^OpenGL ES (\d)/.exec($)[1]),K=te>=2);let he=null,_e={};const Te=i.getParameter(i.SCISSOR_BOX),Be=i.getParameter(i.VIEWPORT),tt=new Qe().fromArray(Te),q=new Qe().fromArray(Be);function oe(D,le,ie,pe){const se=new Uint8Array(4),Q=i.createTexture();i.bindTexture(D,Q),i.texParameteri(D,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(D,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let ge=0;ge<ie;ge++)D===i.TEXTURE_3D||D===i.TEXTURE_2D_ARRAY?i.texImage3D(le,0,i.RGBA,1,1,pe,0,i.RGBA,i.UNSIGNED_BYTE,se):i.texImage2D(le+ge,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,se);return Q}const Ee={};Ee[i.TEXTURE_2D]=oe(i.TEXTURE_2D,i.TEXTURE_2D,1),Ee[i.TEXTURE_CUBE_MAP]=oe(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Ee[i.TEXTURE_2D_ARRAY]=oe(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Ee[i.TEXTURE_3D]=oe(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),fe(i.DEPTH_TEST),a.setFunc(Oi),Xe(!1),et(Ko),fe(i.CULL_FACE),N(Wn);function fe(D){c[D]!==!0&&(i.enable(D),c[D]=!0)}function be(D){c[D]!==!1&&(i.disable(D),c[D]=!1)}function Ye(D,le){return h[D]!==le?(i.bindFramebuffer(D,le),h[D]=le,D===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=le),D===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=le),!0):!1}function Me(D,le){let ie=f,pe=!1;if(D){ie=d.get(le),ie===void 0&&(ie=[],d.set(le,ie));const se=D.textures;if(ie.length!==se.length||ie[0]!==i.COLOR_ATTACHMENT0){for(let Q=0,ge=se.length;Q<ge;Q++)ie[Q]=i.COLOR_ATTACHMENT0+Q;ie.length=se.length,pe=!0}}else ie[0]!==i.BACK&&(ie[0]=i.BACK,pe=!0);pe&&i.drawBuffers(ie)}function st(D){return g!==D?(i.useProgram(D),g=D,!0):!1}const ze={[ri]:i.FUNC_ADD,[Ch]:i.FUNC_SUBTRACT,[Ph]:i.FUNC_REVERSE_SUBTRACT};ze[Lh]=i.MIN,ze[Ih]=i.MAX;const We={[Dh]:i.ZERO,[Nh]:i.ONE,[Uh]:i.SRC_COLOR,[xa]:i.SRC_ALPHA,[Hh]:i.SRC_ALPHA_SATURATE,[kh]:i.DST_COLOR,[Oh]:i.DST_ALPHA,[Fh]:i.ONE_MINUS_SRC_COLOR,[Ma]:i.ONE_MINUS_SRC_ALPHA,[zh]:i.ONE_MINUS_DST_COLOR,[Bh]:i.ONE_MINUS_DST_ALPHA,[Vh]:i.CONSTANT_COLOR,[Gh]:i.ONE_MINUS_CONSTANT_COLOR,[Wh]:i.CONSTANT_ALPHA,[Xh]:i.ONE_MINUS_CONSTANT_ALPHA};function N(D,le,ie,pe,se,Q,ge,Ce,ot,Je){if(D===Wn){_===!0&&(be(i.BLEND),_=!1);return}if(_===!1&&(fe(i.BLEND),_=!0),D!==Rh){if(D!==m||Je!==y){if((p!==ri||M!==ri)&&(i.blendEquation(i.FUNC_ADD),p=ri,M=ri),Je)switch(D){case Di:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case jo:i.blendFunc(i.ONE,i.ONE);break;case Zo:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Jo:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case Di:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case jo:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Zo:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Jo:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}S=null,b=null,L=null,R=null,w.set(0,0,0),A=0,m=D,y=Je}return}se=se||le,Q=Q||ie,ge=ge||pe,(le!==p||se!==M)&&(i.blendEquationSeparate(ze[le],ze[se]),p=le,M=se),(ie!==S||pe!==b||Q!==L||ge!==R)&&(i.blendFuncSeparate(We[ie],We[pe],We[Q],We[ge]),S=ie,b=pe,L=Q,R=ge),(Ce.equals(w)===!1||ot!==A)&&(i.blendColor(Ce.r,Ce.g,Ce.b,ot),w.copy(Ce),A=ot),m=D,y=!1}function gt(D,le){D.side===_n?be(i.CULL_FACE):fe(i.CULL_FACE);let ie=D.side===Ct;le&&(ie=!ie),Xe(ie),D.blending===Di&&D.transparent===!1?N(Wn):N(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),a.setFunc(D.depthFunc),a.setTest(D.depthTest),a.setMask(D.depthWrite),r.setMask(D.colorWrite);const pe=D.stencilWrite;o.setTest(pe),pe&&(o.setMask(D.stencilWriteMask),o.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),o.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),Ve(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?fe(i.SAMPLE_ALPHA_TO_COVERAGE):be(i.SAMPLE_ALPHA_TO_COVERAGE)}function Xe(D){x!==D&&(D?i.frontFace(i.CW):i.frontFace(i.CCW),x=D)}function et(D){D!==wh?(fe(i.CULL_FACE),D!==I&&(D===Ko?i.cullFace(i.BACK):D===Ah?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):be(i.CULL_FACE),I=D}function ye(D){D!==z&&(K&&i.lineWidth(D),z=D)}function Ve(D,le,ie){D?(fe(i.POLYGON_OFFSET_FILL),(B!==le||Y!==ie)&&(i.polygonOffset(le,ie),B=le,Y=ie)):be(i.POLYGON_OFFSET_FILL)}function we(D){D?fe(i.SCISSOR_TEST):be(i.SCISSOR_TEST)}function Ne(D){D===void 0&&(D=i.TEXTURE0+Z-1),he!==D&&(i.activeTexture(D),he=D)}function ft(D,le,ie){ie===void 0&&(he===null?ie=i.TEXTURE0+Z-1:ie=he);let pe=_e[ie];pe===void 0&&(pe={type:void 0,texture:void 0},_e[ie]=pe),(pe.type!==D||pe.texture!==le)&&(he!==ie&&(i.activeTexture(ie),he=ie),i.bindTexture(D,le||Ee[D]),pe.type=D,pe.texture=le)}function P(){const D=_e[he];D!==void 0&&D.type!==void 0&&(i.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function v(){try{i.compressedTexImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function k(){try{i.compressedTexImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function j(){try{i.texSubImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function E(){try{i.texSubImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function C(){try{i.compressedTexSubImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function H(){try{i.compressedTexSubImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function V(){try{i.texStorage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ee(){try{i.texStorage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ne(){try{i.texImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function X(){try{i.texImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function J(D){tt.equals(D)===!1&&(i.scissor(D.x,D.y,D.z,D.w),tt.copy(D))}function Se(D){q.equals(D)===!1&&(i.viewport(D.x,D.y,D.z,D.w),q.copy(D))}function me(D,le){let ie=u.get(le);ie===void 0&&(ie=new WeakMap,u.set(le,ie));let pe=ie.get(D);pe===void 0&&(pe=i.getUniformBlockIndex(le,D.name),ie.set(D,pe))}function ae(D,le){const pe=u.get(le).get(D);l.get(le)!==pe&&(i.uniformBlockBinding(le,pe,D.__bindingPointIndex),l.set(le,pe))}function ce(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),c={},he=null,_e={},h={},d=new WeakMap,f=[],g=null,_=!1,m=null,p=null,S=null,b=null,M=null,L=null,R=null,w=new Pe(0,0,0),A=0,y=!1,x=null,I=null,z=null,B=null,Y=null,tt.set(0,0,i.canvas.width,i.canvas.height),q.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:fe,disable:be,bindFramebuffer:Ye,drawBuffers:Me,useProgram:st,setBlending:N,setMaterial:gt,setFlipSided:Xe,setCullFace:et,setLineWidth:ye,setPolygonOffset:Ve,setScissorTest:we,activeTexture:Ne,bindTexture:ft,unbindTexture:P,compressedTexImage2D:v,compressedTexImage3D:k,texImage2D:ne,texImage3D:X,updateUBOMapping:me,uniformBlockBinding:ae,texStorage2D:V,texStorage3D:ee,texSubImage2D:j,texSubImage3D:E,compressedTexSubImage2D:C,compressedTexSubImage3D:H,scissor:J,viewport:Se,reset:ce}}function M0(i,e,t,n,s,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),u=new De,c=new WeakMap;let h;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(P,v){return f?new OffscreenCanvas(P,v):Ts("canvas")}function _(P,v,k){let j=1;const E=ft(P);if((E.width>k||E.height>k)&&(j=k/Math.max(E.width,E.height)),j<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){const C=Math.floor(j*E.width),H=Math.floor(j*E.height);h===void 0&&(h=g(C,H));const V=v?g(C,H):h;return V.width=C,V.height=H,V.getContext("2d").drawImage(P,0,0,C,H),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+E.width+"x"+E.height+") to ("+C+"x"+H+")."),V}else return"data"in P&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+E.width+"x"+E.height+")."),P;return P}function m(P){return P.generateMipmaps}function p(P){i.generateMipmap(P)}function S(P){return P.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?i.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function b(P,v,k,j,E=!1){if(P!==null){if(i[P]!==void 0)return i[P];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let C=v;if(v===i.RED&&(k===i.FLOAT&&(C=i.R32F),k===i.HALF_FLOAT&&(C=i.R16F),k===i.UNSIGNED_BYTE&&(C=i.R8)),v===i.RED_INTEGER&&(k===i.UNSIGNED_BYTE&&(C=i.R8UI),k===i.UNSIGNED_SHORT&&(C=i.R16UI),k===i.UNSIGNED_INT&&(C=i.R32UI),k===i.BYTE&&(C=i.R8I),k===i.SHORT&&(C=i.R16I),k===i.INT&&(C=i.R32I)),v===i.RG&&(k===i.FLOAT&&(C=i.RG32F),k===i.HALF_FLOAT&&(C=i.RG16F),k===i.UNSIGNED_BYTE&&(C=i.RG8)),v===i.RG_INTEGER&&(k===i.UNSIGNED_BYTE&&(C=i.RG8UI),k===i.UNSIGNED_SHORT&&(C=i.RG16UI),k===i.UNSIGNED_INT&&(C=i.RG32UI),k===i.BYTE&&(C=i.RG8I),k===i.SHORT&&(C=i.RG16I),k===i.INT&&(C=i.RG32I)),v===i.RGB_INTEGER&&(k===i.UNSIGNED_BYTE&&(C=i.RGB8UI),k===i.UNSIGNED_SHORT&&(C=i.RGB16UI),k===i.UNSIGNED_INT&&(C=i.RGB32UI),k===i.BYTE&&(C=i.RGB8I),k===i.SHORT&&(C=i.RGB16I),k===i.INT&&(C=i.RGB32I)),v===i.RGBA_INTEGER&&(k===i.UNSIGNED_BYTE&&(C=i.RGBA8UI),k===i.UNSIGNED_SHORT&&(C=i.RGBA16UI),k===i.UNSIGNED_INT&&(C=i.RGBA32UI),k===i.BYTE&&(C=i.RGBA8I),k===i.SHORT&&(C=i.RGBA16I),k===i.INT&&(C=i.RGBA32I)),v===i.RGB&&k===i.UNSIGNED_INT_5_9_9_9_REV&&(C=i.RGB9_E5),v===i.RGBA){const H=E?xr:qe.getTransfer(j);k===i.FLOAT&&(C=i.RGBA32F),k===i.HALF_FLOAT&&(C=i.RGBA16F),k===i.UNSIGNED_BYTE&&(C=H===at?i.SRGB8_ALPHA8:i.RGBA8),k===i.UNSIGNED_SHORT_4_4_4_4&&(C=i.RGBA4),k===i.UNSIGNED_SHORT_5_5_5_1&&(C=i.RGB5_A1)}return(C===i.R16F||C===i.R32F||C===i.RG16F||C===i.RG32F||C===i.RGBA16F||C===i.RGBA32F)&&e.get("EXT_color_buffer_float"),C}function M(P,v){let k;return P?v===null||v===li||v===xs?k=i.DEPTH24_STENCIL8:v===un?k=i.DEPTH32F_STENCIL8:v===vs&&(k=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===li||v===xs?k=i.DEPTH_COMPONENT24:v===un?k=i.DEPTH_COMPONENT32F:v===vs&&(k=i.DEPTH_COMPONENT16),k}function L(P,v){return m(P)===!0||P.isFramebufferTexture&&P.minFilter!==Ft&&P.minFilter!==Yt?Math.log2(Math.max(v.width,v.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?v.mipmaps.length:1}function R(P){const v=P.target;v.removeEventListener("dispose",R),A(v),v.isVideoTexture&&c.delete(v)}function w(P){const v=P.target;v.removeEventListener("dispose",w),x(v)}function A(P){const v=n.get(P);if(v.__webglInit===void 0)return;const k=P.source,j=d.get(k);if(j){const E=j[v.__cacheKey];E.usedTimes--,E.usedTimes===0&&y(P),Object.keys(j).length===0&&d.delete(k)}n.remove(P)}function y(P){const v=n.get(P);i.deleteTexture(v.__webglTexture);const k=P.source,j=d.get(k);delete j[v.__cacheKey],a.memory.textures--}function x(P){const v=n.get(P);if(P.depthTexture&&(P.depthTexture.dispose(),n.remove(P.depthTexture)),P.isWebGLCubeRenderTarget)for(let j=0;j<6;j++){if(Array.isArray(v.__webglFramebuffer[j]))for(let E=0;E<v.__webglFramebuffer[j].length;E++)i.deleteFramebuffer(v.__webglFramebuffer[j][E]);else i.deleteFramebuffer(v.__webglFramebuffer[j]);v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer[j])}else{if(Array.isArray(v.__webglFramebuffer))for(let j=0;j<v.__webglFramebuffer.length;j++)i.deleteFramebuffer(v.__webglFramebuffer[j]);else i.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&i.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let j=0;j<v.__webglColorRenderbuffer.length;j++)v.__webglColorRenderbuffer[j]&&i.deleteRenderbuffer(v.__webglColorRenderbuffer[j]);v.__webglDepthRenderbuffer&&i.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const k=P.textures;for(let j=0,E=k.length;j<E;j++){const C=n.get(k[j]);C.__webglTexture&&(i.deleteTexture(C.__webglTexture),a.memory.textures--),n.remove(k[j])}n.remove(P)}let I=0;function z(){I=0}function B(){const P=I;return P>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+s.maxTextures),I+=1,P}function Y(P){const v=[];return v.push(P.wrapS),v.push(P.wrapT),v.push(P.wrapR||0),v.push(P.magFilter),v.push(P.minFilter),v.push(P.anisotropy),v.push(P.internalFormat),v.push(P.format),v.push(P.type),v.push(P.generateMipmaps),v.push(P.premultiplyAlpha),v.push(P.flipY),v.push(P.unpackAlignment),v.push(P.colorSpace),v.join()}function Z(P,v){const k=n.get(P);if(P.isVideoTexture&&we(P),P.isRenderTargetTexture===!1&&P.version>0&&k.__version!==P.version){const j=P.image;if(j===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(j.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Ee(k,P,v);return}}t.bindTexture(i.TEXTURE_2D,k.__webglTexture,i.TEXTURE0+v)}function K(P,v){const k=n.get(P);if(P.version>0&&k.__version!==P.version){Ee(k,P,v);return}t.bindTexture(i.TEXTURE_2D_ARRAY,k.__webglTexture,i.TEXTURE0+v)}function te(P,v){const k=n.get(P);if(P.version>0&&k.__version!==P.version){Ee(k,P,v);return}t.bindTexture(i.TEXTURE_3D,k.__webglTexture,i.TEXTURE0+v)}function $(P,v){const k=n.get(P);if(P.version>0&&k.__version!==P.version){fe(k,P,v);return}t.bindTexture(i.TEXTURE_CUBE_MAP,k.__webglTexture,i.TEXTURE0+v)}const he={[zi]:i.REPEAT,[Gn]:i.CLAMP_TO_EDGE,[vr]:i.MIRRORED_REPEAT},_e={[Ft]:i.NEAREST,[Vl]:i.NEAREST_MIPMAP_NEAREST,[fs]:i.NEAREST_MIPMAP_LINEAR,[Yt]:i.LINEAR,[lr]:i.LINEAR_MIPMAP_NEAREST,[Pn]:i.LINEAR_MIPMAP_LINEAR},Te={[ad]:i.NEVER,[dd]:i.ALWAYS,[od]:i.LESS,[Jl]:i.LEQUAL,[cd]:i.EQUAL,[hd]:i.GEQUAL,[ld]:i.GREATER,[ud]:i.NOTEQUAL};function Be(P,v){if(v.type===un&&e.has("OES_texture_float_linear")===!1&&(v.magFilter===Yt||v.magFilter===lr||v.magFilter===fs||v.magFilter===Pn||v.minFilter===Yt||v.minFilter===lr||v.minFilter===fs||v.minFilter===Pn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(P,i.TEXTURE_WRAP_S,he[v.wrapS]),i.texParameteri(P,i.TEXTURE_WRAP_T,he[v.wrapT]),(P===i.TEXTURE_3D||P===i.TEXTURE_2D_ARRAY)&&i.texParameteri(P,i.TEXTURE_WRAP_R,he[v.wrapR]),i.texParameteri(P,i.TEXTURE_MAG_FILTER,_e[v.magFilter]),i.texParameteri(P,i.TEXTURE_MIN_FILTER,_e[v.minFilter]),v.compareFunction&&(i.texParameteri(P,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(P,i.TEXTURE_COMPARE_FUNC,Te[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===Ft||v.minFilter!==fs&&v.minFilter!==Pn||v.type===un&&e.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||n.get(v).__currentAnisotropy){const k=e.get("EXT_texture_filter_anisotropic");i.texParameterf(P,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,s.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy}}}function tt(P,v){let k=!1;P.__webglInit===void 0&&(P.__webglInit=!0,v.addEventListener("dispose",R));const j=v.source;let E=d.get(j);E===void 0&&(E={},d.set(j,E));const C=Y(v);if(C!==P.__cacheKey){E[C]===void 0&&(E[C]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,k=!0),E[C].usedTimes++;const H=E[P.__cacheKey];H!==void 0&&(E[P.__cacheKey].usedTimes--,H.usedTimes===0&&y(v)),P.__cacheKey=C,P.__webglTexture=E[C].texture}return k}function q(P,v,k){return Math.floor(Math.floor(P/k)/v)}function oe(P,v,k,j){const C=P.updateRanges;if(C.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,v.width,v.height,k,j,v.data);else{C.sort((X,J)=>X.start-J.start);let H=0;for(let X=1;X<C.length;X++){const J=C[H],Se=C[X],me=J.start+J.count,ae=q(Se.start,v.width,4),ce=q(J.start,v.width,4);Se.start<=me+1&&ae===ce&&q(Se.start+Se.count-1,v.width,4)===ae?J.count=Math.max(J.count,Se.start+Se.count-J.start):(++H,C[H]=Se)}C.length=H+1;const V=i.getParameter(i.UNPACK_ROW_LENGTH),ee=i.getParameter(i.UNPACK_SKIP_PIXELS),ne=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,v.width);for(let X=0,J=C.length;X<J;X++){const Se=C[X],me=Math.floor(Se.start/4),ae=Math.ceil(Se.count/4),ce=me%v.width,D=Math.floor(me/v.width),le=ae,ie=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,ce),i.pixelStorei(i.UNPACK_SKIP_ROWS,D),t.texSubImage2D(i.TEXTURE_2D,0,ce,D,le,ie,k,j,v.data)}P.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,V),i.pixelStorei(i.UNPACK_SKIP_PIXELS,ee),i.pixelStorei(i.UNPACK_SKIP_ROWS,ne)}}function Ee(P,v,k){let j=i.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(j=i.TEXTURE_2D_ARRAY),v.isData3DTexture&&(j=i.TEXTURE_3D);const E=tt(P,v),C=v.source;t.bindTexture(j,P.__webglTexture,i.TEXTURE0+k);const H=n.get(C);if(C.version!==H.__version||E===!0){t.activeTexture(i.TEXTURE0+k);const V=qe.getPrimaries(qe.workingColorSpace),ee=v.colorSpace===Vn?null:qe.getPrimaries(v.colorSpace),ne=v.colorSpace===Vn||V===ee?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ne);let X=_(v.image,!1,s.maxTextureSize);X=Ne(v,X);const J=r.convert(v.format,v.colorSpace),Se=r.convert(v.type);let me=b(v.internalFormat,J,Se,v.colorSpace,v.isVideoTexture);Be(j,v);let ae;const ce=v.mipmaps,D=v.isVideoTexture!==!0,le=H.__version===void 0||E===!0,ie=C.dataReady,pe=L(v,X);if(v.isDepthTexture)me=M(v.format===ys,v.type),le&&(D?t.texStorage2D(i.TEXTURE_2D,1,me,X.width,X.height):t.texImage2D(i.TEXTURE_2D,0,me,X.width,X.height,0,J,Se,null));else if(v.isDataTexture)if(ce.length>0){D&&le&&t.texStorage2D(i.TEXTURE_2D,pe,me,ce[0].width,ce[0].height);for(let se=0,Q=ce.length;se<Q;se++)ae=ce[se],D?ie&&t.texSubImage2D(i.TEXTURE_2D,se,0,0,ae.width,ae.height,J,Se,ae.data):t.texImage2D(i.TEXTURE_2D,se,me,ae.width,ae.height,0,J,Se,ae.data);v.generateMipmaps=!1}else D?(le&&t.texStorage2D(i.TEXTURE_2D,pe,me,X.width,X.height),ie&&oe(v,X,J,Se)):t.texImage2D(i.TEXTURE_2D,0,me,X.width,X.height,0,J,Se,X.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){D&&le&&t.texStorage3D(i.TEXTURE_2D_ARRAY,pe,me,ce[0].width,ce[0].height,X.depth);for(let se=0,Q=ce.length;se<Q;se++)if(ae=ce[se],v.format!==en)if(J!==null)if(D){if(ie)if(v.layerUpdates.size>0){const ge=Vc(ae.width,ae.height,v.format,v.type);for(const Ce of v.layerUpdates){const ot=ae.data.subarray(Ce*ge/ae.data.BYTES_PER_ELEMENT,(Ce+1)*ge/ae.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,se,0,0,Ce,ae.width,ae.height,1,J,ot)}v.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,se,0,0,0,ae.width,ae.height,X.depth,J,ae.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,se,me,ae.width,ae.height,X.depth,0,ae.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else D?ie&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,se,0,0,0,ae.width,ae.height,X.depth,J,Se,ae.data):t.texImage3D(i.TEXTURE_2D_ARRAY,se,me,ae.width,ae.height,X.depth,0,J,Se,ae.data)}else{D&&le&&t.texStorage2D(i.TEXTURE_2D,pe,me,ce[0].width,ce[0].height);for(let se=0,Q=ce.length;se<Q;se++)ae=ce[se],v.format!==en?J!==null?D?ie&&t.compressedTexSubImage2D(i.TEXTURE_2D,se,0,0,ae.width,ae.height,J,ae.data):t.compressedTexImage2D(i.TEXTURE_2D,se,me,ae.width,ae.height,0,ae.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):D?ie&&t.texSubImage2D(i.TEXTURE_2D,se,0,0,ae.width,ae.height,J,Se,ae.data):t.texImage2D(i.TEXTURE_2D,se,me,ae.width,ae.height,0,J,Se,ae.data)}else if(v.isDataArrayTexture)if(D){if(le&&t.texStorage3D(i.TEXTURE_2D_ARRAY,pe,me,X.width,X.height,X.depth),ie)if(v.layerUpdates.size>0){const se=Vc(X.width,X.height,v.format,v.type);for(const Q of v.layerUpdates){const ge=X.data.subarray(Q*se/X.data.BYTES_PER_ELEMENT,(Q+1)*se/X.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Q,X.width,X.height,1,J,Se,ge)}v.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,X.width,X.height,X.depth,J,Se,X.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,me,X.width,X.height,X.depth,0,J,Se,X.data);else if(v.isData3DTexture)D?(le&&t.texStorage3D(i.TEXTURE_3D,pe,me,X.width,X.height,X.depth),ie&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,X.width,X.height,X.depth,J,Se,X.data)):t.texImage3D(i.TEXTURE_3D,0,me,X.width,X.height,X.depth,0,J,Se,X.data);else if(v.isFramebufferTexture){if(le)if(D)t.texStorage2D(i.TEXTURE_2D,pe,me,X.width,X.height);else{let se=X.width,Q=X.height;for(let ge=0;ge<pe;ge++)t.texImage2D(i.TEXTURE_2D,ge,me,se,Q,0,J,Se,null),se>>=1,Q>>=1}}else if(ce.length>0){if(D&&le){const se=ft(ce[0]);t.texStorage2D(i.TEXTURE_2D,pe,me,se.width,se.height)}for(let se=0,Q=ce.length;se<Q;se++)ae=ce[se],D?ie&&t.texSubImage2D(i.TEXTURE_2D,se,0,0,J,Se,ae):t.texImage2D(i.TEXTURE_2D,se,me,J,Se,ae);v.generateMipmaps=!1}else if(D){if(le){const se=ft(X);t.texStorage2D(i.TEXTURE_2D,pe,me,se.width,se.height)}ie&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,J,Se,X)}else t.texImage2D(i.TEXTURE_2D,0,me,J,Se,X);m(v)&&p(j),H.__version=C.version,v.onUpdate&&v.onUpdate(v)}P.__version=v.version}function fe(P,v,k){if(v.image.length!==6)return;const j=tt(P,v),E=v.source;t.bindTexture(i.TEXTURE_CUBE_MAP,P.__webglTexture,i.TEXTURE0+k);const C=n.get(E);if(E.version!==C.__version||j===!0){t.activeTexture(i.TEXTURE0+k);const H=qe.getPrimaries(qe.workingColorSpace),V=v.colorSpace===Vn?null:qe.getPrimaries(v.colorSpace),ee=v.colorSpace===Vn||H===V?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ee);const ne=v.isCompressedTexture||v.image[0].isCompressedTexture,X=v.image[0]&&v.image[0].isDataTexture,J=[];for(let Q=0;Q<6;Q++)!ne&&!X?J[Q]=_(v.image[Q],!0,s.maxCubemapSize):J[Q]=X?v.image[Q].image:v.image[Q],J[Q]=Ne(v,J[Q]);const Se=J[0],me=r.convert(v.format,v.colorSpace),ae=r.convert(v.type),ce=b(v.internalFormat,me,ae,v.colorSpace),D=v.isVideoTexture!==!0,le=C.__version===void 0||j===!0,ie=E.dataReady;let pe=L(v,Se);Be(i.TEXTURE_CUBE_MAP,v);let se;if(ne){D&&le&&t.texStorage2D(i.TEXTURE_CUBE_MAP,pe,ce,Se.width,Se.height);for(let Q=0;Q<6;Q++){se=J[Q].mipmaps;for(let ge=0;ge<se.length;ge++){const Ce=se[ge];v.format!==en?me!==null?D?ie&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,ge,0,0,Ce.width,Ce.height,me,Ce.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,ge,ce,Ce.width,Ce.height,0,Ce.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):D?ie&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,ge,0,0,Ce.width,Ce.height,me,ae,Ce.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,ge,ce,Ce.width,Ce.height,0,me,ae,Ce.data)}}}else{if(se=v.mipmaps,D&&le){se.length>0&&pe++;const Q=ft(J[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,pe,ce,Q.width,Q.height)}for(let Q=0;Q<6;Q++)if(X){D?ie&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,J[Q].width,J[Q].height,me,ae,J[Q].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,ce,J[Q].width,J[Q].height,0,me,ae,J[Q].data);for(let ge=0;ge<se.length;ge++){const ot=se[ge].image[Q].image;D?ie&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,ge+1,0,0,ot.width,ot.height,me,ae,ot.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,ge+1,ce,ot.width,ot.height,0,me,ae,ot.data)}}else{D?ie&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,me,ae,J[Q]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,ce,me,ae,J[Q]);for(let ge=0;ge<se.length;ge++){const Ce=se[ge];D?ie&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,ge+1,0,0,me,ae,Ce.image[Q]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,ge+1,ce,me,ae,Ce.image[Q])}}}m(v)&&p(i.TEXTURE_CUBE_MAP),C.__version=E.version,v.onUpdate&&v.onUpdate(v)}P.__version=v.version}function be(P,v,k,j,E,C){const H=r.convert(k.format,k.colorSpace),V=r.convert(k.type),ee=b(k.internalFormat,H,V,k.colorSpace),ne=n.get(v),X=n.get(k);if(X.__renderTarget=v,!ne.__hasExternalTextures){const J=Math.max(1,v.width>>C),Se=Math.max(1,v.height>>C);E===i.TEXTURE_3D||E===i.TEXTURE_2D_ARRAY?t.texImage3D(E,C,ee,J,Se,v.depth,0,H,V,null):t.texImage2D(E,C,ee,J,Se,0,H,V,null)}t.bindFramebuffer(i.FRAMEBUFFER,P),Ve(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,j,E,X.__webglTexture,0,ye(v)):(E===i.TEXTURE_2D||E>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&E<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,j,E,X.__webglTexture,C),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ye(P,v,k){if(i.bindRenderbuffer(i.RENDERBUFFER,P),v.depthBuffer){const j=v.depthTexture,E=j&&j.isDepthTexture?j.type:null,C=M(v.stencilBuffer,E),H=v.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,V=ye(v);Ve(v)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,V,C,v.width,v.height):k?i.renderbufferStorageMultisample(i.RENDERBUFFER,V,C,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,C,v.width,v.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,H,i.RENDERBUFFER,P)}else{const j=v.textures;for(let E=0;E<j.length;E++){const C=j[E],H=r.convert(C.format,C.colorSpace),V=r.convert(C.type),ee=b(C.internalFormat,H,V,C.colorSpace),ne=ye(v);k&&Ve(v)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,ne,ee,v.width,v.height):Ve(v)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ne,ee,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,ee,v.width,v.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Me(P,v){if(v&&v.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,P),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const j=n.get(v.depthTexture);j.__renderTarget=v,(!j.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),Z(v.depthTexture,0);const E=j.__webglTexture,C=ye(v);if(v.depthTexture.format===Ms)Ve(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,E,0,C):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,E,0);else if(v.depthTexture.format===ys)Ve(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,E,0,C):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,E,0);else throw new Error("Unknown depthTexture format")}function st(P){const v=n.get(P),k=P.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==P.depthTexture){const j=P.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),j){const E=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,j.removeEventListener("dispose",E)};j.addEventListener("dispose",E),v.__depthDisposeCallback=E}v.__boundDepthTexture=j}if(P.depthTexture&&!v.__autoAllocateDepthBuffer){if(k)throw new Error("target.depthTexture not supported in Cube render targets");const j=P.texture.mipmaps;j&&j.length>0?Me(v.__webglFramebuffer[0],P):Me(v.__webglFramebuffer,P)}else if(k){v.__webglDepthbuffer=[];for(let j=0;j<6;j++)if(t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[j]),v.__webglDepthbuffer[j]===void 0)v.__webglDepthbuffer[j]=i.createRenderbuffer(),Ye(v.__webglDepthbuffer[j],P,!1);else{const E=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,C=v.__webglDepthbuffer[j];i.bindRenderbuffer(i.RENDERBUFFER,C),i.framebufferRenderbuffer(i.FRAMEBUFFER,E,i.RENDERBUFFER,C)}}else{const j=P.texture.mipmaps;if(j&&j.length>0?t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=i.createRenderbuffer(),Ye(v.__webglDepthbuffer,P,!1);else{const E=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,C=v.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,C),i.framebufferRenderbuffer(i.FRAMEBUFFER,E,i.RENDERBUFFER,C)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function ze(P,v,k){const j=n.get(P);v!==void 0&&be(j.__webglFramebuffer,P,P.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),k!==void 0&&st(P)}function We(P){const v=P.texture,k=n.get(P),j=n.get(v);P.addEventListener("dispose",w);const E=P.textures,C=P.isWebGLCubeRenderTarget===!0,H=E.length>1;if(H||(j.__webglTexture===void 0&&(j.__webglTexture=i.createTexture()),j.__version=v.version,a.memory.textures++),C){k.__webglFramebuffer=[];for(let V=0;V<6;V++)if(v.mipmaps&&v.mipmaps.length>0){k.__webglFramebuffer[V]=[];for(let ee=0;ee<v.mipmaps.length;ee++)k.__webglFramebuffer[V][ee]=i.createFramebuffer()}else k.__webglFramebuffer[V]=i.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){k.__webglFramebuffer=[];for(let V=0;V<v.mipmaps.length;V++)k.__webglFramebuffer[V]=i.createFramebuffer()}else k.__webglFramebuffer=i.createFramebuffer();if(H)for(let V=0,ee=E.length;V<ee;V++){const ne=n.get(E[V]);ne.__webglTexture===void 0&&(ne.__webglTexture=i.createTexture(),a.memory.textures++)}if(P.samples>0&&Ve(P)===!1){k.__webglMultisampledFramebuffer=i.createFramebuffer(),k.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let V=0;V<E.length;V++){const ee=E[V];k.__webglColorRenderbuffer[V]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,k.__webglColorRenderbuffer[V]);const ne=r.convert(ee.format,ee.colorSpace),X=r.convert(ee.type),J=b(ee.internalFormat,ne,X,ee.colorSpace,P.isXRRenderTarget===!0),Se=ye(P);i.renderbufferStorageMultisample(i.RENDERBUFFER,Se,J,P.width,P.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+V,i.RENDERBUFFER,k.__webglColorRenderbuffer[V])}i.bindRenderbuffer(i.RENDERBUFFER,null),P.depthBuffer&&(k.__webglDepthRenderbuffer=i.createRenderbuffer(),Ye(k.__webglDepthRenderbuffer,P,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(C){t.bindTexture(i.TEXTURE_CUBE_MAP,j.__webglTexture),Be(i.TEXTURE_CUBE_MAP,v);for(let V=0;V<6;V++)if(v.mipmaps&&v.mipmaps.length>0)for(let ee=0;ee<v.mipmaps.length;ee++)be(k.__webglFramebuffer[V][ee],P,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+V,ee);else be(k.__webglFramebuffer[V],P,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+V,0);m(v)&&p(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(H){for(let V=0,ee=E.length;V<ee;V++){const ne=E[V],X=n.get(ne);t.bindTexture(i.TEXTURE_2D,X.__webglTexture),Be(i.TEXTURE_2D,ne),be(k.__webglFramebuffer,P,ne,i.COLOR_ATTACHMENT0+V,i.TEXTURE_2D,0),m(ne)&&p(i.TEXTURE_2D)}t.unbindTexture()}else{let V=i.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(V=P.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(V,j.__webglTexture),Be(V,v),v.mipmaps&&v.mipmaps.length>0)for(let ee=0;ee<v.mipmaps.length;ee++)be(k.__webglFramebuffer[ee],P,v,i.COLOR_ATTACHMENT0,V,ee);else be(k.__webglFramebuffer,P,v,i.COLOR_ATTACHMENT0,V,0);m(v)&&p(V),t.unbindTexture()}P.depthBuffer&&st(P)}function N(P){const v=P.textures;for(let k=0,j=v.length;k<j;k++){const E=v[k];if(m(E)){const C=S(P),H=n.get(E).__webglTexture;t.bindTexture(C,H),p(C),t.unbindTexture()}}}const gt=[],Xe=[];function et(P){if(P.samples>0){if(Ve(P)===!1){const v=P.textures,k=P.width,j=P.height;let E=i.COLOR_BUFFER_BIT;const C=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,H=n.get(P),V=v.length>1;if(V)for(let ne=0;ne<v.length;ne++)t.bindFramebuffer(i.FRAMEBUFFER,H.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ne,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,H.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ne,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,H.__webglMultisampledFramebuffer);const ee=P.texture.mipmaps;ee&&ee.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,H.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,H.__webglFramebuffer);for(let ne=0;ne<v.length;ne++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(E|=i.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(E|=i.STENCIL_BUFFER_BIT)),V){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,H.__webglColorRenderbuffer[ne]);const X=n.get(v[ne]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,X,0)}i.blitFramebuffer(0,0,k,j,0,0,k,j,E,i.NEAREST),l===!0&&(gt.length=0,Xe.length=0,gt.push(i.COLOR_ATTACHMENT0+ne),P.depthBuffer&&P.resolveDepthBuffer===!1&&(gt.push(C),Xe.push(C),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Xe)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,gt))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),V)for(let ne=0;ne<v.length;ne++){t.bindFramebuffer(i.FRAMEBUFFER,H.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ne,i.RENDERBUFFER,H.__webglColorRenderbuffer[ne]);const X=n.get(v[ne]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,H.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ne,i.TEXTURE_2D,X,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,H.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.resolveDepthBuffer===!1&&l){const v=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[v])}}}function ye(P){return Math.min(s.maxSamples,P.samples)}function Ve(P){const v=n.get(P);return P.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function we(P){const v=a.render.frame;c.get(P)!==v&&(c.set(P,v),P.update())}function Ne(P,v){const k=P.colorSpace,j=P.format,E=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||k!==Bt&&k!==Vn&&(qe.getTransfer(k)===at?(j!==en||E!==xn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",k)),v}function ft(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(u.width=P.naturalWidth||P.width,u.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(u.width=P.displayWidth,u.height=P.displayHeight):(u.width=P.width,u.height=P.height),u}this.allocateTextureUnit=B,this.resetTextureUnits=z,this.setTexture2D=Z,this.setTexture2DArray=K,this.setTexture3D=te,this.setTextureCube=$,this.rebindTextures=ze,this.setupRenderTarget=We,this.updateRenderTargetMipmap=N,this.updateMultisampleRenderTarget=et,this.setupDepthRenderbuffer=st,this.setupFrameBufferTexture=be,this.useMultisampledRTT=Ve}function y0(i,e){function t(n,s=Vn){let r;const a=qe.getTransfer(s);if(n===xn)return i.UNSIGNED_BYTE;if(n===mo)return i.UNSIGNED_SHORT_4_4_4_4;if(n===go)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Xl)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Gl)return i.BYTE;if(n===Wl)return i.SHORT;if(n===vs)return i.UNSIGNED_SHORT;if(n===po)return i.INT;if(n===li)return i.UNSIGNED_INT;if(n===un)return i.FLOAT;if(n===ws)return i.HALF_FLOAT;if(n===$l)return i.ALPHA;if(n===ql)return i.RGB;if(n===en)return i.RGBA;if(n===Ms)return i.DEPTH_COMPONENT;if(n===ys)return i.DEPTH_STENCIL;if(n===_o)return i.RED;if(n===vo)return i.RED_INTEGER;if(n===Yl)return i.RG;if(n===xo)return i.RG_INTEGER;if(n===Mo)return i.RGBA_INTEGER;if(n===ur||n===hr||n===dr||n===fr)if(a===at)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===ur)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===hr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===dr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===fr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===ur)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===hr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===dr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===fr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===La||n===Ia||n===Da||n===Na)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===La)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Ia)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Da)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Na)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Ua||n===Fa||n===Oa)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Ua||n===Fa)return a===at?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Oa)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Ba||n===ka||n===za||n===Ha||n===Va||n===Ga||n===Wa||n===Xa||n===$a||n===qa||n===Ya||n===Ka||n===ja||n===Za)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Ba)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===ka)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===za)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Ha)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Va)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Ga)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Wa)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Xa)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===$a)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===qa)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ya)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ka)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===ja)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Za)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===pr||n===Ja||n===Qa)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===pr)return a===at?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Ja)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Qa)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Kl||n===eo||n===to||n===no)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===pr)return r.COMPRESSED_RED_RGTC1_EXT;if(n===eo)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===to)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===no)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===xs?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const S0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,E0=`
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

}`;class T0{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const s=new bt,r=e.properties.get(s);r.__webglTexture=t.texture,(t.depthNear!==n.depthNear||t.depthFar!==n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=s}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new $n({vertexShader:S0,fragmentShader:E0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Ke(new Gi(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class b0 extends Yi{constructor(e,t){super();const n=this;let s=null,r=1,a=null,o="local-floor",l=1,u=null,c=null,h=null,d=null,f=null,g=null;const _=new T0,m=t.getContextAttributes();let p=null,S=null;const b=[],M=[],L=new De;let R=null;const w=new Nt;w.viewport=new Qe;const A=new Nt;A.viewport=new Qe;const y=[w,A],x=new Of;let I=null,z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let oe=b[q];return oe===void 0&&(oe=new ea,b[q]=oe),oe.getTargetRaySpace()},this.getControllerGrip=function(q){let oe=b[q];return oe===void 0&&(oe=new ea,b[q]=oe),oe.getGripSpace()},this.getHand=function(q){let oe=b[q];return oe===void 0&&(oe=new ea,b[q]=oe),oe.getHandSpace()};function B(q){const oe=M.indexOf(q.inputSource);if(oe===-1)return;const Ee=b[oe];Ee!==void 0&&(Ee.update(q.inputSource,q.frame,u||a),Ee.dispatchEvent({type:q.type,data:q.inputSource}))}function Y(){s.removeEventListener("select",B),s.removeEventListener("selectstart",B),s.removeEventListener("selectend",B),s.removeEventListener("squeeze",B),s.removeEventListener("squeezestart",B),s.removeEventListener("squeezeend",B),s.removeEventListener("end",Y),s.removeEventListener("inputsourceschange",Z);for(let q=0;q<b.length;q++){const oe=M[q];oe!==null&&(M[q]=null,b[q].disconnect(oe))}I=null,z=null,_.reset(),e.setRenderTarget(p),f=null,d=null,h=null,s=null,S=null,tt.stop(),n.isPresenting=!1,e.setPixelRatio(R),e.setSize(L.width,L.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){r=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){o=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return u||a},this.setReferenceSpace=function(q){u=q},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return h},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(q){if(s=q,s!==null){if(p=e.getRenderTarget(),s.addEventListener("select",B),s.addEventListener("selectstart",B),s.addEventListener("selectend",B),s.addEventListener("squeeze",B),s.addEventListener("squeezestart",B),s.addEventListener("squeezeend",B),s.addEventListener("end",Y),s.addEventListener("inputsourceschange",Z),m.xrCompatible!==!0&&await t.makeXRCompatible(),R=e.getPixelRatio(),e.getSize(L),typeof XRWebGLBinding<"u"&&"createProjectionLayer"in XRWebGLBinding.prototype){let Ee=null,fe=null,be=null;m.depth&&(be=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Ee=m.stencil?ys:Ms,fe=m.stencil?xs:li);const Ye={colorFormat:t.RGBA8,depthFormat:be,scaleFactor:r};h=new XRWebGLBinding(s,t),d=h.createProjectionLayer(Ye),s.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),S=new ui(d.textureWidth,d.textureHeight,{format:en,type:xn,depthTexture:new fu(d.textureWidth,d.textureHeight,fe,void 0,void 0,void 0,void 0,void 0,void 0,Ee),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const Ee={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,Ee),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),S=new ui(f.framebufferWidth,f.framebufferHeight,{format:en,type:xn,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(l),u=null,a=await s.requestReferenceSpace(o),tt.setContext(s),tt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function Z(q){for(let oe=0;oe<q.removed.length;oe++){const Ee=q.removed[oe],fe=M.indexOf(Ee);fe>=0&&(M[fe]=null,b[fe].disconnect(Ee))}for(let oe=0;oe<q.added.length;oe++){const Ee=q.added[oe];let fe=M.indexOf(Ee);if(fe===-1){for(let Ye=0;Ye<b.length;Ye++)if(Ye>=M.length){M.push(Ee),fe=Ye;break}else if(M[Ye]===null){M[Ye]=Ee,fe=Ye;break}if(fe===-1)break}const be=b[fe];be&&be.connect(Ee)}}const K=new U,te=new U;function $(q,oe,Ee){K.setFromMatrixPosition(oe.matrixWorld),te.setFromMatrixPosition(Ee.matrixWorld);const fe=K.distanceTo(te),be=oe.projectionMatrix.elements,Ye=Ee.projectionMatrix.elements,Me=be[14]/(be[10]-1),st=be[14]/(be[10]+1),ze=(be[9]+1)/be[5],We=(be[9]-1)/be[5],N=(be[8]-1)/be[0],gt=(Ye[8]+1)/Ye[0],Xe=Me*N,et=Me*gt,ye=fe/(-N+gt),Ve=ye*-N;if(oe.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(Ve),q.translateZ(ye),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert(),be[10]===-1)q.projectionMatrix.copy(oe.projectionMatrix),q.projectionMatrixInverse.copy(oe.projectionMatrixInverse);else{const we=Me+ye,Ne=st+ye,ft=Xe-Ve,P=et+(fe-Ve),v=ze*st/Ne*we,k=We*st/Ne*we;q.projectionMatrix.makePerspective(ft,P,v,k,we,Ne),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}}function he(q,oe){oe===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(oe.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(s===null)return;let oe=q.near,Ee=q.far;_.texture!==null&&(_.depthNear>0&&(oe=_.depthNear),_.depthFar>0&&(Ee=_.depthFar)),x.near=A.near=w.near=oe,x.far=A.far=w.far=Ee,(I!==x.near||z!==x.far)&&(s.updateRenderState({depthNear:x.near,depthFar:x.far}),I=x.near,z=x.far),w.layers.mask=q.layers.mask|2,A.layers.mask=q.layers.mask|4,x.layers.mask=w.layers.mask|A.layers.mask;const fe=q.parent,be=x.cameras;he(x,fe);for(let Ye=0;Ye<be.length;Ye++)he(be[Ye],fe);be.length===2?$(x,w,A):x.projectionMatrix.copy(w.projectionMatrix),_e(q,x,fe)};function _e(q,oe,Ee){Ee===null?q.matrix.copy(oe.matrixWorld):(q.matrix.copy(Ee.matrixWorld),q.matrix.invert(),q.matrix.multiply(oe.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(oe.projectionMatrix),q.projectionMatrixInverse.copy(oe.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=Hi*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return x},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(q){l=q,d!==null&&(d.fixedFoveation=q),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=q)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(x)};let Te=null;function Be(q,oe){if(c=oe.getViewerPose(u||a),g=oe,c!==null){const Ee=c.views;f!==null&&(e.setRenderTargetFramebuffer(S,f.framebuffer),e.setRenderTarget(S));let fe=!1;Ee.length!==x.cameras.length&&(x.cameras.length=0,fe=!0);for(let Me=0;Me<Ee.length;Me++){const st=Ee[Me];let ze=null;if(f!==null)ze=f.getViewport(st);else{const N=h.getViewSubImage(d,st);ze=N.viewport,Me===0&&(e.setRenderTargetTextures(S,N.colorTexture,N.depthStencilTexture),e.setRenderTarget(S))}let We=y[Me];We===void 0&&(We=new Nt,We.layers.enable(Me),We.viewport=new Qe,y[Me]=We),We.matrix.fromArray(st.transform.matrix),We.matrix.decompose(We.position,We.quaternion,We.scale),We.projectionMatrix.fromArray(st.projectionMatrix),We.projectionMatrixInverse.copy(We.projectionMatrix).invert(),We.viewport.set(ze.x,ze.y,ze.width,ze.height),Me===0&&(x.matrix.copy(We.matrix),x.matrix.decompose(x.position,x.quaternion,x.scale)),fe===!0&&x.cameras.push(We)}const be=s.enabledFeatures;if(be&&be.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&h){const Me=h.getDepthInformation(Ee[0]);Me&&Me.isValid&&Me.texture&&_.init(e,Me,s.renderState)}}for(let Ee=0;Ee<b.length;Ee++){const fe=M[Ee],be=b[Ee];fe!==null&&be!==void 0&&be.update(fe,oe,u||a)}Te&&Te(q,oe),oe.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:oe}),g=null}const tt=new vu;tt.setAnimationLoop(Be),this.setAnimationLoop=function(q){Te=q},this.dispose=function(){}}}const ei=new Mn,w0=new Fe;function A0(i,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,ru(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,S,b,M){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),h(m,p)):p.isMeshPhongMaterial?(r(m,p),c(m,p)):p.isMeshStandardMaterial?(r(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,M)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),_(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?l(m,p,S,b):p.isSpriteMaterial?u(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Ct&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Ct&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const S=e.get(p),b=S.envMap,M=S.envMapRotation;b&&(m.envMap.value=b,ei.copy(M),ei.x*=-1,ei.y*=-1,ei.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(ei.y*=-1,ei.z*=-1),m.envMapRotation.value.setFromMatrix4(w0.makeRotationFromEuler(ei)),m.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,S,b){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*S,m.scale.value=b*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function h(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,S){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Ct&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=S.texture,m.transmissionSamplerSize.value.set(S.width,S.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){const S=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(S.matrixWorld),m.nearDistance.value=S.shadow.camera.near,m.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function R0(i,e,t,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(S,b){const M=b.program;n.uniformBlockBinding(S,M)}function u(S,b){let M=s[S.id];M===void 0&&(g(S),M=c(S),s[S.id]=M,S.addEventListener("dispose",m));const L=b.program;n.updateUBOMapping(S,L);const R=e.render.frame;r[S.id]!==R&&(d(S),r[S.id]=R)}function c(S){const b=h();S.__bindingPointIndex=b;const M=i.createBuffer(),L=S.__size,R=S.usage;return i.bindBuffer(i.UNIFORM_BUFFER,M),i.bufferData(i.UNIFORM_BUFFER,L,R),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,b,M),M}function h(){for(let S=0;S<o;S++)if(a.indexOf(S)===-1)return a.push(S),S;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(S){const b=s[S.id],M=S.uniforms,L=S.__cache;i.bindBuffer(i.UNIFORM_BUFFER,b);for(let R=0,w=M.length;R<w;R++){const A=Array.isArray(M[R])?M[R]:[M[R]];for(let y=0,x=A.length;y<x;y++){const I=A[y];if(f(I,R,y,L)===!0){const z=I.__offset,B=Array.isArray(I.value)?I.value:[I.value];let Y=0;for(let Z=0;Z<B.length;Z++){const K=B[Z],te=_(K);typeof K=="number"||typeof K=="boolean"?(I.__data[0]=K,i.bufferSubData(i.UNIFORM_BUFFER,z+Y,I.__data)):K.isMatrix3?(I.__data[0]=K.elements[0],I.__data[1]=K.elements[1],I.__data[2]=K.elements[2],I.__data[3]=0,I.__data[4]=K.elements[3],I.__data[5]=K.elements[4],I.__data[6]=K.elements[5],I.__data[7]=0,I.__data[8]=K.elements[6],I.__data[9]=K.elements[7],I.__data[10]=K.elements[8],I.__data[11]=0):(K.toArray(I.__data,Y),Y+=te.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,z,I.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(S,b,M,L){const R=S.value,w=b+"_"+M;if(L[w]===void 0)return typeof R=="number"||typeof R=="boolean"?L[w]=R:L[w]=R.clone(),!0;{const A=L[w];if(typeof R=="number"||typeof R=="boolean"){if(A!==R)return L[w]=R,!0}else if(A.equals(R)===!1)return A.copy(R),!0}return!1}function g(S){const b=S.uniforms;let M=0;const L=16;for(let w=0,A=b.length;w<A;w++){const y=Array.isArray(b[w])?b[w]:[b[w]];for(let x=0,I=y.length;x<I;x++){const z=y[x],B=Array.isArray(z.value)?z.value:[z.value];for(let Y=0,Z=B.length;Y<Z;Y++){const K=B[Y],te=_(K),$=M%L,he=$%te.boundary,_e=$+he;M+=he,_e!==0&&L-_e<te.storage&&(M+=L-_e),z.__data=new Float32Array(te.storage/Float32Array.BYTES_PER_ELEMENT),z.__offset=M,M+=te.storage}}}const R=M%L;return R>0&&(M+=L-R),S.__size=M,S.__cache={},this}function _(S){const b={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(b.boundary=4,b.storage=4):S.isVector2?(b.boundary=8,b.storage=8):S.isVector3||S.isColor?(b.boundary=16,b.storage=12):S.isVector4?(b.boundary=16,b.storage=16):S.isMatrix3?(b.boundary=48,b.storage=48):S.isMatrix4?(b.boundary=64,b.storage=64):S.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",S),b}function m(S){const b=S.target;b.removeEventListener("dispose",m);const M=a.indexOf(b.__bindingPointIndex);a.splice(M,1),i.deleteBuffer(s[b.id]),delete s[b.id],delete r[b.id]}function p(){for(const S in s)i.deleteBuffer(s[S]);a=[],s={},r={}}return{bind:l,update:u,dispose:p}}class dl{constructor(e={}){const{canvas:t=Pd(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:u=!1,powerPreference:c="default",failIfMajorPerformanceCaveat:h=!1,reverseDepthBuffer:d=!1}=e;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=a;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,p=null;const S=[],b=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Xn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const M=this;let L=!1;this._outputColorSpace=yt;let R=0,w=0,A=null,y=-1,x=null;const I=new Qe,z=new Qe;let B=null;const Y=new Pe(0);let Z=0,K=t.width,te=t.height,$=1,he=null,_e=null;const Te=new Qe(0,0,K,te),Be=new Qe(0,0,K,te);let tt=!1;const q=new bo;let oe=!1,Ee=!1;const fe=new Fe,be=new Fe,Ye=new U,Me=new Qe,st={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ze=!1;function We(){return A===null?$:1}let N=n;function gt(T,F){return t.getContext(T,F)}try{const T={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:u,powerPreference:c,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${fo}`),t.addEventListener("webglcontextlost",pe,!1),t.addEventListener("webglcontextrestored",se,!1),t.addEventListener("webglcontextcreationerror",Q,!1),N===null){const F="webgl2";if(N=gt(F,T),N===null)throw gt(F)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let Xe,et,ye,Ve,we,Ne,ft,P,v,k,j,E,C,H,V,ee,ne,X,J,Se,me,ae,ce,D;function le(){Xe=new kg(N),Xe.init(),ae=new y0(N,Xe),et=new Ig(N,Xe,e,ae),ye=new x0(N,Xe),et.reverseDepthBuffer&&d&&ye.buffers.depth.setReversed(!0),Ve=new Vg(N),we=new a0,Ne=new M0(N,Xe,ye,we,et,ae,Ve),ft=new Ng(M),P=new Bg(M),v=new Yf(N),ce=new Pg(N,v),k=new zg(N,v,Ve,ce),j=new Wg(N,k,v,Ve),J=new Gg(N,et,Ne),ee=new Dg(we),E=new r0(M,ft,P,Xe,et,ce,ee),C=new A0(M,we),H=new c0,V=new p0(Xe),X=new Cg(M,ft,P,ye,j,f,l),ne=new _0(M,j,et),D=new R0(N,Ve,et,ye),Se=new Lg(N,Xe,Ve),me=new Hg(N,Xe,Ve),Ve.programs=E.programs,M.capabilities=et,M.extensions=Xe,M.properties=we,M.renderLists=H,M.shadowMap=ne,M.state=ye,M.info=Ve}le();const ie=new b0(M,N);this.xr=ie,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){const T=Xe.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=Xe.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return $},this.setPixelRatio=function(T){T!==void 0&&($=T,this.setSize(K,te,!1))},this.getSize=function(T){return T.set(K,te)},this.setSize=function(T,F,G=!0){if(ie.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}K=T,te=F,t.width=Math.floor(T*$),t.height=Math.floor(F*$),G===!0&&(t.style.width=T+"px",t.style.height=F+"px"),this.setViewport(0,0,T,F)},this.getDrawingBufferSize=function(T){return T.set(K*$,te*$).floor()},this.setDrawingBufferSize=function(T,F,G){K=T,te=F,$=G,t.width=Math.floor(T*G),t.height=Math.floor(F*G),this.setViewport(0,0,T,F)},this.getCurrentViewport=function(T){return T.copy(I)},this.getViewport=function(T){return T.copy(Te)},this.setViewport=function(T,F,G,W){T.isVector4?Te.set(T.x,T.y,T.z,T.w):Te.set(T,F,G,W),ye.viewport(I.copy(Te).multiplyScalar($).round())},this.getScissor=function(T){return T.copy(Be)},this.setScissor=function(T,F,G,W){T.isVector4?Be.set(T.x,T.y,T.z,T.w):Be.set(T,F,G,W),ye.scissor(z.copy(Be).multiplyScalar($).round())},this.getScissorTest=function(){return tt},this.setScissorTest=function(T){ye.setScissorTest(tt=T)},this.setOpaqueSort=function(T){he=T},this.setTransparentSort=function(T){_e=T},this.getClearColor=function(T){return T.copy(X.getClearColor())},this.setClearColor=function(){X.setClearColor(...arguments)},this.getClearAlpha=function(){return X.getClearAlpha()},this.setClearAlpha=function(){X.setClearAlpha(...arguments)},this.clear=function(T=!0,F=!0,G=!0){let W=0;if(T){let O=!1;if(A!==null){const re=A.texture.format;O=re===Mo||re===xo||re===vo}if(O){const re=A.texture.type,de=re===xn||re===li||re===vs||re===xs||re===mo||re===go,xe=X.getClearColor(),ve=X.getClearAlpha(),Le=xe.r,Ie=xe.g,Ae=xe.b;de?(g[0]=Le,g[1]=Ie,g[2]=Ae,g[3]=ve,N.clearBufferuiv(N.COLOR,0,g)):(_[0]=Le,_[1]=Ie,_[2]=Ae,_[3]=ve,N.clearBufferiv(N.COLOR,0,_))}else W|=N.COLOR_BUFFER_BIT}F&&(W|=N.DEPTH_BUFFER_BIT),G&&(W|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),N.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",pe,!1),t.removeEventListener("webglcontextrestored",se,!1),t.removeEventListener("webglcontextcreationerror",Q,!1),X.dispose(),H.dispose(),V.dispose(),we.dispose(),ft.dispose(),P.dispose(),j.dispose(),ce.dispose(),D.dispose(),E.dispose(),ie.dispose(),ie.removeEventListener("sessionstart",hi),ie.removeEventListener("sessionend",Rs),Vt.stop()};function pe(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),L=!0}function se(){console.log("THREE.WebGLRenderer: Context Restored."),L=!1;const T=Ve.autoReset,F=ne.enabled,G=ne.autoUpdate,W=ne.needsUpdate,O=ne.type;le(),Ve.autoReset=T,ne.enabled=F,ne.autoUpdate=G,ne.needsUpdate=W,ne.type=O}function Q(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function ge(T){const F=T.target;F.removeEventListener("dispose",ge),Ce(F)}function Ce(T){ot(T),we.remove(T)}function ot(T){const F=we.get(T).programs;F!==void 0&&(F.forEach(function(G){E.releaseProgram(G)}),T.isShaderMaterial&&E.releaseShaderCache(T))}this.renderBufferDirect=function(T,F,G,W,O,re){F===null&&(F=st);const de=O.isMesh&&O.matrixWorld.determinant()<0,xe=wu(T,F,G,W,O);ye.setMaterial(W,de);let ve=G.index,Le=1;if(W.wireframe===!0){if(ve=k.getWireframeAttribute(G),ve===void 0)return;Le=2}const Ie=G.drawRange,Ae=G.attributes.position;let Ge=Ie.start*Le,rt=(Ie.start+Ie.count)*Le;re!==null&&(Ge=Math.max(Ge,re.start*Le),rt=Math.min(rt,(re.start+re.count)*Le)),ve!==null?(Ge=Math.max(Ge,0),rt=Math.min(rt,ve.count)):Ae!=null&&(Ge=Math.max(Ge,0),rt=Math.min(rt,Ae.count));const _t=rt-Ge;if(_t<0||_t===1/0)return;ce.setup(O,W,xe,G,ve);let ht,ct=Se;if(ve!==null&&(ht=v.get(ve),ct=me,ct.setIndex(ht)),O.isMesh)W.wireframe===!0?(ye.setLineWidth(W.wireframeLinewidth*We()),ct.setMode(N.LINES)):ct.setMode(N.TRIANGLES);else if(O.isLine){let Re=W.linewidth;Re===void 0&&(Re=1),ye.setLineWidth(Re*We()),O.isLineSegments?ct.setMode(N.LINES):O.isLineLoop?ct.setMode(N.LINE_LOOP):ct.setMode(N.LINE_STRIP)}else O.isPoints?ct.setMode(N.POINTS):O.isSprite&&ct.setMode(N.TRIANGLES);if(O.isBatchedMesh)if(O._multiDrawInstances!==null)Ni("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ct.renderMultiDrawInstances(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount,O._multiDrawInstances);else if(Xe.get("WEBGL_multi_draw"))ct.renderMultiDraw(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount);else{const Re=O._multiDrawStarts,mt=O._multiDrawCounts,je=O._multiDrawCount,Gt=ve?v.get(ve).bytesPerElement:1,fi=we.get(W).currentProgram.getUniforms();for(let Wt=0;Wt<je;Wt++)fi.setValue(N,"_gl_DrawID",Wt),ct.render(Re[Wt]/Gt,mt[Wt])}else if(O.isInstancedMesh)ct.renderInstances(Ge,_t,O.count);else if(G.isInstancedBufferGeometry){const Re=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,mt=Math.min(G.instanceCount,Re);ct.renderInstances(Ge,_t,mt)}else ct.render(Ge,_t)};function Je(T,F,G){T.transparent===!0&&T.side===_n&&T.forceSinglePass===!1?(T.side=Ct,T.needsUpdate=!0,Ps(T,F,G),T.side=Nn,T.needsUpdate=!0,Ps(T,F,G),T.side=_n):Ps(T,F,G)}this.compile=function(T,F,G=null){G===null&&(G=T),p=V.get(G),p.init(F),b.push(p),G.traverseVisible(function(O){O.isLight&&O.layers.test(F.layers)&&(p.pushLight(O),O.castShadow&&p.pushShadow(O))}),T!==G&&T.traverseVisible(function(O){O.isLight&&O.layers.test(F.layers)&&(p.pushLight(O),O.castShadow&&p.pushShadow(O))}),p.setupLights();const W=new Set;return T.traverse(function(O){if(!(O.isMesh||O.isPoints||O.isLine||O.isSprite))return;const re=O.material;if(re)if(Array.isArray(re))for(let de=0;de<re.length;de++){const xe=re[de];Je(xe,G,O),W.add(xe)}else Je(re,G,O),W.add(re)}),p=b.pop(),W},this.compileAsync=function(T,F,G=null){const W=this.compile(T,F,G);return new Promise(O=>{function re(){if(W.forEach(function(de){we.get(de).currentProgram.isReady()&&W.delete(de)}),W.size===0){O(T);return}setTimeout(re,10)}Xe.get("KHR_parallel_shader_compile")!==null?re():setTimeout(re,10)})};let Ht=null;function tn(T){Ht&&Ht(T)}function hi(){Vt.stop()}function Rs(){Vt.start()}const Vt=new vu;Vt.setAnimationLoop(tn),typeof self<"u"&&Vt.setContext(self),this.setAnimationLoop=function(T){Ht=T,ie.setAnimationLoop(T),T===null?Vt.stop():Vt.start()},ie.addEventListener("sessionstart",hi),ie.addEventListener("sessionend",Rs),this.render=function(T,F){if(F!==void 0&&F.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(L===!0)return;if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),ie.enabled===!0&&ie.isPresenting===!0&&(ie.cameraAutoUpdate===!0&&ie.updateCamera(F),F=ie.getCamera()),T.isScene===!0&&T.onBeforeRender(M,T,F,A),p=V.get(T,b.length),p.init(F),b.push(p),be.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),q.setFromProjectionMatrix(be),Ee=this.localClippingEnabled,oe=ee.init(this.clippingPlanes,Ee),m=H.get(T,S.length),m.init(),S.push(m),ie.enabled===!0&&ie.isPresenting===!0){const re=M.xr.getDepthSensingMesh();re!==null&&di(re,F,-1/0,M.sortObjects)}di(T,F,0,M.sortObjects),m.finish(),M.sortObjects===!0&&m.sort(he,_e),ze=ie.enabled===!1||ie.isPresenting===!1||ie.hasDepthSensing()===!1,ze&&X.addToRenderList(m,T),this.info.render.frame++,oe===!0&&ee.beginShadows();const G=p.state.shadowsArray;ne.render(G,T,F),oe===!0&&ee.endShadows(),this.info.autoReset===!0&&this.info.reset();const W=m.opaque,O=m.transmissive;if(p.setupLights(),F.isArrayCamera){const re=F.cameras;if(O.length>0)for(let de=0,xe=re.length;de<xe;de++){const ve=re[de];Uo(W,O,T,ve)}ze&&X.render(T);for(let de=0,xe=re.length;de<xe;de++){const ve=re[de];Qi(m,T,ve,ve.viewport)}}else O.length>0&&Uo(W,O,T,F),ze&&X.render(T),Qi(m,T,F);A!==null&&w===0&&(Ne.updateMultisampleRenderTarget(A),Ne.updateRenderTargetMipmap(A)),T.isScene===!0&&T.onAfterRender(M,T,F),ce.resetDefaultState(),y=-1,x=null,b.pop(),b.length>0?(p=b[b.length-1],oe===!0&&ee.setGlobalState(M.clippingPlanes,p.state.camera)):p=null,S.pop(),S.length>0?m=S[S.length-1]:m=null};function di(T,F,G,W){if(T.visible===!1)return;if(T.layers.test(F.layers)){if(T.isGroup)G=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(F);else if(T.isLight)p.pushLight(T),T.castShadow&&p.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||q.intersectsSprite(T)){W&&Me.setFromMatrixPosition(T.matrixWorld).applyMatrix4(be);const de=j.update(T),xe=T.material;xe.visible&&m.push(T,de,xe,G,Me.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||q.intersectsObject(T))){const de=j.update(T),xe=T.material;if(W&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),Me.copy(T.boundingSphere.center)):(de.boundingSphere===null&&de.computeBoundingSphere(),Me.copy(de.boundingSphere.center)),Me.applyMatrix4(T.matrixWorld).applyMatrix4(be)),Array.isArray(xe)){const ve=de.groups;for(let Le=0,Ie=ve.length;Le<Ie;Le++){const Ae=ve[Le],Ge=xe[Ae.materialIndex];Ge&&Ge.visible&&m.push(T,de,Ge,G,Me.z,Ae)}}else xe.visible&&m.push(T,de,xe,G,Me.z,null)}}const re=T.children;for(let de=0,xe=re.length;de<xe;de++)di(re[de],F,G,W)}function Qi(T,F,G,W){const O=T.opaque,re=T.transmissive,de=T.transparent;p.setupLightsView(G),oe===!0&&ee.setGlobalState(M.clippingPlanes,G),W&&ye.viewport(I.copy(W)),O.length>0&&Cs(O,F,G),re.length>0&&Cs(re,F,G),de.length>0&&Cs(de,F,G),ye.buffers.depth.setTest(!0),ye.buffers.depth.setMask(!0),ye.buffers.color.setMask(!0),ye.setPolygonOffset(!1)}function Uo(T,F,G,W){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[W.id]===void 0&&(p.state.transmissionRenderTarget[W.id]=new ui(1,1,{generateMipmaps:!0,type:Xe.has("EXT_color_buffer_half_float")||Xe.has("EXT_color_buffer_float")?ws:xn,minFilter:Pn,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:qe.workingColorSpace}));const re=p.state.transmissionRenderTarget[W.id],de=W.viewport||I;re.setSize(de.z*M.transmissionResolutionScale,de.w*M.transmissionResolutionScale);const xe=M.getRenderTarget(),ve=M.getActiveCubeFace(),Le=M.getActiveMipmapLevel();M.setRenderTarget(re),M.getClearColor(Y),Z=M.getClearAlpha(),Z<1&&M.setClearColor(16777215,.5),M.clear(),ze&&X.render(G);const Ie=M.toneMapping;M.toneMapping=Xn;const Ae=W.viewport;if(W.viewport!==void 0&&(W.viewport=void 0),p.setupLightsView(W),oe===!0&&ee.setGlobalState(M.clippingPlanes,W),Cs(T,G,W),Ne.updateMultisampleRenderTarget(re),Ne.updateRenderTargetMipmap(re),Xe.has("WEBGL_multisampled_render_to_texture")===!1){let Ge=!1;for(let rt=0,_t=F.length;rt<_t;rt++){const ht=F[rt],ct=ht.object,Re=ht.geometry,mt=ht.material,je=ht.group;if(mt.side===_n&&ct.layers.test(W.layers)){const Gt=mt.side;mt.side=Ct,mt.needsUpdate=!0,Fo(ct,G,W,Re,mt,je),mt.side=Gt,mt.needsUpdate=!0,Ge=!0}}Ge===!0&&(Ne.updateMultisampleRenderTarget(re),Ne.updateRenderTargetMipmap(re))}M.setRenderTarget(xe,ve,Le),M.setClearColor(Y,Z),Ae!==void 0&&(W.viewport=Ae),M.toneMapping=Ie}function Cs(T,F,G){const W=F.isScene===!0?F.overrideMaterial:null;for(let O=0,re=T.length;O<re;O++){const de=T[O],xe=de.object,ve=de.geometry,Le=de.group;let Ie=de.material;Ie.allowOverride===!0&&W!==null&&(Ie=W),xe.layers.test(G.layers)&&Fo(xe,F,G,ve,Ie,Le)}}function Fo(T,F,G,W,O,re){T.onBeforeRender(M,F,G,W,O,re),T.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),O.onBeforeRender(M,F,G,W,T,re),O.transparent===!0&&O.side===_n&&O.forceSinglePass===!1?(O.side=Ct,O.needsUpdate=!0,M.renderBufferDirect(G,F,W,O,T,re),O.side=Nn,O.needsUpdate=!0,M.renderBufferDirect(G,F,W,O,T,re),O.side=_n):M.renderBufferDirect(G,F,W,O,T,re),T.onAfterRender(M,F,G,W,O,re)}function Ps(T,F,G){F.isScene!==!0&&(F=st);const W=we.get(T),O=p.state.lights,re=p.state.shadowsArray,de=O.state.version,xe=E.getParameters(T,O.state,re,F,G),ve=E.getProgramCacheKey(xe);let Le=W.programs;W.environment=T.isMeshStandardMaterial?F.environment:null,W.fog=F.fog,W.envMap=(T.isMeshStandardMaterial?P:ft).get(T.envMap||W.environment),W.envMapRotation=W.environment!==null&&T.envMap===null?F.environmentRotation:T.envMapRotation,Le===void 0&&(T.addEventListener("dispose",ge),Le=new Map,W.programs=Le);let Ie=Le.get(ve);if(Ie!==void 0){if(W.currentProgram===Ie&&W.lightsStateVersion===de)return Bo(T,xe),Ie}else xe.uniforms=E.getUniforms(T),T.onBeforeCompile(xe,M),Ie=E.acquireProgram(xe,ve),Le.set(ve,Ie),W.uniforms=xe.uniforms;const Ae=W.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Ae.clippingPlanes=ee.uniform),Bo(T,xe),W.needsLights=Ru(T),W.lightsStateVersion=de,W.needsLights&&(Ae.ambientLightColor.value=O.state.ambient,Ae.lightProbe.value=O.state.probe,Ae.directionalLights.value=O.state.directional,Ae.directionalLightShadows.value=O.state.directionalShadow,Ae.spotLights.value=O.state.spot,Ae.spotLightShadows.value=O.state.spotShadow,Ae.rectAreaLights.value=O.state.rectArea,Ae.ltc_1.value=O.state.rectAreaLTC1,Ae.ltc_2.value=O.state.rectAreaLTC2,Ae.pointLights.value=O.state.point,Ae.pointLightShadows.value=O.state.pointShadow,Ae.hemisphereLights.value=O.state.hemi,Ae.directionalShadowMap.value=O.state.directionalShadowMap,Ae.directionalShadowMatrix.value=O.state.directionalShadowMatrix,Ae.spotShadowMap.value=O.state.spotShadowMap,Ae.spotLightMatrix.value=O.state.spotLightMatrix,Ae.spotLightMap.value=O.state.spotLightMap,Ae.pointShadowMap.value=O.state.pointShadowMap,Ae.pointShadowMatrix.value=O.state.pointShadowMatrix),W.currentProgram=Ie,W.uniformsList=null,Ie}function Oo(T){if(T.uniformsList===null){const F=T.currentProgram.getUniforms();T.uniformsList=gr.seqWithValue(F.seq,T.uniforms)}return T.uniformsList}function Bo(T,F){const G=we.get(T);G.outputColorSpace=F.outputColorSpace,G.batching=F.batching,G.batchingColor=F.batchingColor,G.instancing=F.instancing,G.instancingColor=F.instancingColor,G.instancingMorph=F.instancingMorph,G.skinning=F.skinning,G.morphTargets=F.morphTargets,G.morphNormals=F.morphNormals,G.morphColors=F.morphColors,G.morphTargetsCount=F.morphTargetsCount,G.numClippingPlanes=F.numClippingPlanes,G.numIntersection=F.numClipIntersection,G.vertexAlphas=F.vertexAlphas,G.vertexTangents=F.vertexTangents,G.toneMapping=F.toneMapping}function wu(T,F,G,W,O){F.isScene!==!0&&(F=st),Ne.resetTextureUnits();const re=F.fog,de=W.isMeshStandardMaterial?F.environment:null,xe=A===null?M.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:Bt,ve=(W.isMeshStandardMaterial?P:ft).get(W.envMap||de),Le=W.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,Ie=!!G.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),Ae=!!G.morphAttributes.position,Ge=!!G.morphAttributes.normal,rt=!!G.morphAttributes.color;let _t=Xn;W.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(_t=M.toneMapping);const ht=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,ct=ht!==void 0?ht.length:0,Re=we.get(W),mt=p.state.lights;if(oe===!0&&(Ee===!0||T!==x)){const Lt=T===x&&W.id===y;ee.setState(W,T,Lt)}let je=!1;W.version===Re.__version?(Re.needsLights&&Re.lightsStateVersion!==mt.state.version||Re.outputColorSpace!==xe||O.isBatchedMesh&&Re.batching===!1||!O.isBatchedMesh&&Re.batching===!0||O.isBatchedMesh&&Re.batchingColor===!0&&O.colorTexture===null||O.isBatchedMesh&&Re.batchingColor===!1&&O.colorTexture!==null||O.isInstancedMesh&&Re.instancing===!1||!O.isInstancedMesh&&Re.instancing===!0||O.isSkinnedMesh&&Re.skinning===!1||!O.isSkinnedMesh&&Re.skinning===!0||O.isInstancedMesh&&Re.instancingColor===!0&&O.instanceColor===null||O.isInstancedMesh&&Re.instancingColor===!1&&O.instanceColor!==null||O.isInstancedMesh&&Re.instancingMorph===!0&&O.morphTexture===null||O.isInstancedMesh&&Re.instancingMorph===!1&&O.morphTexture!==null||Re.envMap!==ve||W.fog===!0&&Re.fog!==re||Re.numClippingPlanes!==void 0&&(Re.numClippingPlanes!==ee.numPlanes||Re.numIntersection!==ee.numIntersection)||Re.vertexAlphas!==Le||Re.vertexTangents!==Ie||Re.morphTargets!==Ae||Re.morphNormals!==Ge||Re.morphColors!==rt||Re.toneMapping!==_t||Re.morphTargetsCount!==ct)&&(je=!0):(je=!0,Re.__version=W.version);let Gt=Re.currentProgram;je===!0&&(Gt=Ps(W,F,O));let fi=!1,Wt=!1,es=!1;const pt=Gt.getUniforms(),Kt=Re.uniforms;if(ye.useProgram(Gt.program)&&(fi=!0,Wt=!0,es=!0),W.id!==y&&(y=W.id,Wt=!0),fi||x!==T){ye.buffers.depth.getReversed()?(fe.copy(T.projectionMatrix),Id(fe),Dd(fe),pt.setValue(N,"projectionMatrix",fe)):pt.setValue(N,"projectionMatrix",T.projectionMatrix),pt.setValue(N,"viewMatrix",T.matrixWorldInverse);const kt=pt.map.cameraPosition;kt!==void 0&&kt.setValue(N,Ye.setFromMatrixPosition(T.matrixWorld)),et.logarithmicDepthBuffer&&pt.setValue(N,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&pt.setValue(N,"isOrthographic",T.isOrthographicCamera===!0),x!==T&&(x=T,Wt=!0,es=!0)}if(O.isSkinnedMesh){pt.setOptional(N,O,"bindMatrix"),pt.setOptional(N,O,"bindMatrixInverse");const Lt=O.skeleton;Lt&&(Lt.boneTexture===null&&Lt.computeBoneTexture(),pt.setValue(N,"boneTexture",Lt.boneTexture,Ne))}O.isBatchedMesh&&(pt.setOptional(N,O,"batchingTexture"),pt.setValue(N,"batchingTexture",O._matricesTexture,Ne),pt.setOptional(N,O,"batchingIdTexture"),pt.setValue(N,"batchingIdTexture",O._indirectTexture,Ne),pt.setOptional(N,O,"batchingColorTexture"),O._colorsTexture!==null&&pt.setValue(N,"batchingColorTexture",O._colorsTexture,Ne));const jt=G.morphAttributes;if((jt.position!==void 0||jt.normal!==void 0||jt.color!==void 0)&&J.update(O,G,Gt),(Wt||Re.receiveShadow!==O.receiveShadow)&&(Re.receiveShadow=O.receiveShadow,pt.setValue(N,"receiveShadow",O.receiveShadow)),W.isMeshGouraudMaterial&&W.envMap!==null&&(Kt.envMap.value=ve,Kt.flipEnvMap.value=ve.isCubeTexture&&ve.isRenderTargetTexture===!1?-1:1),W.isMeshStandardMaterial&&W.envMap===null&&F.environment!==null&&(Kt.envMapIntensity.value=F.environmentIntensity),Wt&&(pt.setValue(N,"toneMappingExposure",M.toneMappingExposure),Re.needsLights&&Au(Kt,es),re&&W.fog===!0&&C.refreshFogUniforms(Kt,re),C.refreshMaterialUniforms(Kt,W,$,te,p.state.transmissionRenderTarget[T.id]),gr.upload(N,Oo(Re),Kt,Ne)),W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(gr.upload(N,Oo(Re),Kt,Ne),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&pt.setValue(N,"center",O.center),pt.setValue(N,"modelViewMatrix",O.modelViewMatrix),pt.setValue(N,"normalMatrix",O.normalMatrix),pt.setValue(N,"modelMatrix",O.matrixWorld),W.isShaderMaterial||W.isRawShaderMaterial){const Lt=W.uniformsGroups;for(let kt=0,Cr=Lt.length;kt<Cr;kt++){const Yn=Lt[kt];D.update(Yn,Gt),D.bind(Yn,Gt)}}return Gt}function Au(T,F){T.ambientLightColor.needsUpdate=F,T.lightProbe.needsUpdate=F,T.directionalLights.needsUpdate=F,T.directionalLightShadows.needsUpdate=F,T.pointLights.needsUpdate=F,T.pointLightShadows.needsUpdate=F,T.spotLights.needsUpdate=F,T.spotLightShadows.needsUpdate=F,T.rectAreaLights.needsUpdate=F,T.hemisphereLights.needsUpdate=F}function Ru(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(T,F,G){const W=we.get(T);W.__autoAllocateDepthBuffer=T.resolveDepthBuffer===!1,W.__autoAllocateDepthBuffer===!1&&(W.__useRenderToTexture=!1),we.get(T.texture).__webglTexture=F,we.get(T.depthTexture).__webglTexture=W.__autoAllocateDepthBuffer?void 0:G,W.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(T,F){const G=we.get(T);G.__webglFramebuffer=F,G.__useDefaultFramebuffer=F===void 0};const Cu=N.createFramebuffer();this.setRenderTarget=function(T,F=0,G=0){A=T,R=F,w=G;let W=!0,O=null,re=!1,de=!1;if(T){const ve=we.get(T);if(ve.__useDefaultFramebuffer!==void 0)ye.bindFramebuffer(N.FRAMEBUFFER,null),W=!1;else if(ve.__webglFramebuffer===void 0)Ne.setupRenderTarget(T);else if(ve.__hasExternalTextures)Ne.rebindTextures(T,we.get(T.texture).__webglTexture,we.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const Ae=T.depthTexture;if(ve.__boundDepthTexture!==Ae){if(Ae!==null&&we.has(Ae)&&(T.width!==Ae.image.width||T.height!==Ae.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Ne.setupDepthRenderbuffer(T)}}const Le=T.texture;(Le.isData3DTexture||Le.isDataArrayTexture||Le.isCompressedArrayTexture)&&(de=!0);const Ie=we.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(Ie[F])?O=Ie[F][G]:O=Ie[F],re=!0):T.samples>0&&Ne.useMultisampledRTT(T)===!1?O=we.get(T).__webglMultisampledFramebuffer:Array.isArray(Ie)?O=Ie[G]:O=Ie,I.copy(T.viewport),z.copy(T.scissor),B=T.scissorTest}else I.copy(Te).multiplyScalar($).floor(),z.copy(Be).multiplyScalar($).floor(),B=tt;if(G!==0&&(O=Cu),ye.bindFramebuffer(N.FRAMEBUFFER,O)&&W&&ye.drawBuffers(T,O),ye.viewport(I),ye.scissor(z),ye.setScissorTest(B),re){const ve=we.get(T.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+F,ve.__webglTexture,G)}else if(de){const ve=we.get(T.texture),Le=F;N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,ve.__webglTexture,G,Le)}else if(T!==null&&G!==0){const ve=we.get(T.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,ve.__webglTexture,G)}y=-1},this.readRenderTargetPixels=function(T,F,G,W,O,re,de,xe=0){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ve=we.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&de!==void 0&&(ve=ve[de]),ve){ye.bindFramebuffer(N.FRAMEBUFFER,ve);try{const Le=T.textures[xe],Ie=Le.format,Ae=Le.type;if(!et.textureFormatReadable(Ie)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!et.textureTypeReadable(Ae)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=T.width-W&&G>=0&&G<=T.height-O&&(T.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+xe),N.readPixels(F,G,W,O,ae.convert(Ie),ae.convert(Ae),re))}finally{const Le=A!==null?we.get(A).__webglFramebuffer:null;ye.bindFramebuffer(N.FRAMEBUFFER,Le)}}},this.readRenderTargetPixelsAsync=async function(T,F,G,W,O,re,de,xe=0){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ve=we.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&de!==void 0&&(ve=ve[de]),ve)if(F>=0&&F<=T.width-W&&G>=0&&G<=T.height-O){ye.bindFramebuffer(N.FRAMEBUFFER,ve);const Le=T.textures[xe],Ie=Le.format,Ae=Le.type;if(!et.textureFormatReadable(Ie))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!et.textureTypeReadable(Ae))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ge=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,Ge),N.bufferData(N.PIXEL_PACK_BUFFER,re.byteLength,N.STREAM_READ),T.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+xe),N.readPixels(F,G,W,O,ae.convert(Ie),ae.convert(Ae),0);const rt=A!==null?we.get(A).__webglFramebuffer:null;ye.bindFramebuffer(N.FRAMEBUFFER,rt);const _t=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await Ld(N,_t,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,Ge),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,re),N.deleteBuffer(Ge),N.deleteSync(_t),re}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(T,F=null,G=0){const W=Math.pow(2,-G),O=Math.floor(T.image.width*W),re=Math.floor(T.image.height*W),de=F!==null?F.x:0,xe=F!==null?F.y:0;Ne.setTexture2D(T,0),N.copyTexSubImage2D(N.TEXTURE_2D,G,0,0,de,xe,O,re),ye.unbindTexture()};const Pu=N.createFramebuffer(),Lu=N.createFramebuffer();this.copyTextureToTexture=function(T,F,G=null,W=null,O=0,re=null){re===null&&(O!==0?(Ni("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),re=O,O=0):re=0);let de,xe,ve,Le,Ie,Ae,Ge,rt,_t;const ht=T.isCompressedTexture?T.mipmaps[re]:T.image;if(G!==null)de=G.max.x-G.min.x,xe=G.max.y-G.min.y,ve=G.isBox3?G.max.z-G.min.z:1,Le=G.min.x,Ie=G.min.y,Ae=G.isBox3?G.min.z:0;else{const jt=Math.pow(2,-O);de=Math.floor(ht.width*jt),xe=Math.floor(ht.height*jt),T.isDataArrayTexture?ve=ht.depth:T.isData3DTexture?ve=Math.floor(ht.depth*jt):ve=1,Le=0,Ie=0,Ae=0}W!==null?(Ge=W.x,rt=W.y,_t=W.z):(Ge=0,rt=0,_t=0);const ct=ae.convert(F.format),Re=ae.convert(F.type);let mt;F.isData3DTexture?(Ne.setTexture3D(F,0),mt=N.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?(Ne.setTexture2DArray(F,0),mt=N.TEXTURE_2D_ARRAY):(Ne.setTexture2D(F,0),mt=N.TEXTURE_2D),N.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,F.flipY),N.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),N.pixelStorei(N.UNPACK_ALIGNMENT,F.unpackAlignment);const je=N.getParameter(N.UNPACK_ROW_LENGTH),Gt=N.getParameter(N.UNPACK_IMAGE_HEIGHT),fi=N.getParameter(N.UNPACK_SKIP_PIXELS),Wt=N.getParameter(N.UNPACK_SKIP_ROWS),es=N.getParameter(N.UNPACK_SKIP_IMAGES);N.pixelStorei(N.UNPACK_ROW_LENGTH,ht.width),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,ht.height),N.pixelStorei(N.UNPACK_SKIP_PIXELS,Le),N.pixelStorei(N.UNPACK_SKIP_ROWS,Ie),N.pixelStorei(N.UNPACK_SKIP_IMAGES,Ae);const pt=T.isDataArrayTexture||T.isData3DTexture,Kt=F.isDataArrayTexture||F.isData3DTexture;if(T.isDepthTexture){const jt=we.get(T),Lt=we.get(F),kt=we.get(jt.__renderTarget),Cr=we.get(Lt.__renderTarget);ye.bindFramebuffer(N.READ_FRAMEBUFFER,kt.__webglFramebuffer),ye.bindFramebuffer(N.DRAW_FRAMEBUFFER,Cr.__webglFramebuffer);for(let Yn=0;Yn<ve;Yn++)pt&&(N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,we.get(T).__webglTexture,O,Ae+Yn),N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,we.get(F).__webglTexture,re,_t+Yn)),N.blitFramebuffer(Le,Ie,de,xe,Ge,rt,de,xe,N.DEPTH_BUFFER_BIT,N.NEAREST);ye.bindFramebuffer(N.READ_FRAMEBUFFER,null),ye.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else if(O!==0||T.isRenderTargetTexture||we.has(T)){const jt=we.get(T),Lt=we.get(F);ye.bindFramebuffer(N.READ_FRAMEBUFFER,Pu),ye.bindFramebuffer(N.DRAW_FRAMEBUFFER,Lu);for(let kt=0;kt<ve;kt++)pt?N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,jt.__webglTexture,O,Ae+kt):N.framebufferTexture2D(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,jt.__webglTexture,O),Kt?N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Lt.__webglTexture,re,_t+kt):N.framebufferTexture2D(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Lt.__webglTexture,re),O!==0?N.blitFramebuffer(Le,Ie,de,xe,Ge,rt,de,xe,N.COLOR_BUFFER_BIT,N.NEAREST):Kt?N.copyTexSubImage3D(mt,re,Ge,rt,_t+kt,Le,Ie,de,xe):N.copyTexSubImage2D(mt,re,Ge,rt,Le,Ie,de,xe);ye.bindFramebuffer(N.READ_FRAMEBUFFER,null),ye.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else Kt?T.isDataTexture||T.isData3DTexture?N.texSubImage3D(mt,re,Ge,rt,_t,de,xe,ve,ct,Re,ht.data):F.isCompressedArrayTexture?N.compressedTexSubImage3D(mt,re,Ge,rt,_t,de,xe,ve,ct,ht.data):N.texSubImage3D(mt,re,Ge,rt,_t,de,xe,ve,ct,Re,ht):T.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,re,Ge,rt,de,xe,ct,Re,ht.data):T.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,re,Ge,rt,ht.width,ht.height,ct,ht.data):N.texSubImage2D(N.TEXTURE_2D,re,Ge,rt,de,xe,ct,Re,ht);N.pixelStorei(N.UNPACK_ROW_LENGTH,je),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,Gt),N.pixelStorei(N.UNPACK_SKIP_PIXELS,fi),N.pixelStorei(N.UNPACK_SKIP_ROWS,Wt),N.pixelStorei(N.UNPACK_SKIP_IMAGES,es),re===0&&F.generateMipmaps&&N.generateMipmap(mt),ye.unbindTexture()},this.copyTextureToTexture3D=function(T,F,G=null,W=null,O=0){return Ni('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(T,F,G,W,O)},this.initRenderTarget=function(T){we.get(T).__webglFramebuffer===void 0&&Ne.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?Ne.setTextureCube(T,0):T.isData3DTexture?Ne.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?Ne.setTexture2DArray(T,0):Ne.setTexture2D(T,0),ye.unbindTexture()},this.resetState=function(){R=0,w=0,A=null,ye.reset(),ce.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ln}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=qe._getDrawingBufferColorSpace(e),t.unpackColorSpace=qe._getUnpackColorSpace()}}function fl(i,e){if(e===nd)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(e===io||e===jl){let t=i.getIndex();if(t===null){const a=[],o=i.getAttribute("position");if(o!==void 0){for(let l=0;l<o.count;l++)a.push(l);i.setIndex(a),t=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}const n=t.count-2,s=[];if(e===io)for(let a=1;a<=n;a++)s.push(t.getX(0)),s.push(t.getX(a)),s.push(t.getX(a+1));else for(let a=0;a<n;a++)a%2===0?(s.push(t.getX(a)),s.push(t.getX(a+1)),s.push(t.getX(a+2))):(s.push(t.getX(a+2)),s.push(t.getX(a+1)),s.push(t.getX(a)));s.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const r=i.clone();return r.setIndex(s),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),i}class C0 extends Zi{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new N0(t)}),this.register(function(t){return new U0(t)}),this.register(function(t){return new W0(t)}),this.register(function(t){return new X0(t)}),this.register(function(t){return new $0(t)}),this.register(function(t){return new O0(t)}),this.register(function(t){return new B0(t)}),this.register(function(t){return new k0(t)}),this.register(function(t){return new z0(t)}),this.register(function(t){return new D0(t)}),this.register(function(t){return new H0(t)}),this.register(function(t){return new F0(t)}),this.register(function(t){return new G0(t)}),this.register(function(t){return new V0(t)}),this.register(function(t){return new L0(t)}),this.register(function(t){return new q0(t)}),this.register(function(t){return new Y0(t)})}load(e,t,n,s){const r=this;let a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){const u=_s.extractUrlBase(e);a=_s.resolveURL(u,this.path)}else a=_s.extractUrlBase(e);this.manager.itemStart(e);const o=function(u){s?s(u):console.error(u),r.manager.itemError(e),r.manager.itemEnd(e)},l=new gu(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(u){try{r.parse(u,a,function(c){t(c),r.manager.itemEnd(e)},o)}catch(c){o(c)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,s){let r;const a={},o={},l=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===Eu){try{a[He.KHR_BINARY_GLTF]=new K0(e)}catch(h){s&&s(h);return}r=JSON.parse(a[He.KHR_BINARY_GLTF].content)}else r=JSON.parse(l.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const u=new cv(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});u.fileLoader.setRequestHeader(this.requestHeader);for(let c=0;c<this.pluginCallbacks.length;c++){const h=this.pluginCallbacks[c](u);h.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[h.name]=h,a[h.name]=!0}if(r.extensionsUsed)for(let c=0;c<r.extensionsUsed.length;++c){const h=r.extensionsUsed[c],d=r.extensionsRequired||[];switch(h){case He.KHR_MATERIALS_UNLIT:a[h]=new I0;break;case He.KHR_DRACO_MESH_COMPRESSION:a[h]=new j0(r,this.dracoLoader);break;case He.KHR_TEXTURE_TRANSFORM:a[h]=new Z0;break;case He.KHR_MESH_QUANTIZATION:a[h]=new J0;break;default:d.indexOf(h)>=0&&o[h]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+h+'".')}}u.setExtensions(a),u.setPlugins(o),u.parse(n,s)}parseAsync(e,t){const n=this;return new Promise(function(s,r){n.parse(e,t,s,r)})}}function P0(){let i={};return{get:function(e){return i[e]},add:function(e,t){i[e]=t},remove:function(e){delete i[e]},removeAll:function(){i={}}}}const He={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class L0{constructor(e){this.parser=e,this.name=He.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,s=t.length;n<s;n++){const r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let s=t.cache.get(n);if(s)return s;const r=t.json,l=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e];let u;const c=new Pe(16777215);l.color!==void 0&&c.setRGB(l.color[0],l.color[1],l.color[2],Bt);const h=l.range!==void 0?l.range:0;switch(l.type){case"directional":u=new mr(c),u.target.position.set(0,0,-1),u.add(u.target);break;case"point":u=new _u(c),u.distance=h;break;case"spot":u=new Df(c),u.distance=h,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,u.angle=l.spot.outerConeAngle,u.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,u.target.position.set(0,0,-1),u.add(u.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return u.position.set(0,0,0),Cn(u,l),l.intensity!==void 0&&(u.intensity=l.intensity),u.name=t.createUniqueName(l.name||"light_"+e),s=Promise.resolve(u),t.cache.add(n,s),s}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,r=n.json.nodes[e],o=(r.extensions&&r.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(l){return n._getNodeRef(t.cache,o,l)})}}class I0{constructor(){this.name=He.KHR_MATERIALS_UNLIT}getMaterialType(){return Ut}extendParams(e,t,n){const s=[];e.color=new Pe(1,1,1),e.opacity=1;const r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){const a=r.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],Bt),e.opacity=a[3]}r.baseColorTexture!==void 0&&s.push(n.assignTexture(e,"map",r.baseColorTexture,yt))}return Promise.all(s)}}class D0{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}}class N0{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:fn}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];if(a.clearcoatFactor!==void 0&&(t.clearcoat=a.clearcoatFactor),a.clearcoatTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatMap",a.clearcoatTexture)),a.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=a.clearcoatRoughnessFactor),a.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatRoughnessMap",a.clearcoatRoughnessTexture)),a.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(t,"clearcoatNormalMap",a.clearcoatNormalTexture)),a.clearcoatNormalTexture.scale!==void 0)){const o=a.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new De(o,o)}return Promise.all(r)}}class U0{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_DISPERSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:fn}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name];return t.dispersion=r.dispersion!==void 0?r.dispersion:0,Promise.resolve()}}class F0{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:fn}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];return a.iridescenceFactor!==void 0&&(t.iridescence=a.iridescenceFactor),a.iridescenceTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceMap",a.iridescenceTexture)),a.iridescenceIor!==void 0&&(t.iridescenceIOR=a.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),a.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=a.iridescenceThicknessMinimum),a.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=a.iridescenceThicknessMaximum),a.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceThicknessMap",a.iridescenceThicknessTexture)),Promise.all(r)}}class O0{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:fn}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[];t.sheenColor=new Pe(0,0,0),t.sheenRoughness=0,t.sheen=1;const a=s.extensions[this.name];if(a.sheenColorFactor!==void 0){const o=a.sheenColorFactor;t.sheenColor.setRGB(o[0],o[1],o[2],Bt)}return a.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=a.sheenRoughnessFactor),a.sheenColorTexture!==void 0&&r.push(n.assignTexture(t,"sheenColorMap",a.sheenColorTexture,yt)),a.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"sheenRoughnessMap",a.sheenRoughnessTexture)),Promise.all(r)}}class B0{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:fn}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];return a.transmissionFactor!==void 0&&(t.transmission=a.transmissionFactor),a.transmissionTexture!==void 0&&r.push(n.assignTexture(t,"transmissionMap",a.transmissionTexture)),Promise.all(r)}}class k0{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:fn}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];t.thickness=a.thicknessFactor!==void 0?a.thicknessFactor:0,a.thicknessTexture!==void 0&&r.push(n.assignTexture(t,"thicknessMap",a.thicknessTexture)),t.attenuationDistance=a.attenuationDistance||1/0;const o=a.attenuationColor||[1,1,1];return t.attenuationColor=new Pe().setRGB(o[0],o[1],o[2],Bt),Promise.all(r)}}class z0{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:fn}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}}class H0{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:fn}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];t.specularIntensity=a.specularFactor!==void 0?a.specularFactor:1,a.specularTexture!==void 0&&r.push(n.assignTexture(t,"specularIntensityMap",a.specularTexture));const o=a.specularColorFactor||[1,1,1];return t.specularColor=new Pe().setRGB(o[0],o[1],o[2],Bt),a.specularColorTexture!==void 0&&r.push(n.assignTexture(t,"specularColorMap",a.specularColorTexture,yt)),Promise.all(r)}}class V0{constructor(e){this.parser=e,this.name=He.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:fn}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];return t.bumpScale=a.bumpFactor!==void 0?a.bumpFactor:1,a.bumpTexture!==void 0&&r.push(n.assignTexture(t,"bumpMap",a.bumpTexture)),Promise.all(r)}}class G0{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:fn}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];return a.anisotropyStrength!==void 0&&(t.anisotropy=a.anisotropyStrength),a.anisotropyRotation!==void 0&&(t.anisotropyRotation=a.anisotropyRotation),a.anisotropyTexture!==void 0&&r.push(n.assignTexture(t,"anisotropyMap",a.anisotropyTexture)),Promise.all(r)}}class W0{constructor(e){this.parser=e,this.name=He.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,s=n.textures[e];if(!s.extensions||!s.extensions[this.name])return null;const r=s.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,a)}}class X0{constructor(e){this.parser=e,this.name=He.EXT_TEXTURE_WEBP}loadTexture(e){const t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;const a=r.extensions[t],o=s.images[a.source];let l=n.textureLoader;if(o.uri){const u=n.options.manager.getHandler(o.uri);u!==null&&(l=u)}return n.loadTextureImage(e,a.source,l)}}class $0{constructor(e){this.parser=e,this.name=He.EXT_TEXTURE_AVIF}loadTexture(e){const t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;const a=r.extensions[t],o=s.images[a.source];let l=n.textureLoader;if(o.uri){const u=n.options.manager.getHandler(o.uri);u!==null&&(l=u)}return n.loadTextureImage(e,a.source,l)}}class q0{constructor(e){this.name=He.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const s=n.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(o){const l=s.byteOffset||0,u=s.byteLength||0,c=s.count,h=s.byteStride,d=new Uint8Array(o,l,u);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(c,h,d,s.mode,s.filter).then(function(f){return f.buffer}):a.ready.then(function(){const f=new ArrayBuffer(c*h);return a.decodeGltfBuffer(new Uint8Array(f),c,h,d,s.mode,s.filter),f})})}else return null}}class Y0{constructor(e){this.name=He.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const s=t.meshes[n.mesh];for(const u of s.primitives)if(u.mode!==Jt.TRIANGLES&&u.mode!==Jt.TRIANGLE_STRIP&&u.mode!==Jt.TRIANGLE_FAN&&u.mode!==void 0)return null;const a=n.extensions[this.name].attributes,o=[],l={};for(const u in a)o.push(this.parser.getDependency("accessor",a[u]).then(c=>(l[u]=c,l[u])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(u=>{const c=u.pop(),h=c.isGroup?c.children:[c],d=u[0].count,f=[];for(const g of h){const _=new Fe,m=new U,p=new qn,S=new U(1,1,1),b=new uu(g.geometry,g.material,d);for(let M=0;M<d;M++)l.TRANSLATION&&m.fromBufferAttribute(l.TRANSLATION,M),l.ROTATION&&p.fromBufferAttribute(l.ROTATION,M),l.SCALE&&S.fromBufferAttribute(l.SCALE,M),b.setMatrixAt(M,_.compose(m,p,S));for(const M in l)if(M==="_COLOR_0"){const L=l[M];b.instanceColor=new ao(L.array,L.itemSize,L.normalized)}else M!=="TRANSLATION"&&M!=="ROTATION"&&M!=="SCALE"&&g.geometry.setAttribute(M,l[M]);dt.prototype.copy.call(b,g),this.parser.assignFinalMaterial(b),f.push(b)}return c.isGroup?(c.clear(),c.add(...f),c):f[0]}))}}const Eu="glTF",hs=12,pl={JSON:1313821514,BIN:5130562};class K0{constructor(e){this.name=He.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,hs),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Eu)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const s=this.header.length-hs,r=new DataView(e,hs);let a=0;for(;a<s;){const o=r.getUint32(a,!0);a+=4;const l=r.getUint32(a,!0);if(a+=4,l===pl.JSON){const u=new Uint8Array(e,hs+a,o);this.content=n.decode(u)}else if(l===pl.BIN){const u=hs+a;this.body=e.slice(u,u+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class j0{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=He.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,s=this.dracoLoader,r=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},l={},u={};for(const c in a){const h=uo[c]||c.toLowerCase();o[h]=a[c]}for(const c in e.attributes){const h=uo[c]||c.toLowerCase();if(a[c]!==void 0){const d=n.accessors[e.attributes[c]],f=Fi[d.componentType];u[h]=f.name,l[h]=d.normalized===!0}}return t.getDependency("bufferView",r).then(function(c){return new Promise(function(h,d){s.decodeDracoFile(c,function(f){for(const g in f.attributes){const _=f.attributes[g],m=l[g];m!==void 0&&(_.normalized=m)}h(f)},o,u,Bt,d)})})}}class Z0{constructor(){this.name=He.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class J0{constructor(){this.name=He.KHR_MESH_QUANTIZATION}}class Tu extends As{constructor(e,t,n,s){super(e,t,n,s)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s*3+s;for(let a=0;a!==s;a++)t[a]=n[r+a];return t}interpolate_(e,t,n,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=o*2,u=o*3,c=s-t,h=(n-t)/c,d=h*h,f=d*h,g=e*u,_=g-u,m=-2*f+3*d,p=f-d,S=1-m,b=p-d+h;for(let M=0;M!==o;M++){const L=a[_+M+o],R=a[_+M+l]*c,w=a[g+M+o],A=a[g+M]*c;r[M]=S*L+b*R+m*w+p*A}return r}}const Q0=new qn;class ev extends Tu{interpolate_(e,t,n,s){const r=super.interpolate_(e,t,n,s);return Q0.fromArray(r).normalize().toArray(r),r}}const Jt={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},Fi={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},ml={9728:Ft,9729:Yt,9984:Vl,9985:lr,9986:fs,9987:Pn},gl={33071:Gn,33648:vr,10497:zi},pa={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},uo={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Hn={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},tv={CUBICSPLINE:void 0,LINEAR:Es,STEP:Ss},ma={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function nv(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new Wi({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Nn})),i.DefaultMaterial}function ti(i,e,t){for(const n in t.extensions)i[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Cn(i,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(i.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function iv(i,e,t){let n=!1,s=!1,r=!1;for(let u=0,c=e.length;u<c;u++){const h=e[u];if(h.POSITION!==void 0&&(n=!0),h.NORMAL!==void 0&&(s=!0),h.COLOR_0!==void 0&&(r=!0),n&&s&&r)break}if(!n&&!s&&!r)return Promise.resolve(i);const a=[],o=[],l=[];for(let u=0,c=e.length;u<c;u++){const h=e[u];if(n){const d=h.POSITION!==void 0?t.getDependency("accessor",h.POSITION):i.attributes.position;a.push(d)}if(s){const d=h.NORMAL!==void 0?t.getDependency("accessor",h.NORMAL):i.attributes.normal;o.push(d)}if(r){const d=h.COLOR_0!==void 0?t.getDependency("accessor",h.COLOR_0):i.attributes.color;l.push(d)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l)]).then(function(u){const c=u[0],h=u[1],d=u[2];return n&&(i.morphAttributes.position=c),s&&(i.morphAttributes.normal=h),r&&(i.morphAttributes.color=d),i.morphTargetsRelative=!0,i})}function sv(i,e){if(i.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)i.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(i.morphTargetInfluences.length===t.length){i.morphTargetDictionary={};for(let n=0,s=t.length;n<s;n++)i.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function rv(i){let e;const t=i.extensions&&i.extensions[He.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+ga(t.attributes):e=i.indices+":"+ga(i.attributes)+":"+i.mode,i.targets!==void 0)for(let n=0,s=i.targets.length;n<s;n++)e+=":"+ga(i.targets[n]);return e}function ga(i){let e="";const t=Object.keys(i).sort();for(let n=0,s=t.length;n<s;n++)e+=t[n]+":"+i[t[n]]+";";return e}function ho(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function av(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":i.search(/\.ktx2($|\?)/i)>0||i.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const ov=new Fe;class cv{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new P0,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,s=-1,r=!1,a=-1;if(typeof navigator<"u"){const o=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(o)===!0;const l=o.match(/Version\/(\d+)/);s=n&&l?parseInt(l[1],10):-1,r=o.indexOf("Firefox")>-1,a=r?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&s<17||r&&a<98?this.textureLoader=new Lf(this.options.manager):this.textureLoader=new Ff(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new gu(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,s=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){const o={scene:a[0][s.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:s.asset,parser:n,userData:{}};return ti(r,o,s),Cn(o,s),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(o)})).then(function(){for(const l of o.scenes)l.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let s=0,r=t.length;s<r;s++){const a=t[s].joints;for(let o=0,l=a.length;o<l;o++)e[a[o]].isBone=!0}for(let s=0,r=e.length;s<r;s++){const a=e[s];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const s=n.clone(),r=(a,o)=>{const l=this.associations.get(a);l!=null&&this.associations.set(o,l);for(const[u,c]of a.children.entries())r(c,o.children[u])};return r(n,s),s.name+="_instance_"+e.uses[t]++,s}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const s=e(t[n]);if(s)return s}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let s=0;s<t.length;s++){const r=e(t[s]);r&&n.push(r)}return n}getDependency(e,t){const n=e+":"+t;let s=this.cache.get(n);if(!s){switch(e){case"scene":s=this.loadScene(t);break;case"node":s=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":s=this.loadAccessor(t);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":s=this.loadBuffer(t);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":s=this.loadSkin(t);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":s=this.loadCamera(t);break;default:if(s=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!s)throw new Error("Unknown type: "+e);break}this.cache.add(n,s)}return s}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,s=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(s.map(function(r,a){return n.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[He.KHR_BINARY_GLTF].body);const s=this.options;return new Promise(function(r,a){n.load(_s.resolveURL(t.uri,s.path),r,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const s=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+s)})}loadAccessor(e){const t=this,n=this.json,s=this.json.accessors[e];if(s.bufferView===void 0&&s.sparse===void 0){const a=pa[s.type],o=Fi[s.componentType],l=s.normalized===!0,u=new o(s.count*a);return Promise.resolve(new Ot(u,a,l))}const r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(a){const o=a[0],l=pa[s.type],u=Fi[s.componentType],c=u.BYTES_PER_ELEMENT,h=c*l,d=s.byteOffset||0,f=s.bufferView!==void 0?n.bufferViews[s.bufferView].byteStride:void 0,g=s.normalized===!0;let _,m;if(f&&f!==h){const p=Math.floor(d/f),S="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+p+":"+s.count;let b=t.cache.get(S);b||(_=new u(o,p*f,s.count*f/c),b=new rf(_,f/c),t.cache.add(S,b)),m=new Eo(b,l,d%f/c,g)}else o===null?_=new u(s.count*l):_=new u(o,d,s.count*l),m=new Ot(_,l,g);if(s.sparse!==void 0){const p=pa.SCALAR,S=Fi[s.sparse.indices.componentType],b=s.sparse.indices.byteOffset||0,M=s.sparse.values.byteOffset||0,L=new S(a[1],b,s.sparse.count*p),R=new u(a[2],M,s.sparse.count*l);o!==null&&(m=new Ot(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let w=0,A=L.length;w<A;w++){const y=L[w];if(m.setX(y,R[w*l]),l>=2&&m.setY(y,R[w*l+1]),l>=3&&m.setZ(y,R[w*l+2]),l>=4&&m.setW(y,R[w*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=g}return m})}loadTexture(e){const t=this.json,n=this.options,r=t.textures[e].source,a=t.images[r];let o=this.textureLoader;if(a.uri){const l=n.manager.getHandler(a.uri);l!==null&&(o=l)}return this.loadTextureImage(e,r,o)}loadTextureImage(e,t,n){const s=this,r=this.json,a=r.textures[e],o=r.images[t],l=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[l])return this.textureCache[l];const u=this.loadImageSource(t,n).then(function(c){c.flipY=!1,c.name=a.name||o.name||"",c.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(c.name=o.uri);const d=(r.samplers||{})[a.sampler]||{};return c.magFilter=ml[d.magFilter]||Yt,c.minFilter=ml[d.minFilter]||Pn,c.wrapS=gl[d.wrapS]||zi,c.wrapT=gl[d.wrapT]||zi,c.generateMipmaps=!c.isCompressedTexture&&c.minFilter!==Ft&&c.minFilter!==Yt,s.associations.set(c,{textures:e}),c}).catch(function(){return null});return this.textureCache[l]=u,u}loadImageSource(e,t){const n=this,s=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(h=>h.clone());const a=s.images[e],o=self.URL||self.webkitURL;let l=a.uri||"",u=!1;if(a.bufferView!==void 0)l=n.getDependency("bufferView",a.bufferView).then(function(h){u=!0;const d=new Blob([h],{type:a.mimeType});return l=o.createObjectURL(d),l});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const c=Promise.resolve(l).then(function(h){return new Promise(function(d,f){let g=d;t.isImageBitmapLoader===!0&&(g=function(_){const m=new bt(_);m.needsUpdate=!0,d(m)}),t.load(_s.resolveURL(h,r.path),g,void 0,f)})}).then(function(h){return u===!0&&o.revokeObjectURL(l),Cn(h,a),h.userData.mimeType=a.mimeType||av(a.uri),h}).catch(function(h){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),h});return this.sourceCache[e]=c,c}assignTexture(e,t,n,s){const r=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),r.extensions[He.KHR_TEXTURE_TRANSFORM]){const o=n.extensions!==void 0?n.extensions[He.KHR_TEXTURE_TRANSFORM]:void 0;if(o){const l=r.associations.get(a);a=r.extensions[He.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),r.associations.set(a,l)}}return s!==void 0&&(a.colorSpace=s),e[t]=a,a})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const s=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){const o="PointsMaterial:"+n.uuid;let l=this.cache.get(o);l||(l=new du,vn.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(o,l)),n=l}else if(e.isLine){const o="LineBasicMaterial:"+n.uuid;let l=this.cache.get(o);l||(l=new hu,vn.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(o,l)),n=l}if(s||r||a){let o="ClonedMaterial:"+n.uuid+":";s&&(o+="derivative-tangents:"),r&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let l=this.cache.get(o);l||(l=n.clone(),r&&(l.vertexColors=!0),a&&(l.flatShading=!0),s&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(o,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return Wi}loadMaterial(e){const t=this,n=this.json,s=this.extensions,r=n.materials[e];let a;const o={},l=r.extensions||{},u=[];if(l[He.KHR_MATERIALS_UNLIT]){const h=s[He.KHR_MATERIALS_UNLIT];a=h.getMaterialType(),u.push(h.extendParams(o,r,t))}else{const h=r.pbrMetallicRoughness||{};if(o.color=new Pe(1,1,1),o.opacity=1,Array.isArray(h.baseColorFactor)){const d=h.baseColorFactor;o.color.setRGB(d[0],d[1],d[2],Bt),o.opacity=d[3]}h.baseColorTexture!==void 0&&u.push(t.assignTexture(o,"map",h.baseColorTexture,yt)),o.metalness=h.metallicFactor!==void 0?h.metallicFactor:1,o.roughness=h.roughnessFactor!==void 0?h.roughnessFactor:1,h.metallicRoughnessTexture!==void 0&&(u.push(t.assignTexture(o,"metalnessMap",h.metallicRoughnessTexture)),u.push(t.assignTexture(o,"roughnessMap",h.metallicRoughnessTexture))),a=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),u.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,o)})))}r.doubleSided===!0&&(o.side=_n);const c=r.alphaMode||ma.OPAQUE;if(c===ma.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,c===ma.MASK&&(o.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&a!==Ut&&(u.push(t.assignTexture(o,"normalMap",r.normalTexture)),o.normalScale=new De(1,1),r.normalTexture.scale!==void 0)){const h=r.normalTexture.scale;o.normalScale.set(h,h)}if(r.occlusionTexture!==void 0&&a!==Ut&&(u.push(t.assignTexture(o,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&a!==Ut){const h=r.emissiveFactor;o.emissive=new Pe().setRGB(h[0],h[1],h[2],Bt)}return r.emissiveTexture!==void 0&&a!==Ut&&u.push(t.assignTexture(o,"emissiveMap",r.emissiveTexture,yt)),Promise.all(u).then(function(){const h=new a(o);return r.name&&(h.name=r.name),Cn(h,r),t.associations.set(h,{materials:e}),r.extensions&&ti(s,h,r),h})}createUniqueName(e){const t=it.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,s=this.primitiveCache;function r(o){return n[He.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(l){return _l(l,o,t)})}const a=[];for(let o=0,l=e.length;o<l;o++){const u=e[o],c=rv(u),h=s[c];if(h)a.push(h.promise);else{let d;u.extensions&&u.extensions[He.KHR_DRACO_MESH_COMPRESSION]?d=r(u):d=_l(new Pt,u,t),s[c]={primitive:u,promise:d},a.push(d)}}return Promise.all(a)}loadMesh(e){const t=this,n=this.json,s=this.extensions,r=n.meshes[e],a=r.primitives,o=[];for(let l=0,u=a.length;l<u;l++){const c=a[l].material===void 0?nv(this.cache):this.getDependency("material",a[l].material);o.push(c)}return o.push(t.loadGeometries(a)),Promise.all(o).then(function(l){const u=l.slice(0,l.length-1),c=l[l.length-1],h=[];for(let f=0,g=c.length;f<g;f++){const _=c[f],m=a[f];let p;const S=u[f];if(m.mode===Jt.TRIANGLES||m.mode===Jt.TRIANGLE_STRIP||m.mode===Jt.TRIANGLE_FAN||m.mode===void 0)p=r.isSkinnedMesh===!0?new of(_,S):new Ke(_,S),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),m.mode===Jt.TRIANGLE_STRIP?p.geometry=fl(p.geometry,jl):m.mode===Jt.TRIANGLE_FAN&&(p.geometry=fl(p.geometry,io));else if(m.mode===Jt.LINES)p=new ff(_,S);else if(m.mode===Jt.LINE_STRIP)p=new wo(_,S);else if(m.mode===Jt.LINE_LOOP)p=new pf(_,S);else if(m.mode===Jt.POINTS)p=new mf(_,S);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(p.geometry.morphAttributes).length>0&&sv(p,r),p.name=t.createUniqueName(r.name||"mesh_"+e),Cn(p,r),m.extensions&&ti(s,p,m),t.assignFinalMaterial(p),h.push(p)}for(let f=0,g=h.length;f<g;f++)t.associations.set(h[f],{meshes:e,primitives:f});if(h.length===1)return r.extensions&&ti(s,h[0],r),h[0];const d=new zt;r.extensions&&ti(s,d,r),t.associations.set(d,{meshes:e});for(let f=0,g=h.length;f<g;f++)d.add(h[f]);return d})}loadCamera(e){let t;const n=this.json.cameras[e],s=n[n.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Nt(Cd.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):n.type==="orthographic"&&(t=new Ar(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Cn(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let s=0,r=t.joints.length;s<r;s++)n.push(this._loadNodeShallow(t.joints[s]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(s){const r=s.pop(),a=s,o=[],l=[];for(let u=0,c=a.length;u<c;u++){const h=a[u];if(h){o.push(h);const d=new Fe;r!==null&&d.fromArray(r.array,u*16),l.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[u])}return new To(o,l)})}loadAnimation(e){const t=this.json,n=this,s=t.animations[e],r=s.name?s.name:"animation_"+e,a=[],o=[],l=[],u=[],c=[];for(let h=0,d=s.channels.length;h<d;h++){const f=s.channels[h],g=s.samplers[f.sampler],_=f.target,m=_.node,p=s.parameters!==void 0?s.parameters[g.input]:g.input,S=s.parameters!==void 0?s.parameters[g.output]:g.output;_.node!==void 0&&(a.push(this.getDependency("node",m)),o.push(this.getDependency("accessor",p)),l.push(this.getDependency("accessor",S)),u.push(g),c.push(_))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l),Promise.all(u),Promise.all(c)]).then(function(h){const d=h[0],f=h[1],g=h[2],_=h[3],m=h[4],p=[];for(let S=0,b=d.length;S<b;S++){const M=d[S],L=f[S],R=g[S],w=_[S],A=m[S];if(M===void 0)continue;M.updateMatrix&&M.updateMatrix();const y=n._createAnimationTracks(M,L,R,w,A);if(y)for(let x=0;x<y.length;x++)p.push(y[x])}return new Tf(r,void 0,p)})}createNodeMesh(e){const t=this.json,n=this,s=t.nodes[e];return s.mesh===void 0?null:n.getDependency("mesh",s.mesh).then(function(r){const a=n._getNodeRef(n.meshCache,s.mesh,r);return s.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let l=0,u=s.weights.length;l<u;l++)o.morphTargetInfluences[l]=s.weights[l]}),a})}loadNode(e){const t=this.json,n=this,s=t.nodes[e],r=n._loadNodeShallow(e),a=[],o=s.children||[];for(let u=0,c=o.length;u<c;u++)a.push(n.getDependency("node",o[u]));const l=s.skin===void 0?Promise.resolve(null):n.getDependency("skin",s.skin);return Promise.all([r,Promise.all(a),l]).then(function(u){const c=u[0],h=u[1],d=u[2];d!==null&&c.traverse(function(f){f.isSkinnedMesh&&f.bind(d,ov)});for(let f=0,g=h.length;f<g;f++)c.add(h[f]);return c})}_loadNodeShallow(e){const t=this.json,n=this.extensions,s=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const r=t.nodes[e],a=r.name?s.createUniqueName(r.name):"",o=[],l=s._invokeOne(function(u){return u.createNodeMesh&&u.createNodeMesh(e)});return l&&o.push(l),r.camera!==void 0&&o.push(s.getDependency("camera",r.camera).then(function(u){return s._getNodeRef(s.cameraCache,r.camera,u)})),s._invokeAll(function(u){return u.createNodeAttachment&&u.createNodeAttachment(e)}).forEach(function(u){o.push(u)}),this.nodeCache[e]=Promise.all(o).then(function(u){let c;if(r.isBone===!0?c=new cu:u.length>1?c=new zt:u.length===1?c=u[0]:c=new dt,c!==u[0])for(let h=0,d=u.length;h<d;h++)c.add(u[h]);if(r.name&&(c.userData.name=r.name,c.name=a),Cn(c,r),r.extensions&&ti(n,c,r),r.matrix!==void 0){const h=new Fe;h.fromArray(r.matrix),c.applyMatrix4(h)}else r.translation!==void 0&&c.position.fromArray(r.translation),r.rotation!==void 0&&c.quaternion.fromArray(r.rotation),r.scale!==void 0&&c.scale.fromArray(r.scale);if(!s.associations.has(c))s.associations.set(c,{});else if(r.mesh!==void 0&&s.meshCache.refs[r.mesh]>1){const h=s.associations.get(c);s.associations.set(c,{...h})}return s.associations.get(c).nodes=e,c}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],s=this,r=new zt;n.name&&(r.name=s.createUniqueName(n.name)),Cn(r,n),n.extensions&&ti(t,r,n);const a=n.nodes||[],o=[];for(let l=0,u=a.length;l<u;l++)o.push(s.getDependency("node",a[l]));return Promise.all(o).then(function(l){for(let c=0,h=l.length;c<h;c++)r.add(l[c]);const u=c=>{const h=new Map;for(const[d,f]of s.associations)(d instanceof vn||d instanceof bt)&&h.set(d,f);return c.traverse(d=>{const f=s.associations.get(d);f!=null&&h.set(d,f)}),h};return s.associations=u(r),r})}_createAnimationTracks(e,t,n,s,r){const a=[],o=e.name?e.name:e.uuid,l=[];Hn[r.path]===Hn.weights?e.traverse(function(d){d.morphTargetInfluences&&l.push(d.name?d.name:d.uuid)}):l.push(o);let u;switch(Hn[r.path]){case Hn.weights:u=Xi;break;case Hn.rotation:u=$i;break;case Hn.translation:case Hn.scale:u=qi;break;default:switch(n.itemSize){case 1:u=Xi;break;case 2:case 3:default:u=qi;break}break}const c=s.interpolation!==void 0?tv[s.interpolation]:Es,h=this._getArrayFromAccessor(n);for(let d=0,f=l.length;d<f;d++){const g=new u(l[d]+"."+Hn[r.path],t.array,h,c);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),a.push(g)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=ho(t.constructor),s=new Float32Array(t.length);for(let r=0,a=t.length;r<a;r++)s[r]=t[r]*n;t=s}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const s=this instanceof $i?ev:Tu;return new s(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function lv(i,e,t){const n=e.attributes,s=new dn;if(n.POSITION!==void 0){const o=t.json.accessors[n.POSITION],l=o.min,u=o.max;if(l!==void 0&&u!==void 0){if(s.set(new U(l[0],l[1],l[2]),new U(u[0],u[1],u[2])),o.normalized){const c=ho(Fi[o.componentType]);s.min.multiplyScalar(c),s.max.multiplyScalar(c)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const r=e.targets;if(r!==void 0){const o=new U,l=new U;for(let u=0,c=r.length;u<c;u++){const h=r[u];if(h.POSITION!==void 0){const d=t.json.accessors[h.POSITION],f=d.min,g=d.max;if(f!==void 0&&g!==void 0){if(l.setX(Math.max(Math.abs(f[0]),Math.abs(g[0]))),l.setY(Math.max(Math.abs(f[1]),Math.abs(g[1]))),l.setZ(Math.max(Math.abs(f[2]),Math.abs(g[2]))),d.normalized){const _=ho(Fi[d.componentType]);l.multiplyScalar(_)}o.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(o)}i.boundingBox=s;const a=new yn;s.getCenter(a.center),a.radius=s.min.distanceTo(s.max)/2,i.boundingSphere=a}function _l(i,e,t){const n=e.attributes,s=[];function r(a,o){return t.getDependency("accessor",a).then(function(l){i.setAttribute(o,l)})}for(const a in n){const o=uo[a]||a.toLowerCase();o in i.attributes||s.push(r(n[a],o))}if(e.indices!==void 0&&!i.index){const a=t.getDependency("accessor",e.indices).then(function(o){i.setIndex(o)});s.push(a)}return qe.workingColorSpace!==Bt&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${qe.workingColorSpace}" not supported.`),Cn(i,e),lv(i,e,t),Promise.all(s).then(function(){return e.targets!==void 0?iv(i,e.targets,t):i})}class uv extends ro{constructor(){super();const e=new Qt;e.deleteAttribute("uv");const t=new Wi({side:Ct}),n=new Wi,s=new _u(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);const r=new Ke(e,t);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);const a=new uu(e,n,6),o=new dt;o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),o.updateMatrix(),a.setMatrixAt(0,o.matrix),o.position.set(-5.607,-.754,-.758),o.rotation.set(0,.994,0),o.scale.set(1.97,1.534,3.955),o.updateMatrix(),a.setMatrixAt(1,o.matrix),o.position.set(6.167,.857,7.803),o.rotation.set(0,.561,0),o.scale.set(3.927,6.285,3.687),o.updateMatrix(),a.setMatrixAt(2,o.matrix),o.position.set(-2.017,.018,6.124),o.rotation.set(0,.333,0),o.scale.set(2.002,4.566,2.064),o.updateMatrix(),a.setMatrixAt(3,o.matrix),o.position.set(2.291,-.756,-2.621),o.rotation.set(0,-.286,0),o.scale.set(1.546,1.552,1.496),o.updateMatrix(),a.setMatrixAt(4,o.matrix),o.position.set(-2.193,-.369,-5.547),o.rotation.set(0,.516,0),o.scale.set(3.875,3.487,2.986),o.updateMatrix(),a.setMatrixAt(5,o.matrix),this.add(a);const l=new Ke(e,Pi(50));l.position.set(-16.116,14.37,8.208),l.scale.set(.1,2.428,2.739),this.add(l);const u=new Ke(e,Pi(50));u.position.set(-16.109,18.021,-8.207),u.scale.set(.1,2.425,2.751),this.add(u);const c=new Ke(e,Pi(17));c.position.set(14.904,12.198,-1.832),c.scale.set(.15,4.265,6.331),this.add(c);const h=new Ke(e,Pi(43));h.position.set(-.462,8.89,14.52),h.scale.set(4.38,5.441,.088),this.add(h);const d=new Ke(e,Pi(20));d.position.set(3.235,11.486,-12.541),d.scale.set(2.5,2,.1),this.add(d);const f=new Ke(e,Pi(100));f.position.set(0,20,0),f.scale.set(1,.1,1),this.add(f)}dispose(){const e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(const t of e)t.dispose()}}function Pi(i){const e=new Ut;return e.color.setScalar(i),e}const _r=2758464,ds=.5,vl={counter:{kitchen:{file:"rest/kitchencounter_straight_A_decorated.gltf",fit:.96},"*":{file:"furn/cabinet_medium_decorated.gltf",fit:.9}},case:{kitchen:{file:"rest/fridge_A_decorated.gltf",fit:.8,maxH:1.25},"*":{file:"furn/cabinet_small_decorated.gltf",fit:.8}},chair:{kitchen:{file:"rest/chair_A.gltf",fit:.62,seatY:.28},"*":{file:"furn/chair_A_wood.gltf",fit:.62,seatY:.28}},table:{kitchen:{file:"rest/table_round_A_decorated.gltf",fit:.9},"*":{file:"furn/table_medium.gltf",fit:.9}},plant:{"*":{file:"furn/cactus_medium_A.gltf",fit:.6,maxH:.9}},carpet:{kitchen:{file:"furn/rug_rectangle_stripes_A.gltf",fit:.96,flat:!0,seatY:.03},"*":{file:"furn/rug_oval_A.gltf",fit:.96,flat:!0,seatY:.03}},shelf:{"*":{file:"furn/shelf_B_large_decorated.gltf",fit:.92,maxH:1.3}},crate:{kitchen:{file:"rest/crate_carrots.gltf",fit:.7},"*":{file:"rest/crate_potatoes.gltf",fit:.7}},sofa:{"*":{file:"furn/couch_pillows.gltf",fit:.98,seatY:.24}},bench:{"*":{file:"city/bench.gltf",fit:.92,seatY:.22}},bed:{"*":{file:"furn/bed_single_A.gltf",fit:.98,seatY:.3}},statue:{"*":{file:"kenney/statue_head.glb",fit:.62,maxH:1.1,tint:15327698}},desk:{"*":{file:"kenney/desk.glb",fit:.92}},piano:{"*":{file:"furn/cabinet_medium.gltf",fit:.92,tint:3811886}}},hv=(i,e)=>vl[i]?.[e]??vl[i]?.["*"]??null,xl=[15317886,11063446,15772046,10469608,13020648,15782522,10016452,15642820],Ml=[15980968,13625023,16173496,13228787,14732787,16180131,13035999,15977947],yl=["#ffe2c2","#f5c9a0","#c99067","#ecd0b6","#8d5a3b","#ffd9b8","#b97a52","#f1c7a5"],Sl=["flatcap","cap","bun","beret","hair"];function dv(i,e,t){const n=t==="bram"?"helmet":t==="mina"?"wizard":t==="rue"?"hair":Sl[i%Sl.length];return{hue:e,hat:n,skin:yl[i*3%yl.length]}}const _a=(i,e,t)=>new Pe().setHSL(i/360,e/100,t/100),xt=(i,e={})=>new fn({color:i,roughness:.42,clearcoat:.35,clearcoatRoughness:.3,...e}),fv=new Ut({color:_r,side:Ct});function Mt(i,e,t,n=[0,0,0],s=[1,1,1],r=[0,0,0],a=.035){const o=new Ke(e,t);if(o.position.set(n[0],n[1],n[2]),o.scale.set(s[0],s[1],s[2]),o.rotation.set(r[0],r[1],r[2]),o.castShadow=!0,o.receiveShadow=!0,i.add(o),a){const l=new Ke(e,fv);l.scale.setScalar(1+a),o.add(l)}return o}const El=i=>new Co(i.map(([e,t])=>new De(e,t)),40);function va(i){const e=new zt,t=_a(i.hue,82,55),n=_a(i.hue,75,38),s=_a((i.hue+25)%360,70,36),r=1,a=1;Mt(e,El([[0,0],[.6,0],[.66,.03],[.68,.09],[.64,.15],[.5,.17],[0,.17]]),xt(n),[0,0,0],[1,1,1],[0,0,0],.02),Mt(e,El([[0,0],[.36,0],[.44,.12],[.47,.3],[.44,.52],[.36,.7],[.22,.8],[0,.82]]),xt(t),[0,.16,0],[r,a,r*.92]);for(const h of[-1,1])Mt(e,new Ao(.085,.26,6,12),xt(t),[h*.44*r,.55,.04],[1,1,1],[.15,0,h*.35],.06);for(const h of[-1,1])Mt(e,new on(.075,16,12),new Ut({color:_r}),[h*.53*r,.36,.08],[1,1,1],[0,0,0],0);const o=new zt;o.position.set(0,.16+.82*a+.3,0),e.add(o),e.userData.head=o;const l=xt(i.skin,{clearcoat:.15,roughness:.55});Mt(o,new on(.42,40,30),l,[0,0,0],[1,.94,.92]);for(const h of[-1,1]){const d=new zt;d.position.set(h*.14,.02,.36),d.rotation.y=h*.33,o.add(d),Mt(d,new on(.06,16,12),new Ut({color:_r}),[0,0,0],[.85,1.15,.5],[0,0,0],0)}Mt(o,new bs(.05,.012,8,20,Math.PI*.8),new Ut({color:_r}),[0,-.15,.37],[1,.6,1],[.2,0,Math.PI*1.1],0);const u=xt(s),c=(h,d,f=0)=>Mt(o,new on(.45,36,18,0,Math.PI*2,0,Math.PI/2),u,[0,h,0],[1.02,d,1.02],[f,0,0]);return i.hat==="flatcap"?(c(.06,.78),Mt(o,new oi(.3,.3,.03,24,1,!1,-Math.PI/2,Math.PI),u,[0,.13,.22],[1,1,.8],[.18,0,0])):i.hat==="wizard"?(Mt(o,new Er(.34,.75,32),u,[0,.55,-.04],[1,1,1],[-.2,0,.12]),Mt(o,new oi(.56,.56,.04,36),u,[0,.22,0],[1,1,1],[-.08,0,0])):i.hat==="hair"?(c(.05,.95,-.25),Mt(o,new on(.16,16,12),u,[.3,.32,-.1]),Mt(o,new on(.16,16,12),u,[-.3,.32,-.1])):i.hat==="helmet"?(Mt(o,new on(.46,36,18,0,Math.PI*2,0,Math.PI/2),xt("#b9c0cc",{metalness:.6,roughness:.3}),[0,.02,0],[1,.9,1]),Mt(o,new Er(.08,.3,12),xt("#d9444f"),[0,.5,-.05])):i.hat==="cap"?(c(.1,.8),Mt(o,new oi(.26,.26,.03,24,1,!1,-Math.PI/2,Math.PI),u,[0,.12,.3],[1,1,1.1],[.05,0,0])):i.hat==="bun"?(c(.04,.9,-.2),Mt(o,new on(.19,18,14),u,[0,.46,-.12])):(Mt(o,new oi(.44,.48,.12,30),u,[.04,.3,-.02],[1,1,1],[-.12,0,-.18]),Mt(o,new on(.06,12,10),u,[.02,.4,0])),e}class Tl{constructor(e){lt(this,"canvas");lt(this,"renderer");lt(this,"scene",new ro);lt(this,"cam",new Ar(-1,1,1,-1,.1,400));lt(this,"loader",new C0);lt(this,"cache",new Map);lt(this,"world",new zt);lt(this,"pawnLayer",new zt);lt(this,"caseKey","");lt(this,"model",null);lt(this,"seatAt",new Map);lt(this,"pawns",[]);lt(this,"ring");lt(this,"focusRings",[]);lt(this,"ghost",null);lt(this,"loot");lt(this,"dirty",!0);lt(this,"raf",0);lt(this,"selAt",0);lt(this,"fresh",!0);lt(this,"markLayer",new zt);lt(this,"markMats",{});lt(this,"selected",null);lt(this,"looks",[]);lt(this,"portraits",new Map);lt(this,"portraitRenderer",null);this.base=e,this.renderer=new dl({antialias:!0,alpha:!0}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),this.renderer.outputColorSpace=yt,this.renderer.toneMapping=Ra,this.renderer.toneMappingExposure=.98,this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=kl,this.canvas=this.renderer.domElement,this.canvas.className="board3d",this.canvas.setAttribute("aria-hidden","true");const t=new co(this.renderer);this.scene.environment=t.fromScene(new uv,.04).texture,this.scene.environmentIntensity=.5;const n=new mr(16773336,2.4);n.position.set(-5,12,9),n.castShadow=!0,n.shadow.mapSize.set(2048,2048),n.shadow.radius=5,n.shadow.normalBias=.03,n.shadow.bias=-4e-4,Object.assign(n.shadow.camera,{left:-9,right:9,top:9,bottom:-9,near:1,far:40}),n.shadow.camera.updateProjectionMatrix(),this.scene.add(n,n.target),this.key=n;const s=new mr(14207231,.9);s.position.set(6,5,-6),this.scene.add(s,new Bc(16773598,4864040,.5)),this.scene.add(this.world,this.pawnLayer,this.markLayer);const r=(f,g)=>new Ut({color:f,transparent:!0,opacity:g,depthWrite:!1});this.markMats={ruled:r(1839144,.26),cand:r(16766042,.55),sight:r(8018896,.42),"sight-origin":r(16747069,.6),"drop-ok":r(4177791,.6),"drop-bad":r(14704730,.5),x:r(16777215,.55)},this.ring=new Ke(new bs(.42,.05,10,40),new Ut({color:16762941})),this.ring.rotation.x=-Math.PI/2,this.ring.visible=!1,this.scene.add(this.ring),this.loot=new zt;const a=new Ke(new Po(.16,0),xt(16762941,{emissive:new Pe(16751872),emissiveIntensity:.45,metalness:.3}));a.castShadow=!0,a.scale.y=1.35,this.loot.add(a),this.loot.visible=!1,this.scene.add(this.loot);const o=window.matchMedia?.("(prefers-reduced-motion: reduce)").matches??!1,l=260,u=150/260,c=180,h=2,d=()=>{this.raf=requestAnimationFrame(d);const f=performance.now();let g=!1;for(const[_,m]of this.pawns.entries()){if(!m.cell)continue;const p=o?1:Math.min(1,(f-m.drop)/l);p<1&&(g=!0);const S=p<u?1-(p/u)**2:0,b=p<u?0:(p-u)/(1-u),M=p<u||p>=1?0:Math.sin(b*Math.PI)*.16*(1-b*.6);let L=m.seat+S*1.4;if(_===this.selected&&p>=1){const R=o?1:(f-this.selAt)/c;L+=.05+(R<h?Math.abs(Math.sin(R*Math.PI))*.14:0),R<h&&(g=!0)}m.obj.position.y=L,m.obj.scale.set(ds*(1+M),ds*(1-M),ds*(1+M))}(g||this.dirty)&&(this.renderer.render(this.scene,this.cam),this.dirty=!1)};this.raf=requestAnimationFrame(d)}static supported(){try{const e=document.createElement("canvas");return!!(e.getContext("webgl2")||e.getContext("webgl"))}catch{return!1}}destroy(){cancelAnimationFrame(this.raf),this.renderer.dispose()}load(e){let t=this.cache.get(e);return t||(t=this.loader.loadAsync(`${this.base}models/${e}`).then(n=>(n.scene.traverse(s=>{const r=s;r.isMesh&&(r.castShadow=!0,r.receiveShadow=!0)}),n.scene)).catch(()=>null),this.cache.set(e,t)),t}setCase(e,t,n,s,r){if(e===this.caseKey)return;this.caseKey=e,this.model=t,this.looks=s,this.fresh=!0,this.world.clear(),this.pawnLayer.clear(),this.markLayer.clear(),this.pawns=[],this.seatAt.clear();const{rows:a,cols:o}=t,l=this.key;l.target.position.set(o/2,0,a/2),l.position.set(o/2-5,12,a/2+9);const u=.42,c=new Ke(new Qt(o+u*2,.5,a+u*2),[xt(9067068,{clearcoat:0}),xt(9067068,{clearcoat:0}),xt(8176746,{clearcoat:0,roughness:.8}),xt(7293490,{clearcoat:0}),xt(9067068,{clearcoat:0}),xt(9067068,{clearcoat:0})]);c.position.set(o/2,-.3,a/2),c.receiveShadow=!0,this.world.add(c);const h=new Ke(new Qt(o+u*2+.04,.08,a+u*2+.04),xt(6861399,{clearcoat:0,roughness:.85}));h.position.set(o/2,-.07,a/2),h.receiveShadow=!0,this.world.add(h);const d=w=>Math.max(0,t.roomKeys.indexOf(w)),f=new Map,g=(w,A)=>{const y=`${w}-${A}`;let x=f.get(y);if(!x){const I=new Pe(xl[w%xl.length]);A&&I.offsetHSL(0,-.03,-.035),x=xt(I,{clearcoat:.25,clearcoatRoughness:.5,roughness:.6}),f.set(y,x)}return x},_=xt(10123868,{clearcoat:0,roughness:.9}),m=new Qt(.94,.1,.94);for(let w=0;w<a;w++)for(let A=0;A<o;A++){if(!t.isCell(w,A))continue;const y=new Ke(new Qt(1,.08,1),_);y.position.set(A+.5,-.07,w+.5),y.receiveShadow=!0,this.world.add(y);const x=new Ke(m,g(d(t.roomOf(w,A)),(w+A)%2===1));x.position.set(A+.5,-.05,w+.5),x.receiveShadow=!0,this.world.add(x)}const p=xt(16511454,{clearcoat:.1,roughness:.7}),S=xt(11036991,{clearcoat:.2}),b=.12,M=(w,A,y,x,I,z)=>{const B=y==="x"?x+b:b,Y=y==="z"?x+b:b,Z=new Ke(new Qt(B,I,Y),z!==void 0?xt(z,{clearcoat:.05,roughness:.8}):p);Z.position.set(w,I/2,A),Z.castShadow=!0,Z.receiveShadow=!0,this.world.add(Z);const K=new Ke(new Qt(B+.03,.05,Y+.03),S);K.position.set(w,I+.02,A),K.castShadow=!0,this.world.add(K)},L=(w,A,y,x)=>t.isCell(y,x)&&t.roomOf(y,x)===t.roomOf(w,A),R=[];for(let w=0;w<a;w++)for(let A=0;A<o;A++){if(!t.isCell(w,A))continue;const y=d(t.roomOf(w,A));t.isCell(w-1,A)?L(w,A,w-1,A)||M(A+.5,w,"x",1,.32):(M(A+.5,w,"x",1,1.25,Ml[y%Ml.length]),(w*7+A*3)%4===1&&R.push([w,A])),t.isCell(w,A-1)?L(w,A,w,A-1)||M(A,w+.5,"z",1,.32):M(A,w+.5,"z",1,.62),t.isCell(w,A+1)||M(A+1,w+.5,"z",1,.62),t.isCell(w+1,A)||M(A+.5,w+1,"x",1,.2)}for(const[w,A]of R)this.load("furn/pictureframe_medium.gltf").then(y=>{if(!y||this.caseKey!==e)return;const x=y.clone(!0);bl(x,.42,.42),x.position.set(A+.5,.62,w+.08),this.world.add(x),this.dirty=!0});for(const[w,A]of t.furniture){const[y,x]=w.split(",").map(Number),I=hv(A,n);I&&(I.seatY!==void 0&&this.seatAt.set(w,I.seatY),this.load(I.file).then(z=>{if(!z||this.caseKey!==e)return;const B=z.clone(!0);I.tint!==void 0&&B.traverse(Y=>{const Z=Y;Z.isMesh&&(Z.material=new Wi({color:I.tint,roughness:.55}))}),B.rotation.y=pv(A,y,x,t),bl(B,I.fit??.86,I.maxH??1.2,I.flat),B.position.x+=x+.5,B.position.z+=y+.5,this.world.add(B),this.dirty=!0}))}this.loot.visible=!0,this.loot.position.set(t.loot.c+.5,(this.seatAt.get(`${t.loot.r},${t.loot.c}`)??0)+1.05,t.loot.r+.5),s.forEach(w=>{const A=va(w);A.scale.setScalar(ds),A.visible=!1,this.pawnLayer.add(A),this.pawns.push({obj:A,cell:null,drop:0,seat:0})}),this.dirty=!0}sync(e,t,n,s){t!==this.selected&&(this.selAt=performance.now()),this.selected=t,e.forEach((a,o)=>{const l=this.pawns[o];if(!l)return;const u=!!a&&(!l.cell||l.cell.r!==a.r||l.cell.c!==a.c);l.cell=a,l.obj.visible=!!a,a&&(l.seat=this.seatAt.get(`${a.r},${a.c}`)??0,l.obj.position.set(a.c+.5,l.seat,a.r+.5),l.obj.rotation.y=0,u&&(l.drop=this.fresh?0:performance.now()))}),this.fresh=!1;const r=t!==null?this.pawns[t]:null;this.ring.visible=!!r?.cell,r?.cell&&this.ring.position.set(r.cell.c+.5,r.seat+.03,r.cell.r+.5);for(const a of this.focusRings)this.scene.remove(a);if(this.focusRings=n.filter(a=>this.pawns[a]?.cell).map(a=>{const o=this.pawns[a],l=new Ke(new bs(.38,.04,10,40),new Ut({color:8018896}));return l.rotation.x=-Math.PI/2,l.position.set(o.cell.c+.5,o.seat+.03,o.cell.r+.5),this.scene.add(l),l}),this.ghost&&(this.scene.remove(this.ghost),this.ghost=null),s&&this.looks[s.i]){const a=va(this.looks[s.i]);a.traverse(o=>{const l=o;if(l.isMesh){const u=l.material.clone();u.transparent=!0,u.opacity=.45,u.depthWrite=!1,l.material=u,l.castShadow=!1}}),a.scale.setScalar(ds),a.position.set(s.cell.c+.5,this.seatAt.get(`${s.cell.r},${s.cell.c}`)??0,s.cell.r+.5),this.ghost=a,this.scene.add(a)}this.dirty=!0}marks(e){this.markLayer.clear();const t=new Gi(.94,.94),n=new Gi(.34,.05);for(const[s,r]of e){const[a,o]=s.split(",").map(Number);r.forEach((l,u)=>{const c=this.markMats[l];if(!c)return;const h=new Ke(t,c);if(h.rotation.x=-Math.PI/2,h.position.set(o+.5,.004+u*.002,a+.5),h.renderOrder=2,this.markLayer.add(h),l==="ruled"&&!this.model?.furniture.has(s))for(const d of[Math.PI/4,-Math.PI/4]){const f=new Ke(n,this.markMats.x);f.rotation.set(-Math.PI/2,0,d),f.position.set(o+.5,.012,a+.5),f.renderOrder=3,this.markLayer.add(f)}})}this.dirty=!0}layout(e,t){this.canvas.parentElement!==e&&e.prepend(this.canvas);const n=this.model;if(!n)return;const s=t.querySelector('.cell[data-r="0"][data-c="0"], .cell'),r=t.querySelectorAll(".cell"),a=r[r.length-1];if(!s||!a)return;const o=e.getBoundingClientRect(),l=t.getBoundingClientRect(),u=r[0].getBoundingClientRect(),c=a.getBoundingClientRect(),h=(c.right-u.left)/n.cols,d=(c.bottom-u.top)/n.rows;if(!(h>0)||!(d>0))return;const f=Math.min(.999,d/h),g=Math.sqrt(1-f*f),_=l.left-o.left-12,m=l.top-o.top-h*.15,p=Math.round(l.width+24),S=Math.round(c.bottom-o.top-m+h*.72);Object.assign(this.canvas.style,{left:`${_}px`,top:`${m}px`,width:`${p}px`,height:`${S}px`}),this.renderer.setSize(p,S,!1);const b=u.left-(o.left+_),M=u.top-(o.top+m),L=60;this.cam.position.set(0,L*f,L*g),this.cam.up.set(0,g,-f),this.cam.lookAt(0,0,0),this.cam.left=-b/h,this.cam.right=this.cam.left+p/h,this.cam.top=M/h,this.cam.bottom=this.cam.top-S/h,this.cam.near=1,this.cam.far=L+60,this.cam.updateProjectionMatrix(),this.dirty=!0}portrait(e){const t=this.looks[e];if(!t)return"";const n=`${t.hue}-${t.hat}-${t.skin}`,s=this.portraits.get(n);if(s)return s;try{const r=this.portraitRenderer??(this.portraitRenderer=new dl({antialias:!0,alpha:!0,preserveDrawingBuffer:!0}));r.setPixelRatio(1),r.setSize(160,160),r.setClearColor(0,0),r.outputColorSpace=yt,r.toneMapping=Ra;const a=new ro;a.environment=this.scene.environment,a.environmentIntensity=.55;const o=new mr(16773596,2.4);o.position.set(2,4,5),a.add(o,new Bc(16774374,3811904,.6));const l=va(t);a.add(l);const u=new Nt(24,1,.1,50);u.position.set(0,1.9,5.2),u.lookAt(0,1.05,0),r.render(a,u);const c=r.domElement.toDataURL("image/png");return this.portraits.set(n,c),c}catch{return""}}}function bl(i,e,t,n=!1){i.updateMatrixWorld(!0);const r=new dn().setFromObject(i).getSize(new U),a=Math.max(r.x,r.z)||1;let o=e/a;!n&&r.y*o>t&&(o=t/r.y),i.scale.multiplyScalar(o),i.updateMatrixWorld(!0);const l=new dn().setFromObject(i),u=l.getCenter(new U);i.position.x-=u.x,i.position.z-=u.z,i.position.y-=l.min.y}function pv(i,e,t,n){const s=(r,a)=>n.furniture.get(`${r},${a}`);if(i==="chair"||i==="bench"||i==="sofa"){const r=[[1,0,0],[-1,0,Math.PI],[0,1,Math.PI/2],[0,-1,-Math.PI/2]];for(const[a,o,l]of r){const u=s(e+a,t+o);if(u==="table"||u==="desk"||u==="counter")return l}}if(i==="shelf"||i==="case"||i==="counter"||i==="piano"||i==="bed"){if(!n.isCell(e+1,t)||n.isCell(e+1,t)&&n.roomOf(e+1,t)!==n.roomOf(e,t)&&n.isCell(e-1,t)&&n.roomOf(e-1,t)===n.roomOf(e,t))return Math.PI;if(!n.isCell(e,t-1)||n.roomOf(e,t-1)!==n.roomOf(e,t))return Math.PI/2;if(!n.isCell(e,t+1)||n.roomOf(e,t+1)!==n.roomOf(e,t))return-Math.PI/2}return 0}const Li=[18,205,285,140,48,340,170,250],Ze=i=>String(i).replace(/[&<>"]/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[e]),mv={true:{sym:"✓",label:"fits"},false:{sym:"✕",label:"does not fit"},unknown:{sym:"○",label:"not decided yet"}};async function gv(i,e){const t="./",n=Mh(),s=E=>fetch(E),[r,a]=await Promise.all([ih(t,s,n),Nu(t,s)]),o=gh(e),u=Object.keys(o.cases).length===0&&r.practice.length?r.practice[0]:r.daily??r.practice[0];if(!u){i.innerHTML='<p class="fatal">No case file found. Add data/cases/liar/sample.json and rebuild.</p>';return}const c={};Object.assign(c,{save:o,lists:r,assets:a,today:n,selected:null,holding:null,hover:null,focusClue:null,revealSig:null,endOpen:!1,modal:null,confirmReset:!1,practiceIdx:0,lastTouch:Date.now(),liarMode:!1,intro:_v(e)?null:0}),Ne(c,u),c.practiceIdx=Math.max(0,r.practice.findIndex(E=>E.key===u.key)),i.innerHTML=`
    <div class="app">
      <header id="hdr" class="hdr"></header>
      <div class="layout">
        <section id="stage" class="stage" aria-label="Case board"></section>
        <section id="cards" class="cardpane" aria-label="Clue cards"></section>
      </div>
      <div id="modal"></div>
      <div id="toast" class="toast" role="status" aria-live="polite"></div>
    </div>`;const h=E=>i.querySelector(`#${E}`),d=h("hdr"),f=h("stage"),g=h("cards"),_=h("modal"),m=h("toast"),p=Tl.supported()?new Tl(t):null;p&&new ResizeObserver(()=>he()).observe(f),wl(c.save.settings.theme),window.matchMedia?.("(prefers-color-scheme: dark)").addEventListener?.("change",()=>bu(c.save.settings.theme));const S=()=>c.current.data.puzzle.suspects.map(E=>E.name),b=()=>c.current.kind==="practice"?"guided":c.save.settings.help,M=()=>b()==="guided"||c.revealSig!==null&&c.revealSig===Lr(c.progress.placement),L=()=>c.progress.solved,R=()=>Ku(c.current.data.puzzle.clues,c.progress.placement,c.ctx);function w(){_h(e,c.save)}function A(){const E=Date.now();c.progress.solved||(c.progress.activeMs+=Math.min(E-c.lastTouch,6e4)),c.lastTouch=E}function y(E){m.textContent=E,m.classList.add("show"),window.clearTimeout(y.t),y.t=window.setTimeout(()=>m.classList.remove("show"),2400)}function x(){const E=Sh(c.save.streak,c.today),C=c.current.kind==="daily",H=c.lists.practice;d.innerHTML=`
      <div class="brand"><span class="logo" aria-hidden="true"></span><h1>Whodunit Lane</h1></div>
      <div class="hdr-right">
        <span class="streak" title="Daily streak">Streak <b>${E}</b></span>
        <button class="btn ghost" data-action="intro" aria-label="How to play">How to play</button>
        <button class="btn ghost" data-action="settings" aria-label="Settings">Settings</button>
      </div>
      <nav class="tabs" aria-label="Case">
        ${c.lists.daily?`<button class="tab ${C?"on":""}" data-action="daily">Today${c.lists.daily.date?` <small>${Ze(c.lists.daily.date)}</small>`:""}</button>`:""}
        ${H.length?`<button class="tab ${C?"":"on"}" data-action="practice">Practice${H.length>1?` <small>${c.practiceIdx+1}/${H.length}</small>`:""}</button>`:""}
      </nav>`}function I(){if(!c.coach.length)return null;const E=lh(c.coach,c.progress.placement,c.save.coachStep[c.current.key]??0);return E&&E.index!==c.coachFor&&(c.coachFor=E.index,c.coachLevel=0),E}function z(){if(c.progress.solved||c.progress.placement.some(Boolean))return"";const E=Z();if(!E)return"";const C=S()[E.i],H=E.n.cards.length?` because of card${E.n.cards.length>1?"s":""} ${E.n.cards.join(" and ")}`:"";return`<div class="startbar">${E.n.cells.length===1?`<b>Start with ${Ze(C)}</b>: only one square fits${H}.`:`<b>Start with ${Ze(C)}</b>: only ${E.n.cells.length} squares fit${H}.`} <button class="btn small" data-action="show-start" data-s="${E.i}">Show me</button></div>`}function B(){if(b()!=="guided")return'<div class="coach off" aria-hidden="true"></div>';const E=c.progress;if(E.solved)return'<div class="coach"><b>Case closed.</b> Open the results to share it.</div>';const C=I();let H,V="";if(c.coach.length&&C){const ee=Math.min(c.coachLevel,C.step.levels.length-1);H=C.step.levels[ee],C.manual?V='<button class="btn small" data-action="coach-next">Next tip</button>':ee<C.step.levels.length-1&&(V='<button class="btn small" data-action="coach-more">More help</button>')}else c.coach.length?H="Everything on the board is done. Press “Point out the lie”, tap the card you think is the lie, then press Solve.":H=uh({clues:c.current.data.puzzle.clues,suspectNames:S(),placement:E.placement,verdicts:R(),liar:E.liar});return`<div class="coach" role="note"><span class="coach-tag">Coach</span><span class="coach-text">${Ze(H)}</span>${V}</div>`}function Y(E){const C=c.current.lieHelp;return Ju(E,c.current.data.puzzle.clues,c.progress.placement,c.model,c.ctx,{lieNo:C==="told"?c.current.data.solution.falseClueNo:null,pair:C==="pair"?Xo(c.current.data):null,hard:C==="none"})}function Z(){let E=null;return c.progress.placement.forEach((C,H)=>{if(C)return;const V=Y(H);V.cells.length&&(!E||V.cells.length<E.n.cells.length)&&(E={i:H,n:V})}),E}function K(){const{puzzle:E}=c.current.data,C=c.model,H=C.roomKeys,V=new Map;for(let ce=0;ce<E.rows;ce++)for(let D=0;D<E.cols;D++){const le=C.roomOf(ce,D);C.isCell(ce,D)&&!V.has(le)&&V.set(le,`${ce},${D}`)}const ee=c.progress.placement,ne=new Set(ee.filter(Boolean).map(ce=>ce.r)),X=new Set(ee.filter(Boolean).map(ce=>ce.c)),J=c.selected,Se=J!==null?Y(J):null,me=Se?new Set(Se.cells.map(ce=>`${ce.r},${ce.c}`)):null;let ae=`<div class="board ${p?"three":""} ${J!==null?"picking":""}" style="--cols:${E.cols};--rows:${E.rows}" role="group" aria-label="Floor plan, ${E.rows} rows by ${E.cols} columns">`;ae+='<span class="axis corner-sp"></span>';for(let ce=0;ce<E.cols;ce++)ae+=`<span class="axis ax-c">${ce+1}</span>`;for(let ce=0;ce<E.rows;ce++){ae+=`<span class="axis ax-r">${ce+1}</span>`;for(let D=0;D<E.cols;D++){if(!C.isCell(ce,D)){ae+='<span class="cell void"></span>';continue}const le=C.roomOf(ce,D),ie=["n","s","w","e"].map(Vt=>{const di=ce+(Vt==="n"?-1:Vt==="s"?1:0),Qi=D+(Vt==="w"?-1:Vt==="e"?1:0);return!C.isCell(di,Qi)||C.roomOf(di,Qi)!==le?`w${Vt}`:""}).join(" "),pe=C.furniture.get(`${ce},${D}`),se=C.blocking.has(`${ce},${D}`),Q=C.loot.r===ce&&C.loot.c===D,ge=Go(c.progress.placement,ce,D);let Ce="";ge<0&&!se&&(J!==null?Ce=me.has(`${ce},${D}`)?"cand":"ruled":(ne.has(ce)||X.has(D))&&(Ce="ruled"));const ot=V.get(le)===`${ce},${D}`?`<span class="rlabel">${Ze(C.roomLabel(le))}</span>`:"",Je=pe?`<span class="furn ${se?"blocking":"seat"}" data-key="${Pr(pe)}">${c.assets[Pr(pe)]?`<img src="${Ze(c.assets[Pr(pe)].src)}" alt="">`:""}<em>${Ze(pe)}</em></span>`:"",Ht=Q?`<span class="loot" data-key="voorwerp.buit" title="${Ze(E.loot.item)}"></span>`:"",tn=`Row ${ce+1}, column ${D+1}, ${C.roomLabel(le)}${pe?`, ${pe}${se?" (blocked)":""}`:""}${ge>=0?`, ${S()[ge]}`:""}`,hi=c.assets[ko(le)]??c.assets[["vloer.hout","vloer.tegel"][H.indexOf(le)%2]],Rs=hi?` style="--tile:url('${Ze(hi.src)}');--tx:${D%2*100}%;--ty:${ce%2*100}%"`:"";ae+=`<div class="cell rm${H.indexOf(le)%8} ${ie} ${Ce} ${se?"is-blocked":""} ${hi?"has-floor":""}"${Rs} data-r="${ce}" data-c="${D}" data-floor="${ko(le)}" tabindex="0" role="button" aria-label="${Ze(tn)}">${ot}${Je}${Ht}${ge>=0?Te(ge,"on-board"):""}${Ce==="ruled"?'<span class="xmark" aria-hidden="true">✕</span>':""}</div>`}}return`${ae}</div>`}function te(){return c.current.data.puzzle.suspects.map((E,C)=>dv(C,Li[C%Li.length],Ds(C,E.cast)))}function $(){if(!p)return;const E=c.current.data.puzzle;p.setCase(c.current.key,c.model,E.theme,te(),c.assets);const C=c.focusClue!==null?E.clues.find(ne=>ne.no===c.focusClue):void 0,H=c.holding??c.selected,V=H!==null&&c.hover&&cr(c.model,c.progress.placement,H,c.hover).ok?{i:H,cell:c.hover}:null;p.sync(c.progress.placement,c.selected,C?ts(C):[],V);const ee=new Map;f.querySelectorAll(".cell[data-r]").forEach(ne=>{const X=["ruled","cand","sight","sight-origin","drop-ok","drop-bad"].filter(J=>ne.classList.contains(J));X.length&&ee.set(`${ne.dataset.r},${ne.dataset.c}`,X)}),p.marks(ee)}function he(){if(!p)return;const E=f.querySelector(".stage-pin"),C=f.querySelector(".board");E&&C&&p.layout(E,C)}function _e(E){if(p){$();const V=p.portrait(E);if(V)return`<img class="face pawnface" src="${V}" alt="">`}const C=Ds(E,c.current.data.puzzle.suspects[E].cast),H=C?c.assets[`cast.${C}.staand`]??c.assets[`cast.${C}`]:void 0;return H?`<img class="face" src="${Ze(H.src)}" alt="">`:""}function Te(E,C=""){const H=S()[E],V=c.progress.placement[E],ee=c.focusClue!==null&&ts(c.current.data.puzzle.clues.find(X=>X.no===c.focusClue)).includes(E)?"focus":"",ne=c.selected===E?"sel":"";return`<span class="token ${C} ${ee} ${ne}" data-s="${E}" data-key="${Ze("cast."+(Ds(E,c.current.data.puzzle.suspects[E].cast)??"extra"))}" style="--tc:hsl(${Li[E%Li.length]} 55% 40%)" tabindex="0" role="button" aria-pressed="${c.selected===E}" aria-label="${Ze(H)}, number ${E+1}${V?`, at row ${V.r+1} column ${V.c+1}`:", not placed"}">${_e(E)}<b>${Ze(H.charAt(0).toUpperCase())}</b><i>${E+1}</i></span>`}function Be(){const E=c.progress.placement;return`<div class="roster" id="roster" aria-label="Suspects">${S().map((H,V)=>{const ee=E[V]?"":Y(V).cells.length;return`<span class="chip ${E[V]?"placed":""}">${Te(V,"in-roster")}<span class="chip-name">${Ze(H)}</span>${ee!==""?`<small class="chip-n ${ee===1?"one":""}">${ee===1?"1 square!":ee+" squares"}</small>`:""}</span>`}).join("")}</div>`}function tt(){return`<div class="legend"><span><i class="lg lg-block"></i>blocked</span><span><i class="lg lg-seat"></i>seat</span><span><i class="lg lg-loot"></i>${Ze(c.current.data.puzzle.loot.item)}</span></div>`}function q(){const E=c.current.data.puzzle;f.innerHTML=`
      <div class="stage-top">
        <div class="caseline"><span>${Ze(E.planLabel)}</span><span class="pill">${Ze(E.difficulty)}</span><span class="pill">${E.suspects.length} suspects</span></div>
        ${z()}${B()}
      </div>
      <div class="stage-pin">
        ${K()}
        <div class="sightbar" id="sightbar" aria-live="polite"></div>
        ${Be()}
      </div>
      ${tt()}`,gt(),he()}function oe(E,C,H){const V=c.progress.liar===E.no,ee=M(),ne=ee&&!V?C:"unknown",X=V?"v-marked":ee?`v-${ne}`:"v-off",J=V?{sym:"LIE?",label:"marked as the lie"}:ee?mv[ne]:{sym:"",label:""},Se=ts(E).map(ce=>`<span class="mini" style="--tc:hsl(${Li[ce%Li.length]} 55% 40%)" title="${Ze(S()[ce])}">${Ze(S()[ce])}</span>`).join(""),me=c.current.lieHelp==="told"&&E.no===c.current.data.solution.falseClueNo,ae=me?'<span class="toldtag">This card is the lie: the opposite is true</span>':E.statement?V?`<button class="stamp on" data-action="mark" data-no="${E.no}" aria-pressed="true" ${L()?"disabled":""}>Not the lie</button>`:c.liarMode&&!L()?'<span class="stamp-hint">Tap to call this the lie</span>':"":'<span class="factag" title="A plain fact: always true">fact</span>';return`<article class="card ${X} ${c.focusClue===E.no?"focus":""} ${H.has(E.no)?"hint":""} ${c.liarMode&&!E.statement?"nolie":""} ${c.liarMode&&E.statement?"lieable":""} ${me?"told":""} ${Ee().includes(E.no)?"clash":""}" data-no="${E.no}" data-type="${Ze(E.type)}" tabindex="0" aria-label="Card ${E.no}: ${Ze(E.text)}${ee&&!V?", "+J.label:""}">
      <div class="card-top"><span class="no">${E.no}</span><span class="icon">${bh(Ou(E),c.assets)}</span><span class="who">${Se}</span><span class="badge" aria-hidden="true">${J.sym}</span></div>
      <p class="cap">${Ze(zo(E))}</p>
      ${ae}
    </article>`}function Ee(){return c.current.lieHelp!=="pair"||c.progress.solved?[]:Xo(c.current.data)??[]}function fe(){const E=c.current.lieHelp;if(c.progress.solved)return"";if(E==="told")return`<div class="liebanner told"><b>Easy:</b> card ${c.current.data.solution.falseClueNo} is the lie, so its opposite is true. Every other card is true.</div>`;const C=Ee();return E==="pair"&&C.length?`<div class="liebanner pair"><b>Medium:</b> cards ${C[0]} and ${C[1]} clash. One of them is the lie; every other card is true.</div>`:'<div class="liebanner hard"><b>Hard:</b> one card lies. Find two cards that can’t both be true.</div>'}function be(){const E=c.progress,C=Wo(E.placement),H=b()==="detective",V=Ns-E.checksUsed,ee=C&&E.liar!==null&&!E.solved,ne=E.placement.length,X=E.placement.filter(Boolean).length,J=M()?R().filter(ce=>ce==="true").length:null,Se=c.current.data.puzzle.clues.length,me=`<div class="progress" aria-label="Progress">
      <div class="pg"><span>Suspects placed</span><b>${X} / ${ne}</b><i class="bar"><u style="width:${X/ne*100}%"></u></i></div>
      ${J!==null?`<div class="pg"><span>Hints that fit</span><b>${J} / ${Se}</b><i class="bar"><u style="width:${J/Se*100}%"></u></i></div>`:""}
    </div>`,ae=E.solved||c.current.lieHelp==="told"?"":`<button class="btn ${c.liarMode?"primary":""}" data-action="lie-mode" aria-pressed="${c.liarMode}">${c.liarMode?"Cancel":E.liar!==null?"Change the lie":"Point out the lie"}</button>`;return`${me}<div class="actions">
      ${ae}
      ${H?`<button class="btn" data-action="check" ${V<=0||L()||!E.placement.some(Boolean)?"disabled":""}>Check <span class="pill">${V} left</span></button>`:""}
      <button class="btn" data-action="reset" ${L()||!E.placement.some(Boolean)&&E.liar===null?"disabled":""}>Clear</button>
      ${E.solved?'<button class="btn primary" data-action="results">Results</button>':`<button class="btn primary" data-action="solve" ${ee?"":"disabled"}>Solve</button>`}
    </div>
    <p class="needs">${E.solved?"":ee?"Ready to file the case.":C?"Press “Point out the lie”, then tap the card.":"Place every suspect."}</p>`}function Ye(E,C){const{puzzle:H}=c.current.data,V=c.selected,ee=H.clues.map((J,Se)=>({c:J,v:E[Se]}));if(c.liarMode)return`<p class="modehint">Tap the card that you think lies. Plain facts can't lie.</p><div class="cards">${ee.map(J=>oe(J.c,J.v,C)).join("")}</div>`;if(V===null)return`<div class="cards">${ee.map(J=>oe(J.c,J.v,C)).join("")}</div>`;const ne=ee.filter(J=>ts(J.c).includes(V)),X=ee.filter(J=>!ts(J.c).includes(V));return`<h3 class="grp">${Ze(S()[V])}: ${ne.length} hint${ne.length===1?"":"s"}</h3>
      <div class="cards">${ne.map(J=>oe(J.c,J.v,C)).join("")||'<p class="muted">No hint names this suspect directly.</p>'}</div>
      <h3 class="grp rest">Other hints</h3>
      <div class="cards dimmed">${X.map(J=>oe(J.c,J.v,C)).join("")}</div>`}function Me(){const E=R(),{puzzle:C}=c.current.data,H=b()==="guided"&&!c.progress.solved?I():null,V=new Set(H&&c.coachLevel>=1?H.step.uses??[]:[]);g.innerHTML=`
      <details class="rules"><summary>Rules</summary>
        <ul>
          <li>Put every suspect on one square: one per row, no two in a column.</li>
          <li>One witness lies. Statements (cards with a stamp) can lie; facts never do.</li>
          <li>The culprit is the only suspect in the room with the ${Ze(C.loot.item)}.</li>
        </ul>
        <p class="small">${Ze(C.instruction)}</p>
      </details>
      ${fe()}
      ${be()}
      ${Ye(E,V)}
      <p class="keyline"><span class="k k-true">✓ fits</span><span class="k k-false">✕ breaks</span><span class="k k-unknown">○ undecided</span></p>`}const st=[{title:"Your job: place every suspect",body:"Each suspect stands on one square of the floor plan. <b>One per row, and never two in the same column.</b> Drag a suspect from the bottom onto a square.",pic:Al([[1,0,0,0],[0,0,1,0],[0,0,0,0],[0,0,0,0]],"rows")},{title:"The cards tell you where",body:"Every card is a hint, like “Pip was south of Sir Bram”. <b>Tap a suspect</b> and their hints jump to the top. Gold squares show where they can still go. Grey ✕ squares are already ruled out.",pic:Al([[0,0,0,0],[0,2,2,0],[0,2,1,2],[0,0,2,0]],"cand")},{title:"One witness lies",body:"Every card with a round circle in the corner is a statement, and <b>exactly one statement is a lie</b>. Cards marked FACT are always true. On <b>easy</b> days we tell you which card lies. On <b>medium</b> days we show the two cards that clash. On <b>hard</b> days you find it yourself.",pic:'<div class="ip-cards"><span class="ip-c ok">✓ Fact</span><span class="ip-c ok">✓ Statement</span><span class="ip-c bad">✕ The lie?</span></div>'},{title:"Where to start",body:"The yellow bar says <b>who to start with</b>. Two cards about one person usually leave a single square, like “Otto was beside a case” and “Otto was in column 2”. Press <b>Show me</b> and the square lights up. Every placement greys out a row and a column, and the bar picks the next person.",pic:'<div class="ip-cards"><span class="ip-c ok">Otto: beside a case</span><span class="ip-c ok">Otto: column 2</span><span class="ip-c">= 1 square</span></div>'},{title:"Finish the case",body:"When everyone is placed, press <b>Point out the lie</b> and tap the card you think is false. Then <b>Solve</b>. The culprit is the only suspect alone in the room with the ◆ (the loot).",pic:'<div class="ip-cards"><span class="ip-c">◆ loot</span><span class="ip-c ok">Solve</span></div>'}];function ze(){if(c.intro!==null){const E=c.intro,C=st[E],H=E===st.length-1;_.innerHTML=`<div class="scrim" data-action="intro-skip"></div>
        <div class="sheet intro" role="dialog" aria-modal="true" aria-label="How to play">
          <p class="muted">Step ${E+1} of ${st.length}</p>
          <h2>${C.title}</h2>
          <div class="ip-pic">${C.pic}</div>
          <p>${C.body}</p>
          <div class="sheet-actions">
            ${E>0?'<button class="btn" data-action="intro-back">Back</button>':""}
            <button class="btn primary" data-action="${H?"intro-skip":"intro-next"}">${H?"Start playing":"Next"}</button>
            ${H?"":'<button class="btn ghost" data-action="intro-skip">Skip</button>'}
          </div>
        </div>`,_.querySelector(".sheet .btn.primary")?.focus();return}if(c.modal==="settings"){const E=c.save.settings,C=(H,V,ee)=>`<div class="seg" role="radiogroup">${V.map(([ne,X])=>`<button role="radio" aria-checked="${ee===ne}" class="${ee===ne?"on":""}" data-action="set" data-name="${H}" data-value="${ne}">${X}</button>`).join("")}</div>`;_.innerHTML=`<div class="scrim" data-action="close"></div>
        <div class="sheet" role="dialog" aria-modal="true" aria-label="Settings">
          <h2>Settings</h2>
          <div class="setting"><label>Theme</label>${C("theme",[["auto","Auto"],["light","Day"],["dark","Night"]],E.theme)}</div>
          <div class="setting"><label>Help</label>${C("help",[["guided","Guided"],["detective","Detective"]],E.help)}
            <p class="small">Guided: cards react live and the coach talks. Detective: no live feedback, you get ${Ns} checks per case. Practice cases are always guided.</p></div>
          <div class="setting"><button class="btn ${c.confirmReset?"danger":""}" data-action="reset-all">${c.confirmReset?"Tap again to erase everything":"Erase progress and streak"}</button></div>
          <div class="sheet-actions"><button class="btn primary" data-action="close">Done</button></div>
        </div>`,_.querySelector(".sheet .btn.primary")?.focus();return}if(c.endOpen&&c.progress.solved){const E=c.current.data,C=E.puzzle.clues.find(X=>X.no===E.solution.falseClueNo),H=Number.isInteger(C.params.s)?S()[C.params.s]:null,V=c.save.streak.count,ee=c.current.kind==="practice",ne=ee&&c.lists.practice[c.practiceIdx+1];_.innerHTML=`<div class="scrim" data-action="close-end"></div>
        <div class="sheet end" role="dialog" aria-modal="true" aria-label="Case closed">
          <h2>Case closed</h2>
          <dl class="facts">
            <dt>Culprit</dt><dd><b>${Ze(E.solution.thief.name)}</b>, alone in the ${Ze(c.model.roomLabel(E.solution.lootRoom))}</dd>
            <dt>The lie</dt><dd>Card ${C.no}: “${Ze(zo(C))}”${H?` (said by ${Ze(H)})`:""}</dd>
            <dt>Time</dt><dd>${Fl(c.progress.activeMs)}, ${c.progress.attempts<=1?"first try":c.progress.attempts+" tries"}, ${c.progress.checksUsed} check${c.progress.checksUsed===1?"":"s"}</dd>
            ${ee?"":`<dt>Streak</dt><dd><b>${V}</b> day${V===1?"":"s"} (best ${c.save.streak.best})</dd>`}
          </dl>
          <div class="sheet-actions">
            <button class="btn primary" data-action="share">Share</button>
            ${ne?'<button class="btn" data-action="practice-next">Next practice case</button>':""}
            ${ee&&c.lists.daily?'<button class="btn" data-action="daily">Today’s case</button>':""}
            <button class="btn ghost" data-action="close-end">Back to board</button>
          </div>
        </div>`,_.querySelector(".sheet .btn.primary")?.focus();return}_.innerHTML=""}function We(){x(),q(),Me(),ze()}function N(){q(),Me()}function gt(){const E=c.holding??c.selected,C=f.querySelector("#sightbar"),H=f.querySelectorAll(".cell[data-r]");if(H.forEach(me=>me.classList.remove("sight","sight-origin")),queueMicrotask($),!C)return;if(E===null){C.innerHTML='<span class="muted">Hold a suspect to see who they can see.</span>';return}const V=c.current.data.puzzle.suspects[E],ee=Ds(E,V.cast),ne=c.hover??c.progress.placement[E],X=c.holding===null&&c.selected===E&&c.progress.placement[E]&&!L()?'<button class="btn small" data-action="pickup">Pick up</button>':"";if(!ee){C.innerHTML=`<span class="sb-name">${Ze(V.name)}</span><span class="sb-rule muted">Sees nothing special</span>${X}`;return}const J=Yo[ee]===V.name?"":` <small>as ${Yo[ee]}</small>`;if(C.innerHTML=`<span class="sb-name">${Ze(V.name)}${J}</span><span class="sb-rule">${ph[ee]}</span>${X}`,!ne)return;const Se=new Set(mh(c.model,ne,ee).map(me=>`${me.r},${me.c}`));H.forEach(me=>{const ae=`${me.dataset.r},${me.dataset.c}`;Se.has(ae)&&me.classList.add("sight"),ne.r===Number(me.dataset.r)&&ne.c===Number(me.dataset.c)&&me.classList.add("sight-origin")})}function Xe(){c.revealSig=c.revealSig===Lr(c.progress.placement)?c.revealSig:null,w(),N()}function et(E,C){if(L())return;const H=cr(c.model,c.progress.placement,E,C);if(!H.ok){const V=H.reason==="void"?"There is no floor there.":H.reason==="blocked"?"That square is blocked.":H.reason==="row"?`${S()[H.with]} is already in that row.`:`${S()[H.with]} is already in that column.`;y(V),c.selected=E,c.hover=null,q(),Me();return}A(),c.progress.placement=Vo(c.progress.placement,E,C),c.selected=null,c.hover=null,Xe()}function ye(E){L()||!c.progress.placement[E]||(A(),c.progress.placement=Vo(c.progress.placement,E,null),c.selected=null,Xe())}function Ve(E){c.selected=c.selected===E?null:E,c.hover=null,q(),Me()}function we(){const E=c.progress;if(!Wo(E.placement)||E.liar===null||E.solved)return;A(),E.attempts+=1;const C=ju(c.current.data.solution,E.placement,E.liar);C.solved?(E.solved=!0,E.solvedOn=c.today,c.current.kind==="daily"&&(c.save.streak=yh(c.save.streak,c.today)),c.endOpen=!0,w(),We()):(w(),y(C.cellsRight?"The board holds, but another card is the lie.":"Not quite: someone is on the wrong square."),Me())}function Ne(E,C){E.current=C,E.model=ku(C.data.puzzle),E.ctx={model:E.model,cast:C.data.puzzle.suspects};const H=C.data.puzzle.suspects.length;E.progress=xh(E.save,C.key,H),E.save.cases[C.key]=E.progress,C.lieHelp==="told"&&E.progress.liar===null&&(E.progress.liar=C.data.solution.falseClueNo),E.coach=Dl(C.data.coach,C.data.puzzle.suspects.map(V=>V.name)),E.coachLevel=0,E.coachFor=-1,E.selected=E.holding=null,E.hover=null,E.focusClue=null,E.revealSig=null,E.endOpen=!1,E.liarMode=!1,E.lastTouch=Date.now()}function ft(E){if(!E)return;Ne(c,E);const C=c.lists.practice.findIndex(H=>H.key===E.key);E.kind==="practice"&&C>=0&&(c.practiceIdx=C),w(),We()}async function P(){const E=Eh({date:c.current.date??c.today,difficulty:c.current.data.puzzle.difficulty,ms:c.progress.activeMs,attempts:c.progress.attempts,streak:c.save.streak.count,url:location.href.split("#")[0],practice:c.current.kind==="practice"});try{if(navigator.share){await navigator.share({text:E});return}}catch(C){if(C?.name==="AbortError")return}try{await navigator.clipboard.writeText(E),y("Result copied. Paste it anywhere.")}catch{window.prompt("Copy your result:",E)}}i.addEventListener("click",E=>{const C=E.target,H=C.closest("[data-action]");if(H){const ne=H.dataset.action;if(H.hasAttribute("disabled"))return;switch(ne){case"daily":c.lists.daily&&ft(c.lists.daily);return;case"practice":{const X=c.lists.practice;c.current.kind==="practice"&&X.length>1?ft(X[(c.practiceIdx+1)%X.length]):ft(X[Math.min(c.practiceIdx,X.length-1)]);return}case"practice-next":ft(c.lists.practice[c.practiceIdx+1]);return;case"settings":c.modal="settings",c.confirmReset=!1,ze();return;case"close":c.modal=null,c.confirmReset=!1,ze();return;case"close-end":c.endOpen=!1,ze();return;case"results":c.endOpen=!0,ze();return;case"share":P();return;case"set":{const X=H.dataset.name,J=H.dataset.value;X==="theme"&&(c.save.settings.theme=J,wl(J)),X==="help"&&(c.save.settings.help=J,c.revealSig=null),w(),ze(),N();return}case"reset-all":if(!c.confirmReset){c.confirmReset=!0,ze();return}try{e?.removeItem("whodunit-lane:v1")}catch{}location.reload();return;case"show-start":c.selected=Number(H.dataset.s),c.hover=null,q(),Me();return;case"intro":c.intro=0,ze();return;case"intro-next":c.intro=Math.min((c.intro??0)+1,st.length-1),ze();return;case"intro-back":c.intro=Math.max((c.intro??0)-1,0),ze();return;case"intro-skip":c.intro=null,vv(e),ze();return;case"lie-mode":c.liarMode=!c.liarMode,c.selected=null,q(),Me();return;case"mark":{if(L())return;const X=Number(H.dataset.no);if(c.current.lieHelp==="told")return;A(),c.progress.liar=c.progress.liar===X?null:X,w(),Me(),q();return}case"check":{if(c.progress.checksUsed>=Ns)return;c.progress.checksUsed+=1,c.revealSig=Lr(c.progress.placement),w(),Me(),q(),y(`Check used. ${Ns-c.progress.checksUsed} left. Moving a suspect hides the result.`);return}case"reset":if(L())return;A(),c.progress.placement=c.progress.placement.map(()=>null),c.progress.liar=c.current.lieHelp==="told"?c.current.data.solution.falseClueNo:null,c.selected=null,c.revealSig=null,Xe();return;case"pickup":c.selected!==null&&ye(c.selected);return;case"coach-more":c.coachLevel+=1,q(),Me();return;case"coach-next":{const X=c.current.key,J=I();J&&(c.save.coachStep[X]=J.index+1),w(),q();return}case"solve":we();return}return}const V=C.closest(".cell[data-r]");if(V&&!C.closest(".token")){const ne=Number(V.dataset.r),X=Number(V.dataset.c);if(c.selected!==null)et(c.selected,{r:ne,c:X});else{const J=Go(c.progress.placement,ne,X);J>=0&&Ve(J)}return}const ee=C.closest(".card");if(ee){const ne=Number(ee.dataset.no);if(c.liarMode&&!L()){c.current.data.puzzle.clues.find(J=>J.no===ne)?.statement&&(A(),c.progress.liar=ne,c.liarMode=!1,w(),Me(),q());return}c.focusClue=c.focusClue===ne?null:ne,Me(),q()}}),i.addEventListener("keydown",E=>{if(E.key==="Escape"){c.modal?(c.modal=null,ze()):c.endOpen&&(c.endOpen=!1,ze());return}if(E.key!=="Enter"&&E.key!==" ")return;const C=E.target,H=C.closest(".token[data-s]");if(H){E.preventDefault(),Ve(Number(H.dataset.s));return}C.matches(".cell[data-r], .card")&&(E.preventDefault(),C.click())});let v=null;const k=(E,C)=>document.elementFromPoint(E,C)?.closest(".cell[data-r]")??null;i.addEventListener("pointerdown",E=>{const C=E.target.closest(".token[data-s]");!C||L()||E.button>0||(E.preventDefault(),v={s:Number(C.dataset.s),x:E.clientX,y:E.clientY,active:!1,ghost:null,origin:C,over:null},c.holding=v.s,c.hover=null,gt())}),document.addEventListener("pointermove",E=>{if(!v){if(E.pointerType==="mouse"&&c.selected!==null){const H=k(E.clientX,E.clientY),V=H?{r:Number(H.dataset.r),c:Number(H.dataset.c)}:null;((V?.r??-1)!==(c.hover?.r??-1)||(V?.c??-1)!==(c.hover?.c??-1))&&(c.hover=V,gt())}return}if(!v.active&&Math.hypot(E.clientX-v.x,E.clientY-v.y)>6){v.active=!0;const H=v.origin.cloneNode(!0);H.classList.add("ghost"),H.removeAttribute("tabindex"),document.body.appendChild(H),v.ghost=H,v.origin.classList.add("lifted")}if(!v.active||!v.ghost)return;v.ghost.style.transform=`translate(${E.clientX}px, ${E.clientY}px) translate(-50%, -120%)`;const C=k(E.clientX,E.clientY);if(C!==v.over){if(v.over?.classList.remove("drop-ok","drop-bad"),v.over=C,C){const H={r:Number(C.dataset.r),c:Number(C.dataset.c)};C.classList.add(cr(c.model,c.progress.placement,v.s,H).ok?"drop-ok":"drop-bad"),c.hover=H}else c.hover=null;gt()}});const j=(E,C)=>{if(!v)return;const H=v;if(v=null,H.ghost?.remove(),H.origin.classList.remove("lifted"),H.over?.classList.remove("drop-ok","drop-bad"),c.holding=null,c.hover=null,C){gt();return}if(H.active){const V=k(E.clientX,E.clientY);if(V){et(H.s,{r:Number(V.dataset.r),c:Number(V.dataset.c)});return}if(document.elementFromPoint(E.clientX,E.clientY)?.closest("#roster, .caseline, .coach")){ye(H.s);return}gt();return}Ve(H.s)};document.addEventListener("pointerup",E=>j(E,!1)),document.addEventListener("pointercancel",E=>j(E,!0)),We(),"serviceWorker"in navigator&&navigator.serviceWorker.register(`${t}sw.js`).catch(()=>{}),window.__bd={state:c,tryPlace:et,solve:we}}function bu(i){const e=i==="dark"||i==="auto"&&window.matchMedia?.("(prefers-color-scheme: dark)").matches;document.querySelector('meta[name="theme-color"]')?.setAttribute("content",e?"#17101f":"#efe6d7")}function wl(i){i==="auto"?document.documentElement.removeAttribute("data-theme"):document.documentElement.setAttribute("data-theme",i),bu(i)}function _v(i){try{return i?.getItem("whodunit-lane:intro")==="1"}catch{return!1}}function vv(i){try{i?.setItem("whodunit-lane:intro","1")}catch{}}function Al(i,e){return`<div class="ip-grid">${i.flat().map(t=>t===1?'<i class="ip-s">●</i>':t===2?e==="cand"?'<i class="ip-g"></i>':'<i class="ip-x">✕</i>':"<i></i>").join("")}</div>`}function xv(){try{const i="__bd_probe__";return localStorage.setItem(i,"1"),localStorage.removeItem(i),localStorage}catch{return null}}gv(document.getElementById("root"),xv());
