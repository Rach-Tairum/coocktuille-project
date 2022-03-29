import React from 'react';

function SearchBar() {
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
        >
          Search
        </button>
      </section>
    </div>
  );
}

export default SearchBar;
