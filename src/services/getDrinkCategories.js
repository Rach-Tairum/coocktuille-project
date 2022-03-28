const getDrinkCategories = async () => {
  try {
    const data = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
      .then((response) => response.json());
    return data;
  } catch (error) {
    return error;
  }
};

export default getDrinkCategories;
