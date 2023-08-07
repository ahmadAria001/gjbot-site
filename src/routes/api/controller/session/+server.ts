import { encrypt } from '$lib/functions/encoder.js';
import jwt from 'jsonwebtoken';
import { json } from '@sveltejs/kit';
import { JWT_SECRETS_ACCESS } from '$env/static/private';

export const POST = async ({ request, cookies, locals, url }) => {
	if (!['localhost', '192.168.0.122'].includes(url.hostname)) {
		return json({ stat: 403, message: 'Forbidden' });
	}

	let body = await request.json();

	let token = jwt.sign(body, JWT_SECRETS_ACCESS, {
		expiresIn: '1d'
	});

	// let sessionId = token;

	cookies.set('AuthorizationToken', `Bearer ${token}`, {
		secure: false,
		maxAge: 60 * 60 * 24,
		path: '/',
		httpOnly: true,
		sameSite: 'strict'
	});
	cookies.set('_IOF', encrypt('isFromLogin'), {
		secure: false,
		maxAge: 60 * 60 * 24,
		path: '/',
		httpOnly: true,
		sameSite: 'strict'
	});

	locals.user = {
		avatar: body.avatar,
		email: body.email,
		id: body.id,
		username: body.username,
		banner: body.banner,
		banner_color: body.banner_color
	};

	return json({ stat: 200, message: 'Completed' });
};
