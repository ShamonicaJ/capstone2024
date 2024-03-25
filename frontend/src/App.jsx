
import "./App.css";
import React, { useState, useRef } from "react";
import * as api from "./api";
import RecipeCard from "./components/RecipeCard.jsx"; // Adjust the path based on the actual location of RecipeCard component
import RecipeModal from './components/RecipeModal'; 




const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const pageNumber = useRef(1);
  const [selectedRecipe, setSelectedRecipe] = useState(undefined); 
  const [selectedTab, setSelectedTab] = useState(''); 

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    try {
      const recipesData = await api.searchRecipes(searchTerm, 1);
      setRecipes(recipesData.results);
      setError(null); // Clear any previous errors
    } catch (e) {
      console.error(e);
      setError("Error fetching recipes"); // Set an error message
    }
  };

  const handleViewMoreClick = async () => {
    const nextPage = pageNumber.current + 1;
    try {
      const nextRecipes = await api.searchRecipes(searchTerm, nextPage)
      setRecipes([...recipes, ...nextRecipes.results]);
      pageNumber.current = nextPage;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
          <div className="tabs">
        <h1 
        className={selectedTab === "search" ? "tab-active": ""}
        onClick={()=> setSelectedTab("search")}>Recipe Search</h1>
        <h1 
        className={selectedTab === "favourites" ? "tab-active": ""}
        onClick={()=> setSelectedTab("favourites")}>Favourites</h1>
      </div>

      
      <form onSubmit={(event) => handleSearchSubmit(event)}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter search term"
        />
        <button type="submit">Search</button>
      </form>

      {error && <div>{error}</div>}

      {recipes.map((recipe, index) => (
        <RecipeCard
          key={index}
          recipe={recipe}
          onClick={() => setSelectedRecipe(recipe)} // Pass onClick prop
          onFavouriteButtonClick={() => {}} // Pass onFavouriteButtonClick prop
          isFavourite={false} // Pass isFavourite prop
        />
      ))}

      <button className="view-more-button" onClick={handleViewMoreClick}>
        View More
      </button>

      {selectedRecipe && (
        <RecipeModal recipeId={selectedRecipe.id.toString()} onClose={() => setSelectedRecipe(undefined)} />
      )}
    </div>
  );
};

export default App;


