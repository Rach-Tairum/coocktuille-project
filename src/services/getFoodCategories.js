const getFoodCategories = async () => {
  try {
    const data = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
      .then((response) => response.json());
    // console.log(data.meals);
    return data.meals;
  } catch (error) {
    return error;
  }
};

export default getFoodCategories;
