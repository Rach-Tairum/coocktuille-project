const getNationalites = async () => {
  try {
    const data = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
      .then((response) => response.json());
    return data.meals;
  } catch (error) {
    return error;
  }
};

export default getNationalites;
