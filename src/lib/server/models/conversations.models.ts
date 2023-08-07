import extractStream from '$lib/functions/extractStream';
import { client } from '../database/db';
import { calcToken } from '../functions/tokens';
import { getModel, openAi } from '../openAi/config';
import { updateToken } from './interactions.models';

interface formatResult {
	err: boolean | false;
	errMessage: null | '';
	isSuccess: boolean | false;
	value: any;
}

export const getTalk = async (id: string | null) => {
	let result: formatResult = {
		err: false,
		errMessage: null,
		isSuccess: false,
		value: null
	};

	let isErr = false;
	let errMsg = '' || null;

	const con = client;

	for (let i = 0; i < 5; i++) {
		try {
			await con.connect();

			let collections = con.db('discordBot').collection('conversations');

			let data = await collections
				.aggregate([
					{ $match: { userId: id } },
					{ $unwind: '$conversations' },
					{
						$sort: {
							'conversations.created_at': 1
						}
					},
					{
						$group: {
							_id: '$userId',
							conversations: { $push: '$conversations' }
						}
					},
					{
						$project: {
							conversations: { $slice: ['$conversations', -20] }
						}
					}
				])
				.toArray();

			result.value = data[0].conversations;
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
export const getTalkLimit = async (id: string | null, limit: number) => {
	let result: formatResult = {
		err: false,
		errMessage: null,
		isSuccess: false,
		value: null
	};

	let isErr = false;
	let errMsg = '' || null;

	const con = client;

	for (let i = 0; i < 5; i++) {
		try {
			await con.connect();

			let collections = con.db('discordBot').collection('conversations');

			let data = await collections
				.aggregate([
					{ $match: { userId: id } },
					{ $unwind: '$conversations' },
					{
						$sort: {
							'conversations.created_at': -1
						}
					},
					{ $limit: limit },
					{ $group: { _id: '$userId', conversations: { $push: '$conversations' } } }
				])
				.toArray();

			result.value = data[0].conversations;
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
export const getAllTalk = async () => {
	let result: formatResult = {
		err: false,
		errMessage: null,
		isSuccess: false,
		value: null
	};

	let isErr = false;
	let errMsg = '' || null;

	const con = client;

	for (let i = 0; i < 5; i++) {
		try {
			await con.connect();

			let collections = con.db('discordBot').collection('conversations');

			let data = await collections
				.aggregate([
					{ $unwind: '$conversations' },
					{
						$sort: {
							'conversations.created_at': -1
						}
					},
					{
						$lookup: {
							from: 'website',
							localField: 'userId',
							foreignField: 'accounts.discord.userId',
							as: 'targetUser'
						}
					},
					{
						$group: {
							_id: '$userId',
							uname: {
								$first: '$targetUser.accounts.discord.userName'
							},
							conversations: { $push: '$conversations' }
						}
					},
					{
						$project: {
							_id: 1,
							uname: 1,
							conversations: 1
						}
					}
				])
				.toArray();

			result.value = data;
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
				console.error((error as any).message);
				break;
			}
		}
	}

	return result;
};

export const createConversation = async (
	content: { role: 'user' | 'system'; content: string }[],
	mainPromp: string,
	userId: string | null
) => {
	if (userId == null || content == null || mainPromp == null) return null;

	let isExceed = await calcToken(userId, mainPromp);

	if (isExceed.content != null) return isExceed;

	let response: any = '';

	if (openAi == undefined) {
		getModel();
	}

	try {
		response = await openAi.createChatCompletion({
			model: 'gpt-3.5-turbo-16k',
			messages: content,
			temperature: 1.2,
			stream: true,
			max_tokens: 1000
		});
	} catch (error) {
		throw error;
	}

	let tokenUsed;
	let extractedStream = extractStream(response.data.toString());

	await updateInteractions({ promp: mainPromp }, userId, 'user');

	tokenUsed = extractedStream.datas.length;

	isExceed.token += tokenUsed;

	let resultUpdate = await updateToken(isExceed);
	await updateInteractions({ resp: extractedStream.datas }, userId, 'system');

	return extractedStream.datas;
};

export const streamToString = (data: any[]) => {
	let assembedString: string = '';

	for (let i = 0; i < data.length - 1; i++) {
		assembedString += data[i].choices[0].delta.content;
	}

	return assembedString;
};

export const updateInteractions = async (
	content: any | null,
	userId: string | null,
	role: 'user' | 'system'
) => {
	let response = content;
	// let inputs = content.input;
	let combinedResponse = '';
	let tokenAmountt = 0;

	if (content.hasOwnProperty('resp')) {
		tokenAmountt = content.resp.length;

		for (let i = 0; i < content.resp.length - 1; i++) {
			combinedResponse += content.resp[i].choices[0].delta.content;
		}
	}

	if (content.hasOwnProperty('promp')) {
		combinedResponse = response.promp;
	}

	let conn = client;
	await conn.connect();

	try {
		let collection = conn.db('discordBot').collection('conversations');

		const dataUser = await collection.findOne({ userId: userId });

		if (dataUser == null || dataUser == undefined) {
			if (role == 'system') {
				await collection.insertOne({
					userId: userId,
					create_at: Date.now(),
					conversations: [
						{
							sender: 'system',
							content: combinedResponse,
							created_at: Date.now(),
							token: tokenAmountt
						}
					]
				});
			}
			if (role == 'user') {
				await collection.insertOne({
					userId: userId,
					create_at: Date.now(),
					conversations: [
						{
							sender: 'user',
							content: combinedResponse,
							created_at: Date.now()
						}
					]
				});
			}

			return 1;
		} else {
			if (role == 'system') {
				await collection.updateOne(
					{ userId: userId },
					{
						$push: {
							conversations: {
								$each: [
									{
										sender: 'system',
										content: combinedResponse,
										created_at: Date.now(),
										token: tokenAmountt
									}
								]
							}
						}
					}
				);
			}
			if (role == 'user') {
				await collection.updateOne(
					{ userId: userId },
					{
						$push: {
							conversations: {
								$each: [
									{
										sender: 'user',
										content: combinedResponse,
										created_at: Date.now()
									}
								]
							}
						}
					}
				);
			}
		}
	} catch (error) {
		console.error(error);
	}
};
