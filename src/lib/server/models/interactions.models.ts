import { client } from '../database/db';
import type { configureations } from '../functions/tokens';

export const updateToken = async (resourcecs: configureations) => {
	let conn = client;
	let authorUsername = '';
	await conn.connect();

	let result;

	try {
		let collection = conn.db('discordBot').collection('website');

		const idUser = resourcecs.idUser;
		const dataUser = await collection.findOne({
			'accounts.discord.userId': idUser
		});

		authorUsername = dataUser!.accounts.discord.userName;
	} catch (error) {
		console.error(error);
	}

	try {
		let collection = conn.db('discordBot').collection('interactions');

		const idUser = resourcecs.idUser;
		const dataUser = await collection.findOne({ userId: idUser });

		if (dataUser != null) {
			let amountInterac1tion = dataUser.interactions.amount;
			let amountToken = dataUser.interactions.tokenUsed;
			let amountWord = dataUser.interactions.words;
			let amountImg = dataUser.interactions.imgaeGenerated;

			result = await collection.updateOne(
				{ userId: idUser },
				{
					$set: {
						'interactions.amount': amountInterac1tion + resourcecs.interaction,
						'interactions.words': amountWord + resourcecs.words,
						'interactions.tokenUsed': amountToken + resourcecs.token,
						'interactions.lastInteraction': Math.floor(Date.now() / 1000),
						'interactions.imgaeGenerated': amountImg + resourcecs.img
					}
				}
			);

			return result;
		}

		await collection.insertOne({
			userId: idUser,
			userName: authorUsername,
			interactions: {
				amount: resourcecs.interaction,
				words: resourcecs.words,
				tokenUsed: resourcecs.token,
				lastInteraction: Math.floor(Date.now() / 1000),
				imgaeGenerated: 0
			}
		});
	} catch (error) {
		throw error;
	}

	return result;
};
