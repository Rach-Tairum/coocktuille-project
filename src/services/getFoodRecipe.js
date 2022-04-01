const getFoodRecipe = async (id) => {
  try {
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((response) => response.json());
    return data.meals;
  } catch (error) {
    return error;
  }
};

export default getFoodRecipe;
