import React, { useEffect, useState } from 'react';
import { string, object } from 'prop-types';
import emptyHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
import getFoodRecipe from '../services/getFoodRecipe';
import getDrinkRecipe from '../services/getDrinkRecipe';

function FavoriteBtn({ id, type }) {
  const [img, setImg] = useState(emptyHeart);
  const [details, setDetails] = useState({});

  useEffect(() => {
    const fetchDetails = async () => {
      if (type === 'Meal' || type === 'food') {
        const arrayList = await getFoodRecipe(id);
        setDetails(arrayList[0]);
      } else {
        const arrayList = await getDrinkRecipe(id);
        setDetails(arrayList[0]);
      }
    };
    fetchDetails();
  });

  const favorite = () => {
    if (type === 'Meal' || type === 'food') {
      const favoriteObj = {
        id,
        type: 'food',
        nationality: details.strArea,
        category: details.strCategory,
        alcoholicOrNot: '',
        name: details.strMeal,
        image: details.strMealThumb,
      };
      const favoriteList = JSON.parse(localStorage.favoriteRecipes);
      favoriteList.push(favoriteObj);
      localStorage.favoriteRecipes = JSON.stringify(favoriteList);
    } else {
      const favoriteObj = {
        id,
        type: 'drink',
        nationality: '',
        category: details.strCategory,
        alcoholicOrNot: details.strAlcoholic,
        name: details.strDrink,
        image: details.strDrinkThumb,
      };
      const favoriteList = JSON.parse(localStorage.favoriteRecipes);
      favoriteList.push(favoriteObj);
      localStorage.favoriteRecipes = JSON.stringify(favoriteList);
    }
  };

  const favoriteStatus = () => {
    const favoriteList = JSON.parse(localStorage.favoriteRecipes);
    const found = favoriteList.filter((recipe) => recipe.id === id);
    if (found.length) {
      setImg(emptyHeart);
      const newList = favoriteList.filter((recipe) => recipe.id !== id);
      localStorage.favoriteRecipes = JSON.stringify(newList);
    } else {
      setImg(blackHeart);
      favorite();
    }
  };

  useEffect(() => {
    const checkStatus = () => {
      if (localStorage.favoriteRecipes) {
        const favoriteList = JSON.parse(localStorage.favoriteRecipes);
        const found = favoriteList.filter((recipe) => recipe.id === id);
        if (found.length) setImg(blackHeart);
      }
    };
    checkStatus();
  }, [id]);

  return (
    <button
      data-testid="favorite-btn"
      type="button"
      onClick={ favoriteStatus }
      src={ img }
      className="favotite-btn"
    >
      <img src={ img } alt="Favorite" />
    </button>);
}

export default FavoriteBtn;
FavoriteBtn.propTypes = {
  id: string,
  type: string,
  details: object,
}.isRequired;
