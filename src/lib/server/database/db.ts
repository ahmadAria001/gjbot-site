import { MongoClient, ServerApiVersion } from 'mongodb';
import { MONGO_USERNAME, MONGO_CLUSTER, MONGO_PASSWORD } from '$env/static/private';
import { dencrypt } from '$lib/functions/encoder';

const url = `mongodb+srv://${dencrypt(MONGO_USERNAME)}:${encodeURIComponent(
	dencrypt(MONGO_PASSWORD)
)}@${dencrypt(MONGO_CLUSTER)}/`;

const client = new MongoClient(url, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true
	},
	connectTimeoutMS: 5000
});

async function run() {
	let isSucces = false;
	let isErr = false;
	let errMsg = null || '';

	for (let i = 0; i <= 5; i++) {
		try {
			console.log('Connecting to database...');
			// Connect the client to the server (optional starting in v4.7)
			await client.connect();
			// Send a ping to confirm a successful connection
			await client.db('admin').command({ ping: 1 });

			console.log('Connected to database!');
			console.log('Pinged your deployment. You successfully connected to MongoDB!');

			isSucces = true;
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
		} finally {
			// Ensures that the client will close when you finish/error
			await client.close();
		}
	}

	return { isSucces, isErr, errMsg };
}

export { client, run as testConnection };
