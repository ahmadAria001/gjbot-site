import { authEmail } from '$lib/server/models/auth.models.js';
import { changePassword, getUser } from '$lib/server/models/user.models.js';
import { redirect } from '@sveltejs/kit';

export const load = async ({ cookies, locals }) => {
	if (locals.user.id == null) throw redirect(303, '/signin');

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

		let responseUser = await getUser(locals.user.id!, locals.user.email!);
		if (responseUser.status === 400) {
			return {
				status: responseUser.status,
				message: responseUser.message
			};
		}

		let user = responseUser.content;

		let isChanged = await changePassword({
			id: user._id!,
			password: password!
		});

		if (isChanged.status != 400) {
			throw redirect(302, '/');
		}

		return isChanged.status == 400 ? { updated: true } : { updated: false };
	}
};
