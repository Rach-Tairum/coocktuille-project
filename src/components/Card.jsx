import React from 'react';
import { string, number } from 'prop-types';

function Card({ name, img, index }) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
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

export default Card;
Card.propTypes = {
  name: string,
  img: string,
  index: number,
}.isRequired;
