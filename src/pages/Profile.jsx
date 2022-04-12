import React from 'react';
import { Link } from 'react-router-dom';
import { shape } from 'prop-types';
import Header from '../components/Header';
import LowerMenu from '../components/LowerMenu';
import '../CSS/Profile.css';

function Profile({ history }) {
  let userEmail = '';
  if (localStorage.user) {
    userEmail = JSON.parse(localStorage.user);
  }

  const clickLogout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div>
      <Header />
      <h3 data-testid="profile-email" className="user">{userEmail.email}</h3>
      <div className="buttons-ajust">
        <Link to="/done-recipes">
          <button
            type="button"
            data-testid="profile-done-btn"
            className="botton-explore"
          >
            Done Recipes

          </button>
        </Link>
        <Link to="/favorite-recipes">
          <button
            type="button"
            data-testid="profile-favorite-btn"
            className="botton-explore"
          >
            Favorite Recipes
          </button>
        </Link>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ clickLogout }
          className="btn"
        >
          Logout
        </button>
      </div>
      <LowerMenu />
    </div>
  );
}

Profile.propTypes = {
  history: shape,
}.isRequired;

export default Profile;
