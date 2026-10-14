/** Redirect the www hostname to the canonical domain, preserving path and query. */
export default {
	fetch(request: Request): Response {
		const url = new URL(request.url);
		url.protocol = 'https:';
		url.hostname = 'grokbotguide.ai';
		url.port = '';
		return Response.redirect(url.toString(), 301);
	},
} satisfies ExportedHandler;
