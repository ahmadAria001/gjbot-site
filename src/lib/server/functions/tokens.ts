import { client } from '../database/db';
import tiktoken from '@dqbd/tiktoken';

export interface configureations {
	role: 'system';
	content: string | null;
	token: number;
	words: number;
	interaction: number;
	idUser: string | null;
	img: number;
}

export let calcToken = async (userId: string | null, words: string | null) => {
	const db = client;

	let enc;
	enc = tiktoken.get_encoding('cl100k_base');
	enc = tiktoken.encoding_for_model('gpt-3.5-turbo');

	let numToken = 0;

	for (let index = 0; index < words!.length; index++) {
		numToken += 4;

		for (let key in words![index] as any) {
			numToken += enc.encode(words![index][key as any]).length;
			if (key == 'name') numToken += -1;
		}
	}
	numToken += 3;

	let isExceed: configureations = {
		role: 'system',
		content: null,
		token: 0,
		words: 0,
		interaction: 1,
		idUser: userId,
		img: 0
	};
	isExceed.token = numToken;

	try {
		await db.connect();

		const database = db.db('discordBot');

		const collectionsInteraction = database.collection('interactions');
		const collectionsConfig = database.collection('conf');

		const dataUser = await collectionsInteraction.findOne({ userId: userId });
		const dataConfig = await collectionsConfig.findOne({
			'container.config': 1
		});

		let limitConf = dataConfig!.container.openAi.limit;

		if (dataUser != null || dataUser != undefined) {
			if (dataUser.interactions.tokenUsed >= limitConf) {
				isExceed.content = 'Exceed Token Limit';
			}

			if (dataUser.interactions.tokenUsed + numToken >= limitConf) {
				isExceed.content = 'Exceed Token Limit';
			}
		}

		if (isExceed != null || isExceed != undefined) return isExceed;
	} catch (error) {
		throw error;
	}

	return isExceed;
};
