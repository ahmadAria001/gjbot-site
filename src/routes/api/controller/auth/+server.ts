import { auth } from '$lib/server/models/auth.models.js';
import { json } from '@sveltejs/kit';

interface userData {
	isErr: boolean | false;
	errMsg: string | null;
	content: string | null;
}

export const POST = async ({ request }) => {
	let params = await request.json();

	let result: userData = {
		isErr: false,
		errMsg: null,
		content: null
	};

	let response = await auth(params);

	if (response.err) {
		result.isErr = true;
		result.errMsg = response.errMessage!;

		return json(result);
	}

	result.content = JSON.stringify(response.user);

	return json(result);
};
