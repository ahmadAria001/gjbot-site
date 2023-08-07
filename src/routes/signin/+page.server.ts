import { authUser } from '$lib/server/models/auth.models.js';
import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	if (locals.user.id != null || locals.user.id != undefined) {
		throw redirect(303, '/');
	}
};

export const actions = {
	signin: async ({ request, fetch, cookies }) => {
		const data = await request.formData();
		const email = data.get('email')?.toString();
		const password = data.get('password')?.toString();

		let responseAuth = await authUser({ email: email!, password: password! });

		let { err, errMessage, isNew, user } = responseAuth;

		if (err) {
			console.error(errMessage);
			return { signedIn: false, message: errMessage };
		}

		let response = await fetch('/api/controller/session', {
			method: 'POST',
			body: JSON.stringify(user)
		});
		let result = await response.json();

		return { signedIn: true, message: null };
	},
	signout: async ({ request, fetch }) => {
		let response = await fetch('/api/controller/session/destroy', { method: 'GET' });
		let jsoned = await response.json();

		return { signedOut: true };
	}
};
