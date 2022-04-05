import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import Header from '../components/Header';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipes() {
  const [doneRecipesList, setDoneRecipesList] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [filterRecipes, setFilterRecipes] = useState([]);

  useEffect(() => {
    const getLocal = localStorage.getItem('doneRecipes');
    console.log(getLocal);
    setFilterRecipes(JSON.parse(getLocal));
    setDoneRecipesList(JSON.parse(getLocal));
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

  const removeItem = ({ target }) => {
    const { id } = target;
    const removeItens = doneRecipesList.filter((item) => item.id !== id);
    setDoneRecipesList(removeItens);
    setFilterRecipes(removeItens);
    const recipesLocal = JSON.stringify(removeItens);
    localStorage.setItem('doneRecipes', recipesLocal);
  };

  const favorites = () => {
    setFilterRecipes(doneRecipesList);
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

          <button
            data-testid={ `${index}-horizontal-share-btn` }
            type="button"
            src={ shareIcon }
            onClick={ () => {
              copy(`http://localhost:3000/${favoriteItem.type}s/${favoriteItem.id}`);
              setToggle(!toggle);
            } }
          >

            { toggle ? <p>Link copied!</p>
              : <img src={ shareIcon } alt="ícone de compartilhar" />}
          </button>

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
    </>
  );
}

export default DoneRecipes;
