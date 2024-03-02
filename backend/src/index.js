import express from 'express';
import cors from 'cors';

const app = express();

// Something of convenience..Helps convert the body of reqs/reps into JSON so that 
// it does not need to be created manually on every reqest.
app.use(express.json());

app.use(cors()); //Annonying security thing


app.get("api/recipes/search", async (req /*request*/, res /*response*/) => {
	res.json({message: 'success'});
});

const LISTENING_PORT = 3000 // LISTENING PORT
app.listen(LISTENING_PORT, () => {

	//Code that runs after the app has successfully started.
	console.log(`Server is listening on port: ${LISTENING_PORT}.`); 
} );

