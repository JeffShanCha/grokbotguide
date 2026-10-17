import type { APIRoute } from 'astro';
import { workflowGuides } from '~/data/workflow-topics';

export function getStaticPaths() {
	if (!import.meta.env.DEV) return [];
	return workflowGuides.flatMap(topic => topic.files.map(file => ({ params: { topic: topic.caseId || topic.id, file: file.name }, props: file })));
}

export const GET: APIRoute = ({ params, props }) => new Response(props.content, {
	headers: {
		'Content-Type': props.mime,
		'Content-Disposition': `${props.inline ? 'inline' : 'attachment'}; filename="${params.file}"`,
		'X-Robots-Tag': 'noindex, nofollow',
	},
});
