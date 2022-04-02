import React from 'react';
import { string, number } from 'prop-types';

function CardIngredient({ name, img, index, onClick }) {
  return (
    <button
      type="button"
      id={ name }
      onClick={ onClick }
      data-testid={ `${index}-ingredient-card` }
    >
      <img
        data-testid={ `${index}-card-img` }
        id={ name }
        src={ img }
        alt={ name }
        width="150"
      />
      <p id={ name } data-testid={ `${index}-card-name` }>{name}</p>
    </button>
  );
}

export default CardIngredient;

CardIngredient.propTypes = {
  name: string,
  img: string,
  index: number,
}.isRequired;
