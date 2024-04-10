import "./App.css";
import { useEffect, useRef, useState } from "react";
import * as api from "./api";
import { Recipe } from "./types";
import RecipeCard from "./components/RecipeCard";
import RecipeModal from "./components/RecipeModal";
import { AiOutlineSearch } from "react-icons/ai";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [selectedTab, setSelectedTab] = useState("search");
  const [favouriteRecipes, setFavouriteRecipes] = useState([]);

  const pageNumber = useRef(1);

  useEffect(() => {
    const fetchFavouriteRecipes = async () => {
      try {
        const fetchedFavouriteRecipes = await api.getFavouriteRecipes();
        setFavouriteRecipes(fetchedFavouriteRecipes); // Updated to set the favourite recipes directly
      } catch (error) {
        console.log(error);
      }
    };

    fetchFavouriteRecipes();
  }, []);

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    try {
      const recipesData = await api.searchRecipes(searchTerm, 1);
      setRecipes(recipesData.results);
      pageNumber.current = 1;
    } catch (error) {
      console.log(error);
    }
  };

  const handleViewMoreClick = async () => {
    const nextPage = pageNumber.current + 1;
    try {
      const nextRecipes = await api.searchRecipes(searchTerm, nextPage);
      setRecipes([...recipes, ...nextRecipes.results]);
      pageNumber.current = nextPage;
    } catch (error) {
      console.log(error);
    }
  };

  const addFavouriteRecipe = async (recipe) => {
    try {
      await api.addFavouriteRecipe(recipe);
      setFavouriteRecipes([...favouriteRecipes, recipe]); // Updated to add the recipe directly
    } catch (error) {
      console.log(error);
    }
  };

  const removeFavouriteRecipe = async (recipe) => {
    try {
      await api.removeFavouriteRecipe(recipe);
      const updatedRecipes = favouriteRecipes.filter((favRecipe) => recipe.id !== favRecipe.id);
      setFavouriteRecipes(updatedRecipes); // Updated to remove the recipe directly
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <div className="app-container">
      <div className="header">
        <img src="/koreanfood.jpg" alt="Korean Food" />
        <div className="title">World Cuisine Hub</div>
      </div>
      <div className="tabs">
        <h1 onClick={() => setSelectedTab("search")}> Search</h1>
        <h1 onClick={() => setSelectedTab("favourites")}> Favorites</h1>
      </div>
      {selectedTab === "search" && (
        <>
          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              required
              placeholder="Enter a search term ..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
            <button type="submit">Submit</button>
          </form>

          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onClick={() => setSelectedRecipe(recipe)}
              onFavouriteButtonClick={() => {
                const isFavourite = favouriteRecipes.some((favRecipe) => recipe.id === favRecipe.id);
                isFavourite ? removeFavouriteRecipe(recipe) : addFavouriteRecipe(recipe);
              }}
              isFavourite={favouriteRecipes.some((favRecipe) => recipe.id === favRecipe.id)}
            />
          ))}

          <button className="view-more-button" onClick={handleViewMoreClick}>
            View More
          </button>
        </>
      )}

      {selectedTab === "favourites" && (
        <div>
          {favouriteRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onClick={() => setSelectedRecipe(recipe)}
              onFavouriteButtonClick={() => removeFavouriteRecipe(recipe)}
              isFavourite={true}
            />
          ))}
        </div>
      )}

      {selectedRecipe && (
        <RecipeModal
          recipeId={selectedRecipe.id.toString()}
          onClose={() => setSelectedRecipe(null)}
          isFavourite={favouriteRecipes.some((favRecipe) => selectedRecipe.id === favRecipe.id)}
        />
      )}
    </div>
  );
};

export default App;