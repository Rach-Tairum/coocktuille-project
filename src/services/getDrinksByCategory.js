const getDrinksByCategory = async (categoryName) => {
  try {
    const data = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${categoryName}`)
      .then((response) => response.json());
    return data.drinks;
  } catch (error) {
    return error;
  }
};

export default getDrinksByCategory;
