import { dencrypt, encrypt } from '$lib/functions/encoder.js';
import { createSession, sessionDestroy } from '$lib/server/models/session.models.js';
import { json } from '@sveltejs/kit';

export const GET = async ({ cookies, locals }) => {
	let user = locals.user.id;
	let session = cookies.get('session');

	let destroryResponse = await sessionDestroy({ user, session });
	cookies.delete('session', { path: '/', secure: false });

	locals.user = { avatar: null, email: null, id: null, username: null };

	return json(destroryResponse);
};
