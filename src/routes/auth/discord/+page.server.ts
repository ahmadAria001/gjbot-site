import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	if (locals.user.id != null) {
		throw redirect(303, '/');
	}
};
