import React, { useState } from 'react';
import { shape } from 'prop-types';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import '../CSS/Header.css';

function Header() {
  const [searchBar, setSearchBar] = useState(false);

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

  const toggleBar = () => {
    setSearchBar(!searchBar);
  };

  return (
    <div>
      <Link to="/profile">
        <img
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="Profile"
          className="profile-path"
          width="20"
        />
      </Link>
      <h3 data-testid="page-title" className="foods-title">{title}</h3>
      { hasSearchButton
      && (
        <button
          type="button"
          data-testid="search-top-btn"
          onClick={ toggleBar }
          src={ searchIcon }
          className="search-path"
        >
          <img
            src={ searchIcon }
            alt="Profile"
            width="20"
          />
        </button>)}
      { searchBar && <SearchBar /> }
    </div>
  );
}

export default Header;

Header.propTypes = {
  history: shape,
}.isRequired;
