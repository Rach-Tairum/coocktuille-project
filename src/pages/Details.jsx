import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import getFoodRecipe from '../services/getFoodRecipe';
import getDrinkRecipe from '../services/getDrinkRecipe';
import Ingredients from '../components/Ingredients';
import Recommendations from '../components/Recommendations';

function Details() {
  const history = useHistory();
  const path = history.location.pathname;
  const id = path.replace(/[^0-9]/g, '');
  let type = '';
  if (path.includes('food')) type = 'Meal';
  if (path.includes('drink')) type = 'Drink';

  const [details, setDetails] = useState({});
  const [youtubeCode, setYoutubeCode] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    const fetchDetails = async () => {
      if (type === 'Meal') {
        const linkLength = 32;
        const arrayList = await getFoodRecipe(id);
        setDetails(arrayList[0]);
        setYoutubeCode(arrayList[0].strYoutube.substr(linkLength));
        setCategory(arrayList[0].strCategory);
      }
      if (type === 'Drink') {
        const arrayList = await getDrinkRecipe(id);
        setDetails(arrayList[0]);
        setCategory(arrayList[0].strAlcoholic);
      }
    };
    fetchDetails();
  }, [id, type]);

  console.log(details);

  return (
    <div>
      <h2>Details</h2>
      <img
        data-testid="recipe-photo"
        src={ details[`str${type}Thumb`] }
        alt="Recipe Img"
        width="360"
      />
      <h2 data-testid="recipe-title">{ details[`str${type}`] }</h2>
      <h4 data-testid="recipe-category">{ category }</h4>
      <button
        data-testid="share-btn"
        type="button"
      >
        Share
      </button>
      <button
        data-testid="favorite-btn"
        type="button"
      >
        Favorite
      </button>
      <Ingredients
        details={ details }
        type={ type }
      />
      <p data-testid="instructions">{ details.strInstructions }</p>
      {youtubeCode && <iframe
        data-testid="video"
        width="320"
        height="180"
        src={ `https://youtube.com/embed/${youtubeCode}` }
        title="YouTube video player"
        frameBorder="0"
      />}
      <Recommendations
        type={ type }
      />
      <button
        data-testid="start-recipe-btn"
        type="button"
      >
        Start Recipe
      </button>
    </div>
  );
}

export default Details;
