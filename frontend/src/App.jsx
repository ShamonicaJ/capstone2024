import "./App.css";
import { FormEvent, useEffect, useRef, useState } from "react";
import * as api from "./api";
import {Recipe} from "./types";
import RecipeCard from "./components/RecipeCard";
import RecipeModal from "./components/RecipeModal";
import { AiOutlineSearch } from "react-icons/ai";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(undefined);
  const pageNumber = useRef(1);

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    try {
      const recipes = await api.searchRecipes(searchTerm, 1);
      setRecipes(recipes.results);
      pageNumber.current = 1;
    } catch (e) {
      console.log(e);
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

  return (
    <div className="app-container">
      <div className="header">
        <img src="/koreanfood.jpg" alt="Korean Food"></img>
        <div className="title">World Cuisine Hub</div>
      </div>
      <div className="tabs">
        <h1>Search</h1>
        <h1>Favorites</h1>
      </div>

      <div>
        <form onSubmit={(event) => handleSearchSubmit(event)}>
          <input
            type="text"
            required
            placeholder="Enter a search term ..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          ></input>
          <button type="submit">Submit</button>
        </form>

        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} onClick={() => setSelectedRecipe(recipe)} />
        ))}
        <button className="view-more-button" onClick={handleViewMoreClick}>
          View More
        </button>
        {selectedRecipe && (
          <RecipeModal recipeId={selectedRecipe.id.toString()} />
        )}
      </div>
    </div>
  );
};

export default App;
