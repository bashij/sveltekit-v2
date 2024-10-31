import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
	console.log('Start slow request');
	await new Promise<void>((resolve) => setTimeout(resolve, 5000));
	console.log('End slow request');
	return new Response('This is a slow request');
};
