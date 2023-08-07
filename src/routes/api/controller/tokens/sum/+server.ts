import { getTalk } from '$lib/server/models/conversations.models.js';
import { json } from '@sveltejs/kit';

export const POST = async ({ request, url, locals }) => {
	if (!['localhost', '192.168.0.122'].includes(url.hostname)) return json({ stat: 403, content: null });

	if (locals.user.id == null) return json({ stat: 401, content: null });

	let body = await request.json();

	let result = await getTalk(body.id);

	let tokenData = [
		{ month: 'Jan', token: 0 },
		{ month: 'Feb', token: 0 },
		{ month: 'May', token: 0 },
		{ month: 'Apr', token: 0 },
		{ month: 'Mei', token: 0 },
		{ month: 'Jun', token: 0 },
		{ month: 'Jul', token: 0 },
		{ month: 'Aug', token: 0 },
		{ month: 'Sep', token: 0 },
		{ month: 'Oct', token: 0 },
		{ month: 'Nov', token: 0 },
		{ month: 'Des', token: 0 }
	];

	if (result.value != null) {
		result.value.map((value: any) => {
			if (
				value.sender == 'system' &&
				new Date(value.created_at).getFullYear() === new Date(Date.now()).getFullYear()
			) {
				tokenData[new Date(value.created_at).getMonth() - 1].token += value.token;
			}
		});
	}

	return json({ stat: 200, content: tokenData });
};
