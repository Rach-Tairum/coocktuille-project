import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import CardIngredient from '../components/CardIngredient';
import LowerMenu from '../components/LowerMenu';
import { MyContext } from '../context/Provider';
import getDrinkByIngredient from '../services/getDrinkByIngredient';
import getListOfDrinkByIngredients from '../services/getListOfDrinkByIngredients';

function DrinkIngredients() {
  const [drinkIngredientsList, setDrinkIngredientsList] = useState([]);
  const history = useHistory();
  const { setRecipesIngredientsDrink } = useContext(MyContext);

  useEffect(() => {
    const fetchList = async () => {
      const maxLengthFoodList = 12;
      const arrayList = await getListOfDrinkByIngredients();
      const arrayReduzido = arrayList.slice(0, maxLengthFoodList);
      setDrinkIngredientsList(arrayReduzido);
    };
    fetchList();
  }, []);

  const redirectIngredient = ({ target }) => {
    const { id } = target;
    const fetchIngredient = async () => {
      const result = await getDrinkByIngredient(id);
      setRecipesIngredientsDrink(result);
      history.push('/drinks');
    };
    fetchIngredient();
  };

  return (
    <div>
      <h2>Drink Ingredients</h2>
      {drinkIngredientsList.map(
        (ingredient, index) => (
          <CardIngredient
            key={ index }
            onClick={ redirectIngredient }
            index={ index }
            name={ ingredient.strIngredient1 }
            img={ `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1}-Small.png` }
          />),
      )}
      <LowerMenu />
    </div>
  );
}

export default DrinkIngredients;
