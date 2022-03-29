import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import LowerMenu from '../components/LowerMenu';
import { MyContext } from '../context/Provider';

function Drinks() {
  const { drinkList } = useContext(MyContext);
  return (
    <div>
      <h2>Drinks</h2>
      <Header />
      {drinkList.length === 1 && <Redirect to={ `/drinks/${drinkList[0].idDrink}` } />}
      <LowerMenu />
    </div>
  );
}

export default Drinks;
