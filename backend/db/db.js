import pg from 'pg';

const client = new pg.Pool({
	username: "",
	port: 1234,
	database: 'basic',
	host: 'localhost',
	
});

const startDB = async () => {

	let instance;
	try {
		instance = await client.connect();
	} catch (e) {
		console.error('Failur connecting to database.', e);
		throw e;
	}
}

export { client, startDB };
