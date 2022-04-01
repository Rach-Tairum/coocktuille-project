import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import CardIngridient from '../components/CardIngridients';
import LowerMenu from '../components/LowerMenu';
import { MyContext } from '../context/Provider';
import getDrinkByIngredient from '../services/getDrinkByIngredient';
import getListOfDrinkByIngredients from '../services/getListOfDrinkIngridients';

function DrinkIngredients() {
  const [drinkIngredientsList, setdrinkIngredientsList] = useState([]);
  const history = useHistory();
  const { setRecipesIngredientsDrink } = useContext(MyContext);

  useEffect(() => {
    const fetchList = async () => {
      const maxLengthFoodList = 12;
      const arrayList = await getListOfDrinkByIngredients();
      const arrayReduzido = arrayList.slice(0, maxLengthFoodList);
      setdrinkIngredientsList(arrayReduzido);
    };
    fetchList();
  }, []);

  const redirectIngredient = ({ target }) => {
    const { id } = target;
    console.log(id);
    const fetchIngredient = async () => {
      const result = await getDrinkByIngredient(id);
      setRecipesIngredientsDrink(result);
      console.log(result);
      history.push('/drinks');
    };
    fetchIngredient();
  };

  return (
    <div>
      <h2>Drink Ingredients</h2>
      {drinkIngredientsList.map(
        (ingridient, index) => (
          <CardIngridient
            key={ index }
            onClick={ redirectIngredient }
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
