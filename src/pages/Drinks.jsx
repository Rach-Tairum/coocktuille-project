import React, { useContext, useEffect, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import Header from '../components/Header';
import LowerMenu from '../components/LowerMenu';
import Card from '../components/Card';
import { MyContext } from '../context/Provider';
import getDrinkCategories from '../services/getDrinkCategories';
import getDrinksByCategory from '../services/getDrinksByCategory';
import getListDrinks from '../services/getListDrinks';
import '../CSS/Drinks.css';

const maxRecipesIngredients = (recipes, maxLengthList, setDrinkList) => {
  if (recipes.length > maxLengthList) {
    setDrinkList(recipes.slice(0, maxLengthList));
  } else {
    setDrinkList(recipes);
  }
};

function Drinks() {
  const {
    drinkList, setDrinkList,
    recipesByCategory, setRecipesByCategory,
    recipesIngredientsDrink,
    setRecipesIngredientsDrink,
  } = useContext(MyContext);

  const [drinksCategories, setDrinksCategories] = useState([]);
  const [toggleCategory, setToggleCategory] = useState(false);
  const [toggleObj, setToggleObj] = useState({
    0: false, 1: false, 2: false, 3: false, 4: false });

  const maxLengthList = 12;

  useEffect(() => {
    if (recipesIngredientsDrink.length === 0) {
      const fetchDrinks = async () => {
        const allDrinks = await getListDrinks();
        // Limita a renderização dos cards em 12
        if (allDrinks.length > maxLengthList) {
          setDrinkList(allDrinks.slice(0, maxLengthList));
          setRecipesByCategory(allDrinks.slice(0, maxLengthList));
        } else setFoodList(allDrinks);
      };
      fetchDrinks();
    }
    maxRecipesIngredients(recipesIngredientsDrink, maxLengthList, setDrinkList);
  }, [setDrinkList, setRecipesByCategory, recipesIngredientsDrink]);

  useEffect(() => {
    const getCategories = async () => {
      const drinksArray = await getDrinkCategories();
      setDrinksCategories(drinksArray);
    };
    getCategories();
  }, []);

  const maxLengthCategoryDrinks = 5;
  if (drinksCategories.length > maxLengthCategoryDrinks) {
    setDrinksCategories(drinksCategories.slice(0, maxLengthCategoryDrinks));
  }

  const getRecipes = async (categoryName, index) => {
    const newToggleObj = toggleObj;
    newToggleObj[index] = !newToggleObj[index];
    setToggleObj(newToggleObj);
    setToggleCategory(newToggleObj[index]);
    const recipesList = await getDrinksByCategory(categoryName);
    if (recipesList.length > maxLengthList) {
      setRecipesByCategory(recipesList.slice(0, maxLengthList));
    } else {
      setRecipesByCategory(recipesList);
    }
  };

  const resetFilters = () => {
    setToggleObj({ 0: false, 1: false, 2: false, 3: false, 4: false });
    setToggleCategory(false);
    setRecipesIngredientsDrink([]);
  };

  return (
    <div className="drinks-all">
      <Header />
      <button
        data-testid="All-category-filter"
        type="button"
        onClick={ resetFilters }
        className="filter-buttons"
      >
        All
      </button>
      { drinksCategories.length && drinksCategories.map((category, index) => (
        <button
          data-testid={ `${category.strCategory}-category-filter` }
          key={ index }
          type="button"
          onClick={ () => getRecipes(category.strCategory, index) }
          className="filter-buttons"
        >
          { category.strCategory }
        </button>
      ))}

      {drinkList.length === 1 && <Redirect to={ `/drinks/${drinkList[0].idDrink}` } />}
      {drinkList.length > 1
      && toggleCategory && recipesByCategory.map((drink, index) => (
        <Link to={ `/drinks/${drink.idDrink}` } key={ `${index}-recipesByCategory` }>
          <Card
            name={ drink.strDrink }
            img={ drink.strDrinkThumb }
            index={ index }
          />
        </Link>
      ))}
      {drinkList.length > 1
      && !toggleCategory && drinkList.map((drink, index) => (
        <Link to={ `/drinks/${drink.idDrink}` } key={ `${index}-drinkList` }>
          <Card
            name={ drink.strDrink }
            img={ drink.strDrinkThumb }
            index={ index }
          />
        </Link>
      ))}
      <LowerMenu />
    </div>
  );
}

export default Drinks;
