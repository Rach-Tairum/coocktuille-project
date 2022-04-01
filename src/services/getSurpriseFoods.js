const getSurpriseFoods = async () => {
  try {
    const data = await fetch('https://www.themealdb.com/api/json/v1/1/random.php')
      .then((response) => response.json());
    return data.meals;
  } catch (error) {
    return error;
  }
};

export default getSurpriseFoods;
