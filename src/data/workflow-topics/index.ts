import { contentTopic } from './content.ts';
import { engineeringTopic } from './engineering.ts';
import { supportTopic } from './support.ts';
import { purchasingTopic } from './purchasing.ts';
import { additionalGuides } from './cases/index.ts';

export const workflowTopics = [contentTopic, engineeringTopic, supportTopic, purchasingTopic];
export const workflowGuides = [...workflowTopics, ...additionalGuides];
export * from './types.ts';
