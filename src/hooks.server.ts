import type { Handle } from '@sveltejs/kit';
import { client, testConnection } from '$lib/server/database/db';
import { dencrypt } from '$lib/functions/encoder';
import { page } from '$app/stores';

export const handle: Handle = async ({ event, resolve }) => {
	if (!event.locals.isInit) {
		let testCon = await testConnection();
		event.locals.user = {
			avatar: null,
			email: null,
			id: null,
			username: null
		};
		event.locals.isInit = testCon.isSucces == true;
	}

	console.log(`IsInit: ${event.locals.isInit}`);

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

	return resolve(event);
};
