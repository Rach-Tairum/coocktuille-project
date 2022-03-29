import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import LowerMenu from '../components/LowerMenu';
import { MyContext } from '../context/Provider';

function Foods() {
  const { foodList } = useContext(MyContext);
  return (
    <div>
      <h2>Foods</h2>
      <Header />
      {foodList.length === 1 && <Redirect to={ `/foods/${foodList[0].idMeal}` } />}
      <LowerMenu />
    </div>
  );
}

export default Foods;
