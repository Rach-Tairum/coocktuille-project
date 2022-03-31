const getListDrinks = async () => {
  try {
    const data = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
      .then((response) => response.json());
    return data;
  } catch (error) {
    return error;
  }
};

export default getListDrinks;
