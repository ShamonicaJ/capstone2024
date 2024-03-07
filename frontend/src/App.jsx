import React from 'react';
import "./App.css";
import RecipeCard from "./components/RecipeCard";
import { AiOutlineSearch } from "react-icons/ai";

const App = () => {
  return (
    <div className="app-container">
      <div className="header">
        <img src="/koreanfood.jpg"></img>
        <div className="title">Culinary Compass </div>
      </div>
      <div className="tabs">
        <h1>Search</h1>
        <h1>Favorites</h1>
      </div>

      <>
        <form>
          <input
            type="text"
            required
            placeholder="Search for recipes..."
          ></input>
          <button type="submit">
            <AiOutlineSearch size={40} />
          </button>
        </form>

        <div className="recipe-grid">
          <RecipeCard />
        </div>

        <button className="view-more-button">View More</button>
      </>
    </div>
  );
};

export default App;