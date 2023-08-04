import { encrypt } from '$lib/functions/encoder.js';
import { createSession } from '$lib/server/models/session.models.js';
import { json } from '@sveltejs/kit';

export const POST = async ({ request, cookies, locals }) => {
	let body = await request.json();

	let stringBody = JSON.stringify(body);
	let encryptedBody = encrypt(stringBody);

	let sessionData = await createSession({
		id: body.id,
		expire: body.expire,
		session: encryptedBody
	});

	let sessionId = sessionData?.session_id;

	cookies.set('session', sessionId!, {
		secure: false,
		expires: new Date(body.expire),
		path: '/',
		httpOnly: true,
		sameSite: 'strict'
	});

	locals.user = { avatar: body.avatar, email: body.email, id: body.id, username: body.username };

	return json({ stat: 200, message: 'Completed' });
};
