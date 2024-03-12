import { useEffect, useState } from "react";
import { RecipeSummary } from "../types";
import * as RecipeAPI from "../api";


const RecipeModal = ({ recipeId }) => {
  const [recipeSummary, setRecipeSummary] = useState()

  useEffect(() => {
    const fetchRecipeSummary = async () => {
      try {
        const summaryRecipe = await RecipeAPI.getRecipeSummary(recipeId)
        setRecipeSummary(summaryRecipe)
      } catch (error) {
        console.log(error)
      }
    }
    fetchRecipeSummary()
  }, [recipeId])

  if (!recipeSummary) {
    return <></>
  }
  return (
    <>
      <div className="overlay"></div>
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <h2>{recipeSummary?.id}</h2>
            <span className="close-btn">&times;</span>
          </div>
          <p dangerouslySetInnerHTML={{ __html: recipeSummary.summary }}></p>
        </div>
      </div>
    </>
  )
}

export default RecipeModal