import React, { useState, useEffect } from 'react';
import { object, string, bool } from 'prop-types';
import { Link } from 'react-router-dom';

function Ingredients({ details, type, inProgress, id }) {
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [list, setList] = useState([]);
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
      if (ingredientsList !== undefined) {
        if (ingredientsList.length === ingredients.length) {
          setIsDisabled(false);
        } else setIsDisabled(true);
      }
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
      if (ingredientsList !== undefined) {
        ingredientsList.forEach((num) => {
          newCheckbox[`${num}`] = true;
          setCheckbox(newCheckbox);
        });
      }
    };
    getCheckbox();
  }, [details, type, id, checkbox, setCheckbox]);

  const inProgressCheck = (index) => {
    startRecipe();
    const recipesObj = JSON.parse(localStorage.inProgressRecipes);

    let ingredientsList = [];
    if (type === 'Meal') {
      if (recipesObj.meals[`${id}`] === undefined) recipesObj.meals[`${id}`] = [];
      ingredientsList = recipesObj.meals[`${id}`];
    } else {
      if (recipesObj.cocktails[`${id}`] === undefined) recipesObj.cocktails[`${id}`] = [];
      ingredientsList = recipesObj.cocktails[`${id}`];
    }

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
    setList([...list, index]);
  };

  const isChecked = (index) => checkbox[`${index}`];

  useEffect(() => {
    checkFinish();
  }, [ingredients, checkbox]);

  const getAtualDate = () => {
    const data = new Date();
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
  };

  const finishRecipe = () => {
    let tagsOk = [];

    if (details.strTags !== null) {
      tagsOk = details.strTags.split(', ');
    }
    const local = JSON.parse(localStorage.getItem('doneRecipes'));

    if (type === 'Meal') {
      const obj = {
        id,
        type: 'food',
        nationality: details.strArea,
        category: details.strCategory,
        alcoholicOrNot: '',
        name: details.strMeal,
        image: details.strMealThumb,
        doneDate: getAtualDate(),
        tags: tagsOk,
      };
      const newArr = [...local, obj];
      localStorage.setItem('doneRecipes', JSON.stringify(newArr));
    }

    if (type === 'Drink') {
      const obj = {
        id,
        type: 'drink',
        nationality: '',
        category: details.strCategory,
        alcoholicOrNot: details.strAlcoholic,
        name: details.strDrink,
        image: details.strDrinkThumb,
        doneDate: getAtualDate(),
        tags: tagsOk,
      };
      const newArr = [...local, obj];
      localStorage.setItem('doneRecipes', JSON.stringify(newArr));
    }
  };

  return (
    <div>
      <ul className="ul-ingredients">
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
          onClick={ finishRecipe }
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
