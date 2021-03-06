const express = require("express");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const Character = require("./character");
const MoviesOrSeries = require("./moviesOrSerie");
const Gender = require("./gender");
const sequelize = require("../database/db");
const swaggerConfiguration = require("../config/swaggerConfiguration");
const path = require("path");
const config = require("../config/config");

class Server {
  constructor() {
    this.app = express();
    this.characterPath = "/characters";
    this.moviesOrSeriePath = "/movies";
    this.swaggerPath = "/docs";
    this.authPath = "/auth";

    //middlewares
    this.middlewares();
    //Ruta App
    this.routes();
  }

  middlewares() {
    //lectura parseo Body
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false })); // Para enteder los datos que llegan del formulario
    this.app.use(express.static(path.resolve(__dirname, "../images")));
    this.app.use(express.static(path.join(__dirname, "../public")));

    // Swagger
    this.app.use(
      this.swaggerPath,
      swaggerUI.serve,
      swaggerUI.setup(swaggerJsDoc(swaggerConfiguration))
    );
  }

  routes() {
    this.app.use(this.authPath, require("../routes/auth"));
    this.app.use(this.characterPath, require("../routes/characters"));
    this.app.use(this.moviesOrSeriePath, require("../routes/moviesOrseries"));
  }

  async listen() {
    this.app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });
    try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");

      // Many Many
      MoviesOrSeries.belongsToMany(Character, {
        through: "Character_MoviesOrSeries",
      });
      Character.belongsToMany(MoviesOrSeries, {
        through: "Character_MoviesOrSeries",
      });
      MoviesOrSeries.belongsToMany(Gender, {
        through: "MoviesOrSeries_Gender",
      });
      Gender.belongsToMany(MoviesOrSeries, {
        through: "MoviesOrSeries_Gender",
      });

      sequelize.sync({ alter: false, force: false }).then(() => {
        console.log("Synchronized Tables");
      });
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }
}

module.exports = Server;
