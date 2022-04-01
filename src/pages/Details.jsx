import React from 'react';

function Details() {
  return (
    <>
      <h2>Details</h2>
      <img data-testid="recipe-photo" alt="Recipe Img" />
      <h3 data-testid="recipe-title">Title</h3>
      <h5 data-testid="recipe-category">Category</h5>
      <button
        data-testid="share-btn"
        type="button"
      >
        Share
      </button>
      <button
        data-testid="favorite-btn"
        type="button"
      >
        Favorite
      </button>
      <ul>
        <li data-testid="0-ingredient-name-and-measure">Ingredient</li>
      </ul>
      <p data-testid="instructions">Instructions</p>
      <iframe data-testid="video" width="320" height="180" src="https://www.youtube.com/embed/lJIrF4YjHfQ" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" />
      <div data-testid="0-recomendation-card">Recommendations</div>
      <button
        data-testid="start-recipe-btn"
        type="button"
      >
        Start Recipe
      </button>
    </>
  );
}

export default Details;
