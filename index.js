// const sequelize = require("./database/database");
// require("./models/Encuesta.models");
// require("./models/User.models");
// const app = require("./src/app");
// require("dotenv").config();
import sequelize from "./database/database.js";
import "./models/Encuesta.models.js";
import "./models/User.models.js";
import app from "./src/app.js";
// const { PORT } = process.env;
const PORT = 4100;
console.log("hola");
const connectDatabase = async () => {
  try {
    sequelize.sync({ force: false });
    app.listen(PORT);
    console.log(`Estamos corriendo en el puerto ${PORT}`);
  } catch (error) {
    console.log("nooo");
    console.log(error);
  }
};

connectDatabase();
