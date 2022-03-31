import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import LowerMenu from '../components/LowerMenu';
import Card from '../components/Card';
import { MyContext } from '../context/Provider';
import getFoodCategories from '../services/getFoodCategories';
import getListFoodsInCategory from '../services/getListFoodsInCategory';

function Foods() {
  let { foodList } = useContext(MyContext);
  const [foodCategories, setFoodCategories] = useState([]);
  const [foodsInCategories, setFoodsInCategories] = useState([]);

  // imita a renderização dos cards em 12
  const maxLengthFoodList = 12;
  if (foodList.length > maxLengthFoodList) {
    foodList = foodList.slice(0, maxLengthFoodList);
  }

  useEffect(() => {
    const getCategories = async () => {
      const mealsArray = await getFoodCategories();
      setFoodCategories(mealsArray);
    };
    getCategories();
  }, []);

  const maxLengthCategoryFood = 5;
  if (foodCategories.length > maxLengthCategoryFood) {
    setFoodCategories(foodCategories.slice(0, maxLengthCategoryFood));
  }

  const maxLengthFoodsInCategory = 12;
  if (foodsInCategories.length > maxLengthFoodsInCategory) {
    setFoodsInCategories(foodsInCategories.slice(0, maxLengthFoodsInCategory));
  }

  const getRecipes = async () => {
    const response = await getListFoodsInCategory('Seafood');
    console.log('na categoria: ', response);
  };

  return (
    <div>
      <h2>Foods</h2>
      <Header />

      { foodCategories.length && foodCategories.map((category, index) => (
        <button
          data-testid={ `${category.strCategory}-category-filter` }
          key={ index }
          type="button"
          onClick={ getRecipes }
        >
          { category.strCategory }
        </button>
      ))}

      {foodList.length === 1 && <Redirect to={ `/foods/${foodList[0].idMeal}` } />}
      {foodList.length > 1 && foodList.map((meal, index) => (
        <Card
          key={ index }
          name={ meal.strMeal }
          img={ meal.strMealThumb }
          index={ index }
        />
      ))}
      <LowerMenu />
    </div>
  );
}

export default Foods;
