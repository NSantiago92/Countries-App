const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("country", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    flagImg: {
      type: DataTypes.STRING,
      validate: {
        isURL: true,
      },
    },
    continent: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    capital: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subRegion: {
      type: DataTypes.STRING,
    },
    area: {
      type: DataTypes.INTEGER,
    },
    population: {
      type: DataTypes.INTEGER,
    },
    continentColor: {
      type: DataTypes.VIRTUAL,
      get: function () {
        switch (this.continent) {
          case "Asia":
            return "#2dabdf";
          case "South America":
            return "#1b861b";
          case "North America":
            return "#2ad42a";
          case "Oceania":
            return "#e02d88";
          case "Antarctica":
            return "#335fff";
          case "Africa":
            return "#ffc233";
          case "Europe":
            return "#f36231";
          default:
            return "#656161";
        }
      },
    },
  });
};
