import { getTalk } from '$lib/server/models/conversations.models.js';
import { json } from '@sveltejs/kit';

export const POST = async ({ request }) => {
	let body = await request.json();

	let result = await getTalk(body.id);

	return json({ stat: 200, content: result.value });
};
