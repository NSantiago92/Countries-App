const { Router } = require("express");
const { Activity, Country } = require("../db.js");

const router = Router();

//Create a new activity from req.body
router.post("/", async (req, res) => {
  const { name, difficulty, duration, season, countries } = req.body;
  if (
    name === undefined ||
    difficulty === undefined ||
    duration === undefined ||
    season === undefined
  ) {
    return res
      .status(404)
      .json({ error: "Couldn't create activity: missing data" });
  }

  try {
    const [activity, created] = await Activity.findOrCreate({
      where: { name },
      defaults: { difficulty, duration, season },
    });
    await activity.addCountries(countries);
    res.json(activity);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/", async (req, res) => {
  try {
    const activities = await Activity.findAll({
      attributes: ["id", "name"],
    });
    res.json(activities);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const activities = await Activity.findAll({
      include: [
        {
          model: Country,
          through: {
            attributes: [],
          },
        },
      ],
      where: { id },
    });
    res.json(activities);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const activity = await Activity.destroy({ where: { id } });
    res.status(200).json(activity);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
