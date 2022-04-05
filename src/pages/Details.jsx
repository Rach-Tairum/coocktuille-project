import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import getFoodRecipe from '../services/getFoodRecipe';
import getDrinkRecipe from '../services/getDrinkRecipe';
import Ingredients from '../components/Ingredients';
import Recommendations from '../components/Recommendations';
import '../Details.css';
import StartRecipeBtn from '../components/StartRecipeBtn';
import FavoriteBtn from '../components/FavoriteBtn';
import ContinueBtn from '../components/ContinueBtn';

const inProgressStatus = (id, idList, status, setStatus) => {
  const newStatus = status;
  const found = idList.filter((recipeId) => recipeId === id);
  if (found.length) {
    newStatus.inProgress = true;
    setStatus(newStatus);
  }
};

const inProgressCheck = (id, type, status, setStatus) => {
  const inProgressObj = {
    cocktails: {},
    meals: {},
  };
  if (!localStorage.inProgressRecipes) {
    localStorage.inProgressRecipes = JSON.stringify(inProgressObj);
  }
  const recipesObj = JSON.parse(localStorage.inProgressRecipes);
  if (type === 'Meal') {
    const idList = Object.keys(recipesObj.meals);
    inProgressStatus(id, idList, status, setStatus);
  } else {
    const idList = Object.keys(recipesObj.cocktails);
    inProgressStatus(id, idList, status, setStatus);
  }
};

const statusCheck = (id, status, setStatus) => {
  const keys = ['done', 'favorite'];
  for (let i = 0; i <= 1; i += 1) {
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
    inProgressCheck(id, type, status, setStatus);
    fetchDetails();
  }, [id, type, status]);

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
      <FavoriteBtn
        id={ id }
        type={ type }
        details={ details }
      />
      <Ingredients
        details={ details }
        type={ type }
        inProgress={ false }
        id={ id }
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
      {!status.done && !status.inProgress && <StartRecipeBtn
        id={ id }
        type={ type }
      />}
      {status.inProgress && <ContinueBtn
        id={ id }
        type={ type }
      />}
    </div>
  );
}

export default Details;
