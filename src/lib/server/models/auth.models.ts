import { dencrypt, encrypt } from '$lib/functions/encoder';
import { client } from '../database/db';

interface authParams {
	type: string | null;
	token: string | null;
	expire: number | null;
}
export interface responseData {
	err: boolean | false;
	errMessage: string | null;
	user: {
		id: string | null;
		username: string | null;
		email: string | null;
		avatar: string | null;
		expire: number | null;
	};
}

export const auth = async (payload: authParams): Promise<responseData> => {
	let { type, token, expire } = payload;
	let result: responseData = {
		err: false,
		errMessage: null,
		user: { avatar: null, email: null, expire: null, id: null, username: null }
	};

	if (type == null && token == null && expire == null) {
		result.err = true;
		result.errMessage = 'Parameters is Empty';
		return result;
	}

	const con = client;

	let isErr = false;
	let errMsg = null || '';
	let rsp;

	await con.connect();

	for (let i = 0; i < 5; i++) {
		try {
			const resp = await fetch('https://discord.com/api/users/@me', {
				headers: {
					authorization: `${type} ${token}`
				}
			});

			rsp = await resp.json();

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
		result.errMessage = errMsg;
		return result;
	}

	let { id, username, global_name, avatar, email } = rsp;

	for (let i = 0; i < 5; i++) {
		try {
			let collections = con.db('discordBot').collection('website');
			let user = await collections.findOne({ 'accounts.discord.userId': id });

			if (user != null || user != undefined) {
				if (
					user?.accounts.discord.tokens.expiredate > Date.now() &&
					dencrypt(user?.accounts.discord.tokens.token) != token
				) {
					collections.updateOne(
						{ 'accounts.discord.userId': id },
						{
							$set: {
								'accounts.discord.tokens.token': encrypt(token!),
								'accounts.discord.tokens.expiredate': Date.now() + expire! * 1000
							}
						}
					);
				}

				result = {
					err: false,
					errMessage: null,
					user: {
						id: user?.accounts.discord.userId,
						username: user?.accounts.discord.userName,
						email: user?.accounts.discord.email,
						avatar: user?.accounts.discord.avatar,
						expire: Date.now() + expire! * 1000
					}
				};

				break;
			}

			collections.insertOne({
				accounts: {
					discord: {
						userId: id,
						userName: username,
						email: email,
						avatar: avatar,
						globalName: global_name,
						create_at: Date.now(),
						tokens: {
							token: encrypt(token!),
							expiredate: Date.now() + expire! * 1000,
							type: type
						}
					}
				}
			});

			result = {
				err: false,
				errMessage: null,
				user: {
					id: rsp.id,
					username: rsp.username,
					email: rsp.email,
					avatar: rsp.avatar,
					expire: Date.now() + expire! * 1000
				}
			};

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

	return result;
};
