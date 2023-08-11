import { getRoles } from '$lib/server/models/roles.models.js';
import { redirect } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';

export const load = async ({ locals }) => {
	if (locals.user.id == null) throw redirect(303, '/signin');

	const cdnLink = 'https://cdn.discordapp.com';
	let bannerUrl = '';
	if (locals.user.banner != null)
		bannerUrl = `${cdnLink}/banners/${locals.user.id}/${locals.user.banner}.gif?size=4096`;

	let profilePict = `${cdnLink}/avatars/${locals.user.id}/${locals.user.avatar}.png?size=4096`;

	let roles = (await getRoles(locals.user.id)).content;
	let parsedRole: any[] = [];
	roles.map((val: any) =>
		parsedRole.push({
			name: val.name,
			cls: val.class,
			path: val.path,
			viewBox: val.viewbox,
			xmlns: val.xmlns,
			_id: new ObjectId(val._id!).toString()
		})
	);

	return {
		email: locals.user.email,
		banner: bannerUrl,
		bannerColor: locals.user.banner_color,
		profilePict: profilePict,
		roles: parsedRole,
		isO: locals.user.id === '591622658177630210'
	};
};
