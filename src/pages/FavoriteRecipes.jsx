import React, { useState, useEffect } from 'react';
import copy from 'clipboard-copy';
import Header from '../components/Header';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

function FavoriteRecipes() {
  const [favoriteRecipesList, setFavoriteRecipesList] = useState([]);
  const [toggle, setToggle] = useState(false);
  useEffect(() => {
    setFavoriteRecipesList(JSON.parse(localStorage.favoriteRecipes));
  }, []);

  console.log(favoriteRecipesList, 'listFavorites');

  // a foto da receita, o nome, a categoria, a nacionalidade

  return (
    <div>
      <h2>FavoriteRecipes</h2>
      <Header />

      <button
        type="button"
        data-testid="filter-by-all-btn"
      >
        All
      </button>

      <button
        type="button"
        data-testid="filter-by-food-btn"
      >
        Foods
      </button>

      <button
        type="button"
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>

      { favoriteRecipesList.map((favoriteItem, index) => (
        <div key={ favoriteItem.id }>
          <img
            data-testid={ `${index}-horizontal-image` }
            src={ favoriteItem.image }
            alt="imagem do item favoritado"
            width="100"
          />
          <p data-testid={ `${index}-horizontal-name` }>{ favoriteItem.name }</p>
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

          <button
            data-testid={ `${index}-horizontal-share-btn` }
            type="button"
            src={ shareIcon }
            onClick={ () => {
              // http://localhost:3000/favorite-recipes
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
          >
            <img src={ blackHeartIcon } alt=" ícone de favoritar e desfavoritar item" />
          </button>

        </div>
      )) }
    </div>
  );
}

export default FavoriteRecipes;
