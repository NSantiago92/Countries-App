const { Activity } = require("../db");

const activitiesNames = [
  "Adventure travel",
  "Tourist attraction",
  "Audio tour",
  "Boat tour",
  "Donkey rides",
  "Duck tour",
  "Escorted tour",
  "Family entertainment center",
  "Game drive (Wildlife tourism)",
  "Glass-bottom boat",
  "Heritage trail",
  "Hiking",
  "Mountain pass",
  "Museum",
  "Photo stand-in",
  "Recreational travel",
  "Road trip",
  "Self-guided tour",
  "Semi-submarine",
  "Statue rubbing",
  "Staycation",
  "Swimming with dolphins",
  "Tax-free shopping",
  "Tour bus service",
  "Tourist trolley",
  "Travel",
  "Vacation",
  "Walking tour",
];
const seasons = ["Summer", "Winter", "Autumn", "Spring"];
const activities = activitiesNames.map((name) => {
  const difficulty = Math.floor(Math.random() * 5) + 1;
  const duration = Math.floor(Math.random() * 11);
  const season = seasons[Math.floor(Math.random() * 4)];
  let countries = Array.from(
    { length: 50 },
    () => Math.floor(Math.random() * 249) + 1
  );
  countries = [...new Set(countries)]; //removing repeating IDs
  return { name, difficulty, duration, season, countries };
});
const loadMockActivities = async () => {
  for (const activity of activities) {
    const { countries, ...act } = activity;
    const currAct = await Activity.create(act);
    await currAct.addCountries(countries);
  }
};

module.exports = loadMockActivities;
