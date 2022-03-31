import React from 'react';
import { string, number } from 'prop-types';

function CardIngridient({ name, img, index }) {
  return (
    <div data-testid={ `${index}-ingredient-card` }>
      <img
        data-testid={ `${index}-card-img` }
        src={ img }
        alt={ name }
        width="150"
      />
      <p data-testid={ `${index}-card-name` }>{name}</p>
    </div>
  );
}

export default CardIngridient;

CardIngridient.propTypes = {
  name: string,
  img: string,
  index: number,
}.isRequired;
