const getSurpriseDrink = async () => {
  try {
    const data = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
      .then((response) => response.json());
    return data.drinks;
  } catch (error) {
    return error;
  }
};

export default getSurpriseDrink;
