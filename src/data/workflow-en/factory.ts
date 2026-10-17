import { workflowGuides as chineseGuides, caseSlug } from '../workflow-topics/index.ts';
import { csv, jsonFile, textFile, type WorkflowGuide, type TopicFile } from '../workflow-topics/types.ts';
export { caseSlug };
export const groups: Record<string, {number:string;title:string;summary:string}> = {
 office:{number:'01',title:'Office & information',summary:'Turn emails, calendars, documents, conversations and spoken requests into work you can review.'},
 'content-growth':{number:'02',title:'Content & growth',summary:'Create drafts with traceable facts, record audience changes, and review campaigns with consistent metrics.'},
 engineering:{number:'03',title:'Development & site maintenance',summary:'Define small implementation tasks, inspect websites and track pull requests with evidence you can check.'},
 'customer-support':{number:'04',title:'Customers & support',summary:'Triage tickets, maintain public profile records and prepare evidence for human decisions.'},
 purchasing:{number:'05',title:'Purchasing & receipts',summary:'Compare equivalent offers, preserve original receipts and keep currencies and exceptions separate.'},
};
export const topicHref = (guide: {id:string}) => `/en/recipes/topics/${guide.id}/`;
export const guideHref = (guide: Pick<WorkflowGuide,'id'|'guideSlug'|'caseId'>) => `/en/recipes/${caseSlug(guide)}/`;
export const fileHref = (guide: WorkflowGuide,name:string) => `${guideHref(guide)}files/${name}`;
export type Stage = [title:string, explanation:string, prompt:string, expected:string, check:string];
export interface EnglishSpec {
 slug:string; title:string; lead:string; scope:string; input:unknown; rules:string;
 prepare:[string[],string[]]; caption:string; columns:string[]; rows:string[][];
 cards:Array<{title:string;badge:string;body:string}>; report:string; stages:Stage[];
 problems:Array<[string,string]>; verificationNote?:string;
 inputs?:Array<{title:string;body:string}>; files?:TopicFile[]; artifacts?:TopicFile[];
}
const sourceNames:Record<string,[string,string]> = {
 'connected-accounts':['Composio: connected accounts','Verify connected identity and authentication status; target-specific permissions still need separate checks.'],
 'computer-and-apps':['Grok Bot: apps and the shared computer','Check connected accounts, available tools, visibility and user takeover.'],
 'skills-routines-and-automations':['Grok Bot: Skills and Routines','Validate a manual run before saving a method or scheduling it.'],
 'files-and-results':['Grok Bot: files and results','Check uploaded inputs, actual output paths and delivered files.'],
 'chat-and-collaboration':['Grok Bot: chat and collaboration','Check supported conversations and delivery methods; this exercise sends no messages.'],
 'mobile':['Grok Bot: mobile','Compare dictation, voice, attachments and mobile/desktop capabilities; no recording was tested here.'],
 'team-bots':['Grok Bot: Team Bots','Review shared files, credentials, member access and team memory; no Bot was published here.'],
 'tag-on-x':['Grok Bot: tagging on X','Check the public trigger and its limits; this exercise posts nothing on X.'],
 'append':['Google Sheets: append values','Appending does not deduplicate business records. Verify the target range and read back actual writes.'],
 'list':['Official API: list resources','Check identity, filtering, pagination and returned fields. Live account access was not tested in this exercise.'],
 'Metrics':['Google Ads: Metrics','Check source units and conversion definitions; formulas in this exercise use the stated metric contract.'],
 'query-a-data-source':['Notion: query a data source','Inspect schema and existing business keys before writing. No live Notion import was performed here.'],
 'refunds':['Stripe: refunds','Review refund history, partial amounts and status. This tutorial performs no financial actions.'],
 'Status':['MDN: HTTP response status codes','Distinguish successful responses, redirects and errors. The fixture faults are intentionally authored examples.'],
 'endpoints':['Cursor: Cloud Agents API','Check starting state, branches, PR creation and push behavior. No cloud agent was launched here.'],
 'troubleshooting-required-status-checks':['GitHub: required status checks','Associate effective checks with the current commit; the exercise uses synthetic snapshots.'],
 'resolving-reviews':['GitHub: resolving reviews','Review status and automated checks are separate dimensions.'],
 'ticket_comments':['Zendesk: ticket comments','Public replies and internal notes both change ticket records; this exercise submits neither.'],
 'creating-and-updating-tickets':['Zendesk: creating and updating tickets','Review the update operation and current ticket state before any write.'],
 'get':['Gmail API: get message attachments','Identify the exact attachment. This exercise uses text extracts and does not retrieve real attachments.'],
 '8718287-typefully-api':['Typefully: API overview','Review authentication, supported platforms and draft workflows; no API call was made here.'],
 'api':['Typefully: API reference','The request body is an unexecuted example. Check current fields and account capabilities before use.'],
 '2109115005069341175':['LanGe AI: original inspiration on X','Original author attribution is retained. The tutorial and synthetic practice materials were independently written by shancha.'],
};
export function buildEnglish(s:EnglishSpec):WorkflowGuide {
 const original=chineseGuides.find(g=>caseSlug(g)===s.slug);
 if(!original) throw new Error(`Missing Chinese counterpart: ${s.slug}`);
 if(s.stages.length!==original.steps.length) throw new Error(`Stage mismatch: ${s.slug}`);
 const meta=groups[original.id];
 const steps=s.stages.map(([title,explanation,prompt,expected,check],i)=>({id:original.steps[i].id,title,paragraphs:explanation.split('\n\n'),prompt,expected,check}));
 const source={synthetic:true,case:s.slug,data:s.input};
 const prompts=steps.map((step,i)=>`## ${i+1}. ${step.title}\n\n${step.prompt}\n\nExpected: ${step.expected}\nCheck: ${step.check}`).join('\n\n');
 const defaultFiles=[jsonFile('source-data.json','Original practice input','Inputs only; attempt the exercise before opening the reference answers.',source),textFile('workflow-rules.md','Rules and scope','Definitions, exceptions and delivery requirements.',`# ${s.title}\n\n${s.rules}\n\n${s.scope}`),{name:'expected-results.csv',title:'Item-by-item reference results',description:'Compare every input with its outcome.',mime:'text/csv; charset=utf-8',content:csv(s.columns,s.rows)},textFile('reference-report.md','Complete reference report','Results, evidence and missing information.',s.report),textFile('practice-prompts.txt','All stage prompts',`${steps.length} instructions with expected outputs and acceptance checks.`,prompts)];
 const files=s.files ? [...s.files,textFile('practice-prompts.txt','All stage prompts',`${steps.length} instructions with acceptance checks.`,prompts)] : [...defaultFiles,...(s.artifacts||[])];
 if(files.length!==original.files.length) throw new Error(`File count mismatch: ${s.slug}: ${files.length}/${original.files.length}`);
 return {id:original.id,number:meta.number,title:meta.title,eyebrow:'Complete tutorial',summary:s.lead,guideSlug:original.guideSlug,caseId:original.caseId,original:`/en/recipes/${s.slug}/`,guideTitle:s.title,guideLead:s.lead,scope:s.scope,verificationNote:s.verificationNote,
 prepare:[{title:'Start with the practice files',items:s.prepare[0]},{title:'Before using real services',items:s.prepare[1]}],
 lab:{title:s.title.split(':')[0]+' practice',caption:s.caption,input:s.inputs||[{title:'Original synthetic input',body:JSON.stringify(source,null,2)},{title:'Processing rules',body:s.rules}],columns:s.columns,rows:s.rows,cards:s.cards,report:s.report},
 steps,checks:steps.map(step=>step.check),problems:s.problems,
 sources:original.sources.map(src=>{const key=new URL(src.url).pathname.replace(/\/$/,'').split('/').pop()!;const entry=key==='list'&&src.url.includes('calendar')?['Google Calendar: Events list','Check event time boundaries, pagination and returned instances; no live Calendar call was made here.']:key==='list'&&src.url.includes('youtube')?['YouTube: Videos list','Review video identity, snippet and statistics fields; no real channel collection occurred here.']:sourceNames[key];const [title,note]=entry||[new URL(src.url).hostname+' — official reference','Review the linked official source. Live service actions described in this tutorial remain unverified unless explicitly stated.'];return{url:src.url,title,note};}),files};
}
export { csv,jsonFile,textFile };
