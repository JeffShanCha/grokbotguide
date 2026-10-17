type TutorialEntry=(typeof import('../data/workflow-topics/catalog.ts'))['caseCatalog'][number];

// Both language editions keep the original recipe addresses and resolve metadata
// from the complete tutorials rather than the retained Markdown stubs.
export async function localRecipeNavigation(lang:string){
 if(lang==='zh'||lang==='en'){
  const {caseCatalog,caseBySlug}=lang==='zh'?await import('../data/workflow-topics/catalog.ts'):await import('../data/workflow-en/catalog.ts');
  const pattern=new RegExp(`^/?${lang}/recipes/([^/?#]+)/?$`);
  const entryForId=(id:string):TutorialEntry|undefined=>{const match=id.match(pattern);return match?caseBySlug.get(match[1]):undefined;};
  return {enabled:true,total:caseCatalog.length,overviewHref:`/${lang}/recipes/topics/#all-cases`,entryForId,href:(href:string)=>entryForId(href)?.href||href};
 }
 return {enabled:false,total:0,overviewHref:'',entryForId:(_id:string):TutorialEntry|undefined=>undefined,href:(href:string)=>href};
}
