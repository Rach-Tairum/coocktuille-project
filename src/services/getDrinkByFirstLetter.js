const getDrinkByFirstLetter = async (firstLetter) => {
  try {
    const data = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`)
      .then((response) => response.json());
    return data.drinks;
  } catch (error) {
    return error;
  }
};

export default getDrinkByFirstLetter;
