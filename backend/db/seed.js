import { startDB, client } from './db.js';
import chalk from 'chalk';



/*
* Sole purpose of seedjs is to feed some information into the database.*/
const seed = async () => {

	let db = null; // create variable before initialization
	try {
		db = await startDB(); // initiate Database

		const query = `
		DROP TABLE IF EXISTS tasks;

		CREATE TABLE IF NOT EXISTS tasks (
			id SERIAL PRIMARY KEY,
			title VARCHAR(255),
			description TEXT,
			complete BOOLEAN
		);
		INSERT INTO tasks (title, description, complete) 
		VALUES ('Second', 'A second demo of APIs powered by SQL', false)
		`;

		await client.query(query);
		
	} catch (e) {
		console.error(chalk.red(`Failed to seed initial data in database. ${chalk.green('@function seed()')};`, e));
		throw e;
	}

	/* CleanUp Process */
	await db.release(); // close Database
	await client.end(); // shutdown client

	// eslint-disable-next-line no-undef
	process.exit(0); // exit process
}

seed();
