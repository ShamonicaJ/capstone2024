import { startDB, client } from './db.js';


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
		VALUES ('Demo', 'A demo of APIs powered by SQL', false)
		`;

		await client.query(query);
		
	} catch (e) {
		console.error(`Failed to seed initial data in database. @function seed();`, e);
		throw e;
	}

	/* CleanUp Process */
	await db.release(); // close Database
	await client.end(); // shutdown client 
	process.exit(0); // exit process
}

seed();
