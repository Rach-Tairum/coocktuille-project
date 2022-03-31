const getListFoodsInCategory = async (categoryName) => {
  try {
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`)
      .then((response) => response.json());
    return data;
  } catch (error) {
    return error;
  }
};

export default getListFoodsInCategory;
