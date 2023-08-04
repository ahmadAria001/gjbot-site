import { authEmail } from '$lib/server/models/auth.models.js';
import { changePassword } from '$lib/server/models/user.models.js';
import { redirect } from '@sveltejs/kit';

export const load = async ({ cookies, locals }) => {
	if (cookies.getAll().length < 1) {
		throw redirect(302, '/signin');
	}

	let response = await authEmail({ email: locals.user.email, id: locals.user.id });

	if (response.err) {
		throw redirect(302, '/signin');
	}

	if (response.user.hasOwnProperty('password')) {
		throw redirect(302, '/signin');
	}
};

export const actions = {
	default: async ({ request, locals }) => {
		const data = await request.formData();
		const password = data.get('confirmPassword')?.toString();

		let response = await authEmail({ email: locals.user.email, id: locals.user.id });

		if (response.user.hasOwnProperty('password')) {
			throw redirect(302, '/signin');
		}

		let isChanged = await changePassword({
			email: locals.user.email!,
			id: locals.user.id!,
			password: password!
		});

		if (isChanged.user.id != null) {
			throw redirect(302, '/');
		}

		return isChanged.isNew != false ? { updated: true } : { updated: false };
	}
};
