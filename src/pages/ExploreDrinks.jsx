import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Header from '../components/Header';
import LowerMenu from '../components/LowerMenu';
import getSurpriseDrink from '../services/getDrinkSurprise';
import '../CSS/ExploreFoods.css';

function ExploreDrinks() {
  const history = useHistory();
  const [surpriseDrink, setSurpriseDrink] = useState([]);

  useEffect(() => {
    const fetchSurprise = async () => {
      const surpriseMe = await getSurpriseDrink();
      setSurpriseDrink(surpriseMe);
    };
    fetchSurprise();
  }, []);

  const redirectSurpriseMe = () => {
    const path = surpriseDrink[0].idDrink;
    history.push(`/drinks/${path}`);
  };

  return (
    <div>
      <Header />
      <div className="principal-explore-foods">
        <button
          className="botton-explore"
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ () => (history.push('/explore/drinks/ingredients')) }
        >
          By Ingredient
        </button>

        <button
          className="botton-explore"
          type="button"
          data-testid="explore-surprise"
          onClick={ redirectSurpriseMe }
        >
          Surprise me!
        </button>

      </div>
      <LowerMenu />
    </div>
  );
}

export default ExploreDrinks;
