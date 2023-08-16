import type { ObjectId } from 'mongodb';
import { client } from '../database/db';

interface returnData {
	status: 200 | 400;
	message: string | null;
	content: any[] | null;
}

export const getRolesAccess = async (pageId: ObjectId) => {
	let con = client;
	await con.connect();

	let errMes = 'Something went wrong';

	let result: returnData = { status: 200, message: errMes || null, content: null };

	for (let i = 0; i < 5; i++) {
		try {
			let collections = con.db('discordBot').collection('PageAccessRoles');
			let accessData = await collections.find({ _id: pageId }).toArray();

			result.content = accessData;
			result.message = null!;

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
export const getUserAccess = async (pageId: ObjectId) => {
	let con = client;
	await con.connect();

	let errMes = 'Something went wrong';

	let result: returnData = { status: 200, message: errMes || null, content: null };

	for (let i = 0; i < 5; i++) {
		try {
			let collections = con.db('discordBot').collection('PageAccessUser');
			let accessData = await collections.find({ _id: pageId }).toArray();

			result.content = accessData;
			result.message = null!;

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
