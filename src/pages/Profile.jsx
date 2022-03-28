import React from 'react';

function Profile() {
  const userEmail = JSON.parse(localStorage.user);
  return (
    <div>
      <h2>Profile</h2>
      <h3 data-testid="profile-email">{userEmail.email}</h3>
      <button type="button" data-testid="profile-done-btn">Done Recipes</button>
      <button type="button" data-testid="profile-favorite-btn">Favorite Recipes</button>
      <button type="button" data-testid="profile-logout-btn">Logout</button>
    </div>
  );
}

export default Profile;
