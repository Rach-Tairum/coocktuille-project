import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import LowerMenu from '../components/LowerMenu';
import Card from '../components/Card';
import { MyContext } from '../context/Provider';

function Drinks() {
  let { drinkList } = useContext(MyContext);

  // Limita a renderização dos cards em 12
  const maxLength = 12;
  if (drinkList.length > maxLength) {
    drinkList = drinkList.slice(0, maxLength);
  }

  return (
    <div>
      <h2>Drinks</h2>
      <Header />
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
