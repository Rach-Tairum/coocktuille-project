// https://www.themealdb.com/api/json/v1/1/filter.php?a=Canadian

const getFilterByNationalities = async (nationalitie) => {
  try {
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${nationalitie}`)
      .then((response) => response.json());
    return data.meals;
  } catch (error) {
    return error;
  }
};

export default getFilterByNationalities;
