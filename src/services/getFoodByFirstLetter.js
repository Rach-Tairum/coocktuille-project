const getFoodByFirstLetter = async (firstLetter) => {
  try {
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`)
      .then((response) => response.json());
    return data;
  } catch (error) {
    return error;
  }
};

export default getFoodByFirstLetter;
