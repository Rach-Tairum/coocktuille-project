import React from 'react';
import { string, number } from 'prop-types';
import '../CSS/Card.css';

function Card({ name, img, index }) {
  return (
    <div data-testid={ `${index}-recipe-card` } className="card-item">
      <img
        data-testid={ `${index}-card-img` }
        src={ img }
        alt={ name }
        width="150"
      />
      <p data-testid={ `${index}-card-name` } className="card-item-p">{name}</p>
    </div>
  );
}

export default Card;
Card.propTypes = {
  name: string,
  img: string,
  index: number,
}.isRequired;
