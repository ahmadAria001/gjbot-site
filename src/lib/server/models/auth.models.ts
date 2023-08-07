import { dencrypt, encrypt } from '$lib/functions/encoder';
import type { ObjectId } from 'mongodb';
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
		banner: string | null;
		banner_color: string | null;
	};
}

interface passwordForm {
	status: number;
	message: string | null;
	password: string | null;
	_id: ObjectId | null;
}

export const authEmail = async (payload: authEmail): Promise<responseData> => {
	let { email, id } = payload;

	let result: responseData = {
		err: false,
		errMessage: null,
		isNew: false,
		user: {
			avatar: null,
			email: null,
			expire: null,
			id: null,
			username: null,
			banner: null,
			banner_color: null
		}
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
						expire: 0,
						banner: null,
						banner_color: null
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
					expire: 60 * 60 * 24,
					banner: user?.accounts.discord.banner,
					banner_color: user?.accounts.discord.banner_color
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
						expire: 0,
						banner: null,
						banner_color: null
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
						expire: 0,
						banner: null,
						banner_color: null
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
		user: {
			avatar: null,
			email: null,
			expire: null,
			id: null,
			username: null,
			banner: null,
			banner_color: null
		}
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
						expire: 60 * 60 * 24,
						banner: user?.accounts.discord.banner,
						banner_color: user?.accounts.discord.banner_color
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
						expire: 0,
						banner: null,
						banner_color: null
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
						expire: 0,
						banner: null,
						banner_color: null
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
						expire: 0,
						banner: null,
						banner_color: null
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
		user: {
			avatar: null,
			email: null,
			expire: null,
			id: null,
			username: null,
			banner: null,
			banner_color: null
		}
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

			isErr = !isInGuild.some(
				(val) => val.id == '1014138032686899262' || val.id == '1021996824887824384'
			);
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

	let { id, username, global_name, avatar, email, banner, banner_color } = rsp;

	for (let i = 0; i < 5; i++) {
		try {
			let collections = con.db('discordBot').collection('website');
			let user = await collections.findOne({ 'accounts.discord.userId': id });

			if (user != null) {
				if (avatar != user?.accounts.discord.avatar) {
					await collections.updateOne(
						{ 'accounts.discord.userId': id },
						{
							$set: {
								'accounts.discord.avatar': avatar
							}
						}
					);
				}
				if (avatar != user?.accounts.discord.banner) {
					await collections.updateOne(
						{ 'accounts.discord.userId': id },
						{
							$set: {
								'accounts.discord.banner': banner
							}
						}
					);
				}
				if (avatar != user?.accounts.discord.banner_color) {
					await collections.updateOne(
						{ 'accounts.discord.userId': id },
						{
							$set: {
								'accounts.discord.banner_color': banner_color
							}
						}
					);
				}

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
							expire: Date.now() + expire! * 1000,
							banner: user?.accounts.discord.banner,
							banner_color: user?.accounts.discord.banner_color
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
							expire: Date.now() + expire! * 1000,
							banner: user?.accounts.discord.banner,
							banner_color: user?.accounts.discord.banner_color
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
							banner: banner,
							banner_color: banner_color,
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
						expire: Date.now() + expire! * 1000,
						banner: banner,
						banner_color: banner_color
					}
				};
			}

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

export const verifPassword = async (email: string, id: string, password: string) => {
	const con = client;
	await con.connect();

	const errMes = 'Current password are incorrect';
	let result: passwordForm = {
		status: 200,
		message: errMes || null,
		password: password || null,
		_id: null
	};

	for (let i = 0; i < 5; i++) {
		try {
			let collections = con.db('discordBot').collection('website');
			let user = await collections.findOne(
				{
					'accounts.discord.email': email,
					'accounts.discord.userId': id
				},
				{
					projection: {
						_id: 1,
						password: 1
					}
				}
			);

			const isCorrect = compareHash(password!, user?.password);

			if (user != null && isCorrect) {
				result.message = null!;
				result._id = user._id;
				break;
			}

			if (user == undefined || user == null || !isCorrect) {
				result.status = 400;
				result.password = null;
				result.message = errMes;
				break;
			}
		} catch (error) {
			if (i == 5) {
				result = {
					status: 400,
					message: (error as any).message,
					password: null,
					_id: null!
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
					status: 400,
					message: (error as any).message,
					password: null,
					_id: null!
				};
				break;
			}
		}
	}

	return result;
};
