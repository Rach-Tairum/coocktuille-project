import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Header from '../components/Header';
import LowerMenu from '../components/LowerMenu';
import getSurpriseFoods from '../services/getSurpriseFoods';
import '../CSS/ExploreFoods.css';

function ExploreFoods() {
  const history = useHistory();
  const [surpriseMeal, setSurpriseMeal] = useState([]);

  useEffect(() => {
    const fetchSurprise = async () => {
      const surpriseMe = await getSurpriseFoods();
      setSurpriseMeal(surpriseMe);
    };
    fetchSurprise();
  }, []);

  const redirectSurpriseMe = () => {
    const path = surpriseMeal[0].idMeal;
    history.push(`/foods/${path}`);
  };

  return (
    <div>
      <Header />
      <div className="principal-explore-foods">
        <button
          className="botton-explore"
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ () => (history.push('/explore/foods/ingredients')) }
        >
          By Ingredient
        </button>

        <button
          className="botton-explore"
          type="button"
          data-testid="explore-by-nationality"
          onClick={ () => (history.push('/explore/foods/nationalities')) }
        >
          By Nationality
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

export default ExploreFoods;
