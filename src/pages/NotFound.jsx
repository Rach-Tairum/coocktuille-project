import React from 'react';
import { Link } from 'react-router-dom';
import logoDrink from '../images/drinkIcon.svg';
import logoMeal from '../images/mealIcon.svg';
import logoExplore from '../images/exploreIcon.svg';
import '../CSS/NotFound.css';

function NotFound() {
  return (
    <div>
      <img className="gif2" src="https://media.giphy.com/media/ncwJhdomR6k21G7mhb/giphy.gif" alt="apresentadora do masterchef para tudo" />
      <h3 className="não-encontrado">
        Você chegou a uma página não encontrada!
      </h3>
      <img className="gif2" src="https://media.giphy.com/media/cdSm8Izqv9Yq121mVm/giphy.gif" alt="Paola Carrocella ops" />
      <h3 className="nao-encontrado2">Por favor, volte para uma página válida.</h3>

      <div className="lowerMenu2">
        <Link to="/drinks">
          <button
            type="button"
            data-testid="drinks-bottom-btn"
            src={ logoDrink }
            className="buttonMenu-noFound"
          >
            Drinks
          </button>
        </Link>
        <Link to="/explore">
          <button
            type="button"
            data-testid="explore-bottom-btn"
            src={ logoExplore }
            className="buttonMenu-noFound"
          >
            Explore
          </button>
        </Link>
        <Link to="/foods">
          <button
            type="button"
            data-testid="food-bottom-btn"
            src={ logoMeal }
            className="buttonMenu-noFound"
          >
            Foods
          </button>
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
