import React from 'react';
import { string } from 'prop-types';
import { useHistory } from 'react-router';

function ContinueBtn({ id, type }) {
  const history = useHistory();

  const startRecipe = () => {
    // const recipesObj = JSON.parse(localStorage.inProgressRecipes);
    if (type === 'Meal') {
      // recipesObj.meals[`${id}`] = [];
      // localStorage.inProgressRecipes = JSON.stringify(recipesObj);
      history.push(`/foods/${id}/in-progress`);
    } else {
      // recipesObj.cocktails[`${id}`] = [];
      // localStorage.inProgressRecipes = JSON.stringify(recipesObj);
      history.push(`/drinks/${id}/in-progress`);
    }
  };

  return (
    <button
      data-testid="start-recipe-btn"
      type="button"
      className="fixed-btn"
      onClick={ startRecipe }
    >
      Continue Recipe
    </button>
  );
}

export default ContinueBtn;
ContinueBtn.propTypes = {
  id: string,
  type: string,
}.isRequired;
