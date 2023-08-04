import type { Handle } from '@sveltejs/kit';
import { dencrypt } from '$lib/functions/encoder';
import { compareHash, toHash } from '$lib/server/functions/hash';

const ALLOWED_PATH = ['/signin', '/', '/auth/discord'];

export const handle: Handle = async ({ event, resolve }) => {
	if (event.locals.isInit == undefined) event.locals.isInit = false;

	if (!event.locals.isInit || event.locals.isInit == undefined) {
		event.locals.user = {
			avatar: null,
			email: null,
			id: null,
			username: null
		};

		event.locals.isInit = true;
	}

	if (event.cookies.getAll().length > 0 && event.locals.user.email == null) {
		let cookiesContent = dencrypt(event.cookies.get('session')!);
		let content;

		if (typeof cookiesContent == 'string') content = JSON.parse(cookiesContent);

		event.locals.user = {
			avatar: content.avatar,
			email: content.email,
			id: content.id,
			username: content.username
		};
	}

	if (event.cookies.getAll().length < 1 && !ALLOWED_PATH.includes(event.url.pathname)) {
		if (
			(event.locals.user == undefined && !ALLOWED_PATH.includes(event.url.pathname)) ||
			(event.locals.user.id == null && !ALLOWED_PATH.includes(event.url.pathname))
		) {
			// return Response.redirect(event.url.host + '/signin');
			return new Response('Redirect', { status: 303, headers: { Location: '/signin' } });
		}
	}

	return resolve(event);
};
