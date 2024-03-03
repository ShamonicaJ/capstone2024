import pg from 'pg';
const DATABASE = 'capstone_db';
const DB_PORT = 5432;
const USER_NAME = 'iiicakeiii';
const PASS = 'cake';
const HOST = 'localhost';

const client = new pg.Pool({ //make a connection to a pool
	username: USER_NAME, //
	password: PASS,
	port: DB_PORT, //port number stays the same (?)
	database: DATABASE, //name of database
	host: HOST, //locally hosted
	
});

const startDB = async () => {

	let instance;
	try {
		instance = await client.connect();
		console.log(`Successfully connected to ${DATABASE}`);
	} catch (e) {
		console.error('Failure connecting to database. @function startDB() ', e);
		throw e; //kill app if can't connect
	}
}

export { client, startDB };
