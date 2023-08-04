export const load = async ({ locals, url }) => {
	if (locals.user.email != null) {
		return {
			username: locals.user.username,
			avatar: locals.user.avatar,
			id: locals.user.id,
			URL: url.pathname
		};
	}
	return { username: null, avatar: null, id: null, URL: url.pathname };
};
