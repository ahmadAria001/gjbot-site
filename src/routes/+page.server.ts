export const load = async ({ locals }) => {
	if (locals.user.email != null) {
		return { isAuth: true };
	}
	return { isAuth: false };
};
