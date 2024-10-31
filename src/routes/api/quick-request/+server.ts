import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
	console.log('Quick request received');
	return new Response('This is a quick request');
};
