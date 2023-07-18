export const actions = {
	singout: async ({ cookies }) => {
		cookies.delete('session');
	}
};
