import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import getFoodRecipe from '../services/getFoodRecipe';
import getDrinkRecipe from '../services/getDrinkRecipe';
import Ingredients from '../components/Ingredients';
import Recommendations from '../components/Recommendations';
import '../Details.css';

const statusCheck = (id, status, setStatus) => {
  const keys = ['done', 'favorite', 'inProgress'];
  for (let i = 0; i <= 2; i += 1) {
    if (!localStorage[`${keys[i]}Recipes`]) localStorage[`${keys[i]}Recipes`] = '[]';
    const list = JSON.parse(localStorage[`${keys[i]}Recipes`]);
    const found = list.filter((recipe) => recipe.id === id);
    const newStatus = status;
    if (found.length) {
      newStatus[`${keys[i]}`] = true;
      setStatus(newStatus);
    }
  }
};

function InProgress() {
  const history = useHistory();
  const path = history.location.pathname;
  const id = path.replace(/[^0-9]/g, '');
  let type = '';
  if (path.includes('food')) type = 'Meal';
  if (path.includes('drink')) type = 'Drink';

  const [details, setDetails] = useState({});
  const [youtubeCode, setYoutubeCode] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState({
    done: false, favorite: false, inProgress: false,
  });

  useEffect(() => {
    const fetchDetails = async () => {
      if (type === 'Meal') {
        const linkLength = 32;
        const arrayList = await getFoodRecipe(id);
        setDetails(arrayList[0]);
        setYoutubeCode(arrayList[0].strYoutube.substr(linkLength));
        setCategory(arrayList[0].strCategory);
      } else {
        const arrayList = await getDrinkRecipe(id);
        setDetails(arrayList[0]);
        setCategory(arrayList[0].strAlcoholic);
      }
    };
    statusCheck(id, status, setStatus);
    fetchDetails();
  }, [id, type, status]);

  console.log(details);

  return (
    <div>
      <h2>InProgress</h2>
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
        inProgress
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
        data-testid="finish-recipe-btn"
        type="button"
      >
        Finish
      </button>
    </div>
  );
}

export default InProgress;
