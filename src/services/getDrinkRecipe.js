const getDrinkRecipe = async (id) => {
  try {
    const data = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((response) => response.json());
    return data;
  } catch (error) {
    return error;
  }
};

export default getDrinkRecipe;
