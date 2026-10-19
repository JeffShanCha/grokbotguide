import records from './case-governance.json';

type LocalizedText = { zh: string; en: string };
export interface CaseGovernance {
	format?: 'workflow' | 'handbook';
	updatedOn: string;
	boundaries: { automatic: LocalizedText; confirmation: LocalizedText; takeover: LocalizedText };
	documentation: {
		status?: 'unverified' | 'recorded' | 'partial' | 'verified';
		checkedOn: string | null; note: LocalizedText; evidenceUrl?: string;
	};
	execution: {
		status: 'unverified' | 'partial' | 'verified'; verifiedOn: string | null; note: LocalizedText;
		lastAttemptOn?: string;
		evidenceUrl?: string; auditUrl?: string;
	};
}

export function getCaseGovernance(slug: string): CaseGovernance {
	const record = (records as Record<string, CaseGovernance>)[slug];
	if (!record) throw new Error(`Missing case boundaries and verification record: ${slug}`);
	return record;
}
