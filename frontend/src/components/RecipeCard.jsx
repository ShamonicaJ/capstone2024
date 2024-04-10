import { Recipe } from "../types";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const RecipeCard = ({
  recipe,
  onClick,
  onFavouriteButtonClick, // Make sure this prop is correctly passed
  isFavourite,
}) => {
  return (
    <div className="recipe-card" onClick={onClick}>
      <img src={recipe.image} alt={recipe.title} />
      <div className="recipe-card-title">
        <span onClick={(event) => {
          event.stopPropagation(); // Prevent click from bubbling to parent elements
          onFavouriteButtonClick(recipe); // Pass the recipe object to the callback
        }}>
          {isFavourite ? (
            <AiFillHeart size={25} color="red" />
          ) : (
            <AiOutlineHeart size={25} />
          )}
        </span>
        <h3>{recipe.title}</h3>
      </div>
    </div>
  );
};

export default RecipeCard;