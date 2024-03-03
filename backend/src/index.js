import express from 'express';
import { startDB, client } from '../db/db.js';
import cors from 'cors';

const LISTENING_PORT = 3000; // LISTENING PORT
const app = express(); //Create another variable to initialize express

// Something of convenience..Helps convert the body of reqs/reps into JSON so that 
// it does not need to be created manually on every reqest.
app.use(express.json());
app.use(cors()); //Annonying security thing


//Creating Routes
let getPath;

/*Name of the Route*/
getPath = `/`; 
app.get(getPath, (req /*request*/, res /*response*/) => {

	res.send('Hello World');
	
})

getPath = '/api/tasks';
app.get(getPath, async (req, res) => {
	try {
		const result = await client.query(`
			SELECT * FROM tasks
		`);
		res.send( { tasks: result.rows } );
	} catch (e) {
		console.error(`ERROR @get_req:${getPath}; Failed to get tasks`, e);
	}
})

getPath = 'api/recipes/search';
app.get(getPath, async (req, res) => {
	try {
		res.json({message: 'success'}); //Use .json() to send objects
	} catch (e) {
		console.error(`ERROR @get_req:${getPath}; Failed to get tasks`, e);
	}

})

const startServer = async () => {

	//TRY_BLOCK
	try {
		await startDB(); //Wait for the database to startup, if something goes wrong skip error output.
		app.listen(LISTENING_PORT, () => {
			//Code that runs after the app has successfully started.
			console.log(`Server is listening on port: ${LISTENING_PORT}.`); 
		})
		
	//ERROR_OUPUT
	} catch (e) {
		console.error(`Failed to start database/server @function startServer();`, e);
		throw e;
	}
}

startServer();
