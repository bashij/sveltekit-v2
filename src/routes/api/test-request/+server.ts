import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
	const requestId = url.searchParams.get('id') || 'no-id';
	console.log(`Start request ${requestId}`);
	await new Promise<void>((resolve) => setTimeout(resolve, 5000));
	console.log(`End request ${requestId}`);
	return new Response(`Response for request ${requestId}`);
};
