export const load = async ({ locals }) => {
	const cdnLink = 'https://cdn.discordapp.com';
	let bannerUrl = '';
	if (locals.user.banner != null)
		bannerUrl = `${cdnLink}/banners/${locals.user.id}/${locals.user.banner}.gif?size=4096`;

	let profilePict = `${cdnLink}/avatars/${locals.user.id}/${locals.user.avatar}.png?size=4096`;

	return {
		email: locals.user.email,
		banner: bannerUrl,
		bannerColor: locals.user.banner_color,
		profilePict: profilePict
	};
};
