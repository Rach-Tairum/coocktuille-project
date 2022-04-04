import React from 'react';
import { string } from 'prop-types';
import { useHistory } from 'react-router';

function StartRecipeBtn({ id, type }) {
  const history = useHistory();

  const inProgressObj = {
    id: '',
    ingredients: [],
  };

  const startRecipe = () => {
    // Colocar o obj da receita no localStorage.inProgressRecipes
    const inProgressList = JSON.parse(localStorage.inProgressRecipes);
    inProgressObj.id = id;
    inProgressList.push(inProgressObj);
    localStorage.inProgressRecipes = JSON.stringify(inProgressList);
    // Redirecionar para a página InProgress
    if (type === 'Meal') {
      history.push(`/foods/${id}/in-progress`);
    } else history.push(`/drinks/${id}/in-progress`);
  };

  return (
    <button
      data-testid="start-recipe-btn"
      type="button"
      className="start"
      onClick={ startRecipe }
    >
      Start Recipe
    </button>
  );
}

export default StartRecipeBtn;
StartRecipeBtn.propTypes = {
  id: string,
  type: string,
}.isRequired;
