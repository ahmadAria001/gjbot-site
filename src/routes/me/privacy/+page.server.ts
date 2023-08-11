import { verifPassword } from '$lib/server/models/auth.models.js';
import { changePassword } from '$lib/server/models/user.models.js';

export const actions = {
	default: async ({ request, fetch, locals }) => {
		const data = await request.formData();
		const current = data.get('currentPassword')?.toString();
		const newPas = data.get('password')?.toString();
		const confirmPas = data.get('confirmPassword')?.toString();

		const response = await verifPassword(locals.user.email!, locals.user.id!, current!);

		if (response.status == 400) {
			return { status: 400, message: response.message };
		}

		let responseChange = await changePassword({ id: response._id!, password: newPas! });

		if (responseChange.status == 400) {
			return { status: 400, message: responseChange.message };
		}

		return { status: 200, message: null };
	}
};
