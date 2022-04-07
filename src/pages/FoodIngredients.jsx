import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import CardIngredient from '../components/CardIngredient';
import LowerMenu from '../components/LowerMenu';
import getListOfFoodByIngredients from '../services/getListOfFoodByIngredients';
import getFoodByIngredient from '../services/getFoodByIngredient';
import { MyContext } from '../context/Provider';
import Header from '../components/Header';
import '../CSS/Card.css';

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
    const fetchIngredient = async () => {
      const result = await getFoodByIngredient(id);
      setRecipesByIngredients(result);
      history.push('/foods');
    };
    fetchIngredient();
  };

  return (
    <div>
      <Header />
      <div className="food-ingredients">
        {foodIngredientsList.map(
          (ingredient, index) => (
            <CardIngredient
              key={ ingredient.idIngredient }
              onClick={ redirectIngredient }
              index={ index }
              name={ ingredient.strIngredient }
              img={ `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png` }
            />),
        )}
      </div>
      <LowerMenu />
    </div>
  );
}

export default FoodIngredients;
