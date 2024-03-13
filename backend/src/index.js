const express = require("express");
const cors = require("cors");
const RecipeAPI = require("./recipe-api");
const dotenv = require("dotenv");


dotenv.config(); 

const app = express();

app.use(express.json());
app.use(cors());

app.get("/api/recipes/search", async (req, res) => {
    const searchTerm = req.query.searchTerm
    const page = parseInt(req.query.page)
    const results = await RecipeAPI.searchRecipes(searchTerm, page)
  
    return res.json(results)
  })

app.listen(3000, () => {
  console.log("Server running on localhost:3000");
});

