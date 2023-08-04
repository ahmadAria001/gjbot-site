import { client } from '../database/db';
import { toHash } from '../functions/hash';
import type { responseData } from './auth.models';

interface payloadPasswordChange {
	id: string;
	email: string;
	password: string;
}

export const changePassword = async (payload: payloadPasswordChange) => {
	let { email, id, password } = payload;

	let result: responseData = {
		err: false,
		errMessage: null,
		isNew: false,
		user: { avatar: null, email: null, expire: null, id: null, username: null }
	};

	const con = client;
	await con.connect();

	for (let i = 0; i < 5; i++) {
		try {
			let collections = con.db('discordBot').collection('website');
			let user = await collections.findOne({
				'accounts.discord.email': email,
				'accounts.discord.userId': id
			});

			if (user == null) {
				result = {
					err: true,
					errMessage: 'Cannot find account',
					isNew: false,
					user: {
						id: null,
						username: null,
						email: null,
						avatar: null,
						expire: 0
					}
				};
				break;
			}

			let updated = await collections.updateOne(
				{ 'accounts.discord.email': email, 'accounts.discord.userId': id },
				{
					$set: {
						password: (await toHash(password)).toString()
					}
				}
			);

			if (updated.modifiedCount == 1) {
				result = {
					err: false,
					errMessage: null,
					isNew: true,
					user: {
						id: user.accounts.discord.id,
						username: user.accounts.discord.userName,
						email: user.accounts.discord.email,
						avatar: user.accounts.discord.avatar,
						expire: 0
					}
				};
			}
		} catch (error) {
			if (i == 5) {
				result = {
					err: true,
					errMessage: (error as any).message,
					isNew: false,
					user: {
						id: null,
						username: null,
						email: null,
						avatar: null,
						expire: 0
					}
				};
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
				result = {
					err: true,
					errMessage: (error as any).message,
					isNew: false,
					user: {
						id: null,
						username: null,
						email: null,
						avatar: null,
						expire: 0
					}
				};
				break;
			}
		}
	}

	return result;
};
