import React from 'react';
import PropTypes from 'prop-types';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

const RecipeCard = ({ recipe, onClick, onFavouriteButtonClick, isFavourite }) => {
    return (
        <div className="recipe-card" onClick={onClick}>
            <img src={recipe.image} alt="Recipe" />
            <div className="recipe-card-title">
                <span onClick={(event) => {
                    event.stopPropagation();
                    onFavouriteButtonClick(recipe);
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

RecipeCard.propTypes = {
    recipe: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
    onFavouriteButtonClick: PropTypes.func.isRequired,
    isFavourite: PropTypes.bool.isRequired,
};

export default RecipeCard;

