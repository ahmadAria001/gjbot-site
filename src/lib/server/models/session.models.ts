import { client } from '../database/db';

interface sessionBuilder {
	user: string;
	expired_at: number;
	session_id: string;
	is_destroyed: boolean | false;
}

export const createSession = async (payload: any) => {
	let result = {
		err: true || false,
		errMessage: null || '',
		session_id: null || ''
	};

	let { id, expire, session } = payload;

	const con = client;

	await con.connect();

	let isErr = false;
	let errMsg = '' || null;

	for (let i = 0; i < 5; i++) {
		try {
			let collections = con.db('discordBot').collection('sessions');

			let rawSession = collections
				.find({ user: id })
				.sort({
					expired_at: -1
				})
				.limit(1);
			let arraySession = await rawSession.toArray();

			if (arraySession.length < 1 || arraySession[0].expired_at < Date.now()) {
				await collections.insertOne({
					user: id,
					created_at: Date.now(),
					expired_at: expire,
					session_id: session,
					is_destroyed: false
				});

				result = { err: false, errMessage: null!, session_id: session };
				break;
			}

			result = { err: false, errMessage: null!, session_id: arraySession[0].session_id };
			break;
		} catch (error) {
			if (i == 5) {
				isErr = true;
				errMsg = (error as any).message;
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
				isErr = true;
				errMsg = (error as any).message;
				break;
			}
		}
	}

	if (isErr) {
		result.err = true;
		result.errMessage = errMsg!;
	}

	return result;
};
