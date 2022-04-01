const getDrinkByIngredient = async (ingredient) => {
  try {
    const data = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`)
      .then((response) => response.json());
    return data.drinks;
  } catch (error) {
    return error;
  }
};

export default getDrinkByIngredient;
