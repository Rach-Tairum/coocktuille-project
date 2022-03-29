import React from 'react';
import { Link } from 'react-router-dom';
import { shape } from 'prop-types';

function Profile({ history }) {
  const userEmail = JSON.parse(localStorage.user);

  const clickLogout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div>
      <h2>Profile</h2>
      <h3 data-testid="profile-email">{userEmail.email}</h3>
      <Link to="/done-recipes">
        <button type="button" data-testid="profile-done-btn">Done Recipes</button>
      </Link>
      <Link to="/favorite-recipes">
        <button type="button" data-testid="profile-favorite-btn">Favorite Recipes</button>
      </Link>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ clickLogout }
      >
        Logout
      </button>
    </div>
  );
}

Profile.propTypes = {
  history: shape,
}.isRequired;

export default Profile;
