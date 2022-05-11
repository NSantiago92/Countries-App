const axios = require("axios");

const getAllCountries = async function () {
  try {
    const { data } = await axios.get("https://restcountries.com/v3/all");
    return data.map((country) => {
      const {
        name: { common: name },
        subregion: subRegion,
        area,
        population,
        cca3: code,
      } = country;
      const continent = country.continents.join(", ");
      const flagImg = country.flags[1];
      const capital = country.capital
        ? country.capital.join(", ")
        : "No capital";
      return {
        name,
        subRegion,
        area,
        population,
        continent,
        flagImg,
        capital,
        code,
      };
    });
  } catch (err) {
    return { error: err };
  }
};

module.exports = getAllCountries;
