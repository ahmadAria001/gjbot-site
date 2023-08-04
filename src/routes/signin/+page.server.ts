import { authUser } from '$lib/server/models/auth.models.js';

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

		let content = JSON.stringify(user);

		let response = await fetch('/api/controller/session', { method: 'POST', body: content });
		let result = await response.json();

		return { signedIn: true, message: null };
	},
	signout: async ({ request, fetch }) => {
		let response = await fetch('/api/controller/session/destroy', { method: 'GET' });
		let jsoned = await response.json();

		console.log(jsoned);

		return { signedOut: true };
	}
};
