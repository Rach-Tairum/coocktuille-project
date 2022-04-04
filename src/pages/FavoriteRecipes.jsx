import React, { useState, useEffect } from 'react';
import Header from '../components/Header';

function FavoriteRecipes() {
  const [favoriteRecipesList, setFavoriteRecipesList] = useState([]);

  useEffect(() => {
    setFavoriteRecipesList(JSON.parse(localStorage.favoriteRecipes));
  }, []);

  console.log(favoriteRecipesList, 'listFavorites');

  // a foto da receita, o nome, a categoria, a nacionalidade

  return (
    <div>
      <h2>FavoriteRecipes</h2>
      <Header />

      { favoriteRecipesList.map((favoriteItem) => (
        <div key={ favoriteItem.id }>
          <img src={ favoriteItem.image } alt="imagem do item favoritado" width="100" />
          <p>{ favoriteItem.name }</p>
          <p>{ favoriteItem.category }</p>
          { favoriteItem.nationality === ''
            ? <p>{ favoriteItem.alcoholicOrNot }</p>
            : <p>{ favoriteItem.na }</p> }

          <button
            type="button"
          >
            Compartilhar
          </button>

          <button
            type="button"
          >
            Desfavoritar
          </button>

        </div>
      )) }
    </div>
  );
}

export default FavoriteRecipes;
