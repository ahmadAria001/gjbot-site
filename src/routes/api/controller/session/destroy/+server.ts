import { dencrypt, encrypt } from '$lib/functions/encoder.js';
import { createSession, sessionDestroy } from '$lib/server/models/session.models.js';
import { json } from '@sveltejs/kit';

export const GET = async ({ cookies, locals, url }) => {
	if (!['localhost', '192.168.0.122'].includes(url.hostname)) {
		return json({
			err: true,
			errMessage: 'Forbidden',
			isSuccess: false
		});
	}

	let user = locals.user.id;
	let session = cookies.get('session');

	let destroryResponse = await sessionDestroy({ user, session });
	cookies.getAll().map((val) => {
		cookies.delete(val.name, { path: '/', secure: false });
	});
	// cookies.delete('AuthorizationToken', { path: '/', secure: false });

	locals.user = {
		avatar: null,
		email: null,
		id: null,
		username: null,
		banner: null,
		banner_color: null
	};

	return json(destroryResponse);
};
