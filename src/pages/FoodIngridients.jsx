import React, { useEffect, useState } from 'react';
import CardIngridient from '../components/CardIngridients';
import LowerMenu from '../components/LowerMenu';
import getListOfFoodByIngredients from '../services/getListOfFoodIngridients';

function FoodIngredients() {
  const [foodIngredientsList, setFoodIngredientsList] = useState([]);

  useEffect(() => {
    const fetchList = async () => {
      const maxLengthFoodList = 12;
      const arrayList = await getListOfFoodByIngredients();
      const arrayReduzido = arrayList.slice(0, maxLengthFoodList);
      setFoodIngredientsList(arrayReduzido);
    };
    fetchList();
  }, []);

  return (
    <div>
      <h2>Food Ingredients</h2>
      {foodIngredientsList.map(
        (ingridient, index) => (
          <CardIngridient
            key={ ingridient.idIngredient }
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
