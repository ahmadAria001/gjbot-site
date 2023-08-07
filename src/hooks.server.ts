import { JWT_SECRETS_ACCESS } from '$env/static/private';
import { dencrypt, tryParse } from '$lib/functions/encoder';

import { authEmail } from '$lib/server/models/auth.models';
import { redirect, type Handle, type Cookies } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';

export const handle: Handle = async ({ event, resolve }) => {
	const AuthorizationToken = event.cookies.get('AuthorizationToken') || '';

	if (event.locals.isInit == undefined) event.locals.isInit = false;

	if (!event.locals.isInit || event.locals.isInit == undefined) {
		event.locals.user = {
			avatar: null,
			email: null,
			id: null,
			username: null,
			banner: null,
			banner_color: null
		};

		event.locals.isInit = true;
	}

	if (AuthorizationToken && event.cookies.getAll().length > 0) {
		if (!event.cookies.getAll().some((val) => val.name == '_IOF')) {
			destroyCookies(event.cookies);

			throw redirect(303, '/signin');
		}

		if (!tryParse(event.cookies.get('_IOF') ?? '')) {
			destroyCookies(event.cookies);
			throw redirect(303, '/signin');
		}

		let iof = dencrypt(event.cookies.get('_IOF') ?? '');

		if (iof != 'isFromLogin') {
			destroyCookies(event.cookies);

			throw redirect(303, '/signin');
		}

		const token = AuthorizationToken.split(' ')[1];

		try {
			const jwtUser = jwt.verify(token, JWT_SECRETS_ACCESS);
			if (typeof jwtUser === 'string') {
				throw new Error('Something went wrong');
			}

			const authRes = await authEmail({ email: jwtUser.email, id: jwtUser.id });

			if (authRes.err) {
				destroyCookies(event.cookies);
				throw redirect(303, '/signin');
			}

			event.locals.user = {
				avatar: authRes.user.avatar,
				email: authRes.user.email,
				username: authRes.user.username,
				id: authRes.user.id,
				banner: authRes.user.banner,
				banner_color: authRes.user.banner_color
			};
		} catch (error) {
			destroyCookies(event.cookies);

			console.error(error);
			throw redirect(303, '/signin');
		}
	}

	return resolve(event);
};

const destroyCookies = (cookies: Cookies) => {
	cookies.getAll().map((val) => {
		cookies.delete(val.name, { path: '/', secure: false });
	});
};
