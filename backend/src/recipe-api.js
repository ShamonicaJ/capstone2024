const dotenv = require("dotenv");
dotenv.config();

const apiKey = process.env.API_KEY;

 const searchRecipes = async (searchTerm, page) => {
  if (!apiKey) {
    throw new Error("API Key not found");
  }

  const url = new URL("https://api.spoonacular.com/recipes/complexSearch");

  const queryParams = {
    apiKey,
    query: searchTerm,
    number: "10",
    offset: page * 10 
  };

  url.search = new URLSearchParams(queryParams);

  try {
    const searchResponse = await fetch(url);
    const resultsJson = await searchResponse.json();
    return resultsJson;
  } catch (error) {
    console.log(error);
  }
};
module.exports = { searchRecipes };