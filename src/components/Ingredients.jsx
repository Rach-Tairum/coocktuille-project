import React, { useState, useEffect } from 'react';
import { object, string, bool } from 'prop-types';
import { Link } from 'react-router-dom';

function Ingredients({ details, type, inProgress, id }) {
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const [checkbox, setCheckbox] = useState({
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: false,
    10: false,
    11: false,
    12: false,
    13: false,
    14: false,
    15: false,
    16: false,
    17: false,
    18: false,
    19: false,
  });

  const checkFinish = () => {
    if (ingredients.length) {
      const recipesObj = JSON.parse(localStorage.inProgressRecipes);
      let ingredientsList = [];
      if (type === 'Meal') ingredientsList = recipesObj.meals[`${id}`];
      if (type === 'Drink') ingredientsList = recipesObj.cocktails[`${id}`];
      console.log(ingredientsList.length);
      console.log(ingredients.length);
      if (ingredientsList.length === ingredients.length) {
        setIsDisabled(false);
      } else setIsDisabled(true);
    }
  };

  // Feito apenas por conta do teste! Ele apagava o localStorage criado anteriormente!
  const startRecipe = () => {
    const inProgressObj = {
      cocktails: {},
      meals: {},
    };
    if (!localStorage.inProgressRecipes) {
      localStorage.inProgressRecipes = JSON.stringify(inProgressObj);

      const recipesObj = JSON.parse(localStorage.inProgressRecipes);
      if (type === 'Meal') {
        recipesObj.meals[`${id}`] = [];
        localStorage.inProgressRecipes = JSON.stringify(recipesObj);
      } else {
        recipesObj.cocktails[`${id}`] = [];
        localStorage.inProgressRecipes = JSON.stringify(recipesObj);
      }
    }
  };

  useEffect(() => {
    const getIngredients = () => {
      const sizesObj = { Meal: 20, Drink: 15 };
      const ingredientsArray = [];
      const measuresArray = [];
      for (let i = 1; i <= sizesObj[type]; i += 1) {
        if (details[`strIngredient${i}`]) {
          ingredientsArray.push(details[`strIngredient${i}`]);
          measuresArray.push(details[`strMeasure${i}`]);
        }
      }
      setIngredients(ingredientsArray);
      setMeasures(measuresArray);
    };
    getIngredients();
    const getCheckbox = () => {
      startRecipe();
      const recipesObj = JSON.parse(localStorage.inProgressRecipes);
      let ingredientsList = [];
      if (type === 'Meal') ingredientsList = recipesObj.meals[`${id}`];
      if (type === 'Drink') ingredientsList = recipesObj.cocktails[`${id}`];

      const newCheckbox = checkbox;

      ingredientsList.forEach((num) => {
        newCheckbox[`${num}`] = true;
        setCheckbox(newCheckbox);
      });
    };
    getCheckbox();
  }, [details, type, id, checkbox, setCheckbox]);

  const inProgressCheck = (index) => {
    startRecipe();
    const recipesObj = JSON.parse(localStorage.inProgressRecipes);
    let ingredientsList = [];
    if (type === 'Meal') ingredientsList = recipesObj.meals[`${id}`];
    if (type === 'Drink') ingredientsList = recipesObj.cocktails[`${id}`];

    const newCheckbox = checkbox;
    newCheckbox[`${index}`] = !newCheckbox[`${index}`];
    setCheckbox(newCheckbox);

    const found = ingredientsList.filter((num) => num === index);
    if (type === 'Meal') {
      if (!found.length) {
        ingredientsList.push(index);
        recipesObj.meals[`${id}`] = ingredientsList;
        localStorage.inProgressRecipes = JSON.stringify(recipesObj);
      } else {
        const newIngredientsList = ingredientsList.filter((num) => num !== index);
        recipesObj.meals[`${id}`] = newIngredientsList;
        localStorage.inProgressRecipes = JSON.stringify(recipesObj);
      }
    }
    if (type === 'Drink') {
      if (!found.length) {
        ingredientsList.push(index);
        recipesObj.cocktails[`${id}`] = ingredientsList;
        localStorage.inProgressRecipes = JSON.stringify(recipesObj);
      } else {
        const newIngredientsList = ingredientsList.filter((num) => num !== index);
        recipesObj.cocktails[`${id}`] = newIngredientsList;
        localStorage.inProgressRecipes = JSON.stringify(recipesObj);
      }
    }
    checkFinish();
  };

  const isChecked = (index) => checkbox[`${index}`];

  useEffect(() => {
    checkFinish();
  }, [ingredients, checkbox, inProgressCheck]);

  return (
    <div>
      <ul>
        {!inProgress && ingredients.map((ingredient, index) => (
          <li
            data-testid={ `${index}-ingredient-name-and-measure` }
            key={ index }
          >
            {`${measures[index]} ${ingredient}`}
          </li>
        ))}
        {inProgress && ingredients.map((ingredient, index) => (
          <li
            data-testid={ `${index}-ingredient-step` }
            key={ index }
          >
            <input
              type="checkbox"
              id={ `${ingredient}` }
              name={ `${ingredient}` }
              checked={ isChecked(index) }
              onChange={ () => inProgressCheck(index) }
            />
            <label
              htmlFor={ `${ingredient}` }
            >
              {`${measures[index]} ${ingredient}`}
            </label>
          </li>

        ))}
      </ul>
      <Link to="/done-recipes">
        <button
          className="fixed-btn"
          data-testid="finish-recipe-btn"
          type="button"
          disabled={ isDisabled }
        >
          Finish
        </button>
      </Link>
    </div>
  );
}

export default Ingredients;
Ingredients.propTypes = {
  details: object,
  type: string,
  inProgress: bool,
  id: string,
}.isRequired;
