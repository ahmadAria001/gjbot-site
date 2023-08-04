import { dencrypt, encrypt } from '$lib/functions/encoder';
import { client } from '../database/db';
import { compareHash } from '../functions/hash';

interface authParams {
	type: string | null;
	token: string | null;
	expire: number | null;
}

interface authUser {
	email: string | null;
	password: string | null;
}
interface authEmail {
	email: string | null;
	id: string | null;
}
export interface responseData {
	err: boolean | false;
	errMessage: string | null;
	isNew: boolean | false;
	user: {
		id: string | null;
		username: string | null;
		email: string | null;
		avatar: string | null;
		expire: number | null;
	};
}

export const authEmail = async (payload: authEmail): Promise<responseData> => {
	let { email, id } = payload;

	let result: responseData = {
		err: false,
		errMessage: null,
		isNew: false,
		user: { avatar: null, email: null, expire: null, id: null, username: null }
	};

	let isErr = false;
	let errMsg = null || '';
	let rsp;

	const con = client;
	await con.connect();

	for (let i = 0; i < 5; i++) {
		try {
			let collections = con.db('discordBot').collection('website');
			let user = await collections.findOne({
				'accounts.discord.email': email,
				'accounts.discord.userId': id
			});

			if (user == undefined) {
				result = {
					err: true,
					errMessage: 'User is Unknown',
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

			result = {
				err: false,
				errMessage: null,
				isNew: true,
				user: {
					id: user?.accounts.discord.userId,
					username: user?.accounts.discord.userName,
					email: user?.accounts.discord.email,
					avatar: user?.accounts.discord.avatar,
					expire: Date.now() + 604800 * 1000
				}
			};
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
export const authUser = async (payload: authUser): Promise<responseData> => {
	let { email, password } = payload;

	let result: responseData = {
		err: false,
		errMessage: null,
		isNew: false,
		user: { avatar: null, email: null, expire: null, id: null, username: null }
	};

	const con = client;

	let isErr = false;
	let errMsg = null || '';
	let rsp;

	await con.connect();

	for (let i = 0; i < 5; i++) {
		try {
			let collections = con.db('discordBot').collection('website');
			let user = await collections.findOne({ 'accounts.discord.email': email });

			if (user != null && compareHash(password!, user?.password)) {
				result = {
					err: false,
					errMessage: null,
					isNew: false,
					user: {
						id: user?.accounts.discord.userId,
						username: user?.accounts.discord.userName,
						email: user?.accounts.discord.email,
						avatar: user?.accounts.discord.avatar,
						expire: Date.now() + 604800 * 1000
					}
				};
			} else {
				result = {
					err: true,
					errMessage: 'Email or Password are incorrect!',
					isNew: false,
					user: {
						id: null,
						username: null,
						email: null,
						avatar: null,
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

export const auth = async (payload: authParams): Promise<responseData> => {
	let { type, token, expire } = payload;
	let result: responseData = {
		err: false,
		errMessage: null,
		isNew: false,
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

			const guilds = await fetch('https://discord.com/api/users/@me/guilds', {
				headers: {
					authorization: `${type} ${token}`
				}
			});

			let isInGuild: any[] = await guilds.json();
			rsp = await resp.json();

			isErr = !isInGuild.some((val) => val.id == '1014138032686899262');
			if (isErr) errMsg = 'Not Part of The Guild';

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

			if (user != null) {
				if (
					user?.accounts.discord.tokens.expiredate > Date.now() &&
					dencrypt(user?.accounts.discord.tokens.token) != token
				) {
					await collections.updateOne(
						{ 'accounts.discord.userId': id },
						{
							$set: {
								'accounts.discord.tokens.token': encrypt(token!),
								'accounts.discord.tokens.expiredate': Date.now() + expire! * 1000
							}
						}
					);
				}

				if (!user.hasOwnProperty('password')) {
					result = {
						err: false,
						errMessage: null,
						isNew: true,
						user: {
							id: user?.accounts.discord.userId,
							username: user?.accounts.discord.userName,
							email: user?.accounts.discord.email,
							avatar: user?.accounts.discord.avatar,
							expire: Date.now() + expire! * 1000
						}
					};
				} else {
					result = {
						err: false,
						errMessage: null,
						isNew: false,
						user: {
							id: user?.accounts.discord.userId,
							username: user?.accounts.discord.userName,
							email: user?.accounts.discord.email,
							avatar: user?.accounts.discord.avatar,
							expire: Date.now() + expire! * 1000
						}
					};
				}
				break;
			} else {
				let dataIn = await collections.insertOne({
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

				console.log(`Inserted: ${dataIn}`);

				result = {
					err: false,
					errMessage: null,
					isNew: true,
					user: {
						id: rsp.id,
						username: rsp.username,
						email: rsp.email,
						avatar: rsp.avatar,
						expire: Date.now() + expire! * 1000
					}
				};
			}

			console.log(result);

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
