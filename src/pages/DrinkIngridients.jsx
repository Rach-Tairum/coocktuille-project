import React, { useEffect, useState } from 'react';
import CardIngridient from '../components/CardIngridients';
import LowerMenu from '../components/LowerMenu';
import getListOfDrinkByIngredients from '../services/getListOfDrinkIngridients';

function DrinkIngredients() {
  const [drinkIngredientsList, setdrinkIngredientsList] = useState([]);

  useEffect(() => {
    const fetchList = async () => {
      const maxLengthFoodList = 12;
      const arrayList = await getListOfDrinkByIngredients();
      const arrayReduzido = arrayList.slice(0, maxLengthFoodList);
      setdrinkIngredientsList(arrayReduzido);
    };
    fetchList();
  }, []);
  return (
    <div>
      <h2>Drink Ingredients</h2>
      {drinkIngredientsList.map(
        (ingridient, index) => (
          <CardIngridient
            key={ index }
            index={ index }
            name={ ingridient.strIngredient1 }
            img={ `https://www.thecocktaildb.com/images/ingredients/${ingridient.strIngredient1}-Small.png` }
          />),
      )}
      <LowerMenu />
    </div>
  );
}

export default DrinkIngredients;
