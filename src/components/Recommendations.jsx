import React, { useState, useEffect } from 'react';
import { string } from 'prop-types';
import getDrinkByName from '../services/getDrinkByName';
import getFoodByName from '../services/getFoodByName';

function Recommendations({ type }) {
  const [recommendationsList, setRecommendationsList] = useState([]);

  useEffect(() => {
    const getRecommendations = async () => {
      const maxLengthList = 6;
      if (type === 'Meal') {
        const arrayList = await getDrinkByName('');
        setRecommendationsList(arrayList.slice(0, maxLengthList));
      }
      if (type === 'Drink') {
        const arrayList = await getFoodByName('');
        setRecommendationsList(arrayList.slice(0, maxLengthList));
      }
    };
    getRecommendations();
  }, [type]);

  return (
    <ul>
      {recommendationsList.map((recipe, index) => (
        <li
          data-testid={ `${index}-recomendation-card` }
          key={ index }
        >
          { recipe[`str${type}`] }
        </li>
      ))}
    </ul>
  );
}

export default Recommendations;
Recommendations.propTypes = {
  type: string,
}.isRequired;
