import React from 'react';
import Header from '../components/Header';

function DoneRecipes() {
  return (
    <>
      <h2>DoneRecipes</h2>
      <Header />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        // onClick={ favorites }
      >
        All
      </button>

      <button
        type="button"
        data-testid="filter-by-food-btn"
        // onClick={ favoritesFoods }
      >
        Foods
      </button>

      <button
        type="button"
        data-testid="filter-by-drink-btn"
        // onClick={ favoritesDrinks }
      >
        Drinks
      </button>
    </>
  );
}

export default DoneRecipes;
