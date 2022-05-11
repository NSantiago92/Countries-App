const { Router } = require("express");
const countries = require("./countries");
const activity = require("./activity");
const continents = require("./continents");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/api/countries", countries);
router.use("/api/activity", activity);
router.use("/api/continents", continents);

module.exports = router;
