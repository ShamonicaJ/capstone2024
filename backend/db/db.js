import pg from 'pg';

const client = new pg.Pool({ //make a connection to a pool
	username: "iiicakeiii", //
	password: "cake",
	port: 5432, //port number stays the same (?)
	database: 'capstone_db', //name of database
	host: 'localhost', //locally hosted
	
});

const startDB = async () => {

	let instance;
	try {
		instance = await client.connect();
	} catch (e) {
		console.error('Failure connecting to database. @function startDB() ', e);
		throw e; //kill app if can't connect
	}
}

export { client, startDB };
