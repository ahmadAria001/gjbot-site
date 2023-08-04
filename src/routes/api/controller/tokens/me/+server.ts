import { getCurrentToken } from '$lib/server/models/tokens.models.js';
import { json } from '@sveltejs/kit';

export const POST = async ({ request }) => {
	let body = await request.json();

	let result = await getCurrentToken(body.id);

	if (result.value == undefined) return json({ stat: 200, content: null });
	
    return json({ stat: 200, content: result.value.interactions });
};
