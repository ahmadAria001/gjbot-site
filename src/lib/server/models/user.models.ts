import type { ObjectId } from 'mongodb';
import { client } from '../database/db';
import { toHash } from '../functions/hash';

interface payloadPasswordChange {
	id: ObjectId;
	password: string;
}
interface userResponse {
	status: number;
	message: string | null;
	content: any;
}

export const changePassword = async (payload: payloadPasswordChange) => {
	let { id, password } = payload;

	const errMes = 'Current password are incorrect';
	let result = { status: 200, message: errMes || null };

	const con = client;
	await con.connect();

	for (let i = 0; i < 5; i++) {
		try {
			let collections = con.db('discordBot').collection('website');
			let user = await collections.findOne({
				_id: id
			});

			if (user == null) {
				result.status = 400;
				result.message = 'Cannot find account';
				break;
			}

			let updated = await collections.updateOne(
				{ _id: id },
				{
					$set: {
						password: (await toHash(password)).toString()
					}
				}
			);

			if (updated.modifiedCount == 1) {
				result.message = null!;
			}
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
export const getUser = async (id: string, email: string) => {
	const errMes = 'Cannot find account';
	let result: userResponse = { status: 200, message: errMes || null, content: '' };

	const con = client;
	await con.connect();

	for (let i = 0; i < 5; i++) {
		try {
			let collections = con.db('discordBot').collection('website');
			let user = await collections.findOne({
				'accounts.discord.userId': id,
				'accounts.discord.email': email
			});

			if (user == null) {
				result.status = 400;
				break;
			}

			result.content = user;
			result.message = null;
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
export const getUserID = async (id: ObjectId) => {
	const errMes = 'Cannot find account';
	let result: userResponse = { status: 200, message: errMes || null, content: '' };

	const con = client;
	await con.connect();

	for (let i = 0; i < 5; i++) {
		try {
			let collections = con.db('discordBot').collection('website');
			let user = await collections.findOne({
				_id: id
			});

			if (user == null) {
				result.status = 400;
				break;
			}

			result.content = user;
			result.message = null;
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
