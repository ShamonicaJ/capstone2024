const express = require("express");
const cors = require("cors");
const { searchRecipes, getFavouriteRecipesByIDs } = require("./recipe-api"); // Assuming you have implemented this function
const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");

dotenv.config();

const app = express();
const prismaClient = new PrismaClient();

app.use(express.json());
app.use(cors());

app.get("/api/recipes/search", async (req, res) => {
  const searchTerm = req.query.searchTerm;
  const page = parseInt(req.query.page);
  try {
    const results = await searchRecipes(searchTerm, page);
    return res.json(results);
  } catch (error) {
    console.error("Error searching recipes:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/recipes/favorite", async (req, res) => {
  const { recipeId } = req.body; // Destructuring the recipeId from request body

  try {
    const favouriteRecipe = await prismaClient.favouriteRecipe.create({
      data: {
        recipeId: recipeId,
      },
    });
    return res.status(201).json(favouriteRecipe);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

app.get("/api/recipes/favourite", async (req, res) => {
  try {
    const recipes = await prismaClient.favouriteRecipe.findMany();
    const recipeIds = recipes.map((recipe) => recipe.recipeId.toString());

    const favourites = await getFavouriteRecipesByIDs(recipeIds); // Assuming you have implemented this function

    return res.json(favourites);
  } catch (error) {
    console.error("Error fetching favourite recipes:", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

app.delete("/api/recipes/favourite", async (req, res) => {
  const { recipeId } = req.body; // Destructuring the recipeId from request body

  try {
    await prismaClient.favouriteRecipe.deleteMany({
      where: {
        recipeId: recipeId,
      },
    });
    return res.status(204).send();
  } catch (error) {
    console.error("Error deleting favourite recipe:", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
