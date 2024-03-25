import React, { useEffect, useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import * as RecipeAPI from "../api";

const RecipeModal = ({ recipeId, onClose }) => {
  const [recipeSummary, setRecipeSummary] = useState();

  useEffect(() => {
    const fetchRecipeSummary = async () => {
      try {
        const summaryRecipe = await RecipeAPI.getRecipeSummary(recipeId);
        setRecipeSummary(summaryRecipe);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRecipeSummary();
  }, [recipeId]);

  if (!recipeSummary) {
    return <></>;
  }

  return (
    <>
      <div className="overlay"></div>
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <h2>{recipeSummary.title}</h2>
            <span className="close-btn" onClick={onClose}>
              &times;
            </span>
          </div>
          <p dangerouslySetInnerHTML={{ __html: recipeSummary.summary }}></p>
        </div>
      </div>
    </>
  );
};

// Define prop types for recipeId and onClose
RecipeModal.propTypes = {
  recipeId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default RecipeModal;