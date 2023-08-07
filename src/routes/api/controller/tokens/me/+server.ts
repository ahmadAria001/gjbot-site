import { getCurrentToken } from '$lib/server/models/tokens.models.js';
import { json } from '@sveltejs/kit';

export const POST = async ({ request, url, locals }) => {
	if (!['localhost', '192.168.0.122'].includes(url.hostname))
		return json({ stat: 403, content: 'Forbidden' });

	if (locals.user.id == null) return json({ stat: 401, content: 'Unauthorized' });

	let body = await request.json();

	let result = await getCurrentToken(body.id);

	if (result.value == undefined) return json({ stat: 404, content: null });

	return json({ stat: 200, content: result.value.interactions });
};
