import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
// import getListDrinks from '../services/getListDrinks';
// import getListFoods from '../services/getListFoods';

export const MyContext = createContext();

function Provider({ children }) {
  const [foodList, setFoodList] = useState([]);
  const [drinkList, setDrinkList] = useState([]);

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
