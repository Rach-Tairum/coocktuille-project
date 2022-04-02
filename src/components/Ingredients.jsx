import React, { useState, useEffect } from 'react';
import { object, string } from 'prop-types';

function Ingredients({ details, type }) {
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);

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
  }, [details, type]);

  return (
    <ul>
      {ingredients.map((ingredient, index) => (
        <li
          data-testid={ `${index}-ingredient-name-and-measure` }
          key={ index }
        >
          {`${measures[index]} ${ingredient}`}
        </li>
      ))}
    </ul>
  );
}

export default Ingredients;
Ingredients.propTypes = {
  details: object,
  type: string,
}.isRequired;
