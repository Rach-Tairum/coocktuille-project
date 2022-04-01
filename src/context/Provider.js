import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const MyContext = createContext();

function Provider({ children }) {
  const [foodList, setFoodList] = useState([]);
  const [drinkList, setDrinkList] = useState([]);
  const [recipesByCategory, setRecipesByCategory] = useState([]);
  const [recipesByIngredients, setRecipesByIngredients] = useState([]);
  const [recipesIngredientsDrink, setRecipesIngredientsDrink] = useState([]);

  const contextValues = {
    foodList,
    setFoodList,
    drinkList,
    setDrinkList,
    recipesByCategory,
    setRecipesByCategory,
    recipesByIngredients,
    setRecipesByIngredients,
    recipesIngredientsDrink,
    setRecipesIngredientsDrink,
  };

  return (
    <MyContext.Provider value={ contextValues }>
      { children }
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default Provider;
