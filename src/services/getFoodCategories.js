const getFoodCategories = async () => {
  try {
    const data = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
      .then((response) => response.json());
    return data;
  } catch (error) {
    return error;
  }
};

export default getFoodCategories;
