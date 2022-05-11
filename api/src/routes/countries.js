const { Router } = require("express");
const { Country, Activity, Op, conn } = require("../db");

const router = Router();

//Saves on DB all REST API countries on first call (old) ---- Now it gets loaded on server start (./index.js)
//return list of countries
// (?name=..) returns all countries that match the name (not exact)
// ?continents = ["Africa", "Europe"] filters by continent (this is an OR filter)
// ?activities = [1,2,12] filters by activity (RECIEVES IDs) (this is an AND filter)
// returns [] when no name, continent or activity matches
router.get("/", async (req, res) => {
  const { name, continents, activities } = req.query;
  //We initialize a blank condition, and depending on the body/queries we modify it
  const condition = {};

  if (name) {
    condition.where = {
      ...condition.where,
    };
    condition.where.name = { [Op.iLike]: `%${name}%` };
  }
  if (continents) {
    condition.where = { ...condition.where };
    condition.where.continent = { [Op.in]: continents };
  }

  //We first find all the countries that have the activities. Then we add those IDs to the condition
  if (activities) {
    try {
      const [filteredActivities] = await conn.query(`SELECT "countryId"
        FROM country_activity
      WHERE "activityId" in (${activities.join(",")})
      GROUP BY "countryId"
      HAVING COUNT(DISTINCT "activityId") = ${activities.length}`);
      if (filteredActivities.length === 0) {
        //this means there's no country that has all the activities, we don't need to query again
        return res.json([]);
      }
      if (filteredActivities.length > 0) {
        const countriesIds = filteredActivities.map(
          ({ countryId }) => countryId
        );
        condition.where = { ...condition.where };
        condition.where.id = { [Op.in]: countriesIds };
      }
    } catch (err) {
      console.log(err);
    }
  }

  try {
    const countries = await Country.findAll({
      ...condition,
      attributes: [
        "continentColor",
        "id",
        "code",
        "name",
        "flagImg",
        "continent",
        "population",
      ],
      include: [
        {
          model: Activity,
          attributes: ["name", "id"],
          through: {
            attributes: [],
          },
        },
      ],
    });
    res.json(countries);
  } catch (err) {
    res.status(500).json(err);
  }
});

//return all the details of the country with :id. Inlcude activities
// returns {} when no country is found
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [country] = await Country.findAll({
      include: [
        {
          model: Activity,
          through: {
            attributes: [],
          },
          attributes: ["id", "name", "difficulty", "duration", "season"],
        },
      ],
      where: { id },
      attributes: [
        "id",
        "name",
        "code",
        "continentColor",
        "flagImg",
        "continent",
        "capital",
        "subRegion",
        "area",
        "population",
      ],
    });
    res.json(country || {});
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
