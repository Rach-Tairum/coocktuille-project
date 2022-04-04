import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Header from '../components/Header';
import LowerMenu from '../components/LowerMenu';
import getSurpriseFoods from '../services/getSurpriseFoods';

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
      <h2>Explore Foods</h2>
      <Header />
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => (history.push('/explore/foods/ingredients')) }
      >
        By Ingredient
      </button>

      <button
        type="button"
        data-testid="explore-by-nationality"
        onClick={ () => (history.push('/explore/foods/nationalities')) }
      >
        By Nationality
      </button>

      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ redirectSurpriseMe }
      >
        Surprise me!
      </button>

      <LowerMenu />
    </div>
  );
}

export default ExploreFoods;
