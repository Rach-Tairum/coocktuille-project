import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import LowerMenu from '../components/LowerMenu';
import Card from '../components/Card';
import { MyContext } from '../context/Provider';
import getDrinkCategories from '../services/getDrinkCategories';

function Drinks() {
  let { drinkList } = useContext(MyContext);
  const [drinksCategories, setDrinksCategories] = useState([]);

  // Limita a renderização dos cards em 12
  const maxLengthDrinkList = 12;
  if (drinkList.length > maxLengthDrinkList) {
    drinkList = drinkList.slice(0, maxLengthDrinkList);
  }

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

  return (
    <div>
      <h2>Drinks</h2>
      <Header />
      { drinksCategories.length && drinksCategories.map((category, index) => (
        <button
          data-testid={ `${category.strCategory}-category-filter` }
          key={ index }
          type="button"
        >
          { category.strCategory }
        </button>
      ))}

      {drinkList.length === 1 && <Redirect to={ `/drinks/${drinkList[0].idDrink}` } />}
      {drinkList.length > 1 && drinkList.map((drink, index) => (
        <Card
          key={ index }
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
