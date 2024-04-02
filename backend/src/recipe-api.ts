import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.API_KEY;

export const searchRecipes = async (searchTerm: string, page: number) => {
    if (!apiKey) {
        throw new Error("API Key not found");
    }

    const url = new URL("https://api.spoonacular.com/recipes/complexSearch");

    const queryParams = {
        apiKey,
        query: searchTerm,
        number: "10",
        offset: (page * 10).toString(),
    };
    url.search = new URLSearchParams(queryParams).toString();

    try {
        const searchResponse = await fetch(url);
        const resultsJson = await searchResponse.json();
        return resultsJson;
    } catch (error) {
        console.log(error);
    }
};

export const getRecipeSummary = async (recipeId: string) => {
    if (!apiKey) {
      throw new Error("API Key not found");
    }
  
    const url = new URL(
      `https://api.spoonacular.com/recipes/${recipeId}/summary`
    );
    const params = {
      apiKey: apiKey,
    };
    url.search = new URLSearchParams(params).toString();
  
    const response = await fetch(url);
    const json = await response.json();
  
    return json;
  };
  
  export const getFavouriteRecipesByIDs = async (ids: string[]) => {
    if (!apiKey) {
      throw new Error("API Key not found");
    }
  
    const url = new URL("https://api.spoonacular.com/recipes/informationBulk");
    const params = {
      apiKey: apiKey,
      ids: ids.join(","),
    };
    url.search = new URLSearchParams(params).toString();
  
    const searchResponse = await fetch(url);
    const json = await searchResponse.json();
  
    return { results: json };
  };


  export const searchRecipesByCuisine = async (cuisine: string) => {
    if (!apiKey) {
        throw new Error("API Key not found");
    }

    const url = new URL("https://api.spoonacular.com/recipes/cuisine");

    const params = {
        apiKey,
        cuisine,
    };

    try {
        const response = await fetch(url.toString(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        });

        const json = await response.json();
        return json;
    } catch (error) {
        console.log(error);
    }
};





















// const apiKey = process.env.API_KEY;

// export const searchRecipes = async (searchTerm: string, page: number) => {
//     if (!apiKey) {
//       throw new Error("API Key not found");
//     }
  
//     const url = new URL("https://api.spoonacular.com/recipes/complexSearch");
  
//     const queryParams = {
//       apiKey,
//       query: searchTerm,
//       number: "10",
//       offset: (page * 10).toString(),
//     };
//     url.search = new URLSearchParams(queryParams).toString();
  
//     try {
//       const searchResponse = await fetch(url);
//       const resultsJson = await searchResponse.json();
//       return resultsJson;
//     } catch (error) {
//       console.log(error);
//     }
//   };