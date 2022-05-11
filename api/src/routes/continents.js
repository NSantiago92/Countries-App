const { Router } = require("express");
const { Country, Activity, Op } = require("../db");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const continents = await Country.findAll({
      attributes: ["continent"],
      group: ["continent"],
    });
    res.json(continents.map(({ continent }) => continent));
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
