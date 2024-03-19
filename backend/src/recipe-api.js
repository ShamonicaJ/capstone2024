const dotenv = require("dotenv");
dotenv.config();

const apiKey = process.env.API_KEY;

const searchRecipes = async (searchTerm, page) => {
  if (!apiKey) {
    throw new Error("API Key not found");
  }

  // Dynamically import node-fetch
  try {
    const fetch = await import("node-fetch");
    
    const url = new URL("https://api.spoonacular.com/recipes/complexSearch");

    const queryParams = {
      apiKey,
      query: searchTerm,
      number: "10",
      offset: page * 10 
    };

    url.searchParams.append("apiKey", queryParams.apiKey);
    url.searchParams.append("query", queryParams.query);
    url.searchParams.append("number", queryParams.number);
    url.searchParams.append("offset", queryParams.offset);

    const searchResponse = await fetch.default(url);
    const resultsJson = await searchResponse.json();
    return resultsJson;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { searchRecipes };
