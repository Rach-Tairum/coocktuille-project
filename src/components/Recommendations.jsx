import React, { useState, useEffect } from 'react';
import { string } from 'prop-types';
import getDrinkByName from '../services/getDrinkByName';
import getFoodByName from '../services/getFoodByName';
import '../Recommendations.css';

function Recommendations({ type }) {
  const [recommendationsList, setRecommendationsList] = useState([]);
  const [recipesType, setRecipesType] = useState('');

  useEffect(() => {
    const getRecommendations = async () => {
      const maxLengthList = 6;
      if (type === 'Meal') {
        const arrayList = await getDrinkByName('');
        setRecommendationsList(arrayList.slice(0, maxLengthList));
        setRecipesType('Drink');
      }
      if (type === 'Drink') {
        const arrayList = await getFoodByName('');
        setRecommendationsList(arrayList.slice(0, maxLengthList));
        setRecipesType('Meal');
      }
    };
    getRecommendations();
  }, [type]);

  return (
    <div className="wrapper">
      {recommendationsList.map((recipe, index) => (
        <div
          className="card"
          data-testid={ `${index}-recomendation-card` }
          key={ index }
        >
          <img
            src={ recipe[`str${recipesType}Thumb`] }
            alt={ recipe[`str${recipesType}`] }
            width="180"
            className="img-card-recommendation"
          />
          <p
            data-testid={ `${index}-recomendation-title` }
          >
            { recipe[`str${recipesType}`] }

          </p>
        </div>
      ))}
    </div>
  );
}

export default Recommendations;
Recommendations.propTypes = {
  type: string,
}.isRequired;
