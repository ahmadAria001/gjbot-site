import { client } from '../database/db';

export const getRoutes = () => {
	
};

export const getLocalRoutes = (routes: Record<string, unknown>) => {
	let result = [
		{ title: '', path: '/', perms: { access: [''], write: [''], update: [''], delete: [''] } }
	];
	result.pop();

	Object.keys(routes).map((item) => {
		result.push({
			title:
				item.replace('./routes/', '').replace('/+page.svelte', '') === '+page.svelte'
					? 'Home'
					: item.replace('./routes/', '').replace('/+page.svelte', '').replaceAll('/', '-'),
			path:
				item.replace('./routes/', '').replace('+page.svelte', '') === ''
					? '/'
					: item.replace('./routes/', '').replace('+page.svelte', ''),
			perms: { access: [], write: [], update: [], delete: [] }
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
