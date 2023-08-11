import {
	createPerm,
	deletPerm,
	getAllPerm,
	updatePerm
} from '$lib/server/models/premissions.models.js';
import { getUser, getUserID } from '$lib/server/models/user.models.js';
import { ObjectId } from 'mongodb';

export const load = async ({ locals }) => {
	let parsedPerms: any = [];

	try {
		const response = await getAllPerm();
		const content = response.content;

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
	} catch (error) {
		throw error;
	}

	return { perms: parsedPerms };
};

export const actions = {
	create: async ({ request, locals }) => {
		const data = await request.formData();

		const name = data.get('name')?.toString();
		const code = Number.parseInt(data.get('permcode')?.toString()!);

		if (code < 1) {
			return {
				status: 400,
				message: 'Code should be higher than 0'
			};
		}

		let responseUser = await getUser(locals.user.id!, locals.user.email!);

		if (responseUser.status === 400) {
			return {
				status: responseUser.status,
				message: responseUser.message
			};
		}

		let response = await createPerm({ code: code, creator: responseUser.content._id, name: name! });

		return {
			status: response.status,
			message: response.message == null ? 'Permission created succesfully' : response.message
		};
	},
	update: async ({ request, locals }) => {
		const data = await request.formData();

		const name = data.get('name')?.toString();
		const code = Number.parseInt(data.get('permcode')?.toString()!);
		const _id = data.get('_id')?.toString();

		let responseUser = await getUser(locals.user.id!, locals.user.email!);
		if (responseUser.status === 400) {
			return {
				status: responseUser.status,
				message: responseUser.message
			};
		}

		let user = responseUser.content;

		let response = await updatePerm({
			_id: new ObjectId(_id),
			code: code,
			name: name!,
			updater: user._id
		});

		return {
			status: response.status,
			message: response.message == null ? 'Permission updated succesfully' : response.message
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

		let response = await deletPerm(new ObjectId(_id), user._id);

		return {
			status: response.status,
			message: response.message == null ? 'Permissions deleted succesfully' : response.message
		};
	}
};
