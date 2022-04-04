import React, { useEffect, useState } from 'react';
import { string, object } from 'prop-types';
import emptyHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';

function FavoriteBtn({ id, type, details }) {
  const [img, setImg] = useState(emptyHeart);

  const favorite = () => {
    if (type === 'Meal') {
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
