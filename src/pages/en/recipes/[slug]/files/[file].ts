import type { APIRoute } from 'astro';
import { workflowGuides, caseSlug } from '~/data/workflow-en';
import { getOfficeDownloads } from '~/data/workflow-en/gmail';

export function getStaticPaths() {
	return [
		...Object.entries(getOfficeDownloads()).map(([file, data]) => ({ params: { slug: 'gmail-inbox-triage', file }, props: data })),
		...workflowGuides.flatMap(guide => guide.files.map(file => ({ params: { slug: caseSlug(guide), file: file.name }, props: file }))),
	];
}

export const GET: APIRoute = ({ params, props }) => new Response(props.content, {
	headers: {
		'Content-Type': props.mime,
		'Content-Disposition': `${props.inline ? 'inline' : 'attachment'}; filename="${params.file}"`,
		'X-Robots-Tag': 'noindex, nofollow',
	},
});
