import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import CardIngridient from '../components/CardIngridients';
import LowerMenu from '../components/LowerMenu';
import getListOfFoodByIngredients from '../services/getListOfFoodIngridients';
import getFoodByIngredient from '../services/getFoodByIngredient';
import { MyContext } from '../context/Provider';

function FoodIngredients() {
  const [foodIngredientsList, setFoodIngredientsList] = useState([]);
  const { setRecipesByIngredients } = useContext(MyContext);
  const history = useHistory();

  useEffect(() => {
    const fetchList = async () => {
      const maxLengthFoodList = 12;
      const arrayList = await getListOfFoodByIngredients();
      const arrayReduzido = arrayList.slice(0, maxLengthFoodList);
      setFoodIngredientsList(arrayReduzido);
    };
    fetchList();
  }, []);

  const redirectIngredient = ({ target }) => {
    const { id } = target;
    console.log(id);
    const fetchIngredient = async () => {
      const result = await getFoodByIngredient(id);
      setRecipesByIngredients(result);
      console.log(result, 'result');
      history.push('/foods');
    };
    fetchIngredient();
  };

  return (
    <div>
      <h2>Food Ingredients</h2>
      {foodIngredientsList.map(
        (ingridient, index) => (
          <CardIngridient
            key={ ingridient.idIngredient }
            onClick={ redirectIngredient }
            index={ index }
            name={ ingridient.strIngredient }
            img={ `https://www.themealdb.com/images/ingredients/${ingridient.strIngredient}-Small.png` }
          />),
      )}
      <LowerMenu />
    </div>
  );
}

export default FoodIngredients;
