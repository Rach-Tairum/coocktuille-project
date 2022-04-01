import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import LowerMenu from '../components/LowerMenu';
import Card from '../components/Card';
import { MyContext } from '../context/Provider';
import getFoodCategories from '../services/getFoodCategories';
import getFoodsByCategory from '../services/getFoodsByCategory';
import getListFoods from '../services/getListFoods';

function Foods() {
  const { foodList, setFoodList } = useContext(MyContext);
  const [foodCategories, setFoodCategories] = useState([]);
  const [recipesByCategory, setRecipesByCategory] = useState([]);
  const maxLengthList = 12;

  useEffect(() => {
    const fetchFoods = async () => {
      const allFoods = await getListFoods();
      // Limita a renderização dos cards em 12
      if (allFoods.length > maxLengthList) {
        setFoodList(allFoods.slice(0, maxLengthList));
        setRecipesByCategory(allFoods.slice(0, maxLengthList));
      } else setFoodList(allFoods);
    };
    fetchFoods();
  }, [setFoodList]);

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

  const getRecipes = async (categoryName) => {
    const recipesList = await getFoodsByCategory(categoryName);
    if (recipesList.length > maxLengthList) {
      setRecipesByCategory(recipesList.slice(0, maxLengthList));
    } else {
      setRecipesByCategory(recipesList);
    }
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
          onClick={ () => getRecipes(category.strCategory) }
        >
          { category.strCategory }
        </button>
      ))}

      {foodList.length === 1 && <Redirect to={ `/foods/${foodList[0].idMeal}` } />}
      {foodList.length > 1 && recipesByCategory.map((meal, index) => (
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
