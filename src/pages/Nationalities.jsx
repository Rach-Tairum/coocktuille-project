import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Card from '../components/Card';
import LowerMenu from '../components/LowerMenu';
import { MyContext } from '../context/Provider';
import getFilterByNationalities from '../services/getFilterByNationalities';
import getListFoods from '../services/getListFoods';
import getNationalites from '../services/getNationalities';
import '../CSS/ExploreFoods.css';

function Nationalities() {
  const [nationalites, setNationalites] = useState([]);
  const [selectedCountryList, setSelectedCountryList] = useState([]);
  const { foodList, setFoodList } = useContext(MyContext);
  const maxLengthList = 12;

  useEffect(() => {
    const fetchNationalites = async () => {
      const nationalities = await getNationalites();
      const string = { strArea: 'All' };
      const allOk = [string, ...nationalities];
      setNationalites(allOk);
    };
    const fetchFoods = async () => {
      const allFoods = await getListFoods();

      // Limita a renderização dos cards em 12
      if (allFoods.length > maxLengthList) {
        setFoodList(allFoods.slice(0, maxLengthList));
      } else setFoodList(allFoods);
    };
    fetchFoods();
    fetchNationalites();
  }, [setFoodList]);

  const fetchRecipesByNationalitie = async (value) => {
    const recipeList = await getFilterByNationalities(value);
    const maxList = 12;
    if (recipeList.length > maxList) {
      setSelectedCountryList(recipeList.slice(0, maxList));
    } else {
      setSelectedCountryList(recipeList);
    }
  };

  const selectCountry = ({ target }) => {
    const { value } = target;

    if (value === 'All') {
      setSelectedCountryList([]);
    } else {
      fetchRecipesByNationalitie(value);
    }
  };

  return (
    <div>
      <Header />
      <select
        className="select"
        data-testid="explore-by-nationality-dropdown"
        onChange={ selectCountry }
      >
        {nationalites.map(
          (country, index) => (
            <option
              key={ index }
              className="item"
              value={ country.strArea }
              data-testid={ `${country.strArea}-option` }
            >
              {country.strArea}
            </option>
          ),
        )}
      </select>
      <div className="food-ingredients">
        {selectedCountryList.length === 0
          ? foodList.map((food, index) => (
            <Link to={ `/foods/${food.idMeal}` } key={ food.idMeal }>
              <Card
                name={ food.strMeal }
                img={ food.strMealThumb }
                index={ index }
              />
            </Link>
          ))
          : selectedCountryList.map((meals, index) => (
            <Link to={ `/foods/${meals.idMeal}` } key={ meals.idMeal }>
              <Card
                name={ meals.strMeal }
                img={ meals.strMealThumb }
                index={ index }
              />
            </Link>
          ))}
        <LowerMenu />
      </div>
    </div>
  );
}

export default Nationalities;
