import { getTalk } from '$lib/server/models/conversations.models.js';
import { json } from '@sveltejs/kit';

export const POST = async ({ request, locals, url }) => {
	if (!['localhost', '192.168.0.122'].includes(url.hostname))
		return json({ content: null, isErr: true, message: 'Forbidden' });

	if (locals.user.id == null) {
		return json({ content: null, isErr: true, message: 'Unauthorized' });
	}
	let body = await request.json();

	let result = await getTalk(body.id);

	return json({ stat: 200, content: result.value, isErr: false, message: null });
};
