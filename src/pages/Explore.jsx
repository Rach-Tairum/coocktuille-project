import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import LowerMenu from '../components/LowerMenu';

function Explore() {
  const history = useHistory();

  return (
    <div>
      <h2>Explore</h2>
      <Header />
      <button
        type="button"
        data-testid="explore-foods"
        onClick={ () => (history.push('/explore/foods')) }
      >
        Explore Foods
      </button>
      <button
        type="button"
        data-testid="explore-drinks"
        onClick={ () => (history.push('/explore/drinks')) }
      >
        Explore Drinks
      </button>
      <LowerMenu />
    </div>
  );
}

export default Explore;
