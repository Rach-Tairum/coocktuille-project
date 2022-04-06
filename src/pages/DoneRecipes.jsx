import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import heartIcon from '../images/whiteHeartIcon.svg';
import ShareBtn from '../components/ShareBtn';

function DoneRecipes() {
  const [doneRecipesList, setDoneRecipesList] = useState([]);
  const [filterRecipes, setFilterRecipes] = useState([]);
  const [getLocalFavorites, setLocalFavorites] = useState([]);

  useEffect(() => {
    const getLocal = localStorage.getItem('doneRecipes');
    const getLocal2 = localStorage.getItem('favoriteRecipes');

    setFilterRecipes(JSON.parse(getLocal));
    setDoneRecipesList(JSON.parse(getLocal));
    setLocalFavorites(JSON.parse(getLocal2));
  }, []);

  const favoritesFoods = () => {
    const favoriteListFoods = doneRecipesList.filter(
      (foods) => foods.type === 'food',
    );
    setFilterRecipes(favoriteListFoods);
  };

  const favoritesDrinks = () => {
    const favoriteListDrinks = doneRecipesList.filter(
      (drinks) => drinks.type === 'drink',
    );
    setFilterRecipes(favoriteListDrinks);
  };

  const favorites = () => {
    setFilterRecipes(doneRecipesList);
  };

  const removeRecipe = ({ target }) => {
    const { id } = target;
    const removeItens = getLocalFavorites.filter((item) => item.id !== id);
    const recipesLocal = JSON.stringify(removeItens);
    localStorage.setItem('favoriteRecipes', recipesLocal);
    setLocalFavorites(removeItens);
  };

  const favoriteRecipe = ({ target }) => {
    const { id } = target;
    const addRecipe = getLocalFavorites.filter((item) => item.id === id);
    if (addRecipe.length === 0) {
      const findRecipe = doneRecipesList.filter((recipe) => recipe.id === id);
      const objRecipeFavorite = findRecipe.map((recipe) => {
        const objFavorite = {
          id: recipe.id,
          type: recipe.type,
          nationality: recipe.nationality,
          category: recipe.category,
          alcoholicOrNot: recipe.alcoholicOrNot,
          name: recipe.name,
          image: recipe.image,
        };
        return (objFavorite);
      });
      const add = [...getLocalFavorites, objRecipeFavorite[0]];
      const recipesLocal = JSON.stringify(add);
      localStorage.setItem('favoriteRecipes', recipesLocal);
      setLocalFavorites(add);
    }
  };

  const renderHearts = (idDone, index) => {
    if (getLocalFavorites !== null) {
      const arrHeart = getLocalFavorites.filter((favorite) => favorite.id === idDone);

      if (arrHeart.length !== 0) {
        return (
          <button
            type="button"
            data-testid={ `${index}-horizontal-favorite-btn` }
            src={ blackHeartIcon }
            onClick={ removeRecipe }
            id={ idDone }
          >
            <img
              id={ idDone }
              src={ blackHeartIcon }
              alt=" ícone de favoritar e desfavoritar item"
            />
          </button>
        );
      }
      return (
        <button
          key={ idDone }
          type="button"
          data-testid={ `${index}-horizontal-favorite-btn` }
          src={ heartIcon }
          onClick={ favoriteRecipe }
          id={ idDone }
        >
          <img
            id={ idDone }
            src={ heartIcon }
            alt=" ícone de favoritar e desfavoritar item"
          />
        </button>
      );
    }
  };

  return (
    <>
      <h2>DoneRecipes</h2>
      <Header />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ favorites }
      >
        All
      </button>

      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ favoritesFoods }
      >
        Foods
      </button>

      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ favoritesDrinks }
      >
        Drinks
      </button>
      { filterRecipes && filterRecipes.map((favoriteItem, index) => (
        <div key={ favoriteItem.id }>
          <Link to={ `/${favoriteItem.type}s/${favoriteItem.id}` }>
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ favoriteItem.image }
              alt="imagem do item favoritado"
              width="100"
            />
          </Link>
          <Link to={ `/${favoriteItem.type}s/${favoriteItem.id}` }>
            <p data-testid={ `${index}-horizontal-name` }>{ favoriteItem.name }</p>
          </Link>
          <p>{ favoriteItem.category }</p>
          { favoriteItem.nationality === ''
            ? (
              <p data-testid={ `${index}-horizontal-top-text` }>
                { favoriteItem.alcoholicOrNot }
              </p>)

            : (
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >

                {`${favoriteItem.nationality} - ${favoriteItem.category}`}

              </p>) }
          <p data-testid={ `${index}-horizontal-done-date` }>{favoriteItem.doneDate}</p>
          {favoriteItem.tags.length !== 0 && favoriteItem.tags.map((tag, i) => (
            <p key={ i } data-testid={ `${index}-${tag}-horizontal-tag` }>
              {tag}
            </p>
          ))}

          <ShareBtn id={ favoriteItem.id } type={ favoriteItem.type } />

          {renderHearts(favoriteItem.id, index)}
        </div>
      )) }
    </>
  );
}

export default DoneRecipes;
