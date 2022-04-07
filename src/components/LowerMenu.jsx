import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/LowerMenu.css';
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
          className="buttonMenu"
        >
          <img src={ logoDrink } alt="imagem de um drinque" className="image" />
        </button>
      </Link>
      <Link to="/explore">
        <button
          type="button"
          data-testid="explore-bottom-btn"
          src={ logoExplore }
          className="buttonMenu"
        >
          <img src={ logoExplore } alt="imagem de uma bússula" className="image" />
        </button>
      </Link>
      <Link to="/foods">
        <button
          type="button"
          data-testid="food-bottom-btn"
          src={ logoMeal }
          className="buttonMenu"
        >
          <img src={ logoMeal } alt="imagem de um prato" className="image" />
        </button>
      </Link>
    </footer>
  );
}

export default LowerMenu;
