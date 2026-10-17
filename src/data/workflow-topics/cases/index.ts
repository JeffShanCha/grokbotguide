import { officeGuides } from './office.ts';
import { contentGuides } from './content.ts';
import { engineeringGuides } from './engineering.ts';
import { supportPurchasingGuides } from './support-purchasing.ts';
export const additionalGuides = [...officeGuides, ...contentGuides, ...engineeringGuides, ...supportPurchasingGuides];
