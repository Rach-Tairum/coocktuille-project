import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import LowerMenu from '../components/LowerMenu';
import Card from '../components/Card';
import { MyContext } from '../context/Provider';
import getDrinkCategories from '../services/getDrinkCategories';
import getDrinksByCategory from '../services/getDrinksByCategory';
import getListDrinks from '../services/getListDrinks';

function Drinks() {
  const {
    drinkList, setDrinkList,
    recipesByCategory, setRecipesByCategory,
  } = useContext(MyContext);

  const [drinksCategories, setDrinksCategories] = useState([]);
  const [toggleCategory, setToggleCategory] = useState(false);
  const [toggleObj, setToggleObj] = useState({
    0: false, 1: false, 2: false, 3: false, 4: false });

  const maxLengthList = 12;

  useEffect(() => {
    const fetchDrinks = async () => {
      const allDrinks = await getListDrinks();
      // Limita a renderização dos cards em 12
      if (allDrinks.length > maxLengthList) {
        setDrinkList(allDrinks.slice(0, maxLengthList));
        setRecipesByCategory(allDrinks.slice(0, maxLengthList));
      } else setFoodList(allDrinks);
    };
    fetchDrinks();
  }, [setDrinkList, setRecipesByCategory]);

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
  };

  return (
    <div>
      <h2>Drinks</h2>
      <Header />
      <button
        data-testid="All-category-filter"
        type="button"
        onClick={ resetFilters }
      >
        All
      </button>
      { drinksCategories.length && drinksCategories.map((category, index) => (
        <button
          data-testid={ `${category.strCategory}-category-filter` }
          key={ index }
          type="button"
          onClick={ () => getRecipes(category.strCategory, index) }
        >
          { category.strCategory }
        </button>
      ))}

      {drinkList.length === 1 && <Redirect to={ `/drinks/${drinkList[0].idDrink}` } />}
      {drinkList.length > 1
      && toggleCategory && recipesByCategory.map((drink, index) => (
        <Card
          key={ `${index}-recipesByCategory` }
          name={ drink.strDrink }
          img={ drink.strDrinkThumb }
          index={ index }
        />
      ))}
      {drinkList.length > 1
      && !toggleCategory && drinkList.map((drink, index) => (
        <Card
          key={ `${index}-drinkList` }
          name={ drink.strDrink }
          img={ drink.strDrinkThumb }
          index={ index }
        />
      ))}
      <LowerMenu />
    </div>
  );
}

export default Drinks;
