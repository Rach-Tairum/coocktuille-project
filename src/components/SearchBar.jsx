import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import { MyContext } from '../context/Provider';
import getDrinkByFirstLetter from '../services/getDrinkByFirstLetter';
import getDrinkByIngredient from '../services/getDrinkByIngredient';
import getDrinkByName from '../services/getDrinkByName';
import getFoodByFirstLetter from '../services/getFoodByFirstLetter';
import getFoodByIngredient from '../services/getFoodByIngredient';
import getFoodByName from '../services/getFoodByName';
import '../CSS/SearchBar.css';

function SearchBar() {
  const history = useHistory();
  const path = history.location.pathname;
  const maxLengthList = 12;
  const {
    setFoodList, setDrinkList,
    setRecipesByCategory,
  } = useContext(MyContext);

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
    // Se encontra alguma receita joga no Context, senão exibe alerta
    if (result) {
      if (result.length > maxLengthList) result = result.slice(0, maxLengthList);
      setFoodList(result);
      setRecipesByCategory(result);
    } else alert('Sorry, we haven\'t found any recipes for these filters.');
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
    // Se encontra alguma receita joga no Context, senão exibe alerta
    if (result) {
      if (result.length > maxLengthList) result = result.slice(0, maxLengthList);
      setDrinkList(result);
      setRecipesByCategory(result);
    } else alert('Sorry, we haven\'t found any recipes for these filters.');
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
    <div className="search-all">
      <label htmlFor="searchInput" className="login-label">
        Search:
        <input
          data-testid="search-input"
          id="searchInput"
          type="text"
          className="login-input"
        />
      </label>

      <section className="search-all-2">
        <label htmlFor="ingredientRadio" className="login-label">
          Ingredient
          <input
            data-testid="ingredient-search-radio"
            id="ingredientRadio"
            name="search"
            type="radio"
            className="radio-search"
          />
        </label>
        <label htmlFor="nameRadio" className="login-label">
          Name
          <input
            data-testid="name-search-radio"
            id="nameRadio"
            name="search"
            type="radio"
            className="radio-search"
          />
        </label>
        <label htmlFor="firstRadio" className="login-label">
          First Letter
          <input
            data-testid="first-letter-search-radio"
            id="firstRadio"
            name="search"
            type="radio"
            className="radio-search"
          />
        </label>
        <button
          data-testid="exec-search-btn"
          type="button"
          onClick={ submitSearch }
          className="button-search"
        >
          Search
        </button>
      </section>
    </div>
  );
}

export default SearchBar;
