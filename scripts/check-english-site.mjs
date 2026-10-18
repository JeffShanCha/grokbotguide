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
const readingEdition=JSON.parse(await readFile(new URL('../data/collection/editions/2026-10-18-langeai-reading.json',import.meta.url),'utf8'));
assert(readingEdition.finalized,'Reading collection must be finalized before release.');
assert.equal(readingEdition.articles.length,24,'All 24 source mappings must be present.');
assert.equal(new Set(readingEdition.articles.map(item=>item.source_url)).size,24,'Reading sources must be distinct.');
assert.equal(readingEdition.articles.reduce((sum,item)=>sum+item.photos_viewed,0),245,'All photo coverage must be reconciled.');
const videoEdition=JSON.parse(await readFile(new URL('../data/collection/editions/2026-10-18-langeai-video-supplement.json',import.meta.url),'utf8'));
assert(videoEdition.finalized,'Video supplement must be finalized before release.');
assert.equal(videoEdition.video_records.length,6,'All six original videos need an individual reading record.');
assert.deepEqual(new Set(videoEdition.video_records.map(video=>video.media_key)),new Set(['13_2099918614094884864','13_2109198914998169600','13_2097483410847719426','13_2097484193081196544','13_2109649833992855552','13_2101549386958245888']),'Video identities must match the six outstanding media.');
assert.equal(readingEdition.articles.reduce((sum,item)=>sum+item.videos_sampled,0),6,'Sampled reviews must be reconciled.');
assert.equal(readingEdition.articles.reduce((sum,item)=>sum+item.videos_unreviewed,0),0,'Untouched videos must not be silently omitted.');
assert.equal(readingEdition.articles.reduce((sum,item)=>sum+item.videos_continuously_watched,0),0,'Do not upgrade sampled review to continuous viewing.');
assert.equal(videoEdition.video_records.filter(video=>video.audio.has_track).length,5,'Audio-track reconciliation changed.');
assert.equal(videoEdition.video_records.filter(video=>video.audio.status==='audio_present_no_speech_recognized').length,1,'Uncertain Feishu audio must remain explicit.');
assert.equal(new Set(videoEdition.video_records.flatMap(video=>video.method_ids)).size,2,'Retain two video methods without duplicating phone or background evidence.');
for(const video of videoEdition.video_records){
 const item=readingEdition.articles.find(item=>item.resource_id===video.resource_id);
 assert(item&&item.path===video.path&&item.source_url===video.source_url,`Video assigned to wrong guide: ${video.media_key}`);
 assert.equal(video.review_method,'sampled_visual_review');
 assert.equal(video.continuous_viewing,false);
 assert.equal(video.coverage.starts_at_s,0);
 assert.equal(video.coverage.ends_at_s,video.duration_s);
 assert(video.coverage.first_and_last_frame_reviewed&&video.coverage.max_viewed_gap_s<=1.23,`Incomplete sampling record: ${video.media_key}`);
 assert.equal(video.audio.human_listening,false);
 assert.equal(video.execution_status,'not_tested');
 const page=pages.get(`/en/${video.path}/`);
 assert(page&&find(page.tree,n=>n.tagName==='h2'&&text(n).startsWith('Video supplement:')).length,`Missing video supplement: ${video.path}`);
 assert(text(page.tree).includes('Video verification scope'),`Missing video limitations: ${video.path}`);
}
const sourceEdition=JSON.parse(await readFile(new URL('../data/collection/editions/2026-10-18-langeai-source-audio.json',import.meta.url),'utf8'));
assert(sourceEdition.finalized,'Source/audio follow-up must be finalized.');
assert.equal(sourceEdition.targets.length,4,'Keep all four requested source/audio targets explicit.');
assert.equal(sourceEdition.targets.filter(item=>item.repository).length,2,'Do not replace unavailable originals with similar repositories.');
for(const target of sourceEdition.targets){
 const page=pages.get(`/en/${target.path}/`);assert(page,`Missing source follow-up destination: ${target.path}`);
 assert.equal(target.execution_status,'not_tested','Static source reading must not become a live reproduction.');
 assert(linkSource(page.tree,target.source_url),`Missing original source for follow-up: ${target.path}`);
 if(target.repository){
  assert(/^[a-f0-9]{40}$/.test(target.repository.commit),'Source links need a pinned commit.');
  assert(target.files.some(file=>file.url.includes(target.repository.commit)&&linkSource(page.tree,file.url)),`Missing pinned source link: ${target.path}`);
  assert(text(page.tree).includes('Source verification status'),`Missing static-review limits: ${target.path}`);
 }
}
function linkSource(tree,url){return find(tree,node=>node.tagName==='a'&&attr(node,'href')===url).length>0;}
const publisherSource=sourceEdition.targets.find(item=>item.article_id==='a08');
assert.equal(publisherSource.repository.recording_commit_verified,false,'Author repository is not proof of the recording commit.');
assert.equal(sourceEdition.targets.find(item=>item.article_id==='a20').repository.standalone_collector_script,false,'Readable instructions must not be called a standalone collector.');
assert.equal(sourceEdition.targets.find(item=>item.article_id==='a24').status,'original_script_and_cases_not_obtained');
const audioFollowup=sourceEdition.targets.find(item=>item.article_id==='a10').audio;
assert.equal(audioFollowup.human_listening,false);assert.equal(audioFollowup.speech_or_music_confirmed,false);assert.equal(audioFollowup.new_audio_derived_steps,0);
for(const item of readingEdition.articles){
 const path=`/en/${item.path}/`,page=pages.get(path);
 assert(page,`Missing rewritten guide: ${path}`);
 assert(find(page.tree,n=>n.tagName==='h2').length>=6,`Incomplete guide: ${path}`);
 assert(find(page.tree,n=>attr(n,'class')?.split(' ').includes('gbg-tpl')).length>=2,`Missing task and review prompts: ${path}`);
 assert(find(page.tree,n=>n.tagName==='a'&&attr(n,'href')===item.source_url).length,`Missing original source: ${path}`);
 const resources=pages.get('/en/resources/').tree;
 const rows=find(resources,n=>attr(n,'data-resource-row')!==undefined&&find(n,c=>c.tagName==='a'&&attr(c,'href')===item.source_url).length);
 assert.equal(rows.length,1,`Missing or repeated reading resource: ${item.source_url}`);
 assert(find(rows[0],n=>n.tagName==='a'&&attr(n,'href')===path).length,`Missing resource-to-guide link: ${path}`);
}
const supplements=new Set(['/en/recipes/usage-audit/',...readingEdition.articles.filter(item=>item.section==='recipes').map(item=>`/en/${item.path}/`)]);
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
