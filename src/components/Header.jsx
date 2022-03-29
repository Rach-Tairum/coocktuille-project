import React from 'react';
import { shape } from 'prop-types';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const history = useHistory();
  const path = history.location.pathname;
  let title = '';
  let hasSearchButton = false;

  const setHeader = () => {
    if (path === '/foods') {
      title = 'Foods';
      hasSearchButton = true;
    }
    if (path === '/drinks') {
      title = 'Drinks';
      hasSearchButton = true;
    }
    if (path === '/explore') title = 'Explore';
    if (path === '/explore/drinks') title = 'Explore Drinks';
    if (path === '/explore/foods') title = 'Explore Foods';
    if (path === '/explore/foods/ingredients') title = 'Explore Ingredients';
    if (path === '/explore/drinks/ingredients') title = 'Explore Ingredients';
    if (path === '/explore/foods/nationalities') {
      title = 'Explore Nationalities';
      hasSearchButton = true;
    }
    if (path === '/profile') title = 'Profile';
    if (path === '/done-recipes') title = 'Done Recipes';
    if (path === '/favorite-recipes') title = 'Favorite Recipes';
  };

  setHeader();

  return (
    <div>
      <Link to="/profile">
        <img
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="Profile"
        />
      </Link>
      <h3 data-testid="page-title">{title}</h3>
      { hasSearchButton && <img
        data-testid="search-top-btn"
        src={ searchIcon }
        alt="Profile"
      />}
    </div>
  );
}

export default Header;

Header.propTypes = {
  history: shape,
}.isRequired;
