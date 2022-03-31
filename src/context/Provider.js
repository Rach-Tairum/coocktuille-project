import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import getListDrinks from '../services/getListDrinks';
import getListFoods from '../services/getListFoods';

export const MyContext = createContext();

function Provider({ children }) {
  const [foodList, setFoodList] = useState([]);
  const [drinkList, setDrinkList] = useState([]);
  // console.log(drinkList);
  // console.log(foodList);

  useEffect(() => {
    const fetchDrinks = async () => {
      const allDrinks = await getListDrinks();
      console.log(allDrinks.drinks, 'drinks');
      setDrinkList(allDrinks.drinks);
    };
    fetchDrinks();
  }, []);

  useEffect(() => {
    const fetchFoods = async () => {
      const allFoods = await getListFoods();
      console.log(allFoods.meals, 'foods');
      setFoodList(allFoods.meals);
    };
    fetchFoods();
  }, []);

  const contextValues = {
    foodList,
    setFoodList,
    drinkList,
    setDrinkList,
  };

  return (
    <MyContext.Provider value={ contextValues }>
      { children }
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default Provider;
