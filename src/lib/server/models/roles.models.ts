import type { ObjectId } from 'mongodb';
import { client } from '../database/db';
import { getUser } from './user.models';

interface roleInput {
	name: string;
	cls: string;
	path: string;
	viewbox: string;
	xmlns: string;
	style: string;
	created_at: number;
	creator: ObjectId;
}
interface roleUpdate {
	name: string;
	cls: string;
	path: string;
	viewbox: string;
	xmlns: string;
	style: string;
	updated_at: number;
	update_by: ObjectId;
}
interface roleDelete {
	deleted_at: number;
	deleted_by: ObjectId;
}
interface roleOutput {
	status: number;
	message: string | null;
}

export const getRoles = async (id: string) => {
	const errMes = 'Cannot find the User';
	let result = { status: 200, message: errMes || null, content: [''] };
	result.content.pop();

	const con = client;
	await con.connect();

	for (let i = 0; i < 5; i++) {
		try {
			let collections = con.db('discordBot').collection('website');
			let user = await collections
				.aggregate([
					{
						$match: {
							'accounts.discord.userId': id
						}
					},
					{
						$lookup: {
							from: 'roles',
							localField: 'roles',
							foreignField: '_id',
							as: 'roles'
						}
					},
					{
						$group: {
							_id: '$accounts.discord.userId',
							uname: {
								$first: '$accounts.discord.userName'
							},
							roles: { $first: '$roles' }
						}
					},
					{
						$project: {
							_id: 1,
							uname: 1,
							roles: 1
						}
					}
				])
				.toArray();

			// console.log(user[0]);

			if (user.length > 0) {
				user[0].roles.map((val: any) => {
					result.content.push(val);
				});

				result.message = null!;
				break;
			}

			if (user.length < 1) {
				result.status = 400;
				result.message = 'Cannot find account';
				break;
			}

			break;
		} catch (error) {
			if (i == 5) {
				result.status = 400;
				result.message = (error as any).message;
				break;
			}

			if (new String((error as any).code || null).includes('ECONN')) {
				console.error(error);
				setTimeout(() => {
					console.error('Timed Out by Error');
				}, 5000);

				continue;
			}

			if (!new String((error as any).code || null).includes('ECONN')) {
				result.status = 400;
				result.message = (error as any).message;
				break;
			}
		}
	}

	return result;
};
// , permission: any[]
export const getAllRoles = async (id: string, email: string) => {
	const errMes = 'Cannot find the User';
	let result = { status: 200, message: errMes || null, content: [''] };
	result.content.pop();

	let filter = [{ is_deleted: false }, { is_deleted: false, name: { $ne: 'Administrator' } }];

	const con = client;
	await con.connect();

	for (let i = 0; i < 5; i++) {
		try {
			let collections = con.db('discordBot').collection('roles');
			let roles = await collections.find({ is_deleted: false }).toArray();

			if (roles.length > 0) {
				roles.map((val: any) => {
					result.content.push(val);
				});

				result.message = null!;
				break;
			}

			if (roles.length < 1) {
				result.status = 400;
				result.message = 'Cannot find account';
				break;
			}

			break;
		} catch (error) {
			if (i == 5) {
				result.status = 400;
				result.message = (error as any).message;
				break;
			}

			if (new String((error as any).code || null).includes('ECONN')) {
				console.error(error);
				setTimeout(() => {
					console.error('Timed Out by Error');
				}, 5000);

				continue;
			}

			if (!new String((error as any).code || null).includes('ECONN')) {
				result.status = 400;
				result.message = (error as any).message;
				break;
			}
		}
	}

	return result;
};

export const createRole = async (roleInput: roleInput) => {
	const errMes = 'Role is already exist';
	let result: roleOutput = { status: 200, message: errMes };
	let { cls, created_at, creator, name, path, style, viewbox, xmlns } = roleInput;

	const con = client;
	await con.connect();

	for (let i = 0; i < 5; i++) {
		try {
			let collections = con.db('discordBot').collection('roles');
			let roles = await collections.find({ name: roleInput.name }).toArray();

			if (roles.length > 0) {
				result.status = 400;
				break;
			}

			let isIn = await collections.insertOne({
				class: cls,
				created_at: created_at,
				creator: creator,
				name: name,
				path: path,
				viewbox: viewbox,
				xmlns: xmlns,
				style: style,
				deleted_at: 0,
				deleted_by: null,
				is_deleted: false
			});

			result.status = isIn.acknowledged ? 200 : 400;
			result.message = isIn.acknowledged ? null : errMes;
			break;
		} catch (error) {
			if (i == 5) {
				result.status = 400;
				result.message = (error as any).message;
				break;
			}

			if (new String((error as any).code || null).includes('ECONN')) {
				console.error(error);
				setTimeout(() => {
					console.error('Timed Out by Error');
				}, 5000);

				continue;
			}

			if (!new String((error as any).code || null).includes('ECONN')) {
				result.status = 400;
				result.message = (error as any).message;
				break;
			}
		}
	}

	return result;
};
export const updateRole = async (_id: ObjectId, roleInput: roleUpdate) => {
	let { cls, name, path, update_by, updated_at, viewbox, xmlns, style } = roleInput;

	const errMes = 'Role does not exist';
	let result: roleOutput = { status: 200, message: errMes };

	const con = client;
	await con.connect();

	for (let i = 0; i < 5; i++) {
		try {
			let collections = con.db('discordBot').collection('roles');
			let roles = await collections.findOne({ _id: _id, is_deleted: false });

			if (roles == undefined || roles == null) {
				result.status = 400;
				break;
			}

			let isUp = await collections.updateOne(
				{ _id: _id, is_deleted: false },
				{
					$set: {
						name: name,
						viewbox: viewbox,
						xmlns: xmlns,
						updated_at: updated_at,
						update_by: update_by,
						class: cls,
						path: path,
						style: style
					}
				}
			);

			result.status = isUp.modifiedCount > 0 ? 200 : 400;
			result.message = isUp.modifiedCount > 0 ? null : errMes;
			break;
		} catch (error) {
			if (i == 5) {
				result.status = 400;
				result.message = (error as any).message;
				break;
			}

			if (new String((error as any).code || null).includes('ECONN')) {
				console.error(error);
				setTimeout(() => {
					console.error('Timed Out by Error');
				}, 5000);

				continue;
			}

			if (!new String((error as any).code || null).includes('ECONN')) {
				result.status = 400;
				result.message = (error as any).message;
				break;
			}
		}
	}

	return result;
};
export const deletRole = async (_id: ObjectId, roleInput: roleDelete) => {
	let { deleted_at, deleted_by } = roleInput;

	const errMes = 'Role does not exist';
	let result: roleOutput = { status: 200, message: errMes };

	const con = client;
	await con.connect();

	for (let i = 0; i < 5; i++) {
		try {
			let collections = con.db('discordBot').collection('roles');
			let roles = await collections.findOne({ _id: _id });

			if (roles == undefined || roles == null) {
				result.status = 400;
				break;
			}

			let isDel = await collections.updateOne(
				{ _id: _id },
				{
					$set: {
						is_deleted: true,
						deleted_at: deleted_at,
						deleted_by: deleted_by
					}
				}
			);

			result.status = isDel.modifiedCount > 0 ? 200 : 400;
			result.message = isDel.modifiedCount > 0 ? null : errMes;
			break;
		} catch (error) {
			if (i == 5) {
				result.status = 400;
				result.message = (error as any).message;
				break;
			}

			if (new String((error as any).code || null).includes('ECONN')) {
				console.error(error);
				setTimeout(() => {
					console.error('Timed Out by Error');
				}, 5000);

				continue;
			}

			if (!new String((error as any).code || null).includes('ECONN')) {
				result.status = 400;
				result.message = (error as any).message;
				break;
			}
		}
	}

	return result;
};
