const getFoodByIngredient = async (ingredient) => {
  try {
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
      .then((response) => response.json());
    return data.meals;
  } catch (error) {
    return error;
  }
};

export default getFoodByIngredient;
