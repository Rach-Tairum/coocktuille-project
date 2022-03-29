import React from 'react';
import { Link } from 'react-router-dom';
import '../LowerMenu.css';
import logoDrink from '../images/drinkIcon.svg';
import logoMeal from '../images/mealIcon.svg';
import logoExplore from '../images/exploreIcon.svg';

function LowerMenu() {
  return (
    <footer data-testid="footer" className="lowerMenu">
      <Link to="/drinks">
        <button
          type="button"
          data-testid="drinks-bottom-btn"
          src={ logoDrink }
        >
          <img src={ logoDrink } alt="imagem de um drinque" />
        </button>
      </Link>
      <Link to="/explore">
        <button
          type="button"
          data-testid="explore-bottom-btn"
          src={ logoExplore }
        >
          <img src={ logoExplore } alt="imagem de uma bússula" />
        </button>
      </Link>
      <Link to="/foods">
        <button
          type="button"
          data-testid="food-bottom-btn"
          src={ logoMeal }
        >
          <img src={ logoMeal } alt="imagem de um prato" />
        </button>
      </Link>
    </footer>
  );
}

export default LowerMenu;
