import React from 'react';
import { useHistory } from 'react-router';
import getDrinkByFirstLetter from '../services/getDrinkByFirstLetter';
import getDrinkByIngredient from '../services/getDrinkByIngredient';
import getDrinkByName from '../services/getDrinkByName';
import getFoodByFirstLetter from '../services/getFoodByFirstLetter';
import getFoodByIngredient from '../services/getFoodByIngredient';
import getFoodByName from '../services/getFoodByName';

function SearchBar() {
  const history = useHistory();
  const path = history.location.pathname;

  const fetchInFoods = async (selected, inputText) => {
    let result = [];
    if (selected === 'ingredientRadio') {
      result = await getFoodByIngredient(inputText);
    }
    if (selected === 'nameRadio') {
      result = await getFoodByName(inputText);
    }
    if (selected === 'firstRadio') {
      result = await getFoodByFirstLetter(inputText);
    }
    console.log(result);
  };

  const fetchInDrinks = async (selected, inputText) => {
    let result = [];
    if (selected === 'ingredientRadio') {
      result = await getDrinkByIngredient(inputText);
    }
    if (selected === 'nameRadio') {
      result = await getDrinkByName(inputText);
    }
    if (selected === 'firstRadio') {
      result = await getDrinkByFirstLetter(inputText);
    }
    console.log(result);
  };

  const submitSearch = () => {
    const selected = document.querySelector('input[type=\'radio\']:checked').id;
    const inputText = document.querySelector('#searchInput').value;

    if (selected === 'firstRadio' && inputText.length >= 2) {
      alert('Your search must have only 1 (one) character');
    } else {
      if (path === '/foods') fetchInFoods(selected, inputText);
      if (path === '/drinks') fetchInDrinks(selected, inputText);
    }
  };

  return (
    <div>
      <label htmlFor="searchInput">
        Search:
        <input
          data-testid="search-input"
          id="searchInput"
          type="text"
        />
      </label>
      <section>

        <label htmlFor="ingredientRadio">
          Ingredient
          <input
            data-testid="ingredient-search-radio"
            id="ingredientRadio"
            name="search"
            type="radio"
          />
        </label>
        <label htmlFor="nameRadio">
          Name
          <input
            data-testid="name-search-radio"
            id="nameRadio"
            name="search"
            type="radio"
          />
        </label>
        <label htmlFor="firstRadio">
          First Letter
          <input
            data-testid="first-letter-search-radio"
            id="firstRadio"
            name="search"
            type="radio"
          />
        </label>
        <button
          data-testid="exec-search-btn"
          type="button"
          onClick={ submitSearch }
        >
          Search
        </button>
      </section>
    </div>
  );
}

export default SearchBar;
