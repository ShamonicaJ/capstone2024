const express = require("express");
const cors = require("cors");
const RecipeAPI = require("./recipe-api");
const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");
dotenv.config(); 

const app = express();
const prismaClient = new PrismaClient();

app.use(express.json());
app.use(cors());

app.get("/api/recipes/search", async (req, res) => {
    const searchTerm = req.query.searchTerm
    const page = parseInt(req.query.page)
    const results = await RecipeAPI.searchRecipes(searchTerm, page)
  
    return res.json(results)
  })


  app.get("/api/recipes/:recipeId/summary", async (req, res) => {
    const recipeId = req.params.recipeId;
    const results = await RecipeAPI.getRecipeSummary(recipeId);
    return res.json(results);
  });


  app.post("/api/recipes/favourite", async (req, res) => {
    const recipeId = req.body.recipeId;
  
    try {
      const favouriteRecipe = await prismaClient.favouriteRecipes.create({
        data: {
          recipeId: recipeId,
        },
      });
      return res.status(201).json(favouriteRecipe);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Oops, something went wrong" });
    }
  });

  app.get("/api/recipes/favourite", async (req, res) => {
    try {
      const recipes = await prismaClient.favouriteRecipes.findMany();
      const recipeIds = recipes.map((recipe) => recipe.recipeId.toString());
  
      const favourites = await RecipeAPI.getFavouriteRecipesByIDs(recipeIds);
  
      return res.json(favourites);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Oops, something went wrong" });
    }
  });

  app.delete("/api/recipes/favourite", async (req, res) => {
    const recipeId = req.body.recipeId;
  
    try {
      await prismaClient.favouriteRecipes.delete({
        where: {
          recipeId: recipeId,
        },
      });
      return res.status(204).send();
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Oops, something went wrong" });
    }
  });


app.listen(3000, () => {
  console.log("Server running on localhost:3000");
});

