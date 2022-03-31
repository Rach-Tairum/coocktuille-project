import React from 'react';
import Header from '../components/Header';
import LowerMenu from '../components/LowerMenu';

function Explore() {
  return (
    <div>
      <h2>Explore</h2>
      <Header />
      <button type="button" data-testid="explore-foods">Explore Foods</button>
      <button type="button" data-testid="explore-drinks">Explore Drinks</button>
      <LowerMenu />
    </div>
  );
}

export default Explore;
