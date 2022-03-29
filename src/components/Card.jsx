import React from 'react';
import PropTypes from 'prop-types';

function Card({ name, img, index }) {
  return (
    <div key={ index } data-testid={ `${index}-recipe-card` }>
      <img
        data-testid={ `${index}-card-img` }
        src={ img }
        alt={ name }
      />
      <p data-testid={ `${index}-card-name` }>{name}</p>
    </div>
  );
}

Card.propTypes = {
  index: PropTypes.number.isRequired,
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Card;
