import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import LowerMenu from '../components/LowerMenu';
import '../CSS/Explore.css';

function Explore() {
  const history = useHistory();

  return (
    <div>
      <Header />

      <div className="princial-explore">
        <button
          className="botton-explore"
          type="button"
          data-testid="explore-foods"
          onClick={ () => (history.push('/explore/foods')) }
        >
          Explore Foods
        </button>

        <button
          className="botton-explore"
          type="button"
          data-testid="explore-drinks"
          onClick={ () => (history.push('/explore/drinks')) }
        >
          Explore Drinks
        </button>

      </div>
      <LowerMenu />
    </div>
  );
}

export default Explore;
