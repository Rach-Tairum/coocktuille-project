import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import LowerMenu from '../components/LowerMenu';
import Card from '../components/Card';
import { MyContext } from '../context/Provider';

function Foods() {
  let { foodList } = useContext(MyContext);

  // Limita a renderização dos cards em 12
  const maxLength = 12;
  if (foodList.length > maxLength) {
    foodList = foodList.slice(0, maxLength);
  }

  return (
    <div>
      <h2>Foods</h2>
      <Header />
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
