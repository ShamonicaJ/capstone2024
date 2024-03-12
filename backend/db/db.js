import pg from 'pg';
import chalk from 'chalk';

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

	let instance= null;
	try {
		instance = await client.connect();
		console.log(chalk.blue(`Successfully connected to ${DATABASE}`));
	} catch (e) {
		console.error(chalk.red('Failure connecting to database. @function startDB() ', e));
		throw e; //kill app if you can't connect
	}
	return instance;
}

export { client, startDB };
