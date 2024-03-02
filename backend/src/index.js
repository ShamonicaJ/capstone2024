import express from 'express';
import cors from 'cors';

const LISTENING_PORT = 3000; // LISTENING PORT

const app = express(); //Create another variable to initialize express

// Something of convenience..Helps convert the body of reqs/reps into JSON so that 
// it does not need to be created manually on every reqest.
app.use(express.json());

app.use(cors()); //Annonying security thing

//Creating Routes
app.get('/' /*Name of the Route*/, (req /*request*/, res /*response*/) => {
	res.send('Hello World');
})


app.get("api/recipes/search", async (req, res) => {
	res.json({message: 'success'}); //Use .json() to send objects
})

app.listen(LISTENING_PORT, () => {

	//Code that runs after the app has successfully started.
	console.log(`Server is listening on port: ${LISTENING_PORT}.`); 
})

