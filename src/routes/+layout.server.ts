export const load = async ({ locals }) => {
	if (locals.user.email != null) {
		return { username: locals.user.username, avatar: locals.user.avatar, id: locals.user.id };
	}
	return { username: null, avatar: null, id: null };
};
