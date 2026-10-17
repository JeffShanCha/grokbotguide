import assert from 'node:assert/strict';
import {readFile,readdir,stat} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {parse} from 'parse5';
// Run after npm run build. Add --live http://[::1]:4321 to audit the existing
// dev server as well, including content-loader/schema refreshes.
const root=fileURLToPath(new URL('../dist/',import.meta.url)).replace(/\/$/,'');
const liveArgument=process.argv.indexOf('--live');
const liveOrigin=liveArgument<0?undefined:new URL(process.argv[liveArgument+1]).origin;
const attr=(n,k)=>n.attrs?.find(a=>a.name===k)?.value;
const find=(n,p)=>[...(p(n)?[n]:[]),...(n.childNodes||[]).flatMap(c=>find(c,p))];
const ancestors=n=>{const a=[];while(n=n.parentNode)a.push(n);return a;};
const text=n=>n.nodeName==='#text'?n.value:(n.childNodes||[]).map(text).join('');
async function walk(dir){return(await Promise.all((await readdir(dir,{withFileTypes:true})).map(e=>e.isDirectory()?walk(dir+'/'+e.name):dir+'/'+e.name))).flat();}
const pages=new Map(),external=new Map(),internal=new Map(),han=[],bad=[],crossLanguage=[],caseLinks=[];
const pageFiles=(await walk(root+'/en')).filter(p=>p.endsWith('/index.html')&&!p.includes('/files/'));
for(let offset=0;offset<pageFiles.length;offset+=6){
 await Promise.all(pageFiles.slice(offset,offset+6).map(async file=>{
  const path=file.slice(root.length,-'index.html'.length);
  let html;
  if(liveOrigin){const response=await fetch(liveOrigin+path,{signal:AbortSignal.timeout(15000)});assert.equal(response.status,200,`Live page failed: ${path}`);html=await response.text();}
  else html=await readFile(file,'utf8');
  const tree=parse(html);pages.set(path,{tree,ids:new Set(find(tree,n=>attr(n,'id')!==undefined).map(n=>attr(n,'id')))});
 }));
}
for(const [page,{tree}]of pages){
 for(const n of find(tree,n=>n.nodeName==='#text'&&/\p{Script=Han}/u.test(n.value))){if(ancestors(n).some(p=>['script','style','noscript'].includes(p.tagName)||p.tagName==='gbg-lang-menu'))continue;han.push({page,text:n.value.trim().slice(0,220),parent:n.parentNode?.tagName,classes:ancestors(n).map(p=>attr(p,'class')).filter(Boolean).slice(0,3)});}
 for(const node of find(tree,n=>n.tagName&&!['script','style'].includes(n.tagName))){
  if(node.tagName==='gbg-lang-menu'||ancestors(node).some(p=>p.tagName==='gbg-lang-menu'))continue;
  for(const name of ['alt','title','placeholder','aria-label']){const value=attr(node,name);if(value&&/\p{Script=Han}/u.test(value))han.push({page,text:value,attribute:name});}
 }
 for(const a of find(tree,n=>n.tagName==='a'&&attr(n,'href'))){const href=attr(a,'href');let u;try{u=new URL(href,'https://grokbotguide.ai'+page);}catch{bad.push({page,href,reason:'invalid URL'});continue;}if(!['http:','https:'].includes(u.protocol))continue;if(!['grokbotguide.ai','localhost','127.0.0.1','[::1]'].includes(u.hostname)){const key=u.origin+u.pathname+u.search;if(!external.has(key))external.set(key,[]);external.get(key).push(page);continue;}const key=u.pathname+u.hash;if(!internal.has(key))internal.set(key,[]);internal.get(key).push(page);
 const languageControl=ancestors(a).some(p=>p.tagName==='gbg-lang-menu');if(u.pathname.startsWith('/zh/')&&!languageControl)crossLanguage.push({page,href,label:text(a)});if(/^\/en\/recipes\/[^/]+\/$/.test(u.pathname)&&!u.pathname.includes('/topics/'))caseLinks.push({page,href,label:text(a).trim(),content:ancestors(a).some(p=>['main','article'].includes(p.tagName))});
 }
 for(const img of find(tree,n=>n.tagName==='img'&&attr(n,'src')?.startsWith('/'))){const path=attr(img,'src');if(!internal.has(path))internal.set(path,[]);internal.get(path).push(page);}
}
for (const [key,from] of internal) {
 const u=new URL(key,'https://grokbotguide.ai');
 const decoded=decodeURIComponent(u.pathname);
 let target=pages.get(decoded),exists=!!target;
 if (!exists && liveOrigin) {
  const response=await fetch(liveOrigin+u.pathname+u.search,{signal:AbortSignal.timeout(15000)});
  exists=response.ok;
  if(exists&&response.headers.get('content-type')?.includes('text/html')){const tree=parse(await response.text());target={tree,ids:new Set(find(tree,n=>attr(n,'id')!==undefined).map(n=>attr(n,'id')))};}
  else await response.body?.cancel();
 }
 if (!exists && !liveOrigin) for (const suffix of ['',decoded.endsWith('/')?'index.html':'/index.html']) {
  try {
   const file=root+decoded+suffix;
   if (!(await stat(file)).isFile()) continue;
   exists=true;
   if (file.endsWith('.html')) {
    const tree=parse(await readFile(file,'utf8'));
    target={tree,ids:new Set(find(tree,n=>attr(n,'id')!==undefined).map(n=>attr(n,'id')))};
   }
   break;
  } catch {}
 }
 if(!exists) bad.push({href:key,from:[...new Set(from)],reason:'missing target'});
 else if(u.hash&&target&&!target.ids.has(decodeURIComponent(u.hash.slice(1)))) bad.push({href:key,from:[...new Set(from)],reason:'missing anchor'});
}
const tutorialPaths=new Set([...pages].filter(([,page])=>find(page.tree,n=>n.tagName==='pre'&&attr(n,'id')?.startsWith('wf-')).length).map(([url])=>url));
assert.equal(tutorialPaths.size,25,'Expected all 25 complete English tutorials.');
// Starlight handbook supplements sit alongside the 25 interactive workflows.
const supplements=new Set(['/en/recipes/usage-audit/']);
for(const path of supplements){const page=pages.get(path);assert(page,`Missing handbook supplement: ${path}`);assert(find(page.tree,n=>n.tagName==='h2').length>=6,`Incomplete handbook supplement: ${path}`);assert(find(page.tree,n=>attr(n,'class')?.split(' ').includes('gbg-tpl')).length>=2,`Missing reusable prompts: ${path}`);}
for(const link of caseLinks)assert(tutorialPaths.has(new URL(link.href,'https://grokbotguide.ai'+link.page).pathname)||supplements.has(new URL(link.href,'https://grokbotguide.ai'+link.page).pathname),`Case link is not a complete tutorial: ${link.page} -> ${link.href}`);
assert.equal(han.length,0,`Untranslated English text or labels: ${JSON.stringify(han)}`);
assert.equal(crossLanguage.length,0,`Chinese destinations in English content: ${JSON.stringify(crossLanguage)}`);
assert.equal(bad.length,0,`Broken internal targets or anchors: ${JSON.stringify(bad)}`);
const contextual=caseLinks.filter(link=>link.content&&/^\/en\/(?:guide|answers|resources)/.test(link.page));
for(const page of ['/en/guide/','/en/answers/','/en/resources/']){
 const source=pages.get(page)?.tree;assert(source,`Missing entry page: ${page}`);
 assert(find(source,n=>attr(n,'data-complete-tutorial-links')!==undefined).length,`Missing complete tutorial entry: ${page}`);
}
console.log(`English site ${liveOrigin?'live ':''}verified: ${pages.size} pages, ${internal.size} internal targets, ${contextual.length} contextual tutorial links, 25 complete destinations, no untranslated text or broken anchors. Language names in the language switcher are retained.`);
