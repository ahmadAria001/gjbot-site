import { ObjectId } from 'mongodb';
import { client } from '../database/db';

interface returnData {
	status: 200 | 400;
	message: string | null;
	content: any[] | null;
}
interface returnOneData {
	status: 200 | 400;
	message: string | null;
	content: any | null;
}

export const getRoutes = async () => {
	const errMes = 'Something went wrong';
	let result: returnData = { status: 200, message: errMes || null, content: null };

	const con = client;
	await con.connect();

	for (let i = 0; i < 5; i++) {
		try {
			let collections = con.db('discordBot').collection('pages');
			let pagesData = await collections.find().toArray();

			result.content = pagesData;
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
export const getPage = async (_id: ObjectId) => {
	const errMes = 'Something went wrong';
	let result: returnOneData = { status: 200, message: errMes || null, content: null };

	const con = client;
	await con.connect();

	for (let i = 0; i < 5; i++) {
		try {
			let collections = con.db('discordBot').collection('pages');
			let pagesData = await collections.findOne({ _id: _id });

			result.content = pagesData;
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

export const getLocalRoutes = (routes: Record<string, unknown>) => {
	let result = [
		{
			title: 'Page Title',
			path: 'Page content goes here.',
			access: new ObjectId('64d49468d29373b20878a19b'),
			update: new ObjectId('64d49468d29373b20878a19b'),
			delete: new ObjectId('64d49468d29373b20878a19b'),
			absolute: new ObjectId('64d49468d29373b20878a19b')
		}
	];
	result.pop();

	Object.keys(routes).map((item) => {
		result.push({
			title:
				item.replace('./routes/', '').replace('/+page.svelte', '') === '+page.svelte'
					? 'home'
					: item.replace('./routes/', '').replace('/+page.svelte', '').replaceAll('/', '-'),
			path:
				item.replace('./routes/', '').replace('+page.svelte', '') === ''
					? '/'
					: item.replace('./routes/', '').replace('+page.svelte', ''),
			access: new ObjectId('64d49468d29373b20878a19b'),
			update: new ObjectId('64d4dc363c4559fc8b443df3'),
			delete: new ObjectId('64d86c5bf7d29c418e5770fb'),
			absolute: new ObjectId('64d48bf2c4a44e76af620cf6')
		});
	});

	return result;
};

export const initRoutes = async (routes: Record<string, unknown>) => {
	const errMes = 'Pages is Already Initted';
	let result = { status: 200, message: errMes || null, content: [''] };
	result.content.pop();

	const con = client;
	await con.connect();

	for (let i = 0; i < 5; i++) {
		try {
			let coll = con.db('discordBot').collection('conf');
			let config = await coll.findOne({ 'container.config': 1 });

			let isInit = config?.container.pages.isInit;

			if (isInit != null && isInit) {
				return result;
			}

			let collections = con.db('discordBot').collection('pages');
			let insertProc = await collections.insertMany(getLocalRoutes(routes));

			// console.log(user[0]);

			if (insertProc.acknowledged) {
				coll.updateOne({ 'container.config': 1 }, { $set: { 'container.pages.isInit': true } });
				result.message = null!;
				break;
			}

			if (!insertProc.acknowledged) {
				result.status = 400;
				result.message = 'There was an Error';
				break;
			}

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
