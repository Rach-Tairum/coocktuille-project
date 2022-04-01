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
  const {
    foodList, setFoodList,
    recipesByCategory, setRecipesByCategory,
  } = useContext(MyContext);

  const [foodCategories, setFoodCategories] = useState([]);
  const [toggleCategory, setToggleCategory] = useState(false);
  const [toggleObj, setToggleObj] = useState({
    0: false, 1: false, 2: false, 3: false, 4: false });

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
  }, [setFoodList, setRecipesByCategory]);

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

  const getRecipes = async (categoryName, index) => {
    const newToggleObj = toggleObj;
    newToggleObj[index] = !newToggleObj[index];
    setToggleObj(newToggleObj);
    setToggleCategory(newToggleObj[index]);
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
          onClick={ () => getRecipes(category.strCategory, index) }
        >
          { category.strCategory }
        </button>
      ))}

      {foodList.length === 1 && <Redirect to={ `/foods/${foodList[0].idMeal}` } />}
      {foodList.length > 1
      && toggleCategory && recipesByCategory.map((meal, index) => (
        <Card
          key={ `${index}-recipesByCategory` }
          name={ meal.strMeal }
          img={ meal.strMealThumb }
          index={ index }
        />
      ))}
      {foodList.length > 1
      && !toggleCategory && foodList.map((meal, index) => (
        <Card
          key={ `${index}-foodList` }
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
