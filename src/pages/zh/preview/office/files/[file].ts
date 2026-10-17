import type { APIRoute } from 'astro';
import { getOfficeDownloads } from '~/data/office-preview';

export function getStaticPaths() {
	if (!import.meta.env.DEV) return [];
	return Object.entries(getOfficeDownloads()).map(([file, data]) => ({ params: { file }, props: data }));
}

export const GET: APIRoute = ({ params, props }) => new Response(props.content, {
	headers: {
		'Content-Type': props.mime,
		'Content-Disposition': `attachment; filename="${params.file}"`,
		'X-Robots-Tag': 'noindex, nofollow',
	},
});
