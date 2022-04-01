const getListOfDrinkByIngredients = async () => {
  try {
    const data = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list')
      .then((response) => response.json());
    return data.drinks;
  } catch (error) {
    return error;
  }
};

export default getListOfDrinkByIngredients;
