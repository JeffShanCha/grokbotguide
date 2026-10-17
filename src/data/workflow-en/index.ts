import {officeGuides} from './office.ts';
import {contentGuides} from './content.ts';
import {engineeringGuides} from './engineering.ts';
import {supportPurchasingGuides} from './support-purchasing.ts';
import {contentTopic,engineeringTopic,supportTopic,purchasingTopic} from './featured.ts';
export const workflowTopics=[contentTopic,engineeringTopic,supportTopic,purchasingTopic];
export const workflowGuides=[...workflowTopics,...officeGuides,...contentGuides,...engineeringGuides,...supportPurchasingGuides];
export {groups,caseSlug,guideHref,topicHref,fileHref} from './factory.ts';
