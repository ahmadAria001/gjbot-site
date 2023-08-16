import { getAllPerm } from '$lib/server/models/premissions.models.js';
import {
	createRole,
	deletRole,
	getAllRoles,
	getRoles,
	updateRole
} from '$lib/server/models/roles.models.js';
import { getUser } from '$lib/server/models/user.models.js';
import { redirect } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';

export const load = async ({ locals }) => {
	if (locals.user.id === null) throw redirect(303, '/signin');
	let parsedPerms: any = [];

	let roleClaim = (await getRoles(locals.user.id!)).content;
	// name: val.name,
	// cls: val.class,
	// path: val.path,
	// viewBox: val.viewbox,
	// xmlns: val.xmlns,
	// _id: new ObjectId(val._id!).toString()
	let rolesRespons = await getAllRoles(locals.user.id!, locals.user.email!);
	let roles = rolesRespons.content;

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

	let parsedRole: any[] = [];
	roles.map((val: any) =>
		parsedRole.push({
			name: val.name,
			cls: val.class,
			path: val.path,
			viewBox: val.viewbox,
			xmlns: val.xmlns,
			style: val.style,
			permissions:
				JSON.stringify(val.permissions) == '{}'
					? null
					: val.permissions?.map((value: any) => {
							if (value != undefined)
								return { id: value.id.toString(), name: value.name, code: value.code };
							else return null;
					  }),
			_id: new ObjectId(val._id!).toString()
		})
	);

	return { parsedRole: parsedRole, permissions: parsedPerms };
};

export const actions = {
	create: async ({ request, locals }) => {
		const data = await request.formData();

		const name = data.get('name');
		const xmlns = data.get('xmlns');
		const cls = data.get('class');
		const viewBox = data.get('viewBox');
		const path = data.get('path');
		const style = data.get('style');
		const permissions = data.getAll('permissions');

		let permissionContent: any[] = [];

		permissions.map((val: any) => {
			if (permissionContent.some((value: any) => value == val)) {
				return;
			}

			permissionContent.push(new ObjectId(val));
		});

		let responseUser = await getUser(locals.user.id!, locals.user.email!);
		if (responseUser.status === 400) {
			return {
				status: responseUser.status,
				message: responseUser.message
			};
		}

		let user = responseUser.content;

		let response = await createRole({
			cls: cls?.toString().replaceAll('<', '&lt').replaceAll('>', '&gt')!,
			created_at: Date.now(),
			creator: user._id,
			name: name?.toString().replaceAll('<', '&lt').replaceAll('>', '&gt')!,
			path: path?.toString()!,
			viewbox: viewBox?.toString()!,
			xmlns: xmlns?.toString()!,
			style: style?.toString().replaceAll('<', '&lt').replaceAll('>', '&gt')!,
			permissions: permissionContent
		});

		return {
			status: response.status,
			message: response.message == null ? 'Role created succesfully' : response.message
		};
	},
	update: async ({ request, locals }) => {
		const data = await request.formData();

		const name = data.get('name');
		const xmlns = data.get('xmlns');
		const cls = data.get('class');
		const viewBox = data.get('viewBox');
		const path = data.get('path');
		const style = data.get('style');
		const _id = data.get('_id');
		const permissions = data.getAll('permissions');

		let permissionContent: any[] = [];

		permissions.map((val: any) => {
			if (permissionContent.some((value: any) => value == val)) {
				return;
			}

			permissionContent.push(new ObjectId(val));
		});

		let responseUser = await getUser(locals.user.id!, locals.user.email!);
		if (responseUser.status === 400) {
			return {
				status: responseUser.status,
				message: responseUser.message
			};
		}

		let user = responseUser.content;

		let response = await updateRole(new ObjectId(_id?.toString()), {
			cls: cls?.toString().replaceAll('<', '&lt').replaceAll('>', '&gt')!,
			updated_at: Date.now(),
			update_by: user._id,
			name: name?.toString().replaceAll('<', '&lt').replaceAll('>', '&gt')!,
			path: path?.toString()!,
			viewbox: viewBox?.toString()!,
			xmlns: xmlns?.toString()!,
			style: style?.toString().replaceAll('<', '&lt').replaceAll('>', '&gt')!,
			permissions: permissionContent
		});

		return {
			status: response.status,
			message: response.message == null ? 'Role updated succesfully' : response.message
		};
	},
	delete: async ({ request, locals }) => {
		const data = await request.formData();
		const _id = data.get('_id')?.toString();

		let responseUser = await getUser(locals.user.id!, locals.user.email!);
		if (responseUser.status === 400) {
			return {
				status: responseUser.status,
				message: responseUser.message
			};
		}

		let user = responseUser.content;

		let response = await deletRole(new ObjectId(_id), {
			deleted_at: Date.now(),
			deleted_by: user._id
		});

		return {
			status: response.status,
			message: response.message == null ? 'Role deleted succesfully' : response.message
		};
	}
};
