import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import ShareBtn from '../components/ShareBtn';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteRecipes() {
  const [favoriteRecipesList, setFavoriteRecipesList] = useState([]);
  const [filterRecipes, setFilterRecipes] = useState([]);

  useEffect(() => {
    const getLocal = localStorage.getItem('favoriteRecipes');
    console.log(getLocal);
    setFilterRecipes(JSON.parse(getLocal));
    setFavoriteRecipesList(JSON.parse(getLocal));
  }, []);

  const favoritesFoods = () => {
    const favoriteListFoods = favoriteRecipesList.filter(
      (foods) => foods.type === 'food',
    );
    setFilterRecipes(favoriteListFoods);
  };

  const favoritesDrinks = () => {
    const favoriteListDrinks = favoriteRecipesList.filter(
      (drinks) => drinks.type === 'drink',
    );
    setFilterRecipes(favoriteListDrinks);
  };

  console.log(filterRecipes, 'filter');

  const removeItem = ({ target }) => {
    const { id } = target;
    const removeItens = favoriteRecipesList.filter((item) => item.id !== id);
    setFavoriteRecipesList(removeItens);
    setFilterRecipes(removeItens);
    const recipesLocal = JSON.stringify(removeItens);
    localStorage.setItem('favoriteRecipes', recipesLocal);
  };

  const favorites = () => {
    setFilterRecipes(favoriteRecipesList);
  };

  return (
    <div>
      <h2>FavoriteRecipes</h2>
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

          <ShareBtn id={ favoriteItem.id } type={ favoriteItem.type } />

          <button
            type="button"
            data-testid={ `${index}-horizontal-favorite-btn` }
            src={ blackHeartIcon }
            onClick={ removeItem }
            id={ favoriteItem.id }
          >
            <img
              id={ favoriteItem.id }
              src={ blackHeartIcon }
              alt=" ícone de favoritar e desfavoritar item"
            />
          </button>

        </div>
      )) }
    </div>
  );
}

export default FavoriteRecipes;
