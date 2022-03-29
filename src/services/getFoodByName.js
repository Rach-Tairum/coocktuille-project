const getFoodByName = async (name) => {
  try {
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
      .then((response) => response.json());
    return data;
  } catch (error) {
    return error;
  }
};

export default getFoodByName;
