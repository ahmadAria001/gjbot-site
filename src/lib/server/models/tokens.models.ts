import { client } from '../database/db';

interface formatResult {
	err: boolean | false;
	errMessage: null | '';
	isSuccess: boolean | false;
	value: any;
}

export const getCurrentToken = async (id: string | null) => {
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

			let collections = con.db('discordBot').collection('interactions');

			let data = await collections
				.find({ userId: id })
				.project({
					'interactions.amount': 1,
					'interactions.words': 1,
					'interactions.tokenUsed': 1,
					'interactions.lastInteraction': 1,
					'interactions.imgaeGenerated': 1
				})
				.toArray();

			result.value = data[0];
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
