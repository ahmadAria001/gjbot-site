import { getRolesAccess, getUserAccess } from '$lib/server/models/pageAccess.models.js';
import { getPage, getRoutes } from '$lib/server/models/pages.models.js';
import { getAllPerm } from '$lib/server/models/premissions.models.js';
import { getAllRoles, getRoles } from '$lib/server/models/roles.models.js';
import { findUserExc, getUser, getUserID } from '$lib/server/models/user.models.js';
import { ObjectId } from 'mongodb';

export const load = async ({ params, locals }) => {
	console.log(await getRolesAccess(new ObjectId(params.page_id)));
	console.log(await getUserAccess(new ObjectId(params.page_id)));
	let parsedPerms: any = [];
	let parsedPage: any = [];
	let parsedUsers: any = [];
	let parsedRoles: any = [];

	let pageResponse = await getPage(new ObjectId(params.page_id));
	parsedPage = {
		_id: pageResponse.content._id?.toString(),
		title: pageResponse.content.title,
		path: pageResponse.content.path,
		access: pageResponse.content.access?.toString(),
		update: pageResponse.content.update?.toString(),
		delete: pageResponse.content.delete?.toString(),
		absolute: pageResponse.content.absolute?.toString()
	};

	let permissions = await getAllPerm();
	const content = permissions.content;

	content.map(async (val: any) => {
		parsedPerms.push({
			_id: val._id.toString(),
			name: val.name,
			code: val.code,
			created_by: val.creator,
			created_at: val.created_at,
			updated_by: val.updated_by,
			updated_at: val.updated_at
		});
	});

	const userResponse = await getUser(locals.user.id!, locals.user.email!);
	let userContent = userResponse.content;

	let usersListResponse = await findUserExc(userContent._id);
	let usersList = usersListResponse.content;

	usersList.map(async (val: any) => {
		parsedUsers.push({
			_id: val._id.toString(),
			name: val.accounts.discord.userName
		});
	});

	let rolesListResponse = await getAllRoles(locals.user.id!, locals.user.email!);
	let rolesList = rolesListResponse.content;

	rolesList.map(async (val: any) => {
		parsedRoles.push({
			_id: val._id.toString(),
			name: val.name,
			style: val.style,
			cls: val.class,
			path: val.path,
			viewBox: val.viewbox,
			xmlns: val.xmlns,
			permissions: val.permissions.map((value: any) => {
				return { _id: value.id?.toString(), name: value.name };
			})
		});
	});

	return {
		permissions: parsedPerms,
		pageID: params.page_id,
		pageData: parsedPage,
		users: parsedUsers,
		roles: parsedRoles
	};
};

export const actions = {
	mainPerm: async ({ request, locals }) => {
		const data = await request.formData();
		console.log(data);

		const accPerm = data.get('accessPerm')?.toString();
		const updPerm = data.get('updatePerm')?.toString()!;
		const delPerm = data.get('deletePerm')?.toString()!;
		const _id = data.get('_id')?.toString()!;

		return;
	},
	changePerm: async ({ request, locals }) => {
		const data = await request.formData();
		console.log(data);

		const accPerm = data.get('accessPerm')?.toString();
		const updPerm = data.get('updatePerm')?.toString()!;
		const delPerm = data.get('deletePerm')?.toString()!;
		const _id = data.get('_id')?.toString()!;

		return;
	}
};
