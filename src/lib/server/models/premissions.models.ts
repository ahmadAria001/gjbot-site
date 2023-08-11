import type { ObjectId } from 'mongodb';
import { client } from '../database/db';

interface permsIn {
	name: string;
	code: number;
	creator: ObjectId;
}
interface permsInUp {
	_id: ObjectId;
	name: string;
	code: number;
	updater: ObjectId;
}
interface permsOut {
	status: number;
	message: string | null;
}

export const getAllPerm = async () => {
	const errMes = 'Cannot find the Permissions';
	let result = { status: 200, message: errMes || null, content: [''] };
	result.content.pop();

	let filter = [{ is_deleted: false }, { is_deleted: false, name: { $ne: 'Administrator' } }];

	const con = client;
	await con.connect();

	for (let i = 0; i < 5; i++) {
		try {
			let collections = con.db('discordBot').collection('permissions');
			// let perms = await collections.find({ is_deleted: false }).toArray();
			let perms = await collections
				.aggregate([
					{ $match: { is_deleted: false } },
					{
						$sort: {
							created_at: 1
						}
					},
					{
						$lookup: {
							from: 'website',
							localField: 'creator',
							foreignField: '_id',
							as: 'creators'
						}
					},
					{
						$lookup: {
							from: 'website',
							localField: 'updated_by',
							foreignField: '_id',
							as: 'updaters'
						}
					},
					{
						$group: {
							_id: '$_id',
							code: {
								$first: '$code'
							},
							name: {
								$first: '$name'
							},
							creator: {
								$first: '$creators.accounts.discord.userName'
							},
							created_at: {
								$first: '$created_at'
							},
							deleted_at: {
								$first: '$deleted_at'
							},
							deleted_by: {
								$first: '$deleted_by'
							},
							is_deleted: {
								$first: '$is_deleted'
							},
							updated_at: {
								$first: '$updated_at'
							},
							updated_by: {
								$first: '$updaters.accounts.discord.userName'
							}
						}
					},
					{
						$unwind: {
							path: '$creator',
							includeArrayIndex: 'string',
							preserveNullAndEmptyArrays: true
						}
					},
					{
						$unwind: {
							path: '$updated_by',
							includeArrayIndex: 'string',
							preserveNullAndEmptyArrays: true
						}
					},
					{
						$project: {
							_id: 1,
							code: 1,
							name: 1,
							creator: 1,
							created_at: 1,
							deleted_at: 1,
							deleted_by: 1,
							is_deleted: 1,
							updated_at: 1,
							updated_by: 1
						}
					}
				])
				.toArray();

			if (perms.length > 0) {
				perms.map((val: any) => {
					result.content.push(val);
				});

				result.message = null!;
				break;
			}

			if (perms.length < 1) {
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

export const createPerm = async (roleInput: permsIn) => {
	const errMes = 'Permissions is already exist';
	let result: permsOut = { status: 200, message: errMes };
	let { name, code, creator } = roleInput;

	const con = client;
	await con.connect();

	for (let i = 0; i < 5; i++) {
		try {
			let collections = con.db('discordBot').collection('permissions');
			let permName = await collections.find({ name: name.toUpperCase() }).toArray();
			let permCode = await collections.find({ code: code }).toArray();

			if (permName.length > 0) {
				result.status = 400;
				break;
			}
			if (permCode.length > 0) {
				result.status = 400;
				break;
			}

			let isIn = await collections.insertOne({
				name: name.toUpperCase(),
				code: code,
				created_at: Date.now(),
				creator: creator,
				updated_at: 0,
				updated_by: null,
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

export const updatePerm = async (roleInput: permsInUp) => {
	let { _id, code, name, updater } = roleInput;

	const errMes = 'Permissions is already exist';
	let result: permsOut = { status: 200, message: errMes };

	const con = client;
	await con.connect();

	for (let i = 0; i < 5; i++) {
		try {
			let collections = con.db('discordBot').collection('permissions');
			let perm = await collections.findOne({ _id: _id, is_deleted: false });

			if (perm == undefined || perm == null) {
				result.status = 400;
				break;
			}

			let isUp = await collections.updateOne(
				{ _id: _id, is_deleted: false },
				{
					$set: {
						name: name.toUpperCase(),
						code: code,
						updated_at: Date.now(),
						updated_by: updater
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
export const deletPerm = async (_id: ObjectId, userId: ObjectId) => {
	const errMes = 'Permissions is already exist';
	let result: permsOut = { status: 200, message: errMes };

	const con = client;
	await con.connect();

	for (let i = 0; i < 5; i++) {
		try {
			let collections = con.db('discordBot').collection('permissions');
			let perm = await collections.findOne({ _id: _id });

			if (perm == undefined || perm == null) {
				result.status = 400;
				break;
			}

			let isDel = await collections.updateOne(
				{ _id: _id },
				{
					$set: {
						is_deleted: true,
						deleted_at: Date.now(),
						deleted_by: userId
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
