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

	let roleClaim = (await getRoles(locals.user.id!)).content;
	// name: val.name,
	// cls: val.class,
	// path: val.path,
	// viewBox: val.viewbox,
	// xmlns: val.xmlns,
	// _id: new ObjectId(val._id!).toString()
	let roles = (await getAllRoles(locals.user.id!, locals.user.email!)).content;
	// await getAllRoles();
	let parsedRole: any[] = [];
	roles.map((val: any) =>
		parsedRole.push({
			name: val.name,
			cls: val.class,
			path: val.path,
			viewBox: val.viewbox,
			xmlns: val.xmlns,
			style: val.style,
			_id: new ObjectId(val._id!).toString()
		})
	);

	return { parsedRole };
};

export const actions = {
	create: async ({ request, locals }) => {
		const data = await request.formData();

		const name = data.get('name')?.toString();
		const xmlns = data.get('xmlns')?.toString();
		const cls = data.get('class')?.toString();
		const viewBox = data.get('viewBox')?.toString();
		const path = data.get('path')?.toString();
		const style = data.get('style')?.toString();

		let responseUser = await getUser(locals.user.id!, locals.user.email!);
		if (responseUser.status === 400) {
			return {
				status: responseUser.status,
				message: responseUser.message
			};
		}

		let user = responseUser.content;

		let response = await createRole({
			cls: cls?.replaceAll('<', '&lt').replaceAll('>', '&gt')!,
			created_at: Date.now(),
			creator: user._id,
			name: name?.replaceAll('<', '&lt').replaceAll('>', '&gt')!,
			path: path!,
			viewbox: viewBox!,
			xmlns: xmlns!,
			style: style?.replaceAll('<', '&lt').replaceAll('>', '&gt')!
		});

		return {
			status: response.status,
			message: response.message == null ? 'Role created succesfully' : response.message
		};
	},
	update: async ({ request, locals }) => {
		const data = await request.formData();

		const name = data.get('name')?.toString();
		const xmlns = data.get('xmlns')?.toString();
		const cls = data.get('class')?.toString();
		const viewBox = data.get('viewBox')?.toString();
		const path = data.get('path')?.toString();
		const style = data.get('style')?.toString();
		const _id = data.get('_id')?.toString();

		let responseUser = await getUser(locals.user.id!, locals.user.email!);
		if (responseUser.status === 400) {
			return {
				status: responseUser.status,
				message: responseUser.message
			};
		}

		let user = responseUser.content;

		let response = await updateRole(new ObjectId(_id), {
			cls: cls?.replaceAll('<', '&lt').replaceAll('>', '&gt')!,
			updated_at: Date.now(),
			update_by: user._id,
			name: name?.replaceAll('<', '&lt').replaceAll('>', '&gt')!,
			path: path!,
			viewbox: viewBox!,
			xmlns: xmlns!,
			style: style?.replaceAll('<', '&lt').replaceAll('>', '&gt')!
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
